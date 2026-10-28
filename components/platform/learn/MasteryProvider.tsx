'use client';

/**
 * Mastery for the course pages (class, subject, chapter hub, dashboard). One fetch per page:
 * members → GET /v1/me/mastery (one subject, or every subject with activity); guests → the device progress
 * through the shared formula. If the API has no entry for a chapter yet (or fails), the member's
 * GET /v1/me/progress snapshot stands in, so a page never shows less than the student has done.
 */
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { ChapterMastery as ApiChapterMastery, MyMastery } from '@/platform/shared/api-client';
import type { ChapterSnapshot } from '../lib/learner';
import { chapterMastery, evidenceFrom, masteryCounts, subjectMastery, type MasteryHint, type MasteryLevel } from '../lib/mastery';
import { useLearnerProgress } from './ProgressProvider';
import { useMastery } from './useInsights';

export interface ChapterLevel {
  level: MasteryLevel;
  score: number;
  hints: MasteryHint[];
  source: 'api' | 'progress' | 'device' | 'none';
}

export interface SubjectSummary {
  score: number;
  counts: Record<MasteryLevel, number>;
  started: number;
  chapterCount: number;
}

interface MasteryCtx {
  ready: boolean;
  chapter: (chapterId: string, totals?: { lessonParts?: number; practiceTotal?: number }) => ChapterLevel;
  subject: (subjectId: string, chapterIds: readonly string[] | number) => SubjectSummary;
  /** The API's own aggregate for a subject (members, once computed), else null. */
  apiSubject: (subjectId: string) => MyMastery['subjects'][number] | null;
}

const NONE: ChapterLevel = { level: 'not_started', score: 0, hints: [], source: 'none' };
const Ctx = createContext<MasteryCtx | null>(null);

export function useCourseMastery(): MasteryCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useCourseMastery must be used inside <MasteryProvider>');
  return ctx;
}

function fromSnapshot(snap: ChapterSnapshot | undefined, source: ChapterLevel['source'], totals?: { lessonParts?: number; practiceTotal?: number }): ChapterLevel {
  if (!snap) return NONE;
  const m = chapterMastery(
    evidenceFrom({ lessonPartsStarted: snap.lessonPartsStarted, lessonPartsCompleted: snap.lessonPartsCompleted, answered: snap.answered, correct: snap.correct }, totals),
  );
  return { level: m.level, score: m.score, hints: m.hints, source };
}

export function MasteryProvider({ subjectId, children }: { subjectId?: string; children: ReactNode }) {
  const { progress, ready: progressReady } = useLearnerProgress();
  const api = useMastery(subjectId);

  const value = useMemo<MasteryCtx>(() => {
    const apiChapters = new Map<string, ApiChapterMastery>();
    const apiSubjects = new Map<string, MyMastery['subjects'][number]>();
    if (api.status === 'ready') {
      for (const s of api.data.subjects) {
        apiSubjects.set(s.subjectId, s);
        for (const c of s.chapters) apiChapters.set(c.chapterId, c);
      }
    }
    const snapSource: ChapterLevel['source'] = progress?.source === 'member' ? 'progress' : 'device';
    const chapter: MasteryCtx['chapter'] = (chapterId, totals) => {
      const a = apiChapters.get(chapterId);
      // The API's level wins once it has evidence for this chapter.
      if (a && a.level !== 'not_started') return { level: a.level, score: a.score, hints: a.hints, source: 'api' };
      const fromProgress = fromSnapshot(progress?.chapters[chapterId], snapSource, totals);
      if (fromProgress.source !== 'none') return fromProgress;
      return a ? { level: a.level, score: a.score, hints: a.hints, source: 'api' } : NONE;
    };
    const subject: MasteryCtx['subject'] = (sid, chapterIds) => {
      if (typeof chapterIds === 'number') {
        // Only a count is known (class page): the API aggregate, else the snapshots of this subject.
        const a = apiSubjects.get(sid);
        const touched = (progress?.subjects.find((s) => s.subjectId === sid)?.chapters ?? []).map((c) => fromSnapshot(c, snapSource));
        const levels = [...touched.map((t) => ({ level: t.level, score: t.score })), ...Array.from({ length: Math.max(0, chapterIds - touched.length) }, () => ({ level: 'not_started' as const, score: 0 }))];
        const agg = subjectMastery(levels);
        if (a && a.score >= agg.score) return { score: a.score, counts: a.levels, started: a.chapterCount - a.levels.not_started, chapterCount: a.chapterCount || chapterIds };
        return { score: agg.score, counts: agg.levels, started: touched.filter((t) => t.level !== 'not_started').length, chapterCount: chapterIds };
      }
      const levels = chapterIds.map((id) => chapter(id));
      const agg = subjectMastery(levels);
      return { score: agg.score, counts: masteryCounts(levels.map((l) => l.level)), started: levels.filter((l) => l.level !== 'not_started').length, chapterCount: chapterIds.length };
    };
    return { ready: progressReady && api.status !== 'loading', chapter, subject, apiSubject: (sid) => apiSubjects.get(sid) ?? null };
  }, [api, progress, progressReady]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
