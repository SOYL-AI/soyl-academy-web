# subject-producer (CBSE 10 Science, batch A) — chapters 2–5 hand-authored — 2026-10-26

Status: **done** — four publish-quality chapters, all `status: "draft"` pending review.

Branch: `platform/subject-producer/cbse-10-science-a` (worktree `C:/Users/Prabhu/soyl-wt/content-cbse10-science-a`), kept merged with `origin/platform/main` (last merge includes contract v2, bdab615, the lint fix d19bf5e and backend-api M1).

## What changed

| Path | What |
|---|---|
| `platform/content/authored/science/cbse-10-science-ch02/` | Acids, Bases and Salts — release.json, tests.json, README.md |
| `platform/content/authored/science/cbse-10-science-ch03/` | Metals and Non-metals — release.json, tests.json, README.md |
| `platform/content/authored/science/cbse-10-science-ch04/` | Carbon and its Compounds — release.json, tests.json, README.md |
| `platform/content/authored/science/cbse-10-science-ch05/` | Life Processes — release.json, tests.json, README.md |
| `docs/platform/handoffs/2026-10-26-subject-producer-cbse10-science-a.md` | This note |

Every release: v1, academic year 2026-27, provenance `{ origin: "human", author: "claude-opus-5-5 (subject-producer)", model: null }`, `build.checks` filled from the validation runs. No files outside the owned paths were changed.

Commits: 2ab88cf (ch02), 8b3c1be (ch03), 673f7f4 (contract v2 adoption for ch02–ch03), 8c66c33 (ch04), 99e780e (ch05).

## Counts

| | ch02 | ch03 | ch04 | ch05 |
|---|---|---|---|---|
| Decks (slides) | 3 (23, 21, 19) | 2 (22, 25) | 3 (19, 18, 20) | 3 (23, 22, 18) |
| Slides with a visual | 48 / 63 | 36 / 47 | 45 / 57 | 50 / 63 |
| Deck visuals by kind | table 19, chem 10, svg 9, flow 9, plot 1 | table 15, svg 11, chem 7, flow 3 | table 20, svg 10, chem 10, flow 4, plot 1 | table 23, flow 13, svg 12, chem 2 |
| Distinct hand-written SVGs | 9 | 11 | 10 | 12 |
| Worked examples / checks | 6 / 11 | 4 / 8 | 7 / 9 | 6 / 10 |
| Narration words (min–max, mean) | 25–84, 67 | 22–79, 64 | 18–82, 63 | 20–80, 64 |
| Notes sections | 7 | 6 | 7 | 7 |
| Flashcards | 34 | 32 | 30 | 31 |
| Questions | 77 | 69 | 78 | 84 |
| mcq · A-R · T/F · fill · match · num | 28 · 9 · 5 · 4 · 3 · 3 | 24 · 7 · 5 · 4 · 2 · 4 | 27 · 9 · 6 · 5 · 2 · 5 | 31 · 10 · 6 · 5 · 3 · 4 |
| short 2 / short 3 / long 5 / case 4 | 8 / 6 / 5 / 6 | 6 / 6 / 5 / 6 | 7 / 6 / 5 / 6 | 7 / 7 / 5 / 6 |
| Difficulty d1/d2/d3/d4/d5 | 11/32/27/6/1 | 8/30/24/6/1 | 11/33/29/4/1 | 13/29/35/6/1 |
| Application or higher (items / marks) | 48% / 59% | 48% / 61% | 51% / 64% | 49% / 56% |
| MCQ keys a/b/c/d | 7/8/7/6 | 6/6/6/6 | 7/7/7/6 | 8/8/8/7 |

Totals: **11 decks, 230 slides, 42 distinct SVG diagrams, 127 flashcards, 308 questions**, 8 chapter tests.

- Every case-based question has 3 parts (1 + 1 + 2); part (c) is an either/or modelled with `ChildQuestion.alternatives` (`c-ii`), and the parent model answer, solution and marking scheme cover both. Every case passage has `passage_origin: "soyl-original"` (contract v2).
- `word_limit` (contract v2) is set on short/long items whose model answers are prose (CBSE guidance 2 marks 30–50, 3 marks 50–80, 5 marks 80–120 words; 1-mark case parts 5–30), and left out where the answer is an equation, structure or diagram — the lint's word-count rule would otherwise flag equation-only answers.
- Tests follow the exemplar: short = A 4×1, B 2+2+3, C one of two 5-mark, D one case (20 marks, 40 min); long = A 10×1, B 2+2+(2|2)+3+(3|3), C 5+(5|5), D two cases (40 marks, 90 min). Short and long tests are disjoint; `blueprint_id` is null.

