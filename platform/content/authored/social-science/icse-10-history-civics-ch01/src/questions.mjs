// ICSE 10 History & Civics ch01 The Union Parliament: Lok Sabha, Rajya Sabha and the Speaker — question bank.
// Every scenario, document and diagram is written by SOYL (imagined people, schools and towns); no textbook text,
// specimen or past-paper item is reused (D-036). Constitutional facts are stated as in the Constitution of India as
// amended up to 2024; the README lists each fact for a reviewer. No current office-holder is named.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, source, caseQ, child, Svg } from './lib.mjs';

export const ORIGIN = '*(Imagined situation written by SOYL for practice.)*';

// ---------------------------------------------------------------- facts used in computed items
export const LS = { states: 530, uts: 20, present: 543, oldNominated: 2, ageLS: 25, term: 5 };
export const LS_MAX = LS.states + LS.uts; // 550 after the 104th Amendment (2020)
export const LS_MAX_OLD = LS_MAX + LS.oldNominated; // 552 before 2020
assert.equal(LS_MAX, 550);
assert.equal(LS_MAX_OLD, 552);
export const RS = { elected: 238, nominated: 12, present: 245, presentElected: 233, ageRS: 30, term: 6 };
export const RS_MAX = RS.elected + RS.nominated;
assert.equal(RS_MAX, 250);
assert.equal(RS.presentElected + RS.nominated, RS.present);

// Effective majority to remove the Speaker: a majority of all the then members (seats minus vacancies).
export const VAC = { seats: 543, vacant: 7 };
export const THEN_MEMBERS = VAC.seats - VAC.vacant; // 536
export const EFFECTIVE_MAJ = Math.floor(THEN_MEMBERS / 2) + 1; // 269
assert.equal(THEN_MEMBERS, 536);
assert.equal(EFFECTIVE_MAJ, 269);
// An imagined vote on a removal resolution: 262 for, 190 against, the rest absent.
export const REMOVAL_VOTE = { for: 262, against: 190 };
assert.ok(REMOVAL_VOTE.for > REMOVAL_VOTE.against && REMOVAL_VOTE.for < EFFECTIVE_MAJ);
// Rajya Sabha rotation: one-third retire every second year; a member elected in 2026 serves till 2032.
export const RS_JOIN = 2026;
export const RS_LEAVE = RS_JOIN + RS.term;
assert.equal(RS_LEAVE, 2032);
// Age eligibility: a citizen born in 2003 is 25 in 2028.
export const BORN = 2003;
export const LS_ELIGIBLE_YEAR = BORN + LS.ageLS;
export const RS_ELIGIBLE_YEAR = BORN + RS.ageRS;
assert.equal(LS_ELIGIBLE_YEAR, 2028);
assert.equal(RS_ELIGIBLE_YEAR, 2033);

// ---------------------------------------------------------------- picture for picture-based items
export const vHouseBars = (() => {
  const s = new Svg(560, 200);
  const rows = [
    ['House P', 'elected by the people: up to 550', 'nominated: none since 2020', 470, 0],
    ['House Q', 'elected by State legislators: up to 238', 'nominated by the President: 12', 380, 60],
  ];
  rows.forEach(([name, a, b, w1, w2], i) => {
    const y = 40 + i * 80;
    s.text(20, y + 18, name, { anchor: 'start', bold: true, size: 14 });
    s.rect(100, y, w1 * 0.9, 36, { fill: 'fill', sw: 1.6, rx: 4 });
    if (w2) s.rect(100 + w1 * 0.9, y, w2 * 0.9, 36, { fill: 'accent', fillOpacity: 0.35, sw: 1.6, rx: 4 });
    s.text(108, y + 50, a, { anchor: 'start', size: 12 });
    s.text(108, y + 64, b, { anchor: 'start', size: 12, muted: true });
  });
  return s.visual(
    'Bar picture of two Houses labelled P and Q. House P is one long bar of members elected by the people, up to 550, with no nominated members since 2020. House Q is a shorter bar of up to 238 members elected by State legislators plus a small shaded block of 12 members nominated by the President',
    'Schematic, not to scale.',
  );
})();

