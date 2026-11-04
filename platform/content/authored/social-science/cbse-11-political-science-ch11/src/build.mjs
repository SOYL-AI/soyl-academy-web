// Build CBSE 11 Political Science ch11 Political Theory: An Introduction. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch11', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vWeb = (() => {
  const s = new Svg(760, 400);
  const boxes = [
    [10, 10, 'Family', 'blue', ['Who cooks, who cleans,', 'how the savings are used']],
    [450, 10, 'School', 'green', ['Council rules, timetables,', 'canteen and library use']],
    [10, 290, 'Market', 'brown', ['Allotment of stalls, fees,', 'settling disputes']],
    [450, 290, 'Government', 'red', ['Laws, budgets and', 'public services']],
  ];
  boxes.forEach(([x]) => x);
  boxes.forEach(([x, y]) => s.line(380, 200, x + 150, y + 50, { sw: 1.6, color: 'muted' }));
  s.rect(280, 150, 200, 100, { color: 'accent', sw: 3 });
  s.text(380, 183, 'Politics', { bold: true, size: 18, color: 'accent' });
  s.text(380, 215, 'Collective decisions', { size: 13 });
  boxes.forEach(([x, y, name, col, lines]) => {
    s.rect(x, y, 300, 100, { color: col, sw: 2.5 });
    s.text(x + 150, y + 26, name, { bold: true, size: 17, color: col });
    lines.forEach((ln, j) => s.text(x + 150, y + 55 + j * 22, ln, { size: 13 }));
  });
  return s.visual('Web diagram titled politics is everywhere, with a central box for politics as collective decisions joined to four boxes. Family: who cooks, who cleans and how the savings are used. School: council rules, timetables, canteen and library use. Market: allotment of stalls, fees and settling disputes. Government: laws, budgets and public services', 'Politics is found wherever a group decides together.');
})();

const vNormDesc = (() => {
  const s = new Svg(760, 330);
  s.rect(10, 10, 130, 44, { color: 'muted', sw: 1.5 });
  s.text(75, 32, 'Point', { bold: true, size: 15 });
  s.rect(150, 10, 290, 44, { color: 'blue', sw: 2.5 });
  s.text(295, 32, 'Descriptive question', { bold: true, size: 15, color: 'blue' });
  s.rect(450, 10, 300, 44, { color: 'accent', sw: 2.5 });
  s.text(600, 32, 'Normative question', { bold: true, size: 15, color: 'accent' });
  const rows = [
    ['Asks', 'What is the case?', 'What ought to be the case?'],
    ['Example', 'Marlow has 40 polling booths', 'Marlow ought to have more booths'],
    ['Settled by', 'Facts and evidence', 'Reasons and principles'],
    ['Tell-tale words', 'is, has, was, how many', 'ought, should, fair, right'],
  ];
  rows.forEach(([a, b, c], i) => {
    const y = 64 + i * 64;
    s.rect(10, y, 130, 54, { color: 'muted', sw: 1.5 });
    s.text(75, y + 27, a, { bold: true, size: 14 });
    s.rect(150, y, 290, 54, { color: 'blue', sw: 1.5 });
    s.text(295, y + 27, b, { size: 13 });
    s.rect(450, y, 300, 54, { color: 'accent', sw: 1.5 });
    s.text(600, y + 27, c, { size: 13 });
  });
  s.text(380, 322, 'The place named Marlow is imagined', { size: 12, muted: true });
  return s.visual('Comparison chart of descriptive and normative questions. A descriptive question asks what is the case, for example Marlow has 40 polling booths, and is settled by facts and evidence, with tell-tale words such as is, has, was and how many. A normative question asks what ought to be the case, for example Marlow ought to have more booths, and is settled by reasons and principles, with tell-tale words such as ought, should, fair and right. Marlow is imagined', 'Descriptive and normative questions compared.');
})();

const vTimeline = (() => {
  const s = new Svg(760, 330);
  const cols = [
    [70, 'Ancient Greece', [['Plato', 'Justice and the', 'well-ordered state'], ['Aristotle', 'Humans are', 'political beings']]],
    [190, '16th century', [['Machiavelli', 'Power in', 'practice']]],
    [310, '17th century', [['Hobbes', 'Authority for', 'security'], ['Locke', 'Consent and', 'natural rights']]],
    [430, '18th century', [['Rousseau', 'Freedom and', 'life in society']]],
    [550, '19th century', [['Marx', 'Class conflict', 'and economy']]],
    [670, '20th century', [['Gandhi', 'Hind Swaraj', '(1909)'], ['Ambedkar', 'Social justice,', 'caste hierarchy']]],
  ];
  s.arrow(10, 70, 750, 70, { sw: 2.5 });
  cols.forEach(([x, label, people]) => {
    s.dot(x, 70, 6, 'accent');
    s.text(x, 36, label, { bold: true, size: 13 });
    s.rect(x - 56, 96, 112, 222, { color: 'muted', sw: 1.5 });
    people.forEach(([name, l1, l2], j) => {
      const y = 120 + j * 100;
      s.text(x, y, name, { bold: true, size: 14, color: 'accent' });
      s.text(x, y + 24, l1, { size: 12 });
      s.text(x, y + 44, l2, { size: 12 });
    });
  });
  return s.visual('Timeline of thinkers in order. Ancient Greece: Plato, on justice and the well-ordered state, and Aristotle, who saw humans as political beings. 16th century: Machiavelli, on power in practice. 17th century: Hobbes, on authority for security, and Locke, on consent and natural rights. 18th century: Rousseau, on freedom and life in society. 19th century: Marx, on class conflict and the economy. 20th century: Gandhi, with Hind Swaraj in 1909, and Ambedkar, on social justice and caste hierarchy', 'Thinkers of political theory by period.');
})();

