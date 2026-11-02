// Build ICSE 9 History & Civics ch03 Elections and the Election Commission. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch03', 'social-science');
const { directIndirectFigure, commissionFigure, ecTimelineFigure, typesFigure, EC_TIMELINE } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Elections and voters', 'Direct and indirect elections', 'The Election Commission', 'Its independence'], 'Route map of Part 1: the meaning of elections, direct and indirect elections, the Election Commission and how its independence is protected', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Functions of the Commission', 'The Model Code of Conduct', 'General election and mid-term election', 'By-election'], 'Route map of Part 2: the functions of the Election Commission, the Model Code of Conduct, general and mid-term elections, and by-elections', 'Part 2 at a glance');
const vMeaning = flow('LR', ['Voters', 'Cast votes', 'Representatives chosen', 'Government formed and made answerable'], 'Flow: voters cast votes, representatives are chosen, and a government is formed that remains answerable to the voters', 'What an election does.');
const vWhy = table(['Need', 'How elections meet it'], [
  ['People cannot all govern', 'They choose representatives to decide for them'],
  ['Leaders must stay answerable', 'They must face the voters again after a fixed term'],
  ['Change without violence', 'A government that fails can be voted out'],
  ['Equal voice', 'One adult, one vote, whatever caste, wealth or gender'],
], 'Table of four needs and how elections meet them: choosing representatives, keeping leaders answerable, peaceful change of government, and an equal voice for every adult');
const vDI = directIndirectFigure('Two boxes. Direct election: voters choose the member themselves, as for the Lok Sabha, the Legislative Assembly and the panchayat. Indirect election: voters or members choose electors, who choose the member, as for the President, the Vice-President and the Rajya Sabha members of a State chosen by MLAs', 'Direct and indirect elections.');
const vWho = table(['Office or body', 'Method', 'Chosen by'], [
  ['Lok Sabha', 'Direct', 'Voters of each constituency'],
  ['Legislative Assembly', 'Direct', 'Voters of each constituency'],
  ['Panchayat member', 'Direct', 'Voters of a ward'],
  ['Rajya Sabha (State seats)', 'Indirect', 'Elected MLAs of the State'],
  ['President and Vice-President', 'Indirect', 'Electors (an electoral college)'],
], 'Table of five offices or bodies, the method of election of each, and who chooses: Lok Sabha, Legislative Assembly and panchayat directly by voters; Rajya Sabha State seats by MLAs; President and Vice-President by electors');
const vSortDI = table(['Imagined case', 'Direct or indirect?', 'Reason'], [
  ['Ward voters of Kesarwadi mark ballots for a panchayat member', 'Direct', 'Voters choose the member themselves'],
  ['Ward councillors of Ambarpet choose a board chairperson', 'Indirect', 'Elected councillors act as electors'],
  ['Lohitgarh MLAs vote to send a member to the Rajya Sabha', 'Indirect', 'MLAs, not voters at large, choose'],
], 'Table sorting three imagined cases: ward voters choosing a panchayat member is direct, councillors choosing a chairperson is indirect, and MLAs sending a member to the Rajya Sabha is indirect');
const vEC = table(['Point', 'Fact'], [
  ['Set up under', 'Article 324 of the Constitution'],
  ['Date', '25 January 1950, now National Voters\' Day'],
  ['Type of body', 'Independent constitutional body'],
  ['Job', 'To superintend, direct and control elections'],
], 'Table of facts about the Election Commission: set up under Article 324 on 25 January 1950, observed as National Voters\' Day, an independent constitutional body whose job is to superintend, direct and control elections');
const vComp = commissionFigure('Diagram: the President appoints the Election Commission, which has a Chief Election Commissioner and two Election Commissioners since 1993; the term is six years or until age 65, whichever is earlier', 'Composition of the Commission.');
const vAppoint = table(['Question', 'Answer'], [
  ['Who appoints?', 'The President'],
  ['How many members?', 'The CEC and such other Election Commissioners as the President fixes; three since 1993'],
  ['Term of office', 'Six years or until age 65, whichever is earlier'],
  ['As of 2024', 'A 2023 Act provides a selection committee: the Prime Minister, a Union Cabinet Minister nominated by the Prime Minister, and the Leader of the Opposition in the Lok Sabha (or leader of the largest opposition party)'],
], 'Table on appointment: the President appoints; the Commission has a CEC and Election Commissioners, three members since 1993; term of six years or age 65; as of 2024 a selection committee under a 2023 Act recommends names');
const vTimeline = ecTimelineFigure(EC_TIMELINE, 'Timeline not to scale of four dated steps for the Election Commission: set up on 25 January 1950; briefly a multi-member body in 1989 to 1990; the CEC and two Election Commissioners from 1993; and the Act of 2023 on a selection committee, as of 2024', 'Four dated steps (schematic, not to scale).');
const vSafe = flow('LR', ['CEC removable only like a Supreme Court Judge', 'Service conditions not made worse after appointment', 'Other Commissioners removed only on the CEC\'s recommendation'], 'Flow of three safeguards for independence: the CEC can be removed only like a Supreme Court Judge, service conditions cannot be made worse after appointment, and other Commissioners can be removed only on the CEC\'s recommendation', 'Three safeguards of independence.');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Article 324 and the date 25 January 1950'],
  ['(ii)', '3', 'Composition, appointment by the President, term'],
  ['(iii)', '4', 'Removal like a Judge; service conditions; other Commissioners'],
], 'Table planning a ten-mark answer on the Election Commission: part (i) Article and date for 3 marks, part (ii) composition and term for 3 marks, part (iii) safeguards for 4 marks');

