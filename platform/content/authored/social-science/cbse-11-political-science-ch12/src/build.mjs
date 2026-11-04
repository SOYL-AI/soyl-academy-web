// Build CBSE 11 Political Science ch12 Freedom. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch12', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vNegPos = (() => {
  const s = new Svg(760, 400);
  const box = (x, name, col, lines) => {
    s.rect(x, 10, 360, 250, { color: col, sw: 2.5 });
    s.text(x + 180, 40, name, { bold: true, size: 20, color: col });
    lines.forEach((ln, j) => s.text(x + 180, 85 + j * 30, ln, { size: 14, bold: j === 0 }));
  };
  box(10, 'Negative liberty', 'blue', ['Freedom from interference', 'A protected area of choice', 'Imagined: Dorrow bars officials', 'from reading private letters', 'Asks: how much is left alone?']);
  box(390, 'Positive liberty', 'green', ['Freedom to act and develop', 'Needs enabling conditions', 'Imagined: Mirrenhall opens a free', 'night school and a clinic', 'Asks: what can a person do?']);
  s.rect(10, 290, 740, 100, { color: 'accent', sw: 2.5 });
  s.text(380, 322, 'How the two ideas relate', { bold: true, size: 16, color: 'accent' });
  s.text(380, 352, 'They can conflict: a tax for a clinic may feel like interference', { size: 14 });
  s.text(380, 376, 'They can complement: a protected area plus the means to use it', { size: 14 });
  return s.visual('Comparison chart of negative and positive liberty. Negative liberty is freedom from interference, a protected area of choice; imagined Dorrow bars officials from reading private letters; it asks how much is left alone. Positive liberty is freedom to act and develop and needs enabling conditions; imagined Mirrenhall opens a free night school and a clinic; it asks what a person can do. The two can conflict, since a tax for a clinic may feel like interference, and can complement each other, since a protected area is joined to the means to use it', 'Negative and positive liberty compared.');
})();

const vHarm = (() => {
  const s = new Svg(760, 440);
  const box = (x, y, w, h, lines, col, boldFirst = true) => {
    s.rect(x, y, w, h, { color: col, sw: 2 });
    lines.forEach((ln, j) => s.text(x + w / 2, y + h / 2 + (j - (lines.length - 1) / 2) * 22, ln, { size: 14, bold: boldFirst && j === 0, color: boldFirst && j === 0 ? col : undefined }));
  };
  box(260, 10, 240, 50, ['An action is complained of'], 'accent');
  box(20, 100, 300, 56, ['Self-regarding', 'Affects only the actor'], 'blue');
  box(440, 100, 300, 56, ['Other-regarding', 'Affects other people'], 'red');
  box(20, 210, 300, 56, ['Leave it free', 'No restriction on this ground'], 'blue');
  box(380, 210, 170, 56, ['Minor harm', 'Judge its size'], 'brown');
  box(570, 210, 170, 56, ['Serious harm', 'Judge its size'], 'red');
  box(380, 320, 170, 56, ['Social disapproval', 'or a request'], 'brown');
  box(570, 320, 170, 56, ['Legal restriction', 'and punishment'], 'red');
  s.arrow(380, 60, 170, 100, { sw: 2 });
  s.arrow(380, 60, 590, 100, { sw: 2 });
  s.arrow(170, 156, 170, 210, { sw: 2 });
  s.arrow(590, 156, 465, 210, { sw: 2 });
  s.arrow(590, 156, 655, 210, { sw: 2 });
  s.arrow(465, 266, 465, 320, { sw: 2 });
  s.arrow(655, 266, 655, 320, { sw: 2 });
  s.text(170, 345, 'Example: chess alone in a room', { size: 13 });
  s.text(465, 400, 'Example: evening drum', { size: 13 });
  s.text(655, 400, 'Example: poisoned stream', { size: 13 });
  return s.visual('Decision flow of the harm principle. An action is complained of. If it affects only the actor it is self-regarding, and it is left free with no restriction on this ground, for example studying chess alone in a room. If it affects other people it is other-regarding, and the size of the harm is judged. Minor harm calls for social disapproval or a request, for example an evening drum. Serious harm calls for legal restriction and punishment, for example a poisoned stream', 'The harm principle as a decision flow.');
})();

const vSources = (() => {
  const s = new Svg(760, 440);
  const box = (x, y, w, h, lines, col, bold = false) => {
    s.rect(x, y, w, h, { color: col, sw: 2 });
    lines.forEach((ln, j) => s.text(x + w / 2, y + h / 2 + (j - (lines.length - 1) / 2) * 22, ln, { size: 14, bold: bold && j === 0, color: bold && j === 0 ? col : undefined }));
  };
  box(10, 20, 300, 64, ['Domination and', 'external control'], 'red', true);
  box(450, 20, 300, 64, ['Social and', 'economic inequality'], 'brown', true);
  box(10, 110, 300, 44, ['By force'], 'red');
  box(10, 170, 300, 44, ['Laws imposed without consent'], 'red');
  box(450, 110, 300, 44, ['Caste-based exclusion'], 'brown');
  box(450, 170, 300, 44, ['Extreme poverty'], 'brown');
  s.line(160, 84, 160, 110, { sw: 1.6, color: 'muted' });
  s.line(600, 84, 600, 110, { sw: 1.6, color: 'muted' });
  s.arrow(160, 214, 330, 252, { sw: 2 });
  s.arrow(600, 214, 430, 252, { sw: 2 });
  box(230, 252, 300, 54, ['A constraint on freedom'], 'accent', true);
  s.arrow(380, 306, 380, 336, { sw: 2 });
  s.rect(10, 336, 740, 94, { color: 'green', sw: 2.5 });
  s.text(380, 366, 'Not every constraint is harmful', { bold: true, size: 16, color: 'green' });
  s.text(380, 394, 'People living together need rules, and rules accepted through', { size: 14 });
  s.text(380, 416, 'legitimate procedures can protect freedom', { size: 14 });
  return s.visual('Web of the sources of constraints on freedom. Domination and external control arises by force or through laws imposed without consent. Social and economic inequality arises through caste-based exclusion and extreme poverty. Each is a constraint on freedom. Not every constraint is harmful: people living together need rules, and rules accepted through legitimate procedures can protect freedom', 'Sources of constraints on freedom, and why some are needed.');
})();

