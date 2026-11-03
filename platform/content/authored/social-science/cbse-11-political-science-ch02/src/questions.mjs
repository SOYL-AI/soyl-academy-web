// CBSE 11 Political Science, ch02 Rights in the Indian Constitution: question bank. Every passage (newspaper report,
// letter, school debate, notice board) is written by SOYL and labelled as imagined; people, places, institutions and
// cases in scenarios are imagined. No NCERT text, boxed source, cartoon, Constitution text, speech, court judgment
// or board/sample-paper item is reused (D-036). Articles are cited by number with a paraphrase of what they provide.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Fundamental Rights
Q('m_bill', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A list of rights set out in a constitution, which the government is not allowed to violate, is described as a',
  opts: ['bill of rights', 'charter of duties', 'directive list', 'preamble clause'],
  sol: 'A bill of rights lists the basic rights of citizens and places them beyond the reach of ordinary government action. In India these are the Fundamental Rights of Part III. A list of duties, a set of directives and the Preamble do not play this role.',
}));
Q('m_justiciable', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Fundamental Rights are called justiciable. This means that',
  opts: ['a citizen can go to a court to have them enforced', 'they can be taken away only by a judge', 'they apply only to persons who have been tried in court', 'they are a list of goals for the government to pursue'],
  sol: 'Justiciable means enforceable by courts: a person whose right is violated can seek a remedy from a court. The other options misstate the term; goals for the government describe the Directive Principles, not Fundamental Rights.',
}));
Q('m_part3', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In which Part of the Constitution are the Fundamental Rights placed?',
  opts: ['Part III', 'Part I', 'Part IV', 'Part V'],
  sol: 'Fundamental Rights are in Part III. Part IV holds the Directive Principles; Part I deals with the Union and its territory, and Part V with the Union government.',
}));
Q('m_hotel', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The owner of Sagar Tea House in the imagined town of Pallavpur refuses to serve a customer because of the customer\'s caste. Which Fundamental Right is the owner\'s act against?',
  opts: ['Right to Equality', 'Right to Freedom of Religion', 'Right against Exploitation', 'Cultural and Educational Rights'],
  sol: 'The Right to Equality bars discrimination on grounds such as caste, and covers equal access to shops, restaurants and public places. No religion, forced labour or minority institution is involved, so the other rights are not the issue.',
}));
Q('m_untouch', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined village of Hariyal, a panchayat order bars families of one community from the common hand pump, calling them impure. The order is invalid mainly because the Constitution',
  opts: ['abolishes untouchability and forbids its practice in any form', 'gives every village the right to settle its own customs', 'makes water supply a Directive Principle only', 'allows restrictions on movement for reasons of custom'],
  sol: 'Article 17 abolishes untouchability, and its practice in any form is an offence. A village has no right to override this, and the Directive Principles do not permit such an order. Reasonable restrictions on movement concern public order and similar grounds, never custom.',
}));
Q('m_assembly', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Students of the imagined Lakshya College gather peacefully and without weapons in a hall to discuss library hours. Which freedom are they using?',
  opts: ['Freedom to assemble peacefully', 'Freedom to practise any profession', 'Freedom of residence in any part of the country', 'Freedom to move freely throughout the country'],
  sol: 'A peaceful meeting without arms is the exercise of the freedom of assembly under Article 19. Profession, residence and movement are other freedoms in the same Article but are not involved here.',
}));
Q('m_reasonable', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A district authority in the imagined town of Kharbagh limits loudspeakers to before ten at night near a hospital. A shopkeeper objects that this violates the freedom of speech. Which reading is closest to the Constitution?',
  opts: ['The freedom is real but not absolute; it can face reasonable restrictions such as public order', 'The freedom of speech is absolute and cannot be limited in any way', 'Speech made by a shopkeeper is outside the freedoms of Article 19', 'Only the Supreme Court can limit speech in any place'],
  sol: 'Article 19 freedoms are subject to reasonable restrictions on grounds such as public order, decency and security of the State. A timing rule for noise near a hospital can be a reasonable restriction. The freedom is not absolute, it belongs to every citizen, and restrictions are made by law and not only by the Supreme Court.',
}));
Q('m_21a', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Article 21A, which provides for free and compulsory education, covers children in the age group of',
  opts: ['6 to 14 years, added by the 86th Amendment in 2002', '3 to 18 years, added by the 42nd Amendment in 1976', '6 to 14 years, added by the 44th Amendment in 1978', '5 to 16 years, present from the start in 1950'],
  sol: 'Article 21A covers children aged 6 to 14 and was inserted by the 86th Amendment (2002). The 42nd Amendment added the Fundamental Duties and the 44th removed the right to property; neither added this Article, and the age band is not 3 to 18 or 5 to 16.',
}));
Q('m_arrest', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined town of Tirunagar, Kavita\'s brother is arrested at noon on Monday and kept at a police post until Wednesday evening without being taken before any magistrate. Which safeguard has been disregarded?',
  opts: ['The safeguard of being produced before a magistrate within twenty-four hours of arrest', 'The right to be given a government job after release', 'The right to a free hearing within seven days', 'The right to choose which court will try the case'],
  sol: 'Article 22 requires that an arrested person be produced before the nearest magistrate within twenty-four hours, excluding travel time, and be told the grounds of arrest. The other options are rights that do not exist in the Constitution.',
}));
Q('m_preventive', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement describes preventive detention?',
  opts: ['Detaining a person on suspicion that he or she may act in a way harmful to security or public order', 'Detaining a person after conviction for a serious crime', 'Detaining a person for questioning for no more than an hour', 'Detaining a person only after a magistrate finds him or her guilty'],
  sol: 'Preventive detention allows detention to stop a feared act in future, not to punish a past one, and it is hedged by safeguards in Article 22. Detention after conviction is punishment, and the other options describe ordinary custody or a guilty verdict, which are different.',
}));
Q('m_kiln', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A contractor in the imagined district of Naharpur makes labourers work long hours without pay to settle an old debt and does not let them leave. Which Fundamental Right is violated?',
  opts: ['Right against Exploitation', 'Right to Constitutional Remedies', 'Cultural and Educational Rights', 'Right to Freedom of Religion'],
  sol: 'Forced and unpaid labour, called begar, and traffic in human beings are banned by Articles 23 and 24 under the Right against Exploitation. The Right to Constitutional Remedies is how a victim would seek relief, not the right that was violated.',
}));
Q('m_childwork', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A firecracker unit in the imagined town of Agnipur employs a twelve-year-old to pack explosive powder. Which provision does this go against?',
  opts: ['The ban on employing children below 14 in factories and hazardous work', 'The right of children to attend school only after age 14', 'The freedom of children to choose any profession', 'The right of minors to run an educational institution'],
  sol: 'Article 24 prohibits employing children below 14 in factories, mines and other hazardous work. Choosing a profession is a freedom of citizens that does not make hazardous child work lawful, and the other two statements are not constitutional provisions.',
}));
Q('m_prayer', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A government-funded school in the imagined town of Devgarh requires all pupils, whatever their faith, to join a daily worship of one religion. Which right is affected?',
  opts: ['Right to Freedom of Religion', 'Right to Equality before law', 'Right to Constitutional Remedies', 'Right against Exploitation'],
  sol: 'Article 28 says no one can be compelled to take part in religious instruction or worship in an institution funded wholly by the State. This belongs to the Right to Freedom of Religion. Equality and exploitation are not the central issue, and Article 32 is only the remedy.',
}));
Q('m_minority', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A linguistic community living in the imagined district of Sundari wants to set up its own school to keep its mother tongue and script alive. Which right supports this?',
  opts: ['Cultural and Educational Rights', 'Right to Freedom, because of the freedom of profession', 'Right against Exploitation', 'Right to Equality in public employment'],
  sol: 'Articles 29 and 30 protect the language, script and culture of any section of citizens and let minorities, religious or linguistic, set up and run educational institutions. Freedom of profession and public employment concern different matters.',
}));
Q('m_art32', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which Article lets a person approach the Supreme Court directly when a Fundamental Right is violated?',
  opts: ['Article 32', 'Article 14', 'Article 21', 'Article 44'],
  sol: 'Article 32 is the Right to Constitutional Remedies. Article 14 is equality before law, Article 21 protects life and personal liberty, and Article 44 is a Directive Principle.',
}));
Q('m_ambedkar', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Dr B. R. Ambedkar regarded Article 32 as the most important Article because',
  opts: ['without a way to enforce them, the other rights would remain mere declarations', 'it lists all the rights that citizens may claim', 'it keeps the Supreme Court free from the government', 'it gives Parliament power to amend every right'],
  sol: 'A right is only as strong as the remedy behind it; Article 32 gives that remedy, so it makes the other rights real. It does not itself list the rights, it is not about judicial independence, and it does not give Parliament such a power.',
}));
Q('m_habeas', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Meena of the imagined town of Raighat says that her son has been held by police in an unknown place for three days with no charge. Which writ should she seek?',
  opts: ['Habeas corpus', 'Mandamus', 'Quo warranto', 'Certiorari'],
  sol: 'Habeas corpus, meaning to have the body, orders that a detained person be produced before the court so the legality of the detention can be examined. Mandamus orders an official to do a duty, quo warranto questions a public office, and certiorari quashes an order of a lower body.',
}));
Q('m_mandamus', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The registrar of the imagined municipality of Vikrampur keeps refusing, without any reason, to issue a birth certificate that the law requires him to issue. The High Court orders him to perform this duty. This is a writ of',
  opts: ['mandamus', 'prohibition', 'habeas corpus', 'quo warranto'],
  sol: 'Mandamus, meaning we command, directs a public official to perform a legal duty. Prohibition stops a lower court from exceeding its authority, habeas corpus concerns a person in detention, and quo warranto questions the right to hold a public post.',
}));
Q('m_prohib', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'A revenue tribunal in the imagined district of Mehrpur begins to try a criminal case that the law does not allow it to hear. Before it passes any order, the High Court directs it to stop. Which writ, and what does it do?',
  opts: ['Prohibition, which stops a lower body from going beyond its jurisdiction', 'Certiorari, which cancels an order the lower body has already passed', 'Mandamus, which orders a lower body to act', 'Quo warranto, which removes a member from his office'],
  sol: 'Prohibition is issued while proceedings are on, to stop a lower court or tribunal from acting beyond its authority. Certiorari comes after an order has been passed and quashes it. Mandamus compels action and quo warranto questions a person\'s right to an office, so neither fits.',
}));
Q('m_quo', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A petitioner in the imagined state of Dharmapur argues that the person named vice-chancellor of a state university lacks the qualifications that the law requires for the post. Which writ asks by what authority the person holds the office?',
  opts: ['Quo warranto', 'Habeas corpus', 'Mandamus', 'Prohibition'],
  sol: 'Quo warranto means by what authority; it tests whether a person holds a public office lawfully, and the court can remove one who does not qualify. Habeas corpus relates to detention, mandamus to a duty, and prohibition to a lower court exceeding its power.',
}));
Q('m_property', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement about the right to property is correct today?',
  opts: ['It is a legal right under Article 300A, no longer a Fundamental Right', 'It is a Fundamental Right under Article 19', 'It has been removed from the Constitution altogether', 'It is a Directive Principle of State Policy'],
  sol: 'The 44th Amendment (1978) removed the right to property from the Fundamental Rights, and Article 300A now says that no person can be deprived of property except by authority of law. It still remains a constitutional right of a legal kind, so it was not scrapped, and it is not in Part IV.',
}));
Q('m_nhrc', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement fits the National Human Rights Commission, set up in 1993?',
  opts: ['It inquires into violations of human rights and recommends action, but cannot itself punish', 'It tries and punishes officials who violate Fundamental Rights', 'It decides disputes between the Union and the States', 'It issues writs to enforce Fundamental Rights'],
  sol: 'The Commission is a statutory body that investigates complaints, studies safeguards and recommends action. It does not punish, since punishing and issuing writs belong to courts, and it does not settle disputes between governments.',
}));

