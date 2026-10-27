# assessment-designer — Science and SST competency balance, Maths lint band (D-035) — 2026-10-27

Status: **done**. Follow-up to `2026-10-27-assessment-designer-cbse10-maths-balance.md` (merged as e0d5de3).
Branch: `platform/assessment-designer/cbse10-maths-balance` (same worktree), with `origin/platform/main` merged first.

## Summary

1. **Science and SST rebalanced.** Both banks got an honest competency audit with the same rule as Maths. No new items were needed. Their mocks and May papers were re-frozen (`--refreeze mocks,may`) and the unit tests are byte-identical.
   - Every board and May paper of all three subjects is now within ±3 marks of the competency targets, whichever alternatives a student picks.
   - `series.test.ts` asserts this for all three subjects; the Science/SST exemption is gone.
   - No frozen paper carries a "re-freeze to rebalance" note any more.
2. **D-035.** `balance.competency` uses a per-subject band from config (`LINT_COMPETENCY_BAND`): default 45–65 %, `cbse-10-mathematics` 20–65 %. Maths now has 0 `balance.competency` warnings. A test covers the band, and the D-035 row is in `docs/platform/DECISIONS.md`.

## 1. Competency audit (Science and SST)

The rule is the one used for Maths. A routine, textbook-standard step on given data is **understanding**:
- a one-step formula numerical (Ohm's law, Q = It, P = 1/f, mirror and lens formulas, refractive index, chromosome halving);
- a balanced equation or electron-dot structure;
- naming a compound, part or hormone;
- a standard ray diagram or derivation;
- a value read or computed straight off a table.

These keep their tags: applying ideas to a new situation, interpreting data or an experiment, explaining an observation, multi-step problems, analysis and evaluation. Case and source items whose parts are now mostly recall/understanding carry `understanding` at the top level, as in Maths. Only `competency` and `bloom` changed; I diffed every release field, and the only other change is the build-check line that records lint warnings.

| Subject | Item tags changed | Part tags changed | Total |
|---|---|---|---|
| Science | 111 | 56 | 167 |
| Social Science | 6 | 29 | 35 |

Per chapter (items / parts): Science ch02 5/2, ch03 8/3, ch04 14/6, ch05 4/2, ch06 1/4, ch07 2/3, ch08 4/1, ch09 22/7, ch10 4/3, ch11 26/11, ch12 5/1, ch13 6/5, ch14 8/5, ch15 2/3; SST ch01 1/0, ch02 1/0, ch03 0/1, ch05 2/2, ch06 0/2, ch07 0/2, ch08 0/1, ch09 0/2, ch10 1/0, ch11 0/3, ch12 0/5, ch13 0/1, ch14 1/0, ch15 0/1, ch16 0/1, ch17 0/1, ch18 0/2, ch19 0/3, ch20 0/2. Each changed chapter's README has a "Competency audit" section with the new counts.

**SST "Explain three reasons …" items were left as they are.** I first re-tagged 69 SST short and long items whose answers are textbook explanations ("Explain three reasons for the decline of Indian cotton weaving", "Compare rice and wheat under five headings"). I reverted them. The CBSE SST design puts 50 % of marks at analysis/evaluation, so the board itself treats such explanation items as analysing, and the command word decides. Only pure recall and look-ups in source parts were re-tagged (name the Act, name the port, read a value off the table).

Science ch01 is an exemplar (exemplar-author's) and was not changed.

## 2. Re-freeze

```
npm run content -- assemble --board cbse --class 10 --subject science --series --source files --freeze --refreeze mocks,may
npm run content -- assemble --board cbse --class 10 --subject social-science --series --source files --freeze --refreeze mocks,may
```

- **Replaced:** 8 papers each (mocks 1–6, May 1–2). These are new test versions; nothing has been released to students (ADR-019 addendum).
- **Unchanged:** unit tests 1–3 of both subjects are byte-identical (JSON-compared).
- **Maths:** its frozen file is unchanged in this round.
- **May papers re-using same-subject mock questions (a soft rule):** Science 7 / 90, SST 8 / 86.
- **0 % overlap** inside every series (asserted).

### Competency per paper (recall+understanding / application / analysis+evaluation)

Marks are counted per part, with choice alternatives averaged. Brackets give the range over every choice a student can make. "Before" is the old paper with the old tags.

| Science | Target | Before | After |
|---|---|---|---|
| mock_1 | 40 / 24 / 16 | 42 (36–48) / 24.5 (17–32) / 13.5 (10–17) | 40 / 24 / 16 |
| mock_2 | 40 / 24 / 16 | 40.5 (37–44) / 25 (21–29) / 14.5 (12–17) | 40 / 24 / 16 |
| mock_3 | 40 / 24 / 16 | 41.5 (33–50) / 26 (19–33) / 12.5 (11–14) | 40 / 24 / 16 |
| mock_4 | 40 / 24 / 16 | 42 (41–43) / 22 (17–27) / 16 (12–20) | 40 / 24 / 16 |
| mock_5 | 40 / 24 / 16 | 39.5 (38–41) / 29.5 (28–31) / 11 | 40 / 24 / 16 |
| mock_6 | 40 / 24 / 16 | 42.5 (35–50) / 25 (18–32) / 12.5 (10–15) | 40 / 24 / 16 |
| may_1 | 40 / 24 / 16 | 40.5 (37–44) / 24 (23–25) / 15.5 (13–18) | 40 / 24 / 16 |
| may_2 | 40 / 24 / 16 | 39 (33–45) / 24.5 (20–29) / 16.5 (15–18) | 40 / 24 / 16 |

| Social Science | Target | Before | After |
|---|---|---|---|
| mock_1 | 24 / 15.6 / 40 | 22 (17–27) / 15.5 (13–18) / 42.5 (40–45) | 24 / 16 / 40 |
| mock_2 | 24 / 15.6 / 40 | 22 (18–26) / 15 / 43 (39–47) | 24 / 16 / 40 |
| mock_3 | 24 / 15.6 / 40 | 30.5 (24–37) / 16 (12–20) / 33.5 (31–36) | 24 / 16 / 40 |
| mock_4 | 24 / 15.6 / 40 | 27.5 (21–34) / 17 / 35.5 (29–42) | 24 / 16 / 40 |
| mock_5 | 24 / 15.6 / 40 | 31 (26–36) / 19 / 30 (25–35) | 24 / 16 / 40 |
| mock_6 | 24 / 15.6 / 40 | 28.5 (21–36) / 16 / 35.5 (28–43) | 24 / 16 / 40 |
| may_1 | 24 / 15.6 / 40 | 27 (23–31) / 15 / 38 (34–42) | 24 / 16 / 40 |
| may_2 | 24 / 15.6 / 40 | 26 (21–31) / 21.5 (19–24) / 32.5 (30–35) | 24 / 16 / 40 |

After the re-freeze, every paper gives the same shares whichever choices a student makes. Science is exact. SST is at most 0.4 marks off (the SST blueprint shares add up to 79.6 marks, not 80).

## 3. D-035: per-subject lint band

- **Config:** `content-pipeline/config/pipeline.ts` has `LINT_COMPETENCY_BAND = { default: 45–65 %, bySubject: { 'cbse-10-mathematics': 20–65 % } }`. `COMPETENCY_BAND` in `lint/index.ts` is now the default band.
- **Code:** `competencyBandFor(subjectId)` picks the band; `LintContext.subjectId` is set by `lintContextFor`.
- **Test** (`lint-rules.test.ts`): with 30 % of items at application or higher, Maths gets no warning but Science and SST do; 15 % warns for Maths too; 50 % warns for neither. The test also checks the config values.
- **Result:** Maths `balance.competency` warnings went from 11 to 0.
- **Scope:** the band is keyed by subject id. It applies to `cbse-10-mathematics`, the only subject whose bank serves two paper variants. Other classes' Maths keep the default; adding them is one config line.

## Open issue for the Lead: Science lint warnings

The honest Science audit puts 11 Science chapters below the 45 % floor that D-035 keeps for Science: ch02 42 %, ch03 36 %, ch04 33 %, ch05 44 %, ch08 41 %, ch09 36 %, ch11 30 %, ch12 43 %, ch13 41 %, ch14 34 %, ch15 44 %. SST ch05 is at 44.x % (shown as 45 %). These are warnings, not errors: `lint --exemplars` exits 0, and the board papers are exact.

The cause is the same as in Maths. Most one-step numericals (V = IR, P = 1/f …), balanced equations and ray diagrams were tagged application, and they are honest understanding. I did not lower the Science band (your decision) and did not undo honest tags to fit it. Options:
- (a) a Science band of about 30–65 % in `LINT_COMPETENCY_BAND`;
- (b) measure the band by marks rather than items (written items carry more marks and are more often application or higher);
- (c) accept the warnings.

The Hindi exemplar ch10 warning (26 %) was already there.

## How to verify (from `platform/`)

```
npx vitest run --root content-pipeline test/series.test.ts test/lint-rules.test.ts
for s in science mathematics social-science; do npm run content -- assemble --board cbse --class 10 --subject $s --series --source files --strict --verbose | grep -c "re-freeze to rebalance"; done   # 0 0 0
npm run content -- lint --exemplars --verbose | grep -B1 "balance.competency"   # no cbse-10-mathematics lines
```

## Gate results

GATES_PLACEHOLDER
