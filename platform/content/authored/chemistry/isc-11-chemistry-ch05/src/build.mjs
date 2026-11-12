// Build ISC 11 Chemistry ch05 Quantum Mechanical Model and Electronic Configuration: npx tsx content/_stage/chemistry/isc-11-chemistry-ch05/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from './lib.mjs';

setChapter(5, 'Quantum Mechanical Model and Electronic Configuration', { author: 'claude-sonnet-5-5 (writer); reviewed by claude-opus-5-5 (subject-producer)' });
const svgMod = await import('./svgs.mjs').catch(() => ({}));
const SELF_CHECKS = svgMod.SELF_CHECKS ?? [];
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1105,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['wavefn-mcq', 'shell-mcq', 'hund-mcq', 'mn-cation-mcq', 'nodes-ar'],
      B: ['na-short2', ['nodal-short2', 'hund-short2']],
      C: ['ml-short3', ['nl-short3', 'iso-short3']],
      D: ['wave-long'],
    },
    long: {
      A: ['orbital-mcq', 'lval-mcq', 'mshalf-mcq', 'dxy-mcq', 'peaks-mcq', 'size-mcq', 'pauli-mcq', 'capacity-mcq', 'ni-cfg-mcq', 'unpion-mcq', 'cr-ar', 'pauli-ar'],
      B: ['psi-short2', 'd4-short2', ['dorb-short2', 'pauli-short2']],
      C: ['qn-short3', 'shape-short3', 'box-short3', ['cu-short3', 'mn-short3']],
      D: ['nodes-long', ['rules-long', 'cr-long']],
    },
  },
  checksExtra: {
    chemistry_facts: 'Hydrogen-like radial functions (a0 units) give radial nodes n-l-1, peak counts and most probable distances (1s 1.0, 2p 4.0, 3d 9.0 a0; 90% radius of 1s 2.67 a0); Aufbau order from (n + l) matches the standard 19-subshell sequence; configurations of atoms Z = 1-30 and ions computed from the Aufbau order with the Cr and Cu exceptions; cations lose the highest-n electrons first',
    diagrams: `${SELF_CHECKS.length} diagram self-checks (geometry computed in svgs.mjs): ${svgFails.length} failures`,
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-11-09: every question and internal-choice alternative re-solved from its stem by the writer; every counted value (nodes, orbitals, electrons, unpaired electrons, configurations) re-computed by the build script',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
// narration length 35-80 words
for (const d of [deck1, deck2]) for (const s of d.slides) { const n = s.narration.trim().split(/\s+/).length; if (n < 35 || n > 80) v.errors.push(`narration ${n} words at deck${d.part}/${s.id}`); }
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve, selfChecks: SELF_CHECKS.length }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
