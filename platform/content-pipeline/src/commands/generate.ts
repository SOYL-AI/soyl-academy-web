/**
 * Stage 2 (outline) and stage 3 (generate). Generate runs the outline first for units that lack
 * one. Items are written to out/<unit>/items/<key>.json as they finish; when every item of a unit
 * is done, the unit's contract-shaped files are assembled:
 *   out/<unit>/outline.json      ChapterOutline
 *   out/<unit>/deck.p<N>.json    Deck (part null when the chapter is one deck)
 *   out/<unit>/notes.json        Notes
 *   out/<unit>/flashcards.json   FlashcardSet
 *   out/<unit>/questions.json    QuestionBank (deck check questions + practice + case/source)
 * A ChapterRelease is assembled from these at publish (M2).
 */
import fs from 'node:fs';
import path from 'node:path';
import { createLimiter } from '@soyl/ai-core';
import type { ChapterOutline, LessonOutline, Provenance, Question } from '@soyl/shared/content/index';
import { unitsInScope, type ChapterRef, type Scope } from '../catalog';
import { readJsonIf, writeJson } from '../io';
import { unitOutDir } from '../paths';
import { executeBatch, executeItem, finishRun, startRun, type ActiveRun, type BatchEntry, type ItemWriter, type Pipeline } from '../pipeline';
import { chapterOutline, generateItems, outlineItem, unitContext, type ItemSpec, type UnitContext } from '../requests';
import type { DeckGeneration, QuestionList } from '../schemas';

function provenance(spec: ItemSpec, model: string, generatedAt: string): Provenance {
  return { origin: 'pipeline', template_version: spec.templateRef, model, generated_at: generatedAt };
}

export function itemFile(outDir: string, unit: string, key: string): string {
  return path.join(unitOutDir(outDir, unit), 'items', `${key}.json`);
}

function outlineWriter(p: Pipeline, ctx: UnitContext, spec: ItemSpec): ItemWriter {
  return (data, { model, generatedAt }) => {
    const file = path.join(unitOutDir(p.paths.outDir, ctx.unit), 'outline.json');
    const outline: ChapterOutline = { ...chapterOutline(ctx, data as LessonOutline), provenance: provenance(spec, model, generatedAt) };
    writeJson(file, outline);
    return file;
  };
}

function itemWriter(p: Pipeline, ctx: UnitContext, spec: ItemSpec): ItemWriter {
  return (data, { model, generatedAt }) => {
    const prov = provenance(spec, model, generatedAt);
    const withProv = (q: Question) => ({ ...q, provenance: prov });
    let value: unknown;
    if (spec.asset === 'deck') {
      const g = data as DeckGeneration;
      value = { deck: { ...g.deck, provenance: prov }, check_questions: g.check_questions.map(withProv) };
    } else if (spec.asset === 'questions' || spec.asset === 'case-passages') {
      value = { questions: (data as QuestionList).questions.map(withProv) };
    } else {
      value = { ...(data as object), provenance: prov };
    }
    const file = itemFile(p.paths.outDir, ctx.unit, spec.key);
    writeJson(file, value);
    return file;
  };
}

export function readOutline(p: Pipeline, unit: string): ChapterOutline | undefined {
  return readJsonIf<ChapterOutline>(path.join(unitOutDir(p.paths.outDir, unit), 'outline.json'));
}

/** Writes the unit's assembled files once every generate item is done. Returns true if assembled. */
export function assembleUnit(p: Pipeline, ctx: UnitContext, specs: ItemSpec[]): boolean {
  const dir = unitOutDir(p.paths.outDir, ctx.unit);
  const items = new Map(specs.map((s) => [s.key, readJsonIf<Record<string, unknown>>(itemFile(p.paths.outDir, ctx.unit, s.key))]));
  if ([...items.values()].some((v) => v === undefined)) return false;
  for (const f of fs.existsSync(dir) ? fs.readdirSync(dir) : []) if (/^deck\.p\d+\.json$/.test(f)) fs.rmSync(path.join(dir, f));
  const questions: Question[] = [];
  for (const s of specs.filter((x) => x.asset === 'deck')) {
    const g = items.get(s.key) as unknown as DeckGeneration;
    writeJson(path.join(dir, `${s.key}.json`), g.deck);
    questions.push(...g.check_questions);
  }
  writeJson(path.join(dir, 'notes.json'), items.get('notes'));
  writeJson(path.join(dir, 'flashcards.json'), items.get('flashcards'));
  for (const s of specs.filter((x) => x.asset === 'questions' || x.asset === 'case-passages')) questions.push(...(items.get(s.key) as unknown as QuestionList).questions);
  writeJson(path.join(dir, 'questions.json'), { unit: ctx.unit, questions });
  return true;
}

