// Build ICSE 9 Physics ch03 Force and Newton’s Laws of Motion:
//   npx tsx content/authored/physics/icse-9-physics-ch03/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(3, "Force and Newton's Laws of Motion", { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const svgMod = await import('./svgs.mjs');
const SELF_CHECKS = svgMod.SELF_CHECKS;
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 91003,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['fc3', 'un2', 'mo1', 'sl1', 'ar-second', 's2d', 's3e'],
      B: [['inertia-long', 'pairs-long']],
    },
    long: {
      A: ['fc1', 'fc2', 'un3', 'un1', 'in1', 'th2', 'mo2', 'ar-third', 's2a', 's2g', 's2h', 's3b', 's3c'],
      B: [['second-long', 'catch-long', 'fma-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Contact and non-contact forces and the inverse square dependence, the newton, dyne, kgf and gf, Newton’s three laws with inertia, momentum, F = ma with the equations of motion, and action-reaction pairs, checked against the ICSE 2028 Physics syllabus Class IX (Force and Newton’s Laws of Motion; inertial mass is removed) — see README "For a reviewer"',
    counting_rules: 'Every conversion, momentum, force, acceleration, speed and time is computed and asserted in src/calc.mjs; the force diagrams are drawn from fixed geometry and self-checked; kgf and gf appear only in conversions',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    icse_style: 'Assertion-reason items use the ICSE option order; conversions and second-law numericals with working; 10-mark structured questions in parts, one with a lettered figure; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-07: every question re-solved from its stem by the author; keys, schemes and word limits checked',
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
