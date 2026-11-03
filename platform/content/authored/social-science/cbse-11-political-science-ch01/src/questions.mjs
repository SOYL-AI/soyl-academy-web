// CBSE 11 Political Science, ch01 Constitution: Why and How? — question bank. Every passage (newspaper report,
// letter, debate, panchayat meeting, table) is written by SOYL and labelled as imagined; no NCERT text, boxed
// source, cartoon, Constitution text, Assembly speech or board/sample-paper item is reused (D-036).
// Real-world facts are limited to stable, widely recorded dates and names.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Why a constitution
Q('m_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `Which statement gives the standard meaning of the term constitution?`,
  opts: [
    `The body of basic rules and principles on which a country's government is founded and run`,
    `A list of laws that the legislature passed in one particular year`,
    `A speech in which a head of state describes the plans of the government of the day`,
    `A set of orders issued by officials to settle one particular dispute`,
  ],
  sol: `A constitution is the country's fundamental set of rules and principles. A list of one year's laws, a speech and a set of orders for one dispute are all narrower and temporary, and none of them is the basic framework of government.`,
}));
Q('m_club', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Ten families in the imagined housing colony of Sundrapur agree to share one borewell and write down the hours in which each family may draw water. What does the written timetable give each family most directly?`,
  opts: [
    `Assurance about what the others will do, which allows minimal coordination`,
    `Protection against misuse of power by an elected government`,
    `An expression of the fundamental identity of the colony's people`,
    `A statement of who holds the power to make laws for the state`,
  ],
  sol: `A shared rule tells each family what the others will do, which is the first function of a constitution: minimal coordination and assurance. A borewell timetable does not restrain a government, express identity or allocate law-making power.`,
}));
Q('m_authority_who', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The imagined republic of Veloria has a constitution which states that laws are made by a two-house Parliament and that the government is formed from the party or group with a majority in the lower house. Which function of a constitution is mainly at work here?`,
  opts: [
    `Specifying who has the power to make decisions and how the government is constituted`,
    `Setting limits on the powers of the government`,
    `Expressing the fundamental identity of a people`,
    `Enabling the government to fulfil the aspirations of society`,
  ],
  sol: `Saying who makes laws and how a government is formed is the second function, the decision-making authority. Limits on power, identity and aspirations are the other functions and are not what this clause deals with.`,
}));
Q('m_limits', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The constitution of the imagined state of Kandar says that nobody may be kept in prison without being brought before a judge, even if the head of government orders it. This provision mainly performs which function?`,
  opts: [
    `Placing limits on the powers of government so that they are not used arbitrarily`,
    `Providing minimal coordination among members of society`,
    `Creating conditions for a just society by directing government action`,
    `Fixing which institution has the authority to make laws`,
  ],
  sol: `A rule that even the head of government must follow restrains official power, which is the third function of a constitution. It does not coordinate private behaviour, set an aim for government or allocate law-making authority.`,
}));
Q('m_aspire', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Which of these clauses in an imagined constitution best shows that it enables a government to fulfil the aspirations of a society?`,
  opts: [
    `A clause committing the state to widen schooling and to remove barriers of birth so that conditions for a just society are created`,
    `A clause that fixes the number of members in the lower house of the legislature`,
    `A clause that stops the government from seizing property without a court order`,
    `A clause that names the day on which the country observes its founding`,
  ],
  sol: `A commitment to widen opportunity and build a just society equips the government to act on a society's hopes, the fourth function. Fixing house size allocates authority, the property clause limits power, and a founding day touches identity.`,
}));
Q('m_identity', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Why do we say that a constitution expresses the fundamental identity of a people?`,
  opts: [
    `It records the basic values and commitments that a people share and wish to be known by`,
    `It lists the name of every citizen who lives in the country`,
    `It forces every person to follow the same language and customs at home`,
    `It forbids the people from ever changing their way of life`,
  ],
  sol: `A constitution states the principles a people have chosen for their common life, so it says who they are and what they stand for. It is not a register of citizens, it does not impose one culture and it does not freeze social life.`,
}));
Q('m_scope', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The opening part of the imagined Charter of the Tamsa Isles recalls the islanders' shared history of living by the sea, and declares the kind of fair and welcoming society they wish to build. Which function does this opening mainly serve?`,
  opts: [
    `Expressing the fundamental identity of the people`,
    `Setting limits on the powers of government`,
    `Allowing minimal coordination and assurance among individuals`,
    `Specifying who has the power to take decisions`,
  ],
  sol: `Describing a people's shared past and the values they commit to is an expression of identity, the fifth function. The opening says nothing about restraining power, coordinating individuals or allocating decision-making authority.`,
}));
Q('m_written', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `Which statement correctly contrasts a country with a written constitution with one that has no single written constitutional document, as Britain is commonly described?`,
  opts: [
    `In the first the fundamental rules are collected in one authoritative document; in the second they are found in several sources such as statutes, conventions and judicial decisions`,
    `The first has no courts, while the second has courts that make all the laws`,
    `The second has no rules at all about how the country is governed`,
    `The first can never be amended, while the second can be changed only by a king or queen`,
  ],
  sol: `Even without one document, Britain is governed by fundamental rules drawn from statutes, conventions and decisions. Both kinds of country have courts, an unwritten constitution is not an absence of rules, and written constitutions usually carry an amending procedure.`,
}));
Q('m_authority_mode', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `In the imagined republic of Marnia a constitution was drafted by a small circle of advisers to one ruler and was announced without any discussion. On the ground of the mode of promulgation, why would its authority be doubtful?`,
  opts: [
    `Because those who made it did not speak for the people and it was not widely accepted`,
    `Because it was written in a language that few citizens speak at home`,
    `Because it contains too many articles for citizens to read`,
    `Because it describes the powers of the courts in great detail`,
  ],
  sol: `The first source of authority is who made the constitution and whether people accept it as theirs. A narrow circle imposing a text weakens that. The language, length and detail of a text are not what this test examines.`,
}));
Q('m_authority_subst', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A constitution in the imagined state of Orvale gives all the privileges to one group and leaves the others with almost none. Which source of authority is it most likely to lack?`,
  opts: [
    `Fair provisions that give every group a reason to accept it`,
    `A catchy opening declaration that is easy to remember`,
    `A printed copy that is available in every village`,
    `A large number of articles covering every subject`,
  ],
  sol: `A constitution earns respect when its content is fair and gives everyone a reason to accept it. Memorable wording, wide availability and length do not cure a text that favours one group.`,
}));
Q('m_rigid', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The charter of an imagined hill republic can be changed only if every citizen, without a single exception, votes in favour. Which problem is the republic most likely to face?`,
  opts: [
    `The charter is too rigid and cannot adapt to new needs`,
    `The charter is too flexible and can be changed by any passing majority`,
    `The charter will give the courts no role at all`,
    `The charter will have no power to limit the government`,
  ],
  sol: `When change needs unanimity, one holdout can block any amendment, so the text cannot keep pace with society. That is rigidity, not flexibility. Nothing in the rule says anything about courts or limits on the government.`,
}));
Q('m_flexible', mcq({
  t: 1, d: 3, c: 'application',
  stem: `In the imagined Republic of Sunmark, the party that wins a majority in one ordinary session can rewrite any part of the constitution by a simple vote on the same day. What is the main danger of such a design?`,
  opts: [
    `The constitution is too flexible, so the basic rules can be altered to suit whoever holds power`,
    `The constitution is too rigid, so no change will ever be possible`,
    `The constitution loses all its written form`,
    `The constitution can no longer name who makes the laws`,
  ],
  sol: `If a simple majority can change basic rules at once, those rules offer little protection and the framework loses stability. This is the opposite of rigidity. Writing and allocation of law-making are unaffected by the amendment rule.`,
}));
Q('m_checks', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `What is the purpose of checks and balances in the institutional design of a constitution?`,
  opts: [
    `To make each organ of government act as a check on the others so that no one organ gains unchecked power`,
    `To merge all powers in a single body so that decisions are taken faster`,
    `To keep the courts out of questions about the legislature`,
    `To ensure that every office is held by the same person for life`,
  ],
  sol: `Checks and balances spread power across institutions that watch and restrain one another. Merging power, shutting out the courts and permanent office-holding would all remove the checks.`,
}));

