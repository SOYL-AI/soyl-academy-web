// Build ISC 11 Biology ch07 Morphology of the Flower and Inflorescence: npx tsx content/authored/biology/isc-11-biology-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(7, 'Morphology of the Flower and Inflorescence', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1107,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['symm-mcq', 'aest-twisted-mcq', 'sacs-mcq', 'hypo-mcq', 'ar-epig'],
      B: ['merous-short2', ['aest-short2', 'coh-short2']],
      C: ['describe-short3', ['plac-short3', 'inflo-short3']],
      D: ['flower-long'],
    },
    long: {
      A: ['bract-mcq', 'incomplete-mcq', 'merous-mcq', 'aest-valvate-mcq', 'perianth-mcq', 'mono-mcq', 'poly-mcq', 'epipet-mcq', 'plac-fig1-mcq', 'rac-mcq', 'ar-zygo', 'ar-vex'],
      B: ['symm-short2', 'anther-short2', ['ovary-short2', 'inflo-short2']],
      C: ['aest-short3', 'cohesion-short3', 'ovary-short3', ['carpel-short3', 'adhesion-short3']],
      D: ['androecium-long', ['gyn-long', 'inflo-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Structure of a typical flower, bracteate and ebracteate, symmetry, merous condition, complete and incomplete flowers; calyx, corolla, perianth and aestivation; cohesion and adhesion of stamens and mono- and dithecous anthers; position of the ovary, apocarpous and syncarpous gynoecium, locules and placentation; racemose and cymose inflorescence (subtypes removed) checked against the ISC 2028 Biology syllabus (Class XI portion) — see README "For a reviewer"',
    counting_rules: 'Floral members, pollen sacs, ovule and seed counts, survey percentages and days of flower opening are computed and asserted in src/calc.mjs (eq), not typed in',
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
