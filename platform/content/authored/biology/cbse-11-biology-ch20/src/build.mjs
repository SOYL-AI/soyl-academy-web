// Build ch20 Digestion and Absorption: npx tsx content/authored/biology/cbse-11-biology-ch20/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(20, 'Digestion and Absorption');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 201,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['epiglottis-mcq', 'b12-mcq', 'lactose-mcq', 'fat-ar'],
      B: ['heterodont-short', 'gastric-short', 'wall-short'],
      C: ['canal-long', 'digestion-long'],
      D: ['pem-case'],
    },
    long: {
      A: ['diphyodont-mcq', 'formula-mcq', 'layers-mcq', 'oddi-mcq', 'rennin-mcq', 'enterokinase-mcq', 'largeint-mcq', 'kwash-mcq', 'mucus-ar', 'colon-ar'],
      B: ['choke-short', 'trypsin-short', ['bile-short', 'largeint-short'], 'bread-short', ['absorb-short', 'fatpath-short']],
      C: ['glands-long', ['absorption-long', 'blog-long']],
      D: ['stone-case', 'wisdom-case'],
    },
  },
  checksExtra: {
    biology_facts: 'CBSE reading material for formative assessment only (syllabus board_assessed: false), authored in full. Alimentary canal regions; teeth (thecodont, diphyodont, heterodont, 2123/2123, 32); tongue and frenulum; epiglottis; stomach regions and sphincters; small and large intestine regions, caecum and vermiform appendix; four wall layers, rugae, villi, microvilli, lacteals, goblet cells, crypts; salivary glands, liver (1.2 to 1.5 kg, hepatic lobules, Glisson’s capsule), gall bladder and duct system with the sphincter of Oddi, pancreas; digestion in the mouth (amylase at pH 6.8, about 30 percent of starch, lysozyme), stomach (gastric gland cells, pepsin at pH 1.8, rennin, chyme, 4 to 5 hours) and small intestine (bile, pancreatic enzymes, enterokinase, succus entericus, pH 7.8); absorption mechanisms, fat absorption via micelles, chylomicrons and lacteals; sites of absorption, assimilation and defaecation; calorific values; PEM (kwashiorkor, marasmus); jaundice, vomiting, diarrhoea, constipation, indigestion — checked against the NCERT text and the 2026-27 CBSE syllabus scope (see README "Verifier pass")',
    counting_rules: 'Teeth per half jaw and in all, molar share, teeth left after wisdom-tooth removal, snack energy (physiological, gross and in kJ), fat equivalent, starch hydrolysed in the mouth, hydrogen-ion folds from pH, liver share of body mass, surface-area factor and the malnutrition survey percentage are computed and asserted in src/calc.mjs, not typed in',
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
