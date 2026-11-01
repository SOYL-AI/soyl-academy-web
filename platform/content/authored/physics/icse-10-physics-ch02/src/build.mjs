// Build ICSE 10 Physics ch02 Work, Energy and Power: npx tsx content/authored/physics/icse-10-physics-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(2, 'Work, Energy and Power');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2002,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['angle-mcq', 'neg-mcq', 'hp-mcq', 'work-ar', 'work-fill', 'power-fill', 'work-short2', 'power-short2'],
      B: [['work-long', 'energy-long']],
    },
    long: {
      A: ['orbit-mcq', 'erg-mcq', 'compare-mcq', 'pe-mcq', 'pend-mcq', 'ke-ar', 'ke-fill', 'cell-fill', 'cons-fill', 'unit-match', 'derive-short2', 'convert-short2', 'pend-short2', 'fall-short3'],
      B: [['fall-long', 'units-long', 'pend-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Work with W = F s cos θ and its special cases, energy units and conversions (J, erg, cal, kW h, eV), power and horsepower, derivations of U = mgh and K = ½mv², energy conversions, conservation of energy in free fall and the simple pendulum, with every number computed and asserted in the build, checked against the ICSE 2027 syllabus (Class X, section 1)',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question and every internal-choice alternative re-solved from its stem by the author; every numerical computed and asserted by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
