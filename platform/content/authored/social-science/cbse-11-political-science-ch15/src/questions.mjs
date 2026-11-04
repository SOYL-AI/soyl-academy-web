// CBSE 11 Political Science, ch15 Rights: question bank. Every passage (debate, newspaper report, table, letter,
// panchayat note) is written by SOYL and labelled as imagined; the countries Karvale, Belmora, Orsolin and Marenia, the
// towns Pelham, Odrin and Quillon, the hamlet of Dunmere and all people in scenarios are imagined. No NCERT text, boxed
// source, cartoon, quotation of any thinker or document, court judgment or board/sample-paper item is reused (D-036).
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01: what rights are
Q('m_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In political theory, a right is best defined as',
  opts: ['a justified claim, recognised by society and usually by law, that lets a person live with dignity and freedom and places a duty on others to respect it', 'any wish that a person happens to have', 'a favour that a ruler may grant or withdraw at will', 'a duty that only the state has to perform'],
  sol: 'A right is an entitlement or justified claim that society recognises, usually through law, and it places a duty on others. A passing wish, a ruler\'s favour and a duty of the state alone do not describe it.',
}));
Q('m_want_right', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which feature best separates a right from a mere want?',
  opts: ['A right is a claim that is necessary for a dignified life, is accepted as justified, and can apply equally to all', 'A want is always more costly than a right', 'A right is whatever a majority happens to desire at a given time', 'A want is any claim that a person says aloud'],
  sol: 'A claim becomes a right when it is needed for a dignified life, is accepted as justified and can apply equally to all. Cost, the desire of a majority and the act of saying a claim aloud do not decide the matter.',
}));
Q('m_notright_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Chetan of the imagined town of Pelham says that he has a right to a new phone every year because all his friends get one. Applying the test of a justified claim that is needed for a dignified life, which response is best?',
  opts: ['A new phone each year is a want; it is not necessary for a dignified life, so it does not meet the test of a right', 'It is a right, since Chetan wants it strongly', 'It is a right, since his friends get one', 'It is a right, since anything modern is a right'],
  sol: 'The claim fails the test because a yearly phone is not necessary for a life of dignity and freedom. Strength of desire, what friends have and the novelty of an item do not turn a want into a right.',
}));
Q('m_natural_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Natural rights are best described as',
  opts: ['rights that people are said to have by nature, before and apart from any government or law', 'rights that exist only after a legislature passes an Act', 'rights granted to the citizens of one state alone by its ruler', 'rights that belong only to those who own property'],
  sol: 'The idea of natural rights holds that people have certain rights by nature. Rights that exist only after an Act, rights granted by a ruler to citizens and rights tied to property ownership are different ideas.',
}));
Q('m_locke', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which set of natural rights is associated with the thinker John Locke?',
  opts: ['Life, liberty and property', 'Wealth, fame and power', 'Equal income, rest and leisure', 'Voting, taxation and military service'],
  sol: 'Locke is linked with natural rights to life, liberty and property. The other sets are not the rights associated with him.',
}));
Q('m_human_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Human rights are best described as rights that',
  opts: ['every person has because he or she is a human being, whatever his or her country, caste, religion or gender', 'a state gives only to its own citizens', 'belong only to adults who have the vote', 'exist only when a court has declared them'],
  sol: 'Human rights belong to all persons simply because they are human. They are not limited to citizens, to voters, or to cases that a court has already declared.',
}));
Q('m_udhr', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The best-known international statement of human rights, adopted by the United Nations in 1948, is the',
  opts: ['Universal Declaration of Human Rights', 'Treaty of Versailles', 'Magna Carta', 'Kyoto Protocol'],
  sol: 'The Universal Declaration of Human Rights was adopted by the United Nations in 1948. The Treaty of Versailles ended a war, Magna Carta is a medieval charter, and the Kyoto Protocol deals with climate.',
}));
Q('m_legal_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Legal rights differ from natural rights mainly because legal rights are',
  opts: ['recognised and protected by law and enforced by the state', 'held only by ancient peoples', 'never written down anywhere', 'the same thing as wants'],
  sol: 'Legal rights are recognised and protected by law, and the state enforces them. They are not restricted to ancient peoples, they are often written in constitutions, and they differ from wants.',
}));
Q('m_source_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined constitution of Karvale lists freedom of speech, a fair trial and the vote, and its courts protect them. As to their source, these rights are best called',
  opts: ['legal rights, since a constitution recognises them and the state protects them', 'natural rights only, since no law can ever recognise them', 'wants, since they appear on a list', 'duties, since a constitution lists them'],
  sol: 'Rights written into a constitution and protected by courts are legal rights. A constitution can recognise rights, a listed right is not a mere want, and a right is not a duty.',
}));
Q('m_source_app2', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'A campaigner in imagined Belmora says that the country\'s farm labourers deserve safe working conditions even though Belmora\'s laws do not yet mention them, because every person is entitled to this as a human being. Her claim rests mainly on the idea of',
  opts: ['human rights, which do not depend on the law of any one country', 'legal rights, since the law already protects the claim', 'a want that fails every test', 'political rights to contest elections'],
  sol: 'She appeals to what people are owed as human beings, which is the idea of human rights, and she does so because the law is silent. The claim is not yet a legal right, and it is not about elections.',
}));
Q('m_political_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In imagined Orsolin, a group of citizens registers a new party and puts up candidates in a council election. Which kind of right are they using?',
  opts: ['Political rights, to form parties and contest elections', 'Economic rights, to a minimum wage', 'Cultural rights, to keep a language', 'Civil liberties, to a fair trial'],
  sol: 'Forming a party and contesting an election are political rights. A minimum wage is economic, language is cultural, and a fair trial is a civil liberty.',
}));
Q('m_civil_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A newspaper in Pelham is free to publish a report that criticises the town council, and a man accused of theft there receives a public hearing before an impartial judge. Both situations involve',
  opts: ['civil liberties', 'economic rights', 'cultural rights', 'the right to vote only'],
  sol: 'Freedom of expression and a fair trial are civil liberties. Neither situation is about wages, language or voting.',
}));
Q('m_economic_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Quillon Council fixes a minimum daily wage for brick workers and starts a livelihood scheme for landless families. These measures protect',
  opts: ['economic rights', 'cultural rights', 'political rights', 'the freedom of expression'],
  sol: 'A minimum wage, a livelihood and basic needs are economic rights. They are not cultural or political rights, and they do not concern expression.',
}));
Q('m_cultural_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined country of Marenia allows a minority community to run primary schools in its own language and to hold its festivals openly. Which kind of right is most directly protected?',
  opts: ['Cultural rights', 'Economic rights', 'Political rights', 'The civil liberty of a fair trial'],
  sol: 'Preserving a language and culture, and schooling in the mother tongue, are cultural rights. The case does not concern wages, elections or trials.',
}));
Q('m_kind_classify', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Which of these claims is correctly matched with its kind of right?',
  opts: ['Education in one\'s mother tongue: a cultural right', 'A fair trial: an economic right', 'A minimum wage: a political right', 'The vote: a cultural right'],
  sol: 'Education in the mother tongue belongs with cultural rights. A fair trial is a civil liberty, a minimum wage is economic, and the vote is a political right, so the other pairs are mismatched.',
}));
Q('m_newclaims', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A clean environment, privacy, the rights of children and the rights of indigenous peoples are best described as',
  opts: ['newer claims that are increasingly recognised as rights', 'claims that every country has rejected', 'claims that have no link with dignity', 'rights that existed only before the seventeenth century'],
  sol: 'These are newer claims that are being recognised more and more. They have not been rejected everywhere, they bear on dignity, and they are not confined to an early period.',
}));
Q('m_newclaim_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Residents of the imagined town of Odrin say that smoke from a brick works makes the air unfit to breathe, and they ask that safe air be recognised as a claim. This claim is an example of',
  opts: ['a newer claim to a clean environment', 'a political right to contest elections', 'a cultural right to a language', 'a claim that no country can ever treat as a right'],
  sol: 'A demand for breathable air belongs to the newer claim of a clean environment. It is not political or cultural, and some countries do recognise such claims.',
}));
Q('m_equal_all', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'A wealthy family of the imagined town of Odrin demands that only its members be allowed to fish in the town lake, and calls this its right. Why does the claim fail the test of a right?',
  opts: ['A right must be a claim that can apply equally to all, but this claim asks for a privilege for one family', 'Fishing is never needed by anyone', 'Lakes cannot be used by people', 'A right can be claimed only by the poor'],
  sol: 'A claim becomes a right when it can be extended equally to everyone. A privilege for one family cannot, so it fails. Fishing can matter to livelihood, lakes can be used, and rights are not only for the poor.',
}));

