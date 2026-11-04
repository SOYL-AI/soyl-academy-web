// Build ISC 11 Biology ch14 Respiration in Plants: npx tsx content/authored/biology/isc-11-biology-ch14/src/build.mjs [--dump <file>]
// CH_OUT=<folder> builds into a scratch folder instead of the chapter folder.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(14, 'Respiration in Plants', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1114,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['lenticel-mcq', 'ets-site-mcq', 'oaa-mcq', 'amphfat-mcq', 'ferm-ar'],
      B: ['link-short2', ['ets-short2', 'amph-short2']],
      C: ['ferm-short3', ['glyc-short3', 'oxphos-short3']],
      D: ['rq-long'],
    },
    long: {
      A: ['waterlog-mcq', 'curd-mcq', 'nad-mcq', 'glyc-site-mcq', 'krebsco2-mcq', 'link-mcq', 'fadh-mcq', 'mito-fig2-mcq', 'uncoupler-mcq', 'rqanaer-mcq', 'ets-ar', 'amph-ar'],
      B: ['gasex-short2', 'aerobic-short2', ['oxphos-short2', 'glyc-short2']],
      C: ['krebs-short3', 'chemcomp-short3', 'rqcalc-short3', ['amph-short3', 'prod-short3']],
      D: ['yield-long', ['ets-long', 'amph-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Gas exchange in plants, aerobic and anaerobic respiration, alcoholic and lactic acid fermentation, glycolysis and the Krebs cycle as flowcharts (detailed steps are a removed topic and are not taught), the link reaction, the electron transport system and oxidative phosphorylation with Mitchell’s chemiosmosis, the ATP yield of one glucose, the amphibolic pathway, and the respiratory quotient of carbohydrates, fats, proteins and organic acids checked against the ISC 2028 Biology syllabus (Class XI) — see README "Verifier pass"',
    counting_rules: 'Atoms of every equation are counted and balanced in src/calc.mjs; RQ values, ATP, NADH, FADH2 and CO2 per glucose, ATP per stage, fermentation masses and efficiencies are computed and asserted there, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason subparts; diagram-based items with a lettered figure; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-04: every question, case part and alternative re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
