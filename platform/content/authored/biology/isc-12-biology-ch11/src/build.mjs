// Build ISC 12 Biology ch11 Human Health and Disease: Infections, Cancer and Allergies: npx tsx content/authored/biology/isc-12-biology-ch11/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(11, 'Human Health and Disease: Infections, Cancer and Allergies');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1112,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['cold-mcq', 'dengue-mcq', 'sporozoite-mcq', 'contact-mcq', 'typhoid-ar'],
      B: ['viral-short', ['mosquito-short', 'cancer-short']],
      C: ['typhoid-short', ['malaria-short', 'diagnosis-short']],
      D: ['plasmodium-long'],
    },
    long: {
      A: ['plague-mcq', 'diphtheria-mcq', 'pneumonia-mcq', 'anopheles-mcq', 'amoeba-mcq', 'filaria-mcq', 'ringworm-mcq', 'carcinogen-mcq', 'chemo-mcq', 'ige-mcq', 'vector-ar', 'metastasis-ar'],
      B: ['bacterial-short', 'helminth-short', ['carcinogen-short', 'allergy-short']],
      C: ['widal-short', 'prevention-short', 'treatment-short', ['compare-short', 'allergy-short3']],
      D: ['cancer-long', ['infections-long', 'allergy-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Agents, transmission, symptoms and prevention of the common cold, chikungunya, dengue, typhoid (Widal test), pneumonia, diphtheria, plague, amoebiasis, malaria with the life cycle of Plasmodium, ascariasis, filariasis and ringworm; contact inhibition, benign and malignant tumours, metastasis, carcinogens, diagnosis and treatment of cancer; allergies, allergens, IgE, mast cells and histamine checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Widal titres, fever-bout timings, cell doublings and percentages are computed by src/calc.mjs, not typed in',
    isc_style: 'Assertion-reason items use the ISC Biology options (d = both false); 1-mark give-a-reason and analogy subparts; diagram-based items with lettered figures; 5-mark questions set in marked parts; chapter tests on isc-12-default-chapter-test-short / -long',
    content_gate: 'npm test -w @soyl/content-templates: all checks pass for this chapter',
    verifier_pass: '2026-10-30: every question, case part and alternative re-solved from its stem by the author; keys, schemes and word limits checked — see README "Verifier pass"',
  },
});
const { validator: v, stats, lint, resolve } = report;
console.log(JSON.stringify({ errors: v.errors, warnings: v.warnings, math: v.math, svgs: v.svgs, narration: v.narration, decks: v.decks, lint: { errors: lint.errors, warnings: lint.warnings }, lintFindings: lint.findings.slice(0, 40), resolve }, null, 1));
console.log(JSON.stringify(stats));
if (process.argv.includes('--dump')) {
  const rel = JSON.parse(fs.readFileSync(path.join(dir, 'release.json'), 'utf8'));
  fs.writeFileSync(process.argv[process.argv.indexOf('--dump') + 1], dumpBank(rel));
}
