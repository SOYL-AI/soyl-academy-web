# exemplar-author (science) — M1 gold-standard chapter and science prompt templates — 2026-10-26

Status: **done** (pending Lead approval of the exemplar; all items carry `status: "draft"` until then)

Branch: `platform/exemplar-author/m1-science` (worktree `C:/Users/Prabhu/soyl-wt/exemplar-author-m1-science`), based on `platform/main` at f9ff738.

## What changed

| Path | What |
|---|---|
| `platform/content-templates/exemplars/science/cbse-10-science-ch01/release.json` | `ChapterRelease` v1 for "Chemical Reactions and Equations" (2026-27, provenance `exemplar`): 2 decks, notes, flashcards, 77 questions. `build.checks` records the validation results. |
| `platform/content-templates/exemplars/science/cbse-10-science-ch01/tests.json` | `t_cbse10sci_ch01_short` (chapter-test-short, 20 marks, 40 min) and `t_cbse10sci_ch01_long` (chapter-test-long, 40 marks, 90 min). Both use sections A objective / B short / C long / D case-based with internal-choice groups. |
| `platform/content-templates/exemplars/science/cbse-10-science-ch01/README.md` | Why this chapter is the standard, pitfalls for the pipeline, the content-verifier checklist for science, and the verifier-pass record. |
| `platform/content-templates/prompts/science/{outline,deck,notes,flashcards,questions,case-passages,verify}.v1.md` | Science-family prompt templates. Front matter follows the content-templates README, and `few_shot` points at the exemplar. The bodies are generic (placeholders only). |
| `docs/platform/handoffs/2026-10-26-exemplar-science-m1.md` | This note. |

No changes to the shared contract, the content-templates README, or the gate test.

### Counts
- **Decks:** Part 1, 21 slides (t01–t03); Part 2, 22 slides (t04–t07). Layouts: title 2, concept 14, two-column 2, diagram 8, example 6, check 7, summary 2, exam-tips 2.
- **Deck visuals by kind (32 of 43 slides):** svg 10, table 11, chem 6, flow 5. Notes add svg 5 and table 2. In total there are 15 hand-written SVGs: magnesium burning, ferrous sulphate heating, electrolysis of water, silver chloride in sunlight, reactivity series, iron nail in CuSO₄, double-displacement swap, lead iodide precipitate, copper oxidation/reduction, and the three-tube rusting experiment.
- **Narration:** every slide; 31–87 words (mean 67); no formulae or symbols.
- **Flashcards:** 32 (definition 8, fact 9, concept 5, example 5, exam-tip 3, formula 1, diagram 1); all 7 topics.
- **Questions: 77**
  - **By type:** mcq 24 · assertion-reason 6 · true-false 4 · fill-blank 4 · multi-select 1 · match 3 · numerical 4 · short (2 marks) 10 · short (3 marks) 9 · long (5 marks) 6 · case-based 6 (each 4 marks, 3 children, part (c) either/or).
  - **By difficulty:** d1 10 · d2 26 · d3 29 · d4 10 · d5 2.
  - **By competency:** recall 10 · understanding 24 · application 21 · analysis 19 · evaluation 3. Application or higher is 56% of items and 63% of marks.
  - **By topic (tags):** t01 9 · t02 13 · t03 21 · t04 16 · t05 12 · t06 10 · t07 14.
- **Deck checks:** 7 check slides → q001, q004, q010 (Part 1) and q012, q016, q017, q020 (Part 2), all objective.

## How to verify

```
cd platform && npm install
npm test -w @soyl/content-templates
```
Expected output (verbose):
```
 ✓ exemplars > directory exists (exemplars are added by exemplar-author)
 ✓ exemplars > science/cbse-10-science-ch01 > is a valid ChapterRelease
 ✓ exemplars > science/cbse-10-science-ch01 > is named after its chapter and has a README
 ✓ exemplars > science/cbse-10-science-ch01 > uses only topics from the chapter syllabus
 ✓ exemplars > science/cbse-10-science-ch01 > decks meet the visual lesson rules
 ✓ exemplars > science/cbse-10-science-ch01 > has enough flashcards and practice questions
 ✓ exemplars > science/cbse-10-science-ch01 > writes language subjects in their own script
 ✓ exemplars > science/cbse-10-science-ch01 > has a short and a long chapter test drawn from its own questions
 Test Files  1 passed (1)
      Tests  8 passed (8)
```

