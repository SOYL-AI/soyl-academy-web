# exemplar-author / hindi-specialist — M1 Hindi gold-standard chapters and Hindi prompt templates — 2026-10-26

Status: **done** (pending Lead approval of the exemplars; every item carries `status: "draft"` until then)

Branch: `platform/exemplar-author/m1-hindi` (worktree `C:/Users/Prabhu/soyl-wt/exemplar-author-m1-hindi`), based on f9ff738, with `origin/platform/main` merged at 0d91b8c (science and maths exemplars) before authoring.

## What changed

| Path | What |
|---|---|
| `platform/content-templates/exemplars/hindi-language/cbse-10-hindi-a-ch02/{release.json,tests.json,README.md}` | व्यावहारिक व्याकरण: 2 decks, notes, 30 flashcards, 95 questions; a short test (20 marks) and a long test (40 marks); README. |
| `platform/content-templates/exemplars/hindi-literature/cbse-10-hindi-a-ch10/{release.json,tests.json,README.md}` | बालगोबिन भगत — रामवृक्ष बेनीपुरी: 1 deck, notes, 28 flashcards, 68 questions (plus 29 passage children); short and long tests; README with the explicit rule for teaching literature without reproducing the text. |
| `platform/content-templates/prompts/hindi-language/{outline,deck,notes,flashcards,questions,case-passages,verify}.v1.md` | Generic hindi-language templates for CBSE Hindi A/B and ICSE/ISC Hindi: grammar, अपठित and writing skills. |
| `platform/content-templates/prompts/hindi-literature/{outline,deck,notes,flashcards,questions,case-passages,verify}.v1.md` | Generic hindi-literature templates. They carry a non-negotiable no-reproduction rule and an explicit self-check. |
| `docs/platform/handoffs/2026-10-26-exemplar-hindi-m1.md` | This note. |

There are no changes to the shared contract, the gate test or the content-templates README.

Commits: a28bbdd (ch02), 03a865f (ch10), 2f74b0a (templates), and the handoff commit.

## Counts

### ch02 व्यावहारिक व्याकरण (hindi-language)
Topics: t01 वाक्य भेद, t02 वाच्य, t03 पद परिचय, t04 अलंकार — exactly the syllabus topics.
- **Decks:**
  - Part 1, वाक्य भेद + वाच्य: 19 slides. Part 2, पद परिचय + अलंकार: 19 slides.
  - Layouts: title 2, concept 13, diagram 4, example 6, two-column 3, check 6, summary 2, exam-tips 2.
  - Visuals on 14 of 38 slides. The decision procedures are drawn as flows.
- **Narration:** 38 slides, max 71 words, mean 58. Devanagari only, with no digits or symbols.
- **Notes:** 6 sections plus exam tips.
- **Flashcards:** 30 (concept 9, definition 6, fact 5, example 5, exam-tip 5).
- **Questions: 95 (121.5 marks).**
  - By type: board-format 1-mark short 40, mcq 29, 2-mark short 3, long 4-mark 4, fill-blank 4, true-false 4, match 4, assertion-reason 4 (keys a, d, a, d), case-based 3. The case items use SOYL's own passages and verse and have 12 children.
  - By difficulty: d1 17 · d2 52 · d3 20 · d4 5 · d5 1.
  - Competency: 51% at application or higher.
- **Tests:** the two tests share no questions.
  - Short (20 marks, 40 min): A 4 MCQ + B four "5 में से 4" groups. This is the board's खंड ख in miniature.
  - Long (40 marks, 80 min): A 8 objective + B four "5 में से 4" groups + C 2 cases + D long "3 में से 2".

### ch10 बालगोबिन भगत (hindi-literature)
Topics: t01–t05.
- **Deck:** 21 slides (title, concept 10, two-column 2, diagram 3, check 3, summary, exam-tips). Visuals on 7 (5 tables, 2 flows). Narration max 70 words, mean 58.
- **Notes:** 7 sections plus exam tips.
- **Flashcards:** 28.
- **Questions: 68 (133 marks), plus 29 passage children.**
  - By type: mcq 22, 2-mark short 17, long 4-mark 7, true-false 5, match 4, assertion-reason 4 (keys a, c, a, d), fill-blank 3, source-based 5, case-based 1.
    - Source-based items are SOYL commentary paragraphs, 5 × 1 mark each.
    - The case-based item is a fictional present-day case, 4 × 1 mark.
  - By difficulty (over gradable units): d1 21 · d2 46 · d3 20 · d4 4.
  - Competency: application or higher is 26% of parent items and 38% of marks. Recall and understanding legitimately dominate in literature. The higher-order items are value-application, evaluation and a creative diary task.
