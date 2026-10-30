// Build ISC 12 Biology ch01 Pre-fertilisation: npx tsx content/authored/biology/isc-12-biology-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Sexual Reproduction in Flowering Plants: Pre-fertilisation');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1012,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['tapetum-mcq', 'monosporic-mcq', 'wind-mcq', 'emasc-mcq', 'sac-ar'],
      B: ['kinds-short', ['ovule-short', 'pistil-short']],
      C: ['anther-short', ['outbreed-short', 'megaspore-short']],
      D: ['microsporogenesis-long'],
    },
    long: {
      A: ['exine-mcq', 'germpore-mcq', 'viability-mcq', 'synergid-mcq', 'anatropous-mcq', 'geitono-mcq', 'cleisto-mcq', 'vallisneria-mcq', 'outbreed-mcq', 'unisexual-mcq', 'monoecious-ar', 'cleisto-ar'],
      B: ['microsp-short', 'selfcross-short', ['viability-short', 'geito-short']],
      C: ['pollen-short', 'agents-short', 'hybrid-short', ['sac-short', 'water-short']],
      D: ['sac-long', ['pollination-long', 'hybrid-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Anther structure and wall layers, microsporogenesis, pollen grain structure, viability and economic importance, ovule parts, megasporogenesis, monosporic seven-celled eight-nucleate embryo sac, kinds and agencies of pollination with adaptations, outbreeding devices, pollen–pistil interaction and artificial hybridisation checked against the ISC 2027 Biology syllabus (Class XII, unit 1) — see README "Verifier pass"',
    counting_rules: 'Pollen counts from sporangia and mother cells, ploidy of pollen and embryo-sac cells, and embryo-sac nuclei are computed by src/calc.mjs, not typed in',
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
