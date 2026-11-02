// Build ICSE 9 History & Civics ch04 The State Legislature. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch04/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch04', 'social-science');
const { unicamFigure, compositionFigure, rotationFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['One House or two', 'Assembly: composition and term', 'Qualifications', 'Speaker and Deputy Speaker'], 'Route map of Part 1: unicameral and bicameral legislatures, the composition and term of the Legislative Assembly, its qualifications for membership, and its presiding officers', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['The Legislative Council', 'Term and permanence', 'Powers of the legislature', 'Assembly and Council compared'], 'Route map of Part 2: the composition of the Legislative Council, its term and permanence, the powers of the State legislature, and a comparison of the two Houses', 'Part 2 at a glance');
const vFit = flow('LR', ['Voters elect the Assembly', 'Assembly makes laws and controls the ministry', 'Governor gives assent to bills'], 'Flow: voters elect the Legislative Assembly, the Assembly makes laws and controls the ministry, and the Governor gives assent to bills', 'Where the State legislature fits.');
const vUnicam = unicamFigure('Two panels. A unicameral State legislature has one House, the directly elected Legislative Assembly. A bicameral State legislature has two Houses: the Legislative Council as the upper House, mostly indirectly elected, and the Legislative Assembly as the lower House, directly elected', 'One House or two (schematic).');
const vSix = table(['State (as of 2024)', 'Legislature'], [
  ['Andhra Pradesh', 'Bicameral'],
  ['Bihar', 'Bicameral'],
  ['Karnataka', 'Bicameral'],
  ['Maharashtra', 'Bicameral'],
  ['Telangana', 'Bicameral'],
  ['Uttar Pradesh', 'Bicameral'],
  ['All other States', 'Unicameral'],
], 'Table: as of 2024 six States have a Legislative Council and are bicameral: Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana and Uttar Pradesh; all the other States are unicameral', 'Six bicameral States, as of 2024.');
const vCreate = flow('LR', ['Assembly passes a resolution by a special majority', 'Parliament makes a law', 'Council is created or abolished'], 'Flow: the State Assembly passes a resolution by a special majority, Parliament makes a law, and the Council is created or abolished', 'Creating or abolishing a Council.');
const vForAgainst = table(['In favour of a Council', 'Against a Council'], [
  ['A second look at hasty bills', 'Extra cost to run'],
  ['Room for experienced persons', 'Can delay useful laws'],
  ['Wider groups represented', 'Not chosen directly by all voters'],
], 'Table of arguments about a Legislative Council: in favour are a second look at bills, room for experienced persons and wider representation; against are extra cost, delay and no direct election by all voters', 'Arguments sometimes made.');
const vSortLeg = table(['Imagined State', 'Houses', 'Type'], [
  ['Tamrapur', 'Assembly only', 'Unicameral'],
  ['Girivan', 'Assembly and Council', 'Bicameral'],
  ['Sindhuvan', 'Assembly; Council being planned', 'Unicameral for now'],
], 'Table sorting three imagined States: Tamrapur has an Assembly only and is unicameral, Girivan has an Assembly and a Council and is bicameral, and Sindhuvan has an Assembly only for now and is unicameral for now', 'Sorting imagined States.');
const vAssembly = table(['Feature', 'Legislative Assembly'], [
  ['Other name', 'Vidhan Sabha; the lower House'],
  ['Strength', 'Not more than 500 and not less than 60 (a few small States have fewer)'],
  ['Election', 'Directly, from territorial constituencies'],
  ['Reserved seats', 'For the Scheduled Castes and Scheduled Tribes'],
  ['Term', 'Five years'],
], 'Table of features of the Legislative Assembly: another name, strength of not more than 500 and not less than 60, direct election from territorial constituencies, reserved seats and a five-year term', 'The Assembly at a glance.');
const vTerm = flow('LR', ['Elected for five years', 'Governor may dissolve earlier on the advice of the Chief Minister', 'Parliament may extend one year at a time in a national emergency'], 'Flow: the Assembly is elected for five years, the Governor may dissolve it earlier on the advice of the Chief Minister, and Parliament may extend it one year at a time in a national emergency', 'The life of an Assembly.');
const vQual = table(['Condition', 'Meaning in brief'], [
  ['Citizen', 'Must be a citizen of India'],
  ['Age', 'At least twenty-five years old'],
  ['Voter', 'Registered on the electoral roll'],
  ['No office of profit', 'Must not hold a paid post under the government'],
], 'Table of qualifications for membership of the Legislative Assembly: citizen of India, at least twenty-five years old, registered on the electoral roll, and no office of profit under the government', 'Four basic conditions.');
const vCands = table(['Imagined candidate', 'Facts', 'Eligible?'], [
  ['Arvind', '31, citizen, on the roll, no paid post', 'Yes'],
  ['Bhavna', '22, citizen, on the roll', 'No: below twenty-five'],
  ['Chitra', '45, citizen, on the roll, a paid government clerk', 'No: office of profit'],
], 'Table testing three imagined candidates: Arvind is eligible, Bhavna is not because she is below twenty-five, and Chitra is not because she holds an office of profit', 'Testing eligibility.');
const vSpeaker = table(['Officer', 'How chosen', 'Main work'], [
  ['Speaker', 'Elected by the members from among themselves', 'Presides, keeps order, decides who speaks'],
  ['Deputy Speaker', 'Elected by the members', 'Presides when the Speaker is absent'],
], 'Table of presiding officers of the Assembly: the Speaker is elected by the members and presides and keeps order; the Deputy Speaker is elected by the members and presides when the Speaker is absent', 'Presiding officers.');
const vSum1 = table(['Topic', 'Key point'], [
  ['Unicameral and bicameral', 'One House or two; six States have a Council (as of 2024)'],
  ['Assembly strength', 'Not more than 500, not less than 60'],
  ['Assembly term', 'Five years; dissolution and extension'],
  ['Qualifications', 'Citizen, twenty-five, on the roll, no office of profit'],
  ['Presiding officer', 'Speaker, elected by the members'],
], 'Summary table of Part 1: unicameral and bicameral, Assembly strength, term, qualifications and the Speaker', 'Part 1 in one table.');

