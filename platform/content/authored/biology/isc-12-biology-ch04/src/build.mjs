// Build ISC 12 Biology ch04 Reproductive Health: npx tsx content/authored/biology/isc-12-biology-ch04/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(4, 'Reproductive Health');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1042,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['who-mcq', 'copper-mcq', 'mtp-mcq', 'icsi-mcq', 'pill-ar'],
      B: ['programme-short', ['iud-short', 'art-short']],
      C: ['population-short', ['choose-short', 'prevent-short']],
      D: ['contraception-long'],
    },
    long: {
      A: ['rch-mcq', 'explosion-mcq', 'vasectomy-mcq', 'saheli-mcq', 'spacing-mcq', 'lam-mcq', 'amnio-mcq', 'zift-mcq', 'gift-mcq', 'syphilis-mcq', 'asymptomatic-ar', 'mtp-ar'],
      B: ['ideal2-short', 'mtp-short', ['std-short', 'lam-short']],
      C: ['pillaction-short', 'amnio-short', 'ivf-short', ['barrier-short', 'curable-short']],
      D: ['std-long', ['infertility-long', 'population-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Reproductive health (WHO), family planning and RCH programmes, population explosion and government measures, natural, barrier, IUD, hormonal, emergency and surgical contraception with modes of action, MTP and its conditions, amniocentesis and its ban for sex determination, infertility and assisted reproductive technologies (definitions and applications), and STDs with causes, symptoms, complications and prevention checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Doubling time and growth of population, fertile periods for different cycle lengths, pill schedules and embryo-transfer routes are computed by src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-12-default-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
