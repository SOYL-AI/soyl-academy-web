// Build ISC 12 Physics ch21 Semiconductor Electronics:
//   npx tsx content/authored/physics/isc-12-physics-ch21/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(21, 'Semiconductor Electronics: Materials, Diodes and Simple Circuits');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
await import('./questions2.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2121,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['donor-mcq', 'depletion-mcq', 'hwfreq-mcq', 'led-mcq', 'zcur-ar'],
      B: ['ntype-short2', ['revwhy-short2', 'hwbad-short2']],
      C: ['junction-short3', ['roles-short3', 'three-short3']],
      D: ['diode-long'],
    },
    long: {
      A: ['bands-mcq', 'gedetect-mcq', 'holeconduct-mcq', 'fwd-mcq', 'bias-mcq', 'ct-mcq', 'smooth-mcq', 'solar-mcq', 'zener-mcq', 'zload-mcq', 'si-ar', 'fwsmooth-ar'],
      B: ['diamond-short2', 'pdwhy-short2', ['barrier-short2', 'zvi-short2']],
      C: ['bands-short3', 'hwcircuit-short3', 'zload-short3', ['vichar-short3', 'zrange-short3']],
      D: ['fw-long', ['zener-long', 'led-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (band gaps drawn to scale 1 eV = 14 px with conductor < Ge < Si < diamond; bond pictures count electrons: n-type 1 free and no hole, p-type 1 hole and no free electron, intrinsic 1 free + 1 hole; donor/acceptor levels inside the gap near their band; junction ions 9 + 9 neutral, potential monotone rising by V0 and half-way at the junction, carriers only in their regions; bias polarity and depletion widths ordered; diode circuits solved; half-wave output never negative with one hump per cycle; full-wave exactly one diode conducting at each sample and 2 humps per cycle; LED light leaves and photodiode light arrives with the right bias; carriers drift against/along E; solar cell layers; Zener regulator KCL and polarity): ${svgFails.length} failures`,
    physics_facts: 'energy bands qualitative only (crystal structure and quantitative band theory removed); gaps C 5.5 eV, Ge 0.7 eV, Si 1.1 eV; photon cut-off λ = 1240/Eg nm; intrinsic carriers, holes, donors (pentavalent) and acceptors (trivalent), majority and minority carriers, neutrality, σ = e(n μ) numericals; depletion region, barrier V0 0.7 V Si and 0.3 V Ge, forward and reverse bias, reverse current by minority carriers, knee voltage, dynamic resistance, constant-drop diode circuits; half-wave (f) and two-diode centre-tap full-wave (2f) rectifiers, roles of components, filter ripple ΔV = It/C, peak output Vm − 0.7 V (bridge rectifier removed in ISC); LED forward with hν ≈ Eg, photodiode reverse, solar cell unbiased, LED energy saving; Zener breakdown and regulator with I = IZ + IL; transistors and logic gates are not in this ISC entry; every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-02: every question re-solved from its stem by the author; keys, schemes, mark splits checked — see README "Verifier pass"',
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
