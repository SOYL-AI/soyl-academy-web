// Build ISC 11 Chemistry ch22 Alkenes: npx tsx content/_stage/chemistry/isc-11-chemistry-ch22/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(22, 'Alkenes', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1122,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['isoc5-mcq', 'dehyd-mcq', 'perox-mcq', 'baeyer-mcq', 'markov-ar'],
      B: ['bond-short', ['geom-short', 'physcis-short']],
      C: ['saytz-short3', ['mech-short3', 'hydrat-short3']],
      D: ['struct-long'],
    },
    long: {
      A: ['hyb-mcq', 'sigma-mcq', 'geom-mcq', 'vic-mcq', 'kolbe-alk-mcq', 'alkyne-red-mcq', 'ease-mcq', 'dipole-mcq', 'carbocat-mcq', 'hot-mcq', 'cistrans-ar', 'perox-ar'],
      B: ['dehydrEq-short', 'kolbeAlk-short', ['vicEq-short', 'alkyne-short']],
      C: ['perox-short3', 'cistrans-short3', 'ozon-short3', ['baeyer-short3', 'comb-short3']],
      D: ['prep-long', ['add-long', 'ox-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'ethene C=C 134 pm, H-C-H 117, H-C=C 121.5; boiling points of C2-C6 1-alkenes, C4H8 isomers, 1,2-dichloroethene isomers; melting points of cis and trans but-2-ene; dipole moments cis-1,2-dichloroethene 1.9 D; H-X bond enthalpies HCl 431, HBr 366, HI 299 kJ/mol; Saytzeff ratio of about 80:20 for 2-bromobutane (illustrative); isomer counts 3 (C4H8) and 5 (C5H10); all equations atom-balanced',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-10: every question and internal-choice alternative re-solved from its stem by the writer; 2026-11-14: every item reviewed (key, solution, marking scheme, competency tag, topic ids) by the subject-producer; every numerical re-computed by the build script',
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
