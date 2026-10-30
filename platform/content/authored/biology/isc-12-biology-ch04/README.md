# ISC Class 12 Biology, Chapter 4 — Reproductive Health

`isc-12-biology-ch04` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (16 + 14 slides), notes (5 sections), 32 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch04_short` (20 marks, 50 min) and `t_isc12bio_ch04_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (population doubling and growth, fertile window for any cycle length, embryo-transfer route by blastomere count, pill schedule), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch04/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics (t01–t05): reproductive health (WHO), family planning and RCH, population explosion and the government’s role; natural, barrier, IUD, hormonal (pills, Saheli, injections, **implants**), emergency and surgical contraception with **modes of action**; MTP and its conditions, **amniocentesis** and its ban for sex determination; infertility and assisted reproductive technologies; **eight STDs with their causes**, symptoms, complications and prevention. The syllabus removes the details of ART (definition and application only), so ART is taught as definitions and uses.
- Content is neutral, factual and age-appropriate: MTP is described with its legal conditions and is stated not to be a contraceptive; week limits of the amended MTP Act are not used, as in CBSE 12 Biology ch03; infertility is stated to lie with either partner.

## Shape
- **Part 1 (t01–t02), 16 slides:** reproductive health; programmes; population explosion; worked example (doubling at 2 percent ≈ 35 years; 100 → about 800 in 105 years, computed); government measures; natural and barrier methods; fertile period; worked example (30-day cycle: ovulation day 16, fertile days 12–19, computed); IUDs; hormonal methods; surgical methods; summary; exam tips.
- **Part 2 (t03–t05), 14 slides:** MTP; amniocentesis; infertility; ART; worked example (ZIFT for 6 cells, IUT for 16, GIFT, IUI or ICSI, computed route); STDs and their causes; symptoms, complications, prevention; worked example (three patients); summary; exam tips.
- **Visuals (22 of 30 slides; no gap longer than two slides):** table 15, svg 5, flow 2.
- **Diagrams (5 SVGs, 10 uses):** copper IUD in the uterus, vasectomy and tubectomy, amniocentesis, population doubling curve (computed), 28-day fertile-period calendar (computed) — copied from CBSE 12 Biology ch03 (same author). Every SVG was rasterised and checked by eye.
- **Narration:** 7–55 words (mean 30).

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys balanced a 7, b 7, c 6, d 6) |
| assertion-reason | 5 | 1 (ISC options; keys a d c b a) |
| short, 1 mark | 3 | give-a-reason |
| fill-blank | 2 | 1 |
| match | 1 | 2 |
| numerical | 4 | 1 (35 years; 155 thousand; day 14; at least 9 blastomeres) |
| short | 7 + 8 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or |

- **Difficulty:** d1 15 · d2 25 · d3 20 · d4 2.
- **Competency:** recall 14 · understanding 18 · application 28 · analysis 2. Application or higher is **48% of items (49% of marks)**.
- **Topic tags:** t01 10 · t02 23 · t03 7 · t04 10 · t05 13.
- **Re-solves:** 7 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A WHO definition, copper IUD, MTP safety, ICSI (MCQ), pills (A-R) · B programme actions; (IUD types or ZIFT vs IUT) · C population causes and measures; (choosing a method for three couples or STD prevention messages) · D contraception in parts.
- **Long:** A 1951, falling death rates, vasectomy, Saheli, spacing, lactational amenorrhea, amniocentesis clinic, ZIFT, GIFT, syphilis (MCQ), asymptomatic STDs, MTP (A-R) · B ideal contraceptive; MTP; (STD organisms or lactational amenorrhea) · C pills; amniocentesis; IVF for blocked tubes; (barrier methods or curability) · D STDs in parts; (infertility and ART or population).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 14 maths strings parse; 10 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 7/7 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Bank size, competency and difficulty.** The first build had 58 questions at 40 % application or higher and no difficulty-4 item. Five application items were added (implants, cervical mucus, minimum blastomeres for IUT, hepatitis B from mother to child, two more short answers on lactational amenorrhea and curability), four were re-pitched as scenarios, and two analysis items were raised to difficulty 4, giving 62 at 48 %.
2. **Word limits.** Three 2-mark model answers below 30 words were expanded.
3. **Verify flag.** The fertile-period numerical had its key after the word "day" outside the maths, so `verify` could not see an "=" step computing it (one minor flag); the solution now ends in "18 − 4 = 14" and the chapter has 0 flags.

## Facts a reviewer should double-check
- Population figures (350 million at independence, about 1 billion in 2000, 1.2 billion in 2011) follow the textbook.
- Week limits for MTP are deliberately not stated; the chapter says "within the time limits and conditions of the law".