// ---------------------------------------------------------------- t02 Directive Principles and Duties
Q('m_dp_nature', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Directive Principles of State Policy are called non-justiciable. This means that',
  opts: ['courts cannot enforce them, though they are fundamental in governance', 'they have no force in law or in the work of government', 'they can be enforced only by the Supreme Court', 'they apply only to private citizens and not to the State'],
  sol: 'Non-justiciable means that a person cannot ask a court to enforce them. They are still described as fundamental in governing the country, and they are addressed to the State, so they are neither without force nor limited to the Supreme Court.',
}));
Q('m_panchayat', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined state of Marenpur passes a law to strengthen village councils and give them powers of self-government. Which kind of provision does this reflect?',
  opts: ['A Directive Principle, on organising village panchayats', 'A Fundamental Right, on freedom of association', 'A Fundamental Duty, on safeguarding public property', 'A writ, on enforcing a duty of an official'],
  sol: 'Organising village panchayats is one of the Directive Principles of Part IV. Freedom of association is a different right of individuals, a duty binds citizens and is not a law of a state, and a writ is a court order.',
}));
Q('m_dp_group', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A manifesto in the imagined state of Ranjan promises equal pay for men and women who do the same work. Among the commonly taught groups of Directive Principles, this belongs among the',
  opts: ['non-justiciable rights', 'goals of the State', 'policies on personal law', 'Fundamental Duties'],
  sol: 'Equal pay for equal work for men and women is usually placed among the non-justiciable rights, with the right to work and an adequate livelihood. Goals are broad aims such as justice and peace, policies cover matters such as personal law and village councils, and duties bind citizens.',
}));
Q('m_fr_dp', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which statement best brings out how the Fundamental Rights and the Directive Principles differ?',
  opts: ['Fundamental Rights restrain the government, while Directive Principles direct it', 'Fundamental Rights direct the government, while Directive Principles restrain it', 'Both can be enforced in court in the same way', 'Only Directive Principles protect individuals against the State'],
  sol: 'Rights are limits on what government may do and are enforced by courts. Directive Principles point the government towards goals and cannot be enforced in court. The other options reverse this or blur it.',
}));
Q('m_land', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why did early land reform laws, which aimed at fairer sharing of land, run into trouble in court?',
  opts: ['Landowners claimed that the laws violated their right to property, a Fundamental Right at the time', 'Land reform was prohibited by the Directive Principles', 'The Directive Principles had no place in any law', 'The Constitution gave states no power over land'],
  sol: 'Laws aimed at fairer distribution (a Directive Principle goal) clashed with the then Fundamental Right to property, and the conflict led to amendments. The Directive Principles in fact favour fair distribution, and they do guide law-making.',
}));
Q('m_harmony', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'In discussions of the two parts of the Constitution, the Minerva Mills case (1980) is cited for the idea that',
  opts: ['the Fundamental Rights and Directive Principles must be balanced and read in harmony', 'the Directive Principles override every Fundamental Right', 'the Fundamental Rights may be removed by simple majority', 'the Directive Principles can be enforced by any citizen in court'],
  sol: 'The case is cited for the view that the two parts are to be harmonised, with neither wholly overriding the other. The other options either give one part total priority or say rights can be removed with ease, which is not how the courts have read the Constitution.',
}));
Q('m_42', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Fundamental Duties were added to the Constitution by which Amendment?',
  opts: ['The 42nd Amendment, 1976', 'The 44th Amendment, 1978', 'The 86th Amendment, 2002', 'The 1st Amendment, 1951'],
  sol: 'The 42nd Amendment (1976) introduced Article 51A with ten duties. The 44th removed the right to property from Part III, and the 86th added Article 21A and the eleventh duty.',
}));
Q('m_duty_env', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Students of the imagined Chinar School remove plastic waste from the banks of their town stream and plant saplings there. Which Fundamental Duty are they acting on?',
  opts: ['To protect and improve the natural environment', 'To defend the country when called upon', 'To respect the National Flag and the Anthem', 'To provide opportunities for education to a child'],
  sol: 'Cleaning a stream and planting saplings is protecting and improving the natural environment, a duty under Article 51A. The other duties concern defending the country, respecting national symbols and, for parents or guardians, education of children.',
}));
Q('m_duty_enf', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which statement about the Fundamental Duties is correct?',
  opts: ['They are moral and civic obligations of citizens, not enforceable in the way rights are', 'They are enforceable by writs like the Fundamental Rights', 'They bind only the government and not the citizen', 'They are listed in Part III with the Fundamental Rights'],
  sol: 'Article 51A states duties of citizens, and unlike rights it does not by itself create a court remedy. It sits in Part IVA, not in Part III, and it is addressed to citizens.',
}));
Q('m_11th', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The eleventh Fundamental Duty, added in 2002, requires',
  opts: ['a parent or guardian to provide opportunities for education to a child aged 6 to 14', 'every citizen to pay taxes on time', 'every citizen to vote in each election', 'the State to give free housing to all'],
  sol: 'The 86th Amendment (2002) added this duty alongside Article 21A. Paying taxes and voting are not listed as duties in Article 51A, and giving housing is not a duty of citizens.',
}));
Q('m_ecce', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The government of the imagined state of Taralpur opens free play-and-learn centres for children below six. This is the carrying out of',
  opts: ['a Directive Principle on early childhood care and education', 'Article 21A, a Fundamental Right of children below six', 'a Fundamental Duty of every citizen', 'a writ of mandamus against the State'],
  sol: 'Early childhood care and education for children below six is a Directive Principle. Article 21A, in contrast, covers ages 6 to 14 and is a Fundamental Right. A duty binds citizens, and mandamus is a court order.',
}));
Q('m_court_dp', mcq({
  t: 2, d: 4, c: 'application',
  stem: 'Shanta of the imagined village of Bhoomipur asks a court to order her state to set up cottage-industry centres, relying only on a Directive Principle. What is the likely position?',
  opts: ['The court cannot enforce the principle directly, though the government is expected to follow it in policy', 'The court must order the centres to be set up at once', 'The petition fails because the principle has no value in governance', 'The petition must be heard first by Parliament'],
  sol: 'Directive Principles are non-justiciable, so a court will not compel the State to act on one alone. They are still meant to guide laws and policy. The court is not required to order the centres, and Parliament does not decide such petitions.',
}));
Q('m_dp_goal', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is a goal among the Directive Principles?',
  opts: ['Fair distribution of resources among the people', 'Freedom to profess any religion', 'Protection against arrest without information of grounds', 'Right to move the Supreme Court'],
  sol: 'Fair distribution of resources, social and economic justice and international peace are goals of the Directive Principles. The remaining options are Fundamental Rights from Articles 25, 22 and 32.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_justiciable', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'A person whose Fundamental Right is violated can seek relief from a court.',
  r: 'Fundamental Rights are justiciable, and Article 32 gives the right to approach the Supreme Court.',
  sol: 'Both statements are true, and R explains A: because the rights are justiciable and Article 32 provides a remedy, a court can be approached.',
}));
Q('ar_restrict', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The freedom of speech and expression is not absolute.',
  r: 'The Constitution allows reasonable restrictions on the Article 19 freedoms in the interest of matters such as public order.',
  sol: 'Both are true, and R explains A: since restrictions on grounds like public order are allowed, the freedom has limits.',
}));
Q('ar_property', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'The right to property is no longer a Fundamental Right.',
  r: 'The 44th Amendment of 1978 removed it from Part III and made it a legal right under Article 300A.',
  sol: 'Both are true, and R explains A: the 44th Amendment is the reason the right stands outside Part III today.',
}));
Q('ar_dp_force', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A court cannot order the government to carry out a Directive Principle on its own.',
  r: 'Directive Principles play no part in governing the country.',
  sol: 'A is true because the principles are non-justiciable. R is false: they are described as fundamental in the governance of the country and guide policy and law-making.',
}));
Q('ar_duties', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Fundamental Duties can be enforced through writs in the same way as Fundamental Rights.',
  r: 'Fundamental Duties were added to the Constitution by the 42nd Amendment in 1976.',
  sol: 'A is false: duties are obligations of citizens that are not enforceable like rights. R is true, since the 42nd Amendment of 1976 added them.',
}));
Q('ar_art24', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Article 24 forbids employing children below 14 in factories, mines and hazardous work.',
  r: 'The Fundamental Rights are placed in Part III of the Constitution.',
  sol: 'Both are true, but the place of the rights in Part III does not explain why Article 24 bans child labour in hazardous work; the reason is the aim of preventing exploitation.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_art32', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'The right to move the courts for enforcement of Fundamental Rights is itself listed among the Fundamental Rights.',
  sol: 'Article 32, the Right to Constitutional Remedies, is itself a Fundamental Right in Part III.',
}));
Q('tf_titles', tf({
  t: 1, d: 2, c: 'recall', ans: false,
  stem: 'Article 18 allows the State to confer hereditary titles of nobility on citizens.',
  sol: 'Article 18 abolishes titles, with limited exceptions for military and academic distinctions; hereditary titles are not conferred.',
}));
Q('tf_dp_court', tf({
  t: 2, d: 1, c: 'recall', ans: false,
  stem: 'Directive Principles can be enforced by a court like Fundamental Rights.',
  sol: 'Directive Principles are non-justiciable; courts do not enforce them directly.',
}));
Q('tf_property_art31', tf({
  t: 1, d: 3, c: 'application', ans: false,
  stem: 'A landowner in the imagined state of Kothapur says that her right to property is still protected as a Fundamental Right under Part III.',
  sol: 'The right to property was removed from Part III in 1978; it is now a legal right under Article 300A, not a Fundamental Right.',
}));
Q('fb_quo', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The writ of ___ asks a person holding a public office by what authority he or she holds it.',
  acc: [['quo warranto']],
  sol: 'Quo warranto means by what authority; a court issues it to test the legality of a claim to a public office.',
}));
Q('fb_parts', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The Fundamental Rights are in Part ___ and the Directive Principles in Part ___ of the Constitution.',
  acc: [['III', '3', 'three'], ['IV', '4', 'four']],
  sol: 'Part III holds the Fundamental Rights, and Part IV (Articles 36 to 51) holds the Directive Principles.',
}));
Q('fb_42', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The ___ Amendment, passed in 1976, added the Fundamental Duties through Article 51A.',
  acc: [['42nd', '42', 'forty-second', 'forty second']],
  sol: 'The 42nd Amendment of 1976 added Article 51A, which began with ten duties.',
}));
Q('mt_cats', match({
  t: 1, d: 2, c: 'recall', marks: 3,
  stem: 'Match each group of Articles with the Fundamental Right it forms.',
  pairs: [
    ['Articles 14 to 18', 'Right to Equality'],
    ['Articles 19 to 22', 'Right to Freedom'],
    ['Articles 23 and 24', 'Right against Exploitation'],
    ['Articles 25 to 28', 'Right to Freedom of Religion'],
    ['Articles 29 and 30', 'Cultural and Educational Rights'],
    ['Article 32', 'Right to Constitutional Remedies'],
  ],
  sol: 'These are the six categories of Fundamental Rights, in the order of their Articles.',
}));
Q('mt_writs', match({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each writ with what it does.',
  pairs: [
    ['Habeas corpus', 'Orders that a detained person be produced before the court'],
    ['Mandamus', 'Orders a public official to perform a legal duty'],
    ['Prohibition', 'Stops a lower court from acting beyond its power'],
    ['Quo warranto', 'Asks by what authority a person holds a public office'],
  ],
  sol: 'Each writ has its own purpose; certiorari, the fifth writ, quashes an order of a lower body.',
}));
Q('ord_timeline', ord({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these developments in the order in which they took place.',
  items: [
    'Fundamental Duties are added to the Constitution',
    'The right to property is removed from the Fundamental Rights',
    'The National Human Rights Commission is set up',
    'Article 21A is inserted for children aged 6 to 14',
  ],
  sol: 'The duties came in 1976, the property change in 1978, the Commission in 1993 and Article 21A in 2002.',
}));
Q('ord_remedy', ord({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Arrange these steps in the order in which they would happen when a citizen\'s Fundamental Right is violated.',
  items: [
    'An official or authority violates the person\'s right',
    'The person approaches the High Court or the Supreme Court',
    'The court hears the case and issues a suitable writ',
    'The authority is bound to obey the court\'s order',
  ],
  sol: 'A violation comes first, followed by the petition, the hearing with a writ, and finally compliance.',
}));

