// Pure checks for `bun run preflight`: what a production deploy needs. No I/O here, so tests can feed fixtures.

export interface PreflightInput {
  contactEmail: string | undefined;
  /** PUBLIC_TURNSTILE_SITE_KEY from the environment. */
  turnstileSiteKey: string | undefined;
  /** PUBLIC_ENV from the environment. */
  publicEnv: string | undefined;
  /** Text of wrangler.toml. */
  wranglerToml: string;
  /** What renderRobots(true) returns, and whether the crawler block list is empty. */
  robots: string;
  migrationPresent: boolean;
  /** null = not run (an earlier check failed); otherwise the result of a production build. */
  build: { ok: boolean; output: string } | null;
}

/** Cloudflare's published always-pass / always-fail / interactive Turnstile test site keys (1x, 2x, 3x followed by zeros). */
const TURNSTILE_TEST_KEY = /^[123]x0{10,}/;
const PLACEHOLDER_DB_ID = '00000000-0000-0000-0000-000000000000';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** One plain sentence per thing that is missing. Empty list = ready. */
export function preflight(i: PreflightInput): string[] {
  const out: string[] = [];

  if (!i.contactEmail || !EMAIL.test(i.contactEmail)) {
    out.push('contactEmail is not set: put a real public address in ENTITY.contactEmail (src/data/registry.ts).');
  }

  if (!i.turnstileSiteKey) {
    out.push('PUBLIC_TURNSTILE_SITE_KEY is not set: create the Turnstile widget and set the site key (see docs/DEPLOY-SITE.md).');
  } else if (TURNSTILE_TEST_KEY.test(i.turnstileSiteKey)) {
    out.push('PUBLIC_TURNSTILE_SITE_KEY is one of Cloudflare\'s test keys: use the key of your real Turnstile widget.');
  }

  const dbId = /^\s*database_id\s*=\s*"([^"]*)"/m.exec(i.wranglerToml)?.[1];
  if (!dbId) out.push('wrangler.toml has no database_id: run `wrangler d1 create mailmeow-waitlist` and paste the id in.');
  else if (dbId === PLACEHOLDER_DB_ID) out.push('wrangler.toml still has the placeholder database_id: paste the id that `wrangler d1 create mailmeow-waitlist` printed.');

  if (i.publicEnv !== 'production') out.push(`PUBLIC_ENV is ${i.publicEnv ? `"${i.publicEnv}"` : 'not set'}: it must be "production", or the site ships noindex.`);

  const robotsProblems: string[] = [];
  if (!/^User-agent: \*\nAllow: \/\nDisallow: \/api\/$/m.test(i.robots)) robotsProblems.push('"User-agent: *" with "Allow: /" and "Disallow: /api/"');
  if (!/^Sitemap: https:\/\/\S+$/m.test(i.robots)) robotsProblems.push('a Sitemap line');
  if (/^Disallow: \/$/m.test(i.robots)) robotsProblems.push('no blanket "Disallow: /" (an AI crawler is blocked; SITE.md says allow all)');
  if (robotsProblems.length) out.push(`production robots.txt is wrong, it needs ${robotsProblems.join(', ')}.`);

  if (!i.migrationPresent) out.push('migrations/0001_waitlist.sql is missing: the waitlist table has no schema to apply.');

  if (i.build && !i.build.ok) out.push(`the production build fails:\n${i.build.output.trim().split('\n').slice(-8).map((l) => `    ${l}`).join('\n')}`);

  return out;
}
