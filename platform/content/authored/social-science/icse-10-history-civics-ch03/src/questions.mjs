// ICSE 10 History & Civics, ch03 The President and the Vice-President — question bank.
// Every scenario, diary and imagined legislator is written by SOYL and labelled as imagined; no textbook text,
// box or exercise and no specimen or board-paper item is reused (D-036); no real person is quoted and no current
// office-holder is named. Facts are the stable provisions of the Constitution (Articles 52-72, 74, 85, 111, 123,
// 352, 356, 360; 42nd, 44th and 70th Amendments).
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real.)*';

// ---------------------------------------------------------------- figures used in items (asserted)
export const LS = 543; // Lok Sabha membership used in examples (present elected strength)
export const RS = 245; // Rajya Sabha membership used in examples (present strength)
export const quarter = (n) => Math.ceil(n / 4); // at least one-fourth of the total members
export const twoThirds = (n) => Math.ceil((2 * n) / 3); // at least two-thirds of the total membership
export const majorityOfAll = (n) => Math.floor(n / 2) + 1; // more than half of all the then members
assert.equal(quarter(LS), 136);
assert.equal(quarter(RS), 62);
assert.equal(twoThirds(LS), 362);
assert.equal(twoThirds(RS), 164);
assert.equal(majorityOfAll(RS), 123);
export const ORD_WEEKS = 6; // an ordinance lapses six weeks after Parliament reassembles
export const N_EMERG_APPROVAL_MONTHS = 1; // national emergency: approval within one month
export const PR_APPROVAL_MONTHS = 2; // President's Rule and financial emergency: within two months

/** Electoral College of the President as a box diagram (theme colours only). */
export function collegeSvg(alt, caption) {
  const s = new Svg(720, 300);
  const boxes = [
    ['Elected members', 'of the Lok Sabha', 20],
    ['Elected members', 'of the Rajya Sabha', 200],
    ['Elected members of', 'State Legislative Assemblies', 380],
    ['Elected members, Delhi', 'and Puducherry Assemblies', 560],
  ];
  boxes.forEach(([a, b, x]) => {
    s.rect(x, 20, 150, 62, { rx: 6, fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 1.5 });
    s.text(x + 75, 42, a, { size: 11 });
    s.text(x + 75, 62, b, { size: 11 });
    s.arrow(x + 75, 84, 360, 150, { sw: 1.4 });
  });
  s.rect(250, 152, 220, 44, { rx: 8, fill: 'blue', fillOpacity: 0.2, color: 'blue', sw: 1.8 });
  s.text(360, 174, 'Electoral College', { size: 14, bold: true });
  s.arrow(360, 198, 360, 236, { sw: 1.6 });
  s.text(360, 252, 'President (single transferable vote, secret ballot)', { size: 12, bold: true });
  s.text(360, 284, 'Not voters: nominated members of either House; members of Legislative Councils', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Qualifications, Electoral College, indirect election, term
Q('m_age', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What is the minimum age a citizen must have completed to be elected President of India?',
  opts: ['35 years', '25 years', '30 years', '40 years'],
  sol: 'The Constitution requires a presidential candidate to have completed 35 years. Twenty-five is the age for the Lok Sabha and thirty for the Rajya Sabha; forty is not a constitutional figure here.',
}));
Q('m_qual_house', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Besides citizenship and age, a presidential candidate must be qualified to become a member of which body?',
  opts: ['The Lok Sabha', 'The Rajya Sabha', 'A State Legislative Council', 'The Supreme Court'],
  sol: 'The President must be qualified for election as a member of the Lok Sabha. The Vice-President, by contrast, must be qualified for the Rajya Sabha. A Legislative Council and the Supreme Court are not mentioned in these qualifications.',
}));
Q('m_office_profit', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Ravindran, an imagined senior officer drawing a salary as a district collector, wishes to file nomination papers for the office of President while staying in his job. What does the Constitution say?',
  opts: [
    'He cannot be a candidate while holding an office of profit under the government',
    'He may contest because collectors are exempt from all conditions',
    'He may contest only if he is under 35 years of age',
    'He may contest only after serving in the Rajya Sabha',
  ],
  sol: 'A person holding an office of profit under the Union, a State or a local authority cannot be elected President. Offices such as minister, Governor or Vice-President are not counted as offices of profit for this rule, but a salaried government post is. The other options invent conditions.',
}));
Q('m_college_who', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined State has a Legislative Council as well as an Assembly. Which of its legislators take part in electing the President?',
  opts: [
    'Only the elected members of the Legislative Assembly',
    'All members of both the Assembly and the Council',
    'Only the members of the Legislative Council',
    'The nominated members of the Assembly and the Council',
  ],
  sol: 'The Electoral College includes only the elected members of the State Legislative Assemblies (and of both Houses of Parliament, and of the Delhi and Puducherry Assemblies). Members of Legislative Councils and nominated members have no vote in this election.',
  assets: [collegeSvg('Box diagram: elected members of the Lok Sabha, the Rajya Sabha, the State Legislative Assemblies and the Delhi and Puducherry Assemblies feed into the Electoral College, which elects the President; nominated members and Legislative Council members are noted as not voting', 'Who elects the President.')],
}));
Q('m_nominated_vote', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A member nominated to the Rajya Sabha for her work in classical music wants to vote in the presidential election. Which statement is correct?',
  opts: [
    'She cannot vote, because only elected members of Parliament form part of the Electoral College',
    'She can vote, because every member of Parliament votes',
    'She can vote only if the Speaker allows it',
    'She can vote twice, once in each House',
  ],
  sol: 'Nominated members of either House are not part of the Electoral College for the President, so she has no vote. Only elected members vote, once each.',
}));
Q('m_70th', mcq({
  t: 1, d: 3, c: 'recall',
  stem: 'Which constitutional amendment added the elected members of the Legislative Assemblies of the National Capital Territory of Delhi and of Puducherry to the presidential Electoral College?',
  opts: ['The 70th Amendment (1992)', 'The 42nd Amendment (1976)', 'The 44th Amendment (1978)', 'The 52nd Amendment (1985)'],
  sol: 'The 70th Amendment, in force from 1992, brought these two Union Territory assemblies into the Electoral College. The 42nd and 44th Amendments dealt with ministerial advice and emergency provisions; the 52nd Amendment is the Anti-Defection Law.',
}));
Q('m_term_resign', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A President decides to leave office before the five-year term ends. To whom must the letter of resignation be addressed?',
  opts: ['The Vice-President', 'The Prime Minister', 'The Chief Justice of India', 'The Speaker of the Lok Sabha'],
  sol: 'The President resigns by writing addressed to the Vice-President, who then informs the Speaker of the Lok Sabha. The Prime Minister and the Chief Justice do not receive it.',
}));
Q('ar_indirect', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The framers of the Constitution chose indirect election for the President rather than a direct vote by the people.',
  r: 'A directly elected President could claim a popular mandate of his own and come into conflict with a Prime Minister who also leads the elected majority.',
  sol: 'Both statements are true, and R gives a main reason for A: since real power lies with the Prime Minister and the Council of Ministers, a nominal head chosen by direct vote might rival them. Indirect election keeps the President a constitutional head.',
}));
Q('tf_reelect', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? A person who has completed a full term as President is eligible to be elected to the office again.',
  sol: 'The Constitution allows a President to be re-elected; it sets no limit on the number of terms.',
}));
Q('fb_term', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The President holds office for a term of ___ years from the date of entering upon office.',
  acc: [['five', '5']],
  sol: 'The term is five years, though the President may resign earlier or be removed by impeachment.',
}));
Q('s_indirect_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why the Constitution provides for the indirect election of the President.',
  model: '1. The President is only a **nominal (constitutional) head**; a direct election would suggest **real power** and could cause **conflict with the Prime Minister**.\n2. A nationwide direct election would be **costly and time-consuming** for a largely ceremonial office.',
  sol: 'Any two valid reasons, e.g. nominal head, avoiding rivalry with the Prime Minister, cost, representation of the States.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s_college_parts', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the groups of legislators whose votes make up the Electoral College for the President.',
  model: 'The **elected members of both Houses of Parliament**, the **elected members of the State Legislative Assemblies**, and the **elected members of the Legislative Assemblies of Delhi and Puducherry**.',
  sol: 'Parliament (elected), State Assemblies (elected), Delhi and Puducherry Assemblies (elected).',
  scheme: [['Elected members of both Houses of Parliament', 1], ['Elected members of State Assemblies and of the Delhi and Puducherry Assemblies', 1]],
}));
Q('s3_states_role', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why including the elected members of the State Legislative Assemblies in the Electoral College suits a federal country like India.',
  model: '1. The President is the head of the **whole Union**, which includes the **States**, so the States should have a say in choosing him.\n2. Including MLAs makes the President a representative of the **nation and the States**, not only of the party that controls Parliament.\n3. It reflects the **federal** principle and gives the office **wider acceptance** across regions.',
  sol: 'Three points linking State participation to federalism and to the President\'s national role.',
  scheme: [['Head of the Union including the States', 1], ['Not only the choice of the party in Parliament', 1], ['Federal principle and wider acceptance', 1]],
}));

