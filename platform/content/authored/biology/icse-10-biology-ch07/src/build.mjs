// Build ICSE 10 Biology ch07 Circulatory System: Blood and Lymph:
//   npx tsx content/authored/biology/icse-10-biology-ch07/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(7, 'Circulatory System: Blood and Lymph');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10077,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['vitk-mcq', 'citrate-mcq', 'node-mcq', 'oedema-mcq', 'clot-ar', 'thrombo-term', 'odd-lymph', 'reason-eosin', 'lymph-plasma-short'],
      B: [['report-case', 'typing-case']],
    },
    long: {
      A: ['plasma-pct-mcq', 'altitude-mcq', 'allergy-mcq', 'lacteal-mcq', 'infection-mcq', 'no-mito-mcq', 'rbc-ar', 'diapedesis-term', 'odd-wbc', 'agglut-term', 'blood-fill5', 'cells-match5'],
      B: [['cut-case', 'swelling-case', 'rh-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Composition of blood (plasma, red cells, five kinds of white cells, platelets: structure, numbers, origin, life and functions), efficiency of the mammalian red cell, blood coagulation (thromboplastin, prothrombin, thrombin, fibrinogen, fibrin, calcium, vitamin K, serum, heparin), tissue fluid and lymph, the lymphatic system, spleen and tonsils, ABO groups and the Rh factor checked against the ICSE 2027 Biology syllabus (Class X, Human Anatomy and Physiology) — see README "Verifier pass"',
    counting_rules: 'Plasma volume, differential-count percentages, the blood-report shortfall and every blood-group compatibility (donors, recipients, antibodies, Rh) are computed by src/calc.mjs, not typed in',
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
