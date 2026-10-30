// Build ch10 Biomolecules: npx tsx content/authored/chemistry/cbse-12-chemistry-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(10, 'Biomolecules');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1210,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['classify-mcq', 'invert-mcq', 'pairing-mcq', 'sucrose-ar'],
      B: ['evidence-short', 'fibrous-short', 'cyclic-short3'],
      C: ['glucose-long', 'dna-long'],
      D: ['honey-case'],
    },
    long: {
      A: ['anomer-mcq', 'fructose-mcq', 'iodine-mcq', 'zwitterion-mcq', 'peptide-bonds-mcq', 'enzyme-mcq', 'beriberi-mcq', 'insulin-mcq', 'glucose-ar', 'dna-ar'],
      B: ['syrup-short', 'denature-short', ['vitamin-short', 'dna-short'], 'levels-short3', ['deficiency-short3', 'functions-short3']],
      C: ['protein-long', ['carb-long', 'nutrition-long']],
      D: ['protein-case', 'dna-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Carbohydrate classification, glucose structure evidence and anomers, disaccharide and polysaccharide linkages, specific rotations, amino acids and protein structure, enzymes, vitamin deficiency diseases, DNA/RNA composition and base pairing, and hormone roles checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
