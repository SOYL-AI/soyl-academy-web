// Build ISC 12 Physics ch19 Atoms:
//   npx tsx content/authored/physics/isc-12-physics-ch19/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(19, 'Atoms');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2119,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['vacuum-mcq', 'increase-mcq', 'visible-mcq', 'limitwave-mcq', 'stops-ar'],
      B: ['negative-short2', ['absorb-short2', 'claim-short2']],
      C: ['closest-short3', ['identify-short3', 'energy-short3']],
      D: ['bohr-long'],
    },
    long: {
      A: ['plum-mcq', 'largeangle-mcq', 'protonspeed-mcq', 'fraction-mcq', 'postulate-mcq', 'momentum-mcq', 'photon-mcq', 'scaling-mcq', 'transitionchange-mcq', 'series63-mcq', 'radius-ar', 'coldgas-ar'],
      B: ['collapse-short2', 'speed-short2', ['kinetic-short2', 'ir-short2']],
      C: ['detectors-short3', 'radius-short3', 'rydberg-short3', ['rfromlines-short3', 'minus0378-short3']],
      D: ['gm-long', ['spectrum-long', 'star-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (constants: k e² = 1.44 MeV fm, first-principles Bohr r₁, v₁, E₁ within 1% of 0.53 Å, 2.2 × 10⁶ m/s, 13.6 eV, Rydberg wavelengths equal hc/ΔE with hc = 1240 eV nm; Geiger–Marsden detector on its circle at 135°; α paths integrated under the Coulomb force: the head-on particle turns back at d, deflections agree with the Coulomb-orbit result and fall as the aim moves away; collapse spiral: radius falls and frequency rises throughout; Bohr orbits drawn 1 : 4 : 9 : 16 with tangent speed arrows ∝ 1/n and table values computed; energy levels to scale with arrow lengths equal to the gaps and the 12.09 eV cascade closing; schematic levels ordered with shrinking gaps and 20 transitions each ending on its series level; wavelength strip at log λ with Balmer 3–6 visible, 7 → 2 ultraviolet and the Paschen–Brackett and Brackett–Pfund overlaps): ${svgFails.length} failures`,
    physics_facts: 'Thomson model and its prediction; Geiger–Marsden experiment (vacuum, thin gold foil, ZnS scintillation screen and microscope turned round the foil), its three observations and Rutherford’s conclusions; distance of closest approach d = (1/4πε₀)(2Ze²/K) as an upper limit to the nuclear radius (nuclei 10⁻¹⁵–10⁻¹⁴ m, atoms 10⁻¹⁰ m); limitations of Rutherford’s model (radiating electron, collapse, continuous spectrum); the mathematical theory of α scattering (impact parameter, Rutherford’s formula) is an ISC removed topic, so trajectories are drawn but not examined; Bohr’s three postulates; r_n = ε₀n²h²/(πme²) = 0.53n² Å and v_n = e²/(2ε₀nh) = 2.2 × 10⁶/n m/s derived; K = e²/(8πε₀r), U = −e²/(4πε₀r), E = −e²/(8πε₀r), E_n = −13.6/n² eV, negative energy as binding, ionisation and excitation energies; energy-level diagram; Lyman, Balmer, Paschen, Brackett and Pfund series with regions; 1/λ = R(1/n₁² − 1/n₂²), R = me⁴/(8ε₀²ch³) = 1.097 × 10⁷ m⁻¹; series limits, line counts n(n − 1)/2, absorption only from n = 1 in cool gas; limitations of Bohr’s model; the orbital magnetic moment of the Bohr electron is in ch08 and nuclei in ch20; every number computed by the build script and re-solved (see README)',
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
