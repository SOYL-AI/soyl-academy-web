// CBSE 11 Political Science, ch04 Executive: question bank. Every passage (newspaper report, diary, classroom
// discussion, list of ministers) is written by SOYL and labelled as imagined; countries such as Arvelia, Brendoria and
// Calvaris, and all people, districts, states and departments in scenarios are imagined. No NCERT text, boxed source,
// cartoon, Constitution text, speech, court judgment or board/sample-paper item is reused (D-036). Articles and
// amendments are cited by number with a paraphrase of what they provide.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Parliamentary executive in India
Q('m_exec', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Among the organs of government, the one mainly responsible for carrying out laws and putting policies into effect is the',
  opts: ['executive', 'legislature', 'judiciary', 'electorate'],
  sol: 'The executive implements laws and policies. The legislature makes laws, the judiciary interprets them and settles disputes, and the electorate is the body of voters, not an organ of government.',
}));
Q('m_political', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined country of Dorsana, the Minister of Education is an elected member of the legislature, while the Director of Education is an officer who has served under four governments. Which statement is correct?',
  opts: ['The Minister belongs to the political executive and the Director to the permanent executive', 'Both belong to the political executive', 'The Minister belongs to the permanent executive and the Director to the political executive', 'Both belong to the permanent executive'],
  sol: 'An elected minister who holds office for a time is part of the political executive, while an officer who stays in service under successive governments is part of the permanent executive. The other options mix up or merge the two parts.',
}));
Q('m_arvelia', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined country of Arvelia, voters directly elect a President for a fixed four-year term. The President is both head of state and head of government, names the ministers and cannot be removed by an ordinary vote of the legislature. Arvelia has a',
  opts: ['presidential executive', 'parliamentary executive', 'semi-presidential executive', 'nominal executive'],
  sol: 'One directly elected person who is both head of state and head of government, with a fixed term and no dependence on the legislature, is the mark of a presidential system. A parliamentary system makes the government answerable to the legislature, a semi-presidential one has a separate Prime Minister, and a nominal executive describes a ceremonial head.',
}));
Q('m_brendoria', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined country of Brendoria, the Chancellor leads the government only as long as a majority of the Assembly supports the Cabinet, while a ceremonial Governor-General performs the duties of head of state. This is a',
  opts: ['parliamentary executive', 'presidential executive', 'semi-presidential executive', 'permanent executive'],
  sol: 'A government that depends on majority support in the legislature, with a ceremonial head of state, is parliamentary. There is no directly elected President, so it is neither presidential nor semi-presidential, and the permanent executive means civil servants.',
}));
Q('m_calvaris', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined republic of Calvaris has a President elected directly by the people. The President appoints a Prime Minister, and the Prime Minister and Cabinet must keep the confidence of the National Council. Calvaris has a',
  opts: ['semi-presidential executive', 'purely presidential executive', 'purely parliamentary executive with a nominal head', 'permanent executive'],
  sol: 'A directly elected President together with a Prime Minister who answers to the legislature is the semi-presidential pattern, as in France. In a purely presidential system there is no such Prime Minister, and in a purely parliamentary one the head of state is not directly elected.',
}));
Q('m_nominal', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined town-hall discussion, Ravi says that every decision of the Union government is taken in the President\'s name, so the President personally decides everything. Which reply is closest to the Constitution?',
  opts: ['Decisions are in the President\'s name, but in practice the Council of Ministers takes them, and the President is the nominal head', 'He is right, since the President can overrule the ministers at will', 'He is right, since the President chooses the ministers without any advice', 'He is wrong, because the President has no role in government at all'],
  sol: 'Executive power is exercised in the President\'s name but in practice by the Council of Ministers, so the President is the nominal head. The President does not overrule ministers at will, the ministers are appointed on the Prime Minister\'s advice, and the President does have a constitutional role.',
}));
Q('m_college', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The electoral college that elects the President of India consists of',
  opts: ['the elected members of both Houses of Parliament and of the State Legislative Assemblies, including those of Delhi and Puducherry', 'all members of Parliament and all members of the State Legislative Councils', 'all voters registered on the electoral rolls of the country', 'the members of the Lok Sabha alone'],
  sol: 'The college has the elected members of the Lok Sabha, the Rajya Sabha and the State Legislative Assemblies, with the Assemblies of Delhi and Puducherry included. Members of State Legislative Councils and nominated members are outside it, ordinary voters do not vote directly, and the Lok Sabha alone is too narrow.',
}));
Q('m_nominated', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Sunil Verma, a scientist in an imagined list, is nominated by the President to the Rajya Sabha for his work in science. In the next election of the President, he',
  opts: ['cannot vote, because only elected members are in the electoral college', 'can vote, like every other member of the Rajya Sabha', 'can vote only if he joins a political party first', 'can vote, but his vote counts as half a vote'],
  sol: 'Only elected members of the Houses and the State Legislative Assemblies vote for the President, so a nominated member has no vote in that election (he does vote in the Vice-President\'s election). Party membership and half-votes have no role.',
}));
Q('m_impeach', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The President of India can be removed before the five-year term ends through',
  opts: ['impeachment for violation of the Constitution', 'a motion of no confidence in the Lok Sabha', 'dismissal by the Prime Minister on the advice of the Cabinet', 'a decision of the Election Commission'],
  sol: 'The only way is impeachment, a process in Parliament for violating the Constitution. A no-confidence motion applies to the Council of Ministers, not the President, and neither the Prime Minister nor the Election Commission can remove the President.',
}));
Q('m_advice', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In an imagined case, the President returns the advice of the Council of Ministers once for reconsideration. The Council reconsiders and sends back the same advice. What must the President now do?',
  opts: ['act in accordance with the advice', 'return it a second time', 'dismiss the Council of Ministers', 'refer the advice to the Supreme Court for a binding decision'],
  sol: 'The 44th Amendment (1978) lets the President return the advice once; if it is sent back, the President must act on it. A second return, dismissal and a binding reference to the Supreme Court are not provided for.',
}));
Q('m_amend', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Which statement correctly pairs the amendment with its effect on the President\'s relation with the ministers?',
  opts: ['The 42nd Amendment (1976) made the ministers\' advice binding; the 44th Amendment (1978) let the President return it once for reconsideration', 'The 44th Amendment (1978) made the advice binding; the 42nd Amendment (1976) let the President return it once', 'The 42nd Amendment (1976) removed the need for advice; the 44th Amendment (1978) restored it', 'The 91st Amendment (2003) made the advice binding; the 44th Amendment (1978) removed the Cabinet'],
  sol: 'The 42nd Amendment made the advice binding and the 44th softened this by allowing one return for reconsideration. The other options reverse the order, claim advice was ever removed, or credit the 91st Amendment, which limited the size of the Council of Ministers.',
}));
Q('m_pocket', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'A bill passed by both Houses in an imagined session reaches the President, who neither gives assent nor returns it, and the bill stays with the President for years. Because the Constitution sets no time limit, this practice is called',
  opts: ['a pocket veto', 'an ordinance', 'impeachment', 'a vote of confidence'],
  sol: 'Keeping an ordinary bill without a decision, when no time limit applies, is the pocket veto. An ordinance is a law the President issues when Parliament is not in session, impeachment is removal of the President, and a confidence vote concerns the government in the Lok Sabha.',
}));
Q('m_hung', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'After an imagined general election, no party and no alliance wins more than half the seats in the Lok Sabha. In choosing a Prime Minister, the President is then most free to use',
  opts: ['personal judgment about who is most likely to command majority support', 'the right to appoint anyone, whether or not that person has support in the House', 'the power to set aside all the parties and rule directly', 'the advice of the outgoing Council of Ministers alone'],
  sol: 'When no party or alliance has a clear majority, the President must judge who can command the confidence of the House, which is where discretion is real. The President cannot ignore the House, cannot rule directly, and need not rely only on the outgoing council.',
}));
Q('m_vp', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The Vice-President of India is, by virtue of office, the',
  opts: ['Chairman of the Rajya Sabha', 'Speaker of the Lok Sabha', 'head of the Council of Ministers', 'leader of the opposition'],
  sol: 'The Vice-President is the ex officio Chairman of the Rajya Sabha. The Speaker presides over the Lok Sabha, the Prime Minister heads the Council of Ministers, and the leader of the opposition is a separate post.',
}));
Q('m_vpacts', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In an imagined event, the President of India resigns and the office falls vacant. Who acts as President until the vacancy is filled?',
  opts: ['The Vice-President', 'The Prime Minister', 'The Speaker of the Lok Sabha', 'The Cabinet Secretary'],
  sol: 'The Vice-President acts as President when the office is vacant. The Prime Minister, the Speaker and the Cabinet Secretary have no such role in this situation.',
}));
Q('m_pmappt', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The Prime Minister of India is',
  opts: ['appointed by the President, usually as the leader of the majority in the Lok Sabha', 'elected directly by all voters in a national vote', 'elected by the same electoral college that elects the President', 'chosen by the Rajya Sabha from among its own members'],
  sol: 'The President appoints the Prime Minister, who is normally the leader of the majority party or alliance in the Lok Sabha. The Prime Minister is not elected directly or by the electoral college, and the Rajya Sabha does not choose the Prime Minister.',
}));
Q('m_sixmonths', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Ananya Rao, who is not a member of either House of Parliament, is invited to join the Union Council of Ministers in an imagined government. To continue as a minister she must',
  opts: ['become a member of either House within six months', 'win a Lok Sabha seat within one year', 'resign after three months and be reappointed', 'be nominated to the Rajya Sabha by the Vice-President'],
  sol: 'A person who is not a member of Parliament can be a minister, but must become a member of either House within six months. The one-year and three-month limits are invented, and the Vice-President does not nominate members.',
}));
Q('m_collective', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In an imagined government, the Minister of Roads takes a decision that the Lok Sabha strongly opposes, and the House passes its motion against the whole Council of Ministers and not against the Minister of Roads alone. This follows from the principle of',
  opts: ['collective responsibility', 'judicial review', 'federalism', 'the pocket veto'],
  sol: 'Under collective responsibility the whole Council answers to the Lok Sabha for the decisions of any minister, so the House can act against all of them together. Judicial review, federalism and the pocket veto are unrelated to the relationship between the House and the ministers.',
}));
Q('m_noconf', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In an imagined session, the Lok Sabha passes a motion of no confidence against the government. Under the system of collective responsibility,',
  opts: ['the Council of Ministers must resign', 'the Prime Minister alone resigns while the other ministers stay', 'the Rajya Sabha decides whether the government may continue', 'the President is removed from office'],
  sol: 'Because the Council is collectively responsible to the Lok Sabha, loss of its confidence means the whole Council must resign. It is not only the Prime Minister, the Rajya Sabha has no such say, and the President is not affected.',
}));
Q('m_limit', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined state of Dharmpal has a Legislative Assembly of 200 members. Under the 91st Amendment (2003), which limits the Council of Ministers to 15 per cent of the strength of the House, the Council of Ministers including the Chief Minister can have at most',
  opts: ['30 members', '15 members', '20 members', '50 members'],
  sol: 'Fifteen per cent of 200 is 30. The numbers 15 and 20 do not follow from the rule, and 50 would be a quarter of the House, which is more than the limit allows.',
}));
Q('m_cabinet', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'In the Union Council of Ministers, the inner group of senior ministers that takes the major policy decisions is the',
  opts: ['Cabinet', 'group of Ministers of State', 'group of Deputy Ministers', 'electoral college'],
  sol: 'The Cabinet is the inner group of senior ministers. Ministers of State and Deputy Ministers are junior ranks of the Council, and the electoral college is the body that elects the President.',
}));
Q('m_state', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The system in the states is similar to that at the Union. The nominal head of a state and the real executive head are, respectively,',
  opts: ['the Governor and the Chief Minister with the Council of Ministers', 'the Chief Minister and the Governor', 'the Speaker and the Chief Minister', 'the Chief Justice and the Governor'],
  sol: 'The Governor is the nominal head, like the President, and the Chief Minister with the Council of Ministers is the real executive. The other pairings reverse the roles or bring in the Speaker and a judge, who are not heads of the executive.',
}));
Q('m_pmrole', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Two imagined governments of the same country have Prime Ministers whose influence differs: one leads a party with a clear majority, the other leads a coalition of several parties. Which explanation best fits the difference?',
  opts: ['The Prime Minister\'s actual influence depends partly on party position and on how many partners must be satisfied', 'The Constitution gives a coalition Prime Minister a different set of powers', 'A Prime Minister whose party has a majority is not responsible to the Lok Sabha', 'The President decides how much influence each Prime Minister has'],
  sol: 'The Constitution gives the same position to every Prime Minister; what varies is the political setting, such as the size of the majority, the hold over the party and the need to keep coalition partners together. No Prime Minister is outside responsibility to the Lok Sabha, and the President does not allot influence.',
}));