## Validation (final run, after the last merge)

```
$ npm test -w @soyl/content-templates -- --reporter=verbose   (science ch02–ch05 lines)
 ✓ … science/cbse-10-science-ch02 > is a valid ChapterRelease
 ✓ … science/cbse-10-science-ch02 > is named after its chapter and has a README
 ✓ … science/cbse-10-science-ch02 > uses only topics from the chapter syllabus
 ✓ … science/cbse-10-science-ch02 > decks meet the visual lesson rules
 ✓ … science/cbse-10-science-ch02 > has enough flashcards and practice questions
 ✓ … science/cbse-10-science-ch02 > writes language subjects in their own script (NFC, well-formed, no Latin runs, TTS-safe narration)
 ✓ … science/cbse-10-science-ch02 > has a short and a long chapter test drawn from its own questions
 (same 7 ✓ for ch03, ch04, ch05)
 Test Files  1 passed (1)
      Tests  57 passed (57)

$ npm run content -- lint --exemplars
ok   cbse-10-science-ch01: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch02: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch03: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch04: 0 error(s), 0 warning(s)
ok   cbse-10-science-ch05: 0 error(s), 0 warning(s)
```

Scratch validator (KaTeX 0.19.1 + mhchem strict parse; atom **and charge** balance incl. hydrates and fractional coefficients; SVG allow-list incl. `SVG_RULES.classPattern`, viewBox, `<title>`, palette with the ADR-009 named hues, fragment-only refs and per-page unique ids; narration length/symbols; check slides → objective items):

```
ch02 {"math":289,"balanced":93,"unbalanced":3,"svgs":17,"narr":{"slides":63,"maxWords":84},"errors":0}
ch03 {"math":180,"balanced":82,"unbalanced":1,"svgs":22,"narr":{"slides":47,"maxWords":79},"errors":0}
ch04 {"math":231,"balanced":62,"unbalanced":0,"svgs":20,"narr":{"slides":57,"maxWords":82},"errors":0}
ch05 {"math":18,"balanced":7,"unbalanced":0,"svgs":24,"narr":{"slides":63,"maxWords":80},"errors":0}
```
The 4 "unbalanced" are the skeletal equations inside worked-example steps, each labelled "skeletal" (the pipeline lint accepts them for that reason). Every SVG was rasterised (resvg, theme tokens substituted) and checked by eye; layout fixes are listed in each README.

## Verifier pass (summary; details in each chapter README)
Every question, case part and alternative was re-solved from its stem; equations recounted; pH facts, reactivity order, IUPAC names and biology facts checked. Main fixes:
1. **Competency honesty over relabelling.** ch02 and ch05 first drafts had 36% and 39% application-or-higher. Instead of relabelling, 16 items were rewritten into new contexts that genuinely need application or analysis (8 per chapter); finals 48% and 49%.
2. **MCQ key spread (ch02):** no item was keyed (d). Options were re-ordered by script with solution letters swapped; the script's first run also hit the `c:` competency field of two items, repaired by hand and re-verified. Later chapters planned keys up front.
3. **Equation/LaTeX:** ch03 q019 had a partial equation inside one `\ce{}` (lint flagged it); rewritten as separate terms. ch02 had two "…data: …" marking steps that the URL rule reads as a `data:` scheme; reworded.
4. **Narration/TTS:** "E20" (ch04) spelled out; mnemonics corrected (ch03 reactivity series had 14 words for 13 elements; ch04 alkane rhyme replaced); a shaky surface-area comparison in ch05 replaced by a safe statement.
5. **Diagrams:** the ch05 heart was redrawn (vessels behind opaque chambers, numbered key), plus ~15 smaller label/overlap fixes across chapters.
6. **Assertion-reason:** ch03 q014 still held a draft with key (a) where (d) was planned; rewritten. Several items re-rated to d4/d5 where they needed multi-step reasoning.

