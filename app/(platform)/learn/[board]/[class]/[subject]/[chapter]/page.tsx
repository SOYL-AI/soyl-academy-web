/**
 * Chapter hub (ARCHITECTURE §3.1: public, ISR). Two calls (ADR-010 §1, backend-api M2 point 2): the public
 * hub GET /v1/chapters/:id rendered here (cached), and the student's own progress fetched in the browser
 * (HubProgressProvider, MasteryProvider). ADR-023 (Khan style): the course sidebar on desktop, the chapter's
 * mastery with what to do next, and a learning path: Lesson → Notes → Flashcards → Practice → Chapter test,
 * each step with its own progress.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getChapters } from '@/components/platform/server/catalog';
import { loadChapterRoute, type ChapterParams } from '@/components/platform/server/chapter-route';
import { examLabel, learnPath } from '@/components/platform/lib/catalog';
import { lessonHref } from '@/components/platform/lib/lesson-links';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ChapterTestsCard } from '@/components/platform/learn/LearnClient';
import { ContinueLesson, HubMastery, HubProgressProvider, PartProgress, PathStep, PracticeProgress } from '@/components/platform/learn/HubProgress';
import { MasteryProvider } from '@/components/platform/learn/MasteryProvider';
import { CourseSidebar, unitsOf } from '@/components/platform/learn/CourseSidebar';
import { ReportMistake } from '@/components/platform/report/ReportMistake';
import { QUESTION_TYPE_LABELS } from '@/components/platform/ui/question/model';
import shell from '@/components/platform/shell/shell.module.css';
import s from '@/components/platform/learn/learn.module.css';
import h from '@/components/platform/learn/hub.module.css';
import c from '@/components/platform/learn/course.module.css';

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
  const { hub, base, lang, chapterId, board, classLevel } = r;
  // The subject's test series (M3): /tests/series/[board]/[class]/[subject] (same slugs as /learn).
  const seriesBase = base.replace(/^\/learn\//, '/tests/series/').replace(/\/ch\d{2}$/, '');
  const { chapter, assets } = hub;
  const parts = assets.lesson.parts;
  const partTitles = Object.fromEntries(parts.map((p, i) => [p.part, parts.length > 1 ? `part ${i + 1}` : 'the lesson']));
  const topTypes = Object.entries(assets.practice.byType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([t, n]) => `${QUESTION_TYPE_LABELS[t as keyof typeof QUESTION_TYPE_LABELS] ?? t} ${n}`);
  const course = await getChapters(hub.subject.id, board, classLevel);
  const subjectHref = learnPath(board, classLevel, hub.subject.id);
  const units = course
    ? unitsOf(course.chapters).map((u) => ({
        unit: u.unit,
        chapters: u.chapters.map((ch) => ({ id: ch.id, number: ch.number, title: ch.title, href: learnPath(board, classLevel, hub.subject.id, ch.id) })),
      }))
    : [];

  return (
    <div className={`${shell.page} ${shell.wide}`}>
      <MasteryProvider subjectId={hub.subject.id}>
        <HubProgressProvider chapterId={chapterId} parts={parts.map((p) => ({ part: p.part, slideCount: p.slideCount }))}>
          <div className={c.layout}>
            {units.length > 0 ? <CourseSidebar title={hub.subject.name} href={subjectHref} units={units} currentId={chapterId} lang={lang} /> : <div />}
            <div className={c.main}>
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
              <HubMastery chapterId={chapterId} lessonParts={assets.lesson.available ? parts.length : 0} practiceTotal={assets.practice.available ? assets.practice.count : 0} />

              <section className={s.section} aria-labelledby="study-title">
                <h2 id="study-title" className={s.sectionTitle}>
                  Your path through this chapter
                </h2>
                <ContinueLesson base={base} parts={parts} titles={partTitles} />
                <ol className={c.path}>
                  <PathStep kind="lesson" number={1} available={assets.lesson.available} testId="hub-lesson">
                    <h3 className={c.stepHead}>
                      <Icon name="play" size={20} /> Visual lesson {assets.lesson.available ? <BetaBadge status={parts[0]?.reviewStatus} /> : <Badge>Coming soon</Badge>}
                    </h3>
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
                      <p className={c.stepBlurb}>Short slides, one idea at a time. We are preparing this chapter&apos;s lesson.</p>
                    )}
                  </PathStep>

                  <PathStep kind="notes" number={2} available={assets.notes.available} testId="hub-notes">
                    <h3 className={c.stepHead}>
                      <Icon name="book" size={20} /> Notes {assets.notes.available ? <BetaBadge status={assets.notes.reviewStatus} /> : <Badge>Coming soon</Badge>}
                    </h3>
                    <p className={c.stepBlurb}>{assets.notes.available ? `${assets.notes.sections} sections with key terms, formulas and exam tips.` : 'Clear chapter notes for quick revision.'}</p>
                    {assets.notes.available && (
                      <Link href={`${base}/notes`} className={`${c.stepLink} ${c.stepLinkQuiet}`}>
                        Read the notes <Icon name="chevronRight" size={18} />
                      </Link>
                    )}
                  </PathStep>

                  <PathStep kind="flashcards" number={3} available={assets.flashcards.available} testId="hub-flashcards">
                    <h3 className={c.stepHead}>
                      <Icon name="rotate" size={20} /> Flashcards {assets.flashcards.available ? <BetaBadge status={assets.flashcards.reviewStatus} /> : <Badge>Coming soon</Badge>}
                    </h3>
                    <p className={c.stepBlurb}>{assets.flashcards.available ? `${assets.flashcards.count} cards for quick recall of key terms and facts.` : 'Quick recall of key terms and facts.'}</p>
                    {assets.flashcards.available && (
                      <Link href={`${base}/flashcards`} className={`${c.stepLink} ${c.stepLinkQuiet}`}>
                        Review the cards <Icon name="chevronRight" size={18} />
                      </Link>
                    )}
                  </PathStep>

                  <PathStep kind="practice" number={4} available={assets.practice.available} practiceTotal={assets.practice.count} testId="hub-practice">
                    <h3 className={c.stepHead}>
                      <Icon name="target" size={20} /> Practice {!assets.practice.available && <Badge>Coming soon</Badge>}
                    </h3>
                    <p className={c.stepBlurb}>
                      {assets.practice.available
                        ? `${assets.practice.count} board-style questions with instant checks${topTypes.length ? `: ${topTypes.join(', ')}` : ''}.`
                        : 'Board-style questions with instant checks.'}
                    </p>
                    {assets.practice.available && (
                      <>
                        <PracticeProgress total={assets.practice.count} />
                        <Link href={`${base}/practice`} className={c.stepLink}>
                          Practise <Icon name="chevronRight" size={18} />
                        </Link>
                      </>
                    )}
                  </PathStep>

                  <PathStep kind="test" number={5} available testId="hub-test">
                    <h3 className={c.stepHead}>
                      <Icon name="clock" size={20} /> Chapter test <Badge tone="accent">Free</Badge>
                    </h3>
                    <p className={c.stepBlurb}>Short and long chapter tests in board pattern, with results and analysis.</p>
                    <ChapterTestsCard seriesHref={seriesBase} tests={assets.tests.items.filter((t) => t.kind === 'chapter').map((t) => ({ id: t.id, title: t.title, durationMin: t.durationMin, totalMarks: t.totalMarks }))} />
                  </PathStep>
                </ol>
              </section>

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
          </div>
        </HubProgressProvider>
      </MasteryProvider>
    </div>
  );
}
