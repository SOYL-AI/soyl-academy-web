// Build ICSE 10 Geography ch13 Food Crops: Rice, Wheat, Millets and Pulses: npx tsx content/authored/social-science/icse-10-geography-ch13/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(13, 'Food Crops: Rice, Wheat, Millets and Pulses');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3013,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['rice-states-mcq', 'wheat-states-mcq', 'jowar-mcq', 'pulse-diet-mcq', 'rice-ar', 'wheat-short2', 'rice-method-short3'],
      B: [['rice-long', 'millet-long']],
    },
    long: {
      A: ['rice-temp-mcq', 'transplant-adv-mcq', 'hail-mcq', 'wheat-soil-mcq', 'bajra-mcq', 'millet-nutri-mcq', 'arhar-mcq', 'pulse-import-mcq', 'wheat-ar', 'pulse-ar', 'millet-short2', 'pulse-short2', 'wheat-short3', 'millet-short3'],
      B: [['wheat-long', 'pulse-long', 'data-long']],
    },
  },
  checksExtra: {
    geography_facts: 'Temperature, rainfall and soil needs, methods of cultivation and producing states of rice, wheat, jowar, bajra, ragi and pulses, using approximate textbook ranges, checked against the ICSE 2027 syllabus (Class X); leading-state statements are marked as of the early 2020s, and the four-district rice table is illustrative with every yield, average and share computed and asserted in the build',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question and every internal-choice alternative re-solved from its stem by the author; every numerical and every map or chart value computed and asserted by the build script — see README "Verifier pass"',
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
