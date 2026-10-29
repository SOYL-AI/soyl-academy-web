# CBSE Class 12 Economics, Chapter 11 — Employment: Growth, Informalisation and Other Issues

`cbse-12-economics-ch11` · release v1 · academic year 2026-27 · family `economics-commerce` (Part B: Indian Economic Development) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) on the pattern of `cbse-10-social-science-ch19` and CBSE 12 Economics ch06/ch10. Built from `src/` (`npx tsx content/authored/economics-commerce/cbse-12-economics-ch11/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, editorial counts and the answer-leak scan, then writes `release.json` and `tests.json` (or parks them as `*.wip.json` if anything fails). Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (23 + 17 slides; 30 visuals: 4 SVG, 18 tables, 8 flows; 4 + 4 checks; 3 + 2 worked examples; narration ≤ 73 words, no symbols), notes (6 sections), 30 flashcards, 75 questions (137 marks; 4 case-based items with an internal choice in part (c)) |
| `tests.json` | `t_cbse12economics_ch11_short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `t_cbse12economics_ch11_long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item, disjoint, no deck-check items |
| `src/` | `lib.mjs` (same copy as ch01), `questions.mjs` (bank and computed figures), `build.mjs` |

## Scope
- **t01** worker, workforce, labour force; worker-population ratio and participation patterns (men/women, rural/urban, rural/urban women); status (self-employed, regular salaried, casual) and its rural/urban and gender pattern; distribution across sectors; jobless growth; casualisation; formal (public sector + private establishments with 10 or more hired workers) vs informal sector; informalisation incl. contract work inside formal firms; protecting informal workers.
- **t02** meaning and measurement of unemployment (labour force − workforce); open, disguised and seasonal unemployment; data sources (Census, NSO labour force surveys, employment exchanges); problems (slow formal job growth, farm underemployment, skills mismatch, low female participation); government roles (direct, indirect, wage-employment, self-employment and skill programmes); MGNREGA 2005; balanced appraisal.

### Decks
- **Part 1** (23 slides): route map, who is a worker (table), workforce vs labour force (tree), worker-population ratio, **worked example 1** (village ratios men 54, women 26, all 40 per cent; SVG bars), participation patterns, status categories, **worked example 2** (block status shares 52/31/17 per cent; SVG stacked bar), status by place and gender, sectors, jobless growth (SVG lines of output vs employment index), **worked example 3** (output +50 vs jobs +10 per cent, gap 40 percentage points), casualisation, formal vs informal, informalisation, protecting informal workers, summary, exam tips. Four checks.
- **Part 2** (17 slides): route map, who is unemployed, **worked example 4** (town: 8,000 − 7,600 = 400 unemployed, 5 per cent), types of unemployment, **worked example 5** (output of a family plot flat after 4 workers; SVG line; 3 of 7 disguisedly unemployed), data sources, problems, three routes of government job creation, kinds of programmes, MGNREGA 2005 flow, two-column appraisal, summary, exam tips. Four checks.

### Question bank (75 items)
mcq 27 (keys a7 b7 c7 d6) · assertion-reason 7 (a, a, b, d, a, d, b) · numerical 9 (+ 5 inside cases) · true-false 3 · fill-blank 2 · match 2 · ordering 1 · short 8 (2 marks) + 6 (3 marks) · long 6 · case-based 4 (Sitapur Khurd district workforce table, Ratnapur Garments contract workers, Devgarh panchayat wage-employment report, the Kisku family's seasons). Difficulty d1 14, d2 34, d3 22, d4 5. Competency: application or above 57% of items (band 45–65%; five routine one-step items tagged understanding under the D-035 rule). Topics t01 42, t02 33.

## Data and facts
- **All figures are imagined** and computed by the build (asserts in `questions.mjs` and `build.mjs`): district ratio 38 per cent; village women 27 per cent (men 52, all 40); block self-employed 52 per cent; town informal 90 per cent; casual share +8 percentage points; Sitapur Khurd rural 42 vs urban 34 per cent; Ratnapur contract share 20 → about 58 per cent; Devgarh wage bill ₹8,00,000 and 40 days per household; jobless-growth gap 45 percentage points.
- **Real-world facts (please double-check):** the formal-sector definition (public sector + private establishments employing 10 or more hired workers) follows the commonly taught classification; data sources named generically (Census, NSO labour force surveys, employment exchanges); MGNREGA 2005 described as up to 100 days of unskilled manual work a year per rural household that asks, an unemployment allowance if work is not given in time, wages into accounts. India's patterns (men > women, rural > urban, self-employment largest, falling but largest primary share, casualisation, jobless growth) are stated **qualitatively**; no survey figures are given.
- Policy wording is neutral: contract hiring, MGNREGA and government programmes are evaluated with both gains and limits.
- **Not covered:** the December 2025 law replacing MGNREGA (noted as a dated update in CBSE 10 SST ch19) is not mentioned, because the 2026-27 syllabus context here is MGNREGA 2005; a reviewer may add a dated note.

## Verifier notes
- Every MCQ solution explains the distractors; keys are set in code by the shared lib.
- Answer-leak scan: no key-side sentence of 60+ characters appears in decks, notes, flashcards or public question fields.
- Diagram labels in the four SVG figures are placed by coordinates and have not been seen rendered; check at 360 px on staging.
- Stems are chapter-specific (no generic "Match each term…" stems) to avoid `bank.duplicate` against other chapters.

## Gaps
- No map item (the chapter has no map work).
