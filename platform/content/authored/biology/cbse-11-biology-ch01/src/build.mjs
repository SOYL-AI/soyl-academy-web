// Build ch01 The Living World: npx tsx content/authored/biology/cbse-11-biology-ch01/src/build.mjs [--dump <file>]
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
  seed: 11,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['woese-mcq', 'kingdoms-mcq', 'author-mcq', 'name-ar'],
      B: ['domain-short2', 'wrongname-short2', 'codes-short3'],
      C: ['hierarchy-long', 'need-long'],
      D: ['survey-case'],
    },
    long: {
      A: ['fig-order-mcq', 'nomenclature-mcq', 'described-mcq', 'genus-mcq', 'division-mcq', 'species-mcq', 'fig-family-mcq', 'taxon-mcq', 'species-ar', 'ranks-ar'],
      B: ['steps-short2', 'rules-short2', ['upward-short2', 'species-short2'], 'taxsys-short3', ['benefits-short3', 'shared-short3']],
      C: ['domains-long', ['lineage-long', 'nomenclature-long']],
      D: ['names-case', 'hierarchy-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Biodiversity and the 1.7–1.8 million described species, the need for classification, identification versus nomenclature versus classification, the three domains (Woese 1990: Bacteria with peptidoglycan, Archaea without it and often in extreme habitats, Eukarya with a true nucleus and four kingdoms), taxonomy versus systematics, the seven categories and their meanings (phylum or division), the species concept (similarity, distinctness and the biological species concept), example lineages of tiger, lion, cat, dog, housefly, honeybee, potato, brinjal, chilli, mango, rice and wheat, binomial nomenclature (Linnaeus; ICBN and ICZN; Latin, italics or separate underlining; capital genus, small epithet; author abbreviation) checked against the 2026-27 rationalised NCERT scope (see README "For a reviewer")',
    counting_rules: 'Rank positions, the lowest shared rank and the number of shared ranks of any two organisms (computed from the lineage table), name-rule checks, survey percentages, genus and species counts, branching counts and case numbers are computed and asserted in src/calc.mjs, not typed in; the funnel and tree diagrams in src/svgs.mjs are drawn from that data',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
