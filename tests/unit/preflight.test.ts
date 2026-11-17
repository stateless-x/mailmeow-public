import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { preflight, type PreflightInput } from '../../src/lib/preflight';
import { renderRobots } from '../../src/lib/seo';

const wrangler = readFileSync(join(import.meta.dir, '../../wrangler.toml'), 'utf8');

const filled: PreflightInput = {
  contactEmail: 'hello@mailmeow.dev',
  turnstileSiteKey: '0x4AAAAAAAexample',
  publicEnv: 'production',
  wranglerToml: wrangler.replace('00000000-0000-0000-0000-000000000000', '5f1c2a3e-1111-4222-8333-444455556666'),
  robots: renderRobots(true),
  migrationPresent: true,
  build: { ok: true, output: '' },
};

describe('preflight', () => {
  test('passes on a filled fixture', () => {
    expect(preflight(filled)).toEqual([]);
  });

  test('fails on the repo as it stands: every placeholder is named', () => {
    const problems = preflight({ ...filled, contactEmail: undefined, turnstileSiteKey: undefined, publicEnv: undefined, wranglerToml: wrangler });
    expect(problems).toHaveLength(4);
    expect(problems.join('\n')).toMatch(/contactEmail/);
    expect(problems.join('\n')).toMatch(/PUBLIC_TURNSTILE_SITE_KEY is not set/);
    expect(problems.join('\n')).toMatch(/placeholder database_id/);
    expect(problems.join('\n')).toMatch(/PUBLIC_ENV is not set/);
  });

  test("Cloudflare's test site keys are refused", () => {
    for (const key of ['1x00000000000000000000AA', '2x00000000000000000000AB', '3x00000000000000000000FF']) {
      expect(preflight({ ...filled, turnstileSiteKey: key }).join()).toMatch(/test keys/);
    }
  });

  test('PUBLIC_ENV other than production fails', () => {
    expect(preflight({ ...filled, publicEnv: 'preview' }).join()).toMatch(/"preview"/);
  });

  test('a preview robots.txt, a missing sitemap line, a missing migration and a failed build each fail', () => {
    expect(preflight({ ...filled, robots: renderRobots(false) }).join()).toMatch(/robots/);
    expect(preflight({ ...filled, robots: 'User-agent: *\nAllow: /\nDisallow: /api/\n' }).join()).toMatch(/Sitemap/);
    expect(preflight({ ...filled, robots: 'User-agent: GPTBot\nDisallow: /\n\n' + renderRobots(true) }).join()).toMatch(/blocked/);
    expect(preflight({ ...filled, migrationPresent: false }).join()).toMatch(/0001_waitlist/);
    expect(preflight({ ...filled, build: { ok: false, output: 'boom' } }).join()).toMatch(/build fails[\s\S]*boom/);
  });

  test('a malformed contact address fails', () => {
    expect(preflight({ ...filled, contactEmail: 'not an email' })).toHaveLength(1);
  });
});
