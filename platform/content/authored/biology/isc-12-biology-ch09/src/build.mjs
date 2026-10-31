// Build ISC 12 Biology ch09 Evolution: Origin of Life and Evidences: npx tsx content/authored/biology/isc-12-biology-ch09/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(9, 'Evolution: Origin of Life and Evidences');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1092,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['pasteur-mcq', 'spark-mcq', 'octopus-mcq', 'mesozoic-mcq', 'dino-ar'],
      B: ['theories-short', ['homo-short', 'embryo-short']],
      C: ['miller-short', ['dating-short', 'biogeo-short']],
      D: ['origin-long'],
    },
    long: {
      A: ['panspermia-mcq', 'oxygen-mcq', 'miller-fig-mcq', 'homologous-mcq', 'appendix-mcq', 'gillslit-mcq', 'vonbaer-mcq', 'strata-mcq', 'glider-mcq', 'code-mcq', 'wingsbat-ar', 'vestigial-ar'],
      B: ['protobiont-short', 'vestigial-short', ['radiation-short', 'molecular-short']],
      C: ['oparin-short', 'reducing-short', 'homanalog-short', ['eras-short', 'divergent-short']],
      D: ['fossil-long', ['miller-long', 'radiation-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Abiogenesis, biogenesis and panspermia, Pasteur’s swan-neck flasks, the Oparin–Haldane theory and reducing atmosphere, protobionts, coacervates and microspheres, the Miller–Urey experiment, homologous, analogous and vestigial organs, recapitulation and von Baer, fossils, Archaeopteryx, radiocarbon dating and the geological time scale, biogeography, Australian marsupials, Darwin’s finches and molecular evidence checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Radiocarbon ages, fractions of carbon-14 remaining and the decay curve are computed by src/calc.mjs, not typed in',
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
