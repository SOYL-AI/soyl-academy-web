# ICSE Class 9 Chemistry, Chapter 10 — Hydrogen: Position, Sources and Preparation

`icse-9-chemistry-ch10` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 16 slides), notes (5 sections), 30 flashcards, 76 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch10_short` (20 marks, 30 min) and `t_icse9chem_ch10_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (every equation atom-balanced, salts charge-checked, the activity series, every count taken from an equation), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and the shared authoring library `lib.mjs` of chapter 1 (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch10/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: the position of hydrogen (resemblance with the alkali metals and the halogens); hydrogen from water and steam (Na, K, Ca with cold water; Mg with hot water; Al, Zn and red-hot Fe with steam, reversible with Fe₃O₄; carbon with steam giving water gas) and the link to the activity series; hydrogen from dilute HCl and H₂SO₄ (Mg, Al, Zn, Fe) and from NaOH or KOH (Al, Zn, Pb, written as aluminate, zincate and plumbite salts), with reasons for not using dilute nitric acid or very reactive or unreactive metals; the laboratory preparation, collection by downward displacement of water, impurities, drying and precautions; and the Bosch process with the removal of CO₂ and CO.
- **Removed topic:** preparation of hydrogen by electrolysis as the standard laboratory method. It is not taught or asked anywhere in this chapter.
- Properties and uses of hydrogen, and redox as a concept, are not part of this chapter (the next chapter, Oxidation and Reduction, uses redox ideas). Hydrogen burning with a pop is used only as the test for the gas.
- Class 9 has no board examination; the items follow the ICSE 2027 Chemistry specimen style (522): balanced equations, "state one observation", "give a reason", "name the gas", identification from observations, a labelled laboratory set-up, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (calcium in cold water, metals P to S identified from their behaviour, four powders timed in acid, strips of zinc, aluminium and lead in alkali, lettered set-ups for the hydrogen preparation and for steam over a heated metal, counts of molecules through the two stages of the Bosch process) differ from CBSE 10 Science ch03 (metals and non-metals), CBSE 11 Chemistry (redox) and ICSE 10 Chemistry ch07 and ch08 (electrolysis and metallurgy). Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (17 slides): The first element; Where does hydrogen sit?; Like the alkali metals; Like the halogens; Quick check: position; Hydrogen from water and steam; Steam over a heated metal; Equations: water and steam; Worked example 1: iron and steam; Quick check: steam and iron; Hydrogen from dilute acids; Worked example 2: aluminium and hydrochloric acid; Hydrogen from alkalis; Quick check: alkalis; Which metals and acids are not used?; Summary; Exam tips. Part 2 (16 slides): Making hydrogen in bulk and in the laboratory; Choosing the materials; The laboratory set-up; Why collect it over water?; Quick check: the set-up; Impurities and how they are removed; Quick check: purification; Precautions; Worked example 1: a laboratory preparation; The Bosch process: stage one; Stage two; Quick check: Bosch conditions; Worked example 2: counting hydrogen; Removing carbon dioxide and carbon monoxide; Summary; Exam tips.
- **Visuals (33 of 33 slides):** table 17, flow 6, chem 7, svg 3.
- **Diagrams (5 distinct SVGs):** the laboratory preparation of hydrogen (named, and lettered A to E for a structured question); steam passed over a heated metal (named, and lettered A to E); the first three periods of the periodic table with hydrogen highlighted. All drawn with the S helpers and palette colours, rendered to PNG and checked by eye.
- **Narration:** 14–53 words per slide (mean 39); no symbols, formulae or unit abbreviations.

## Question bank (76 items, 156 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 (6 are deck-check items) | 28 |
| assertion-reason | 4 | 4 |
| short-1 (equations, names, terms) | 10 | 10 |
| true-false | 4 | 4 |
| fill-blank | 4 | 6 |
| numerical | 4 | 4 |
| match-5 | 1 | 5 |
| short-2 | 10 | 20 |
| short-3 | 5 | 15 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in parts with part marks in the stem; two use a lettered diagram (the hydrogen preparation and steam over a heated metal), one is data-based (four metals identified from observations), one uses timed reactions with acid, one is on the alkali reactions and one traces a count of molecules through the Bosch process (difficulty 4).
- **Difficulty:** d1 26 · d2 39 · d3 10 · d4 1.
- **Competency:** recall 18 · understanding 21 · application 32 · analysis 5. Application or higher is **49% of items**, inside the 45–65% lint band. No tag was changed to reach the band.
- **Assertion-reason keys:** c a b d.
- **Numericals** (counts of atoms or molecules from a balanced equation, no mole concept): 15 iron atoms from 20 steam molecules; 9 hydrogen molecules from 18 HCl; 18 hydrogen molecules from 12 aluminium atoms; 90 hydrogen molecules through both stages of the Bosch process from 45 carbon atoms. Each is computed in `calc.mjs`.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2): the data question on four metals and the lettered hydrogen set-up.
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3): the alkali reactions, the Bosch process and the lettered steam set-up.

