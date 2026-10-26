// Build CBSE 10 English Language and Literature ch03 Writing Skills. Run from platform/:
//   npx tsx content/authored/english-language/cbse-10-english-language-and-literature-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch03', 'english-language');
const { vMuseum, vTravel, vVillage, LETTER_RUBRIC, PARA_RUBRIC } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BR = '  \n';

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['Board question', 'Task', 'Marks', 'Length'],
  [
    ['Formal letter', 'complaint, letter to the editor, placing an order, or enquiry (choose A or B)', '5', '100–120 words'],
    ['Analytical paragraph', 'describe and analyse a chart, graph, table, map or set of cues (choose A or B)', '5', '100–120 words'],
  ],
  'Table of the two board writing tasks: a formal letter of complaint, to the editor, placing an order or of enquiry, and an analytical paragraph on a chart, graph, table, map or cues; each is worth five marks in about one hundred to one hundred and twenty words.',
  'CBSE 2026-27, Section B: writing 10 marks.',
);
const vTypes = table(
  ['Letter type', 'Written to', 'Goal', 'Tone'],
  [
    ['Complaint', 'a company, shop or official', 'report a problem and get it put right', 'firm, polite'],
    ['To the editor', 'The Editor of a newspaper', 'raise a public issue and suggest solutions', 'reasoned, public-minded'],
    ['Placing an order', 'a supplier or shop', 'order goods exactly, with terms', 'brief, precise'],
    ['Enquiry', 'an institution or business', 'ask for information before deciding', 'courteous, specific'],
  ],
  'Table of four formal letter types with their receiver, goal and tone: complaint, letter to the editor, placing an order and enquiry.',
);
const vFormat = flow('TB', ["Sender's address", 'Date', "Receiver's address", 'Subject', 'Salutation (Sir/Madam,)', 'Body: 3 paragraphs', 'Complimentary close (Yours faithfully)', 'Name (and designation)'], 'Flow of the eight parts of a formal letter from top to bottom: sender’s address, date, receiver’s address, subject, salutation, body, complimentary close, and name.', 'The CBSE format, top to bottom.');
const vBody = table(
  ['Paragraph', 'Job', 'Useful openings'],
  [
    ['1 — Purpose', 'say why you are writing, with a reference', 'I am writing to… / I wish to bring to your notice…'],
    ['2 — Details', 'facts, figures, effects, or the list of items/questions', 'The problem is… / Kindly let me know… / We require the following…'],
    ['3 — Action', 'what you want done, by when; polite close', 'I request you to… / I look forward to an early reply.'],
  ],
  'Table of the three body paragraphs: purpose, details and action, with useful opening phrases for each.',
);
const vRubricL = table(
  ['Criterion', 'Marks', 'What earns it'],
  LETTER_RUBRIC.map(([c, m, d]) => [c, String(m), d]),
  'Table of the SOYL letter rubric: format one mark, content two marks, organisation and expression one mark, accuracy one mark, with what earns each.',
  'SOYL rubric modelled on the CBSE marking pattern.',
);
const vTrend = table(
  ['Change', 'Verbs', 'Nouns', 'Adverbs / adjectives'],
  [
    ['Up', 'rose, increased, grew, climbed, soared', 'a rise, an increase, growth', 'sharply, steadily, gradually, slightly'],
    ['Down', 'fell, declined, dropped, plummeted', 'a fall, a decline, a drop', 'dramatically, steeply, marginally'],
    ['Highest / lowest', 'peaked at, hit a low of', 'a peak, a low point', '—'],
    ['No change', 'remained stable, levelled off', 'a plateau', 'constant, steady'],
    ['Up and down', 'fluctuated', 'fluctuations', 'erratic, irregular'],
  ],
  'Table of trend language: verbs, nouns and adverbs for going up, going down, peaks and lows, no change, and fluctuation.',
);
const vCompare = table(
  ['To show…', 'Use', 'Example'],
  [
    ['size of change', 'rose **by**', 'Sales rose by 20 units.'],
    ['final value', 'rose **to**', 'Sales rose to 80 units.'],
    ['ratio', 'twice / three times as many as', 'Twice as many students cycled as walked.'],
    ['proportion', 'a quarter, a third, the majority', 'A quarter of the students walk.'],
    ['contrast', 'whereas, while, in contrast', 'Coal fell, whereas solar rose.'],
    ['two percentages', 'percentage points', 'It rose from 20 to 30 per cent, by 10 points.'],
  ],
  'Table of comparison language: by for the size of change, to for the final value, ratios, proportions, contrast words and percentage points.',
);
const vParaFlow = flow('LR', ['Introduction: what, where, when', 'Overview: the big picture', 'Key figures, grouped', 'Comparisons and exceptions', 'Conclusion from the data'], 'Flow of the five moves of an analytical paragraph: introduction, overview, key figures, comparisons and exceptions, and conclusion.');
const vRead = flow('LR', ['Title and source', 'Axes, units, period', 'Highest and lowest', 'Biggest change', 'Odd one out'], 'Flow of five things to read on a chart before writing: title, axes and units, highest and lowest values, biggest change, and the odd one out.', 'Spend one minute reading before you write.');
const vRubricP = table(
  ['Criterion', 'Marks', 'What earns it'],
  PARA_RUBRIC.map(([c, m, d]) => [c, String(m), d]),
  'Table of the SOYL analytical paragraph rubric: content three marks, organisation and expression one mark, accuracy one mark.',
  'SOYL rubric modelled on the CBSE marking pattern.',
);

