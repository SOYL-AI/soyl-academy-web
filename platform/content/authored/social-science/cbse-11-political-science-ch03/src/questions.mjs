// CBSE 11 Political Science, ch03 Election and Representation: question bank. The country "Sundaria", its parties,
// constituencies, vote tables, school, newspaper and letters are imagined and written by SOYL; every passage is labelled
// as imagined. No NCERT text, boxed source, cartoon, Constitution text, speech, court judgment or board/sample-paper
// item is reused (D-036). Articles and Amendments are cited by number with a paraphrase of what they provide.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-political-science-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Electoral systems
Q('m_direct', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A system in which citizens choose representatives who then make decisions on their behalf is called',
  opts: ['indirect or representative democracy', 'direct democracy', 'rule by a single party', 'rule by hereditary leaders'],
  sol: 'In a representative democracy the people elect others to decide for them. In direct democracy the people take decisions themselves, which is possible only in small groups. The other two options are not forms of democracy.',
}));
Q('m_why_rep', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The imagined country of Sundaria has forty million voters and many laws to pass each year. The main reason why it chooses representatives instead of voting on every law is that',
  opts: ['so large a population cannot meet and decide every matter directly', 'ordinary voters are not allowed to take part in politics', 'representatives never need to answer to the voters', 'laws can be made only by a single leader'],
  sol: 'Where millions of people live, a meeting of all citizens is impractical, so people elect representatives to act for them and to answer to them at the next election. The other options contradict the idea of democracy.',
}));
Q('m_fptp_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the first past the post system, the winner in a constituency is the candidate who',
  opts: ['gets more votes than every other candidate', 'gets more than half of all votes cast', 'belongs to the party with the most votes in the whole country', 'is chosen by the party leaders after the count'],
  sol: 'The candidate with the largest number of votes wins, even if this is less than half of the votes cast. Winning a majority is not required, a national count of votes does not decide a constituency, and party leaders do not choose among candidates after the count.',
}));
Q('m_plural', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the imagined Sundarian constituency of Tarnagar, the four candidates received 31,000, 29,000, 24,000 and 16,000 votes. The candidate with 31,000 votes is declared elected. Which statement is correct?',
  opts: ['The winner has a plurality but not a majority of the votes cast', 'The winner has a majority of the votes cast', 'No one wins because nobody has half of the votes', 'A second round of voting must be held between the top two'],
  sol: 'The votes cast total 100,000, so the winner has 31 per cent: the largest share, but not more than half. Under first past the post that is enough, so no second round is needed.',
}));
Q('m_fptp_where', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which pair of bodies in India is elected by the first past the post system?',
  opts: ['The Lok Sabha and the State Legislative Assemblies', 'The Rajya Sabha and the State Legislative Assemblies', 'The Lok Sabha and the Rajya Sabha', 'The Legislative Councils and the Lok Sabha'],
  sol: 'Members of the Lok Sabha and of the State Legislative Assemblies are chosen directly by voters under first past the post. The Rajya Sabha and the Legislative Councils are elected indirectly under the single transferable vote, so they cannot be paired with these bodies.',
}));
Q('m_gap', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In an imagined election in Sundaria, the Sun Party wins 40 per cent of the votes and 12 of the 20 seats. What does this show about first past the post?',
  opts: ['The share of seats can be far larger than the share of votes', 'The share of seats always equals the share of votes', 'The party with the most votes always loses', 'A party cannot form a government without half of all votes'],
  sol: 'Seats are won constituency by constituency, so 40 per cent of the votes can give 60 per cent of the seats. This does not always happen, and a party need not hold half the votes to form a government.',
}));
Q('m_strength', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the Sundarian assembly, a member says that every voter in her constituency of Rampura knows her by name and can walk into her office to complain, and that the country\'s system usually produces a government with a clear majority. She is describing the strengths of',
  opts: ['first past the post, with one known representative per constituency and usually stable governments', 'the list system, with one national constituency and no local representative', 'direct democracy, where citizens decide each law themselves', 'a system that gives seats exactly equal to vote shares'],
  sol: 'A representative known to the voters of a single constituency and a usually stable government are the commonly cited strengths of first past the post. In the list system there is no local member, direct democracy has no representatives, and exact seat shares are the aim of proportional systems.',
}));
Q('m_pr_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The central idea of proportional representation is that',
  opts: ['each party gets seats in proportion to its share of the votes', 'the candidate with most votes in each area wins', 'only the largest party gets any seats', 'seats are fixed in advance for each party'],
  sol: 'Proportional representation tries to match the share of seats to the share of votes. Winning by most votes in each area describes first past the post, and the other options do not describe any fair system of election.',
}));
Q('m_list', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined country of Ardenia treats the whole country as one constituency; voters mark a party, and each party\'s seats follow its share of votes. This arrangement is the',
  opts: ['list system of proportional representation, as taught with Israel and the Netherlands', 'first past the post system used for the Lok Sabha', 'single transferable vote used for the Rajya Sabha', 'system of reserved constituencies'],
  sol: 'One large constituency, a vote for a party and seats by vote share define the list system. First past the post uses many single-seat constituencies, the single transferable vote uses ranked choices of candidates, and reservation concerns who may contest, not how votes become seats.',
}));
Q('m_stv', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Elected members of the Legislative Assembly of an Indian state rank candidates on a ballot to send members to the Rajya Sabha. Which method is being used?',
  opts: ['Proportional representation by the single transferable vote', 'First past the post', 'The list system, with one national constituency', 'Direct voting by all adult citizens'],
  sol: 'Rajya Sabha members are elected indirectly, by the elected members of the Assemblies, who rank candidates under the single transferable vote. First past the post is used in direct elections to the Lok Sabha and Assemblies, and citizens do not vote directly for the Rajya Sabha.',
}));
Q('m_pr_voice', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Suppose Sundaria shifted to a list system for 20 seats and the small Cloud Party, with 5 per cent of the votes, won one seat. This best illustrates that proportional representation',
  opts: ['gives small parties a share of seats close to their share of votes', 'makes it impossible for any party to win a majority', 'removes the need for elections to take place', 'gives the largest party all the seats'],
  sol: 'Five per cent of 20 seats is one seat, so the party is represented in line with its support. A majority is not ruled out for a party with very high support, and elections are still held.',
}));
Q('m_why_fptp', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A Sundarian commission is told to design an election method for a very large electorate, in which most voters will vote for the first time and each should know whom to approach. Which method meets this need best, as with the reasoning behind India\'s choice?',
  opts: ['First past the post, which is simple and gives each area one known representative', 'A list system with no local representative', 'A method that asks voters to rank forty candidates', 'Appointment of representatives by the ruling party'],
  sol: 'Simplicity and a known local representative are two of the reasons given for India\'s choice of first past the post. A list system has no local member, a very long ranking is hard for new voters, and appointment is not an election.',
}));
Q('m_reserved', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'In a constituency reserved for the Scheduled Castes,',
  opts: ['only candidates belonging to Scheduled Castes may contest, but all voters in the constituency vote', 'only voters belonging to Scheduled Castes may vote', 'candidates from any group may contest but only SC voters vote', 'the seat is filled by nomination and not by election'],
  sol: 'Reservation limits who can stand, not who can vote: every registered voter in the constituency takes part. Reserved seats are filled by election like any other seat, not by nomination.',
}));
Q('m_reserved_vote', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Rohit, a voter in the imagined Sundarian constituency of Palashgarh, belongs to a general category. Palashgarh is reserved for a Scheduled Tribe. What is his position?',
  opts: ['He can vote like everyone else but cannot contest from Palashgarh', 'He cannot vote in Palashgarh', 'He can contest but cannot vote', 'He may vote only if the candidate belongs to his own community'],
  sol: 'In a reserved constituency all voters have a vote, while candidates must belong to the reserved group. Rohit therefore votes in the usual way and cannot be a candidate there.',
}));
Q('m_sc_st', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'As of 2024, how many Lok Sabha seats are reserved for Scheduled Castes and Scheduled Tribes respectively?',
  opts: ['84 and 47', '47 and 84', '131 and 84', '84 and 131'],
  sol: 'As of 2024, 84 Lok Sabha seats are reserved for Scheduled Castes and 47 for Scheduled Tribes, a total of 131. The figures can change after a new delimitation, so they carry a date.',
}));
Q('m_delim', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which body draws the boundaries of constituencies in India?',
  opts: ['The Delimitation Commission', 'The Finance Commission', 'The Law Commission', 'The Planning Commission'],
  sol: 'The Delimitation Commission is set up by law to mark the boundaries of constituencies and to settle which seats are reserved. The other commissions deal with finance, law reform and planning.',
}));
Q('m_women', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Suppose a State Legislative Assembly has 150 directly elected seats. Once the Constitution (106th Amendment) Act, 2023 takes effect, how many of these seats are covered by the one-third reservation for women?',
  opts: ['50', '30', '75', '15'],
  sol: 'One-third of 150 is 50. The Act provides one-third reservation for women in the Lok Sabha and State Legislative Assemblies and, as of 2024, is to take effect after the delimitation that follows the next census. Thirty, 75 and 15 are one-fifth, one-half and one-tenth.',
}));
Q('m_franchise', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In the imagined village of Dhanpur, the elders decide that landless labourers and women will not be allowed to vote at a village election. Which principle of free and fair elections does this go against?',
  opts: ['Universal adult franchise, the right of every adult citizen to vote', 'The model code of conduct', 'Reservation for women', 'The voting age of 25'],
  sol: 'Universal adult franchise gives the vote to every adult citizen without conditions of property or sex. The model code concerns conduct during the campaign, reservation concerns seats, and the voting age is 18, not 25.',
}));
Q('m_age', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'The voting age in India was lowered from 21 to 18 years by',
  opts: ['the 61st Amendment, 1988', 'the 42nd Amendment, 1976', 'the 44th Amendment, 1978', 'the 86th Amendment, 2002'],
  sol: 'The 61st Amendment of 1988 lowered the voting age to 18. The 42nd added Fundamental Duties, the 44th removed the property right from Part III, and the 86th inserted Article 21A.',
}));
Q('m_contest', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Meghna, a citizen of exactly 23 years, wishes to contest the Lok Sabha election. What is her position?',
  opts: ['She is too young to contest, as the minimum age is 25', 'She can contest because the minimum age is the same as the voting age', 'She can contest only from a reserved seat', 'She can contest if her party agrees'],
  sol: 'A person must be at least 25 to contest the Lok Sabha, while the voting age is 18. Age for contesting does not vary with reserved seats or party consent.',
}));

