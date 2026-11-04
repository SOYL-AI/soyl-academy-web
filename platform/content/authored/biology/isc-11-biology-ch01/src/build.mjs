// Build ISC 11 Biology ch01 The Living World: npx tsx content/authored/biology/isc-11-biology-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'The Living World', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1101,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['bsc-mcq', 'print-mcq', 'artificial-mcq', 'author-mcq', 'wheatmango-ar'],
      B: ['advantages-short2', ['cyto-short2', 'phylo-short2']],
      C: ['manfly-short3', ['need-short3', 'matrix-short3']],
      D: ['hierarchy-long'],
    },
    long: {
      A: ['man-mcq', 'funnel-mcq', 'taxon-mcq', 'order-mcq', 'fig-fam-mcq', 'fig-class-mcq', 'fig-mosq-mcq', 'genus-mcq', 'codes-mcq', 'advantage-mcq', 'numtax-ar', 'genus-ar'],
      B: ['bscdef-short2', 'mango-short2', ['printfix-short2', 'systems-short2']],
      C: ['trend-short3', 'rules-short3', 'three-short3', ['compare-short3', 'wheatrice-short3']],
      D: ['taxonomy-long', ['binomial-long', 'systems-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Need for classification; taxonomy and systematics; numerical taxonomy, cytotaxonomy and chemotaxonomy; the biological species concept; the taxonomic hierarchy with the classification of man, housefly, mango and wheat; binomial nomenclature and its rules and advantages; artificial, natural and phylogenetic systems, checked against the ISC 2028 Biology syllabus (Class XI) — see README "Verifier pass"',
    counting_rules: 'Every shared-category count, similarity score, chromosome number, ploidy and species count is computed and asserted in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
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
