# ISC Class 11 Accounts, Chapter 3 — Accounting Equation and Journal

`isc-11-accounts-ch03` · release v1 · academic year 2026-27 · family `economics-commerce` (ISC Accounts, Class XI) · provenance `human`, author `claude-sonnet-5-5 (subject-producer chapter writer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032, D-050) on the pattern of the CBSE 11 Accountancy chapters and `isc-12-accounts-ch01`. Built from `src/` (`npx tsx content/authored/economics-commerce/isc-11-accounts-ch03/src/build.mjs` from `platform/`); the build validates the schema, runs the pipeline lint and deterministic verify checks, the answer-leak scan, narration rules and editorial counts, then writes `release.json` and `tests.json` (or parks them as `*.wip.json`). Rebuilding is byte-identical. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (21 + 20 slides), notes (7 sections), 34 flashcards, 72 questions (140 marks) |
| `tests.json` | `t_isc11accounts_ch03_short` (20 marks, 50 min, 12 items) on `isc-11-default-chapter-test-short` and `t_isc11accounts_ch03_long` (40 marks, 100 min, 24 items) on `isc-11-default-chapter-test-long`, item for item |
| `src/` | `lib.mjs` and `acc.mjs` (shared lib and accounting engine, copied unchanged), `fig.mjs` (chapter figures and assertions), `q_t01.mjs`, `q_t02.mjs`, `q_t03a.mjs`, `q_t03b.mjs`, `q_t04.mjs` (bank by topic), `qq.mjs`, `questions.mjs`, `build.mjs` (decks, notes, cards, tests, extra gates) |

## Scope
- **t01** accounting equation: meaning, usefulness, effect of transactions in tables of assets, liabilities and capital (drawings, profit, credit purchases, sales at a profit), missing figure — 18 items.
- **t02** double entry, classification of accounts (traditional: personal natural/artificial/representative, real, nominal; modern: assets, liabilities, capital, revenues, expenses) and the rules of debit and credit under both — 16 items.
- **t03** journal: meaning, advantages, format; simple, compound and opening entries with narrations (cash and credit purchases and sales, returns, discounts, drawings in cash and goods, goods lost or given as charity, bad debts, depreciation, interest, outstanding items) — 31 items. Posting to ledgers is only named as the next step (ISC Chapter 4).
- **t04** GST: theory only (meaning, CGST/SGST/UTGST/IGST, input tax credit) — 7 items. **Removed topic** (journal entries with GST): no GST entry, rate or computation anywhere; the build scans decks, notes, cards and stems for one. One note says GST entries are not in the syllabus.

## Contents
- **Deck 1:** 21 slides, 18 with visuals, 4 worked examples, 3 checks. **Deck 2:** 20 slides, 17 with visuals, 4 worked examples, 3 checks. Narration at most 83 words (mean 58), words only (enforced).
- **Notes:** 7 sections, each with key terms, formats and a visual; exam tips on ISC mark allocation and common mistakes.
- **Flashcards:** 34.
- **Questions (72, 140 marks):** mcq 20 (keys a5 b5 c5 d5), assertion-reason 6 (ISC options, d = both false; keys b a c d a c), true-false 5, fill-blank 5, numerical 7, short 2-mark 10, short 3-mark 12, long 5-mark 7. Topics t01 18, t02 16, t03 31, t04 7.
- **Difficulty:** d1 12, d2 26, d3 30, d4 4. **Competency:** recall 8, understanding 21, application 34, analysis 9; **60% application or above** (lint band 45–65%).
- Written answers keep the full working in `answer.model_answer_md`; `solution_md` is a short method note.

## Tests (disjoint; no deck-check item; no case-based or numerical items)
- **Short (20 marks, 50 min):** A 4 MCQ + 1 A-R; B one 2-mark then one of two; C one 3-mark then one of two; D one 5-mark.
- **Long (40 marks, 100 min):** A 10 MCQ + 2 A-R; B two 2-mark then one of two; C three 3-mark then one of two; D one 5-mark then one of two.

## Verifier record (what the build computes and asserts)
- The accounting equation balances after every transaction in every table; opening capital is the balancing figure.
- Every journal entry balances (debits equal credits), compound entries included; discounts equal the difference between the amount due and the amount settled.
- Every table in decks, notes and model answers is generated from computed values; MCQ distractors come from named wrong methods and differ from the key.
- Extra gates in `build.mjs`: TTS-safe narration; near-duplicate stems in the bank; disjoint tests, no deck-check item in a test, marks 20 and 40; no GST entry, rate or computation.

## Originality
All firms (for example Amravati Cotton Traders, Kozhikode Fan House, Raipur Drum Works), people and figures are imagined. The CBSE 11 Accountancy chapter 3 firms, figures, dates and wording were avoided, as were its GST entries; no textbook or CISCE specimen/past-paper item is reused.

## Flagged treatments
- Classification follows both the traditional and the modern approach; a rule is always given under both.
- Depreciation, interest and outstanding items appear only as simple journal cases; adjustments belong to later chapters.

## Gaps
- No case-based items; no narration audio (TTS needs OA-03).
- Wide journal and equation tables should be checked at 360 px on staging.
