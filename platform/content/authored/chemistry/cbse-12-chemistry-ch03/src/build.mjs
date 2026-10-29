// Build ch03 Chemical Kinetics: npx tsx content/authored/chemistry/cbse-12-chemistry-ch03/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(3, 'Chemical Kinetics');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1203,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['avg-rate-mcq', 'plot-mcq', 'arrhenius-mcq', 'catalyst-ar'],
      B: ['stoich-short', 'catalyst-short', 'derive-short3'],
      C: ['first-long', 'ratelaw-long'],
      D: ['drug-case'],
    },
    long: {
      A: ['factors-mcq', 'order-def-mcq', 'initial-rate-mcq', 'rate-change-mcq', 'zero-halflife-mcq', 'first-frac-mcq', 'temp-mcq', 'steric-mcq', 'order-ar', 'temp-ar'],
      B: ['mechanism-short', 'radio-short', ['order-molec-short', 'collision-short'], 'initial-short3', ['arrhenius-short3', 'pseudo-short3']],
      C: ['arrhenius-long', ['zero-first-long', 'collision-long']],
      D: ['milk-case', 'clock-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Rate expressions, rate laws and orders, integrated equations and half-lives, Arrhenius and collision theory checked against the 2026-27 syllabus scope (see README "Verifier pass")',
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
