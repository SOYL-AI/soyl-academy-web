// CBSE 11 Political Science, ch16 Citizenship: question bank. Every passage (petition, letter, table, report, forum
// transcript) is written by SOYL and labelled as imagined; the city of Kalvara, the Harbour Lane settlement, the Sarna Hills
// and Dhanvi Forest, the countries Torvania and Ostrell, the Marlen family, the Lumen Global Youth Forum and every person in a
// scenario are imagined. No NCERT text, boxed source, cartoon, quotation of any thinker, court judgment or board/sample-paper
// item is reused (D-036). No current citizenship law dispute, register or migration controversy is touched.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01: full and equal membership
Q('m_cit_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In political theory, citizenship is best defined as',
  opts: ['full and equal membership of a political community, usually a nation-state', 'living in one city for a number of years', 'owning land inside a country', 'a licence to vote granted by a ruler'],
  sol: 'Citizenship is full and equal membership of a political community, usually a nation-state, and it carries rights and obligations. Length of residence, land ownership and a ruler\'s licence do not define it.',
}));
Q('m_marshall_who', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The division of citizenship rights into civil, political and social rights is linked with',
  opts: ['T. H. Marshall, in Citizenship and Social Class (1950)', 'John Rawls, in A Theory of Justice (1971)', 'Immanuel Kant, on human dignity', 'Isaiah Berlin, on two kinds of liberty'],
  sol: 'T. H. Marshall wrote Citizenship and Social Class in 1950 and set out the three kinds of rights. Rawls is linked with the veil of ignorance, Kant with dignity and Berlin with negative and positive liberty.',
}));
Q('m_three_kinds', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which list names the three kinds of citizenship rights in Marshall\'s scheme?',
  opts: ['Civil, political and social rights', 'Civil, criminal and commercial rights', 'Economic, military and religious rights', 'Local, state and national rights'],
  sol: 'Marshall spoke of civil, political and social rights. The other lists mix up the names of laws, areas of activity or levels of government and are not his scheme.',
}));
Q('m_civil_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Dinesh, a worker who has come to the imagined city of Kalvara from a distant state, speaks freely at a workers\' meeting and approaches a court when his contractor refuses his wages. These freedoms are mainly',
  opts: ['civil rights', 'political rights', 'social rights', 'obligations of a citizen'],
  sol: 'Freedom of speech and access to a fair hearing are civil rights, which protect the individual\'s freedom. Political rights concern voting and holding office, social rights concern welfare and security, and obligations are duties and not freedoms.',
}));
Q('m_political_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Lata, aged nineteen, has her name entered in the voters\' list of imagined Kalvara and later stands for a ward committee. Which kind of citizenship rights is she using?',
  opts: ['Political rights', 'Civil rights', 'Social rights', 'None, since rights need a licence'],
  sol: 'Voting and standing for office are the political rights, which let a citizen take part in the exercise of power. Civil rights protect individual freedoms and social rights concern welfare, and rights do not depend on a licence.',
}));
Q('m_social_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Kalvara Corporation runs free primary schools and a basic clinic in every ward so that every family can have schooling and a minimum of health care. Which kind of citizenship rights does this mainly serve?',
  opts: ['Social rights', 'Political rights', 'Civil rights', 'Obligations'],
  sol: 'Schooling and health care serve the social rights, which concern economic welfare and security. Voting is political, freedom of speech and a fair trial are civil, and obligations are the duties of citizens.',
}));
Q('m_oblig', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Citizenship carries obligations as well as rights. Which pair is a correct example of obligations?',
  opts: ['Obeying the laws and paying taxes', 'Voting and standing for office', 'Speaking freely and owning property', 'Getting schooling and health care'],
  sol: 'Obeying the laws and paying taxes are obligations that a citizen owes to the community. The other pairs are examples of political, civil and social rights.',
}));
Q('m_french', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The French Revolution of 1789 is linked with the history of equal citizenship because it',
  opts: ['declared that people were citizens with equal rights and not subjects ranked by birth', 'created one government for the whole world', 'ended apartheid in South Africa', 'gave every adult in India a vote'],
  sol: 'The Revolution put forward the idea that people are citizens with equal rights, against privileges of birth. It did not create a world government, and apartheid and the Indian vote belong to other histories.',
}));
Q('m_apartheid', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which statement about the struggle against apartheid in South Africa is correct?',
  opts: ['Apartheid ended in the early 1990s and the first democratic election took place in 1994', 'Apartheid ended in the 1960s and the first democratic election took place in 1970', 'Apartheid continues as law in South Africa today', 'The first democratic election took place in 1789'],
  sol: 'Apartheid, a system of racial discrimination that denied equal citizenship to most people, ended in the early 1990s, and the first democratic election was held in 1994. The other dates and claims are wrong.',
}));
Q('m_move_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Dinesh is a citizen of India from a distant state who wishes to live and work in imagined Kalvara. Which principle supports his claim?',
  opts: ['A citizen may move freely and live and work in any part of the country, subject to reasonable restrictions', 'Only natives of a city may work in it', 'A worker must remain in the state of his birth', 'Freedom of movement belongs only to the residents of large cities'],
  sol: 'Article 19 gives citizens the freedom to move freely and to reside and work in any part of the territory, subject to reasonable restrictions. A birthplace test and a city-size test have no basis in that freedom.',
}));
Q('m_migr_neutral', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'At an imagined meeting in Kalvara, one resident says that workers from other states strain housing and jobs, while another says they are citizens with an equal right to work who also add to the city\'s economy. Which response is the most balanced?',
  opts: ['Examine both claims with evidence while remembering that every citizen has the right to move and work', 'Accept the first claim and ignore the second', 'Say that workers from other states are not citizens', 'Accept the second claim and deny that housing or jobs can ever be strained'],
  sol: 'A balanced reply tests both claims with evidence and keeps in view the equal right of every citizen. Ignoring one claim, or denying the citizenship of the workers, is not balanced.',
}));
Q('m_slum_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Residents of the imagined Harbour Lane settlement in Kalvara petition for piped water and a nearby school, saying that they are citizens like any others. Their petition mainly rests on the idea that',
  opts: ['equal citizenship includes a fair claim to basic services wherever a citizen lives', 'only owners of registered houses are citizens', 'basic services are a favour that may be refused at will', 'citizenship ends at the boundary of a city'],
  sol: 'The petitioners argue that they are full and equal members and so have a fair claim to basic services. Citizenship does not depend on owning a registered house, and services are not merely a favour.',
}));
Q('m_forest_app', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'For generations the imagined villagers of the Sarna Hills have gathered fruit and fuelwood in the Dhanvi Forest. A new notice bans all entry in order to protect rare trees. Which statement best fits equal citizenship?',
  opts: ['The villagers\' livelihood and the aim of protecting the forest both deserve weighing, so that a disadvantaged group is not overlooked', 'Forest dwellers are not citizens and need not be heard', 'Only the protection of the forest matters', 'Only the livelihood claim matters and protection may be dropped'],
  sol: 'Equal citizenship asks that a vulnerable group be heard, while protecting the forest is also a legitimate aim, so both are weighed with reasons. Excluding the villagers or dropping either aim does not do this.',
}));
Q('m_disadv', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'A rule in imagined Kalvara says that every family must collect its ration card in person from the Corporation office on a weekday morning. Many daily-wage workers lose a day\'s earnings if they go. What does this show about equal citizenship?',
  opts: ['One rule for all can still leave some people at a disadvantage, so equal citizenship needs attention to their circumstances', 'Equal rules always bring equal results', 'Daily-wage workers are not citizens', 'Rules for citizens should never be written'],
  sol: 'The same rule falls more heavily on those who lose a day\'s earnings, so equal citizenship needs attention to disadvantaged groups. Equal rules do not always bring equal results, and the workers are citizens.',
}));
Q('m_modes_descent', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined country of Torvania gives citizenship to a child born abroad if at least one parent is a Torvanian citizen. This mode of acquiring citizenship is called',
  opts: ['citizenship by descent', 'citizenship by naturalisation', 'citizenship by incorporation of territory', 'citizenship by birth within its territory'],
  sol: 'Citizenship that passes through a citizen parent to a child born abroad is citizenship by descent. Naturalisation applies to a foreigner who meets conditions, incorporation to residents of added territory, and birth to a person born within the country.',
}));
Q('m_modes_incorp', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'By a treaty the imagined country of Torvania takes in the neighbouring region of Brennick, and the residents of Brennick become Torvanian citizens under the treaty law. This is citizenship by',
  opts: ['incorporation of territory', 'descent', 'birth to citizen parents', 'naturalisation after long residence'],
  sol: 'When territory is added to a state and its residents become citizens by law, citizenship comes by incorporation of territory. Descent and birth depend on parentage or place of birth, and naturalisation on an individual\'s application.',
}));
Q('m_part2', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In India, citizenship is provided for in',
  opts: ['Part II of the Constitution and the Citizenship Act 1955, as amended over time', 'Part III of the Constitution alone, with no Act', 'separate laws made by each state for its own citizens', 'a rule issued by the Election Commission'],
  sol: 'Part II of the Constitution and the Citizenship Act 1955, amended over time, deal with citizenship. Part III is on fundamental rights, there is one citizenship for the country and not one for each state, and the Election Commission does not make citizenship rules.',
}));
Q('m_india_equal', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A pamphlet circulated in imagined Kalvara claims that members of one caste hold a lesser kind of citizenship than others. Which constitutional principle contradicts this claim?',
  opts: ['India gives citizenship equally to all, without distinction of religion, caste or gender', 'Citizenship is graded by caste in each state', 'Citizenship is a privilege of wealthy families', 'Citizenship depends on the language one speaks'],
  sol: 'The Constitution intends that citizenship be equal for all, without distinction of religion, caste or gender. Grading by caste, wealth or language has no place in it.',
}));

