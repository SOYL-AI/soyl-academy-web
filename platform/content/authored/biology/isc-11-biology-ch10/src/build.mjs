// Build ISC 11 Biology ch10 Cell: The Unit of Life: npx tsx content/authored/biology/isc-11-biology-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(10, 'Cell: The Unit of Life', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1101,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cubes-mcq', 'symport-mcq', 'ser-mcq', 'nucleolus-mcq', 'virchow-ar'],
      B: ['active-short2', ['golgi-short2', 'axoneme-short2']],
      C: ['pk-short3', ['secretion-short3', 'envelope-short3']],
      D: ['fmm-long'],
    },
    long: {
      A: ['hooke-mcq', 'shared-mcq', 'mem-d-mcq', 'diffusion-mcq', 'antiport-mcq', 'middle-mcq', 'rer-mcq', 'tomato-mcq', 'centriole-mcq', 'chr-sat-mcq', 'wall-ar', 'cilia-ar'],
      B: ['theory-short2', 'ser-short2', ['mito-short2', 'cytoskeleton-short2']],
      C: ['pa-short3', 'fmm-short3', 'coord-short3', ['micro-short3', 'chrtype-short3']],
      D: ['endo-long', ['organelle-long', 'nucleus-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Cell theory and Virchow’s modification, size and shape (surface-to-volume ratio), prokaryotic versus eukaryotic and plant versus animal cells, cell wall and plasmodesmata, the fluid mosaic model (Singer and Nicolson), passive and active transport with uniport, symport and antiport, the endomembrane system, mitochondria, plastids, ribosomes and microbodies, the cytoskeleton, the 9 + 2 axoneme and the centriole, the nucleus and the four chromosome types with the satellite, checked against the ISC 2028 Biology syllabus (Class XI portion) — see README "For a reviewer"',
    counting_rules: 'Surface-to-volume ratios, transport rates, marker-enzyme shares, scale-bar sizes, microtubule counts and karyotype totals are computed and asserted in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    verifier_pass: 'Every question, case part and alternative re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
