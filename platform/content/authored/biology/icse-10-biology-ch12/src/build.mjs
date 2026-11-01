// Build ICSE 10 Biology ch12 Endocrine System:
//   npx tsx content/authored/biology/icse-10-biology-ch12/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(12, 'Endocrine System');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10121,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['ductless-mcq', 'glucagon-mcq', 'myx-mcq', 'adh-mcq', 'insulin-ar', 'endo-term', 'odd-adrenal', 'reason-goitre', 'cortex-medulla-short'],
      B: [['glucose-case', 'fright-case']],
    },
    long: {
      A: ['thyroid-loc-mcq', 'insulin-mcq', 'fright-mcq', 'master-mcq', 'dwarf-mcq', 'feedback-high-mcq', 'tropic-ar', 'tropic-term', 'odd-thyroid', 'reason-heterocrine', 'sugar-fill5', 'gland-match5'],
      B: [['goitre-case', 'insipidus-case', 'height-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Endocrine and exocrine glands; location and shape of the pituitary, thyroid, pancreas and adrenals; insulin and glucagon; thyroxine and its disorders; cortical hormones and adrenaline; pituitary hormones (growth hormone, tropic hormones, ADH, oxytocin) and their disorders; TSH–thyroxine negative feedback, checked against the ICSE 2027 Biology syllabus (Class X) — see README "Verifier pass"',
    counting_rules: 'Blood-sugar rises and falls, the urine-volume ratio and the heart-rate rise are computed by src/calc.mjs from imagined readings, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; 5-blank fill-in passages from a word list; a 5-pair lettered-diagram match; 10-mark case questions opening with a situation, a data table or a diagram; chapter tests on icse-10-biology-chapter-test-short / -long',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
