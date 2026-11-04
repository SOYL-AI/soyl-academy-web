// Build CBSE 11 Political Science ch18 Secularism. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch18/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch18', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vDomination = (() => {
  const s = new Svg(760, 420);
  const col = (x, name, c, lines) => {
    s.rect(x, 10, 360, 270, { color: c, sw: 2.5 });
    s.text(x + 180, 38, name, { bold: true, size: 17, color: c });
    lines.forEach((ln, j) => s.text(x + 180, 78 + j * 28, ln, { size: 14, bold: j === 0 }));
  };
  col(10, 'Inter-religious domination', 'blue', ['One community dominates another', 'Between communities', 'Imagined: a Sunhold trust keeps the', 'Tessel community out of a market hall', 'in the town of Ashvale']);
  col(390, 'Intra-religious domination', 'green', ['Domination inside one community', 'By caste or gender, for example', 'Imagined: a Rivermark council bars', 'women from reading aloud at its', 'gatherings in the town of Quillfield']);
  s.rect(10, 310, 740, 100, { color: 'accent', sw: 2.5 });
  s.text(380, 338, 'Secularism opposes both kinds', { bold: true, size: 16, color: 'accent' });
  s.text(380, 366, 'Freedom within religions and equality between them', { size: 14 });
  s.text(380, 390, 'State power kept apart from the control of any religious group', { size: 14 });
  return s.visual('Chart of the two kinds of religious domination. Inter-religious domination is one community dominating another, between communities, for example an imagined Sunhold trust keeping the Tessel community out of a market hall in the town of Ashvale. Intra-religious domination is domination inside one community, by caste or gender for example, such as an imagined Rivermark council barring women from reading aloud at its gatherings in the town of Quillfield. Secularism opposes both kinds: freedom within religions, equality between them, and state power kept apart from the control of any religious group', 'Two kinds of religious domination, with imagined examples.');
})();

const vModels = (() => {
  const s = new Svg(760, 440);
  const col = (x, name, c, lines) => {
    s.rect(x, 10, 360, 300, { color: c, sw: 2.5 });
    s.text(x + 180, 38, name, { bold: true, size: 17, color: c });
    lines.forEach((ln, j) => s.text(x + 180, 78 + j * 28, ln, { size: 14, bold: j === 0 }));
  };
  col(10, 'Western model, as commonly taught', 'blue', ['Mutual exclusion', 'State and religion keep apart', 'Focus on individual freedom', 'and equality', 'Little room for community rights', 'Often cited: United States, France']);
  col(390, 'Indian model', 'green', ['Principled distance', 'State may intervene on principle', 'to promote freedom and equality', 'Equal respect, community support', 'Articles 17, 25 to 28 and 30', 'No state religion']);
  s.rect(10, 340, 740, 90, { color: 'accent', sw: 2.5 });
  s.text(380, 368, 'Common ground in a secular state', { bold: true, size: 16, color: 'accent' });
  s.text(380, 396, 'No official religion and no discrimination on grounds of religion', { size: 14 });
  return s.visual('Comparison chart of two models of secularism. The Western model, as commonly taught: mutual exclusion, state and religion keep apart; focus on individual freedom and equality; little room for community rights; the United States and France are often cited. The Indian model: principled distance, the state may intervene on principle to promote freedom and equality; equal respect and community support; Articles 17, 25 to 28 and 30; no state religion. Common ground in a secular state: no official religion and no discrimination on grounds of religion', 'Western and Indian models compared.');
})();

const vPD = (() => {
  const s = new Svg(760, 470);
  s.rect(180, 10, 400, 56, { color: 'accent', sw: 2.5 });
  s.text(380, 38, 'A practice in a religion or a religious body', { bold: true, size: 15, color: 'accent' });
  s.arrow(380, 66, 380, 100, { sw: 2 });
  s.rect(130, 100, 500, 60, { color: 'blue', sw: 2.5 });
  s.text(380, 130, 'Does it deny people freedom or equality?', { bold: true, size: 16, color: 'blue' });
  s.arrow(300, 160, 180, 210, { sw: 2 });
  s.arrow(460, 160, 580, 210, { sw: 2 });
  s.rect(10, 210, 340, 100, { color: 'green', sw: 2.5 });
  s.text(180, 238, 'No', { bold: true, size: 16, color: 'green' });
  s.text(180, 266, 'The state keeps its distance', { size: 14 });
  s.text(180, 290, 'Belief and ritual are left alone', { size: 14 });
  s.rect(410, 210, 340, 100, { color: 'brown', sw: 2.5 });
  s.text(580, 238, 'Yes', { bold: true, size: 16, color: 'brown' });
  s.text(580, 266, 'The state may intervene on principle', { size: 14 });
  s.text(580, 290, 'The aim is freedom and equality', { size: 14 });
  s.arrow(580, 310, 580, 340, { sw: 2 });
  s.rect(10, 340, 740, 120, { color: 'accent', sw: 2.5 });
  s.text(380, 366, 'Examples of principled intervention', { bold: true, size: 15, color: 'accent' });
  s.text(380, 392, 'Article 17 abolishes untouchability', { size: 14 });
  s.text(380, 416, 'Imagined: the Linden Shrine in Dunmere must admit every hereditary group', { size: 14 });
  s.text(380, 440, 'Equal support for all communities goes with it, as under Article 30', { size: 14 });
  return s.visual('Flow chart of principled distance. A practice in a religion or a religious body is tested by the question: does it deny people freedom or equality? If no, the state keeps its distance and belief and ritual are left alone. If yes, the state may intervene on principle, and the aim is freedom and equality. Examples of principled intervention: Article 17 abolishes untouchability; imagined, the Linden Shrine in Dunmere must admit every hereditary group; equal support for all communities goes with it, as under Article 30', 'When and why the state intervenes under principled distance.');
})();

