# CBSE Class 10 Social Science, Chapter 12 — Lifelines of National Economy

`cbse-10-social-science-ch12` · release v1 · academic year 2026-27 · family `social-science` (Geography) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored to the Geography standard set by `cbse-10-social-science-ch06` and `-ch07` (D-025, D-026, D-032), following `platform/content-templates/prompts/social-science/*.v1.md`, and to the `board_assessed: false` convention set by `cbse-10-social-science-ch03` (project-companion deck, labelled practice items, kept out of tests).

| File | What |
|---|---|
| `release.json` | 2 decks (15 board + 15 project companion), notes (5 sections, 5 visuals), 28 flashcards, 94 questions (149 marks; 16 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch12_short` (20 marks, 40 min) and `t_cbse10sst_ch12_long` (40 marks, 90 min), map-work tests, `blueprint_id: null` (see below) |

## Scope
| Topic | Board? | Deck | Items tagged |
|---|---|---|---|
| t01 Map work: major sea ports and international airports | **Yes** (map work only) | Part 1 | 75 |
| t02 Transport, communication and trade | **No** — `board_assessed: false`, assessed through the interdisciplinary project | Part 2 (project companion) | 19 |

**Board map list (locate and label):** ports — Kandla (Deendayal Port), Mumbai, Marmagao, New Mangalore, Kochi, Tuticorin, Chennai, Visakhapatnam, Paradip, Haldia; international airports — Amritsar (Sri Guru Ram Dass Jee, earlier Raja Sansi), Delhi (Indira Gandhi), Mumbai (Chhatrapati Shivaji Maharaj), Chennai (Meenambakkam), Kolkata (Netaji Subhas Chandra Bose), Hyderabad (Rajiv Gandhi). Every place has a 1-mark single item (16) and also appears in one multi-place item (west coast 5, east coast 5, airports 3 + 3).

**Project topic (t02).** All 19 items start with *"Interdisciplinary project topic: practice only, not assessed in the board exam."*, serve as the companion deck's checks and practice, and are never used in a test. The companion deck says so on its title slide and ends with project tips instead of exam tips.

**Tests and blueprint.** Because the board paper examines only map work from this chapter, both tests are map-work tests made of t01 items: short = A 4 MCQ + 1 A-R; B six airports (1 each); C one of the west-coast or east-coast five-port items (5); D the west-coast voyage source (4) = 20 marks. Long = A 8 MCQ + 2 A-R; B ten ports (1 each); C two three-airport items; D 2 + 2 + 3 + 3 short answers on port reasoning; E the cargo case (4) = 40 marks. They keep the SST chapter-test frame (20/40 marks, 40/90 minutes, sections, one internal choice) but not its item types, so `blueprint_id` is `null` rather than claiming an exact blueprint. The tests are disjoint and use no deck-check item. In the long test, the port map items and the port-reasoning questions draw on the same ten ports; clues are worded differently, but a reviewer may prefer to split them across the two tests.

## Decks
- **Part 1 — Major sea ports and international airports (15 slides, board):** gateways and hinterlands (flow), five west-coast ports with clues (table), five east-coast ports (table), natural, artificial and river ports, the six airports (table). Worked examples: locating the west-coast ports with common slips; identifying ports from a voyage source; choosing a port for a cargo. Four checks.
- **Part 2 — Transport, communication and trade (15 slides, project companion):** five modes compared, roadways (Golden Quadrilateral, corridors, road types), railways and pipelines (gauges), waterways (NW 1–3) and airways, communication, trade and tourism (balance-of-trade flow). Worked examples: a balance-of-trade calculation (bar plot of imagined figures, 720 − 800 = −80), planning the project. Four checks.
- 20 of 30 slides carry a visual (14 tables, 5 flows, 1 plot).

## Question bank (94 items)
| Type | Count | Notes |
|---|---|---|
| mcq | 33 | 22 board (port and airport identification, order along the coast, port for a cargo, two mines and their ports, the longest gap between east-coast ports) + 11 project |
| assertion-reason | 10 | 8 board + 2 project; keys a4 b2 c3 d1 |
| true-false · fill-blank · match · ordering | 4 · 2 · 2 · 2 | ports by state, airports by city, west coast north to south, east coast south to north |
| map | 20 | 32 marks; 16 single, 4 multi-place |
| short | 9 + 6 | board: coasts, iron-ore ports, Haldia, airports, natural vs artificial harbours, ports near the southern tip, hinterland choices, coasts compared, why port-and-airport cities attract industry, Haldia vs Kolkata; project: roads vs rail, balance of trade, why "lifelines" |
| long | 2 | board: where a new major port would help (d5, evaluation); project: five modes compared |
| source-based | 2 | imagined coastal voyages along the west and east coasts (ports identified from clues) |
| case-based | 2 | board: five export consignments and their nearest ports; project: an imagined country's balance of trade (−60 → 0 → +50) |

- Difficulty d1/d2/d3/d4/d5 = 9/54/25/5/1. Competency: recall 26, understanding 10, application 37, analysis 19, evaluation 2 — application or higher is 62% of items and 69% of marks (68% of board items). This is above the usual ~50% because locating places is a map skill classed as application (as in the CBSE competency table, which folds map skill into application); the lint passes.
- MCQ keys a8 b8 c8 d9.

## Verifier pass (2026-10-27)
1. **Keys:** every MCQ and A-R re-solved; a script listed each key beside its option text and the letter its solution concludes with. Twelve keys moved in code for balance.
2. **Facts re-checked:** Kandla renamed Deendayal Port; built after Partition when Karachi went to Pakistan; tidal port at the head of the Gulf of Kachchh. Mumbai the biggest port with a natural harbour. Marmagao on the Zuari, Goa's iron-ore port. New Mangalore (Panambur) in Karnataka, Kudremukh concentrate. Kochi at a lagoon mouth. Tuticorin (V. O. Chidambaranar Port) in the extreme south-east, trade with Sri Lanka and the Maldives. Chennai an early artificial harbour. Visakhapatnam the deepest landlocked, sheltered harbour, first for iron ore. Paradip near the Mahanadi delta, iron ore. Haldia a subsidiary port downstream of Kolkata. Airport names as above. Project facts: Golden Quadrilateral; North–South (Srinagar–Kanyakumari) and East–West (Silchar–Porbandar) corridors; Border Roads Organisation (1960); gauges 1.676 / 1 / 0.762 and 0.610 m; HVJ pipeline; NW 1 Prayagraj–Haldia, NW 2 Sadiya–Dhubri, NW 3 Kottapuram–Kollam; Pawan Hans; first- and second-class mail; balance of trade; tourism. No volatile figures (port traffic shares, number of notified ports, road or rail length, trade values) are stated as current.
3. **Originality (textbook-echo scan):** the port descriptions were rewritten so that the clues are SOYL's ("spacious natural and well-sheltered harbour", "located at the entrance of a lagoon with a natural harbour", "one of the oldest artificial ports", "deepest landlocked and well-protected port", "specialises in the export of iron ore", "developed as a subsidiary port, in order to relieve"); the technical words students must use (tidal, artificial, landlocked, subsidiary) are kept.
4. **Difficulty:** the first draft had two items at d4–5; four map-reasoning items were added (ports for two mines, the longest east-coast gap, Haldia vs Kolkata, a new major port, d5).
5. **Mechanics:** four model answers listing names were below the lint band and were extended with location detail; a numerical solution with a Unicode minus was flagged by the verifier ("never arrives at the key value −60") and rewritten with an ASCII minus.
6. **Answer-leak check:** no solution or model answer of 60+ characters appears verbatim in decks, notes, flashcards or public question fields.

## Gaps
- Map items cannot show answers on a map until `MapPlace` has coordinates.
- A `practice_only` flag (or an assembler rule using `board_assessed: false`) would let custom test builders skip the 19 project items automatically; today only the stem label marks them.