- **Tests:** the two tests share no questions.
  - Short (20 marks): A passage 5 + B 5 objective + C "4 में से 3" × 2 + D "2 में से 1" × 4.
  - Long (40 marks): A 2 passages + B 8 objective + C "6 में से 5" × 2 + D "4 में से 3" × 4.

## How literature is handled (the most important rule)
- **Nothing of Benipuri's text appears anywhere.** That includes his sentences, his sentence frames, his distinctive phrases, and any paragraph retold in his order.
- **Summaries are organised by theme,** and questions refer to events in SOYL's own words.
- **The board's "पठित गद्यांश" pattern is served by SOYL commentary paragraphs.** Each is an interpretation *about* an episode and is labelled "SOYL द्वारा लिखी गई टिप्पणी है, पाठ का अंश नहीं".
- **Students are pointed to क्षितिज भाग 2** on the title, how-to-use and summary slides, in the notes, and in every passage stem.

The full rationale and a proposal for pipeline enforcement are in the ch10 README.

## How to verify
```
cd platform && npm install
npm test -w @soyl/content-templates
```
Gate output (verbose, Hindi lines):
```
 RUN  v5.0.5 C:/Users/Prabhu/soyl-wt/exemplar-author-m1-hindi/platform/content-templates
 ✓ exemplars.test.ts > exemplars > hindi-language/cbse-10-hindi-a-ch02 > is a valid ChapterRelease
 ✓ exemplars.test.ts > exemplars > hindi-language/cbse-10-hindi-a-ch02 > is named after its chapter and has a README
 ✓ exemplars.test.ts > exemplars > hindi-language/cbse-10-hindi-a-ch02 > uses only topics from the chapter syllabus
 ✓ exemplars.test.ts > exemplars > hindi-language/cbse-10-hindi-a-ch02 > decks meet the visual lesson rules
 ✓ exemplars.test.ts > exemplars > hindi-language/cbse-10-hindi-a-ch02 > has enough flashcards and practice questions
 ✓ exemplars.test.ts > exemplars > hindi-language/cbse-10-hindi-a-ch02 > writes language subjects in their own script
 ✓ exemplars.test.ts > exemplars > hindi-language/cbse-10-hindi-a-ch02 > has a short and a long chapter test drawn from its own questions
 ✓ exemplars.test.ts > exemplars > hindi-literature/cbse-10-hindi-a-ch10 > is a valid ChapterRelease
 ✓ exemplars.test.ts > exemplars > hindi-literature/cbse-10-hindi-a-ch10 > is named after its chapter and has a README
 ✓ exemplars.test.ts > exemplars > hindi-literature/cbse-10-hindi-a-ch10 > uses only topics from the chapter syllabus
 ✓ exemplars.test.ts > exemplars > hindi-literature/cbse-10-hindi-a-ch10 > decks meet the visual lesson rules
 ✓ exemplars.test.ts > exemplars > hindi-literature/cbse-10-hindi-a-ch10 > has enough flashcards and practice questions
 ✓ exemplars.test.ts > exemplars > hindi-literature/cbse-10-hindi-a-ch10 > writes language subjects in their own script
 ✓ exemplars.test.ts > exemplars > hindi-literature/cbse-10-hindi-a-ch10 > has a short and a long chapter test drawn from its own questions
 Test Files  1 passed (1)
 Tests  29 passed (29)
```
The 29 tests are 7 Hindi-language, 7 Hindi-literature, 7 science, 7 maths and 1 directory check.

**Extra validation.** A scratch script, `validate.mjs` (Node 24, no dependencies; source below), checks:
- NFC on every string.
- Devanagari well-formedness: no orphan or double matra, nukta only after a consonant, no virama followed by a matra, no double anusvara, no space before a danda.
- **No Latin run of 3+ words in any student-facing field.** Short bracketed glosses are allowed.
- Non-standard spellings (गये, चाहिये, कर्त्तावाच्य, …).
- Nukta consistency: the same word must not appear both with and without a nukta.
- Narration: word count, and no Latin letters, digits or symbols.
- Every heading contains Devanagari.
- Check slides point at objective questions.
- The short and long tests are disjoint.
- Literature mode: every quoted span of 8+ words is listed for a manual reproduction review.

