// Build CBSE 11 English Core ch01 Reading Comprehension, Note Making and Summary. Run from platform/:
//   npx tsx content/authored/english-language/cbse-11-english-core-ch01/src/build.mjs
// Every passage, example and data set in this chapter is SOYL's own writing (passage_origin 'soyl-original');
// numbers are invented and labelled illustrative data. Not a literature chapter, so no guard call.
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';

setUnit('cbse-11-english-core-ch01', 'english-language');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vPattern = table(
  ['Part of the school paper', 'Task', 'Marks'],
  [
    ['Reading', 'two unseen passages (factual, descriptive, literary or case-based)', '10 + 8 = 18'],
    ['Reading', 'note making from a passage', '5'],
    ['Reading', 'summary of about 50 words', '3'],
    ['Section total', 'Reading Skills', '26'],
  ],
  'Table of the reading section of the Class 11 school paper: two unseen passages for ten and eight marks, note making for five marks and a summary for three marks, twenty-six marks in all.',
  'Class 11 has no board exam: this is the school annual examination pattern.',
);
const vTypes = table(
  ['Passage type', 'What it does', 'What to watch for'],
  [
    ['Factual', 'reports information, often with a table or figures', 'units, shares, comparisons'],
    ['Descriptive', 'paints a place, person or scene', 'imagery, mood, the writer\'s attitude'],
    ['Literary', 'tells a story or a moment', 'character, hints, figurative language'],
    ['Case-based', 'gives a real-life situation and asks you to apply ideas', 'what the case supports and what it does not'],
  ],
  'Table of four unseen passage types: factual, descriptive, literary and case-based, with what each does and what to watch for.',
);
const vPlan = flow('LR', ['Read the questions', 'Skim for the gist', 'Scan for each answer', 'Read those lines closely', 'Answer and check'], 'Flow of the five-step reading plan: read the questions, skim for the gist, scan for each answer, read those lines closely, then answer and check.', 'SOYL five-step plan for any unseen passage.');
const vSkimScan = table(
  ['', 'Skimming', 'Scanning'],
  [
    ['Purpose', 'the general idea', 'one specific detail'],
    ['Eyes go to', 'title, opening, closing, first line of each paragraph', 'names, numbers, keywords'],
    ['Use for', 'main idea, title, purpose', 'who, when, how many'],
  ],
  'Table comparing skimming and scanning by purpose, where the eyes go and what each is used for.',
);
const vReadShare = table(
  ['Class', 'Joined the reading challenge', 'Students in class', 'Share'],
  [['9', '40', '160', '25%'], ['10', '30', '120', '25%'], ['11', '36', '90', '40%']],
  'Table of a reading challenge: Class 9 had forty of one hundred sixty students, twenty-five per cent; Class 10 had thirty of one hundred twenty, twenty-five per cent; Class 11 had thirty-six of ninety, forty per cent.',
  'A reading challenge (illustrative data)',
);
const vInfer = table(
  ['The text says', 'We can infer', 'Clue'],
  [
    ['The shutters came down at noon on a working Tuesday, and distant slogans could be heard.', 'a strike or procession is taking place', 'early closing plus slogans'],
    ['She read the letter twice and then folded it into her bag without a word.', 'its news affected her deeply', 'repeated reading, silence'],
    ['The lamp-post had a fresh coat of paint, but the pavement beneath it was still broken.', 'repairs were cosmetic rather than real', 'contrast between paint and pavement'],
  ],
  'Table showing inference: what the text says, what we can infer and the clue behind each inference.',
  'An inference is clue plus reasoning, never a wild guess.',
);
const vTone = table(
  ['Tone word', 'Meaning', 'Typical clue'],
  [
    ['admiring', 'praising, approving', 'praise words; effort and result described warmly'],
    ['critical', 'finding fault', 'failure, delay, carelessness shown'],
    ['sarcastic', 'mocking by saying the opposite', 'praise for something bad'],
    ['nostalgic', 'fondly remembering the past', 'those days, no longer'],
    ['apprehensive', 'worried about the future', 'if this goes on, may have to'],
    ['objective', 'factual, no feeling shown', 'figures, neutral verbs'],
  ],
  'Table of six tone words with meanings and typical clues: admiring, critical, sarcastic, nostalgic, apprehensive and objective.',
);
const vClues = table(
  ['Clue type', 'How it works', 'SOYL example'],
  [
    ['Definition', 'meaning given beside the word', 'a nomad, someone who moves from place to place'],
    ['Synonym', 'a similar word nearby', 'the tiny, almost minuscule, print'],
    ['Contrast', 'unlike or but shows the opposite', 'Unlike her talkative brother, she was taciturn'],
    ['Example', 'examples show what the word covers', 'cereals such as wheat and barley'],
    ['General sense', 'the whole sentence points to the meaning', 'the two sides would not move: an impasse'],
  ],
  'Table of five context-clue types: definition, synonym, contrast, example and general sense, each with a SOYL example.',
);
const vSetMarks = table(
  ['Case-based set (4 marks)', 'Typical parts', 'What earns marks'],
  [
    ['Four 1-mark parts', 'multiple choice, true or false, fill the blank', 'the one best answer, checked against the passage'],
    ['1 + 1 + 2', 'two objective parts and a 2-mark answer of about 30 to 50 words', 'a point with support in own words'],
  ],
  'Table of two shapes of a four-mark case-based set: four one-mark parts, or two one-mark parts and one two-mark answer, with what earns marks.',
  'Scale up: the school passages of 10 and 8 marks carry more parts of the same kinds.',
);
const vNoteSkeleton = table(
  ['Level', 'Example', 'Rule'],
  [
    ['Title', 'Rainwater Harvesting', 'sums up the whole passage'],
    ['Heading', '1. Uses', 'names a group of points'],
    ['Sub-heading', '1.1 Garden', 'a smaller group under a heading'],
    ['Points', 'water plants; cut bills', 'short phrases, facts only'],
    ['Key', 'a/cs = accounts', 'every abbreviation explained, at the end'],
  ],
  'Table of the levels of a set of notes: title, heading, sub-heading, points and key, each with an example and the rule for it.',
);
const vNotesProcess = flow('LR', ['Skim for the gist', 'Pick main points', 'Group under headings', 'Shorten and abbreviate', 'Add title and key'], 'Flow of making notes: skim for the gist, pick the main points, group under headings, shorten and abbreviate, then add a title and a key.', 'SOYL five steps for notes.');
const vHeadings = table(
  ['Heading', 'Verdict', 'Why'],
  [
    ['Causes of pollution', 'good', 'names the group; points are causes'],
    ['Pollution', 'too wide', 'could mean anything about pollution'],
    ['Factory in the town', 'too narrow', 'one example, not a group'],
    ['The pollution that is bad for us', 'weak', 'a sentence, not a label'],
  ],
  'Table of four headings with verdicts: causes of pollution is good, pollution is too wide, factory in the town is too narrow and a sentence-like heading is weak.',
);
const vAbbr = table(
  ['Use', 'Avoid', 'Rule'],
  [
    ['govt., e.g., esp., approx., w/o', 'gv, xyz', 'standard or obvious forms'],
    ['bks = books (key)', 'bks with no key', 'explain your own forms in the key'],
    ['yr, hrs, a/cs', 'abbreviating the title', 'abbreviate points, not the title'],
    ['+, with a cause arrow in own notes', 'abbreviating every word', 'stay readable'],
  ],
  'Table of abbreviation rules: use standard forms, explain your own in a key, abbreviate points and not the title, and stay readable.',
);
const vSeasons = table(
  ['', 'Kharif', 'Rabi'],
  [
    ['Sown', 'June to July', 'October to November'],
    ['Harvested', 'September to October', 'March to April'],
    ['Crops', 'rice, maize, cotton', 'wheat, mustard, gram'],
    ['Rain needed', 'monsoon rain', 'winter irrigation'],
  ],
  'Table comparing kharif and rabi crops by sowing, harvest, crops and water: kharif is sown in June to July and harvested in September to October, rabi is sown in October to November and harvested in March to April.',
  'Indian crop seasons, as used in the worked examples',
);
const vNotesDemo = table(
  ['Notes'],
  [
    ['Title: Kharif and Rabi Crops'],
    ['1. Kharif: 1.1 sown Jun-Jul, harvest Sep-Oct; 1.2 rice, maize, cotton; 1.3 needs monsoon'],
    ['2. Rabi: 2.1 sown Oct-Nov, harvest Mar-Apr; 2.2 wheat, mustard, gram; 2.3 needs winter irrig.'],
    ['Key: irrig. = irrigation'],
  ],
  'A set of model notes on kharif and rabi crops with a title, two headings with sub-points, and a key.',
);
const vSumDoDont = table(
  ['Do', 'Do not'],
  [
    ['cover every main idea', 'copy whole sentences'],
    ['use your own words', 'add your own opinion'],
    ['drop most examples and detail', 'include names and minor figures'],
    ['write in connected sentences', 'use headings or bullets'],
    ['stay near 50 words (40 to 60)', 'run far beyond the limit'],
  ],
  'Table of dos and do nots in summary writing: cover main ideas, use own words, drop examples, write connected sentences and stay near fifty words; do not copy, add opinion, include minor details, use bullets or exceed the limit.',
);
const vSumFlow = flow('LR', ['Read and mark main ideas', 'Cross out examples', 'Join ideas in own words', 'Count and trim', 'Check grammar'], 'Flow of writing a summary: read and mark the main ideas, cross out examples, join the ideas in your own words, count and trim, and check grammar.', 'SOYL five steps for a summary.');
const vCompress = table(
  ['Long way', 'Compressed'],
  [
    ['It has been seen that in the last few years', 'recently'],
    ['a large number of students', 'many students'],
    ['2,400 of 3,000 students', 'four in five students'],
    ['grow crops, rear animals and sell milk', 'farm'],
  ],
  'Table of ways to compress wording in a summary: recently for in the last few years, many for a large number, four in five for a ratio, and a single word for a list.',
);
const vSumMarks = table(
  ['Part', 'Marks', 'What earns the marks'],
  [
    ['Notes (school paper)', '5', 'title; headings and sub-headings; complete short points; abbreviations with a key'],
    ['Summary (school paper)', '3', 'main ideas; brevity near 50 words; own words and correct expression'],
  ],
  'Table of how note making and summary are marked: five marks for notes for title, headings, short points and key; three marks for summary for main ideas, brevity and expression.',
  'SOYL reading of the school pattern; the chapter tests score the same criteria.',
);

