/**
 * Word n-gram machinery for stage 6. Text is normalised (NFC, lower case, maths/code removed,
 * everything but letters, marks and digits becomes a space) and split into words; shingles are
 * runs of n words. Works for Devanagari and other scripts (\p{L}\p{M}\p{N}).
 */
import { stripMathAndCode } from '../lint/text';

export function words(text: string): string[] {
  return stripMathAndCode(text.normalize('NFC'))
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}]+/gu, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
}

export function shingles(ws: string[], n: number): string[] {
  const out: string[] = [];
  for (let i = 0; i + n <= ws.length; i++) out.push(ws.slice(i, i + n).join(' '));
  return out;
}

/** An index of reference texts: n-gram → source names. */
export class ReferenceIndex {
  readonly grams = new Map<string, Set<string>>();
  readonly sources: string[] = [];
  constructor(readonly n: number) {}

  add(name: string, text: string): void {
    this.sources.push(name);
    for (const g of shingles(words(text), this.n)) {
      let s = this.grams.get(g);
      if (!s) this.grams.set(g, (s = new Set()));
      s.add(name);
    }
  }

  get size(): number {
    return this.grams.size;
  }

  /**
   * Overlap of a text with the references: shared n-gram count, share of the text's n-grams, the
   * longest run of consecutive words covered by shared n-grams, and the sources hit.
   */
  overlap(text: string): { shared: number; ratio: number; longestRun: number; sources: string[]; sample: string } {
    const ws = words(text);
    const grams = shingles(ws, this.n);
    const covered = new Array<boolean>(ws.length).fill(false);
    const sources = new Set<string>();
    let shared = 0;
    grams.forEach((g, i) => {
      const hit = this.grams.get(g);
      if (!hit) return;
      shared++;
      hit.forEach((s) => sources.add(s));
      for (let k = i; k < i + this.n; k++) covered[k] = true;
    });
    let longest = 0;
    let run = 0;
    let bestEnd = -1;
    covered.forEach((c, i) => {
      run = c ? run + 1 : 0;
      if (run > longest) {
        longest = run;
        bestEnd = i;
      }
    });
    const sample = longest ? ws.slice(bestEnd - longest + 1, bestEnd + 1).slice(0, 16).join(' ') : '';
    return { shared, ratio: grams.length ? shared / grams.length : 0, longestRun: longest, sources: [...sources], sample };
  }
}

export interface DupCandidate {
  id: string;
  unit: string;
  text: string;
}

/**
 * Near-duplicate pairs by Jaccard similarity of word n-gram sets, found through an inverted index
 * (only pairs sharing at least one shingle are compared), so it scales to the whole bank.
 */
export function nearDuplicates(items: DupCandidate[], opts: { n: number; threshold: number; minWords: number }): { a: DupCandidate; b: DupCandidate; similarity: number }[] {
  const sets = items.map((it) => {
    const ws = words(it.text);
    return ws.length >= opts.minWords ? new Set(shingles(ws, opts.n)) : new Set<string>();
  });
  const index = new Map<string, number[]>();
  sets.forEach((s, i) => s.forEach((g) => index.set(g, [...(index.get(g) ?? []), i])));
  const shared = new Map<string, number>();
  for (const list of index.values()) {
    if (list.length < 2 || list.length > 200) continue; // very common n-grams say nothing
    for (let x = 0; x < list.length; x++)
      for (let y = x + 1; y < list.length; y++) {
        const key = `${list[x]}|${list[y]}`;
        shared.set(key, (shared.get(key) ?? 0) + 1);
      }
  }
  const out: { a: DupCandidate; b: DupCandidate; similarity: number }[] = [];
  for (const [key, inter] of shared) {
    const [i, j] = key.split('|').map(Number) as [number, number];
    if (items[i]!.id === items[j]!.id) continue;
    const union = sets[i]!.size + sets[j]!.size - inter;
    const sim = union ? inter / union : 0;
    if (sim >= opts.threshold) out.push({ a: items[i]!, b: items[j]!, similarity: sim });
  }
  return out.sort((p, q) => q.similarity - p.similarity);
}
