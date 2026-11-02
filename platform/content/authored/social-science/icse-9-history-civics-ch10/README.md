# ICSE Class 9 History & Civics, Chapter 10 — The Age of the Guptas

`icse-9-history-civics-ch10` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default; drafted by Sonnet 5.5 under D-050) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch10/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 19 slides, 17 + 14 with visuals: 4 SVG figures, the rest tables and flows; 4 checks and 2 worked examples each); notes (6 sections); 33 flashcards; 80 questions |
| `tests.json` | `t_icse9historycivics_ch10_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch10_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank, four SVG figures: rulers timeline, administration chart, Deogarh temple plan and side view, schematic map), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All five syllabus topics are covered (no removed topics for this chapter):
- t01: the account of Fa-hien and the Allahabad Pillar Inscription as sources
- t02: Gupta kings in chronological order, Chandragupta I to Skandagupta
- t03: central, provincial and local administration
- t04: Nalanda, Aryabhatta and Sushruta
- t05: Kalidasa, the Deogarh temple and the "golden age" question

Deliberately left out: any quotation of Fa-hien, the Prayag Prashasti or Kalidasa; the list of rulers who submitted to Samudragupta; Gupta coinage beyond the veena coins; Gupta decline beyond the Huna resistance; any image of a deity (the temple figure is a plain plan and side view, and the panels are only described in words).

## Question bank (80 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 28 | Keys a 7, b 7, c 7, d 7 |
| assertion-reason | 5 | ICSE option order; keys c, c, c, c, a |
| true-false · fill-blank · match · ordering | 4 · 4 · 4 · 2 | Orderings: the five kings; levels of administration |
| short 2-mark | 14 | |
| short 3-mark | 9 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | An imagined pilgrim's notebook, an imagined museum label for a eulogy pillar, an imagined school astronomy club log. Each has an either/or part (c). |

- **Difficulty:** d1 2, d2 28, d3 38, d4 12.
- **Competency:** recall 12, understanding 23, application 25, analysis 13, evaluation 7. That puts 56% of items at application or above.

## Tests (item keys)
- Short: A = `m_fahien_chandala`, `m_veena`, `m_sandhi`, `m_eclipse`, `ar_sushruta`, `s_fahien`, `s3_kings`; B = attempt 1 of `l_admin`, `l_science`.
- Long: A = `m_fahien_king`, `m_prayag_caution`, `m_huna`, `m_revenue`, `m_xuanzang`, `m_sushruta_date`, `m_deogarh_feature`, `ar_golden`, `s_prayag`, `s_c2`, `s_aryabhata`, `s3_town`, `s3_culture`; B = attempt 2 of `l_sources`, `l_culture`, `l_golden`.
- Deck-check items (not in either test): `mt_sources`, `tf_prashasti`, `ord_kings`, `ar_admin`, `tf_nalanda`, `fb_aryabhatiya`, `m_deogarh_panel`, `ar_aryabhata`.

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan (0 flags against 29,466 other stems) and SVG label overflow and overlap scan (4 figures, 0 issues).
- Every stem is specific to an imagined notebook, label, club, school, village or town (Lin Yao, Rudrasena, the Tara Astronomy Club, Devpur, Chandanpur, Madan), to stay clear of CBSE 6 and 7 History wording. Nothing is quoted from Fa-hien, the Prayag Prashasti or Kalidasa.

## Facts for a reviewer to double-check
1. **Fa-hien (Faxian):** Chinese Buddhist monk-pilgrim; in India about 399 to 412 CE, in the reign of Chandragupta II; came to collect Buddhist texts. As commonly taught: a peaceful and prosperous land, mild punishments (mostly fines), freedom of movement, monasteries, charitable houses and free hospitals at Pataliputra; Chandalas lived apart and were treated as outcastes (stated neutrally). He does not name the king. No quotation.
2. **Allahabad Pillar Inscription (Prayag Prashasti):** composed in Sanskrit by Harisena, a court poet and official of Samudragupta; engraved on an earlier Ashokan pillar now at Allahabad (Prayagraj); records campaigns in the north and south and rulers who submitted; a prashasti (eulogy). No quotation.
3. **Gupta era** begins about 319 to 320 CE.
4. **Reigns (about; books differ):** Chandragupta I about 320 to 335 CE; Samudragupta about 335 to 375; Chandragupta II Vikramaditya about 375 (or 380) to 415; Kumaragupta I about 415 to 455; Skandagupta about 455 to 467. The code asserts that each reign ends where the next begins; the timeline figure is drawn roughly to scale and says so. The figure and questions use 375 for the start of Chandragupta II; the slide table also notes "375 or 380".
5. **Sri Gupta** (founder in tradition) and **Ghatotkacha** appear only in one flow and the notes, marked as tradition.
6. **Chandragupta I** married the Lichchhavi princess **Kumaradevi**, strengthening his position (no further claims about the alliance).
7. **Samudragupta:** military leader; patron of music; coins show him playing the veena. The notes (no question) attribute "Napoleon of India" to the modern historian V. A. Smith and call the comparison debated.
8. **Chandragupta II:** defeated the Shakas of western India; title Vikramaditya; by tradition the nine gems (navaratnas) are linked with his court.
9. **Kumaragupta I:** Nalanda traditionally linked with his reign. **Skandagupta:** resisted the Huna invasions.
10. **Administration (as commonly taught; titles vary):** king with titles such as Maharajadhiraja, assisted by ministers; kumaramatya (high officers), sandhivigrahika (minister of peace and war), mahadandanayaka (chief judicial or military officer); province (bhukti) under an uparika; district (vishaya) under a vishayapati; village headed by a gramika with elders; town councils with guild representatives; land revenue commonly about one-sixth of produce; more decentralised than the Mauryan.
11. **Nalanda:** Buddhist mahavihara in present-day Bihar, founded about the 5th century CE; students from across Asia; Xuanzang studied there in the 7th century; a library and many subjects; declined in the late 12th century; ruins a UNESCO World Heritage Site in 2016.
12. **Aryabhatta (Aryabhata):** born 476 CE; Aryabhatiya about 499 CE; earth rotates on its axis; eclipses from shadows of the earth and moon; pi about 3.1416; place-value system; India's first satellite (1975) named Aryabhata.
13. **Sushruta Samhita:** classic text on medicine and surgery; surgical instruments and procedures including repair of the nose; training and cleanliness; date debated, compiled and revised over centuries; studied with the Gupta age. The chapter never says Sushruta lived under a Gupta king.
14. **Kalidasa:** greatest Sanskrit poet and playwright, traditionally linked with Chandragupta II's court; plays Abhijnanashakuntalam, Malavikagnimitram, Vikramorvashiyam; long poems Raghuvamsha, Kumarasambhava; also Meghaduta and Ritusamhara. Themes described in one line each; no quotation.
15. **Deogarh Dashavatara temple:** Lalitpur district, Uttar Pradesh; about the 6th century CE; dedicated to Vishnu; one of the earliest stone temples of north India; raised platform (jagati), square sanctum, shikhara surviving only in part; often described as panchayatana type; panels Anantashayana (Vishnu on Sheshanaga), Gajendra moksha, Nara-Narayana.
16. **Golden age:** "often called" a golden age; historians qualify it (elite prosperity, stricter caste rules).
17. **Quiz arithmetic:** one-sixth of 90 quintals is 15 (`m_revenue`); about 40 + 40 years is about 80 (`m_years_calc`).

## Unsure / gaps
- Gupta reign dates differ by a few years between books (for example Chandragupta II from 375 or 380; Chandragupta I from 319 or 320). The chapter uses one set and says "about".
- The temple plan sketch shows four corner shrines to illustrate the "panchayatana type"; the brief says the temple is often so described. A reviewer may wish to confirm how many subsidiary shrines are traced on site.
- Panel descriptions name the three scenes only; their positions on the walls are not stated.
- Titles of officers vary between books; only the commonly taught ones are given.
- The map is schematic; the relative positions of Prayagraj, Pataliputra, Nalanda and Deogarh are approximate, and "Western India" is a region label, not a boundary.
- The syllabus spells "Aryabhatta"; the satellite is written "Aryabhata", its official name.
- No past-paper or specimen item was consulted.
