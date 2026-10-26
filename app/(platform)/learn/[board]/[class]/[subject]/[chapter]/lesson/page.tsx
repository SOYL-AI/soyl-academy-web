/**
 * Slide player, first part (ARCHITECTURE §3.1: ISR shell + client player). Other parts are
 * `lesson?part=N`, which the proxy rewrites to `lesson/[part]` (ADR-013) so each part is its own ISR page.
 */
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { platformOn, requirePlatform } from '@/components/platform/server/gate';
import { lessonMetadata, loadLesson } from '@/components/platform/lesson/load';
import { LessonView } from '@/components/platform/lesson/LessonView';
import type { ChapterParams } from '@/components/platform/server/chapter-route';

export const revalidate = 600;

export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<ChapterParams> }): Promise<Metadata> {
  if (!platformOn()) return {};
  const loaded = await loadLesson(await params, undefined);
  return loaded ? lessonMetadata(loaded) : {};
}

export default async function LessonPage({ params }: { params: Promise<ChapterParams> }) {
  requirePlatform();
  const loaded = await loadLesson(await params, undefined);
  if (!loaded) notFound();
  return <LessonView route={loaded.route} deck={loaded.deck} />;
}
