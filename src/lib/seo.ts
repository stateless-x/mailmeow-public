import { ENTITY, PAGES } from '../data/registry';
import type { Lang, LivePage } from '../data/types';
import { LANGS } from '../data/types';

export const livePages = (): LivePage[] => PAGES.filter((p): p is LivePage => p.status === 'live');

/** Site-relative path with trailing slash: /th/, /th/about/ */
export function pagePath(lang: Lang, slug: string): string {
  return `/${lang}/${slug ? `${slug}/` : ''}`;
}

export const absoluteUrl = (path: string): string => new URL(path, ENTITY.url).toString();

/** The one hreflang helper: th, en, and x-default (SITE.md rule 1: x-default is /en/). */
export function alternates(slug: string): { hreflang: string; href: string }[] {
  return [
    ...LANGS.map((l) => ({ hreflang: l, href: absoluteUrl(pagePath(l, slug)) })),
    { hreflang: 'x-default', href: absoluteUrl(pagePath('en', slug)) },
  ];
}

/** Paths the sitemap may list: indexable live pages in both languages. */
export function indexablePaths(): Set<string> {
  const set = new Set<string>();
  for (const p of livePages()) if (p.indexable) for (const l of LANGS) set.add(pagePath(l, p.slug));
  return set;
}

// AI training crawlers can be blocked by listing them here (SITE.md "Crawling"). Empty = allow all.
export const BLOCKED_CRAWLERS: string[] = [];

export function renderRobots(production: boolean): string {
  if (!production) return 'User-agent: *\nDisallow: /\n';
  const blocked = BLOCKED_CRAWLERS.map((ua) => `User-agent: ${ua}\nDisallow: /\n`);
  const everyone = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${absoluteUrl('/sitemap-index.xml')}\n`;
  return [...blocked, everyone].join('\n');
}
