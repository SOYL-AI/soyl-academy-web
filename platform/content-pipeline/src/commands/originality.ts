/**
 * Stage 6 `originality` (ARCHITECTURE §8.1, CONTEXT §8 "never reproduce textbooks or past papers"):
 *
 *   1. Reference overlap: word 6-gram overlap of every student-facing field with the owner-supplied
 *      reference texts in platform/catalog/sources/reference/ (*.txt, *.md; gitignored). With no
 *      reference texts the check is a no-op and says so.
 *   2. Bank duplicates: exact and near-duplicate questions (Jaccard of word 5-grams ≥ 0.7 over stem +
 *      passage) across every chapter we hold — generated, hand-authored and exemplars.
 *   3. Literature rule: in literature chapters, quoted spans over 25 words or verse-like runs
 *      (checkLiterature, the same rule as lint) are errors.
 *
 * Generated questions that fail are regenerated (same slot, same id) up to 2 times, then
 * `needs_review`; flagged deck/notes/flashcards items are marked needs_review in the state store
 * (regenerate with `generate --force`). Hand-authored content (`--authored`) is reported only.
 * Reports: out/<unit>/originality.json and out/originality/report.json.
 */
import fs from 'node:fs';
import path from 'node:path';
import type { Question } from '@soyl/shared/content/index';
import { isLiteratureChapter } from '../../config/families';
import { ORIGINALITY, RETRIES } from '../../config/pipeline';
import { findChapter, unitsInScope, type Scope } from '../catalog';
import { writeJson } from '../io';
import { checkLiterature } from '../lint/text';
import { unitOutDir } from '../paths';
import { count, executeItem, finishRun, startRun, type ActiveRun, type Pipeline } from '../pipeline';
import { regenerateQuestionItem, unitContext } from '../requests';
import type { QuestionList } from '../schemas';
import { loadAuthoredUnits, loadOutUnit, outUnits, writeOutQuestions, type ContentUnit } from '../sources';
import { ReferenceIndex, nearDuplicates, words, type DupCandidate } from '../originality/ngrams';
import { authoredInScope } from './verify';

export interface OriginalityFlag {
  unit: string;
  item: string;
  /** Question id, or deck key / slide id / notes section. */
  ref: string;
  check: 'reference.overlap' | 'bank.duplicate' | 'literature.quote' | 'literature.verse';
  severity: 'error' | 'warning';
  message: string;
}

interface Field {
  item: string;
  ref: string;
  questionId: string | null;
  /** The separate fields (the literature verse rule runs per field, never across joined fields). */
  parts: string[];
}

/** Student-facing text fields of a unit. */
export function unitFields(u: ContentUnit): Field[] {
  const out: Field[] = [];
  for (const { key, deck } of u.decks)
    for (const s of deck.slides) out.push({ item: key, ref: `${key}/${s.id}`, questionId: null, parts: [s.heading, s.body_md, ...s.bullets, ...(s.columns ?? []), s.narration] });
  u.notes?.sections.forEach((s, i) => out.push({ item: 'notes', ref: `notes/${i + 1}`, questionId: null, parts: [s.heading, s.body_md, ...s.key_terms.map((k) => `${k.term}: ${k.definition_md}`)] }));
  if (u.notes?.exam_tips_md) out.push({ item: 'notes', ref: 'notes/exam_tips', questionId: null, parts: [u.notes.exam_tips_md] });
  u.flashcards?.cards.forEach((c) => out.push({ item: 'flashcards', ref: `flashcards/${c.id}`, questionId: null, parts: [c.front_md, c.back_md] }));
  for (const q of u.questions) {
    const parts = [q.passage_md ?? '', q.stem_md, ...q.options.map((o) => o.text_md), q.solution_md, 'model_answer_md' in q.answer ? q.answer.model_answer_md : ''];
    for (const c of q.children) parts.push(c.stem_md, ...c.options.map((o) => o.text_md), c.solution_md, 'model_answer_md' in c.answer ? c.answer.model_answer_md : '');
    out.push({ item: 'questions', ref: q.id, questionId: q.id, parts: parts.filter(Boolean) });
  }
  return out;
}

function listFiles(dir: string, exts: readonly string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) return listFiles(f, exts);
    return exts.includes(path.extname(e.name).toLowerCase()) ? [f] : [];
  });
}

export function loadReferenceIndex(dir: string): ReferenceIndex {
  const index = new ReferenceIndex(ORIGINALITY.n);
  for (const f of listFiles(dir, ORIGINALITY.referenceExtensions)) index.add(path.relative(dir, f).split(path.sep).join('/'), fs.readFileSync(f, 'utf8'));
  return index;
}

