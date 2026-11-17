import { beforeEach, describe, expect, test } from 'bun:test';
import type { Database } from 'bun:sqlite';
import { handleWaitlist, type Env, type VerifyTurnstile } from '../../src/lib/waitlist-handler';
import { hashIp } from '../../src/lib/waitlist-server';
import { memoryD1 } from './helpers/d1';

const IP = '203.0.113.77';
const SALT = 'test-salt';
const NOW = Date.UTC(2026, 10, 17, 12, 0, 0);

let raw: Database;
let env: Env;
const pass: VerifyTurnstile = async () => true;
const fail: VerifyTurnstile = async () => false;

beforeEach(() => {
  const d = memoryD1();
  raw = d.raw;
  env = { DB: d.db, TURNSTILE_SECRET: 'secret', IP_HASH_SALT: SALT };
  console.error = () => {}; // the handler logs error classes; keep test output clean
});

const body = (over: Record<string, unknown> = {}) => ({
  email: '  Ada@Example.COM ',
  building: 'own',
  ai: ['cursor', 'claude-code'],
  volume: 'up-to-3000',
  wouldPay: 'yes',
  promptpay: 'required',
  consent: true,
  lang: 'th',
  price_variant: '9',
  source: 'fb1',
  turnstileToken: 'tok',
  ...over,
});
const post = (b: unknown, headers: Record<string, string> = {}) =>
  new Request('https://mailmeow.dev/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'CF-Connecting-IP': IP, ...headers },
    body: JSON.stringify(b),
  });
const run = (req: Request, verify = pass, now = NOW) => handleWaitlist(req, env, { verify, now: () => now });
const rows = () => raw.query('SELECT * FROM waitlist_signups').all() as Record<string, unknown>[];