// ================================================================ t02: rights and responsibilities
Q('m_state_duty', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Rights place duties on the state. Which of these shows the state refraining from violating a right?',
  opts: ['Police do not arrest a person without a lawful reason', 'A town builds a clinic', 'A school is opened in a remote village', 'A law fixes a minimum wage'],
  sol: 'Not arresting without lawful reason is a refraining duty. Building a clinic, opening a school and fixing a minimum wage are acts of providing conditions for rights.',
}));
Q('m_pos_neg', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Which pair correctly shows one duty of the state to act and one duty of the state to refrain?',
  opts: ['Act: provide a school in every village. Refrain: do not silence a peaceful newspaper without lawful cause', 'Act: silence a peaceful newspaper. Refrain: do not provide schools', 'Act and refrain both mean doing nothing', 'Act: ask citizens to protect rights. Refrain: nothing is required'],
  sol: 'Providing schools is an act that creates conditions for a right, and not silencing a peaceful newspaper is a refraining duty. The other options reverse the duties, confuse them, or deny that the state has any.',
}));
Q('m_resp_respect', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of these is a responsibility of individuals that goes with having rights?',
  opts: ['Respecting the rights of others', 'Ignoring any law that one dislikes', 'Claiming whatever one wants', 'Leaving every duty to the state'],
  sol: 'Individuals are expected to respect the rights of others. Ignoring laws, claiming anything and leaving all duties to the state do not fit.',
}));
Q('m_clash_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Esha\'s neighbour in Pelham plays a loudspeaker at full volume every evening as an exercise of his freedom of expression, while Esha needs quiet to study. Which approach best fits the idea of balancing rights?',
  opts: ['Both accept reasonable limits, such as fixed hours and a lower volume, so that each right is respected', 'Expression always overrides study', 'Study always overrides expression, with no hearing', 'Neither person has any right'],
  sol: 'When rights clash, each side accepts reasonable limits so that both claims are respected as far as possible. One right does not always override the other, and neither side loses all rights.',
}));
Q('m_env_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Households in the imagined hamlet of Dunmere dump waste in the shared stream, saying that each family may do what it likes. Which idea do they overlook?',
  opts: ['Individuals have a responsibility to care for shared goods such as the environment', 'Streams belong to no one', 'Rights have no link with duties', 'Only the state may protect a stream'],
  sol: 'Shared goods such as water need care from the people who use them. Streams do serve people, rights are linked with responsibilities, and the duty to protect is not the state\'s alone.',
}));
Q('m_vigil', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Some people argue that citizens should be vigilant when a government restricts rights in the name of security. Which reason would they most likely give?',
  opts: ['Restrictions, once accepted, may last or grow, so they should be reasonable, limited and open to review', 'Governments never face any real threat', 'Security has no value for a society', 'Rights should be set aside whenever the state asks'],
  sol: 'Those who urge vigilance stress that limits should be reasonable and reviewable. Others reply that real threats can justify some limits. Denying all threats, denying the value of security or giving up rights on request is not their argument.',
}));
Q('m_limits_def', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Why are rights described as not absolute?',
  opts: ['Because reasonable limits are needed to protect the rights of others and the common good', 'Because rights are mere wishes', 'Because only the state can have rights', 'Because rights apply to rulers alone'],
  sol: 'Rights are not absolute since reasonable limits protect other people and the common good. Rights are not wishes, individuals hold them, and they do not apply to rulers alone.',
}));
Q('m_limit_app', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'The council of imagined Marenia permits a public rally but asks that it end before dark and keep one lane of the main road clear for ambulances. Which statement best describes the condition?',
  opts: ['A reasonable limit that protects others and the common good while the rally itself is allowed', 'A violation, since any limit cancels a right', 'Proof that no right to hold a rally exists', 'An example of an absolute right'],
  sol: 'The rally is allowed and the condition protects other people, so it is a reasonable limit. Not every limit cancels a right, the right still exists, and an absolute right would carry no conditions.',
}));
Q('m_limit_eval', mcq({
  t: 2, d: 5, c: 'evaluation',
  stem: 'Which of these restrictions on a right is most likely to be seen as reasonable?',
  opts: ['A town permits a loud music festival only until ten at night so that residents can sleep, and announces the rule in advance', 'An order that bans all public speech in the town for a year without giving any reason', 'A rule that silences only those who criticise the council', 'A rule that lets officials change the limit at will without notice'],
  sol: 'A limit that is clear, announced, applies to all and protects others is reasonable. A blanket ban without reasons, a rule aimed at critics and a limit that officials may change at will are not.',
}));
Q('m_rr_link', mcq({
  t: [1, 2], d: 3, c: 'analysis',
  stem: 'A student of the imagined Pelham School says that if she has a right, someone else must have a duty. Which reasoning supports her?',
  opts: ['A right is a claim on others, so recognising it places a duty on the state and on other people to respect it', 'Rights are claims against nobody', 'Duties exist only for those who have no rights', 'A right needs no recognition from society'],
  sol: 'A right is a justified claim that others must respect, so each right carries duties. A claim against nobody, duties only for the rightless, and rights without recognition do not fit the definition.',
}));

