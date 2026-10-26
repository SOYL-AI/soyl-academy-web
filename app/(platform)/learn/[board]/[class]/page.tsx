/**
 * /learn/[board]/[class] — subjects grouped by tier (ARCHITECTURE §3.1: public, ISR). Rendered on first
 * request and cached (`generateStaticParams` returns []), so `next build` never needs the API.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getSubjects, groupByTier, TIER_HEADINGS } from '@/components/platform/server/catalog';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { RememberClass } from '@/components/platform/learn/LearnClient';
import { BOARD_NAMES, examLabel, learnPath, parseBoard, parseClass } from '@/components/platform/lib/catalog';
import shell from '@/components/platform/shell/shell.module.css';
import s from '@/components/platform/learn/learn.module.css';

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
  const parsed = parse(await params);
  if (!parsed) return {};
  const label = `${examLabel(parsed.board, parsed.classLevel)} Class ${parsed.classLevel}`;
  return platformMetadata({
    title: `${label} subjects`,
    description: `Free lessons, notes, flashcards, practice and tests for every ${label} subject, including languages and electives.`,
    path: learnPath(parsed.board, parsed.classLevel),
  });
}

export default async function ClassPage({ params }: { params: Promise<Params> }) {
  requirePlatform();
  const parsed = parse(await params);
  if (!parsed) notFound();
  const { board, classLevel } = parsed;
  const data = await getSubjects(board, classLevel);
  if (!data) notFound();
  const exam = examLabel(board, classLevel);
  const groups = groupByTier(data.subjects);

  return (
    <div className={shell.page}>
      <RememberClass board={board} classLevel={classLevel} />
      <PageHeader
        crumbs={[
          { name: 'Learn', path: '/learn' },
          { name: `${BOARD_NAMES[board]} Class ${classLevel}`, path: learnPath(board, classLevel) },
        ]}
        title={`${exam} Class ${classLevel}`}
        lead={`${data.subjects.length} subjects for ${data.academicYear}. Choose one to see its chapters.`}
      />
      {groups.map((g) => (
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
    </div>
  );
}
