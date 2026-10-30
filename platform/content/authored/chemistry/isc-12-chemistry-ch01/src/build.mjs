// Build ISC 12 Chemistry ch01 Solutions and Their Concentration: npx tsx content/authored/chemistry/isc-12-chemistry-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Solutions and Their Concentration');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2201,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['molefrac-mcq', 'soda-mcq', 'negdev-mcq', 'hcl-azeo-mcq', 'molality-ar'],
      B: ['temp-short', ['henry-short', 'dev-short']],
      C: ['conv-short3', ['raoult-short3', 'azeo-short3']],
      D: ['conc-long'],
    },
    long: {
      A: ['solid-solution-mcq', 'equiv-mcq', 'molality-mcq', 'ppm-mcq', 'henry-temp-mcq', 'nh3-mcq', 'ideal-mcq', 'vapour-rich-mcq', 'nonvolatile-mcq', 'azeo-def-mcq', 'normality-ar', 'ideal-ar'],
      B: ['normality-short', 'ppm-short', ['raoult-short', 'azeo-short']],
      C: ['molefrac-short3', 'henry-short3', 'nonideal-short3', ['graph-short3', 'distil-short3']],
      D: ['raoult-long', ['henry-long', 'azeo-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Concentration terms incl. normality and ppm, Henry’s law constants, Raoult’s law, deviations and azeotrope compositions checked against the ISC 2027 syllabus (Unit 1) — see README "Verifier pass"',
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
