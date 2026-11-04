// Build CBSE 11 Political Science ch16 Citizenship. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch16/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch16', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vMarshall = (() => {
  const s = new Svg(760, 420);
  const col = (x, name, c, lines) => {
    s.rect(x, 10, 240, 270, { color: c, sw: 2.5 });
    s.text(x + 120, 36, name, { bold: true, size: 16, color: c });
    lines.forEach((ln, j) => s.text(x + 120, 72 + j * 26, ln, { size: 13 }));
  };
  col(10, 'Civil rights', 'blue', ['Individual freedom', 'Speech, thought, faith', 'Own property', 'A fair hearing in court', 'Imagined: Dinesh seeks', 'his wages in a Kalvara court']);
  col(260, 'Political rights', 'green', ['A share in power', 'Vote in elections', 'Stand for office', 'Imagined: Lata votes in a', 'Kalvara ward election', 'and stands for a committee']);
  col(510, 'Social rights', 'brown', ['Welfare and security', 'Schooling', 'Health care', 'Imagined: a free school', 'and a clinic in every', 'Kalvara ward']);
  s.rect(10, 310, 740, 100, { color: 'accent', sw: 2.5 });
  s.text(380, 338, 'Citizenship also carries obligations', { bold: true, size: 16, color: 'accent' });
  s.text(380, 366, 'Obey the laws, pay taxes, respect the rights of others', { size: 14 });
  s.text(380, 390, 'Marshall named three kinds of rights in 1950', { size: 14 });
  return s.visual('Chart of the three kinds of citizenship rights described by T. H. Marshall. Civil rights protect individual freedom: speech, thought, faith, property and a fair hearing in court, for example an imagined worker Dinesh seeking his wages in a Kalvara court. Political rights are a share in power: voting and standing for office, for example an imagined resident Lata voting in a ward election. Social rights concern welfare and security: schooling and health care, for example a free school and clinic in every imagined ward. Citizenship also carries obligations: obey the laws, pay taxes and respect the rights of others', 'Marshall\'s three kinds of citizenship rights, with imagined examples.');
})();

const vWeb = (() => {
  const s = new Svg(760, 440);
  const box = (x, y, name, c, l1, l2) => {
    s.rect(x, y, 300, 90, { color: c, sw: 2.5 });
    s.text(x + 150, y + 26, name, { bold: true, size: 16, color: c });
    s.text(x + 150, y + 52, l1, { size: 13 });
    s.text(x + 150, y + 74, l2, { size: 13 });
  };
  box(10, 10, 'Moving and working', 'blue', 'Citizens move freely across states', 'Imagined: Dinesh in Kalvara');
  box(450, 10, 'Urban poor', 'green', 'Housing, water and schools', 'Imagined: Harbour Lane petition');
  box(10, 250, 'Forest dwellers', 'brown', 'Livelihood and access to forests', 'Imagined: Sarna Hills villagers');
  box(450, 250, 'Excluded groups', 'blue', 'Women and Dalits struggled for', 'equal treatment as citizens');
  s.rect(270, 150, 220, 70, { color: 'accent', sw: 3 });
  s.text(380, 178, 'Equal citizenship', { bold: true, size: 17, color: 'accent' });
  s.text(380, 202, 'in practice', { size: 14 });
  s.arrow(300, 150, 200, 100, { sw: 2 });
  s.arrow(460, 150, 560, 100, { sw: 2 });
  s.arrow(300, 220, 200, 250, { sw: 2 });
  s.arrow(460, 220, 560, 250, { sw: 2 });
  s.rect(10, 360, 740, 64, { color: 'accent', sw: 2 });
  s.text(380, 386, 'Common thread: the same rule for all may fall unequally', { bold: true, size: 15 });
  s.text(380, 410, 'so equal citizenship needs attention to disadvantaged groups', { size: 14 });
  return s.visual('Web of issues in equal citizenship in practice, with equal citizenship at the centre. Moving and working: citizens move freely across states, for example an imagined worker Dinesh in Kalvara. Urban poor: housing, water and schools, for example the imagined Harbour Lane petition. Forest dwellers: livelihood and access to forests, for example imagined Sarna Hills villagers. Excluded groups: women and Dalits struggled for equal treatment as citizens. Common thread: the same rule for all may fall unequally, so equal citizenship needs attention to disadvantaged groups', 'Equal citizenship in practice: a web of issues.');
})();

const vModes = (() => {
  const s = new Svg(760, 440);
  s.rect(150, 10, 460, 64, { color: 'accent', sw: 2.5 });
  s.text(380, 36, 'Citizenship in India: Part II and the Citizenship Act 1955', { bold: true, size: 14, color: 'accent' });
  s.text(380, 60, 'As provided in the Act, which has been amended over time', { size: 13 });
  const modes = [
    ['Birth', ['Born in the', 'territory, as the', 'Act provides'], 'blue'],
    ['Descent', ['Born abroad to', 'a parent who is', 'a citizen'], 'green'],
    ['Registration', ['Certain categories', 'apply to be', 'registered'], 'brown'],
    ['Naturalisation', ['A foreigner who', 'meets the legal', 'conditions'], 'blue'],
    ['Incorporation', ['Residents of', 'territory added', 'to the state'], 'green'],
  ];
  modes.forEach(([name, lines, c], i) => {
    const x = 5 + i * 150;
    s.arrow(380, 74, x + 70, 130, { sw: 1.8 });
    s.rect(x, 130, 140, 150, { color: c, sw: 2.5 });
    s.text(x + 70, 158, name, { bold: true, size: 14, color: c });
    lines.forEach((ln, j) => s.text(x + 70, 190 + j * 24, ln, { size: 12 }));
  });
  s.rect(10, 320, 740, 100, { color: 'accent', sw: 2.5 });
  s.text(380, 348, 'Equal citizenship', { bold: true, size: 16, color: 'accent' });
  s.text(380, 376, 'Given to all without distinction of religion, caste or gender', { size: 14 });
  s.text(380, 400, 'India has a single citizenship for the whole country', { size: 14 });
  return s.visual('Flow chart of the general modes of acquiring citizenship in India, as provided in Part II of the Constitution and the Citizenship Act 1955, which has been amended over time. Birth: born in the territory, as the Act provides. Descent: born abroad to a parent who is a citizen. Registration: certain categories apply to be registered. Naturalisation: a foreigner who meets the legal conditions. Incorporation of territory: residents of territory added to the state. Equal citizenship is given to all without distinction of religion, caste or gender, and India has a single citizenship for the whole country', 'General modes of acquiring citizenship in India.');
})();

