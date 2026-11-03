// Build CBSE 11 Political Science ch01 Constitution: Why and How?. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-11-political-science-ch01', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
/** Ordinal timeline (equal spacing, not to scale): events = [[when, lines], ...]; labels alternate above/below. */
function timeline(events, alt, caption, { w = 840, h = 250 } = {}) {
  const s = new Svg(w, h);
  const y = h / 2, x0 = 80, x1 = w - 80;
  s.arrow(x0 - 50, y, x1 + 55, y, { sw: 2 });
  const step = (x1 - x0) / (events.length - 1);
  events.forEach(([when, label], i) => {
    const x = x0 + i * step;
    const up = i % 2 === 0;
    s.dot(x, y, 6, 'accent');
    s.line(x, y, x, up ? y - 34 : y + 34, { sw: 1.2, color: 'muted' });
    s.text(x, up ? y - 46 : y + 46, String(when), { bold: true, size: 15, color: 'accent' });
    const lines = Array.isArray(label) ? label : [label];
    lines.forEach((ln, j) => s.text(x, up ? y - 66 - 16 * (lines.length - 1 - j) : y + 66 + 16 * j, ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}

const vWeb = (() => {
  const s = new Svg(760, 400);
  s.rect(290, 165, 180, 70, { color: 'accent', sw: 2.5 });
  s.text(380, 200, 'A constitution', { bold: true, size: 17, color: 'accent' });
  const box = (x, y, l1, l2, col) => {
    s.rect(x, y, 220, 62, { sw: 2, color: col });
    s.text(x + 110, y + 22, l1, { size: 13, bold: true });
    s.text(x + 110, y + 43, l2, { size: 13 });
  };
  box(20, 169, '1. Basic rules', 'coordination, assurance', 'blue');
  box(520, 169, '2. Who decides', 'and how government forms', 'green');
  box(70, 322, '3. Limits on the', 'powers of government', 'red');
  box(470, 322, '4. Aspirations and', 'a just society', 'orange');
  box(270, 12, '5. Identity of', 'a people', 'purple');
  s.arrow(290, 200, 244, 200, { sw: 2 });
  s.arrow(470, 200, 516, 200, { sw: 2 });
  s.arrow(330, 235, 250, 318, { sw: 2 });
  s.arrow(430, 235, 510, 318, { sw: 2 });
  s.arrow(380, 165, 380, 78, { sw: 2 });
  return s.visual('Web diagram: a constitution at the centre with five arrows to its five functions: basic rules for coordination and assurance, deciding who holds power and how government is formed, limits on the powers of government, aspirations and a just society, and the identity of a people', 'Five functions of a constitution.');
})();

const vTimeline = timeline(
  [
    [1928, ['Nehru Report', 'outlines a constitution']],
    [1946, ['Cabinet Mission', 'plan']],
    ['Dec 1946', ['First meeting 9th;', 'Resolution moved 13th']],
    ['Jan 1947', ['Objectives', 'Resolution adopted']],
    [1947, ['Drafting Committee', 'set up']],
    ['26 Nov 1949', ['Constitution', 'adopted']],
    ['26 Jan 1950', ['Constitution', 'in force']],
  ],
  'Timeline from 1928 to 1950: Nehru Report 1928; Cabinet Mission plan 1946; Assembly meets on 9 December and Objectives Resolution moved on 13 December 1946; Objectives Resolution adopted January 1947; Drafting Committee set up in 1947; Constitution adopted 26 November 1949; Constitution in force 26 January 1950',
  'From the Nehru Report to the Constitution in force; equally spaced, not to scale.',
);

const vBorrow = (() => {
  const s = new Svg(800, 360);
  const rows = [
    ['Britain', 'Parliamentary government, rule of law, Speaker'],
    ['United States', 'Bill of rights, judicial review, independent judiciary'],
    ['Ireland', 'Directive Principles'],
    ['France', 'Liberty, equality and fraternity'],
    ['Canada', 'Quasi-federal form, strong centre, residuary powers'],
  ];
  s.text(105, 22, 'Country', { bold: true, size: 14, color: 'accent' });
  s.text(540, 22, 'Idea adapted for India', { bold: true, size: 14, color: 'accent' });
  rows.forEach(([c, f], i) => {
    const y = 40 + i * 64;
    s.rect(20, y, 170, 48, { sw: 2, color: 'blue' });
    s.text(105, y + 24, c, { bold: true, size: 14 });
    s.arrow(194, y + 24, 286, y + 24, { sw: 2 });
    s.rect(290, y, 490, 48, { sw: 2, color: 'green' });
    s.text(535, y + 24, f, { size: 13 });
  });
  return s.visual('Chart of borrowed ideas: Britain gave parliamentary government, rule of law and the Speaker; the United States gave a bill of rights, judicial review and an independent judiciary; Ireland gave Directive Principles; France gave liberty, equality and fraternity; Canada gave a quasi-federal form with a strong centre and residuary powers', 'Ideas adapted, not copied.');
})();

// ---------------------------------------------------------------- tables and flows
const vMeaning = table(
  ['Term', 'Standard meaning', 'Example'],
  [
    ['Constitution', 'The body of basic rules and principles on which a country is governed', 'The written constitution of a republic'],
    ['Written', 'Basic rules collected in one authoritative document', 'India'],
    ['Unwritten', 'Basic rules spread over statutes, conventions and decisions', 'Britain'],
  ],
  'Table of terms: a constitution is the body of basic rules and principles on which a country is governed; a written one is collected in a single document, as in India; an unwritten one is spread over statutes, conventions and decisions, as in Britain',
);
const vClub = table(
  ['Without written rules', 'With written rules'],
  [
    ['Each family guesses when others will draw water', 'The timetable tells every family what to expect'],
    ['Quarrels over turns', 'A shared rule settles whose turn it is'],
    ['No one is sure others will cooperate', 'Everyone can rely on the others'],
  ],
  'Two-column table for an imagined colony sharing a borewell: without written rules families guess and quarrel; with a timetable each family knows what to expect and can rely on the others',
  'Function one: minimal coordination and assurance.',
);
const vAuthority = flow('LR', ['Who may take decisions?', 'The constitution names the bodies', 'It says how the government is formed', 'Power has a clear source'], 'Flow: the question of who may take decisions is answered by the constitution naming the bodies and saying how the government is formed, so that power has a clear source', 'Function two: decision-making authority');
const vLimits = table(
  ['The government may', 'The government may not'],
  [
    ['Make laws through the proper body', 'Keep a person in prison without a hearing'],
    ['Collect taxes under the law', 'Seize property without lawful permission'],
    ['Run schools and hospitals', 'Silence all criticism of itself'],
  ],
  'Table for an imagined country: the government may make laws through the proper body, collect taxes and run schools, but may not imprison without a hearing, seize property without lawful permission or silence all criticism',
  'Function three: limits on the powers of government.',
);
const vExample1 = table(
  ['Clause in the imagined Charter of Norvale', 'Function'],
  [
    ['Laws are made by a Council of two houses', 'Decision-making authority'],
    ['No one may be fined without a written reason', 'Limits on government'],
    ['The state shall run a school in every district', 'Aspirations and a just society'],
    ['The opening lines recall the islanders\' shared past', 'Identity of a people'],
    ['Every citizen files tax returns by one fixed date', 'Coordination and assurance'],
  ],
  'Worked example table that links five clauses of an imagined charter to the functions of a constitution: law-making body to decision-making authority, written reasons to limits, schools to aspirations, opening lines to identity and a fixed tax date to coordination',
  'An imagined charter, clause by clause.',
);
const vAspire = table(
  ['Function', 'What it does'],
  [
    ['Aspirations', 'Lets government act on a society\'s hopes and create conditions for a just society'],
    ['Identity', 'Records the values a people share and wish to be known by'],
  ],
  'Table of functions four and five: enabling the government to meet the aspirations of society and create a just society, and expressing the fundamental identity of a people',
);
const vWritten = table(
  ['Point', 'Written (India)', 'Unwritten (Britain)'],
  [
    ['Form', 'One document, among the longest of its kind', 'No single document'],
    ['Where to find the rules', 'In the text and its amendments', 'Statutes, conventions, decisions'],
    ['Change', 'By the procedure in the text', 'Largely through ordinary law and practice'],
  ],
  'Comparison table of a written constitution as in India and an unwritten one as in Britain on form, where the rules are found, and how they change',
);
const vMode = flow('LR', ['A body drafts the constitution', 'Is it seen as legitimate?', 'Is it widely accepted?', 'Authority from the way it was made'], 'Flow: a body drafts the constitution; the questions are whether it is seen as legitimate and widely accepted; if yes the constitution gains authority from the way it was made', 'Source of authority 1: mode of promulgation');
const vDesign = table(
  ['Design', 'Problem'],
  [
    ['Too rigid', 'Cannot adapt; may be abandoned'],
    ['Balanced: special majority, checks and balances', 'Change is possible but not casual'],
    ['Too flexible', 'Rules altered at the will of whoever holds power'],
  ],
  'Table of institutional designs: too rigid cannot adapt and may be abandoned; balanced with special majority and checks and balances allows change that is not casual; too flexible lets those in power alter the rules',
  'Source of authority 3: balanced institutional design.',
);
const vSources = table(
  ['Source of authority', 'Test'],
  [
    ['Mode of promulgation', 'Who made it; is it widely accepted?'],
    ['Substantive provisions', 'Fair; a reason for everyone to accept it'],
    ['Institutional design', 'Balanced, with checks and balances'],
  ],
  'Table of the three sources of a constitution\'s authority with the test for each: mode of promulgation, substantive provisions and institutional design',
);
const vExample2 = table(
  ['Point', 'Content (5 marks)'],
  [
    ['1', 'Coordination and assurance, with a school example'],
    ['2', 'Decision-making authority'],
    ['3', 'Limits on government'],
    ['4', 'Aspirations and a just society'],
    ['5', 'Identity of a people'],
  ],
  'Plan for a five-mark answer on the functions of a constitution: one point for each of the five functions with an example',
  'About 100 words: one function per point, each with an example.',
);
const vSummary1 = table(
  ['Topic', 'Key points'],
  [
    ['Meaning', 'Basic rules and principles by which a country is governed'],
    ['Functions', 'Coordination; who decides; limits; aspirations; identity'],
    ['Authority', 'Mode of promulgation; fair provisions; balanced design'],
    ['Forms', 'Written (India) and unwritten (Britain)'],
  ],
  'Summary table of Part 1: the meaning of a constitution, its five functions, its sources of authority and its written and unwritten forms',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['A constitution is only a list of rights', 'Rights are one of five functions'],
    ['Britain has no rules', 'Britain has no single document, but it has fundamental rules'],
    ['Authority comes only from force', 'It comes from acceptance, fair content and balanced design'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

const vDemand = table(
  ['Event', 'Meaning'],
  [
    ['Demand for a Constituent Assembly', 'Grew within the national movement'],
    ['Nehru Report, 1928', 'An early outline of a constitution for India'],
    ['Cabinet Mission plan, 1946', 'Basis on which the Assembly was formed'],
  ],
  'Table of steps toward the Assembly: the demand grew within the national movement, the Nehru Report of 1928 was an early outline of a constitution, and the Cabinet Mission plan of 1946 was the basis on which the Assembly was formed',
);
const vComposition = table(
  ['Feature', 'Detail'],
  [
    ['Formed', 'On the lines of the Cabinet Mission plan, 1946'],
    ['Members', 'Elected indirectly by the provincial legislative assemblies; princely-state representatives included'],
    ['First meeting', '9 December 1946'],
    ['After Partition', 'Strength fell to about 299'],
  ],
  'Table on the composition of the Constituent Assembly: formed on the lines of the Cabinet Mission plan; members elected indirectly by provincial assemblies with princely-state representatives; first meeting 9 December 1946; strength about 299 after Partition',
);
const vOfficers = table(
  ['Role', 'Person or body'],
  [
    ['President of the Assembly', 'Dr Rajendra Prasad'],
    ['Chair of the Drafting Committee', 'Dr B. R. Ambedkar'],
    ['Mover of the Objectives Resolution', 'Jawaharlal Nehru (13 December 1946)'],
  ],
  'Table of roles: Dr Rajendra Prasad President of the Assembly, Dr B. R. Ambedkar chair of the Drafting Committee, Jawaharlal Nehru mover of the Objectives Resolution on 13 December 1946',
);
const vObjectives = flow('LR', ['Objectives Resolution moved, 1946', 'Adopted, January 1947', 'Ideals guide the Assembly', 'Ideals shape the Preamble'], 'Flow: the Objectives Resolution was moved in 1946 and adopted in January 1947; its ideals guided the Assembly and shaped the Preamble', 'From resolution to Preamble');
const vWorking = flow('LR', ['Committees study subjects', 'Proposals come to the full Assembly', 'Open discussion; many views heard', 'Aim at consensus'], 'Flow: committees study subjects, proposals go to the full Assembly, open discussion hears many views, and the Assembly aims at consensus', 'How the Assembly worked');
const vRepresent = table(
  ['Some argue', 'Others argue'],
  [
    ['Members were chosen indirectly, not by all adults', 'Members came from many regions, communities and opinions'],
    ['Princely-state members came by a different route', 'Committees and open discussion heard varied views'],
    ['So it may not fully speak for everyone', 'It built on the national movement and sought consensus'],
  ],
  'Two-column table of views on how representative the Assembly was: some argue that indirect election and the different route for princely states limited it; others argue that varied members, committees and consensus gave it breadth',
  'Both views, so that students can judge with reasons.',
);
const vExampleRep = table(
  ['Step', 'What to write'],
  [
    ['1', 'State the claim in your own words'],
    ['2', 'Give a point for it, with a fact'],
    ['3', 'Give a point against it, with a fact'],
    ['4', 'Judge, with one reason'],
  ],
  'Worked example table with four steps for evaluating a claim about the Assembly: state the claim, a point for with a fact, a point against with a fact, and a judgement with a reason',
  'Evaluating how representative the Assembly was.',
);
const vAdapt = table(
  ['Source', 'What the framers did'],
  [
    ['Government of India Act 1935', 'Used as the base for many administrative provisions'],
    ['Other constitutions', 'Took ideas and adapted them to Indian needs'],
    ['Result', 'A Constitution made for India, not copied from any one country'],
  ],
  'Table of how the framers used sources: the Government of India Act 1935 as the base for administrative provisions, ideas from other constitutions adapted to Indian needs, giving a Constitution made for India',
);
const vExample4 = table(
  ['Mark', 'Point on borrowing'],
  [
    ['1', 'Name the 1935 Act as the base for many administrative provisions'],
    ['2', 'Give two borrowed ideas with their source countries'],
    ['3', 'State that they were adapted, with one example'],
  ],
  'Worked example table for a three-mark answer on borrowing: the 1935 Act as a base, two borrowed ideas with source countries, and the point that they were adapted with an example',
  'One sentence for each mark.',
);
const vDates = flow('LR', ['Assembly meets, 9 December 1946', 'Draft debated and revised', 'Adopted, 26 November 1949', 'In force, 26 January 1950'], 'Flow: the Assembly met on 9 December 1946, the draft was debated and revised, the Constitution was adopted on 26 November 1949 and came into force on 26 January 1950', 'About two years, eleven months and eighteen days of work');
const vSummary2 = table(
  ['Topic', 'Key points'],
  [
    ['Demand', 'National movement; Nehru Report, 1928'],
    ['Assembly', 'Cabinet Mission plan; indirect election; 9 December 1946; about 299 after Partition'],
    ['Working', 'Committees; consensus; diverse views; Objectives Resolution'],
    ['Sources', '1935 Act; ideas adapted from Britain, the United States, Ireland, France, Canada'],
    ['Dates', 'Adopted 26 November 1949; in force 26 January 1950'],
  ],
  'Summary table of Part 2: the demand for an Assembly, its composition, its way of working, the sources it drew on and the dates of adoption and enforcement',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Members were elected directly by all adults', 'Elected indirectly by provincial legislative assemblies'],
    ['Dr Ambedkar was the Assembly President', 'He chaired the Drafting Committee; Dr Rajendra Prasad was President'],
    ['Features were copied from other countries', 'They were adapted to Indian conditions'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Constitution: Why and How? — Part 1: Why a Constitution',
  goals: [
    'Define a constitution and distinguish written from unwritten constitutions',
    'Explain the five functions of a constitution',
    'Explain the sources of the authority of a constitution',
    'Apply the functions to imagined clubs, colonies and countries',
  ],
  slides: [
    sl('title', 'Constitution: Why and How?', {
      b: 'Part 1 — what a **constitution** is, what it does, and what gives it **authority**.',
      v: flow('LR', ['Why rules?', 'Meaning', 'Five functions', 'Written and unwritten', 'Sources of authority'], 'Route map of Part 1: why rules, meaning, five functions, written and unwritten forms, and sources of authority', 'Part 1 at a glance'),
      n: 'Every group of people, from a cycling club to a country, needs rules. In this part we ask what a constitution is, what jobs it does for a society, and why some constitutions are respected while others are not. We shall use imagined clubs and countries to practise each idea.',
    }),
    sl('concept', 'What is a constitution?', {
      v: vMeaning,
      n: 'A constitution is the body of basic rules and principles by which a country is governed. It can be written, collected in one document, as in India, which has among the longest written constitutions. Or it can be unwritten in the sense of having no single document, as in Britain, where the rules are found in statutes, conventions and decisions.',
    }),
    sl('diagram', 'Five functions of a constitution', {
      v: vWeb,
      n: 'A constitution does five jobs. It gives basic rules for coordination and assurance. It says who has the power to decide, and how the government is formed. It sets limits on the power of government. It lets a government fulfil the hopes of society and create conditions for a just society. And it expresses the identity of a people. We look at each in turn.',
    }),
    sl('concept', 'Function one: coordination and assurance', {
      v: vClub,
      n: 'Imagine ten families sharing one borewell. Without a timetable, each family guesses, and quarrels follow. With a written timetable, everyone knows what to expect and can rely on the others to follow it. That is the first function of a constitution: a set of basic rules that allow minimal coordination and assurance among the members of a society.',
    }),
    sl('check', 'Quick check: the meaning', {
      b: 'Which statement gives the standard meaning of the term constitution?',
      chk: 'm_def',
      n: 'Choose the option that describes the basic framework on which a government is founded and run, not a single speech, order or list of laws.',
    }),
    sl('concept', 'Function two: who decides', {
      v: vAuthority,
      n: 'A society must settle who may take decisions. A constitution names the bodies that make laws, carry them out and settle disputes, and it says how the government is formed. Without this, people would not know whose decisions count. This is the decision making authority function: it gives power a clear source and a clear shape.',
    }),
    sl('concept', 'Function three: limits on government', {
      v: vLimits,
      n: 'Power can be misused, so a constitution also sets limits on what a government may do. Fundamental rights are a familiar example. A government may make laws through the proper body, but it may not keep a person in prison without a hearing. Because the limit is written in the constitution, even a government with a large majority must respect it.',
    }),
    sl('check', 'Quick check: a limit on power', {
      b: 'A clause forbids the ruler to seize property without a court order. Is it a limit on the power of government?',
      chk: 'tf_limits',
      n: 'Ask whether the clause holds back what the ruler may do.',
    }),
    sl('example', 'Worked example 1: classify the clauses', {
      b: 'The imagined Charter of Norvale has five clauses. Name the function that each one serves.',
      bl: ['Council of two houses makes laws: **decision-making authority**', 'No fine without a written reason: **limits on government**', 'A school in every district: **aspirations**', 'Opening lines on a shared past: **identity**'],
      v: vExample1,
      n: 'Let us classify clauses from an imagined charter. A council of two houses that makes laws shows decision making authority. A rule that no one may be fined without a written reason limits the government. A school in every district shows aspirations. Opening lines on a shared past express identity. A fixed date for tax returns gives coordination and assurance.',
    }),
    sl('concept', 'Functions four and five', {
      v: vAspire,
      n: 'The fourth function is to enable the government to fulfil the aspirations of a society and to create the conditions for a just society. A constitution gives a government the means and the direction to act. The fifth function is to express the fundamental identity of a people, by recording the values that they share and wish to be known by.',
    }),
    sl('check', 'Quick check: identity', {
      b: 'The opening part of the imagined Charter of the Tamsa Isles recalls the islanders\' shared history. Which function is it?',
      chk: 'm_scope',
      n: 'Think of the function that records who a people are and what they value.',
    }),
    sl('concept', 'Written and unwritten constitutions', {
      v: vWritten,
      n: 'Compare the two forms. In a written constitution such as India, the basic rules are in one document, which also tells us how to change them. In Britain there is no single document. The basic rules come from statutes, conventions and judicial decisions, and much change happens through ordinary law and practice. Both countries have fundamental rules; only the form differs.',
    }),
    sl('diagram', 'Authority 1: who made it', {
      v: vMode,
      n: 'Why do people obey a constitution? The first reason lies in how it was made, which is called the mode of promulgation. If the body that made it is seen as legitimate, and if the constitution is widely accepted, it gains authority. A text imposed by a small group without discussion starts with a weak claim to respect.',
    }),
    sl('concept', 'Authority 2 and 3: content and design', {
      v: vDesign,
      n: 'The second source is the content. Fair provisions give everyone a reason to accept the constitution. The third is institutional design. A good design divides power and builds in checks and balances. It is neither too rigid, which means it cannot adapt, nor too flexible, which means whoever holds power can rewrite it at will. A special majority for change is a balanced answer.',
    }),
    sl('check', 'Quick check: complete the idea', {
      b: 'A constitution allows minimal ___ and assurance among members of society.',
      chk: 'fb_func',
      n: 'Remember the first function: the missing word means working together.',
    }),
    sl('diagram', 'Three sources of authority', {
      v: vSources,
      n: 'Put the three sources together. First, the mode of promulgation: who made it, and is it widely accepted. Second, the substantive provisions: are they fair, and do they give everyone a reason to accept the constitution. Third, the institutional design: is it balanced, with checks and balances. Strong constitutions usually score well on all three.',
    }),
    sl('example', 'Worked example 2: a five-mark answer', {
      b: 'Question: *Explain the functions of a constitution using the example of a student council.* Plan five points.',
      bl: ['One function per point', 'Apply each to the council', 'Bold the key word', 'About 100 words'],
      v: vExample2,
      n: 'For a five mark answer, plan five points, one for each function. Apply each to the student council. Rules for meetings give coordination. The way officers are chosen gives decision making authority. A ban on expelling a member without a hearing sets limits. A promise of fair opportunities is an aspiration. Its opening statement gives identity. Aim for about one hundred words.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. A constitution is the body of basic rules and principles by which a country is governed. It has five functions: coordination and assurance, deciding who holds power, limiting government, meeting aspirations and expressing identity. Its authority rests on how it was made, how fair it is, and how balanced its design is. It may be written, as in India, or unwritten, as in Britain.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define a constitution in one precise sentence', 'Name all five functions; add an example to each', 'Use the three sources of authority as headings', 'Never say Britain has no rules; say it has no single document'],
      v: vTips1,
      n: 'A few tips. Begin with a one sentence definition. When a question asks for functions, name all five and give an example for each. For authority, use the three sources as headings. And take care with Britain: it has fundamental rules but no single written document. Avoid saying that a constitution is only a list of rights.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Constitution: Why and How? — Part 2: Making of the Indian Constitution',
  goals: [
    'Trace the demand for a constituent assembly and the Nehru Report',
    'Describe the composition and working of the Constituent Assembly',
    'Explain how the Objectives Resolution and other sources shaped the Constitution',
    'State the dates of adoption and enforcement',
  ],
  slides: [
    sl('title', 'Making of the Indian Constitution', {
      b: 'Part 2 — how the **Constituent Assembly** framed the **Constitution** between 1946 and 1950.',
      v: flow('LR', ['The demand', 'The Assembly', 'How it worked', 'Ideas adapted', 'Adoption'], 'Route map of Part 2: the demand, the Assembly, how it worked, ideas adapted, and adoption', 'Part 2 at a glance'),
      n: 'A constitution does not appear from nowhere. In this part we follow the making of the Indian Constitution: how the demand for it grew, how the Constituent Assembly was formed, how its members worked and argued, which ideas they drew upon, and the dates when the Constitution was adopted and came into force.',
    }),
    sl('diagram', 'A timeline from 1928 to 1950', {
      v: vTimeline,
      n: 'Here are the main steps, equally spaced for clarity. In 1928 the Nehru Report outlined a constitution. In 1946 the Cabinet Mission plan provided the basis for the Assembly, which met in December. The Objectives Resolution was adopted in January 1947. The Constitution was adopted on 26 November 1949 and came into force on 26 January 1950.',
    }),
    sl('concept', 'The demand for a constitution', {
      v: vDemand,
      n: 'The demand for a constituent assembly grew within the national movement. Indians wanted to frame their own constitution rather than have one given to them. The Nehru Report of 1928 was an early outline of such a constitution. It did not become law, but it showed that Indian leaders could agree on a framework. In 1946 the Cabinet Mission plan opened the way for an Assembly.',
    }),
    sl('concept', 'How the Assembly was formed', {
      v: vComposition,
      n: 'The Constituent Assembly was formed on the lines of the Cabinet Mission plan of 1946. Its members were elected indirectly, by the members of the provincial legislative assemblies, and representatives of the princely states were also included. It first met on 9 December 1946. After Partition, its strength fell to about 299 members, as commonly taught.',
    }),
    sl('check', 'Quick check: why committees?', {
      b: 'Why did the Assembly work through committees?',
      chk: 'm_committees',
      n: 'Think about how a large body can study many subjects in detail.',
    }),
    sl('concept', 'Who led the work', {
      v: vOfficers,
      n: 'Doctor Rajendra Prasad was the President of the Assembly. The Drafting Committee, which prepared the draft text, was chaired by Doctor Bhimrao Ambedkar. Jawaharlal Nehru moved the Objectives Resolution on 13 December 1946. Many other members took part, and the credit for the Constitution belongs to the whole Assembly, not to any one person.',
    }),
    sl('diagram', 'The Objectives Resolution', {
      v: vObjectives,
      n: 'The Objectives Resolution was moved by Jawaharlal Nehru in December 1946 and adopted in January 1947. It set out the ideals the Assembly would follow in its work. These ideals went on to shape the Preamble. Treat it as a statement of purpose that came first, before the detailed provisions were taken up.',
    }),
    sl('diagram', 'How the Assembly worked', {
      v: vWorking,
      n: 'The Assembly deliberated through committees. Each studied a subject in detail and brought proposals to the full house. Debate was open, and the Assembly aimed at consensus. Members came from many regions, communities and opinions, and the Assembly respected diverse views. It also built on the inheritance of the national movement, which had already discussed many of these questions.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'The framers of the Constitution copied each borrowed idea word for word.',
      chk: 'tf_borrow_copy',
      n: 'Ask whether ideas from elsewhere were simply copied, or fitted to Indian conditions.',
    }),
    sl('example', 'Worked example 1: evaluating a claim', {
      b: 'Claim: *The Constituent Assembly could not speak for all because its members were not chosen by all adults.* Evaluate it.',
      bl: ['For: members elected indirectly', 'Against: many regions, communities and opinions', 'Against: committees, discussion and consensus', 'Judge with a reason'],
      v: vExampleRep,
      n: 'Here is how to evaluate a claim. State it in your own words. Give a point for it with a fact: members were elected indirectly. Give a point against it with a fact: they came from many regions, communities and opinions, and worked through committees to reach consensus. Then judge, with one clear reason. Both views are respectable.',
    }),
    sl('concept', 'Was it representative? Two views', {
      v: vRepresent,
      n: 'Students of politics have discussed how representative the Assembly was. Some argue that indirect election, on a limited franchise, and a different route for the princely states, meant it may not fully speak for everyone. Others argue that its members came from many walks of life and that committees and open debate heard varied views. Weigh both and give reasons.',
    }),
    sl('diagram', 'Where the ideas came from', {
      v: vBorrow,
      n: 'The framers drew on the experience of other countries. From Britain came parliamentary government, the rule of law, the Speaker and single citizenship. From the United States came a bill of rights, judicial review and an independent judiciary. From Ireland came Directive Principles. From France came liberty, equality and fraternity. From Canada came a quasi federal form with a strong centre.',
    }),
    sl('concept', 'Adapted, not copied', {
      v: vAdapt,
      n: 'The Government of India Act of 1935 provided the base for many administrative provisions. Ideas from other constitutions were taken and adapted to Indian conditions. The result was a Constitution made for India. When you write about borrowing, always say that the ideas were adapted, and give one example of how.',
    }),
    sl('check', 'Quick check: match the countries', {
      b: 'Match each country with the idea traced to its experience.',
      chk: 'mt_borrow',
      n: 'Pair the United States, Ireland, Canada and Britain with their ideas.',
    }),
    sl('example', 'Worked example 2: a three-mark answer', {
      b: 'Question: *Explain how the framers made use of earlier law and other constitutions.*',
      v: vExample4,
      n: 'For three marks, write three distinct points. First, name the Government of India Act of 1935 as the base for many administrative provisions. Second, give two borrowed ideas with their source countries, such as judicial review from the United States and Directive Principles from Ireland. Third, say that they were adapted, with one example.',
    }),
    sl('diagram', 'From first meeting to Republic Day', {
      v: vDates,
      n: 'The Assembly met for the first time on 9 December 1946. It then debated and revised the draft for about two years, eleven months and eighteen days. The Constitution was adopted on 26 November 1949, which is now observed as Constitution Day. It came into force on 26 January 1950, which we celebrate as Republic Day.',
    }),
    sl('check', 'Quick check: put in order', {
      b: 'Arrange five steps in the making of the Constitution in the order they happened.',
      chk: 'ord_events',
      n: 'Start with the early outline of 1928 and end with the day the Constitution came into force.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. The demand for a constituent assembly grew in the national movement, and the Nehru Report of 1928 was an early outline. The Assembly was formed on the lines of the Cabinet Mission plan, with members elected indirectly. It worked through committees and aimed at consensus. It adapted ideas from many sources. The Constitution was adopted on 26 November 1949 and came into force on 26 January 1950.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say **indirectly elected** by the provincial legislative assemblies', 'Keep apart the **President** and the **Drafting Committee chair**', 'Write **adapted**, not copied', 'For evaluation, give two views and a reasoned judgement'],
      v: vTips2,
      n: 'Some final tips. State that members were elected indirectly by provincial legislative assemblies. Keep apart the President of the Assembly, Doctor Rajendra Prasad, and the chair of the Drafting Committee, Doctor Ambedkar. When writing about borrowing, use the word adapted. And for evaluation questions, give two views and then a judgement with a reason.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Constitution: Why and How? — Notes',
  sections: [
    {
      h: '1. What is a constitution?',
      t: 1,
      b: 'A **constitution** is the body of basic rules and principles by which a country is governed. It sets up the main organs of government, defines their powers and relates them to the people.\n\n**Written and unwritten:** in a written constitution the fundamental rules are collected in one authoritative document. India has a written constitution, among the longest in the world. Britain has no single written document: its fundamental rules are found in statutes, conventions and judicial decisions.',
      terms: [
        ['Constitution', 'The body of basic rules and principles by which a country is governed.'],
        ['Written constitution', 'A constitution whose fundamental rules are collected in one authoritative document.'],
        ['Unwritten constitution', 'A constitution with no single document, whose rules are found in several sources such as statutes and conventions.'],
      ],
      v: vMeaning,
    },
    {
      h: '2. Functions of a constitution',
      t: 1,
      b: 'A constitution performs five functions.\n\n1. **Coordination and assurance:** it provides basic rules that allow minimal coordination and assurance among members of society.\n2. **Decision-making authority:** it specifies who has the power to make decisions and how the government is constituted.\n3. **Limits on government:** it sets limits on the powers of government, for example through fundamental rights.\n4. **Aspirations:** it enables the government to fulfil the aspirations of society and to create the conditions for a just society.\n5. **Identity:** it expresses the fundamental identity of a people.',
      terms: [
        ['Assurance', 'Confidence that others will follow the same rules, which makes cooperation possible.'],
        ['Fundamental rights', 'Basic rights guaranteed by the constitution, which the government must respect.'],
      ],
      v: vWeb,
      vs: [vClub, vLimits],
    },
    {
      h: '3. Authority of a constitution',
      t: 1,
      b: 'Why people accept a constitution depends on three things.\n\n- **Mode of promulgation:** who made it, and whether it is widely accepted.\n- **Substantive provisions:** whether the content is fair and gives everyone a reason to accept it.\n- **Institutional design:** a balanced design with checks and balances, neither too rigid nor too flexible.',
      terms: [
        ['Promulgation', 'The way in which a constitution is made and brought into effect.'],
        ['Checks and balances', 'An arrangement in which each organ of government restrains the others so that none gains unchecked power.'],
        ['Rigid constitution', 'One that is so hard to change that it cannot adapt to new needs.'],
        ['Flexible constitution', 'One that is so easy to change that its basic rules give little protection.'],
      ],
      v: vSources,
      vs: [vDesign],
    },
    {
      h: '4. The demand and the Constituent Assembly',
      t: 2,
      b: 'The demand for a **constituent assembly** grew within the national movement. The **Nehru Report (1928)** was an early outline of a constitution for India.\n\nThe Assembly was formed on the lines of the **Cabinet Mission plan (1946)**. Members were elected **indirectly** by the members of the provincial legislative assemblies, and representatives of the princely states were also included. It first met on **9 December 1946**. After Partition its strength fell to about **299** members (as commonly taught). **Dr Rajendra Prasad** was its President, and the **Drafting Committee** was chaired by **Dr B. R. Ambedkar**.',
      terms: [
        ['Constituent Assembly', 'A body elected or chosen to frame the constitution of a country.'],
        ['Drafting Committee', 'The committee of the Assembly that prepared the draft of the Constitution.'],
        ['Indirect election', 'Election of members by an elected body rather than directly by all voters.'],
      ],
      v: vTimeline,
      vs: [vComposition, vOfficers],
    },
    {
      h: '5. How the Assembly worked',
      t: 2,
      b: 'The **Objectives Resolution**, moved by Jawaharlal Nehru on 13 December 1946 and adopted in January 1947, set out the ideals that shaped the **Preamble**.\n\nThe Assembly **deliberated through committees**, aimed at **consensus** and open discussion, and **respected diverse views**. Its members came from many regions, communities and opinions, and it built on the inheritance of the national movement.\n\n**Some argue** that indirect election limited how fully it could represent all citizens; **others argue** that its varied membership and open debate gave it breadth. Weigh both views with reasons.',
      terms: [
        ['Objectives Resolution', 'The resolution that set out the guiding ideals of the Constituent Assembly and shaped the Preamble.'],
        ['Consensus', 'General agreement reached after discussion, without a sharp division into winners and losers.'],
      ],
      v: vWorking,
      vs: [vObjectives, vRepresent],
    },
    {
      h: '6. Sources, borrowing and adoption',
      t: 2,
      b: 'The **Government of India Act 1935** provided the base for many administrative provisions. Ideas were **adapted**, not copied, from other constitutions:\n\n- **Britain:** parliamentary government, rule of law, the office of the Speaker, single citizenship.\n- **United States:** a bill of rights (fundamental rights), judicial review, an independent judiciary.\n- **Ireland:** Directive Principles.\n- **France:** liberty, equality and fraternity.\n- **Canada:** a quasi-federal form with a strong centre and residuary powers with the centre.\n\nThe Constitution was **adopted on 26 November 1949** (now observed as Constitution Day) and **came into force on 26 January 1950** (Republic Day). The Assembly took about three years, commonly given as 2 years, 11 months and 18 days.',
      terms: [
        ['Judicial review', 'The power of courts to examine laws and actions of government and to declare them invalid if they conflict with the constitution.'],
        ['Residuary powers', 'The powers not listed for any level of government, which in India rest with the centre.'],
        ['Quasi-federal', 'A federal form in which the centre is stronger than the units.'],
      ],
      v: vBorrow,
      vs: [vAdapt, vDates],
    },
  ],
  tips: '**Common mistakes**\n- Saying a constitution is only a list of rights; rights are one function among five.\n- Saying Britain has no rules; it has no single written document.\n- Writing that members were elected directly by all adults; they were elected **indirectly**.\n- Confusing the **President** of the Assembly (Dr Rajendra Prasad) with the **chair of the Drafting Committee** (Dr B. R. Ambedkar).\n- Writing that ideas were copied; say **adapted**.\n\n**How marks are usually awarded**\n- 1 mark: one correct option, date or term.\n- 2 marks: two points, about 30–50 words.\n- 3 marks: three distinct points, about 50–80 words.\n- 5 marks: five points, about 80–120 words; for *evaluate* or *examine*, end with a judgement.\n- Case-based (4 marks): read the passage first; name the concept for each line; part (c) has an internal choice.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is a **constitution**?', 'The body of **basic rules and principles** by which a country is governed.', 'definition', 1],
  ['What is a **written** constitution?', 'One whose fundamental rules are collected in **one authoritative document**, as in India.', 'definition', 1],
  ['Why is Britain\'s constitution called **unwritten**?', 'It has **no single document**; its rules are in statutes, conventions and decisions.', 'concept', 1],
  ['How would you describe India\'s constitution in length?', 'Written, and **among the longest** written constitutions.', 'fact', 1],
  ['Function 1 of a constitution', 'Basic rules that allow **minimal coordination and assurance** among people.', 'concept', 1],
  ['Function 2 of a constitution', 'Specifies **who has the power to decide** and how the government is constituted.', 'concept', 1],
  ['Function 3 of a constitution', 'Sets **limits on the powers of government**, for example through fundamental rights.', 'concept', 1],
  ['Function 4 of a constitution', 'Lets government fulfil **aspirations** and create conditions for a **just society**.', 'concept', 1],
  ['Function 5 of a constitution', 'Expresses the **fundamental identity** of a people.', 'concept', 1],
  ['What is **assurance**?', 'Confidence that others will follow the same rules.', 'definition', 1],
  ['First source of authority', '**Mode of promulgation**: who made it and whether it is widely accepted.', 'concept', 1],
  ['Second source of authority', '**Substantive provisions**: fair content that gives everyone a reason to accept it.', 'concept', 1],
  ['Third source of authority', 'A **balanced institutional design** with checks and balances.', 'concept', 1],
  ['What is a **rigid** constitution?', 'One too hard to change; it cannot adapt to new needs.', 'definition', 1],
  ['What is a **flexible** constitution?', 'One too easy to change; it gives little protection from those in power.', 'definition', 1],
  ['What are **checks and balances**?', 'Each organ of government restrains the others so none gains unchecked power.', 'definition', 1],
  ['Who put forward an early outline of a constitution in **1928**?', 'The **Nehru Report**, drawn up by Indian leaders.', 'fact', 2],
  ['On whose plan was the Assembly formed?', 'The **Cabinet Mission plan, 1946**.', 'fact', 2],
  ['How were members elected?', '**Indirectly**, by the provincial legislative assemblies; princely-state representatives also included.', 'fact', 2],
  ['When did the Assembly first meet?', '**9 December 1946**.', 'fact', 2],
  ['Strength after Partition', 'About **299** members (as commonly taught).', 'fact', 2],
  ['President of the Assembly', '**Dr Rajendra Prasad**.', 'fact', 2],
  ['Chair of the Drafting Committee', '**Dr B. R. Ambedkar**.', 'fact', 2],
  ['**Objectives Resolution**', 'Moved by Nehru on **13 December 1946**, adopted **January 1947**; its ideals shaped the Preamble.', 'fact', 2],
  ['How did the Assembly work?', 'Through **committees**, aiming at **consensus** and open discussion, respecting diverse views.', 'concept', 2],
  ['Base for many administrative provisions', 'The **Government of India Act 1935**.', 'fact', 2],
  ['Borrowed from **Britain**', 'Parliamentary government, rule of law, the Speaker, single citizenship.', 'fact', 2],
  ['Borrowed from the **United States**', 'Bill of rights, judicial review, independent judiciary.', 'fact', 2],
  ['Borrowed from **Ireland**, **France**, **Canada**', 'Directive Principles; liberty, equality and fraternity; quasi-federal form with a strong centre.', 'fact', 2],
  ['Were borrowed ideas copied?', 'No: they were **adapted** to Indian conditions.', 'exam-tip', 2],
  ['Adoption and enforcement dates', 'Adopted **26 November 1949** (Constitution Day); in force **26 January 1950** (Republic Day).', 'fact', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short) — Constitution: Why and How?',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_authority_who', 'm_authority_mode', 'm_election', 'ar_rigid'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s2_authority_modes', 's2_objectives', 's3_working'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_functions', 'l_assembly'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['case_club'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long) — Constitution: Why and How?',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_club', 'm_limits', 'm_written', 'm_authority_subst', 'm_cab_mission', 'm_objectives', 'm_drafting', 'm_us_pair', 'ar_direct', 'ar_unrelated'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s2_define', 's2_flex', { attempt: 1, keys: ['s2_comp', 's2_adapt'] }, 's3_functions', { attempt: 1, keys: ['s3_written', 's3_borrow'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_authority', { attempt: 1, keys: ['l_borrow', 'l_legit'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['case_letter', 'case_debate'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch01 only (why a constitution and its functions; making of the Indian Constitution and the Constituent Assembly); rights and Directive Principles are named in one line each',
    originality: 'every passage (newspaper report, debate, panchayat meeting, letter, table) is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text or Assembly speech, and no board or sample-paper item reused (D-036)',
    facts: 'stable dates only: Nehru Report 1928; Cabinet Mission plan 1946; first meeting 9 December 1946; Objectives Resolution moved 13 December 1946 and adopted January 1947; Drafting Committee set up 1947; strength about 299 after Partition; adopted 26 November 1949; in force 26 January 1950; about 2 years 11 months 18 days; nothing after 2024',
    neutrality: 'the representativeness of the Assembly is presented as some argue and others argue; no person or institution is praised or blamed',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
