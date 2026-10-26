# CBSE Class 10 Social Science, Chapter 1 — The Rise of Nationalism in Europe

`cbse-10-social-science-ch01` · release v1 · academic year 2026-27 · family `social-science` (History) · provenance `human`, author `claude-opus-5-5 (subject-producer)` · every item `status: "draft"`

This chapter is the **standard for History chapters** in the social-science family. The `prompts/social-science/*.v1.md` templates cite it as a few-shot source, together with ch06 (Geography), ch13 (Political Science) and ch18 (Economics).

| File | What |
|---|---|
| `release.json` | 2 decks (23 + 23 slides), notes (8 sections, 9 visuals), 32 flashcards, 78 questions (154 marks; 24 passage parts and alternatives) |
| `tests.json` | `t_cbse10sst_ch01_short` (20 marks, 40 min) and `t_cbse10sst_ch01_long` (40 marks, 90 min), with `blueprint_id` set to the SST chapter-test blueprints |

## Scope
Syllabus `platform/catalog/cbse/10/social-science/syllabus.yaml`, chapter 1, all four topics (no removed or formative-only topics in this chapter):

| Topic | Deck | Items tagged |
|---|---|---|
| t01 French Revolution and the idea of the nation (incl. Napoleon) | Part 1 | 11 |
| t02 Liberalism, conservatism, 1830–1848, romanticism | Part 1 | 39 |
| t03 Germany, Italy, Britain | Part 2 | 20 |
| t04 Visualising the nation; nationalism and imperialism | Part 2 | 13 |

t02 is the heaviest topic in the textbook and in board papers, so it carries most items.

## Why it is the standard for History

### 1. Deck shape
- **Two parts split by topic** (t01–t02 | t03–t04), each complete with goals, two worked examples, four checks, a summary and exam tips.
- **Chronology is visual.** Every period has a `flow` timeline (Part 1 title, French identity, Zollverein, hunger and revolt, Frankfurt; Part 2 Germany, Italy, Britain, Balkans) and each set of events a `table` (Vienna decisions, revolutions 1821–1848, Bismarck's wars, rulers of Italy, Germania's symbols). 29 of 46 slides carry a visual; there are never more than 2 slides in a row without one.
- **Worked examples are exam method, not facts:** (1) a source-based question answered part by part with how each mark is earned, (2) a 5-mark "explain" answer planned as five distinct points with key terms, (3) map reading on an outline map of Europe (clue → place → landmark → dot, name, letter), (4) a 5-mark "analyse" answer that connects causes to an outcome.
- **Checks** come right after the idea they test and include a chronology `ordering` item.
- **Narration** is spoken Indian English, 13–70 words (mean 57), with memory hooks ("D, A, F: Denmark, Austria, France", "the soul, the brain, the sword and the crown of Italian unity") and the exam traps examiners test.

### 2. Question bank (78 items)
| Type | Count | Marks | Notes |
|---|---|---|---|
| mcq | 26 | 1 | 8 built on short illustrative sources or scenarios (letters, petitions, coins, newspaper reports) |
| assertion-reason | 6 | 1 | keys a, c, b, d, a, b; two "true but not the explanation" items (b) test causation |
| true-false · fill-blank · match | 4 · 3 · 2 | 1 · 1 · 2 | recall drills; match columns shuffled |
| ordering | 3 | 1 | chronology (Europe 1804–1871, Italy, Britain), shown shuffled |
| map | 2 | 2 | practice on `europe-political` (Vienna, Frankfurt, Paris, Brussels); labelled as practice because the board's History map list comes from ch02 |
| short | 10 + 10 | 2 / 3 | `word_limit` 25–40 and 40–60 (board: VSA ≤ 40, SA ≤ 60 words) |
| long | 6 | 5 | `word_limit` 100–120 (board LA ≤ 120); explain, describe, analyse, examine and one evaluate (d5) |
| source-based | 5 | 4 = 1 + 1 + 2 | part (c) has `alternatives` (either/or); `passage_origin: "soyl-original"` |
| case-based | 1 | 4 | a trader's journey before and after the Zollverein, with a small calculation |

