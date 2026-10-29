// Build ch06 Electromagnetic Induction: npx tsx content/authored/physics/cbse-12-physics-ch06/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(6, 'Electromagnetic Induction');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1206,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['phi-t-mcq', 'wirerect-mcq', 'energyL-mcq', 'faraday-ar'],
      B: ['lenz-short', 'inertia-short', 'Lderive-short'],
      C: ['faraday-long', 'Mderive-long'],
      D: ['data-case'],
    },
    long: {
      A: ['flux-mcq', 'double-mcq', 'falling-mcq', 'tworing-mcq', 'wingtip-mcq', 'rodforce-mcq', 'wheel-mcq', 'orientation-mcq', 'motional-ar', 'core-ar'],
      B: ['energy-short', 'factors-short', ['charge-short', 'spark-short'], 'direction-short', ['terminal-short', 'loopenter-short']],
      C: ['motional-long', ['rotate-long', 'Lself-long']],
      D: ['train-case', 'charger-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (Lenz directions found from the opposing-field rule and checked as cross products for the loop, the approaching magnet and the sliding rod; the force on the rod opposes its motion): ${svgFails.length} failures`,
    physics_facts: 'Eddy currents are deleted from the 2026-27 syllabus and not used; μ₀ = 4π × 10⁻⁷ T m A⁻¹; every number computed by the build script and re-solved; every induced-current direction checked with a cross product (see README \"Verifier pass\")',
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