// ================================================================ t01 The federal set-up
Q('m_fed_feature', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which feature of the Indian Constitution shows that India has a **federal** set-up?',
  opts: [
    'Powers are divided between the Union and the States by the Constitution',
    'The President is elected indirectly',
    'There is a single citizenship for the whole country',
    'All High Courts work under one Supreme Court',
  ],
  sol: 'A federation divides powers between two levels of government by a written constitution. Single citizenship and an integrated judiciary are unitary features, and the method of electing the President does not decide federalism.',
}));
Q('m_list_police', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Kavya\'s town wants more police stations to deal with rising thefts. Under the division of powers, **police and public order** are subjects of the',
  opts: ['State List', 'Union List', 'Concurrent List', 'residuary powers of the Union'],
  sol: 'Police and public order are State subjects, so the State government decides. Defence and railways are Union subjects; education and forests are Concurrent.',
}));
Q('m_list_concurrent', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Both Parliament and the Maharashtra Legislative Assembly pass laws on the same subject. Which subject is it most likely to be?',
  opts: ['Education', 'Defence', 'Foreign affairs', 'Agriculture'],
  sol: 'Education is on the Concurrent List, where both levels may make laws. Defence and foreign affairs are Union subjects; agriculture is a State subject.',
}));
Q('m_residuary', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A new subject such as regulating space tourism is not mentioned in any of the three lists. Who can make laws on it?',
  opts: ['Parliament, because residuary powers belong to the Union', 'Only the State where the launch site lies', 'Any State that passes a law first', 'Only the Supreme Court'],
  sol: 'Subjects not listed anywhere are residuary subjects, and the power to make laws on them belongs to Parliament. Courts do not make such laws, and States have no residuary power.',
}));
Q('m_clash', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined State law on trade unions conflicts with a law made by Parliament on the same Concurrent subject. In general, which law prevails?',
  opts: ['The law made by Parliament', 'The State law, because the State is closer to the people', 'The law passed later', 'Neither; both lapse'],
  sol: 'On a Concurrent subject, the Union law generally prevails over a conflicting State law, to the extent of the conflict. Being passed later does not by itself decide the matter.',
}));
Q('ar_union_list', ar({
  t: 1, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'Defence and foreign affairs are placed in the Union List.',
  r: 'Subjects of national importance that need a uniform policy for the whole country are given to the Union.',
  sol: 'Both are true, and R gives the reason for A: defence and relations with other countries need one policy for all of India.',
}));
Q('tf_seventh', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? The three lists that divide legislative powers between the Union and the States are found in the Seventh Schedule of the Constitution.',
  sol: 'The Union, State and Concurrent Lists are in the Seventh Schedule.',
}));
Q('mt_lists', match({
  t: 1, d: 2, c: 'application',
  stem: 'Match each subject that came up in an imagined Class 10 quiz at Kohima with the list it belongs to.',
  pairs: [
    ['Railways', 'Union List'],
    ['Public health and hospitals', 'State List'],
    ['Forests', 'Concurrent List'],
    ['A subject not named in any list', 'Residuary power of the Union'],
  ],
  sol: 'Railways are a Union subject; public health is a State subject; forests are Concurrent; unlisted subjects fall under the residuary power of Parliament.',
}));
Q('s_fed_lists', short({
  t: 1, d: 1, c: 'understanding', marks: 2,
  stem: 'Name the three lists that divide law-making powers in India and give one subject from each.',
  model: '1. **Union List**, e.g. defence. 2. **State List**, e.g. police. 3. **Concurrent List**, e.g. education. (Any correct example in each.)',
  sol: 'Three lists with one correct subject each; all three needed for full marks.',
  scheme: [['Two lists with examples', 1], ['Third list with an example', 1]],
}));
Q('s_concurrent_meaning', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'What is meant by the Concurrent List, and why does a Union law usually prevail in case of conflict on it?',
  model: 'The **Concurrent List** contains subjects on which **both Parliament and State legislatures** can make laws. A Union law usually prevails so that there is **one uniform rule** for the whole country on matters of common interest.',
  sol: 'Meaning of the list and the reason for Union supremacy on it.',
  scheme: [['Meaning of the Concurrent List', 1], ['Reason the Union law prevails', 1]],
}));
Q('s3_why_union_strong', short({
  t: 1, d: 3, c: 'analysis', marks: 3,
  stem: 'Give three features of the division of powers that show the Union has been made stronger than the States.',
  model: '1. The **Union List** has the most important subjects, such as defence and currency. 2. **Residuary powers** belong to the Union. 3. On a **Concurrent** subject, a Union law generally **prevails** over a conflicting State law.',
  sol: 'Any three valid features of Union predominance in the division of powers.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));

// ================================================================ t02 Lok Sabha
Q('m_ls_direct', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Members of the Lok Sabha are chosen by',
  opts: ['the voters of the country through direct election', 'the members of the State Legislative Assemblies', 'the President on the advice of the Prime Minister', 'the Election Commission from a list of candidates'],
  sol: 'The Lok Sabha is the House of the People, elected directly by adult citizens. State legislators elect Rajya Sabha members; the President nominates only a few Rajya Sabha members.',
}));
Q('m_ls_age', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Ritika, a citizen of India, was born in ${BORN}. From which year onward is she old enough to contest a Lok Sabha election?`,
  opts: [String(LS_ELIGIBLE_YEAR), String(BORN + 21), String(RS_ELIGIBLE_YEAR), String(BORN + 18)],
  sol: `The minimum age for the Lok Sabha is ${LS.ageLS} years, so ${BORN} + ${LS.ageLS} = ${LS_ELIGIBLE_YEAR}. Eighteen is the voting age, and ${RS.ageRS} is the age for the Rajya Sabha.`,
}));
Q('m_ls_term', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The normal term of the Lok Sabha is',
  opts: ['five years from the date of its first meeting', 'six years from the date of election', 'four years from the date of its first meeting', 'until every member retires'],
  sol: 'The Lok Sabha has a term of five years from its first meeting, unless dissolved earlier. Six years is the term of a Rajya Sabha member.',
}));
Q('m_ls_dissolve', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined year the Lok Sabha is only three years old when a new general election is held. What is the most likely reason?',
  opts: [
    'The President dissolved the Lok Sabha early on the advice of the Prime Minister',
    'The Rajya Sabha voted to end its term',
    'One-third of its members retired',
    'The Speaker resigned',
  ],
  sol: 'The Lok Sabha can be dissolved before five years by the President, on the advice of the Prime Minister. One-third retirement applies to the Rajya Sabha, and the Speaker\'s resignation does not end the House.',
}));
Q('m_ls_extend', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'During a national emergency, the term of the Lok Sabha can be extended by Parliament',
  opts: [
    'by up to one year at a time, and not beyond six months after the emergency ends',
    'for any period it chooses',
    'by five years at a time',
    'only with the approval of every State',
  ],
  sol: 'An extension during an emergency is by law for up to one year at a time, and cannot continue beyond six months after the emergency has ended.',
}));
Q('m_ls_present', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'How many members are elected to the Lok Sabha at a general election at present?',
  opts: [String(LS.present), String(LS_MAX_OLD), String(RS.present), String(RS_MAX)],
  sol: `At present ${LS.present} members are elected. ${LS_MAX_OLD} was the older maximum including two nominated members; ${RS.present} and ${RS_MAX} relate to the Rajya Sabha.`,
}));
Q('m_ls_qual', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Arjun, a 32-year-old citizen, works as a paid officer of a State government department and wants to contest a Lok Sabha seat. What stands in his way?',
  opts: [
    'He holds an office of profit under a government',
    'He is too young for the Lok Sabha',
    'He is not a member of a political party',
    'He has never been elected to a State Assembly',
  ],
  sol: 'A person holding an office of profit under the Union or a State government (other than offices exempted by law) cannot be a member. He is old enough (25 is the minimum), and party membership or earlier experience is not required.',
}));
Q('m_reserved', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why are some Lok Sabha constituencies reserved for Scheduled Castes and Scheduled Tribes?',
  opts: [
    'To ensure these communities have a fair share of representation in Parliament',
    'Because only members of these communities may vote in them',
    'Because these seats are filled by nomination',
    'Because their members serve for six years',
  ],
  sol: 'In a reserved constituency only candidates from the community may contest, but all voters of the constituency vote. The aim is fair representation; the seats are elected, and the term is the same.',
}));
Q('fb_ls_age', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'A candidate for the Lok Sabha must be at least ___ years of age.',
  acc: [['25', 'twenty-five', 'twenty five']],
  sol: 'The minimum age is 25 years.',
}));
Q('n_ls_states', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: LS_MAX, unit: 'members',
  stem: `The Constitution allows up to ${LS.states} members of the Lok Sabha from the States and up to ${LS.uts} from the Union Territories. What is the maximum number of elected members?`,
  sol: `Step 1: Add the two limits.\nStep 2: ${LS.states} + ${LS.uts} = ${LS_MAX} members.`,
}));
Q('ar_ls_people', ar({
  t: 2, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Lok Sabha is called the House of the People.',
  r: 'Its members are elected directly by the adult citizens of India.',
  sol: 'Both are true, and R explains A: direct election by the people is why it is called the House of the People.',
}));
Q('ar_ls_nominated', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Two members of the Lok Sabha are still nominated by the President to represent the Anglo-Indian community.',
  r: 'The provision for nominating Anglo-Indian members to the Lok Sabha was not extended beyond January 2020.',
  sol: 'A is false: since the 104th Amendment (2020) no members are nominated to the Lok Sabha. R is true.',
}));
Q('tf_ls_permanent', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The Lok Sabha is a permanent House that is never dissolved.',
  sol: 'The Lok Sabha is dissolved at the end of its term or earlier; it is the Rajya Sabha that is permanent.',
}));
Q('s_ls_two_qual', short({
  t: 2, d: 1, c: 'recall', marks: 2,
  stem: 'State any two qualifications required to become a member of the Lok Sabha.',
  model: '1. Must be a **citizen of India**. 2. Must be at least **25 years** of age. (Also: name on an electoral roll; must not hold an office of profit; must not be of unsound mind or an undischarged insolvent.)',
  sol: 'Any two correct qualifications.',
  scheme: [['First qualification', 1], ['Second qualification', 1]],
}));
Q('s_ls_composition', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Describe the composition of the Lok Sabha as it stands after the 104th Amendment (2020).',
  model: `Up to **${LS.states} members** elected from the States and up to **${LS.uts}** from the Union Territories (maximum **${LS_MAX}**); at present **${LS.present}** are elected. **No members are nominated** any longer, since the two Anglo-Indian seats ended in 2020.`,
  sol: 'Elected limits for States and UTs, present strength, and the end of nomination.',
  scheme: [['Elected limits and present strength', 1], ['No nominated members since 2020', 1]],
}));
Q('s_ls_term_change', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'In what two ways can the five-year term of the Lok Sabha be changed?',
  model: '1. It can be **shortened** when the President **dissolves** it early on the advice of the Prime Minister. 2. It can be **extended** by Parliament during a **national emergency**, by one year at a time and not beyond six months after the emergency ends.',
  sol: 'Early dissolution and extension during an emergency.',
  scheme: [['Early dissolution', 1], ['Extension during an emergency with its limit', 1]],
}));
Q('s3_ls_why_direct', short({
  t: 2, d: 3, c: 'analysis', marks: 3,
  stem: 'Why is the Lok Sabha considered more powerful than the Rajya Sabha in a parliamentary democracy? Give three reasons.',
  model: '1. It is **directly elected** by the people, so it speaks for them. 2. The **Council of Ministers is responsible** to it; a no-confidence motion can be passed only there. 3. **Money Bills** start only in the Lok Sabha, and the Rajya Sabha can delay them only for 14 days.',
  sol: 'Three distinct reasons linked to election, responsibility and money matters.',
  scheme: [['Direct election', 1], ['Ministerial responsibility', 1], ['Control over money matters', 1]],
}));

// ================================================================ t03 The Speaker
Q('m_spk_elect', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The Speaker of the Lok Sabha is',
  opts: ['elected by the members of the Lok Sabha from among themselves', 'appointed by the President', 'elected by both Houses together', 'the senior-most member of the ruling party'],
  sol: 'The Lok Sabha elects its own Speaker from among its members. The President does not appoint the Speaker, and the Rajya Sabha has no role.',
}));
Q('m_spk_removal', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'A resolution to remove the Speaker must be passed by',
  opts: [
    'a majority of all the then members of the Lok Sabha, after at least 14 days\' notice',
    'a two-thirds majority of members present and voting, without notice',
    'a simple majority of members present, after 7 days\' notice',
    'both Houses of Parliament in a joint sitting',
  ],
  sol: 'Removal needs an effective majority (a majority of all the then members) and at least fourteen days\' notice of the resolution.',
}));
Q('m_spk_casting', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'On a bill in the Lok Sabha, 250 members vote for and 250 against. What does the Speaker do?',
  opts: ['Exercises a casting vote to decide the matter', 'Votes along with the ruling party in the first instance', 'Sends the bill to the President', 'Asks the Rajya Sabha to decide'],
  sol: 'The Speaker does not vote in the first instance but has a casting vote in case of a tie. The bill is not sent to the President or the Rajya Sabha to break a tie.',
}));
Q('m_spk_money', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'If a question arises whether a bill is a Money Bill, whose decision is final?',
  opts: ['The Speaker of the Lok Sabha', 'The Chairman of the Rajya Sabha', 'The Finance Minister', 'The Prime Minister'],
  sol: 'Under the Constitution the certificate of the Speaker on this question cannot be challenged. The Rajya Sabha Chairman, the Finance Minister and the Prime Minister have no such power.',
}));
Q('m_spk_dissolve', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'The Lok Sabha is dissolved in March, and the new House first meets in June. Who is the Speaker in April?',
  opts: [
    'The same Speaker, who stays in office until just before the first meeting of the new Lok Sabha',
    'No one, because the office ends with dissolution',
    'The Deputy Chairman of the Rajya Sabha',
    'The senior-most member of the dissolved House',
  ],
  sol: 'The Speaker does not vacate office on dissolution but continues until immediately before the first meeting of the new House.',
}));
Q('m_spk_joint', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Who presides over a joint sitting of the two Houses of Parliament?',
  opts: ['The Speaker of the Lok Sabha', 'The Vice-President', 'The President', 'The Prime Minister'],
  sol: 'The Speaker presides over a joint sitting. The Vice-President presides over the Rajya Sabha, not over joint sittings.',
}));
Q('m_spk_order', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'During a debate in the Lok Sabha, a member keeps shouting and refuses to take his seat. What can the Speaker do?',
  opts: [
    'Order the member to withdraw or suspend him for the day, and adjourn the House if needed',
    'Dismiss him from the Lok Sabha permanently',
    'Ask the President to dissolve the House',
    'Remove his name from the electoral roll',
  ],
  sol: 'Maintaining order is the Speaker\'s duty: the Speaker can name, suspend or ask a member to withdraw, and adjourn the House in grave disorder. Membership is not ended this way.',
}));
Q('n_eff_majority', num({
  t: 3, d: 3, c: 'application', marks: 1, value: EFFECTIVE_MAJ, unit: 'votes',
  stem: `In an imagined year the Lok Sabha has ${VAC.seats} seats, of which ${VAC.vacant} are vacant. What is the smallest number of votes needed to pass a resolution removing the Speaker?`,
  sol: `Step 1: Then members = ${VAC.seats} − ${VAC.vacant} = ${THEN_MEMBERS}.\nStep 2: A majority of ${THEN_MEMBERS} is more than half: ${THEN_MEMBERS} ÷ 2 = ${THEN_MEMBERS / 2}, so ${EFFECTIVE_MAJ} votes.`,
}));
Q('ar_spk_vote', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Speaker does not vote in the first instance on ordinary matters.',
  r: 'The Speaker is not a member of the Lok Sabha.',
  sol: 'A is true: the Speaker votes only to break a tie. R is false: the Speaker is an elected member of the Lok Sabha.',
}));
Q('tf_spk_deputy', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? In the absence of the Speaker, the Deputy Speaker presides over the Lok Sabha.',
  sol: 'The Deputy Speaker, also elected by the House, presides when the Speaker is absent.',
}));
Q('fb_spk_notice', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'A resolution to remove the Speaker can be moved only after at least ___ days\' notice.',
  acc: [['14', 'fourteen']],
  sol: 'Fourteen days\' notice is required.',
}));
Q('ord_spk_removal', ord({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Put the steps in removing the Speaker of the Lok Sabha in the correct order.',
  items: [
    'Members give at least fourteen days\' notice of a resolution for removal',
    'The resolution is taken up while the Speaker does not preside but may speak and vote',
    'The resolution is passed by a majority of all the then members',
    'The Speaker vacates office',
  ],
  sol: 'Notice comes first, then debate with the Speaker not presiding, then the vote by an effective majority, and finally the office falls vacant.',
}));
Q('s_spk_two_functions', short({
  t: 3, d: 1, c: 'recall', marks: 2,
  stem: 'Mention any two functions of the Speaker of the Lok Sabha.',
  model: '1. **Presides** over the Lok Sabha and **maintains order**. 2. **Certifies Money Bills**; the decision is final. (Also: casting vote in a tie; presides over joint sittings; adjourns the House when there is no quorum.)',
  sol: 'Any two correct functions.',
  scheme: [['First function', 1], ['Second function', 1]],
}));
Q('s_spk_continue', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Explain why the Speaker continues in office even after the Lok Sabha is dissolved.',
  model: 'The Speaker stays until **just before the first meeting of the new House**, so that there is **no gap** in the office: someone is there to look after the **Secretariat** and the work of the Lok Sabha until a new Speaker is elected.',
  sol: 'Rule plus the reason (continuity).',
  scheme: [['Rule: until the first meeting of the new House', 1], ['Reason: continuity', 1]],
}));
Q('s_spk_removal_vote', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: `In an imagined case, ${REMOVAL_VOTE.for} members vote for a resolution to remove the Speaker and ${REMOVAL_VOTE.against} against, when the House has ${THEN_MEMBERS} members (seats minus vacancies). Is the Speaker removed? Give a reason.`,
  model: `**No.** Removal needs a majority of **all the then members**, that is at least **${EFFECTIVE_MAJ}** of ${THEN_MEMBERS}. Only **${REMOVAL_VOTE.for}** voted for it, so the resolution fails even though more members voted for it than against.`,
  sol: 'Apply the effective-majority rule to the numbers.',
  scheme: [['Correct conclusion', 1], ['Reason with the effective majority', 1]],
}));
Q('s3_spk_impartial', short({
  t: 3, d: 3, c: 'evaluation', marks: 3,
  stem: 'The Speaker is usually elected from the ruling side but is expected to be impartial. Give three features of the office that help the Speaker act impartially.',
  model: '1. The Speaker **does not vote** in the first instance, only to break a tie. 2. **Removal** needs an **effective majority** with **14 days\' notice**, so the Speaker cannot be removed easily. 3. The Speaker\'s **salary** is charged on the Consolidated Fund and the Speaker\'s rulings on procedure cannot be questioned in the House.',
  sol: 'Three distinct safeguards of impartiality.',
  scheme: [['First safeguard', 1], ['Second safeguard', 1], ['Third safeguard', 1]],
}));

// ================================================================ t04 Rajya Sabha
Q('m_rs_max', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'The maximum strength of the Rajya Sabha laid down in the Constitution is',
  opts: [`${RS_MAX}: ${RS.elected} representatives of the States and Union Territories and ${RS.nominated} nominated`, `${RS.present}: all elected`, `${LS_MAX}: all elected`, `${RS_MAX}: all nominated by the President`],
  sol: `The maximum is ${RS_MAX}: up to ${RS.elected} elected representatives and ${RS.nominated} members nominated by the President. ${RS.present} is the present strength.`,
}));
Q('m_rs_elected_by', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Representatives of a State in the Rajya Sabha are elected by',
  opts: [
    'the elected members of that State\'s Legislative Assembly, by proportional representation with the single transferable vote',
    'the voters of the State directly',
    'the Lok Sabha members from that State',
    'the Governor of the State',
  ],
  sol: 'State representatives are chosen by the elected MLAs of the State using proportional representation by the single transferable vote.',
}));
Q('m_rs_nominate', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined classical dancer from Odisha with no party connection becomes a member of the Rajya Sabha without contesting any election. How is this possible?',
  opts: [
    'The President nominated her for her special knowledge or experience in art',
    'She won the most votes in her State',
    'The Speaker appointed her',
    'She was chosen by lot',
  ],
  sol: 'The President nominates twelve members with special knowledge or practical experience in literature, science, art and social service.',
}));
Q('m_rs_retire', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why is the Rajya Sabha called a permanent House?',
  opts: [
    'It is never dissolved; one-third of its members retire every second year',
    'Its members are appointed for life',
    'It meets every day of the year',
    'It cannot be adjourned',
  ],
  sol: 'The Rajya Sabha is not subject to dissolution. About one-third of the members retire every two years, so the House continues while its membership changes.',
}));
Q('m_rs_chair', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The Presiding Officer of the Rajya Sabha is',
  opts: ['the Vice-President of India, as ex-officio Chairman', 'the Speaker of the Lok Sabha', 'the senior-most member of the Rajya Sabha', 'the Chief Justice of India'],
  sol: 'The Vice-President is the ex-officio Chairman of the Rajya Sabha; the Deputy Chairman is elected by the members.',
}));
Q('m_rs_age', mcq({
  t: 4, d: 2, c: 'application',
  stem: `Dev, a citizen of India, turns 28 this year. Which of these can he contest now?`,
  opts: ['A Lok Sabha seat, but not a Rajya Sabha seat', 'A Rajya Sabha seat, but not a Lok Sabha seat', 'Both Houses', 'Neither House'],
  sol: `The minimum age is ${LS.ageLS} for the Lok Sabha and ${RS.ageRS} for the Rajya Sabha, so at 28 he qualifies only for the Lok Sabha.`,
}));
Q('m_rs_picture', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Study the picture of two Houses, P and Q. Which House is the Rajya Sabha, and which feature in the picture shows it?',
  assets: [vHouseBars],
  opts: [
    'Q, because it has members nominated by the President besides members elected by State legislators',
    'P, because it is the larger House',
    'Q, because it has no nominated members',
    'P, because its members are elected by State legislators',
  ],
  sol: 'House Q has up to 238 members elected by State legislators and 12 nominated by the President, which is the Rajya Sabha. House P, directly elected with no nominated members, is the Lok Sabha.',
}));
Q('m_rs_term', mcq({
  t: 4, d: 2, c: 'application',
  stem: `Meera was elected to the Rajya Sabha in ${RS_JOIN} for a full term. In which year will her term end?`,
  opts: [String(RS_LEAVE), String(RS_JOIN + 5), String(RS_JOIN + 2), String(RS_JOIN + 4)],
  sol: `A Rajya Sabha member has a six-year term: ${RS_JOIN} + ${RS.term} = ${RS_LEAVE}.`,
}));
Q('fb_rs_nominated', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The President nominates ___ members to the Rajya Sabha.',
  acc: [['12', 'twelve']],
  sol: 'Twelve members are nominated.',
}));
Q('tf_rs_dissolve', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The President can dissolve the Rajya Sabha on the advice of the Prime Minister.',
  sol: 'The Rajya Sabha is a permanent House and cannot be dissolved; only the Lok Sabha can be.',
}));
Q('n_rs_term', num({
  t: 4, d: 2, c: 'understanding', marks: 1, value: RS_LEAVE, unit: 'year',
  stem: `An imagined member is elected to the Rajya Sabha in ${RS_JOIN} for a full term and is not re-elected. In which year does the member's term end?`,
  sol: `Step 1: The term is ${RS.term} years.\nStep 2: ${RS_JOIN} + ${RS.term} = ${RS_LEAVE}.`,
}));
Q('ar_rs_states', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Rajya Sabha is called the Council of States.',
  r: 'The Vice-President is the ex-officio Chairman of the Rajya Sabha.',
  sol: 'Both are true, but R does not explain A. It is called the Council of States because its members represent the States, being elected by the State legislatures.',
}));
Q('mt_rs_ls', match({
  t: 4, d: 2, c: 'understanding',
  stem: 'Match each feature with the House of Parliament or office it describes, as an imagined civics club at Shillong sorted them.',
  pairs: [
    ['Permanent House; one-third retire every second year', 'Rajya Sabha'],
    ['Term of five years unless dissolved earlier', 'Lok Sabha'],
    ['Presides over joint sittings of both Houses', 'Speaker of the Lok Sabha'],
    ['Ex-officio Chairman of the Council of States', 'Vice-President'],
  ],
  sol: 'Rotation belongs to the Rajya Sabha; the five-year term to the Lok Sabha; the Speaker presides at joint sittings; the Vice-President chairs the Rajya Sabha.',
}));
Q('s_rs_permanent', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Explain why the Rajya Sabha is said to be a permanent House.',
  model: 'It is **never dissolved** as a whole. Members serve **six years**, and about **one-third retire every second year**, with new members elected in their place, so the House continues without a break.',
  sol: 'No dissolution plus the rotation of members.',
  scheme: [['Not dissolved', 1], ['Six-year terms with one-third retiring every two years', 1]],
}));
Q('s_rs_two_qual', short({
  t: 4, d: 1, c: 'recall', marks: 2,
  stem: 'State two qualifications for membership of the Rajya Sabha that differ from or match those for the Lok Sabha.',
  model: '1. Must be a **citizen of India** (same as for the Lok Sabha). 2. Must be at least **30 years** of age (the Lok Sabha needs 25).',
  sol: 'Citizenship and the age of 30, with the comparison.',
  scheme: [['Citizenship', 1], ['Minimum age 30', 1]],
}));
Q('s_rs_nominated_why', short({
  t: 4, d: 2, c: 'analysis', marks: 2,
  stem: 'Why does the Constitution allow the President to nominate twelve members to the Rajya Sabha?',
  model: 'To bring into Parliament people with **special knowledge or practical experience** in **literature, science, art and social service**, who may not wish to contest elections. Their expertise **improves the quality of debate**.',
  sol: 'Who is nominated and the benefit to Parliament.',
  scheme: [['Fields of special knowledge', 1], ['Benefit to Parliament', 1]],
}));
Q('s_rs_chair', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Who presides over the Rajya Sabha, and who takes the chair in that person\'s absence?',
  model: 'The **Vice-President** of India presides as **ex-officio Chairman**. In the Chairman\'s absence the **Deputy Chairman**, elected by the members of the Rajya Sabha, presides.',
  sol: 'Chairman and Deputy Chairman.',
  scheme: [['Vice-President as Chairman', 1], ['Deputy Chairman in absence', 1]],
}));
Q('s3_rs_states_role', short({
  t: 4, d: 3, c: 'analysis', marks: 3,
  stem: 'Give three ways in which the Rajya Sabha protects the interests of the States in the federal system.',
  model: '1. Its members are **elected by the State legislatures**, so they speak for the States. 2. It can pass a resolution letting Parliament make laws on a **State List** subject in the **national interest**, so such a step needs its consent. 3. It can authorise the creation of new **All-India Services** shared by the Union and the States.',
  sol: 'Three roles connected with the States.',
  scheme: [['Election by State legislatures', 1], ['Consent for laws on State subjects', 1], ['All-India Services', 1]],
}));
Q('s4_compare', short({
  t: [2, 4], d: 3, c: 'analysis', marks: 4,
  stem: 'Distinguish between the Lok Sabha and the Rajya Sabha on any four points.',
  model: '1. **Election:** Lok Sabha directly by the people; Rajya Sabha by State legislators. 2. **Term:** Lok Sabha five years and can be dissolved; Rajya Sabha permanent, members serve six years. 3. **Age:** 25 for the Lok Sabha; 30 for the Rajya Sabha. 4. **Presiding officer:** the elected Speaker; the Vice-President as Chairman.',
  sol: 'Four points, each with both sides.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1], ['Fourth point', 1]],
}));

