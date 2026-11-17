import { defineMiddleware } from 'astro:middleware';
import { wrapThaiPhrases } from './lib/phrases';

// Runs at build time and in `astro dev`.
export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next();
  if (!response.headers.get('content-type')?.includes('text/html')) return response;
  return new Response(wrapThaiPhrases(await response.text()), { status: response.status, headers: response.headers });
});
