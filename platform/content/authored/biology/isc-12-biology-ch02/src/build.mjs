// Build ISC 12 Biology ch02 Fertilisation, Seed and Fruit: npx tsx content/authored/biology/isc-12-biology-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(2, 'Fertilisation, Seed and Fruit in Flowering Plants');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1022,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['triple-mcq', 'coleorhiza-mcq', 'albumin-mcq', 'parthenocarpy-mcq', 'apple-ar'],
      B: ['df-short', ['perisperm-short', 'truefalse-short']],
      C: ['endosperm-short', ['maize-short', 'apomixis-short']],
      D: ['df-long'],
    },
    long: {
      A: ['synergid-entry-mcq', 'waste-mcq', 'coconut-endo-mcq', 'helobial-mcq', 'pepper-mcq', 'heart-mcq', 'maize-fig-mcq', 'false-mcq', 'coir-mcq', 'polyembryony-mcq', 'perisperm-ar', 'apomixis-ar'],
      B: ['embryo-short', 'seeds-short', ['mango-short', 'dispersal-short']],
      C: ['dicot-short', 'coconut-short', 'ploidy-short', ['bean-short', 'special-short']],
      D: ['seedfruit-long', ['embryo-long', 'apomixis-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Pollen-tube entry, syngamy, triple fusion and the significance of double fertilisation, nuclear, cellular and helobial endosperm, perisperm, dicot and grass embryo development, bean and maize seed structure, albuminous and non-albuminous seeds, true, false and parthenocarpic fruits, L.S. of mango and coconut, significance of seeds, fruits and dispersal, apomixis, polyembryony and parthenocarpy checked against the ISC 2027 Biology syllabus (Class XII, unit 1) — see README "Verifier pass"',
    counting_rules: 'Ploidy of every seed and fruit tissue, male gametes per seed and meioses per pod are computed by src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-12-default-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