// ---------------------------------------------------------------- t02 Election Commission and reforms
Q('m_art324', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which Article of the Constitution sets up the Election Commission of India?',
  opts: ['Article 324', 'Article 32', 'Article 226', 'Article 51A'],
  sol: 'Article 324 gives the superintendence, direction and control of elections to the Election Commission. Article 32 is the remedy to the Supreme Court, Article 226 the High Courts\' power, and Article 51A lists the Fundamental Duties.',
}));
Q('m_ec_members', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Since 1993 the Election Commission has been',
  opts: ['a three-member body', 'a one-member body only', 'a body of ten members', 'a body appointed afresh before every election'],
  sol: 'It consists of the Chief Election Commissioner and other Election Commissioners, and since 1993 it has had three members. It is a permanent body, not appointed afresh for each election.',
}));
Q('m_cec_remove', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A minister in the imagined country of Sundaria is annoyed with the Chief Election Commissioner and wants to dismiss the officer at once. Why can this not simply be done in India?',
  opts: ['Removal is possible only in the manner of a Supreme Court judge, which protects the Commissioner\'s tenure', 'The Prime Minister cannot remove anyone', 'The Commissioner is appointed for life by voters', 'The Commissioner works only during election weeks'],
  sol: 'Security of tenure means removal only by the process used for a Supreme Court judge, so the government of the day cannot act alone. The Commissioner is not chosen by voters, and the Commission is a permanent body, not one that works only in election weeks.',
}));
Q('m_mcc', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'After the Election Commission of Sundaria announces the schedule, the Minister of Lakhnor tells a rally that a new bridge will be sanctioned for the ward if his party wins. Which instrument does this raise concerns about?',
  opts: ['The model code of conduct', 'The Fundamental Duties', 'The writ of habeas corpus', 'The Delimitation Commission order'],
  sol: 'The model code of conduct is a set of rules for parties and governments from the announcement of the schedule. It restricts new announcements and promises made with government power during that period. The other options concern duties, detention and boundaries.',
}));
Q('m_symbol', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A new party in the imagined state of Kiranpur wants recognition and a symbol that voters who cannot read can identify on the machine. Which body decides this?',
  opts: ['The Election Commission', 'The Delimitation Commission', 'Parliament, by a new law each time', 'The High Court of the state'],
  sol: 'The Election Commission recognises parties and allots symbols. The Delimitation Commission draws boundaries, Parliament does not decide each case, and the High Court does not do this work.',
}));
Q('m_repoll', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'During the imagined election in the Sundarian constituency of Karanpur, a mob wrecks a polling station and many ballots are lost. Which power of the Election Commission fits the situation?',
  opts: ['It can order a fresh poll there and, if needed, postpone the election', 'It can dismiss the Chief Minister of the state', 'It can declare the seat reserved', 'It can amend the Constitution'],
  sol: 'The Commission can order a repoll at the affected stations and can postpone elections when free and fair voting is not possible. It does not remove Chief Ministers, reserve seats or amend the Constitution.',
}));
Q('m_evm', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Electronic voting machines were used in all constituencies for the first time in the Lok Sabha election of',
  opts: ['2004', '1977', '1989', '2019'],
  sol: 'EVMs were used across the country in 2004. They were tried earlier in some places but were not used in every constituency before then.',
}));
Q('m_vvpat', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'After pressing a button at a polling station in the imagined Sundarian constituency of Amrapur, Sunita sees a paper slip with the symbol of her chosen party through a window for a few seconds. Why does this slip appear?',
  opts: ['So that she can check that the vote was recorded as she intended', 'So that she can take it home as proof', 'So that the count of votes can be skipped', 'So that the candidate learns who voted for him'],
  sol: 'A voter verifiable paper audit trail shows the choice briefly and stores the slip in a sealed box for later verification. It is not taken home, the count is not skipped, and the vote stays secret.',
}));
Q('m_nota', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Divya presses the NOTA button in the imagined Sundarian constituency of Hirapur. What does this do?',
  opts: ['It records that she rejects all the candidates, without changing who wins', 'It makes the election void in Hirapur', 'It adds her vote to the winning candidate', 'It cancels the vote of the previous voter'],
  sol: 'NOTA, None of the Above, lets a voter record rejection of all candidates while keeping the vote secret. As of 2024 the candidate with the most votes among the rest is still declared the winner, so the election is not void.',
}));
Q('m_affidavit', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Before an election in Sundaria, each candidate must file a sworn statement about criminal cases, assets and education. What is the main purpose?',
  opts: ['To help voters make an informed choice', 'To decide the order of the voting list', 'To fix the number of seats', 'To give candidates a symbol'],
  sol: 'The affidavit gives voters basic information about candidates. It does not fix the order of names, the number of seats or symbols.',
}));
Q('m_proposals', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of the following is a proposal that is still discussed for electoral reform, rather than one already in force?',
  opts: ['State funding of elections', 'The EVM', 'The NOTA option', 'The EPIC card'],
  sol: 'State funding of elections is a proposal that people discuss. The EVM, NOTA and EPIC are already in use.',
}));
Q('m_reform_aim', mcq({
  t: 2, d: 4, c: 'evaluation',
  stem: 'A student in Sundaria argues, "Disclosure of criminal cases by candidates is not enough to curb criminalisation of politics." Which view supports her?',
  opts: ['Information helps only if voters use it, and parties also choose whom to nominate', 'Voters do not have a right to information', 'A disclosure always makes a candidate lose', 'Parties never nominate candidates with cases'],
  sol: 'Disclosure helps voters only when they act on it, and the choice of candidates also rests with parties. This supports the view that more may be needed. The other statements are not accurate generalisations.',
}));

