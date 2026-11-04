// Build CBSE 11 Political Science ch14 Social Justice. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch14/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch14', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vThree = (() => {
  const s = new Svg(760, 420);
  const col = (x, name, c, lines) => {
    s.rect(x, 10, 240, 270, { color: c, sw: 2.5 });
    s.text(x + 120, 36, name, { bold: true, size: 16, color: c });
    lines.forEach((ln, j) => s.text(x + 120, 72 + j * 26, ln, { size: 13 }));
  };
  col(10, 'Equal treatment', 'blue', ['For equals', 'Equal rights', 'No discrimination by', 'caste, religion or gender', 'Imagined: one fee', 'for all Brindle readers']);
  col(260, 'Proportionate justice', 'green', ['Reward by effort,', 'skill and kind of work', 'More work, more pay', 'Imagined: a mason who', 'builds three walls', 'earns more than one wall']);
  col(510, 'Special needs', 'brown', ['For people with', 'disadvantages', 'Disability, no access', 'to school or health care', 'Imagined: audio books', 'for a pupil who is blind']);
  s.rect(10, 310, 740, 100, { color: 'accent', sw: 2.5 });
  s.text(380, 338, 'The principles can conflict', { bold: true, size: 16, color: 'accent' });
  s.text(380, 366, 'One scholarship: top scorer, or the applicant in hardship?', { size: 14 });
  s.text(380, 390, 'A society balances them with reasons and a mix of measures', { size: 14 });
  return s.visual('Chart of the three principles of justice. Equal treatment is for equals: equal rights and no discrimination by caste, religion or gender, for example one fee for all readers of an imagined library. Proportionate justice rewards effort, skill and the kind of work, for example a mason who builds three walls earns more than one who builds one. Recognition of special needs is for people with disadvantages, such as disability or no access to school or health care, for example audio books for a pupil who is blind. The principles can conflict, as when one scholarship must go to the top scorer or to the applicant in hardship, and a society balances them with reasons and a mix of measures', 'The three principles of justice, with imagined examples.');
})();

const vVeil = (() => {
  const s = new Svg(760, 440);
  const steps = [
    ['1. Choose the rules of a society', 'All people take part in the choice', 'blue'],
    ['2. Draw the veil of ignorance', 'No one knows his or her future place', 'accent'],
    ['3. Each asks: which rules suit any place?', 'Rich, poor, strong or weak, it could be me', 'green'],
    ['4. Rules for the worst-off are chosen', 'They leave the worst-off as well off as possible', 'brown'],
  ];
  steps.forEach(([a, b, c], i) => {
    const y = 14 + i * 100;
    s.rect(130, y, 500, 70, { color: c, sw: 2.5 });
    s.text(380, y + 26, a, { bold: true, size: 15, color: c });
    s.text(380, y + 51, b, { size: 13 });
    if (i < steps.length - 1) s.arrow(380, y + 70, 380, y + 100, { sw: 2 });
  });
  return s.visual('Flow chart of the veil of ignorance argument. Step one: choose the rules of a society, with all people taking part. Step two: draw the veil of ignorance, so that no one knows his or her future place. Step three: each person asks which rules would suit any place, since rich, poor, strong or weak, it could be me. Step four: rules that leave the worst-off as well off as possible are chosen', 'The veil of ignorance as a flow.');
})();

const vMarketState = (() => {
  const s = new Svg(760, 420);
  const box = (x, name, col, lines) => {
    s.rect(x, 10, 360, 250, { color: col, sw: 2.5 });
    s.text(x + 180, 38, name, { bold: true, size: 18, color: col });
    lines.forEach((ln, j) => s.text(x + 180, 78 + j * 28, ln, { size: 14, bold: j === 0 }));
  };
  box(10, 'Free markets', 'blue', ['Minimal state intervention', 'Competition rewards talent', 'and effort', 'Gives people choice', 'Imagined: Norvale lets', 'sellers compete on price']);
  box(390, 'State intervention', 'green', ['The state ensures basic needs', 'Markets may favour those', 'already advantaged', 'Public services for equal chances', 'Imagined: Kesterby runs', 'free schools and water']);
  s.rect(10, 290, 740, 110, { color: 'accent', sw: 2.5 });
  s.text(380, 320, 'Many societies combine the two', { bold: true, size: 16, color: 'accent' });
  s.text(380, 350, 'Markets for much of the economy, public services for basic needs', { size: 14 });
  s.text(380, 376, 'The mix is debated, and students judge with reasons', { size: 14 });
  return s.visual('Comparison chart of free markets and state intervention. Free markets mean minimal state intervention; competition rewards talent and effort and gives people choice; imagined Norvale lets sellers compete on price. State intervention means the state ensures basic needs; markets may favour those already advantaged; public services give equal chances; imagined Kesterby runs free schools and water. Many societies combine the two, using markets for much of the economy and public services for basic needs; the mix is debated and students judge with reasons', 'Free markets and state intervention compared.');
})();

