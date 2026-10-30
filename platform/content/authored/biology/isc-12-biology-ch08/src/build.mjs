// Build ISC 12 Biology ch08 Gene Expression, Human Genome Project and DNA Fingerprinting: npx tsx content/authored/biology/isc-12-biology-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(8, 'Gene Expression, Human Genome Project and DNA Fingerprinting');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1082,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['rho-mcq', 'universal-mcq', 'asite-mcq', 'permease-mcq', 'operator-ar'],
      B: ['features-short', ['operon-def-short', 'ethics-short']],
      C: ['processing-short', ['code-discovery-short', 'fingerprint-steps-short']],
      D: ['lac-long'],
    },
    long: {
      A: ['template-mcq', 'pol3-mcq', 'cap-mcq', 'gamow-mcq', 'commaless-mcq', 'ribozyme-mcq', 'release-mcq', 'imutant-mcq', 'chromosome-mcq', 'southern-mcq', 'onestrand-ar', 'vntr-ar'],
      B: ['strands-short', 'trna-short', ['snp-short', 'hgp-goals-short']],
      C: ['transcription-bact-short', 'translation-short', 'lacon-short', ['hgp-methods-short', 'mutation-code-short']],
      D: ['translation-long', ['hgp-long', 'fingerprint-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Transcription unit and strands, bacterial and eukaryotic RNA polymerases with sigma and rho factors, splicing, capping and tailing of hnRNA, intron, exon, cistron, recon, muton, monocistronic and polycistronic units, discovery and features of the genetic code (Gamow, Khorana, Nirenberg, Ochoa), tRNA structure and translation, the lac operon (Jacob and Monod), the goals, methods (ESTs, sequence annotation, BAC and YAC) and salient features of the Human Genome Project, and DNA fingerprinting with VNTRs (Jeffreys), its applications and ethical issues checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'mRNA and template sequences, peptides, anticodons, codon counts, spliced lengths, coding fractions of the genome and paternity-gel band matches are computed by src/calc.mjs and src/svgs.mjs, not typed in',
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