All files are UTF-8 without a BOM. Output on the final releases:
```
ch02: decks 19 + 19 slides; narration max 71, mean 58; questions 95; warnings (0); NO ERRORS
ch10: deck 21 slides; narration max 70, mean 58; questions 68 + 29 children; warnings (0); NO ERRORS
ch10 quoted spans >= 8 words for manual review: 9 — all are SOYL's own sentences (from SOYL passages or SOYL propositions)
release.json / tests.json / README.md (both chapters): BOM false, NFC true
```

## Verifier passes
An **independent agent** verified both chapters. It answered every item **blind**, from the stems only, before opening the keys.

### ch02: 107/107 keys agreed (95 questions + 12 children)
Fixed after the pass:
- **`p12` (major):** "ध्यान से" can also be parsed as भाववाचक संज्ञा + करण कारक. The model answer and scheme now accept it.
- Minor fixes:
  - `v11`: the model answer added "बहुत", which changed the meaning. It has been removed.
  - `l01(घ)`: the conversion now keeps सकना ("दौड़ा नहीं जा सकता").
  - `c03`: the passage now says "हरी चूड़ियाँ", so the क्योंकि-clause is logical. The child was re-tagged t03.
  - `c01`: the passage and the stem quote were aligned.
  - `p11`, `p18`: पुरुष added to the क्रिया पद-परिचय.
  - `v15`: "ख़रीदे" is now accepted.
  - `l02(घ)`: "काँप गए" became "हिल गए", which avoids a मानवीकरण reading.

Before the pass, the author had already removed five ambiguity risks: खेलना used as अकर्मक (twice), the kāraka in "फ़सल मिलती है", "सोता बचपन", and a defensible distractor.

### ch10: two passes, 97/97 keys agreed both times
The facts were correct in both passes: author dates, works and genres, and events.

**Pass 1 verdict: not compliant with CONTEXT §8.** No paragraph was copied, but the verifier found:
- 13 clusters of close paraphrase or distinctive phrasing:
  - the conduct triplet and "खरा व्यवहार"
  - the पतोहू's plea
  - the death-scene speech
  - "रोने के बदले उत्सव"
  - "पतोहू से ही आग"
  - "निर्णय अटल"
  - "हँसकर टाल"
  - "गीत नहीं सुना… जाकर देखा"
  - the श्रमबिंदु contrast
  - "इसी कारण और भी मानते"
  - "प्रसाद रूप में… गुज़र"
  - "कार्तिक आया नहीं कि"
  - "श्राद्ध की अवधि"
- Four practice passages that retold textbook paragraphs image by image.
- Also: over-length model answers, in-order match keys, one factual slip, and orthography.

**Fixes:**
- All passages were rewritten as SOYL commentary.
- Slides s05–s10 and notes sections 3–4 were rebuilt by theme.
- Every flagged phrase was removed from every file.
- Model answers were trimmed to 26–36 words (2-mark) and 63–76 words (4-mark).
- Match columns were shuffled.
- The fictional case is now labelled as fictional.

**Pass 2 verdict: compliant.** In the verifier's words, "no sentence or close paraphrase of the lesson remains". Five minor follow-ups were applied:
- one narration phrase reworded;
- आषाढ़ named in a passage, so its child needs no outside knowledge;
- the overclaim "कमज़ोर शरीर" removed;
- a noun-gender slip fixed;
- the conduct points reordered.

**Lesson for the pipeline: "own words" is not enough.** A model's natural paraphrase of a famous text keeps its frames and phrases. So the literature templates require theme-ordered summaries, commentary passages and a reproduction self-check, and the verify template ranks any echo as critical.

## Tests added
None. The existing gate covers both exemplars and passes.

## Known gaps / follow-ups
- **The templates have not been run yet.** They need pipeline stages 5–9 (M2). Good trial chapters:
  - hindi-language: CBSE 10 Hindi A ch01 (अपठित) and the writing section (पत्र, अनुच्छेद);
  - hindi-literature: a poem (ch03 सूरदास के पद, where the no-reproduction rule is hardest) and a Kritika lesson.
