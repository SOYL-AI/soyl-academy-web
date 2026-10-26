/**
 * /learn/[board]/[class]/[subject] — chapters in board order, grouped by unit (ARCHITECTURE §3.1: public,
 * ISR). Progress kept on this device is shown per chapter; server progress for members needs
 * GET /v1/me/progress (M2).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import type { CatalogChapter } from '@/platform/shared/api-client';
import { requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getChapters } from '@/components/platform/server/catalog';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ChapterProgressNote } from '@/components/platform/learn/LearnClient';
import { BOARD_NAMES, examLabel, langAttr, learnPath, parseBoard, parseClass, subjectIdFor } from '@/components/platform/lib/catalog';
import shell from '@/components/platform/shell/shell.module.css';
import s from '@/components/platform/learn/learn.module.css';

export const revalidate = 3600;

export function generateStaticParams() {
  return [];
}

interface Params {
  board: string;
  class: string;
  subject: string;
}

function parse(p: Params) {
  const board = parseBoard(p.board);
  const classLevel = parseClass(p.class);
  if (!board || !classLevel) return null;
  const subjectId = subjectIdFor(board, classLevel, p.subject);
  return subjectId ? { board, classLevel, subjectId } : null;
}

async function load(params: Promise<Params>) {
  const parsed = parse(await params);
  if (!parsed) return null;
  const data = await getChapters(parsed.subjectId, parsed.board, parsed.classLevel);
  return data ? { ...parsed, data } : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const loaded = await load(params);
  if (!loaded) return {};
  const { board, classLevel, data } = loaded;
  const label = `${examLabel(board, classLevel)} Class ${classLevel} ${data.subject.name}`;
  return platformMetadata({
    title: `${label}: chapters`,
    description: `All ${data.chapters.length} chapters of ${label} (${data.academicYear}) with free lessons, notes, flashcards and practice.`,
    path: learnPath(board, classLevel, data.subject.id),
  });
}

function groupByUnit(chapters: CatalogChapter[]): Array<{ unit: string | null; chapters: CatalogChapter[] }> {
  const groups: Array<{ unit: string | null; chapters: CatalogChapter[] }> = [];
  for (const ch of chapters) {
    const last = groups[groups.length - 1];
    if (last && last.unit === ch.unit) last.chapters.push(ch);
    else groups.push({ unit: ch.unit, chapters: [ch] });
  }
  return groups;
}

export default async function SubjectPage({ params }: { params: Promise<Params> }) {
  requirePlatform();
  const loaded = await load(params);
  if (!loaded) notFound();
  const { board, classLevel, data } = loaded;
  const subject = data.subject;
  const lang = langAttr(subject.language);
  const groups = groupByUnit(data.chapters);
  const showUnits = groups.some((g) => g.unit);

  return (
    <div className={shell.page}>
      <PageHeader
        crumbs={[
          { name: 'Learn', path: '/learn' },
          { name: `${BOARD_NAMES[board]} Class ${classLevel}`, path: learnPath(board, classLevel) },
          { name: subject.name, path: learnPath(board, classLevel, subject.id) },
        ]}
        title={subject.name}
        lead={`${examLabel(board, classLevel)} Class ${classLevel} · ${data.chapters.length} chapters · ${data.academicYear} syllabus`}
      />
      {subject.theoryOnly && (
        <div className={s.notice}>
          <Icon name="info" size={20} />
          <p>We cover the theory part of this subject. Practicals happen at school.</p>
        </div>
      )}
      <section className={s.section} aria-labelledby="chapters-title">
        <h2 id="chapters-title" className={s.sectionTitle}>
          Chapters
        </h2>
        {data.chapters.length === 0 && <p className={s.sectionNote}>Chapters for this subject are being added.</p>}
        {groups.map((g, gi) => (
          <div key={`${g.unit ?? 'none'}-${gi}`}>
            {showUnits && g.unit && (
              <h3 className={s.unitHeading} lang={lang}>
                {g.unit}
              </h3>
            )}
            <ol className={s.list}>
              {g.chapters.map((ch) => (
                <li key={ch.id}>
                  <Link href={learnPath(board, classLevel, subject.id, ch.id)} className={s.itemLink}>
                    <span className={s.chapterNumber} aria-hidden="true">
                      {ch.number}
                    </span>
                    <span className={s.itemMain}>
                      <span className={s.itemTitle} lang={lang}>
                        <span className="p-visually-hidden">Chapter {ch.number}: </span>
                        {ch.title}
                      </span>
                      <span className={s.itemMeta}>
                        {ch.titleEn && ch.titleEn !== ch.title && <span>{ch.titleEn}</span>}
                        <span>{ch.topics.length} topics</span>
                        {!ch.boardAssessed && <Badge>Not in board exam</Badge>}
                        <ChapterProgressNote chapterId={ch.id} />
                      </span>
                    </span>
                    <Icon name="chevronRight" size={20} className={s.itemChevron} />
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </section>
    </div>
  );
}