// ---------------------------------------------------------------- t02 Permanent executive
Q('m_perm', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The permanent executive in India consists of',
  opts: ['civil servants', 'the Prime Minister and the Cabinet', 'the members of the Lok Sabha', 'the President and the Vice-President'],
  sol: 'Civil servants make up the permanent executive, since they stay in service when governments change. The Prime Minister, Cabinet and members of the Lok Sabha belong to the political side, and the President and Vice-President are constitutional offices.',
}));
Q('m_merit', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A new party forms the government in the imagined state of Marenda. Secretary Anil Rao, who served the previous government, is asked to carry out the new government\'s very different housing policy, and he does so faithfully. His conduct is mainly an example of',
  opts: ['the political neutrality expected of a civil servant', 'the collective responsibility of ministers', 'the discretion of the Governor', 'the impeachment of a minister'],
  sol: 'A civil servant serves whichever government is in office and carries out its policies impartially, which is political neutrality. Collective responsibility concerns ministers, and the discretion of the Governor and impeachment are unrelated to an officer\'s conduct.',
}));
Q('m_ais', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The Indian Administrative Service and the Indian Police Service are examples of',
  opts: ['All India Services', 'Central Services', 'State Services', 'municipal services'],
  sol: 'These are All India Services: recruited by the Union but serving in the states. Central Services serve the Union government, State Services are recruited by the state, and municipal services belong to local bodies.',
}));
Q('m_upsc', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Recruitment to the Union services is conducted by the',
  opts: ['Union Public Service Commission', 'Election Commission', 'Finance Commission', 'State Public Service Commission'],
  sol: 'The Union Public Service Commission recruits for the Union services. The Election Commission conducts elections, the Finance Commission advises on sharing revenues, and a State Public Service Commission recruits for the state services.',
}));
Q('m_psc', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Sulochana wants to join the civil services of the imagined state of Ranmal, and not those of the Union. Which body conducts recruitment to the posts of that state?',
  opts: ['The Ranmal State Public Service Commission', 'The Union Public Service Commission', 'The Election Commission', 'The Council of Ministers of Ranmal'],
  sol: 'Each state has a State Public Service Commission that recruits for its state services. The Union Public Service Commission serves the Union and All India Services, the Election Commission holds elections, and ministers decide policy and do not conduct recruitment.',
}));
Q('m_tenure', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Members of the Union and State Public Service Commissions are given security of tenure so that they can',
  opts: ['recruit without fear of being removed by the government of the day', 'remain in office for life whatever their conduct', 'be free of all rules of service', 'be chosen by the Prime Minister alone'],
  sol: 'Security of tenure means a member cannot be removed at will, which protects the Commission\'s independence in selecting candidates on merit. It does not mean immunity for misconduct, freedom from all rules, or selection by the Prime Minister alone.',
}));
Q('m_secretary', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the imagined Department of Water Supply of a state, the minister announces a plan to lay pipelines to 300 villages. Who is mainly responsible for working out the details and putting it into effect day to day?',
  opts: ['The civil servants of the department, under the minister\'s direction', 'The Chief Justice of the High Court', 'The Election Commission', 'The voters of the 300 villages'],
  sol: 'The minister sets the policy and the civil servants of the department prepare and carry it out. The High Court, the Election Commission and the voters have no such administrative role.',
}));
Q('m_reserv', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'As of 2024, in direct recruitment to posts under the Union government, the reservations for Scheduled Castes, Scheduled Tribes and Other Backward Classes are respectively',
  opts: ['15 per cent, 7.5 per cent and 27 per cent', '10 per cent, 5 per cent and 20 per cent', '22.5 per cent, 15 per cent and 27 per cent', '7.5 per cent, 15 per cent and 27 per cent'],
  sol: 'The figures are 15, 7.5 and 27 per cent in that order. The second set is invented, the third inflates the first two, and the fourth swaps Scheduled Castes and Scheduled Tribes.',
}));
Q('m_cat', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Tarun passed the Union examination, joined the Indian Administrative Service and was posted to the imagined state of Kondar. He belongs to',
  opts: ['the All India Services, recruited by the Union and serving in a state', 'the State Services, recruited by Kondar', 'the Central Services, serving only in Union ministries', 'the political executive, removable by the voters'],
  sol: 'An officer of the Indian Administrative Service is a member of the All India Services: recruited by the Union, posted in states. He was not recruited by the state, does not serve only in the Union ministries, and as a civil servant is part of the permanent executive, not the political one.',
}));
Q('m_respons', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Some argue that a district office in the imagined district of Tillanagar takes weeks to issue a simple certificate because every file passes through many desks and forms. Which concern about the bureaucracy does this illustrate?',
  opts: ['red tape, the rigid following of procedures that delays work', 'political interference in postings', 'lack of merit in recruitment', 'lack of security of tenure for commission members'],
  sol: 'Delay caused by many procedures and steps is called red tape. Political interference concerns pressure on officers from politicians, and merit in recruitment and tenure of commission members are not involved in the case.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_nominal', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'The President of India is called a nominal head of the executive.',
  r: 'The President must act on the advice of the Council of Ministers, which exercises executive power in practice.',
  sol: 'Both are true, and R explains A: because the real power rests with the Council of Ministers, the President is the nominal head.',
}));
Q('ar_stv', ar({
  t: 1, d: 3, c: 'application', verdict: 'both-true-explains',
  a: 'A member whom the President nominates to the Rajya Sabha has no vote in the election of the President.',
  r: 'Only the elected members of the Houses of Parliament and of the State Legislative Assemblies form the electoral college.',
  sol: 'Both are true, and R explains A: a nominated member is not an elected member, so he or she is outside the electoral college.',
}));
Q('ar_pocket', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The President may in practice delay assent to an ordinary bill for an indefinite period.',
  r: 'The President is elected by an electoral college that includes members of the State Legislative Assemblies.',
  sol: 'Both are true, but R does not explain A: the delay is possible because the Constitution sets no time limit for assent, not because of how the President is elected.',
}));
Q('ar_vp', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'The Vice-President of India chairs the sittings of the Rajya Sabha.',
  r: 'The Vice-President is elected by the members of both Houses of Parliament.',
  sol: 'Both are true, but R does not explain A: the Vice-President chairs the Rajya Sabha because the Constitution makes the office its ex officio Chairman, not because of who elects the Vice-President.',
}));
Q('ar_collective', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'The Council of Ministers is collectively responsible to the Lok Sabha.',
  r: 'Ministers are elected by the Rajya Sabha and can be removed only by it.',
  sol: 'A is true: the Council answers to the Lok Sabha, which can remove it by a no-confidence motion. R is false: the Prime Minister is appointed by the President and the ministers are chosen on the Prime Minister\'s advice; the Rajya Sabha neither elects nor removes them.',
}));
Q('ar_civil', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'Civil servants must resign whenever a new party forms the government.',
  r: 'Civil servants are recruited on merit and are expected to serve every government with political neutrality.',
  sol: 'A is false: civil servants are the permanent executive and stay in service when governments change. R is true, and it is precisely why they do not resign.',
}));

