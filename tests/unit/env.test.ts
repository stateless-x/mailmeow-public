import { describe, expect, test } from 'bun:test';
import { resolveTurnstileSiteKey } from '../../src/lib/env';

describe('resolveTurnstileSiteKey', () => {
  test('returns the key when set', () => expect(resolveTurnstileSiteKey('1x00', true)).toBe('1x00'));
  test('preview without a key gives null (placeholder)', () => expect(resolveTurnstileSiteKey(undefined, false)).toBeNull());
  test('production without a key throws', () => expect(() => resolveTurnstileSiteKey('', true)).toThrow('PUBLIC_TURNSTILE_SITE_KEY'));
});
