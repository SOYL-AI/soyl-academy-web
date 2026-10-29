// CBSE 12 Political Science, ch03 Contemporary South Asia — question bank. Every source, diary, report
// and scenario is written by SOYL and labelled as imagined; no NCERT text, boxed source, cartoon or
// board/sample-paper item is reused (D-036). Real-world facts are limited to stable, widely documented
// dates and events up to 2015 (no claims about the current status of disputes or treaties).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAGINED = '*(Imagined source written by SOYL for practice; the people in it are not real.)*';

// ================================================================ t01 Pakistan and Bangladesh
Q('m_ayub', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Pakistan\'s first military takeover, in 1958, brought which leader to power?',
  opts: ['General Ayub Khan', 'General Zia-ul-Haq', 'General Pervez Musharraf', 'Zulfikar Ali Bhutto'],
  sol: 'General Ayub Khan took over in 1958. General Zia-ul-Haq took power in 1977 and General Musharraf in 1999; Zulfikar Ali Bhutto was an elected civilian leader of the 1970s.',
}));
Q('m_pak_reasons', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is commonly given as a reason why democracy did not become stable in Pakistan?',
  opts: [
    'The strong social and political position of the army, along with religious leaders and big landowners',
    'Pakistan never held a single general election after 1947',
    'Its constitution permanently banned all political parties',
    'SAARC did not allow its members to hold elections',
  ],
  sol: 'The dominance of the military, supported at times by the clergy and the landowning elite, is the reason usually given. Pakistan has held many general elections, no constitution banned all parties for ever, and SAARC has no say over members\' elections.',
}));
Q('m_east_grievance', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Before 1971, a major complaint of the people of East Pakistan was',
  opts: [
    'the imposition of Urdu and their small share of power despite their large population',
    'that they were not allowed to grow rice',
    'that Pakistan had become a monarchy',
    'that they had to pay taxes to SAARC',
  ],
  sol: 'East Pakistanis resented the attempt to impose Urdu over Bengali and the domination of the West Pakistani leadership in the army and government. The other options are invented.',
}));
Q('m_awami_1970', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'In the 1970 elections of united Pakistan, which party, led by Sheikh Mujibur Rahman, won almost every seat in East Pakistan and a majority in the national assembly?',
  opts: ['The Awami League', 'The Pakistan People\'s Party', 'The Bangladesh Nationalist Party', 'The Muslim League'],
  sol: 'The Awami League swept East Pakistan in 1970 and so had a majority overall, but power was not handed over. The Pakistan People\'s Party won most seats in the west; the BNP was formed only after independence.',
}));
Q('m_bd_1975', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'In 1975, Bangladesh\'s constitution was amended. What did the change do?',
  opts: [
    'It replaced the parliamentary system with a presidential one and allowed only one party',
    'It made Bangladesh a monarchy under a king',
    'It reunited Bangladesh with Pakistan',
    'It made Urdu the only national language',
  ],
  sol: 'The 1975 amendment moved Bangladesh to a presidential form of government and to rule by a single party led by Sheikh Mujibur Rahman. Bangladesh has never been a monarchy, never rejoined Pakistan, and Bengali is its national language.',
}));
Q('m_bd_1991', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Farida, a student in Dhaka, tells her class that her country has had elected governments chosen in multi-party elections since 1991. Which development of 1990–91 is she referring to?',
  opts: [
    'A mass movement made the military ruler General Ershad step down, and elections followed in 1991',
    'Bangladesh joined SAARC and SAARC ordered elections',
    'Bangladesh signed the Simla Agreement with India',
    'The United Nations took over the government of Bangladesh',
  ],
  sol: 'Popular protests in 1990 led General H. M. Ershad to step down, and elections in 1991 restored representative government. SAARC was founded in 1985 and does not order elections; the Simla Agreement (1972) was between India and Pakistan; the UN never ran Bangladesh.',
}));
Q('m_pak_bd_compare', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Which statement correctly compares the political histories of Pakistan and Bangladesh up to the early 2000s?',
  opts: [
    'Both had periods of military rule as well as periods of elected civilian government',
    'Neither country ever held a general election',
    'Both were ruled by hereditary kings until 2008',
    'Bangladesh was always under military rule, while Pakistan never was',
  ],
  sol: 'Both countries alternated between military rulers and elected governments. Both have held many elections, neither had a monarchy, and Pakistan saw several long spells of military rule.',
}));
Q('m_zia_1977', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A timeline on a classroom wall reads: "1977 — elected government removed; army chief takes charge; civilian rule returns in 1988." Which army chief does the 1977 entry describe?',
  opts: ['General Zia-ul-Haq', 'General Ayub Khan', 'General Yahya Khan', 'General H. M. Ershad'],
  sol: 'General Zia-ul-Haq removed Zulfikar Ali Bhutto\'s government in 1977 and ruled until 1988. Ayub Khan took over in 1958 and Yahya Khan succeeded him in 1969; Ershad was a military ruler of Bangladesh, not Pakistan.',
}));
Q('ar_crackdown', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'In 1971 there was a mass popular struggle in East Pakistan, followed by a military crackdown.',
  r: 'Although the Awami League had won the 1970 elections, the leadership based in West Pakistan did not hand over power to it.',
  sol: 'Both are true, and R explains A: the refusal to transfer power after a clear electoral victory set off the mass movement, which the army then tried to suppress.',
}));
Q('ar_mujib', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Sheikh Mujibur Rahman became the first leader of independent Bangladesh.',
  r: 'Bangladesh\'s 1972 constitution declared faith in secularism, democracy and socialism.',
  sol: 'Both statements are true, but R does not explain A. Mujib led Bangladesh because he headed the freedom movement and the Awami League, not because of what the 1972 constitution declared.',
}));
Q('tf_pak_continuous', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Pakistan has been under military rule without a break since 1947.',
  sol: 'Pakistan has alternated: civilian governments ruled, for example, in 1947–58, 1971–77 and 1988–99, between spells of military rule.',
}));
Q('s_pak_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why it has been difficult for democracy to take firm roots in Pakistan.',
  model: '1. The **army** has had great social and political weight, and has taken over directly several times, backed at times by **religious leaders and big landowners**.\n2. Conflict with India and other **security worries** strengthened the military, and during the Cold War outside powers often **dealt readily with military rulers**.',
  sol: 'Any two: dominance of the military; support of clergy and landed elite; security concerns that strengthened the army; outside support for military regimes.',
  scheme: [['First reason explained', 1], ['Second reason explained', 1]],
}));
Q('s_east_resent', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why did people in East Pakistan resent the domination of West Pakistan before 1971? Give two reasons.',
  model: '1. They objected to **Urdu** being pushed on a population whose language was **Bengali**.\n2. Although East Pakistan had **more people**, the **army, civil services and government** were dominated by West Pakistanis, so their political and economic interests were ignored.',
  sol: 'Language imposition and unfair sharing of power (and resources) are the two expected points.',
  scheme: [['Language grievance', 1], ['Unfair share of power or resources', 1]],
}));
Q('s3_bd_stages', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Trace three stages in the political journey of Bangladesh between 1971 and 1991.',
  model: '1. **1971–75:** after independence, a **1972 constitution** set up parliamentary democracy committed to secularism, democracy and socialism; in **1975** it was changed to a **presidential, one-party** system, and Sheikh Mujib was killed in a coup that August.\n2. **1975–90:** **military-led rule**, first under **Ziaur Rahman** (who founded the BNP) and then **General Ershad**, with limited elections.\n3. **1990–91:** a **mass movement** forced Ershad out, and **elections in 1991** restored representative, multi-party democracy.',
  sol: 'Three stages in order: early democracy and the 1975 change; military-led rule; the 1990 movement and the return to elections.',
  scheme: [['Stage 1 (1971–75)', 1], ['Stage 2 (military-led rule)', 1], ['Stage 3 (1990–91 return to democracy)', 1]],
}));
Q('l_pak_bd', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Compare the experience of democracy in Pakistan and Bangladesh up to the early 2000s. Which features are common, and where do they differ?',
  model: '1. **Common origin:** both were one country from 1947 to 1971, and both inherited a powerful **army** and bureaucracy.\n2. **Pakistan:** repeated **military takeovers** (1958, 1977, 1999) alternated with elected governments; the army, clergy and landed elite kept great influence.\n3. **Bangladesh:** after independence in **1971** it began as a parliamentary democracy, moved to one-party rule in **1975** and then to **military-led rule** until **1990**.\n4. **Recovery:** in both, **popular demand for democracy** survived; Bangladesh has held regular multi-party elections since **1991**, Pakistan returned to civilian rule in **1988** and again in **2008**.\n5. **Judgement:** democracy in both has been **fragile but persistent**; the main difference is that Bangladesh\'s military phase ended earlier, while Pakistan saw a further takeover in 1999.',
  sol: 'Points on the shared background, each country\'s path, the persistence of democratic demand, and a balanced comparison.',
  scheme: [['Shared background', 1], ['Pakistan\'s pattern', 1], ['Bangladesh\'s pattern', 1], ['Persistence of democracy in both', 1], ['Comparative judgement', 1]],
}));
Q('sb_dhaka', source({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source below, a page from an imagined diary kept in Dhaka in 1971, and answer the questions that follow. ${IMAGINED}`,
  passage: '**Diary of Rokeya, a college student in Dhaka (imagined), December 1971**\n\nLast year we queued for hours to vote, and our party won almost every seat in the East. We were sure that, at last, our voices would be heard in the national government. Instead, the talks dragged on and then the army came into the streets. My cousin, who studies Bengali literature, says the struggle began long ago, when the rulers tried to make another language the only national language. Now, after months of fighting, the radio says the war is ending and a new country will be born. Abba says the hard part will be building a democracy that lasts.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the party Rokeya says won "almost every seat in the East".', model: 'The **Awami League** (led by Sheikh Mujibur Rahman).', sol: 'The 1970 sweep in East Pakistan was by the Awami League.', scheme: [['Awami League', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which long-standing grievance does Rokeya\'s cousin refer to?', model: 'The attempt to impose **Urdu** as the national language over **Bengali**.', sol: 'The language question was a root of East Pakistani discontent.', scheme: [['Imposition of Urdu over Bengali', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why did the 1970 election result lead to conflict instead of a change of government?', model: 'The Awami League had won a **majority**, but the leadership in **West Pakistan** would not **hand over power**; talks failed and the **army cracked down**, turning a political demand into a **liberation struggle**.', sol: 'Link the refusal to transfer power to the crackdown and the struggle.', scheme: [['Refusal to transfer power', 1], ['Crackdown leading to the liberation struggle', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Abba fears that building a lasting democracy will be hard. How far did the next twenty years of Bangladesh\'s history prove him right?', model: 'Largely right: in **1975** the system became **presidential and one-party**, and **military-led rule** followed until **1990**. Yet a **mass movement** restored elections in **1991**, so democracy recovered.', sol: 'Show the setbacks (1975, military rule) and the recovery (1990–91).', scheme: [['Setbacks 1975–90', 1], ['Recovery in 1990–91', 1]] }),
    ]),
  ],
}));

// ================================================================ t02 Nepal and Sri Lanka
Q('m_nepal_2008', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In which year did Nepal\'s elected Constituent Assembly abolish the monarchy and declare the country a republic?',
  opts: ['2008', '2006', '1990', '2015'],
  sol: 'The monarchy was abolished in 2008. The 2006 movement restored parliament, 1990 brought a constitutional monarchy, and 2015 is the year of the new constitution.',
}));
Q('m_nepal_2006', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why is the people\'s movement of April 2006 important in Nepal\'s history?',
  opts: [
    'It forced the king to restore the dissolved parliament and opened the way to a democratic republic',
    'It made Nepal a member of SAARC for the first time',
    'It ended the civil war between Sinhalas and Tamils',
    'It gave the king complete power over the government',
  ],
  sol: 'The April 2006 movement made King Gyanendra restore parliament; the Maoists then joined the peace process, leading to the republic. Nepal was a SAARC founder in 1985, the Sinhala–Tamil war was in Sri Lanka, and the movement reduced, not increased, royal power.',
}));
Q('m_nepal_forces', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The struggle over Nepal\'s political system between 1996 and 2006 was mainly among which three forces?',
  opts: [
    'The king, the mainstream political parties and the Maoists',
    'The army of India, SAARC and the king',
    'The LTTE, the king and the United Nations',
    'Bhutan, Bangladesh and the political parties',
  ],
  sol: 'The monarchy, the parliamentary parties and the Maoist insurgents (from 1996) were the three main forces. India, SAARC, the UN, the LTTE and other countries were not parties to this domestic struggle.',
}));
Q('m_nepal_2015', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Nepal adopted its present constitution, which describes it as a federal democratic republic, in',
  opts: ['2015', '2008', '1990', '1951'],
  sol: 'The constitution was adopted in September 2015. In 2008 the republic was declared, 1990 saw a constitutional monarchy, and 1951 marks the end of Rana rule.',
}));
Q('m_sl_language', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which policy of the 1950s deepened the grievances of Tamils in Sri Lanka?',
  opts: [
    'Making Sinhala the only official language',
    'Joining SAARC',
    'Signing the Indus Waters Treaty',
    'Abolishing the monarchy',
  ],
  sol: 'The 1956 law making Sinhala the sole official language was felt by Tamils as discrimination. SAARC came in 1985; the Indus treaty concerns India and Pakistan; Sri Lanka had no monarchy to abolish.',
}));
Q('m_ltte', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The main demand of the Liberation Tigers of Tamil Eelam (LTTE) was',
  opts: [
    'a separate Tamil country in the north and east of Sri Lanka',
    'a merger of Sri Lanka with India',
    'the return of the monarchy in Sri Lanka',
    'membership of the European Union',
  ],
  sol: 'The LTTE fought for "Tamil Eelam", a separate Tamil state. It did not seek a merger with India, Sri Lanka has had no monarchy since independence, and EU membership is irrelevant.',
}));
Q('m_ipkf', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In 1987 the Indian Peace Keeping Force (IPKF) went to Sri Lanka. What was the basis of its deployment?',
  opts: [
    'An accord signed between the governments of India and Sri Lanka',
    'A resolution passed at a SAARC summit',
    'A decision of the UN Security Council',
    'A request made by the LTTE',
  ],
  sol: 'The IPKF was sent under the India–Sri Lanka Accord of 1987 between the two governments. SAARC excludes bilateral and contentious issues, the UN did not send it, and the LTTE later fought the IPKF.',
}));
Q('m_sl_features', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'In spite of a long internal conflict, Sri Lanka is often noted for which combination of features?',
  opts: [
    'Keeping a democratic political system and reaching relatively good levels of literacy and life expectancy',
    'Long periods of military rule and a ban on elections',
    'Rule by a king who was removed in 2008',
    'Very low literacy and no elected parliament',
  ],
  sol: 'Sri Lanka has kept elected governments since 1948 and is known for comparatively high human development indicators in the region. Military rule, a monarchy abolished in 2008 (Nepal) and an absent parliament do not describe Sri Lanka.',
}));
Q('m_sl_2009', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Sri Lanka\'s long civil war ended in 2009 with',
  opts: [
    'the military defeat of the LTTE',
    'the creation of a separate Tamil state',
    'the arrival of the IPKF',
    'a SAARC peace treaty',
  ],
  sol: 'Government forces defeated the LTTE militarily in May 2009. No separate state was created, the IPKF had left in 1990, and SAARC played no such role.',
}));
Q('ar_nepal_1990', ar({
  t: 2, d: 2, c: 'analysis', key: 'd',
  a: 'Nepal abolished its monarchy and became a republic in 1990.',
  r: 'A pro-democracy movement in 1990 made the king accept a new democratic constitution.',
  sol: 'A is false: the 1990 movement produced a constitutional monarchy, with the king still head of state; the monarchy was abolished only in 2008. R is true.',
}));
Q('ar_ipkf', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'The IPKF was withdrawn from Sri Lanka in 1990.',
  r: 'The IPKF had been sent by SAARC to enforce a ceasefire.',
  sol: 'A is true: the IPKF left in 1990. R is false: it was sent under the bilateral India–Sri Lanka Accord of 1987, not by SAARC.',
}));
Q('tf_nepal_rep', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Nepal became a republic in 2008, when its elected Constituent Assembly abolished the monarchy.',
  sol: 'The Constituent Assembly elected in 2008 ended the monarchy in May 2008.',
}));
Q('fb_eelam', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The LTTE fought for "Eelam", a separate homeland for the ___ people of Sri Lanka.',
  acc: [['Tamil', 'Tamils']],
  sol: 'Eelam was to be a separate Tamil state in the north and east.',
}));
Q('ord_nepal', ord({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Arrange these events in Nepal\'s political history in the correct order, earliest first.',
  items: [
    'A popular movement leads to a constitutional monarchy',
    'The Maoist armed insurgency begins',
    'The king dismisses the government and takes direct power',
    'A mass movement forces the king to restore parliament',
    'An elected Constituent Assembly declares Nepal a republic',
  ],
  sol: 'Constitutional monarchy (1990) → Maoist insurgency (1996) → king takes direct power (2005) → April movement restores parliament (2006) → republic declared (2008).',
}));
Q('s_maoists', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who were the Maoists of Nepal, and what part did they play in its move to democracy?',
  model: 'They were **communist insurgents** who from **1996** waged an **armed struggle** against the monarchy and the elite. After the **2006** movement they **gave up armed struggle**, joined the **peace process** and contested the **Constituent Assembly** elections that ended the monarchy.',
  sol: 'Identify the Maoists and describe their shift from insurgency to the peace process and elections.',
  scheme: [['Who they were', 1], ['Their role in the transition', 1]],
}));
Q('s_sl_causes', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two causes of the ethnic conflict in Sri Lanka.',
  model: '1. Tamils felt **discriminated against** by policies favouring the **Sinhala majority**, such as making **Sinhala the only official language** (1956).\n2. **Unequal chances** in education and jobs, and the rejection of demands for **autonomy**, led some groups to seek a **separate Tamil state**.',
  sol: 'Any two: majority-favouring policies (language), discrimination in jobs and education, rejection of autonomy demands, rise of militancy.',
  scheme: [['First cause', 1], ['Second cause', 1]],
}));
Q('s3_nepal_steps', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Describe three steps by which Nepal moved from a monarchy to a democratic republic.',
  model: '1. In **1990** a popular movement won a **constitutional monarchy** with an elected parliament, though the king kept real power.\n2. After a **Maoist insurgency** and the king\'s **takeover in 2005**, the **April 2006** movement of parties and people forced him to **restore parliament**; the Maoists joined a **peace agreement**.\n3. An elected **Constituent Assembly** abolished the monarchy in **2008**, and a **federal republican constitution** was adopted in **2015**.',
  sol: 'Three stages in order: 1990; 2005–06; 2008–15.',
  scheme: [['1990 constitutional monarchy', 1], ['2005–06 crisis and movement', 1], ['2008 republic and 2015 constitution', 1]],
}));
Q('s3_sl_india', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain India\'s involvement in Sri Lanka\'s ethnic conflict in the late 1980s, and why it was difficult.',
  model: '1. India had an interest because of **Tamil sentiment in Tamil Nadu** and concern for **regional stability**.\n2. In **1987** it signed the **India–Sri Lanka Accord** and sent the **IPKF** to help restore peace.\n3. The IPKF was drawn into **fighting the LTTE**, was **unpopular with many Sri Lankans**, and was **withdrawn in 1990** without achieving its aim.',
  sol: 'Reason for interest, the accord and IPKF, and the difficulties.',
  scheme: [['Why India was involved', 1], ['Accord and IPKF', 1], ['Difficulties and withdrawal', 1]],
}));
Q('l_nepal', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain how Nepal changed from a kingdom into a democratic republic. What role did popular movements play?',
  model: '1. **Kingdom:** Nepal was long a **monarchy**; parties and people pressed for an elected government.\n2. **1990:** a **pro-democracy movement** produced a **constitutional monarchy**, but elected governments were unstable and the king kept much influence.\n3. **Conflict:** from **1996** a **Maoist insurgency** spread; in **2005** the king dismissed the government and ruled directly.\n4. **2006:** a **mass movement**, led by the parties and supported by the Maoists, forced the king to **restore parliament**; a **peace agreement** brought the Maoists into politics.\n5. **Republic:** the elected **Constituent Assembly** ended the monarchy in **2008** and a new constitution followed in **2015**. **Popular movements** were decisive at each turning point.',
  sol: 'Trace the stages and stress the role of mass movements at each.',
  scheme: [['Monarchy background', 1], ['1990 change', 1], ['Insurgency and royal takeover', 1], ['2006 movement and peace process', 1], ['Republic and role of movements', 1]],
}));
Q('l_sl', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Examine the causes and course of the ethnic conflict in Sri Lanka. Why is Sri Lanka\'s democratic record still noted despite the conflict?',
  model: '1. **Causes:** after **1948** the **Sinhala majority** dominated politics; the **1956** language law and unequal chances in jobs and education alienated **Tamils**.\n2. **Militancy:** demands for autonomy turned into calls for a **separate state**; the **LTTE** led an **armed struggle** from the early **1980s**.\n3. **Outside role:** India\'s **1987 Accord** and the **IPKF** failed to end the war; the IPKF left in **1990**.\n4. **End:** the war ended in **2009** with the LTTE\'s **military defeat**, at a heavy human cost.\n5. **Democracy:** Sri Lanka still kept **regular elections** and **elected governments**, and reached **relatively high literacy and life expectancy**, so its record is noted despite the conflict.',
  sol: 'Causes, course, the Indian role, the end in 2009 and a balanced note on democracy and development.',
  scheme: [['Causes', 1], ['Rise of militancy', 1], ['Indian role', 1], ['End of the war', 1], ['Democratic and development record', 1]],
}));
Q('sb_kathmandu', source({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source below, an imagined letter from a student in Kathmandu in 2008, and answer the questions that follow. ${IMAGINED}`,
  passage: '**Letter from Anju, a student in Kathmandu (imagined), to her cousin in Pokhara, June 2008**\n\nDear Bikash, you will not believe how the city felt last week. Two years ago we marched in the streets until the palace gave way and the old parliament met again. Then the fighters from the hills signed a peace deal and stood in the elections like everyone else. Now the people we elected have voted that there will be no more king. Grandmother is a little sad, because she grew up with the palace, but my friends say the country finally belongs to its citizens. Our teacher warns that writing a new constitution will take years.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'What did the elected body do in 2008, according to Anju?', model: 'It **abolished the monarchy** and made Nepal a **republic**.', sol: 'The Constituent Assembly voted to end the monarchy.', scheme: [['Monarchy abolished', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Who are "the fighters from the hills" who signed a peace deal?', model: 'The **Maoists**, who had led an armed insurgency since 1996.', sol: 'The insurgents who joined the 2006 peace process were the Maoists.', scheme: [['The Maoists', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which event of 2006 does Anju describe as marching "until the palace gave way"? Why was it important?', model: 'The **April 2006 people\'s movement**. It forced the king to **restore parliament**, ended his direct rule and opened the **peace process** that led to the republic.', sol: 'Name the 2006 movement and state its consequence.', scheme: [['April 2006 movement', 1], ['Its consequence', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Was the teacher right that writing a new constitution would take years? Support your answer.', model: 'Yes. The first **Constituent Assembly** could not complete the task, and the **constitution was adopted only in 2015**, seven years after the republic was declared.', sol: 'Use the 2015 date to judge the teacher\'s prediction.', scheme: [['Judgement', 1], ['Supported by the 2015 date', 1]] }),
    ]),
  ],
}));
Q('sb_jaffna', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source below, an extract from an imagined peace-studies newsletter, and answer the questions that follow. ${IMAGINED}`,
  passage: '**From the newsletter of an imagined peace-studies club in Chennai, 2010**\n\nOur club member Meena interviewed an elderly teacher who taught in the north of the island for forty years. He said his students first felt shut out when one language was given official preference in the 1950s. By the 1980s, some of his former students had joined an armed group demanding a separate homeland. He remembered soldiers from India arriving in 1987 under an agreement between the two governments, and leaving three years later. "Last year the guns finally fell silent," he said, "but healing will need justice and equal treatment for every community."',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Which language was "given official preference in the 1950s"?', model: '**Sinhala** (made the only official language in 1956).', sol: 'The 1956 law made Sinhala the sole official language.', scheme: [['Sinhala', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the agreement under which the Indian soldiers arrived in 1987.', model: 'The **India–Sri Lanka Accord** (1987), under which the **IPKF** was sent.', sol: 'The 1987 accord between the governments sent the IPKF.', scheme: [['India–Sri Lanka Accord', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The teacher says the guns "fell silent" last year. Which year is meant, and how did the war end?', model: 'The newsletter is from **2010**, so he means **2009**, when the war ended with the **military defeat of the LTTE** by government forces.', sol: 'Work out 2009 from the date and describe the end of the war.', scheme: [['2009', 1], ['Military defeat of the LTTE', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why does the teacher think that the end of fighting alone is not enough for lasting peace?', model: 'The conflict grew from a feeling of **discrimination**; unless every community gets **equal rights, fair treatment and justice**, the **grievances** that caused it could return.', sol: 'Connect the causes of the conflict with what lasting peace needs.', scheme: [['Root cause: discrimination', 1], ['Need for equality and justice', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 India–Pakistan conflicts; India and its neighbours
Q('m_simla', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The agreement signed by India and Pakistan in 1972, after the war of 1971, in which both agreed to settle their differences bilaterally, is the',
  opts: ['Simla Agreement', 'Tashkent Agreement', 'Lahore Declaration', 'Indus Waters Treaty'],
  sol: 'The Simla Agreement (1972) committed both to peaceful bilateral settlement. Tashkent (1966) followed the 1965 war, the Lahore Declaration dates from 1999, and the Indus Waters Treaty (1960) is about rivers.',
}));
Q('m_tashkent', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A quiz card says: "Signed in 1966 in a Central Asian city with the help of the Soviet Union, after a war fought the previous year." Which agreement is it describing?',
  opts: ['The Tashkent Agreement', 'The Simla Agreement', 'The India–Sri Lanka Accord', 'The SAFTA agreement'],
  sol: 'The Tashkent Agreement (1966), mediated by the Soviet Union, followed the 1965 war. Simla was 1972, the Sri Lanka accord 1987 and SAFTA 2004.',
}));
Q('m_indus', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The Indus Waters Treaty of 1960 between India and Pakistan was concluded with the mediation of',
  opts: ['the World Bank', 'the United Nations Security Council', 'SAARC', 'the Commonwealth'],
  sol: 'The World Bank mediated the 1960 treaty, which divided the rivers of the Indus system between the two countries. SAARC did not exist until 1985.',
}));
Q('m_kargil', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The armed conflict between India and Pakistan in the Kargil area took place in',
  opts: ['1999', '1965', '1971', '1948'],
  sol: 'The Kargil conflict was fought in 1999. The other years are earlier wars.',
}));
Q('m_1998', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'What did India and Pakistan both do in May 1998 that changed their security relationship?',
  opts: ['They carried out nuclear tests', 'They founded SAARC', 'They signed the Simla Agreement', 'They exchanged border enclaves'],
  sol: 'Both countries conducted nuclear tests in May 1998. SAARC dates from 1985, Simla from 1972, and the enclave exchange was between India and Bangladesh.',
}));
Q('m_farakka', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In 1996 India and Bangladesh signed a treaty that settled a long-standing disagreement for a period of thirty years. What did it deal with?',
  opts: ['Sharing of the waters of the Ganga at Farakka', 'The status of Kashmir', 'Membership of SAARC', 'Trade in nuclear fuel'],
  sol: 'The 1996 treaty dealt with sharing Ganga waters at the Farakka barrage. Kashmir is an India–Pakistan issue; SAARC membership and nuclear fuel are unrelated.',
}));
Q('m_lba', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'In 2015, families living in small pockets of one country\'s territory surrounded by the other\'s were finally allowed to choose their citizenship. Which step between India and Bangladesh made this possible?',
  opts: [
    'Putting into effect the Land Boundary Agreement and exchanging the enclaves',
    'Signing the Indus Waters Treaty',
    'Sending the Indian Peace Keeping Force',
    'Creating the South Asian Free Trade Area',
  ],
  sol: 'The Land Boundary Agreement, put into effect in 2015, exchanged the enclaves along the India–Bangladesh border and let residents choose citizenship. The other options concern other countries or issues.',
}));
Q('m_nepal_open', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Ramesh from Bihar works in a hotel in Pokhara, and his neighbour\'s son from Nepal studies in Varanasi; neither needed a visa. Which arrangement mainly makes this possible?',
  opts: [
    'The open border under the India–Nepal Treaty of Peace and Friendship of 1950',
    'The SAFTA agreement of 2004',
    'The Simla Agreement of 1972',
    'A SAARC rule that abolished all visas in the region',
  ],
  sol: 'The 1950 India–Nepal treaty underpins the open border and freedom to live and work in each other\'s country. SAFTA is about tariffs, Simla concerns India and Pakistan, and SAARC has not abolished visas.',
}));
Q('m_maldives', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In November 1988, at the request of the Maldives government, India quickly sent forces to the Maldives. What was the purpose?',
  opts: [
    'To help defeat an attempted coup against the government',
    'To fight the LTTE',
    'To take over the islands',
    'To build the SAARC secretariat',
  ],
  sol: 'India helped the Maldives government foil a coup attempt by mercenaries, and the troops then left. The LTTE was in Sri Lanka, and the SAARC secretariat is in Kathmandu.',
}));
Q('m_bhutan', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Cooperation between India and Bhutan has been especially strong in which field?',
  opts: ['Hydroelectric power projects', 'Joint nuclear tests', 'A shared currency union under SAARC', 'Space launches from Bhutan'],
  sol: 'India has partnered Bhutan in building hydroelectric projects, and buys much of the power. The other options are invented.',
}));
Q('m_bd_issues', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which pair lists issues that have been discussed between India and Bangladesh?',
  opts: [
    'Sharing of river waters and the movement of people across the border',
    'The Siachen glacier and the Line of Control',
    'The LTTE and the IPKF',
    'The Maoist insurgency and the monarchy',
  ],
  sol: 'River waters (such as the Ganga) and cross-border movement are India–Bangladesh issues. Siachen and the LoC concern India and Pakistan; the LTTE and IPKF concern Sri Lanka; the Maoists and monarchy concern Nepal.',
}));
Q('m_siachen', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'A dispute between India and Pakistan over control of a high-altitude glacier in the Karakoram range concerns the',
  opts: ['Siachen glacier', 'Gangotri glacier', 'Zemu glacier', 'Pindari glacier'],
  sol: 'The Siachen glacier is the disputed area. Gangotri, Zemu and Pindari glaciers lie well inside India and are not disputed.',
}));
Q('ar_kashmir', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Kashmir has been the central issue between India and Pakistan since 1947.',
  r: 'The two countries hold conflicting positions on the region, and this led to wars in 1947–48 and 1965.',
  sol: 'Both are true, and R explains A: conflicting claims over Kashmir have been the main cause of hostility and of the early wars.',
}));
Q('ar_simla', ar({
  t: 3, d: 2, c: 'analysis', key: 'c',
  a: 'Under the Simla Agreement, India and Pakistan agreed to settle their differences peacefully through bilateral talks.',
  r: 'The Simla Agreement was signed after the Kargil conflict of 1999.',
  sol: 'A is true. R is false: the Simla Agreement was signed in 1972, after the 1971 war; Kargil came much later, in 1999.',
}));
Q('ar_size', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Some of India\'s smaller neighbours have at times worried about India\'s influence in the region.',
  r: 'India is by far the largest country in South Asia in area, population and economy.',
  sol: 'Both are true, and R explains A: the great difference in size and power makes smaller states cautious about being dominated, even when relations are friendly.',
}));
Q('tf_indus_kargil', tf({
  t: 3, d: 2, c: 'application', ans: false,
  stem: 'True or false? The Indus Waters Treaty was signed after the Kargil conflict.',
  sol: 'The treaty was signed in 1960; the Kargil conflict was in 1999.',
}));
Q('mt_agreements', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each agreement between India and a neighbour with the year in which it was signed or put into effect.',
  pairs: [
    ['Tashkent Agreement (India–Pakistan)', '1966'],
    ['Simla Agreement (India–Pakistan)', '1972'],
    ['Ganga waters treaty (India–Bangladesh)', '1996'],
    ['Land Boundary Agreement put into effect (India–Bangladesh)', '2015'],
  ],
  sol: 'Tashkent followed the 1965 war; Simla the 1971 war; the Ganga treaty is from 1996; the enclave exchange came in 2015.',
}));
Q('ord_indopak', ord({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Arrange these events in India–Pakistan relations in the correct order, earliest first.',
  items: [
    'First war over Kashmir',
    'Indus Waters Treaty signed with World Bank mediation',
    'War followed by the Tashkent Agreement',
    'Simla Agreement signed',
    'Conflict in the Kargil sector',
  ],
  sol: '1947–48 war → Indus Waters Treaty (1960) → 1965 war and Tashkent (1966) → Simla (1972) → Kargil (1999).',
}));
Q('s_indopak_issues', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Apart from Kashmir, name and briefly explain two issues that have strained relations between India and Pakistan.',
  model: '1. **Siachen glacier:** both have kept troops on this high glacier, each claiming the area.\n2. **Arms race:** both built up their forces and, after the **1998 nuclear tests**, each became a nuclear-armed state, which raised fears of escalation. (Also: Sir Creek boundary, sharing of river waters.)',
  sol: 'Any two besides Kashmir: Siachen, the arms and nuclear race, Sir Creek, river waters.',
  scheme: [['First issue explained', 1], ['Second issue explained', 1]],
}));
Q('s_india_nepal', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Mention two features of the close relationship between India and Nepal.',
  model: '1. An **open border**: citizens of each country can **travel, live and work** in the other without visas.\n2. Strong **economic and cultural ties**: trade, Indian aid for development projects, and shared religious and family links.',
  sol: 'Open border and economic or cultural ties; differences (for example over trade or Nepal\'s ties with China) may be noted but are not required.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s3_india_bd', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Describe India\'s relations with Bangladesh by giving two examples of cooperation and one area of disagreement.',
  model: '1. **Cooperation – rivers:** the **1996 treaty** on sharing **Ganga waters** at Farakka eased a long dispute.\n2. **Cooperation – borders and trade:** the **Land Boundary Agreement** put into effect in **2015** exchanged the **enclaves**; trade and transport links have grown.\n3. **Disagreement:** issues such as sharing of **other rivers** and the **movement of people** across the border have caused friction at times.',
  sol: 'Two cooperative steps with examples and one issue of disagreement stated neutrally.',
  scheme: [['First example of cooperation', 1], ['Second example of cooperation', 1], ['Area of disagreement', 1]],
}));
Q('s3_peace_steps', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'India and Pakistan have also tried to build peace. Give three examples of such efforts.',
  model: '1. The **Indus Waters Treaty (1960)**, agreed with World Bank help, divided the rivers of the Indus system.\n2. The **Simla Agreement (1972)** committed both to settle differences **peacefully and bilaterally**.\n3. **Confidence-building measures**, such as the **Delhi–Lahore bus service (1999)**, people-to-people contacts and talks between leaders, were tried to reduce tension.',
  sol: 'Any three genuine peace efforts with a brief explanation each.',
  scheme: [['First effort', 1], ['Second effort', 1], ['Third effort', 1]],
}));
Q('l_indopak', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Describe the major conflicts between India and Pakistan since 1947, and the attempts made to settle them.',
  model: '1. **1947–48:** soon after Partition the two fought over **Kashmir**; a ceasefire line divided the region.\n2. **1965:** a second war ended with the **Tashkent Agreement (1966)**, mediated by the Soviet Union.\n3. **1971:** war during the **Bangladesh** crisis; the **Simla Agreement (1972)** committed both to **bilateral, peaceful** settlement.\n4. **1999:** the **Kargil** conflict; other disputes include **Siachen** and Sir Creek, and both became nuclear-armed after **1998**.\n5. **Peace efforts:** the **Indus Waters Treaty (1960)**, confidence-building measures and periodic **talks** show that cooperation has also been attempted, though lasting settlement has been elusive.',
  sol: 'Four conflicts in order with their outcomes, and the main peace efforts.',
  scheme: [['1947–48', 1], ['1965 and Tashkent', 1], ['1971 and Simla', 1], ['Kargil and other disputes', 1], ['Peace efforts', 1]],
}));
Q('l_neighbours', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'India\'s relations with its smaller neighbours have combined close cooperation with occasional disagreement. Examine this statement with examples from any three neighbours.',
  model: '1. **Nepal:** an **open border** and the **1950 treaty** link the two closely; at times there have been differences over trade and Nepal\'s ties with other powers.\n2. **Bangladesh:** India supported its **1971** independence; the **Ganga treaty (1996)** and the **enclave exchange (2015)** show cooperation, while **river sharing** and **cross-border movement** cause friction.\n3. **Sri Lanka:** close trade ties, but the **IPKF** episode of **1987–90** was unpopular in both countries.\n4. **Bhutan and Maldives:** cooperation on **hydropower** with Bhutan; India helped the Maldives against a **coup attempt in 1988**.\n5. **Conclusion:** because India is much **larger**, neighbours value its support but are wary of **dominance**; relations work best through **regular dialogue and mutual respect**.',
  sol: 'Three or more neighbours, each with cooperation and disagreement, and a balanced conclusion.',
  scheme: [['First neighbour', 1], ['Second neighbour', 1], ['Third neighbour', 1], ['Size asymmetry explained', 1], ['Balanced conclusion', 1]],
}));
Q('sb_lahore_bus', source({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source below, an imagined journalist's travel note from 1999, and answer the questions that follow. ${IMAGINED}`,
  passage: '**Travel note by an imagined journalist, February 1999**\n\nThe bus left Delhi in the morning, decorated with flowers. At the border, crowds waved from both sides, and at Lahore the two prime ministers met and signed a declaration promising to work for peace and to reduce the risk of conflict, now that both countries had tested nuclear weapons the year before. An old man on the bus, born in Lahore before Partition, wept when he saw his school again. Yet a colleague warned me not to be too hopeful: the dispute over the mountain state, he said, has outlived every handshake since the agreement signed in the hill town in 1972.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'In which year had both countries "tested nuclear weapons", according to the note?', model: '**1998**.', sol: 'The note is from 1999 and says "the year before".', scheme: [['1998', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name "the agreement signed in the hill town in 1972".', model: 'The **Simla Agreement**.', sol: 'Simla (Shimla) is the hill town; the agreement dates from 1972.', scheme: [['Simla Agreement', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The colleague warned against too much hope. What happened later in 1999 that supported his warning?', model: 'Only months later, in **1999**, the **Kargil conflict** broke out, showing that the **Kashmir** dispute could still lead to fighting despite the peace effort.', sol: 'Identify Kargil and link it to the unresolved dispute.', scheme: [['Kargil conflict', 1], ['Link to the unresolved dispute', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why are steps like a bus service across the border called "confidence-building measures"?', model: 'They build **trust between people and governments**: families reunite and leaders meet, which reduces **suspicion** and the **risk that a crisis turns into war**.', sol: 'Explain how contact builds trust and lowers the risk of conflict.', scheme: [['Builds trust or contact', 1], ['Reduces risk of conflict', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 SAARC
Q('m_saarc_1985', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The South Asian Association for Regional Cooperation (SAARC) was set up in',
  opts: ['1985', '1971', '1991', '2004'],
  sol: 'SAARC was founded at Dhaka in December 1985. 1971 is the year of Bangladesh\'s independence and 2004 of SAFTA.',
}));
Q('m_saarc_hq', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The permanent secretariat of SAARC is located in',
  opts: ['Kathmandu', 'New Delhi', 'Dhaka', 'Colombo'],
  sol: 'The SAARC secretariat is in Kathmandu, Nepal. Dhaka hosted the founding summit.',
}));
Q('m_afghan', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which country joined SAARC in 2007 as its eighth member?',
  opts: ['Afghanistan', 'Myanmar', 'China', 'Iran'],
  sol: 'Afghanistan became the eighth member in 2007. Myanmar, China and Iran are not members.',
}));
Q('m_safta', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'What is the main aim of the South Asian Free Trade Area (SAFTA)?',
  opts: [
    'To lower tariffs on trade among member countries, step by step',
    'To create a common army for South Asia',
    'To settle the Kashmir dispute',
    'To introduce a single currency for the region',
  ],
  sol: 'SAFTA, signed in 2004, aims to reduce trade barriers among members. SAARC has no common army, keeps bilateral disputes off its agenda and has no single currency.',
}));
Q('m_saarc_limit', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Which is the most widely given reason for SAARC achieving less than its founders hoped?',
  opts: [
    'Political tensions among members, especially between India and Pakistan',
    'Its members have no common borders',
    'It has too many members from outside Asia',
    'It is controlled by the United Nations',
  ],
  sol: 'Political tension, above all between India and Pakistan, has held SAARC back. Most members share borders, all are South Asian, and the UN does not control it.',
}));
Q('m_saarc_rule', mcq({
  t: 4, d: 3, c: 'understanding',
  stem: 'Which of the following is a working rule of SAARC laid down in its charter?',
  opts: [
    'Decisions are taken unanimously, and bilateral and contentious issues are kept off its agenda',
    'Decisions are taken by a two-thirds majority vote',
    'The largest member has a veto, and bilateral disputes are settled at summits',
    'Members must merge their armed forces',
  ],
  sol: 'SAARC decides by unanimity and excludes bilateral and contentious issues from its deliberations. The other options are invented.',
}));
Q('ar_safta', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'Some of the smaller SAARC members had reservations about SAFTA when it was being negotiated.',
  r: 'They feared that India\'s much larger economy and industries could dominate the regional market.',
  sol: 'Both are true, and R explains A: the worry of smaller economies about competing with Indian producers was a reason for their caution.',
}));
Q('tf_saarc_vote', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? SAARC takes its decisions by a simple majority vote of its members.',
  sol: 'SAARC decisions are taken by unanimity, so any member can block a decision.',
}));
Q('fb_safta', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'The agreement on the South Asian Free Trade Area was signed at the SAARC summit held in Islamabad in the year ___.',
  acc: [['2004']],
  sol: 'SAFTA was signed in 2004 and came into force in 2006.',
}));
Q('mt_saarc', match({
  t: 4, d: 1, c: 'recall', marks: 2,
  stem: 'Match each fact about SAARC with its answer.',
  pairs: [
    ['Year SAARC was founded', '1985'],
    ['City of the permanent secretariat', 'Kathmandu'],
    ['Member that joined in 2007', 'Afghanistan'],
    ['Regional free trade agreement', 'SAFTA'],
  ],
  sol: 'Founded 1985; secretariat in Kathmandu; Afghanistan joined in 2007; SAFTA is the free trade agreement (signed 2004).',
}));
Q('s_saarc_aims', short({
  t: 4, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two objectives of SAARC.',
  model: '1. To promote **economic growth, social progress and cultural development** in South Asia through **cooperation**.\n2. To increase **mutual trust** among members and strengthen **collective self-reliance**, for example by expanding **regional trade**.',
  sol: 'Any two objectives: welfare and development, trust and understanding, self-reliance, cooperation in economic, social and cultural fields.',
  scheme: [['First objective', 1], ['Second objective', 1]],
}));
Q('s_saarc_limits', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why SAARC has not been as effective as other regional groups.',
  model: '1. **Political tension**, especially between **India and Pakistan**, has delayed decisions and even summits.\n2. The **unanimity rule** and the exclusion of **bilateral disputes**, together with the large **size gap** between India and the others, limit what it can do.',
  sol: 'Any two: political disputes, unanimity rule, exclusion of contentious issues, asymmetry of size, low intra-regional trade.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_safta', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'What is SAFTA? Explain why it was welcomed by some and viewed with caution by others.',
  model: '1. **SAFTA** is the **South Asian Free Trade Area**, signed in **2004**, which aims to **reduce tariffs** on trade among SAARC members.\n2. **Welcomed:** freer trade could help producers reach **bigger markets**, lower prices for consumers and build **peaceful ties** through economic links.\n3. **Caution:** smaller members feared that **Indian firms** might dominate their markets, while some in India felt the gains were **too small** given low regional trade.',
  sol: 'Meaning, the case for, and the reservations on more than one side.',
  scheme: [['Meaning and year', 1], ['Why welcomed', 1], ['Why viewed with caution', 1]],
}));
Q('l_saarc', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate the role of SAARC in promoting peace and cooperation in South Asia.',
  model: '1. **Purpose:** set up in **1985** by seven states (Afghanistan joined in **2007**) to promote **economic, social and cultural cooperation**.\n2. **Achievements:** regular **meetings of officials and leaders**, cooperation in areas such as health, agriculture and disaster management, and **SAFTA (2004)** to reduce trade barriers.\n3. **Dialogue:** summits gave leaders of countries in dispute a **chance to meet**.\n4. **Limitations:** **India–Pakistan tension**, the **unanimity rule**, exclusion of **bilateral issues** and **low regional trade** have restricted its impact; no summit has been held since **2014** (as of 2024).\n5. **Assessment:** SAARC has built **habits of cooperation**, but its success depends on **political will**; members have also turned to other regional groupings.',
  sol: 'Purpose, achievements, limitations and a balanced evaluation.',
  scheme: [['Purpose and membership', 1], ['Achievements', 1], ['Role as a forum for dialogue', 1], ['Limitations', 1], ['Balanced evaluation', 1]],
}));
Q('sb_youth', source({
  t: 4, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source below, a report from an imagined student exchange, and answer the questions that follow. ${IMAGINED}`,
  passage: '**Report of an imagined South Asian student exchange, Kathmandu, 2012**\n\nThirty students from all eight member countries of the regional association met near its permanent secretariat. A student from Thimphu said hydropower could light up the whole region if grids were linked. A student from Colombo complained that it is often cheaper to import goods from distant countries than from neighbours. When two delegates began arguing about a border dispute, the organisers reminded everyone that the association\'s charter keeps such matters off the agenda. In the closing session, the students wrote a short message to their leaders: "Meet more often, trade more freely, trust each other more."',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Name the regional association whose secretariat is mentioned in the report.', model: '**SAARC** (South Asian Association for Regional Cooperation), with its secretariat in **Kathmandu**.', sol: 'Eight member countries and a secretariat in Kathmandu identify SAARC.', scheme: [['SAARC', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which agreement is meant to deal with the problem raised by the student from Colombo?', model: 'The **South Asian Free Trade Area (SAFTA)**, which aims to lower tariffs on trade among members.', sol: 'Costly regional trade is what SAFTA is meant to address.', scheme: [['SAFTA', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why did the organisers stop the argument about a border dispute? Is this rule a strength or a weakness of the association?', model: 'The charter **excludes bilateral and contentious issues**. It keeps meetings **from breaking down** (a strength), but it also means SAARC **cannot help resolve** the disputes that hold it back (a weakness).', sol: 'State the rule and weigh one strength against one weakness.', scheme: [['The rule', 1], ['Balanced judgement', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The students ask leaders to "meet more often". Why is this request important for the association?', model: 'Summits are where **decisions** are taken and **trust** is built; when they are **postponed** because of tensions, cooperation **stalls**, so regular meetings are vital.', sol: 'Link meetings with decisions and trust, and note what happens when they stop.', scheme: [['Role of meetings', 1], ['Effect of missed meetings', 1]] }),
    ]),
  ],
}));
