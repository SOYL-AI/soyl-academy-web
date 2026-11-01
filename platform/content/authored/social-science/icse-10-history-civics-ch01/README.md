# ICSE Class 10 History & Civics, Chapter 1 — The Union Parliament: Lok Sabha, Rajya Sabha and the Speaker

`icse-10-history-civics-ch01` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is hand-authored (D-025, D-026, D-032). It is built from `src/`: run `npx tsx content/authored/social-science/icse-10-history-civics-ch01/src/build.mjs` from `platform/`. Edit `src/`, not the JSON.

`src/lib.mjs` is the **shared ICSE 10 History & Civics library**, and every chapter of the subject imports it from this folder. It is a copy of the ISC 12 Economics lib, which brings the SVG builder, a build-time exact-stem originality pre-check and `*.wip.json` parking. One change is ICSE-specific: assertion-reason options follow the ICSE 2027 specimen order:
- (a) A true, R false
- (b) A false, R true
- (c) both true and R explains A
- (d) both true and R does not explain A

`ar()` takes a `verdict` rather than a letter, so a key cannot be mis-lettered.

| File | What |
|---|---|
| `release.json` | 2 decks of 18 + 15 slides with 25 visuals (4 SVG: the Parliament chart, the three lists, the Rajya Sabha rotation, and the picture of Houses P and Q), 6 notes sections, 30 flashcards, 73 questions worth 171 marks |
| `tests.json` | `chapter-test-short`: 20 marks in 30 min, on `icse-10-history-civics-chapter-test-short`. Part I has 5 MCQs, 1 assertion-reason item and 2 two-mark shorts; Part II is 1 of 2 ten-mark questions. |
| | `chapter-test-long`: 40 marks in 60 min, on `icse-10-history-civics-chapter-test-long`. Part I has 9 MCQs, 1 assertion-reason item and 5 two-mark shorts; Part II is 2 of 3 ten-mark questions. |
| | The two tests are disjoint and use no deck-check item. |

## Scope

- **t01:** the federal set-up and the three lists (12 tags)
- **t02:** the Lok Sabha (18)
- **t03:** the Speaker (19)
- **t04:** the Rajya Sabha (19)
- 5 items cover two topics.

### Question bank

| Type | Count |
|---|---|
| mcq | 28 (keys 7 each); one is picture-based on our own SVG |
| assertion-reason | 5 |
| true-false | 4 |
| fill-blank | 3 |
| numerical | 3 |
| match | 2 |
| ordering | 1 |
| short 2-mark | 12 |
| short 3-mark | 4 |
| short 4-mark | 1 |
| long 10-mark | 7, each in three parts (3 + 3 + 4) with one step mark per point |
| source-based (an imagined student diary) | 1 |
| case-based (an imagined mock-Parliament notice and an imagined news report) | 2 |

- **Difficulty:** d1 14, d2 32, d3 24, d4 3.
- **Competency:** recall 16, understanding 23, application 17, analysis 14, evaluation 3. That puts 47% of items at application or above (lint band 45–65%).

## Facts for a reviewer (Constitution as amended to 2024)

1. **Parliament** = the President + the Rajya Sabha + the Lok Sabha (Article 79).
2. **Three lists:** they are in the **Seventh Schedule** (Union, State, Concurrent).
   - **Residuary powers** belong to Parliament.
   - On a Concurrent subject a Union law **generally** prevails over a conflicting State law, to the extent of the conflict.
   - Examples used:
     - Union: defence, foreign affairs, railways, banking.
     - State: police and public order, agriculture, public health.
     - Concurrent: education, forests, marriage and divorce, trade unions.
3. **Lok Sabha size:** up to **530** members from the States and **20** from the Union Territories, a maximum of **550** elected. **543** are elected at present.
   - **Dated note:** the two Anglo-Indian nominated seats lapsed in **January 2020** (the 104th Amendment did not extend them), so the older maximum of **552** no longer applies. Items teach 550 and 543 and mention 552 only as the earlier figure.
4. **Lok Sabha qualifications:** citizen; at least **25**; not holding an **office of profit**; not of unsound mind or an undischarged insolvent; name on an electoral roll.
5. **Lok Sabha term:** **five years** from its first meeting. It can be dissolved earlier by the President on the advice of the Prime Minister. During a national emergency it can be extended by law **one year at a time**, but not beyond **six months after** the emergency ends.
6. **Speaker, election and tenure:** elected by members from among themselves. The Speaker continues after dissolution until just before the new House first meets.
7. **Speaker, removal:** a resolution after at least **14 days' notice**, passed by a **majority of all the then members**. The Speaker does not preside during it but may speak and vote in the first instance.
8. **Speaker, functions:**
   - a casting vote in a tie only;
   - certifies Money Bills, and the decision is final;
   - presides over joint sittings;
   - adjourns the House for want of quorum (**one-tenth**);
   - the Deputy Speaker presides in the Speaker's absence.
9. **Rajya Sabha composition:** maximum **250** = up to **238** representatives of the States and Union Territories + **12** nominated by the President (literature, science, art, social service). **245** at present, stated "as of 2024".
10. **Rajya Sabha election and term:** elected by the **elected members of State Legislative Assemblies** by proportional representation with the single transferable vote. Minimum age **30**. Members serve a **six-year** term. It is a permanent House, and about **one-third retire every second year**.
11. **Rajya Sabha presiding officer:** the **Vice-President** is ex-officio Chairman and is not a member. An elected **Deputy Chairman** presides in the Chairman's absence.
12. **Not mentioned:**
    - the women's reservation amendment (2023), which takes effect only after the next delimitation;
    - any current office-holder.

**Computed figures** (asserted in `questions.mjs`):
- 530 + 20 = 550, and 550 + 2 = 552
- 238 + 12 = 250, and 233 + 12 = 245
- effective majority with 543 seats and 7 vacant: 536 members, so 269 votes
- an imagined removal vote of 262 for, which fails
- born 2003 → eligible for the Lok Sabha in 2028 and the Rajya Sabha in 2033
- elected 2026 → term ends 2032

## Originality and verification

- **Originality:** every scenario, document and picture is written by SOYL and labelled as imagined: Kohima quiz, Kalimpong debate, Gangtok diary, Riverside School mock Parliament, *Vindhyachal Times*. No textbook text, speech, quotation, specimen or past-paper item is reused (D-036).
- **Duplicate stems:** a 5-gram near-duplicate scan using the originality gate's rule compared 73 stems with 23,500 others and found 0 flags.
- **SVG labels:** the overflow and overlap check passes on all 4 figures.
- **Build checks:** schema, pipeline lint (0 errors, 0 warnings), deterministic verify, narration rules and the answer-leak scan all run clean.
- **Rebuild:** byte-identical.

## Gaps

- **Rendering:** nobody has seen the SVG labels rendered, so they need a look at 360 px on staging.
- **Audio:** narration has no audio yet; TTS runs at release.
