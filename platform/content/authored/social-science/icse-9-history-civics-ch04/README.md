# ICSE Class 9 History & Civics, Chapter 4 — The State Legislature

`icse-9-history-civics-ch04` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus (elementary Civics: no Article is named by number or quoted). Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch04/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 21 slides; 13 + 16 with visuals: 3 SVG figures, the rest tables and flows; 4 checks each; 2 and 3 worked examples); notes (6 sections); 31 flashcards; 78 questions |
| `tests.json` | `t_icse9historycivics_ch04_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch04_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank, three SVG figures, asserted figures), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All four syllabus topics are covered (no removed topics for this chapter):
- t01: unicameral and bicameral legislatures; States with a Legislative Council; creating or abolishing a Council
- t02: the Legislative Assembly: composition, term, qualifications (and the Speaker and Deputy Speaker)
- t03: the Legislative Council: composition, term, qualifications; why it is a permanent House
- t04: powers and functions of the State legislature (legislative, financial, control over the executive, electoral, ratification of amendments) and the comparison of the two Houses

## Question bank (78 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 34 | Keys a 8, b 9, c 8, d 9 |
| assertion-reason | 5 | ICSE option order; keys a, c, a, c, c |
| true-false · fill-blank · match · ordering | 3 · 2 · 3 · 1 | Match: Houses and descriptions; numbers (ages, term, 14 days); powers and examples. Ordering: an ordinary bill that the Council opposes twice |
| short 2-mark | 12 | |
| short 3-mark | 8 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | Imagined documents: a newspaper report, a student's revision notes with two errors to find, a teacher's letter. Each has an either/or part (c). |

- **Difficulty:** d1 7, d2 25, d3 39, d4 7.
- **Competency:** recall 16, understanding 25, application 22, analysis 12, evaluation 3. That puts 47% of items at application or above.
- **Topics (items tagged):** t01 9, t02 17, t03 16, t04 25, plus 11 items spanning two or more topics.

## Tests (item keys)
- Short: A = `m_council_states`, `m_age_assembly`, `m_permanent`, `m_money_bill`, `ar_money`, `s_assembly_term_dissolve`, `s3_council_comp`; B = attempt 1 of `l_assembly`, `l_compare`.
- Long: A = `m_council_create`, `m_assembly_strength`, `m_dissolve`, `m_nominated`, `m_council_size`, `m_no_confidence`, `m_scn_bill`, `ar_nocon`, `s_uni_bi`, `s_council_perm`, `s_money_role`, `s3_assembly_qual`, `s3_financial`; B = attempt 2 of `l_council`, `l_powers`, `l_abolish`.
- Deck-check items (kept out of both tests): `m_uni_def`, `fb_term`, `m_office_profit`, `m_speaker_scn` (Part 1); `m_teacher_share`, `tf_council_dissolve`, `m_scn_money`, `m_electoral` (Part 2).

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan against all other chapters and exemplars: 0 flags; SVG label overflow and overlap: 0 issues.
- Every stem names an imagined State, member, document or situation (Tamrapur, Girivan, Sindhuvan, Dhavalpur, Kesarpur, Kolahar, Harsilla, Mayurgarh, Nirmal Vale, Vaidhara), so it does not repeat ICSE 10 ch01/ch02 or CBSE 11 Political Science wording.
- Not run by this writer (per brief): tree-wide gates, e2e, git.

## Facts for a reviewer to double-check
1. A State legislature is **unicameral** (Legislative Assembly only) or **bicameral** (Assembly plus Legislative Council). Assembly = Vidhan Sabha, "lower House"; Council = Vidhan Parishad, "upper House".
2. **As of 2024** the six States with a Legislative Council: Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana, Uttar Pradesh. Punjab, Gujarat, Kerala and Goa are used as examples of single-House States. **Reviewer: please confirm the list is still current before release; Councils have been created or abolished in the past.**
3. Parliament can create or abolish a Council by law, on a **resolution of the State Assembly passed by a special majority**. The chapter says "special majority" and does not state the exact majority.
4. **Legislative Assembly:** members directly elected from territorial constituencies; strength **not more than 500 and not less than 60**; "a few small States have fewer by special provision" (the chapter does not name them); seats reserved for the Scheduled Castes and Scheduled Tribes in proportion to population.
5. **Term of the Assembly:** five years from its first meeting; the **Governor** may dissolve it earlier (in practice on the Chief Minister's advice); **Parliament** may extend it **one year at a time** during a national emergency (the six-month limit after the emergency ends is not taught).
6. **Qualifications for the Assembly** (elementary): Indian citizen; at least **25 years**; on the electoral roll; **no office of profit**. The chapter says "the law lists a few other disqualifications" and does not list them.
7. **Speaker** elected by the members from among themselves; a **Deputy Speaker** is also elected and presides in the Speaker's absence. The Speaker keeps order and decides who speaks (the Speaker's power to certify a money bill is not taught).
8. **Legislative Council:** strength **not more than one-third of the Assembly** and **not fewer than 40**. The worked items use Assembly sizes of 150, 210 and 240, where one-third is above 40; the edge case of a small Assembly is avoided.
9. **Composition of the Council:** about **one-third** elected by MLAs; about **one-third** by local bodies (municipalities, district boards); **one-twelfth** by graduates; **one-twelfth** by teachers; about **one-sixth** nominated by the Governor from persons with special knowledge or practical experience of literature, science, art, the cooperative movement and social service. Shares add up to twelve twelfths (asserted in the code). The 96-member and 60-member items are arithmetic on these shares (32 + 32 + 8 + 8 + 16 = 96; one-third of 60 is 20).
10. **Council members:** citizen, at least **30 years**, term **six years**, **one-third retire every two years**; the Council is a **permanent House** (never dissolved); **Chairman** elected by the members.
11. **Ordinary bills:** the Council can delay an ordinary bill passed by the Assembly for up to **three months** the first time; if the Assembly passes it again and the Council again rejects it or takes no action for **one month**, it is treated as passed in the form the Assembly passed it (then to the Governor for assent). The chapter simplifies this to "the Assembly has the last word".
12. **Money bills:** introduced only in the Assembly; the Council may hold one for **fourteen days** and make recommendations, which the Assembly may accept or reject; then the bill is treated as passed.
13. **Control over the executive:** the Council of Ministers is collectively responsible to the **Assembly**; only the Assembly can pass a no-confidence motion; both Houses can question ministers and debate. A minister may be from either House.
14. **Electoral functions:** elected MLAs take part in the election of the **President**, elect the State's **Rajya Sabha** members, and elect about one-third of the Council. Council members do not vote in the Presidential election.
15. **Constitutional amendment:** certain amendments need ratification by the legislatures of **at least half of the States** after Parliament passes them (stated generally; the list of such amendments is not taught).
16. Legislative power: the State legislature makes laws on **State List and Concurrent List** subjects; a bill becomes law with the **Governor's assent** (the Governor's power to reserve a bill for the President is not taught).
17. Names used for illustration are imagined (States, constituencies, members); no current office-holder or political party appears.

## Unsure / gaps
- Item 2 above (currency of the six-State list).
- The phrases "upper House" and "lower House" are textbook usage; the Constitution does not use these terms.
- No past-paper or specimen item was consulted; the built-in originality scan shows no duplicate stem.