Q('tf_limits', tf({
  t: 1, d: 1, c: 'application', ans: true,
  stem: `True or false? A clause in the imagined Charter of the Tamsa Isles which forbids the ruler to seize anyone's property without the permission of a court is an example of a limit on the power of government.`,
  sol: `It restrains official power by making a court's permission necessary, which is how a constitution sets limits on the government.`,
}));
Q('tf_unwritten', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `True or false? Since Britain has no single written constitutional document, it has no fundamental rules about how its government works.`,
  sol: `Its fundamental rules exist, but are found in several sources such as statutes, conventions and judicial decisions rather than in one text.`,
}));
Q('fb_func', fb({
  t: 1, d: 1, c: 'recall',
  stem: `A constitution provides a set of basic rules that allow minimal ___ and assurance among the members of a society.`,
  acc: [['coordination', 'co-ordination']],
  sol: `The first function of a constitution is to allow minimal coordination and assurance, so that people know what to expect from one another.`,
}));
Q('mt_functions', match({
  t: 1, d: 3, c: 'application',
  stem: `Match each clause from an imagined constitution with the function of a constitution that it chiefly serves.`,
  pairs: [
    [`Every flat in the colony pays the same fee on the first day of each month`, `Minimal coordination and assurance`],
    [`The council of ministers is drawn from the majority in the lower house`, `Deciding who holds the power to decide`],
    [`The ruler may not arrest a person without an order from a court`, `Setting limits on government power`],
    [`The state shall set up a school in every district`, `Fulfilling the aspirations of society`],
  ],
  sol: `A common fee rule coordinates private behaviour. Forming a government from the majority allocates authority. Needing a court order restrains the ruler. A duty to open schools directs government towards a just and educated society.`,
}));

Q('ar_authority', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `A constitution imposed by a small group is likely to find it hard to command the respect of the people.`,
  r: `The authority of a constitution depends partly on who made it and on whether it is widely accepted.`,
  sol: `Both are true and R explains A: since authority rests partly on who framed the constitution and on wide acceptance, a text imposed by a few starts with a weak claim to respect.`,
}));
Q('ar_limits', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `A government that has won a very large majority in an election is still not free to ignore the constitution.`,
  r: `A constitution sets limits on the powers of government, so that even a popular government acts within those limits.`,
  sol: `Both are true and R explains A: limits in the constitution bind every government, including one with a huge majority.`,
}));
Q('ar_rigid', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: `A constitution which can be amended only with extreme difficulty may fail to keep up with a changing society.`,
  r: `A constitution is meant to be a changeless text which should never be amended.`,
  sol: `A is true: excessive rigidity stops adaptation. R is false: a good design is neither too rigid nor too flexible, and constitutions usually provide a way to amend them.`,
}));

