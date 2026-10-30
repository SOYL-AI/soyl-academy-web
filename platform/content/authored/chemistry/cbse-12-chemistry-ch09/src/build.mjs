// Build ch09 Amines: npx tsx content/authored/chemistry/cbse-12-chemistry-ch09/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(9, 'Amines');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1209,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['name-mcq', 'gabriel-mcq', 'carbylamine-mcq', 'basicity-ar'],
      B: ['prep-short', 'hinsberg-short', 'basicity-short3'],
      C: ['prep-long', 'diazo-long'],
      D: ['dye-case'],
    },
    long: {
      A: ['structure-mcq', 'reduction-mcq', 'bp-mcq', 'pkb-order-mcq', 'acylation-mcq', 'nitrous-mcq', 'nitration-mcq', 'coupling-mcq', 'gabriel-ar', 'fc-ar'],
      B: ['acetylation-short', 'diazo-short', ['aniline-short', 'bp-short'], 'conversions-short3', ['identify-short3', 'sandmeyer-short3']],
      C: ['basicity-long', ['reactions-long', 'synthesis-long']],
      D: ['unknown-case', 'fish-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Classification and names, preparations (reduction, ammonolysis, Gabriel, Hoffmann), pKb values and basicity order, carbylamine/Hinsberg/nitrous acid tests, aniline substitution and diazonium chemistry checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
