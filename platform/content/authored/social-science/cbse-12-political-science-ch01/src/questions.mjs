// CBSE 12 Political Science, ch01 The End of Bipolarity — question bank. Every source (diary, report,
// letter, seminar note, travel journal) is written by SOYL and labelled as imagined; no NCERT text,
// boxed source, cartoon or board/sample-paper item is reused (D-036). Real-world facts are limited to
// stable, widely recorded dates and events up to 2004; nothing after 2024 is stated.
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 The Soviet system
Q('m_party', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which body dominated political life in the Soviet Union and allowed no other party to compete with it?',
  opts: ['The Communist Party of the Soviet Union', 'The Supreme Court of the Soviet Union', 'An elected multi-party parliament', 'The Warsaw Pact command'],
  sol: 'The Soviet system was a one-party system run by the Communist Party. The other options either did not exist in that form or were not the ruling political authority (the Warsaw Pact was a military alliance).',
}));
Q('m_economy_feature', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which feature best describes the Soviet economy before 1985?',
  opts: ['A planned economy in which the state owned and controlled most of the means of production', 'A free-market economy led by private corporations', 'An economy run mainly by foreign investors', 'A barter economy without money'],
  sol: 'The Soviet economy was centrally planned and state-controlled: land and productive assets were owned by the state. It was not a market or foreign-led economy, and money was in use.',
}));
Q('m_second_world', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The East European countries that followed the Soviet model after the Second World War were often described as the',
  opts: ['second world', 'third world', 'non-aligned bloc', 'first world'],
  sol: 'The socialist countries of Eastern Europe, grouped around the Soviet Union, were called the second world. The first world meant the Western capitalist bloc, and the third world the newly independent countries, many of them non-aligned.',
}));
Q('m_strength', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following was a real **strength** of the Soviet system?',
  opts: ['It ensured a minimum standard of living, with subsidised health care, education and housing and almost no unemployment', 'It allowed open criticism of the ruling party in newspapers', 'It produced a wide range of consumer goods in plenty', 'It allowed citizens to choose freely among several parties'],
  sol: 'Basic needs were met for most citizens through state provision and guaranteed jobs. The other three describe things the Soviet system did not provide: press freedom, plentiful consumer goods and multi-party choice.',
}));
Q('m_weakness', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'An imagined Soviet factory meets its yearly target for the number of shoes made, but shops report that many pairs are badly made and do not sell. Which weakness of the Soviet system does this illustrate?',
  opts: ['Central planning rewarded meeting quantity targets, not quality or what consumers wanted', 'Too much competition between private shoe companies', 'Heavy taxes on foreign shoe imports', 'A shortage of workers caused by unemployment benefits'],
  sol: 'Plans were judged by output numbers fixed from the centre, so quality and consumer choice suffered. There was no private competition, the problem was not import duties, and there was little unemployment.',
}));
Q('m_arms', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'Why did the arms race with the United States weaken the Soviet economy in the long run?',
  opts: ['Huge resources went to weapons and the military instead of consumer goods, infrastructure and technology for daily life', 'The arms race forced the Soviet Union to buy all its weapons from the West', 'Military spending was paid for by Western loans that had to be repaid', 'The arms race made the Soviet Union close all its factories'],
  sol: 'Spending a very large share of resources on defence and the space race left too little for living standards and modern civilian technology. The Soviet Union made its own weapons, did not fund them with Western loans, and did not close its factories.',
}));
Q('m_afghan', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'In which country did Soviet troops intervene in 1979, in a long and costly campaign that further weakened the Soviet system?',
  opts: ['Afghanistan', 'Poland', 'Vietnam', 'Iran'],
  sol: 'Soviet forces entered Afghanistan in 1979 and stayed for about a decade. The other countries saw no such Soviet intervention in 1979.',
}));
Q('ar_planning', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'By the 1970s the Soviet economy had fallen behind the West in technology and in the supply of consumer goods.',
  r: 'Central planning and the absence of competition gave enterprises little reason to innovate or to respond to what consumers wanted.',
  sol: 'Both are true, and R explains A: without competition or market signals, enterprises met fixed targets and had little reason to improve technology or quality.',
}));
Q('ar_minimum', ar({
  t: 1, d: 2, c: 'analysis', key: 'b',
  a: 'Most Soviet citizens enjoyed job security and subsidised basic services.',
  r: 'The Soviet Union was the largest country in the world by area.',
  sol: 'Both statements are true, but the size of the country does not explain job security and subsidised services; those came from state planning and ownership.',
}));
Q('tf_private', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In the Soviet system, most factories and farms were owned by private citizens.',
  sol: 'Most productive assets, including land, were owned and controlled by the state; collective farms replaced private farming.',
}));
Q('fb_warsaw', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The military alliance of the Soviet Union and its East European allies, set up in 1955, was called the ___ Pact.',
  acc: [['Warsaw']],
  sol: 'The Warsaw Pact (1955) was the military alliance of the Soviet bloc, the counterpart of NATO.',
}));
Q('s_features', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two features of the Soviet political system.',
  model: '1. **One-party rule:** the **Communist Party** controlled the state and no other party could compete.\n2. **Centralised, bureaucratic power:** decisions were taken at the top, and dissent and criticism were not tolerated.',
  sol: 'Any two of: one-party rule, centralised authority, heavy bureaucracy, limits on free expression.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_strength_weak', short({
  t: 1, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give one strength and one weakness of the Soviet economic system.',
  model: '**Strength:** it guaranteed **jobs** and a **minimum standard of living**, with subsidised health care, schooling and housing.\n**Weakness:** central planning produced **shortages of consumer goods** and **low quality**, and the economy fell behind in technology.',
  sol: 'One genuine strength and one genuine weakness, each explained in a phrase.',
  scheme: [['A strength with explanation', 1], ['A weakness with explanation', 1]],
}));
Q('s3_stagnation', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three reasons why the Soviet economy stagnated in the 1970s and early 1980s.',
  model: '1. **Rigid central planning:** targets fixed from Moscow ignored quality and consumer demand, so shops often lacked goods people wanted.\n2. **Defence burden:** a large share of resources went into the **arms race** and later the **Afghanistan** campaign.\n3. **Little innovation:** without competition, enterprises had no reason to adopt new technology, so the Soviet Union fell behind the West in productivity.',
  sol: 'Three distinct causes, each linked to slower growth.',
  scheme: [['First reason explained', 1], ['Second reason explained', 1], ['Third reason explained', 1]],
}));
Q('l_system', long({
  t: 1, d: 3, c: 'evaluation', marks: 5, wl: L5,
  stem: 'The Soviet system met basic needs but failed to meet people\'s rising aspirations. Evaluate this statement.',
  model: '1. **Basic needs met:** citizens had **guaranteed jobs**, subsidised **health care, education and housing**, and very little unemployment.\n2. **Industrial and scientific power:** a large industrial base, energy resources and achievements in space and defence made it a superpower.\n3. **Shortages:** consumer goods were scarce and often of poor quality; people waited in long queues.\n4. **No political voice:** one-party rule, a heavy bureaucracy and curbs on free expression left citizens unable to change policies.\n5. **Judgement:** as people learnt more about life in the West, the gap between their **aspirations** and what the system offered widened, which weakened its legitimacy.',
  sol: 'Two points on achievements, two on failures, and a reasoned judgement.',
  scheme: [['Basic needs met', 1], ['Industrial or scientific strength', 1], ['Economic failure: shortages or quality', 1], ['Political failure: no voice', 1], ['Reasoned judgement', 1]],
}));
Q('src_teacher', source({
  t: 1, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source about a teacher in Moscow and answer the questions that follow. *(An imagined diary written by SOYL for practice; the person is not real.)*',
  passage: '**From the diary of Lyudmila, an imagined schoolteacher in Moscow, winter 1984**\n\nToday I stood two hours in a queue for boots, and the shop ran out before my turn. Still, I must not complain too much: my rent is tiny, my son\'s school and the clinic cost us nothing, and nobody I know is without a job. At the staff meeting the party secretary read out our new targets. No one asked a question; one does not. In the evening my brother tuned his radio to a foreign station, very low, and we heard about shops in the West full of goods. He laughed and said our factories make more tractors than anyone, but nobody can buy a good pair of boots.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'understanding', marks: 1, stem: 'Identify one benefit of the Soviet system that Lyudmila mentions.', model: 'Low **rent**, free **schooling and health care**, or **guaranteed jobs** (any one).', sol: 'Any one basic need met by the state, taken from the diary.', scheme: [['One benefit from the source', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which line of the diary shows that people could not openly question decisions?', model: '"No one asked a question; **one does not**" — after the party secretary read out the targets.', sol: 'Quote the line about the staff meeting.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What does the brother\'s remark about tractors and boots suggest about Soviet economic priorities?', model: 'The plan stressed **heavy industry and output targets** (tractors) over **consumer goods** (boots). So the economy was strong in quantity of industrial goods but weak in meeting **everyday consumer needs**.', sol: 'Contrast heavy industry with consumer goods and link it to planning priorities.', scheme: [['Heavy industry or targets favoured', 1], ['Consumer needs neglected', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why might listening to foreign radio have worried the Soviet leadership?', model: 'It showed people that life in the **West** offered more consumer goods and freedom, which raised their **aspirations** and made them question their own system, so it could weaken support for the **party**.', sol: 'Link outside information to rising expectations and loss of legitimacy.', scheme: [['Information about the West', 1], ['Effect on expectations or support for the system', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 Gorbachev and the disintegration
Q('m_gorbachev_year', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In which year did Mikhail Gorbachev become General Secretary of the Communist Party of the Soviet Union?',
  opts: ['1985', '1979', '1989', '1991'],
  sol: 'Gorbachev took over the party leadership in 1985. 1979 is the Afghanistan intervention, 1989 the year of the East European revolutions, and 1991 the end of the Soviet Union.',
}));
Q('m_glasnost', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What did Gorbachev\'s policy of **glasnost** aim at?',
  opts: ['Greater openness, allowing more information and public discussion', 'Economic restructuring of state enterprises', 'Military expansion into Eastern Europe', 'Returning all land to former landlords'],
  sol: 'Glasnost means openness: freer discussion and information. Economic restructuring is perestroika; the other two were not Gorbachev\'s policies.',
}));
Q('m_perestroika', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A Soviet minister in 1987 announces that factories will get more freedom to decide what to produce and some private businesses will be allowed. This step belongs to which policy?',
  opts: ['Perestroika (restructuring)', 'Glasnost (openness)', 'Shock therapy', 'Détente'],
  sol: 'Loosening central control of the economy is perestroika. Glasnost is about openness of information; shock therapy came after 1991 in the new states; détente is a Cold War term for easing tensions.',
}));
Q('m_berlin', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The fall of which structure in November 1989 became a symbol of the collapse of communist rule in Eastern Europe?',
  opts: ['The Berlin Wall', 'The Great Wall', 'The Iron Bridge of Prague', 'The Kremlin wall'],
  sol: 'The Berlin Wall, which divided East and West Berlin, was opened in November 1989; Germany was unified in 1990.',
}));
Q('m_baltic', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which group of Soviet republics was among the first to declare independence from the Soviet Union?',
  opts: ['Estonia, Latvia and Lithuania', 'Kazakhstan, Uzbekistan and Turkmenistan', 'Russia, Ukraine and Belarus', 'Georgia, Armenia and Azerbaijan'],
  sol: 'The three Baltic republics led the demand for independence in 1990–91. Russia, Ukraine and Belarus later declared the Union ended, but they were not the first to break away.',
}));
Q('m_cis', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In December 1991 the leaders of Russia, Ukraine and Belarus announced that the Soviet Union had ceased to exist. What did they set up in its place?',
  opts: ['The Commonwealth of Independent States (CIS)', 'The Warsaw Pact', 'The European Union', 'The Shanghai Cooperation Organisation'],
  sol: 'They formed the CIS, a loose association of former Soviet republics. The Warsaw Pact was dissolved in 1991; the EU and SCO are different organisations.',
}));
Q('m_successor', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'After December 1991, which country took the Soviet Union\'s permanent seat in the UN Security Council?',
  opts: ['Russia', 'Ukraine', 'Kazakhstan', 'Belarus'],
  sol: 'Russia was accepted as the successor state of the Soviet Union and inherited its permanent seat in the Security Council.',
}));
Q('m_cause_nationalism', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of the following is generally seen as one of the most immediate causes of the break-up of the Soviet Union?',
  opts: ['The rise of nationalism and the demand for sovereignty in its republics', 'An invasion of the Soviet Union by NATO', 'A famine caused by a failed monsoon', 'The Soviet Union losing a war with China in 1991'],
  sol: 'Nationalist movements in the Baltic republics, Ukraine, Georgia and elsewhere demanded sovereignty and finally independence. There was no NATO invasion, no monsoon famine and no war with China.',
}));
Q('m_coup', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'In August 1991 a group of communist hardliners tried to remove Gorbachev from power, but the attempt failed amid public resistance led by Boris Yeltsin. What was the main effect of this failure?',
  opts: ['It weakened the central government further and strengthened the leaders of the republics, speeding the break-up', 'It restored the Communist Party to full power', 'It led directly to a war between the Soviet Union and the United States', 'It ended the reforms and brought back central planning'],
  sol: 'The failed coup discredited the hardliners and the centre, while republican leaders such as Yeltsin gained authority; within months the Union was dissolved. The other options describe outcomes that did not happen.',
}));
Q('ar_reforms', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Gorbachev\'s reforms satisfied neither those who wanted faster change nor those who wanted to keep the old system.',
  r: 'Reformers found the pace of change too slow, while many party members felt their power and privileges were under threat.',
  sol: 'Both are true and R explains A: the reforms opened up expectations that they could not meet quickly, while also alarming conservatives in the party.',
}));
Q('ar_end_cold_war', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'The disintegration of the Soviet Union marked the end of the Cold War.',
  r: 'After 1991 the United States also stopped being a major military power.',
  sol: 'A is true: the rivalry of the two blocs ended with the Soviet Union. R is false: the United States remained the most powerful military state and the world was often described as unipolar.',
}));
Q('tf_gorbachev_aim', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Gorbachev introduced his reforms in order to break up the Soviet Union.',
  sol: 'He wanted to **reform** and revive the system and keep the Union together; the break-up was an unintended result of the forces the reforms released.',
}));
Q('fb_cis_year', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The Soviet Union formally came to an end in December ___.',
  acc: [['1991']],
  sol: 'The Union was dissolved in December 1991, and Gorbachev resigned as its President that month.',
}));
Q('ord_events', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events of the late Soviet period in chronological order.',
  items: [
    'Gorbachev becomes General Secretary of the Communist Party',
    'The Berlin Wall is opened',
    'A coup attempt against Gorbachev fails',
    'The Commonwealth of Independent States is formed',
  ],
  sol: '1985 Gorbachev takes over; November 1989 the Berlin Wall opens; August 1991 the coup fails; December 1991 the CIS is formed.',
}));
Q('mt_terms', match({
  t: [2, 3], d: 2, c: 'understanding',
  stem: 'Match each term from the end of the Soviet era with what it refers to.',
  pairs: [
    ['Perestroika', 'Restructuring of the economy'],
    ['Glasnost', 'Openness in information and discussion'],
    ['CIS', 'Loose association of former Soviet republics'],
    ['Shock therapy', 'Sudden switch to a capitalist economy'],
  ],
  sol: 'Perestroika and glasnost were Gorbachev\'s reforms; the CIS replaced the Union in 1991; shock therapy was the model of rapid transition followed after 1991.',
}));
Q('s_glas_pere', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between perestroika and glasnost.',
  model: '**Perestroika** (restructuring) aimed to **reform the economy**, giving enterprises more freedom and allowing some private activity.\n**Glasnost** (openness) aimed to allow **freer information and public discussion**, including criticism of past and present policies.',
  sol: 'One for the economy, one for openness of information.',
  scheme: [['Perestroika explained', 1], ['Glasnost explained', 1]],
}));
Q('s_nationalism', short({
  t: 2, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'How did nationalism in the republics contribute to the end of the Soviet Union?',
  model: 'Republics such as the **Baltic states**, Ukraine and Georgia felt their languages, cultures and resources were controlled by the centre. Once **glasnost** allowed open debate, they demanded **sovereignty** and finally **independence**, and the Union could not hold them together.',
  sol: 'Grievance against the centre, then demands for sovereignty made possible by reforms.',
  scheme: [['Grievance of the republics', 1], ['Demand for sovereignty/independence weakening the Union', 1]],
}));
Q('s_unipolar', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why was the world after 1991 often described as unipolar?',
  model: 'With the Soviet Union gone, the **United States** was left as the **only superpower**, with unmatched military and economic strength, so one centre of power dominated world politics instead of two.',
  sol: 'Explain the end of the two-bloc rivalry and the dominance of one power.',
  scheme: [['End of the second superpower', 1], ['Dominance of the United States', 1]],
}));
Q('s3_consequences', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain any three consequences of the disintegration of the Soviet Union for world politics.',
  model: '1. **End of the Cold War:** the bloc rivalry and the arms race between the two superpowers came to an end.\n2. **Change in power relations:** the United States emerged as the sole superpower, and **capitalism** became the dominant economic model, with bodies like the **IMF and World Bank** advising many countries.\n3. **New states:** fifteen independent countries emerged, with their own aspirations; the Baltic states later joined the **EU and NATO**.',
  sol: 'Three distinct consequences, each explained.',
  scheme: [['First consequence', 1], ['Second consequence', 1], ['Third consequence', 1]],
}));
Q('s3_causes', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three reasons why Gorbachev\'s reforms ended in the break-up of the Soviet Union rather than its renewal.',
  model: '1. **Rising expectations:** glasnost let people speak, and they demanded far faster change than the system could deliver.\n2. **Opposition from conservatives:** party hardliners resisted, ending in the failed **August 1991 coup** that discredited the centre.\n3. **Nationalism:** the republics used the new freedom to demand **sovereignty**, and leaders like Yeltsin in Russia gained more authority than the Union government.',
  sol: 'Three reasons that connect the reforms to the collapse.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason', 1]],
}));
Q('l_causes', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Examine the main causes of the disintegration of the Soviet Union. Which cause do you consider the most important, and why?',
  model: '1. **Economic stagnation:** central planning, consumer shortages and falling behind the West in technology.\n2. **Cost of the arms race** and of the **Afghanistan** campaign drained resources.\n3. **Political rigidity:** one-party rule and an unaccountable bureaucracy lost public trust.\n4. **Reforms and nationalism:** glasnost and perestroika raised expectations and allowed the republics, led by the **Baltic states**, to demand sovereignty; the failed **1991 coup** finished the centre\'s authority.\n5. **Judgement:** economic weakness made the system fragile, but **nationalism** in the republics was the most immediate cause, because it turned reform into break-up. (Any reasoned choice is accepted.)',
  sol: 'Four causes and a justified judgement on the most important one.',
  scheme: [['Economic cause', 1], ['Military burden', 1], ['Political cause', 1], ['Reforms and nationalism', 1], ['Justified judgement', 1]],
}));
Q('l_gorbachev', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe Gorbachev\'s reforms and explain how they led to consequences he did not intend.',
  model: '1. **Aim:** to revive a stagnant economy and catch up with the West while keeping the Union and the party.\n2. **Perestroika:** more freedom for enterprises and some private activity.\n3. **Glasnost:** freer information and debate; he also let the East European states choose their own path, and their communist governments fell in **1989**.\n4. **Unintended results:** people demanded faster change, conservatives resisted, and the republics demanded **sovereignty**.\n5. **Outcome:** after the failed **August 1991** coup, the centre lost authority and the Union was dissolved in **December 1991**, the opposite of his aim.',
  sol: 'Aim, the two reforms, and the chain of unintended results to 1991.',
  scheme: [['Aim of the reforms', 1], ['Perestroika', 1], ['Glasnost and Eastern Europe', 1], ['Unintended pressures', 1], ['Outcome in 1991', 1]],
}));
Q('src_report', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source, an imagined newspaper report from December 1991, and answer the questions that follow. *(Written by SOYL for practice; the newspaper and reporter are not real.)*',
  passage: '**"A Union ends quietly" — imagined report in a daily newspaper, December 1991**\n\nLeaders of three Soviet republics met at a hunting lodge in Belarus this week and signed a short document declaring that the Union no longer exists "as a subject of international law". In its place they proposed a commonwealth, open to the other republics. In Moscow, people queued for bread as usual; some shrugged, others wept. The President of the Union, whose reforms had begun six years earlier, is expected to resign within days. Diplomats are already asking which state will take the Union\'s seat at the United Nations.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Name the "commonwealth" proposed by the three republics.', model: 'The **Commonwealth of Independent States (CIS)**.', sol: 'The body formed in December 1991 was the CIS.', scheme: [['CIS', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Who is the "President of the Union, whose reforms had begun six years earlier"?', model: '**Mikhail Gorbachev** (reforms from 1985).', sol: 'December 1991 minus six years is 1985, when Gorbachev took over.', scheme: [['Gorbachev', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Answer the diplomats\' question: which state took the seat, and why?', model: '**Russia** took the Union\'s permanent seat in the Security Council, because it was accepted as the **successor state** of the Soviet Union, being its largest and most powerful part.', sol: 'Name Russia and give the successor-state reason.', scheme: [['Russia', 1], ['Successor state reason', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The report says some people "shrugged". What might explain such a calm reaction to so great a change?', model: 'Years of **shortages** and **stagnation** had worn away people\'s faith in the system, and the republics had already been acting on their own, so for many the end of the Union only **confirmed** what had already happened.', sol: 'Link loss of faith in the system to the calm reaction.', scheme: [['Loss of faith due to shortages or stagnation', 1], ['Union already weakened in practice', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Shock therapy
Q('m_shock_def', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'What does **shock therapy** refer to in post-communist countries?',
  opts: ['A sudden, rapid change from a state-controlled economy to a capitalist market economy', 'A slow, step-by-step move towards socialism', 'A medical programme for war veterans', 'A military campaign against breakaway regions'],
  sol: 'Shock therapy was the model of a fast, all-at-once transition to capitalism, encouraged by the World Bank and the IMF. The other options describe something else.',
}));
Q('m_shock_advisers', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Which international institutions strongly influenced the shock-therapy model of transition?',
  opts: ['The World Bank and the International Monetary Fund', 'The Warsaw Pact and Comecon', 'SAARC and ASEAN', 'The Non-Aligned Movement and the Commonwealth'],
  sol: 'The transition model was promoted by the World Bank and the IMF. The Warsaw Pact and Comecon belonged to the old Soviet bloc; the others are unrelated regional or political groupings.',
}));
Q('m_shock_measure', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined post-Soviet government in 1992 sells state factories to private owners, frees prices overnight and opens its borders to foreign trade and investment. Which approach is it following?',
  opts: ['Shock therapy', 'Central planning', 'Import substitution', 'Perestroika'],
  sol: 'Rapid privatisation, price freedom and opening to world markets all at once is shock therapy. Central planning and import substitution do the opposite; perestroika was a limited reform inside the Soviet system.',
}));
Q('m_shock_effect', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which of the following was a widely observed result of shock therapy in Russia in the 1990s?',
  opts: ['High inflation that wiped out savings, and a sharp fall in industrial output', 'An immediate rise in living standards for almost everyone', 'Stronger state welfare and new subsidies on food', 'The return of collective farms everywhere'],
  sol: 'Prices soared and the value of the rouble collapsed, wiping out savings; many industries lost value or shut. Living standards fell for many, welfare was cut back and collective farming broke down.',
}));
Q('m_shock_inequality', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'State assets in an imagined post-Soviet country are sold quickly at very low prices, mostly to a few well-connected buyers. What is the most likely consequence?',
  opts: ['A sharp rise in inequality, with a small rich group and many impoverished people', 'Equal ownership of factories by all citizens', 'An end to corruption in business', 'Lower prices for all goods'],
  sol: 'Rapid, undervalued sales concentrated wealth in a few hands; this widened the gap between rich and poor. The other outcomes did not follow from such sales.',
}));
Q('m_shock_democracy', mcq({
  t: 3, d: 3, c: 'evaluation',
  stem: 'Which statement best describes the **political** side of the post-communist transition in many of these states?',
  opts: ['Constitutions, elections and multi-party systems were set up, but many new democratic institutions remained weak and executive power was strong', 'They returned to one-party communist rule within a year', 'They abolished all elections in favour of monarchy', 'They became fully stable democracies with strong parliaments immediately'],
  sol: 'Democratic forms were introduced, but institutions such as parliaments and courts were often weak in practice, with power concentrated in the executive. The other options are inaccurate generalisations.',
}));
Q('ar_rouble', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Many ordinary Russians lost their life savings in the early 1990s.',
  r: 'Very high inflation sharply reduced the value of the rouble.',
  sol: 'Both are true and R explains A: when prices rose many times over, money saved in roubles bought very little.',
}));
Q('ar_welfare', ar({
  t: 3, d: 3, c: 'analysis', key: 'd',
  a: 'Shock therapy strengthened the old system of social welfare in Russia.',
  r: 'Under shock therapy the state withdrew from many economic activities and cut subsidies.',
  sol: 'A is false: the old welfare system was dismantled rather than strengthened. R is true: the state withdrew and subsidies were reduced.',
}));
Q('tf_farms', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Under shock therapy, collective farms were replaced by private farming, which affected food security in some areas.',
  sol: 'The collective farm system broke down as land moved to private hands, and food supply was disrupted in places during the transition.',
}));
Q('fb_shock', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The model of a rapid transition from communism to capitalism followed by Russia and others after 1991 is known as ___ therapy.',
  acc: [['shock']],
  sol: 'It is called shock therapy because the change was made suddenly and all at once.',
}));
Q('s_shock_meaning', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What was shock therapy? Name any one of its measures.',
  model: '**Shock therapy** was a **sudden, all-at-once transition** from a state-controlled socialist economy to a **capitalist market economy**, backed by the World Bank and IMF. One measure: rapid **privatisation** of state-owned enterprises.',
  sol: 'Meaning plus one measure (privatisation, free prices, free trade, currency convertibility, foreign investment).',
  scheme: [['Meaning', 1], ['One measure', 1]],
}));
Q('s_shock_two', short({
  t: 3, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain any two economic consequences of shock therapy in Russia.',
  model: '1. **Inflation and loss of savings:** prices rose many times over and the rouble lost value, wiping out people\'s savings.\n2. **Industrial decline:** state factories were sold cheaply or closed, so output and jobs fell sharply.',
  sol: 'Any two genuine consequences, each explained.',
  scheme: [['First consequence', 1], ['Second consequence', 1]],
}));
Q('s3_shock_inequality', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How did shock therapy increase economic inequality in the former Soviet states? Give three points.',
  model: '1. **Cheap privatisation:** state assets were sold quickly and below value, often to insiders, creating a small, very rich class.\n2. **Loss of security:** guaranteed jobs and subsidised services were cut, so many workers and pensioners became poor.\n3. **Weak regulation:** corruption and a **criminal economy** grew, rewarding those with connections rather than ordinary citizens.',
  sol: 'Three mechanisms that widened the gap between rich and poor.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]],
}));
Q('s3_shock_political', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Assess the political results of the transition in the former Soviet states.',
  model: '1. **New institutions:** constitutions, **elections** and multi-party systems were introduced, a clear break from one-party rule.\n2. **Weak checks:** parliaments, courts and the media were often weak, and **executive power** remained strong; some leaders became authoritarian.\n3. **Judgement:** the transition created democratic **forms**, but in many states the **substance** of democracy took much longer to develop.',
  sol: 'A gain, a limitation and a balanced judgement.',
  scheme: [['Democratic gains', 1], ['Limitations', 1], ['Balanced judgement', 1]],
}));
Q('l_shock', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Shock therapy promised prosperity but brought hardship to many. Critically examine the consequences of shock therapy in the post-communist states.',
  model: '1. **Meaning:** a rapid switch to capitalism through **privatisation**, free prices, free trade and foreign investment, advised by the **World Bank and IMF**.\n2. **Economic shock:** industries lost value and many closed; **inflation** wiped out savings and the rouble lost value.\n3. **Social cost:** the welfare system was dismantled; collective farms broke up, affecting **food security**; poverty and **inequality** rose and a **criminal economy** spread.\n4. **Political change:** elections and new constitutions came, but institutions stayed weak and executive power strong.\n5. **Assessment:** the speed of change, without social protection, caused great hardship; some later growth came mainly from **oil and gas** exports, not from a broad recovery.',
  sol: 'Meaning, economic, social and political effects, and a reasoned assessment.',
  scheme: [['Meaning of shock therapy', 1], ['Economic effects', 1], ['Social effects', 1], ['Political effects', 1], ['Reasoned assessment', 1]],
}));
Q('src_engineer', source({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the source, an imagined engineer\'s letter from a Russian factory town in 1993, and answer the questions that follow. *(Written by SOYL for practice; the people and town are not real.)*',
  passage: '**Letter from Pavel, an imagined engineer in the factory town of Krasnoles, to his sister, 1993**\n\nOur tractor works has been "privatised". Each of us got a paper voucher, but most workers sold theirs for a few bottles of vodka, and now a man from Moscow owns the plant. Half the shops are closed. My wages are three months late, and when they come they buy almost nothing: the savings Mother kept for twenty years would not pay for a winter coat. The collective farm outside town has split into small plots, and this autumn there was little grain. People say we have elections and newspapers now, and that is true, but it is hard to eat a newspaper.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'understanding', marks: 1, stem: 'Which model of transition does the letter describe?', model: '**Shock therapy** (rapid change to a capitalist market economy).', sol: 'Sudden privatisation and price changes after 1991 point to shock therapy.', scheme: [['Shock therapy', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify one line that shows the effect of inflation.', model: '"The savings Mother kept for twenty years would **not pay for a winter coat**" (or: wages "buy almost nothing").', sol: 'Quote a line showing money losing its value.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): What does Pavel mean by "it is hard to eat a newspaper"?', model: 'He accepts that **political freedoms** (elections, a free press) have come, but says they mean little when people face **unpaid wages, lost savings and food shortages**; economic hardship overshadowed the political gains.', sol: 'Contrast political gains with economic hardship.', scheme: [['Political freedoms acknowledged', 1], ['Outweighed by economic hardship', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How does the story of the vouchers show that privatisation increased inequality?', model: 'Workers sold their **vouchers** cheaply out of need, so ownership passed to **one well-connected buyer**. A few gained valuable assets at low prices while the many were left with nothing, widening the **gap between rich and poor**.', sol: 'Link cheap sale of vouchers to concentration of wealth.', scheme: [['Vouchers sold cheaply by workers', 1], ['Wealth concentrated in a few hands', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 New entities; India and Russia
Q('m_chechnya', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'In which two regions of Russia did violent secessionist movements arise in the 1990s?',
  opts: ['Chechnya and Dagestan', 'Estonia and Latvia', 'Slovenia and Croatia', 'Kazakhstan and Kyrgyzstan'],
  sol: 'Chechnya and Dagestan, both within Russia, saw armed secessionist movements. The other pairs are independent states outside Russia.',
}));
Q('m_yugoslavia', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which country in the Balkans broke apart into several independent states after 1991, amid ethnic conflict?',
  opts: ['Yugoslavia', 'Hungary', 'Poland', 'Romania'],
  sol: 'Yugoslavia split into several states, including Slovenia, Croatia and Bosnia and Herzegovina, with serious conflict in Bosnia. The other countries did not break up.',
}));
Q('m_central_asia', mcq({
  t: 4, d: 2, c: 'analysis',
  stem: 'Why have the Central Asian republics attracted the interest of several outside powers since 1991?',
  opts: ['They have large oil and natural gas reserves and lie on important transit routes', 'They have the world\'s largest navies', 'They are members of the European Union', 'They produce most of the world\'s rice'],
  sol: 'Central Asia\'s hydrocarbon resources and location have made it a field of competition and cooperation for outside powers. The other statements are false.',
}));
Q('m_tension_example', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A student lists conflicts in post-Soviet states. Which entry is correct?',
  opts: ['Tajikistan went through a civil war in the 1990s', 'Lithuania fought a civil war with Estonia in 1995', 'Kazakhstan split into three states in 1993', 'Belarus joined NATO in 1992'],
  sol: 'Tajikistan experienced a civil war in the 1990s. The other three entries describe events that did not happen.',
}));
Q('m_india_russia_vision', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which shared idea has been a basis of India–Russia relations since the end of the Cold War?',
  opts: ['A multipolar world in which power is shared among several centres', 'A unipolar world led by one superpower', 'Abolishing the United Nations', 'Ending all trade with other countries'],
  sol: 'Both countries favour a multipolar world order, collective security and a stronger role for the UN. The other options are contrary to their stated positions.',
}));
Q('m_india_russia_area', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An Indian ministry report lists defence equipment, nuclear energy and space cooperation as long-standing fields of partnership with one country. Which country is it most likely describing?',
  opts: ['Russia', 'Nepal', 'Sri Lanka', 'Bhutan'],
  sol: 'Russia has long been a major supplier of India\'s defence equipment and a partner in nuclear energy and space. The other neighbours are not partners of that kind in these fields.',
}));
Q('m_treaty_1971', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'In which year did India and the Soviet Union sign the Treaty of Peace, Friendship and Cooperation?',
  opts: ['1971', '1962', '1991', '2000'],
  sol: 'The treaty was signed in 1971. In 2000 India and Russia signed a declaration on strategic partnership; 1962 and 1991 are unrelated to the treaty.',
}));
Q('m_balkan_neutral', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Which statement about the break-up of Yugoslavia is most accurate?',
  opts: ['Ethnic and national divisions led to the creation of several states, and the conflict in Bosnia and Herzegovina drew international intervention', 'It was a peaceful split of two equal halves agreed in one day', 'It ended with Yugoslavia joining the Soviet Union', 'It had no ethnic dimension at all'],
  sol: 'Yugoslavia broke into several states along ethnic and national lines; the war in Bosnia (1992–95) led to international, including NATO, involvement. The other statements are inaccurate.',
}));
Q('ar_india_russia', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'Russia has been an important partner for India in defence and energy.',
  r: 'India has long relied on Russian military equipment and has cooperated with Russia on nuclear power and oil and gas.',
  sol: 'Both are true and R explains A: the long record of defence supplies and energy cooperation is why Russia is called an important partner.',
}));
Q('tf_baltic_eu', tf({
  t: 4, d: 2, c: 'recall', ans: true,
  stem: 'True or false? Estonia, Latvia and Lithuania, once Soviet republics, became members of the European Union in 2004.',
  sol: 'The three Baltic states joined both NATO and the European Union in 2004.',
}));
Q('mt_regions', match({
  t: 4, d: 2, c: 'application',
  stem: 'Match each post-communist region with a development associated with it in the 1990s.',
  pairs: [
    ['Chechnya', 'Violent secessionist movement within Russia'],
    ['Bosnia and Herzegovina', 'Ethnic conflict after the break-up of Yugoslavia'],
    ['Tajikistan', 'Civil war in a Central Asian republic'],
    ['Baltic states', 'Early demand for independence, later EU membership'],
  ],
  sol: 'Each region is matched with the development most associated with it in the decade after the Soviet break-up.',
}));
Q('ord_india_russia', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these milestones of India–Soviet/Russian relations in chronological order.',
  items: [
    'Treaty of Peace, Friendship and Cooperation with the Soviet Union',
    'The Soviet Union is dissolved and Russia becomes its successor',
    'India and Russia sign a declaration on strategic partnership',
    'India becomes a full member of the Shanghai Cooperation Organisation',
  ],
  sol: '1971 treaty; December 1991 dissolution; 2000 strategic partnership declaration; 2017 full membership of the SCO.',
}));
Q('s_tensions', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two examples of tensions or conflicts in the former Soviet and East European states after 1991.',
  model: '1. **Chechnya and Dagestan** saw violent secessionist movements inside **Russia**.\n2. **Yugoslavia** broke apart into several states, with serious ethnic conflict in **Bosnia and Herzegovina** (other answers: Tajikistan\'s civil war, Georgia\'s breakaway regions).',
  sol: 'Any two correctly named conflicts.',
  scheme: [['First example', 1], ['Second example', 1]],
}));
Q('s_central_asia', short({
  t: 4, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why has Central Asia become a zone of competition among outside powers?',
  model: 'The region has rich **oil and natural gas** reserves and sits on important **transit routes**. Outside powers seek access to these resources and influence in the region, so both cooperation and **competition** have grown.',
  sol: 'Resources plus location, linked to outside interest.',
  scheme: [['Resources or location', 1], ['Link to outside interest', 1]],
}));
Q('s3_india_russia', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three features of India\'s relations with Russia after the end of the Cold War.',
  model: '1. **Shared world view:** both support a **multipolar** world order, collective security and a strong United Nations.\n2. **Defence:** Russia has been a long-standing supplier of military equipment to India.\n3. **Energy and technology:** cooperation in **nuclear energy**, oil and gas, space and science, under a **strategic partnership** declared in 2000.',
  sol: 'Three distinct features, each explained.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));
Q('l_india_russia', long({
  t: 4, d: 3, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Why is Russia regarded as an important partner of India? Explain with five points.',
  model: '1. **History of trust:** close ties go back to the Soviet era, including the **1971 treaty**.\n2. **Common vision:** both favour a **multipolar** world, collective security and reform of global institutions.\n3. **Defence:** Russia has supplied a large share of India\'s military equipment and cooperates in joint production.\n4. **Energy:** cooperation in **nuclear power** and in oil and gas helps India\'s energy needs.\n5. **Forums and science:** both work together in groupings such as **BRICS** and the **SCO**, and in space and science; a **strategic partnership** was declared in 2000.',
  sol: 'Five distinct, supported points.',
  scheme: [['History of ties', 1], ['Common vision', 1], ['Defence', 1], ['Energy', 1], ['Forums or science', 1]],
}));
Q('l_new_states', long({
  t: [4, 2], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'The end of the Soviet Union created new states but also new tensions. Analyse this statement with reference to Russia, the Balkans and Central Asia.',
  model: '1. **New states:** fifteen independent countries emerged from the Union, and several East European states left the Soviet bloc.\n2. **Russia:** faced violent **secessionist** movements in **Chechnya and Dagestan**.\n3. **The Balkans:** **Yugoslavia** broke into several states; ethnic conflict, especially in **Bosnia and Herzegovina**, led to international intervention.\n4. **Central Asia:** **Tajikistan** had a civil war; the region\'s **oil and gas** drew competing outside interest.\n5. **Conclusion:** independence brought sovereignty, but unresolved **ethnic and territorial** questions produced conflict in several places.',
  sol: 'New states plus one supported example of tension from each region, and a conclusion.',
  scheme: [['Emergence of new states', 1], ['Russia', 1], ['Balkans', 1], ['Central Asia', 1], ['Conclusion', 1]],
}));
Q('src_seminar', source({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the source, imagined notes taken by a student at a college seminar on India and Russia, and answer the questions that follow. *(Written by SOYL for practice; the speaker and college are not real.)*',
  passage: '**Notes from a seminar, imagined Delhi college, 2019**\n\nThe speaker, a retired diplomat, began with the 1971 treaty and said trust built over decades does not vanish easily. Both countries, she said, dislike a world run by one power and prefer one with several centres. She listed the areas of work: aircraft and ships for our armed forces, reactors for power, astronauts\' training, and oil. A student asked whether India now buys arms from other countries too. "Yes," she replied, "India diversifies its partners, but the old partnership remains strong." She ended by naming two groups where both sit together with other emerging economies.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'understanding', marks: 1, stem: 'Which idea of world order does the speaker say both countries share?', model: 'A **multipolar** world with **several centres of power**, not a world run by one power.', sol: 'Identify the multipolar vision from the source.', scheme: [['Multipolar world', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name any one of the "two groups" where both countries sit with other emerging economies.', model: '**BRICS** or the **Shanghai Cooperation Organisation (SCO)**.', sol: 'Either grouping is accepted.', scheme: [['BRICS or SCO', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two areas of cooperation from the source and say why each matters to India.', model: '(1) **Defence** (aircraft and ships) strengthens India\'s **security**. (2) **Nuclear reactors and oil** help meet India\'s growing **energy** needs. (Space, through astronaut training, is also accepted.)', sol: 'Two areas from the source, each with its importance for India.', scheme: [['First area with importance', 1], ['Second area with importance', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): What does the speaker\'s answer to the student suggest about India\'s foreign policy?', model: 'India follows a policy of **diversifying** partners to protect its own interests and keep its **strategic autonomy**, while still keeping long-standing **partnerships** such as that with Russia.', sol: 'Link diversification to independence of foreign policy.', scheme: [['Diversification of partners', 1], ['Strategic autonomy with old ties kept', 1]] }),
    ]),
  ],
}));
Q('src_journal', source({
  t: [4, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source, an imagined traveller\'s journal from Central Asia, and answer the questions that follow. *(Written by SOYL for practice; the traveller is not real.)*',
  passage: '**From the journal of an imagined traveller crossing Central Asia, 2003**\n\nAt the border post the old Soviet uniforms have new badges. In the capital, a new flag flies over a building that once housed a branch of the Communist Party. My guide says the country still sells most of its gas through the old pipelines to the north, but engineers from several faraway countries are surveying new routes east and south. In the bazaar, prices are high and an old teacher tells me her pension shrank to almost nothing after independence. Yet the young men I meet talk of oil jobs and study abroad.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'understanding', marks: 1, stem: 'What change in the country\'s status does the "new flag" show?', model: 'The republic has become an **independent sovereign state** after the end of the Soviet Union.', sol: 'The new flag shows independence after 1991.', scheme: [['Independence', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which line shows outside powers\' interest in the region\'s resources?', model: '"Engineers from **several faraway countries** are surveying **new routes** east and south" for gas.', sol: 'Quote the line about new pipeline routes.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: [3, 4], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the old teacher\'s story reflect the effects of the transition to a market economy?', model: 'Her **pension lost its value** because of high **inflation**, and the old welfare protection weakened, showing that the transition caused **hardship for the elderly** and those on fixed incomes.', sol: 'Link the shrunken pension to inflation and the end of welfare guarantees.', scheme: [['Inflation or loss of welfare', 1], ['Hardship for people on fixed incomes', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Based on the journal, give one opportunity and one challenge the new state faces.', model: '**Opportunity:** gas and **oil** resources can bring income, jobs and new partners. **Challenge:** **rising prices** and weak pensions cause hardship, and dependence on old routes limits its choices.', sol: 'One opportunity and one challenge, both drawn from the source.', scheme: [['Opportunity', 1], ['Challenge', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- extra objective items (deck checks and practice)
Q('m_union_republics', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'How many republics made up the Soviet Union at the time of its dissolution?',
  opts: ['Fifteen', 'Seven', 'Twelve', 'Twenty-eight'],
  sol: 'The Soviet Union was made up of fifteen union republics, all of which became independent states in 1991.',
}));
Q('m_bipolar_meaning', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'The word **bipolarity** in the chapter title refers to',
  opts: ['a world dominated by two rival superpowers and their blocs', 'a country with two capitals', 'an alliance between India and the Soviet Union', 'a world without any great powers'],
  sol: 'Bipolarity describes the Cold War world led by two superpowers, the United States and the Soviet Union, each with its bloc. Its end came with the Soviet break-up.',
}));
Q('m_check_shock', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which of these would NOT be part of a shock-therapy programme?',
  opts: ['Fixing all prices centrally through a five-year plan', 'Selling state-owned firms to private buyers', 'Making the currency convertible', 'Opening the economy to foreign investment'],
  sol: 'Central price-fixing belongs to the old planned system. Privatisation, currency convertibility and openness to foreign investment were core shock-therapy measures.',
}));
Q('tf_russia_seat', tf({
  t: 2, d: 2, c: 'application', ans: true,
  stem: 'True or false? Russia, not Ukraine, inherited the Soviet Union\'s permanent seat in the UN Security Council.',
  sol: 'Russia was accepted as the successor state, so it took the permanent seat; Ukraine became a separate member state.',
}));
Q('fb_successor', fb({
  t: 4, d: 2, c: 'understanding',
  stem: 'India and Russia signed a declaration on ___ partnership in the year 2000.',
  acc: [['strategic']],
  sol: 'The declaration on strategic partnership (2000) set up regular summits and wider cooperation.',
}));
