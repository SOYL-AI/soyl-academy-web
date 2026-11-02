# ICSE Class 9 History & Civics, Chapter 5 — The Harappan Civilisation

`icse-9-history-civics-ch05` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus (History 1). Drafted by a Sonnet 5.5 writer for Opus review (D-050). Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch05/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 21 slides, 16 + 16 with visuals: 5 SVG figures drawn by SOYL (timeline, schematic map used twice, town plan, Great Bath plan, street and drain sketch), the rest tables and flows; 5 + 4 checks, 2 + 3 worked examples); notes (6 sections); 30 flashcards; 80 questions |
| `tests.json` | `t_icse9historycivics_ch05_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch05_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. No shared question; no deck-check item in either test. |
| `src/` | `questions.mjs` (bank, SVG figures, asserted dates), `build.mjs` (decks, notes, flashcards, tests) |

## Scope
All five syllabus topics are covered (no removed topics for this chapter):
- t01: Great Bath, Citadel, dockyard at Lothal, granaries, and what each tells us
- t02: seals, the bearded man, the bronze figure of a young woman (dancing girl), the undeciphered script
- t03: urban planning: grid layout, roads, houses, covered drainage
- t04: internal and external trade (Mesopotamia), crafts (pottery, beads, metalwork, terracotta figurines)
- t05: theories of decline (floods, shifting rivers, climate change, with ecological strain and weaker trade; the older invasion theory stated neutrally as rejected by most scholars)

Debated readings (Great Bath purpose, Lothal dockyard, great granary, the seated-figure seal, the priest-king label, causes of decline) are always worded as "some scholars ... others ...". No photographs or artefact reproductions: artefacts are described in words and every picture is a SOYL schematic.

## Question bank (80 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 30 | Keys a7 b7 c8 d8 |
| assertion-reason | 5 | ICSE option order; keys a, b, d, c, c |
| true-false · fill-blank · match · ordering | 4 · 6 · 3 · 1 | Matches: sources to inferences; crafts to materials; theories to evidence. Ordering: path of waste water |
| short 2-mark | 13 | |
| short 3-mark | 8 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, per-part step marks summing to 10 |
| source-based | 3 | Imagined documents: a trench supervisor's diary, a museum guide's letter, a newspaper report on a river survey. Each has an either/or part (c). |

- **Difficulty:** d1 9, d2 30, d3 36, d4 5.
- **Competency:** recall 17, understanding 21, application 22, analysis 18, evaluation 2. That puts 53% of items at application or above.
- **Topics (items tagged):** t01 17, t02 19, t03 10, t04 15, t05 13, plus 6 items spanning two or more topics.

## Tests (item keys)
- Short: A = `m_citadel_loc`, `m_script_limit`, `m_drain_inspect`, `m_meluhha`, `ar_invasion`, `s_seal_info`, `s3_planning`; B = attempt 1 of `l_structures`, `l_planning`.
- Long: A = `m_bath_infer`, `m_granary_debate`, `m_pashupati`, `m_planning_infer`, `m_weights_infer`, `m_river`, `m_invasion`, `ar_script`, `s_citadel`, `s_internal_trade`, `s_river_theory`, `s3_structures`, `s3_decline`; B = attempt 2 of `l_seals_arts`, `l_decline`, `l_museum`.
- Deck checks (not in tests): `m_bath_features`, `tf_bath_certain`, `fb_dock`, `m_dancer_art`, `fb_script` (deck 1); `m_grid`, `ord_drain`, `mt_crafts`, `m_decline_multi` (deck 2).

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan against all other chapters and exemplars: 0 flags; SVG label overflow and overlap check: 0 issues.
- Every stem is specific to an imagined museum, dig, school, town or newspaper to stay clear of CBSE 6 and 12 History wording.
- Not run by the writer (Opus runs them): tree-wide gates, tests, e2e. The SVGs were checked by the label-overflow script but not viewed in a browser.

## Facts for a reviewer to double-check
1. **Harappa** excavation began in **1921**, linked with **Daya Ram Sahni**; **Mohenjo-daro** in **1922**, linked with **R. D. Banerji**; **John Marshall** was Director-General of the Archaeological Survey of India at the time.
2. Names: **Harappan** or **Indus** civilisation; "Indus-Saraswati" is mentioned neutrally as "some books also call it" (deck 1, slide on discovery and names).
3. Mature phase **about 2600 to 1900 BCE** (asserted span of 700 years); many books teach **about 2500 to 1750 BCE**; the figure and notes say "about" and that books differ.
4. Locations: Harappa in Punjab (Pakistan); Mohenjo-daro and Chanhudaro in Sindh (Pakistan); Lothal and Dholavira in Gujarat; Kalibangan in Rajasthan; Rakhigarhi and Banawali in Haryana; Ropar in Punjab (India). The schematic map is drawn from approximate longitude and latitude (positions approximate, no borders), with a schematic Indus line and a dashed, debated "old Ghaggar-Hakra bed".
5. Site notes in the deck-1 table: Lothal (brick basin, beads), Kalibangan (planned streets, traces of a ploughed field), Dholavira (water reservoirs), Rakhigarhi (a large site), Chanhudaro (craft workshops).
6. **Great Bath** (Mohenjo-daro, on the Citadel): watertight brick tank with natural tar (bitumen) lining, steps at both ends, a corridor around it; ritual bathing is "a view held by many scholars". No dimensions are given.
7. **Citadel**: raised mound, usually on the western side; larger lower town to the east. One slide narration adds "some scholars think it also gave protection from floods" (one view among several; confirm wording or delete).
8. **Granaries**: rows of raised brick platforms near the Citadel at Harappa; a large brick platform on the Citadel at Mohenjo-daro called the "great granary", a name some scholars question.
9. **Lothal**: large brick basin beside an old channel, called a dockyard by many scholars, a water reservoir by some. The deck says Lothal had bead workshops.
10. **Seals**: mostly steatite, usually square, animals such as bull, elephant and a "unicorn-like" animal, a few signs; pressed on clay to mark goods; Indus-style seals found in Mesopotamia. The seated horned figure ("Pashupati"/proto-Shiva reading) is presented as one interpretation, "others disagree".
11. **Bearded man**: stone sculpture from Mohenjo-daro with headband and shawl; "priest-king" is a modern label. The items say "stone" only.
12. **Bronze figure of a young woman** ("dancing girl"): small, bronze, made by lost-wax casting.
13. **Script**: about **400 signs**, written mostly right to left, short texts mostly on seals, undeciphered, no bilingual text found (the narration says "no text in two languages has been found to help").
14. **Town planning**: grid, streets crossing at right angles; burnt bricks in about **1 : 2 : 4** (thickness : width : length), used in the 5 cm to 10 cm to 20 cm item `m_brick_ratio`; houses with a central courtyard, a bathroom and often a well; covered drains roofed with bricks or slabs with openings; bins or soak pits.
15. **Trade**: cubical weights of stone such as chert in regular ratios; Mesopotamian records mention **Meluhha**, "generally identified with the Indus region"; Indus-style seals and beads found in Mesopotamian cities.
16. **Crafts**: pottery (red with black painted designs), beads (carnelian and other stones), copper and bronze, **no iron**, terracotta figurines (animals, toys, figures), cotton weaving; crops wheat, barley and cotton (notes only).
17. **Decline** from about 1900 BCE: floods (silt layers at some sites), changing river courses (drying of the Ghaggar-Hakra), climate change (falling rainfall), ecological strain, weaker trade; all presented as theories. The older invasion theory is stated as "rejected by most scholars" because excavations show no clear evidence of widespread violent destruction and the decline looks gradual in many places.

## Unsure / gaps
- Items 7 and 13 (wording of the flood-protection remark; "no bilingual text") are my best reading of the commonly taught position.
- The commonly taught dates differ between books; I used "about 2600 to 1900 BCE" in the figure and mentioned the other range, but I did not consult a source to rank them.
- The "wheat, barley and cotton" crop note is outside the syllabus topics and appears only in the notes.
- No past-paper or specimen item was consulted; the built-in originality scan shows no duplicate stem, and the near-duplicate scan shows 0 flags.
