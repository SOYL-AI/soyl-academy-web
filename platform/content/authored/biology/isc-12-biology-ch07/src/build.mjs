// Build ISC 12 Biology ch07 Molecular Basis of Inheritance: DNA and Replication: npx tsx content/authored/biology/isc-12-biology-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(7, 'Molecular Basis of Inheritance: DNA and Replication');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1072,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['sulphur-mcq', 'rt-mcq', 'euchromatin-mcq', 'hybrid-mcq', 'width-ar'],
      B: ['griffith-short', ['rna-short', 'chargaff-short']],
      C: ['avery-short', ['helix-short', 'replication-short']],
      D: ['search-long'],
    },
    long: {
      A: ['sstrain-mcq', 'dnase-mcq', 'miescher-mcq', 'franklin-mcq', 'hbond-mcq', 'histone-mcq', 'retro-mcq', 'taylor-mcq', 'okazaki-mcq', 'polymerase-mcq', 'lagging-ar', 'stable-ar'],
      B: ['properties-short', 'nucleosome-short', ['dogma-short', 'ligase-short']],
      C: ['hershey-short', 'packaging-short', 'meselson-short', ['fork-short', 'dnarna-short']],
      D: ['replication-long', ['helix-long', 'packaging-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Properties of genetic material, Griffith, Avery–MacLeod–McCarty and Hershey–Chase experiments, contributions of Miescher, Chargaff, Wilkins, Franklin, Watson and Crick, double-helix dimensions and base pairing, DNA versus RNA and types of RNA, nucleosomes, euchromatin and heterochromatin, the central dogma and reverse transcription, and semi-conservative replication with Meselson–Stahl and Taylor experiments, DNA polymerase and DNA ligase checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Complementary strands, Chargaff percentages, helical turns, hydrogen bonds, DNA lengths, nucleosome counts and Meselson–Stahl fractions are computed by src/calc.mjs, not typed in',
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
