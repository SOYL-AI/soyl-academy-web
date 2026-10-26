# subject-producer (CBSE 10 Social Science, batch A) — first SST chapters + social-science templates — 2026-10-27

Status: **done** — four hand-authored chapters, one gold standard per discipline (History, Geography, Political Science, Economics), plus the seven `social-science` prompt templates. Every item is `status: "draft"` pending review.

Branch: `platform/subject-producer/cbse-10-sst-a` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-sst-a`), based on `platform/main` at 3c190a9. Commits: 017d614 (ch01), 34afe4b (ch06), 6423bb3 (ch13), 3963cfc (ch18), 85b7cd3 (templates), and this handoff. No files outside the owned paths were changed.

## What changed

| Path | What |
|---|---|
| `platform/content/authored/social-science/cbse-10-social-science-ch01/` | The Rise of Nationalism in Europe (History) — release.json, tests.json, README.md |
| `platform/content/authored/social-science/cbse-10-social-science-ch06/` | Resources and Development (Geography) |
| `platform/content/authored/social-science/cbse-10-social-science-ch13/` | Power-sharing (Political Science) |
| `platform/content/authored/social-science/cbse-10-social-science-ch18/` | Development (Economics) |
| `platform/content-templates/prompts/social-science/{outline,deck,notes,flashcards,questions,case-passages,verify}.v1.md` | Prompt templates for the family |
| `docs/platform/handoffs/2026-10-27-subject-producer-cbse10-sst-a.md` | This note |

Every release: v1, academic year 2026-27, provenance `{ origin: "human", author: "claude-opus-5-5 (subject-producer)", model: null }`, `build.checks` filled from the validation runs. Each README records scope, why the chapter is the standard for its discipline, how its sources were written, the verifier pass and gaps.

## Counts

| | ch01 Nationalism in Europe | ch06 Resources & Development | ch13 Power-sharing | ch18 Development |
|---|---|---|---|---|
| Decks (slides) | 2 (23, 23) | 2 (24, 20) | 1 (25) | 2 (18, 19) |
| Slides with a visual | 29 / 46 | 29 / 44 | 16 / 25 | 24 / 37 |
| Deck visuals by kind | table 19, flow 10 | table 18, flow 9, plot 1, svg 1 | table 10, flow 5, plot 1 | table 16, flow 5, plot 3 |
| Worked examples / checks | 4 / 8 | 4 / 8 | 3 / 4 | 5 / 7 |
| Narration words (min–max, mean) | 13–70, 57 | 9–77, 57 | 11–71, 55 | 8–76, 55 |
| Notes sections (visuals) | 8 (9) | 7 (7) | 5 (5) | 6 (6, + 2 formulas) |
| Flashcards | 32 | 32 | 30 | 30 |
| Questions (marks) | 78 (154) | 86 (165) | 78 (152) | 83 (161) |
| mcq · A-R · T/F · fill · match · ordering | 26 · 6 · 4 · 3 · 2 · 3 | 29 · 6 · 4 · 3 · 2 · 2 | 28 · 6 · 4 · 3 · 2 · 2 | 29 · 6 · 4 · 3 · 2 · 2 |
| map (places) | 2 (4, practice) | 6 (8, board soil map work) | 2 (4, practice) | 1 (2, practice) |
| numerical | – | – | – | 3 (+ 3 case parts) |
| short 2 / short 3 / long 5 | 10 / 10 / 6 | 11 / 11 / 6 | 10 / 9 / 6 | 11 / 10 / 6 |
| source-based / case-based (4 = 1+1+2) | 5 / 1 | 3 / 3 | 4 / 2 | 3 / 3 |
| Difficulty d1/d2/d3/d4/d5 | 12/28/31/6/1 | 10/41/28/6/1 | 11/37/21/8/1 | 17/35/23/7/1 |
| Application or higher (items / marks) | 47% / 55% | 47% / 52% | 46% / 55% | 47% / 53% |
| MCQ keys a/b/c/d | 7/6/6/7 | 7/7/7/8 | 7/7/7/7 | 7/7/8/7 |

Totals: **7 decks, 152 slides, 124 flashcards, 325 questions** (24 source/case items with 96 parts and alternatives), **8 chapter tests**.

- **Sources are SOYL-original.** Every source-based and case-based item has `passage_origin: "soyl-original"`, a stem label ("Illustrative source written by SOYL for practice…"), and an imagined writer: a Utrecht merchant's letter (1806), a Parisian seamstress's diary (1848), a Berlin newspaper (1871), an imagined 1849 poster, an Indian student's Balkan journal (1912), a mining-district field notebook, a Malwa farmer's letter, a Thar village newspaper, a Brussels student's diary (1965), a Jaffna teacher's letter (1958), a dam hearing, a health worker's letter, a farmer's tube-well diary, and data tables for imagined districts, villages and countries. Part (c) of every item is an either/or modelled with `ChildQuestion.alternatives` (`c-ii`).
- **Tests** follow the SST chapter-test blueprints and set `blueprint_id` (`cbse-10-social-science-chapter-test-short|long`): short = A 3 mcq + 1 A-R, B 2+2+3, C one of two 5-mark, D one source (20 marks, 40 min); long = A 8 mcq + 2 A-R, B 2+2+(2|2)+3+(3|3), C 5+(5|5), D two sources (40 marks, 90 min). **ch06** replaces one 2-mark short with **two 1-mark soil map items** in Section B of both tests, as the blueprint notes allow. Short and long tests are disjoint and never use deck-check questions. ch18's compulsory long question is the **data-based** one (board Q38 style).
- **Word limits** use the board's: 2-mark ≤ 40 (25–40), 3-mark ≤ 60 (40–60), 5-mark ≤ 120 (100–120); every model answer is within its own limit (stricter than the lint band).

## Validation (final run, all four chapters)

```
$ npm test -w @soyl/content-templates -- --reporter=verbose   (social-science lines)
 ✓ … social-science/cbse-10-social-science-ch01 > is a valid ChapterRelease
 ✓ … social-science/cbse-10-social-science-ch01 > is named after its chapter and has a README
 ✓ … social-science/cbse-10-social-science-ch01 > uses only topics from the chapter syllabus
 ✓ … social-science/cbse-10-social-science-ch01 > decks meet the visual lesson rules
 ✓ … social-science/cbse-10-social-science-ch01 > has enough flashcards and practice questions
 ✓ … social-science/cbse-10-social-science-ch01 > writes language subjects in their own script (…)
 ✓ … social-science/cbse-10-social-science-ch01 > has a short and a long chapter test drawn from its own questions
 (same 7 ✓ for ch06, ch13, ch18)
 Test Files  1 passed (1)
      Tests  141 passed (141)

