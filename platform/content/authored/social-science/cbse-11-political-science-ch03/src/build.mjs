// Build CBSE 11 Political Science ch03 Election and Representation. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch03', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
function timeline(events, alt, caption, { w = 760, h = 230 } = {}) {
  const s = new Svg(w, h);
  const y = h / 2, x0 = 95, x1 = w - 95;
  s.arrow(x0 - 50, y, x1 + 60, y, { sw: 2 });
  const step = (x1 - x0) / (events.length - 1);
  events.forEach(([year, label], i) => {
    const x = x0 + i * step;
    const up = i % 2 === 0;
    s.dot(x, y, 6, 'accent');
    s.line(x, y, x, up ? y - 34 : y + 34, { sw: 1.2, color: 'muted' });
    s.text(x, up ? y - 46 : y + 46, String(year), { bold: true, size: 15, color: 'accent' });
    const lines = Array.isArray(label) ? label : [label];
    lines.forEach((ln, j) => s.text(x, up ? y - 66 - 16 * (lines.length - 1 - j) : y + 66 + 16 * j, ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}

// Imagined Sundarian election: 20 seats. Vote share 40, 30, 25, 5. First past the post seats 12, 6, 2, 0 (60, 30, 10, 0 per cent).
// A list system would give 8, 6, 5, 1 seats (40, 30, 25, 5 per cent).
const vBars = (() => {
  const s = new Svg(760, 340);
  const left = 70, top = 56, width = 640, height = 220, max = 60;
  const base = top + height;
  const Y = (v) => base - (v / max) * height;
  s.line(left, top - 8, left, base, { sw: 1.6 });
  s.line(left, base, left + width, base, { sw: 1.6 });
  [0, 20, 40, 60].forEach((v) => {
    s.line(left - 5, Y(v), left, Y(v), { sw: 1.2 });
    s.text(left - 10, Y(v), `${v}%`, { size: 12, anchor: 'end' });
    if (v) s.line(left, Y(v), left + width, Y(v), { sw: 0.8, dash: true, color: 'muted' });
  });
  const series = [['Vote share', 'blue'], ['Seats, first past the post', 'red'], ['Seats, list system', 'green']];
  const data = [['Sun Party', [40, 60, 40]], ['Moon Party', [30, 30, 30]], ['Star Party', [25, 10, 25]], ['Cloud Party', [5, 0, 5]]];
  data.forEach(([name, vals], g) => {
    const gx = left + g * 160 + 22;
    vals.forEach((v, i) => {
      const x = gx + i * 38;
      if (v > 0) s.rect(x, Y(v), 32, base - Y(v), { fill: series[i][1], color: series[i][1], fillOpacity: 0.45, rx: 3, sw: 1.5 });
      s.text(x + 16, Y(v) - 10, `${v}%`, { size: 12 });
    });
    s.text(gx + 55, base + 20, name, { size: 13, bold: true });
  });
  series.forEach(([label, col], i) => {
    const x = 70 + i * 215;
    s.rect(x, 14, 16, 16, { fill: col, color: col, fillOpacity: 0.45, rx: 3, sw: 1.5 });
    s.text(x + 24, 22, label, { size: 12, anchor: 'start' });
  });
  s.text(390, 322, 'Imagined election, Sundaria: 20 seats in all', { size: 12, muted: true });
  return s.visual('Bar chart of an imagined election in Sundaria with 20 seats. Vote share: Sun Party 40 per cent, Moon Party 30, Star Party 25, Cloud Party 5. Seat share under first past the post: Sun Party 60 per cent (12 seats), Moon Party 30 (6 seats), Star Party 10 (2 seats), Cloud Party 0. Seat share under a list system: Sun Party 40 per cent (8 seats), Moon Party 30 (6), Star Party 25 (5), Cloud Party 5 (1)', 'Imagined figures: vote share against seat share under two systems.');
})();

const vCompare = (() => {
  const s = new Svg(760, 300);
  s.text(145, 24, 'First past the post', { bold: true, size: 16, color: 'blue' });
  s.text(615, 24, 'Proportional representation', { bold: true, size: 16, color: 'green' });
  const rows = [
    ['Unit', 'Many single-seat areas', 'One large constituency'],
    ['Winner', 'Candidate with most votes', 'Seats shared by vote share'],
    ['Voter picks', 'A candidate', 'A party list'],
    ['Result', 'Seats may differ from votes', 'Seats close to votes'],
    ['Used for', 'Lok Sabha, State Assemblies', 'List system abroad; STV in India'],
  ];
  rows.forEach(([label, l, r], i) => {
    const y = 48 + i * 48;
    s.rect(20, y, 250, 38, { color: 'blue', sw: 1.5, rx: 6 });
    s.rect(280, y, 200, 38, { color: 'muted', sw: 1.5, rx: 6 });
    s.rect(490, y, 250, 38, { color: 'green', sw: 1.5, rx: 6 });
    s.text(145, y + 19, l, { size: 13 });
    s.text(380, y + 19, label, { size: 13, muted: true });
    s.text(615, y + 19, r, { size: 13 });
  });
  return s.visual('Comparison chart of first past the post and proportional representation: many single-seat areas against one large constituency; candidate with most votes wins against seats shared by vote share; voter picks a candidate against a party list; seats may differ from votes against seats close to votes; used for the Lok Sabha and State Assemblies against the list system abroad and the single transferable vote in India', 'Two systems side by side.');
})();

const vWeb = (() => {
  const s = new Svg(760, 300);
  const nodes = [
    [20, 24, ['Supervises', 'electoral rolls'], 'blue'],
    [20, 122, ['Sets the', 'election schedule'], 'green'],
    [20, 220, ['Enforces the model', 'code of conduct'], 'red'],
    [550, 24, ['Recognises parties', 'and allots symbols'], 'brown'],
    [550, 122, ['Orders a repoll or', 'postpones elections'], 'yellow'],
    [550, 220, ['Deploys officers', 'and observers'], 'accent'],
  ];
  s.rect(290, 108, 180, 84, { color: 'accent', sw: 2.5 });
  s.text(380, 138, 'Election', { bold: true, size: 16 });
  s.text(380, 160, 'Commission', { bold: true, size: 16 });
  s.text(380, 180, 'Article 324', { size: 12, muted: true });
  nodes.forEach(([x, y, lines, col]) => {
    const left = x < 300;
    s.line(left ? x + 190 : x, y + 28, left ? 290 : 470, 150, { sw: 1.5, color: 'muted' });
    s.rect(x, y, 190, 56, { color: col, sw: 2 });
    s.text(x + 95, y + 20, lines[0], { size: 13 });
    s.text(x + 95, y + 38, lines[1], { size: 13 });
  });
  return s.visual('Web diagram of the functions of the Election Commission under Article 324: it supervises electoral rolls, sets the election schedule, enforces the model code of conduct, recognises parties and allots symbols, orders a repoll or postpones elections, and deploys officers and observers', 'Six functions around one body.');
})();

const vTimeline = timeline(
  [[1988, ['61st Amendment:', 'voting age 18']], [1993, ['Three-member', 'Commission']], [2003, ['Candidate', 'affidavits']], [2004, ['Voting machines', 'in all seats']], [2013, ['NOTA option', 'introduced']], [2023, ['106th Amendment:', 'women\'s reservation']]],
  'Timeline: 1988 the 61st Amendment lowers the voting age to 18; 1993 the Election Commission becomes a three-member body; 2003 candidate affidavits are required; 2004 electronic voting machines are used in all constituencies; 2013 the NOTA option is introduced; 2023 the 106th Amendment provides one-third reservation for women',
  'Six dates, equally spaced (not to scale).',
);

// ---------------------------------------------------------------- tables and flows (deck 1)
const vDemo = table(
  ['Kind', 'Meaning', 'Fits'],
  [
    ['Direct democracy', 'Citizens decide issues themselves', 'Small groups, such as a village meeting'],
    ['Indirect democracy', 'Citizens elect representatives who decide', 'Large countries such as India'],
  ],
  'Table of direct democracy, where citizens decide themselves and which fits small groups, and indirect democracy, where citizens elect representatives and which fits large countries',
);
const vWhyRep = flow('LR', ['Millions of voters cannot meet to decide every issue', 'They elect representatives', 'Representatives make laws', 'Voters judge them at the next election'], 'Flow: millions of voters cannot meet, so they elect representatives, who make laws and are judged by voters at the next election', 'Why representatives are elected');
const vFptp = flow('LR', ['Country divided into constituencies', 'Each elects one representative', 'Voters choose a candidate', 'Most votes wins (a plurality)'], 'Flow of first past the post: constituencies, one representative each, voters choose a candidate, the candidate with the most votes wins', 'First past the post in four steps');
const vTarnagar = table(
  ['Candidate (imagined)', 'Party', 'Votes', 'Share of 100,000'],
  [
    ['Candidate 1', 'Sun Party', '31,000', '31 per cent'],
    ['Candidate 2', 'Moon Party', '29,000', '29 per cent'],
    ['Candidate 3', 'Star Party', '24,000', '24 per cent'],
    ['Candidate 4', 'Cloud Party', '16,000', '16 per cent'],
  ],
  'Worked example table of the imagined Tarnagar constituency: candidate 1 of the Sun Party 31,000 votes, 31 per cent; candidate 2 of the Moon Party 29,000; candidate 3 of the Star Party 24,000; candidate 4 of the Cloud Party 16,000; the winner has a plurality but not a majority',
  'The winner has a plurality, not a majority.',
);
const vStrWeak = table(
  ['Strengths', 'Weakness'],
  [
    ['Simple for voters and for counting', 'Seat share can differ from vote share'],
    ['A clear choice between candidates', 'Votes for losing candidates win nothing'],
    ['Voters know their own representative', 'A party can win with fewer than half the votes'],
    ['Usually gives stable governments', 'Small parties may be under-represented'],
  ],
  'Table of the strengths of first past the post, which are simplicity, a clear choice, a known representative and stable governments, and its weaknesses, which are that seat share can differ from vote share, losing votes win nothing, a party can win with fewer than half the votes, and small parties may be under-represented',
);
const vPR = table(
  ['Point', 'Proportional representation'],
  [
    ['Idea', 'A party gets seats in proportion to its share of votes'],
    ['List system', 'Voters choose a party; the country forms one large constituency'],
    ['Examples as commonly taught', 'Israel and the Netherlands'],
    ['Effect', 'Small parties get seats; coalitions are common'],
  ],
  'Table about proportional representation: seats in proportion to votes; in the list system voters choose a party and the country is one large constituency; Israel and the Netherlands are commonly taught examples; small parties gain seats and coalitions are common',
);
const vSTV = table(
  ['Office or body', 'Who elects', 'Method'],
  [
    ['Lok Sabha', 'Voters in each constituency', 'First past the post'],
    ['State Legislative Assembly', 'Voters in each constituency', 'First past the post'],
    ['Rajya Sabha', 'Elected members of State Assemblies', 'Single transferable vote'],
    ['President', 'Elected MPs and MLAs', 'Single transferable vote'],
    ['Vice-President', 'Members of both Houses of Parliament', 'Single transferable vote'],
    ['Legislative Councils', 'In part, elected members of Assemblies', 'Single transferable vote'],
  ],
  'Table of methods in India: Lok Sabha and State Assemblies are elected by voters through first past the post; the Rajya Sabha, President, Vice-President and in part the Legislative Councils are elected indirectly through the single transferable vote',
);
const vWhyIndia = flow('LR', ['Large electorate, many first-time voters', 'Simple method needed', 'Voters know their representative', 'Broad-based parties and stable governments'], 'Flow of reasons for choosing first past the post: a large electorate with many first-time voters needed a simple method; voters know their representative; it encourages broad-based parties and stable governments', 'Reasons for India\'s choice');
const vReserved = table(
  ['Point', 'Reserved constituencies'],
  [
    ['Seats', 'Set aside for Scheduled Castes and Scheduled Tribes'],
    ['Who contests', 'Only candidates from that group'],
    ['Who votes', 'All voters of the constituency'],
    ['Lok Sabha, as of 2024', '84 Scheduled Caste seats and 47 Scheduled Tribe seats'],
  ],
  'Table of reserved constituencies: seats set aside for Scheduled Castes and Scheduled Tribes; only candidates from the group contest; all voters vote; as of 2024 the Lok Sabha has 84 Scheduled Caste seats and 47 Scheduled Tribe seats',
);
const vDelim = table(
  ['Topic', 'Key points'],
  [
    ['Delimitation Commission', 'Draws constituency boundaries and settles reserved seats'],
    ['Women\'s reservation', 'The 106th Amendment Act, 2023: one-third of seats in the Lok Sabha and State Assemblies'],
    ['When (as of 2024)', 'After the delimitation that follows the next census'],
  ],
  'Table about delimitation and women\'s reservation: the Delimitation Commission draws boundaries; the 106th Amendment Act of 2023 provides one-third reservation for women in the Lok Sabha and State Assemblies; as of 2024 it takes effect after the delimitation following the next census',
);
const vFranchise = table(
  ['Feature', 'Provision'],
  [
    ['Universal adult franchise', 'Every adult citizen may vote, whatever caste, religion, sex or wealth'],
    ['Voting age', '18 years since the 61st Amendment, 1988 (earlier 21)'],
    ['Minimum age to contest the Lok Sabha', '25 years'],
  ],
  'Table of free and fair elections: universal adult franchise; voting age 18 since the 61st Amendment of 1988, earlier 21; minimum age 25 to contest the Lok Sabha',
);
const vFiveMark = table(
  ['Point', 'First past the post against proportional representation'],
  [
    ['1', 'Unit: single-seat constituencies against one large constituency'],
    ['2', 'Winner: most votes against seats shared by vote share'],
    ['3', 'Voter picks: a candidate against a party'],
    ['4', 'Result: seats may differ from votes against close to votes'],
    ['5', 'Use: Lok Sabha against single transferable vote for the Rajya Sabha'],
  ],
  'Worked example table planning a five-mark comparison: unit, winner, what the voter picks, result, and use in India',
  'Five points of about 20 words each.',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Representation', 'Large democracies elect representatives'],
    ['First past the post', 'Most votes wins; Lok Sabha and Assemblies; seats may differ from votes'],
    ['Proportional representation', 'Seats by vote share; STV for Rajya Sabha, President, Vice-President'],
    ['Reservation and franchise', '84 SC and 47 ST seats (2024); one-third for women; voting age 18'],
  ],
  'Summary table of Part 1: representation, first past the post, proportional representation, and reservation and franchise',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['The winner needs more than half the votes', 'A plurality is enough under first past the post'],
    ['The Rajya Sabha is elected like the Lok Sabha', 'Rajya Sabha: single transferable vote by Assembly members'],
    ['Only SC voters vote in a reserved seat', 'All voters vote; only SC candidates contest'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables and flows (deck 2)
const vECBody = table(
  ['Point', 'Election Commission'],
  [
    ['Source', 'Article 324 of the Constitution'],
    ['Members', 'The Chief Election Commissioner and other Election Commissioners'],
    ['Size', 'Three members since 1993'],
    ['Role', 'Superintends, directs and controls elections'],
  ],
  'Table about the Election Commission: Article 324; the Chief Election Commissioner and other Election Commissioners; three members since 1993; it superintends, directs and controls elections',
);
const vIndep = table(
  ['Feature', 'What it means'],
  [
    ['Security of tenure', 'The Chief Election Commissioner can be removed only in the manner of a Supreme Court judge'],
    ['Why it matters', 'The government of the day cannot dismiss the Commissioner easily'],
    ['Appointment (as of 2024)', 'A 2023 law changed the method of appointment'],
  ],
  'Table of the independence of the Election Commission: security of tenure with removal only in the manner of a Supreme Court judge; why it matters; and, as of 2024, a 2023 law changing the method of appointment',
);
const vElectionFlow = flow('LR', ['Electoral roll prepared', 'Schedule announced; code begins', 'Nominations and affidavits', 'Campaign', 'Polling and counting'], 'Flow of an election: electoral roll prepared, schedule announced and code begins, nominations and affidavits, campaign, polling and counting', 'Stages of an election');
const vNahargarh = table(
  ['What happened (imagined)', 'Power of the Commission'],
  [
    ['Two polling stations at Nahargarh are damaged', 'Order a repoll there'],
    ['Officers from outside the district conduct it', 'Deploy officers and observers'],
    ['A minister announces a new scheme after the schedule', 'Enforce the model code of conduct'],
    ['A new party wants a symbol', 'Recognise the party and allot a symbol'],
  ],
  'Worked example table applying the Commission\'s powers to an imagined case at Nahargarh: a repoll for damaged stations; deploying officers from outside; enforcing the model code against a new scheme announced after the schedule; recognising a party and allotting a symbol',
  'Match each event to a power.',
);
const vMCC = table(
  ['Point', 'Model code of conduct'],
  [
    ['What', 'Rules for parties, candidates and governments in the election period'],
    ['From when', 'The announcement of the schedule'],
    ['Aim', 'A level field and free and fair elections'],
    ['Example', 'A government should not announce new benefits to attract voters'],
  ],
  'Table about the model code of conduct: rules for parties, candidates and governments; begins with the schedule; aims at a level field; a government should not announce new benefits to attract voters',
);
const vSymbols = table(
  ['Task', 'Meaning'],
  [
    ['Recognises parties', 'Gives a party the status of a recognised party'],
    ['Allots symbols', 'Gives each party or candidate a symbol that voters can identify'],
    ['Repoll and postponement', 'Fresh voting or delay when fair voting is not possible'],
  ],
  'Table about parties and symbols: the Commission recognises parties, allots symbols and can order a repoll or postponement when fair voting is not possible',
);
const vEVM = flow('LR', ['Voter presses a button on the electronic voting machine', 'A paper slip shows the choice briefly', 'The slip falls into a sealed box', 'Slips can be checked against the machine count'], 'Flow of voting: the voter presses a button on the electronic voting machine, a paper slip shows the choice briefly, the slip falls into a sealed box, and slips can be checked against the count', 'Machine and paper slip');
const vReforms = table(
  ['Reform', 'What it does'],
  [
    ['Electronic voting machines', 'Used in all constituencies from the 2004 Lok Sabha election'],
    ['VVPAT slips', 'A paper slip lets the voter check the vote'],
    ['EPIC cards', 'Photo identity cards for voters'],
    ['Candidate affidavits', 'Declare criminal records, assets and education'],
    ['NOTA, from 2013', 'Voters can reject all candidates'],
  ],
  'Table of reforms already made: electronic voting machines from 2004; VVPAT slips; EPIC photo identity cards; candidate affidavits on criminal records, assets and education; NOTA from 2013',
);
const vSomeOthers = table(
  ['Proposal', 'Some argue', 'Others argue'],
  [
    ['State funding of elections', 'Reduces the money power of rich candidates', 'Costly for taxpayers'],
    ['Curbing criminalisation', 'Stricter rules for candidates', 'Voters must use the information given'],
    ['A mixed or PR system', 'Seats would match votes better', 'Keep first past the post for its simplicity'],
  ],
  'Table of proposals with some arguing and others arguing: state funding reduces money power but is costly; curbing criminalisation with stricter rules against voters using the information; a mixed or proportional system for better matching of votes against keeping first past the post for simplicity',
);
const vFiveMark2 = table(
  ['Point', 'Reforms and proposals'],
  [
    ['1', 'Machines: voting machines from 2004 and VVPAT slips'],
    ['2', 'Identity: EPIC cards'],
    ['3', 'Disclosure: candidate affidavits'],
    ['4', 'Choice: NOTA from 2013'],
    ['5', 'Proposals: some argue, others argue'],
  ],
  'Worked example table planning a five-mark answer on reforms: machines, identity, disclosure, choice, and proposals with some and others',
  'Five points, one idea each.',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Commission', 'Article 324; three members since 1993; security of tenure'],
    ['Functions', 'Rolls, schedule, code, symbols, repoll, officers'],
    ['Reforms made', 'Machines 2004, EPIC, affidavits, NOTA 2013'],
    ['Proposals', 'State funding, money power, criminalisation, mixed system'],
  ],
  'Summary table of Part 2: the Commission, its functions, reforms made and proposals discussed',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['The Commission makes election laws', 'Parliament makes the laws; the Commission conducts elections'],
    ['The Commission draws constituencies', 'The Delimitation Commission does'],
    ['NOTA cancels the election', 'NOTA records rejection; the leading candidate still wins (as of 2024)'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Election and Representation, Part 1: Electoral systems',
  goals: [
    'Explain why large democracies elect representatives',
    'Compare first past the post with proportional representation',
    'State where India uses each system and why it chose first past the post',
    'Explain reserved constituencies, the Delimitation Commission and the franchise',
  ],
  slides: [
    sl('title', 'Electoral systems', {
      b: 'Part 1: why we elect **representatives**, how **first past the post** and **proportional representation** work, and what **reserved constituencies** are.',
      v: flow('LR', ['Why representatives', 'First past the post', 'Proportional representation', 'Why India chose', 'Reservation and franchise'], 'Route map of Part 1: why representatives, first past the post, proportional representation, why India chose, and reservation and franchise', 'Part 1 at a glance'),
      n: 'In a democracy the people rule, but how do millions of people rule together? In this part we study the ways in which votes are turned into seats. We compare first past the post with proportional representation, see why India chose one of them, and learn about reserved constituencies and the right to vote.',
    }),
    sl('concept', 'Elections and democracy', {
      v: vDemo,
      n: 'In direct democracy, citizens decide issues themselves, as in a village meeting. In indirect democracy, citizens elect representatives, who decide on their behalf. India is a large country, so it is an indirect, or representative, democracy. Elections are the means by which people choose their representatives and hold them to account.',
    }),
    sl('diagram', 'Why representatives are elected', {
      v: vWhyRep,
      n: 'Imagine the country of Sundaria, with forty million voters. All of them cannot meet in one hall to decide every law. So they elect representatives. The representatives make laws for them, and at the next election the voters judge how well the representatives did their work. This link between voters and representatives is what makes the system accountable.',
    }),
    sl('check', 'Quick check: why representatives', {
      b: 'Why does Sundaria elect representatives instead of voting on every law?',
      chk: 'm_why_rep',
      n: 'Think about the size of the population and whether everyone could meet to decide.',
    }),
    sl('diagram', 'First past the post', {
      v: vFptp,
      n: 'In the first past the post system, the country is divided into constituencies. Each constituency elects one representative. Each voter chooses a candidate. The candidate who gets more votes than any other wins, even if that is less than half of all the votes. This is called a plurality. India uses it for the Lok Sabha and for the State Legislative Assemblies.',
    }),
    sl('example', 'Worked example 1: a plurality, not a majority', {
      b: 'In the imagined constituency of Tarnagar, 100,000 votes are cast. Who wins, and does the winner have a majority?',
      bl: ['The candidate with **31,000 votes** wins', 'Half of all votes would be **50,000**', 'So the winner has a **plurality** but not a majority'],
      v: vTarnagar,
      n: 'Look at the imagined constituency of Tarnagar. Four candidates share one hundred thousand votes. The first has thirty one thousand, more than any other, so this candidate wins. But half of the votes would be fifty thousand. The winner has only thirty one per cent. This is a plurality, which first past the post accepts, but it is not a majority.',
    }),
    sl('check', 'Quick check: plurality', {
      b: 'True or false: under first past the post, a candidate must win more than half of the votes cast.',
      chk: 'tf_majority',
      n: 'Recall what the Tarnagar example showed.',
    }),
    sl('diagram', 'Vote share and seat share', {
      v: vBars,
      n: 'Here is an imagined election in Sundaria with twenty seats. The Sun Party gets forty per cent of the votes but wins twelve seats, which is sixty per cent. The Star Party gets twenty five per cent of the votes but only two seats. The Cloud Party gets five per cent and no seats. The green bars show what a list system would give: seats close to vote shares.',
    }),
    sl('concept', 'Strengths and weakness', {
      v: vStrWeak,
      n: 'First past the post has strengths. It is simple for voters and for counting. It gives a clear choice between candidates. Voters know their own representative, and the system usually gives stable governments. Its main weakness is that the share of seats can differ greatly from the share of votes, as the Sundaria chart showed. Votes for losing candidates count for nothing.',
    }),
    sl('check', 'Quick check: reading the chart', {
      b: 'The Sun Party wins forty per cent of the votes and twelve of twenty seats. What does this show?',
      chk: 'm_gap',
      n: 'Compare the seat share with the vote share.',
    }),
    sl('concept', 'Proportional representation', {
      v: vPR,
      n: 'In proportional representation, each party gets seats in proportion to its share of the votes. In the list system, as commonly taught with Israel and the Netherlands, the country forms one large constituency. Voters choose a party, and seats are shared according to the vote shares. Small parties then gain seats, and coalition governments are common.',
    }),
    sl('diagram', 'Two systems compared', {
      v: vCompare,
      n: 'Compare the two systems. First past the post uses many single seat constituencies, and the candidate with the most votes wins. Voters pick a candidate. Seats may differ from votes. In the list system, the country is one large constituency, seats are shared by vote share, voters pick a party list, and seats are close to votes.',
    }),
    sl('concept', 'Where India uses each method', {
      v: vSTV,
      n: 'India uses both ideas. The Lok Sabha and the State Legislative Assemblies are elected by voters through first past the post. For indirect elections, India uses proportional representation by the single transferable vote. The Rajya Sabha is elected by the elected members of the State Assemblies. The President, the Vice President and, in part, the Legislative Councils are also elected in this way.',
    }),
    sl('check', 'Quick check: match the offices', {
      b: 'Match each office or body with the way it is filled.',
      chk: 'mt_bodies',
      n: 'Recall which bodies are elected directly and which indirectly.',
    }),
    sl('diagram', 'Why India chose first past the post', {
      v: vWhyIndia,
      n: 'Why did India choose first past the post? It is simple, and India has a very large electorate with many first time voters. Voters know their own representative, because each constituency elects one. It encourages broad based parties, which must win support from many groups. And it helps in forming stable governments. These were the main reasons given.',
    }),
    sl('concept', 'Reserved constituencies', {
      v: vReserved,
      n: 'Some constituencies are reserved for Scheduled Castes and Scheduled Tribes. Only candidates from those groups can contest there, but all voters of the constituency take part in the vote. As of two thousand twenty four, the Lok Sabha has eighty four seats reserved for Scheduled Castes and forty seven for Scheduled Tribes.',
    }),
    sl('concept', 'Delimitation and women\'s reservation', {
      v: vDelim,
      n: 'The Delimitation Commission draws the boundaries of constituencies and decides which are reserved. The Constitution, one hundred and sixth Amendment Act of two thousand twenty three, provides one third reservation for women in the Lok Sabha and the State Legislative Assemblies. As of two thousand twenty four, this is to take effect after the delimitation that follows the next census.',
    }),
    sl('concept', 'Free and fair elections', {
      v: vFranchise,
      n: 'Free and fair elections need universal adult franchise: every adult citizen may vote, whatever caste, religion, sex or wealth. The sixty first Amendment of nineteen eighty eight lowered the voting age from twenty one to eighteen. To contest the Lok Sabha, a person must be at least twenty five years old.',
    }),
    sl('example', 'Worked example 2: a five-mark comparison', {
      b: 'Question: *Compare first past the post with proportional representation.* Plan five points of about 20 words each.',
      v: vFiveMark,
      n: 'For a five mark comparison, plan five points. First, the unit: single seat constituencies against one large constituency. Second, the winner: most votes against seats shared by vote share. Third, what the voter picks: a candidate against a party. Fourth, the result. Fifth, the use in India. Add the Sundaria example to show that you can apply the idea.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Large democracies elect representatives. First past the post gives the seat to the candidate with the most votes, and seat shares can differ from vote shares. Proportional representation matches seats to votes. India uses the single transferable vote for indirect elections. Some seats are reserved, and women will have one third reservation. The voting age is eighteen.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say **plurality, not majority** for first past the post', 'Name the **bodies** for each method', 'Reserved seats: **only candidates are restricted**; all voters vote', 'Add a **date** to every figure: **as of 2024**'],
      v: vTips1,
      n: 'A few tips. For first past the post, say plurality, not majority. Name the bodies that use each method. In reserved seats, only candidates are restricted, while all voters vote. And put a date on every figure, as of two thousand twenty four, because seats and laws can change.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Election and Representation, Part 2: The Election Commission and electoral reforms',
  goals: [
    'Describe the composition and independence of the Election Commission',
    'Explain the functions of the Election Commission',
    'Describe the electoral reforms already made',
    'Discuss proposals for further reform, giving both views',
  ],
  slides: [
    sl('title', 'The Election Commission and reforms', {
      b: 'Part 2: the **Election Commission**, what it does, and how **elections** have been improved.',
      v: flow('LR', ['The Commission', 'Independence', 'Functions', 'Reforms made', 'Proposals'], 'Route map of Part 2: the Commission, independence, functions, reforms made and proposals', 'Part 2 at a glance'),
      n: 'Who makes sure that an election is free and fair? In this part we study the Election Commission of India. We look at how it is made up, how its independence is protected, and what it does. Then we look at the reforms that have already been made, and the proposals that people still discuss.',
    }),
    sl('concept', 'The Election Commission', {
      v: vECBody,
      n: 'The Election Commission is set up under Article three twenty four of the Constitution. It consists of the Chief Election Commissioner and other Election Commissioners. It has had three members since nineteen ninety three. Its role is to superintend, direct and control the conduct of elections, so that voters can choose in a free and fair way.',
    }),
    sl('concept', 'Independence of the Commission', {
      v: vIndep,
      n: 'To work fairly, the Commission must be independent of the government. The Chief Election Commissioner has security of tenure: he or she can be removed only in the manner of a Supreme Court judge. So the government of the day cannot dismiss the Commissioner easily. As of two thousand twenty four, a law of two thousand twenty three changed the method of appointment.',
    }),
    sl('diagram', 'Functions of the Commission', {
      v: vWeb,
      n: 'The Commission has many functions. It supervises the preparation of electoral rolls, which list those eligible to vote. It sets the election schedule. It enforces the model code of conduct. It recognises parties and allots symbols. It can order a repoll or postpone an election. And it deploys officers and observers to conduct the election fairly.',
    }),
    sl('check', 'Quick check: a damaged polling station', {
      b: 'Many ballots are lost when a mob wrecks a polling station. Which power of the Commission applies?',
      chk: 'm_repoll',
      n: 'Think about what the Commission can do when voting cannot be fair.',
    }),
    sl('diagram', 'Stages of an election', {
      v: vElectionFlow,
      n: 'An election has stages. First the electoral roll is prepared. Then the Commission announces the schedule, and the model code of conduct begins. Candidates file nominations along with their affidavits. A campaign follows. Finally comes polling and counting of votes, and the results are declared. The Commission supervises each stage.',
    }),
    sl('example', 'Worked example 1: powers in a case', {
      b: 'Read the imagined events at Nahargarh and name the power of the Commission shown in each.',
      bl: ['Damaged stations: **repoll**', 'Outside officers: **deployment**', 'New scheme after the schedule: **model code of conduct**'],
      v: vNahargarh,
      n: 'Let us apply the powers to an imagined case at Nahargarh. Two polling stations are damaged, so the Commission orders a repoll there. It sends officers from outside the district, which is deployment of officers. A minister announces a new scheme after the schedule, which the model code of conduct restricts. A new party can ask for recognition and a symbol.',
    }),
    sl('concept', 'The model code of conduct', {
      v: vMCC,
      n: 'The model code of conduct is a set of rules for parties, candidates and governments in the election period. It begins when the schedule is announced. Its aim is a level field, so that no party gains an unfair advantage. For example, a government should not announce new benefits to attract voters once the schedule is out.',
    }),
    sl('concept', 'Parties, symbols and repolls', {
      v: vSymbols,
      n: 'The Commission recognises political parties and allots symbols, so that voters, including those who cannot read, can identify a party or candidate. When violence or other problems make fair voting impossible, it can order a repoll at the affected stations, or postpone the election in a place until conditions are right.',
    }),
    sl('diagram', 'Electronic voting machines and paper slips', {
      v: vEVM,
      n: 'Electronic voting machines were used in all constituencies from the Lok Sabha election of two thousand four. The voter presses a button next to the chosen candidate. A device called the voter verifiable paper audit trail prints a slip, which the voter can see briefly. The slip falls into a sealed box and can be checked against the machine count.',
    }),
    sl('concept', 'Reforms already made', {
      v: vReforms,
      n: 'Other reforms followed. The Electors Photo Identity Card helps prevent impersonation. Candidates file affidavits declaring any criminal cases, their assets and their education, so that voters can make an informed choice. And since two thousand thirteen, the none of the above option lets a voter reject all candidates while keeping the vote secret.',
    }),
    sl('diagram', 'Key dates', {
      v: vTimeline,
      n: 'Here are key dates. In nineteen eighty eight the voting age became eighteen. In nineteen ninety three the Commission became a three member body. In two thousand three, candidate affidavits were required. In two thousand four, voting machines were used in all constituencies. In two thousand thirteen, the none of the above option arrived. In two thousand twenty three, women\'s reservation was enacted.',
    }),
    sl('check', 'Quick check: order the developments', {
      b: 'Arrange four developments in the order in which they took place.',
      chk: 'ord_reforms',
      n: 'Use the timeline you have just seen.',
    }),
    sl('check', 'Quick check: none of the above', {
      b: 'A voter in an imagined constituency presses the none of the above button. What does it do?',
      chk: 'm_nota',
      n: 'Think about what the option records and whether it changes the winner.',
    }),
    sl('concept', 'Proposals for further reform', {
      v: vSomeOthers,
      n: 'People still discuss further reform. Some argue for state funding of elections, to reduce the money power of rich candidates; others argue that it would be costly for taxpayers. Some want stricter rules against criminalisation; others stress that voters must use the information they get. Some propose a mixed or proportional system; others prefer to keep first past the post. Judge each view by its reasons.',
    }),
    sl('example', 'Worked example 2: a five-mark answer', {
      b: 'Question: *Describe the electoral reforms made so far and the proposals discussed.* Plan five points.',
      v: vFiveMark2,
      n: 'For a five mark answer, give five points. First, machines: electronic voting machines from two thousand four, and paper slips. Second, identity cards. Third, candidate affidavits. Fourth, the none of the above option from two thousand thirteen. Fifth, the proposals, presented as some argue and others argue. Give a year with each reform.',
    }),
    sl('check', 'Quick check: voting age', {
      b: 'True or false: the minimum voting age in India is still twenty one years.',
      chk: 'tf_age',
      n: 'Recall the sixty first Amendment.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The Election Commission is set up under Article three twenty four, and has three members since nineteen ninety three. The Chief Election Commissioner has security of tenure. The Commission supervises rolls, sets the schedule, enforces the code, recognises parties, orders repolls and deploys officers. Reforms include machines, identity cards, affidavits and the none of the above option. Proposals are discussed with views on both sides.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Always cite **Article 324**', 'Give the **year** with each reform', 'Present proposals as **some argue, others argue**', 'Keep the **Election Commission** and **Delimitation Commission** apart'],
      v: vTips2,
      n: 'A few tips. Always cite Article three twenty four for the Election Commission. Give the year with each reform. Present proposals as some argue and others argue, and give reasons for each. And keep the Election Commission and the Delimitation Commission apart, because they do different work.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Election and Representation: Notes',
  sections: [
    {
      h: '1. Elections and representation',
      t: 1,
      b: 'In **direct democracy** citizens decide issues themselves; this works only in small groups. In **indirect (representative) democracy** citizens elect **representatives** who decide on their behalf and are accountable to voters at the next election. India is a large country, so it is a representative democracy, and elections are how citizens choose and judge their representatives.\n\nAn **electoral system** is the method by which votes are turned into seats.',
      terms: [
        ['Direct democracy', 'A form of democracy in which citizens decide issues themselves.'],
        ['Indirect democracy', 'A form of democracy in which citizens elect representatives to decide on their behalf.'],
        ['Electoral system', 'The set of rules by which votes cast in an election are turned into seats.'],
      ],
      v: vDemo,
      vs: [vWhyRep],
    },
    {
      h: '2. First past the post',
      t: 1,
      b: 'The country is divided into **constituencies**, each electing **one** representative. A voter chooses **a candidate**. The candidate with the **most votes** wins, even without a majority (more than half). India uses it for the **Lok Sabha** and the **State Legislative Assemblies**.\n\n**Strengths:** simple, a clear choice, voters know their representative, usually stable governments.\n\n**Weakness:** seat share can differ from vote share. In the imagined Sundaria election, 40 per cent of the votes gave 60 per cent of the seats, while 25 per cent of the votes gave 10 per cent of the seats.',
      terms: [
        ['First past the post', 'An electoral system in which each constituency elects one representative and the candidate with the most votes wins.'],
        ['Constituency', 'An area whose voters elect one or more representatives to a legislature.'],
        ['Plurality', 'The largest number of votes, which may be less than half of the votes cast.'],
        ['Majority', 'More than half of the votes cast.'],
      ],
      v: vFptp,
      vs: [vTarnagar, vBars],
    },
    {
      h: '3. Proportional representation',
      t: 1,
      b: 'Under **proportional representation (PR)**, a party gets **seats in proportion to its share of votes**. In the **list system**, as commonly taught with **Israel** and the **Netherlands**, the country forms **one large constituency**, voters choose a **party**, and seats follow vote shares. Small parties gain seats; coalitions are common.\n\nIndia uses PR by the **single transferable vote** for **indirect** elections: the **Rajya Sabha** (by elected members of State Assemblies), the **President**, the **Vice-President** and, in part, the **Legislative Councils**.',
      terms: [
        ['Proportional representation', 'An electoral system in which parties win seats in proportion to their share of the votes.'],
        ['List system', 'A form of proportional representation in which voters choose a party and seats are shared out according to each party\'s share of votes.'],
        ['Single transferable vote', 'A form of proportional representation in which voters rank candidates and surplus or unneeded votes pass to the next choice.'],
      ],
      v: vCompare,
      vs: [vSTV],
    },
    {
      h: '4. Why India chose first past the post',
      t: 1,
      b: 'The reasons given are: it is **simple** for a large electorate with many first-time voters; **voters know their representative**; it encourages **broad-based parties**; and it helps in forming **stable governments**.',
      terms: [
        ['Broad-based party', 'A party that draws support from many groups and regions rather than from one.'],
      ],
      v: vWhyIndia,
    },
    {
      h: '5. Reserved constituencies and free and fair elections',
      t: 1,
      b: '**Reserved constituencies** are set aside for **Scheduled Castes** and **Scheduled Tribes**: only candidates from those groups can contest, but **all voters** vote. As of **2024**, the Lok Sabha has **84 SC** and **47 ST** seats. The **Delimitation Commission** draws constituency boundaries.\n\n**Women\'s reservation:** the **Constitution (106th Amendment) Act, 2023** provides **one-third reservation** for women in the Lok Sabha and State Assemblies, to take effect **after the delimitation that follows the next census** (as of 2024).\n\n**Free and fair elections** need **universal adult franchise**. The voting age was lowered from 21 to 18 by the **61st Amendment (1988)**. The minimum age to contest the Lok Sabha is **25**.',
      terms: [
        ['Reserved constituency', 'A constituency set aside for Scheduled Castes or Scheduled Tribes, in which only candidates from that group may contest.'],
        ['Delimitation Commission', 'A body set up by law to draw the boundaries of constituencies and to settle which are reserved.'],
        ['Universal adult franchise', 'The right of every adult citizen to vote, without conditions of property, education, caste, religion or sex.'],
      ],
      v: vReserved,
      vs: [vDelim, vFranchise],
    },
    {
      h: '6. The Election Commission',
      t: 2,
      b: '**Article 324** places superintendence, direction and control of elections in the **Election Commission**, made up of the **Chief Election Commissioner** and other **Election Commissioners**; it has been a **three-member** body since **1993**. The Chief Election Commissioner has **security of tenure**: removal only in the manner of a **Supreme Court judge**. As of 2024, a 2023 law changed the method of appointment.\n\n**Functions:** supervises the preparation of **electoral rolls**; sets the **election schedule**; enforces the **model code of conduct**; **recognises parties and allots symbols**; can order a **repoll** and **postpone** elections; **deploys officers**.',
      terms: [
        ['Election Commission', 'The independent constitutional body under Article 324 that supervises, directs and controls elections.'],
        ['Electoral roll', 'The list of persons eligible to vote in a constituency.'],
        ['Model code of conduct', 'A set of rules for parties, candidates and governments that applies from the announcement of the election schedule, to ensure a level field.'],
        ['Repoll', 'Fresh voting ordered at a polling station or constituency where the earlier poll could not be fair.'],
      ],
      v: vWeb,
      vs: [vECBody, vIndep],
    },
    {
      h: '7. Electoral reforms and proposals',
      t: 2,
      b: '**Reforms made:** electronic voting machines (all constituencies from the **2004** Lok Sabha election) with **VVPAT** slips; **EPIC** voter identity cards; **affidavits** on criminal records, assets and education; **NOTA** from **2013**.\n\n**Proposals discussed:** **some argue** for state funding, curbs on money power and criminalisation, and a mixed or PR system; **others argue** that these have costs or that the present system has strengths. Women\'s reservation, once a proposal, is now enacted as above.',
      terms: [
        ['EVM', 'Electronic voting machine: a machine on which a voter records a vote by pressing a button next to a candidate.'],
        ['VVPAT', 'Voter Verifiable Paper Audit Trail: a device that prints a slip showing the voter\'s choice, which is kept for verification.'],
        ['EPIC', 'Electors Photo Identity Card: a photo identity card issued to registered voters.'],
        ['NOTA', 'None of the Above: an option that lets a voter record that he or she rejects all the candidates.'],
      ],
      v: vReforms,
      vs: [vTimeline, vSomeOthers],
    },
  ],
  tips: '**Common mistakes**\n- Writing that first past the post needs a majority: it needs only the most votes (a plurality).\n- Saying the Rajya Sabha is elected by first past the post: it uses the single transferable vote, through Assembly members.\n- Saying that only voters of the reserved group vote in a reserved seat: all voters vote; only candidates are restricted.\n- Mixing the Election Commission (conducts elections) with the Delimitation Commission (draws boundaries).\n- Giving the voting age as 21: it has been 18 since 1988.\n\n**Tips:** cite Article 324; give a year with each reform; add "as of 2024" to figures; present proposals as some argue and others argue; use the imagined Sundaria tables to show application.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is **direct democracy**?', 'A form of democracy in which citizens decide issues themselves; possible only in small groups.', 'definition', 1],
  ['What is **indirect democracy**?', 'Citizens elect representatives who decide on their behalf.', 'definition', 1],
  ['What is an **electoral system**?', 'The rules by which votes are turned into seats.', 'definition', 1],
  ['Define **first past the post**.', 'Each constituency elects one representative; the candidate with the most votes wins.', 'definition', 1],
  ['**Plurality** versus **majority**', 'Plurality: the most votes. Majority: more than half of the votes cast.', 'concept', 1],
  ['Which bodies use first past the post?', 'The Lok Sabha and the State Legislative Assemblies.', 'fact', 1],
  ['Two strengths of first past the post', 'Simplicity and a clear choice; voters know their representative; stable governments.', 'concept', 1],
  ['Main weakness of first past the post', 'Seat share can differ from vote share; votes for losing candidates win nothing.', 'concept', 1],
  ['Define **proportional representation**.', 'Parties get seats in proportion to their share of votes.', 'definition', 1],
  ['What is the **list system**?', 'The country forms one large constituency; voters choose a party; seats follow vote shares (as commonly taught with Israel and the Netherlands).', 'definition', 1],
  ['What is the **single transferable vote**?', 'A form of proportional representation in which voters rank candidates and votes can transfer to the next choice.', 'definition', 1],
  ['Which offices use the single transferable vote in India?', 'The Rajya Sabha, President, Vice-President and, in part, the Legislative Councils.', 'fact', 1],
  ['Who elects the **Rajya Sabha**?', 'The elected members of the State Legislative Assemblies.', 'fact', 1],
  ['Why did India choose first past the post?', 'Simple for a large electorate; known representatives; broad-based parties; stable governments.', 'concept', 1],
  ['What is a **reserved constituency**?', 'A seat set aside for Scheduled Castes or Scheduled Tribes; only their candidates contest, all voters vote.', 'definition', 1],
  ['Lok Sabha reserved seats, as of 2024', '**84** for Scheduled Castes and **47** for Scheduled Tribes.', 'fact', 1],
  ['What does the **Delimitation Commission** do?', 'Draws constituency boundaries and settles reserved seats.', 'definition', 1],
  ['**106th Amendment Act, 2023**', 'One-third reservation for women in the Lok Sabha and State Assemblies; to take effect after the delimitation following the next census (as of 2024).', 'fact', 1],
  ['What is **universal adult franchise**?', 'Every adult citizen may vote, without conditions of property, education, caste, religion or sex.', 'definition', 1],
  ['When was the voting age lowered to 18?', '**61st Amendment, 1988** (earlier 21).', 'fact', 1],
  ['Minimum age to contest the Lok Sabha', '**25 years**.', 'fact', 1],
  ['Which Article sets up the **Election Commission**?', '**Article 324**.', 'fact', 2],
  ['Size of the Election Commission since 1993', 'Three members: the Chief Election Commissioner and two other Election Commissioners.', 'fact', 2],
  ['How is the Chief Election Commissioner\'s tenure protected?', 'Removal only in the manner of a Supreme Court judge.', 'concept', 2],
  ['Functions of the Election Commission', 'Rolls, schedule, model code of conduct, recognising parties and symbols, repoll or postponement, deploying officers.', 'concept', 2],
  ['What is the **model code of conduct**?', 'Rules for parties, candidates and governments from the announcement of the schedule, for a level field.', 'definition', 2],
  ['What is a **repoll**?', 'Fresh voting ordered where the earlier poll could not be fair.', 'definition', 2],
  ['When were electronic voting machines used in all constituencies?', 'The **2004** Lok Sabha election.', 'fact', 2],
  ['What is **VVPAT**?', 'A device that prints a slip the voter can see briefly, kept in a sealed box for verification.', 'definition', 2],
  ['What are **EPIC** cards?', 'Electors Photo Identity Cards for registered voters.', 'definition', 2],
  ['Why do candidates file **affidavits**?', 'To declare criminal records, assets and education, so voters can choose with information.', 'concept', 2],
  ['What is **NOTA** and from when?', 'None of the Above: lets a voter reject all candidates; from **2013**.', 'fact', 2],
  ['Proposals for reform: some argue, others argue', 'State funding, curbing money power and criminalisation, a mixed or PR system: each has supporters and critics.', 'concept', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Election and Representation',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_fptp_where', 'm_cec_remove', 'm_reserved_vote', 'ar_reserved'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_fptp_def', 's_ec_security', 's3_gap'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_fptp', 'l_ec'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_news'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Election and Representation',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_fptp_def', 'm_pr_def', 'm_why_fptp', 'm_stv', 'm_delim', 'm_age', 'm_art324', 'm_evm', 'ar_gap', 'ar_cec'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_pr_def', 's_reserved_def', { attempt: 1, keys: ['s_mcc', 's_nota'] }, 's3_why_india', { attempt: 1, keys: ['s3_reserved', 's3_functions'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_compare', { attempt: 1, keys: ['l_reforms', 'l_eval'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_vel', 'c_debate'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch03 only (electoral systems, reservation and franchise; Election Commission and electoral reforms)',
    originality: 'every passage and table (Sundaria election results, school notice, newspaper report, letter, classroom discussion) is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text or board item reused (D-036)',
    facts: 'stable facts only: first past the post and the single transferable vote bodies; 84 SC and 47 ST Lok Sabha seats as of 2024; 106th Amendment Act 2023 with timing as of 2024; 61st Amendment 1988; voting age 18; minimum age 25; Article 324; three members since 1993; EVMs in all constituencies in 2004; NOTA 2013',
    neutrality: 'proposals are presented as some argue and others argue; no party, government or office-holder is named; electoral bonds and current disputes are left out',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
