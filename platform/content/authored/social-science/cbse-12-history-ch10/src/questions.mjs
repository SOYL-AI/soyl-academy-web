// CBSE 12 History, ch10 Rebels and the Raj: The Revolt of 1857 and its Representations, question bank.
// Every source passage is an imagined document (a district officer's report, a taluqdar's clerk's diary), an imagined
// description of an imagined picture (a print sold in London in 1858, a poster of the 1930s), or a SOYL summary of what
// a kind of record contains (a rebel proclamation), written in SOYL's own words and labelled as such. Nothing from any
// proclamation, official report, letter, newspaper, cartoon, painting caption or museum catalogue of the period is
// quoted, translated or closely paraphrased, and no NCERT text, source box, caption, picture or exercise and no board or
// sample-paper item is reused (D-036). Real people are named and their views described in SOYL's own plain words, with
// no invented quotations. Violence by rebels and by the British is stated factually and briefly, with no detail and no
// blame of any community; the labels "mutiny" and "first war of independence" are presented as a debate about naming.
// All numbers in data items are imagined. Places are named in words only: no map work (OA-23).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';
const PIC = '*(Imagined picture described by SOYL for practice; no real picture, caption or catalogue entry is quoted or reproduced.)*';

// ================================================================ t01 Pattern of the rebellion and its spread
Q('m_meerut', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `On which date in 1857 did the sepoys at Meerut mutiny, starting the revolt?`,
  opts: [`10 May`, `11 May`, `29 March`, `20 June`],
  sol: `The Meerut sepoys rose on 10 May; on the following day they reached Delhi.`,
}));
Q('m_rumour_test', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Historians argue that rumours travelled fast in 1857 when they matched what people already feared about the intentions of the British. Which of these imagined rumours, circulating in a north Indian cantonment and its villages, would on that reasoning have spread fastest?`,
  opts: [
    `That the government meant to undermine the faith of the people by mixing forbidden substances into food and by sending missionaries`,
    `That the monsoon of the coming year would arrive earlier than usual`,
    `That a new parade ground would be laid out beside the cantonment`,
    `That the price of salt would be fixed by a new committee`,
  ],
  sol: `Only the first rumour touches the fears of interference with religion and custom that people already held about the new rulers. The others concern weather, buildings or prices, which carry no such charge.`,
}));
Q('m_cartridge', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Why did the report that the new Enfield rifle cartridges were greased with animal fat alarm sepoys of both Hindu and Muslim faiths?`,
  opts: [
    `The fat was said to come from cows and pigs, and contact with it would offend the religious feelings of many soldiers of both faiths`,
    `The cartridges were said to be too heavy to carry on long marches`,
    `The cost of the cartridges was to be taken out of the sepoys' pay`,
    `The cartridges were said to be meant only for British regiments`,
  ],
  sol: `The rumoured fat of cows and pigs touched the religious sentiments of Hindu and Muslim soldiers alike. The other reports are not part of the cartridge rumour.`,
}));
Q('m_pattern_town', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Historians describe a common pattern: sepoys seize arms and the treasury and attack government buildings, and then townspeople and villagers join in, often attacking moneylenders. Three imagined towns are reported. In town P the sepoys took the treasury and opened the jail, and the next day a crowd looted a moneylender's house. In town Q a crowd from nearby villages attacked a moneylender and a revenue office, and no soldiers took part. In town R the sepoys took arms and the treasury, then marched away to join others, and no civilians acted. Which statement is correct?`,
  opts: [
    `P follows the whole pattern, while Q and R each follow only part of it`,
    `All three towns follow the whole pattern`,
    `Only R follows the pattern, because the sepoys acted first`,
    `Q follows the whole pattern, because a moneylender was attacked`,
  ],
  sol: `Check each town against both stages. P has the sepoy stage and the civilian stage. Q lacks the sepoy stage and R lacks the civilian stage.`,
}));
Q('m_planning_weaken', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `Some historians think the revolt was not wholly spontaneous, because regiments sent messages to one another and sepoy panchayats met at night. Which finding about an imagined cantonment would most weaken this view?`,
  opts: [
    `The surviving messages between its regiments concern only leave, pay and a quarrel over rations, and the night meetings dealt with nothing else`,
    `The messages were carried by sepoys who travelled between stations on foot`,
    `The night meetings were held in the week before the regiment rose`,
    `Several regiments in neighbouring stations rose within days of one another`,
  ],
  sol: `The inference of planning rests on the content of the contacts. If they were about ordinary regimental matters, the contacts no longer point to a plan. The other findings are consistent with planning or neutral.`,
}));
Q('m_nonelite', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which pair of leaders of 1857 came from peasant or tribal backgrounds, and not from ruling or landed families?`,
  opts: [
    `Shah Mal of the Baraut region and Gonoo of Singhbhum`,
    `Nana Sahib and Begum Hazrat Mahal`,
    `Kunwar Singh and Rani Lakshmi Bai`,
    `Begum Hazrat Mahal and Kunwar Singh`,
  ],
  sol: `Shah Mal was a peasant leader and Gonoo a tribal cultivator. The other pairs include a Peshwa's adopted son, a begum, a queen and a zamindar.`,
}));
Q('m_date_letter', mcq({
  t: [1, 5], d: 3, c: 'application',
  stem: `An imagined undated letter by a clerk in a north Indian town says that the old emperor sits in the Red Fort, that rebel soldiers hold Delhi, and that the Company's reinforcements have not yet reached the city. Within which period was it most probably written?`,
  opts: [
    `Between 11 May 1857 and the recapture of Delhi in late September 1857`,
    `Before 10 May 1857, since the sepoys had not yet risen`,
    `After the final retaking of Lucknow in March 1858`,
    `In 1862, when the old emperor died in exile`,
  ],
  sol: `The emperor in the Red Fort at the head of the rebels puts the letter after 11 May 1857, and rebel control of Delhi puts it before the city was recaptured. The other dates contradict one of these clues.`,
}));
Q('m_gov_targets', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `In many places rebel sepoys, after taking arms and the treasury, attacked the jail, the telegraph office and the records room. Which explanation fits all three targets best?`,
  opts: [
    `Each stood for a power of the government: to hold prisoners, to send orders and news quickly, and to keep records of dues and decisions`,
    `All three were the richest buildings of a cantonment, so the aim was only plunder`,
    `All three were used only by Indian clerks, whom the sepoys wished to punish`,
    `All three housed the families of British officers`,
  ],
  sol: `The common feature of the three targets is administrative power. The other explanations do not fit all three: a jail or a records room holds no wealth, and none of them was a family residence.`,
}));
Q('tf_kunwar', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: `True or false? Kunwar Singh, a leader of the revolt, was a zamindar of Arrah in Bihar.`,
  sol: `He is remembered as the zamindar of Arrah who took up arms.`,
}));
Q('fb_zafar', fb({
  t: 1, d: 1, c: 'recall',
  stem: `At Delhi the sepoys asked the ageing Mughal emperor ___ to be their leader, and he agreed.`,
  acc: [[`Bahadur Shah Zafar`, `Bahadur Shah`, `Bahadur Shah II`]],
  sol: `Bahadur Shah Zafar accepted the leadership on 11 May 1857.`,
}));
Q('mt_leaders', match({
  t: 1, d: 1, c: 'recall',
  stem: `Match each leader of 1857 with the place where he or she is chiefly remembered.`,
  pairs: [[`Nana Sahib`, `Kanpur`], [`Rani Lakshmi Bai`, `Jhansi`], [`Kunwar Singh`, `Arrah, in Bihar`], [`Begum Hazrat Mahal`, `Lucknow`]],
  sol: `Nana Sahib was the adopted son of Baji Rao II, the last Peshwa. Begum Hazrat Mahal put forward her son as nawab.`,
}));
Q('s_pattern', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `Two imagined station records of 1857. At station X, sepoys rose on 20 May and a bazaar crowd attacked a moneylender on 21 May. At station Y, villagers burned a moneylender's account books on 18 May and the sepoys rose on 22 May. Which station follows the usual order of events, and what does the other record suggest?`,
  model: `**Station X** follows the usual order, with the sepoys first and civilians afterwards. At **station Y** the villagers acted four days before the sepoys, which suggests that **local grievances against moneylenders** moved them on their own, and that the sepoys did not set them going.`,
  sol: `Station X fits the order of the two stages; the reversed order at Y points to an independent village grievance.`,
  scheme: [[`X identified as following the usual order`, 1], [`Y's reversed order read as a local grievance`, 1]],
}));
Q('s_chapati', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `A source reports that chapatis were passed from village to village in 1857. State one thing a historian could reasonably infer from this report and one thing that the report alone cannot tell her.`,
  model: `She can infer that **something was being passed by hand between villages**, so news or alarm could travel quickly along village links. The report alone cannot tell her **what the chapatis meant** to those who passed them on, or whether anyone organised the practice.`,
  sol: `A cautious inference and a stated limit.`,
  scheme: [[`A reasonable inference`, 1], [`A limit: meaning or organiser unknown`, 1]],
}));
Q('s_rumours', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Why did rumours about the cartridges and about bone dust in flour spread so quickly in 1857?`,
  model: `They fitted **existing fears about British intentions**, such as interference with religion and custom. People already uneasy about reforms, missionary activity and annexations were **ready to believe** a report that matched those fears, and so they repeated it.`,
  sol: `The fit between rumour and fear is the cause of the quick spread.`,
  scheme: [[`The rumours matched fears about British intentions`, 1], [`Link with reforms, missionaries or annexations`, 1]],
}));
Q('s3_leaders', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Compare Nana Sahib and Shah Mal as leaders of 1857, naming where each acted and his background, and say what the difference suggests about the revolt.`,
  model: `**Nana Sahib**, the adopted son of Baji Rao II, the last Peshwa, led at **Kanpur** and could draw on a ruling family's name. **Shah Mal** was a **peasant leader** in the Baraut region of Uttar Pradesh. The difference suggests that the revolt drew leaders from **ruling families and from ordinary villagers**, so it was not the work of one class.`,
  sol: `Two leaders placed and described, and an inference about the breadth of leadership.`,
  scheme: [[`Nana Sahib: place and background`, 1], [`Shah Mal: place and background`, 1], [`Inference about breadth`, 1]],
}));
Q('l_spread', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `To what extent was the spread of the revolt of 1857 planned, and to what extent did it arise from circumstances? Use the evidence of the pattern of revolt, the messages between regiments and the rumours.`,
  model: `1. **For planning:** sepoys sent messages between regiments and sepoy panchayats met at night, which suggests some coordination.\n2. **For circumstances:** the revolt began at Meerut after soldiers who refused the new cartridges were punished, and it spread as others learnt that Delhi had a leader.\n3. **Rumours** about cartridges and flour passed quickly because they matched fears about British intentions, which made many ready to act.\n4. **Civilians** joined after the sepoys had risen and attacked moneylenders, which looks like local grievance and not a single plan.\n5. **Judgement:** some planning among sepoys is likely, but the wide spread owed more to shared fears and local causes.`,
  sol: `Evidence for planning, evidence for circumstances, the part of rumours and of civilians, and a measured judgement.`,
  scheme: [[`Evidence for planning`, 1], [`Evidence for circumstances`, 1], [`Rumours and fears`, 1], [`The civilians' part`, 1], [`A reasoned judgement`, 1]],
}));

