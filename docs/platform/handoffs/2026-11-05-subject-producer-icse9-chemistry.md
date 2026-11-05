# subject-producer — ICSE Class 9 Chemistry — 2026-11-05

Status: done. ICSE 9 Chemistry ch01–ch13 are authored, reviewed, gated and committed, one commit per chapter.
Branch: `platform/subject-producer/icse-9-chemistry`, in worktree `C:/Users/Prabhu/soyl-wt/content-icse9-chemistry`, created from pushed `platform/main` 5a91aaf. Not pushed, not merged and not rebased.

## Who wrote what (D-050)
Every chapter was written by a **Sonnet sub-agent** (`claude-sonnet-5-5`). Every item's provenance author reads `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`.

The subject-producer (Opus) wrote no chapter content. It did the following:
- built the lib;
- wrote the writer brief;
- reviewed chemistry facts, syllabus scope, removed topics, equations, diagrams (every SVG rendered and checked by eye) and competency tags;
- ran the gates and made the commits.

| Chapters | Writer | Notes |
|---|---|---|
| ch01–ch03 | Sonnet writer 1 | |
| ch04–ch06 | Sonnet writer 2 | |
| ch07–ch09 | Sonnet writer 3 | A session limit stopped it at about 02:30. It was resumed at 07:55 and finished its own work. |
| ch10–ch11 | Sonnet writer 4 | Stopped and resumed the same way as writer 3. |
| ch12–ch13 | Sonnet writer 5 | |

At most two writers ran at a time. The Opus fallback was **not needed**: no chapter needed heavy fixing, and none failed a gate for content reasons.

**Competency tags (team rule of 05 Nov, 00:45):** tags must describe each item honestly, and a missed band is fixed by changing items, not labels. The rule was added to the writer brief.
- ch02 (70%), ch08 (67%) and ch11 (69%) first built above the 45–65% application-or-higher band, and ch13 sat on its lower edge (45%). Their writers added genuine items: recall and understanding items for ch02, ch08 and ch11, and application items for ch13. They did not retag.
- ch05's writer retagged 4 items before the rule arrived (66% to 60%) and did not record which ones. The producer therefore reviewed every recall and understanding item in ch05 (29 items). All are plain recall, definitions, distinctions, "give a reason" or identify-the-property items, honestly tagged. No change was needed.

## Lib and blueprints
- **Authoring lib:** `icse-9-chemistry-ch01/src/lib.mjs`, committed with ch01 and shared by every chapter. It was derived from the ICSE 9 Biology lib (same author; itself from the ICSE 10 Biology and ISC 12 Chemistry builders) by `scratchpad/icse9chem/mklib.cjs`. The changes:
  - ids `q_icse9chem_chNN_###` and `t_icse9chem_chNN_short|long`;
  - lint family `chemistry`;
  - narration unit abbreviations for chemistry (mol, L, K, atm, kPa, kJ, mm Hg and others);
  - Section B instructions that ask for balanced equations and working.
- **Checks added to every build:**
  - the pipeline's deterministic verify checks;
  - the DB-6 answer-leak scan, as `api/test/content.test.ts` runs it (the CBSE 11 Chemistry approach);
  - an atom-balance check of `\ce{}` reactions that contain `=` or `#` bonds. The pipeline's checker skips those, so the lib removes the bond characters and re-checks with the pipeline's own `checkBalance`. MCQ options and skeletal-equation contexts are exempt.
- **Assertion-reason option order:** the ICSE 2027 Chemistry specimen (522) order, which matches Biology 523: (a) A true, R false; (b) A false, R true; (c) both true and R explains; (d) both true and R does not explain. The producer checked this against the 522 PDF text.
  - **Note for the Lead:** ICSE 10 Chemistry on main uses the CBSE order, (a) both true and R explains … (d) A false, R true. That differs from specimen 522.
- **Chemistry conventions in the brief:**
  - ionic charges are written with a caret (`\ce{Cu^2+}`);
  - salts are used instead of bracketed complex ions (e.g. `Na2ZnO2`);
  - radical equations with dots and bonded formulae are balanced by hand and asserted in `calc.mjs`;
  - atomic masses are H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40, Fe 56, Cu 63.5, Zn 65;
  - STP is 273 K and 760 mm Hg.
