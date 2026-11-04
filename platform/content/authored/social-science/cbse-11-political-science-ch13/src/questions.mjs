// CBSE 11 Political Science, ch13 Equality: question bank. Every passage (club rules, hiring notice, admission notice,
// classroom discussion, table of cases) is written by SOYL and labelled as imagined; the towns Ostrel, Veldmoor, Quillby,
// Hesk and Lindor, the Brindle Hill Club, Marrowdale Foods Ltd, Hesk Polytechnic and all people are imagined. No NCERT text,
// boxed source, cartoon, Constitution text, quotation of any thinker, court judgment or board/sample-paper item is reused
// (D-036). Articles are cited by number with a paraphrase of what they provide.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01: significance, meaning, dimensions, perspectives
Q('m_why_matters', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which slogan, linked with the French Revolution of 1789, placed equality beside two other ideals?',
  opts: ['Liberty, equality and fraternity', 'Order, tradition and obedience', 'Wealth, power and honour', 'Peace, trade and empire'],
  sol: 'Equality stood with liberty and fraternity in the revolutionary slogan. The other three sets of words do not make up that slogan.',
}));
Q('m_meaning', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement best captures what equality means in political theory?',
  opts: ['Equal respect for all persons, with equal rights and opportunities, though not identical treatment in every case', 'Giving every person exactly the same income and the same job', 'Treating every difference between persons as unjust', 'Removing all differences of talent between persons'],
  sol: 'Equality is about equal respect, rights and opportunities. It does not demand the same income, the same job or the removal of every difference, since some differences in treatment are justified.',
}));
Q('m_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement gives the standard definition of equality?',
  opts: ['All persons deserve equal respect and consideration, equal rights, and equal opportunities to develop themselves', 'All persons must receive the same reward for every kind of work', 'Only citizens of one region deserve equal rights', 'The rich and the poor must live in the same houses'],
  sol: 'The standard definition joins equal respect, equal rights and equal opportunities to develop. The other options ask for identical rewards or homes, or confine rights to one region.',
}));
Q('m_nat', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What are natural inequalities?',
  opts: ['Differences between people in talents, abilities and similar qualities', 'Differences created by caste and class systems', 'Differences created by unequal laws', 'Differences created by large gaps in wealth'],
  sol: 'Natural inequalities are differences of talent and ability. Caste, class, unequal laws and large wealth gaps are social arrangements, so they are socially produced inequalities.',
}));
Q('m_nat_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined village of Quillby, Tara sings far better than her brother Joel, while Joel solves chess puzzles faster than Tara. How should these two differences be classed?',
  opts: ['As natural inequalities of talent, which do not by themselves justify unequal rights', 'As socially produced inequalities, since the village made them', 'As unjust discrimination by the village', 'As economic inequalities in wealth'],
  sol: 'Differences in singing and puzzle-solving are differences of ability, so they are natural inequalities. No social arrangement made them, and they give no ground for giving Tara and Joel unequal rights.',
}));
Q('m_social_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Brindle Hill Club of Ostrel admits as members only men from families that have lived in the town for three generations. The difference between those admitted and those refused is best described as',
  opts: ['a socially produced inequality based on sex and birth, with no justification of need or work', 'a natural inequality of talent', 'a difference justified by the work members do', 'a difference that follows from need alone'],
  sol: 'Sex and family origin are not measures of need or work, and the rule is a social arrangement. It is therefore a socially produced inequality. Talent, work and need are not the basis of the rule.',
}));
Q('m_justified_app', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'The imagined Lindor health centre treats every patient but charges nothing to patients who cannot pay and a small fee to those who can. Which view of this difference in charges is sound?',
  opts: ['It can be justified by need and is not discrimination based on birth or status', 'It is unjust because it treats patients differently', 'It is unjust because the centre should charge everyone a high fee', 'It is justified only if the poor are refused treatment'],
  sol: 'Equality allows differences in treatment that rest on a relevant ground such as need. The charge depends on ability to pay and not on caste, sex or birth. Refusing treatment to the poor, or a high uniform fee, would not fit equal respect.',
}));
Q('m_unjust_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Marrowdale Foods Ltd, an imagined company, pays women packers less than men packers for exactly the same work and hours. This is best described as',
  opts: ['an unjust difference based on sex, which fails the test of equal respect', 'a justified difference based on work done', 'a natural inequality of strength', 'a difference justified by need'],
  sol: 'The work and hours are the same, so the pay gap rests on sex and not on work done or need. It is an unjust difference. Natural inequality of strength is not shown by the case.',
}));
Q('m_dim_pol', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following belongs to political equality?',
  opts: ['Equal citizenship, with equal voting rights and civil rights', 'Equal wealth for every household', 'Equal marks for every student', 'Equal talents for every person'],
  sol: 'Political equality covers equal citizenship, voting rights and civil rights. Equal wealth is an economic matter, while equal marks and talents are neither a dimension of equality nor an aim of it.',
}));
Q('m_dim_app_social', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined village of Lindor, children of one caste are not allowed to use the village library, and they are the only children without a school nearby. Which dimension of equality is mainly in question?',
  opts: ['Social equality, which covers equal opportunities and the removal of discrimination', 'Political equality, which covers voting', 'Economic equality, which covers only gaps in income', 'Natural equality of talent'],
  sol: 'Exclusion from a library and a school on the ground of caste concerns opportunities and discrimination, which is social equality. Voting and income gaps are not what the case describes.',
}));
Q('m_dim_app_econ', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined district of Quillby, the richest tenth of families own most of the farmland and earn many times more than the rest. Proposals to reduce this gap by sharing resources more widely address mainly',
  opts: ['economic equality', 'political equality', 'natural equality', 'formal equality of citizenship'],
  sol: 'A large gap in wealth and income is an economic inequality, and narrowing it is the concern of economic equality. Voting rights, talents and legal status are not the matter here.',
}));
Q('m_dim_app_pol', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined town of Veldmoor, votes cast in the hill wards are counted as half a vote each, while votes in the river wards count in full. Which dimension of equality does this rule violate?',
  opts: ['Political equality, since equal voting rights are denied', 'Economic equality, since income differs', 'Natural equality of talent', 'Social equality in the use of wells'],
  sol: 'Counting some citizens\' votes at half value breaks equal voting rights, which belong to political equality. The rule is about votes, not income, talent or wells.',
}));
Q('m_lohia', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Ram Manohar Lohia spoke of several kinds of inequality. Which set lists kinds he named?',
  opts: ['Between men and women, by skin colour, by caste, colonial rule and economic inequality', 'Between languages, between sports, by height and by age only', 'Between towns and villages, by hobby and by dress only', 'Between rivers, mountains and plains'],
  sol: 'Lohia named inequality between men and women, by skin colour, by caste, colonial rule over some peoples by others, and economic inequality. The other sets are not among the kinds he spoke of.',
}));
Q('m_marx', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'According to Marxism, where is inequality rooted?',
  opts: ['In the private ownership of resources', 'In differences of natural talent', 'In competition between equal persons', 'In the absence of any rules'],
  sol: 'Marxism traces inequality to private ownership of resources. Natural talent, competition among persons with equal opportunities and the absence of rules are not its account.',
}));
Q('m_lib_app', mcq({
  t: 1, d: 4, c: 'application',
  stem: 'At a debate in Ostrel, a speaker says that a running race is fair when all runners start from the same line with the same chance, and that the winner may keep the prize. Which perspective does this speaker\'s approach most resemble?',
  opts: ['Liberalism, which accepts competition as fair if opportunities are equal', 'Marxism, which roots inequality in private ownership', 'Feminism, which challenges patriarchy', 'None of them, since no perspective deals with fairness'],
  sol: 'Accepting competition as fair when opportunities are equal is the liberal approach. The other two perspectives start from other concerns, namely ownership of resources and patriarchy, and fairness is a concern of all.',
}));
Q('m_fem_app', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined community of Hesk, custom lets only sons inherit family land. A group campaigns for daughters to inherit equally, calling the custom a form of patriarchy. Which perspective on equality does the group represent?',
  opts: ['Feminism, which works for equal rights for women and men', 'Liberalism, which defends competition only', 'Marxism, which looks only at class', 'Colonial rule, a kind of inequality'],
  sol: 'Working for equal inheritance rights for women and challenging patriarchy is the feminist perspective. Liberalism and Marxism have other starting points, and colonial rule is a kind of inequality, not a perspective.',
}));
Q('m_persp', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Which statement about the perspectives on equality is accurate?',
  opts: ['Marxism stresses private ownership of resources, while liberalism accepts competition when opportunities are equal', 'Marxism accepts competition as always fair, while liberalism blames private ownership', 'Feminism holds that patriarchy is not a cause of inequality', 'All four views name the same single cause of inequality'],
  sol: 'The first statement matches the two accounts. The second swaps them. Feminism challenges patriarchy as a source of inequality. The four views do not name one single cause.',
}));

