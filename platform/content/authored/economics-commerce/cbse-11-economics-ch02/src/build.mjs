// Build CBSE 11 Economics ch02 Collection of Data. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-economics-ch01/src/lib.mjs';
import { mean, sum, rnd, check } from '../../cbse-11-economics-ch01/src/stats.mjs';

setUnit('cbse-11-economics-ch02', 'economics-commerce');
const Qs = await import('./questions.mjs');
const { POP, IDS10, S10, S20, popMean, mean10, mean20, err10, err20, f2, frac10, MAIL, mailRate, mailLost, HV, quotaGirls, quotaBoys, hvTotal } = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures (computed, never typed)
check(sum(POP), 6021, 0, 'sum of the 50 shops');
check(sum(S10) / 10, 122, 2, 'deck mean of the sample');
const sumS10 = sum(S10);
const sumPop = sum(POP);

// ---------------------------------------------------------------- visuals: SVG
const vPrimSec = (() => {
  const s = new Svg(660, 300);
  const rows = [
    ['Originality', 'Original, first-hand', 'Second-hand, borrowed'],
    ['Cost', 'Usually higher', 'Usually lower'],
    ['Time', 'Takes longer', 'Quicker to obtain'],
    ['Suitability', 'Fits the enquiry', 'May not fit; check it'],
    ['Reliability', 'Method known to you', 'Check source and method'],
  ];
  s.rect(150, 14, 240, 38, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(270, 33, 'Primary data', { bold: true, size: 15, color: 'accent' });
  s.rect(410, 14, 240, 38, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(530, 33, 'Secondary data', { bold: true, size: 15, color: 'accent' });
  rows.forEach(([a, b, c], i) => {
    const y = 64 + i * 46;
    s.text(20, y + 20, a, { anchor: 'start', bold: true, size: 14 });
    s.rect(150, y, 240, 40, { color: 'muted', sw: 1.2 });
    s.text(270, y + 20, b, { size: 14 });
    s.rect(410, y, 240, 40, { color: 'muted', sw: 1.2 });
    s.text(530, y + 20, c, { size: 14 });
  });
  return s.visual('Comparison chart of primary and secondary data on five rows: originality, original first-hand versus second-hand; cost, usually higher versus usually lower; time, takes longer versus quicker; suitability, fits the enquiry versus may not fit; reliability, method known versus check source and method', 'Primary versus secondary data at a glance');
})();

const vCensusSample = (() => {
  const s = new Svg(660, 290);
  const grid = (x0, filled, title, sub) => {
    s.text(x0 + 108, 24, title, { bold: true, size: 16, color: 'accent' });
    for (let i = 0; i < 50; i++) {
      const col = i % 10, row = Math.floor(i / 10);
      const cx = x0 + 10 + col * 22, cy = 56 + row * 28;
      const on = filled(i + 1);
      s.parts.push(`<circle cx="${cx}" cy="${cy}" r="9" fill="${on ? 'var(--diagram-accent)' : 'none'}" stroke="${on ? 'var(--diagram-accent)' : 'var(--diagram-muted)'}" stroke-width="1.6"/>`);
    }
    s.text(x0 + 108, 214, sub, { size: 14 });
  };
  grid(40, () => true, 'Census', 'All 50 shops are studied');
  grid(360, (n) => IDS10.includes(n), 'Sample', 'Only 10 of the 50 shops are studied');
  s.text(330, 262, 'Each circle is one shop of the imagined town of Kelvapur', { size: 13, muted: true });
  return s.visual('Two grids of 50 circles, each circle one shop of the imagined town of Kelvapur: in the census grid all 50 circles are filled; in the sample grid only 10 are filled', 'Census studies every unit; a sample studies a representative part');
})();

const vTree = (() => {
  const s = new Svg(700, 300);
  const box = (x, y, w, h, lines, o = {}) => {
    s.rect(x, y, w, h, { fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: 1.8 });
    lines.forEach((t, i) => s.text(x + w / 2, y + h / 2 + (i - (lines.length - 1) / 2) * 18, t, { size: o.size ?? 14, bold: o.bold }));
  };
  box(270, 16, 160, 44, ['Sampling methods'], { bold: true });
  box(95, 112, 180, 48, ['Random sampling', 'equal chance'], { bold: true });
  box(435, 112, 180, 48, ['Non-random sampling', 'chosen by judgement'], { bold: true, color: 'muted' });
  s.line(350, 60, 350, 86, { sw: 1.6 }); s.line(185, 86, 525, 86, { sw: 1.6 });
  s.line(185, 86, 185, 112, { sw: 1.6 }); s.line(525, 86, 525, 112, { sw: 1.6 });
  box(30, 212, 150, 44, ['Lottery method']);
  box(190, 212, 150, 44, ['Random number', 'table']);
  s.line(185, 160, 185, 186, { sw: 1.6 }); s.line(105, 186, 265, 186, { sw: 1.6 });
  s.line(105, 186, 105, 212, { sw: 1.6 }); s.line(265, 186, 265, 212, { sw: 1.6 });
  box(365, 212, 100, 44, ['Judgement'], { color: 'muted' });
  box(475, 212, 100, 44, ['Convenience'], { color: 'muted' });
  box(585, 212, 100, 44, ['Quota'], { color: 'muted' });
  s.line(525, 160, 525, 186, { sw: 1.6 }); s.line(415, 186, 635, 186, { sw: 1.6 });
  s.line(415, 186, 415, 212, { sw: 1.6 }); s.line(525, 186, 525, 212, { sw: 1.6 }); s.line(635, 186, 635, 212, { sw: 1.6 });
  return s.visual('Tree of sampling methods: sampling splits into random sampling, with the lottery method and random number tables, and non-random sampling, with judgement, convenience and quota sampling', 'Two families of sampling, five methods');
})();

const vChecklist = (() => {
  const s = new Svg(700, 250);
  const steps = [
    ['1. Keep it short', 'only what the enquiry needs'],
    ['2. General to specific', 'easy questions come first'],
    ['3. Precise and clear', 'one idea in each question'],
    ['4. Avoid faults', 'no leading or double negative'],
    ['5. Mix question types', 'closed and open-ended'],
    ['6. Pilot and revise', 'test on a few respondents'],
  ];
  steps.forEach(([a, b], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 20 + col * 230, y = 20 + row * 110;
    s.rect(x, y, 200, 72, { fill: 'fill', color: 'accent', sw: 1.8 });
    s.text(x + 100, y + 25, a, { bold: true, size: 14 });
    s.text(x + 100, y + 49, b, { size: 12, muted: true });
    if (col < 2) s.arrow(x + 202, y + 36, x + 226, y + 36, { sw: 1.6 });
  });
  s.path('M 120 94 L 120 104 L 580 104 L 580 118', { sw: 1.2, color: 'muted', dash: true });
  s.head(580, 120, 0, 1, { color: 'muted' });
  return s.visual('Checklist flow for designing a questionnaire in six steps: keep it short, order from general to specific, make questions precise and clear, avoid leading and double-negative questions, mix closed and open-ended questions, then pilot test and revise', 'A six-step checklist for a questionnaire');
})();

const vErrBars = (() => {
  const s = new Svg(560, 290);
  const ch = s.chart({ x0: 0, x1: 3, y0: 0, y1: 2, left: 80, top: 30, width: 400, height: 190, xLabel: 'Sample drawn', yLabel: 'Sampling error (litres)' });
  [[1, err10, 'Sample of 10 shops'], [2, err20, 'Sample of 20 shops']].forEach(([x, e, lab]) => {
    const x0 = ch.X(x - 0.28), x1 = ch.X(x + 0.28);
    s.rect(x0, ch.Y(e), x1 - x0, ch.Y(0) - ch.Y(e), { fill: 'fill', color: 'accent', sw: 1.6, rx: 2 });
    s.text(ch.X(x), ch.Y(e) - 12, f2(e), { size: 13, bold: true });
    s.text(ch.X(x), ch.Y(0) + 38, lab, { size: 12 });
  });
  [0, 0.5, 1, 1.5, 2].forEach((v) => ch.yTick(v, String(v)));
  return s.visual(`Bar chart of the sampling error in an imagined survey of 50 milk shops: the sample of 10 shops has an error of ${f2(err10)} litres and the sample of 20 shops has an error of ${f2(err20)} litres`, 'Imagined survey: the larger random sample is closer to the population mean');
})();

// ---------------------------------------------------------------- visuals: tables and flows
const vRoute1 = flow('LR', ['What data are', 'Primary and secondary data', 'Methods of collecting primary data', 'Designing a questionnaire', 'Pilot survey'], 'Route map of Part 1: what data are, primary and secondary data, methods of collecting primary data, designing a questionnaire and the pilot survey', 'Part 1 at a glance');
const vDefs = table(
  ['Kind of data', 'Who collected them', 'Imagined example (milk trade of Kelvapur)'],
  [
    ['Primary data', 'The investigator, first-hand, for her own enquiry', 'Answers from vendors to her own questions on daily sales'],
    ['Secondary data', 'Someone else; the investigator only uses them', 'Sales figures copied from a published dairy board report'],
  ],
  'Table of definitions: primary data are collected first-hand by the investigator, for example answers from vendors; secondary data are collected by someone else, for example figures copied from a published report',
  'The same table of milk sales can be primary for its collector and secondary for a later user.',
);
const vCareful = table(
  ['Question to ask', 'Why it matters'],
  [
    ['Who collected the data?', 'Trust depends on the collector'],
    ['For what purpose?', 'The purpose shapes what was measured'],
    ['By what method?', 'Weak methods give weak figures'],
    ['When?', 'Old figures may no longer apply'],
  ],
  'Table of four checks before using secondary data, namely who collected it, for what purpose, by what method and when',
);
const vMethods = table(
  ['Method', 'Merits', 'Demerits'],
  [
    ['Personal interview', 'High response; doubts can be cleared', 'Costly and slow; the interviewer may sway replies'],
    ['Mailed questionnaire', 'Low cost; wide coverage', 'Low response; no clarification possible'],
    ['Telephone interview', 'Quick', 'Only people with phones; must be short'],
  ],
  'Table of three methods of collecting primary data, namely personal interview, which has high response but is costly; mailed questionnaire is cheap with wide coverage but has low response; telephone interview is quick but limited to people with phones and short calls',
);
const vFaults = table(
  ['Faulty question (imagined canteen survey)', 'Fault', 'Better version'],
  [
    [`Don't you agree the biryani is wonderful?`, 'Leading', 'How would you rate the biryani? (Poor / Fair / Good)'],
    ['Is the canteen not unclean?', 'Double negative', 'Is the canteen kept clean? (Yes / No)'],
    ['Do you often buy snacks?', 'Ambiguous word often', 'How many days a week do you buy snacks?'],
    ['Do you buy snacks and fruit juice?', 'Two questions in one', 'Ask about snacks and juice separately'],
  ],
  'Table of four faulty canteen questions with the fault and a better version: a leading question, a double negative, an ambiguous word and two questions in one',
);
const vQtypes = table(
  ['Type', 'Answer form', 'Imagined example', 'Handy for'],
  [
    ['Closed-ended', 'Fixed choices: two-way or multiple choice', 'Do you carry lunch from home? (Yes / No)', 'Quick tabulation'],
    ['Open-ended', 'Reply in own words', 'What would you change in the canteen menu?', 'Fresh ideas and reasons'],
  ],
  'Table comparing closed-ended and open-ended questions with an example of each from an imagined canteen survey',
);
const vPilotFlow = flow('LR', ['Draft the questionnaire', 'Pilot survey on a few respondents', 'Find unclear questions; estimate time and cost', 'Revise and run the main survey'], 'Flow of a pilot survey: draft the questionnaire, try it on a few respondents, find unclear questions and estimate time and cost, then revise and run the main survey', 'A pilot comes before the main survey');
const vChoose = table(
  ['Imagined situation', 'Suitable method', 'Reason'],
  [
    ['Fieldworkers must visit 40 stalls in one lane and explain a long form', 'Personal interview', 'Doubts can be cleared on the spot'],
    ['Forms must reach 500 farmers across many villages cheaply', 'Mailed questionnaire', 'Low cost and wide coverage'],
    ['Three quick questions to 60 office workers who all have phones', 'Telephone interview', 'Quick and reaches phone users'],
  ],
  'Table choosing a method for three imagined situations: personal interview for 40 stalls in one lane, mailed questionnaire for 500 scattered farmers, telephone interview for 60 office workers with phones',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Primary data', 'Collected first-hand for the enquiry'],
    ['Secondary data', 'Collected by someone else; check source, purpose, method, date'],
    ['Personal interview', 'High response, clarification; costly'],
    ['Mailed questionnaire', 'Cheap and wide; low response'],
    ['Telephone interview', 'Quick; phones only; short'],
    ['Questionnaire', 'Short, general to specific, precise, no faults, pilot first'],
  ],
  'Summary table of Part 1: primary and secondary data, the three methods of collection and the rules for a questionnaire',
);

const vRoute2 = flow('LR', ['Population and sample', 'Census or sample?', 'Random and non-random sampling', 'Sampling and non-sampling errors', 'Census of India, NSSO and other sources'], 'Route map of Part 2: population and sample, census or sample, random and non-random sampling, sampling and non-sampling errors, and the Census of India, NSSO and other sources', 'Part 2 at a glance');
const vCvS = table(
  ['Point', 'Census', 'Sample'],
  [
    ['Coverage', 'Every unit', 'A representative part'],
    ['Cost', 'High for large populations', 'Lower'],
    ['Time', 'Long', 'Short'],
    ['Accuracy', 'No sampling error', 'Sampling error exists'],
    ['Suitable when', 'Population small; every unit needed', 'Population large; units destroyed by testing; limited funds'],
  ],
  'Table comparing census and sample on coverage, cost, time, accuracy and when each is suitable',
);
const vCases = table(
  ['Imagined case', 'Method', 'Reason'],
  [
    ['A rule change at a cooperative of 25 members; every view counts', 'Census', 'Small population; all views needed'],
    ['Testing how much load a batch of 5,000 fuses carries before breaking', 'Sample', 'Testing destroys the units'],
    ['A quick price check across 800 shops with a small budget', 'Sample', 'Large population, limited money and time'],
  ],
  'Table of three imagined cases: a 25-member cooperative needs a census; testing fuses to breaking needs a sample; a quick price check across 800 shops with a small budget needs a sample',
);
const vLottery = flow('LR', ['Number each unit and write it on a slip', 'Fold and mix the slips well', 'Draw slips one by one without looking', 'Stop at the planned sample size'], 'Flow of the lottery method: number each unit on a slip, mix the slips, draw them one by one, and stop at the planned sample size', 'Lottery method in four steps');
const vNonRandom = table(
  ['Method', 'How units are chosen', 'Imagined illustration'],
  [
    ['Judgement', 'Investigator picks units she thinks typical', 'She selects the shops she feels are average'],
    ['Convenience', 'Whoever is easiest to reach', 'The first thirty people at a bus stand'],
    ['Quota', 'Fixed numbers from each category; interviewer chooses within them', 'Meet 20 women and 30 men, any willing persons'],
  ],
  'Table of three non-random methods: judgement sampling, convenience sampling and quota sampling, each with how units are chosen and an imagined illustration',
  'Non-random methods are open to the investigator\'s bias.',
);
const vErrSteps = table(
  ['Step', 'Working', 'Result'],
  [
    ['1. Add the 10 sampled values', S10.join(' + '), String(sumS10)],
    ['2. Sample mean', `${sumS10} ÷ 10`, `${f2(mean10)} litres`],
    ['3. Population mean (register of 50 shops)', `${sumPop} ÷ 50`, `${f2(popMean)} litres`],
    ['4. Sampling error', `${f2(mean10)} − ${f2(popMean)}`, `**${f2(err10)} litres**`],
  ],
  `Table of the worked example: ten sampled values add to ${sumS10}, the sample mean is ${f2(mean10)} litres, the population mean is ${f2(popMean)} litres, and the sampling error is ${f2(err10)} litres`,
  'Imagined survey of 10 of the 50 milk shops of Kelvapur.',
);
const vNonSamp = table(
  ['Non-sampling error', 'What it is', 'Imagined illustration'],
  [
    ['Errors in data acquisition', 'Wrong recording or measurement of answers', 'A sale of 84 litres written as 48'],
    ['Non-response', 'Chosen respondents do not answer', 'Several shopkeepers refuse to talk'],
    ['Sampling bias', 'A faulty plan favours some units', 'Only shops on the main road are chosen'],
    ['Arithmetic errors', 'Mistakes in adding or averaging', 'A column of sales is added wrongly'],
  ],
  'Table of four non-sampling errors: errors in data acquisition, non-response, sampling bias and arithmetic errors, each with an imagined illustration',
  'A census can suffer from these too.',
);
const vSources = table(
  ['Source', 'What it is', 'What it provides'],
  [
    ['Census of India', 'Count of the whole population every ten years', 'Population, demographic, social and economic data'],
    ['National Sample Survey Organisation', 'Nationwide sample surveys in rounds', 'Consumption expenditure, employment and other subjects'],
    ['Reserve Bank of India publications', 'Reports and data from the central bank', 'Money, banking and the economy'],
    ['Economic Survey', 'Yearly review of the economy', 'Overall economic position'],
    ['Labour Bureau reports', 'Reports on labour matters', 'Wages, employment and labour conditions'],
  ],
  'Table of secondary sources: Census of India, National Sample Survey Organisation, Reserve Bank of India publications, Economic Survey and Labour Bureau reports, each with what it is and the data it offers',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Population and sample', 'All units under study versus a representative part'],
    ['Census versus sample', 'Complete but costly versus cheaper but with sampling error'],
    ['Random sampling', 'Equal chance: lottery method, random number tables'],
    ['Non-random sampling', 'Judgement, convenience, quota'],
    ['Sampling error', 'Sample estimate minus true value; tends to fall as the sample grows'],
    ['Non-sampling errors', 'Acquisition, non-response, sampling bias, arithmetic'],
    ['Census of India and the NSSO', 'Every ten years, whole population; sample surveys in rounds'],
  ],
  'Summary table of Part 2: population and sample, census versus sample, random and non-random sampling, sampling error, non-sampling errors, and the Census of India and NSSO',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Collection of Data — Part 1: Primary and Secondary Data and Methods of Collection',
  goals: [
    'Define primary and secondary data and compare them',
    'Describe the personal interview, mailed questionnaire and telephone interview, with their merits and demerits',
    'Design a clear questionnaire and explain the pilot survey',
    'Choose a suitable method of collection for a given situation',
  ],
  slides: [
    sl('title', 'Collection of Data', {
      b: 'Part 1 — where **data** come from and how an investigator **collects** them.',
      v: vRoute1,
      n: 'Before any average, graph or conclusion, someone has to collect the facts. Good data make a good study, and careless data spoil it. In this part we learn what primary and secondary data are, three ways of collecting primary data, how to design a questionnaire, and why a small trial run called a pilot survey is worth the effort.',
    }),
    sl('concept', 'What are data?', {
      b: '**Data** are the raw material of statistics: facts, figures and observations collected for a purpose.',
      bl: ['Raw data become **information** only after they are organised, presented and analysed.', 'How good the conclusion is depends on how good the data are.'],
      n: 'Data are the raw material of statistics. They are the facts and figures that investigators gather. Raw data on their own say little. Only after they are organised, shown in tables and graphs, and analysed do they turn into information. So the quality of every later step depends on how carefully the data were collected in the first place.',
    }),
    sl('concept', 'Primary and secondary data', {
      b: '**Primary data** are collected first-hand by the investigator for a specific purpose. **Secondary data** are collected by someone else and used by the investigator.',
      v: vDefs,
      n: 'Primary data are collected first-hand by the investigator for the enquiry at hand. If you ask Kelvapur milk vendors about their daily sales yourself, those answers are primary data. Secondary data are collected by someone else and only used by you, such as sales figures copied from a published dairy report. The very same table can be primary for its collector and secondary for the next user.',
    }),
    sl('diagram', 'Primary versus secondary data', {
      v: vPrimSec,
      n: 'Compare the two on five points. Primary data are original and first-hand, usually costlier and slower to collect, and they fit the enquiry exactly because you design the collection. Secondary data are second-hand, cheaper and quicker, but they may not fit your purpose. So the investigator must check the source and the method before trusting them.',
    }),
    sl('concept', 'Using secondary data with care', {
      b: 'Published figures were gathered for **someone else\'s purpose**. Ask four questions before using them.',
      bl: ['**Who** collected the data?', '**For what purpose**, and by what **method**?', '**When** were they collected?', 'Do the definitions and units **match** your enquiry?'],
      n: 'Secondary data save time and money, but they come with a warning. They were gathered for another purpose, perhaps with different definitions. Before using them, ask who collected them, for what purpose, by what method and when. If the answers do not suit your enquiry, the figures may mislead you, however neat the published table looks.',
    }),
    sl('check', 'Quick check: which kind of data?', {
      b: 'A student copies monthly price figures from a dairy board report. Which kind of data are these?',
      chk: 'm_secondary_eg',
      n: 'Ask who gathered the figures and for whose purpose. Did the student collect them first-hand, or is she borrowing numbers that someone else collected?',
    }),
    sl('diagram', 'Three methods of collecting primary data', {
      v: vMethods,
      n: 'There are three common ways to collect primary data. In a personal interview the investigator asks questions face to face. In a mailed questionnaire, forms are sent out and returned. In a telephone interview, respondents are questioned by phone. Each has merits and demerits, and the right choice depends on money, time, the number of respondents and how complicated the questions are.',
    }),
    sl('concept', 'Personal interview', {
      b: 'The investigator meets each respondent and asks the questions in person.',
      bl: ['**Merits:** high response; doubts can be cleared; the interviewer can observe.', '**Demerits:** costly and slow over a wide area; the interviewer may **influence** the answers.', 'Best for a small area and complicated questions.'],
      n: 'In a personal interview, the investigator meets the respondent and asks the questions directly. The merits are a high response and the chance to clear doubts on the spot. The demerits are cost and time, especially over a wide area, and the risk that the interviewer influences the answers. It suits small areas and questions that need explaining.',
    }),
    sl('concept', 'Mailed questionnaire and telephone interview', {
      b: 'Two cheaper ways of reaching respondents.',
      bl: ['**Mailed questionnaire:** low cost and wide coverage, but **low response** and **no clarification** of doubts.', '**Telephone interview:** quick, but limited to people who have **telephones**, and the call must be **short**.'],
      n: 'A mailed questionnaire is posted or sent by electronic mail. It is cheap and reaches many people, but many forms never come back, and nobody is there to explain a confusing question. A telephone interview is quick, yet it reaches only people who own a phone, and respondents will not stay on a long call.',
    }),
    sl('check', 'Quick check: interview strengths and weaknesses', {
      b: 'A personal interview gets a high response and lets doubts be cleared, but it can be costly. True or false?',
      chk: 'tf_interview',
      n: 'Think about what the interviewer can do face to face, and about what that costs in travel, staff and time. Then decide whether the statement is true or false.',
    }),
    sl('diagram', 'Questionnaire design: a six-step checklist', {
      v: vChecklist,
      n: 'A questionnaire is a list of questions put to respondents. Follow six steps. Keep it short. Order the questions from general to specific. Make each question precise and clear. Avoid leading questions, double negatives, ambiguous words and questions that embarrass. Mix closed-ended and open-ended questions where suitable. Finally, test it on a few people before the real survey.',
    }),
    sl('concept', 'Faulty questions and better versions', {
      b: 'Look at four faults from an imagined school canteen survey.',
      v: vFaults,
      n: 'A leading question pushes the respondent towards an answer. A double negative confuses her. An ambiguous word such as often means different things to different people. And a question with two parts, such as snacks and juice, cannot be answered with a single reply. In each case, the better version is neutral, clear and asks just one thing.',
    }),
    sl('example', 'Worked example 1: repair a questionnaire', {
      b: 'An imagined canteen survey has the question: Do you not dislike the canteen tea? Repair it step by step.',
      bl: [
        'Step 1 — Spot the fault: **not** and **dislike** together make a **double negative**.',
        'Step 2 — State what you really want to know: whether the student **likes** the tea.',
        'Step 3 — Rewrite as a **closed-ended** question: Do you like the canteen tea? (Yes / No).',
        'Step 4 — Check: one idea, neutral wording, easy to tabulate.',
      ],
      n: 'Take the question: do you not dislike the canteen tea. Step one, spot the fault. The words not and dislike together form a double negative, and a student may answer yes when she means no. Step two, decide what you really want to know: whether she likes the tea. Step three, rewrite it plainly with fixed choices. Step four, check that it asks one thing only.',
    }),
    sl('concept', 'Closed-ended and open-ended questions', {
      b: 'A questionnaire can use both kinds of question.',
      v: vQtypes,
      n: 'A closed-ended question gives fixed answers to choose from. It may be two-way, with yes or no, or multiple choice. It is easy to tabulate. An open-ended question lets the respondent reply in her own words, which brings out reasons and fresh ideas but is harder to tabulate. A good questionnaire uses each where it suits.',
    }),
    sl('check', 'Quick check: type of question', {
      b: 'Do you sell curd along with milk? (Yes / No). What type of question is this?',
      chk: 'm_closed',
      n: 'Look at the answers allowed. If the respondent must pick from fixed choices, the question is closed-ended. If she may reply freely, it is open-ended.',
    }),
    sl('concept', 'The pilot survey', {
      b: 'A **pilot survey** is a small trial run of the enquiry that tests the questionnaire and gives an estimate of the **cost and time** of the main survey.',
      v: vPilotFlow,
      n: 'A pilot survey is a small trial run. You try the questionnaire on a few respondents before the real survey. It reveals unclear or badly ordered questions while they are still easy to fix, and it gives a fair estimate of how much time and money the main survey will need. Skipping the pilot can mean discovering faults after thousands of forms are filled.',
    }),
    sl('example', 'Worked example 2: choose the method', {
      b: 'Match each imagined situation with a suitable method of collection.',
      bl: [
        'Step 1 — Note **how many** respondents there are, **where** they live and how **complex** the questions are.',
        'Step 2 — Forty stalls in one lane with a long form: **personal interview**.',
        'Step 3 — Five hundred scattered farmers and a small budget: **mailed questionnaire**.',
        'Step 4 — Sixty office workers with phones and three quick questions: **telephone interview**.',
      ],
      v: vChoose,
      n: 'To choose a method, note how many respondents there are, where they live, and how complex the questions are. Forty stalls in one lane with a long form suit personal interviews. Five hundred scattered farmers and a small budget suit a mailed questionnaire. Sixty office workers with phones and three quick questions suit a telephone interview. The situation decides the method.',
    }),
    sl('check', 'Quick check: name the trial run', {
      b: 'A trial run of a survey on a few respondents is called a ___ survey.',
      chk: 'fb_pilot',
      n: 'Recall what an investigator does before the main survey to test the questionnaire on a small group. Use the single word that names this step.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Let us recap. Data are the raw material of statistics. Primary data are collected first-hand, and secondary data come from someone else and must be checked. The three methods of collecting primary data are personal interview, mailed questionnaire and telephone interview, each with strengths and limits. A good questionnaire is short, ordered, clear and fault-free, and it is tested in a pilot survey first.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Give the **standard definition** first, then an example.',
        'For compare-type questions, use **a table or numbered points**, one point for each side.',
        'For each method of collection, write **both** a merit and a demerit.',
        'When asked to improve a question, **name the fault**, then rewrite it.',
        'Use your own imagined examples; do not copy examples from the textbook.',
      ],
      n: 'Some tips. Begin with the definition, then add an example. In comparison questions, give a point for each side in a table or in numbered points. For each method of collection, always state a merit and a demerit. When asked to improve a question, name the fault first and then rewrite it. And make up your own examples rather than copying from any book.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Collection of Data — Part 2: Census, Sampling, Errors and Sources of Secondary Data',
  goals: [
    'Define population, census and sample, and compare census and sample methods',
    'Describe random methods (lottery, random number tables) and non-random methods (judgement, convenience, quota)',
    'Calculate and explain sampling error, and name the non-sampling errors',
    'Describe the Census of India, the NSSO and other secondary sources',
  ],
  slides: [
    sl('title', 'Census, Sampling and Sources of Data', {
      b: 'Part 2 — **how much** to study, **how to choose** it, what can **go wrong** and where to find ready-made data.',
      v: vRoute2,
      n: 'In this part we ask how much of a group should be studied. Should we study every unit, or only a part? We learn how a sample is chosen, how errors creep in, and how to measure sampling error with a small imagined example. We finish with two great sources of secondary data in India, the census and the national sample surveys.',
    }),
    sl('concept', 'Population and sample', {
      b: 'The **population** (universe) is the complete group of units about which information is wanted. A **sample** is a representative part of the population that is actually studied.',
      v: vCensusSample,
      n: 'The population, also called the universe, is the whole group of units about which we want information. The units need not be people. They can be shops, farms or bulbs. A sample is a representative part of that group. Here, the imagined town of Kelvapur has fifty shops. A census studies all fifty. A sample studies only ten, chosen to represent the rest.',
    }),
    sl('concept', 'The census method', {
      b: 'In the **census method** every unit of the population is studied.',
      bl: ['The result is free of **sampling error**.', 'It needs much **time, money and staff** when the population is large.', 'Suitable when the population is **small**, or when detail on **every** unit is needed.'],
      n: 'In the census method, every unit of the population is studied. Because nothing is left out, there is no sampling error. The price is paid in time, money and staff, which can be huge for a large population. So a census suits small populations, or enquiries where information on every single unit is essential.',
    }),
    sl('diagram', 'Census versus sample', {
      v: vCvS,
      n: 'Compare them on five points. A census covers every unit, while a sample covers a representative part. A census costs more and takes longer for a large population. A census has no sampling error, but a sample does. A census is suitable for small populations, and a sample for large ones, for limited funds, or when testing destroys the units.',
    }),
    sl('check', 'Quick check: what is the population?', {
      b: 'The register of all 50 milk shops of Kelvapur is used for a survey. What are these 50 shops called?',
      chk: 'm_universe',
      n: 'Remember the definition. The complete group of units about which information is wanted has a special name. Decide whether the fifty shops are that complete group, or only a part of it.',
    }),
    sl('concept', 'Census or sample: how to decide', {
      b: 'Weigh four things before choosing.',
      bl: ['**Size** of the population: small favours a census.', '**Cost and time** available.', '**Accuracy** needed.', 'Whether studying a unit **destroys** it.'],
      n: 'Four things decide the choice. The first is the size of the population. A small group favours a census. The second is the money and time available. The third is how accurate the result must be. The fourth is whether studying a unit destroys it. If it does, as when bulbs are burned to failure, only a sample can be tested.',
    }),
    sl('example', 'Worked example 1: census or sample?', {
      b: 'Choose a method for each imagined case.',
      bl: [
        'Step 1 — Ask: is the population small, and is every unit needed?',
        'Step 2 — A cooperative of 25 members wants every view: **census**.',
        'Step 3 — A batch of 5,000 fuses tested until they break: **sample**, since testing destroys them.',
        'Step 4 — A quick price check across 800 shops on a small budget: **sample**.',
      ],
      v: vCases,
      n: 'Ask whether the population is small, and whether every unit is needed. A cooperative with twenty-five members that wants every view should use a census. A batch of five thousand fuses tested until they break needs a sample, because testing destroys them. A quick price check across eight hundred shops on a small budget also needs a sample, as a census would cost too much.',
    }),
    sl('diagram', 'Sampling methods: the family tree', {
      v: vTree,
      n: 'Sampling methods fall into two families. In random sampling every unit has an equal chance of selection. Two methods are the lottery method and random number tables. In non-random sampling, the investigator or interviewer has a hand in the choice. Three methods are judgement sampling, convenience sampling and quota sampling.',
    }),
    sl('concept', 'Random sampling', {
      b: 'In **random sampling** every unit has an **equal chance** of being selected, so personal choice does not enter.',
      bl: ['**Lottery method:** number the units on slips, mix well, draw the required number.', '**Random number table:** read off numbers from a table of random digits and pick the units with those numbers.'],
      n: 'In random sampling, each unit of the population has an equal chance of being chosen, so the investigator cannot favour any unit. In the lottery method, you write every unit number on a slip, mix the slips well, and draw as many as the sample needs. With a random number table, you read numbers from the table and select the units that carry those numbers.',
    }),
    sl('diagram', 'The lottery method, step by step', {
      v: vLottery,
      n: 'Here is the lottery method in four steps. First, number each unit and write the number on a slip. Second, fold the slips and mix them thoroughly. Third, draw slips one by one without looking. Fourth, stop when you have drawn as many as the sample size requires. The units on the slips you drew form the sample.',
    }),
    sl('concept', 'Non-random sampling', {
      b: 'In **non-random sampling** the units are not chosen by a chance device, so they do **not** all have an equal chance.',
      v: vNonRandom,
      n: 'In non-random sampling a chance device does not decide. In judgement sampling, the investigator picks units she believes are typical. In convenience sampling, she takes whoever is easiest to reach. In quota sampling, interviewers must meet fixed numbers from each category but choose the individuals themselves. All three can carry the own bias of the investigator into the sample.',
    }),
    sl('check', 'Quick check: name the method', {
      b: 'A surveyor interviews the first thirty people who pass the bus stand because they are easy to reach. Which method is this?',
      chk: 'm_conv',
      n: 'Notice how the people were chosen. Was any chance device used, or were they simply the easiest to reach? Then match the description to the right method.',
    }),
    sl('concept', 'Sampling error', {
      b: '**Sampling error** is the difference between a sample estimate and the true population value. It tends to **fall as the sample grows**, and is nil in a census.',
      v: vErrBars,
      n: 'A sample covers only some units, so its estimate rarely equals the true value for the whole population. The gap is the sampling error. Drawing a larger random sample usually shrinks it, because the sample resembles the population more closely. In this imagined survey of fifty shops, the larger sample of twenty has a far smaller error than the sample of ten. In a census, the error is nil.',
    }),
    sl('example', 'Worked example 2: computing a sampling error', {
      b: 'An imagined register lists the daily milk sales of all 50 shops of Kelvapur. A random number table selects 10 shops.',
      v: vErrSteps,
      bl: ['The sample of 10 overstates the population mean by the sampling error.', 'A different random sample would give a different error.'],
      n: 'Ten shops were drawn at random. Add their daily sales to get a total, divide by ten to find the sample mean, and compare it with the population mean from the register. The difference, sample mean minus population mean, is the sampling error. A different random sample of ten shops would give a different error.',
    }),
    sl('concept', 'Non-sampling errors', {
      b: '**Non-sampling errors** arise in collecting and processing data, not from studying only a part. Even a census can have them.',
      v: vNonSamp,
      n: 'Non-sampling errors come from how the work is done, not from sampling itself. They include errors in data acquisition, such as recording or measuring wrongly, non-response, sampling bias from a faulty selection plan, and arithmetic errors. A bigger sample does not cure them, and a census can suffer from them too. Training, checking and follow-up are the remedies.',
    }),
    sl('check', 'Quick check: how much is sampled?', {
      b: 'A researcher draws 10 of the 50 milk shops of Kelvapur. What percentage of the population is in the sample?',
      chk: 'num_fraction',
      n: 'Divide the sample size by the population size, then express the answer as a percentage of the whole population.',
    }),
    sl('concept', 'Census of India', {
      b: 'The **Census of India** is conducted **every ten years** by the Office of the Registrar General and Census Commissioner, India.',
      bl: ['It counts the **whole population** and collects **demographic, social and economic** data such as literacy, occupation and housing.', 'The first **synchronous** census, with the count made at the same time across the country, was held in **1881**.'],
      n: 'The Census of India is held every ten years by the Office of the Registrar General and Census Commissioner, India. It is a count of the whole population and collects demographic, social and economic data, such as literacy, occupation and housing. The first synchronous census, in which the count was made at the same time across the country, was held in eighteen eighty one.',
    }),
    sl('concept', 'The National Sample Survey Organisation', {
      b: 'The **NSSO**, set up in **1950**, conducts nationwide **sample surveys**, called **rounds**, on consumption expenditure, employment and unemployment, and other subjects.',
      bl: ['**Dated note (as of 2024):** after a merger in 2019, the NSSO is part of the **National Statistics Office** under the Ministry of Statistics and Programme Implementation.'],
      n: 'The National Sample Survey Organisation was set up in nineteen fifty. It conducts nationwide sample surveys in rounds, on subjects such as household consumption expenditure and employment and unemployment. Note the date. As of twenty twenty four, after a merger in twenty nineteen, it forms part of the National Statistics Office under the Ministry of Statistics and Programme Implementation.',
    }),
    sl('diagram', 'Sources of secondary data', {
      v: vSources,
      n: 'Besides the census and the sample surveys, investigators use publications of the Reserve Bank of India, which cover money, banking and the economy, the Economic Survey, a yearly review of the economy, and reports of the Labour Bureau on wages, employment and labour conditions. As with all secondary data, check the source and the method before using them.',
    }),
    sl('check', 'Quick check: the sample survey body', {
      b: 'What is the NSSO best known for conducting?',
      chk: 'm_nsso_does',
      n: 'Recall that the census is a full count, while the national sample survey organisation takes samples. Pick the option that describes its work.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. The population is the whole group, and a sample is a representative part. A census studies everything and has no sampling error, but it costs more. Random methods are the lottery and random number tables, and non-random methods are judgement, convenience and quota. Sampling error tends to fall as the sample grows, and non-sampling errors need careful work. The census and the sample surveys are major sources of secondary data.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Define **population**, **sample**, **census** and **sampling error** in standard words.',
        'In census-versus-sample answers, give **cost, time, accuracy and suitability**.',
        'For sampling error, show **sample estimate minus population value**, with the unit.',
        'Name the **agency, interval and kind of data** when writing on the Census of India and the NSSO.',
        'For the NSSO, add the dated note about its present place in the National Statistics Office.',
      ],
      n: 'A few tips. Define population, sample, census and sampling error in standard words. When comparing census and sample, cover cost, time, accuracy and suitability. For sampling error, write sample estimate minus the population value, with the unit. When writing on the census or the national sample survey organisation, name the agency, the interval and the kind of data, and mention the dated note.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Collection of Data — Notes',
  sections: [
    {
      h: '1. Primary and secondary data',
      t: 1,
      b: `Statistics begins with **data**, the raw facts and figures that an investigator collects. Where the data come from decides how much they cost and how far they can be trusted.\n\n**Primary data** are gathered first-hand by the investigator for her own enquiry. **Secondary data** were gathered by someone else and are only used by the investigator, usually from published reports.\n\n**Comparison:** primary data are original, costlier, slower and fit the purpose exactly; secondary data are second-hand, cheaper, quicker and may not fit. Before using secondary data check **who** collected them, **for what purpose**, by **what method** and **when**.`,
      terms: [
        ['Data', 'The raw facts, figures and observations collected for a purpose; the raw material of statistics.'],
        ['Primary data', 'Data collected first-hand by the investigator for a specific purpose.'],
        ['Secondary data', 'Data collected by someone else and used by the investigator.'],
      ],
      v: vPrimSec,
    },
    {
      h: '2. Methods of collecting primary data and the questionnaire',
      t: 1,
      b: `Three methods: **personal interview** (high response, doubts cleared, but costly and the interviewer may influence replies), **mailed questionnaire** (low cost and wide coverage, but low response and no clarification) and **telephone interview** (quick, but only people with phones and calls must be short).\n\nA **questionnaire** is a set of questions put to respondents. Keep it **short**, order questions from **general to specific**, make them **precise and clear**, and avoid leading questions, double negatives, ambiguous words and questions that embarrass. Use **closed-ended** questions (two-way or multiple choice) and **open-ended** questions where suitable.\n\nBefore the main survey, a **pilot survey** tests the questionnaire on a few respondents and estimates cost and time.`,
      terms: [
        ['Personal interview', 'Collection of data by questioning each respondent face to face.'],
        ['Mailed questionnaire', 'Collection of data by sending forms to respondents to fill in and return.'],
        ['Telephone interview', 'Collection of data by questioning respondents over the telephone.'],
        ['Closed-ended question', 'A question whose answers are chosen from fixed alternatives.'],
        ['Open-ended question', 'A question that the respondent answers in her own words.'],
        ['Pilot survey', 'A small trial run of a survey that tests the questionnaire and estimates cost and time.'],
      ],
      v: vChecklist,
      vs: [vMethods, vFaults],
    },
    {
      h: '3. Population, census and sample',
      t: 1,
      b: `The **population** (universe) is the complete group of units about which information is wanted. In the **census method** every unit is studied; in the **sample method** a representative part is studied and the findings are used for the whole population.\n\n| Point | Census | Sample |\n|---|---|---|\n| Cost | High for large populations | Lower |\n| Time | Long | Short |\n| Accuracy | No sampling error | Sampling error exists |\n| Suitable when | Population small, every unit needed | Population large, funds limited, or testing destroys units |`,
      terms: [
        ['Population (universe)', 'The complete group of units about which information is wanted.'],
        ['Census', 'The method of studying every unit of the population.'],
        ['Sample', 'A representative part of the population that is actually studied.'],
      ],
      v: vCensusSample,
      vs: [vCvS],
    },
    {
      h: '4. Random and non-random sampling',
      t: 1,
      b: `In **random sampling** every unit has an equal chance of selection. Methods: the **lottery method** (numbered slips, well mixed, drawn one by one) and **random number tables**.\n\nIn **non-random sampling** units are not chosen by chance: **judgement sampling** (the investigator picks typical units), **convenience sampling** (whoever is easiest to reach) and **quota sampling** (fixed numbers from each category, the interviewer choosing the individuals). Non-random methods can carry the investigator's bias.`,
      terms: [
        ['Random sampling', 'Selection in which every unit of the population has an equal chance of being chosen.'],
        ['Lottery method', 'Random selection by drawing numbered slips from a well-mixed lot.'],
        ['Random number table', 'A table of digits arranged without pattern, used to pick units by number.'],
        ['Judgement sampling', 'Non-random selection of the units the investigator thinks most typical.'],
        ['Convenience sampling', 'Non-random selection of the units that are easiest to reach.'],
        ['Quota sampling', 'Non-random selection in which fixed numbers are taken from each category.'],
      ],
      v: vTree,
      vs: [vLottery, vNonRandom],
    },
    {
      h: '5. Errors in collecting data',
      t: 1,
      b: `**Sampling error** = sample estimate − true population value. It arises because only some units are studied, and it tends to fall as a random sample grows; it is nil in a census.\n\nImagined worked case: the sample of 10 Kelvapur shops has a total of ${sumS10} litres, so the sample mean is ${f2(mean10)} litres; the population mean of all 50 shops is ${f2(popMean)} litres; the sampling error is ${f2(mean10)} − ${f2(popMean)} = **${f2(err10)} litres**. A larger sample of 20 shops gives a mean of ${f2(mean20)} litres and an error of ${f2(err20)} litres.\n\n**Non-sampling errors** come from the way data are collected and processed: errors in **data acquisition** (recording or measurement), **non-response**, **sampling bias** and **arithmetic errors**. They can occur in a census too.\n\n**Response rate** = forms returned ÷ forms sent × 100. If ${MAIL.sent} forms are sent and ${MAIL.back} return, the rate is ${mailRate} per cent.`,
      terms: [
        ['Sampling error', 'The difference between a sample estimate and the true value for the population.'],
        ['Non-sampling error', 'An error arising from collecting or processing data rather than from sampling.'],
        ['Non-response', 'The failure of chosen respondents to give answers.'],
        ['Sampling bias', 'A systematic tilt in the sample caused by a faulty selection plan.'],
      ],
      v: vErrBars,
      vs: [vNonSamp, vErrSteps],
    },
    {
      h: '6. Census of India and the NSSO',
      t: 2,
      b: `The **Census of India** is conducted every **ten years** by the Office of the Registrar General and Census Commissioner, India. It collects population, demographic, social and economic data such as literacy, occupation and housing. The first synchronous census was held in **1881**.\n\nThe **National Sample Survey Organisation (NSSO)**, set up in **1950**, conducts nationwide sample surveys, in rounds, on consumption expenditure, employment and unemployment and other subjects.\n\n*Dated note (as of 2024):* after a merger in 2019 the NSSO forms part of the National Statistics Office under the Ministry of Statistics and Programme Implementation.`,
      terms: [
        ['Census of India', 'The ten-yearly count of the whole population, with demographic, social and economic data.'],
        ['Synchronous census', 'A census in which the count is made at the same time across the whole country.'],
        ['NSSO', 'The National Sample Survey Organisation, which conducts nationwide sample surveys in rounds.'],
      ],
      v: vSources,
    },
    {
      h: '7. Other sources of secondary data',
      t: 2,
      b: `Besides the census and the NSSO, investigators draw on **Reserve Bank of India publications** (money, banking and the economy), the **Economic Survey** (a yearly review of the economy) and **Labour Bureau reports** (wages, employment and labour conditions). Whichever source is used, check the collector, purpose, method and date.`,
      terms: [['Published source', 'A report or table already issued by an agency, used by others as secondary data.']],
      v: vCareful,
    },
  ],
  tips: `- Write **standard definitions** of primary data, secondary data, population, census and sample, then add a short example.\n- For comparison questions give **one point per side**; for the methods of collection give **a merit and a demerit** each.\n- For sampling error, write **estimate minus true value** and state the unit; remember that a larger random sample tends to lower it.\n- List the four non-sampling errors by name.\n- For the Census of India and the NSSO, name the **agency, interval, year and subjects**, and add the dated note.`,
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Data**', 'The raw facts and figures collected for a purpose; the raw material of statistics.', 'definition', 1],
  ['**Primary data**', 'Data collected first-hand by the investigator for a specific purpose.', 'definition', 1],
  ['**Secondary data**', 'Data collected by someone else and used by the investigator.', 'definition', 1],
  ['Primary versus secondary: cost and time', 'Primary data usually cost more and take longer; secondary data are cheaper and quicker.', 'concept', 1],
  ['Four checks on secondary data', 'Who collected them, for what purpose, by what method, and when.', 'concept', 1],
  ['**Personal interview**: merits and demerits', 'High response and doubts can be cleared; costly, and the interviewer may influence answers.', 'concept', 1],
  ['**Mailed questionnaire**: merits and demerits', 'Low cost and wide coverage; low response and no clarification possible.', 'concept', 1],
  ['**Telephone interview**: merits and demerits', 'Quick; limited to people with telephones and calls must be short.', 'concept', 1],
  ['**Questionnaire**', 'A set of questions put to respondents to collect data.', 'definition', 1],
  ['Rules for a good questionnaire', 'Short; general to specific; precise and clear; no leading, double-negative, ambiguous or embarrassing questions.', 'concept', 1],
  ['**Closed-ended question**', 'A question answered by choosing from fixed alternatives, such as yes or no or multiple choice.', 'definition', 1],
  ['**Open-ended question**', 'A question that the respondent answers in her own words.', 'definition', 1],
  ['**Leading question**', 'A question worded so as to push the respondent towards a particular answer.', 'definition', 1],
  ['**Pilot survey**', 'A small trial run that tests the questionnaire and estimates the cost and time of the main survey.', 'definition', 1],
  ['**Population (universe)**', 'The complete group of units about which information is wanted.', 'definition', 1],
  ['**Census** method', 'Every unit of the population is studied.', 'definition', 1],
  ['**Sample** method', 'A representative part of the population is studied.', 'definition', 1],
  ['Census versus sample: accuracy', 'A census has no sampling error; a sample has sampling error but costs less.', 'concept', 1],
  ['When is a sample the only choice?', 'When studying a unit destroys it, or the population is very large and funds are limited.', 'concept', 1],
  ['**Random sampling**', 'Every unit has an equal chance of being selected.', 'definition', 1],
  ['Two methods of random sampling', 'The lottery method and random number tables.', 'fact', 1],
  ['Three methods of non-random sampling', 'Judgement, convenience and quota sampling.', 'fact', 1],
  ['**Quota sampling**', 'Fixed numbers are taken from each category, with the interviewer choosing the individuals.', 'definition', 1],
  ['**Sampling error**', 'The difference between a sample estimate and the true population value.', 'definition', 1],
  ['How sample size affects sampling error', 'A larger random sample tends to lower it; a census has none.', 'concept', 1],
  ['Non-sampling errors', 'Errors in data acquisition, non-response, sampling bias and arithmetic errors.', 'fact', 1],
  ['**Response rate**', 'Forms returned divided by forms sent, times one hundred.', 'definition', 1],
  ['**Census of India**: who and how often?', 'Office of the Registrar General and Census Commissioner, India; every ten years.', 'fact', 2],
  ['First synchronous census of India', 'Held in 1881.', 'fact', 2],
  ['**NSSO**: set up and role', 'Set up in 1950; conducts nationwide sample surveys in rounds on consumption expenditure, employment and unemployment and other subjects.', 'fact', 2],
  ['NSSO today (as of 2024)', 'Part of the National Statistics Office under the Ministry of Statistics and Programme Implementation, after the 2019 merger.', 'fact', 2],
  ['Other secondary sources', 'Reserve Bank of India publications, the Economic Survey and Labour Bureau reports.', 'fact', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Collection of Data',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_primary_def', 'm_census_body', 'm_samperr_def', 'ar_census_sample'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_pilot', 's2_lottery', 's3_prim_sec'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_methods', 'l_sources'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_milk'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Collection of Data',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_primary_case', 'm_cost', 'm_interview', 'm_leading', 'm_sample_choice', 'm_random', 'm_nonsamp', 'm_first_census', 'ar_random_equal', 'ar_sec_cheap'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_closed_open', 's2_census_sample', { attempt: 1, keys: ['s2_quota', 's2_nsso'] }, 's3_questionnaire', { attempt: 1, keys: ['s3_methods', 's3_nsso_census'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_questionnaire', { attempt: 1, keys: ['l_census_sample', 'l_sampling_errors'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_canteen', 'cb_sources'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-11-economics-ch02 only (primary and secondary data and methods of collection, census and sampling, errors; Census of India, NSSO and other sources)',
    originality: 'every survey, shop, school, cooperative and passage is imagined and written for this chapter; no NCERT text, example, table or exercise and no board or sample-paper item reused',
    data: 'sampling and response figures computed with stats.mjs from an imagined register of 50 shops and asserted with check(): population mean 120.42, sample of 10 mean 122.00, error 1.58, sample of 20 mean 120.45, error 0.03, sampling fraction 20, response rate 80, quotas 20 and 30',
    facts: 'Census every ten years by the Office of the Registrar General and Census Commissioner, India; first synchronous census 1881; NSSO set up 1950; as of 2024 part of the National Statistics Office under MoSPI after the 2019 merger; no population figures or survey results stated',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
