/**
 * Stage 8 `tts`: narration audio per slide (Azure AI Speech, en-IN / hi-IN … neural voices; the
 * mock writes valid silent Ogg Opus of the estimated length). Audio goes to the BlobStore at
 * audio/<unit>/<deck>/<slide>-<hash>.ogg (content-addressed: unchanged narration is never
 * re-synthesised) and each slide gets `audio: { key, duration_ms }`.
 *
 *   generated units   deck files in out/<unit>/ are updated in place
 *   --authored        hand-authored chapters and exemplars are not edited (they live in git); the
 *                     audio keys go to out/<unit>/audio.json, which publish merges into the release
 * State: stage "tts", one item per deck.
 */
import path from 'node:path';
import type { Deck } from '@soyl/shared/content/index';
import { findChapter, unitsInScope, type Scope } from '../catalog';
import { readJsonIf, table, writeJson } from '../io';
import { unitOutDir } from '../paths';
import type { Pipeline } from '../pipeline';
import { loadOutUnit, writeOutDeck, type ContentUnit } from '../sources';
import { synthesizeDeck } from '../tts/audio';
import { speechProviderFromEnv, type SpeechProvider } from '../tts/speech';
import { authoredInScope } from './verify';

/** out/<unit>/audio.json: deck key → slide id → audio, plus the narration hash it was made for. */
export type AudioManifest = Record<string, Record<string, { key: string; duration_ms: number }>>;
export interface AudioManifestFile {
  /** True when made by the mock speech provider (silence): publish refuses it without --allow-mock. */
  simulated: boolean;
  decks: AudioManifest;
}

export function audioManifestFile(p: Pipeline, unit: string): string {
  return path.join(unitOutDir(p.paths.outDir, unit), 'audio.json');
}

/** Applies a manifest to decks: a slide gets audio only when the key matches (same narration and voice). */
export function applyAudio(decks: { key: string; deck: Deck }[], manifest: AudioManifest | undefined): { key: string; deck: Deck }[] {
  if (!manifest) return decks;
  return decks.map(({ key, deck }) => ({
    key,
    deck: { ...deck, slides: deck.slides.map((s) => (manifest[key]?.[s.id] && !s.audio ? { ...s, audio: manifest[key]![s.id]! } : s)) },
  }));
}

export interface TtsSummary {
  units: { unit: string; decks: number; synthesized: number; skipped: number; bytes: number; simulated: boolean }[];
  exitCode: number;
}

export async function ttsCommand(p: Pipeline, scope: Scope, opts: { authored?: boolean; force?: boolean; speech?: SpeechProvider } = {}): Promise<TtsSummary> {
  const speech = opts.speech ?? (await speechProviderFromEnv({ provider: p.opts.provider === 'azure' ? 'azure' : 'mock', env: p.env }));
  if (speech.simulated) p.log('speech: mock — silent placeholder audio of the estimated length (never publish as real narration)');
  else p.log(`speech: ${speech.name}`);
  p.log(`blob store: ${p.blob.describe()}`);

  let units: ContentUnit[];
  if (opts.authored) units = authoredInScope(p, scope);
  else units = unitsInScope(p.catalog, scope).flatMap((r) => loadOutUnit(p, r.chapter.id) ?? []);
  if (!units.length) {
    p.log(opts.authored ? 'no hand-authored chapters in scope' : 'no generated units in scope under out/ (run generate first, or use --authored)');
    return { units: [], exitCode: 1 };
  }
  const summary: TtsSummary = { units: [], exitCode: 0 };
  for (const u of units) {
    const language = findChapter(p.catalog, u.unit)?.subject.language ?? u.notes?.language ?? 'en';
    const prev = readJsonIf<AudioManifestFile>(audioManifestFile(p, u.unit));
    const manifest: AudioManifest = prev && prev.simulated === speech.simulated ? prev.decks : {};
    const row = { unit: u.unit, decks: 0, synthesized: 0, skipped: 0, bytes: 0, simulated: speech.simulated };
    for (const { key, deck } of applyAudio(u.decks, opts.authored ? manifest : undefined)) {
      const r = await synthesizeDeck(deck, { unit: u.unit, deckKey: key, language, speech, blob: p.blob, force: opts.force, log: (l) => p.log(`  ${l}`) });
      manifest[key] = Object.fromEntries(r.deck.slides.filter((s) => s.audio).map((s) => [s.id, s.audio!]));
      if (u.origin === 'pipeline') writeOutDeck(p, u.unit, key, r.deck);
      row.decks++;
      row.synthesized += r.synthesized;
      row.skipped += r.skipped;
      row.bytes += r.bytes;
      await p.store.putItem({ unit: u.unit, stage: 'tts', key, status: 'done', attempts: 1, run_id: null, template: null, model: speech.simulated ? 'mock' : speech.name, usage: null, cost_paise: 0, output: path.relative(p.paths.outDir, audioManifestFile(p, u.unit)).split(path.sep).join('/'), error: null, updated_at: new Date().toISOString() });
    }
    writeJson(audioManifestFile(p, u.unit), { simulated: speech.simulated, decks: manifest } satisfies AudioManifestFile);
    summary.units.push(row);
  }
  p.log(table(['unit', 'decks', 'synthesized', 'unchanged', 'bytes'], summary.units.map((r) => [r.unit, r.decks, r.synthesized, r.skipped, r.bytes]), ['l', 'r', 'r', 'r', 'r']));
  return summary;
}
