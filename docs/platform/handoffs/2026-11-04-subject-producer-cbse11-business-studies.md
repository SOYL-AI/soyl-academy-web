# subject-producer — CBSE Class 11 Business Studies, hand-authored chapters — 2026-11-04 to 2026-11-05

Status: done. All 10 syllabus chapters (ch01–ch10) are committed, each after a fully green gate run.

Branch: `platform/subject-producer/cbse-11-business-studies`, worktree `C:/Users/Prabhu/soyl-wt/content-cbse11-business-studies`.
- Fast-forwarded to `platform/main` before writing and again before the final gate (5cede4b).
- Not pushed and not merged.

Writers (D-050):
- Every chapter was written by a **Sonnet 5.5** sub-agent, at most two at a time. Opus (this agent) reviewed, fixed small problems, gated and committed.
- The Opus quality fallback was **not needed**.
- ch04's first writer hit a session limit after writing `src/`. A second Sonnet writer checked that work against the facts, trimmed a 23-slide deck to 22, and finished the README.

## What changed
- **Chapter files:** each chapter is in `platform/content/authored/economics-commerce/cbse-11-business-studies-chNN/`, with `release.json`, `tests.json`, `README.md` and `src/{questions.mjs, build.mjs}`.
- **Shared lib:** `cbse-11-business-studies-ch01/src/lib.mjs`, committed with ch01. It is the CBSE 11 Political Science lib, which is the CBSE 12 Business Studies/Political Science lib plus two additions:
  - the build-time exact-stem originality pre-check;
  - a semantic `verdict` for assertion-reason items, in CBSE option order.
- **Blueprints:** the subject's own blueprints are annual and half-yearly only, so the chapter tests use the class defaults:
  - `cbse-11-default-chapter-test-short`: 20 marks, 40 minutes.
  - `-long`: 40 marks, 90 minutes.
  - The two tests share no question and use no deck-check item.
- **Imagined firms:**
  - Every firm, person and figure in an item is imagined and labelled as such. No real company or brand appears.
  - Real public institutions (RBI, IRDAI, SEBI, NSIC, DIC, SIDBI, NABARD, DGFT, WTO, IMF, World Bank, UNCTAD) are named only for what they do.
  - Amounts (profit shares, CSR spends, debenture interest, preference arrears, GST credit chains at an imagined rate, export values at an imagined exchange rate) are computed in code.
- **Time-sensitive facts:**
  - Every such fact is dated ("as of 2024", or "as of 2026" in ch08) and listed in each README's reviewer list.
  - Limits that changed recently are taught as principles, with no figures:
    - MSME classification: composite investment and turnover criteria since 2020, limits revised again from 2025.
    - GST rate slabs: restructured in 2025. GST computations use an explicitly imagined rate.
- **Status:** all items are `status: "draft"`, provenance `human` (D-025/D-026).

| Chapter | Commit | Writer | Slides | Notes | Flashcards | Questions | App+ |
|---|---|---|---|---|---|---|---|
| ch01 Nature and Purpose of Business (+ lib) | 7feec54 | Sonnet 5.5 | 21 + 22 | 6 | 29 | 79 | 59% |
| ch02 Forms of Business Organisation | 405cb58 | Sonnet 5.5 | 22 + 21 | 6 | 31 | 75 | 52% |
| ch03 Public, Private and Global Enterprises | (14b6231) | Sonnet 5.5 | 21 + 20 | 7 | 32 | 78 | 55% |
| ch04 Business Services | (1414fc0) | Sonnet 5.5 (two writers) | 22 + 22 | 6 | 33 | 76 | 54% |
| ch05 Emerging Modes of Business | (bfaa3c5) | Sonnet 5.5 | 21 + 21 | 7 | 32 | 78 | 63% |
| ch06 Social Responsibility of Business and Business Ethics | (aa16a26) | Sonnet 5.5 | 20 + 22 | 7 | 30 | 79 | 65% |
| ch07 Sources of Business Finance | (6aa7aa8) | Sonnet 5.5 | 22 + 22 | 7 | 32 | 74 | 58% |
| ch08 Small Business and Enterprises | (03057ed) | Sonnet 5.5 | 19 + 21 | 7 | 31 | 76 | 57% |
| ch09 Internal Trade | (9c8a59e) | Sonnet 5.5 | 21 + 22 | 7 | 34 | 75 | 53% |
| ch10 International Business | (0ccb0a3) | Sonnet 5.5 | 21 + 22 | 7 | 32 | 79 | 49% |

