// Build ch19 Chemical Coordination and Integration: npx tsx content/authored/biology/cbse-11-biology-ch19/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(19, 'Chemical Coordination and Integration');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 191,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['somatostatin-mcq', 'graves-mcq', 'secretin-mcq', 'insulin-ar'],
      B: ['composite-short', 'heartkidney-short', 'cortex-short'],
      C: ['pituitary-long', 'mech-long'],
      D: ['goitre-case'],
    },
    long: {
      A: ['portal-mcq', 'di-mcq', 'acro-mcq', 'pth-mcq', 'thymusage-mcq', 'glucagon-mcq', 'epo-mcq', 'steroid-mcq', 'adren-ar', 'steroid-ar'],
      B: ['hypo-short', 'adh-short', ['thymus-short', 'mech-short'], 'thyroid-short', ['fight-short', 'twodiabetes-short']],
      C: ['adrpanc-long', ['thyropara-long', 'claim-long']],
      D: ['gtt-case', 'lab-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Definition of hormones; hypothalamic releasing and inhibiting hormones (GnRH, somatostatin) and the portal system; pituitary parts and hormones (GH, PRL, TSH, ACTH, LH, FSH, MSH, oxytocin, vasopressin) with gigantism, dwarfism, acromegaly and diabetes insipidus; pineal melatonin; thyroid T4, T3 and TCT with goitre, cretinism and Graves’ disease; parathyroid PTH; thymosins; adrenal catecholamines and corticoids (three zones, cortisol, aldosterone) with Addison’s disease; islets, glucagon and insulin with diabetes mellitus; testis and ovary hormones; ANF, erythropoietin, gastrin, secretin, CCK and GIP; receptors, chemical classes and the two pathways of hormone action — checked against the 2026-27 rationalised NCERT scope (see README "Verifier pass")',
    counting_rules: 'Pituitary hormone counts, iodine atoms removed and iodine mass share of thyroxine, blood glucose mass, percentage rises, glucose curves and three-hour values, half-life fraction, cascade amplification, islet tissue mass and the survey percentage are computed and asserted in src/calc.mjs, not typed in',
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