// ================================================================ t02 Impeachment
Q('m_imp_ground', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'On what ground can impeachment proceedings be started against the President of India?',
  opts: ['Violation of the Constitution', 'Losing a vote in the Rajya Sabha', 'Disagreement with the Prime Minister', 'Completion of five years in office'],
  sol: 'Impeachment is possible only for violation of the Constitution. Votes in the Rajya Sabha, disagreements with the Prime Minister or the end of the term do not lead to impeachment.',
}));
Q('m_imp_notice', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Members of an imagined Lok Sabha with a total membership of ${LS} wish to bring an impeachment charge against the President. What is the least number of members who must sign the written notice?`,
  opts: [String(quarter(LS)), String(twoThirds(LS)), '272', '50'],
  sol: `The notice must be signed by at least one-fourth of the total members of the House: one-fourth of ${LS} is 135.75, so at least ${quarter(LS)} members. ${twoThirds(LS)} is the two-thirds needed to pass the resolution; 272 is a simple majority of the House; 50 is the support needed for some motions, not for impeachment.`,
}));
Q('m_imp_pass', mcq({
  t: 2, d: 3, c: 'application',
  stem: `After the notice period, an impeachment resolution is put to the vote in an imagined Rajya Sabha of ${RS} members. What is the least number of votes needed for it to pass in that House?`,
  opts: [String(twoThirds(RS)), String(majorityOfAll(RS)), String(quarter(RS)), '245'],
  sol: `The resolution must be passed by not less than two-thirds of the total membership of the House: two-thirds of ${RS} is 163.33, so at least ${twoThirds(RS)} votes. ${majorityOfAll(RS)} would be a majority of all members, ${quarter(RS)} is the one-fourth needed for the notice, and 245 is the whole House.`,
}));
Q('m_imp_nominated', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which group of legislators has no vote in electing the President but does take part in impeaching the President?',
  opts: [
    'Nominated members of both Houses of Parliament',
    'Elected members of the State Legislative Assemblies',
    'Members of the State Legislative Councils',
    'Elected members of the Delhi Assembly',
  ],
  sol: 'Impeachment is carried out by Parliament as a whole, so nominated members of both Houses vote on it though they do not vote in the election. Elected MLAs (including Delhi\'s) vote in the election but not in impeachment; Legislative Council members take part in neither.',
}));
Q('ar_imp_states', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Members of the State Legislative Assemblies vote on the resolution to impeach the President.',
  r: 'Elected members of the State Legislative Assemblies are part of the Electoral College that elects the President.',
  sol: 'A is false: impeachment takes place only in the two Houses of Parliament. R is true: elected MLAs do help elect the President.',
}));
Q('ord_impeach', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of the impeachment of a President in the correct order.',
  items: [
    'Written notice signed by at least one-fourth of the members of one House is given 14 days in advance',
    'That House passes the charge by two-thirds of its total membership',
    'The other House investigates the charge, and the President may appear or be represented',
    'The other House also passes the resolution by two-thirds of its total membership, and the President is removed',
  ],
  sol: 'Notice and fourteen days\' gap; resolution in the first House by two-thirds; investigation by the other House with the President\'s right to defend; second two-thirds vote, after which the President stands removed.',
}));
Q('s_imp_two_safeguards', short({
  t: 2, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'State two features of the impeachment procedure that make it difficult to remove a President for political reasons.',
  model: '1. A resolution needs **two-thirds of the total membership** of **each** House, not just a simple majority.\n2. The President has the **right to appear and defend** himself while the **other House investigates** the charge.',
  sol: 'Any two: special majority in both Houses, 14 days\' notice signed by one-fourth, investigation by the other House, right of defence, only ground is violation of the Constitution.',
  scheme: [['First safeguard', 1], ['Second safeguard', 1]],
}));

// ================================================================ t03 Executive, legislative and financial powers
Q('m_exec_name', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'The executive power of the Union is vested in the President. In practice, how is most of this power exercised?',
  opts: [
    'On the advice of the Council of Ministers headed by the Prime Minister',
    'By the President alone, without consulting anyone',
    'By the Chief Justice on the President\'s behalf',
    'By the Speaker of the Lok Sabha',
  ],
  sol: 'Article 74 provides a Council of Ministers headed by the Prime Minister to aid and advise the President, and the President acts on this advice. The other options describe no constitutional arrangement.',
}));
Q('m_appoint', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which of these officials is appointed by the President?',
  opts: ['The Comptroller and Auditor General of India', 'The Speaker of the Lok Sabha', 'The Chief Minister of a State', 'The Chairman of a District Council'],
  sol: 'The President appoints the Comptroller and Auditor General, as well as judges of the Supreme Court and High Courts, Governors and the Attorney General. The Speaker is elected by the Lok Sabha, a Chief Minister is appointed by the Governor, and district bodies have their own procedures.',
}));
Q('m_supreme_cmd', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The President is the Supreme Commander of the defence forces. Which statement about this power is correct?',
  opts: [
    'Decisions such as declaring war are taken by the President subject to Parliament\'s laws and on ministerial advice',
    'The President personally commands troops in battle',
    'The defence chiefs need no approval of the government',
    'Only the Rajya Sabha can control the defence forces',
  ],
  sol: 'The supreme command is exercised in the President\'s name, regulated by law and on the advice of the Council of Ministers. The President does not lead troops, the chiefs work under the government, and both Houses (not only the Rajya Sabha) control defence through laws and money.',
}));
Q('m_ordinance_when', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Parliament is not in session when an imagined outbreak of a cattle disease calls for an urgent law on movement of animals. Which power can the President use?',
  opts: [
    'Issue an ordinance under Article 123',
    'Declare a financial emergency',
    'Dissolve the Rajya Sabha',
    'Pardon the farmers in advance',
  ],
  sol: 'When either House is not in session and immediate action is needed, the President may issue an ordinance, which has the force of law. A financial emergency, dissolving the permanent Rajya Sabha or advance pardons do not fit the situation.',
}));
Q('m_ordinance_life', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An ordinance was issued while Parliament was in recess. Parliament reassembles on 3 August and takes no action on it. When does the ordinance cease to operate?',
  opts: [
    `At the end of ${ORD_WEEKS} weeks from the reassembly of Parliament`,
    'Immediately on 3 August',
    'After six months from the date it was issued',
    'It never lapses unless the President withdraws it',
  ],
  sol: `An ordinance must be laid before both Houses and lapses at the end of ${ORD_WEEKS} weeks from their reassembly unless approved earlier (or disapproved by resolutions). It does not end on the first day, it is not tied to six months from issue, and it cannot run indefinitely.`,
}));
Q('m_pocket_veto', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A President receives an ordinary bill passed by Parliament and simply keeps it pending for many months without giving assent, refusing assent or returning it. Which veto is this?',
  opts: ['Pocket veto', 'Suspensive veto', 'Absolute veto', 'Qualified veto'],
  sol: 'The Constitution fixes no time limit for the President\'s decision on an ordinary bill, so keeping it pending is called the pocket veto. Returning it once is the suspensive veto; refusing assent is the absolute veto; a qualified veto (override by special majority) is not part of the Indian system.',
}));
Q('m_money_rec', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which financial power belongs to the President?',
  opts: [
    'A Money Bill can be introduced in the Lok Sabha only on the President\'s recommendation',
    'The President alone decides the rates of income tax',
    'The President can spend from the Consolidated Fund without Parliament\'s approval for any purpose',
    'The President approves State budgets before they are presented',
  ],
  sol: 'The President\'s prior recommendation is needed for a Money Bill, and the annual financial statement is laid in his name. Tax rates are fixed by Parliament\'s law; spending from the Consolidated Fund needs Parliament\'s approval; State budgets are not approved by the President in normal times.',
}));
Q('m_contingency', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A sudden cyclone strikes an imagined coastal region and the government needs money before Parliament can approve the spending. From which fund can the President make an advance?',
  opts: ['The Contingency Fund of India', 'The Provident Fund of government employees', 'The State Disaster Fund of a different State', 'The Consolidated Fund of a State'],
  sol: 'The Contingency Fund of India is placed at the disposal of the President to meet unforeseen expenditure, pending approval by Parliament. The other funds are not under the President\'s control for this purpose.',
}));
Q('tf_return_money', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The President may return a Money Bill to the Lok Sabha for reconsideration, as with an ordinary bill.',
  sol: 'A Money Bill is introduced with the President\'s own recommendation, so it is not returned for reconsideration; the President normally gives assent. Only an ordinary bill can be returned once.',
}));
Q('mt_veto', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each kind of presidential veto with the action that shows it.',
  pairs: [
    ['Absolute veto', 'Refusing assent to a bill'],
    ['Suspensive veto', 'Returning an ordinary bill once for reconsideration'],
    ['Pocket veto', 'Keeping a bill pending without any decision'],
  ],
  sol: 'Absolute: assent withheld. Suspensive: returned once; if Parliament passes it again, the President must assent. Pocket: no decision, because no time limit is fixed.',
}));
Q('s_address', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'On which two occasions does the President address both Houses of Parliament assembled together?',
  model: '1. At the start of the **first session after each general election** to the Lok Sabha.\n2. At the start of the **first session of each year**.',
  sol: 'Special address under Article 87: after each general election and at the first session of each year.',
  scheme: [['After a general election', 1], ['First session of each year', 1]],
}));
Q('s_ordinance_meaning', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is an ordinance? State the condition under which the President can issue one.',
  model: 'An ordinance is a **temporary law** made by the President that has the **same force as an Act of Parliament**. It can be issued only when **one or both Houses are not in session** and the President is satisfied that **immediate action** is needed.',
  sol: 'Meaning; recess condition and urgency.',
  scheme: [['Meaning', 1], ['Condition: Parliament not in session and urgency', 1]],
}));
Q('s3_exec_three', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Mention three executive powers of the President.',
  model: '1. Appoints the **Prime Minister** and, on his advice, the **other ministers**.\n2. Appoints high officials such as **judges** of the Supreme Court and High Courts, **Governors**, the **Attorney General** and the **Comptroller and Auditor General**.\n3. Is the **Supreme Commander** of the defence forces; all executive action is taken in his **name**.',
  sol: 'Any three executive powers.',
  scheme: [['First power', 1], ['Second power', 1], ['Third power', 1]],
}));

// ================================================================ t04 Judicial and discretionary powers
Q('m_pardon_art', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Under which Article can the President grant pardons, reprieves, respites or remissions of punishment?',
  opts: ['Article 72', 'Article 123', 'Article 352', 'Article 61'],
  sol: 'Article 72 gives the President this judicial power, including in cases of the death sentence and court-martial. Article 123 is about ordinances, 352 about national emergency, and 61 about impeachment.',
}));
Q('m_commute', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A prisoner in an imagined case has been sentenced to death. On the advice of the government, the President changes the punishment to life imprisonment. Which form of the power is this?',
  opts: ['Commutation', 'Respite', 'Reprieve', 'Remission'],
  sol: 'Commutation replaces one form of punishment with a lighter form. A reprieve postpones a sentence for a time; a respite gives a lesser sentence for special reasons such as illness; remission reduces the period of a sentence without changing its nature.',
}));
Q('m_hung', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'After an imagined general election, no party or pre-election alliance has a majority in the Lok Sabha. Which presidential power becomes important?',
  opts: [
    'The discretion to choose a Prime Minister who seems most likely to win the confidence of the House',
    'The power to declare a national emergency',
    'The power to issue an ordinance on taxes',
    'The power to grant a pardon',
  ],
  sol: 'When no one clearly commands a majority, the President uses discretion (situational discretion) to invite the leader most likely to prove a majority, often asking for a vote of confidence within a time. The other powers are unrelated to forming a government.',
}));
Q('m_44th_advice', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Under the provision added by the 44th Amendment (1978), what may the President do when given advice by the Council of Ministers?',
  opts: [
    'Ask the Council to reconsider the advice once; he must act on the advice given after reconsideration',
    'Reject the advice as often as he likes',
    'Refer the advice to the Supreme Court for approval every time',
    'Accept the advice only if the Rajya Sabha agrees',
  ],
  sol: 'The 42nd Amendment (1976) made ministerial advice binding; the 44th Amendment added that the President may send it back once for reconsideration, but must act on the reconsidered advice. The other options have no constitutional basis.',
}));
Q('ar_discretion', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The President of India has some situational discretion in choosing a Prime Minister.',
  r: 'The President is elected indirectly by an Electoral College.',
  sol: 'Both statements are true, but R does not explain A. The discretion arises from situations such as a hung Lok Sabha, not from the method of election.',
}));
Q('s_pardon_forms', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between a reprieve and a remission granted by the President.',
  model: 'A **reprieve** **postpones** the carrying out of a sentence (especially a death sentence) for a time. A **remission** **reduces the period** of a sentence without changing its character.',
  sol: 'Postponement versus reduction of the term.',
  scheme: [['Reprieve: postponement', 1], ['Remission: reduces the period', 1]],
}));
Q('s_discretion_two', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Give two situations in which the President can act with some discretion rather than simply follow advice.',
  model: '1. Choosing a **Prime Minister** when **no party has a clear majority** in the Lok Sabha.\n2. **Returning** the Council of Ministers\' advice **once for reconsideration**, or keeping an ordinary bill pending (**pocket veto**).',
  sol: 'Any two recognised situations.',
  scheme: [['First situation', 1], ['Second situation', 1]],
}));
Q('s3_nominal_real', short({
  t: 4, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'The President is often called a constitutional or nominal head. Explain this description, and say why the office still matters.',
  model: '1. The President has wide powers on paper, but **exercises them on the advice** of the Council of Ministers, which holds **real power** (Article 74).\n2. Hence he is the **head of State** while the Prime Minister is the **head of government**.\n3. The office still matters: it gives **continuity**, can **return advice** once, uses **discretion** in a hung House, and acts as a **guardian of the Constitution**.',
  sol: 'Meaning of nominal head, with a reasoned note on why the office still matters.',
  scheme: [['Acts on ministerial advice', 1], ['Head of State versus head of government', 1], ['Why the office still matters', 1]],
}));

// ================================================================ t05 Emergency powers
Q('m_352_ground', mcq({
  t: 5, d: 2, c: 'recall',
  stem: 'On which of these grounds can a national emergency be proclaimed under Article 352 today?',
  opts: ['War, external aggression or armed rebellion', 'Failure of the monsoon in several States', 'A fall in the value of the rupee', 'Defeat of the government in the Lok Sabha'],
  sol: 'Article 352 allows a proclamation for war, external aggression or armed rebellion; the 44th Amendment replaced "internal disturbance" with "armed rebellion". Droughts, currency changes and the defeat of a government are not grounds.',
}));
Q('m_352_cabinet', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'Since the 44th Amendment, what must the President receive before proclaiming a national emergency?',
  opts: [
    'The decision of the Union Cabinet communicated to him in writing',
    'An oral request from the Prime Minister',
    'A resolution of all State Assemblies',
    'A judgment of the Supreme Court',
  ],
  sol: 'The President can proclaim a national emergency only after the Cabinet\'s decision is communicated to him in writing. An oral request is not enough, and State Assemblies or the Supreme Court are not involved in the proclamation.',
}));
Q('m_356_case', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'The Governor of an imagined State reports that no party can form a stable government and the State cannot be run according to the Constitution. Which provision may be used?',
  opts: ['President\'s Rule under Article 356', 'National emergency under Article 352', 'Financial emergency under Article 360', 'Impeachment under Article 61'],
  sol: 'Article 356 applies when the constitutional machinery fails in a State, on the Governor\'s report or otherwise. Article 352 is for war, aggression or armed rebellion, Article 360 for a financial crisis, and Article 61 for removing the President.',
}));
Q('m_360_effect', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which is an effect of a financial emergency under Article 360?',
  opts: [
    'Salaries of government servants, including judges of the Supreme Court and High Courts, may be reduced',
    'The Lok Sabha is dissolved automatically',
    'Fundamental Rights under Article 19 are suspended',
    'The President takes over the functions of every State government',
  ],
  sol: 'During a financial emergency the Union can order cuts in salaries, including those of judges, and may require State Money Bills to be reserved for the President. Dissolution, suspension of Article 19 and taking over State governments are not effects of Article 360.',
}));
Q('m_approval_time', mcq({
  t: 5, d: 4, c: 'application',
  stem: 'Three proclamations are made in an imagined year: a national emergency, President\'s Rule in a State, and a financial emergency. Within what period must each be approved by both Houses of Parliament?',
  opts: [
    `${N_EMERG_APPROVAL_MONTHS} month for the national emergency; ${PR_APPROVAL_MONTHS} months each for President's Rule and the financial emergency`,
    'Two months for all three',
    'Six months for all three',
    'One month for President\'s Rule only; the others need no approval',
  ],
  sol: `A national emergency must be approved within ${N_EMERG_APPROVAL_MONTHS} month (since the 44th Amendment), while President\'s Rule and a financial emergency must be approved within ${PR_APPROVAL_MONTHS} months. Every proclamation needs Parliament\'s approval.`,
}));
Q('ar_19', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'During a national emergency declared on the ground of war, the freedoms in Article 19 can be suspended.',
  r: 'Article 358 allows the State to make laws restricting those freedoms while such an emergency is in force.',
  sol: 'Both are true and R explains A: Article 358 removes the protection of Article 19 during an emergency declared on the ground of war or external aggression.',
}));
Q('ar_360_used', ar({
  t: 5, d: 2, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A financial emergency under Article 360 had never been proclaimed in India (as of 2024).',
  r: 'Article 360 can be used whenever a State government loses its majority.',
  sol: 'A is true as of 2024. R is false: Article 360 is for a threat to the financial stability or credit of India; a State government losing its majority may lead to Article 356, not 360.',
}));
Q('tf_356_assembly', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Under President\'s Rule, Parliament may make laws on State subjects for that State, and the State Assembly may be suspended or dissolved.',
  sol: 'Under Article 356 the State\'s legislative powers are exercised by or under the authority of Parliament, and the Assembly may be kept in suspended animation or dissolved.',
}));
Q('fb_armed', fb({
  t: 5, d: 2, c: 'recall',
  stem: 'The 44th Amendment replaced the words "internal disturbance" in Article 352 with the words "armed ___".',
  acc: [['rebellion']],
  sol: 'Since 1978 the ground is "armed rebellion", which is narrower than the earlier "internal disturbance".',
}));
Q('mt_emerg', match({
  t: 5, d: 2, c: 'understanding',
  stem: 'Match each emergency provision with its ground.',
  pairs: [
    ['Article 352', 'War, external aggression or armed rebellion'],
    ['Article 356', 'Failure of constitutional machinery in a State'],
    ['Article 360', 'Threat to the financial stability or credit of India'],
  ],
  sol: '352: national emergency; 356: President\'s Rule in a State; 360: financial emergency.',
}));
Q('s_352_effects', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two effects of a proclamation of national emergency on the federal structure.',
  model: '1. **Parliament** can make laws on subjects in the **State List**.\n2. The Union can give **directions** to the States on how to use their executive power, so the system becomes nearly **unitary**.',
  sol: 'Any two federal effects (State List laws, directions, change in distribution of revenues, extension of Lok Sabha term).',
  scheme: [['First effect', 1], ['Second effect', 1]],
}));
Q('s_356_effects', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention two effects of President\'s Rule in a State.',
  model: '1. The **President** takes over the **executive functions** of the State, usually exercised through the **Governor**.\n2. **Parliament** makes laws for the State, while the **State Assembly** is suspended or dissolved.',
  sol: 'Executive taken over; legislative power with Parliament.',
  scheme: [['Executive effect', 1], ['Legislative effect', 1]],
}));
Q('s3_compare_emerg', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare a national emergency with a financial emergency on three points.',
  model: '1. **Ground:** a national emergency is for **war, external aggression or armed rebellion**; a financial emergency for a threat to **financial stability or credit**.\n2. **Approval:** within **one month** for a national emergency; within **two months** for a financial emergency.\n3. **Effects:** a national emergency lets Parliament legislate on the **State List** and can suspend **Article 19**; a financial emergency allows **salary cuts** and control of State **Money Bills**.',
  sol: 'Ground, approval period, effects.',
  scheme: [['Ground', 1], ['Approval period', 1], ['Effects', 1]],
}));

