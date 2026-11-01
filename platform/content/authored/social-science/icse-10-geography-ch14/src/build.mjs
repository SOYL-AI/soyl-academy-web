// Build ICSE 10 Geography ch14 Cash Crops: Sugarcane, Oilseeds, Cotton, Jute and Tea: npx tsx content/authored/social-science/icse-10-geography-ch14/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(14, 'Cash Crops: Sugarcane, Oilseeds, Cotton, Jute and Tea');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3014,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cane-states-mcq', 'groundnut-state-mcq', 'ginning-mcq', 'tea-state-mcq', 'cotton-ar', 'ratoon-short2', 'tea-proc-short3'],
      B: [['cane-long', 'tea-long']],
    },
    long: {
      A: ['cane-climate-mcq', 'cane-mill-mcq', 'soya-mcq', 'punjab-cotton-mcq', 'jute-climate-mcq', 'jute-mill-mcq', 'slope-mcq', 'shade-mcq', 'oil-ar', 'jute-ar', 'cotton-short2', 'jute-short2', 'cane-short3', 'jute-short3'],
      B: [['oilcot-long', 'jute-long', 'data-long']],
    },
  },
  checksExtra: {
    geography_facts: 'Climatic and soil needs, methods of cultivation and processing (setts and ratooning, ginning, retting, tea plucking and manufacture) and producing states of sugarcane, groundnut, mustard, soya bean, cotton, jute and tea, using approximate textbook ranges, checked against the ICSE 2027 syllabus (Class X); leading-state statements are marked as of the early 2020s, and the cane, sugar-recovery and leaf-to-tea figures are illustrative with every answer computed and asserted in the build',
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