- **Blueprints:** `platform/catalog/cisce/blueprints/9/chapter-test-short.yaml` and `-long.yaml`. No catalog change was needed.
  - **`icse-9-default-chapter-test-short`** (20 marks, 30 min):
    - A: 4 MCQs, 1 assertion-reason item, one 2-mark and one 3-mark answer.
    - B: two 10-mark structured questions; candidates attempt 1.
  - **`icse-9-default-chapter-test-long`** (40 marks, 60 min):
    - A: 7 MCQs, 1 assertion-reason item, three 2-mark and two 3-mark answers.
    - B: three 10-mark structured questions; candidates attempt 2.
- **Pattern source:** the ICSE 2027 Chemistry specimen paper (522), used for style only. Class 9 has no board paper.

## Chapters
Each folder `platform/content/authored/chemistry/icse-9-chemistry-chNN/` holds:
- `release.json`;
- `tests.json` — two tests that share no questions, and no deck-check item appears in a test;
- `README.md` — scope, shape, bank statistics, the verifier pass and a "For a reviewer" list;
- `src/` — `calc`, `svgs`, `decks`, `study`, `questions` and `build`.

Builds are deterministic: before the gate, every chapter was rebuilt and its output was byte-identical. All items are `status: "draft"`, provenance `human`.

| Chapter | Commit | Decks (slides) | Questions | Structured (10 marks) | Numericals | Application or higher | d4 | Flashcards | Distinct SVGs |
|---|---|---|---|---|---|---|---|---|---|
| ch01 Symbols, Valency, Radicals and Formulae | 8dd69c08 | 2 (18 + 15) | 69 | 6 | 0 | 62% | 1 | 30 | 4 |
| ch02 Chemical Equations and Relative Masses | bf876c77 | 2 (15 + 17) | 78 | 6 | 9 | 64% | 1 | 30 | 4 |
| ch03 Chemical Changes and Reactions | 3632a934 | 2 (15 + 17) | 80 | 6 | 2 | 56% | 1 | 30 | 5 |
| ch04 Water as a Universal Solvent: Solutions and Solubility | 904b611d | 2 (16 + 15) | 69 | 7 | 8 | 64% | 2 | 30 | 5 |
| ch05 Water of Crystallisation, Efflorescence, Deliquescence and Drying Agents | 7d9a30bb | 2 (16 + 15) | 70 | 7 | 9 | 60% | 2 | 30 | 4 |
| ch06 Hard and Soft Water; Making Water Potable | acadd668 | 2 (16 + 15) | 75 | 7 | 7 | 55% | 2 | 30 | 3 |
| ch07 Atomic Structure | 81feb5aa | 2 (15 + 16) | 82 | 6 | 9 | 61% | 1 | 30 | 6 |
| ch08 Chemical Bonding | 1e749f7e | 2 (15 + 17) | 90 | 6 | 6 | 64% | 2 | 30 | 10 |
| ch09 The Periodic Table | 2d584013 | 2 (17 + 17) | 88 | 6 | 8 | 50% | 1 | 30 | 5 |
| ch10 Hydrogen: Position, Sources and Preparation | 631d9d12 | 2 (17 + 16) | 76 | 6 | 4 | 49% | 1 | 30 | 5 |
| ch11 Oxidation and Reduction | 8b12101a | 2 (15 + 14) | 74 | 6 | 5 | 64% | 1 | 30 | 4 |
| ch12 Study of Gas Laws | 61434a98 | 2 (18 + 18) | 74 | 6 | 17 | 51% | 1 | 30 | 4 |
| ch13 Atmospheric and Environmental Chemistry | 198ff367 | 2 (18 + 18) | 91 | 6 | 13 | 49% | 1 | 30 | 6 |

Totals: 13 chapters, 1,016 questions (81 of them 10-mark structured questions), 26 decks, 26 chapter tests (20 and 40 marks each), 390 flashcards.

