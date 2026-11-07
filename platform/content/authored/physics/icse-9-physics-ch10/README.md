# ICSE Class 9 Physics, Chapter 10 — Sound and Wave Motion

`icse-9-physics-ch10` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 16 slides), notes (5 sections), 30 flashcards, 79 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch10_short` (20 marks, 30 min) and `t_icse9phy_ch10_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs` (diagrams, with self-checks), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the shared authoring library is `../icse-9-physics-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch10/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX topics of the chapter: wave motion and the comparison of transverse and longitudinal waves; sound needs a medium (bell-jar experiment), speed in solids, liquids and gases and the factors that affect it (temperature, humidity); frequency, wavelength, time period and v = f λ; the speed of sound against the speed of light (thunder and lightning); infrasonic, audible and ultrasonic frequencies with applications, ultrasonic against supersonic, infrasonic against subsonic.
- This chapter has no removed topics.
- **Overlap kept out:** echoes, SONAR, resonance, natural and forced vibrations, loudness, pitch, quality, decibels and the CRO waveform belong to ICSE 10 Physics ch07 and are not asked; ultrasound applications are named only, with no echo-timing numericals.
- **Values:** the speed of sound in air is **340 m s⁻¹** unless a stem says otherwise; water 1500 m s⁻¹ and iron 5100 m s⁻¹ are stated in every stem that uses them; the speed of light is 3 × 10⁸ m s⁻¹.
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): short stems, numericals with formula, substitution and unit, graph reading, and assertion-reason items in the specimen option order.
- **Calculation chapter:** 13 numerical items plus calculation short answers and structured parts.
- **Originality:** situations and numbers differ from ICSE 10 Physics ch07 and ch08 and CBSE 10 Science; exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (16 slides): Waves and sound; What is a wave?; Transverse waves; Longitudinal waves; Transverse against longitudinal; Quick check: kinds of wave; Sound needs a medium; Quick check: the bell jar; Speed of sound in solids, liquids and gases; What changes the speed of sound in air?; Worked example 1: two sounds from one tap; Worked example 2: the same time in two media; Quick check: ordering the speeds; Quick check: temperature; Summary; Exam tips. Part 2 (16 slides): Frequency, wavelength and speed; Amplitude, wavelength, frequency and period; The wave equation; Worked example 1: a wave on a slinky; Quick check: finding the speed; Worked example 2: one note, two media; Sound and light; Worked example 3: how far was the lightning?; Quick check: thunder; Infrasonic, audible and ultrasonic; Uses of ultrasound; Ultrasonic is not supersonic; Quick check: classifying a frequency; Quick check: choosing the word; Summary; Exam tips.
- **Visuals (32 of 32 slides):** flow 2, table 23, svg 7.
- **Diagrams (9 distinct SVGs):** a transverse wave (named, and lettered A to F for a question), a longitudinal wave as rows of particles (named C and R, and lettered P to S), a displacement-distance graph of a rope wave, the bell-jar apparatus, lightning and thunder, a logarithmic frequency scale (infrasonic, audible, ultrasonic) and a bar chart of the speed of sound in air, water and iron. All geometry is computed (the crests and the compressions are placed from the wave equation and then re-located from the data) and self-checked (11 checks); each SVG was rendered to PNG and checked by eye.
- **Narration:** 14–40 words per slide (mean 32); no symbols, formulae or unit abbreviations.

## Question bank (79 items, 161 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 32 (8 are deck-check items) | 32 |
| assertion-reason | 4 | 4 |
| short-1 (terms) | 2 | 2 |
| true-false | 4 | 4 |
| fill-blank | 3 (one with five blanks) | 7 |
| numerical | 13 | 13 |
| match-5 | 1 | 5 |
| short-2 | 8 | 16 |
| short-3 | 6 | 18 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 to 6 parts with part marks in the stem: kinds of wave on a slinky, the bell-jar experiment (with figure), a displacement-distance graph (with figure), a storm with two lightning strokes (with figure), sound through an iron rail and the air, and classifying sound sources.
- **Difficulty:** d1 27 · d2 44 · d3 7 · d4 1 (the iron-rail structured question).
- **Competency:** recall 16 · understanding 23 · application 33 · analysis 7. Application or higher is **51% of items**, inside the 45–65% lint band. No tag was changed.
- **Assertion-reason keys:** c a b d (all four options used).

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; all wavelengths, frequencies, periods, speeds, times and distances are computed and asserted in `calc.mjs`, and the build's scripted re-solve checks all pass.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items were chosen so that no item states the answer to another in the same test (the thunder, iron-rail and wave-kind structured questions are kept out of tests whose Section A asks the matching objective items).

## For a reviewer
- **Speed of sound:** 340 m s⁻¹ in air at room temperature (books use 330 to 344); water 1500 m s⁻¹ and iron 5100 m s⁻¹ (books give 5000 to 5960 for iron and steel), always stated in the stem.
- **Temperature rule:** speed in air increases by about 0.6 m s⁻¹ per °C from 332 m s⁻¹ at 0 °C. It is an approximate rule, stated in the stem of the one numerical that uses it and in the notes, with the word "approximate"; the syllabus asks only for the qualitative effect.
- **Humidity and pressure:** moist air carries sound faster (less dense); at constant temperature the speed does not depend on pressure (used only in the notes).
- **Light speed:** 3 × 10⁸ m s⁻¹; light travel time is quoted in microseconds in two items (17 µs over 5.1 km; 6.8 µs over 2.04 km).
- **Audible range:** 20 Hz to 20 000 Hz; infrasonic below 20 Hz, ultrasonic above 20 000 Hz. The frequencies in items (14 Hz, 12 Hz, 25 000 Hz, 40 000 Hz, 60 000 Hz) lie clearly away from the limits.
- **Wave representation:** the longitudinal wave is drawn as rows of particles with density bunching (not a graph). Crest to trough along the axis is taken as half a wavelength.
- **Not asked:** echoes, SONAR, resonance, loudness and pitch (ICSE 10), wave speed on a string from tension, Doppler effect.
