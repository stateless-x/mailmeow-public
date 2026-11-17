import { ENTITY } from '../data/registry';
import type { Lang } from '../data/types';
import { currentContact } from './env';
import { escapeHtml, plainText, renderInline, type InlineContext } from './inline';

export function inlineContext(lang: Lang): InlineContext {
  const c = currentContact();
  return {
    lang,
    price: ENTITY.waitlist.price,
    contactHtml: c.email
      ? `<a href="mailto:${escapeHtml(c.email)}">${escapeHtml(c.email)}</a>`
      : `<mark class="placeholder">${escapeHtml(c.text)}</mark>`,
    lastVerified: ENTITY.lastVerified,
    date: ENTITY.privacyUpdated,
  };
}

export const rich = (text: string, lang: Lang): string => renderInline(text, inlineContext(lang));

/** Plain text with every placeholder resolved: for JSON-LD answers and other places that cannot hold HTML. */
export function plain(text: string): string {
  const c = currentContact();
  return plainText(text, { price: ENTITY.waitlist.price, contactText: c.text, lastVerified: ENTITY.lastVerified, date: ENTITY.privacyUpdated });
}