// ================================================================ t02: universal and global citizenship
Q('m_refugee_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A refugee is best described as a person who',
  opts: ['has been forced to leave his or her country by persecution, war or violence and cannot safely return', 'moves to another city for better pay', 'travels abroad for a holiday', 'holds the citizenship of two countries'],
  sol: 'A refugee flees danger such as persecution, war or violence and cannot safely go back. A person moving for pay or a holiday traveller is not a refugee, and holding two citizenships is dual citizenship.',
}));
Q('m_stateless_def', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'A stateless person is one who',
  opts: ['is not considered a citizen by any state', 'lives in a village far from the capital', 'has lost his or her job', 'holds passports of two states'],
  sol: 'A stateless person is not treated as a citizen by any state. Distance from a capital, loss of a job and holding two passports do not make a person stateless.',
}));
Q('m_stateless_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined Marlen family was born in the country of Ostrell, but Ostrell\'s law does not recognise them and no other state does either. They cannot obtain school admission, a bank account or a travel document. This best illustrates',
  opts: ['the problem of statelessness: without citizenship a person may lack the rights and protection that membership gives', 'the benefits of dual citizenship', 'citizenship by naturalisation', 'an example of global citizenship'],
  sol: 'A family that no state recognises is stateless and lacks the rights and protection that citizenship gives. Dual citizenship and naturalisation are ways of having citizenship, and global citizenship is a different idea about belonging to a world community.',
}));
Q('m_unhcr', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The United Nations High Commissioner for Refugees (UNHCR) is',
  opts: ['the United Nations agency that works to protect refugees', 'a court that decides citizenship disputes of every country', 'the legislature of the United Nations', 'a trade organisation of states'],
  sol: 'UNHCR is the United Nations refugee agency and works to protect refugees. It is not a world court, a legislature or a trade body.',
}));
Q('m_udhr', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Which statement about nationality is found in the Universal Declaration of Human Rights of 1948?',
  opts: ['Everyone has the right to a nationality', 'Only citizens of large states have the right to a nationality', 'A state may take away nationality arbitrarily', 'Nationality belongs only to those born in a capital city'],
  sol: 'The Declaration says that everyone has a right to a nationality, which supports the ideal of universal citizenship. The other statements contradict it.',
}));
Q('m_states_views', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'The imagined state of Torvania debates whether to admit people fleeing a conflict across its border. One minister stresses a duty to give shelter to people in danger, while another points to limits on housing and public services and the need for security checks. Which reading is the most balanced?',
  opts: ['Each minister names a real consideration, so the state must weigh humanitarian duty against practical limits and give its reasons', 'Only the first minister speaks of values, so the second may be ignored', 'Only the second minister is practical, so the first may be ignored', 'A state has no choices to make in such a matter'],
  sol: 'A balanced reading sees humanitarian duty and practical limits as both real and asks the state to weigh them with reasons. Ignoring either minister, or saying that no choice exists, is not balanced.',
}));
Q('m_global_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Global citizenship is the idea that',
  opts: ['people belong to a world community and have responsibilities toward humanity as a whole', 'a world government issues a passport to every person', 'national citizenship should be abolished', 'only wealthy people may travel across borders'],
  sol: 'Global citizenship is the idea of belonging to a world community with responsibilities toward humanity. It does not mean a world state, the end of national citizenship or any rule about travel.',
}));
Q('m_global_internet', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'How does the internet help the idea of global citizenship?',
  opts: ['It lets people in different countries learn about, discuss and act on shared concerns with ease', 'It replaces the laws of every country', 'It gives every user citizenship of all states', 'It prevents disasters from happening'],
  sol: 'The internet makes communication across borders easy, so people can learn about and act on shared concerns. It does not replace laws, grant citizenship or prevent disasters.',
}));
Q('m_global_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At the imagined Lumen Global Youth Forum, students from many countries run an online drive to plant trees and to raise money for flood relief in a country none of them lives in. Which responsibilities of global citizenship do they show?',
  opts: ['Care for the environment and help in disasters', 'Compulsory service in a national army', 'Payment of taxes to a world government', 'Voting in the elections of a foreign state'],
  sol: 'Planting trees and relief for flood victims show care for the environment and help in disasters, which are responsibilities of global citizenship. There is no world government, army service or foreign voting involved.',
}));
Q('m_both_views', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'At the imagined Lumen Forum, Pedro says that global citizenship should replace national citizenship, while Mei says that national citizenship stays the main source of rights. Which statement best evaluates the debate?',
  opts: ['Some hold that global citizenship can complement national citizenship, while others hold that rights are secured mainly through states, and each view needs reasons', 'Pedro is right, because states no longer exist', 'Mei is right, because global concerns are not real', 'The matter has been settled by law for all countries'],
  sol: 'The debate has several positions: some see global citizenship as a complement to national citizenship, others see states as the main source of rights. States still exist, global concerns are real, and no law settles the debate.',
}));
Q('m_enforce', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Why do some argue that national citizenship remains the main source of rights and protection?',
  opts: ['Because states have the laws, courts and officials that enforce rights within their territory', 'Because people should care only about their own countrymen', 'Because nations are older than humanity', 'Because the United Nations can punish any person'],
  sol: 'Those who hold this view point out that states have the laws, courts and officials that enforce rights. It does not follow that people should care for no one else, and the United Nations has no power to punish individuals everywhere.',
}));

