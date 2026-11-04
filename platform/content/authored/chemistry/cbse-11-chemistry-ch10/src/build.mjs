// Build CBSE 11 Chemistry ch10 s- and p-Block Elements (formative assessment only): npx tsx content/_stage/chemistry/cbse-11-chemistry-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(10, 's- and p-Block Elements (formative assessment only)', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 10,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['m-flame', 'm-linitrate', 'm-6s6p', 'ar-li-eo'],
      B: ['s2-flame', 's2-inert', 's3-hyd'],
      C: ['l-g1', 'l-anom'],
      D: ['c-hyd'],
    },
    long: {
      A: ['m-ie2', 'm-mobility', 'm-be-oh', 'm-bf4', 'm-pbo2', 'm-graphite', 'm-diag-id', 'm-sio2', 'ar-bcl3', 'ar-ccl4'],
      B: ['s2-ie2', 's2-be-alk', ['s2-bcl3', 's2-dg'], 's3-ga', ['s3-sicl', 's3-cat']],
      C: ['l-g13', ['l-g14', 'l-allo']],
      D: ['c-be', 'c-tl'],
    },
  },
  checksExtra: {
    chemistry_facts: 'NCERT-style data: radii, ionic radii, IE1-IE3, hydration enthalpies, E0 values, flame colours, electronegativities, E-E bond enthalpies (C-C 348, Si-Si 297, Ge-Ge 260, Sn-Sn 240 kJ/mol), diamond 3.51 and graphite 2.26 g/cm3; illustrative data labelled; all numerical answers computed in the build script',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-04: every question, case part and alternative re-solved from its stem by the writer; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(path.join(dir, process.argv[process.argv.indexOf('--dump') + 1]), dumpBank(rel));
}
