import { describe, expect, test } from 'bun:test';
import { ENTITY, FEATURES, PAGES } from '../../src/data/registry';
import type { LivePage } from '../../src/data/types';
import { buildJsonLd } from '../../src/lib/jsonld';

const page = (kind: string) => PAGES.find((p): p is LivePage => p.status === 'live' && p.kind === kind)!;
const build = (kind: string, lang: 'th' | 'en', faq?: { q: string; a: string }[]) =>
  buildJsonLd({ entity: ENTITY, features: FEATURES, page: page(kind), lang, faq, orgDescription: page('landing').description[lang] }) as { '@graph': Record<string, any>[] };
const type = (g: { '@graph': Record<string, any>[] }, t: string): Record<string, any> => g['@graph'].find((n) => n['@type'] === t)!;

describe('JSON-LD', () => {
  test('Organization and a local Person on every page, Person is local', () => {
    for (const kind of ['landing', 'migrate', 'about', 'privacy', 'terms', 'thanks']) {
      const g = build(kind, 'en');
      expect(type(g, 'Organization')['@id']).toBe('https://mailmeow.dev/#organization');
      expect(type(g, 'Organization').creator).toBeUndefined();
      expect(type(g, 'Person')['@id']).toBe('https://mailmeow.dev/#creator');
    }
  });
  test('creator is on WebSite and SoftwareApplication, not Organization', () => {
    const g = build('landing', 'en');
    expect(type(g, 'WebSite').creator).toEqual({ '@id': 'https://mailmeow.dev/#creator' });
    expect(type(g, 'SoftwareApplication').creator).toEqual({ '@id': 'https://mailmeow.dev/#creator' });
  });
  test('Person.jobTitle follows the page language', () => {
    expect(type(build('about', 'th'), 'Person').jobTitle).toBe('นักพัฒนาเทคโนโลยีเพื่อธุรกิจ');
    expect(type(build('about', 'en'), 'Person').jobTitle).toBe('Business Technology Engineer');
  });
  test('no offers, founder, price or version anywhere', () => {
    for (const kind of ['landing', 'migrate', 'about'] as const) {
      const s = JSON.stringify(build(kind, 'th', [{ q: 'q', a: 'a' }]));
      expect(s).not.toMatch(/offers|founder|"price"|softwareVersion|aggregateRating/i);
      for (const price of ['$9', '$12', '฿299', '฿399']) expect(s).not.toContain(price);
    }
  });
  test('landing: WebSite and SoftwareApplication with live features only', () => {
    const g = build('landing', 'en');
    expect(type(g, 'WebSite')).toBeDefined();
    const list = type(g, 'SoftwareApplication').featureList as string[];
    expect(list).toHaveLength(FEATURES.filter((f) => f.status === 'live').length);
    expect(list).not.toContain('Billing');
  });
  test('subpages: AboutPage or WebPage plus BreadcrumbList', () => {
    expect(type(build('about', 'en'), 'AboutPage')).toBeDefined();
    expect(type(build('privacy', 'en'), 'BreadcrumbList').itemListElement).toHaveLength(2);
  });
  test('FAQPage is built from the given array', () => {
    const g = build('landing', 'en', [{ q: 'Q1', a: 'A1' }]);
    expect(type(g, 'FAQPage').mainEntity[0]).toEqual({ '@type': 'Question', name: 'Q1', acceptedAnswer: { '@type': 'Answer', text: 'A1' } });
  });
});
