// Build ISC 12 Biology ch03 Human Reproduction: npx tsx content/authored/biology/isc-12-biology-ch03/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(3, 'Human Reproduction');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1032,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['leydig-mcq', 'ampulla-mcq', 'spermiation-mcq', 'lhsurge-mcq', 'scrotum-ar'],
      B: ['glands-short', ['ovary-short', 'oviduct-short']],
      C: ['hormonal-short', ['male-short', 'female-short']],
      D: ['gameto-long'],
    },
    long: {
      A: ['sertoli-mcq', 'fructose-mcq', 'myometrium-mcq', 'fsh-mcq', 'sperm-fig-mcq', 'progesterone-mcq', 'oestrous-mcq', 'polyspermy-mcq', 'hcg-mcq', 'colostrum-mcq', 'meiosis2-ar', 'oxytocin-ar'],
      B: ['sperm-short', 'cyclebrief-short', ['implant-short', 'sexdet-short']],
      C: ['compare-short', 'fert-short', 'placenta-short', ['graph-short', 'milestones-short']],
      D: ['cycle-long', ['birth-long', 'fert-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Male and female reproductive organs, testis and ovary microstructure, accessory glands, spermatogenesis with spermiogenesis and spermiation, oogenesis with meiotic arrests, hormonal control by GnRH, LH and FSH, sperm structure, menstrual cycle phases and hormones, menarche, menopause, oestrous cycle, events of fertilisation, sex determination, cleavage, blastocyst, implantation, placenta and its hormones, developmental milestones, parturition and lactation checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Seminiferous tubule ranges, semen quality thresholds, sperms and ova per meiocyte, chromosome numbers and sex probabilities are computed by src/calc.mjs, not typed in',
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
