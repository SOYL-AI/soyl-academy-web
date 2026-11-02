// ICSE 9 History & Civics, ch02 Directive Principles and the Welfare State — question bank.
// Every state government, scheme, village, petition, report and debate below is imagined by SOYL and labelled as
// imagined; no textbook text, box or exercise and no specimen or board-paper item is reused (D-036); no person is
// quoted, no Article is quoted (elementary study: Articles are named, never reproduced) and no current
// office-holder or current political position appears. Facts are stable provisions: Part IV (Articles 36 to 51),
// Article 37, Part III (Articles 12 to 35), Article 48A (42nd Amendment 1976), 73rd Amendment 1992,
// Equal Remuneration Act 1976, 86th Amendment 2002 (Article 21A), Right to Education Act 2009.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
export const PART_DP = { from: 36, to: 51 };
export const PART_FR = { from: 12, to: 35 };
assert.equal(PART_DP.to - PART_DP.from + 1, 16); // sixteen Articles in Part IV
assert.equal(PART_FR.to - PART_FR.from + 1, 24); // twenty-four Articles in Part III

/** The three common groups of Directive Principles as three boxes (a teaching classification, not in the Constitution). */
export function groupsFigure(alt, caption) {
  const s = new Svg(720, 250);
  const cols = [
    ['Socialistic (economic)', 'accent', ['Adequate livelihood', 'Equal pay for equal work', 'Right to work, public aid', 'Living wage, humane work', 'Resources for common good']],
    ['Gandhian', 'green', ['Village panchayats', 'Cottage industries', 'Weaker sections, SC and ST', 'Prohibition of intoxicants', 'Cow and cattle protection']],
    ['Liberal-intellectual', 'blue', ['Uniform civil code', 'Judiciary apart from executive', 'Protect monuments', 'International peace', 'Environment (Article 48A)']],
  ];
  cols.forEach(([title, col, lines], i) => {
    const x = 15 + i * 235;
    s.rect(x, 15, 220, 220, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + 110, 40, title, { size: 15, bold: true });
    s.line(x + 15, 56, x + 205, 56, { sw: 1, color: col });
    lines.forEach((t, k) => s.text(x + 110, 82 + k * 30, t, { size: 13 }));
  });
  return s.visual(alt, caption);
}

/** Even-spaced (not to scale) timeline of dated events: [year, line1, line2]. */
export function timelineFigure(events, alt, caption) {
  const s = new Svg(720, 190);
  const n = events.length;
  const gap = 640 / (n - 1);
  s.arrow(30, 80, 700, 80, { sw: 1.8 });
  events.forEach(([year, a, b], i) => {
    const x = 40 + i * gap;
    s.dot(x, 80, 6, 'accent');
    s.text(x, 55, String(year), { size: 15, bold: true });
    s.text(x, 108, a, { size: 11 });
    s.text(x, 126, b, { size: 11 });
  });
  s.text(360, 168, 'Schematic, not to scale', { size: 11, muted: true });
  return s.visual(alt, caption);
}
export const TIMELINE = [
  [1950, 'Constitution', 'in force'],
  [1976, 'Equal pay Act;', 'Article 48A added'],
  [1992, '73rd Amendment:', 'panchayats'],
  [2002, '86th Amendment:', 'education'],
  [2005, 'Rural jobs', 'guarantee Act'],
  [2009, 'Right to', 'Education Act'],
];
assert.deepEqual(TIMELINE.map((e) => e[0]), [...TIMELINE.map((e) => e[0])].sort((a, b) => a - b));

/** Two roles of the State: a night-watchman state and a welfare state. */
export function stateRolesFigure(alt, caption) {
  const s = new Svg(720, 230);
  s.rect(15, 20, 270, 190, { rx: 10, fill: 'muted', fillOpacity: 0.15, color: 'muted', sw: 1.6 });
  s.text(150, 46, 'Night-watchman state', { size: 15, bold: true });
  ['Law and order', 'Defence', 'Courts and justice'].forEach((t, k) => s.text(150, 90 + k * 32, t, { size: 13 }));
  s.arrow(295, 115, 425, 115, { sw: 2.4, color: 'accent', size: 12 });
  s.text(360, 98, 'adds', { size: 13, bold: true });
  s.rect(435, 20, 270, 190, { rx: 10, fill: 'accent', fillOpacity: 0.15, color: 'accent', sw: 1.8 });
  s.text(570, 46, 'Welfare state', { size: 15, bold: true });
  ['Health and education', 'Social security', 'Fair chances for all', 'Reduced inequality'].forEach((t, k) => s.text(570, 84 + k * 29, t, { size: 13 }));
  return s.visual(alt, caption);
}

