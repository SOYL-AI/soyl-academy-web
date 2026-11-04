// Build CBSE 11 Political Science ch10 The Philosophy of the Constitution. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch10/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch10', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vIdeals = (() => {
  const s = new Svg(760, 400);
  const box = (x, y, name, col, lines) => {
    s.rect(x, y, 360, 180, { color: col, sw: 2.5 });
    s.text(x + 180, y + 30, name, { bold: true, size: 20, color: col });
    lines.forEach((ln, j) => s.text(x + 180, y + 70 + j * 26, ln, { size: 14 }));
  };
  box(10, 10, 'Justice', 'blue', ['Social, economic and political', 'Fair treatment in society, in', 'livelihood and in public life']);
  box(390, 10, 'Liberty', 'green', ['Of thought, expression, belief,', 'faith and worship', 'Freedom to think, speak and believe']);
  box(10, 210, 'Equality', 'brown', ['Of status and of opportunity', 'Equal standing for every person', 'and a fair chance to develop']);
  box(390, 210, 'Fraternity', 'red', ['Assures the dignity of the individual', 'and the unity and integrity', 'of the nation']);
  return s.visual('Chart of the four ideals of the Preamble with their meanings. Justice is social, economic and political: fair treatment in society, in livelihood and in public life. Liberty is of thought, expression, belief, faith and worship. Equality is of status and of opportunity: equal standing for every person and a fair chance to develop. Fraternity assures the dignity of the individual and the unity and integrity of the nation', 'The four ideals and what each covers.');
})();

const vWeb = (() => {
  const s = new Svg(760, 450);
  const W = 220, H = 76;
  const items = [
    [10, 10, ['Individual freedom', 'Expression; no arbitrary arrest'], 'blue'],
    [270, 10, ['Social justice', 'Opportunity for excluded groups'], 'green'],
    [530, 10, ['Diversity and', 'minority rights', 'Community-based rights'], 'brown'],
    [10, 190, ['Secularism', 'Indian model: principled distance'], 'red'],
    [530, 190, ['Universal adult franchise', 'Every adult may vote'], 'blue'],
    [80, 360, ['Federalism', 'Including special provisions'], 'green'],
    [460, 360, ['National identity', 'One identity beside others'], 'brown'],
  ];
  const cx = 380, cy = 228;
  items.forEach(([x, y]) => s.line(cx, cy, x + W / 2, y + H / 2, { sw: 1.6, color: 'muted' }));
  s.rect(290, 185, 180, 86, { color: 'accent', sw: 3 });
  s.text(380, 215, 'Philosophy of', { bold: true, size: 15, color: 'accent' });
  s.text(380, 241, 'the Constitution', { bold: true, size: 15, color: 'accent' });
  items.forEach(([x, y, lines, col]) => {
    s.rect(x, y, W, H, { color: col, sw: 2 });
    lines.forEach((ln, j) => s.text(x + W / 2, y + 22 + j * 21, ln, { size: j === 0 || (lines.length === 3 && j === 1) ? 14 : 12, bold: j === 0 || (lines.length === 3 && j === 1), color: j === 0 || (lines.length === 3 && j === 1) ? col : undefined }));
  });
  return s.visual('Web diagram of the core features of the political philosophy of the Constitution around a central box: individual freedom, with freedom of expression and no arbitrary arrest; social justice, with opportunity for excluded groups; diversity and minority rights, with community-based rights; secularism of the Indian kind, a principled distance from religions; universal adult franchise, in which every adult may vote; federalism, including special provisions; and national identity, one identity beside others', 'The core features of the philosophy.');
})();

const vCrit = (() => {
  const s = new Svg(760, 340);
  s.text(180, 22, 'Critics have argued', { bold: true, size: 16, color: 'red' });
  s.text(580, 22, 'Reply', { bold: true, size: 16, color: 'green' });
  const row = (y, name, line, r1, r2) => {
    s.rect(10, y, 340, 80, { color: 'red', sw: 2 });
    s.text(180, y + 26, name, { bold: true, size: 15 });
    s.text(180, y + 54, line, { size: 13 });
    s.arrow(350, y + 40, 410, y + 40, { sw: 2 });
    s.rect(410, y, 340, 80, { color: 'green', sw: 2 });
    s.text(580, y + 28, r1, { size: 13 });
    s.text(580, y + 52, r2, { size: 13 });
  };
  row(42, 'Unwieldy', 'It is very long and detailed', 'The detail reflects the needs of India;', 'much detail is usual');
  row(142, 'Unrepresentative', 'Elected on a limited franchise', 'Members held diverse opinions;', 'the debates were open');
  row(242, 'Alien', 'Many provisions were borrowed', 'Ideas were adapted to Indian conditions', 'and to the ideals of the national movement');
  return s.visual('Chart of three criticisms and their replies. Critics have argued that the Constitution is unwieldy, being very long and detailed; the reply is that the detail reflects the needs of India and that much detail is usual. Critics have argued that it is unrepresentative, since the Assembly was elected on a limited franchise; the reply is that members held diverse opinions and the debates were open. Critics have argued that it is alien, since many provisions were borrowed; the reply is that ideas were adapted to Indian conditions and to the ideals of the national movement', 'Three criticisms and the usual replies.');
})();