// ================================================================ t02 Making of the Indian Constitution
Q('m_nehru_report', mcq({
  t: 2, d: 2, c: 'recall',
  stem: `The Nehru Report of 1928 is best described as`,
  opts: [
    `an early outline of a constitution for India drawn up by Indian leaders`,
    `the first constitution of India to come into force`,
    `the plan under which the Constituent Assembly was formed`,
    `the ideals resolution that the Assembly adopted in 1947`,
  ],
  sol: `The report was a proposal for India's constitution prepared by Indians, long before the Assembly met. The plan for forming the Assembly was the Cabinet Mission plan of 1946, and the 1947 ideals resolution was the Objectives Resolution.`,
}));
Q('m_cab_mission', mcq({
  t: 2, d: 2, c: 'recall',
  stem: `On whose plan was the Constituent Assembly of India formed?`,
  opts: [
    `The Cabinet Mission plan of 1946`,
    `The Simon Commission report of 1930`,
    `The Objectives Resolution of 1947`,
    `The Nehru Report of 1928`,
  ],
  sol: `The Assembly was formed on the lines of the Cabinet Mission plan of 1946. The Simon Commission and the Nehru Report came earlier and did not set up the Assembly, and the Objectives Resolution was adopted by the Assembly itself.`,
}));
Q('m_election', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `How were most members of the Constituent Assembly chosen?`,
  opts: [
    `They were elected indirectly by the members of the provincial legislative assemblies`,
    `They were elected directly by every adult in the country on one polling day`,
    `They were nominated by the Prime Minister of Britain`,
    `They were selected by lot from among the retired judges`,
  ],
  sol: `Provincial legislators elected the members for the provinces, and representatives of the princely states were also included. There was no direct vote by all adults, no nomination from Britain and no lottery.`,
}));
Q('m_prasad', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Who was the President of the Constituent Assembly?`,
  opts: [`Dr Rajendra Prasad`, `Dr B. R. Ambedkar`, `Jawaharlal Nehru`, `Mahatma Gandhi`],
  sol: `Dr Rajendra Prasad presided over the Assembly. Dr Ambedkar chaired the Drafting Committee, and Nehru moved the Objectives Resolution; Gandhi was not a member of the Assembly.`,
}));
Q('m_drafting', mcq({
  t: 2, d: 2, c: 'application',
  stem: `A student council in the imagined Riverdale School wants to copy the Constituent Assembly. It gives one small group the task of turning the agreed principles into a written text for the whole council to debate. Which Assembly body did this group most resemble?`,
  opts: [
    `The Drafting Committee`,
    `The provincial legislative assemblies`,
    `The Cabinet Mission`,
    `The Federal Court`,
  ],
  sol: `The Drafting Committee, chaired by Dr Ambedkar, prepared the draft for the full Assembly. The provincial assemblies elected the members, the Cabinet Mission proposed the plan, and the Federal Court was a court, not a drafting group.`,
}));
Q('m_objectives', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `The Objectives Resolution moved by Jawaharlal Nehru in December 1946 is best described as`,
  opts: [
    `a statement of the ideals that guided the Assembly and shaped the Preamble`,
    `a detailed list of every Article of the final Constitution`,
    `an Act of the British Parliament giving India independence`,
    `the final vote by which the Constitution was adopted`,
  ],
  sol: `The resolution set out the guiding ideals and later shaped the Preamble. It was not a list of Articles, a British Act or the final adoption, which came in November 1949.`,
}));
Q('m_strength299', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `Why did the strength of the Constituent Assembly fall to about 299 members after the Partition?`,
  opts: [
    `Representatives of the areas that became part of Pakistan no longer took part in it`,
    `The Assembly voted to remove members who spoke against the draft`,
    `Provincial legislatures recalled their members at the end of 1946`,
    `The princely states were all excluded from it`,
  ],
  sol: `After Partition the members for areas now in Pakistan left the Assembly, which reduced its strength to about 299 as commonly taught. There was no vote to expel critics, no mass recall and the princely states were not excluded.`,
}));
Q('m_consensus', mcq({
  t: 2, d: 2, c: 'application',
  stem: `In an imagined school parliament a draft rule is revised several times after open discussion until almost every class representative can accept it, instead of being pushed through by a narrow vote. Which feature of the Constituent Assembly's working does this resemble?`,
  opts: [
    `Its aim at consensus after open discussion`,
    `Its dependence on a single powerful ruler`,
    `Its election directly by all adults`,
    `Its decision to hold all meetings in secret`,
  ],
  sol: `The Assembly tried to reach agreement through open discussion, as the school parliament does. It did not depend on one ruler, was not directly elected by all adults, and its debates were not secret.`,
}));
Q('m_committees', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Why did the Constituent Assembly do much of its work through committees?`,
  opts: [
    `Committees could study a subject in detail and bring a proposal for debate in the full Assembly`,
    `Committees allowed the Assembly to avoid discussion in the full house`,
    `Committees were required by the Government of India Act 1935`,
    `Committees replaced the need for a Drafting Committee`,
  ],
  sol: `Working in committees let members examine subjects such as union powers, minorities and rights closely, and then place proposals before the whole Assembly. They did not replace discussion or the Drafting Committee, and the 1935 Act did not require them.`,
}));
Q('m_adapt', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Which statement about the sources of the Indian Constitution is correct?`,
  opts: [
    `Many ideas from the Government of India Act 1935 and from other constitutions were adapted to Indian conditions`,
    `All its provisions were copied unchanged from the Government of India Act 1935`,
    `Nothing in it was influenced by the experience of any other country`,
    `Every feature was copied word for word from the constitution of the United States`,
  ],
  sol: `The framers drew on the 1935 Act and on other constitutions but adapted what they took. They neither copied one source unchanged nor ignored outside experience.`,
}));
Q('m_irish', mcq({
  t: 2, d: 2, c: 'recall',
  stem: `The idea of Directive Principles in the Indian Constitution is traced to the experience of`,
  opts: [`Ireland`, `Canada`, `Britain`, `France`],
  sol: `Directive Principles are commonly traced to the Irish constitution. Canada is linked with the strong centre, Britain with parliamentary government, and France with liberty, equality and fraternity.`,
}));
Q('m_canada', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A student notes that the Indian Constitution creates a federation with a strong centre in which the powers not listed anywhere remain with the centre. From which country's model was this idea mainly adapted?`,
  opts: [`Canada`, `The United States`, `Ireland`, `Britain`],
  sol: `A quasi-federal form, with a strong centre and residuary powers held by the centre, is drawn from Canada. The United States is linked with a bill of rights and judicial review, Ireland with Directive Principles and Britain with parliamentary government.`,
}));
Q('m_us_pair', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Which pairing of a feature with the country whose experience it is commonly traced to is correct?`,
  opts: [
    `Judicial review and a bill of rights: the United States`,
    `Parliamentary government: France`,
    `Directive Principles: Canada`,
    `Single citizenship: Ireland`,
  ],
  sol: `Judicial review and a bill of rights are traced to the United States. Parliamentary government and single citizenship come from Britain, Directive Principles from Ireland, and the ideals of liberty, equality and fraternity from France.`,
}));
Q('m_1935', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Which earlier law provided the base for many administrative provisions of the Indian Constitution?`,
  opts: [
    `The Government of India Act 1935`,
    `The Indian Independence Act 1947`,
    `The Regulating Act of 1773`,
    `The Morley-Minto reforms of 1909`,
  ],
  sol: `Many administrative arrangements were carried forward from the Government of India Act 1935. The other options are different laws and do not serve as the base of the Constitution's administrative provisions.`,
}));
Q('m_dates', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `In the Riverdale School quiz, the question is: which pair of dates marks the adoption of the Indian Constitution and its coming into force?`,
  opts: [
    `26 November 1949 and 26 January 1950`,
    `26 January 1950 and 26 November 1949`,
    `15 August 1947 and 26 January 1950`,
    `9 December 1946 and 26 November 1949`,
  ],
  sol: `The Assembly adopted the Constitution on 26 November 1949, now observed as Constitution Day, and it came into force on 26 January 1950, observed as Republic Day. Option two reverses the order, and the other pairs use dates of independence and of the first meeting.`,
}));