// ---------------------------------------------------------------- decks
const MODEL_LETTER = [
  `14 Shanti Nagar${BR}Jaipur 302006`,
  '27 October 2026',
  `The Customer Relations Manager${BR}Furnish Home Pvt Ltd${BR}Koramangala, Bengaluru 560034`,
  '**Subject: Complaint about a damaged study table (Order No. FH20817)**',
  'Sir/Madam,',
  'I am writing to complain about a study table I ordered from your website on 15 October. It was delivered yesterday in a damaged condition.',
  'The tabletop has a deep crack along one edge, and two drawer handles and their screws were missing from the box. Since I paid the full amount in advance, this is very disappointing.',
  'I request you to replace the table within a week or refund the full amount of ₹6,499. I have kept the packing and the invoice for your inspection.',
  `Yours faithfully${BR}Riya Sharma`,
].join('\n\n');

const part1 = deck({
  part: 1,
  title: 'Writing Skills — Part 1: The Formal Letter',
  goals: [
    'Lay out a formal letter in the CBSE format, part by part',
    'Organise the body in three paragraphs: purpose, details, action',
    'Write in a polite, formal register without slang or contractions',
    'Write complaint, editor, order and enquiry letters within 100–120 words',
  ],
  slides: [
    sl('title', 'Writing Skills — Part 1: The Formal Letter', {
      b: 'CBSE Class 10 English, **Section B (writing, 10 marks)**. You write one formal letter and one analytical paragraph, choosing A or B in each. This part teaches the letter; Part 2 teaches the analytical paragraph.',
      v: vBoard,
      n: 'Welcome to writing skills. In Section B you write two pieces worth five marks each: a formal letter, and an analytical paragraph. Each has a choice of two questions, and each should be about one hundred to one hundred and twenty words. Both are very scoring if you learn the format and plan for one minute before writing. In this part we build the formal letter.',
    }),
    sl('concept', 'Four kinds of formal letter', {
      b: 'The syllabus names four types. Each has one job, one kind of reader and one tone.',
      v: vTypes,
      n: 'There are four kinds of formal letter in your syllabus. A complaint reports a problem and asks for it to be put right. A letter to the editor raises a public issue for readers of a newspaper. An order letter asks a supplier for goods, exactly. And an enquiry asks for information before you decide. Before writing, name the type, because it decides your opening and your tone.',
    }),
    sl('diagram', 'The format, top to bottom', {
      b: 'Learn the eight parts in order. The **subject comes before the salutation**.',
      v: vFormat,
      n: 'Here is the format, from top to bottom. Your address, then the date. Then the receiver’s designation and address. Then the subject line, and only after that the salutation, Sir or Madam. Then the body, in three short paragraphs. Then the complimentary close, yours faithfully, and finally your name, with your designation if you write for a school or a group.',
    }),
    sl('concept', 'Getting the format details right', {
      bl: [
        '**Addresses:** short, with the city and PIN code; use the names and places given in the question.',
        '**Date:** in full, e.g. *27 October 2026*.',
        '**Subject:** 5–10 words naming the problem or purpose, plus a reference if there is one.',
        '**Salutation:** *Sir/Madam,* (or *Dear Sir/Madam,*).',
        '**Close:** *Yours faithfully* (CBSE also accepts *Yours sincerely*), then the name.',
      ],
      n: 'A few details earn the format mark. Keep addresses short, and always use the names and places the question gives you. Write the date in full. The subject line should name the problem or purpose in a few words, with an order or invoice number if there is one. Begin with Sir or Madam, and end with yours faithfully, then your name.',
    }),
    sl('concept', 'The body: three paragraphs, three jobs', {
      b: 'Purpose → details → action. Keep each paragraph to two or three sentences.',
      v: vBody,
      n: 'The body has three paragraphs, and each has one job. The first says why you are writing, in one or two sentences. The second gives the details: the facts, the effects, the list of items or the questions. The third says exactly what you want done and by when, and ends politely. If you stick to this, your letter will be clear and within the word limit.',
    }),
    sl('two-column', 'Formal versus informal register', {
      cols: [
        '**Avoid (informal)**\n\n- *Hi! / Dear friend*\n- contractions: *I\'m, don\'t, can\'t*\n- slang: *super upset, stuff, guy*\n- demands: *Fix it right now!*\n- *Yours lovingly*',
        '**Use (formal)**\n\n- *Sir/Madam,*\n- full forms: *I am, do not, cannot*\n- neutral words: *very disappointed, goods, delivery person*\n- requests: *I request you to…*\n- *Yours faithfully*',
      ],
      n: 'Register means the level of formality. A formal letter avoids greetings like hi, contractions like I am written with an apostrophe, slang, and demands with exclamation marks. Instead it uses full forms, neutral words, and polite but firm requests such as I request you to. Being polite does not mean being weak. A calm letter with clear facts is far more persuasive.',
    }),
    sl('example', 'Worked example 1: planning a letter of complaint', {
      b: '*Question:* Riya ordered a study table online (Order No. FH20817); it came with a cracked top and missing handles. Write to the Customer Relations Manager.',
      bl: [
        '**Type and tone:** complaint; firm and polite.',
        '**Subject:** *Complaint about a damaged study table (Order No. FH20817)*.',
        '**P1 purpose:** ordered on 15 October, delivered damaged.',
        '**P2 details:** crack along one edge; two handles and screws missing; paid in advance.',
        '**P3 action:** replace within a week or refund ₹6,499; packing and invoice kept.',
      ],
      n: 'Spend one minute planning. Name the type and tone: a complaint, firm but polite. Write the subject line with the order number. Then jot one line for each paragraph. Paragraph one: what was ordered and that it arrived damaged. Paragraph two: the exact defects, and that she paid in advance. Paragraph three: the remedy she wants, with a deadline, and the evidence she has kept.',
    }),
    sl('example', 'Worked example 1: the finished letter', {
      b: MODEL_LETTER,
      n: 'Here is the finished letter. Notice the format, part by part, and the subject line that the company can trace. The three body paragraphs follow the plan exactly: purpose, details, action. The language is formal throughout, with no contractions or exclamation marks. The whole letter is about one hundred and twenty words, including the format, which keeps it inside the limit.',
    }),
    sl('check', 'Check: choose the subject line', {
      chk: 'fmt_subject',
      n: 'Your turn. Four subject lines for a complaint about a faulty geyser. Which one tells the reader the purpose, the product, and gives a reference they can trace?',
    }),
    sl('concept', 'The letter to the editor', {
      b: 'You write to **The Editor**, but your real audience is the newspaper\'s readers and the authorities.',
      bl: [
        'Open with the issue: *Through the columns of your newspaper, I wish to draw attention to…*',
        'Paragraph 2: who is affected and how (facts, not anger).',
        'Paragraph 3: practical suggestions for authorities **and** citizens.',
        'Keep it about the public, not only your own inconvenience.',
      ],
      n: 'A letter to the editor is different from a complaint. You address the editor, but you are really speaking to the public and the authorities through the newspaper. So open with the issue, then show who is affected and how, with facts rather than anger. End with practical suggestions, both for the authorities and for ordinary citizens. That balance shows mature thinking.',
    }),
    sl('example', 'Worked example 2: a letter to the editor in key sentences', {
      b: '*Question:* Late-night loudspeakers in your locality disturb students before the board exams. Write to the Editor, *The City Chronicle*, Nagpur.',
      bl: [
        '**Subject:** *Late-night loudspeakers disturbing students*',
        '**P1:** *Through the columns of your newspaper, I wish to draw attention to the noise from loudspeakers at late-night functions in our locality.*',
        '**P2:** students cannot study or sleep; elderly residents and patients suffer; noise goes on past ten at night.',
        '**P3:** strict enforcement of time limits; quick action on complaints; organisers to keep volume low and end on time.',
      ],
      n: 'Here are the key sentences for a letter to the editor about loudspeakers. The subject names the problem. Paragraph one uses the standard opening and states the issue. Paragraph two widens it beyond yourself: students, the elderly and patients, and the timing. Paragraph three offers two kinds of suggestions, one for the authorities and one for the organisers. The full model is in the practice bank.',
    }),
    sl('two-column', 'Order and enquiry letters', {
      cols: [
        '**Placing an order**\n\n- P1: we wish to order the following…\n- P2: a **numbered list**: item, specification, quantity\n- P3: delivery date and place, payment mode, discount',
        '**Enquiry**\n\n- P1: where you heard of it, what you are planning\n- P2: specific questions as polite indirect questions: *Kindly let me know whether…*\n- P3: request a brochure or terms',
      ],
      n: 'Order and enquiry letters are the easiest to score in, because they are short and factual. In an order, put the items in a numbered list with specifications and quantities, then give the delivery date, payment mode and any discount. In an enquiry, ask specific questions politely and indirectly, such as kindly let me know whether, and end by requesting a brochure.',
    }),
    sl('example', 'Worked example 3: the body of an order letter', {
      b: `*We would like to place an order for the following books for our school library:*${BR}1. Oxford Student Atlas for India (latest edition) — 10 copies${BR}2. Wings of Fire by A. P. J. Abdul Kalam — 5 copies${BR}3. Concise English–Hindi Dictionary — 8 copies\n\n*Kindly deliver the books by 10 November and ensure that they are in good condition. Payment will be made by cheque on delivery. Please allow the usual educational discount.*`,
      n: 'Look at how compact an order letter can be. One sentence states the purpose. A numbered list gives each title, its edition, and the number of copies, so the supplier cannot misread it. Then three short sentences give the delivery date, the condition, the payment mode, and a request for a discount. Nothing else is needed, and the word count stays well within the limit.',
    }),
    sl('check', 'Check: put the format in order', {
      chk: 'fmt_order',
      n: 'Check yourself. Eight parts of a formal letter are shuffled. Put them back in the order they appear on the page, from the top. Remember where the subject line goes.',
    }),
    sl('check', 'Check: the right register', {
      chk: 'fmt_register',
      n: 'One more. Four possible closing sentences for a complaint. Only one is polite, firm and formal. Which would you sign your name under?',
    }),
    sl('concept', 'How your letter is marked', {
      b: 'Five marks, four criteria. Format alone is only one mark: content and expression earn the rest.',
      v: vRubricL,
      n: 'Here is how a letter is usually marked. One mark for the format, all parts in the right order. Two marks for content: every cue covered with specific details, a clear purpose and a clear request. One mark for organisation and expression: paragraphs, linking words and formal tone. And one mark for accuracy: grammar, spelling and the word limit.',
    }),
    sl('summary', 'Summary: the formal letter', {
      bl: [
        'Name the **type** first: complaint, editor, order or enquiry.',
        'Eight-part format; the subject comes before *Sir/Madam*.',
        'Body: purpose → details → action, two or three sentences each.',
        'Formal register: full forms, polite requests, no slang or exclamations.',
        'Use every cue in the question, and the names and addresses it gives.',
      ],
      v: vFormat,
      n: 'To sum up. Decide the letter type first, because it sets your opening and tone. Lay out the eight parts in order, with the subject before the salutation. Write three short paragraphs: purpose, details, action. Keep the register formal, with full forms and polite requests. And make sure every cue in the question appears in your letter.',
    }),
    sl('exam-tips', 'Exam tips: the formal letter', {
      bl: [
        'Plan for one minute: type, subject, one line per paragraph.',
        'Tick off each cue from the question as you use it; missing cues cost content marks.',
        'Do not invent new addresses or names: use the ones given (or write "Examination Hall" if told to).',
        'Stay near 120 words: a long letter loses accuracy and time, not gains marks.',
        'Common slips: no date; subject after the salutation; *Yours faithfully* misspelt; *Dear friend*; contractions.',
      ],
      n: 'Exam tips. Plan for a minute before you write. Tick off every cue in the question as you use it, because missing cues are the commonest way to lose content marks. Use the names and addresses the question gives. Stay close to the word limit. And watch the usual slips: a missing date, the subject placed after Sir or Madam, and faithfully spelt wrongly.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Writing Skills — Part 2: The Analytical Paragraph',
  goals: [
    'Read a chart, graph, table, map or set of cues quickly and accurately',
    'Write an introduction and a one-sentence overview of the main trend',
    'Describe and compare key figures with accurate trend and comparison language',
    'Draw a conclusion from the data without adding opinions',
  ],
  slides: [
    sl('title', 'Writing Skills — Part 2: The Analytical Paragraph', {
      b: 'The analytical paragraph (5 marks, 100–120 words) asks you to **describe, compare and conclude** from a visual input or cues. It is not an opinion essay.',
      v: vBoard,
      n: 'Welcome to Part Two, the analytical paragraph. You are given a chart, a graph, a table, a map, or a set of cues, and you write one well-organised paragraph that describes the information, compares the important figures, and draws a conclusion. It is not an essay about your opinions. Think of yourself as a reporter explaining the data to someone who cannot see it.',
    }),
    sl('diagram', 'Five moves of an analytical paragraph', {
      b: 'Every paragraph, whatever the input, makes the same five moves.',
      v: vParaFlow,
      n: 'Every analytical paragraph makes five moves. First, an introduction: what the input shows, where and when. Second, an overview: the big picture in one sentence. Third, the key figures, grouped sensibly rather than listed. Fourth, comparisons and any exception that breaks the pattern. Fifth, a conclusion that follows from the data. Learn these five moves and you will never stare at a blank page.',
    }),
    sl('concept', 'Read the input for one minute first', {
      b: 'Before writing, find: the title and source, the axes or columns and their **units**, the period, the highest and lowest values, the biggest change, and anything that breaks the pattern.',
      v: vRead,
      n: 'Before you write a word, read the input for one minute. Check the title, and what each axis or column measures, including the unit: lakh, per cent, millimetres. Note the time period. Then find the highest and lowest values, the biggest change, and the odd one out. These five or six facts are the skeleton of your paragraph.',
    }),
    sl('concept', 'The language of trends', {
      b: 'Match the word to the **shape and speed** of the change: *rose slightly* for 100 → 104, *soared* only for a dramatic jump.',
      v: vTrend,
      n: 'Your marks for expression depend on precise trend language. For a rise, use rose, increased or climbed, and for a dramatic jump, soared. For a fall, use fell or declined, and for a sudden crash, plummeted. A peak is the highest point. Remained stable means no change, and fluctuated means up and down. Add an adverb, sharply, steadily or slightly, that matches the size of the change.',
    }),
    sl('concept', 'The language of comparison', {
      b: 'Rose **by** = size of change; rose **to** = final value. A difference between two percentages is in **percentage points**.',
      v: vCompare,
      n: 'Comparison language turns description into analysis. Use by for the size of a change and to for the final value. Use ratios like twice as many, and proportions like a quarter or the majority. Use whereas and in contrast to set two trends side by side. And when two percentages differ, say percentage points: from twenty to thirty per cent is a rise of ten points.',
    }),
    sl('example', 'Worked example 1: reading a bar chart', {
      b: 'Visitors to the State Heritage Museum, 2019–2025 (lakh).',
      v: vMuseum,
      bl: [
        '**Overview:** a collapse in 2020, then steady recovery beyond the 2019 level.',
        '**Key figures:** 4.2 → 1.1 (about a quarter) → 1.8 → 3.5 (nearly double) → 4.8 → 6.1 (peak).',
        '**Comparison:** 2023 overtakes 2019; 2025 is almost one and a half times 2019.',
      ],
      n: 'Let us read this bar chart together. The unit is lakh visitors, from twenty nineteen to twenty twenty-five. The big picture: a collapse in twenty twenty, then a steady recovery that goes beyond the starting level. The key figures are the fall from four point two to one point one, the near doubling in twenty twenty-two, and the peak of six point one at the end.',
    }),
    sl('example', 'Worked example 1: the finished paragraph', {
      b: '*The bar chart shows the number of visitors to the State Heritage Museum between 2019 and 2025. **Overall, visitor numbers collapsed in 2020 but then recovered steadily, finally exceeding the 2019 level.** In 2019 the museum received 4.2 lakh visitors. This figure plunged to just 1.1 lakh in 2020, roughly a quarter of the previous year\'s total. Recovery was slow at first, with 1.8 lakh in 2021, before numbers nearly doubled to 3.5 lakh in 2022. By 2023 attendance (4.8 lakh) had overtaken the 2019 figure, and it went on rising to a peak of 6.1 lakh in 2025. In conclusion, the museum has more than recovered from its sharp fall.*',
      n: 'Here is the finished paragraph. The first sentence introduces the chart. The second, in bold, is the overview. Then the figures follow in time order, each with a comparison: roughly a quarter, nearly doubled, overtaken. The verbs vary: plunged, recovered, rising to a peak. And the conclusion sums up without inventing reasons, because the chart does not tell us why the numbers fell.',
    }),
    sl('check', 'Check: pick the overview', {
      chk: 'ap_overview',
      n: 'Your turn. A town’s population rose from two lakh to five lakh in twenty years. Which sentence gives the big picture, rather than a detail, an opinion or a vague statement?',
    }),
    sl('concept', 'Tables and surveys: group, do not list', {
      b: 'A table may have ten or more numbers. Choose three or four that tell the story, and **group** them: what rose, what fell, what changed most, what stayed the same.',
      v: vTravel,
      n: 'Tables tempt students to read out every number in order. Resist that. Instead, group the rows. In this travel survey, walking and cycling fell, while cars, two-wheelers and the school bus rose. Pick the biggest changes for detail: walking almost halved, and private vehicles more than doubled. Mention the small change, public transport, in one short clause.',
    }),
    sl('example', 'Worked example 2: a table in four sentences', {
      bl: [
        '**Overview:** *The clear trend is a shift away from walking and cycling towards motorised transport.*',
        '**Falls:** *Walking almost halved, from 35 to 18 per cent, while cycling fell from 30 to 22 per cent.*',
        '**Rises:** *Private cars or two-wheelers more than doubled, from 10 to 24 per cent, and the school bus rose from 20 to 28 per cent, becoming the most popular choice.*',
        '**Conclusion:** *Students today depend far more on vehicles than they did a decade ago.*',
      ],
      n: 'Here is the table turned into four strong sentences. One overview sentence names the shift. One sentence groups the falls, and one groups the rises, each with figures and a comparison word: almost halved, more than doubled. The conclusion sums up the decade. Add an introduction and the public transport detail, and you have a full paragraph of about one hundred and twenty words.',
    }),
    sl('check', 'Check: by or to?', {
      chk: 'ap_fb_by_to',
      n: 'Quick check. The price of tomatoes went from forty to sixty rupees. Fill in by for the size of the change and to for the final price. Then check your answer.',
    }),
    sl('concept', 'Maps, plans and cues', {
      b: 'For a **then-and-now map or plan**, pair each change and group by theme (education, water, roads…). For **cues**, use every cue once, link them logically, and add a balanced conclusion.',
      v: vVillage,
      n: 'Some questions give a map or plan of a place then and now, or a list of cues. For a then and now input, pair each old feature with the new one and group them by theme. Use the past for the old picture and the present or present perfect for today. For cues, use every cue once, link them with words like however and similarly, and finish with a balanced conclusion.',
    }),
    sl('example', 'Worked example 3: from a then-and-now table to a plan', {
      bl: [
        '**Intro + overview:** Sundarpur, 2006 vs 2026; improvement in every area shown.',
        '**Education:** school up to Class 5 → up to Class 12.',
        '**Water and health:** one hand pump → piped water to 80% of homes; clinic 15 km away → health centre in the village.',
        '**Road and internet:** kutcha track → paved road to the highway; mobile tower and a library with Wi-Fi.',
        '**Conclusion:** *Clearly, Sundarpur has transformed.*',
      ],
      n: 'Here is a plan for the Sundarpur table. After the introduction and overview, group the changes into three themes: education, then water and health, then roads and the internet. Each theme pairs the old with the new, using linking words such as but, similarly and too. Finish with a short conclusion. The full model paragraph is in the practice bank.',
    }),
    sl('check', 'Check: correlation is not cause', {
      chk: 'ap_ar2',
      n: 'Think carefully about this one. If two figures rise together, can your paragraph say that one causes the other? Decide whether the assertion and the reason are true.',
    }),
    sl('concept', 'How the analytical paragraph is marked', {
      b: 'Content carries most of the marks: an overview and **accurate, selected** figures with comparisons. Opinions and invented reasons lose marks.',
      v: vRubricP,
      n: 'Here is how the paragraph is usually marked. Three marks for content: an introduction, an overview, key figures with their units, comparisons, and a conclusion that follows from the data. One mark for organisation and expression, including varied trend language. One mark for accuracy, which includes quoting figures correctly and keeping out personal opinions.',
    }),
    sl('summary', 'Summary: the analytical paragraph', {
      bl: [
        'Read for one minute: title, units, period, highest, lowest, biggest change, exception.',
        'Five moves: introduction → overview → key figures → comparisons → conclusion.',
        'Precise trend words and adverbs; *by* vs *to*; percentage points.',
        'Group and select; never list every number.',
        'Stay inside the data — no opinions, invented causes or advice.',
      ],
      v: vParaFlow,
      n: 'To sum up. Read the input for a minute before writing. Make the five moves: introduction, overview, key figures, comparisons and conclusion. Use precise trend and comparison language, including by and to, and percentage points. Select and group the figures instead of listing them all. And stay inside the data, with no opinions, invented causes or advice.',
    }),
    sl('exam-tips', 'Exam tips: the analytical paragraph', {
      bl: [
        'Write **one** paragraph of about 100–120 words; a short title is optional.',
        'Quote figures exactly, **with units**; check every calculation you mention.',
        'Use the simple past for past years, the present for what the chart shows.',
        'Do not start with *I* or with a general remark about the topic; start with the input.',
        'Common slips: no overview; all numbers listed; *rose by* / *rose to* confused; opinions; wrong units.',
      ],
      n: 'Exam tips. Write a single paragraph of about one hundred and twenty words. Quote figures exactly, with their units, and check any calculation you mention, like doubled or a quarter. Use the simple past for past years. Begin with the input, never with I. And avoid the classic slips: no overview, listing every number, confusing by and to, and adding your own opinions.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Writing Skills — Class 10 board notes',
  sections: [
    {
      h: '1. The writing section at a glance',
      t: [1, 2],
      b: 'Section B of the CBSE Class 10 English paper includes **two writing tasks of 5 marks each**, each with an internal choice (A or B): a **formal letter** (complaint, letter to the editor, placing an order, enquiry) and an **analytical paragraph** on a chart, graph, table, map or set of cues. Each should be about **100–120 words**.\n\nPlan for one minute before writing. Both tasks reward a fixed structure, accurate language and complete coverage of the cues.',
      v: vBoard,
    },
    {
      h: '2. Formal letter: format',
      t: 1,
      b: `Eight parts, top to bottom:\n\n1. Sender's address (short, with PIN code)\n2. Date (*27 October 2026*)\n3. Receiver's designation and address\n4. **Subject:** 5–10 words, with a reference number if any\n5. Salutation: *Sir/Madam,*\n6. Body: three paragraphs\n7. Complimentary close: *Yours faithfully* (*Yours sincerely* also accepted)\n8. Name, and designation if writing for a school or group\n\nUse the names and addresses given in the question.`,
      v: vFormat,
      terms: [
        ['Salutation', 'The greeting before the body: *Sir/Madam,* in a formal letter.'],
        ['Complimentary close', 'The phrase before the name: *Yours faithfully* / *Yours sincerely*.'],
      ],
    },
    {
      h: '3. Formal letter: body and register',
      t: 1,
      b: '**Paragraph 1 — purpose:** why you are writing (*I am writing to complain about… / I wish to bring to your notice… / Through the columns of your newspaper…*).\n\n**Paragraph 2 — details:** facts, figures and effects (complaint, editor); a numbered list of items with specifications and quantities (order); specific polite questions (enquiry: *Kindly let me know whether…*).\n\n**Paragraph 3 — action:** what you want, by when, and a courteous close (*I request you to… / I look forward to an early reply.*).\n\n**Register:** full forms (*do not*), neutral words (*goods, delivery person*), polite firm requests; no slang, contractions, exclamation marks or emotional demands.',
      v: vBody,
      vs: [vTypes],
      terms: [['Register', 'The level of formality of language. Formal letters use a formal register.']],
    },
    {
      h: '4. Model letter of complaint',
      t: 1,
      b: MODEL_LETTER,
      terms: [['Word count', 'About 120 words including the format lines; the body is about 90 words.']],
    },
    {
      h: '5. Analytical paragraph: structure and reading',
      t: 2,
      b: '**Five moves:** introduction (what the input shows, where, when) → overview (the main trend in one sentence) → key figures, grouped → comparisons and exceptions → conclusion drawn from the data.\n\n**Read for one minute first:** title and source; axes, columns and **units**; period; highest and lowest values; the biggest change; anything that breaks the pattern.\n\n**For tables and surveys:** group rows (what rose, what fell) and select 3–4 key figures. **For maps or then-and-now plans:** pair old and new features and group them by theme. **For cues:** use each cue once, link them, and end with a balanced conclusion.',
      v: vParaFlow,
      vs: [vRead],
      terms: [['Overview', 'One sentence that states the main trend or pattern of the whole input, near the start of the paragraph.']],
    },
    {
      h: '6. Analytical paragraph: language',
      t: 2,
      b: '**Trends:** rose, increased, climbed, soared; fell, declined, plummeted; peaked at; remained stable, levelled off; fluctuated — with *sharply, steadily, gradually, slightly*.\n\n**Comparison:** *by* (size of change) vs *to* (final value); *twice / three times as many as*; *a quarter, a third, the majority*; *whereas, while, in contrast*; **percentage points** for the difference between two percentages.\n\n**Tense:** simple past for past data (*sales rose*), present for what the input shows (*the table shows*), *may / might* for cautious predictions.',
      vs: [vTrend, vCompare],
      terms: [
        ['Percentage point', 'The arithmetic difference between two percentages: 20% → 30% is a rise of 10 percentage points (a 50 per cent increase).'],
        ['Plateau', 'A period when a value stays roughly the same.'],
      ],
    },
    {
      h: '7. How both tasks are marked',
      t: [1, 2],
      b: 'SOYL rubrics, modelled on the CBSE marking pattern for 5-mark writing tasks:\n\n- **Letter:** Format 1 · Content 2 · Organisation and expression 1 · Accuracy 1.\n- **Analytical paragraph:** Content 3 · Organisation and expression 1 · Accuracy 1.\n\nContent marks depend on covering every cue (letter) or giving an overview, accurate key figures and comparisons (paragraph). Opinions, invented causes and wrong figures lose accuracy and content marks.',
      vs: [vRubricL, vRubricP],
    },
  ],
  tips: '**Marks:** formal letter 5 + analytical paragraph 5 (Section B, CBSE 2026-27), each about 100–120 words with a choice of two.\n\n**How marks are awarded:** letter — format 1, content 2, organisation and expression 1, accuracy 1; analytical paragraph — content 3, organisation and expression 1, accuracy 1 (SOYL rubric modelled on the CBSE pattern).\n\n**Common mistakes — letter**\n1. Missing date, or the subject placed after the salutation.\n2. Informal openings and closes (*Hi*, *Dear friend*, *Yours lovingly*).\n3. Cues from the question left out.\n4. Contractions, slang and exclamation marks.\n\n**Common mistakes — analytical paragraph**\n1. No overview; every number listed in order.\n2. Figures without units, or misquoted; *by / to* confused.\n3. Personal opinions, invented causes, or advice to the government.\n4. Exaggerated trend words (*soared* for a 4 per cent rise).\n\n**Time:** about 12–15 minutes for each task, including one minute of planning and one minute of checking.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Four types of formal letter in the CBSE Class 10 syllabus', 'Complaint, letter to the editor, placing an order, enquiry.', 'fact', 1],
  ['Eight parts of a formal letter, in order', "Sender's address → date → receiver's address → subject → salutation → body → complimentary close → name.", 'concept', 1],
  ['Where does the subject line go?', 'After the receiver\'s address and **before** the salutation.', 'exam-tip', 1],
  ['Salutation for a formal letter', '*Sir/Madam,* (or *Dear Sir/Madam,*).', 'fact', 1],
  ['Complimentary close for a formal letter', '*Yours faithfully* (CBSE also accepts *Yours sincerely*).', 'fact', 1],
  ['Three paragraphs of the body', 'Purpose → details → action.', 'concept', 1],
  ['A good subject line…', 'names the problem or purpose in 5–10 words, with a reference number if there is one.', 'concept', 1],
  ['Opening for a letter to the editor', '*Through the columns of your newspaper, I wish to draw attention to…*', 'example', 1],
  ['Formal way to ask a question in an enquiry', '*Kindly let me know whether…* / *I would be grateful if you could inform me…*', 'example', 1],
  ['How to present items in an order letter', 'A numbered list: item, specification, quantity; then delivery, payment, discount.', 'concept', 1],
  ['Formal version of "Fix it ASAP!"', '*Kindly resolve the matter at the earliest.*', 'example', 1],
  ['Three things to avoid in formal register', 'Contractions (*I\'m*), slang (*super, stuff*), exclamation marks and demands.', 'exam-tip', 1],
  ['Letter rubric (SOYL, CBSE pattern)', 'Format 1 · Content 2 · Organisation and expression 1 · Accuracy 1.', 'exam-tip', 1],
  ['Who is the real audience of a letter to the editor?', 'The newspaper\'s readers and the authorities — so focus on the public issue and suggestions.', 'concept', 1],
  ['Five moves of an analytical paragraph', 'Introduction → overview → key figures → comparisons/exceptions → conclusion.', 'concept', 2],
  ['What is an overview?', 'One sentence giving the main trend of the whole input, near the start.', 'definition', 2],
  ['Read a chart for one minute: what to find', 'Title, axes/columns and units, period, highest, lowest, biggest change, exception.', 'exam-tip', 2],
  ['*Rose by* vs *rose to*', '*by* = size of change (rose by ₹20); *to* = final value (rose to ₹60).', 'concept', 2],
  ['20% → 30% is a rise of…', '10 **percentage points** (a 50 per cent increase).', 'concept', 2],
  ['Verb for a very sudden, steep fall', '*plummeted* (also *plunged*).', 'definition', 2],
  ['Phrase for no change', '*remained stable / levelled off / stayed constant*.', 'definition', 2],
  ['Highest point on a graph', 'a *peak* (*peaked at*).', 'definition', 2],
  ['Three proportion phrases', '*a quarter, a third, the majority* (more than half).', 'example', 2],
  ['Tense for past data', 'Simple past: *Sales rose in 2023.* Present for *The chart shows…*', 'concept', 2],
  ['Should an analytical paragraph give your opinion?', 'No. Describe, compare and conclude from the data only.', 'exam-tip', 2],
  ['Two figures rose together. Can you say one caused the other?', 'No — say they rose together; the data does not prove a cause.', 'exam-tip', 2],
  ['How to handle a big table', 'Group rows (rises, falls) and select 3–4 key figures; never list every number.', 'exam-tip', 2],
  ['How to handle a then-and-now map or plan', 'Pair old and new features, group by theme; past for then, present / present perfect for now.', 'concept', 2],
  ['Analytical paragraph rubric (SOYL, CBSE pattern)', 'Content 3 · Organisation and expression 1 · Accuracy 1.', 'exam-tip', 2],
  ['Word limit for both writing tasks', 'About 100–120 words each.', 'fact', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  title: 'Chapter test (short) — Writing Skills',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Formal letter (5 marks)', instr: 'Attempt any one in 100–120 words.', items: [{ attempt: 1, keys: ['let_table', 'let_enquiry_camp'] }] },
    { id: 'B', title: 'Section B — Analytical paragraph (5 marks)', instr: 'Attempt any one in 100–120 words.', items: [{ attempt: 1, keys: ['par_phones', 'par_ev'] }] },
    { id: 'C', title: 'Section C — Objective questions (1 mark each)', instr: 'Answer all questions.', items: ['fmt_subject', 'fmt_close', 'fmt_register', 'fmt_purpose', 'fmt_fb_phrase', 'ap_overview', 'ap_verb', 'ap_adverb', 'ap_fb_by_to', 'ap_tf_all'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  title: 'Chapter test (long) — Writing Skills',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Formal letters (5 marks each)', instr: 'Attempt one question from each pair, in 100–120 words.', items: [{ attempt: 1, keys: ['let_garbage', 'let_editor_noise'] }, { attempt: 1, keys: ['let_order_books', 'let_enquiry_tour'] }] },
    { id: 'B', title: 'Section B — Analytical paragraphs (5 marks each)', instr: 'Attempt one question from each pair, in 100–120 words.', items: [{ attempt: 1, keys: ['par_travel', 'par_rain'] }, { attempt: 1, keys: ['par_village', 'par_power'] }] },
    { id: 'C', title: 'Section C — Short answers (2 marks each)', instr: 'Attempt any 5 of the 6 questions.', items: [{ attempt: 5, keys: ['fmt_short_subject', 'fmt_short_rewrite', 'fmt_short_errors', 'ap_short_overview', 'ap_short_compare', 'ap_short_conclusion'] }] },
    { id: 'D', title: 'Section D — Editing a draft letter (5 marks)', instr: 'Read the draft and answer all parts.', items: ['case_draft_letter'] },
    { id: 'E', title: 'Section E — Objective questions (1 mark each)', instr: 'Answer all questions.', items: ['fmt_ar', 'fmt_ar2', 'ap_ar', 'ap_compare', 'ap_percentpoint'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (formal letter: complaint / editor / order / enquiry) and t02 (analytical paragraph) only; no removed topics for 2026-27',
    originality: 'every task, data set, name, address and model answer written for this chapter; data sets are illustrative and labelled so; no board-paper or textbook task reused',
    data_checks: 'every ratio, fraction, percentage-point and total quoted in a model answer recomputed from its data set',
    re_solve: 'author verifier pass: every objective item re-answered from its stem; every model answer checked against its cues, word limit and rubric',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