describe('POST /api/waitlist', () => {
  test('stores a new signup with a lowercased email and a hashed IP, never the raw IP', async () => {
    const res = await run(post(body()));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    const [row] = rows();
    expect(row).toMatchObject({
      email: 'ada@example.com',
      building: 'own',
      ai_tools: '["cursor","claude-code"]',
      volume: 'up-to-3000',
      would_pay: 'yes',
      promptpay: 'required',
      price_variant: '9',
      source: 'fb1',
      lang: 'th',
    });
    expect(row!.ip_hash).toBe(await hashIp(SALT, IP));
    expect(JSON.stringify(rows())).not.toContain(IP);
    expect(JSON.stringify(raw.query('SELECT * FROM waitlist_hits').all())).not.toContain(IP);
  });

  test('a repeat email gets the same response and keeps the first answers', async () => {
    const first = await run(post(body()));
    const again = await run(post(body({ email: 'ADA@example.com', wouldPay: 'no', building: 'shop' })));
    expect(again.status).toBe(first.status);
    expect(await again.json()).toEqual({ ok: true });
    expect(rows()).toHaveLength(1);
    expect(rows()[0]).toMatchObject({ would_pay: 'yes', building: 'own' });
  });

  test('a bad Turnstile token is refused and nothing is stored', async () => {
    const res = await run(post(body()), fail);
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, errors: ['turnstile'] });
    expect(rows()).toHaveLength(0);
  });

  test('a missing token is refused without calling the verifier', async () => {
    let called = false;
    const res = await run(post(body({ turnstileToken: undefined })), async () => ((called = true), true));
    expect(res.status).toBe(400);
    expect(called).toBe(false);
  });

  test('the 6th post from one IP within an hour is 429, and hits count even when refused', async () => {
    for (let i = 0; i < 5; i++) expect((await run(post(body({ email: `u${i}@x.io` })), fail)).status).toBe(400);
    const sixth = await run(post(body()));
    expect(sixth.status).toBe(429);
    expect(rows()).toHaveLength(0);
    // An hour later the window has passed.
    expect((await run(post(body()), pass, NOW + 60 * 60 * 1000 + 1)).status).toBe(200);
  });

  test('another IP is not limited by the first', async () => {
    for (let i = 0; i < 6; i++) await run(post(body({ email: `u${i}@x.io` })), fail);
    expect((await run(post(body(), { 'CF-Connecting-IP': '198.51.100.9' }))).status).toBe(200);
  });

  test('missing salt or secret is a 500 config error and stores nothing', async () => {
    for (const missing of ['IP_HASH_SALT', 'TURNSTILE_SECRET'] as const) {
      const res = await handleWaitlist(post(body()), { ...env, [missing]: undefined }, { verify: pass, now: () => NOW });
      expect(res.status).toBe(500);
    }
    expect(rows()).toHaveLength(0);
  });

  test('an unknown option key is 400', async () => {
    let n = 0; // a fresh IP each time, so the rate limit does not interfere
    for (const bad of [{ building: 'Own app' }, { ai: ['cursor', 'vim'] }, { wouldPay: 'maybe' }, { volume: 'lots' }, { promptpay: 'x' }, { lang: 'fr' }, { ai: 'cursor' }, { price_variant: '$9' }, { price_variant: '10' }, { price_variant: 9 }, { price_variant: '' }, { price_variant: undefined }]) {
      const res = await run(post(body(bad), { 'CF-Connecting-IP': `192.0.2.${++n}` }));
      expect(res.status).toBe(400);
      expect(((await res.json()) as { errors: string[] }).errors).toContain('invalid');
    }
    expect(rows()).toHaveLength(0);
  });

  test('price_variant is stored for 9, 12 and nojs only', async () => {
    let n = 0;
    for (const v of ['9', '12', 'nojs']) {
      const res = await run(post(body({ email: `v${v}@x.io`, price_variant: v }), { 'CF-Connecting-IP': `192.0.2.${++n}` }));
      expect(res.status).toBe(200);
    }
    expect(rows().map((r) => r.price_variant)).toEqual(['9', '12', 'nojs']);
  });

  test('source is stored when allow-listed; unknown, wrong-typed or missing becomes direct (never an error)', async () => {
    let n = 0;
    const cases: [unknown, string][] = [['meetup', 'meetup'], ['threads', 'threads'], ['evil', 'direct'], ['FB1', 'direct'], [5, 'direct'], [undefined, 'direct']];
    for (const [sent, stored] of cases) {
      const res = await run(post(body({ email: `s${n}@x.io`, source: sent }), { 'CF-Connecting-IP': `192.0.2.${++n}` }));
      expect(res.status).toBe(200);
    }
    expect(rows().map((r) => r.source)).toEqual(cases.map(([, stored]) => stored));
  });

  test('missing required fields return the keys the form maps to copy', async () => {
    const res = await run(post(body({ email: 'nope', wouldPay: undefined, consent: false })));
    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ ok: false, errors: ['email', 'wouldPay', 'consent'] });
  });

  test('a form-encoded post redirects 303 to the thanks page in the right language', async () => {
    const form = new URLSearchParams({ email: 'b@x.io', wouldPay: 'yes', consent: 'on', lang: 'en', price_variant: 'nojs', 'cf-turnstile-response': 'tok' });
    form.append('ai', 'bolt');
    form.append('ai', 'lovable');
    const req = new Request('https://mailmeow.dev/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'CF-Connecting-IP': IP },
      body: form.toString(),
    });
    const res = await run(req);
    expect(res.status).toBe(303);
    expect(res.headers.get('Location')).toBe('/en/waitlist-thanks/');
    expect(rows()[0]).toMatchObject({ email: 'b@x.io', ai_tools: '["bolt","lovable"]', lang: 'en', price_variant: 'nojs' });
  });

  test('a failed form-encoded post redirects back to the form', async () => {
    const req = new Request('https://mailmeow.dev/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'CF-Connecting-IP': IP },
      body: new URLSearchParams({ email: 'bad', lang: 'th' }).toString(),
    });
    const res = await run(req);
    expect(res.status).toBe(303);
    expect(res.headers.get('Location')).toBe('/th/#waitlist');
  });

  test('a body over 4 KB is 413', async () => {
    const res = await run(post(body({ email: 'a'.repeat(5000) + '@x.io' })));
    expect(res.status).toBe(413);
    expect(rows()).toHaveLength(0);
  });

  test('a Turnstile outage is 503, not a pass', async () => {
    const res = await run(post(body()), async () => {
      throw new Error('down');
    });
    expect(res.status).toBe(503);
    expect(rows()).toHaveLength(0);
  });
});