// ---------------------------------------------------------------- deck part 1
const part1 = deck({
  part: 1,
  title: 'Unseen Passages: Reading Closely — Part 1',
  goals: [
    'Use a five-step plan to read any unseen passage',
    'Tell factual, descriptive, literary and case-based passages apart and read each well',
    'Read tables and shares correctly in factual passages',
    'Make inferences from clues and name a writer\'s tone with evidence',
    'Work out word meanings from context and answer 1-mark and 2-mark questions',
  ],
  slides: [
    sl('title', 'Unseen Passages: Reading Closely', {
      b: 'CBSE Class 11 English Core, **Reading Skills (26 marks)**. Two unseen passages (10 + 8), note making (5) and summary (3). This part is about the passages; Part 2 covers note making and summary.',
      v: vPattern,
      n: 'Welcome to reading skills. In the school paper, reading carries twenty-six marks. Two unseen passages carry ten and eight marks, note making carries five and a summary carries three. This first part teaches you how to read an unseen passage closely. The second part teaches note making and summary.',
    }),
    sl('concept', 'Four kinds of unseen passage', {
      b: 'Passages are new to you, so the **skills** are what you prepare, not the topics.',
      v: vTypes,
      n: 'You will meet four kinds of passage: factual, descriptive, literary and case-based. A factual passage reports information, often with a table. A descriptive passage paints a scene. A literary passage tells a moment of a story. A case-based passage gives a real situation. Different passages, but the same careful reading works for all of them.',
    }),
    sl('diagram', 'A five-step plan for any passage', {
      b: 'Reading the questions first tells you **what to look for**, so your first reading already has a purpose.',
      v: vPlan,
      n: 'Here is a plan that works every time. First, read the questions so you know what to look for. Second, skim the passage for its main idea. Third, scan for the lines that answer each question. Fourth, read those lines closely. Fifth, write your answers and check them against the passage.',
    }),
    sl('concept', 'Skimming and scanning', {
      v: vSkimScan,
      n: 'Skimming and scanning are two kinds of fast reading. When you skim, your eyes touch the title, the opening, the ending and the first line of each paragraph to catch the gist. When you scan, you hunt for one target such as a name or a number. Use skimming for main idea questions and scanning for detail questions.',
    }),
    sl('check', 'Check: the quickest route to the gist', {
      chk: 'dk_skim',
      n: 'Your turn. You have thirty seconds to find out what an unseen passage is mainly about. Which way of reading helps the most?',
    }),
    sl('example', 'Worked example 1: a table with a trap', {
      b: '*A school reading challenge drew these entries (see the table). A report says: Class 9 was the keenest, because it had the most entrants.* **Is the claim fair?**',
      bl: [
        '**Read the table:** entrants are 40, 30 and 36; the biggest number is Class 9.',
        '**Read the shares:** 25 per cent, 25 per cent and 40 per cent.',
        '**Compare fairly:** keenness is about the share of each class, not the raw number.',
        '**Verdict:** Class 11 was keenest, with 36 of 90 students.',
      ],
      v: vReadShare,
      n: 'Look at this table from a school reading challenge. The report says Class nine was the keenest, because it had the most entrants. But Class nine is also the biggest class. Compare shares, not raw numbers. Forty of one hundred sixty is twenty-five per cent, while thirty-six of ninety is forty per cent. So Class eleven was the keenest.',
    }),
    sl('concept', 'Inference: reading between the lines', {
      b: 'An inference is a conclusion the passage **suggests but does not state**. It always rests on a clue.',
      v: vInfer,
      n: 'An inference is a conclusion that the passage suggests but does not state. Each row of this table pairs what the text says with what we can infer and the clue behind it. Shutters coming down at noon with slogans in the distance suggest a strike. If you cannot point to a clue, you are only guessing.',
    }),
    sl('example', 'Worked example 2: an inference question', {
      b: '*The shutters came down at noon on a working Tuesday. The pavement vendors packed up too, and from the main road came a faint chant of slogans.*\n\n**Question:** What can be inferred?',
      bl: [
        '**Inference:** a strike or procession is under way.',
        '**Clue 1:** shops close at noon on a working day.',
        '**Clue 2:** vendors leave, and slogans are heard.',
        '**Not acceptable:** a festival, or a power cut: no clue supports these.',
      ],
      v: vInfer,
      n: 'Here is how to answer an inference question. State the inference: a strike or procession is under way. Then give the clues: shops closing at noon on a working day, vendors leaving and slogans in the distance. Notice what is not acceptable. A festival or a power cut has no clue behind it. An inference must be the most reasonable reading of the evidence.',
    }),
    sl('check', 'Check: make an inference', {
      chk: 'dk_infer',
      n: 'Try one. A boy keeps looking at the clock, taps his pen and stands up twice before the bell rings. What is the most reasonable inference?',
    }),
    sl('concept', 'Tone: the writer\'s attitude', {
      b: 'Tone is **how** the writer feels about the subject. Name it precisely and prove it with the writer\'s words.',
      v: vTone,
      n: 'Tone is the writer’s attitude to the subject. It may be admiring, critical, sarcastic, nostalgic, apprehensive or objective. You find it in word choice. Praise for something bad shows sarcasm. Fond memories of the past show a nostalgic tone. Figures and neutral verbs show an objective tone. In an exam, choose a precise tone word and back it with a detail.',
    }),
    sl('check', 'Check: name the tone', {
      chk: 'dk_tone',
      n: 'Your turn. A grandmother polishes a lamp her own grandmother once lit and smiles as she remembers festival nights when the whole lane glowed. Which tone word fits?',
    }),
    sl('concept', 'Vocabulary in context', {
      b: 'You do not need a dictionary. The sentence around an unfamiliar word almost always holds a clue.',
      v: vClues,
      n: 'Vocabulary questions test whether you can use context. Look for five kinds of clue: a definition placed beside the word, a synonym nearby, a contrast word such as unlike or but, examples that show what the word covers, or the general sense of the whole sentence. Then test your guess by putting the meaning in place of the word.',
    }),
    sl('check', 'Check: use the general sense', {
      chk: 'dk_vocab',
      n: 'Try this one. A well was so parched in May that even the frogs had left, and villagers carried water from a river far away. Use the general sense to decide what parched means.',
    }),
    sl('example', 'Worked example 3: a literary moment', {
      b: '*Grandfather\'s radio crackled in the corner, as it had every evening since before Rohan was born. He never listened to it; he only kept it company. When the cricket commentary faded into static, he leaned forward and tuned it again, patiently, like a man coaxing a shy animal.*',
      bl: [
        '**What it shows about him:** loyalty to an old habit, and gentle patience.',
        '**Device:** a simile, comparing his tuning to coaxing a shy animal.',
        '**Writer\'s attitude:** affectionate: the details are warm, never mocking.',
        '**Evidence:** *kept it company*, *patiently*.',
      ],
      v: vTone,
      n: 'Now a literary moment. The radio is old, grandfather never listens to it, and yet he tunes it again patiently when it fades. This shows loyalty to an old habit and gentle patience. The comparison to coaxing a shy animal is a simile. The writer’s attitude is affectionate, because every detail is warm. Notice how each point is tied to the words of the passage.',
    }),
    sl('concept', 'How a case-based set is marked', {
      b: 'The chapter tests use **4-mark case sets**. The school passages of 10 and 8 marks have more parts of the same kinds.',
      v: vSetMarks,
      n: 'Here is how a four mark case set is built. Either four one-mark parts, such as multiple choice, true or false and fill the blank, or two one-mark parts and a two-mark answer of about thirty to fifty words. The school passages of ten and eight marks simply carry more parts of these same kinds. Accuracy and relevance earn marks, not length.',
    }),
    sl('summary', 'Summary: reading unseen passages', {
      bl: [
        'Five steps: questions, skim, scan, read closely, answer and check.',
        'Four passage types: factual, descriptive, literary, case-based.',
        'For tables, compare shares, not raw numbers.',
        'Inference = clue + reasoning; tone = attitude shown by word choice.',
        'Use context clues for vocabulary; two-mark answers: point + support.',
      ],
      v: vPlan,
      n: 'To sum up. Follow the five steps: questions, skim, scan, read closely, answer and check. Know the four kinds of passage. With a table, compare shares, not raw numbers. Base every inference on a clue and name tone precisely. Use context clues for vocabulary. And keep two-mark answers to a point and its support.',
    }),
    sl('exam-tips', 'Exam tips: unseen passages', {
      bl: [
        'Answer from the passage, not from general knowledge.',
        'Watch for NOT and EXCEPT in questions.',
        'Write units and shares with every figure from a table.',
        'Name tone with a precise word and one detail; avoid good and bad.',
        'Common slips: copying whole sentences; guessing without a clue; one-word answers to 2-mark questions.',
      ],
      v: vSkimScan,
      n: 'Exam tips. Answer only from the passage, even if you know more about the topic. Watch for the words not and except in questions. Write the unit with every figure. Name a tone with a precise word and one detail. And avoid the usual slips: copying whole sentences, guessing without a clue, and one-word answers to two-mark questions.',
    }),
  ],
});

