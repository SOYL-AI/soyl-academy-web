// Build ISC 11 Biology ch08 Anatomy of Flowering Plants: npx tsx content/authored/biology/isc-11-biology-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(8, 'Anatomy of Flowering Plants', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1108,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['root-apical-mcq', 'coll-mcq', 'cambium-mcq', 'palisade-mcq', 'ar-xylem'],
      B: ['system-short2', ['endo-short2', 'root-short2']],
      C: ['xyl-phl-short3', ['dleaf-short3', 'epidermal-short3']],
      D: ['dstem-long'],
    },
    long: {
      A: ['bamboo-mcq', 'stone-mcq', 'aphid-mcq', 'epi-mcq', 'endo-mcq', 'exarch-mcq', 'pericycle-mcq', 'stem-fig1-mcq', 'leaf-fig1-mcq', 'bulliform-mcq', 'ar-coll', 'ar-leaf'],
      B: ['apical-short2', 'phloem-short2', ['stem-short2', 'guard-short2']],
      C: ['simple-short3', 'root-short3', 'mstem-short3', ['stemcomp-short3', 'mleaf-short3']],
      D: ['dleaf-long', ['mstem-long', 'droot-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Meristems (apical, intercalary, lateral; primary and secondary); simple tissues (parenchyma, collenchyma, sclerenchyma) and complex tissues (xylem and phloem with their elements); the epidermal, ground and vascular tissue systems; T.S. of dicot and monocot roots and stems; V.S. of dicot (dorsiventral) and monocot (isobilateral) leaves checked against the ISC 2028 Biology syllabus (Class XI portion) — see README "For a reviewer"',
    counting_rules: 'Cell doublings, vessel and sieve-tube counts, vascular strands, pith areas, stomata and sap volumes are computed and asserted in src/calc.mjs (eq), not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    content_gate: 'npm run content -- lint, verify and originality for this chapter: see README "Verifier pass"',
    verifier_pass: '2026-11-04: every question re-solved from its stem by the writer; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
