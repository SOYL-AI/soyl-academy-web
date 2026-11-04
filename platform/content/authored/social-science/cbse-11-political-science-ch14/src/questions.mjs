// CBSE 11 Political Science, ch14 Social Justice: question bank. Every passage (committee note, island report, letter,
// newspaper column, table) is written by SOYL and labelled as imagined; the island of Tamberlay, the towns Norvale,
// Kesterby, Hollin and Brindle, the Vellmark Scholarship Committee and all people in scenarios are imagined. No NCERT
// text, boxed source, cartoon, quotation of any thinker, court judgment or board/sample-paper item is reused (D-036).
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01: what justice means
Q('m_just_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In political theory, the standard meaning of justice is',
  opts: ['giving each person what is due to him or her, by fair and accepted principles', 'giving every person exactly the same amount of everything', 'giving more to those who already have more', 'giving whatever the ruler decides'],
  sol: 'Justice is about giving each person his or her due, treating people fairly by accepted principles. Identical shares for all, extra for the already well off and a ruler\'s whim are not what the definition describes.',
}));
Q('m_traditions', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A teacher in the imagined town of Hollin tells her class that ideas of justice are very old and found in many traditions. Which list gives correct examples of such traditions or thinkers?',
  opts: ['Dharma in ancient Indian thought, Confucius on just rulers, and Plato\'s Republic', 'Only modern constitutions written after 1900', 'Only the ideas of a single thinker of the twentieth century', 'None, since justice was never discussed before modern times'],
  sol: 'Dharma, Confucius and Plato\'s Republic are all long-standing treatments of justice. Justice was discussed long before the twentieth century and not by one thinker alone.',
}));
Q('m_kant', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The German philosopher Immanuel Kant is linked in this chapter with the idea that',
  opts: ['every person has dignity and deserves equal consideration', 'only citizens of large states have rights', 'dignity depends on a person\'s wealth', 'justice is the interest of the strong'],
  sol: 'Kant held that every person has dignity and is owed equal consideration. Dignity does not depend on wealth or on the size of one\'s state, and justice as the interest of the strong is a view that Kant did not share.',
}));
Q('m_p_names', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which set names the three principles of justice described in this chapter?',
  opts: ['Equal treatment for equals, proportionate justice, and recognition of special needs', 'Majority rule, seniority, and inheritance', 'Equal pay, equal wealth, and equal power', 'Tradition, custom, and fashion'],
  sol: 'The three principles are equal treatment for equals, proportionate justice and recognition of special needs. The other sets list ideas that are not the three principles.',
}));
Q('m_p_equal_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Brindle Library charges a lower membership fee to readers of one religion than to readers of another, though all use the same books in the same way. Which principle of justice does this break?',
  opts: ['Equal treatment for equals, since like persons are treated unlike', 'Proportionate justice, since effort is unrewarded', 'Recognition of special needs, since disability is ignored', 'None, since libraries may charge what they like'],
  sol: 'Readers in the same position are being treated differently because of religion, which breaks equal treatment for equals. No effort or disability is involved, and a free choice of fee does not remove the principle.',
}));
Q('m_p_prop_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined town of Norvale, two workers on a building site get the same daily pay, though one works a double shift of heavy lifting and the other sits and watches. Which principle of justice is most clearly neglected?',
  opts: ['Proportionate justice: reward in proportion to effort and the nature of the work', 'Equal treatment for equals', 'Recognition of special needs', 'The veil of ignorance'],
  sol: 'Equal pay for very unequal effort ignores proportionate justice. The two workers are not equals in effort, no special need is described, and the veil of ignorance is a method of choosing rules and not a principle of this kind.',
}));
Q('m_p_special_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Hollin Exam Board gives a wheelchair user extra time and a ground-floor room for an examination. Which principle of justice supports this arrangement?',
  opts: ['Recognition of special needs, since a disadvantage may call for special help', 'Proportionate justice, since she works harder', 'Rule by the majority', 'Equal treatment, which forbids any difference at all'],
  sol: 'A disadvantage such as a disability may call for special help so that the person can take part fairly. The case is not about extra effort, majority rule, or a ban on all differences.',
}));
Q('m_p_equal_gender', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under the principle of equal treatment for equals, which of these would a just society avoid?',
  opts: ['Refusing a job to a qualified applicant only because of her gender', 'Rewarding a faster runner with the prize', 'Giving a ramp to a person who cannot climb steps', 'Paying more to a person who works longer hours'],
  sol: 'Rejecting a qualified person because of gender is discrimination against an equal. Rewarding a faster runner and paying for longer hours reflect proportionate justice, and a ramp reflects special needs.',
}));
Q('m_conflict_prin', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'The imagined Vellmark Scholarship Committee has one seat. Asha scored highest in an entrance test, while Dev scored a little lower but has walked four hours each day to study without a school nearby. Giving the seat to Asha stresses one principle, while giving it to Dev stresses another. What does the case best show?',
  opts: ['The three principles can pull in different directions, so a society must balance them', 'Justice has only one correct principle', 'Special needs never matter in a selection', 'Equal treatment is the same as proportionate justice'],
  sol: 'Asha\'s claim rests on reward in proportion to performance, and Dev\'s rests on disadvantage, so the principles can conflict. A society then balances them with reasons. Justice is not a single principle, and the two are not identical.',
}));
Q('m_dist_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Social justice is concerned with',
  opts: ['the fair distribution of goods and opportunities in a society', 'the number of seats in a legislature only', 'the weather and the seasons', 'the number of roads in a state'],
  sol: 'Social justice includes the fair distribution of goods and opportunities among members of a society. The other options are not what the term means.',
}));
Q('m_policies', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Land reforms and reserved places in education and jobs are often given as examples of',
  opts: ['policies that a society may choose in order to change how goods and opportunities are distributed', 'rules that every society is bound to adopt', 'ideas that have no link with distribution', 'measures that all thinkers regard in the same way'],
  sol: 'These are policies a society may choose for the distribution of land or opportunities, and people may hold different views on them. No society is bound to adopt them, they are linked with distribution, and thinkers do not all see them alike.',
}));
Q('m_policy_app', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'The imagined island of Tamberlay has a few families who hold most of its farmland, while many families farm tiny plots. A council proposes to buy some large holdings and give plots to landless families. Another councillor says the proposal is unfair to those who lose land. Which is the best description of the situation?',
  opts: ['It is a debate about how to distribute a good fairly, in which each side gives reasons', 'It has nothing to do with social justice', 'It has one answer on which all must agree', 'It shows that distribution is never a concern of justice'],
  sol: 'The question is how a good (land) should be distributed, and both sides give reasons about fairness, so it is a debate within social justice. It is linked with justice, and it does not have a single answer imposed on all.',
}));

