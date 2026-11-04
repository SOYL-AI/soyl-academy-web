# ICSE Class 9 Biology, Chapter 14 — Aids to Health and Health Organisations

`icse-9-biology-ch14` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 17 slides), notes (5 sections), 30 flashcards, 97 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch14_short` (20 marks, 30 min) and `t_icse9bio_ch14_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch14/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics: vaccination and immunisation; antitoxins, serums and antibiotics; antiseptics and disinfectants; the body's local (first-line) defence system and its merits; the major activities of the Red Cross and the World Health Organization.
- No removed topics for this chapter. The second line of defence (white blood cells and the details of antibody action), types of immunity by name and vaccination schedules are not taught.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a lettered-diagram match, a fill-in, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (an antibody graph after two doses, a school nurse diluting an antiseptic, a boy taking leftover tablets, a farmer bitten by a stray dog, particles trapped in the nose and windpipe, a blood donation camp, relief after an earthquake) are written by SOYL and differ from the ICSE 9 chapter on bacteria and fungi (vaccine, serum and antibiotic items), CBSE 12 Human Health and Disease, ISC 12 Biology and CBSE 10 Science. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Aids to Health; How the body fights a germ; What a vaccine is; Antibodies after a first dose and a booster; Quick check: what a vaccine does; Vaccination and immunisation; Worked example 1: reading the booster graph; Diseases for which vaccines are given; Antitoxins and serums; Quick check: ready-made help; Why a serum, not a vaccine, in an emergency; Antibiotics; Worked example 2: stopping the course too early; Quick check: what antibiotics act on; Summary; Exam tips. Part 2 (17 slides): Keeping Germs Out; Antiseptics; Disinfectants; Antiseptic, disinfectant and antibiotic compared; Quick check: for a floor; Worked example 1: making an antiseptic solution; The first line of defence; First-line defences of the body; The lining of the windpipe; Quick check: the sweeping hairs; Worked example 2: how many germs get past the nose?; Merits of the body's local defences; The Red Cross; The World Health Organization; Quick check: a world body; Summary; Exam tips.
- **Visuals (25 of 33 slides):** flow 2, table 20, svg 3.
- **Diagrams (5 distinct SVGs):** a line graph of antibody level after a first dose and a booster; the first-line defences on an outline of the body (named, and lettered A-E); the lining of the windpipe with cilia and mucus (named, and lettered A-E). All drawn with the S helpers and palette colours, rendered to PNG and checked by eye (labels that ran off the edge in the first render were shortened and the canvas widened).
- **Narration:** 5–48 words per slide (mean 34); no symbols or abbreviations; numbers and units in words.

## Question bank (97 items, 193 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 34 | 34 |
| assertion-reason | 4 | 4 |
| short-1 (terms, odd one out, give reason) | 14 | 14 |
| true-false | 3 | 3 |
| fill-blank-5 | 1 | 5 |
| numerical | 10 | 10 |
| match-5 | 1 | 5 |
| short-2 | 14 | 28 |
| short-3 | 10 | 30 |
| long-10 (structured) | 6 | 60 |

- **MCQ deck-check items:** 6 of the mcq items; none is used in a test.
- **Structured questions:** 6, each 10 marks in 4 parts with the part marks in the stem; each has a diagram part (a flow diagram of how a vaccine protects, the inside of the nose, a first-aid box, a flow diagram of antibiotic resistance, a flow diagram of how a serum is prepared, the emblem of the Red Cross). The diagram part draws something that the other parts do not name.
- **Difficulty:** d1 30 · d2 58 · d3 8 · d4 1 (a two-stage trapping of particles by the nose and the windpipe).
- **Competency:** recall 23 · understanding 25 · application 40 · analysis 9. Application or higher is **51% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** c b a d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; computed values are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test items were chosen so that no stem or option names the answer of another item in the same test.

## For a reviewer
Time-sensitive and book-dependent points:
- **Vaccines and schedules:** the notes list diseases for which vaccines are given (tuberculosis, polio, measles, diphtheria, whooping cough, tetanus, hepatitis B) with no dose schedule, since schedules are decided by health authorities and change ("as of 2026"). No national programme is named.
- **Vaccination versus immunisation:** books use the two words almost as synonyms; the chapter follows the usual ICSE distinction (vaccination is giving the vaccine; immunisation is the process of becoming immune, which can also be by ready-made antibodies). The notes say so.
- **Rabies set-up:** a serum (ready-made antibodies) given with the vaccine after a suspect dog bite is stated as an example of an emergency use; no dose or timing is given.
- **Antiseptic and disinfectant examples:** books differ (boric acid, dilute hydrogen peroxide and tincture of iodine as antiseptics; phenyl, bleaching powder, formalin and chlorine as disinfectants). The notes say that one chemical may act as either, depending on its dilution.
- **Antibiotics:** "act against bacteria" is the Class 9 statement (some antibiotics also have limited action on other microbes); penicillin is said to come from a mould, with no species name.
- **Tears and saliva:** the notes say they contain an enzyme that kills bacteria without naming it.
- **Red Cross:** founder (Henry Dunant), the year the movement began (1863) and the emblem are stable facts; the activities listed are the usual textbook ones, and the Indian Red Cross Society is mentioned without dates.
- **WHO:** a United Nations agency, headquarters in Geneva, founded in 1948, World Health Day on 7 April, and the declaration that smallpox was wiped out in 1980. The number of member countries and current programmes are deliberately not stated (as of 2026).
- All counts, strengths, volumes and antibody levels in the questions are imagined and illustrative. The drawings are schematic (the body outline is not to scale).
