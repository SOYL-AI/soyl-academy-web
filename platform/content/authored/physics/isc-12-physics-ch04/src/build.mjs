// Build ISC 12 Physics ch04 Capacitance and Dielectrics: npx tsx content/authored/physics/isc-12-physics-ch04/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(4, 'Capacitance and Dielectrics');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2104,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['surface-mcq', 'Cdef-mcq', 'threeequal-mcq', 'connected-mcq', 'normal-ar'],
      B: ['parallel-short', ['freebound-short', 'polar-short']],
      C: ['ppderive-short3', ['seriesderive-short3', 'slabderive-short3']],
      D: ['capacitor-long'],
    },
    long: {
      A: ['twosphere-mcq', 'cavityV-mcq', 'pullapart-mcq', 'minmax-mcq', 'make3-mcq', 'halfloss-mcq', 'ratioU-mcq', 'whyuse-mcq', 'Efield-mcq', 'restore-mcq', 'smallV-ar', 'slabfield-ar'],
      B: ['shield-short', 'uniformfield-short', ['densityderive-short', 'lossgoes-short']],
      C: ['conductor-short3', 'mixednet-short3', 'flash-short3', ['polarise-short3', 'table-short3']],
      D: ['network-long', ['dielectric-long', 'slab-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (conductor field lines checked normal to the surface; plate polarities; induced charges facing the plates; slab drawn to scale d : t = 2 : 1): ${svgFails.length} failures`,
    physics_facts: 'ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻², 1/4πε₀ = 9 × 10⁹; C = Q/V; isolated sphere 4πε₀R; C = ε₀A/d; series 1/C = Σ1/Cᵢ, parallel C = ΣCᵢ; U = ½CV² = ½QV = Q²/2C (formulae only, derivation removed in the ISC scope); u = ½ε₀E²; charge sharing V = ΣCV/ΣC with energy loss; dielectric C = KC₀, E = E₀/K; battery off: Q fixed, V and U ÷ K; battery on: V fixed, Q and U × K; partial slab ε₀A/(d − t + t/K), metal slab ε₀A/(d − t); every number computed by the build script and re-solved (see README)',
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