// ================================================================ t01: Rawls
Q('m_rawls_book', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The book A Theory of Justice (1971) was written by',
  opts: ['John Rawls', 'John Stuart Mill', 'Isaiah Berlin', 'Immanuel Kant'],
  sol: 'John Rawls wrote A Theory of Justice in 1971. Mill wrote On Liberty, Berlin is linked with negative and positive liberty, and Kant is linked with the idea of human dignity.',
}));
Q('m_veil_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In Rawls\' thought experiment, the veil of ignorance means that people who choose the rules of a society',
  opts: ['do not know what place they will have in that society', 'know exactly how rich they will be', 'are all rulers of the society', 'must choose the rules of their own religion'],
  sol: 'Behind the veil, people choose rules without knowing their own future position. Knowing one\'s wealth or ruling status would defeat the purpose of the veil, and religion is not the point.',
}));
Q('m_orig_pos', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'What is the purpose of the original position in Rawls\' argument?',
  opts: ['To imagine a fair starting point where rules are chosen impartially', 'To name the first ruler of a country', 'To list the oldest laws in history', 'To argue that all people must be equally rich'],
  sol: 'The original position is an imagined starting point at which people choose rules without knowing their own place, so that the choice is impartial. It is not about rulers, old laws or equal riches.',
}));
Q('m_veil_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Before settling on Tamberlay, the imagined islanders agree to decide the rules for sharing fish and land before anyone learns whether he or she will be a boat owner, a net maker or a child of a poor family. This arrangement most closely matches',
  opts: ['Rawls\' original position behind a veil of ignorance', 'a decision by the richest family', 'a system in which each person votes for his or her own benefit alone', 'rule by the oldest islander'],
  sol: 'Choosing the rules before knowing one\'s own place is the idea of the veil of ignorance. A decision by the richest, a vote on known self-interest, and rule by the oldest do not hide a person\'s future position.',
}));
Q('m_veil_why', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Why might people who do not know their future place in society choose fairer rules, according to Rawls?',
  opts: ['Because they might end up in any position, including the worst-off', 'Because they all become kind by nature', 'Because they dislike all rules', 'Because the richest people make the rules'],
  sol: 'Not knowing where one will end up, a rational person would avoid rules that harm those at the bottom, since he or she might be one of them. The argument does not rest on kindness or on rules made by the rich.',
}));
Q('m_diff_app', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'Behind the veil, the islanders of Tamberlay compare two rule sets. Under Rule Set A, the poorest fifth of islanders gets 20 units of income and the richest fifth gets 130. Under Rule Set B, the poorest fifth gets 40 and the richest fifth gets 90. Which rule set would people reasoning as Rawls describes tend to choose, and why?',
  opts: ['Rule Set B, because it leaves the worst-off group better off', 'Rule Set A, because the richest do better', 'Either, since the poorest fifth is irrelevant', 'Neither, because Rawls rejects every rule'],
  sol: 'People who might land in the worst-off group would prefer the rule set that makes that group as well off as possible, which is Rule Set B (40 against 20). The richest group\'s gain in Rule Set A is not their concern.',
}));
Q('m_rawls_notaltruism', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'A student in the imagined Kesterby Academy says that Rawls\' argument works only if people behind the veil are generous. Which reply is correct?',
  opts: ['No, the argument rests on impartial choice and rational self-interest, not on altruism', 'Yes, generosity is the starting point of the argument', 'No, because Rawls thinks every person is a ruler', 'Yes, because the veil makes everyone kind'],
  sol: 'The fairness of the rules comes from the impartial choice made without knowing one\'s own future position, not from kindness. Generosity is not assumed, and the veil does not make people rulers.',
}));

