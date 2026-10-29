/**
 * /learn/[board]/[class] — the class's subjects (ARCHITECTURE §3.1: public, ISR). Rendered on first request
 * and cached (`generateStaticParams` returns []), so `next build` never needs the API.
 * ADR-023: subjects with lessons first, as course cards with the student's mastery (client island); every
 * other subject of the syllabus under "More subjects: coming soon"; the daily challenge after the courses.
 * If we cannot tell which subjects have content, every subject is listed by tier as before.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { CatalogSubjects } from '@/platform/shared/api-client';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getChapters, getContentSubjectIds, getSubjects, groupByTier, TIER_HEADINGS } from '@/components/platform/server/catalog';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { RememberClass } from '@/components/platform/learn/LearnClient';
import { MasteryProvider } from '@/components/platform/learn/MasteryProvider';
import { SubjectCardProgress } from '@/components/platform/learn/CourseIslands';
import { subjectStyle } from '@/components/platform/learn/subject-style';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
import { DailyChallengeCard } from '@/components/platform/coins/DailyChallengeCard';
import { BOARD_NAMES, examLabel, learnPath, parseBoard, parseClass, type BoardSlug } from '@/components/platform/lib/catalog';
import shell from '@/components/platform/shell/shell.module.css';
import s from '@/components/platform/learn/learn.module.css';
import c from '@/components/platform/learn/course.module.css';

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
  const exam = examLabel(board, classLevel);
  const withContent = await getContentSubjectIds(board, classLevel);
  const ready = withContent ? data.subjects.filter((x) => withContent.has(x.id)) : [];
  const rest = ready.length ? data.subjects.filter((x) => !withContent!.has(x.id)) : data.subjects;
  const chapterCounts = new Map(await Promise.all(ready.map(async (x) => [x.id, (await getChapters(x.id, board, classLevel))?.chapters.length ?? 0] as const)));

  return (
    <div className={shell.page}>
      <RememberClass board={board} classLevel={classLevel} />
      <PageHeader
        crumbs={[
          { name: 'Learn', path: '/learn' },
          { name: `${BOARD_NAMES[board]} Class ${classLevel}`, path: learnPath(board, classLevel) },
        ]}
        title={`${exam} Class ${classLevel}`}
        lead={
          ready.length
            ? `${ready.length} ${ready.length === 1 ? 'course is' : 'courses are'} ready to learn, free. ${data.subjects.length} subjects in the ${data.academicYear} syllabus.`
            : `${data.subjects.length} subjects for ${data.academicYear}. Choose one to see its chapters.`
        }
      />

      {ready.length > 0 && (
        <MasteryProvider>
          <section className={s.section} aria-labelledby="courses-title">
            <h2 id="courses-title" className={s.sectionTitle}>
              Start learning <span className={s.sectionCount}>{ready.length}</span>
            </h2>
            <ul className={c.subjectGrid}>
              {ready.map((subject) => (
                <li key={subject.id}>
                  <SubjectCard subject={subject} board={board} classLevel={classLevel} chapters={chapterCounts.get(subject.id) ?? 0} />
                </li>
              ))}
            </ul>
          </section>
        </MasteryProvider>
      )}

      <DailyChallengeCard board={board} classLevel={classLevel} />

      {ready.length > 0 ? (
        <details className={c.moreSubjects} data-testid="more-subjects">
          <summary>
            <span>
              More subjects: coming soon <span className={s.sectionCount}>{rest.length}</span>
            </span>
            <Icon name="chevronDown" size={20} className={c.moreChevron} />
          </summary>
          <div className={c.moreBody}>
            <p className={c.soonNote}>We are adding lessons for these subjects. Their chapter lists are already here.</p>
            <SubjectTiers subjects={rest} board={board} classLevel={classLevel} />
          </div>
        </details>
      ) : (
        <SubjectTiers subjects={rest} board={board} classLevel={classLevel} />
      )}
    </div>
  );
}

function SubjectCard({ subject, board, classLevel, chapters }: { subject: Subject; board: BoardSlug; classLevel: number; chapters: number }) {
  const st = subjectStyle(subject.id, subject.name, subject.language);
  return (
    <Link href={learnPath(board, classLevel, subject.id)} className={c.subjectCard} data-testid="subject-card">
      <span className={c.tile} data-hue={st.hue} aria-hidden="true">
        <SubjectGlyph kind={st.art} size={32} />
      </span>
      <span className={c.subjectBody}>
        <span className={c.subjectName}>{subject.name}</span>
        <span className={c.subjectMeta}>
          {subject.code ? `Code ${subject.code} · ` : ''}Lessons, notes, practice and tests
        </span>
      </span>
      {chapters > 0 && <SubjectCardProgress subjectId={subject.id} chapterCount={chapters} name={subject.name} />}
    </Link>
  );
}

function SubjectTiers({ subjects, board, classLevel }: { subjects: Subject[]; board: BoardSlug; classLevel: number }) {
  return (
    <>
      {groupByTier(subjects).map((g) => (
        <section key={g.tier} className={s.section} aria-labelledby={`tier-${g.tier}`}>
          <h2 id={`tier-${g.tier}`} className={s.sectionTitle}>
            {TIER_HEADINGS[g.tier]} <span className={s.sectionCount}>{g.subjects.length}</span>
          </h2>
          <ul className={`${s.list} ${s.listTwo}`}>
            {g.subjects.map((subject) => (
              <li key={subject.id}>
                <Link href={learnPath(board, classLevel, subject.id)} className={s.itemLink}>
                  <span className={s.itemMain}>
                    <span className={s.itemTitle}>{subject.name}</span>
                    {(subject.code || subject.theoryOnly) && (
                      <span className={s.itemMeta}>
                        {subject.code && <span>Code {subject.code}</span>}
                        {subject.theoryOnly && <Badge>Theory only</Badge>}
                      </span>
                    )}
                  </span>
                  <Icon name="chevronRight" size={20} className={s.itemChevron} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