- **The hindi-a syllabus is `source_status: unverified`.** Its topics were used exactly as listed. If curriculum-cbse-languages changes the topic ids, the exemplars' `topic_ids` must follow.
- **No chapter-test blueprints exist yet,** so `blueprint_id` is `null`.
- **Writing skills (खंड घ) and अपठित (खंड क) have no exemplar yet.** The hindi-language templates cover them generically.

## Recommendations (contract / gate / renderer) — for the Lead and pipeline-engineer
1. **Contract: add a writing-task type.** Hindi (and English) papers carry 20 marks of पत्र, अनुच्छेद, ई-मेल, विज्ञापन, संदेश, सूचना, स्ववृत्त and निबंध. Today these have to be encoded as `long` or `short` items with a rubric scheme, and the templates say so.
   - Proposal: `type: "writing"` with:
     - `format`: letter-formal | letter-informal | email | notice | advertisement | message | paragraph | essay | resume | dialogue;
     - `word_limit: [min, max]`;
     - `rubric`: format / content / language / expression.
   - This lets AI evaluation and lint use those fields.
2. **Contract: add `word_limit` to `short` and `long`** (e.g. `[25, 30]`). Hindi board answers are word-limited, and lint and AI evaluation need the limit; today it lives only in the stem text.
3. **Contract: add `passage_origin` to passage questions:** `soyl-original` | `soyl-commentary` | `licensed-excerpt`. The verifier and renderer could then label literature passages correctly, and lint could refuse any textbook excerpt until licensing exists.
4. **Gate: a stronger Devanagari check for `language: "hi"`.** The current check passes if a slide's heading plus narration contains *one* Devanagari character. Add the following (all implemented in the validator below):
   - NFC;
   - Devanagari well-formedness;
   - no Latin run of 3+ words in student-facing fields;
   - narration with no Latin letters, digits or symbols;
   - the non-standard spelling list, as warnings;
   - nukta consistency, as a warning;
   - notes, questions and flashcards must be majority-Devanagari.
5. **Lint: a reproduction guard for literature.**
   - Now: flag quoted spans of 8+ words for review.
   - When licensed source texts are available to the pipeline: add an n-gram overlap check (any 6-gram shared with the source fails).
6. **Markdown: underline.** CBSE grammar items use रेखांकित (underlined) words. Markdown has no underline, so the exemplar uses **bold** and says "मोटे अक्षरों में छपे पद". If design-system can render an underline convention (for example, allow-listing `<u>`, or `++text++`), the templates can switch.
7. **Renderer: shuffle match columns** at display time, and options where the board allows, so keys can't be guessed.
8. **The same three points science and maths raised:**
   - child-level internal choice in case items;
   - `{{content_json}}` and `{{id_prefix}}` placeholders in the README. The Hindi templates use `{{content_json}}` for verify and fall back to `q_{{chapter_id}}_NNN` ids;
   - a `Provenance` author field. `model: "claude-opus-5-5"` was used here.
9. **TTS.** hi-IN narration avoids digits and Latin entirely. If Azure Speech needs SSML hints to pronounce nukta or chandrabindu correctly, the audio stage should test a sample of each exemplar's narration.

## Decisions made
- **The grammar chapter is split into two decks** at the syllabus sub-topic boundary: वाक्य भेद + वाच्य, and पद परिचय + अलंकार. Each deck has its own checks, summary and exam tips.
- **Board-format 1-mark "निर्देशानुसार" open items are the backbone of the grammar bank,** with at least 10 per grammar sub-topic. That lets the two tests each mirror the "5 में से 4" pattern without reusing items.
- **Literature passage items use SOYL commentary, not retellings.** SOYL prose says "बहू"; the lesson's word "पतोहू" appears only where vocabulary is being taught.
- All items have `status: draft`.

## Needs from owner
None.

<details><summary>validate.mjs (scratch validator; Node 24, no dependencies)</summary>