const vBars = (() => {
  const s = new Svg(760, 440);
  const left = 90, base = 340, hgt = 280, max = 140, bw = 64;
  const Y = (v) => base - (v / max) * hgt;
  s.text(380, 20, 'Imagined yearly income per person, in units', { bold: true, size: 15 });
  [0, 50, 100].forEach((v) => {
    s.line(left, Y(v), 720, Y(v), { sw: 1, color: 'muted', dash: v !== 0 });
    s.text(left - 10, Y(v), String(v), { anchor: 'end', size: 12 });
  });
  s.line(left, Y(0), left, 48, { sw: 1.6 });
  const groups = [['Worst-off fifth', 20, 40, 210], ['Middle three fifths', 50, 55, 400], ['Best-off fifth', 130, 90, 590]];
  groups.forEach(([name, a, b, cx]) => {
    s.rect(cx - bw - 6, Y(a), bw, base - Y(a), { color: 'blue', fill: 'blue', fillOpacity: 0.35, rx: 2 });
    s.rect(cx + 6, Y(b), bw, base - Y(b), { color: 'brown', fill: 'brown', fillOpacity: 0.35, rx: 2 });
    s.text(cx - bw / 2 - 6, Y(a) - 12, String(a), { bold: true, size: 14 });
    s.text(cx + bw / 2 + 6, Y(b) - 12, String(b), { bold: true, size: 14 });
    s.text(cx, base + 22, name, { size: 14 });
  });
  s.rect(200, 388, 20, 20, { color: 'blue', fill: 'blue', fillOpacity: 0.35, rx: 2 });
  s.text(230, 398, 'Rule Set A', { anchor: 'start', size: 14 });
  s.rect(420, 388, 20, 20, { color: 'brown', fill: 'brown', fillOpacity: 0.35, rx: 2 });
  s.text(450, 398, 'Rule Set B', { anchor: 'start', size: 14 });
  return s.visual('Bar chart of imagined yearly income per person on the island of Tamberlay under two rule sets. Worst-off fifth: Rule Set A gives 20 units and Rule Set B gives 40. Middle three fifths: Rule Set A gives 50 and Rule Set B gives 55. Best-off fifth: Rule Set A gives 130 and Rule Set B gives 90. The figures are imagined', 'Imagined income under two rule sets.');
})();

