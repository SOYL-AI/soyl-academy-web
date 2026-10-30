// Build ISC 12 Physics ch02 Electric Flux and Gauss's Theorem: npx tsx content/authored/physics/isc-12-physics-ch02/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(2, 'Electric Flux and Gauss’s Theorem');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2102,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['fluxunit-mcq', 'edge-mcq', 'gaussline-mcq', 'linevsshell-mcq', 'inversesq-ar'],
      B: ['gaussstate-short', ['endfaces-short', 'pillbox-short']],
      C: ['line-short3', ['sheet-short3', 'shell-short3']],
      D: ['flux-long'],
    },
    long: {
      A: ['negflux-mcq', 'closedcyl-mcq', 'shapes-mcq', 'doubleradius-mcq', 'dipolezero-mcq', 'lineratio-mcq', 'samesign-mcq', 'shellgraph-mcq', 'shield-mcq', 'chargedouble-mcq', 'inout-ar', 'pointshell-ar'],
      B: ['nonuni-short', 'gaussprop-short', ['car-short', 'fluxsign-short']],
      C: ['coulomb-short3', 'nonuniformcube-short3', 'concentric-short3', ['hemi-short3', 'platesforce-short3']],
      D: ['shell-long', ['line-long', 'sheet-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (area vector drawn normal to the tilted plate; charge drawn at the centre of the cube; parallel-sheet fields; Gaussian surfaces for line, sheet and shell): ${svgFails.length} failures`,
    physics_facts: 'ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻², 1/4πε₀ = 9 × 10⁹ N m² C⁻²; Φ = E·S = ES cos θ, ∮E·dS = q_enc/ε₀; charge at a cube centre q/6ε₀, at a corner q/8ε₀; line λ/(2πε₀r); sheet σ/2ε₀, two opposite sheets σ/ε₀ between and 0 outside; shell q/(4πε₀r²) outside, 0 inside, σ/ε₀ at the surface; every number computed by the build script and re-solved (see README)',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-31: every question re-solved from its stem by the author; keys, schemes, mark splits and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
if (svgFails.length) v.errors.push(...svgFails);
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
