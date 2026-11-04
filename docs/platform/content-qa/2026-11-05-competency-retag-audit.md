# Content QA: competency retag audit (2026-11-05)

Auditor: content-verifier (AGENTS.md §5.4). Read-only audit; no content, catalog, lint or script was changed.
Owner rule being checked: a competency tag must describe its item honestly. If a chapter misses the band, change the items, not the labels.

## Scope and method

- **Chapters:** the 58 folders under `platform/content/authored/*/` whose `README.md` matches `retag|reclassif|relabel` (case-insensitive). CBSE 11 Political Science ch05 and ch09 are excluded because their subject-producer is already fixing them. Neither matches the grep anyway.
- **Data:** `release.json` `questions[]` as committed at `831759e` (platform/main). The share is what lint `balance.competency` counts: top-level items tagged application, analysis or evaluation, divided by the number of top-level items. (The schema has no `create` tag.)
- **Bands:** the default band is 45–65% (`LINT_COMPETENCY_BAND`, `platform/content-pipeline/config/pipeline.ts`). Under D-035, **CBSE 10 Mathematics uses 20–65%**, so the "outside band" column uses that band for those chapters.
- **Definitions applied:**
  - recall: states a fact or term;
  - understanding: explains or classifies from a near-definitional cue, or does a one-step routine;
  - application: uses a concept or procedure in a new situation, or does a multi-step computation;
  - analysis: breaks down, compares, infers, or judges assertion-reason causality on non-trivial material.

  Two project conventions were also applied: case and passage parents take the tag of most of their parts (Hindi ch01, Maths and Science audits), and a routine textbook procedure on given data is understanding (the Lead's rule in the CBSE 10 Maths audit).
- **Which items were judged:**
  - Where the README names the retagged items (by id, key or a clear description), only those items were judged.
  - Where it gives only a number or a category ("three conversion items", "two items were retagged"), the retagged items cannot be singled out. No chapter has a pre-retag commit in any branch (each was committed once, after the retag). In these chapters the whole **candidate pool** that fits the description was judged, and every dishonest tag in that pool is counted. Those counts therefore include some tags the writer set originally that fail the same test. The "Reviewed" column gives the pool size.
  - ICSE 10 History & Civics chapters ch09–ch18 say they reached the band "with scenario items, not by retagging". There the pool is the application-tagged scenario items that the READMEs credit for the band.
- **Honest share:** this is the current share with only the items judged dishonest moved below application. Every dishonest item found was an over-tag: it was tagged application or higher and is honestly recall or understanding. **No downward retag was judged dishonest.**

## Summary table

"Dir." is the direction of the retag the README describes: ↑ raised to application or higher, ↓ lowered, – no competency retag. "Out?" means outside the band with honest tags.

| Chapter | Dir. | Reviewed | Dishonest | Current share | Honest share | Out? |
|---|---|---|---|---|---|---|
| isc-11-biology-ch15 | – (difficulty only) | 0 | 0 | 47.7% | 47.7% | n |
| cbse-11-chemistry-ch03 | – (table label) | 0 | 0 | 60.6% | 60.6% | n |
| cbse-12-chemistry-ch01 | ↑ | 2 | 2 | 47.1% | 44.1% | **y** |
| cbse-12-chemistry-ch02 | ↑ | 1 | 1 | 47.1% | 45.7% | n |
| cbse-12-chemistry-ch04 | ↑ (unnamed 2) | 3 | 3 | 46.9% | 42.2% | **y** |
| cbse-12-chemistry-ch08 | ↑ (unnamed 3) | 13 | 11 | 46.2% | 29.2% | **y** |
| cbse-12-chemistry-ch09 | ↑ | 1 | 1 | 47.7% | 46.2% | n |
| cbse-12-chemistry-ch11 | ↑ (rewrite + retag) | 1 | 1 | 54.8% | 53.2% | n |
| icse-10-chemistry-ch03 | ↓ | 7 | 0 | 63.5% | 63.5% | n |
| icse-10-chemistry-ch08 | ↑ (unnamed 2) | 30 | 10 | 46.9% | 31.3% | **y** |
| icse-10-chemistry-ch14 | ↓ | 2 | 0 | 62.5% | 62.5% | n |
| isc-12-chemistry-ch21 | ↑ (unnamed 4) | 28 | 11 | 50.7% | 34.8% | **y** |
| isc-12-chemistry-ch22 | ↑ (unnamed 4) | 7 | 7 | 47.1% | 36.8% | **y** |
| cbse-12-computer-science-ch08 | ↓ (unnamed 10) | 26 | 0 | 57.9% | 57.9% | n |
| isc-12-commerce-ch06 | ↓ (unnamed 12) | 26 | 0 | 56.5% | 56.5% | n |
| isc-12-commerce-ch07 | ↓ (unnamed 8) | 27 | 0 | 54.7% | 54.7% | n |
| isc-12-commerce-ch08 | ↓ (unnamed 9) | 26 | 0 | 55.6% | 55.6% | n |
| isc-12-commerce-ch09 | ↓ (unnamed 8) | 28 | 0 | 55.6% | 55.6% | n |
| isc-12-commerce-ch10 | ↓ (unnamed 8) | 28 | 0 | 54.8% | 54.8% | n |
| isc-12-economics-ch09 | ↓ (unnamed 9) | 29 | 0 | 56.8% | 56.8% | n |
| isc-12-economics-ch12 | ↓ | 4 | 0 | 57.7% | 57.7% | n |
| isc-12-economics-ch13 | ↓ (unnamed) | 28 | 0 | 54.5% | 54.5% | n |
| cbse-10-english-language-and-literature-ch04 | ↑ (unnamed 3) | 9 | 4 | 47.6% | 41.3% | **y** |
| cbse-10-english-language-and-literature-ch05 | ↑ | 1 | 0 | 50.8% | 50.8% | n |
| cbse-10-english-language-and-literature-ch06 | ↑ | 2 | 1 | 50.0% | 48.5% | n |
| cbse-10-english-language-and-literature-ch07 | ↑ | 2 | 1 | 50.8% | 49.2% | n |
| cbse-10-english-language-and-literature-ch08 | ↑ | 1 | 1 | 50.7% | 49.3% | n |
| cbse-10-english-language-and-literature-ch28 | – (topic retag) | 0 | 0 | 52.4% | 52.4% | n |
| cbse-10-hindi-a-ch01 | ↓ | 4 | 0 | 59.7% | 59.7% | n |
| cbse-10-hindi-a-ch05 | ↓ | 3 | 0 | 52.1% | 52.1% | n |
| cbse-10-hindi-a-ch06 | ↓ | 1 | 0 | 55.4% | 55.4% | n |
| cbse-10-hindi-a-ch12 | ↑ (unnamed passage) | 6 | 5 | 49.3% | 42.7% | **y** |
| cbse-10-mathematics-ch01 | ↑ | 3 | 2 | 37.3% | 34.7% | n (band 20–65) |
| cbse-10-mathematics-ch02 | – (difficulty only) | 0 | 0 | 35.2% | 35.2% | n (band 20–65) |
| cbse-10-mathematics-ch03 | – (difficulty only) | 0 | 0 | 43.7% | 43.7% | n (band 20–65) |
| cbse-10-mathematics-ch07 | – (difficulty only) | 0 | 0 | 39.2% | 39.2% | n (band 20–65) |
| cbse-10-mathematics-ch08 | ↑ | 2 | 0 | 20.5% | 20.5% | n (band 20–65) |
| cbse-10-mathematics-ch09 | – (difficulty only) | 0 | 0 | 50.0% | 50.0% | n |
| cbse-10-mathematics-ch13 | ↑ | 2 | 0 | 23.6% | 23.6% | n (band 20–65) |
| cbse-10-mathematics-ch14 | – (difficulty only) | 0 | 0 | 23.6% | 23.6% | n (band 20–65) |
| isc-12-mathematics-ch09 | ↓ | 9 | 0 | 55.7% | 55.7% | n |
| cbse-11-physics-ch01 | ↓ (unnamed) | 34 | 0 | 55.3% | 55.3% | n |
| icse-10-physics-ch10 | ↑ (unnamed 3) | 33 | 17 | 46.5% | 22.5% | **y** |
| isc-12-physics-ch10 | ↓ | 5 | 0 | 63.0% | 63.0% | n |
| cbse-10-science-ch02 | – (rewrote instead) | 0 | 0 | 41.6% | 41.6% | **y (already)** |
| cbse-10-science-ch06 | – (rewrote instead) | 0 | 0 | 46.3% | 46.3% | n |
| cbse-10-science-ch10 | – (rewrote instead) | 0 | 0 | 45.0% | 45.0% | n |
| cbse-10-science-ch15 | – (rewrote instead) | 0 | 0 | 43.8% | 43.8% | **y (already)** |
| cbse-10-social-science-ch01 | ↑ (2 A-R) | 4 | 0 | 46.2% | 46.2% | n |
| cbse-10-social-science-ch06 | ↓ | 3 | 0 | 46.5% | 46.5% | n |
| icse-10-history-civics-ch09 | scenario rewrites | 12 | 11 | 47.3% | 35.5% | **y** |
| icse-10-history-civics-ch10 | scenario items added | 8 | 8 | 46.8% | 36.4% | **y** |
| icse-10-history-civics-ch11 | scenario items | 10 | 8 | 50.0% | 40.0% | **y** |
| icse-10-history-civics-ch12 | scenario items | 15 | 12 | 50.0% | 35.0% | **y** |
| icse-10-history-civics-ch13 | scenario rewrites | 22 | 20 | 48.8% | 23.8% | **y** |
| icse-10-history-civics-ch15 | scenario items | 12 | 10 | 50.0% | 37.5% | **y** |
| icse-10-history-civics-ch16 | scenario items | 17 | 13 | 50.6% | 35.6% | **y** |
| icse-10-history-civics-ch18 | scenario items | 14 | 11 | 51.3% | 37.2% | **y** |

**Totals:** 58 chapters, **171 dishonest tags** in 24 chapters. Every one is an over-tag. The 171 break down as follows:

- **10** named relabels were judged dishonest.
- **68** dishonest tags are in the candidate pools of unnamed relabels.
- **93** are scenario-rewritten items in ICSE 10 History & Civics.

**Outside the band with honest tags (17 chapters):**

- CBSE 12 Chemistry ch01, ch04, ch08
- ICSE 10 Chemistry ch08
- ISC 12 Chemistry ch21, ch22
- ICSE 10 Physics ch10
- CBSE 10 English ch04
- CBSE 10 Hindi A ch12
- ICSE 10 History & Civics ch09, ch10, ch11, ch12, ch13, ch15, ch16, ch18

CBSE 10 Science ch02 and ch15 are already below 45% with their current tags. That follows the assessment-designer's downward audit of 2026-10-27, not a retag.

## Dishonest items by chapter

Ids are the release ids with the `q_<subject>_chNN_` prefix dropped. Arrows show current → honest tag.

### cbse-10-mathematics-ch01 (named: q002, q045, q027)
| Item | Tag | Reason |
|---|---|---|
| 002 | application → understanding | Which of 15ⁿ, 20ⁿ, 21ⁿ, 6ⁿ always ends in 0: 20 is a multiple of 10, so this is a one-step check. |
| 027 | analysis → understanding | "HCF(a, b) = a ⇒ LCM(a, b) = b": HCF = a means a divides b, a one-step inference from the definition. |

q045 is already understanding. The assessment-designer audit of 2026-10-27 reversed that relabel, so the README line "43% → 47%" is out of date.

### cbse-12-chemistry-ch01 (named by description)
| Item | Tag | Reason |
|---|---|---|
| 025 | application → understanding | Mixing warms and the volume contracts: the textbook defines negative deviation by exactly these signs of ΔH and ΔV. |
| 027 | application → understanding | "Vapour is richer in the more volatile component" is a textbook statement, not a new situation. |

### cbse-12-chemistry-ch02 (named by description)
| Item | Tag | Reason |
|---|---|---|
| 005 | application → understanding | Removing the salt bridge sends the voltmeter to zero. This follows in one step from the bridge's function and is a standard textbook question. |

### cbse-12-chemistry-ch04 (unnamed: "two explanation items that interpret given data"; pool 012, 017, 022)
| Item | Tag | Reason |
|---|---|---|
| 012 | application → understanding | The sign of E° tells oxidant from reductant (Mn³⁺ vs Cr²⁺): a standard NCERT explanation and a one-step reading. |
| 017 | application → understanding | A-R on Cr²⁺ with a given negative E°: the same one-step sign reading. |
| 022 | application → understanding | Why E°(Mn²⁺/Mn) is anomalous and Cu's is positive: the textbook explanation (d⁵ stability; atomisation and hydration energies), recalled. |

q006 (Fe³⁺ vs Fe²⁺ stability, no data given) is also over-tagged but does not fit the description, so it is not counted.

### cbse-12-chemistry-ch08 (unnamed: "three conversion/identification items"; pool of 13)
| Item | Tag | Reason |
|---|---|---|
| 001 | application → understanding | IUPAC name of a given ketone: a routine naming procedure. |
| 008 | application → recall | Nitrile → aldehyde is the named Stephen reaction. |
| 013 | application → recall | Three single-step textbook preparations (Kucherov, Etard, oxidation). |
| 016 | application → understanding | Which aldehyde gives Cannizzaro: a one-step check for "no α-H". |
| 019 | application → understanding | Which compound gives no iodoform: a one-step CH₃CO– check. |
| 028 | application → understanding | Standard distinguishing tests (Tollens, Fehling). |
| 031 | application → understanding | Alkaline KMnO₄ needs a benzylic H: a one-step rule. |
| 032 | application → understanding | Grignard + CO₂ gives an acid with one more carbon: a one-step known reaction. |
| 037 | application → understanding | Soda lime removes one carbon: a one-step known reaction. |
| 038 | application → recall | Brisk effervescence with NaHCO₃ means a carboxylic acid (d1). |
| 052 | application → recall | "Give reagents" for three textbook conversions (SOCl₂, LiAlH₄, HVZ). |

034 (two-route syntheses of propanoic acid) and 061 (a five-part conversion long answer) keep application. Whichever three items were relabelled, every remaining candidate is recall or understanding.

### cbse-12-chemistry-ch09 (named)
| Item | Tag | Reason |
|---|---|---|
| 022 | application → understanding | K_b = 10^(−pK_b): a one-step substitution. |

### cbse-12-chemistry-ch11 (named)
| Item | Tag | Reason |
|---|---|---|
| 041 | application → understanding | Naming the Tyndall effect from its description (fill-blank, d1). The rewrite changed the wording, not the demand. |

### icse-10-chemistry-ch08 (unnamed: "two items were retagged to keep application-or-higher above 45%"; pool of all 30 higher items)
| Item | Tag | Reason |
|---|---|---|
| 017 | application → recall | Learnt equation (roasting galena). ch03 and ch14 by the same producer tag these as recall. |
| 018 | application → recall | Learnt equation (calcination of calamine), d1. |
| 026 | application → recall | Learnt equation (CuO + H₂), d1. |
| 027 | application → recall | Learnt equation (PbO + C), d1. |
| 034 | application → recall | Learnt equation (Baeyer's digestion). |
| 035 | application → recall | Learnt equation (Al(OH)₃ on heating), d1. |
| 045 | application → recall | Learnt anode equation (2O²⁻ → O₂ + 4e⁻). |
| 014 | application → recall | Gas from roasting zinc blende is SO₂. |
| 015 | application → understanding | Picking the example of calcination from its definition. |
| 022 | analysis → understanding | CO gains oxygen, so it is oxidised: a one-step reading. |

### isc-12-chemistry-ch21 (unnamed: "two comparisons as analysis, two as application"; pool: 3 comparison items + 25 application items)
| Item | Tag | Reason |
|---|---|---|
| 046 | analysis → understanding | Compare glucose and fructose: textbook-tabulated differences. |
| 067 | analysis → understanding | Two differences between amylose and amylopectin: textbook-tabulated. |
| 068 | analysis → understanding | Compare starch, cellulose and glycogen: textbook-tabulated. |
| 003 | application → understanding | Classify dihydroxyacetone as a ketotriose from its formula. |
| 006 | application → recall | Match sugars to textbook descriptions. |
| 007 | application → understanding | Classify four sugars as mono/di/poly and reducing or not. |
| 012 | application → understanding | Five OH groups need five moles of acetic anhydride: one step. |
| 024 | application → understanding | 2⁴ = 16 stereoisomers: one step. |
| 028 | application → understanding | Textbook reactions of glucose and what each shows. |
| 036 | application → recall | Which atoms close the fructofuranose ring. |
| 057 | application → recall | Units and links in maltose and lactose. |

The numericals (025, 026, 027, 043, 056, 066) and the scenario identifications (001, 035, 037, 059) keep application.

### isc-12-chemistry-ch22 (unnamed: "four scenario-based objective items retagged application"; pool of 7)
| Item | Tag | Reason |
|---|---|---|
| 028 | application → understanding | Denaturation leaves the peptide bonds intact: a textbook fact in a hand-rub wrapper. |
| 030 | application → understanding | Urease is the textbook example of enzyme specificity. |
| 032 | application → understanding | Glucagon raises blood glucose: a textbook function. |
| 033 | application → understanding | Sudden fright points to adrenaline: a near-definitional cue. |
| 043 | application → understanding | Poor sight in dim light means vitamin A: the cue is the definition of night blindness. |
| 044 | application → understanding | Slow clotting means vitamin K: a near-definitional cue. |
| 045 | application → understanding | Bowed legs and no sunlight mean vitamin D: a near-definitional cue. |

### icse-10-physics-ch10 (unnamed: "three items retagged"; pool of all 33 higher items)
| Item | Tag | Reason |
|---|---|---|
| 040 | application → understanding | f = 1/T: one step. |
| 046 | application → understanding | T = 1/f: one step. |
| 047 | application → understanding | 50 × 180 cycles: one step. |
| 054 | application → understanding | Turns ratio = voltage ratio: one step. |
| 058 | application → understanding | V_s = V_p·N_s/N_p: one substitution. |
| 059 | application → understanding | N_s from the voltage ratio: one substitution. |
| 061 | application → understanding | N_s from the voltage ratio: one substitution. |
| 004 | application → understanding | Reversing the current reverses the field: a direct rule. |
| 014 | application → understanding | More turns make a stronger electromagnet (d1). |
| 022 | application → understanding | Clockwise current means a south pole: the clock rule. |
| 028 | application → understanding | No force when the current is parallel to the field: a stated rule. |
| 036 | application → understanding | A stationary magnet gives no induced current: the definition of induction. |
| 041 | application → understanding | Faster motion gives a larger deflection: a stated rule. |
| 038 | application → recall | A dynamo turns mechanical energy into electrical energy (d1). |
| 051 | application → understanding | Primary 400 turns, secondary 8000 turns, so step-up: a near-definitional cue (d1). |
| 015 | analysis → understanding | Soft iron loses its magnetism when the current stops: a textbook reason. |
| 056 | analysis → understanding | A step-up transformer lowers the current: a stated relation. |

### cbse-10-english-language-and-literature-ch04 (unnamed: "honest relabelling of three items"; pool of 9 objective analysis items)
| Item | Tag | Reason |
|---|---|---|
| 039 | analysis → understanding | Giving his own salary shows generosity: near-definitional. |
| 041 | analysis → understanding | Naming "dramatic irony" from its definition. |
| 058 | analysis → recall | Literal true/false (why the postmaster collects the money). |
| 063 | analysis → understanding | Match story features to literary terms from their definitions. |

The A-R items 051, 052 and 054 and MCQs 040 and 045 keep analysis or evaluation.

### cbse-10-english-language-and-literature-ch06 (named: the pilot's decision; the cross-story fill-blank)
| Item | Tag | Reason |
|---|---|---|
| 053 | analysis → recall | "Saved by his ___ … a black ___": two plot facts, not a comparison. |

042 (the pilot's decision as an inference) is honest.

### cbse-10-english-language-and-literature-ch07 (named: the Mrs Kuperus item)
| Item | Tag | Reason |
|---|---|---|
| 023 | analysis → understanding | They parted in tears (literal), which shows a warm bond (stated). |

013 (what the grandmother and Mrs Kuperus memories reveal about Anne) would be honest if it is the relabelled item.

### cbse-10-english-language-and-literature-ch08 (named: the bakers' prosperity item)
| Item | Tag | Reason |
|---|---|---|
| 023 | analysis → understanding | How he kept accounts, and how we know baking paid: both are stated in the text. |

### cbse-10-hindi-a-ch12 (unnamed: "one passage relabelled analysis"; pool: source-based passages 001–006)
| Item | Tag | Reason |
|---|---|---|
| 001 | analysis → understanding | Only 2 of 5 parts are higher-order. Under the ch01 rule, a mostly literal passage is understanding. |
| 003 | analysis → understanding | 2 of 5 parts are higher-order. |
| 004 | analysis → understanding | 2 of 5 parts are higher-order. |
| 005 | analysis → understanding | 2 of 5 parts are higher-order (two are recall). |
| 006 | analysis → understanding | 2 of 5 parts are higher-order (two are recall). |

002 has 3 of 5 parts at analysis and keeps it.

### ICSE 10 History & Civics (ch09–ch18): scenario wrappers on recall
The READMEs say the band was reached "with scenario items, not by retagging". The items were rewritten, but most of them still ask only for a fact: an Act, title, place, year, organisation or event, cued by a description of it. Some ask the student to classify a scenario that paraphrases a textbook definition. By the definitions above these are recall or understanding, so the application tag on them is not honest. Multi-part source, map and timeline items, and the "correct this view" shorts, were left as tagged.

**ch09** (README names 006, 016, 033, 065, 067; the pool is all 12 application items)
| Item | Tag | Reason |
|---|---|---|
| 005 | application → understanding | Sort a resolution into a group of Moderate demands. |
| 006 | application → recall | Enlarged councils that may discuss the budget: the Indian Councils Act, 1892. |
| 016 | application → recall | The drain theory and a seat in Parliament: "Grand Old Man of India". |
| 019 | application → recall | Which leader toured over the civil-service age limit. |
| 033 | application → recall | The province formed in 1905: Eastern Bengal and Assam. |
| 034 | application → recall | 1911: the partition was annulled. |
| 044 | application → recall | The session at which the Surat split was healed (Lucknow 1916). |
| 051 | application → understanding | Boycotting Manchester cloth and picketing illustrate swadeshi and boycott (near-definitional). |
| 065 | application → recall | Tilak's Home Rule League: the year 1916. |
| 067 | application → recall | Pal's weekly: New India. |
| 069 | application → recall | Deported to Mandalay in 1907: Lala Lajpat Rai. |

**ch10** (README: seven scenario items added; pool 070–077)
| Item | Tag | Reason |
|---|---|---|
| 070 | application → understanding | Few places in colleges and offices is a founding factor of the League (near-definitional). |
| 071 | application → recall | Loyalty to the government was the League's first objective. |
| 072 | application → understanding | Seats fixed in advance is a Lucknow Pact term (near-definitional). |
| 073 | application → recall | Muslim-only voters for a reserved seat: separate electorates, Morley-Minto 1909. |
| 074 | application → understanding | Self-government together with others shows the League's change in outlook (near-definitional). |
| 075 | application → recall | The League's reaction to the 1911 annulment. |
| 076 | application → recall | Moderates and Extremists reunited at Lucknow in 1916. |
| 077 | application → understanding | Name two Pact terms paraphrased in a speech. |

**ch11** (pool: 10 application items; 073 and 077 keep the tag)
| Item | Tag | Reason |
|---|---|---|
| 004 | application → recall | Detention without trial in 1919: the Rowlatt Act. |
| 009 | application → understanding | Classify an action as boycott or constructive. |
| 010 | application → understanding | Classify an action as boycott or constructive. |
| 011 | application → understanding | Leaving a government college is part of Non-Cooperation (near-definitional). |
| 027 | application → recall | January 1932: Civil Disobedience resumed, arrests followed. |
| 035 | application → understanding | Days from 12 March to 5 April: one-step arithmetic. |
| 043 | application → recall | The Congress boycotted the first Round Table Conference. |
| 045 | application → recall | A Gandhi-Irwin Pact term (salt for own use). |

**ch12** (README credits `m_app_*`, `s_app_broadcast` and two rewritten MCQs; pool of 15; 058, 059 and 061 keep the tag)
| Item | Tag | Reason |
|---|---|---|
| 034 | application → recall | Bose's escape city (Calcutta). |
| 035 | application → recall | The country where Bose met prisoners of war (Germany). |
| 063 | application → recall | The Forward Bloc. |
| 064 | application → recall | National Planning Committee, under Bose's presidency. |
| 065 | application → recall | Who organised the first INA. |
| 066 | application → recall | Gandhi Brigade. |
| 067 | application → recall | Rani of Jhansi Regiment. |
| 068 | application → recall | Indian Independence League. |
| 069 | application → recall | Imphal–Kohima campaign. |
| 070 | application → recall | The INA trials at the Red Fort. |
| 071 | application → recall | RIN mutiny, 1946. |
| 072 | application → recall | Bose's broadcasts from Germany, and why he was there. |

**ch13** (README: nine items rewritten as scenarios; pool of all 22 application items; 028 and 072 keep the tag)
| Item | Tag | Reason |
|---|---|---|
| 003 | application → recall | The Union's three subjects under the Cabinet Mission. |
| 004 | application → recall | Residuary powers lie with the provinces. |
| 008 | application → recall | The princely states' option under the 1946 plan. |
| 009 | application → recall | Assam's Section (C). |
| 012 | application → recall | A province's right to opt out after the first elections. |
| 018 | application → recall | Match provinces to Sections. |
| 021 | application → recall | The Interim Government, 2 September 1946. |
| 034 | application → recall | The Boundary Commission. |
| 035 | application → recall | Accession choice for rulers. |
| 036 | application → recall | The Sylhet referendum. |
| 038 | application → recall | 15 August 1947. |
| 044 | application → recall | Order four dated events. |
| 054 | application → recall | The Act created two dominions. |
| 057 | application → recall | The Constituent Assembly also acted as the legislature. |
| 058 | application → recall | The Government of India Act, 1935, as adapted. |
| 059 | application → recall | A Governor-General for each dominion. |
| 067 | application → recall | The Secretary of State's office ended; Governor-General. |
| 068 | application → recall | Paramountcy lapsed. |
| 074 | application → recall | True/false: Punjab was in Section C (no scenario at all). |
| 075 | application → recall | Which provinces voted in two parts. |

**ch15** (pool of 12; 049 and 066 keep the tag)
| Item | Tag | Reason |
|---|---|---|
| 007 | application → understanding | A factory occupation with a red flag illustrates fear of socialism as a cause of Fascism. |
| 008 | application → understanding | Unemployment and a "mutilated victory" are two named causes. |
| 009 | application → recall | Blackshirts. |
| 031 | application → recall | The 1923 hyperinflation. |
| 032 | application → understanding | The 1930–32 unemployment matches a named cause of Nazism. |
| 033 | application → understanding | Falling coalitions are the named Weimar weakness. |
| 034 | application → understanding | Ruined middle classes turned to the Nazis (a named group). |
| 056 | application → understanding | A leader cult is a named feature. |
| 057 | application → understanding | Compulsory youth groups are a named feature. |
| 058 | application → understanding | Censorship is a named feature. |

**ch16** (pool of 17; 057, 068, 069 and 079 keep the tag)
| Item | Tag | Reason |
|---|---|---|
| 020 | application → recall | Japan and Manchuria. |
| 038 | application → recall | Japan surrendered after the atomic bombs. |
| 043 | application → recall | VE Day. |
| 053 | application → recall | Warsaw Pact. |
| 054 | application → recall | NATO. |
| 055 | application → recall | The Nazi-Soviet Pact. |
| 056 | application → understanding | Rivalry for allies is a named Cold War feature. |
| 073 | application → recall | Remilitarisation of the Rhineland. |
| 074 | application → recall | Poland. |
| 075 | application → recall | Anschluss. |
| 076 | application → understanding | Oil was left out, so the sanctions were weak: the textbook point. |
| 077 | application → understanding | Arms race (near-definitional). |
| 078 | application → recall | The United Nations. |

**ch18** (pool of 14; 024, 061 and 062 keep the tag)
| Item | Tag | Reason |
|---|---|---|
| 005 | application → understanding | Trades with both blocs, no military pact: the definition of non-alignment. |
| 006 | application → understanding | A bloc base and treaty mean not non-aligned: the definition. |
| 007 | application → understanding | Judging each issue on its merits is a named idea. |
| 028 | application → understanding | Panchsheel principles, paraphrased. |
| 041 | application → recall | The founders of the movement (odd one out). |
| 042 | application → recall | Correct the leader–country pairs. |
| 066 | application → understanding | No military treaty disproves bloc membership: the definition. |
| 067 | application → understanding | A nuclear-test ban serves disarmament, a named aim. |
| 068 | application → understanding | Fairer commodity prices are a named economic aim. |
| 069 | application → understanding | Take the loan and refuse the treaty: the definition applied directly. |
| 070 | application → recall | Correct two facts (founders, Belgrade 1961). |

## Retags judged honest

Each of these was checked and holds.

- **Downward retags, all honest:**
  - ISC 12 Commerce ch06–ch10: identifying a concept from a near-definitional scenario is understanding.
  - ISC 12 Economics ch09, ch12, ch13: one-step formula items such as Y = (a + I)/(1 − b), ΔY = kΔI, S at equilibrium, inflation from two index values.
  - CBSE 12 CS ch08: single-clause SQL output reading; multi-clause, join and HAVING outputs stay application.
  - CBSE 11 Physics ch01 and ISC 12 Physics ch10: one-step numericals, definitional items, the hanging ring, the copper pendulum.
  - ISC 12 Mathematics ch09: by-parts and partial-fraction routines where the stem names the method.
  - ICSE 10 Chemistry ch03 and ch14: learnt equations tagged recall.
  - CBSE 10 Hindi A ch01, ch05, ch06: mostly literal passages and symbol identification.
  - CBSE 10 SST ch06: pond ownership, hydrogen as a stock, Punjab over-irrigation.
- **Upward retags judged honest:**
  - Maths ch08 q048 (proving an unfamiliar identity, multi-step); q067 has since gone back to understanding.
  - Maths ch13 n02/n03: now understanding after the 2026-10-27 audit, which is honest.
  - English ch05 008 (what the anthem exchange signified) and ch06 042 (the pilot's decision).
  - SST ch01 A-R items 025, 027, 029, 030: causal judgement on historical claims, including two "true but not the explanation" keys.

## Patterns

1. **Every dishonest tag is an over-tag.** The writers who retagged downward to get under 65% did so honestly. The 45% floor is where tags get inflated: every chapter that moved upward and could not name its items has dishonest tags in the pool.
2. **ICSE 10 History & Civics: scenario wrappers.** 93 of the 171 come from one producer batch (handoff `2026-11-01-subject-producer-icse10-history-civics.md`). The items were rewritten, as the owner rule asks, but the rewrite is cosmetic: "An imagined clerk in 1906 reads about … Which Act?" is still recall. All eight scoped chapters fall to 24–40% with honest tags. The handoff also says ch08 "retagged ten 'why' and 'how' stems as analysis". The ch08 README does not match the grep, so ch08 is **outside this audit's scope** and should be checked next.
3. **ICSE/ISC Chemistry (same producer as ch03/ch14):** the same producer applied its own rules inconsistently.
   - In ch03 and ch14, learnt equations were moved to recall to get under 65%.
   - In ch08 they were left at application, which kept ch08 above 45%.
   - In ISC ch21 and ch22, textbook comparisons became "analysis" and vitamin, hormone and enzyme facts in a scenario wrapper became "application".

   Applied consistently, ch14 also has nine look-alike equation items still tagged application (010, 011, 020, 030, 031, 036, 044, 046, 047). They were not counted, because the README describes a downward retag. Moving them would take ch14 to about 48%, still in the band. ch03 has a few look-alikes (027, 058).
4. **CBSE 12 Chemistry:** many named reactions with one-step product prediction are tagged application, especially in ch08. The README's statement that the band was met "by rewriting, not relabelling" holds for the rewritten items, but the retags it does mention were all over-tags.
5. **ICSE 10 Physics ch10:** one-step substitutions (f = 1/T, transformer ratio) and stated rules are tagged application. The CBSE 11 Physics producer moved the same item type to understanding.
6. **Languages:**
   - English chapters with retags are mostly fine. The exceptions are definitional items (naming a literary term, generosity from a stated act), literal plot facts, and "comparisons" that are two recall blanks.
   - Hindi literature tags passage parents as analysis when only 2 of 5 parts are higher-order. The same pattern appears in ch05 (passages 001, 002, 004) and ch06 (001, 002, 005, 006), where it was not counted because those chapters' retags were downward. Counting them would give 47.9% and 50.0%, both still in the band.
7. **Stale README figures:** the 2026-10-27 assessment-designer audits changed tags afterwards in CBSE 10 Maths and Science. Several README competency lines are now out of date (for example Maths ch01 "47%", now 37.3%; Science ch02 "48%", now 41.6%; Science ch15 "47%", now 43.8%). Science ch02 and ch15 are below 45% with honest current tags and need new items, not labels.

## Follow-ups (for the Lead; the verifier does not fix)

- **Producers, to change items and not labels.** Add or rewrite genuinely higher-order items in the 17 chapters outside the band (list above). Then set the 171 tags in this report to their honest values.
- **Out of scope, worth checking next:**
  - ICSE 10 History & Civics ch08: why/how stems retagged as analysis, per the handoff.
  - ISC 12 Physics ch09 onwards: the handoff reports repeated downward relabels, but only ch10's README matched the grep.
  - The CBSE 10 English ch02 relabel (84% → 62%) mentioned in handoff `2026-10-27-subject-producer-cbse10-english-a.md`.
- **Exemplar-author / pipeline prompts.**
  - State in the question templates that a scenario restating a definition, or one that asks for a name, date or Act, is recall or understanding, however it is framed.
  - State that a parent item takes the tag of most of its parts.
- **Assessment-designer:** check whether any frozen series uses the over-tagged items to meet board competency mixes.
