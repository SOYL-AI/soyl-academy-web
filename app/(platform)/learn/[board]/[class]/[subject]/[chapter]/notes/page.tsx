/**
 * Chapter notes (ARCHITECTURE §3.1: public, ISR, SEO-indexable). Server-rendered (Markdown, KaTeX and
 * diagrams cost no client JS) with LearningResource structured data. Only "Report a mistake" is client.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getNotes } from '@/components/platform/server/content';
import { loadChapterRoute, type ChapterParams } from '@/components/platform/server/chapter-route';
import { examLabel } from '@/components/platform/lib/catalog';
import { NotesView } from '@/components/platform/notes/NotesView';

export const revalidate = 600;

export function generateStaticParams() {
  return [];
}

async function load(params: Promise<ChapterParams>) {
  const route = await loadChapterRoute(params);
  if (!route || !route.hub.assets.notes.available) return null;
  const notes = await getNotes(route.chapterId);
  return notes && notes.sections.length > 0 ? { route, notes } : null;
}

export async function generateMetadata({ params }: { params: Promise<ChapterParams> }): Promise<Metadata> {
  if (!platformOn()) return {};
  const loaded = await load(params);
  if (!loaded) return {};
  const { route, notes } = loaded;
  const { hub, board, classLevel } = route;
  const label = `${examLabel(board, classLevel)} Class ${classLevel} ${hub.subject.name}`;
  return platformMetadata({
    title: `${hub.chapter.titleEn ?? hub.chapter.title} notes: ${label}`,
    description: `Free revision notes for ${label} chapter ${hub.chapter.number}, ${hub.chapter.title}: ${notes.sections
      .slice(0, 4)
      .map((s) => s.heading.replace(/^\d+\.\s*/, ''))
      .join(', ')}, key terms, formulas and exam tips.`.slice(0, 300),
    path: `${route.base}/notes`,
  });
}

export default async function NotesPage({ params }: { params: Promise<ChapterParams> }) {
  requirePlatform();
  const loaded = await load(params);
  if (!loaded) notFound();
  return <NotesView route={loaded.route} notes={loaded.notes} />;
}
