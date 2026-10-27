// Build CBSE 10 English Language and Literature ch01 Reading Comprehension: Unseen Passages. Run from platform/:
//   npx tsx content/authored/english-language/cbse-10-english-language-and-literature-ch01/src/build.mjs
// Every passage, example sentence and data set in this chapter is SOYL's own writing (passage_origin
// 'soyl-original'); numbers are invented and captioned "illustrative data".
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, bars, notes, cards, test, build } from '../../cbse-10-english-language-and-literature-ch02/src/lib.mjs';

setUnit('cbse-10-english-language-and-literature-ch01', 'english-language');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vSectionA = table(
  ['Board question', 'Passage', 'Length', 'Marks'],
  [
    ['Q1', 'Discursive passage: a writer discusses an issue, argues a view or weighs both sides', '400–450 words', '10'],
    ['Q2', 'Case-based factual passage with visual input (table, chart or similar)', '200–250 words', '10'],
  ],
  'Table of the two Section A questions: question one, a discursive passage of four hundred to four hundred and fifty words for ten marks; question two, a case-based factual passage with a table or chart, two hundred to two hundred and fifty words, for ten marks.',
  'CBSE 2026-27, Section A: Reading Skills, 20 marks.',
);
const vPlan = flow('LR', ['Read the questions', 'Skim for the gist', 'Scan for each answer', 'Read those lines closely', 'Answer, then check'], 'Flow of the five-step reading plan: read the questions, skim for the gist, scan for each answer, read those lines closely, then answer and check.', 'SOYL five-step plan for any unseen passage.');
const vSkimScan = table(
  ['', 'Skimming', 'Scanning'],
  [
    ['Purpose', 'the general idea (gist)', 'one specific detail'],
    ['Where your eyes go', 'title, first and last paragraphs, first line of each paragraph', 'keywords, names, numbers, dates'],
    ['Speed', 'fast, once through', 'very fast, jumping to the target'],
    ['Use it for', 'main idea, title, writer\'s purpose', 'who, when, how many, which word'],
  ],
  'Table comparing skimming and scanning: skimming finds the general idea by reading the title, opening, closing and first lines; scanning finds one detail by jumping to keywords, names and numbers.',
);
const vParaRoles = table(
  ['Part of a discursive passage', 'What it does', 'Signal words'],
  [
    ['Opening', 'hooks the reader with a scene, question or surprising fact', 'Ask any…, Imagine…, On a May afternoon…'],
    ['Claim', 'states the writer\'s main view', 'Yet…, The truth is…, This matters because…'],
    ['Reasons and examples', 'support the claim', 'First…, Also…, For example…'],
    ['Counter-point', 'admits a limit or the other side', 'None of this means…, Of course…, However…'],
    ['Conclusion', 'sums up or calls for action', 'So…, In short…, The next time you…'],
  ],
  'Table of the five parts of a discursive passage, what each does and the words that signal it: opening, claim, reasons and examples, counter-point and conclusion.',
);
const vInfer = table(
  ['The text says…', 'So we can infer…', 'Clue'],
  [
    ['Her tiffin came back full for the third day.', 'something is troubling her', 'a change in a daily habit'],
    ['She had stopped humming as she got ready.', 'her mood has dropped', 'a missing sign of happiness'],
    ['The new geometry box lay unopened.', 'she has lost interest in school work', 'a neglected object'],
  ],
  'Table showing inference: what the text says, what we can infer from it, and the clue that supports each inference.',
  'Inference = text clue + reasoning. It is never a wild guess.',
);
const vTone = table(
  ['Tone word', 'Meaning', 'Typical clue'],
  [
    ['admiring / appreciative', 'praising, approving', 'triumph, remarkable, worked through the night'],
    ['critical', 'finding fault', 'failed, careless, at last… only after'],
    ['sarcastic', 'mocking by saying the opposite', 'How wonderful that… (for something bad)'],
    ['nostalgic', 'fondly longing for the past', 'those days, will never come back'],
    ['apprehensive / concerned', 'worried about what may happen', 'if this continues, may have to'],
    ['objective', 'factual, no feeling shown', 'figures, dates, neutral verbs'],
    ['balanced', 'weighing both sides', 'None of this means…, However…'],
  ],
  'Table of seven tone words with their meanings and typical clues: admiring, critical, sarcastic, nostalgic, apprehensive, objective and balanced.',
);
const vClues = table(
  ['Clue type', 'How it works', 'SOYL example'],
  [
    ['Definition', 'the meaning is given beside the word', 'The herbivores, animals that eat only plants, …'],
    ['Synonym', 'a word of similar meaning is nearby', 'the tiny, almost minuscule, print'],
    ['Contrast', 'a word like unlike or but shows the opposite', 'Unlike her gregarious brother, she liked being alone'],
    ['Example', 'examples show what the word covers', 'citrus fruits such as lemons and oranges'],
    ['General sense', 'the whole sentence points to the meaning', 'neither side would move: an impasse'],
  ],
  'Table of five context-clue types: definition, synonym, contrast, example and general sense, each with a SOYL example.',
);
const vTwoMark = flow('LR', ['Point that answers the question', 'Evidence from the passage (own words)', 'Short explanation or link'], 'Flow for a two-mark answer: a point that answers the question, evidence from the passage in your own words, and a short explanation.', 'About 30–40 words.');
const vMarks1 = table(
  ['Part type (SOYL model of Q1)', 'Marks', 'What earns the mark'],
  [
    ['Multiple choice: purpose, inference, tone', '1 each', 'the one best option'],
    ['Complete the sentence', '1', 'a grammatical completion with the right idea'],
    ['True / false', '1', 'the correct choice, checked against the passage'],
    ['Find the word', '1', 'the exact word from the named paragraph'],
    ['Short answer (about 30–40 words)', '2 each', 'a point plus support or a reasoned view'],
  ],
  'Table of the part types in a SOYL model of question one, with marks: multiple choice, complete the sentence, true or false and find the word earn one mark each; short answers of about thirty to forty words earn two marks each.',
  'SOYL model of the board pattern: six 1-mark parts and two 2-mark parts = 10.',
);

