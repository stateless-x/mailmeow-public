// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { ENTITY } from './src/data/registry.ts';
import { indexablePaths } from './src/lib/seo.ts';
import { isProduction } from './src/lib/env.ts';

const INDEXABLE_PATHS = indexablePaths();

/** Non-production builds also send X-Robots-Tag: noindex (Cloudflare Pages reads dist/_headers). */
function noindexHeaders() {
  return {
    name: 'mailmeow-noindex-headers',
    hooks: {
      'astro:build:done': async (/** @type {{ dir: URL }} */ { dir }) => {
        if (isProduction(process.env)) return;
        await writeFile(fileURLToPath(new URL('_headers', dir)), '/*\n  X-Robots-Tag: noindex\n');
      },
    },
  };
}

export default defineConfig({
  site: ENTITY.url,
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => INDEXABLE_PATHS.has(new URL(page).pathname),
      i18n: { defaultLocale: 'en', locales: { th: 'th', en: 'en' } },
    }),
    noindexHeaders(),
  ],
});