// ================================================================ t02: pursuing social justice
Q('m_needs_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of the following is listed among minimum basic needs that a just society should ensure for all?',
  opts: ['Adequate nutrition and clean drinking water', 'A luxury car for each household', 'Free entry to every stadium', 'A holiday abroad each year'],
  sol: 'Nutrition, housing, clean drinking water, education and a minimum wage are among the basic conditions for a healthy and secure life. Luxury goods and leisure are not basic needs.',
}));
Q('m_needs_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the imagined town of Norvale, many families drink from a polluted pond and cannot afford enough food. Which statement best fits the idea of minimum basic needs?',
  opts: ['A just society should see that all have the basic conditions for a healthy life, such as clean water and nutrition', 'Such matters belong to no one', 'Only the rich have needs', 'The families should be ignored until the pond dries'],
  sol: 'Clean water and adequate nutrition are basic conditions for a healthy and secure life that a just society should ensure. The other statements deny that need or put it off.',
}));
Q('m_market_view', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is an argument commonly made by supporters of free markets?',
  opts: ['Open competition rewards talent and effort and gives people choice', 'Markets always favour the poor', 'Government should fix every price', 'Competition harms everyone equally'],
  sol: 'Supporters hold that competition rewards talent and effort and offers choice, and that minimal state intervention serves people well. Claiming that markets always favour the poor or that the state should fix every price is not their argument.',
}));
Q('m_state_view', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is an argument commonly made by those who favour state intervention?',
  opts: ['Markets favour those already advantaged, so the state must ensure basic needs and equal opportunity', 'The state has no role in education', 'Competition always removes poverty on its own', 'Public services never help anyone'],
  sol: 'Supporters of intervention hold that markets may favour the already advantaged and that public services can secure basic needs and equal opportunity. The other statements are claims they would reject.',
}));
Q('m_market_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Councillor Ravi of the imagined town of Norvale says that the town should let bakers, tailors and carters compete freely, because competition rewards effort and gives buyers a choice. His view is closest to',
  opts: ['the argument for free markets with minimal intervention', 'the argument for the state to run every shop', 'the view that effort never matters', 'the view that choice is harmful'],
  sol: 'Reward for effort, competition and choice are the central claims of the free market view. State management of every shop and the rejection of effort or choice are different positions.',
}));
Q('m_state_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Councillor Meera of the imagined town of Kesterby says that poor children there cannot compete fairly with others unless the town runs free schools and clinics. Her view is closest to',
  opts: ['the argument for state intervention through public services', 'the argument that the market will always supply schools', 'the argument that nothing can help', 'the argument for no public service'],
  sol: 'Providing free schools and clinics so that all have a fair chance is the state intervention view. The other options reject public provision or say that nothing helps.',
}));
Q('m_mixed', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'The imagined island of Tamberlay lets private traders sell goods freely, but it also runs a public water supply and a school for every village. How is this arrangement best described?',
  opts: ['A combination of markets and state action, as many societies adopt', 'A pure free market with no state role', 'A system in which the state controls everything', 'A system with neither market nor state'],
  sol: 'Free trade alongside public water and schools combines market and state, as many societies do. It is not a pure market, nor state control of all things.',
}));
Q('m_minwage_app', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'The imagined Hollin Council sets a minimum daily wage for workers in its brick kilns. A kiln owner says this interferes with free bargaining, while a union leader says that workers with no choice would otherwise be paid too little for a secure life. This disagreement is best described as',
  opts: ['a debate between a market view and a state intervention view', 'a case on which all thinkers agree', 'a matter outside social justice', 'an example of the veil of ignorance'],
  sol: 'The owner stresses free bargaining and the union leader stresses securing a basic need through state action, which is the market versus intervention debate. The disagreement is not outside social justice, and no veil is involved.',
}));
Q('m_both_views', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'A student of the imagined Brindle School must write on markets and state intervention. Which approach best fits a balanced answer?',
  opts: ['State the reasons of both views and then give a reasoned judgement', 'Praise one view and ignore the other', 'List only names of thinkers', 'Say that all societies must adopt the same approach'],
  sol: 'A balanced answer sets out each view with its reasons and then judges. Praising one side, listing names or saying that all must follow a single approach is not balanced.',
}));
Q('m_balance', mcq({
  t: [1, 2], d: 4, c: 'evaluation',
  stem: 'The imagined Vellmark Committee gives some scholarships by test score and some by family hardship. Which statement best evaluates this mixed approach?',
  opts: ['It tries to balance reward for performance with recognition of disadvantage, though people may disagree on the right mix', 'It is unjust because any mix is wrong', 'It shows that justice has no principles', 'It applies the same principle to everyone'],
  sol: 'A mix of score-based and need-based awards weighs proportionate justice and special needs together, and reasonable people may differ over the proportion. It is not wrong in itself, and it does not show a lack of principles or a single principle.',
}));
Q('m_proport_conflict_app', mcq({
  t: [1, 2], d: 4, c: 'analysis',
  stem: 'In the imagined town of Norvale, a free market sets the price of grain. In a drought the price doubles and poor families cannot afford enough. One thinker says the market should be left alone, another says the state should supply grain at a fixed low price to the poor. What is the best conclusion?',
  opts: ['The case sets the reasons for free markets against those for state action to secure a basic need', 'Only the first thinker may speak', 'The case has no link with basic needs', 'Both thinkers want the same thing in the same way'],
  sol: 'One stresses market operation and the other stresses securing a basic need through the state, so both views are in play. The case concerns basic needs, and the thinkers differ in approach.',
}));