// ---------------------------------------------------------------- assertion-reason
Q('ar_plural', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'A candidate in a first past the post election can win with less than half of the votes cast.',
  r: 'The first past the post system requires only that a candidate gets more votes than each rival.',
  sol: 'Both statements are true, and R explains A: since only the largest number is needed, a winner may hold less than half the votes.',
}));
Q('ar_gap', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'In the imagined Sundarian election, a party with 40 per cent of the votes won 60 per cent of the seats.',
  r: 'Seats under first past the post are decided constituency by constituency, not by the total share of votes across the country.',
  sol: 'Both are true, and R explains A: a party can win narrowly in many constituencies, so its seat share can exceed its vote share.',
}));
Q('ar_pr', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Small parties usually win seats close to their vote share under proportional representation.',
  r: 'Proportional representation distributes seats to parties in proportion to the votes they receive.',
  sol: 'Both are true, and R explains A: when seats follow vote shares, a small party with, say, 5 per cent gets about 5 per cent of the seats.',
}));
Q('ar_rs', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Members of the Rajya Sabha are elected directly by all adult citizens in a first past the post election.',
  r: 'India uses proportional representation by the single transferable vote for indirect elections such as those to the Rajya Sabha.',
  sol: 'A is false: Rajya Sabha members are chosen by elected members of State Legislative Assemblies. R is true, since the single transferable vote is used there.',
}));
Q('ar_cec', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Since 1993 the Election Commission has had three members.',
  r: 'Article 324 vests the superintendence, direction and control of elections in the Election Commission.',
  sol: 'Both are true, but the size of the Commission is not explained by the Article: Article 324 gives the Commission its role, while the three-member form dates from 1993.',
}));
Q('ar_reserved', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'In a constituency reserved for Scheduled Castes, only candidates belonging to Scheduled Castes may contest.',
  r: 'In such a constituency, only voters belonging to Scheduled Castes are allowed to vote.',
  sol: 'A is true. R is false: all registered voters of the constituency vote, whatever their community.',
}));

