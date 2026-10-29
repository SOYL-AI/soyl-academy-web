// Build ch01 Solutions: npx tsx content/authored/chemistry/cbse-12-chemistry-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Solutions');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1201,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['ppm-mcq', 'ideal-pair-mcq', 'osmotic-protein-mcq', 'henry-temp-ar'],
      B: ['molarity-molality-short', 'abnormal-short', 'deviation-explain-short3'],
      C: ['raoult-long', 'vant-hoff-long'],
      D: ['radiator-case'],
    },
    long: {
      A: ['mole-fraction-mcq', 'molarity-dilution-mcq', 'gas-temp-mcq', 'solid-endo-mcq', 'azeotrope-mcq', 'kb-units-mcq', 'vh-k2so4-mcq', 'abnormal-mass-mcq', 'colligative-ar', 'ideal-ar'],
      B: ['mass-pct-short', 'henry-applications-short', ['ideal-nonideal-short', 'kb-define-short'], 'urea-short3', ['rlvp-short3', 'vh-alpha-short3']],
      C: ['colligative-long', ['osmosis-long', 'deviation-long']],
      D: ['ro-plant-case', 'distillation-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Concentration units, Henry’s law constants, Raoult’s law, deviations and azeotropes, Kb/Kf values and van’t Hoff factors checked against the 2026-27 syllabus scope (see README "Verifier pass")',
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
