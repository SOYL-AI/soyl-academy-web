// Build ICSE 10 Biology ch16 Pollution:
//   npx tsx content/authored/biology/icse-10-biology-ch16/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(16, 'Pollution');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10161,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['co-mcq', 'detergent-mcq', 'bio-mcq', 'acidrain-mcq', 'greenhouse-ar', 'pollutant-term', 'odd-waste', 'reason-acid', 'thermal-short'],
      B: [['ddt-case', 'smog-case']],
    },
    long: {
      A: ['source-mcq', 'thermal-mcq', 'bmw-mcq', 'ddt-bird-mcq', 'cfc-mcq', 'cng-mcq', 'oil-ar', 'bmw-term', 'odd-control', 'reason-co', 'effects-fill5', 'town-match5'],
      B: [['river-case', 'canteen-case', 'townfig-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Air pollution sources and pollutants; water, thermal and soil pollution; biomedical waste, radiation and noise; biodegradable and non-biodegradable wastes and DDT biomagnification; greenhouse effect, global warming, acid rain and ozone depletion; control measures (CNG, switching off engines, social forestry, sewage treatment, plastic bans, organic farming, Bharat Stage norms) and the Swachh Bharat Abhiyan, checked against the ICSE 2027 Biology syllabus (Class X). Dated facts (BS-VI 2020, Swachh Bharat 2014, single-use plastic ban 2022, Montreal Protocol 1987) are listed in README "For a reviewer"',
    counting_rules: 'DDT magnification factors, the canteen biodegradable share, the dissolved-oxygen fall, the pH ratio, the count of noisy places and the fuel saved at red lights are computed by src/calc.mjs, not typed in',
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
