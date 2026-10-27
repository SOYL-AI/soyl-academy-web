# CBSE Class 10 Social Science, Chapter 7 — Forest and Wildlife Resources

`cbse-10-social-science-ch07` · release v1 · academic year 2026-27 · family `social-science` (Geography) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored to the Geography standard set by `cbse-10-social-science-ch06` (D-025, D-026), following `platform/content-templates/prompts/social-science/*.v1.md`.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 16 slides), notes (5 sections, 5 visuals), 32 flashcards, 104 questions (24 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch07_short` (20 marks, 40 min) and `t_cbse10sst_ch07_long` (40 marks, 90 min), `blueprint_id` set to the SST chapter-test blueprints |

## Scope
Syllabus chapter 7, all four topics (none removed or formative-only):

| Topic | Deck | Items tagged |
|---|---|---|
| t01 Flora and fauna in India and their depletion | Part 1 | 41 |
| t02 Conservation of forests and wildlife | Part 1 | 28 |
| t03 Types and distribution of forests | Part 2 | 15 |
| t04 Community and conservation | Part 2 | 35 |

**Map work.** The CBSE map list for Geography has no items from this chapter. The three map items (six tiger reserves: Corbett, Sariska, Sunderbans, Manas, Periyar, Bandhavgarh) are labelled **practice** in the stem, use `india-political`, and are kept out of the chapter tests (unlike ch06, whose soil items are on the board list).

## Decks
- **Part 1 — Biodiversity, depletion and conservation (18 slides):** why biodiversity matters, the IUCN categories with Indian examples (table), the scale of loss (bar plot: at least 10 per cent of flora and 20 per cent of mammals threatened), causes of depletion (flow), dams, mines and broken pathways, everyday pressures and unequal use, the Wildlife (Protection) Act, Project Tiger (bar plot: about 55,000 around 1900 → 1,827 in 1973, categories named in the caption), and the widening to insects and plants.
- **Part 2 — Types of forests and community conservation (16 slides):** reserved, protected and unclassed forests and their distribution, Sariska and Alwar, Chipko and Beej Bachao Andolan, sacred groves and nature worship, Joint Forest Management.
- Worked examples: a case-based data question with a percentage and a definition applied to data; a 5-mark "explain" answer with evidence for each point; a source-based question on community action; a 5-mark "evaluate" answer; locating tiger reserves (practice). Four checks per deck. 24 of 34 slides carry a visual (15 tables, 7 flows, 2 plots).

## Question bank (104 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 41 | 1 | 13 built on imagined scenarios or data (a survey of a declining tree, a teak plantation, an elephant herd stopped by a mine, a forest-category data set) |
| assertion-reason | 9 | 1 | keys a4 b2 c2 d1 |
| true-false · fill-blank · match | 5 · 3 · 2 | 1 · 1 · 2 | match columns shuffled |
| ordering | 2 | 1 | policy chronology (1972 → 1991) and IUCN categories from most to least secure; shown shuffled |
| map | 3 | 2 | practice (see above) |
| short | 14 + 12 | 2 / 3 | `word_limit` 25–40 and 40–60 |
| long | 7 | 5 | explain, describe, classify, compare (government vs community), one application (a district forest officer's plan) and one evaluation (Project Tiger, d5) |
| case-based | 3 | 4 = 1 + 1 + 2 | imagined state forest table (two numerical parts), imagined tiger-reserve counts (percentage change; a correlation-vs-cause alternative), Himalayan yew harvesting |
| source-based | 3 | 4 | a Garhwal woman's Chipko recollection, a botany student's notebook on a Jharkhand sacred grove, a speech against marble mining near a Rajasthan reserve |

- Difficulty d1/d2/d3/d4/d5 = 8/50/34/11/1. Competency: recall 22, understanding 34, application 19, analysis 24, evaluation 5 — **application or higher is 46% of items and 53% of marks**.
- MCQ keys a10 b10 c11 d10; T/F 3/2.
- **Tests:** short = A 3 MCQ + 1 A-R; B 2 + 2 + 3; C one of two 5-mark; D the Chipko source. Long = A 8 MCQ + 2 A-R; B 2 + 2 + (2|2) + 3 + (3|3); C 5 + (5|5); D the sacred-grove and mining-speech sources. Tests are disjoint and use no deck-check item.

## Cases and sources (all SOYL-original)
Every passage has `passage_origin: "soyl-original"` and a stem label saying it is illustrative or imagined. Data are invented, labelled, and internally consistent (18,000 + 9,000 + 3,000 = 30,000 sq km; reserved 60 per cent; permanent estates 27,000 sq km; unclassed 10 per cent; tigers 24 → 42 = +75 per cent; prey 12 → 21 thousand). No real or volatile statistic (for example a current tiger count) is stated as current fact; the 1973 figure of 1,827 is historical.

## Verifier pass (2026-10-27)
1. **Keys:** every MCQ and A-R re-solved; a script confirmed that every solution names its own key. Two keys moved in code for balance.
2. **Facts re-checked:** about 8 per cent of an estimated 1.6 million species; at least 10 per cent of flora and 20 per cent of mammals threatened; IUCN examples (sangai as endangered, mithun as endemic, hornbill as rare, Gangetic dolphin as vulnerable); cheetah declared extinct in India in 1952 (the 2022 Kuno reintroduction of African cheetahs is mentioned once, in a solution, to avoid confusion); 26,200 sq km to farmland 1951–80; over 5,000 sq km for river valley projects; Narmada Sagar about 40,000 hectares; dolomite mining at Buxa; Himalayan yew and taxol; Wildlife Act 1972; species projects; Project Tiger 1973, about 55,000 → 1,827; insects 1980 and 1986, plants 1991; reserved more than half, protected about one-third; Madhya Pradesh about 75 per cent permanent forests; state lists; Sariska; Bhairodev Dakav Sonchuri (five villages, 1,200 ha, Alwar); Chipko; Beej Bachao Andolan and Navdanya; JFM Odisha 1988; Mundas and Santhals (mahua, kadamba), Odisha and Bihar (tamarind, mango); Bishnois. Map places: Corbett (Kumaon foothills), Sariska (Alwar), Sunderbans (delta, West Bengal), Manas (Assam–Bhutan border), Periyar (Western Ghats, Kerala), Bandhavgarh (Umaria, Madhya Pradesh).
3. **Originality (textbook-echo scan):** about 50 phrases rewritten, including all six IUCN category definitions (the stem of the vulnerable-species item had closely followed the textbook definition), "on the threatened list", "greatest degrading factors", "large tracts … converted into single commercially valuable species", "deforested or degraded by shifting cultivation", "seriously threatened by the ongoing dolomite mining", "most valuable as far as the conservation …", "other forests and wastelands belonging to both government and private individuals", "fought against mining by citing the Wildlife Protection Act", "protecting the wildlife against any outside encroachments", "community afforestation with indigenous species can be enormously successful", "adequate levels of diversified crop production … economically viable", the JFM description ("intermediary benefits … successful protection"), "pristine form", "an integral part of the community and nobody harms them", and "focusing on biodiversity rather than on a few of its components".
4. **Competency and difficulty:** the first draft was 36% application or above with five items at d4–5. Sixteen higher-order items were added (category reasoning from a survey, data interpretation, policy choice, monoculture evaluation, inequity analysis, state-pattern comparison, Project Tiger evaluation, a five-heading government-vs-community comparison), reaching 46% of items, 53% of marks and 12 items at d4–5.
5. **Mechanics:** two 5-mark model answers were below the lint band (72 and 79 words) and were extended to 100–120; three 2-mark answers trimmed; one 3-mark answer that had a custom 70-word limit was rewritten to the board's 60.
6. **Answer-leak check:** no solution or model answer of 60+ characters appears verbatim in decks, notes, flashcards or public question fields.

## Gaps
- Map items cannot show answers on a map until `MapPlace` has coordinates; reserves are described by clues.
- Current tiger numbers are deliberately not given (volatile); a live-data note could be added by reviewers.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 0 item tag(s) and 2 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 22, understanding 34, application 19, analysis 24, evaluation 5 — application or higher 46% of items, 53% of marks (supersedes the competency figures above).
