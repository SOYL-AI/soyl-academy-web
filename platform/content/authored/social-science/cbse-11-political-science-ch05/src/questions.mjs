// CBSE 11 Political Science, ch05 Legislature: question bank. Every passage (newspaper report, Question Hour transcript,
// committee report, member's letter, table of sitting days) is written by SOYL and labelled as imagined; the bills (Coastal
// Fisheries Bill, Village Libraries Bill, Urban Lakes Protection Bill, Coastal Levy Bill, Harbour Tax Bill), the members,
// parties, newspapers, the federation of Rhenia and the country of Veldora are imagined. No NCERT text, boxed source,
// cartoon, Constitution text, speech, court judgment or board/sample-paper item is reused (D-036). Articles and
// amendments are cited by number with a paraphrase of what they provide.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Parliament: Lok Sabha and Rajya Sabha
Q('m_why', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which pair of tasks forms the central work of a legislature such as the Parliament of India?',
  opts: ['Making laws and keeping a watch on the executive', 'Carrying out laws and trying offenders', 'Collecting taxes and conducting elections', 'Appointing civil servants and commanding the armed forces'],
  sol: 'A legislature frames laws and holds the government to account. Carrying out laws belongs to the executive, trying offenders to the courts, and elections are conducted by the Election Commission; appointing civil servants and commanding the forces are executive functions.',
}));
Q('m_bicam', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The imagined federation of Rhenia decides that its Union legislature will have two Houses. Which reason best fits the choice of two Houses for a federation?',
  opts: ['One House can speak for the people and the other for the units of the federation, and each can reconsider the work of the other', 'Two Houses make every law pass twice as fast', 'A democracy is not allowed to have a single House', 'The second House exists only to elect the head of state'],
  sol: 'The usual argument for a second House is that it gives the units of a federation a voice and allows a bill to be reconsidered. Speed is not the aim, democracies do function with one House, and electing the head of state is only a small part of the task of a second House.',
}));
Q('m_councils', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'As of 2024, how many States of India have a Legislative Council as a second House of the State Legislature?',
  opts: ['Six', 'Fourteen', 'Twenty', 'Not one'],
  sol: 'Only six States have a Legislative Council, and most States have a single House, the Legislative Assembly. The figures fourteen and twenty overstate the number, and zero is wrong since some Councils do exist.',
}));
Q('m_rs_member', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Dr Anjali Mehra is elected to the Rajya Sabha from the imagined State of Palmora. Who voted in that election?',
  opts: ['The elected members of the Palmora Legislative Assembly', 'All the registered voters of Palmora', 'The Lok Sabha members elected from Palmora', 'The Chief Minister and the ministers of Palmora alone'],
  sol: 'Rajya Sabha members are chosen indirectly by the elected members of the State Legislative Assembly. Ordinary voters elect the Assembly and the Lok Sabha, not the Rajya Sabha; Lok Sabha members and the ministers alone are not the electors.',
}));
Q('m_rs_max', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The Constitution sets the maximum strength of the Rajya Sabha at 250 members. How many of them are nominated by the President, and for what reason?',
  opts: ['Twelve, for distinction in art, literature, science and social service', 'Two, to represent a community', 'Twelve, to represent the Union Territories', 'Twenty-five, for service in the armed forces'],
  sol: 'Twelve members are nominated for special knowledge or practical experience in art, literature, science and social service, and the other seats (238 at most) are elected. The remaining options give wrong numbers or invented purposes.',
}));
Q('m_rs_term', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Radhika Nair is elected to the Rajya Sabha in 2026 and serves her full term without resigning. Her term ends in',
  opts: ['2032', '2031', '2030', '2028'],
  sol: 'The term is six years, so 2026 plus 6 gives 2032. Five years would give 2031, and 2028 is the sort of date that results from confusing the term with the two-yearly retirement of one-third of the House.',
}));
Q('m_rs_perm', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The Rajya Sabha is described as a permanent House because',
  opts: ['it is never dissolved as a whole, and about one-third of its members retire every two years', 'its members are elected for life', 'it meets throughout the year without a break', 'its members cannot be removed by the Chairman'],
  sol: 'Continuity comes from the fact that the House is not dissolved and members retire in batches. Members serve for six years and not for life, sittings are held in sessions, and the Chairman\'s powers have nothing to do with the description.',
}));
Q('m_ls_dissolve', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the third year after a general election, no leader can show majority support in the Lok Sabha, and the House is dissolved. What happens to the Rajya Sabha at that time?',
  opts: ['It continues to exist, since it is not subject to dissolution', 'It is dissolved at the same moment', 'It is dissolved after six months', 'All its members retire together'],
  sol: 'Only the Lok Sabha can be dissolved before its five years are over. The Rajya Sabha goes on, with its members retiring in batches, so the other options wrongly extend dissolution to it.',
}));
Q('m_ls_size', mcq({
  t: 1, d: 3, c: 'recall',
  stem: 'As of 2024, the Constitution allows the Lok Sabha up to 550 elected members, while the number of Lok Sabha constituencies is',
  opts: ['543', '550', '530', '545'],
  sol: 'There are 543 constituencies. The figure 550 is the constitutional maximum and not the actual number; 530 is the number the Constitution allows for the States, and 545 is not a figure the Constitution fixes for the Lok Sabha.',
}));
Q('m_anglo', mcq({
  t: 1, d: 3, c: 'recall',
  stem: 'Which constitutional change ended the nomination of two Anglo-Indian members to the Lok Sabha?',
  opts: ['The 104th Amendment (passed in 2019, in effect from 2020)', 'The 42nd Amendment (1976)', 'The 91st Amendment (2003)', 'The 52nd Amendment (1985)'],
  sol: 'The 104th Amendment ended the nomination. The 42nd concerned wide changes of 1976, the 91st limited the size of the Council of Ministers, and the 52nd added the anti-defection provisions.',
}));
Q('m_unequal', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'In the imagined federation of Rhenia, the second chamber gives every province exactly three seats, however large the province. In India, in contrast, Rajya Sabha seats are',
  opts: ['allotted to the States broadly in proportion to population, so larger States have more seats', 'equal for every State, exactly as in Rhenia', 'fixed each year by the Speaker according to the revenue of each State', 'given only to the States that have a Legislative Council'],
  sol: 'Representation in the Rajya Sabha is unequal and follows population broadly, which is a notable difference from systems like the American Senate or the imagined Rhenia. The Speaker has no role, and revenue or the presence of a Council does not decide the allotment.',
}));
Q('m_money_origin', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Coastal Levy Bill proposes a new tax on exports of dried fish and is certified as a money bill. In which House can it be introduced?',
  opts: ['Only in the Lok Sabha', 'Only in the Rajya Sabha', 'In either House, at the choice of the minister', 'In a joint sitting of both Houses'],
  sol: 'A money bill is introduced only in the Lok Sabha. Ordinary bills can start in either House, and a joint sitting is a way of settling a disagreement, not a place where bills begin.',
}));
Q('m_money_14', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The Lok Sabha passes a money bill on 1 March and sends it to the Rajya Sabha, which takes no action. What is the position after 14 days?',
  opts: ['The bill is deemed passed by both Houses in the form the Lok Sabha passed it', 'The bill lapses and must be introduced afresh', 'A joint sitting must be called to decide it', 'The bill waits until the Rajya Sabha chooses to take it up'],
  sol: 'The Rajya Sabha can only delay a money bill for 14 days, after which it is treated as passed. There is no lapse, no joint sitting for money bills, and no indefinite wait.',
}));
Q('m_certify', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'If a doubt arises whether the imagined Harbour Tax Bill is a money bill, whose certificate settles the question?',
  opts: ['The Speaker of the Lok Sabha', 'The Chairman of the Rajya Sabha', 'The Prime Minister', 'The Chief Justice of India'],
  sol: 'The Speaker certifies a money bill, and that decision is final. The Chairman presides over the other House, and neither the Prime Minister nor the Chief Justice has this task.',
}));
Q('m_noconf_rs', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Members of the Opposition in the Rajya Sabha wish to pass a no-confidence motion to remove the Council of Ministers. Why will this not succeed?',
  opts: ['Only the Lok Sabha can pass a no-confidence motion that forces the Council to resign', 'The Rajya Sabha is not allowed to discuss the Council of Ministers', 'A no-confidence motion can be passed only by the President', 'The Council is answerable to the Vice-President'],
  sol: 'The Council of Ministers is collectively responsible to the Lok Sabha alone, so only that House can pass the motion. The Rajya Sabha can discuss and criticise ministers, the President does not pass motions, and the Vice-President is not the authority to whom the Council answers.',
}));
Q('m_249', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'Parliament wishes to make a law on a subject on the State List because it has become a national concern. Under Article 249, which step must come first?',
  opts: ['The Rajya Sabha passes a resolution, supported by two-thirds of the members present and voting, that this is necessary in the national interest', 'The Lok Sabha passes a resolution by a simple majority', 'Every State Legislature passes its own resolution', 'The President issues an ordinance on the subject'],
  sol: 'Article 249 gives the initiative to the Rajya Sabha, which speaks for the States, and requires a two-thirds majority present and voting. A Lok Sabha resolution, state resolutions and an ordinance are not the route this Article provides.',
}));
Q('m_312', mcq({
  t: 1, d: 3, c: 'recall',
  stem: 'The creation of a new All India Service requires a resolution of',
  opts: ['the Rajya Sabha, supported by two-thirds of its members present and voting', 'the Lok Sabha, by a simple majority', 'the State Legislative Councils', 'the Union Public Service Commission'],
  sol: 'Under Article 312 the Rajya Sabha must pass the resolution by two-thirds of those present and voting. The Lok Sabha has no such special role here, Councils exist in few States, and the Commission recruits for existing services.',
}));

