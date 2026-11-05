// Build ICSE 9 Chemistry ch13 Atmospheric and Environmental Chemistry:
//   npx tsx content/authored/chemistry/icse-9-chemistry-ch13/src/build.mjs [--dump <file>]   (run from platform/; CH_OUT=<dir> to build elsewhere)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-9-chemistry-ch01/src/lib.mjs';

setChapter(13, 'Study of Gas Laws', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 92132,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['ghg-mcq2', 'harm-mcq2', 'water-mcq3', 'harm-mcq4', 'ar-water', 's2-plastic', 's3-ghg-sources'],
      B: [['acid-long', 'ozone-long']],
    },
    long: {
      A: ['acid-mcq1', 'acid-mcq3', 'acid-mcq5', 'ozone-mcq2', 'ozone-mcq3', 'ozone-mcq5', 'harm-mcq1', 'ar-acid', 's2-ozone', 's2-acid-eff', 's2-nox', 's3-nitric-eqs', 's3-ozone-eqs'],
      B: [['ghg-long', 'do-long', 'lake-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Acid rain from oxides of sulphur and nitrogen (equations to sulphurous, sulphuric and nitric acids), greenhouse gases and their sources, formation and function of ozone with ozone-depleting chemicals by name only, dissolved oxygen and minerals, Minamata disease (mercury), plastics, sewage and pesticides, checked against the ICSE 2028 Chemistry syllabus Class IX (Atmospheric and Environmental Chemistry) — time-sensitive points are marked as of 2026 and listed in README "For a reviewer"',
    counting_rules: 'Relative masses, percentages, equation atom balances, mass totals and all data calculations are computed and asserted in src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE option order; 1-mark names, equations and reasons; numericals with working; a 5-pair match; 10-mark structured questions in parts, three with lettered diagrams (acid rain, greenhouse effect, ozone layer); chapter tests on icse-9-default-chapter-test-short / -long',
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