// ================================================================ t06 The Vice-President
Q('m_vp_house', mcq({
  t: 6, d: 1, c: 'recall',
  stem: 'Of which House is the Vice-President the ex-officio Chairman?',
  opts: ['The Rajya Sabha', 'The Lok Sabha', 'Both Houses in turn', 'The State Legislative Council of his home State'],
  sol: 'The Vice-President is the ex-officio Chairman of the Rajya Sabha. The Lok Sabha has its own Speaker, there is no rotation, and State Councils have their own Chairmen.',
}));
Q('m_vp_electors', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'Who elects the Vice-President?',
  opts: [
    'All members of both Houses of Parliament, elected and nominated',
    'Only elected members of Parliament and of the State Assemblies',
    'Only the members of the Rajya Sabha',
    'The people of India by direct vote',
  ],
  sol: 'The Vice-President is elected by an Electoral College of all members of both Houses of Parliament, including nominated members, by proportional representation (single transferable vote, secret ballot). State legislators do not take part.',
}));
Q('m_vp_remove', mcq({
  t: 6, d: 3, c: 'application',
  stem: `Members in an imagined Rajya Sabha of ${RS} members move a resolution to remove the Vice-President after the required notice. What must happen for the removal to take effect?`,
  opts: [
    `At least ${majorityOfAll(RS)} members of the Rajya Sabha vote for it, and the Lok Sabha then agrees to it`,
    'Two-thirds of the members of each House vote for it, as in impeachment',
    'The President dismisses the Vice-President on the Prime Minister\'s advice',
    'The Supreme Court declares the Vice-President unfit',
  ],
  sol: `The resolution must be passed in the Rajya Sabha by a majority of all its then members (an effective majority: here at least ${majorityOfAll(RS)} of ${RS}) and agreed to by the Lok Sabha. There is no impeachment for the Vice-President, no dismissal by the President and no court procedure.`,
}));
Q('m_vp_acting', mcq({
  t: 6, d: 2, c: 'application',
  stem: 'The office of President falls vacant suddenly in an imagined year. What happens until a new President is elected?',
  opts: [
    'The Vice-President acts as President, and the election must be held within six months',
    'The Prime Minister acts as President for the remaining term',
    'The Speaker of the Lok Sabha becomes President for five years',
    'The office remains vacant until the next general election',
  ],
  sol: 'The Vice-President discharges the functions of the President, and an election to fill the vacancy must be held within six months. The Prime Minister and the Speaker do not take over the office.',
}));
Q('ar_vp_chair', ar({
  t: 6, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'While acting as President, the Vice-President does not perform the duties of Chairman of the Rajya Sabha.',
  r: 'The Vice-President is an elected member of the Rajya Sabha.',
  sol: 'A is true: the Deputy Chairman presides while the Vice-President acts as President. R is false: the Vice-President is not a member of either House.',
}));
Q('tf_vp_age', tf({
  t: 6, d: 1, c: 'recall', ans: true,
  stem: 'True or false? To be elected Vice-President, a citizen must be at least 35 years old and qualified for election to the Rajya Sabha.',
  sol: 'Both conditions are correct, along with not holding an office of profit.',
}));
Q('s_vp_quals', short({
  t: 6, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two qualifications for election to the office of Vice-President.',
  model: '1. Must be a **citizen of India** who has completed **35 years**.\n2. Must be **qualified for election to the Rajya Sabha** and must **not hold an office of profit**.',
  sol: 'Any two qualifications.',
  scheme: [['First qualification', 1], ['Second qualification', 1]],
}));
Q('s_vp_two_roles', short({
  t: 6, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe two roles of the Vice-President of India.',
  model: '1. As ex-officio **Chairman of the Rajya Sabha**, he **presides** over its sittings and keeps order; he has a **casting vote** in a tie.\n2. He **acts as President** when the office falls vacant or when the President cannot work through absence or illness.',
  sol: 'Chairman role and acting President.',
  scheme: [['Chairman of the Rajya Sabha', 1], ['Acts as President', 1]],
}));
Q('s3_pres_vp', short({
  t: 6, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the election of the President with that of the Vice-President on three points.',
  model: '1. **Electors:** the President is chosen by elected MPs and elected MLAs (including Delhi and Puducherry); the Vice-President by **all MPs**, elected and nominated.\n2. **State legislators:** vote for the President but **not** for the Vice-President.\n3. **Common features:** both elections use **proportional representation by single transferable vote** and a **secret ballot**.',
  sol: 'Three clear points of comparison.',
  scheme: [['Electors compared', 1], ['Role of State legislators', 1], ['Method common to both', 1]],
}));