**Extra validation (scratch scripts, outside the repo).** The scripts use `katex`, `htmlparser2` and `@resvg/resvg-js`, installed in a scratch directory. The validator source is included below so that pipeline-engineer can port it into the lint stage. Output on the final release:
```
mathStringsParsed: 229        (KaTeX 0.19.1 + mhchem, throwOnError, strict) -> 0 failures
equationsBalanced: 132        (atom-count parser over every \ce{… -> …} and chem visual)
intentionallyUnbalanced: 12   (all skeletal equations being taught, or wrong MCQ options — reviewed by hand):
  deck1 s06/s07 Mg + O2 -> MgO; s08 Al + O2 -> Al2O3 and the intermediate Al + 3O2 -> 2Al2O3;
  s09 C3H8 + O2 -> CO2 + H2O; flashcard f07 front; q003 options a, c, d; q048 solution skeletal;
  q049 and q059 stems (skeletal, to be balanced)
svgs: 15                      (allow-listed elements/attributes, no style, fragment-only refs,
                               palette colours only, viewBox, <title>, unique prefixed ids) -> 0 failures
narration: 43 slides, max 87 words, no $, \ or bare formulae
NO ERRORS
```
Every SVG was also rasterised with theme colours substituted (resvg) and checked by eye. Three layout fixes followed: overlapping electrolysis label, missing glyph, crowded reactivity row.

## Verifier pass (done by the author after writing)
All 77 questions and all 18 case children were re-solved from the stem alone and compared with the key. Every key, equation balance, reaction classification (displacement vs double displacement, exo/endo), redox agent, precipitate colour and numerical answer was confirmed. Fixed:
1. Authoring-source bug: `r'…'` was a plain call, not `String.raw`, and would have dropped every backslash (`\ce` → `ce`). Converted. The validator now flags `ce{` without a backslash.
2. That bulk conversion corrupted the ids `'r'` in three match questions (q040–q042) and in one flow visual (Part 2, s18). Repaired, and the release re-validated.
3. q024 solution typo ("oxidisation").
4. q046: an mhchem fragment with a trailing `+` was rewritten as separate `\ce{}` terms.
5. q016: distractor (d) mentions an escaping gas. The reaction does release ammonia, so the solution now explains why that cannot account for the cooling.
6. Part 2, s16 narration: silver blackening was described as "similar" to oxidation. Reworded (it is silver sulphide).
7. Competency labels: 9 items (q006, q010, q031, q040, q041, q058, q062, q066, q070) were relabelled from application to understanding, because classifying from a definition is understanding. This moved application-or-higher from 68% to 56% of items, closer to CBSE's 50/30/20 split. q063 was raised to difficulty 5.

## Tests added
None. The existing gate (`platform/content-templates/exemplars.test.ts`) covers the exemplar and passes.

## Known gaps / follow-ups
- **The prompt templates have not been run yet.** AGENTS.md §5.2's "iterate until pipeline output on 3 other chapters matches the exemplar" depends on pipeline stages 5–9 (M2).
- **Chapter-test blueprints do not exist yet**, so both tests have `blueprint_id: null`. assessment-designer / curriculum-cbse-blueprints should add `chapter-test-short` and `chapter-test-long` blueprints for CBSE Class 10 Science. The pattern used here (A 1-mark objective, B 2/3-mark, C 5-mark with choice, D 4-mark case) is a reasonable default.
- **Exemplar question ids** use the compact form `q_cbse10sci_ch01_###` (per the brief). The templates fall back to `q_{{chapter_id}}_NNN` because no placeholder gives a compact prefix (see recommendations).
- **Colour:** "blue / pale green / yellow" are conveyed by labels, because the diagram palette has no hue tokens.

