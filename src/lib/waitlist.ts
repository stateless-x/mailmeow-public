export interface WaitlistInput {
  email: string;
  building?: string;
  ai?: string[];
  volume?: string;
  wouldPay?: string;
  promptpay?: string;
  consent: boolean;
  lang: 'th' | 'en';
  /** The price variant this visitor was shown: '9' or '12'. A native (no-JS) submit sends 'nojs'. */
  price_variant: string;
  /** Which link brought the visitor (lib/source.ts); the server re-checks it. */
  source: string;
  turnstileToken?: string;
}

export type WaitlistErrorKey = 'email' | 'wouldPay' | 'consent';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Required: email, Q4 (wouldPay), consent. Everything else is optional (copy/landing.md §11). */
export function validateWaitlist(v: Pick<WaitlistInput, 'email' | 'wouldPay' | 'consent'>): WaitlistErrorKey[] {
  const errors: WaitlistErrorKey[] = [];
  if (!EMAIL.test(v.email.trim())) errors.push('email');
  if (!v.wouldPay) errors.push('wouldPay');
  if (!v.consent) errors.push('consent');
  return errors;
}

/** Reads the form the way the native POST would, as the JSON body for /api/waitlist. */
export function readWaitlistForm(form: HTMLFormElement): WaitlistInput {
  const d = new FormData(form);
  const str = (k: string) => (d.get(k) as string | null) ?? undefined;
  return {
    email: (str('email') ?? '').trim(),
    building: str('building'),
    ai: d.getAll('ai') as string[],
    volume: str('volume'),
    wouldPay: str('wouldPay'),
    promptpay: str('promptpay'),
    consent: d.get('consent') === 'on',
    lang: (str('lang') as 'th' | 'en') ?? 'en',
    price_variant: str('price_variant') ?? '',
    source: str('source') ?? 'direct',
    turnstileToken: str('cf-turnstile-response'),
  };
}
