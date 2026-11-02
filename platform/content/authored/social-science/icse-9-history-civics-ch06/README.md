# ICSE Class 9 History & Civics, Chapter 6 — The Vedic Period

`icse-9-history-civics-ch06` · release v1 · academic year 2026-27 · family `social-science` · provenance `human`, author `claude-opus-5-5 (subject-producer)` (the shared lib's default; drafted by Sonnet 5.5 under D-050) · every item `status: "draft"`

Hand-authored (D-025, D-026, D-032) for the ICSE Class 9 History & Civics syllabus. Built from `src/` with the shared lib `../icse-9-history-civics-ch01/src/lib.mjs` (imported, not edited). From `platform/`: `npx tsx content/authored/social-science/icse-9-history-civics-ch06/src/build.mjs`. The build checks the schema, the pipeline lint, the deterministic verify checks, the originality pre-check, word limits, narration rules, the answer-leak scan and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON.

| File | What |
|---|---|
| `release.json` | 2 decks (18 + 18 slides, 13 + 13 with visuals: 3 SVG figures, the rest tables and flows; 4 checks and 2 worked examples each); notes (6 sections); 31 flashcards; 77 questions |
| `tests.json` | `t_icse9historycivics_ch06_short` (20 marks, 30 min) on `icse-9-default-chapter-test-short`: Section A 4 MCQ + 1 AR + one 2-mark + one 3-mark, Section B one of two 10-mark questions. `t_icse9historycivics_ch06_long` (40 marks, 60 min) on `icse-9-default-chapter-test-long`: Section A 7 MCQ + 1 AR + three 2-mark + two 3-mark, Section B two of three 10-mark questions. The tests share no question and use no deck-check item. |
| `src/` | `questions.mjs` (bank, three SVG figures), `build.mjs` (figures, decks, notes, flashcards, tests) |

## Scope
All five syllabus topics are covered (no removed topics for this chapter):
- t01: the four Vedas and the importance of the epics as sources
- t02: Early Vedic family and the position of the king
- t03: Sabha, Samiti and Vidatha (the syllabus spells it Vidhatha; the chapter uses the common spelling Vidatha)
- t04: position of women and the economy, Early and Later compared
- t05: four varnas, four ashramas and the gurukul system

Deliberately left out: the origin debate about the Vedic people (not mentioned at all), and any claim about the historicity of the epics.

## Question bank (77 items)

| Type | Count | Notes |
|---|---|---|
| mcq | 30 | Keys a 7, b 7, c 8, d 8 |
| assertion-reason | 5 | ICSE option order; keys a, c, d, c, a |
| true-false · fill-blank · match · ordering | 2 · 4 · 3 · 2 | Orderings: social units (kula to jana); ashramas |
| short 2-mark | 12 | |
| short 3-mark | 9 | |
| long 10-mark | 7 | Each in 3 + 3 + 4 parts, with per-part step marks summing to 10 |
| source-based | 3 | Imagined museum labels, an imagined Class IX role-play script, an imagined diary page. Each has an either/or part (c). |

- **Difficulty:** d1 7, d2 31, d3 31, d4 8.
- **Competency:** recall 13, understanding 22, application 19, analysis 17, evaluation 6. That puts 55% of items at application or above.
- **Topics (items tagged):** t01 12, t02 13, t03 13, t04 18, t05 16, plus 5 items spanning two or more topics.

## Tests (item keys)
- Short: A = `m_atharva_label`, `m_not_absolute`, `m_check_power`, `m_varna_later`, `ar_economy`, `s_sabha_samiti`, `s3_women_compare`; B = attempt 1 of `l_society`, `l_varna_ashrama`.
- Long: A = `m_yajur_label`, `m_senani`, `m_vidatha`, `m_composer`, `m_later_econ`, `m_ashrama_scenario`, `m_one_source`, `ar_epics`, `s_epics_imp`, `s_officials`, `s_iron_effect`, `s3_checks_king`, `s3_education`; B = attempt 2 of `l_sources`, `l_assemblies`, `l_women_economy`.
- Deck-check items (not in either test): `mt_vedas`, `m_sama`, `ord_units`, `ar_assemblies`, `m_cattle_wealth`, `m_women_early`, `m_varna_four`, `ord_ashrama`.

## How verified
- Build prints `NO ERRORS`, lint 0 errors and 0 warnings; run three times, `release.json` and `tests.json` byte-identical (md5); no `*.wip.json` left.
- Near-duplicate scan against all other chapters and exemplars: 0 flags; SVG label overflow and overlap: 0 issues.
- Every stem is specific to an imagined role-play, museum label, diary or tribe, to stay clear of CBSE 6 and CBSE 11 History wording. No hymn, verse or passage of any text is quoted.

## Facts for a reviewer to double-check
1. **Early (Rig) Vedic period: about 1500 to 1000 BCE; Later Vedic period: about 1000 to 600 BCE.** Approximate; books differ; every date in the chapter carries "about". The timeline figure is drawn roughly to scale and says so; the code asserts the two periods are contiguous.
2. The origin of the Vedic people is not discussed anywhere in the chapter.
3. **Four Vedas:** Rig Veda (oldest; hymns; ten books called mandalas; "about a thousand hymns" appears in the notes), Sama Veda (verses set to melodies for chanting), Yajur Veda (formulae and rules for sacrifices), Atharva Veda (charms, spells, healing, everyday concerns).
4. Brahmanas (explain rituals), Aranyakas (forest texts reflecting on ritual), Upanishads (discuss ideas) are named briefly as works connected with the Vedas, relevant to the Later period.
5. **Ramayana traditionally attributed to Valmiki; Mahabharata to Vyasa.** The epics are described as literary sources for Later Vedic society (family life, kingship, values); no claim about historicity either way.
6. **Social units, smallest to largest:** kula (family), grama (village), vis (group of villages), jana (tribe). Some books describe vis as a clan or district; the chapter uses "group of villages".
7. **Rajan:** protector of the tribe and leader in war; not absolute; supported by voluntary offerings called **bali** (not a fixed tax).
8. **Officials:** purohita (priest and adviser), senani (army commander), gramani (village head).
9. **Assemblies:** Sabha (smaller body of elders and nobles; advised the king; heard some disputes), Samiti (larger assembly of the people; linked to choosing and backing the king), Vidatha (regarded as the oldest; tribal, religious and military matters). Scholars differ on the exact functions of each; the chapter hedges with "linked to", "regarded as".
10. **Women:** relatively respected in the Early period (education, participation in rituals and assemblies, some choice in marriage); women composers traditionally named **Ghosha, Apala, Lopamudra**; position declined in the Later period (largely excluded from assemblies, more restrictions). The link between the economic change and the decline is presented only as "some historians" and an interpretation (`m_economy_cause`, `s3_change_reasons`, `l_women_economy`).
11. **Economy:** Early mainly pastoral, cattle as wealth, some agriculture; Later settled agriculture, **iron from about 1000 BCE in some areas**, crafts, trade, beginnings of towns. The table row on Early tools ("mostly stone, wood and copper or bronze") is a simplification.
12. **Four varnas** (Brahmanas, Kshatriyas, Vaishyas, Shudras) and the work usually linked with each; flexible and occupation-based in the Early period, rigid and birth-based in the Later period; described neutrally as a hierarchy that later caused inequality. One slide states that today the Constitution of India guarantees equality to all citizens.
13. **Four ashramas:** Brahmacharya, Grihastha, Vanaprastha, Sannyasa, described as ideal stages (not what every person did). No ages are given.
14. **Gurukul:** students lived with the teacher; oral learning (listening, reciting, memorising); subjects: the Vedas and ritual, language and grammar, skills linked to a student's work (for example warfare for future warriors).
15. The deck comparison table says "Kings gained more power" in the Later period (larger kingdoms and grand ceremonies are not named).

## Unsure / gaps
- The syllabus entry spells the assembly "Vidhatha"; I used the more common "Vidatha". The fill-blank items do not test the spelling of Vidatha.
- The role of the Samiti in "choosing" the king is a common textbook claim that scholars treat cautiously; the chapter says "linked to choosing and backing the king".
- Women in a gurukul: the imagined diary uses a boy student; the chapter does not say whether girls attended gurukuls in the Later period.
- No past-paper or specimen item was consulted; the built-in originality scan shows no duplicate stem.
