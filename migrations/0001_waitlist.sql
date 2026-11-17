-- Waitlist signups (docs/copy/privacy.md lists exactly these fields).
-- Answer columns hold stable option keys from src/data/copy/common.ts, never display labels.
CREATE TABLE waitlist_signups (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,           -- trimmed, lowercased
  building      TEXT,                           -- q1 key
  ai_tools      TEXT NOT NULL DEFAULT '[]',     -- q2 keys, JSON array text
  volume        TEXT,                           -- q3 key
  would_pay     TEXT NOT NULL,                  -- q4 key: yes | not-yet | no
  promptpay     TEXT,                           -- q5 key
  price_variant TEXT NOT NULL,                  -- price test arm: 9 | 12 | nojs (no JavaScript, so no arm)
  source        TEXT NOT NULL DEFAULT 'direct', -- which link brought them: fb1 | fb2 | x | threads | video | meetup | direct (lib/source.ts)
  lang          TEXT NOT NULL CHECK (lang IN ('th', 'en')),
  consent_at    TEXT NOT NULL,                  -- ISO 8601 UTC
  created_at    TEXT NOT NULL,                  -- ISO 8601 UTC
  ip_hash       TEXT NOT NULL                   -- SHA-256(salt + IP), hex. Never the raw IP.
);

-- One row per POST attempt (hash only), for the per-IP limit. Rows older than an hour are deleted on each request.
CREATE TABLE waitlist_hits (
  ip_hash    TEXT NOT NULL,
  created_at INTEGER NOT NULL                   -- epoch milliseconds
);
CREATE INDEX idx_waitlist_hits_ip_time ON waitlist_hits (ip_hash, created_at);
