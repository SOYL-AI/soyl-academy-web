'use client';

/**
 * Client islands for the server-rendered course pages (ADR-023): mastery on subject cards, chapter rows and the
 * sidebar; the subject header with its segmented bar and "Up next". They read MasteryProvider (one fetch per page).
 */
import Link from 'next/link';
import { MasteryBar, MasteryPip, ProgressRing } from '@/components/platform/ui/kit/Mastery';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { MASTERY_HINT_TEXT, MASTERY_LABELS } from '../lib/mastery';
import { useLearnerProgress } from './ProgressProvider';
import { useCourseMastery } from './MasteryProvider';
import s from './course.module.css';

export function SubjectCardProgress({ subjectId, chapterCount, name }: { subjectId: string; chapterCount: number; name: string }) {
  const m = useCourseMastery();
  const sum = m.subject(subjectId, chapterCount);
  return (
    <span className={s.cardProgress} data-testid="subject-progress" data-score={m.ready ? sum.score : undefined}>
      <ProgressRing value={sum.score} size={44} stroke={5} label={`${name}: ${sum.score}% mastery`} />
      <span className={s.cardProgressText}>{sum.started > 0 ? `${sum.started} of ${chapterCount} chapters started` : `${chapterCount} chapters`}</span>
    </span>
  );
}

export function ChapterMasteryPip({ chapterId, showLabel = true }: { chapterId: string; showLabel?: boolean }) {
  const m = useCourseMastery();
  const c = m.chapter(chapterId);
  return <MasteryPip level={c.level} showLabel={showLabel} />;
}

export interface CourseChapterLink {
  id: string;
  number: number;
  title: string;
  href: string;
}

/** Subject header: overall mastery ring + segmented bar + the next chapter to work on. */
export function SubjectMasteryHeader({ subjectId, name, chapters, lang }: { subjectId: string; name: string; chapters: CourseChapterLink[]; lang?: string }) {
  const m = useCourseMastery();
  const { progress } = useLearnerProgress();
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
    <section className={s.masteryHead} aria-label={`${name} progress`} data-testid="subject-mastery">
      <ProgressRing value={sum.score} size={72} stroke={7} label={`${name}: ${sum.score}% mastery`} className={s.headRing} />
      <div className={s.headBody}>
        <p className={s.headTitle}>
          {sum.started === 0 ? 'Start this course' : `${sum.score}% course mastery`}
          <span className={s.headSub}>
            {sum.counts.mastered} of {sum.chapterCount} chapters mastered
          </span>
        </p>
        <MasteryBar counts={sum.counts} label={`${name} chapters by mastery level`} />
      </div>
      {next && (
        <Link href={next.href} className={s.upNext} data-testid="up-next">
          <span className={s.upNextLabel}>{recent ? 'Continue' : 'Up next'}</span>
          <span className={s.upNextTitle} lang={lang}>
            {next.number}. {next.title}
          </span>
          {nextLevel && nextLevel.level !== 'not_started' && (
            <span className={s.upNextHint}>
              {MASTERY_LABELS[nextLevel.level]}
              {nextLevel.hints[0] ? ` · ${MASTERY_HINT_TEXT[nextLevel.hints[0]]}` : ''}
            </span>
          )}
          <Icon name="chevronRight" size={20} className={s.upNextIcon} />
        </Link>
      )}
    </section>
  );
}
