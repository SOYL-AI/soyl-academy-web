# CBSE Class 11 Political Science, Chapter 8: Local Governments

`cbse-11-political-science-ch08` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-sonnet-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch08/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, the word limits, narration rules, answer-leak scan, exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-political-science-ch01/src/lib.mjs` (not edited here).

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 20 slides) with 4 SVG figures and the rest tables and flows; 7 notes sections; 32 flashcards; 76 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

- **t01 Growth of local government; 73rd and 74th Amendments:** why local government; steps from 1882 to 1986; the 73rd Amendment (three tiers, gram sabha, elections, reservation, State Election and Finance Commissions, Eleventh Schedule, PESA); the 74th Amendment (forms of municipality, Twelfth Schedule, ward committees, Census 2011 urban definition).
- **t02 Implementation of local governance:** achievements; problems (the three Fs, grants, own revenue, control by state officials, proxy representation); assessment as some argue / others argue.

### Decks
- **Part 1, Growth and the 73rd Amendment (20 slides):** timeline SVG and three-tier structure SVG; worked examples on a small state's tiers and on counting women's seats; 4 checks (`m_art40`, `mt_timeline`, `m_tiers`, `tf_sabha`).
- **Part 2, Urban Bodies and Implementation (20 slides):** rural-versus-urban comparison SVG and an imagined panchayat income bar chart SVG; worked examples on the Census 2011 urban test and on a ward committee; 4 checks (`mt_urban`, `m_74`, `m_regular`, `m_own_rev`).
- Narration at most 90 words, no symbols, digits or quotation marks.

### Tests
- **Short (20 marks):** A m_dissolve, m_urban_def, m_threeF, ar_funds; B s2_why, s2_reserve, s3_73; C one of l_73 / l_assess; D c_sabha.
- **Long (40 marks):** A m_ripon, m_reserve_women, m_sec, m_11th, m_forms, m_ward, m_grants, m_proxy, ar_73, ar_corp; B s2_sabha, s2_sec, one of s2_threeF / s2_pesa, s3_growth, one of s3_74 / s3_problems; C l_growth, one of l_74 / l_problems; D c_budget, c_ward.

## How verified
See the build output (`NO ERRORS`, `lint: 0 error(s), 0 warning(s)`), byte-identical repeated builds, the near-duplicate scan and the SVG check. Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Why local government: decisions close to the people, local knowledge, participation, grassroots democracy.
2. 1882: resolution associated with Lord Ripon encouraging local self-government.
3. Government of India Act 1919: village panchayats set up in some provinces.
4. Gandhi's gram swaraj (paraphrased as villages being largely self-governing communities).
5. Article 40, a Directive Principle: the State to take steps to organise village panchayats.
6. Community Development Programme, 1952.
7. Balwantrai Mehta Committee, 1957: three-tier system.
8. L. M. Singhvi Committee, 1986: constitutional status for local self-government bodies.
9. 73rd Amendment passed 1992; in force 24 April 1993, observed as National Panchayati Raj Day.
10. Three tiers: gram panchayat, panchayat samiti, zila parishad; states below 20 lakh population need not have the intermediate tier.
11. Gram sabha: all adult voters of the village.
12. Direct elections at all levels every five years; elections within six months of dissolution; conducted by the State Election Commission.
13. Reservation: SC and ST in proportion to population (seats and chairpersons' posts); at least one-third for women (many states provide half, no count given); backward classes left to the states.
14. State Finance Commission: reviews finances every five years.
15. Eleventh Schedule: 29 subjects. Twelfth Schedule: 18 subjects.
16. PESA: Panchayats (Extension to Scheduled Areas) Act 1996, extending the provisions to Fifth Schedule areas with adaptations.
17. 74th Amendment passed 1992; in force 1 June 1993; nagar panchayat (area in transition), municipal council (smaller urban area), municipal corporation (larger urban area); reservation, State Election Commission and State Finance Commission apply; ward committees in larger municipalities.
18. Census 2011 urban definition: population at least 5,000; at least 75 percent of male working population in non-agricultural work; density at least 400 persons per square kilometre.
19. Implementation: regular elections; many elected representatives including women and SC and ST members (no national figures given); voice at the grassroots; problems: limited transfer of the three Fs, grants, low own revenue, control by state officials, proxy representation (in some places, neutral); assessment as some argue / others argue.
20. All states, villages, cities, settlements, budget figures, passages and people in scenarios are imagined, including the Madhupur income figures (16, 18, 4 and 2 lakh rupees, total 40).

Unsure or noted: (a) the Part numbers (Part IX and IXA) and Article ranges are not cited; (b) the ward committee rule is stated as "larger municipalities", without a population threshold (the Constitution sets one; check before adding it); (c) the examples of Eleventh and Twelfth Schedule subjects (agriculture, drinking water, primary education, roads, markets; urban planning, water supply, public health, fire services, street lighting, burial grounds, slum improvement) should be checked once; (d) "Constitution Day is 26 November" and "Republic Day is 26 January" appear in a solution; National Voters Day is deliberately left undated.
