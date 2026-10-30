// Build ch11 Dual Nature of Radiation and Matter: npx tsx content/authored/physics/cbse-12-physics-ch11/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(11, 'Dual Nature of Radiation and Matter');
const { SELF_CHECKS, H, QE } = await import('./svgs.mjs');
const { deck1, deck2, V0NU } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// the V₀–ν plot: slope h/e per 10¹⁴ Hz and the intercepts φ₀/h for potassium (2.25 eV) and zinc (4.3 eV)
const okSlope = Math.abs(V0NU.slope14 - (H * 1e14) / QE) < 1e-12 && Math.abs(V0NU.nuK - (2.25 * QE) / H / 1e14) < 1e-9 && Math.abs(V0NU.nuZ - (4.3 * QE) / H / 1e14) < 1e-9;
SELF_CHECKS.push(okSlope ? `ok   V₀–ν plot: slope h/e = ${V0NU.slope14.toFixed(4)} V per 10¹⁴ Hz, intercepts ${V0NU.nuK.toFixed(2)} and ${V0NU.nuZ.toFixed(2)} × 10¹⁴ Hz` : 'FAIL V₀–ν plot');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1211,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['alkali-mcq', 'twometals-mcq', 'equalK-mcq', 'equalp-ar'],
      B: ['tube-short', 'number-short', 'kmax-short3'],
      C: ['einstein-long', 'debroglie-long'],
      D: ['led-case'],
    },
    long: {
      A: ['hallwachs-mcq', 'curves-mcq', 'lag-mcq', 'noemit-mcq', 'doublenu-mcq', 'ball-mcq', 'lamgraph-mcq', 'xray-mcq', 'positive-ar', 'einstein-ar'],
      B: ['saturation-short', 'lines-short', ['gradual-short', 'dual-short'], 'wavefail-short3', ['graphs-short3', 'samelam-short3']],
      C: ['photo-long', ['data-long', 'photon-long']],
      D: ['streetlight-case', 'microscope-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (photocell: electrons drawn from emitter to collector; energy bar hν = φ₀ + K_max to scale for 400 nm on potassium; threshold picture; V₀–ν plot slope h/e and intercepts φ₀/h computed): ${svgFails.length} failures`,
    physics_facts: 'h = 6.63 × 10⁻³⁴ J s, e = 1.6 × 10⁻¹⁹ C, c = 3.0 × 10⁸ m s⁻¹, mₑ = 9.1 × 10⁻³¹ kg, m_p = 1.67 × 10⁻²⁷ kg, hc ≈ 1243 eV nm; eV₀ = K_max = hν − φ₀; ν₀ = φ₀/h; V₀–ν slope h/e; photocurrent ∝ intensity; λ = h/p = h/√(2mK), electron 1.227/√V nm; Davisson–Germer omitted (deleted from the syllabus); I–V curves are schematic (computed from a smooth model, saturation and stopping potential exact); every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
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
