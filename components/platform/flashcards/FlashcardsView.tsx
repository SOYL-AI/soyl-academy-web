/**
 * Flashcards page body (Server Component): renders every card face once, on the server, and hands them to the
 * client deck (focus mode). The breadcrumb is not shown (the strip's × goes back to the chapter) but stays in the
 * page as BreadcrumbList data.
 */
import type { ChapterFlashcards } from '@/platform/shared/api-client';
import { StructuredData } from '@/components/seo/StructuredData';
import { breadcrumbNode } from '@/lib/seo/schema';
import { Markdown } from '@/components/platform/ui/render/Markdown';
import type { ChapterRoute } from '../server/chapter-route';
import { FlashcardDeck } from './FlashcardDeck';
import { InterestPing } from '../lib/InterestPing';

export function FlashcardsView({ route, cards }: { route: ChapterRoute; cards: ChapterFlashcards }) {
  const { hub, base, lang, chapterId } = route;
  const hi = lang === 'hi';
  const label = hi ? 'फ़्लैशकार्ड' : 'Flashcards';
  const crumbs = [...route.crumbs, { name: label, path: `${base}/flashcards` }];
  return (
    <div>
      <StructuredData data={{ '@context': 'https://schema.org', ...breadcrumbNode(`${base}/flashcards`, crumbs) }} />
      <InterestPing name="flashcards_open" />
      <FlashcardDeck
        chapterId={chapterId}
        lang={lang}
        title={`${label}: ${hub.chapter.title}`}
        beta={cards.reviewStatus === 'beta'}
        links={{
          hub: base,
          practice: hub.assets.practice.available ? `${base}/practice` : undefined,
          notes: hub.assets.notes.available ? `${base}/notes` : undefined,
        }}
        cards={cards.cards.map((c) => ({
          id: c.id,
          tag: c.tag,
          front: (
            <Markdown lang={lang} headingOffset={3}>
              {c.front_md}
            </Markdown>
          ),
          back: (
            <Markdown lang={lang} headingOffset={3}>
              {c.back_md}
            </Markdown>
          ),
        }))}
      />
    </div>
  );
}