Q('tf_assembly_direct', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: `True or false? The members of the Constituent Assembly were chosen directly by all adult citizens in one nationwide election.`,
  sol: `Members were elected indirectly by the provincial legislative assemblies, with representatives of the princely states also included.`,
}));
Q('tf_borrow_copy', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: `True or false? The framers of the Indian Constitution copied every borrowed feature word for word from the country where it originated.`,
  sol: `The ideas were adapted to Indian conditions rather than copied.`,
}));
Q('tf_objectives', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: `True or false? The Objectives Resolution of the Constituent Assembly set out ideals that went on to shape the Preamble.`,
  sol: `The resolution stated the guiding aims of the Assembly and these shaped the Preamble.`,
}));
Q('fb_cm', fb({
  t: 2, d: 1, c: 'recall',
  stem: `The Constituent Assembly was formed on the lines of the plan of the ___ Mission (1946).`,
  acc: [['Cabinet']],
  sol: `The Assembly's formation followed the Cabinet Mission plan of 1946.`,
}));
Q('fb_officers', fb({
  t: 2, d: 1, c: 'recall',
  stem: `The Constituent Assembly was presided over by Dr ___ Prasad, and its Drafting Committee was chaired by Dr B. R. ___.`,
  acc: [['Rajendra'], ['Ambedkar']],
  sol: `Dr Rajendra Prasad was the President of the Assembly and Dr B. R. Ambedkar chaired the Drafting Committee.`,
}));
Q('fb_nehru', fb({
  t: 2, d: 1, c: 'recall',
  stem: `The 1928 outline of a constitution for India prepared by Indian leaders is known as the ___ Report.`,
  acc: [['Nehru']],
  sol: `It is called the Nehru Report; it was an early attempt to outline a constitution for India.`,
}));
Q('mt_borrow', match({
  t: 2, d: 2, c: 'understanding',
  stem: `Match each country with the idea in the Indian Constitution that is commonly traced to its experience.`,
  pairs: [
    [`United States`, `Judicial review and an independent judiciary`],
    [`Ireland`, `Directive Principles`],
    [`Canada`, `A federation with a strong centre`],
    [`Britain`, `Parliamentary government and the Speaker`],
  ],
  sol: `The United States is linked with judicial review, Ireland with Directive Principles, Canada with the strong centre and residuary powers, and Britain with parliamentary government and the office of the Speaker.`,
}));
Q('ord_events', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: `Arrange these steps in the making of the Indian Constitution in the order in which they happened.`,
  items: [
    `The Nehru Report outlines a constitution for India`,
    `The Constituent Assembly meets for the first time`,
    `The Objectives Resolution is adopted`,
    `The Constitution is adopted by the Assembly`,
    `The Constitution comes into force`,
  ],
  sol: `The Nehru Report came in 1928, the Assembly first met in December 1946, the Objectives Resolution was adopted in January 1947, the Constitution was adopted in November 1949 and it came into force in January 1950.`,
}));
Q('ord_council', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `The imagined Lakeside School student parliament frames its own charter on the pattern of the Constituent Assembly. Arrange its stages in the order a careful council would follow.`,
  items: [
    `Class councils elect the members of the framing body`,
    `The body adopts a statement of ideals`,
    `A drafting group prepares a text`,
    `The whole body debates and amends the draft`,
    `The charter is adopted and then comes into force`,
  ],
  sol: `Members are chosen first, ideals are agreed next, a small group drafts the text, the whole body debates it, and only then is it adopted and brought into force, as the Assembly proceeded.`,
}));
Q('ar_unrelated', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `The members of the Constituent Assembly were elected indirectly.`,
  r: `Dr Rajendra Prasad was the President of the Constituent Assembly.`,
  sol: `Both statements are true, but the identity of the President does not explain why the members were chosen indirectly; that came from election by the provincial legislative assemblies.`,
}));
Q('ar_direct', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: `The members of the Constituent Assembly were elected directly by all adults of the country.`,
  r: `Members from the provinces were elected by the members of the provincial legislative assemblies.`,
  sol: `A is false: the election was indirect. R is true: provincial legislators chose the members, with representatives of the princely states also included.`,
}));
Q('ar_consensus', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `The way the Constituent Assembly worked strengthened the authority of the Constitution it produced.`,
  r: `The Assembly's members came from many regions, communities and opinions, and decisions were reached by open discussion and an aim at consensus.`,
  sol: `Both are true and R explains A: broad participation and an effort at agreement gave the text a wide base of acceptance, which supports its authority.`,
}));