// ---------------------------------------------------------------- tables: Part 1
const vJustDef = table(
  ['Point', 'What justice means'],
  [
    ['Standard definition', 'Justice means giving each person his or her due, treating people fairly according to accepted principles'],
    ['Why it matters', 'Rules and rewards that are just can be defended by reasons that all can examine'],
    ['Related idea', 'Social justice asks whether goods and opportunities are fairly distributed in a society'],
    ['Imagined case', 'The Hollin Exam Board marks every script by the same published scheme'],
  ],
  'Table on the meaning of justice: giving each person his or her due, treating people fairly by accepted principles; just rules can be defended by reasons; social justice asks whether goods and opportunities are fairly distributed; imagined Hollin Exam Board marks every script by the same published scheme',
  'Hollin and its exam board are imagined.',
);
const vTrad = table(
  ['Source', 'Idea of justice'],
  [
    ['Dharma, ancient Indian thought', 'A just order rests on duties and right conduct that sustain society'],
    ['Confucius', 'Rulers should themselves be just and set an example to those they rule'],
    ['Plato, Republic', 'Justice is discussed as a quality of a person and of a well-ordered community'],
    ['Immanuel Kant', 'Every person has dignity and deserves equal consideration'],
  ],
  'Table of ideas of justice: dharma in ancient Indian thought, a just order resting on duties and right conduct; Confucius, rulers should be just; Plato, Republic, justice as a quality of a person and of a well-ordered community; Immanuel Kant, every person has dignity and deserves equal consideration',
);
const vEqual = table(
  ['Point', 'Equal treatment for equals'],
  [
    ['Meaning', 'People in the same position are treated alike, with equal rights'],
    ['What it rules out', 'Discrimination on grounds such as caste, religion or gender'],
    ['Question it asks', 'Are like persons being treated alike?'],
    ['Imagined case', 'Every qualified applicant to the Brindle Library staff is judged by the same test'],
  ],
  'Table on equal treatment for equals: people in the same position are treated alike with equal rights; it rules out discrimination by caste, religion or gender; it asks whether like persons are treated alike; imagined Brindle Library judges every qualified applicant by the same test',
);
const vProp = table(
  ['Point', 'Proportionate justice'],
  [
    ['Meaning', 'Rewards are in proportion to effort, skill and the nature of the work'],
    ['Question it asks', 'Is the reward matched to what the person put in?'],
    ['A caution', 'It does not mean that everyone gets the same pay whatever they do'],
    ['Imagined case', 'In Norvale a mason who builds three walls earns more than one who builds a single wall'],
  ],
  'Table on proportionate justice: rewards in proportion to effort, skill and the nature of the work; it asks whether the reward is matched to what the person put in; it does not mean the same pay for all; in imagined Norvale a mason who builds three walls earns more than one who builds a single wall',
);
const vSpecial = table(
  ['Point', 'Recognition of special needs'],
  [
    ['Meaning', 'People with disadvantages may need special treatment to take part on fair terms'],
    ['Examples of disadvantage', 'Disability, or lack of access to education or health care'],
    ['Question it asks', 'Does this person need special help to have a fair chance?'],
    ['Imagined case', 'The Hollin Exam Board gives a wheelchair user a ground-floor room and extra time'],
  ],
  'Table on recognition of special needs: people with disadvantages may need special treatment; examples are disability or lack of access to education or health care; it asks whether a person needs special help to have a fair chance; imagined Hollin Exam Board gives a wheelchair user a ground-floor room and extra time',
);
const vClassify = table(
  ['Imagined situation in Hollin', 'Principle involved', 'Reason'],
  [
    ['A clerk refuses to register a qualified woman for a trade licence because of her gender', 'Equal treatment for equals', 'A like person is treated unlike'],
    ['A potter who makes forty pots a day is paid more than one who makes ten', 'Proportionate justice', 'Reward follows effort and output'],
    ['A bus company puts a lowered step on one bus for riders who cannot climb', 'Special needs', 'A disadvantage calls for special help'],
    ['The market hall gives stalls by lottery to all licensed sellers', 'Equal treatment for equals', 'All equals have the same chance'],
  ],
  'Worked example table classifying imagined situations in Hollin: refusing a licence to a qualified woman breaks equal treatment; a potter paid more for forty pots than another for ten follows proportionate justice; a lowered bus step follows recognition of special needs; a lottery for stalls among licensed sellers follows equal treatment',
  'The situations in Hollin are imagined.',
);
const vConflictP = table(
  ['Point', 'How the principles can conflict'],
  [
    ['The tension', 'Reward by performance may favour one applicant while special needs favour another'],
    ['Equal treatment', 'Asks that the same rules apply to all and that caste, religion or gender not count'],
    ['Balancing', 'A society states its principles, gives reasons and may use a mix of measures'],
    ['Imagined case', 'The Vellmark Committee gives some awards by test score and some by hardship'],
  ],
  'Table on conflicts among the principles: reward by performance may favour one applicant while special needs favour another; equal treatment asks for the same rules for all; a society balances the principles by stating them, giving reasons and using a mix; imagined Vellmark Committee gives some awards by score and some by hardship',
);
const vScholar = table(
  ['Step', 'Imagined case: one Vellmark scholarship in Brindle'],
  [
    ['1. The applicants', 'Tara scored highest; Imran scored a little lower but lives ten kilometres from a school'],
    ['2. Equal treatment', 'Both are judged by the same rules; no one is judged by caste or gender'],
    ['3. Proportion', 'Tara has the stronger claim on performance'],
    ['4. Special need', 'Imran has the stronger claim on disadvantage'],
    ['5. A balanced answer', 'The committee splits its awards between score and hardship and publishes its reasons'],
  ],
  'Worked example table on one scholarship in imagined Brindle: Tara scored highest and Imran scored a little lower but lives ten kilometres from a school; both are judged by the same rules; Tara has the stronger claim on performance and Imran on disadvantage; the committee splits its awards between score and hardship and publishes its reasons',
  'The committee, the town and the applicants are imagined.',
);
const vDistribution = table(
  ['Point', 'Just distribution'],
  [
    ['Meaning', 'Social justice also concerns the fair distribution of goods and opportunities'],
    ['Goods and opportunities', 'Land, schooling, health care, jobs and the chance to take part in public life'],
    ['The question', 'Is the way these are shared among people fair?'],
    ['Imagined case', 'On Tamberlay a few families hold most of the farmland'],
  ],
  'Table on just distribution: social justice concerns the fair distribution of goods and opportunities such as land, schooling, health care and jobs; it asks whether the sharing is fair; on imagined Tamberlay a few families hold most of the farmland',
);
const vPolicies = table(
  ['Policy a society may choose', 'What it does', 'Some argue, others argue'],
  [
    ['Land reforms', 'Change how land is held, for example by limiting very large holdings and giving plots to the landless', 'Some argue it corrects a deep imbalance; others stress the rights of those who hold the land'],
    ['Reserved places in education and jobs', 'Set aside a share of places for certain groups', 'Some argue it corrects disadvantage; others raise questions about merit and fairness to others'],
  ],
  'Table of policies a society may choose: land reforms change how land is held; reserved places in education and jobs set aside a share of places for certain groups; some argue they correct imbalance or disadvantage, others stress rights of present holders or raise questions of merit and fairness to others',
  'Both are described as policies that a society may choose; reasoning is given on each side.',
);
const vPlan1 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: the three principles of justice'],
  [
    ['1. Define justice', 'Giving each person his or her due, by fair and accepted principles'],
    ['2. Equal treatment', 'Equals treated alike; no discrimination by caste, religion or gender'],
    ['3. Proportionate justice', 'Reward in proportion to effort, skill and the nature of the work'],
    ['4. Special needs', 'Disadvantaged people may need special help'],
    ['5. Conflict and balance', 'They can conflict; a society balances them with reasons'],
  ],
  'Worked example table planning a five mark answer on the three principles of justice: define justice, equal treatment, proportionate justice, special needs, and how they conflict and are balanced',
  'A plan, to be written in your own words.',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Justice', 'Giving each person his or her due, by accepted principles'],
    ['Traditions', 'Dharma, Confucius, Plato; Kant on dignity'],
    ['Three principles', 'Equal treatment; proportionate justice; special needs'],
    ['Conflict', 'Principles can conflict; a society balances them'],
    ['Distribution', 'Fair sharing of goods and opportunities'],
    ['Policies', 'Land reforms and reserved places are policies a society may choose'],
  ],
  'Summary table of Part 1: justice, traditions, the three principles, conflict, distribution and policies',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Saying justice means identical rewards for all', 'Proportionate justice rewards effort, skill and kind of work'],
    ['Forgetting the third principle', 'Name all three: equal treatment, proportion, special needs'],
    ['Treating special needs as favouritism', 'A disadvantage may need special help for a fair chance'],
    ['Taking a side on a policy', 'Write what a society may choose, then give both sets of reasons'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables: Part 2
const vRawlsT = table(
  ['Point', 'John Rawls and A Theory of Justice'],
  [
    ['The book', 'A Theory of Justice, published in 1971'],
    ['The aim', 'To explain which rules of society would be fair'],
    ['The method', 'People imagine choosing the rules from an original position'],
    ['Imagined case', 'Islanders of Tamberlay settle the rules for fishing and farmland before learning their own place'],
  ],
  'Table on John Rawls: the book A Theory of Justice, published in 1971; its aim is to explain which rules of society would be fair; its method is that people imagine choosing the rules from an original position; imagined islanders of Tamberlay settle the rules before learning their own place',
);
const vDifference = table(
  ['Point', 'The rules that would be chosen'],
  [
    ['The reasoning', 'Behind the veil, each person might turn out to be the worst-off'],
    ['The choice', 'Rational people would choose rules that make the worst-off as well off as possible'],
    ['Name', 'This is called the difference principle'],
    ['Imagined case', 'Islanders prefer the rule set that gives the poorest fifth 40 units rather than 20'],
  ],
  'Table on the difference principle: behind the veil each person might turn out to be the worst-off; rational people would choose rules that make the worst-off as well off as possible; imagined islanders prefer the rule set that gives the poorest fifth 40 units rather than 20',
);
const vReadBars = table(
  ['Step', 'Reading the bar chart of Tamberlay'],
  [
    ['1. Worst-off fifth', 'Rule Set A gives 20 units; Rule Set B gives 40'],
    ['2. Best-off fifth', 'Rule Set A gives 130 units; Rule Set B gives 90'],
    ['3. The trade-off', 'B raises the worst-off by 20 units and lowers the best-off by 40'],
    ['4. Behind the veil', 'A person who might be in the worst-off fifth prefers B'],
    ['5. After the veil lifts', 'The best-off may prefer A, which is why the choice is made before the veil lifts'],
  ],
  'Worked example table reading the imagined bar chart of Tamberlay: the worst-off fifth gets 20 units under Rule Set A and 40 under Rule Set B; the best-off fifth gets 130 under A and 90 under B; B raises the worst-off by 20 and lowers the best-off by 40; behind the veil a person who might be in the worst-off fifth prefers B; after the veil lifts the best-off may prefer A',
  'The figures are imagined.',
);
const vNotAlt = table(
  ['Point', 'Where the fairness comes from'],
  [
    ['Not kindness', 'The argument does not ask people to be generous'],
    ['Impartial choice', 'Rules are chosen without knowing one\'s own future place'],
    ['Result', 'Rules that no one could suspect of favouring his or her own position'],
    ['Imagined case', 'A fish seller of Tamberlay agrees to a fair rule because she might be a net mender tomorrow'],
  ],
  'Table on where fairness comes from in the veil of ignorance argument: not kindness, but impartial choice made without knowing one\'s own place; the result is rules that do not favour any known position; an imagined fish seller of Tamberlay agrees to a fair rule because she might be a net mender tomorrow',
);
const vNeeds = table(
  ['Basic need', 'Why it matters (imagined case in Hollin)'],
  [
    ['Adequate nutrition', 'A child who goes hungry cannot study'],
    ['Housing', 'A family without shelter cannot stay secure'],
    ['Clean drinking water', 'Polluted water brings illness'],
    ['Education', 'Reading and numbers open the way to work and to taking part'],
    ['A minimum wage', 'A wage below a living level leaves a worker without security'],
  ],
  'Table of minimum basic needs a just society should ensure: adequate nutrition, housing, clean drinking water, education and a minimum wage, each with an imagined case in Hollin',
  'The cases in Hollin are imagined.',
);
const vMarketT = table(
  ['Point', 'The case for free markets'],
  [
    ['Competition', 'Open competition rewards talent and effort'],
    ['Choice', 'Buyers and sellers have many choices'],
    ['Service', 'Markets generally serve people well'],
    ['The state', 'Supporters favour minimal state intervention'],
    ['Imagined case', 'Norvale lets bakers compete on price and quality; buyers pick the loaf they like'],
  ],
  'Table on the case for free markets: open competition rewards talent and effort; buyers and sellers have choice; markets generally serve people well; supporters favour minimal state intervention; imagined Norvale lets bakers compete on price and quality',
);
const vStateT = table(
  ['Point', 'The case for state intervention'],
  [
    ['Starting positions', 'Markets favour those who are already advantaged'],
    ['The task', 'The state must ensure basic needs and equal opportunity'],
    ['The means', 'Public services such as schools, clinics and water supply'],
    ['Imagined case', 'Kesterby runs free schools and a public water supply, paid for by taxes'],
  ],
  'Table on the case for state intervention: markets favour those already advantaged; the state must ensure basic needs and equal opportunity; the means are public services such as schools, clinics and water supply; imagined Kesterby runs free schools and water paid for by taxes',
);
const vCompare = table(
  ['Feature', 'Norvale (market approach)', 'Kesterby (state approach)'],
  [
    ['Water', 'Private sellers compete on price', 'Town supply, free for all'],
    ['Schools', 'Private schools charge fees', 'Free town schools'],
    ['Strength', 'Wide choice; reward for effort', 'Basic needs met for all'],
    ['Worry', 'Poorer families may go without', 'Higher taxes; narrower choice'],
  ],
  'Worked example table comparing the imagined towns: Norvale uses private sellers and fee schools, with wide choice and reward for effort but a worry that poorer families may go without; Kesterby has a free town water supply and schools, with basic needs met for all but higher taxes and narrower choice',
  'Norvale and Kesterby are imagined.',
);
const vCombine = table(
  ['Point', 'Combining the two approaches'],
  [
    ['In practice', 'Many societies use markets for much of the economy and public services for basic needs'],
    ['The debate', 'People differ on how big each part should be'],
    ['Students', 'State both views with reasons, then judge'],
    ['Imagined case', 'Tamberlay lets traders sell freely but runs a public school in every village'],
  ],
  'Table on combining approaches: many societies use markets for much of the economy and public services for basic needs; people differ on the size of each part; students state both views with reasons then judge; imagined Tamberlay lets traders sell freely but runs a public school in every village',
);
const vPlan2 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: free markets and state intervention'],
  [
    ['1. Basic needs', 'Nutrition, housing, clean water, education, a minimum wage'],
    ['2. Free markets', 'Competition rewards talent and effort; choice; minimal intervention'],
    ['3. State intervention', 'Markets favour the advantaged; public services secure needs'],
    ['4. A combination', 'Many societies use both'],
    ['5. Judgement', 'Weigh the reasons and say which mix seems fairer, and why'],
  ],
  'Worked example table planning a five mark answer on free markets and state intervention: basic needs, free markets, state intervention, combination and judgement',
  'A plan, to be written in your own words.',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Rawls', 'A Theory of Justice, 1971'],
    ['Veil of ignorance', 'Choosing rules without knowing one\'s future place'],
    ['Difference principle', 'Rules that make the worst-off as well off as possible'],
    ['Fairness', 'From impartial choice, not from altruism'],
    ['Basic needs', 'Nutrition, housing, clean water, education, minimum wage'],
    ['Free markets', 'Competition, choice, minimal intervention'],
    ['State intervention', 'Public services; equal opportunity'],
  ],
  'Summary table of Part 2: Rawls, the veil of ignorance, the difference principle, fairness, basic needs, free markets and state intervention',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Saying the veil makes people kind', 'Fairness comes from impartial choice without knowing one\'s place'],
    ['Quoting Rawls from memory', 'Paraphrase the idea and name the book and year'],
    ['Backing one side in the market debate', 'Give both views with reasons, then judge'],
    ['Forgetting the combination', 'Add that many societies combine markets and public services'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Social Justice, Part 1: Justice, Three Principles and Just Distribution',
  goals: [
    'State the standard meaning of justice and name traditions that discuss it',
    'Explain equal treatment for equals, proportionate justice and recognition of special needs',
    'Show how the principles can conflict and how a society may balance them',
    'Explain that social justice concerns the fair distribution of goods and opportunities',
    'Plan a five mark answer on the three principles of justice',
  ],
  slides: [
    sl('title', 'Social Justice: Principles and Distribution', {
      b: 'Part 1: **justice**, its **three principles**, and **just distribution**.',
      v: flow('LR', ['Meaning of justice', 'Traditions', 'Three principles', 'Conflict and balance', 'Just distribution'], 'Route map of Part 1: the meaning of justice, traditions, three principles, conflict and balance, and just distribution', 'Part 1 at a glance'),
      n: 'Every society has to decide what is fair. In this part we ask what justice means, look at three principles that help us judge, see how they can clash, and then ask how goods and opportunities should be shared.',
    }),
    sl('concept', 'What justice means', {
      v: vJustDef,
      n: 'Justice means giving each person his or her due. It means treating people fairly according to principles that are accepted. Social justice goes further and asks whether goods and opportunities are fairly shared in a society. An imagined exam board in Hollin marks every script by the same published scheme.',
    }),
    sl('check', 'Quick check: meaning of justice', {
      b: 'Which statement gives the standard meaning of justice?',
      chk: 'm_just_def',
      n: 'Recall the standard definition of justice.',
    }),
    sl('concept', 'Ideas of justice in different traditions', {
      v: vTrad,
      n: 'Ideas of justice are very old. In ancient Indian thought, dharma links a just order with duties and right conduct. Confucius held that rulers should themselves be just. Plato, in his book the Republic, discusses justice in a person and in a community. Kant said that every person has dignity and deserves equal consideration.',
    }),
    sl('diagram', 'The three principles of justice', {
      v: vThree,
      n: 'This chart shows three principles. Equal treatment for equals means equal rights and no discrimination by caste, religion or gender. Proportionate justice means rewarding effort, skill and the kind of work. Recognition of special needs means that people with disadvantages may need special help. These principles can clash, and a society must balance them.',
    }),
    sl('concept', 'Principle one: equal treatment for equals', {
      v: vEqual,
      n: 'The first principle is equal treatment for equals. People in the same position are treated alike and have equal rights. It rules out discrimination on grounds such as caste, religion or gender. The question to ask is whether like persons are being treated alike. In imagined Brindle every qualified applicant faces the same test.',
    }),
    sl('concept', 'Principle two: proportionate justice', {
      v: vProp,
      n: 'The second principle is proportionate justice. Rewards should be in proportion to effort, skill and the nature of the work. It does not mean the same pay for all whatever they do. In imagined Norvale, a mason who builds three walls earns more than one who builds a single wall.',
    }),
    sl('concept', 'Principle three: recognition of special needs', {
      v: vSpecial,
      n: 'The third principle is recognition of special needs. People with disadvantages, such as a disability, or lack of access to education or health care, may need special treatment to take part on fair terms. The question is whether a person needs special help to have a fair chance. An imagined exam board gives a wheelchair user a ground floor room.',
    }),
    sl('check', 'Quick check: match the principles', {
      b: 'Match each principle with the situation it best supports.',
      chk: 'mt_principles',
      n: 'Pair each principle with the situation it supports.',
    }),
    sl('example', 'Worked example 1: classify the situations in Hollin', {
      b: 'Decide which principle each imagined situation involves.',
      bl: ['Is a **like person** treated unlike?', 'Is the reward matched to **effort**, or is there a **special need**?'],
      v: vClassify,
      n: 'Let us classify four imagined situations in Hollin. Refusing a licence to a qualified woman because of her gender breaks equal treatment. A potter paid more for forty pots than another for ten follows proportionate justice. A lowered bus step follows special needs. A lottery for stalls among licensed sellers follows equal treatment.',
    }),
    sl('concept', 'When the principles conflict', {
      v: vConflictP,
      n: 'The principles can pull in different directions. Reward by performance may favour one applicant, while special needs may favour another. Equal treatment asks that the same rules apply to all. A society balances the principles by stating them, giving reasons and sometimes using a mix of measures.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about proportionate justice is true or false.',
      chk: 'tf_prop',
      n: 'Think about what proportionate justice asks for.',
    }),
    sl('example', 'Worked example 2: one scholarship in Brindle', {
      b: 'Apply the three principles to one imagined scholarship.',
      bl: ['Judge both by the **same rules**', 'Weigh **performance** and **disadvantage**'],
      v: vScholar,
      n: 'In imagined Brindle, a committee has one scholarship. Tara scored highest. Imran scored a little lower but lives ten kilometres from a school. Both are judged by the same rules. Tara has the stronger claim on performance, and Imran on disadvantage. The committee splits its awards between score and hardship and publishes its reasons.',
    }),
    sl('concept', 'Just distribution', {
      v: vDistribution,
      n: 'Social justice also concerns the fair distribution of goods and opportunities. These include land, schooling, health care and jobs. The question is whether the way these are shared among people is fair. On imagined Tamberlay, a few families hold most of the farmland, and the islanders must ask whether this is fair.',
    }),
    sl('concept', 'Policies a society may choose', {
      v: vPolicies,
      n: 'A society may choose policies to change how goods and opportunities are shared. Two examples are land reforms and reserved places in education and jobs. Some argue that such policies correct an imbalance or a disadvantage. Others stress the rights of those who hold land now, or raise questions of merit and fairness to others. Students should weigh both sets of reasons.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence on the meaning of justice.',
      chk: 'fb_just',
      n: 'Recall what justice gives to each person.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on the three principles of justice.',
      bl: ['Define **justice** first', 'Cover **all three** principles, then **conflict**'],
      v: vPlan1,
      n: 'To plan a five mark answer, begin by defining justice. Then give equal treatment, proportionate justice and recognition of special needs, one line each. End with how the principles can conflict and how a society balances them with reasons. Write it in your own words.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Justice means giving each person his or her due. It has been discussed in many traditions. Three principles help us judge, equal treatment, proportion and special needs, and they can conflict. Social justice asks for a fair distribution of goods and opportunities, and land reforms and reserved places are policies a society may choose.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define **justice** first', 'Name **all three** principles', 'Add an **imagined example** to each', 'On policies write **some argue, others argue**'],
      v: vTips1,
      n: 'A few tips. Define justice before you list principles. Name all three principles and add a short imagined example to each. When you write about conflict, say that a society balances them with reasons. On policies such as land reforms or reserved places, write some argue, others argue, then give your reasons.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Social Justice, Part 2: Rawls and Pursuing Social Justice',
  goals: [
    'Explain the veil of ignorance and the original position',
    'Explain why rational people behind the veil would choose rules that help the worst-off',
    'Explain that fairness in this argument comes from impartial choice and not from altruism',
    'Describe minimum basic needs and the views on free markets and state intervention',
    'Plan a five mark answer on pursuing social justice',
  ],
  slides: [
    sl('title', 'Rawls and the Pursuit of Social Justice', {
      b: 'Part 2: the **veil of ignorance**, **basic needs**, **markets** and the **state**.',
      v: flow('LR', ['Rawls and the book', 'Veil of ignorance', 'Rules for the worst off', 'Basic needs', 'Markets and the state'], 'Route map of Part 2: Rawls and the book, the veil of ignorance, rules for the worst-off, basic needs, markets and the state', 'Part 2 at a glance'),
      n: 'In Part one we studied the principles of justice. In this part we meet a famous thought experiment of John Rawls. Then we ask how a society can pursue social justice, and compare the views on free markets and on state intervention.',
    }),
    sl('concept', 'John Rawls and A Theory of Justice', {
      v: vRawlsT,
      n: 'John Rawls wrote a book called A Theory of Justice, published in nineteen seventy one. His aim was to explain which rules of a society would be fair. His method was to imagine people choosing the rules from an original position. Imagined islanders of Tamberlay settle their rules before they learn their own place.',
    }),
    sl('diagram', 'The veil of ignorance', {
      v: vVeil,
      n: 'This flow shows the argument. People choose the rules of a society. A veil of ignorance hides from them their future place, so no one knows whether he or she will be rich or poor, strong or weak. Each asks which rules would suit any place. Rules that leave the worst off as well off as possible are likely to be chosen.',
    }),
    sl('check', 'Quick check: the veil', {
      b: 'What does the veil of ignorance mean for the people who choose the rules?',
      chk: 'm_veil_def',
      n: 'Recall what the veil hides from the people who choose.',
    }),
    sl('concept', 'The rules that would be chosen', {
      v: vDifference,
      n: 'Behind the veil, each person might turn out to be the worst off. So rational people would choose rules that make the worst off as well off as possible. This idea is called the difference principle. Imagined islanders prefer the rule set that gives the poorest fifth forty units rather than twenty.',
    }),
    sl('diagram', 'Two rule sets compared', {
      v: vBars,
      n: 'This bar chart shows imagined income on Tamberlay under two rule sets. The worst off fifth gets twenty units under Rule Set A and forty under Rule Set B. The best off fifth gets one hundred and thirty under A and ninety under B. The figures are imagined and are used only to show the reasoning.',
    }),
    sl('example', 'Worked example 1: read the bar chart of Tamberlay', {
      b: 'Read the chart and say which rule set people behind the veil might choose.',
      bl: ['Compare the **worst off** under each', 'Ask where **you** might end up'],
      v: vReadBars,
      n: 'Let us read the chart. The worst off fifth gets twenty units under Rule Set A and forty under Rule Set B. The best off fifth gets more under A. A person behind the veil might be in the worst off fifth, so prefers B. After the veil lifts, the best off may prefer A, which is why the choice is made before it lifts.',
    }),
    sl('concept', 'Fairness without altruism', {
      v: vNotAlt,
      n: 'This argument does not ask people to be kind or generous. Fairness comes from an impartial choice, made without knowing your own future place. The result is a set of rules that no one could suspect of favouring a known position. An imagined fish seller agrees to a fair rule because she might be a net mender tomorrow.',
    }),
    sl('check', 'Quick check: put in order', {
      b: 'Arrange the steps of the veil of ignorance argument.',
      chk: 'ord_veil',
      n: 'Think about which step must come first and which comes last.',
    }),
    sl('concept', 'Minimum basic needs', {
      v: vNeeds,
      n: 'A just society should ensure that everyone has the basic conditions for a healthy and secure life. These minimum basic needs include adequate nutrition, housing, clean drinking water, education and a minimum wage. In imagined Hollin, a child who goes hungry cannot study, and polluted water brings illness.',
    }),
    sl('diagram', 'Two ways of pursuing social justice', {
      v: vMarketState,
      n: 'This chart sets two views side by side. Free markets mean minimal state intervention, with competition that rewards talent and effort and gives choice. State intervention means that the state ensures basic needs through public services, because markets may favour the already advantaged. Many societies combine the two.',
    }),
    sl('concept', 'The case for free markets', {
      v: vMarketT,
      n: 'Some argue for free markets. Open competition rewards talent and effort. Buyers and sellers have many choices, and markets generally serve people well. Supporters favour minimal state intervention. Imagined Norvale lets bakers compete on price and quality, and buyers pick the loaf they like.',
    }),
    sl('concept', 'The case for state intervention', {
      v: vStateT,
      n: 'Others argue for state intervention. They say that markets favour those who are already advantaged. So the state must ensure basic needs and equal opportunity through public services such as schools, clinics and water supply. Imagined Kesterby runs free schools and a public water supply, paid for by taxes.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about combining approaches is true or false.',
      chk: 'tf_market',
      n: 'Think about how many societies actually arrange their economies.',
    }),
    sl('example', 'Worked example 2: Norvale and Kesterby compared', {
      b: 'Compare the two imagined towns, giving a strength and a worry for each.',
      bl: ['Look at **water** and **schools**', 'Find a **strength** and a **worry**'],
      v: vCompare,
      n: 'Compare the two imagined towns. Norvale uses private sellers and fee schools, with wide choice and reward for effort, but poorer families may go without. Kesterby has a free town water supply and schools, so basic needs are met for all, but taxes are higher and choice is narrower. Neither town settles the debate.',
    }),
    sl('concept', 'Combining the two approaches', {
      v: vCombine,
      n: 'Many societies combine the two approaches. They use markets for much of the economy and public services for basic needs. People differ on how big each part should be. Students should state both views with reasons and then judge. Imagined Tamberlay lets traders sell freely but runs a public school in every village.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence on minimum basic needs.',
      chk: 'fb_needs',
      n: 'Recall what a just society should ensure for everyone.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on free markets and state intervention.',
      bl: ['Start with **basic needs**', 'Give **both views**, then **judge**'],
      v: vPlan2,
      n: 'To plan a five mark answer, start with minimum basic needs. Then give the case for free markets and the case for state intervention, each with reasons. Note that many societies combine the two. End with a reasoned judgement. Write it in your own words.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Rawls, in A Theory of Justice, imagined people choosing rules behind a veil of ignorance. They would choose rules that make the worst off as well off as possible. Fairness comes from impartial choice, not from altruism. A just society should ensure basic needs. Some favour free markets, others state intervention, and many combine them.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Name the **book** and the **year**', 'Say fairness comes from **impartial choice**', 'List **basic needs** with examples', 'Give **both views** before you judge'],
      v: vTips2,
      n: 'A few tips. Name the book and the year, and paraphrase the idea rather than quoting. Say that fairness comes from impartial choice and not from kindness. List basic needs with examples. When you write about markets and the state, give both views with reasons before you judge.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Social Justice: Notes',
  sections: [
    {
      h: '1. What justice means',
      t: 1,
      b: '**Justice** means giving each person his or her **due**, treating people fairly according to accepted principles. Ideas of justice appear in many traditions: **dharma** in ancient Indian thought, **Confucius** on just rulers and Plato\'s *Republic*. **Immanuel Kant** held that every person has **dignity** and deserves equal consideration.\n\n**Social justice** asks whether **goods and opportunities** are fairly distributed in a society.',
      terms: [
        ['Justice', 'Giving each person his or her due, treating people fairly according to accepted principles.'],
        ['Social justice', 'The fair distribution of goods and opportunities among the members of a society.'],
        ['Dignity', 'The worth that every person has simply as a person, which calls for equal consideration.'],
      ],
      v: vJustDef,
      vs: [vTrad],
    },
    {
      h: '2. Three principles of justice',
      t: 1,
      b: 'Three principles help to judge what is just.\n\n- **Equal treatment for equals**: equal rights and no discrimination by caste, religion or gender.\n- **Proportionate justice**: rewards in proportion to effort, skill and the nature of the work.\n- **Recognition of special needs**: people with disadvantages, such as disability or lack of access to education or health care, may need special treatment.',
      terms: [
        ['Equal treatment for equals', 'The principle that people in the same position should be treated alike and have equal rights.'],
        ['Proportionate justice', 'The principle that rewards should be in proportion to effort, skill and the nature of the work.'],
        ['Recognition of special needs', 'The principle that people with disadvantages may need special treatment to take part on fair terms.'],
      ],
      v: vThree,
      vs: [vEqual, vProp, vSpecial, vClassify],
    },
    {
      h: '3. Conflict among principles; just distribution',
      t: 1,
      b: 'The principles can **conflict**: reward by performance may favour one applicant and special needs another. A society **balances** them by stating its principles, giving reasons and using a mix of measures.\n\nSocial justice concerns the **fair distribution** of goods and opportunities. **Land reforms** and **reserved places in education and jobs** are policies that a society may choose. People hold different views and give reasons.',
      terms: [
        ['Distribution', 'The way goods and opportunities are shared among the members of a society.'],
        ['Land reforms', 'Policies that change how land is held, for example by limiting very large holdings and giving plots to the landless.'],
      ],
      v: vConflictP,
      vs: [vScholar, vDistribution, vPolicies, vPlan1],
    },
    {
      h: '4. Rawls: the veil of ignorance',
      t: 1,
      b: '**John Rawls** wrote *A Theory of Justice* (1971). He asked which rules of society would be fair if they were chosen from an **original position**, behind a **veil of ignorance**: people choose without knowing their future place in society.\n\nBecause each might be the **worst-off**, rational people would choose rules that make the worst-off as well off as possible (the **difference principle**). Fairness comes from **impartial choice**, not from **altruism**.',
      terms: [
        ['Original position', 'An imagined starting point at which people choose the rules of society without knowing their own place in it.'],
        ['Veil of ignorance', 'The device of choosing rules without knowing one\'s own future position in society.'],
        ['Difference principle', 'The idea that rules should make the worst-off members of society as well off as possible.'],
        ['Altruism', 'Concern for others for their own sake, which this argument does not depend on.'],
      ],
      v: vVeil,
      vs: [vRawlsT, vDifference, vBars, vReadBars, vNotAlt],
    },
    {
      h: '5. Minimum basic needs',
      t: 2,
      b: 'A just society should ensure that everyone has the basic conditions for a **healthy and secure life**: adequate **nutrition**, **housing**, **clean drinking water**, **education** and a **minimum wage**.',
      terms: [
        ['Minimum basic needs', 'The basic conditions for a healthy and secure life that a just society should ensure for all, such as nutrition, housing, clean drinking water, education and a minimum wage.'],
        ['Equal opportunity', 'A fair chance for everyone to develop and to compete, whatever his or her starting point.'],
      ],
      v: vNeeds,
    },
    {
      h: '6. Free markets, state intervention and a combination',
      t: 2,
      b: '**Free markets**: some argue that open competition rewards talent and effort, gives choice, and generally serves people well, so the state should intervene only minimally.\n\n**State intervention**: others argue that markets favour those already advantaged, so the state must ensure basic needs and equal opportunity through **public services**.\n\nMany societies **combine** the two. Students should state both views with reasons and then judge.',
      terms: [
        ['Free market', 'An arrangement in which buyers and sellers deal with one another through open competition, with minimal state intervention.'],
        ['State intervention', 'Action by the state, for example through public services, to ensure basic needs and equal opportunity.'],
        ['Public services', 'Services such as schools, clinics and water supply that the state provides for the public.'],
      ],
      v: vMarketState,
      vs: [vMarketT, vStateT, vCompare, vCombine, vPlan2],
    },
  ],
  tips: '**Common mistakes**\n- Saying justice means identical rewards for all: proportionate justice rewards effort, skill and the kind of work.\n- Forgetting one of the three principles: name equal treatment, proportion and special needs.\n- Treating special needs as favouritism: a disadvantage may need special help for a fair chance.\n- Taking a side on land reforms or reserved places: write what a society may choose, then give reasons on each side.\n- Saying the veil of ignorance makes people kind: fairness comes from impartial choice without knowing one\'s own place.\n- Quoting Rawls from memory: paraphrase the idea and name the book and year.\n- Backing one side in the market debate: give both views with reasons, then judge, and note that many societies combine the two.\n\n**Tips:** give a short imagined example with each principle; list basic needs with examples; end with a reasoned judgement.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What does **justice** mean?', 'Giving each person his or her due, treating people fairly according to accepted principles.', 'definition'],
  ['What is **social justice**?', 'The fair distribution of goods and opportunities among the members of a society.', 'definition'],
  ['Name an idea of justice from **ancient Indian thought**', 'Dharma: a just order resting on duties and right conduct.', 'fact'],
  ['What did **Confucius** say about rulers and justice?', 'Rulers should themselves be just and set an example.', 'fact'],
  ['Which book of **Plato** discusses justice?', 'The Republic.', 'fact'],
  ['What idea about persons is linked with **Immanuel Kant**?', 'Every person has dignity and deserves equal consideration.', 'fact'],
  ['What is **dignity**?', 'The worth that every person has simply as a person, calling for equal consideration.', 'definition'],
  ['Name the **three principles** of justice', 'Equal treatment for equals; proportionate justice; recognition of special needs.', 'concept'],
  ['What is **equal treatment for equals**?', 'People in the same position are treated alike, with equal rights.', 'definition'],
  ['What does equal treatment rule out?', 'Discrimination on grounds such as caste, religion or gender.', 'concept'],
  ['What is **proportionate justice**?', 'Rewards in proportion to effort, skill and the nature of the work.', 'definition'],
  ['Does proportionate justice mean **equal pay for all**?', 'No: it ties reward to effort, skill and the kind of work.', 'concept'],
  ['What is **recognition of special needs**?', 'People with disadvantages may need special treatment to take part on fair terms.', 'definition'],
  ['Give two examples of **disadvantage**', 'Disability; lack of access to education or health care.', 'fact'],
  ['How can the principles **conflict**?', 'Reward by performance may favour one person while special needs favour another.', 'concept'],
  ['How may a society **balance** the principles?', 'By stating its principles, giving reasons and using a mix of measures.', 'concept'],
  ['What does **just distribution** concern?', 'The fair sharing of goods and opportunities such as land, schooling and jobs.', 'concept'],
  ['How are **land reforms** and **reserved places** treated here?', 'As policies a society may choose; people give reasons on different sides.', 'concept'],
  ['Who wrote **A Theory of Justice**, and when?', 'John Rawls, in 1971.', 'fact'],
  ['What is the **original position**?', 'An imagined starting point at which people choose the rules of society without knowing their own place.', 'definition'],
  ['What is the **veil of ignorance**?', 'The device of choosing rules without knowing one\'s own future position in society.', 'definition'],
  ['Why would people behind the veil favour fair rules?', 'Each might end up in any position, including the worst-off.', 'concept'],
  ['What rules would rational people choose behind the veil?', 'Rules that make the worst-off as well off as possible.', 'concept'],
  ['What is the **difference principle**?', 'The idea that rules should make the worst-off members of society as well off as possible.', 'definition'],
  ['Where does fairness come from in Rawls\' argument?', 'From impartial choice, not from altruism.', 'concept'],
  ['What are **minimum basic needs**?', 'The basic conditions for a healthy and secure life that a just society should ensure for all.', 'definition'],
  ['Name five **basic needs**', 'Adequate nutrition, housing, clean drinking water, education, a minimum wage.', 'fact'],
  ['Two arguments of supporters of **free markets**', 'Open competition rewards talent and effort; it gives people choice.', 'concept'],
  ['What do supporters of free markets want the state to do?', 'Intervene only minimally.', 'concept'],
  ['Why do some argue for **state intervention**?', 'Markets favour those already advantaged, so the state must ensure basic needs and equal opportunity.', 'concept'],
  ['By what means does the state ensure basic needs?', 'Public services such as schools, clinics and water supply.', 'fact'],
  ['What do **many societies** do about markets and the state?', 'They combine the two.', 'concept'],
].map(([a, b, c]) => [a, b, c, 1]));

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Social Justice',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_p_prop_app', 'm_veil_app', 'm_market_app', 'ar_veil'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_just_def', 's_market', 's3_veil_app'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_principles', 'l_rawls'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_scholar'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Social Justice',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_p_equal_app', 'm_p_special_app', 'm_conflict_prin', 'm_diff_app', 'm_state_app', 'm_needs_app', 'm_mixed', 'm_balance', 'ar_altruism', 'ar_state'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_special', 's_diff', { attempt: 1, keys: ['s_needs', 's_state'] }, 's3_conflict', { attempt: 1, keys: ['s3_market_state', 's3_rawls_notalt'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_justice', { attempt: 1, keys: ['l_market_state', 'l_evaluate'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_island', 'c_towns'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch14 only (justice, three principles, just distribution, Rawls and the veil of ignorance; basic needs, free markets and state intervention)',
    originality: 'every scenario, island, town, committee, letter, table and report is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no quotation of any thinker, no board item reused (D-036)',
    facts: 'stable facts only: John Rawls, A Theory of Justice, 1971 (title only, ideas paraphrased); Kant on dignity, dharma, Confucius and Plato Republic named as traditions; no scheme, law or Article cited',
    neutrality: 'no map, no party, no current office-holder, no current scheme or present-day dispute named; land reforms and reserved places presented as policies a society may choose with reasons on each side; markets and state presented as some argue, others argue',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
