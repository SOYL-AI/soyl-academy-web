// Build ch12 Respiration in Plants: npx tsx content/authored/biology/cbse-11-biology-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(12, 'Respiration in Plants', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 121,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cytoplasm-mcq', 'twice-mcq', 'o2use-mcq', 'cristae-ar'],
      B: ['amph-short', 'tca-short', 'ferment-short3'],
      C: ['energy-long', 'aerobic-long'],
      D: ['seed-case'],
    },
    long: {
      A: ['cristae-mcq', 'wine-mcq', 'matrix-mcq', 'oaa-mcq', 'frac-mcq', 'fatentry-mcq', 'co2-mcq', 'substrate-mcq', 'eff-ar', 'cycle-ar'],
      B: ['glycsites-short', 'rq-short', ['nad-short', 'complexes-short'], 'convention-short3', ['oxphos-short3', 'ets-short3']],
      C: ['glyc-long', ['rq-long', 'ets-long']],
      D: ['yeast-case', 'muscle-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Cellular respiration; glycolysis (EMP pathway, cytoplasm, 2 ATP used, 4 made, net 2 ATP, 2 NADH, 2 pyruvic acid, substrate-level phosphorylation); fermentation (alcoholic: pyruvic acid decarboxylase and alcohol dehydrogenase, ethanol and CO2; lactic acid: lactate dehydrogenase; NAD+ regeneration; less than 7 percent of energy; 13 percent alcohol); the mitochondrion; the link reaction (acetyl CoA, CO2, NADH); the Krebs cycle (OAA, citric acid, CO2 at two steps, per acetyl CoA 3 NADH, 1 FADH2, 1 ATP, 2 CO2); the electron transport system (complexes I to IV, ubiquinone, cytochrome c, oxygen as final acceptor, ATP synthase F0 and F1, proton gradient); the textbook ATP convention (3 per NADH, 2 per FADH2, 38 per glucose, with assumptions; about 32 by newer values); 2870 kJ per mole of glucose and 30.5 kJ per mole of ATP (about 40 percent efficiency); respiratory quotient (carbohydrate 1, fat about 0.7, protein about 0.9, organic acids above 1, anaerobic infinite); the amphibolic pathway and entry of fats and proteins, checked against the 2026-27 rationalised NCERT scope (see README "Verifier pass")',
    counting_rules: 'ATP, NADH and pyruvic acid from n glucose, Krebs cycle products per turn and per glucose, ATP per stage and in total under both conventions, O2 and CO2 per glucose, masses of ethanol and CO2 from a mass of glucose (with mass conservation checked), energy efficiency, and respiratory quotients from balanced equations and from measured volumes are computed and asserted in src/calc.mjs, not typed in; the ATP bar chart in src/svgs.mjs is drawn from the same values',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
