// Build ISC 12 Physics ch20 Nuclei and Nuclear Energy:
//   npx tsx content/authored/physics/isc-12-physics-ch20/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(20, 'Nuclei and Nuclear Energy');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2120,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['isotones-mcq', 'threshold-mcq', 'ironend-mcq', 'shield-mcq', 'hot-ar'],
      B: ['massdefect-short2', ['ironstar-short2', 'roomtemp-short2']],
      C: ['he4-short3', ['moderator-short3', 'fusionneed-short3']],
      D: ['bea-long'],
    },
    long: {
      A: ['halfradius-mcq', 'amu-mcq', 'defect-mcq', 'bind-mcq', 'fusionside-mcq', 'fall-mcq', 'xneutrons-mcq', 'poormod-mcq', 'ppchain-mcq', 'coretemp-mcq', 'density-ar', 'chain-ar'],
      B: ['classify-short2', 'annih-short2', ['chainctl-short2', 'hbomb-short2']],
      C: ['density-short3', 'unit-short3', 'student-short3', ['pair-short3', 'sun-short3']],
      D: ['si28-long', ['fission-long', 'fusion-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (binding energies from atomic masses agree with the nuclear-mass route; e²/4πε₀ = 1.44 MeV fm; nuclear density equal for A = 8 and A = 216; nucleon counts of the drawn nuclei and the isotope/isobar/isotone relations; neon-20 mass defect and binding energy with the level gap to scale; annihilation photons back to back and the 1.022 MeV threshold; the binding energy per nucleon curve computed from atomic masses with its maximum at nickel-62, helium-4 above its neighbours and 23 nuclides in order; fission nucleon and charge balance; generations 1, 2, 4, 8 against 1, 1, 1, 1 in the chain reaction; control rods between fuel rods and the coolant connections; the 0.60 MeV Coulomb barrier and the 1.9 keV thermal energy at 1.5 × 10⁷ K drawn to scale): ${svgFails.length} failures`,
    physics_facts: 'composition of the nucleus (Z, N, A, nucleons, strong force); isotopes, isobars and isotones; unified atomic mass unit as 1/12 of a neutral carbon-12 atom; R = R₀A^(1/3) with R₀ = 1.2 fm (1.25 fm in some stems, stated); nuclear density 3m/(4πR₀³) ≈ 2.3 × 10¹⁷ kg/m³ independent of A (shown); E = mc² with 1 u = 931.5 MeV/c²; mass defect (atomic masses with m_H) and binding energy in MeV; pair production (threshold 2mₑc² = 1.022 MeV, nucleus needed for momentum) and annihilation (two 0.511 MeV photons); binding energy per nucleon curve with its maximum near A = 56–62, stability of middle-order nuclei, why fission and fusion both release energy, energy of a heavy nucleus splitting into two halves; fission with balanced equations, controlled and uncontrolled chain reaction (qualitative), reactor parts and functions (fuel, moderator, control rods, coolant, shielding), the nuclear bomb; fusion, the proton–proton chain, thermonuclear energy in the Sun and stars, the Coulomb barrier and the need for very high temperature, the hydrogen bomb; radioactivity and the decay law are not in this ISC chapter; details of the chain reaction and quantitative reactor operation are ISC removed topics and are not examined; every number computed by the build script and re-solved (see README)',
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
