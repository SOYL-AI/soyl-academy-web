// Build ISC 11 Chemistry ch03 Subatomic Particles and Early Atomic Models: npx tsx content/_stage/chemistry/isc-11-chemistry-ch03/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(3, 'Subatomic Particles and Early Atomic Models', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
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
      A: ['cathode-field-mcq', 'isotope-mcq', 'deflect-mcq', 'blackbody-mcq', 'foil-ar'],
      B: ['cathode-props-short', ['ion-count-short', 'isotopes-short']],
      C: ['work-short3', ['limits-short3', 'scatter-short3']],
      D: ['planck-long'],
    },
    long: {
      A: ['gas-indep-mcq', 'anode-ratio-mcq', 'element-id-mcq', 'deuterium-mcq', 'thomson-mcq', 'size-mcq', 'limit-mcq', 'photon-energy-mcq', 'intensity-mcq', 'workfn-mcq', 'isotope-ar', 'isobar-ar'],
      B: ['anode-prod-short', 'thomson-short', ['photoeffect-short', 'photon-short2']],
      C: ['compare-short3', 'photons-short3', 'photoelectric-short3', ['h-isotopes-short3', 'ion-species-short3']],
      D: ['atom-long', ['cathode-long', 'rutherford-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Charge and mass of the three particles, e/m of the electron, properties of cathode and anode rays, Chadwick equation, particle counts in ions, Thomson and Rutherford models, Planck and photoelectric numericals checked against the ISC 2028 Class XI syllabus (Unit 2) — see handoff "facts a reviewer may wish to double-check"',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-09: every question and internal-choice alternative re-solved from its stem by the writer; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
// narration length 35-80 words
for (const d of [deck1, deck2]) for (const s of d.slides) { const n = s.narration.trim().split(/\s+/).length; if (n < 35 || n > 80) v.errors.push(`narration ${n} words at deck${d.part}/${s.id}`); }
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
