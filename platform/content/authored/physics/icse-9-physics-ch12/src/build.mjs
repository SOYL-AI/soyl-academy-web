// Build ICSE 9 Physics ch12 Magnetism:
//   npx tsx content/authored/physics/icse-9-physics-ch12/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(12, 'Magnetism', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const svgMod = await import('./svgs.mjs');
const SELF_CHECKS = svgMod.SELF_CHECKS;
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 91012,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['m-mag', 'm-temp', 'm-sure', 'm-earthS', 'ar-ind', 's2f', 's3e'],
      B: [['field-long', 'nn-long']],
    },
    long: {
      A: ['m-prop', 'm-inside', 'm-fieldA', 'm-fieldD', 'm-closed', 'm-dense', 'm-uniform', 'ar-cross', 's2c', 's2h', 's2i', 's3b', 's3g'],
      B: [['chain-long', 'earth-long', 'ns-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Magnetic materials, induced magnetism (induction precedes attraction, repulsion as the sure test), magnetic field lines and their properties, the earth as a magnet (magnetic S pole near the geographic north), the compass, the uniform field of the earth over a small region, the combined field of a bar magnet and the earth with neutral points (equatorial line for N pole north, axial line for N pole south), checked against the ICSE 2028 Physics syllabus Class IX (Magnetism) — see README For a reviewer',
    counting_rules: 'Field lines and neutral points are computed in JS from a point-pole model of the magnet plus a uniform earth field and checked (the field is zero at every marked neutral point); every distance and resultant in the numericals is computed and asserted in src/calc.mjs',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    icse_style: 'Assertion-reason items use the ICSE option order; numericals on distances and resultant fields; lettered field and neutral-point diagrams; 10-mark structured questions in parts; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-08: every question re-solved from its stem by the author; keys, schemes and word limits checked',
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
