/**
 * Narration segmentation for listen-mode highlighting. Deterministic (no Intl.Segmenter: Node and
 * browser ICU builds can disagree, which would break hydration), Devanagari-aware (। ॥ end
 * sentences). The player maps TTS word-boundary offsets (character positions in the narration)
 * to word indices with `wordAtOffset`.
 */

export interface NarrationWord {
  text: string;
  /** Global word index across the whole narration. */
  index: number;
  start: number;
  end: number;
}

export interface NarrationSentence {
  index: number;
  text: string;
  start: number;
  end: number;
  words: NarrationWord[];
}

const SENTENCE_RE = /[^.!?।॥]+(?:[.!?।॥]+["'”’)\]]*|$)\s*/gu;
const WORD_RE = /\S+/gu;

export function segmentNarration(text: string): NarrationSentence[] {
  const sentences: NarrationSentence[] = [];
  let wordIndex = 0;
  for (const m of (text ?? '').matchAll(SENTENCE_RE)) {
    const raw = m[0];
    if (!raw.trim()) continue;
    const start = m.index ?? 0;
    const words: NarrationWord[] = [];
    for (const w of raw.matchAll(WORD_RE)) {
      const ws = start + (w.index ?? 0);
      words.push({ text: w[0], index: wordIndex++, start: ws, end: ws + w[0].length });
    }
    sentences.push({ index: sentences.length, text: raw, start, end: start + raw.length, words });
  }
  return sentences;
}

/** The word containing (or nearest after) a character offset; -1 when out of range. */
export function wordAtOffset(sentences: NarrationSentence[], offset: number): number {
  for (const s of sentences) {
    for (const w of s.words) {
      if (offset < w.end) return w.index;
    }
  }
  return -1;
}

/** The sentence that contains a global word index. */
export function sentenceOfWord(sentences: NarrationSentence[], word: number): number {
  return sentences.find((s) => s.words.some((w) => w.index === word))?.index ?? -1;
}