const vCrit = (() => {
  const s = new Svg(760, 480);
  s.text(175, 24, 'Critics have argued', { bold: true, size: 16, color: 'blue' });
  s.text(585, 24, 'Supporters respond', { bold: true, size: 16, color: 'green' });
  const rows = [
    ['Anti-religious', 'It is hostile to religion', 'It opposes domination, not religion', 'Freedom of religion is protected'],
    ['A Western import', 'It is borrowed from elsewhere', 'It grew from India\'s own diversity', 'It differs from the Western model'],
    ['Minoritism', 'It favours minorities', 'Minority rights protect the vulnerable', 'They are part of equal respect'],
    ['Interventionist', 'It interferes in communities', 'Intervention promotes equality', 'and freedom, as with untouchability'],
    ['Vote-bank politics', 'It rewards groups for votes', 'Groups organising is part of democracy', 'The concern is neglect of others'],
    ['An impossible project', 'Differences run too deep', 'An ambitious ideal that keeps societies', 'together; partial success counts'],
  ];
  rows.forEach(([name, claim, r1, r2], i) => {
    const y = 44 + i * 72;
    s.rect(10, y, 330, 62, { color: 'blue', sw: 2 });
    s.text(175, y + 22, name, { bold: true, size: 14, color: 'blue' });
    s.text(175, y + 46, claim, { size: 13 });
    s.arrow(342, y + 31, 418, y + 31, { sw: 2 });
    s.rect(420, y, 330, 62, { color: 'green', sw: 2 });
    s.text(585, y + 22, r1, { size: 13 });
    s.text(585, y + 46, r2, { size: 13 });
  });
  return s.visual('Chart of six criticisms of Indian secularism and the replies. Anti-religious: critics say it is hostile to religion; supporters respond that it opposes domination, not religion, and freedom of religion is protected. A Western import: critics say it is borrowed from elsewhere; supporters respond that it grew from India\'s own diversity and differs from the Western model. Minoritism: critics say it favours minorities; supporters respond that minority rights protect the vulnerable and are part of equal respect. Interventionist: critics say it interferes in communities; supporters respond that intervention promotes equality and freedom, as with untouchability. Vote-bank politics: critics say it rewards groups for votes; supporters respond that groups organising is part of democracy and the concern is neglect of others. An impossible project: critics say differences run too deep; supporters respond that it is an ambitious ideal that keeps societies together and partial success counts', 'Six criticisms and the replies of supporters.');
})();

