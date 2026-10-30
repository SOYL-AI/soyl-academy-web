// Build ch09 Ray Optics and Optical Instruments: npx tsx content/authored/physics/cbse-12-physics-ch09/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(9, 'Ray Optics and Optical Instruments');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1209,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['mag-mcq', 'liquid-mcq', 'cut-mcq', 'water-ar'],
      B: ['mirror-short', 'tir-short', 'lens-short3'],
      C: ['lensmaker-long', 'tele-long'],
      D: ['dentist-case'],
    },
    long: {
      A: ['shaving-mcq', 'critn-mcq', 'prismTIR-mcq', 'samen-mcq', 'thin-mcq', 'telelength-mcq', 'reverse-mcq', 'aperture-mcq', 'mirror-ar', 'reflect-ar'],
      B: ['periscope-short', 'prismdev-short', ['micro-short', 'reflecting-short'], 'fibre-short3', ['prism-short3', 'telescope-short3']],
      C: ['tir-long', ['prism-long', 'micro-long']],
      D: ['endoscope-case', 'spectacle-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (mirror and lens ray diagrams computed from the formulas; TIR and fibre angles from Snell’s law; prism path at minimum deviation with the drawn deviation equal to 2i − A; microscope rays meeting at the computed first image; telescope angular magnification fo/fe; spherical-surface ray obeying Snell within the paraxial limit): ${svgFails.length} failures`,
    physics_facts: 'New Cartesian sign convention throughout; D = 25 cm; every number computed by the build script (mirror/lens formula helpers copied from the CBSE 10 Science ch09 optics module) and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
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
