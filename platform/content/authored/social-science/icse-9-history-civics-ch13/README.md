# ICSE Class 9 History & Civics, Chapter 13 — Medieval India: The Mughal Empire

`icse-9-history-civics-ch13` · release v1 · academic year 2026-27 · family `social-science` · every item `status: "draft"`

Hand-authored for the ICSE Class 9 History & Civics syllabus. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch13/src/build.mjs`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 22 slides; 4 checks each; 2 and 3 worked examples; 4 SVG figures, the rest tables and flows); notes (7 sections); 33 flashcards; 79 questions |
| `tests.json` | short test (20 marks, 30 min, `icse-9-default-chapter-test-short`) and long test (40 marks, 60 min, `icse-9-default-chapter-test-long`); they share no question and use no deck-check item |
| `src/` | `questions.mjs` (bank), `build.mjs` (four SVG figures: Taj Mahal schematic elevation, rulers time line to scale, three-battles schematic map, mansabdari chart; decks, notes, flashcards, tests) |

## Scope
All six topics (no removed topics): t01 the Ain-i-Akbari and the monuments of Shah Jahan; t02 rulers in order; t03 Babur's three battles; t04 Akbar's Rajput policy and integration; t05 social and educational reforms; t06 the mansabdari system.
Left out on purpose: any quotation of the Ain-i-Akbari; any evaluation of Aurangzeb (place in the order only); present-day political comment; descriptions of violence; characterisation of any community. Policies are described by their aims and results; Maharana Pratap's resistance is stated respectfully and without a verdict on the battle.

## Question bank (79 items)
| Type | Count |
|---|---|
| mcq | 30 (keys a 7, b 7, c 8, d 8) |
| assertion-reason | 7 (keys c, a, c, c, b, c, d) |
| true-false / fill-blank / match / ordering | 3 / 4 / 3 / 3 |
| short 2-mark / 3-mark | 11 / 7 |
| long 10-mark (3 + 3 + 4, step marks sum to 10) | 8 |
| source-based (imagined heritage-walk notes, newspaper report, revenue clerk's ledger; each with an either/or part) | 3 |

- Difficulty: d1 2, d2 21, d3 44, d4 12. Competency: recall 13, understanding 29, application 24, analysis 10, evaluation 3 (47% application or above).
- Topic spread (multi-topic items count in each): t01 18, t02 6, t03 15, t04 15, t05 8, t06 16.

## Tests (item keys)
- Short: A = `m_reveal`, `m_humayun`, `m_amber`, `m_zat_sawar`, `ar_panipat`, `s_sulh`, `s3_babur`; B = attempt 1 of `l_ain`, `l_reforms`.
- Long: A = `m_ain_caution`, `m_shortest`, `m_ghaghra`, `m_taxes`, `m_education`, `m_payment`, `m_babur_analysis`, `ar_mansab`, `s_ain`, `s_babur_pan`, `s_translation`, `s3_integration`, `s3_merits`; B = attempt 2 of `l_monuments`, `l_rajput`, `l_mansab`.
- Deck checks (in neither test): `tf_taj`, `mt_monuments`, `ord_rulers`, `mt_battles`, `fb_sulhikul`, `ord_akbar`, `tf_social`, `mt_mansab`.

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan: 0 flags against 29,781 other stems. SVG label overflow and overlap scan: 4 figures, 0 issues; the four figures were also rendered in a browser and looked at.
- Every stem names an imagined guide, school, ledger, gallery or clerk, to stay clear of CBSE 7 History wording. Nothing is quoted from any source.

## Facts for a reviewer to double-check
1. **Ain-i-Akbari.** Written by Abul Fazl, a courtier of Akbar; the third part of the Akbarnama, completed about 1598. It describes administration, revenue system, mansabdari, army, provinces, society, statistics of produce and prices. Value: detailed official information. Caution: written by a courtier, so it praises Akbar. Not quoted.
2. **Taj Mahal, Agra.** Built by Shah Jahan in memory of Mumtaz Mahal, about 1632 to 1653; white marble; pietra dura inlay; charbagh; double dome; four minarets; raised platform; symmetry; UNESCO World Heritage Site 1983.
3. **Jama Masjid, Delhi.** Shah Jahan, about 1650 to 1656; red sandstone and white marble; large courtyard; three domes and two minarets; one of the largest mosques in India.
4. **Red Fort (Lal Qila), Delhi.** Shah Jahan, about 1639 to 1648, in Shahjahanabad; red sandstone walls; Diwan-i-Am (public audience) and Diwan-i-Khas (private audience); World Heritage Site 2007; the Prime Minister (the office, no name) addresses the nation from it on Independence Day.
5. **What the monuments reveal:** wealth, power, a blend of Persian and Indian styles, skilled craftsmen. The Qutb Minar listing year 1993 (from ch12) and the Taj year 1983 are used as distractors in `m_unesco_fort`.
6. **Rulers (about):** Babur 1526-1530; Humayun 1530-1540 and 1555-1556 (interrupted by Sher Shah Suri); Akbar 1556-1605; Jahangir 1605-1627; Shah Jahan 1628-1658; Aurangzeb 1658-1707 (place in the order only). Derived lengths in `m_shortest`: Babur about 4, Jahangir about 22, Shah Jahan about 30, Akbar about 49 years (Akbar and Aurangzeb tie at about 49, so no item compares them). The time line draws Sher Shah's interval 1540-1555 as a dashed gap.
7. **First Battle of Panipat, 1526**, against Ibrahim Lodi (the last Sultan of Delhi). Babur's advantages: artillery, the tulughma flanking tactic, defences of carts. Result: end of the Delhi Sultanate, start of Mughal rule.
8. **Battle of Khanwa, 1527**, against Rana Sanga of Mewar and allies; Mughal power secured in north India.
9. **Battle of Ghaghra, 1529**, against Afghan chiefs of Bihar and Bengal (including Mahmud Lodi); eastern Afghan resistance checked. The map is schematic: positions approximate, dashed arrows show the order only.
10. **Rajput policy.** Marriage alliance with the Kachhwaha ruler of Amber, 1562; high mansabs (Raja Man Singh); rulers who accepted overlordship kept their kingdoms; those who refused faced war: Mewar under Maharana Pratap resisted, Battle of Haldighati 1576 (no outcome stated). Aims: a stable empire with loyal allies.
11. **Integration.** Sulh-i-kul ("peace with all"); pilgrim tax abolished about 1563; jizya abolished about 1564 (described as levies connected with religion); Ibadat Khana at Fatehpur Sikri from about 1575; Persian as the language of administration; a uniform administration; Din-i-Ilahi optional, a small following, ended with him.
12. **Social and educational reforms, as commonly taught.** Forced sati discouraged; widow remarriage allowed; minimum ages for marriage; practical subjects (mathematics, agriculture, history) in schools; translation department: the Mahabharata into Persian (Razmnama); patronage of scholars, painters and musicians (Tansen).
13. **Mansabdari.** Introduced by Akbar about the 1570s (dates vary); mansab = rank; zat = personal rank and pay; sawar = number of horsemen; ranks 10 to 5,000 for nobles (higher for princes); pay in cash or by jagir; ranks not hereditary; officers transferred; ranks on merit. Merits: efficient army and administration, loyalty, merit. Defects: false musters, pressure on peasants by jagirdars, later shortage of jagirs and weak control under later rulers.
14. **Other names in answer options:** Baburnama (Babur's memoir), Akbarnama, Ziauddin Barani (chronicler of the Delhi Sultanate), Tansen (musician), Raja Man Singh (noble), a Sisodia ruler of Mewar (distractor in `m_amber`).

## Unsure / gaps
- Dates of the monuments, of the tax abolitions and of the start of mansabdari vary by a year or two in books; all are given as about.
- The Independence Day line about the Red Fort is a present-day fact stated without naming anyone; remove it if the owner prefers.
- "Levies connected with religion" is the neutral wording chosen for the pilgrim tax and jizya; a reviewer may prefer other neutral wording.
- t02 (6 items) and t05 (8 items) have fewer items than other topics because the syllabus gives each one narrow outcomes.
- The statement that a marriage alliance and high mansab "may" accompany acceptance is a reading of the commonly taught policy, not a rule.
- No past-paper or specimen item was consulted.
