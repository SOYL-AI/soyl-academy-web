/**
 * Stage 5 `verify` (ARCHITECTURE §8.1): every question of a generated unit gets
 *   1. the deterministic checks in verify/checks.ts (numeric re-solve inside solutions, equation
 *      balance, objective-answer consistency, JS code-output execution), and
 *   2. an independent solve by the verify tier (templates `<family>/verify.v1.md`, batches of 12;
 *      the mock provider stands in until OA-02).
 * A question with a critical/major flag is regenerated (same type, marks, difficulty, competency,
 * topic; same id) and re-verified, up to RETRIES.maxAutoRetries (2) times; after that it is
 * `needs_review` and stays out of the release. Passing questions become `auto_verified`.
 *
 * `--authored`: hand-authored chapters and exemplars get the deterministic checks only (no model,
 * no regeneration, files untouched); the report is printed and written to out/verify/.
 *
 * Output: out/<unit>/verify.json; state stage "verify" (items `q:<id>`, `model.r<round>.b<n>`,
 * `regen.<id>.<round>`), so an interrupted run resumes.
 */
import path from 'node:path';
import type { Question } from '@soyl/shared/content/index';
import { RETRIES } from '../../config/pipeline';
import { findChapter, subjectsInScope, unitsInScope, type Scope } from '../catalog';
import { readJsonIf, table, writeJson } from '../io';
import { unitOutDir } from '../paths';
import { count, executeItem, finishRun, startRun, type ActiveRun, type Pipeline } from '../pipeline';
import { regenerateQuestionItem, unitContext, verifyItem, type UnitContext } from '../requests';
import type { QuestionList, VerifyReport } from '../schemas';
import { loadAuthoredUnits, loadOutUnit, writeOutQuestions, type ContentUnit } from '../sources';
import { deterministicChecks, isBlocking, type Flag } from '../verify/checks';

export const VERIFY_BATCH = 12;

export interface UnitVerifyReport {
  unit: string;
  origin: string;
  at: string;
  questions: number;
  passed: number;
  regenerated: string[];
  needs_review: string[];
  flags: Flag[];
}

export interface VerifySummary {
  reports: UnitVerifyReport[];
  exitCode: number;
}

/** Hand-authored/exemplar units whose chapter is in scope. */
export function authoredInScope(p: Pipeline, scope: Scope): ContentUnit[] {
  const subjects = new Set(subjectsInScope(p.catalog, scope).map((s) => s.id));
  return loadAuthoredUnits(p).filter((u) => {
    const ref = findChapter(p.catalog, u.unit);
    const subject = u.unit.replace(/-ch\d{2}$/, '');
    if (!subjects.has(subject)) return false;
    return scope.chapter === undefined || ref?.chapter.number === scope.chapter;
  });
}

function printReport(p: Pipeline, r: UnitVerifyReport, verbose: boolean) {
  const blocking = r.flags.filter(isBlocking);
  p.log(`${r.needs_review.length || (r.origin !== 'pipeline' && blocking.length) ? 'FLAG' : 'ok  '} ${r.unit} (${r.origin}): ${r.passed}/${r.questions} pass, ${r.regenerated.length} regenerated, ${r.needs_review.length} need review, ${blocking.length} blocking + ${r.flags.length - blocking.length} minor flag(s)`);
  for (const f of r.flags.filter((x) => verbose || isBlocking(x)).slice(0, 30)) p.log(`     ${f.severity.padEnd(8)} [${f.check}] ${f.ref}: ${f.message}`);
}

async function verifyAuthored(p: Pipeline, scope: Scope, verbose: boolean): Promise<VerifySummary> {
  const units = authoredInScope(p, scope);
  if (!units.length) {
    p.log('no hand-authored chapters or exemplars in scope');
    return { reports: [], exitCode: 1 };
  }
  const reports: UnitVerifyReport[] = [];
  for (const u of units) {
    const flags = u.questions.flatMap(deterministicChecks);
    const bad = new Set(flags.filter(isBlocking).map((f) => f.ref.split('/')[0]!));
    const r: UnitVerifyReport = { unit: u.unit, origin: u.origin, at: new Date().toISOString(), questions: u.questions.length, passed: u.questions.length - bad.size, regenerated: [], needs_review: [], flags };
    writeJson(path.join(p.paths.outDir, 'verify', `${u.unit}.json`), r);
    printReport(p, r, verbose);
    reports.push(r);
  }
  const blocking = reports.reduce((n, r) => n + r.flags.filter(isBlocking).length, 0);
  p.log(`verify --authored: ${reports.length} unit(s), ${reports.reduce((n, r) => n + r.questions, 0)} questions, ${blocking} blocking flag(s) (deterministic checks only; files unchanged)`);
  return { reports, exitCode: blocking ? 1 : 0 };
}

