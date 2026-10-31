// Build ISC 12 Biology ch10 Mechanism of Evolution and Human Evolution: npx tsx content/authored/biology/isc-12-biology-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(10, 'Mechanism of Evolution and Human Evolution');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1102,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['melanism-mcq', 'founder-mcq', 'stabilising-mcq', 'neanderthal-mcq', 'australo-ar'],
      B: ['postulates-short', ['foundbottle-short', 'ancestors-short']],
      C: ['replica-short', ['selection-short', 'hwfactors-short']],
      D: ['hw-long'],
    },
    long: {
      A: ['malthus-mcq', 'ddt-mcq', 'lamarck-mcq', 'saltation-mcq', 'seal-mcq', 'disruptive-mcq', 'directional-mcq', 'hwcond-mcq', 'erectus-mcq', 'ramapithecus-mcq', 'drift-ar', 'flow-ar'],
      B: ['criticism-short', 'variation-short', ['devries-short', 'sapiens-short']],
      C: ['melanism-short', 'synthesis-short', 'hwtest-short', ['human-short', 'darwinvs-short']],
      D: ['human-long', ['darwin-long', 'synthesis-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Darwinism and Malthus, industrial melanism, the giraffe, DDT and antibiotic resistance, Lederberg’s replica plating, criticism of Darwinism, de Vries’ mutation theory, the modern synthetic theory with gene flow and genetic drift (founder and bottleneck effects), variation, stabilising, directional and disruptive selection, the Hardy–Weinberg principle and the factors disturbing it, and the features of Dryopithecus, Ramapithecus, Australopithecus, Homo habilis, Homo erectus, Neanderthal man, Cro-Magnon man and modern man checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Hardy–Weinberg allele and genotype frequencies, expected genotype numbers, percentages of moths, drift frequencies and brain-capacity ratios are computed by src/calc.mjs and src/svgs.mjs, not typed in',
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
