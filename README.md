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

## Counting signups

Local database: the commands below as written. Production: the same command without `--local`, run by the owner.

```sh
# Total signups
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT COUNT(*) AS total FROM waitlist_signups"

# Percent who would pay (would_pay = 'yes')
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT ROUND(100.0 * SUM(would_pay = 'yes') / COUNT(*), 1) AS pct_would_pay, COUNT(*) AS total FROM waitlist_signups"

# By price variant (with the would-pay rate for each)
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT price_variant, COUNT(*) AS signups, ROUND(100.0 * SUM(would_pay = 'yes') / COUNT(*), 1) AS pct_would_pay FROM waitlist_signups GROUP BY price_variant"

# By PromptPay answer
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT COALESCE(promptpay, '(skipped)') AS promptpay, COUNT(*) AS signups, SUM(would_pay = 'yes') AS would_pay FROM waitlist_signups GROUP BY promptpay"

# By AI tool (one person can pick several, so rows add up to more than the total)
bunx wrangler d1 execute mailmeow-waitlist --local --command "SELECT j.value AS ai_tool, COUNT(*) AS signups, SUM(s.would_pay = 'yes') AS would_pay FROM waitlist_signups s, json_each(s.ai_tools) j GROUP BY j.value ORDER BY signups DESC"
```

## Deleting signups

Nothing is deleted automatically. Local database: the commands as written. Production: the same command without `--local`, run by the owner.

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
- `price_variant` comes from `ENTITY.waitlist.price` on the server, not from the browser.
