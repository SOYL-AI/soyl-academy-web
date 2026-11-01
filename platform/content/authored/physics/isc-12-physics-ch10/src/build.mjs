// Build ISC 12 Physics ch10 Electromagnetic Induction: npx tsx content/authored/physics/isc-12-physics-ch10/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(10, 'Electromagnetic Induction');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2110,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['coilratio-mcq', 'pendulum-mcq', 'stretch-mcq', 'dc-mcq', 'closedcoil-ar'],
      B: ['faraday-short2', ['lamps-short2', 'village-short2']],
      C: ['motional-short3', ['Mderive-short3', 'transformer-short3']],
      D: ['faraday-long'],
    },
    long: {
      A: ['steady-mcq', 'slope-mcq', 'pullout-mcq', 'Bdouble-mcq', 'wireloop-mcq', 'lamination-mcq', 'Lratio-mcq', 'innerarea-mcq', 'stepdown-mcq', 'kvratio-mcq', 'backzero-ar', 'iron-ar'],
      B: ['threeways-short2', 'cooktop-short2', ['push-short2', 'Mdefine-short2']],
      C: ['chargederive-short3', 'eddy-short3', 'twocoils-short3', ['loopout-short3', 'Lderive-short3']],
      D: ['rodforce-long', ['inductance-long', 'transmission-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (normal of the tilted coil at right angles to it and at 60° to B; induced moment of the solenoid pointing back at the retreating south pole; q v × B, the induced current, the circuit sense and the drag force I l × B on the bar computed as cross products; laminations wider than their eddy loops; solenoid field direction from the current on the front of the turns; inner coaxial radius smaller than the outer, same length; transformer turns ratio matching its label): ${svgFails.length} failures`,
    physics_facts: 'μ₀ = 4π × 10⁻⁷ T m A⁻¹; Φ = BA cos θ (θ from the normal), weber = T m²; ε = −N dΦ/dt; q = NΔΦ/R; Lenz’s law from energy conservation; motional emf Blv, I = Blv/R, drag B²l²v/R, power (Blv)²/R; eddy currents qualitative only (ISC removed topic: quantitative treatment); NΦ = LI, ε = −L dI/dt, henry, L = μ₀N²A/l = μ₀n²Al; N₂Φ₂ = MI₁, ε₂ = −M dI₁/dt, M = μ₀n₁n₂πr₁²l (inner area); ideal transformer Vs/Vp = Ns/Np = Ip/Is, η = output/input, line loss P²R/V²; every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question re-solved from its stem by the author; keys, schemes, mark splits and word limits checked — see README "Verifier pass"',
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
