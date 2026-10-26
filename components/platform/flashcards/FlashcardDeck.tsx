'use client';

/**
 * Flashcard deck: one card at a time; flip with a tap, Enter/Space on the card, or "Show answer"; ←/→ move;
 * shuffle; mark "I knew it" / "Still learning" (local state for this visit); review only the cards still
 * being learnt. Faces are server-rendered nodes; the hidden face is not in the accessibility tree.
 */
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge, ProgressBar } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { shuffled } from '@/components/platform/ui/question/model';
import { isInteractiveTarget } from '../lesson/player-logic';
import { ReportMistake } from '../report/ReportMistake';
import s from './flashcards.module.css';

export interface DeckCard {
  id: string;
  tag: string;
  front: ReactNode;
  back: ReactNode;
}

type Mark = 'known' | 'learning';

export function nextUnmarked(order: string[], from: number, marks: Record<string, Mark>): number {
  for (let k = 1; k <= order.length; k++) {
    const i = (from + k) % order.length;
    if (!marks[order[i]!]) return i;
  }
  return Math.min(from + 1, order.length - 1);
}

export function FlashcardDeck({ cards, chapterId, lang }: { cards: DeckCard[]; chapterId: string; lang?: string }) {
  const byId = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const [order, setOrder] = useState<string[]>(() => cards.map((c) => c.id));
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [marks, setMarks] = useState<Record<string, Mark>>({});
  const [reviewOnly, setReviewOnly] = useState(false);

  const total = order.length;
  const card = byId.get(order[pos] ?? '');
  const known = Object.values(marks).filter((m) => m === 'known').length;
  const learning = Object.values(marks).filter((m) => m === 'learning').length;
  const done = total > 0 && Object.keys(marks).filter((id) => order.includes(id)).length === total;

  const move = (to: number) => {
    setPos(Math.max(0, Math.min(total - 1, to)));
    setFlipped(false);
  };

  const mark = (m: Mark) => {
    if (!card) return;
    const next = { ...marks, [card.id]: m };
    setMarks(next);
    setFlipped(false);
    setPos(nextUnmarked(order, pos, next));
  };

  const doShuffle = () => {
    setOrder((o) => shuffled(o));
    setPos(0);
    setFlipped(false);
  };

  const startReview = () => {
    const ids = cards.map((c) => c.id).filter((id) => marks[id] === 'learning');
    if (!ids.length) return;
    setOrder(ids);
    setMarks(Object.fromEntries(Object.entries(marks).filter(([id]) => !ids.includes(id))));
    setReviewOnly(true);
    setPos(0);
    setFlipped(false);
  };

  const restart = () => {
    setOrder(cards.map((c) => c.id));
    setMarks({});
    setReviewOnly(false);
    setPos(0);
    setFlipped(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || isInteractiveTarget(e.target) || document.querySelector('dialog[open]')) return;
      if (e.key === 'ArrowRight') move(pos + 1);
      else if (e.key === 'ArrowLeft') move(pos - 1);
      else if (e.key === ' ' || e.key === 'Enter') setFlipped((f) => !f);
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!card) return null;

  return (
    <div className={s.deck} data-testid="flashcards" data-flipped={flipped || undefined}>
      <div className={s.toolbar}>
        <span className={s.count}>
          Card {pos + 1} of {total}
          {reviewOnly ? ' (still learning)' : ''}
        </span>
        <Button variant="ghost" size="sm" icon="shuffle" onClick={doShuffle} data-testid="shuffle">
          Shuffle
        </Button>
      </div>
      <ProgressBar value={known} max={cards.length} label="Cards you know" valueText={`${known} of ${cards.length} known`} thin />

      {/* Tapping the card flips it; keyboard users have the buttons below and Space/Enter. */}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions -- pointer shortcut; keyboard paths exist */}
      <div className={cx(s.card, flipped && s.cardFlipped)} onClick={(e) => !(e.target as Element).closest('a, button') && setFlipped((f) => !f)} data-testid="flashcard">
        <div className={s.side}>
          <span className={s.sideLabel}>{flipped ? 'Answer' : 'Question'}</span>
          {card.tag && <Badge>{card.tag}</Badge>}
        </div>
        <div className={s.face} lang={lang} aria-live="polite" data-face={flipped ? 'back' : 'front'}>
          {flipped ? card.back : card.front}
        </div>
      </div>

      <div className={s.actions}>
        {flipped ? (
          <>
            <Button variant="secondary" onClick={() => mark('learning')} data-testid="mark-learning">
              Still learning
            </Button>
            <Button icon="check" onClick={() => mark('known')} data-testid="mark-known">
              I knew it
            </Button>
          </>
        ) : (
          <Button onClick={() => setFlipped(true)} data-testid="show-answer">
            Show answer
          </Button>
        )}
        {flipped && (
          <Button variant="ghost" size="sm" onClick={() => setFlipped(false)}>
            Show question
          </Button>
        )}
      </div>
      <nav className={s.nav} aria-label="Cards">
        <Button variant="ghost" size="sm" icon="chevronLeft" onClick={() => move(pos - 1)} disabled={pos === 0}>
          Previous
        </Button>
        <ReportMistake target={{ chapterId, contentType: 'flashcard_set', itemRef: card.id }} what="this flashcard" compact />
        <Button variant="ghost" size="sm" onClick={() => move(pos + 1)} disabled={pos === total - 1}>
          Next <Icon name="chevronRight" size={18} />
        </Button>
      </nav>

      <p className={s.tally} role="status">
        {known} known · {learning} still learning
      </p>
      {done && (
        <div className={s.done} data-testid="flashcards-done">
          <p>
            <Icon name="check" size={18} /> You went through {reviewOnly ? 'the cards you were learning' : 'every card'}.
          </p>
          <div className={s.actions}>
            {learning > 0 && <Button onClick={startReview}>Review {learning} still learning</Button>}
            <Button variant="secondary" icon="rotate" onClick={restart}>
              Start again
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
