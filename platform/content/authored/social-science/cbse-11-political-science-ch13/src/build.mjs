// Build CBSE 11 Political Science ch13 Equality. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch13/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch13', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vDims = (() => {
  const s = new Svg(760, 420);
  const col = (x, name, c, lines) => {
    s.rect(x, 10, 240, 250, { color: c, sw: 2.5 });
    s.text(x + 120, 38, name, { bold: true, size: 18, color: c });
    lines.forEach((ln, j) => s.text(x + 120, 80 + j * 32, ln, { size: 14, bold: j === 0 }));
  };
  col(10, 'Political equality', 'blue', ['Equal citizenship', 'Equal voting rights', 'Equal civil rights', 'Imagined: in Veldmoor every', 'adult has one equal vote']);
  col(260, 'Social equality', 'green', ['Equal opportunities', 'Access to education', 'and health care', 'Imagined: every child in', 'Lindor may use the school']);
  col(510, 'Economic equality', 'brown', ['Smaller gaps in wealth', 'and income', 'A fairer share of resources', 'Imagined: Quillby shares', 'farmland more widely']);
  s.rect(10, 280, 740, 130, { color: 'accent', sw: 2.5 });
  s.text(380, 312, 'The dimensions support one another', { bold: true, size: 16, color: 'accent' });
  s.text(380, 348, 'An equal vote means little to a person kept from school and work', { size: 14 });
  s.text(380, 378, 'Narrowing economic gaps can widen social and political equality', { size: 14 });
  return s.visual('Chart of the three dimensions of equality. Political equality: equal citizenship, equal voting rights and equal civil rights; imagined example, in Veldmoor every adult has one equal vote. Social equality: equal opportunities, access to education and health care; imagined example, every child in Lindor may use the school. Economic equality: smaller gaps in wealth and income and a fairer share of resources; imagined example, Quillby shares farmland more widely. The dimensions support one another: an equal vote means little to a person kept from school and work, and narrowing economic gaps can widen social and political equality', 'The three dimensions of equality.');
})();

const vNatSoc = (() => {
  const s = new Svg(760, 400);
  const box = (x, name, c, lines) => {
    s.rect(x, 10, 360, 250, { color: c, sw: 2.5 });
    s.text(x + 180, 40, name, { bold: true, size: 19, color: c });
    lines.forEach((ln, j) => s.text(x + 180, 85 + j * 32, ln, { size: 14, bold: j === 0 }));
  };
  box(10, 'Natural inequalities', 'green', ['Differences of talent and ability', 'Not made by social arrangements', 'Imagined: Tara sings better than', 'her brother, who is quicker at chess', 'Not a ground for unequal rights']);
  box(390, 'Socially produced inequalities', 'red', ['Made by social arrangements', 'Caste, class, gender discrimination', 'Imagined: custom keeps girls of', 'one hamlet out of school', 'Can be changed by society']);
  s.rect(10, 290, 740, 100, { color: 'accent', sw: 2.5 });
  s.text(380, 320, 'A test to apply', { bold: true, size: 16, color: 'accent' });
  s.text(380, 350, 'Ask: could society have arranged things differently?', { size: 14 });
  s.text(380, 374, 'If yes, the inequality is socially produced; if no, it is natural', { size: 14 });
  return s.visual('Comparison chart of natural and socially produced inequalities. Natural inequalities are differences of talent and ability, not made by social arrangements; imagined example, Tara sings better than her brother, who is quicker at chess; they are not a ground for unequal rights. Socially produced inequalities are made by social arrangements such as caste, class and gender discrimination; imagined example, a custom keeps girls of one hamlet out of school; they can be changed by society. A test to apply: ask whether society could have arranged things differently; if yes, the inequality is socially produced, and if no, it is natural', 'Natural and socially produced inequalities compared.');
})();

const vPersp = (() => {
  const s = new Svg(760, 440);
  const box = (x, y, name, c, lines) => {
    s.rect(x, y, 360, 170, { color: c, sw: 2.5 });
    s.text(x + 180, y + 30, name, { bold: true, size: 18, color: c });
    lines.forEach((ln, j) => s.text(x + 180, y + 68 + j * 30, ln, { size: 14 }));
  };
  box(10, 10, 'Ram Manohar Lohia', 'brown', ['Several kinds of inequality: men and', 'women, skin colour, caste, colonial', 'rule over peoples, and economic']);
  box(390, 10, 'Marxism', 'red', ['Inequality is rooted in the private', 'ownership of resources', 'Looks to how resources are owned']);
  box(10, 190, 'Liberalism', 'blue', ['Competition is fair if opportunities', 'are equal for all competitors', 'Wary of concentrated power']);
  box(390, 190, 'Feminism', 'green', ['Equal rights for women and men', 'Challenges patriarchy, the system of', 'male dominance in family and society']);
  s.rect(10, 375, 740, 55, { color: 'accent', sw: 2.5 });
  s.text(380, 403, 'Each view gives its own account of where inequality comes from', { size: 14, bold: true });
  return s.visual('Chart of four perspectives on equality. Ram Manohar Lohia spoke of several kinds of inequality: between men and women, by skin colour, by caste, colonial rule over peoples, and economic inequality. Marxism sees inequality as rooted in the private ownership of resources. Liberalism accepts competition as fair if opportunities are equal and is wary of concentrated power. Feminism works for equal rights for women and men and challenges patriarchy, the system of male dominance in family and society. Each view gives its own account of where inequality comes from', 'Four perspectives on equality.');
})();

