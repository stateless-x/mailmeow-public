import { describe, expect, test } from 'bun:test';
import { PAINT_SCRIPT, PRICE_VARIANTS, isSubmitVariant, paintPriceVariant, type PriceStorage } from '../../src/lib/price-variant';

type El = { textContent: string; value?: string; attrs: Record<string, string>; getAttribute(n: string): string | null };
const price = (v9: string, v12: string): El => ({ textContent: v9, attrs: { 'data-v9': v9, 'data-v12': v12 }, getAttribute(n) { return this.attrs[n] ?? null; } });
const field = (): El => ({ textContent: '', value: 'nojs', attrs: {}, getAttribute: () => null });
/** A document with a pricing-section price, a Q4 price and the form's hidden field. */
const page = () => {
  const pricing = price('$9', '$12');
  const q4 = price('$9', '$12');
  const f = field();
  const doc = { querySelectorAll: (sel: string) => (sel === '[data-price]' ? [pricing, q4] : sel === '[data-price-field]' ? [f] : []) };
  return { doc, pricing, q4, f };
};
const memory = (): PriceStorage & { data: Map<string, string> } => {
  const data = new Map<string, string>();
  return { data, getItem: (k) => data.get(k) ?? null, setItem: (k, v) => void data.set(k, v) };
};

describe('paintPriceVariant', () => {
  test('first visit picks at random, paints the pricing section and Q4 with the same value, and sets the form field', () => {
    for (const [roll, v, usd] of [[0.1, '9', '$9'], [0.9, '12', '$12']] as const) {
      const { doc, pricing, q4, f } = page();
      const storage = memory();
      expect(paintPriceVariant(doc, storage, () => roll)).toBe(v);
      expect(pricing.textContent).toBe(usd);
      expect(q4.textContent).toBe(usd);
      expect(f.value).toBe(v);
      expect(storage.data.get('mm_price_variant')).toBe(v);
    }
  });

  test('the variant is sticky: a later visit ignores the dice', () => {
    const storage = memory();
    paintPriceVariant(page().doc, storage, () => 0.9); // first visit: 12
    for (const roll of [0.0, 0.1, 0.49, 0.99]) {
      const { doc, pricing, q4, f } = page();
      expect(paintPriceVariant(doc, storage, () => roll)).toBe('12');
      expect([pricing.textContent, q4.textContent, f.value]).toEqual(['$12', '$12', '12']);
    }
  });

  test('a junk stored value is replaced, not trusted', () => {
    const storage = memory();
    storage.data.set('mm_price_variant', '999');
    expect(paintPriceVariant(page().doc, storage, () => 0.9)).toBe('12');
    expect(storage.data.get('mm_price_variant')).toBe('12');
  });

  test('without usable storage the visitor gets the $9 default, never a random price that could change next page', () => {
    const throwing: PriceStorage = { getItem: () => { throw new Error('denied'); }, setItem: () => { throw new Error('denied'); } };
    for (const storage of [null, throwing]) {
      const { doc, pricing, q4, f } = page();
      expect(paintPriceVariant(doc, storage, () => 0.99)).toBe('9');
      expect([pricing.textContent, q4.textContent, f.value]).toEqual(['$9', '$9', '9']);
    }
  });

  test('the inline script is self-contained (no imports or outside names)', () => {
    expect(PAINT_SCRIPT).not.toMatch(/\bimport\b|PRICE_VARIANTS|STORAGE_KEY/);
    expect(PAINT_SCRIPT).toContain('mm_price_variant');
  });
});

describe('variants', () => {
  test('the server accepts 9, 12 and nojs only', () => {
    for (const ok of ['9', '12', 'nojs']) expect(isSubmitVariant(ok)).toBe(true);
    for (const bad of ['$9', '10', '', 9, 12, null, undefined, 'NOJS']) expect(isSubmitVariant(bad)).toBe(false);
  });
  test('the table matches GO-TO-MARKET.md: $9 about ฿299, $12 about ฿399', () => {
    expect(PRICE_VARIANTS).toEqual({ '9': { usd: '$9', thb: '฿299' }, '12': { usd: '$12', thb: '฿399' } });
  });
});