const vCouncil = table(['Feature', 'Legislative Council'], [
  ['Other name', 'Vidhan Parishad; the upper House'],
  ['Strength', 'Not more than one-third of the Assembly and not fewer than forty'],
  ['Term', 'Six years for each member'],
  ['Presiding officer', 'Chairman, elected by the members'],
], 'Table of features of the Legislative Council: another name, strength of not more than one-third of the Assembly and not fewer than forty, a six-year term for each member and a Chairman elected by the members', 'The Council at a glance.');
const vComp = compositionFigure('One bar showing how a Legislative Council is chosen: about one-third elected by MLAs, about one-third by local bodies, one-twelfth by graduates, one-twelfth by teachers and about one-sixth nominated by the Governor', 'How the Council is chosen (schematic, not to scale).');
const vWho = table(['Group', 'Share', 'Imagined example of a voter or member'], [
  ['MLAs', 'About one-third', 'A member of the Assembly votes for Council seats'],
  ['Local bodies', 'About one-third', 'A councillor of a municipality votes'],
  ['Graduates', 'One-twelfth', 'A graduate living in the State votes'],
  ['Teachers', 'One-twelfth', 'A teacher of a higher school votes'],
  ['Governor\'s nominees', 'About one-sixth', 'An expert in science or social service is nominated'],
], 'Table of the five groups that fill a Legislative Council, their shares and an imagined example for each', 'Five routes into the Council.');
const vShares = table(['Route', 'Share', 'Seats in an imagined 96-member Council'], [
  ['MLAs', 'one-third', '32'],
  ['Local bodies', 'one-third', '32'],
  ['Graduates', 'one-twelfth', '8'],
  ['Teachers', 'one-twelfth', '8'],
  ['Governor\'s nominees', 'one-sixth', '16'],
], 'Table working out an imagined 96-member Council: thirty-two seats each from MLAs and local bodies, eight each from graduates and teachers and sixteen nominated, making ninety-six in all', 'Worked out for ninety-six seats.');
const vCQual = table(['Point', 'Council', 'Assembly'], [
  ['Minimum age', 'Thirty years', 'Twenty-five years'],
  ['Term', 'Six years for a member; the House is never dissolved', 'Five years; can be dissolved'],
  ['Presiding officer', 'Chairman', 'Speaker'],
], 'Table comparing the Council and the Assembly on minimum age, term and presiding officer', 'Age, term and presiding officer.');
const vRotation = rotationFigure('Timeline of three overlapping six-year terms. One third is chosen at year zero and serves to year six, another third from year two to year eight, and a third third from year four to year ten, so one third retires and one third is chosen every two years', 'A permanent House (schematic, not to scale).');
const vPowers = table(['Kind of power', 'Example'], [
  ['Legislative', 'Laws on State List and Concurrent List subjects'],
  ['Financial', 'Budget and money bills'],
  ['Control over the executive', 'Questions, motions, no-confidence motion'],
  ['Electoral', 'Voting for the President and Rajya Sabha members'],
  ['Constitutional', 'Ratifying certain amendments'],
], 'Table of five kinds of power of the State legislature: legislative, financial, control over the executive, electoral and constitutional, each with an example', 'Five kinds of power.');
const vBillFlow = flow('LR', ['Assembly passes the bill', 'Council delays up to three months', 'Assembly passes it again; Council opposes or waits one month', 'Bill treated as passed; Governor assents'], 'Flow of an ordinary bill that the Council opposes: the Assembly passes it, the Council may delay up to three months, the Assembly passes it again and the Council opposes or waits one month, and then the bill is treated as passed and the Governor gives assent', 'The Assembly has the last word.');
const vTrace = table(['Step', 'What happens in imagined Dhavalpur'], [
  ['1', 'The Assembly passes a bill on weekly markets and sends it on'],
  ['2', 'The Council rejects it'],
  ['3', 'The Assembly passes the same bill again'],
  ['4', 'The Council again rejects it'],
  ['5', 'The bill is treated as passed and goes for assent'],
], 'Table tracing an ordinary bill in imagined Dhavalpur through five steps from the Assembly to the Governor\'s assent', 'Tracing a bill.');
const vMoney = flow('LR', ['Money bill begins only in the Assembly', 'Council may hold it for fourteen days', 'Assembly accepts or rejects suggestions; bill passes'], 'Flow of a money bill: it begins only in the Assembly, the Council may hold it for fourteen days, and the Assembly accepts or rejects the suggestions and the bill passes', 'Money bills.');
const vControl = table(['Tool', 'Assembly', 'Council'], [
  ['Questions to ministers', 'Yes', 'Yes'],
  ['Debates and motions', 'Yes', 'Yes'],
  ['No-confidence motion', 'Yes', 'No'],
  ['Ministry responsible to it', 'Yes', 'No'],
], 'Table of tools of control over the executive: questions and debates are open to both Houses, but only the Assembly can pass a no-confidence motion and only the Assembly has the ministry responsible to it', 'Tools of control.');
const vElect = table(['Task', 'Who takes part'], [
  ['Electing the President', 'Elected members of the Assembly'],
  ['Electing Rajya Sabha members of the State', 'Elected members of the Assembly'],
  ['Electing one-third of the Council', 'Members of the Assembly'],
  ['Ratifying certain amendments', 'At least half of the State legislatures'],
], 'Table of electoral and constitutional tasks: the Assembly\'s elected members vote for the President and for Rajya Sabha members, MLAs elect one-third of the Council, and at least half of the State legislatures ratify certain amendments', 'Electoral and amendment tasks.');
const vCompare = table(['Point', 'Legislative Assembly', 'Legislative Council'], [
  ['Members', 'Directly elected', 'Indirectly elected and nominated'],
  ['Minimum age', 'Twenty-five years', 'Thirty years'],
  ['Term', 'Five years; can be dissolved', 'Six years; permanent House'],
  ['Money bills', 'Introduced and decided here', 'Can hold for fourteen days only'],
  ['Ordinary bills', 'View finally prevails', 'Can delay three months, then one month'],
  ['Ministry', 'Responsible to it', 'Not responsible to it'],
], 'Table comparing the Legislative Assembly and the Legislative Council on members, minimum age, term, money bills, ordinary bills and the ministry', 'The Assembly is the stronger House.');
const vPlan = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'How members of the Council are chosen: three groups with shares'],
  ['(ii)', '3', 'Minimum age, term, size limits'],
  ['(iii)', '4', 'Retirement by thirds; never dissolved; contrast with the Assembly'],
], 'Table planning a ten-mark answer on the Legislative Council: part (i) the choice of members for 3 marks, part (ii) age, term and size for 3 marks, part (iii) why it is permanent and how it differs from the Assembly for 4 marks');
const vSum2 = table(['Topic', 'Key point'], [
  ['Council', 'Not more than one-third of the Assembly, not fewer than forty'],
  ['Members', 'Elected by MLAs, local bodies, graduates, teachers; Governor nominates'],
  ['Term', 'Six years; one-third retire every two years'],
  ['Powers', 'Legislative, financial, executive control, electoral, amendment'],
  ['Balance', 'Assembly is the stronger House'],
], 'Summary table of Part 2: the Council, its members, its term, the powers of the legislature and the balance between the Houses', 'Part 2 in one table.');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The State Legislature — Part 1: One House or Two, and the Legislative Assembly',
  goals: [
    'Explain the meaning of unicameral and bicameral legislatures',
    'Name the States that have a Legislative Council, as of 2024, and say how a Council is created or abolished',
    'Describe the composition and term of the Legislative Assembly and how its members are elected',
    'State the qualifications for membership and name the presiding officers of the Assembly',
  ],
  slides: [
    sl('title', 'The State Legislature: Assembly and Council', {
      b: 'Part 1 — **how many Houses**, and the **Legislative Assembly**.',
      v: vRoute1,
      n: 'Every State in India has a legislature that makes laws for the State. Some have one House and some have two. In this part we see which is which, and then study the Legislative Assembly, the directly elected House: its size, its term, who may become a member, and who presides over it.',
    }),
    sl('diagram', 'Where the State legislature fits', {
      b: 'The legislature is the **lawmaking body** of the State.',
      v: vFit,
      n: 'In each State, the voters elect the Legislative Assembly. The Assembly makes laws and keeps watch over the ministry. When a bill has passed, the Governor gives assent and it becomes a law. In this chapter we are studying this lawmaking body, which in some States has one House and in others has two.',
    }),
    sl('concept', 'Unicameral and bicameral', {
      bl: [
        '**Unicameral:** one House, the Legislative Assembly.',
        '**Bicameral:** two Houses, the Assembly and the Legislative Council.',
        'The Assembly is the **lower House**; the Council is the **upper House**.',
      ],
      v: vUnicam,
      n: 'A unicameral legislature has only one House, the Legislative Assembly, or Vidhan Sabha. A bicameral legislature has two Houses. The second is the Legislative Council, or Vidhan Parishad. The Assembly is called the lower House because it is directly elected and more powerful, and the Council is called the upper House.',
    }),
    sl('diagram', 'Which States have a Council?', {
      b: 'Only **six** States, as of 2024.',
      v: vSix,
      n: 'As of two thousand twenty four, six States have a Legislative Council. They are Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana and Uttar Pradesh. All the other States have only an Assembly. Remember to write as of two thousand twenty four, because a Council can be created or abolished, and the list can change.',
    }),
    sl('check', 'Quick check: one House', {
      b: 'Choose the correct term.',
      chk: 'm_uni_def',
      n: 'Read the question and think about how many Houses are described. Then choose the term for that number.',
    }),
    sl('diagram', 'Creating or abolishing a Council', {
      b: 'A State cannot add or remove a Council on its own.',
      v: vCreate,
      n: 'The decision begins in the State. The Legislative Assembly passes a resolution by a special majority, asking for a Council to be created or abolished. But the State cannot finish the job alone. Parliament must then make a law. The same two steps work in both directions, for creating a Council and for abolishing it.',
    }),
    sl('diagram', 'Is a second House worth having?', {
      b: 'People argue on both sides.',
      v: vForAgainst,
      n: 'Supporters say a Council gives a second look at bills passed in a hurry, and makes room for experienced people who may never contest an election. Critics say a Council costs more to run, can slow down useful laws, and is not chosen directly by all the voters. In exams, give at least one point on each side.',
    }),
    sl('example', 'Worked example 1: sorting imagined States', {
      b: 'Count the Houses, then name the type.',
      bl: [
        'Step 1 — Find out how many Houses the State has now.',
        'Step 2 — One House means unicameral; two means bicameral.',
        'Step 3 — A plan for a Council does not change the answer today.',
        'Step 4 — Write the type with a reason.',
      ],
      v: vSortLeg,
      n: 'Here is a simple method. Count the Houses the State has today. One House means unicameral, and two means bicameral. A plan to create a Council in the future does not change the answer today. So Tamrapur is unicameral, Girivan is bicameral, and Sindhuvan, which only plans a Council, is still unicameral for now.',
    }),
    sl('concept', 'The Legislative Assembly', {
      bl: [
        'Members are **directly elected** from territorial constituencies.',
        'Strength: **not more than 500 and not less than 60**.',
        'A few small States have fewer members by special provision.',
        'Seats are **reserved** for the Scheduled Castes and Scheduled Tribes.',
      ],
      v: vAssembly,
      n: 'The Legislative Assembly, or Vidhan Sabha, is the House that the people elect directly. Each constituency elects one member. The number of members is not more than five hundred and not less than sixty, though a few small States have fewer by special provision. Some seats are reserved for the Scheduled Castes and the Scheduled Tribes.',
    }),
    sl('diagram', 'The term of the Assembly', {
      b: 'The normal term is **five years**.',
      v: vTerm,
      n: 'The Assembly is elected for five years. But the term can change. The Governor can dissolve the Assembly earlier, acting in practice on the advice of the Chief Minister. And during a national emergency, Parliament can extend the term, one year at a time. After dissolution, fresh elections are held to form a new Assembly.',
    }),
    sl('check', 'Quick check: the term', {
      b: 'Fill in the blank.',
      chk: 'fb_term',
      n: 'Remember the length of the normal term of an Assembly. Write the number of years.',
    }),
    sl('diagram', 'Qualifications for membership', {
      b: 'Four basic conditions, in an **elementary** study.',
      v: vQual,
      n: 'To become a member of the Legislative Assembly a person must be a citizen of India, at least twenty five years old, and registered on the electoral roll. The person must also not hold an office of profit under the government. The law lists a few other disqualifications, but these four are the ones to learn.',
    }),
    sl('example', 'Worked example 2: is the candidate eligible?', {
      b: 'Test each candidate against the four conditions.',
      bl: [
        'Step 1 — Check citizenship and the electoral roll.',
        'Step 2 — Check the age: at least twenty-five.',
        'Step 3 — Check whether the person holds a paid government post.',
        'Step 4 — Give the answer with the failed condition.',
      ],
      v: vCands,
      n: 'Test each person against the four conditions. Arvind is thirty one, a citizen and on the roll, with no paid post, so he is eligible. Bhavna is twenty two, below the minimum age. Chitra is forty five, but she is a government clerk, which is an office of profit. So the answer is no for both Bhavna and Chitra, and you must name the condition each fails.',
    }),
    sl('check', 'Quick check: office of profit', {
      b: 'Apply the conditions to an imagined officer.',
      chk: 'm_office_profit',
      n: 'Think about the four conditions. Which one is broken by a person who works as a paid officer of the government?',
    }),
    sl('diagram', 'Presiding officers', {
      b: 'The House elects its own presiding officers.',
      v: vSpeaker,
      n: 'The members of the Assembly elect a Speaker from among themselves. The Speaker presides over the House, keeps order and decides who may speak. The members also elect a Deputy Speaker, who presides when the Speaker is absent. The Speaker is not nominated by the Governor, and this is a common mistake in answers.',
    }),
    sl('check', 'Quick check: restoring order', {
      b: 'Which officer acts when order breaks down?',
      chk: 'm_speaker_scn',
      n: 'Imagine noise in the House. Which officer presides over the Assembly and keeps order?',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        '**Unicameral:** one House; **bicameral:** two Houses; six States have a Council (as of 2024).',
        'A Council is created or abolished by a **law of Parliament** after an Assembly resolution.',
        'Assembly: **directly elected**, **500 at most, 60 at least**, term **five years**.',
        'Member: **citizen, twenty-five, on the roll, no office of profit**; presided by the **Speaker**.',
      ],
      v: vSum1,
      n: 'To sum up. A unicameral legislature has one House and a bicameral one has two. Six States have a Council as of two thousand twenty four. A Council is created or abolished by a law of Parliament after the Assembly asks for it. The Assembly is directly elected, serves five years, and is presided over by the Speaker, whom the members elect.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Write **as of 2024** when you name States with a Council.',
        'Give **both** limits of the Assembly: 500 and 60.',
        'Name **who** can dissolve the Assembly and **who** can extend it.',
        'The Speaker is **elected by the members**, not nominated.',
        'Avoid current office-holders; use the **office**, not the person.',
      ],
      n: 'Some exam habits. Write as of two thousand twenty four when you name the States with a Council. Give both limits on the size of the Assembly. Say who can dissolve the Assembly, and who can extend its term. Remember the Speaker is elected by the members. And speak of the office, not of any person who holds it today.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The State Legislature — Part 2: The Legislative Council and the Powers of the Legislature',
  goals: [
    'Explain how members of the Legislative Council are elected or nominated and why it is a permanent House',
    'State the size, term and qualifications of the Council',
    'Describe the legislative, financial, executive-control, electoral and amendment powers of the State legislature',
    'Compare the powers of the Assembly with those of the Council',
  ],
  slides: [
    sl('title', 'The Council and the powers of the legislature', {
      b: 'Part 2 — the **upper House** and what the legislature **can do**.',
      v: vRoute2,
      n: 'In this part we study the Legislative Council, the upper House that a few States have. We see how its members are chosen, why it is called a permanent House, and what powers the State legislature has. At the end, we compare the two Houses and see why the Assembly is the stronger one.',
    }),
    sl('concept', 'The Legislative Council', {
      bl: [
        'Also called the **Vidhan Parishad**, the upper House.',
        'Strength: **not more than one-third** of the Assembly, and **not fewer than forty**.',
        'Presided over by a **Chairman**, elected by its members.',
      ],
      v: vCouncil,
      n: 'The Legislative Council, or Vidhan Parishad, is the upper House. Its size depends on the Assembly. It may have at most one third of the number of members of the Assembly, but never fewer than forty. The members elect a Chairman from among themselves, who presides over the Council, just as the Speaker presides over the Assembly.',
    }),
    sl('diagram', 'How the Council is chosen', {
      b: 'Five routes, and the shares add up to a whole.',
      v: vComp,
      n: 'The Council has a mixed membership. About one third is elected by the members of the Legislative Assembly. About one third is elected by members of local bodies. One twelfth is elected by graduates and one twelfth by teachers. About one sixth is nominated by the Governor. Together, these shares make up the whole Council.',
    }),
    sl('diagram', 'Who sits in the Council?', {
      b: 'The nominated members bring **special knowledge**.',
      v: vWho,
      n: 'Each route has its own voters. A councillor of a municipality votes in the local bodies share, and a graduate or a teacher votes in the share for graduates or teachers. The Governor nominates people with special knowledge or experience, in fields such as literature, science, art, the cooperative movement and social service.',
    }),
    sl('check', 'Quick check: a share of seats', {
      b: 'Work out the seats from a share.',
      chk: 'm_teacher_share',
      n: 'Divide the total number of seats by twelve to find the seats of one twelfth.',
    }),
    sl('example', 'Worked example 1: dividing a Council', {
      b: 'Turn each share into a number of seats.',
      bl: [
        'Step 1 — Take the total number of members.',
        'Step 2 — One-third is the total divided by three.',
        'Step 3 — One-twelfth is divided by twelve; one-sixth by six.',
        'Step 4 — Add the five numbers to check the total.',
      ],
      v: vShares,
      n: 'Suppose an imagined Council has ninety six members. One third is thirty two, so the MLAs and the local bodies elect thirty two each. One twelfth is eight, so the graduates and the teachers elect eight each. One sixth is sixteen, and these are the nominated members. Add them up and the total is ninety six, which is a useful check.',
    }),
    sl('diagram', 'Age, term and presiding officer', {
      b: 'The Council asks for **more age** and gives **longer terms**.',
      v: vCQual,
      n: 'A member of the Council must be at least thirty years old, five years more than for the Assembly. Each member serves a term of six years. The Council is presided over by a Chairman, while the Assembly has a Speaker. And unlike the Assembly, the Council as a whole is never dissolved, as we shall see on the next slide.',
    }),
    sl('diagram', 'Why is the Council permanent?', {
      b: 'One-third retire **every two years**.',
      v: vRotation,
      n: 'A member serves six years. But the terms are staggered. Every second year, one third of the members retire and one third are newly chosen. So at any time two thirds of the members are experienced, and the Council is never empty. This is why it is called a permanent House. The Governor cannot dissolve the Council as he can the Assembly.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Does dissolving the Assembly dissolve the Council?',
      chk: 'tf_council_dissolve',
      n: 'Think about what makes the Council permanent. Then decide if dissolving the Assembly affects it.',
    }),
    sl('concept', 'Five kinds of power', {
      bl: [
        '**Legislative:** laws on State List and Concurrent List subjects.',
        '**Financial:** the budget and money bills.',
        '**Control over the executive:** questions, motions, no confidence.',
        '**Electoral** and **constitutional** functions.',
      ],
      v: vPowers,
      n: 'The State legislature has five kinds of power. It makes laws on the subjects in the State List and the Concurrent List. It controls the money of the State. It keeps a check on the ministry. It takes part in some elections. And it ratifies certain amendments to the Constitution. We take them one by one.',
    }),
    sl('diagram', 'Legislative power: an ordinary bill', {
      b: 'The Council can **delay**, not **defeat**.',
      v: vBillFlow,
      n: 'Suppose the Assembly passes an ordinary bill, but the Council does not agree. The Council can hold the bill for up to three months the first time. If the Assembly passes it again and the Council again opposes it or takes no action for one month, the bill is treated as passed. So the Assembly has the last word.',
    }),
    sl('example', 'Worked example 2: tracing a bill', {
      b: 'Follow the bill step by step.',
      bl: [
        'Step 1 — Which House passed it first, and is it a money bill?',
        'Step 2 — If ordinary, the Council can delay it.',
        'Step 3 — Look for the second passage by the Assembly.',
        'Step 4 — After the second opposition, the Assembly wins.',
      ],
      v: vTrace,
      n: 'Trace an imagined bill from Dhavalpur. The Assembly passes a bill on weekly markets. The Council rejects it. The Assembly passes the bill again, and the Council rejects it a second time. At this point the bill is treated as passed by both Houses, as the Assembly passed it, and it goes to the Governor for assent.',
    }),
    sl('diagram', 'Financial power: money bills', {
      b: 'Only the Assembly can **start** a money bill.',
      v: vMoney,
      n: 'Money matters belong mainly to the Assembly. A money bill can begin only in the Assembly, and the Assembly alone votes on the demands for grants in the budget. The Council may hold a money bill for fourteen days and recommend changes. The Assembly may accept or reject them, and the bill then passes.',
    }),
    sl('check', 'Quick check: a delayed money bill', {
      b: 'What happens after the fourteen days?',
      chk: 'm_scn_money',
      n: 'Remember how long the Council may hold a money bill. What happens when that period ends?',
    }),
    sl('diagram', 'Control over the executive', {
      b: 'The ministry answers to the **Assembly**.',
      v: vControl,
      n: 'Members of both Houses may put questions to ministers and take part in debates and motions. But the Council of Ministers is collectively responsible only to the Assembly. So only the Assembly can pass a no confidence motion, and if it does, the ministry must resign. The Council can question and criticise, but it cannot remove the government.',
    }),
    sl('diagram', 'Electoral and constitutional functions', {
      b: 'MLAs act in elections **beyond the State**.',
      v: vElect,
      n: 'The elected members of the Assembly take part in electing the President of India, and they elect the Rajya Sabha members of their State. In a bicameral State, MLAs also elect one third of the Council. And when Parliament passes certain amendments that affect the federal structure, at least half of the State legislatures must ratify them.',
    }),
    sl('check', 'Quick check: the President\'s election', {
      b: 'Who votes in the President\'s election?',
      chk: 'm_electoral',
      n: 'Recall which members of the State legislature take part in electing the President.',
    }),
    sl('diagram', 'The two Houses compared', {
      b: 'The Assembly is clearly the **stronger** House.',
      v: vCompare,
      n: 'Here are the two Houses side by side. The Assembly is directly elected, serves five years and can be dissolved. The Council is indirectly elected, has members aged at least thirty, and is permanent. On money bills the Council can only hold the bill for fourteen days. On ordinary bills it can only delay. And the ministry answers only to the Assembly.',
    }),
    sl('example', 'Worked example 3: planning a 10-mark answer', {
      b: 'Question: (i) How are Council members chosen? [3] (ii) Age, term and size [3] (iii) Why is the Council permanent, and how does it differ from the Assembly? [4]',
      bl: [
        '(i) Three groups, each with its share.',
        '(ii) Thirty years; six years; one-third of the Assembly, not below forty.',
        '(iii) Retirement by thirds + never dissolved + contrast.',
        'Aim for one point per mark.',
      ],
      v: vPlan,
      n: 'To plan a ten mark answer in three parts, give three points to the first part, three to the second, and four to the last. Part one names the groups that choose the members, with their shares. Part two gives the age, the term and the size limits. Part three explains retirement by thirds and compares the Council with the Assembly.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Council: **at most one-third of the Assembly, at least forty** members; Chairman presides.',
        'Chosen by **MLAs, local bodies, graduates, teachers**; Governor **nominates** about one-sixth.',
        'Member: **30 years**, term **six years**; **one-third retire every two years**.',
        'Powers: **legislative, financial, executive control, electoral, amendment**; the **Assembly is stronger**.',
      ],
      v: vSum2,
      n: 'To sum up. The Legislative Council has at most one third of the Assembly and at least forty members. Its members are elected by MLAs, local bodies, graduates and teachers, and some are nominated by the Governor. It is permanent because a third of its members retire every two years. The legislature has five kinds of power, and in all of them the Assembly is the stronger House.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Give each **share** with its group, and check that they add up to a whole.',
        'Say the Council can only **delay** an ordinary bill: three months, then one month.',
        'Say a money bill starts **only in the Assembly** and the Council holds it **fourteen days**.',
        'Write that the ministry is responsible **to the Assembly**.',
        'In a comparison, give **both sides** of each point.',
      ],
      n: 'Some exam habits. Give each share with its group, and make sure the shares add up. Say clearly that the Council can only delay an ordinary bill. Say that a money bill starts only in the Assembly. Remember that the ministry answers to the Assembly. And in a comparison, give both sides of every point, in a table if you can.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The State Legislature — notes',
  sections: [
    {
      h: '1. Unicameral and bicameral legislatures',
      t: 1,
      b: '- Every State has a **legislature**. In most States it is **unicameral** (the Legislative Assembly alone); in a few it is **bicameral** (the Assembly plus the Legislative Council).\n- The Assembly (**Vidhan Sabha**) is the **lower House**; the Council (**Vidhan Parishad**) is the **upper House**.\n- **As of 2024** the six bicameral States are Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana and Uttar Pradesh.\n- A Council is **created or abolished** by a **law of Parliament** after the State Assembly passes a **resolution by a special majority**.\n- **For** a Council: a second look at bills; room for experienced persons. **Against**: extra cost; possible delay.',
      terms: [['Unicameral', 'A legislature with one House.'], ['Bicameral', 'A legislature with two Houses.'], ['Special majority', 'A larger-than-usual majority needed for certain decisions, such as the resolution on a Council.']],
      v: vUnicam,
      vs: [vSix, vCreate],
    },
    {
      h: '2. The Legislative Assembly: composition and term',
      t: 2,
      b: '- Members are **directly elected** by the voters from **territorial constituencies**, one from each.\n- **Strength:** not more than **500** and not less than **60**; a few small States have fewer by special provision.\n- **Reserved seats** for the Scheduled Castes and Scheduled Tribes.\n- **Term:** five years from the first meeting. An early end is possible: the **Governor** may dissolve it, usually advised by the **Chief Minister**. A longer life is possible only in a **national emergency**, when **Parliament** extends it **one year at a time**.\n- The Assembly is the **lower House** and the more powerful House.',
      terms: [['Constituency', 'An area whose voters elect one member of the Assembly.'], ['Dissolution', 'Ending the life of the Assembly before its term is over, so that fresh elections can be held.']],
      v: vAssembly,
      vs: [vTerm],
    },
    {
      h: '3. Qualifications and the presiding officers of the Assembly',
      t: 2,
      b: '- A member must be a **citizen of India**, **at least 25 years old**, **registered on the electoral roll**, and must **not hold an office of profit** under the government. The law lists a few other disqualifications.\n- The **Speaker** is **elected by the members** from among themselves, presides over the House, keeps order and decides who speaks. A **Deputy Speaker** is also elected and presides when the Speaker is absent.\n- Eligibility questions: check the **age**, the **citizenship**, the **roll** and any **paid government post**; name the condition that fails.',
      terms: [['Office of profit', 'A paid post under the government that would conflict with duties as a member.'], ['Speaker', 'The officer who presides over the Legislative Assembly.']],
      v: vQual,
      vs: [vCands, vSpeaker],
    },
    {
      h: '4. The Legislative Council: composition',
      t: 3,
      b: '- **Strength:** not more than **one-third** of the Assembly and **not fewer than 40**.\n- **How chosen:** about **one-third** by the **MLAs**; about **one-third** by **local bodies**; **one-twelfth** by **graduates**; **one-twelfth** by **teachers**; about **one-sixth** **nominated by the Governor**.\n- The nominated members are persons with special knowledge or practical experience in **literature, science, art, the cooperative movement and social service**.\n- Shares add up: 4/12 + 4/12 + 1/12 + 1/12 + 2/12 = 12/12.\n- The **Chairman**, elected by the members, presides.',
      terms: [['Local bodies', 'Elected councils of towns and districts, such as municipalities.'], ['Nominated member', 'A member appointed by the Governor, not elected.']],
      v: vComp,
      vs: [vWho, vShares],
    },
    {
      h: '5. The Legislative Council: term, age and permanence',
      t: 3,
      b: '- A member must be a **citizen** and at least **30 years old**.\n- Each member serves **six years**; **one-third retire every two years** and are replaced.\n- The Council is a **permanent House**: it is **never dissolved** as a whole, even when the Assembly is dissolved.\n- Contrast: the **Assembly** has a **five-year term** and a minimum age of **25**, and can be dissolved.',
      terms: [['Permanent House', 'A House that is never dissolved as a whole, because a part of its members retire at regular intervals.']],
      v: vRotation,
      vs: [vCQual],
    },
    {
      h: '6. Powers and functions, and the two Houses compared',
      t: 4,
      b: '- **Legislative:** laws on the **State List** and the **Concurrent List**; a bill becomes law with the **Governor\'s assent**. The Council can **delay** an ordinary bill for **three months** the first time and **one month** the second time; then the **Assembly\'s view prevails**.\n- **Financial:** a **money bill** starts **only in the Assembly**; the Council can **hold it for fourteen days** and make recommendations.\n- **Control over the executive:** **questions**, **motions**, debates; the **Council of Ministers is responsible to the Assembly**, and only the Assembly can pass a **no-confidence motion**.\n- **Electoral:** elected MLAs vote in the election of the **President** and elect the State\'s **Rajya Sabha** members; MLAs also elect one-third of the Council.\n- **Constitutional:** **ratification** of certain amendments by at least half of the States.\n- The **Assembly is clearly the more powerful House**.',
      terms: [['Money bill', 'A bill dealing with taxes, spending and other money matters of the State.'], ['No-confidence motion', 'A motion by which the Assembly can withdraw its support from the ministry.'], ['Ratification', 'Approval by a State legislature of an amendment already passed by Parliament.']],
      v: vPowers,
      vs: [vBillFlow, vMoney, vControl, vElect, vCompare],
    },
  ],
  tips: '**Common mistakes**\n- Writing that the Speaker or the members of the Assembly are nominated by the Governor.\n- Saying the Council can defeat an ordinary bill for good, or that it can bring down a ministry.\n- Forgetting **as of 2024** when naming the six bicameral States.\n- Giving only one limit (500) on the size of the Assembly, or mixing the Assembly\'s minimum age (25) with the Council\'s (30).\n- Mixing up the shares: one-third, one-third, one-twelfth, one-twelfth, one-sixth.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, term or number.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a contrast or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Unicameral legislature', 'A legislature with **one House**: the Legislative Assembly.', 'definition', 1],
  ['Bicameral legislature', 'A legislature with **two Houses**: Assembly and Council.', 'definition', 1],
  ['Lower House and upper House of a State', 'Lower: Legislative Assembly. Upper: Legislative Council.', 'concept', 1],
  ['States with a Legislative Council (as of 2024)', 'Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana, Uttar Pradesh: **six** States.', 'fact', 1],
  ['How is a Council created or abolished?', 'Assembly resolution by a **special majority**, then a **law of Parliament**.', 'fact', 1],
  ['One argument for a Council', 'A **second look** at bills passed in haste; room for experienced persons.', 'concept', 1],
  ['One argument against a Council', 'It adds **cost** and can **delay** lawmaking.', 'concept', 1],
  ['How are Assembly members elected?', '**Directly**, by voters of territorial constituencies.', 'fact', 2],
  ['Strength of an Assembly', 'Not more than **500**, not less than **60** (a few small States have fewer).', 'fact', 2],
  ['Term of an Assembly', '**Five years**.', 'fact', 2],
  ['Who can dissolve the Assembly early?', 'The **Governor**, usually on the Chief Minister\'s advice.', 'fact', 2],
  ['Who can extend the Assembly\'s term, and when?', '**Parliament**, one year at a time, during a **national emergency**.', 'fact', 2],
  ['Minimum age of an Assembly member', '**25 years**.', 'fact', 2],
  ['Qualifications of an Assembly member', 'Citizen; 25 years; on the electoral roll; **no office of profit**.', 'concept', 2],
  ['Office of profit', 'A paid post under the government; holding it bars a person from membership.', 'definition', 2],
  ['Who presides over the Assembly?', 'The **Speaker**, elected by the members from among themselves.', 'fact', 2],
  ['Who presides when the Speaker is absent?', 'The **Deputy Speaker**.', 'fact', 2],
  ['Strength of a Council', 'Not more than **one-third** of the Assembly; not fewer than **40**.', 'fact', 3],
  ['Who presides over the Council?', 'The **Chairman**, elected by its members.', 'fact', 3],
  ['Share of Council members elected by MLAs', 'About **one-third**.', 'fact', 3],
  ['Share elected by local bodies', 'About **one-third**.', 'fact', 3],
  ['Share elected by graduates and by teachers', '**One-twelfth** each.', 'fact', 3],
  ['Share nominated by the Governor', 'About **one-sixth**, for special knowledge.', 'fact', 3],
  ['Minimum age and term of a Council member', '**30 years**; **six years**.', 'fact', 3],
  ['Why is the Council a permanent House?', '**One-third** of its members retire every **two years**; it is never dissolved.', 'concept', 3],
  ['How long can the Council delay an ordinary bill?', '**Three months** the first time, **one month** the second time; then the Assembly prevails.', 'fact', 4],
  ['Where can a money bill begin?', '**Only in the Assembly**.', 'fact', 4],
  ['How long can the Council hold a money bill?', '**Fourteen days**.', 'fact', 4],
  ['To which House is the ministry responsible?', 'The **Legislative Assembly**; only it can pass a no-confidence motion.', 'concept', 4],
  ['Electoral functions of MLAs', 'Elect the **President** (with Parliament\'s members) and the State\'s **Rajya Sabha** members; elect one-third of the Council.', 'fact', 4],
  ['Which House is more powerful?', 'The **Legislative Assembly**.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The State Legislature',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_council_states', 'm_age_assembly', 'm_permanent', 'm_money_bill', 'ar_money', 's_assembly_term_dissolve', 's3_council_comp'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_assembly', 'l_compare'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The State Legislature',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_council_create', 'm_assembly_strength', 'm_dissolve', 'm_nominated', 'm_council_size', 'm_no_confidence', 'm_scn_bill', 'ar_nocon', 's_uni_bi', 's_council_perm', 's_money_role', 's3_assembly_qual', 's3_financial'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_council', 'l_powers', 'l_abolish'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-9-history-civics-ch04 only (unicameral and bicameral legislatures; the Legislative Assembly: composition, term and qualifications; the Legislative Council: composition, term and qualifications; powers and functions and the comparison of the two Houses); elementary study, no Article quoted',
    originality: 'every State, constituency, candidate, newspaper, letter and school note is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no person quoted; no Article quoted; no current office-holder or current political position',
    data: 'Council shares asserted to sum to twelve twelfths; Council term divided by the two-year interval asserted to be three; the 96-member worked example and the size items computed from the one-third and one-twelfth rules',
    facts: 'six States with a Legislative Council as of 2024 (Andhra Pradesh, Bihar, Karnataka, Maharashtra, Telangana, Uttar Pradesh); Assembly at most 500 and at least 60, term five years, minimum age 25; Council at most one-third of the Assembly and at least 40, term six years, minimum age 30, one-third retire every two years; Council composition 1/3, 1/3, 1/12, 1/12, 1/6; ordinary-bill delay three months then one month; money bill held fourteen days',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
