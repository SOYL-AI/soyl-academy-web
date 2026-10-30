// Build ISC 12 Biology ch06 Sex Determination, Mutation and Genetic Disorders: npx tsx content/authored/biology/isc-12-biology-ch06/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(6, 'Sex Determination, Mutation and Genetic Disorders');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1062,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['birds-mcq', 'fatherson-mcq', 'transversion-mcq', 'turner-mcq', 'haemo-ar'],
      B: ['human-short', ['carrier-short', 'mutate-short']],
      C: ['sexsys-short', ['point-short', 'thal-short']],
      D: ['xlinked-long'],
    },
    long: {
      A: ['grasshopper-mcq', 'drone-mcq', 'drosophila-mcq', 'criss-mcq', 'induced-mcq', 'frameshift-mcq', 'hbs-mcq', 'pku-mcq', 'down-mcq', 'kline-mcq', 'sickle-ar', 'birds-ar'],
      B: ['pku-short', 'syndrome-short', ['birdegg-short', 'cbfather-short']],
      C: ['drosophila-short', 'cb-short', 'sickle-short', ['chrom-short', 'aneu-short']],
      D: ['sickle-long', ['chrom-long', 'sexdet-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Sex determination in humans (XX–XY), grasshoppers (XX–XO), birds (ZW–ZZ) and honey bees (haplodiploidy), X-linked inheritance of eye and body colour in Drosophila, haemophilia and colour blindness, spontaneous and induced mutation, transition, transversion and frameshift, sickle-cell anaemia (GAG to GUG, Glu to Val), phenylketonuria, alpha- and beta-thalassaemia (HBA1, HBA2 on 16; HBB on 11), and Down’s, Klinefelter’s and Turner’s syndromes checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'X-linked crosses by sex, autosomal carrier crosses, sex probabilities and chromosome numbers of drones are computed by src/calc.mjs, not typed in',
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
