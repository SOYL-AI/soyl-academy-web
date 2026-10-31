# ISC Class 12 Commerce, Chapter 16 — Consumer Protection

`isc-12-commerce-ch16` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (13 + 14 slides), notes (5 sections), 28 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12commerce_ch16_short` (20 marks, 50 min) and `t_isc12commerce_ch16_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `lib.mjs` (the CBSE 12 Business Studies authoring library with assertion-reason options in the ISC wording), `questions.mjs`, `build.mjs` (decks, notes, flashcards, tests and the build checks). Rebuild from `platform/`: `npx tsx content/authored/economics-commerce/isc-12-commerce-ch16/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: the **need** for consumer protection and its **methods** (self-help, legislation, consumer associations and NGOs); **who is a consumer** under the Consumer Protection Act, 2019 (consideration, users with approval, online and direct selling covered, resale and commercial purpose excluded, the self-employment exception), the six **rights** and the matching **responsibilities**; the three-tier **Consumer Disputes Redressal Commissions** with their **pecuniary limits as notified in December 2021**, the value-paid basis, the appeal route, filing where the consumer lives, e-filing and mediation; **misleading advertisements**, the **Central Consumer Protection Authority** and its penalties, endorser liability and product liability; and the **1986 and 2019 Acts compared**.
- Style follows the ISC Commerce specimen (`sources/cisce.md` `isc-2026-specimen-857-commerce`; CISCE published no 2027 Commerce specimen): case-based MCQs, assertion-reason items with option (d) “Both Assertion and Reason are false”, analogies, true/false, identify-the-concept items and short cases; tests use the `isc-12-default` blueprints.
- **Originality:** every firm, brand, person and case is imagined and labelled (Raghav near Mandsaur, Ms Tirkey of Bokaro, a Purulia consumer association, Anita, Zoomvolt e-bikes, a loan app, a hill-town cable operator, Mehul, Yamini of Durg, Rekha, the Bhattacharya family, Mr Kohli, Ishita, Ms Lyngdoh, Ms Lalnunmawii, Priyanka of Bilaspur, TallMax health drink, a fat-burning tea, Pedalo toy cycles, a zero-interest home loan, the Barua family of Nagaon with Powerjyoti inverters, GlowPure cream of Katni); none of them, and no set-up, comes from the CBSE 12 Business Studies chapter on consumer protection. An exact-stem check against every authored bank and `originality --authored` report no duplicates.

## Shape
- **Decks:** Part 1 (13 slides): Consumer Protection; Why consumers need protection; Methods of consumer protection; Quick check: whose job?; Who is a consumer?; Worked example 1: consumer or not?; Rights of consumers; Worked example 2: which right?; Quick check: a right to learn; Responsibilities of consumers; Quick check: a voice on committees; Summary of Part 1; Exam tips. Part 2 (14 slides): Commissions, Advertisements and the Two Acts; Three-tier redressal machinery; Worked example 1: which commission?; Quick check: a leaky flat; Easier redress under the 2019 Act; Misleading advertisements; The Central Consumer Protection Authority; Quick check: who acts?; Worked example 2: a misleading advertisement; The 1986 and 2019 Acts compared; Limits then and now; Quick check: a new name; Summary of Part 2; Exam tips.
- **Visuals (21 of 27 slides):** flow 3, table 15, svg 3. Two drawn figures: the three-tier commissions with the Supreme Court and the appeal route (limits as notified in December 2021), and a bar chart of District and State upper limits under the 1986 Act and the 2019 Act as notified in 2021; the rest are tables and flows.
- **Narration:** 5–67 words per slide (mean 41).

## Question bank (67 items, 119 marks)
| Type | Count |
|---|---|
| mcq | 27 |
| assertion-reason | 7 |
| true-false | 5 |
| fill-blank | 3 |
| short (2 marks) | 8 |
| short (3 marks) | 8 |
| long (5 marks) | 5 |
| match | 2 |
| case-based | 2 |

- **MCQ keys:** a 7, b 7, c 7, d 6; **assertion-reason keys:** a c b a d a b.
- **Difficulty:** d1 8 · d2 30 · d3 28 · d4 1.
- **Competency:** recall 7 · understanding 22 · application 25 · analysis 12 · evaluation 1. Application or higher is **57% of items (61% of marks)**, inside the 45–65 % band.

## Chapter tests (ISC defaults)
- **Short (20 marks):** **A** 5 item(s) · **B** 3 item(s), 1 internal choice · **C** 3 item(s), 1 internal choice · **D** 1 item(s).
- **Long (40 marks):** **A** 12 item(s) · **B** 4 item(s), 1 internal choice · **C** 5 item(s), 1 internal choice · **D** 3 item(s), 1 internal choice.

## Validation
- In the build: schema, pipeline lint (stage 4), deterministic verify checks, word limits, narration and answer-leak scan: 0 errors, 0 warnings.
- Gates: `npm test -w @soyl/content-templates`, `npm run content -- catalog`, `lint --exemplars`, `verify --board cisce --class 12 --subject commerce --authored`, `originality --authored`, DB-6 split and the API content test; results in the handoff `docs/platform/handoffs/2026-10-31-subject-producer-isc12-commerce.md`.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-read against its key. Notes:
1. **Answer leak.** The right-to-safety MCQ solution repeated an assertion-reason stem word for word and was reworded.
2. **Jurisdiction items** were re-checked against the value paid (never the compensation claimed): ₹42 lakh and ₹30 lakh (District), ₹60 lakh, ₹75 lakh, ₹95 lakh and ₹1.4 crore (State), ₹2.3 crore, ₹2.4 crore and ₹3 crore (National).
3. **Consumer definition.** The self-employment exception (goods used only to earn one's livelihood by self-employment are not a commercial purpose) and the exclusion of goods received wholly free were re-checked against the Act's wording.
4. **Assertion-reason keys** use all four ISC options, with no “Assertion false, Reason true” design.

## For the reviewer: facts to check
- **Time-sensitive: pecuniary limits.** District Commission up to ₹50 lakh; State Commission above ₹50 lakh and up to ₹2 crore; National Commission above ₹2 crore, based on the value of goods or services paid as consideration, as notified in December 2021 (Consumer Protection (Jurisdiction of the District Commission, the State Commission and the National Commission) Rules, 2021). Used in 19 questions, both decks, notes and flashcards; check for any later revision.
- **Time-sensitive: 1986 comparison figures.** District Forum up to ₹20 lakh; State Commission above ₹20 lakh and up to ₹1 crore; National Commission above ₹1 crore, based on value plus compensation claimed.
- **Time-sensitive: CCPA penalties.** Up to ₹10 lakh on a manufacturer or endorser for a false or misleading advertisement, and up to ₹50 lakh for every subsequent contravention. The power to bar an endorser is stated without a period.
- **Check:** the appeal route (District → State → National → Supreme Court for the National Commission's original orders) is stated without time limits for filing appeals.
- **Check:** the e-filing portal is described generically (no portal name or URL); mediation is described as through mediation cells attached to the commissions, with both parties' consent.
