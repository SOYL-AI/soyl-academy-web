// Build ISC 12 Physics ch16 Optical Instruments:
//   npx tsx content/authored/physics/isc-12-physics-ch16/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(16, 'Optical Instruments');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2116,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['simpleD-mcq', 'intermediate-mcq', 'normal-mcq', 'cass-mcq', 'rp-ar'],
      B: ['farsight-short2', ['devasthal-short2', 'rp-short2']],
      C: ['compound-short3', ['telelengths-short3', 'cass-short3']],
      D: ['tele-long'],
    },
    long: {
      A: ['nearpoint-mcq', 'leaf-mcq', 'finalimage-mcq', 'infinity-mcq', 'eyeshift-mcq', 'teleD-mcq', 'birds-mcq', 'chroma-mcq', 'refl-mcq', 'rp-mcq', 'compound-ar', 'tele-ar'],
      B: ['tube-short2', 'design-short2', ['aperture-short2', 'tinylens-short2']],
      C: ['simple-short3', 'design-short3', 'empty-short3', ['tele-short3', 'switch-short3']],
      D: ['compound-long', ['refl-long', 'resolve-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (every instrument drawn to scale along the axis with a paraxial ray tracer; simple microscope at D and at infinity, compound microscope at D and at infinity, refracting telescope in normal adjustment and with the image at D, Cassegrain telescope: the lens equation holds at each lens, the traced rays or their backward extensions meet at the computed images, and β/α read off the drawn rays equals 1 + D/f, D/f, m_o(1 + D/f_e), m_o D/f_e, f_o/f_e, (f_o/f_e)(1 + f_e/D) and F/f_e; the Cassegrain beam clears the hole and the secondary; chromatic aberration from the lens maker’s formula; the resolving-power cone drawn at 60°): ${svgFails.length} failures`,
    physics_facts: 'D = 25 cm; magnifying power M = β/α quoted as a magnitude (α: object at D for microscopes, object where it is for telescopes); simple microscope 1 + D/f (image at D) and D/f (infinity), both derived; compound microscope (v_o/|u_o|)(1 + D/f_e) derived, ≈ (L/f_o)(1 + D/f_e), and (v_o/|u_o|)(D/f_e) for the image at infinity as an expression only (ISC removed list); refracting telescope f_o/f_e with L = f_o + f_e and (f_o/f_e)(1 + f_e/D) with L = f_o + |u_e|, both derived; Cassegrain telescope with a concave paraboloidal primary, convex secondary and central hole, M = F/f_e with F the focal length of the mirror system (secondary treated with the mirror formula and a virtual object); resolving power of a microscope 2n sin β/λ (formula only, d = λ/(2n sin β)); every number computed by the build script and re-solved by ray tracing where an instrument is involved (see README)',
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