// ================================================================ short answers (2 marks)
Q('s2_define', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: `Define a constitution in one sentence, and say whether Britain's constitution is a single written document.`,
  model: `A **constitution** is the body of fundamental rules and principles by which a country is governed. **Britain** has no single written document; its constitution is found in several sources, such as statutes and conventions.`,
  sol: `One mark for a correct definition and one for the point about Britain.`,
  scheme: [[`Correct definition`, 1], [`Britain has no single written document`, 1]],
}));
Q('s2_two_functions', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: `State any two functions of a constitution.`,
  model: `1. It provides basic rules that allow **minimal coordination and assurance** among people.\n2. It **sets limits** on the power of government. (Any two of the five functions are accepted.)`,
  sol: `Any two of: coordination and assurance, decision-making authority, limits on government, fulfilling aspirations, expressing identity.`,
  scheme: [[`First function`, 1], [`Second function`, 1]],
}));
Q('s2_assurance', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `In the imagined Greenfield Cycling Club, riders trust that others will follow the lane rules written in the club rulebook. Which function of a constitution does this resemble, and why?`,
  model: `It resembles the function of providing basic rules for **minimal coordination and assurance**. Because the rules are written and shared, each rider can predict what the others will do and plan accordingly.`,
  sol: `Name the function and explain that shared rules let people predict one another.`,
  scheme: [[`Function identified`, 1], [`Reason: predictability from shared rules`, 1]],
}));
Q('s2_authority_modes', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `Mention any two sources from which a constitution draws its authority.`,
  model: `1. The **mode of promulgation**: who made it and whether it is widely accepted.\n2. Its **substantive provisions**: fair content that gives everyone a reason to accept it. (A balanced institutional design is also accepted.)`,
  sol: `Any two of: mode of promulgation, fair substantive provisions, balanced institutional design.`,
  scheme: [[`First source`, 1], [`Second source`, 1]],
}));
Q('s2_flex', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `Why should the design of a constitution be neither too rigid nor too flexible? Give one reason for each.`,
  model: `If it is **too rigid**, it cannot change with new needs and may be discarded. If it is **too flexible**, whoever holds power can rewrite it at will, so it gives no stable protection.`,
  sol: `One reason about rigidity and one about flexibility.`,
  scheme: [[`Reason against rigidity`, 1], [`Reason against flexibility`, 1]],
}));
Q('s2_nehru', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `What was the Nehru Report of 1928? Why does it matter in the story of the Constituent Assembly?`,
  model: `It was an early outline of a constitution for India drawn up by Indian leaders. It matters because it shows that the **demand to frame our own constitution** grew within the national movement long before the Assembly met.`,
  sol: `Describe the report and link it to the growing demand for an Assembly.`,
  scheme: [[`Early outline by Indian leaders`, 1], [`Link to the growing demand for a constitution`, 1]],
}));
Q('s2_comp', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `How were the members of the Constituent Assembly chosen? Name the two kinds of members.`,
  model: `Members from the provinces were **elected indirectly**: the members of the provincial legislative assemblies voted for them, not all adults directly. **Representatives of the princely states** were also included in the Assembly.`,
  sol: `Indirect election by provincial assemblies, and representatives of princely states.`,
  scheme: [[`Indirect election by provincial legislative assemblies`, 1], [`Princely-state representatives also included`, 1]],
}));
Q('s2_objectives', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `What was the Objectives Resolution of the Constituent Assembly? Name the document that its ideals shaped.`,
  model: `It was a resolution moved by Jawaharlal Nehru in December 1946 and adopted in January 1947, setting out the **ideals** the Assembly would follow. These ideals shaped the **Preamble**.`,
  sol: `A statement of guiding ideals, and the Preamble as the document it shaped.`,
  scheme: [[`Statement of guiding ideals`, 1], [`Shaped the Preamble`, 1]],
}));
Q('s2_adapt', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `The imagined Lakeside School council says it has copied a rule from a neighbouring school. What would it mean to say that, like the framers of our Constitution, the council has adapted rather than copied? Give one example from the Constitution.`,
  model: `It means taking an idea from elsewhere and **changing it to suit local conditions**. For example, the idea of a strong centre in a federation was drawn from Canada but fitted to India's own needs and history.`,
  sol: `Explain adaptation as modifying an idea for local needs, with a valid example.`,
  scheme: [[`Adaptation explained`, 1], [`Valid example`, 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_functions', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The imagined republic of Sundrapur has a charter which fixes who makes the laws, forbids arrest without a hearing and promises equal schooling for every child. Name the function of a constitution shown by each feature.`,
  model: `1. Fixing who makes the laws shows the function of **specifying decision-making authority** and how the government is constituted.\n2. Forbidding arrest without a hearing shows the function of **setting limits** on government power.\n3. Promising equal schooling shows **enabling the government to fulfil the aspirations** of society and create a just society.`,
  sol: `One function for each feature.`,
  scheme: [[`Decision-making authority`, 1], [`Limits on government`, 1], [`Aspirations and a just society`, 1]],
}));
Q('s3_authority', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Explain three conditions that help a constitution gain authority in the eyes of the people.`,
  model: `1. It should be made by a body that people regard as theirs and be **widely accepted**.\n2. Its provisions should be **fair**, giving all groups a reason to respect it.\n3. Its institutions should be **balanced**, with checks and balances, neither too rigid to adapt nor so flexible that it is altered at will.`,
  sol: `Mode of promulgation, fair provisions and balanced institutional design.`,
  scheme: [[`Mode of promulgation and acceptance`, 1], [`Fair substantive provisions`, 1], [`Balanced institutional design`, 1]],
}));
Q('s3_written', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Compare a written constitution such as India's with Britain's unwritten constitution on any three points.`,
  model: `1. **Form:** India's rules are collected in one document; Britain's are spread over statutes, conventions and decisions.\n2. **Finding the rules:** citizens can consult one authoritative text in India, but must look to several sources in Britain.\n3. **Change:** in India amendment follows a procedure laid down in the text; in Britain much develops through ordinary statutes and practice.`,
  sol: `Three valid points of comparison; each side stated.`,
  scheme: [[`Form`, 1], [`Where rules are found`, 1], [`How they change`, 1]],
}));
Q('s3_working', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Describe any three features of the way the Constituent Assembly worked.`,
  model: `1. It **deliberated through committees** that studied subjects in detail.\n2. It aimed at **consensus** and encouraged open discussion.\n3. It **respected diverse views**, since members came from many regions, communities and opinions, and it built on the inheritance of the national movement.`,
  sol: `Any three of: committees, consensus, open discussion, diverse membership, national movement inheritance.`,
  scheme: [[`First feature`, 1], [`Second feature`, 1], [`Third feature`, 1]],
}));
Q('s3_borrow', short({
  t: 2, d: 2, c: 'recall', marks: 3, wl: S3,
  stem: `Name three ideas in the Indian Constitution that are commonly traced to the experience of other countries, and name the country for each.`,
  model: `1. **Parliamentary government** and the office of the Speaker: Britain.\n2. **Judicial review** and a bill of rights: the United States.\n3. **Directive Principles**: Ireland. (A strong centre from Canada and liberty, equality and fraternity from France are also accepted.)`,
  sol: `Three correct feature and country pairs.`,
  scheme: [[`First pair`, 1], [`Second pair`, 1], [`Third pair`, 1]],
}));
Q('s3_timeline', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Trace three steps, with dates, from the demand for a constitution to the first meeting of the Constituent Assembly.`,
  model: `1. **1928:** the Nehru Report outlined a constitution for India, showing a growing demand.\n2. **1946:** the Cabinet Mission plan provided the basis for forming the Assembly, whose members were elected indirectly by provincial legislators.\n3. **9 December 1946:** the Assembly met for the first time.`,
  sol: `Nehru Report 1928, Cabinet Mission plan 1946 and first meeting on 9 December 1946.`,
  scheme: [[`Nehru Report, 1928`, 1], [`Cabinet Mission plan and election of members, 1946`, 1], [`First meeting, 9 December 1946`, 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_functions', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `The student council of the imagined Kiran Public School wants a written constitution. Using this council as the example, explain five functions that a constitution performs.`,
  model: `1. **Basic rules:** the council's rules on meetings and fees let members predict one another's behaviour, giving minimal coordination and assurance.\n2. **Decision-making authority:** the constitution says who can take decisions and how the executive team is chosen.\n3. **Limits on power:** it stops office-bearers from, for instance, expelling a member without a hearing.\n4. **Aspirations:** it commits the council to creating fair opportunities for all students.\n5. **Identity:** its opening statement tells everyone what the council stands for.`,
  sol: `One function, each applied to the council.`,
  scheme: [[`Coordination and assurance applied`, 1], [`Decision-making authority applied`, 1], [`Limits on power applied`, 1], [`Aspirations applied`, 1], [`Identity applied`, 1]],
}));
Q('l_authority', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Explain what gives a constitution its authority. In your view, which source matters most, and why?`,
  model: `1. **Mode of promulgation:** the body that made it must be seen as legitimate and its work widely accepted.\n2. **Substantive provisions:** the content must be fair, giving every group a reason to accept it.\n3. **Balanced institutional design:** power must be divided with checks and balances.\n4. **Flexibility:** the design must be neither too rigid nor too flexible, so that it can adapt yet stay stable.\n5. **Judgement:** fair provisions may matter most because people obey what they find just, though acceptance of the maker also counts. (Any reasoned choice is accepted.)`,
  sol: `Three sources, the rigidity balance, and a reasoned judgement.`,
  scheme: [[`Mode of promulgation`, 1], [`Fair provisions`, 1], [`Balanced institutions`, 1], [`Neither too rigid nor too flexible`, 1], [`Reasoned judgement on the most important`, 1]],
}));
Q('l_rigid', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `The imagined republics of Hillmark and Plainmark have very different amendment rules. In Hillmark the constitution can be altered only by unanimous consent; in Plainmark any ordinary majority can alter it in a day. Examine the strengths and dangers of each design and say what a balanced design would do.`,
  model: `1. **Hillmark's strength:** the basic rules are very stable and secure.\n2. **Hillmark's danger:** one objection can block any change, so the text may become outdated.\n3. **Plainmark's strength:** the text can adapt quickly to new needs.\n4. **Plainmark's danger:** those in power can rewrite the rules to suit themselves.\n5. **Balance:** a sound design asks for a special majority and uses checks and balances, so change is possible but not casual.`,
  sol: `Strength and danger of each design and the balanced alternative.`,
  scheme: [[`Hillmark: stability`, 1], [`Hillmark: rigidity`, 1], [`Plainmark: adaptability`, 1], [`Plainmark: instability and misuse`, 1], [`Balanced design`, 1]],
}));
Q('l_assembly', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the composition and the working of the Constituent Assembly of India.`,
  model: `1. **Formation:** it was formed on the lines of the Cabinet Mission plan of 1946.\n2. **Members:** provincial legislators elected members indirectly, and princely-state representatives were included; after Partition the strength fell to about 299.\n3. **Officers:** Dr Rajendra Prasad was President and Dr B. R. Ambedkar chaired the Drafting Committee.\n4. **Method:** it worked through committees and aimed at consensus and open discussion.\n5. **Ideals:** the Objectives Resolution guided it, and it respected diverse views.`,
  sol: `Formation, members, officers, method and ideals.`,
  scheme: [[`Formation under the Cabinet Mission plan`, 1], [`Election and princely-state members, 299`, 1], [`President and Drafting Committee chair`, 1], [`Committees and consensus`, 1], [`Objectives Resolution and diverse views`, 1]],
}));
Q('l_borrow', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `Explain how the framers of the Indian Constitution used the Government of India Act 1935 and the experience of other countries, and show that they adapted rather than copied.`,
  model: `1. The **Government of India Act 1935** supplied the base for many administrative provisions.\n2. From **Britain** came parliamentary government, rule of law, the Speaker and single citizenship.\n3. From the **United States** came a bill of rights, judicial review and an independent judiciary; from **Ireland**, Directive Principles.\n4. From **France** came liberty, equality and fraternity, and from **Canada** a quasi-federal form with a strong centre.\n5. These were **adapted** to India's needs, for example by combining federal features with a strong centre.`,
  sol: `The 1935 Act, borrowed features by country, and adaptation.`,
  scheme: [[`Role of the 1935 Act`, 1], [`British features`, 1], [`United States and Irish features`, 1], [`French and Canadian features`, 1], [`Adapted, not copied`, 1]],
}));
Q('l_legit', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Some say the Constituent Assembly was not chosen by all adult citizens and so could not speak for the whole country. Others say its Constitution still enjoys wide acceptance. Evaluate the two views.`,
  model: `1. **Case for the doubt:** members were elected indirectly by provincial legislators, not by all adults.\n2. **More on the doubt:** the representation of princely states was by a different route.\n3. **Case for acceptance:** members came from many regions, communities and opinions.\n4. **More on acceptance:** it worked through committees, sought consensus and built on the national movement.\n5. **Judgement:** the Constitution's fair provisions and the Assembly's open debate gave it wide acceptance despite indirect election. (Any reasoned judgement is accepted.)`,
  sol: `Points on each view and a reasoned judgement.`,
  scheme: [[`Indirect election as a limit`, 1], [`Princely-state representation`, 1], [`Diverse membership`, 1], [`Committees, consensus and the movement's inheritance`, 1], [`Reasoned judgement`, 1]],
}));

