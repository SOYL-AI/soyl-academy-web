// Build ISC 12 Biology ch14 Biotechnology: Principles and Processes: npx tsx content/authored/biology/isc-12-biology-ch14/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(14, 'Biotechnology: Principles and Processes');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1142,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['lysis-mcq', 'sticky-mcq', 'marker-mcq', 'genegun-mcq', 'palindrome-ar'],
      B: ['principles-short', ['nomen-short', 'heatshock-short']],
      C: ['gel-short', ['sticky-short', 'pcr-short']],
      D: ['rdna-long'],
    },
    long: {
      A: ['ethanol-mcq', 'gel-mcq', 'ecori-mcq', 'hind-mcq', 'ori-mcq', 'yac-mcq', 'calcium-mcq', 'bluewhite-mcq', 'taq-mcq', 'stirred-mcq', 'insertion-ar', 'competent-ar'],
      B: ['vector-short', 'bluewhite-short', ['invivo-short', 'downstream-short']],
      C: ['isolation-short', 'restriction-short', 'selection-short', ['agro-short', 'bioreactor-short']],
      D: ['vector-long', ['pcr-long', 'bioreactor-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Definition and principles of biotechnology, isolation of DNA, gel electrophoresis, discovery, naming and action of restriction enzymes (Hind II, EcoRI), sticky ends and ligase, steps of recombinant DNA technology, features of cloning vectors, pBR322, Ti plasmid, retroviruses, BAC and YAC, competent hosts, microinjection and biolistics, selection by antibiotic resistance, insertional inactivation and blue-white screening, PCR and in vivo amplification, stirred-tank and sparged-tank bioreactors and downstream processing checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Restriction fragments, palindrome checks, expected site counts, gel order, PCR copy numbers and colony percentages are computed by src/calc.mjs and src/svgs.mjs, not typed in',
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