// ================================================================ t02: promoting equality
Q('m_formal', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What is formal equality?',
  opts: ['The removal of legal privileges and of discrimination in law', 'The sharing of all wealth equally', 'Special seats set aside in colleges', 'Equal talents for all'],
  sol: 'Formal equality means ending legal privileges and legal discrimination. Sharing wealth, special seats and equal talents are other matters.',
}));
Q('m_art17', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which Article of the Constitution abolishes untouchability and forbids its practice?',
  opts: ['Article 17', 'Article 14', 'Article 15(4)', 'Article 16(4)'],
  sol: 'Article 17 abolishes untouchability. Article 14 speaks of equality before law, and Articles 15(4) and 16(4) deal with special provisions and reservation.',
}));
Q('m_art14_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In the imagined state of Veldmoor, a rule says that relatives of ministers need not obey the traffic laws that bind everyone else. Which constitutional idea does this rule go against?',
  opts: ['Equality before the law and equal protection of the laws, the idea of Article 14', 'The abolition of untouchability, the idea of Article 17', 'Special provisions for backward classes, the idea of Article 15(4)', 'The idea of Article 16(4) alone, since it concerns public jobs only'],
  sol: 'Giving a privilege before the law to one group goes against the equality before law that Article 14 provides. Article 17 is about untouchability, Article 15(4) allows special provisions and Article 16(4) concerns jobs.',
}));
Q('m_art15_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The only tea shop in the imagined town of Ostrel refuses to serve customers of one caste. Which Article\'s guarantee against discrimination does this practice go against?',
  opts: ['Article 15, which forbids discrimination on grounds such as caste in access to shops and public places', 'Article 16(4), which allows reservation in appointments', 'Article 15(4), which allows special provisions for backward classes', 'No Article, since a tea shop is a private matter'],
  sol: 'Article 15 forbids discrimination on grounds such as religion, race, caste, sex or place of birth, and covers access to shops, restaurants and similar places. Articles 15(4) and 16(4) allow special provisions and do not permit such refusal.',
}));
Q('m_diff_treat', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why can special treatment for some persons sometimes help achieve real equality?',
  opts: ['Because persons differ in their circumstances, and equal access may need special arrangements', 'Because equality means treating no one alike', 'Because special treatment ends all differences', 'Because it replaces the need for any law'],
  sol: 'Persons start from different circumstances, so the same arrangement may leave some unable to use it. Special treatment such as a ramp creates equal access. It does not mean treating no one alike, ending all differences or replacing law.',
}));
Q('m_diff_app', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined Ostrel hospital gives paid leave to mothers after childbirth and fits a ramp at its main door for wheelchair users. How should these steps be described?',
  opts: ['Equality through differential treatment, since special provision helps real equality', 'Formal equality alone', 'Affirmative action for a historically disadvantaged community', 'Discrimination against fathers and walkers'],
  sol: 'Maternity leave and a ramp are special provisions that make equal use of work and buildings possible, which is differential treatment. They are not about legal privilege, historical disadvantage of a community or unjust discrimination.',
}));
Q('m_aa_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What is affirmative action?',
  opts: ['Policies that aim to remedy the effects of historical disadvantage', 'Laws that remove all differences in income', 'A rule that every institution must treat all applicants identically', 'The ending of all special provisions'],
  sol: 'Affirmative action means policies that remedy the effects of historical disadvantage. Removing all income differences, identical treatment in all cases and ending special provisions describe other things.',
}));
Q('m_res_art', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Articles 15(4) and 16(4) of the Constitution are the basis for which kind of policy?',
  opts: ['Special provision and reservation in education and public jobs for Scheduled Castes, Scheduled Tribes and Other Backward Classes', 'Voting rights for all adults', 'The abolition of untouchability', 'Freedom of speech'],
  sol: 'These two Articles permit special provisions in education and reservation in public appointments for backward groups. Voting rights, abolition of untouchability and freedom of speech come under other provisions.',
}));
Q('m_aa_app', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'Hesk Polytechnic, an imagined college, sets aside 20 of its 100 seats for applicants from families that have lacked schooling for generations. Which description fits this step best?',
  opts: ['An affirmative action policy aimed at remedying historical disadvantage', 'A measure of formal equality only', 'A removal of all differences of talent', 'A measure aimed solely at wealth and income'],
  sol: 'Setting aside seats for families long denied schooling is an affirmative action policy. Formal equality is about removing legal privilege, talent differences are natural, and the step is not aimed at wealth alone.',
}));
Q('m_debate_app', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'At a school debate in Lindor, a student says that seats alone do not help a child who cannot afford books, so scholarships, coaching classes and hostels should be given as well or instead. How should this view be described?',
  opts: ['A view that favours other or additional means to promote equality', 'A claim that equality does not matter', 'A view that opposes every public policy', 'A proof that the other side is wrong'],
  sol: 'The student proposes other or additional measures to promote equality, which is one side of the debate. The student does not say equality is unimportant or oppose all policies, and the point does not settle the debate.',
}));
Q('m_debate_for', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Which is an argument offered in support of reservations?',
  opts: ['They help correct long-standing disadvantage and make institutions more representative', 'They remove the need for any school', 'They make all talents equal', 'They end all competition for jobs'],
  sol: 'Supporters argue that reservations correct long-standing disadvantage and make institutions representative. They do not remove the need for schools, make talents equal or end competition.',
}));
Q('m_ews', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'As of 2024, what did the 103rd Amendment (2019) add?',
  opts: ['Reservation for economically weaker sections, upheld by the Supreme Court in 2022', 'The abolition of untouchability', 'The right to vote for all adults', 'The equal protection of the laws'],
  sol: 'The 103rd Amendment of 2019 added reservation for economically weaker sections, and the Supreme Court upheld it in 2022. Untouchability, adult voting and equal protection of laws come from other provisions.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_nat_soc', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Two sisters in Quillby differ in running speed, and the difference is a natural inequality.',
  r: 'Natural inequalities arise from differences in talent and ability and not from social arrangements.',
  sol: 'A is true and R is true. Running speed is a difference of ability, and R states why such a difference counts as natural, so R explains A.',
}));
Q('ar_ident', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-false-R-true',
  a: 'Equality requires that every person be treated in an identical way in every situation.',
  r: 'Persons differ in their needs and circumstances, so identical treatment can sometimes leave a disadvantage in place.',
  sol: 'A is false, since equality asks for equal respect, rights and opportunities, not identical treatment everywhere. R is true and shows why A fails.',
}));
Q('ar_dim', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Equal citizenship, including an equal vote, belongs to political equality.',
  r: 'Large gaps in wealth and income are an economic inequality.',
  sol: 'Both statements are true. But the gap in wealth belongs to another dimension and does not explain why citizenship and the vote belong to the political one.',
}));
Q('ar_formal', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Formal equality alone may leave real inequalities in place.',
  r: 'Removing legal privileges does not, by itself, give a poor child a school that she can reach.',
  sol: 'A is true and R is true. R gives an example of a real inequality that remains after legal privilege is removed, so it explains A.',
}));
Q('ar_aa', ar({
  t: 2, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Affirmative action is meant to remedy the effects of historical disadvantage.',
  r: 'Affirmative action is meant to place one community above all others for ever.',
  sol: 'A is true, since remedying historical disadvantage is its stated aim. R is false, because its aim is to correct disadvantage, not to rank a community above others.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_ident', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'A canteen in Veldmoor serves larger portions to the labourers who lift sacks all day than to the clerks. This proves that equality is always violated when treatment differs.',
  sol: 'A difference in portions rests on work done and need, which are relevant grounds. Equality is violated by differences based on birth or status, not by every difference in treatment.',
}));
Q('tf_nat', tf({
  t: 1, d: 3, c: 'application', ans: true,
  stem: 'A difference in talent for music between two students is a natural inequality, but keeping girls out of the village school by custom is a socially produced inequality.',
  sol: 'Talent is a natural difference. Exclusion by custom is a social arrangement, which can be changed, so it is socially produced.',
}));
Q('tf_aa', tf({
  t: 2, d: 3, c: 'understanding', ans: false,
  stem: 'Reservations in education and public jobs for Scheduled Castes, Scheduled Tribes and Other Backward Classes rest on Article 17, which abolishes untouchability.',
  sol: 'Article 17 abolishes untouchability. Reservations are permitted by Article 15(4) for education and Article 16(4) for public appointments.',
}));
Q('fb_dim', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Equal voting rights belong to ___ equality, while reducing large gaps in wealth and income belongs to ___ equality.',
  acc: [['political'], ['economic']],
  sol: 'Equal voting rights are part of political equality, and reducing large gaps in wealth and income is part of economic equality.',
}));
Q('fb_formal', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The removal of legal privileges and discrimination is called ___ equality, and a ramp for wheelchair users is an example of ___ treatment.',
  acc: [['formal'], ['differential', 'special']],
  sol: 'Removing legal privileges and discrimination is formal equality, and a ramp is an example of differential treatment, meaning special provision for real equality.',
}));
Q('fb_art', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Article ___ abolishes untouchability, and Article ___ provides for equality before the law.',
  acc: [['17', 'seventeen'], ['14', 'fourteen']],
  sol: 'Article 17 abolishes untouchability, and Article 14 provides for equality before the law.',
}));
Q('mt_persp', match({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each perspective on equality with the idea it stresses.',
  pairs: [
    ['Marxism', 'Inequality is rooted in the private ownership of resources'],
    ['Liberalism', 'Competition is fair if opportunities are equal'],
    ['Feminism', 'Equal rights for women and men; challenge to patriarchy'],
    ['Lohia', 'Several kinds of inequality, including caste and colonial rule'],
  ],
  sol: 'Marxism is paired with private ownership of resources, liberalism with fair competition under equal opportunities, feminism with equal rights and a challenge to patriarchy, and Lohia with several kinds of inequality.',
}));
Q('mt_art', match({
  t: 2, d: 3, c: 'recall', marks: 2,
  stem: 'Match each provision of the Constitution with what it provides.',
  pairs: [
    ['Article 14', 'Equality before the law'],
    ['Article 15(4)', 'Special provisions for backward classes, Scheduled Castes and Scheduled Tribes'],
    ['Article 16(4)', 'Reservation in public appointments for backward classes'],
    ['Article 17', 'Abolition of untouchability'],
  ],
  sol: 'Article 14 is equality before law, Article 15(4) is special provisions for backward groups, Article 16(4) is reservation in appointments, and Article 17 is the abolition of untouchability.',
}));
Q('ord_audit', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'The imagined council of Ostrel wants to check whether a difference in treatment at the town pool is justified. Arrange its steps of reasoning in a sensible order.',
  items: [
    'Identify exactly how two groups are treated differently',
    'Ask what the ground of the difference is: need, work done, or birth and status',
    'Test whether the ground is relevant to the service and respects equal respect for all',
    'Decide whether the difference is justified or unjust',
  ],
  sol: 'The council first states the difference, then finds its ground, then tests whether the ground is relevant and respectful, and only then decides.',
}));
Q('ord_ladder', ord({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these ways of promoting equality in the order in which they widen from the basic to the most targeted.',
  items: [
    'Formal equality: remove legal privileges and discrimination',
    'Differential treatment: special arrangements such as ramps and maternity benefits',
    'Affirmative action: policies to remedy historical disadvantage',
  ],
  sol: 'The ladder begins with formal equality, moves to special arrangements that help real equality, and reaches affirmative action, which targets historical disadvantage.',
}));

