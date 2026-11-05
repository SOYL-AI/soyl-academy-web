# CBSE Class 11 Business Studies, Chapter 2: Forms of Business Organisation

`cbse-11-business-studies-ch02` · release v1 · academic year 2026-27 · family `economics-commerce` · provenance `human` · every item `status: "draft"`

Hand-authored to the CBSE 11 Business Studies standard (D-025, D-026, D-036). Build from `platform/`:
`npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch02/src/build.mjs`. The build checks the schema, pipeline lint, deterministic verify, word limits, narration rules, the answer-leak scan, the exact-stem originality pre-check and the editorial counts, then writes `release.json` and `tests.json`. Edit `src/`, not the JSON. The shared library is `../cbse-11-business-studies-ch01/src/lib.mjs` (imported, never edited).

| File | What |
|---|---|
| `release.json` | 2 decks (22 + 21 slides), notes (6 sections), 31 flashcards, 75 questions |
| `tests.json` | `t_cbse11businessstudies_ch02_short` (20 marks, 40 min) and `_long` (40 marks, 90 min) on `cbse-11-default-chapter-test-short` / `-long`, disjoint, no deck-check item |
| `src/` | `questions.mjs`, `build.mjs` |

## Scope

| Topic | Coverage |
|---|---|
| t01 | Sole proprietorship (features, merits, limitations); Joint Hindu Family business (Karta, coparceners, systems, liability, continuity, merits, limitations) |
| t02 | Partnership (features, types of partners, types of partnership, deed, registration, LLP in brief); cooperative societies (features, six types, merits, limitations) |
| t03 | Company: features, private and public, One Person Company, stages of formation, dated note on commencement, merits and limitations |
| t04 | Choice of form: seven factors, applied to imagined cases (baker, three friends, dairy farmers, large factory) |

Decks: Part 1 (sole proprietorship, family business, partnership; 4 checks, 2 worked examples: unlimited liability, profit sharing and joint liability) and Part 2 (cooperatives, company, formation, choice; 4 checks, 2 worked examples: limited liability on shares, choosing a form). SVGs: forms-of-organisation tree, comparison chart, company-formation stages, types of partners. No maps.

Questions: 27 mcq, 6 assertion-reason, 4 true-false, 3 fill-blank, 3 match, 2 ordering, 11 short 2-mark, 7 short 3-mark, 7 long 5-mark, 5 case-based (all on imagined firms). Application or above: 52%.

Tests: short = 3 mcq + 1 ar / 2x2-mark + 3-mark / one of two long / `cb_bakery`. Long = 8 mcq + 2 ar / two 2-mark, one of two 2-mark, 3-mark, one of two 3-mark / long + one of two long / `cb_triveni` + `cb_gokulpur`.

## How verified

Build prints `NO ERRORS` with `lint: 0 error(s), 0 warning(s)`; `release.json` and `tests.json` are byte-identical across repeated builds; `checks.mjs` reports 0 near-duplicate flags (75 stems against 40,271 others) and 0 SVG issues. No tree-wide gates, git or e2e were run.

## Facts for a reviewer

All legal limits are "as of 2024" in the content and should be re-checked against current law.

1. Sole proprietorship: one owner, unlimited liability, no separate legal entity, lack of continuity; merits and limitations as listed in the notes.
2. Joint Hindu Family business: governed by Hindu law; Karta is the eldest member; membership by birth; coparceners; Karta's liability unlimited, coparceners' limited to their share; business continues after the Karta's death.
3. Mitakshara (most of India) and Dayabhaga (West Bengal) stated "as commonly taught"; the legal position is more nuanced.
4. Dated: daughters became coparceners by birth through the Hindu Succession (Amendment) Act 2005.
5. Partnership definition paraphrases the Indian Partnership Act 1932 (no quotation).
6. Dated: minimum 2 and maximum 50 partners as of 2024, as prescribed under the Companies Act 2013 rules.
7. Seven types of partners (active, sleeping, secret, nominal, by estoppel, by holding out, minor) and the textbook distinctions among them.
8. Partnership by duration (at will, particular venture) and by liability (general, LLP). LLP stated briefly: LLP Act 2008, separate legal entity, partners not liable beyond their agreed contribution (the exception for a partner's own wrongful acts is not detailed).
9. Partnership deed contents (name, nature of business, capital, profit ratio, salaries and interest, admission and retirement rules).
10. Dated: registration of a partnership is optional; as of 2024 an unregistered firm cannot sue third parties to enforce contract rights and a partner cannot sue the firm or other partners to enforce deed rights. Reviewer: `s3_unregistered` also mentions a limit on set-off claims (no figure) and loss of credibility with banks (practical, not legal); confirm or drop.
11. Cooperative society definition; registered under the Cooperative Societies Act 1912 or state laws (as of 2024; multi-state cooperatives not mentioned); five features; six types and their purposes; merits and limitations.
12. Company definition paraphrases the Companies Act 2013: incorporated association, separate legal entity, perpetual succession, limited liability.
13. Dated: private company minimum 2 members, maximum 200 excluding employees, minimum 2 directors; public company minimum 7 members, no maximum, minimum 3 directors (all as of 2024). Name endings "Private Limited" and "Limited".
14. Dated: common seal optional since the 2015 amendment (as of 2024).
15. Dated: One Person Company introduced by the Companies Act 2013 (single member, separate legal entity, limited liability).
16. Stages of formation (promotion, incorporation, capital subscription for a public company, commencement) as commonly taught; a private company skips capital subscription because it cannot invite the public.
17. Dated: as of 2024 a company with share capital files a declaration with the Registrar that subscribers have paid for their shares before commencing business; introduced in 2019. NCERT's older "certificate of commencement" is mentioned as the older term. Reviewer: confirm the content of the declaration and that private companies are covered.
18. Choice of form: seven factors (cost and ease of setting up, liability, continuity, management ability, capital, degree of control, nature of business).
19. Computed figures (code): sole proprietor shortfall Rs 90,000 (2,40,000 minus 1,50,000); profit Rs 4,80,000 shared 3:2:1 = Rs 2,40,000 / 1,60,000 / 80,000; partnership shortfall Rs 2,20,000 (6,00,000 minus 3,80,000); shareholder with 500 shares of face value Rs 10, Rs 6 paid, unpaid Rs 2,000.
20. Simplified or unsure: the comparison chart says partnership continuity is "uncertain; ends on exit or death" (a deed can provide for continuity); "next senior member" as Karta's successor is the textbook simplification.
