import { describe, expect, test } from 'bun:test';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { FEATURES, PAGES, ENTITY } from '../../src/data/registry';
import type { Feature, PageEntry } from '../../src/data/types';
import { validateRegistry, findEmptyTranslations } from '../../src/lib/validate';
import { LANDING, ABOUT, WHAT_IS } from '../../src/data/copy/landing';
import { MIGRATE } from '../../src/data/copy/migrate';
import { PRIVACY } from '../../src/data/copy/privacy';
import { FORM, FOOTER, THANKS } from '../../src/data/copy/common';

const live = (over: Partial<Feature> = {}): Feature => ({ id: 'x', status: 'live', label: { th: 'ก', en: 'a' }, proof: 'docs/user/api-reference.md', ...over });
const planned = (over: Partial<Feature> = {}): Feature => ({ id: 'y', status: 'planned', label: { th: 'ก', en: 'a' }, plannedFor: 'Phase 2', ...over });
const pages: PageEntry[] = PAGES;

describe('registry rules (SITE.md)', () => {
  test('the real registry passes', () => {
    expect(() => validateRegistry({ pages: PAGES, features: FEATURES })).not.toThrow();
  });
  test('a live feature without proof fails', () => {
    expect(() => validateRegistry({ pages, features: [live({ proof: undefined })] })).toThrow(/live but has no proof/);
  });
  test('a planned feature without plannedFor fails', () => {
    expect(() => validateRegistry({ pages, features: [planned({ plannedFor: undefined })] })).toThrow(/no plannedFor/);
  });
  test('an unknown linksTo slug fails', () => {
    expect(() => validateRegistry({ pages, features: [live({ linksTo: 'nope' })] })).toThrow(/unknown slug "nope"/);
  });
  test('an empty TH or EN string fails', () => {
    expect(() => validateRegistry({ pages, features: [live({ label: { th: '', en: 'a' } })] })).toThrow(/th is empty/);
    expect(() => validateRegistry({ pages, features: [live({ label: { th: 'ก', en: '  ' } })] })).toThrow(/en is empty/);
  });
  test('a planned page without plannedFor fails', () => {
    expect(() => validateRegistry({ pages: [{ slug: 'x', status: 'planned', plannedFor: '' }], features: [] })).toThrow(/planned but has no plannedFor/);
  });
  test('every live feature proof points at a real file', () => {
    for (const f of FEATURES.filter((f) => f.status === 'live')) {
      const file = join(import.meta.dir, '../../..', f.proof!.split('#')[0]!);
      expect(existsSync(file), `${f.id}: ${f.proof}`).toBe(true);
    }
  });
});

describe('copy', () => {
  test('no empty or length-mismatched TH/EN anywhere in the copy', () => {
    const all = { LANDING, ABOUT, WHAT_IS, MIGRATE, PRIVACY, FORM, FOOTER, THANKS };
    expect(findEmptyTranslations(all, 'copy')).toEqual([]);
  });
  test('no middle dot in Thai copy, no time claims, no founder wording', () => {
    const json = JSON.stringify({ LANDING, ABOUT, MIGRATE, PRIVACY, FORM, FOOTER, THANKS, WHAT_IS });
    expect(json).not.toMatch(/·/);
    expect(json).not.toMatch(/5 นาที|in 5 minutes|10 minutes/);
    expect(json).not.toMatch(/Founder|ผู้ก่อตั้ง/);
  });
  test('titles and descriptions never carry the price', () => {
    for (const p of PAGES) if (p.status === 'live') expect(JSON.stringify([p.title, p.description])).not.toContain(ENTITY.waitlist.price);
  });
});

describe('docs links', () => {
  test('no hard-coded docs URL outside the registry (use <DocsLink>)', () => {
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const name of readdirSync(dir)) {
        const p = join(dir, name);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(astro|ts|mjs)$/.test(name) && !p.endsWith('data/registry.ts') && readFileSync(p, 'utf8').includes('docs.mailmeow.dev')) offenders.push(p);
      }
    };
    walk(join(import.meta.dir, '../../src'));
    expect(offenders).toEqual([]);
  });
});
