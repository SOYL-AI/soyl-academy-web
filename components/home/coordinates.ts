/**
 * The coordinate-grid question of the classic simulator (MiniSimulator.tsx): points, labels, and the nudges that
 * say what went wrong without giving the answer. (The homepage ring now asks an authored question per class.)
 */
export type Pt = { x: number; y: number };

/** "−3" with a real minus sign. */
export const fmt = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));
export const label = (p: Pt) => `(${fmt(p.x)}, ${fmt(p.y)})`;
export const samePoint = (a: Pt, b: Pt) => a.x === b.x && a.y === b.y;

/** A nudge about what went wrong — never the answer itself. */
export function feedbackFor(guess: Pt, target: Pt): string {
  if (guess.x === target.y && guess.y === target.x && target.x !== target.y) {
    return 'Looks like x and y swapped places. The first number is always x: across before up.';
  }
  if (guess.x === target.x) {
    return guess.y === -target.y
      ? 'Your x is right. Check the sign of y: positive is above the x-axis, negative is below.'
      : 'Your x is right. Now count the y-steps again, up or down from the x-axis.';
  }
  if (guess.y === target.y) {
    return guess.x === -target.x
      ? 'Your y is right. Check the sign of x: positive is to the right, negative to the left.'
      : 'Your y is right. Count the x-steps again along the horizontal axis.';
  }
  return 'Not yet. Start at the origin (0, 0), move along x first, then up or down for y.';
}

export const hintsFor = (t: Pt) => [
  'Start at the origin, where the two axes cross. That point is (0, 0).',
  `The first number is x. Move ${Math.abs(t.x)} step${Math.abs(t.x) === 1 ? '' : 's'} ${t.x < 0 ? 'left' : 'right'} along the horizontal axis.`,
];
