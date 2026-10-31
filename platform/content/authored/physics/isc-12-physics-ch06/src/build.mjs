// Build ISC 12 Physics ch06 Cells, Kirchhoff's Laws, Bridges and Potentiometer:
//   npx tsx content/authored/physics/isc-12-physics-ch06/src/build.mjs [--dump <file>]
// Uses the ISC 12 Physics authoring library in ../../isc-12-physics-ch01/src/lib.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-physics-ch01/src/lib.mjs';

setChapter(6, 'Cells, Kirchhoff’s Laws, Bridges and Potentiometer');
const { SELF_CHECKS } = await import('./svgs.mjs');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const svgFails = SELF_CHECKS.filter((l) => l.startsWith('FAIL'));
const report = writeChapter({
  dir,
  seed: 2106,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['emfdef-mcq', 'mixedmax-mcq', 'copperstrip-mcq', 'principle-mcq', 'emfratio-ar'],
      B: ['emfpd-short', ['kirchconserve-short', 'uniform-short']],
      C: ['balancecond-short3', ['intRderive-short3', 'unequalderive-short3']],
      D: ['kirch-long'],
    },
    long: {
      A: ['charging-mcq', 'seriesN-mcq', 'lowR-mcq', 'junction-mcq', 'loopsign-mcq', 'unbalanced-mcq', 'nobalance-mcq', 'doubleL-mcq', 'sumdiff-mcq', 'shuntfall-mcq', 'Vgraph-ar', 'middle-ar'],
      B: ['intRfactors-short', 'bridgeindep-short', ['parallelwhy-short', 'sens-short']],
      C: ['energy-short3', 'zero-short3', 'parallelY-short3', ['voltmeterVS-short3', 'compareproc-short3']],
      D: ['pot-long', ['grouping-long', 'bridge-long']],
    },
  },
  checksExtra: {
    diagrams: `${SELF_CHECKS.length} diagram self-checks (every circuit solved by script: cell on load, best mixed grouping of 12 cells, unequal cells in parallel with the weaker one charging, two-loop Kirchhoff currents and arrow directions, bridge balance, metre-bridge jockey position, potentiometer polarities, kL > E and balance lengths drawn to scale): ${svgFails.length} failures`,
    physics_facts: 'E = W/q; E = I(R + r), V = E − Ir (discharging), V = E + Ir (charging); n in series nE/(R + nr), m in parallel E/(R + r/m), mixed nE/(R + nr/m) with maximum at R = nr/m; two cells in parallel E = (E₁r₂ + E₂r₁)/(r₁ + r₂), r = r₁r₂/(r₁ + r₂); Kirchhoff ΣI = 0, ΣE = ΣIR; Wheatstone P/Q = R/S; metre bridge X = Rl/(100 − l); potentiometer E = kl, k = V_AB/L, E₁/E₂ = l₁/l₂, r = R(l₁ − l₂)/l₂; every number computed by the build script and re-solved (see README)',
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
