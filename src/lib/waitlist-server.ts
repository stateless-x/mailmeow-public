// Pure parts of POST /api/waitlist: parse, validate, normalise, hash. No I/O, no Cloudflare types.
import { FORM } from '../data/copy/common';
import { validateWaitlist } from './waitlist';

export const MAX_BODY_BYTES = 4096;
export const RATE_LIMIT = 5;
export const RATE_WINDOW_MS = 60 * 60 * 1000;

export type Lang = 'th' | 'en';
/** The three keys the form UI maps to copy, plus keys only the server can raise. */
export type ErrorKey = 'email' | 'wouldPay' | 'consent' | 'invalid' | 'turnstile' | 'rate' | 'size';

export interface Signup {
  email: string;
  building: string | null;
  aiTools: string[];
  volume: string | null;
  wouldPay: string;
  promptpay: string | null;
  lang: Lang;
}

export interface Parsed extends Signup {
  /** Present when the body was well-formed enough to read at all. */
  consent: boolean;
  token: string;
}

const keys = (opts: { value: string }[]) => new Set(opts.map((o) => o.value));
const KNOWN = {
  building: keys(FORM.q1.options),
  ai: keys(FORM.q2.options),
  volume: keys(FORM.q3.options),
  wouldPay: keys(FORM.q4.options),
  promptpay: keys(FORM.q5.options),
};

/** A raw field as read from JSON or a form: strings, a string array, a boolean, or junk. */
type Raw = Record<string, unknown>;

export function parseBody(contentType: string, text: string): Raw | null {
  if (contentType.includes('application/json')) {
    try {
      const v: unknown = JSON.parse(text);
      return v && typeof v === 'object' && !Array.isArray(v) ? (v as Raw) : null;
    } catch {
      return null;
    }
  }
  if (contentType.includes('application/x-www-form-urlencoded')) {
    const p = new URLSearchParams(text);
    const out: Raw = {};
    for (const k of new Set(p.keys())) out[k] = k === 'ai' ? p.getAll(k) : p.get(k);
    return out;
  }
  return null;
}

export const isFormEncoded = (contentType: string) => contentType.includes('application/x-www-form-urlencoded');

/** Lang for redirects; anything but 'th' falls to 'en'. */
export const langOf = (raw: Raw | null): Lang => (raw?.lang === 'th' ? 'th' : 'en');

const BAD = Symbol('bad');
const str = (v: unknown): string | undefined | typeof BAD => (v === undefined || v === null || v === '' ? undefined : typeof v === 'string' ? v : BAD);

/** Mirrors validateWaitlist for the required fields, and rejects every option that is not a known key. */
export function validateRaw(raw: Raw): { ok: true; value: Parsed } | { ok: false; errors: ErrorKey[] } {
  const errors = new Set<ErrorKey>();
  const email = str(raw.email);
  const wouldPay = str(raw.wouldPay);
  if (email === BAD || wouldPay === BAD) errors.add('invalid');
  const consent = raw.consent === true || raw.consent === 'on' || raw.consent === 'true';

  const required = validateWaitlist({
    email: typeof email === 'string' ? email : '',
    wouldPay: typeof wouldPay === 'string' ? wouldPay : undefined,
    consent,
  });
  required.forEach((k) => errors.add(k));
  if (typeof email === 'string' && email.trim().length > 254) errors.add('email');

  const pick = (field: keyof typeof KNOWN, v: unknown): string | null => {
    const s = str(v);
    if (s === undefined) return null;
    if (s === BAD || !KNOWN[field].has(s)) errors.add('invalid');
    return typeof s === 'string' ? s : null;
  };
  const building = pick('building', raw.building);
  const volume = pick('volume', raw.volume);
  const promptpay = pick('promptpay', raw.promptpay);
  if (typeof wouldPay === 'string' && !KNOWN.wouldPay.has(wouldPay)) errors.add('invalid');

  let aiRaw: unknown[] = [];
  if (raw.ai !== undefined && raw.ai !== null) {
    if (Array.isArray(raw.ai)) aiRaw = raw.ai;
    else errors.add('invalid');
  }
  const aiTools = [...new Set(aiRaw)].filter((v): v is string => typeof v === 'string' && KNOWN.ai.has(v));
  if (aiTools.length !== new Set(aiRaw).size) errors.add('invalid');

  if (raw.lang !== 'th' && raw.lang !== 'en') errors.add('invalid');

  const tokenRaw = raw.turnstileToken ?? raw['cf-turnstile-response'];
  const token = typeof tokenRaw === 'string' ? tokenRaw : '';
  if (token.length > 2048) errors.add('invalid');

  if (errors.size) return { ok: false, errors: [...errors] };
  return {
    ok: true,
    value: {
      email: (email as string).trim().toLowerCase(),
      building,
      aiTools,
      volume,
      wouldPay: wouldPay as string,
      promptpay,
      lang: raw.lang as Lang,
      consent,
      token,
    },
  };
}

/** SHA-256 over salt + IP, hex. The raw IP never leaves this function. */
export async function hashIp(salt: string, ip: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${ip}`));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