// ================================================================ short answers
Q('s_define_fr', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What are Fundamental Rights? Why are they called justiciable?',
  model: '**Fundamental Rights** are the basic rights of citizens listed in **Part III** of the Constitution, which the government cannot violate. They are **justiciable**, meaning a court can **enforce** them when they are violated.',
  sol: 'A definition (Part III, basic rights) and the meaning of justiciable.',
  scheme: [['Definition: basic rights in Part III', 1], ['Justiciable means enforceable by courts', 1]],
}));
Q('s_two_writs', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain any two writs that the Supreme Court and the High Courts can issue.',
  model: '**Habeas corpus** orders that a person held in custody be produced before the court so the legality of the detention can be examined. **Mandamus** directs a public official or body to perform a legal duty that it has failed to perform.',
  sol: 'Any two of the five writs, each with a standard meaning.',
  scheme: [['First writ explained', 1], ['Second writ explained', 1]],
}));
Q('s_dp_def', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are the Directive Principles of State Policy? State why a court cannot enforce them.',
  model: 'The **Directive Principles** in **Part IV** are guidelines for the government in making laws and policies, aimed at justice and welfare. They are **non-justiciable**: a court cannot enforce them, though they are **fundamental in the governance** of the country.',
  sol: 'Definition of the principles and the meaning of non-justiciable.',
  scheme: [['Guidelines to the State in Part IV', 1], ['Non-justiciable, not enforceable by courts', 1]],
}));
Q('s_exploit', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two things that the Right against Exploitation prohibits.',
  model: 'It prohibits **traffic in human beings** and **begar**, or forced labour, under Article 23. It also prohibits **employing children below 14** in factories, mines and hazardous work, under Article 24.',
  sol: 'Any two of the prohibitions in Articles 23 and 24.',
  scheme: [['First prohibition', 1], ['Second prohibition', 1]],
}));
Q('s_property', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How has the status of the right to property changed since 1978?',
  model: 'The **44th Amendment (1978)** removed the right to property from the **Fundamental Rights**. It is now a **legal right** under **Article 300A**: a person cannot be deprived of property except by authority of law.',
  sol: 'The 1978 removal from Part III and the present status.',
  scheme: [['Removed from Fundamental Rights by the 44th Amendment (1978)', 1], ['Now a legal right under Article 300A', 1]],
}));
Q('s_duties_two', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Mention any two Fundamental Duties of a citizen.',
  model: 'A citizen has the duty to **respect the Constitution, the National Flag and the Anthem**. A citizen also has the duty to **protect and improve the natural environment** and to **safeguard public property**.',
  sol: 'Any two duties from Article 51A, each stated in a sentence.',
  scheme: [['First duty', 1], ['Second duty', 1]],
}));
Q('s_diff', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give two differences between the Fundamental Rights and the Directive Principles.',
  model: 'Fundamental Rights are **justiciable** and enforced by courts, but Directive Principles are **non-justiciable**. Rights **restrain** the government and protect individuals, while the principles **direct** the government to promote the welfare of society.',
  sol: 'Two differences, such as enforceability and purpose.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s_21a_when', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'What does Article 21A provide, and which Amendment inserted it?',
  model: '**Article 21A** gives children aged **6 to 14** a Fundamental Right to free and compulsory education. It was inserted by the **86th Amendment**, passed in **2002**.',
  sol: 'The content of the Article and the Amendment with its year.',
  scheme: [['Free and compulsory education for children aged 6 to 14', 1], ['86th Amendment, 2002', 1]],
}));
Q('s_nhrc', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the role of the National Human Rights Commission, set up in 1993.',
  model: 'The **National Human Rights Commission** inquires into complaints of **violation of human rights** and **recommends** action to the authorities. It also spreads awareness and studies safeguards, but it cannot itself punish.',
  sol: 'Inquiry and recommendation, with awareness work.',
  scheme: [['Inquires into violations of human rights', 1], ['Recommends action; no power to punish', 1]],
}));
Q('s_restrict', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Explain, with the example of a procession in the imagined town of Mehkar, why the freedoms of Article 19 are subject to reasonable restrictions.',
  model: 'A procession in **Mehkar** can be asked to follow a route and a time fixed by the authorities. The freedoms are **not absolute**; they can be limited by **reasonable restrictions** for **public order** and the security of the State, so that one person\'s freedom does not harm others.',
  sol: 'An application to the example and the reason for restrictions.',
  scheme: [['Freedoms are not absolute; reasonable restrictions apply', 1], ['Relates to the example and a ground such as public order', 1]],
}));
Q('s_cert', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'The High Court of the imagined state of Gomtipur hears two petitions. In one it stops a tribunal midway; in the other it cancels an order already passed. Distinguish between the writs of prohibition and certiorari that these show.',
  model: '**Prohibition** is issued by a higher court to stop a lower court or tribunal from going beyond its jurisdiction while proceedings are on. **Certiorari** is issued after the lower body has passed an order, and it **quashes** that order.',
  sol: 'Prohibition stops proceedings; certiorari quashes an order already made.',
  scheme: [['Prohibition stops proceedings beyond jurisdiction', 1], ['Certiorari quashes an order already passed', 1]],
}));
Q('s3_equality', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three provisions of the Right to Equality (Articles 14 to 18).',
  model: '1. **Equality before law:** all persons receive equal protection of the laws.\n2. **No discrimination** by the State on grounds of religion, race, caste, sex or place of birth, and **equal opportunity** in public employment.\n3. **Abolition of untouchability** (Article 17) and of **titles** (Article 18).',
  sol: 'Three provisions from the Articles, each stated.',
  scheme: [['First provision', 1], ['Second provision', 1], ['Third provision', 1]],
}));
Q('s3_freedoms', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'List and explain any three freedoms guaranteed by Article 19, with the limit on them.',
  model: 'Article 19 guarantees freedom of **speech and expression**, to **assemble peacefully**, to form **associations**, to **move freely** and **reside** anywhere, and to follow a **profession**. Any of these may be limited by **reasonable restrictions** on grounds such as public order.',
  sol: 'Three named freedoms and the note on restrictions.',
  scheme: [['Three freedoms named', 2], ['Reasonable restrictions mentioned', 1]],
}));
Q('s3_arrest', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'A man is arrested in the imagined town of Nandanpur. State three safeguards that the Constitution gives him.',
  model: 'He must be **told the grounds** of his arrest. He has the right to **consult a lawyer** of his choice. He must be **produced before a magistrate within twenty-four hours** of arrest, excluding the time of travel, and cannot be held longer without the magistrate\'s order.',
  sol: 'Three of the safeguards of Article 22 for an ordinary arrest.',
  scheme: [['Informed of the grounds', 1], ['Right to a lawyer', 1], ['Produced before a magistrate within 24 hours', 1]],
}));
Q('s3_religion', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three features of the Right to Freedom of Religion (Articles 25 to 28).',
  model: 'Every person may **profess, practise and propagate** a religion, subject to public order, morality and health. Religious groups may **manage their own affairs**. **No one can be forced to pay a tax** for a religion, and **no compulsory religious instruction** is allowed in an institution wholly funded by the State.',
  sol: 'Any three features from Articles 25 to 28.',
  scheme: [['Freedom to profess, practise and propagate, with limits', 1], ['Management of religious affairs', 1], ['No compulsion: tax or instruction', 1]],
}));
Q('s3_dp_groups', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the three groups into which the Directive Principles are commonly classified, with one example of each.',
  model: '**Goals:** broad aims such as social, economic and political justice and international peace. **Policies:** guides for laws, for example organising village panchayats and promoting cottage industries. **Non-justiciable rights:** claims such as equal pay for equal work for men and women, an adequate livelihood and the right to work.',
  sol: 'Goals, policies and non-justiciable rights, each with an example.',
  scheme: [['Goals with an example', 1], ['Policies with an example', 1], ['Non-justiciable rights with an example', 1]],
}));
Q('s3_conflict', short({
  t: 2, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain how the relation between Fundamental Rights and Directive Principles led to conflicts and how the courts have approached it.',
  model: '**Conflict arose** where measures for a fairer distribution of resources, a Directive Principle goal, clashed with the then right to **property**, so laws on **land reform** were challenged and amendments followed. Over time the courts, as in the **Minerva Mills** case (1980), have tried to **read the two in harmony**, giving neither complete priority.',
  sol: 'The source of conflict, the effect (amendments) and the later harmonising approach.',
  scheme: [['Conflict over property and land reform', 1], ['Amendments followed', 1], ['Courts read the two in harmony', 1]],
}));
Q('s3_duties', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Write three points about the Fundamental Duties.',
  model: 'They were added by the **42nd Amendment (1976)** as **Article 51A**, with ten duties; an eleventh was added by the **86th Amendment (2002)**. Examples are respecting the Constitution and the National Flag, protecting the environment and developing a scientific temper. Unlike rights, they are **not enforceable** in the same way.',
  sol: 'Origin, examples and the question of enforceability.',
  scheme: [['Added by the 42nd Amendment, with the 86th adding an eleventh', 1], ['Examples of duties', 1], ['Not enforceable like rights', 1]],
}));