// ================================================================ assertion-reason
Q('ar_right_def', ar({
  t: 1, d: 2, c: 'recall', verdict: 'both-true-explains',
  a: 'A demand for a new gadget every year is not counted as a right.',
  r: 'A right must be necessary for a dignified life and be accepted as justified, applying equally to all.',
  sol: 'Both are true, and R explains A: the gadget claim does not meet the conditions that R lays down.',
}));
Q('ar_natural', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Natural rights are said to belong to people whether or not a government recognises them.',
  r: 'Natural rights are the rights that a legislature creates when it passes a law.',
  sol: 'A is true. R is false: rights created by a legislature through law are legal rights, not natural rights.',
}));
Q('ar_legal', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'A right recognised in law is usually more secure in practice than a claim made only on moral grounds.',
  r: 'A court of the state can enforce a legal right.',
  sol: 'Both are true, and R explains A: enforcement by a court is what gives the legal right its security.',
}));
Q('ar_limits', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'Rights are not absolute.',
  r: 'The exercise of a right by one person can harm the rights of others.',
  sol: 'Both are true, and R explains A: since one person\'s use of a right can harm others, reasonable limits are needed and the right is not unlimited.',
}));
Q('ar_rr', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'Rights place duties only on the state, and individuals have none.',
  r: 'Individuals are expected to respect the rights of others and to care for shared goods.',
  sol: 'A is false: individuals also have responsibilities. R is true and states some of them, so it contradicts A.',
}));
Q('ar_new', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The claim to a clean environment is among the newer claims that are increasingly recognised as rights.',
  r: 'John Locke associated natural rights with life, liberty and property.',
  sol: 'Both are true, but R does not explain A: Locke\'s list belongs to the older idea of natural rights and does not account for why new claims are being recognised.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_want', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Every want that a person feels strongly about becomes a right.',
  sol: 'A want becomes a right only when it is necessary for a dignified life, is accepted as justified and can apply equally to all.',
}));
Q('tf_human', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'Human rights are the rights that all persons have because they are human.',
  sol: 'This is the standard meaning of human rights, which do not depend on one country\'s law.',
}));
Q('tf_absolute', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'A right may be used in any manner whatever, with no limit, even when its use harms other people.',
  sol: 'Rights are not absolute, since unlimited use by one person can harm other people and the shared interest of society.',
}));
Q('tf_state', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'Rights oblige the state both to provide conditions in which they can be enjoyed and to refrain from violating them.',
  sol: 'The state has duties to act, for example by providing schools, and to refrain, for example by not arresting without lawful cause.',
}));
Q('fb_right', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'A right is a justified ___, recognised by society and usually by law, that places a duty on others to respect it.',
  acc: [['claim', 'entitlement']],
  sol: 'A right is a justified claim or entitlement that society recognises.',
}));
Q('fb_limits', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Rights are not ___; reasonable limits protect the rights of others and the common good.',
  acc: [['absolute', 'unlimited']],
  sol: 'Rights are not absolute, since reasonable limits protect others and the common good.',
}));
Q('fb_legal', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Rights that are recognised and protected by law and enforced by the state are called ___ rights.',
  acc: [['legal']],
  sol: 'These are legal rights, which constitutions often list.',
}));
Q('mt_sources', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each term with its description.',
  pairs: [
    ['Natural rights', 'Said to belong to people by nature, an idea of the seventeenth and eighteenth centuries'],
    ['Human rights', 'Held by all persons because they are human, as in a United Nations declaration of 1948'],
    ['Legal rights', 'Recognised and protected by law and enforced by the state'],
    ['Newer claims', 'A clean environment and privacy are among these'],
  ],
  sol: 'Natural rights are tied to nature, human rights to being human, legal rights to law and the state, and a clean environment and privacy are newer claims.',
}));
Q('mt_kinds', match({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined claim from Marenia with the kind of right it belongs to.',
  pairs: [
    ['The people of a town form a new party to contest the council election', 'Political right'],
    ['A farm labourer asks for a minimum daily wage', 'Economic right'],
    ['A man accused of a crime asks for a fair hearing before a judge', 'Civil liberty'],
    ['A community asks for primary schooling in its own language', 'Cultural right'],
  ],
  sol: 'Forming a party is political, a minimum wage is economic, a fair hearing is a civil liberty, and schooling in one\'s own language is cultural.',
}));
Q('ord_want', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps in the order in which a student could test whether an imagined claim from Pelham is a right.',
  items: [
    'Ask whether the claim is needed for a life of dignity and freedom',
    'Ask whether society can accept the claim as justified',
    'Ask whether the claim can apply equally to all persons',
    'If every answer is yes, treat the claim as a right that others must respect',
  ],
  sol: 'The test moves from necessity to justification to equal application, and ends with the conclusion that the claim is a right.',
}));
Q('ord_clash', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps in a sensible order for resolving a clash between two rights in the imagined town of Odrin.',
  items: [
    'Identify the two rights that appear to clash',
    'Ask what harm each side would suffer',
    'Find a reasonable limit or arrangement, such as fixed hours',
    'Explain the reasons so that both sides can accept the outcome',
  ],
  sol: 'The clash is identified first, the harm to each side is weighed, a reasonable arrangement is found, and the reasons are explained.',
}));

