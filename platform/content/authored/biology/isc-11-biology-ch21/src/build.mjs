// Build ISC 11 Biology ch21 Chemical Coordination and Integration: npx tsx content/authored/biology/isc-11-biology-ch21/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(21, 'Chemical Coordination and Integration', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1121,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['melatonin-mcq', 'gut-mcq', 'lipid-mcq', 'dwarf-mcq', 'glucagon-ar'],
      B: ['posterior-short2', ['thyroid-short2', 'medulla-short2']],
      C: ['caexp-short3', ['gonad-short3', 'cortex-short3']],
      D: ['disorders-long'],
    },
    long: {
      A: ['portal-mcq', 'thyroxine-mcq', 'iodine-mcq', 'di-mcq', 'acromegaly-mcq', 'graves-mcq', 'prolactin-mcq', 'aldosterone-mcq', 'oxytocin-mcq', 'camp-mcq', 'feedback-ar', 'calcium-ar'],
      B: ['glandq-short', 'steroid-short2', ['addison-short2', 'pit-short2']],
      C: ['pineal-short3', 'thyroiddis-short3', 'thyroid-short3', ['dmdi-short3', 'pituitary-short3']],
      D: ['adrenal-long', ['pancreas-long', 'mech-long']],
    },
  },
  checksExtra: {
    biology_facts: 'The endocrine glands and their location, hypothalamic and pituitary hormones, negative feedback of thyroxine, hormones of the pineal, thymus, thyroid and parathyroid, adrenal cortex and medulla, pancreas, gonads and gut (gastrin, secretin, GIP, CCK-PZ), the mechanism of action of protein hormones (cyclic AMP) and steroid hormones, and the disorders dwarfism, acromegaly, cretinism, goitre, exophthalmic goitre, Graves disease, Addison disease, diabetes mellitus and diabetes insipidus, checked against the ISC 2028 Biology syllabus (Class XI) — see README "Verifier pass"',
    counting_rules: 'Every feedback-loop value, glucose-tolerance value, rise and fall, calcium shortfall and urine volume is computed and asserted in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
