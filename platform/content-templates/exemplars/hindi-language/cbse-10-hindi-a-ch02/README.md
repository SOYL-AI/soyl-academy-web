# Exemplar: CBSE Class 10 Hindi A, Chapter 2 — व्यावहारिक व्याकरण

| | |
|---|---|
| Unit | `cbse-10-hindi-a-ch02` (family `hindi-language`) |
| Syllabus | `platform/catalog/cbse/10/hindi-a/syllabus.yaml` (2026-27, `source_status: unverified` — topics used exactly as listed) |
| Topics | t01 रचना के आधार पर वाक्य भेद · t02 वाच्य · t03 पद परिचय · t04 अलंकार (उपमा, रूपक, उत्प्रेक्षा, अतिशयोक्ति, मानवीकरण) |
| Board weight | खंड ख व्याकरण, 16 of 80 marks: 4 sub-topics × "5 में से 4" × 1 mark |
| Files | `release.json` (2 decks, notes, 30 flashcards, 95 questions), `tests.json` (short 20 marks, long 40 marks) |
| Language | Everything student-facing is Hindi in Devanagari (`language: "hi"`), with a few bracketed English glosses only where a term needs one |
| Status | `draft` on every item until the Lead signs off |

## Why it is the standard

### 1. Deck shape: one rule per slide, then a decision procedure
- **Part 1** (19 slides): उपवाक्य → सरल → संयुक्त → मिश्र → आश्रित उपवाक्य के भेद → *decision flow* → 2 worked examples (identify, convert) → check → वाच्य table → "ने का जाल" two-column → भाववाच्य → 2 worked examples (कर्म-, भाव-वाच्य conversion) → 2 checks → summary → exam tips.
- **Part 2** (19 slides): पद → पद-परिचय template table → कारक table → 2 worked पद-परिचय examples → "एक शब्द, दो पद" two-column → check → अलंकार basics → उपमा, रूपक, उपमा/रूपक/उत्प्रेक्षा contrast, उत्प्रेक्षा, अतिशयोक्ति + मानवीकरण → *identification flow* → 2 checks → summary → exam tips.
- Grammar is procedural, so every topic ends in a **procedure the student can run in the exam**: count finite verbs → look at the connector; look for से/द्वारा + जाना → is there a कर्म?; ask "what job does the word do?" → fill the template; मानो? → सा? → अभेद? → human action? → exaggeration. These are drawn as `flow` visuals and repeated in notes and flashcards.
- The text-family gate does not require a visual every 3 slides, but visuals are used where they teach: 10 tables (connector families, clause types, voice comparison, कारक chart, पद-परिचय template, alankar parts, summaries) and 2 flows (14 of 38 slides).
- Two-column slides are used only for **contrasts that cost marks** (ने-sentences vs कर्मवाच्य; वह/तेज़/से/को changing class with function; उपमा vs रूपक vs उत्प्रेक्षा).

### 2. Narration voice (hi-IN TTS)
- Natural spoken Hindi, second person ("आपकी बारी", "चलिए दोहरा लें"), 38–71 words (mean 58), adds an analogy or exam warning rather than reading the slide (वाक्य = रेलगाड़ी के डिब्बे; उपमा/रूपक/उत्प्रेक्षा = "जैसा, वही, मानो").
- No Latin letters, digits, brackets, arrows, quotes or slashes in narration (validator-enforced). Example words are spoken plainly ("खाकर, देखते ही जैसी अधूरी क्रियाएँ").
- Check-slide narration tells the student *what to test* without giving the answer.

### 3. Examples: all original, from Indian student life
Every example sentence and every verse line was written for this exemplar (school exhibitions, मेला with दादी, rangoli, monsoon, cricket-style hyperbole). No NCERT exercise sentence, no textbook couplet (e.g. the classic Tulsi/Surdas lines grammar books reuse) and no board-paper item is used. Verse used for अलंकार (case `c02`) is original four-line verse.

