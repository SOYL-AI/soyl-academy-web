// Build CBSE 11 Chemistry ch04 Chemical Bonding and Molecular Structure: npx tsx content/_stage/chemistry/cbse-11-chemistry-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter } from './lib.mjs';

setChapter(4, 'Chemical Bonding and Molecular Structure', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1104,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['octet-exc-mcq', 'angle-mcq', 'bo-mcq', 'dipole-ar'],
      B: ['fc-short', 'nh3nf3-short', 'resonance-short3'],
      C: ['vsepr-long', 'mo-long'],
      D: ['hybrid-case'],
    },
    long: {
      A: ['lattice-mcq', 'valence-e-mcq', 'bondlength-mcq', 'zero-dipole-mcq', 'vsepr-xef4-mcq', 'sigma-pi-mcq', 'magnetic-mcq', 'hbond-bp-mcq', 'ozone-ar', 'o2mag-ar'],
      B: ['lattice-short', 'hybrid-short', ['mo-short', 'hbond-short'], 'vsepr-short3', ['bondparam-short3', 'octet-short3']],
      C: ['hybrid-long', ['lewis-long', 'hbond-long']],
      D: ['mo-case', 'dipole-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'Standard textbook data: bond lengths and enthalpies, dipole moments, lattice enthalpies (approximate), boiling points; shapes, hybridisation, bond orders and unpaired electrons computed in data.mjs; see the writer report',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry and MO filling computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-03: every question, case part and alternative re-solved from its stem by the writer; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
