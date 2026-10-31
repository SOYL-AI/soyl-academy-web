// Build ISC 12 Biology ch17 Ecosystem: npx tsx content/authored/biology/isc-12-biology-ch17/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(17, 'Ecosystem');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1172,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['abiotic-mcq', 'lignin-mcq', 'trophic-mcq', 'tree-mcq', 'npp-ar'],
      B: ['ecosystem-short', ['standing-short', 'web-short']],
      C: ['decomp-short', ['productivity-short', 'energy-short3']],
      D: ['pond-long'],
    },
    long: {
      A: ['pond-mcq', 'gppdef-mcq', 'par-mcq', 'humus-mcq', 'frag-mcq', 'climate-mcq', 'dfc-mcq', 'tenpct-mcq', 'sea-mcq', 'limitation-mcq', 'pyramid-ar', 'decomp-ar'],
      B: ['pondfunc-short', 'factors-short', ['pyramid-short', 'pyrlimit-short']],
      C: ['pond-short3', 'gfcdfc-short', 'par-short3', ['pyramid-short3', 'litter-short']],
      D: ['energy-long', ['productivity-long', 'decomp-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Ecosystem definition, types and components, structure and functions of a pond, GPP, NPP and secondary productivity, PAR and global productivity, standing crop and standing state, the steps of decomposition (fragmentation, leaching, catabolism, humification, mineralisation) and factors affecting it, grazing and detritus food chains, food webs, trophic levels, the 10 percent law, and pyramids of number, biomass and energy with their limitations checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'NPP values, percentages, energy transfers, efficiencies, litter decay and pyramid shapes are computed by src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-12-default-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
