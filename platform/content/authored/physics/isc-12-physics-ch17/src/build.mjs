// Build ISC 12 Physics ch17 Wave Optics: Interference and Diffraction:
//   npx tsx content/authored/physics/isc-12-physics-ch17/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(17, 'Wave Optics: Interference and Diffraction');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, FRINGE_CHECK, SS_CHECK, ENV_CHECK } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const plotFails = [['fringe plot: equal slits 4I₀ at y = 0 and zero at y = β/2; unequal slits 2.25 and 0.25', FRINGE_CHECK], ['single-slit plot: 1 at the centre, zeros at ±3.5 and ±7.0 mrad', SS_CHECK], ['envelope plot: envelope zero at λ/a = 8.0 mrad', ENV_CHECK]]
  .filter(([, ok]) => ok !== true)
  .map(([m]) => `FAIL ${m}`);
const svgFails = [...SELF_CHECKS.filter((l) => l.startsWith('FAIL')), ...plotFails];
const report = writeChapter({
  dir,
  seed: 2117,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['envelope-mcq', 'diamond-mcq', 'change-mcq', 'mincount-mcq', 'narrow-ar'],
      B: ['headlamp-short2', ['sketch-short2', 'widen-short2']],
      C: ['ydse-short3', ['refract-short3', 'halves-short3']],
      D: ['huygens-long'],
    },
    long: {
      A: ['wfline-mcq', 'amp-mcq', 'mirrorwf-mcq', 'brightpick-mcq', 'phasepath-mcq', 'spoil-mcq', 'count-mcq', 'unequal-mcq', 'angwidth-mcq', 'compare-mcq', 'coherent-ar', 'dark-ar'],
      B: ['huygens-short2', 'contrastchange-short2', ['tirhuy-short2', 'ssds-short2']],
      C: ['phase-short3', 'liquid-short3', 'meter-short3', ['reflect-short3', 'slitcalc-short3']],
      D: ['ydse-long', ['intensity-long', 'singleslit-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length + 3} diagram and plot self-checks (wavefronts: rays normal to the drawn wavefronts; Huygens construction: the new spherical and plane wavefronts touch every drawn wavelet of radius vt; reflection: BC = AE gives equal wavefront angles and right angles at B and E; refraction air → liquid (worked example 1) and glass → air: sin i / sin r = v₁/v₂ from the drawn lengths, EC tangent to the wavelet, the wavelet outgrowing AC beyond 41.8°; superposition: drawn resultant = sum, peaks a₁ + a₂ and a₁ − a₂; Young’s geometry: S₂N = d sin θ exactly, and the exact path difference at y = 4β equals 4λ to 1 part in 10⁴ for worked example 4; fringe strips: double-slit maxima at nβ and zeros at (n + ½)β, single-slit zeros at ±5.6 and ±11.2 mm; single slit: marked path differences a sin θ and (a/2) sin θ; central maximum: computed profile zero where the ±θ₁ lines meet the screen; the three plots computed point by point): ${svgFails.length} failures`,
    physics_facts: 'Wavefronts: spherical (I ∝ 1/r²), cylindrical (I ∝ 1/r), plane; Huygens’ principle with forward envelope; laws of reflection and refraction proved with Huygens’ construction (sin i / sin r = v₁/v₂ = n₂/n₁), frequency unchanged and λ/n in a medium, no refracted wave when the wavelet outgrows AC; superposition, φ = 2πΔ/λ, bright Δ = nλ and dark Δ = (2n − 1)λ/2; coherent sources and conditions for sustained interference; I = I₁ + I₂ + 2√(I₁I₂) cos φ and I = 4I₀ cos²(φ/2) quoted, not derived (the wave-equation deduction is an ISC removed topic); Young: Δ = d sin θ ≈ yd/D, bright nλD/d, dark (2n − 1)λD/2d, β = λD/d, angular width λ/d, β/n in a medium, white-light fringes; single slit at the elementary qualitative level (removed topic beyond that): minima a sin θ = nλ, secondary maxima near (n + ½)λ, first secondary maximum under 1/20 of the centre, central maximum 2λ/a and 2λD/a; refraction through prisms and lenses by Huygens’ theory (removed) and polarisation (not in this ISC chapter) are not included; every number computed by the build script and re-solved (see README)',
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
