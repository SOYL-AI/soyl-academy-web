// Build ICSE 10 Biology ch08 Circulatory System: Heart, Blood Vessels and Circulation:
//   npx tsx content/authored/biology/icse-10-biology-ch08/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(8, 'Circulatory System: Heart, Blood Vessels and Circulation');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10088,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['pericardium-mcq', 'pv-mcq', 'glucose-mcq', 'bp-mcq', 'lv-ar', 'odd-liver', 'reason-pulse', 'reason-portal', 'double-short'],
      B: [['cycle-case', 'varicose-case']],
    },
    long: {
      A: ['systole-mcq', 'valves-count-mcq', 'artery-wall-mcq', 'spurt-mcq', 'lumen-mcq', 'portal-mcq', 'vein-ar', 'odd-valves', 'reason-legs', 'reason-capillary', 'heart-fill5', 'heart-match5'],
      B: [['pulse-case', 'meal-case', 'hole-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Structure of the heart (chambers, septum, tricuspid, bicuspid and semilunar valves, chordae tendineae, pericardium, main vessels), the cardiac cycle (systole, diastole, valve states, lubb and dub), double circulation, arteries, veins and capillaries, pulse and blood pressure, and the vessels of the liver and kidney with the hepatic portal system checked against the ICSE 2027 Biology syllabus (Class X, Human Anatomy and Physiology); no vessel is named beyond the main vessels of the heart, liver and kidney (removed topic) — see README "Verifier pass"',
    counting_rules: 'Cardiac-cycle lengths and phases, cardiac output, pulse rates, the blood-pressure difference and the liver and kidney sample differences are computed by src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; a 5-blank fill-in passage from a word list; a 5-pair labelled-diagram match; 10-mark case questions opening with an experiment, a situation or a diagram; chapter tests on icse-10-biology-chapter-test-short / -long',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked; items in one test checked for stems that give away another item\'s answer — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
