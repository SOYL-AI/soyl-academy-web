// Build CBSE 11 English Core ch07 "Discovering Tut: The Saga Continues" (A. R. Williams). Run from platform/:
//   npx tsx content/authored/english-literature/cbse-11-english-core-ch07/src/build.mjs
// LITERATURE RULE (D-036): everything here is SOYL's own summary, analysis and commentary; the feature is never
// quoted or closely paraphrased. Students read it in Hornbill.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../../english-language/cbse-11-english-core-ch01/src/lib.mjs';
import { guard } from '../../../english-language/cbse-11-english-core-ch01/src/guard.mjs';

setUnit('cbse-11-english-core-ch07', 'english-literature');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const READ = "**Read the feature itself in your textbook, *Hornbill* (NCERT).** This lesson is SOYL's explanation and analysis; it does not reproduce the text.";

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ['In the school paper', 'Question form', 'Marks'],
  [
    ['Hornbill prose extract', 'a passage with short questions', '3'],
    ['Short answers (Hornbill)', 'answer in a few sentences', '2 and 3'],
    ['Long answer', 'about 100-120 words: letter, diary, speech or opinion', '6'],
    ['SOYL chapter tests', 'a 4-mark commentary set; 2- and 3-mark shorts; 5-mark long answers', 'as set'],
  ],
  'Table of how a Hornbill prose piece is examined: a three-mark prose extract, short answers of two and three marks, a long answer of about one hundred to one hundred and twenty words, and the SOYL chapter-test pattern.',
  'CBSE Class 11 school annual examination, Section C (literature).',
);
const vText = table(
  ['About the text', ''],
  [
    ['Author', 'A. R. Williams'],
    ['Form', 'an informative feature about a real archaeological story'],
    ['Subject', 'Tutankhamun, a young pharaoh of ancient Egypt, his tomb and the study of his mummy'],
    ['Span of time', 'from his reign more than 3,300 years ago to a scan in 2005'],
    ['Tone', 'curious, factual, with a sense of unfinished mystery'],
  ],
  'Table of facts about the feature: author A. R. Williams; an informative feature; its subject Tutankhamun; the span of time from his reign to the scan of 2005; a curious and factual tone.',
);
const vDynasty = table(
  ['Ruler', 'What the feature tells us'],
  [
    ['Amenhotep III', 'a great ruler, probably Tutankhamun\'s grandfather'],
    ['Akhenaten', 'possibly his father; broke with tradition'],
    ['Akhenaten\'s changes', 'worship of the Aten (sun disk), a new name, a new capital at Amarna, attacks on images of Amun'],
    ['Tutankhamun', 'came to the throne young; ruled about nine years; old gods and ways restored'],
  ],
  'Table of the royal family background: Amenhotep III, probably the grandfather; Akhenaten, possibly the father, who broke with tradition; his changes including the Aten, Amarna and attacks on Amun; and Tutankhamun, who ruled about nine years and restored the old ways.',
);
const vAmarna = flow('LR', ['A great ruler: Amenhotep III', 'Akhenaten breaks with tradition', 'Capital moves to Amarna', 'Tutankhamun comes to the throne young', 'Old gods and ways restored'], 'Flow of the religious upheaval and its reversal: a great ruler, a successor who broke with tradition, the move to Amarna, a young ruler on the throne, and the restoration of the old gods.', 'The Amarna upheaval and its reversal (SOYL summary).');
const vStages = flow('LR', ['Tomb found, 1922', 'Mummy cut apart to free it', 'X-ray, 1968: bones missing', 'CT scan, 2005', 'Mummy returned; questions remain'], 'Flow of the story after burial: the tomb found in 1922, the mummy cut apart, the X-ray of 1968 showing missing bones, the CT scan of 2005, and the return of the mummy with questions remaining.', 'The story after burial in five stages (SOYL summary).');
const vTreasure = table(
  ['Kind of find', 'Examples', 'Purpose'],
  [
    ['Burial furniture', 'nested coffins, the innermost of solid gold; a gold mask', 'honour the ruler and protect the body'],
    ['Ornaments', 'jewellery', 'rank and wealth'],
    ['Everyday objects', 'board games, a bronze razor, linen garments, food and wine', 'use in the afterlife'],
  ],
  'Table of what Carter found in the tomb: coffins and a gold mask, jewellery, and everyday objects such as board games, a razor, linen, food and wine, with the purpose of each.',
);
const vCarter = flow('LR', ['Mummy fixed to the coffin by hardened material', 'Team cuts the body apart', 'Head removed, joints separated', 'Gold and jewels recovered', 'Body reassembled later'], 'Flow of how the mummy was handled in the 1920s, some time after the discovery: it was fixed to its coffin, the team cut the body apart, the head was removed and the joints separated, the gold and jewels were recovered, and the body was reassembled later.', 'Carter\'s team and the mummy (SOYL summary).');
const vTheories = table(
  ['Theory', 'What it says', 'What the evidence allows'],
  [
    ['Illness', 'a disease ended his life', 'young age fits it, but proof is missing'],
    ['Accident', 'an injury or fall', 'missing bones might fit, but timing is unknown'],
    ['Murder', 'a deliberate attack', 'no firm proof either way'],
  ],
  'Table of three theories about how the ruler died, what each says, and what the evidence allows: young age fits illness, missing bones might fit an accident, and murder has no firm proof.',
  'The debate stays open.',
);
const vScan = flow('LR', ['5 January 2005: mummy leaves the tomb', 'Mobile scanner in a nearby trailer', 'Technical fault: backup used', 'About 1,700 images in slices', 'Mummy returned to the tomb'], 'Flow of the 2005 scan: the mummy leaves the tomb, a mobile scanner in a nearby trailer, a technical fault with a backup used, about one thousand seven hundred slice images, and the return of the mummy to the tomb.', 'The scan of 2005 (SOYL summary).');
const vThemes = table(
  ['Theme', 'Where we see it (SOYL summary)'],
  [
    ['Archaeology meets technology', 'the move from cutting the body to scanning it'],
    ['Respect for the dead', 'debate over how the mummy was handled in the 1920s'],
    ['History as an unfinished story', 'the mystery of the death; the title\'s promise'],
    ['Upheaval and reversal', 'Akhenaten\'s changes undone in Tutankhamun\'s reign'],
  ],
  'Table of four themes with where each appears: archaeology meeting technology, respect for the dead, history as an unfinished story, and the upheaval of Amarna and its reversal.',
);
const vOldNew = table(
  ['', '1920s', '2005'],
  [
    ['Method', 'cutting the body apart', 'scanning inside the body'],
    ['Effect on the body', 'divided, then reassembled', 'left whole, returned to the tomb'],
    ['Main aim', 'free the body and recover gold and jewels', 'learn more about how he lived and died'],
    ['Result', 'treasure recovered; a human body damaged', 'about 1,700 images for experts to study'],
  ],
  'Table comparing the 1920s and 2005 on the method used, the effect on the body, the main aim, and the result.',
);
const vPlanCase = flow('LR', ['Read the commentary first', 'Read each question', 'Find the idea in the commentary', 'Answer in your own words', 'Add the feature where asked'], 'Flow for answering a commentary-passage set: read the commentary, read each question, find the idea, answer in your own words, and add knowledge of the feature where asked.');
const vPlanLong = flow('LR', ['Take a clear stand', 'Fact and reason', 'Two or three such points', 'Link to a theme', 'One-line conclusion'], 'Flow for planning a long answer: take a stand, give facts with reasons, two or three points, link to a theme, and conclude.');
const vBothSides = table(
  ['For the cutting', 'Against the cutting'],
  [
    ['the body was fixed to the coffin', 'a human body was treated as an obstacle to treasure'],
    ['methods of the time were limited', 'the later scan shows a gentler way exists'],
    ['the discovery added greatly to knowledge', 'the body was divided and later put back together'],
  ],
  'Two-column table of points for and against the cutting of the mummy in the 1920s.',
  'Weigh both columns before giving a verdict.',
);
const vTech = table(
  ['Question', 'What technology can show', 'What it cannot show'],
  [
    ['Are bones missing?', 'yes, from X-rays and scans', 'when or why they were lost'],
    ['What age at death?', 'the state of the bones', 'what he thought or believed'],
    ['Was there an injury?', 'breaks and signs of healing', 'who caused it, if anyone'],
  ],
  'Table of what technology can and cannot show about the mummy: missing bones, age at death, and injuries.',
);
const vCraft = table(
  ['Feature of the writing', 'Effect'],
  [
    ['Informative, factual tone', 'the reader trusts the report'],
    ['A long span of time: burial to 2005', 'shows how knowledge builds in stages'],
    ['Open questions about the death', 'keeps curiosity alive'],
    ['The word saga in the title', 'suggests a story still going on'],
  ],
  'Table of features of the writing and their effects: an informative tone, a long span of time, open questions, and the word saga in the title.',
);
const vWords = table(
  ['Word', 'Meaning'],
  [
    ['pharaoh', 'a ruler of ancient Egypt'],
    ['mummy', 'a body preserved after death'],
    ['archaeologist', 'a person who studies the past from what remains'],
    ['tomb', 'a burial place'],
    ['saga', 'a long tale of a family and its fortunes'],
    ['dynasty', 'a line of rulers from one family'],
    ['artefact', 'an object made by people in the past'],
  ],
  'Table of word meanings: pharaoh, mummy, archaeologist, tomb, saga, dynasty and artefact.',
  'Single words with their meanings.',
);
const vDiaryPlan = flow('LR', ['Day, date, salutation', 'What happened today', 'How I felt', 'A thought about the future', 'Sign off'], 'Flow for planning a diary entry: day and salutation, what happened, how I felt, a thought about the future, and a sign-off.');
const vOpinion = table(
  ['For the view', 'Against the view'],
  [
    ['visitors learn about a lost world', 'a body is a person, not an exhibit'],
    ['displays pay for care of the collection', 'handling and light can cause damage'],
  ],
  'Two-column table for an opinion answer on whether museums should display mummies: points for and against.',
);
const vExtrap = flow('LR', ['Use only the known facts', 'Choose the right format', 'Add feelings that fit', 'Do not invent events', 'Check the word limit'], 'Flow for an extrapolation task: use only the known facts, choose the right format, add fitting feelings, do not invent events, and check the word limit.');