$ npm run content -- lint --exemplars        (social-science lines; all other chapters unchanged)
ok   cbse-10-social-science-ch01: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch06: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch13: 0 error(s), 0 warning(s)
ok   cbse-10-social-science-ch18: 0 error(s), 0 warning(s)

$ npx vitest run --root content-pipeline test/templates-families.test.ts   (parses every template)
 Tests  21 passed (21)
```

- **KaTeX:** only ch18 has maths (17 strings: per capita income, reserves ÷ production, worked divisions); all parse in the lint's KaTeX check, and every numeric `=` passes the lint's arithmetic rule.
- **Scratch validator** (per chapter): narration length and symbols, visual gap, rectangular tables, flow edges, check slides → objective items, scheme sums (incl. children and alternatives), word counts vs `word_limit`, ordering shown shuffled, match not keyed in order, fill-blank blank counts, duplicate stems, key balance, test composition. Final: 0 errors, 0 warnings on all four.
- **Independent numeric re-solve:** a separate script recomputed every stated number (ch06 land-use table sums to 5,000 km², NSA 53%, GCA 3,750, forest 18%; ch18 per capita ₹1,50,000, village averages, reserve lives 20/10 years, HDI gaps 9 and 3.5 years, Bigland/Smallland ratios; ch01 trader's margin; ch13 shares) — all hold.
- **SVG:** one schematic (ch06 conservation methods) checked against the allow-list by the lint and rasterised with resvg; two layout fixes after viewing.
- **few_shot:** all template references resolve (0 missing) against a staged copy with the chapters under `exemplars/social-science/` — see "Needs from Lead".

## Verifier pass (summary; details in each README)
1. **Wrong key caught (ch13 m_farmers):** keyed (d) with the right answer at (b), and a self-contradicting solution; fixed and all 28 MCQ keys re-solved.
2. **Key balance:** ch18's draft had 15/26 MCQ keys at (b), ch13's 10/26. Re-keyed by moving the correct option and swapping option letters inside the solution in code (so key and solution cannot drift), then a script confirmed every solution names its key. A placeholder solution (ch18 m_dev_def) was found and rewritten.
3. **Competency honesty:** first drafts were at 35% (ch01), 43% (ch13), 42% (ch18) application+. Labels were corrected where items only test a definition (e.g. ch06 pond ownership, hydrogen as stock, Punjab over-irrigation → understanding/recall), and **23 genuinely higher-order items** were added across the four chapters rather than relabelling. Finals 46–47% of items, 52–55% of marks.
4. **Accuracy beyond the textbook model (ch13):** an item on French schooling for a French-speaking family *in Flanders* relied on the simplified "community government wherever they live" rule; real Belgian community powers are tied to language areas and Brussels, so the item now uses a family in Brussels. The simplification is flagged in the README.
5. **Facts fixed:** Byron "fought" → went to fight, died of fever (1824); Romanians listed as Slavs; Grimms "folk tales and songs" → folk tales; "Poland had no state" → no independent state; Balkans T/F reworded to be literally true; Sri Lanka table caption (language and religion shares overlap).
6. **Originality (textbook-echo scan):** over 100 sentences or phrases rewritten across the four chapters where the frame followed the textbook even for standard facts: definitions (nation-state, conservatism, allegory, developed resource, reserves, majoritarianism, IMR, literacy, life expectancy, sustainable development), distinctive phrases ("harbingers of liberty", "narrow creed with limited ends", "long-drawn-out process", "right to be consulted on how they are to be governed", "do not respect national or state boundaries", "money in your pocket…"), section headings, and descriptive sentences on erosion, soils, Highlanders, censorship. The textbook's Country A/B income example was deliberately not reused.
7. **Lint traps found while authoring:** `US$` in a table opened KaTeX maths (7 errors) → USD; "Imagined data:" and "Read the data:" tripped the `data:` link filter → reworded. Both are now rules in the templates.
8. **Word limits:** about 20 model answers trimmed to their limits.

## Templates (`platform/content-templates/prompts/social-science/*.v1.md`)
- **outline** — deck split; discipline-specific visual plans (History timelines/cause chains, Geography tables/plots/schematics, Political Science institution flows, Economics data and formulas); fact list with uncertainty flags; **map-work plan**; worked examples as exam skills; planned SOYL-original sources; question plan (≥ 5 items at d4–5, ~50% application+).
- **deck** — slide rules, worked-example patterns (source answer part by part, 5-mark plan, data reading, comparison, map reading), visual rules (plots with numbered categories + caption, schematic SVG only, **never a drawn map**), `$`-as-currency and `data:` traps, neutral narration on sensitive topics.
- **notes / flashcards** — one section per topic with a visual; definitions in own words; discipline pairings (date–event, feature–region, form–example, indicator–meaning–direction).
- **questions** — board types and word limits, map items (locate/shade and label; 1 mark per place; no "identify A" until coordinates exist), numericals for Economics, ordering for chronology, honest competency ladder, `{{id_prefix}}_NNN` ids.
- **case-passages** — the source-writing rules: imagined primary sources with bold heading "(imagined)", period-true details, stem label, `passage_origin: "soyl-original"`, (a)/(b) from the passage, (c) beyond it with `alternatives` `c-ii`, consistent invented data.
- **verify** — severity scale with social-science criticals (wrong date/place/treaty, copied or close-paraphrased text, a passage presented as real, partisan or demeaning content, drawn country maps), re-solve procedure incl. A-R and ordering, source checks, textbook-echo check, balance, rendering traps.
- Validated: all seven parse (pipeline template test) and every `few_shot` reference resolves against the staged exemplar layout.

## Contract and pipeline gaps (recommendations)
1. **Map geometry.** `MapPlace` has no coordinates or region geometry, so (a) the board's "identify the feature marked A" format cannot be rendered, and (b) answers cannot be shown on the map. Proposal: optional `at: [lat, lon]` for points and `region_id` for areas (e.g. soil zones) resolved against renderer-shipped layers. Renderer must ship outline maps for the ids used here: `india-political`, `europe-political`, `south-asia-political`.
2. **Bar-plot categories.** `PlotVisual.series` of `kind: "bar"` has no category labels; categories are numbered on the x-axis and named in captions (relief shares, language shares, village incomes). Optional `categories` would read better (also requested by science batch C).
3. **`data:`/`tel:` false positives.** The link filter fires on ordinary prose ("Imagined data:", "Read the data:"). Suggest matching only scheme-like tokens (no space after the colon and followed by a URI-ish string).
4. **Currency `$`.** `$` always opens KaTeX; a lint hint ("did you mean ₹ or USD?") when a `$` precedes a digit would save authoring time.
5. **Cartoon / image items.** The board's Political Science section has a cartoon-based MCQ and History uses paintings; these need licensed or SOYL-drawn artwork and an image asset kind. Here allegory items describe imagined images in words.
6. **few_shot outside `content-templates/`.** The loader refuses paths outside `content-templates/`, so authored chapters cannot be few-shot sources (see Needs from Lead).
7. **Verify stage for facts.** Dates, places and treaty terms are the error class that passes every textual check; a verify call that must list each date/place it checked would help.

## Decisions made
- Decks split by topic: ch01 (t01–t02 | t03–t04), ch06 (t01–t02 | t03–t04), ch13 one deck, ch18 (t01–t02 + averages | t03–t04).
- Map items in ch01/ch13/ch18 are labelled practice (the board's map list covers History ch02 and Geography only); ch06's soil items are board-style and appear in its tests.
- Volatile real statistics (HDI ranks, World Bank thresholds, state figures) are not quoted; data examples use imagined, labelled figures; stable facts (India is lower-middle income; Kerala's low IMR; Bihar's lowest per capita income) are stated without numbers.
- Authored with a scratch toolkit (builder, validator, replacement passes, resvg rasteriser) kept outside the repo; the JSON in git is the source of truth (D-026).

## Needs from Lead
- **Promote the four chapters as family exemplars** (copy or move to `platform/content-templates/exemplars/social-science/cbse-10-social-science-ch{01,06,13,18}/`), or let `loadFewShot` read `../content/authored/`. Until then the social-science templates' `few_shot` references are reported missing (non-fatal) and generation runs without examples.
- Merge `platform/subject-producer/cbse-10-sst-a` into `platform/main`.

## Needs from owner
None.
