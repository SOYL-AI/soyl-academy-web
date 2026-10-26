/**
 * Chapter hub (ARCHITECTURE §3.1: public, ISR). M1 is the shell: topics from the catalog and links to the
 * lesson, notes, flashcards and practice views (M2) plus chapter tests (login, M3). Data comes from the
 * subject's chapter list until GET /v1/chapters/:id (hub) exists (M2 request in the handoff).
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/platform/ui/kit/Display';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getChapters } from '@/components/platform/server/catalog';
import { PageHeader } from '@/components/platform/shell/PageHeader';
import { ChapterProgressNote, ChapterTestsCard } from '@/components/platform/learn/LearnClient';
import { BOARD_NAMES, CHAPTER_VIEWS, chapterSlug, examLabel, langAttr, learnPath, parseBoard, parseChapterSlug, parseClass, subjectIdFor } from '@/components/platform/lib/catalog';
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
  chapter: string;
}

async function load(params: Promise<Params>) {
  const p = await params;
  const board = parseBoard(p.board);
  const classLevel = parseClass(p.class);
  const ch = parseChapterSlug(p.chapter);
  if (!board || !classLevel || !ch) return null;
  const subjectId = subjectIdFor(board, classLevel, p.subject);
  if (!subjectId) return null;
  const data = await getChapters(subjectId, board, classLevel);
  const chapter = data?.chapters.find((c) => chapterSlug(c.id) === ch);
  return data && chapter ? { board, classLevel, subject: data.subject, chapter, academicYear: data.academicYear } : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  if (!platformOn()) return {};
  const loaded = await load(params);
  if (!loaded) return {};
  const { board, classLevel, subject, chapter } = loaded;
  const title = chapter.titleEn && chapter.titleEn !== chapter.title ? `${chapter.title} (${chapter.titleEn})` : chapter.title;
  return platformMetadata({
    title: `${title}: ${examLabel(board, classLevel)} Class ${classLevel} ${subject.name}`,
    description: `Chapter ${chapter.number} of ${examLabel(board, classLevel)} Class ${classLevel} ${subject.name}: ${chapter.topics.length} topics, with a visual lesson, notes, flashcards, practice and chapter tests.`,
    path: learnPath(board, classLevel, subject.id, chapter.id),
  });
}

export default async function ChapterHubPage({ params }: { params: Promise<Params> }) {
  requirePlatform();
  const loaded = await load(params);
  if (!loaded) notFound();
  const { board, classLevel, subject, chapter } = loaded;
  const lang = langAttr(subject.language);
  const base = learnPath(board, classLevel, subject.id, chapter.id);

  return (
    <div className={shell.page}>
      <PageHeader
        crumbs={[
          { name: 'Learn', path: '/learn' },
          { name: `${BOARD_NAMES[board]} Class ${classLevel}`, path: learnPath(board, classLevel) },
          { name: subject.name, path: learnPath(board, classLevel, subject.id) },
          { name: `Chapter ${chapter.number}`, path: base },
        ]}
        title={chapter.title}
        lang={lang}
        lead={
          <>
            {chapter.titleEn && chapter.titleEn !== chapter.title ? `${chapter.titleEn} · ` : ''}
            {subject.name} · Chapter {chapter.number}
            {chapter.unit ? ` · ${chapter.unit}` : ''} <ChapterProgressNote chapterId={chapter.id} />
          </>
        }
      />

      <section className={s.section} aria-labelledby="study-title">
        <h2 id="study-title" className={s.sectionTitle}>
          Study this chapter
        </h2>
        <ul className={s.viewGrid}>
          {CHAPTER_VIEWS.map((v) => (
            <li key={v.slug}>
              <Link href={`${base}/${v.slug}`} className={s.viewLink}>
                <span className={s.viewHead}>
                  {v.title} <Badge>Coming soon</Badge>
                </span>
                <span className={s.viewBlurb}>{v.blurb}</span>
              </Link>
            </li>
          ))}
          <li>
            <ChapterTestsCard />
          </li>
        </ul>
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
    </div>
  );
}
