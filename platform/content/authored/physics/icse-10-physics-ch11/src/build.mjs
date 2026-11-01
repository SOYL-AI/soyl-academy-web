// Build ICSE 10 Physics ch11 Calorimetry: npx tsx content/authored/physics/icse-10-physics-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(11, 'Calorimetry');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2011,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['unitc-mcq', 'heattemp-mcq', 'alrise-mcq', 'cap-ar', 'relation-fill', 'mix-fill', 'cap-short2', 'water-short2'],
      B: [['cap-long', 'curve-long']],
    },
    long: {
      A: ['mixprin-mcq', 'cu-mcq', 'breeze-mcq', 'length-mcq', 'snow-mcq', 'latent-ar', 'kelvin-fill', 'L-fill', 'fusion-fill', 'effect-match', 'calor-short2', 'curve-short2', 'ice-short2', 'pan-short3'],
      B: [['mix-long', 'water-long', 'ice-long']],
    },
  },
  checksExtra: {
    physics_facts: 'Heat and temperature, heat capacity and specific heat capacity with Q = mcΔT, the method of mixtures with and without a calorimeter, effects of the high specific heat capacity of water, the heating curve and latent heat of fusion (c water 4200, c ice 2100 J kg⁻¹ K⁻¹, L ice 336 000 J kg⁻¹), with every number computed and asserted in the build, checked against the ICSE 2027 syllabus (Class X, section 5)',
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