// ---------------------------------------------------------------- true-false, fill in the blank, match, ordering
Q('tf_voters', tf({
  t: 1, d: 1, c: 'recall', ans: false,
  stem: 'The President of India is elected directly by all adult citizens in a nationwide vote.',
  sol: 'The President is elected indirectly, by an electoral college of elected members of Parliament and the State Legislative Assemblies.',
}));
Q('tf_ias', tf({
  t: 2, d: 3, c: 'application', ans: true,
  stem: 'An officer of the Indian Police Service who was recruited by the Union can be posted to serve in a state.',
  sol: 'The Indian Police Service is an All India Service: recruited by the Union but serving in the states.',
}));
Q('tf_presidential', tf({
  t: 1, d: 3, c: 'analysis', ans: false,
  stem: 'In the presidential system of Arvelia, the legislature can remove the President simply by passing a vote of no confidence on a policy dispute.',
  sol: 'In a presidential system the President holds a fixed term and does not depend on the confidence of the legislature; removal, where possible, needs a special process such as impeachment. A no-confidence vote is a feature of parliamentary systems.',
}));
Q('fb_91', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The ___ Amendment, passed in 2003, limited the size of the Council of Ministers to 15 per cent of the strength of the Lok Sabha.',
  acc: [['91st', '91', 'ninety-first', 'ninety first']],
  sol: 'The 91st Amendment (2003) capped the Council of Ministers at 15 per cent of the strength of the House; a similar limit applies in the states.',
}));
Q('fb_vote', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The President of India is elected by proportional representation by means of the system of single transferable ___.',
  acc: [['vote']],
  sol: 'The system is proportional representation by single transferable vote, with a secret ballot.',
}));
Q('fb_term', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The President of India holds office for a term of ___ years.',
  acc: [['5', 'five']],
  sol: 'The term is five years, and the Vice-President also has a five-year term.',
}));
Q('mt_types', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each type of executive with an example.',
  pairs: [
    ['Presidential', 'United States'],
    ['Parliamentary', 'United Kingdom'],
    ['Semi-presidential', 'France'],
  ],
  sol: 'The United States has a presidential executive, the United Kingdom (like India) a parliamentary one and France a semi-presidential one.',
}));
Q('mt_services', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each part of the executive or the services with its description.',
  pairs: [
    ['All India Services', 'Recruited by the Union and serving in the states'],
    ['Central Services', 'Serve the Union government'],
    ['State Services', 'Recruited by a State Public Service Commission'],
    ['Political executive', 'Ministers who are elected and hold office for a time'],
  ],
  sol: 'Each description fits one category; the political executive is the elected, temporary part, unlike the three kinds of civil service.',
}));
Q('ord_hung', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps in the order in which they would happen after an imagined general election with no clear majority.',
  items: [
    'The result gives no party or alliance a clear majority in the Lok Sabha',
    'The President invites the leader who seems able to command majority support',
    'The leader is appointed Prime Minister and the ministers take oath',
    'The government faces the Lok Sabha to prove its majority',
  ],
  sol: 'The hung result comes first, then the President\'s choice, then the appointment, and finally the test of support in the House.',
}));
Q('ord_amend', ord({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these four developments concerning the Union executive in the order in which they happened.',
  items: [
    'The Constitution comes into force with a parliamentary executive',
    'The ministers\' advice is made binding on the President',
    'The President is allowed to return the advice once for reconsideration',
    'The Council of Ministers is limited to 15 per cent of the Lok Sabha',
  ],
  sol: 'The Constitution came into force in 1950, the 42nd Amendment in 1976, the 44th Amendment in 1978 and the 91st Amendment in 2003.',
}));

