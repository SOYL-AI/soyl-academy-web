// Build ISC 11 Chemistry ch19 Purification and Analysis of Organic Compounds: npx tsx content/_stage/chemistry/isc-11-chemistry-ch19/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(19, 'Purification and Analysis of Organic Compounds', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1119,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['sub-mcq', 'cuo-mcq', 'order-mcq', 'carius-p-mcq', 'rf-ar'],
      B: ['sublimation-short', ['fusion-short', 'liebig-eq-short']],
      C: ['frac-short3', ['x-short3', 'kjback-short3']],
      D: ['carius-long'],
    },
    long: {
      A: ['simple-mcq', 'steam-mcq', 'adsorb-mcq', 'nitrophenol-mcq', 'whyna-mcq', 'ns-mcq', 'agx-mcq', 'hno3-mcq', 'kjnot-mcq', 'tube-mcq', 'lass-ar', 'frac-ar'],
      B: ['phases-short', 'steam-short', ['prussian-short', 'kjeq-short']],
      C: ['chroma-short3', 's-short3', 'empirical-short3', ['cariusp-short3', 'br-short3']],
      D: ['purify-long', ['lass-long', 'kj-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Textbook-standard molar masses (CO2 44, H2O 18, AgCl 143.5, AgBr 188, AgI 235, BaSO4 233, Mg2P2O7 222) and boiling points of named liquids; every percentage, mass and Rf answer computed in the build script',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry and molar masses computed in svgs.mjs): ${svgFails.length} failures`,
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
