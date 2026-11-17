import type { Lang } from '../data/types';

/** Reads mm_lang from a Cookie header. Anything but th or en is ignored. */
export function langFromCookie(cookie: string | null | undefined): Lang | null {
  const m = /(?:^|;\s*)mm_lang=(th|en)(?:;|$)/.exec(cookie ?? '');
  return m ? (m[1] as Lang) : null;
}

/** The most preferred language in an Accept-Language header decides: th, else en. */
export function langFromAcceptLanguage(header: string | null | undefined): Lang {
  const ranked = (header ?? '')
    .split(',')
    .map((part, i) => {
      const [tag, ...params] = part.trim().split(';');
      const q = params.map((p) => /^\s*q=([\d.]+)/.exec(p)?.[1]).find(Boolean);
      return { tag: (tag ?? '').toLowerCase(), q: q === undefined ? 1 : Number(q), i };
    })
    .filter((x) => x.tag && x.q > 0)
    .sort((a, b) => b.q - a.q || a.i - b.i);
  const top = ranked[0]?.tag.split('-')[0];
  return top === 'th' ? 'th' : 'en';
}

/** SITE.md rule 2: cookie first, then Accept-Language. */
export function pickLang(cookie: string | null | undefined, acceptLanguage: string | null | undefined): Lang {
  return langFromCookie(cookie) ?? langFromAcceptLanguage(acceptLanguage);
}
