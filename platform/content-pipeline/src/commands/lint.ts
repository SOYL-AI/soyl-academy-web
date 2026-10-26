/**
 * Stage 4 (lint & render checks) over generated units in out/, or over hand-authored exemplars
 * in platform/content-templates/exemplars/ (--exemplars). Deterministic and free, so it always
 * re-runs; results go to out/<unit>/lint.json and the state store (stage "lint").
 */
import fs from 'node:fs';
import path from 'node:path';
import { ChapterRelease } from '@soyl/shared/content/index';
import { familyForChapter, isLiteratureChapter, type Family, FAMILIES } from '../../config/families';
import { findChapter, unitsInScope, type ChapterRef, type Scope } from '../catalog';
import { lintBundle, type LintContext, type LintReport, type UnitBundle } from '../lint/index';
import { readJsonIf, table, writeJson } from '../io';
import { unitOutDir } from '../paths';
import type { Pipeline } from '../pipeline';

export function lintContextFor(ref: ChapterRef, requirePipelineProvenance: boolean): LintContext {
  return {
    unit: ref.chapter.id,
    family: familyForChapter(ref.subject, ref.chapter),
    classLevel: ref.subject.class,
    language: ref.subject.language,
    script: ref.subject.script,
    literature: isLiteratureChapter(ref.subject, ref.chapter),
    topicIds: new Set(ref.chapter.topics.map((t) => t.id)),
    requirePipelineProvenance,
  };
}

/** Reads a unit's assembled files from out/. Missing files become findings. */
export function readUnitBundle(dir: string): { bundle: UnitBundle; missing: string[] } {
  const missing: string[] = [];
  const read = (name: string) => {
    const v = readJsonIf(path.join(dir, name));
    if (v === undefined) missing.push(name);
    return v;
  };
  const decks = (fs.existsSync(dir) ? fs.readdirSync(dir) : [])
    .filter((f) => /^deck\.p\d+\.json$/.test(f))
    .sort((a, b) => Number(/\d+/.exec(a)![0]) - Number(/\d+/.exec(b)![0]))
    .map((f) => ({ key: f.replace(/\.json$/, ''), data: readJsonIf(path.join(dir, f)) }));
  if (!decks.length) missing.push('deck.p1.json');
  return { bundle: { outline: read('outline.json'), decks, notes: read('notes.json'), flashcards: read('flashcards.json'), questions: read('questions.json') }, missing };
}

export function releaseBundle(release: unknown): UnitBundle {
  const parsed = ChapterRelease.safeParse(release);
  const r = (parsed.success ? parsed.data : release) as { decks?: { part?: number | null }[]; notes?: unknown; flashcards?: unknown; questions?: unknown };
  return {
    decks: (r.decks ?? []).map((d, i) => ({ key: `deck.p${d.part ?? i + 1}`, data: d })),
    notes: r.notes,
    flashcards: r.flashcards,
    questions: r.questions,
  };
}

function printReport(p: Pipeline, report: LintReport, verbose: boolean) {
  const status = report.errors ? 'FAIL' : 'ok';
  p.log(`${status.padEnd(4)} ${report.unit}: ${report.errors} error(s), ${report.warnings} warning(s)`);
  const shown = report.findings.filter((f) => verbose || f.severity === 'error');
  const byRule = new Map<string, number>();
  for (const f of report.findings.filter((x) => x.severity === 'warning')) byRule.set(f.rule, (byRule.get(f.rule) ?? 0) + 1);
  for (const f of shown.slice(0, 40)) p.log(`     ${f.severity === 'error' ? 'E' : 'W'} [${f.rule}] ${f.item} ${f.path}: ${f.message}`);
  if (shown.length > 40) p.log(`     … ${shown.length - 40} more (see lint.json)`);
  if (!verbose && byRule.size) p.log(`     warnings: ${[...byRule.entries()].map(([r, n]) => `${r} ×${n}`).join(', ')}`);
}

export interface LintSummary {
  reports: LintReport[];
  exitCode: number;
}

