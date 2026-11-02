// Build ch16 Excretory Products and their Elimination: npx tsx content/authored/biology/cbse-11-biology-ch16/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(16, 'Excretory Products and their Elimination');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 161,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['hilum-mcq', 'ultra-mcq', 'micturition-mcq', 'ammonia-ar'],
      B: ['kidneyls-short', 'filtration-short', 'tubules-short'],
      C: ['system-long', 'urine-long'],
      D: ['gfr-case'],
    },
    long: {
      A: ['bonyfish-mcq', 'lizard-mcq', 'juxta-mcq', 'renin-mcq', 'anf-mcq', 'glycosuria-mcq', 'transplant-mcq', 'liver-mcq', 'descend-ar', 'skin-ar'],
      B: ['habitat-short', 'jga-short', ['raas-short', 'micturition-short'], 'modes-short', ['counter-short', 'dialysis-short']],
      C: ['counter-long', ['regulation-long', 'disorders-long']],
      D: ['excretion-case', 'thirst-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Ammonotelism, ureotelism and uricotelism with examples; protonephridia, nephridia, Malpighian tubules and antennal glands; the human excretory system; kidney position, size (10–12 by 5–7 by 2–3 cm, 120–170 g), hilum, pelvis, calyces, capsule, cortex, medullary pyramids and columns of Bertini; nephron parts, cortical and juxtamedullary nephrons, peritubular capillaries and vasa recta; ultrafiltration through three layers with podocytes; renal blood flow 1100–1200 mL per minute; GFR 125 mL per minute, 180 L per day; JGA and renin; nearly 99 percent reabsorbed; active and passive reabsorption and tubular secretion; roles of PCT (70–80 percent), Henle’s loop limbs, DCT and collecting duct; the counter-current mechanism (300 to 1200 mOsmol per L, NaCl and urea, nearly four times concentrated); ADH, renin–angiotensin–aldosterone and ANF; micturition reflex; urine 1–1.5 L, pH about 6, urea 25–30 g a day; glycosuria and ketonuria; lungs (carbon dioxide about 200 mL per minute), liver, sweat, sebum and saliva; uraemia, haemodialysis, kidney transplantation, renal calculi and glomerulonephritis — checked against the 2026-27 rationalised NCERT scope (see README "Verifier pass")',
    counting_rules: 'Daily filtrate from GFR, percentages reabsorbed, PCT litres, concentration factor, renal share of cardiac output, urea concentration, lungs’ carbon dioxide per hour, case GFR and urea-removal values and the osmolarity levels drawn in the counter-current diagram are computed and asserted in src/calc.mjs, not typed in',
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
