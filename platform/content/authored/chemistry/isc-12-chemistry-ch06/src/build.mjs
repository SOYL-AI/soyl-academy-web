// Build ISC 12 Chemistry ch06 Activation Energy, Collision Theory and Arrhenius Equation: npx tsx content/authored/chemistry/isc-12-chemistry-ch06/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(6, 'Activation Energy, Collision Theory and Arrhenius Equation');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2206,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['threshold-mcq', 'enzyme-mcq', 'orientation-mcq', 'A-unit-mcq', 'catalyst-ar'],
      B: ['collision-short', ['endo-short', 'fridge-short']],
      C: ['ea-short3', ['profile-short3', 'A-short3']],
      D: ['arr-long'],
    },
    long: {
      A: ['complex-mcq', 'endo-mcq', 'matchstick-mcq', 'reverse-mcq', 'catalyst2-mcq', 'tempeffect-mcq', 'conc-collision-mcq', 'steric-mcq', 'limit-mcq', 'tc-mcq', 'endo-ar', 'temp-ar'],
      B: ['profile-short', 'temp-short', ['catalyst-short', 'arr-short']],
      C: ['k2-short3', 'collision-short3', 'cat-short3', ['tc-short3', 'graph-short3']],
      D: ['profile-long', ['collision-long', 'k-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Energy-profile relations, catalyst behaviour, collision-theory conditions, Arrhenius forms and every numerical (R = 8.314 J K⁻¹ mol⁻¹) checked against the ISC 2027 syllabus (Unit 3) — see README "Verifier pass"',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