const vFn = table(['Group', 'Functions of the Election Commission'], [
  ['Voters', 'Prepare and revise electoral rolls; issue EPIC photo identity cards'],
  ['Parties and candidates', 'Recognise parties; allot symbols; supervise nominations and their scrutiny'],
  ['Polls', 'Fix the schedule; conduct polling with voting machines and paper trail; appoint observers'],
  ['Conduct', 'Enforce the Model Code of Conduct; see that counting and results are in order'],
], 'Table of functions of the Election Commission in four groups: voters, parties and candidates, polls, and conduct');
const vRoll = flow('LR', ['Citizen turns eighteen', 'Name entered on the electoral roll', 'EPIC card issued', 'Votes on polling day'], 'Flow: a citizen turns eighteen, the name is entered on the electoral roll, an EPIC card is issued, and the citizen votes on polling day', 'From eighteen to voting.');
const vRollEx = table(['Step', 'What Vimal of imagined Harshpura does'], [
  ['1', 'Finds his name missing from the electoral roll'],
  ['2', 'Applies to the electoral authorities to be added'],
  ['3', 'Gets his name entered and his EPIC card'],
  ['4', 'Votes on polling day with his name on the roll'],
], 'Table of four steps taken by an imagined voter, Vimal, whose name is missing from the roll: he finds the gap, applies to be added, gets his name and card, and votes');
const vSym = flow('LR', ['Party applies for recognition', 'Commission recognises it as national or State party', 'Symbol allotted for ballot and machine'], 'Flow: a party applies for recognition, the Commission recognises it as a national or State party, and a symbol is allotted for the ballot and the machine', 'Recognition and symbols.');
const vPoll = flow('LR', ['Schedule announced', 'Nominations filed', 'Nominations scrutinised', 'Polling day', 'Counting and results'], 'Flow of five steps of an election: the schedule is announced, nominations are filed, nominations are scrutinised, polling takes place, and counting and results follow', 'Steps of an election.');
const vWho2 = table(['Task', 'Done by'], [
  ['Prepare rolls, conduct elections to Parliament and State Legislatures', 'Election Commission of India'],
  ['Redraw constituency boundaries', 'A separate Delimitation Commission'],
  ['Conduct panchayat and municipal elections', 'State Election Commissions'],
  ['Make laws', 'Parliament and State Legislatures'],
], 'Table of who does what: the Election Commission of India prepares rolls and conducts elections to Parliament and State Legislatures; a Delimitation Commission redraws boundaries; State Election Commissions conduct panchayat and municipal polls; Parliament and State Legislatures make laws');
const vMCC = flow('LR', ['Schedule announced', 'Model Code of Conduct in force', 'Results declared', 'Code ends'], 'Flow: the schedule is announced, the Model Code of Conduct comes into force, results are declared, and the Code ends', 'When the Code applies.');
const vDo = table(['Expected of parties and candidates', 'Why'], [
  ['Do not misuse official vehicles, staff or premises', 'No unfair advantage to the party in power'],
  ['Do not make fresh grants or announcements to sway voters', 'Voters should decide freely'],
  ['Do not stir hatred or insult any community', 'Peaceful, respectful campaigns'],
  ['Campaign within the rules and the schedule', 'A level field for all'],
], 'Table of what the Model Code of Conduct expects: no misuse of official machinery, no fresh announcements to sway voters, no hatred, and campaigning within the rules, with the reason for each');
const vMccEx = table(['Imagined act after the schedule', 'Breaks the Code?', 'Why'], [
  ['A party holds a peaceful rally in Ketavar', 'No', 'Fair campaigning is allowed'],
  ['The government announces a new scheme for one district', 'Yes', 'A fresh announcement may sway voters'],
  ['A candidate holds a meeting in a government office', 'Yes', 'Misuse of official premises'],
], 'Table sorting three imagined acts after the schedule: a peaceful rally does not break the Code, a new scheme announced for one district does, and a meeting in a government office does');
const vTypes = typesFigure('Three boxes. General election: all seats of the House after the full term, usually every five years for the Lok Sabha. Mid-term election: held before the term ends after early dissolution, all seats again. By-election: only one seat that falls vacant by death, resignation or disqualification, generally held within six months', 'General, mid-term and by-election.');
const vMid = table(['Question', 'Answer'], [
  ['When?', 'Before the term of the House ends'],
  ['Why?', 'The House is dissolved early, for instance when no stable government can be formed'],
  ['Which seats?', 'All the seats of the House'],
  ['What follows?', 'A new House with a fresh full term'],
], 'Table on mid-term elections: held before the term ends; because the House is dissolved early; for all seats; and a new House gets a fresh full term');
const vBye = flow('LR', ['Seat falls vacant: death, resignation or disqualification', 'Commission announces a poll for that constituency', 'Generally within six months', 'Only that constituency votes'], 'Flow for a by-election: a seat falls vacant through death, resignation or disqualification, the Commission announces a poll for that constituency, generally within six months, and only that constituency votes', 'How a by-election arises.');
const vClassEl = table(['Imagined situation', 'Type of election'], [
  ['All seats filled after the five-year term of an Assembly in Neelavan', 'General election'],
  ['Assembly of Urvanta dissolved early; all seats contested again', 'Mid-term election'],
  ['Member from Sundarvel dies; one seat is vacant', 'By-election'],
], 'Table sorting three imagined situations: all seats after the full term is a general election, early dissolution with all seats contested again is a mid-term election, and one vacant seat after a death is a by-election');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'General election: all seats, after the full term'],
  ['(ii)', '3', 'Mid-term election: early dissolution, all seats'],
  ['(iii)', '4', 'By-election: one seat, causes, within six months'],
], 'Table planning a ten-mark answer on types of elections: part (i) general election for 3 marks, part (ii) mid-term election for 3 marks, part (iii) by-election with causes and time for 4 marks');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Elections and the Election Commission — Part 1: Elections, and the Election Commission',
  goals: [
    'Explain what an election is and why it is essential in a representative democracy',
    'Distinguish direct from indirect election with Indian examples',
    'Describe the composition, appointment and term of the Election Commission',
    'Explain how the independence of the Election Commission is protected',
  ],
  slides: [
    sl('title', 'Elections and the Election Commission', {
      b: 'Part 1 — how **voters choose**, and who makes sure the choice is **fair**.',
      v: vRoute1,
      n: 'In a democracy the people choose those who govern them. They do this through elections. But somebody must make sure that elections are fair. In this part we learn what an election is, how direct and indirect elections differ, and how the Election Commission is formed and protected.',
    }),
    sl('concept', 'What is an election?', {
      bl: [
        'A process in which **voters choose** representatives by voting.',
        'Held at regular intervals, for a fixed term of office.',
        'Voters can **choose again** or **change** their representatives.',
      ],
      v: vMeaning,
      n: 'An election is the method by which voters choose their representatives. It is held at regular intervals, and each representative serves for a fixed term. When the term ends, the voters get a fresh chance to keep their representatives or to choose different ones.',
    }),
    sl('diagram', 'Why elections are essential', {
      b: 'In a representative democracy the people rule **through** their representatives.',
      v: vWhy,
      n: 'In a large country the people cannot all sit together and decide every matter. So they choose representatives. Elections make leaders answerable, because they must face the voters again. They allow a government to change peacefully. And they give every adult an equal voice, with one vote each.',
    }),
    sl('diagram', 'Direct and indirect elections', {
      b: 'In a **direct** election voters choose the member; in an **indirect** one, **electors** do.',
      v: vDI,
      n: 'In a direct election, the voters themselves choose the member. The Lok Sabha, the Legislative Assemblies and the panchayats are chosen this way. In an indirect election, voters or members first choose electors, and the electors choose the office holder. The President, the Vice President and the Rajya Sabha members from a State are chosen this way.',
    }),
    sl('check', 'Quick check: why elections matter', {
      b: 'Which feature is missing where rulers are never chosen by the people?',
      chk: 'm_why_rep',
      n: 'Think about what elections give to the people in a representative democracy. Then choose the option that names what is missing in the imagined country of Ardanya.',
    }),
    sl('diagram', 'Who is elected how', {
      v: vWho,
      n: 'Here is a table to remember. Lok Sabha members and members of the Legislative Assemblies are directly elected by the voters of each constituency. Panchayat members are directly elected by ward voters. Rajya Sabha members from a State are elected by the elected members of the Assembly of that State. The President and the Vice President are chosen by electors.',
    }),
    sl('example', 'Worked example 1: direct or indirect?', {
      b: 'Ask who makes the final choice: the voters or electors.',
      bl: [
        'Step 1 — Find who casts the vote that decides the winner.',
        'Step 2 — If it is the voters themselves, the election is **direct**.',
        'Step 3 — If elected members or electors decide, it is **indirect**.',
        'Step 4 — Write the reason in one line.',
      ],
      v: vSortDI,
      n: 'Use a simple test. Ask who casts the vote that decides the winner. If the voters themselves do, the election is direct. If elected members or electors decide, it is indirect. Ward voters choosing a panchayat member is direct. Councillors choosing a chairperson is indirect. Assembly members choosing a Rajya Sabha member is also indirect.',
    }),
    sl('check', 'Quick check: match the methods', {
      b: 'Match each office or body with its method of election.',
      chk: 'mt_direct_indirect',
      n: 'Use the table you have just seen. Match the Lok Sabha, the President, the Rajya Sabha and the panchayat with their methods.',
    }),
    sl('diagram', 'The Election Commission of India', {
      b: 'Elections need a fair **umpire**.',
      v: vEC,
      n: 'The Election Commission is an independent body created by the Constitution. It was set up under Article three twenty four, on the twenty fifth of January nineteen fifty. This date is now observed as National Voters Day. Its job is to superintend, direct and control elections.',
    }),
    sl('concept', 'Composition of the Commission', {
      bl: [
        'A **Chief Election Commissioner** (CEC) and such other **Election Commissioners** as the President fixes.',
        'Since **1993**: the CEC and **two** Election Commissioners.',
        'Appointed by the **President**; term **six years or age 65**, whichever is earlier.',
      ],
      v: vComp,
      n: 'The Commission has a Chief Election Commissioner and as many other Election Commissioners as the President may fix. Since nineteen ninety three it has had three members, the Chief and two Commissioners. They are appointed by the President. The Chief serves for six years, or until sixty five years of age, whichever comes first.',
    }),
    sl('diagram', 'Appointment: the dated note', {
      b: 'Appointment rules can change; always note the **year**.',
      v: vAppoint,
      n: 'The President appoints the members. As of twenty twenty four, a law of twenty twenty three provides that the President acts on the recommendation of a selection committee. The committee has the Prime Minister, a Union Cabinet Minister chosen by the Prime Minister, and the Leader of the Opposition in the Lok Sabha. Remember to write the year when you give this point.',
    }),
    sl('diagram', 'The Commission over time', {
      v: vTimeline,
      n: 'Here are four dated steps. The Commission began in nineteen fifty with one member. For a short time in nineteen eighty nine and ninety, it had several members. From nineteen ninety three, it has had three members. In twenty twenty three, a law set up a selection committee for appointments. This was the position as of twenty twenty four.',
    }),
    sl('check', 'Quick check: removing a Commissioner', {
      b: 'How may an Election Commissioner other than the CEC be removed?',
      chk: 'm_ec_removal',
      n: 'Think about who can recommend such a removal. It is not the government alone.',
    }),
    sl('concept', 'Keeping the Commission independent', {
      bl: [
        'The **CEC** can be removed only like a **Judge of the Supreme Court**.',
        'Service conditions cannot be made **worse** after appointment.',
        'Other Commissioners are removed only on the **CEC\'s recommendation**.',
      ],
      v: vSafe,
      n: 'The ruling party also contests elections, so the Commission must not be under its control. The Chief Election Commissioner can be removed only in the way a Supreme Court Judge is removed. Service conditions cannot be changed to the disadvantage of the Chief after appointment. Other Commissioners can be removed only if the Chief recommends it.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) Article and date. [3] (ii) Composition, appointment and term. [3] (iii) How is independence protected? [4]',
      bl: [
        '(i) Article 324 + 25 January 1950 + National Voters\' Day.',
        '(ii) CEC and Commissioners + President appoints + six years or age 65.',
        '(iii) Removal like a Judge + service conditions + other Commissioners.',
        'One clear point for each mark.',
      ],
      v: vPlan1,
      n: 'Plan a ten mark answer in three parts. Part one gives the Article and the date. Part two gives the composition, the appointing authority and the term. Part three gives the three safeguards of independence. Write one clear point for each mark, and add the year when you mention any appointment rule.',
    }),
    sl('check', 'Quick check: order the history', {
      b: 'Arrange the developments in the order in which they happened.',
      chk: 'ord_ec',
      n: 'Use the timeline you have just seen. Start with the year in which the Commission was set up.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        '**Election:** voters choose representatives; **direct** (Lok Sabha, Assemblies, panchayats) or **indirect** (President, Vice-President, Rajya Sabha).',
        '**Commission:** Article **324**, **25 January 1950**; CEC and two Commissioners since **1993**.',
        'Appointed by the **President**; term **six years or age 65**.',
        '**Independence:** difficult removal, protected service conditions.',
      ],
      v: vDI,
      n: 'To sum up. An election lets voters choose representatives, directly or indirectly. The Election Commission was set up under Article three twenty four in nineteen fifty. It has a Chief and two Commissioners, appointed by the President. Its independence rests on difficult removal and protected service conditions.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Define an election in one line, then give its **need**.',
        'For direct and indirect, give **one example** of each and say who the **voters or electors** are.',
        'Write **Article 324** and **25 January 1950** together.',
        'Add "as of 2024" when you mention the 2023 selection committee.',
        'Do not quote Articles; give their meaning in your own words.',
      ],
      n: 'Some exam habits. Define an election in one line, then give its need. For direct and indirect elections, give an example of each and say who the voters or electors are. Link the Article and the date together. When you mention the selection committee, say that it is the position as of twenty twenty four. Paraphrase the Articles.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Elections and the Election Commission — Part 2: Functions, the Model Code, and Kinds of Elections',
  goals: [
    'List the functions of the Election Commission',
    'Explain the meaning and purpose of the Model Code of Conduct',
    'Distinguish a general election, a mid-term election and a by-election',
    'State when a mid-term election or a by-election is held',
  ],
  slides: [
    sl('title', 'What the Commission does, and kinds of elections', {
      b: 'Part 2 — the **work** of the Commission, the **Code of Conduct**, and **three kinds** of elections.',
      v: vRoute2,
      n: 'In this part we see what the Election Commission actually does, from preparing the voter lists to conducting the poll. We study the Model Code of Conduct. And we learn the difference between a general election, a mid-term election and a by-election.',
    }),
    sl('diagram', 'Functions of the Commission', {
      v: vFn,
      n: 'The functions fall into four groups. For voters, the Commission prepares and revises the electoral rolls and issues photo identity cards. For parties and candidates, it recognises parties, allots symbols and supervises nominations. For the polls, it fixes the schedule, conducts voting, and appoints observers. And it enforces the Model Code of Conduct.',
    }),
    sl('concept', 'Electoral rolls and the EPIC', {
      bl: [
        'The **electoral roll** is the list of eligible voters of a constituency.',
        'The Commission **prepares** and **revises** it.',
        'The **EPIC** is the photo identity card issued to registered voters.',
      ],
      v: vRoll,
      n: 'The electoral roll is the list of voters in a constituency. The Commission prepares it and revises it from time to time, so that new voters are added. A citizen who has turned eighteen applies to be entered on the roll. The Commission then issues a photo identity card, known as the Electors Photo Identity Card.',
    }),
    sl('example', 'Worked example 3: a missing name', {
      b: 'Imagined Vimal turns eighteen but finds his name missing from the roll.',
      bl: [
        'Step 1 — Check the roll for the name.',
        'Step 2 — Apply to the electoral authorities to be added.',
        'Step 3 — Get the name entered and the EPIC card.',
        'Step 4 — Vote on polling day.',
      ],
      v: vRollEx,
      n: 'Imagine a young man named Vimal. He turns eighteen but his name is not on the roll. First he checks the roll. Then he applies to the electoral authorities to be added. Once the name is entered, he gets the identity card. On polling day he can vote. The roll is the Commission\'s responsibility.',
    }),
    sl('check', 'Quick check: tasks and bodies', {
      b: 'Match each task with the body that performs it.',
      chk: 'mt_functions',
      n: 'Think about which body prepares rolls, which redraws boundaries and which conducts panchayat polls.',
    }),
    sl('diagram', 'Parties and symbols', {
      b: 'A **symbol** helps voters identify a party or candidate.',
      v: vSym,
      n: 'The Commission recognises political parties as national or State parties. It also allots symbols. A symbol helps voters recognise their candidate on the ballot or on the voting machine, even if they cannot read well. It also prevents confusion between similar names.',
    }),
    sl('diagram', 'Steps of an election', {
      b: 'The Commission fixes the **schedule** and supervises each step.',
      v: vPoll,
      n: 'An election has clear steps. The Commission announces the schedule. Candidates file nominations. The nominations are scrutinised. Then comes polling day, when votes are recorded on electronic voting machines with a paper trail slip. At last the votes are counted and the results are declared. The Commission also appoints observers.',
    }),
    sl('diagram', 'Do not confuse the bodies', {
      b: 'The **Delimitation Commission** is a separate body.',
      v: vWho2,
      n: 'Several bodies deal with elections, so avoid confusion. The Election Commission of India prepares the rolls and conducts elections to Parliament and State Legislatures. A separate Delimitation Commission redraws constituency boundaries. State Election Commissions conduct panchayat and municipal elections. Parliament and the State Legislatures make laws.',
    }),
    sl('check', 'Quick check: put the steps in order', {
      b: 'Arrange the steps of an election in order.',
      chk: 'ord_poll_steps',
      n: 'Use the flow you have just seen. Start with the announcement of the schedule.',
    }),
    sl('concept', 'The Model Code of Conduct', {
      bl: [
        'A set of **guidelines** for parties and candidates.',
        'In force from the **announcement of the schedule** until **results**.',
        'Aim: a **free and fair** election with no misuse of **official machinery**.',
      ],
      v: vMCC,
      n: 'The Model Code of Conduct is a set of guidelines for parties and candidates. It comes into force when the schedule is announced and lasts until the results are declared. Its aim is to keep the election free and fair, and to stop anyone from misusing official machinery.',
    }),
    sl('diagram', 'What the Code expects', {
      v: vDo,
      n: 'The Code asks parties and candidates not to misuse official vehicles, staff or premises. They should not make fresh grants or announcements that might sway voters. They should not stir hatred or insult any community. And they should campaign within the rules. The reason is a level field for all.',
    }),
    sl('example', 'Worked example 4: spot the breach', {
      b: 'Ask: does the act misuse office, or unfairly sway voters?',
      bl: [
        'Step 1 — Check that the schedule has been announced.',
        'Step 2 — Ask whether official machinery or a fresh announcement is involved.',
        'Step 3 — Decide whether the Code is broken.',
        'Step 4 — Write the reason.',
      ],
      v: vMccEx,
      n: 'After the schedule is announced, look at each act. A peaceful rally is fair campaigning, so it is allowed. A new scheme announced for one district may sway voters, so it breaks the Code. A candidate using a government office for a meeting is misusing official premises, so that also breaks the Code.',
    }),
    sl('check', 'Quick check: when does the Code apply', {
      b: 'During which period does the Model Code of Conduct apply?',
      chk: 'm_mcc_period',
      n: 'Remember the day it starts and the day it ends.',
    }),
    sl('diagram', 'Three kinds of elections', {
      b: 'The kind of election depends on **how many seats** and **why**.',
      v: vTypes,
      n: 'A general election fills all the seats of a House after its full term, which is five years for the Lok Sabha. A mid-term election fills all seats before the term ends, after early dissolution. A by-election fills only one seat that has fallen vacant. Check the number of seats and the reason.',
    }),
    sl('diagram', 'Mid-term election', {
      v: vMid,
      n: 'A mid-term election is held before the term of a House ends. This happens when the House is dissolved early, for instance when no party can form a stable government. All the seats are contested again, and the new House gets a fresh full term.',
    }),
    sl('diagram', 'By-election', {
      b: 'Only **that constituency** votes.',
      v: vBye,
      n: 'A by-election fills one seat that has become vacant. A seat falls vacant through the death or resignation of the member, or when the member is disqualified. The Commission announces a poll for that constituency alone, and it is generally held within six months.',
    }),
    sl('example', 'Worked example 5: name the election', {
      b: 'Count the seats first, then find the reason.',
      bl: [
        'Step 1 — How many seats are being filled?',
        'Step 2 — Has the full term ended or was the House dissolved early?',
        'Step 3 — Name the election.',
        'Step 4 — For a 10-mark answer, plan 3 + 3 + 4: general, mid-term, by-election.',
      ],
      v: vClassEl,
      n: 'First count the seats. If all seats are filled after the full term, it is a general election. If all seats are filled after early dissolution, it is a mid-term election. If one seat is vacant, it is a by-election. In a ten mark answer, give three marks to the general election, three to the mid-term election and four to the by-election.',
    }),
    sl('check', 'Quick check: match the types', {
      b: 'Match each type of election with its description.',
      chk: 'mt_types',
      n: 'Use the figure of three boxes you have just seen.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        '**Functions:** rolls and EPIC; recognise parties and symbols; schedule, nominations, polls, observers.',
        'A separate **Delimitation Commission** draws boundaries.',
        '**Model Code of Conduct:** from the schedule until results; keeps elections free and fair.',
        '**General** (all seats, full term), **mid-term** (all seats, early dissolution), **by-election** (one seat, within six months).',
      ],
      v: vTypes,
      n: 'To sum up. The Commission prepares the rolls, recognises parties, fixes the schedule, conducts the poll and enforces the Model Code of Conduct. A separate body draws boundaries. A general election fills all seats after the term, a mid-term election follows early dissolution, and a by-election fills a single vacant seat.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Group the functions: **voters**, **parties and candidates**, **polls**, **conduct**.',
        'Do not credit the Election Commission with **drawing boundaries**.',
        'For the Model Code, state its **period** and its **purpose**.',
        'For types, give the **number of seats** and the **reason** for each.',
        'Use only imagined parties and places; do not name current parties or recent elections.',
      ],
      n: 'Some exam habits. Group the functions of the Commission under four heads. Do not give the Commission the task of drawing boundaries. For the Model Code, state the period and the purpose. For the three kinds of elections, state the number of seats and the reason. Do not name real parties or recent elections.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Elections and the Election Commission — notes',
  sections: [
    {
      h: '1. What an election is, and why it matters',
      t: 1,
      b: '- An **election** is the process by which **voters choose** representatives or office-holders by casting votes.\n- In a **representative democracy** the people rule through representatives, since they cannot decide every matter themselves.\n- Elections are held at **regular intervals** for a **fixed term**; leaders must face the voters again.\n- They let a government be **changed peacefully** and give every adult citizen an **equal voice** (one adult, one vote).',
      terms: [['Election', 'The process by which voters choose representatives or office-holders.'], ['Representative democracy', 'A democracy in which the people rule through elected representatives.']],
      v: vWhy,
      vs: [vMeaning],
    },
    {
      h: '2. Direct and indirect elections',
      t: 1,
      b: '- **Direct election:** the voters themselves choose the member. Examples: **Lok Sabha**, **Legislative Assembly**, **panchayat** members.\n- **Indirect election:** voters or members choose **electors**, and the electors choose the office-holder. Examples: the **President** and the **Vice-President** (electoral college); **Rajya Sabha** members from a State (elected by that State\'s **elected MLAs**).\n- Test: ask **who casts the deciding vote**, the voters or electors.\n- Panchayat and municipal polls are held by **State Election Commissions**.',
      terms: [['Direct election', 'An election in which the voters choose the member themselves.'], ['Indirect election', 'An election in which electors choose the office-holder.'], ['Electors', 'Persons who vote on behalf of others in an indirect election.']],
      v: vDI,
      vs: [vWho, vSortDI],
    },
    {
      h: '3. The Election Commission: set-up, composition, appointment',
      t: 2,
      b: '- Set up under **Article 324** on **25 January 1950**; the date is now **National Voters\' Day**.\n- Its job is to **superintend, direct and control** elections to Parliament, State Legislatures and the offices of President and Vice-President.\n- **Composition:** the **Chief Election Commissioner (CEC)** and such other **Election Commissioners** as the President fixes. Briefly multi-member in **1989-90**; **three members** (CEC and two) **since 1993**.\n- **Appointed by the President.** **As of 2024**, a **2023 Act** has a selection committee: the Prime Minister, a Union Cabinet Minister nominated by the Prime Minister, and the Leader of the Opposition in the Lok Sabha (or leader of the largest opposition party).\n- **Term:** six years or until age **65**, whichever is earlier.',
      terms: [['Chief Election Commissioner', 'The head of the Election Commission.'], ['National Voters\' Day', '25 January, the date on which the Commission was set up in 1950.']],
      v: vComp,
      vs: [vEC, vAppoint, vTimeline],
    },
    {
      h: '4. How independence is protected',
      t: 2,
      b: '- The ruling party also contests elections, so the Commission must be an **independent umpire**.\n- The **CEC** can be removed only in the manner of a **Supreme Court Judge**.\n- **Conditions of service** of the CEC cannot be changed to the CEC\'s **disadvantage** after appointment.\n- **Other Commissioners** can be removed only on the **recommendation of the CEC**.\n- Independence still needs honest conduct, a free press and informed citizens.',
      terms: [['Independence of the Commission', 'Freedom from control or pressure by the government of the day.']],
      v: vSafe,
    },
    {
      h: '5. Functions of the Commission and the Model Code',
      t: 3,
      b: '- **Voters:** prepares and revises the **electoral rolls**; issues **EPIC** photo identity cards.\n- **Parties and candidates:** **recognises** parties, allots **symbols**, supervises **nominations** and their scrutiny.\n- **Polls:** fixes the **schedule**, conducts polling (voting machines with a paper trail slip), appoints **observers**, sees to counting and results.\n- **Not its job:** redrawing constituency boundaries (a separate **Delimitation Commission**) and panchayat polls (State Election Commissions).\n- **Model Code of Conduct:** guidelines for parties and candidates from the **announcement of the schedule** to the **results**; its purpose is **free and fair** elections and no **misuse of official machinery**.',
      terms: [['Electoral roll', 'The list of eligible voters of a constituency.'], ['EPIC', 'Electors Photo Identity Card.'], ['Model Code of Conduct', 'Guidelines for parties and candidates during an election.']],
      v: vFn,
      vs: [vRoll, vPoll, vWho2, vMCC, vDo],
    },
    {
      h: '6. General election, mid-term election and by-election',
      t: 4,
      b: '- **General election:** all seats of a House are filled after its **full term** (five years for the Lok Sabha and a State Legislative Assembly).\n- **Mid-term election:** all seats are filled **before the term ends**, after the House is **dissolved early**.\n- **By-election:** **one seat** is filled after it **falls vacant** through **death, resignation or disqualification**; generally held **within six months**.\n- To name an election, **count the seats** and ask **why**.',
      terms: [['General election', 'An election to fill all the seats of a House after its full term.'], ['Mid-term election', 'An election for all seats held before the term of the House ends.'], ['By-election', 'An election to fill a single seat that has fallen vacant.']],
      v: vTypes,
      vs: [vMid, vBye, vClassEl],
    },
  ],
  tips: '**Common mistakes**\n- Calling the election of the President or the Rajya Sabha members direct.\n- Giving the Election Commission the task of redrawing constituency boundaries.\n- Writing that the Model Code lasts all five years, or only on polling day.\n- Mixing up a by-election (one seat) with a mid-term election (all seats).\n- Leaving out the year for the 2023 selection committee rule ("as of 2024").\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, term or date.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point for each mark; the last part usually needs a reason or an application.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is an election?', 'The process by which **voters choose** their representatives or office-holders by voting.', 'definition', 1],
  ['Why are elections essential in a representative democracy?', 'The people rule through **representatives**; elections choose them, keep them **answerable** and allow **peaceful change**.', 'concept', 1],
  ['Direct election', 'The **voters themselves** choose the member.', 'definition', 1],
  ['Indirect election', '**Electors** (or elected members) choose the office-holder.', 'definition', 1],
  ['Name two directly elected bodies', 'The **Lok Sabha** and the **Legislative Assemblies** (also panchayats).', 'example', 1],
  ['Name two indirectly elected offices', 'The **President** and the **Vice-President** (also Rajya Sabha members from a State).', 'example', 1],
  ['Who elects the Rajya Sabha members of a State?', 'The **elected members** of that State\'s Legislative Assembly.', 'fact', 1],
  ['Who conducts panchayat and municipal elections?', 'The **State Election Commissions**.', 'fact', 1],
  ['Under which Article is the Election Commission set up?', 'Article **324**.', 'fact', 2],
  ['When was the Election Commission set up?', '**25 January 1950**, now observed as **National Voters\' Day**.', 'fact', 2],
  ['What is the Election Commission\'s job?', 'To **superintend, direct and control** elections.', 'definition', 2],
  ['Composition of the Commission', 'A **Chief Election Commissioner** and such other Election Commissioners as the President fixes.', 'fact', 2],
  ['How many members since 1993?', '**Three**: the CEC and two Election Commissioners.', 'fact', 2],
  ['Who appoints the CEC?', 'The **President** (as of 2024, on a selection committee\'s recommendation under a 2023 Act).', 'fact', 2],
  ['Term of the CEC', 'Six years or until age **65**, whichever is earlier.', 'fact', 2],
  ['How is the CEC removed?', 'Only in the manner of a **Supreme Court Judge**.', 'fact', 2],
  ['How are other Commissioners removed?', 'Only on the **recommendation of the CEC**.', 'fact', 2],
  ['Safeguard on service conditions', 'They cannot be changed to the CEC\'s **disadvantage** after appointment.', 'concept', 2],
  ['Why must the Commission be independent?', 'The **ruling party also contests** elections, so the umpire must be neutral.', 'concept', 2],
  ['What is the electoral roll?', 'The **list of eligible voters** of a constituency, prepared and revised by the Commission.', 'definition', 3],
  ['EPIC', 'The **Electors Photo Identity Card** issued to registered voters.', 'definition', 3],
  ['What does the Commission do for parties?', '**Recognises** them and **allots symbols**.', 'fact', 3],
  ['Who redraws constituency boundaries?', 'A separate **Delimitation Commission**, not the Election Commission.', 'fact', 3],
  ['Name the steps of an election in order', 'Schedule, nominations, scrutiny, polling, counting and results.', 'concept', 3],
  ['Model Code of Conduct', '**Guidelines** for parties and candidates during an election.', 'definition', 3],
  ['Period of the Model Code', 'From the **announcement of the schedule** until the **results**.', 'fact', 3],
  ['Purpose of the Model Code', 'To keep elections **free and fair** and stop misuse of **official machinery**.', 'concept', 3],
  ['General election', '**All seats** of a House filled after its **full term**.', 'definition', 4],
  ['Mid-term election', '**All seats** filled **before the term ends**, after early dissolution.', 'definition', 4],
  ['By-election', 'A **single vacant seat** filled; vacancy by death, resignation or disqualification.', 'definition', 4],
  ['Time for a by-election', 'Generally **within six months**.', 'fact', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — Elections and the Election Commission',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_meaning', 'm_composition', 'm_rolls', 'm_midterm', 'ar_independence', 's_direct_indirect_diff', 's3_mcc_purpose'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_election_meaning', 'l_functions'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — Elections and the Election Commission',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_direct_ls', 'm_term_scenario', 'm_removal_cec', 'm_mcc_scenario', 'm_symbol', 'm_scn_by', 'm_bye_time', 'ar_mcc', 's_meaning_election', 's_safeguards', 's_bye', 's3_independence_scenario', 's3_distinguish'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_ec_composition', 'l_mcc', 'l_types'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-9-history-civics-ch03 only (meaning of election, direct and indirect elections; composition and appointment of the Election Commission and its independence; functions of the Commission and the Model Code of Conduct; general, mid-term and by-elections); elementary study, Articles named but never quoted',
    originality: 'every constituency, State, voter, party, report, diary and set of notes is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no person quoted; no Article quoted; no current office-holder, party or recent election named',
    data: 'timeline years asserted in increasing order (1950, 1989, 1993, 2023)',
    facts: 'Election Commission set up under Article 324 on 25 January 1950 (National Voters Day); CEC and Election Commissioners appointed by the President; three members since 1993; term six years or age 65; CEC removable like a Supreme Court Judge; other Commissioners only on the CEC recommendation; 2023 Act selection committee (dated as of 2024); Delimitation Commission separate; State Election Commissions for panchayat and municipal polls; Model Code of Conduct from schedule to results; general, mid-term and by-elections; by-election generally within six months',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
