/**
 * Guest progress on the device (CONTEXT §5, ARCHITECTURE §3.2): localStorage `soyl_guest_v1`, merged into
 * the account once with POST /v1/me/merge-guest after the first sign-in.
 *
 * - The shape is the API contract `GuestProgress` (platform/api/src/contract/guest.ts, version 1). This file
 *   validates by hand instead of with zod so the client bundle stays small; the unit tests check every
 *   value it produces against the zod contract.
 * - WEB-5: only chapter/question ids, positions, booleans and timestamps. No names, phones, emails or free text.
 *   Unknown keys are dropped on every read and write.
 * - Every storage access is wrapped in try/catch: private mode, full quota or disabled storage must never
 *   break a page.
 */
import type { GuestLesson, GuestPracticeAnswer, GuestProgress } from '@/platform/shared/api-client';

export const GUEST_STORAGE_KEY = 'soyl_guest_v1';
export const GUEST_LIMITS = { maxLessons: 500, maxPracticeAnswers: 3000 } as const;

const SUBJECT = '(?:cbse|icse|isc)-(?:7|8|9|10|11|12)-[a-z0-9]+(?:-[a-z0-9]+)*';
const CHAPTER_RE = new RegExp(`^${SUBJECT}-ch\\d{2}$`);
const QUESTION_RE = /^q_[a-z0-9_-]+$/;
const ISO_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

export function emptyGuestProgress(): GuestProgress {
  return { v: 1, lessons: [], practice: [] };
}

function isIso(v: unknown): v is string {
  return typeof v === 'string' && ISO_RE.test(v) && !Number.isNaN(Date.parse(v));
}

function cleanLesson(raw: unknown): GuestLesson | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.chapter !== 'string' || !CHAPTER_RE.test(r.chapter)) return null;
  if (typeof r.slide !== 'number' || !Number.isInteger(r.slide) || r.slide < 0 || r.slide > 1000) return null;
  if (typeof r.completed !== 'boolean' || !isIso(r.updatedAt)) return null;
  const out: GuestLesson = { chapter: r.chapter, slide: r.slide, completed: r.completed, updatedAt: r.updatedAt };
  // M2 (optional): deck part (0 = single deck) and mode.
  if (typeof r.part === 'number' && Number.isInteger(r.part) && r.part >= 0 && r.part <= 20) out.part = r.part;
  if (r.mode === 'read' || r.mode === 'listen') out.mode = r.mode;
  return out;
}

/** One lesson entry per chapter and part; a missing part means "the chapter's first part". */
function lessonKey(l: Pick<GuestLesson, 'chapter' | 'part'>): string {
  return `${l.chapter}|${l.part ?? 'first'}`;
}

function cleanAnswer(raw: unknown): GuestPracticeAnswer | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  if (typeof r.chapter !== 'string' || !CHAPTER_RE.test(r.chapter)) return null;
  if (typeof r.question !== 'string' || r.question.length > 120 || !QUESTION_RE.test(r.question)) return null;
  if (typeof r.correct !== 'boolean' || !isIso(r.answeredAt)) return null;
  return { chapter: r.chapter, question: r.question, correct: r.correct, answeredAt: r.answeredAt };
}

/** Keeps the newest entry per key, then the newest N overall (the API rejects more than the limits). */
function newestUnique<T>(items: T[], key: (t: T) => string, time: (t: T) => string, max: number): T[] {
  const byKey = new Map<string, T>();
  for (const item of items) {
    const k = key(item);
    const prev = byKey.get(k);
    if (!prev || time(item) >= time(prev)) byKey.set(k, item);
  }
  return [...byKey.values()].sort((a, b) => (time(a) < time(b) ? -1 : time(a) > time(b) ? 1 : 0)).slice(-max);
}

/** Returns a valid version-1 object or null when the value is unusable (other version, wrong type). */
export function sanitizeGuestProgress(raw: unknown): GuestProgress | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  if (r.v !== 1) return null;
  const out: GuestProgress = emptyGuestProgress();
  if (r.board === 'cbse' || r.board === 'cisce') out.board = r.board;
  if (typeof r.classLevel === 'number' && Number.isInteger(r.classLevel) && r.classLevel >= 7 && r.classLevel <= 12) out.classLevel = r.classLevel;
  const lessons = Array.isArray(r.lessons) ? r.lessons.map(cleanLesson).filter((x): x is GuestLesson => x !== null) : [];
  const practice = Array.isArray(r.practice) ? r.practice.map(cleanAnswer).filter((x): x is GuestPracticeAnswer => x !== null) : [];
  out.lessons = newestUnique(lessons, lessonKey, (l) => l.updatedAt, GUEST_LIMITS.maxLessons);
  out.practice = newestUnique(practice, (p) => `${p.chapter}|${p.question}`, (p) => p.answeredAt, GUEST_LIMITS.maxPracticeAnswers);
  return out;
}