// ================================================================ t01 Directive Principles: meaning, purpose, examples
Q('m_part', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Under which Part of the Constitution of India are the Directive Principles of State Policy placed?',
  opts: ['Part IV', 'Part III', 'Part II', 'Part V'],
  sol: 'The Directive Principles form Part IV, running from Article 36 to Article 51. Part III holds the Fundamental Rights, Part II deals with citizenship, and Part V deals with the Union government.',
}));
Q('m_articles', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which range of Articles makes up the Directive Principles of State Policy?',
  opts: ['Articles 36 to 51', 'Articles 12 to 35', 'Articles 1 to 11', 'Articles 52 to 78'],
  sol: 'Articles 36 to 51 are the Directive Principles. Articles 12 to 35 are the Fundamental Rights; Articles 1 to 11 deal with the Union and citizenship; Articles 52 to 78 deal with the President and the Union executive.',
}));
Q('m_irish', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The idea of placing Directive Principles in a constitution was taken by the framers of the Indian Constitution from the constitution of which country?',
  opts: ['Ireland', 'Canada', 'Japan', 'Switzerland'],
  sol: 'The framers were inspired by the Irish Constitution, which listed principles of social policy to guide its legislature. The other countries are not the source of this idea.',
}));
Q('m_purpose', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why did the framers include Directive Principles in a Constitution of a country that had just become free?',
  opts: [
    'To give governments goals for building a society with social and economic justice',
    'To list the punishments for breaking the law',
    'To fix the dates of elections in every State',
    'To give courts the power to run the government',
  ],
  sol: 'The framers wanted political freedom to be followed by social and economic justice, so Part IV sets goals for law-makers and governments. It does not list punishments or election dates, and it does not hand administration to the courts.',
}));
Q('m_nonjust', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'When the Directive Principles are described as non-justiciable, what does this mean?',
  opts: [
    'A court cannot order the government to carry them out',
    'They have no importance in making laws',
    'They apply only to the Union government and not to States',
    'They can be changed by any State legislature',
  ],
  sol: 'Non-justiciable means not enforceable in a court of law. Article 37 says the principles are nonetheless fundamental in the governance of the country, so they are important, they apply to States too, and a State legislature cannot rewrite them.',
}));
Q('m_court_petition', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Residents of the imagined district of Belapur file a petition asking the High Court to order their State to open a cottage-industry centre within a month, relying only on a Directive Principle. What is the most likely result?',
  opts: [
    'The court cannot compel the State to act on a Directive Principle, which is left to the legislature and the government',
    'The court orders the centre to be built, because Directive Principles are enforceable like rights',
    'The court dissolves the State legislature for neglecting the principle',
    'The court transfers the matter to the Election Commission',
  ],
  sol: 'Directive Principles are non-justiciable, so no court can compel their implementation; the State is expected to act through laws, budgets and policies. A court cannot dissolve a legislature, and the Election Commission does not hear such cases.',
}));
Q('m_cottage', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The imagined government of Sundarpur gives loans and workshop space to weavers and potters in its villages. Which group of Directive Principles does this policy mainly follow?',
  opts: ['Gandhian principles', 'Socialistic principles', 'Liberal-intellectual principles', 'Principles of defence and security'],
  sol: 'Encouraging cottage industries in rural areas is a Gandhian principle. Socialistic principles deal with livelihood and wages, liberal-intellectual ones with matters such as the judiciary and peace, and there is no group on defence.',
}));
Q('m_equalpay', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined State orders that women and men doing the same work in its tile factories must receive the same pay. Which Directive Principle is being put into effect?',
  opts: ['Equal pay for equal work, a socialistic principle', 'Organising village panchayats, a Gandhian principle', 'Separation of the judiciary from the executive', 'Promotion of international peace'],
  sol: 'Equal pay for men and women for equal work is a socialistic (economic) principle under Article 39. Village panchayats are Gandhian, and the other two options are liberal-intellectual principles that do not concern wages.',
}));
Q('m_judiciary', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A newly formed imagined State decides that district magistrates will no longer both investigate cases and judge them, and sets up separate courts. Which group of Directive Principles does this belong to?',
  opts: ['Liberal-intellectual principles', 'Gandhian principles', 'Socialistic principles', 'None, because it concerns only Fundamental Rights'],
  sol: 'Separating the judiciary from the executive (Article 50) is a liberal-intellectual principle. It is not Gandhian or socialistic, and it is a Directive Principle, not a Fundamental Right.',
}));
Q('m_env1976', mcq({
  t: 1, d: 3, c: 'recall',
  stem: 'A Directive Principle on protecting and improving the environment, forests and wildlife was not in the original Constitution of 1950. When and by which amendment was it added?',
  opts: ['In 1976 by the 42nd Amendment, as Article 48A', 'In 1951 by the First Amendment, as Article 40', 'In 1992 by the 73rd Amendment, as Article 44', 'In 2002 by the 86th Amendment, as Article 51'],
  sol: 'Article 48A came with the 42nd Amendment of 1976. The First Amendment of 1951 did not add it, the 73rd Amendment of 1992 concerned panchayats, and the 86th Amendment of 2002 concerned education.',
}));
Q('m_old_age', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The imagined State of Nilgiri Vale starts a monthly allowance for elderly persons who have no family support and no income. Which Directive Principle does this scheme support?',
  opts: ['Public assistance in old age, a socialistic principle', 'Protection of ancient monuments', 'Separation of the judiciary from the executive', 'Prohibition of intoxicating drinks'],
  sol: 'Article 41 asks the State to make effective provision for public assistance in cases such as old age, sickness and unemployment; it is a socialistic (economic) principle. The other options concern heritage, the courts and public health.',
}));
Q('m_not_gandhian', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'A student lists four Directive Principles under the heading Gandhian. Which item has been placed in the wrong group?',
  opts: [
    'Promoting international peace and friendly relations between nations',
    'Organising village panchayats as units of self-government',
    'Encouraging cottage industries in rural areas',
    'Promoting the interests of Scheduled Castes and Scheduled Tribes',
  ],
  sol: 'International peace (Article 51) is a liberal-intellectual principle. Village panchayats, cottage industries and the interests of weaker sections such as the Scheduled Castes and Scheduled Tribes are commonly grouped as Gandhian.',
}));
Q('m_state_duty', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'To whom are the Directive Principles of State Policy addressed?',
  opts: ['To the State: the legislatures and governments at the Union and State levels', 'Only to the Supreme Court', 'Only to the citizens of India', 'Only to the President'],
  sol: 'The principles are directions to the State, meaning Parliament, State legislatures and governments, to be kept in mind when making laws and policies. They are not orders addressed to the Supreme Court, to citizens alone, or to one office-holder.',
}));
Q('m_fund_gov', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Article 37 says that Directive Principles cannot be enforced by courts but are nevertheless fundamental in the governance of the country. What is the best reading of the second part?',
  opts: [
    'Governments are expected to keep the principles in view whenever they make laws and policies',
    'Courts must reject every law that does not follow them',
    'Citizens may refuse to obey laws that ignore them',
    'They override every Fundamental Right',
  ],
  sol: 'The Constitution places a duty on the State to apply the principles in making laws, even though the courts do not enforce them. It does not make laws void for ignoring them, allow disobedience, or give them priority over Fundamental Rights.',
}));
Q('fb_part', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The Directive Principles of State Policy are contained in Part ___ of the Constitution.',
  acc: [['IV', '4', 'Four', 'four']],
  sol: 'They are contained in Part IV, Articles 36 to 51.',
}));
Q('fb_ireland', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The framers of the Constitution drew the idea of Directive Principles from the constitution of ___.',
  acc: [['Ireland', 'Irish', 'the Irish Constitution']],
  sol: 'The idea came from the Irish Constitution.',
}));
Q('fb_48a', fb({
  t: 1, d: 3, c: 'recall',
  stem: 'Article 48A, which asks the State to protect the environment, was added by the ___ Amendment in 1976.',
  acc: [['42nd', '42', 'forty-second', 'forty second']],
  sol: 'It was added by the 42nd Amendment in 1976.',
}));
Q('mt_articles', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each Article of Part IV with the subject it deals with.',
  pairs: [
    ['Article 40', 'Organising village panchayats'],
    ['Article 44', 'A uniform civil code for citizens'],
    ['Article 48A', 'Protection of the environment, forests and wildlife'],
    ['Article 50', 'Separation of the judiciary from the executive'],
  ],
  sol: 'Article 40 concerns village panchayats, Article 44 a uniform civil code (the Constitution only directs the State to endeavour towards it), Article 48A the environment, and Article 50 the separation of the judiciary from the executive.',
}));
Q('ar_nonjust', ar({
  t: 1, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'Citizens of an imagined State cannot go to court to force its government to carry out a Directive Principle immediately.',
  r: 'Directive Principles are non-justiciable.',
  sol: 'Both are true. Because the principles are non-justiciable, a court cannot enforce them, which is exactly why such a petition cannot succeed on that basis alone.',
}));
Q('ar_env', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The Directive Principle on protecting the environment, forests and wildlife formed part of the Constitution when it came into force in 1950.',
  r: 'Article 48A was inserted by the 42nd Amendment in 1976.',
  sol: 'A is false: the principle was added later. R is true: Article 48A came in 1976 through the 42nd Amendment.',
}));
Q('ar_partiv', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Directive Principles of State Policy are placed in Part IV of the Constitution.',
  r: 'Directive Principles can be enforced by filing a writ petition in the Supreme Court.',
  sol: 'A is true: Part IV, Articles 36 to 51. R is false: Directive Principles are non-justiciable, so they cannot be enforced through a writ petition.',
}));
Q('tf_enforce', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'True or false? A citizen can ask the Supreme Court to enforce a Directive Principle in the same way as a Fundamental Right.',
  sol: 'Directive Principles are non-justiciable. Fundamental Rights can be enforced by the Supreme Court and the High Courts; Directive Principles cannot.',
}));
Q('tf_law_guide', tf({
  t: 1, d: 2, c: 'application', ans: true,
  stem: 'True or false? When the imagined State of Karuvan passes a law to provide free midday meals in schools, it may justify the law by pointing to the duty of the State to improve nutrition and public health.',
  sol: 'Article 47 asks the State to raise the level of nutrition and improve public health, and Article 37 makes applying such principles in law-making a duty. A State may therefore cite the principle in support of its measure.',
}));
Q('s_dp_meaning', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What are the Directive Principles of State Policy? Mention the Part and the Articles in which they are found.',
  model: 'They are **guidelines to the State** (governments and legislatures) for making laws and policies that bring about social and economic justice. They are found in **Part IV**, **Articles 36 to 51**.',
  sol: 'Meaning, then Part and Articles.',
  scheme: [['Meaning: guidelines for law-making and policy', 1], ['Part IV, Articles 36 to 51', 1]],
}));
Q('s_why_added', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why the framers placed Directive Principles in the Constitution although courts cannot enforce them.',
  model: '1. After independence, **political freedom** needed to be followed by **social and economic justice**, so goals were set for governments.\n2. The principles give **direction** to every future government and let citizens **judge its performance**.',
  sol: 'Any two sound reasons.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s_socialistic_two', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any two Directive Principles that relate to the economic welfare of citizens.',
  model: '1. The right of all citizens to **adequate means of livelihood**.\n2. **Equal pay for equal work** for men and women. (Also: right to work, public assistance, a living wage, just and humane conditions of work.)',
  sol: 'Any two economic or socialistic principles.',
  scheme: [['First principle', 1], ['Second principle', 1]],
}));
Q('s_gandhian_two', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two Directive Principles that are commonly called Gandhian.',
  model: '1. Organising **village panchayats** as units of self-government (Article 40).\n2. Encouraging **cottage industries** in rural areas. (Also: promoting the interests of weaker sections, and the prohibition of intoxicating drinks except for medicinal use.)',
  sol: 'Any two Gandhian principles.',
  scheme: [['First principle', 1], ['Second principle', 1]],
}));
Q('s_nonjust_meaning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does non-justiciable mean? Explain with reference to the Directive Principles.',
  model: '**Non-justiciable** means that a matter cannot be **enforced in a court of law**. A citizen cannot go to court to **compel** the State to carry out a Directive Principle, although the principles remain **fundamental in governance**.',
  sol: 'Meaning, then its application to Part IV.',
  scheme: [['Cannot be enforced by a court', 1], ['Applied to Directive Principles; still fundamental in governance', 1]],
}));
Q('s_classify_scenario', short({
  t: [1, 2], d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In the imagined State of Dhanora (a) police stop a peaceful public meeting without any legal reason, and (b) the government forms a committee to plan elected councils in every village. State which concerns a Fundamental Right and which a Directive Principle, with a reason for each.',
  model: '(a) A **Fundamental Right**: freedom of assembly can be **enforced in court**.\n(b) A **Directive Principle**: organising **village panchayats** is a goal the State is guided to pursue, which no court can compel.',
  sol: 'Classify each case and give the reason.',
  scheme: [['(a) Fundamental Right with reason', 1], ['(b) Directive Principle with reason', 1]],
}));
Q('s_two_diff', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two differences between Fundamental Rights and Directive Principles.',
  model: '1. Fundamental Rights are **justiciable** (courts enforce them); Directive Principles are **non-justiciable**.\n2. Fundamental Rights are in **Part III** and mostly limit State power; Directive Principles are in **Part IV** and direct the State to act.',
  sol: 'Any two correct differences.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s_pious', short({
  t: 2, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Some critics say Directive Principles are only hopeful wishes; others say they are a living guide for governments. Give one argument for each view.',
  model: '**Wishes:** since no court can enforce them, a government may **delay** or **ignore** them.\n**Guide:** many laws and programmes have been **based on them**, and the people can **judge** governments by how far they follow them.',
  sol: 'One argument for each side.',
  scheme: [['Argument that they are wishes', 1], ['Argument that they guide governments', 1]],
}));
Q('s_welfare_meaning', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by a welfare state?',
  model: 'A **welfare state** is one in which the government takes **responsibility for the well-being** of all citizens, for example through **health, education and social security**, and works to **reduce inequality** and give everyone fair chances.',
  sol: 'Responsibility for well-being, with examples.',
  scheme: [['Government takes responsibility for citizens\' well-being', 1], ['Examples or aims: services, security, less inequality', 1]],
}));
Q('s_welfare_example', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'The imagined State of Kaveripur gives free vaccination, pays pensions to the elderly poor and runs free schools. Name two features of a welfare state that these measures show.',
  model: '1. Provision of **basic services** such as health and education to all.\n2. **Social security** for those who cannot support themselves, such as the elderly poor, which also helps **reduce inequality**.',
  sol: 'Link each measure to a feature.',
  scheme: [['First feature linked to a measure', 1], ['Second feature linked to a measure', 1]],
}));
Q('s_73rd', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'How does the 73rd Amendment of 1992 carry out a Directive Principle?',
  model: 'The **73rd Amendment (1992)** gave **constitutional status** to **panchayats** as units of local self-government. This puts into effect the Directive Principle on **organising village panchayats** (Article 40).',
  sol: 'Amendment and its link to Article 40.',
  scheme: [['73rd Amendment gave panchayats constitutional status', 1], ['Linked to the principle on village panchayats', 1]],
}));
Q('s3_groups', short({
  t: 1, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'Name the three common groups into which Directive Principles are classified and give one example of each.',
  model: '1. **Socialistic (economic) principles**, which aim at economic fairness; for example, **equal pay for equal work**.\n2. **Gandhian principles**, which reflect village self-rule; for example, organising **village panchayats**.\n3. **Liberal-intellectual principles**, which deal with justice, heritage and peace; for example, **separating the judiciary from the executive**.',
  sol: 'Three groups, one example each.',
  scheme: [['Socialistic with example', 1], ['Gandhian with example', 1], ['Liberal-intellectual with example', 1]],
}));
Q('s3_rajgarh', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined government of Rajgarh wants to act on three Directive Principles: livelihood for all, village self-government and the protection of national monuments. Suggest one measure for each and name the group it belongs to.',
  model: '1. **Livelihood:** a scheme providing **work and training** (socialistic).\n2. **Village self-government:** strengthen **elected village councils** with funds and powers (Gandhian).\n3. **Monuments:** a fund and law to **protect and repair** monuments of national importance (liberal-intellectual).',
  sol: 'A measure and a group for each.',
  scheme: [['Livelihood measure and group', 1], ['Village council measure and group', 1], ['Monuments measure and group', 1]],
}));
Q('s3_court_refuse', short({
  t: [1, 2], d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'A citizens\' group in the imagined State of Marunadu asks a court to strike down a State law merely because it does not carry out a Directive Principle on public health. Explain why the court is unlikely to do so, and say what the group can do instead.',
  model: '1. Directive Principles are **non-justiciable**, so a law cannot be struck down only for **failing to implement** one.\n2. Courts strike down laws that **violate Fundamental Rights**, not those that merely fall short of Part IV.\n3. The group can **campaign**, petition the **legislature** and use **elections** to press for the policy.',
  sol: 'Non-justiciable; courts act on rights; democratic remedies.',
  scheme: [['Non-justiciable, so no striking down for non-implementation', 1], ['Courts strike down for rights violation only', 1], ['Democratic means open to the group', 1]],
}));
Q('s3_diff_three', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between Fundamental Rights and Directive Principles in terms of enforceability, nature and purpose.',
  model: '1. **Enforceability:** Fundamental Rights are **justiciable**; Directive Principles are **non-justiciable**.\n2. **Nature:** Fundamental Rights mostly **restrain the State**; Directive Principles require the State to **take positive action**.\n3. **Purpose:** Fundamental Rights secure **political democracy**; Directive Principles aim at **social and economic democracy**.',
  sol: 'One point each on enforceability, nature and purpose.',
  scheme: [['Enforceability', 1], ['Nature', 1], ['Purpose', 1]],
}));
Q('s3_features', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe any three features of a welfare state.',
  model: '1. It provides **basic services**: health care, education and safe living conditions.\n2. It offers **social security** such as pensions and help in unemployment, sickness or old age.\n3. It tries to **reduce inequality** by giving **equal opportunities** and protecting weaker sections.',
  sol: 'Any three features.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));
Q('s3_laws_dp', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Show how each of these implements a Directive Principle: (a) the 73rd Amendment of 1992, (b) the Equal Remuneration Act of 1976, (c) the 86th Amendment of 2002 and the Right to Education Act of 2009.',
  model: '(a) The **73rd Amendment** strengthened **panchayats**, following the principle on **village self-government**.\n(b) The **Equal Remuneration Act** requires **equal pay for equal work** for men and women.\n(c) The **86th Amendment** made education a right for children aged **six to fourteen**, and the **Right to Education Act** gave it effect, in line with the principle on **free and compulsory education**.',
  sol: 'Each law linked to its principle.',
  scheme: [['(a) with principle', 1], ['(b) with principle', 1], ['(c) with principle', 1]],
}));
Q('s3_why_matter', short({
  t: [2, 3], d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Even though courts do not enforce them, Directive Principles matter to ordinary citizens. Give three reasons.',
  model: '1. They **set goals** that governments are expected to follow in making laws.\n2. Citizens can use them as a **yardstick** to judge a government\'s performance at **elections** and in public debate.\n3. Courts may **read them together** with rights when **interpreting** the law, so they influence justice.',
  sol: 'Three reasons.',
  scheme: [['Set goals for governments', 1], ['Yardstick for citizens', 1], ['Influence on interpretation', 1]],
}));

