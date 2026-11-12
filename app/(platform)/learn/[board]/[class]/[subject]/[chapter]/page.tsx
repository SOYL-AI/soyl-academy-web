/**
 * Chapter hub (ARCHITECTURE §3.1: public, ISR). Two calls (ADR-010 §1, backend-api M2 point 2): the public
 * hub GET /v1/chapters/:id rendered here (cached), and the student's own progress fetched in the browser
 * (HubProgressProvider, MasteryProvider). Design language v3 (ADR-032, DESIGN-LANGUAGE.md §10 "Chapter hub"): the
 * resume point as ONE ContinueCard, "Study your way" ModeTiles with real state, the learning path (Lesson → Notes →
 * Flashcards → Practice → Chapter test) as a List, topics; the chapter's mastery and its tests in the rail. The
 * course sidebar stays on wide screens.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge, Card } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { List } from '@/components/platform/ui/kit/Lists';
import { CardGrid, PageColumns, PageSection } from '@/components/platform/ui/kit/Page';
import { RailCard } from '@/components/platform/ui/kit/Rail';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getChapters } from '@/components/platform/server/catalog';
import { loadChapterRoute, type ChapterParams } from '@/components/platform/server/chapter-route';
import { examLabel, learnPath } from '@/components/platform/lib/catalog';
import { lessonHref } from '@/components/platform/lib/lesson-links';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ChapterTestsCard } from '@/components/platform/learn/LearnClient';
import { HubContinue, HubMastery, HubProgressProvider, PartProgress, PathStep, PracticeProgress, StudyModes, type HubAssets } from '@/components/platform/learn/HubProgress';
import { MasteryProvider } from '@/components/platform/learn/MasteryProvider';
import { CourseSidebar, unitsOf } from '@/components/platform/learn/CourseSidebar';
import { subjectStyle, subjectTintFor } from '@/components/platform/learn/subject-style';
import { ReportMistake } from '@/components/platform/report/ReportMistake';
import { QUESTION_TYPE_LABELS } from '@/components/platform/ui/question/model';
import shell from '@/components/platform/shell/shell.module.css';
import c from '@/components/platform/learn/course.module.css';
import v from '@/components/platform/learn/v3.module.css';

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
  const parts = assets.lesson.available ? assets.lesson.parts : [];
  const partLabel = (p: (typeof parts)[number], i: number) => (parts.length > 1 ? `Part ${i + 1}: ${p.title.replace(/^.*?Part \d+:\s*/, '')}` : chapter.title);
  const topTypes = Object.entries(assets.practice.byType)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([t, n]) => `${QUESTION_TYPE_LABELS[t as keyof typeof QUESTION_TYPE_LABELS] ?? t} ${n}`);
  const chapterTests = assets.tests.items.filter((t) => t.kind === 'chapter');
  const course = await getChapters(hub.subject.id, board, classLevel);
  const subjectHref = learnPath(board, classLevel, hub.subject.id);
  const units = course
    ? unitsOf(course.chapters).map((u) => ({
        unit: u.unit,
        chapters: u.chapters.map((ch) => ({ id: ch.id, number: ch.number, title: ch.title, href: learnPath(board, classLevel, hub.subject.id, ch.id) })),
      }))
    : [];
  const style = subjectStyle(hub.subject.id, hub.subject.name, hub.subject.language);
  const studyAssets: HubAssets = {
    base,
    parts: parts.map((p, i) => ({ part: p.part, slideCount: p.slideCount, label: partLabel(p, i) })),
    notes: { available: assets.notes.available, sections: assets.notes.sections },
    flashcards: { available: assets.flashcards.available, count: assets.flashcards.count },
    practice: { available: assets.practice.available, count: assets.practice.count },
    tests: { count: chapterTests.length, href: seriesBase },
  };

  return (
    <div className={`${shell.page} ${shell.wide}`}>
      <MasteryProvider subjectId={hub.subject.id}>
        <HubProgressProvider chapterId={chapterId} parts={assets.lesson.parts.map((p) => ({ part: p.part, slideCount: p.slideCount }))}>
          <div className={c.layout}>
            {units.length > 0 ? <CourseSidebar title={hub.subject.name} href={subjectHref} units={units} currentId={chapterId} lang={lang} /> : <div />}
            <div className={`${c.main} ${v.stack}`}>
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
                <Card tint="yellow" className={v.notice}>
                  <Icon name="info" size={20} />
                  <p>This chapter is not part of the board exam. Your school may still assess it.</p>
                </Card>
              )}
              <PageColumns
                railLabel="This chapter"
                rail={
                  <>
                    <RailCard id="mastery-title" title="Your mastery">
                      <HubMastery chapterId={chapterId} lessonParts={parts.length} practiceTotal={assets.practice.available ? assets.practice.count : 0} />
                    </RailCard>
                    <RailCard id="tests-title" title="Chapter tests" aside={<Badge tone="accent">Free</Badge>}>
                      <ChapterTestsCard seriesHref={seriesBase} tests={chapterTests.map((t) => ({ id: t.id, title: t.title, durationMin: t.durationMin, totalMarks: t.totalMarks }))} />
                    </RailCard>
                  </>
                }
              >
                <HubContinue assets={studyAssets} chapterTitle={chapter.title} tint={subjectTintFor(hub.subject.id, hub.subject.name, hub.subject.language)} art={<SubjectGlyph kind={style.art} size={56} />} lang={lang} />

                <PageSection id="modes-title" title="Study your way">
                  <CardGrid label="Study modes" min={200}>
                    <StudyModes assets={studyAssets} />
                  </CardGrid>
                </PageSection>

                <PageSection id="study-title" title="Your path through this chapter">
                  <List label="Steps in this chapter" className={v.path}>
                    <PathStep
                      kind="lesson"
                      number={1}
                      available={assets.lesson.available}
                      testId="hub-lesson"
                      title="Visual lesson"
                      badge={<BetaBadge status={parts[0]?.reviewStatus} />}
                      meta={assets.lesson.available ? `${parts.length > 1 ? `${parts.length} parts · ` : ''}short slides, one idea at a time` : 'Short slides, one idea at a time. We are preparing this lesson.'}
                    >
                      {parts.length > 0 && (
                        <ol className={v.parts}>
                          {parts.map((p, i) => (
                            <li key={p.part} className={v.partItem}>
                              <Link href={lessonHref(base, parts, p.part)} className={v.partRow}>
                                <span className={v.partText}>
                                  <span className={v.partTitle} lang={lang}>
                                    {parts.length > 1 ? partLabel(p, i) : 'Start the lesson'}
                                  </span>
                                  <span className={v.partMeta}>
                                    {p.slideCount} slides{p.hasAudio ? ' · with narration' : ''}
                                  </span>
                                </span>
                                <Icon name="play" size={18} />
                              </Link>
                              <PartProgress part={p.part} slideCount={p.slideCount} />
                            </li>
                          ))}
                        </ol>
                      )}
                    </PathStep>
                    <PathStep
                      kind="notes"
                      number={2}
                      available={assets.notes.available}
                      testId="hub-notes"
                      title="Notes"
                      badge={assets.notes.available ? <BetaBadge status={assets.notes.reviewStatus} /> : null}
                      href={assets.notes.available ? `${base}/notes` : undefined}
                      meta={assets.notes.available ? `${assets.notes.sections} sections with key terms, formulas and exam tips` : 'Clear chapter notes for quick revision.'}
                    />
                    <PathStep
                      kind="flashcards"
                      number={3}
                      available={assets.flashcards.available}
                      testId="hub-flashcards"
                      title="Flashcards"
                      badge={assets.flashcards.available ? <BetaBadge status={assets.flashcards.reviewStatus} /> : null}
                      href={assets.flashcards.available ? `${base}/flashcards` : undefined}
                      meta={assets.flashcards.available ? `${assets.flashcards.count} cards for quick recall of key terms and facts` : 'Quick recall of key terms and facts.'}
                    />
                    <PathStep
                      kind="practice"
                      number={4}
                      available={assets.practice.available}
                      practiceTotal={assets.practice.count}
                      testId="hub-practice"
                      title="Practice"
                      href={assets.practice.available ? `${base}/practice` : undefined}
                      meta={
                        assets.practice.available ? (
                          <>
                            {assets.practice.count} board-style questions with instant checks{topTypes.length ? `: ${topTypes.join(', ')}` : ''}.
                            <br />
                            <PracticeProgress total={assets.practice.count} />
                          </>
                        ) : (
                          'Board-style questions with instant checks.'
                        )
                      }
                    />
                    <PathStep
                      kind="test"
                      number={5}
                      available
                      testId="hub-test"
                      title="Chapter test"
                      href={seriesBase}
                      meta="Short and long chapter tests in the board pattern, with results and analysis. Free."
                    />
                  </List>
                </PageSection>

                {chapter.topics.length > 0 && (
                  <PageSection id="topics-title" title="Topics" count={chapter.topics.length}>
                    <Card>
                      <ol className={v.topics} lang={lang}>
                        {chapter.topics.map((t) => (
                          <li key={t.id}>
                            {t.title}
                            {t.titleEn && t.titleEn !== t.title ? <span lang="en"> ({t.titleEn})</span> : null}
                          </li>
                        ))}
                      </ol>
                    </Card>
                  </PageSection>
                )}

              </PageColumns>
              <footer className={v.hubFooter}>
                <ReportMistake target={{ chapterId, contentType: 'notes', itemRef: 'hub' }} what="this chapter page" />
              </footer>
            </div>
          </div>
        </HubProgressProvider>
      </MasteryProvider>
    </div>
  );
}
