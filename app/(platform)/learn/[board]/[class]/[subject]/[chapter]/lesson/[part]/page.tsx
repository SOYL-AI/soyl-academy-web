/**
 * Slide player for one deck part. Reached through `lesson?part=N` (proxy rewrite, ADR-017); the
 * canonical URL is the `?part=` form.
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

type Params = ChapterParams & { part: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  if (!platformOn()) return {};
  const p = await params;
  const loaded = await loadLesson(p, p.part);
  return loaded ? lessonMetadata(loaded) : {};
}

export default async function LessonPartPage({ params }: { params: Promise<Params> }) {
  requirePlatform();
  const p = await params;
  const loaded = await loadLesson(p, p.part);
  if (!loaded) notFound();
  return <LessonView route={loaded.route} deck={loaded.deck} />;
}
