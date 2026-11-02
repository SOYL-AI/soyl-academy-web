// Build ch15 Body Fluids and Circulation: npx tsx content/authored/biology/cbse-11-biology-ch15/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-11-biology-ch01/src/lib.mjs';

setChapter(15, 'Body Fluids and Circulation');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 151,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['plasma-mcq', 'mitral-mcq', 'medulla-mcq', 'valve-ar'],
      B: ['plasma-short', 'open-short', 'clot-short'],
      C: ['blood-long', 'heart-long'],
      D: ['donor-case'],
    },
    long: {
      A: ['fibrinogen-mcq', 'neutro-mcq', 'rhmother-mcq', 'calcium-mcq', 'chambers-mcq', 'lub-mcq', 'symp-mcq', 'failure-mcq', 'rbc-ar', 'bp-ar'],
      B: ['lymph-short', 'ecg-short', ['nodal-short', 'hyper-short'], 'abo-short', ['cycle-short', 'double-short']],
      C: ['groups-long', ['cycle-long', 'disorders-long']],
      D: ['ecg-case', 'bp-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Plasma (55 percent; 90–92 percent water; 6–8 percent proteins: fibrinogen, globulins, albumins; serum), formed elements (RBC 5–5.5 million per cubic mm, haemoglobin 12–16 g per 100 mL, 120 days, spleen; WBC 6000–8000 with the five types and their shares and roles; platelets 1.5–3.5 lakh from megakaryocytes), ABO and Rh groups (80 percent Rh positive, erythroblastosis foetalis and its prevention), the clotting cascade (thrombokinase, prothrombin, thrombin, fibrinogen, fibrin, calcium ions), tissue fluid and lymph, open and closed circulation, heart chambers in vertebrates, the human heart (pericardium, septa, tricuspid, bicuspid and semilunar valves, SAN, AVN, AV bundle, bundle of His, Purkinje fibres, pacemaker 70–75 per minute), the cardiac cycle (atrial systole adding about 30 percent, lub and dub, 0.8 s, stroke volume 70 mL, cardiac output 5 L), the ECG (P, QRS, T; leads on both wrists and the left ankle), double circulation, hepatic portal and coronary systems, regulation (myogenic heart, medulla oblongata, sympathetic, parasympathetic, adrenal medullary hormones) and disorders (hypertension 140/90, CAD, angina, heart failure versus cardiac arrest and heart attack) checked against the 2026-27 rationalised NCERT scope (see README "Verifier pass")',
    counting_rules: 'Plasma and formed-element volumes, WBC shares, Rh-positive counts, ABO donor lists (computed from antigens and antibodies), cycle length, cardiac output, stroke volume, heart rate from QRS counts, platelet conversion and the hypertension rule are computed and asserted in src/calc.mjs, not typed in; the ECG trace in src/svgs.mjs is computed from smooth waves',
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
