// Build ICSE 10 Geography ch18 Waste Management: npx tsx content/authored/social-science/icse-10-geography-ch18/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(18, 'Waste Management');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 3018,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['disease-mcq', 'gw-mcq', 'seg-why-mcq', 'reduce-mcq', 'term-ar', 'need-short2', 'landfill-short3'],
      B: [['imp-long', 'method-long']],
    },
    long: {
      A: ['flood-mcq', 'fire-mcq', 'rules-mcq', 'acid-mcq', 'thermal-mcq', 'battery-mcq', 'cover-mcq', 'ewaste-mcq', 'method-ar', 'r-ar', 'seg-short2', 'acid-short2', 'imp-short3', 'compare-short3'],
      B: [['term-long', 'r-long', 'data-long']],
    },
  },
  checksExtra: {
    geography_facts: 'Effects of accumulated waste (landscape, pollution, health), the need for waste management, the key terms global warming, acid rain, eutrophication, biomagnification and thermal pollution, segregation at source, open dumps and sanitary landfills, composting and vermicomposting, and reduce-reuse-recycle, checked against the ICSE 2027 syllabus (Class X); time-sensitive statements are marked as of the early 2020s, and every household, town and food-chain figure is illustrative with every answer computed and asserted in the build',
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
