// Build ICSE 10 Biology ch15 Human Evolution:
//   npx tsx content/authored/biology/icse-10-biology-ch15/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(15, 'Human Evolution');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10151,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['oldest-mcq', 'lamarck-mcq', 'fittest-mcq', 'moth-mcq', 'acquired-ar', 'cranial-term', 'odd-darwin', 'reason-dark', 'hab-ere-short'],
      B: [['moth-case', 'skull-case']],
    },
    long: {
      A: ['habilis-mcq', 'neander-mcq', 'trend-mcq', 'weismann-mcq', 'struggle-mcq', 'revival-mcq', 'neander-ar', 'melanism-term', 'odd-features', 'reason-lamarck', 'darwin-fill5', 'skull-match5'],
      B: [['giraffe-case', 'museum-case', 'beetle-case']],
    },
  },
  checksExtra: {
    biology_facts: "Human ancestors (Australopithecus, Homo habilis, Homo erectus, Neanderthal man, Cro-Magnon man, modern man) compared in posture, cranial capacity, canines, brow ridges, chin, body hair and height; Lamarck's use and disuse and inheritance of acquired characters with the giraffe, vestigial organs and Weismann's criticism; Darwin's natural selection and the peppered moth, checked against the ICSE 2027 Biology syllabus (Class X); cranial capacities are approximate textbook averages — see README \"For a reviewer\"",
    counting_rules: 'Cranial-capacity ratio and difference, moth percentages, the recapture ratio and the beetle survival percentage are computed by src/calc.mjs, not typed in',
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