// ================================================================ t02 Awadh in revolt
Q('m_dalhousie', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Which Governor-General annexed Awadh in 1856 on the ground that its nawab had misgoverned?`,
  opts: [`Lord Dalhousie`, `Lord Wellesley`, `Lord Canning`, `Lord Cornwallis`],
  sol: `Dalhousie annexed Awadh and the nawab, Wajid Ali Shah, was sent to Calcutta. Wellesley is linked with the Subsidiary Alliance and Canning was Governor-General during the revolt.`,
}));
Q('m_birjis', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Whom did Begum Hazrat Mahal put forward as the nawab during the revolt at Lucknow?`,
  opts: [`Her young son Birjis Qadr`, `The dethroned Wajid Ali Shah`, `Nana Sahib`, `Maulvi Ahmadullah Shah`],
  sol: `Her son Birjis Qadr was set up as nawab, and his regime acted as a rebel administration in Lucknow.`,
}));
Q('m_awadh_peasant', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Historians explain that many peasants of Awadh joined their taluqdars in the revolt partly because the revenue demand on peasants did not fall much once the taluqdars were removed. Which finding about an imagined district would most weaken this explanation?`,
  opts: [
    `Records showing that the demand on peasants fell sharply there, yet peasants rose with their taluqdars in equal numbers`,
    `Records showing that the demand stayed the same and that peasants rose with their taluqdars`,
    `Petitions from peasants asking that the taluqdars be restored`,
    `Records showing that taluqdars had lent grain to peasants in a bad year`,
  ],
  sol: `An explanation is weakened when the effect appears even though the supposed cause is absent. The other findings are consistent with the explanation or point to other ties.`,
}));
Q('m_awadh_sepoy', mcq({
  t: 2, d: 2, c: 'analysis',
  stem: `Which imagined finding would best support the claim that the grievances of sepoys and of peasants were linked in Awadh?`,
  opts: [
    `Letters from sepoys that discuss the village revenue demand, and village petitions that mention sons serving in the Company's army`,
    `Pay registers showing that the sepoys were paid on time`,
    `Recruitment lists showing that no sepoys came from Awadh villages`,
    `Records of a regiment recruited wholly from another region`,
  ],
  sol: `A link needs evidence that the two groups shared concerns and were connected by families. Only the first finding shows both.`,
}));
Q('m_awadh_losers', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Which of these imagined persons of Lucknow would historians be LEAST likely to find among those who lost out because of the annexation of Awadh?`,
  opts: [
    `A Company official who gained a post in the new administration`,
    `A retainer of a taluqdar whose fort and lands were taken in the settlement`,
    `A courtier whose place vanished when the nawab's court was dissolved`,
    `A soldier of the nawab's army who lost his post`,
  ],
  sol: `The annexation brought new posts for the Company's servants. The other three lost land, place or employment.`,
}));
Q('m_lapse', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Dalhousie's doctrine of lapse allowed the annexation of a state whose ruler died without a natural heir. An imagined state loses its raja, who leaves only an adopted son; a second imagined state loses its raja, who leaves a son by birth. Which statement is correct?`,
  opts: [
    `The doctrine could be applied only to the first state; and Awadh, unlike it, was annexed on the ground of misgovernment`,
    `The doctrine could be applied only to the second state; and Awadh was annexed for the same reason as the first`,
    `The doctrine could be applied to both states, and Awadh was annexed by it`,
    `The doctrine could be applied to neither state, since lapse applied only to Awadh`,
  ],
  sol: `Apply the criterion of a missing natural heir to each state. Jhansi, Satara and Nagpur are examples of lapse, while the ground given for Awadh was misgovernment.`,
}));
Q('ar_subsidiary', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: `Awadh had earlier been bound by the Subsidiary Alliance.`,
  r: `The Subsidiary Alliance was introduced by Lord Dalhousie in 1798.`,
  sol: `Awadh was indeed bound by the alliance, but it was Lord Wellesley who introduced it in 1798. Dalhousie came later.`,
}));
Q('ar_awadh_sepoys', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: `Many sepoys of the Company's Bengal army came from villages of Awadh.`,
  r: `Awadh was annexed in 1856 on the ground of misgovernment.`,
  sol: `Both statements are accurate, but the annexation did not cause the army's recruitment from Awadh villages; it only gave those sepoys a fresh grievance later.`,
}));
Q('tf_awadh_long', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: `True or false? Awadh saw some of the longest resistance during the revolt.`,
  sol: `Resistance in Awadh continued well after Delhi was recaptured; Lucknow was finally retaken only in March 1858.`,
}));
Q('fb_taluqdar', fb({
  t: 2, d: 1, c: 'recall',
  stem: `In Awadh, the large landholders who had forts and armed retainers were called ___.`,
  acc: [[`taluqdars`, `taluqdar`, `talukdars`, `talukdar`]],
  sol: `Taluqdars lost lands under the settlement of 1856; many peasants and retainers followed them.`,
}));
Q('s_awadh_why', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `A student writes: Awadh rose in 1857 because the British raised the tax on peasants far above what the taluqdars had taken, so the peasants alone made the revolt. Say what is wrong or only partly right in this claim, and correct it.`,
  model: `The claim is **partly right**: peasants did join the revolt, and their burden was a grievance. But the demand on them **did not rise sharply; it failed to fall** as the British had expected. Nor did peasants act alone: **taluqdars, dismissed court servants and soldiers, and sepoys from the villages** also took part.`,
  sol: `The peasants' part is accepted, the claim about a sharp rise is corrected, and the other groups are added.`,
  scheme: [[`The demand did not rise sharply but failed to fall`, 1], [`Other groups also took part`, 1]],
}));
Q('s_peasant_taluq', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `In an imagined Awadh district, peasants paid 100 rupees a year in revenue and dues through a taluqdar's agents before 1856, and 97 rupees to the new government's collectors after the settlement. The district officer expects peasants to welcome the change. Explain why many might still join the taluqdar.`,
  model: `A fall of three rupees in a hundred was **slight**, so the peasants gained almost nothing from the taluqdar's removal. They also had **ties of loyalty** to him and may have distrusted the new collectors. Their main grievance, the heavy demand, was not met, so they sided with him.`,
  sol: `The small fall in the demand, and the older ties to the taluqdar.`,
  scheme: [[`The fall was too small to matter`, 1], [`Ties to the taluqdar or distrust of the new collectors`, 1]],
}));
Q('s3_awadh_sepoys', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined return gives, for two regiments of the Company's Bengal army, the number of sepoys and how many came from villages of Awadh: Regiment A, 600 of 800; Regiment B, 270 of 900. Work out each share, say whose sepoys were more likely to share the grievances of Awadh's villages, and give one limit of this conclusion.`,
  model: `**Shares:** A, 600 of 800 is 75 per cent; B, 270 of 900 is 30 per cent. **Regiment A** was more likely to share village grievances, since three in four of its men had homes in Awadh villages. **Limit:** where a sepoy came from does not show what he felt; letters or petitions would be needed.`,
  sol: `Two shares computed, the regiment named with a reason, and a limit stated.`,
  scheme: [[`Both shares correct`, 1], [`Regiment A named with a reason`, 1], [`A limit stated`, 1]],
}));
Q('l_awadh', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Assess how far the removal of the taluqdars explains the long resistance in Awadh. Use evidence about peasants, sepoys and the nawab's court.`,
  model: `1. **Taluqdars:** the summary settlement of 1856 removed many from their lands. They had forts and armed retainers, so they had both reason and means to resist.\n2. **Peasants:** the revenue demand did not fall much, so peasants had a grievance of their own and often followed their taluqdars.\n3. **Sepoys:** many came from Awadh villages, so the grievances of the army and the countryside were linked.\n4. **The court:** the dissolution of the nawab's court and army left many without work.\n5. **Judgement:** the taluqdars were central, but the resistance lasted because several groups with separate grievances joined; the settlement alone does not explain it.`,
  sol: `Taluqdars, peasants, sepoys and the court weighed in turn, with a judgement on how far one cause explains.`,
  scheme: [[`The taluqdars' reason and means`, 1], [`Peasants' separate grievance`, 1], [`The link with sepoys`, 1], [`The court and army dissolved`, 1], [`A reasoned judgement on how far`, 1]],
}));

