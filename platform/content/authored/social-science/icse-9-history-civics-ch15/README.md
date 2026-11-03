# ICSE Class 9 History & Civics, Chapter 15 — The Modern Age in Europe: Renaissance

`icse-9-history-civics-ch15` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default; drafted by Sonnet 5.5 under D-050) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch15/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 21 slides, 17 + 15 with visuals: 4 SVG figures, the rest tables and flows; 4 + 5 checks, 2 worked examples each); notes (6 sections); 33 flashcards; 78 questions |
| `tests.json` | `t_icse9historycivics_ch15_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch15_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank and four SVG figures: causes web, time line 1347 to 1616, geocentric versus heliocentric schematic, printing-spread flow), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All four syllabus topics are covered (no removed topics for this chapter):
- t01: meaning of the Renaissance; the capture of Constantinople; the decline of feudalism
- t02: new trade routes and wealth, the spirit of enquiry and humanism, the printing press
- t03: Leonardo da Vinci, William Shakespeare, Nicolaus Copernicus
- t04: consequences (humanism, realism in art, science, vernacular literature, nation-states)

Deliberately left out: the Reformation beyond one line (the spirit of enquiry encouraged questioning and later the Reformation; chapter 16 covers it); any quotation of Shakespeare, Dante, Chaucer, Petrarch or Copernicus; reproductions or portraits of paintings and people (the figures are schematic only); detailed accounts of the voyages of discovery (named only as linked consequences).

## Question bank (78 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 30 | Keys a 7, b 7, c 8, d 8 |
| assertion-reason | 6 | ICSE option order; keys c, b, c, d, a, c |
| true-false · fill-blank · match · ordering | 4 · 3 · 4 · 2 | Orderings: the four dated events from 1453 to 1543; the chain from movable type to faster ideas |
| short 2-mark | 12 | |
| short 3-mark | 7 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | An imagined printing-shop apprentice's diary, an imagined art-club exhibition card, an imagined school observers' club notebook page. Each has an either/or part (c). |

- **Difficulty:** d1 3, d2 18, d3 42, d4 15.
- **Competency:** recall 13, understanding 23, application 18, analysis 18, evaluation 6. That puts 54% of items at application or above.

## Tests (item keys)
- Short: A = `m_route_search`, `m_medici`, `m_leo_notebook`, `m_perspective`, `ar_trade_route`, `s_constantinople`, `s3_three`; B = attempt 1 of `l_origin`, `l_conseq`.
- Long: A = `m_black_death`, `m_venice`, `m_experiment`, `m_caxton`, `m_geocentric`, `m_nation`, `m_shk_plays`, `ar_print`, `s_trade`, `s_cop`, `s_conseq`, `s3_feudal`, `s3_print`; B = attempt 2 of `l_trade`, `l_printing`, `l_arts`.
- Deck-check items (not in either test): Part 1 `mt_meaning`, `tf_constantinople`, `m_cannon`, `ar_black`; Part 2 `m_universal`, `tf_cop`, `fb_petrarch`, `ar_vernacular`, `ord_consequence`.

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan (0 flags against 29,929 other stems) and SVG label overflow and overlap scan (4 figures, 0 issues).
- Every stem is specific to an imagined club, school, town, ledger, diary or exhibition card (Rivermead Art Club, Hillcrest School, Pinewood Science Fair, the apprentice Tomas of Valdoro, the painter Elena Marsh), to stay clear of CBSE 11 History wording. Nothing is quoted from any author.
- Not run (outside this task's rules): tree-wide gates, npm test, e2e.

## Facts for a reviewer to double-check
1. **Renaissance:** French word meaning rebirth; a revival of interest in classical Greek and Roman learning together with new ideas in art, literature and science; about the 14th to the 16th century; began in Italy (Florence), spread across Europe.
2. **Capture of Constantinople, 1453:** by the Ottoman Turks; the city is described as the capital of the Eastern Roman (Byzantine) Empire (slide and notes only). Results: Greek scholars moved to Italy with manuscripts, encouraging the study of classical texts; trade routes to the East were disrupted, encouraging the search for new sea routes.
3. **Decline of feudalism:** the Crusades weakened many feudal lords; the Black Death (about 1347 to 1351) caused labour shortages so peasants could demand wages; towns, trade and a money economy grew; a rich middle class emerged; gunpowder and cannon made castles and knights less important; kings grew stronger.
4. **Trade and patrons:** Venice and Genoa as Italian city-states rich from trade; the Medici of Florence as wealthy patrons of artists and scholars (described as a banking family in one stem).
5. **Voyages as linked consequences:** Columbus 1492 (crossing the Atlantic); Vasco da Gama reached Calicut in 1498 (sailing round Africa is mentioned in one stem).
6. **Spirit of enquiry and humanism:** questioning tradition and authority; reason, observation and experiment; humanism is interest in human life and abilities; Petrarch is often called the father of humanism (also called an Italian poet or writer).
7. **Printing:** Johannes Gutenberg of Mainz, movable metal type, about 1450 (one stem calls him a goldsmith); the Gutenberg Bible about 1455; William Caxton printed in England from 1476; books cheaper and more numerous, literacy spread, ideas travelled faster.
8. **Leonardo da Vinci (1452 to 1519):** painter, scientist and engineer; The Last Supper and the Mona Lisa (titles only); notebooks with studies of anatomy and designs for flying machines and other devices; a universal (Renaissance) man. One stem says the notes are in mirror writing.
9. **William Shakespeare (1564 to 1616):** English playwright and poet; plays Hamlet, Macbeth, Romeo and Juliet, Julius Caesar, The Merchant of Venice; about 37 to 39 plays as counts vary, plus sonnets; wrote about human nature; enriched the English language. No line is quoted.
10. **Nicolaus Copernicus (1473 to 1543):** described as a Polish astronomer; heliocentric theory (earth and planets move around the sun); challenged the geocentric (Ptolemaic) view; book published in 1543; foundation for Galileo and Kepler (one line only). The sky-model drawing in a source item also gives the earth a daily turn on its axis, which belongs to his theory.
11. **Consequences:** humanism; realism in art (perspective, anatomy, nature); growth of science and the experimental method; rise of vernacular languages and literature (Dante in Italian, Chaucer in English, with printing helping; one stem names The Divine Comedy and The Canterbury Tales as long works by Dante and Chaucer); growth of strong nation-states; the spirit of enquiry encouraged geographical discoveries and later the Reformation (one line).
12. **Time line figure:** drawn roughly to scale from 1347 to 1616 with one row per event; the Black Death is shown as about 1347 to 1351 and Gutenberg as about 1450.

## Unsure / gaps
- Dates of the Renaissance and of Gutenberg's first press vary slightly between books; the chapter uses "about".
- Counts of Shakespeare's plays vary (the chapter says about 37 to 39).
- Describing the Medici as a banking family, Gutenberg as a goldsmith and Copernicus as Polish are widely taught; a reviewer may check them.
- The geocentric versus heliocentric picture is a simple circular schematic, not a historically exact diagram (it says so).
- No past-paper or specimen item was consulted.
