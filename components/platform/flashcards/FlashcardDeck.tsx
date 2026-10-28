'use client';

/**
 * Flashcard deck in focus mode (learn-mode, 2026-10-29): one card fills the screen between a slim strip (close →
 * chapter, title, "Card 3 of 32", shuffle, options) and a bottom bar. Flip with a tap, Space/Enter or "Show
 * answer" (a quick turn, still under prefers-reduced-motion); ← → move; on the answer side sort the card with
 * "Still learning" (1) or "Know it" (2). When every card of the round is sorted, an end-of-deck screen sums up
 * and offers the cards still being learnt, practice and the chapter. Faces are server-rendered nodes; only the
 * visible face is in the page. Session state only (no flashcard-progress API yet; see deck-model.ts).
 */
import Link from 'next/link';
import { useEffect, useMemo, useReducer, useRef, type CSSProperties, type ReactNode } from 'react';
import { cx } from '@/components/platform/ui/cx';
import { Button } from '@/components/platform/ui/kit/Button';
import { Badge } from '@/components/platform/ui/kit/Display';
import { Icon } from '@/components/platform/ui/kit/Icon';
import { shuffled } from '@/components/platform/ui/question/model';
import { DotsIcon, useFocusTop, useOverflow, usePopover } from '../lesson/focus';
import { isInteractiveTarget } from '../lesson/player-logic';
import { ReportMistake } from '../report/ReportMistake';
import { deckKey, deckReducer, deckSummary, initDeck } from './deck-model';
import f from '../lesson/focus.module.css';
import s from './flashcards.module.css';

export { nextUnmarked } from './deck-model';

export interface DeckCard {
  id: string;
  tag: string;
  front: ReactNode;
  back: ReactNode;
}

export interface DeckLinks {
  hub: string;
  practice?: string;
  notes?: string;
}

export interface FlashcardDeckProps {
  cards: DeckCard[];
  chapterId: string;
  lang?: string;
  /** The page's h1 (one line in the strip). */
  title?: string;
  links?: DeckLinks;
  beta?: boolean;
}