- Difficulty d1/d2/d3/d4/d5 = 12/28/31/6/1. Competency: recall 15, understanding 26, application 13, analysis 21, evaluation 3 — **application or higher is 47% of items and 55% of marks** (the board's analyse/evaluate/create share is 50% of marks).
- **Honest labels.** Naming a person or date is recall; matching a described scene to a known idea (a petition → economic liberalism, a song collector → Herder, a coin → Marianne) is application; explaining *why* (Frankfurt's failure, Piedmont's lead, the Balkans) or judging a claim about causation (A-R with key b) is analysis; taking and defending a position (Napoleon, Prussian power) is evaluation.
- Every model answer stays inside its word limit, numbered by point, with the key terms in bold. Marking schemes award one mark per distinct point, as CBSE does.

### 3. How the sources are written (originality)
CBSE History asks source-based questions on real extracts. SOYL may not reproduce textbook text or real documents, so every source here is **an original, clearly fictional document**: a Utrecht merchant's letter (1806), a Parisian seamstress's diary (1848), a Berlin newspaper report (1871), the description of an imagined 1849 poster, an Indian student's travel journal through the Balkans (1912), and a trader's journey with invented numbers. Each stem says *"Illustrative source written by SOYL for practice. It is not a real historical document."* The sources are built so that (a) and (b) can be answered from the text and (c) needs the student's own knowledge — the board's pattern. The facts inside them are historically accurate (dates, prices doubling after bad harvests, the vote for men over 21, the order of Bismarck's wars).

**Textbook-echo scan.** After drafting, the author compared the chapter against the textbook's well-known formulations and rewrote every distinctive phrase or close paraphrase, even where the idea is a standard fact: e.g. the definitions of nation-state, conservatism and allegory; "a united community enjoying equal rights under a constitution"; "harbingers of liberty"; "a narrow creed with limited ends"; "long-drawn-out process"; "the mission and destiny … to liberate the peoples of Europe"; "initial enthusiasm turned to hostility"; "language as a weapon"; the Germania symbol table; the textbook's section headings ("Hunger, hardship and popular revolt", "The revolution of the liberals"); and the Highlanders, censorship and Habsburg-population sentences. Factual lists (Vienna decisions, Napoleon's reforms, rulers of Italy) are kept as facts but rephrased and reordered.

## Pitfalls this chapter avoids (and the pipeline must)
1. "Liberals wanted votes for everyone" — in this period the vote was mostly for **property-owning men**; women could only watch the Frankfurt Parliament.
2. "Vienna dissolved the German confederation" — it was **left untouched**.
3. Bismarck vs William I; Cavour vs Garibaldi vs Mazzini; Treaty of Vienna (1815) vs Treaty of Constantinople (1832) vs Versailles (1871 proclamation).
4. Over-precise contested details: the textbook's Silesian-weavers year and Frankfurt delegate count differ from other histories, so the chapter says "mid-1840s" and "elected representatives".
5. Calling all Balkan peoples Slavs — Greeks, Albanians and Romanians are not; the chapter says "many were Slavs".
6. Source questions that only test the source: each (c) part needs knowledge beyond it.

## Verifier pass (2026-10-26)
The author re-solved every item and part from its stem alone and re-checked every factual claim (dates, people, places, treaties, symbols) against standard histories of the period. Findings fixed:
- **Competency balance:** the first draft had 35% of items at application or above. Five items were rewritten into new scenarios (economic liberalism petition, Herder-style collector, Marianne coin, why Piedmont led, plus two A-R items relabelled analysis because they require a causal judgement) and six new higher-order items were added (common features of both unifications, the liberal vote, Napoleon evaluation, Britain's union analysed nation by nation, a Warsaw teacher's peaceful resistance, Germany vs Italy compare). Final: 47% of items, 55% of marks.
- **Facts:** "Lord Byron fought" → "went to fight (died of fever in 1824)"; Habsburg table listed Romanians as Slavs → fixed; Grimm brothers "folk tales and songs" → "folk tales"; "Poland had no state" → "no independent state"; the Balkans TF item reworded so it is literally true.
- **Word limits:** 11 model answers trimmed to their limits (2-mark ≤ 40, 3-mark ≤ 60, 5-mark ≤ 120).
- **Originality:** the echo scan above (about 40 phrases in decks, notes, flashcards and items).
- Keys: all 26 MCQ, 6 A-R, 4 T/F, 3 fill-blank, 2 match and 3 ordering keys confirmed; the case-based calculation (140 − 100 − 30 = 10 thalers) rechecked.

## Gaps
- **Maps:** `map` items name `map_id: "europe-political"`; the renderer must ship that outline map. `MapPlace` has no coordinates, so "identify the place marked A" items (the board's other map format) cannot be drawn yet; these items use "locate and label".
- **Images:** the board sometimes prints a painting or cartoon; here allegory items describe an imagined image in words. Real image items need licensed or SOYL-drawn artwork.
- Tests use only `short` items in Section B (no map items), because the board's History map work comes from ch02.
