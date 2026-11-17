// A tiny D1-shaped adapter over bun:sqlite, so the handler runs against the real migration SQL.
import { Database } from 'bun:sqlite';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { D1Like, D1Stmt } from '../../../src/lib/waitlist-handler';

export function memoryD1(): { db: D1Like; raw: Database } {
  const raw = new Database(':memory:');
  raw.exec(readFileSync(join(import.meta.dir, '../../../migrations/0001_waitlist.sql'), 'utf8'));
  const stmt = (sql: string, values: unknown[] = []): D1Stmt => ({
    bind: (...v) => stmt(sql, v),
    run: async () => raw.query(sql).run(...(values as never[])),
    first: async <T>() => (raw.query(sql).get(...(values as never[])) as T | null) ?? null,
  });
  return { db: { prepare: (sql) => stmt(sql) }, raw };
}
