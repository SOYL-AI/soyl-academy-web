# ICSE Class 9 History & Civics, Chapter 11 — Medieval India: The Cholas

`icse-9-history-civics-ch11` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default; drafted by Sonnet 5.5 under D-050) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch11/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 22 slides, 17 + 17 with visuals: 4 SVG figures, the rest tables and flows; 4 checks and 2 worked examples each); notes (7 sections); 32 flashcards; 79 questions |
| `tests.json` | `t_icse9historycivics_ch11_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch11_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank and four SVG figures: kings time line, administration chart, temple plan and side view, lost-wax steps), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All four syllabus topics are covered (no removed topics for this chapter):
- t01: inscriptions (stone and copper-plate; Uttaramerur village-sabha rules) and the Brihadishwara Temple as sources
- t02: Chola kings in chronological order, Vijayalaya to Rajendra I (Kulottunga I appears only on the time line and in the notes)
- t03: central, provincial and village self-government (mandalam, valanadu or nadu, village; ur, sabha, nagaram; variyams; land revenue)
- t04: temple architecture (vimana, gopuram, mandapa, enclosure wall) and bronze sculpture (lost-wax method, Nataraja)

Deliberately left out: any quotation of an inscription; the full lists of conquests; Chola literature and trade guilds beyond the nagaram; any image of a deity (the temple figure is a plain schematic, and the Nataraja is described in words); any map.

## Question bank (79 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 29 | Keys a 7, b 7, c 7, d 8 |
| assertion-reason | 6 | ICSE option order; keys c, c, b, c, a, d |
| true-false · fill-blank · match · ordering | 4 · 3 · 4 · 2 | Orderings: the five kings; the lost-wax steps |
| short 2-mark | 12 | |
| short 3-mark | 9 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | An imagined temple-guide booklet, an imagined village record keeper's notes, imagined school project notes. Each has an either/or part (c). |

- **Difficulty:** d2 21, d3 44, d4 14.
- **Competency:** recall 14, understanding 24, application 22, analysis 15, evaluation 4. That puts 52% of items at application or above.

## Tests (item keys)
- Short: A = `m_brihad_source`, `m_ganga`, `m_ur`, `m_nataraja`, `ar_vimana`, `s_divisions`, `s3_uttar`; B = attempt 1 of `l_kings`, `l_temple`.
- Long: A = `m_grant_praise`, `m_whs`, `m_order`, `m_sabha`, `m_waxstep`, `m_bronze_why`, `m_naval`, `ar_wax`, `s_inscr_value`, `s_rajaraja`, `s_nataraja`, `s3_brihad`, `s3_levels`; B = attempt 2 of `l_inscr`, `l_admin`, `l_bronze`.
- Deck-check items (not in either test): `mt_sources`, `tf_lot`, `ord_kings`, `fb_ganga`, `mt_admin`, `ar_sabha`, `m_gopuram_check`, `ord_wax`.

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan (0 flags against 29,624 other stems) and SVG label overflow and overlap scan (4 figures, 0 issues).
- Every stem is specific to an imagined booklet, notes page, village, town, workshop or school (Sivapuram, Kanagan of Mullaikudi, Pallikudi, Vennaiyur, Chaturvedimangalam, Murugan, Madhavan, Meena, Ilango), to stay clear of CBSE 7 History wording. No inscription is quoted.

## Facts for a reviewer to double-check
1. **Vijayalaya:** took Thanjavur about 850 CE and founded the later (imperial) Chola line.
2. **Aditya I:** successor of Vijayalaya; reign ends before or about 907 CE (no start date given). The time line shows him as a dashed bar to about 907 and says dates are approximate.
3. **Parantaka I:** about 907 to 955 CE.
4. **Rajaraja I:** about 985 to 1014 CE; power in the south, Sri Lanka and the Maldives (strong navy); the Brihadishwara Temple. The code asserts that his reign ends where Rajendra I's begins. The gap 955 to 985 (other kings) is not named.
5. **Rajendra I:** about 1014 to 1044 CE; expedition to the Ganga; title Gangaikondachola; new capital Gangaikondacholapuram; naval expedition to Srivijaya (South-East Asia) about 1025 CE.
6. **Kulottunga I:** about 1070 to 1120 CE (time line, notes and one true-false item only).
7. **Inscriptions:** Chola kings issued many stone inscriptions and copper-plate grants. Named examples (not quoted): the Anbil, Thiruvalangadu and Larger Leiden plates. The slide table says the Larger Leiden plates are kept in the Netherlands (Leiden), which is why they carry that name. Royal grants often open with praise of the king.
8. **Uttaramerur inscriptions:** present-day Kanchipuram district; reign of Parantaka I; about 919 and 921 CE. Members chosen by drawing names written on palm leaves from a pot (kudavolai); the village was divided into wards (the number of wards is not stated in the chapter). Qualifications as commonly taught: owning some land and a house, an age within a set range (the range is not stated), knowledge of the Vedas or administration. Disqualifications: for example failing to give accounts of an earlier post, serious wrongdoing. Committees (variyams) for tanks, gardens, justice and temples (temples as an extra from the brief's administration list). All paraphrased.
9. **Brihadishwara Temple, Thanjavur:** built by Rajaraja I; completed about 1010 CE; dedicated to Shiva; vimana about 66 m; massive Nandi, large linga, painted murals, inscriptions on the walls.
10. **World Heritage:** Great Living Chola Temples, listed 1987, extended 2004 to include Gangaikondacholapuram and the Airavatesvara temple at Darasuram.
11. **Administration:** king assisted by ministers and officials; kingdom divided into mandalams (provinces, often under princes or viceroys), valanadus or nadus (districts), villages; ur (ordinary villages, landholders), sabha (brahmadeya villages granted to Brahmanas), nagaram (merchants in trade centres); committees; land revenue the main income and land surveyed. "Revenue paid for officials, armies and temples" is a general statement added in the revenue slide.
12. **Temple architecture:** Dravida style; vimana (pyramidal tower over the sanctum), gopuram (gateway tower, larger in later temples), mandapas (pillared halls), enclosure wall. The plan and side view are schematic and "not to scale", not the plan of any one temple.
13. **Bronzes:** lost-wax (cire perdue) steps: wax model, clay coating, heating so the wax melts out, pouring molten metal, breaking the mould, finishing. Nataraja: Shiva as Lord of Dance in a ring of flames, commonly read as a symbol of the cosmic cycle of creation and destruction; admired for balance, grace and fine detail. Described in words only.
14. **Quiz arithmetic:** 985 to 1044 is about 59 years (`m_years`).

## Unsure / gaps
- Reign dates differ by a few years between books; the chapter uses one set and says "about". No date is given for Aditya I.
- The Uttaramerur age range, the number of wards and the exact list of disqualifications are not stated, because books differ; the chapter says "as commonly taught".
- The Larger Leiden plates remark (where they are kept) and the claim that Aditya I "strengthened the young kingdom" are mild statements a reviewer may wish to confirm or soften.
- No past-paper or specimen item was consulted.
