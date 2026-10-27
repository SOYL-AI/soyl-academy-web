/** Server loader + metadata shared by the lesson routes. */
import type { Metadata } from 'next';
import type { LessonDeck } from '@/platform/shared/api-client';
import { examLabel } from '../lib/catalog';
import { defaultPart, lessonHref, parsePart } from '../lib/lesson-links';
import { getDeck } from '../server/content';
import { loadChapterRoute, type ChapterParams, type ChapterRoute } from '../server/chapter-route';
import { platformMetadata } from '../server/metadata';

export interface LoadedLesson {
  route: ChapterRoute;
  deck: LessonDeck;
}

/** `rawPart` undefined → the first part; otherwise it must be a part the hub lists. */
export async function loadLesson(params: ChapterParams, rawPart: string | undefined): Promise<LoadedLesson | null> {
  const route = await loadChapterRoute(params);
  if (!route || !route.hub.assets.lesson.available) return null;
  const parts = route.hub.assets.lesson.parts;
  const part = rawPart === undefined ? defaultPart(parts) : parsePart(rawPart, parts);
  if (part === null || part === undefined) return null;
  const deck = await getDeck(route.chapterId, part);
  return deck && deck.slides.length > 0 ? { route, deck } : null;
}

export function lessonMetadata({ route, deck }: LoadedLesson): Metadata {
  const { hub, board, classLevel, base } = route;
  const label = `${examLabel(board, classLevel)} Class ${classLevel} ${hub.subject.name}`;
  return platformMetadata({
    title: `${deck.title}: visual lesson, ${label}`,
    description: `A free visual lesson on ${hub.chapter.title} (${label}, chapter ${hub.chapter.number}) in ${deck.slides.length} short slides${deck.goals.length ? `: ${deck.goals.slice(0, 2).join('; ')}` : ''}.`.slice(0, 300),
    path: lessonHref(base, hub.assets.lesson.parts, deck.part),
  });
}