// ================================================================ t02 Fundamental Rights and Directive Principles
Q('m_justiciable', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of the following can be enforced by a court of law?',
  opts: ['Fundamental Rights', 'Directive Principles', 'Both of them equally', 'Neither of them'],
  sol: 'Fundamental Rights are justiciable: a person whose right is violated can approach the Supreme Court or a High Court. Directive Principles are non-justiciable.',
}));
Q('m_remedy', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'If a State government violates a citizen\'s Fundamental Right, where can the citizen go for a remedy?',
  opts: ['To the Supreme Court or a High Court', 'To the Election Commission', 'To the Rajya Sabha', 'To the Finance Commission'],
  sol: 'The Constitution gives a remedy for violation of Fundamental Rights through the Supreme Court and the High Courts. The Election Commission, the Rajya Sabha and the Finance Commission do not hear such complaints.',
}));
Q('m_sort_caste', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In the imagined town of Ramnagar, a girl is refused admission to a government school only because of her caste. Her family can approach a court because',
  opts: [
    'equality and non-discrimination are Fundamental Rights, which courts can enforce',
    'the Directive Principles require every school to admit every child',
    'the school has broken a rule of the Election Commission',
    'courts enforce every principle of Part IV',
  ],
  sol: 'Refusing admission on the ground of caste violates the right to equality, a justiciable Fundamental Right. The Directive Principles are not enforceable, the Election Commission has no role here, and courts do not enforce all of Part IV.',
}));
Q('m_sort_dp', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The imagined government of Pahadgaon announces a plan to protect hill forests and wildlife over the next ten years. Which statement best describes this plan?',
  opts: [
    'It carries out a Directive Principle, which the government is guided but not compelled by courts to follow',
    'It is a Fundamental Right that any citizen can enforce in court',
    'It is illegal because only Parliament may protect forests',
    'It has no connection with the Constitution',
  ],
  sol: 'Protecting forests and wildlife is a Directive Principle (Article 48A), so the government acts on a goal that courts cannot compel. It is not a Fundamental Right; a State can act on the subject within its powers; and the plan clearly connects with Part IV.',
}));
Q('m_neg_pos', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which description fits the usual nature of Fundamental Rights compared with Directive Principles?',
  opts: [
    'Fundamental Rights mostly limit what the State may do, while Directive Principles ask the State to take positive steps',
    'Fundamental Rights are goals for the future, while Directive Principles protect individuals right now',
    'Both of them are only moral guidance',
    'Fundamental Rights concern only the economy, and Directive Principles concern only politics',
  ],
  sol: 'Most Fundamental Rights act as limits on State power (the State shall not discriminate, shall not deny equality), whereas Directive Principles require positive action such as providing livelihood. The other options reverse or distort this contrast.',
}));
Q('m_pol_soc', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which pair correctly states the purpose of Fundamental Rights and of Directive Principles?',
  opts: [
    'Fundamental Rights secure political democracy; Directive Principles aim at social and economic democracy',
    'Fundamental Rights secure economic democracy; Directive Principles secure political democracy',
    'Both secure only military strength',
    'Both are meant only for the courts',
  ],
  sol: 'Fundamental Rights protect political freedoms and equality, giving political democracy; Directive Principles aim at social and economic democracy. The reversed pair is wrong, and neither concerns military strength alone.',
}));
Q('m_law_conflict', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which statement about courts and a State law is correct?',
  opts: [
    'A court can strike down a law that violates a Fundamental Right, but not a law merely because it fails to carry out a Directive Principle',
    'A court can strike down any law that does not carry out a Directive Principle',
    'A court cannot examine any law made by a State legislature',
    'A court can strike down a law only if the Election Commission asks it to',
  ],
  sol: 'Courts test laws against Fundamental Rights and may declare a violating law void. Failure to implement a non-justiciable Directive Principle is not a ground for striking down a law. Courts can examine State laws, and they do not need any request from the Election Commission.',
}));
Q('m_two_petitions', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Two petitions reach a High Court in the imagined State of Eastmoor: (1) traders say a new rule stops them from carrying on their lawful trade; (2) a workers\' union asks the court to direct the State to pay a living wage to all workers at once. Which claim can the court examine directly as a legal right, and why?',
  opts: [
    'The traders\' claim, because it rests on a Fundamental Right',
    'The union\'s claim, because Directive Principles are justiciable',
    'Both, because the court enforces all of the Constitution in the same way',
    'Neither, because the court cannot hear claims against a State',
  ],
  sol: 'A claim of violation of the freedom to practise a trade rests on a Fundamental Right, which the court can enforce. The living wage is a Directive Principle, which is non-justiciable, so the court cannot direct the State to pay it. Courts do hear claims against a State.',
}));
Q('ar_neg', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Fundamental Rights mostly act as restrictions on what the State may do.',
  r: 'Directive Principles aim at social and economic democracy.',
  sol: 'Both are true, but the aim of the Directive Principles does not explain why Fundamental Rights act as restrictions, so R is not the explanation of A.',
}));
Q('fb_justiciable', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Fundamental Rights are enforceable by courts, so they are described as ___, while Directive Principles are non-justiciable.',
  acc: [['justiciable', 'enforceable']],
  sol: 'Rights that courts can enforce are called justiciable.',
}));
Q('s_diff_nature', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain how the nature and the aim of Directive Principles differ from those of Fundamental Rights.',
  model: 'Fundamental Rights mainly **limit the State** and protect individuals, securing **political democracy**. Directive Principles ask the State to take **positive steps** for the people, aiming at **social and economic democracy**.',
  sol: 'Contrast in nature and aim.',
  scheme: [['Nature: limits versus positive action', 1], ['Aim: political versus social and economic democracy', 1]],
}));
Q('s_complement', short({
  t: 2, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Fundamental Rights and Directive Principles are called complementary. Explain this with one example.',
  model: 'Rights protect individual **freedom and equality**, while the principles aim at **welfare for all**; each completes the other. For example, the **right to education** (a right) and the principle on **free and compulsory education** work toward the same end.',
  sol: 'Complementary roles with an example.',
  scheme: [['Complementary roles explained', 1], ['A suitable example', 1]],
}));

