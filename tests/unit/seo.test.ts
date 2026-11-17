import { describe, expect, test } from 'bun:test';
import { alternates, indexablePaths, renderRobots, pagePath } from '../../src/lib/seo';
import { resolveContact, isProduction, CONTACT_PLACEHOLDER } from '../../src/lib/env';

describe('hreflang', () => {
  test('th, en and x-default pointing at /en/', () => {
    expect(alternates('about')).toEqual([
      { hreflang: 'th', href: 'https://mailmeow.dev/th/about/' },
      { hreflang: 'en', href: 'https://mailmeow.dev/en/about/' },
      { hreflang: 'x-default', href: 'https://mailmeow.dev/en/about/' },
    ]);
    expect(alternates('').at(-1)?.href).toBe('https://mailmeow.dev/en/');
  });
  test('landing path', () => expect(pagePath('th', '')).toBe('/th/'));
});

describe('sitemap filter', () => {
  test('lists indexable pages in both languages, not waitlist-thanks or planned pages', () => {
    const paths = indexablePaths();
    expect(paths.has('/th/about/')).toBe(true);
    expect(paths.has('/en/migrate-from-resend/')).toBe(true);
    expect(paths.has('/th/waitlist-thanks/')).toBe(false);
    expect(paths.has('/en/pricing/')).toBe(false);
    expect(paths.has('/')).toBe(false);
  });
});

describe('robots.txt', () => {
  test('production allows all, blocks /api/, lists the sitemap', () => {
    const r = renderRobots(true);
    expect(r).toContain('User-agent: *\nAllow: /\nDisallow: /api/');
    expect(r).toContain('Sitemap: https://mailmeow.dev/sitemap-index.xml');
  });
  test('any other build disallows everything', () => {
    expect(renderRobots(false)).toBe('User-agent: *\nDisallow: /\n');
  });
});

describe('env flag and contact', () => {
  test('only PUBLIC_ENV=production is production', () => {
    expect(isProduction({ PUBLIC_ENV: 'production' })).toBe(true);
    expect(isProduction({ PUBLIC_ENV: 'preview' })).toBe(false);
    expect(isProduction({})).toBe(false);
  });
  test('unset contact: production throws, preview shows a placeholder', () => {
    expect(() => resolveContact(undefined, true)).toThrow(/contactEmail/);
    expect(resolveContact(undefined, false)).toEqual({ email: null, text: CONTACT_PLACEHOLDER });
    expect(resolveContact('hi@mailmeow.dev', true).email).toBe('hi@mailmeow.dev');
  });
});