// ---------------------------------------------------------------- t02 Law-making and control
Q('m_first', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A minister rises in the Lok Sabha, introduces the imagined Village Libraries Bill and states its aim; members do not yet discuss the clauses. This stage is',
  opts: ['the introduction and first reading', 'the second reading', 'the third reading', 'the assent'],
  sol: 'At the first reading the bill is only introduced. The second reading is when the principles and clauses are debated, the third reading is the final vote, and assent comes from the President at the end.',
}));
Q('m_second', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'During the second reading of the imagined Urban Lakes Protection Bill, members feel that its clauses need a closer study with expert opinion. What is the usual step?',
  opts: ['The bill is referred to a committee, which studies it and reports back to the House', 'The bill is sent to the President for advice', 'The bill is dropped without a vote', 'The bill passes to the other House without any vote'],
  sol: 'A bill may be referred to a committee after the second reading for detailed study. The President does not advise at this stage, dropping a bill is not what a closer study means, and a bill must be voted on before moving to the other House.',
}));
Q('m_assent_return', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Both Houses have passed an ordinary bill. The President returns it with a message asking Parliament to reconsider it, and Parliament passes it again, with or without changes. What follows?',
  opts: ['The President cannot withhold assent to it', 'The bill lapses', 'The bill must go to a joint sitting', 'The President may return it again, with no limit'],
  sol: 'An ordinary bill can be returned once; if Parliament passes it again, assent must be given. There is no lapse, a joint sitting is for disagreement between the Houses, and a second return is not allowed.',
}));
Q('m_joint_presides', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'A joint sitting of the two Houses to settle a disagreement over an ordinary bill is presided over by the',
  opts: ['Speaker of the Lok Sabha', 'Vice-President', 'Prime Minister', 'President'],
  sol: 'The Speaker presides at a joint sitting. The Vice-President chairs only the Rajya Sabha, the Prime Minister is a member of one House, and the President summons the sitting but does not preside.',
}));
Q('m_joint_trigger', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'In the imagined case of the Coastal Fisheries Bill, an ordinary bill, the Lok Sabha passes it and the Rajya Sabha rejects it. Which statement is correct?',
  opts: ['A joint sitting may be called under Article 108, and the bill is decided by a majority of members present and voting', 'The bill is dead and can never be tried again', 'The Lok Sabha decides alone, as with a money bill', 'The President decides which House is right'],
  sol: 'For an ordinary bill, disagreement between the Houses can be settled at a joint sitting. The bill is not dead, the Lok Sabha does not decide alone since this is not a money bill, and the President does not rule between the Houses.',
}));
Q('m_joint_money', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'The Rajya Sabha returns the imagined Harbour Tax Bill, certified as a money bill, with several suggestions, and the Lok Sabha rejects all of them. What happens next?',
  opts: ['The bill goes forward in the form the Lok Sabha passed it, since a money bill has no joint sitting', 'A joint sitting under Article 108 is called', 'The bill is withdrawn', 'The Rajya Sabha is asked to vote again until it agrees'],
  sol: 'The Lok Sabha view prevails on a money bill, and Article 108 does not apply to it. The bill is not withdrawn, and the Rajya Sabha has no power to hold it back by repeated voting.',
}));
Q('m_private', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Meenal Rao, who is not a minister, introduces a bill in the Lok Sabha on a right to rest for night-shift workers in the imagined session. This is a',
  opts: ['private member\'s bill', 'government bill', 'money bill', 'budget bill'],
  sol: 'A bill introduced by a member who is not a minister is a private member\'s bill. A government bill is introduced by a minister, and a money bill and a budget bill concern taxation and spending and are brought on behalf of the government.',
}));
Q('m_qhour', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the first hour of a sitting, a member asks the imagined Minister of Fisheries a question about the number of cold-storage units built under a scheme, and the minister replies. This part of the day is called',
  opts: ['Question Hour', 'Zero Hour', 'the adjournment motion', 'the third reading'],
  sol: 'Questions to ministers in the first hour make up Question Hour. Zero Hour follows it and has no notice, the adjournment motion sets aside the business of the day, and the third reading is a stage of a bill.',
}));
Q('m_zero', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Just after Question Hour, Prakash Iyer stands and raises, without earlier notice, the matter of a school bus accident in his constituency. The practice by which such matters are raised is called',
  opts: ['Zero Hour', 'a no-confidence motion', 'a money bill', 'a joint sitting'],
  sol: 'Raising urgent matters soon after Question Hour is Zero Hour, a practice and not a rule written in the formal rules of procedure. The other options are a motion to remove the government, a kind of bill, and a meeting of both Houses.',
}));
Q('m_adjourn', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'Members give notice of a motion that, if admitted, would set aside the business of the day to discuss a recent factory fire, a definite matter of urgent public importance. Which instrument are they using?',
  opts: ['An adjournment motion', 'A no-confidence motion', 'Zero Hour', 'A private member\'s bill'],
  sol: 'An adjournment motion draws attention to a definite urgent matter and interrupts the normal business. A no-confidence motion tests the government\'s majority, Zero Hour sets aside no business, and a private member\'s bill proposes a law.',
}));
Q('m_pac', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A report of the Comptroller and Auditor General says that an imagined ministry spent 40 crore rupees on projects without Parliament\'s sanction. Which parliamentary committee will examine the report?',
  opts: ['The Public Accounts Committee', 'The Business Advisory Committee', 'The Committee on Privileges', 'A select committee on a bill'],
  sol: 'Audit reports on government spending go to the Public Accounts Committee. The Business Advisory Committee arranges time for business, the Committee on Privileges deals with the rights of members, and a select committee studies a particular bill.',
}));
Q('m_cag', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Comptroller and Auditor General',
  opts: ['audits government accounts and submits reports that are placed before Parliament', 'prepares the annual budget', 'recruits civil servants for the Union', 'settles disputes between States'],
  sol: 'The office audits the accounts of the Union and the States and reports to Parliament through the President. The budget is prepared by the executive, recruitment is by the Commissions, and disputes between States are dealt with by other bodies.',
}));
Q('m_dept', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'One reason why department-related standing committees are valued is that',
  opts: ['they study the work and budgets of ministries in detail through the year, away from the heat of floor debates', 'they pass laws on behalf of Parliament', 'they replace Question Hour', 'they elect the Speaker'],
  sol: 'Committees allow close, continuous scrutiny in a smaller setting. They recommend and report but do not pass laws, Question Hour continues alongside them, and the Speaker is elected by the Lok Sabha.',
}));
Q('m_jpc', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Members of both Houses are chosen for a panel to examine the imagined Urban Lakes Protection Bill, and the panel is to end its life once it reports. Such a body is best described as',
  opts: ['an ad hoc committee with members from both Houses, set up for a particular bill or matter', 'a permanent committee of the Lok Sabha alone', 'a committee of the President and the Prime Minister', 'the committee that fixes the sitting days of Parliament'],
  sol: 'A joint committee has members of both Houses and is formed for a particular purpose, after which it ends. It is not permanent or confined to one House, and it does not include the President and Prime Minister or fix sitting dates.',
}));
Q('m_whip', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Karan Sethi, a Lok Sabha member of the imagined Unity Party, votes against the Village Libraries Bill although his party issued a whip to vote for it. He had no permission, and his party did not condone the act within fifteen days. Who decides whether he is disqualified under the Tenth Schedule?',
  opts: ['The Speaker of the Lok Sabha', 'The Election Commission', 'The Prime Minister', 'The Chairman of the Rajya Sabha'],
  sol: 'The presiding officer of the House to which the member belongs decides, so the Speaker decides for a Lok Sabha member. The Election Commission, the Prime Minister and the other House\'s Chairman have no such task.',
}));
Q('m_split', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Before 2003, a group of one-third of a party\'s legislators could leave the party without being disqualified. This exception for a split was removed by the',
  opts: ['91st Amendment (2003)', '52nd Amendment (1985)', '44th Amendment (1978)', '104th Amendment (2019)'],
  sol: 'The 91st Amendment removed the split exception. The 52nd Amendment first introduced the anti-defection law (with that exception), the 44th concerned advice to the President, and the 104th ended the nomination of Anglo-Indian members.',
}));
Q('m_52', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Tenth Schedule, which provides for disqualification on the ground of defection, was added by the',
  opts: ['52nd Amendment (1985)', '42nd Amendment (1976)', '91st Amendment (2003)', '44th Amendment (1978)'],
  sol: 'The Tenth Schedule came with the 52nd Amendment in 1985. The 42nd and 44th belong to the 1970s, and the 91st of 2003 amended the law rather than introducing it.',
}));
Q('m_decline_ev', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'In an imagined newspaper debate, one writer says Parliament matters less than before because it meets for fewer days each year. Another replies that committees now study many bills in detail. Which statement best describes the two positions?',
  opts: ['Each points to a different kind of evidence, so a fair judgment weighs sitting time and committee scrutiny together', 'The first claim is plainly right and the second plainly wrong', 'The second claim is plainly right and the first plainly wrong', 'The claims cannot be examined, since Parliament keeps no records'],
  sol: 'The two writers use different indicators, and a balanced view needs both together with the actual data. Neither claim is automatically correct, and the proceedings and committee reports are recorded and can be studied.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_bicam', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'A federal country such as India gains from having a second House at the Union level.',
  r: 'The Rajya Sabha gives the States a voice in making laws for the Union.',
  sol: 'Both are true, and R explains A: representation of the States in the Union legislature is a principal benefit of a second House in a federation.',
}));
Q('ar_perm', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'The Rajya Sabha is not dissolved as a whole.',
  r: 'Its members hold six-year terms, and about one-third retire every second year.',
  sol: 'Both are true, and R explains A: because members retire in batches, there are always sitting members, so the House continues without a general dissolution.',
}));
Q('ar_money', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The Rajya Sabha can delay a money bill for only 14 days.',
  r: 'The Rajya Sabha has a maximum strength of 250 members.',
  sol: 'Both are true, but R does not explain A: the limited delay reflects the special position of the Lok Sabha over money matters, not the size of the Rajya Sabha.',
}));
Q('ar_joint', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A joint sitting can be called to settle a deadlock between the Houses over a money bill.',
  r: 'A money bill follows a special procedure in which the view of the Lok Sabha prevails.',
  sol: 'A is false: a joint sitting under Article 108 applies to ordinary bills, not money bills. R is true, and it explains why no joint sitting is needed for a money bill.',
}));
Q('ar_zero', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Zero Hour is used by members to raise urgent matters soon after Question Hour.',
  r: 'Zero Hour is a procedure laid down in detail in the Constitution.',
  sol: 'A is true. R is false: Zero Hour is a parliamentary practice that grew up over time and is not a procedure fixed by the Constitution or in the formal rules as such.',
}));
Q('ar_defect', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'A member who disobeys the party whip, without permission and without being forgiven, can be disqualified under the Tenth Schedule.',
  r: 'The presiding officer of the House decides questions of disqualification for defection.',
  sol: 'Both are true, but R does not explain A: the ground for disqualification lies in the Tenth Schedule, while R only says who decides the question.',
}));

