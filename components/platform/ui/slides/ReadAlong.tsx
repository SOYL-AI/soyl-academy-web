/**
 * Read-along narration text with listen-mode highlighting. Presentational: the player (M2) owns
 * audio and passes `highlight`; this re-renders cheaply (plain spans, no effects).
 */
import { cx } from '../cx';
import { segmentNarration, sentenceOfWord } from './segment';
import s from './slides.module.css';

export interface NarrationHighlight {
  /** Global word index being spoken (from TTS word boundaries). */
  word?: number | null;
  /** Sentence index being spoken; derived from `word` when omitted. */
  sentence?: number | null;
}

export interface ReadAlongProps {
  text: string;
  highlight?: NarrationHighlight | null;
  lang?: string;
  className?: string;
}

export function ReadAlong({ text, highlight, lang, className }: ReadAlongProps) {
  const sentences = segmentNarration(text);
  const word = highlight?.word ?? null;
  const sentence = highlight?.sentence ?? (word !== null ? sentenceOfWord(sentences, word) : null);
  return (
    <p className={cx(s.readAlong, className)} lang={lang} data-highlight-word={word ?? undefined} data-highlight-sentence={sentence ?? undefined}>
      {sentences.map((sent) => (
        <span key={sent.index} className={cx(s.sentence, sentence === sent.index && s.sentenceActive)} data-sentence={sent.index}>
          {sent.words.map((w, i) => (
            <span key={w.index}>
              <span className={cx(s.word, word === w.index && s.wordActive)} data-word={w.index}>
                {w.text}
              </span>
              {i < sent.words.length - 1 ? ' ' : ''}
            </span>
          ))}{' '}
        </span>
      ))}
    </p>
  );
}
