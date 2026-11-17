// Which link brought the visitor: an allow-listed ?s= value, kept in localStorage like the price variant.
// Anything else is 'direct'. The Function re-checks the value, so a forged one is stored as 'direct'.

export const SOURCES = ['fb1', 'fb2', 'x', 'threads', 'video', 'meetup'] as const;
export const DIRECT = 'direct';
export type Source = (typeof SOURCES)[number] | typeof DIRECT;

/** A known source, or 'direct' for anything else (missing, wrong type, unknown value). */
export const normalizeSource = (v: unknown): Source => (typeof v === 'string' && (SOURCES as readonly string[]).includes(v) ? (v as Source) : DIRECT);

export interface SourceDoc {
  querySelectorAll(selector: string): ArrayLike<{ value?: string }>;
}
export interface SourceStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

/**
 * Reads the stored source or, on a first visit with a valid ?s=, stores it, then fills the form's hidden field.
 * The first valid source wins; a visit without one never overwrites it and never writes 'direct'.
 * Serialised with Function.prototype.toString into an inline script, so it must stay self-contained
 * (the allow-list below repeats SOURCES; a unit test keeps the two equal).
 */
export function captureSource(doc: SourceDoc, storage: SourceStorage | null, search: string): string {
  const allowed = ['fb1', 'fb2', 'x', 'threads', 'video', 'meetup'];
  let v = 'direct';
  try {
    const stored = storage ? storage.getItem('mm_source') : null;
    if (stored && allowed.indexOf(stored) >= 0) v = stored;
  } catch (e) {
    v = 'direct';
  }
  if (v === 'direct') {
    const q = new URLSearchParams(search).get('s');
    if (q && allowed.indexOf(q) >= 0) {
      v = q;
      try {
        if (storage) storage.setItem('mm_source', q);
      } catch (e) {
        // Storage is blocked: this page's form still sends the source.
      }
    }
  }
  const fields = doc.querySelectorAll('[data-source-field]');
  for (let i = 0; i < fields.length; i++) fields[i]!.value = v;
  return v;
}

/** The inline <script> body, run once at the end of <body>. */
export const SOURCE_SCRIPT = `(${captureSource.toString()})(document,(function(){try{return localStorage}catch(e){return null}})(),location.search)`;