- **Removed topics are respected:**
  - no mathematical expressions of Bohr's model (ch07);
  - electrolysis is not taught as the laboratory method for hydrogen (ch10; electrolysis of acidified water appears in ch03 only, as an example of decomposition);
  - ozone-depleting chemicals are named only, with no reactions (ch13).
- **Equations:** every `\ce{}` reaction is atom-balanced by the pipeline lint or by the lib's bonded-equation check. Radical equations (ch08) and half-changes (ch11) are also asserted in `calc.mjs`.
- **Computed values:** every number comes from the chapter's `calc.mjs`. Examples:
  - relative molecular masses and percentage composition (MgSO₄ 20% Mg; FeSO₄·7H₂O 45.3% water);
  - solubility-curve readings;
  - percentages of water of crystallisation;
  - proton, neutron and electron counts, and the 35.5 average for chlorine;
  - Dobereiner means;
  - Boyle, Charles and combined-gas answers reduced to STP;
  - the ch13 emission percentages.
- **Originality:**
  - `originality --authored` reports 0 errors (570 units).
  - The writers ran an exact-stem check against all authored banks.
  - Collisions found and reworded: one ch07 stem against ICSE 10 Physics, and one ch08 item against ICSE 10 Chemistry (lone pairs in Cl₂).
  - CBSE 9 Science is not on this branch, so it was not compared.
- **Diagrams:** the producer rendered every chapter's SVGs (`scratchpad/isc-bio/icse/relraster.mjs`) and checked them by eye. These include:
  - apparatus: hydrogen from zinc, steam over metal, heating a hydrate, electrolysis of water, the gas-law cylinder;
  - orbit structures for all 12 prescribed compounds;
  - Rutherford scattering and Bohr shells;
  - solubility curves, the periodic-table outline, the water-treatment flow, and the acid rain, greenhouse and ozone figures.

  No defects were left. The writers' render fixes are in each README's "Verifier pass".

## How to verify
Run from `platform/` in the worktree, under `_tools/heavy.sh`, with `scratchpad/icse9chem/gates.sh`. There was one gate run, on 2026-11-05 from 08:43 to 08:52 IST, with ch01–ch13 in place; it exited 0. Each chapter was committed from that run, and none of its files changed after the run started (checked by file times and md5).

```
npm test -w @soyl/content-templates            # Tests 3991 passed (3991)
npm run content -- catalog                     # catalog valid: 0 error(s), 0 warning(s)
npm run content -- lint --exemplars            # ok icse-9-chemistry-ch01..ch13: 0 error(s), 0 warning(s)
npm run content -- verify --board cisce --class 9 --subject chemistry --authored
                                               # 13 unit(s), 1016 questions, 0 blocking flag(s); every unit 0 blocking + 0 minor
npm run content -- originality --authored      # 570 unit(s), 0 error(s)
npx vitest run --root db test/db6-split.test.ts   # 8 passed
npx vitest run --root api test/content.test.ts    # 13 passed
```

## Facts for a reviewer
Every chapter README has a full "For a reviewer" list. The main points:
- **ch01:**
  - Valency is "8 minus outer electrons" for non-metals, 4 for carbon and silicon, 0 for a full shell.
  - Variable valency is shown for Fe(II)/(III) and Cu(II) only.
  - Hydroxide is listed with the negative (acid) radicals, as ICSE tables do.
  - "Radicals in the atmosphere" is taught as free radicals with an unpaired electron, with no mechanisms.
- **ch02:**
  - The standard is one-twelfth of a carbon-12 atom, with hydrogen as the earlier standard.
  - Percentages are rounded to 1 decimal place.
  - Ammonium dichromate: orange crystals give green Cr₂O₃, N₂ and steam. No mass is asked, because Cr is not in the mass list.
- **ch03:** observations to check against textbook wording:
  - FeS is black and not magnetic.
  - Magnesium burns with a dazzling white flame.
  - CuCO₃ turns green to black.
  - ZnO is yellow when hot and white when cold.
  - Pb(NO₃)₂ crackles, gives brown fumes and a yellow residue.
  - AgCl goes grey in light.
  - Precipitates: BaSO₄ white, AgCl white and curdy, PbI₂ yellow.
  - Molten PbBr₂ appears as an example of electrolytic decomposition.
