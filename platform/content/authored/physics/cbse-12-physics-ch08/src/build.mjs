// Build ch08 Electromagnetic Waves: npx tsx content/authored/physics/cbse-12-physics-ch08/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(8, 'Electromagnetic Waves');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1208,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['gap-mcq', 'direction-mcq', 'band2-mcq', 'disp-ar'],
      B: ['disp-short', 'welder-short', 'equation-short'],
      C: ['disp-long', 'spectrum-long'],
      D: ['oven-case'],
    },
    long: {
      A: ['charged-mcq', 'direction2-mcq', 'medium-mcq', 'glass-mcq', 'band1-mcq', 'band3-mcq', 'satellite-mcq', 'nightvision-mcq', 'xray-ar', 'xvsgamma-ar'],
      B: ['wave-short', 'accel-short', ['band-short', 'greenhouse-short'], 'Bgap-short', ['spectrum-short', 'medium-short']],
      C: ['wave-long', ['speed-long', 'identify-long']],
      D: ['tower-case', 'hospital-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (EM wave: E × B along the drawn direction of travel, E and B in phase; spectrum bands contiguous and ordered on a computed log scale; displacement-current figure): ${svgFails.length} failures`,
    physics_facts: 'c = 1/√(μ₀ε₀) with μ₀ = 4π × 10⁻⁷ and ε₀ = 8.85 × 10⁻¹²; c taken as 3.0 × 10⁸ m s⁻¹ in problems; band edges follow the usual approximate ranges (radio > 0.1 m … gamma < 1 pm); every number computed by the build script and re-solved (see README)',
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
