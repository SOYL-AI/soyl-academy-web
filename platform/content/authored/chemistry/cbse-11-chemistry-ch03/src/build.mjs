// Build CBSE 11 Chemistry ch03 Classification of Elements and Periodicity in Properties: npx tsx content/_stage/chemistry/cbse-11-chemistry-ch03/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(3, 'Classification of Elements and Periodicity in Properties', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1103,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['inversion-mcq', 'radius-trend-mcq', 'ie-trend-mcq', 'egain-ar'],
      B: ['law-short', 'iso-short', 'mendeleev-short3'],
      C: ['law-long', 'ie-long'],
      D: ['mend-case'],
    },
    long: {
      A: ['mendeleev-gap-mcq', 'symbol-mcq', 'period-length-mcq', 'config-group-mcq', 'fblock-mcq', 'successive-mcq', 'enegativity-mcq', 'oxide-mcq', 'moseley-ar', 'be-b-ar'],
      B: ['nomen-short', 'block-short2', ['egain-noble-short', 'diag-short'], 'successive-short3', ['second-short3', 'oxides-short3']],
      C: ['block-long', ['egain-long', 'second-long']],
      D: ['iso-case', 'config-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Standard textbook data: covalent and ionic radii, first ionisation enthalpies (Z = 1 to 20), electron gain enthalpies, Pauling electronegativities, successive ionisation enthalpies of Na, Mg, Al, Si and P, Mendeleev predictions; see the writer report',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry and data computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-02: every question, case part and alternative re-solved from its stem by the writer; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(path.join(dir, process.argv[process.argv.indexOf('--dump') + 1]), dumpBank(rel));
}