const vReadVisual = flow('LR', ['Title and caption', 'Labels and units', 'Highest, lowest, biggest change', 'What the text claims', 'Match each claim to a figure'], 'Flow for reading a visual input: title and caption, labels and units, highest, lowest and biggest change, what the text claims, and matching each claim to a figure.');
const vSaplings = table(
  ['Year', 'Saplings planted', 'Alive after one year', 'Survival rate'],
  [['2022', '200', '120', '60%'], ['2023', '250', '190', '76%'], ['2024', '300', '255', '85%']],
  'Table of a school planting drive: in 2022, 200 saplings planted and 120 alive after a year, a survival rate of 60 per cent; in 2023, 250 planted and 190 alive, 76 per cent; in 2024, 300 planted and 255 alive, 85 per cent.',
  'A school\'s sapling drive (illustrative data)',
);
const vSteps = bars(
  { x: { min: 0, max: 7, label: 'Week of the challenge' }, y: { min: 0, max: 9000, label: 'Average steps per day' }, label: 'Average daily steps', points: [[1, 5200], [2, 6100], [3, 6800], [4, 7400], [5, 7300], [6, 8100]] },
  'Bar chart of average daily steps in a Class 9 section during a six-week fitness challenge: 5,200 in week 1, 6,100 in week 2, 6,800 in week 3, 7,400 in week 4, 7,300 in week 5 and 8,100 in week 6.',
  'Average daily steps, Class 9 fitness challenge (illustrative data)',
);
const vNumLang = table(
  ['To show…', 'Say', 'Example'],
  [
    ['the gap between two percentages', 'percentage points', '40% → 30% is a fall of 10 percentage points'],
    ['change relative to the start', 'per cent', '20 → 30 students is a 50 per cent increase'],
    ['a simple fraction', 'a quarter, a third, half', '200 of 800 = a quarter'],
    ['multiples', 'doubled, tripled, ten times', '600 → 6,300 is more than ten times'],
    ['size of change', 'by', 'rose by 2,200'],
    ['final value', 'to', 'rose to 6,300'],
  ],
  'Table of number language for factual passages: percentage points, per cent, fractions, multiples, by for the size of change and to for the final value.',
);
const vTraps = table(
  ['Trap', 'What to check'],
  [
    ['Wrong unit', 'thousand or lakh? hours or minutes? per cent or a number?'],
    ['Axis not starting at zero', 'do not judge size by bar height alone'],
    ['Together is not because', 'two things rising together do not prove a cause'],
    ['Overclaiming words', 'is a 2-point rise really far more popular?'],
    ['Small sample or one period', 'one class, one month or one survey proves little'],
  ],
  'Table of five traps in factual passages and what to check: units, axes that do not start at zero, mistaking things that happen together for cause, overclaiming words, and small samples or single periods.',
);
const vMarks2 = table(
  ['Part type (SOYL model of Q2)', 'Marks', 'What earns the mark'],
  [
    ['Read a value or rank from the visual', '1', 'the exact figure with its unit'],
    ['Complete a sentence with a figure or calculation', '1', 'the correct number'],
    ['True / false using text and visual', '1', 'the correct choice, checked against both'],
    ['Find the word', '1', 'the exact word from the passage'],
    ['Explain a trend or judge a claim (about 30–40 words)', '2 each', 'a point plus accurate figures, or a supported view'],
  ],
  'Table of part types in a SOYL model of question two with marks: reading a value, completing with a figure, true or false and find the word earn one mark each; explaining a trend or judging a claim earns two marks.',
  'SOYL model of the board pattern: six 1-mark parts and two 2-mark parts = 10.',
);

// ---------------------------------------------------------------- deck part 1
const DEMO_GARDEN = '*Many schools treat their gardens as decoration, a patch of marigolds by the gate. Yet a vegetable garden can be one of the best classrooms a school has. Students who grow spinach learn about soil, water and seasons far more vividly than from a diagram. They also learn patience, since nothing grows faster because you stare at it. And children who have grown a vegetable are often keener to eat it. A garden, in short, teaches science, character and healthy habits at once.*';