// ---------------------------------------------------------------- deck 1
const D1 = deck({
  part: 1,
  title: 'Discovering Tut: The Saga Continues, Part 1: context, summary and themes (A. R. Williams)',
  goals: [
    'Place the feature: author, form, subject and tone',
    'Explain the royal background and the upheaval of Amarna',
    'Retell the story from the tomb of 1922 to the scan of 2005, in your own words',
    'Explain the themes: technology, respect for the dead, and history as an unfinished story',
    'Answer a commentary-passage set and plan a long answer',
  ],
  slides: [
    sl('title', 'Discovering Tut: A. R. Williams', {
      b: `*Hornbill*, prose · informative feature · Class 11 CBSE English Core.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome. In this lesson we study Discovering Tut: The Saga Continues by A. R. Williams, an informative feature about a young pharaoh of ancient Egypt. Please read the feature itself in your textbook, Hornbill. This lesson does not repeat the text. We will understand it: the background, the events, the themes, and how to answer exam questions.',
    }),
    sl('concept', 'How to use this lesson', {
      bl: [
        'Read the feature once in *Hornbill*, straight through.',
        'Use these slides for the background, the stages of the story and the themes.',
        'Describe facts **in your own words**; never memorise sentences.',
        'Practise the commentary sets, which are SOYL commentary, not extracts.',
      ],
      n: 'Here is how to study this lesson. First read the feature in your textbook, once, just to follow the story. Then come back to these slides to see the stages and the ideas. When you write answers, use your own words, because examiners reward understanding, not memory. Finally, practise with our commentary sets.',
    }),
    sl('concept', 'The author and the text', {
      v: vText,
      n: 'A. R. Williams wrote this piece as an informative feature. A feature reports real events and explains them, and it often keeps the reader curious. The subject is Tutankhamun, a young pharaoh of ancient Egypt. The piece covers a very long span, from his reign more than three thousand three hundred years ago to a scan in two thousand and five.',
    }),
    sl('concept', 'The royal background', {
      b: 'Tutankhamun came from a powerful royal family that had ruled Egypt for centuries. He died at about nineteen and was buried in the Valley of the Kings.',
      v: vDynasty,
      n: 'Tutankhamun belonged to a powerful royal family. Amenhotep the third, probably his grandfather, was a great ruler. Akhenaten, possibly his father, broke with tradition. Tutankhamun came to the throne young and ruled for about nine years. He died at about nineteen and was buried in the Valley of the Kings.',
    }),
    sl('diagram', 'The upheaval of Amarna and its reversal', {
      b: 'Akhenaten promoted the Aten, the sun disk, changed his own name, moved the capital to Amarna and attacked images of the god Amun. In Tutankhamun\'s reign the old gods and ways were restored.',
      v: vAmarna,
      n: 'Akhenaten changed Egypt. He promoted the worship of the Aten, the sun disk, took a new name, moved the capital to Amarna and attacked the images of the god Amun. When Tutankhamun came to the throne, the old gods and ways were restored. Keep this sequence as the background to the whole piece.',
    }),
    sl('diagram', 'The story after burial in five stages', {
      b: 'Each stage adds to our knowledge, and each raises questions. (A SOYL summary, not the text.)',
      v: vStages,
      n: 'After the burial the story moves through five stages. In nineteen twenty two the tomb is found. The mummy is cut apart to free it. In nineteen sixty eight an X-ray shows missing bones. In two thousand and five a CT scan looks inside the body. Then the mummy is returned, and questions remain. Keep these five stages as your map.',
    }),
    sl('concept', 'Stage 1: the tomb and its contents', {
      b: 'In 1922 the British archaeologist Howard Carter discovered the tomb. It held nested coffins, the innermost of solid gold, a gold mask, jewellery and everyday objects such as board games, a bronze razor, linen garments, food and wine.',
      v: vTreasure,
      n: 'In nineteen twenty two the British archaeologist Howard Carter discovered the tomb. It was full of treasures: nested coffins, with the innermost one of solid gold, a gold mask and jewellery. There were also everyday objects, such as board games, a bronze razor, linen garments, food and wine. These were meant for the afterlife.',
    }),
    sl('concept', 'Stage 2: the mummy and the cutting', {
      b: 'Some time after the discovery, in the 1920s, the mummy was found fixed to its coffin by hardened material. To free it and recover the gold and jewels, Carter\'s team cut the body apart, removing the head and separating the joints. It was reassembled later.',
      v: vCarter,
      n: 'Some time after the discovery, Carter\'s team found the mummy held firmly to its coffin by hardened material. To free it, and to recover the gold and jewels, they cut the body apart. The head was removed and the joints were separated. Later the body was put together again. Remember this episode, because writers and readers still debate it.',
    }),
    sl('check', 'Check: put the events in order', {
      chk: 'ord_events',
      n: 'Your turn. Six events are shuffled. Put them in the order in which they happened. Use the background and the five stages as your guide.',
    }),
    sl('concept', 'Stage 3: the X-ray and the mystery', {
      b: 'In 1968 an anatomy professor X-rayed the mummy and found that the breastbone and front ribs were missing. How the ruler died has long been debated: illness, accident and murder have all been suggested.',
      v: vTheories,
      n: 'In nineteen sixty eight an anatomy professor X-rayed the mummy. He found that the breastbone and the front ribs were missing, and this added to the mystery. People have long debated how the ruler died. Illness, accident and murder have all been suggested, and the evidence does not settle the question.',
    }),
    sl('concept', 'Stage 4: the scan of 2005', {
      b: 'On 5 January 2005 the mummy was taken from its tomb for a few hours and scanned in a mobile CT scanner in a trailer nearby, under the supervision of Zahi Hawass, secretary general of Egypt\'s Supreme Council of Antiquities. A technical fault delayed the scan; a backup was used. About 1,700 images were produced. The mummy was then returned to its tomb.',
      v: vScan,
      n: 'On the fifth of January two thousand and five, the mummy was taken from its tomb for a few hours. It was scanned in a mobile CT scanner in a trailer nearby, under Zahi Hawass, secretary general of the Supreme Council of Antiquities. A fault caused a delay, and a backup was used. About one thousand seven hundred images were made. Then the mummy went back to its tomb.',
    }),
    sl('two-column', 'Two ways of examining the body', {
      b: 'The same body was examined twice, in very different ways.',
      cols: [
        '**1920s**\n\n- the body cut apart\n- gold and jewels recovered\n- the body reassembled later',
        '**2005**\n\n- the body scanned and left whole\n- about 1,700 images made\n- the body returned to the tomb',
      ],
      v: vOldNew,
      n: 'Compare the two examinations. In the nineteen twenties the body was cut apart, the gold and jewels were recovered, and the body was put together again later. In two thousand and five the body was scanned and left whole, about one thousand seven hundred images were made, and the body was returned to its tomb.',
    }),
    sl('check', 'Check: the restoration', {
      chk: 'm_amarna',
      n: 'Check yourself. What happened to the old gods and ways during Tutankhamun\'s reign? Think about the upheaval that came before.',
    }),
    sl('concept', 'Themes and message', {
      b: 'The feature joins history and science in a story that is still being written.',
      v: vThemes,
      n: 'Four themes run through the feature. Archaeology meets modern technology. There is a debate about respect for the dead and the treatment of the mummy. History is shown as an unfinished story, as the title suggests. And there is the upheaval of Amarna and its reversal. In long answers, link at least two themes.',
    }),
    sl('check', 'Check: match years and events', {
      chk: 'match_events',
      n: 'Now match each year or period with what happened. Think about the order of the five stages.',
    }),
    sl('example', 'Worked example 1: a commentary set', {
      b: '*Commentary:* The nested coffins and the gold mask show how much care went into protecting one ruler\'s body. The richness of the burial speaks of his rank, even though his reign was short.\n\n*Question:* What does the richness of the burial show, according to the commentary?',
      v: vPlanCase,
      bl: [
        '**Find the idea:** his rank and the care given to his body.',
        '**Contrast:** a short reign, yet a rich burial.',
        '**Answer:** it shows his high rank and the care taken to protect his body.',
      ],
      n: 'Here is how to answer a commentary set. Read the passage and the question. Find the idea in the passage: the burial shows his rank and the care given to his body. Note the contrast: his reign was short, yet the burial was rich. Then answer in your own words. Always check which part asks for the commentary and which asks for the feature.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer', {
      b: '*Question:* Why does the discovery of the tomb matter to historians? Answer in 100-120 words.',
      v: vPlanLong,
      bl: [
        '**Stand:** it greatly increased knowledge of ancient Egypt.',
        '**Facts + reasons:** treasures and everyday objects; a young ruler of a powerful family.',
        '**Link:** archaeology and history as a continuing story.',
        '**Conclusion:** it opened questions that people still study.',
      ],
      n: 'Plan a five mark answer like this. Take a stand: the discovery greatly increased knowledge of ancient Egypt. Give facts with reasons: the treasures and the everyday objects, and a young ruler of a powerful family. Link to the theme of history as a continuing story. End with one line: it opened questions that people still study.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Background: Amenhotep III, Akhenaten and the upheaval at Amarna; the old ways restored under Tutankhamun.',
        'Five stages: tomb, cutting, X-ray, scan, return.',
        'Debate: illness, accident or murder; no theory proved.',
        'Themes: technology, respect, an unfinished story.',
        'Read the feature in *Hornbill*; write about it in your own words.',
      ],
      v: vStages,
      n: 'Let us sum up. The background is the royal family and the upheaval at Amarna, with the old ways restored under Tutankhamun. The story has five stages: the tomb, the cutting, the X-ray, the scan and the return. The debate on his death is open. The themes are technology, respect and an unfinished story. And write in your own words.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Commentary sets: answer from the commentary first, then from the feature.',
        'Describe facts in your own words; do not copy lines.',
        'Name the stage or year when you describe an event.',
        'Facts often confused: Akhenaten promoted the Aten; Tutankhamun restored the old gods; the scan was in 2005, the X-ray in 1968.',
        'Do not say the scan solved the mystery of the death.',
      ],
      n: 'Exam tips. In commentary sets, answer from the commentary first. Describe facts in your own words and name the year. Get the facts right: Akhenaten promoted the Aten, Tutankhamun restored the old gods, the X-ray was in nineteen sixty eight and the scan in two thousand and five. And never say the scan solved the mystery of the death.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const D2 = deck({
  part: 2,
  title: 'Discovering Tut: The Saga Continues, Part 2: ideas, ethics and exam practice (A. R. Williams)',
  goals: [
    'Explain what technology can and cannot show about the past',
    'Weigh evidence for theories and for and against Carter\'s methods',
    'Describe the form and craft of an informative feature',
    'Write a diary entry and an opinion answer from the facts',
    'Handle statements and scenarios that need your own interpretation',
  ],
  slides: [
    sl('title', 'Ideas, ethics and exam practice', {
      b: `*Discovering Tut: The Saga Continues*, Part 2.\n\n${READ}`,
      v: vBoard,
      n: 'Welcome to part two. Here we look at what technology can and cannot show, how to weigh evidence, and how the writer shapes an informative feature. We also practise the kinds of answers the exam asks for: a diary entry and an opinion. Remember to read the feature in your textbook, Hornbill, and to write in your own words.',
    }),
    sl('concept', 'What technology can and cannot show', {
      b: 'A scan reports what is physically there. It does not report when, why or what was believed.',
      v: vTech,
      n: 'Technology gives evidence, but only of certain kinds. X-rays and scans can show that bones are missing, the state of the bones and signs of injury. They cannot always show when or why bones were lost, who caused an injury, or what the ruler believed. Good readers separate what was observed from what has been guessed.',
    }),
    sl('two-column', 'Two casts of people', {
      b: 'The feature brings together people who lived more than three thousand years apart.',
      cols: [
        '**The ancient story**\n\n- Amenhotep III, a great ruler\n- Akhenaten, who broke with tradition\n- Tutankhamun, the young ruler',
        '**The modern story**\n\n- Howard Carter, who found the tomb\n- an anatomy professor, who X-rayed the mummy in 1968\n- Zahi Hawass, who supervised the scan of 2005',
      ],
      n: 'The feature has two casts of people. In the ancient story there are Amenhotep the third, a great ruler, Akhenaten, who broke with tradition, and Tutankhamun, the young ruler. In the modern story there are Howard Carter, who found the tomb, an anatomy professor, who took X-rays in nineteen sixty eight, and Zahi Hawass, who supervised the scan.',
    }),
    sl('check', 'Check: why the objects were placed in the tomb', {
      chk: 'ar_goods',
      n: 'Check yourself with an assertion and reason about the objects in the tomb. Read both statements, then choose the correct option.',
    }),
    sl('concept', 'Weighing the theories of death', {
      b: 'A theory is only as strong as the evidence for it.',
      v: vTheories,
      n: 'Let us weigh the theories. The ruler died young, which fits illness, but proof is missing. Missing bones might fit an accident, but we do not know when they were lost. Murder is possible, but there is no firm proof either way. When evidence fits more than one theory, a careful reader says the question is still open.',
    }),
    sl('concept', 'Carter\'s methods: both sides', {
      b: 'A fair answer weighs both columns before judging.',
      v: vBothSides,
      n: 'Carter\'s methods can be weighed on both sides. For the cutting: the body was fixed to the coffin, methods of the time were limited, and the discovery added greatly to knowledge. Against it: a human body was treated as an obstacle to treasure, and the later scan shows a gentler way. A good answer gives both sides and then a verdict.',
    }),
    sl('check', 'Check: what the 1968 X-ray settled', {
      chk: 'tf_xray',
      n: 'True or false. The nineteen sixty eight X-ray examination ended the debate about the cause of death. Decide, and think about what missing bones can and cannot show.',
    }),
    sl('concept', 'Form and craft of an informative feature', {
      v: vCraft,
      n: 'Notice how the feature is shaped. Its tone is informative and factual, so the reader trusts it. It covers a long span of time, so we see knowledge building in stages. It leaves questions open about the death, which keeps curiosity alive. And the word saga in the title suggests a story that is still going on.',
    }),
    sl('concept', 'Word meanings', {
      v: vWords,
      n: 'These words often appear in answers. A pharaoh is a ruler of ancient Egypt. A mummy is a body preserved after death. An archaeologist studies the past from what remains. A tomb is a burial place. A saga is a long tale of a family and its fortunes. A dynasty is a line of rulers from one family, and an artefact is an object made by people in the past.',
    }),
    sl('check', 'Check: the head of the antiquities council', {
      chk: 'fb_hawass',
      n: 'Fill in the blank. Zahi Hawass was secretary general of Egypt\'s Supreme Council of what? Type your answer.',
    }),
    sl('example', 'Worked example 1: a diary entry', {
      b: '*Task:* Imagine you are a young assistant on the day Howard Carter\'s team first enters the tomb. Write a diary entry for that night.',
      v: vDiaryPlan,
      bl: [
        '**Format:** day and date, salutation, first person.',
        '**Content:** the tomb, its treasures and everyday objects.',
        '**Feelings:** wonder, and a worry about handling things carefully.',
        '**Ending:** a hope for what the tomb will teach.',
      ],
      n: 'Here is a diary plan. Start with the day, the date and a salutation. Write in the first person. Describe what you saw: the tomb, its treasures and the everyday objects. Add how you felt, perhaps wonder, but also worry about handling things carefully. End with a hope for what the tomb will teach. Keep to facts the feature supports.',
    }),
    sl('example', 'Worked example 2: an opinion answer', {
      b: '*Statement:* Museums should display mummies. Do you agree?',
      v: vOpinion,
      bl: [
        '**Stand:** partly agree.',
        '**For:** visitors learn about a lost world.',
        '**Against:** a body is a person, not an exhibit.',
        '**Conclusion:** display only with care and respect.',
      ],
      n: 'For an opinion answer, plan both sides. Take a stand, here partly agree. Give a reason for the view: visitors learn about a lost world. Give a reason against: a body is a person, not an exhibit. End with a balanced conclusion: display only with care and respect. Link your answer to the facts of Tutankhamun if you can.',
    }),
    sl('check', 'Check: what a backup tells us', {
      chk: 'm_fail',
      n: 'Check yourself. A fault delayed the scan and a backup part was used. What does this tell us about the work? Choose the best option.',
    }),
    sl('concept', 'Extrapolation tasks: what to do', {
      bl: [
        'Stay faithful to the facts: dates, people, events and their order.',
        'Use the right format: diary, letter, speech or opinion.',
        'Add feelings and views that fit the situation.',
        'Do not invent events that the feature does not support.',
      ],
      v: vExtrap,
      n: 'Extrapolation tasks ask you to go beyond the text. Stay faithful to the facts: the dates, the people and the events. Use the right format. Add feelings and views that fit the situation. And do not invent events that the feature does not support. Check the word limit at the end.',
    }),
    sl('summary', 'Summary', {
      bl: [
        'Technology gives evidence of some things, not of everything.',
        'Weigh evidence before accepting a theory; say when a question is open.',
        'Weigh both sides on Carter\'s methods, then give a verdict.',
        'Craft: informative tone, a long span of time, open questions, the word saga.',
        'Use the right format for diary, letter, speech or opinion.',
      ],
      v: vTech,
      n: 'Let us sum up. Technology gives evidence of some things, not of everything. Weigh evidence before accepting a theory, and say when a question is open. Weigh both sides on Carter\'s methods and then give a verdict. Notice the informative tone, the long span of time, the open questions and the word saga. Use the right format for each task.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Opinion: take a stand, give both sides, conclude.',
        'Diary entry: day, salutation, first person, feelings.',
        'Use dates and names correctly: 1922, 1968, 2005.',
        'Stay within the word limit; plan in one minute.',
        'Never copy lines from the feature.',
      ],
      n: 'Exam tips. In an opinion, take a stand, give both sides and conclude. In a diary entry, use the day, a salutation, the first person and feelings. Use dates and names correctly. Stay within the word limit and plan for a minute. And never copy lines from the feature.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Discovering Tut: The Saga Continues: study notes',
  sections: [
    {
      h: '1. About the feature and the author',
      t: 1,
      b: `${READ}\n\n*Discovering Tut: The Saga Continues* is a prose piece in *Hornbill* by **A. R. Williams**. It is an **informative feature**: it reports real events and explains them. Its subject is Tutankhamun ("Tut"), a young pharaoh of ancient Egypt who died at about nineteen, more than 3,300 years ago, and the study of his tomb and mummy up to a scan in 2005.`,
      v: vText,
      terms: [['Feature', 'A piece of non-fiction that reports and explains real events, often with a curious tone.'], ['Pharaoh', 'A ruler of ancient Egypt.']],
    },
    {
      h: '2. The royal background and Amarna',
      t: 1,
      b: 'Tutankhamun was the last of a powerful royal family line that had ruled Egypt for centuries. **Amenhotep III** (probably his grandfather) was a great ruler. **Akhenaten** (possibly his father) broke with tradition: he promoted worship of the **Aten** (the sun disk), changed his own name, moved the capital to **Amarna** and attacked images of the god **Amun**. Tutankhamun came to the throne young; in his reign the old gods and ways were restored. He ruled for about nine years and was buried in the Valley of the Kings.',
      v: vDynasty,
      terms: [['Dynasty', 'A line of rulers from one family.'], ['Aten', 'The sun disk, whose worship Akhenaten promoted.']],
    },
    {
      h: '3. Summary in SOYL\'s words, by stage',
      t: 1,
      b: '**The tomb (1922).** The British archaeologist Howard Carter discovered the tomb. It held nested coffins, the innermost of solid gold, a gold mask, jewellery and everyday objects (board games, a bronze razor, linen garments, food and wine) meant for the afterlife.\n\n**The mummy (after the discovery).** It was fixed to its coffin by hardened material. To free it and recover the gold and jewels, Carter\'s team cut the body apart, removing the head and separating the joints; it was reassembled later.\n\n**The X-ray (1968).** An anatomy professor found that the breastbone and front ribs were missing, which added to the mystery. How Tutankhamun died has long been debated: illness, accident and murder have been suggested.\n\n**The scan (2005).** On 5 January the mummy was taken from its tomb for a few hours and scanned in a mobile CT scanner in a trailer nearby, under Zahi Hawass, secretary general (the head) of Egypt\'s Supreme Council of Antiquities. A technical fault delayed the work and a backup was used. About 1,700 images in slices were made, to learn more about how he lived and died. The mummy was returned to its tomb.',
      v: vStages,
      terms: [['Mummy', 'A body preserved after death.'], ['CT scan', 'A scan that builds slice-like images of the inside of the body.']],
    },
    {
      h: '4. Themes and message',
      t: 2,
      b: '- **Archaeology meets modern technology:** the move from cutting the mummy to scanning it.\n- **Respect for the dead:** debate over the treatment of the mummy.\n- **History as an unfinished story:** the death is still debated, and the title speaks of a saga that continues.\n- **Upheaval and reversal:** the changes of Amarna and their undoing in Tutankhamun\'s reign.',
      v: vThemes,
      terms: [['Saga', 'A long tale of a family and its fortunes.'], ['Archaeology', 'The study of the past from what people left behind.']],
    },
    {
      h: '5. Old and new methods compared',
      t: 2,
      b: 'In the 1920s, some time after the discovery, the body was cut apart to free it and recover gold and jewels, and reassembled later. In 2005 it was scanned, left whole and returned to the tomb after a few hours. The scan produced about 1,700 images for experts to study. The two examinations treated the body very differently.',
      v: vOldNew,
      terms: [['Evidence', 'Facts or signs that support or weaken a claim.'], ['Theory', 'An explanation that is offered but not proved.']],
    },
    {
      h: '6. Form, craft and word meanings',
      t: 2,
      b: 'The feature has an informative, factual tone and covers a long span of time. It leaves questions about the death open. Learn these words: pharaoh, mummy, archaeologist, tomb, saga, dynasty and artefact; describe the sentences they appear in, in your own words.',
      vs: [vCraft, vWords],
      terms: [['Artefact', 'An object made by people in the past.'], ['Archaeologist', 'A person who studies the past from what remains.']],
    },
    {
      h: '7. Answering exam questions',
      t: 3,
      b: '**Commentary sets (4 marks):** read the commentary, then each question; answer from the commentary first and from your knowledge of the feature where asked.\n\n**Short answers (2 and 3 marks):** point, fact, explanation, within the limit.\n\n**Long answers (about 100-120 words in school papers; SOYL 5-mark practice is 80-120):** a stand, two or three points with facts in your own words, a link to a theme, a one-line conclusion. For a diary entry, letter or speech, use the correct format and stay faithful to the facts.',
      v: vPlanLong,
      terms: [['Extrapolation', 'Going beyond the text in a way that fits its facts.'], ['Commentary set', 'Questions on a short passage written about a text, not taken from it.']],
    },
  ],
  tips: '**Board weight:** Hornbill prose extract (3 marks), short answers (2 and 3 marks) and long answers (6 marks) in Section C of the school annual paper (CBSE Class 11 English Core, 2026-27).\n\n**How marks are awarded:** content (relevant facts, accurately used), interpretation (a clear, supported view) and expression within the limit; for diaries, letters and speeches, format counts too.\n\n**Common mistakes**\n1. Mixing up the rulers: Akhenaten promoted the Aten; Tutankhamun restored the old gods.\n2. Mixing up the dates: the tomb in 1922, the X-ray in 1968, the scan in 2005.\n3. Saying the scan solved the mystery of the death.\n4. Giving an opinion without facts.\n5. Copying sentences from the textbook instead of writing in your own words.\n6. Ignoring the word limit.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who wrote *Discovering Tut: The Saga Continues*?', 'A. R. Williams.', 'fact', 1],
  ['What kind of writing is this piece?', 'An informative feature about a real archaeological story.', 'fact', 1],
  ['Who was Tutankhamun?', 'A young pharaoh of ancient Egypt who died at about nineteen.', 'fact', 1],
  ['How long ago did he die?', 'More than 3,300 years ago.', 'fact', 1],
  ['Where was he buried?', 'In the Valley of the Kings.', 'fact', 1],
  ['How long did he rule?', 'About nine years.', 'fact', 1],
  ['Who was Amenhotep III?', 'A great ruler, probably Tutankhamun\'s grandfather.', 'fact', 1],
  ['Who was Akhenaten?', 'Possibly Tutankhamun\'s father; a ruler who broke with tradition.', 'fact', 1],
  ['What did Akhenaten change?', 'He promoted the Aten (sun disk), took a new name, moved the capital to Amarna and attacked images of Amun.', 'fact', 1],
  ['What happened to the old gods in Tutankhamun\'s reign?', 'They were restored, along with the old ways.', 'fact', 1],
  ['Who discovered the tomb, and when?', 'Howard Carter, a British archaeologist, in 1922.', 'fact', 1],
  ['What did the tomb contain?', 'Nested coffins (the innermost of solid gold), a gold mask, jewellery and everyday objects.', 'fact', 1],
  ['Name some everyday objects in the tomb.', 'Board games, a bronze razor, linen garments, food and wine.', 'fact', 1],
  ['What was the purpose of those objects?', 'Use in the afterlife.', 'concept', 2],
  ['Why was the mummy cut apart?', 'It was fixed to its coffin, and the team wished to free it and recover the gold and jewels.', 'fact', 1],
  ['What happened to the body afterwards?', 'It was reassembled later.', 'fact', 1],
  ['What did the 1968 X-ray find?', 'The breastbone and front ribs were missing.', 'fact', 1],
  ['Who carried out the 1968 X-ray?', 'An anatomy professor.', 'fact', 1],
  ['Which theories of his death are debated?', 'Illness, accident and murder.', 'fact', 2],
  ['When was the CT scan?', 'On 5 January 2005.', 'fact', 1],
  ['Who supervised the scan?', 'Zahi Hawass, secretary general (the head) of Egypt\'s Supreme Council of Antiquities.', 'fact', 1],
  ['Where was the scan done?', 'In a mobile scanner in a trailer near the tomb.', 'fact', 1],
  ['What delayed the scan?', 'A technical fault; a backup was used.', 'fact', 1],
  ['How many images did the scan produce?', 'About 1,700.', 'fact', 1],
  ['What was the aim of the scan?', 'To learn more about how he lived and died.', 'concept', 2],
  ['What happened to the mummy after the scan?', 'It was returned to its tomb.', 'fact', 1],
  ['Name two themes of the feature.', 'Archaeology meeting technology; history as an unfinished story (also respect for the dead; upheaval and reversal).', 'concept', 2],
  ['*saga*', 'a long tale of a family and its fortunes', 'definition', 2],
  ['*dynasty*', 'a line of rulers from one family', 'definition', 2],
  ['Plan for a long answer', 'Stand, facts with reasons, link to theme, conclusion.', 'exam-tip', 3],
  ['Most common slip about dates', 'Mixing the 1922 discovery, the 1968 X-ray and the 2005 scan.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Discovering Tut: The Saga Continues',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_carter', 'm_postmortem', 'm_remove', 'ar_resin'] },
    { id: 'B', title: 'Section B: Short answers (2 and 3 marks)', instr: 'About 30-50 words for 2-mark and 50-80 words for 3-mark answers.', items: ['s2_resin', 's2_hours', 's3_compare'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any one of the two questions (80-120 words).', items: [{ attempt: 1, keys: ['l_carter', 'l_letter'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the commentary and answer all parts; one sub-part has an internal choice. (The passage is SOYL commentary; read the feature in Hornbill.)', items: ['c_scan'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Discovering Tut: The Saga Continues',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_age', 'm_missing', 'm_delay', 'm_young', 'm_trailer', 'm_gold', 'm_objects', 'm_credit', 'ar_scan', 'ar_theory'] },
    { id: 'B', title: 'Section B: Short answers (2 and 3 marks)', instr: 'Internal choice in one 2-mark and one 3-mark question.', items: ['s2_restore', 's2_aim', { attempt: 1, keys: ['s2_theories', 's2_critic'] }, 's3_amarna', { attempt: 1, keys: ['s3_memory', 's3_weigh'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer the first question and any one of the next two.', items: ['l_diary', { attempt: 1, keys: ['l_compare', 'l_counter'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each commentary and answer all parts. (Passages are SOYL commentary; read the feature in Hornbill.)', items: ['c_carter', 'c_dynasty'] },
  ],
});

build({
  dir: DIR,
  decks: [D1, D2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01-t03 only; no removed topics for 2026-27',
    literature_rule: 'no sentence, close paraphrase or distinctive phrase of the feature; summaries in SOYL words; passage items are SOYL commentary (passage_origin soyl-commentary); single words only for word meanings; textbook pointer on title slides, notes and every passage stem',
    originality: 'questions written for SOYL; NCERT exercise questions not reused',
    re_solve: 'writer pass: every item re-answered from its stem and checked against the facts of the feature',
    gate: 'content lint (lintExemplar) runs inside the build',
  },
});

// Reproduction guard (D-036): short distinctive phrases of the feature that must never appear in the chapter's files.
guard(DIR, [
  'boy king',
  'laden with gold',
  'eventually forgotten',
  'last heir',
  'lingering medical mysteries',
  'glided head first',
  'casket grey',
  'dark-bellied clouds',
  'legitimate force',
  'severed nearly every',
  'ritual resins',
  'solid gold coffin',
  'layer of sand',
  'concealed the damage',
  'forensic reconstruction',
  'servant of the Aten',
  'digital X-ray images',
  'cooling fan',
]);
