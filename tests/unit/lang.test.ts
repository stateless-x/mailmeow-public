import { describe, expect, test } from 'bun:test';
import { langFromAcceptLanguage, langFromCookie, pickLang } from '../../src/lib/lang';

describe('root language pick (SITE.md rule 2)', () => {
  test('cookie wins over Accept-Language', () => {
    expect(pickLang('a=1; mm_lang=en', 'th')).toBe('en');
    expect(pickLang('mm_lang=th', 'en-US')).toBe('th');
  });
  test('an invalid cookie is ignored', () => {
    expect(langFromCookie('mm_lang=fr')).toBeNull();
    expect(pickLang('mm_lang=fr', 'th')).toBe('th');
  });
  test('Accept-Language: top preference decides', () => {
    expect(langFromAcceptLanguage('th')).toBe('th');
    expect(langFromAcceptLanguage('th-TH,th;q=0.9,en;q=0.8')).toBe('th');
    expect(langFromAcceptLanguage('en-US,en;q=0.9,th;q=0.8')).toBe('en');
    expect(langFromAcceptLanguage('en;q=0.5, th;q=0.9')).toBe('th');
  });
  test('anything else, or nothing, is English', () => {
    expect(langFromAcceptLanguage('ja,fr;q=0.8')).toBe('en');
    expect(langFromAcceptLanguage('')).toBe('en');
    expect(pickLang(null, null)).toBe('en');
  });
});
