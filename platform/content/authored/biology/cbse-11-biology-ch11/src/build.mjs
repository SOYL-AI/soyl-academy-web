// Build ch11 Photosynthesis in Higher Plants: npx tsx content/authored/biology/cbse-11-biology-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(11, 'Photosynthesis in Higher Plants', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 111,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cf0-mcq', 'pepacc-mcq', 'actionspec-mcq', 'oxygen-ar'],
      B: ['whyatp-short', 'protongrad-short', 'c3c4-short'],
      C: ['calvin-long', 'factors-long'],
      D: ['chromcase-case'],
    },
    long: {
      A: ['green-mcq', 'stromalamellae-mcq', 'firstprod-mcq', 'turnsc-mcq', 'kranz-mcq', 'sat-mcq', 'stomata-mcq', 'phosphoglyc-mcq', 'cyclic-ar', 'c4-ar'],
      B: ['accessory-short', 'regencost-short', ['pigments-short', 'blackman-short'], 'zscheme-short', ['c4path-short', 'co2c3c4-short']],
      C: ['light-long', ['c4-long', 'chloroplast-long']],
      D: ['jagendorf-case', 'greenhouse-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Chloroplast structure (double membrane, grana, thylakoids, stroma lamellae, stroma); the four leaf pigments, colours and order on a chromatogram; accessory pigments; absorption and action spectra; photosystems with P680 and P700; the Z scheme with carriers; cyclic and non-cyclic photophosphorylation and where each occurs; the chemiosmotic hypothesis with CF0 and CF1; the Calvin cycle (RuBisCO, PGA, 2 ATP and 2 NADPH for reduction, 1 ATP for regeneration, 3 and 2 per CO2, 18 and 12 per glucose); the C4 pathway (PEP, PEP carboxylase, OAA, Kranz anatomy, 5 ATP per CO2); photorespiration; the factors affecting photosynthesis with 10 percent saturation, 0.03-0.04 percent CO2, 360 and 450 microlitre per litre; Blackman’s law checked against the 2026-27 rationalised NCERT scope (see README "Verifier pass")',
    counting_rules: 'ATP and NADPH per CO2, per three turns and per glucose (C3 and C4), turns for n glucose, water, oxygen, electrons and NADPH from water splitting, Rf values and band distances, CO2 mass for a mass of glucose, and the minimum-of-factors rate model (with its limiting factor) are computed and asserted in src/calc.mjs, not typed in; the Blackman graph in src/svgs.mjs is drawn from the same rate function',
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
