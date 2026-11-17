import { ENTITY } from '../data/registry';

type Env = Record<string, string | undefined>;

/** Only PUBLIC_ENV=production produces an indexable site. */
export function isProduction(env: Env): boolean {
  return env.PUBLIC_ENV === 'production';
}

export const CONTACT_PLACEHOLDER = '[contact email not set]';

/** The address for {contact}. Production fails the build while it is unset; preview shows a placeholder. */
export function resolveContact(contactEmail: string | undefined, prod: boolean): { email: string | null; text: string } {
  if (contactEmail) return { email: contactEmail, text: contactEmail };
  if (prod) throw new Error('ENTITY.contactEmail is unset: a production build needs a public contact address (SITE.md "Not decided").');
  return { email: null, text: CONTACT_PLACEHOLDER };
}

export function currentContact() {
  return resolveContact(ENTITY.contactEmail, isProduction(import.meta.env as Env));
}

/**
 * The public Turnstile site key (PUBLIC_TURNSTILE_SITE_KEY). Production fails the build while it is unset;
 * preview renders a visible placeholder instead of the widget.
 */
export function resolveTurnstileSiteKey(siteKey: string | undefined, prod: boolean): string | null {
  if (siteKey) return siteKey;
  if (prod) throw new Error('PUBLIC_TURNSTILE_SITE_KEY is unset: a production build needs the Turnstile site key (see README.md).');
  return null;
}
