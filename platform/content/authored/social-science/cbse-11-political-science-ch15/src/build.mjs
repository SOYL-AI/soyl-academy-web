// Build CBSE 11 Political Science ch15 Rights. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch15/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch15', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vSources = (() => {
  const s = new Svg(760, 400);
  const col = (x, name, c, lines) => {
    s.rect(x, 10, 240, 230, { color: c, sw: 2.5 });
    s.text(x + 120, 36, name, { bold: true, size: 16, color: c });
    lines.forEach((ln, j) => s.text(x + 120, 72 + j * 26, ln, { size: 13 }));
  };
  col(10, 'Natural rights', 'blue', ['Idea of the 17th and 18th', 'centuries: people hold', 'rights by nature', 'Associated with Locke:', 'life, liberty, property']);
  col(260, 'Human rights', 'green', ['Rights all persons have', 'because they are human', 'The UN declaration of', '1948 is the best-known', 'statement of them']);
  col(510, 'Legal rights', 'brown', ['Recognised and protected', 'by law and the state', 'Constitutions often list', 'them, as the Indian', 'Fundamental Rights do']);
  s.rect(10, 275, 740, 110, { color: 'accent', sw: 2.5 });
  s.text(380, 305, 'Sources of rights shape what people can claim', { bold: true, size: 16, color: 'accent' });
  s.text(380, 335, 'Natural and human rights give reasons for a claim', { size: 14 });
  s.text(380, 360, 'Legal rights make the claim enforceable by the state', { size: 14 });
  return s.visual('Chart of the three sources of rights. Natural rights are an idea of the seventeenth and eighteenth centuries that people hold rights by nature, associated with Locke and the rights to life, liberty and property. Human rights are the rights all persons have because they are human, and the United Nations declaration of 1948 is the best-known statement. Legal rights are recognised and protected by law and the state, and constitutions often list them, as the Indian Fundamental Rights do. Natural and human rights give reasons for a claim, and legal rights make the claim enforceable by the state', 'Three sources of rights.');
})();

const vWeb = (() => {
  const s = new Svg(760, 440);
  const box = (x, y, name, c, lines) => {
    s.rect(x, y, 300, 130, { color: c, sw: 2.5 });
    s.text(x + 150, y + 26, name, { bold: true, size: 16, color: c });
    lines.forEach((ln, j) => s.text(x + 150, y + 56 + j * 24, ln, { size: 13 }));
  };
  box(10, 10, 'Political rights', 'blue', ['To vote', 'To contest elections', 'To form parties']);
  box(450, 10, 'Civil liberties', 'green', ['Freedom of expression', 'A fair trial', 'Safety from arbitrary arrest']);
  box(10, 300, 'Economic rights', 'brown', ['Basic needs', 'A minimum wage', 'A means of livelihood']);
  box(450, 300, 'Cultural rights', 'accent', ['To keep a language and culture', 'Education in the mother tongue', 'To practise traditions']);
  s.rect(300, 185, 160, 70, { color: 'accent', sw: 2.5 });
  s.text(380, 212, 'Kinds of', { bold: true, size: 16, color: 'accent' });
  s.text(380, 234, 'rights', { bold: true, size: 16, color: 'accent' });
  s.arrow(300, 205, 230, 145, { sw: 2 });
  s.arrow(460, 205, 530, 145, { sw: 2 });
  s.arrow(300, 235, 230, 297, { sw: 2 });
  s.arrow(460, 235, 530, 297, { sw: 2 });
  return s.visual('Web chart of the kinds of rights. Political rights: to vote, to contest elections, to form parties. Civil liberties: freedom of expression, a fair trial, safety from arbitrary arrest. Economic rights: basic needs, a minimum wage, a means of livelihood. Cultural rights: to keep a language and culture, education in the mother tongue, to practise traditions', 'Four kinds of rights.');
})();

const vFlow = (() => {
  const s = new Svg(760, 440);
  const steps = [
    ['1. A right is recognised', 'It places duties on the state and on other people', 'blue'],
    ['2. The state acts and refrains', 'It provides conditions and does not violate the right', 'green'],
    ['3. Each person has responsibilities', 'Respect others, balance clashes, protect shared goods', 'brown'],
    ['4. Reasonable limits apply', 'Rights are not absolute; limits protect others and all', 'accent'],
  ];
  steps.forEach(([a, b, c], i) => {
    const y = 14 + i * 100;
    s.rect(130, y, 500, 70, { color: c, sw: 2.5 });
    s.text(380, y + 26, a, { bold: true, size: 15, color: c });
    s.text(380, y + 51, b, { size: 13 });
    if (i < steps.length - 1) s.arrow(380, y + 70, 380, y + 100, { sw: 2 });
  });
  return s.visual('Flow chart of rights and responsibilities. Step one: a right is recognised and places duties on the state and on other people. Step two: the state acts, by providing conditions, and refrains from violating the right. Step three: each person has responsibilities, to respect others, to balance clashes and to protect shared goods. Step four: reasonable limits apply, since rights are not absolute and limits protect others and the common good', 'Rights, duties and limits as a flow.');
})();

const vDecide = (() => {
  const s = new Svg(760, 460);
  const qs = [
    ['Is it needed for a life of', 'dignity and freedom?'],
    ['Can society accept it', 'as justified?'],
    ['Can it apply equally', 'to all persons?'],
  ];
  qs.forEach(([a, b], i) => {
    const y = 10 + i * 110;
    s.rect(60, y, 440, 56, { color: 'blue', sw: 2.5 });
    s.text(280, y + 20, a, { size: 14 });
    s.text(280, y + 41, b, { size: 14 });
    s.arrow(280, y + 56, 280, y + 110, { sw: 2 });
    s.text(300, y + 84, 'Yes', { anchor: 'start', size: 13, bold: true, color: 'green' });
    s.arrow(500, y + 28, 560, y + 28, { sw: 2 });
    s.text(530, y + 14, 'No', { size: 13, bold: true, color: 'brown' });
  });
  s.rect(60, 340, 440, 70, { color: 'green', sw: 2.5 });
  s.text(280, 366, 'A right', { bold: true, size: 16, color: 'green' });
  s.text(280, 391, 'A justified claim that others must respect', { size: 13 });
  s.rect(560, 10, 190, 300, { color: 'brown', sw: 2.5 });
  s.text(655, 130, 'A want or a', { bold: true, size: 15, color: 'brown' });
  s.text(655, 156, 'preference,', { bold: true, size: 15, color: 'brown' });
  s.text(655, 182, 'not yet a right', { bold: true, size: 15, color: 'brown' });
  return s.visual('Decision flow for the question: want or right? First ask whether the claim is needed for a life of dignity and freedom. If yes, ask whether society can accept it as justified. If yes, ask whether it can apply equally to all persons. If all three answers are yes, it is a right, a justified claim that others must respect. If the answer to any question is no, it is a want or a preference and not yet a right', 'Want or right? A decision flow.');
})();

