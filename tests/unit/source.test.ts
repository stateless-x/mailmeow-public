import { describe, expect, test } from 'bun:test';
import { DIRECT, SOURCES, SOURCE_SCRIPT, captureSource, normalizeSource, type SourceStorage } from '../../src/lib/source';

const memory = (): SourceStorage & { data: Map<string, string> } => {
  const data = new Map<string, string>();
  return { data, getItem: (k) => data.get(k) ?? null, setItem: (k, v) => void data.set(k, v) };
};
const form = () => {
  const f = { value: 'direct' };
  return { f, doc: { querySelectorAll: (sel: string) => (sel === '[data-source-field]' ? [f] : []) } };
};

describe('captureSource', () => {
  test('every allow-listed ?s= is captured, stored and put in the form field', () => {
    for (const s of SOURCES) {
      const { f, doc } = form();
      const storage = memory();
      expect(captureSource(doc, storage, `?s=${s}&utm=1`)).toBe(s);
      expect(f.value).toBe(s);
      expect(storage.data.get('mm_source')).toBe(s);
    }
  });

  test('the inline allow-list equals SOURCES (nothing extra, nothing missing)', () => {
    for (const s of SOURCES) expect(captureSource(form().doc, memory(), `?s=${s}`)).toBe(s);
    for (const bad of ['', 'FB1', 'fb3', 'direct', 'facebook', '<script>', 'x%20', 'fb1,x']) {
      expect(captureSource(form().doc, memory(), `?s=${bad}`)).toBe(DIRECT);
    }
  });

  test('no ?s= means direct, and nothing is written', () => {
    const { f, doc } = form();
    const storage = memory();
    expect(captureSource(doc, storage, '')).toBe('direct');
    expect(f.value).toBe('direct');
    expect(storage.data.size).toBe(0);
  });

  test('sticky: the first valid source wins on later visits, with or without a new ?s=', () => {
    const storage = memory();
    captureSource(form().doc, storage, '?s=fb1');
    for (const search of ['', '?s=x', '?s=bogus']) {
      const { f, doc } = form();
      expect(captureSource(doc, storage, search)).toBe('fb1');
      expect(f.value).toBe('fb1');
    }
  });

  test('a junk stored value is ignored', () => {
    const storage = memory();
    storage.data.set('mm_source', 'evil');
    expect(captureSource(form().doc, storage, '')).toBe('direct');
  });

  test('blocked storage: this page still sends the source, nothing throws', () => {
    const throwing: SourceStorage = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('denied'); } };
    for (const storage of [null, throwing]) {
      const { f, doc } = form();
      expect(captureSource(doc, storage, '?s=video')).toBe('video');
      expect(f.value).toBe('video');
    }
  });

  test('the inline script is self-contained', () => {
    expect(SOURCE_SCRIPT).not.toMatch(/\bimport\b|SOURCES|normalizeSource/);
    expect(SOURCE_SCRIPT).toContain('mm_source');
  });
});

describe('normalizeSource (server re-check)', () => {
  test('known values pass; everything else is direct', () => {
    for (const s of SOURCES) expect(normalizeSource(s)).toBe(s);
    for (const bad of ['direct', 'FB1', 'fb3', '', ' x', 1, null, undefined, ['x'], {}]) expect(normalizeSource(bad)).toBe('direct');
  });
});