// ================================================================ extra objective items for checks
Q('m_head_state', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'In India\'s parliamentary system, which office is the head of State?',
  opts: ['The President', 'The Prime Minister', 'The Chief Justice of India', 'The Speaker of the Lok Sabha'],
  sol: 'The President is the head of State; the Prime Minister is the head of government. The Chief Justice heads the judiciary, and the Speaker presides over the Lok Sabha.',
}));
Q('m_dissolve', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which House of Parliament can the President dissolve before the end of its term?',
  opts: ['Only the Lok Sabha', 'Only the Rajya Sabha', 'Both Houses', 'Neither House'],
  sol: 'The President may dissolve the Lok Sabha on the advice of the Prime Minister. The Rajya Sabha is a permanent House and cannot be dissolved.',
}));
Q('m_rs_nominate', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'How many members does the President nominate to the Rajya Sabha for their knowledge or experience in literature, science, art and social service?',
  opts: ['12', '2', '20', '50'],
  sol: 'The President nominates 12 members to the Rajya Sabha. Two Anglo-Indian members used to be nominated to the Lok Sabha, but that provision ended in 2020.',
}));
Q('fb_supreme', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The President is the Supreme ___ of the defence forces of India.',
  acc: [['Commander']],
  sol: 'The President is the Supreme Commander of the Army, Navy and Air Force.',
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_election', long({
  t: 1, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'An imagined student council wants to copy the way India elects its President.\n\n(i) State three qualifications for election as President. **[3]**\n(ii) Name the members who form the Electoral College and those who are left out. **[3]**\n(iii) Explain four reasons why the President is elected indirectly. **[4]**',
  model: '(i) The candidate must be a **citizen of India**, must have completed **35 years**, must be **qualified for election to the Lok Sabha**, and must **not hold an office of profit** under the government.\n\n(ii) The Electoral College consists of the **elected members of both Houses of Parliament**, the **elected members of the State Legislative Assemblies**, and the **elected members of the Delhi and Puducherry Assemblies**. **Nominated members** of Parliament and of the Assemblies, and members of **Legislative Councils**, are left out.\n\n(iii) The President is a **nominal head**, and direct election would suggest **real power**. A directly elected President might **rival the Prime Minister**. A nationwide campaign would be **costly**. Including MLAs gives the **States** a voice, which suits **federalism**.',
  sol: 'Qualifications; members included and excluded; four reasons for indirect election.',
  scheme: [['(i) Three qualifications', 3], ['(ii) Members included', 2], ['(ii) Members left out', 1], ['(iii) Four reasons, one mark each', 4]],
}));
Q('l_impeachment', long({
  t: 2, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Read the situation and answer. *(Imagined.)* Opposition members in the Lok Sabha accuse a President of acting against the Constitution.\n\n(i) On what ground can a President be impeached, and in which House can the charge be brought? **[3]**\n(ii) Explain how the charge is framed and passed in the House where it begins. **[3]**\n(iii) Describe what happens in the second House and why the procedure is considered difficult. **[4]**',
  model: '(i) The only ground is **violation of the Constitution**. The charge can be brought in **either House** of Parliament.\n\n(ii) A **written notice** signed by at least **one-fourth of the total members** of the House is given **14 days** in advance. The resolution must then be passed by **not less than two-thirds of the total membership** of that House.\n\n(iii) The **other House investigates** the charge; the President has the right to **appear or be represented**. If that House also passes the resolution by **two-thirds of its total membership**, the President is **removed** from that date. The procedure is difficult because it needs a **special majority in both Houses**, a long **notice period** and a **fair hearing**.',
  sol: 'Ground and House; notice and special majority; investigation, removal and why difficult.',
  scheme: [['(i) Violation of the Constitution', 2], ['(i) Either House', 1], ['(ii) Notice by one-fourth, 14 days', 2], ['(ii) Two-thirds of total membership', 1], ['(iii) Investigation and right to defend', 2], ['(iii) Second two-thirds vote, removal and why difficult', 2]],
}));
Q('l_legis_powers', long({
  t: 3, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'The President is part of Parliament.\n\n(i) Mention three legislative powers of the President connected with the meetings of Parliament. **[3]**\n(ii) Explain the President\'s options when an ordinary bill passed by both Houses is sent for assent. **[3]**\n(iii) What is an ordinance? State its duration and two limits on this power. **[4]**',
  model: '(i) The President **summons** and **prorogues** the Houses, can **dissolve the Lok Sabha**, **addresses** both Houses at the first session after a general election and each year, and may summon a **joint sitting**.\n\n(ii) He may **give assent**, **withhold assent** (absolute veto) or **return the bill once** for reconsideration (suspensive veto); if Parliament passes it again, he **must assent**. Because no time limit is fixed, he may also keep it pending (**pocket veto**).\n\n(iii) An ordinance is a **temporary law** made by the President when Parliament is **not in session** and immediate action is needed (Article 123). It lapses **six weeks after Parliament reassembles** unless approved. Limits: it can be made only on subjects on which **Parliament can make laws**, it is issued on the **advice of the ministers**, and it may be **reviewed by courts**.',
  sol: 'Meeting-related powers; veto options; ordinance meaning, duration and limits.',
  scheme: [['(i) Three powers', 3], ['(ii) Assent, withhold, return; must assent if repassed', 3], ['(iii) Meaning and when issued', 2], ['(iii) Six weeks after reassembly', 1], ['(iii) A limit on the power', 1]],
}));
Q('l_judicial_disc', long({
  t: [3, 4], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Answer the following about the President\'s powers.\n\n(i) Explain three financial powers of the President. **[3]**\n(ii) Under Article 72, what kinds of mercy can the President grant? Explain any three. **[3]**\n(iii) "The President of India is not a mere rubber stamp." Evaluate this statement with reference to his discretionary powers. **[4]**',
  model: '(i) A **Money Bill** can be introduced only on his **recommendation**; the **annual financial statement** is laid before Parliament on his behalf; he can make **advances from the Contingency Fund** for unforeseen expenses; he appoints a **Finance Commission** every five years.\n\n(ii) He can grant a **pardon** (frees the person from the sentence), a **commutation** (a lighter form of punishment), a **remission** (shorter period) and a **reprieve** (postponement), including for the **death sentence**.\n\n(iii) He normally acts on **ministerial advice** (Article 74), so most powers are formal. But he can **return advice once** for reconsideration (44th Amendment), use the **pocket veto**, and use **discretion in choosing a Prime Minister** when no party has a majority. These give him a real, though limited, role as a **guardian of the Constitution**, so he is more than a rubber stamp.',
  sol: 'Financial powers; forms of mercy; balanced evaluation of discretion.',
  scheme: [['(i) Three financial powers', 3], ['(ii) Three forms explained', 3], ['(iii) Acts on advice normally', 1], ['(iii) Discretionary situations', 2], ['(iii) Balanced conclusion', 1]],
}));
Q('l_emergency', long({
  t: 5, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'The Constitution gives the President three kinds of emergency powers.\n\n(i) State the ground of each kind of emergency and the Article under which it is proclaimed. **[3]**\n(ii) Mention any two effects of a national emergency and one safeguard added by the 44th Amendment. **[3]**\n(iii) Give two effects each of President\'s Rule and of a financial emergency. **[4]**',
  model: '(i) **National emergency (Article 352):** war, external aggression or armed rebellion. **President\'s Rule (Article 356):** failure of the constitutional machinery in a State. **Financial emergency (Article 360):** a threat to the financial stability or credit of India.\n\n(ii) Effects: **Parliament can legislate on State List** subjects, the Union can **direct the States**, and Article **19 freedoms** can be suspended in a war emergency. Safeguard: the proclamation needs the **Cabinet\'s written decision** and approval by Parliament **within one month** by a special majority.\n\n(iii) **President\'s Rule:** the President takes over the State\'s **executive** through the Governor; **Parliament** makes laws for the State and the Assembly is suspended or dissolved. **Financial emergency:** **salaries** of government servants and judges can be **cut**; State **Money Bills** may be reserved for the President.',
  sol: 'Grounds and Articles; national emergency effects and safeguard; effects of the other two.',
  scheme: [['(i) Three grounds with Articles', 3], ['(ii) Two effects of national emergency', 2], ['(ii) One 44th Amendment safeguard', 1], ['(iii) Two effects of President\'s Rule', 2], ['(iii) Two effects of financial emergency', 2]],
}));
Q('l_vp', long({
  t: 6, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Answer the following about the Vice-President of India.\n\n(i) State three qualifications for the office. **[3]**\n(ii) Explain how the Vice-President is elected and removed. **[3]**\n(iii) Describe the functions of the Vice-President as Chairman of the Rajya Sabha and as acting President. **[4]**',
  model: '(i) A **citizen of India**, at least **35 years** old, **qualified for election to the Rajya Sabha**, and **not holding an office of profit**.\n\n(ii) Elected by an Electoral College of **all members of both Houses** of Parliament, elected and nominated, by **proportional representation by single transferable vote** and **secret ballot**, for **five years**. Removed by a **Rajya Sabha resolution** passed by a **majority of all its then members** and **agreed to by the Lok Sabha**, after **14 days\' notice**.\n\n(iii) As **Chairman**, he **presides** over the Rajya Sabha, keeps **order**, decides points of procedure and has a **casting vote** in a tie. When the President\'s office is **vacant** or the President is **absent or ill**, he **acts as President** (a vacancy must be filled within six months); during that time he does **not preside** over the Rajya Sabha.',
  sol: 'Qualifications; election and removal; functions.',
  scheme: [['(i) Three qualifications', 3], ['(ii) Election', 2], ['(ii) Removal', 1], ['(iii) Functions as Chairman', 2], ['(iii) Acting President', 2]],
}));
Q('l_exec_powers', long({
  t: [3, 4], d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'The executive power of the Union is vested in the President.\n\n(i) Mention three appointments made by the President. **[3]**\n(ii) Explain what is meant by the President\'s role as Supreme Commander of the defence forces. **[3]**\n(iii) Why is the President bound to act on the advice of the Council of Ministers? Refer to the 42nd and 44th Amendments. **[4]**',
  model: '(i) The **Prime Minister** and other **ministers**, **judges** of the Supreme Court and High Courts, **Governors** of States, the **Attorney General**, the **Comptroller and Auditor General** and the **Election Commissioners**.\n\n(ii) The defence forces are commanded in the **President\'s name**; he can **declare war or make peace**, but these powers are **regulated by Parliament\'s laws** and used on the **advice of the government**.\n\n(iii) India has a **parliamentary system**: the **Council of Ministers** is responsible to the Lok Sabha, so it holds **real power** and must advise the President (Article 74). The **42nd Amendment (1976)** made this advice **binding**. The **44th Amendment (1978)** allowed the President to **return advice once** for reconsideration, after which he must act on it.',
  sol: 'Appointments; Supreme Commander; binding advice with the two amendments.',
  scheme: [['(i) Three appointments', 3], ['(ii) In his name, regulated by law and advice', 3], ['(iii) Parliamentary system and responsibility', 2], ['(iii) 42nd and 44th Amendments', 2]],
}));

