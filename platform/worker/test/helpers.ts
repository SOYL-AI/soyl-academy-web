/**
 * Fixtures for worker tests. Emails use the reserved example.com domain (GEN-2).
 */
import { randomBytes } from 'node:crypto';
import { request } from 'node:http';
import { consentStatus, profiles, sessions, users, verifications, type ConsentState, type Database, type Role } from '@soyl/db';
import type { PgBoss } from 'pg-boss';

export const DAY = 86_400_000;
/** Fixed evaluation instant for handler tests. */
export const NOW = new Date('2026-10-26T00:00:00.000Z');

export const ago = (days: number, from: Date = NOW) => new Date(from.getTime() - days * DAY);

let n = 0;
export async function makeUser(
  db: Database,
  opts: {
    role?: Role;
    createdAt?: Date;
    deletedAt?: Date | null;
    consent?: ConsentState | null;
    withProfile?: boolean;
    withSession?: boolean;
  } = {},
): Promise<string> {
  const tag = `${Date.now().toString(36)}${(n++).toString(36)}${randomBytes(3).toString('hex')}`;
  const [row] = await db
    .insert(users)
    .values({
      name: `Fixture ${tag}`,
      email: `fixture-${tag}@example.com`,
      role: opts.role ?? 'student',
      createdAt: opts.createdAt ?? ago(100),
      deletedAt: opts.deletedAt ?? null,
    })
    .returning({ id: users.id });
  const id = row!.id;
  if (opts.consent) await db.insert(consentStatus).values({ userId: id, status: opts.consent, provider: 'mock' });
  if (opts.withProfile) await db.insert(profiles).values({ userId: id, displayName: `Fixture ${tag}` });
  if (opts.withSession)
    await db.insert(sessions).values({ userId: id, token: `tok-${tag}`, expiresAt: new Date(NOW.getTime() + 30 * DAY) });
  return id;
}

export async function makeVerification(db: Database, expiresAt: Date): Promise<string> {
  const [row] = await db
    .insert(verifications)
    .values({ identifier: `otp-${randomBytes(4).toString('hex')}@example.com`, value: 'hashed', expiresAt })
    .returning({ id: verifications.id });
  return row!.id;
}

export async function makeSession(db: Database, userId: string, expiresAt: Date): Promise<string> {
  const [row] = await db
    .insert(sessions)
    .values({ userId, token: `tok-${randomBytes(8).toString('hex')}`, expiresAt })
    .returning({ id: sessions.id });
  return row!.id;
}

export async function userIds(db: Database): Promise<Set<string>> {
  const rows = await db.select({ id: users.id }).from(users);
  return new Set(rows.map((r) => r.id));
}

/** Waits until a job reaches a final state; returns its state and output. */
export async function waitForJob(boss: PgBoss, name: string, id: string, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const [job] = await boss.findJobs<object>(name, { id });
    if (job && (job.state === 'completed' || job.state === 'failed' || job.state === 'cancelled')) return job;
    if (Date.now() > deadline) throw new Error(`job ${name}/${id} did not finish (state ${job?.state ?? 'missing'})`);
    await new Promise((r) => setTimeout(r, 200));
  }
}

export function httpGet(port: number, path: string, method = 'GET'): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const req = request({ host: '127.0.0.1', port, path, method, agent: false }, (res) => {
      let body = '';
      res.setEncoding('utf8');
      res.on('data', (c: string) => (body += c));
      res.on('end', () => resolve({ status: res.statusCode ?? 0, body }));
    });
    req.on('error', reject);
    req.end();
  });
}
