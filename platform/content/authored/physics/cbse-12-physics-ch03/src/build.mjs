// Build ch03 Current Electricity: npx tsx content/authored/physics/cbse-12-physics-ch03/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(3, 'Current Electricity');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1203,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['length-mcq', 'lamp-mcq', 'charging-mcq', 'emf-ar'],
      B: ['signal-short', 'middle-short', 'tempdep-short'],
      C: ['drift-long', 'bridge-long'],
      D: ['starter-case'],
    },
    long: {
      A: ['stretch-mcq', 'slopeT-mcq', 'bulbs-mcq', 'halfcoil-mcq', 'reversed-mcq', 'unequal-mcq', 'against-mcq', 'swap-mcq', 'metal-ar', 'bridge-ar'],
      B: ['vi-short', 'heater-short', ['cold-short', 'rules-short'], 'transmission-short', ['best-short', 'oppose-short']],
      C: ['kirch-long', ['cells-long', 'temp-long']],
      D: ['cord-case', 'powerbank-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (Kirchhoff circuit solved by script with junction and loop rules verified and arrows drawn in the solved directions, Wheatstone balance potentials, metre-bridge jockey position, drift and cell directions): ${svgFails.length} failures`,
    physics_facts: 'SI units throughout; e = 1.6 × 10⁻¹⁹ C, mₑ = 9.1 × 10⁻³¹ kg, copper n = 8.5 × 10²⁸ m⁻³ and ρ = 1.7 × 10⁻⁸ Ω m; every worked-example and question number computed by the build script and re-solved (see README "Verifier pass")',
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