// ================================================================ case-based (4 marks each)
Q('case_club', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage, an imagined newspaper report, and answer the questions that follow. *(Written by SOYL for practice; the colony, newspaper and people are not real.)*`,
  passage: `**"A charter for Sundrapur Colony" — imagined report in a local newspaper**\n\nAfter two years of quarrels over water and parking, the residents of Sundrapur Colony have adopted a written charter. It fixes the monthly fee that every flat pays and the dates of meetings. The executive committee is to be chosen by all families, and the charter lists the posts it will fill. A separate clause says that the committee may not stop any family from using the common lift without a decision of the general meeting. The opening lines recall how the colony was built by its first families and describe a neighbourhood that welcomes everyone.`,
  parts: [
    child('a', short({ t: 1, d: 1, c: 'application', marks: 1, stem: `Which clause in the charter sets a limit on the power of the committee?`, model: `The clause that forbids the committee to stop any family from using the lift without a decision of the general meeting.`, sol: `Identify the lift clause.`, scheme: [[`Lift clause identified`, 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Which function of a constitution is shown by the rule that the committee is chosen by all families?`, model: `Specifying who has the power to make decisions and how the government (here, the committee) is constituted.`, sol: `Decision-making authority and how the body is formed.`, scheme: [[`Function named`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): Explain how the rule on the monthly fee gives assurance to the residents.`, model: `Since every flat knows that all the others will pay the **same fee** on the same dates, each can rely on others doing their part. This **assurance** makes it easier to plan shared services.`, sol: `Link a common rule to confidence in others' conduct.`, scheme: [[`Rule applies equally to all`, 1], [`Assurance leads to cooperation`, 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: `**Or** (ii): Suppose the charter had been drafted in secret by the committee alone. Why might its authority suffer?`, model: `Its authority depends partly on who made it and on whether people accept it. A text drafted **in secret by those it would govern** may not be seen as the residents' own, so many would **not accept it**.`, sol: `Link secret drafting to the mode of promulgation.`, scheme: [[`Authority depends on who made it`, 1], [`Lack of acceptance`, 1]] }),
    ]),
  ],
}));
Q('case_debate', caseQ({
  t: 1, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the extract from an imagined school debate and answer the questions that follow. *(Written by SOYL for practice; the school, speakers and country are not real.)*`,
  passage: `**Imagined debate in a school assembly: "Does fairness alone make a constitution legitimate?"**\n\n*Speaker 1:* The constitution of Veloria was prepared by a commission appointed by one ruler, and the public was never asked about it. That alone should make us doubt it.\n\n*Speaker 2:* But look at what it says. It treats every community alike, it limits the powers of the ruler and it is easy to amend through a special majority. Who made it matters less than whether it is just.\n\n*Speaker 1:* A just text which people did not accept can still be cast aside when the ruler changes.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'analysis', marks: 1, stem: `Which source of authority does Speaker 1 emphasise?`, model: `The mode of promulgation: who made the constitution and whether it is widely accepted.`, sol: `Speaker 1 questions how the constitution was made.`, scheme: [[`Mode of promulgation`, 1]] })),
    child('b', short({ t: 1, d: 2, c: 'analysis', marks: 1, stem: `Which source of authority does Speaker 2 rely on when describing the content of the constitution?`, model: `Its substantive provisions, that is, fair content that gives everyone a reason to accept it.`, sol: `Speaker 2 points to fair provisions.`, scheme: [[`Substantive provisions`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: `**Either** (i): Do you agree with Speaker 1 that a just text may still be cast aside if it was not accepted? Give a reason.`, model: `**Yes, partly.** A constitution needs the people's acceptance to last, so fair content may not protect it when the maker lacks legitimacy. **No, partly:** over time, fair provisions can themselves win acceptance. (Any reasoned view is accepted.)`, sol: `A reasoned view on acceptance and fair content.`, scheme: [[`Clear view`, 1], [`Reason using the sources of authority`, 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Suggest one step by which Veloria could win wider acceptance for its constitution, and say why it would help.`, model: `It could hold a **public discussion and ratification** of the text by a body representing the people. This would help because the constitution would then be seen as **made with the consent** of those it governs.`, sol: `A step that improves acceptance with a reason.`, scheme: [[`Suitable step`, 1], [`Reason it improves acceptance`, 1]] }),
    ]),
  ],
}));
Q('case_panchayat', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage, an imagined panchayat meeting, and answer the questions that follow. *(Written by SOYL for practice; the village and people are not real.)*`,
  passage: `**Imagined meeting of the village council of Rampuri, discussing how to amend its charter**\n\n*Farida:* Our old rule says the charter can be changed only when every single resident agrees. In ten years we have not managed to change one word.\n\n*Joseph:* The new proposal says the head of the council may change the charter any time, by a signed order.\n\n*Meera:* Neither seems right. What if a change needed two thirds of the general meeting, after a public notice and a discussion?`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Which of the two rules described by Farida and Joseph is too rigid?`, model: `The old rule requiring every resident to agree.`, sol: `Unanimity makes change nearly impossible.`, scheme: [[`Old rule identified`, 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Which rule makes the charter too flexible?`, model: `Joseph's proposal that the head of the council may change it any time by a signed order.`, sol: `One person's order can alter the rules at will.`, scheme: [[`Joseph's proposal identified`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: `**Either** (i): Explain why Meera's suggestion is closer to a balanced design.`, model: `A **two-thirds majority** after notice and discussion makes change **possible** but needs wide agreement, so it avoids both the deadlock of unanimity and the casual alteration by one person.`, sol: `A special majority sits between the two extremes.`, scheme: [[`Change is possible`, 1], [`Wide agreement is needed`, 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): State one harm that follows when a village charter is too flexible, and one harm when it is too rigid.`, model: `**Too flexible:** whoever holds power can rewrite the rules for their own benefit. **Too rigid:** the charter cannot adapt to new needs and may be ignored or abandoned.`, sol: `One harm of each extreme.`, scheme: [[`Harm of flexibility`, 1], [`Harm of rigidity`, 1]] }),
    ]),
  ],
}));
Q('case_letter', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage, an imagined letter, and answer the questions that follow. *(Written by SOYL for practice; the school and the people are not real.)*`,
  passage: `**Imagined letter from Anvi, a student of the Lakeside School, to her cousin**\n\nDear Tara, our school has formed a Student Framing Body to write a charter. Its members were chosen by the class councils, not by every student. First we adopted a short statement of ideals. Then we split into groups on subjects such as meetings, elections and discipline, and each group brought a report. A small drafting group wrote the text, and we debated it in full. We kept revising until nearly everyone was content. Your cousin, Anvi`,
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: `Which feature of the way the Constituent Assembly's members were chosen does the choice by class councils resemble?`, model: `Indirect election, as provincial legislators elected the members of the Assembly.`, sol: `Election by a smaller body, not by everyone directly.`, scheme: [[`Indirect election`, 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: `Which step in Anvi's letter resembles the Objectives Resolution?`, model: `The adoption of a short statement of ideals before drafting began.`, sol: `The ideals were agreed first, as the Assembly did.`, scheme: [[`Statement of ideals`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): Explain how working in groups on separate subjects helped the Framing Body, as committees helped the Constituent Assembly.`, model: `Each group could study its **subject in detail** and bring a report, so the full body debated **well-prepared proposals** rather than starting from nothing.`, sol: `Committees allow detailed study and informed debate.`, scheme: [[`Detailed study of a subject`, 1], [`Informed debate in the full body`, 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): Anvi says they revised the text until nearly everyone was content. How does an aim at consensus help the acceptance of a constitution?`, model: `When members keep discussing until most are satisfied, more people **feel their views were heard**. The text is then more widely **accepted**, which adds to its authority.`, sol: `Consensus supports acceptance.`, scheme: [[`Views heard through discussion`, 1], [`Wider acceptance`, 1]] }),
    ]),
  ],
}));
Q('case_table', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Study the table, drawn by SOYL for practice from commonly taught points, and answer the questions that follow.`,
  passage: `**Ideas in the Indian Constitution and the experience they are traced to**\n\n| Idea in the Constitution | Traced to the experience of |\n|---|---|\n| Parliamentary government | Britain |\n| Judicial review | The United States |\n| Directive Principles | Ireland |\n| Strong centre with residuary powers | Canada |\n| Liberty, equality and fraternity | France |`,
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: `According to the table, from which country's experience are Directive Principles traced?`, model: `Ireland.`, sol: `Read the row.`, scheme: [[`Ireland`, 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: `Which idea in the table is traced to the experience of the United States?`, model: `Judicial review.`, sol: `Read the row.`, scheme: [[`Judicial review`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: `**Either** (i): Choose one row of the table and explain what it means to say the idea was adapted rather than copied.`, model: `For example, the strong centre with residuary powers was traced to **Canada**, but it was **fitted to India's own circumstances**, so it was shaped to suit the country rather than reproduced unchanged.`, sol: `A chosen row with the idea of adaptation.`, scheme: [[`Row chosen with its source`, 1], [`Adaptation explained`, 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): The table does not list the Government of India Act 1935. Explain the part this earlier law played.`, model: `The **Government of India Act 1935** provided the base for many **administrative provisions**, so much of the working structure was carried forward and then adapted.`, sol: `The 1935 Act as the base for administrative provisions.`, scheme: [[`Base for administrative provisions`, 1], [`Carried forward and adapted`, 1]] }),
    ]),
  ],
}));