const part1 = deck({
  part: 1,
  title: 'Unseen Passages — Part 1: The Discursive Passage',
  goals: [
    'Use a five-step plan to read any unseen passage efficiently',
    'Skim for the main idea and scan for details',
    'Identify a writer\'s claim, reasons, counter-point and conclusion',
    'Make inferences and name a writer\'s tone with evidence',
    'Work out word meanings from context and answer 1-mark and 2-mark questions',
  ],
  slides: [
    sl('title', 'Unseen Passages — Part 1: The Discursive Passage', {
      b: 'CBSE Class 10 English, **Section A: Reading Skills (20 marks)**. Two unseen passages, ten marks each. This part teaches the discursive passage; Part 2 teaches the case-based factual passage with a visual.',
      v: vSectionA,
      n: 'Welcome to reading skills. Section A of your English paper has two passages you have never seen before. The first is a discursive passage of about four hundred words, where a writer discusses an issue or argues a view. The second is a shorter factual passage with a table or chart. Each is worth ten marks, so this section alone is a quarter of the paper.',
    }),
    sl('concept', 'What is a discursive passage?', {
      bl: [
        'It **discusses** an issue: the writer has a view and tries to convince you.',
        'It gives **reasons and examples**, and often admits the other side.',
        'Topics are everyday and wide: habits, environment, technology, education, society.',
        'Questions test the **argument**, not your knowledge of the topic.',
      ],
      n: 'A discursive passage discusses an issue. The writer has a point of view, gives reasons and examples, and often admits a limit or the other side before concluding. The topic could be anything from screen time to city trees. Remember that every question is about what this writer says and how they say it, not about what you already know on the subject.',
    }),
    sl('diagram', 'A five-step plan for any passage', {
      b: 'Reading the questions first tells you **what to look for**, so your first reading is already purposeful.',
      v: vPlan,
      n: 'Here is a plan that works for every passage. First, read the questions, so you know what to look for. Second, skim the passage for its main idea. Third, scan for the part of the passage that answers each question. Fourth, read those lines closely. Fifth, write your answers and check them. With practice this whole cycle takes about twenty minutes per passage.',
    }),
    sl('concept', 'Skimming and scanning', {
      v: vSkimScan,
      n: 'Skimming and scanning are two kinds of fast reading. When you skim, your eyes move over the title, the opening, the closing and the first line of each paragraph, to catch the gist. When you scan, you hunt for one target, such as a name, a figure or the paragraph a question names. Use skimming for main idea questions and scanning for detail questions.',
    }),
    sl('check', 'Check: the fastest route to the main idea', {
      chk: 'mc_skim',
      n: 'Your turn. You have thirty seconds to find out what a passage is mainly about. Which way of reading gets you there fastest?',
    }),
    sl('concept', 'How a discursive passage is built', {
      b: 'Most discursive passages follow the same shape. Spotting each part tells you where the answers are.',
      v: vParaRoles,
      n: 'Most discursive passages share a shape. An opening hooks you with a scene or a question. A claim states the writer’s view, often with a word like yet. Reasons and examples support it. A counter-point admits a limit, with words like none of this means. And a conclusion sums up or calls for action. Learn the signal words and you will find answers faster.',
    }),
    sl('example', 'Worked example 1: find the claim and its support', {
      b: DEMO_GARDEN,
      bl: [
        '**Opening:** gardens treated as decoration.',
        '**Claim (topic sentence):** a vegetable garden can be one of the best classrooms (signalled by *Yet*).',
        '**Three reasons:** science made vivid · patience · healthy eating (signalled by *also*, *And*).',
        '**Conclusion:** *in short* sums up all three.',
      ],
      n: 'Look at this short SOYL paragraph. The opening sets up a common view: gardens as decoration. The word yet turns to the writer’s claim, that a vegetable garden is a great classroom. Then come three reasons, marked by also and and: science, patience and healthy eating. Finally, in short sums up all three. A main idea question here has one answer: the garden as a classroom.',
    }),
    sl('concept', 'Inference: reading between the lines', {
      b: 'An inference is a conclusion the writer **suggests but does not state**. Every inference must rest on a clue in the text.',
      v: vInfer,
      n: 'Inference means reading between the lines. The writer does not say it directly, but the clues point to it. In this example, a full tiffin box, a girl who has stopped humming and an unopened geometry box all suggest that something is troubling her at school. Notice that each inference rests on a clue. If you cannot point to a clue, it is a guess, not an inference.',
    }),
    sl('example', 'Worked example 2: an inference question', {
      b: '*Nisha\'s tiffin came back full for the third day running. Her mother noticed that she no longer hummed while getting ready, and that her new geometry box lay unopened on the desk.*\n\n**Question:** What can Nisha\'s mother infer?',
      bl: [
        '**Inference:** something at school is upsetting Nisha.',
        '**Clue 1:** she has stopped eating her lunch.',
        '**Clue 2:** a sign of her happiness (humming) has gone.',
        '**Not acceptable:** she is ill, or she dislikes geometry: no clue supports these.',
      ],
      n: 'Here is how to answer an inference question. State the inference: something at school is upsetting Nisha. Then point to the clues: the uneaten lunch and the humming that has stopped. Notice the answers that are not acceptable. Saying she is ill, or that she hates geometry, goes beyond the clues. An inference must be the most reasonable reading of the evidence.',
    }),
    sl('check', 'Check: make an inference', {
      chk: 'mc_infer',
      n: 'Try one. A boy checks his watch for the fifth time and stares down an empty road. What is the most reasonable inference?',
    }),
    sl('concept', 'Tone: the writer\'s attitude', {
      b: 'Tone is **how** the writer feels about the subject. Name it with a precise word and prove it with the writer\'s words.',
      v: vTone,
      n: 'Tone is the writer’s attitude to the subject. It might be admiring, critical, sarcastic, nostalgic, worried, objective or balanced. You find it in word choice. Positive words like triumph show admiration. Saying the opposite of what is meant shows sarcasm. Figures and neutral verbs show an objective tone. In an exam, choose the most precise tone word, and back it with a phrase from the passage.',
    }),
    sl('example', 'Worked example 3: three sentences, three tones', {
      bl: [
        '*At last the council has found money to mend the road, only eleven years after the first complaint.* — **sarcastic / critical** (*at last… only eleven years*)',
        '*The volunteers worked through the night, and by dawn every family had a dry place to sleep.* — **admiring** (praise of effort and result)',
        '*If the river keeps rising at this rate, the lower villages may have to be emptied by evening.* — **apprehensive** (*if… may have to*)',
      ],
      n: 'Here are three SOYL sentences. The first says at last and only eleven years: it pretends to praise but really criticises, so it is sarcastic. The second praises the volunteers’ effort and its result, so it is admiring. The third uses if and may have to, words of worry about the future, so it is apprehensive. In each case, the tone comes from a few telling words.',
    }),
    sl('check', 'Check: name the tone', {
      chk: 'mc_tone_nostalgic',
      n: 'Your turn. A writer remembers summer evenings on a grandmother’s terrace, with jasmine and a distant radio, that will never come back. Which tone word fits best?',
    }),
    sl('concept', 'Vocabulary in context', {
      b: 'You do not need a dictionary. The sentence around an unfamiliar word nearly always contains a clue.',
      v: vClues,
      n: 'Vocabulary questions test whether you can use context. Look for five kinds of clue. A definition placed beside the word. A synonym nearby. A contrast word, such as unlike or but, that points to the opposite. Examples that show what the word covers. Or the general sense of the whole sentence. These clues work in every passage, on every topic.',
    }),
    sl('example', 'Worked example 4: find the word, choose the meaning', {
      b: '*The speaker\'s remarks were so candid that the audience gasped: she admitted every mistake her team had made.*',
      bl: [
        '**Part of speech:** *candid* describes the remarks, so it is an adjective.',
        '**Clue:** the colon explains it, since she admitted every mistake.',
        '**Meaning:** frank, completely honest.',
        '**Substitution test:** *so frank that the audience gasped* still makes sense.',
        '**Find-the-word rule:** the answer must be the passage\'s own word, in the same part of speech as the meaning given.',
      ],
      n: 'Here is a four-step method. First, decide the part of speech: candid describes the remarks, so it is an adjective. Second, find the clue: after the colon, she admits every mistake. Third, state the meaning: frank and honest. Fourth, test it by putting your meaning in place of the word. For find-the-word questions, always give the passage’s own word, in the same form.',
    }),
    sl('check', 'Check: use a contrast clue', {
      chk: 'mc_vocab_gregarious',
      n: 'Try this one. Unlike her gregarious brother, who loved parties, Anu preferred her own company. Use the contrast to work out the meaning of gregarious.',
    }),
    sl('concept', 'Answering 1-mark and 2-mark questions', {
      v: vTwoMark,
      bl: [
        '**Multiple choice:** eliminate options the passage does not support; beware options that are true in life but not in the passage.',
        '**Complete the sentence:** continue the given words grammatically.',
        '**Two-mark answers:** point + evidence + explanation, about 30–40 words, in your own words.',
        '**Evaluation (Do you agree…?):** either view, if it is supported.',
      ],
      n: 'Now, how to write answers. For multiple choice, eliminate options the passage does not support, and beware options that are true in real life but not in the text. When completing a sentence, continue the words you are given grammatically. A two-mark answer needs a point, evidence and a short explanation, in about thirty to forty words. For do you agree questions, either view earns marks if you support it.',
    }),
    sl('concept', 'How the discursive passage is marked', {
      b: 'The board fixes the total (10 marks); SOYL models it with six 1-mark parts and two 2-mark parts. Accuracy and relevance earn marks, not length.',
      v: vMarks1,
      n: 'Here is how SOYL models the ten marks. Six one-mark parts: multiple choice on purpose, inference or tone, a sentence to complete, a true or false statement, and a word to find. Then two two-mark answers of about thirty to forty words. Marks reward the right point with support. Copying long chunks of the passage, or writing much more than needed, earns nothing extra.',
    }),
    sl('summary', 'Summary: the discursive passage', {
      bl: [
        'Five steps: questions → skim → scan → read closely → answer and check.',
        'Know the shape: opening, claim, reasons, counter-point, conclusion.',
        'Inference = clue + reasoning; tone = attitude shown by word choice.',
        'Use context clues; give the passage\'s own word in the right form.',
        'Two-mark answers: point + evidence + explanation, about 30–40 words.',
      ],
      v: vPlan,
      n: 'To sum up. Follow the five steps: questions, skim, scan, read closely, answer and check. Know the shape of a discursive passage, so you can find the claim, reasons and counter-point. Base every inference on a clue, and name tone precisely. Use context clues for vocabulary, and give the passage’s own word. And keep two-mark answers to a point, evidence and explanation.',
    }),
    sl('exam-tips', 'Exam tips: the discursive passage', {
      bl: [
        'Spend about 20–22 minutes on Q1; do not let it eat into the literature section.',
        'Answer from the passage, not from general knowledge.',
        'Watch for NOT and EXCEPT in questions.',
        'For find-the-word questions, check the paragraph number and the part of speech.',
        'Common slips: copying whole sentences; one-word answers to 2-mark questions; tone words that are too vague (*good*, *bad*).',
      ],
      n: 'Exam tips. Give the discursive passage about twenty minutes, then move on. Answer only from the passage, even when you know more about the topic. Watch for the words not and except in questions. In find the word questions, check the paragraph number and the part of speech. And avoid the usual slips: copying whole sentences, one-word answers to two-mark questions, and vague tone words like good.',
    }),
  ],
});

