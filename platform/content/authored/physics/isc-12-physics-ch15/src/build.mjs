// Build ISC 12 Physics ch15 Refraction at Spherical Surfaces and Thin Lenses:
//   npx tsx content/authored/physics/isc-12-physics-ch15/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(15, 'Refraction at Spherical Surfaces and Thin Lenses');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2115,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['surfacefocus-mcq', 'lmform-mcq', 'concave-mcq', 'contactnature-mcq', 'planemirror-ar'],
      B: ['mag-short2', ['lensdrop-short2', 'comboeval-short2']],
      C: ['contact-short3', ['rodimage-short3', 'separated-short3']],
      D: ['surface-long'],
    },
    long: {
      A: ['surfsign-mcq', 'nearsurface-mcq', 'biconcave-mcq', 'cs2-mcq', 'powersign-mcq', 'graph-mcq', 'magsign-mcq', 'contact8-mcq', 'virtualobj-mcq', 'mirrorlens-mcq', 'surface-ar', 'power-ar'],
      B: ['twofoci-short2', 'virtualobj-short2', ['paperweight-short2', 'biconcave-short2']],
      C: ['liquidfind-short3', 'displacement-short3', 'lensmirror-short3', ['sphere-short3', 'liquidlens-short3']],
      D: ['lensmaker-long', ['twolens-long', 'lensmirror-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (the single-surface figure: an exact Snell’s-law ray with i = α + γ and r = γ − β in the drawn triangles and the normal through C; the glass-rod example drawn with the paraxial ray rules, its three rays meeting at v = +36 cm with m = −1; four lens shapes whose drawn centres of curvature give the stated signs of R₁ and R₂ and whose lens maker sign matches converging or diverging; the lens maker figure, two surfaces traced in turn, within 5% of the thin-lens image; convex and concave lens examples, contact pair, two separated lenses, auto-collimation and the lens-with-plane-mirror example, each traced with a paraxial ray tracer whose rays meet at the image from the formulas): ${svgFails.length} failures`,
    physics_facts: 'New Cartesian sign convention (distances from the pole or optical centre, positive along the incident light; real object u < 0; R positive when the centre of curvature lies on the outgoing side; converging lens f > 0); n₂/v − n₁/u = (n₂ − n₁)/R derived only for a convex surface facing the rarer medium with a real image (ISC removed list), used with signs elsewhere; m = n₁v/(n₂u) for a surface; f₂ = n₂R/(n₂ − n₁), f₁ = −n₁R/(n₂ − n₁); lens maker’s formula and 1/v − 1/u = 1/f derived for a biconvex lens, extended to biconcave, plano-convex and a lens in a liquid (n replaced by n/n_m); m = v/u; P = 1/f (m) in dioptres; lenses in contact 1/F = 1/f₁ + 1/f₂, P = P₁ + P₂ (derived); separated lenses with u₂ = v₁ − d and m = m₁m₂; lens with a plane, concave or convex mirror (separate mirror only: silvered lenses are removed in ISC); optical instruments are left to ch16; every number computed by the build script and re-solved (see README)',
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