// ================================================================ assertion-reason
Q('ar_marshall', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Marshall\'s scheme shows that citizenship is more than the right to vote.',
  r: 'He divided citizenship rights into civil, political and social rights, of which voting is only one part of the political kind.',
  sol: 'Both are true, and R explains A: since the vote is only part of the political rights, and civil and social rights are separate kinds, citizenship covers much more than voting.',
}));
Q('ar_equal_attention', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Equal citizenship requires attention to the circumstances of disadvantaged groups.',
  r: 'The same rule applied to everyone can leave people with unequal starting points unable to use their rights equally.',
  sol: 'Both are true, and R explains A: if identical rules leave people with unequal starting points unable to use their rights, attention to disadvantaged groups is needed for citizenship to be truly equal.',
}));
Q('ar_nation', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Nation-states set criteria for who is a citizen.',
  r: 'Every state is bound to grant citizenship to any person born anywhere in the world.',
  sol: 'A is true: each state decides by law who belongs. R is false: no state is bound to grant citizenship to everyone born anywhere, and the modes differ from country to country.',
}));
Q('ar_move', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'A citizen of India may in general move freely and live and work in any part of the country.',
  r: 'Indian citizenship is held separately for each state, so a person is a citizen only of his or her home state.',
  sol: 'A is true, subject to reasonable restrictions. R is false: India has a single citizenship for the whole country, which is why a citizen is not a stranger in another state.',
}));
Q('ar_french_sa', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The French Revolution of 1789 is linked with the struggle for equal citizenship.',
  r: 'The first democratic election in South Africa was held in 1994.',
  sol: 'Both are true, but R does not explain A: the South African election belongs to the later struggle against apartheid and says nothing about why the Revolution is linked with equal citizenship.',
}));
Q('ar_stateless', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Statelessness is a serious obstacle to the ideal of universal citizenship.',
  r: 'A stateless person is one whom no state treats as a citizen and so lacks the rights and protection that citizenship brings.',
  sol: 'Both are true, and R explains A: universal citizenship asks that everyone be a citizen somewhere, and a stateless person is exactly one who is not.',
}));
Q('ar_global', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Global citizenship means holding the citizenship of a single world state.',
  r: 'There is no world state that issues citizenship; global citizenship is an idea of belonging and responsibility.',
  sol: 'A is false: global citizenship is not citizenship of a world state. R is true and states what the idea actually is, so it contradicts A.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_equal_all', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'The idea of equal citizenship means that every citizen is a full member of the political community, whatever his or her religion, caste or gender.',
  sol: 'Equal citizenship means full and equal membership for all citizens, without distinction on such grounds.',
}));
Q('tf_refugee_stateless', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: 'Every refugee is stateless, and every stateless person is a refugee.',
  sol: 'The two are not the same. A refugee may still hold the citizenship of the country that he or she fled, and a stateless person may never have left the country of birth.',
}));
Q('tf_move', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: 'A citizen\'s freedom to move and work anywhere in the country can never be limited in any way.',
  sol: 'The freedom is real, but it is subject to reasonable restrictions.',
}));
Q('tf_global', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'Supporters of global citizenship say that people have responsibilities toward humanity, such as caring for the environment and helping in disasters.',
  sol: 'These are the responsibilities usually named in the idea of global citizenship.',
}));
Q('fb_citizenship', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Citizenship is full and ___ membership of a political community.',
  acc: [['equal']],
  sol: 'Citizenship is full and equal membership of a political community.',
}));
Q('fb_stateless', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'A person whom no state considers a citizen is called ___.',
  acc: [['stateless']],
  sol: 'Such a person is stateless.',
}));
Q('fb_marshall', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Marshall divided citizenship rights into civil rights, political rights and ___ rights.',
  acc: [['social']],
  sol: 'The three kinds are civil, political and social rights.',
}));
Q('mt_marshall', match({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Match each kind of right or duty with the imagined situation in Kalvara that illustrates it.',
  pairs: [
    ['Civil right', 'A worker speaks freely at a meeting and seeks a fair hearing in court'],
    ['Political right', 'A resident votes in the ward election and stands for the ward committee'],
    ['Social right', 'A family sends its children to a free school and uses a public clinic'],
    ['Obligation', 'A shopkeeper pays the taxes due and follows the market rules'],
  ],
  sol: 'Free speech and a fair hearing are civil rights, voting and standing are political rights, schooling and health care are social rights, and paying taxes and following rules are obligations.',
}));
Q('mt_modes', match({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Match each mode of acquiring citizenship with the imagined case in Torvania.',
  pairs: [
    ['By birth', 'Ravi is born in Torvania and the law gives him citizenship on that ground'],
    ['By descent', 'Nina is born abroad to a Torvanian mother and is recognised as a citizen'],
    ['By naturalisation', 'Selvi, born elsewhere, meets the conditions of the law after years of residence'],
    ['By incorporation of territory', 'The residents of Brennick become citizens when a treaty joins the region to Torvania'],
  ],
  sol: 'Birth in the territory is citizenship by birth, birth abroad to a citizen parent is descent, meeting legal conditions after residence is naturalisation, and a treaty joining a region is incorporation of territory.',
}));
Q('ord_petition', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps in a sensible order for the residents of the imagined Harbour Lane settlement who wish to ask for piped water.',
  items: [
    'List the needs of the households and what each family has lacked',
    'Gather the signatures of the residents',
    'Submit the petition to the Kalvara Corporation',
    'Follow up and ask for a hearing and a written reply',
  ],
  sol: 'The residents first list their needs, then gather signatures to show how many are affected, then submit the petition, and finally follow it up and ask for a hearing and a reply.',
}));
Q('ord_global_steps', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps by which an online campaign at the imagined Lumen Global Youth Forum might become an act of global citizenship.',
  items: [
    'Students learn of a shared concern, such as flooding in a distant country',
    'They discuss it across borders on the internet',
    'They agree on a form of help, such as a fund or a tree-planting drive',
    'They carry out the help and report the results to the forum',
  ],
  sol: 'The campaign begins with learning of a shared concern, then discussion across borders, then agreement on an action, and last the action and a report on it.',
}));

