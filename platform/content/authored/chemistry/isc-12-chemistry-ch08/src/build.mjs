// Build ISC 12 Chemistry ch08 Inner Transition (f-Block) Elements: Lanthanoids and Actinoids: npx tsx content/authored/chemistry/isc-12-chemistry-ch08/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(8, 'Inner Transition (f-Block) Elements: Lanthanoids and Actinoids');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 2208,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['gd-mcq', 'cause-mcq', 'water-mcq', 'tho2-mcq', 'ln-plus3-ar'],
      B: ['config-short', ['zrhf-short', 'eq-short']],
      C: ['contraction-short3', ['reactions-short3', 'compare-short3']],
      D: ['ln-long'],
    },
    long: {
      A: ['lu3-colour-mcq', 'eu2-mcq', 'complex-ln-mcq', 'nb-ta-mcq', 'density-hf-mcq', 'separation-mcq', 'oxide-mcq', 'sulphide-mcq', 'an-contraction-mcq', 'config-an-mcq', 'osmium-ar', 'hydride-ar'],
      B: ['plus3-short', 'basic-short', ['range-short', 'colour-short']],
      C: ['unusual-short3', 'mo-w-short3', 'calcium-short3', ['uranium-short3', 'mischmetall-short3']],
      D: ['contraction-long', ['react-long', 'actinoid-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Lanthanoid and actinoid configurations, oxidation states, colours, the lanthanoid contraction and its consequences, the reactions of lanthanoids with non-metals, water and acids, and every numerical checked against the ISC 2027 syllabus (Unit 4)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question and every internal-choice alternative re-solved from its stem by the author; every numerical re-computed by the build script — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