## Recommendations (contract / README / gate) — for the Lead and pipeline-engineer
1. **Contract: child-level internal choice.** CBSE case questions put the choice inside a part, for example "(c) either (i) or (ii)". `ChildQuestion` cannot model that, so the exemplar writes both alternatives into one 2-mark child (`model_answer_md` and the marking-scheme steps cover both). Proposal: add `choice_groups` to case-based questions (as in `TestSection`) or an `alternatives: ChildQuestion[]` field on a child, so each alternative can be graded and AI-evaluated on its own.
2. **README: new placeholders.** (a) `{{content_json}}` — the generated content handed to `verify` (used in `verify.v1.md`; `outline_json` was the wrong slot). (b) `{{id_prefix}}` — a compact question-id prefix such as `cbse10sci_ch01`, so generated ids match the exemplar style.
3. **README: `few_shot` fragment semantics.** The templates use `release.json#decks`, `#notes`, `#flashcards`, `#questions`, `tests.json#tests` and `README.md`. pipeline-engineer should define how fragments are resolved and trimmed. For example, case-passages should receive only the `type == "case-based"` items, and questions should receive a stratified sample rather than all 77 items, to save tokens.
4. **Gate / lint additions.** These are worth adding to `exemplars.test.ts` and to the pipeline lint stage (all of them are in the attached validator):
   - KaTeX + mhchem parse of every `$…$`, `math[]`, `formulas[].latex` and `chem.spec.equation`.
   - SVG allow-list, palette and unique-id check against `svg-allowlist.ts`.
   - Atom balance of every `\ce{… -> …}`, with an explicit allow-list for intentionally skeletal equations. One option: a `skeletal: true` marker in the surrounding text or an ignore list in the release `build.checks`.
   - Narration contains no `$`, `\` or bare formulae.
   - Check-slide questions must be objective types.
   - The competency share (application or higher, 45–65%) and the presence of d4–d5 items. These two could be warnings rather than failures.
5. **Design system: hue tokens for science diagrams.** Add a few optional semantic tokens (for example `--diagram-blue`, `--diagram-green`, `--diagram-yellow`, `--diagram-brown`, with dark-mode values), so solution and precipitate colours can be shown as well as labelled, and add them to `DIAGRAM_PALETTE`.
6. **Contract: `NotesSection.visual`** is a single visual. Allowing an array would let a notes section carry both an apparatus diagram and a table. This is minor.
7. **`Provenance`** has no field for the human or agent author of an exemplar. `model: "claude-opus-5-5"` was used here, and `origin: "exemplar"` marks it as hand-authored.

## Decisions made
- The chapter is split into 2 decks (t01–t03 and t04–t07), so it can keep one idea per slide while each deck holds all its required slide types.
- Chapter-test section layout and marks are as above. Internal choice in tests uses equal-mark choice groups; inside cases it is an either/or child.
- All exemplar items stay `status: draft` until the Lead signs off.

## Needs from owner
None.

<details><summary>validate.mjs (scratch validator; Node 24, deps: katex, htmlparser2)</summary>

```js
// Independent checks on the built exemplar: KaTeX+mhchem parse, SVG allow-list, narration length,
// atom balance of every reaction equation, and coverage statistics.
import fs from 'node:fs';
import katex from 'katex';
import 'katex/contrib/mhchem';
import { Parser } from 'htmlparser2';

const WT = process.argv[2] ?? '.'; // repo root
const allow = await import(`file:///${WT}/platform/shared/content/svg-allowlist.ts`); // Node 24 strips TS types
const release = JSON.parse(fs.readFileSync(`${WT}/platform/content-templates/exemplars/science/cbse-10-science-ch01/release.json`, 'utf8'));
const errors = [];
const err = (where, msg) => errors.push(`${where}: ${msg}`);

