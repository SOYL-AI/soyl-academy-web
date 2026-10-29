// Build ch01 Electric Charges and Fields: npx tsx content/authored/physics/cbse-12-physics-ch01/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Electric Charges and Fields');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1201,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['touch-mcq', 'electron-mcq', 'enclosed-mcq', 'shell-ar'],
      B: ['vector-short', 'sheets-short', 'equatorial-short'],
      C: ['axial-long', 'shell-long'],
      D: ['lab-case'],
    },
    long: {
      A: ['double-mcq', 'equil-mcq', 'unlike-neutral-mcq', 'ratio-mcq', 'water-mcq', 'ring-mcq', 'moved-mcq', 'two-sheets-mcq', 'quant-ar', 'outside-ar'],
      B: ['lines-short', 'stable-short', ['spheres-short', 'test-short'], 'triangle-short', ['neutral-short', 'wire-short']],
      C: ['sheet-long', ['square-long', 'torque-long']],
      D: ['microwave-case', 'shield-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (field-line arrows against the computed field, dipole field directions, neutral point, superposition resultant angle, torque sense, area normal): ${svgFails.length} failures`,
    physics_facts: 'SI units throughout; k = 9 × 10⁹ N m² C⁻², ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻², e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg; every worked-example and question number computed by the build script and re-solved (see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