// ================================================================ long answers
Q('l_freedom', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the Right to Freedom, covering Articles 19 to 22 in your own words.',
  model: '1. **Article 19** gives citizens freedom of speech and expression, assembly, association, movement, residence and profession.\n2. These are subject to **reasonable restrictions** for public order and security.\n3. **Protection in respect of conviction** (Article 20) shields a person from unfair punishment.\n4. **Article 21** protects life and personal liberty, and **Article 21A** gives children aged 6 to 14 free and compulsory education.\n5. **Article 22** guards against arbitrary arrest: grounds, a lawyer, a magistrate within 24 hours, with a special rule for **preventive detention**.',
  sol: 'Cover the freedoms, restrictions, Articles 20 and 21, 21A and 22.',
  scheme: [['Freedoms under Article 19', 1], ['Reasonable restrictions', 1], ['Articles 20 and 21', 1], ['Article 21A, its age group and the 86th Amendment', 1], ['Article 22 safeguards and preventive detention', 1]],
}));
Q('l_writs', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the five writs that can be issued for the enforcement of Fundamental Rights, and the courts that may issue them.',
  model: 'The **Supreme Court** (Article 32) and the **High Courts** (Article 226) may issue writs. 1. **Habeas corpus:** produce a detained person. 2. **Mandamus:** compel an official to do a legal duty. 3. **Prohibition:** stop a lower court acting beyond its power. 4. **Quo warranto:** ask by what authority a public office is held. 5. **Certiorari:** quash an order of a lower body made without authority.',
  sol: 'One mark for each writ, with the courts mentioned within the answer.',
  scheme: [['Habeas corpus, with the Supreme Court and High Courts', 1], ['Mandamus', 1], ['Prohibition', 1], ['Quo warranto', 1], ['Certiorari', 1]],
}));
Q('l_fr_dp', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'A class of Chinar School prepares a chart for Constitution Day. Help them by comparing the Fundamental Rights with the Directive Principles of State Policy on five points: part, enforceability, role, beneficiary and relation.',
  model: '1. **Part:** the rights are placed in **Part III** and the principles in **Part IV** of the Constitution.\n2. **Enforceability:** rights are **justiciable**, so a court can enforce them; principles are **non-justiciable**.\n3. **Role:** rights **restrain** the government by saying what it may not do; principles **direct** it by saying what it should work for.\n4. **Beneficiary:** rights protect **individuals**; principles promote the **welfare of society**.\n5. **Relation:** conflicts arose, as over property and land reform, and the courts have tried to read the two in **harmony**.',
  sol: 'One mark for each point of comparison.',
  scheme: [['Part of the Constitution', 1], ['Enforceability', 1], ['Restrain versus direct', 1], ['Individual versus society', 1], ['Relation and harmony', 1]],
}));
Q('l_dp_kinds', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the meaning and the commonly taught groups of the Directive Principles, with examples.',
  model: '1. **Meaning:** guidelines in **Part IV** for laws and policy, **non-justiciable** but fundamental in governance.\n2. **Goals:** justice, a higher standard of living, fair distribution of resources, international peace.\n3. **Policies:** a **uniform civil code** as one listed principle, village panchayats, cottage industries.\n4. **Other policies:** prohibition of intoxicants and care of useful cattle.\n5. **Non-justiciable rights:** adequate livelihood, equal pay for equal work, right to work, early childhood care below six.',
  sol: 'Meaning plus the three groups, with named examples.',
  scheme: [['Meaning and non-justiciable nature', 1], ['Goals with examples', 1], ['Policies with examples', 1], ['Other policies with examples', 1], ['Non-justiciable rights with examples', 1]],
}));
Q('l_duties_eval', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Some students argue that the Fundamental Duties are pointless because no court can punish a citizen for failing to perform them. Evaluate this view.',
  model: '1. **Origin:** the duties came through the **42nd Amendment (1976)**, with an eleventh added in **2002**.\n2. **For the view:** they are **not enforceable** like rights, so there is no direct remedy.\n3. **Against:** they remind citizens that **rights go with responsibilities**.\n4. **Use:** courts and laws may refer to them while interpreting laws.\n5. **Judgement:** their value is moral and civic, so they matter even without punishment.',
  sol: 'A balanced evaluation with both sides and a reasoned conclusion.',
  scheme: [['Background to the duties', 1], ['Argument for the view', 1], ['Argument against the view', 1], ['Supporting example or use', 1], ['Reasoned judgement', 1]],
}));
Q('l_property', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Trace how the right to property moved from a Fundamental Right to a legal right and explain why it caused conflict.',
  model: '1. **At first** the right to property was a **Fundamental Right**.\n2. **Land reform** aimed at fair distribution of land, a Directive Principle goal.\n3. **Conflict:** landowners claimed that such laws violated their right, so **courts** struck some laws and **amendments** followed.\n4. The **44th Amendment (1978)** removed it from Part III.\n5. It is now a **legal right under Article 300A**: property can be taken only by authority of law.',
  sol: 'The earlier status, the conflict, the 1978 change and the present status.',
  scheme: [['Earlier status as Fundamental Right', 1], ['Land reform goal', 1], ['Conflict and amendments', 1], ['44th Amendment, 1978', 1], ['Present status under Article 300A', 1]],
}));