/** All checks over a set of units; `bank` is every unit we hold (for duplicate detection). */
export function originalityFlags(p: Pipeline, units: ContentUnit[], bank: ContentUnit[], refs: ReferenceIndex): OriginalityFlag[] {
  const flags: OriginalityFlag[] = [];
  const inScope = new Set(units.map((u) => u.unit));
  for (const u of units) {
    const ref = findChapter(p.catalog, u.unit);
    const literature = ref ? isLiteratureChapter(ref.subject, ref.chapter) : /literature/.test(u.family);
    for (const f of unitFields(u)) {
      if (refs.size) {
        const o = refs.overlap(f.parts.join(' \n'));
        const maxRun = literature ? ORIGINALITY.literatureMaxRunWords : ORIGINALITY.maxRunWords;
        if (o.longestRun >= maxRun || o.ratio >= ORIGINALITY.maxRatio)
          flags.push({ unit: u.unit, item: f.item, ref: f.ref, check: 'reference.overlap', severity: 'error', message: `shares ${o.longestRun} consecutive words (${Math.round(o.ratio * 100)}% of its ${ORIGINALITY.n}-grams) with ${o.sources.slice(0, 3).join(', ')}: "${o.sample}…"` });
      }
      if (literature)
        for (const i of f.parts.flatMap((part) => checkLiterature(part)).filter((x) => x.severity === 'error'))
          flags.push({ unit: u.unit, item: f.item, ref: f.ref, check: i.rule as OriginalityFlag['check'], severity: 'error', message: i.message });
    }
  }
  // Bank duplicates: compare in-scope questions with every question we hold.
  const candidates: DupCandidate[] = bank.flatMap((u) => u.questions.map((q) => ({ id: q.id, unit: u.unit, text: `${q.passage_md ?? ''}\n${q.stem_md}` })));
  const seen = new Set<string>();
  const report = (a: DupCandidate, b: DupCandidate, message: string) => {
    for (const [x, y] of [[a, b], [b, a]] as const) {
      if (!inScope.has(x.unit) || seen.has(`${x.id}|${y.id}`)) continue;
      seen.add(`${x.id}|${y.id}`);
      flags.push({ unit: x.unit, item: 'questions', ref: x.id, check: 'bank.duplicate', severity: 'error', message: `${message} ${y.id} (${y.unit})` });
    }
  };
  const exact = new Map<string, DupCandidate>();
  for (const c of candidates) {
    const key = words(c.text).join(' ');
    if (key.split(' ').length < 6) continue;
    const prev = exact.get(key);
    if (prev && prev.id !== c.id) report(c, prev, 'same stem as');
    else exact.set(key, c);
  }
  for (const d of nearDuplicates(candidates, ORIGINALITY.duplicate)) report(d.a, d.b, `${Math.round(d.similarity * 100)}% similar to`);
  return flags;
}

function printFlags(p: Pipeline, unit: string, origin: string, flags: OriginalityFlag[], verbose: boolean) {
  const errors = flags.filter((f) => f.severity === 'error');
  p.log(`${errors.length ? 'FLAG' : 'ok  '} ${unit} (${origin}): ${errors.length} error(s), ${flags.length - errors.length} warning(s)`);
  for (const f of flags.filter((x) => verbose || x.severity === 'error').slice(0, 20)) p.log(`     [${f.check}] ${f.ref}: ${f.message}`);
}

export interface OriginalitySummary {
  flags: OriginalityFlag[];
  referenceTexts: number;
  exitCode: number;
}

