import type { Lang } from '../data/types';
import { pagePath } from './seo';

export interface InlineContext {
  lang: Lang;
  price: string;
  /** Already-rendered HTML for {contact}. */
  contactHtml: string;
  lastVerified: string;
  date: string;
}

export const escapeHtml = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Copy strings are plain text with a few markers:
 *   **bold**   `code`   ==highlight==   [text](https://x) or [text](@slug)   {price} {contact} {LAST_VERIFIED} {date}
 * {email} is filled in the browser (waitlist success) and is left untouched here. Other braces, like {id}, are literal.
 */
export function renderInline(text: string, ctx: InlineContext): string {
  const stash: string[] = [];
  const hold = (html: string) => `\u0000${stash.push(html) - 1}\u0000`;

  let s = escapeHtml(text);
  s = s.replace(/`([^`]+)`/g, (_, c: string) => hold(`<code>${c}</code>`));
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label: string, target: string) => {
    const href = target.startsWith('@') ? pagePath(ctx.lang, target.slice(1)) : target;
    return hold(`<a href="${href}">${label}</a>`);
  });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/==([^=]+)==/g, '<span class="hl nw">$1</span>');
  s = s
    .replace(/\{price\}/g, escapeHtml(ctx.price))
    .replace(/\{contact\}/g, ctx.contactHtml)
    .replace(/\{LAST_VERIFIED\}/g, escapeHtml(ctx.lastVerified))
    .replace(/\{date\}/g, escapeHtml(ctx.date));
  return s.replace(/\u0000(\d+)\u0000/g, (_, i: string) => stash[Number(i)] ?? '');
}

/** The same string as plain text, for places that cannot hold HTML (JSON-LD, meta, form hints that need textContent). */
export function plainText(text: string, ctx: Pick<InlineContext, 'price' | 'lastVerified' | 'date'> & { contactText: string }): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/==([^=]+)==/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\{price\}/g, ctx.price)
    .replace(/\{contact\}/g, ctx.contactText)
    .replace(/\{LAST_VERIFIED\}/g, ctx.lastVerified)
    .replace(/\{date\}/g, ctx.date);
}
