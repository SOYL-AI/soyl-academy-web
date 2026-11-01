// Build ISC 12 Physics ch12 Electromagnetic Waves: npx tsx content/authored/physics/isc-12-physics-ch12/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(12, 'Electromagnetic Waves');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2112,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['idrule-mcq', 'EBdir-mcq', 'order-mcq', 'crystal-mcq', 'inphase-ar'],
      B: ['continuity-short2', ['camcam-short2', 'xgnames-short2']],
      C: ['idequal-short3', ['classify-short3', 'sustain-short3']],
      D: ['radar-long'],
    },
    long: {
      A: ['dispsurface-mcq', 'Bloop-mcq', 'transverse-mcq', 'ratio-mcq', 'samespeed-mcq', 'cdepends-mcq', 'fob-mcq', 'baggage-mcq', 'gammasource-mcq', 'irthermo-mcq', 'idsign-ar', 'ozone-ar'],
      B: ['cdvsd-short2', 'chars-short2', ['ovenplate-short2', 'thermalscreen-short2']],
      C: ['chargeplot-short3', 'sketch-short3', 'xrayuse-short3', ['idcalc-short3', 'uvlamp-short3']],
      D: ['disp-long', ['wave-long', 'phone-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (capacitor: the plate the current enters drawn +, E from + to −; B loops round the gap clockwise for i_d into the page, from z × x, with rings inside and outside the plate edge; wave: E × B along the direction of travel, E and B in phase; spectrum bands contiguous and ordered, visible band narrow; atmosphere: each ray ends in the layer its fate says, and the fates match the facts taught): ${svgFails.length} failures`,
    physics_facts: 'μ₀ = 4π × 10⁻⁷ T m A⁻¹, ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻², c = 1/√(μ₀ε₀) = 3.00 × 10⁸ m s⁻¹ (3.0 × 10⁸ used in numericals); i_d = ε₀ dΦE/dt = dq/dt = C dV/dt = ε₀A dE/dt; Ampère–Maxwell law ∮B · dl = μ₀(i + i_d); E ⊥ B ⊥ direction of travel (E × B), E and B in phase, E₀ = cB₀; c = fλ; radar d = ct/2; approximate bands (radio > 30 cm, microwave 1 mm–30 cm, infrared 700 nm–1 mm, visible 400–700 nm, ultraviolet 1–400 nm, X-rays 1 pm–1 nm, gamma < 10 pm, X/gamma overlap named by origin); mathematical treatment of EM waves not examined (ISC removed topic); every number computed by the build script and re-solved (see README)',
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