```js
// Independent checks on a built Hindi exemplar (reads only the JSON): NFC, Devanagari well-formedness,
// Latin-script leakage, non-standard spellings, narration TTS-friendliness, long quotations (literature),
// check-slide types, test disjointness, statistics.
// usage: node validate.mjs <exemplar dir> [--literature]
import fs from 'node:fs';

const DIR = process.argv[2];
const LIT = process.argv.includes('--literature');
const release = JSON.parse(fs.readFileSync(`${DIR}/release.json`, 'utf8'));
const { tests } = JSON.parse(fs.readFileSync(`${DIR}/tests.json`, 'utf8'));
const errors = [];
const warnings = [];
const err = (w, m) => errors.push(`${w}: ${m}`);
const warn = (w, m) => warnings.push(`${w}: ${m}`);

// ---------- collect student-facing strings
const SKIP_KEYS = /\.(id|unit|language|status|type|layout|kind|competency|bloom|tag|topic_id|topic_ids\[\d+\]|left_id|right_id|option_ids\[\d+\]|from|to|direction|origin|template_version|model|generated_at|academic_year|created_at|check_question_id|key)$/;
const strings = [];
(function walk(v, p) {
  if (typeof v === 'string') strings.push([p, v]);
  else if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${p}[${i}]`));
  else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${p}.${k}`);
})(release, '$');
const facing = strings.filter(([p]) => !SKIP_KEYS.test(p) && !/\.build\.|\.provenance\.|\.nodes\[\d+\]\.id$|\.edges\[\d+\]\.(from|to)$/.test(p));

// 1 NFC
for (const [p, s] of strings) if (s !== s.normalize('NFC')) err(p, 'not NFC');

// 2 Devanagari well-formedness
const MATRA = '[ा-ौॢॣ]';
const bad = [
  [new RegExp(`(^|[^ऀ-ॿ])${MATRA}`, 'u'), 'matra without a base letter'],
  [new RegExp(`${MATRA}${MATRA}`, 'u'), 'two matras in a row'],
  [/्[ा-ौ]/u, 'virama followed by matra'],
  [/(^|[^क-हक़-य़])़/u, 'nukta not after a consonant'],
  [/[ँं]{2}/u, 'double anusvara/chandrabindu'],
  [/््/u, 'double virama'],
  [/[ँं][ा-ौ]/u, 'anusvara/chandrabindu before matra (wrong order)'],
  [/।।/u, 'double danda'],
  [/ ।/u, 'space before danda'],
];
for (const [p, s] of facing) for (const [re, m] of bad) if (re.test(s)) err(p, `${m}: …${s.slice(Math.max(0, s.search(re) - 10), s.search(re) + 10)}…`);

// 3 Non-standard spellings (NCERT/CBSE standard: गए, गई, चाहिए, लिए, जाएगा, कर्तृवाच्य …)
const NONSTD = ['गये', 'गयी', 'चाहिये', 'लिये', 'हुये', 'जायेगा', 'जायेंगे', 'आयेगा', 'आयेंगे', 'कर्त्तावाच्य', 'कर्त्ता', 'उत्प्रेच्छा', 'अतिश्योक्ति', 'मानविकरण', 'अलन्कार', 'सम्बन्ध', 'हिन्दी', 'प्रसन्न्', 'ज़ोरों से'];
for (const [p, s] of facing) for (const w of NONSTD) if (s.includes(w)) warn(p, `non-standard spelling "${w}"`);
// nukta consistency: same word with and without nukta
const words = new Map();
for (const [, s] of facing) for (const w of s.match(/[ऀ-ॿ]+/gu) ?? []) words.set(w, (words.get(w) ?? 0) + 1);
for (const w of words.keys()) if (w.includes('़')) { const plain = w.replace(/़/g, ''); if (words.has(plain)) warn('nukta', `both "${w}" and "${plain}" used`); }

// 4 Latin leakage: runs of 3+ Latin words in student-facing text (short glosses allowed)
const ALLOW = /\b(CBSE|SOYL|NCERT|ICSE|ISC)\b|\((A|R)\)|\b(A|R)\b/g;
for (const [p, s] of facing) {
  if (/\.alt$/.test(p)) continue;
  const t = s.replace(ALLOW, ' ');
  const m = t.match(/[A-Za-z][A-Za-z'’-]*(?:\s+[A-Za-z][A-Za-z'’-]*){2,}/);
  if (m) err(p, `Latin run "${m[0]}"`);
  if (!/[ऀ-ॿ]/.test(s) && /[A-Za-z]{3,}/.test(s)) err(p, `no Devanagari at all: "${s.slice(0, 40)}"`);
}

// 5 Narration
let maxW = 0, sumW = 0, n = 0;
for (const d of release.decks) for (const s of d.slides) {
  const w = s.narration.trim().split(/\s+/u).length;
  maxW = Math.max(maxW, w); sumW += w; n++;
  const where = `deck${d.part ?? ''}/${s.id}`;
  if (w > 90) err(where, `narration ${w} words`);
  if (/[A-Za-z]/.test(s.narration)) err(where, `narration has Latin letters: ${s.narration.match(/[A-Za-z]+/)[0]}`);
  if (/[0-9०-९]/.test(s.narration)) warn(where, 'narration has digits (TTS reads them, but words are safer)');
  if (/[→↔=/*#|()[\]{}<>"“”'‘’…–—]/.test(s.narration)) err(where, `narration has symbol ${s.narration.match(/[→↔=/*#|()[\]{}<>"“”'‘’…–—]/)[0]}`);
  if (!/[ऀ-ॿ]/.test(s.heading)) err(where, 'heading has no Devanagari');
}

// 6 Literature: flag long quoted Hindi spans (possible text reproduction) for manual review
const quotes = [];
if (LIT) for (const [p, s] of facing) for (const m of s.matchAll(/[“"]([^”"]{1,400})[”"]/g)) {
  const wc = m[1].trim().split(/\s+/).length;
  if (wc >= 8) quotes.push(`${p}: (${wc} words) "${m[1].slice(0, 70)}…"`);
}

// 7 Check slides objective; tests disjoint
const OBJ = new Set(['mcq', 'assertion-reason', 'true-false', 'fill-blank', 'match', 'multi-select', 'numerical']);
const qById = new Map(release.questions.map((q) => [q.id, q]));
for (const d of release.decks) for (const s of d.slides) if (s.check_question_id && !OBJ.has(qById.get(s.check_question_id)?.type)) err(`deck${d.part}/${s.id}`, 'check slide question not objective');
const sets = tests.map((t) => new Set(t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
const shared = [...sets[0]].filter((x) => sets[1].has(x));
if (shared.length) warn('tests', `short and long share ${shared.join(', ')}`);

// 8 Stats
const count = (arr) => arr.reduce((m, k) => ((m[k] = (m[k] ?? 0) + 1), m), {});
const qs = release.questions;
const typeKey = (q) => (q.type === 'short' || q.type === 'long' ? `${q.type}-${q.marks}` : q.type);
const appPlus = qs.filter((q) => ['application', 'analysis', 'evaluation'].includes(q.competency));
const stats = {
  decks: release.decks.map((d) => ({ part: d.part, slides: d.slides.length, layouts: count(d.slides.map((s) => s.layout)), visuals: d.slides.filter((s) => s.visual).length })),
  narration: { slides: n, maxWords: maxW, meanWords: Math.round(sumW / n) },
  notesSections: release.notes.sections.length,
  flashcards: { total: release.flashcards.cards.length, byTag: count(release.flashcards.cards.map((c) => c.tag)) },
  questions: qs.length,
  marks: qs.reduce((s, q) => s + q.marks, 0),
  byType: count(qs.map(typeKey)),
  byDifficulty: count(qs.map((q) => `d${q.difficulty}`)),
  byCompetency: count(qs.map((q) => q.competency)),
  appOrHigher: `${Math.round((100 * appPlus.length) / qs.length)}% items`,
  byTopic: count(qs.flatMap((q) => q.topic_ids.map((t) => t.slice(-3)))),
  caseChildren: qs.reduce((s, q) => s + q.children.length, 0),
  arKeys: qs.filter((q) => q.type === 'assertion-reason').map((q) => q.answer.option_ids[0]).join(','),
  tests: tests.map((t) => `${t.id}: ${t.total_marks} marks / ${t.duration_min} min, ${t.sections.flatMap((s) => s.items).length} items, sections ${t.sections.map((s) => s.id).join('')}`),
  devanagariWords: words.size,
};
console.log(JSON.stringify(stats, null, 1));
if (LIT) console.log(`quoted spans >= 8 words (manual review for text reproduction): ${quotes.length}\n  ${quotes.join('\n  ')}`);
console.log(`warnings (${warnings.length}):\n  ${warnings.join('\n  ')}`);
console.log(errors.length ? `ERRORS (${errors.length}):\n  ${errors.join('\n  ')}` : 'NO ERRORS');
process.exitCode = errors.length ? 1 : 0;
```
</details>