// ---------------------------------------------------------------- true-false, fill-blank, match, ordering
Q('tf_majority', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'Under first past the post, a candidate must win more than half of the votes cast in order to be declared elected.',
  sol: 'A plurality is enough: the candidate with the most votes wins, even if this is less than half of the votes cast.',
}));
Q('tf_age', tf({
  t: 2, d: 1, c: 'recall', ans: false,
  stem: 'The minimum voting age in India is still 21 years.',
  sol: 'The 61st Amendment of 1988 lowered the voting age from 21 to 18 years.',
}));
Q('tf_nota', tf({
  t: 2, d: 3, c: 'application', ans: true,
  stem: 'In the imagined Sundarian constituency of Veerpur, NOTA receives the most votes, but the candidate with the highest number of votes among the actual candidates is still declared elected, as in India as of 2024.',
  sol: 'NOTA records rejection but does not decide the winner under the present rules; the leading real candidate is declared elected.',
}));
Q('tf_vvpat', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'A VVPAT unit prints a paper slip that the voter can see briefly, as a check on the electronic vote.',
  sol: 'The slip lets the voter confirm the choice and is stored in a sealed box for verification.',
}));
Q('fb_fptp', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'In a first past the post election, the candidate who gets the ___ votes in a constituency is declared the winner.',
  acc: [['most', 'highest', 'largest', 'maximum']],
  sol: 'The candidate with the most votes, the highest number, is declared elected under this system.',
}));
Q('fb_art324', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The Election Commission of India derives its authority from Article ___ of the Constitution.',
  acc: [['324', 'three hundred and twenty-four', 'three hundred twenty four']],
  sol: 'Article 324 places superintendence of elections in the Commission.',
}));
Q('fb_61', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The ___ Amendment, passed in 1988, lowered the voting age from 21 to 18.',
  acc: [['61st', '61', 'sixty-first', 'sixty first']],
  sol: 'The 61st Amendment of 1988 made 18 the voting age.',
}));
Q('mt_bodies', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: 'Match each office or body with the way it is filled.',
  pairs: [
    ['Lok Sabha', 'Voters in each constituency, by first past the post'],
    ['Rajya Sabha', 'Elected members of State Legislative Assemblies, by the single transferable vote'],
    ['President', 'Elected MPs and MLAs, by the single transferable vote'],
    ['Vice-President', 'Members of both Houses of Parliament, by the single transferable vote'],
  ],
  sol: 'Direct elections use first past the post; the Rajya Sabha, the President and the Vice-President are elected indirectly through the single transferable vote.',
}));
Q('mt_reforms', match({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each reform with what it does.',
  pairs: [
    ['EPIC', 'Gives voters a photo identity card'],
    ['VVPAT', 'Prints a paper slip that the voter can see briefly'],
    ['NOTA', 'Allows voters to reject all candidates'],
    ['Candidate affidavit', 'Declares criminal cases, assets and education'],
  ],
  sol: 'These reforms try to reduce impersonation, check the machine count, give a way to reject all candidates and inform voters.',
}));
Q('ord_reforms', ord({
  t: 2, d: 3, c: 'understanding', marks: 2,
  stem: 'Arrange these four changes to elections in India in the order in which they took place, earliest first.',
  items: [
    'The voting age is lowered from 21 to 18',
    'The Election Commission becomes a three-member body',
    'Electronic voting machines are used in every constituency',
    'The NOTA option is introduced',
  ],
  sol: 'The voting age change was in 1988, the three-member Commission in 1993, EVMs in all constituencies in 2004 and NOTA in 2013.',
}));
Q('ord_steps', ord({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'In the imagined Sundarian election at Nilgiri Heights, arrange these steps in the order in which they usually take place.',
  items: [
    'The Election Commission announces the schedule and the model code of conduct begins',
    'Candidates file nominations with their affidavits',
    'Campaigning takes place under the model code',
    'Polling is held and the votes are counted',
  ],
  sol: 'The schedule comes first, then nominations, campaigning, and finally polling and counting.',
}));