// ================================================================ t03 What the rebels wanted; repression
Q('m_rangoon', mcq({
  t: 3, d: 1, c: 'recall',
  stem: `To which city was Bahadur Shah Zafar exiled after his trial following the recapture of Delhi?`,
  opts: [`Rangoon`, `Calcutta`, `Lucknow`, `Kanpur`],
  sol: `He died in exile at Rangoon in 1862. Calcutta is where the dethroned nawab of Awadh was sent.`,
}));
Q('m_proclaim', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Which feature do the rebel proclamations of 1857, such as those issued in the name of Bahadur Shah and at Azamgarh, share?`,
  opts: [
    `They called on people of all religions, above all Hindus and Muslims together, to fight British rule`,
    `They asked only Muslim soldiers to rise`,
    `They asked people to pay revenue to the British until the end of the year`,
    `They demanded a republic with an elected assembly`,
  ],
  sol: `The proclamations were addressed to all sections of society. The other statements describe aims that the proclamations did not state.`,
}));
Q('m_proclaim_fit', mcq({
  t: [3, 5], d: 3, c: 'analysis',
  stem: `Which question could a historian answer best from an imagined proclamation issued in the name of a rebel authority?`,
  opts: [
    `How did the rebel leadership want its cause to appear, and whom did it hope to win over?`,
    `How many people in each village actually obeyed it?`,
    `What price did a peasant pay for grain in that year?`,
    `Which regiment was the first to reach the town?`,
  ],
  sol: `A proclamation records the intentions and appeals of its authors. It says nothing reliable about obedience, prices or troop movements, which need other records.`,
}));
Q('m_unity_weaken', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Historians note that British attempts to present the revolt as a conflict between communities largely failed in the main centres. Which finding about an imagined main centre would most weaken this claim?`,
  opts: [
    `Records showing that its rebel forces split along religious lines and fought each other for weeks`,
    `Proclamations there that were addressed to Hindus and Muslims together`,
    `A British report that expected the rebels to divide`,
    `Records of a Hindu leader and a Muslim leader acting together`,
  ],
  sol: `Only a real, lasting division among the rebels would undermine the claim. The other findings show unity or merely a British expectation.`,
}));
Q('m_moneylender', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Two historians explain why rebels attacked moneylenders. X says they were seen as allies of the British. Y says they were attacked simply as creditors. Which imagined finding would favour X over Y?`,
  opts: [
    `Moneylenders with links to British officials were attacked far more often than those without, although both lent on similar terms`,
    `Most attacks came just after the harvest, when debts fell due`,
    `Moneylenders of every kind were attacked equally, whatever their links with officials`,
    `Debt papers were burnt in the houses that were attacked`,
  ],
  sol: `To favour X the finding must separate links with the British from the fact of lending. Only the first does; the others fit Y at least as well.`,
}));
Q('m_parallel', mcq({
  t: 3, d: 2, c: 'application',
  stem: `Which finding about an imagined city in 1857 would best show that the rebels had set up a parallel administration, and not merely held the city by force?`,
  opts: [
    `A register of orders issued by a rebel court of administration, dealing with appeals, supplies and the pay of soldiers`,
    `A note that rebel soldiers camped in the main square`,
    `A list of arms taken from the arsenal`,
    `A letter praising the courage of the sepoys`,
  ],
  sol: `A parallel administration shows itself in a continuing system of orders and duties. The other findings describe occupation, seizure or praise.`,
}));
Q('m_martial', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `What was the effect of the laws that the British passed in May and June 1857?`,
  opts: [
    `Much of north India came under martial law, and military officers and even ordinary Britons could try and punish Indians suspected of rebellion`,
    `Only Indian judges were permitted to try suspected rebels`,
    `The annexation of Indian states was ended`,
    `All rebels were promised a pardon if they gave up their arms within a month`,
  ],
  sol: `The laws widened the power to try and punish. They did not limit the trials to Indian judges, end annexation or offer a general pardon.`,
}));
Q('ar_proclaim', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: `A proclamation issued at Azamgarh in August 1857 shows that all the rebels shared a single programme.`,
  r: `The proclamation appealed to people of different religions to fight together.`,
  sol: `The appeal is a fact, but an appeal states what its authors hoped for; it does not show that every rebel shared one programme, since local aims varied.`,
}));
Q('ar_repress', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: `The laws of 1857 let ordinary Britons try Indians suspected of rebellion.`,
  r: `Reinforcements arrived from Britain during the revolt.`,
  sol: `Both are true, but the arrival of reinforcements does not account for the content of the laws, which widened who could try suspects.`,
}));
Q('ar_unity', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: `British attempts to portray the revolt as a conflict between communities largely failed in the main centres.`,
  r: `All the leading figures of the revolt belonged to one community.`,
  sol: `The first statement is correct. The second is false: leaders included Bahadur Shah Zafar, Nana Sahib, Rani Lakshmi Bai and Begum Hazrat Mahal.`,
}));
Q('ar_rumour', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `A rumour of 1857 that bone dust had been mixed into flour sold in markets is useful evidence of the fears of the people who repeated it.`,
  r: `A rumour can be valuable to a historian even when it is not true.`,
  sol: `A rumour is evidence of what people feared and believed, not of what happened, so its falseness does not remove its value; R gives the reason for A.`,
}));
Q('tf_crown', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: `True or false? After the revolt, British rule in India passed from the East India Company to the Crown in 1858.`,
  sol: `Rule passed from the Company to the Crown in 1858.`,
}));
Q('ord_events', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: `Put these four events of the revolt in the order in which they occurred, earliest first.`,
  items: [`Sepoys rise at Meerut (10 May 1857)`, `Delhi is recaptured by the British (late September 1857)`, `Lucknow is finally retaken (March 1858)`, `The Rani of Jhansi dies fighting (June 1858)`],
  sol: `The rising at Meerut came first, then the fall of Delhi that year, and the events of 1858 follow in the order March, June.`,
}));
Q('s_proclaim', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `A historian claims that the proclamations issued in the name of Bahadur Shah show that Hindus and Muslims in the rebel camp at Delhi had in fact come together. Name one imagined finding that would strengthen this claim and one that would weaken it.`,
  model: `**Strengthen:** records that people of both faiths served together in the rebel court of administration and forces, taking orders from one authority. **Weaken:** records that the two groups kept separate camps, quarrelled over command or issued rival orders. A proclamation states a call; only such records show how people acted.`,
  sol: `One finding for each direction, resting on how people actually acted.`,
  scheme: [[`A finding that strengthens`, 1], [`A finding that weakens`, 1]],
}));
Q('s_repress_law', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `An imagined British civilian with no military rank, in a north Indian town in mid 1857, is allowed to try an Indian suspected of rebellion. Which feature of the laws of 1857 does this show, and what might it mean for the suspect?`,
  model: `It shows the laws of May to June 1857, which put north India under martial law and let military officers and **even ordinary Britons** try and punish suspects. For the suspect it could mean a **hurried trial by someone with no judicial training**, with little protection against a harsh sentence.`,
  sol: `The feature of the laws identified and a reasoned consequence.`,
  scheme: [[`Feature: ordinary Britons allowed to try suspects`, 1], [`A reasoned consequence for the suspect`, 1]],
}));
Q('s3_aims_unity', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Two imagined notices of 1857 survive from one town. Notice X calls on Hindus and Muslims together to fight. Notice Y, put up by a village group, tells villagers to attack a moneylender and his records. Do they contradict each other? What do they show together about what the rebels wanted?`,
  model: `They do **not contradict** each other, since they address different audiences and aims. X shows a wish for **unity across religions** against British rule; Y shows a **local grievance** against a moneylender seen as an ally of the British. Together they suggest a common cause joined to varied local aims, so no single notice states what all rebels wanted.`,
  sol: `No contradiction, the aim of each notice, and the combined reading.`,
  scheme: [[`No contradiction, with a reason`, 1], [`What each notice shows`, 1], [`The combined reading`, 1]],
}));
Q('s3_repress', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Describe three steps by which the British put down the revolt.`,
  model: `They passed **laws in May and June 1857** that put north India under martial law and let military officers and even ordinary Britons try suspects, and **reinforcements** came from Britain. They **recaptured Delhi** in late September 1857 and finally **retook Lucknow** in March 1858. By the end of 1858 to 1859 the revolt had largely been suppressed.`,
  sol: `Laws, reinforcements and the recapture of the main centres.`,
  scheme: [[`The laws and martial law`, 1], [`Reinforcements from Britain`, 1], [`Recapture of Delhi and Lucknow`, 1]],
}));
Q('l_aims', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Assess the view that the rebels of 1857 were united by a common vision. Support your answer with evidence on both sides.`,
  model: `1. **For unity:** proclamations issued in Bahadur Shah's name and at Azamgarh appealed to all sections and to Hindus and Muslims together.\n2. **For unity:** the rebels looked to the Mughal emperor, hoping to restore an earlier world, and set up parallel administrations in Delhi and Lucknow.\n3. **Against:** local groups attacked moneylenders and the rich, so aims varied from place to place; a proclamation records what leaders wished to say.\n4. **The British** tried to present the revolt as a conflict between communities, but largely failed in the main centres.\n5. **Judgement:** there was a shared hostility to British rule and a call for unity, but no single programme.`,
  sol: `Evidence for a common vision, evidence against, and a balanced conclusion.`,
  scheme: [[`Proclamations and the call for unity`, 1], [`The emperor and parallel administrations`, 1], [`Evidence of varied local aims`, 1], [`The failed British attempt to divide`, 1], [`A balanced judgement`, 1]],
}));
Q('l_repress', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `Assess how far the laws of 1857 and the arrival of reinforcements explain how the British regained control of north India by 1859. Weigh them against other evidence about the revolt.`,
  model: `1. **The laws** of May and June 1857 put north India under martial law and let officers and ordinary Britons try suspects, so punishment could be quick and widespread.
2. **Reinforcements** from Britain gave the British the strength to retake Delhi in September 1857 and Lucknow in March 1858.
3. **The main centres** mattered: once the court of administration at Delhi and the regime at Lucknow fell, the rebels lost their rallying points.
4. **Rebel weaknesses:** aims varied by place, with no single programme, which limited common action.
5. **Judgement:** laws and reinforcements were necessary but not enough alone; the loss of the centres and the rebels' scattered aims also explain the outcome.`,
  sol: `Laws, reinforcements, the main centres and rebel weaknesses weighed, with a judgement on how far the first two explain.`,
  scheme: [[`The laws`, 1], [`Reinforcements`, 1], [`The loss of the main centres`, 1], [`Rebel weaknesses`, 1], [`A reasoned judgement on how far`, 1]],
}));
// ================================================================ t04 Images of the revolt
Q('m_noelpaton', mcq({
  t: 4, d: 1, c: 'recall',
  stem: `Joseph Noel Paton's painting In Memoriam (1858) was about which subject?`,
  opts: [`English women and children in the revolt`, `The last battle of the Rani of Jhansi`, `The trial of Bahadur Shah Zafar`, `The recapture of Delhi`],
  sol: `The painting concerns English women and children. It is a British image, not a nationalist one.`,
}));
Q('m_vengeance', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `Which theme was common in many British pictures of the revolt made after 1857?`,
  opts: [
    `The British as heroic rescuers and bringers of justice, and the rebels as violent`,
    `The rebels as heroes of a struggle for freedom`,
    `Village life in the months before the revolt`,
    `A calm survey of the causes of the revolt`,
  ],
  sol: `Rescue and avenging justice were favourite themes of British images. The heroic view of the rebels belongs to later nationalist pictures.`,
}));
Q('m_barker', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `Thomas Jones Barker's painting of 1859 on the relief of Lucknow shows Colin Campbell, James Outram and Henry Havelock. What kind of memory of the revolt did such a painting help to build among British viewers?`,
  opts: [
    `A memory of the revolt as a story of British courage and rescue`,
    `A memory of the revolt as a rising of the Indian peasantry`,
    `A memory of the revolt as a failure of the British army`,
    `A memory of the revolt as a quarrel among Indian rulers`,
  ],
  sol: `The painting honours British commanders as rescuers. Such pictures made for a British audience shaped a memory centred on British heroism.`,
}));
Q('m_canning_cartoon', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `An imagined cartoon in a London magazine of 1857 shows a small figure named Canning being pushed aside by a crowd of angry soldiers and civilians. Which is the soundest inference?`,
  opts: [
    `British opinion was divided over how severely to punish rebels, and the cartoonist sided with those who wanted harsher measures`,
    `All British people wanted harsh punishment of the rebels`,
    `Canning was dismissed from his office in the same year`,
    `The cartoon is an accurate record of a real crowd`,
  ],
  sol: `Critics called for harshness and the cartoon belongs to that argument; a single cartoon reveals one side of a debate and one cartoonist's view, not the opinion of all, nor an event.`,
}));
Q('m_nationalist_why', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `A historian wants to test the claim that nationalist pictures of the Rani of Jhansi reflect the concerns of the time in which they were made more than the events of 1858. Which imagined finding would best support the claim?`,
  opts: [
    `Pictures of her appeared in the greatest numbers in years of nationalist campaigns, and each period stressed different qualities in her`,
    `Pictures of her were made on paper of the same size throughout the century`,
    `Every picture of her showed the same fort in the background`,
    `Pictures of her were first sold in the same town where she died`,
  ],
  sol: `The claim concerns the link between a picture and its own period. Only the first finding ties the pictures to changing concerns; the others are physical or local details that say nothing about that link.`,
}));
Q('m_naming', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `How should a student describe the labels mutiny and first war of independence for the events of 1857?`,
  opts: [
    `As two names that reflect different views of the events, which writers still debate`,
    `As two names for the same view, differing only in their words`,
    `As a correct name and a wrong name, settled by the evidence`,
    `As names that were both first used by the rebels in their proclamations`,
  ],
  sol: `Each label carries a view of what the events were. The disagreement is a debate about naming and interpretation, which the evidence alone does not settle.`,
}));
Q('m_label_fit', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `A historian says the word mutiny fits events only where soldiers rose against their officers. Which imagined finding about a district would most clearly show that the word does not describe all that happened there?`,
  opts: [
    `Records that peasants, artisans and zamindars took up arms and set up their own authority after the sepoys had gone`,
    `Records that a regiment disobeyed its orders`,
    `Records that sepoys seized the treasury`,
    `Records that some British officers were replaced`,
  ],
  sol: `The test is whether people other than soldiers acted on their own account. Only the first finding shows that. The others describe military action.`,
}));
Q('m_print_use', mcq({
  t: [4, 5], d: 3, c: 'application',
  stem: `An imagined print published in London in 1860 carries a caption saying that it shows a scene of 1857. Its artist, as his biography shows, never travelled to India. For which purpose is the print most useful to a historian?`,
  opts: [
    `Studying how British artists and buyers of 1860 imagined the revolt`,
    `Counting how many Indians took part at the scene`,
    `Establishing the exact layout of the place in 1857`,
    `Showing what the rebels themselves wished to say`,
  ],
  sol: `An artist who was not there cannot be a witness of the scene; but the print is solid evidence of what its makers and buyers in 1860 imagined and wished to see.`,
}));
Q('m_sources_fit', mcq({
  t: [4, 5], d: 1, c: 'understanding',
  stem: `A historian asks how British residents of a north Indian city felt as news of the revolt reached them. Which imagined source is most useful?`,
  opts: [
    `Private letters and diaries written by British residents at the time`,
    `A painting made twenty years later for an exhibition in London`,
    `A school textbook of the 1930s`,
    `A nationalist poster of the 1940s`,
  ],
  sol: `The question concerns feelings at a particular time, so evidence written then by those involved is best. Later images and books tell more about their own periods.`,
}));
Q('ar_print', ar({
  t: [4, 5], d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `A British print of 1858 that shows a towering figure of Justice above small figures of rebels cannot, by itself, show how widely Indians supported the revolt.`,
  r: `Such a print shows what its maker wished viewers to feel about the revolt.`,
  sol: `The print records its maker's intention and not the extent of Indian support, so R supplies the reason for the limit in A.`,
}));
Q('tf_images_photo', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: `True or false? Historians treat paintings and cartoons of 1857 as exact records of the events they show.`,
  sol: `Historians read them as representations made for particular audiences, which shaped memory, and not as photographs of events.`,
}));
Q('fb_savarkar', fb({
  t: 4, d: 1, c: 'recall',
  stem: `In 1909 V. D. ___ called the revolt of 1857 the first war of Indian ___.`,
  acc: [[`Savarkar`], [`independence`]],
  sol: `Savarkar's description gave the revolt a nationalist reading; independence is the word he used for its aim.`,
}));
Q('mt_images', match({
  t: 4, d: 1, c: 'recall',
  stem: `Match each image or group of images with what it showed or did.`,
  pairs: [
    [`Barker's painting of 1859`, `Showed Colin Campbell, James Outram and Henry Havelock at the relief of Lucknow`],
    [`Paton's In Memoriam (1858)`, `Was about English women and children in the revolt`],
    [`Cartoons in the London magazine Punch`, `Commented on Canning's call for moderation`],
    [`Nationalist pictures of the twentieth century`, `Celebrated the Rani of Jhansi and others as heroes`],
  ],
  sol: `The first two are British paintings, the third is a set of British cartoons, and the last belongs to nationalist memory.`,
}));
Q('ord_images', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: `Put these four events and works in the order in which they occurred, earliest first.`,
  items: [`Awadh is annexed`, `Sepoys rise at Meerut`, `Barker paints the relief of Lucknow`, `Savarkar calls the revolt the first war of Indian independence`],
  sol: `The annexation of 1856 came before the rising of 1857, the painting dates from 1859 and Savarkar's description from 1909.`,
}));
Q('s_canning', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `Two imagined London cartoons of 1857 are found. One shows Canning as a stern schoolmaster with a cane; the other shows him as a soft figure scolded by a crowd. What can a historian conclude from the pair about British opinion, and what can she not conclude without more evidence?`,
  model: `The pair suggests that **British opinion on how to treat rebels was argued over**, with cartoonists on different sides. Without more evidence she cannot say **which view was commoner**, since she would need figures for circulation and readers' letters, nor whether either cartoonist spoke for his readers.`,
  sol: `A debate is shown, but the weight of each side is not.`,
  scheme: [[`A reasoned conclusion: opinion was divided`, 1], [`A limit: which view was commoner is unknown`, 1]],
}));
Q('s_nationalist', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Two imagined posters of the 1930s both name the Rani of Jhansi. One shows her as a calm warrior on horseback; the other shows her as a grieving mother. What can a historian infer from the existence of both about how she was remembered, and why?`,
  model: `She was **remembered in more than one way**, so there was no single fixed picture. Different makers chose different qualities to admire, such as courage or sorrow, to suit **their own audiences and purposes**, so the posters tell us about the 1930s as much as about 1858.`,
  sol: `Varied memory and the makers' own purposes.`,
  scheme: [[`More than one memory of her`, 1], [`Makers' audiences and purposes explain the variety`, 1]],
}));
Q('s_print_diary', short({
  t: [4, 5], d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `A historian studying a siege has an imagined British painting of 1859 about it and a diary kept by a townsman during the siege. Explain how she can use the two together.`,
  model: `She can use the **diary** for what one witness noticed day by day, and the **painting** for how the British later wished the siege to be remembered. Where they differ she should ask who made each, for whom and why, and not assume that either gives the whole truth.`,
  sol: `Each source given its own use, and the method for a difference.`,
  scheme: [[`Each source used for what it can show`, 1], [`Method when they differ`, 1]],
}));
Q('s3_image_read', short({
  t: 4, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `An imagined print sold in London in 1858 shows an officer on horseback with a raised sword, women and children sheltering behind him, and a few small dark figures with weapons running away in the background. State what the print shows about its maker's view, for whom it was probably made, and one thing it cannot tell us.`,
  model: `The print shows the British as **protectors and avengers** and the rebels as small and threatening, so the maker's view favoured the British. It was probably made for **British buyers at home** who wanted reassurance and pride. It **cannot tell us** what actually happened at any place, or how Indians saw the events.`,
  sol: `The maker's view, the audience and a limit of the evidence.`,
  scheme: [[`The maker's view`, 1], [`The probable audience`, 1], [`One limit`, 1]],
}));
Q('s3_naming', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain why the labels mutiny and first war of independence are treated as a debate about naming, and mention one kind of evidence each side would stress.`,
  model: `Each label carries a **view of the events**. Mutiny stresses a **soldiers' revolt** against officers, the picture favoured in British accounts; first war of independence, used by Savarkar in 1909, stresses **wide participation and the aim of ending British rule**. The first side would stress the cartridge dispute and army discontent, the second the part of peasants, rulers and others.`,
  sol: `Two labels, two views and the evidence each would stress.`,
  scheme: [[`Labels reflect different views`, 1], [`Evidence for mutiny`, 1], [`Evidence for independence`, 1]],
}));
Q('l_images', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Two imagined pictures survive: a print of 1858 sold in London showing British soldiers rescuing women and children, and a poster of the 1930s showing the Rani of Jhansi as a heroine. Assess how far each can be used as evidence about the revolt of 1857.`,
  model: `1. **The print** was made soon after the events for British buyers, so it is good evidence of how the British wished to see the revolt, as rescue and justice.\n2. It is poor evidence of events, since rebels appear only as threats.\n3. **The poster** was made long after, for a nationalist audience, so it shows how later Indians remembered 1857 as a heroic struggle.\n4. It too cannot show what happened in 1858.\n5. **Judgement:** both are representations; each is strong evidence of the memory of its own time and weak evidence of the events, and diaries and official records are needed to test them.`,
  sol: `The print and the poster each weighed for memory and for events, and a joint judgement.`,
  scheme: [[`The print as evidence of British views`, 1], [`The print's limits for events`, 1], [`The poster as evidence of later memory`, 1], [`The poster's limits`, 1], [`A joint judgement`, 1]],
}));
Q('l_naming', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `The events of 1857 are better called a mutiny than a first war of independence. To what extent do you agree? Weigh evidence on both sides.`,
  model: `1. **For mutiny:** the revolt began among sepoys at Meerut after soldiers who refused the new cartridges were punished, and army discontent was central.\n2. **Against:** it spread to towns and villages, where civilians, including peasants, attacked moneylenders and others, and rulers and zamindars led.\n3. **For independence:** proclamations called Hindus and Muslims together to fight British rule, and Savarkar so named it in 1909.\n4. **Against:** aims differed from place to place, and the nationalist label was applied later.\n5. **Judgement:** neither label alone fits; the revolt began as a soldiers' rising but widened, and the names reflect the views of those who coined them.`,
  sol: `Evidence for and against each label and a balanced judgement.`,
  scheme: [[`Case for mutiny`, 1], [`Case against mutiny`, 1], [`Case for independence`, 1], [`Case against independence`, 1], [`A balanced judgement`, 1]],
}));

