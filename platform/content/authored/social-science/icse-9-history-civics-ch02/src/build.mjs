// Build ICSE 9 History & Civics ch02 Directive Principles and the Welfare State. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch02', 'social-science');
const { groupsFigure, timelineFigure, stateRolesFigure, TIMELINE } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Meaning and purpose', 'Three groups of principles', 'Examples in each group', 'Non-justiciable but fundamental'], 'Route map of Part 1: the meaning and purpose of Directive Principles, the three groups, examples in each group, and why they are non-justiciable yet fundamental in governance', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Rights and principles compared', 'How they work together', 'What a welfare state is', 'Laws that carry out the principles'], 'Route map of Part 2: Fundamental Rights and Directive Principles compared, how they work together, the meaning of a welfare state, and laws that carry out the principles', 'Part 2 at a glance');
const vParts = table(['Part', 'Articles', 'Subject', 'Enforceable in court?'], [
  ['Part III', '12 to 35', 'Fundamental Rights', 'Yes'],
  ['Part IV', '36 to 51', 'Directive Principles of State Policy', 'No'],
], 'Table: Part III (Articles 12 to 35) holds the Fundamental Rights and can be enforced in court; Part IV (Articles 36 to 51) holds the Directive Principles and cannot be enforced in court');
const vWhy = flow('LR', ['Framers set goals in Part IV', 'Governments use them in laws and policies', 'Citizens judge performance at elections'], 'Flow: the framers set goals in Part IV, governments use them in making laws and policies, and citizens judge performance at elections', 'Why they were included.');
const vGroups = groupsFigure('Three boxes of Directive Principles. Socialistic (economic): adequate livelihood, equal pay for equal work, right to work and public aid, living wage and humane work, resources for the common good. Gandhian: village panchayats, cottage industries, weaker sections including the Scheduled Castes and Scheduled Tribes, prohibition of intoxicants, cow and cattle protection. Liberal-intellectual: uniform civil code, judiciary apart from the executive, protect monuments, international peace, environment under Article 48A', 'A teaching classification; the Constitution itself does not use these group names.');
const vEconomic = table(['Principle (in plain words)', 'Article'], [
  ['Adequate means of livelihood for all citizens', '39(a)'],
  ['Resources shared so that they serve the common good', '39(b)'],
  ['Equal pay for equal work for men and women', '39(d)'],
  ['Right to work and public assistance in unemployment, old age and sickness', '41'],
  ['Just and humane conditions of work; maternity relief', '42'],
  ['A living wage and a decent standard of life for workers', '43'],
], 'Table of socialistic or economic Directive Principles with the Article number of each: livelihood, common good, equal pay, right to work and public assistance, humane work and maternity relief, and a living wage');
const vGandhian = table(['Principle (in plain words)', 'Article'], [
  ['Organise village panchayats as units of self-government', '40'],
  ['Promote cottage industries in rural areas', '43'],
  ['Promote the interests of weaker sections, including the Scheduled Castes and Scheduled Tribes', '46'],
  ['Prohibit intoxicating drinks and drugs injurious to health, except for medicinal use', '47'],
  ['Organise agriculture and animal husbandry on modern lines; protect cows, calves and other cattle', '48'],
], 'Table of Gandhian Directive Principles with the Article number of each: village panchayats, cottage industries, weaker sections, prohibition of intoxicants except for medicine, and agriculture with cattle protection');
const vLiberal = table(['Principle (in plain words)', 'Article'], [
  ['A uniform civil code for citizens: the State is directed to endeavour towards it', '44'],
  ['Separate the judiciary from the executive', '50'],
  ['Protect monuments and places of national importance', '49'],
  ['Promote international peace and security', '51'],
  ['Protect and improve the environment, forests and wildlife (added 1976)', '48A'],
], 'Table of liberal-intellectual Directive Principles with the Article number of each: uniform civil code as a stated goal, separation of the judiciary from the executive, protection of monuments, international peace, and the environment added in 1976');
const vClassify = table(['Imagined scheme', 'Principle behind it', 'Group'], [
  ['Loans and workshops for village potters', 'Cottage industries', 'Gandhian'],
  ['Allowance for the elderly with no support', 'Public assistance in old age', 'Socialistic'],
  ['Separate courts replace magistrates who judge and investigate', 'Judiciary apart from executive', 'Liberal-intellectual'],
], 'Table sorting three imagined schemes: loans for potters are Gandhian, an allowance for the elderly is socialistic, and separate courts are liberal-intellectual');
const vNonJust = flow('LR', ['Citizen asks the court to order the State to act on a Directive Principle', 'Court: not justiciable, cannot compel', 'Citizen turns to the legislature, the government and elections'], 'Flow: a citizen asks a court to enforce a Directive Principle; the court says it is non-justiciable and cannot compel; the citizen then turns to the legislature, the government and elections', 'What non-justiciable means in practice.');
const vPlan = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Meaning; Part IV and Articles 36 to 51; Irish source'],
  ['(ii)', '3', 'Three groups with one example each'],
  ['(iii)', '4', 'Why non-justiciable; Article 37 duty; citizens judge governments'],
], 'Table planning a ten-mark answer on Directive Principles: part (i) meaning and source for 3 marks, part (ii) three groups for 3 marks, part (iii) non-justiciable yet fundamental for 4 marks');

