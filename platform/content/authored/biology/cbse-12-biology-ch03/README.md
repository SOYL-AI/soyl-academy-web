# CBSE Class 12 Biology, Chapter 3 — Reproductive Health

`cbse-12-biology-ch03` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 3 decks (15 + 20 + 15 slides), notes (6 sections), 32 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12bio_ch03_short` (20 marks, 40 min) and `t_cbse12bio_ch03_long` (40 marks, 90 min), laid out as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (growth, fertile-period, pill and ZIFT/IUT rules), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../cbse-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/cbse-12-biology-ch03/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three syllabus topics (t01–t03) are covered; the chapter has no removed topics in the 2026-27 syllabus.
- Class 12 depth: WHO meaning of reproductive health, family planning (1951) and RCH programmes, sex education, indicators; STIs (list, curability, blood-borne routes of hepatitis-B and HIV, complications, prevention); population growth and its causes; ideal contraceptive; natural, barrier, IUD (three types with examples and actions), oral pills and Saheli, injections and implants, emergency contraception, vasectomy and tubectomy, side effects; MTP; amniocentesis and the ban on sex determination; infertility; IVF–ET with ZIFT and IUT, GIFT, ICSI, AI/IUI; limits of ART; adoption.
- **Treatment:** neutral, factual, public-health language; no image beyond schematic medical diagrams (IUD in the uterus, cut-and-tied ducts, amniocentesis). Social points are explicit: STIs do not spread by casual contact and infected people must not be discriminated against; infertility can lie with either partner; sex selection is a crime; MTP is not a contraceptive.
- **MTP and the law:** the chapter states that India legalised MTP in 1971 with strict conditions, that it is permitted on specific grounds by registered medical practitioners within the time limits of the law, and that it is safest in the first trimester (up to 12 weeks). It deliberately gives **no week limits for later terminations**, because the textbook wording and the current amended Act differ; no item depends on them (reviewer: see below).

## Shape
- **Part 1 (t01), 15 slides:** meaning of reproductive health; India's programmes; myths and facts; worked example (infant mortality 60 → 42 per 1000 = 30 percent fall); STIs and curability; routes of spread; symptoms and complications; worked example (which situations can transmit hepatitis-B or HIV); prevention; summary; exam tips.
- **Part 2 (t02), 20 slides:** why the population grew; growth curve; worked example (doubling time 35 years at 2 percent, 70 at 1 percent, from ln 2 / ln(1 + r)); ideal contraceptive; natural methods; fertile-period calendar; worked example (cycle from 1 June → fertile 10–17 June, 8 days); barriers; IUD; IUD types; pills, Saheli, injections, implants, emergency methods; sterilisation; side effects and choice; MTP; summary; exam tips.
- **Part 3 (t03), 15 slides:** amniocentesis; use, misuse and the ban; infertility; ART overview; IVF–ET; worked example (2, 4, 8 blastomeres → ZIFT; 16, 32 → IUT, computed by the rule); GIFT, ICSI, AI/IUI; worked example (matching four couples to techniques); limits of ART and adoption; summary; exam tips.
- **Visuals (38 of 50 slides; no gap longer than two slides):** table 28, flow 5, svg 5.
- **Diagrams (5 hand-written SVGs, 10 uses across decks and notes):** copper IUD in the uterus, vasectomy and tubectomy, amniocentesis, population curve at 2 percent (points computed), 28-day calendar with menstrual days and the fertile period (computed). Every SVG was rasterised (headless Chromium, theme tokens substituted) and checked by eye.
- **Narration:** 8–66 words (mean 47), no symbols, formulae or abbreviations a TTS voice would spell out.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 19 | 1 (keys a 5, b 5, c 5, d 4) |
| assertion-reason | 7 | 1 (keys d a b a c a b) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 3 | 2 |
| numerical | 6 | 1 (30% IMR fall; doubling in 20 years at 3.5%; fertile period from 14 August; 1.39 billion after 10 years at 1.5%; last pill on 23 March; 8 blastomeres as the ZIFT limit) |
| short | 6 + 7 | 2 / 3 |
| long | 6 | 5 |
| case-based | 3 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** every passage has `passage_origin: "soyl-original"`; `word_limit` on all 19 short/long items.
- **Difficulty:** d1 8 · d2 29 · d3 20 · d4 6.
- **Competency:** recall 14 · understanding 20 · application 21 · analysis 5 · evaluation 3. Application or higher is **46% of items (45% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 17 · t02 27 · t03 19.
- **Cases:** a district hospital's STI register (curable vs not, 25 percent not completely curable, delay in seeking care or a youth campaign); a family planning clinic with three women (sterilisation, lactational amenorrhea, condoms or the six-month limit); four IVF embryos (ZIFT vs IUT, why the site differs or GIFT vs ZIFT).
- **Deck checks:** reproductive-health definition, not completely curable STI, curable-STI A-R (Part 1); ideal contraceptive, copper ions, MTP A-R (Part 2); amniocentesis, GIFT, ICSI A-R (Part 3) — all objective.
- **Re-solves:** 9 scripted checks recompute the numerical keys and the ZIFT/IUT routing from `calc.mjs`.

## Chapter tests (default blueprints)
- **Short:** A HIV route, emergency contraception, 6-cell embryo (MCQ), sterilisation (A-R) · B copper IUD for spacing, IVF–ET (2 marks), MTP (3 marks) · C classification of contraceptives or ART techniques · D IVF-embryos case.
- **Long:** A early symptoms, ectopic pregnancy, pills, after vasectomy, lactational amenorrhea, condoms, IUI, blocked tubes (MCQ), stigma, amniocentesis ban (A-R) · B sex education, pill schedule, (population growth or adoption), counselling three couples, (natural methods or matching ART) · C STIs + (sterilisation statement evaluation or infertility counselling) · D STI-register case, clinic case.

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cbse --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-biology.md`.
- Author validator (in the build): 21 maths strings (KaTeX strict + mhchem) parse; 10 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 9/9 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-29)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Competency honesty.** The first build was 44% application or higher; two application items were added (a donor-ovum case for GIFT, a pill-pack date), giving 46% (45% of marks).
2. **A-R balance.** Two A-R items were rewritten so that one statement tests a real misconception (hepatitis-B "curable like gonorrhoea"; ovulation "always on day 14"), giving keys d a b a c a b instead of five (a) keys.
3. **Word limits.** The IVF–ET model answer was shortened to the 2-mark limit; the one-word case answer was expanded to a full phrase.
4. **Diagrams after rasterising.** IUD labels moved off the uterus; the amniocentesis drawing was shifted right so its labels sit outside the abdominal wall and the fluid leader reaches the fluid; the population axis title moved inside the canvas.

## Facts a reviewer should double-check
- MTP: the chapter avoids stating week limits beyond first-trimester safety (see Scope). If the reviewer wants the textbook's limits added, add them as a note rather than in an item key.
- Legal minimum age of marriage stated as 18 (females) and 21 (males), as in the syllabus textbook.
- Population figures (about 350 million in 1947, 1 billion in 2000, about 1.2 billion in 2011).
- Saheli: once a week, non-steroidal, developed at CDRI, Lucknow.
