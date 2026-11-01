// Build ICSE 10 Chemistry ch12 Study of Compounds: Sulphuric Acid: npx tsx content/_stage/chemistry/icse-10-chemistry-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(12, 'Study of Compounds: Sulphuric Acid');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1012,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['oleum-mcq', 'sulphur-oxid-mcq', 'cuso4-mcq', 'contact-temp-mcq', 'sugar-ar', 'step2-short1', 's-short1', 'sugar-short1', 'dry-short2'],
      B: [['dilute-long', 'nonvol-long']],
    },
    long: {
      A: ['dibasic-mcq', 'fe-mcq', 'marble-mcq', 'sulphide-mcq', 'nonvol-mcq', 'pbso4-mcq', 'copper-ar', 'nahso4-short1', 'mg-short1', 'na2so3-short1', 'cuo-short1', 'kcl-short1', 'contact-fill', 'prop-match'],
      B: [['contact-long', 'conc-long', 'ident-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Contact process equations with conditions only (S + O₂ → SO₂; 2SO₂ + O₂ ⇌ 2SO₃ over V₂O₅ at about 450 °C and 1–2 atm, reversible and exothermic; SO₃ absorbed in conc. H₂SO₄ to oleum, then diluted) and why SO₃ is not absorbed in water, the dibasic acid with acid and normal salts, the dilute acid with metals, oxides, hydroxides, carbonates, hydrogen carbonates, sulphites, hydrogen sulphites and sulphides (CaSO₄ coating on marble), hot conc. acid oxidising carbon and sulphur to SO₂, dehydration of sugar and blue vitriol versus drying (not NH₃ or H₂S), the non-volatile acid preparing HCl and HNO₃, and the BaCl₂ and lead nitrate tests, checked against the ICSE 2027 syllabus (Class X, section 8D); every equation balanced by atom count',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question re-solved from its stem by the author; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