/** Model flags from one verify report, mapped to question ids of the batch. */
function modelFlags(report: VerifyReport, ids: Set<string>): Flag[] {
  return report.items
    .map((it) => ({ ...it, qid: [...ids].find((id) => it.ref === id || it.ref.startsWith(`${id}/`) || it.ref.startsWith(`${id}.`)) }))
    .filter((it) => it.qid)
    .map((it) => ({ ref: it.qid!, check: `model.${it.category}`, severity: it.severity, message: `${it.evidence}${it.fix ? ` — fix: ${it.fix}` : ''}`, source: 'model' as const }));
}

/** Runs the independent solve over `questions` in batches; returns model flags (empty on budget pause). */
async function modelPass(p: Pipeline, active: ActiveRun, ctx: UnitContext, questions: Question[], round: number): Promise<Flag[]> {
  const flags: Flag[] = [];
  for (let i = 0; i < questions.length; i += VERIFY_BATCH) {
    const batch = questions.slice(i, i + VERIFY_BATCH);
    const key = `model.r${round}.b${i / VERIFY_BATCH + 1}`;
    const spec = verifyItem(ctx, p.paths, batch, key);
    const file = path.join(unitOutDir(p.paths.outDir, ctx.unit), 'verify', `${key}.json`);
    const status = await executeItem(p, active, ctx.unit, 'verify', spec, (data) => {
      writeJson(file, { questions: batch.map((q) => q.id), report: data });
      return file;
    });
    const saved = readJsonIf<{ questions: string[]; report: VerifyReport }>(file);
    if ((status === 'done' || status === 'skipped') && saved) flags.push(...modelFlags(saved.report, new Set(saved.questions)));
  }
  return flags;
}

export type Regenerate = (q: Question, reasons: string[], round: number) => Promise<Question | null>;

function regenerator(p: Pipeline, active: ActiveRun, ctx: UnitContext): Regenerate {
  return async (q, reasons, round) => {
    const key = `regen.${q.id}.r${round}`;
    const spec = regenerateQuestionItem(ctx, p.paths, q, key, reasons, 'verify');
    const file = path.join(unitOutDir(p.paths.outDir, ctx.unit), 'verify', `${key}.json`);
    const status = await executeItem(p, active, ctx.unit, 'verify', spec, (data, meta) => {
      const fresh = (data as QuestionList).questions[0]!;
      writeJson(file, { ...fresh, id: q.id, version: q.version, status: 'draft', provenance: { origin: 'pipeline', template_version: spec.templateRef, model: meta.model, generated_at: meta.generatedAt } });
      return file;
    });
    return status === 'done' || status === 'skipped' ? (readJsonIf<Question>(file) ?? null) : null;
  };
}