export function FlashcardDeck({ cards, chapterId, lang, title = 'Flashcards', links, beta }: FlashcardDeckProps) {
  const byId = useMemo(() => new Map(cards.map((c) => [c.id, c])), [cards]);
  const [state, dispatch] = useReducer(deckReducer, cards, (cs) => initDeck(cs.map((c) => c.id)));
  const { anchorRef, style: focusStyle } = useFocusTop();
  const faceRef = useRef<HTMLDivElement>(null);
  const { order, pos, flipped, reviewOnly } = state;
  const sum = deckSummary(state);
  const total = order.length;
  const card = byId.get(order[pos] ?? '');
  const overflow = useOverflow(faceRef, `${card?.id}-${flipped}-${sum.done}`);

  const move = (to: number) => dispatch({ type: 'move', to });
  const doShuffle = () => dispatch({ type: 'shuffle', order: shuffled(order) });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || isInteractiveTarget(e.target, e.key) || document.querySelector('dialog[open]')) return;
      if (sum.done) return;
      const k = deckKey(e.key, flipped);
      if (!k) return;
      e.preventDefault();
      if (k.type === 'flip') dispatch({ type: 'flip' });
      else if (k.type === 'prev') move(pos - 1);
      else if (k.type === 'next') move(pos + 1);
      else dispatch({ type: 'mark', mark: k.mark });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  if (!card) return null;
  const nextStep = links?.practice ? { href: links.practice, label: 'Practise this chapter' } : links ? { href: links.hub, label: 'Back to the chapter' } : null;

  return (
    <>
      <div ref={anchorRef} className={f.anchor} aria-hidden="true" />
      <div className={cx(f.focus, s.deck)} style={focusStyle} data-testid="flashcards" data-flipped={flipped || undefined} data-done={sum.done || undefined}>
        <header className={f.strip}>
          <div className={f.stripInner}>
            {links && (
              <Link href={links.hub} className={cx(f.tool, f.close)} aria-label="Close the flashcards, back to the chapter" data-testid="flashcards-close">
                <Icon name="close" size={22} />
              </Link>
            )}
            <div className={f.titleBlock}>
              <h1 className={f.title} lang={lang} title={title}>
                {title}
              </h1>
              <div className={f.sub}>
                <span className={f.count}>
                  Card {pos + 1} of {total}
                  {reviewOnly ? ' (still learning)' : ''}
                </span>
                {beta && (
                  <span className={f.beta} title="Checked automatically; a teacher review is coming.">
                    Beta
                  </span>
                )}
              </div>
            </div>
            <button type="button" className={f.tool} onClick={doShuffle} data-testid="shuffle" disabled={sum.done}>
              <Icon name="shuffle" size={20} />
              <span className={f.toolLabel}>Shuffle</span>
            </button>
            <DeckMenu chapterId={chapterId} cardId={card.id} beta={beta} onRestart={() => dispatch({ type: 'restart' })} />
          </div>
          <div
            className={s.sortBar}
            role="progressbar"
            aria-label="Cards sorted"
            aria-valuemin={0}
            aria-valuemax={sum.round}
            aria-valuenow={sum.round - sum.left}
            aria-valuetext={`${sum.round - sum.left} of ${sum.round} sorted`}
          >
            <span className={s.sortKnown} style={{ width: `${pctOf(order.filter((id) => state.marks[id] === 'known').length, sum.round)}%` }} />
            <span className={s.sortLearning} style={{ width: `${pctOf(order.filter((id) => state.marks[id] === 'learning').length, sum.round)}%` }} />
          </div>
        </header>

        <div className={cx(f.stage, s.stage)}>
          {sum.done ? (
            <section className={s.done} data-testid="flashcards-done" aria-labelledby="flashcards-done-title">
              <div className={s.ring} style={{ '--pct': `${sum.knownPct}%` } as CSSProperties} aria-hidden="true">
                <span>{sum.knownPct}%</span>
              </div>
              <h2 id="flashcards-done-title" className={s.doneTitle}>
                {reviewOnly ? 'Review round done' : 'Deck done!'}
              </h2>
              <p className={s.doneText}>
                You went through {reviewOnly ? 'the cards you were learning' : 'every card'}. You know {sum.known} of {sum.total} card{sum.total === 1 ? '' : 's'}
                {sum.learning > 0 ? `; ${sum.learning} still need${sum.learning === 1 ? 's' : ''} practice.` : '. Excellent!'}
              </p>
              <div className={s.doneLinks}>
                {sum.learning > 0 && (
                  <Button onClick={() => dispatch({ type: 'review' })} icon="rotate">
                    Review {sum.learning} still learning
                  </Button>
                )}
                {links?.notes && (
                  <Link href={links.notes} className={s.secondaryLink}>
                    Read the notes
                  </Link>
                )}
                {links && nextStep?.href !== links.hub && (
                  <Link href={links.hub} className={s.secondaryLink}>
                    Back to the chapter
                  </Link>
                )}
              </div>
            </section>
          ) : (
            <div
              className={cx(s.card, flipped && s.cardBack)}
              onClick={(e) => !(e.target as Element).closest('a, button, input, select, textarea') && dispatch({ type: 'flip' })}
              data-testid="flashcard"
            >
              <div className={s.side}>
                <span className={s.sideLabel}>{flipped ? 'Answer' : 'Question'}</span>
                {card.tag && <Badge>{card.tag}</Badge>}
              </div>
              <div
                key={`${card.id}-${flipped ? 'b' : 'f'}`}
                ref={faceRef}
                className={cx(s.face, flipped ? s.faceBack : s.faceFront)}
                lang={lang}
                aria-live="polite"
                data-face={flipped ? 'back' : 'front'}
                tabIndex={overflow.scrolls ? 0 : undefined}
              >
                <div className={s.faceInner}>{flipped ? card.back : card.front}</div>
              </div>
              {!flipped && (
                <p className={s.tapHint} aria-hidden="true">
                  <span className={s.hintTouch}>Tap the card to see the answer</span>
                  <span className={s.hintKeys}>Click the card or press Space to see the answer</span>
                </p>
              )}
            </div>
          )}
          <p className={s.tally} role="status">
            <span className={s.dotKnown} />
            {sum.known} known · <span className={s.dotLearning} />
            {sum.learning} still learning
          </p>
        </div>

        <nav className={f.bar} aria-label="Cards">
          <div className={cx(f.barInner, s.barNarrow)}>
            {sum.done ? (
              <>
                <Button variant="secondary" icon="rotate" className={f.big} onClick={() => dispatch({ type: 'restart' })}>
                  Start again
                </Button>
                {nextStep && (
                  <Link href={nextStep.href} className={cx(s.primaryLink, f.big, f.grow)} data-testid="flashcards-next-step">
                    {nextStep.label} <Icon name="chevronRight" size={18} />
                  </Link>
                )}
              </>
            ) : (
              <>
                <Button variant="secondary" icon="chevronLeft" className={cx(f.big, s.navButton)} onClick={() => move(pos - 1)} disabled={pos === 0} aria-label="Previous card" />
                {flipped ? (
                  <>
                    <Button variant="secondary" className={cx(f.big, s.sortButton)} onClick={() => dispatch({ type: 'mark', mark: 'learning' })} data-testid="mark-learning">
                      Still learning <kbd className={cx(f.kbd, s.keyHint)}>1</kbd>
                    </Button>
                    <Button icon="check" className={cx(f.big, s.sortButton)} onClick={() => dispatch({ type: 'mark', mark: 'known' })} data-testid="mark-known">
                      Know it <kbd className={cx(f.kbd, s.keyHint)}>2</kbd>
                    </Button>
                  </>
                ) : (
                  <Button className={cx(f.big, f.grow, s.showButton)} onClick={() => dispatch({ type: 'face', flipped: true })} data-testid="show-answer">
                    Show answer
                  </Button>
                )}
                <Button variant="secondary" icon="chevronRight" className={cx(f.big, s.navButton)} onClick={() => move(pos + 1)} disabled={pos === total - 1} aria-label="Next card" />
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}

function pctOf(n: number, of: number): number {
  return of > 0 ? Math.round((n / of) * 1000) / 10 : 0;
}

function DeckMenu({ chapterId, cardId, beta, onRestart }: { chapterId: string; cardId: string; beta?: boolean; onRestart: () => void }) {
  const pop = usePopover();
  return (
    <span className={f.popWrap}>
      <button type="button" className={f.tool} aria-label="Flashcard options" {...pop.buttonProps} data-testid="flashcards-options">
        <DotsIcon />
      </button>
      <div className={f.pop} {...pop.panelProps}>
        <ul className={f.popList}>
          <li>
            <ReportMistake target={{ chapterId, contentType: 'flashcard_set', itemRef: cardId }} what="this flashcard" compact className={cx(f.popItem, s.menuReport)} />
          </li>
          <li>
            <button
              type="button"
              className={f.popItem}
              onClick={() => {
                onRestart();
                pop.close(true);
              }}
            >
              <Icon name="rotate" size={18} /> Start the deck again
            </button>
          </li>
        </ul>
        {beta && (
          <p className={f.popNote}>
            <strong>Beta</strong>: checked automatically; a teacher review is coming.
          </p>
        )}
        <p className={f.popNote}>
          Keys: <kbd className={f.kbd}>Space</kbd> flips, <kbd className={f.kbd}>←</kbd> <kbd className={f.kbd}>→</kbd> move, <kbd className={f.kbd}>1</kbd> still learning,{' '}
          <kbd className={f.kbd}>2</kbd> know it.
        </p>
      </div>
    </span>
  );
}