// ================================================================ assertion-reason
Q('ar_veil', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Rawls holds that rules chosen behind a veil of ignorance are likely to be fair.',
  r: 'People who do not know their future place in society cannot shape the rules to favour their own position.',
  sol: 'Both are true, and R explains A: when no one knows where he or she will stand, the rules cannot be tilted toward a known position, which makes them impartial.',
}));
Q('ar_just_def', ar({
  t: 1, d: 2, c: 'recall', verdict: 'A-true-R-false',
  a: 'Justice is commonly defined as giving each person his or her due.',
  r: 'Justice requires that every person receive exactly the same reward whatever the effort.',
  sol: 'A is true. R is false: proportionate justice holds that reward should reflect effort, skill and the nature of the work, so identical rewards are not required.',
}));
Q('ar_prop', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Recognition of special needs is one of the three principles of justice.',
  r: 'Proportionate justice means rewarding people in proportion to their effort and skill.',
  sol: 'Both are true, but R does not explain A: R describes a different principle, and special needs are recognised because of disadvantage, not because of effort.',
}));
Q('ar_altruism', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'In Rawls\' argument, fair rules come mainly from the kindness of the people who choose them.',
  r: 'In his argument, fairness comes from an impartial choice made without knowledge of one\'s own future position.',
  sol: 'A is false: the argument does not depend on kindness. R is true and gives the actual source of fairness, so it contradicts A.',
}));
Q('ar_market', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Some supporters of free markets favour minimal state intervention.',
  r: 'They argue that open competition rewards talent and effort and offers people choice.',
  sol: 'Both are true, and R explains A: if competition itself rewards effort and offers choice, there is less reason for the state to intervene.',
}));
Q('ar_state', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'Some thinkers argue that the state must provide public services for basic needs.',
  r: 'They hold that markets may favour those who are already advantaged, leaving others without the conditions for a secure life.',
  sol: 'Both are true, and R explains A: if markets can favour the already advantaged, public services become a way to secure basic needs and equal opportunity.',
}));

// ================================================================ true-false, fill-blank, match, ordering
Q('tf_prop', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Proportionate justice holds that a society should pay the same wage to every person, whatever work is done and however much effort is made.',
  sol: 'Proportionate justice holds that rewards should be in proportion to effort, skill and the nature of the work, so it does not support identical pay for all.',
}));
Q('tf_equals', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: 'Equal treatment for equals means that people should not be discriminated against on grounds such as caste, religion or gender.',
  sol: 'Equal treatment for equals requires equal rights and no discrimination on such grounds.',
}));
Q('tf_veil', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: 'In the veil of ignorance argument, the people who choose the rules are told in advance exactly which group of society they will belong to.',
  sol: 'They are not told. The veil means that they choose without knowing their own future place, and this is why the choice is impartial.',
}));
Q('tf_market', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'Many societies combine some features of free markets with some state action, instead of using only one approach.',
  sol: 'Many societies combine the two, using markets for much of the economy and public services for basic needs.',
}));
Q('fb_just', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Justice means giving each person his or her ___.',
  acc: [['due']],
  sol: 'Justice means giving each person what is due to him or her.',
}));
Q('fb_veil', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'John Rawls\' idea that people choose rules without knowing their own future place is called the veil of ___, and the imagined starting point is the ___ position.',
  acc: [['ignorance'], ['original']],
  sol: 'The idea is the veil of ignorance, and the imagined starting point is the original position.',
}));
Q('fb_needs', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'A just society should ensure that everyone has the minimum basic ___ for a healthy and secure life.',
  acc: [['needs', 'conditions']],
  sol: 'Minimum basic needs, such as nutrition, housing and clean drinking water, should be ensured for all.',
}));
Q('mt_principles', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each principle of justice with the situation in the imagined town of Hollin that it best supports.',
  pairs: [
    ['Equal treatment for equals', 'Every qualified applicant is judged by the same rules whatever his or her caste or gender'],
    ['Proportionate justice', 'A mason who builds three walls is paid more than one who builds one wall'],
    ['Recognition of special needs', 'A child who cannot see is given books in a form she can read'],
    ['Veil of ignorance', 'Rules are chosen by people who do not know their own future place'],
  ],
  sol: 'Equal rules for all qualified applicants match equal treatment, more pay for more work matches proportion, books for a child who cannot see match special needs, and choosing rules without knowing one\'s place is the veil.',
}));
Q('mt_views', match({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Match each imagined statement from a debate in Kesterby with the position it expresses.',
  pairs: [
    ['Let sellers compete, and the best will win custom', 'Free market view'],
    ['The town must run a school for children who cannot pay', 'State intervention view'],
    ['Competition rewards effort, but a public water supply serves the basic need of all', 'Combination of the two'],
    ['A person must be able to afford food before any choice has meaning', 'Basic needs argument'],
  ],
  sol: 'Competition for custom is the free market view, a free school is state intervention, competition along with public water is a combination, and food before choice is the basic needs argument.',
}));
Q('ord_veil', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the steps of the veil of ignorance argument as the imagined islanders of Tamberlay might reason.',
  items: [
    'Imagine that all people are to choose the rules of society',
    'Suppose that no one knows what place he or she will hold in it',
    'Each person asks which rules would be acceptable whichever place he or she gets',
    'Rules that leave the worst-off as well off as possible are likely to be chosen',
  ],
  sol: 'The thought experiment begins with a choice of rules, adds the veil, asks which rules one would accept from any place, and ends with rules that serve the worst-off well.',
}));
Q('ord_scholar', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these steps in a sensible order for a committee in the imagined town of Brindle that must award one scholarship fairly.',
  items: [
    'State the principles that the committee will apply',
    'Check that all applicants who are equals are treated alike',
    'Consider the effort and performance of each applicant',
    'Consider any special disadvantage and give reasons for the final choice',
  ],
  sol: 'The committee first states its principles, then checks equal treatment, then weighs performance, then considers special need and gives its reasons.',
}));

