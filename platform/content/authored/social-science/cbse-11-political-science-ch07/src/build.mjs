// Build CBSE 11 Political Science ch07 Federalism. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch07', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vFedUni = (() => {
  const s = new Svg(760, 380);
  s.line(380, 20, 380, 360, { sw: 1.5, color: 'muted', dash: true });
  s.text(190, 22, 'Federal system', { bold: true, size: 17, color: 'accent' });
  s.text(570, 22, 'Unitary system', { bold: true, size: 17, color: 'brown' });
  // federal
  s.rect(40, 50, 300, 44, { color: 'accent', sw: 2.5 });
  s.text(190, 72, 'Written, supreme constitution', { bold: true, size: 14, color: 'accent' });
  s.arrow(110, 94, 110, 140, { sw: 1.8 });
  s.arrow(270, 94, 270, 140, { sw: 1.8 });
  s.rect(20, 140, 180, 60, { color: 'blue', sw: 2 });
  s.text(110, 162, 'Union government', { bold: true, size: 14, color: 'blue' });
  s.text(110, 182, 'own powers', { size: 13 });
  s.rect(200, 140, 160, 60, { color: 'green', sw: 2 });
  s.text(280, 162, 'State governments', { bold: true, size: 14, color: 'green' });
  s.text(280, 182, 'own powers', { size: 13 });
  s.rect(40, 235, 300, 44, { color: 'red', sw: 2 });
  s.text(190, 257, 'Independent judiciary: umpire', { bold: true, size: 14, color: 'red' });
  s.line(190, 200, 190, 235, { sw: 1.6, color: 'muted' });
  s.text(190, 308, 'Powers fixed by the constitution;', { size: 13 });
  s.text(190, 328, 'neither level can take them away', { size: 13 });
  s.text(190, 348, 'by an ordinary law', { size: 13 });
  // unitary
  s.rect(440, 50, 260, 56, { color: 'brown', sw: 2.5 });
  s.text(570, 72, 'Central government', { bold: true, size: 14, color: 'brown' });
  s.text(570, 92, 'holds the power', { size: 13 });
  s.arrow(500, 106, 480, 170, { sw: 1.8 });
  s.arrow(570, 106, 570, 170, { sw: 1.8 });
  s.arrow(640, 106, 660, 170, { sw: 1.8 });
  [[395, 'Regional'], [510, 'Regional'], [625, 'Regional']].forEach(([x, t]) => {
    s.rect(x, 170, 110, 50, { color: 'muted', sw: 1.8 });
    s.text(x + 55, 190, t, { size: 13 });
    s.text(x + 55, 208, 'body', { size: 13 });
  });
  s.text(570, 262, 'Regional bodies exist', { size: 13 });
  s.text(570, 282, 'at the pleasure of the centre', { size: 13 });
  s.text(570, 328, 'One level holds the final authority', { size: 13, muted: true });
  return s.visual('Comparison of a federal system and a unitary system. In the federal system a written, supreme constitution fixes the separate powers of the Union government and the state governments, and an independent judiciary acts as umpire, so that neither level can take away the powers of the other by an ordinary law. In the unitary system the central government holds the power, and regional bodies exist at the pleasure of the centre', 'Federal and unitary systems compared.');
})();

const vLists = (() => {
  const s = new Svg(760, 400);
  const col = (x, name, colr, items) => {
    s.rect(x, 10, 230, 44, { color: colr, sw: 2.5 });
    s.text(x + 115, 32, name, { bold: true, size: 16, color: colr });
    s.rect(x, 54, 230, 190, { color: colr, sw: 1.5, rx: 6 });
    items.forEach((t, j) => s.text(x + 115, 80 + j * 30, t, { size: 14 }));
  };
  col(10, 'Union List', 'blue', ['Defence', 'Foreign affairs', 'Banking', 'Currency', 'Railways', 'and others']);
  col(265, 'State List', 'green', ['Police', 'Public order', 'Agriculture', 'Public health', 'and others']);
  col(520, 'Concurrent List', 'brown', ['Education', 'Forests', 'Marriage', 'Trade unions', 'and others']);
  s.text(125, 270, 'Parliament makes the laws', { size: 13 });
  s.text(380, 270, 'State legislatures make the laws', { size: 13 });
  s.text(635, 270, 'Both can make laws', { size: 13 });
  s.rect(10, 300, 740, 40, { color: 'accent', sw: 2 });
  s.text(380, 320, 'Concurrent conflict: the Union law prevails', { bold: true, size: 14, color: 'accent' });
  s.rect(10, 350, 740, 40, { color: 'red', sw: 2 });
  s.text(380, 370, 'Residuary powers (subjects in no list): the Union, Article 248', { bold: true, size: 14, color: 'red' });
  return s.visual('Chart of the three lists of the Seventh Schedule. The Union List, for Parliament alone, includes defence, foreign affairs, banking, currency and railways. The State List, for state legislatures, includes police, public order, agriculture and public health. The Concurrent List, on which both can make laws, includes education, forests, marriage and trade unions. If a Union law and a state law on a concurrent subject conflict, the Union law prevails. Residuary powers, on subjects in no list, lie with the Union under Article 248', 'The three lists and the two rules.');
})();

const vWeb = (() => {
  const s = new Svg(760, 400);
  const box = (x, y, w, h, title, lines, col) => {
    s.rect(x, y, w, h, { color: col, sw: 2 });
    s.text(x + w / 2, y + 22, title, { bold: true, size: 14, color: col });
    lines.forEach((ln, j) => s.text(x + w / 2, y + 44 + j * 18, ln, { size: 12 }));
  };
  s.line(240, 55, 300, 160, { sw: 1.6, color: 'muted' });
  s.line(520, 55, 460, 160, { sw: 1.6, color: 'muted' });
  s.line(240, 200, 290, 200, { sw: 1.6, color: 'muted' });
  s.line(470, 200, 520, 200, { sw: 1.6, color: 'muted' });
  s.line(240, 345, 300, 240, { sw: 1.6, color: 'muted' });
  s.line(520, 345, 460, 240, { sw: 1.6, color: 'muted' });
  s.rect(290, 150, 180, 100, { color: 'accent', sw: 3 });
  s.text(380, 188, 'Federalism with', { bold: true, size: 15, color: 'accent' });
  s.text(380, 212, 'a strong centre', { bold: true, size: 15, color: 'accent' });
  box(10, 10, 230, 90, 'Article 3', ['Parliament can form states', 'and change boundaries', 'and names by law'], 'blue');
  box(520, 10, 230, 90, 'Emergency provisions', ['National emergency, Art. 352', 'President\'s Rule, Art. 356'], 'red');
  box(10, 155, 230, 90, 'The Governor', ['Appointed by the President;', 'can reserve bills for', 'the President'], 'green');
  box(520, 155, 230, 90, 'All India Services', ['Common services of the', 'Union serve in the states'], 'brown');
  box(10, 300, 230, 90, 'Financial dependence', ['States rely on transfers', 'from the Union'], 'blue');
  box(520, 300, 230, 90, 'Article 249', ['Rajya Sabha resolution lets', 'Parliament legislate on', 'a State List subject'], 'green');
  s.text(380, 330, 'Art. stands for Article', { size: 11, muted: true });
  return s.visual('Web diagram of the unitary or centralising features around federalism with a strong centre: Article 3, under which Parliament can form states and change boundaries and names by law; emergency provisions, the national emergency under Article 352 and President\'s Rule under Article 356; the Governor, who is appointed by the President and can reserve bills for the President; All India Services, common services of the Union that serve in the states; the financial dependence of states on transfers from the Union; and Article 249, under which a Rajya Sabha resolution lets Parliament legislate on a State List subject', 'Features that favour the centre.');
})();

