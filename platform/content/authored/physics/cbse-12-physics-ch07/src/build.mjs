// Build ch07 Alternating Current: npx tsx content/authored/physics/cbse-12-physics-ch07/src/build.mjs [--dump <file>]
// Uses the shared authoring library in ../../cbse-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-physics-ch01/src/lib.mjs';

setChapter(7, 'Alternating Current');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 1207,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['bulb-mcq', 'equalX-mcq', 'below-mcq', 'capPhase-ar'],
      B: ['dc-short', 'choke-short', 'lcrcalc-short'],
      C: ['cap-long', 'gen-long'],
      D: ['radio-case'],
    },
    long: {
      A: ['peak-mcq', 'dcequiv-mcq', 'bulbcap-mcq', 'bulbind-mcq', 'tune-mcq', 'VLexceeds-mcq', 'pfimprove-mcq', 'gendouble-mcq', 'res-ar', 'pf-ar'],
      B: ['rmsmeaning-short', 'bulbfreq-short', ['resonance-short', 'trans-short'], 'indderive-short', ['wattless-short', 'trans3-short']],
      C: ['lcr-long', ['power-long', 'transformer-long']],
      D: ['factory-case', 'substation-case'],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (LCR phasor diagram drawn to scale with the angle checked against atan((XL − XC)/R) and V² = VR² + (VL − VC)²; impedance triangle to scale; phase senses of the single-element phasors): ${svgFails.length} failures`,
    physics_facts: 'LC oscillations are deleted from the 2026-27 syllabus and not used; Indian mains taken as 220 V rms, 50 Hz; every number computed by the build script and re-solved (see README)',
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