// ================================================================ short answers (2 marks)
Q('s_right_def', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is meant by a right? Why does a right place a duty on others?',
  model: 'A **right** is an entitlement or justified claim, recognised by society and usually by law, that lets a person live with dignity and freedom. Because it is a claim on others, it places a **duty** on them, including the state, to respect it.',
  sol: 'Definition and duty.',
  scheme: [['A justified claim recognised by society and usually by law', 1], ['It places a duty on others to respect it', 1]],
}));
Q('s_want_right', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is not every want a right? State the test that a claim must meet.',
  model: 'A want becomes a **right** only when it is **necessary for a dignified life** and is accepted as **justified**. It must also be a claim that can apply **equally to all**, so a private wish does not qualify.',
  sol: 'The test of a right.',
  scheme: [['Necessary for a dignified life and accepted as justified', 1], ['Can apply equally to all', 1]],
}));
Q('s_natural', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What are natural rights? Name the rights associated with John Locke.',
  model: '**Natural rights** are rights that people are said to have by nature, before and apart from any government. The seventeenth and eighteenth century thinker **John Locke** is associated with the rights to **life, liberty and property**.',
  sol: 'Meaning and Locke.',
  scheme: [['Rights held by nature, apart from government', 1], ['Life, liberty and property linked with Locke', 1]],
}));
Q('s_human_legal', short({
  t: 1, d: 4, c: 'analysis', marks: 2, wl: S2,
  stem: 'Distinguish between human rights and legal rights in one point each.',
  model: '**Human rights** are held by every person simply because he or she is human, whether or not a country\'s law mentions them. **Legal rights** are recognised and protected by law, and the state enforces them, as constitutions often list.',
  sol: 'One point each.',
  scheme: [['Human rights: held because one is human', 1], ['Legal rights: recognised and enforced by law and the state', 1]],
}));
Q('s_kinds', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any two kinds of rights and give one example of each.',
  model: '**Political rights** include the right to vote and to contest elections. **Economic rights** include a minimum wage and a means of livelihood. Civil liberties such as freedom of expression and cultural rights such as education in one\'s mother tongue are also kinds of rights.',
  sol: 'Two kinds with examples.',
  scheme: [['One kind with an example', 1], ['A second kind with an example', 1]],
}));
Q('s_newclaims', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name two newer claims that are increasingly recognised as rights, and say why they are called claims.',
  model: 'Two examples are the right to a **clean environment** and the right to **privacy**; the rights of children and of indigenous peoples are others. They are called **claims** because societies are still debating and recognising them more and more.',
  sol: 'Two claims and why.',
  scheme: [['Two newer claims named', 1], ['Increasingly recognised, so called claims', 1]],
}));
Q('s_state_duties', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the two kinds of duty that rights place on the state, with one example of each.',
  model: 'Rights oblige the state to **act**, for example by opening schools and clinics that provide the conditions for rights. They also oblige it to **refrain**, for example by not arresting a person without a lawful reason.',
  sol: 'Act and refrain.',
  scheme: [['Duty to act, with an example', 1], ['Duty to refrain, with an example', 1]],
}));
Q('s_resp', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two responsibilities of individuals that go with rights.',
  model: 'Individuals should **respect the rights of others**, so that using one\'s own right does not harm another. They should also **care for shared goods** such as the environment, and balance their rights when these clash with the rights of others.',
  sol: 'Two responsibilities.',
  scheme: [['Respect the rights of others', 1], ['Another responsibility, such as caring for shared goods', 1]],
}));
Q('s_clash', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Two students of the imagined Pelham School clash: one wants to practise drums in the common hall at noon, another wants quiet there to study. Suggest one way to balance the two claims and say why it is fair.',
  model: 'The school could set **fixed hours**: drums at one time, quiet at another, or use a separate room. This is **fair** because each student\'s claim is respected within a **reasonable limit** and neither loses the right entirely.',
  sol: 'A balancing arrangement and the reason.',
  scheme: [['A workable arrangement such as fixed hours or a separate room', 1], ['Fair because each claim is respected within reasonable limits', 1]],
}));
Q('s_limits', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain why rights are not absolute and give one example of a reasonable limit.',
  model: 'Rights are not **absolute** because using a right without limit can harm the **rights of others** and the common good. A reasonable limit is a rule that a loud festival must end at night so that residents can sleep.',
  sol: 'Reason and example.',
  scheme: [['Unlimited use could harm others and the common good', 1], ['A suitable example of a reasonable limit', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_sources', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the three sources of rights, with one point on each.',
  model: '**Natural rights** are said to belong to people by nature, as in the seventeenth and eighteenth century idea linked with Locke. **Human rights** belong to all persons because they are human, and a United Nations declaration of 1948 is the best-known statement. **Legal rights** are recognised and protected by law and the state, as constitutions often list.',
  sol: 'Natural, human and legal.',
  scheme: [['Natural rights explained', 1], ['Human rights explained', 1], ['Legal rights explained', 1]],
}));
Q('s3_kinds', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Name the kind of right in each imagined case: (i) a farm labourer of Marenia asks for a minimum wage; (ii) a minority of Orsolin asks for primary schooling in its own language; (iii) a citizen of Karvale stands for election. Give a reason for each.',
  model: '(i) The farm labourer\'s claim is an **economic right**, since a minimum wage secures a livelihood and basic needs. (ii) The minority\'s claim is a **cultural right**, since schooling in the mother tongue helps to preserve a language and culture. (iii) The citizen\'s claim is a **political right**, since contesting an election is a way of taking part in government.',
  sol: 'Kind and reason for each.',
  scheme: [['Economic right with a reason', 1], ['Cultural right with a reason', 1], ['Political right with a reason', 1]],
}));
Q('s3_newclaims', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why are claims such as privacy and the rights of children described as increasingly recognised rather than settled everywhere? Give a reason and an example.',
  model: 'As societies change, people raise new claims that they see as needed for a **dignified life**, such as **privacy** in a digital age or protection for **children**. Countries recognise these claims at different times and in different ways, so they are **increasingly recognised** but not yet settled everywhere.',
  sol: 'Changing needs and uneven recognition.',
  scheme: [['New needs lead to new claims', 1], ['An example such as privacy or children', 1], ['Recognition differs across countries and times', 1]],
}));
Q('s3_balance', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Dev, a shopkeeper in the imagined Odrin market, plays a loudspeaker at full volume late at night to attract buyers, and nearby students cannot sleep. Using the idea of balancing rights, explain what should be done.',
  model: 'Dev\'s **freedom of expression and trade** clashes with the students\' claim to **rest and study**. Rights are not absolute, so a **reasonable limit** such as no loudspeaker after a fixed hour or a lower volume should be set. Both sides then respect each other\'s rights.',
  sol: 'Clash, limit, mutual respect.',
  scheme: [['Identify the clash of two claims', 1], ['A reasonable limit, such as fixed hours or lower volume', 1], ['Both sides respect each other\'s rights', 1]],
}));
Q('s3_resp', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three responsibilities of individuals that go with rights.',
  model: 'First, individuals should **respect the rights of others**. Second, when their rights clash with those of others, they should **balance** the claims through reasonable limits. Third, they should **care for shared goods** such as the environment, since everyone depends on them.',
  sol: 'Three responsibilities.',
  scheme: [['Respect the rights of others', 1], ['Balance rights that clash', 1], ['Care for shared goods such as the environment', 1]],
}));
Q('s3_limits', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain with an example why rights have reasonable limits, and say what makes a limit reasonable.',
  model: 'Rights have limits because using a right can harm others, for example a **procession** that blocks an ambulance route. A limit is **reasonable** when it protects the **rights of others or the common good**, is announced in advance, applies to all and leaves the right itself in place.',
  sol: 'Why limits, an example, what makes them reasonable.',
  scheme: [['Use of a right can harm others', 1], ['An example', 1], ['Features of a reasonable limit', 1]],
}));
Q('s3_vigil', short({
  t: 2, d: 5, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Some argue that citizens should be vigilant when a government restricts rights in the name of security; others say that real threats may justify reasonable limits. State both views with a reason each, and suggest a test for judging a restriction.',
  model: 'Some argue that restrictions, once accepted, can **last or grow**, so citizens should watch them. Others argue that a real **threat** may justify limits for a time. A student can judge a restriction by asking whether it is **necessary, limited and open to review**.',
  sol: 'Both views and a test.',
  scheme: [['One view with a reason', 1], ['The other view with a reason', 1], ['A test such as necessary, limited and reviewable', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_right_sources', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the meaning of a right and its three sources.',
  model: '1. A **right** is a justified claim, recognised by society and usually by law, that lets a person live with dignity and freedom and places a duty on others.\n2. **Natural rights** are said to be held by nature; Locke is linked with life, liberty and property.\n3. **Human rights** belong to all persons because they are human; a United Nations declaration of 1948 is the best-known statement.\n4. **Legal rights** are those that the law recognises and the state protects.\n5. Constitutions often list legal rights, as the Indian Constitution does in its Fundamental Rights.',
  sol: 'Meaning and three sources.',
  scheme: [['Meaning of a right', 1], ['Natural rights', 1], ['Human rights', 1], ['Legal rights', 1], ['Constitutions list legal rights, with an example', 1]],
}));
Q('l_kinds', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the kinds of rights, with an example of each, and mention two newer claims.',
  model: '1. **Political rights** let people take part in government, for instance by voting, standing for office and forming parties.\n2. **Civil liberties** protect personal freedom, such as speaking freely and receiving a fair trial.\n3. **Economic rights** secure a livelihood, such as basic needs and a minimum wage.\n4. **Cultural rights** protect a community\'s language and culture, including schooling in the mother tongue.\n5. Newer claims, such as a **clean environment** and **privacy**, are increasingly recognised as rights.',
  sol: 'Four kinds and newer claims.',
  scheme: [['Political rights with example', 1], ['Civil liberties with example', 1], ['Economic rights with example', 1], ['Cultural rights with example', 1], ['Two newer claims', 1]],
}));
Q('l_state_resp', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain how rights place duties on the state and what responsibilities individuals have.',
  model: '1. A right is a claim, so it places a **duty on the state**.\n2. The state must **act**, by providing conditions such as schools and clinics.\n3. The state must **refrain** from violating rights, for example by not arresting without lawful reason.\n4. Individuals must **respect the rights of others** and balance their rights when these clash.\n5. They should **care for shared goods** such as the environment.',
  sol: 'State duties and individual responsibilities.',
  scheme: [['Rights place duties on the state', 1], ['Duty to act', 1], ['Duty to refrain', 1], ['Respect and balance rights of others', 1], ['Care for shared goods', 1]],
}));
Q('l_clash_limits', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Rights are not absolute. Explain this with an imagined clash of rights and the idea of reasonable limits.',
  model: '1. Rights are **not absolute**, because using a right can harm others.\n2. Imagine a neighbour in Pelham whose **loudspeaker** uses his freedom of expression and a student who needs **quiet** to study.\n3. Each claim is valid, but neither can be used without limit.\n4. A **reasonable limit**, such as fixed hours or lower volume, **balances** the two.\n5. A limit is reasonable if it protects others and the common good, applies to all and is announced.',
  sol: 'Not absolute, an example clash, balance, what makes a limit reasonable.',
  scheme: [['Rights are not absolute, with a reason', 1], ['An imagined clash', 1], ['Both claims valid but limited', 1], ['A balancing limit', 1], ['What makes a limit reasonable', 1]],
}));
Q('l_wantright', long({
  t: 1, d: 4, c: 'application', marks: 5, wl: L5,
  stem: 'In the imagined town of Quillon, three claims are made: (i) a sweet shop owner asks for free sugar every week; (ii) villagers ask for clean drinking water; (iii) one family asks that only its children may enter the town library. Apply the test of a right to each claim.',
  model: '1. A right is **needed for a dignified life**, accepted as **justified**, and can apply **equally to all**.\n2. **Free sugar** is a want: it is not necessary for dignity and few could justify it.\n3. **Clean drinking water** is necessary for health and dignity, can apply to all, and can be accepted as a right.\n4. The **library claim** asks for a privilege for one family, so it cannot apply equally to all.\n5. So only the claim to clean water passes the test.',
  sol: 'The three-part test applied to three claims.',
  scheme: [['The test stated', 1], ['Free sugar judged a want', 1], ['Clean water passes the test', 1], ['Library claim fails equal application', 1], ['A clear conclusion', 1]],
}));
Q('l_evaluate', long({
  t: [1, 2], d: 5, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate the statement: rights can be enjoyed only when people also accept responsibilities. Use the idea of duties, the clash of rights and reasonable limits.',
  model: '1. A right is a **claim on others**, so each right carries **duties**, for the state and for individuals.\n2. If each person uses rights without respecting **others\' rights**, rights clash and few can be enjoyed.\n3. Individuals should **balance** clashing rights and **care for shared goods**.\n4. **Reasonable limits** protect others and the common good, though citizens should watch that limits stay reasonable.\n5. So the statement is largely sound: rights and responsibilities support each other, but the state also has duties.',
  sol: 'A weighed answer on rights and responsibilities.',
  scheme: [['Rights carry duties', 1], ['Clashes when others\' rights are ignored', 1], ['Balancing and shared goods', 1], ['Reasonable limits and vigilance', 1], ['A reasoned judgement', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_debate', caseQ({
  t: [1, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the debate extract and answer the questions that follow. *(An imagined extract written by SOYL for practice; Pelham School and the speakers are not real.)*',
  passage: '**From a school debate at Pelham School, imagined**\n\nThe motion: "Every pupil has a right to a personal laptop." Anika said that without one she cannot finish her homework. Bruno replied that a laptop is useful but is a want, since the school computer room can meet the need, and not every school can pay for a laptop for every pupil. Chetan said that clean drinking water at school is different: every child needs it for health, and it can be given to all. The moderator reminded the speakers that using a claim must not harm the claims of others.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which speaker argues that the laptop claim is a want and not a right?', model: '**Bruno**.', sol: 'Bruno calls it a want.', scheme: [['Bruno', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which claim in the extract comes closest to meeting the test of a right, and why in one phrase?', model: '**Clean drinking water**, since it is needed for health and can be given to all.', sol: 'Needed and universal.', scheme: [['Clean drinking water with a reason', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Using the test of a right, explain why the laptop claim is treated as a want by Bruno.', model: 'A right must be **necessary for a dignified life** and apply **equally to all**. Bruno argues that the computer room can meet the need and not every school can supply laptops for all, so the claim **fails** the test and remains a want.', sol: 'The test applied.', scheme: [['The test of necessity and equal application', 1], ['Applied to the laptop claim', 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Suggest one way in which the school could meet Anika\'s need without calling a laptop a right, and give a reason.', model: 'The school could keep the **computer room** open longer or **lend** laptops for homework. This meets her need within the school\'s means and does not **harm the claims of others**.', sol: 'A practical arrangement.', scheme: [['A practical arrangement', 1], ['A reason linked to fairness or limits', 1]] }),
    ]),
  ],
}));
Q('c_news', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; Orsolin, the Harvan people and the town are not real.)*',
  passage: '**From the Orsolin Courier, imagined**\n\nResidents of Larne town have asked the Orsolin legislature to recognise a right to breathe clean air, after smoke from a nearby kiln made many children ill. Separately, leaders of the Harvan forest people have asked that the right of indigenous peoples to remain on their ancestral lands be written into law. A parents\' group also wants a law that protects the privacy of children\'s records held by schools. Some legislators say that each claim needs study; others say the time has come to act.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name the newer claim that the residents of Larne town make.', model: 'The claim to a **clean environment** (clean air).', sol: 'Clean air.', scheme: [['Clean environment', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which claim in the report concerns the rights of indigenous peoples?', model: 'The claim of the **Harvan forest people** to remain on their ancestral lands.', sol: 'The Harvan claim.', scheme: [['The Harvan forest people\'s claim', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why can the three claims be described as claims that are increasingly recognised rather than rights settled everywhere?', model: 'Each claim arises from **new needs** or concerns, and legislators in the report are still discussing them. Countries recognise such claims at **different times**, so they are increasingly recognised but not yet settled everywhere.', sol: 'New needs, uneven recognition.', scheme: [['They arise from new needs and are still debated', 1], ['Recognition differs across countries', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): If the legislature passes a law on the claim of Larne, which source of rights would the claim then become, and why would that matter?', model: 'The claim would become a **legal right**, since it is recognised and protected by law. That matters because the **state** and courts can then **enforce** it against those who pollute.', sol: 'Legal right and enforcement.', scheme: [['A legal right', 1], ['Enforcement by the state and courts', 1]] }),
    ]),
  ],
}));
Q('c_table', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(An imagined table written by SOYL for practice; Marenia and the claims are not real.)*',
  passage: '**Four claims presented to the Marenia Citizens\' Forum, imagined**\n\n| Claim | Who makes it |\n|---|---|\n| 1. To stand for election to the town council | A group of residents |\n| 2. To a minimum daily wage for loom workers | A workers\' association |\n| 3. To schooling in the Veshti language | A minority community |\n| 4. To the best seat in every cinema hall for one family | A wealthy family |',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which kind of right is claim 1?', model: 'A **political right**.', sol: 'Standing for election.', scheme: [['Political right', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which claim is a cultural right?', model: '**Claim 3**, schooling in the Veshti language.', sol: 'Language and culture.', scheme: [['Claim 3', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why claim 4 is not a right.', model: 'A right must be **necessary for a dignified life** and able to apply **equally to all**. The best seat in every cinema for one family is a privilege and a want, so it **fails** both tests.', sol: 'A privilege, not a right.', scheme: [['Not necessary for dignity', 1], ['Cannot apply equally to all', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Name the kind of right in claim 2 and give one reason why it is justified.', model: 'Claim 2 is an **economic right**. A minimum wage is justified because workers need a **secure livelihood** and basic needs to live with dignity.', sol: 'Economic right with a reason.', scheme: [['Economic right', 1], ['A reason linked to livelihood or dignity', 1]] }),
    ]),
  ],
}));
Q('c_letter', caseQ({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; Odrin, Esha and Dev are not real.)*',
  passage: '**Imagined letter to the Odrin Gazette**\n\nI am a student preparing for an examination. Every night Dev, who runs a sound hire shop beside our house, tests loudspeakers until midnight. He says he has a freedom to do his work and to express himself. I say that I have a claim to rest and to study. A neighbour suggests that testing be allowed until eight in the evening, and that a notice be put up. Dev says he fears losing customers. I think both of us should give a little.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which responsibility is the writer asking Dev to follow?', model: 'To **respect the rights of others** (the student\'s rest and study).', sol: 'Respecting others\' rights.', scheme: [['Respect the rights of others', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which idea does the neighbour\'s suggestion of testing only until eight in the evening illustrate?', model: 'A **reasonable limit**, or balancing of rights.', sol: 'A reasonable limit.', scheme: [['Reasonable limit or balance', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Is the neighbour\'s suggestion a reasonable way to balance the two claims? Give two reasons.', model: 'Yes, it is largely reasonable. It lets Dev **keep his trade** during the day and evening, and it gives the student **quiet** at night. It is **announced** by a notice and applies to the whole lane.', sol: 'Judgement with two reasons.', scheme: [['A judgement', 1], ['Two reasons', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Dev says that a limit may cost him customers. How can this concern be weighed against the student\'s claim?', model: 'Dev\'s concern is real, so a limit should be **no wider than needed**. The student\'s claim to **rest and study** is also real. Fixed hours and a lower volume can protect both, and the reasons should be **explained to both sides**.', sol: 'Weighing both claims.', scheme: [['Dev\'s concern acknowledged', 1], ['A limit that protects both, with reasons', 1]] }),
    ]),
  ],
}));
Q('c_panchayat', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the meeting note and answer the questions that follow. *(An imagined note written by SOYL for practice; the hamlet of Dunmere, its meeting and the people are not real.)*',
  passage: '**Notes of the Dunmere village meeting, imagined**\n\nThe village stream is the only source of water for washing and for the cattle. Several households have begun to throw waste into the water, saying that they are free to use what they own. Others reply that the stream belongs to all. The headwoman proposes a rule that waste be taken to a pit outside the village, and asks the district office to provide the pit and a collection cart.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which responsibility of individuals do the households overlook?', model: 'Caring for **shared goods** such as the environment.', sol: 'Shared goods.', scheme: [['Shared goods', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which request in the note asks the state to act?', model: 'The request that the **district office provide the pit and a collection cart**.', sol: 'The state is asked to provide conditions.', scheme: [['The district office providing the pit and cart', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the headwoman\'s proposal balances the households\' claim with the needs of others.', model: 'The households claim freedom to use what they own, but dumping harms **everyone who depends on the stream**. Moving waste to a **pit** is a reasonable limit that protects the shared good while the households keep their freedom.', sol: 'A reasonable limit.', scheme: [['The households\' claim and its harm to others', 1], ['The proposal as a reasonable limit', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Should the duty to keep the stream clean rest on the village, the state, or both? Give reasons.', model: 'On **both**. Villagers have a responsibility to **care for shared goods** and not to dump waste. The state has a duty to **act** by providing the pit and cart, since families alone may lack the means.', sol: 'Both, with reasons.', scheme: [['Individuals care for shared goods', 1], ['The state provides conditions', 1]] }),
    ]),
  ],
}));