// ---------------------------------------------------------------- deck part 2
const part2 = deck({
  part: 2,
  title: 'Note Making and Summary — Part 2',
  goals: [
    'Make notes with a title, headings, sub-headings and points',
    'Choose headings that name a whole group of points',
    'Use abbreviations sensibly and explain your own in a key',
    'Write a summary of about 50 words from the main ideas, in your own words',
    'Meet the school marking criteria for notes (5) and summary (3)',
  ],
  slides: [
    sl('title', 'Note Making and Summary', {
      b: 'In the school paper, note making carries **5 marks** and the summary **3 marks**. Both start from the same careful reading of a passage; the summary is written from the notes.',
      v: vSumMarks,
      n: 'Welcome to part two. Note making carries five marks and the summary carries three. Both begin with careful reading of the same passage. In fact, the usual route is to make notes first and then write the summary from your notes. This part shows you the method and the marking.',
    }),
    sl('two-column', 'Notes and full text compared', {
      cols: [
        '**Full text**\n\n- complete sentences\n- examples, colour, repetition\n- meant to be read once, slowly',
        '**Notes**\n\n- short phrases and facts\n- headings and sub-headings\n- meant to be revised quickly',
      ],
      v: vNoteSkeleton,
      n: 'Full text uses complete sentences, examples and colour. It is made to be read slowly, once. Notes are the opposite. They keep short phrases and facts, grouped under headings, so you can revise quickly. The table shows the levels of a set of notes: a title, headings, sub-headings, points and a key.',
    }),
    sl('diagram', 'Five steps to good notes', {
      b: 'Do the thinking **before** you write: grouping is where most marks are won.',
      v: vNotesProcess,
      n: 'Here are five steps. Skim the passage for its gist. Pick the main points. Group them under headings. Shorten the points and abbreviate where sensible. Finally add a title and a key. Notice that grouping comes before writing. If you know your headings first, the points fall into place.',
    }),
    sl('concept', 'Choosing headings', {
      b: 'A heading names a **group**; the points beneath it must all belong to that group.',
      v: vHeadings,
      n: 'A good heading names a whole group of points. Causes of pollution is good, because every point under it is a cause. The word pollution alone is too wide. A heading like factory in the town is too narrow, since it names one example. And a long sentence is not a heading at all. Test each heading by asking whether every point beneath it fits.',
    }),
    sl('check', 'Check: which heading fits?', {
      chk: 'dk_heading',
      n: 'Your turn. A passage lists three ways a school can save water: mending leaks, using buckets instead of hoses and collecting rainwater. Which heading covers all three?',
    }),
    sl('concept', 'Abbreviations and the key', {
      b: 'Abbreviate **points**, never the title. Standard forms need no key; your own forms do.',
      v: vAbbr,
      n: 'Abbreviations save time, but only if the reader understands them. Standard forms, such as govt, e.g. and approx, need no explanation. Your own forms, such as bks for books, must be listed in a key at the end of the notes. Abbreviate points, not the title, and do not shorten every word, or your notes become unreadable.',
    }),
    sl('check', 'Check: acceptable abbreviation', {
      chk: 'dk_abbr',
      n: 'Quick check. Which of these abbreviations can be used in notes without an entry in the key?',
    }),
    sl('example', 'Worked example 1: notes from a short passage', {
      b: '*Indian crops fall into two main seasons. Kharif crops such as rice, maize and cotton are sown in June or July, depend on monsoon rain and are harvested in September or October. Rabi crops such as wheat, mustard and gram are sown in October or November, rely on winter irrigation and are harvested in March or April.*',
      bl: [
        '**Title:** Kharif and Rabi Crops.',
        '**Headings:** 1. Kharif, 2. Rabi.',
        '**Sub-points:** sowing and harvest, crops, water need.',
        '**Key:** irrig. = irrigation.',
      ],
      v: vNotesDemo,
      n: 'Here is a short passage on kharif and rabi crops. The title sums it up. The two seasons become the two headings. Under each, the same three sub-points appear: when sown and harvested, which crops, and what water they need. Short phrases replace sentences, and the one abbreviation of my own, irrig, is explained in the key.',
    }),
    sl('check', 'Check: find the sub-point', {
      chk: 'dk_subpoint',
      n: 'Your turn. Notes on cycling have the heading, benefits of cycling. Which of the options belongs beneath it as a sub-point?',
    }),
    sl('concept', 'Summary: what it is and how to write it', {
      b: 'A summary is the passage **shortened, in your own words**, with the writer\'s ideas and no one else\'s.',
      v: vSumDoDont,
      n: 'A summary shortens the passage in your own words. It covers every main idea, drops most examples and detail, and is written in connected sentences, not points. Do not copy whole sentences and do not add your own opinion. Aim for about fifty words; the school scheme accepts a little less or a little more.',
    }),
    sl('diagram', 'Five steps to a summary', {
      b: 'Your **notes** are the best starting point: the headings give you the main ideas.',
      v: vSumFlow,
      n: 'Here are five steps. Read and mark the main ideas. Cross out the examples. Join the ideas in your own words. Count the words and trim. Finally check grammar and spelling. If you have already made notes, your headings are the main ideas, so the first two steps are nearly done.',
    }),
    sl('example', 'Worked example 2: from notes to summary', {
      b: 'Using the notes on kharif and rabi crops:',
      bl: [
        '**Main ideas:** two seasons; sowing and harvest times; crops; water source.',
        '**Cut:** the individual crop names, apart from one example each.',
        '**Draft:** *Indian crops follow two seasons. Kharif crops such as rice are sown in June or July, watered by monsoon rain and harvested in autumn. Rabi crops such as wheat are sown in October or November, irrigated in winter and harvested in March or April.*',
        '**Count:** about 45 words.',
      ],
      v: vSeasons,
      n: 'Now turn the notes into a summary. The main ideas are the two seasons, their sowing and harvest times, a crop for each, and the water source. Most crop names are cut, keeping one example each. The draft joins the ideas in connected sentences and in fresh words. It runs to about forty-five words, inside the limit.',
    }),
    sl('check', 'Check: what goes into a summary?', {
      chk: 'dk_summary',
      n: 'Try this one. A paragraph says tea needs rain, warm weather and hilly slopes, gives Assam as an example and ends with a remark that tea is a favourite drink. A short summary should give priority to which of the options?',
    }),
    sl('concept', 'Compressing words and figures', {
      b: 'Brevity is a skill: say the same thing in fewer, **stronger** words.',
      v: vCompress,
      n: 'Brevity is a skill. Replace a long phrase with a short one: recently for in the last few years, and many students for a large number of students. Turn a ratio into a fraction a reader can grasp: two thousand four hundred out of three thousand becomes four in five. Replace a list with one word that covers it, as farm covers growing crops and rearing animals.',
    }),
    sl('example', 'Worked example 3: trimming a draft', {
      b: '*Draft:* Many students, about two hundred in all, have been taking part, every Saturday morning, in a clean-up of the lake, which has pleased the council, and which the council has praised in a letter.',
      bl: [
        '**Keep:** who, what, how often, the result.',
        '**Cut:** the exact number, *in all*, and the letter.',
        '**Trimmed:** *Many students clean the lake every Saturday morning, and the council has praised them.*',
        '**Saved:** about 17 words.',
      ],
      v: vCompress,
      n: 'Here is a draft that wastes words. Keep the important parts: who is doing it, what they do, how often, and the result. Cut the exact number, in all, and the letter. The trimmed version says many students clean the lake every Saturday morning, and the council has praised them. That saves about seventeen words and loses no main idea.',
    }),
    sl('concept', 'How notes and summary are marked', {
      v: vSumMarks,
      n: 'Notes carry five marks, for a suitable title, logical headings and sub-headings, complete short points and abbreviations with a key. The summary carries three marks, for covering the main ideas, keeping near fifty words and writing in your own correct words. Neither rewards length. Both reward choosing, grouping and compressing.',
    }),
    sl('summary', 'Summary: notes and summary', {
      bl: [
        'Notes: title, headings, sub-headings, short points, key.',
        'A heading names a whole group; every point must fit it.',
        'Abbreviate points, not the title; explain your own in the key.',
        'Summary: main ideas, own words, about 50 words, no opinion.',
        'Notes first, then summary from the headings.',
      ],
      v: vNotesProcess,
      n: 'To sum up. Notes need a title, headings, sub-headings, short points and a key. A heading names a whole group. Abbreviate points, not the title, and explain your own abbreviations. A summary covers the main ideas in your own words in about fifty words, with no opinion. And the best route is notes first, then summary from the headings.',
    }),
    sl('exam-tips', 'Exam tips: notes and summary', {
      bl: [
        'Spend about 8 to 10 minutes on the notes and 6 to 8 on the summary.',
        'Never write notes as full sentences; do not copy lines from the passage.',
        'Always give a title and a key if you abbreviate.',
        'Count your summary; draft, then trim to about 50 words.',
        'Common slips: opinions in a summary; headings too wide or too narrow; abbreviations with no key.',
      ],
      v: vHeadings,
      n: 'Exam tips. Give the notes about eight to ten minutes and the summary about six to eight. Never write notes as full sentences. Always add a title, and add a key if you abbreviate. Count your summary and trim it to about fifty words. The usual slips are opinions in a summary, headings that are too wide or too narrow, and abbreviations with no key.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Reading Comprehension, Note Making and Summary — Class 11 notes',
  sections: [
    {
      h: '1. The reading section at a glance',
      t: [1, 2, 3],
      b: 'Class 11 has no board exam: the school annual examination carries **26 marks** for reading. Two unseen passages carry **10 + 8** marks, note making **5** and summary **3**.\n\nSOYL chapter tests use the class-default pattern: 4-mark case-based passage sets, 5-mark note-making and reading answers, 3-mark summaries (about 50 words) and objective questions on the conventions.',
      v: vPattern,
      terms: [
        ['Unseen passage', 'A passage you have not read before, set to test reading skills rather than knowledge.'],
        ['Case-based set', 'A passage or data set followed by several short parts that you answer together.'],
      ],
    },
    {
      h: '2. Reading strategies and passage types',
      t: 1,
      b: '**Five-step plan:** read the questions, skim for the gist, scan for each answer, read those lines closely, answer and check.\n\n**Skimming** looks at the title, opening, ending and first line of each paragraph. **Scanning** hunts for one detail.\n\n**Types:** factual (reports information), descriptive (paints a scene), literary (a story moment), case-based (a real-life situation). Different passages, same plan.',
      v: vTypes,
      vs: [vPlan, vSkimScan],
      terms: [
        ['Skimming', 'Reading quickly for the general idea of a passage.'],
        ['Scanning', 'Searching quickly for one specific detail.'],
      ],
    },
    {
      h: '3. Inference, tone and vocabulary',
      t: 1,
      b: '**Inference:** a conclusion the text suggests but does not state; it must rest on a clue.\n\n**Tone:** the writer\'s attitude shown by word choice: admiring, critical, sarcastic, nostalgic, apprehensive, objective. Name it precisely and prove it with a detail.\n\n**Vocabulary in context:** five clue types (definition, synonym, contrast, example, general sense). Test the meaning by substitution.\n\n**Fact or opinion:** a fact can be checked; an opinion judges or recommends.',
      v: vInfer,
      vs: [vTone, vClues],
      terms: [
        ['Inference', 'A reasonable conclusion drawn from clues in the text.'],
        ['Tone', 'The writer\'s attitude to the subject, shown by word choice.'],
      ],
    },
    {
      h: '4. Reading data and numbers',
      t: 1,
      b: 'In a factual or case-based passage with a table: read **across** a row for one item, **down** a column to compare. Compare **shares**, not raw numbers, when groups differ in size.\n\nA gap between two percentages is in **percentage points**; a change measured against the start is a per cent change. Two things that happen together do not prove that one **causes** the other.\n\nAlways write the unit with a figure.',
      v: vReadShare,
      terms: [
        ['Percentage point', 'The arithmetic gap between two percentages: 12 per cent to 18 per cent is 6 points.'],
        ['Correlation', 'Two things changing together; it does not by itself prove that one causes the other.'],
      ],
    },
    {
      h: '5. Note making: layout and headings',
      t: 2,
      b: 'Notes have **levels**: a **title** that sums up the passage; **headings** that name groups; **sub-headings** for smaller groups; **points** in short phrases; a **key** at the end.\n\n**Steps:** skim, pick main points, group under headings, shorten and abbreviate, add title and key.\n\nA heading must name a **whole group**: not too wide (Pollution), not too narrow (one example), and a label, not a sentence. Use numbering (1, 1.1) or indentation.',
      v: vNoteSkeleton,
      vs: [vNotesProcess, vHeadings],
      terms: [
        ['Heading', 'A label that names a group of related points in notes.'],
        ['Sub-heading', 'A smaller group of points placed under a heading.'],
      ],
    },
    {
      h: '6. Abbreviations and the key',
      t: 2,
      b: 'Use **standard** abbreviations freely (govt., e.g., esp., approx., w/o, hrs, yr). Your **own** forms (bks, stdts) must be listed in a **key** at the end of the notes.\n\nAbbreviate points, not the title. Symbols such as + or an arrow may be used if they are clear. Do not abbreviate so heavily that the notes cannot be read. A notes answer made of full sentences, or copied lines, loses marks.',
      v: vAbbr,
      terms: [
        ['Key', 'The list at the end of notes that explains each abbreviation you have invented.'],
        ['Point form', 'Writing facts in short phrases instead of full sentences.'],
      ],
    },
    {
      h: '7. Summary writing',
      t: 3,
      b: 'A summary is a **short account of the main ideas in your own words**, about **50 words** (40 to 60 accepted by SOYL).\n\n**Steps:** mark main ideas, cross out examples, join ideas in your words, count and trim, check grammar.\n\n**Do:** cover every main idea; connected sentences; drop most examples. **Do not:** copy sentences, add opinion, use bullets. Work from your notes: the headings are the main ideas.\n\n**Compress:** *recently* for *in the last few years*; *four in five* for *2,400 of 3,000*.',
      v: vSumDoDont,
      vs: [vSumFlow, vCompress],
      terms: [
        ['Summary', 'The main ideas of a passage in your own words, in much fewer words.'],
        ['Main idea', 'A point the passage cannot do without, as opposed to an example or a detail.'],
      ],
    },
    {
      h: '8. Writing answers and managing time',
      t: [1, 2, 3],
      b: '**Objective parts:** choose the one best option; watch NOT and EXCEPT; beware options true in life but not in the passage.\n\n**Two-mark answers (30 to 50 words):** point + support in own words.\n\n**Notes (5):** title, headings and sub-headings, short points, key. **Summary (3):** main ideas, about 50 words, own words.\n\n**Time (a guide):** about 15 to 18 minutes per unseen passage, 8 to 10 for notes, 6 to 8 for the summary.',
      v: vSetMarks,
      vs: [vSumMarks],
      terms: [
        ['Brevity', 'Saying what is needed in the fewest suitable words.'],
        ['Expression', 'Own words, correct grammar and spelling, clear connected sentences.'],
      ],
    },
  ],
  tips: '**Marks (school paper):** reading 26 = two unseen passages 10 + 8, note making 5, summary 3. SOYL chapter tests use 4-mark case sets, 2-, 3- and 5-mark constructed answers and 1-mark objective questions.\n\n**How marks are awarded**\n- Case parts: the one best answer; 2-mark answers a point plus support from the passage in your own words.\n- Notes (5): title 1, headings and sub-headings 2, complete short points 1, abbreviations with a key 1.\n- Summary (3): main ideas 1.5, brevity 0.5, expression 1.\n\n**Common mistakes**\n1. Answering from general knowledge instead of the passage.\n2. Guessing an inference with no clue; vague tone words (*good*, *bad*).\n3. Comparing raw numbers when groups differ in size.\n4. Notes in full sentences, or headings too wide or too narrow.\n5. Abbreviations with no key.\n6. A summary that copies sentences or adds an opinion.\n\n**Time:** plan the section so that nothing is left half-done.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Reading marks in the Class 11 school paper', 'Reading = 26: two unseen passages (10 + 8), note making 5, summary 3.', 'fact', 1],
  ['SOYL five-step plan for a passage', 'Questions, skim, scan, read closely, answer and check.', 'concept', 1],
  ['Skimming', 'Reading fast for the general idea: title, opening, ending, first lines.', 'definition', 1],
  ['Scanning', 'Searching fast for one detail: a name, a number, a keyword.', 'definition', 1],
  ['Four unseen passage types', 'Factual, descriptive, literary, case-based.', 'concept', 1],
  ['Inference', 'A conclusion the text suggests but does not state; it must rest on a clue.', 'definition', 1],
  ['Fact or opinion?', 'A fact can be checked; an opinion judges or recommends.', 'concept', 1],
  ['Tone', 'The writer\'s attitude to the subject, shown by word choice.', 'definition', 1],
  ['Sarcastic', 'Mocking by saying the opposite of what is meant.', 'definition', 1],
  ['Nostalgic', 'Fondly remembering the past.', 'definition', 1],
  ['Apprehensive', 'Worried about what may happen.', 'definition', 1],
  ['Objective', 'Factual, with no personal feeling shown.', 'definition', 1],
  ['Five context-clue types', 'Definition, synonym, contrast, example, general sense.', 'concept', 1],
  ['Test for a word\'s meaning', 'Put your meaning in place of the word; the sentence must still make sense.', 'exam-tip', 1],
  ['Reading a table with groups of different sizes', 'Compare shares (per cent), not raw numbers.', 'exam-tip', 1],
  ['12 per cent to 18 per cent is…', 'A rise of 6 percentage points.', 'concept', 1],
  ['Together is not because', 'Two things rising together do not prove that one causes the other.', 'exam-tip', 1],
  ['Two-mark answer formula', 'Point + support from the passage in own words, about 30 to 50 words.', 'exam-tip', 1],
  ['Levels of a set of notes', 'Title, headings, sub-headings, points, key.', 'concept', 2],
  ['Note-making steps', 'Skim, pick main points, group under headings, shorten and abbreviate, add title and key.', 'concept', 2],
  ['A good heading', 'Names a whole group of points: not too wide, not too narrow, a label not a sentence.', 'concept', 2],
  ['Sub-heading', 'A smaller group of points under a heading.', 'definition', 2],
  ['Notes are written in…', 'Short phrases and facts, never full sentences or copied lines.', 'exam-tip', 2],
  ['Standard abbreviations', 'govt., e.g., esp., approx., w/o, hrs, yr.', 'example', 2],
  ['Where does the key go?', 'At the end of the notes; it explains your own abbreviations.', 'exam-tip', 2],
  ['Marks for notes (5)', 'Title 1, headings and sub-headings 2, short complete points 1, abbreviations with key 1.', 'fact', 2],
  ['Summary', 'The main ideas in your own words, much shorter than the passage.', 'definition', 3],
  ['Summary length used by SOYL', 'About 50 words (40 to 60 accepted).', 'fact', 3],
  ['What to drop in a summary', 'Most examples, names, minor figures and the writer\'s repetition.', 'exam-tip', 3],
  ['Marks for summary (3)', 'Main ideas 1.5, brevity 0.5, expression 1.', 'fact', 3],
  ['Summary mistakes', 'Copying sentences, adding opinion, bullets, going far beyond the limit.', 'exam-tip', 3],
  ['Best route to a summary', 'Make notes first; the headings are the main ideas.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  title: 'Chapter test (short) — Reading Comprehension, Note Making and Summary',
  duration: 40,
  blueprint: 'cbse-11-default-chapter-test-short',
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_main_idea', 'm_notes_title', 'm_sum_include', 'ar_summary_opinion'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'About 30 to 50 words for 2-mark and 50 to 80 words for 3-mark answers (a summary is about 50 words).', items: ['s2_inference', 's2_headings_group', 's3_sum_kites'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any one of the two questions (80 to 120 words).', items: [{ attempt: 1, keys: ['l_notes_rain', 'l_eval_phones'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts; one sub-part has an internal choice where shown.', items: ['cs_flowers'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  title: 'Chapter test (long) — Reading Comprehension, Note Making and Summary',
  duration: 90,
  blueprint: 'cbse-11-default-chapter-test-long',
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Multiple-choice and assertion-reason questions.', items: ['m_purpose', 'm_inference_closed', 'm_data_comp', 'm_notes_hierarchy', 'm_sum_best', 'm_reference', 'm_notes_pointform', 'm_sum_figure', 'ar_cause', 'ar_sarcasm'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Internal choice in one 2-mark and one 3-mark question.', items: ['s2_tone_critical', 's2_data_headline', { attempt: 1, keys: ['s2_abbr_line', 's2_sum_cut'] }, 's3_notes_festivals', { attempt: 1, keys: ['s3_sum_lakes', 's3_eval_assembly'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer the first question and any one of the next two.', items: ['l_notes_sleep', { attempt: 1, keys: ['l_notes_summary_mangrove', 'l_fix_notes'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage or data set and answer all parts.', items: ['cs_commute', 'cs_stepwell'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (unseen passages), t02 (note making) and t03 (summary writing) only; no removed topics for 2026-27',
    originality: 'every passage, example sentence, note-making brief and data set written for this chapter (passage_origin soyl-original); figures invented and labelled illustrative data; no textbook, newspaper, sample-paper or past-paper passage used or adapted',
    pattern: 'school paper: reading 26 = unseen passages 10 + 8, note making 5, summary 3; chapter tests follow cbse-11-default-chapter-test-short and -long item for item',
    data_checks: 'every share, difference, ratio and total quoted in a key or model answer recomputed from its data set',
    re_solve: 'author verifier pass: every objective part re-answered from its stem and passage; every model answer checked against the passage and its word limit',
  },
});