// ================================================================ t03 Welfare state
Q('m_welfare_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which of these best describes a welfare state?',
  opts: [
    'A state that takes responsibility for the well-being of its citizens, including health, education and social security',
    'A state that limits itself to defence and keeping order',
    'A state in which all businesses are closed',
    'A state in which only the army makes decisions',
  ],
  sol: 'A welfare state promotes the well-being of all citizens through services and security. The second option describes a night-watchman state, and the last two are not forms of welfare state.',
}));
Q('m_welfare_feature', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which action of an imagined government is the clearest example of welfare-state policy?',
  opts: [
    'Running free health clinics and giving pensions to elderly people who have no income',
    'Raising an army for defence of the borders',
    'Holding an annual trade fair',
    'Building a stadium for national matches',
  ],
  sol: 'Free health care and pensions for people without income directly promote well-being and social security, the core of a welfare state. Defence, fairs and stadiums have their uses but do not show welfare responsibility.',
}));
Q('m_preamble', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which promise in the Preamble is most closely linked to the idea of a welfare state?',
  opts: ['Justice, social, economic and political', 'Unity of the nation only', 'Freedom of trade only', 'The right to vote only'],
  sol: 'The Preamble promises justice in its social, economic and political forms, and the Directive Principles are the means of working toward social and economic justice. The other options cover only parts of the Preamble.',
}));
Q('m_panchayat', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In 1992 the 73rd Amendment gave constitutional status to panchayats. Which Directive Principle does this carry out?',
  opts: ['Organising village panchayats as units of self-government (Article 40)', 'Equal pay for equal work', 'Protection of monuments', 'Separation of the judiciary from the executive'],
  sol: 'The 73rd Amendment (1992) strengthened village self-government, which is the subject of Article 40. The other options are different principles concerning wages, heritage and the courts.',
}));
Q('m_equalrem', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The Equal Remuneration Act of 1976 forbids paying men and women different wages for the same work. Which Directive Principle does it help to realise?',
  opts: ['Equal pay for equal work for men and women', 'Prohibition of intoxicating drinks', 'Promotion of international peace', 'Encouragement of cottage industries'],
  sol: 'The Act gives effect to the principle of equal pay for equal work (Article 39). It has nothing to do with intoxicants, international peace or cottage industries.',
}));
Q('m_edu86', mcq({
  t: 3, d: 3, c: 'recall',
  stem: 'Which step made education a Fundamental Right for children in the age group of six to fourteen years?',
  opts: ['The 86th Amendment of 2002, which inserted Article 21A', 'The 73rd Amendment of 1992', 'The 42nd Amendment of 1976', 'The Equal Remuneration Act of 1976'],
  sol: 'The 86th Amendment (2002) inserted Article 21A, and the Right to Education Act of 2009 gave it effect. The 73rd Amendment dealt with panchayats, the 42nd with several changes including Article 48A, and the Equal Remuneration Act with equal pay.',
}));
Q('m_nightwatch', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'An imagined State Alpha spends its revenue only on police, courts and defence. Another imagined State Beta also runs schools, hospitals and old-age pensions. What is the difference between them?',
  opts: [
    'Beta follows the welfare-state idea of promoting citizens\' well-being, while Alpha limits itself to a narrow role',
    'Alpha is a welfare state and Beta is not',
    'Both are welfare states in the same way',
    'Neither is a state in the constitutional sense',
  ],
  sol: 'Beta provides services and security that promote well-being, which is the welfare role. Alpha restricts itself to order and defence, a narrow or night-watchman role. The other options reverse or ignore the difference.',
}));
Q('m_nrega', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A law of 2005 promised paid manual work for rural households that ask for it. Which Directive Principle does such an employment guarantee support?',
  opts: ['The right to work, an economic principle', 'Protection of monuments', 'Separation of the judiciary from the executive', 'International peace'],
  sol: 'An employment guarantee supports Article 41 (right to work, within the limits of economic capacity). It does not concern monuments, the courts or international peace.',
}));
Q('ar_welfare', ar({
  t: 3, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Directive Principles aim to make India a welfare state.',
  r: 'The Directive Principles direct the State to secure social and economic justice for all citizens.',
  sol: 'Both are true. Because the principles ask the State to secure social and economic justice, they point the country toward a welfare state.',
}));
Q('tf_panchayat', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The 73rd Amendment of 1992 gave constitutional status to panchayats, a step connected with the Directive Principle on village panchayats.',
  sol: 'The amendment strengthened local self-government, in line with Article 40.',
}));
Q('mt_laws', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Match each law or amendment with the Directive Principle it helps to carry out.',
  pairs: [
    ['Equal Remuneration Act, 1976', 'Equal pay for equal work'],
    ['73rd Amendment, 1992', 'Organising village panchayats'],
    ['86th Amendment, 2002', 'Education for children'],
    ['Rural employment guarantee Act, 2005', 'The right to work'],
  ],
  sol: 'The 1976 Act is about equal pay, the 73rd Amendment about panchayats, the 86th Amendment about children\'s education, and the 2005 Act about work.',
}));
Q('ord_timeline', ord({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps toward the aims of Part IV in the order in which they happened.',
  items: [
    'The Constitution comes into force with Part IV',
    'Equal Remuneration Act passed and Article 48A added',
    'The 73rd Amendment gives panchayats constitutional status',
    'The 86th Amendment makes education a Fundamental Right for children',
    'The Right to Education Act is passed',
  ],
  sol: 'Constitution (1950), Equal Remuneration Act and Article 48A (1976), 73rd Amendment (1992), 86th Amendment (2002), Right to Education Act (2009).',
}));
Q('s_preamble_link', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How is the idea of a welfare state linked to the Preamble and to Part IV?',
  model: 'The Preamble promises **social and economic justice**. The **Directive Principles** in Part IV turn this into goals, such as **livelihood**, education and security, which a welfare state is expected to provide.',
  sol: 'Preamble promise and Part IV goals.',
  scheme: [['Preamble promises social and economic justice', 1], ['Part IV sets goals toward it', 1]],
}));
Q('s_rte', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Explain how the aim of free and compulsory education for children moved from a Directive Principle to a legal right.',
  model: 'Education for children was first an **aim of Part IV**. The **86th Amendment (2002)** inserted **Article 21A**, making it a **Fundamental Right** for ages six to fourteen, and the **Right to Education Act (2009)** gave it effect.',
  sol: 'Directive aim, 86th Amendment, 2009 Act.',
  scheme: [['Started as a Directive aim', 1], ['86th Amendment and 2009 Act made it a right', 1]],
}));
Q('s3_welfare_dp', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain in three points how the Directive Principles aim to make India a welfare state.',
  model: '1. They ask the State to secure a **social order** based on **justice**, social, economic and political.\n2. They direct it to provide **livelihood, work, a living wage and public assistance**, reducing hardship.\n3. They call for **equal opportunities**, care of **weaker sections**, health and education, lessening **inequality**.',
  sol: 'Three links between Part IV and welfare.',
  scheme: [['Social order based on justice', 1], ['Livelihood, work and assistance', 1], ['Equal opportunity and weaker sections', 1]],
}));
Q('s3_state_roles', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Distinguish a night-watchman state from a welfare state, and give one reason why many people prefer the second.',
  model: '1. A **night-watchman state** limits itself to **law and order, defence and justice**.\n2. A **welfare state** adds **health, education and social security** and works to **reduce inequality**.\n3. Many prefer it because it helps **poorer and weaker citizens** to enjoy a decent life and fair chances.',
  sol: 'Two roles and one reason.',
  scheme: [['Night-watchman state', 1], ['Welfare state', 1], ['One reason for preference', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_dp_meaning', long({
  t: 1, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Directive Principles of State Policy guide those who govern.\n\n(i) What are Directive Principles? Mention where they are found and from which constitution the idea was taken. **[3]**\n(ii) Name the three common groups of Directive Principles and give one example of each. **[3]**\n(iii) Why are they non-justiciable, and in what sense are they still fundamental in the governance of the country? **[4]**',
  model: '(i) They are **directions to the State** for making laws and policies that bring **social and economic justice**. They are found in **Part IV**, **Articles 36 to 51**, and the idea came from the **Irish Constitution**.\n\n(ii) **Socialistic (economic):** equal pay for equal work. **Gandhian:** organising village panchayats. **Liberal-intellectual:** separating the judiciary from the executive.\n\n(iii) They are **non-justiciable** because the country had limited resources and needed time, so courts were not made to enforce them at once. Still, **Article 37** makes it the **duty of the State** to apply them in making laws, so governments must keep them in view, and citizens can **judge** governments by them.',
  sol: 'Meaning, source and place; groups; non-justiciable yet fundamental.',
  scheme: [['(i) Meaning', 1], ['(i) Part IV and Articles', 1], ['(i) Irish source', 1], ['(ii) Three groups named', 1.5], ['(ii) Three examples', 1.5], ['(iii) Why non-justiciable', 2], ['(iii) Fundamental in governance', 2]],
}));
Q('l_dp_groups', long({
  t: 1, d: 2, c: 'recall', marks: 10, wl: L10,
  stem: 'Directive Principles may be sorted into groups.\n\n(i) State three socialistic (economic) principles. **[3]**\n(ii) State three Gandhian principles. **[3]**\n(iii) State four liberal-intellectual principles. **[4]**',
  model: '(i) **Adequate means of livelihood** for all citizens; **equal pay for equal work** for men and women; the **right to work** and **public assistance** in unemployment, old age and sickness (also a living wage and humane conditions of work).\n\n(ii) Organising **village panchayats**; promoting **cottage industries** in rural areas; promoting the interests of **weaker sections**, including the Scheduled Castes and Scheduled Tribes (also the prohibition of intoxicating drinks except for medicinal use).\n\n(iii) A **uniform civil code** as a stated goal (Article 44); **separation of the judiciary from the executive**; **protection of monuments** of national importance; promotion of **international peace**; protection of the **environment** (Article 48A, 1976).',
  sol: 'Three economic, three Gandhian and four liberal-intellectual principles.',
  scheme: [['(i) Three socialistic principles', 3], ['(ii) Three Gandhian principles', 3], ['(iii) Four liberal-intellectual principles', 4]],
}));
Q('l_fr_dp', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Fundamental Rights and Directive Principles are both parts of the Constitution.\n\n(i) Distinguish them in terms of enforceability, with the Parts in which they are found. **[3]**\n(ii) Explain the difference in their nature and in their purpose. **[3]**\n(iii) Explain why it is said that Fundamental Rights and Directive Principles supplement each other. **[4]**',
  model: '(i) **Fundamental Rights** (Part III) are **justiciable**: courts enforce them and can strike down laws that violate them. **Directive Principles** (Part IV) are **non-justiciable**: courts cannot compel the State to implement them.\n\n(ii) Rights mostly **restrain the State**, protecting individual freedom, and secure **political democracy**. Principles require **positive action** by the State and aim at **social and economic democracy**.\n\n(iii) Rights give people **freedom and equality**; principles supply the **welfare** that makes these meaningful. A hungry person cannot use freedom fully, so both are needed. The **right to education** and the principle on **free and compulsory education** point toward the same end, so each **completes** the other.',
  sol: 'Enforceability and Parts; nature and purpose; complementarity.',
  scheme: [['(i) Rights justiciable, Part III', 1.5], ['(i) Principles non-justiciable, Part IV', 1.5], ['(ii) Nature', 1.5], ['(ii) Purpose', 1.5], ['(iii) Complementary roles', 2], ['(iii) Example', 2]],
}));
Q('l_marunadu', long({
  t: 2, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Three matters come up in the imagined State of Marunadu: (1) a college is refused permission to hold a peaceful procession without any lawful reason; (2) a citizens\' forum demands that the government provide work for every unemployed person at once; (3) the government itself proposes a law to organise elected village councils.\n\n(i) Classify each matter as concerning a Fundamental Right or a Directive Principle. **[3]**\n(ii) What can a court do, and what can it not do, in these matters? **[3]**\n(iii) Why should the government still pursue the matters that courts cannot compel? **[4]**',
  model: '(i) (1) A **Fundamental Right**: freedom of assembly. (2) A **Directive Principle**: the right to work and public assistance. (3) A **Directive Principle**: organising **village panchayats**.\n\n(ii) The court can **enforce** the college\'s right in (1) and strike down an unlawful order. It **cannot compel** the government to provide work in (2) or to pass the law in (3), as these are **non-justiciable**.\n\n(iii) Article 37 makes applying the principles a **duty of the State** in making laws. They express the **goals** of the Constitution: social and economic justice. The people can **judge** the government at **elections**, so ignoring them can be costly, and implementing them moves the State toward a **welfare state**.',
  sol: 'Classification; court powers; why govern by principles.',
  scheme: [['(i) Matter (1)', 1], ['(i) Matter (2)', 1], ['(i) Matter (3)', 1], ['(ii) What the court can do', 1.5], ['(ii) What it cannot do and why', 1.5], ['(iii) State\'s duty', 2], ['(iii) Elections and welfare state', 2]],
}));
Q('l_welfare', long({
  t: 3, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'India has set itself the aim of becoming a welfare state.\n\n(i) What is meant by a welfare state? **[3]**\n(ii) Mention three activities which a welfare state undertakes for its people. **[3]**\n(iii) Explain how the Directive Principles aim to make India a welfare state, with two examples of laws or amendments that carry them out. **[4]**',
  model: '(i) A **welfare state** takes **responsibility for the well-being** of all its citizens, especially the poor and the weak, and works to **reduce inequality** and give fair chances to everyone.\n\n(ii) It provides **health care**, **education** and **social security** such as pensions and help in unemployment or sickness (also housing and protection of workers).\n\n(iii) The principles direct the State to secure **social, economic and political justice**, a **living wage**, **work**, **public assistance**, equal opportunity and care of weaker sections. Examples: the **73rd Amendment (1992)** strengthened **panchayats**, and the **Equal Remuneration Act (1976)** gave effect to **equal pay for equal work**. The **86th Amendment (2002)** and the **Right to Education Act (2009)** are another.',
  sol: 'Meaning; activities; Part IV and two examples.',
  scheme: [['(i) Responsibility for well-being', 2], ['(i) Reducing inequality', 1], ['(ii) Three activities', 3], ['(iii) Part IV directions toward welfare', 2], ['(iii) Two examples of laws or amendments', 2]],
}));
Q('l_prefer', long({
  t: [2, 3], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'The imagined State of Tarangpur has passed a law requiring equal pay for equal work, but some employers say the law is difficult to apply.\n\n(i) Name the Directive Principle behind the law and its group. **[3]**\n(ii) Why can a worker not go to court to demand that the State pass such a law? **[3]**\n(iii) Evaluate how far laws and programmes of this kind help a country move toward a welfare state, and what else is needed for the aim to succeed. **[4]**',
  model: '(i) The principle of **equal pay for equal work** for men and women, a **socialistic (economic)** principle of Part IV; the Equal Remuneration Act of 1976 is an example.\n\n(ii) Directive Principles are **non-justiciable**, so a court **cannot compel** the legislature to make a law to carry them out. A worker can use the law once it is passed, but cannot demand its making.\n\n(iii) Such laws **reduce inequality** and set standards, so they help. But a law alone does not guarantee results: it needs **honest enforcement**, **awareness** among workers, **resources** and **public pressure**. Therefore laws, **fair administration** and **active citizens** must work together before the welfare aim is met.',
  sol: 'Principle and group; non-justiciability; balanced evaluation.',
  scheme: [['(i) Equal pay for equal work', 1.5], ['(i) Socialistic group, Part IV', 1.5], ['(ii) Non-justiciable', 1.5], ['(ii) Court cannot compel legislation', 1.5], ['(iii) How laws help', 2], ['(iii) What else is needed', 2]],
}));
Q('l_chandrapur', long({
  t: [1, 3], d: 4, c: 'application', marks: 10, wl: L10,
  stem: 'The imagined government of Chandrapur announces a plan with four measures: (a) a workshop scheme for rural weavers, (b) a pension for destitute elderly persons, (c) a fund to repair a historic fort, (d) free schooling for all children up to the age of fourteen.\n\n(i) Identify the Directive Principle behind any three of the measures. **[3]**\n(ii) Name the group to which each of those three belongs. **[3]**\n(iii) Explain how the plan moves Chandrapur toward a welfare state, and why a court cannot compel the government to carry it out. **[4]**',
  model: '(i) (a) The workshop scheme follows the principle of promoting **cottage industries** in rural areas (Article 43). (b) The pension follows the principle of **public assistance in old age** (Article 41). (c) The fund for the fort follows the principle of **protection of monuments** of national importance (Article 49). [Measure (d) follows the aim of free and compulsory education for children.]\n\n(ii) Measure (a) belongs to the **Gandhian** group; measure (b) to the **socialistic (economic)** group; and measure (c) to the **liberal-intellectual** group.\n\n(iii) The pension and the free schooling give **security and basic services**, the workshops give **livelihood**, and together they help **reduce inequality**, which are marks of a **welfare state**. A court cannot compel the government to carry out the plan because Directive Principles are **non-justiciable**; its execution depends on the **legislature, the budget and the government**, whom the people can judge at **elections**.',
  sol: 'Principles, groups, welfare link and non-justiciability.',
  scheme: [['(i) Three principles identified', 3], ['(ii) Three groups named', 3], ['(iii) Link to welfare state', 2], ['(iii) Non-justiciable, left to government', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_courier', source({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined newspaper report and answer the questions that follow. ${IMAG}`,
  passage: '**The Dhanora Courier, city page (imagined)**\n\nThe state government of Dhanora announced on Monday that it will open a weaving and pottery centre in every village council area and pay a monthly allowance to residents above seventy who have no family support. Within the same week, the Dhanora Traders\' Group moved the High Court, saying that a new licensing order had stopped its members from carrying on their lawful trade. A separate group of villagers also petitioned the court, asking it to direct the government to open the new centres within six months.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'To which group of Directive Principles does the plan for weaving and pottery centres belong?', model: '**Gandhian**: it encourages **cottage industries** in villages.', sol: 'Cottage industries are a Gandhian principle.', scheme: [['Gandhian with reason', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Which of the two petitions rests on a Fundamental Right?', model: 'The **traders\'** petition, which claims the freedom to carry on a **lawful trade**.', sol: 'Trade freedom is a right the court can enforce.', scheme: [['Traders\' petition', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why the court can deal differently with the two petitions.', model: 'The **traders\'** claim concerns a **Fundamental Right**, which the court can **enforce**. The villagers rely on a **Directive Principle**, which is **non-justiciable**, so the court **cannot direct** the government to build the centres.', sol: 'Right versus principle.', scheme: [['Fundamental Right enforceable', 1], ['Directive Principle not enforceable', 1]] }), [
      short({ t: [1, 3], d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name the Directive Principle behind the allowance for the elderly and say how it fits the idea of a welfare state.', model: 'It follows the principle of **public assistance in old age** (Article 41), a socialistic principle. It provides **social security** to those who cannot support themselves, a feature of a **welfare state**.', sol: 'Principle and welfare link.', scheme: [['Public assistance in old age', 1], ['Link to social security in a welfare state', 1]] }),
    ]),
  ],
}));
Q('sb_nalgaon', source({
  t: [1, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined project notes and answer the questions that follow. ${IMAG}`,
  passage: '**Class IX project notes on the village of Nalgaon (imagined)**\n\nBefore the reforms, the nearest primary school was far away, women on the farms earned less than men for the same work, and many old people had no one to support them. Afterwards the state opened a village school and waived its fees. A new law required the farm cooperative to pay equally for equal work. A small monthly allowance began for old people without support, and the elected village council was given funds and a part in planning local projects.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which change in Nalgaon follows the principle of equal pay for equal work?', model: 'The **new law** requiring the cooperative to pay **equally for equal work**.', sol: 'Equal pay for equal work (Article 39).', scheme: [['Equal pay law', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name one measure in the notes that provides social security.', model: 'The **monthly allowance** for old people without support.', sol: 'Allowance for the elderly.', scheme: [['Allowance for the elderly', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain how Nalgaon\'s reforms show the features of a welfare state.', model: 'The **school** provides a **basic service**; the **allowance** gives **social security**; the **equal pay** and the council\'s funds create **fairer chances**, so inequality falls: these are marks of a **welfare state**.', sol: 'Three changes linked to welfare features.', scheme: [['Basic service and social security linked', 1], ['Fairness and reduced inequality linked', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Identify the Directive Principle behind giving funds and a planning role to the village council, and name its group.', model: 'It follows the principle of **organising village panchayats** (Article 40), which is a **Gandhian** principle, supported by the **73rd Amendment (1992)**.', sol: 'Article 40 and the Gandhian group.', scheme: [['Village panchayats principle', 1], ['Gandhian group', 1]] }),
    ]),
  ],
}));
Q('sb_debate', source({
  t: 2, d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined minutes of a Class IX debate and answer the questions that follow. ${IMAG}`,
  passage: '**Minutes of a Class IX classroom debate (imagined)**\n\nMotion: Directive Principles are only hopeful wishes.\n\nFirst speaker (for the motion): No court can order a government to carry them out, so a government can simply postpone them for years.\n\nSecond speaker (against): Governments are expected to follow them when they make laws. Panchayats and free schooling for children have come about by following them, and voters can ask what a government has done about them.\n\nThe teacher noted that both speakers had made a fair point.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'understanding', marks: 1, stem: 'Which feature of Directive Principles does the first speaker rely on?', model: 'That they are **non-justiciable**: courts **cannot enforce** them.', sol: 'Non-justiciable.', scheme: [['Non-justiciable', 1]] })),
    child('b', short({ t: [2, 3], d: 2, c: 'application', marks: 1, stem: 'Name one result the second speaker could cite to show that the principles guide governments.', model: '**Panchayats** (73rd Amendment, 1992) or **free schooling** for children (86th Amendment and the Right to Education Act).', sol: 'Either example.', scheme: [['One valid example', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which speaker is more convincing? Give two reasons.', model: 'The **second** speaker, because the principles **guide law-making** (panchayats, education) and citizens can **hold governments to account** at elections, so they are more than wishes. The first speaker is right on **enforceability** but misses their influence.', sol: 'A supported choice with two reasons.', scheme: [['Choice with first reason', 1], ['Second reason', 1]] }), [
      short({ t: 2, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Using the debate, state two differences between Directive Principles and Fundamental Rights.', model: 'Fundamental Rights are **enforceable in courts**, whereas the principles are **non-justiciable**. Rights **protect individuals** from the State, whereas the principles **direct the State** to act for social and economic welfare.', sol: 'Two differences.', scheme: [['Enforceability', 1], ['Nature or purpose', 1]] }),
    ]),
  ],
}));