// ================================================================ t05 Sources: visual representations (source-based items)
Q('sb_report', source({
  t: [1, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined district officer's report, and answer the questions that follow. ${IMAG}`,
  passage: `**Report of a district officer on a cantonment town (imagined)**\n\nBefore dawn on the second day of the trouble, the sepoys of the cantonment took arms from the magazine and seized the treasury. They cut the telegraph wires and opened the jail, and a fire broke out in the records room. By noon the bazaar was full of townspeople and of villagers who had come in from the countryside, and the house of a moneylender in the main street was stripped. The sepoys had been uneasy for some weeks about the new cartridges and about talk that bone dust had been mixed into the flour sold in the market. I cannot say who gave the first order, but a sepoy messenger from another station was seen in the lines three days before.`,
  parts: [
    child('a', short({ t: [1, 5], d: 1, c: 'recall', marks: 1, stem: `At which town did sepoys first rise on 10 May 1857, an event that the sepoys of other stations soon heard of?`, model: `**Meerut.**`, sol: `The rising at Meerut was followed by the march to Delhi.`, scheme: [[`Meerut`, 1]] })),
    child('b', short({ t: [1, 5], d: 3, c: 'analysis', marks: 1, stem: `The officer notes that a sepoy messenger from another station was seen in the lines three days before. What might this suggest, and why can the officer not be sure?`, model: `It might suggest **contact between regiments**, but a **single sighting** does not prove that any plan was made.`, sol: `A possible link and the limit of one observation.`, scheme: [[`Possible contact between regiments, but one sighting proves nothing`, 1]] })),
    child('c', short({ t: [1, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Name one other kind of source that a historian would need to learn what the townspeople and villagers of this town wanted, and say what it would add.`, model: `**Petitions or village records** written by the townspeople and villagers themselves, which would show their own grievances, whereas the officer reports only what he saw and thought important.`, sol: `A source written from below and what it adds to an official's view.`, scheme: [[`A source from the townspeople or villagers named`, 1], [`What it adds`, 1]] }),
    [short({ t: [1, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): The officer was a British official writing to his superiors. Give two ways in which this may have shaped what he chose to report.`, model: `(1) He may have **stressed disorder and the crimes of the rebels** and played down any failure of the government. (2) He wrote **after the event, for superiors**, so he may have reported what protected his own position.`, sol: `Two effects of the writer's position on the report.`, scheme: [[`A way his position shaped the report`, 1], [`A second way`, 1]] })]),
  ],
}));
Q('sb_diary', source({
  t: [2, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined diary, and answer the questions that follow. ${IMAG}`,
  passage: `**From the diary of a clerk employed by a taluqdar of Awadh, written some months after the annexation (imagined)**\n\nThe court at Lucknow has been dissolved, and my master's fort and villages were taken from him in the settlement this year. The armed men of his household have been sent away. The headman of our nearest village tells me that the cultivators now pay almost as much to the new collectors as they once paid to my master's agents, and they ask when the old order will return. My cousin, a sepoy who comes from a village near here, writes that the men in his regiment speak of little else in their barracks.`,
  parts: [
    child('a', short({ t: [2, 5], d: 1, c: 'recall', marks: 1, stem: `Name the Governor-General who annexed Awadh in 1856.`, model: `**Lord Dalhousie.**`, sol: `He annexed Awadh on the ground of misgovernment.`, scheme: [[`Dalhousie`, 1]] })),
    child('b', short({ t: [2, 5], d: 3, c: 'analysis', marks: 1, stem: `Why should a historian take care in using this diary as evidence of what the peasants of the district felt?`, model: `The clerk **served a taluqdar** and so may share his master's interests, and he reports the headman's words **second hand**, so the peasants' own views are not directly known.`, sol: `The writer's position and the second-hand report.`, scheme: [[`The writer's interest and the second-hand report`, 1]] })),
    child('c', short({ t: [2, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Suggest two other kinds of evidence that would help test whether the peasants of this district shared the taluqdar's grievances.`, model: `(1) **Petitions or statements by the peasants** themselves, which would show their own complaints. (2) **Revenue records** from before and after the settlement, which would show whether their burden had changed.`, sol: `Two kinds of evidence that bear on the peasants' own grievance.`, scheme: [[`Evidence from the peasants themselves`, 1], [`Revenue records`, 1]] }),
    [short({ t: [2, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Suppose a later British report says that the peasants of this district were forced by the taluqdar to join the revolt. Give two reasons why a historian would not accept this without checking, using the diary.`, model: `(1) The diary records that the **cultivators themselves asked when the old order would return**, which hints at a wish of their own. (2) A British report was written by those **on the other side**, who may have wished to blame the taluqdars rather than admit peasants' grievances.`, sol: `A reason from the diary and a reason from the position of the British writer.`, scheme: [[`A reason drawn from the diary`, 1], [`A reason from the British writer's position`, 1]] })]),
  ],
}));
Q('sb_proclaim', source({
  t: [3, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of what a kind of record contains, and answer the questions that follow. ${SUM}`,
  passage: `**What a proclamation of the revolt of 1857 contained (summary)**\n\nProclamations were put out in the name of rebel authorities during the months of the revolt, and some were issued in the name of the Mughal emperor in Delhi. A proclamation of the kind issued at Azamgarh in August 1857 spoke in turn to zamindars, merchants, artisans, officials and religious leaders, and told each group that British rule had damaged its interests. It called on Hindus and Muslims to unite in the fight. Such notices were addressed to the public at large.`,
  parts: [
    child('a', short({ t: [3, 5], d: 1, c: 'recall', marks: 1, stem: `Name the Mughal emperor in whose name some proclamations of the revolt were issued.`, model: `**Bahadur Shah Zafar.**`, sol: `He accepted the leadership of the rebels at Delhi.`, scheme: [[`Bahadur Shah Zafar`, 1]] })),
    child('b', short({ t: [3, 5], d: 3, c: 'analysis', marks: 1, stem: `A proclamation can state a call without showing that people answered it. What kind of evidence would show that Hindus and Muslims did act together?`, model: `Records of **rebel forces or administrations** in which people of both faiths fought and served together, without recorded conflict between them.`, sol: `Evidence of joint action, which a proclamation alone cannot give.`, scheme: [[`Records of joint action`, 1]] })),
    child('c', short({ t: [3, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Give two reasons why historians cannot treat such a proclamation as a record of what every rebel wanted.`, model: `(1) It states the **aims and hopes of its authors**, who spoke to many groups at once. (2) Rebels in different places had **local grievances**, such as those against moneylenders, which a general notice would not record.`, sol: `The authors' purpose and the variety of local aims.`, scheme: [[`It records its authors' aims`, 1], [`Local aims varied`, 1]] }),
    [short({ t: [3, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Explain how a proclamation addressed to many groups can help a historian understand how the rebels hoped to build support, and state one question about its limits.`, model: `By speaking to each group and naming how **British rule had hurt it**, the proclamation shows the rebels trying to **unite varied interests** against a common ruler. A question about its limits: **did people actually respond** in the ways it hoped?`, sol: `The strategy of building support and a question on its limits.`, scheme: [[`How it shows the hope of building support`, 1], [`A question about its limits`, 1]] })]),
  ],
}));
Q('sb_print', source({
  t: [4, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined picture described by SOYL, and answer the questions that follow. ${PIC}`,
  passage: `**An imagined print sold in London in 1858 (described by SOYL)**\n\nThe print is large and coloured. In the centre stands a tall British officer on a horse, his sword raised. Behind him crowd women and children, looking up at him with relief. In the foreground a few Indian figures with weapons are drawn small and in dark colours, turning to flee. Above the officer a calm female figure holding a pair of scales hovers in the sky. The print was sold by a London shop for a few shillings and hung in many homes.`,
  parts: [
    child('a', short({ t: [4, 5], d: 1, c: 'recall', marks: 1, stem: `Name one real British painting of 1858 or 1859 about the revolt, with its painter.`, model: `**In Memoriam** by Joseph Noel Paton (1858), or **the relief of Lucknow** by Thomas Jones Barker (1859).`, sol: `Either painting is accepted.`, scheme: [[`A painting with its painter`, 1]] })),
    child('b', short({ t: [4, 5], d: 3, c: 'analysis', marks: 1, stem: `The print was sold cheaply by a London shop. What does this suggest about its audience and about the memory of the revolt?`, model: `It reached **many ordinary British people** at home, so it helped spread a **one-sided memory** of the revolt as British rescue and justice.`, sol: `A wide audience and the effect on memory.`, scheme: [[`A wide British audience and a one-sided memory`, 1]] })),
    child('c', short({ t: [4, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Name two things the print can tell a historian about Britain in 1858, and one thing it cannot tell about India in 1857.`, model: `It can tell her **what British makers chose to show** (rescue, justice) and **what buyers were willing to hang at home**. It cannot tell her **what actually happened** at any place in India, or how Indians saw it.`, sol: `Two uses for British attitudes and a limit for events in India.`, scheme: [[`Two things about Britain in 1858`, 1], [`One limit for India in 1857`, 1]] }),
    [short({ t: [4, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Suppose another print of 1858 shows the same scene with the rebels drawn large and the officer small. Explain what kind of maker, audience or purpose might lie behind such a different picture.`, model: `Such a print might come from a **maker who wished to criticise the way the revolt was handled** or to stress the **danger the rebels posed**, for an audience with that view. It would show that **British opinion was not uniform**, though still a view from outside India.`, sol: `A different purpose or audience that explains a different picture.`, scheme: [[`A different maker, audience or purpose suggested`, 1], [`What this shows about British opinion`, 1]] })]),
  ],
}));
Q('sb_poster', source({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined picture described by SOYL, and answer the questions that follow. ${PIC}`,
  passage: `**An imagined poster printed in the 1930s (described by SOYL)**\n\nA cheap coloured poster shows a woman on a horse with a sword in her hand and a calm face, in bright colours, with a fort behind her. It is headed with a single word in a local language that means brave. It was printed in thousands and sold at fairs. The poster names her as the Rani of Jhansi.`,
  parts: [
    child('a', short({ t: [4, 5], d: 1, c: 'recall', marks: 1, stem: `In which year did the Rani of Jhansi die fighting?`, model: `**1858** (June).`, sol: `She died fighting in June 1858.`, scheme: [[`1858`, 1]] })),
    child('b', short({ t: [4, 5], d: 3, c: 'analysis', marks: 1, stem: `What does the printing of the poster in thousands for sale at fairs suggest about its audience and purpose?`, model: `It was meant for a **wide public of ordinary people**, to spread a memory of the Rani as a **hero**.`, sol: `A mass audience and the purpose of spreading a heroic memory.`, scheme: [[`A wide public and a heroic memory`, 1]] })),
    child('c', short({ t: [4, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Name two things the poster can tell a historian about the 1930s, and one thing it cannot show about 1858.`, model: `It can show that the Rani was **admired as a hero** in the 1930s and that such pictures were made **cheaply for a wide public**. It cannot show **what she actually did** in 1858.`, sol: `Two uses for the period of the poster and a limit for 1858.`, scheme: [[`Two things about the 1930s`, 1], [`One limit for 1858`, 1]] }),
    [short({ t: [4, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Explain how a poster made for sale at fairs in the 1930s and a print made for sale in London in 1858 would differ in the way they treat people who fought British rule, and why.`, model: `The **poster** would honour such people as heroes, for viewers who admired them; the **London print** would more likely show them as a threat beaten by British courage, for viewers who identified with the British. The **audiences and purposes** differ.`, sol: `The two treatments and the reason in audience and purpose.`, scheme: [[`The two treatments contrasted`, 1], [`The reason in audience and purpose`, 1]] })]),
  ],
}));