// ---------------------------------------------------------------- short answer, 2 marks
Q('s_def', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Define equality, and say why it does not require identical treatment in every case.',
  model: '**Equality** is the principle that all persons deserve equal respect and consideration, equal rights and equal opportunities to develop themselves. It does not demand identical treatment, because differences based on relevant grounds such as need or work done can be justified.',
  sol: 'Definition and the note on justified differences.',
  scheme: [['Standard definition of equality', 1], ['Justified differences mean treatment need not be identical', 1]],
}));
Q('s_nat_soc', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish natural inequalities from socially produced inequalities, with one imagined example of each.',
  model: '**Natural inequalities** are differences of talent and ability, such as a gift for music. **Socially produced inequalities** arise from social arrangements, such as caste, class or gender discrimination, for example a village custom that keeps girls from school.',
  sol: 'Both kinds defined, with examples.',
  scheme: [['Natural inequality defined, with an example', 1], ['Socially produced inequality defined, with an example', 1]],
}));
Q('s_justified', short({
  t: 1, d: 4, c: 'application', marks: 2, wl: S2,
  stem: 'Marrowdale Foods Ltd, an imagined company, pays a night-shift allowance to staff who work after midnight. Is this an unjust difference in pay? Give a reason.',
  model: 'No. The allowance rests on **work done**, since night work is harder, and not on birth, sex or status. A difference based on a relevant ground can be justified and does not fail the test of **equal respect**.',
  sol: 'Work done is a relevant ground.',
  scheme: [['A relevant ground, work done, is named', 1], ['The difference does not rest on birth or status, so equal respect is kept', 1]],
}));
Q('s_dim', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name the three dimensions of equality and give one aspect of each.',
  model: '**Political equality**: equal citizenship, including equal voting rights. **Social equality**: equal opportunities, such as access to education and health care. **Economic equality**: reducing large gaps in wealth and income.',
  sol: 'Three dimensions, one aspect each.',
  scheme: [['Political, social and economic named', 1], ['An aspect of each', 1]],
}));
Q('s_marx_lib', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'State, in neutral terms, how Marxism and liberalism each look at inequality.',
  model: 'In **Marxism**, inequality is traced to the private ownership of resources. **Liberalism** accepts competition as fair when opportunities are equal, and is wary of concentrated power. The two views start from different concerns.',
  sol: 'Each view stated.',
  scheme: [['Marxism: private ownership of resources', 1], ['Liberalism: competition fair if opportunities are equal', 1]],
}));
Q('s_lohia', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Which kinds of inequality did Ram Manohar Lohia speak of?',
  model: 'Lohia spoke of several kinds of inequality: between **men and women**, by **skin colour**, by **caste**, between peoples through **colonial rule**, and **economic** inequality.',
  sol: 'Five kinds listed.',
  scheme: [['Three kinds named correctly', 1], ['All five named', 1]],
}));
Q('s_formal', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is formal equality? Name one Article that expresses it.',
  model: '**Formal equality** is the ending of legal privilege and discrimination, with the law treating everyone alike. **Article 14**, which provides equality before the law, is one expression of it, as is Article 17, which abolishes untouchability.',
  sol: 'Definition and an Article.',
  scheme: [['Removal of legal privileges and discrimination', 1], ['An Article named with its provision', 1]],
}));
Q('s_diff', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Why may differential treatment be needed to achieve real equality? Give an imagined example.',
  model: 'Persons start from different circumstances, so the same arrangement may not give each an equal chance. For example, the imagined Ostrel library builds a **ramp** so that wheelchair users can enter. This **special arrangement** gives them equal access.',
  sol: 'Reason and example.',
  scheme: [['Circumstances differ, so identical arrangements may not give equal access', 1], ['An imagined example such as a ramp', 1]],
}));
Q('s_aa', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What is affirmative action? Name two groups for whom reservations are provided in India.',
  model: '**Affirmative action** means policies that remedy the effects of historical disadvantage. In India reservations in education and public jobs are provided for **Scheduled Castes**, **Scheduled Tribes** and **Other Backward Classes**.',
  sol: 'Meaning and two groups.',
  scheme: [['Policies that remedy historical disadvantage', 1], ['Two groups named', 1]],
}));
Q('s_art_aa', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Which Articles permit reservation in education and public jobs, and what does each allow?',
  model: '**Article 15(4)** permits special provisions, including in education, for socially and educationally backward classes, Scheduled Castes and Scheduled Tribes. **Article 16(4)** permits reservation in public appointments for backward classes not adequately represented.',
  sol: 'Two Articles with their provisions.',
  scheme: [['Article 15(4): special provisions for backward groups', 1], ['Article 16(4): reservation in appointments', 1]],
}));

