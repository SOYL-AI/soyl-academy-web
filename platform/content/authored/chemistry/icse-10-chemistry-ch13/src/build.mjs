// Build ICSE 10 Chemistry ch13 Organic Chemistry: Introduction, Structure, Isomerism and Nomenclature: npx tsx content/_stage/chemistry/icse-10-chemistry-ch13/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(13, 'Organic Chemistry: Introduction, Structure, Isomerism and Nomenclature');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1013,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['catenation-mcq', 'saturated-mcq', 'position-mcq', 'trivial-mcq', 'isomer-ar', 'config-short1', 'butene-short1', 'name-short1', 'name-short2'],
      B: [['carbon-long', 'name-long']],
    },
    long: {
      A: ['triple-mcq', 'benzene-mcq', 'same-mcq', 'bp-mcq', 'name2-mcq', 'ether-mcq', 'name-ar', 'benzene-short1', 'ethene-short1', 'next-short1', 'struct-short1', 'classify-short1', 'series-fill', 'trivial-match'],
      B: [['isomer-long', 'series-long', 'mixed-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Tetravalency and catenation, bond counts in ethane, ethene, ethyne and propyne, the Kekulé benzene structure, general formulae, chain isomers of C4H10 and C5H12, position isomers of butene, butyne, propanol and chloropropane, alkane molecular masses and boiling points, and IUPAC and trivial names (one functional group, five carbons or fewer), checked against the ICSE 2027 syllabus (Class X, section 9)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-01: every question re-solved from its stem by the author; every numerical re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