export async function lintCommand(p: Pipeline, scope: Scope, opts: { verbose?: boolean } = {}): Promise<LintSummary> {
  const refs = unitsInScope(p.catalog, scope).filter((r) => fs.existsSync(unitOutDir(p.paths.outDir, r.chapter.id)));
  if (!refs.length) {
    p.log('nothing to lint: no generated units in scope under out/ (run generate first)');
    return { reports: [], exitCode: 1 };
  }
  const reports: LintReport[] = [];
  const now = new Date().toISOString();
  for (const ref of refs) {
    const dir = unitOutDir(p.paths.outDir, ref.chapter.id);
    const { bundle, missing } = readUnitBundle(dir);
    const report = lintBundle(bundle, lintContextFor(ref, true));
    for (const m of missing) {
      report.findings.push({ item: 'unit', rule: 'unit.incomplete', severity: 'error', path: m, message: `${m} missing (generate has not finished this unit)` });
      report.errors++;
    }
    writeJson(path.join(dir, 'lint.json'), { ...report, at: now });
    for (const [key, counts] of Object.entries(report.items))
      await p.store.putItem({
        unit: ref.chapter.id,
        stage: 'lint',
        key,
        status: counts.errors ? 'failed' : 'done',
        attempts: 1,
        run_id: null,
        template: null,
        model: null,
        usage: null,
        cost_paise: 0,
        output: path.relative(p.paths.outDir, path.join(dir, 'lint.json')).split(path.sep).join('/'),
        error: counts.errors ? `${counts.errors} lint error(s)` : null,
        updated_at: now,
        findings: counts,
      });
    printReport(p, report, !!opts.verbose);
    reports.push(report);
  }
  const failed = reports.filter((r) => r.errors).length;
  p.log(`lint: ${reports.length - failed}/${reports.length} unit(s) clean, ${reports.reduce((n, r) => n + r.errors, 0)} error(s), ${reports.reduce((n, r) => n + r.warnings, 0)} warning(s)`);
  return { reports, exitCode: failed ? 1 : 0 };
}

export interface ExemplarRef {
  family: string;
  dir: string;
  unit: string;
}

export function exemplarDirs(templatesDir: string): ExemplarRef[] {
  return contentDirs(path.join(templatesDir, 'exemplars'));
}

/** <root>/<family>/<unit>/release.json — exemplars and hand-authored chapters share this layout (D-026). */
export function contentDirs(root: string): ExemplarRef[] {
  if (!fs.existsSync(root)) return [];
  return fs.readdirSync(root).flatMap((family) => {
    const fdir = path.join(root, family);
    if (!fs.statSync(fdir).isDirectory()) return [];
    return fs
      .readdirSync(fdir)
      .map((unit) => ({ family, dir: path.join(fdir, unit), unit }))
      .filter((e) => fs.statSync(e.dir).isDirectory() && fs.existsSync(path.join(e.dir, 'release.json')));
  });
}

export function lintExemplar(p: Pipeline, ex: ExemplarRef): LintReport {
  const release = JSON.parse(fs.readFileSync(path.join(ex.dir, 'release.json'), 'utf8'));
  const ref = findChapter(p.catalog, ex.unit);
  const ctx: LintContext = ref
    ? lintContextFor(ref, false)
    : {
        unit: ex.unit,
        family: ((FAMILIES as readonly string[]).includes(ex.family) ? ex.family : 'other') as Family,
        classLevel: Number(ex.unit.split('-')[1]),
        language: typeof release?.notes?.language === 'string' ? release.notes.language : 'en',
        literature: /literature/.test(ex.family),
        topicIds: null,
        requirePipelineProvenance: false,
      };
  return lintBundle(releaseBundle(release), ctx);
}

export async function lintExemplarsCommand(p: Pipeline, opts: { verbose?: boolean } = {}): Promise<LintSummary> {
  const list = [...exemplarDirs(p.paths.templatesDir), ...contentDirs(p.paths.authoredDir)];
  if (!list.length) {
    p.log(`no exemplars found in ${path.join(p.paths.templatesDir, 'exemplars')}`);
    return { reports: [], exitCode: 0 };
  }
  const reports = list.map((ex) => {
    const r = lintExemplar(p, ex);
    printReport(p, r, !!opts.verbose);
    return r;
  });
  return { reports, exitCode: reports.some((r) => r.errors) ? 1 : 0 };
}

export function lintTable(reports: LintReport[]): string {
  return table(['unit', 'errors', 'warnings'], reports.map((r) => [r.unit, r.errors, r.warnings]), ['l', 'r', 'r']);
}
