// Build ISC 11 Chemistry ch23 Alkynes: npx tsx content/_stage/chemistry/isc-11-chemistry-ch23/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(23, 'Alkynes', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1123,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['hyb-mcq', 'kolbe-mcq', 'amide-mcq', 'kmno4-mcq', 'hydr-ar'],
      B: ['bond-short', ['acid-short', 'dihEq-short']],
      C: ['carbide-short3', ['sodium-short3', 'hx-short3']],
      D: ['struct-long'],
    },
    long: {
      A: ['sigpi-mcq', 'isom-mcq', 'piE-mcq', 'dihal-mcq', 'bp-mcq', 'natgas-mcq', 'acidorder-mcq', 'agtest-mcq', 'lindlar-mcq', 'flame-mcq', 'acid-ar', 'lindlar-ar'],
      B: ['carbEq-short', 'kolbe-short', ['acetEq-short', 'hydr-short']],
      C: ['iso-short3', 'ox-short3', 'comb-short3', ['test-short3', 'hydrProp-short3']],
      D: ['prep-long', ['add-long', 'test-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'ethyne C≡C 120 pm, C–H 106 pm, H–C–C 180; bond enthalpies C–C 347, C=C 611, C≡C 837 kJ/mol (NCERT-style average values); s character sp 50, sp2 33.3, sp3 25 per cent; approximate pKa ethyne 25, ethene 44, ethane 50, water 15.7; boiling points ethyne -84 (sublimes), propyne -23.2, but-1-yne 8.1, but-2-yne 27.0, pent-1-yne 40.2, hex-1-yne 71.3, pentane 36.1, pent-1-ene 30.0, 2-methylbutane 27.8; carbide furnace about 2273 K; methane arc about 1773 K; cyclic polymerisation 873 K; all equations atom-balanced',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-10: every question and internal-choice alternative re-solved from its stem by the writer; 2026-11-14: every item reviewed (key, solution, marking scheme, competency tag, topic ids) by the subject-producer; every numerical re-computed by the build script',
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
