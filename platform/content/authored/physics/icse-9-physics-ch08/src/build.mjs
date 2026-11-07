// Build ICSE 9 Physics ch08 Reflection of Light at Plane Mirrors:
//   npx tsx content/authored/physics/icse-9-physics-ch08/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-physics-ch01/src/lib.mjs';

setChapter(8, 'Reflection of Light at Plane Mirrors', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
if (process.env.CH_OUT) fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
const report = writeChapter({
  dir,
  seed: 90808,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['im-mcq1', 'im-mcq2', 'im-mcq3', 'pm-mcq1', 'lw-ar', 'pm-short2b', 'im-short3a'],
      B: [['long-law', 'long-peri']],
    },
    long: {
      A: ['lw-mcq1', 'lw-mcq2', 'lw-mcq3', 'lw-mcq5', 'lw-mcq6', 'im-mcq5', 'im-mcq6', 'pm-ar2', 'lw-short2c', 'lw-short2d', 'im-short2c', 'lw-short3b', 'lw-short3'],
      B: [['long-boy', 'long-par', 'long-incl']],
    },
  },
  checksExtra: {
    physics_facts: 'Laws of reflection (angle of incidence equals angle of reflection, both measured from the normal; incident ray, reflected ray and normal in one plane) and the pin experiment, the image in a plane mirror (virtual, erect, same size, as far behind as the object is in front, laterally inverted), uses (periscope, kaleidoscope), images in two parallel mirrors (infinite in principle, fainter each time) and in two inclined mirrors (n = 360/theta - 1 for an even quotient or an object on the bisector; n = 360/theta for an odd quotient with the object off the bisector), checked against the ICSE 2028 Physics syllabus Class IX (Light)',
    computed_values: 'Ray geometry (every drawn ray obeys the law of reflection), image positions in parallel and inclined mirrors, image counts and all distances and angles are computed and asserted in src/calc.mjs and src/svgs.mjs, not typed in',
    icse_style: 'Assertion-reason items use the 521 option order; 1-mark terms, fill-ins and a 5-pair match; numericals with working; 10-mark structured questions in parts (three with lettered A to E figures); chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-08: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