### 4. Question bank: 95 items, 121.5 marks
- **By type:** mcq 29 · short 1-mark 40 (board "निर्देशानुसार" format) · short 2-mark 3 · fill-blank 4 · true-false 4 · match 4 · assertion-reason 4 (keys a, d, a, d) · long 4-mark 4 · case-based 3 (4 marks each, 12 children).
- **By topic tag:** t01 29 · t02 25 · t03 25 · t04 23 (parent tags; cases carry several).
- **By difficulty:** d1 17 · d2 52 · d3 20 · d4 5 · d5 1. **Competency:** recall 9 · understanding 38 · application 29 · analysis 19 (application or higher 51%).
- **Board-format 1-mark items** are deliberately the bulk: CBSE asks open "निर्देशानुसार" items (identify/convert/parse), not only MCQs. Each has a full model answer and a 1-mark scheme; where the board practice splits the mark (आश्रित उपवाक्य + भेद; भेद + शेष पद-परिचय बिंदु) the scheme is 0.5 + 0.5.
- **Trap items are intentional and explained:** `w02` (से + नहीं but with a कर्म → कर्मवाच्य), `w04`/`w14` (ने → still कर्तृवाच्य), `p15` (यह पुस्तक → सार्वनामिक विशेषण), `p05` (से = करण not अपादान), `p16` (को = संप्रदान), `p20` (तेज़ changes class), `a20`/`w22` (AR with false assertion).
- **Case-based (own passages):** `c01` school science exhibition (all four sub-topics), `c02` original verse (four alankars), `c03` मेला with दादी (conversion + voice + clause + parsing). Each child is independently gradable.

### 5. Chapter tests (`tests.json`)
- **Short (20 marks, 40 min):** A 4 MCQ × 1 · B four internal-choice groups "5 में से 4" × 1 mark (one per sub-topic) — exactly the board's खंड ख pattern in miniature.
- **Long (40 marks, 80 min):** A 8 objective × 1 · B four "5 में से 4" groups · C two case-based × 4 · D long, "3 में से 2" × 4.
- Short and long tests share **no** questions.

## Devanagari and typography rules (for the pipeline)
- **NFC** every string. Note that NFC *decomposes* precomposed nukta letters (U+0958–095F, e.g. ज़ → ज + ़) because they are composition exclusions; that is correct and the renderer handles it. Never mix precomposed and decomposed forms by hand.
- **Standard NCERT spellings:** गए/गई (not गये/गयी), लिए, चाहिए, जाएगा/जाएँगे, कर्तृवाच्य (not कर्त्तावाच्य), संबंध/हिंदी (anusvara for nasal consonant clusters), उत्प्रेक्षा, अतिशयोक्ति, मानवीकरण.
- **Chandrabindu vs anusvara:** chandrabindu where there is no upper matra (हूँ, जाएँ, गाँव, माँ); anusvara where the matra occupies the top (हैं, में, नहीं).
- **Nukta** for Perso-Arabic sounds as NCERT prints them (ज़रूर, ख़रीदा, फ़सल, ज़्यादा) and used consistently — the validator flags any word appearing both with and without nukta.
- **Danda (।)** ends declarative sentences, no space before it; `?` and `!` as in print. Quoted examples use straight double quotes; underlined (रेखांकित) words are rendered as **bold** and stems say "मोटे अक्षरों में छपे पद".
- Glosses: only short bracketed English where a term needs it; the validator rejects any Latin run of 3+ words in student-facing text.

## Pitfalls the pipeline must avoid (seen in drafts or common in generated Hindi grammar)
1. **"ने" ⇒ कर्मवाच्य.** Wrong; "सीमा ने पत्र लिखा" is कर्तृवाच्य. Generated keys get this wrong often.
2. **से + नहीं ⇒ भाववाच्य.** Only if there is no कर्म. "मुझसे किताब नहीं पढ़ी गई" is कर्मवाच्य.
3. **-कर / -ते ही sentences called संयुक्त/मिश्र.** They are सरल.
4. **"इसलिए" treated as व्यधिकरण.** It is समानाधिकरण → संयुक्त. Also avoid "क्योंकि…इसलिए" pairs, whose classification is disputed.
5. **Verbs that are both सकर्मक and अकर्मक** (खेलना, पढ़ना, लिखना without an object). Drafts used "बच्चे खेल रहे हैं" and "हम खेल नहीं सकते"; both replaced with unambiguous अकर्मक verbs (दौड़ना). Prefer clear verbs in keyed items.
6. **Disputed kāraka** (e.g. the thing obtained with "मिलना", destination without परसर्ग: "पुस्तकालय जाता है"). A draft keyed "फ़सल" (in "उन्हें फ़सल मिलती है") as कर्ता; replaced by an unambiguous विशेषण item. Don't underline words whose kāraka grammar books disagree on.
7. **Mixed alankars.** "बादल मानो संदेश सुना रहे थे" is both उत्प्रेक्षा and मानवीकरण; "सोता बचपन" is metonymy that reads as मानवीकरण. Each alankar line must contain exactly one figure; the verifier must check for a second defensible answer.
8. **"सा" that is not comparison** (थोड़ा-सा, ज़रा-सी) must not be keyed as उपमा.
9. **Open answers with a legitimate alternative analysis** ("ध्यान से" as रीतिवाचक क्रियाविशेषण *or* भाववाचक संज्ञा + करण) need the alternative written into the model answer and scheme.
10. **Conversions that change meaning or tense** (adding "बहुत", dropping "सकना", "निकला" → "निकलेगा"). The model answer must preserve both.
11. **Hinglish drift and English loanwords in narration** ("कॉलम", "टॉपिक", "मार्क्स"); use स्तंभ, विषय, अंक.
12. **Copied textbook couplets for अलंकार.** Write original lines.