## Known gaps / follow-ups
- **Chapter-test blueprints** are not used (`blueprint_id: null`), as for the exemplar.
- **Hue tokens:** diagrams use the ADR-009 named hues (`--diagram-red|blue|green|yellow|brown`); renderers must define them (the lint palette already does).
- **Electron-dot answers** (ch03, ch04) are described in words in model answers because Markdown cannot draw them; graders should accept any correct drawing.
- **Illustrative data** in case passages (bubble counts, potometer readings, BP readings, tooth-surface pH) are realistic values, not cited measurements; the passages say "typical" where relevant.
- ch05 is long (84 items, 3 decks); the CBSE board paper weights Unit II at 25 marks, so the depth is deliberate.

## Recommendations (for pipeline-engineer / Lead)
1. **Lint `answer.word-limit`**: count words after removing maths (it does) but also consider skipping the rule when `word_limit` is unset — fine today — and documenting in the questions prompt that science items should set `word_limit` only for prose answers, as done here.
2. **Lint `banned.url` scheme rule** matches ordinary prose like "Uses the data: …". Consider requiring `data:` to be followed by a MIME type (`data:[a-z]+/`) to avoid false positives.
3. **Charge balance:** the scratch validator also checks ionic charge in `\ce{}` (e.g. `H+ + H2O -> H3O+`); the lint checks atoms only. Worth porting (source below).
4. **SVG id uniqueness:** the lint already scopes ids per item; the exemplar validator compared across the whole release and flagged diagrams legitimately re-used in notes. The version below scopes per page (deck, notes, question).
5. **Prompts:** the science `questions` template could say explicitly "plan the answer-key letters across a–d before writing" and "do not reach the application share by relabelling; rewrite the context" — both were the main corrections in this batch.

## Decisions made
- Decks split by topic: ch02 into 3 (t01–t03, t04–t06, t07), ch03 into 2, ch04 into 3 (t01–t03, t04–t05, t06–t07), ch05 into 3 (t01–t03, t04–t05, t06–t07), each part complete with goals, examples, checks, summary and exam tips.
- Authored in a scratch toolkit (JS modules with `String.raw` text so LaTeX backslashes survive; a builder that assembles the release and tests; the validator; a rasteriser). The toolkit is not committed — the JSON in git is the source of truth (D-026).

## Needs from owner
None.

<details><summary>Scratch validator core changes vs the exemplar handoff (Node 24; deps katex, htmlparser2)</summary>

```js
// Atom + charge balance: per term, strip state symbols, read a trailing charge (H3O+, SO4^2-, Cl-),
// parse hydrates "CuSO4.5H2O" and fractional coefficients "3/2H2O" / "CaSO4.1/2H2O".
function side(s) {
  const total = {}; let charge = 0;
  for (let term of s.split(/\s\+\s/)) {
    term = term.trim().replace(/\((s|l|g|aq)\)/g, '').replace(/\s+(v|\^)$/, '').trim();
    if (!term || /^(heat|energy|light|sunlight|electricity)$/i.test(term)) continue;
    const ch = /\^?\{?(\d*)([+-])\}?$/.exec(term); let q = 0;
    if (ch && /[A-Za-z0-9)\]]/.test(term.slice(0, ch.index).slice(-1))) {
      q = (ch[1] ? +ch[1] : 1) * (ch[2] === '+' ? 1 : -1); term = term.slice(0, ch.index);
    }
    const m = /^(\d+(?:\/\d+)?)?\s*(.+)$/.exec(term);
    const coef = m[1] ? (m[1].includes('/') ? m[1].split('/')[0] / m[1].split('/')[1] : +m[1]) : 1;
    charge += coef * q;
    for (const [el, n] of Object.entries(parseFormula(m[2]))) total[el] = (total[el] || 0) + coef * n;
  }
  total['(charge)'] = charge; return total;
}
function parseFormula(f) { // hydrate parts split on "." or "·", each with its own leading coefficient
  const total = {};
  for (const part of f.split(/\s*[.·]\s*/)) {
    const m = /^(\d+(?:\/\d+)?)?(.+)$/.exec(part.trim());
    const k = m[1] ? (m[1].includes('/') ? m[1].split('/')[0] / m[1].split('/')[1] : +m[1]) : 1;
    for (const [el, n] of Object.entries(parseGroup(m[2]))) total[el] = (total[el] || 0) + n * k;
  }
  return total;
}
// SVG ids: unique per page, not per release (deck diagrams are re-used in notes).
const page = /^\$\.(decks\[\d+\]|notes|questions\[\d+\]|flashcards)/.exec(path)?.[0] ?? path;
// class attribute: every class must match SVG_RULES.classPattern; palette = DIAGRAM_PALETTE (incl. named hues).
```
</details>
