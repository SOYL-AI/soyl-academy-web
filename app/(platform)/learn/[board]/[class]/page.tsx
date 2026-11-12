/**
 * /learn/[board]/[class] — the class's subjects (ARCHITECTURE §3.1: public, ISR). Rendered on first request
 * and cached (`generateStaticParams` returns []), so `next build` never needs the API.
 * Design language v3 (ADR-032, DESIGN-LANGUAGE.md §10 "Class hub"): every subject of the syllabus, grouped by tier
 * (core, languages, electives) as SubjectCards; within a tier the subjects with lessons come first with the
 * student's progress (client island), the others say "Lessons coming soon" but still open their chapter list.
 * A subject that has content is never folded away. Rail (wide screens): tests for the class and the daily challenge.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { CatalogSubjects } from '@/platform/shared/api-client';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getChapters, getContentSubjectIds, getSubjects, groupByTier, TIER_HEADINGS } from '@/components/platform/server/catalog';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { stageForClass } from '@/components/platform/shell/stage';
import { RememberClass } from '@/components/platform/learn/LearnClient';
import { MasteryProvider } from '@/components/platform/learn/MasteryProvider';
import { LiveSubjectCard } from '@/components/platform/learn/CourseIslands';
import { PLAIN_OVER, readyFirst, subjectMeta } from '@/components/platform/learn/class-hub';
import { classLead } from '@/components/platform/learn/copy';
import { subjectStyle, subjectTintFor } from '@/components/platform/learn/subject-style';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import { DailyChallengeCard } from '@/components/platform/coins/DailyChallengeCard';
import { ButtonLink } from '@/components/platform/ui/kit/ButtonLink';
import { CardGrid, PageColumns, PageSection } from '@/components/platform/ui/kit/Page';
import { RailCard } from '@/components/platform/ui/kit/Rail';
import { BOARD_NAMES, examLabel, learnPath, parseBoard, parseClass, type BoardSlug } from '@/components/platform/lib/catalog';
import shell from '@/components/platform/shell/shell.module.css';
import v from '@/components/platform/learn/v3.module.css';

export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

interface Params {
  board: string;
  class: string;
}

function parse(p: Params) {
  const board = parseBoard(p.board);
  const classLevel = parseClass(p.class);
  return board && classLevel ? { board, classLevel } : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  if (!platformOn()) return {};
  const parsed = parse(await params);
  if (!parsed) return {};
  const label = `${examLabel(parsed.board, parsed.classLevel)} Class ${parsed.classLevel}`;
  return platformMetadata({
    title: `${label} subjects`,
    description: `Free lessons, notes, flashcards, practice and tests for every ${label} subject, including languages and electives.`,
    path: learnPath(parsed.board, parsed.classLevel),
  });
}

type Subject = CatalogSubjects['subjects'][number];

export default async function ClassPage({ params }: { params: Promise<Params> }) {
  requirePlatform();
  const parsed = parse(await params);
  if (!parsed) notFound();
  const { board, classLevel } = parsed;
  const data = await getSubjects(board, classLevel);
  if (!data) notFound();
  const stage = stageForClass(classLevel);
  const exam = examLabel(board, classLevel);
  const withContent = await getContentSubjectIds(board, classLevel);
  const ready = withContent ? data.subjects.filter((x) => withContent.has(x.id)) : [];
  const chapterCounts = new Map(await Promise.all(ready.map(async (x) => [x.id, (await getChapters(x.id, board, classLevel))?.chapters.length ?? 0] as const)));
  const groups = groupByTier(data.subjects).map((g) => ({ ...g, subjects: readyFirst(g.subjects, withContent) }));

  return (
    <div className={shell.page}>
      <RememberClass board={board} classLevel={classLevel} />
      <div className={v.stack}>
        <PageHeader
          crumbs={[
            { name: 'Learn', path: '/learn' },
            { name: `${BOARD_NAMES[board]} Class ${classLevel}`, path: learnPath(board, classLevel) },
          ]}
          title={`${exam} Class ${classLevel}`}
          lead={classLead(stage, ready.length, data.subjects.length, data.academicYear)}
        />
        <PageColumns
          className={v.flowRail}
          railLabel={`More for Class ${classLevel}`}
          rail={
            ready.length > 0 ? (
              <>
                <RailCard id="class-tests-title" title={`Tests for Class ${classLevel}`}>
                  <p className={v.railText}>Chapter tests, unit tests and full board papers in the {exam} pattern. Free, with results and analysis.</p>
                  <div className={v.railActions}>
                    <ButtonLink href="/tests" variant="soft" size="sm" iconEnd="chevronRight">
                      See tests
                    </ButtonLink>
                  </div>
                </RailCard>
                <DailyChallengeCard board={board} classLevel={classLevel} />
              </>
            ) : undefined
          }
        >
          <MasteryProvider>
            {groups.map((g) => {
              const plain = g.subjects.length > PLAIN_OVER;
              return (
                <PageSection key={g.tier} id={`tier-${g.tier}`} title={TIER_HEADINGS[g.tier]} count={g.subjects.length} data-testid={`tier-${g.tier}`}>
                  <CardGrid label={TIER_HEADINGS[g.tier]} className={plain ? v.dense : undefined} min={plain ? 240 : undefined}>
                    {g.subjects.map((subject) => (
                      <SubjectTile
                        key={subject.id}
                        subject={subject}
                        board={board}
                        classLevel={classLevel}
                        chapters={chapterCounts.get(subject.id) ?? 0}
                        hasLessons={withContent && ready.length > 0 ? withContent.has(subject.id) : null}
                        plain={plain}
                      />
                    ))}
                  </CardGrid>
                </PageSection>
              );
            })}
          </MasteryProvider>
        </PageColumns>
      </div>
    </div>
  );
}

function SubjectTile({ subject, board, classLevel, chapters, hasLessons, plain }: { subject: Subject; board: BoardSlug; classLevel: number; chapters: number; hasLessons: boolean | null; plain: boolean }) {
  const st = subjectStyle(subject.id, subject.name, subject.language);
  return (
    <LiveSubjectCard
      subjectId={subject.id}
      chapterCount={chapters}
      name={subject.name}
      meta={subjectMeta(subject, chapters, hasLessons)}
      href={learnPath(board, classLevel, subject.id)}
      tint={subjectTintFor(subject.id, subject.name, subject.language)}
      art={<SubjectGlyph kind={st.art} size={30} />}
      variant={plain || hasLessons === false ? 'plain' : 'tinted'}
      data-testid={hasLessons === false ? 'subject-card-soon' : 'subject-card'}
    />
  );
}