const vCompare = table(['Point', 'Fundamental Rights', 'Directive Principles'], [
  ['Part and Articles', 'Part III, 12 to 35', 'Part IV, 36 to 51'],
  ['Enforceable in court', 'Yes (justiciable)', 'No (non-justiciable)'],
  ['Nature', 'Mostly limits on the State', 'Positive steps by the State'],
  ['Aim', 'Political democracy', 'Social and economic democracy'],
  ['Who benefits', 'Individuals, at once', 'Society as a whole, over time'],
], 'Table comparing Fundamental Rights and Directive Principles on part and articles, enforceability, nature, aim and who benefits');
const vJusticiable = flow('LR', ['Right violated by the State', 'Citizen approaches the Supreme Court or a High Court', 'Court can order a remedy or strike down the law'], 'Flow for a Fundamental Right: the right is violated by the State, the citizen approaches the Supreme Court or a High Court, and the court can order a remedy or strike down the law', 'A Fundamental Right can be enforced.');
const vSort = table(['Imagined situation', 'Right or principle?', 'Why'], [
  ['Police stop a peaceful meeting with no lawful reason', 'Fundamental Right', 'Court can enforce freedom of assembly'],
  ['The government plans elected village councils', 'Directive Principle', 'A goal for the State; court cannot compel'],
  ['A student is refused admission only because of caste', 'Fundamental Right', 'Equality can be enforced by a court'],
], 'Table sorting three imagined situations: police stopping a peaceful meeting is a Fundamental Right issue, planning elected village councils is a Directive Principle, and refusing admission only because of caste is a Fundamental Right issue');
const vTogether = flow('LR', ['Fundamental Rights: political democracy', 'Directive Principles: social and economic democracy', 'Together: a fuller democracy and a welfare state'], 'Flow: Fundamental Rights give political democracy, Directive Principles aim at social and economic democracy, and together they lead toward a fuller democracy and a welfare state', 'Rights and principles complete each other.');
const vRoles = stateRolesFigure('Two boxes joined by an arrow. A night-watchman state keeps law and order, defence, and courts and justice. A welfare state adds health and education, social security, fair chances for all and reduced inequality', 'Two roles of the State.');
const vFeatures = table(['Feature of a welfare state', 'Imagined example'], [
  ['Basic services for all', 'Free vaccination camps and village schools'],
  ['Social security', 'Pension for the elderly who have no support'],
  ['Reduced inequality', 'Equal pay for equal work; help for weaker sections'],
  ['Fair chances', 'Fee-free schooling for every child'],
], 'Table of welfare-state features with an imagined example of each: basic services, social security, reduced inequality and fair chances');
const vPreamble = flow('LR', ['Preamble promises justice: social, economic and political', 'Part IV sets goals toward social and economic justice', 'Laws and schemes turn goals into a welfare state'], 'Flow: the Preamble promises social, economic and political justice, Part IV sets goals toward it, and laws and schemes turn the goals into a welfare state', 'From promise to practice.');
const vTimeline = timelineFigure(TIMELINE, 'Timeline not to scale of six dated steps: 1950 the Constitution comes into force; 1976 the Equal Remuneration Act and Article 48A; 1992 the 73rd Amendment on panchayats; 2002 the 86th Amendment on education; 2005 the rural employment guarantee Act; 2009 the Right to Education Act', 'Six dated steps (schematic, not to scale).');
const vLaws = table(['Law or amendment', 'Principle carried out', 'What it did'], [
  ['Equal Remuneration Act, 1976', 'Equal pay for equal work', 'Forbade unequal pay for the same work'],
  ['73rd Amendment, 1992', 'Village panchayats', 'Gave panchayats constitutional status'],
  ['86th Amendment, 2002; Right to Education Act, 2009', 'Education for children', 'Made education a right for ages six to fourteen'],
  ['Rural employment guarantee Act, 2005', 'Right to work', 'Promised paid work to rural households that ask for it'],
], 'Table of four laws and the Directive Principle each carries out: the Equal Remuneration Act 1976, the 73rd Amendment 1992, the 86th Amendment 2002 with the Right to Education Act 2009, and the rural employment guarantee Act 2005');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Meaning: responsibility for well-being; reduced inequality'],
  ['(ii)', '3', 'Three activities: health, education, social security'],
  ['(iii)', '4', 'Part IV directions; two laws with their principles'],
], 'Table planning a ten-mark answer on the welfare state: part (i) meaning for 3 marks, part (ii) three activities for 3 marks, part (iii) Part IV directions and two laws for 4 marks');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Directive Principles and the Welfare State — Part 1: Directive Principles of State Policy',
  goals: [
    'Explain what Directive Principles of State Policy are and why the framers included them',
    'Name the Part and the Articles in which they are found and the source of the idea',
    'Classify principles into socialistic, Gandhian and liberal-intellectual groups with examples',
    'Explain why they are non-justiciable yet fundamental in the governance of the country',
  ],
  slides: [
    sl('title', 'Directive Principles of State Policy', {
      b: 'Part 1 — the **goals** the Constitution sets for every government.',
      v: vRoute1,
      n: 'India became free in 1947 and its Constitution came into force in 1950. Freedom was only the beginning. People still needed food, work, schools and fair treatment. In this part we study the Directive Principles, the goals the framers set for every government to work toward, and how they are grouped.',
    }),
    sl('diagram', 'Two Parts, two jobs', {
      b: 'The Constitution protects people through **rights** and guides governments through **principles**.',
      v: vParts,
      n: 'Part Three of the Constitution holds the Fundamental Rights, from Article twelve to thirty five. Part Four holds the Directive Principles of State Policy, from Article thirty six to fifty one. Rights can be enforced by courts. Principles are directions to the State. Keeping these two Parts apart is the key to this chapter.',
    }),
    sl('concept', 'What are Directive Principles?', {
      bl: [
        'Directions to the **State**: Parliament, State legislatures and governments.',
        'Found in **Part IV**, Articles **36 to 51**.',
        'The idea came from the **Irish Constitution**.',
        'They aim at **social and economic justice**.',
      ],
      v: flow('LR', ['Idea from Ireland', 'Written into Part IV', 'Addressed to the State'], 'Flow: the idea comes from the Irish Constitution, is written into Part IV and is addressed to the State', 'Where the idea came from.'),
      n: 'Directive Principles of State Policy are directions to the State. The word State here means Parliament, State legislatures and governments. They are found in Part Four, Articles thirty six to fifty one. The framers took the idea from the Irish Constitution. Their purpose is to bring about social and economic justice.',
    }),
    sl('diagram', 'Why were they included?', {
      b: 'Political freedom had to be followed by **fairness in daily life**.',
      v: vWhy,
      n: 'The framers knew that the vote alone would not remove hunger, poverty or unequal chances. So they set goals in Part Four. Governments use these goals when they make laws and policies. Citizens can then judge how well a government has done, especially at election time. The principles act as a compass for the country.',
    }),
    sl('check', 'Quick check: non-justiciable', {
      b: 'Choose the correct meaning of non-justiciable.',
      chk: 'm_nonjust',
      n: 'Think about courts. Which option says that a court cannot order the government to carry out the principle?',
    }),
    sl('diagram', 'Three common groups', {
      b: 'Textbooks sort the principles into three groups for easy study.',
      v: vGroups,
      n: 'To study the principles easily, we sort them into three groups. Socialistic or economic principles deal with livelihood, work and wages. Gandhian principles deal with villages, small industries and weaker sections. Liberal-intellectual principles deal with matters such as the courts, heritage, peace and the environment. The Constitution itself does not use these group names.',
    }),
    sl('diagram', 'Socialistic or economic principles', {
      v: vEconomic,
      n: 'The first group aims at economic fairness. The State should secure adequate means of livelihood for all, share resources so that they serve the common good, and make sure men and women get equal pay for equal work. It should also provide the right to work, public assistance in old age, sickness and unemployment, humane working conditions and a living wage.',
    }),
    sl('example', 'Worked example 1: sorting imagined schemes', {
      b: 'Name the principle behind a scheme first, then its group.',
      bl: [
        'Step 1 — Read the scheme and ask what it does.',
        'Step 2 — Match it to a principle.',
        'Step 3 — Place the principle in its group.',
        'Step 4 — Write the answer with a short reason.',
      ],
      v: vClassify,
      n: 'Here is a simple method. Read the scheme and ask what it does. Match it to a principle. Then name the group. Loans for village potters follow the principle of cottage industries, which is Gandhian. An allowance for lonely old people follows public assistance in old age, which is socialistic. Separate courts follow the separation of the judiciary from the executive.',
    }),
    sl('check', 'Quick check: separate courts', {
      b: 'Which group does the separation of the judiciary from the executive belong to?',
      chk: 'm_judiciary',
      n: 'Remember the three groups. Which group deals with courts, heritage and peace?',
    }),
    sl('diagram', 'Gandhian principles', {
      v: vGandhian,
      n: 'The Gandhian group reflects ideas of village self-rule and simple living. It includes organising village panchayats, promoting cottage industries, promoting the interests of weaker sections including the Scheduled Castes and Scheduled Tribes, and prohibiting intoxicating drinks except for medicinal use. It also speaks of modern agriculture and the protection of cows, calves and other cattle, stated here as a principle of the Constitution.',
    }),
    sl('diagram', 'Liberal-intellectual principles', {
      v: vLiberal,
      n: 'The third group includes a uniform civil code, where the Constitution only directs the State to endeavour towards one. It also includes keeping the judiciary separate from the executive, protecting monuments of national importance, promoting international peace, and protecting the environment. This last principle, Article forty eight A, was added in 1976 by the forty second Amendment.',
    }),
    sl('check', 'Quick check: match the Articles', {
      b: 'Match each Article with its subject.',
      chk: 'mt_articles',
      n: 'Match each Article with its subject. Use the table you have just seen to help you remember the numbers.',
    }),
    sl('concept', 'Non-justiciable but fundamental', {
      bl: [
        '**Non-justiciable:** a court cannot enforce them.',
        '**Fundamental in governance:** the State must keep them in view when making laws.',
        'Citizens can **judge** governments by them.',
      ],
      v: vNonJust,
      n: 'Non-justiciable means that a court cannot order the State to carry out a principle. Yet the Constitution says the principles are fundamental in the governance of the country, and it is the duty of the State to apply them when making laws. So a citizen cannot win a court order, but can press the legislature and the government, and can use elections.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) What are Directive Principles? [3] (ii) Name the three groups with an example of each. [3] (iii) Why are they non-justiciable yet fundamental? [4]',
      bl: [
        '(i) Meaning + Part IV, Articles 36 to 51 + Irish source.',
        '(ii) One named group and one example per mark.',
        '(iii) Reason for non-justiciable + the State\'s duty + citizens judge governments.',
        'Aim for one point per mark.',
      ],
      v: vPlan,
      n: 'To plan a ten mark answer in three parts, give three points to the first part, three to the second and four to the last. Here, part one is the meaning with the Part, the Articles and the source. Part two is the three groups with an example each. Part three is the reason, the duty of the State, and how citizens judge governments.',
    }),
    sl('check', 'Quick check: the 1976 addition', {
      b: 'Was the principle on the environment in the original Constitution?',
      chk: 'ar_env',
      n: 'Think about the date on which Article forty eight A was added, and which Amendment added it.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Directive Principles: **Part IV**, **Articles 36 to 51**; idea from **Ireland**.',
        'Aim: **social and economic justice**; addressed to the **State**.',
        'Groups: **socialistic**, **Gandhian**, **liberal-intellectual**.',
        '**Non-justiciable** but **fundamental in governance** (Article 37).',
      ],
      v: vGroups,
      n: 'To sum up: the Directive Principles are in Part Four, Articles thirty six to fifty one, and the idea came from Ireland. They direct the State toward social and economic justice. They fall into socialistic, Gandhian and liberal-intellectual groups. No court enforces them, yet governments are expected to follow them in making laws.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Write **Part IV, Articles 36 to 51**; do not mix with Part III (12 to 35).',
        'Give an example with each group: do not just list the group names.',
        'Say **non-justiciable** and explain it: courts cannot enforce them.',
        'Do not quote the Articles; paraphrase their meaning.',
        'For a classification question, name the principle first and then the group.',
      ],
      n: 'Some exam habits. Keep Part Four and Part Three apart, with their Article numbers. When you name a group, add an example. When you write non-justiciable, explain that courts cannot enforce the principle. You need not quote any Article; state its idea in your own words. And always name the principle before the group.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Directive Principles and the Welfare State — Part 2: Rights Compared, and the Welfare State',
  goals: [
    'Distinguish Fundamental Rights from Directive Principles in enforceability, nature and purpose',
    'Explain how rights and principles complement each other',
    'Explain the meaning of a welfare state and how Directive Principles aim at it',
    'Give dated examples of laws and amendments that carry out the principles',
  ],
  slides: [
    sl('title', 'Rights, principles and the welfare state', {
      b: 'Part 2 — how **rights** differ from **principles**, and how both lead toward a **welfare state**.',
      v: vRoute2,
      n: 'In this part we compare Fundamental Rights with Directive Principles, see how they work together, and learn what a welfare state is. We end with dated examples of laws that carry out the principles, such as the one on panchayats and the one on education.',
    }),
    sl('diagram', 'Rights and principles side by side', {
      v: vCompare,
      n: 'Fundamental Rights are in Part Three and can be enforced by courts, so they are justiciable. Directive Principles are in Part Four and cannot be enforced, so they are non-justiciable. Rights mostly limit what the State may do. Principles ask the State to act. Rights secure political democracy, while principles aim at social and economic democracy.',
    }),
    sl('diagram', 'What justiciable means in practice', {
      b: 'A right can take a citizen to court; a principle cannot.',
      v: vJusticiable,
      n: 'If the State violates a Fundamental Right, the citizen can approach the Supreme Court or a High Court. The court can order a remedy, or strike down a law that violates the right. No such path exists for a Directive Principle. That is the practical meaning of justiciable and non-justiciable.',
    }),
    sl('check', 'Quick check: which is justiciable', {
      b: 'Which of these can be enforced by a court?',
      chk: 'm_justiciable',
      n: 'Think about which one a citizen can take to the Supreme Court.',
    }),
    sl('example', 'Worked example 3: right or principle?', {
      b: 'Sort each imagined situation, and give the reason.',
      bl: [
        'Step 1 — Ask: is a person being stopped or denied something the Constitution guarantees?',
        'Step 2 — If yes, it is a **Fundamental Right**, enforceable in court.',
        'Step 3 — If it is a goal for the State to pursue, it is a **Directive Principle**.',
        'Step 4 — Write the reason: enforceable or not.',
      ],
      v: vSort,
      n: 'Use a two step test. First ask whether someone is being stopped or denied something the Constitution guarantees. If so, it is a Fundamental Right, and a court can enforce it. If instead it is a goal for the State to work toward, it is a Directive Principle. Then write the reason: enforceable, or not enforceable.',
    }),
    sl('check', 'Quick check: forest plan', {
      b: 'Describe the nature of an imagined forest-protection plan.',
      chk: 'm_sort_dp',
      n: 'Is the plan a right that a citizen can enforce, or a goal that the government follows?',
    }),
    sl('diagram', 'Rights and principles complete each other', {
      b: 'A hungry person cannot enjoy freedom fully.',
      v: vTogether,
      n: 'Rights and principles are partners. Fundamental Rights give freedom and equality, which is political democracy. Directive Principles aim at fair living conditions, which is social and economic democracy. A person who is hungry or out of school cannot use freedom fully. Together, rights and principles lead toward a fuller democracy and a welfare state.',
    }),
    sl('concept', 'What is a welfare state?', {
      bl: [
        'The government takes **responsibility for the well-being** of all citizens.',
        'It provides **services**, offers **security** and works to **reduce inequality**.',
        'It goes beyond the **night-watchman** role of law and order.',
      ],
      v: vRoles,
      n: 'A night-watchman state keeps law and order, defends the country and runs the courts, and does little more. A welfare state does all that and also takes responsibility for the well-being of its people. It provides health and education, offers social security, and works to reduce inequality and give everyone fair chances.',
    }),
    sl('diagram', 'Features of a welfare state', {
      v: vFeatures,
      n: 'Four features mark a welfare state. Basic services for all, such as health care and schools. Social security for people who cannot support themselves, such as the elderly poor. Reduced inequality, through measures like equal pay and help for weaker sections. And fair chances for every child to learn and grow.',
    }),
    sl('check', 'Quick check: two states compared', {
      b: 'Compare two imagined states, Alpha and Beta.',
      chk: 'm_nightwatch',
      n: 'Which state takes on health, schools and pensions, and which keeps to a narrow role?',
    }),
    sl('diagram', 'From the Preamble to Part IV', {
      b: 'The Directive Principles are the road map to the Preamble\'s promise.',
      v: vPreamble,
      n: 'The Preamble promises justice in its social, economic and political forms. Part Four turns that promise into goals, such as livelihood, equal pay, education and care of weaker sections. When governments pass laws and run schemes to reach these goals, the country moves toward a welfare state.',
    }),
    sl('diagram', 'Six dated steps', {
      v: vTimeline,
      n: 'Here are some dated steps. The Constitution came into force in 1950. In 1976 the Equal Remuneration Act was passed and Article forty eight A was added. The seventy third Amendment of 1992 strengthened panchayats. The eighty sixth Amendment of 2002 made education a right for children. A rural employment guarantee law followed in 2005, and the Right to Education Act in 2009.',
    }),
    sl('diagram', 'Laws that carry out the principles', {
      v: vLaws,
      n: 'Each of these carries out a principle. The Equal Remuneration Act forbids unequal pay for the same work. The seventy third Amendment gave panchayats constitutional status. The eighty sixth Amendment and the Right to Education Act made education a legal right for children aged six to fourteen. The 2005 law promised paid work to rural households that ask for it.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange the steps in the order in which they happened.',
      chk: 'ord_timeline',
      n: 'Use the timeline you have just seen. Start from the year the Constitution came into force.',
    }),
    sl('example', 'Worked example 4: planning a 10-mark answer', {
      b: 'Question: (i) What is a welfare state? [3] (ii) Three activities it undertakes. [3] (iii) How do Directive Principles aim at it? Give two laws. [4]',
      bl: [
        '(i) Responsibility for well-being + reducing inequality.',
        '(ii) Health care, education, social security: one point per mark.',
        '(iii) Part IV directions (livelihood, work, assistance) + two laws with their principles.',
        'Always link a law to its principle.',
      ],
      v: vPlan2,
      n: 'Plan this answer in three parts. Part one is the meaning: the government takes responsibility for well-being and reduces inequality. Part two lists three activities, one point for each mark. Part three explains how Part Four directs the State, and gives two laws, each linked to the principle it carries out.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Rights: **Part III**, **justiciable**, limits on the State; principles: **Part IV**, **non-justiciable**, positive steps.',
        'Rights secure **political democracy**; principles aim at **social and economic democracy**.',
        'A **welfare state** takes responsibility for citizens\' well-being and reduces inequality.',
        'Dated examples: **1976**, **1992** (73rd), **2002** (86th), **2005**, **2009**.',
      ],
      v: vCompare,
      n: 'To sum up: Fundamental Rights are enforceable and limit the State. Directive Principles are not enforceable and direct the State to act. Rights give political democracy and principles aim at social and economic democracy. A welfare state takes responsibility for citizens well-being. Several laws between 1976 and 2009 carry out the principles.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'For a **difference** question, give both sides of every point.',
        'Link each law to the **principle** it carries out and give its **year**.',
        'Do not write that the court can force the government to follow a principle.',
        'Do not describe any current government or party; stay with the Constitution and dated laws.',
        'In 3 + 3 + 4 questions, spend the last four marks on reasons or evaluation.',
      ],
      n: 'Some exam habits. In a question on differences, give both sides of each point. Link every law to its principle and give its year. Never say that a court can force a government to follow a principle. Keep to the Constitution and dated laws, not to any present government. And use the last four marks for reasons and evaluation.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Directive Principles and the Welfare State — notes',
  sections: [
    {
      h: '1. Meaning, place and purpose',
      t: 1,
      b: '- **Directive Principles of State Policy** are directions given to the **State** (Parliament, State legislatures, governments) for making laws and policies.\n- Placed in **Part IV**, **Articles 36 to 51**. The idea was borrowed from the **Irish Constitution**.\n- **Purpose:** political freedom had to be matched by **social and economic justice**; the principles set the goals and let citizens judge governments.\n- **Article 37:** not enforceable by any court, yet fundamental in the governance of the country; it is the **duty of the State** to apply them in making laws.\n- Study is **elementary**: know the idea of each principle and the Article number; you need not quote the text.',
      terms: [['Directive Principles', 'Goals in Part IV that guide the State in making laws and policies.'], ['State', 'Parliament, State legislatures and governments at the Union and State levels.']],
      v: vParts,
      vs: [vWhy],
    },
    {
      h: '2. Three groups of principles',
      t: 1,
      b: '- The Constitution does not name groups; textbooks sort the principles into **three** for study.\n- **Socialistic (economic):** livelihood, common good, equal pay, work and assistance, humane work, living wage.\n- **Gandhian:** village panchayats, cottage industries, weaker sections including the Scheduled Castes and Scheduled Tribes, prohibition of intoxicants except for medicinal use, agriculture and the protection of cattle.\n- **Liberal-intellectual:** uniform civil code, separation of the judiciary from the executive, protection of monuments, international peace, environment (Article 48A, added by the 42nd Amendment, 1976).',
      terms: [['Socialistic principles', 'Principles aiming at economic fairness and security for all.'], ['Gandhian principles', 'Principles about village self-rule, small industries and weaker sections.'], ['Liberal-intellectual principles', 'Principles about justice, heritage, peace and the environment.']],
      v: vGroups,
    },
    {
      h: '3. Examples in each group',
      t: 1,
      b: '- **Economic:** Article 39 (livelihood, common good, equal pay), Article 41 (work, public assistance), Article 42 (humane work, maternity relief), Article 43 (living wage).\n- **Gandhian:** Article 40 (panchayats), Article 43 (cottage industries), Article 46 (weaker sections), Article 47 (intoxicants, public health), Article 48 (agriculture, cattle).\n- **Liberal-intellectual:** Article 44 (uniform civil code, a goal the State is directed to endeavour towards), Article 49 (monuments), Article 50 (judiciary), Article 51 (peace), Article 48A (environment).\n- To classify, **name the principle first**, then its group.',
      terms: [['Article 40', 'The principle of organising village panchayats.'], ['Article 48A', 'The principle of protecting the environment, forests and wildlife; added in 1976.']],
      v: vEconomic,
      vs: [vGandhian, vLiberal, vClassify],
    },
    {
      h: '4. Fundamental Rights and Directive Principles compared',
      t: 2,
      b: '- **Part and Articles:** rights in Part III (12 to 35); principles in Part IV (36 to 51).\n- **Enforceability:** rights are **justiciable**; principles are **non-justiciable**.\n- **Nature:** rights mostly **limit the State**; principles call for **positive action**.\n- **Aim:** rights give **political democracy**; principles aim at **social and economic democracy**.\n- **Courts:** a law violating a right can be struck down; a law is not struck down merely for not carrying out a principle.\n- A claim in court rests on a **right**; a goal pursued by the government rests on a **principle**.',
      terms: [['Justiciable', 'Capable of being enforced in a court of law.'], ['Non-justiciable', 'Not enforceable in a court of law.']],
      v: vCompare,
      vs: [vJusticiable, vSort],
    },
    {
      h: '5. Working together',
      t: 2,
      b: '- Rights and principles **complement** each other: freedom and equality need a base of food, work and education.\n- **Example:** the right to education (Article 21A) and the principle of free and compulsory education aim at the same end.\n- Governments act on the principles through **laws, budgets and schemes**; citizens press for them through the **legislature**, **public debate** and **elections**.',
      terms: [['Complementary', 'Completing one another; each is needed for full democracy.']],
      v: vTogether,
    },
    {
      h: '6. The welfare state',
      t: 3,
      b: '- A **welfare state** takes responsibility for the **well-being** of all citizens, especially the poor and weak.\n- It goes beyond a **night-watchman state** (law and order, defence, courts) by adding **health, education, social security** and measures that **reduce inequality**.\n- The **Preamble** promises justice (social, economic, political); **Part IV** turns this into goals.\n- **Dated examples:** Equal Remuneration Act (1976); 42nd Amendment (1976, Article 48A); 73rd Amendment (1992, panchayats); 86th Amendment (2002, Article 21A) and the Right to Education Act (2009); the rural employment guarantee Act of 2005 (right to work).\n- Laws alone do not finish the task: **enforcement**, **resources** and **public awareness** matter.',
      terms: [['Welfare state', 'A state that takes responsibility for the well-being of all citizens.'], ['Night-watchman state', 'A state limited to law and order, defence and justice.']],
      v: vRoles,
      vs: [vFeatures, vTimeline, vLaws],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up Part III (rights, 12 to 35) with Part IV (principles, 36 to 51).\n- Writing that courts can enforce Directive Principles.\n- Listing group names without examples.\n- Quoting Articles instead of explaining their idea.\n- Linking laws to the wrong principle or leaving out the year.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, term or Article range.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a link or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Where are the Directive Principles found?', '**Part IV**, **Articles 36 to 51**.', 'fact', 1],
  ['Source of the idea of Directive Principles', 'The **Irish Constitution**.', 'fact', 1],
  ['What are Directive Principles?', 'Directions to the **State** for making laws and policies for **social and economic justice**.', 'definition', 1],
  ['Why were they included?', 'To follow political freedom with social and economic justice and to guide every government.', 'concept', 1],
  ['Non-justiciable', 'Cannot be enforced in a court of law.', 'definition', 1],
  ['What does Article 37 say about them, in brief?', 'Not enforceable by courts, but **fundamental in governance**; the State must apply them in making laws.', 'fact', 1],
  ['Three groups of Directive Principles', 'Socialistic (economic), Gandhian, liberal-intellectual.', 'concept', 1],
  ['Socialistic principles: two examples', 'Adequate livelihood; **equal pay for equal work**.', 'example', 1],
  ['Socialistic principles: right to work', 'Article **41**: work and public assistance in unemployment, old age and sickness.', 'fact', 1],
  ['Gandhian principles: two examples', '**Village panchayats**; **cottage industries**.', 'example', 1],
  ['Which Article deals with village panchayats?', 'Article **40**.', 'fact', 1],
  ['Liberal-intellectual principles: two examples', 'Separation of the judiciary from the executive; international peace.', 'example', 1],
  ['Article 48A', 'Protection of the environment, forests and wildlife; added in **1976** by the **42nd Amendment**.', 'fact', 1],
  ['Article 44 in one line', 'The State is directed to endeavour to secure a uniform civil code for citizens.', 'fact', 1],
  ['Article 50', 'Separation of the judiciary from the executive.', 'fact', 1],
  ['Fundamental Rights: Part and Articles', '**Part III**, Articles **12 to 35**.', 'fact', 2],
  ['Justiciable', 'Capable of being enforced in a court of law.', 'definition', 2],
  ['Rights versus principles: enforceability', 'Rights: **justiciable**. Principles: **non-justiciable**.', 'concept', 2],
  ['Rights versus principles: nature', 'Rights mostly **limit** the State; principles require **positive action**.', 'concept', 2],
  ['Rights versus principles: aim', 'Rights: **political** democracy. Principles: **social and economic** democracy.', 'concept', 2],
  ['Can a court strike down a law for not carrying out a principle?', '**No**; it can strike down a law that violates a **Fundamental Right**.', 'concept', 2],
  ['Why are rights and principles called complementary?', 'Freedom and equality need a base of work, food and education; each completes the other.', 'exam-tip', 2],
  ['Welfare state', 'A state that takes responsibility for the **well-being** of all citizens.', 'definition', 3],
  ['Night-watchman state', 'A state limited to **law and order**, defence and justice.', 'definition', 3],
  ['Three features of a welfare state', 'Basic services, social security, reduced inequality.', 'concept', 3],
  ['73rd Amendment (1992)', 'Gave **panchayats** constitutional status; carries out Article 40.', 'fact', 3],
  ['Equal Remuneration Act (1976)', 'Equal pay for equal work for men and women.', 'fact', 3],
  ['86th Amendment (2002)', 'Inserted **Article 21A**: education a right for ages **six to fourteen**.', 'fact', 3],
  ['Right to Education Act', 'Passed in **2009**; gave effect to Article 21A.', 'fact', 3],
  ['The 2005 rural employment guarantee Act', 'Promised paid work to rural households that ask for it; supports the right to work.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — Directive Principles and the Welfare State',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_articles', 'm_pol_soc', 'm_welfare_feature', 'm_old_age', 'ar_nonjust', 's_two_diff', 's3_features'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_fr_dp', 'l_welfare'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — Directive Principles and the Welfare State',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_state_duty', 'm_cottage', 'm_env1976', 'm_remedy', 'm_law_conflict', 'm_panchayat', 'm_nrega', 'ar_welfare', 's_dp_meaning', 's_classify_scenario', 's_welfare_example', 's3_groups', 's3_court_refuse'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_dp_meaning', 'l_marunadu', 'l_prefer'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of icse-9-history-civics-ch02 only (Directive Principles: meaning, purpose and examples; Fundamental Rights compared with Directive Principles; meaning of a welfare state and how the principles aim at it); elementary study, Articles named but never quoted',
    originality: 'every state, scheme, village, petition, report and debate is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no person quoted; no Article quoted; no current office-holder or current political position',
    data: 'timeline years asserted in increasing order; Part IV spans 16 Articles (36 to 51) and Part III 24 Articles (12 to 35), both asserted',
    facts: 'Directive Principles in Part IV, Articles 36 to 51, idea from the Irish Constitution; Article 37 not enforceable by courts but fundamental in governance; Fundamental Rights in Part III, Articles 12 to 35; Article 48A added by the 42nd Amendment in 1976; 73rd Amendment 1992 (panchayats, Article 40); Equal Remuneration Act 1976; 86th Amendment 2002 (Article 21A) and Right to Education Act 2009; rural employment guarantee Act 2005',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
