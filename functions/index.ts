// Cloudflare Pages Function for the root path "/" only (SITE.md rules 2 and 3).
// Deeper URLs are static files and are never redirected, so a shared /th/... link always shows Thai.
import { pickLang } from '../src/lib/lang';

interface Ctx {
  request: Request;
}

export const onRequestGet = ({ request }: Ctx): Response => {
  const lang = pickLang(request.headers.get('Cookie'), request.headers.get('Accept-Language'));
  return new Response(null, {
    status: 302,
    headers: {
      Location: new URL(`/${lang}/`, request.url).toString(),
      Vary: 'Accept-Language, Cookie',
    },
  });
};

export const onRequestHead = onRequestGet;
