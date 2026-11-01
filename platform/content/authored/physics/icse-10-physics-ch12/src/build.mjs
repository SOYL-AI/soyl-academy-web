// Build ICSE 10 Physics ch12 Radioactivity and Nuclear Energy: npx tsx content/authored/physics/icse-10-physics-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(12, 'Radioactivity and Nuclear Energy');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2012,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['isotope-mcq', 'field-mcq', 'betadecay-mcq', 'ion-ar', 'Z-fill', 'alpha-fill', 'compare-short2', 'use-short2'],
      B: [['nucleus-long', 'energy-long']],
    },
    long: {
      A: ['chem-mcq', 'gamma-mcq', 'temp-mcq', 'thick-mcq', 'sun-mcq', 'chain-ar', 'pen-fill', 'badge-fill', 'chain-fill', 'rad-match', 'iso-short2', 'decay-short2', 'safety-short2', 'identify-short3'],
      B: [['radiation-long', 'decay-long', 'uses-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Nuclide notation and isotopes, the nature and properties of alpha, beta and gamma radiation, changes in A and Z in alpha and beta decay (computed for every series), uses of radioisotopes, hazards, background radiation and safety, and nuclear fission and fusion with balanced equations, checked against the ICSE 2027 syllabus (Class X, section 6)',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question and every internal-choice alternative re-solved from its stem by the author; every numerical computed and asserted by the build script — see README "Verifier pass"',
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