// ---------------------------------------------------------------- short answer, 3 marks
Q('s3_dims', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain political, social and economic equality, with one imagined example of each.',
  model: '**Political equality** gives all citizens equal citizenship, voting rights and civil rights, as when every adult in imagined Veldmoor has one vote. **Social equality** means equal opportunities, access to education and health care and no discrimination, as when every child in Lindor may use the school. **Economic equality** means reducing large gaps in wealth and income.',
  sol: 'Each dimension with its example.',
  scheme: [['Political equality with an example', 1], ['Social equality with an example', 1], ['Economic equality with an example or explanation', 1]],
}));
Q('s3_persp', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe how Marxism, liberalism and feminism each approach equality.',
  model: 'In **Marxism**, inequality is traced to the private ownership of resources. For **liberalism**, competition is fair provided opportunities are equal, and concentrated power is a worry. **Feminism** works for equal rights for women and men, and challenges patriarchy. Each offers its own account of where inequality comes from.',
  sol: 'Three approaches, each explained.',
  scheme: [['Marxism: private ownership of resources', 1], ['Liberalism: competition fair with equal opportunities; wary of concentrated power', 1], ['Feminism: equal rights for women and men; challenge to patriarchy', 1]],
}));
Q('s3_classify', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Three situations are imagined in Veldmoor: (i) Kiran can carry heavier loads than Lila; (ii) farm workers of one community are not allowed to draw water from the common well; (iii) Mohan has a gift for languages. Classify each as a natural or a socially produced inequality, with a reason.',
  model: '(i) **Natural**: the ability to carry heavier loads is a difference of physical strength that no social arrangement made. (ii) **Socially produced**: exclusion from a common well is a social arrangement based on community, so society can change it. (iii) **Natural**: a gift for languages is a difference of talent, not a result of any rule.',
  sol: 'Each situation classified with a reason.',
  scheme: [['Situation (i) classified with a reason', 1], ['Situation (ii) classified with a reason', 1], ['Situation (iii) classified with a reason', 1]],
}));
Q('s3_ladder', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain how formal equality, differential treatment and affirmative action differ in the way they promote equality.',
  model: '**Formal equality** removes legal privileges and discrimination, as in Articles 14, 15 and 17. **Differential treatment** gives special arrangements, such as ramps or maternity benefits, so that persons can enjoy equal access. **Affirmative action** is a policy to remedy historical disadvantage, as in reservations in education and jobs.',
  sol: 'Three approaches contrasted.',
  scheme: [['Formal equality explained', 1], ['Differential treatment explained', 1], ['Affirmative action explained', 1]],
}));
Q('s3_debate', short({
  t: 2, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Some people favour reservations and others favour different or additional measures. State the reasons given by each view without taking a side.',
  model: 'Some argue that reservations are needed to correct **long-standing disadvantage** and to make institutions **representative**. Others favour other or additional measures, for example **scholarships, coaching or hostels**, or different criteria. Each side offers reasons that deserve a fair hearing, and students may weigh them and judge for themselves.',
  sol: 'Both views, each with reasons.',
  scheme: [['Reasons for reservations stated', 1], ['Reasons for other or additional means stated', 1], ['Neutral treatment, leaving the judgement to the reader', 1]],
}));
Q('s3_ramp', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The town hall of imagined Ostrel has 20 steps and no lift, so residents who use wheelchairs cannot attend council meetings. Suggest a change and explain how it supports real equality.',
  model: 'The council could build a **ramp** or a lift, or hold meetings on the ground floor. This is **differential treatment**: a special arrangement that gives wheelchair users equal access. Without it, equal citizenship on paper would not mean an equal chance to take part.',
  sol: 'A change, its type and its effect on real equality.',
  scheme: [['A suitable change such as a ramp or lift', 1], ['Named as differential treatment or special arrangement', 1], ['Explains real equality of access', 1]],
}));
Q('s3_criteria', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'The imagined board of Lindor School debates whether scholarships should go to children of low-income families or to children of groups long denied schooling. State two considerations each view might offer, without taking a side.',
  model: 'Those favouring income as the test may argue that need is easy to see and covers poor families of every community. Those favouring **historical disadvantage** may argue that a group\'s long exclusion can persist even when some families earn more. Each view has reasons, and the board must weigh them.',
  sol: 'Considerations for each criterion, neutral.',
  scheme: [['Considerations for the income test', 1], ['Considerations for the group-based test', 1], ['Neutral conclusion that the reasons must be weighed', 1]],
}));