// ================================================================ short answers (2 marks)
Q('s_just_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is meant by justice? Name one tradition or thinker that has discussed it.',
  model: '**Justice** means giving each person what is **due** to him or her, treating people fairly by accepted principles. It has been discussed in many traditions, for example **dharma** in ancient Indian thought or Plato\'s **Republic**.',
  sol: 'Definition and a tradition.',
  scheme: [['Giving each person his or her due, fairly', 1], ['A tradition or thinker named', 1]],
}));
Q('s_principles_name', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the three principles of justice and state any one of them briefly.',
  model: 'The three principles are **equal treatment for equals**, **proportionate justice** and **recognition of special needs**. For example, proportionate justice holds that rewards should be in **proportion** to effort and skill.',
  sol: 'Three names, one explained.',
  scheme: [['Three principles named', 1], ['One stated briefly', 1]],
}));
Q('s_special', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In the imagined town of Hollin, a village school builds a ramp and gives a blind pupil audio books. Which principle of justice does this follow, and why?',
  model: 'It follows **recognition of special needs**. A person with a disadvantage, such as a disability, may need **special treatment** so that he or she can take part on fair terms with others.',
  sol: 'Principle and reason.',
  scheme: [['Recognition of special needs', 1], ['Disadvantage may need special help to take part fairly', 1]],
}));
Q('s_veil', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain in two sentences what Rawls meant by the veil of ignorance.',
  model: 'The **veil of ignorance** is an imagined situation in which people choose the rules of society **without knowing** what place they will hold in it. Because they might be anyone, they must choose rules that are **fair** to all.',
  sol: 'Idea and its effect.',
  scheme: [['Choosing rules without knowing one\'s future place', 1], ['The result is fair rules, since anyone could be affected', 1]],
}));
Q('s_diff', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'According to Rawls, what kind of rules would rational people behind the veil choose, and why?',
  model: 'They would choose rules that leave the **worst-off** as well off as possible. Since a person might end up in the **worst position**, each would want it to be as good as possible.',
  sol: 'Rules for the worst-off, with the reason.',
  scheme: [['Rules that make the worst-off as well off as possible', 1], ['Each might end up in the worst position', 1]],
}));
Q('s_dist', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does social justice say about the distribution of goods and opportunities? Give one example of a policy a society may choose.',
  model: 'Social justice is concerned with the **fair distribution** of goods and opportunities in a society. A society may choose policies such as **land reforms** or reserved places in education and jobs.',
  sol: 'Fair distribution and an example.',
  scheme: [['Fair distribution of goods and opportunities', 1], ['An example of a policy a society may choose', 1]],
}));
Q('s_needs', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What are minimum basic needs? Name any three.',
  model: '**Minimum basic needs** are the basic conditions for a healthy and secure life that a just society should ensure for all. Examples are **adequate nutrition**, **housing**, **clean drinking water**, education and a minimum wage.',
  sol: 'Meaning and three examples.',
  scheme: [['Basic conditions for a healthy, secure life', 1], ['Three examples', 1]],
}));
Q('s_market', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two reasons given by supporters of free markets.',
  model: 'Supporters argue that **open competition** rewards talent and effort. They also say that markets give people **choice** and generally serve people well, so the state should intervene only a little.',
  sol: 'Two reasons.',
  scheme: [['Competition rewards talent and effort', 1], ['Choice, and generally serving people well', 1]],
}));
Q('s_state', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why do some thinkers argue that the state must intervene to pursue social justice?',
  model: 'They argue that **markets favour** those who are already advantaged. So the state must ensure **basic needs** and **equal opportunity** through public services such as schools and clinics.',
  sol: 'Markets may favour the advantaged; the state secures needs.',
  scheme: [['Markets may favour the already advantaged', 1], ['The state should ensure basic needs and equal opportunity through public services', 1]],
}));
Q('s_orig', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Two islanders of imagined Tamberlay decide the rules of fishing before they know whether they will own boats or not. Name the idea and say why such a choice may be fair.',
  model: 'This is the **original position behind a veil of ignorance**. Each person might own a boat or not, so each must choose rules that are **fair** to both, and the choice is **impartial**.',
  sol: 'Idea and reason.',
  scheme: [['Original position behind a veil of ignorance', 1], ['Impartial choice because one\'s place is unknown', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_conflict', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain, with an example, how the three principles of justice can conflict and how a society may balance them.',
  model: 'The principles may conflict. A **reward in proportion to performance** may favour the best scorer, while **special needs** may favour a person with a disadvantage, and **equal treatment** asks that equals be treated alike. A society may **balance** them by stating its principles, giving reasons, and using a mix, such as awards for both merit and hardship.',
  sol: 'Conflict, example, balance.',
  scheme: [['Principles may conflict, with an example', 1], ['Equal treatment also in play', 1], ['A society balances them with reasons or a mix', 1]],
}));
Q('s3_veil_app', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined islanders of Tamberlay compare two rule sets for sharing income. Explain why people behind a veil of ignorance might prefer the set that gives the poorest group 40 units over the one that gives it 20, even if the richest group gets less.',
  model: 'Behind the **veil**, no one knows his or her place, so each might belong to the **poorest group**. A rational person would therefore prefer the rule set that makes that group **better off**, namely 40 rather than 20, even if the **richest group** receives less. The choice rests on impartial reasoning.',
  sol: 'Veil, worst-off, rational preference.',
  scheme: [['No one knows his or her place', 1], ['Each might be in the poorest group, so prefer 40 to 20', 1], ['Impartial reasoning, not generosity', 1]],
}));
Q('s3_rawls_notalt', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Does Rawls\' argument depend on people being generous? Explain.',
  model: 'No. The argument rests on **impartial choice**. People behind the **veil of ignorance** do not know their own future position, so a rational person chooses rules that would be **acceptable from any position**. Fairness comes from the method of choosing and not from **altruism**.',
  sol: 'Fairness from impartiality, not altruism.',
  scheme: [['Answer: no, the argument does not rest on generosity', 1], ['People do not know their future position', 1], ['Fairness arises from impartial choice', 1]],
}));
Q('s3_market_state', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Present the views of supporters of free markets and of state intervention on how to ensure basic needs, without taking a side.',
  model: 'Some argue that **free markets** reward talent and effort and give people choice, with minimal state intervention. Others argue that markets **favour the already advantaged**, so the state must ensure **basic needs** and equal opportunity through public services. Many societies **combine** the two.',
  sol: 'Both views and the combination.',
  scheme: [['Free market view with a reason', 1], ['State intervention view with a reason', 1], ['Many societies combine the two', 1]],
}));
Q('s3_basic_needs', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'In the imagined town of Hollin, many families lack clean water, and school places are few. Explain how this relates to minimum basic needs and suggest one way each of a market view and a state view might respond.',
  model: 'Clean water and **education** are among the **minimum basic needs** that a just society should ensure. A market view might favour **private suppliers** competing to sell water and run schools. A state view might favour a **public water supply** and free schools funded by the town.',
  sol: 'Basic needs and two responses.',
  scheme: [['Water and education as basic needs', 1], ['A market response', 1], ['A state response', 1]],
}));
Q('s3_scholar', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Vellmark Scholarship Committee must choose between a top scorer who is well off and a slightly lower scorer who lives far from any school. Show how the three principles of justice apply.',
  model: '**Equal treatment** asks that both be judged by the same rules. **Proportionate justice** supports the top scorer, since reward follows performance. **Recognition of special needs** supports the other, since distance is a disadvantage. The committee should give **reasons** for how it balances them.',
  sol: 'Three principles applied.',
  scheme: [['Equal treatment applied', 1], ['Proportionate justice and special needs on opposite sides', 1], ['Reasoned balance', 1]],
}));
Q('s3_dist_fair', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain why social justice includes the fair distribution of goods and opportunities, and how land reforms or reservations are treated in such a discussion.',
  model: 'A society has limited **goods and opportunities**, such as land, schooling and jobs, so how they are **distributed** affects people\'s lives. Social justice asks whether that distribution is **fair**. Land reforms and reservations are **policies a society may choose**, and people hold **different views** and give reasons.',
  sol: 'Distribution, fairness, policies as choices.',
  scheme: [['Goods and opportunities are limited and their distribution matters', 1], ['Social justice asks whether the distribution is fair', 1], ['Land reforms and reservations are policies a society may choose; views differ', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_principles', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the three principles of justice, and say how they can conflict.',
  model: '1. **Equal treatment for equals** gives people in like positions the same rights, with no discrimination by caste, religion or gender.\n2. **Proportionate justice** ties the reward to what a person puts in: effort, skill and the kind of work done.\n3. **Recognition of special needs**: people with disadvantages, such as a disability, may need special help.\n4. The principles can **conflict**: one scholarship may suit a top scorer or a person in hardship.\n5. A society **balances** them, with reasons and a mix of measures.',
  sol: 'Three principles, a conflict and balance.',
  scheme: [['Equal treatment for equals', 1], ['Proportionate justice', 1], ['Recognition of special needs', 1], ['How they can conflict', 1], ['How a society balances them', 1]],
}));
Q('l_rawls', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain Rawls\' idea of the veil of ignorance and the original position, and say why he thinks it leads to fair rules.',
  model: '1. John Rawls\' book **A Theory of Justice** (1971) puts forward a thought experiment.\n2. In the **original position**, people choose the rules of society.\n3. A **veil of ignorance** hides from them their future place in society.\n4. Since each might end up as the **worst-off**, rational people would choose rules that make the worst-off as well off as possible.\n5. Fairness comes from **impartial choice**, not from altruism.',
  sol: 'Book, original position, veil, rules for the worst-off, impartial choice.',
  scheme: [['Rawls and A Theory of Justice (1971)', 1], ['Original position', 1], ['Veil of ignorance', 1], ['Rules that make the worst-off as well off as possible', 1], ['Fairness from impartial choice, not altruism', 1]],
}));
Q('l_justice', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the idea of justice with reference to different traditions and to the idea of dignity, and say how social justice concerns distribution.',
  model: '1. **Justice** means giving each person his or her **due**, treating people fairly by accepted principles.\n2. It has been discussed in many traditions: **dharma** in ancient Indian thought, **Confucius** on just rulers, and Plato\'s **Republic**.\n3. **Kant** saw **dignity** in every person, so each is owed equal consideration.\n4. **Social justice** asks whether goods and opportunities are shared fairly among people.\n5. Land reforms or reservations are policies a society may choose, and people give reasons on different sides.',
  sol: 'Meaning, traditions, dignity and distribution.',
  scheme: [['Definition of justice', 1], ['Traditions named', 1], ['Dignity and equal consideration', 1], ['Social justice and distribution', 1], ['Policies a society may choose, views differing', 1]],
}));
Q('l_market_state', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'A just society should ensure minimum basic needs. Discuss the views on free markets and on state intervention as ways of pursuing this, giving reasons for each.',
  model: '1. **Minimum basic needs** are nutrition, housing, clean drinking water, education and a minimum wage.\n2. Some argue for **free markets**: open competition rewards talent and effort and gives choice.\n3. They favour minimal **state intervention**, and hold that markets generally serve people well.\n4. Others argue that markets **favour the advantaged**, so the state must secure basic needs and equal opportunity through public services.\n5. Many societies **combine** the two, and students should judge with reasons.',
  sol: 'Basic needs, both views with reasons, and combination.',
  scheme: [['Minimum basic needs with examples', 1], ['Free market view with reasons', 1], ['State intervention view with reasons', 1], ['Many societies combine the two', 1], ['A reasoned, neutral judgement', 1]],
}));
Q('l_dist', long({
  t: [1, 2], d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'On the imagined island of Tamberlay, a few families own most of the farmland and many own none. Using ideas on just distribution and basic needs, explain how islanders might discuss what is fair, and what policies may be chosen.',
  model: '1. Social justice concerns the **fair distribution** of goods and opportunities, and land is one such good.\n2. Islanders may ask whether the distribution gives all the **basic conditions** for a secure life.\n3. A policy such as **land reform** is one that a society may choose, with reasons on different sides.\n4. Supporters of **markets** may stress effort and choice, while supporters of **state action** may stress basic needs and equal opportunity.\n5. They might **combine** measures and give reasons.',
  sol: 'Distribution, basic needs, policy choice, both views, combination.',
  scheme: [['Fair distribution of goods such as land', 1], ['Basic conditions for all', 1], ['A policy a society may choose', 1], ['Both views with reasons', 1], ['A reasoned combination or judgement', 1]],
}));
Q('l_evaluate', long({
  t: [1, 2], d: 5, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate the statement: a just society treats all alike. Use the three principles of justice, the veil of ignorance and the debate on markets and the state.',
  model: '1. **Equal treatment** supports the statement for equals, with no discrimination.\n2. But **proportionate justice** rewards effort differently, and **special needs** may call for different help.\n3. Behind the **veil of ignorance**, people might choose rules that make the worst-off as well off as possible.\n4. Some favour **markets** and others favour **state action**, and many combine them.\n5. So a reasoned judgement is that justice means treating equals alike and others according to relevant differences.',
  sol: 'A weighed answer using all ideas.',
  scheme: [['Equal treatment applied', 1], ['Proportion and special needs qualify the statement', 1], ['The veil of ignorance applied', 1], ['The market and state debate', 1], ['A reasoned judgement', 1]],
}));

