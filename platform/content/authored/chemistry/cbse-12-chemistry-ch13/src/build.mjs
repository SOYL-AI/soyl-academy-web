// Build ch13 Polymers: npx tsx content/authored/chemistry/cbse-12-chemistry-ch13/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(13, 'Polymers');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1213,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['source-mcq', 'ldpe-mcq', 'monomer-mcq', 'class-ar'],
      B: ['compare-short', 'ldpe-short', 'forces-short3'],
      C: ['class-long', 'rubber-long'],
      D: ['bag-case'],
    },
    long: {
      A: ['fibre-mcq', 'elastomer-mcq', 'initiator-mcq', 'bifunctional-mcq', 'teflon-mcq', 'novolac-mcq', 'oilseal-mcq', 'mw-mcq', 'step-ar', 'pdi-ar'],
      B: ['identify-short', 'bakelite-short', ['pdi-short', 'bio-short'], 'mechanism-short3', ['fibre-short3', 'rubber-short3']],
      C: ['poly-long', ['mass-long', 'everyday-long']],
      D: ['tyre-case', 'fabric-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Polymer classification, addition and condensation polymerisation, free radical mechanism, monomers and conditions for LDPE, HDPE, Teflon, PAN, nylons, terylene, Bakelite, rubbers and vulcanisation, Mn/Mw/PDI and biodegradable polymers checked against the 2026-27 syllabus scope (formative-only chapter; see README "Verifier pass")',
    content_gate: 'npm test -w @soyl/content-templates: all 7 checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