function storage(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function readGuestProgress(): GuestProgress {
  try {
    const raw = storage()?.getItem(GUEST_STORAGE_KEY);
    if (!raw) return emptyGuestProgress();
    return sanitizeGuestProgress(JSON.parse(raw)) ?? emptyGuestProgress();
  } catch {
    return emptyGuestProgress();
  }
}

/** Returns false when storage is unavailable or full (progress then lives only for this page view). */
export function writeGuestProgress(progress: GuestProgress): boolean {
  try {
    const s = storage();
    if (!s) return false;
    const clean = sanitizeGuestProgress(progress) ?? emptyGuestProgress();
    if (isEmpty(clean)) s.removeItem(GUEST_STORAGE_KEY);
    else s.setItem(GUEST_STORAGE_KEY, JSON.stringify(clean));
    return true;
  } catch {
    return false;
  }
}

export function clearGuestProgress(): void {
  try {
    storage()?.removeItem(GUEST_STORAGE_KEY);
  } catch {
    // nothing to do
  }
}

function isEmpty(p: GuestProgress): boolean {
  return p.lessons.length === 0 && p.practice.length === 0 && p.board === undefined && p.classLevel === undefined;
}

const nowIso = (now: Date = new Date()) => now.toISOString();

/** Practice answer on the device (practice page and lesson check slides, for guests). */
export function recordGuestPracticeAnswer(chapter: string, question: string, correct: boolean, now?: Date): boolean {
  const p = readGuestProgress();
  p.practice.push({ chapter, question, correct, answeredAt: nowIso(now) });
  return writeGuestProgress(p);
}

export interface GuestLessonPosition {
  /** Deck part (0 = single-deck chapter); undefined = the chapter's first part. */
  part?: number;
  slide: number;
  completed: boolean;
  mode?: 'read' | 'listen';
}

/** Lesson position on the device (the slide player calls this for guests). Completion is sticky. */
export function recordGuestLessonPosition(chapter: string, pos: GuestLessonPosition, now?: Date): boolean {
  const p = readGuestProgress();
  const key = lessonKey({ chapter, part: pos.part });
  const prev = p.lessons.find((l) => lessonKey(l) === key);
  p.lessons = p.lessons.filter((l) => lessonKey(l) !== key);
  const entry: GuestLesson = { chapter, slide: pos.slide, completed: pos.completed || prev?.completed === true, updatedAt: nowIso(now) };
  if (pos.part !== undefined) entry.part = pos.part;
  if (pos.mode) entry.mode = pos.mode;
  p.lessons.push(entry);
  return writeGuestProgress(p);
}

/** The saved position for a chapter part on this device, or null. */
export function readGuestLessonPosition(p: GuestProgress, chapter: string, part: number | undefined): GuestLesson | null {
  return p.lessons.find((l) => lessonKey(l) === lessonKey({ chapter, part })) ?? null;
}

/** Last guest answer per question of a chapter (practice page: "answered" / "correct last time"). */
export function guestAnswersFor(p: GuestProgress, chapter: string): Map<string, boolean> {
  const out = new Map<string, boolean>();
  for (const a of p.practice) if (a.chapter === chapter) out.set(a.question, a.correct);
  return out;
}

/** Remembers the board/class a guest browses, so the profile can be filled after sign-up. */
export function rememberGuestBoardClass(board: 'cbse' | 'cisce', classLevel: number): void {
  const p = readGuestProgress();
  if (p.board === board && p.classLevel === classLevel) return;
  p.board = board;
  p.classLevel = classLevel;
  writeGuestProgress(p);
}

/**
 * Worth sending to merge-guest? Since API M2 stores lesson positions (`lessonsStored`), any lesson entry or
 * practice answer is.
 */
export function hasMergeableProgress(p: GuestProgress): boolean {
  return p.practice.length > 0 || p.lessons.length > 0;
}

/**
 * After a successful (or already-done) merge the server has everything (backend-api M2 handoff point 6:
 * "clear the whole soyl_guest_v1"), so nothing is kept.
 */
export function afterMerge(_p: GuestProgress): GuestProgress {
  void _p;
  return emptyGuestProgress();
}

export interface ChapterGuestSummary {
  /** Most recently viewed slide (0-based) of the most recently opened part. */
  lessonSlide: number | null;
  lessonPart: number | null;
  /** Every part this device opened is completed. */
  lessonCompleted: boolean;
  practiceAnswered: number;
  practiceCorrect: number;
}

export function chapterSummary(p: GuestProgress, chapter: string): ChapterGuestSummary {
  const lessons = p.lessons.filter((l) => l.chapter === chapter).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  const latest = lessons[0];
  // One answer per question: the latest counts.
  const answers = guestAnswersFor(p, chapter);
  return {
    lessonSlide: latest ? latest.slide : null,
    lessonPart: latest?.part ?? null,
    lessonCompleted: lessons.length > 0 && lessons.every((l) => l.completed),
    practiceAnswered: answers.size,
    practiceCorrect: [...answers.values()].filter(Boolean).length,
  };
}
