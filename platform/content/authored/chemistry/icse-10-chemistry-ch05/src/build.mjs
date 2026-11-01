// Build ICSE 10 Chemistry ch05 Mole Concept: Gas Laws, Molar Volume and Avogadro's Number: npx tsx content/_stage/chemistry/icse-10-chemistry-ch05/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(5, "Mole Concept: Gas Laws, Molar Volume and Avogadro's Number");
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1005,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['ethyne-mcq', 'hcl-mcq', 'gam-mcq', 'so2mass-mcq', 'nh3vol-ar', 'gl-short1', 'mole-short1', 'molvol-short1', 'nh3-short2'],
      B: [['gaslaws-long', 'mole-long']],
    },
    long: {
      A: ['scope-mcq', 'count-mcq', 'atoms-mcq', 'most-mcq', 'samevol-mcq', 'vd14-mcq', 'molar-ar', 'avo-short1', 'gmm-short1', 'vd-short1', 'particles-short1', 'vol-short1', 'trio-fill', 'quantity-match'],
      B: [['molvol-long', 'vd-long', 'mixed-long']],
    },
  },
  checksExtra: {
    chemistry_facts: "Gay-Lussac's law of combining volumes (gaseous species only, same temperature and pressure, excess gas carried over), Avogadro's law, atomicity of H2, O2, N2 and Cl2, the mole and Avogadro's number (6.022 × 10^23), gram atomic and gram molecular mass, molar volume 22.4 dm3 at STP (273 K, 1 atm) and M = 2 × VD, checked against the ICSE 2027 syllabus (Class X, section 5); every balanced equation and every number re-computed by the author and by the build script",
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
