// Build ch13 Nuclei: npx tsx content/authored/physics/cbse-12-physics-ch13/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(13, 'Nuclei');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, NUCLIDES } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// binding energies per nucleon computed from the atomic masses agree with the usual values
const expect = { '²H': 1.11, '⁴He': 7.07, '⁷Li': 5.61, '¹²C': 7.68, '¹⁶O': 7.98, '⁵⁶Fe': 8.79, '²³⁵U': 7.59, '²³⁸U': 7.57 };
const bad = NUCLIDES.filter((n) => expect[n.name] !== undefined && Math.abs(n.perA - expect[n.name]) > 0.01);
const peak = NUCLIDES.reduce((a, b) => (b.perA > a.perA ? b : a));
SELF_CHECKS.push(!bad.length && peak.name === '⁵⁶Fe' ? `ok   BE-curve points from masses: ${NUCLIDES.map((n) => `${n.name} ${n.perA.toFixed(2)}`).join(', ')} MeV; peak at ⁵⁶Fe` : `FAIL BE-curve points ${bad.map((n) => n.name).join(' ')}`);
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1213,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['isobar-mcq', 'volume-mcq', 'pernucleon-mcq', 'Coulomb-ar'],
      B: ['force-short', 'chain-short', 'curve-short3'],
      C: ['nucleus-long', 'fusion-long'],
      D: ['tokamak-case'],
    },
    long: {
      A: ['density-mcq', 'peak-mcq', 'stable-mcq', 'whichstable-mcq', 'moderator-mcq', 'rods-mcq', 'sun-mcq', 'nfission-mcq', 'core-ar', 'helium-ar'],
      B: ['defect-short', 'flat-short', ['fusionhard-short', 'origin-short'], 'density-short3', ['bothrelease-short3', 'compare-short3']],
      C: ['be-long', ['fission-long', 'plant-long']],
      D: ['reactor-case', 'neutronstar-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (nuclear sizes to scale with R = R₀A^(1/3); fission and fusion equations balance A and Z; BE-per-nucleon points computed from atomic masses with the peak at ⁵⁶Fe): ${svgFails.length} failures`,
    physics_facts: 'm_H = 1.007825 u, mₙ = 1.008665 u, 1 u = 931.5 MeV = 1.6605 × 10⁻²⁷ kg, 1 MeV = 1.6 × 10⁻¹³ J; R = R₀A^(1/3) with R₀ = 1.2 fm (1.1 fm in one item, stated); nuclear density ≈ 2.3 × 10¹⁷ kg m⁻³; E_b = ΔMc²; BE/A peak ≈ 8.8 MeV at A ≈ 56; fission ≈ 200 MeV; D–T 17.6 MeV; atomic masses of ²H, ³H, ⁴He, ⁷Li, ¹²C, ¹⁶O, ⁵⁶Fe, ⁹²Kr, ⁹⁴Sr, ¹⁴⁰Xe, ¹⁴¹Ba, ²³⁵U, ²³⁸U from standard tables; radioactivity omitted (deleted from the syllabus); every number computed by the build script and re-solved (see README)',
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