const vExpr = (() => {
  const s = new Svg(760, 440);
  const box = (x, y, w, h, t, col) => {
    s.rect(x, y, w, h, { color: col, sw: 2 });
    s.text(x + w / 2, y + h / 2, t, { size: 14 });
  };
  s.rect(230, 10, 300, 50, { color: 'accent', sw: 2.5 });
  s.text(380, 35, 'Freedom of expression', { bold: true, size: 16, color: 'accent' });
  s.arrow(300, 60, 185, 90, { sw: 2 });
  s.arrow(460, 60, 575, 90, { sw: 2 });
  s.text(185, 104, 'Reasons it matters', { bold: true, size: 16, color: 'green' });
  s.text(575, 104, 'Limits that may be justified', { bold: true, size: 16, color: 'red' });
  [['A false view may hold some truth', 124], ['Truth emerges from the clash of opinions', 194], ['Unchallenged truth becomes dead dogma', 264]].forEach(([t, y]) => box(10, y, 350, 56, t, 'green'));
  [['Only on a recognised ground', 124], ['Restriction as small as needed', 194], ['Decided by due process, with reasons', 264]].forEach(([t, y]) => box(400, y, 350, 56, t, 'red'));
  s.arrow(185, 320, 300, 350, { sw: 2 });
  s.arrow(575, 320, 460, 350, { sw: 2 });
  s.rect(10, 350, 740, 80, { color: 'blue', sw: 2.5 });
  s.text(380, 378, 'In the Indian Constitution', { bold: true, size: 16, color: 'blue' });
  s.text(380, 406, 'Article 19(1)(a) protects the freedom; Article 19(2) allows reasonable restrictions', { size: 14 });
  return s.visual('Flow chart of freedom of expression. Freedom of expression leads to reasons it matters: a false view may hold some truth, truth emerges from the clash of opinions, and unchallenged truth becomes dead dogma. It also leads to limits that may be justified: only on a recognised ground, restriction as small as needed, and decided by due process with reasons. In the Indian Constitution, Article 19(1)(a) protects the freedom and Article 19(2) allows reasonable restrictions', 'Why free expression matters, and the limits that may be justified.');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vStruggle = table(
  ['Point', 'The ideal of freedom'],
  [
    ['The idea', 'Freedom is the struggle against domination: people resist control imposed on their lives by others'],
    ['Two books named as examples', 'Long Walk to Freedom (1994) by Nelson Mandela and Freedom from Fear (1991) by Aung San Suu Kyi'],
    ['What the books show', 'Freedom is won and kept by effort; it is not simply given'],
    ['Why it matters', 'Freedom lets people shape their own lives and take part in decisions that affect them'],
  ],
  'Table on the ideal of freedom: freedom is the struggle against domination; two books named as examples are Long Walk to Freedom by Nelson Mandela, 1994, and Freedom from Fear by Aung San Suu Kyi, 1991; freedom is won and kept by effort; it lets people shape their own lives',
);
const vDefn = table(
  ['Part of the definition', 'Meaning', 'Imagined example'],
  [
    ['Absence of external constraints', 'No unjustified restraint by others, by force or by rules', 'No guard in Arvelle may stop a resident from walking to the market'],
    ['Conditions for development', 'A person has what is needed to develop talents and make choices (self-determination)', 'A school and a library that a child in Arvelle can use'],
    ['Taken together', 'Real freedom needs both parts', 'A child who may study but has no school is not fully free'],
  ],
  'Table of the standard definition of freedom: the absence of external constraints, with the example that no guard may stop a resident of imagined Arvelle from walking to the market; and the existence of conditions for developing talents and making choices, with the example of a school and library; real freedom needs both parts',
  'Arvelle and its residents are imagined.',
);
const vNeeded = table(
  ['Point', 'Why some constraints are needed'],
  [
    ['Living together', 'People who share a place need rules, or the strong would override the weak'],
    ['Legitimate procedures', 'Rules should be accepted through a fair and open process, not imposed in secret'],
    ['Purpose', 'A good rule protects freedom for all instead of destroying it'],
    ['Imagined case', 'Kellin makes cyclists keep to the left after an open meeting: the rule keeps the road safe for everyone'],
  ],
  'Table on why some constraints are needed: people living together need rules; rules should be accepted through legitimate procedures; a good rule protects freedom; imagined Kellin makes cyclists keep to the left after an open meeting',
);
const vSortArv = table(
  ['Imagined situation in Arvelle', 'Source of constraint', 'Reason'],
  [
    ['A governor from far away bans public meetings, and guards enforce it', 'Domination and external control', 'Rules imposed by force, without consent'],
    ['Children of one community are seated apart in the school hall', 'Social inequality', 'Exclusion based on birth'],
    ['A gifted girl never attends school because her family is poor', 'Economic inequality', 'Poverty denies conditions to develop'],
    ['The town meeting votes a rule for quiet after ten at night', 'A justified constraint', 'Accepted by a fair process; protects everyone'],
  ],
  'Worked example table sorting imagined situations in Arvelle: a governor who bans meetings by force is domination and external control; seating children of one community apart is social inequality; a gifted girl kept from school by poverty is economic inequality; a rule for quiet voted by the town meeting is a justified constraint',
  'The situations in Arvelle are imagined.',
);
const vNegT = table(
  ['Point', 'Negative liberty'],
  [
    ['Meaning', 'Freedom from interference: a minimum area in which a person can act without restraint by others or the state'],
    ['The question it asks', 'How large is the area in which a person is left alone?'],
    ['Thinker', 'The distinction was made famous by Isaiah Berlin'],
    ['Imagined case', 'Dorrow forbids officials to read private letters or to tell residents what to read'],
  ],
  'Table on negative liberty: freedom from interference, a minimum area in which a person can act without restraint by others or the state; it asks how large the area is in which a person is left alone; the distinction was made famous by Isaiah Berlin; in imagined Dorrow officials may not read private letters',
);
const vPosT = table(
  ['Point', 'Positive liberty'],
  [
    ['Meaning', 'Freedom to act and develop, which needs enabling conditions such as education, health and resources'],
    ['The question it asks', 'What is a person actually able to do and to become?'],
    ['Role of the state', 'The state may need to act in order to expand it'],
    ['Imagined case', 'Mirrenhall builds a free library, a night school and a clinic so that every child can learn and keep well'],
  ],
  'Table on positive liberty: freedom to act and develop, which needs enabling conditions such as education, health and resources; it asks what a person is actually able to do; the state may need to act to expand it; imagined Mirrenhall builds a free library, a night school and a clinic',
);
const vRhea = table(
  ['Step', 'Imagined case: Rhea of Kellin'],
  [
    ['1. The facts', 'Rhea may choose any trade she likes, and no official interferes'],
    ['2. Negative liberty', 'Present: her area of choice is protected'],
    ['3. The gap', 'She has no money for tools and cannot read the trade manuals'],
    ['4. Positive liberty', 'Lacking: she has not the resources or education to act on her choice'],
    ['5. A remedy', 'A free tool loan and an evening class would add enabling conditions'],
  ],
  'Worked example table on imagined Rhea of Kellin: she may choose any trade and no one interferes, so negative liberty is present; she has no money for tools and cannot read the manuals, so positive liberty is lacking; a free tool loan and an evening class would add enabling conditions',
  'Rhea and Kellin are imagined.',
);
const vConflict = table(
  ['Point', 'Conflict and complement'],
  [
    ['How they can conflict', 'State action to widen positive liberty, such as a tax for a clinic, may be seen by some as interference'],
    ['How they can complement', 'A protected area of choice is worth more when people have the education and health to use it'],
    ['Differences among thinkers', 'Some stress negative liberty, others stress positive liberty'],
    ['What a student should do', 'State both views with reasons, and judge without taking a side blindly'],
  ],
  'Table on the conflict and complement of the two kinds of liberty: state action to widen positive liberty, such as a tax for a clinic, may be seen as interference; a protected area of choice is worth more with education and health; some thinkers stress negative liberty and others positive liberty; students should state both views and judge with reasons',
);
const vPlan1 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: negative and positive liberty'],
  [
    ['1. Define negative liberty', 'Freedom from interference; a protected area of choice'],
    ['2. Define positive liberty', 'Freedom to act and develop; enabling conditions'],
    ['3. One example of each', 'Dorrow bars officials from private letters; Mirrenhall opens a night school'],
    ['4. Conflict', 'A tax for a clinic may be seen as interference'],
    ['5. Complement', 'A protected area needs the means to use it; thinkers differ in stress'],
  ],
  'Worked example table planning a five mark answer on negative and positive liberty: define negative liberty, define positive liberty, give an example of each from imagined Dorrow and Mirrenhall, explain how they may conflict, and how they complement each other',
  'A plan, to be written in your own words.',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Ideal', 'Freedom as the struggle against domination'],
    ['Definition', 'Absence of external constraints; conditions to develop and choose'],
    ['Constraints', 'Domination and external control; social and economic inequality'],
    ['Need for rules', 'Rules accepted through legitimate procedures protect freedom'],
    ['Negative liberty', 'Freedom from interference'],
    ['Positive liberty', 'Freedom to act and develop; enabling conditions'],
    ['Relation', 'They can conflict and can complement each other'],
  ],
  'Summary table of Part 1: the ideal, the definition, the sources of constraints, the need for rules, negative liberty, positive liberty and how they relate',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Saying freedom means no rules at all', 'Some constraints are needed; they should be legitimate and protect freedom'],
    ['Mixing up the two liberties', 'Negative: freedom from interference. Positive: freedom to act, with enabling conditions'],
    ['Taking a side on which liberty matters more', 'Say some stress one and others the other, then give reasons'],
    ['Defining without an example', 'Add a short imagined example to each definition'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vHarmT = table(
  ['Point', 'The harm principle'],
  [
    ['Statement', 'The state or society may restrict a person\'s freedom only to prevent harm to others'],
    ['Thinker and work', 'J. S. Mill, On Liberty (1859)'],
    ['What it rules out', 'Restricting a person for his own good, or because others dislike what he does'],
    ['Imagined case', 'Mirrenhall may not forbid red scarves at home because councillors think red ugly'],
  ],
  'Table on the harm principle: the state or society may restrict freedom only to prevent harm to others; J. S. Mill, On Liberty, 1859; it rules out restricting a person for his own good or because others dislike what he does; imagined Mirrenhall may not forbid red scarves at home',
);
const vSelfOther = table(
  ['Kind of action', 'Meaning', 'Imagined example'],
  [
    ['Self-regarding', 'Affects only the person who acts', 'Bram of Pellam studies chess alone on Sundays'],
    ['Other-regarding', 'Affects other people', 'A factory in Tavish drains waste into the village stream'],
    ['Why the difference matters', 'Self-regarding actions are left free; other-regarding actions may be restricted if they cause harm', 'The factory may be restricted; Bram may not'],
  ],
  'Table of self-regarding and other-regarding actions: self-regarding actions affect only the person who acts, as when Bram of imagined Pellam studies chess alone; other-regarding actions affect other people, as when a factory in imagined Tavish drains waste into a stream; the difference matters because only harm to others can justify restriction',
  'Pellam, Tavish and the people are imagined.',
);
const vClassDorrow = table(
  ['Imagined complaint in Dorrow', 'Kind of action', 'Reason'],
  [
    ['Mr Tavin reads late in a closed room', 'Self-regarding', 'Affects only himself'],
    ['A workshop sends smoke into three homes every day', 'Other-regarding', 'Harms neighbours; serious if illness follows'],
    ['A neighbour plays a drum for an hour each evening', 'Other-regarding', 'Minor harm: annoyance only'],
    ['Ms Meera skips lunch to save money', 'Self-regarding', 'Her own choice; others may disapprove but are not harmed'],
  ],
  'Worked example table classifying imagined complaints in Dorrow: reading late in a closed room is self-regarding; smoke into three homes is other-regarding and serious if illness follows; an evening drum is other-regarding with minor harm; skipping lunch to save money is self-regarding',
  'The complaints in Dorrow are imagined.',
);
const vLevels = table(
  ['Level of harm', 'Suggested response', 'Imagined example'],
  [
    ['No harm to others', 'No restriction on this ground', 'Chess alone in a room'],
    ['Minor harm to others', 'Social disapproval, a request, persuasion', 'An evening drum in Pellam'],
    ['Serious harm to others', 'Legal restriction and punishment', 'Poison in the stream of Tavish'],
  ],
  'Table of levels of harm and responses: no harm calls for no restriction, for example chess alone; minor harm calls for social disapproval, a request or persuasion, for example an evening drum; serious harm calls for legal restriction and punishment, for example poison in a stream',
);
const vMillT = table(
  ['Reason for free expression', 'Meaning', 'Imagined example'],
  [
    ['A false view may hold some truth', 'Even a mostly wrong view may contain a part that is right', 'A small group in Arvelle is partly right about the harbour'],
    ['Truth emerges through the clash of opinions', 'Ideas are tested by rival ideas, and judgement improves', 'Engineers and boatmen argue until a better bridge plan appears'],
    ['Unchallenged truth becomes dead dogma', 'A belief never questioned is held without understanding', 'Pupils chant a rule they cannot explain'],
  ],
  'Table of three reasons for free expression: a false view may hold some truth, as when a small group in imagined Arvelle is partly right about the harbour; truth emerges through the clash of opinions, as when engineers and boatmen argue until a better bridge plan appears; an unchallenged truth becomes dead dogma, as when pupils chant a rule they cannot explain',
  'The examples are imagined.',
);
const vPlay = table(
  ['Step', 'Imagined case: the play The Last Ferry in Arvelle'],
  [
    ['1. The demand', 'A group of residents asks for the play to be banned for mocking local customs'],
    ['2. The other side', 'Others say the play raises questions the town should debate'],
    ['3. Fair procedure', 'The council asks a panel to hear both sides before deciding'],
    ['4. Recognised ground', 'The panel asks whether any ground applies, such as incitement to an offence'],
    ['5. Minimal restriction', 'If none applies, the play goes ahead; if one does, restrict no more than needed'],
  ],
  'Worked example table on the imagined play The Last Ferry in Arvelle: residents ask for a ban; others say it raises questions to debate; the council asks a panel to hear both sides; the panel asks whether any recognised ground applies, such as incitement to an offence; if none applies the play goes ahead, and if one does the restriction is no more than needed',
  'The play, its makers and Arvelle are imagined.',
);
const vCensor = table(
  ['Some argue', 'Others argue'],
  [
    ['Open expression helps truth and self-government', 'Some expression can hurt people, so it should be restrained'],
    ['A ban may suppress a view that has some truth', 'A ban may protect people from real harm'],
    ['Disliked views must be answered, not silenced', 'Certain speech, such as calls for violence, should be stopped'],
  ],
  'Table of debates on bans: some argue that open expression helps truth and self-government, that a ban may suppress a view with some truth, and that disliked views must be answered and not silenced; others argue that some expression can hurt people, that a ban may protect people from real harm, and that certain speech, such as calls for violence, should be stopped',
);
const vDue = table(
  ['Condition', 'Meaning', 'Imagined example'],
  [
    ['Minimal', 'Restrict no more than is needed to prevent the harm', 'Remove one poster, not close the whole press'],
    ['A recognised ground', 'The restriction rests on a listed reason, not on dislike', 'A rally poster urging arson'],
    ['Due process', 'A hearing, reasons given and a chance to be heard', 'A panel hears both sides in Arvelle'],
  ],
  'Table of the conditions for restricting expression: minimal, meaning no more than needed; resting on a recognised ground and not on dislike; and due process, with a hearing, reasons and a chance to be heard',
);
const vArt19 = table(
  ['Provision', 'What it provides'],
  [
    ['Article 19(1)(a)', 'Protects the freedom of speech and expression'],
    ['Article 19(2)', 'Allows reasonable restrictions, made by law, on that freedom'],
    ['Grounds listed', 'Public order; decency or morality; sovereignty and integrity of India; security of the state; friendly relations with foreign states; defamation; contempt of court; incitement to an offence'],
    ['How they work', 'A restriction must be reasonable and rest on a listed ground'],
  ],
  'Table on Articles 19(1)(a) and 19(2): Article 19(1)(a) protects the freedom of speech and expression; Article 19(2) allows reasonable restrictions made by law; the grounds listed are public order, decency or morality, sovereignty and integrity of India, security of the state, friendly relations with foreign states, defamation, contempt of court and incitement to an offence; a restriction must be reasonable and rest on a listed ground',
);
const vPlan2 = table(
  ['Step of a 5-mark answer', 'Imagined plan for: harm principle'],
  [
    ['1. Thinker and idea', 'J. S. Mill, On Liberty (1859): restrict only to prevent harm to others'],
    ['2. Self-regarding', 'Affects only the actor, for example chess alone'],
    ['3. Other-regarding', 'Affects others, for example a poisoned stream'],
    ['4. Levels of harm', 'Minor: disapproval; serious: legal punishment'],
    ['5. Conclusion', 'The state may not restrict what harms no one else'],
  ],
  'Worked example table planning a five mark answer on the harm principle: the thinker and idea, self-regarding actions, other-regarding actions, levels of harm, and a conclusion',
  'A plan, to be written in your own words.',
);
const vFree = table(
  ['Point', 'A free society'],
  [
    ['Interests', 'Individuals pursue their own interests with a minimum of constraints'],
    ['Informed choice', 'Freedom includes the ability to make informed choices'],
    ['Responsibility', 'Free persons take responsibility for the results of their choices'],
    ['Imagined case', 'Sana of Pellam reads about two courses, chooses one and accepts the consequences'],
  ],
  'Table on a free society: individuals pursue their own interests with a minimum of constraints; freedom includes the ability to make informed choices and to take responsibility for them; imagined Sana of Pellam reads about two courses, chooses one and accepts the consequences',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Harm principle', 'Restrict freedom only to prevent harm to others (Mill, 1859)'],
    ['Kinds of action', 'Self-regarding or other-regarding'],
    ['Levels of harm', 'Minor: social disapproval. Serious: legal punishment'],
    ['Why expression matters', 'Some truth; clash of opinions; dead dogma'],
    ['Bans', 'Debated; minimal, on a ground, by due process'],
    ['Constitution', 'Article 19(1)(a) and reasonable restrictions under 19(2)'],
    ['Free society', 'Few constraints; informed choice; responsibility'],
  ],
  'Summary table of Part 2: the harm principle, kinds of action, levels of harm, why expression matters, bans, the Constitution and a free society',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Saying the state may stop any foolish act', 'Only to prevent harm to others'],
    ['Treating all harm alike', 'Minor harm: disapproval; serious harm: legal punishment'],
    ['Reciting the grounds of Article 19(2) as if all speech is banned', 'Restrictions must be reasonable and rest on listed grounds'],
    ['Taking a side on a ban', 'Give both views, then judge with reasons'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Freedom, Part 1: The Ideal, Constraints, Negative and Positive Liberty',
  goals: [
    'Explain freedom as the struggle against domination and give its standard definition',
    'Name the sources of constraints on freedom and say why some constraints are needed',
    'Define negative liberty and positive liberty, with imagined examples',
    'Explain how the two ideas can conflict and complement each other',
    'Plan a five mark answer on negative and positive liberty',
  ],
  slides: [
    sl('title', 'Freedom: The Ideal and Two Kinds of Liberty', {
      b: 'Part 1: **freedom** as an ideal, the **constraints** on it, and **negative** and **positive** liberty.',
      v: flow('LR', ['The ideal of freedom', 'Sources of constraints', 'Why some rules are needed', 'Negative liberty', 'Positive liberty'], 'Route map of Part 1: the ideal of freedom, sources of constraints, why some rules are needed, negative liberty and positive liberty', 'Part 1 at a glance'),
      n: 'Freedom is one of the most valued ideas in politics. In this part we ask what freedom means, what limits it, and why some limits are needed. Then we study two famous ways of thinking about it, called negative liberty and positive liberty.',
    }),
    sl('concept', 'Freedom as the struggle against domination', {
      v: vStruggle,
      n: 'Freedom is often described as a struggle against domination, which means resisting control imposed on the lives of people by others. Two books are named as examples: Long Walk to Freedom by Nelson Mandela, published in nineteen ninety four, and Freedom from Fear by Aung San Suu Kyi, published in nineteen ninety one. Freedom is won and kept by effort.',
    }),
    sl('concept', 'A standard definition of freedom', {
      v: vDefn,
      n: 'The standard definition has two parts. First, freedom is the absence of external constraints on what a person can do. Second, it is the presence of conditions in which people can develop their talents and make choices, which is called self determination. Real freedom needs both parts together.',
    }),
    sl('diagram', 'Sources of constraints on freedom', {
      v: vSources,
      n: 'Constraints on freedom come from two broad sources. One is domination and external control, by force or through laws imposed without consent. The other is social and economic inequality, such as caste based exclusion and poverty. But not every constraint is harmful, because people living together need rules.',
    }),
    sl('concept', 'Why some constraints are needed', {
      v: vNeeded,
      n: 'If there were no rules at all, the strong could override the weak, and freedom would be lost for many. So some constraints are needed. Rules should be accepted through legitimate procedures, not imposed in secret. A good rule protects freedom for everyone. Imagined Kellin shows this with a road rule decided at an open meeting.',
    }),
    sl('check', 'Quick check: the definition', {
      b: 'Which statement gives the standard definition of freedom?',
      chk: 'm_free_def',
      n: 'Recall the two parts of the standard definition of freedom.',
    }),
    sl('example', 'Worked example 1: sort the constraints of Arvelle', {
      b: 'Decide which source of constraint each imagined situation shows, or whether it is justified.',
      bl: ['Is the rule imposed **without consent**?', 'Does inequality **block development**?'],
      v: vSortArv,
      n: 'Let us sort four imagined situations in Arvelle. A governor who bans meetings by force is domination and external control. Seating children of one community apart is social inequality. A gifted girl kept from school by poverty is economic inequality. A quiet rule voted by the town meeting is a justified constraint.',
    }),
    sl('concept', 'Negative liberty', {
      v: vNegT,
      n: 'Negative liberty means freedom from interference. It is a minimum area in which a person can act without restraint by others or the state. The question it asks is how large the area is in which a person is left alone. The distinction was made famous by Isaiah Berlin. In imagined Dorrow, officials may not read private letters.',
    }),
    sl('concept', 'Positive liberty', {
      v: vPosT,
      n: 'Positive liberty means freedom to act and to develop. It needs enabling conditions such as education, health and resources. The question it asks is what a person is actually able to do and become. The state may need to act to expand it. Imagined Mirrenhall builds a library, a night school and a clinic.',
    }),
    sl('diagram', 'Negative and positive liberty side by side', {
      v: vNegPos,
      n: 'This chart sets the two ideas side by side. Negative liberty is freedom from interference, a protected area of choice. Positive liberty is freedom to act and develop, and it needs enabling conditions. They can conflict, because a tax for a clinic may feel like interference. They can also complement each other.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each term with its meaning.',
      chk: 'mt_liberty',
      n: 'Pair each term with its meaning.',
    }),
    sl('example', 'Worked example 2: Rhea of Kellin', {
      b: 'Decide which liberty Rhea has and which she lacks, and suggest a remedy.',
      bl: ['Is anyone **interfering**?', 'Does she have the **means** to act?'],
      v: vRhea,
      n: 'Imagined Rhea of Kellin may choose any trade, and no official interferes. So negative liberty is present. But she has no money for tools and cannot read the manuals, so positive liberty is lacking. A free tool loan and an evening class would add enabling conditions.',
    }),
    sl('concept', 'When the two ideas conflict and when they complement', {
      v: vConflict,
      n: 'The two ideas can conflict. State action to widen positive liberty, such as a tax for a clinic, may be seen by some as interference. They can also complement each other, since a protected area of choice is worth more when people have education and health. Some thinkers stress one, others the other. Judge with reasons.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about non-interference is true or false.',
      chk: 'tf_neg',
      n: 'Think about what non interference does and does not give a person.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on negative and positive liberty.',
      bl: ['Define **both**, with an **example** each', 'Cover **conflict** and **complement**'],
      v: vPlan1,
      n: 'To plan a five mark answer, define negative liberty, then positive liberty. Give one imagined example of each. Then explain how they may conflict, with the tax for a clinic, and how they complement each other, since a protected area needs the means to use it. Write it in your own words.',
    }),
    sl('check', 'Quick check: fill in the blanks', {
      b: 'Complete the sentence on the two kinds of liberty.',
      chk: 'fb_liberty',
      n: 'Recall which liberty is freedom from interference and which is freedom to act.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Freedom is the struggle against domination. It means the absence of external constraints and the presence of conditions to develop and choose. Constraints come from domination and from inequality, yet some rules are needed. Negative liberty is freedom from interference. Positive liberty is freedom to act and develop. They can conflict and complement each other.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give the **two parts** of the definition', 'Keep **negative** and **positive** apart', 'Add an **imagined example** to each', 'Write **some argue, others argue**'],
      v: vTips1,
      n: 'A few tips. Give both parts of the definition of freedom. Keep negative and positive liberty apart, and add a short imagined example to each. When the two conflict, write that some stress one and others the other, and then give your reasons.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Freedom, Part 2: The Harm Principle and Freedom of Expression',
  goals: [
    'State the harm principle and distinguish self-regarding and other-regarding actions',
    'Explain how minor and serious harms call for different responses',
    'Give three reasons why freedom of expression matters',
    'Discuss bans and say why constraints should be minimal and by due process',
    'Describe Article 19(1)(a) and the grounds of Article 19(2), and the idea of a free society',
  ],
  slides: [
    sl('title', 'The Harm Principle and Freedom of Expression', {
      b: 'Part 2: when may freedom be **restricted**, and why does **expression** matter?',
      v: flow('LR', ['The harm principle', 'Self and other regarding', 'Minor and serious harm', 'Why expression matters', 'Limits and Article nineteen'], 'Route map of Part 2: the harm principle, self-regarding and other-regarding actions, minor and serious harm, why expression matters, limits and Article 19', 'Part 2 at a glance'),
      n: 'In Part one we studied the ideal of freedom. In this part we ask when freedom may be restricted. We study the harm principle, and then freedom of expression, with the debates on bans and the way the Constitution protects this freedom while allowing reasonable restrictions.',
    }),
    sl('concept', 'The harm principle', {
      v: vHarmT,
      n: 'The harm principle says that the state or society may restrict the freedom of a person only to prevent harm to others. It was put forward by John Stuart Mill in his work On Liberty, in eighteen fifty nine. It rules out restricting a person for his own good, or because others dislike what he does.',
    }),
    sl('concept', 'Self-regarding and other-regarding actions', {
      v: vSelfOther,
      n: 'Mill separated two kinds of action. A self regarding action affects only the person who acts. An other regarding action affects other people. The difference matters because only harm to others can justify a restriction. The factory that poisons a stream may be restricted. Bram, studying chess alone, may not.',
    }),
    sl('diagram', 'The harm principle as a decision flow', {
      v: vHarm,
      n: 'This flow shows how to reason. First ask whether the action affects only the actor. If so, leave it free. If it affects others, ask whether the harm is minor or serious. Minor harm calls for social disapproval or a request. Serious harm may call for legal restriction and punishment.',
    }),
    sl('check', 'Quick check: the principle', {
      b: 'According to the harm principle, freedom may be restricted only for what purpose?',
      chk: 'm_harm_def',
      n: 'Recall the single purpose that the harm principle allows.',
    }),
    sl('example', 'Worked example 1: classify the complaints of Dorrow', {
      b: 'Classify each imagined complaint as self-regarding or other-regarding, and give a reason.',
      bl: ['Who is **affected**?', 'Is the harm **minor** or **serious**?'],
      v: vClassDorrow,
      n: 'Let us classify four imagined complaints in Dorrow. Reading late in a closed room is self regarding. Smoke into three homes every day is other regarding, and serious if illness follows. An evening drum is other regarding, with minor harm. Skipping lunch to save money is self regarding.',
    }),
    sl('concept', 'Minor harm and serious harm', {
      v: vLevels,
      n: 'Not all harm calls for the same response. Where there is no harm to others, there should be no restriction on this ground. Minor harm may call for social disapproval, a request or persuasion. Serious harm may call for legal restriction and punishment. The response should match the size of the harm.',
    }),
    sl('check', 'Quick check: put in order', {
      b: 'Arrange the steps of reasoning that a council uses under the harm principle.',
      chk: 'ord_hp',
      n: 'Think about which question comes first, and which comes last.',
    }),
    sl('concept', 'Why freedom of expression matters', {
      v: vMillT,
      n: 'Mill gave three reasons for protecting free expression. First, even a false view may contain some truth. Second, truth emerges through the clash of opinions, as ideas are tested by rival ideas. Third, an unchallenged truth becomes dead dogma, held without understanding. Each reason has an imagined example in Arvelle.',
    }),
    sl('diagram', 'Reasons and limits in one picture', {
      v: vExpr,
      n: 'This chart joins the reasons and the limits. On the left are the three reasons that freedom of expression matters. On the right are the limits that may be justified: only on a recognised ground, as small as needed, and decided by due process with reasons. In the Indian Constitution, one Article protects the freedom and another allows reasonable restrictions.',
    }),
    sl('example', 'Worked example 2: the play in Arvelle', {
      b: 'Trace how a fair procedure might handle a demand to ban an imagined play.',
      bl: ['Hear **both sides**', 'Look for a **recognised ground**'],
      v: vPlay,
      n: 'In imagined Arvelle, some residents ask for a play to be banned for mocking local customs. Others say it raises questions to debate. The council asks a panel to hear both sides, and to ask whether any recognised ground applies. If none applies, the play goes ahead. If one does, the restriction should be no more than needed.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about restricting a foolish act is true or false.',
      chk: 'tf_mill',
      n: 'Think about what the harm principle allows the state to restrict.',
    }),
    sl('concept', 'Censorship and bans: a debate', {
      v: vCensor,
      n: 'People disagree about bans on books, films or speech. Some argue that open expression helps truth and self government, and that a ban may suppress a view with some truth. Others argue that some expression can hurt people, and that certain speech, such as calls for violence, should be stopped. Students should weigh both views with reasons.',
    }),
    sl('concept', 'Constraints: minimal and through due process', {
      v: vDue,
      n: 'Constraints on expression may be justified in some cases, but they should be minimal and decided through due process. Minimal means no more than is needed to prevent the harm. They should rest on a recognised ground and not on dislike. And due process means a hearing, reasons and a chance to be heard.',
    }),
    sl('concept', 'Article 19 and the grounds of restriction', {
      v: vArt19,
      n: 'In the Indian Constitution, Article nineteen, clause one, sub clause a, protects the freedom of speech and expression. Article nineteen, clause two, allows reasonable restrictions made by law, on grounds such as public order, decency or morality, defamation, contempt of court and incitement to an offence. A restriction must be reasonable and rest on a listed ground.',
    }),
    sl('example', 'Worked example 3: plan a five mark answer', {
      b: 'Plan an answer on the harm principle.',
      bl: ['Name the **thinker** and **idea**', 'Give **both kinds** of action and **both levels** of harm'],
      v: vPlan2,
      n: 'To plan a five mark answer on the harm principle, begin with Mill and the idea that freedom may be restricted only to prevent harm to others. Then give a self regarding example and an other regarding example. Then the levels of harm. End with the conclusion. Write it in your own words.',
    }),
    sl('check', 'Quick check: assertion and reason', {
      b: 'Decide how the assertion and the reason about unquestioned beliefs relate.',
      chk: 'ar_dogma',
      n: 'Think about what happens to a belief that is never tested.',
    }),
    sl('concept', 'A free society: choice and responsibility', {
      v: vFree,
      n: 'A free society lets individuals pursue their own interests with a minimum of constraints. Freedom also includes the ability to make informed choices, and to take responsibility for them. Imagined Sana of Pellam reads about two courses, chooses one, and accepts the consequences.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The harm principle says freedom may be restricted only to prevent harm to others. Self regarding actions are left free, other regarding actions may be restricted. Minor harm calls for disapproval, serious harm for legal punishment. Free expression matters for three reasons, and constraints should be minimal and by due process. A free society values informed choice and responsibility.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say **only to prevent harm to others**', 'Link **minor harm** to disapproval, **serious harm** to punishment', 'Give **three reasons** from Mill', 'Name the **grounds** of Article nineteen, clause two'],
      v: vTips2,
      n: 'A few tips. State the harm principle with the words only to prevent harm to others. Link minor harm to social disapproval and serious harm to legal punishment. Give three reasons for free expression. And when you write on bans, give both views, then judge with reasons.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Freedom: Notes',
  sections: [
    {
      h: '1. The ideal of freedom',
      t: 1,
      b: '**Freedom** is the **struggle against domination**: people resist control imposed on their lives by others. Two books named only as examples are *Long Walk to Freedom* (1994) by Nelson Mandela and *Freedom from Fear* (1991) by Aung San Suu Kyi.\n\nThe standard definition has two parts: the **absence of external constraints**, and the **existence of conditions** in which people can **develop their talents** and make choices (**self-determination**).',
      terms: [
        ['Freedom', 'The absence of external constraints on what a person can do, together with conditions in which the person can develop talents and make choices.'],
        ['Domination', 'Control over people\'s lives imposed from outside, by force or by rules to which they have not consented.'],
        ['Self-determination', 'The ability of a person to make choices and shape his or her own life.'],
      ],
      v: vStruggle,
      vs: [vDefn],
    },
    {
      h: '2. Sources of constraints and the need for rules',
      t: 1,
      b: 'Constraints on freedom come from two broad sources.\n\n- **Domination and external control**: by force, or by laws imposed without consent.\n- **Social and economic inequality**: for example **caste-based exclusion** and **poverty**.\n\nYet **some constraints are needed**: living together needs **rules**. Rules should be accepted through **legitimate procedures** and should **protect freedom** rather than destroy it.',
      terms: [
        ['External constraint', 'A limit on a person\'s action that comes from outside, from other people, groups or the state.'],
        ['Legitimate procedure', 'A fair and open way of making rules that those who live under them can accept.'],
      ],
      v: vSources,
      vs: [vNeeded, vSortArv],
    },
    {
      h: '3. Negative and positive liberty',
      t: 1,
      b: '**Negative liberty** is **freedom from interference**: a minimum area of non-interference in which a person can act without restraint by others or the state. The distinction was made famous by **Isaiah Berlin**.\n\n**Positive liberty** is **freedom to act and develop**: it needs **enabling conditions** such as **education, health and resources**, and the state may need to act to expand it.\n\nThe two can **conflict**, since a tax for a clinic may be seen as interference, and can **complement** each other, since a protected area is worth more with the means to use it. Some thinkers stress one, others the other.',
      terms: [
        ['Negative liberty', 'Freedom from interference: a minimum area in which a person can act without restraint by others or the state.'],
        ['Positive liberty', 'Freedom to act and develop, which needs enabling conditions such as education, health and resources.'],
        ['Enabling conditions', 'Resources, health and education that let a person make real use of a choice.'],
      ],
      v: vNegPos,
      vs: [vNegT, vPosT, vRhea, vConflict, vPlan1],
    },
    {
      h: '4. The harm principle',
      t: 2,
      b: 'The **harm principle** of **J. S. Mill** (*On Liberty*, 1859) says that the state or society may restrict a person\'s freedom **only to prevent harm to others**.\n\n**Self-regarding actions** affect only the person who acts; **other-regarding actions** affect others.\n\nA **minor harm** may call for **social disapproval**; a **serious harm** may call for **legal punishment**.',
      terms: [
        ['Harm principle', 'The principle that the state or society may restrict a person\'s freedom only to prevent harm to others.'],
        ['Self-regarding action', 'An action that affects only the person who performs it.'],
        ['Other-regarding action', 'An action that affects other people.'],
      ],
      v: vHarm,
      vs: [vHarmT, vSelfOther, vClassDorrow, vLevels, vPlan2],
    },
    {
      h: '5. Freedom of expression and the debate on bans',
      t: 2,
      b: 'Mill gave three reasons for protecting free expression: a **false view may contain some truth**; **truth emerges through the clash of opinions**; **unchallenged truths become dead dogma**.\n\nPeople debate **bans on books, films or speech**. Some argue for open expression, others stress harm. **Constraints may be justified in some cases**, but they should be **minimal** and decided through **due process**.',
      terms: [
        ['Censorship', 'The control or suppression of books, films, speech or other expression by an authority.'],
        ['Dead dogma', 'A belief that is never questioned and so is held without understanding of its reasons.'],
        ['Due process', 'A fair procedure that gives a hearing, reasons and a chance to be heard before a decision.'],
      ],
      v: vExpr,
      vs: [vMillT, vPlay, vCensor, vDue],
    },
    {
      h: '6. Article 19 and a free society',
      t: 2,
      b: '**Article 19(1)(a)** protects the freedom of **speech and expression**. **Article 19(2)** allows **reasonable restrictions** made by law on grounds such as **public order**, **decency or morality**, the **sovereignty and integrity of India**, the **security of the state**, **friendly relations with foreign states**, **defamation**, **contempt of court** and **incitement to an offence**.\n\nA **free society** lets individuals pursue their interests with a **minimum of constraints**. Freedom also includes **informed choice** and **taking responsibility** for choices.',
      terms: [
        ['Freedom of speech and expression', 'The freedom to hold and share opinions in speech, writing and other forms, protected by Article 19(1)(a).'],
        ['Reasonable restriction', 'A limit on a freedom that is made by law, rests on a listed ground and goes no further than needed.'],
      ],
      v: vArt19,
      vs: [vFree],
    },
  ],
  tips: '**Common mistakes**\n- Saying freedom means no rules: some constraints are needed, if legitimate and protective of freedom.\n- Mixing up negative and positive liberty: negative is freedom from interference, positive is freedom to act, with enabling conditions.\n- Taking a side on which liberty matters more: write that some stress one and others the other, then give reasons.\n- Saying the state may stop any act it finds foolish: the harm principle allows restriction only to prevent harm to others.\n- Treating all harm alike: minor harm calls for disapproval, serious harm for legal punishment.\n- Listing the grounds of Article 19(2) as if speech may be banned freely: restrictions must be reasonable and rest on listed grounds.\n\n**Tips:** give a short imagined example with each definition; name the thinker and the date (Mill, 1859); give both views on a ban before judging with reasons.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Freedom as an **ideal**: what is it described as?', 'The struggle against domination.', 'concept'],
  ['Give the **standard definition** of freedom', 'The absence of external constraints, and the existence of conditions in which people can develop their talents and make choices.', 'definition'],
  ['What is **self-determination**?', 'The ability of a person to make choices and shape his or her own life.', 'definition'],
  ['What is **domination**?', 'Control over people\'s lives imposed from outside, by force or by rules without their consent.', 'definition'],
  ['Two broad sources of **constraints** on freedom', 'Domination and external control; social and economic inequality.', 'concept'],
  ['Two examples of **social and economic inequality**', 'Caste-based exclusion and poverty.', 'fact'],
  ['Why are some **constraints needed**?', 'People living together need rules.', 'concept'],
  ['What should be true of the **rules** that constrain us?', 'They should be accepted through legitimate procedures and should protect freedom, not destroy it.', 'concept'],
  ['What is **negative liberty**?', 'Freedom from interference: a minimum area in which a person can act without restraint by others or the state.', 'definition'],
  ['What is **positive liberty**?', 'Freedom to act and develop, which needs enabling conditions such as education, health and resources.', 'definition'],
  ['Who made the distinction between the two liberties famous?', 'Isaiah Berlin.', 'fact'],
  ['Which liberty may need **state action** to expand it?', 'Positive liberty.', 'concept'],
  ['How can negative and positive liberty **conflict**?', 'State action to widen positive liberty, such as a tax for a clinic, may be seen as interference.', 'concept'],
  ['How can the two **complement** each other?', 'A protected area of choice is worth more when people have the education and health to use it.', 'concept'],
  ['State the **harm principle**', 'The state or society may restrict a person\'s freedom only to prevent harm to others.', 'definition'],
  ['Who put forward the harm principle, and in which work?', 'J. S. Mill, in On Liberty (1859).', 'fact'],
  ['What is a **self-regarding action**?', 'An action that affects only the person who performs it.', 'definition'],
  ['What is an **other-regarding action**?', 'An action that affects other people.', 'definition'],
  ['Which kind of action may be restricted under the harm principle?', 'Other-regarding actions that cause harm to others.', 'concept'],
  ['Response to a **minor harm**', 'Social disapproval, a request or persuasion.', 'concept'],
  ['Response to a **serious harm**', 'Legal restriction and punishment.', 'concept'],
  ['Mill\'s first reason for free expression', 'Even a false view may contain some truth.', 'concept'],
  ['Mill\'s second reason for free expression', 'Truth emerges through the clash of opinions.', 'concept'],
  ['Mill\'s third reason for free expression', 'Unchallenged truths become dead dogma.', 'concept'],
  ['What is **dead dogma**?', 'A belief never questioned and held without understanding of its reasons.', 'definition'],
  ['What is **censorship**?', 'The control or suppression of books, films, speech or other expression by an authority.', 'definition'],
  ['Conditions for restricting expression', 'Minimal, resting on a recognised ground, and decided through due process.', 'concept'],
  ['What does **Article 19(1)(a)** protect?', 'The freedom of speech and expression.', 'fact'],
  ['What does **Article 19(2)** allow?', 'Reasonable restrictions, made by law, on that freedom.', 'fact'],
  ['Name five grounds in **Article 19(2)**', 'Public order, decency or morality, defamation, contempt of court, incitement to an offence (also sovereignty and integrity of India, security of the state, friendly relations with foreign states).', 'fact'],
  ['What does a **free society** allow?', 'Individuals pursue their own interests with a minimum of constraints, make informed choices and take responsibility for them.', 'concept'],
].map(([a, b, c]) => [a, b, c, 1]));

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Freedom',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_poverty_app', 'm_other_app', 'm_ban_app', 'ar_neg_pos'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_neg_def', 's_self_other', 's3_classify'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_neg_pos', 'l_harm'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_report'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Freedom',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_ineq_app', 'm_pos_app', 'm_both_app', 'm_conflict', 'm_minor_app', 'm_hp_not', 'm_clash_app', 'm_incite_app', 'ar_harm', 'ar_expr'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_ideal', 's_need_rules', { attempt: 1, keys: ['s_pos_def', 's_sources'] }, 's3_conflict', { attempt: 1, keys: ['s3_ban', 's3_mill_reasons'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_freedom', { attempt: 1, keys: ['l_expression', 'l_19'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_rules', 'c_play'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch12 only (ideal of freedom, constraints, negative and positive liberty; harm principle and freedom of expression)',
    originality: 'every scenario, town, school, play, person, register, notice, letter and report is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text, no quotation of any thinker, no real banned work, no board item reused (D-036)',
    facts: 'stable facts only: Mill, On Liberty, 1859; the negative/positive distinction associated with Isaiah Berlin; Mandela, Long Walk to Freedom, 1994 and Aung San Suu Kyi, Freedom from Fear, 1991 named as examples; Article 19(1)(a) and the grounds of Article 19(2)',
    neutrality: 'no map, no party, no current office-holder or present-day dispute named; negative versus positive liberty and bans presented as some argue, others argue; no real case or banned work mentioned',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