// ================================================================ short answers (2 marks)
Q('s_exec', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is the executive? Distinguish the political executive from the permanent executive.',
  model: 'The **executive** is the branch of government that puts laws and policies into effect. Its **political** part is made up of elected ministers and the head of government, who hold office for a time. Its **permanent** part is made up of **civil servants**, who remain in service under every government.',
  sol: 'A definition of the executive and the two-part distinction.',
  scheme: [['Executive implements laws and policies', 1], ['Political executive elected and temporary; permanent executive civil servants', 1]],
}));
Q('s_nominal', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is the President of India called a nominal head of the executive?',
  model: 'Executive power is exercised in the **President\'s name**, but in practice by the **Council of Ministers**, whose advice the President must follow. The real executive is therefore the Prime Minister and the Council, while the President is the **constitutional head**.',
  sol: 'Power exercised in the name of the President but by the Council; advice is binding.',
  scheme: [['Power is exercised in the President\'s name by the Council of Ministers', 1], ['The President must act on the Council\'s advice', 1]],
}));
Q('s_upsc', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the role of the Union Public Service Commission and one safeguard of its independence.',
  model: 'The **Union Public Service Commission** recruits officers for the Union services, including the All India Services, through examinations on merit. Its members have **security of tenure**, so they cannot be removed at will by the government, which helps them to act independently.',
  sol: 'Recruitment role and security of tenure.',
  scheme: [['Recruits for the Union services on merit', 1], ['Members have security of tenure', 1]],
}));
Q('s_college', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the members of the electoral college that elects the President of India and the method of voting.',
  model: 'The college consists of the **elected members of both Houses of Parliament** and the **elected members of the State Legislative Assemblies**, including those of Delhi and Puducherry. Voting is by **proportional representation by single transferable vote**, through a secret ballot.',
  sol: 'The members of the college and the method of voting.',
  scheme: [['Elected members of both Houses and of the State Legislative Assemblies', 1], ['Proportional representation by single transferable vote', 1]],
}));
Q('s_collective', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In an imagined session, the Lok Sabha passes a motion of no confidence against the government. Using the idea of collective responsibility, explain what follows and why.',
  model: 'The Council of Ministers is **collectively responsible to the Lok Sabha**: it acts as one team and is jointly answerable for its decisions. When the House passes a **no-confidence motion**, the **whole Council must resign**, and not only the Prime Minister or one minister.',
  sol: 'The meaning of the term applied to a no-confidence motion.',
  scheme: [['Whole Council jointly responsible; stands or falls together', 1], ['Owed to the Lok Sabha; no confidence means resignation', 1]],
}));
Q('s_vp', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State two functions of the Vice-President of India.',
  model: 'The Vice-President is the **ex officio Chairman of the Rajya Sabha** and presides over its sittings. In addition, when the office of President falls vacant, the Vice-President **acts as President** until it is filled. The term of office is five years.',
  sol: 'Chair of the Rajya Sabha; acting as President.',
  scheme: [['Ex officio Chairman of the Rajya Sabha', 1], ['Acts as President when the office is vacant', 1]],
}));
Q('s_neutral', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Sheela Nair, an officer in the imagined state of Orvan, served one government and now serves a new government with quite different policies. Why is she expected to carry them out, and which feature of the civil service explains this?',
  model: 'Civil servants are the **permanent executive**: they stay when ministers change. They are recruited on merit and are **politically neutral**, so Sheela must **implement the policies of the government of the day** impartially, while advising the ministers frankly.',
  sol: 'Permanence and political neutrality applied to the officer.',
  scheme: [['Governments change but civil servants continue', 1], ['They must implement any government\'s policies impartially', 1]],
}));
Q('s_cabinet', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does the Cabinet differ from the Council of Ministers?',
  model: 'The **Council of Ministers** is the whole body of ministers, of three ranks: Cabinet Ministers, Ministers of State and Deputy Ministers. The **Cabinet** is the smaller **inner group** of senior ministers, who take the major policy decisions of the government.',
  sol: 'The Council is the whole body; the Cabinet is the inner group.',
  scheme: [['Council of Ministers is the whole body of ministers', 1], ['Cabinet is the smaller inner group taking major decisions', 1]],
}));
Q('s_15', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The imagined state of Meghpur has a Legislative Assembly of 120 members. State the limit on its Council of Ministers, the Amendment that sets it, and how you reach the figure.',
  model: 'The **91st Amendment (2003)** limits the Council of Ministers to **15 per cent** of the strength of the House; a similar limit applies in the states. Fifteen per cent of 120 is **18**, so the Council of Meghpur, including the Chief Minister, can have at most 18 members.',
  sol: 'The Amendment, the rule and the calculation.',
  scheme: [['91st Amendment (2003): 15 per cent of the House', 1], ['15 per cent of 120 is 18', 1]],
}));
Q('s_reserv', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How are Scheduled Castes, Scheduled Tribes and Other Backward Classes provided for in recruitment to government posts?',
  model: 'The Constitution allows **reservation of posts** in public employment for these groups. In direct recruitment to Union posts the quotas are **15 per cent** for Scheduled Castes, **7.5 per cent** for Scheduled Tribes and **27 per cent** for Other Backward Classes (as of 2024); states fix their own.',
  sol: 'Reservation in recruitment with the Union figures.',
  scheme: [['Reservation of posts in recruitment is provided', 1], ['The Union figures: 15, 7.5 and 27 per cent', 1]],
}));