const vConcepts = (() => {
  const s = new Svg(760, 450);
  const W = 220, H = 70;
  const items = [
    [10, 10, 'Freedom', 'Room to think and act freely', 'blue'],
    [270, 10, 'Equality', 'Equal standing, fair chances', 'green'],
    [530, 10, 'Justice', 'What each person is due', 'brown'],
    [10, 190, 'Rights', 'Claims that the law protects', 'red'],
    [530, 190, 'Democracy', 'Collective rule by the people', 'blue'],
    [10, 370, 'Citizenship', 'Full membership of the state', 'green'],
    [270, 370, 'Nationalism', 'Belonging to a nation', 'brown'],
    [530, 370, 'Secularism', 'Equal respect for all faiths', 'red'],
  ];
  const cx = 380, cy = 225;
  items.forEach(([x, y]) => s.line(cx, cy, x + W / 2, y + H / 2, { sw: 1.6, color: 'muted' }));
  s.rect(290, 182, 180, 86, { color: 'accent', sw: 3 });
  s.text(380, 212, 'Political', { bold: true, size: 16, color: 'accent' });
  s.text(380, 238, 'theory', { bold: true, size: 16, color: 'accent' });
  items.forEach(([x, y, name, gloss, col]) => {
    s.rect(x, y, W, H, { color: col, sw: 2 });
    s.text(x + W / 2, y + 24, name, { bold: true, size: 15, color: col });
    s.text(x + W / 2, y + 49, gloss, { size: 12 });
  });
  return s.visual('Concepts map of political theory: a central box with eight concepts around it. Freedom, room to think and act freely. Equality, equal standing and fair chances. Justice, what each person is due. Rights, claims that the law protects. Democracy, collective rule by the people. Citizenship, full membership of the state. Nationalism, belonging to a nation. Secularism, equal respect for all faiths', 'Concepts that political theory examines.');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vViews = table(
  ['View', 'What politics is taken to be', 'What is missing'],
  [
    ['Popular view', 'Manipulation, scheming or the pursuit of self-interest by politicians', 'It leaves out the many useful decisions that groups take together'],
    ['Wider view', 'The activity through which a society makes collective decisions, settles differences and pursues common goals', 'Nothing essential: it covers families, schools, markets and governments'],
  ],
  'Table comparing two views of politics. The popular view takes politics to be manipulation, scheming or the pursuit of self-interest by politicians, and leaves out the many useful decisions groups take together. The wider view takes politics to be the activity through which a society makes collective decisions, settles differences and pursues common goals, covering families, schools, markets and governments',
);
const vLimits = table(
  ['Claim', 'Reply from the wider view'],
  [
    ['Politics is only about parties and elections', 'Any group that decides together engages in politics'],
    ['Politics is always dirty', 'Misuse of power by some is a fault of conduct; the need for shared decisions remains'],
    ['Politics is not my concern', 'Every person lives under shared decisions, so politics touches everyone'],
  ],
  'Table of three common claims about politics and the reply from the wider view: politics is only about parties and elections, but any group that decides together engages in politics; politics is always dirty, but misuse of power by some is a fault of conduct while the need for shared decisions remains; politics is not my concern, but every person lives under shared decisions',
);
const vAristotle = table(
  ['Point', 'Meaning'],
  [
    ['Thinker', 'Aristotle, a thinker of ancient Greece'],
    ['Idea', 'Human beings are by nature political: they live in communities and share in decisions about common life'],
    ['Implication', 'Community life and public decisions are part of being human, not an accident'],
  ],
  'Table on Aristotle: a thinker of ancient Greece; his idea is that human beings are political by nature, living in communities and sharing in decisions about common life; the implication is that community life and public decisions are part of being human',
);
const vDefinition = table(
  ['Part of the definition', 'What it means', 'Imagined example'],
  [
    ['Collective decision', 'A group decides for all its members', 'A school council votes on a canteen rule'],
    ['Differences resolved', 'Members hold different views and settle them', 'Some want snacks kept, others removed'],
    ['Who gets what', 'Shares of benefits, duties and places are fixed', 'Stalls in a market lane are allotted'],
    ['Use of power', 'Someone or some body has the ability to decide', 'A club president alone decides who speaks'],
  ],
  'Table of the parts of the definition of politics: collective decision, as when a school council votes on a canteen rule; differences resolved, as when some want snacks kept and others removed; who gets what, as when stalls in a market lane are allotted; and the use of power, as when a club president alone decides who speaks',
  'Politics is the process by which groups make collective decisions about how to live together, who gets what, and how power is used.',
);
const vCouncil = table(
  ['Step in the imagined Pinecrest School council', 'Feature of politics'],
  [
    ['Members disagree about fried snacks in the canteen', 'Differences of view'],
    ['They discuss and give reasons for each side', 'Settling differences by argument'],
    ['They vote and the rule applies to every student', 'A collective decision binding the group'],
    ['The rule decides what every student may buy', 'Who gets what'],
  ],
  'Worked example table for the imagined Pinecrest School council: members disagree about fried snacks, showing differences of view; they discuss and give reasons, showing the settling of differences by argument; they vote and the rule applies to every student, showing a collective decision; and the rule decides what every student may buy, showing who gets what',
  'Pinecrest School and its council are imagined.',
);
const vFamily = table(
  ['Family matter', 'How the group decides', 'Politics in the wider sense?'],
  [
    ['Sharing chores', 'A weekly talk and a rota', 'Yes: shares of duties are fixed together'],
    ['Using the monthly savings', 'Discussion and a vote', 'Yes: a collective decision on resources'],
    ['Choosing what one person wears', 'The person alone', 'No: not a decision of the group'],
  ],
  'Table of family matters: sharing chores by a weekly talk and rota is politics in the wider sense; using the monthly savings by discussion and a vote is politics in the wider sense; choosing what one person wears, decided by the person alone, is not a decision of the group and so not politics in this sense',
);
const vSettings = table(
  ['Setting', 'Imagined decision', 'Who gets what or who decides'],
  [
    ['School', 'A council fixes library hours', 'Which students may use the library and when'],
    ['Market', 'Traders allot stall places', 'Who gets the best places in the lane'],
    ['Government', 'A legislature passes a budget', 'How public money is shared among services'],
  ],
  'Table of three settings: in a school, a council fixes library hours and so decides which students may use the library and when; in a market, traders allot stall places and so decide who gets the best places; in government, a legislature passes a budget and so decides how public money is shared among services',
);
const vSort = table(
  ['Imagined situation', 'Politics in the wider sense?', 'Reason'],
  [
    ['A hostel committee decides visiting hours for all residents', 'Yes', 'A collective decision for a group'],
    ['A student picks a book to read in her free time', 'No', 'A private choice, not a group decision'],
    ['Neighbours of Larkspur Lane agree who will pay for a lamp', 'Yes', 'Shares and duties settled together'],
    ['A club president overrules members and sets all rules alone', 'Yes', 'Raises how power is used in a group'],
  ],
  'Worked example table sorting four imagined situations: a hostel committee deciding visiting hours is politics in the wider sense as a collective decision; a student picking a book is not, as a private choice; neighbours agreeing who will pay for a lamp is, as shares are settled together; a club president setting all rules alone is, as it raises the question of how power is used',
  'The hostel, lane and club are imagined.',
);
const vTouch = flow('LR', ['Every person belongs to groups', 'Groups make decisions on shared matters', 'Those decisions affect each member', 'So politics touches everyone'], 'Flow showing why politics touches everyone: every person belongs to groups, groups make decisions on shared matters, those decisions affect each member, so politics touches everyone', 'From group life to politics');
const vPlan = table(
  ['Step', 'What to write for: Explain the meaning of politics (5 marks)'],
  [
    ['1', 'State the popular view in one line'],
    ['2', 'Give the idea of Aristotle that humans are political by nature'],
    ['3', 'State the wider view: collective decisions, differences, common goals'],
    ['4', 'Add examples: family, school, market, government'],
    ['5', 'Close with the standard definition'],
  ],
  'Planning table for a five mark answer on the meaning of politics: state the popular view, give the idea of Aristotle, state the wider view, add examples from family, school, market and government, and close with the standard definition',
);
const vSum1 = table(
  ['Point', 'Summary'],
  [
    ['Popular view', 'Politics as scheming and self-interest'],
    ['Aristotle', 'Humans are political by nature'],
    ['Wider view', 'Collective decisions, differences resolved, common goals'],
    ['Where found', 'Family, school, market and government'],
    ['Definition', 'The process by which groups decide how to live together, who gets what and how power is used'],
  ],
  'Summary table of Part 1: popular view as scheming and self-interest; Aristotle, humans political by nature; wider view as collective decisions, differences resolved and common goals; found in family, school, market and government; definition as the process by which groups decide how to live together, who gets what and how power is used',
);
const vTips1 = table(
  ['Tip', 'Why it helps'],
  [
    ['Give the standard definition in full', 'It earns the main mark'],
    ['Use an example from daily life', 'It shows the wider view'],
    ['Name Aristotle with his idea', 'It links the thinker with the topic'],
    ['Avoid calling all politics dirty', 'The answer should be balanced and reasoned'],
  ],
  'Exam tips table for Part 1: give the standard definition in full, use an example from daily life, name Aristotle with his idea, and avoid calling all politics dirty',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vWhatPT = table(
  ['Question', 'Answer'],
  [
    ['What does political theory study?', 'The ideas and principles that shape constitutions, governments and social life'],
    ['Which concepts?', 'Freedom, equality, justice, rights, democracy, citizenship, nationalism and secularism'],
    ['What kind of questions?', 'Normative questions about what ought to be, as well as descriptive questions about what is'],
    ['What does it do with them?', 'It clarifies concepts, examines their meanings and tests opinions with reasons'],
  ],
  'Table on what political theory does: it studies the ideas and principles that shape constitutions, governments and social life; it examines concepts such as freedom, equality, justice, rights, democracy, citizenship, nationalism and secularism; it asks normative as well as descriptive questions; and it clarifies concepts, examines meanings and tests opinions with reasons',
);
const vSortStat = table(
  ['Imagined statement about Brookfield', 'Kind', 'Reason'],
  [
    ['Brookfield has 3 public libraries', 'Descriptive', 'Reports a fact that can be checked'],
    ['Brookfield ought to open a fourth library', 'Normative', 'Says what should be done'],
    ['Most library visitors are under 18 years of age', 'Descriptive', 'Reports what is the case'],
    ['Libraries should stay open late for working people', 'Normative', 'Expresses a value about what should be'],
  ],
  'Worked example table classifying four imagined statements about the town of Brookfield: that it has 3 libraries is descriptive; that it ought to open a fourth is normative; that most visitors are under 18 is descriptive; and that libraries should stay open late for working people is normative',
  'Brookfield is imagined.',
);
const vTools = flow('LR', ['Clarify what a concept means', 'Examine the meanings and their results', 'Test opinions with reasons', 'Reach a considered view'], 'Flow of what political theory does with a concept: clarify what it means, examine the meanings and their results, test opinions with reasons, and reach a considered view', 'How a theorist works on a concept');
const vFair = table(
  ['Team in the imagined Westmere debate club', 'What it means by fair', 'Test with reasons'],
  [
    ['Team Red', 'Equal treatment of every student', 'Easy to apply, but may ignore different needs'],
    ['Team Blue', 'Treatment according to need', 'Meets needs, but who decides what is a need?'],
  ],
  'Worked example table on the word fair in an imagined debate club: Team Red means equal treatment of every student, which is easy to apply but may ignore different needs; Team Blue means treatment according to need, which meets needs but raises the question of who decides what is a need',
  'Westmere and its club are imagined.',
);
const vEarly = table(
  ['Thinker', 'Period', 'Idea in brief'],
  [
    ['Plato', 'Ancient Greece', 'Reflected on justice and on how a well-ordered state could be arranged'],
    ['Aristotle', 'Ancient Greece', 'Humans are political beings who live in communities'],
    ['Machiavelli', '16th century', 'Studied how rulers gain and keep power in practice'],
    ['Hobbes', '17th century', 'A common authority is needed so that people may live securely'],
    ['Locke', '17th century', 'Government rests on consent and must protect natural rights'],
  ],
  'Table of five thinkers: Plato of ancient Greece, on justice and the well-ordered state; Aristotle of ancient Greece, humans are political beings; Machiavelli of the 16th century, how rulers gain and keep power in practice; Hobbes of the 17th century, a common authority for security; Locke of the 17th century, government rests on consent and protects natural rights',
);
const vLate = table(
  ['Thinker', 'Period', 'Idea in brief'],
  [
    ['Rousseau', '18th century', 'People are free by nature yet bound in society; how can common rules be consistent with freedom?'],
    ['Marx', '19th century', 'Society is shaped by economic arrangements and conflict between classes'],
    ['Gandhi', '20th century', 'Wrote Hind Swaraj in 1909, on self-rule'],
    ['Ambedkar', '20th century', 'Worked for social justice and the removal of caste hierarchy'],
  ],
  'Table of four thinkers: Rousseau of the 18th century, who asked how common rules can be consistent with freedom; Marx of the 19th century, who saw society shaped by economic arrangements and class conflict; Gandhi of the 20th century, who wrote Hind Swaraj in 1909 on self-rule; and Ambedkar of the 20th century, who worked for social justice and the removal of caste hierarchy',
);
const vPractice = table(
  ['Ideal', 'A question on which people differ', 'How political theory helps'],
  [
    ['Equality', 'Whether and how reserved seats should be used to widen opportunity', 'Each side gives reasons; the reasons are weighed'],
    ['Equality', 'How equality between women and men is to be applied in daily life', 'It clarifies what equality means in each setting'],
    ['Freedom', 'How far freedom of expression should extend', 'It tests arguments for and against any limit'],
  ],
  'Table of ideals applied in debate: equality, on whether and how reserved seats should widen opportunity, where each side gives reasons that are weighed; equality, on how equality between women and men applies in daily life, where theory clarifies what equality means; and freedom, on how far freedom of expression should extend, where theory tests arguments for and against any limit',
  'People differ on these questions; the aim is to weigh reasons, not to take sides.',
);
const vFR = table(
  ['Provision', 'What it provides', 'Idea behind it'],
  [
    ['Article 14', 'Equality before the law for every person', 'Equality'],
    ['Article 17', 'Abolition of untouchability', 'Justice and equality'],
    ['Article 19', 'Freedom of speech and expression, among other freedoms', 'Freedom'],
    ['Article 25', 'Freedom of conscience and religion', 'Freedom and secularism'],
  ],
  'Table of the Fundamental Rights as applications of ideas: Article 14, equality before the law, reflects equality; Article 17, abolition of untouchability, reflects justice and equality; Article 19, freedom of speech and expression among other freedoms, reflects freedom; Article 25, freedom of conscience and religion, reflects freedom and secularism',
);
const vWhy = table(
  ['Reason', 'Meaning'],
  [
    ['Citizenship', 'Everyone is a citizen and is affected by politics'],
    ['Reasoning', 'We reason about issues instead of reacting on impulse'],
    ['Prejudice', 'We examine our own prejudices'],
    ['Careers', 'It prepares us for law, administration and journalism'],
    ['Democracy', 'It supports democratic debate and tolerance of other views'],
  ],
  'Table of reasons for studying political theory: citizenship, since everyone is affected by politics; reasoning about issues instead of reacting on impulse; examining our own prejudices; preparing for law, administration and journalism; and supporting democratic debate and tolerance of other views',
);
const vRumour = table(
  ['Imagined case at Westmere School', 'Impulse', 'Reasoned response'],
  [
    ['A rumour says sports day will be cancelled', 'Call a protest at once', 'Ask who said it and what the rule says'],
    ['Students differ on the cancellation', 'Shout down the other side', 'Hear reasons from both sides and weigh them'],
    ['A decision is announced', 'Reject it without reading it', 'Examine whether the reasons given are good'],
  ],
  'Worked example table of an imagined rumour at Westmere School: on a rumour that sports day will be cancelled, the impulse is to call a protest at once while the reasoned response is to ask who said it and what the rule says; when students differ, the impulse is to shout down the other side while the reasoned response is to hear and weigh reasons from both sides; when a decision is announced, the impulse is to reject it unread while the reasoned response is to examine whether the reasons are good',
  'Westmere School is imagined.',
);
const vDebateFlow = flow('LR', ['State the question', 'Clarify the key words', 'Give reasons for each view', 'Test against objections', 'Reach a conclusion'], 'Flow of a reasoned debate: state the question, clarify the key words, give reasons for each view, test against objections, and reach a considered conclusion', 'Steps of a reasoned debate');
const vSum2 = table(
  ['Point', 'Summary'],
  [
    ['Political theory', 'Studies ideas and principles that shape constitutions, governments and social life'],
    ['Questions', 'Normative (what ought to be) as well as descriptive (what is)'],
    ['Method', 'Clarify concepts, examine meanings, test opinions with reasons'],
    ['Thinkers', 'Plato, Aristotle, Machiavelli, Hobbes, Locke, Rousseau, Marx, Gandhi, Ambedkar'],
    ['Practice', 'Ideals are debated and applied; the Fundamental Rights reflect theory'],
    ['Why study', 'Citizenship, reasoning, examining prejudice, careers, democratic debate'],
  ],
  'Summary table of Part 2: political theory studies ideas and principles; it asks normative and descriptive questions; its method is to clarify concepts, examine meanings and test opinions with reasons; thinkers include Plato, Aristotle, Machiavelli, Hobbes, Locke, Rousseau, Marx, Gandhi and Ambedkar; ideals are debated and applied and the Fundamental Rights reflect theory; and reasons to study are citizenship, reasoning, examining prejudice, careers and democratic debate',
);
const vTips2 = table(
  ['Tip', 'Why it helps'],
  [
    ['Define normative and descriptive with one example each', 'It shows you can apply the terms'],
    ['Give each thinker with a period and one idea', 'Marks go for the pairing'],
    ['On debated questions write people differ and weigh reasons', 'It keeps the answer balanced'],
    ['Cite an Article by number with what it provides', 'It links theory with the Constitution'],
  ],
  'Exam tips table for Part 2: define normative and descriptive with one example each; give each thinker with a period and one idea; on debated questions write that people differ and weigh reasons; and cite an Article by number with what it provides',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Political Theory: An Introduction, Part 1: What Is Politics?',
  goals: [
    'Describe the popular view of politics and the wider view',
    'Explain the idea of Aristotle that humans are political by nature',
    'Give the standard definition of politics and its parts',
    'Show with examples that politics appears in the family, the school, the market and the government',
    'Explain why politics touches the life of every person',
  ],
  slides: [
    sl('title', 'What Is Politics?', {
      b: 'Part 1: how people **see** politics, how thinkers **widen** that view, and a **standard definition**.',
      v: flow('LR', ['Popular views', 'Wider views', 'The definition', 'Politics everywhere'], 'Route map of Part 1: popular views, wider views, the definition, and politics everywhere', 'Part 1 at a glance'),
      n: 'What is politics? Many people think of scheming and quarrels. In this part we compare that popular view with a wider view, learn the standard definition of politics, and see how politics appears in the family, the school, the market and the government.',
    }),
    sl('concept', 'Two views of politics', {
      v: vViews,
      n: 'Many people think politics means manipulation, scheming and the pursuit of self interest by politicians. That is the popular view. The wider view says that politics is the activity through which a society makes collective decisions, settles differences and pursues common goals. The wider view covers families, schools, markets and governments.',
    }),
    sl('concept', 'Answering the popular view', {
      v: vLimits,
      n: 'Three claims are often heard. First, that politics is only about parties and elections. Second, that it is always dirty. Third, that it is not our concern. The wider view replies that any group which decides together engages in politics, that misuse of power is a fault of conduct, and that shared decisions touch every person.',
    }),
    sl('concept', 'Aristotle: humans are political beings', {
      v: vAristotle,
      n: 'Aristotle was a thinker of ancient Greece. He held that human beings are political by nature. We live together in communities and share in decisions about our common life. So community life and public decisions are part of being human, and not an accident.',
    }),
    sl('diagram', 'Politics is everywhere', {
      v: vWeb,
      n: 'This web shows politics in four settings. In a family, members decide who cooks and how savings are used. In a school, a council fixes rules. In a market, traders settle who gets which stall. In government, laws and budgets are decided. Each is a group making collective decisions.',
    }),
    sl('concept', 'The standard definition of politics', {
      v: vDefinition,
      n: 'Politics is the process by which groups make collective decisions about how to live together, who gets what, and how power is used. It has four parts: a collective decision, differences that are resolved, a share of benefits and duties, and the use of power.',
    }),
    sl('check', 'Quick check: where is politics found?', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_gov',
      n: 'Think about where politics can be found. Is it only in government offices?',
    }),
    sl('example', 'Worked example 1: a school council decides', {
      b: 'Show the features of politics in an imagined school council.',
      bl: ['Spot the **difference** of views', 'Find the **collective decision**', 'Ask **who gets what**'],
      v: vCouncil,
      n: 'In the imagined Pinecrest School, council members disagree about fried snacks in the canteen. They discuss, give reasons and vote. The rule then applies to every student. We can see differences of view, settling by argument, a collective decision, and a decision about who gets what.',
    }),
    sl('concept', 'Politics in the family', {
      v: vFamily,
      n: 'A family can practise politics in the wider sense. Sharing chores by a weekly talk and a rota is a collective decision. Using monthly savings after discussion and a vote is a decision on resources. But one person choosing what to wear alone is not a decision of the group, so it is not politics in this sense.',
    }),
    sl('concept', 'Politics in school, market and government', {
      v: vSettings,
      n: 'In a school, a council can fix library hours and decide which students may use the library. In a market, traders allot the best places in the lane. In government, a legislature passes a budget and shares public money among services. In each case, a group decides who gets what.',
    }),
    sl('check', 'Quick check: the definition', {
      b: 'Choose the statement that gives the standard definition of politics.',
      chk: 'p_def',
      n: 'Recall the standard definition. Which statement gives it correctly?',
    }),
    sl('example', 'Worked example 2: sort the situations', {
      b: 'Decide which imagined situations are politics in the wider sense.',
      bl: ['Is a **group** deciding?', 'Are **shares or power** involved?'],
      v: vSort,
      n: 'A hostel committee deciding visiting hours is politics, since a group decides for all residents. A student choosing a book is a private choice. Neighbours agreeing who pays for a lamp settle shares together. A club president who sets all the rules raises the question of how power is used.',
    }),
    sl('concept', 'Why politics touches everyone', {
      v: vTouch,
      n: 'Every person belongs to groups, such as a family, a school and a community. These groups make decisions on shared matters, and those decisions affect each member. So politics touches everyone, whether or not they join a party or hold an office.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence about Aristotle.',
      chk: 'fb_aristotle',
      n: 'Recall the idea of Aristotle about human beings.',
    }),
    sl('check', 'Quick check: power in a group', {
      b: 'Read the imagined situation and choose the best answer.',
      chk: 'p_power_app',
      n: 'A club president alone decides everything. Which part of the definition of politics does this raise?',
    }),
    sl('example', 'Worked example 3: planning a five mark answer', {
      b: 'Plan an answer to: Explain the meaning of politics.',
      bl: ['One step for each **mark**', 'Add one **example** from daily life'],
      v: vPlan,
      n: 'To plan a five mark answer on the meaning of politics, give one step for each mark. State the popular view, give the idea of Aristotle, state the wider view, add examples from the family, school, market and government, and close with the standard definition.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The popular view sees politics as scheming. Aristotle held that humans are political by nature. The wider view sees collective decisions, resolved differences and common goals. Politics is found in the family, the school, the market and the government. It is the process by which groups decide how to live together, who gets what and how power is used.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give the **standard definition** in full', 'Use an **example** from daily life', 'Name **Aristotle** with his idea', 'Do not call all politics dirty: **balance** the answer'],
      v: vTips1,
      n: 'A few tips. Give the standard definition in full. Use an example from daily life. Name Aristotle with his idea. And avoid saying that all politics is dirty. Show that you can see both the popular view and the wider view.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Political Theory: An Introduction, Part 2: What Political Theory Does and Why We Study It',
  goals: [
    'Explain what political theory studies and name its main concepts',
    'Distinguish normative from descriptive questions',
    'Explain how political theory clarifies concepts and tests opinions with reasons',
    'Name the thinkers of political theory with a period and one idea each',
    'Explain how ideals are debated and applied, and why political theory is worth studying',
  ],
  slides: [
    sl('title', 'What Political Theory Does', {
      b: 'Part 2: the **ideas** it studies, the **questions** it asks, its **thinkers** and its **uses**.',
      v: flow('LR', ['Concepts', 'Questions', 'Thinkers', 'Practice', 'Why study'], 'Route map of Part 2: concepts, questions, thinkers, practice and why we study political theory', 'Part 2 at a glance'),
      n: 'In this part we ask what political theory does. We look at the ideas it studies, the kinds of questions it asks, some of its thinkers, how ideals are debated in practice, and why it is worth studying.',
    }),
    sl('concept', 'What political theory studies', {
      v: vWhatPT,
      n: 'Political theory studies the ideas and principles that shape constitutions, governments and social life. It examines concepts such as freedom, equality, justice and rights. It asks normative questions about what ought to be, as well as descriptive questions about what is. And it clarifies concepts and tests opinions with reasons.',
    }),
    sl('diagram', 'Concepts of political theory', {
      v: vConcepts,
      n: 'This map shows eight concepts. They are freedom, equality, justice, rights, democracy, citizenship, nationalism and secularism. Each one is an idea that shapes constitutions and public life. Political theory asks what each means and how it should guide the way we live together.',
    }),
    sl('diagram', 'Descriptive and normative questions', {
      v: vNormDesc,
      n: 'A descriptive question asks what is the case, and is settled by facts and evidence. A normative question asks what ought to be the case, and is settled by reasons and principles. Words such as ought and should often signal a normative question. Both kinds are useful, but they are not the same.',
    }),
    sl('check', 'Quick check: a normative question', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_normative',
      n: 'Think about whether the question asks what is, or what should be.',
    }),
    sl('example', 'Worked example 1: sort the statements', {
      b: 'Classify each imagined statement as descriptive or normative.',
      bl: ['Look for **ought** or **should**', 'Ask whether it can be **checked as a fact**'],
      v: vSortStat,
      n: 'In the imagined town of Brookfield, the statement that it has three libraries reports a fact, so it is descriptive. The statement that it ought to open a fourth library says what should be, so it is normative. Most visitors being under eighteen is descriptive. Libraries staying open late for working people is normative.',
    }),
    sl('concept', 'How political theory works on a concept', {
      v: vTools,
      n: 'A theorist first clarifies what a concept means. Then the theorist examines the different meanings and what follows from each. Then opinions are tested with reasons. At the end, a considered view is reached. This is how debate becomes more careful and less heated.',
    }),
    sl('example', 'Worked example 2: what does fair mean?', {
      b: 'Two teams argue over a rule that both call fair. Clarify and test.',
      bl: ['State what **each team means**', 'Test each meaning with **reasons**'],
      v: vFair,
      n: 'In an imagined debate club, one team means equal treatment of every student by fair. The other means treatment according to need. Equal treatment is easy to apply but may ignore different needs. Treatment by need meets needs, but raises the question of who decides what a need is.',
    }),
    sl('check', 'Quick check: steps of a debate', {
      b: 'Arrange the steps of a reasoned debate in a suitable order.',
      chk: 'ord_debate',
      n: 'Put the steps of a reasoned debate in the correct order.',
    }),
    sl('diagram', 'A timeline of thinkers', {
      v: vTimeline,
      n: 'This timeline places nine thinkers. Plato and Aristotle belong to ancient Greece. Machiavelli is of the sixteenth century. Hobbes and Locke are of the seventeenth, and Rousseau of the eighteenth. Marx is of the nineteenth. Gandhi and Ambedkar belong to the twentieth century.',
    }),
    sl('concept', 'Thinkers: Plato to Locke', {
      v: vEarly,
      n: 'Plato reflected on justice and on a well ordered state. Aristotle said humans are political beings. Machiavelli studied how rulers gain and keep power in practice. Hobbes argued that a common authority is needed for security. Locke argued that government rests on consent and must protect natural rights.',
    }),
    sl('concept', 'Thinkers: Rousseau to Ambedkar', {
      v: vLate,
      n: 'Rousseau noted that people are free by nature yet bound in society, and asked how common rules can be consistent with freedom. Marx saw society shaped by economic arrangements and class conflict. Gandhi wrote Hind Swaraj in nineteen oh nine, on self rule. Ambedkar worked for social justice and the removal of caste hierarchy.',
    }),
    sl('check', 'Quick check: match the thinkers', {
      b: 'Match each thinker with the idea or work associated with him.',
      chk: 'mt_thinkers',
      n: 'Pair each thinker with the idea or work linked with him.',
    }),
    sl('concept', 'Political theory in practice', {
      v: vPractice,
      n: 'Ideals such as equality and freedom are debated and applied in real life. People differ on how reserved seats should be used, on how equality between women and men applies in daily life, and on how far freedom of expression should extend. Political theory helps by clarifying meanings and weighing reasons.',
    }),
    sl('concept', 'The Fundamental Rights reflect theory', {
      v: vFR,
      n: 'The Fundamental Rights turn ideas into rights. Article fourteen gives equality before the law. Article seventeen abolishes untouchability. Article nineteen gives freedom of speech and expression, among other freedoms. Article twenty five gives freedom of conscience and religion. Each reflects ideas that political theory studies.',
    }),
    sl('check', 'Quick check: an Article', {
      b: 'Choose the correct Article.',
      chk: 'pr_art17',
      n: 'Recall which Article abolishes untouchability.',
    }),
    sl('concept', 'Why study political theory?', {
      v: vWhy,
      n: 'There are five reasons. Everyone is a citizen and is affected by politics. We learn to reason about issues instead of reacting on impulse. We examine our own prejudices. It prepares us for law, administration and journalism. And it supports democratic debate and tolerance of other views.',
    }),
    sl('example', 'Worked example 3: reasoning instead of impulse', {
      b: 'Compare an impulsive and a reasoned response to an imagined rumour.',
      bl: ['Ask for the **source** and the **rule**', 'Weigh **reasons** from both sides'],
      v: vRumour,
      n: 'At the imagined Westmere School, a rumour says sports day will be cancelled. An impulsive student calls a protest at once. A reasoned student asks who said it and what the rule says. When students differ, the reasoned response is to weigh reasons from both sides, and then to examine whether the decision rests on good reasons.',
    }),
    sl('diagram', 'A reasoned debate, step by step', {
      v: vDebateFlow,
      n: 'A reasoned debate starts with a clear question. It clarifies the key words. It gives reasons for each view, tests them against objections, and reaches a considered conclusion. This habit also helps us tolerate people who differ from us.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Political theory studies the ideas and principles behind political life. It asks normative as well as descriptive questions. It clarifies concepts and tests opinions with reasons. Its thinkers range from Plato to Ambedkar. Ideals are debated in practice, and the Fundamental Rights reflect them. We study it as citizens who reason, examine prejudice and debate with tolerance.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define **normative** and **descriptive** with an example each', 'Pair each **thinker** with a period and an idea', 'On debates write **people differ** and weigh reasons', 'Cite an **Article** by number and what it provides'],
      v: vTips2,
      n: 'A few tips. Define normative and descriptive with an example of each. Pair each thinker with a period and one idea. On debated questions, write that people differ, and weigh the reasons. And when you cite an Article, give its number and what it provides.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Political Theory: An Introduction: Notes',
  sections: [
    {
      h: '1. What is politics?',
      t: 1,
      b: 'Many people see politics as **manipulation, scheming or the pursuit of self-interest** by politicians. This is the **popular view**. A **wider view** sees politics as the activity through which a society **makes collective decisions, resolves differences and pursues common goals**.\n\n**Aristotle**, a thinker of ancient Greece, held that human beings are **political by nature**: they live in communities and share in decisions about common life.\n\n**Standard definition:** politics is the process by which groups make collective decisions about how to live together, who gets what, and how power is used.',
      terms: [
        ['Politics', 'The process by which groups make collective decisions about how to live together, who gets what, and how power is used.'],
        ['Collective decision', 'A decision taken by a group that applies to all of its members.'],
        ['Power', 'The ability to decide or to influence what a group does.'],
      ],
      v: vDefinition,
      vs: [vViews, vAristotle],
    },
    {
      h: '2. Politics in every area of life',
      t: 1,
      b: 'Politics is an aspect of social life that touches everyone. It appears in the **family** (sharing chores and savings), the **school** (council rules, library hours), the **market** (allotting stalls, settling disputes) and the **government** (laws, budgets). A private choice made by one person alone is not a group decision.\n\nPoliticians sometimes misuse power, and that deserves criticism. But the need for shared decisions in groups remains, so it is not reasonable to call all politics dirty.',
      terms: [
        ['Popular view of politics', 'The view that politics is scheming and self-seeking by politicians.'],
        ['Wider view of politics', 'The view that politics is the activity of making collective decisions and settling differences in any group.'],
      ],
      v: vWeb,
      vs: [vSettings, vFamily, vSort, vTouch],
    },
    {
      h: '3. What political theory does',
      t: 1,
      b: '**Political theory** studies the ideas and principles that shape constitutions, governments and social life: **freedom, equality, justice, rights, democracy, citizenship, nationalism and secularism**.\n\nIt asks **normative** questions about what ought to be, as well as **descriptive** questions about what is. It **clarifies concepts**, examines their meanings and **tests our opinions with reasons**. The words ought and should often signal a normative question.',
      terms: [
        ['Political theory', 'The study of the ideas and principles that shape constitutions, governments and social life.'],
        ['Concept', 'A general idea, such as freedom or justice, that we use to think about political life.'],
        ['Normative question', 'A question about what ought to be, which is settled by reasons and principles.'],
        ['Descriptive question', 'A question about what is the case, which is settled by facts and evidence.'],
      ],
      v: vConcepts,
      vs: [vWhatPT, vNormDesc, vSortStat, vTools, vFair],
    },
    {
      h: '4. Thinkers of political theory',
      t: 1,
      b: 'Names and one idea each: **Plato** (ancient Greece), justice and the well-ordered state; **Aristotle** (ancient Greece), humans are political beings; **Machiavelli** (16th century), how rulers gain and keep power in practice; **Hobbes** (17th century), a common authority is needed for security; **Locke** (17th century), government rests on consent and protects natural rights; **Rousseau** (18th century), how can life under common rules be consistent with the natural freedom of people; **Marx** (19th century), class conflict and economic arrangements; **Gandhi** (20th century), **Hind Swaraj (1909)**, on self-rule; **Ambedkar** (20th century), social justice and the removal of caste hierarchy.',
      terms: [
        ['Hind Swaraj', 'A work of Gandhi, written in 1909, that discusses self-rule.'],
        ['Natural rights', 'Rights that, in the view of thinkers such as Locke, people hold as human beings, before any government.'],
      ],
      v: vTimeline,
      vs: [vEarly, vLate],
    },
    {
      h: '5. Political theory in practice',
      t: 1,
      b: 'Ideals are **understood in more than one way**, so people differ on how to apply them. Examples of debated questions are the use of **reserved seats**, how to apply **equality between women and men** and the **limits of freedom of expression**. A fair account says that **people differ** and weighs the reasons given.\n\nThe **Fundamental Rights** turn ideas into rights: **Article 14** (equality before the law), **Article 17** (abolition of untouchability), **Article 19** (freedom of speech and expression, among other freedoms) and **Article 25** (freedom of conscience and religion).',
      terms: [
        ['Fundamental Rights', 'Rights guaranteed by the Constitution that people can claim, such as equality before the law and the freedoms.'],
      ],
      v: vPractice,
      vs: [vFR],
    },
    {
      h: '6. Why study political theory?',
      t: 1,
      b: 'Everyone is a **citizen** and is affected by politics. The study helps us to **reason about issues** instead of reacting on impulse, to **examine our own prejudices**, and to take part in **democratic debate with tolerance** of other views. It also prepares us for roles in **law, administration and journalism**.',
      terms: [
        ['Citizen', 'A full member of a state who has rights and duties and a share in public decisions.'],
        ['Prejudice', 'An opinion formed without examining the reasons or the facts.'],
        ['Tolerance', 'Willingness to respect and listen to views and ways of life that differ from our own.'],
      ],
      v: vWhy,
      vs: [vRumour, vDebateFlow],
    },
  ],
  tips: '**Common mistakes**\n- Calling all politics dirty: separate misuse of power from the need for shared decisions.\n- Limiting politics to parties and elections: show that any group which decides together is engaged in politics.\n- Mixing up normative and descriptive: look for ought or should, and ask whether the statement can be checked as a fact.\n- Naming a thinker without a period or an idea: pair each name with a century and one idea.\n- Taking sides on a debated question: write people differ, give the reasons on each side and weigh them.\n\n**Exam tips**\n- Give the standard definition of politics in full, with an example from daily life.\n- Define normative and descriptive with one example each.\n- Cite an Article by number with what it provides.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Define **politics**', 'The process by which groups make collective decisions about how to live together, who gets what, and how power is used.', 'definition'],
  ['What is the **popular view** of politics?', 'That politics is manipulation, scheming or the pursuit of self-interest by politicians.', 'concept'],
  ['What is the **wider view** of politics?', 'That politics is the activity through which a society makes collective decisions, resolves differences and pursues common goals.', 'concept'],
  ['What did **Aristotle** hold about human beings?', 'That they are political by nature and live in communities.', 'fact'],
  ['Name four places where politics is found', 'Family, school, market and government.', 'fact'],
  ['What is a **collective decision**?', 'A decision taken by a group that applies to all of its members.', 'definition'],
  ['Why does politics touch everyone?', 'Everyone belongs to groups whose decisions affect them.', 'concept'],
  ['Is a private choice by one person politics in the wider sense?', 'No, because it is not a decision of a group.', 'concept'],
  ['Define **political theory**', 'The study of the ideas and principles that shape constitutions, governments and social life.', 'definition'],
  ['Name eight concepts that political theory examines', 'Freedom, equality, justice, rights, democracy, citizenship, nationalism and secularism.', 'fact'],
  ['What is a **normative** question?', 'A question about what ought to be.', 'definition'],
  ['What is a **descriptive** question?', 'A question about what is the case.', 'definition'],
  ['How can you tell a normative statement?', 'It says what ought or should be done, and rests on values and reasons.', 'concept'],
  ['What does political theory do with concepts?', 'It clarifies them, examines their meanings and tests opinions with reasons.', 'concept'],
  ['Why clarify a concept such as fair before a debate?', 'Two sides may use one word in two senses.', 'concept'],
  ['**Plato**: period and idea', 'Ancient Greece; justice and the well-ordered state.', 'fact'],
  ['**Aristotle**: period and idea', 'Ancient Greece; humans are political beings.', 'fact'],
  ['**Machiavelli**: period and idea', '16th century; how rulers gain and keep power in practice.', 'fact'],
  ['**Hobbes**: period and idea', '17th century; a common authority is needed for security.', 'fact'],
  ['**Locke**: period and idea', '17th century; government rests on consent and protects natural rights.', 'fact'],
  ['**Rousseau**: period and idea', '18th century; how can life under common rules be consistent with freedom?', 'fact'],
  ['**Marx**: period and idea', '19th century; class conflict and economic arrangements shape society.', 'fact'],
  ['**Gandhi**: period and work', '20th century; Hind Swaraj (1909) on self-rule.', 'fact'],
  ['**Ambedkar**: period and idea', '20th century; social justice and the removal of caste hierarchy.', 'fact'],
  ['Which Article gives equality before the law?', 'Article 14.', 'fact'],
  ['Which Article abolishes untouchability?', 'Article 17.', 'fact'],
  ['Which Article gives freedom of speech and expression?', 'Article 19, which also gives other freedoms.', 'fact'],
  ['Why do people differ on applying an ideal such as equality?', 'An ideal can be understood and applied in more than one way.', 'concept'],
  ['How should a debated question be written about?', 'People differ; give the reasons on each side and weigh them.', 'concept'],
  ['Name five reasons for studying political theory', 'Citizenship, reasoning, examining prejudice, careers (law, administration, journalism), and democratic debate with tolerance.', 'concept'],
].map(([a, b, c]) => [a, b, c, 1]));

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Political Theory: An Introduction',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['p_family_app', 'pt_norm_app', 'th_locke_app', 'ar_wider'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_canteen', 's_pt_def', 's3_everywhere'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_politics', 'l_pt'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_council'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Political Theory: An Introduction',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['p_market_app', 'pt_clarify_app', 'th_hobbes_app', 'th_rousseau', 'pr_art19', 'pr_theory_app', 'w_reason_app', 'w_prejudice_app', 'ar_normative', 'ar_impulse'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_def', 's_negative', { attempt: 1, keys: ['s_normdesc', 's_clarify'] }, 's3_classify', { attempt: 1, keys: ['s3_debates', 's3_why'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_normdesc', { attempt: 1, keys: ['l_practice', 'l_why'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_table', 'c_letter'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-11-political-science-ch11 only (what is politics and political theory)',
    originality: 'every passage (council minutes, household notice, forum table, newspaper report, letter) and every school, town, market, district and person is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text, no quotation of any thinker, no board item reused (D-036)',
    facts: 'stable facts only: Aristotle (ancient Greece), Machiavelli (16th century), Hobbes and Locke (17th), Rousseau (18th), Marx (19th), Gandhi and Ambedkar (20th); Hind Swaraj 1909; Articles 14, 17, 19 and 25 by number with a paraphrase',
    neutrality: 'no map, no party, no current office-holder or present-day dispute named; reservation, gender equality and freedom of expression presented as questions on which people differ, with reasons to be weighed',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
