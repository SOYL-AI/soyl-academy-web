// Build ch07 Human Health and Disease: npx tsx content/authored/biology/cbse-12-biology-ch07/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(7, 'Human Health and Disease');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 72,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['typhoid-mcq', 'graft-mcq', 'hiv-route-mcq', 'carrier-ar'],
      B: ['diseases-short', 'benign-short', 'hiv-short'],
      C: ['plasmodium-long', 'cancer-long'],
      D: ['response-case'],
    },
    long: {
      A: ['pneumonia-mcq', 'amoeb-mcq', 'cooler-mcq', 'barrier-mcq', 'allergy-mcq', 'carcinogen-mcq', 'withdrawal-mcq', 'steroid-mcq', 'vaccine-ar', 'smoke-ar'],
      B: ['ringworm-short', 'active-short', ['allergy-short', 'co-short'], 'prevention-short', ['immunity-short', 'drugs-short']],
      C: ['immunity-long', ['aids-long', 'drugs-long']],
      D: ['outbreak-case', 'hiv-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Pathogens, symptoms, spread and control of typhoid, pneumonia, common cold, dengue, chikungunya, malaria (Plasmodium life cycle), amoebiasis, ascariasis, filariasis and ringworm; innate and acquired immunity, antibodies, active and passive immunity, vaccines, allergy, autoimmunity, lymphoid organs; HIV and AIDS; cancer causes, detection and treatment; drugs, tobacco and alcohol in adolescence checked against the 2026-27 syllabus scope (see README "Verifier pass"); drug content is factual and preventive, with no instructions for use',
    counting_rules: 'Percentages, chain counts and the primary/secondary antibody-response curve are computed by src/calc.mjs, not typed in',
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
