/**
 * Deterministic grading helpers for the auto-graded v2 types, shared by the API (grading on
 * submit), the pipeline (verify stage) and the web (instant feedback in practice mode).
 */

/**
 * Normalises program output before comparison: CRLF/CR → LF, trailing spaces and tabs removed
 * from every line, leading and trailing blank lines removed. Spaces inside a line are kept
 * (they are part of the output, e.g. Python's print sep).
 */
export function normaliseCodeOutput(text: string): string {
  const lines = text.replace(/\r\n?/g, '\n').split('\n').map((l) => l.replace(/[ \t]+$/u, ''));
  while (lines.length && lines[0] === '') lines.shift();
  while (lines.length && lines[lines.length - 1] === '') lines.pop();
  return lines.join('\n');
}

/** code-output: full marks when the normalised outputs are identical, otherwise zero. */
export function codeOutputMatches(expected: string, given: string): boolean {
  return normaliseCodeOutput(expected) === normaliseCodeOutput(given);
}

/** ordering: true only when every item is in its correct position. */
export function orderingMatches(expected: readonly string[], given: readonly string[]): boolean {
  return expected.length === given.length && expected.every((id, i) => given[i] === id);
}

/** ordering: how many items are in their correct position (for feedback; board items are all-or-nothing). */
export function orderingPositionsCorrect(expected: readonly string[], given: readonly string[]): number {
  return expected.reduce((n, id, i) => n + (given[i] === id ? 1 : 0), 0);
}
