// Build ch04 Principles of Inheritance and Variation: npx tsx content/authored/biology/cbse-12-biology-ch04/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(4, 'Principles of Inheritance and Variation');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 42,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['testcross-mcq', 'snap-mcq', 'honeybee-mcq', 'incomplete-ar'],
      B: ['testcross-short', 'drone-short', 'abo-short'],
      C: ['di-long', 'sexlinked-long'],
      D: ['pea-case'],
    },
    long: {
      A: ['pea-trait-mcq', 'abo-mcq', 'pleio-mcq', 'map-mcq', 'grasshopper-mcq', 'colourblind-mcq', 'pedigree-mcq', 'thal-mcq', 'indep-ar', 'colour-ar'],
      B: ['incomplete-short', 'map-short', ['colour-short', 'aneuploidy-short'], 'linkage-short', ['sickle-short', 'haemo-short']],
      C: ['disorders-long', ['linkage-long', 'counsel-long']],
      D: ['colour-case', 'sickle-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Mendel’s seven pea characters, monohybrid, dihybrid and test crosses, laws, incomplete dominance, co-dominance and ABO multiple alleles, pleiotropy, polygenic inheritance, chromosomal theory, Morgan’s linkage data (1.3 and 37.2 percent), sex determination (XO, XY, ZW, honey bee), pedigree symbols, haemophilia, colour blindness, sickle-cell anaemia, phenylketonuria, thalassemia, Down’s, Klinefelter’s and Turner’s syndromes checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    counting_rules: 'Every Punnett square, ratio, expected count, probability, recombination frequency and polygenic class count is computed by the independent engine in src/calc.mjs (gametes, cross, phenotype, abo, xlinked), not typed in',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
