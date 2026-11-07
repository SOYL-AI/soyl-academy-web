// Build ICSE 9 Physics ch01 Measurements and Experimentation:
//   npx tsx content/authored/physics/icse-9-physics-ch01/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(1, 'Measurements and Experimentation', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const svgMod = await import('./svgs.mjs');
const SELF_CHECKS = svgMod.SELF_CHECKS;
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 91001,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['si-mcq3', 'lc-mcq1', 'ver-mcq1', 'pen-mcq3', 'ar-lc', 'si-short2a', 'pen-short3a'],
      B: [['vern-long', 'pend-long']],
    },
    long: {
      A: ['si-mcq1', 'si-mcq4', 'lc-mcq2', 'lc-mcq3', 'ver-mcq2', 'scr-mcq1', 'pen-mcq4', 'ar-si', 'lc-short2', 'pen-short2b', 'pen-short2a', 'si-short3', 'ver-short3'],
      B: [['scr-long', 'graph-long', 'si-long']],
    },
  },
  checksExtra: {
    physics_facts: 'SI fundamental and derived units, cgs and fps, conversions, least count, Vernier callipers and screw gauge with zero error (pictorial readings only), simple pendulum T = 2π√(l/g) without derivation and the l against T² graph, checked against the ICSE 2028 Physics syllabus Class IX (Measurements and Experimentation) — see README "For a reviewer"',
    counting_rules: 'Every reading, least count, conversion, period and g value is computed and asserted in src/calc.mjs; Vernier and screw-gauge figures are drawn from the same reading data and self-checked (coinciding line, thimble edge)',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    icse_style: 'Assertion-reason items use the ICSE option order; pictorial readings with zero error; 10-mark structured questions in parts; chapter tests on icse-9-default-chapter-test-short / -long',
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