// ================================================================ case-based (4 marks: 1 + 1 + 2)
Q('c_scholar', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the committee note and answer the questions that follow. *(An imagined note written by SOYL for practice; the committee, the town and the applicants are not real.)*',
  passage: '**From the notes of the Vellmark Scholarship Committee of Brindle, imagined**\n\nThe committee has one scholarship. Three applicants remain. Tara scored highest in the test. Imran scored slightly lower, but he has never had a school within ten kilometres. Leela scored the lowest, but the committee found that she was refused admission by her first school only because of her caste. The chair says each applicant must be judged by the same rules, that effort should be rewarded, and that disadvantage should be weighed.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which principle does the chair mention when she says that each applicant must be judged by the same rules?', model: '**Equal treatment for equals**.', sol: 'Same rules for equals.', scheme: [['Equal treatment for equals', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which principle most supports giving weight to Imran\'s distance from a school?', model: '**Recognition of special needs**.', sol: 'Distance is a disadvantage.', scheme: [['Recognition of special needs', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the three principles pull in different directions in this case.', model: '**Proportionate justice** favours Tara, who scored highest. **Special needs** favour Imran because of distance. **Equal treatment** asks that Leela not be denied by caste, and all be judged by the same rules. So the principles must be **balanced**.', sol: 'Principles in tension.', scheme: [['Proportionate justice for Tara and special needs for Imran', 1], ['Equal treatment and the need to balance', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest one way the committee might balance the principles, and give a reason.', model: 'The committee could keep a **mix**, awarding some places by score and some by hardship, and give **reasons** for each. This respects both **proportionate justice** and **special needs**, and shows the rules were applied alike to all.', sol: 'A balanced approach.', scheme: [['A suitable mix or procedure', 1], ['A reason that links it to the principles', 1]] }),
    ]),
  ],
}));
Q('c_island', caseQ({
  t: 1, d: 5, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the report and answer the questions that follow. *(An imagined report written by SOYL for practice; Tamberlay and its islanders are not real.)*',
  passage: '**From the Tamberlay Tidings, imagined**\n\nThe islanders of Tamberlay met to decide how fish and farmland should be shared. They agreed to settle the rules first and learn only afterwards whether each person would own a boat, mend nets or farm a tiny plot. Two rule sets were drawn up. Under Rule Set A, the fifth of islanders with least gets 20 units a year, while the fifth with most gets 130. Under Rule Set B, the fifth with least gets 40, while the fifth with most gets 90. A speaker said that such a choice must come from fairness, not from kindness.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Name the arrangement that the islanders used when they agreed to decide before learning their own place.', model: 'The **veil of ignorance**, with an original position.', sol: 'Choosing without knowing one\'s place.', scheme: [['Veil of ignorance', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which rule set leaves the worst-off group better off?', model: '**Rule Set B**.', sol: '40 units against 20.', scheme: [['Rule Set B', 1]] })),
    child('c', short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): Why might people behind the veil choose Rule Set B?', model: 'Each person might end up in the **worst-off group**, so a rational person would prefer the set that makes it **better off**, even at some cost to the best-off group. The reason is **impartial self-interest**, not kindness.', sol: 'Worst-off and impartial reasoning.', scheme: [['Might end up in the worst-off group', 1], ['Impartial choice, not kindness', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one reason that someone might offer for Rule Set A, and one reply.', model: 'Someone might say that Rule Set A gives more **reward** to those who produce the most. A reply is that people behind the **veil** might still prefer Rule Set B since they could be in the **worst-off group**.', sol: 'An objection and a reply.', scheme: [['A reason for Rule Set A', 1], ['A reply based on the veil', 1]] }),
    ]),
  ],
}));
Q('c_towns', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(An imagined table written by SOYL for practice; Norvale, Kesterby and the figures are not real.)*',
  passage: '**Two imagined towns compared by a school project**\n\n| Feature | Norvale | Kesterby |\n|---|---|---|\n| Water supply | Private sellers compete on price | Run by the town, free for all |\n| Schools | Private schools charging fees | Free town schools |\n| Result in a poor ward | Some families cannot afford enough water or fees | All families get water and schooling, but taxes are higher |\n| Choice for buyers | Wide | Narrow |',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which town follows a market approach to water and schools?', model: '**Norvale**.', sol: 'Private sellers and fees.', scheme: [['Norvale', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which town follows state intervention to secure basic needs?', model: '**Kesterby**.', sol: 'Free public water and schools.', scheme: [['Kesterby', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Give one point in favour of each town\'s approach.', model: 'In favour of **Norvale**: competition gives buyers a wide **choice** and may reward effort. In favour of **Kesterby**: public provision secures **basic needs** for all families, including the poorest ward.', sol: 'One point each.', scheme: [['A point for the market approach', 1], ['A point for the state approach', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest how a town might combine both approaches.', model: 'A town might let **private sellers** compete in most goods, but run **public water** and free schools for those who cannot afford them, so that choice is kept and **basic needs** are met.', sol: 'A combination.', scheme: [['Private competition where suitable', 1], ['Public provision for basic needs', 1]] }),
    ]),
  ],
}));
Q('c_letter', caseQ({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; Hollin, Naveen and the others are not real.)*',
  passage: '**Imagined letter to the Hollin Herald**\n\nI run a small bakery. Last year the council set a minimum wage for all bakery workers. I had to raise wages, and I think this interferes with the freedom of my business. But my worker Naveen says that before the rule he could not afford milk for his children. My neighbour says the council should leave prices to the market, while the schoolmaster says that a wage that cannot sustain a family is unjust. I do not know who is right.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which basic need does Naveen\'s remark mainly concern?', model: '**Nutrition**, or a wage enough for a secure life.', sol: 'Milk and a family wage.', scheme: [['Nutrition or minimum wage', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which view does the neighbour\'s remark mainly express?', model: 'The **free market** view.', sol: 'Leave prices to the market.', scheme: [['Free market view', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Give one reason in support of the council\'s rule and one reason against it.', model: 'In support, the rule helps secure a **basic need** for workers such as Naveen. Against it, the baker says it **interferes** with free bargaining and raises his costs.', sol: 'One reason each.', scheme: [['A reason in support', 1], ['A reason against', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): How might the baker, Naveen and the council reach a fair arrangement? Give reasons.', model: 'They could hold a **fair discussion**, weigh the baker\'s costs against the **basic needs** of workers, and choose a **moderate wage** that is reviewed. Giving reasons makes the arrangement **acceptable** to all sides.', sol: 'A reasoned compromise.', scheme: [['A fair discussion and weighing both sides', 1], ['A reasoned arrangement', 1]] }),
    ]),
  ],
}));
Q('c_bars', caseQ({
  t: 1, d: 5, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(An imagined table written by SOYL for practice; the island and the figures are imagined.)*',
  passage: '**Yearly income in units, imagined island of Tamberlay**\n\n| Group | Rule Set A | Rule Set B |\n|---|---|---|\n| Worst-off fifth | 20 | 40 |\n| Middle three fifths (each person) | 50 | 55 |\n| Best-off fifth | 130 | 90 |',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'How many more units does the worst-off fifth get under Rule Set B than under Rule Set A?', model: '**20 units** (40 minus 20).', sol: '40 minus 20 gives 20.', scheme: [['20 units', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which group gains under Rule Set A, compared with Rule Set B?', model: 'The **best-off fifth** (130 against 90).', sol: '130 is more than 90.', scheme: [['The best-off fifth', 1]] })),
    child('c', short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): Which set might be chosen behind a veil of ignorance, and why?', model: '**Rule Set B**, since a person who might be in the **worst-off group** would want that group to be as well off as possible, and B gives that group **40** rather than 20.', sol: 'B for the worst-off.', scheme: [['Rule Set B', 1], ['The reason based on possible worst-off position', 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): State one argument someone might make for Rule Set A and one reply from a Rawlsian point of view.', model: 'Someone might say that Rule Set A gives a **bigger reward** for those who produce the most. A reply is that people behind the **veil** might be among the **worst-off**, so would prefer the rule set that serves that group better.', sol: 'Argument and reply.', scheme: [['An argument for Rule Set A', 1], ['A reply from the veil of ignorance', 1]] }),
    ]),
  ],
}));
