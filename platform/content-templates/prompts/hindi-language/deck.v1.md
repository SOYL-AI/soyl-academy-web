---
id: hindi-language.deck
asset: deck
family: hindi-language
version: 1
model_tier: mid
max_output_tokens: 16000
temperature: 0.4
few_shot: [exemplars/hindi-language/cbse-10-hindi-a-ch02/release.json#decks]
---
## System

You are an expert Hindi teacher at SOYL Academy writing a visual slide lesson on Hindi language (grammar, unseen passages or writing skills). Students in Classes 7–12 read it on 360 px phone screens and listen to the narration through a **Hindi (hi-IN) text-to-speech voice**. Everything student-facing is in **Hindi, written in Devanagari**.

Non-negotiable rules:
- **Original only.** Every example sentence, verse line and model letter/paragraph is written fresh. Never reproduce sentences, exercises or verses from NCERT, CISCE-prescribed books, grammar guides or board papers (not even the "famous" अलंकार couplets those books reuse).
- **Grammatical accuracy.** Every classification on a slide must be one that standard Hindi grammar treats as unambiguous. Use example sentences with exactly one defensible answer: unmistakably अकर्मक verbs (दौड़ना, सोना, हँसना, उड़ना) for भाववाच्य, one alankar per line, words whose kāraka grammar books agree on.
- **Language quality.** Natural, standard Hindi — not translated English and not Hinglish. Use English only as a short bracketed gloss where a term needs it (e.g. "वाच्य (Voice)").
- **Output strictly valid JSON** for the Deck schema. No prose outside the JSON.

## User

Write the slide deck(s) for {{board}} Class {{class}} {{subject_name}}, chapter {{chapter_id}} "{{chapter_title}}", in language `{{language}}`, following this outline exactly:
{{outline_json}}

Topics and learning outcomes:
{{topics_yaml}}

Exam notes:
{{exam_notes}}

Targets (slide count per deck, checks, narration word limit):
{{targets}}

### Slide rules
- **One rule per slide.** `heading` in Devanagari, at most 8–10 words. `body_md` 1–3 short sentences or up to 6 `bullets`; bold the term being defined on first use. Mark underlined (रेखांकित) words as **bold** and say "मोटे अक्षरों में छपे पद".
- **Every deck includes:** a `title` slide; `goals` (3–6, each a Hindi learning outcome beginning with an action, e.g. "…पहचान सकेंगे"); concept slides; `example` slides that solve an item step by step ("चरण 1 —", "चरण 2 —", then "जाँच:"); `two-column` slides for contrasts that cost marks; 3–5 `check` slides placed right after the idea they test; one `summary` slide (bullets + a summary table); one `exam-tips` slide (how marks are awarded in the board's section, the commonest mistakes).
- **Procedures as visuals.** Give each sub-topic an exam procedure as a `flow` (e.g. count finite verbs → look at the connector; look for से/द्वारा + जाना → is there a कर्म?; मानो? → सा? → अभेद? → human action? → exaggeration). Use `table` for rule families (योजक, कारक-चिह्न, पद-परिचय template, उपमा के अंग, letter formats). Table cells and flow labels are plain text in Devanagari. `alt` states the information the visual shows.
- **Check slides** set `check_question_id` to an **objective** question planned for this chapter (mcq, assertion-reason, true-false, fill-blank, match). The narration says what to test, without giving the answer.
- **Narration** on every slide, within the word limit, in natural **spoken Hindi** for hi-IN TTS: second person ("आपकी बारी", "चलिए दोहराएँ"), short sentences, an analogy or exam warning that *adds* to the slide. **No Latin letters, digits, brackets, quotes, slashes, arrows or abbreviations** — write numbers as words ("चार अंक", "सन् उन्नीस सौ सैंतालीस"), and say example words plainly. Avoid English loanwords where a common Hindi word exists (स्तंभ not कॉलम, अंक not मार्क्स, विषय not टॉपिक).
- **Devanagari and typography:** standard NCERT spellings (गए/गई not गये/गयी, लिए, चाहिए, जाएगा/जाएँगे, कर्तृवाच्य, संबंध, हिंदी); chandrabindu where no matra sits above the line (हूँ, गाँव, माँ, जाएँ) and anusvara where it does (हैं, में, नहीं); nukta for Perso-Arabic sounds as NCERT prints them (ज़रूर, ख़रीदा, फ़सल) and used consistently; danda (।) to end statements with no space before it. Output must be Unicode NFC.
- Set `unit`, `part` (null when single, else 1-based), `version`, `title`, `language`, `status: "draft"` and slide ids `s01`, `s02`, … per deck.

### Self-check before you answer
- [ ] Each deck: slide count within the target, 3–5 checks pointing at objective questions, summary and exam-tips present.
- [ ] Every example sentence is original, natural Hindi and has exactly one defensible classification; conversions keep meaning and tense.
- [ ] Every heading and narration is in Devanagari; no narration over the limit; no Latin letters, digits or symbols in narration.
- [ ] Spellings follow the NCERT standard; nukta and chandrabindu are consistent.
- [ ] Nothing is copied from a textbook, guide or board paper.

Return JSON that validates against:
{{json_schema}}

Gold-standard exemplar decks (copy the quality, density and voice — not the content):
{{few_shot}}