const vLadder = (() => {
  const s = new Svg(760, 420);
  s.text(380, 28, 'Ladder of ways to promote equality', { bold: true, size: 18 });
  s.text(380, 58, 'Each step reaches further than the one before', { size: 14 });
  const step = (x, y, h, c, lines) => {
    s.rect(x, y, 240, h, { color: c, sw: 2.5 });
    lines.forEach((ln, j) => s.text(x + 120, y + 26 + j * 26, ln, { size: j === 1 ? 16 : 14, bold: j <= 1, color: j <= 1 ? c : undefined }));
  };
  step(10, 280, 130, 'blue', ['Step 1', 'Formal equality', 'Remove legal privilege', 'and discrimination', 'Articles 14, 15 and 17']);
  step(260, 190, 220, 'green', ['Step 2', 'Differential treatment', 'Special arrangements', 'for equal access', 'Ramps, maternity benefit', 'Imagined: a ramp at the', 'Ostrel hospital door']);
  step(510, 100, 310, 'brown', ['Step 3', 'Affirmative action', 'Policies to remedy', 'historical disadvantage', 'Reservations in education', 'and public jobs', 'Articles 15(4) and 16(4)']);
  return s.visual('Ladder of ways to promote equality in three steps, each reaching further than the one before. Step 1, formal equality: remove legal privilege and discrimination, as in Articles 14, 15 and 17. Step 2, differential treatment: special arrangements for equal access, such as ramps and maternity benefit; imagined example, a ramp at the door of the Ostrel hospital. Step 3, affirmative action: policies to remedy historical disadvantage, such as reservations in education and public jobs under Articles 15(4) and 16(4)', 'A ladder of three ways to promote equality.');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vWhy = table(
  ['Point', 'Why equality matters'],
  [
    ['A moral and political ideal', 'Equality is a powerful ideal: it holds that every person has the same worth'],
    ['The French Revolution (1789)', 'Its slogan joined liberty, equality and fraternity'],
    ['Struggles against rule and discrimination', 'Anti-colonial movements and movements against discrimination appealed to equality'],
    ['A document named', 'The Universal Declaration of Human Rights (1948) is one international statement of equal worth and rights'],
  ],
  'Table on why equality matters: it is a powerful moral and political ideal; the French Revolution of 1789 joined liberty, equality and fraternity; anti-colonial movements and movements against discrimination appealed to equality; the Universal Declaration of Human Rights of 1948 is one international statement of equal worth and rights',
);
const vMeans = table(
  ['Part of the idea', 'Meaning', 'Imagined example'],
  [
    ['Equal respect', 'Every person counts as worthy of respect and consideration', 'Every visitor to the Ostrel library is greeted alike'],
    ['Equal rights and opportunities', 'No person is shut out of rights or chances to develop because of birth or status', 'Any child in Lindor may sit the school entrance test'],
    ['Not identical treatment', 'Treatment may differ where a relevant ground such as need or work done justifies it', 'A clinic charges nothing to those who cannot pay'],
    ['The standard definition', 'All persons deserve equal respect and consideration, equal rights, and equal opportunities to develop themselves', 'See the three examples above'],
  ],
  'Table on the meaning of equality: equal respect, with the example of every visitor to the imagined Ostrel library greeted alike; equal rights and opportunities, with the example of any child in imagined Lindor sitting the entrance test; not identical treatment, since a relevant ground such as need or work can justify a difference, as when a clinic charges nothing to those who cannot pay; and the standard definition that all persons deserve equal respect and consideration, equal rights, and equal opportunities to develop themselves',
  'Ostrel, Lindor and the clinic are imagined.',
);
const vJust = table(
  ['Kind of difference', 'Ground', 'Imagined example in Quillby'],
  [
    ['Justified', 'Need', 'A free lunch for children whose families cannot pay'],
    ['Justified', 'Work done', 'A harvest bonus for those who worked extra hours'],
    ['Unjust', 'Birth or status', 'A rule that seats children of one caste at the back of the hall'],
    ['Unjust', 'Sex alone', 'Lower pay for women doing the same work as men'],
  ],
  'Table of justified and unjust differences in treatment: justified on the ground of need, as with a free lunch for children whose families cannot pay; justified on the ground of work done, as with a harvest bonus for extra hours; unjust on the ground of birth or status, as with seating children of one caste at the back of the hall; and unjust on the ground of sex alone, as with lower pay for women doing the same work as men; all examples are in imagined Quillby',
  'Quillby and its people are imagined.',
);
const vSortVeld = table(
  ['Imagined inequality in Veldmoor', 'Natural or social', 'Reason'],
  [
    ['Kiran runs faster than Lila', 'Natural', 'A difference of physical ability'],
    ['Girls of one hamlet are kept from the high school by custom', 'Social', 'A social arrangement based on sex that can be changed'],
    ['Mohan has a gift for languages', 'Natural', 'A difference of talent'],
    ['Children of one community must drink last at the village well', 'Social', 'A social arrangement based on community'],
  ],
  'Worked example table sorting imagined inequalities in Veldmoor: Kiran runs faster than Lila, natural, a difference of physical ability; girls of one hamlet kept from the high school by custom, social, an arrangement based on sex that can be changed; Mohan has a gift for languages, natural, a difference of talent; children of one community must drink last at the village well, social, an arrangement based on community',
  'The situations in Veldmoor are imagined.',
);
const vDimT = table(
  ['Dimension', 'What it covers', 'Imagined example'],
  [
    ['Political equality', 'Equal citizenship, equal voting rights and civil rights', 'Every adult in Veldmoor has one equal vote'],
    ['Social equality', 'Equal opportunities, access to education and health care, and the removal of discrimination', 'Every child in Lindor may use the school and the clinic'],
    ['Economic equality', 'Reducing large gaps in wealth and income', 'Quillby shares farmland more widely among families'],
  ],
  'Table of the three dimensions of equality: political equality covers equal citizenship, voting rights and civil rights, as when every adult in imagined Veldmoor has one equal vote; social equality covers equal opportunities, access to education and health care and the removal of discrimination, as when every child in Lindor may use the school and the clinic; economic equality covers reducing large gaps in wealth and income, as when Quillby shares farmland more widely',
  'The places are imagined.',
);
const vDimSort = table(
  ['Imagined situation', 'Dimension in question', 'Reason'],
  [
    ['Hill-ward votes in Veldmoor count as half a vote', 'Political', 'Equal voting rights are denied'],
    ['Children of one caste in Lindor may not use the library', 'Social', 'Opportunity is closed by discrimination'],
    ['A few families in Quillby own most of the farmland', 'Economic', 'A large gap in wealth and resources'],
    ['A clinic in Hesk turns away patients of one community', 'Social', 'Access to health care is denied by discrimination'],
  ],
  'Worked example table identifying dimensions of equality in imagined places: hill-ward votes in Veldmoor count as half a vote, political, equal voting rights are denied; children of one caste in Lindor may not use the library, social, opportunity is closed by discrimination; a few families in Quillby own most of the farmland, economic, a large gap in wealth; a clinic in Hesk turns away patients of one community, social, access to health care is denied by discrimination',
  'The situations are imagined.',
);
const vLohia = table(
  ['Point', 'Ram Manohar Lohia'],
  [
    ['Who', 'A thinker and political leader of the twentieth century'],
    ['His idea', 'Inequality takes several kinds, and each needs attention'],
    ['Kinds he named', 'Between men and women; by skin colour; by caste; colonial rule of some peoples over others; economic inequality'],
    ['Use for students', 'The list shows that inequality has many sources, not only wealth'],
  ],
  'Table on Ram Manohar Lohia: a thinker and political leader of the twentieth century; he held that inequality takes several kinds and each needs attention; the kinds he named are between men and women, by skin colour, by caste, colonial rule of some peoples over others, and economic inequality; the list shows that inequality has many sources, not only wealth',
);
const vMarxLib = table(
  ['Perspective', 'Where it finds inequality', 'Its stress'],
  [
    ['Marxism', 'Rooted in the private ownership of resources', 'How resources are owned and shared'],
    ['Liberalism', 'Competition is fair if opportunities are equal', 'Equal opportunities and wariness of concentrated power'],
  ],
  'Table comparing Marxism and liberalism: Marxism finds inequality rooted in the private ownership of resources and stresses how resources are owned and shared; liberalism holds competition to be fair if opportunities are equal and stresses equal opportunities and wariness of concentrated power',
);
const vFemT = table(
  ['Point', 'Feminism'],
  [
    ['Aim', 'Equal rights for women and men'],
    ['Challenge', 'Patriarchy, a social system in which men hold the dominant power in family and society'],
    ['Imagined case', 'In Hesk, a group campaigns for daughters to inherit family land on the same terms as sons'],
    ['Link to Lohia', 'Inequality between men and women is one of the kinds he named'],
  ],
  'Table on feminism: its aim is equal rights for women and men; it challenges patriarchy, a social system in which men hold the dominant power in family and society; in imagined Hesk a group campaigns for daughters to inherit family land on the same terms as sons; inequality between men and women is one of the kinds Lohia named',
  'The group in Hesk is imagined.',
);
const vPlan1 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: dimensions of equality'],
  [
    ['1. Define equality', 'Equal respect, equal rights, equal opportunities to develop'],
    ['2. Political equality', 'Equal citizenship and vote; one equal vote in Veldmoor'],
    ['3. Social equality', 'Equal opportunities, education, health care; the Lindor school'],
    ['4. Economic equality', 'Smaller gaps in wealth and income; Quillby farmland'],
    ['5. Link them', 'An equal vote means little without school and work'],
  ],
  'Worked example table planning a five mark answer on the dimensions of equality: define equality, then political equality with the vote in Veldmoor, social equality with the Lindor school, economic equality with Quillby farmland, and finally link the dimensions',
  'A plan, to be written in your own words.',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Why it matters', 'A moral and political ideal; liberty, equality and fraternity in 1789'],
    ['Meaning', 'Equal respect, rights and opportunities; not identical treatment'],
    ['Differences', 'Justified by need or work; unjust if by birth or status'],
    ['Natural and social', 'Talent and ability versus caste, class and gender discrimination'],
    ['Dimensions', 'Political, social and economic'],
    ['Perspectives', 'Lohia, Marxism, liberalism and feminism'],
  ],
  'Summary table of Part 1: why equality matters, its meaning, justified and unjust differences, natural and socially produced inequalities, the three dimensions and the four perspectives',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Saying equality means identical treatment', 'Equal respect, rights and opportunities; some differences are justified'],
    ['Mixing natural and social inequalities', 'Natural: talent and ability. Social: made by social arrangements'],
    ['Ranking the perspectives', 'State each view with its reason and leave the judgement to the reader'],
    ['Listing dimensions without examples', 'Add a short imagined example to each dimension'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vFormalT = table(
  ['Point', 'Formal equality'],
  [
    ['Meaning', 'Removing legal privileges and discrimination, so that the law treats all persons alike'],
    ['What it does', 'Gives every person the same standing before the law'],
    ['Its limit', 'May leave real inequalities untouched, such as a poor child with no school within reach'],
    ['Imagined case', 'Ostrel repeals a rule that let members of one family skip the town fee'],
  ],
  'Table on formal equality: removing legal privileges and discrimination so that the law treats all persons alike; it gives every person the same standing before the law; its limit is that it may leave real inequalities untouched, such as a poor child with no school within reach; in imagined Ostrel a rule that let members of one family skip the town fee is repealed',
  'Ostrel is imagined.',
);
const vArts = table(
  ['Provision', 'What it provides'],
  [
    ['Article 14', 'The state may not deny any person equality before the law or the equal protection of the laws'],
    ['Article 15', 'No discrimination on grounds such as religion, race, caste, sex or place of birth; open access to shops, restaurants and public places'],
    ['Article 17', 'Untouchability is abolished and its practice is forbidden'],
    ['Article 15(3)', 'Allows special provisions for women and children'],
  ],
  'Table of constitutional provisions on formal equality: Article 14, equality before the law and equal protection of the laws; Article 15, no discrimination on grounds such as religion, race, caste, sex or place of birth, and open access to shops, restaurants and public places; Article 17, untouchability abolished and its practice forbidden; Article 15(3), special provisions for women and children are allowed',
);
const vDiffT = table(
  ['Point', 'Equality through differential treatment'],
  [
    ['Idea', 'Persons start from different circumstances, so real equality may need special arrangements'],
    ['Examples', 'Ramps for persons with disabilities; maternity benefits for working mothers'],
    ['Aim', 'To give each person an equal chance to enjoy the same rights and services'],
    ['Imagined case', 'The Ostrel hospital fits a ramp at its door and gives paid leave to new mothers'],
  ],
  'Table on equality through differential treatment: persons start from different circumstances so real equality may need special arrangements; examples are ramps for persons with disabilities and maternity benefits for working mothers; the aim is an equal chance to enjoy the same rights and services; imagined case, the Ostrel hospital fits a ramp at its door and gives paid leave to new mothers',
  'The hospital is imagined.',
);
const vSortMeasure = table(
  ['Imagined measure in Quillby', 'Approach', 'Reason'],
  [
    ['A law that bars any shop from refusing customers of any caste', 'Formal equality', 'Removes discrimination in law'],
    ['A ramp and a lift at the council offices', 'Differential treatment', 'A special arrangement for equal access'],
    ['A scholarship for children of groups long denied schooling', 'Affirmative action', 'Aims to remedy historical disadvantage'],
    ['Paid leave for mothers after childbirth', 'Differential treatment', 'A special provision that helps real equality'],
  ],
  'Worked example table sorting imagined measures in Quillby: a law that bars any shop from refusing customers of any caste is formal equality; a ramp and a lift at the council offices is differential treatment; a scholarship for children of groups long denied schooling is affirmative action; paid leave for mothers after childbirth is differential treatment',
  'The measures in Quillby are imagined.',
);
const vAAT = table(
  ['Point', 'Affirmative action'],
  [
    ['Meaning', 'Policies that aim to remedy the effects of historical disadvantage'],
    ['Why needed', 'Long exclusion can leave groups behind even after legal equality'],
    ['Forms', 'Reserved places in education and public jobs, and other support measures'],
    ['Imagined case', 'Hesk Polytechnic sets aside 20 of its 100 seats for families long denied schooling'],
  ],
  'Table on affirmative action: policies that aim to remedy the effects of historical disadvantage; needed because long exclusion can leave groups behind even after legal equality; forms include reserved places in education and public jobs and other support measures; in imagined Hesk Polytechnic twenty of its hundred seats are set aside for families long denied schooling',
  'Hesk Polytechnic is imagined.',
);
const vRes = table(
  ['Point', 'Reservations in India'],
  [
    ['What', 'Reserved places in education and public jobs'],
    ['For whom', 'Scheduled Castes, Scheduled Tribes and Other Backward Classes'],
    ['Article 15(4)', 'Permits special provisions for socially and educationally backward classes, Scheduled Castes and Scheduled Tribes'],
    ['Article 16(4)', 'Permits reservation in public appointments for backward classes not adequately represented'],
  ],
  'Table on reservations in India: reserved places in education and public jobs for Scheduled Castes, Scheduled Tribes and Other Backward Classes; Article 15(4) permits special provisions for socially and educationally backward classes, Scheduled Castes and Scheduled Tribes; Article 16(4) permits reservation in public appointments for backward classes not adequately represented',
);
const vDebate = table(
  ['Some argue', 'Others argue'],
  [
    ['Reservations correct long-standing disadvantage', 'Other or additional means may help more: scholarships, coaching, hostels'],
    ['They make institutions more representative of society', 'Different criteria may suit better, such as the income of a family'],
    ['Legal equality alone leaves old gaps in place', 'Support can reach children earlier, before they compete for seats'],
  ],
  'Table of the debate on reservations: some argue that reservations correct long-standing disadvantage, that they make institutions more representative of society, and that legal equality alone leaves old gaps in place; others argue that other or additional means such as scholarships, coaching and hostels may help more, that different criteria such as the income of a family may suit better, and that support can reach children earlier, before they compete for seats',
);
const vWeigh = table(
  ['Step', 'Imagined case: the seat scheme of Hesk Polytechnic'],
  [
    ['1. The scheme', 'Twenty of 100 seats are set aside for families long denied schooling'],
    ['2. One view', 'It corrects old disadvantage and makes the classroom more representative'],
    ['3. Another view', 'Free coaching and hostels for every poor applicant may reach more children'],
    ['4. Questions to ask', 'Who is helped? Who is left out? Could the measures be combined?'],
    ['5. The judgement', 'Weigh both sets of reasons, then decide and give your reasons'],
  ],
  'Worked example table weighing an imagined seat scheme at Hesk Polytechnic: twenty of one hundred seats are set aside for families long denied schooling; one view says it corrects old disadvantage and makes the classroom more representative; another view says free coaching and hostels for every poor applicant may reach more children; ask who is helped, who is left out and whether the measures could be combined; weigh both sets of reasons, then decide and give reasons',
  'The scheme and the college are imagined.',
);
const vEWS = table(
  ['Dated fact', 'Detail (as of 2024)'],
  [
    ['The amendment', 'The 103rd Amendment (2019) added reservation for economically weaker sections'],
    ['The court', 'The Supreme Court upheld the amendment in 2022'],
    ['Why note it', 'It shows that the grounds for special provision, such as economic need, are part of the debate'],
  ],
  'Table of a dated fact, as of 2024: the 103rd Amendment of 2019 added reservation for economically weaker sections; the Supreme Court upheld the amendment in 2022; it shows that grounds for special provision, such as economic need, are part of the debate',
);
const vPlan2 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: promoting equality'],
  [
    ['1. Formal equality', 'Remove legal privilege and discrimination; Articles 14, 15, 17'],
    ['2. Its limit', 'May leave real gaps, such as a poor child with no school'],
    ['3. Differential treatment', 'A ramp; maternity benefit'],
    ['4. Affirmative action', 'Remedy historical disadvantage; Articles 15(4) and 16(4)'],
    ['5. The debate', 'Some argue reservations, others argue other or additional means; weigh both'],
  ],
  'Worked example table planning a five mark answer on promoting equality: formal equality with Articles 14, 15 and 17; its limit; differential treatment with a ramp and maternity benefit; affirmative action with Articles 15(4) and 16(4); and the debate, with both views weighed',
  'A plan, to be written in your own words.',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Formal equality', 'Remove legal privileges and discrimination'],
    ['Articles', '14 equality before law; 15 no discrimination; 17 untouchability abolished'],
    ['Differential treatment', 'Special arrangements, such as ramps and maternity benefits'],
    ['Affirmative action', 'Remedy historical disadvantage; Articles 15(4), 16(4)'],
    ['The debate', 'Reservations, or other or additional means: weigh both'],
    ['Dated fact', '103rd Amendment (2019); upheld in 2022, as of 2024'],
  ],
  'Summary table of Part 2: formal equality, the Articles, differential treatment, affirmative action, the debate and the dated fact on economically weaker sections',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Mixing up Articles 14, 15 and 17', '14 equality before law; 15 no discrimination; 17 untouchability abolished'],
    ['Saying special treatment is unequal', 'It can help real equality, as with a ramp'],
    ['Taking a side on reservations', 'Some argue, others argue; give reasons for each, then let the reader judge'],
    ['Forgetting the date on the amendment', 'Say 103rd Amendment, 2019, and add as of 2024'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Equality, Part 1: Meaning, Dimensions and Perspectives',
  goals: [
    'Explain why equality matters and give its standard definition',
    'Distinguish justified from unjust differences, and natural from socially produced inequalities',
    'Describe political, social and economic equality with imagined examples',
    'Outline the perspectives of Lohia, Marxism, liberalism and feminism',
    'Plan a five mark answer on the dimensions of equality',
  ],
  slides: [
    sl('title', 'Equality: Meaning, Dimensions and Perspectives', {
      b: 'Part 1: why **equality** matters, what it means, its **dimensions** and the main **perspectives**.',
      v: flow('LR', ['Why equality matters', 'What it means', 'Natural and social', 'Three dimensions', 'Perspectives'], 'Route map of Part 1: why equality matters, what it means, natural and social inequalities, the three dimensions and the perspectives', 'Part 1 at a glance'),
      n: 'Equality is one of the great ideals of politics. In this part we ask why it matters and what it means. We separate natural from social inequalities, study the three dimensions of equality, and then look at four ways of thinking about it.',
    }),
    sl('concept', 'Why equality matters', {
      v: vWhy,
      n: 'Equality is a powerful moral and political ideal. It holds that every person has the same worth. The French Revolution joined liberty, equality and fraternity in its slogan. Movements against colonial rule and against discrimination appealed to it. The Universal Declaration of Human Rights of nineteen forty eight is one international statement of it.',
    }),
    sl('concept', 'What equality means', {
      v: vMeans,
      n: 'Equality means equal respect for all persons, with equal rights and equal opportunities. It does not mean identical treatment in every case. The standard definition is that all persons deserve equal respect and consideration, equal rights, and equal opportunities to develop themselves. An imagined clinic that charges nothing to those who cannot pay still respects this idea.',
    }),
    sl('concept', 'Justified and unjust differences', {
      v: vJust,
      n: 'Some differences in treatment are justified. A free lunch for children who cannot pay rests on need. A harvest bonus rests on work done. Other differences are unjust, because they rest on birth, status or sex alone. Imagined Quillby shows both kinds. The test is whether the ground is relevant and respects every person.',
    }),
    sl('diagram', 'Natural and socially produced inequalities', {
      v: vNatSoc,
      n: 'Natural inequalities are differences of talent and ability. Socially produced inequalities come from social arrangements, such as caste, class or gender discrimination. A helpful test is to ask whether society could have arranged things differently. If it could, the inequality is socially produced. A natural difference gives no ground for unequal rights.',
    }),
    sl('check', 'Quick check: the definition', {
      b: 'Which statement gives the standard definition of equality?',
      chk: 'm_def',
      n: 'Recall the three parts of the standard definition of equality.',
    }),
    sl('example', 'Worked example 1: sort the inequalities of Veldmoor', {
      b: 'Decide whether each imagined inequality is natural or socially produced, and give a reason.',
      bl: ['Could **society** have arranged it differently?', 'Is it a difference of **talent**?'],
      v: vSortVeld,
      n: 'Let us sort four imagined inequalities in Veldmoor. Kiran runs faster than Lila, which is natural. Girls of one hamlet kept from the high school by custom is social, since the custom can be changed. Mohan has a gift for languages, which is natural. Children made to drink last at the well is social.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about talent and custom is true or false.',
      chk: 'tf_nat',
      n: 'Think about which difference is natural and which is made by society.',
    }),
    sl('concept', 'The three dimensions of equality', {
      v: vDimT,
      n: 'Equality has three dimensions. Political equality covers equal citizenship, equal voting rights and civil rights. Social equality covers equal opportunities, access to education and health care, and the removal of discrimination. Economic equality covers reducing large gaps in wealth and income. Each has an imagined example.',
    }),
    sl('diagram', 'The dimensions side by side', {
      v: vDims,
      n: 'This chart sets the three dimensions side by side. Political, social and economic equality each have their own concern, yet they support one another. An equal vote means little to a person kept from school and work, and narrowing economic gaps can widen social and political equality.',
    }),
    sl('check', 'Quick check: fill in the blanks', {
      b: 'Complete the sentence on two dimensions of equality.',
      chk: 'fb_dim',
      n: 'Recall which dimension covers votes and which covers wealth and income.',
    }),
    sl('example', 'Worked example 2: name the dimension', {
      b: 'Decide which dimension of equality each imagined situation concerns.',
      bl: ['Is it about **votes**, **opportunity** or **wealth**?', 'What is **denied**?'],
      v: vDimSort,
      n: 'Let us name the dimension in four imagined situations. Votes counted as half in hill wards is political. Children barred from a library by caste is social. A few families owning most of the farmland is economic. A clinic turning away patients of one community is social.',
    }),
    sl('concept', 'Ram Manohar Lohia on several kinds of inequality', {
      v: vLohia,
      n: 'Ram Manohar Lohia was a thinker and political leader of the twentieth century. He held that inequality takes several kinds. He named inequality between men and women, by skin colour, by caste, colonial rule of some peoples over others, and economic inequality. The list shows that inequality has many sources, not only wealth.',
    }),
    sl('concept', 'Marxism and liberalism', {
      v: vMarxLib,
      n: 'Marxism sees inequality as rooted in the private ownership of resources, and so looks at how resources are owned and shared. Liberalism accepts competition as fair if opportunities are equal, and is wary of concentrated power. The two views start from different concerns, and each gives reasons for its account.',
    }),
    sl('concept', 'Feminism', {
      v: vFemT,
      n: 'Feminism works for equal rights for women and men. It challenges patriarchy, a social system in which men hold the dominant power in family and society. In imagined Hesk, a group campaigns for daughters to inherit land on the same terms as sons. Inequality between men and women is also one of the kinds that Lohia named.',
    }),
    sl('diagram', 'Four perspectives at a glance', {
      v: vPersp,
      n: 'This chart shows the four perspectives together. Lohia named several kinds of inequality. Marxism points to private ownership of resources. Liberalism accepts fair competition when opportunities are equal. Feminism challenges patriarchy. Each gives its own account of where inequality comes from, and a student may weigh each one with reasons.',
    }),
    sl('check', 'Quick check: match the perspectives', {
      b: 'Match each perspective with the idea it stresses.',
      chk: 'mt_persp',
      n: 'Pair each perspective with the idea it stresses.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on the dimensions of equality.',
      bl: ['Define **equality** first', 'Give an **example** of each dimension, then **link** them'],
      v: vPlan1,
      n: 'To plan a five mark answer on the dimensions of equality, define equality first. Then give political equality with the vote in Veldmoor, social equality with the school in Lindor, and economic equality with the farmland of Quillby. End by linking them. Write it in your own words.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Equality is a powerful ideal that means equal respect, rights and opportunities, not identical treatment. Differences based on need or work can be justified, while those based on birth or status are unjust. Inequalities may be natural or socially produced. Equality has political, social and economic dimensions, and Lohia, Marxism, liberalism and feminism each give an account of it.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give the **standard definition**', 'Keep **natural** and **social** apart', 'Add an **imagined example** to each dimension', 'State each perspective, then **let the reader judge**'],
      v: vTips1,
      n: 'A few tips. Give the standard definition of equality. Keep natural and social inequalities apart. Add a short imagined example to each dimension. When you write on perspectives, state each view with its reason and do not rank them.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Equality, Part 2: Promoting Equality and Affirmative Action',
  goals: [
    'Explain formal equality and what Articles 14, 15 and 17 provide',
    'Explain how differential treatment helps achieve real equality',
    'Define affirmative action and describe reservations under Articles 15(4) and 16(4)',
    'Weigh the debate on reservations, with reasons on both sides',
    'Plan a five mark answer on promoting equality',
  ],
  slides: [
    sl('title', 'Promoting Equality: Three Ways', {
      b: 'Part 2: **formal equality**, **differential treatment** and **affirmative action**.',
      v: flow('LR', ['Formal equality', 'The Articles', 'Differential treatment', 'Affirmative action', 'The debate'], 'Route map of Part 2: formal equality, the Articles, differential treatment, affirmative action and the debate', 'Part 2 at a glance'),
      n: 'In Part one we studied what equality means. In this part we ask how equality can be promoted. We study three ways, formal equality, differential treatment and affirmative action, and then the debate on reservations in India.',
    }),
    sl('concept', 'Formal equality', {
      v: vFormalT,
      n: 'Formal equality means removing legal privileges and discrimination, so that the law treats all persons alike. It gives everyone the same standing before the law. But it may leave real inequalities untouched, such as a poor child with no school within reach. Imagined Ostrel repeals a rule that let one family skip a town fee.',
    }),
    sl('concept', 'Articles on formal equality', {
      v: vArts,
      n: 'In the Constitution, Article fourteen says the state may not deny any person equality before the law or equal protection of the laws. Article fifteen forbids discrimination on grounds such as religion, race, caste, sex or place of birth, and opens shops and public places to all. Article seventeen abolishes untouchability and forbids its practice.',
    }),
    sl('concept', 'Equality through differential treatment', {
      v: vDiffT,
      n: 'Persons start from different circumstances, so real equality may need special arrangements. Ramps for persons with disabilities and maternity benefits for working mothers are examples. Their aim is an equal chance to enjoy the same rights and services. The imagined Ostrel hospital fits a ramp at its door and gives paid leave to new mothers.',
    }),
    sl('check', 'Quick check: formal equality', {
      b: 'What is formal equality?',
      chk: 'm_formal',
      n: 'Recall what formal equality removes.',
    }),
    sl('example', 'Worked example 1: sort the measures of Quillby', {
      b: 'Decide which approach each imagined measure shows.',
      bl: ['Does it remove **legal discrimination**?', 'Is it a **special arrangement** or a policy for **historical disadvantage**?'],
      v: vSortMeasure,
      n: 'Let us sort four imagined measures in Quillby. A law barring shops from refusing customers of any caste is formal equality. A ramp and a lift at the council offices is differential treatment. A scholarship for groups long denied schooling is affirmative action. Paid leave for mothers is differential treatment.',
    }),
    sl('diagram', 'The ladder of ways to promote equality', {
      v: vLadder,
      n: 'This ladder shows three ways to promote equality. The first step is formal equality, which removes legal privilege and discrimination. The second is differential treatment, which gives special arrangements for equal access. The third is affirmative action, which aims to remedy historical disadvantage. Each step reaches further than the one before.',
    }),
    sl('check', 'Quick check: put in order', {
      b: 'Arrange the ways of promoting equality from the basic to the most targeted.',
      chk: 'ord_ladder',
      n: 'Think about which approach is basic and which is most targeted.',
    }),
    sl('concept', 'What is affirmative action', {
      v: vAAT,
      n: 'Affirmative action means policies that aim to remedy the effects of historical disadvantage. It is needed because long exclusion can leave groups behind even after legal equality. Its forms include reserved places in education and public jobs, and other support measures. Imagined Hesk Polytechnic sets aside twenty of its hundred seats for families long denied schooling.',
    }),
    sl('concept', 'Reservations in India', {
      v: vRes,
      n: 'In India, affirmative action takes the form of reservations in education and public jobs for Scheduled Castes, Scheduled Tribes and Other Backward Classes. Article fifteen, clause four, permits special provisions for socially and educationally backward classes, Scheduled Castes and Scheduled Tribes. Article sixteen, clause four, permits reservation in public appointments for backward classes not adequately represented.',
    }),
    sl('check', 'Quick check: match the Articles', {
      b: 'Match each provision with what it provides.',
      chk: 'mt_art',
      n: 'Pair each Article with its provision.',
    }),
    sl('concept', 'The debate on reservations', {
      v: vDebate,
      n: 'People hold different views on reservations. Some argue that they correct long standing disadvantage, make institutions more representative of society, and are needed because legal equality alone leaves old gaps in place. Others argue that other or additional means, such as scholarships, coaching and hostels, may help more, or that different criteria may suit better. Students may weigh both sets of reasons and judge for themselves.',
    }),
    sl('example', 'Worked example 2: weigh a seat scheme', {
      b: 'Weigh the views on the imagined seat scheme of Hesk Polytechnic.',
      bl: ['State **both views** with reasons', '**Decide**, and give reasons for your judgement'],
      v: vWeigh,
      n: 'Imagine that Hesk Polytechnic sets aside twenty of its hundred seats for families long denied schooling. One view says this corrects old disadvantage and makes the classroom more representative. Another says free coaching and hostels for every poor applicant may reach more children. Ask who is helped, who is left out, and whether the measures could be combined. Then weigh both and give reasons.',
    }),
    sl('concept', 'A dated fact on economically weaker sections', {
      v: vEWS,
      n: 'As of two thousand twenty four, the one hundred and third Amendment of two thousand nineteen added reservation for economically weaker sections, and the Supreme Court upheld the amendment in two thousand twenty two. It shows that grounds for special provision, such as economic need, are part of the debate. Always add the date when you state it.',
    }),
    sl('check', 'Quick check: assertion and reason', {
      b: 'Decide how the assertion and the reason about affirmative action relate.',
      chk: 'ar_aa',
      n: 'Think about what affirmative action aims to do.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on promoting equality.',
      bl: ['Cover **all three ways**', 'End with the **debate**, kept neutral'],
      v: vPlan2,
      n: 'To plan a five mark answer on promoting equality, begin with formal equality and the Articles. Note its limit. Then give differential treatment with a ramp, and affirmative action with Articles fifteen clause four and sixteen clause four. End with the debate, giving both views. Write it in your own words.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Formal equality removes legal privileges and discrimination, as in Articles fourteen, fifteen and seventeen. Differential treatment gives special arrangements, such as ramps and maternity benefits. Affirmative action aims to remedy historical disadvantage, and in India takes the form of reservations under Articles fifteen clause four and sixteen clause four. The debate has reasons on both sides, and students may judge for themselves.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Match each **Article** to its provision', 'Show how **special treatment** helps real equality', 'Give **both views** on reservations', 'Add the **date** to the amendment'],
      v: vTips2,
      n: 'A few tips. Match each Article to its provision. Show how special treatment can help real equality. When you write on reservations, give both views with reasons and leave the judgement to the reader. And when you mention the amendment on economically weaker sections, add the date.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Equality: Notes',
  sections: [
    {
      h: '1. Why equality matters and what it means',
      t: 1,
      b: '**Equality** is a powerful moral and political ideal: it treats every person as having the same worth. It inspired the **French Revolution** (1789), whose slogan joined liberty, equality and fraternity, and it inspired anti-colonial movements and movements against discrimination. The **Universal Declaration of Human Rights** (1948) is one international statement of equal worth and rights.\n\nThe standard definition: equality is the principle that all persons deserve **equal respect and consideration**, **equal rights** and **equal opportunities to develop themselves**. It does not call for identical treatment in every case.',
      terms: [
        ['Equality', 'The principle that all persons deserve equal respect and consideration, equal rights, and equal opportunities to develop themselves.'],
        ['Equal opportunities', 'The same chance for every person to develop talents and take part in society, whatever the circumstances of birth.'],
      ],
      v: vWhy,
      vs: [vMeans],
    },
    {
      h: '2. Justified and unjust differences; natural and social inequalities',
      t: 1,
      b: 'A difference in treatment is **justified** when it rests on a relevant ground, such as **need** or **work done**. It is **unjust** when it rests on **birth or status**, such as caste or sex.\n\n**Natural inequalities** are differences of talent and ability. **Socially produced inequalities** come from social arrangements such as **caste, class or gender discrimination**. A natural difference gives no ground for unequal rights, while a social arrangement can be changed.',
      terms: [
        ['Natural inequality', 'A difference between persons in talent, ability or similar qualities that is not made by social arrangements.'],
        ['Socially produced inequality', 'A difference between persons that arises from social arrangements, such as caste, class or gender discrimination.'],
        ['Discrimination', 'Treating persons unequally on grounds such as birth, caste or sex, which are not relevant to the matter at hand.'],
      ],
      v: vNatSoc,
      vs: [vJust, vSortVeld],
    },
    {
      h: '3. The three dimensions of equality',
      t: 1,
      b: '**Political equality** covers equal citizenship, equal voting rights and civil rights. **Social equality** covers equal opportunities, access to education and health care, and the removal of discrimination. **Economic equality** covers the reduction of large gaps in wealth and income.\n\nThe dimensions are linked: a person with a vote but no access to school or work may find it hard to use that vote well.',
      terms: [
        ['Political equality', 'Equal citizenship, with equal voting rights and civil rights for all.'],
        ['Social equality', 'Equal opportunities, access to education and health care, and the removal of discrimination.'],
        ['Economic equality', 'The reduction of large gaps in wealth and income.'],
      ],
      v: vDims,
      vs: [vDimT, vDimSort, vPlan1],
    },
    {
      h: '4. Perspectives on equality',
      t: 1,
      b: '**Ram Manohar Lohia** spoke of several kinds of inequality: between men and women, by skin colour, by caste, colonial rule of some peoples over others, and economic inequality.\n\n**Marxism** sees inequality as rooted in the **private ownership of resources**. **Liberalism** accepts **competition** as fair if opportunities are equal, and is wary of concentrated power. **Feminism** works for **equal rights for women and men** and challenges **patriarchy**.\n\nEach view gives its own account of the roots of inequality and of what to do about it; a student may weigh them with reasons.',
      terms: [
        ['Marxism', 'A body of thought that sees inequality as rooted in the private ownership of resources.'],
        ['Liberalism', 'A body of thought that accepts competition as fair if opportunities are equal and is wary of concentrated power.'],
        ['Feminism', 'A body of thought and a movement for equal rights for women and men, which challenges patriarchy.'],
        ['Patriarchy', 'A social system in which men hold the dominant power in family and society.'],
      ],
      v: vPersp,
      vs: [vLohia, vMarxLib, vFemT],
    },
    {
      h: '5. Promoting equality: formal equality and differential treatment',
      t: 2,
      b: '**Formal equality** removes legal privileges and discrimination. In the Constitution, **Article 14** provides equality before the law and equal protection of the laws; **Article 15** forbids discrimination on grounds such as religion, race, caste, sex or place of birth; **Article 17** abolishes untouchability. Article 15(3) allows special provisions for women and children.\n\nFormal equality may leave real inequalities in place. **Differential treatment** gives special arrangements, such as **ramps** for persons with disabilities and **maternity benefits**, so that persons can enjoy equal access.',
      terms: [
        ['Formal equality', 'The removal of legal privileges and discrimination, so that the law treats all persons alike.'],
        ['Differential treatment', 'A special arrangement for persons in different circumstances so that they have an equal chance to enjoy the same rights and services.'],
      ],
      v: vLadder,
      vs: [vFormalT, vArts, vDiffT, vSortMeasure, vPlan2],
    },
    {
      h: '6. Affirmative action and the debate on reservations',
      t: 2,
      b: '**Affirmative action** means policies that aim to remedy the effects of historical disadvantage. In India it takes the form of **reservations** in education and public jobs for **Scheduled Castes, Scheduled Tribes and Other Backward Classes**, permitted by **Article 15(4)** and **Article 16(4)**.\n\nThe debate: **some argue** that reservations correct long-standing disadvantage and make institutions representative. **Others argue** for other or additional means, such as scholarships, coaching or hostels, or for different criteria. Students may weigh both sets of reasons and judge for themselves.\n\nA dated fact (as of 2024): the **103rd Amendment (2019)** added reservation for economically weaker sections, and the Supreme Court upheld it in 2022.',
      terms: [
        ['Affirmative action', 'Policies that aim to remedy the effects of historical disadvantage.'],
        ['Reservation', 'The setting aside of a share of places in education or public jobs for specified groups.'],
      ],
      v: vAAT,
      vs: [vRes, vDebate, vWeigh, vEWS],
    },
  ],
  tips: '**Common mistakes**\n- Saying equality means identical treatment: it means equal respect, rights and opportunities, and some differences are justified.\n- Mixing natural and social inequalities: natural differences are of talent and ability; social ones are made by arrangements that can be changed.\n- Ranking the perspectives: state each view with its reason and leave the judgement to the reader.\n- Mixing up the Articles: 14 equality before the law, 15 no discrimination, 17 untouchability abolished, 15(4) and 16(4) special provision and reservation.\n- Taking a side on reservations: write some argue, others argue, and give reasons for each.\n- Leaving out the date: write the 103rd Amendment (2019), upheld in 2022, as of 2024.\n\n**Tips:** give a short imagined example with each definition; add a one-line link between the three dimensions; end a debate answer by saying that students may weigh the reasons and judge.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What kind of ideal is **equality**?', 'A powerful moral and political ideal: every person has the same worth.', 'concept'],
  ['Which Revolution (1789) joined liberty, equality and fraternity?', 'The French Revolution.', 'fact'],
  ['Which international document of 1948 is named as a statement of equal worth and rights?', 'The Universal Declaration of Human Rights.', 'fact'],
  ['Give the **standard definition** of equality', 'All persons deserve equal respect and consideration, equal rights, and equal opportunities to develop themselves.', 'definition'],
  ['Does equality mean **identical treatment** in every case?', 'No. Differences based on relevant grounds such as need or work done can be justified.', 'concept'],
  ['Two grounds that can **justify** a difference in treatment', 'Need and work done.', 'concept'],
  ['Two grounds that make a difference **unjust**', 'Birth and status, such as caste or sex.', 'concept'],
  ['What are **natural inequalities**?', 'Differences of talent and ability, not made by social arrangements.', 'definition'],
  ['What are **socially produced inequalities**?', 'Inequalities that arise from social arrangements, such as caste, class or gender discrimination.', 'definition'],
  ['A test to tell natural from social inequality', 'Ask whether society could have arranged things differently.', 'concept'],
  ['What is **political equality**?', 'Equal citizenship, with equal voting rights and civil rights.', 'definition'],
  ['What is **social equality**?', 'Equal opportunities, access to education and health care, and the removal of discrimination.', 'definition'],
  ['What is **economic equality**?', 'The reduction of large gaps in wealth and income.', 'definition'],
  ['Why are the three dimensions **linked**?', 'A vote means little to a person kept from school and work.', 'concept'],
  ['Which kinds of inequality did **Lohia** name?', 'Between men and women, by skin colour, by caste, colonial rule, and economic inequality.', 'fact'],
  ['What does **Marxism** say about the roots of inequality?', 'They lie in the private ownership of resources.', 'concept'],
  ['What does **liberalism** accept as fair?', 'Competition, if opportunities are equal; it is wary of concentrated power.', 'concept'],
  ['What does **feminism** work for?', 'Equal rights for women and men, challenging patriarchy.', 'concept'],
  ['What is **patriarchy**?', 'A social system in which men hold the dominant power in family and society.', 'definition'],
  ['What is **formal equality**?', 'The removal of legal privileges and discrimination, so that the law treats all alike.', 'definition'],
  ['What does **Article 14** provide?', 'Equality before the law and the equal protection of the laws.', 'fact'],
  ['What does **Article 15** forbid?', 'Discrimination on grounds such as religion, race, caste, sex or place of birth.', 'fact'],
  ['What does **Article 17** do?', 'Abolishes untouchability and forbids its practice.', 'fact'],
  ['What is **differential treatment**?', 'A special arrangement that helps persons in different circumstances achieve real equality.', 'definition'],
  ['Two examples of differential treatment', 'A ramp for persons with disabilities; maternity benefits.', 'fact'],
  ['What is **affirmative action**?', 'Policies that aim to remedy the effects of historical disadvantage.', 'definition'],
  ['What are **reservations**?', 'The setting aside of a share of places in education or public jobs for specified groups.', 'definition'],
  ['Which groups benefit from reservations in India?', 'Scheduled Castes, Scheduled Tribes and Other Backward Classes.', 'fact'],
  ['What does **Article 15(4)** permit?', 'Special provisions for socially and educationally backward classes, Scheduled Castes and Scheduled Tribes.', 'fact'],
  ['What does **Article 16(4)** permit?', 'Reservation in public appointments for backward classes not adequately represented.', 'fact'],
  ['One reason **some argue** for reservations', 'They correct long-standing disadvantage and make institutions more representative.', 'concept'],
  ['One reason **others argue** for other or additional means', 'Scholarships, coaching or hostels, or different criteria, may help more children.', 'concept'],
  ['As of 2024, what did the **103rd Amendment (2019)** add?', 'Reservation for economically weaker sections; upheld by the Supreme Court in 2022.', 'fact'],
].map(([a, b, c]) => [a, b, c, 1]));

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Equality',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_social_app', 'm_dim_app_econ', 'm_aa_app', 'ar_nat_soc'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_nat_soc', 's_diff', 's3_classify'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_dims', 'l_ladder'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_club'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Equality',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_unjust_app', 'm_dim_app_social', 'm_lib_app', 'm_persp', 'm_art14_app', 'm_diff_app', 'm_debate_app', 'm_res_art', 'ar_ident', 'ar_formal'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_justified', 's_formal', { attempt: 1, keys: ['s_dim', 's_art_aa'] }, 's3_persp', { attempt: 1, keys: ['s3_debate', 's3_ladder'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_meaning', { attempt: 1, keys: ['l_aa', 'l_persp'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_hiring', 'c_admit'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch13 only (significance, meaning and dimensions of equality, perspectives; promoting equality, formal equality, differential treatment and affirmative action)',
    originality: 'every scenario, town, club, company, college, school, notice, table and discussion is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text, no quotation of any thinker, no court judgment text, no board item reused (D-036)',
    facts: 'stable facts only: French Revolution 1789; Universal Declaration of Human Rights 1948 named; Lohia five kinds of inequality; Marxism, liberalism, feminism summarised; Articles 14, 15, 15(3), 15(4), 16(4), 17 paraphrased; 103rd Amendment 2019 and the 2022 Supreme Court decision, dated as of 2024',
    neutrality: 'no map, no party, no current office-holder or present-day dispute named; perspectives and the reservations debate presented as some argue, others argue with no ranking',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
