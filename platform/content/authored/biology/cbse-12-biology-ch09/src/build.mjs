// Build ch09 Biotechnology: Principles and Processes: npx tsx content/authored/biology/cbse-12-biology-ch09/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(9, 'Biotechnology: Principles and Processes');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 92,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['palindrome-mcq', 'gel-mcq', 'cellulase-mcq', 'ti-ar'],
      B: ['palin-short', 'competent-short', 'gel-short'],
      C: ['tools-long', 'rdna-long'],
      D: ['gel-case'],
    },
    long: {
      A: ['cohen-mcq', 'anode-mcq', 'marker-mcq', 'bluewhite-mcq', 'gun-mcq', 'primer-mcq', 'continuous-mcq', 'order-mcq', 'gel-ar', 'pcr-ar'],
      B: ['biotech-short', 'ecori-short', ['downstream-short', 'continuous-short'], 'vector-short', ['insertional-short', 'pcr-short']],
      C: ['selection-long', ['pcr-long', 'bioprocess-long']],
      D: ['selection-case', 'pcr-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Definition of biotechnology, Cohen and Boyer, restriction enzymes and naming, palindromes and sticky ends, ligase, agarose gel electrophoresis and elution, vector features, pBR322 and insertional inactivation, blue-white screening, Ti plasmid and retroviruses, competence, micro-injection and biolistics, DNA isolation, PCR with Taq polymerase, ligation, transformation, continuous culture, stirred-tank bioreactors and downstream processing checked against the 2026-27 syllabus scope (see README "Verifier pass")',
    counting_rules: 'Complementary strands, palindromes, digest fragments, expected site counts, gel migration, PCR copy numbers and percentages are computed by src/calc.mjs, not typed in',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-29: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