// ================================================================ short answers (2 marks)
Q('s_why_rep', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Why do large democracies like Sundaria elect representatives instead of letting all citizens decide every issue?',
  model: 'In a country with **millions of citizens**, it is not possible for everyone to meet and decide each issue. So people elect **representatives** who make laws for them and who must **answer to the voters** at the next election.',
  sol: 'Size of the population and the role of representatives who are accountable.',
  scheme: [['Large population makes direct decision-making impractical', 1], ['People elect accountable representatives', 1]],
}));
Q('s_fptp_def', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the first past the post system of election? Name one assembly in India chosen by it.',
  model: 'In the **first past the post** system the country is divided into **constituencies**, each electing one representative, and the **candidate with the most votes** wins even without a majority. The **Lok Sabha** is chosen in this way.',
  sol: 'Definition and one body.',
  scheme: [['Constituency with one winner, who gets the most votes', 1], ['An assembly such as the Lok Sabha or a State Legislative Assembly', 1]],
}));
Q('s_pr_def', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define proportional representation and state how the list system works.',
  model: '**Proportional representation** is a system in which each party gets **seats in proportion to its share of votes**. In the **list system**, voters choose a party, the country forms one large constituency, and seats are shared according to each party\'s vote share.',
  sol: 'The definition and the working of the list system.',
  scheme: [['Seats in proportion to votes', 1], ['List system: voters choose a party; seats follow vote share', 1]],
}));
Q('s_stv', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name two offices or bodies in India filled by proportional representation through the single transferable vote.',
  model: 'The **Rajya Sabha** is elected in this way by the elected members of the State Legislative Assemblies. The **President** and the **Vice-President** are also elected by the single transferable vote; so are members of the **Legislative Councils**, in part.',
  sol: 'Any two from the Rajya Sabha, President, Vice-President, Legislative Councils.',
  scheme: [['First office or body', 1], ['Second office or body', 1]],
}));
Q('s_reserved_def', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a reserved constituency? Who can contest and who can vote?',
  model: 'A **reserved constituency** is one set aside for the **Scheduled Castes or Scheduled Tribes**. Only **candidates from that group** may contest, but **all voters** of the constituency can vote.',
  sol: 'The meaning of reservation and the position of candidates and voters.',
  scheme: [['Seats set aside for Scheduled Castes or Scheduled Tribes', 1], ['Only candidates from the group contest, all voters vote', 1]],
}));
Q('s_ec_security', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does the Constitution protect the independence of the Chief Election Commissioner?',
  model: 'The Chief Election Commissioner has **security of tenure**: he or she can be removed only in the **same manner as a Supreme Court judge**. This means the government of the day cannot dismiss the Commissioner easily, so the Commission can act **independently**.',
  sol: 'Security of tenure and the removal process.',
  scheme: [['Removal only in the manner of a Supreme Court judge', 1], ['Government cannot dismiss easily; independence', 1]],
}));
Q('s_mcc', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'What is the model code of conduct? Why does the Election Commission enforce it during the election period?',
  model: 'The **model code of conduct** is a set of **rules for parties, candidates and governments** that applies from the announcement of the schedule. The Commission enforces it so that no party gains an **unfair advantage**, for example by using **government power** to announce new benefits, and so that elections are **free and fair**.',
  sol: 'Meaning and the purpose.',
  scheme: [['Rules for parties and governments during elections', 1], ['Purpose: a level field, free and fair elections', 1]],
}));
Q('s_nota', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is NOTA? When was it introduced?',
  model: '**NOTA**, or **None of the Above**, is an option on the voting machine that lets a voter **record that he or she rejects all the candidates**, while keeping the vote secret. It was introduced in **2013**.',
  sol: 'The meaning of NOTA and the year.',
  scheme: [['Option to reject all candidates', 1], ['Introduced in 2013', 1]],
}));
Q('s_epic_aff', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the purpose of the EPIC card and of the affidavit that candidates file.',
  model: 'The **EPIC card** is a **photo identity card** that helps prevent impersonation at the polling station. The **affidavit** is a sworn statement of a candidate\'s **criminal cases, assets and education**, which helps voters make an **informed choice**.',
  sol: 'One purpose for each reform.',
  scheme: [['EPIC as a voter identity card to prevent impersonation', 1], ['Affidavit informs voters about candidates', 1]],
}));
Q('s_delim', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does the Delimitation Commission do, and why is its work needed after a census?',
  model: 'The **Delimitation Commission** draws the **boundaries of constituencies**, including which seats are reserved. Its work is needed after a census because **populations change**, and constituencies should have a fair number of voters.',
  sol: 'The Commission\'s task and the reason.',
  scheme: [['Draws constituency boundaries and settles reserved seats', 1], ['Populations change; constituencies need fair size', 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_gap', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'In an imagined election in Sundaria with 20 seats, the Star Party got 25 per cent of the votes but only 2 seats. Explain how this can happen under first past the post.',
  model: 'Under first past the post, seats are decided **constituency by constituency**. If the Star Party came **second in many constituencies**, its votes won it nothing there. A party with a **spread-out** support can therefore get a **seat share much below its vote share**, while a party that wins narrowly in many places gets far more seats than votes.',
  sol: 'Constituency-by-constituency counting, second place gives nothing, the gap between votes and seats.',
  scheme: [['Seats decided constituency by constituency', 1], ['Coming second wins nothing', 1], ['Seat share can differ widely from vote share', 1]],
}));
Q('s3_why_india', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Give three reasons why India chose the first past the post system.',
  model: 'First, it is **simple**, which matters in a very large country where many people were voting for the first time. Second, each constituency elects one member, so a voter has a **known representative** to approach. Third, it encourages **broad-based parties** that must win support from many groups, and it tends to produce **stable governments**.',
  sol: 'Any three of the reasons given for the choice.',
  scheme: [['Simplicity for a large electorate', 1], ['A known representative per constituency', 1], ['Broad-based parties or stable governments', 1]],
}));
Q('s3_reserved', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the reasons for reserving constituencies for Scheduled Castes and Scheduled Tribes, and state the figures as of 2024.',
  model: 'Reserved seats make sure that groups who might otherwise find it hard to win have **representation in the legislature**. Only **candidates from those groups** contest, but **all voters** vote. As of 2024, the Lok Sabha has **84 seats reserved for Scheduled Castes** and **47 for Scheduled Tribes**.',
  sol: 'Reason, the rule and the dated figures.',
  scheme: [['Reason: representation of groups', 1], ['Only candidates from the group, all voters vote', 1], ['84 and 47 as of 2024', 1]],
}));
Q('s3_functions', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State any three functions of the Election Commission.',
  model: 'The Commission **supervises the preparation of electoral rolls** that list eligible voters and **sets the election schedule**. It enforces the **model code of conduct** on parties and governments, and it **recognises parties and allots symbols**. It can also order a **repoll**, postpone an election and **deploy officers** to conduct it.',
  sol: 'Any three functions.',
  scheme: [['First function', 1], ['Second function', 1], ['Third function', 1]],
}));
Q('s3_reforms', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe three electoral reforms that have already been made in India.',
  model: '**Electronic voting machines**, used in all constituencies from the **2004** Lok Sabha election, together with **VVPAT** slips. **EPIC** cards, which are photo identity cards for voters. **Affidavits** from candidates on criminal cases, assets and education, and the **NOTA** option from **2013**.',
  sol: 'Any three of the reforms.',
  scheme: [['First reform', 1], ['Second reform', 1], ['Third reform', 1]],
}));
Q('s3_women', short({
  t: 1, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe the provision for women\'s reservation in the Lok Sabha and State Assemblies, as of 2024, and say what some argue and what others argue about it.',
  model: 'The **106th Amendment Act, 2023** provides **one-third reservation for women** in the Lok Sabha and State Legislative Assemblies. As of 2024 it is to take effect **after the delimitation** that follows the next census. **Some argue** that it will raise women\'s representation; **others argue** that the details of how seats rotate need more discussion.',
  sol: 'The provision, its dated timing and two views.',
  scheme: [['One-third reservation under the 106th Amendment, 2023', 1], ['To take effect after the next delimitation (as of 2024)', 1], ['Some argue and others argue', 1]],
}));
Q('s3_proposals', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three proposals discussed for improving elections in India, presenting both some and others.',
  model: '**Some argue** for **state funding** of elections to reduce the **money power** of rich candidates; **others argue** that it would be costly. Some want measures to curb **criminalisation**; others stress that voters must use the information they get. Some propose a **mixed or proportional system**; others prefer to keep first past the post for its simplicity.',
  sol: 'Three proposals with arguments on both sides.',
  scheme: [['State funding or money power, with both views', 1], ['Criminalisation, with both views', 1], ['Mixed or proportional system, with both views', 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_fptp', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the first past the post system with its strengths and its weakness, using the imagined election in Sundaria in which a party won 40 per cent of the votes and 60 per cent of the seats.',
  model: '1. **Constituencies:** the country is divided into constituencies, each electing one representative.\n2. **Winner:** the candidate with the **most votes** wins; this is a **plurality**, not necessarily a majority.\n3. **Use in India:** the Lok Sabha and State Legislative Assemblies.\n4. **Strengths:** it is **simple**, gives voters a **clear choice** and usually yields **stable governments**.\n5. **Weakness:** the **seat share can differ from the vote share**; in Sundaria 40 per cent of the votes gave 60 per cent of the seats.',
  sol: 'Cover how the system works, where it is used, strengths and the weakness with the example.',
  scheme: [['Constituencies and one winner each', 1], ['Plurality, most votes', 1], ['Where used in India', 1], ['Strengths', 1], ['Weakness illustrated by the example', 1]],
}));
Q('l_compare', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'The students of Nilgiri Heights College prepare a chart for a Sundarian civics fair. Help them compare first past the post with proportional representation on five points: unit, who wins, voter\'s choice, result, and example.',
  model: '1. **Unit:** first past the post uses many single-winner **constituencies**; the list system treats the country as one large constituency.\n2. **Winner:** the **candidate with most votes** versus seats shared **in proportion to votes**.\n3. **Voter\'s choice:** a **candidate** versus a **party**.\n4. **Result:** seat share can **differ from** vote share versus seat share **close to** vote share.\n5. **Example:** the Lok Sabha versus the Netherlands, as commonly taught; India also uses the single transferable vote for the Rajya Sabha.',
  sol: 'One mark for each point of comparison.',
  scheme: [['Unit of election', 1], ['Who wins', 1], ['What the voter chooses', 1], ['Result and fairness', 1], ['Examples', 1]],
}));
Q('l_why_india', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain why India chose the first past the post system for its Lok Sabha and Assembly elections.',
  model: '1. **Simplicity:** it is easy for voters, many of whom were voting for the first time.\n2. **Large electorate:** counting a plurality in each constituency is simple in a vast country.\n3. **Known representative:** each area elects one member, so the voter knows whom to approach.\n4. **Broad-based parties:** parties need support from many groups to win seats.\n5. **Stability:** it helps in forming stable governments, though seat shares can differ from vote shares.',
  sol: 'Reasons for the choice, with the caveat.',
  scheme: [['Simplicity', 1], ['Large electorate', 1], ['Known representative', 1], ['Broad-based parties', 1], ['Stability, with a caveat', 1]],
}));
Q('l_reserved', long({
  t: 1, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the reservation of constituencies in India, covering Scheduled Castes and Scheduled Tribes, the Delimitation Commission and the provision for women.',
  model: '1. **Meaning:** seats in which only candidates from a group may contest, but all voters vote.\n2. **SC and ST:** as of 2024, **84** Lok Sabha seats for Scheduled Castes and **47** for Scheduled Tribes.\n3. **Delimitation Commission:** draws boundaries and settles which seats are reserved.\n4. **Women:** the **106th Amendment Act, 2023** provides **one-third reservation** in the Lok Sabha and State Assemblies.\n5. **Timing:** as of 2024, it takes effect after the delimitation that follows the next census.',
  sol: 'Meaning, figures, the Commission, the Act and its timing.',
  scheme: [['Meaning of reservation', 1], ['84 and 47 as of 2024', 1], ['Delimitation Commission', 1], ['One-third for women under the 106th Amendment', 1], ['Dated timing of effect', 1]],
}));
Q('l_ec', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the composition, independence and functions of the Election Commission.',
  model: '1. **Source:** Article 324 sets up the Commission.\n2. **Composition:** the Chief Election Commissioner and other Election Commissioners; three members since **1993**.\n3. **Independence:** the Chief Election Commissioner can be removed only in the manner of a **Supreme Court judge**; a 2023 law changed the method of appointment (as of 2024).\n4. **Functions:** it supervises electoral rolls, sets the schedule and enforces the **model code of conduct**.\n5. **Other powers:** it recognises parties, allots symbols, orders a repoll, postpones elections and deploys officers.',
  sol: 'Composition, independence, the dated note and functions.',
  scheme: [['Article 324', 1], ['Composition and 1993', 1], ['Independence and removal', 1], ['Functions: rolls, schedule, code', 1], ['Other powers', 1]],
}));
Q('l_reforms', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the electoral reforms made so far in India and the proposals still discussed.',
  model: '1. **Machines:** electronic voting machines in all constituencies from **2004**, and VVPAT slips.\n2. **Identity:** **EPIC** cards for voters.\n3. **Disclosure:** candidates\' **affidavits** on criminal records, assets and education.\n4. **Choice:** the **NOTA** option from **2013**.\n5. **Proposals:** **some argue** for state funding and curbs on money power and criminalisation, and a mixed or proportional system; **others argue** differently. Women\'s reservation is now enacted.',
  sol: 'The four reforms, then the proposals with both views.',
  scheme: [['Machines and VVPAT', 1], ['EPIC cards', 1], ['Affidavits', 1], ['NOTA from 2013', 1], ['Proposals with some and others', 1]],
}));
Q('l_eval', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Some students of Nilgiri Heights College say India should replace first past the post with proportional representation. Evaluate this view with reasons on both sides.',
  model: '1. **Case for change:** **some argue** PR matches seats to votes, so small parties and minorities get a fair voice.\n2. **Case against:** **others argue** first past the post is simple, links a voter to a representative and tends to give stable governments.\n3. **India\'s mixed use:** the single transferable vote is used for the Rajya Sabha and the Presidency.\n4. **Middle path:** a **mixed system** is also discussed.\n5. **Judgement:** the choice depends on how much weight one gives to fairness of representation and to stability.',
  sol: 'Both sides, India\'s existing use of PR, the middle path and a reasoned judgement.',
  scheme: [['Case for PR', 1], ['Case for first past the post', 1], ['India already uses PR for some elections', 1], ['A mixed system', 1], ['Reasoned judgement', 1]],
}));

