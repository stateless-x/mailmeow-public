// Request handler for POST /api/waitlist. All I/O (D1, Turnstile, clock) is injected so tests run offline.
import { ENTITY } from '../data/registry';
import {
  MAX_BODY_BYTES,
  RATE_LIMIT,
  RATE_WINDOW_MS,
  hashIp,
  isFormEncoded,
  langOf,
  parseBody,
  validateRaw,
  type ErrorKey,
} from './waitlist-server';

/** The slice of Cloudflare's D1 API used here. The real D1Database satisfies it. */
export interface D1Stmt {
  bind(...values: unknown[]): D1Stmt;
  run(): Promise<unknown>;
  first<T = Record<string, unknown>>(): Promise<T | null>;
}
export interface D1Like {
  prepare(sql: string): D1Stmt;
}

export interface Env {
  DB?: D1Like;
  TURNSTILE_SECRET?: string;
  IP_HASH_SALT?: string;
}

export type VerifyTurnstile = (token: string, secret: string) => Promise<boolean>;

export interface Deps {
  verify: VerifyTurnstile;
  now?: () => number;
}

const JSON_HEADERS = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' };

/** Logs the error class and status only. Never the email, the IP or the token. */
const log = (cls: string, status: number) => console.error(JSON.stringify({ event: 'waitlist', class: cls, status }));

const json = (status: number, body: { ok: true } | { ok: false; errors: ErrorKey[] }) =>
  new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

export async function handleWaitlist(request: Request, env: Env, deps: Deps): Promise<Response> {
  const now = (deps.now ?? Date.now)();
  const { DB, TURNSTILE_SECRET, IP_HASH_SALT } = env;
  const ip = request.headers.get('CF-Connecting-IP');

  // Fail closed: no silent default for the salt, the secret or the database.
  if (!DB || !TURNSTILE_SECRET || !IP_HASH_SALT || !ip) {
    log(!DB ? 'config_missing_db' : !TURNSTILE_SECRET ? 'config_missing_turnstile_secret' : !IP_HASH_SALT ? 'config_missing_ip_salt' : 'no_client_ip', 500);
    return json(500, { ok: false, errors: [] });
  }

  const contentType = request.headers.get('Content-Type') ?? '';
  const native = isFormEncoded(contentType);
  let lang: 'th' | 'en' = 'en';
  const fail = (status: number, errors: ErrorKey[], cls: string) => {
    log(cls, status);
    if (native) return new Response(null, { status: 303, headers: { Location: `/${lang}/#waitlist` } });
    return json(status, { ok: false, errors });
  };

  // Count every attempt, not just successes. The attempt is recorded before anything else is judged.
  const ipHash = await hashIp(IP_HASH_SALT, ip);
  await DB.prepare('DELETE FROM waitlist_hits WHERE created_at < ?').bind(now - RATE_WINDOW_MS).run();
  await DB.prepare('INSERT INTO waitlist_hits (ip_hash, created_at) VALUES (?, ?)').bind(ipHash, now).run();
  const hits = await DB.prepare('SELECT COUNT(*) AS n FROM waitlist_hits WHERE ip_hash = ? AND created_at >= ?')
    .bind(ipHash, now - RATE_WINDOW_MS)
    .first<{ n: number }>();
  const limited = (hits?.n ?? 0) > RATE_LIMIT;

  const declared = Number(request.headers.get('Content-Length') ?? 0);
  if (declared > MAX_BODY_BYTES) return fail(413, ['size'], 'body_too_large');
  const text = await request.text();
  if (new TextEncoder().encode(text).length > MAX_BODY_BYTES) return fail(413, ['size'], 'body_too_large');

  const raw = parseBody(contentType, text);
  lang = langOf(raw);
  if (limited) return fail(429, ['rate'], 'rate_limited');
  if (!raw) return fail(400, ['invalid'], 'bad_body');

  const parsed = validateRaw(raw);
  if (!parsed.ok) return fail(400, parsed.errors, 'validation');
  const s = parsed.value;

  if (!s.token) return fail(400, ['turnstile'], 'turnstile_missing');
  let human: boolean;
  try {
    human = await deps.verify(s.token, TURNSTILE_SECRET);
  } catch {
    log('turnstile_unreachable', 503);
    return native
      ? new Response(null, { status: 303, headers: { Location: `/${s.lang}/#waitlist` } })
      : json(503, { ok: false, errors: [] });
  }
  if (!human) return fail(400, ['turnstile'], 'turnstile_refused');

  // A repeat email keeps the first row: ON CONFLICT DO NOTHING, so nobody can rewrite someone else's answers.
  const iso = new Date(now).toISOString();
  await DB.prepare(
    `INSERT INTO waitlist_signups
       (email, building, ai_tools, volume, would_pay, promptpay, price_variant, lang, consent_at, created_at, ip_hash)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON CONFLICT(email) DO NOTHING`,
  )
    .bind(s.email, s.building, JSON.stringify(s.aiTools), s.volume, s.wouldPay, s.promptpay, ENTITY.waitlist.price, s.lang, iso, iso, ipHash)
    .run();

  return native
    ? new Response(null, { status: 303, headers: { Location: `/${s.lang}/waitlist-thanks/` } })
    : json(200, { ok: true });
}

/** Cloudflare Turnstile siteverify. Throws on a network or HTTP failure so the handler can answer 503. */
export const verifyTurnstile: VerifyTurnstile = async (token, secret) => {
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token }),
  });
  if (!res.ok) throw new Error(`siteverify HTTP ${res.status}`);
  const out = (await res.json()) as { success?: boolean };
  return out.success === true;
};
