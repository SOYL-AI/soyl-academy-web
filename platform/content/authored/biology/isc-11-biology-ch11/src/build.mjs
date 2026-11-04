// Build ISC 11 Biology ch11 Biomolecules: npx tsx content/authored/biology/isc-11-biology-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(11, 'Biomolecules', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1111,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['basic-mcq', 'sickle-mcq', 'niacin-mcq', 'poppy-mcq', 'denature-ar'],
      B: ['disacc-short2', ['struct-short2', 'fatoil-short2']],
      C: ['sixclass-short3', ['poly-short3', 'lipidclass-short3']],
      D: ['carb-long'],
    },
    long: {
      A: ['ldh-mcq', 'isom-mcq', 'cellulose-mcq', 'ribose-mcq', 'acidic-mcq', 'sulphur-mcq', 'notlipid-mcq', 'metal-mcq', 'glycosidic-mcq', 'peptide-mcq', 'sucrose-ar', 'glycine-ar'],
      B: ['levels-short2', 'props-short2', ['essential-short2', 'sm-short2']],
      C: ['classify-short3', 'pfunc-short3', 'dialysis-short3', ['temp-short3', 'lipidfn-short3']],
      D: ['lipid-long', ['inhib-long', 'protein-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Classes of carbohydrates and the structures and roles of glucose, ribose, deoxyribose, maltose, lactose, sucrose, glycogen, starch, cellulose, inulin and chitin; glycine, alanine and serine, the zwitterion, acidic, basic, neutral, sulphur-containing, essential and non-essential amino acids; the four levels of protein structure and their bonds; fats, oils and the other lipids; enzyme properties, nomenclature, the six classes, cofactors, the effect of temperature, pH and substrate and competitive inhibition (malonate and succinic dehydrogenase); secondary metabolites, checked against the ISC 2028 Biology syllabus (Class XI portion) — see README "For a reviewer"',
    counting_rules: 'Sugar, amino-acid, peptide and fat masses, hydrolysis by mass, peptide-bond counts, enzyme rates with and without an inhibitor and the temperature and pH curves are computed and asserted in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    verifier_pass: 'Every question, case part and alternative re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