## Verifier pass
- Every question was re-solved from its stem; every equation is atom-checked in `calc.mjs`, the sodium, potassium, zinc, aluminium and lead salts are also charge-checked, and every count is computed there.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items were chosen so that no item names the answer of another in the same test: the short test has no multiple-choice item on the topics of its structured questions (water and steam, laboratory preparation), and the long test has no item on the topics of its structured questions (alkalis, Bosch, steam over a heated metal).

## For a reviewer
- **Alkali salts:** written as Na₂ZnO₂, NaAlO₂ and Na₂PbO₂ (and K₂ZnO₂, KAlO₂, K₂PbO₂), not bracketed complex ions. The aluminium equation is `2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂`. Conditions are given as "hot, concentrated" alkali, as many books say; please confirm for CISCE.
- **Water and steam:** potassium burns with a lilac flame; sodium floats, melts into a ball and darts about; calcium sinks with steady bubbles and the water turns milky; magnesium reacts slowly with hot water (and burns brightly in steam to give the oxide, `Mg + H₂O → MgO + H₂`); aluminium and zinc need heating in steam; zinc oxide is yellow when hot and white when cold; iron with steam is written `3Fe + 4H₂O ⇌ Fe₃O₄ + 4H₂`. Some books show only the oxide equations or omit the Mg-in-steam note; please confirm.
- **Water gas:** steam over red-hot coke at "about 1000 °C" is stated as an approximate value; books vary (about 1000 °C is a common figure).
- **Bosch process:** stage 2 uses Fe₂O₃ with Cr₂O₃ as the promoter at "about 450 °C"; some books give 400–500 °C. The CO₂ is removed by water under pressure or by KOH solution, and the last CO by ammoniacal cuprous chloride (stated without an equation, as books do). The 80 percent conversion in `bosch-long` is an imagined figure for a count.
- **Laboratory preparation:** acid may be dilute sulphuric or dilute hydrochloric; the impurity list (acid spray, traces of gases from impurities in the zinc such as hydrogen sulphide, moisture) and the removal (alkali wash, then anhydrous calcium chloride or concentrated sulphuric acid) vary between textbooks; the reasons for choosing zinc and the effect of a few drops of copper(II) sulphate solution are as most ICSE books state. Please confirm the wording expected for the impurities.
- **Dilute nitric acid:** explained as an oxidising agent that oxidises the hydrogen to water and gives oxides of nitrogen; the exceptional behaviour of very dilute cold nitric acid with magnesium is not mentioned (outside Class IX).
- **Lead with dilute sulphuric acid:** the insoluble lead sulphate coat is mentioned in the notes and the deck only; lead is not used in any acid equation.
- **Position of hydrogen:** placed at the top of group 1 with some resemblance to group 17; a note says it is a compromise. The notes mention the hydride ion in NaH and CaH₂ as the halogen-like behaviour.
- **Practical point:** lifting the delivery tube out of the water before the burner is removed (suck-back) is asked in `steam-long`; confirm it suits the Class IX scope.
