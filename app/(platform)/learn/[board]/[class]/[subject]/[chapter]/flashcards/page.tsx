/**
 * Flashcards (ARCHITECTURE §3.1). Card faces are rendered on the server (Markdown/KaTeX cost no client
 * JS); the client deck only flips, shuffles and keeps "known / still learning" in local state.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { platformMetadata } from '@/components/platform/server/metadata';
import { getFlashcards } from '@/components/platform/server/content';
import { loadChapterRoute, type ChapterParams } from '@/components/platform/server/chapter-route';
import { examLabel } from '@/components/platform/lib/catalog';
import { FlashcardsView } from '@/components/platform/flashcards/FlashcardsView';

export const revalidate = 600;

export function generateStaticParams() {
  return [];
}

async function load(params: Promise<ChapterParams>) {
  const route = await loadChapterRoute(params);
  if (!route || !route.hub.assets.flashcards.available) return null;
  const cards = await getFlashcards(route.chapterId);
  return cards && cards.cards.length > 0 ? { route, cards } : null;
}

export async function generateMetadata({ params }: { params: Promise<ChapterParams> }): Promise<Metadata> {
  if (!platformOn()) return {};
  const loaded = await load(params);
  if (!loaded) return {};
  const { hub, board, classLevel, base } = loaded.route;
  const label = `${examLabel(board, classLevel)} Class ${classLevel} ${hub.subject.name}`;
  return platformMetadata({
    title: `${hub.chapter.titleEn ?? hub.chapter.title} flashcards: ${label}`,
    description: `${loaded.cards.cards.length} free flashcards for ${label} chapter ${hub.chapter.number}, ${hub.chapter.title}: key terms, facts and formulas for quick recall.`,
    path: `${base}/flashcards`,
  });
}

export default async function FlashcardsPage({ params }: { params: Promise<ChapterParams> }) {
  requirePlatform();
  const loaded = await load(params);
  if (!loaded) notFound();
  return <FlashcardsView route={loaded.route} cards={loaded.cards} />;
}
