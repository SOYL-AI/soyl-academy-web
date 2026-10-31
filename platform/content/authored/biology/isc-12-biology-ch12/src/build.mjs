// Build ISC 12 Biology ch12 Immunity, AIDS and Substance Abuse: npx tsx content/authored/biology/isc-12-biology-ch12/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../isc-12-biology-ch01/src/lib.mjs';

setChapter(12, 'Immunity, AIDS and Substance Abuse');
const { deck1, deck2 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = process.env.CH_OUT ?? path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 1122,
  decks: [deck1, deck2],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['barrier-mcq', 'cmi-mcq', 'igm-mcq', 'hivcell-mcq', 'interferon-ar'],
      B: ['innate-short', ['activepassive-short', 'drugsource-short']],
      C: ['hivrep-short', ['lymphoid-short', 'smoking-short']],
      D: ['immunity-long'],
    },
    long: {
      A: ['colostrum-mcq', 'igg-mcq', 'thymus-mcq', 'vaccine-mcq', 'autoimmune-mcq', 'rt-hiv-mcq', 'opportunistic-mcq', 'poppy-mcq', 'cocaine-mcq', 'nicotine-mcq', 'co-ar', 'graft-ar'],
      B: ['humoral-short', 'ig-short', ['aidsspread-short', 'addiction-short']],
      C: ['memory-short', 'elisa-short', 'drugs-short', ['antibodyclass-short', 'prevention-short']],
      D: ['aids-long', ['antibody-long', 'drugs-long']],
    },
  },
  checksExtra: {
    biology_facts: 'Innate barriers and interferons, acquired immunity with primary and secondary responses, humoral and cell-mediated immunity, active and passive immunity, primary and secondary lymphoid organs and MALT, antibody structure and the five classes, vaccination, immunisation and autoimmunity, AIDS with HIV transmission, replication, ELISA and prevention, and the sources and effects of opioids, cannabinoids, cocaine, barbiturates, alcohol and tobacco, with reasons for addiction and its prevention checked against the ISC 2027 Biology syllabus (Class XII) — see README "Verifier pass"',
    counting_rules: 'Antibody chain counts, response peaks, ELISA cut-offs, pack-years and percentages are computed by src/calc.mjs, not typed in',
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
