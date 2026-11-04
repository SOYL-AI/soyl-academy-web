// Build ISC 11 Biology ch09 Structural Organisation in Animals: Frog: npx tsx content/authored/biology/isc-11-biology-ch09/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(9, 'Structural Organisation in Animals: Frog', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1109,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['camo-mcq', 'tongue-mcq', 'portal-mcq', 'bladder-mcq', 'ar-short'],
      B: ['resp-short2', ['female-short2', 'brain-short2']],
      C: ['ext-short3', ['ferti-short3', 'ug-short3']],
      D: ['dig-long'],
    },
    long: {
      A: ['ext-fig1-mcq', 'nict-mcq', 'gut-mcq', 'ali-fig1-mcq', 'bile-mcq', 'buccal-mcq', 'cloaca-mcq', 'testis-mcq', 'cerebellum-mcq', 'ureo-mcq', 'ar-heart', 'ar-ferti'],
      B: ['sex-short2', 'heart-short2', ['gland-short2', 'skin-short2']],
      C: ['limbs-short3', 'portal-short3', 'cns-short3', ['resp-short3', 'fem-short3']],
      D: ['circ-long', ['male-long', 'brain-long']],
    },
  },
  checksExtra: {
    biology_facts: 'External features and the sexes of the frog; the alimentary canal, digestive glands, respiration through skin, buccal cavity and lungs, the three-chambered heart and portal systems; the excretory, nervous and reproductive systems with the urinogenital ducts of the male and female, checked against the ISC 2028 Biology syllabus (Class XI portion) — see README "For a reviewer"',
    counting_rules: 'Pond census, vocal sacs, feeding, gut-length ratios, blood output, oxygen shares, duct counts and nerve conduction times are computed and asserted in src/calc.mjs (eq), not typed in',
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