**Totals:** 10 chapters, 425 slides, 316 flashcards and 769 questions.
- Application-or-above is between 49% and 65%, inside the lint band of 45–65%.
- ch05 and ch06 sit at the upper end because they are case-heavy chapters, where many items ask students to identify a concept in an imagined case.

## How to verify
From `platform/` in the worktree, run each command one at a time; run the heavy gates through `_tools/heavy.sh`.
```
npm test -w @soyl/content-templates
npm run content -- catalog                         # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars                # ok for all 10 cbse-11-business-studies chapters, 0/0
npm run content -- verify --board cbse --class 11 --subject business-studies --authored   # 10 units, 0 blocking
npm run content -- originality --authored          # 0 error(s)
npx vitest run --root db test/db6-split.test.ts    # 8/8
npx vitest run --root api test/content.test.ts     # 13/13
```
To rebuild a chapter, run `npx tsx content/authored/economics-commerce/cbse-11-business-studies-chNN/src/build.mjs`; it should print `NO ERRORS`. Writers confirmed byte-identical output across 3 builds.

### Gate runs
| Run | Started (IST) | Covered | Result |
|---|---|---|---|
| g1 | 2026-11-04 20:54 | ch01–04 | fully green. ch01 and ch02 committed; ch03 and ch04 had changed during the run, so they were not committed. |
| g2 | 2026-11-05 00:47 | ch01–05 | everything green except the API content test, which failed to load and skipped all 13 tests. Run alone, it passed 13/13. Treated as transient; nothing was committed on g2. |
| g3 | 2026-11-05 (see commit) | ch01–10, after merging main and the review fixes | → ch03–ch10 |

## Review (Opus): fixes and checks
- **Assertion-reason verdicts:** checked every one against its A and R statements; all correct.
- **Writing-process wording:** my briefs said "describe … in general terms". Writers carried that phrase into headings, table headers, flashcards, narration and solutions in ch03, ch04, ch05, ch07, ch08 and ch09.
  - I removed it everywhere except advice to students ("describe support in general terms with a date").
  - ch08 also had narration saying "we describe it in general terms", which is now removed.
  - The briefs now forbid such phrases in content.
- **Competency tags (team rule from 2026-11-05):** writers' reported retags were spot-checked.
  - ch07 lowered three items to understanding, and ch09 lowered several from analysis to application or understanding. All of these are honest: each item names a source or concept from a near-definitional description.
  - "Quote the line that shows …" case parts are tagged application. This is the CBSE identify-the-concept form. Child tags do not count toward the band.
- **ch04:** a deck of 23 slides was trimmed to 22.
- **ch07:** after the wording fix, one narration line became an answer leak. I reworded it.
- **Flagged facts checked**, all correct as of 2024:
  - partnership maximum of 50 partners under the Companies Act 2013 rules;
  - private company 2–200 members, public company at least 7;
  - common seal optional since 2015;
  - declaration before commencement of business since 2019, covering private companies too;
  - unregistered firm: no suit against third parties, and a set-off limit;
  - daughters as coparceners since 2005;
  - government company at 51% or more government holding;
  - section 135 CSR thresholds (net worth Rs 500 crore, turnover Rs 1,000 crore, net profit Rs 5 crore; 2% of average net profit of the 3 preceding years);
  -
  - WTO established 1 January 1995, succeeding GATT (1948);
  - NSIC 1955, DIC 1978, NABARD 1982, SIDBI 1990;
  - UPI launched 2016;
  - GST from 1 July 2017 under the 101st Amendment.
- **Maps:** none. Every SVG is a chart or diagram.

## Known gaps / follow-ups
- Only chapter tests were built; there are no half-yearly or annual papers.
- The class-default blueprints are marked `source_status: unverified`.
- The SVGs were checked only by script. A 360 px pass on staging is worthwhile.
- The dated notes (payment systems, procedures, MSME, GST, Companies Act limits) need an annual check.

## Decisions made
- D-050 followed.
- No new ADR.

## Needs from owner
None.