// ================================================================ short answers (2 marks)
Q('s_cit_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is meant by citizenship? Name one kind of right that it carries.',
  model: '**Citizenship** means being a full and **equal member** of a political community, most often a nation-state. A citizen holds rights, for example **civil**, **political** or **social** rights, and also owes obligations.',
  sol: 'Definition and a right.',
  scheme: [['Full and equal membership of a political community, usually a nation-state', 1], ['A kind of right named', 1]],
}));
Q('s_marshall', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Who divided citizenship rights into three kinds, and what are they?',
  model: '**T. H. Marshall**, in *Citizenship and Social Class* (1950), divided them into **civil rights** (individual freedoms), **political rights** (a share in power, such as voting) and **social rights** (welfare and security).',
  sol: 'Name and three kinds.',
  scheme: [['T. H. Marshall named', 1], ['Civil, political and social rights', 1]],
}));
Q('s_oblig', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Citizenship carries obligations as well as rights. Give two obligations of a citizen and say why they matter.',
  model: 'A citizen should **obey the laws** and **pay taxes**, and should respect the rights of others. They matter because the community can protect everyone\'s **rights** only if its members also do their part.',
  sol: 'Two obligations and a reason.',
  scheme: [['Two obligations named', 1], ['A reason: rights are sustained by the duties of members', 1]],
}));
Q('s_apartheid', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'In general terms, how does the struggle against apartheid in South Africa illustrate the demand for equal citizenship?',
  model: 'Under **apartheid**, most people were denied equal rights by a system of racial discrimination. Their struggle demanded **full and equal citizenship**. Apartheid ended in the early 1990s, and the first **democratic election** was held in 1994.',
  sol: 'Denial of equality, the struggle, and dates.',
  scheme: [['Apartheid denied equal rights through racial discrimination, and the struggle demanded equal citizenship', 1], ['Ended in the early 1990s; first democratic election in 1994', 1]],
}));
Q('s_migrant_app', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A citizen from a distant state is refused a rented room in imagined Kalvara only because he is from another state. Which right is involved and what does equal citizenship say?',
  model: 'The case concerns the citizen\'s **freedom to move and to live and work** in any part of the country. Equal citizenship means that he is a **full member** of the country and not a stranger, though **reasonable restrictions** may apply.',
  sol: 'Right and principle.',
  scheme: [['Freedom to move, live and work anywhere in the country', 1], ['Equal, single citizenship; reasonable restrictions only', 1]],
}));
Q('s_slum_app', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Residents of the imagined Harbour Lane settlement ask for water and drainage. Explain how equal citizenship supports their claim, and name one view that others may hold.',
  model: 'As **citizens**, they are full and equal members and so have a fair claim to **basic services** and housing. Others may argue that the land is subject to **planning rules**, so the Corporation must weigh the claim against such rules.',
  sol: 'Claim and a different view.',
  scheme: [['Citizens have a fair claim to basic services whatever their place of residence', 1], ['Another view: planning or land rules must be weighed', 1]],
}));
Q('s_forest', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Why should the livelihood of forest dwellers, such as the imagined villagers of the Sarna Hills, be considered in a debate on equal citizenship?',
  model: 'Forest dwellers are **full citizens** whose **livelihood** depends on gathering produce from the forest. Equal citizenship asks that such a disadvantaged group be **heard** and that the aim of protecting the forest be weighed with it.',
  sol: 'Citizenship and livelihood.',
  scheme: [['They are full citizens whose livelihood depends on the forest', 1], ['A disadvantaged group must be heard and the claims weighed', 1]],
}));
Q('s_stateless', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a stateless person? Give one difficulty that the imagined Marlen family might face.',
  model: 'A **stateless person** is one whom no state treats as a citizen. The Marlen family may be unable to get **school admission** or a travel document, because they lack the **rights and protection** that citizenship gives.',
  sol: 'Meaning and a difficulty.',
  scheme: [['Not considered a citizen by any state', 1], ['A difficulty such as lack of rights, schooling or travel documents', 1]],
}));
Q('s_refugee_unhcr', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is a refugee, and what does the United Nations refugee agency do?',
  model: 'A **refugee** is a person forced to leave his or her country by persecution, war or violence and unable to return safely. The **United Nations High Commissioner for Refugees**, UNHCR, works to **protect** refugees.',
  sol: 'Refugee and agency.',
  scheme: [['A person forced to flee persecution, war or violence and unable to return safely', 1], ['UNHCR works to protect refugees', 1]],
}));
Q('s_global_internet', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is global citizenship, and how has the internet made it easier to practise?',
  model: '**Global citizenship** is the idea that we belong to a **world community** with responsibilities toward humanity. The **internet** and modern communication help people in different countries to learn about shared concerns and act together.',
  sol: 'Idea and the role of communication.',
  scheme: [['Belonging to a world community with responsibilities toward humanity', 1], ['The internet and communication make contact and joint action easy', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_modes', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name the general modes by which citizenship may be acquired in India, giving an imagined example of one.',
  model: 'As provided in the Citizenship Act 1955, which has been **amended over time**, citizenship may be acquired by **birth**, **descent**, **registration**, **naturalisation** and **incorporation of territory**. For example, a child born abroad to a citizen parent may be a citizen **by descent**, as in imagined Torvania.',
  sol: 'Modes named, with the Act and an example.',
  scheme: [['The Citizenship Act 1955, amended over time', 1], ['Birth, descent, registration, naturalisation and incorporation of territory', 1], ['A suitable example of one mode', 1]],
}));
Q('s3_equal_india', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the constitutional principle of equal citizenship in India, and how it differs from a system of separate state citizenships.',
  model: 'The Constitution intends that citizenship be given **equally to all**, without distinction of **religion, caste or gender**. India also has a **single citizenship** for the whole country, so a citizen from any state is a **full member** everywhere and may in general live and work in any part.',
  sol: 'Equality, single citizenship, effect.',
  scheme: [['Citizenship equal for all without distinction of religion, caste or gender', 1], ['A single citizenship for the whole country', 1], ['Effect: a citizen is a full member in every state', 1]],
}));
Q('s3_disadv', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain why equal citizenship requires attention to disadvantaged groups, using the imagined ration card rule in Kalvara or any other example.',
  model: 'A rule that is **the same for all** may still fall unequally. If every family must collect its ration card in person on a weekday, **daily-wage workers** lose earnings. So equal citizenship requires attention to such **disadvantaged groups**, for example through other ways of applying, so that all can use their **rights** equally.',
  sol: 'Same rule, unequal effect, attention needed.',
  scheme: [['The same rule for all can have unequal effects', 1], ['A suitable example', 1], ['Attention to disadvantaged groups so that all can use their rights equally', 1]],
}));
Q('s3_migr_debate', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Present, without taking a side, the two views at an imagined meeting in Kalvara on workers who have come from other states.',
  model: 'Some residents argue that arrivals strain **housing, jobs and services**. Others argue that the workers are **citizens** with an equal right to **move and work**, and that they add to the city\'s economy. Both claims should be examined with **evidence**, keeping in mind that every citizen has this right.',
  sol: 'Both views, then evidence.',
  scheme: [['One view: strain on housing, jobs and services', 1], ['Other view: equal right to move and work, contribution to the economy', 1], ['Both examined with evidence, the right of every citizen kept in view', 1]],
}));
Q('s3_states_choice', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Describe the difficult choices that a state such as imagined Torvania faces when people fleeing a conflict ask to be admitted. Present both views.',
  model: 'One view holds that a state owes shelter to people in danger, as a **humanitarian duty**. Another view points to **limits** of housing and public services and to the need for **security checks**. The state must **weigh** these and give its reasons, and citizens may judge with reasons.',
  sol: 'Duty, limits and weighing.',
  scheme: [['View stressing humanitarian duty', 1], ['View stressing limits and security', 1], ['The state weighs them and gives reasons', 1]],
}));
Q('s3_global_views', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Give the views of those who say global citizenship can complement national citizenship and of those who say national citizenship remains the main source of rights.',
  model: 'Some argue that people can be loyal to their nation and also care for **humanity**, for example in the **environment** or **disaster relief**, so global citizenship **complements** national citizenship. Others argue that **states** have the laws and courts that enforce rights, so national citizenship remains the **main source** of rights.',
  sol: 'Both views with reasons.',
  scheme: [['Complement view with a reason', 1], ['National citizenship the main source, with the reason that states enforce rights', 1], ['Both views presented with reasons', 1]],
}));
Q('s3_forest', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Dhanvi Forest is closed to all entry to protect rare trees, though the villagers of the Sarna Hills depend on it. Show how equal citizenship and the aim of protection may both be considered.',
  model: 'The villagers are **full citizens** whose **livelihood** depends on the forest, and equal citizenship requires that their claim be heard. Protecting rare trees is also a **legitimate aim**. The authorities may **weigh** both, hold consultations, and seek arrangements, such as regulated gathering, that give **reasons** to each side.',
  sol: 'Both claims weighed.',
  scheme: [['Villagers are full citizens whose livelihood must be heard', 1], ['Protection is also a legitimate aim', 1], ['Weighing the two, with consultation and reasons', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_marshall', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the idea of citizenship, with its rights and obligations, using the three kinds of rights described by T. H. Marshall.',
  model: '1. **Citizenship** means being a full and **equal member** of a political community, most often a nation-state.\n2. **T. H. Marshall** (*Citizenship and Social Class*, 1950) divided the rights into three kinds.\n3. **Civil rights** protect individual freedoms, such as speech and a fair hearing; **political rights** are a share in power, such as voting.\n4. **Social rights** cover welfare and the safety net of each citizen, for example access to schools and clinics.\n5. Citizens also have **obligations**, such as obeying the laws and paying taxes.',
  sol: 'Definition, Marshall, three kinds, obligations.',
  scheme: [['Definition of citizenship', 1], ['Marshall and his three kinds named', 1], ['Civil and political rights explained', 1], ['Social rights explained', 1], ['Obligations of citizens', 1]],
}));
Q('l_struggles', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe, in general terms, struggles in history and in India for equal citizenship.',
  model: '1. The **French Revolution** of 1789 stressed that people are citizens with equal rights, not subjects ranked by birth.\n2. In **South Africa**, the struggle against apartheid, which denied equality by racial discrimination, led to its end in the early 1990s.\n3. The first **democratic election** there was held in 1994.\n4. In India, **women\'s movements** demanded equal rights.\n5. Movements of **Dalits** sought equal treatment and dignity as full citizens.',
  sol: 'Four struggles, with dates.',
  scheme: [['French Revolution 1789 and equal rights', 1], ['South Africa, apartheid denied equality', 1], ['End in the early 1990s; election in 1994', 1], ['Women\'s movements in India', 1], ['Dalit movements in India', 1]],
}));
Q('l_equal_practice', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Using imagined cases from Kalvara, the Harbour Lane settlement and the Sarna Hills, explain how equal citizenship in practice requires attention to disadvantaged groups.',
  model: '1. Equal citizens may **move and work** anywhere, so a worker from another state in Kalvara is a full member, subject to reasonable restrictions.\n2. People may differ on **pressure on services**, so claims should be tested with evidence.\n3. The **urban poor** of Harbour Lane ask for housing, water and services as citizens.\n4. **Forest dwellers** of the Sarna Hills depend on the forest, and their livelihood must be weighed with protection.\n5. **Same rules** can fall unequally, so disadvantaged groups need attention.',
  sol: 'Movement, services, urban poor, forest dwellers, disadvantage.',
  scheme: [['Freedom to move and work, with reasonable restrictions', 1], ['Neutral treatment of the debate on migrants', 1], ['Urban poor and basic services', 1], ['Forest dwellers, livelihood weighed with protection', 1], ['Same rules can fall unequally, so attention to disadvantaged groups', 1]],
}));
Q('l_nation_modes', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain how nation-states set criteria for citizenship, with reference to the general modes of acquiring citizenship in India and the constitutional principle of equal citizenship.',
  model: '1. A **nation-state** decides by law who is a citizen, so criteria differ.\n2. In India, **Part II** of the Constitution and the **Citizenship Act 1955**, amended over time, provide for citizenship.\n3. The Act provides for **birth**, **descent**, **registration**, **naturalisation** and **incorporation of territory**.\n4. India has a **single citizenship** for the whole country.\n5. As the Constitution intends, it is given **equally**, without distinction of religion, caste or gender.',
  sol: 'Criteria, Part II and Act, modes, single citizenship, equality.',
  scheme: [['States set criteria by law', 1], ['Part II and the Citizenship Act 1955, amended over time', 1], ['Five modes named', 1], ['A single citizenship', 1], ['Equality without distinction of religion, caste or gender', 1]],
}));
Q('l_universal', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the ideal of universal citizenship and the problems of refugees and stateless persons, and present the different views on the choices that states face.',
  model: '1. The **ideal** is that every person should be a citizen somewhere, with full rights.\n2. A **refugee** has been forced to leave a country by persecution, war or violence.\n3. A **stateless person** is considered a citizen by no state and may lack rights and protection.\n4. The **United Nations refugee agency**, UNHCR, works to protect refugees.\n5. Some argue that states have a **duty** to shelter people in danger, while others stress practical **limits**, and states must weigh them.',
  sol: 'Ideal, refugees, stateless persons, UNHCR, views.',
  scheme: [['Ideal of universal citizenship', 1], ['Refugee defined', 1], ['Stateless person defined and the difficulties', 1], ['UNHCR named', 1], ['Both views of states presented with reasons', 1]],
}));
Q('l_global', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Explain the idea of global citizenship and the role of the internet, and discuss the views on whether it can complement national citizenship.',
  model: '1. **Global citizenship** is the idea that we belong to a **world community** with responsibilities toward humanity.\n2. These include care for the **environment**, **human rights** and **disaster relief**.\n3. The **internet** and communication make shared action across borders easier.\n4. Some argue that it can **complement** national citizenship.\n5. Others argue that **national citizenship** remains the main source of rights and protection, since states enforce rights; the student judges with reasons.',
  sol: 'Idea, responsibilities, internet, both views.',
  scheme: [['Meaning of global citizenship', 1], ['Responsibilities named', 1], ['Role of the internet', 1], ['Complement view', 1], ['National citizenship the main source, with a reasoned judgement', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_petition', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the petition and answer the questions that follow. *(An imagined petition written by SOYL for practice; Kalvara, the Harbour Lane settlement and its residents are not real.)*',
  passage: '**From a petition of the residents of Harbour Lane to the Kalvara Corporation, imagined**\n\nWe are four hundred families who have lived at Harbour Lane for many years. We vote in the ward election and pay the taxes on what we buy, yet we have no piped water, and our children walk far to a school. We are citizens like everyone in the city. A member of the planning committee replied that part of our land is reserved under the city plan, and that the Corporation has limited funds. We ask for a hearing so that both our needs and the plan can be weighed.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which kind of citizenship rights is the petition mainly asking for when it asks for water and schooling?', model: '**Social rights**.', sol: 'Water and schooling concern welfare and security.', scheme: [['Social rights', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Name one right and one obligation of citizenship that the residents say they already use or meet.', model: 'The right to **vote** (a political right) and the obligation to **pay taxes**.', sol: 'Voting and paying taxes.', scheme: [['One right and one obligation named', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Show how the petition and the reply of the planning member each raise a reasonable point.', model: 'The residents point to their **equal citizenship** and their need for basic services. The planning member points to **land reserved** under the city plan and to limited funds. Both are reasonable, so a **hearing** can weigh them.', sol: 'Two reasonable points.', scheme: [['The residents\' claim as citizens to basic services', 1], ['The planning and funding point, weighed in a hearing', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest one way the Corporation might respond fairly, and give a reason.', model: 'The Corporation might hold a **hearing**, provide water through **common taps** at once and plan longer-term services. This respects the families\' **equal claim** as citizens while the plan and funds are also considered.', sol: 'A fair response.', scheme: [['A practical response such as a hearing or interim services', 1], ['A reason linking it to equal citizenship and the plan', 1]] }),
    ]),
  ],
}));
Q('c_worker', caseQ({
  t: 1, d: 5, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; Kalvara, Dinesh and the others are not real.)*',
  passage: '**Imagined letter to the Kalvara Courier**\n\nI am Dinesh, a mason. I came to Kalvara from a distant state three years ago to find work. My landlord now says that rooms are for people of this city first. A shopkeeper in my lane says that more workers are pushing up rents and crowding the bus. A teacher at my night class says that I am a citizen of the same country, and that the city must plan for its growing population instead of closing its doors. I wonder how a fair city should reason about this.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which freedom of a citizen is Dinesh relying on?', model: 'The freedom to **move and to live and work** in any part of the country.', sol: 'Movement and work.', scheme: [['Freedom to move, live and work anywhere in the country', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'understanding', marks: 1, stem: 'Why can Dinesh be called a full citizen of Kalvara\'s country even though he came from another state?', model: 'India has a **single citizenship** for the whole country.', sol: 'No separate state citizenship.', scheme: [['A single citizenship for the whole country', 1]] })),
    child('c', short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): State the shopkeeper\'s point and the teacher\'s point, without taking a side.', model: 'The shopkeeper says that more workers raise **rents** and crowd services. The teacher says that Dinesh is an **equal citizen** and that the city should **plan** for its growth instead of closing its doors. Both should be examined with evidence.', sol: 'Both views.', scheme: [['The shopkeeper\'s point on rents and crowding', 1], ['The teacher\'s point on equal citizenship and planning', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest one measure that a city might take that respects equal citizenship while easing the pressure on housing, and give a reason.', model: 'The city might build **affordable housing** and expand its **buses**. This respects the equal right of all citizens to live and work, while it relieves the **pressure** that residents worry about.', sol: 'A reasoned measure.', scheme: [['A measure such as more housing or services', 1], ['A reason linking it to both equal right and pressure', 1]] }),
    ]),
  ],
}));
Q('c_modes', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(An imagined table written by SOYL for practice; Torvania, Brennick and the people named are not real.)*',
  passage: '**Four people and how each became a citizen of imagined Torvania**\n\n| Person | Circumstance | Basis in Torvanian law |\n|---|---|---|\n| Ravi | Born in Torvania | Birth in the territory |\n| Nina | Born abroad to a Torvanian mother | Descent |\n| Selvi | Born elsewhere; lived in Torvania for years and met the legal conditions | Naturalisation |\n| Omar | Lived in Brennick when it was joined to Torvania by a treaty | Incorporation of territory |',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Whose citizenship is by descent?', model: '**Nina**\'s.', sol: 'Born abroad to a citizen mother.', scheme: [['Nina', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which person became a citizen by naturalisation?', model: '**Selvi**.', sol: 'She met the legal conditions after years of residence.', scheme: [['Selvi', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how Omar\'s case differs from Selvi\'s.', model: 'Omar became a citizen because his **region was joined** to Torvania, so his citizenship came by **incorporation of territory**. Selvi, born elsewhere, became a citizen through her own **application** after meeting the legal conditions.', sol: 'Difference between the two modes.', scheme: [['Omar: citizenship because the territory was joined', 1], ['Selvi: individual application after residence', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why might different states use different criteria for citizenship?', model: 'Each **nation-state** sets its own criteria by **law**, according to its history, its population and its aims. So the modes and the **conditions** for each mode can differ from country to country, and may change over time.', sol: 'States set their own criteria.', scheme: [['Each state decides by its own law', 1], ['Modes and conditions differ and may change over time', 1]] }),
    ]),
  ],
}));
Q('c_report', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the report and answer the questions that follow. *(An imagined report written by SOYL for practice; Ostrell, Torvania and the Marlen family are not real.)*',
  passage: '**From the Torvanian Review, imagined**\n\nThe Marlen family left the country of Ostrell after a conflict reached their town. Ostrell\'s officials say that the family was never registered as citizens, and no other state recognises them. In Torvania they cannot enrol their children in school or open a bank account. A United Nations refugee agency worker says that the family needs protection. A Torvanian official replies that the country has limited housing and must check the security of all arrivals, while a volunteer says that people in danger should be sheltered.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which word describes a person who is not a citizen of any state?', model: '**Stateless**.', sol: 'Recognised by no state.', scheme: [['Stateless', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Name the kind of organisation to which the worker who says the family needs protection belongs.', model: 'The **United Nations refugee agency** (UNHCR).', sol: 'UNHCR protects refugees.', scheme: [['The United Nations refugee agency, UNHCR', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): State the official\'s view and the volunteer\'s view.', model: 'The official stresses **limited housing** and **security checks**. The volunteer stresses a **duty to shelter** people in danger. Both name real considerations, and a state must weigh them and give reasons.', sol: 'Both views.', scheme: [['The official: limited housing and security', 1], ['The volunteer: duty to shelter people in danger', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): How does the family\'s case show why the ideal of universal citizenship matters?', model: 'Universal citizenship says that **everyone** should be a citizen somewhere with full rights. The Marlens have **no state** to give them rights, so they cannot go to school or use a bank, which shows what is lost without citizenship.', sol: 'The ideal and what is lost without it.', scheme: [['Ideal: everyone a citizen somewhere with full rights', 1], ['The family lacks any state\'s protection and so loses schooling and banking', 1]] }),
    ]),
  ],
}));
Q('c_forum', caseQ({
  t: 2, d: 5, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the extract and answer the questions that follow. *(An imagined discussion written by SOYL for practice; the Lumen Global Youth Forum and the speakers are not real.)*',
  passage: '**Extract from an online discussion at the Lumen Global Youth Forum, imagined**\n\nAisha: Our group set up a shared page on which students from six countries record how they save water, and we sent funds for flood relief abroad.\nPedro: This is what citizenship should be today, since our problems cross borders. We should think of ourselves first as citizens of the world.\nMei: I agree that we have duties toward everyone, but when my rights are in danger, it is my own state\'s courts and officials that I can approach.\nAisha: Perhaps both can be true together.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name one responsibility of global citizenship that appears in the extract.', model: '**Care for the environment** (saving water) or **help in disasters** (flood relief).', sol: 'Water saving or flood relief.', scheme: [['One suitable responsibility', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'How did the internet help the students\' project?', model: 'It let students in **different countries** share information and work together.', sol: 'Shared page across borders.', scheme: [['Communication across countries', 1]] })),
    child('c', short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): Give Mei\'s argument for national citizenship, and one reply that Aisha might offer.', model: 'Mei argues that her **state** has the courts and officials that protect her rights. Aisha might reply that global citizenship **complements** national citizenship, since one can take part in a nation and also care for **humanity**.', sol: 'Argument and reply.', scheme: [['Mei: the state enforces rights', 1], ['Aisha: the two can complement each other', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one reason in favour of Pedro\'s view and one limit of it.', model: 'In favour: many problems, such as the **environment**, **cross borders**, so concern must reach beyond a nation. A limit: there is no world state, and **national citizenship** is where most rights are enforced.', sol: 'A reason and a limit.', scheme: [['A reason such as problems crossing borders', 1], ['A limit such as no world state and rights enforced nationally', 1]] }),
    ]),
  ],
}));
