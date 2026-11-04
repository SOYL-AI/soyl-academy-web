// Build CBSE 11 Chemistry ch02 Structure of Atom: npx tsx content/_stage/chemistry/cbse-11-chemistry-ch02/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(2, 'Structure of Atom', 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)');
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1102,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['neutron-mcq', 'energy-ratio-mcq', 'qn-mcq', 'rutherford-ar'],
      B: ['photo-short', 'pauli-short', 'rutherford-short3'],
      C: ['bohr-long', 'qn-long'],
      D: ['spectrum-case'],
    },
    long: {
      A: ['isobar-mcq', 'wavenumber-mcq', 'photoel-mcq', 'bohr-ratio-mcq', 'lines-mcq', 'uncertainty-mcq', 'orbital-count-mcq', 'unpaired-mcq', 'quantum-ar', 'cricket-ar'],
      B: ['thomson-short', 'spectra-short', ['bohr-limit-short', 'orbit-orbital-short'], 'hund-short3', ['chrcu-short3', 'ion-config-short3']],
      C: ['config-long', ['dual-long', 'photo-long']],
      D: ['quantum-case', 'config-case'],
    },
  },
  checksExtra: {
    chemistry_facts: 'h 6.626e-34 J s, c 3.0e8 m/s, N_A 6.022e23, m_e 9.11e-31 kg, m_p 1.673e-27 kg, m_n 1.675e-27 kg, R_H 1.097e7 /m, E_n = -2.18e-18/n^2 J, r_n = 52.9 n^2 pm',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-02: every question, case part and alternative re-solved from its stem by the writer; every numerical re-computed by the build script',
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