// ---------------------------------------------------------------- long answer, 5 marks
Q('l_meaning', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain what equality means, and distinguish justified differences from unjust ones and natural inequalities from socially produced ones.',
  model: '1. **Equality** means that all persons deserve equal respect and consideration, equal rights and equal opportunities to develop themselves.\n2. It does not require identical treatment in every case.\n3. A difference in treatment can be **justified** when it rests on a relevant ground such as need or work done.\n4. A difference is **unjust** when it rests on birth or status, such as caste or sex.\n5. **Natural inequalities** are differences of talent and ability.\n6. **Socially produced inequalities** come from social arrangements such as caste, class or gender discrimination, and can be changed.',
  sol: 'Definition, justified and unjust differences, natural and social inequalities.',
  scheme: [['Standard definition of equality', 1], ['Equality does not mean identical treatment', 1], ['Justified differences: need or work done', 1], ['Unjust differences: birth or status', 1], ['Natural versus socially produced inequalities', 1]],
}));
Q('l_dims', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the three dimensions of equality, giving an imagined example of each and showing how they are linked.',
  model: '1. **Political equality** means equal citizenship, equal voting rights and civil rights. Example: every adult in imagined Veldmoor casts one equal vote.\n2. **Social equality** means equal opportunities, access to education and health care, and the removal of discrimination. Example: a clinic in Lindor open to every caste.\n3. **Economic equality** means reducing large gaps in wealth and income. Example: sharing farmland more widely in Quillby.\n4. The dimensions are **linked**: an equal vote means little to a person kept from school and work.',
  sol: 'Three dimensions with examples and a link.',
  scheme: [['Political equality with example', 1], ['Social equality with example', 1], ['Economic equality with example', 1], ['The dimensions are linked, with a reason', 1], ['Clear, organised answer', 1]],
}));
Q('l_persp', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the perspectives of Ram Manohar Lohia, Marxism, liberalism and feminism on inequality. Present them neutrally.',
  model: '1. **Lohia** spoke of several kinds of inequality: between men and women, by skin colour, by caste, colonial rule, and economic inequality.\n2. In **Marxism**, inequality is traced to the private ownership of resources.\n3. For **liberalism**, competition is fair provided opportunities are equal, and concentrated power is a worry.\n4. **Feminism** works for equal rights for women and men, and challenges patriarchy.\n5. The four views differ in where they place the roots of inequality and in the remedies they stress. A student may weigh each with reasons.',
  sol: 'Four perspectives, each explained.',
  scheme: [['Lohia: several kinds of inequality named', 1], ['Marxism: private ownership of resources', 1], ['Liberalism: competition fair if opportunities equal; wary of concentrated power', 1], ['Feminism: equal rights; challenge to patriarchy', 1], ['Neutral treatment, no ranking', 1]],
}));
Q('l_ladder', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain three ways of promoting equality: formal equality, differential treatment and affirmative action.',
  model: '1. **Formal equality** ends legal privilege and legal discrimination.\n2. In the Constitution, **Article 14** provides equality before the law, **Article 15** forbids discrimination on grounds such as caste and sex, and **Article 17** abolishes untouchability.\n3. **Differential treatment** means special arrangements that help achieve real equality, for example ramps or maternity benefits.\n4. **Affirmative action** means policies to remedy historical disadvantage, such as reservations in education and public jobs under Articles 15(4) and 16(4).\n5. Formal equality alone may leave real inequalities, so the three approaches work together.',
  sol: 'Three approaches with Articles and examples.',
  scheme: [['Formal equality explained', 1], ['Articles 14, 15, 17 explained', 1], ['Differential treatment with example', 1], ['Affirmative action with Articles 15(4) and 16(4)', 1], ['Why formal equality alone may not be enough', 1]],
}));
Q('l_aa', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Explain affirmative action in India and the debate on reservations. Present both views and let the reader judge.',
  model: '1. **Affirmative action** means policies to remedy the effects of historical disadvantage.\n2. In India it takes the form of **reservations** in education and public jobs for Scheduled Castes, Scheduled Tribes and Other Backward Classes, permitted by **Articles 15(4) and 16(4)**.\n3. Some argue that reservations are needed to correct **long-standing disadvantage** and to make institutions **representative**.\n4. Others favour **other or additional measures**, for example scholarships, coaching or hostels, or different criteria.\n5. Each side gives reasons, and students may weigh them and judge for themselves.',
  sol: 'Meaning, Articles, both views, neutral ending.',
  scheme: [['Meaning of affirmative action', 1], ['Reservations and the two Articles', 1], ['Reasons given for reservations', 1], ['Reasons for other or additional means or different criteria', 1], ['Neutral conclusion that leaves the judgement to the student', 1]],
}));
Q('l_evaluate', long({
  t: 2, d: 5, c: 'evaluation', marks: 5, wl: L5,
  stem: 'The imagined council of Quillby wants to widen opportunity. It considers (i) a law that bars discrimination in all shops, (ii) a ramp and a lift at its offices, and (iii) a scholarship scheme for children of groups long denied schooling. Classify each measure and say what each would achieve.',
  model: '1. Measure (i) is **formal equality**: it removes discrimination in access to shops.\n2. It protects equal treatment in law but does not by itself supply opportunity.\n3. Measure (ii) is **differential treatment**: a special arrangement that gives persons with disabilities equal access.\n4. Measure (iii) is **affirmative action**: a policy aimed at the effects of historical disadvantage.\n5. Together the measures address legal, practical and historical barriers. Some may prefer one measure over another, and the council should weigh reasons.',
  sol: 'Each measure classified with its effect.',
  scheme: [['Measure (i) classified as formal equality', 1], ['Its effect and limit', 1], ['Measure (ii) classified as differential treatment with its effect', 1], ['Measure (iii) classified as affirmative action with its effect', 1], ['Balanced conclusion that reasons must be weighed', 1]],
}));