const vSecular = (() => {
  const s = new Svg(760, 330);
  s.rect(10, 10, 130, 44, { color: 'muted', sw: 1.5 });
  s.text(75, 32, 'Point', { bold: true, size: 15 });
  s.rect(150, 10, 290, 44, { color: 'blue', sw: 2.5 });
  s.text(295, 32, 'Western model, in brief', { bold: true, size: 15, color: 'blue' });
  s.rect(450, 10, 300, 44, { color: 'accent', sw: 2.5 });
  s.text(600, 32, 'Indian model', { bold: true, size: 15, color: 'accent' });
  const rows = [
    ['Idea', 'State and religion strictly apart', 'A principled distance from all religions'],
    ['Intervention', 'The state does not interfere', 'May intervene to reform, e.g. untouchability'],
    ['Support', 'No state support for religious bodies', 'May support all communities equally'],
    ['Concern', 'Mainly the individual', 'Individuals and communities'],
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
  s.text(380, 322, 'Secularism is treated at length in a later chapter', { size: 12, muted: true });
  return s.visual('Comparison of the Western and the Indian models of secularism, in brief. On the idea: in the Western model state and religion are kept strictly apart, in the Indian model the state keeps a principled distance from all religions. On intervention: in the Western model the state does not interfere, in the Indian model it may intervene to reform, for example against untouchability. On support: in the Western model there is no state support for religious bodies, in the Indian model the state may support all communities equally. On concern: the Western model is mainly about the individual, the Indian model about individuals and communities', 'Western and Indian secularism compared.');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vMeaning = table(
  ['Term', 'Meaning'],
  [
    ['Constitution', 'The basic document that sets up the institutions of a state, states their powers and the rights of citizens'],
    ['Philosophy of a constitution', 'The ideals and moral values behind its provisions, which explain why the provisions take the form they do'],
    ['Approach', 'Ask what values a provision serves and what kind of society it hopes to build'],
    ['Source', 'The Constituent Assembly debates help us to see the ideals and reasons of the members'],
  ],
  'Table of terms: a constitution is the basic document that sets up institutions and states powers and rights; the philosophy of a constitution is the ideals and moral values behind its provisions; the approach is to ask what values a provision serves; the Constituent Assembly debates are a source for the ideals and reasons of the members',
);
const vRoles = table(
  ['Role of a constitution', 'What it means', 'Imagined example'],
  [
    ['Reflects moral values', 'Its choices show what a society holds to be right', 'The editorial of Tarsia reads its constitution as a vision of dignity'],
    ['Means of democratic transformation', 'Changes an unequal society by lawful and peaceful means', 'Brendale opens its wells to the Lowrens'],
    ['Limits power', 'Binds those who govern, even a majority', 'Norvale requires a hearing before a judge'],
  ],
  'Table of the roles of a constitution: it reflects moral values, as in the editorial of imagined Tarsia; it is a means of democratic transformation, as when imagined Brendale opens its wells to the Lowrens; and it limits power, as when imagined Norvale requires a hearing before a judge',
);
const vPre = table(
  ['Part of the Preamble', 'Key words'],
  [
    ['Nature of the state', 'Sovereign, socialist, secular, democratic, republic'],
    ['Justice', 'Social, economic and political'],
    ['Liberty', 'Of thought, expression, belief, faith and worship'],
    ['Equality', 'Of status and of opportunity'],
    ['Fraternity', 'Assuring the dignity of the individual and the unity and integrity of the nation'],
    ['Dated note', 'Socialist, secular and integrity were added by the 42nd Amendment (1976)'],
  ],
  'Table of the key words of the Preamble: the nature of the state is sovereign, socialist, secular, democratic and republic; justice is social, economic and political; liberty is of thought, expression, belief, faith and worship; equality is of status and of opportunity; fraternity assures the dignity of the individual and the unity and integrity of the nation; the words socialist, secular and integrity were added by the 42nd Amendment of 1976',
);
const vClassify = table(
  ['Imagined clause of Zandria', 'Ideal', 'Reason'],
  [
    ['No one may be punished for peacefully sharing an opinion', 'Liberty', 'Freedom of thought and expression'],
    ['Every worker is paid a wage on which a family can live', 'Economic justice', 'Fairness in livelihood'],
    ['Every adult has a vote in choosing the legislature', 'Political justice', 'A voice in public affairs'],
    ['Every child may attend a public school, whatever the community', 'Equality of opportunity', 'A fair chance to develop'],
    ['Schools teach the shared story of all communities', 'Fraternity', 'Belonging together; dignity and unity'],
  ],
  'Worked example table classifying imagined clauses of Zandria by ideal: sharing an opinion is liberty; a living wage is economic justice; a vote for every adult is political justice; a public school place for every child is equality of opportunity; teaching the shared story of all communities is fraternity',
  'The clauses of Zandria are imagined.',
);
const vDebates = table(
  ['Point', 'Detail'],
  [
    ['What the debates show', 'Members gave reasons for the form of provisions and differed on how to balance values'],
    ['Differing emphasis', 'Some stressed the liberty of the individual, others the removal of social inequality, and many sought a balance'],
    ['How to use them', 'As evidence of ideals and reasons, read with the text of the Constitution'],
  ],
  'Table on the Constituent Assembly debates: they show the reasons members gave and how they differed in balancing values; some stressed individual liberty, others the removal of social inequality, and many sought a balance; they are used as evidence of ideals and reasons, read with the text of the Constitution',
);
const vFreedom = table(
  ['Point', 'Individual freedom'],
  [
    ['Meaning', 'Each person is free to think, speak and act within limits fixed by law'],
    ['Examples', 'Freedom of expression; protection against arbitrary arrest (Articles 19 and 22)'],
    ['Why it matters', 'It keeps the power of the state in check and respects the dignity of the person'],
    ['Imagined case', 'A trader of Mirenia is held for days without a reason or a hearing: the practice conflicts with this value'],
  ],
  'Table on individual freedom: each person is free to think, speak and act within limits fixed by law; examples are freedom of expression and protection against arbitrary arrest under Articles 19 and 22; it keeps state power in check and respects dignity; an imagined trader of Mirenia held without reason or hearing shows a conflict with the value',
);
const vSocial = table(
  ['Point', 'Social justice'],
  [
    ['Meaning', 'Fair treatment of every group in society, including the removal of long-standing exclusion'],
    ['Means', 'Special provisions such as reservations for Scheduled Castes and Scheduled Tribes'],
    ['Aim', 'Equality of opportunity: a fair chance for those who started far behind'],
    ['Seen by some', 'As a means to equality, and not as a departure from it'],
  ],
  'Table on social justice: fair treatment of every group, including removal of long-standing exclusion; means such as reservations for Scheduled Castes and Scheduled Tribes; the aim of equality of opportunity; seen by some as a means to equality and not a departure from it',
);
const vDelvar = table(
  ['Step of reasoning', 'Imagined state of Delvar'],
  [
    ['1. The situation', 'Certain communities were shut out of schooling for generations'],
    ['2. The effect', 'Their children start behind in any open competition'],
    ['3. The provision', 'A share of college seats is set aside for them'],
    ['4. The principle', 'Equality of opportunity, a means to social justice'],
    ['5. A view to weigh', 'Some ask how long such a scheme should last; others stress that opportunity is still unequal'],
  ],
  'Worked example table on the imagined state of Delvar: certain communities were shut out of schooling; their children start behind; a share of seats is set aside; the principle is equality of opportunity as a means to social justice; and some ask how long such a scheme should last while others stress that opportunity is still unequal',
  'The state of Delvar and its scheme are imagined.',
);
const vDiversity = table(
  ['Point', 'Respect for diversity and minority rights'],
  [
    ['Meaning', 'Different religions, languages and cultures are recognised and protected'],
    ['Community-based rights', 'Rights held by communities, such as religious and linguistic minorities, beside individual rights'],
    ['Example', 'The right of minorities to run educational institutions (Article 30)'],
    ['Imagined case', 'A language community of Orwen runs schools that teach in its mother tongue'],
  ],
  'Table on diversity and minority rights: different religions, languages and cultures are recognised and protected; community-based rights, such as those of minorities, stand beside individual rights; for example the right of minorities to run educational institutions under Article 30; an imagined language community of Orwen runs schools in its mother tongue',
);
const vSecDef = table(
  ['Term', 'Meaning'],
  [
    ['Secularism', 'The principle that the state does not identify itself with any one religion and treats all believers and non-believers equally'],
    ['Strict separation', 'State and religion are kept completely apart, with no help to or interference in religion'],
    ['Principled distance', 'A distance kept from every religion on a principle of equal respect, which allows reform or support where equality requires'],
    ['Examples of intervention', 'A law against untouchability; equal grants to institutions of all faiths'],
  ],
  'Table of terms: secularism is the principle that the state does not identify with any one religion and treats all believers and non-believers equally; strict separation keeps state and religion completely apart; principled distance is a distance kept from every religion on a principle of equal respect, which allows reform or support where equality requires; examples are a law against untouchability and equal grants to institutions of all faiths',
);
const vSecEx = table(
  ['Imagined situation', 'Which model it suits'],
  [
    ['Veldora gives no funds to any religious body and never interferes in practice', 'Strict separation'],
    ['Tarsia gives equal repair grants to school buildings of all faiths', 'Indian model: equal support'],
    ['Tarsia forbids a shrine to turn people away by birth', 'Indian model: reform by intervention'],
    ['Tarsia makes one faith its official religion', 'Neither: this would not be secular'],
  ],
  'Worked example table: Veldora gives no funds and never interferes, which is strict separation; Tarsia gives equal repair grants to school buildings of all faiths, which is equal support under the Indian model; Tarsia forbids a shrine to turn people away by birth, which is reform by intervention under the Indian model; making one faith official would not be secular',
  'Veldora and Tarsia are imagined.',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Philosophy', 'Ideals and values behind provisions; transformation; limiting power'],
    ['Preamble', 'Nature of the state; justice, liberty, equality, fraternity; 42nd Amendment 1976'],
    ['Individual freedom', 'Expression; protection against arbitrary arrest'],
    ['Social justice', 'Reservations for Scheduled Castes and Scheduled Tribes; equality of opportunity'],
    ['Diversity', 'Minority rights; community-based rights'],
    ['Secularism', 'Principled distance; may reform or support equally'],
  ],
  'Summary table of Part 1: philosophy, Preamble, individual freedom, social justice, diversity and secularism',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Quoting the Preamble from memory', 'Name the ideals in your own words and give their meaning'],
    ['Saying the 42nd Amendment added justice', 'It added socialist, secular and integrity in 1976'],
    ['Saying Indian secularism is strict separation', 'It is a principled distance, with reform and equal support'],
    ['Listing features without examples', 'Support each feature with an example'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vFranchise = table(
  ['Point', 'Universal adult franchise'],
  [
    ['Meaning', 'Every adult citizen may vote, with no test of wealth, schooling, caste, gender or religion'],
    ['In India', 'Adopted from the start, in the Constitution (Article 326)'],
    ['Voting age', 'First 21 years; lowered to 18 years by the 61st Amendment (1988)'],
    ['Value', 'Political equality: each adult has one vote and a voice in public affairs'],
  ],
  'Table on universal adult franchise: every adult citizen may vote with no test of wealth, schooling, caste, gender or religion; adopted from the start under Article 326; the voting age was first 21 years and was lowered to 18 years by the 61st Amendment of 1988; it expresses political equality',
);
const vBold = table(
  ['Gradual extension (many Western countries)', 'Universal adult franchise from the start (India)'],
  [
    ['The vote first limited by property, sex or other tests', 'No test of property or schooling'],
    ['Widened in stages over a long period', 'Every adult citizen from the first elections'],
    ['Some groups waited for generations', 'Women and men voted alike'],
  ],
  'Table comparing the gradual extension of the vote in many Western countries, first limited by property or sex and widened in stages, with universal adult franchise from the start in India, with no test of property or schooling, every adult from the first elections and women and men voting alike',
);
const vHalcor = flow('LR', ['Halcor: men with large landholdings may vote', 'Halcor: all men may vote', 'Halcor: women may vote, with conditions', 'Mirenia: every adult votes from the first election'], 'Worked example flow: in imagined Halcor the vote goes first to men with large landholdings, then to all men, then to women with conditions, whereas imagined Mirenia gives every adult the vote at its first election', 'Staged extension compared with the vote for all');
const vFed = table(
  ['Point', 'Federalism and special provisions'],
  [
    ['Federalism', 'Power is shared between the Union and the states, each with its own government'],
    ['Why it suits India', 'It lets regions of different languages and cultures govern themselves within one country'],
    ['Asymmetric arrangements', 'Some states have special provisions that others do not (Article 371 and related Articles)'],
    ['Purpose', 'To meet the particular needs of those states'],
  ],
  'Table on federalism: power is shared between the Union and the states; it lets regions of different languages and cultures govern themselves within one country; some states have special provisions under Article 371 and related Articles; the purpose is to meet the particular needs of those states',
);
const vNat = table(
  ['Point', 'National identity'],
  [
    ['Idea', 'One national identity for all citizens'],
    ['Other identities', 'Regional, linguistic and religious identities continue beside it'],
    ['Why it matters', 'A citizen need not give up a local identity to belong to the nation'],
    ['Imagined case', 'A student of Kalmar speaks her mother tongue at home and shares a national identity at school'],
  ],
  'Table on national identity: one national identity for all citizens; regional, linguistic and religious identities continue beside it; a citizen need not give up a local identity to belong to the nation; an imagined student of Kalmar speaks her mother tongue at home and shares a national identity at school',
);
const vProc = flow('LR', ['A clause is proposed', 'Members debate it openly', 'A compromise wording is drawn up', 'It is adopted, by consensus where possible'], 'Flow of the procedure: a clause is proposed, members debate it openly, a compromise wording is drawn up, and it is adopted by consensus where possible', 'Procedural achievements in action');
const vProcTab = table(
  ['Procedural achievement', 'Meaning'],
  [
    ['Faith in deliberation', 'Disputes were to be settled by discussion and reasons'],
    ['Compromise and accommodation', 'Each side gave something to reach a common position'],
    ['Consensus wherever possible', 'Agreement of all or nearly all, instead of a bare majority'],
  ],
  'Table of procedural achievements: faith in deliberation, in which disputes are settled by discussion and reasons; compromise and accommodation, in which each side gives something; and consensus wherever possible, which is agreement of all or nearly all',
);
const vPlan = table(
  ['Step of a 5-mark answer', 'Imagined plan for: criticisms and replies'],
  [
    ['1. Opening line', 'Critics have argued three things about the Constitution'],
    ['2. Point one', 'Unwieldy: long and detailed; reply: reflects the needs of India'],
    ['3. Point two', 'Unrepresentative: limited franchise; reply: diverse opinions, open debates'],
    ['4. Point three', 'Alien: borrowed provisions; reply: adapted to Indian conditions'],
    ['5. Judgement', 'Weigh the replies with a reason, without taking a side blindly'],
  ],
  'Worked example table planning a five mark answer on criticisms and replies: an opening line, unwieldy with its reply, unrepresentative with its reply, alien with its reply, and a reasoned judgement',
  'A plan, to be written in your own words.',
);
const vUnwieldy = table(
  ['Point', 'Criticism: the Constitution is unwieldy'],
  [
    ['Critics have argued', 'It is very long and has much detail, so it is hard for an ordinary reader to follow'],
    ['Reply', 'Its length reflects the needs of India, a large and diverse country'],
    ['Further reply', 'Much detail is usual in constitutions that set out powers and rights clearly'],
    ['Imagined case', 'A student of Lakemoor School finds the Articles and schedules too many to read'],
  ],
  'Table on the criticism that the Constitution is unwieldy: critics have argued that it is very long and detailed; the reply is that its length reflects the needs of India and that much detail is usual; an imagined student of Lakemoor School finds the Articles too many to read',
);
const vUnrep = table(
  ['Point', 'Criticism: the Constitution is unrepresentative'],
  [
    ['Critics have argued', 'The Constituent Assembly was elected on a limited franchise and not by universal adult franchise'],
    ['Reply', 'Its members held diverse opinions'],
    ['Further reply', 'Its debates were open, so many views were heard'],
    ['Weigh', 'Students should judge with reasons how far the replies meet the criticism'],
  ],
  'Table on the criticism that the Constitution is unrepresentative: critics have argued that the Assembly was elected on a limited franchise; the reply is that its members held diverse opinions and its debates were open; students should judge with reasons',
);
const vAlien = table(
  ['Point', 'Criticism: the Constitution is alien'],
  [
    ['Critics have argued', 'Many provisions were borrowed from other countries'],
    ['Reply', 'Borrowed ideas were adapted to Indian conditions'],
    ['Further reply', 'They were joined with the ideals of the national movement'],
    ['Weigh', 'Is a borrowed idea foreign if it is shaped to fit local needs?'],
  ],
  'Table on the criticism that the Constitution is alien: critics have argued that many provisions were borrowed; the reply is that borrowed ideas were adapted to Indian conditions and joined with the ideals of the national movement; students may weigh whether a borrowed idea is foreign if shaped to local needs',
);
const vLimits = table(
  ['Limitation (as the textbook notes)', 'What it means'],
  [
    ['Centralised notion of national unity', 'Some critics hold that unity was sought through strong Union powers'],
    ['Gender justice', 'Some issues, for example within the family, were not fully addressed'],
    ['Social and economic rights', 'Some were placed in the Directive Principles and not among the Fundamental Rights'],
  ],
  'Table of limitations: a centralised notion of national unity; some issues of gender justice, for example within the family, not fully addressed; and some social and economic rights placed in the Directive Principles and not among the Fundamental Rights',
);
const vLetter = table(
  ['Point in the imagined letter', 'Limitation', 'A view to weigh'],
  [
    ['Matters inside the family not fully addressed', 'Gender justice', 'Reform is a continuing task'],
    ['An adequate livelihood is a guiding principle only', 'Rights in the Directive Principles', 'Guiding principles still direct the state'],
    ['The Union carries much weight in unity', 'Centralised notion of unity', 'A strong sense of unity was needed'],
  ],
  'Worked example table reading an imagined student letter: matters inside the family not fully addressed is a gender justice limitation; an adequate livelihood as a guiding principle only is a limitation about rights in the Directive Principles; the Union carrying much weight in unity is a centralised notion of unity; each comes with a view to weigh',
  'The letter and its writer are imagined.',
);
const vWeigh = table(
  ['Achievements', 'Questions that critics raise'],
  [
    ['Liberty, equality and justice set as ideals', 'Some issues of gender justice not fully addressed'],
    ['Universal adult franchise from the start', 'Some social and economic rights in the Directive Principles'],
    ['Respect for diversity with one national identity', 'A centralised notion of national unity'],
  ],
  'Table setting achievements, such as liberty, equality and justice as ideals, universal adult franchise from the start, and respect for diversity with one national identity, against questions that critics raise: gender justice, rights in the Directive Principles and a centralised notion of unity',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Franchise', 'Every adult from the start; bold beside gradual extension in many Western countries'],
    ['Federalism', 'Shared power; special provisions for some states'],
    ['National identity', 'One identity beside regional and other identities'],
    ['Procedure', 'Deliberation, compromise, consensus'],
    ['Criticisms', 'Unwieldy, unrepresentative, alien, each with a reply'],
    ['Limitations', 'Centralised unity; gender justice in the family; rights in the Directive Principles'],
  ],
  'Summary table of Part 2: franchise, federalism, national identity, procedure, criticisms and limitations',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Giving a criticism without the reply', 'Pair each criticism with its reply'],
    ['Taking a side on a debated point', 'Write critics have argued, others reply, then weigh with reasons'],
    ['Saying the vote was limited from the start', 'Universal adult franchise was adopted from the start; the Assembly itself rested on a limited franchise'],
    ['Confusing the limits with the criticisms', 'Criticisms are unwieldy, unrepresentative, alien; limitations are the three noted by the textbook'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Philosophy of the Constitution, Part 1: Ideals, Freedom, Justice, Diversity and Secularism',
  goals: [
    'Explain what the philosophy of a constitution means and how a constitution reflects moral values',
    'Describe a constitution as a means of democratic transformation and as a limit on power',
    'Name the ideals of the Preamble and the dated note on the 42nd Amendment (1976)',
    'Explain individual freedom, social justice and respect for diversity and minority rights',
    'Define secularism and contrast the Indian model with strict separation',
  ],
  slides: [
    sl('title', 'The Philosophy of the Constitution', {
      b: 'Part 1: the **ideals** behind the Constitution, and four core features: **freedom**, **social justice**, **diversity** and **secularism**.',
      v: flow('LR', ['What philosophy means', 'The Preamble ideals', 'Freedom and social justice', 'Diversity', 'Secularism'], 'Route map of Part 1: what philosophy means, the Preamble ideals, freedom and social justice, diversity, and secularism', 'Part 1 at a glance'),
      n: 'A constitution is more than a list of rules. Behind every provision there is an idea of what is right. In this part we ask what ideals lie behind the Indian Constitution, and we study four of its core features: individual freedom, social justice, respect for diversity, and secularism.',
    }),
    sl('concept', 'What is the philosophy of a constitution?', {
      v: vMeaning,
      n: 'A constitution is the basic document that sets up the institutions of a state, states their powers, and lays down the rights of citizens. The philosophy of a constitution is the set of ideals and moral values behind its provisions. To study it, we ask what values a provision serves and what kind of society it hopes to build.',
    }),
    sl('concept', 'Three roles of a constitution', {
      v: vRoles,
      n: 'A constitution reflects the moral values of a society. It can be a means of democratic transformation, changing an unequal society by lawful and peaceful means. And it limits power, binding those who govern, even a government with a majority. Imagined Brendale, Tarsia and Norvale show each of these roles.',
    }),
    sl('check', 'Quick check: the meaning', {
      b: 'Which description best gives the meaning of the philosophy of a constitution?',
      chk: 'm_phil_def',
      n: 'Recall what we mean by the philosophy of a constitution.',
    }),
    sl('diagram', 'The ideals of the Preamble', {
      v: vIdeals,
      n: 'The Preamble sets out four ideals. Justice is social, economic and political. Liberty covers thought, expression, belief, faith and worship. Equality is of status and of opportunity. Fraternity assures the dignity of the individual and the unity and integrity of the nation. Together they show the values the Constitution wishes to realise.',
    }),
    sl('concept', 'The Preamble: key words and a dated note', {
      v: vPre,
      n: 'The Preamble describes the state as sovereign, socialist, secular, democratic and a republic. A dated note: the words socialist, secular and integrity were added by the forty second Amendment in nineteen seventy six. Justice, liberty, equality and fraternity were part of the Preamble from the start.',
    }),
    sl('example', 'Worked example 1: classify the clauses of Zandria', {
      b: 'Place each imagined clause under the Preamble ideal that it expresses.',
      bl: ['Ask what the clause **protects or promises**', 'Name the **ideal**, then give a **reason**'],
      v: vClassify,
      n: 'Let us classify some imagined clauses of Zandria. A clause protecting the sharing of opinions is liberty. A living wage is economic justice. A vote for every adult is political justice. A school place for every child is equality of opportunity. Teaching the shared story of all communities is fraternity.',
    }),
    sl('check', 'Quick check: match the ideals', {
      b: 'Match each ideal of the Preamble with what it covers.',
      chk: 'mt_ideals',
      n: 'Pair each ideal with what it covers.',
    }),
    sl('concept', 'The Constituent Assembly debates as a source', {
      v: vDebates,
      n: 'The debates of the Constituent Assembly are a source for understanding the ideals behind the Constitution. Members gave reasons for the form of provisions and differed in how they balanced values. Some stressed the liberty of the individual, others the removal of social inequality, and many sought a balance. We read the debates together with the text.',
    }),
    sl('diagram', 'Core features of the political philosophy', {
      v: vWeb,
      n: 'This web shows the core features of the political philosophy. They are individual freedom, social justice, respect for diversity and minority rights, secularism of the Indian kind, universal adult franchise, federalism with special provisions, and one national identity. In this part we study the first four. The rest follow in Part two.',
    }),
    sl('concept', 'Individual freedom', {
      v: vFreedom,
      n: 'Individual freedom means that each person is free to think, speak and act within limits fixed by law. Examples are freedom of expression and protection against arbitrary arrest. This value keeps the power of the state in check. If a trader is held for days without a reason or a hearing, the practice conflicts with this value.',
    }),
    sl('concept', 'Social justice', {
      v: vSocial,
      n: 'Social justice means fair treatment of every group in society, including the removal of long standing exclusion. One means is reservation for Scheduled Castes and Scheduled Tribes, which aims at equality of opportunity. Many see such provisions as a means to equality, and not as a departure from it.',
    }),
    sl('example', 'Worked example 2: the seat scheme of Delvar', {
      b: 'Trace the reasoning behind an imagined seat scheme, and note one view to weigh.',
      bl: ['Link the **scheme** to the **principle**', 'State **both views** without taking a side'],
      v: vDelvar,
      n: 'In the imagined state of Delvar, certain communities were shut out of schooling for generations, so their children start behind in any open competition. A share of college seats is set aside for them. The principle is equality of opportunity, a means to social justice. Some ask how long such a scheme should last. Others stress that opportunity is still unequal.',
    }),
    sl('check', 'Quick check: the 42nd Amendment', {
      b: 'Complete the sentence on the 42nd Amendment.',
      chk: 'fb_42',
      n: 'Recall which words were added to the Preamble, and when.',
    }),
    sl('concept', 'Respect for diversity and minority rights', {
      v: vDiversity,
      n: 'The Constitution respects diversity. It recognises community based rights, such as the rights of religious and linguistic minorities, beside the rights of individuals. For example, minorities may run their own educational institutions. In imagined Orwen, a language community runs schools that teach in its mother tongue.',
    }),
    sl('concept', 'Secularism: a standard definition', {
      v: vSecDef,
      n: 'Secularism is the principle that the state does not identify itself with any one religion and treats all believers and non believers equally. Strict separation keeps state and religion completely apart. The Indian model keeps a principled distance from every religion, and the state may reform or support communities equally where equality requires.',
    }),
    sl('diagram', 'Western and Indian secularism, in brief', {
      v: vSecular,
      n: 'In the Western model, state and religion are kept strictly apart, with little intervention and no support for religious bodies. In the Indian model, the state keeps a principled distance from all religions. It may intervene to reform, for example against untouchability, and it may support all communities equally. A later chapter treats secularism at length.',
    }),
    sl('example', 'Worked example 3: Veldora and Tarsia', {
      b: 'Decide which model each imagined situation suits.',
      bl: ['Does the state **support** or **intervene**?', 'Is **one faith** made official?'],
      v: vSecEx,
      n: 'Veldora gives no funds to any religious body and never interferes. That is strict separation. Tarsia gives equal repair grants to school buildings of all faiths, which is equal support in the Indian model. Tarsia forbids a shrine to turn people away by birth, which is reform by intervention. If a state made one faith official, it would not be secular.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about Indian secularism is true or false.',
      chk: 'tf_secular_sep',
      n: 'Think about what a principled distance allows.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The philosophy of a constitution is the ideals behind its provisions. A constitution reflects values, can transform a society, and limits power. The Preamble names justice, liberty, equality and fraternity. Individual freedom, social justice, respect for diversity and Indian secularism are core features, with a principled distance from religions.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give each ideal its **meaning**, in your own words', 'Date the note: **42nd Amendment, 1976**', 'Say **principled distance** for Indian secularism', 'Add an **example** to each feature'],
      v: vTips1,
      n: 'A few tips. Give each ideal its meaning in your own words. Date the note on the forty second Amendment as nineteen seventy six. For Indian secularism, say principled distance, with reform and equal support. And add an example to each feature that you list.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Philosophy of the Constitution, Part 2: Franchise, Federalism, Procedure, Criticisms and Limitations',
  goals: [
    'Explain universal adult franchise and why it is called a bold step',
    'Describe federalism with special provisions and the idea of national identity',
    'State the procedural achievements: deliberation, compromise and consensus',
    'State the criticisms of unwieldy, unrepresentative and alien, each with its reply',
    'State the limitations the textbook notes and weigh them with reasons',
  ],
  slides: [
    sl('title', 'Franchise, Procedure, Criticisms and Limitations', {
      b: 'Part 2: **franchise**, **federalism**, **national identity**, the **procedure** of the Assembly, and the **criticisms** and **limitations**.',
      v: flow('LR', ['Universal adult franchise', 'Federalism and identity', 'Procedure', 'Criticisms and replies', 'Limitations'], 'Route map of Part 2: universal adult franchise, federalism and identity, procedure, criticisms and replies, and limitations', 'Part 2 at a glance'),
      n: 'In Part one we studied four core features. In this part we study the rest: the vote for every adult, federalism, national identity, and the way the Assembly worked. Then we look at the criticisms that critics have made, the replies, and the limitations that the textbook notes.',
    }),
    sl('concept', 'Universal adult franchise', {
      v: vFranchise,
      n: 'Universal adult franchise means that every adult citizen may vote, with no test of wealth, schooling, caste, gender or religion. It was adopted from the start. The voting age was first twenty one years and was lowered to eighteen years by the sixty first Amendment of nineteen eighty eight. It expresses political equality.',
    }),
    sl('concept', 'Why the vote for all was a bold step', {
      v: vBold,
      n: 'In many Western countries the vote was first limited by property, sex or other tests, and it was widened in stages over a long period. Some groups waited for generations. In India every adult citizen could vote from the first elections, and women and men voted alike. That is why the step is called bold.',
    }),
    sl('example', 'Worked example 1: Halcor and Mirenia', {
      b: 'Compare an imagined staged extension of the vote with the vote for all adults at once.',
      bl: ['Which group got the vote **first**?', 'What did Mirenia **do differently**?'],
      v: vHalcor,
      n: 'In imagined Halcor, the vote goes first to men with large landholdings, then to all men, then to women with conditions. In imagined Mirenia, every adult has the vote at the first election, even though most voters had never been to school. Mirenia trusts every adult as an equal citizen from the start.',
    }),
    sl('check', 'Quick check: put in order', {
      b: 'Arrange the imagined stages in the extension of the vote in Halcor.',
      chk: 'ord_franchise',
      n: 'Think about which group is narrowest and which is widest.',
    }),
    sl('concept', 'Federalism and special provisions', {
      v: vFed,
      n: 'In federalism, power is shared between the Union and the states, each with its own government. It lets regions of different languages and cultures govern themselves within one country. Some states have special provisions that others do not, under Article three hundred and seventy one and related Articles. Their purpose is to meet the particular needs of those states.',
    }),
    sl('check', 'Quick check: special provisions', {
      b: 'Special provisions for certain states, under Article 371 and related Articles, belong to which approach?',
      chk: 'm_asym',
      n: 'Think about arrangements that are not alike for every state.',
    }),
    sl('concept', 'National identity beside other identities', {
      v: vNat,
      n: 'The Constitution holds that there is one national identity for all citizens. Regional, linguistic and religious identities continue beside it. A citizen need not give up a local identity to belong to the nation. An imagined student of Kalmar speaks her mother tongue at home and shares a national identity at school.',
    }),
    sl('concept', 'Procedural achievements', {
      v: vProcTab,
      n: 'The Constitution was made with faith in deliberation, so disputes were to be settled by discussion and reasons. There was a spirit of compromise and accommodation, in which each side gave something. And decisions were taken by consensus wherever possible, meaning agreement of all or nearly all, instead of a bare majority.',
    }),
    sl('diagram', 'A clause travels through an assembly', {
      v: vProc,
      n: 'This flow shows the procedure in an imagined assembly. A clause is proposed. Members debate it openly. A compromise wording is drawn up to meet the main concerns. The clause is then adopted, by consensus where possible. This is the spirit of deliberation and accommodation at work.',
    }),
    sl('check', 'Quick check: the procedure', {
      b: 'Arrange the steps through which a disputed clause would ordinarily travel in an imagined assembly.',
      chk: 'ord_consensus',
      n: 'Think about which step comes first, and which comes last.',
    }),
    sl('diagram', 'Criticisms and replies', {
      v: vCrit,
      n: 'This chart sets three criticisms beside their replies. Critics have argued that the Constitution is unwieldy, that it is unrepresentative, and that it is alien. The replies are that the detail reflects the needs of India, that the members held diverse opinions and the debates were open, and that ideas were adapted to Indian conditions.',
    }),
    sl('concept', 'Criticism one: unwieldy', {
      v: vUnwieldy,
      n: 'Critics have argued that the Constitution is unwieldy, because it is very long and detailed. The reply is that its length reflects the needs of India, a large and diverse country, and that much detail is usual in constitutions that set out powers and rights clearly.',
    }),
    sl('concept', 'Criticism two: unrepresentative', {
      v: vUnrep,
      n: 'Critics have argued that the Constituent Assembly was elected on a limited franchise and not by universal adult franchise, so it was unrepresentative. The reply is that its members held diverse opinions and its debates were open, so many views were heard. Students should judge with reasons how far the replies meet the criticism.',
    }),
    sl('concept', 'Criticism three: alien', {
      v: vAlien,
      n: 'Critics have argued that the Constitution is alien, because many provisions were borrowed from other countries. The reply is that borrowed ideas were adapted to Indian conditions and joined with the ideals of the national movement. A student may ask whether an idea is foreign if it is shaped to fit local needs.',
    }),
    sl('example', 'Worked example 2: plan a five mark answer', {
      b: 'Plan an answer on the criticisms and their replies.',
      bl: ['Pair each **criticism** with its **reply**', 'End with a **reasoned judgement**'],
      v: vPlan,
      n: 'To plan a five mark answer on criticisms, begin with one line: critics have argued three things. Then give unwieldy with its reply, unrepresentative with its reply, and alien with its reply. End with a judgement, weighing the replies with a reason. Write it in your own words.',
    }),
    sl('check', 'Quick check: the reply', {
      b: 'Which reply is commonly given to the criticism that the Constitution is alien?',
      chk: 'm_alien',
      n: 'Recall the reply about borrowed ideas.',
    }),
    sl('concept', 'Limitations noted by the textbook', {
      v: vLimits,
      n: 'The textbook notes three limitations. First, some critics see a centralised notion of national unity. Second, some issues of gender justice, for example within the family, were not fully addressed. Third, some social and economic rights were placed in the Directive Principles and not among the Fundamental Rights.',
    }),
    sl('example', 'Worked example 3: reading an imagined letter', {
      b: 'An imagined student letter raises three points. Name the limitation in each, and a view to weigh.',
      bl: ['Match each **point** to a **limitation**', 'Add a **view** that a defender might offer'],
      v: vLetter,
      n: 'In an imagined letter, a student raises three points. Matters inside the family not fully addressed is a gender justice limitation. An adequate livelihood as a guiding principle only is about rights placed in the Directive Principles. The Union carrying much weight in unity is a centralised notion of unity. Each comes with a view to weigh.',
    }),
    sl('concept', 'Weighing the achievements and the questions', {
      v: vWeigh,
      n: 'A fair account weighs the achievements against the questions that critics raise. Liberty, equality and justice are set as ideals, every adult has the vote from the start, and diversity is respected beside one national identity. Critics ask about gender justice, about rights in the Directive Principles, and about centralised unity. Students should weigh both sides with reasons.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Universal adult franchise from the start was a bold step. Federalism includes special provisions for some states, and one national identity stands beside other identities. The Assembly worked by deliberation, compromise and consensus. Critics have argued that the Constitution is unwieldy, unrepresentative and alien, and each criticism has a reply. The textbook notes three limitations.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Pair each **criticism** with its **reply**', 'Write **critics have argued**, then weigh with reasons', 'Give the **voting age** facts with their dates', 'Name the **three limitations** exactly'],
      v: vTips2,
      n: 'A few tips. Pair each criticism with its reply. Write critics have argued, and then weigh both sides with reasons. Name the three limitations exactly. And when you write on the vote, remember that universal adult franchise was adopted from the start, while the Assembly itself rested on a limited franchise.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Philosophy of the Constitution: Notes',
  sections: [
    {
      h: '1. What is the philosophy of a constitution?',
      t: 1,
      b: 'A **constitution** is the basic document that sets up the institutions of a state, states their powers and the rights of citizens. The **philosophy of a constitution** is the set of **ideals and moral values** behind its provisions. A constitution can **reflect moral values**, be a **means of democratic transformation** (changing an unequal society by lawful means) and **limit power** (bind those who govern, even a majority).\n\nThe **debates of the Constituent Assembly** are a source for the ideals and reasons of the members, read together with the text.',
      terms: [
        ['Constitution', 'The basic document that sets up the institutions of a state, states their powers and lays down the rights of citizens.'],
        ['Philosophy of a constitution', 'The ideals and moral values behind its provisions, which explain why they take the form they do.'],
        ['Democratic transformation', 'The change of an unequal society towards equality by lawful and peaceful means under a constitution.'],
      ],
      v: vMeaning,
      vs: [vRoles, vDebates],
    },
    {
      h: '2. The Preamble and its ideals',
      t: 1,
      b: 'The Preamble describes the state as **sovereign, socialist, secular, democratic and a republic**. Its ideals are **justice** (**social, economic and political**), **liberty** (of **thought, expression, belief, faith and worship**), **equality** (of **status and of opportunity**) and **fraternity** (assuring the **dignity of the individual** and the **unity and integrity of the nation**).\n\n**Dated note:** the words **socialist, secular and integrity** were added by the **42nd Amendment (1976)**.',
      terms: [
        ['Justice', 'The ideal of fairness in society, in economic life and in public affairs: social, economic and political.'],
        ['Liberty', 'The ideal of freedom of thought, expression, belief, faith and worship.'],
        ['Equality', 'The ideal of equal standing for every person (status) and a fair chance to develop (opportunity).'],
        ['Fraternity', 'The ideal of a sense of belonging together that assures the dignity of the individual and the unity and integrity of the nation.'],
      ],
      v: vIdeals,
      vs: [vPre, vClassify],
    },
    {
      h: '3. Individual freedom and social justice',
      t: 1,
      b: '**Individual freedom:** each person is free to think, speak and act within limits fixed by law. Examples: **freedom of expression** and **protection against arbitrary arrest** (Articles 19 and 22).\n\n**Social justice:** fair treatment of every group, including the removal of long-standing exclusion. **Reservations for Scheduled Castes and Scheduled Tribes** are a means to **equality of opportunity**.',
      terms: [
        ['Individual freedom', 'The value that each person is free to think, speak and act within limits fixed by law.'],
        ['Social justice', 'Fair treatment of every group in society, including the removal of long-standing exclusion.'],
        ['Reservation', 'A provision that sets aside a share of seats or posts for certain groups as a means to equality of opportunity.'],
      ],
      v: vWeb,
      vs: [vFreedom, vSocial, vDelvar],
    },
    {
      h: '4. Diversity, minority rights and secularism',
      t: 1,
      b: 'The Constitution **respects diversity** and recognises **community-based rights**, such as the right of religious and linguistic minorities to **run educational institutions** (Article 30), beside individual rights.\n\n**Secularism** is the principle that the state does not identify itself with any one religion and treats all believers and non-believers equally. The **Indian model** keeps a **principled distance** from all religions: the state may **intervene to reform** (for example against untouchability) or **support communities equally**, unlike strict separation. Secularism is studied in depth in a later chapter.',
      terms: [
        ['Minority rights', 'Rights of religious and linguistic minorities, for example to run their own educational institutions.'],
        ['Community-based rights', 'Rights held by communities and not only by individuals.'],
        ['Secularism', 'The principle that the state does not identify with any one religion and treats all believers and non-believers equally.'],
        ['Principled distance', 'The Indian way of keeping apart from every religion on a principle of equal respect, which allows reform or equal support.'],
      ],
      v: vSecular,
      vs: [vDiversity, vSecDef, vSecEx],
    },
    {
      h: '5. Franchise, federalism, identity and procedure',
      t: 1,
      b: '**Universal adult franchise** gives every adult citizen the vote, with no test of wealth, schooling, caste, gender or religion (Article 326). It was adopted **from the start**, a **bold step** beside the **gradual extension** of the vote in many Western countries. The voting age was 21 years, lowered to **18 years** by the **61st Amendment (1988)**.\n\n**Federalism** shares power between the Union and the states, with **special provisions** for some states (**Article 371** and related Articles): **asymmetric** arrangements. There is **one national identity** beside regional, linguistic and religious identities.\n\n**Procedural achievements:** **faith in deliberation**, a **spirit of compromise and accommodation**, and **consensus** wherever possible.',
      terms: [
        ['Universal adult franchise', 'The right of every adult citizen to vote, with no test of wealth, schooling, caste, gender or religion.'],
        ['Asymmetric federalism', 'An arrangement in which not all units of a federation are treated alike, because some have special provisions.'],
        ['National identity', 'The sense of belonging to the nation, which in India exists beside regional, linguistic and religious identities.'],
        ['Consensus', 'Agreement of all or nearly all members, reached by discussion, instead of a bare majority.'],
      ],
      v: vBold,
      vs: [vFranchise, vHalcor, vFed, vNat, vProcTab],
    },
    {
      h: '6. Criticisms and replies',
      t: 1,
      b: 'Critics have argued that the Constitution is:\n\n- **Unwieldy**: very long and detailed. **Reply:** the length reflects India\'s needs, and much detail is usual.\n- **Unrepresentative**: the Assembly was elected on a **limited franchise** and not by universal adult franchise. **Reply:** its members held **diverse opinions** and the **debates were open**.\n- **Alien**: many provisions were **borrowed**. **Reply:** ideas were **adapted** to Indian conditions and to the **ideals of the national movement**.\n\nStudents should weigh each reply with reasons.',
      terms: [
        ['Unwieldy', 'The criticism that the Constitution is too long and detailed to be easily followed.'],
        ['Unrepresentative', 'The criticism that the Constituent Assembly, elected on a limited franchise, did not speak for everyone.'],
        ['Alien', 'The criticism that the Constitution is foreign because many of its provisions were borrowed.'],
      ],
      v: vCrit,
      vs: [vUnwieldy, vUnrep, vAlien, vPlan],
    },
    {
      h: '7. Limitations',
      t: 1,
      b: 'The textbook notes three limitations:\n\n- A **centralised notion of national unity**.\n- Some issues of **gender justice**, for example **within the family**, were **not fully addressed**.\n- Some **social and economic rights** were placed in the **Directive Principles** and not among the **Fundamental Rights**.\n\nA fair account weighs these limitations against the achievements, with reasons.',
      terms: [
        ['Gender justice', 'Fair and equal treatment of women and men in law and in social life.'],
        ['Directive Principles', 'Guiding principles for the state that are not enforceable in court in the way that Fundamental Rights are.'],
      ],
      v: vLimits,
      vs: [vLetter, vWeigh],
    },
  ],
  tips: '**Common mistakes**\n- Quoting the Preamble from memory: name the ideals and give their meaning in your own words.\n- Saying the 42nd Amendment added justice or liberty: it added socialist, secular and integrity in 1976.\n- Saying Indian secularism is strict separation: it is a principled distance, with reform and equal support.\n- Giving a criticism without its reply, or taking a side on a debated point: write critics have argued, give the reply, then weigh with reasons.\n- Confusing the vote and the Assembly: universal adult franchise was adopted from the start, while the Assembly was elected on a limited franchise.\n\n**Tips:** support each feature with an example; pair every criticism with a reply; give dates (1976, 1988); use imagined cases for comparisons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is a **constitution**?', 'The basic document that sets up the institutions of a state, states their powers and lays down the rights of citizens.', 'definition'],
  ['What is the **philosophy of a constitution**?', 'The ideals and moral values behind its provisions.', 'definition'],
  ['Name three roles of a constitution', 'It reflects moral values, can be a means of democratic transformation, and limits power.', 'concept'],
  ['What is **democratic transformation**?', 'The change of an unequal society towards equality by lawful and peaceful means under a constitution.', 'definition'],
  ['Why are the **Constituent Assembly debates** useful here?', 'They show the ideals and reasons that members gave for provisions.', 'concept'],
  ['Words describing the nature of the state in the Preamble', 'Sovereign, socialist, secular, democratic, republic.', 'fact'],
  ['Which words did the **42nd Amendment (1976)** add to the Preamble?', 'Socialist, secular and integrity.', 'fact'],
  ['Three forms of **justice**', 'Social, economic and political.', 'fact'],
  ['What does **liberty** cover?', 'Thought, expression, belief, faith and worship.', 'fact'],
  ['Two kinds of **equality**', 'Equality of status and equality of opportunity.', 'fact'],
  ['What does **fraternity** assure?', 'The dignity of the individual and the unity and integrity of the nation.', 'fact'],
  ['What is **individual freedom**?', 'The value that each person is free to think, speak and act within limits fixed by law.', 'definition'],
  ['Two examples of individual freedom', 'Freedom of expression and protection against arbitrary arrest.', 'fact'],
  ['What is **social justice**?', 'Fair treatment of every group, including the removal of long-standing exclusion.', 'definition'],
  ['Why are **reservations** provided for Scheduled Castes and Scheduled Tribes?', 'As a means to equality of opportunity for groups that suffered long exclusion.', 'concept'],
  ['What are **community-based rights**?', 'Rights held by communities, such as religious and linguistic minorities, beside individual rights.', 'definition'],
  ['What may minorities do under **Article 30**?', 'Run their own educational institutions.', 'fact'],
  ['Define **secularism**', 'The principle that the state does not identify with any one religion and treats all believers and non-believers equally.', 'definition'],
  ['What is **principled distance**?', 'The Indian way of keeping apart from every religion on a principle of equal respect.', 'definition'],
  ['How does the Indian model differ from strict separation?', 'The state may intervene to reform, for example against untouchability, or support communities equally.', 'concept'],
  ['What is **universal adult franchise**?', 'The right of every adult citizen to vote, with no test of wealth, schooling, caste, gender or religion.', 'definition'],
  ['Why was the vote for all adults a **bold step**?', 'In many Western countries the vote was extended only gradually, in stages.', 'concept'],
  ['Which Amendment lowered the voting age to 18 years?', 'The 61st Amendment (1988).', 'fact'],
  ['What is **asymmetric federalism**?', 'An arrangement in which some units have special provisions that others do not.', 'definition'],
  ['Which Articles give special provisions to certain states?', 'Article 371 and related Articles.', 'fact'],
  ['How does the Constitution see **national identity**?', 'One national identity beside regional, linguistic and religious identities.', 'concept'],
  ['Name the procedural achievements', 'Faith in deliberation, compromise and accommodation, and consensus wherever possible.', 'concept'],
  ['Criticism: **unwieldy**, and the reply', 'It is long and detailed; the reply is that it reflects India\'s needs and that much detail is usual.', 'concept'],
  ['Criticism: **unrepresentative**, and the reply', 'The Assembly was elected on a limited franchise; the reply is that members held diverse opinions and debates were open.', 'concept'],
  ['Criticism: **alien**, and the reply', 'Many provisions were borrowed; the reply is that they were adapted to Indian conditions and the ideals of the national movement.', 'concept'],
  ['Three limitations noted by the textbook', 'A centralised notion of national unity; gender justice within the family not fully addressed; some social and economic rights in the Directive Principles.', 'concept'],
].map(([a, b, c], i) => [a, b, c, i < 20 ? 1 : 1]));

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): The Philosophy of the Constitution',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_just_classify', 'm_ind_arrest_app', 'm_secular_support_app', 'ar_limit'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_limit', 's_minority', 's3_social_justice'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_ideals', 'l_diversity'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_clauses'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): The Philosophy of the Constitution',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_transform', 'm_eq_opp', 'm_secular_model_app', 'm_franchise_compare', 'm_proc_app', 'm_crit_reply_app', 'm_lim_dp', 'm_minority_app', 'ar_secular', 'ar_reserve'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_means', 's_pre_nature', { attempt: 1, keys: ['s_franchise', 's_justice_forms'] }, 's3_secular_compare', { attempt: 1, keys: ['s3_unrep', 's3_limits'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_core', { attempt: 1, keys: ['l_criticisms', 'l_limits'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_secular', 'c_franchise'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-11-political-science-ch10 only (political philosophy and core features of the Constitution)',
    originality: 'every passage (charter table, handbook table, classroom discussion, newspaper report, letter) and every country, state, school and person is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution or Preamble text, no Constituent Assembly debate text, no board item reused (D-036)',
    facts: 'stable facts only: Preamble key words; 42nd Amendment 1976 (socialist, secular, integrity); Articles 19, 22, 30, 326, 371; universal adult franchise from the start, voting age 21 lowered to 18 by the 61st Amendment 1988; textbook criticisms and limitations',
    neutrality: 'no map, no party, no current office-holder or present-day dispute named; criticisms framed as critics have argued, with replies; reservations stated as a means to equality of opportunity with both views to weigh; secularism kept brief and defined',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
