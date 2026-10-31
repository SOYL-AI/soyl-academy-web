// Build ISC 12 Biology ch15 Biotechnology and its Applications: npx tsx content/authored/biology/isc-12-biology-ch15/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(15, 'Biotechnology and its Applications');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1152,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['somatic-mcq', 'goldenrice-mcq', 'lilly-mcq', 'probe-mcq', 'cry-ar'],
      B: ['microprop-short', ['bt-short', 'stemcell-short']],
      C: ['rnai-short', ['insulin-short', 'biopiracy-short']],
      D: ['gene-long'],
    },
    long: {
      A: ['meristem-mcq', 'gmadv-mcq', 'bollworm-mcq', 'rnai-mcq', 'proinsulin-mcq', 'allergy-mcq', 'ada-mcq', 'pcrdiag-mcq', 'alpha-mcq', 'geac-mcq', 'biopiracy-ar', 'antisense-ar'],
      B: ['diag-short', 'transgenic-short', ['ethics-short', 'goldenrice-short']],
      C: ['somatic-short', 'gm-short', 'gene-short', ['probe-short', 'transgenic3-short']],
      D: ['tissue-long', ['gmcrop-long', 'transgenic-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Totipotency, micropropagation, meristem culture and somatic hybridisation, advantages of GM crops, Bt crops with cry genes, RNA interference against Meloidogyne incognita, golden rice, genetically engineered insulin (Eli Lilly), recombinant vaccines, stem cells, gene therapy for ADA deficiency, molecular diagnosis by PCR, ELISA and probes, transgenic animals and their products (α-1-antitrypsin, α-lactalbumin in Rosie), vaccine and chemical safety testing, GEAC, biopatents and biopiracy (basmati, turmeric, neem) checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Plantlet numbers, insulin chain arithmetic, protein yields and percentages are computed by src/calc.mjs, not typed in',
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
