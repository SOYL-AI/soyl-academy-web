/** Flashcards page body (Server Component): renders every card face once, on the server. */
import type { ChapterFlashcards } from '@/platform/shared/api-client';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Markdown } from '@/components/platform/ui/render/Markdown';
import type { ChapterRoute } from '../server/chapter-route';
import { PageHeader } from '../shell/PageHeader';
import { FlashcardDeck } from './FlashcardDeck';
import { InterestPing } from '../lib/InterestPing';
import shell from '../shell/shell.module.css';
import s from './flashcards.module.css';

export function FlashcardsView({ route, cards }: { route: ChapterRoute; cards: ChapterFlashcards }) {
  const { hub, base, lang, chapterId } = route;
  const hi = lang === 'hi';
  return (
    <div className={shell.page}>
      <PageHeader crumbs={[...route.crumbs, { name: hi ? 'फ़्लैशकार्ड' : 'Flashcards', path: `${base}/flashcards` }]} title={`${hi ? 'फ़्लैशकार्ड' : 'Flashcards'}: ${hub.chapter.title}`} lang={lang}>
        <p className={s.meta}>
          {cards.cards.length} cards
          {cards.reviewStatus === 'beta' && <Badge tone="warning">Beta</Badge>}
        </p>
      </PageHeader>
      <InterestPing name="flashcards_open" />
      <FlashcardDeck
        chapterId={chapterId}
        lang={lang}
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