const vCompare = (() => {
  const s = new Svg(760, 440);
  const box = (x, name, c, lines) => {
    s.rect(x, 10, 360, 290, { color: c, sw: 2.5 });
    s.text(x + 180, 38, name, { bold: true, size: 18, color: c });
    lines.forEach((ln, j) => s.text(x + 180, 78 + j * 28, ln, { size: 14, bold: j % 2 === 0 }));
  };
  box(10, 'National citizenship', 'blue', ['Source: the law of a state', 'Membership of a nation-state', 'Rights enforced by courts', 'and officials of the state', 'Imagined: Mei approaches', 'her own state\'s courts', 'Vote, passport, schooling']);
  box(390, 'Global citizenship', 'green', ['Source: an idea of belonging', 'A world community', 'Responsibilities to humanity', 'Environment, rights, relief', 'Imagined: Lumen students', 'raise a flood relief fund', 'Helped by the internet']);
  s.rect(10, 330, 740, 90, { color: 'accent', sw: 2.5 });
  s.text(380, 358, 'Views differ on how the two relate', { bold: true, size: 16, color: 'accent' });
  s.text(380, 384, 'Some argue global citizenship complements national citizenship', { size: 14 });
  s.text(380, 406, 'Others argue national citizenship remains the main source of rights', { size: 14 });
  return s.visual('Comparison chart of national and global citizenship. National citizenship: the source is the law of a state; membership of a nation-state; rights enforced by courts and officials of the state; imagined Mei approaches her own state courts; vote, passport, schooling. Global citizenship: the source is an idea of belonging; a world community; responsibilities to humanity such as the environment, rights and relief; imagined Lumen students raise a flood relief fund; helped by the internet. Views differ: some argue global citizenship complements national citizenship, others argue national citizenship remains the main source of rights', 'National and global citizenship compared.');
})();

