'use client';

/**
 * Client islands for the server-rendered course pages (ADR-023, restyled for design language v3 / ADR-032):
 * mastery on subject cards, chapter rows and the sidebar; the subject's course progress card with its "Up next"
 * action. They read MasteryProvider (one fetch per page).
 */
import { useEffect, useRef } from 'react';
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { Card } from '@/components/platform/ui/kit/Display';
import { StatusPill, type StatusTone } from '@/components/platform/ui/kit/Lists';
import { MasteryBar, MasteryPip, ProgressRing } from '@/components/platform/ui/kit/Mastery';
import { SubjectCard, type SubjectCardProps } from '@/components/platform/ui/kit/Tiles';
import { useStage } from '../shell/StageProvider';
import { MASTERY_HINT_TEXT, MASTERY_LABELS, type MasteryLevel } from '../lib/mastery';
import { chapterCta } from './copy';
import { useLearnerProgress } from './ProgressProvider';
import { useCourseMastery } from './MasteryProvider';
import v from './v3.module.css';

/**
 * A subject as a kit SubjectCard with the student's progress (class hub, /learn): the meta line says how far they
 * are ("3 of 14 chapters started"), and a bar shows course mastery once there is some (no empty "0%" bars for a new
 * student). `chapterCount` 0: unknown (or no lessons yet); the API aggregate or the chapters touched
 * still tell the story.
 */
export function LiveSubjectCard({ subjectId, chapterCount, name, meta, ...card }: Omit<SubjectCardProps, 'progress' | 'title' | 'meta'> & { subjectId: string; chapterCount: number; name: string; meta?: string }) {
  const m = useCourseMastery();
  const { progress } = useLearnerProgress();
  const sum = chapterCount > 0 ? m.subject(subjectId, chapterCount) : null;
  const api = m.apiSubject(subjectId);
  const touched = progress?.subjects.find((x) => x.subjectId === subjectId)?.chapters.length ?? 0;
  const started = sum ? sum.started : api ? api.chapterCount - api.levels.not_started : touched;
  const score = sum ? sum.score : (api?.score ?? 0);
  const line = started > 0 ? (chapterCount > 0 ? `${started} of ${chapterCount} chapters started` : `${started} ${started === 1 ? 'chapter' : 'chapters'} started`) : meta;
  return (
    <SubjectCard
      {...card}
      title={name}
      meta={
        line ? (
          <span data-testid="subject-progress" data-score={m.ready ? score : undefined}>
            {line}
          </span>
        ) : undefined
      }
      progress={score > 0 ? { value: score, label: `${score}% mastery` } : undefined}
    />
  );
}

export function ChapterMasteryPip({ chapterId, showLabel = true }: { chapterId: string; showLabel?: boolean }) {
  const m = useCourseMastery();
  const c = m.chapter(chapterId);
  return <MasteryPip level={c.level} showLabel={showLabel} />;
}

const LEVEL_TONE: Record<MasteryLevel, StatusTone> = { not_started: 'neutral', attempted: 'warning', familiar: 'info', proficient: 'info', mastered: 'success' };

/** The chapter's mastery as a written pill (chapter rows); nothing for a chapter not started yet (a quiet list). */
export function ChapterStatusPill({ chapterId }: { chapterId: string }) {
  const m = useCourseMastery();
  const c = m.chapter(chapterId);
  if (c.level === 'not_started') return null;
  return <StatusPill tone={LEVEL_TONE[c.level]}>{MASTERY_LABELS[c.level]}</StatusPill>;
}

export interface CourseChapterLink {
  id: string;
  number: number;
  title: string;
  href: string;
}

/** Subject hub: course mastery (ring + segmented bar) and the ONE primary action, the next chapter to work on. */
export function SubjectMasteryHeader({ subjectId, name, chapters, lang }: { subjectId: string; name: string; chapters: CourseChapterLink[]; lang?: string }) {
  const m = useCourseMastery();
  const { progress } = useLearnerProgress();
  const { stage } = useStage();
  const sum = m.subject(
    subjectId,
    chapters.map((c) => c.id),
  );
  const recent = Object.values(progress?.chapters ?? {})
    .filter((c) => c.subjectId === subjectId && c.lastActivityAt)
    .sort((a, b) => (a.lastActivityAt! < b.lastActivityAt! ? 1 : -1))
    .map((c) => chapters.find((x) => x.id === c.chapterId))
    .find((c) => c && m.chapter(c.id).level !== 'mastered');
  const next = recent ?? chapters.find((c) => m.chapter(c.id).level === 'not_started') ?? chapters[0];
  const nextLevel = next ? m.chapter(next.id) : null;
  return (
    <Card as="section" className={v.progressCard} aria-label={`${name} progress`} data-testid="subject-mastery">
      <ProgressRing value={sum.score} size={72} stroke={7} label={`${name}: ${sum.score}% mastery`} />
      <div className={v.progressBody}>
        <p className={v.progressTitle}>
          {sum.started === 0 ? 'Start this course' : `${sum.score}% course mastery`}
          <span className={v.progressSub}>
            {sum.counts.mastered} of {sum.chapterCount} chapters mastered
          </span>
        </p>
        <MasteryBar counts={sum.counts} label={`${name} chapters by mastery level`} />
      </div>
      {next && (
        <div className={v.upNext}>
          <span className={v.upNextText}>
            <span className={v.upNextLabel}>{recent ? 'Continue' : 'Up next'}</span>
            <span className={v.upNextTitle} lang={lang}>
              {next.number}. {next.title}
            </span>
            {nextLevel && nextLevel.level !== 'not_started' && (
              <span className={v.upNextHint}>
                {MASTERY_LABELS[nextLevel.level]}
                {nextLevel.hints[0] ? ` · ${MASTERY_HINT_TEXT[nextLevel.hints[0]]}` : ''}
              </span>
            )}
          </span>
          <ButtonLink href={next.href} icon="play" data-testid="up-next">
            {chapterCta(stage, recent ? 'continue' : 'start', next)}
          </ButtonLink>
        </div>
      )}
    </Card>
  );
}

/**
 * Keeps the current chapter visible in the course sidebar (it scrolls on its own when a subject has many
 * chapters): on load the sidebar scrolls itself, never the page, so the marked chapter is in view.
 */
export function SidebarKeepCurrent() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const nav = ref.current?.closest('nav');
    const cur = nav?.querySelector<HTMLElement>('li [aria-current="page"]');
    if (!nav || !cur || nav.scrollHeight <= nav.clientHeight) return;
    const top = cur.offsetTop;
    if (top < nav.scrollTop || top + cur.offsetHeight > nav.scrollTop + nav.clientHeight) nav.scrollTop = Math.max(0, top - nav.clientHeight / 2);
  }, []);
  return <span ref={ref} hidden />;
}
