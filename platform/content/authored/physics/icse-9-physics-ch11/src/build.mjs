// Build ICSE 9 Physics ch11 Current Electricity:
//   npx tsx content/authored/physics/icse-9-physics-ch11/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(11, 'Current Electricity', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const svgMod = await import('./svgs.mjs');
const SELF_CHECKS = svgMod.SELF_CHECKS;
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 91011,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['m-free', 'm-semi', 'm-super', 'm-vi', 'ar-quant', 's2h', 's3d'],
      B: [['circuit-long', 'pd-long']],
    },
    long: {
      A: ['m-unit', 'm-cellsym', 'm-rheo', 'm-wq', 'm-amp', 'm-dc', 'm-sym', 'ar-conv', 's2c', 's2d', 's2e', 's3c', 's3e'],
      B: [['ohm-long', 'charge-long', 'material-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Free electrons, conductors, insulators, semiconductors and superconductors, charge in coulombs with q = n e (e = 1.6 × 10⁻¹⁹ C, stated in each stem), current I = Q/t with conventional current and electron flow, potential difference V = W/q (no derivation) and resistance R = V/I, circuit symbols, open and closed circuits, dry cells and accumulators as sources of direct current (no construction or working), Ohm law at constant temperature, checked against the ICSE 2028 Physics syllabus Class IX (Current Electricity; removed topics: derivation of V = W/q, working of galvanometers and ammeters, construction and working of cells and accumulators) — see README "For a reviewer"',
    counting_rules: 'Every current, charge, number of electrons, work, potential difference and resistance is computed and asserted in src/calc.mjs; the circuit diagrams are drawn from computed geometry and self-checked',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    icse_style: 'Assertion-reason items use the ICSE option order; numericals with formula, substitution and unit; circuit diagrams with standard symbols; 10-mark structured questions in parts with a lettered circuit and a table of readings; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-08: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