// ================================================================ case-based (4 marks)
Q('c_vel', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the table and answer the questions that follow. *(An imagined result table written by SOYL for practice; the country, the candidates and the numbers are not real.)*',
  passage: '**Imagined result of the Velpur constituency, Sundaria**\n\n| Candidate | Party | Votes |\n|---|---|---|\n| Asha Rao | Sun Party | 27,500 |\n| Bimal Das | Moon Party | 26,800 |\n| Charu Lal | Star Party | 25,200 |\n| Deepa Nair | Cloud Party | 10,500 |\n\nTotal valid votes: 90,000.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which candidate is declared elected under first past the post?', model: '**Asha Rao**, who has the most votes (27,500).', sol: 'The candidate with the most votes wins.', scheme: [['Asha Rao', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Does the winner have a majority of the votes cast? Give the reason.', model: 'No. She has about **30.6 per cent**, less than half of the 90,000 votes. She has a **plurality**.', sol: '27,500 is below 45,000, half of the valid votes.', scheme: [['No, a plurality and not a majority', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): What does this result show about the weakness of first past the post?', model: 'The winner has the support of **under a third** of the voters, and about **69 per cent voted for others** who get no representation, so a result can **not reflect** the preference of most voters.', sol: 'Link the table to the weakness of the plurality rule.', scheme: [['Winner has a low share', 1], ['Most votes won nothing', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one argument for and one against keeping first past the post for such a result.', model: '**For:** it gives a **clear winner** with a representative whom Velpur voters know. **Against:** more than two-thirds of the voters did not get the candidate they chose, so **PR** or another system may be fairer.', sol: 'One point on each side.', scheme: [['One argument for', 1], ['One argument against', 1]] }),
    ]),
  ],
}));
Q('c_school', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the notice and answer the questions that follow. *(An imagined notice written by SOYL for practice; the school and its pupils are not real.)*',
  passage: '**Imagined notice, Kasturi Public School, Sundaria**\n\nThe school council has two ways to choose its class monitor and is asking Class 11 to choose. **Method X:** each section votes for one pupil, and the pupil with the most votes in that section becomes monitor. **Method Y:** all 120 pupils of the class vote for a party panel, and the five monitor posts are shared among the panels according to the share of votes each gets.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which method is like first past the post?', model: '**Method X**.', sol: 'It elects one winner in each unit with the most votes.', scheme: [['Method X', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which method is like the list system of proportional representation?', model: '**Method Y**.', sol: 'Posts are shared by party panels according to vote share.', scheme: [['Method Y', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Give one advantage of Method X and one of Method Y.', model: 'Method X is **simple** and each section knows its monitor. Method Y gives panels **posts close to their vote share**, so small groups are heard.', sol: 'One benefit for each method.', scheme: [['Benefit of Method X', 1], ['Benefit of Method Y', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Which method would you recommend for choosing the class monitor, and why?', model: 'A reasoned choice: **Method X** if a quick, clear result with a **known representative** matters; **Method Y** if **fair representation** of all groups matters more. The reasons count.', sol: 'Accept either with reasons.', scheme: [['A clear choice', 1], ['A reason using one feature of the system', 1]] }),
    ]),
  ],
}));
Q('c_news', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: 'Read the newspaper report and answer the questions that follow. *(An imagined report written by SOYL for practice; the newspaper, the place and the people are not real.)*',
  passage: '**From the Sundarian Standard, imagined, issue of 12 April**\n\nThe Election Commission of Sundaria announced the schedule for polling in the Marwar region, and the model code of conduct came into force the same day. A day before the vote, the district officer reported that two polling stations at Nahargarh had been damaged. The Commission ordered a repoll at those two stations, and sent officers from outside the district to conduct it. A candidate complained that a minister had announced a new scheme after the schedule was out, and the Commission asked for his explanation.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the power of the Commission shown when it ordered voting again at the two stations.', model: 'The power to **order a repoll**.', sol: 'A repoll is ordered when voting could not take place fairly.', scheme: [['Repoll', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Which function of the Commission is shown by sending officers from outside the district?', model: '**Deploying officers** to conduct the election fairly.', sol: 'The Commission deploys officers.', scheme: [['Deploying officers', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why does the model code of conduct restrict a minister from announcing a new scheme during the election period?', model: 'The code aims at a **level field**: a party in government should not use its **power and public money** to attract voters, so that the election remains **free and fair**.', sol: 'Link the code to a fair election.', scheme: [['Level field and no misuse of power', 1], ['Free and fair election', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why is it important that the Commission is independent of the government in such a case?', model: 'The Commission may have to act against **the government itself**, as with the minister. If it could be dismissed by the government, it might not act. The **security of tenure** of the Chief Election Commissioner protects this.', sol: 'Link independence to acting against the government.', scheme: [['May need to act against the government', 1], ['Security of tenure protects independence', 1]] }),
    ]),
  ],
}));
Q('c_letter', caseQ({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the letter and answer the questions that follow. *(An imagined letter written by SOYL for practice; the writer and the district are not real.)*',
  passage: '**An imagined letter to the editor of the Sundarian Standard**\n\nSir, in our district the new boundaries have made the reserved constituency of Palashgarh larger than before, while the nearby Bhadra constituency has far fewer voters than it had earlier. I wonder who decides the boundaries, and whether a person of my community can vote in Palashgarh, which is reserved for a Scheduled Tribe. Also, I read that seats for women will be reserved in the future. When will that take effect?',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'Which body draws the boundaries of constituencies?', model: 'The **Delimitation Commission**.', sol: 'It marks boundaries after a census.', scheme: [['Delimitation Commission', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Can a voter who does not belong to the Scheduled Tribe vote in Palashgarh? Give the reason.', model: 'Yes. **All voters** of a reserved constituency can vote; only the **candidates** must belong to the group.', sol: 'Reservation limits candidates, not voters.', scheme: [['Yes, all voters vote', 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Why is delimitation needed, and what problem does the writer point out?', model: 'Delimitation keeps constituencies **fair in size** as populations change. The writer points to a **large difference in the number of voters** between Palashgarh and Bhadra, which makes votes unequal in weight.', sol: 'Purpose of delimitation and the issue.', scheme: [['Purpose: fair size', 1], ['Unequal voter numbers', 1]] }), [
      short({ t: 1, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): State the provision for women\'s reservation and when it is to take effect, as of 2024.', model: 'The **106th Amendment Act, 2023** provides **one-third reservation** for women in the Lok Sabha and State Assemblies, to take effect **after the delimitation** that follows the next census, as of 2024.', sol: 'The Act and the timing with its date.', scheme: [['One-third reservation, 106th Amendment', 1], ['After the next delimitation, as of 2024', 1]] }),
    ]),
  ],
}));
Q('c_debate', caseQ({
  t: 2, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the classroom discussion and answer the questions that follow. *(An imagined discussion written by SOYL for practice; the school and the speakers are not real.)*',
  passage: '**Imagined civics class, Lotus Valley School, Sundaria**\n\nTeacher: Our country has used machines, identity cards and candidate affidavits. What more can be done?\n\nIshaan: I think the state should pay for campaigns, so that money does not decide who contests.\n\nZoya: But the state already has many needs. Why should taxpayers fund campaigns? Parties should raise money in open ways.\n\nIshaan: Without it, rich candidates will have an edge.\n\nZoya: Then better information and a ceiling on spending might be enough.\n\nThe teacher asked the class to weigh both views.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which proposal does Ishaan make?', model: '**State funding of elections**.', sol: 'He wants the state to pay for campaigns.', scheme: [['State funding', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'Name one reform already made that the teacher mentions.', model: 'Any one of **electronic voting machines, identity cards or candidate affidavits**.', sol: 'The teacher names three reforms.', scheme: [['One reform', 1]] })),
    child('c', short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Give one reason each for Ishaan\'s and Zoya\'s views.', model: 'Ishaan: state funding would reduce the **money power** of rich candidates. Zoya: the state has **other needs**, and the cost to taxpayers is a concern; she prefers open fundraising and spending limits.', sol: 'One reason for each speaker.', scheme: [['Ishaan\'s reason', 1], ['Zoya\'s reason', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Which view do you find stronger? Give a reason.', model: 'A reasoned view: for example, **state funding** may help new candidates, or **spending limits with disclosure** may be more practical. Marks go to the **reason**, not the choice.', sol: 'Accept either with a reason.', scheme: [['A view stated', 1], ['A reason', 1]] }),
    ]),
  ],
}));
