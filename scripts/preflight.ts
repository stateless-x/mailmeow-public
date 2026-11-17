// `bun run preflight`: lists everything a production deploy still needs. Makes no network calls.
// Reads the real files and environment, then hands them to src/lib/preflight.ts.
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ENTITY } from '../src/data/registry';
import { renderRobots } from '../src/lib/seo';
import { preflight, type PreflightInput } from '../src/lib/preflight';

const root = join(import.meta.dir, '..');
const env = process.env;

const base: Omit<PreflightInput, 'build'> = {
  contactEmail: ENTITY.contactEmail,
  turnstileSiteKey: env.PUBLIC_TURNSTILE_SITE_KEY,
  publicEnv: env.PUBLIC_ENV,
  wranglerToml: readFileSync(join(root, 'wrangler.toml'), 'utf8'),
  robots: renderRobots(true),
  migrationPresent: existsSync(join(root, 'migrations/0001_waitlist.sql')),
};

// A production build throws on a missing contact or site key, which the checks above already say.
// Build only when they pass, into a temp folder so dist/ is not touched.
let build: PreflightInput['build'] = null;
if (preflight({ ...base, build: null }).length === 0) {
  const outDir = mkdtempSync(join(tmpdir(), 'mailmeow-preflight-'));
  const r = Bun.spawnSync(['bunx', 'astro', 'build', '--outDir', outDir], { cwd: root, env: { ...env, PUBLIC_ENV: 'production' }, stdout: 'pipe', stderr: 'pipe' });
  build = { ok: r.exitCode === 0, output: `${r.stdout.toString()}\n${r.stderr.toString()}` };
  rmSync(outDir, { recursive: true, force: true });
}

const problems = preflight({ ...base, build });
if (problems.length) {
  console.error(`Not ready to deploy. ${problems.length} thing${problems.length === 1 ? '' : 's'} to fix:\n`);
  problems.forEach((p, n) => console.error(`${n + 1}. ${p}`));
  process.exit(1);
}
console.log('Preflight passed: ready for a production deploy.');
