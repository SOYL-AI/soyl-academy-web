// Build ICSE 10 History & Civics ch03 The President and the Vice-President. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch03/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch03', 'social-science');
const { collegeSvg, LS, RS, quarter, twoThirds, majorityOfAll, ORD_WEEKS, N_EMERG_APPROVAL_MONTHS, PR_APPROVAL_MONTHS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Who can become President', 'The Electoral College', 'Why an indirect election', 'Impeachment', 'Executive, legislative and financial powers'], 'Route map of Part 1: who can become President, the Electoral College, why the election is indirect, impeachment, and the executive, legislative and financial powers', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Judicial powers', 'Discretionary powers', 'Three kinds of emergency', 'The Vice-President'], 'Route map of Part 2: the judicial powers of the President, the discretionary powers, the three kinds of emergency and the office of the Vice-President', 'Part 2 at a glance');
const vHeads = table(['', 'President', 'Prime Minister'], [
  ['Role', 'Head of State', 'Head of government'],
  ['How chosen', 'Elected indirectly by an Electoral College', 'Leader who commands a majority in the Lok Sabha'],
  ['Power in practice', 'Mostly formal; acts on advice', 'Real executive power with the Council of Ministers'],
], 'Table contrasting the President as head of State, elected indirectly and acting on advice, with the Prime Minister as head of government who leads the majority and holds real power');
const vQuals = table(['Condition', 'President', 'Vice-President'], [
  ['Citizenship', 'Citizen of India', 'Citizen of India'],
  ['Minimum age', '35 years', '35 years'],
  ['Must be qualified for', 'The Lok Sabha', 'The Rajya Sabha'],
  ['Office of profit', 'Must not hold one', 'Must not hold one'],
], 'Table of qualifications: both offices need Indian citizenship, an age of at least 35 and no office of profit; the President must be qualified for the Lok Sabha and the Vice-President for the Rajya Sabha');
const vCollege = collegeSvg('Box diagram of the presidential Electoral College: elected members of the Lok Sabha, of the Rajya Sabha, of the State Legislative Assemblies and of the Delhi and Puducherry Assemblies feed into the Electoral College, which elects the President by single transferable vote; nominated members and Legislative Council members do not vote', 'Who votes for the President.');
const vWhyIndirect = flow('TB', ['The President is a constitutional head', 'Direct election could create a rival centre of power', 'A nationwide campaign would cost time and money', 'State legislators give the States a voice'], 'Flow of reasons for indirect election: the President is a constitutional head, direct election could create a rival to the Prime Minister, a national campaign would be costly, and State legislators give the States a voice', 'Four reasons to remember.');
const vVoters = table(['Imagined legislator', 'Votes for President?', 'Why'], [
  ['Elected member of the Lok Sabha', 'Yes', 'Elected member of Parliament'],
  ['Nominated member of the Rajya Sabha', 'No', 'Nominated, not elected'],
  ['Elected member of a State Assembly', 'Yes', 'Elected member of a State Assembly'],
  ['Member of a State Legislative Council', 'No', 'Councils are not in the College'],
  ['Elected member of the Delhi Assembly', 'Yes', 'Added in 1992'],
], 'Worked example table: elected members of Parliament, of State Assemblies and of the Delhi Assembly vote for the President; nominated members and Legislative Council members do not');
const vImp = flow('TB', ['Charge of violating the Constitution', `Notice signed by at least one-fourth of the members of one House, 14 days ahead`, 'That House passes it by two-thirds of its total membership', 'The other House investigates; the President may defend himself', 'The other House also passes it by two-thirds: the President is removed'], 'Flow of impeachment: a charge of violating the Constitution, notice signed by one-fourth of a House fourteen days ahead, passage by two-thirds of that House, investigation by the other House with a right of defence, and removal if the other House also passes it by two-thirds', 'Article 61.');
const vImpNumbers = table(['House (membership used)', 'One-fourth to sign the notice', 'Two-thirds to pass'], [
  [`Lok Sabha (${LS})`, String(quarter(LS)), String(twoThirds(LS))],
  [`Rajya Sabha (${RS})`, String(quarter(RS)), String(twoThirds(RS))],
], `Worked example table: with ${LS} members the Lok Sabha needs ${quarter(LS)} signatures and ${twoThirds(LS)} votes; with ${RS} members the Rajya Sabha needs ${quarter(RS)} signatures and ${twoThirds(RS)} votes`, 'Counts are rounded up to whole members.');
assert.equal(twoThirds(LS), 362);
const vExec = table(['Executive power', 'Example'], [
  ['Appointments', 'Prime Minister and ministers, judges, Governors, Attorney General, Comptroller and Auditor General'],
  ['Administration', 'All executive action is taken in the President\'s name'],
  ['Defence', 'Supreme Commander of the Army, Navy and Air Force'],
  ['Foreign affairs', 'Ambassadors are sent and received in the President\'s name'],
], 'Table of executive powers of the President: appointments of top officials, administration in his name, supreme command of the defence forces, and foreign affairs');
const vLegis = table(['Legislative power', 'Example'], [
  ['Meetings of Parliament', 'Summons and prorogues the Houses; dissolves the Lok Sabha'],
  ['Address', 'Speaks to both Houses after each general election and at the first session of each year'],
  ['Nomination', 'Names 12 members of the Rajya Sabha'],
  ['Assent', 'Assents to bills, withholds assent or returns an ordinary bill once'],
  ['Ordinances', 'Makes temporary laws when Parliament is not in session'],
], 'Table of legislative powers: summoning, proroguing and dissolving, addressing both Houses, nominating twelve Rajya Sabha members, assent to bills and ordinances');
const vVeto = table(['Veto', 'What the President does', 'Result'], [
  ['Absolute', 'Withholds assent', 'The bill does not become law'],
  ['Suspensive', 'Returns an ordinary bill once', 'If passed again, assent must follow'],
  ['Pocket', 'Takes no decision', 'The bill stays pending; no time limit is fixed'],
], 'Table of the three vetoes: absolute (assent withheld), suspensive (an ordinary bill returned once, assent must follow if it is passed again) and pocket (no decision taken)');
const vOrd = flow('LR', ['Parliament not in session', 'Urgent need; ministers advise', 'President issues an ordinance', 'Laid before Parliament on reassembly', `Lapses ${ORD_WEEKS} weeks later unless approved`], `Flow of an ordinance: Parliament not in session, urgent need with ministerial advice, the ordinance is issued, laid before Parliament when it meets, and lapses ${ORD_WEEKS} weeks after reassembly unless approved`, 'Article 123.');
const vFin = table(['Financial power', 'Example'], [
  ['Money Bills', 'Introduced only on the President\'s recommendation'],
  ['Budget', 'The annual financial statement is laid before Parliament in his name'],
  ['Contingency Fund', 'Advances for unforeseen expenses before Parliament approves'],
  ['Finance Commission', 'Appointed every five years to advise on sharing revenue with the States'],
], 'Table of financial powers: recommending Money Bills, causing the budget to be laid, advancing money from the Contingency Fund and appointing the Finance Commission');
const vSum1 = flow('TB', ['Qualifications and indirect election', 'Electoral College of elected legislators', 'Impeachment by two-thirds of each House', 'Powers exercised on ministerial advice'], 'Summary flow of Part 1: qualifications and indirect election, the Electoral College of elected legislators, impeachment by two-thirds of each House, and powers used on ministerial advice', 'Part 1 in four lines.');
const vMercy = table(['Form of mercy', 'Meaning'], [
  ['Pardon', 'Frees the convict from the sentence and its consequences'],
  ['Commutation', 'Changes the punishment into a lighter form'],
  ['Remission', 'Shortens the period without changing the kind of punishment'],
  ['Respite', 'Gives a lesser sentence because of a special fact, such as illness'],
  ['Reprieve', 'Delays the carrying out of a sentence for a time'],
], 'Table of the five forms of mercy under Article 72: pardon, commutation, remission, respite and reprieve, with the meaning of each');
const vMercyCases = table(['Imagined case', 'Form used'], [
  ['A ten-year sentence is cut to six years', 'Remission'],
  ['A sentence of hard labour becomes simple imprisonment', 'Commutation'],
  ['A hanging is delayed while a petition is heard', 'Reprieve'],
  ['A pregnant convict is given a lighter sentence', 'Respite'],
], 'Worked example table matching imagined cases to forms of mercy: a shortened term is remission, a lighter kind of punishment is commutation, a delay is a reprieve, and a lighter sentence for a special reason is a respite');
const vDiscretion = flow('TB', ['Hung Lok Sabha: choosing a Prime Minister', 'Returning advice once for reconsideration', 'Keeping a bill pending (pocket veto)', 'Seeking information from the Prime Minister'], 'Flow of situations where the President uses some discretion: choosing a Prime Minister in a hung Lok Sabha, returning advice once, keeping a bill pending, and seeking information from the Prime Minister', 'Situational discretion.');
const vAdvice = flow('LR', ['1950: Constitution provides a Council of Ministers to aid and advise', '1976: 42nd Amendment makes the advice binding', '1978: 44th Amendment allows one return for reconsideration'], 'Timeline flow on ministerial advice: in 1950 the Constitution provides a Council of Ministers to aid and advise; in 1976 the 42nd Amendment makes advice binding; in 1978 the 44th Amendment allows advice to be returned once', 'Article 74 over time.');
const vEmerg = table(['', 'National emergency', 'President\'s Rule', 'Financial emergency'], [
  ['Article', '352', '356', '360'],
  ['Ground', 'War, external aggression or armed rebellion', 'Failure of constitutional machinery in a State', 'Threat to financial stability or credit of India'],
  ['Parliament\'s approval', `Within ${N_EMERG_APPROVAL_MONTHS} month`, `Within ${PR_APPROVAL_MONTHS} months`, `Within ${PR_APPROVAL_MONTHS} months`],
  ['Two effects', 'Laws on State subjects; directions to States', 'Union runs the State; Parliament makes its laws', 'Salary cuts; State Money Bills reserved'],
], 'Table comparing the three emergencies: Article 352 national emergency for war, aggression or armed rebellion, approved within one month; Article 356 President\'s Rule for failure of State machinery and Article 360 financial emergency for a financial threat, each approved within two months; with two effects of each');
const vNational = flow('TB', ['Cabinet decides and informs the President in writing', 'President proclaims the emergency', `Both Houses approve within ${N_EMERG_APPROVAL_MONTHS} month by a special majority`, 'Federal system works like a unitary one'], 'Flow of a national emergency: the Cabinet\'s written decision, the proclamation, approval by both Houses within one month by special majority, and the federal system working like a unitary one', 'Safeguards added in 1978.');
const vPR = flow('LR', ['Governor reports a breakdown', 'President proclaims President\'s Rule', `Parliament approves within ${PR_APPROVAL_MONTHS} months`, 'Governor runs the State for the Union', 'Assembly suspended or dissolved'], `Flow of President\'s Rule: the Governor reports a breakdown, the proclamation, approval by Parliament within ${PR_APPROVAL_MONTHS} months, the Governor running the State for the Union, and the Assembly suspended or dissolved`, 'Article 356.');
const vFinEm = table(['Effect of a financial emergency', 'Example'], [
  ['Salaries', 'Pay of Union and State employees and of judges may be reduced'],
  ['State Money Bills', 'May be reserved for the President\'s consideration'],
  ['Directions', 'The Union may direct States to follow financial discipline'],
], 'Table of effects of a financial emergency: salaries including those of judges may be cut, State Money Bills may be reserved for the President, and States may be directed to follow financial discipline');
const vPresVp = table(['Point', 'President', 'Vice-President'], [
  ['Electors', 'Elected MPs and elected members of State, Delhi and Puducherry Assemblies', 'All MPs, elected and nominated'],
  ['Method', 'Single transferable vote, secret ballot', 'Single transferable vote, secret ballot'],
  ['Term', 'Five years', 'Five years'],
  ['Removal', 'Impeachment by two-thirds of each House', 'Rajya Sabha resolution by majority of all members, agreed by the Lok Sabha'],
], 'Table comparing the President and the Vice-President on electors, method, term and removal');
const vVpRemove = flow('LR', ['Notice of 14 days', `Rajya Sabha passes it by a majority of all its members (${majorityOfAll(RS)} of ${RS})`, 'Lok Sabha agrees', 'Vice-President leaves office'], `Flow of the removal of the Vice-President: fourteen days\' notice, a Rajya Sabha resolution passed by a majority of all its members (${majorityOfAll(RS)} of ${RS} in the example), agreement by the Lok Sabha, and removal`, 'No impeachment for the Vice-President.');
const vPlan = table(['Part', 'Marks', 'Plan'], [
  ['(i) Grounds and Articles', '3', 'One line for each of the three emergencies'],
  ['(ii) National emergency', '3', 'Two effects and one safeguard'],
  ['(iii) Other emergencies', '4', 'Two effects each of President\'s Rule and a financial emergency'],
], 'Worked example table planning a ten-mark answer on emergencies: three marks for grounds and Articles, three for national emergency effects and a safeguard, four for effects of the other two');
const vSum2 = flow('TB', ['Article 72 mercy powers', 'Discretion in a hung House and one return of advice', 'Emergencies under Articles 352, 356 and 360', 'Vice-President: Chairman of the Rajya Sabha and acting President'], 'Summary flow of Part 2: mercy powers under Article 72, discretion in a hung House and one return of advice, the three emergencies, and the Vice-President\'s roles', 'Part 2 in four lines.');

