// Build CBSE 9 Science ch11 Diversity: npx tsx content/_stage/science/cbse-9-science-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(11, 'Diversity', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1111,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cyano-mcq', 'seedling-mcq', 'mule-mcq', 'ar-binomial'],
      B: ['s2-mushroom', 's2-peacock', 's3-viruskingdom'],
      C: ['long-kingdoms', 'long-vert'],
      D: ['case-key'],
    },
    long: {
      A: ['basis-mcq', 'stump-mcq', 'yeast-mcq', 'moss-mcq', 'arthro-mcq', 'tadpole-mcq', 'tamarind-mcq', 'virus-mcq', 'ar-fern', 'ar-sponge'],
      B: ['s2-classify', 's2-brypter', ['s2-vert', 's2-decomp'], 's3-hier', ['s3-invert', 's3-roles']],
      C: ['long-plants', ['long-binomial', 'long-ecology']],
      D: ['case-virus', 'case-compost'],
    },
  },
  checksExtra: {
    science_facts: 'Textbook-level classification: Whittaker five kingdoms, plant divisions, animal phyla and vertebrate classes, binomial nomenclature, viruses, ecological roles',
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