// ================================================================ source-based (imagined documents)
Q('sb_ballot_diary', source({
  t: [1, 6], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a first-time member of a State Legislative Assembly and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a new member of a State Assembly (imagined)**\n\nJuly. Today I voted in the election of the President of India. The ballot paper had two names, and I marked my first and second preferences. A senior colleague in our Legislative Council told me he had no vote at all. The value of my vote, the officer explained, depends on the population of my State and the number of members in our Assembly.\n\nAugust. A few weeks later the Vice-President was elected. This time I had no vote. Only members of Parliament took part, and even the members nominated to the Rajya Sabha voted.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Why could the diarist vote in July but not in August?', model: 'Elected **MLAs** are part of the **President\'s** Electoral College but **not** of the Vice-President\'s.', sol: 'Compare the two Electoral Colleges.', scheme: [['Correct reason', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which method of voting is shown by the diarist marking preferences?', model: '**Proportional representation by single transferable vote** (with a secret ballot).', sol: 'Preferences point to the single transferable vote.', scheme: [['Single transferable vote', 1]] })),
    child('c', short({ t: [1, 6], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why the colleague in the Legislative Council had no vote in July.', model: 'Only **elected members** of the **Legislative Assemblies** and of Parliament form the Electoral College; members of **Legislative Councils** are **not included**.', sol: 'Composition of the Electoral College.', scheme: [['Only elected Assembly members of States', 1], ['Councils excluded', 1]] }), [
      short({ t: 6, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Using the August entry, state two differences between the Electoral Colleges of the President and the Vice-President.', model: 'The Vice-President is elected by **members of Parliament only**, while the President\'s electors include **elected MLAs**. **Nominated** MPs vote for the Vice-President but **not** for the President.', sol: 'Two differences from the entry.', scheme: [['State legislators', 1], ['Nominated members', 1]] }),
    ]),
  ],
}));
Q('sb_ordinance_note', source({
  t: [3, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined briefing note prepared by a law student and answer the questions that follow. ${IMAG}`,
  passage: '**Briefing note for a moot court (imagined)**\n\nIn the imagined year, Parliament had been prorogued in May when a new disease began to spread among poultry. The government advised the President to make a temporary law at once, and a law came into force in June. When the Houses met again on 20 July, the law was laid before them.\n\nIn the same year, the President received the government\'s advice to reduce the sentence of a prisoner. The President asked the ministers to think again. The ministers sent the same advice back a week later.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'What is the temporary law made in June called?', model: 'An **ordinance** (under **Article 123**).', sol: 'Law made by the President when Parliament is not in session.', scheme: [['Ordinance', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'If Parliament takes no action after 20 July, when will the law stop working?', model: 'It lapses **six weeks** after Parliament **reassembled** on 20 July.', sol: 'Six weeks from reassembly.', scheme: [['Six weeks from reassembly', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What must the President do now that the ministers have sent back the same advice? Name the amendment that sets this rule.', model: 'He **must act on the reconsidered advice**; he could return it **only once**. This was laid down by the **44th Amendment (1978)**.', sol: 'Bound after reconsideration; 44th Amendment.', scheme: [['Must act on reconsidered advice', 1], ['44th Amendment', 1]] }), [
      short({ t: 4, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Under which Article does the President reduce sentences? Distinguish between remission and commutation.', model: '**Article 72**. **Remission** cuts the **period** of a sentence; **commutation** replaces the punishment with a **lighter form**.', sol: 'Article 72; two forms distinguished.', scheme: [['Article 72', 1], ['Remission versus commutation', 1]] }),
    ]),
  ],
}));
Q('sb_state_report', source({
  t: 5, d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined newspaper report and answer the questions that follow. ${IMAG}`,
  passage: '**Report in an imagined newspaper**\n\nAfter weeks in which no party could form a stable government in the imagined State of Neelpur, the Governor sent a report to the President. A proclamation followed the next day. The State Assembly has been kept in suspended animation, and the Governor now runs the administration with the help of advisers. Members of Parliament from the State say the proclamation must be placed before both Houses soon.',
  parts: [
    child('a', short({ t: 5, d: 1, c: 'recall', marks: 1, stem: 'Under which Article was the proclamation made?', model: '**Article 356** (President\'s Rule).', sol: 'Failure of constitutional machinery in a State.', scheme: [['Article 356', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Within what period must Parliament approve this proclamation?', model: 'Within **two months**.', sol: 'Two months for Article 356.', scheme: [['Two months', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): State two effects of the proclamation on Neelpur.', model: 'The **President** takes over the State **executive**, run by the **Governor**; **Parliament** makes laws for the State while the **Assembly** is suspended.', sol: 'Executive and legislative effects.', scheme: [['Executive effect', 1], ['Legislative effect', 1]] }), [
      short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one argument for and one argument against such a provision in a federal country.', model: '**For:** it lets the Union **restore constitutional government** when a State cannot be run. **Against:** it can be **misused** to remove an elected State government for **political** reasons, weakening **federalism**.', sol: 'One balanced argument each way.', scheme: [['Argument for', 1], ['Argument against', 1]] }),
    ]),
  ],
}));