- **ch04:**
  - Curve data are illustrative: KNO₃ 13→246, NaCl 36→39 and CaSO₄ 0.2–0.26→0.16 g per 100 g water. The CaSO₄ shape varies by book.
  - Particle-size bands are about 1 nm and 1000 nm.
- **ch05:**
  - FeSO₄·7H₂O goes pale green to whitish (books differ).
  - Efflorescence of washing soda is written to the monohydrate.
  - Anhydrous CaCl₂ is called deliquescent (some books say hygroscopic).
  - Concentrated H₂SO₄ is unsuitable for drying NH₃.
- **ch06:**
  - Boiling gives MgCO₃ (some books give Mg(OH)₂).
  - Alum is taught without an equation.
  - Fluoride limit is about 1–1.5 mg per litre; please confirm.
  - Alum and chlorine doses are illustrative.
- **ch07:**
  - "About one in twenty thousand" alpha particles rebound (books vary).
  - The electron is about 1/1840 of a proton's mass.
  - The ³⁵Cl : ³⁷Cl ratio is about 3 : 1.
- **ch08:**
  - Orbit structures are schematic, with no real bond angles.
  - Radical equations use dots: `H2 -> 2H.`, `Cl2 ->[light] 2Cl.`.
  - A few extra ionic compounds (Na₂O, MgO, KCl, CaCl₂, LiF) appear in short questions only.
- **ch09:**
  - Triad data are given; Te is 127.6 in some books.
  - Mendeleev's out-of-order pairs: Te/I, Ar/K and Co/Ni.
  - Period lengths 2, 8, 8, 18, 18, 32, 32.
  - The f-block rows are labelled 58–71 and 90–103 (lanthanum and actinium in group 3).
  - Melting and boiling points are approximate.
- **ch10:**
  - The alkali products are written as salts (Na₂ZnO₂, NaAlO₂, Na₂PbO₂) from hot, concentrated alkali.
  - 3Fe + 4H₂O ⇌ Fe₃O₄ + 4H₂.
  - Water gas at about 1000 °C; Bosch at about 450 °C with Fe₂O₃ and Cr₂O₃.
  - CO is removed by ammoniacal cuprous chloride, with no equation.
  - Wording for the impurities and their removal varies by book.
  - The suck-back question in `steam-long`: confirm it suits Class IX.
- **ch11:**
  - Oxygen is called "reduced" only in the electronic view, or when it gains hydrogen (2H₂S + O₂).
  - `ag-mcq2` treats dilute H₂SO₄ (its H⁺ ions) as the oxidising agent with zinc.
- **ch12:**
  - STP is 273 K and 760 mm Hg, with K = °C + 273 (273.15 appears only as an aside).
  - Charles's law is given in kelvin form, with the Celsius form in the notes.
  - Confirm that the "average molecular speed depends on temperature" note suits Class IX.
- **ch13 (time-sensitive, as of 2026):**
  - CO₂ above 420 ppm, against about 280 pre-industrial.
  - Warming of about 1.2 °C or more.
  - Bharat Stage VI fuel.
  - The Montreal Protocol (1987) and ozone recovery around mid-century.
  - The Minamata Convention, in force since 2017.
  - India's single-use plastic ban, from 2022.
  - Dissolved-oxygen values are approximate.
  - Both nitric-acid equations are given.

## Known gaps / follow-ups
- Narration audio (TTS) has not been generated, as for the other hand-authored subjects.
- Practical work (internal assessment: gas tests, flame tests, action of heat) is not modelled. Those observations appear in theory items.
- The ICSE 9 Chemistry unit tests (`blueprints/9/unit-test.yaml`) are not assembled here.
- The Lead may want to align ICSE 10 Chemistry's assertion-reason option order with specimen 522 (see Lib and blueprints).

## Decisions made
- D-050 was followed: Sonnet writers wrote the chapters, and the producer reviewed, gated and committed them. No Opus fallback was needed.
- The ICSE 9 Chemistry lib lives in ch01 and is shared by every chapter. Only content paths changed, so no ADR is needed.

## Needs from owner
None.