const strings = [];
(function walk(v, p) {
  if (typeof v === 'string') strings.push([p, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${p}.${k}`);
})(release, '$');

// KaTeX + mhchem
const render = (where, tex, display) => {
  try { katex.renderToString(tex, { throwOnError: true, displayMode: display, strict: 'error' }); }
  catch (e) { err(where, `KaTeX: ${e.message} in ${tex}`); }
};
const ceBodies = [];
for (const [p, s] of strings) {
  if (/\.spec$/.test(p) && s.startsWith('<svg')) continue;
  const isRawMath = /\.math\[\d+\]$|\.latex$/.test(p);
  const isChemSpec = /\.spec\.equation$/.test(p);
  if (isRawMath) render(p, s, true);
  else if (isChemSpec) render(p, `\\ce{${s}}`, true);
  else {
    const re = /\$\$([^$]+)\$\$|\$([^$]+)\$/g; let m;
    while ((m = re.exec(s))) render(p, m[1] ?? m[2], !!m[1]);
    if ((s.match(/\$/g) || []).length % 2) err(p, 'odd number of $ delimiters');
  }
  if (/(^|[^\\])ce\{/.test(s) && !isChemSpec) err(p, 'ce{ without backslash');
  const ceRe = /\\ce\{((?:[^{}]|\{[^{}]*\})*)\}/g; let c;
  while ((c = ceRe.exec(s))) ceBodies.push([p, c[1]]);
  if (isChemSpec) ceBodies.push([p, s]);
}

// Atom balance
function parseFormula(f) {
  const stack = [{}]; let i = 0;
  while (i < f.length) {
    if (f[i] === '(') { stack.push({}); i++; continue; }
    if (f[i] === ')') {
      i++; let num = ''; while (/\d/.test(f[i] ?? '')) num += f[i++];
      const grp = stack.pop(), top = stack[stack.length - 1];
      for (const [el, n] of Object.entries(grp)) top[el] = (top[el] || 0) + n * (num ? +num : 1);
      continue;
    }
    const m = /^([A-Z][a-z]?)(\d*)/.exec(f.slice(i)); if (!m) throw new Error(`cannot parse ${f}`);
    const top = stack[stack.length - 1]; top[m[1]] = (top[m[1]] || 0) + (m[2] ? +m[2] : 1); i += m[0].length;
  }
  return stack[0];
}
function side(s) {
  const total = {};
  for (let term of s.split(/\s\+\s/)) {
    term = term.trim().replace(/\((s|l|g|aq)\)/g, '').replace(/\s+v$/, '').trim();
    if (!term || /^(heat|energy)$/.test(term)) continue;
    const m = /^(\d*)\s*(.+)$/.exec(term); const coef = m[1] ? +m[1] : 1;
    for (const [el, n] of Object.entries(parseFormula(m[2]))) total[el] = (total[el] || 0) + coef * n;
  }
  return total;
}
const unbalanced = []; let balanced = 0;
for (const [p, body] of ceBodies) {
  if (!/->/.test(body) || /\bx/.test(body)) continue; // hydrates with x checked by hand
  const [l, r] = body.split(/->(?:\[[^\]]*\])*/);
  const L = side(l), R = side(r);
  const bad = [...new Set([...Object.keys(L), ...Object.keys(R)])].filter((e) => L[e] !== R[e]);
  if (bad.length) unbalanced.push(`${p}: ${body} [${bad}]`); else balanced++;
}

// SVG allow-list
const els = new Set(allow.SVG_ALLOWED_ELEMENTS), attrs = new Set(allow.SVG_ALLOWED_ATTRIBUTES), palette = new Set(allow.DIAGRAM_PALETTE);
const ids = new Map(); let svgs = 0;
for (const [p, s] of strings) {
  if (!(/\.spec$/.test(p) && s.startsWith('<svg'))) continue; svgs++;
  let viewBox = false, title = false;
  const parser = new Parser({ onopentag(name, a) {
    if (!els.has(name)) err(p, `<${name}> not allowed`); if (name === 'title') title = true;
    for (const [k, v] of Object.entries(a)) {
      if (!attrs.has(k)) err(p, `attribute ${k} not allowed`);
      if (k === 'viewBox' && name === 'svg') viewBox = true;
      if (/^on/i.test(k) || k === 'style') err(p, `forbidden ${k}`);
      if (k === 'href' && !v.startsWith('#')) err(p, `non-fragment href`);
      if (/url\(/.test(v) && !/^url\(#[\w-]+\)$/.test(v)) err(p, `non-fragment url`);
      if (['fill', 'stroke', 'stop-color'].includes(k) && !palette.has(v) && !/^url\(#/.test(v)) err(p, `colour ${v}`);
      if (k === 'id') { if (ids.has(v) && ids.get(v) !== s) err(p, `id ${v} reused`); ids.set(v, s); }
    }
  } }, { xmlMode: true });
  parser.write(s); parser.end();
  if (!viewBox) err(p, 'no viewBox'); if (!title) err(p, 'no <title>');
}

// Narration
for (const d of release.decks) for (const s of d.slides) {
  const n = s.narration.trim().split(/\s+/u).length;
  if (n > 90) err(`${d.part}/${s.id}`, `narration ${n} words`);
  if (/[$\\]|\b(?:H2O|CO2|O2)\b/.test(s.narration)) err(`${d.part}/${s.id}`, 'narration has symbols/formulae');
}
console.log({ balanced, unbalanced, svgs, errors });
process.exitCode = errors.length ? 1 : 0;
```
</details>
