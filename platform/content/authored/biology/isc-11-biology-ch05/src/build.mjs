// Build ISC 11 Biology ch05 Animal Kingdom: npx tsx content/authored/biology/isc-11-biology-ch05/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(5, 'Animal Kingdom', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1105,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['sym-mcq', 'platy-mcq', 'cyclo-mcq', 'aves-mcq', 'frog-ar'],
      B: ['chord-short2', ['cnid-short2', 'echin-short2']],
      C: ['identify-short3', ['sponge-short3', 'arthro-short3']],
      D: ['plan-long'],
    },
    long: {
      A: ['coel-fig-mcq', 'coel-fig2-mcq', 'diplo-mcq', 'metam-mcq', 'nema-mcq', 'cteno-mcq', 'levels-mcq', 'mollusc-mcq', 'chondr-mcq', 'mamm-mcq', 'cavity-ar', 'cyclo-ar'],
      B: ['sym-short', 'annel-short2', ['subphyla-short2', 'oper-short2']],
      C: ['platy-short3', 'echin-short3', 'cnid-short3', ['platypus-short3', 'fish-short3']],
      D: ['vert-long', ['sponge-long', 'chordate-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Basis of classification (organisation, symmetry, germ layers, coelom, segmentation), ten non-chordate phyla, Chordata (notochord and the three subphyla) and the seven vertebrate classes checked against the ISC 2028 Biology syllabus (Class XI portion) — see README "For a reviewer"',
    counting_rules: 'The phylum feature table, the pond sample, the zoo list, comb-plate, tube-foot, parapodia and gill-slit counts and the heart-chamber sums are computed and asserted in src/calc.mjs (eq), not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    content_gate: 'npm run content -- lint, verify and originality for this chapter: see README "Verifier pass"',
    verifier_pass: '2026-11-02: every question re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