// ---------------------------------------------------------------- true-false, fill in the blank, match, ordering
Q('tf_budget', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: 'The Rajya Sabha votes on the demands for grants in the Union budget in the same way as the Lok Sabha.',
  sol: 'Demands for grants are voted on only in the Lok Sabha; the Rajya Sabha may discuss the budget but does not vote on them.',
}));
Q('tf_return', tf({
  t: 2, d: 3, c: 'application', ans: true,
  stem: 'In the imagined Village Libraries Bill case, the President returned an ordinary bill once; Parliament passed it again and the President then had to give assent.',
  sol: 'An ordinary bill can be sent back once for reconsideration. If Parliament passes it again, assent must follow.',
}));
Q('tf_nominated', tf({
  t: 1, d: 3, c: 'application', ans: true,
  stem: 'A nominated Rajya Sabha member, Dr Vimala Rao, can take part in voting on an ordinary bill.',
  sol: 'Nominated members vote on bills like other members. They do not vote in the election of the President but do vote in that of the Vice-President.',
}));
Q('fb_tenth', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The provisions on disqualification for defection are contained in the ___ Schedule of the Constitution.',
  acc: [['Tenth', '10th', '10']],
  sol: 'The Tenth Schedule, added in 1985, sets out the grounds of disqualification for defection.',
}));
Q('fb_108', fb({
  t: 2, d: 3, c: 'recall',
  stem: 'A joint sitting of the two Houses to settle a disagreement on an ordinary bill is provided for in Article ___.',
  acc: [['108', 'one hundred and eight']],
  sol: 'Article 108 provides for the joint sitting; a money bill is excluded from it.',
}));
Q('fb_14', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The Rajya Sabha can delay a money bill for at most ___ days.',
  acc: [['14', 'fourteen']],
  sol: 'After fourteen days a money bill is deemed passed even if the Rajya Sabha has done nothing.',
}));
Q('mt_instr', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each instrument of parliamentary control with its description.',
  pairs: [
    ['Question Hour', 'Questions put to ministers in the first hour of a sitting'],
    ['Zero Hour', 'Urgent matters raised without notice, as a practice'],
    ['Adjournment motion', 'Sets aside the day\'s business to discuss an urgent public matter'],
    ['No-confidence motion', 'Tests whether the government has the Lok Sabha\'s majority'],
  ],
  sol: 'Each instrument has its own use, from routine questions to the removal of the Council of Ministers.',
}));
Q('mt_bodies', match({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each body with its description.',
  pairs: [
    ['Comptroller and Auditor General', 'Audits government accounts and reports to Parliament'],
    ['Public Accounts Committee', 'Examines the audit reports on spending'],
    ['Department-related standing committee', 'Studies the work and budget of a group of ministries'],
    ['Joint Parliamentary Committee', 'Ad hoc, with members of both Houses, for a special matter'],
  ],
  sol: 'The auditor reports, the Public Accounts Committee examines, the standing committee follows a ministry, and the joint committee is formed for a special purpose.',
}));
Q('ord_bill', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the stages of the imagined Urban Lakes Protection Bill, an ordinary bill that starts in the Lok Sabha, in the order in which they occur.',
  items: [
    'The bill is introduced and its aim is stated (first reading)',
    'The principles and clauses are debated, and a committee may study it (second reading)',
    'The clauses are voted on and the final vote is taken (third reading)',
    'The bill is taken up in the Rajya Sabha through the same stages',
    'The President gives assent and the bill becomes an Act',
  ],
  sol: 'A bill is passed in the first House, then the second, and only then is assent given.',
}));
Q('ord_dates', ord({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these developments connected with Parliament in the order in which they happened.',
  items: [
    'The Constitution comes into force (1950)',
    'The Tenth Schedule is added by the 52nd Amendment (1985)',
    'The 91st Amendment removes the split exception (2003)',
    'The 104th Amendment ends the nomination of Anglo-Indian members (passed 2019, in effect 2020)',
  ],
  sol: 'Order of years: 1950, 1985, 2003, then 2019 and 2020.',
}));

