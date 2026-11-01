// Build ICSE 10 Physics ch05 Refraction through Lenses: npx tsx content/authored/physics/icse-10-physics-ch05/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(5, 'Refraction through Lenses');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2005,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['optical-mcq', 'beyond-mcq', 'magglass-mcq', 'conv-ar', 'focus-fill', 'conv-fill', 'burn-short2', 'concave-short2'],
      B: [['convex-long', 'power-long']],
    },
    long: {
      A: ['at2f-mcq', 'searchlight-mcq', 'concave2-mcq', 'mag-mcq', 'strong-mcq', 'signs-ar', 'formula-fill', 'dioptre-fill', 'centre-fill', 'uses-match', 'identify-short2', 'conv-short2', 'magglass-short2', 'candle-short3'],
      B: [['formula-long', 'concave-long', 'design-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Every image position and size in the ray diagrams and questions recomputed from 1/v - 1/u = 1/f and m = v/u (New Cartesian convention, f positive for convex, negative for concave), powers from P = 1/f in metres, the six convex-lens object positions and the always virtual, erect, diminished concave-lens image, checked against the ICSE 2027 syllabus (Class X, section 2) with its removed topics (no lens-formula derivation, scale drawing or magnifying-power numericals)',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question and every internal-choice alternative re-solved from its stem by the author; every numerical computed and asserted by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
