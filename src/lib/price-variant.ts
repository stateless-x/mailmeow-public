// The $9 vs $12 per-visitor price test (docs/GO-TO-MARKET.md §Pricing).
// Server HTML never varies: every price is a <span data-price data-v9=".." data-v12="..">$9</span> whose visible
// text is the $9 default. paintPriceVariant() runs inline at the end of <body>, picks one variant per browser,
// keeps it in localStorage, and rewrites every such span plus the form's hidden field, so the pricing section
// and Q4 always show the same price.

export const PRICE_VARIANTS = {
  '9': { usd: '$9', thb: '฿299' },
  '12': { usd: '$12', thb: '฿399' },
} as const;

export type PriceVariant = keyof typeof PRICE_VARIANTS;
export const DEFAULT_VARIANT: PriceVariant = '9';

/** What the waitlist endpoint accepts. 'nojs' is what a submit without JavaScript carries (no variant was ever picked). */
export const SUBMIT_VARIANTS = ['9', '12', 'nojs'] as const;
export type SubmitVariant = (typeof SUBMIT_VARIANTS)[number];
export const isSubmitVariant = (v: unknown): v is SubmitVariant => typeof v === 'string' && (SUBMIT_VARIANTS as readonly string[]).includes(v);

export const STORAGE_KEY = 'mm_price_variant';

/** The slice of the DOM paintPriceVariant touches, so tests can fake it. */
export interface PriceDoc {
  querySelectorAll(selector: string): ArrayLike<{ textContent: string | null; value?: string; getAttribute(name: string): string | null }>;
}
export interface PriceStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/**
 * Picks (first visit) or reads (later visits) the visitor's variant and paints it. Returns the variant.
 * Serialised with Function.prototype.toString into an inline script, so it must stay self-contained: no imports,
 * no outside names. If storage is unavailable the visitor cannot be kept on one price across pages, so they get
 * the $9 default rather than a random price that could change on the next page.
 */
export function paintPriceVariant(doc: PriceDoc, storage: PriceStorage | null, random: () => number): '9' | '12' {
  let v: string | null = null;
  try {
    v = storage ? storage.getItem('mm_price_variant') : null;
  } catch (e) {
    v = null;
  }
  if (v !== '9' && v !== '12') {
    v = random() < 0.5 ? '9' : '12';
    let saved = false;
    try {
      if (storage) {
        storage.setItem('mm_price_variant', v);
        saved = true;
      }
    } catch (e) {
      saved = false;
    }
    if (!saved) v = '9';
  }
  const prices = doc.querySelectorAll('[data-price]');
  for (let i = 0; i < prices.length; i++) {
    const el = prices[i]!;
    const text = el.getAttribute('data-v' + v);
    if (text) el.textContent = text;
  }
  const fields = doc.querySelectorAll('[data-price-field]');
  for (let i = 0; i < fields.length; i++) fields[i]!.value = v;
  return v as '9' | '12';
}

/** The inline <script> body: runs once, synchronously, at the end of <body>. */
export const PAINT_SCRIPT = `(${paintPriceVariant.toString()})(document,(function(){try{return localStorage}catch(e){return null}})(),Math.random)`;
