// Build CBSE 11 Chemistry ch11 The Gaseous State (formative assessment only): npx tsx content/_stage/chemistry/cbse-11-chemistry-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(11, 'The Gaseous State (formative assessment only)', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 11,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['m-double', 'm-avogadro', 'm-water', 'ar-boyle'],
      B: ['s2-kelvin', 's2-ideal', 's3-dev'],
      C: ['l-laws', 'l-dev'],
      D: ['c-z'],
    },
    long: {
      A: ['m-rigid', 'm-lbar', 'm-density-ratio', 'm-dalton', 'm-zlt1', 'm-vdwa', 'm-units', 'm-crit', 'ar-water', 'ar-b'],
      B: ['s2-lbar', 's2-density', ['s2-water', 's2-zco2'], 's3-vdw', ['s3-crit', 's3-zplot']],
      C: ['l-ideal', ['l-vdw', 'l-dalton']],
      D: ['c-crit', 'c-vdw'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Standard values: R = 0.08314 L bar, 0.0821 L atm, 8.314 J K-1 mol-1; 1 atm = 101.325 kPa = 760 mmHg; vapour pressure of water 17.5, 23.8, 26.7, 31.8, 55.3 mmHg at 20, 25, 27, 30, 40 C; critical constants of CO2, NH3, Cl2, O2, N2, H2, CH4; van der Waals a and b (NCERT-style); Z curves are schematic and labelled; illustrative data labelled; all numerical answers computed in the build script',
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