// ---------------------------------------------------------------- tables: Part 1
const tCit = table(
  ['Point', 'Citizenship'],
  [
    ['Standard definition', 'Full and equal membership of a political community, usually a nation-state'],
    ['What it carries', 'Rights (civil, political and social) and obligations'],
    ['Why it matters', 'It gives a person a recognised place and a claim to protection and a share in public life'],
    ['Imagined case', 'A mason, Dinesh, who works in Kalvara is a full member of the country, not a guest'],
  ],
  'Table on citizenship: the standard definition is full and equal membership of a political community, usually a nation-state; it carries rights, civil, political and social, and obligations; it gives a recognised place, a claim to protection and a share in public life; an imagined mason Dinesh who works in Kalvara is a full member of the country',
  'Kalvara and Dinesh are imagined.',
);
const tOblig = table(
  ['Obligation', 'What it means', 'Imagined case in Kalvara'],
  [
    ['Obey the laws', 'Follow the rules that the community has made', 'A shopkeeper keeps to the market rules'],
    ['Pay taxes', 'Contribute to the cost of public services', 'A trader pays the tax due on her sales'],
    ['Respect the rights of others', 'Do not harm the equal rights of fellow citizens', 'A landlord does not refuse tenants on grounds of caste'],
  ],
  'Table of obligations of citizens: obey the laws, pay taxes and respect the rights of others, each with an imagined case in Kalvara',
  'The cases in Kalvara are imagined.',
);
const tStruggles = table(
  ['Struggle', 'What was demanded, in general terms'],
  [
    ['French Revolution, 1789', 'That people be citizens with equal rights and not subjects ranked by birth'],
    ['Struggle against apartheid in South Africa', 'Equal citizenship for all people; apartheid ended in the early 1990s and the first democratic election was in 1994'],
    ['Women\'s movements in India', 'Equal rights and a full place as citizens'],
    ['Movements of Dalits in India', 'An end to untouchability and equal treatment and dignity as citizens'],
  ],
  'Table of struggles for equal citizenship: the French Revolution of 1789 demanded equal rights for citizens; the struggle against apartheid in South Africa demanded equal citizenship, apartheid ended in the early 1990s and the first democratic election was in 1994; women\'s movements in India demanded equal rights; movements of Dalits in India demanded an end to untouchability and equal dignity',
);
const tClassify = table(
  ['Imagined situation in Kalvara', 'Kind of right', 'Reason'],
  [
    ['A tenant goes to court when a landlord keeps her deposit', 'Civil right', 'A fair hearing protects individual freedom'],
    ['A resident registers on the voters list and votes in the ward election', 'Political right', 'A share in power'],
    ['A family uses the public clinic in its ward', 'Social right', 'Health care serves welfare and security'],
    ['A trader files her tax return on time', 'Obligation', 'A duty that a citizen owes'],
  ],
  'Worked example table classifying imagined situations in Kalvara: going to court is a civil right, voting is a political right, using the public clinic is a social right and filing a tax return is an obligation',
  'The situations in Kalvara are imagined.',
);
const tMove = table(
  ['Point', 'Freedom to move and work'],
  [
    ['The freedom', 'A citizen may move freely and live and work in any part of the country (Article 19), subject to reasonable restrictions'],
    ['Why it fits equal citizenship', 'India has a single citizenship, so a citizen of any state is a full member everywhere'],
    ['One view on arrivals', 'Some argue that arrivals strain housing, jobs and services'],
    ['Another view', 'Others argue that they are equal citizens who add to the economy; claims should be tested with evidence'],
    ['Imagined case', 'Dinesh, from a distant state, seeks a room in Kalvara'],
  ],
  'Table on the freedom to move and work: a citizen may move freely and live and work in any part of the country under Article 19, subject to reasonable restrictions; India has a single citizenship; some argue arrivals strain housing, jobs and services, others argue they are equal citizens who add to the economy and that claims should be tested with evidence; imagined Dinesh seeks a room in Kalvara',
  'Dinesh and Kalvara are imagined; both views are given with reasons.',
);
const tSlum = table(
  ['Point', 'The urban poor'],
  [
    ['The claim', 'Residents of crowded settlements are citizens with a fair claim to housing, water, drainage and schools'],
    ['The difficulty', 'Land may be reserved under a city plan, and funds are limited'],
    ['A fair approach', 'Hear the residents, weigh their needs with the plan and give reasons'],
    ['Imagined case', 'The Harbour Lane settlement petitions the Kalvara Corporation for piped water'],
  ],
  'Table on the urban poor: residents of crowded settlements are citizens with a fair claim to housing, water, drainage and schools; land may be reserved under a city plan and funds are limited; a fair approach is to hear the residents, weigh their needs with the plan and give reasons; imagined Harbour Lane petitions the Kalvara Corporation for piped water',
  'Harbour Lane and the Corporation are imagined.',
);
const tForest = table(
  ['Point', 'Tribal people and forest dwellers'],
  [
    ['The claim', 'Their livelihood depends on gathering produce from the forest and on access to it'],
    ['The other aim', 'Protecting forests and rare trees is also a legitimate aim'],
    ['Equal citizenship asks', 'That a disadvantaged group be heard and both claims weighed with reasons'],
    ['Imagined case', 'The villagers of the Sarna Hills and the Dhanvi Forest notice'],
  ],
  'Table on tribal people and forest dwellers: their livelihood depends on gathering produce and on access to the forest; protecting forests is also a legitimate aim; equal citizenship asks that a disadvantaged group be heard and both claims weighed with reasons; imagined villagers of the Sarna Hills and the Dhanvi Forest notice',
  'The Sarna Hills and Dhanvi Forest are imagined.',
);
const tPetition = table(
  ['Step', 'Imagined case: Harbour Lane petitions for water'],
  [
    ['1. The claim', 'Four hundred families are citizens who vote and pay taxes on what they buy but lack piped water'],
    ['2. The principle', 'Equal citizenship includes a fair claim to basic services'],
    ['3. The other side', 'The planning member points to reserved land and limited funds'],
    ['4. The test', 'Is the same rule being applied in a way that leaves one group behind?'],
    ['5. A fair answer', 'A hearing, common taps now, a plan later, and written reasons'],
  ],
  'Worked example table on the imagined Harbour Lane petition: four hundred families who vote and pay taxes lack piped water; equal citizenship includes a fair claim to basic services; the planning member points to reserved land and limited funds; the test is whether the same rule leaves one group behind; a fair answer is a hearing, common taps now, a plan later and written reasons',
  'The petition, the settlement and the Corporation are imagined.',
);
const tNation = table(
  ['Point', 'Citizen and nation'],
  [
    ['Who decides', 'Each nation-state sets criteria for citizenship by its own law'],
    ['India', 'Part II of the Constitution and the Citizenship Act 1955 provide for citizenship, as provided in the Act, which has been amended over time'],
    ['General modes', 'Birth, descent, registration, naturalisation and incorporation of territory'],
    ['Single citizenship', 'There is one citizenship for the whole country and none separate for each state'],
    ['The principle', 'As the Constitution intends, citizenship is equal for all, without distinction of religion, caste or gender'],
  ],
  'Table on citizen and nation: each nation-state sets criteria by its own law; in India Part II of the Constitution and the Citizenship Act 1955, amended over time, provide for citizenship; the general modes are birth, descent, registration, naturalisation and incorporation of territory; there is one citizenship for the whole country; citizenship is equal for all without distinction of religion, caste or gender',
);
const tModesEx = table(
  ['Imagined person in Torvania', 'Mode', 'Reason'],
  [
    ['Ravi, born in Torvania', 'Birth', 'Born within the territory, as the law provides'],
    ['Nina, born abroad to a Torvanian mother', 'Descent', 'Citizenship passes through a citizen parent'],
    ['Selvi, born elsewhere, lived in Torvania for years', 'Naturalisation', 'She met the conditions in the law'],
    ['Omar, living in Brennick when it joined Torvania', 'Incorporation of territory', 'The treaty law made residents citizens'],
  ],
  'Worked example table of imagined people in Torvania: Ravi, born in Torvania, citizen by birth; Nina, born abroad to a Torvanian mother, by descent; Selvi, born elsewhere and living in Torvania for years, by naturalisation; Omar, living in Brennick when it joined Torvania, by incorporation of territory',
  'Torvania, Brennick and the people are imagined.',
);
const tPlan1 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: equal citizenship in practice'],
  [
    ['1. Define citizenship', 'Full and equal membership of a political community'],
    ['2. Moving and working', 'Freedom to live and work anywhere; both views on arrivals'],
    ['3. The urban poor', 'A fair claim to housing and services, weighed with the city plan'],
    ['4. Forest dwellers', 'Livelihood heard and weighed with protection of the forest'],
    ['5. The thread', 'The same rule may fall unequally, so attend to disadvantaged groups'],
  ],
  'Worked example table planning a five mark answer on equal citizenship in practice: define citizenship, moving and working, the urban poor, forest dwellers and the common thread of attention to disadvantaged groups',
  'A plan, to be written in your own words.',
);
const tSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Citizenship', 'Full and equal membership of a political community, usually a nation-state'],
    ['Marshall', 'Civil, political and social rights, in Citizenship and Social Class, 1950'],
    ['Obligations', 'Obey the laws, pay taxes, respect the rights of others'],
    ['Struggles', 'French Revolution 1789; apartheid ended early 1990s, election 1994; women and Dalits in India'],
    ['Equal rights in practice', 'Moving and working; the urban poor; forest dwellers; attention to the disadvantaged'],
    ['Citizen and nation', 'States set criteria; five general modes; single citizenship; equality for all'],
  ],
  'Summary table of Part 1: citizenship, Marshall, obligations, struggles, equal rights in practice, and citizen and nation',
);
const tTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Saying citizenship means only the right to vote', 'Name civil, political and social rights and the obligations'],
    ['Mixing up the three kinds of rights', 'Civil protects freedom, political gives a share in power, social gives welfare'],
    ['Taking a side on migrants from other states', 'Give both views with reasons and keep every citizen\'s right in view'],
    ['Listing modes without saying they are as provided in the Act', 'Add that the Act has been amended over time'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables: Part 2
const tUniversal = table(
  ['Point', 'Universal citizenship'],
  [
    ['The ideal', 'Every person should be a citizen of some state and have full rights there'],
    ['A supporting statement', 'The Universal Declaration of Human Rights (1948) says that everyone has the right to a nationality'],
    ['The obstacle', 'Some people are refugees or stateless and lack the protection that citizenship gives'],
    ['Imagined case', 'The Marlen family, born in Ostrell, is recognised by no state'],
  ],
  'Table on universal citizenship: the ideal is that every person is a citizen of some state with full rights; the Universal Declaration of Human Rights of 1948 says everyone has the right to a nationality; the obstacle is that refugees and stateless persons lack the protection of citizenship; the imagined Marlen family, born in Ostrell, is recognised by no state',
  'Ostrell and the Marlen family are imagined.',
);
const tRefStateless = table(
  ['Term', 'Standard meaning', 'Difference'],
  [
    ['Refugee', 'A person forced to leave his or her country by persecution, war or violence and unable to return safely', 'May still hold the citizenship of the home country'],
    ['Stateless person', 'A person whom no state considers a citizen', 'May never have left the country of birth'],
    ['Citizen', 'A full and equal member of a political community', 'Has rights and obligations in that state'],
  ],
  'Table comparing refugee, stateless person and citizen: a refugee is forced to leave a country by persecution, war or violence and may still hold its citizenship; a stateless person is considered a citizen by no state and may never have left the country of birth; a citizen is a full and equal member with rights and obligations',
);
const tUN = table(
  ['Body or text', 'What it does or says'],
  [
    ['UNHCR, the United Nations High Commissioner for Refugees', 'The United Nations refugee agency, created in 1950, which works to protect refugees'],
    ['Universal Declaration of Human Rights, 1948', 'Says that everyone has the right to a nationality'],
    ['Imagined use', 'A UNHCR worker meets the Marlen family and asks that they receive protection'],
  ],
  'Table on the United Nations refugee agency and the Declaration: UNHCR, created in 1950, works to protect refugees; the Universal Declaration of Human Rights of 1948 says everyone has the right to a nationality; imagined, a UNHCR worker meets the Marlen family and asks that they receive protection',
  'The meeting with the Marlen family is imagined.',
);
const tStates = table(
  ['Consideration', 'Some argue', 'Others argue'],
  [
    ['Duty', 'A state has a humanitarian duty to shelter people in danger', 'A state\'s first duty is to its own citizens'],
    ['Resources', 'Wealthier states can share housing and services', 'Housing and public services have limits'],
    ['Security', 'Checks can be made while giving shelter', 'Arrivals need careful security checks first'],
  ],
  'Table of views on the choices states face: some argue a state has a humanitarian duty to shelter people in danger, others that its first duty is to its own citizens; some argue wealthier states can share housing and services, others that these have limits; some argue checks can be made while giving shelter, others that arrivals need careful security checks first',
  'Both views are given; students weigh them with reasons.',
);
const tMarlen = table(
  ['Step', 'Imagined case: the Marlen family'],
  [
    ['1. The facts', 'Born in Ostrell, whose officials say the family was never registered; no other state recognises them'],
    ['2. The term', 'They are stateless, and have also left a conflict, so are in the position of refugees'],
    ['3. The loss', 'No school admission, no bank account, no travel document'],
    ['4. The ideal', 'Universal citizenship asks that everyone be a citizen somewhere'],
    ['5. The state\'s choice', 'Torvania weighs duty to shelter against limits and security, and gives reasons'],
  ],
  'Worked example table on the imagined Marlen family: born in Ostrell and recognised by no state; stateless and having left a conflict; no school admission, bank account or travel document; universal citizenship asks that everyone be a citizen somewhere; Torvania weighs its duty to shelter against limits and security and gives reasons',
  'The Marlen family, Ostrell and Torvania are imagined.',
);
const tGlobal = table(
  ['Point', 'Global citizenship'],
  [
    ['The idea', 'We belong to a world community and have responsibilities toward humanity'],
    ['Examples of concern', 'The environment, human rights and disaster relief'],
    ['What it is not', 'It is not citizenship of a world state, for none issues citizenship'],
    ['Imagined case', 'Students at the Lumen Global Youth Forum plant trees and raise a flood relief fund'],
  ],
  'Table on global citizenship: the idea that we belong to a world community with responsibilities toward humanity; concern for the environment, human rights and disaster relief; it is not citizenship of a world state; imagined students at the Lumen Global Youth Forum plant trees and raise a flood relief fund',
  'The Lumen Forum is imagined.',
);
const tInternet = table(
  ['Point', 'The internet and communication'],
  [
    ['What they do', 'Let people in different countries learn of shared concerns, discuss them and act together'],
    ['Result', 'Global citizenship becomes easier to practise'],
    ['Imagined case', 'Students from six countries share a page on saving water and send relief funds'],
  ],
  'Table on the internet and communication: they let people in different countries learn of shared concerns, discuss them and act together, making global citizenship easier to practise; imagined students from six countries share a page on saving water and send relief funds',
  'The students and the page are imagined.',
);
const tViews = table(
  ['View', 'Reasons'],
  [
    ['Global citizenship complements national citizenship', 'A person can take part in a nation and also care for humanity on environment, rights and relief'],
    ['National citizenship remains the main source of rights', 'States have the laws, courts and officials that enforce rights and give protection'],
    ['The student\'s task', 'Present both with reasons, then judge'],
  ],
  'Table of views: some argue global citizenship complements national citizenship because a person can take part in a nation and also care for humanity; others argue national citizenship remains the main source of rights because states have the laws, courts and officials that enforce rights; the student presents both with reasons and then judges',
);
const tForumEx = table(
  ['Speaker at the imagined forum', 'Point made', 'Kind of point'],
  [
    ['Aisha', 'Students record water saving and send flood relief', 'Responsibility of global citizenship'],
    ['Pedro', 'Problems cross borders, so think of ourselves as citizens of the world', 'Argument for global citizenship'],
    ['Mei', 'When rights are in danger, my own state\'s courts are where I turn', 'Argument for national citizenship'],
    ['Aisha again', 'Perhaps both can be true together', 'Complement view'],
  ],
  'Worked example table of an imagined forum discussion: Aisha, students record water saving and send flood relief, a responsibility of global citizenship; Pedro, problems cross borders, an argument for global citizenship; Mei, her own state courts are where she turns when rights are in danger, an argument for national citizenship; Aisha again, perhaps both can be true, the complement view',
  'The forum and the speakers are imagined.',
);
const tTogether = table(
  ['Idea', 'Meaning', 'Link'],
  [
    ['National citizenship', 'Membership of a nation-state with rights and obligations', 'The main source of enforceable rights'],
    ['Universal citizenship', 'Everyone a citizen somewhere with full rights', 'Raises the problem of refugees and stateless persons'],
    ['Global citizenship', 'Belonging to a world community with responsibilities', 'May complement national citizenship'],
  ],
  'Table linking three ideas: national citizenship, membership of a nation-state, the main source of enforceable rights; universal citizenship, everyone a citizen somewhere, raising the problem of refugees and stateless persons; global citizenship, belonging to a world community, which may complement national citizenship',
);
const tPlan2 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: universal and global citizenship'],
  [
    ['1. The ideal', 'Everyone a citizen somewhere with full rights'],
    ['2. The problem', 'Refugees and stateless persons, with a short definition of each'],
    ['3. States and UNHCR', 'UNHCR protects refugees; states weigh duty against limits'],
    ['4. Global citizenship', 'A world community, with responsibilities and the role of the internet'],
    ['5. Both views', 'Complement, or national the main source; judge with reasons'],
  ],
  'Worked example table planning a five mark answer on universal and global citizenship: the ideal, the problem of refugees and stateless persons, states and UNHCR, global citizenship and both views',
  'A plan, to be written in your own words.',
);
const tSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Universal citizenship', 'Everyone a citizen somewhere with full rights'],
    ['Refugee', 'Forced to flee persecution, war or violence and cannot safely return'],
    ['Stateless person', 'Considered a citizen by no state'],
    ['UNHCR', 'The United Nations refugee agency, created in 1950'],
    ['States\' choices', 'Duty to shelter and limits and security, both views'],
    ['Global citizenship', 'A world community; environment, human rights, disaster relief; the internet helps'],
    ['The debate', 'Complement, or national citizenship the main source of rights'],
  ],
  'Summary table of Part 2: universal citizenship, refugee, stateless person, UNHCR, the choices of states, global citizenship and the debate on how it relates to national citizenship',
);
const tTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Using refugee and stateless as the same word', 'Define each and note that they can differ'],
    ['Saying global citizenship means a world state', 'It is an idea of belonging and responsibility'],
    ['Backing one side on states and arrivals', 'Give both views with reasons, then judge'],
    ['Leaving out the internet', 'Say that communication makes global action easier'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Citizenship, Part 1: Full and Equal Membership',
  goals: [
    'State the standard definition of citizenship and name its rights and obligations',
    'Describe Marshall\'s civil, political and social rights',
    'Describe struggles for equal citizenship in general terms',
    'Explain how equal citizenship in practice needs attention to disadvantaged groups',
    'Explain how nation-states set criteria and the general modes of acquiring citizenship in India',
  ],
  slides: [
    sl('title', 'Citizenship: Full and Equal Membership', {
      b: 'Part 1: **rights**, **obligations**, **struggles** and **equal rights in practice**.',
      v: flow('LR', ['What citizenship is', 'Three kinds of rights', 'Struggles', 'Equal rights in practice', 'Citizen and nation'], 'Route map of Part 1: what citizenship is, three kinds of rights, struggles, equal rights in practice, and citizen and nation', 'Part 1 at a glance'),
      n: 'Who belongs to a political community, and on what terms? In this part we define citizenship, look at the rights and obligations it carries, see how people have struggled for equal citizenship, and ask what equality means in practice for different groups.',
    }),
    sl('concept', 'What citizenship means', {
      v: tCit,
      n: 'Citizenship is full and equal membership of a political community, usually a nation state. It carries rights and obligations. It gives a person a recognised place, a claim to protection, and a share in public life. In imagined Kalvara, a mason named Dinesh who works there is a full member of the country and not a guest.',
    }),
    sl('check', 'Quick check: the definition', {
      b: 'Which statement gives the standard definition of citizenship?',
      chk: 'm_cit_def',
      n: 'Recall the standard definition of citizenship.',
    }),
    sl('diagram', 'Marshall\'s three kinds of rights', {
      v: vMarshall,
      n: 'This chart shows the scheme of T H Marshall, in his work Citizenship and Social Class of nineteen fifty. Civil rights protect individual freedom. Political rights give a share in power, such as voting. Social rights concern welfare and security, such as schooling and health care. Citizenship also carries obligations, such as obeying the laws and paying taxes.',
    }),
    sl('concept', 'Obligations of citizens', {
      v: tOblig,
      n: 'Rights come with obligations. A citizen should obey the laws, pay taxes, and respect the rights of others. These obligations matter because the community can protect everyone only if its members also do their part. An imagined shopkeeper in Kalvara keeps to the market rules, and a landlord does not refuse tenants on grounds of caste.',
    }),
    sl('check', 'Quick check: match rights and duties', {
      b: 'Match each kind of right or duty with an imagined situation.',
      chk: 'mt_marshall',
      n: 'Pair each kind of right or duty with a situation in Kalvara.',
    }),
    sl('example', 'Worked example 1: classify the situations in Kalvara', {
      b: 'Decide which kind of right or duty each imagined situation shows.',
      bl: ['Does it protect **freedom**, give a **share in power** or give **welfare**?', 'Or is it a **duty** that a citizen owes?'],
      v: tClassify,
      n: 'Let us classify four imagined situations in Kalvara. A tenant going to court is using a civil right. A resident who votes is using a political right. A family at the public clinic is using a social right. A trader who files her tax return is meeting an obligation.',
    }),
    sl('concept', 'Struggles for equal citizenship', {
      v: tStruggles,
      n: 'Equal citizenship was won through struggle. The French Revolution of seventeen eighty nine stressed that people are citizens with equal rights, not subjects ranked by birth. In South Africa the struggle against apartheid ended it in the early nineteen nineties, and the first democratic election was in nineteen ninety four. In India, movements of women and of Dalits demanded equal rights and dignity.',
    }),
    sl('diagram', 'Equal citizenship in practice', {
      v: vWeb,
      n: 'This web shows four areas where equal citizenship is tested in practice. Citizens may move and work anywhere. The urban poor ask for housing and services. Forest dwellers depend on the forest for their livelihood. Women and Dalits struggled for equal treatment. The common thread is that the same rule for all may fall unequally, so disadvantaged groups need attention.',
    }),
    sl('concept', 'Freedom to move and work', {
      v: tMove,
      n: 'A citizen may move freely, and live and work in any part of the country, subject to reasonable restrictions. India has a single citizenship, so a citizen of any state is a full member everywhere. Some argue that arrivals strain housing, jobs and services. Others argue that they are equal citizens who add to the economy. Claims should be tested with evidence.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about equal citizenship is true or false.',
      chk: 'tf_equal_all',
      n: 'Think about what full and equal membership means for every citizen.',
    }),
    sl('concept', 'The urban poor', {
      v: tSlum,
      n: 'Residents of crowded settlements are citizens, and have a fair claim to housing, water, drainage and schools. The difficulty is that land may be reserved under a city plan and funds are limited. A fair approach is to hear the residents, weigh their needs with the plan, and give reasons. Imagined Harbour Lane petitions the Kalvara Corporation for piped water.',
    }),
    sl('concept', 'Tribal people and forest dwellers', {
      v: tForest,
      n: 'The livelihood of tribal people and forest dwellers depends on gathering produce from the forest and on access to it. Protecting forests and rare trees is also a legitimate aim. Equal citizenship asks that a disadvantaged group be heard and both claims weighed with reasons. Imagined villagers of the Sarna Hills face a notice closing the Dhanvi Forest.',
    }),
    sl('example', 'Worked example 2: the Harbour Lane petition', {
      b: 'Apply equal citizenship to an imagined petition.',
      bl: ['State the **claim** and the **principle**', 'Weigh the **other side** and give a fair answer'],
      v: tPetition,
      n: 'Four hundred families of imagined Harbour Lane vote and pay taxes on what they buy, but lack piped water. Equal citizenship includes a fair claim to basic services. The planning member points to reserved land and limited funds. A fair answer is a hearing, common taps now, a plan later, and written reasons.',
    }),
    sl('concept', 'Citizen and nation', {
      v: tNation,
      n: 'Each nation state sets criteria for citizenship by its own law. In India, Part Two of the Constitution and the Citizenship Act of nineteen fifty five provide for citizenship, as provided in the Act, which has been amended over time. There is one citizenship for the whole country. As the Constitution intends, citizenship is equal for all, without distinction of religion, caste or gender.',
    }),
    sl('diagram', 'Modes of acquiring citizenship', {
      v: vModes,
      n: 'This flow shows the general modes of acquiring citizenship in India, as provided in the Act, which has been amended over time. They are birth, descent, registration, naturalisation, and incorporation of territory. Citizenship is equal for all without distinction of religion, caste or gender, and there is a single citizenship for the whole country.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence on citizenship.',
      chk: 'fb_citizenship',
      n: 'Recall the second word in the standard definition.',
    }),
    sl('example', 'Worked example 3: modes in imagined Torvania', {
      b: 'Name the mode by which each imagined person became a citizen.',
      bl: ['Was it **place of birth**, **parentage** or the **law**?', 'Was it an **application** or a **treaty**?'],
      v: tModesEx,
      n: 'In imagined Torvania, Ravi was born in the country, so his citizenship is by birth. Nina was born abroad to a Torvanian mother, so hers is by descent. Selvi met the conditions after years of residence, so hers is by naturalisation. Omar lived in a region joined to Torvania by a treaty, so his is by incorporation of territory.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: tSum1,
      n: 'To sum up. Citizenship is full and equal membership of a political community, usually a nation state. Marshall named civil, political and social rights, and citizens also have obligations. People struggled for equal citizenship in France, in South Africa and in India. Equal citizenship in practice needs attention to disadvantaged groups. States set criteria, and India has five general modes and a single citizenship.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define **citizenship** first', 'Name **three kinds** of rights, then **obligations**', 'Give **both views** on contested questions', 'Say the modes are **as provided in the Act**, amended over time'],
      v: tTips1,
      n: 'A few tips. Define citizenship before anything else. Name the three kinds of rights and then the obligations. On questions such as arrivals from other states, give both views with reasons. When you list the modes of acquiring citizenship, say that they are as provided in the Act, which has been amended over time. Use a short imagined example in each answer.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Citizenship, Part 2: Universal and Global Citizenship',
  goals: [
    'Explain the ideal of universal citizenship',
    'Define refugee and stateless person, and name the United Nations refugee agency',
    'Present the different views on the choices that states face',
    'Explain global citizenship and the role of the internet',
    'Present the views on whether global citizenship complements national citizenship',
  ],
  slides: [
    sl('title', 'Universal and Global Citizenship', {
      b: 'Part 2: **universal citizenship**, **refugees**, **stateless persons** and **global citizenship**.',
      v: flow('LR', ['Universal citizenship', 'Refugees and stateless persons', 'Choices for states', 'Global citizenship', 'Two views'], 'Route map of Part 2: universal citizenship, refugees and stateless persons, choices for states, global citizenship and two views', 'Part 2 at a glance'),
      n: 'In Part one we studied equal citizenship within a country. Now we ask a wider question. Should every person be a citizen somewhere, and what happens to those who are not? Then we ask whether we also belong to a world community, and how that relates to national citizenship.',
    }),
    sl('concept', 'Universal citizenship', {
      v: tUniversal,
      n: 'The ideal of universal citizenship is that every person should be a citizen of some state and have full rights there. The Universal Declaration of Human Rights of nineteen forty eight says that everyone has the right to a nationality. The obstacle is that some people are refugees or stateless, and lack the protection that citizenship gives.',
    }),
    sl('diagram', 'Refugee, stateless person and citizen', {
      v: tRefStateless,
      n: 'This table compares three terms. A refugee is forced to leave a country by persecution, war or violence and cannot safely return, and may still hold its citizenship. A stateless person is considered a citizen by no state, and may never have left the country of birth. A citizen is a full and equal member with rights and obligations.',
    }),
    sl('check', 'Quick check: the refugee', {
      b: 'Which statement best describes a refugee?',
      chk: 'm_refugee_def',
      n: 'Recall why a refugee leaves his or her country.',
    }),
    sl('concept', 'The United Nations and the right to a nationality', {
      v: tUN,
      n: 'The United Nations High Commissioner for Refugees, called UNHCR, is the United Nations refugee agency. It was created in nineteen fifty and works to protect refugees. The Universal Declaration of Human Rights says that everyone has the right to a nationality. In an imagined case, a worker of the agency asks that the Marlen family receive protection.',
    }),
    sl('concept', 'Difficult choices for states', {
      v: tStates,
      n: 'States face difficult choices when people ask to be admitted. Some argue that a state has a humanitarian duty to shelter people in danger. Others argue that its first duty is to its own citizens, and that housing and public services have limits. Some argue that checks can be made while giving shelter. Others argue that careful security checks come first. Students weigh the reasons.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about refugees and stateless persons is true or false.',
      chk: 'tf_refugee_stateless',
      n: 'Think about whether the two terms always mean the same thing.',
    }),
    sl('example', 'Worked example 1: the imagined Marlen family', {
      b: 'Apply the ideas of this part to an imagined stateless family.',
      bl: ['Name the **term** that fits', 'Say what the family **loses** and what the **ideal** asks'],
      v: tMarlen,
      n: 'The imagined Marlen family was born in Ostrell, whose officials say they were never registered, and no other state recognises them. They are stateless, and have also left a conflict. They cannot get school admission, a bank account or a travel document. Universal citizenship asks that everyone be a citizen somewhere. Torvania weighs its duty to shelter against limits and security, and gives reasons.',
    }),
    sl('concept', 'Global citizenship', {
      v: tGlobal,
      n: 'Global citizenship is the idea that we belong to a world community and have responsibilities toward humanity. Examples of concern are the environment, human rights and disaster relief. It is not citizenship of a world state, for no such state issues citizenship. Imagined students at the Lumen Global Youth Forum plant trees and raise a flood relief fund.',
    }),
    sl('concept', 'The internet and communication', {
      v: tInternet,
      n: 'The internet and modern communication let people in different countries learn of shared concerns, discuss them, and act together. This makes global citizenship easier to practise. In an imagined case, students from six countries share a page on saving water and send relief funds to a flooded region.',
    }),
    sl('check', 'Quick check: put in order', {
      b: 'Arrange the steps of an online campaign that becomes an act of global citizenship.',
      chk: 'ord_global_steps',
      n: 'Think about which step must come first and which last.',
    }),
    sl('diagram', 'National and global citizenship compared', {
      v: vCompare,
      n: 'This chart compares the two. National citizenship comes from the law of a state, and its rights are enforced by the courts and officials of that state. Global citizenship is an idea of belonging to a world community, with responsibilities to humanity. Views differ. Some argue that the two complement each other. Others argue that national citizenship remains the main source of rights.',
    }),
    sl('concept', 'Two views on how they relate', {
      v: tViews,
      n: 'Some argue that global citizenship complements national citizenship, since a person can take part in a nation and also care for humanity. Others argue that national citizenship remains the main source of rights and protection, since states have the laws, courts and officials that enforce rights. A student should present both with reasons, then judge.',
    }),
    sl('example', 'Worked example 2: an imagined forum discussion', {
      b: 'Sort the points made at an imagined discussion.',
      bl: ['Which point is a **responsibility** of global citizenship?', 'Which argues for **national** and which for **global** citizenship?'],
      v: tForumEx,
      n: 'At the imagined Lumen Forum, Aisha describes water saving and flood relief, which are responsibilities of global citizenship. Pedro argues that problems cross borders, so we should think of ourselves as world citizens. Mei says her own state courts are where she turns when her rights are in danger. Aisha then suggests that both can be true together.',
    }),
    sl('concept', 'Putting the three ideas together', {
      v: tTogether,
      n: 'National citizenship is membership of a nation state, and is the main source of enforceable rights. Universal citizenship asks that everyone be a citizen somewhere, and raises the problem of refugees and stateless persons. Global citizenship is belonging to a world community with responsibilities, and may complement national citizenship.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence on statelessness.',
      chk: 'fb_stateless',
      n: 'Recall the word for a person whom no state considers a citizen.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on universal and global citizenship.',
      bl: ['Start with the **ideal** and the **problem**', 'End with **both views**, then **judge**'],
      v: tPlan2,
      n: 'To plan a five mark answer, begin with the ideal that everyone be a citizen somewhere. Then define refugee and stateless person, and name the refugee agency. Turn to global citizenship and the role of the internet. End with both views on how it relates to national citizenship, and a reasoned judgement. Write it in your own words.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: tSum2,
      n: 'To sum up. Universal citizenship is the ideal that everyone is a citizen somewhere with full rights. A refugee flees danger, and a stateless person is considered a citizen by no state. The United Nations refugee agency works to protect refugees, and states face difficult choices, with views on both sides. Global citizenship is belonging to a world community, helped by the internet, and views differ on how it relates to national citizenship.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define **refugee** and **stateless** separately', 'Name the **United Nations refugee agency**', 'Give **both views** on states and on global citizenship', 'Mention the **internet** and **responsibilities**'],
      v: tTips2,
      n: 'A few tips. Define refugee and stateless person separately, and note that they can differ. Name the United Nations refugee agency. When you write about the choices of states, or about global and national citizenship, give both views with reasons before you judge. Mention the internet, and the responsibilities of global citizenship, such as the environment and disaster relief.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Citizenship: Notes',
  sections: [
    {
      h: '1. What citizenship means',
      t: 1,
      b: '**Citizenship** is full and **equal membership** of a political community, usually a nation-state. It carries **rights** and **obligations**. Obligations include obeying the laws, paying taxes and respecting the rights of others.',
      terms: [
        ['Citizenship', 'Full and equal membership of a political community, usually a nation-state.'],
        ['Nation-state', 'A political community organised as a state, whose members are its citizens.'],
        ['Obligation', 'A duty that a citizen owes to the community, such as obeying the laws and paying taxes.'],
      ],
      v: tCit,
      vs: [tOblig],
    },
    {
      h: '2. Marshall\'s three kinds of rights',
      t: 1,
      b: '**T. H. Marshall** (*Citizenship and Social Class*, 1950) divided citizenship rights into three kinds.\n\n- **Civil rights**: individual freedom, such as speech, thought, faith, property and a fair hearing in court.\n- **Political rights**: a share in power, such as voting and standing for office.\n- **Social rights**: welfare and security, such as schooling and health care.',
      terms: [
        ['Civil rights', 'Rights that protect individual freedom, such as speech, property and a fair hearing in court.'],
        ['Political rights', 'Rights that give a share in power, such as voting and standing for office.'],
        ['Social rights', 'Rights concerning welfare and security, such as schooling and health care.'],
      ],
      v: vMarshall,
      vs: [tClassify],
    },
    {
      h: '3. Struggles for equal citizenship',
      t: 1,
      b: 'Equal citizenship was won through **struggle**. The **French Revolution** (1789) stressed that people are citizens with equal rights. The struggle against **apartheid** in South Africa, a system of racial discrimination, ended it in the early 1990s, and the first democratic election was held in **1994**. In India, **women\'s movements** and movements of **Dalits** demanded equal rights, an end to untouchability and dignity.',
      terms: [
        ['Apartheid', 'A system of racial discrimination in South Africa that denied equal citizenship to most people; it ended in the early 1990s.'],
        ['Equal citizenship', 'The principle that every citizen is a full member of the political community, whatever his or her group.'],
      ],
      v: tStruggles,
    },
    {
      h: '4. Equal rights in practice',
      t: 1,
      b: 'A citizen may **move freely and live and work** in any part of the country (Article 19), subject to reasonable restrictions. Some argue that arrivals strain housing, jobs and services, and others that they are equal citizens who add to the economy; claims should be tested with evidence.\n\nThe **urban poor** have a fair claim to housing, water and schools, weighed with the city plan. **Tribal people and forest dwellers** depend on the forest for livelihood, which must be weighed with protecting it.\n\nThe common thread: the same rule for all may fall unequally, so equal citizenship needs **attention to disadvantaged groups**.',
      terms: [
        ['Single citizenship', 'One citizenship for the whole country, with none separate for each state, as in India.'],
        ['Disadvantaged group', 'A group whose circumstances make it harder to use its rights equally with others.'],
      ],
      v: vWeb,
      vs: [tMove, tSlum, tForest, tPetition, tPlan1],
    },
    {
      h: '5. Citizen and nation',
      t: 1,
      b: 'Each **nation-state** sets criteria for citizenship by its own law. In India, **Part II** of the Constitution and the **Citizenship Act 1955** provide for citizenship, as provided in the Act, which has been amended over time. The general modes are **birth**, **descent**, **registration**, **naturalisation** and **incorporation of territory**.\n\nAs the Constitution intends, India gives citizenship **equally to all**, without distinction of religion, caste or gender.',
      terms: [
        ['Citizenship by descent', 'Citizenship that passes to a person born abroad through a parent who is a citizen.'],
        ['Naturalisation', 'The grant of citizenship to a foreigner who meets the conditions laid down in law.'],
        ['Incorporation of territory', 'Acquisition of citizenship by the residents of territory that is added to a state.'],
      ],
      v: vModes,
      vs: [tNation, tModesEx],
    },
    {
      h: '6. Universal citizenship',
      t: 2,
      b: 'The ideal of **universal citizenship** is that every person should be a citizen of some state, with full rights. The **Universal Declaration of Human Rights** (1948) says that everyone has the right to a nationality.\n\nA **refugee** is forced to leave a country by persecution, war or violence. A **stateless person** is considered a citizen by no state. **UNHCR**, the United Nations refugee agency (created 1950), works to protect refugees.\n\nStates face difficult choices. Some argue that a state has a **humanitarian duty** to shelter people in danger; others stress **limits** on housing and services and the need for **security checks**.',
      terms: [
        ['Universal citizenship', 'The ideal that every person should be a citizen of some state and have full rights there.'],
        ['Refugee', 'A person forced to leave his or her country by persecution, war or violence and unable to return safely.'],
        ['Stateless person', 'A person whom no state considers a citizen.'],
        ['UNHCR', 'The United Nations High Commissioner for Refugees, the United Nations refugee agency.'],
      ],
      v: tRefStateless,
      vs: [tUniversal, tUN, tStates, tMarlen],
    },
    {
      h: '7. Global citizenship',
      t: 2,
      b: '**Global citizenship** is the idea that we belong to a **world community** and have responsibilities toward humanity: the environment, human rights and disaster relief. It is easier to practise because of the **internet** and communication.\n\nSome argue that it can **complement** national citizenship. Others argue that **national citizenship** remains the main source of rights and protection, since states enforce rights. Students present both views with reasons and then judge.',
      terms: [
        ['Global citizenship', 'The idea that we belong to a world community and have responsibilities toward humanity.'],
      ],
      v: vCompare,
      vs: [tGlobal, tInternet, tViews, tForumEx, tTogether, tPlan2],
    },
  ],
  tips: '**Common mistakes**\n- Saying citizenship means only the right to vote: name civil, political and social rights and the obligations.\n- Mixing up the three kinds of rights: civil protects freedom, political gives a share in power, social gives welfare.\n- Taking a side on arrivals from other states: give both views with reasons and keep every citizen\'s right in view.\n- Listing the modes without saying they are as provided in the Act, amended over time.\n- Using refugee and stateless as the same word: define each.\n- Saying global citizenship means a world state: it is an idea of belonging and responsibility.\n- Leaving out the internet, or backing one side in the debate on how global and national citizenship relate.\n\n**Tips:** begin with the standard definition; give a short imagined example; present both views, then judge with reasons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is **citizenship**?', 'Full and equal membership of a political community, usually a nation-state.', 'definition'],
  ['What does citizenship carry?', 'Rights (civil, political and social) and obligations.', 'concept'],
  ['Give two **obligations** of a citizen', 'Obey the laws and pay taxes; respect the rights of others.', 'fact'],
  ['Who wrote **Citizenship and Social Class**, and when?', 'T. H. Marshall, in 1950.', 'fact'],
  ['Name Marshall\'s **three kinds** of rights', 'Civil, political and social rights.', 'fact'],
  ['What are **civil rights**?', 'Rights that protect individual freedom, such as speech, property and a fair hearing in court.', 'definition'],
  ['What are **political rights**?', 'Rights that give a share in power, such as voting and standing for office.', 'definition'],
  ['What are **social rights**?', 'Rights concerning welfare and security, such as schooling and health care.', 'definition'],
  ['What did the **French Revolution** of 1789 stress?', 'That people are citizens with equal rights, not subjects ranked by birth.', 'concept'],
  ['What was **apartheid**?', 'A system of racial discrimination in South Africa that denied equal citizenship to most people.', 'definition'],
  ['When did apartheid end, and when was the first democratic election?', 'Apartheid ended in the early 1990s; the first democratic election was in 1994.', 'fact'],
  ['Which movements in India struggled for equal citizenship?', 'Women\'s movements and movements of Dalits.', 'fact'],
  ['What freedom lets a citizen live and work in another state?', 'The freedom to move freely and to live and work in any part of the country (Article 19), subject to reasonable restrictions.', 'concept'],
  ['What is **single citizenship**?', 'One citizenship for the whole country, with none separate for each state, as in India.', 'definition'],
  ['What two views exist on **arrivals** from other states?', 'Some argue they strain housing, jobs and services; others argue they are equal citizens who add to the economy.', 'concept'],
  ['What claim do the **urban poor** make as citizens?', 'A fair claim to housing, water, drainage and schools.', 'concept'],
  ['What must be weighed in the case of **forest dwellers**?', 'Their livelihood from the forest and the aim of protecting the forest.', 'concept'],
  ['Why does equal citizenship need **attention to disadvantaged groups**?', 'The same rule for all may fall unequally on people who start from different positions.', 'concept'],
  ['Who sets the **criteria** for citizenship?', 'Each nation-state, by its own law.', 'concept'],
  ['Which parts of law provide for citizenship in India?', 'Part II of the Constitution and the Citizenship Act 1955, as amended over time.', 'fact'],
  ['Name the general **modes** of acquiring citizenship in India', 'Birth, descent, registration, naturalisation and incorporation of territory.', 'fact'],
  ['What is citizenship by **descent**?', 'Citizenship passing to a person born abroad through a parent who is a citizen.', 'definition'],
  ['What is **naturalisation**?', 'The grant of citizenship to a foreigner who meets the conditions laid down in law.', 'definition'],
  ['What is **incorporation of territory**?', 'Acquisition of citizenship by residents of territory that is added to a state.', 'definition'],
  ['How does India give citizenship, as the Constitution intends?', 'Equally to all, without distinction of religion, caste or gender.', 'concept'],
  ['What is **universal citizenship**?', 'The ideal that every person should be a citizen of some state, with full rights.', 'definition'],
  ['What does the **Universal Declaration of Human Rights** (1948) say on nationality?', 'That everyone has the right to a nationality.', 'fact'],
  ['What is a **refugee**?', 'A person forced to leave his or her country by persecution, war or violence and unable to return safely.', 'definition'],
  ['What is a **stateless person**?', 'A person whom no state considers a citizen.', 'definition'],
  ['What is **UNHCR**?', 'The United Nations High Commissioner for Refugees, the United Nations refugee agency, which works to protect refugees.', 'definition'],
  ['What views exist on the choices that states face?', 'Some stress a humanitarian duty to shelter people in danger; others stress limits on housing and services and security checks.', 'concept'],
  ['What is **global citizenship**?', 'The idea that we belong to a world community and have responsibilities toward humanity.', 'definition'],
  ['What helps global citizenship in practice?', 'The internet and modern communication.', 'concept'],
  ['What two views exist on global and national citizenship?', 'Global citizenship can complement national citizenship; or national citizenship remains the main source of rights and protection.', 'concept'],
].map(([a, b, c]) => [a, b, c, 1]));

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Citizenship',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_civil_app', 'm_stateless_app', 'm_global_app', 'ar_equal_attention'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_cit_def', 's_refugee_unhcr', 's3_disadv'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_marshall', 'l_universal'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_petition'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Citizenship',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_political_app', 'm_social_app', 'm_modes_descent', 'm_forest_app', 'm_migr_neutral', 'm_states_views', 'm_both_views', 'm_enforce', 'ar_nation', 'ar_stateless'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_marshall', 's_migrant_app', { attempt: 1, keys: ['s_stateless', 's_global_internet'] }, 's3_modes', { attempt: 1, keys: ['s3_states_choice', 's3_global_views'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_nation_modes', { attempt: 1, keys: ['l_equal_practice', 'l_global'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_worker', 'c_forum'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch16 only (full and equal membership, rights and obligations, equal rights in practice, citizen and nation; universal citizenship, refugees and stateless persons, global citizenship)',
    originality: 'every scenario, city, settlement, forest, country, family, forum, petition, letter, table and report is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no quotation of any thinker, no board item reused (D-036)',
    facts: 'stable facts only: T. H. Marshall, Citizenship and Social Class, 1950 (name, title and idea paraphrased); French Revolution 1789; apartheid ended in the early 1990s, first democratic election 1994; Part II of the Constitution and the Citizenship Act 1955 (as amended over time); Article 19 freedom to move and reside; Universal Declaration of Human Rights 1948 on nationality; UNHCR created 1950',
    neutrality: 'no map; no current citizenship law, register or migration dispute named; no real group of migrants or refugees; arrivals from other states, states\' choices on admission and global versus national citizenship presented as some argue, others argue, in imagined cases',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