// ---------------------------------------------------------------- short answers (3 marks)
Q('s3_services', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the three categories of civil services in India.',
  model: '1. The **All India Services**, for example the Indian Administrative Service and the Indian Police Service, are recruited by the Union and posted in the states.\n2. The **Central Services** work for the Union government and are filled through the Union Public Service Commission.\n3. The **State Services** work for a state government and are filled through its State Public Service Commission.',
  sol: 'Each category named with its recruiter and field of service.',
  scheme: [['All India Services', 1], ['Central Services', 1], ['State Services', 1]],
}));
Q('s3_pm', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how the Prime Minister is appointed and to whom the Prime Minister and the Council of Ministers are responsible.',
  model: 'The **President appoints** the Prime Minister, who is normally the **head of the majority group** in the Lok Sabha. The President names the other ministers on the Prime Minister\'s advice. The Prime Minister and the Council are **jointly answerable to the Lok Sabha**, which can remove them through a **no-confidence motion**.',
  sol: 'Appointment, the majority link and responsibility to the Lok Sabha.',
  scheme: [['Appointed by the President as leader of the majority', 1], ['Ministers appointed on the Prime Minister\'s advice', 1], ['Collectively responsible to the Lok Sabha', 1]],
}));
Q('s3_discretion', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe any three situations in which the President of India can use discretion in practice.',
  model: '1. The President may **return the advice** of the Council of Ministers once for reconsideration.\n2. The President may **delay assent** to an ordinary bill, since no time limit is set; this is the **pocket veto**.\n3. When no party or alliance has a clear majority, the President uses **personal judgment** in choosing the Prime Minister.',
  sol: 'Three of the three recognised areas of discretion.',
  scheme: [['Returning the advice once', 1], ['Delaying assent (pocket veto)', 1], ['Choosing a Prime Minister in a hung House', 1]],
}));
Q('s3_issues', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'State three concerns that some people raise about the working of the bureaucracy.',
  model: '1. Some argue that there is **political interference**, such as pressure over postings and decisions.\n2. Some argue that officers are not sufficiently **accountable to citizens**, since they are not directly elected.\n3. Some argue that **red tape** delays work and that officers need to be more **responsive** to the needs of people.',
  sol: 'Three concerns, each framed as a view.',
  scheme: [['Political interference', 1], ['Accountability to citizens', 1], ['Red tape and responsiveness', 1]],
}));
Q('s3_powers', short({
  t: 1, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: 'Describe any three kinds of powers of the President of India with one example of each.',
  model: '1. **Executive powers:** appointing the Prime Minister, judges and Governors.\n2. **Legislative powers:** giving assent to bills, issuing ordinances and addressing Parliament.\n3. **Financial and emergency powers:** a money bill can be introduced only with the President\'s recommendation, and the President can proclaim an emergency on the advice of the Council.',
  sol: 'Three of the four groups of powers with examples.',
  scheme: [['Executive power with example', 1], ['Legislative power with example', 1], ['Financial or emergency power with example', 1]],
}));
Q('s3_types', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the presidential and parliamentary types of executive in three points, using the imagined countries Arvelia and Brendoria.',
  model: '1. In presidential Arvelia the President is **both head of state and head of government**; in parliamentary Brendoria the head of state is **nominal** and the Chancellor leads the government.\n2. Arvelia\'s President has a **fixed term**; Brendoria\'s Cabinet needs the **confidence of the legislature**.\n3. The Arvelian President is **directly elected**.',
  sol: 'Three contrasts: heads, responsibility, election.',
  scheme: [['Head of state and government', 1], ['Fixed term versus confidence of the legislature', 1], ['Mode of election', 1]],
}));
Q('s3_semi', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the semi-presidential type of executive with the example of France.',
  model: 'A **semi-presidential** executive has **both** a directly elected President and a Prime Minister. In **France** the President is elected by the people and holds real powers, while the **Prime Minister**, with the Cabinet, runs the government and is responsible to the legislature. The two share the executive.',
  sol: 'Both offices, the example and the sharing of power.',
  scheme: [['A directly elected President and a Prime Minister', 1], ['France as the example', 1], ['The Prime Minister is responsible to the legislature', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_types', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Distinguish the presidential, parliamentary and semi-presidential types of executive, with an example of each.',
  model: '1. In the **presidential** type, as in the **United States**, the President is directly elected, is head of state and of government, and serves a fixed term.\n2. In the **parliamentary** type, as in the **United Kingdom** and **India**, the Prime Minister and Cabinet are **responsible to the legislature** and can be removed by it.\n3. The head of state in a parliamentary system is **nominal**.\n4. In the **semi-presidential** type, as in **France**, there is both a **directly elected President** and a **Prime Minister**.\n5. The three types differ in where real power lies and to whom the government answers.',
  sol: 'Each type with its example and a point on the location of power.',
  scheme: [['Presidential type with example', 1], ['Parliamentary type with responsibility to the legislature', 1], ['Nominal head in the parliamentary type', 1], ['Semi-presidential type with example', 1], ['A closing contrast', 1]],
}));
Q('l_president', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain how the President of India is elected, the term and removal, and the main powers of the office.',
  model: '1. The President is elected **indirectly** by an **electoral college** of the elected members of both Houses of Parliament and of the State Legislative Assemblies.\n2. Voting is by **proportional representation by single transferable vote**, in a secret ballot.\n3. The term is **five years**, and the President can be removed by **impeachment** for violating the Constitution.\n4. Powers are **executive** (appointing the Prime Minister, judges and Governors) and **legislative** (assent to bills, ordinances).\n5. There are also **financial** and **emergency** powers, exercised on the advice of the Council of Ministers.',
  sol: 'Electoral college, method, term and removal, and the four kinds of powers.',
  scheme: [['Electoral college of elected members', 1], ['Method of voting', 1], ['Term and impeachment', 1], ['Executive and legislative powers', 1], ['Financial and emergency powers', 1]],
}));
Q('l_actual', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Is the President of India only a figurehead? Discuss with reference to the advice of ministers and the discretion the President can use.',
  model: '1. Some argue that the President is a **figurehead**, since the **42nd Amendment (1976)** made the ministers\' advice binding.\n2. Others point out that the **44th Amendment (1978)** lets the President **return the advice once** for reconsideration.\n3. The President may **delay assent** to an ordinary bill (the **pocket veto**), as there is no time limit.\n4. In a **hung House**, the President uses judgment in choosing the Prime Minister.\n5. The office is therefore **nominal in routine**, with limited but real discretion in special situations.',
  sol: 'Both views, the two amendments, two areas of discretion and a reasoned conclusion.',
  scheme: [['Figurehead view with the 42nd Amendment', 1], ['44th Amendment: advice returned once', 1], ['Delay of assent (pocket veto)', 1], ['Choice of Prime Minister in a hung House', 1], ['A reasoned conclusion', 1]],
}));
Q('l_pm_council', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the position of the Prime Minister and the Council of Ministers in the Union executive.',
  model: '1. The **President appoints** the **Prime Minister**, who heads the **majority group** in the Lok Sabha.\n2. Every minister must belong to Parliament or join it **within six months** of appointment.\n3. The Council is **collectively responsible** to the Lok Sabha and must resign if a **no-confidence motion** is passed.\n4. The **91st Amendment (2003)** limits its size to **15 per cent** of the Lok Sabha.\n5. The **Cabinet** is the inner group of senior ministers who take the main decisions.',
  sol: 'Appointment, membership rule, responsibility, size limit and the Cabinet.',
  scheme: [['Appointment and leadership of the majority', 1], ['Membership of Parliament within six months', 1], ['Collective responsibility and no confidence', 1], ['91st Amendment: 15 per cent', 1], ['The Cabinet as the inner group', 1]],
}));
Q('l_bureau', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the structure and the role of the civil services as the permanent executive in India.',
  model: '1. Civil servants are the **permanent executive**: recruited on **merit**, trained, and expected to be **politically neutral**.\n2. They **implement policies** and **advise ministers**.\n3. The services are the **All India Services** (the Indian Administrative Service and Indian Police Service), the **Central Services** and the **State Services**.\n4. The **Union Public Service Commission** recruits for the Union services and **State Public Service Commissions** for the states; their members have **security of tenure**.\n5. Reservation exists in recruitment for Scheduled Castes, Scheduled Tribes and Other Backward Classes.',
  sol: 'Features, role, three categories, commissions and reservation.',
  scheme: [['Features: merit, trained, neutral', 1], ['Role: implement policy and advise ministers', 1], ['Three categories of services', 1], ['Commissions and security of tenure', 1], ['Reservation in recruitment', 1]],
}));
Q('l_issues', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Some argue that the bureaucracy needs reform. Examine the concerns raised and the arguments on the other side.',
  model: '1. Some argue that there is **political interference** in the work and postings of officers.\n2. Some argue that officers are insufficiently **accountable to citizens**, since they are not elected.\n3. Others argue that **red tape** slows work, and that officers must become more **responsive**.\n4. On the other side, it is argued that **neutral officers with security of tenure** guard against hasty or partisan decisions, and that rules protect fairness.\n5. A balanced view looks for **responsiveness without losing neutrality**.',
  sol: 'Three concerns, a counter-view and a balanced conclusion.',
  scheme: [['Political interference', 1], ['Accountability to citizens', 1], ['Red tape and responsiveness', 1], ['The other side: neutrality and rules protect fairness', 1], ['A balanced conclusion', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_press', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; the newspaper, the alliances and the places are not real.)*',
  passage: '**From the Kadamba Herald, imagined, issue of 14 June**\n\nThe general election to the Lok Sabha ended with the Green Front winning 130 seats, the Harbour Alliance 120 and the Union of Regions 90, while other parties and independents shared the rest. No group had more than half of the seats. The President met the leaders of the three groups over two days and asked each to submit letters of support from members. The President then invited the leader whose letters showed the widest support and asked the new government to prove its majority in the Lok Sabha within ten days.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'What name is given to a House in which no party or alliance has a clear majority?', model: 'A **hung House** (a hung Lok Sabha).', sol: 'A result with no majority group is called hung.', scheme: [['Hung House', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which discretion of the President is shown in the report?', model: 'The President used **personal judgment in choosing the Prime Minister**, since no group had a clear majority.', sol: 'The choice of Prime Minister in a hung House.', scheme: [['Judgment in choosing the Prime Minister', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why did the President ask the new government to prove its majority in the Lok Sabha?', model: 'The Prime Minister and Council are **collectively responsible to the Lok Sabha**, so they can govern only with its **confidence**. The President\'s judgment is provisional, and the House settles whether the government has **majority support**.', sol: 'Link to responsibility to the Lok Sabha and the role of the House.', scheme: [['The government must have the confidence of the Lok Sabha', 1], ['The House decides on majority support', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Why can the President not simply appoint any person as Prime Minister in such a situation?', model: 'A Prime Minister who lacks **majority support** in the Lok Sabha would be removed by a **no-confidence motion**. The President must therefore choose the person **most likely to command the House**, within the limits of the **parliamentary system**.', sol: 'The need for majority support and the possibility of no confidence.', scheme: [['Without majority support the government cannot survive', 1], ['The President must choose who can command the House', 1]] }),
    ]),
  ],
}));
Q('c_diary', caseQ({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the diary extract and answer the questions that follow. *(An imagined diary written by SOYL for practice; the officer, the district and the people are not real.)*',
  passage: '**From the imagined diary of Ritu Bhandari, an officer of the Indian Administrative Service posted as District Collector of Sundarpet**\n\n9 a.m.: Reviewed the flood-relief plan that the state minister announced; my task is to carry it out in the 46 villages of the district.\n12 noon: A local representative asked me to transfer a clerk who had not favoured his supporters. I explained that postings follow the rules and not requests.\n3 p.m.: A pensioner came about a file that had passed through seven desks in two months. I felt ashamed of the delay.\n6 p.m.: Sent the Secretary a note on the changes the department could make to speed up work.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'recall', marks: 1, stem: 'Which body recruited Ritu Bhandari to the Indian Administrative Service?', model: 'The **Union Public Service Commission**.', sol: 'The Union commission recruits for the All India Services.', scheme: [['Union Public Service Commission', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which concern about the bureaucracy is shown by the pensioner\'s file in the 3 p.m. entry?', model: '**Red tape**: delay caused by many procedures and desks.', sol: 'A file that moves slowly through many desks.', scheme: [['Red tape', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): How does Ritu\'s reply to the request for a transfer reflect the neutrality expected of civil servants?', model: 'Civil servants must act on **rules and merit**, not to please politicians. By refusing to move the clerk to suit a request, she **resisted political interference** and treated staff impartially, as the permanent executive should.', sol: 'Neutrality and resistance to interference.', scheme: [['Acting on rules and merit', 1], ['Resisting political interference', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): State one reason why some argue that officers should be more responsive to citizens, and one argument on the other side.', model: 'Some argue that citizens such as the pensioner suffer when officers are slow, so the administration should be **more responsive** to their needs. Others argue that **procedures and rules** protect **fairness** and prevent hasty decisions.', sol: 'One reason and one counter-argument.', scheme: [['A reason for greater responsiveness', 1], ['An argument on the other side', 1]] }),
    ]),
  ],
}));
Q('c_table', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the list and answer the questions that follow. *(An imagined list written by SOYL for practice; the state and the ministers are not real.)*',
  passage: '**Imagined list of the Council of Ministers of the state of Vindhyapur, whose Legislative Assembly has 240 members**\n\n- Chief Minister: 1\n- Cabinet ministers: 12\n- Ministers of State: 14\n- Deputy ministers: 6\n- Total: 33\n\nThe state follows the same limit as the Union, namely 15 per cent of the strength of the House.',
  parts: [
    child('a', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'What is the maximum size of the Council of Ministers of Vindhyapur under the rule?', model: '15 per cent of 240 is **36**.', sol: 'Fifteen per cent of 240 is 36.', scheme: [['36', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Which group in the list is the inner group that takes the major decisions?', model: 'The **Cabinet ministers** (the Cabinet).', sol: 'The Cabinet is the inner group of senior ministers.', scheme: [['Cabinet', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): By how many members can the Council of Vindhyapur still be enlarged without breaking the limit? Name the Amendment that sets the limit.', model: 'The limit is 36 and the Council has 33, so **3 more** ministers can be added. The limit comes from the **91st Amendment (2003)**.', sol: 'The difference, and the Amendment.', scheme: [['3 more members', 1], ['91st Amendment (2003)', 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): A person who is not a member of the Assembly is appointed a deputy minister. What must the person do, and within what time?', model: 'The person must **become a member of the Legislature** of the state, **within six months** of the appointment, to continue as a minister, as the same rule applies in the Union and the states.', sol: 'Membership within six months.', scheme: [['Become a member of the Legislature', 1], ['Within six months', 1]] }),
    ]),
  ],
}));
Q('c_class', caseQ({
  t: 1, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the classroom discussion and answer the questions that follow. *(An imagined discussion written by SOYL for practice; the school and the students are not real.)*',
  passage: '**Imagined discussion in Class 11 at Lakeview School**\n\nMeera: In the news, the President sent the ministers\' advice back once and asked them to look at it again. The ministers sent the same advice, and the President accepted it. So the President is just a rubber stamp.\n\nImran: Not exactly. The Constitution now binds the President to the advice, but it lets the President ask for one reconsideration, and that is a real step.\n\nTeacher: Think also about what the President can do when no party has a majority, and about bills that wait for assent.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'recall', marks: 1, stem: 'Which Amendment lets the President return the advice once for reconsideration, and in which year?', model: 'The **44th Amendment**, in **1978**.', sol: 'The 44th Amendment (1978).', scheme: [['44th Amendment, 1978', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'What must the President do once the same advice is sent back after reconsideration?', model: 'The President must **act in accordance with the advice**.', sol: 'The advice is then binding.', scheme: [['Act on the advice', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Does the President\'s power to return the advice once make the office more than nominal? Give a reason.', model: 'It gives the President a **limited check**, as the Council must **think again**, but the final decision rests with the **Council of Ministers**. The office therefore remains **nominal** in the main, with some **discretion**.', sol: 'A reasoned judgment.', scheme: [['The return is a limited check', 1], ['The Council has the final say, so the office remains largely nominal', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Name two other situations that the teacher hints at where the President uses discretion.', model: 'The President may **delay assent** to an ordinary bill, the **pocket veto**, because no time limit is set. And when no party or alliance has a clear majority, the President uses **judgment in choosing the Prime Minister**.', sol: 'Delayed assent and choice of the Prime Minister.', scheme: [['Delayed assent (pocket veto)', 1], ['Choosing a Prime Minister in a hung House', 1]] }),
    ]),
  ],
}));
