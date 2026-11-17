import type { APIRoute } from 'astro';
import { isProduction } from '../lib/env';
import { renderRobots } from '../lib/seo';

export const GET: APIRoute = () =>
  new Response(renderRobots(isProduction(import.meta.env as Record<string, string | undefined>)), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