/** Verifies one generated unit in place. */
export async function verifyUnit(p: Pipeline, active: ActiveRun, ctx: UnitContext, unit: ContentUnit, opts: { regenerate?: Regenerate; verbose?: boolean } = {}): Promise<UnitVerifyReport> {
  const regenerate = opts.regenerate ?? regenerator(p, active, ctx);
  const questions = [...unit.questions];
  const index = new Map(questions.map((q, i) => [q.id, i]));
  const allFlags: Flag[] = [];
  const regenerated = new Set<string>();
  const needsReview = new Set<string>();
  const prior = (await p.store.getUnitStage(ctx.unit, 'verify'))?.items ?? {};
  let pending = questions.filter((q) => p.opts.force || prior[`q:${q.id}`]?.status !== 'done' || q.status === 'draft').map((q) => q.id);
  const now = () => new Date().toISOString();
  const mark = async (id: string, status: 'done' | 'needs_review', attempts: number, error: string | null) =>
    p.store.putItem({ unit: ctx.unit, stage: 'verify', key: `q:${id}`, status, attempts, run_id: active.run.id, template: null, model: null, usage: null, cost_paise: 0, output: `${ctx.unit}/verify.json`, error, updated_at: now() });

  for (let round = 0; pending.length; round++) {
    const batch = pending.map((id) => questions[index.get(id)!]!);
    const det = batch.flatMap(deterministicChecks);
    const model = active.paused ? [] : await modelPass(p, active, ctx, batch, round);
    const flags = [...det, ...model];
    allFlags.push(...flags.map((f) => ({ ...f, message: round ? `[round ${round}] ${f.message}` : f.message })));
    const failing = new Map<string, string[]>();
    for (const f of flags.filter(isBlocking)) {
      const id = f.ref.split('/')[0]!;
      failing.set(id, [...(failing.get(id) ?? []), `${f.check}: ${f.message}`]);
    }
    for (const id of pending.filter((x) => !failing.has(x))) {
      const i = index.get(id)!;
      questions[i] = { ...questions[i]!, status: 'auto_verified' };
      await mark(id, 'done', round + 1, null);
    }
    if (active.paused) break;
    const next: string[] = [];
    for (const [id, reasons] of failing) {
      if (round >= RETRIES.maxAutoRetries) {
        needsReview.add(id);
        count(active, 'needs_review');
        const i = index.get(id)!;
        questions[i] = { ...questions[i]!, status: 'needs_review' };
        await mark(id, 'needs_review', round + 1, reasons.join('; ').slice(0, 2000));
        continue;
      }
      const fresh = await regenerate(questions[index.get(id)!]!, reasons, round + 1);
      if (!fresh) {
        if (active.paused) break;
        needsReview.add(id);
        count(active, 'needs_review');
        await mark(id, 'needs_review', round + 1, `regeneration failed; ${reasons.join('; ')}`.slice(0, 2000));
        continue;
      }
      questions[index.get(id)!] = fresh;
      regenerated.add(id);
      next.push(id);
    }
    pending = next;
  }

  writeOutQuestions(p, ctx.unit, questions);
  const report: UnitVerifyReport = {
    unit: ctx.unit,
    origin: 'pipeline',
    at: now(),
    questions: questions.length,
    passed: questions.filter((q) => q.status === 'auto_verified').length,
    regenerated: [...regenerated],
    needs_review: [...needsReview],
    flags: allFlags,
  };
  writeJson(path.join(unitOutDir(p.paths.outDir, ctx.unit), 'verify.json'), report);
  return report;
}

export async function verifyCommand(p: Pipeline, scope: Scope, opts: { authored?: boolean; verbose?: boolean; regenerate?: Regenerate } = {}): Promise<VerifySummary> {
  if (opts.authored) return verifyAuthored(p, scope, !!opts.verbose);
  const refs = unitsInScope(p.catalog, scope);
  const units: { ctx: UnitContext; unit: ContentUnit }[] = [];
  for (const ref of refs) {
    const unit = loadOutUnit(p, ref.chapter.id);
    if (!unit) continue;
    const lint = readJsonIf<{ errors: number }>(path.join(unitOutDir(p.paths.outDir, ref.chapter.id), 'lint.json'));
    if (!lint) {
      p.log(`  ${ref.chapter.id}: not linted yet; run lint first`);
      continue;
    }
    if (lint.errors) {
      p.log(`  ${ref.chapter.id}: lint has ${lint.errors} error(s); fix or regenerate before verify`);
      continue;
    }
    units.push({ ctx: unitContext(p.catalog, ref), unit });
  }
  if (!units.length) {
    p.log('nothing to verify: no lint-clean generated units in scope (run generate and lint first, or use --authored)');
    return { reports: [], exitCode: 1 };
  }
  const active = await startRun(p, 'verify', scope);
  const reports: UnitVerifyReport[] = [];
  for (const { ctx, unit } of units) {
    const r = await verifyUnit(p, active, ctx, unit, opts);
    printReport(p, r, !!opts.verbose);
    reports.push(r);
  }
  const run = await finishRun(p, active);
  if (reports.length > 1)
    p.log(table(['unit', 'questions', 'pass', 'regenerated', 'review'], reports.map((r) => [r.unit, r.questions, r.passed, r.regenerated.length, r.needs_review.length]), ['l', 'r', 'r', 'r', 'r']));
  p.log(`run ${run.id}: ${run.status} — spend ₹${(run.budget.spent_paise / 100).toFixed(2)}${run.budget.simulated ? ' (simulated)' : ''}`);
  const review = reports.reduce((n, r) => n + r.needs_review.length, 0);
  return { reports, exitCode: run.status === 'paused_budget' ? 3 : review ? 2 : 0 };
}