// A small chart: votes needed versus House size, as bars.
const vBars = (() => {
  const s = new Svg(660, 210);
  const W = (n) => (n / 550) * 420;
  const rows = [['Lok Sabha notice', quarter(LS), 'accent'], ['Lok Sabha passing', twoThirds(LS), 'accent'], ['Rajya Sabha notice', quarter(RS), 'blue'], ['Rajya Sabha passing', twoThirds(RS), 'blue']];
  rows.forEach(([lab, n, col], i) => {
    const y = 20 + i * 42;
    s.text(20, y + 14, lab, { anchor: 'start', size: 12, bold: true });
    s.rect(170, y, W(n), 28, { rx: 4, fill: col, fillOpacity: 0.4, color: col, sw: 1.4 });
    s.text(170 + W(n) + 8, y + 14, String(n), { anchor: 'start', size: 12 });
  });
  s.text(170, 196, 'Members needed (memberships of 543 and 245 used)', { anchor: 'start', size: 11, muted: true });
  return s.visual(`Bar chart of members needed for impeachment: ${quarter(LS)} to sign and ${twoThirds(LS)} to pass in a Lok Sabha of ${LS}; ${quarter(RS)} to sign and ${twoThirds(RS)} to pass in a Rajya Sabha of ${RS}`, 'Impeachment needs large numbers in both Houses.');
})();

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The President — Part 1: Election, Impeachment and Powers',
  goals: [
    'State the qualifications of the President and describe the Electoral College',
    'Give reasons for the indirect election and state the term of office',
    'Describe the ground and procedure of impeachment',
    'Explain the executive, legislative and financial powers of the President',
  ],
  slides: [
    sl('title', 'The President and the Vice-President', {
      b: 'Part 1 — who becomes **President**, how the President is **elected** and **removed**, and what **powers** the office holds.',
      v: vRoute1,
      n: 'Every law in India is signed by one person, and every government order is issued in that person\'s name. That person is the President of India. Yet the President rarely takes decisions alone. In this chapter we find out who can become President, who votes in the election, how a President can be removed, and how the President\'s many powers are actually used.',
    }),
    sl('diagram', 'Head of State and head of government', {
      b: 'India follows the **parliamentary** system: the President is the **head of State**, the Prime Minister the **head of government**.',
      v: vHeads,
      n: 'India has two heads. The President is the head of State, the face of the nation and the name in which the government acts. The Prime Minister is the head of government, who leads the party or alliance with a majority in the Lok Sabha. Real executive power lies with the Prime Minister and the Council of Ministers, while the President acts on their advice.',
    }),
    sl('diagram', 'Who can become President?', {
      b: 'Four conditions, set by the Constitution.',
      v: vQuals,
      n: 'To become President, a person must be a citizen of India, must have completed thirty-five years of age, and must be qualified to become a member of the Lok Sabha. The person must not hold an office of profit under the Union, a State or a local body. Offices such as minister or Governor do not count as offices of profit for this rule.',
    }),
    sl('check', 'Quick check: two heads', {
      b: 'Which office is the head of State in India?',
      chk: 'm_head_state',
      n: 'Remember the difference between the head of State and the head of government. Which one is the President?',
    }),
    sl('diagram', 'The Electoral College', {
      b: 'Only **elected** legislators vote: Parliament, State Assemblies, and the Assemblies of **Delhi** and **Puducherry** (since **1992**).',
      v: vCollege,
      n: 'The President is not chosen by the people directly. An Electoral College votes instead. It has the elected members of both Houses of Parliament, the elected members of every State Legislative Assembly, and, since nineteen ninety-two, the elected members of the Delhi and Puducherry Assemblies. Nominated members and members of Legislative Councils have no vote. Voting is by the single transferable vote and a secret ballot.',
    }),
    sl('concept', 'Why an indirect election?', {
      b: 'The framers wanted a **constitutional head**, not a rival to the Prime Minister.',
      v: vWhyIndirect,
      n: 'Why not let the people vote directly? First, the President is only a constitutional head, and a direct mandate might suggest real power. Second, a directly elected President might clash with the Prime Minister. Third, a nationwide campaign for a ceremonial office would be costly. Finally, including State legislators gives every State a voice, which suits a federal country.',
    }),
    sl('check', 'Quick check: leaving office early', {
      b: 'To whom does a President write when resigning?',
      chk: 'm_term_resign',
      n: 'The President serves five years and can be re-elected. But who receives the letter if a President decides to resign early?',
    }),
    sl('example', 'Worked example 1: who votes?', {
      b: 'Sort five imagined legislators.',
      bl: ['Ask: is the member **elected**?', 'Ask: is the body **Parliament**, a **State Assembly**, or the **Delhi** or **Puducherry** Assembly?', 'Councils and nominated members are always **out**.'],
      v: vVoters,
      n: 'Let us test the rule with five imagined legislators. An elected Lok Sabha member votes. A nominated Rajya Sabha member does not, because only elected members vote. An elected member of a State Assembly votes. A member of a State Legislative Council does not vote at all. An elected member of the Delhi Assembly votes, thanks to the change made in nineteen ninety-two.',
    }),
    sl('diagram', 'Impeachment', {
      b: 'The only ground is **violation of the Constitution** (Article 61).',
      v: vImp,
      n: 'A President can be removed before the end of the term only by impeachment, and only for violating the Constitution. Either House can start it. A notice signed by at least one-fourth of the members is given fourteen days ahead. That House must pass the charge by two-thirds of its total membership. The other House investigates, the President may defend himself, and a second two-thirds vote removes him.',
    }),
    sl('example', 'Worked example 2: counting the votes', {
      b: 'Use the **total membership**, and round **up**.',
      v: vImpNumbers,
      n: 'Let us count. In a Lok Sabha of five hundred and forty-three members, one-fourth is a little under one hundred and thirty-six, so at least one hundred and thirty-six must sign. Two-thirds is three hundred and sixty-two. In a Rajya Sabha of two hundred and forty-five, sixty-two must sign and one hundred and sixty-four must vote in favour. These large numbers protect the office.',
    }),
    sl('diagram', 'How hard is impeachment?', {
      v: vBars,
      n: 'This chart shows the numbers side by side. Passing the charge needs far more members than signing the notice, and it must happen in both Houses. Note that nominated members of Parliament take part in impeachment even though they cannot vote in the election, while State legislators vote in the election but have no part in impeachment.',
    }),
    sl('check', 'Quick check: the only ground', {
      b: 'On what ground can impeachment begin?',
      chk: 'm_imp_ground',
      n: 'There is only one ground for impeachment. Can you name it?',
    }),
    sl('diagram', 'Executive powers', {
      b: 'All executive action is taken in the President\'s **name**.',
      v: vExec,
      n: 'The executive power of the Union belongs to the President. The President appoints the Prime Minister and, on his advice, the other ministers. Judges, Governors, the Attorney General and the Comptroller and Auditor General are also appointed by the President. The President is the Supreme Commander of the defence forces, and ambassadors act in the President\'s name. In practice, all this is done on the advice of the Council of Ministers.',
    }),
    sl('diagram', 'Legislative powers', {
      b: 'The President is a **part of Parliament**.',
      v: vLegis,
      n: 'Parliament consists of the President and the two Houses. The President summons and prorogues the Houses and can dissolve the Lok Sabha. The President addresses both Houses after each general election and at the first session every year, and nominates twelve members to the Rajya Sabha. No bill becomes law without the President\'s assent.',
    }),
    sl('diagram', 'Three kinds of veto', {
      v: vVeto,
      n: 'When a bill reaches the President, there are three ways to hold it back. Withholding assent is the absolute veto. Returning an ordinary bill once for reconsideration is the suspensive veto; if Parliament passes it again, the President must sign. Taking no decision at all is the pocket veto, possible because the Constitution sets no time limit.',
    }),
    sl('diagram', 'Ordinances', {
      b: 'Temporary laws under **Article 123**, made only when Parliament is **not in session**.',
      v: vOrd,
      n: 'Sometimes a law is needed urgently while Parliament is not sitting. The President, on the advice of ministers, can issue an ordinance, which has the same force as a law of Parliament. It must be placed before Parliament when it meets again, and it stops working six weeks after Parliament reassembles unless it is approved.',
    }),
    sl('check', 'Quick check: dissolving a House', {
      b: 'Which House can the President dissolve?',
      chk: 'm_dissolve',
      n: 'One House is permanent and one is not. Which House can the President dissolve?',
    }),
    sl('diagram', 'Financial powers', {
      v: vFin,
      n: 'The President also has financial powers. A Money Bill can be introduced only on the President\'s recommendation. The budget is laid before Parliament in the President\'s name. In a sudden crisis, the President can make advances from the Contingency Fund of India. Every five years, the President appoints a Finance Commission to advise on how revenue is shared with the States.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      bl: [
        'Citizen, 35 years, qualified for the Lok Sabha, no office of profit.',
        'Elected by elected MPs and elected members of State, Delhi and Puducherry Assemblies; five-year term; may be re-elected.',
        'Impeachment only for violating the Constitution: one-fourth to sign, two-thirds of each House to pass.',
        'Executive, legislative and financial powers are used on ministerial advice.',
      ],
      n: 'To sum up Part 1. The President must be a citizen, at least thirty-five, qualified for the Lok Sabha and free of any office of profit. Elected legislators form the Electoral College. Impeachment is possible only for violating the Constitution and needs two-thirds of each House. The President has wide executive, legislative and financial powers, but uses them on the advice of ministers.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Do not include nominated members or Legislative Councils in the Electoral College.',
        'Impeachment uses **two-thirds of the total membership**, not of members present.',
        'Do not confuse the age for the Lok Sabha (25) with the President (35).',
        'An ordinance lapses six weeks after Parliament **reassembles**.',
        '10-mark answers: one clear point per mark in each part.',
      ],
      n: 'A few tips. Leave nominated members and Legislative Councils out of the Electoral College. For impeachment, say two-thirds of the total membership of each House. Keep the ages straight: twenty-five for the Lok Sabha, thirty-five for the President. Count the six weeks for an ordinance from the day Parliament reassembles. And in long answers, give one clear point for every mark.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The President — Part 2: Mercy, Discretion, Emergencies and the Vice-President',
  goals: [
    'Explain the President\'s power to grant pardon, reprieve and remission',
    'Identify situations in which the President may use discretion',
    'Distinguish the three emergencies by ground and state two effects of each',
    'Describe the qualifications, election, removal and roles of the Vice-President',
  ],
  slides: [
    sl('title', 'Mercy, discretion, emergencies and the Vice-President', {
      b: 'Part 2 — the President\'s **judicial**, **discretionary** and **emergency** powers, and the office of the **Vice-President**.',
      v: vRoute2,
      n: 'In Part 1 we saw how the President is elected and the ordinary powers of the office. Now we turn to powers that come into play in special moments: showing mercy to a convict, choosing a Prime Minister when no party has a majority, and declaring an emergency. We end with the Vice-President, the second highest office in the country.',
    }),
    sl('diagram', 'Judicial power: Article 72', {
      b: 'The President can show **mercy**, even in death-sentence and court-martial cases.',
      v: vMercy,
      n: 'Under Article seventy-two, the President can grant mercy to a person convicted of an offence, acting on the advice of the government. There are five forms. A pardon frees the person completely. Commutation changes the punishment to a lighter kind. Remission shortens the period. A respite gives a lighter sentence for a special reason. A reprieve delays the sentence for a time.',
    }),
    sl('example', 'Worked example 3: which form of mercy?', {
      b: 'Match each imagined case to the right word.',
      v: vMercyCases,
      n: 'Try four imagined cases. A ten-year sentence cut to six years is remission, because only the length changes. Hard labour turned into simple imprisonment is commutation, because the kind of punishment changes. A hanging delayed while a petition is heard is a reprieve. A lighter sentence for a pregnant convict is a respite.',
    }),
    sl('check', 'Quick check: the Article', {
      b: 'Which Article gives the President the power of mercy?',
      chk: 'm_pardon_art',
      n: 'Recall the Article number that gives the President the power to grant mercy.',
    }),
    sl('concept', 'Discretionary powers', {
      b: 'Not written as a list, but they arise in **situations**.',
      v: vDiscretion,
      n: 'The President usually acts on advice, but some situations leave room for judgement. If no party has a majority after an election, the President chooses the leader most likely to win the confidence of the Lok Sabha. The President can return advice once for reconsideration, keep a bill pending, and ask the Prime Minister for information about the government\'s work.',
    }),
    sl('diagram', 'Advice: how the rule changed', {
      v: vAdvice,
      n: 'Article seventy-four has changed over time. The original Constitution simply said there would be a Council of Ministers to aid and advise the President. In nineteen seventy-six, the forty-second Amendment made that advice binding. In nineteen seventy-eight, the forty-fourth Amendment added that the President may send the advice back once; after reconsideration, the President must act on it.',
    }),
    sl('diagram', 'Three kinds of emergency', {
      b: 'Know the **Article**, the **ground**, the **approval period** and **two effects** of each.',
      v: vEmerg,
      n: 'The Constitution provides three kinds of emergency. A national emergency, under Article three hundred and fifty-two, is for war, external aggression or armed rebellion. President\'s Rule, under Article three hundred and fifty-six, is for a breakdown of government in a State. A financial emergency, under Article three hundred and sixty, is for a threat to India\'s financial stability or credit.',
    }),
    sl('diagram', 'National emergency', {
      b: 'Safeguards since **1978**: a **written** Cabinet decision and approval within **one month**.',
      v: vNational,
      n: 'After the forty-fourth Amendment, the President can proclaim a national emergency only when the Cabinet\'s decision is given in writing, and both Houses must approve it within one month by a special majority. During the emergency, Parliament can make laws on State subjects and the Union can direct the States. The freedoms of Article nineteen can be suspended if the emergency is due to war or external aggression.',
    }),
    sl('check', 'Quick check: a changed word', {
      b: 'Which words replaced "internal disturbance" in Article 352?',
      chk: 'fb_armed',
      n: 'The forty-fourth Amendment narrowed one of the grounds for a national emergency. What is the new wording?',
    }),
    sl('diagram', 'President\'s Rule in a State', {
      v: vPR,
      n: 'When the government of a State cannot be carried on according to the Constitution, the President may take over. Usually the Governor sends a report first. Parliament must approve the proclamation within two months. The Governor then runs the State on behalf of the Union, Parliament makes laws for the State, and the State Assembly is suspended or dissolved.',
    }),
    sl('diagram', 'Financial emergency', {
      b: 'Article 360 had never been used (as of 2024).',
      v: vFinEm,
      n: 'A financial emergency can be declared when the financial stability or credit of India is threatened. Parliament must approve it within two months. The Union can then order cuts in the salaries of government servants, including judges, and can require State Money Bills to be reserved for the President. This provision had never been used, as of twenty twenty-four.',
    }),
    sl('check', 'Quick check: effects of Article 360', {
      b: 'Which is an effect of a financial emergency?',
      chk: 'm_360_effect',
      n: 'Think about money. Which of the options is an effect of a financial emergency?',
    }),
    sl('diagram', 'The Vice-President', {
      b: 'Same age and term as the President, but chosen by **Parliament alone**.',
      v: vPresVp,
      n: 'The Vice-President must be a citizen, at least thirty-five, qualified for the Rajya Sabha, and free of any office of profit. The Vice-President is elected by all members of both Houses of Parliament, including nominated members, by the single transferable vote and secret ballot, for a term of five years. State legislators do not take part.',
    }),
    sl('diagram', 'Removing the Vice-President', {
      b: 'Not impeachment: a **Rajya Sabha** resolution agreed to by the **Lok Sabha**.',
      v: vVpRemove,
      n: 'The Vice-President is not impeached. After fourteen days\' notice, the Rajya Sabha passes a resolution by a majority of all its members, and the Lok Sabha must agree to it. The Vice-President is the ex-officio Chairman of the Rajya Sabha but is not a member of it, and acts as President if that office falls vacant, until a new President is elected within six months.',
    }),
    sl('check', 'Quick check: a sudden vacancy', {
      b: 'What happens when the office of President falls vacant?',
      chk: 'm_vp_acting',
      n: 'Suppose the office of President suddenly becomes vacant. Who steps in, and for how long?',
    }),
    sl('example', 'Worked example 4: planning a 10-mark answer', {
      b: 'Question: grounds and effects of the three emergencies (3 + 3 + 4).',
      v: vPlan,
      n: 'Here is how to plan a ten-mark answer on emergencies. For part one, write one line for each emergency, giving its Article and ground. For part two, give two effects of a national emergency and one safeguard from the forty-fourth Amendment. For part three, give two effects each for President\'s Rule and a financial emergency. One point for each mark.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      bl: [
        'Article 72: pardon, commutation, remission, respite, reprieve.',
        'Discretion: hung Lok Sabha, one return of advice (44th Amendment), pocket veto.',
        'Emergencies: 352 (one month), 356 and 360 (two months), each with its own effects.',
        'Vice-President: elected by all MPs; removed by a Rajya Sabha resolution agreed by the Lok Sabha; Chairman of the Rajya Sabha; acting President.',
      ],
      n: 'To sum up Part 2. The President can grant five forms of mercy under Article seventy-two. Discretion appears in a hung House, in returning advice once, and in the pocket veto. There are three emergencies, each with its own ground, approval period and effects. The Vice-President is elected by Parliament, chairs the Rajya Sabha and can act as President.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Use "armed rebellion", not "internal disturbance", for Article 352.',
        'National emergency: approval within one month; the other two within two months.',
        'Do not say the Vice-President is impeached.',
        'Do not call the Vice-President a member of the Rajya Sabha.',
        'For mercy, explain the difference between remission and commutation.',
      ],
      n: 'Some final tips. Write armed rebellion, not internal disturbance, as a ground for national emergency. Remember the approval periods: one month for a national emergency and two months for the other two. Never say the Vice-President is impeached or is a member of the Rajya Sabha. And when asked about mercy, explain how remission differs from commutation.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The President and the Vice-President — notes',
  sections: [
    {
      h: '1. Qualifications, election and term',
      t: 1,
      b: '- **Qualifications:** citizen of India; completed **35 years**; qualified for election to the **Lok Sabha**; no **office of profit** (posts such as minister, Governor or Vice-President are not counted).\n- **Electoral College:** **elected** members of both Houses of Parliament, **elected** members of State Legislative Assemblies and of the **Delhi** and **Puducherry** Assemblies (**70th Amendment, 1992**). Nominated members and Legislative Councils are excluded.\n- **Method:** proportional representation by **single transferable vote**, secret ballot; the value of an MLA\'s vote depends on the State\'s population.\n- **Why indirect:** constitutional head; no rival to the Prime Minister; cost of a national campaign; a voice for the States.\n- **Term:** five years; may be re-elected; resignation is addressed to the Vice-President.',
      terms: [['Electoral College', 'The body of elected legislators that elects the President.'], ['Office of profit', 'A paid government post that disqualifies a person from election.']],
      v: vQuals,
      vs: [vCollege],
    },
    {
      h: '2. Impeachment',
      t: 2,
      b: '- **Ground:** violation of the Constitution only (**Article 61**).\n- **Notice:** in either House, signed by at least **one-fourth** of its total members, **14 days** in advance.\n- **First House:** resolution passed by **two-thirds of its total membership**.\n- **Second House:** investigates; the President may appear or be represented; if it also passes the resolution by two-thirds of its total membership, the President is removed.\n- Nominated MPs **take part**; State legislators **do not**.',
      terms: [['Impeachment', 'The quasi-judicial procedure by which Parliament removes a President for violating the Constitution.']],
      v: vImp,
      vs: [vImpNumbers],
    },
    {
      h: '3. Executive, legislative and financial powers',
      t: 3,
      b: '- **Executive:** appoints the Prime Minister and ministers, judges, Governors, Attorney General, Comptroller and Auditor General, Election Commissioners; Supreme Commander of the defence forces.\n- **Legislative:** summons and prorogues the Houses; dissolves the Lok Sabha; special address (Article 87); nominates **12** members to the Rajya Sabha; assent, withholding of assent or return of an ordinary bill once; **ordinances** under **Article 123**, which lapse six weeks after Parliament reassembles.\n- **Financial:** recommendation for Money Bills; budget laid in his name; advances from the **Contingency Fund**; appoints the **Finance Commission** every five years.\n- All are used on the **advice of the Council of Ministers** (Article 74).',
      terms: [['Ordinance', 'A temporary law made by the President while Parliament is not in session.'], ['Pocket veto', 'Keeping a bill pending without a decision, since no time limit is fixed.']],
      v: vLegis,
      vs: [vVeto, vFin],
    },
    {
      h: '4. Judicial and discretionary powers',
      t: 4,
      b: '- **Article 72:** pardon, commutation, remission, respite and reprieve, including death sentences and court-martial cases.\n- **Discretion (situational):** choosing a Prime Minister when no party has a majority; returning advice **once** for reconsideration (44th Amendment, 1978); the pocket veto; seeking information from the Prime Minister.\n- The **42nd Amendment (1976)** made ministerial advice binding; the **44th** allowed one return.',
      terms: [['Commutation', 'Replacing a punishment with a lighter kind.'], ['Situational discretion', 'Judgement the President uses when the usual advice does not settle the matter.']],
      v: vMercy,
      vs: [vAdvice],
    },
    {
      h: '5. Emergency powers',
      t: 5,
      b: '- **Article 352 (national emergency):** war, external aggression or **armed rebellion**; written Cabinet decision; approval within **one month** by special majority. Effects: Parliament legislates on the **State List**; the Union directs States; Article 19 freedoms can be suspended in a war emergency; the Lok Sabha term can be extended one year at a time.\n- **Article 356 (President\'s Rule):** failure of the constitutional machinery in a State; approval within **two months**. Effects: the Union takes over the State executive through the Governor; Parliament makes the State\'s laws; the Assembly is suspended or dissolved.\n- **Article 360 (financial emergency):** threat to financial stability or credit; approval within **two months**. Effects: salary cuts including judges; State Money Bills reserved for the President. Never proclaimed (as of 2024).',
      terms: [['Armed rebellion', 'The ground that replaced internal disturbance in Article 352 in 1978.'], ['President\'s Rule', 'Union rule in a State under Article 356.']],
      v: vEmerg,
      vs: [vPR, vFinEm],
    },
    {
      h: '6. The Vice-President',
      t: 6,
      b: '- **Qualifications:** citizen; **35 years**; qualified for the **Rajya Sabha**; no office of profit.\n- **Election:** all members of both Houses of Parliament, **elected and nominated**; single transferable vote, secret ballot; **five-year** term.\n- **Removal:** resolution of the **Rajya Sabha** passed by a majority of all its then members and **agreed to by the Lok Sabha**; **14 days\'** notice. No impeachment.\n- **Roles:** ex-officio **Chairman of the Rajya Sabha** (not a member; casting vote in a tie); **acts as President** during a vacancy (to be filled within six months) or absence, and then does not preside over the Rajya Sabha.',
      terms: [['Ex-officio', 'Holding a post because of another office held.'], ['Effective majority', 'A majority of all the then members of a House.']],
      v: vPresVp,
      vs: [vVpRemove],
    },
  ],
  tips: '**Common mistakes**\n- Including nominated members or Legislative Councils in the presidential Electoral College.\n- Writing "members present" instead of "total membership" for impeachment.\n- Using "internal disturbance" for Article 352 today.\n- Calling the Vice-President a member of the Rajya Sabha, or saying he is impeached.\n- Forgetting that a Money Bill cannot be returned.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the last part usually asks for a reason, a comparison or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Head of State and head of government', 'President; Prime Minister.', 'concept', 3],
  ['Minimum age for President', '**35 years**.', 'fact', 1],
  ['President must be qualified for which House?', 'The **Lok Sabha**.', 'fact', 1],
  ['Who is NOT in the presidential Electoral College?', 'Nominated members and members of Legislative Councils.', 'concept', 1],
  ['Amendment adding Delhi and Puducherry to the Electoral College', '**70th Amendment (1992)**.', 'fact', 1],
  ['Method of presidential election', 'Single transferable vote; secret ballot.', 'fact', 1],
  ['Term of the President', 'Five years; may be re-elected.', 'fact', 1],
  ['Resignation of the President is addressed to', 'The **Vice-President**.', 'fact', 1],
  ['Ground for impeachment', '**Violation of the Constitution** (Article 61).', 'fact', 2],
  ['Impeachment notice', 'Signed by **one-fourth** of the House; **14 days** ahead.', 'fact', 2],
  ['Impeachment majority', '**Two-thirds of the total membership** of each House.', 'fact', 2],
  ['Do nominated MPs take part in impeachment?', '**Yes**, though they do not vote in the election.', 'exam-tip', 2],
  ['Ordinance: Article and lapse', 'Article **123**; lapses six weeks after Parliament reassembles.', 'fact', 3],
  ['Absolute veto', 'Assent withheld.', 'definition', 3],
  ['Suspensive veto', 'Ordinary bill returned once; assent must follow if it is passed again.', 'definition', 3],
  ['Pocket veto', 'No decision on a bill; no time limit is fixed.', 'definition', 3],
  ['Members nominated by the President to the Rajya Sabha', '**12**.', 'fact', 3],
  ['Contingency Fund of India', 'At the President\'s disposal for unforeseen expenses.', 'fact', 3],
  ['Article 72', 'Pardon, commutation, remission, respite, reprieve.', 'fact', 4],
  ['Remission vs commutation', 'Remission shortens the period; commutation lightens the kind of punishment.', 'concept', 4],
  ['44th Amendment and advice', 'Advice can be returned **once**; then it binds.', 'fact', 4],
  ['Discretion in a hung Lok Sabha', 'President chooses the leader most likely to win confidence.', 'concept', 4],
  ['Article 352 grounds', 'War, external aggression, **armed rebellion**.', 'fact', 5],
  ['Approval of a national emergency', 'Within **one month**, special majority.', 'fact', 5],
  ['Article 356 approval', 'Within **two months**.', 'fact', 5],
  ['Two effects of President\'s Rule', 'Union runs the State executive; Parliament makes its laws.', 'concept', 5],
  ['Two effects of a financial emergency', 'Salary cuts (including judges); State Money Bills reserved.', 'concept', 5],
  ['Who elects the Vice-President?', 'All MPs, elected and nominated.', 'fact', 6],
  ['Removal of the Vice-President', 'Rajya Sabha resolution (majority of all members), agreed by the Lok Sabha.', 'fact', 6],
  ['Vice-President when acting as President', 'Does not preside over the Rajya Sabha; vacancy filled within six months.', 'exam-tip', 6],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — The President and the Vice-President',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_age', 'm_college_who', 'm_ordinance_when', 'm_352_ground', 'm_vp_house', 'ar_indirect', 's_indirect_two', 's_352_effects'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_impeachment', 'l_vp'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — The President and the Vice-President',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_qual_house', 'm_nominated_vote', 'm_imp_notice', 'm_appoint', 'm_pocket_veto', 'm_commute', 'm_hung', 'm_356_case', 'm_vp_remove', 'ar_19', 's_college_parts', 's_ordinance_meaning', 's_pardon_forms', 's_356_effects', 's_vp_two_roles'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_election', 'l_legis_powers', 'l_emergency'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of icse-10-history-civics-ch03 only (qualifications, Electoral College, indirect election and term; impeachment; executive, legislative and financial powers; judicial and discretionary powers; the three emergencies with two effects each; the Vice-President)',
    originality: 'every scenario, diary, note and report is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no real person quoted; no current office-holder named',
    data: `impeachment counts computed: one-fourth and two-thirds of ${LS} (${quarter(LS)}, ${twoThirds(LS)}) and of ${RS} (${quarter(RS)}, ${twoThirds(RS)}); majority of all members of ${RS} is ${majorityOfAll(RS)}`,
    facts: 'President: citizen, 35, qualified for the Lok Sabha, no office of profit; Electoral College of elected MPs and elected members of State, Delhi and Puducherry Assemblies (70th Amendment 1992); five-year term, re-eligible; impeachment under Article 61 for violation of the Constitution, notice by one-fourth with 14 days, two-thirds of total membership in each House; ordinances under Article 123 lapse six weeks after reassembly; Article 72 mercy; 42nd (1976) and 44th (1978) Amendments on advice; Article 352 (armed rebellion since 1978, written Cabinet decision, one month), 356 and 360 (two months); Vice-President: citizen, 35, qualified for the Rajya Sabha, elected by all MPs, removed by a Rajya Sabha resolution by majority of all members agreed by the Lok Sabha with 14 days notice',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
