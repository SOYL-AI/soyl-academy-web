// Build ICSE 9 Chemistry ch05 Water of Crystallisation, Efflorescence, Deliquescence and Drying Agents:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch05/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(5, 'Water of Crystallisation, Efflorescence, Deliquescence and Drying Agents', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 90105,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['noheat-mcq', 'pct-mcq', 'ferric-mcq', 'drying-mcq', 'ar-eff', 's2-tilt', 's3-hyd-names'],
      B: [['fe-long', 'sugar-long']],
    },
    long: {
      A: ['vitriol-mcq', 'wsoda-mcq', 'conc-acid-mcq', 'mass-mcq', 'quick-mcq', 'naoh-mcq', 'water-mcq', 'ar-hydrate', 's2-dry-dehyd', 's2-heat', 's2-hygro', 's3-dehyd', 's3-compare'],
      B: [['heatfig-long', 'gas-long', 'pct-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Water of crystallisation, the prescribed hydrates and anhydrous salts, heating observations, efflorescence, deliquescence, hygroscopy, drying and dehydrating agents, checked against the ICSE 2028 Chemistry syllabus Class IX (Water) — see README "For a reviewer"',
    counting_rules: 'Relative molecular masses, percentages of water, residue and water-loss masses and mass changes are computed and asserted in src/calc.mjs, not typed in; atomic masses are stated in each stem',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark terms, odd one out, equations and give-reason items; numericals with working; a lettered apparatus diagram and a 5-pair match; 10-mark structured questions in parts; chapter tests on icse-9-default-chapter-test-short / -long',
    verifier_pass: '2026-11-05: every question re-solved from its stem by the author; keys, schemes and word limits checked',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
