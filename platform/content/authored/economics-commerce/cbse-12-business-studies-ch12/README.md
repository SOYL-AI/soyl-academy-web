# CBSE Class 12 Business Studies, Chapter 12 — Consumer Protection

`cbse-12-business-studies-ch12` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) in the pattern of the CBSE 12 Business Studies chapters ch01–ch06.

**Build.** From `platform/` run `npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch12/src/build.mjs`. Edit `src/`, not the JSON.

**What the build checks:** the schema, pipeline lint, the deterministic verify checks, word limits, narration rules, the answer-leak scan and the editorial counts. It then writes `release.json` and `tests.json`.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 16 slides), notes (6 sections), 30 flashcards, 71 questions (5 case-based with 15 parts and alternatives) |
| `tests.json` | `chapter-test-short` (20 marks, 40 min) on `cbse-12-default-chapter-test-short` and `chapter-test-long` (40 marks, 90 min) on `cbse-12-default-chapter-test-long`, item for item including the internal-choice groups |
| `src/` | `lib.mjs` (shared CBSE 12 Economics/Business Studies lib, unchanged), `questions.mjs` (bank and computed forum figures), `build.mjs` (visuals, decks, notes, cards, tests) |

## Scope

All four syllabus topics:
- **t01:** importance of consumer protection, from the consumer's and the business's point of view.
- **t02:** the Consumer Protection Act 2019: who is a consumer, the six rights, responsibilities, who can file a complaint.
- **t03:** the three-tier redressal machinery, choosing a commission, appeals and reliefs.
- **t04:** the role of consumer organisations and NGOs.

### Decks

**Part 1** (18 slides, 14 with a visual):
- **Content:** reasons from both sides; who is a consumer; the six rights (SVG grid); rights in two tables; responsibilities; quality marks; who can complain.
- **Worked examples:** consumer or not? (four imagined buyers); spotting the violated right from the clue in a case.
- **Checks (4):** `tf_moral`, `tf_online_consumer`, `mt_rights`, `m_hallmark`.

**Part 2** (16 slides, 12 with a visual):
- **Content:** three tiers (SVG); value-paid basis; route of appeal; how a complaint moves; reliefs; consumer organisations.
- **Worked examples:** choosing the commission for four imagined purchases (computed); matching relief to finding.
- **Checks (4):** `m_tractor_forum`, `ord_appeal`, `mt_remedies`, `m_ngo_legal`.

Narration is at most 66 words per slide and uses no symbols.

### Question bank (71 items)

| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 |
| assertion-reason | 8 | 1 |
| true-false · fill-blank · match · ordering | 5 · 3 · 2 · 1 | 1 · 1 · 2 · 1 |
| numerical | 1 (plus 1 inside a case) | 2 |
| short | 7 + 6 | 2 / 3 |
| long | 6 | 5 |
| case-based | 5 | 4 |

- **Case-based items:** the geyser, Shikhar coaching, the hospital, Jagruk Grahak Samiti and two kitchenware makers. Each follows the quote, name, explain pattern, with an internal choice in part (c).
- **Difficulty:** d1 12, d2 37, d3 19, d4 3.
- **Competency:** recall 9, understanding 25, application 26, analysis 11. Application or above is 52% of items.
- **Answer keys:** MCQ keys are a7 b7 c7 d6.
- **Tests:** disjoint, and no deck-check item is used.
- **Spares:** `l_responsibilities`, `s_info_choose`, `s3_appeals`, `s3_ngo_three`, `cb_manch`, `cb_tarang` and several objective items.

## Facts a reviewer should double-check

1. **Pecuniary limits.**
   - The chapter teaches the limits of the Consumer Protection (Jurisdiction of the District Commission, the State Commission and the National Commission) Rules, notified in December 2021: District up to ₹50 lakh, State above ₹50 lakh and up to ₹2 crore, National above ₹2 crore.
   - The Act as passed in 2019 and brought into force in 2020 set ₹1 crore and ₹10 crore, and some textbook printings still show those figures. Please confirm which figures CBSE expects for 2026-27. If it is the older ones, change `LIMIT_DISTRICT` and `LIMIT_STATE` in `src/questions.mjs` and the figures in `build.mjs` and rebuild. The asserts will flag every example whose forum changes.
2. **Basis of jurisdiction:** under the 2019 Act it is the value of goods or services **paid as consideration**, not the compensation claimed. Three items test this: `m_basis`, `ar_basis` and `cb_hospital` part (b).
3. **Appeal periods:**
   - District to State: 45 days.
   - State to National: 30 days.
   - National to the Supreme Court: 30 days.
4. **Complainants:**
   - Named: a consumer; a registered voluntary consumer association; the Central Government, the CCPA or a State Government; one or more consumers on behalf of numerous consumers with the same interest; the legal heir or representative of a deceased consumer.
   - The notes add the parent or guardian of a minor.
5. **Consumer:**
   - Online, teleshopping, direct-selling and multi-level-marketing purchases are included.
   - Use for self-employment is not a commercial purpose.
   - Forum examples deliberately use non-commercial buyers: families, residents' associations and housing societies.
6. **Six rights:** safety, be informed, choose, be heard, seek redressal, consumer education.
7. **Marks:**
   - ISI is for industrial and electrical goods, Agmark for agricultural produce and Hallmark for jewellery.
   - The FSSAI licence number on packaged food stands in for the older FPO mark.
8. **Days:** National Consumer Day is 24 December and World Consumer Rights Day is 15 March. They appear in the notes and a flashcard only, and no question tests them.

## Originality

- Every consumer, seller, brand, institute, hospital and association is imagined and labelled as such.
- No NCERT text, example or exercise and no board or sample-paper item is reused (D-036).
- Every stem was compared against every other `release.json` under `content/authored` and `content-templates/exemplars`: 0 exact duplicates.

## Gaps

- Nobody has seen the two SVGs (rights grid, three tiers) rendered. A script check finds no label overflow or overlap, but they should still be checked at 360 px on staging.
