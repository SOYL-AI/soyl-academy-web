/**
 * One learner-progress model for the shell, dashboard, sidebars and mastery displays, built from either the
 * member's GET /v1/me/progress or the guest's device progress (soyl_guest_v1). Pure functions (tested).
 */
import type { GuestProgress, MyProgress, Streak } from '@/platform/shared/api-client';
import { chapterMastery, evidenceFrom, type MasteryLevel } from './mastery';

export interface ChapterSnapshot {
  chapterId: string;
  subjectId: string;
  number: number | null;
  title: string | null;
  level: MasteryLevel;
  lessonPartsStarted: number;
  lessonPartsCompleted: number;
  lastPart: number | null;
  lastSlide: number | null;
  answered: number;
  correct: number;
  /** ISO time of the latest lesson or practice activity. */
  lastActivityAt: string | null;
}

export interface SubjectSnapshot {
  subjectId: string;
  name: string | null;
  chapters: ChapterSnapshot[];
}

export interface LearnerProgress {
  source: 'member' | 'device';
  xp: number | null;
  level: number | null;
  /** 0–1 progress through the current level. */
  levelProgress: number | null;
  streak: Streak | null;
  lessonsCompleted: number;
  practiceAnswered: number;
  practiceCorrect: number;
  accuracy: number | null;
  subjects: SubjectSnapshot[];
  chapters: Record<string, ChapterSnapshot>;
}

/** `cbse-10-science-ch01` → `cbse-10-science`. */
export function subjectOfChapter(chapterId: string): string {
  return chapterId.replace(/-ch\d{2}$/, '');
}

/** Level from what the browser knows (the hub and subject pages refine it with real totals or the API's level). */
function levelOf(started: number, completed: number, answered: number, correct: number): MasteryLevel {
  return chapterMastery(evidenceFrom({ lessonPartsStarted: started, lessonPartsCompleted: completed, answered, correct })).level;
}

function latest(a: string | null, b: string | null): string | null {
  if (!a) return b;
  if (!b) return a;
  return a > b ? a : b;
}


export function fromMemberProgress(p: MyProgress): LearnerProgress {
  const chapters: Record<string, ChapterSnapshot> = {};
  const subjects: SubjectSnapshot[] = p.subjects.map((s) => ({
    subjectId: s.subjectId,
    name: s.name,
    chapters: s.chapters.map((c) => {
      const snap: ChapterSnapshot = {
        chapterId: c.chapterId,
        subjectId: s.subjectId,
        number: c.number,
        title: c.title,
        lessonPartsStarted: c.lessons.partsStarted,
        lessonPartsCompleted: c.lessons.partsCompleted,
        lastPart: c.lessons.lastPart,
        lastSlide: c.lessons.lastSlide,
        answered: c.practice.questionsAnswered,
        correct: c.practice.questionsCorrect,
        lastActivityAt: latest(c.lessons.updatedAt, c.practice.lastAnsweredAt),
        level: levelOf(c.lessons.partsStarted, c.lessons.partsCompleted, c.practice.questionsAnswered, c.practice.questionsCorrect),
      };
      chapters[c.chapterId] = snap;
      return snap;
    }),
  }));
  const t = p.totals;
  const span = t.nextLevelXp - t.levelStartXp;
  let answered = 0;
  let correct = 0;
  for (const c of Object.values(chapters)) {
    answered += c.answered;
    correct += c.correct;
  }
  return {
    source: 'member',
    xp: t.xp,
    level: t.level,
    levelProgress: span > 0 ? Math.min(1, Math.max(0, (t.xp - t.levelStartXp) / span)) : null,
    streak: t.streak,
    lessonsCompleted: t.lessonsCompleted,
    practiceAnswered: answered,
    practiceCorrect: correct,
    accuracy: t.practiceAccuracy,
    subjects,
    chapters,
  };
}

export function fromGuestProgress(g: GuestProgress): LearnerProgress {
  const byChapter = new Map<string, { started: Set<string>; completed: Set<string>; lastPart: number | null; lastSlide: number | null; last: string | null; answers: Map<string, boolean> }>();
  const get = (id: string) => {
    let e = byChapter.get(id);
    if (!e) {
      e = { started: new Set(), completed: new Set(), lastPart: null, lastSlide: null, last: null, answers: new Map() };
      byChapter.set(id, e);
    }
    return e;
  };
  for (const l of g.lessons) {
    const e = get(l.chapter);
    const key = String(l.part ?? 'first');
    e.started.add(key);
    if (l.completed) e.completed.add(key);
    if (!e.last || l.updatedAt >= e.last) {
      e.last = l.updatedAt;
      e.lastPart = l.part ?? null;
      e.lastSlide = l.slide;
    }
  }
  for (const a of g.practice) {
    const e = get(a.chapter);
    e.answers.set(a.question, a.correct);
    e.last = latest(e.last, a.answeredAt);
  }
  const chapters: Record<string, ChapterSnapshot> = {};
  const subjectMap = new Map<string, SubjectSnapshot>();
  let lessonsCompleted = 0;
  let answered = 0;
  let correct = 0;
  for (const [chapterId, e] of byChapter) {
    const nCorrect = [...e.answers.values()].filter(Boolean).length;
    const snap: ChapterSnapshot = {
      chapterId,
      subjectId: subjectOfChapter(chapterId),
      number: Number(/-ch(\d{2})$/.exec(chapterId)?.[1] ?? NaN) || null,
      title: null,
      lessonPartsStarted: e.started.size,
      lessonPartsCompleted: e.completed.size,
      lastPart: e.lastPart,
      lastSlide: e.lastSlide,
      answered: e.answers.size,
      correct: nCorrect,
      lastActivityAt: e.last,
      level: levelOf(e.started.size, e.completed.size, e.answers.size, nCorrect),
    };
    chapters[chapterId] = snap;
    lessonsCompleted += e.completed.size;
    answered += snap.answered;
    correct += snap.correct;
    const sub = subjectMap.get(snap.subjectId) ?? { subjectId: snap.subjectId, name: null, chapters: [] };
    sub.chapters.push(snap);
    subjectMap.set(snap.subjectId, sub);
  }
  return {
    source: 'device',
    xp: null,
    level: null,
    levelProgress: null,
    streak: null,
    lessonsCompleted,
    practiceAnswered: answered,
    practiceCorrect: correct,
    accuracy: answered > 0 ? correct / answered : null,
    subjects: [...subjectMap.values()],
    chapters,
  };
}

/** The most recently touched chapter that is not yet mastered ("Continue where you left off"). */
export function continueChapter(p: LearnerProgress | null): ChapterSnapshot | null {
  if (!p) return null;
  const list = Object.values(p.chapters)
    .filter((c) => c.lastActivityAt)
    .sort((a, b) => (a.lastActivityAt! < b.lastActivityAt! ? 1 : -1));
  return list.find((c) => c.level !== 'mastered') ?? list[0] ?? null;
}
