# ICSE Class 9 History & Civics, Chapter 7 — Jainism and Buddhism

`icse-9-history-civics-ch07` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default; drafted by Sonnet 5.5 under D-050) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch07/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (20 + 20 slides, 15 + 15 with visuals: 3 SVG figures (timeline, schematic map, comparison chart), the rest tables and flows; 4 checks each; 3 and 2 worked examples); notes (6 sections); 31 flashcards; 72 questions |
| `tests.json` | `t_icse9historycivics_ch07_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch07_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank, three SVG figures), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All four syllabus topics are covered (no removed topics for this chapter):
- t01: the Angas, the Tripitakas and the Jatakas as sources (brief)
- t02: causes for the rise of new faiths in the 6th century BCE (religious, social, economic, political, local languages)
- t03: Jain doctrines: Tri-ratnas, five vows, karma, equality, moksha (Mahavira's life and the later split into Shvetambara and Digambara in brief)
- t04: Buddhist doctrines: Four Noble Truths, Eightfold Path, Middle Path, Nirvana, the Sangha (the Buddha's life and the four sites in brief), plus Jainism and Buddhism compared (tagged t03 and t04)

Deliberately left out: any quotation of scripture (teachings are paraphrased), images of deities or relics, ranking of the faiths, and any comment on later developments (for example Ashoka, which is the next chapter).

## Question bank (72 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 24 | Keys a 6, b 6, c 6, d 6 |
| assertion-reason | 7 | ICSE option order; keys c, c, a, c, b, d, a |
| true-false · fill-blank · match · ordering | 3 · 4 · 4 · 2 | Orderings: the Buddha's four sites; four steps of the Eightfold Path |
| short 2-mark | 10 | |
| short 3-mark | 8 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | Imagined exhibition labels, an imagined pilgrimage diary, an imagined trader's letter. Each has an either/or part (c). |

- **Difficulty:** d1 5, d2 31, d3 30, d4 6.
- **Competency:** recall 12, understanding 19, application 23, analysis 15, evaluation 3. That puts 57% of items at application or above.
- **Topics (items tagged):** t01 11, t02 16, t03 18, t04 23, plus 3 items spanning t03 and t04 and 1 spanning t02 and t03.

## Tests (item keys)
- Short: A = `m_pitaka_vinaya`, `m_cause_vaishya`, `m_vows_asteya`, `m_second_truth`, `ar_trade`, `s_causes_econ`, `s3_four_truths`; B = attempt 1 of `l_causes`, `l_buddhism`.
- Long: A = `m_angas_diary`, `m_jataka_label`, `m_cause_cattle`, `m_fifth_vow`, `m_karma`, `m_middle_path`, `m_speech_step`, `ar_vows`, `s_angas`, `s_language`, `s_nirvana`, `s3_social_causes`, `s3_mahavira`; B = attempt 2 of `l_sources`, `l_jainism`, `l_compare`.
- Deck-check items (not in either test): `mt_sources`, `m_cause_ritual`, `ar_cattle`, `m_not_cause` (Part 1); `m_triratna_scenario`, `mt_vows`, `m_first_truth`, `ord_eightfold` (Part 2).

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan against all other chapters and exemplars: 0 flags (72 stems vs 29,315 others); SVG label overflow and overlap: 0 issues (3 figures).
- Every stem is specific to an imagined diary, letter, exhibition, school or town, to stay clear of CBSE 6 and CBSE 12 History wording. No scripture is quoted.

## Facts for a reviewer to double-check
1. **Gautama Buddha born about 563 BCE at Lumbini; Mahavira born about 540 BCE at Kundagrama near Vaishali.** Commonly taught approximate dates; books differ (some scholars place both later). Both are marked "about"; the timeline figure is drawn to scale and the code asserts the order. Death dates are not given.
2. **Sources:** the Angas are Jain texts, **twelve in tradition**, compiled at the **Council of Valabhi about the 5th to 6th century CE** ("about"; the lost twelfth Anga is not discussed). The Buddhist **Tripitakas** are the Vinaya, Sutta and Abhidhamma Pitakas, composed in **Pali**. The **Jatakas** are stories of the Buddha's earlier births with glimpses of daily life.
3. **Causes:** religious (complex, costly rituals and sacrifices; leading place of priests; Sanskrit not understood by common people), social (rigid varna system; Kshatriya and Vaishya aspirations), economic (farming needed cattle, so ahimsa was welcomed; growth of trade and towns), political (rise of kingdoms such as Magadha; royal support), and local languages (Prakrit, Pali). Worded neutrally: the new teachings "questioned" some practices, and the older tradition "continued". No individual king is named.
4. **Mahavira:** the 24th Tirthankara; Parshvanatha the 23rd; attained kevala jnana after years of austere practice; called Jina ("conqueror") and Mahavira. The place and date of his death are not given.
5. **Tri-ratnas:** right faith, right knowledge, right conduct (the Sanskrit names are not used).
6. **Five vows:** ahimsa, satya, asteya, aparigraha, brahmacharya. Parshvanatha is said to have taught the first four; **brahmacharya was added by Mahavira** (commonly taught).
7. **Karma, equality, moksha:** actions bind karma to the soul and shape rebirth; every living being has a soul; conduct and not birth decides progress; moksha is liberation from karma and rebirth. Later division into **Shvetambara and Digambara** is named only (no meanings, no dates).
8. **Buddha's sites:** **Lumbini** (birth, traditional), **Bodh Gaya** (enlightenment), **Sarnath** (first sermon, to five companions), **Kushinagar** (mahaparinirvana). The schematic map places these and Kundagrama approximately and says "schematic, not to scale"; the river Ganga is a rough line.
9. **Four Noble Truths:** life involves suffering; desire is the cause; suffering can end; the Eightfold Path is the way. **Eightfold Path** in the traditional order: right view, resolve, speech, action, livelihood, effort, mindfulness, concentration. **Middle Path:** avoids extreme indulgence and extreme self-denial. **Nirvana:** freedom from desire and from the cycle of rebirth. **Sangha:** the community of monks and nuns.
10. **Comparison:** similarities (same century; questioned costly rituals; karma and rebirth; ahimsa; Prakrit and Pali; monastic orders) and differences (stress on strict ahimsa and austerity versus the Middle Path; Tri-ratnas and five vows versus the Four Noble Truths and the Eightfold Path; Buddhism spread to many lands of Asia while Jainism stayed mainly in India). No ranking of faiths.
11. The Buddha's family is named only as "a prince of the Shakya clan" in the imagined diary; no ages (renunciation, enlightenment, death) are given.

## Unsure / gaps
- The "kingdoms such as Magadha" and "rulers supported the teachers" statements are general; no king is named, to avoid dating disputes.
- The claim that Buddhism spread to many lands of Asia is stated broadly (no dates or countries) and is expanded in later chapters.
- No past-paper or specimen item was consulted; the built-in originality scan shows no duplicate stem.
