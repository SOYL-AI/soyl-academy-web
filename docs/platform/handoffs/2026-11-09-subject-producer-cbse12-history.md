# subject-producer — CBSE Class 12 History (cbse-12-history), ch01–ch12 hand-authored — 2026-11-09 (finished 2026-11-10)

Status: done. All twelve theme chapters of Themes in Indian History Parts I–III are authored. The syllabus's ch13 Map Work is not produced on purpose, because owner decision OA-23 is still pending.

Branch: `platform/subject-producer/cbse-12-history` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse12-history`), from `platform/main` 54643166. The branch is not pushed and not merged.

The chapters are hand-authored under D-025/D-026/D-050, in family folder `social-science`. Every item has `status: "draft"`.

## What changed

- **Chapter folders:** one per chapter, `platform/content/authored/social-science/cbse-12-history-chNN/` (NN = 01–12). Each holds `README.md`, `release.json`, `tests.json` and `src/` (`questions.mjs`, `build.mjs`).
- **Shared library:** one copy, in `cbse-12-history-ch01/src/lib.mjs`, which every chapter imports. It is an unchanged copy of the CBSE 11 Political Science lib, which has `verdict`-based assertion-reason items and the build-time exact-stem originality pre-check. Only two comment lines and `DATE` differ.
- **Building:** build any chapter from `platform/` with `npx tsx content/authored/social-science/cbse-12-history-chNN/src/build.mjs`. It prints `NO ERRORS`. Builds are deterministic: each chapter was rebuilt twice with identical md5s. Edit `src/`, never the JSON.
- **Nothing shared touched:** no schema, catalog, template, test, gate or shared file was changed.

## Chapters

**Model (D-050):**
- Every chapter was drafted by a Sonnet 5.5 writer, one writer per chapter and at most two at a time.
- The Opus producer reviewed every item, and the writer then applied the producer's exact fix list.
- The Opus fallback was not needed.

| Ch | Title | Commit | Slides | Notes | Cards | Questions | App.+ |
|---|---|---|---|---|---|---|---|
| 01 | Bricks, Beads and Bones (+ shared lib) | cd942351 | 21 + 21 | 7 | 32 | 75 | 48.0% |
| 02 | Kings, Farmers and Towns | a4f40eb9 | 21 + 21 | 7 | 34 | 75 | 48.0% |
| 03 | Kinship, Caste and Class | f59afbac | 19 + 21 | 7 | 32 | 72 | 47.2% |
| 04 | Thinkers, Beliefs and Buildings | 240b3831 | 21 + 21 | 7 | 33 | 75 | 48.0% |
| 05 | Through the Eyes of Travellers | b50fd3c7 | 20 + 20 | 7 | 33 | 75 | 48.0% |
| 06 | Bhakti–Sufi Traditions | 281f9c58 | 20 + 21 | 7 | 33 | 74 | 47.3% |
| 07 | An Imperial Capital: Vijayanagara | 229281da | 19 + 21 | 7 | 33 | 75 | 48.0% |
| 08 | Peasants, Zamindars and the State | bb7b6a58 | 21 + 20 | 7 | 33 | 75 | 48.0% |
| 09 | Colonialism and the Countryside | 740e6d9a | 21 + 21 | 7 | 32 | 72 | 50.0% |
| 10 | Rebels and the Raj | da0b8685 | 21 + 21 | 7 | 33 | 75 | 48.0% |
| 11 | Mahatma Gandhi and the Nationalist Movement | b71cda62 | 21 + 21 | 7 | 32 | 75 | 48.0% |
| 12 | Framing the Constitution | committed with this note | 20 + 20 | 7 | 33 | 73 | 47.9% |
| **Total** | | | **24 decks, 495 slides** | 84 | 393 | **891** | |

"App.+" is the share of top-level items at application or above. Every chapter is inside the lint band of 45–65%.

**Every chapter has:**
- **Decks:** two, each with:
  - a title slide and goals;
  - 3–4 check slides on objective items;
  - 2–3 worked examples, such as planning a 5-mark answer, reading a source, dating from clues or weighing evidence;
  - a summary and exam tips;
  - a visual at least every 3 slides, with SVG timelines and diagrams and no maps.
- **Questions:** mcq, assertion-reason, true-false, fill-blank, match, ordering, short 2- and 3-mark, long 5-mark, and five source-based items with an Either/Or in part (c).
- **Tests:** two, on the subject's own blueprints:
  - `cbse-12-history-chapter-test-short`: 20 marks, 40 min.
  - `cbse-12-history-chapter-test-long`: 40 marks, 90 min.
  - Both follow their blueprint item for item, share no item and use no deck-check item.

## Scope decisions

- **No map work:**
  - Syllabus ch13 and the blueprints' optional map items are not produced, and no figure is map-like.
  - India map depiction is owner decision OA-23.
  - Places are named in words only.
- **Sources (D-036):**
  - Every source passage is an imagined document or a SOYL summary, labelled as such, with `passage_origin: soyl-original`.
  - No NCERT text or source box is used.
  - No primary source is quoted or translated: no inscriptions, chronicles, travellers, devotional verse, speeches, letters, police reports or Constituent Assembly Debates. Real people are named, and their views are described in SOYL's own words.
  - No board or sample-paper item is used.
- **Honest competency tags (2026-11-05 audit rule):** the producer reviewed every item.
  - **Retagged to understanding:** items whose answer the notes or deck already state, about 5–13 per chapter. These included:
    - "most careful conclusion" restatements;
    - scenario wrappers;
    - near-definitional classification;
    - one-step computations;
    - assertion-reason pairs whose link the notes state;
    - source-fitness items the notes spell out;
    - source parts the passage answers.
  - **Rewritten in place:** to restore the share, some items were rewritten as genuinely higher-order ones. These use new imagined data, counterfactuals, dating from clues, conflicting records, or small data sets with checked arithmetic.
  - **Source items:** a source parent takes the tag of most of its parts, and part (b) is always a one-mark inference.
  - Each README has a "Competency review" note listing the retags and rewrites.
- **Sensitive topics:** handled factually and neutrally, with debates presented as debates and no community blamed. This covers:
  - religion and caste;
  - untouchability, with one line on Article 17;
  - gender, and sati in one neutral line;
  - 1857;
  - communal violence and Partition.

## Gates

All gates were run from `platform/` under `_tools/heavy.sh`.

| Run (IST) | Chapters gated | content-templates | lint | verify (cbse 12 history) | originality | DB-6 | API content | series |
|---|---|---|---|---|---|---|---|---|
| 9 Nov 10:44, with the 19:39 rerun | ch01–ch02 | 4691/4691 | exit 0 | 0 blocking | 670 units, 0 errors | 8/8 | 13/13 (rerun) | 41/41 (rerun) |
| 10 Nov 22:40–23:06 | ch03–ch11 (ch01–ch02 unchanged) | 4726/4726 | exit 0 | 11 units, 818 questions, 0 blocking | 675 units, 0 errors | 8/8 | 13/13 | 41/41 |
| 10 Nov 23:07–23:22 | ch12 (all others unchanged) | 4733/4733 | exit 0 | 12 units, 891 questions, 0 blocking | 676 units, 0 errors | 8/8 | 13/13 | 41/41 |

**Problems during the runs:**
- **First run (ch01–ch02):** `api content.test.ts` failed to load and `series.test.ts` found no tests. The shared machine stalled for hours during this run. Both passed on a rerun, with ch01–ch02 byte-identical.
- **An earlier ch03–ch08 run:** abandoned after the machine stalled overnight. Its lock had gone stale and another agent had taken it over, and content-templates found no tests.
  - I killed only my own processes, with SIGKILL, so that heavy.sh's exit trap would not delete the other agent's lock. Then I reran.

Each commit followed a green run that included the chapter's final bytes. The md5s were checked at the start and the end of each run.

## Facts a reviewer should double-check

Each chapter README has the full list.

- **ch01:**
  - Cunningham "began work for the Survey in 1861 and later became its first Director-General".
  - Meluhha, Magan and gold from south India are marked "probably".
- **ch02:**
  - Indo-Greek coins are dated from about the 2nd century BCE (the 3-mark hoard item).
  - Ashokan inscriptions are said to run "from Afghanistan to the Deccan".
- **ch03:**
  - The critical edition took about 47 years (1917–1966).
  - Rudradaman is placed at c. 150 CE on the timeline.
- **ch04:**
  - Ellora (c. 750 CE) is shown beyond the chapter's 600 CE end.
  - Check the wording used for H. H. Cole's view on removing remains.
- **ch05:**
  - About 15 per cent of people lived in towns in the 17th century (a historians' estimate).
  - Abdur Razzaq is given as being from Herat.
  - `m_bn_sale` treats a recognised land sale as evidence against Bernier.
- **ch07:**
  - The Tuluva dynasty is said to take over "in the early 1500s".
  - The Mahanavami dibba is given as about 40 ft high on a base of about 11,000 sq ft.
- **ch08:**
  - Dates: "1492 and after", Akbar 1556–1605, Shah Jahan 1628–1658.
  - The Ain's zamindar forces are given as 384,558 cavalry and 4,277,057 infantry.
  - All revenue data are imagined.
- **ch09:**
  - Dates and figures: Fifth Report 1813 at about 1,002 pages; Damin-i-Koh 1832; hul 1855–56; Deccan Riots Commission report 1878.
  - The bond arithmetic is imagined, using simple interest per bond.
- **ch10:**
  - The cartridge rumour is said to have offended both Hindu and Muslim sepoys.
  - The Crown takeover is dated 1858.
  - The Rani of Jhansi died fighting in June 1858.
- **ch11:**
  - Kheda (Gujarat) is dated 1918.
  - The Cabinet Mission plan's breakdown is placed before Direct Action Day (`ar_cabinet`).
  - Gandhi was released on health grounds in 1944.
- **ch12:**
  - Article 356 is worded as "on a Governor's report".
  - The data items (seat shares, a 12 per cent tribal population, a 15 per cent franchise) are imagined.

## Known gaps / follow-ups

- **SVG rendering:** none of the SVG figures has been seen rendered. They were laid out by computed coordinates; check them at 360 px, in light and dark mode.
- **Review and test series:** items are `draft`. Content-verifier sampling (at least 5% per unit) has not been done. There is no frozen CBSE 12 History test series yet; that is assessment-designer work.
- **Unit test and board paper:** the blueprints define both. They have not been assembled, though these chapter banks support them.
- **Map work:** waits for OA-23. After it is decided, map items can be added in each chapter (the blueprint lets one 2-mark short be replaced by two 1-mark map items), and ch13 can be written.

Decisions made: none new. No ADR was written and no shared file was touched.

Needs from owner: OA-23, the decision on India map depiction, before map work can be added.