// ================================================================ 10-mark structured questions (3 + 3 + 4)
const L10 = (parts) => parts.flatMap(([label, n, steps]) => steps.map((st) => [`${label} ${st}`, 1])).slice(0, 10);
Q('l_ls_full', long({
  t: 2, d: 3, c: 'understanding', marks: 10,
  stem: 'With reference to the Lok Sabha, answer the following.\n\n(i) Describe its composition at present. [3]\n\n(ii) State any three qualifications for its membership. [3]\n\n(iii) Explain how its term of five years may be shortened or extended. [4]',
  model: `**(i)** Up to **${LS.states}** members elected from the States and up to **${LS.uts}** from the Union Territories (maximum **${LS_MAX}**); **${LS.present}** are elected at present by **direct election**; some seats are **reserved** for Scheduled Castes and Scheduled Tribes; no members are nominated since 2020.\n\n**(ii)** A **citizen of India**; at least **25 years** old; not holding an **office of profit** (also: name on an electoral roll; not of unsound mind).\n\n**(iii)** It may be **dissolved early** by the **President** on the advice of the **Prime Minister**, leading to a fresh election. During a **national emergency**, Parliament may **extend** its term by law by **one year at a time**, but not beyond **six months after the emergency** ends.`,
  sol: 'Composition with numbers and method; three qualifications; dissolution and extension with the limit.',
  scheme: L10([['(i)', 3, ['Elected limits for States and UTs', 'Present strength and direct election', 'Reserved seats or no nomination']], ['(ii)', 3, ['Citizenship', 'Age 25', 'Third qualification']], ['(iii)', 4, ['Early dissolution by the President', 'On the advice of the Prime Minister', 'Extension during an emergency, one year at a time', 'Not beyond six months after the emergency']]]),
}));
Q('l_speaker_full', long({
  t: 3, d: 3, c: 'understanding', marks: 10,
  stem: 'The Speaker is the guardian of the dignity of the Lok Sabha.\n\n(i) How is the Speaker elected, and how long does the Speaker hold office? [3]\n\n(ii) Explain the procedure for removing the Speaker. [3]\n\n(iii) Describe any four functions of the Speaker. [4]',
  model: '**(i)** The **members of the Lok Sabha elect** the Speaker **from among themselves**, usually at the first sitting of a new House. The Speaker holds office for the **life of the House** and continues after dissolution **until just before the first meeting** of the new Lok Sabha.\n\n**(ii)** A resolution for removal can be moved after at least **14 days\' notice**. It must be passed by a **majority of all the then members** (effective majority). While it is considered, the Speaker **does not preside** but may speak and vote in the first instance.\n\n**(iii)** (1) **Presides** and maintains **order and decorum**; (2) **certifies Money Bills**, and the decision is final; (3) gives a **casting vote** in a tie; (4) **presides over joint sittings** of both Houses. (Also: adjourns the House for want of quorum; decides questions of disqualification on grounds of defection.)',
  sol: 'Election and tenure; removal procedure with notice and majority; four functions.',
  scheme: L10([['(i)', 3, ['Elected by members from among themselves', 'Holds office for the life of the House', 'Continues till the new House meets']], ['(ii)', 3, ['Fourteen days notice', 'Effective majority', 'Does not preside during the resolution']], ['(iii)', 4, ['First function', 'Second function', 'Third function', 'Fourth function']]]),
}));
Q('l_rs_full', long({
  t: 4, d: 3, c: 'understanding', marks: 10,
  stem: 'Answer the following questions about the Rajya Sabha.\n\n(i) What is its composition? [3]\n\n(ii) How are its members chosen, and what is their term? [3]\n\n(iii) Explain why it is called a permanent House, and name its Presiding Officer. [4]',
  model: `**(i)** Maximum **${RS_MAX}** members: up to **${RS.elected}** representatives of the **States and Union Territories** and **${RS.nominated}** members **nominated by the President**; the present strength is **${RS.present}**.\n\n**(ii)** State representatives are **elected by the elected members of the State Legislative Assemblies** by **proportional representation** with the **single transferable vote**; the twelve are **nominated** for special knowledge in literature, science, art and social service. Each member has a **six-year** term.\n\n**(iii)** It is **never dissolved**; about **one-third** of the members **retire every second year**, so the House continues. Its Presiding Officer is the **Vice-President** as **ex-officio Chairman**, helped by an elected **Deputy Chairman**.`,
  sol: 'Composition with numbers; method of choice and term; permanence and presiding officer.',
  scheme: L10([['(i)', 3, ['Maximum 250', 'Up to 238 elected', '12 nominated']], ['(ii)', 3, ['Elected by MLAs', 'Proportional representation, single transferable vote', 'Six-year term']], ['(iii)', 4, ['Not dissolved', 'One-third retire every two years', 'Vice-President as Chairman', 'Deputy Chairman']]]),
}));
Q('l_federal_full', long({
  t: [1, 4], d: 3, c: 'application', marks: 10,
  stem: 'India has a federal set-up with a strong Centre.\n\n(i) Explain how legislative powers are divided between the Union and the States. [3]\n\n(ii) Classify the following subjects into the correct lists: banking, agriculture, marriage and divorce. Give a reason for any one. [3]\n\n(iii) Explain any two ways in which the Rajya Sabha reflects the federal nature of Parliament. [4]',
  model: '**(i)** The **Seventh Schedule** has three lists: the **Union List** (subjects of national importance), the **State List** (subjects of local importance) and the **Concurrent List** (both may legislate). **Residuary** subjects are with the **Union**.\n\n**(ii)** **Banking:** Union List. **Agriculture:** State List. **Marriage and divorce:** Concurrent List. Reason, e.g. banking needs **one uniform system** for the whole country, so it is a Union subject.\n\n**(iii)** (1) Its members are **elected by the State legislatures**, so the **States are represented** as units in Parliament. (2) Its consent by a **special resolution** is needed before Parliament can make a law on a **State List** subject in the national interest, which **protects State powers**.',
  sol: 'Three lists and residuary power; three classifications with one reason; two federal roles of the Rajya Sabha explained.',
  scheme: L10([['(i)', 3, ['Three lists named', 'Concurrent: both legislate', 'Residuary with the Union']], ['(ii)', 3, ['Banking: Union', 'Agriculture: State', 'Marriage: Concurrent with a reason']], ['(iii)', 4, ['Election by State legislatures', 'Explained as representation of States', 'Consent for laws on State subjects', 'Explained as protection of State powers']]]),
}));
Q('l_compare_houses', long({
  t: [2, 4], d: 4, c: 'analysis', marks: 10,
  stem: 'Compare the two Houses of Parliament.\n\n(i) Give three differences in the way members of the two Houses are chosen. [3]\n\n(ii) Give three differences in their terms and tenure. [3]\n\n(iii) "The Lok Sabha is more powerful than the Rajya Sabha." Give four reasons in support of this statement. [4]',
  model: '**(i)** (1) Lok Sabha members are **directly elected** by the people; Rajya Sabha members are **indirectly elected** by State legislators. (2) The Rajya Sabha has **twelve nominated** members; the Lok Sabha has **none** since 2020. (3) The Lok Sabha uses **first-past-the-post** in constituencies; the Rajya Sabha uses **proportional representation** with the single transferable vote.\n\n**(ii)** (1) The Lok Sabha has a **five-year term**; Rajya Sabha members serve **six years**. (2) The Lok Sabha **can be dissolved**; the Rajya Sabha **cannot**. (3) The whole Lok Sabha is elected at once; in the Rajya Sabha **one-third retire every second year**.\n\n**(iii)** (1) The **Council of Ministers** is responsible to the Lok Sabha alone. (2) **Money Bills** start only there, and the Rajya Sabha can delay them for only **14 days**. (3) A **no-confidence motion** can be moved only in the Lok Sabha. (4) In a **joint sitting**, the larger Lok Sabha usually prevails.',
  sol: 'Three differences in choice; three in tenure; four reasons for Lok Sabha predominance.',
  scheme: L10([['(i)', 3, ['Direct vs indirect', 'Nominated members', 'Method of voting']], ['(ii)', 3, ['Term five vs six years', 'Dissolution', 'Rotation']], ['(iii)', 4, ['Ministerial responsibility', 'Money Bills', 'No-confidence motion', 'Joint sitting']]]),
}));
Q('l_speaker_eval', long({
  t: 3, d: 4, c: 'evaluation', marks: 10,
  stem: 'In an imagined debate at Kalimpong Higher Secondary School, students asked whether the Speaker can stay neutral after being elected with the support of a party.\n\n(i) State three powers of the Speaker over the conduct of business in the House. [3]\n\n(ii) Explain three safeguards that protect the independence of the Speaker. [3]\n\n(iii) Give two arguments for and two against the view that the Speaker can be neutral, and conclude. [4]',
  model: '**(i)** (1) Decides **who speaks** and in what order; (2) can **adjourn or suspend** the sitting in grave disorder; (3) decides on **points of order** and whether a bill is a **Money Bill**.\n\n**(ii)** (1) Removal needs an **effective majority** with **14 days\' notice**. (2) The Speaker votes only to **break a tie**. (3) The Speaker\'s **rulings** on procedure **cannot be challenged** in the House, and the salary is **charged** on the Consolidated Fund.\n\n**(iii)** **For:** the office has **strong safeguards**; Speakers often act on **established rules** and conventions. **Against:** the Speaker owes the post to the **majority party**; some decisions, such as on disqualification, may be **seen as partisan**. **Conclusion:** neutrality is **possible and expected**, and depends on the **conduct** of the person and respect for conventions (any reasoned conclusion).',
  sol: 'Three powers; three safeguards; two arguments each way with a reasoned conclusion.',
  scheme: L10([['(i)', 3, ['First power', 'Second power', 'Third power']], ['(ii)', 3, ['Removal procedure', 'Casting vote only', 'Rulings and salary protected']], ['(iii)', 4, ['First argument for', 'Second argument for', 'Two arguments against', 'Reasoned conclusion']]]),
}));
Q('l_rs_value', long({
  t: [4, 1], d: 4, c: 'evaluation', marks: 10,
  stem: 'Some people call the Rajya Sabha a "House of second thoughts".\n\n(i) Explain what this phrase means. [3]\n\n(ii) Explain three ways in which the Rajya Sabha is useful to Indian democracy. [3]\n\n(iii) Give two limitations of the Rajya Sabha compared with the Lok Sabha, and two reasons why a second House is still worth having. [4]',
  model: '**(i)** The Rajya Sabha **re-examines bills** passed by the Lok Sabha. Its members, being **experienced** and less pressed by elections, can **debate calmly**, so hasty laws can be **revised**.\n\n**(ii)** (1) It **represents the States** in Parliament. (2) Its **nominated experts** improve debate. (3) As a **permanent House**, it gives **continuity** when the Lok Sabha is dissolved.\n\n**(iii)** **Limitations:** it can only **delay a Money Bill** for 14 days; the **ministers are not responsible** to it. **Worth having:** it **checks hasty legislation**; it gives the **States a voice** in a federal system.',
  sol: 'Meaning; three uses; two limits and two justifications.',
  scheme: L10([['(i)', 3, ['Re-examines bills', 'Experienced members, calmer debate', 'Can revise hasty laws']], ['(ii)', 3, ['Represents States', 'Experts', 'Continuity']], ['(iii)', 4, ['Money Bill limit', 'No ministerial responsibility', 'Checks hasty laws', 'Voice for States']]]),
}));