// ---------------------------------------------------------------- tables: Part 1
const vRightDef = table(
  ['Point', 'What a right is'],
  [
    ['Standard definition', 'An entitlement or justified claim, recognised by society and usually by law, that lets a person live with dignity and freedom'],
    ['A claim on others', 'A right places a duty on others, including the state, to respect it'],
    ['Why it matters', 'Rights protect the conditions of a dignified life for every person'],
    ['Imagined case', 'In Pelham every child may attend the town school, and the town must not turn a child away'],
  ],
  'Table on the meaning of a right: an entitlement or justified claim recognised by society and usually by law that lets a person live with dignity and freedom; it places a duty on others including the state; it protects the conditions of a dignified life; in imagined Pelham every child may attend the town school and the town must not turn a child away',
  'Pelham is imagined.',
);
const vNotRight = table(
  ['Point', 'What is not a right'],
  [
    ['A want', 'Not every want is a right, however strongly it is felt'],
    ['The test', 'A claim becomes a right when it is necessary for a dignified life and accepted as justified'],
    ['Equal application', 'It must be able to apply equally to all, not to one person or family only'],
    ['Imagined case', 'A new phone each year is a want; safe drinking water is a claim that meets the test'],
  ],
  'Table on what is not a right: not every want is a right; a claim becomes a right when it is necessary for a dignified life and accepted as justified; it must be able to apply equally to all; a new phone each year is a want and safe drinking water meets the test',
  'The cases are imagined.',
);
const vClassify = table(
  ['Imagined claim in Odrin', 'Want or right?', 'Reason'],
  [
    ['A shop owner demands free tea for his family every morning', 'Want', 'Not necessary for dignity; cannot apply to all'],
    ['Residents ask that the town school admit every child of school age', 'Right', 'Needed for dignity; can apply equally to all'],
    ['A family demands the only seat on the town bench for itself', 'Want', 'A privilege that cannot apply equally to all'],
    ['Workers ask that no one be kept at work for more than a fair day', 'Right', 'Needed for a secure life; can apply to every worker'],
  ],
  'Worked example table classifying imagined claims in Odrin: free tea for a shop owner is a want; admission of every child to the town school is a right; the only bench seat for one family is a want; a fair working day for every worker is a right',
  'Odrin and its claims are imagined.',
);
const vNatural = table(
  ['Point', 'Natural rights'],
  [
    ['Idea', 'People are said to have certain rights by nature, apart from any government'],
    ['Period', 'An idea of the seventeenth and eighteenth centuries'],
    ['Associated with', 'John Locke: the rights to life, liberty and property'],
    ['Imagined case', 'Islanders of Belmora say that no ruler gave them the right to live freely'],
  ],
  'Table on natural rights: people are said to have rights by nature apart from any government; an idea of the seventeenth and eighteenth centuries; John Locke is associated with the rights to life, liberty and property; imagined Belmora islanders say that no ruler gave them the right to live freely',
);
const vHuman = table(
  ['Point', 'Human rights'],
  [
    ['Idea', 'Rights all persons have because they are human'],
    ['No condition', 'They do not depend on country, caste, religion or gender'],
    ['Best-known statement', 'The Universal Declaration of Human Rights, adopted by the United Nations in 1948'],
    ['Imagined case', 'A campaigner in Belmora asks for safe working conditions that no law yet mentions'],
  ],
  'Table on human rights: rights all persons have because they are human; they do not depend on country, caste, religion or gender; the best-known statement is the Universal Declaration of Human Rights adopted by the United Nations in 1948; an imagined Belmora campaigner asks for safe working conditions that no law yet mentions',
);
const vLegal = table(
  ['Point', 'Legal rights'],
  [
    ['Idea', 'Rights recognised and protected by law and the state'],
    ['Where found', 'Constitutions often list them, as the Indian Constitution does in its Fundamental Rights'],
    ['Strength', 'Courts and the state can enforce them'],
    ['Imagined case', 'The Karvale constitution lists the freedom of speech and its courts protect it'],
  ],
  'Table on legal rights: rights recognised and protected by law and the state; constitutions often list them, as the Indian Constitution does in its Fundamental Rights; courts and the state can enforce them; the imagined Karvale constitution lists freedom of speech and its courts protect it',
);
const vPolCiv = table(
  ['Kind', 'Meaning', 'Examples'],
  [
    ['Political rights', 'Rights to take part in government', 'To vote, to contest elections, to form parties'],
    ['Civil liberties', 'Rights that protect personal freedom and fair treatment', 'Freedom of expression, a fair trial'],
  ],
  'Table of political rights and civil liberties: political rights are rights to take part in government, such as to vote, to contest elections and to form parties; civil liberties protect personal freedom and fair treatment, such as freedom of expression and a fair trial',
);
const vEcoCul = table(
  ['Kind', 'Meaning', 'Examples'],
  [
    ['Economic rights', 'Rights that secure a livelihood and basic needs', 'Basic needs, a minimum wage, a livelihood'],
    ['Cultural rights', 'Rights to keep and develop a group\'s way of life', 'To preserve a language and culture, education in the mother tongue'],
  ],
  'Table of economic and cultural rights: economic rights secure a livelihood and basic needs, such as basic needs, a minimum wage and a livelihood; cultural rights allow a group to keep its way of life, such as preserving a language and culture and education in the mother tongue',
);
const vSortKinds = table(
  ['Imagined claim in Marenia', 'Kind of right'],
  [
    ['Residents form a party to contest the town council election', 'Political right'],
    ['A newspaper criticises the council without fear of punishment', 'Civil liberty'],
    ['Loom workers ask for a minimum daily wage', 'Economic right'],
    ['A community asks for primary schooling in its own language', 'Cultural right'],
  ],
  'Worked example table sorting imagined claims in Marenia: forming a party to contest the council election is a political right; a newspaper criticising the council without fear is a civil liberty; a minimum daily wage is an economic right; primary schooling in its own language is a cultural right',
  'Marenia and its claims are imagined.',
);
const vNewClaims = table(
  ['Newer claim', 'What it asks', 'Imagined case'],
  [
    ['A clean environment', 'Air, water and land that do not harm health', 'Odrin residents ask for safe air near a kiln'],
    ['Privacy', 'Protection of personal information and private life', 'A parents\' group asks that school records be kept confidential'],
    ['Rights of children', 'Care, schooling and protection suited to a child', 'A child helpline is proposed for Karvale'],
    ['Rights of indigenous peoples', 'To keep their lands, languages and ways of life', 'The Harvan forest people ask to stay on ancestral land'],
  ],
  'Table of newer claims that are increasingly recognised as rights: a clean environment, privacy, rights of children and rights of indigenous peoples, each with an imagined case',
  'The cases are imagined.',
);
const vPlan1 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: sources and kinds of rights'],
  [
    ['1. Define a right', 'A justified claim recognised by society, usually by law, placing a duty on others'],
    ['2. Test for a right', 'Necessary for a dignified life, accepted as justified, applying equally to all'],
    ['3. Sources', 'Natural, human and legal rights, one line each'],
    ['4. Kinds', 'Political, civil, economic and cultural, with an example each'],
    ['5. Newer claims', 'Clean environment, privacy, rights of children and of indigenous peoples'],
  ],
  'Worked example table planning a five mark answer on sources and kinds of rights: define a right, give the test for a right, name the three sources, name the four kinds with examples, and mention newer claims',
  'A plan, to be written in your own words.',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['A right', 'A justified claim recognised by society, usually by law'],
    ['Want or right', 'Necessary for dignity, justified, equal for all'],
    ['Sources', 'Natural, human and legal rights'],
    ['Kinds', 'Political, civil, economic, cultural'],
    ['Newer claims', 'Clean environment, privacy, children, indigenous peoples'],
  ],
  'Summary table of Part 1: a right, want or right, sources, kinds and newer claims',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Calling every want a right', 'Apply the test: necessary, justified, equal for all'],
    ['Mixing sources and kinds', 'Sources: natural, human, legal. Kinds: political, civil, economic, cultural'],
    ['Listing kinds without examples', 'Give one example of each kind'],
    ['Saying newer claims are settled everywhere', 'Write that they are increasingly recognised'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables: Part 2
const vStateDuty = table(
  ['Point', 'Duties on the state'],
  [
    ['Why', 'A right is a claim, so it places duties on the state'],
    ['To act', 'Provide the conditions in which a right can be enjoyed'],
    ['To refrain', 'Not violate the right'],
    ['Imagined case', 'Quillon opens a clinic and does not detain anyone without a lawful reason'],
  ],
  'Table on duties on the state: a right is a claim so it places duties on the state; the state must act by providing conditions for the right and refrain from violating it; imagined Quillon opens a clinic and does not detain anyone without a lawful reason',
  'Quillon is imagined.',
);
const vActRefrain = table(
  ['Right', 'State acts', 'State refrains'],
  [
    ['Education', 'Opens schools in every village', 'Does not turn a child away for his or her community'],
    ['Freedom of expression', 'Protects a peaceful meeting from attack', 'Does not silence a newspaper without lawful cause'],
    ['Livelihood', 'Starts a work scheme for landless families', 'Does not seize a family\'s tools without lawful reason'],
  ],
  'Table of how the state acts and refrains for three rights: education, freedom of expression and livelihood, each with an imagined act and an imagined refraining duty',
  'The examples are imagined.',
);
const vClassifyDuty = table(
  ['Imagined step by the Karvale government', 'Act or refrain?', 'Reason'],
  [
    ['It builds a free hostel for girls from remote hamlets', 'Act', 'It provides a condition for education'],
    ['It stops searching homes without a lawful order', 'Refrain', 'It stops a violation of a right'],
    ['It starts a safe water supply for a poor ward', 'Act', 'It provides a condition for health and dignity'],
    ['It stops detaining people without telling them why', 'Refrain', 'It stops a violation of a right'],
  ],
  'Worked example table classifying imagined steps by the Karvale government: a free hostel for girls is an act; stopping home searches without a lawful order is a refraining duty; a safe water supply is an act; stopping detention without reasons is a refraining duty',
  'Karvale and its steps are imagined.',
);
const vIndiv = table(
  ['Responsibility', 'What it means'],
  [
    ['Respect the rights of others', 'Using my right should not violate yours'],
    ['Balance rights that clash', 'Accept reasonable limits when two claims meet'],
    ['Care for shared goods', 'Protect the environment, water and public places'],
    ['Be vigilant', 'Watch when governments restrict rights in the name of security'],
  ],
  'Table of responsibilities of individuals: respect the rights of others, balance rights that clash, care for shared goods, and be vigilant when governments restrict rights in the name of security',
);
const vClash = table(
  ['Point', 'When rights clash'],
  [
    ['Why they clash', 'One person\'s use of a right may affect another person\'s right'],
    ['Example', 'Freedom of expression against privacy'],
    ['Approach', 'Weigh the harm to each side and find a reasonable limit'],
    ['Imagined case', 'A neighbour\'s loudspeaker in Pelham against a student\'s study time'],
  ],
  'Table on clashing rights: one person\'s use of a right may affect another\'s right; for example freedom of expression against privacy; the approach is to weigh the harm to each side and find a reasonable limit; imagined case of a neighbour\'s loudspeaker in Pelham against a student\'s study time',
);
const vLoud = table(
  ['Step', 'Imagined case: the loudspeaker in Pelham'],
  [
    ['1. The two claims', 'Ravi plays a loudspeaker each evening; Meena needs quiet to study'],
    ['2. Is each a right?', 'Expression is a civil liberty; study is part of education and a dignified life'],
    ['3. Harm to each', 'Ravi loses some freedom if banned; Meena loses her study time if not'],
    ['4. A reasonable limit', 'Loudspeaker allowed until a fixed hour at a lower volume'],
    ['5. Reasons explained', 'Both are told why, so each accepts the limit as fair'],
  ],
  'Worked example table on the loudspeaker in imagined Pelham: Ravi plays a loudspeaker and Meena needs quiet to study; expression is a civil liberty and study is part of education; each would lose something; a limit of a fixed hour and lower volume is reasonable; reasons are explained to both',
  'Pelham, Ravi and Meena are imagined.',
);
const vShared = table(
  ['Point', 'Shared goods'],
  [
    ['Meaning', 'Goods that everyone depends on, such as clean water, air and public places'],
    ['The responsibility', 'Individuals should care for them and not use them in ways that harm others'],
    ['Link with rights', 'A clean environment is a claim that rests on shared care'],
    ['Imagined case', 'Households in Dunmere keep the village stream clean for everyone'],
  ],
  'Table on shared goods: goods everyone depends on such as clean water, air and public places; individuals should care for them; a clean environment is a claim that rests on shared care; imagined households in Dunmere keep the village stream clean for everyone',
);
const vVigil = table(
  ['Some argue', 'Others argue'],
  [
    ['Restrictions made for security can last or grow, so citizens should watch them closely', 'A real threat may justify some limits for a time, if they are reasonable'],
    ['Any restriction should be limited, explained and open to review', 'Governments need room to protect people from danger'],
  ],
  'Table of two views on restrictions of rights in the name of security: some argue restrictions can last or grow so citizens should watch them and they should be limited, explained and open to review; others argue a real threat may justify reasonable limits for a time and that governments need room to protect people',
  'Students weigh the reasons on each side.',
);
const vLimits = table(
  ['Point', 'Rights and limits'],
  [
    ['Not absolute', 'Rights are not unlimited; one person\'s use may harm others'],
    ['Reasonable limits', 'They protect the rights of others and the common good'],
    ['What makes a limit reasonable', 'Clear, announced in advance, applied to all, and leaves the right in place'],
    ['Imagined case', 'A rally in Marenia ends before dark and keeps one lane open for ambulances'],
  ],
  'Table on rights and limits: rights are not absolute; reasonable limits protect the rights of others and the common good; a reasonable limit is clear, announced, applied to all and leaves the right in place; an imagined rally in Marenia ends before dark and keeps one lane open for ambulances',
);
const vTest = table(
  ['Imagined limit in Odrin', 'Reasonable?', 'Why'],
  [
    ['Loud music at the fair must end at ten at night, announced a week before', 'Reasonable', 'Protects residents; clear and applies to all'],
    ['All public speech banned for a year, with no reason given', 'Not reasonable', 'Wipes out the right and gives no reason'],
    ['Only critics of the council must stop speaking', 'Not reasonable', 'Does not apply to all'],
    ['A procession is asked to avoid the hospital road', 'Reasonable', 'Protects others and leaves the procession allowed'],
  ],
  'Worked example table testing imagined limits in Odrin: a ten at night end to loud music announced a week before is reasonable; a year-long ban on all public speech with no reason is not reasonable; silencing only critics of the council is not reasonable because it does not apply to all; asking a procession to avoid the hospital road is reasonable',
  'Odrin and its limits are imagined.',
);
const vPlan2 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: rights and responsibilities'],
  [
    ['1. Duties on the state', 'Act by providing conditions; refrain from violating'],
    ['2. Respect others\' rights', 'My right must not violate yours'],
    ['3. Balance clashes', 'Reasonable limits, with an imagined example'],
    ['4. Shared goods and vigilance', 'Care for the environment; watch restrictions made for security'],
    ['5. Judgement', 'Rights are not absolute; reasonable limits protect all'],
  ],
  'Worked example table planning a five mark answer on rights and responsibilities: duties on the state, respect for the rights of others, balancing clashes, shared goods and vigilance, and a judgement that rights are not absolute',
  'A plan, to be written in your own words.',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['State duties', 'Act and refrain'],
    ['Individual responsibilities', 'Respect others, balance clashes, care for shared goods, be vigilant'],
    ['Clash of rights', 'Weigh harm and find a reasonable limit'],
    ['Vigilance', 'Some argue watch closely; others argue real threats may justify limits'],
    ['Limits', 'Rights are not absolute; limits protect others and the common good'],
  ],
  'Summary table of Part 2: state duties, individual responsibilities, clashes of rights, vigilance and limits',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Saying rights place duties only on the state', 'Write that individuals have responsibilities too'],
    ['Saying rights are unlimited', 'Write that reasonable limits protect others and the common good'],
    ['Taking a side on security', 'Give both views with reasons, then a test to judge'],
    ['Giving no example of a clash', 'Add an imagined case, for example a loudspeaker against study time'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Rights, Part 1: What Rights Are, Their Sources and Their Kinds',
  goals: [
    'State the standard meaning of a right and the test that separates a right from a want',
    'Explain natural, human and legal rights as sources of rights',
    'Describe political, civil, economic and cultural rights with examples',
    'Explain why a clean environment, privacy and the rights of children and indigenous peoples are increasingly recognised claims',
    'Plan a five mark answer on sources and kinds of rights',
  ],
  slides: [
    sl('title', 'Rights: Meaning, Sources and Kinds', {
      b: 'Part 1: what a **right** is, where rights come from, and the **kinds** of rights.',
      v: flow('LR', ['What a right is', 'Want or right?', 'Sources', 'Kinds', 'Newer claims'], 'Route map of Part 1: what a right is, want or right, sources, kinds and newer claims', 'Part 1 at a glance'),
      n: 'People make many claims on one another and on the state. Which of them are rights? In this part we learn what a right is, how to tell a right from a want, where rights come from, and the main kinds of rights.',
    }),
    sl('concept', 'What a right is', {
      v: vRightDef,
      n: 'A right is an entitlement or justified claim. Society recognises it, usually through law, and it lets a person live with dignity and freedom. Because a right is a claim on others, it places a duty on them, including the state, to respect it. In imagined Pelham, the town must not turn a child away from school.',
    }),
    sl('check', 'Quick check: meaning of a right', {
      b: 'Which statement gives the standard meaning of a right?',
      chk: 'm_def',
      n: 'Recall the standard definition of a right.',
    }),
    sl('concept', 'What is not a right', {
      v: vNotRight,
      n: 'Not every want is a right. A claim becomes a right when it is necessary for a dignified life and is accepted as justified. It must also be able to apply equally to all. A new phone each year is a want. Safe drinking water is a claim that meets the test.',
    }),
    sl('diagram', 'Want or right? A decision flow', {
      v: vDecide,
      n: 'This flow gives a test. First ask whether the claim is needed for a life of dignity and freedom. Then ask whether society can accept it as justified. Then ask whether it can apply equally to all persons. If every answer is yes, the claim is a right. If any answer is no, it is a want or a preference.',
    }),
    sl('example', 'Worked example 1: want or right in Odrin', {
      b: 'Apply the test to four imagined claims.',
      bl: ['Is it **needed** for dignity?', 'Can it apply **equally to all**?'],
      v: vClassify,
      n: 'Let us apply the test to four imagined claims in Odrin. Free tea for one shop owner is a want. Admission of every child to the town school is a right. The only bench seat for one family is a want, because it cannot apply to all. A fair working day for every worker is a right.',
    }),
    sl('diagram', 'Sources of rights', {
      v: vSources,
      n: 'This chart shows three sources. Natural rights are said to belong to people by nature. Human rights belong to all persons because they are human. Legal rights are recognised and protected by law and the state. Natural and human rights give reasons for a claim, and legal rights make it enforceable.',
    }),
    sl('concept', 'Natural rights', {
      v: vNatural,
      n: 'The idea of natural rights comes from the seventeenth and eighteenth centuries. People are said to have certain rights by nature, apart from any government. John Locke is associated with the rights to life, liberty and property. Imagined islanders of Belmora say that no ruler gave them the right to live freely.',
    }),
    sl('concept', 'Human rights', {
      v: vHuman,
      n: 'Human rights are the rights that all persons have because they are human. They do not depend on country, caste, religion or gender. The best known statement is the Universal Declaration of Human Rights, adopted by the United Nations in nineteen forty eight. A campaigner in imagined Belmora appeals to such rights.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each term with its description.',
      chk: 'mt_sources',
      n: 'Pair natural rights, human rights, legal rights and newer claims with their descriptions.',
    }),
    sl('concept', 'Legal rights', {
      v: vLegal,
      n: 'Legal rights are recognised and protected by law and the state. Constitutions often list them, as the Indian Constitution does in its Fundamental Rights. Courts and the state can enforce them. The imagined constitution of Karvale lists the freedom of speech, and its courts protect it.',
    }),
    sl('diagram', 'Kinds of rights', {
      v: vWeb,
      n: 'This web shows four kinds of rights. Political rights include the right to vote, to contest elections and to form parties. Civil liberties include freedom of expression and a fair trial. Economic rights include basic needs, a minimum wage and a livelihood. Cultural rights include keeping a language and culture and education in the mother tongue.',
    }),
    sl('concept', 'Political rights and civil liberties', {
      v: vPolCiv,
      n: 'Political rights let people take part in government. They include the right to vote, to contest elections and to form parties. Civil liberties protect personal freedom and fair treatment. They include freedom of expression and a fair trial.',
    }),
    sl('concept', 'Economic and cultural rights', {
      v: vEcoCul,
      n: 'Economic rights secure a livelihood and basic needs. They include a minimum wage. Cultural rights allow a group to keep its way of life. They include preserving a language and culture, and education in the mother tongue.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about wants and rights is true or false.',
      chk: 'tf_want',
      n: 'Think about the test that a claim must meet to become a right.',
    }),
    sl('example', 'Worked example 2: sort the claims in Marenia', {
      b: 'Name the kind of right in each imagined claim.',
      bl: ['Take part in **government**?', 'Personal **freedom**, **livelihood** or **culture**?'],
      v: vSortKinds,
      n: 'Let us sort four imagined claims in Marenia. Forming a party to contest a council election is a political right. A newspaper that criticises the council without fear uses a civil liberty. A minimum daily wage is an economic right. Schooling in a community language is a cultural right.',
    }),
    sl('concept', 'Newer claims', {
      v: vNewClaims,
      n: 'Societies change, and new claims are being raised. A clean environment, privacy, the rights of children and the rights of indigenous peoples are increasingly recognised as rights. Countries recognise them at different times and in different ways. Imagined residents of Odrin ask for safe air near a kiln.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence on the meaning of a right.',
      chk: 'fb_right',
      n: 'Recall the word that describes a right as a justified demand.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on the sources and kinds of rights.',
      bl: ['Define a **right** first', 'Give **sources**, **kinds** and **newer claims**'],
      v: vPlan1,
      n: 'To plan a five mark answer, begin with the meaning of a right. Add the test that separates a right from a want. Then name the three sources, the four kinds with an example of each, and the newer claims. Write it in your own words.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. A right is a justified claim recognised by society, usually by law. A want becomes a right when it is necessary for dignity, justified and equal for all. Rights have natural, human and legal sources. They come in political, civil, economic and cultural kinds, and newer claims are increasingly recognised.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define a **right** and state the **test**', 'Do not mix **sources** with **kinds**', 'Give an **example** of each kind', 'Say newer claims are **increasingly recognised**'],
      v: vTips1,
      n: 'A few tips. Define a right and state the test that separates it from a want. Keep sources and kinds apart: natural, human and legal are sources, while political, civil, economic and cultural are kinds. Give an example of each kind, and say that newer claims are increasingly recognised.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Rights, Part 2: Rights, Responsibilities and Limits',
  goals: [
    'Explain the duties that rights place on the state, to act and to refrain',
    'Describe the responsibilities of individuals, including respect for others, balancing clashes and caring for shared goods',
    'Weigh the debate on vigilance when rights are restricted for security',
    'Explain why rights are not absolute and what makes a limit reasonable',
    'Plan a five mark answer on rights and responsibilities',
  ],
  slides: [
    sl('title', 'Rights and Responsibilities', {
      b: 'Part 2: **duties of the state**, **responsibilities of individuals** and **reasonable limits**.',
      v: flow('LR', ['Duties of the state', 'Responsibilities', 'Clash of rights', 'Vigilance', 'Limits'], 'Route map of Part 2: duties of the state, responsibilities, clash of rights, vigilance and limits', 'Part 2 at a glance'),
      n: 'Rights are never enjoyed alone. They place duties on the state and responsibilities on each of us. In this part we study those duties, see how clashing rights can be balanced, and learn why rights have reasonable limits.',
    }),
    sl('concept', 'Rights place duties on the state', {
      v: vStateDuty,
      n: 'A right is a claim, so it places duties on the state. The state must act, by providing the conditions in which a right can be enjoyed. It must also refrain, by not violating the right. Imagined Quillon opens a clinic and does not detain anyone without a lawful reason.',
    }),
    sl('diagram', 'Rights, duties and limits as a flow', {
      v: vFlow,
      n: 'This flow shows how the ideas fit together. A right is recognised and places duties on the state and on other people. The state acts and refrains. Each person has responsibilities. And reasonable limits apply, because rights are not absolute.',
    }),
    sl('check', 'Quick check: refraining duty', {
      b: 'Which example shows the state refraining from violating a right?',
      chk: 'm_state_duty',
      n: 'Think about a step in which the state holds back from an action.',
    }),
    sl('concept', 'Acting and refraining for three rights', {
      v: vActRefrain,
      n: 'Take three rights. For education, the state opens schools and does not turn a child away. For freedom of expression, it protects a peaceful meeting and does not silence a newspaper without lawful cause. For livelihood, it starts a work scheme and does not seize a family tools without lawful reason.',
    }),
    sl('example', 'Worked example 1: act or refrain in Karvale', {
      b: 'Classify four imagined steps by a government.',
      bl: ['Does it **provide** a condition?', 'Or does it **stop** a violation?'],
      v: vClassifyDuty,
      n: 'Let us classify four imagined steps in Karvale. A free hostel for girls is an act that provides a condition for education. Stopping home searches without a lawful order is a refraining duty. A safe water supply is an act. Stopping detention without reasons is a refraining duty.',
    }),
    sl('concept', 'Responsibilities of individuals', {
      v: vIndiv,
      n: 'Individuals have responsibilities too. They should respect the rights of others, so that using one right does not violate another. They should balance rights that clash, care for shared goods such as the environment, and be vigilant when governments restrict rights in the name of security.',
    }),
    sl('concept', 'When rights clash', {
      v: vClash,
      n: 'Rights can clash. One person using a right may affect another person right. For example, freedom of expression may meet privacy. The approach is to weigh the harm to each side and find a reasonable limit. In imagined Pelham, a neighbour with a loudspeaker meets a student who needs quiet.',
    }),
    sl('example', 'Worked example 2: the loudspeaker in Pelham', {
      b: 'Balance two clashing claims step by step.',
      bl: ['Name the **two claims**', 'Find a **reasonable limit** and explain it'],
      v: vLoud,
      n: 'Ravi plays a loudspeaker each evening in imagined Pelham. Meena needs quiet to study. Expression is a civil liberty, and study is part of education and a dignified life. Each would lose something. A fixed hour and a lower volume is a reasonable limit, and explaining the reasons helps both accept it.',
    }),
    sl('check', 'Quick check: put in order', {
      b: 'Arrange the steps for resolving a clash of rights.',
      chk: 'ord_clash',
      n: 'Think about which step must come first and which comes last.',
    }),
    sl('concept', 'Caring for shared goods', {
      v: vShared,
      n: 'Shared goods are goods that everyone depends on, such as clean water, air and public places. Individuals should care for them and not use them in ways that harm others. A clean environment is a claim that rests on shared care. Households in imagined Dunmere keep the village stream clean.',
    }),
    sl('concept', 'Vigilance when rights are restricted for security', {
      v: vVigil,
      n: 'Governments sometimes restrict rights in the name of security. Some argue that such restrictions can last or grow, so citizens should watch them and ask that they be limited, explained and open to review. Others argue that a real threat may justify reasonable limits for a time. Students weigh both views.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about using rights without limit is true or false.',
      chk: 'tf_absolute',
      n: 'Think about what happens when a right is used in a way that harms others.',
    }),
    sl('concept', 'Rights are not absolute', {
      v: vLimits,
      n: 'Rights are not absolute. One person use of a right may harm others. Reasonable limits protect the rights of others and the common good. A limit is reasonable when it is clear, announced in advance, applied to all, and leaves the right in place.',
    }),
    sl('example', 'Worked example 3: is the limit reasonable?', {
      b: 'Test four imagined limits in Odrin.',
      bl: ['Does it **protect others**?', 'Is it **clear** and **applied to all**?'],
      v: vTest,
      n: 'Let us test four imagined limits in Odrin. Ending loud music at ten at night, announced a week before, is reasonable. A year long ban on all public speech with no reason is not. Silencing only critics of the council is not reasonable because it does not apply to all. Asking a procession to avoid the hospital road is reasonable.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence on the limits of rights.',
      chk: 'fb_limits',
      n: 'Recall the word that means without any limit.',
    }),
    sl('example', 'Worked example 4: plan a five mark answer', {
      b: 'Plan an answer on rights and responsibilities.',
      bl: ['Start with **duties of the state**', 'Add **responsibilities**, a **clash** and **limits**'],
      v: vPlan2,
      n: 'To plan a five mark answer, begin with the duties of the state, to act and to refrain. Add the responsibilities of individuals, then an imagined clash of rights balanced by a reasonable limit. End with a judgement that rights are not absolute. Write it in your own words.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Rights place duties on the state, to act and to refrain. Individuals should respect the rights of others, balance clashes, care for shared goods and be vigilant. Some argue we must watch restrictions made for security, while others say real threats can justify limits. Rights are not absolute, and reasonable limits protect all.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Name both duties: **act** and **refrain**', 'Say individuals have **responsibilities**', 'Give an **imagined clash** and a limit', 'On security write **some argue, others argue**'],
      v: vTips2,
      n: 'A few tips. Name both duties of the state, to act and to refrain. Say that individuals have responsibilities too. Support your answer with an imagined clash of rights and a reasonable limit. On security, write some argue, others argue, and then give your reasons.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Rights: Notes',
  sections: [
    {
      h: '1. What a right is; want or right',
      t: 1,
      b: 'A **right** is an entitlement or **justified claim**, recognised by society and usually by law, that allows a person to live with **dignity and freedom** and places a **duty** on others, including the state, to respect it.\n\nNot every **want** is a right. A claim becomes a right when it is **necessary for a dignified life**, is **accepted as justified**, and can **apply equally to all**.',
      terms: [
        ['Right', 'An entitlement or justified claim, recognised by society and usually by law, that lets a person live with dignity and freedom and places a duty on others to respect it.'],
        ['Want', 'A wish or preference that is not necessary for a dignified life and cannot be justified as a claim for all.'],
        ['Dignity', 'The worth that every person has simply as a person.'],
      ],
      v: vDecide,
      vs: [vRightDef, vNotRight, vClassify],
    },
    {
      h: '2. Sources of rights',
      t: 1,
      b: 'Rights are traced to three sources.\n\n- **Natural rights**: the seventeenth and eighteenth century idea that people have rights by nature, for example the rights to **life, liberty and property** associated with John Locke.\n- **Human rights**: rights all persons have because they are human. The **Universal Declaration of Human Rights** (United Nations, 1948) is the best-known statement.\n- **Legal rights**: rights recognised and protected by law and the state. Constitutions often list them, as the Indian Constitution does in its Fundamental Rights.',
      terms: [
        ['Natural rights', 'Rights that people are said to have by nature, before and apart from any government or law.'],
        ['Human rights', 'Rights that all persons have because they are human, whatever their country, caste, religion or gender.'],
        ['Legal rights', 'Rights that are recognised and protected by law and enforced by the state.'],
      ],
      v: vSources,
      vs: [vNatural, vHuman, vLegal],
    },
    {
      h: '3. Kinds of rights',
      t: 1,
      b: 'Rights are also grouped by what they protect.\n\n- **Political rights**: to vote, to contest elections, to form parties.\n- **Civil liberties**: freedom of expression, a fair trial.\n- **Economic rights**: basic needs, a minimum wage, livelihood.\n- **Cultural rights**: to preserve one\'s language and culture, and education in the mother tongue.',
      terms: [
        ['Political rights', 'Rights that let people take part in government, such as to vote, to contest elections and to form parties.'],
        ['Civil liberties', 'Rights that protect personal freedom and fair treatment, such as freedom of expression and a fair trial.'],
        ['Economic rights', 'Rights that secure a livelihood and basic needs, such as a minimum wage.'],
        ['Cultural rights', 'Rights that let a group keep and develop its way of life, such as preserving a language and culture and education in the mother tongue.'],
      ],
      v: vWeb,
      vs: [vPolCiv, vEcoCul, vSortKinds],
    },
    {
      h: '4. Newer claims',
      t: 1,
      b: 'New claims are being raised as societies change and are **increasingly recognised** as rights: a **clean environment**, **privacy**, the **rights of children** and the **rights of indigenous peoples**. Countries recognise them at different times and in different ways.',
      terms: [
        ['Clean environment', 'The claim to air, water and land that do not harm health.'],
        ['Privacy', 'The claim to protection of personal information and private life.'],
        ['Rights of indigenous peoples', 'The claims of the original peoples of a region to keep their lands, languages and ways of life.'],
      ],
      v: vNewClaims,
      vs: [vPlan1],
    },
    {
      h: '5. Rights and the duties of the state',
      t: 2,
      b: 'A right is a claim, so it places **duties on the state**. The state must **act**, by providing the conditions in which a right can be enjoyed (schools, clinics, safe water), and **refrain**, by not violating the right (no arrest without lawful reason, no silencing of a peaceful newspaper without lawful cause).',
      terms: [
        ['Duty to act', 'The duty of the state to provide the conditions in which a right can be enjoyed.'],
        ['Duty to refrain', 'The duty of the state not to violate a right.'],
      ],
      v: vFlow,
      vs: [vStateDuty, vActRefrain, vClassifyDuty],
    },
    {
      h: '6. Responsibilities of individuals; limits on rights',
      t: 2,
      b: 'Individuals should **respect the rights of others**, **balance** their rights when these clash with others\' rights (for example freedom of expression against privacy), **care for shared goods** such as the environment, and **be vigilant** when governments restrict rights in the name of security. On the last point, some argue that restrictions can last or grow and must be watched; others argue that a real threat may justify reasonable limits for a time.\n\nRights are **not absolute**. **Reasonable limits** protect the rights of others and the common good.',
      terms: [
        ['Responsibility', 'A duty that a person owes to others and to society in return for the rights he or she enjoys.'],
        ['Balancing of rights', 'Finding a reasonable limit so that two clashing claims are both respected as far as possible.'],
        ['Shared goods', 'Goods that everyone depends on, such as clean water, air and public places.'],
        ['Reasonable limit', 'A restriction on a right that is clear, announced, applies to all, protects others or the common good, and leaves the right in place.'],
        ['Common good', 'The conditions that benefit all the members of a society.'],
      ],
      v: vLimits,
      vs: [vIndiv, vClash, vLoud, vShared, vVigil, vTest, vPlan2],
    },
  ],
  tips: '**Common mistakes**\n- Calling every want a right: apply the test of necessity, justification and equal application.\n- Mixing sources with kinds: natural, human and legal are sources; political, civil, economic and cultural are kinds.\n- Listing kinds without examples: give one example of each.\n- Saying newer claims are settled everywhere: write that they are increasingly recognised.\n- Saying rights place duties only on the state: individuals have responsibilities too.\n- Saying rights are unlimited: reasonable limits protect others and the common good.\n- Taking a side on security: give both views with reasons, then a test for judging a restriction.\n\n**Tips:** add an imagined example to each point; for a clash of rights, name the two claims, weigh the harm and propose a reasonable limit; end with a reasoned judgement.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is a **right**?', 'An entitlement or justified claim, recognised by society and usually by law, that lets a person live with dignity and freedom and places a duty on others to respect it.', 'definition', 1],
  ['Is every want a right?', 'No: a claim is a right only if it is necessary for a dignified life, accepted as justified, and able to apply equally to all.', 'concept', 1],
  ['What are the three tests of a right?', 'Necessary for a dignified life; accepted as justified; able to apply equally to all.', 'concept', 1],
  ['What is **dignity**?', 'The worth that every person has simply as a person.', 'definition', 1],
  ['What does a right place on others?', 'A duty to respect it, including the state.', 'concept', 1],
  ['Name the three **sources** of rights', 'Natural rights, human rights and legal rights.', 'concept', 1],
  ['What are **natural rights**?', 'Rights people are said to have by nature, before and apart from any government or law.', 'definition', 1],
  ['When did the idea of natural rights arise?', 'In the seventeenth and eighteenth centuries.', 'fact', 1],
  ['Which rights are associated with John **Locke**?', 'Life, liberty and property.', 'fact', 1],
  ['What are **human rights**?', 'Rights all persons have because they are human, whatever their country, caste, religion or gender.', 'definition', 1],
  ['Name the best-known statement of human rights', 'The Universal Declaration of Human Rights, adopted by the United Nations in 1948.', 'fact', 1],
  ['What are **legal rights**?', 'Rights recognised and protected by law and enforced by the state.', 'definition', 1],
  ['Where are legal rights often listed?', 'In constitutions, for example the Fundamental Rights of the Indian Constitution.', 'fact', 1],
  ['Name the four **kinds** of rights', 'Political rights, civil liberties, economic rights and cultural rights.', 'concept', 1],
  ['What are **political rights**?', 'Rights to take part in government: to vote, to contest elections, to form parties.', 'definition', 1],
  ['What are **civil liberties**?', 'Rights that protect personal freedom and fair treatment, such as freedom of expression and a fair trial.', 'definition', 1],
  ['What are **economic rights**?', 'Rights that secure a livelihood and basic needs, such as a minimum wage.', 'definition', 1],
  ['What are **cultural rights**?', 'Rights to keep one\'s language and culture and to education in the mother tongue.', 'definition', 1],
  ['Name four **newer claims**', 'A clean environment, privacy, the rights of children and the rights of indigenous peoples.', 'fact', 1],
  ['How are newer claims described?', 'As increasingly recognised rights; countries recognise them at different times and in different ways.', 'concept', 1],
  ['What duties do rights place on the **state**?', 'To act, by providing conditions, and to refrain, by not violating the right.', 'concept', 2],
  ['Give an example of the state **acting** for a right', 'Opening schools and clinics.', 'fact', 2],
  ['Give an example of the state **refraining**', 'Not arresting a person without a lawful reason.', 'fact', 2],
  ['What is a **responsibility** of an individual?', 'A duty owed to others and society in return for the rights one enjoys.', 'definition', 2],
  ['Name three responsibilities of individuals', 'Respect others\' rights; balance clashing rights; care for shared goods.', 'concept', 2],
  ['What are **shared goods**?', 'Goods everyone depends on, such as clean water, air and public places.', 'definition', 2],
  ['Give an example of a **clash of rights**', 'Freedom of expression against privacy.', 'fact', 2],
  ['How can a clash of rights be balanced?', 'By weighing the harm to each side and finding a reasonable limit.', 'concept', 2],
  ['What do some argue about **security** restrictions?', 'That restrictions can last or grow, so citizens should be vigilant; others argue a real threat may justify reasonable limits.', 'concept', 2],
  ['Are rights **absolute**?', 'No: reasonable limits protect the rights of others and the common good.', 'concept', 2],
  ['What makes a limit **reasonable**?', 'It is clear, announced, applies to all, protects others or the common good, and leaves the right in place.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Rights',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_source_app', 'm_clash_app', 'm_economic_app', 'ar_limits'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_right_def', 's_limits', 's3_balance'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_right_sources', 'l_clash_limits'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_debate'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Rights',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_notright_app', 'm_source_app2', 'm_civil_app', 'm_newclaim_app', 'm_equal_all', 'm_env_app', 'm_limit_app', 'm_limit_eval', 'ar_natural', 'ar_rr'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_want_right', 's_natural', { attempt: 1, keys: ['s_state_duties', 's_resp'] }, 's3_sources', { attempt: 1, keys: ['s3_resp', 's3_vigil'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_state_resp', { attempt: 1, keys: ['l_kinds', 'l_evaluate'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_news', 'c_table'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch15 only (what rights are, want or right, sources and kinds of rights, newer claims; duties on the state, responsibilities of individuals, clashes of rights and reasonable limits)',
    originality: 'every scenario, country, town, debate, report, table, letter and note is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no quotation of any thinker or document, no board item reused (D-036)',
    facts: 'stable facts only: Locke associated with life, liberty and property; Universal Declaration of Human Rights (United Nations, 1948) named only; the Indian Constitution named only as an example of a constitution listing legal rights; no Article, case or scheme cited',
    neutrality: 'no map, no party, no current office-holder, no real case; vigilance about security restrictions presented as some argue, others argue, with a test for the student to apply',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
