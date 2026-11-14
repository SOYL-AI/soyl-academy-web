// Build CBSE 11 English Core ch03 Creative Writing. Run from platform/:
//   npx tsx content/authored/english-language/cbse-11-english-core-ch03/src/build.mjs
// Every task, name, address, phone number and model is SOYL's own writing and plainly fictional.
// Not a literature chapter, so no guard call.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-english-core-ch01/src/lib.mjs';

setUnit('cbse-11-english-core-ch03', 'english-language');
const { AD_RUBRIC, POSTER_RUBRIC, SPEECH_RUBRIC, DEBATE_RUBRIC } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BR = '  \n';
const lines = (...l) => l.join(BR);
const paras = (...p) => p.join('\n\n');

// ---------------------------------------------------------------- visuals
const vPattern = table(
  ['Task in the school paper', 'Length', 'Marks'],
  [
    ['Classified advertisement (choice of two)', 'up to 50 words', '3'],
    ['Poster (choice of two)', 'up to 50 words', '3'],
    ['Speech (choice of two)', '120-150 words', '5'],
    ['Debate (choice of two)', '120-150 words', '5'],
    ['Creative writing total', '', '16'],
  ],
  'Table of the creative writing tasks in the Class 11 school paper: a classified advertisement and a poster of up to fifty words for three marks each, and a speech and a debate of one hundred and twenty to one hundred and fifty words for five marks each, sixteen marks in all.',
  'Class 11 has no board exam: this is the school annual examination pattern.',
);
const vCats = table(
  ['Column', 'Heading', 'What the reader looks for first'],
  [
    ['Things you sell', 'FOR SALE', 'the item, its condition and the price'],
    ['Homes and shops for rent', 'TO LET', 'size, locality, rent, facilities'],
    ['Jobs', 'SITUATION VACANT', 'the post, qualifications, salary, how to apply'],
    ['Missing or found things', 'LOST / FOUND', 'description, place and time, whom to call'],
    ['Classes and coaching', 'TUITION', 'subjects, classes, quality, place'],
  ],
  'Table of five classified columns with their heading and the details a reader looks for first: for sale, to let, situation vacant, lost and found, and tuition.',
  'Matrimonial advertisements are not part of this syllabus task.',
);
const vAnatomy = flow('LR', ['Heading', 'Item or post', 'Key details', 'Price or terms', 'Place', 'Contact line'], 'Flow of the six parts of a classified advertisement: heading, item or post, key details, price or terms, place, and contact line.', 'Read left to right; keep every part short.');
const vTrim = table(
  ['Wordy', 'Classified style'],
  [
    ['I would like to inform you that I wish to sell', '(delete; the heading says FOR SALE)'],
    ['which is in a very good working condition', 'good working condition'],
    ['may kindly contact me on the following number', 'Contact:'],
    ['available at a price of rupees six thousand', '₹6,000'],
  ],
  'Table that turns wordy phrases into classified style: delete the announcing sentence, shorten the condition, replace the request with the word Contact, and write the price as a figure.',
);
const vCats2 = table(
  ['Category', 'Typical short phrases', 'Detail that is easy to forget'],
  [
    ['Situation vacant', 'Graduate; experience preferred; salary; apply in person', 'last date or interview day'],
    ['Lost', 'brown, 8 months old, red collar; reward', 'where and when it was lost'],
    ['Found', 'owner may claim by describing the contents', 'one detail kept back for proof'],
    ['Tuition', 'small batches; weekly tests; free demo class', 'classes and board covered'],
  ],
  'Table of four classified categories with typical short phrases and a detail that is easy to forget: last date for a vacancy, place and time for a lost item, a withheld detail for a found item, and the classes covered for a tuition advertisement.',
);
const vPosterEss = table(
  ['Element', 'Why it is there'],
  [
    ['Bold title', 'tells a passer-by the subject at a glance'],
    ['Slogan', 'a catchy line that stays in the mind'],
    ['Date, time, venue', 'so people can actually come'],
    ['Who may join, what to bring', 'removes doubt'],
    ['Organiser and contact', 'builds trust and lets people ask'],
    ['Picture or border (visual appeal)', 'draws the eye; in the exam, say what you would draw'],
  ],
  'Table of the elements of a poster: bold title, slogan, date, time and venue, who may join, organiser and contact, and a picture or border for visual appeal.',
);
function posterSvg() {
  const s = new Svg(360, 430);
  s.rect(20, 10, 320, 410, { sw: 2.5, rx: 6 });
  s.rect(35, 25, 290, 60, { fill: 'fill', rx: 4 }).text(180, 55, 'TITLE: bold, large, one line', { bold: true, size: 15 });
  s.rect(35, 95, 290, 36, { rx: 4 }).text(180, 113, 'Slogan: short, catchy', { italic: true, size: 14 });
  s.rect(35, 141, 290, 100, { dash: true, rx: 4 }).text(180, 191, 'Picture or border (say what you draw)', { muted: true, size: 13 });
  s.rect(35, 251, 290, 90, { rx: 4 });
  s.text(180, 273, 'Date and time', { size: 14 }).text(180, 295, 'Venue', { size: 14 }).text(180, 317, 'Who may join; what to bring', { size: 14 });
  s.rect(35, 351, 290, 56, { fill: 'fill', rx: 4 }).text(180, 372, 'Organiser', { size: 14 }).text(180, 392, 'Contact', { size: 14 });
  return s.visual('Diagram of a poster in five zones from top to bottom: bold title, slogan, picture or border, a block with date and time, venue and who may join, and a strip with organiser and contact.', 'Poster layout zones, top to bottom.');
}
const vPosterSvg = posterSvg();
const vWeakStrong = table(
  ['Weak poster', 'Strong poster'],
  [
    ['Come and enjoy!!! Fun for all!!!', 'Dates, time and venue, each on its own line'],
    ['One long paragraph', 'Short lines with space between them'],
    ['No organiser or contact', 'Organiser named; one contact line'],
    ['Borrowed slogan', 'An original slogan that fits the cause'],
  ],
  'Table that compares a weak poster with a strong one: a vague call against exact details, a paragraph against short lines, no organiser against a named organiser, and a borrowed slogan against an original one.',
);
const vAdRub = table(
  ['Criterion', 'Marks', 'What earns it'],
  AD_RUBRIC.map(([c, m, d]) => [c, String(m), d]),
  'Table of the SOYL rubric for a classified advertisement: format and layout half a mark, content one and a half marks, expression one mark.',
  'SOYL rubric for 3-mark tasks; the same split is used for the poster.',
);
const vPosterRub = table(
  ['Criterion', 'Marks', 'What earns it'],
  POSTER_RUBRIC.map(([c, m, d]) => [c, String(m), d]),
  'Table of the SOYL rubric for a poster: format and layout half a mark, content one and a half marks, expression one mark.',
);
const vPlanTree = table(
  ['Zone', 'Content for the tree plantation poster'],
  [
    ['Title', 'PLANT A TREE, GROW A FUTURE'],
    ['Slogan', 'Dig a little, breathe a lot'],
    ['Facts', 'Sunday, 21 July, 7 am; Jubilee Park gate'],
    ['Who and what', 'students and families; saplings and gloves provided'],
    ['Organiser, contact', 'Green Brigade, Jubilee School; 98XXXXXX10'],
  ],
  'Table that plans a tree plantation poster by zone: title, slogan, facts, who may join and what is provided, and organiser and contact.',
);
// Part 2
const vOcc = table(
  ['Occasion', 'Audience', 'Tone'],
  [
    ['School assembly', 'students and teachers', 'lively, direct, simple'],
    ['Farewell or welcome', 'seniors, guests, staff', 'warm, thankful, formal'],
    ['Parents\' meeting', 'parents and teachers', 'respectful, practical'],
    ['Debate', 'chair, judges, opponents', 'firm, polite, persuasive'],
  ],
  'Table of speech occasions with the audience and tone: school assembly, farewell or welcome, parents\' meeting, and debate.',
);
const vSpeechFlow = flow('TB', ['Salutation', 'Opening: hook the listeners', 'Body: two or three points with examples', 'Conclusion: call to action', 'Thanks'], 'Flow of the five parts of a speech from top to bottom: salutation, opening hook, body with points and examples, conclusion with a call to action, and thanks.', 'Speech: 120-150 words.');
const vDevices = table(
  ['Device', 'Sample sentence', 'Effect'],
  [
    ['Rhetorical question', 'Who will plant the first tree?', 'makes listeners think'],
    ['Repetition (three)', 'We can learn, we can lead, we can change.', 'rhythm and emphasis'],
    ['Direct address', 'Friends, look around you.', 'involves the audience'],
    ['Contrast', 'Not words but deeds.', 'sharpens the point'],
  ],
  'Table of four speech devices with a sample sentence and its effect: rhetorical question, repetition in threes, direct address, and contrast.',
);
const vPlanPunct = table(
  ['Part', 'Plan for a speech on punctuality'],
  [
    ['Salutation', 'Good morning, respected Principal, teachers and friends'],
    ['Opening', 'a question: who has run the last hundred metres to the gate?'],
    ['Body', 'point 1: time is shared (a late student delays the class); point 2: habit builds character; example: a train that does not wait'],
    ['Conclusion', 'set the alarm ten minutes early tomorrow'],
    ['Thanks', 'Thank you'],
  ],
  'Table that plans a speech on punctuality: salutation, a question as the opening, two points with an example as the body, a call to set the alarm earlier as the conclusion, and thanks.',
);
const vDebateFlow = flow('TB', ['Address the chair, judges and the House', 'State your stand on the motion', 'Argument 1 with support', 'Argument 2 with support', 'Rebuttal of the other side', 'Conclusion and thanks'], 'Flow of the six parts of a debate speech: address, stand, first argument, second argument, rebuttal, and conclusion with thanks.', 'Debate: 120-150 words.');
const vRebuttal = table(
  ['Their claim', 'Your reply', 'Support'],
  [
    ['Uniforms hide individuality', 'Character shows in conduct, not clothes', 'a student known for kindness, not for her shoes'],
    ['Uniforms are costly', 'One set lasts a year; fashion changes monthly', 'compare the cost of casual wear'],
    ['Rules limit freedom', 'Shared rules give everyone equal footing', 'no one is judged by brand'],
  ],
  'Table of three opposing claims about school uniforms with a reply and a support for each: individuality, cost, and freedom.',
  'Pattern: accept what is fair, answer the exact claim, support the reply.',
);
const vPlanUniform = table(
  ['Part', 'Plan: for the motion "Uniforms should be compulsory"'],
  [
    ['Address and stand', 'chair, judges, opponents; in favour of the motion'],
    ['Argument 1', 'equality: no one judged by clothes'],
    ['Argument 2', 'time and money saved on daily choice'],
    ['Rebuttal', 'individuality: shown in conduct, not clothing'],
    ['Conclusion', 'restate stand; appeal; thanks'],
  ],
  'Table that plans a debate speech for school uniforms: address and stand, equality as the first argument, time and money as the second, a rebuttal on individuality, and a closing appeal.',
);
const vSpeechVsDebate = table(
  ['', 'Speech', 'Debate'],
  [
    ['Aim', 'inform, inspire or welcome', 'persuade the House on a motion'],
    ['Address', 'audience present', 'chair, judges, opponents, House'],
    ['Parts', 'hook, body, call to action', 'stand, arguments, rebuttal, appeal'],
    ['Tone', 'warm, vivid', 'firm, polite'],
    ['Length', '120-150 words', '120-150 words'],
  ],
  'Table that compares a speech with a debate: aim, address, parts, tone and length.',
);
const vSpeechRub = table(
  ['Criterion', 'Marks', 'What earns it'],
  SPEECH_RUBRIC.map(([c, m, d]) => [c, String(m), d]),
  'Table of the SOYL rubric for a speech: format one mark, content two marks, expression two marks.',
  'SOYL rubric for 5-mark tasks; the debate uses the same split.',
);
const vDebateRub = table(
  ['Criterion', 'Marks', 'What earns it'],
  DEBATE_RUBRIC.map(([c, m, d]) => [c, String(m), d]),
  'Table of the SOYL rubric for a debate: format one mark, content two marks, expression two marks.',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Creative Writing — Part 1: Classified Advertisements and Posters',
  goals: [
    'Write a classified advertisement of up to 50 words in telegraphic style',
    'Choose the right heading and the essential details for each category',
    'Plan and write a poster with title, slogan, facts, organiser and contact',
    'Describe visual appeal in a text-only answer',
  ],
  slides: [
    sl('title', 'Creative Writing — Part 1: Advertisements and Posters', {
      b: 'In the school paper, creative writing carries **16 marks**: classified advertisement 3, poster 3, speech 5, debate 5, each with an internal choice. This part covers the two 50-word tasks; Part 2 covers the speech and the debate.',
      v: vPattern,
      n: 'Welcome to creative writing. In the school paper this section carries sixteen marks. A classified advertisement and a poster are worth three marks each, in up to fifty words. A speech and a debate are worth five marks each, in one hundred and twenty to one hundred and fifty words. Each has a choice. In this part we master the two short tasks.',
    }),
    sl('concept', 'What a classified advertisement is', {
      b: 'A short paid notice in a newspaper column, set under a **heading**. You may be asked for sale, to let, situation vacant, lost and found, or tuition notices.',
      v: vCats,
      n: 'A classified advertisement is a short paid notice, placed in a newspaper column under a heading. The syllabus asks for notices such as for sale, to let, situation vacant, lost and found, and tuition. Each column has its own heading and its own reader, who looks for particular details first. Matrimonial advertisements are not part of this task, so do not use them.',
    }),
    sl('two-column', 'Write like a classified: every word costs money', {
      cols: [
        '**Wordy (avoid)**\n\n- full sentences and greetings\n- *I would like to inform you that…*\n- praise: *wonderful, very nice*\n- long explanations of why you are selling',
        '**Classified style (use)**\n\n- short phrases, no greetings\n- heading says the rest\n- facts: size, age, condition, price\n- contact line at the end',
      ],
      v: vTrim,
      n: 'Newspapers charge by the word, so every extra word costs the advertiser money. Drop the greetings and the announcing sentences, because the heading already says what the notice is. Replace praise with facts: size, age, condition, price. End with a contact line. The table shows four wordy phrases and their classified versions.',
    }),
    sl('diagram', 'The parts of a classified advertisement', {
      b: 'Heading in capitals; then item or post; key details; price or terms; place; **Contact:** line. Abbreviations are fine only if readers know them, such as *2BHK*.',
      v: vAnatomy,
      n: 'Here are the parts of a classified advertisement. A heading in capitals. Then the item or the post. Then the key details. Then the price or terms, then the place, and last a contact line. You may use shorthand that every reader knows, like two B H K for a flat, but never invent your own abbreviations, because readers will have to guess.',
    }),
    sl('example', 'Worked example 1: planning a Wanted advertisement', {
      b: '*Task:* Mrs Kulkarni of Bhopal wants to buy a second-hand sewing machine, working, up to ₹4,000, and will collect it herself.',
      bl: [
        '**Heading:** WANTED',
        '**Item and condition:** second-hand sewing machine, in working order, hand or electric',
        '**Terms:** budget up to ₹4,000; buyer collects',
        '**Place:** anywhere in Bhopal',
        '**Contact:** Mrs Kulkarni, with a number in the form 98XXXXXX10',
      ],
      n: 'Plan first. Choose the heading, here Wanted. Then list the item and its condition, the terms, the place, and the contact. This takes one minute. Notice that every line is a fact a seller needs. There is no greeting, and no sentence about why the machine is wanted, because that would cost words and help nobody.',
    }),
    sl('example', 'Worked example 1: the finished advertisement', {
      b: lines('**WANTED**', 'Second-hand sewing machine, hand-operated or electric, in working order. Budget up to ₹4,000. Buyer will collect from anywhere in Bhopal.', 'Contact: Mrs Kulkarni, 98XXXXXX10'),
      n: 'Here is the finished advertisement. It has a heading, the item with its condition, the budget, the place, and the contact line. It is about thirty words, well inside the limit of fifty. Count the words yourself, including the heading, because the examiner does. If you have words to spare, add a useful fact, not decoration.',
    }),
    sl('check', 'Check: shorthand readers understand', {
      chk: 'm_abbr',
      n: 'Time to check yourself. Which of these abbreviations would readers understand at once in a to let advertisement? Remember the rule about shorthand.',
    }),
    sl('concept', 'Categories and the details people forget', {
      b: 'Each category has one detail that is easy to forget. Run a quick checklist before you write the contact line.',
      v: vCats2,
      n: 'Each category has a detail writers often forget. In a vacancy, the way to apply and the last date. In a lost notice, where and when the item was lost. In a found notice, keep one detail back, so that only the true owner can claim it. In a tuition notice, the classes and board covered. A quick checklist before the contact line saves marks.',
    }),
    sl('check', 'Check: match the column to the details', {
      chk: 'match_cat',
      n: 'Match each kind of advertisement with the details its reader needs most. Think about who is reading and what they would ask first.',
    }),
    sl('concept', 'What a poster must do', {
      b: 'A poster is read in seconds, so it gives **essential information** and has **visual appeal**. In the exam you show visual appeal in words: a bold title, short lines, and where a picture or border would go.',
      v: vPosterEss,
      n: 'A poster is read in a few seconds, by someone walking past. So it must give the essential information and it must catch the eye. Start with a bold title and a slogan. Then give date, time and venue, who may join, the organiser and a contact. In a text answer, show visual appeal with short lines, space, and a note on any picture or border.',
    }),
    sl('diagram', 'Poster layout zones', {
      b: 'Think in zones from top to bottom, and keep the whole text within 50 words, counting every word including the title.',
      v: vPosterSvg,
      n: 'Think of the poster in zones from top to bottom. The title is first and largest. The slogan sits below it. Then a picture or border, then a block with the date, time, venue and who may join. Last, a strip with the organiser and the contact. Plan the zones, then fill each with the fewest words, counting every word including the title.',
    }),
    sl('two-column', 'Weak poster, strong poster', {
      cols: [
        '**Weak**\n\n- *Come and enjoy!!! Fun for all!!!*\n- one long paragraph\n- no organiser or contact\n- borrowed slogan',
        '**Strong**\n\n- exact dates, time, venue on separate lines\n- short lines with space\n- organiser named, one contact\n- original slogan',
      ],
      v: vWeakStrong,
      n: 'Compare a weak poster with a strong one. The weak one shouts with exclamation marks but gives no facts. The strong one gives the exact date, time and venue on separate short lines, names the organiser and gives one contact. Its slogan is original and suits the cause. Short lines and space also make it look better.',
    }),
    sl('example', 'Worked example 2: planning a tree plantation poster', {
      b: '*Task:* The Green Brigade of Jubilee School will plant saplings on Sunday 21 July at 7 am at the Jubilee Park gate. Students and families may join.',
      v: vPlanTree,
      n: 'Plan by zones. The title is the message: plant a tree, grow a future. The slogan is a short original line. The facts are the day, date, time and the meeting point. Then who may join and what is provided, which removes doubts. Last, the organiser and a contact. Notice that the plan is a table of short lines, not sentences.',
    }),
    sl('example', 'Worked example 2: the finished poster', {
      b: lines('**PLANT A TREE, GROW A FUTURE**', '*Dig a little, breathe a lot*', 'Sunday, 21 July, 7 am', 'Meeting point: Jubilee Park gate', 'Saplings and gloves provided. Students and families welcome.', 'Organised by: Green Brigade, Jubilee School', 'Contact: 98XXXXXX10'),
      n: 'Here is the finished poster, written line by line. It has a title, a slogan, the date and time, the meeting point, who may join, the organiser and a contact. It is about forty words. If you are asked to show visual appeal, add a short note such as a border of leaves, but do not spend words on it.',
    }),
    sl('check', 'Check: what a poster needs', {
      chk: 'm_poster_ess',
      n: 'Which of these is least necessary on a poster announcing a school music evening? Think about what a passer-by can read in a few seconds.',
    }),
    sl('check', 'Check: the catchy line', {
      chk: 'fb_slogan',
      n: 'Fill in the blank. A short, catchy line on a poster that is easy to remember is called what? Then check your answer.',
    }),
    sl('concept', 'How the 3-mark tasks are marked', {
      b: 'Half a mark for format and layout, one and a half for content, one for expression. Content is the biggest share.',
      v: vAdRub,
      vs: [vPosterRub],
      n: 'Here is how a three mark task is usually marked. Half a mark for format and layout. One and a half marks for content: every essential detail present. One mark for expression: economical wording, correct grammar and the word limit. The poster uses the same split, with the slogan counted under expression.',
    }),
    sl('summary', 'Summary: advertisements and posters', {
      bl: [
        'Classified advertisement: heading, item, key details, price or terms, place, **Contact:** line.',
        'Short phrases; every word costs money; no greetings.',
        'Poster: bold title, slogan, date, time, venue, who may join, organiser, contact.',
        'Both: up to 50 words, counting every word including the heading.',
      ],
      v: vAnatomy,
      n: 'To sum up. A classified advertisement has a heading, the item, key details, price or terms, place and a contact line, all in short phrases. A poster has a bold title, a slogan, the date, time and venue, who may join, the organiser and a contact. Both must stay within fifty words, counting every word, and both reward facts over decoration.',
    }),
    sl('exam-tips', 'Exam tips: advertisements and posters', {
      bl: [
        'Plan for one minute; write the heading first.',
        'Count words, including the heading and the contact line.',
        'Use only the names and facts given; add small details only if the question allows.',
        'Use the masked number form 98XXXXXX10 if a number is needed.',
        'Common slips: greeting words, missing price or venue, invented abbreviations, a poster written as a paragraph.',
      ],
      n: 'Exam tips. Plan for a minute and write the heading first. Count the words, including the heading and the contact line. Use the facts given in the question, and add small details only when the question allows. Avoid greeting words, forgotten prices or venues, invented abbreviations, and a poster written as one long paragraph.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Creative Writing — Part 2: Speech and Debate',
  goals: [
    'Write a speech of 120-150 words in the order salutation, opening, body, conclusion, thanks',
    'Suit the tone, examples and requests to the audience',
    'Write a debate speech for or against a motion with an address, stand, arguments and rebuttal',
    'Answer an opposing argument fairly and persuasively',
  ],
  slides: [
    sl('title', 'Creative Writing — Part 2: Speech and Debate', {
      b: 'Two **5-mark** tasks of **120-150 words**, each with a choice. Both are spoken pieces: write for the ear, with short sentences and a clear order.',
      v: vPattern,
      n: 'Welcome to Part Two, the speech and the debate. Each is worth five marks, in one hundred and twenty to one hundred and fifty words, and each comes with a choice. Both are meant to be spoken, so write for the ear: short sentences, a clear order, and a voice that sounds like a person talking to a room.',
    }),
    sl('concept', 'Who is listening? Occasion decides tone', {
      b: 'Before writing, name the **occasion**, the **audience** and the **tone**. The same topic needs a different speech for different listeners.',
      v: vOcc,
      n: 'Before you write, name the occasion, the audience and the tone. An assembly speech is lively and simple. A farewell is warm and thankful. A speech to parents is respectful and practical. A debate is firm but polite. The same topic needs a different speech for a different audience, and examiners reward the writer who notices.',
    }),
    sl('diagram', 'The five parts of a speech', {
      b: 'Salutation → opening hook → body (two or three points, each with an example) → conclusion with a call to action → thanks.',
      v: vSpeechFlow,
      n: 'A speech has five parts. First the salutation, greeting the audience in order of rank. Then an opening that hooks the listeners, such as a question or a short scene. Then the body, with two or three points, each with an example. Then a conclusion with a call to action. And last, thanks. Keep to this order and you will score the format mark.',
    }),
    sl('two-column', 'Salutation and opening', {
      cols: [
        '**Salutation**\n\n- *Good morning, respected Principal, teachers and dear friends.*\n- most senior person first\n- match the occasion: *Good evening, respected parents…*',
        '**Opening hooks**\n\n- a question to the audience\n- a short, vivid scene\n- a surprising fact you are sure of\n- avoid *Today I will speak about…*',
      ],
      v: vSpeechVsDebate,
      n: 'Begin with a salutation that names the most senior person first and suits the occasion. Then hook your listeners. A question, a short scene or a surprising fact you are sure of works well. Avoid the dull opening, today I will speak about, which wastes your best seconds. The table also shows how a speech differs from a debate.',
    }),
    sl('concept', 'Devices that help a listener', {
      b: 'A listener cannot re-read, so use devices that make points memorable. Use two or three, not ten.',
      v: vDevices,
      n: 'A listener cannot go back and re-read, so use devices that make a point easy to remember. A rhetorical question makes people think. Repeating a phrase three times gives rhythm. Direct address, such as friends, involves the audience. A contrast sharpens a point. Use two or three of these with care, because too many sound artificial.',
    }),
    sl('example', 'Worked example 1: planning a speech on punctuality', {
      b: '*Task:* Speak at the morning assembly on punctuality (120-150 words).',
      v: vPlanPunct,
      n: 'Here is the plan for a speech on punctuality. The opening is a question every student recognises. The body has two points and one example: time is shared, so a late student delays the class, and a habit of being on time builds character. The conclusion is one simple action, setting the alarm ten minutes early. Then thanks.',
    }),
    sl('example', 'Worked example 1: the finished speech', {
      b: paras(
        'Good morning, respected Principal, teachers and my dear friends.',
        'Who here has run the last hundred metres to the gate this week? Be honest. Today I want to speak about a small habit with a big effect: being on time.',
        'First, time is shared. When one student walks in late, the teacher pauses, the class turns and thirty minutes of learning shrink by a little. Second, punctuality is a habit that grows into character. The student who keeps appointments with the clock will keep promises to people. A train does not wait for anyone, and neither does opportunity.',
        'So let us begin tomorrow. Set your alarm ten minutes earlier and arrive with time to spare.',
        'Thank you.',
      ),
      n: 'Here is the finished speech, about one hundred and thirty words. Follow the order: salutation, a question that hooks, two points with the train as an example, a conclusion with one clear action, and thanks. Notice the short sentences and the friendly voice. It sounds like a student talking, not a textbook being read aloud.',
    }),
    sl('check', 'Check: order the parts of a speech', {
      chk: 'ord_speech',
      n: 'Put the five parts of a speech in the order in which they are delivered. Start with the greeting and end with the thanks.',
    }),
    sl('concept', 'The debate speech', {
      b: 'A debate is about a **motion**. You speak **for** or **against** it, to the **chair**, the **judges** and the **House**, and you answer the other side.',
      v: vDebateFlow,
      n: 'A debate speech is built on a motion, a statement the House is asked to accept. You speak for it or against it. You address the chairperson, the judges, your opponents and the House. After your arguments you include a rebuttal, answering a point from the other side. You end by restating your stand and thanking the House.',
    }),
    sl('two-column', 'Address, stand and tone', {
      cols: [
        '**Address**\n\n- *Respected Chairperson, honourable judges, worthy opponents and friends.*\n- chair first, then judges, then the other side\n- end: *I urge the House to… Thank you.*',
        '**Stand and tone**\n\n- state your side in the first two sentences\n- attack arguments, never people\n- *With due respect…*, *My opponent has overlooked…*\n- signpost: *First… Second… Finally…*',
      ],
      v: vSpeechVsDebate,
      n: 'Open by addressing the chairperson first, then the judges, then your opponents and friends. State your side in the first two sentences, so that nobody has to guess it. Keep your tone firm but courteous. Attack arguments, never people. Phrases like with due respect and my opponent has overlooked keep the register formal, and signposting words keep the speech clear.',
    }),
    sl('concept', 'Rebuttal: answer the exact claim', {
      b: 'Accept what is fair, **answer the exact claim**, and support your reply with a reason or an example. Never attack the person.',
      v: vRebuttal,
      n: 'A rebuttal answers the point the other side actually made. First accept what is fair in it. Then give your reply, and support it with a reason or example. In the table, each claim about uniforms gets a reply and a support. Never change the subject, never agree with the other side, and never attack the person.',
    }),
    sl('example', 'Worked example 2: planning a debate speech', {
      b: '*Task:* Speak **for** the motion "Uniforms should be compulsory in schools" (120-150 words).',
      v: vPlanUniform,
      n: 'Here is the plan for a debate speech in favour of compulsory uniforms. After the address and the stand, the first argument is equality: no one is judged by clothes. The second is time and money saved on the daily choice. Then a rebuttal of the claim that uniforms hide individuality, and a closing appeal with thanks.',
    }),
    sl('example', 'Worked example 2: the finished debate speech', {
      b: paras(
        'Respected Chairperson, honourable judges, worthy opponents and friends.',
        'I rise in favour of the motion that uniforms should be compulsory in schools.',
        'First, a uniform makes every child equal. No one arrives worried that a classmate will judge their clothes. Second, it saves time and money: families do not argue every morning over what to wear, and one set lasts a year.',
        'My opponents say uniforms hide individuality. But individuality lives in what we think, say and do. A student is remembered for her kindness or her curiosity, never for her shirt.',
        'A school is a place to grow together, and a uniform reminds us that we do.',
        'I urge the House to support the motion. Thank you.',
      ),
      n: 'Here is the finished debate speech. It begins with the address and states the stand at once. Two arguments follow, each with a reason. Then the rebuttal answers the exact claim about individuality. The closing lines restate the stand, appeal to the House and say thank you. It is about one hundred and thirty words.',
    }),
    sl('check', 'Check: what a rebuttal is', {
      chk: 'm_rebuttal_def',
      n: 'In a debate speech, what is a rebuttal? Choose the answer that describes its job on the page.',
    }),
    sl('concept', 'Speech or debate: which is which', {
      b: 'Same length, different job. A speech welcomes, informs or inspires; a debate **persuades on a motion**.',
      v: vSpeechVsDebate,
      n: 'Both tasks are written in one hundred and twenty to one hundred and fifty words, but they do different jobs. A speech welcomes, informs or inspires an audience. A debate persuades the House on a motion. A speech has a hook, a body and a call to action. A debate has a stand, arguments, a rebuttal and an appeal.',
    }),
    sl('check', 'Check: spot the device', {
      chk: 'm_rhetq',
      n: 'Which device does this sentence use? Can we call a river clean when fish cannot live in it? Pick the best name.',
    }),
    sl('check', 'Check: match the terms', {
      chk: 'match_terms',
      n: 'Match each term with its meaning. Take your time over salutation, motion, rebuttal and slogan.',
    }),
    sl('concept', 'How speeches and debates are marked', {
      b: 'Five marks each: format 1, content 2, expression 2. Content needs developed points, not a list of slogans.',
      v: vSpeechRub,
      vs: [vDebateRub],
      n: 'Here is how a five mark task is usually marked. One mark for format: salutation, opening, body, conclusion and thanks in order, or the debate address, stand and rebuttal. Two marks for content: developed points with support. Two marks for expression: clear spoken style, devices used with care, linking words, correct grammar and the word limit.',
    }),
    sl('summary', 'Summary: speech and debate', {
      bl: [
        'Speech: salutation → hook → body with examples → conclusion → thanks.',
        'Match tone, examples and requests to the audience.',
        'Debate: address → stand → arguments → rebuttal → appeal and thanks.',
        'Rebuttal answers the exact claim; attack arguments, never people.',
        'Both: 120-150 words; write for the ear.',
      ],
      v: vSpeechFlow,
      n: 'To sum up. A speech runs salutation, hook, body with examples, conclusion and thanks. Match the tone and the examples to the audience. A debate runs address, stand, arguments, rebuttal and appeal. The rebuttal answers the exact claim, and you attack arguments, never people. Both are written for the ear, in one hundred and twenty to one hundred and fifty words.',
    }),
    sl('exam-tips', 'Exam tips: speech and debate', {
      bl: [
        'Choose the question you can plan fastest; write the plan in 2 minutes.',
        'Count words; the limit is 150, and a long answer loses accuracy.',
        'End with thanks, and add no new argument after your conclusion.',
        'Debate: state your side in the first two sentences, and include at least one rebuttal.',
        'Common slips: casual greeting, no hook, personal attacks, an unsupported claim like everyone knows.',
      ],
      n: 'Exam tips. Choose the task you can plan fastest, and plan for two minutes. Count your words, because the limit is one hundred and fifty. End with thanks and add no new argument after your conclusion. In a debate, state your side early and include a rebuttal. Avoid casual greetings, personal attacks and unsupported claims like everyone knows.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Creative Writing: Class 11 English Core notes',
  sections: [
    {
      h: '1. Creative writing in the school paper',
      t: [1, 2, 3, 4],
      b: 'Creative writing carries **16 marks** in the Class 11 school annual examination: a **classified advertisement** (3) and a **poster** (3), each in up to **50 words**, and a **speech** (5) and a **debate** (5), each in **120-150 words**. Each has an internal choice in the school paper.\n\nPlan for one or two minutes. Count words, including headings.',
      v: vPattern,
      terms: [
        ['Internal choice', 'Two questions of the same marks from which the student answers one.'],
        ['Word limit', 'The maximum length: 50 words for advertisements and posters, 150 for speeches and debates.'],
      ],
    },
    {
      h: '2. Classified advertisements: format and economy',
      t: 1,
      b: 'A classified advertisement is a short paid notice in a column of a newspaper. Parts, in order: **heading** in capitals, item or post, key details, price or terms, place, **Contact:** line.\n\nNewspapers charge by the word, so write in short phrases: no greetings, no announcing sentences, no praise. Use only shorthand readers know (*2BHK*). Write the contact in the masked form *98XXXXXX10* when a number is required.',
      v: vAnatomy,
      vs: [vTrim],
      terms: [
        ['Classified advertisement', 'A short paid notice set under a heading in a newspaper column.'],
        ['Telegraphic style', 'Writing in short phrases that drop words the reader can supply.'],
      ],
    },
    {
      h: '3. Categories of classified advertisement',
      t: 1,
      b: '**For sale:** item, condition, price. **To let:** size, locality, rent, facilities. **Situation vacant:** post, qualifications, salary, how to apply. **Lost / found:** description, place, time, whom to contact; for a found item, keep one detail back. **Tuition:** subjects, classes, quality, place.\n\nMatrimonial advertisements are not used for this task.',
      v: vCats,
      vs: [vCats2],
      terms: [
        ['Situation vacant', 'A column that advertises a job.'],
        ['To let', 'Available for rent.'],
      ],
    },
    {
      h: '4. Posters',
      t: 2,
      b: 'A poster is read in seconds, so it carries **essential information** and **visual appeal**: a bold title, a catchy **slogan**, date, time and venue, who may join, the organiser and a contact.\n\nIn a text answer, put each fact on its own short line, leave visual appeal to layout and a short note about a picture or border, and keep within **50 words**, counting the title.\n\nAn **event** poster stresses facts; an **awareness** poster adds short actions people can take.',
      v: vPosterEss,
      vs: [vPosterSvg, vWeakStrong],
      terms: [
        ['Slogan', 'A short, catchy line that sums up the message.'],
        ['Visual appeal', 'The look of a poster: bold title, short lines, space, picture or border.'],
      ],
    },
    {
      h: '5. Speeches: structure and audience',
      t: 3,
      b: 'A speech is written for the ear and has five parts: **salutation** (most senior person first), an **opening** that hooks the audience, a **body** of two or three points with examples, a **conclusion** with a call to action, and **thanks**. Length: 120-150 words.\n\nThe occasion and the audience decide the tone: lively for an assembly, warm for a farewell, respectful and practical for parents.',
      v: vSpeechFlow,
      vs: [vOcc],
      terms: [
        ['Salutation', 'The greeting that opens a speech.'],
        ['Call to action', 'A closing request that tells the audience what to do.'],
      ],
    },
    {
      h: '6. Speeches: devices and style',
      t: 3,
      b: 'Listeners cannot re-read, so use a few devices that help memory: a **rhetorical question**, **repetition in threes**, **direct address** and **contrast**. Keep sentences short, link points with *First, Second, Finally*, and avoid slang and long words that sound artificial.',
      v: vDevices,
      terms: [
        ['Rhetorical question', 'A question asked for effect, not for an answer.'],
        ['Signposting', 'Linking words that tell the audience where the speech is going.'],
      ],
    },
    {
      h: '7. Debates and rebuttal',
      t: 4,
      b: 'A debate is held on a **motion**. A speaker takes a side and addresses the **chairperson**, the **judges**, the opponents and **the House**. Order: address, **stand**, arguments with support, **rebuttal**, concluding appeal and thanks. Length: 120-150 words.\n\nA rebuttal accepts what is fair, answers the exact claim and supports the reply. Attack arguments, never people.',
      v: vDebateFlow,
      vs: [vRebuttal, vSpeechVsDebate],
      terms: [
        ['Motion', 'The statement on which a debate is held.'],
        ['Rebuttal', 'A reply that answers and weakens a point made by the other side.'],
      ],
    },
    {
      h: '8. How the tasks are marked',
      t: [1, 2, 3, 4],
      b: 'SOYL rubrics, modelled on the school paper: **advertisement and poster (3):** format and layout 0.5, content 1.5, expression 1. **Speech and debate (5):** format 1, content 2, expression 2.\n\nContent has the largest share in every task; exceeding the word limit and missing essentials cost marks.',
      v: vAdRub,
      vs: [vSpeechRub, vDebateRub],
      terms: [
        ['Content', 'The facts and ideas the task needs; the largest share of the marks.'],
        ['Expression', 'The language: economy, accuracy and style.'],
      ],
    },
  ],
  tips: '**Marks:** creative writing 16 = classified advertisement 3 + poster 3 + speech 5 + debate 5 (school annual examination, Class 11), each with a choice.\n\n**How marks are awarded:** advertisement and poster — format and layout 0.5, content 1.5, expression 1; speech and debate — format 1, content 2, expression 2 (SOYL rubric modelled on the school pattern).\n\n**Common mistakes — advertisement and poster**\n1. Greeting words and full sentences in a classified advertisement.\n2. Missing price, venue, date or contact.\n3. Invented abbreviations; going over 50 words.\n4. A poster written as a paragraph instead of short lines.\n\n**Common mistakes — speech and debate**\n1. A casual greeting instead of a formal salutation.\n2. No hook; a body that lists points without examples.\n3. A debate with no clear stand, no rebuttal or a personal attack.\n4. A new argument after the conclusion; no thanks.\n\n**Time:** about 5 minutes for an advertisement or poster and 10 for a speech or debate, including planning and a word check.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Word limit for a classified advertisement and for a poster', 'Up to 50 words each, counting the heading.', 'fact', 1],
  ['Marks for creative writing in the school paper', '16: advertisement 3, poster 3, speech 5, debate 5.', 'fact', 1],
  ['Six parts of a classified advertisement', 'Heading, item or post, key details, price or terms, place, contact line.', 'concept', 1],
  ['Why do classified advertisements use short phrases?', 'Newspapers charge by the word and space is limited.', 'concept', 1],
  ['Heading for an advertisement offering a flat on rent', 'TO LET', 'fact', 1],
  ['Heading for an advertisement offering a job', 'SITUATION VACANT', 'fact', 1],
  ['Details a to-let reader looks for first', 'Size, locality, rent and facilities.', 'concept', 1],
  ['In a found advertisement, what do you keep back?', 'One detail of the item, so that only the true owner can claim it.', 'exam-tip', 1],
  ['Which shorthand is safe in a classified advertisement?', 'Only widely known forms such as *2BHK*.', 'exam-tip', 1],
  ['Is a matrimonial advertisement used for this task?', 'No.', 'fact', 1],
  ['How to write a phone number in an answer', 'In the masked form *98XXXXXX10*.', 'exam-tip', 1],
  ['Marks split for a 3-mark task', 'Format and layout 0.5, content 1.5, expression 1.', 'exam-tip', 1],
  ['What must a poster give?', 'Essential information and visual appeal.', 'concept', 2],
  ['Elements of a poster, top to bottom', 'Bold title, slogan, picture or border, date-time-venue, organiser and contact.', 'concept', 2],
  ['What is a slogan?', 'A short, catchy line that sums up the message.', 'definition', 2],
  ['How to show visual appeal in a text answer', 'Short lines, a bold title, and a brief note about a picture or border.', 'exam-tip', 2],
  ['Event poster versus awareness poster', 'Event: date, time, venue. Awareness: adds short actions people can take.', 'concept', 2],
  ['Order of the parts of a speech', 'Salutation, opening hook, body, conclusion, thanks.', 'concept', 3],
  ['Length of a speech and of a debate', '120-150 words.', 'fact', 3],
  ['Who is greeted first in a salutation?', 'The most senior person present.', 'exam-tip', 3],
  ['Name three devices that help a listener', 'Rhetorical question, repetition in threes, direct address (also contrast).', 'concept', 3],
  ['What is a call to action?', 'A closing request that tells listeners what to do next.', 'definition', 3],
  ['Why adapt a speech to its audience?', 'Tone, examples and requests that suit the listeners persuade them better.', 'concept', 3],
  ['What is a motion?', 'The statement on which a debate is held.', 'definition', 4],
  ['Who is addressed in a debate speech?', 'The chairperson, the judges, the opponents and the House.', 'fact', 4],
  ['Order of a debate speech', 'Address, stand, arguments, rebuttal, appeal and thanks.', 'concept', 4],
  ['What is a rebuttal?', 'A reply that answers and weakens a point made by the other side.', 'definition', 4],
  ['Three steps of a good rebuttal', 'Accept what is fair, answer the exact claim, support your reply.', 'concept', 4],
  ['Attack the argument or the person?', 'The argument, never the person.', 'exam-tip', 4],
  ['Should a conclusion add a new argument?', 'No; it should restate, appeal and thank.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  title: 'Chapter test (short): Creative Writing',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Classified advertisement (3 marks)', instr: 'Attempt any one in not more than 50 words.', items: [{ attempt: 1, keys: ['ad_sale', 'ad_tolet'] }] },
    { id: 'B', title: 'Section B: Poster (3 marks)', instr: 'Attempt any one in not more than 50 words.', items: [{ attempt: 1, keys: ['poster_blood', 'poster_water'] }] },
    { id: 'C', title: 'Section C: Speech or debate (5 marks)', instr: 'Attempt any one in 120-150 words.', items: [{ attempt: 1, keys: ['sp_reading', 'db_phone'] }] },
    { id: 'D', title: 'Section D: Objective and short questions (9 marks)', instr: 'Answer all questions.', items: ['m_heading', 'm_salute', 'm_better_ad', 'tf_fullsent', 's2_poster_lack', 's3_body'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  title: 'Chapter test (long): Creative Writing',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Classified advertisement (3 marks)', instr: 'Attempt any one in not more than 50 words.', items: [{ attempt: 1, keys: ['ad_vacancy', 'ad_tuition'] }] },
    { id: 'B', title: 'Section B: Poster (3 marks)', instr: 'Attempt any one in not more than 50 words.', items: [{ attempt: 1, keys: ['poster_fair', 'poster_plastic'] }] },
    { id: 'C', title: 'Section C: Speech (5 marks)', instr: 'Attempt any one in 120-150 words.', items: [{ attempt: 1, keys: ['sp_farewell', 'sp_sports'] }] },
    { id: 'D', title: 'Section D: Debate (5 marks)', instr: 'Attempt any one in 120-150 words.', items: [{ attempt: 1, keys: ['db_online', 'db_homework'] }] },
    { id: 'E', title: 'Section E: Multiple-choice questions (1 mark each)', instr: 'Answer all questions.', items: ['m_limit', 'm_unneeded', 'm_house', 'm_triplet', 'm_closing', 'm_cost', 'm_tolet_compare', 'm_rebuttal_choice', 'm_trim', 'm_strongest_arg'] },
    { id: 'F', title: 'Section F: Short answers (2 marks each)', instr: 'Attempt any 4 of the 5 questions.', items: [{ attempt: 4, keys: ['s2_fixad', 's2_wordy', 's2_debate_open', 's2_rebut', 's2_close_rewrite'] }] },
    { id: 'G', title: 'Section G: Short answers (3 marks each)', instr: 'Attempt one question from each pair.', items: [{ attempt: 1, keys: ['s3_compare_posters', 's3_structure'] }, { attempt: 1, keys: ['s3_rebuttal_par', 's3_adapt'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (classified advertisements, up to 50 words), t02 (poster, up to 50 words), t03 (speech, 120-150 words) and t04 (debate, 120-150 words) only; no removed topics for 2026-27',
    originality: 'every prompt, name, address, phone number and model answer written for this chapter; no board paper, sample paper or textbook task reused',
    word_counts: 'every writing model checked against its word limit (the build errors outside plus or minus 20 per cent)',
    re_solve: 'author pass: every objective item re-answered from its stem; every model checked against its brief and rubric',
    gate: 'content lint (lintExemplar) run clean on this chapter by the build',
  },
});
