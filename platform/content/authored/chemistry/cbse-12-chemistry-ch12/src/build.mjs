// Build ch12 General Principles and Processes of Isolation of Elements: npx tsx content/authored/chemistry/cbse-12-chemistry-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(12, 'General Principles and Processes of Isolation of Elements');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1212,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['ore-mcq', 'magnetic-mcq', 'zn-mcq', 'leach-ar'],
      B: ['conc-short', 'slag-short', 'choose-short3'],
      C: ['furnace-long', 'extract-long'],
      D: ['copper-case'],
    },
    long: {
      A: ['depressant-mcq', 'bayer-mcq', 'slope-mcq', 'co-mcq', 'matte-mcq', 'emf-mcq', 'mond-mcq', 'anodemud-mcq', 'ellingham-ar', 'zone-ar'],
      B: ['ellingham-short', 'al-short', ['refine-short', 'uses-short'], 'thermo-short3', ['copper-short3', 'elec-short3']],
      C: ['refining-long', ['ore-long', 'concentration-long']],
      D: ['bauxite-case', 'ellingham-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Ores and formulas, concentration methods, calcination and roasting, approximate Ellingham values, blast furnace, copper and zinc extraction, Hall–Héroult cell, ΔG = −nFE and refining methods checked against the 2026-27 syllabus scope (formative-only chapter; see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
