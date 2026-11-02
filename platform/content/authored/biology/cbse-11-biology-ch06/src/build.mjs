// Build ch06 Anatomy of Flowering Plants: npx tsx content/authored/biology/cbse-11-biology-ch06/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(6, 'Anatomy of Flowering Plants', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 61,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['companion-mcq', 'medullary-mcq', 'ground-mcq', 'xylempar-ar'],
      B: ['meristem-short', 'endo-short', 'leaves-short'],
      C: ['tissues-long', 'stem-long'],
      D: ['root-case'],
    },
    long: {
      A: ['interc-mcq', 'parench-mcq', 'phloemfood-mcq', 'bsheath-mcq', 'dicstem-mcq', 'casp-mcq', 'pericycle-mcq', 'monoroot-mcq', 'sclerenchyma-ar', 'leaf-ar'],
      B: ['collsc-short', 'epidermis-short', ['xylemel-short', 'phloemel-short'], 'bundle-short', ['dicstem-short', 'ground-short']],
      C: ['leaf-long', ['catalog-long', 'root-long']],
      D: ['tissue-case', 'stomata-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Meristems (apical, intercalary), simple tissues (parenchyma, collenchyma, sclerenchyma with fibres and sclereids), complex tissues (xylem elements, protoxylem and metaxylem, endarch and exarch; phloem elements), epidermal, ground and vascular tissue systems, radial and conjoint open and closed bundles, anatomy of dicot and monocot root, stem and leaf (endodermis and Casparian strips, pericycle, polyarch xylem, hypodermis, bundle sheath, palisade and spongy mesophyll, bulliform cells, isobilateral leaf) checked against the 2026-27 rationalised NCERT scope; secondary growth is not taught (see README "Verifier pass")',
    counting_rules: 'Real size from magnification, stomatal density and ratio, bundles per square millimetre and per section, leaf layer thicknesses and shares, xylem and phloem patch counts and sample percentages are computed and asserted in src/calc.mjs, not typed in',
    verifier_pass: '2026-11-02: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
