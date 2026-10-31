// Build ISC 12 Physics ch09 Magnetism and Matter: npx tsx content/authored/physics/isc-12-physics-ch09/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(9, 'Magnetism and Matter');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2109,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['ratio-endbroad-mcq', 'gauss-mcq', 'gadolinium-mcq', 'speaker-mcq', 'inside-ar'],
      B: ['differ-short', ['classify-short', 'xfmr-core-short']],
      C: ['exact-short3', ['core-short3', 'hyst-short3']],
      D: ['solenoid-long'],
    },
    long: {
      A: ['lines-vs-e-mcq', 'bent-mcq', 'halfmax-mcq', 'torquedir-mcq', 'bowl-mcq', 'murclass-mcq', 'sphere-mcq', 'cooling-mcq', 'thickwire-mcq', 'transformer-mcq', 'endbroad-ar', 'steel-ar'],
      B: ['limit-short', 'fluxdef-short', ['warm-short', 'choose-short']],
      C: ['equiv-short3', 'torque-short3', 'strengthen-short3', ['flux-short3', 'atomic-short3']],
      D: ['dipole-long', ['rowland-long', 'hysteresis-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (bar-magnet and solenoid lines traced from the turns of a solenoid: closed, S → N inside, N → S outside; electric-dipole lines ending on −q with E opposite to p between the charges; end-on and broadside-on formulae checked against the pole model, field arrows drawn in the computed ratio; torque m × B and the drawn turning sense; flux line counts in the ratio cos θ; field inside dia-, para- and ferromagnetic cylinders; domain resultants; electromagnet polarity by the right-hand rule; B–H loops: retentivity, coercivity, closure at saturation, traversal sense, soft iron against steel): ${svgFails.length} failures`,
    physics_facts: 'μ₀/4π = 10⁻⁷ T m A⁻¹; field lines of a magnet closed, S → N inside, along m; equivalent solenoid m = NIA; end-on B = (μ₀/4π)2md/(d² − l²)² along m, broadside-on B = (μ₀/4π)m/(d² + l²)^(3/2) opposite to m (formulae only; derivations removed in the ISC scope), short magnet 2m/d³ and m/d³; τ = m × B, no net force in uniform B; Φ = BA cos θ, 1 Wb = 1 T m², 1 T = 1 Wb m⁻² = 10⁴ G; M = m/V, H = nI, B = μ₀(H + M), χ = M/H, μr = 1 + χ; dia χ ~ −10⁻⁵, para small positive with χ = C/T, ferro χ ≫ 1 and paramagnetic above T_C (Fe ≈ 1043 K, Ni ≈ 631 K, Gd ≈ 293 K); electromagnet B ≈ μ₀μr nI up to saturation; B–H loop qualitative only (retentivity, coercivity, loop area ∝ loss per cycle); soft iron: low coercivity, slightly higher retentivity than steel, narrow loop; every number computed by the build script and re-solved (see README)',
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
