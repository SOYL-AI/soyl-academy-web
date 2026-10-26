/**
 * Chapter hub (ARCHITECTURE §3.1: public, ISR). Two calls (ADR-010 §1, backend-api M2 point 2): the public
 * hub GET /v1/chapters/:id rendered here (cached), and the student's own progress fetched in the browser
 * (HubProgressProvider). Links to the lesson parts, notes, flashcards, practice and chapter tests.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { loadChapterRoute, type ChapterParams } from '@/components/platform/server/chapter-route';
import { examLabel } from '@/components/platform/lib/catalog';
import { lessonHref } from '@/components/platform/lib/lesson-links';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ChapterTestsCard } from '@/components/platform/learn/LearnClient';
import { ContinueLesson, HubProgressProvider, PartProgress, PracticeProgress } from '@/components/platform/learn/HubProgress';
import { ReportMistake } from '@/components/platform/report/ReportMistake';
import { QUESTION_TYPE_LABELS } from '@/components/platform/ui/question/model';
import shell from '@/components/platform/shell/shell.module.css';
import s from '@/components/platform/learn/learn.module.css';
import h from '@/components/platform/learn/hub.module.css';

export const revalidate = 600;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<ChapterParams> }): Promise<Metadata> {
  if (!platformOn()) return {};
  const r = await loadChapterRoute(params);
  if (!r) return {};
  const { hub, board, classLevel } = r;
  const ch = hub.chapter;
  const title = ch.titleEn && ch.titleEn !== ch.title ? `${ch.title} (${ch.titleEn})` : ch.title;
  return platformMetadata({
    title: `${title}: ${examLabel(board, classLevel)} Class ${classLevel} ${hub.subject.name}`,
    description: `Chapter ${ch.number} of ${examLabel(board, classLevel)} Class ${classLevel} ${hub.subject.name}: ${ch.topics.length} topics, with a visual lesson, notes, flashcards, practice questions and chapter tests. Free.`,
    path: r.base,
  });
}

function BetaBadge({ status }: { status: 'beta' | 'reviewed' | null | undefined }) {
  return status === 'beta' ? <Badge tone="warning">Beta</Badge> : null;
}

export default async function ChapterHubPage({ params }: { params: Promise<ChapterParams> }) {
  requirePlatform();
  const r = await loadChapterRoute(params);
  if (!r) notFound();
  const { hub, base, lang, chapterId } = r;
  const { chapter, assets } = hub;
  const parts = assets.lesson.parts;
  const partTitles = Object.fromEntries(parts.map((p, i) => [p.part, parts.length > 1 ? `part ${i + 1}` : 'the lesson']));
  const topTypes = Object.entries(assets.practice.byType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([t, n]) => `${QUESTION_TYPE_LABELS[t as keyof typeof QUESTION_TYPE_LABELS] ?? t} ${n}`);

  return (
    <div className={shell.page}>
      <PageHeader
        crumbs={r.crumbs}
        title={chapter.title}
        lang={lang}
        lead={
          <>
            {chapter.titleEn && chapter.titleEn !== chapter.title ? `${chapter.titleEn} · ` : ''}
            {hub.subject.name} · Chapter {chapter.number}
            {chapter.unit ? ` · ${chapter.unit}` : ''}
          </>
        }
      />
      {!chapter.boardAssessed && (
        <div className={s.notice}>
          <Icon name="info" size={20} />
          <p>This chapter is not part of the board exam. Your school may still assess it.</p>
        </div>
      )}

      <HubProgressProvider chapterId={chapterId} parts={parts.map((p) => ({ part: p.part, slideCount: p.slideCount }))}>
        <section className={s.section} aria-labelledby="study-title">
          <h2 id="study-title" className={s.sectionTitle}>
            Study this chapter
          </h2>
          <ContinueLesson base={base} parts={parts} titles={partTitles} />
          <ul className={s.viewGrid}>
            <li className={h.card} data-testid="hub-lesson">
              <div className={s.viewHead}>
                <Icon name="play" size={20} /> Visual lesson {assets.lesson.available ? <BetaBadge status={parts[0]?.reviewStatus} /> : <Badge>Coming soon</Badge>}
              </div>
              {assets.lesson.available ? (
                <ol className={h.parts}>
                  {parts.map((p, i) => (
                    <li key={p.part}>
                      <Link href={lessonHref(base, parts, p.part)} className={h.partLink} lang={lang}>
                        <span className={h.partTitle}>{parts.length > 1 ? `Part ${i + 1}: ${p.title.replace(/^.*?Part \d+:\s*/, '')}` : 'Start the lesson'}</span>
                        <span className={h.partMeta} lang="en">
                          {p.slideCount} slides{p.hasAudio ? ' · with narration' : ''}
                        </span>
                      </Link>
                      <PartProgress part={p.part} slideCount={p.slideCount} />
                    </li>
                  ))}
                </ol>
              ) : (
                <p className={s.viewBlurb}>Short slides, one idea at a time. We are preparing this chapter&apos;s lesson.</p>
              )}
            </li>
            <li className={h.card} data-testid="hub-notes">
              {assets.notes.available ? (
                <Link href={`${base}/notes`} className={h.cardLink}>
                  <span className={s.viewHead}>
                    <Icon name="book" size={20} /> Notes <BetaBadge status={assets.notes.reviewStatus} />
                  </span>
                  <span className={s.viewBlurb}>{assets.notes.sections} sections with key terms, formulas and exam tips.</span>
                </Link>
              ) : (
                <ComingSoon title="Notes" blurb="Clear chapter notes for quick revision." />
              )}
            </li>
            <li className={h.card} data-testid="hub-flashcards">
              {assets.flashcards.available ? (
                <Link href={`${base}/flashcards`} className={h.cardLink}>
                  <span className={s.viewHead}>
                    <Icon name="rotate" size={20} /> Flashcards <BetaBadge status={assets.flashcards.reviewStatus} />
                  </span>
                  <span className={s.viewBlurb}>{assets.flashcards.count} cards for quick recall of key terms and facts.</span>
                </Link>
              ) : (
                <ComingSoon title="Flashcards" blurb="Quick recall of key terms and facts." />
              )}
            </li>
            <li className={h.card} data-testid="hub-practice">
              {assets.practice.available ? (
                <Link href={`${base}/practice`} className={h.cardLink}>
                  <span className={s.viewHead}>
                    <Icon name="check" size={20} /> Practice
                  </span>
                  <span className={s.viewBlurb}>
                    {assets.practice.count} board-style questions with instant checks{topTypes.length ? `: ${topTypes.join(', ')}` : ''}.
                  </span>
                  <PracticeProgress total={assets.practice.count} />
                </Link>
              ) : (
                <ComingSoon title="Practice" blurb="Board-style questions with instant checks." />
              )}
            </li>
            <li>
              <ChapterTestsCard tests={assets.tests.items.map((t) => ({ id: t.id, title: t.title, durationMin: t.durationMin, totalMarks: t.totalMarks }))} />
            </li>
          </ul>
        </section>
      </HubProgressProvider>

      {chapter.topics.length > 0 && (
        <section className={s.section} aria-labelledby="topics-title">
          <h2 id="topics-title" className={s.sectionTitle}>
            Topics <span className={s.sectionCount}>{chapter.topics.length}</span>
          </h2>
          <ol className={s.topics} lang={lang}>
            {chapter.topics.map((t) => (
              <li key={t.id}>
                {t.title}
                {t.titleEn && t.titleEn !== t.title ? <span lang="en"> ({t.titleEn})</span> : null}
              </li>
            ))}
          </ol>
        </section>
      )}

      <footer className={h.footer}>
        <ReportMistake target={{ chapterId, contentType: 'notes', itemRef: 'hub' }} what="this chapter page" />
      </footer>
    </div>
  );
}

function ComingSoon({ title, blurb }: { title: string; blurb: string }) {
  return (
    <div className={h.cardLink} aria-disabled="true">
      <span className={s.viewHead}>
        {title} <Badge>Coming soon</Badge>
      </span>
      <span className={s.viewBlurb}>{blurb}</span>
    </div>
  );
}
