// Thin shell for POST /api/waitlist. Logic lives in src/lib/waitlist-handler.ts.
import { handleWaitlist, verifyTurnstile, type Env } from '../../src/lib/waitlist-handler';

interface Ctx {
  request: Request;
  env: Env;
}

export const onRequestPost = ({ request, env }: Ctx): Promise<Response> => handleWaitlist(request, env, { verify: verifyTurnstile });

/** Any other method. onRequestPost takes precedence for POST. */
export const onRequest = (): Response => new Response(null, { status: 405, headers: { Allow: 'POST' } });