## Content-verifier checklist (hindi-language)
- [ ] Every `topic_id` is in the chapter's syllabus topics; no removed topic appears.
- [ ] Re-solve every item **blind** from the stem: key, model answer, solution and scheme agree; no second defensible option/answer.
- [ ] Voice items: check कर्म presence, verb agreement (gender/number/person), tense preserved, से/द्वारा + जाना present in कर्मवाच्य/भाववाच्य; भाववाच्य verb is अन्य पुरुष पुल्लिंग एकवचन.
- [ ] Sentence-type items: count finite verbs, identify connector class; conversions keep meaning and tense.
- [ ] पद-परिचय: every required point present (संज्ञा: भेद, लिंग, वचन, कारक, संबंध; विशेषण: विशेष्य; क्रिया: पुरुष, लिंग, वचन, काल, वाच्य); gender inferred from the verb where needed.
- [ ] Alankar lines contain exactly one target figure; reason names the वाचक / उपमेय-उपमान / human action.
- [ ] All example sentences and verses are original and natural Hindi (no textbook or board-paper lines).
- [ ] Orthography: NCERT standard forms, consistent nukta, chandrabindu/anusvara, danda; NFC.
- [ ] Narration ≤ 90 words, Devanagari only, no digits/symbols/abbreviations; heading has Devanagari.
- [ ] Marking schemes add up; 1-mark items split 0.5 + 0.5 only where the board does.
- [ ] Tests: board pattern ("5 में से 4" groups), marks match, versions match.

## Verifier pass (2026-10-26)
An independent verifier (separate agent, no access to the author's reasoning) solved all 95 questions and 12 case children **from the stems alone** before reading the keys. **107/107 keys and model answers agreed.** Fixed after the pass:
1. **`p12` (major, scheme):** "ध्यान से" can also be parsed as भाववाचक संज्ञा + करण कारक; the model answer, solution and scheme now accept it.
2. `v11`: model answer added "बहुत" (meaning change) — removed; alternative मिश्र form added.
3. `l01 (घ)`: "दौड़ नहीं सकते" now converts to "दौड़ा नहीं जा सकता" (keeps सकना), with "दौड़ा नहीं जाता" accepted.
4. `c03`: "हरी चूड़ियाँ" so the क्योंकि-clause is logical; child (घ) re-tagged t03.
5. `c01`: passage sentence aligned with the quoted stem.
6. `p11`, `p18`: क्रिया पद-परिचय now includes पुरुष (अन्य पुरुष).
7. `v15`: "ख़रीदे" (plural tickets) accepted.
8. `l02 (घ)`: "काँप गए" (could be read as fear → मानवीकरण) changed to "हिल गए", with a note.

Before the blind pass, the author's own review had already replaced five ambiguity risks (pitfalls 5–7: खेलना ×2, फ़सल-कर्ता, "सोता बचपन", a defensible "भाववाचक संज्ञा, करण कारक" distractor) and fixed one awkward solution sentence (`w05`).

Validator output (scratch script, Node 24; source in the M1 handoff):
```
decks: part 1 19 slides (8 visuals), part 2 19 slides (6 visuals); narration 38 slides, max 71, mean 58
questions 95 (121.5 marks); case children 12; AR keys a,d,a,d
tests: short 20 marks / 40 min (24 items, A–B); long 40 marks / 80 min (33 items, A–D); no shared questions
warnings (0)
NO ERRORS
```
