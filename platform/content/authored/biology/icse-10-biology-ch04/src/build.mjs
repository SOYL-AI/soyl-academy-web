// Build ICSE 10 Biology ch04 Transpiration:
//   npx tsx content/authored/biology/icse-10-biology-ch04/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(4, 'Transpiration');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10041,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['def-mcq', 'kion-mcq', 'oil-mcq', 'humid-mcq', 'evil-ar', 'transp-term', 'odd-factors', 'reason-thick', 'limit-short'],
      B: [['belljar-case', 'stoma-case']],
    },
    long: {
      A: ['route-mcq', 'night-mcq', 'lower-mcq', 'underwater-mcq', 'cactus-mcq', 'gutt-mcq', 'kion-ar', 'guard-term', 'odd-routes', 'reason-uptake', 'mechanism-fill5', 'stoma-match5'],
      B: [['cobalt-case', 'potometer-case', 'weight-case']],
    },
  },
  checksExtra: {
    biology_facts: "Transpiration and its importance; stomatal opening and closing by potassium ion exchange; the loss-of-weight, bell jar and cobalt chloride paper experiments; Ganong's potometer and its limitations; factors affecting transpiration and adaptations that reduce it; guttation and bleeding, checked against the ICSE 2027 Biology syllabus (Class X) — see README \"Verifier pass\"",
    counting_rules: 'Weight losses and rates, potometer bubble rates and volumes, the stomata ratio and the percentage of absorbed water transpired are computed by src/calc.mjs from imagined readings, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; 5-blank fill-in passages from a word list; a 5-pair lettered-diagram match; 10-mark experiment-based case questions (bell jar, cobalt chloride paper, potometer, loss of weight); chapter tests on icse-10-biology-chapter-test-short / -long',
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