// ---------------------------------------------------------------- deck part 2
const part2 = deck({
  part: 2,
  title: 'Unseen Passages — Part 2: The Case-Based Factual Passage',
  goals: [
    'Read tables and bar charts accurately, with their units',
    'Link claims in a factual passage to the figures in its visual input',
    'Use percentages, percentage points, fractions and multiples correctly',
    'Draw fair conclusions and spot claims the figures do not support',
    'Answer 1-mark and 2-mark questions on text and visual together',
  ],
  slides: [
    sl('title', 'Unseen Passages — Part 2: The Case-Based Factual Passage', {
      b: 'Q2 of Section A is a **factual passage of 200–250 words with a visual input**, usually a table or chart, worth 10 marks. Questions use the text, the visual, or both together.',
      v: vSectionA,
      n: 'Welcome to Part Two. The second passage in Section A is factual. It reports on something real-world, such as a survey, a scheme or a trend, in about two hundred to two hundred and fifty words, and it comes with a table or a chart. Some questions use only the text, some only the visual, and the hardest use both together.',
    }),
    sl('diagram', 'Read the visual before the questions trip you', {
      b: 'Spend one minute on the visual: what it measures, in what unit, and where the big features are.',
      v: vReadVisual,
      n: 'Before you answer, spend one minute on the visual. Read its title and caption, so you know what is being measured, where and when. Read the labels and units. Find the highest value, the lowest, and the biggest change. Then read the text, and for each claim it makes, find the figure that matches. Many wrong answers come from skipping this minute.',
    }),
    sl('concept', 'Reading a table', {
      b: 'Read **across** a row to follow one item; read **down** a column to compare items at one time. Check the unit in each heading.',
      v: vSaplings,
      n: 'Let us read a table. Each row here is a year of a school’s planting drive. Read across a row to follow one year: in twenty twenty-two, two hundred saplings were planted and one hundred and twenty survived, sixty per cent. Read down a column to compare years. The survival rate climbs from sixty to seventy-six to eighty-five per cent. That climb is the story of this table.',
    }),
    sl('concept', 'Reading a bar chart', {
      b: 'The **horizontal axis** shows the categories or time; the **vertical axis** shows the quantity and its unit. Compare bar heights only after checking the scale.',
      v: vSteps,
      n: 'Now a bar chart. Along the bottom are the six weeks of a fitness challenge. Up the side are average steps per day. Each bar’s height is the value for that week. The pattern is a steady rise, with one small dip in week five, from seven thousand four hundred to seven thousand three hundred. Small dips like this are exactly what examiners like to ask about.',
    }),
    sl('example', 'Worked example 1: three questions on the chart', {
      bl: [
        '**Which week shows the only fall?** Week 5 (7,400 → 7,300).',
        '**By how much did average steps rise from week 1 to week 6?** 8,100 − 5,200 = **2,900 steps**.',
        '**Complete the sentence: The highest average was in week ___.** **6**, at 8,100 steps.',
      ],
      n: 'Here are three typical questions on that chart. Which week shows the only fall? Week five, from seven thousand four hundred to seven thousand three hundred. By how much did steps rise from week one to week six? Subtract: eight thousand one hundred minus five thousand two hundred is two thousand nine hundred steps. And the highest average? Week six. Always give the unit with your figure.',
    }),
    sl('check', 'Check: what does the bar show?', {
      chk: 'mc_chart_axes',
      n: 'Quick check. A chart has years along the bottom and rainfall in millimetres up the side. What does the height of each bar tell you?',
    }),
    sl('concept', 'The language of numbers', {
      b: 'Many marks are lost on wording, not arithmetic. A difference between two percentages is in **percentage points**.',
      v: vNumLang,
      n: 'Number language matters. When two percentages differ, say percentage points: forty to thirty per cent is a fall of ten points. A change measured against the starting figure is a per cent change: twenty to thirty students is a fifty per cent rise. Use fractions like a quarter, and multiples like doubled. And remember: rose by gives the size of the change, rose to gives the final value.',
    }),
    sl('check', 'Check: points or per cent?', {
      chk: 'fb_points',
      n: 'Fill the blank. A chart shows a rise from twenty-five per cent to thirty-five per cent. What word completes the phrase ten percentage what?',
    }),
    sl('concept', 'Linking the text and the visual', {
      bl: [
        'The text often **summarises** the visual: check that its words match the figures.',
        'The text gives **reasons**; the visual gives **sizes**. Two-mark answers often need both.',
        'If the text says *more than double*, check: is the new figure more than twice the old?',
        'If text and visual seem to disagree, trust the figures and say so.',
      ],
      n: 'The hardest questions link the text and the visual. Usually the text gives reasons and the visual gives sizes, so a good two-mark answer uses both: the cause from the passage and the figure from the chart. Check every summary word against the numbers. If the text says more than double, multiply the old figure by two and compare. If they disagree, trust the figures and say so.',
    }),
    sl('example', 'Worked example 2: does the figure support the claim?', {
      b: '*Demo text:* *By the end of the challenge, the class had nearly doubled its daily steps.*',
      bl: [
        '**Check:** week 1 = 5,200; double = 10,400; week 6 = 8,100.',
        '**Ratio:** 8,100 ÷ 5,200 ≈ 1.6, about one and a half times.',
        '**Verdict:** the claim overstates the rise. A fair summary: *daily steps rose by more than half, from 5,200 to 8,100.*',
      ],
      n: 'Suppose the text says the class nearly doubled its steps. Check it. Double five thousand two hundred is ten thousand four hundred, but week six is only eight thousand one hundred. That is about one and a half times, not nearly double. So the claim overstates the rise. A fair summary would say steps rose by more than half. Judging claims like this earns evaluation marks.',
    }),
    sl('concept', 'Five traps in factual passages', {
      v: vTraps,
      n: 'Watch for five traps. Wrong units: thousands, lakhs, hours or minutes. Axes that do not start at zero, which make small differences look huge. Things that rise together, which do not prove that one causes the other. Overclaiming words, like far more popular for a tiny change. And small samples or a single period, which cannot prove a lasting trend. Naming a trap is often the key to a two-mark answer.',
    }),
    sl('check', 'Check: together is not because', {
      chk: 'tf_correlation',
      n: 'True or false? Ice cream sales and swimming accidents both rise in summer. Does that prove ice cream causes the accidents? Think about what else changes in summer.',
    }),
    sl('concept', 'Vocabulary in factual passages', {
      bl: [
        'Factual passages use **report words**: *respondents, survey, benchmark, decline, subsidy, restoration, seasonal*.',
        'The meaning is usually clear from the sentence: *a government subsidy began to cover part of the cost*.',
        'Find-the-word questions follow the same rule as Q1: the passage\'s own word, in the right form.',
        'Phrasal verbs matter too: *pay off*, *catch up*, *level off*.',
      ],
      n: 'Factual passages use report words, such as respondents, benchmark, decline and subsidy. Their meaning is usually clear from the sentence. A subsidy that covers part of the cost must be money that lowers the price. Find the word questions follow the same rule as before: give the passage’s own word in the right form. Watch phrasal verbs too, like pay off and level off.',
    }),
    sl('check', 'Check: express a proportion', {
      chk: 'mc_fraction',
      n: 'One more. In a survey, two hundred out of eight hundred students read a newspaper daily. Which phrase describes that proportion most accurately?',
    }),
    sl('concept', 'How the factual passage is marked', {
      b: 'Accurate figures **with units** and a clear link between text and visual earn the marks. Opinions not supported by the passage do not.',
      v: vMarks2,
      n: 'Here is how SOYL models the ten marks of question two. Six one-mark parts: read a value, complete a sentence with a figure, decide true or false using both text and visual, and find a word. Then two two-mark answers: explain a trend with figures, or judge whether a claim is supported. Accurate figures, with units, are what turn a vague answer into a full-mark answer.',
    }),
    sl('summary', 'Summary: the case-based factual passage', {
      bl: [
        'One minute on the visual: title, units, highest, lowest, biggest change.',
        'Rows across, columns down; check the scale before comparing bars.',
        'Percentage points for gaps between percentages; check every multiple.',
        'Text gives reasons, visual gives sizes: use both in 2-mark answers.',
        'Watch the traps: units, axes, together-is-not-because, overclaiming, small samples.',
      ],
      v: vReadVisual,
      n: 'To sum up. Spend a minute on the visual first. Read tables across and down, and check the scale before comparing bars. Use percentage points for gaps between percentages, and check every claim of doubling or tripling. In two-mark answers, combine the reason from the text with the figure from the visual. And watch the five traps.',
    }),
    sl('exam-tips', 'Exam tips: the factual passage', {
      bl: [
        'Spend about 15–18 minutes on Q2.',
        'Always write units: *6.4 hours*, *11,000 trips*, *51 per cent*.',
        'Show a quick calculation when you use one (*6,300 − 4,100 = 2,200*).',
        'True/false items often need both the text and the visual.',
        'Common slips: per cent for percentage points; reading the wrong row; adding reasons the passage never gives.',
      ],
      n: 'Exam tips. Give the factual passage about fifteen to eighteen minutes. Always write the unit with every figure. If you calculate, show the quick working in one line. Remember that true or false items often need both the text and the visual. And watch the classic slips: per cent where you mean percentage points, reading the wrong row, and inventing reasons that the passage never gives.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Reading Comprehension: Unseen Passages — Class 10 board notes',
  sections: [
    {
      h: '1. Section A at a glance',
      t: [1, 2],
      b: 'Section A (Reading Skills, **20 marks**) has two unseen passages:\n\n- **Q1 Discursive passage** (400–450 words, 10 marks): the writer discusses an issue or argues a view.\n- **Q2 Case-based factual passage with visual input** (200–250 words, 10 marks): a report with a table, chart or similar visual.\n\nQuestions mix multiple choice, true/false, complete-the-sentence, find-the-word and short answers of about 30–40 words. Every passage is new to you, so the skills, not the topic, are what you prepare.',
      v: vSectionA,
      terms: [
        ['Unseen passage', 'A passage you have not read before, set to test reading skills rather than knowledge.'],
        ['Discursive', 'Discussing an issue from a point of view, with reasons and often a counter-point.'],
      ],
    },
    {
      h: '2. Reading strategies: skim, scan, read closely',
      t: 1,
      b: '**Five-step plan:** read the questions → skim for the gist → scan for each answer → read those lines closely → answer and check.\n\n**Skimming** (for the general idea): title, first and last paragraphs, first sentence of each paragraph.\n\n**Scanning** (for one detail): jump to keywords, names, numbers or the paragraph named in the question.\n\n**Close reading** (for inference, tone and evaluation): read the sentence before and after the key line.',
      v: vPlan,
      vs: [vSkimScan],
      terms: [
        ['Skimming', 'Reading quickly for the general idea of a passage.'],
        ['Scanning', 'Searching quickly for one specific detail.'],
        ['Gist', 'The general meaning or main idea.'],
      ],
    },
    {
      h: '3. The shape of an argument',
      t: 1,
      b: 'Most discursive passages follow this shape: **opening** (a hook) → **claim** (the writer\'s view) → **reasons and examples** → **counter-point** (a limit or the other side) → **conclusion** (summary or call to action).\n\nSignal words help: *Yet, The truth is* (claim); *First, Also, For example* (reasons); *None of this means, Of course, However* (counter-point); *So, In short* (conclusion).\n\n**Main idea questions** need an answer that covers the whole passage, not one paragraph. **Writer\'s purpose questions** ask why a detail is there (to hook, to prove, to contrast, to persuade).',
      v: vParaRoles,
      terms: [
        ['Topic sentence', 'The sentence, usually the first, that states a paragraph\'s main point.'],
        ['Counter-point', 'A point that admits a limit to the writer\'s argument or presents the other side.'],
      ],
    },
    {
      h: '4. Inference and evaluation',
      t: 1,
      b: '**Inference** is a conclusion the text suggests but does not state. It must rest on a clue: *a full tiffin box, no humming, an unopened geometry box → something is troubling her*. Reject options that go beyond the clues.\n\n**Evaluation** asks you to judge: *Do you agree? Is the claim convincing? Which suggestion is most practical?* Either view earns marks if it is supported by the passage.\n\n**Fact or opinion:** a fact can be checked (*attendance rose from 88 to 94 per cent*); an opinion judges or recommends (*every school should…*).',
      v: vInfer,
      terms: [
        ['Inference', 'A reasonable conclusion drawn from clues in the text.'],
        ['Evaluation', 'Judging the writer\'s ideas and supporting your judgement.'],
      ],
    },
    {
      h: '5. Tone and attitude',
      t: 1,
      b: 'Tone is the writer\'s attitude, shown through word choice. Useful tone words: **admiring, appreciative, critical, sarcastic, ironic, nostalgic, apprehensive, concerned, objective, balanced, optimistic, pessimistic, humorous**.\n\nProve a tone with the writer\'s words: *How wonderful that cars can now reach the next traffic jam sooner* is sarcastic because it praises something bad. A paragraph that admits *None of this means structure is the enemy* is balanced.\n\nAvoid vague words such as *good*, *bad* or *nice*.',
      v: vTone,
      terms: [['Sarcasm', 'Mocking by saying the opposite of what is meant.']],
    },
    {
      h: '6. Vocabulary in context',
      t: 3,
      b: '**Five clue types:** definition, synonym, contrast, example, general sense.\n\n**Method:** (1) decide the part of speech; (2) find the clue; (3) state the meaning; (4) test it by substitution.\n\n**Find-the-word questions:** give the passage\'s own word, from the paragraph named, in the same part of speech as the meaning given (*unpleasant to bear* → *uncomfortable*, an adjective). A synonym of your own does not earn the mark.\n\n**Opposites and phrases:** some questions ask for an antonym (*rival* ↔ *complementary*) or the meaning of a phrase (*pay off*, *flooded with information*).',
      v: vClues,
      terms: [
        ['Context clue', 'A hint in the surrounding words that shows what an unfamiliar word means.'],
        ['Antonym', 'A word opposite in meaning.'],
      ],
    },
    {
      h: '7. The case-based factual passage and its visual',
      t: 2,
      b: '**Read the visual first:** title and caption, labels and units, highest, lowest, biggest change. Then match each claim in the text to a figure.\n\n**Tables:** read across a row to follow one item, down a column to compare. **Bar charts:** the horizontal axis gives categories or time; the vertical axis gives the quantity and unit; check where the scale starts.\n\n**Number language:** percentage points for the gap between two percentages; per cent for change relative to the start; fractions (*a quarter*); multiples (*doubled*, *more than ten times*); *by* for the size of change, *to* for the final value.\n\n**Traps:** wrong units; axes not starting at zero; things that happen together are not proof of cause; overclaiming words; small samples or a single period.',
      v: vReadVisual,
      vs: [vNumLang, vTraps],
      terms: [
        ['Percentage point', 'The arithmetic gap between two percentages: 40% → 30% is 10 points.'],
        ['Correlation', 'Two things changing together; it does not by itself prove that one causes the other.'],
      ],
    },
    {
      h: '8. Writing the answers and managing time',
      t: [1, 2],
      b: '**Multiple choice:** eliminate what the passage does not support; watch NOT and EXCEPT.\n\n**Complete the sentence:** continue the given words grammatically with the passage\'s idea.\n\n**Two-mark answers (about 30–40 words):** point + evidence + explanation; in factual passages, the reason from the text plus the figure, with its unit, from the visual.\n\n**Time:** about 20–22 minutes for Q1 and 15–18 minutes for Q2, so Section A takes under 40 minutes.',
      v: vTwoMark,
      vs: [vMarks1, vMarks2],
    },
  ],
  tips: '**Marks:** Section A, 20 marks: Q1 discursive passage (400–450 words) 10 + Q2 case-based factual passage with visual input (200–250 words) 10 (CBSE 2026-27).\n\n**How marks are awarded (SOYL model of the board pattern):** six 1-mark parts and two 2-mark parts per passage. One-mark parts need the single right option, word or figure; two-mark parts need a point with support, or a reasoned judgement.\n\n**Common mistakes**\n1. Answering from general knowledge instead of the passage.\n2. Giving your own synonym in a find-the-word question.\n3. Vague tone words (*good*, *bad*).\n4. Writing *per cent* where the answer is *percentage points*.\n5. Leaving out units, or reading the wrong row of a table.\n6. Treating two trends that move together as cause and effect.\n\n**Time:** under 40 minutes for the whole section.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['The two passages in Section A', 'Q1 discursive (400–450 words, 10 marks); Q2 case-based factual with visual input (200–250 words, 10 marks).', 'fact', 1],
  ['SOYL five-step plan for a passage', 'Questions → skim → scan → read closely → answer and check.', 'concept', 1],
  ['Skimming', 'Reading fast for the general idea: title, opening, closing, first lines.', 'definition', 1],
  ['Scanning', 'Searching fast for one detail: a name, number, date or keyword.', 'definition', 1],
  ['Where is the main idea usually found?', 'In the opening or claim, and again in the conclusion.', 'concept', 1],
  ['Five parts of a discursive passage', 'Opening, claim, reasons and examples, counter-point, conclusion.', 'concept', 1],
  ['Signal words for a counter-point', '*None of this means…*, *Of course…*, *However…*', 'example', 1],
  ['Topic sentence', 'The sentence that states a paragraph\'s main point, usually the first.', 'definition', 1],
  ['Inference', 'A conclusion the text suggests but does not state; it must rest on a clue.', 'definition', 1],
  ['Fact vs opinion', 'A fact can be checked; an opinion judges or recommends.', 'concept', 1],
  ['Tone', 'The writer\'s attitude to the subject, shown by word choice.', 'definition', 1],
  ['Sarcastic', 'Mocking by saying the opposite of what is meant.', 'definition', 1],
  ['Nostalgic', 'Fondly longing for the past.', 'definition', 1],
  ['Apprehensive', 'Worried about what may happen.', 'definition', 1],
  ['Objective tone', 'Factual, with no personal feeling shown.', 'definition', 1],
  ['Five context-clue types', 'Definition, synonym, contrast, example, general sense.', 'concept', 3],
  ['Four steps for an unfamiliar word', 'Part of speech → clue → meaning → substitution test.', 'concept', 3],
  ['Find-the-word rule', 'Give the passage\'s own word, from the paragraph named, in the same part of speech.', 'exam-tip', 3],
  ['Contrast clue words', '*unlike*, *but*, *whereas*, *instead of*', 'example', 3],
  ['Two-mark answer formula', 'Point + evidence + explanation, about 30–40 words.', 'exam-tip', 1],
  ['Evaluation question (*Do you agree…?*)', 'Either view earns marks if it is supported by the passage.', 'exam-tip', 1],
  ['Reading a visual: first minute', 'Title and caption → labels and units → highest, lowest, biggest change.', 'concept', 2],
  ['Tables: across and down', 'Across a row follows one item; down a column compares items.', 'concept', 2],
  ['40% → 30% is a fall of…', '10 **percentage points** (a 25 per cent fall in the share).', 'concept', 2],
  ['200 of 800 is…', 'a quarter (25 per cent).', 'example', 2],
  ['*Rose by* vs *rose to*', '*by* = size of change; *to* = final value.', 'concept', 2],
  ['Together is not because', 'Two figures rising together do not prove that one causes the other.', 'exam-tip', 2],
  ['Text and visual in 2-mark answers', 'Reason from the text + figure with unit from the visual.', 'exam-tip', 2],
  ['Five traps in factual passages', 'Units, axes not at zero, together-is-not-because, overclaiming, small samples.', 'exam-tip', 2],
  ['Time plan for Section A', 'Q1 about 20–22 minutes, Q2 about 15–18 minutes: under 40 in all.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  title: 'Chapter test (short) — Reading Comprehension: Unseen Passages',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Discursive passage (10 marks)', instr: 'Read the passage and answer all parts. Two-mark answers in about 30–40 words.', items: ['dp_boredom'] },
    { id: 'B', title: 'Section B — Case-based factual passage with visual input (10 marks)', instr: 'Read the passage, study the chart and answer all parts.', items: ['fp_sleep'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  title: 'Chapter test (long) — Reading Comprehension: Unseen Passages',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Discursive passage (10 marks)', instr: 'Attempt one of the two passages and answer all its parts.', items: [{ attempt: 1, keys: ['dp_repair', 'dp_languages'] }] },
    { id: 'B', title: 'Section B — Case-based factual passage with visual input (10 marks)', instr: 'Attempt one of the two passages and answer all its parts.', items: [{ attempt: 1, keys: ['fp_cycles', 'fp_water'] }] },
    { id: 'C', title: 'Section C — Short skill passages (5 marks each)', instr: 'Answer all parts of both passages.', items: ['mp_tone', 'mp_bags'] },
    { id: 'D', title: 'Section D — Objective questions (1 mark each)', instr: 'Answer all questions.', items: ['mc_vocab_impasse', 'mc_pp', 'mc_main_idea', 'mc_not_stated', 'fb_doubled', 'fb_clue_word', 'tf_find_word', 'ar_axis', 'ar_find_word', 'ar_tone_words'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 (discursive passage), t02 (case-based factual passage with visual input) and t03 (vocabulary in context) only; no removed topics for 2026-27',
    originality: 'every passage, example sentence, survey and data set written for this chapter (passage_origin soyl-original); figures invented and captioned illustrative data; no textbook, newspaper, sample-paper or past-paper passage used or adapted',
    pattern: '6 discursive passages (about 430 words) and 6 factual passages with a table or bar chart (200–250 words), each 10 marks as 8 parts (six 1-mark, two 2-mark); 6 short skill passages (5 marks); the short and long chapter tests share no passage',
    data_checks: 'every difference, ratio, total and multiple quoted in a key or model answer recomputed from its data set',
    re_solve: 'author verifier pass: every objective part re-answered from its stem and passage; every model answer checked against the passage and its word limit',
    gate: 'npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter',
  },
});
