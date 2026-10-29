// Build ch05 Molecular Basis of Inheritance: npx tsx content/authored/biology/cbse-12-biology-ch05/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(5, 'Molecular Basis of Inheritance');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 52,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['dnase-mcq', 'mrna-mcq', 'repressor-mcq', 'purine-ar'],
      B: ['packaging-short', 'template-short', 'fork-short'],
      C: ['ms-long', 'translation-long'],
      D: ['lac-case'],
    },
    long: {
      A: ['hershey-mcq', 'histone-mcq', 'conservative-mcq', 'lagging-mcq', 'translate-mcq', 'frameshift-mcq', 'operator-mcq', 'vntr-mcq', 'lac-ar', 'rna-ar'],
      B: ['criteria-short', 'trna-short', ['hgp-short', 'vntr-short'], 'helix-short', ['processing-short', 'lac-short']],
      C: ['transcription-long', ['lac-long', 'fingerprint-long']],
      D: ['seq-case', 'fingerprint-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Griffith, Avery–MacLeod–McCarty and Hershey–Chase experiments, nucleotide and double-helix structure (Chargaff, 3.4 nm, 10 bp, 0.34 nm), packaging (nucleoid, histone octamer, nucleosome, eu- and heterochromatin), semi-conservative replication and Meselson–Stahl, fork and Okazaki fragments, transcription units, bacterial and eukaryotic transcription and processing, genetic code, tRNA, translation, lac operon, HGP goals, methods and findings, DNA fingerprinting checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    counting_rules: 'Complementary strands, mRNAs, translations (standard code table), Chargaff percentages, DNA lengths, nucleosome counts, Meselson–Stahl band fractions and gel bands are computed by src/calc.mjs, not typed in',
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
