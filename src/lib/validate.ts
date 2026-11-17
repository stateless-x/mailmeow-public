import type { Feature, PageEntry } from '../data/types';

/** Throws one error listing every broken registry rule (SITE.md "One registry drives everything"). */
export function validateRegistry({ pages, features }: { pages: PageEntry[]; features: Feature[] }): void {
  const problems: string[] = [];
  const slugs = new Set(pages.map((p) => p.slug));

  for (const f of features) {
    if (f.status === 'live' && !f.proof) problems.push(`feature "${f.id}" is live but has no proof`);
    if (f.status === 'planned' && !f.plannedFor) problems.push(`feature "${f.id}" is planned but has no plannedFor`);
    if (f.linksTo !== undefined && !slugs.has(f.linksTo)) problems.push(`feature "${f.id}" links to unknown slug "${f.linksTo}"`);
  }
  for (const p of pages) {
    if (p.status === 'planned' && !p.plannedFor) problems.push(`page "${p.slug}" is planned but has no plannedFor`);
  }
  problems.push(...findEmptyTranslations({ pages, features }, 'registry'));

  if (problems.length) throw new Error(`Registry check failed:\n- ${problems.join('\n- ')}`);
}

const isLeaf = (v: unknown): v is string | string[] =>
  typeof v === 'string' || (Array.isArray(v) && v.every((x) => typeof x === 'string'));
const isEmpty = (v: string | string[]): boolean =>
  typeof v === 'string' ? v.trim() === '' : v.length === 0 || v.some((x) => x.trim() === '');

/** Walks any value; every { th, en } pair of strings (or string lists) must be non-empty and the same length. */
export function findEmptyTranslations(value: unknown, path: string): string[] {
  const out: string[] = [];
  const walk = (v: unknown, p: string) => {
    if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${p}[${i}]`));
    if (!v || typeof v !== 'object') return;
    const o = v as Record<string, unknown>;
    if (isLeaf(o.th) && isLeaf(o.en)) {
      if (isEmpty(o.th)) out.push(`${p}.th is empty`);
      if (isEmpty(o.en)) out.push(`${p}.en is empty`);
      if (Array.isArray(o.th) && Array.isArray(o.en) && o.th.length !== o.en.length) out.push(`${p}: th and en lists differ in length`);
      return;
    }
    for (const [k, x] of Object.entries(o)) walk(x, `${p}.${k}`);
  };
  walk(value, path);
  return out;
}
