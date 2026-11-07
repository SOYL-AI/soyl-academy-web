// Build ICSE 9 Physics ch02 Motion in One Dimension:
//   npx tsx content/authored/physics/icse-9-physics-ch02/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(2, 'Motion in One Dimension', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const svgMod = await import('./svgs.mjs');
const SELF_CHECKS = svgMod.SELF_CHECKS;
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 91002,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['sv3', 'sp4', 'gr3', 'eq1', 'ar-speed', 's2b', 's3b'],
      B: [['dt-long', 'deriv-long']],
    },
    long: {
      A: ['sv2', 'sp1', 'sp3', 'gr1', 'gr4', 'eq2', 'fall2', 'ar-dd', 's2a', 's2d', 's2f', 's3a', 's3e'],
      B: [['vt-long', 'brake-long', 'fall-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Scalars and vectors, distance and displacement, speed, velocity, acceleration and retardation, distance-time and velocity-time graphs, the four equations of uniformly accelerated motion derived graphically and free fall with g = 10 m s⁻², checked against the ICSE 2028 Physics syllabus Class IX (Motion in One Dimension; non-uniform acceleration is removed) — see README "For a reviewer"',
    counting_rules: 'Every speed, acceleration, area, stopping distance, height and time is computed and asserted in src/calc.mjs; the graphs and the free-fall figures are drawn from the same data and self-checked',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    icse_style: 'Assertion-reason items use the ICSE option order; graph reading; graphical derivations; 10-mark structured questions in parts, one with a lettered figure; chapter tests on icse-9-default-chapter-test-short / -long',
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
