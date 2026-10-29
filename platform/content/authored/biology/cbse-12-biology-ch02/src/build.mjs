// Build ch02 Human Reproduction: npx tsx content/authored/biology/cbse-12-biology-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(2, 'Human Reproduction');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 22,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['scrotum-mcq', 'ovulation-mcq', 'colostrum-mcq', 'polar-ar'],
      B: ['sertoli-leydig-short', 'implantation-short', 'compare-gameto-short'],
      C: ['spermatogenesis-long', 'oogenesis-long'],
      D: ['cycle-case'],
    },
    long: {
      A: ['blocked-vas-mcq', 'fructose-mcq', 'lh-fsh-mcq', 'acrosome-mcq', 'day-mcq', 'hcg-mcq', 'zona-mcq', 'relaxin-mcq', 'leydig-ar', 'sex-ar'],
      B: ['mammary-short', 'scrotum-short', ['follicle-loss-short', 'menses-short'], 'sex-short', ['placenta-short', 'blocked-oviduct-short']],
      C: ['cycle-long', ['fert-long', 'blame-long']],
      D: ['semen-case', 'embryo-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Male and female systems (ducts, glands, oviduct parts, uterine wall, mammary glands), spermatogenesis and its hormonal control, sperm structure, oogenesis and follicles, menstrual cycle phases and hormones, fertilisation, sex determination, cleavage, implantation, placenta and its hormones, germ layers, foetal milestones, parturition and lactation checked against the 2026-27 syllabus scope (see README "Verifier pass"); reproductive content written in neutral, factual, age-appropriate language',
    counting_rules: 'Worked-example and item numbers (tubule ranges, gametes per meiocyte, chromosome numbers, semen percentages, sex probabilities, ovulation date) are computed by src/calc.mjs or from stated rules, not typed in',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