const vTime = (() => {
  const s = new Svg(760, 330);
  s.line(30, 160, 730, 160, { sw: 2.5 });
  const ev = [
    ['1950', ['Constitution', 'in force']],
    ['1956', ['States Reorganisation', 'Act, largely on', 'linguistic lines']],
    ['2000', ['Chhattisgarh,', 'Uttarakhand and', 'Jharkhand formed']],
    ['2014', ['Telangana', 'formed']],
    ['2015', ['NITI Aayog replaces', 'the Planning', 'Commission']],
    ['2017', ['Goods and Services', 'Tax begins']],
    ['2019', ['Article 370 changed;', 'two Union Territories', 'formed']],
  ];
  ev.forEach(([yr, lines], i) => {
    const x = 100 + i * 93.33;
    const up = i % 2 === 0;
    s.dot(x, 160, 6, 'accent');
    s.text(x, up ? 186 : 134, yr, { bold: true, size: 15, color: 'accent' });
    lines.forEach((ln, j) => s.text(x, up ? 28 + j * 19 : 222 + j * 19, ln, { size: 12 }));
    s.line(x, up ? 90 : 160, x, up ? 146 : 215, { sw: 1.2, color: 'muted', dash: true });
  });
  return s.visual('Timeline of federal landmarks: 1950, the Constitution comes into force; 1956, the States Reorganisation Act, largely on linguistic lines; 2000, Chhattisgarh, Uttarakhand and Jharkhand are formed; 2014, Telangana is formed; 2015, NITI Aayog replaces the Planning Commission; 2017, the Goods and Services Tax begins; 2019, the provisions of Article 370 are changed and two Union Territories are formed', 'Timeline of federal landmarks, 1950 to 2019.');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vMeaning = table(
  ['Term', 'Meaning'],
  [
    ['Federalism', 'A system with two or more levels of government, each with powers given by a written and supreme constitution'],
    ['Unitary system', 'A system in which the central government holds the power and regional bodies depend on it'],
    ['Division of powers', 'The sharing of subjects and functions between the levels of government by the constitution'],
    ['Umpire', 'An independent judiciary that decides disputes about the limits of the powers of each level'],
  ],
  'Table of terms: federalism is a system with two or more levels of government each with powers given by a written and supreme constitution; a unitary system is one in which the central government holds the power; the division of powers is the sharing of subjects between levels; the umpire is an independent judiciary that decides disputes about powers',
);
const vFeatures = table(
  ['Feature', 'What it means'],
  [
    ['Two or more levels', 'Each level has its own government and area of work'],
    ['Written, supreme constitution', 'Both levels are bound by it; it fixes who does what'],
    ['Difficult change', 'Changing the division of powers needs both levels or a special procedure'],
    ['Independent judiciary', 'Acts as umpire when levels disagree about powers'],
    ['Examples', 'The United States, Canada and Australia'],
  ],
  'Table of the features of a federation: two or more levels, a written and supreme constitution, a difficult change of the division of powers, an independent judiciary as umpire, with the United States, Canada and Australia as examples',
);
const vKestria = table(
  ['Test question', 'Kestria'],
  [
    ['Levels of government?', 'Three: national, provincial and municipal'],
    ['Powers fixed in a written constitution?', 'Yes'],
    ['Can the national legislature change the powers by ordinary law?', 'No: two thirds of the provincial assemblies must agree'],
    ['A court as umpire?', 'Yes: a constitutional court'],
    ['Conclusion', 'Kestria is a federation with three levels'],
  ],
  'Worked example table: imagined Kestria has three levels of government, powers fixed in a written constitution, change needing two thirds of the provincial assemblies, and a constitutional court as umpire, so it is a federation with three levels',
  'A federation can have more than two levels.',
);
const vUnion = table(
  ['Point', 'Article 1: Union of States'],
  [
    ['The name', 'India is described as a Union of States'],
    ['Origin', 'The Union is not the result of an agreement among the states'],
    ['Right to leave', 'No state has a right to leave the Union'],
    ['Position of states', 'They have their own governments and powers as parts of one nation'],
  ],
  'Table on Article 1: India is described as a Union of States; the Union is not the result of an agreement among the states; no state has a right to leave it; the states have their own governments and powers as parts of one nation',
);
const vListsTab = table(
  ['List', 'Who legislates', 'Examples'],
  [
    ['Union List', 'Parliament', 'Defence, foreign affairs, banking, currency, railways'],
    ['State List', 'State legislatures', 'Police, public order, agriculture, public health'],
    ['Concurrent List', 'Both; Union law prevails in a conflict', 'Education, forests, marriage, trade unions'],
    ['Residuary', 'Union (Article 248)', 'Any subject in none of the three lists'],
  ],
  'Table of the three lists and residuary powers: the Union List for Parliament, with defence, foreign affairs, banking, currency and railways; the State List for state legislatures, with police, public order, agriculture and public health; the Concurrent List for both, with education, forests, marriage and trade unions, and the Union law prevailing in a conflict; and residuary powers with the Union under Article 248',
);
const vClassify = table(
  ['Imagined subject', 'List', 'Who ordinarily legislates'],
  [
    ['Issuing the banknotes of the country', 'Union (currency)', 'Parliament'],
    ['Running the district hospitals of Kandara', 'State (public health)', 'Kandara legislature'],
    ['Setting rules for a school curriculum', 'Concurrent (education)', 'Both; Union law prevails in a conflict'],
    ['Managing a forest reserve across a state', 'Concurrent (forests)', 'Both'],
    ['Keeping order at a town fair', 'State (public order)', 'State legislature'],
    ['The new sky-tram, in no list', 'Residuary', 'Parliament (Article 248)'],
  ],
  'Worked example table classifying imagined subjects: banknotes are the Union List; district hospitals of Kandara are the State List; a school curriculum and a forest reserve are the Concurrent List; order at a town fair is the State List; the new sky-tram, in no list, is a residuary subject for Parliament under Article 248',
  'The subjects of Kandara and the sky-tram are imagined.',
);
const vStrong = table(
  ['Reason commonly given', 'Why it mattered'],
  [
    ['Unity and security after Partition', 'A country that had just been divided needed a centre able to hold it together'],
    ['Planned development', 'A large and diverse country needed national plans and resources to reduce differences between regions'],
    ['Some argue', 'The centre has too much power and leaves little room for the states'],
    ['Others argue', 'A strong centre is needed for unity, security and common standards'],
  ],
  'Table of reasons for a strong centre: unity and security after Partition and planned development, with the two views that some argue the centre has too much power and others argue a strong centre is needed',
);
const vArt3 = table(
  ['Feature', 'Detail'],
  [
    ['Article 3', 'Parliament can form new states and alter the area, boundaries and names of states by law; the views of the state legislature are sought but do not bind Parliament'],
    ['The Governor', 'Appointed by the President; can reserve a state bill for the President'],
    ['All India Services', 'Services common to the Union and the states'],
    ['Article 249', 'A Rajya Sabha resolution, passed by two thirds of the members present and voting, lets Parliament legislate on a State List subject for a limited period'],
  ],
  'Table of centralising features: Article 3 lets Parliament form states and alter boundaries and names, with the views of the state legislature sought but not binding; the Governor is appointed by the President and can reserve a state bill for the President; All India Services are common to the Union and the states; Article 249 lets Parliament legislate on a State List subject after a Rajya Sabha resolution passed by two thirds of members present and voting',
);
const vEmerg = table(
  ['Provision', 'Detail'],
  [
    ['Article 352', 'National emergency: the Union gains wide powers and the working of federalism changes'],
    ['Article 356', 'President\'s Rule: the executive power of a state passes to the Union when the constitutional machinery in the state is held to have failed'],
    ['Purpose', 'To protect the unity and security of the country and the working of the Constitution'],
    ['Safeguards', 'Judicial review and the limits laid down in the S. R. Bommai case (1994), studied in Part 2'],
  ],
  'Table of emergency provisions: Article 352, national emergency; Article 356, President\'s Rule, when the executive power of a state passes to the Union as the constitutional machinery in the state is held to have failed; purpose to protect unity and security; safeguards of judicial review and the limits in the S. R. Bommai case of 1994',
);
const vFinCom = table(
  ['Point', 'Finance Commission, Article 280'],
  [
    ['Constituted by', 'The President'],
    ['How often', 'Every five years'],
    ['Task', 'Recommends how the proceeds of taxes are shared between the Union and the states, and grants to states'],
    ['Why needed', 'States have many tasks but depend a good deal on transfers from the Union'],
  ],
  'Table on the Finance Commission under Article 280: constituted by the President every five years to recommend how the proceeds of taxes are shared between the Union and the states, and grants to states, because states depend on transfers from the Union',
);
const vAward = table(
  ['Item in the imagined report', 'What it shows'],
  [
    ['The states together get a larger share of divisible taxes', 'The Commission recommends how taxes are shared'],
    ['A formula using population, area and income gap', 'Resources are divided among states by criteria'],
    ['Special grants for weak finances', 'The Union helps states that need support'],
    ['Officials say they still depend on Union transfers', 'The financial dependence of states'],
    ['The Commission is set up again after five years', 'Article 280 provides for a fresh Commission every five years'],
  ],
  'Worked example table reading an imagined Finance Commission report: a larger share of taxes for the states shows tax sharing; a formula of population, area and income gap shows division among states; special grants show support for weak finances; officials saying they still depend on transfers shows financial dependence; a fresh Commission after five years shows Article 280',
  'The report and all its figures are imagined.',
);
const vCoop = table(
  ['Body', 'Detail'],
  [
    ['Goods and Services Tax Council', '101st Amendment, 2016; the tax began in 2017; the Union and the states decide together on rates and rules'],
    ['Cooperative federalism', 'Both levels work together on a shared matter, as in this Council'],
    ['NITI Aayog', 'Set up in 2015 in place of the Planning Commission; a forum for the Union and the states to work together on development'],
  ],
  'Table of cooperative federalism: the Goods and Services Tax Council, from the 101st Amendment of 2016 with the tax beginning in 2017, where the Union and the states decide together; cooperative federalism as both levels working together; and NITI Aayog, set up in 2015 in place of the Planning Commission as a forum for joint work on development',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Meaning', 'Two or more levels; written supreme constitution; difficult change; independent umpire'],
    ['Union of States', 'Article 1; no state may leave'],
    ['Division of powers', 'Union, State and Concurrent Lists; Union law prevails; residuary powers with the Union'],
    ['Strong centre', 'Unity, security, planned development; Article 3, Articles 352 and 356, Governor, All India Services, Article 249'],
    ['Fiscal federalism', 'Finance Commission; Goods and Services Tax Council; NITI Aayog'],
  ],
  'Summary table of Part 1: meaning of federalism, Union of States, division of powers, strong centre and fiscal federalism',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['A federation always has exactly two levels', 'Two or more levels; Kestria has three'],
    ['Residuary powers lie with the states', 'They lie with the Union (Article 248)'],
    ['A state can refuse a change of its boundaries', 'Parliament can change them by law; the state legislature\'s views are sought but do not bind'],
    ['Article 352 and Article 356 are the same', '352 is a national emergency; 356 is President\'s Rule in a state'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vAuton = table(
  ['Some states say', 'Others point out'],
  [
    ['A larger share of revenue would help states meet their tasks', 'Transfers help poorer states to provide services'],
    ['Less interference would let states work on their own priorities', 'Common standards and national planning serve the whole country'],
    ['States know local needs best', 'A strong centre protects unity and security'],
  ],
  'Table of two views on centre and state relations: some states say a larger share of revenue, less interference and own priorities would help; others point out that transfers help poorer states, common standards serve the whole country and a strong centre protects unity',
  'Students should weigh both views with reasons.',
);
const vGovPR = table(
  ['Point', 'Detail'],
  [
    ['The Governor', 'Appointed by the President; acts as the Union\'s representative in a state; can reserve bills'],
    ['President\'s Rule (Article 356)', 'The Union takes over the executive power of a state when the constitutional machinery is held to have failed'],
    ['Concern raised by some', 'The Governor\'s role and President\'s Rule may be used in ways that interfere with a state'],
    ['Reply of others', 'These provisions exist to protect the Constitution and the working of government'],
  ],
  'Table on the Governor and President\'s Rule: the Governor is appointed by the President and can reserve bills; under Article 356 the Union takes over the executive power of a state when the machinery is held to have failed; some raise concerns of interference and others reply that the provisions protect the Constitution',
);
const vBommaiFlow = flow('LR', ['A state ministry is said to have lost its majority', 'The majority is tested by a floor test in the House', 'If President\'s Rule is proclaimed, the courts can review it'], 'Flow of the limits associated with the S. R. Bommai case of 1994: a state ministry is said to have lost its majority, the majority is tested by a floor test in the House, and if President\'s Rule is proclaimed the courts can review it', 'Limits on President\'s Rule (Bommai, 1994)');
const vPRex = table(
  ['Question about imagined Merivan', 'Applying the limits'],
  [
    ['The Governor reports that the ministry has lost its majority', 'The report alone does not settle the matter'],
    ['How can the majority be tested?', 'By a floor test in the Assembly'],
    ['If President\'s Rule is proclaimed anyway', 'The courts can review whether it was justified'],
    ['If the proclamation is found unjustified', 'The court can decide against it'],
  ],
  'Worked example table: in imagined Merivan the Governor reports that the ministry has lost its majority; the report alone does not settle the matter; the majority can be tested by a floor test; if President\'s Rule is proclaimed anyway the courts can review it',
  'A floor test and judicial review are the limits associated with the Bommai case.',
);
const vNewFlow = flow('LR', ['A demand for a new state or a change of boundaries arises', 'Parliament considers a bill (Article 3)', 'The President refers it to the state legislature for its views', 'Parliament passes it by ordinary law'], 'Flow of forming a state: a demand for a new state or a change of boundaries arises, Parliament considers a bill under Article 3, the President refers it to the state legislature for its views, and Parliament passes it by ordinary law', 'How a new state is formed');
const vSRA = table(
  ['Point', 'States Reorganisation Act, 1956'],
  [
    ['Background', 'After 1950 there were demands to form states on the basis of language'],
    ['Commission', 'A States Reorganisation Commission was appointed in 1953'],
    ['Act of 1956', 'Redrew the map of the states largely on linguistic lines'],
    ['Idea', 'Regions that share a language can govern themselves in that language within the Union'],
  ],
  'Table on the States Reorganisation Act of 1956: demands after 1950 for states on the basis of language, a States Reorganisation Commission appointed in 1953, the Act of 1956 redrawing the map largely on linguistic lines, and the idea that regions sharing a language govern in it within the Union',
);
const vNew = table(
  ['Year', 'Event (facts only)'],
  [
    ['2000', 'Chhattisgarh, Uttarakhand and Jharkhand formed'],
    ['2014', 'Telangana formed'],
    ['Method', 'Each by a law of Parliament under Article 3'],
  ],
  'Table of later new states: in 2000 Chhattisgarh, Uttarakhand and Jharkhand were formed; in 2014 Telangana was formed; each by a law of Parliament under Article 3',
);
const vDisputes = table(
  ['Kind of dispute', 'How it is handled (imagined examples)'],
  [
    ['Boundary dispute: Kandara and Halvari differ on a common border', 'Negotiation; a law of Parliament under Article 3; a suit in the Supreme Court (Article 131)'],
    ['River-water dispute: Merivan and Sundara on the river Sarpini', 'Negotiation, then a tribunal under the Inter-State River Water Disputes Act, 1956'],
    ['Forums for talks', 'The Inter-State Council (Article 263) and Zonal Councils bring states together'],
  ],
  'Table of inter-state disputes: a boundary dispute between imagined Kandara and Halvari is handled by negotiation, a law of Parliament under Article 3 or a suit in the Supreme Court under Article 131; a river-water dispute between imagined Merivan and Sundara goes to negotiation and then a tribunal under the Inter-State River Water Disputes Act of 1956; the Inter-State Council and Zonal Councils are forums for talks',
);
const vRiverFlow = flow('LR', ['Two states disagree on the sharing of river water', 'Talks between the governments', 'At a state\'s request, the Union refers the dispute to a tribunal', 'The tribunal hears both and gives an award'], 'Flow of a river-water dispute: two states disagree on the sharing of river water, talks are held between the governments, at a state\'s request the Union refers the dispute to a tribunal, and the tribunal hears both and gives an award', 'A river-water dispute under the 1956 Act');
const vRiverEx = table(
  ['Step', 'Imagined Merivan and Sundara'],
  [
    ['1. The disagreement', 'Merivan says the water of the Sarpini reaches its farms late; Sundara says its canals take only what it needs'],
    ['2. Talks', 'The two governments meet and do not agree'],
    ['3. The tribunal', 'On Merivan\'s request, the Union refers the dispute to a tribunal'],
    ['4. The award', 'After hearing both, the tribunal fixes how the water is shared'],
    ['Why not a state body?', 'Each state is a party and cannot be neutral'],
  ],
  'Worked example table of an imagined river-water dispute: Merivan and Sundara disagree over the river Sarpini; talks fail; on Merivan\'s request the Union refers the dispute to a tribunal; the tribunal fixes how the water is shared; neither state can be neutral because each is a party',
  'The states and the river are imagined.',
);
const vAsym = table(
  ['Point', 'Asymmetric federalism'],
  [
    ['Meaning', 'Not all units of a federation are treated alike; some have special arrangements'],
    ['In India', 'Article 371 and related Articles give special provisions to several states, for example in the North-East and some others'],
    ['Purpose', 'To protect the particular needs of those states'],
    ['Contrast', 'Symmetric federalism: every state has the same arrangement'],
  ],
  'Table on asymmetric federalism: not all units are treated alike; in India Article 371 and related Articles give special provisions to several states, for example in the North-East and some others; the purpose is to protect their particular needs; symmetric federalism gives every state the same arrangement',
);
const vArt370 = table(
  ['Date', 'Fact'],
  [
    ['Before 2019', 'Article 370 gave a special position to the state of Jammu and Kashmir'],
    ['2019', 'Its provisions were changed, and Jammu and Kashmir was reorganised into two Union Territories'],
    ['December 2023', 'The Supreme Court upheld the change (as of 2024)'],
  ],
  'Dated facts on Article 370: before 2019 it gave a special position to Jammu and Kashmir; in 2019 its provisions were changed and Jammu and Kashmir was reorganised into two Union Territories; in December 2023 the Supreme Court upheld the change, as of 2024',
  'Stated as dated facts.',
);
const vViews = table(
  ['Federalism has helped, say many', 'Questions that some raise'],
  [
    ['Regions of different languages and cultures have their own governments', 'Some argue the centre is too strong'],
    ['Linguistic states and special provisions give recognised space to diversity', 'Others argue a strong centre is needed for unity'],
    ['Disputes are handled by talks, tribunals and courts', 'Students should weigh the reasons on each side'],
  ],
  'Table on the working of federalism: many say that regions have their own governments, that linguistic states and special provisions give space to diversity, and that disputes are handled by talks, tribunals and courts; some argue the centre is too strong while others argue a strong centre is needed for unity',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Centre and state', 'Demands for autonomy; Governor; Article 356; Bommai 1994'],
    ['New states', '1956 Act; 2000 and 2014; Article 3'],
    ['Inter-state disputes', 'Boundary and river-water; talks, tribunals, 1956 Act'],
    ['Special provisions', 'Article 371 and related Articles; asymmetric federalism; Article 370 as dated facts'],
    ['Overall', 'Federalism accommodates diversity; two views on the strength of the centre'],
  ],
  'Summary table of Part 2: centre and state relations, new states, inter-state disputes, special provisions and the overall view',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['The Bommai case abolished President\'s Rule', 'It laid down limits: a floor test and judicial review'],
    ['All states were formed in 1956', 'Later states came in 2000 and 2014'],
    ['Taking one side on a debated question', 'Say some argue, others argue, then give reasons'],
    ['Article 370 and Article 371 are the same', 'They are different Articles; give each its own dated facts'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Federalism, Part 1: Federalism in the Indian Constitution',
  goals: [
    'Define federalism and contrast it with a unitary system',
    'Explain the idea of a Union of States',
    'Describe the division of powers in the Seventh Schedule, with examples',
    'Explain why Indian federalism has a strong centre and list its centralising features',
    'Describe fiscal federalism: the Finance Commission, the Goods and Services Tax Council and NITI Aayog',
  ],
  slides: [
    sl('title', 'Federalism in the Indian Constitution', {
      b: 'Part 1: what **federalism** means, how powers are **divided**, and why the **centre** is strong.',
      v: flow('LR', ['What federalism is', 'Union of States', 'Division of powers', 'A strong centre', 'Fiscal federalism'], 'Route map of Part 1: what federalism is, Union of States, division of powers, a strong centre, and fiscal federalism', 'Part 1 at a glance'),
      n: 'A large country has to decide who does what. Which tasks belong to the whole country, and which to its regions? In this part we study the meaning of federalism, the division of powers in the Constitution, the reasons for a strong centre, and the way money is shared.',
    }),
    sl('concept', 'What is federalism?', {
      v: vMeaning,
      n: 'Federalism is a system with two or more levels of government. Each level has powers given by a written and supreme constitution. In a unitary system the central government holds the power and regional bodies depend on it. In a federation an independent judiciary acts as umpire when the levels disagree about their powers.',
    }),
    sl('concept', 'Features of a federation', {
      v: vFeatures,
      n: 'A federation has two or more levels of government. Its constitution is written and supreme, so both levels are bound by it. Changing the division of powers needs both levels or a special procedure. An independent judiciary acts as umpire. The United States, Canada and Australia are examples of federations.',
    }),
    sl('diagram', 'Federal and unitary systems compared', {
      v: vFedUni,
      n: 'This chart sets the two systems side by side. In the federal system the constitution fixes the powers of both levels, and a court acts as umpire. Neither level can take away the powers of the other by an ordinary law. In the unitary system the central government holds the power, and regional bodies exist at its pleasure.',
    }),
    sl('check', 'Quick check: the meaning', {
      b: 'Which description best defines federalism as a system of government?',
      chk: 'm_fed_def',
      n: 'Recall what makes a system federal.',
    }),
    sl('example', 'Worked example 1: is Kestria a federation?', {
      b: 'The imagined country Kestria has national, provincial and municipal governments. Test whether it is a federation.',
      bl: ['Are the powers **fixed** by the constitution?', 'Is there an **umpire**?'],
      v: vKestria,
      n: 'Imagine a country called Kestria with national, provincial and municipal governments. The powers are fixed in a written constitution. The national legislature cannot change them by an ordinary law, because two thirds of the provincial assemblies must agree. A constitutional court acts as umpire. So Kestria is a federation, and it has three levels, not two.',
    }),
    sl('concept', 'India as a Union of States', {
      v: vUnion,
      n: 'Article one describes India as a Union of States. The idea is that the Union is not the result of an agreement among the states, and so no state has a right to leave it. The states are not mere administrative units, for they have their own governments and powers, but they are parts of one nation.',
    }),
    sl('diagram', 'The three lists of the Seventh Schedule', {
      v: vLists,
      n: 'The Seventh Schedule divides subjects into three lists. The Union List includes defence, foreign affairs, banking, currency and railways. The State List includes police, public order, agriculture and public health. The Concurrent List includes education, forests, marriage and trade unions. On the Concurrent List the Union law prevails in a conflict.',
    }),
    sl('concept', 'Who legislates on what', {
      v: vListsTab,
      n: 'Parliament alone makes laws on the Union List. State legislatures ordinarily make laws on the State List. Both can make laws on the Concurrent List, and if a Union law and a state law conflict, the Union law prevails. Residuary powers, which cover subjects in none of the lists, lie with the Union under Article two hundred and forty eight.',
    }),
    sl('example', 'Worked example 2: classify the subjects', {
      b: 'Place each imagined subject in the correct list, and say who ordinarily makes the law.',
      bl: ['Look for the **nearest entry** in the lists', 'If none fits, think of **residuary** powers'],
      v: vClassify,
      n: 'Let us classify some subjects. Issuing banknotes is currency, a Union subject. Running the district hospitals of the imagined state of Kandara is public health, a State subject. A school curriculum is education, and a forest reserve is forests, both Concurrent. Keeping order at a town fair is public order, a State subject. A new technology in no list is a residuary subject for Parliament.',
    }),
    sl('check', 'Quick check: match the lists', {
      b: 'Match each subject with the list of the Seventh Schedule in which it appears.',
      chk: 'mt_lists',
      n: 'Pair each subject with its list.',
    }),
    sl('concept', 'Why a strong centre?', {
      v: vStrong,
      n: 'Indian federalism is often described as federalism with a strong central government. The reasons commonly taught are unity and security after Partition, and the need for planned development in a large and diverse country. Some argue that the centre has too much power. Others argue that a strong centre is needed for unity, security and common standards.',
    }),
    sl('diagram', 'Features that favour the centre', {
      v: vWeb,
      n: 'This web shows the features that favour the centre. Parliament can form states and change their boundaries under Article three. There are emergency provisions. The Governor is appointed by the President. There are All India Services, and states depend financially on the Union. Under Article two hundred and forty nine Parliament can legislate on a State List subject after a resolution of the Rajya Sabha.',
    }),
    sl('concept', 'Article 3, the Governor, services and Article 249', {
      v: vArt3,
      n: 'Under Article three, Parliament can form new states and alter boundaries and names by law. The views of the state legislature are sought but do not bind Parliament. The Governor is appointed by the President and can reserve a state bill for the President. All India Services are common to the Union and the states. Article two hundred and forty nine needs a Rajya Sabha resolution passed by two thirds of the members present and voting.',
    }),
    sl('concept', 'Emergency provisions', {
      v: vEmerg,
      n: 'Article three hundred and fifty two deals with a national emergency, when the Union gains wide powers. Article three hundred and fifty six deals with President\'s Rule, when the executive power of a state passes to the Union because the constitutional machinery in the state is held to have failed. These provisions are meant to protect the unity of the country and the working of the Constitution.',
    }),
    sl('check', 'Quick check: two Articles', {
      b: 'Which pair correctly matches the Article with its subject?',
      chk: 'm_emerg',
      n: 'Recall the Articles on emergency and on President\'s Rule.',
    }),
    sl('concept', 'The Finance Commission', {
      v: vFinCom,
      n: 'Fiscal federalism is about how money is shared between the Union and the states. Under Article two hundred and eighty, the President constitutes a Finance Commission usually every five years. It recommends how the proceeds of taxes should be shared and what grants the states should receive. States have many tasks but depend a good deal on transfers from the Union.',
    }),
    sl('example', 'Worked example 3: reading an imagined award', {
      b: 'An imagined newspaper reports on a Finance Commission award. Link each point to a feature of fiscal federalism.',
      bl: ['**Sharing** of taxes', '**Dependence** of states on transfers'],
      v: vAward,
      n: 'In this imagined report, the Commission recommends a larger share of taxes for the states. It divides the share by a formula using population, area and the gap in income. It recommends special grants for weak finances. Officials say they still depend on Union transfers, which is the financial dependence of the states. A fresh Commission will be set up after five years.',
    }),
    sl('concept', 'Cooperative federalism: the Goods and Services Tax Council and NITI Aayog', {
      v: vCoop,
      n: 'After the one hundred and first Amendment of twenty sixteen, the Goods and Services Tax began in twenty seventeen. A council of the Union and the states decides on rates and rules, which is an example of cooperative federalism. In twenty fifteen the Planning Commission was replaced by Niti Aayog, a forum where the Union and the states work together on development.',
    }),
    sl('check', 'Quick check: a council', {
      b: 'Ministers of finance from the Union and every state decide tax rates together. What is this an example of?',
      chk: 'm_coop_app',
      n: 'Think about both levels deciding together.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Federalism means two or more levels of government with powers fixed by a supreme constitution and an independent umpire. India is a Union of States. Powers are divided into the Union, State and Concurrent Lists, with residuary powers in the Union. The centre is strong for reasons of unity and planning, and money is shared through the Finance Commission and cooperative bodies.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give **examples** for each list, not counts', 'Name the **Article** with each provision', 'Date the facts: **2015**, **2016**, **2017**', 'Say **some argue, others argue** on the strong centre'],
      v: vTips1,
      n: 'A few tips. Give examples for each list. Name the Article with each provision. Date the facts, such as twenty fifteen for Niti Aayog and twenty seventeen for the Goods and Services Tax. On the strength of the centre, use the words some argue and others argue, and give reasons.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Federalism, Part 2: Conflicts and Special Provisions',
  goals: [
    'Describe centre and state relations, including demands for autonomy, the Governor and President\'s Rule',
    'State the limits associated with the S. R. Bommai case (1994)',
    'Describe how new states are formed and the facts of 1956, 2000 and 2014',
    'Explain boundary and river-water disputes and how they are settled',
    'Explain asymmetric federalism and give the dated fact on Article 370',
    'Present the views on whether federalism has accommodated diversity',
  ],
  slides: [
    sl('title', 'Conflicts and Special Provisions', {
      b: 'Part 2: **centre and state** relations, **new states**, **disputes** between states and **special provisions**.',
      v: flow('LR', ['Centre and state', 'New states', 'Disputes between states', 'Special provisions', 'The overall view'], 'Route map of Part 2: centre and state, new states, disputes between states, special provisions, and the overall view', 'Part 2 at a glance'),
      n: 'Federations are never free from disagreement. The levels of government may differ about money, about powers, or about borders. In this part we study centre and state relations, the formation of new states, disputes between states, and the special provisions made for some states.',
    }),
    sl('concept', 'Demands for state autonomy', {
      v: vAuton,
      n: 'Some states have demanded more autonomy. They ask for a larger share of revenue, less interference by the Union, and the right to follow their own priorities. Others point out that transfers help poorer states, that common standards serve the whole country, and that a strong centre protects unity. Students should weigh both views with reasons.',
    }),
    sl('concept', 'The Governor and President\'s Rule', {
      v: vGovPR,
      n: 'The Governor is appointed by the President and acts as the representative of the Union in a state. Under Article three hundred and fifty six, the Union takes over the executive power of a state when the constitutional machinery is held to have failed. Some raise concerns that these provisions can interfere with a state. Others reply that they protect the Constitution and the working of government.',
    }),
    sl('diagram', 'Limits laid down in the Bommai case', {
      v: vBommaiFlow,
      n: 'In nineteen ninety four, in the case of Bommai, the Supreme Court laid down limits on the use of President\'s Rule. A ministry\'s majority should be tested by a floor test in the House. And if President\'s Rule is proclaimed, the courts can review the proclamation. The case is remembered for these two limits.',
    }),
    sl('check', 'Quick check: the Bommai case', {
      b: 'With what is the S. R. Bommai case (1994) mainly remembered?',
      chk: 'm_bommai',
      n: 'Recall the limits on President\'s Rule.',
    }),
    sl('example', 'Worked example 1: a report from imagined Merivan', {
      b: 'The Governor of imagined Merivan reports that the ministry has lost its majority. Apply the limits.',
      bl: ['Can the report alone **settle** the matter?', 'What can the **courts** do?'],
      v: vPRex,
      n: 'Imagine that the Governor of Merivan reports that the ministry has lost its majority. The report alone does not settle the matter. The majority can be tested by a floor test in the Assembly. If President\'s Rule is proclaimed anyway, the courts can review whether it was justified, and can decide against it if it was not.',
    }),
    sl('diagram', 'How a new state is formed', {
      v: vNewFlow,
      n: 'A demand arises for a new state or for a change of boundaries. A bill is considered in Parliament under Article three. The President refers it to the state legislature concerned, which gives its views. Parliament may then pass the bill by an ordinary law. The views of the state legislature are sought, but they are not binding.',
    }),
    sl('diagram', 'Landmarks on a timeline', {
      v: vTime,
      n: 'This timeline brings together the landmarks. The Constitution came into force in nineteen fifty. The States Reorganisation Act followed in nineteen fifty six. Three states were formed in two thousand and Telangana in two thousand fourteen. Niti Aayog came in twenty fifteen, the Goods and Services Tax in twenty seventeen, and the changes of two thousand nineteen.',
    }),
    sl('concept', 'The States Reorganisation Act of 1956', {
      v: vSRA,
      n: 'After nineteen fifty, there were demands to form states on the basis of language. A States Reorganisation Commission was appointed in nineteen fifty three. The Act of nineteen fifty six redrew the map of the states largely on linguistic lines. The idea was that regions sharing a language could govern in that language within the Union.',
    }),
    sl('check', 'Quick check: put in order', {
      b: 'Arrange these events in the order in which they happened.',
      chk: 'ord_time',
      n: 'Use the timeline to put the events in order.',
    }),
    sl('concept', 'New states in 2000 and 2014', {
      v: vNew,
      n: 'In two thousand, three new states were formed: Chhattisgarh, Uttarakhand and Jharkhand. In two thousand fourteen, Telangana was formed. Each was formed by a law of Parliament under Article three. These are stated here as facts of the history of the Union.',
    }),
    sl('concept', 'Disputes between states', {
      v: vDisputes,
      n: 'States may disagree about boundaries or about river water. A boundary dispute can be settled by negotiation, by a law of Parliament, or by a suit in the Supreme Court. A river water dispute can go to a tribunal under the Inter State River Water Disputes Act of nineteen fifty six. The Inter State Council and Zonal Councils are forums where states can meet.',
    }),
    sl('diagram', 'A river water dispute step by step', {
      v: vRiverFlow,
      n: 'Two states disagree about sharing river water. Their governments hold talks. If talks fail, a state can ask the Union to refer the dispute to a tribunal under the Act of nineteen fifty six. The tribunal hears both states and gives an award. Because each state is a party, a neutral body is needed.',
    }),
    sl('example', 'Worked example 2: Merivan, Sundara and the Sarpini', {
      b: 'Two imagined states disagree about the water of the river Sarpini. Trace the steps.',
      bl: ['Talks come **first**', 'A **tribunal** gives the award'],
      v: vRiverEx,
      n: 'Imagine that Merivan says the water of the river Sarpini reaches its farms late. Sundara says its canals take only what it needs. The governments meet and do not agree. On the request of Merivan, the Union refers the dispute to a tribunal. After hearing both, the tribunal fixes how the water is shared. Neither state could be neutral, because each is a party.',
    }),
    sl('check', 'Quick check: put the steps in order', {
      b: 'Arrange the steps of an imagined river water dispute in order.',
      chk: 'ord_river',
      n: 'Think about what happens first, and what happens when talks fail.',
    }),
    sl('concept', 'Special provisions: asymmetric federalism', {
      v: vAsym,
      n: 'In an asymmetric federation, not all units are treated alike. In India, Article three hundred and seventy one and related Articles give special provisions to several states, for example in the North East and some others. They protect the particular needs of those states. In a symmetric federation every state would have the same arrangement.',
    }),
    sl('concept', 'Article 370: dated facts', {
      v: vArt370,
      n: 'Before two thousand nineteen, Article three hundred and seventy gave a special position to the state of Jammu and Kashmir. In two thousand nineteen its provisions were changed, and Jammu and Kashmir was reorganised into two Union Territories. In December two thousand twenty three the Supreme Court upheld the change. This is the position as of twenty twenty four.',
    }),
    sl('check', 'Quick check: special provisions', {
      b: 'Some states have special constitutional provisions under Article 371 and related Articles. Why do they exist?',
      chk: 'ar_asym',
      n: 'Think about the purpose of special provisions.',
    }),
    sl('concept', 'Has federalism accommodated diversity?', {
      v: vViews,
      n: 'Many say that federalism has helped India to accommodate diversity. Regions of different languages and cultures have their own governments. Linguistic states and special provisions give recognised space to diversity. Some argue that the centre is too strong. Others argue that a strong centre is needed for unity. Students should weigh the reasons on each side.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. States have asked for more autonomy, and the Governor and President\'s Rule have been debated, with limits laid down in the Bommai case. New states were formed in nineteen fifty six, two thousand and two thousand fourteen. Disputes between states go to talks, tribunals and courts. Special provisions protect the needs of some states. People hold different views on the strength of the centre.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Name the **Bommai** limits: floor test, judicial review', 'Give **years** with each new state', 'Use **imagined states** for disputes', 'Give **both views** and reasons'],
      v: vTips2,
      n: 'A few tips. When you write about President\'s Rule, name the limits from the Bommai case. Give the year with each new state. For disputes, you may use imagined states. And on any debated question, give both views with reasons, and avoid taking a side without reasons.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Federalism: Notes',
  sections: [
    {
      h: '1. Meaning and features of federalism',
      t: 1,
      b: '**Federalism** is a system of government with **two or more levels of government**, each with powers given by a **written and supreme constitution**. Changing the division of powers needs both levels or a **special procedure**, and an **independent judiciary** acts as **umpire**.\n\nIn a **unitary system** the central government holds the power and regional bodies depend on it. The United States, Canada and Australia are federations, and a federation can have more than two levels, as in the imagined country Kestria.',
      terms: [
        ['Federalism', 'A system with two or more levels of government, each with powers given by a written and supreme constitution.'],
        ['Unitary system', 'A system in which the central government holds the power and regional bodies depend on it.'],
        ['Division of powers', 'The sharing of subjects and functions between the levels of government by the constitution.'],
        ['Umpire', 'An independent judiciary that decides disputes about the limits of the powers of each level.'],
      ],
      v: vFedUni,
      vs: [vFeatures],
    },
    {
      h: '2. Union of States and the division of powers',
      t: 1,
      b: '**Article 1** describes India as a **Union of States**: the Union is not the result of an agreement among the states, and **no state has a right to leave** it.\n\nThe **Seventh Schedule** has three lists: the **Union List** (defence, foreign affairs, banking, currency, railways, and others), the **State List** (police, public order, agriculture, public health, and others) and the **Concurrent List** (education, forests, marriage, trade unions, and others). On the Concurrent List the **Union law prevails** in a conflict. **Residuary powers** lie with the **Union** (Article 248).',
      terms: [
        ['Union of States', 'The description of India in Article 1; the Union is not an agreement among states and no state may leave it.'],
        ['Seventh Schedule', 'The part of the Constitution that divides subjects into the Union, State and Concurrent Lists.'],
        ['Concurrent List', 'The list of subjects on which both Parliament and state legislatures can make laws.'],
        ['Residuary powers', 'Powers over subjects mentioned in none of the three lists; they lie with the Union under Article 248.'],
      ],
      v: vLists,
      vs: [vUnion, vClassify],
    },
    {
      h: '3. Federalism with a strong centre',
      t: 1,
      b: 'The reasons commonly taught are **unity and security after Partition** and **planned development**. Features that favour the centre are:\n\n- **Article 3:** Parliament can form new states and change boundaries and names by law.\n- **Emergency provisions:** national emergency (**Article 352**) and **President\'s Rule** in a state (**Article 356**).\n- The **Governor** is appointed by the President and can reserve bills for the President.\n- **All India Services**, common to the Union and the states.\n- **Article 249:** a Rajya Sabha resolution lets Parliament legislate on a State List subject.\n- The **financial dependence** of states on Union transfers.\n\n**Some argue** that the centre is too strong; **others argue** that a strong centre is needed for unity.',
      terms: [
        ['President\'s Rule', 'Taking over of the executive power of a state by the Union, under Article 356, when the constitutional machinery in the state is held to have failed.'],
        ['National emergency', 'A situation proclaimed under Article 352 in which the Union gains wide powers.'],
        ['All India Services', 'Services common to the Union and the states, recruited and regulated by the Union and serving in the states.'],
      ],
      v: vWeb,
      vs: [vStrong, vArt3, vEmerg],
    },
    {
      h: '4. Fiscal federalism and cooperative federalism',
      t: 1,
      b: '**Fiscal federalism** concerns the sharing of money and taxes between the Union and the states. The **Finance Commission** (**Article 280**), constituted by the President every **five years**, recommends how taxes are shared and what grants are given.\n\nThe **Goods and Services Tax Council** (**101st Amendment, 2016**; the tax began in **2017**) is an example of **cooperative federalism**. **NITI Aayog** (**2015**) replaced the **Planning Commission**.',
      terms: [
        ['Finance Commission', 'A body constituted under Article 280, usually every five years, that recommends the sharing of taxes between the Union and the states.'],
        ['Cooperative federalism', 'A working arrangement in which the Union and the states act together on shared matters.'],
        ['Goods and Services Tax Council', 'A body of the Union and the states that decides the rates and rules of the Goods and Services Tax.'],
        ['NITI Aayog', 'The body set up in 2015 in place of the Planning Commission, a forum for joint work on development.'],
      ],
      v: vCoop,
      vs: [vFinCom, vAward],
    },
    {
      h: '5. Centre and state relations; new states',
      t: 2,
      b: 'Some states have demanded more **autonomy**: a larger share of revenue, less interference and their own priorities. The **Governor** and **President\'s Rule** (Article 356) have been debated. The **S. R. Bommai case (1994)** laid down limits: a **floor test** and **judicial review** of President\'s Rule.\n\nThe **States Reorganisation Act (1956)** redrew states **largely on linguistic lines**. Later, **Chhattisgarh, Uttarakhand and Jharkhand (2000)** and **Telangana (2014)** were formed, each by a law of Parliament under **Article 3**.',
      terms: [
        ['Autonomy', 'The freedom of a state to manage its affairs with less interference from the Union.'],
        ['Floor test', 'A test of the majority of a ministry by a vote in the House.'],
        ['States Reorganisation Act', 'The 1956 Act that redrew the map of the states, largely on linguistic lines.'],
      ],
      v: vTime,
      vs: [vAuton, vSRA, vNew, vBommaiFlow],
    },
    {
      h: '6. Disputes between states',
      t: 2,
      b: 'States can have **boundary disputes** and **river-water disputes**. A boundary dispute can be settled by negotiation, a law of Parliament under Article 3, or a suit in the Supreme Court (Article 131). A river-water dispute can be referred to a **tribunal** under the **Inter-State River Water Disputes Act (1956)**. The **Inter-State Council** (Article 263) and **Zonal Councils** are forums for talks.',
      terms: [
        ['Inter-State River Water Disputes Act', 'The 1956 Act under which the Union can refer a river-water dispute between states to a tribunal.'],
        ['Tribunal', 'A special body that hears a dispute and gives a binding decision called an award.'],
      ],
      v: vRiverFlow,
      vs: [vDisputes, vRiverEx],
    },
    {
      h: '7. Special provisions and the overall view',
      t: 2,
      b: '**Asymmetric federalism** means that some units are treated differently. **Article 371 and related Articles** give special provisions to several states, for example in the North-East and some others. **Article 370** (dated facts): its provisions were changed in **2019**, when Jammu and Kashmir was reorganised into two Union Territories; the Supreme Court upheld the change in **December 2023** (as of 2024).\n\n**Overall:** federalism has helped India to accommodate diversity. **Some argue** the centre is too strong; **others argue** a strong centre is needed for unity.',
      terms: [
        ['Asymmetric federalism', 'An arrangement in which not all units of a federation are treated alike, because some have special provisions.'],
        ['Article 371', 'Article that, with related Articles, gives special provisions to several states.'],
      ],
      v: vAsym,
      vs: [vArt370, vViews],
    },
  ],
  tips: '**Common mistakes**\n- Saying a federation has only two levels: it has two or more.\n- Saying residuary powers lie with the states: they lie with the Union (Article 248).\n- Mixing Article 352 (national emergency) and Article 356 (President\'s Rule).\n- Saying the Bommai case abolished President\'s Rule: it laid down limits (a floor test and judicial review).\n- Taking a side on whether the centre is too strong: present both views with reasons.\n\n**Tips:** give examples, not counts, for the lists; name the Article with each provision; date facts (1956, 2000, 2014, 2015, 2017, as of 2024); use imagined states for disputes.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is **federalism**?', 'A system with two or more levels of government, each with powers given by a written and supreme constitution.', 'definition', 1],
  ['What is a **unitary system**?', 'A system in which the central government holds the power and regional bodies depend on it.', 'definition', 1],
  ['Name four features of a federation', 'Two or more levels; a written and supreme constitution; a difficult change of the division of powers; an independent judiciary as umpire.', 'concept', 1],
  ['Who acts as **umpire** in a federation?', 'An independent judiciary.', 'concept', 1],
  ['Name three federations other than India', 'The United States, Canada and Australia.', 'fact', 1],
  ['Can a federation have more than two levels?', 'Yes: for example, the imagined country Kestria has national, provincial and municipal levels.', 'concept', 2],
  ['What does **Article 1** say about India?', 'India is a Union of States.', 'fact', 1],
  ['Can a state leave the Union?', 'No: the Union is not the result of an agreement among the states.', 'concept', 2],
  ['What is the **Seventh Schedule**?', 'The part of the Constitution that divides subjects into the Union, State and Concurrent Lists.', 'definition', 1],
  ['Examples of the **Union List**', 'Defence, foreign affairs, banking, currency, railways.', 'fact', 1],
  ['Examples of the **State List**', 'Police, public order, agriculture, public health.', 'fact', 1],
  ['Examples of the **Concurrent List**', 'Education, forests, marriage, trade unions.', 'fact', 1],
  ['Which law prevails in a conflict on a Concurrent List subject?', 'The Union law.', 'fact', 1],
  ['Who holds **residuary powers**?', 'The Union (Article 248).', 'fact', 1],
  ['Why is the Indian federation said to have a strong centre?', 'Commonly given reasons: unity and security after Partition, and planned development.', 'concept', 2],
  ['What can Parliament do under **Article 3**?', 'Form new states and alter the boundaries and names of states, by law.', 'fact', 1],
  ['Does the state legislature\'s view bind Parliament under Article 3?', 'No: its views are sought but are not binding.', 'concept', 2],
  ['**Article 352**', 'National emergency.', 'fact', 1],
  ['**Article 356**', 'President\'s Rule in a state.', 'fact', 1],
  ['Who appoints the **Governor**?', 'The President; the Governor can reserve a state bill for the President.', 'fact', 1],
  ['What are the **All India Services**?', 'Services common to the Union and the states, recruited and regulated by the Union and serving in the states.', 'definition', 2],
  ['**Article 249**', 'A Rajya Sabha resolution by two thirds of members present and voting lets Parliament legislate on a State List subject for a limited period.', 'fact', 3],
  ['What is the **Finance Commission** (Article 280)?', 'A body constituted by the President, usually every five years, that recommends the sharing of taxes between the Union and the states.', 'definition', 1],
  ['**Goods and Services Tax Council**', 'Created after the 101st Amendment (2016); the tax began in 2017; an example of cooperative federalism.', 'fact', 2],
  ['**NITI Aayog**', 'Set up in 2015; it replaced the Planning Commission.', 'fact', 1],
  ['Demands for **state autonomy**', 'Some states ask for a larger share of revenue, less interference and their own priorities; others stress a strong centre.', 'concept', 2],
  ['**S. R. Bommai case (1994)**', 'Laid down limits on President\'s Rule: a floor test and judicial review.', 'fact', 2],
  ['**States Reorganisation Act (1956)**', 'Redrew the map of the states largely on linguistic lines.', 'fact', 1],
  ['New states of **2000**', 'Chhattisgarh, Uttarakhand and Jharkhand.', 'fact', 1],
  ['State formed in **2014**', 'Telangana.', 'fact', 1],
  ['Which Act deals with river-water disputes between states?', 'The Inter-State River Water Disputes Act (1956): a tribunal can be set up.', 'fact', 2],
  ['What is **asymmetric federalism**?', 'An arrangement in which not all units are treated alike; some have special provisions (Article 371 and related Articles).', 'definition', 2],
].map(([a, b, c], i) => [a, b, c, i < 25 ? 1 : 2]));

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Federalism',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_feature_app', 'm_list_state_app', 'm_fincom', 'ar_resid'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_fed', 's_conc', 's3_lists'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_features', 'l_strong'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_kestria'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Federalism',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_unitary_app', 'm_conflict_app', 'm_residuary', 'm_art3_app', 'm_356', 'm_river_app', 'm_asym_app', 'm_bommai_app', 'ar_umpire', 'ar_bommai'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_resid', 's_gov', { attempt: 1, keys: ['s_bommai', 's_river'] }, 's3_unitary_feat', { attempt: 1, keys: ['s3_disputes', 's3_autonomy'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_lists', { attempt: 1, keys: ['l_conflicts', 'l_special'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_finance', 'c_river'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch07 only (federalism in the Indian Constitution; conflicts and special provisions)',
    originality: 'every passage (handbook table, newspaper report, letters, classroom discussion) and every country, state, river, official and person is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text, judgment text or board item reused (D-036)',
    facts: 'stable facts only: Articles 1, 3, 131, 248, 249, 263, 280, 352, 356, 370, 371; Seventh Schedule lists; Finance Commission every five years; 101st Amendment 2016, Goods and Services Tax 2017; NITI Aayog 2015; S. R. Bommai 1994; States Reorganisation Act 1956; new states 2000 and 2014; Inter-State River Water Disputes Act 1956; Article 370 changes 2019, Supreme Court December 2023 (as of 2024)',
    neutrality: 'no map, no party, no current office-holder or present-day dispute named; demands for autonomy, the Governor and President\'s Rule, and the strength of the centre framed as some argue and others argue; Article 370 given as dated facts only',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
