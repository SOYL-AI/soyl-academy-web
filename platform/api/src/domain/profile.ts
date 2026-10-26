/** Profile reads shared by /v1/session, sign-in responses and /v1/me. */
import { eq } from 'drizzle-orm';
import { profiles, type Database } from '@soyl/db';
import type { AuthUser } from '../types';

export interface SessionUserDto {
  id: string;
  role: AuthUser['role'];
  displayName: string | null;
  board: 'cbse' | 'cisce' | null;
  classLevel: number | null;
  locale: string;
}

export async function loadProfile(db: Database, userId: string) {
  const [p] = await db.select().from(profiles).where(eq(profiles.userId, userId));
  return p ?? null;
}

export async function sessionUser(db: Database, user: AuthUser): Promise<SessionUserDto> {
  const p = await loadProfile(db, user.id);
  return {
    id: user.id,
    role: user.role,
    displayName: p?.displayName ?? null,
    board: (p?.board as 'cbse' | 'cisce' | null | undefined) ?? null,
    classLevel: p?.classLevel ?? null,
    locale: p?.locale ?? 'en-IN',
  };
}
