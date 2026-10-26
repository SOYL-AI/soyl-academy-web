/**
 * Narration audio for a deck: one Ogg Opus blob per slide, content-addressed by voice + narration
 * so re-running the stage only synthesises slides whose narration (or voice) changed.
 */
import { createHash } from 'node:crypto';
import type { Deck } from '@soyl/shared/content/index';
import { assertBlobKey, type BlobStore } from '../blob';
import { oggOpusDurationMs } from './ogg-opus';
import { voiceFor, type SpeechProvider } from './speech';

/** `audio/{unit}/{deckKey}/{slideId}-{first 12 hex of sha256(voice + "\n" + text)}.ogg` */
export function audioKey(unit: string, deckKey: string, slideId: string, text: string, voice: string): string {
  const hash = createHash('sha256').update(`${voice}\n${text}`, 'utf8').digest('hex').slice(0, 12);
  return assertBlobKey(`audio/${unit}/${deckKey}/${slideId}-${hash}.ogg`);
}

export interface SynthesizeDeckOptions {
  unit: string;
  /** Distinguishes decks of one unit, e.g. "deck" or "deck-part2". */
  deckKey: string;
  language: string;
  speech: SpeechProvider;
  blob: BlobStore;
  /** Re-synthesise every slide even when its audio is current. */
  force?: boolean;
  /** Override the language's configured voice. */
  voice?: string;
  log?: (line: string) => void;
}

export type SlideAudioStatus = 'synthesized' | 'skipped' | 'reused';

export interface SynthesizeDeckResult {
  /** A copy of the deck with every slide's `audio` set. */
  deck: Deck;
  synthesized: number;
  /** Slides left as they were plus slides whose blob already existed (`reused`). */
  skipped: number;
  /** Bytes written to the blob store by this run. */
  bytes: number;
  slides: { id: string; key: string; status: SlideAudioStatus; duration_ms: number }[];
}

/**
 * Per slide:
 * - `skipped`: slide.audio.key is the expected key and the blob exists (unless `force`);
 * - `reused`: the deck lost its audio field (e.g. regenerated with identical narration) but the
 *   blob exists and is valid Ogg Opus: its duration is read from the file instead of re-synthesising;
 * - `synthesized`: otherwise — synthesise, store, record { key, duration_ms }.
 *
 * Simulated providers hash a marked voice (`<voice>#simulated`), so mock silence never satisfies a
 * later real run (and vice versa).
 */
export async function synthesizeDeck(deck: Deck, opts: SynthesizeDeckOptions): Promise<SynthesizeDeckResult> {
  const out = structuredClone(deck);
  const voice = opts.voice ?? voiceFor(opts.language).voice;
  const keyVoice = opts.speech.simulated ? `${voice}#simulated` : voice;
  const result: SynthesizeDeckResult = { deck: out, synthesized: 0, skipped: 0, bytes: 0, slides: [] };

  for (const slide of out.slides) {
    const key = audioKey(opts.unit, opts.deckKey, slide.id, slide.narration, keyVoice);
    if (!opts.force) {
      if (slide.audio?.key === key && (await opts.blob.exists(key))) {
        result.skipped++;
        result.slides.push({ id: slide.id, key, status: 'skipped', duration_ms: slide.audio.duration_ms });
        continue;
      }
      const existing = await opts.blob.get(key);
      const duration = existing ? oggOpusDurationMs(existing) : null;
      if (duration !== null && duration > 0) {
        slide.audio = { key, duration_ms: duration };
        result.skipped++;
        result.slides.push({ id: slide.id, key, status: 'reused', duration_ms: duration });
        continue;
      }
    }
    const speech = await opts.speech.synthesize({ text: slide.narration, language: opts.language, voice, slideId: slide.id });
    await opts.blob.put(key, speech.audio, speech.contentType);
    const durationMs = Math.max(1, Math.round(speech.durationMs));
    slide.audio = { key, duration_ms: durationMs };
    result.synthesized++;
    result.bytes += speech.audio.length;
    result.slides.push({ id: slide.id, key, status: 'synthesized', duration_ms: durationMs });
    opts.log?.(`tts ${opts.unit}/${opts.deckKey}/${slide.id}: ${speech.audio.length} B, ${durationMs} ms → ${key}`);
  }
  return result;
}
