# CBSE Class 11 Political Science, Chapter 17: Nationalism

`cbse-11-political-science-ch17` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

Hand-authored chapter. Build from `platform/`: `npx tsx content/authored/social-science/cbse-11-political-science-ch17/src/build.mjs`. The build validates the schema, runs the pipeline lint and deterministic verify checks, word limits, narration rules, answer-leak scan, exact-stem originality pre-check and editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 and 20 slides) with 4 own SVG figures (no maps) and the rest tables and flows; 6 notes sections; 32 flashcards; 79 questions |
| `tests.json` | short test (20 marks, 40 min, `cbse-11-default-chapter-test-short`) and long test (40 marks, 90 min, `cbse-11-default-chapter-test-long`); disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

Topics **t01 Nations and nationalism** and **t02 Nationalism and pluralism**.

- t01: the standard definition of a nation; its elements (shared belief, history, territory, political ideals, common political identity); a nation is not a race, a language group or a religion; the imagined community (Benedict Anderson, name only); nationalism in history as general facts (unification, break-up of empires, anti-colonial movements, link with conflict stated neutrally); national self-determination, "one culture, one state", and the problems of minorities and ever smaller states.
- t02: how democratic states accommodate diversity (recognition, constitutional rights, group rights beside individual rights); India's linguistic reorganisation of states (1956) and Articles 29 and 30; pluralism and unity versus uniformity; Tagore's criticism of narrow nationalism (paraphrase only); the two views on whether unity needs a shared culture.
- Left out on purpose: any real separatist, secessionist or autonomy movement, any claim about a region of India, any map, any praise or blame of a nation. Every scenario uses imagined countries and groups (Veldan, Ostira, Dornel, Kessar, Marenth, Kelvar; the Hallow, Corlen and Daravi communities; the Greenfield school).

### Decks
- **Part 1, Nations and Nationalism (20 slides):** elements web, timeline (about 1870-71, 1914-18, about 1919, 1947) and self-determination dilemma flow as SVGs; tables for definition, nation versus race, language group and religion, imagined community, history, nationalism and conflict, self-determination, problems; worked examples on classifying imagined groups, the Hallow people of Ostira, and planning a 5-mark answer; 4 checks (`m_nation_def`, `tf_not_race`, `ord_timeline`, `fb_selfdet`).
- **Part 2, Nationalism and Pluralism (20 slides):** uniformity versus pluralism comparison SVG; tables for diversity, ways to accommodate it, group and individual rights, the 1956 reorganisation, Articles 29 and 30, pluralism, the two views, Tagore; worked examples on the imagined Kessar clauses, the Greenfield school debate, and planning a 5-mark answer; 4 checks (`m_accommodate`, `mt_articles`, `tf_unity`, `fb_pluralism`).
- Narration at most 63 words, no symbols, digits or quotation marks (years spelled out).

### Question bank (79 items)
Types: mcq 33, assertion-reason 6, true-false 4, fill-blank 3, match 2, ordering 2, short 2-mark 11, short 3-mark 7, long 5-mark 6, case-based 5 (1 + 1 + 2 with either/or in part c; imagined school debate, newspaper report, constitution table, classroom discussion, letter). Topics: t01 44, t02 35. Application or above: 46%. Difficulty: d1 3, d2 14, d3 42, d4 18, d5 2.

### Tests
- **Short (20 marks):** A m_political_ideals_app, m_art_app, m_group_app, ar_not_race; B s_not_race, s_art29_30, s3_selfdet_problem; C one of l_selfdet / l_accommodate; D c_debate.
- **Long (40 marks):** A m_nation_not, m_territory_app, m_unify, m_selfdet_app, m_smaller, m_uniform_app, m_tagore_app, m_views_unity, ar_imagined, ar_pluralism; B s_imagined, s_minorities, one of s_pluralism / s_anticolonial, s3_elements, one of s3_two_views / s3_tagore; C l_history, one of l_pluralism_views / l_tagore; D c_kessar, c_classroom.

## How verified
Build prints `NO ERRORS` and `lint: 0 error(s), 0 warning(s)`; three consecutive builds give byte-identical `release.json` and `tests.json` (md5 checked); no `*.wip.json` remains; near-duplicate scan 0 flags (79 stems against 35699 others), SVG check 0 issues (4 figures). Tree-wide gates, tests and e2e were not run (not part of the brief).

## Facts for a reviewer
1. Standard definition: a nation is a large group of people who see themselves as a community with a shared identity (shared beliefs, history, homeland or territory, political ideals) and who wish to govern themselves.
2. A nation is not the same as a race, a language group or a religion; many nations include people of several languages and faiths.
3. Imagined community: the description is associated with Benedict Anderson (name only; no title, year or wording given).
4. Elements as NCERT discusses them: shared belief, history, territory, shared political ideals, common political identity.
5. Germany and Italy were unified about 1870 and 1871 (general dating; Italy's unification is usually completed in 1870 and Germany's in 1871).
6. The Austro-Hungarian and Ottoman empires broke up after the First World War (fought 1914 to 1918); the timeline places this "afterwards" and the "one culture, one state" idea "about 1919".
7. Nationalism powered anti-colonial movements in Asia and Africa, including India's freedom struggle; India became independent in 1947.
8. Nationalism has also been linked with conflict and wars (stated neutrally, no case named).
9. National self-determination: the claim of a nation to govern itself and have its own state; important after the First World War; almost every state has minorities, so ever smaller states are neither practical nor peaceful (general terms, imagined cases only).
10. Linguistic reorganisation of states in India: 1956 (States Reorganisation Act, boundaries redrawn mainly on linguistic lines; the Act is not named in the content, only the year).
11. Article 29 (paraphrase): any section of citizens with a distinct language, script or culture may conserve it. Article 30 (paraphrase): religious and linguistic minorities may establish and administer educational institutions of their choice.
12. Group rights alongside individual rights; pluralism: a nation can include many cultures and identities, unity need not mean uniformity.
13. Rabindranath Tagore (paraphrase only): valued the freedom struggle but held that patriotism should not override humanity; narrow nationalism may shut out other peoples and overlook minorities. No title, year or quotation given.
14. The two views (some argue unity needs a shared culture; others argue it is built by respecting diversity) are presented with reasons and risks and left for the student to judge.
15. Distractor Articles used in one multiple-choice item: Article 19 (freedom of speech, among other freedoms), Article 14 (equality before the law), Article 368 (amendment of the Constitution).
16. All countries, colonies, groups, schools, debates, reports, letters, constitutions and clauses are imagined and labelled. No map, party, office-holder, real separatist, secessionist or autonomy movement, or real region is mentioned.

Unsure or noted: (a) Application-or-above is 46%, near the bottom of the 45-60% band. (b) The "about 1919" point on the timeline is the general post-war settlement period for the "one culture, one state" idea, not a single treaty; a reviewer may prefer different wording. (c) The dating of Germany and Italy as "about 1870 and 1871" follows the brief.