// ================================================================ short answers (2 marks)
Q('s_why', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two functions of the Parliament of India.',
  model: 'Parliament **makes laws** for the country and **controls the executive** through questions, debates and the power to remove a government that loses the Lok Sabha\'s support. It also **represents** the people and the States, and provides a forum for **debate** on public matters.',
  sol: 'Two functions with a brief explanation.',
  scheme: [['Law-making', 1], ['Control of the executive, representation or debate, explained', 1]],
}));
Q('s_bicam', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why does India have a Parliament of two Houses?',
  model: 'India is a **federation** with many States and a very large population, so one House, the **Lok Sabha**, represents the people directly, while the **Rajya Sabha** represents the States. A second House also lets a bill be **reconsidered**, which checks hasty decisions.',
  sol: 'Representation of the States as well as the people, and reconsideration.',
  scheme: [['A House for the people and a House for the States', 1], ['Reconsideration of bills', 1]],
}));
Q('s_rs_elect', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'How are the elected members of the Rajya Sabha chosen?',
  model: 'They are chosen **indirectly**: the **elected members of the State Legislative Assembly** of each State vote, using **proportional representation by the single transferable vote**. Voters at large do not elect them, since the House is meant to represent the States.',
  sol: 'Indirect election by the Assembly members, with the method of voting.',
  scheme: [['Elected by the elected members of the State Legislative Assembly', 1], ['Proportional representation by single transferable vote', 1]],
}));
Q('s_terms', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two differences between the Lok Sabha and the Rajya Sabha in the term of members and in the way the House continues.',
  model: 'Lok Sabha members serve for **five years**, unless the House is **dissolved earlier**. Rajya Sabha members serve for **six years**, and the House is **never dissolved**: about **one-third** of its members retire every second year and new members take their place.',
  sol: 'The term of members and the continuity of each House.',
  scheme: [['Lok Sabha: five years; can be dissolved', 1], ['Rajya Sabha: six years; permanent House with one-third retiring every two years', 1]],
}));
Q('s_money', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What can the Rajya Sabha do about a money bill that the Lok Sabha has passed?',
  model: 'It cannot reject or change the bill. It may only **return it with recommendations** within **14 days**. If it does nothing in that time, the bill is **deemed passed**, and the **Lok Sabha** may accept or reject the recommendations.',
  sol: 'Only a delay of 14 days, with the Lok Sabha having the final say.',
  scheme: [['Can only return it with recommendations within 14 days', 1], ['Deemed passed after 14 days; the Lok Sabha decides on the recommendations', 1]],
}));
Q('s_249', short({
  t: 1, d: 4, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the special powers that the Rajya Sabha has under Article 249 and Article 312.',
  model: 'Under **Article 249**, a resolution of the Rajya Sabha supported by **two-thirds** of members present and voting lets Parliament make a law on a **State List** subject in the **national interest**. Under **Article 312**, a similar resolution lets Parliament create a **new All India Service**.',
  sol: 'The two special powers and the majority required.',
  scheme: [['Article 249: law on a State List subject in the national interest', 1], ['Article 312: a new All India Service, by a two-thirds resolution', 1]],
}));
Q('s_question', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Distinguish Question Hour from Zero Hour.',
  model: '**Question Hour** is the first hour of a sitting in which members put questions to ministers, usually with prior notice, and ministers answer. **Zero Hour** follows it and is a **practice**, not part of the formal rules as such, in which members raise urgent matters without prior notice.',
  sol: 'Question Hour is formal and noticed; Zero Hour is a practice.',
  scheme: [['Question Hour: questions to ministers in the first hour', 1], ['Zero Hour: a practice of raising urgent matters without notice', 1]],
}));
Q('s_pac', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do the Comptroller and Auditor General and the Public Accounts Committee help Parliament control government spending?',
  model: 'The **Comptroller and Auditor General** audits government accounts and reports to **Parliament**. The **Public Accounts Committee** then examines these reports and questions officials, to check whether money was spent as **Parliament approved**, and reports its findings to the House.',
  sol: 'The auditor reports and the committee examines.',
  scheme: [['The auditor audits the accounts and reports to Parliament', 1], ['The Public Accounts Committee examines the reports to check spending as approved', 1]],
}));
Q('s_private', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish a government bill from a private member\'s bill.',
  model: 'A **government bill** is introduced by a **minister** and carries the government\'s policy, so it usually has the time and the support to pass. A **private member\'s bill** is introduced by a member who is **not a minister**, in the limited time set aside for such members, and is rarely passed.',
  sol: 'Who introduces the bill and the chance of passing.',
  scheme: [['Government bill: introduced by a minister, carries policy', 1], ['Private member\'s bill: introduced by a non-minister, rarely passed', 1]],
}));
Q('s_91', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'What did the 91st Amendment (2003) change in the anti-defection law?',
  model: 'It **removed the exception for a split**, under which a group of one-third of a party\'s legislators could leave without disqualification. After it, only a **merger** agreed by **two-thirds** of the party\'s legislators is protected, which makes it harder for small groups to change sides.',
  sol: 'The split exception was removed; only a merger of two-thirds remains.',
  scheme: [['Removed the exception for a split of one-third', 1], ['Only a merger agreed by two-thirds is protected', 1]],
}));