export async function originalityCommand(p: Pipeline, scope: Scope, opts: { authored?: boolean; verbose?: boolean } = {}): Promise<OriginalitySummary> {
  const refs = loadReferenceIndex(p.paths.referenceDir);
  if (!refs.sources.length)
    p.log(`notice: no reference texts in ${path.relative(process.cwd(), p.paths.referenceDir) || p.paths.referenceDir} (owner-supplied, gitignored) — reference-overlap check skipped; bank duplicates and the literature rule still run`);
  else p.log(`reference texts: ${refs.sources.length} file(s), ${refs.size.toLocaleString('en-IN')} distinct ${ORIGINALITY.n}-grams`);

  const authored = loadAuthoredUnits(p);
  const generated = outUnits(p).flatMap((u) => loadOutUnit(p, u) ?? []);
  const bank = [...authored, ...generated.filter((g) => !authored.some((a) => a.unit === g.unit))];

  if (opts.authored) {
    const units = authoredInScope(p, scope);
    const flags = originalityFlags(p, units, bank, refs);
    for (const u of units) printFlags(p, u.unit, u.origin, flags.filter((f) => f.unit === u.unit), !!opts.verbose);
    writeJson(path.join(p.paths.outDir, 'originality', 'authored.json'), { at: new Date().toISOString(), reference_texts: refs.sources.length, flags });
    const errors = flags.filter((f) => f.severity === 'error').length;
    p.log(`originality --authored: ${units.length} unit(s), ${errors} error(s) (report only; files unchanged)`);
    return { flags, referenceTexts: refs.sources.length, exitCode: errors ? 1 : 0 };
  }

  const refsInScope = unitsInScope(p.catalog, scope).filter((r) => generated.some((g) => g.unit === r.chapter.id));
  if (!refsInScope.length) {
    p.log('nothing to check: no generated units in scope under out/ (or use --authored)');
    return { flags: [], referenceTexts: refs.sources.length, exitCode: 1 };
  }
  const active = await startRun(p, 'originality', scope);
  const all: OriginalityFlag[] = [];
  for (const ref of refsInScope) {
    let unit = generated.find((g) => g.unit === ref.chapter.id)!;
    const ctx = unitContext(p.catalog, ref);
    let flags = originalityFlags(p, [unit], bank, refs);
    for (let round = 1; round <= RETRIES.maxAutoRetries && !active.paused; round++) {
      const bad = new Map<string, string[]>();
      for (const f of flags.filter((x) => x.severity === 'error' && x.item === 'questions')) bad.set(f.ref, [...(bad.get(f.ref) ?? []), `${f.check}: ${f.message}`]);
      if (!bad.size) break;
      const questions = [...unit.questions];
      for (const [id, reasons] of bad) {
        const i = questions.findIndex((q) => q.id === id);
        if (i < 0) continue;
        const q = questions[i]!;
        const key = `regen.${id}.r${round}`;
        const spec = regenerateQuestionItem(ctx, p.paths, q, key, reasons, 'originality');
        let fresh: Question | null = null;
        await executeItem(p, active, ctx.unit, 'originality', spec, (data, meta) => {
          const file = path.join(unitOutDir(p.paths.outDir, ctx.unit), 'originality', `${key}.json`);
          fresh = { ...(data as QuestionList).questions[0]!, id: q.id, version: q.version, status: 'draft', provenance: { origin: 'pipeline', template_version: spec.templateRef, model: meta.model, generated_at: meta.generatedAt } };
          writeJson(file, fresh);
          return file;
        });
        if (fresh) questions[i] = fresh;
      }
      writeOutQuestions(p, ctx.unit, questions);
      unit = { ...unit, questions };
      const idx = bank.findIndex((b) => b.unit === unit.unit);
      if (idx >= 0) bank[idx] = unit;
      flags = originalityFlags(p, [unit], bank, refs);
    }
    // Whatever still fails: questions → needs_review (out of the release); other items → needs_review in state.
    const failing = flags.filter((f) => f.severity === 'error');
    if (failing.some((f) => f.item === 'questions')) {
      const ids = new Set(failing.filter((f) => f.item === 'questions').map((f) => f.ref));
      writeOutQuestions(p, ctx.unit, unit.questions.map((q) => (ids.has(q.id) ? { ...q, status: 'needs_review' } : q)));
    }
    const now = new Date().toISOString();
    for (const item of new Set(['report', ...failing.map((f) => f.item)])) {
      const mine = failing.filter((f) => item === 'report' || f.item === item);
      const status = mine.length ? 'needs_review' : 'done';
      if (status === 'needs_review') count(active, 'needs_review');
      await p.store.putItem({ unit: ctx.unit, stage: 'originality', key: item, status, attempts: 1, run_id: active.run.id, template: null, model: null, usage: null, cost_paise: 0, output: `${ctx.unit}/originality.json`, error: mine.length ? `${mine.length} originality error(s)` : null, updated_at: now });
    }
    writeJson(path.join(unitOutDir(p.paths.outDir, ctx.unit), 'originality.json'), { unit: ctx.unit, at: now, reference_texts: refs.sources.length, flags });
    printFlags(p, ctx.unit, 'pipeline', flags, !!opts.verbose);
    all.push(...flags);
  }
  writeJson(path.join(p.paths.outDir, 'originality', 'report.json'), { at: new Date().toISOString(), reference_texts: refs.sources.length, flags: all });
  const run = await finishRun(p, active);
  const errors = all.filter((f) => f.severity === 'error').length;
  p.log(`run ${run.id}: ${run.status} — ${errors} unresolved error(s)`);
  return { flags: all, referenceTexts: refs.sources.length, exitCode: run.status === 'paused_budget' ? 3 : errors ? 2 : 0 };
}