// ================================================================ source / case items
Q('sb_diary_speaker', source({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the diary entry of Tenzin, a Class 10 student from Gangtok who watched a session from the Lok Sabha visitors' gallery, and answer the questions that follow. ${ORIGIN}`,
  passage: '**Diary of Tenzin (imagined), written after a visit to Parliament**\n\nThe person in the high chair at the front of the House never once raised a hand to vote. When two members began arguing loudly, the presiding officer stood up, and the House fell silent at once. Later, a vote on an amendment was tied, and everyone turned towards the chair. Our teacher told us that this officer is chosen by the members themselves and does not lose the post even when the House is dissolved.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Identify the presiding officer Tenzin describes.', model: 'The **Speaker** of the Lok Sabha.', sol: 'Presides over the Lok Sabha, elected by its members.', scheme: [['Speaker', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'understanding', marks: 1, stem: 'Why did everyone turn towards the chair when the vote was tied?', model: 'Because the Speaker has a **casting vote** to break a **tie**.', sol: 'The casting vote.', scheme: [['Casting vote in a tie', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Explain the line "does not lose the post even when the House is dissolved".', model: 'The Speaker stays in office **until just before the first meeting of the new Lok Sabha**, so that the office is **never vacant** between two Houses.', sol: 'Rule and reason.', scheme: [['Rule', 1], ['Reason', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why did the presiding officer never raise a hand to vote? Give two reasons.', model: '(1) The Speaker **does not vote in the first instance**, only in a tie. (2) This keeps the Speaker **impartial** and above party competition in the House.', sol: 'Rule and its purpose.', scheme: [['Rule on voting', 1], ['Purpose: impartiality', 1]] }),
    ]),
  ],
}));
Q('cb_mock_parliament', caseQ({
  t: [2, 4], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the notice for a mock Parliament at Riverside School, Nagpur, and answer the questions that follow. ${ORIGIN}`,
  passage: '**Notice: Mock Parliament Week (imagined)**\n\nClass 10 will form two Houses. House A will have one member for each section of the school, elected by the students of that section, and will meet for the term of the school year unless the Principal ends it early. House B will have members chosen by the class monitors of each section, plus four members named by the Principal for their talent in music, art and science. In House B, one-third of the members will step down every month and be replaced, so that the House never closes. The Vice-Principal will chair House B.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which real House of Parliament is House A modelled on?', model: 'The **Lok Sabha**: directly elected and can be ended early (dissolved).', sol: 'Direct election and dissolution.', scheme: [['Lok Sabha', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which feature of House B copies the President\'s power in the real Rajya Sabha?', model: 'The **four members named by the Principal** for talent, like the **twelve members nominated by the President**.', sol: 'Nomination for special knowledge.', scheme: [['Nominated members', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which line shows that House B is a permanent House? Explain how this matches the Rajya Sabha.', model: '"One-third of the members will step down every month … so that the House never closes." The Rajya Sabha is **never dissolved**; **one-third of its members retire every second year**.', sol: 'Quote the line and link it to the real rule.', scheme: [['Line quoted', 1], ['Link to the Rajya Sabha', 1]] }), [
      short({ t: 4, d: 2, c: 'understanding', marks: 2, stem: '**Or** (ii): Who chairs the real Rajya Sabha, and why is the Vice-Principal a fitting choice in the mock version?', model: 'The **Vice-President** is the **ex-officio Chairman** of the Rajya Sabha. The Vice-Principal holds the matching **second-highest** office in the school.', sol: 'Real rule and the parallel.', scheme: [['Vice-President as Chairman', 1], ['The parallel', 1]] }),
    ]),
  ],
}));
Q('cb_lists_dispute', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined news report from the State of Vindhyachal and answer the questions that follow. ${ORIGIN}`,
  passage: '**Report from an imagined newspaper, Vindhyachal Times**\n\nThe State Assembly passed a law on the working hours of factory electricians, a subject on which Parliament has also made a law. The two laws disagree on the length of the weekly rest. A trade union went to court asking which law workers must follow. Meanwhile, the State government also announced new rules for village police posts, and the Union government said it would soon bring a law on drone deliveries, a matter not mentioned in any list.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'To which list do village police posts belong?', model: 'The **State List**.', sol: 'Police is a State subject.', scheme: [['State List', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which power allows the Union to make a law on drone deliveries?', model: '**Residuary powers**, which belong to the **Union** (Parliament).', sol: 'Unlisted subjects.', scheme: [['Residuary power of the Union', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): In the dispute over factory working hours, which law will generally prevail, and why?', model: 'The **law made by Parliament** generally prevails, because on a **Concurrent List** subject a Union law overrides a conflicting State law to the extent of the conflict.', sol: 'Union law on a Concurrent subject.', scheme: [['Union law prevails', 1], ['Reason: Concurrent List rule', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one advantage and one disadvantage of letting both levels of government make laws on the same subject.', model: '**Advantage:** States can make laws suited to **local needs**. **Disadvantage:** laws may **conflict**, creating **confusion** and disputes, as with the weekly rest.', sol: 'One advantage and one disadvantage.', scheme: [['Advantage', 1], ['Disadvantage', 1]] }),
    ]),
  ],
}));
