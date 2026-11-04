// Build ISC 11 Biology ch03 Protista, Fungi, Lichens and Viruses: npx tsx content/authored/biology/isc-11-biology-ch03/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-11-biology-ch01/src/lib.mjs';

setChapter(3, 'Protista, Fungi, Lichens and Viruses', { author: 'claude-sonnet-5-5 (writer; reviewed by the subject-producer)' });
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1103,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['plasmo-mcq', 'pair-mcq', 'tmv-mcq', 'hypha-mcq', 'virus-ar'],
      B: ['isogamy-short2', ['lichen-short2', 'prion-short2']],
      C: ['mycor-short3', ['phage-short3', 'history-short3']],
      D: ['protista-long'],
    },
    long: {
      A: ['chrysophyte-mcq', 'dino-mcq', 'euglena-mcq', 'entamoeba-mcq', 'spor-mcq', 'penicillin-mcq', 'beijerinck-mcq', 'viroid-mcq', 'gamete-mcq', 'chitin-mcq', 'slime-ar', 'giardia-ar'],
      B: ['virus-short2', 'uses-short2', ['slime-short2', 'loco-short2']],
      C: ['protozoa-short3', 'fungus-short3', 'class-short3', ['lichmyc-short3', 'compare-short3']],
      D: ['fungi-long', ['virus-long', 'symb-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Protist groups and their locomotion; fungal characteristics, hyphae, spores, isogamy, anisogamy, oogamy, plasmogamy, karyogamy and dikaryophase (no life cycles); the four fungal classes, uses, lichens and mycorrhiza; TMV, bacteriophage, the work of Ivanowsky, Beijerinck and Stanley, viroids and prions, checked against the ISC 2028 Biology syllabus (Class XI) — see README Verifier pass',
    counting_rules: 'Every percentage, chromosome count, spore count, growth figure and year gap is computed and asserted in src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-11-default-chapter-test-short / -long',
    verifier_pass: '2026-11-02: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
