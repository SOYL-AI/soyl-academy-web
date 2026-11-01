// Build ICSE 10 Chemistry ch02 Chemical Bonding: npx tsx content/authored/chemistry/icse-10-chemistry-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(2, 'Chemical Bonding');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1002,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['condition-mcq', 'mgion-mcq', 'h2-mcq', 'polar-mcq', 'transfer-ar', 'ionname-short1', 'ch4-short1', 'h3o-short1', 'prop-short2'],
      B: [['ionic-long', 'coord-long']],
    },
    long: {
      A: ['lioxide-mcq', 'mp-mcq', 'solvent-mcq', 'ccl4-mcq', 'nh3lone-mcq', 'hclconduct-mcq', 'polar-ar', 'cao-short1', 'dissoc-short1', 'n2-short1', 'compare-short1', 'selfion-short1', 'bondtype-fill', 'class-match'],
      B: [['covalent-long', 'polar-long', 'unknown-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Electron transfer in NaCl, MgCl2 and CaO, properties of electrovalent compounds, shared pairs and lone pairs in H2, Cl2, O2, N2, CH4 and CCl4, polarity of HCl, H2O and NH3, comparison of compound types and coordinate bonds in H3O+ and NH4+, checked against the ICSE 2027 syllabus (Class X, section 2)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
