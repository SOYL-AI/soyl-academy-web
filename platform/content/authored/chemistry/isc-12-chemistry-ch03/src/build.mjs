// Build ISC 12 Chemistry ch03 Electrochemical Cells and Electrode Potential: npx tsx content/authored/chemistry/isc-12-chemistry-ch03/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(3, 'Electrochemical Cells and Electrode Potential');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2203,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cell-type-mcq', 'half-mcq', 'acid-mcq', 'dg-mcq', 'saltbridge-ar'],
      B: ['cell-short', ['she-short', 'feasible-short']],
      C: ['measure-short3', ['conc-short3', 'ecell-short3']],
      D: ['cell-long'],
    },
    long: {
      A: ['saltbridge-mcq', 'pt-black-mcq', 'absolute-mcq', 'nature-mcq', 'temp-mcq', 'displace-mcq', 'ecell-mcq', 'oxidant-mcq', 'k-mcq', 'equilibrium-mcq', 'she-ar', 'dg-ar'],
      B: ['notation-short', 'vessel-short', ['nernst-short', 'dgk-short']],
      C: ['daniell-short3', 'series-short3', 'nernst-short3', ['ph-short3', 'dg-short3']],
      D: ['nernst-long', ['she-long', 'series-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Standard reduction potentials, SHE construction and limitations, cell notation, Nernst, ΔG° and K relations and every numerical checked against the ISC 2027 syllabus (Unit 2) — see README "Verifier pass"',
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