// ================================================================ case-based items (imagined passages)
Q('c_kiln', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; the place and the people are not real.)*',
  passage: '**From the Naharpur Weekly, imagined, issue of 4 March**\n\nTwelve labourers of the village of Sonkheda were found working at the Rampal brick kiln, where, they said, they had received no wages for eight months because of an old debt. The kiln owner would not let them leave. Their families reached the district town, where the lawyer Ritu Sharma filed a petition in the High Court. The court ordered the kiln owner to produce the labourers before it, and the labourers were freed within a week.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Identify the Fundamental Right that the kiln owner violated.', model: '**Right against Exploitation**, since the labourers were held in forced, unpaid labour (begar).', sol: 'Forced labour falls under Articles 23 and 24.', scheme: [['Right against Exploitation', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Under which Article can a High Court issue writs to enforce Fundamental Rights?', model: '**Article 226**.', sol: 'The High Courts have this power under Article 226, and the Supreme Court under Article 32.', scheme: [['Article 226', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Name the writ that the High Court used here and explain what it does.', model: 'The court used **habeas corpus**: it orders that a person who is held against his or her will be **produced before the court**, so that the legality of the confinement can be examined and the person freed if it is unlawful.', sol: 'Name the writ and give its standard meaning.', scheme: [['Habeas corpus named', 1], ['What it does', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why is the Right to Constitutional Remedies important for the labourers\' other rights?', model: 'Without a way to **enforce** a right, it would be only a statement on paper. **Article 32** and the High Courts under Article 226 give the labourers a **remedy**, so their other rights become real and can be protected by the **courts**.', sol: 'Link the remedy to the real protection of the other rights.', scheme: [['A right needs a remedy to be real', 1], ['Courts can enforce the rights through writs', 1]] }),
    ]),
  ],
}));
Q('c_debate', caseQ({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the school debate and answer the questions that follow. *(An imagined debate written by SOYL for practice; the school and the speakers are not real.)*',
  passage: '**Imagined inter-house debate at Chinar School: Should the Directive Principles be made enforceable by courts?**\n\nAnaya: If the government promised equal pay for equal work for men and women, a woman denied it should be able to go to a court.\n\nKabir: But the Directive Principles are goals for the government. Many need money and years of planning. A court cannot build centres and schools overnight.\n\nAnaya: Then at least the government should be asked why it is not trying.\n\nKabir: The government is already expected to follow them in making laws. The voters can judge its record.\n\nThe moderator thanked both speakers and asked the audience to weigh the reasons.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which feature of the Directive Principles is the subject of this debate?', model: 'They are **non-justiciable**: courts cannot enforce them.', sol: 'The debate asks whether they should be made enforceable, which presupposes that they are not.', scheme: [['Non-justiciable', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the Directive Principle that Anaya mentions.', model: '**Equal pay for equal work** for men and women.', sol: 'It is among the non-justiciable rights in Part IV.', scheme: [['Equal pay for equal work', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Give two reasons why Kabir thinks the principles should not be enforced by courts.', model: 'They are **goals** that need **money, planning and time**, which a court cannot supply. The government is already expected to follow them in making laws, and the **voters** can judge how well it does so.', sol: 'Two of Kabir\'s reasons, taken from the debate.', scheme: [['First reason', 1], ['Second reason', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): State one point on which Anaya\'s view is reasonable and one on which Kabir\'s is, and say which you find stronger.', model: 'Anaya is right that people **denied a promised benefit** may want a remedy. Kabir is right that many principles are **goals that depend on resources and policy choices**. A balanced reply may prefer the view that the government must follow them in policy, while courts **read them together with rights**.', sol: 'One point for each speaker and a reasoned preference.', scheme: [['A point for Anaya and one for Kabir', 1], ['A reasoned preference', 1]] }),
    ]),
  ],
}));
Q('c_letter', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; the writer and the town are not real.)*',
  passage: '**An imagined letter to the editor of the Raighat Courier**\n\nSir, my neighbour Mr Iqbal Dhar was taken from his shop by the police on Monday morning. For two nights no one told his family why. On Wednesday afternoon, they were told that he was held on the suspicion that he might disturb public order in the coming week and that no charge had been filed. We have asked to see a lawyer, but we are told this is not needed. I wish to ask whether this is permitted.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Which Article protects people against arbitrary arrest and detention?', model: '**Article 22**.', sol: 'Article 22 sets out the safeguards on arrest and detention.', scheme: [['Article 22', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which safeguard for an arrested person does the letter say was missing for two nights?', model: 'The person was not **informed of the grounds** of the arrest (and was not produced before a magistrate).', sol: 'Either missing safeguard, informing of the grounds or production before a magistrate within twenty-four hours, is acceptable.', scheme: [['Grounds not told or not produced before a magistrate', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Name the kind of detention described in the letter and explain how it differs from detention after a trial.', model: 'It is **preventive detention**: detaining a person on suspicion of a possible future act harmful to public order. Detention after a trial is **punishment** for an offence already proved.', sol: 'Name the term and contrast it with punitive detention.', scheme: [['Preventive detention named and explained', 1], ['Contrasted with punishment after trial', 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Which writ could the family seek if the detention is unlawful, and which courts could issue it?', model: 'They could seek **habeas corpus**, which asks that the person be produced and the **legality** of the detention examined. It can be issued by the **High Court** under Article 226 or the **Supreme Court** under Article 32.', sol: 'The writ and the two courts.', scheme: [['Habeas corpus', 1], ['High Court and Supreme Court', 1]] }),
    ]),
  ],
}));
Q('c_board', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the notice and answer the questions that follow. *(An imagined notice written by SOYL for practice; the town and the council are not real.)*',
  passage: '**Imagined notice board of the Tarapur Town Council**\n\n1. The council will open a free reading room for children below six.\n2. Residents must keep the lake clean and not throw waste into it.\n3. Any resident may meet peacefully in the town hall, with prior booking.\n4. The council will prepare a plan to bring cottage industries to every ward.\n5. Every parent must see that a child aged 6 to 14 goes to school.',
  parts: [
    child('a', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which item of the notice is a Directive Principle: item 1 or item 3?', model: '**Item 1**: early childhood care and education below six is a Directive Principle.', sol: 'Item 3 concerns peaceful assembly, a Fundamental Right.', scheme: [['Item 1', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which item states a Fundamental Duty of parents: item 2 or item 5?', model: '**Item 5**: the duty of a parent to provide opportunities for education to a child aged 6 to 14, added in 2002.', sol: 'Item 2 is a civic duty about the environment, but item 5 is the one tied to parents.', scheme: [['Item 5', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain why item 4 cannot be enforced by a court, while item 3 can.', model: 'Item 4 promotes **cottage industries**, a Directive Principle that is **non-justiciable**. Item 3 reflects the Fundamental Right to **assemble peacefully**, which is **justiciable**, so a court can enforce it.', sol: 'Contrast a non-justiciable principle with a justiciable right.', scheme: [['Item 4 is non-justiciable', 1], ['Item 3 is a justiciable right', 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain how items 1 and 5 together relate Article 21A to the Directive Principles.', model: 'Item 1 covers children **below six**, under a Directive Principle, while item 5 covers ages **6 to 14**, which Article 21A makes a Fundamental Right. Together they show how care and learning are linked through both **principles and rights**.', sol: 'Contrast the two age groups and link them.', scheme: [['Below six is a Directive Principle; 6 to 14 is Article 21A', 1], ['The two work together', 1]] }),
    ]),
  ],
}));