// ---------------------------------------------------------------- short answers (3 marks)
Q('s3_ls_special', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three special powers of the Lok Sabha.',
  model: '1. **Money bills** can be introduced only in the Lok Sabha.\n2. The **Rajya Sabha** can only delay a money bill for 14 days, and the **Speaker** certifies whether a bill is a money bill.\n3. Only the Lok Sabha can pass a **no-confidence motion**, which forces the Council of Ministers to resign; it also votes on the demands for grants.',
  sol: 'Three special powers of the Lok Sabha.',
  scheme: [['Money bills start only in the Lok Sabha', 1], ['Rajya Sabha can only delay for 14 days; the Speaker certifies', 1], ['Only the Lok Sabha passes a no-confidence motion', 1]],
}));
Q('s3_rs_special', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three special features or powers of the Rajya Sabha.',
  model: '1. It represents the **States** in Parliament, and its members are elected by the elected members of the State Legislative Assemblies.\n2. Under **Article 249**, it can authorise Parliament to make a law on a State List subject in the national interest.\n3. Under **Article 312**, it can authorise the creation of a **new All India Service**.',
  sol: 'Representation of the States and the two special powers.',
  scheme: [['Represents the States', 1], ['Article 249', 1], ['Article 312', 1]],
}));
Q('s3_bill', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the stages through which an ordinary bill passes in the House where it is first introduced.',
  model: '1. **Introduction and first reading:** the bill is introduced and its purpose stated.\n2. **Second reading:** the principles and clauses are discussed, and the bill may be referred to a **committee**.\n3. **Consideration and third reading:** the clauses are voted on and amended if needed, and the final vote is taken.',
  sol: 'Three stages in order.',
  scheme: [['Introduction and first reading', 1], ['Second reading, with possible committee reference', 1], ['Consideration, voting and third reading', 1]],
}));
Q('s3_joint', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain when a joint sitting of Parliament is held and how it decides an ordinary bill.',
  model: '1. If the two Houses **disagree** on an ordinary bill, for example when one rejects it, a joint sitting may be called under **Article 108**.\n2. The **Speaker** presides.\n3. The bill is decided by a **majority of the members present and voting**; as the Lok Sabha is larger, its view is likely to prevail. A money bill has no joint sitting.',
  sol: 'The occasion, the presiding officer and the decision.',
  scheme: [['Disagreement on an ordinary bill: Article 108', 1], ['The Speaker presides', 1], ['Majority of members present and voting', 1]],
}));
Q('s3_committees', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name the two kinds of parliamentary committees and explain why committees matter.',
  model: '1. **Standing committees**, including the **department-related standing committees**, are permanent and examine ministries, budgets and bills.\n2. **Joint parliamentary committees** are **ad hoc**, formed for a particular bill or matter, with members from both Houses.\n3. Committees matter because they study subjects **in detail**, hear **experts** and save the time of the House.',
  sol: 'The two kinds and their importance.',
  scheme: [['Standing committees', 1], ['Joint parliamentary committees (ad hoc)', 1], ['Why committees matter', 1]],
}));
Q('s3_defect', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the anti-defection law and the two amendments connected with it.',
  model: '1. The **52nd Amendment (1985)** added the **Tenth Schedule**, which provides for disqualification of a member who **leaves the party** or **disobeys its whip** without permission.\n2. The **Speaker** or the **Chairman** decides the question.\n3. The **91st Amendment (2003)** removed the **split** exception, leaving only mergers.',
  sol: 'The Tenth Schedule, the presiding officer and the 2003 change.',
  scheme: [['52nd Amendment (1985) and the Tenth Schedule', 1], ['Presiding officer decides', 1], ['91st Amendment (2003): split exception removed', 1]],
}));
Q('s3_control', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Describe any three ways in which Parliament controls the executive.',
  model: '1. Through **Question Hour**, Zero Hour and debates, members hold ministers to account.\n2. Through **financial control**: money cannot be spent without Parliament\'s approval of the budget, and the **Public Accounts Committee** reviews spending.\n3. Through a **no-confidence motion**, the Lok Sabha can force the Council of Ministers to resign.',
  sol: 'Three instruments of control.',
  scheme: [['Questions and debate', 1], ['Financial control', 1], ['No-confidence motion', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_houses', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Compare the Lok Sabha and the Rajya Sabha in respect of representation, strength, election, term and minimum age.',
  model: '1. The **Lok Sabha** represents the **people**, and the **Rajya Sabha** the **States**.\n2. The Constitution allows the Lok Sabha up to 550 elected members, with 543 constituencies (as of 2024); the Rajya Sabha has at most 250, of whom 12 are nominated.\n3. Lok Sabha members are **directly elected** by first past the post; Rajya Sabha members are **indirectly elected** by single transferable vote.\n4. The Lok Sabha serves **five years** and can be dissolved; the Rajya Sabha is **permanent**, with six-year terms.\n5. The minimum age is **25** and **30** respectively.',
  sol: 'Five points of comparison.',
  scheme: [['Representation', 1], ['Strength', 1], ['Mode of election', 1], ['Term and dissolution', 1], ['Minimum age', 1]],
}));
Q('l_powers', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the powers that both Houses share and the special powers of each House.',
  model: '1. Both Houses pass **ordinary bills** and **constitutional amendments**, and take part in electing the **President** and the **Vice-President**.\n2. **Money bills** start only in the Lok Sabha, and the Rajya Sabha can only delay them for **14 days**.\n3. The **Speaker** certifies a money bill, and only the Lok Sabha can pass a **no-confidence motion**.\n4. The Rajya Sabha can authorise a law on a **State List** subject in the national interest (**Article 249**).\n5. It can also authorise a new **All India Service** (**Article 312**).',
  sol: 'Shared powers, then the Lok Sabha\'s and the Rajya Sabha\'s special powers.',
  scheme: [['Shared powers', 1], ['Money bills and the 14 days', 1], ['Speaker and no-confidence motion', 1], ['Article 249', 1], ['Article 312', 1]],
}));
Q('l_bill', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain, step by step, how the imagined Village Libraries Bill, an ordinary bill introduced in the Lok Sabha, becomes a law.',
  model: '1. A minister **introduces** the bill and states its aim (**first reading**).\n2. At the **second reading** its principles and clauses are debated, and it may be sent to a **committee**.\n3. The House votes on the clauses and the bill at the **third reading**.\n4. The **Rajya Sabha** takes it through the same stages; if the Houses disagree, a **joint sitting** under Article 108 may be called.\n5. The **President\'s assent** makes it an Act.',
  sol: 'Five steps from introduction to assent.',
  scheme: [['Introduction and first reading', 1], ['Second reading and committee', 1], ['Third reading', 1], ['Other House; joint sitting on disagreement', 1], ['Assent of the President', 1]],
}));
Q('l_control', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the instruments through which Parliament controls the executive.',
  model: '1. **Deliberation and discussion** include Question Hour, Zero Hour, calling attention and the adjournment motion.\n2. Parliament can **approve or refuse laws** proposed by the government.\n3. **Financial control** works through the budget and the demands for grants.\n4. The **Public Accounts Committee** examines spending, using the reports of the **Comptroller and Auditor General**.\n5. A **no-confidence motion** can remove the Council of Ministers, and committees study the work of ministries.',
  sol: 'Discussion, laws, finance, committees and the no-confidence motion.',
  scheme: [['Deliberation: Question Hour, Zero Hour and others', 1], ['Approval or refusal of laws', 1], ['Financial control through the budget', 1], ['Public Accounts Committee and the auditor', 1], ['No-confidence motion and committees', 1]],
}));
Q('l_committees', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the kinds of parliamentary committees and explain why they are important.',
  model: '1. **Standing committees** are permanent; they include the Public Accounts Committee and the **department-related standing committees**, begun in 1993.\n2. **Joint parliamentary committees** are **ad hoc** bodies of members of both Houses for a particular bill or matter.\n3. Committees study subjects **in detail**, which the full House has no time to do.\n4. They hear **experts** and the public.\n5. Members of different parties often work more closely there, and the executive is scrutinised through the year.',
  sol: 'Two kinds, and reasons of detail, experts and continuous scrutiny.',
  scheme: [['Standing committees', 1], ['Joint committees', 1], ['Detailed study', 1], ['Hearing experts', 1], ['Continuous scrutiny and cooperation', 1]],
}));
Q('l_decline', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Some argue that the role of Parliament has declined, while others point to the work of its committees. Examine both views.',
  model: '1. Some argue that Parliament now meets for **fewer days** than in earlier decades.\n2. They add that **disruptions** waste time, and bills may be passed with limited debate.\n3. Others point to the **committees**, where bills and budgets are studied in detail.\n4. They also note that Parliament still **approves the budget**, questions ministers and can remove a government.\n5. A balanced view weighs both with data on sitting days, debate and committee work.',
  sol: 'Both views with reasons, and a balanced conclusion.',
  scheme: [['Fewer sitting days', 1], ['Disruptions and limited debate', 1], ['Work of committees', 1], ['Continuing powers over the budget and the executive', 1], ['A reasoned, balanced conclusion', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_bill', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; the newspaper, the bill and the places are not real.)*',
  passage: '**From the Coastal Courier, imagined, issue of 3 August**\n\nThe imagined Coastal Fisheries Bill, an ordinary bill to regulate fishing seasons, was passed by the Lok Sabha by a clear majority. The Rajya Sabha rejected it after a long debate. With the Houses in disagreement, the President summoned both Houses to meet together. The Speaker presided, and the bill was passed by a majority of the members present and voting. It then went to the President for assent.',
  parts: [
    child('a', short({ t: 2, d: 3, c: 'recall', marks: 1, stem: 'Under which Article of the Constitution is a joint sitting held?', model: '**Article 108**.', sol: 'The joint sitting is provided by Article 108.', scheme: [['Article 108', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'recall', marks: 1, stem: 'Who presided at the joint sitting in the report?', model: 'The **Speaker** of the Lok Sabha.', sol: 'The Speaker presides at a joint sitting.', scheme: [['The Speaker', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why is the view of the Lok Sabha likely to prevail at a joint sitting?', model: 'The bill is decided by a **majority of members present and voting** of both Houses together. The **Lok Sabha has more than twice as many members** as the Rajya Sabha, so its members form most of the sitting.', sol: 'The larger numbers of the Lok Sabha.', scheme: [['Decision by majority of the members of both Houses together', 1], ['The Lok Sabha has many more members', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Would a joint sitting have been held if the same bill had been a money bill? Give a reason.', model: 'No. A **money bill** has **no joint sitting**. The Rajya Sabha can only delay it for **14 days**, after which it is deemed passed, so the **Lok Sabha view** prevails.', sol: 'Money bills are excluded from the joint sitting.', scheme: [['No joint sitting for a money bill', 1], ['The Rajya Sabha can only delay it for 14 days', 1]] }),
    ]),
  ],
}));
Q('c_transcript', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the extract from a sitting and answer the questions that follow. *(An imagined transcript written by SOYL for practice; the members, the minister and the scheme are not real.)*',
  passage: '**From an imagined Lok Sabha sitting, first hour**\n\n**Leela Pillai (member):** Is the Minister aware that nine cold-storage units built for fish traders under the Harbour Freshness Scheme stand locked and unused?\n\n**Minister of Fisheries (imagined):** Seven of the nine have been in use since March. I will place the list of the remaining two on the table of the House.\n\n**Leela Pillai:** Will the Minister explain why two units remain locked after two years?\n\n**Minister:** The delay is due to a dispute over electricity connections, which my department is settling.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'Name the part of the day in which this exchange takes place.', model: '**Question Hour**.', sol: 'Questions to ministers in the first hour.', scheme: [['Question Hour', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which kind of control over the executive does the exchange illustrate?', model: '**Deliberation and discussion**, in which a member holds the minister to account.', sol: 'Questioning is a form of deliberation and discussion.', scheme: [['Deliberation and discussion / holding the minister to account', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the exchange helps Parliament check the working of the executive.', model: 'The minister must **answer in public** and give facts, such as how many units are in use. Follow-up questions press for **reasons for the delay**, so the department is made **accountable** and the House learns about the working of the scheme.', sol: 'Public answers, follow-up questions and accountability.', scheme: [['The minister must give facts and answers publicly', 1], ['Follow-up questions press for reasons: accountability', 1]] }), [
      short({ t: 2, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): How does this part of the day differ from Zero Hour?', model: 'Question Hour is a **regular part of the sitting**, with questions usually given in advance and answered by ministers. **Zero Hour** follows it and is a **practice** in which members raise urgent matters **without prior notice**.', sol: 'Question Hour is formal; Zero Hour is a practice without notice.', scheme: [['Question Hour: regular, with notice, answered by ministers', 1], ['Zero Hour: a practice, urgent matters, without notice', 1]] }),
    ]),
  ],
}));
Q('c_committee', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the extract from a committee report and answer the questions that follow. *(An imagined report written by SOYL for practice; the committee, its members and the bill are not real.)*',
  passage: '**From the imagined report of the Standing Committee on Fisheries and Coastal Welfare, on the imagined Coastal Fisheries Bill**\n\nThe Committee, a permanent body with members of both Houses drawn from several parties, met on eleven days. It heard five fishing cooperatives, two marine scientists and the Secretary of the department. The members agreed on twenty-two of the twenty-four clauses. On the remaining two, the Committee recommends that the fishing season be fixed after consulting local boat owners and that a review be held after three years.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Is the committee in the passage a standing committee or an ad hoc committee?', model: 'A **standing committee**; the passage calls it a permanent body.', sol: 'The report calls it permanent.', scheme: [['Standing committee', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Name one group from whom the committee gathered evidence that the full House would have little time to hear.', model: '**Fishing cooperatives**, **marine scientists** or **the Secretary of the department** (any one).', sol: 'The committee heard outside experts and officials.', scheme: [['Any one group named', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain two reasons why work of this kind is useful for law-making.', model: 'The committee studies the bill **in detail** and hears **experts and those affected**, so the final law is better informed. It also saves the **time of the House**, and members of different parties found **common ground** on most clauses.', sol: 'Detailed study, experts and shared ground.', scheme: [['Detailed study with experts and those affected', 1], ['Saves time or builds agreement', 1]] }), [
      short({ t: 2, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): How does a Joint Parliamentary Committee differ from the committee described?', model: 'A **Joint Parliamentary Committee** is **ad hoc**: it is formed for a particular bill or matter and ends when its report is made. The committee in the passage is **standing**, meaning permanent, and keeps examining the work of its department.', sol: 'Ad hoc versus permanent.', scheme: [['Joint committee: ad hoc, for a particular matter', 1], ['Standing committee: permanent, continuing scrutiny', 1]] }),
    ]),
  ],
}));
Q('c_defect', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; the member, the party and the bill are not real.)*',
  passage: '**Imagined letter to the editor of the Hill Gazette, from Mohan Pillai, a Lok Sabha member of the imagined Unity Party**\n\nLast week my party issued a whip to vote for the Village Libraries Bill. I voted against it because my constituency will lose its reading room. I did not ask the party for permission, and it has not forgiven my vote. I am told that the Speaker will now decide whether I lose my seat. Elsewhere, a group of nine of the thirty legislators of another imagined party announced that they were leaving it together.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'Which Amendment added the Tenth Schedule, and in which year?', model: 'The **52nd Amendment**, in **1985**.', sol: 'The Tenth Schedule was added in 1985.', scheme: [['52nd Amendment, 1985', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Why is Mohan Pillai in danger of losing his seat?', model: 'He **voted against the party whip** without permission and without being forgiven, which is a ground of disqualification under the Tenth Schedule.', sol: 'Disobeying the whip.', scheme: [['Voted against the whip without permission', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Who decides Mohan Pillai\'s case, and why do some argue that this is a difficulty?', model: 'The **Speaker**, as presiding officer, decides. Some argue that the Speaker **belongs to a party**, so the decision may seem partisan; others reply that the presiding officer is expected to be **fair**.', sol: 'The presiding officer, with the two views.', scheme: [['The Speaker decides', 1], ['Some argue partiality is a difficulty; others argue fairness is expected', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Nine of the thirty legislators of the other party leave together. Is this protected as a split? Explain.', model: 'No. Nine of thirty is **one-third**, and the **split** exception was **removed by the 91st Amendment (2003)**. Only a **merger agreed by two-thirds** of the party\'s legislators is protected, so the nine risk disqualification.', sol: 'The split exception no longer exists.', scheme: [['Split exception removed in 2003', 1], ['Only a two-thirds merger is protected', 1]] }),
    ]),
  ],
}));
Q('c_table', caseQ({
  t: 2, d: 5, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(An imagined table of data written by SOYL for practice; the country of Veldora and its figures are not real.)*',
  passage: '**Imagined figures for the legislature of Veldora**\n\n- 1990s: average of 120 sitting days a year; 10 of every 100 bills studied by committees\n- 2000s: average of 95 sitting days a year; 30 of every 100 bills studied by committees\n- 2010s: average of 70 sitting days a year; 50 of every 100 bills studied by committees',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'How many sitting days a year, on average, did the legislature have in the 2000s?', model: '**95** days.', sol: 'Read directly from the figures.', scheme: [['95', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'By how many days did the average yearly sittings fall between the 1990s and the 2010s?', model: 'By **50** days (120 minus 70).', sol: '120 minus 70.', scheme: [['50', 1]] })),
    child('c', short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): Which figures support the view that the role of the legislature has declined, and why?', model: 'The fall in **sitting days** from 120 to 70 supports it, since the House has **less time** for debate, questions and scrutiny, so its role may be reduced, whatever the committees do.', sol: 'Sitting days and less time for scrutiny.', scheme: [['Sitting days fell from 120 to 70', 1], ['Less time for debate and scrutiny', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Which figures support those who say the legislature remains active, and why?', model: 'The rise in bills **studied by committees** from 10 to 50 in every 100 supports this, since **detailed scrutiny** has moved to committees, where bills are studied for longer and in smaller groups.', sol: 'Committee scrutiny has grown.', scheme: [['Committee study rose from 10 to 50 in 100 bills', 1], ['Detailed scrutiny has shifted to committees', 1]] }),
    ]),
  ],
}));
