/**
 * Flashcard session model (pure, unit-tested): order, position, face, "Know it / Still learning" marks, review of
 * the cards still being learnt, shuffle (the caller passes the shuffled order, so the reducer stays pure), and
 * the session summary. Session state only: there is no flashcard-progress API yet (learn-mode handoff, API gaps).
 */
export type Mark = 'known' | 'learning';

export interface DeckState {
  /** Every card id, in the chapter's order. */
  all: string[];
  /** The cards of this round (all, or only the ones still being learnt), possibly shuffled. */
  order: string[];
  pos: number;
  flipped: boolean;
  marks: Record<string, Mark>;
  reviewOnly: boolean;
}

export type DeckAction =
  | { type: 'flip' }
  | { type: 'face'; flipped: boolean }
  | { type: 'move'; to: number }
  | { type: 'mark'; mark: Mark }
  | { type: 'shuffle'; order: string[] }
  | { type: 'review' }
  | { type: 'restart' };

export function initDeck(ids: string[]): DeckState {
  return { all: ids, order: ids, pos: 0, flipped: false, marks: {}, reviewOnly: false };
}

/** The next card after `from` (wrapping) that is not marked yet; else simply the next card. */
export function nextUnmarked(order: string[], from: number, marks: Record<string, Mark>): number {
  for (let k = 1; k <= order.length; k++) {
    const i = (from + k) % order.length;
    if (!marks[order[i]!]) return i;
  }
  return Math.min(from + 1, order.length - 1);
}

export function deckReducer(state: DeckState, action: DeckAction): DeckState {
  const last = Math.max(0, state.order.length - 1);
  switch (action.type) {
    case 'flip':
      return { ...state, flipped: !state.flipped };
    case 'face':
      return state.flipped === action.flipped ? state : { ...state, flipped: action.flipped };
    case 'move': {
      const pos = Math.max(0, Math.min(last, action.to));
      return pos === state.pos && !state.flipped ? state : { ...state, pos, flipped: false };
    }
    case 'mark': {
      const id = state.order[state.pos];
      if (!id) return state;
      const marks = { ...state.marks, [id]: action.mark };
      return { ...state, marks, flipped: false, pos: nextUnmarked(state.order, state.pos, marks) };
    }
    case 'shuffle': {
      // Only a permutation of this round's cards is accepted.
      const same = action.order.length === state.order.length && [...action.order].sort().join('\u0000') === [...state.order].sort().join('\u0000');
      return same ? { ...state, order: action.order, pos: 0, flipped: false } : state;
    }
    case 'review': {
      const ids = state.all.filter((id) => state.marks[id] === 'learning');
      if (!ids.length) return state;
      const marks = Object.fromEntries(Object.entries(state.marks).filter(([id]) => !ids.includes(id)));
      return { ...state, order: ids, marks, reviewOnly: true, pos: 0, flipped: false };
    }
    case 'restart':
      return initDeck(state.all);
    default:
      return state;
  }
}

export interface DeckSummary {
  /** Cards in the chapter. */
  total: number;
  /** Cards in this round. */
  round: number;
  known: number;
  learning: number;
  /** Cards of this round not sorted yet. */
  left: number;
  /** Every card of this round is sorted. */
  done: boolean;
  /** Known share of the whole deck, 0–100. */
  knownPct: number;
}

export function deckSummary(state: DeckState): DeckSummary {
  const marks = Object.values(state.marks);
  const known = marks.filter((m) => m === 'known').length;
  const learning = marks.filter((m) => m === 'learning').length;
  const sorted = state.order.filter((id) => state.marks[id]).length;
  const total = state.all.length;
  return {
    total,
    round: state.order.length,
    known,
    learning,
    left: state.order.length - sorted,
    done: state.order.length > 0 && sorted === state.order.length,
    knownPct: total ? Math.round((known / total) * 100) : 0,
  };
}

/** Keyboard: Space/Enter flip, ← → move, 1 still learning, 2 know it (on the answer side). */
export type DeckKey = { type: 'flip' } | { type: 'prev' } | { type: 'next' } | { type: 'mark'; mark: Mark } | null;

export function deckKey(key: string, flipped: boolean): DeckKey {
  switch (key) {
    case ' ':
    case 'Spacebar':
    case 'Enter':
      return { type: 'flip' };
    case 'ArrowLeft':
      return { type: 'prev' };
    case 'ArrowRight':
      return { type: 'next' };
    case '1':
      return flipped ? { type: 'mark', mark: 'learning' } : null;
    case '2':
      return flipped ? { type: 'mark', mark: 'known' } : null;
    default:
      return null;
  }
}