// ---------------------------------------------------------------- case-based, 4 marks
Q('c_club', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the club rules and answer the questions that follow. *(Imagined rules written by SOYL for practice; the Brindle Hill Club, Ostrel and the people are not real.)*',
  passage: '**From the entry rules of the Brindle Hill Club in Ostrel, imagined**\n\n| Rule | Text |\n|---|---|\n| 1 | Membership is open only to men from families that have lived in Ostrel for three generations. |\n| 2 | The only entrance to the club has steps, and no ramp is fitted. |\n| 3 | Members who volunteer as coaches for the children\'s classes pay half the yearly fee. |',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which rule creates a difference based on sex and birth?', model: '**Rule 1**.', sol: 'Only men from long-resident families may join.', scheme: [['Rule 1', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which rule rests on a justified ground, and what is the ground?', model: '**Rule 3**; the ground is **work done** as volunteer coaches.', sol: 'Work done is a relevant ground.', scheme: [['Rule 3 with the ground of work done', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): How does Rule 2 stand in the way of real equality, and what step would help?', model: 'The steps stop wheelchair users from entering, so equal access is denied in practice. A **ramp** is a special arrangement, that is **differential treatment**, which would give equal access.', sol: 'Equal access needs special provision.', scheme: [['Steps deny equal access in practice', 1], ['A ramp as differential treatment', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Why is Rule 1 an unjust difference and not a justified one?', model: 'Rule 1 rests on **sex and family origin**, which are matters of birth and status. They are not relevant grounds such as **need** or **work done**, and the rule fails **equal respect**.', sol: 'Birth and status are not relevant grounds.', scheme: [['Rule rests on birth and status', 1], ['Not need or work done, so it fails equal respect', 1]] }),
    ]),
  ],
}));
Q('c_hiring', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the hiring notice and answer the questions that follow. *(An imagined notice written by SOYL for practice; Marrowdale Foods Ltd and the town are not real.)*',
  passage: '**Hiring notice of Marrowdale Foods Ltd, imagined**\n\n1. Applicants will be shortlisted by marks in a written test and a skills round.\n2. Women will not be considered for the post of supervisor.\n3. Staff who work the night shift receive an allowance.\n4. An applicant with a hearing impairment may ask for a written copy of the interview questions.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which clause is an unjust difference based on sex?', model: '**Clause 2**.', sol: 'It bars women from one post.', scheme: [['Clause 2', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which clause rests on work done, and so is a justified difference?', model: '**Clause 3**, the night-shift allowance.', sol: 'Night work is the ground.', scheme: [['Clause 3', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): How does Clause 4 help to achieve real equality?', model: 'It is **differential treatment**: a special arrangement so that an applicant with a hearing impairment can understand the questions. Without it, the equal chance to be interviewed would be only **on paper**.', sol: 'A special arrangement for real equality.', scheme: [['Identified as differential treatment', 1], ['Gives a real equal chance', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Which dimension of equality does Clause 2 breach, and why?', model: 'It breaches **social equality**, which covers equal opportunities and the removal of discrimination, since the post is closed to women on the ground of sex.', sol: 'Opportunity denied on the ground of sex.', scheme: [['Social equality named', 1], ['Reason: opportunity closed on ground of sex', 1]] }),
    ]),
  ],
}));
Q('c_admit', caseQ({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the notice and answer the questions that follow. *(An imagined notice written by SOYL for practice; Hesk Polytechnic and the people are not real.)*',
  passage: '**Admission notice of Hesk Polytechnic, imagined**\n\nOf the 100 places in the first-year diploma course, 80 are filled by an entrance test open to all. Twenty places are set aside for applicants from families that have lacked schooling for generations. Some parents welcome the step. Others say the polytechnic should instead offer free coaching and hostels to every poor applicant.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which kind of policy is the setting aside of twenty places?', model: '**Affirmative action**.', sol: 'It targets historical disadvantage.', scheme: [['Affirmative action', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'What do the other parents propose instead?', model: '**Free coaching and hostels** for every poor applicant.', sol: 'The alternative named in the notice.', scheme: [['Coaching and hostels', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Give one reason why some people may support setting aside places.', model: 'They may argue that it corrects **long-standing disadvantage** of the families concerned and makes the polytechnic more **representative**.', sol: 'A supporting argument.', scheme: [['Corrects long-standing disadvantage', 1], ['Makes the institution more representative, or an equivalent reason', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one reason why some people may prefer free coaching and hostels, or a different criterion.', model: 'They may argue that **coaching and hostels** give real help to every poor applicant and may argue for other criteria, such as **income**, so that help reaches those who need it.', sol: 'An argument for another or additional means.', scheme: [['Coaching and hostels, or another measure, named', 1], ['A reason, such as wider help or a different criterion', 1]] }),
    ]),
  ],
}));
Q('c_debate', caseQ({
  t: 2, d: 5, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the discussion and answer the questions that follow. *(An imagined classroom discussion written by SOYL for practice; Lindor School and the students are not real.)*',
  passage: '**A Class 11 discussion at Lindor School, imagined**\n\nAnvi says that places in colleges and jobs should be reserved for groups that were shut out for generations, because otherwise the gap will never close and institutions will not look like society. Dev says that places alone do not help children who cannot afford books, so scholarships, coaching and hostels should be added or used instead. The teacher says both views deserve a reasoned reply.',
  parts: [
    child('a', short({ t: 2, d: 3, c: 'understanding', marks: 1, stem: 'Which policy does Anvi favour?', model: '**Reservation** of places in education and jobs.', sol: 'She asks for reserved places.', scheme: [['Reservation', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'understanding', marks: 1, stem: 'Name one measure that Dev wants added or used instead.', model: '**Scholarships**, coaching or hostels (any one).', sol: 'He names three measures.', scheme: [['Any one measure named', 1]] })),
    child('c', short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Either** (i): State one reason that supports Anvi\'s view.', model: 'It aims to correct **long-standing disadvantage** and to make institutions **representative** of society.', sol: 'Anvi\'s own reasons.', scheme: [['Corrects long-standing disadvantage', 1], ['Makes institutions representative', 1]] }), [
      short({ t: 2, d: 5, c: 'evaluation', marks: 2, stem: '**Or** (ii): State one reason that supports Dev\'s view.', model: 'Children may lack **books and tutoring**, so **scholarships, coaching and hostels** give direct help that places alone do not supply.', sol: 'Dev\'s own reasons.', scheme: [['Places alone may not meet real needs', 1], ['Scholarships, coaching or hostels give direct help', 1]] }),
    ]),
  ],
}));
Q('c_table', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(An imagined table written by SOYL for practice; Veldmoor and the people are not real.)*',
  passage: '**Four situations in imagined Veldmoor**\n\n| Case | Situation |\n|---|---|\n| 1 | Kiran can lift heavier loads than Lila |\n| 2 | By custom, girls of one hamlet are not sent to the secondary school |\n| 3 | Mohan has a gift for languages and Nisha has a gift for numbers |\n| 4 | Farm workers of one community may draw water from the common well only after everyone else |',
  parts: [
    child('a', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which two cases are natural inequalities?', model: '**Cases 1 and 3**.', sol: 'Strength and talent are natural differences.', scheme: [['Cases 1 and 3', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which case shows discrimination on the ground of sex?', model: '**Case 2**.', sol: 'Girls are kept from school.', scheme: [['Case 2', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why can the inequality in Case 4 be changed by social action, unlike Case 3?', model: 'Case 4 comes from a **social arrangement**, a custom about the well, which people can change by rule or practice. Case 3 is a **natural** difference of talent, which is not made by society.', sol: 'Social arrangements can be changed.', scheme: [['Case 4 is a social arrangement that can be changed', 1], ['Case 3 is a natural difference', 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does a natural inequality, as in Case 1, not justify unequal rights?', model: 'Equality asks for **equal respect** and rights for all persons, so a difference of strength gives no ground for unequal **rights**. Only a relevant ground, such as **need or work**, may justify different treatment.', sol: 'Natural difference is not a ground for unequal rights.', scheme: [['Equal respect and rights regardless of natural differences', 1], ['Only relevant grounds justify different treatment', 1]] }),
    ]),
  ],
}));
