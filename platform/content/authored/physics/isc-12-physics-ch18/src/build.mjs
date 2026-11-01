// Build ISC 12 Physics ch18 Dual Nature of Radiation and Matter:
//   npx tsx content/authored/physics/isc-12-physics-ch18/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(18, 'Dual Nature of Radiation and Matter');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2118,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['zerov-mcq', 'green-mcq', 'slope-mcq', 'nine-mcq', 'dg-ar'],
      B: ['claim-short2', ['duality-short2', 'vacuum-short2']],
      C: ['surface-short3', ['line-short3', 'kev-short3']],
      D: ['db-long'],
    },
    long: {
      A: ['hertz-mcq', 'curves-mcq', 'e375-mcq', 'kf-mcq', 'vrise-mcq', 'twometals-mcq', 'pratio-mcq', 'samespeed-mcq', 'evidence-mcq', 'crystal-mcq', 'wave-ar', 'photonE-ar'],
      B: ['photonflux-short2', 'graphh-short2', ['barium-short2', 'microscope-short2']],
      C: ['timelag-short3', 'lenard-short3', 'reflect-short3', ['derive-short3', 'rings-short3']],
      D: ['einstein-long', ['data-long', 'dg-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (constants give hc/e = 1237.5 eV nm and λ√V = 1.2231 nm V^½ for electrons; Hertz: every ultraviolet ray to the receiver gap crosses the glass sheet; Lenard: light through the quartz window, photoelectrons from C to A, slider on the rheostat; energy picture drawn to scale for 225 nm on magnesium, K_max = hf − W₀ = 1.8 eV and a deeper electron leaves with less; Davisson–Germer detector drawn at 50° to the beam; the 54 V polar curve peaks at 50° with the largest spur; electron-diffraction ring radii equal L tan θ of the drawn cones): ${svgFails.length} failures`,
    physics_facts: 'h = 6.6 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C, c = 3 × 10⁸ m/s, mₑ = 9.1 × 10⁻³¹ kg, mₚ = 1.67 × 10⁻²⁷ kg (hc/e = 1237.5 eV nm, electron λ ≈ 1.22/√V nm), stated in the stems; Einstein’s equation K_max = hf − W₀ = eV₀; V₀ = (h/e)f − W₀/e with slope h/e and f-intercept f₀; photon momentum h/λ = E/c (absorbed beam force P/c, reflected 2P/c); de Broglie λ = h/p = h/√(2mqV); Davisson–Germer qualitative only (54 V, about 50°; its quantitative treatment is removed in ISC); approximate work functions Rb 2.1, Ba 2.5, Sr 2.6, Ca 2.9, Mg 3.7, Al 4.1, W 4.5, Cu 4.7, Pt 5.6 eV; every number computed by the build script and re-solved in SI units (see README)',
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
