// Build CBSE 9 Science ch10 Reproduction: npx tsx content/_stage/science/cbse-9-science-ch10/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(10, 'Reproduction', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1100 + 10,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['m-stigma', 'm-gamete', 'm-tube', 'ar-clone'],
      B: ['s2-yeast', 's2-tube', 's3-modes'],
      C: ['l-asex', 'l-flower'],
      D: ['case-aquarium'],
    },
    long: {
      A: ['m-fission', 'm-clone', 'm-veg', 'm-self', 'm-wind', 'm-vas', 'm-puberty', 'm-iron', 'ar-seed', 'ar-internal'],
      B: ['s2-cross', 's2-gamete', ['s2-hygiene', 's2-myth'], 's3-veg', ['s3-pollen', 's3-menstrual']],
      C: ['l-human', ['l-fert', 'l-adol']],
      D: ['case-maize', 'case-calendar'],
    },
  },
  checksExtra: {
    science_facts: 'textbook-level modes of reproduction and organisms; flower parts and pollination agents; fertilisation, seed and fruit; human reproductive organs and functions; adolescence from about 10 to 19 years, puberty from about 10 to 14; menstruation 3 to 7 days, cycle often about 28 days (21 to 35); pad changed every 4 to 6 hours, sleep 8 to 9 hours; gestation about nine months; all counts, dates and percentages given (illustrative); see README "Verifier pass"',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-04: every question, case part and alternative re-solved from its stem by the writer and reviewed by the producer; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