// ---------------------------------------------------------------- tables: Part 1
const tDom = table(
  ['Kind of domination', 'Meaning', 'Imagined case'],
  [
    ['Inter-religious', 'One religious community dominating another', 'A Sunhold trust keeps the Tessel community out of the market hall in Ashvale'],
    ['Intra-religious', 'Domination within a religious community, for example by caste or gender', 'A Rivermark council bars women from reading aloud at its gatherings in Quillfield'],
  ],
  'Table of two kinds of religious domination: inter-religious, one community dominating another, for example an imagined Sunhold trust keeping the Tessel community out of a market hall in Ashvale; intra-religious, domination within a community, for example by caste or gender, such as an imagined Rivermark council barring women from reading aloud in Quillfield',
  'The towns, faiths and councils are imagined.',
);
const tDef = table(
  ['Point', 'Secularism'],
  [
    ['Standard definition', 'A normative doctrine that seeks a society free from both inter-religious and intra-religious domination'],
    ['What it promotes', 'Freedom within religions and equality between them'],
    ['What it needs of the state', 'State power kept apart from the control of any religious group'],
    ['Meaning of normative', 'It states how things ought to be, and not only how they are'],
  ],
  'Table on the standard definition of secularism: a normative doctrine that seeks a society free from both inter-religious and intra-religious domination; it promotes freedom within religions and equality between them; state power is kept apart from the control of any religious group; normative means it states how things ought to be',
);
const tClassify = table(
  ['Imagined statement in Ashvale', 'Kind of domination', 'Reason'],
  [
    ['A hall committee of one faith refuses a hall to another faith for its festival', 'Inter-religious', 'One community over another'],
    ['A council of a faith forbids its own women to lead prayers', 'Intra-religious (gender)', 'Inside one community, based on gender'],
    ['An elder fines families who dine with other hereditary groups of the same faith', 'Intra-religious (caste-like)', 'Inside one community, based on birth into a group'],
    ['A trust of one faith lets only its own processions use the main street', 'Inter-religious', 'One community over another in a shared space'],
  ],
  'Worked example table classifying imagined statements in Ashvale: a hall committee refusing a hall to another faith is inter-religious domination; a council forbidding its own women to lead prayers is intra-religious by gender; an elder fining families who dine with other hereditary groups of the same faith is intra-religious on the basis of birth into a group; a trust letting only its own processions use the main street is inter-religious',
  'The statements and the town are imagined.',
);
const tSecState = table(
  ['Feature of a secular state', 'What it means'],
  [
    ['Not run by any religious group', 'Religious leaders or bodies do not hold state power as such'],
    ['No official religion', 'The state does not name any religion as its own'],
    ['No discrimination on grounds of religion', 'Citizens are treated alike whatever faith they follow'],
    ['Imagined contrast', 'Meridan names the Sunhold faith its official religion; it cannot be called secular in this sense'],
  ],
  'Table of features of a secular state: not run by any religious group; no official religion; no discrimination on grounds of religion; imagined contrast, Meridan names the Sunhold faith its official religion and cannot be called secular in this sense',
  'Meridan is imagined.',
);
const tWest = table(
  ['Feature', 'Western model, as commonly taught'],
  [
    ['Core idea', 'Mutual exclusion: the state does not interfere in religion and religion does not interfere in the state'],
    ['Focus', 'Individual freedom and equality'],
    ['Community rights', 'Little room for rights based on a community'],
    ['Examples often given', 'The United States and France, which differ from each other in detail'],
    ['Imagined case', 'Calendra gives no grant to any religious body and no religious body takes part in lawmaking'],
  ],
  'Table on the Western model as commonly taught: mutual exclusion, the state does not interfere in religion and religion does not interfere in the state; focus on individual freedom and equality; little room for community rights; the United States and France are often given as examples and differ in detail; imagined Calendra gives no grant to any religious body and no religious body takes part in lawmaking',
  'Calendra is imagined.',
);
const tIndia = table(
  ['Feature', 'Indian model'],
  [
    ['Core idea', 'Principled distance: the state keeps a distance from all religions but may intervene on principle'],
    ['Aim of intervention', 'To promote freedom and equality'],
    ['Equal respect', 'All religions are respected, and communities are supported on an equal footing'],
    ['Freedom of religion', 'Articles 25 to 28'],
    ['State religion', 'None'],
  ],
  'Table on the Indian model: principled distance, the state keeps a distance from all religions but may intervene on principle; the aim of intervention is to promote freedom and equality; equal respect for all religions and support for communities on an equal footing; freedom of religion in Articles 25 to 28; no state religion',
);
const tPD = table(
  ['Point', 'Principled distance'],
  [
    ['Meaning', 'A distance from all religions, with intervention allowed on principle'],
    ['The principle', 'Freedom and equality of people, within and between communities'],
    ['Example of intervention', 'Abolition of untouchability (Article 17); opening places of worship to all castes'],
    ['Example of support', 'Minorities may run educational institutions (Article 30), with all communities on an equal footing'],
    ['Associated with', 'The political theorist Rajeev Bhargava'],
  ],
  'Table on principled distance: a distance from all religions, with intervention allowed on principle; the principle is freedom and equality of people within and between communities; intervention example is abolition of untouchability under Article 17 and opening places of worship to all castes; support example is Article 30 for minority educational institutions; the term is associated with the political theorist Rajeev Bhargava',
);
const tShrine = table(
  ['Step', 'Imagined case: the Linden Shrine in Dunmere'],
  [
    ['1. The practice', 'A trust keeps the Ostler group, a hereditary group within the Rivermark community, out of the inner hall'],
    ['2. The kind of domination', 'Intra-religious: it happens inside one community, by birth into a group'],
    ['3. The question', 'Does it deny people equality? Yes, it denies entry on grounds of birth'],
    ['4. The Indian answer', 'Principled distance lets the state act, as Article 17 acts against untouchability'],
    ['5. The limit', 'The state opens entry to all groups and leaves belief and worship to the community'],
  ],
  'Worked example table on the imagined Linden Shrine in Dunmere: a trust keeps the Ostler group, a hereditary group within the Rivermark community, out of the inner hall; this is intra-religious domination by birth into a group; it denies equality; principled distance lets the state act, as Article 17 acts against untouchability; the state opens entry to all groups and leaves belief and worship to the community',
  'The shrine, the town and the groups are imagined.',
);
const tProvisions = table(
  ['Provision', 'What it provides, in brief'],
  [
    ['Preamble', 'Describes India as secular; the word was added by the 42nd Amendment, 1976'],
    ['Article 15', 'No discrimination on grounds of religion, race, caste, sex or place of birth'],
    ['Article 17', 'Abolishes untouchability and forbids its practice'],
    ['Articles 25 to 28', 'Freedom of religion, management of religious affairs, no tax for promoting a religion, and a rule on religious instruction in institutions wholly funded by the state'],
    ['Article 30', 'Religious and linguistic minorities may set up and run educational institutions of their choice'],
    ['From the start', 'The Constitution was secular in its provisions from 1950; the Preamble word came later'],
  ],
  'Table of constitutional provisions on secularism: the Preamble describes India as secular, the word added by the 42nd Amendment in 1976; Article 15 bars discrimination on grounds of religion, race, caste, sex or place of birth; Article 17 abolishes untouchability; Articles 25 to 28 deal with freedom of religion; Article 30 lets religious and linguistic minorities run educational institutions; the Constitution was secular in its provisions from the start',
  'The Constitution came into force on 26 January 1950.',
);
const tChoose = table(
  ['Point', 'Imagined Torvia chooses between two models'],
  [
    ['The country', 'Torvia, whose people follow the Sunhold, Rivermark and Tessel faiths and belong to several hereditary groups'],
    ['Model P: mutual exclusion', 'The state keeps out of religion; individual freedom is the focus'],
    ['Model Q: principled distance', 'The state keeps a distance but may act on principle for freedom and equality; equal respect for all faiths'],
    ['The test case', 'A shrine bars a hereditary group: Model P gives the state little ground to act, Model Q allows action on equality'],
    ['A fair conclusion', 'Q answers domination inside religions better; some may fear excess intervention, which clear principles can limit'],
  ],
  'Worked example table on imagined Torvia choosing between two models: Model P is mutual exclusion; Model Q is principled distance; in the test case of a shrine barring a hereditary group, Model P gives the state little ground to act and Model Q allows action on equality; Q answers domination inside religions better, though some may fear excess intervention, which clear principles can limit',
  'Torvia and the models P and Q are imagined.',
);
const tSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Domination', 'Inter-religious (between communities) and intra-religious (within, by caste or gender)'],
    ['Secularism', 'Society free from both kinds; freedom within religions and equality between them'],
    ['Secular state', 'Not run by a religious group; no official religion; no discrimination on grounds of religion'],
    ['Western model', 'Mutual exclusion; individual focus; little room for community rights'],
    ['Indian model', 'Principled distance; equal respect; Articles 17, 25 to 28, 30; no state religion'],
    ['Preamble', 'Word secular added by the 42nd Amendment, 1976; secular in provisions from the start'],
  ],
  'Summary table of Part 1: domination, secularism, secular state, Western model, Indian model and the Preamble',
);
const tTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Saying secularism means opposing religion', 'Say it opposes domination, between and within religions'],
    ['Describing only inter-religious domination', 'Include intra-religious domination, for example by caste or gender'],
    ['Saying the Indian state keeps total separation', 'Say principled distance allows intervention on principle for freedom and equality'],
    ['Saying secular was in the Constitution only from 1976', 'Say the word was added in 1976 and the provisions were secular from the start'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables: Part 2
const tHow = table(
  ['Step', 'How the criticisms are weighed'],
  [
    ['1. Critics have argued', 'State the criticism fairly, in its strongest form'],
    ['2. Supporters respond', 'Give the reply and its reasons'],
    ['3. Test', 'Try both against an example'],
    ['4. Judge', 'Decide with reasons, and note what remains open'],
  ],
  'Table of how criticisms of Indian secularism are weighed: state the criticism as critics have argued it; give the reply that supporters offer; test both against an example; judge with reasons and note what remains open',
);
const tAnti = table(
  ['Point', 'Anti-religious'],
  [
    ['Critics have argued', 'Indian secularism is hostile to religion and to religious people'],
    ['Supporters respond', 'It opposes domination, not religion'],
    ['Why', 'Freedom of religion is protected (Articles 25 to 28) and all religions receive equal respect'],
    ['Imagined case', 'Torvia lets every faith hold its festivals and opens a shrine to all groups'],
  ],
  'Table on the anti-religious criticism: critics have argued that Indian secularism is hostile to religion; supporters respond that it opposes domination, not religion; freedom of religion is protected under Articles 25 to 28 and all religions receive equal respect; imagined Torvia lets every faith hold its festivals and opens a shrine to all groups',
  'Torvia is imagined.',
);
const tImport = table(
  ['Point', 'A Western import'],
  [
    ['Critics have argued', 'The idea comes from elsewhere and does not suit Indian society'],
    ['Others argue', 'It grew from India\'s own conditions of deep diversity'],
    ['Difference', 'It differs from the Western model: principled distance and support for communities'],
    ['Test', 'An idea can be judged by what it does here, and not only by where it began'],
  ],
  'Table on the Western-import criticism: critics have argued that the idea comes from elsewhere and does not suit Indian society; others argue it grew from India\'s own conditions of deep diversity and differs from the Western model through principled distance and support for communities; an idea can be judged by what it does and not only where it began',
);
const tMinor = table(
  ['Point', 'Minoritism'],
  [
    ['Critics have argued', 'Indian secularism favours minorities'],
    ['Supporters respond', 'Minority rights protect vulnerable groups and are part of equal respect'],
    ['Also argued', 'Fundamental interests of every group deserve protection'],
    ['Test', 'Are the protections given on equal terms to every community?'],
    ['Imagined case', 'Ember School in Pellmoor is recognised on the same terms as every other school'],
  ],
  'Table on the minoritism criticism: critics have argued that Indian secularism favours minorities; supporters respond that minority rights protect vulnerable groups and are part of equal respect; the fundamental interests of every group deserve protection; test whether protections are given on equal terms to every community; imagined Ember School in Pellmoor is recognised on the same terms as every other school',
  'Pellmoor and Ember School are imagined.',
);
const tInterv = table(
  ['Point', 'Interventionist'],
  [
    ['Critics have argued', 'The state interferes in the affairs of communities'],
    ['Supporters respond', 'Intervention aims to promote equality and freedom, as with untouchability'],
    ['Test', 'Does the practice deny people equality or freedom, whichever community follows it?'],
    ['A debated area', 'Debates on personal laws exist, and people hold different views on them'],
  ],
  'Table on the interventionist criticism: critics have argued that the state interferes in the affairs of communities; supporters respond that intervention aims to promote equality and freedom, as with untouchability; the test is whether a practice denies people equality or freedom; debates on personal laws exist and people hold different views on them',
);
const tVote = table(
  ['Point', 'Vote-bank politics'],
  [
    ['Critics have argued', 'Communities are promised favours for their votes'],
    ['Supporters respond', 'Groups organising for their interests is part of democracy'],
    ['The real concern', 'When this leads to the neglect of other groups'],
    ['Test', 'Check whether every group gets a fair share of public provision'],
  ],
  'Table on the vote-bank criticism: critics have argued that communities are promised favours for their votes; supporters respond that groups organising for their interests is part of democracy; the real concern is when this leads to the neglect of other groups; check whether every group gets a fair share of public provision',
);
const tImposs = table(
  ['Point', 'An impossible project'],
  [
    ['Critics have argued', 'Religious differences run so deep that a secular society cannot be achieved'],
    ['Supporters respond', 'It is an ambitious ideal that helps keep diverse societies together'],
    ['Also argued', 'Partial success is still valuable, because each reduction of domination helps people'],
    ['Test', 'Compare a society that works towards the ideal with one that does not'],
  ],
  'Table on the impossible-project criticism: critics have argued that differences run so deep that a secular society cannot be achieved; supporters respond that it is an ambitious ideal that helps keep diverse societies together; partial success is still valuable; compare a society that works towards the ideal with one that does not',
);
const tClassify2 = table(
  ['Imagined statement', 'Criticism', 'Likely reply'],
  [
    ['The state keeps stepping into how communities arrange their affairs', 'Interventionist', 'Intervention promotes equality and freedom'],
    ['This idea came from far-off lands and cannot suit us', 'A Western import', 'It grew from our own diversity and differs from other models'],
    ['It gives protections to small communities that others lack', 'Minoritism', 'They guard vulnerable groups and are part of equal respect'],
    ['Differences are so deep that no secular society can exist', 'An impossible project', 'An ambitious ideal; partial success is valuable'],
  ],
  'Worked example table classifying imagined statements: the state keeps stepping into how communities arrange their affairs is the interventionist criticism; the idea came from far-off lands is the Western import criticism; it gives protections to small communities is minoritism; differences are so deep no secular society can exist is the impossible project criticism; each with its likely reply',
  'The statements are imagined.',
);
const tDebate = table(
  ['Speaker in imagined Quillfield class', 'Point made', 'Kind of point'],
  [
    ['Perrin', 'Secularism favours small communities', 'Criticism: minoritism'],
    ['Ilse', 'The protections guard groups that could be vulnerable and are part of equal respect', 'Reply: minority rights as equal respect'],
    ['Wynn', 'The idea came from other lands, so it cannot suit us', 'Criticism: Western import'],
    ['Corin', 'It grew from our own diversity and differs from other models', 'Reply: own roots, difference from the Western model'],
  ],
  'Worked example table of an imagined classroom debate in Quillfield: Perrin says secularism favours small communities, the minoritism criticism; Ilse replies that the protections guard vulnerable groups and are part of equal respect; Wynn says the idea came from other lands, the Western import criticism; Corin replies that it grew from our own diversity and differs from other models',
  'The class and the speakers are imagined.',
);
const tCompareAll = table(
  ['Criticism', 'What critics have argued', 'What supporters respond'],
  [
    ['Anti-religious', 'Hostile to religion', 'Opposes domination, not religion'],
    ['Western import', 'Comes from elsewhere', 'Grew from India\'s diversity; differs from the Western model'],
    ['Minoritism', 'Favours minorities', 'Protects vulnerable groups; part of equal respect'],
    ['Interventionist', 'Interferes in communities', 'Intervenes to promote equality and freedom'],
    ['Vote-bank politics', 'Favours for votes', 'Organising is part of democracy; the concern is neglect'],
    ['Impossible project', 'Cannot be achieved', 'Ambitious ideal; partial success valuable'],
  ],
  'Table of six criticisms of Indian secularism with what critics have argued and what supporters respond: anti-religious, Western import, minoritism, interventionist, vote-bank politics and impossible project',
);
const tPlan2 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: criticisms of Indian secularism'],
  [
    ['1. Introduce', 'Indian secularism has been criticised on several grounds'],
    ['2. Two or three criticisms', 'Anti-religious, Western import, minoritism, with the reply to each'],
    ['3. Another criticism', 'Interventionist, vote-bank or impossible, with its reply'],
    ['4. An example', 'Imagined Dunmere shrine or Pellmoor school to test a criticism'],
    ['5. Judge', 'Weigh both sides with reasons, and note what remains open'],
  ],
  'Worked example table planning a five mark answer on criticisms of Indian secularism: introduce, two or three criticisms with replies, another criticism with its reply, an imagined example, and a reasoned judgement',
  'A plan, to be written in your own words.',
);
const tSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Anti-religious', 'Reply: it opposes domination, not religion'],
    ['Western import', 'Reply: grew from India\'s diversity; differs from the Western model'],
    ['Minoritism', 'Reply: minority rights protect the vulnerable; part of equal respect'],
    ['Interventionist', 'Reply: intervention promotes equality and freedom'],
    ['Vote-bank politics', 'Reply: organising is part of democracy; the concern is neglect'],
    ['Impossible project', 'Reply: ambitious ideal; partial success valuable'],
    ['Judging', 'Weigh both sides with reasons'],
  ],
  'Summary table of Part 2: the six criticisms with the reply to each, and the need to weigh both sides with reasons',
);
const tTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Giving only the criticism', 'Add the reply of supporters and then judge'],
    ['Taking a side without reasons', 'Weigh both sides and give reasons'],
    ['Naming a party or a real event', 'Use an imagined example'],
    ['Confusing minoritism with interventionism', 'Minoritism: favours minorities. Interventionist: interferes in communities'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Secularism, Part 1: Meaning and Two Models',
  goals: [
    'Define secularism and explain inter-religious and intra-religious domination',
    'State the features of a secular state',
    'Describe the Western model of secularism as it is commonly taught',
    'Describe the Indian model, with principled distance and the Articles involved',
    'Compare the Western and Indian models using imagined cases',
  ],
  slides: [
    sl('title', 'Secularism: Meaning and Two Models', {
      b: 'Part 1: **domination**, the **secular state**, the **Western model** and the **Indian model**.',
      v: flow('LR', ['Religious domination', 'Meaning of secularism', 'Secular state', 'Western model', 'Indian model'], 'Route map of Part 1: religious domination, meaning of secularism, the secular state, the Western model and the Indian model', 'Part 1 at a glance'),
      n: 'How can people of many faiths live together as equals? In this part we meet two kinds of religious domination, define secularism, and compare two models of how a state can relate to religion.',
    }),
    sl('concept', 'Two kinds of religious domination', {
      v: tDom,
      n: 'Inter religious domination means one religious community dominating another. Intra religious domination means domination within a community, for example by caste or gender. In the imagined town of Ashvale a Sunhold trust keeps the Tessel community out of a hall. In Quillfield a Rivermark council bars women from reading aloud.',
    }),
    sl('diagram', 'Domination between and within religions', {
      v: vDomination,
      n: 'This chart sets the two kinds side by side. Between communities, one dominates another. Within a community, some members dominate others, by caste or gender for example. Secularism opposes both. It seeks freedom within religions and equality between them, and keeps state power apart from the control of any religious group.',
    }),
    sl('concept', 'The standard definition of secularism', {
      v: tDef,
      n: 'Secularism is a normative doctrine that seeks a society free from both inter religious and intra religious domination. Normative means that it states how things ought to be. It promotes freedom within religions and equality between them, and it keeps state power apart from the control of any religious group.',
    }),
    sl('check', 'Quick check: the definition', {
      b: 'Which statement describes what the doctrine of secularism seeks?',
      chk: 'm_secdef',
      n: 'Recall the two kinds of domination that secularism opposes.',
    }),
    sl('example', 'Worked example 1: classify the statements', {
      b: 'Decide whether each imagined statement shows inter-religious or intra-religious domination.',
      bl: ['Is it **one community** over **another**?', 'Or is it **inside one community**, by caste or gender?'],
      v: tClassify,
      n: 'Let us classify four imagined statements in Ashvale. A hall committee of one faith refuses a hall to another. That is inter religious. A council forbids its own women to lead prayers. That is intra religious, by gender. An elder fines families who dine with other hereditary groups of the same faith. That is intra religious. A trust lets only its own processions use the main street. That is inter religious.',
    }),
    sl('concept', 'What a secular state is', {
      v: tSecState,
      n: 'A secular state is not run by any religious group. It has no official religion. And it does not discriminate against anyone on grounds of religion. In the imagined country of Meridan the Sunhold faith is named the official religion, so Meridan cannot be called secular in this sense.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about a secular state is true or false.',
      chk: 'tf_official',
      n: 'Think about whether a secular state can have an official religion.',
    }),
    sl('concept', 'The Western model', {
      v: tWest,
      n: 'In the Western model, as it is commonly taught, the state does not interfere in religion and religion does not interfere in the state. This is called mutual exclusion. The focus is on individual freedom and equality, and there is little room for rights based on a community. The United States and France are often given as examples, though they differ in detail.',
    }),
    sl('concept', 'The Indian model', {
      v: tIndia,
      n: 'The Indian model rests on principled distance. The state keeps a distance from all religions but may intervene, on principle, to promote freedom and equality. All religions receive equal respect, and communities are supported on an equal footing. Freedom of religion is protected in Articles twenty five to twenty eight, and there is no state religion.',
    }),
    sl('diagram', 'Western and Indian models compared', {
      v: vModels,
      n: 'This chart compares the two models. The Western model is mutual exclusion with a focus on the individual. The Indian model is principled distance, with equal respect and support for communities. Both share common ground. A secular state has no official religion and does not discriminate on grounds of religion.',
    }),
    sl('concept', 'Principled distance', {
      v: tPD,
      n: 'Principled distance means a distance from all religions, with intervention allowed on principle. The principle is the freedom and equality of people, within and between communities. The state acted against untouchability under Article seventeen, and places of worship were opened to all castes. Article thirty lets minorities run educational institutions. The term is associated with the theorist Rajeev Bhargava.',
    }),
    sl('diagram', 'When the state intervenes, and why', {
      v: vPD,
      n: 'This flow shows the reasoning. Take a practice in a religion. Ask whether it denies people freedom or equality. If it does not, the state keeps its distance and leaves belief and ritual alone. If it does, the state may intervene on principle, with freedom and equality as the aim. Equal support for all communities goes with it.',
    }),
    sl('example', 'Worked example 2: the Linden Shrine in Dunmere', {
      b: 'Apply principled distance to an imagined shrine.',
      bl: ['Name the **kind of domination**', 'State why the state may act and **where it must stop**'],
      v: tShrine,
      n: 'In imagined Dunmere a trust keeps the Ostler group, a hereditary group within the Rivermark community, out of the inner hall. This is intra religious domination, since it happens inside one community. It denies equality, so principled distance lets the state act, as it did against untouchability. The state opens entry to all groups and leaves belief and worship alone.',
    }),
    sl('check', 'Quick check: match the provisions', {
      b: 'Match each provision with what it deals with.',
      chk: 'mt_articles',
      n: 'Pair each Article or amendment with its subject.',
    }),
    sl('concept', 'Provisions of the Constitution', {
      v: tProvisions,
      n: 'The Preamble describes India as secular. The word was added by the forty second Amendment in nineteen seventy six, but the Constitution was secular in its provisions from the start. Article fifteen bars discrimination on grounds of religion. Article seventeen abolishes untouchability. Articles twenty five to twenty eight deal with freedom of religion. Article thirty protects minority educational institutions.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence on the two kinds of domination.',
      chk: 'fb_intra',
      n: 'Recall the second kind of domination that secularism opposes.',
    }),
    sl('example', 'Worked example 3: imagined Torvia chooses', {
      b: 'Weigh two models for an imagined country.',
      bl: ['State what each model **does** in the test case', 'Judge with **reasons** and note the other view'],
      v: tChoose,
      n: 'Imagined Torvia has people of three faiths and several hereditary groups. Model P is mutual exclusion. Model Q is principled distance. When a shrine bars a hereditary group, Model P gives the state little ground to act, while Model Q allows action on equality. Q answers domination inside religions better, though some may fear too much intervention, which clear principles can limit.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: tSum1,
      n: 'To sum up. Religious domination is inter religious or intra religious. Secularism seeks a society free from both. A secular state is not run by a religious group, has no official religion and does not discriminate. The Western model is mutual exclusion with an individual focus. The Indian model is principled distance with equal respect. The word secular was added in nineteen seventy six.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define **secularism** with **both** kinds of domination', 'Name **principled distance** for the Indian model', 'Cite **Article 17**, **Articles 25 to 28** and **Article 30**', 'Say the word **secular** was added in **1976**'],
      v: tTips1,
      n: 'A few tips. Define secularism with both kinds of domination. For the Indian model name principled distance, and support it with Articles seventeen, twenty five to twenty eight, and thirty. Remember that the word secular was added to the Preamble in nineteen seventy six, though the provisions were secular from the start. Use a short imagined example.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Secularism, Part 2: Criticisms and Replies',
  goals: [
    'State the six criticisms of Indian secularism as critics have argued them',
    'Give the reply that supporters offer to each',
    'Classify an imagined statement as one of the criticisms',
    'Weigh a criticism against its reply and judge with reasons',
    'Plan a five mark answer on the criticisms',
  ],
  slides: [
    sl('title', 'Criticisms of Indian Secularism', {
      b: 'Part 2: six **criticisms**, six **replies**, and how to **weigh** them.',
      v: flow('LR', ['Anti-religious', 'Western import', 'Minoritism', 'Interventionist', 'Vote-bank and impossible'], 'Route map of Part 2: anti-religious, Western import, minoritism, interventionist, vote-bank politics and impossible project', 'Part 2 at a glance'),
      n: 'Every idea in politics is questioned, and secularism is no exception. In this part we state each criticism as critics have argued it, give the reply that supporters offer, and practise weighing both before we judge.',
    }),
    sl('diagram', 'Six criticisms and six replies', {
      v: vCrit,
      n: 'This chart sets each criticism beside its reply. Critics have argued that Indian secularism is anti religious, a Western import, minoritist, interventionist, a cause of vote bank politics, and an impossible project. Supporters respond to each with reasons. We take them one at a time.',
    }),
    sl('concept', 'Anti-religious', {
      v: tAnti,
      n: 'Critics have argued that Indian secularism is hostile to religion. Supporters respond that it opposes domination, not religion. Freedom of religion is protected in Articles twenty five to twenty eight, and all religions receive equal respect. In imagined Torvia every faith holds its festivals, and a shrine is opened to all groups.',
    }),
    sl('concept', 'A Western import', {
      v: tImport,
      n: 'Critics have argued that the idea comes from elsewhere and does not suit Indian society. Others argue that it grew from conditions of deep diversity in India itself. It also differs from the Western model, through principled distance and support for communities. An idea can be judged by what it does here, and not only by where it began.',
    }),
    sl('check', 'Quick check: the reply', {
      b: 'Which reply do supporters give to the anti-religious criticism?',
      chk: 'm_antirel_reply',
      n: 'Recall what Indian secularism is said to oppose.',
    }),
    sl('concept', 'Minoritism', {
      v: tMinor,
      n: 'Critics have argued that Indian secularism favours minorities. Supporters respond that minority rights protect vulnerable groups and are part of equal respect. Others add that the fundamental interests of every group deserve protection. A fair test is whether the protections are given on equal terms to every community, as with Ember School in imagined Pellmoor.',
    }),
    sl('concept', 'Interventionist', {
      v: tInterv,
      n: 'Critics have argued that the state interferes in the affairs of communities. Supporters respond that intervention aims to promote equality and freedom, as in the abolition of untouchability. The test is whether a practice denies people equality or freedom, whichever community follows it.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about supporters is true or false.',
      chk: 'tf_antirel',
      n: 'Think about what supporters say the target of secularism is.',
    }),
    sl('example', 'Worked example 1: name the criticism', {
      b: 'Classify each imagined statement and give a likely reply.',
      bl: ['Match the **wording** to a criticism', 'Then recall the **reply** of supporters'],
      v: tClassify2,
      n: 'Let us classify four imagined statements. The state keeps stepping into how communities arrange their affairs is the interventionist criticism. This idea came from far off lands is the Western import criticism. It gives protections to small communities is minoritism. Differences are so deep that no secular society can exist is the impossible project criticism. Each has its reply.',
    }),
    sl('concept', 'Vote-bank politics', {
      v: tVote,
      n: 'Critics have argued that communities are promised favours for their votes. Supporters respond that groups organising for their interests is part of democracy. The real concern is when this leads to the neglect of other groups. A fair test is whether every group gets a fair share of public provision.',
    }),
    sl('concept', 'An impossible project', {
      v: tImposs,
      n: 'Critics have argued that religious differences run so deep that a secular society cannot be achieved. Supporters respond that it is an ambitious ideal that helps keep diverse societies together. Partial success is still valuable, because each reduction of domination helps people.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence on one criticism.',
      chk: 'fb_minoritism',
      n: 'Recall the name of the criticism that says secularism favours minorities.',
    }),
    sl('diagram', 'All six side by side', {
      v: tCompareAll,
      n: 'This table collects the six. Anti religious, hostile to religion, answered by domination and not religion. Western import, answered by the diversity of India. Minoritism, answered by protection of the vulnerable. Interventionist, answered by equality and freedom. Vote bank politics, answered by the concern about neglect. Impossible project, answered by an ambitious ideal.',
    }),
    sl('example', 'Worked example 2: an imagined class debate', {
      b: 'Sort the points made in an imagined classroom.',
      bl: ['Which speaker states a **criticism**?', 'Which speaker gives a **reply**?'],
      v: tDebate,
      n: 'In an imagined school in Quillfield, Perrin says secularism favours small communities. That is minoritism. Ilse replies that the protections guard groups that could be vulnerable and are part of equal respect. Wynn says the idea came from other lands. That is the Western import criticism. Corin replies that it grew from our own diversity and differs from other models.',
    }),
    sl('concept', 'How to weigh a criticism', {
      v: tHow,
      n: 'To weigh a criticism, take four steps. State it as critics have argued it. Give the reply that supporters offer. Test both against an example. Then judge with reasons, and note what remains open. A good answer does not simply pick a side.',
    }),
    sl('check', 'Quick check: put in order', {
      b: 'Arrange the steps of a well-reasoned evaluation of one criticism.',
      chk: 'ord_evaluate',
      n: 'Think about which step comes first and which comes last.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on the criticisms of Indian secularism.',
      bl: ['Give **criticism and reply** together', 'End with a **reasoned judgement**'],
      v: tPlan2,
      n: 'To plan a five mark answer, introduce the criticisms first. Then give two or three criticisms, each with its reply. Add another criticism with its reply. Use an imagined example such as the shrine in Dunmere or the school in Pellmoor. End by weighing both sides with reasons. Write it in your own words.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: tSum2,
      n: 'To sum up. Critics have argued that Indian secularism is anti religious, a Western import, minoritist, interventionist, a cause of vote bank politics and an impossible project. Supporters respond that it opposes domination and not religion, grew from the diversity of India, protects the vulnerable, promotes equality, treats organising as part of democracy, and is an ambitious ideal.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give the **criticism and its reply** together', 'Use **critics have argued** and **supporters respond**', 'Use an **imagined example**', '**Weigh** both sides and judge with reasons'],
      v: tTips2,
      n: 'A few tips. Always give the criticism with its reply. Use phrases such as critics have argued and supporters respond. Support your answer with a short imagined example. Weigh both sides and judge with reasons. Do not name parties or real events.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Secularism: Notes',
  sections: [
    {
      h: '1. Religious domination',
      t: 1,
      b: 'In a society with many faiths, one community may **dominate** another, and members of one community may dominate others inside it.\n\n- **Inter-religious domination**: one religious community dominating another.\n- **Intra-religious domination**: domination within a religious community, for example by caste or gender.',
      terms: [
        ['Inter-religious domination', 'Domination of one religious community over another.'],
        ['Intra-religious domination', 'Domination within a religious community, for example by caste or gender.'],
      ],
      v: vDomination,
      vs: [tDom, tClassify],
    },
    {
      h: '2. Meaning of secularism and the secular state',
      t: 1,
      b: '**Secularism** is a **normative doctrine** that seeks a society free from both inter-religious and intra-religious domination. It promotes **freedom within religions** and **equality between** them, and keeps state power apart from the control of any religious group.\n\nA **secular state** is not run by any religious group, has **no official religion** and does **not discriminate** on grounds of religion.',
      terms: [
        ['Secularism', 'A normative doctrine that seeks a society free from both inter-religious and intra-religious domination, promoting freedom within religions and equality between them.'],
        ['Normative', 'Stating how things ought to be, and not only how they are.'],
        ['Secular state', 'A state that is not run by any religious group, has no official religion and does not discriminate on grounds of religion.'],
      ],
      v: tDef,
      vs: [tSecState],
    },
    {
      h: '3. The Western model',
      t: 1,
      b: 'As commonly taught, the Western model rests on **mutual exclusion**: the state does not interfere in religion and religion does not interfere in the state. It focuses on **individual freedom and equality** and leaves little room for **community-based rights**. The United States and France are often given as examples; they differ from each other in detail.',
      terms: [
        ['Mutual exclusion', 'The idea that the state does not interfere in religion and religion does not interfere in the state.'],
      ],
      v: tWest,
    },
    {
      h: '4. The Indian model and principled distance',
      t: 1,
      b: 'The Indian model rests on **principled distance**: the state keeps a distance from all religions but may **intervene on principle** to promote freedom and equality. Examples are the abolition of untouchability (**Article 17**) and the opening of places of worship to all castes.\n\nIt also gives **equal respect** to all religions and supports communities on an equal footing, as with **Article 30**. There is **no state religion**. The term principled distance is associated with the political theorist Rajeev Bhargava.',
      terms: [
        ['Principled distance', 'The state keeps a distance from all religions but may intervene on principle to promote freedom and equality.'],
        ['Equal respect', 'Treating every religion and community with the same regard, with support given on an equal footing.'],
      ],
      v: vPD,
      vs: [tIndia, tPD, tShrine, tChoose, vModels],
    },
    {
      h: '5. The Constitution and secularism',
      t: 1,
      b: 'The Constitution was **secular in its provisions from the start**. **Article 15** bars discrimination on grounds of religion. **Article 17** abolishes untouchability. **Articles 25 to 28** protect freedom of religion. **Article 30** lets religious and linguistic minorities set up and run educational institutions.\n\nThe word **secular** was added to the Preamble by the **42nd Amendment (1976)**.',
      terms: [
        ['42nd Amendment', 'The amendment of 1976 that added the word secular to the Preamble.'],
      ],
      v: tProvisions,
    },
    {
      h: '6. Criticisms of Indian secularism, with replies (1)',
      t: 2,
      b: '**Anti-religious.** Critics have argued that it is hostile to religion. Supporters respond that it opposes **domination, not religion**.\n\n**A Western import.** Critics have argued that it comes from elsewhere. Others argue that it grew from India\'s **own conditions of diversity** and differs from the Western model.\n\n**Minoritism.** Critics have argued that it favours minorities. Supporters respond that **minority rights protect vulnerable groups** and are part of equal respect, and that fundamental interests deserve protection.',
      terms: [
        ['Minoritism', 'The criticism that Indian secularism favours minorities.'],
      ],
      v: vCrit,
      vs: [tAnti, tImport, tMinor, tClassify2],
    },
    {
      h: '7. Criticisms of Indian secularism, with replies (2)',
      t: 2,
      b: '**Interventionist.** Critics have argued that the state interferes in communities. Supporters respond that intervention promotes **equality and freedom**, as with untouchability. Debates on personal laws exist, and people hold different views on them.\n\n**Vote-bank politics.** Critics have argued that communities are promised favours for votes. Supporters respond that groups organising for their interests is part of **democracy**; the concern is when others are **neglected**.\n\n**An impossible project.** Critics have argued that differences run too deep. Supporters respond that it is an **ambitious ideal** that keeps diverse societies together, and **partial success** is still valuable.',
      terms: [
        ['Vote-bank politics', 'Seeking the votes of a community by promising it favours, with the worry that other groups are neglected.'],
        ['Interventionist', 'The criticism that the state interferes in the affairs of communities.'],
      ],
      v: tCompareAll,
      vs: [tInterv, tVote, tImposs, tDebate, tHow, tPlan2],
    },
  ],
  tips: '**Common mistakes**\n- Saying secularism means opposing religion: say it opposes domination, between and within religions.\n- Describing only inter-religious domination: include intra-religious domination.\n- Saying the Indian state keeps total separation: say principled distance allows intervention on principle for freedom and equality.\n- Saying the word secular was in the Constitution only from 1976: the word was added in 1976, the provisions were secular from the start.\n- Giving a criticism without its reply, or taking a side without reasons.\n- Naming a party or a real event: use an imagined example.\n\n**Tips:** define with both kinds of domination; use the phrases critics have argued and supporters respond; cite Articles by number; weigh both sides, then judge with reasons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is **inter-religious domination**?', 'Domination of one religious community over another.', 'definition'],
  ['What is **intra-religious domination**?', 'Domination within a religious community, for example by caste or gender.', 'definition'],
  ['What is **secularism**, in the standard sense?', 'A normative doctrine that seeks a society free from both inter-religious and intra-religious domination.', 'definition'],
  ['What does secularism promote?', 'Freedom within religions and equality between them.', 'concept'],
  ['What does **normative** mean?', 'Stating how things ought to be, and not only how they are.', 'definition'],
  ['What is a **secular state**?', 'A state not run by any religious group, with no official religion and no discrimination on grounds of religion.', 'definition'],
  ['Can a state with an official religion be called secular?', 'No: a secular state has no official religion.', 'concept'],
  ['What is the **Western model**, as commonly taught?', 'Mutual exclusion: the state does not interfere in religion and religion does not interfere in the state.', 'concept'],
  ['What does the Western model focus on?', 'Individual freedom and equality, with little room for community-based rights.', 'concept'],
  ['Which countries are often given as examples of the Western model?', 'The United States and France, which differ from each other in detail.', 'fact'],
  ['What is **mutual exclusion**?', 'The idea that state and religion do not interfere in each other.', 'definition'],
  ['What is **principled distance**?', 'The state keeps a distance from all religions but may intervene on principle to promote freedom and equality.', 'definition'],
  ['Which political theorist is associated with principled distance?', 'Rajeev Bhargava.', 'fact'],
  ['Give two examples of principled intervention', 'The abolition of untouchability (Article 17) and the opening of places of worship to all castes.', 'concept'],
  ['What does **Article 17** provide?', 'It abolishes untouchability and forbids its practice.', 'fact'],
  ['What do **Articles 25 to 28** deal with?', 'Freedom of religion.', 'fact'],
  ['What does **Article 30** provide?', 'Religious and linguistic minorities may set up and run educational institutions of their choice.', 'fact'],
  ['What does **Article 15** say on religion?', 'No discrimination on grounds of religion, race, caste, sex or place of birth.', 'fact'],
  ['What is **equal respect** in the Indian model?', 'Treating every religion and community with the same regard, with support on an equal footing.', 'concept'],
  ['Does India have a state religion?', 'No.', 'fact'],
  ['Which amendment added the word secular to the Preamble, and when?', 'The 42nd Amendment, 1976.', 'fact'],
  ['Was the Constitution secular before 1976?', 'Yes, in its provisions from the start; the word was added to the Preamble in 1976.', 'concept'],
  ['Name the six criticisms of Indian secularism', 'Anti-religious, a Western import, minoritism, interventionist, vote-bank politics and an impossible project.', 'fact'],
  ['Reply to the **anti-religious** criticism?', 'It opposes domination, not religion.', 'concept'],
  ['Reply to the **Western import** criticism?', 'It grew from India\'s own conditions of diversity and differs from the Western model.', 'concept'],
  ['What is **minoritism**?', 'The criticism that Indian secularism favours minorities.', 'definition'],
  ['Reply to **minoritism**?', 'Minority rights protect vulnerable groups and are part of equal respect; fundamental interests deserve protection.', 'concept'],
  ['What does the **interventionist** criticism say?', 'That the state interferes in the affairs of communities.', 'concept'],
  ['Reply to the **interventionist** criticism?', 'Intervention promotes equality and freedom, as with untouchability.', 'concept'],
  ['What is **vote-bank politics**?', 'Seeking a community\'s votes by promising it favours, with the worry that others are neglected.', 'definition'],
  ['Reply to the **vote-bank** criticism?', 'Groups organising for their interests is part of democracy; the concern is neglect of others.', 'concept'],
  ['Reply to the **impossible project** criticism?', 'It is an ambitious ideal that helps keep diverse societies together; partial success is valuable.', 'concept'],
].map(([a, b, c], i) => [a, b, c, i < 21 ? 1 : 2]));

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Secularism',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_inter_app', 'm_western_app', 'm_classify_crit', 'ar_both'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_def', 's_art17_app', 's3_compare'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_meaning', 'l_models'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_council'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Secularism',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_intra_app', 'm_official_app', 'm_pd_app', 'm_compare_app', 'm_import_reply', 'm_votebank_reply', 'm_impossible_reply', 'm_minorism_app', 'ar_pd', 'ar_antirel'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_kinds', 's_pd', { attempt: 1, keys: ['s_antirel', 's_import'] }, 's3_pd_example', { attempt: 1, keys: ['s3_minoritism', 's3_impossible'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_indian_features', { attempt: 1, keys: ['l_torvia', 'l_crit3'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_school', 'c_debate'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch18 only (meaning of secularism, inter- and intra-religious domination, the secular state, the Western and Indian models, principled distance; the six criticisms of Indian secularism and the replies)',
    originality: 'every scenario, country, town, faith, community, shrine, school, report, letter, table, editorial and classroom debate is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no quotation of any thinker, no board item reused (D-036)',
    facts: 'stable facts only: Article 15, Article 17, Articles 25 to 28, Article 30; the word secular added to the Preamble by the 42nd Amendment in 1976; the Constitution secular in its provisions from 1950; principled distance associated with Rajeev Bhargava; the United States and France as commonly cited examples of the Western model',
    neutrality: 'no map; no real religion, community, riot, incident, party, leader or current dispute named; the criticisms are presented as critics have argued and supporters respond; debates on personal laws mentioned in one neutral line with no position; imagined faiths and places carry no suggestion of a real majority or minority',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
