# mailmeow-public

The mailmeow.dev Astro site plus the waitlist backend (a Cloudflare Pages Function with D1 and Turnstile).
Run everything with Node 24 (`fnm exec --using=24.22.3 <cmd>`); Astro 7 needs it.

## Check

```sh
bun run check   # typecheck, unit tests, build, dist tests. No network.
```

## Local dev with the waitlist

```sh
cp .dev.vars.example .dev.vars                       # Turnstile TEST secret + a local salt (gitignored)
PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA bun run build   # the test site key
bunx wrangler d1 migrations apply mailmeow-waitlist --local
bunx wrangler pages dev dist                         # http://localhost:8788
```

- `TURNSTILE_SECRET` and `IP_HASH_SALT` come only from `.dev.vars` locally (Pages dashboard secrets in production). Missing either makes `/api/waitlist` answer 500.
- Cloudflare's test secrets: `1x0000000000000000000000000000000AA` always passes, `2x0000000000000000000000000000000AA` always fails. The test site key is `1x00000000000000000000AA`.
- `PUBLIC_TURNSTILE_SITE_KEY` is read at build time. Unset: a preview build shows a placeholder where the widget goes; a production build (`PUBLIC_ENV=production`) fails.
- Quick curl without a browser: `POST /api/waitlist` with JSON and `"turnstileToken":"XXXX.DUMMY.TOKEN.XXXX"` (accepted by the always-pass secret).
- `wrangler.toml` holds a placeholder `database_id` and no account id. The owner replaces it after `wrangler d1 create mailmeow-waitlist`.

## Price test ($9 vs $12)

Each visitor gets one price at random on the first visit, kept in `localStorage` (`mm_price_variant`). The pricing section and the form's Q4 both read it. Server HTML always shows $9 and about ฿299; an inline script at the end of `<body>` (`src/lib/price-variant.ts`) swaps the text of every `[data-price]` span and sets the form's hidden `price_variant` field. If `localStorage` is blocked the visitor gets $9 (a random price could change on the next page). Prices stay out of titles, meta descriptions and JSON-LD. THB (฿299 / ฿399) is shown beside the dollar price as an approximation.

## Signup source

Share links as `https://mailmeow.dev/th/?s=fb1` (allowed: `fb1`, `fb2`, `x`, `threads`, `video`, `meetup`). The first visit with an allowed value is kept in `localStorage` (`mm_source`), sent with the form as `source`, and re-checked by the Function: anything else is stored as `direct`. A later visit never replaces a stored source. Code: `src/lib/source.ts`. The column is in `migrations/0001_waitlist.sql` (edited in place before the first deploy: if you already applied it to a local database, delete `.wrangler/state` and apply it again).

## Before a production deploy

```sh
PUBLIC_ENV=production PUBLIC_TURNSTILE_SITE_KEY=<your real key> bun run preflight
```

Prints a plain numbered list of what is still missing and exits 1, or says it passed. Checks `ENTITY.contactEmail`, the Turnstile site key (not a Cloudflare test key), the placeholder `database_id` in `wrangler.toml`, `PUBLIC_ENV=production`, the production robots (allow all, `Disallow: /api/`, a Sitemap line), the migration file, and a production build into a temp folder. No network calls. Step-by-step: `~/dev/mailmeow/docs/DEPLOY-SITE.md`.

## Counting signups

Local database: the commands below as written. Production: the same command with `--remote` instead of `--local` (without either flag, wrangler reads the local database), run by the owner.

```sh
# Total signups
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT COUNT(*) AS total FROM waitlist_signups"

# Percent who would pay (would_pay = 'yes')
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT ROUND(100.0 * SUM(would_pay = 'yes') / COUNT(*), 1) AS pct_would_pay, COUNT(*) AS total FROM waitlist_signups"

# Price test: $9 vs $12 (the comparison leaves out 'nojs': those signups never saw a randomised price)
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT price_variant, COUNT(*) AS signups, SUM(would_pay = 'yes') AS would_pay, ROUND(100.0 * SUM(would_pay = 'yes') / COUNT(*), 1) AS pct_would_pay FROM waitlist_signups WHERE price_variant IN ('9', '12') GROUP BY price_variant"

# Signups by variant including 'nojs' (to see how many skipped the test)
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT price_variant, COUNT(*) AS signups FROM waitlist_signups GROUP BY price_variant"

# By source (the ?s= link that brought them: fb1, fb2, x, threads, video, meetup, or direct)
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT source, COUNT(*) AS signups, SUM(would_pay = 'yes') AS would_pay, ROUND(100.0 * SUM(would_pay = 'yes') / COUNT(*), 1) AS pct_would_pay FROM waitlist_signups GROUP BY source ORDER BY signups DESC"

# By PromptPay answer
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT COALESCE(promptpay, '(skipped)') AS promptpay, COUNT(*) AS signups, SUM(would_pay = 'yes') AS would_pay FROM waitlist_signups GROUP BY promptpay"

# By AI tool (one person can pick several, so rows add up to more than the total)
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT j.value AS ai_tool, COUNT(*) AS signups, SUM(s.would_pay = 'yes') AS would_pay FROM waitlist_signups s, json_each(s.ai_tools) j GROUP BY j.value ORDER BY signups DESC"
```

## Deleting signups

Nothing is deleted automatically. Local database: the commands as written. Production: the same command with `--remote` instead of `--local` (without either flag, wrangler reads the local database), run by the owner.

```sh
# One person's deletion request (use the address they signed up with, lowercased)
bunx wrangler d1 execute mailmeow-waitlist --local --command "DELETE FROM waitlist_signups WHERE email = 'person@example.com'"

# Retention: everything older than launch + 12 months. Replace the date with (launch date + 12 months).
bunx wrangler d1 execute mailmeow-waitlist --local --command "DELETE FROM waitlist_signups WHERE created_at < 'YYYY-MM-DDT00:00:00.000Z'"
```

## Behaviour (see docs/SITE.md, Waitlist backend)

- Answers are stored as option keys (`own`, `claude-code`, `up-to-3000`, `yes`, ...), not labels.
- The IP is stored only as `SHA-256(salt + IP)`. Rate limit: the 6th POST from one IP hash within an hour gets 429. Every attempt is counted. Hit rows older than an hour are deleted on each request.
- A repeat email gets the same success response and the first row is kept.
- `price_variant` is `9`, `12` or `nojs`; any other value is a 400. The browser sends the variant it painted (`9` or `12`); a submit without JavaScript carries `nojs`. The two arms are compared in the price-test query above.