export interface StageSummary {
  runId: string | null;
  status: string;
  units: number;
  assembled: string[];
  exitCode: number;
}

async function runOutlines(p: Pipeline, active: ActiveRun, refs: ChapterRef[]): Promise<void> {
  const contexts = refs.map((r) => unitContext(p.catalog, r));
  const specs = contexts.map((ctx) => ({ ctx, spec: outlineItem(ctx, p.paths) }));
  if (p.opts.batch && active.client.supportsBatch) {
    const entries: BatchEntry[] = specs.map(({ ctx, spec }) => ({ unit: ctx.unit, stage: 'outline', spec, write: outlineWriter(p, ctx, spec) }));
    await executeBatch(p, active, entries);
    return;
  }
  const limit = createLimiter(p.opts.concurrency);
  await Promise.all(specs.map(({ ctx, spec }) => limit(() => executeItem(p, active, ctx.unit, 'outline', spec, outlineWriter(p, ctx, spec)))));
}

export async function outlineCommand(p: Pipeline, scope: Scope): Promise<StageSummary> {
  const refs = unitsInScope(p.catalog, scope);
  if (!refs.length) {
    p.log('no units in scope (does the subject have a syllabus file?)');
    return { runId: null, status: 'empty', units: 0, assembled: [], exitCode: 1 };
  }
  const active = await startRun(p, 'outline', scope);
  await runOutlines(p, active, refs);
  const run = await finishRun(p, active);
  p.log(`run ${run.id}: ${run.status} — ${JSON.stringify(run.counts)} — spend ₹${(run.budget.spent_paise / 100).toFixed(2)}${run.budget.simulated ? ' (simulated)' : ''}`);
  return { runId: run.id, status: run.status, units: refs.length, assembled: [], exitCode: run.status === 'done' ? 0 : run.status === 'paused_budget' ? 3 : 2 };
}

export async function generateCommand(p: Pipeline, scope: Scope): Promise<StageSummary> {
  const refs = unitsInScope(p.catalog, scope);
  if (!refs.length) {
    p.log('no units in scope (does the subject have a syllabus file?)');
    return { runId: null, status: 'empty', units: 0, assembled: [], exitCode: 1 };
  }
  const active = await startRun(p, 'generate', scope);
  await runOutlines(p, active, refs);

  const work: { ctx: UnitContext; specs: ItemSpec[] }[] = [];
  for (const ref of refs) {
    const ctx = unitContext(p.catalog, ref);
    const outline = readOutline(p, ctx.unit);
    if (!outline) {
      p.log(`  ${ctx.unit}: no outline (outline stage did not finish); skipping generate`);
      continue;
    }
    work.push({ ctx, specs: generateItems(ctx, outline, p.paths) });
  }
  for (const w of work) {
    const missing = [...new Set(w.specs.flatMap((s) => s.fewShotMissing))];
    if (missing.length) p.log(`  ${w.ctx.unit}: few-shot example(s) not found yet: ${missing.join(', ')}`);
    const fallbacks = [...new Set(w.specs.filter((s) => s.template.fallback).map((s) => s.templateRef))];
    if (fallbacks.length) p.log(`  ${w.ctx.unit}: using pipeline FALLBACK templates for ${w.ctx.family}: ${fallbacks.join(', ')}`);
  }

  if (p.opts.batch && active.client.supportsBatch) {
    const entries: BatchEntry[] = work.flatMap(({ ctx, specs }) => specs.map((spec) => ({ unit: ctx.unit, stage: 'generate' as const, spec, write: itemWriter(p, ctx, spec) })));
    await executeBatch(p, active, entries);
  } else {
    if (p.opts.batch) p.log(`provider ${active.client.provider.name} has no Batch support; running synchronously`);
    const limit = createLimiter(p.opts.concurrency);
    await Promise.all(work.flatMap(({ ctx, specs }) => specs.map((spec) => limit(() => executeItem(p, active, ctx.unit, 'generate', spec, itemWriter(p, ctx, spec))))));
  }

  const assembled: string[] = [];
  for (const { ctx, specs } of work) if (assembleUnit(p, ctx, specs)) assembled.push(ctx.unit);
  const run = await finishRun(p, active);
  p.log(`assembled ${assembled.length}/${refs.length} unit(s): ${assembled.join(', ') || '—'}`);
  p.log(`run ${run.id}: ${run.status} — ${JSON.stringify(run.counts)} — spend ₹${(run.budget.spent_paise / 100).toFixed(2)}${run.budget.simulated ? ' (simulated)' : ''}`);
  return { runId: run.id, status: run.status, units: refs.length, assembled, exitCode: run.status === 'done' ? 0 : run.status === 'paused_budget' ? 3 : 2 };
}
