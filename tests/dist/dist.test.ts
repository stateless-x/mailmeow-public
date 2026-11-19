// Runs against the built site in dist/ (bun run build first; `bun run check` does that).
import { describe, expect, test } from 'bun:test';
import { existsSync, readdirSync, readFileSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const root = join(import.meta.dir, '../..');
const dist = join(root, 'dist');

const SLUGS = ['', 'migrate-from-resend', 'about', 'privacy', 'terms', 'waitlist-thanks'];
const LANGS = ['th', 'en'] as const;
const file = (lang: string, slug: string) => join(dist, lang, slug, 'index.html');
const html = (lang: string, slug: string) => readFileSync(file(lang, slug), 'utf8');

const entities = (s: string) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&#x27;/g, "'");
const stripTags = (s: string) => entities(s.replace(/<(script|style)[\s\S]*?<\/\1>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
/** Text of the first element matching a regex for its opening tag. */
const textOf = (h: string, open: RegExp, tag: string) => {
  const m = open.exec(h);
  if (!m) throw new Error(`not found: ${open}`);
  const rest = h.slice(m.index + m[0].length);
  return stripTags(rest.slice(0, rest.indexOf(`</${tag}>`)));
};
const jsonLd = (h: string) => JSON.parse(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/.exec(h)![1]!);
const metaDescription = (h: string) => entities(/<meta name="description" content="([^"]*)"/.exec(h)![1]!);
const title = (h: string) => entities(/<title>([\s\S]*?)<\/title>/.exec(h)![1]!);

const COPY = {
  th: {
    h1: 'ลูกค้าไม่ได้รับอีเมล OTP อีกแล้ว',
    lede: 'mailmeow คือ email API ที่ส่งอีเมล OTP จากแอปให้ และบอกได้ทุกฉบับว่าถึงแล้ว ตีกลับ หรือถูกแจ้งสแปม ไม่ต้องเก่ง DNS ก็ตั้งค่าเองได้',
    maker: 'ทำโดย ภูรินท์ บุรีวงศ์ (Pooh)',
    faq: 'ได้ mailmeow เตรียมค่า DKIM SPF และ DMARC ของโดเมนให้ แค่ก๊อปไปวางในที่ตั้งค่า DNS ส่วนหน้าที่บอกทีละขั้นและเช็กให้ว่าครบหรือยัง กำลังทำอยู่',
    migrateH1: 'ย้ายจาก Resend มา mailmeow',
  },
  en: {
    h1: "Users didn't get their login code. Again.",
    lede: "mailmeow is an email API that sends your app's login codes and shows whether each one was delivered, bounced or marked as spam. You don't need to know DNS to set it up.",
    maker: 'Made by Pooh (Purin Buriwong)',
    faq: 'Yes. mailmeow prepares the DKIM, SPF and DMARC values for your domain; you paste them into your DNS settings. A step-by-step page that checks them for you is in progress.',
    migrateH1: 'Switch from Resend to mailmeow',
  },
} as const;

describe('built pages', () => {
  test('every page exists in both languages, and unbuilt pages do not', () => {
    for (const l of LANGS) for (const s of SLUGS) expect(existsSync(file(l, s)), `${l}/${s}`).toBe(true);
    for (const s of ['pricing', 'features']) for (const l of LANGS) expect(existsSync(file(l, s))).toBe(false);
  });

  for (const lang of LANGS) {
    const c = COPY[lang];
    test(`${lang}: H1, lede, footer maker line and an FAQ answer match the copy docs`, () => {
      const h = html(lang, '');
      expect(textOf(h, /<h1[^>]*>/, 'h1')).toBe(c.h1);
      expect(textOf(h, /<p class="lede">/, 'p')).toBe(c.lede);
      expect(h).not.toContain('class="eyebrow"');
      expect(textOf(h, /<p class="maker">/, 'p')).toBe(c.maker);
      expect(stripTags(h)).toContain(c.faq);
      expect(textOf(html(lang, 'migrate-from-resend'), /<h1[^>]*>/, 'h1')).toBe(c.migrateH1);
    });
  }

  test('the landing talks only about mailmeow: no Resend in its title, meta, JSON-LD, header or main content', () => {
    for (const lang of LANGS) {
      const h = html(lang, '');
      expect(title(h)).not.toMatch(/resend/i);
      expect(metaDescription(h)).not.toMatch(/resend/i);
      for (const m of h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) expect(m[1]).not.toMatch(/resend/i);
      expect(stripTags(/<header class="site-nav">[\s\S]*?<\/header>/.exec(h)![0])).not.toMatch(/resend/i);
      expect(stripTags(/<main>[\s\S]*?<\/main>/.exec(h)![0])).not.toMatch(/resend/i);
      // The switching page stays reachable from the footer.
      expect(h).toContain(`href="/${lang}/migrate-from-resend/"`);
    }
  });

  test('header links land on real targets: section ids exist on the landing, and the button finds a form', () => {
    for (const lang of LANGS) {
      const landing = html(lang, '');
      for (const id of ['how', 'pricing', 'faq', 'waitlist']) expect(landing, `${lang} #${id}`).toContain(`id="${id}"`);
      const about = html(lang, 'about');
      expect(about).not.toContain('id="waitlist"');
      expect(about).toContain(`class="btn btn-primary nav-cta" href="/${lang}/#waitlist"`);
      expect(about).toContain(`href="/${lang}/#pricing"`);
      // The phone menu is a disclosure, so it opens without JavaScript.
      expect(landing).toContain('<details class="nav-menu" data-nav-menu>');
    }
  });

  test('the waitlist form is on the landing and on migrate, with a native fallback and a Turnstile slot', () => {
    for (const lang of LANGS) {
      for (const slug of ['', 'migrate-from-resend']) {
        const h = html(lang, slug);
        expect(h).toContain('id="waitlist"');
        expect(h).toContain('<form method="post" action="/api/waitlist"');
        expect(h).toContain('data-turnstile-slot');
      }
    }
  });
});

describe('Thai phrase grouping', () => {
  test('Thai pages wrap heading phrases in .ph spans, English pages have none', () => {
    const th = html('th', '');
    expect(/<h1[^>]*>(?:(?!<\/h1>)[\s\S])*class="ph"/.test(th)).toBe(true);
    expect(th).toContain('<span class="ph">OTP</span>');
    for (const slug of SLUGS) expect(html('en', slug)).not.toContain('class="ph"');
    expect(textOf(th, /<h1[^>]*>/, 'h1')).toBe(COPY.th.h1);
  });
});

describe('banned content, both languages, every page', () => {
  for (const lang of LANGS) {
    for (const slug of SLUGS) {
      test(`${lang}/${slug || '(landing)'}`, () => {
        const h = html(lang, slug);
        const visible = stripTags(h);
        const ld = JSON.stringify(jsonLd(h));
        if (lang === 'th') expect(visible).not.toContain('·');
        // "15 นาที" (a sign-in link's lifetime on /privacy) is fine; a bare "5 นาที" claim is not.
        for (const banned of [/(?<!\d)5 นาที/, /in 5 minutes/, /10 minutes/, /Founder/, /ผู้ก่อตั้ง/]) {
          expect(visible, String(banned)).not.toMatch(banned);
          expect(ld, String(banned)).not.toMatch(banned);
        }
        expect(title(h)).not.toContain('$9');
        expect(metaDescription(h)).not.toContain('$9');
        expect(ld).not.toContain('$9');
      });
    }
  }
  test('the price is visible on the landing (it only stays out of meta and JSON-LD)', () => {
    for (const lang of LANGS) expect(stripTags(html(lang, ''))).toContain('$9');
  });
});

describe('/privacy (product notice, then the waitlist notice)', () => {
  const banner = { th: 'ฉบับร่าง: นโยบายนี้ยังต้องให้ทนายตรวจ', en: 'Draft: this notice needs a legal check' };
  const waitlist = { th: 'ถ้าลงชื่อรอใช้ไว้', en: 'If you joined the waitlist' };
  for (const lang of LANGS) {
    test(`${lang}: one draft banner first, the product notice before the waitlist section, no markers`, () => {
      const h = html(lang, 'privacy');
      const text = stripTags(h);
      expect(text).toContain(banner[lang]);
      expect(h.match(/class="draft-banner"/g)).toHaveLength(1);
      expect(h.indexOf('class="draft-banner"')).toBeLessThan(h.indexOf('<h1'));
      const product = h.indexOf('id="product"');
      const wl = h.indexOf('id="waitlist-notice"');
      expect(product).toBeGreaterThan(0);
      expect(wl).toBeGreaterThan(product);
      expect(textOf(h, /<h2 id="waitlist-notice"[^>]*>/, 'h2')).toBe(waitlist[lang]);
      expect(text).not.toMatch(/\[legal check\]|\[\?\]|\{contact\}|\{date\}/i);
      // Both notices are there: a product-only and a waitlist-only sentence.
      expect(text).toContain(lang === 'th' ? '__Host-mm_session' : '__Host-mm_session');
      expect(text).toContain(lang === 'th' ? 'ฟอร์มลงชื่อรอใช้' : 'Cloudflare Turnstile');
    });
    test(`${lang}: title and meta cover both audiences`, () => {
      const h = html(lang, 'privacy');
      expect(metaDescription(h)).toContain(lang === 'th' ? 'ลงชื่อรอใช้' : 'join the waitlist');
      expect(metaDescription(h)).toContain(lang === 'th' ? 'dashboard' : 'dashboard');
    });
  }
});

describe('/terms', () => {
  const draft = { th: 'ฉบับร่าง: ข้อตกลงนี้ยังไม่ได้ให้ทนายตรวจ', en: "Draft: a lawyer hasn't reviewed these terms yet" };
  for (const lang of LANGS) {
    test(`${lang}: renders with the doc's H1, the draft banner first, the contact, and no [legal check] text`, () => {
      const h = html(lang, 'terms');
      const text = stripTags(h);
      expect(textOf(h, /<h1[^>]*>/, 'h1')).toBe(lang === 'th' ? 'ข้อตกลงการใช้งาน' : 'Acceptable-use terms');
      expect(text).toContain(draft[lang]);
      expect(h.indexOf('class="draft-banner"')).toBeLessThan(h.indexOf('<h1'));
      expect(text).toMatch(lang === 'th' ? /เวอร์ชัน 2026-11-draft แก้ไขล่าสุด 2026-11-18/ : /Version 2026-11-draft ?, last updated 2026-11-18/);
      expect(text).not.toMatch(/\[legal check\]|\{contact\}|\{date\}/i);
      expect(text).toContain(lang === 'th' ? 'Workspace' : 'workspace');
      expect(h).toContain('<meta name="robots" content="noindex, nofollow">'); // preview build
    });
    test(`${lang}: every page footer links to the terms in that language`, () => {
      for (const slug of SLUGS) {
        const footer = /<footer[\s\S]*?<\/footer>/.exec(html(lang, slug))![0];
        expect(footer).toContain(`<a href="/${lang}/terms/">${lang === 'th' ? 'ข้อตกลงการใช้งาน' : 'Acceptable-use terms'}</a>`);
      }
    });
  }
});

describe('price test ($9 vs $12)', () => {
  const SPAN = /<span data-price data-v9="([^"]*)" data-v12="([^"]*)">([^<]*)<\/span>/g;
  const between = (h: string, from: string, to: string) => h.slice(h.indexOf(from), h.indexOf(to, h.indexOf(from)));
  const spans = (h: string) => [...h.matchAll(SPAN)].map((m) => ({ v9: m[1]!, v12: m[2]!, visible: m[3]! }));
  const script = (h: string) => /<script>(\(function paintPriceVariant[\s\S]*?)<\/script>/.exec(h)![1]!;

  /** Runs the script the page ships against fake elements built from the page's own price spans. */
  const visit = (h: string, storage: Map<string, string>, roll: number) => {
    const els = [...h.matchAll(SPAN)].map((m) => ({ textContent: m[3]!, attrs: { 'data-v9': m[1]!, 'data-v12': m[2]! } as Record<string, string>, getAttribute(n: string) { return this.attrs[n] ?? null; } }));
    const field = { value: 'nojs' };
    const doc = { querySelectorAll: (sel: string) => (sel === '[data-price]' ? els : sel === '[data-price-field]' ? [field] : []) };
    const ls = { getItem: (k: string) => storage.get(k) ?? null, setItem: (k: string, v: string) => void storage.set(k, v) };
    new Function('document', 'localStorage', 'Math', script(h))(doc, ls, { random: () => roll });
    return { els, field };
  };

  for (const lang of LANGS) {
    test(`${lang}: server HTML shows $9 and about ฿299 only; $12 and ฿399 are attributes, never visible text`, () => {
      const text = stripTags(html(lang, ''));
      expect(text).toContain('$9');
      expect(text).toContain('฿299');
      expect(text).not.toContain('$12');
      expect(text).not.toContain('฿399');
      expect(text).toContain(lang === 'th' ? 'ประมาณ ฿299' : 'about ฿299');
      expect(text).not.toMatch(/\bPro\b|\$19/);
    });

    test(`${lang}: pricing section and Q4 both carry the swappable price, and the form field defaults to nojs`, () => {
      const h = html(lang, '');
      expect(spans(between(h, 'id="pricing"', '</section>')).length).toBeGreaterThanOrEqual(2);
      expect(spans(between(h, '<form', '</form>')).length).toBeGreaterThanOrEqual(2);
      expect(h).toMatch(/<input type="hidden" name="price_variant" value="nojs" data-price-field/);
      expect(stripTags(html(lang, '')).toLowerCase()).toContain(lang === 'th' ? 'ทุกแผนมีแอปและสมาชิกในทีมไม่จำกัด' : 'every plan includes unlimited apps and team members');
    });

    test(`${lang}: the shipped script gives pricing and Q4 the same price, keeps it, and sets the field`, () => {
      const h = html(lang, '');
      const storage = new Map<string, string>();
      const first = visit(h, storage, 0.9);
      expect(first.field.value).toBe('12');
      expect(first.els.length).toBeGreaterThanOrEqual(4);
      for (const el of first.els) expect(el.textContent).toBe(el.attrs['data-v12']!);
      expect(first.els.map((e) => e.textContent)).toContain('$12');
      expect(first.els.map((e) => e.textContent)).toContain('฿399');
      // Second visit, opposite dice: still 12.
      const again = visit(h, storage, 0.1);
      expect(again.field.value).toBe('12');
      for (const el of again.els) expect(el.textContent).toBe(el.attrs['data-v12']!);
    });
  }

  test('the form carries a source field defaulting to direct, and the page ships the capture script', () => {
    for (const lang of LANGS) {
      const h = html(lang, '');
      expect(h).toMatch(/<input type="hidden" name="source" value="direct" data-source-field/);
      expect(h).toContain('mm_source');
    }
  });

  test('no price in titles, meta descriptions or JSON-LD on any page', () => {
    for (const lang of LANGS) {
      for (const slug of SLUGS) {
        const h = html(lang, slug);
        for (const price of ['$9', '$12', '฿299', '฿399']) {
          expect(title(h)).not.toContain(price);
          expect(metaDescription(h)).not.toContain(price);
          expect(JSON.stringify(jsonLd(h))).not.toContain(price);
        }
      }
    }
  });
});

describe('JSON-LD', () => {
  const keys = (v: unknown, out: string[] = []): string[] => {
    if (Array.isArray(v)) v.forEach((x) => keys(x, out));
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) (out.push(k), keys(x, out));
    return out;
  };
  for (const lang of LANGS) {
    for (const slug of SLUGS) {
      test(`${lang}/${slug || '(landing)'} parses, has Organization and Person, no offers or founder`, () => {
        const ld = jsonLd(html(lang, slug));
        const graph = ld['@graph'] as { '@type': string; [k: string]: unknown }[];
        expect(graph.some((n) => n['@type'] === 'Organization')).toBe(true);
        const person = graph.find((n) => n['@type'] === 'Person')!;
        expect(person['@id']).toBe('https://mailmeow.dev/#creator');
        expect(person.jobTitle).toBe(lang === 'th' ? 'นักพัฒนาเทคโนโลยีเพื่อธุรกิจ' : 'Business Technology Engineer');
        const all = keys(ld).map((k) => k.toLowerCase());
        expect(all).not.toContain('offers');
        expect(all).not.toContain('founder');
      });
    }
  }
  test('FAQPage matches the visible FAQ on landing and migrate', () => {
    for (const lang of LANGS) {
      for (const slug of ['', 'migrate-from-resend']) {
        const h = html(lang, slug);
        const faq = (jsonLd(h)['@graph'] as any[]).find((n) => n['@type'] === 'FAQPage');
        const questions = [...h.matchAll(/<summary>([\s\S]*?)<\/summary>/g)].map((m) => stripTags(m[1]!));
        expect(faq.mainEntity.map((q: any) => q.name)).toEqual(questions);
        expect(questions.length).toBeGreaterThan(0);
      }
    }
  });
});

describe('crawling', () => {
  test('hreflang th, en and x-default (to /en/) on every page', () => {
    for (const lang of LANGS) {
      for (const slug of SLUGS) {
        const h = html(lang, slug);
        const path = slug ? `${slug}/` : '';
        expect(h).toContain(`<link rel="alternate" hreflang="th" href="https://mailmeow.dev/th/${path}">`);
        expect(h).toContain(`<link rel="alternate" hreflang="en" href="https://mailmeow.dev/en/${path}">`);
        expect(h).toContain(`<link rel="alternate" hreflang="x-default" href="https://mailmeow.dev/en/${path}">`);
      }
    }
  });
  test('a preview build is noindex everywhere: meta, robots.txt and the _headers file', () => {
    for (const lang of LANGS) for (const slug of SLUGS) expect(html(lang, slug)).toContain('<meta name="robots" content="noindex, nofollow">');
    expect(readFileSync(join(dist, 'robots.txt'), 'utf8')).toBe('User-agent: *\nDisallow: /\n');
    expect(readFileSync(join(dist, '_headers'), 'utf8')).toContain('X-Robots-Tag: noindex');
  });
  test('sitemap lists indexable pages and omits waitlist-thanks and "/"', () => {
    const xml = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
    for (const l of LANGS) for (const s of ['', 'migrate-from-resend', 'about', 'privacy', 'terms']) expect(xml).toContain(`<loc>https://mailmeow.dev/${l}/${s ? `${s}/` : ''}</loc>`);
    expect(xml).not.toContain('waitlist-thanks');
    expect(xml).not.toContain('<loc>https://mailmeow.dev/</loc>');
  });
});

describe('no third-party requests', () => {
  const ALLOWED = ['challenges.cloudflare.com', 'static.cloudflareinsights.com'];
  const origins = (s: string) => [...s.matchAll(/https?:\/\/([a-z0-9.-]+)/gi)].map((m) => m[1]!.toLowerCase());
  test('pages load nothing from another origin except the Turnstile and Web Analytics hosts', () => {
    const bad: string[] = [];
    const check = (where: string, urls: string[]) => urls.forEach((u) => origins(u).forEach((o) => !ALLOWED.includes(o) && bad.push(`${where}: ${u}`)));
    for (const l of LANGS) {
      for (const s of SLUGS) {
        const h = html(l, s);
        const loaded = [
          ...[...h.matchAll(/<(?:script|img|iframe|source|video|audio)\b[^>]*\ssrc="([^"]+)"/g)].map((m) => m[1]!),
          ...[...h.matchAll(/<link\b[^>]*\brel="(?:stylesheet|preload|prefetch|icon|apple-touch-icon|modulepreload)"[^>]*\bhref="([^"]+)"/g)].map((m) => m[1]!),
          ...[...h.matchAll(/<form\b[^>]*\baction="([^"]+)"/g)].map((m) => m[1]!),
          ...[...h.matchAll(/url\(([^)]+)\)|@import\s+["']([^"']+)/g)].map((m) => m[1] ?? m[2]!),
        ];
        check(`${l}/${s}`, loaded);
      }
    }
    for (const f of readdirSync(join(dist, '_astro')).filter((f) => f.endsWith('.css'))) {
      check(f, [...readFileSync(join(dist, '_astro', f), 'utf8').matchAll(/url\(([^)]+)\)|@import\s+["']([^"']+)/g)].map((m) => m[1] ?? m[2]!));
    }
    expect(bad).toEqual([]);
  });
});

describe('waitlist form without JavaScript', () => {
  test('landing and migrate pages carry the <noscript> notice above the form, in both languages', () => {
    const NOTICE = { th: 'ฟอร์มนี้ต้องเปิด JavaScript ก่อน ถึงจะลงชื่อได้ เพราะใช้เช็กว่าไม่ใช่บอต', en: "This form needs JavaScript, because it checks that you're not a bot." };
    for (const l of LANGS) {
      for (const s of ['', 'migrate-from-resend']) {
        const h = html(l, s);
        const m = /<noscript>([\s\S]*?)<\/noscript>/.exec(h);
        expect(entities(m?.[1] ?? '')).toContain(NOTICE[l]);
        expect(h.indexOf('<noscript>')).toBeLessThan(h.indexOf('<form method="post" action="/api/waitlist"'));
      }
    }
  });
});

describe('Turnstile loads on first form interaction only', () => {
  test('no page loads the Turnstile script up front; it is only assigned inside the interaction loader', () => {
    for (const l of LANGS) {
      for (const s of SLUGS) {
        const h = html(l, s);
        expect(h).not.toMatch(/<(script|link)\b[^>]*(src|href)="https:\/\/challenges\.cloudflare\.com/);
        if (h.includes('challenges.cloudflare.com')) expect(h).toMatch(/createElement\(`script`\);\w+\.src=`https:\/\/challenges\.cloudflare\.com/);
      }
    }
  });
  test('a preview build without a site key shows a visible placeholder instead of the widget', () => {
    expect(html('en', '')).toContain('Turnstile site key not set');
  });
});

describe('production build', () => {
  test('fails while ENTITY.contactEmail is unset', () => {
    const out = mkdtempSync(join(tmpdir(), 'mailmeow-prod-'));
    try {
      const r = Bun.spawnSync(['bun', 'x', 'astro', 'build', '--outDir', out], { cwd: root, env: { ...process.env, PUBLIC_ENV: 'production' } });
      expect(r.exitCode).not.toBe(0);
      expect(r.stdout.toString() + r.stderr.toString()).toContain('contactEmail');
    } finally {
      rmSync(out, { recursive: true, force: true });
    }
  }, 120_000);
});
