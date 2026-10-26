/**
 * Placeholder for the chapter views (lesson, notes, flashcards, practice) until M2 adds
 * `lesson/page.tsx` etc. next to this file (a static segment wins over this dynamic one, so they coexist).
 * Not indexed. Any other view name is a 404.
 */
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { EmptyState } from '@/components/platform/ui/kit/Display';
import { requirePlatform } from '@/components/platform/server/gate';
import { CHAPTER_VIEWS, parseBoard, parseChapterSlug, parseChapterView, parseClass, subjectIdFor } from '@/components/platform/lib/catalog';
import shell from '@/components/platform/shell/shell.module.css';

export const dynamicParams = true;

export function generateStaticParams() {
  return [];
}

interface Params {
  board: string;
  class: string;
  subject: string;
  chapter: string;
  view: string;
}

export const metadata: Metadata = { title: 'Coming soon', robots: { index: false, follow: true } };

export default async function ChapterViewPlaceholder({ params }: { params: Promise<Params> }) {
  requirePlatform();
  const p = await params;
  const board = parseBoard(p.board);
  const classLevel = parseClass(p.class);
  const view = parseChapterView(p.view);
  if (!board || !classLevel || !view || !parseChapterSlug(p.chapter) || !subjectIdFor(board, classLevel, p.subject)) notFound();
  const title = CHAPTER_VIEWS.find((v) => v.slug === view)!.title;
  const hub = `/learn/${board}/${classLevel}/${p.subject}/${p.chapter}`;
  return (
    <div className={shell.page}>
      <h1 className="p-visually-hidden">{title}</h1>
      <EmptyState
        title={`${title}: coming soon`}
        headingLevel="h2"
        action={
          <Link href={hub} className={shell.crumbLink}>
            Back to the chapter
          </Link>
        }
      >
        We are preparing this chapter&apos;s {title.toLowerCase()}. It will appear here soon, free as always.
      </EmptyState>
    </div>
  );
}
