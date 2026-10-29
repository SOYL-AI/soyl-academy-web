// Build ch03 Reproductive Health: npx tsx content/authored/biology/cbse-12-biology-ch03/src/build.mjs [--dump <file>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setChapter, writeChapter, dumpBank } from '../../cbse-12-biology-ch01/src/lib.mjs';

setChapter(3, 'Reproductive Health');
const { deck1, deck2, deck3 } = await import('./decks.mjs');
const { notes, flashcards } = await import('./study.mjs');
await import('./questions.mjs');

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const report = writeChapter({
  dir,
  seed: 32,
  decks: [deck1, deck2, deck3],
  notes,
  flashcards,
  tests: {
    short: {
      A: ['transmission-mcq', 'emergency-mcq', 'zift-mcq', 'steril-ar'],
      B: ['iud-short', 'ivf-short', 'mtp-short'],
      C: ['contra-long', 'art-long'],
      D: ['ivf-case'],
    },
    long: {
      A: ['symptom-mcq', 'ectopic-mcq', 'pill-mcq', 'vasectomy-mcq', 'lam-mcq', 'condom-mcq', 'iui-mcq', 'blocked-tubes-mcq', 'stigma-ar', 'amnio-ban-ar'],
      B: ['sexed-short', 'pill-short', ['population-short', 'adoption-short'], 'counsel-short', ['natural-short', 'art-short']],
      C: ['sti-long', ['steril-long', 'infertility-long']],
      D: ['sti-case', 'clinic-case'],
    },
  },
  checksExtra: {
    biology_facts: 'Reproductive health and RCH programmes, STIs (curability, routes, complications, prevention), population growth, natural, barrier, IUD, hormonal, emergency and surgical contraception, MTP (stated without week limits beyond first-trimester safety), amniocentesis and its ban for sex determination, infertility and ART (IVF–ET with ZIFT/IUT, GIFT, ICSI, AI/IUI) checked against the 2026-27 syllabus scope (see README "Verifier pass"); written in neutral, factual, age-appropriate language',
    counting_rules: 'Worked-example and item numbers (doubling times, population projection, fertile-period dates, percentage falls, ZIFT/IUT routing) are computed by src/calc.mjs or from stated rules, not typed in',
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
