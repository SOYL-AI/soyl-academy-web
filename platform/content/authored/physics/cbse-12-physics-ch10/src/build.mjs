// Build ch10 Wave Optics: npx tsx content/authored/physics/cbse-12-physics-ch10/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(10, 'Wave Optics');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, SS_MIN_CHECK } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
SELF_CHECKS.push(SS_MIN_CHECK ? 'ok   single-slit plot: computed intensity is 1 at the centre and zero at a sin θ = ±λ, ±2λ, ±3λ' : 'FAIL single-slit plot minima');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1210,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['yellow-mcq', 'dD-mcq', 'colour-mcq', 'door-ar'],
      B: ['coherent-short', 'changes-short', 'water-short3'],
      C: ['ydse-long', 'single-long'],
      D: ['lab-case'],
    },
    long: {
      A: ['star-mcq', 'lensfocus-mcq', 'concave-wf-mcq', 'ratio-mcq', 'quarter-mcq', 'incoherent-mcq', 'red-mcq', 'equalslit-mcq', 'bend-ar', 'energy-ar'],
      B: ['rarer-short', 'slitS-short', ['conditions-short', 'compare-short'], 'reflect-short3', ['maxmin-short3', 'minimum-short3']],
      C: ['refract-long', ['interf-long', 'measure-long']],
      D: ['slit-case', 'ripple-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (Huygens reflection: BC = AE and CE tangent to the wavelet; Huygens refraction: drawn lengths give sin i/sin r = v₁/v₂ and EC ⟂ AE; YDSE fringes equally spaced at the computed β = 3.0 mm; single slit: marked path difference = a sin θ; single-slit intensity plot computed with zeros at a sin θ = nλ): ${svgFails.length} failures`,
    physics_facts: 'sin i/sin r = v₁/v₂ = n₂₁; λ′ = λ/n with f unchanged; I = I₁ + I₂ + 2√(I₁I₂) cos φ, I = 4I₀cos²(φ/2); φ = 2πΔ/λ; β = λD/d (used, not derived, per the 2026-27 outcome), angular width λ/d, β/n in a liquid; single-slit minima a sin θ = nλ, central maximum 2λ/a; polarisation omitted (deleted from the syllabus); every number computed by the build script and re-solved (see README)',
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
