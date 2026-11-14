# subject-producer — CBSE Class 11 Computer Science (Python), ch01–ch08 hand-authored — 2026-11-14

Status: done. All 8 chapters of `platform/catalog/cbse/11/computer-science/syllabus.yaml` are hand-authored, reviewed, gated and committed, one commit per chapter. Every item has `status: "draft"` (D-025/D-026/D-050).

Branch: `platform/subject-producer/cbse-11-computer-science` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse11computerscience`), fast-forwarded to `platform/main` 1ea7b21f before work. Not pushed, not merged.

## What changed
New chapters under `platform/content/authored/computer-science/cbse-11-computer-science-chNN/` (release.json, tests.json, README.md, `src/` with `lib.mjs`, `questions.mjs`, `build.mjs`, `py-cache.json`). `lib.mjs` (identical in all 8, md5 d04feae4…) is the CBSE 12 CS lib plus `setAuthor` and a shape check of both tests against `cbse-11-default-chapter-test-short` / `-long`.

| Ch | Title | Commit | Slides | Notes | Cards | Questions | Code-output | App.+ | Python programs cached | Model |
|---|---|---|---|---|---|---|---|---|---|---|
| 01 | Computer Systems and Organisation | fde574c6 | 18 + 21 | 6 | 30 | 79 (152 marks) | 4 | 58% | 9 | Sonnet 5.5 (earlier session), Opus-reviewed |
| 02 | Introduction to Problem Solving | ed11e367 | 18 + 17 | 7 | 30 | 70 (135 marks) | 10 | 57% | 71 | Sonnet 5.5 (earlier session), Opus-reviewed |
| 03 | Python Fundamentals | d6cda199 | 20 + 19 | 6 | 30 | 87 (163 marks) | 14 | 60% | 262 | Sonnet 5.5 (two sessions), Opus-reviewed |
| 04 | Flow of Control | 80052ebb | 20 + 20 | 6 | 30 | 79 (152 marks) | 13 | 59% | 208 | Sonnet 5.5 (two sessions), Opus-reviewed |
| 05 | Strings | fb5b64dc | 19 + 19 | 6 | 30 | 78 (153 marks) | 12 | 56% | 316 | Sonnet 5.5, Opus-reviewed |
| 06 | Lists and Tuples | 63ec021c | 20 + 21 | 6 | 30 | 77 (150 marks) | 12 | 58% | 252 | Sonnet 5.5, Opus-reviewed |
| 07 | Dictionaries and Python Modules | 2881f9b3 | 20 + 20 | 6 | 30 | 78 (153 marks) | 12 | 58% | 229 | Sonnet 5.5, Opus-reviewed |
| 08 | Society, Law and Ethics | 3ba23066 | 20 + 20 | 6 | 30 | 83 (151 marks) | 0 | 47% | 0 (numbers asserted in JS) | Sonnet 5.5, Opus-reviewed |
| **Total** | | | **312 slides** | 49 | 240 | **631** | 77 | | ~1,350 | |

- Every chapter: two decks (goals, worked examples with Python-computed traces, 3–4 checks each, summary, exam tips, a visual at least every 3 slides), notes, 30 flashcards; mcq, assertion-reason, true-false, fill-blank, match, ordering, code-output (Python chapters), 2- and 3-mark shorts (error-finding items via `pyErr`), 5-mark longs and 4 case-based items with an Either/Or part (c).
- Tests: `t_cbse11computerscience_chNN_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on the CBSE 11 class-default blueprints, item for item including the internal-choice groups; disjoint; no deck-check item.
- Execution: every output, error line, trace and value shown anywhere is produced by running Python 3.12 (`py -3`) at build time; results are cached in `src/py-cache.json` (committed). ch07's random-module items state no unseeded output: possible-output sets are enumerated in hidden Python and cross-checked against real runs.

## Review (Opus) — changes beyond the writers' own
- ch01: three one-step items retagged application → understanding (`m_kb`, `m_and`, `m_nand_out`); NAND explanation no longer claims a NAND gate has only two inputs.
- ch03: `co_complex` uses `.imag` instead of `.conjugate()` (outside the syllabus).
- ch05: an empty inline-code distractor replaced with "An empty line" (`"lantern"[3:50]` item).
- ch06: the tuple-creation table printed `print(4, 5, 6)` as the value of `4, 5, 6`; it now evaluates each expression as a tuple (`(4, 5, 6)`).
- ch08: six scenario-labelling MCQs retagged application → understanding (`m_tm_scn`, `m_plag_scn`, `m_piracy_scn`, `m_ransom_scn`, `m_3r_scn`, `m_disability`); `l_licences` raised to d5 evaluation; the lab-clear-out percentages rounded to one decimal (were 41.666666666666664%); the IT Act appeal body now says the Cyber Appellate Tribunal was set up by the Act and its work passed to TDSAT in 2017.
- ch02 and ch04 (drafted before this session) and ch07 needed no item changes. All keys were checked item by item.

## How to verify
From `platform/` in the worktree, under `C:/Users/Prabhu/soyl-wt/_tools/heavy.sh`:
```
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cbse --class 11 --subject computer-science --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
npx vitest run --root content-pipeline test/series.test.ts
```
Rebuild a chapter: `npx tsx content/authored/computer-science/cbse-11-computer-science-chNN/src/build.mjs` (prints NO ERRORS; leaves the tree clean).

Gate run 2026-11-14 14:10–14:22 IST on the final tree (all 8 chapters rebuilt first, then rebuilt again: byte-identical): content-templates 5209/5209; lint ch01–ch08 0 errors, 0 warnings; verify 8 units, 631 questions, 0 blocking flags; originality 744 units, 0 errors; db6-split 8/8; api content.test 13/13; series.test 41/41.

## Tests added
None (content only).

## Known gaps / follow-ups
- Narration audio not generated (TTS stage). No content-verifier sample yet.
- Python 3.12 error wording (e.g. `Did you mean: 'total'?` suffixes); marking rests on the error type and the fix.
- Nobody has seen the SVGs, wide trace tables or code in two-column slides at 360 px.
- ch08: law is described by purpose only (no section numbers, penalties or cases).

## Decisions made
None (no ADR; no shared file, catalog, schema, template or test touched).

## Needs from owner
None.
