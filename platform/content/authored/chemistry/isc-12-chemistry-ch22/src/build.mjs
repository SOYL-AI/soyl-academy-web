// Build ISC 12 Chemistry ch22 Proteins, Vitamins and Nucleic Acids: npx tsx content/authored/chemistry/isc-12-chemistry-ch22/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(22, 'Proteins, Vitamins and Nucleic Acids');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2222,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['essential-mcq', 'quaternary-mcq', 'rickets-mcq', 'trna-mcq', 'zwitter-ar'],
      B: ['aa-short', ['levels-short', 'bases-short']],
      C: ['protein-short3', ['vit-short3', 'dnarna-short3']],
      D: ['protein-long'],
    },
    long: {
      A: ['acidic-mcq', 'migrate-mcq', 'chiral-mcq', 'primary-mcq', 'fibrous-mcq', 'heavymetal-mcq', 'urease-mcq', 'glucagon-mcq', 'b12-mcq', 'rnacopy-mcq', 'denat-ar', 'base-ar'],
      B: ['peptide-short', 'denat-short', ['vit-short', 'hormone-short']],
      C: ['classify-short3', 'zwitter-short3', 'enzyme-short3', ['rna-short3', 'nutrition-short3']],
      D: ['nucleic-long', ['denat-long', 'vitamin-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Amino-acid classification, zwitter ions and isoelectric points, peptide bonds and the four levels of protein structure (definitions only), denaturation, enzymes and hormones, vitamin groups and deficiency diseases, nucleic-acid bases, the DNA double helix and DNA–RNA comparison, and every numerical checked against the ISC 2027 syllabus (Unit 10)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
