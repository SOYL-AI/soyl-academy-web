// Build ICSE 10 Biology ch13 Reproductive System:
//   npx tsx content/authored/biology/icse-10-biology-ch13/src/build.mjs [--dump <file>]   (run from platform/)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../icse-10-biology-ch01/src/lib.mjs';

setChapter(13, 'Reproductive System');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 10131,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['epididymis-mcq', 'acrosome-mcq', 'implant-mcq', 'identical-mcq', 'scrotum-ar', 'semen-term', 'odd-sperm', 'reason-amniotic', 'twins-short'],
      B: [['scan-case', 'puberty-case']],
    },
    long: {
      A: ['vas-mcq', 'middle-mcq', 'sequence-mcq', 'placenta-mcq', 'menses-mcq', 'twins-sex-mcq', 'placenta-ar', 'parturition-term', 'odd-hormone', 'reason-scrotum', 'journey-fill5', 'female-match5'],
      B: [['cycle-case', 'twins-case', 'malefig-case']],
    },
  },
  checksExtra: {
    biology_facts: 'Male and female reproductive organs and male accessory glands; secondary sexual characters; structure of the sperm and egg; fertilisation, implantation, gestation and parturition; functions of the placenta, the amnion and amniotic fluid; outline of the menstrual cycle with testosterone, oestrogen and progesterone; identical and fraternal twins, checked against the ICSE 2027 Biology syllabus (Class X) and kept at textbook level — see README "Verifier pass"',
    counting_rules: 'Chromosome numbers of gametes and zygote, ovulation days for different cycle lengths, cycle phase lengths and gestation weeks are computed by src/calc.mjs, not typed in',
    icse_style: 'Assertion-reason items use the ICSE 2027 Biology option order; 1-mark biological terms, odd-one-out with category and give-reason items; 5-blank fill-in passages from a word list; a 5-pair lettered-diagram match; 10-mark case questions opening with a situation, a data table or a diagram; chapter tests on icse-10-biology-chapter-test-short / -long',
    verifier_pass: '2026-11-01: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
