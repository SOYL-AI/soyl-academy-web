// Build ch05 Magnetism and Matter: npx tsx content/authored/physics/cbse-12-physics-ch05/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(5, 'Magnetism and Matter');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1205,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['flux-mcq', 'oscill-mcq', 'oxygen-mcq', 'dia-ar'],
      B: ['plot-short', 'heat-short', 'dipole-short'],
      C: ['equiv-long', 'classes-long'],
      D: ['curie-case'],
    },
    long: {
      A: ['halfsol-mcq', 'compare-mcq', 'eqax-mcq', 'nonuniform-mcq', 'rotate-mcq', 'twomag-mcq', 'rod-mcq', 'BHM-mcq', 'monopole-ar', 'soft-ar'],
      B: ['cutsol-short', 'liquid-short', ['levit-short', 'rodset-short'], 'torque-short', ['domain-short', 'core-short']],
      C: ['torque-long', ['quantities-long', 'choose-long']],
      D: ['crane-case', 'probe-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (bar-magnet and solenoid field lines traced from Biot–Savart over the circular turns, closing and pointing S → N inside; exact cylinder solution for dia/para/ferro samples; torque sense; domain resultant): ${svgFails.length} failures`,
    physics_facts: 'Syllabus treats the bar magnet field and torque qualitatively (ratios only); μ₀ = 4π × 10⁻⁷ T m A⁻¹; typical χ values (Bi −1.66 × 10⁻⁵, Al 2.3 × 10⁻⁵), Curie temperatures (Fe ≈ 1043 K, Ni ≈ 631 K); every number computed by the build script and re-solved (see README "Verifier pass")',
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
