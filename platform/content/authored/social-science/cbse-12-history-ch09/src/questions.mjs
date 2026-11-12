// CBSE 12 History, ch09 Colonialism and the Countryside: Exploring Official Archives, question bank. Every source
// passage is an imagined document (a Collector's letter, a surveyor's journal, a ryot's statement) or a SOYL summary of
// what a kind of official report contains, written in SOYL's own words and labelled as such. Nothing from the Fifth
// Report, Francis Buchanan's journals, the Deccan Riots Commission report or any other document is quoted, translated
// or closely paraphrased; no NCERT text, source box, table, caption, map or exercise and no board or sample-paper item
// is reused (D-036). All numbers in data items are imagined. The Paharias and Santhals are described respectfully from
// the evidence of their ways of life, and officials' views of them are presented as the officials' views; violence is
// described briefly and factually. Places are named in words only: no map work (OA-23).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// ================================================================ t01 Bengal and the Permanent Settlement
Q('m_ps_who', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `Who introduced the Permanent Settlement in Bengal, and in which year?`,
  opts: [`Lord Cornwallis, in 1793`, `Warren Hastings, in 1772`, `Lord Wellesley, in 1798`, `Lord Dalhousie, in 1856`],
  sol: `Cornwallis was Governor-General when the revenue demand was fixed for ever. The other pairs name different officials and years.`,
}));
Q('m_ps_aim_not', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which of these was NOT among the aims with which the Company introduced the Permanent Settlement?`,
  opts: [
    `To raise the revenue demand each year as the price of grain rose`,
    `To secure a regular flow of revenue`,
    `To encourage landholders to invest in agriculture`,
    `To create a class of landholders loyal to the Company`,
  ],
  sol: `A demand fixed in perpetuity could not be raised with prices; that is the opposite of the plan. The other three were stated aims.`,
}));
Q('m_ps_weaken', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Some historians say that the low prices of agricultural produce in the 1790s helped to push zamindars into default. Which finding about an imagined district would most weaken this explanation for that district?`,
  opts: [
    `Records showing that produce prices there stayed high throughout the 1790s, yet its estates were auctioned as often as estates elsewhere`,
    `Records showing that prices there fell sharply in the early 1790s and that auctions rose soon after`,
    `A zamindar's petition saying that low prices made it hard to find the sum due`,
    `Records showing that ryots paid less rent in the years when prices were low`,
  ],
  sol: `To weaken a cause, look for the effect appearing without it. The other findings fit the explanation or support it.`,
}));
Q('m_date_clue', mcq({
  t: 1, d: 3, c: 'application',
  stem: `An imagined, undated letter from a district Collector says that zamindars of his district are asking to have their estates entered in the names of women of their families, reports that a large part of the Burdwan raj's estates has been sold at auction, and calls the revenue arrangement a recent measure. Which dating is soundest?`,
  opts: [
    `Not before 1797, and probably within a few years of it, since the arrangement is called recent`,
    `Before 1793, since zamindars were already anxious about the revenue`,
    `About 1857, since auctions of estates were common then`,
    `It cannot be dated, since the letter gives no year`,
  ],
  sol: `The auction of Burdwan lands sets an earliest date, and the word recent narrows the range. A letter can often be dated from what it reports even when it gives no year.`,
}));
Q('m_benami_evidence', mcq({
  t: 1, d: 3, c: 'application',
  stem: `An imagined auction record shows that an estate was bought by a man named Ramtanu, who paid the full price within a week and has no earlier record of owning land. Which further record would best show whether the sale was benami, that is, made in a false name on behalf of the former zamindar?`,
  opts: [
    `Rent receipts after the sale showing that the estate's villages still paid the former zamindar's treasurer`,
    `The revenue demand fixed on the district for the year of the sale`,
    `A list of the other estates sold in the same district that year`,
    `A record of the price of rice in the district in the year of the sale`,
  ],
  sol: `A benami buyer holds the estate in name only, so the test is whether the real control and income stayed with the old owner. The other records do not bear on who controlled the estate.`,
}));
Q('m_jot_weaken', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Historians say that jotedars were often more powerful in north Bengal villages than the zamindars. Which finding about an imagined village would most weaken this claim for that village?`,
  opts: [
    `Records showing that the zamindar's agents controlled the village's grain trade and lending, and that the jotedar paid whatever rent they fixed each year`,
    `Records showing a jotedar with hundreds of acres cultivated by sharecroppers`,
    `A record of a jotedar refusing to pay rent to the zamindar's agents`,
    `A record of villagers borrowing grain from a jotedar`,
  ],
  sol: `The claim concerns who held power in the village. Only the first finding shows the zamindar's side in command; the others describe the jotedar's strength.`,
}));
Q('m_ps_data', mcq({
  t: 1, d: 3, c: 'application',
  stem: `An imagined zamindar must pay a fixed 600 rupees a year, whatever the harvest. From his ryots he collects 720, 610, 480 and 650 rupees in four successive years. Which statement follows from these figures?`,
  opts: [
    `His four-year collections exceeded the demand by 60 rupees, but in the third year he was 120 rupees short, so one bad year could still endanger the estate`,
    `He was never at risk, because his four-year total was above the total demand`,
    `He was short of the demand in two of the four years`,
    `His shortfall in the third year was 60 rupees, the same as his surplus over the four years`,
  ],
  sol: `The four years bring in 2,460 rupees against a demand of 2,400, a surplus of 60. In the third year 480 falls 120 below 600. Payment was due in each year, so a surplus elsewhere could not cover it.`,
}));
Q('mt_ps_terms', match({
  t: 1, d: 1, c: 'recall',
  stem: `Match each term from the countryside of Bengal in the 1790s with the correct description.`,
  pairs: [
    [`Taluqdar`, `A landholder who, like a raja, was recognised as a zamindar`],
    [`Lathyal`, `A strongman kept to frighten off outside buyers of an estate`],
    [`Benami sale`, `A sale in a false name, often arranged by the zamindar himself`],
    [`Sunset law`, `A rule that payment must reach the Company before sunset on the due date`],
  ],
  sol: `Each term names one feature of the revenue system of the period or of the zamindars' answers to it.`,
}));
Q('fb_adhiyar', fb({
  t: 1, d: 1, c: 'recall',
  stem: `A sharecropper who cultivated a jotedar's land was called an ___ or bargadar.`,
  acc: [[`adhiyar`, `adhiar`, `adhiyars`]],
  sol: `The sharecroppers of jotedars were adhiyars or bargadars.`,
}));
Q('ar_sunset', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `A zamindar could lose his estate even in a year when his ryots had paid most of their rent.`,
  r: `The revenue had to reach the Company before sunset on the due date, or the estate could be put up for auction.`,
  sol: `A small shortfall on the day was enough to risk the estate, whatever had been collected earlier.`,
}));
Q('ar_women_est', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `Some zamindars entered their estates in the names of women of their families to escape auction.`,
  r: `The Company did not take over the property of women.`,
  sol: `Property in a woman's name was beyond the Company's reach, which is why the device worked.`,
}));
Q('ar_curtail', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `After 1793 the Company disbanded the zamindars' troops, abolished their customs duties and placed their courts under a Collector.`,
  r: `The Company fixed the revenue demand in perpetuity.`,
  sol: `Both statements are accurate, but the permanence of the demand does not account for these steps. They concern control over the zamindars' military, customs and judicial powers, a different matter from the size of the demand.`,
}));
Q('tf_perpetuity', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: `True or false? Because the revenue demand of the Permanent Settlement was fixed in perpetuity, the Company lowered it in years of poor harvest.`,
  sol: `The demand did not change with the harvest, which is exactly what made bad years dangerous for zamindars.`,
}));
Q('s_curtail', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `State two ways in which the Company cut down the powers of zamindars after the Permanent Settlement.`,
  model: `The Company **disbanded the zamindars' troops** and **abolished the customs duties** they had collected. Their **courts were placed under a Collector**, so they could no longer act as rulers of their estates; they were treated as landholders who owed the Company revenue.`,
  sol: `Two of the three curbs named, with their effect.`,
  scheme: [[`First curb on powers`, 1], [`Second curb on powers`, 1]],
}));
Q('s_default_alt', short({
  t: 1, d: 4, c: 'analysis', marks: 2, wl: S2,
  stem: `In one imagined district 40 of 100 estates were auctioned between 1793 and 1805; in a neighbouring district with the same revenue demand per acre only 10 of 100 were. Suggest two explanations, other than carelessness, for the difference.`,
  model: `(1) **Harvests or prices** may have been worse in the first district, so rents fell short while the demand stayed fixed. (2) Zamindars of the second may have used **benami sales or women's names** to keep estates, so fewer auctions appear in the records.`,
  sol: `Two rival explanations, one from conditions and one from evasion.`,
  scheme: [[`An explanation from harvests or prices`, 1], [`An explanation from evasion of auctions`, 1]],
}));
Q('s_jot_base', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Give two reasons why jotedars of north Bengal were often more powerful in the villages than the zamindars.`,
  model: `Jotedars **lived in the villages** and held large areas, sometimes thousands of acres, while the zamindar's base lay in the towns. They also **controlled local trade and moneylending**, and sharecroppers worked their land, so villagers depended on them.`,
  sol: `Residence and landholding, then control of trade and credit.`,
  scheme: [[`Lived in villages with large holdings, unlike the town-based zamindar`, 1], [`Control of trade and moneylending, with sharecroppers`, 1]],
}));
Q('s_ryot_default', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `In an imagined year the harvest fails on an estate and its ryots pay only half their rent, but the zamindar's revenue is due on a fixed date. Name two courses open to him and one risk of each.`,
  model: `(1) He could **borrow** to pay on time; the risk is a **debt** he cannot repay after another poor year. (2) He could **enter the estate in a woman's name** or use a benami buyer to protect it; the risk is that the Collector may see through the device.`,
  sol: `Two practical courses taken from the period, each with its risk.`,
  scheme: [[`A course with its risk`, 1], [`A second course with its risk`, 1]],
}));
Q('s3_ps_problems', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain three reasons why many zamindars found it hard to pay the revenue fixed under the Permanent Settlement.`,
  model: `(1) The demand was set at a **very high level**. (2) **Prices of produce were low** in the 1790s, so rents from ryots bought little. (3) The sum was **invariable**, the same in good and bad harvests, and had to reach the Company by sunset on the due date. Ryots' own defaults made rents harder to collect.`,
  sol: `Three causes of default drawn from the terms of the settlement and the conditions of the 1790s.`,
  scheme: [[`A very high demand`, 1], [`Low prices`, 1], [`Invariable sum with a strict date`, 1]],
}));
Q('s3_ps_compare', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `In an imagined year of failed harvest in north Bengal, a zamindar based in a town and a jotedar living in a village both lose income. Give three reasons why the jotedar was probably better placed to cope.`,
  model: `(1) The zamindar owed a **fixed revenue** by a fixed date whatever the harvest, so he risked auction. (2) The jotedar **controlled local trade and moneylending**, so he could buy grain and lend to needy villagers. (3) He **lived in the village** and had sharecroppers on his land, while the zamindar's base lay in the town. These are likely advantages, not certainties.`,
  sol: `Three advantages of the jotedar, each set against the zamindar's position.`,
  scheme: [[`The zamindar's fixed obligation`, 1], [`The jotedar's trade and credit`, 1], [`Presence in the village and sharecroppers`, 1]],
}));
Q('l_ps_describe', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the Permanent Settlement of 1793 and explain why it brought difficulties for many zamindars.`,
  model: `1. **Introduction:** Lord Cornwallis, the Governor-General, introduced it in Bengal in 1793; the revenue demand was fixed in perpetuity.\n2. **Zamindars:** the Company recognised rajas and taluqdars as zamindars, owners of the land and responsible for paying the revenue.\n3. **Aims:** a regular revenue, investment in agriculture and a class of loyal landholders.\n4. **Limits on power:** troops were disbanded, customs abolished and courts placed under a Collector.\n5. **Difficulties:** the demand was high, prices were low in the 1790s, the sum did not change with harvests and payment was due by sunset; many defaulted and estates, such as much of Burdwan's in 1797, were auctioned.`,
  sol: `The settlement and its terms, the aims, the curbs on power and the causes of default.`,
  scheme: [[`Introduction in 1793 and the fixed demand`, 1], [`Zamindars recognised as owners paying revenue`, 1], [`Aims`, 1], [`Limits on power`, 1], [`Difficulties leading to auctions`, 1]],
}));
Q('l_ps_assess', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `An imagined historian says that the Permanent Settlement failed in its own aims. Assess this claim, using the aims, the difficulties of the zamindars and the position of the jotedars.`,
  model: `1. **Aims:** a regular revenue, investment in agriculture and a class of loyal landholders.\n2. **For the claim:** a high demand, low prices and the sunset rule led to defaults and auctions, so the Company's chosen landholders were often removed.\n3. **Against:** zamindars used benami sales, women's names and lathyals to keep estates, so auctions did not always change who held them.\n4. **Jotedars:** rich peasants held real power in villages and often resisted zamindars.\n5. **Judgement:** a fixed demand did give the Company a predictable sum, so the first aim was partly met; but the loyal class was shaky and nothing above shows investment. So failed is too strong; only partly achieved is safer.`,
  sol: `The aims set against evidence on both sides, then a measured verdict.`,
  scheme: [[`The aims stated`, 1], [`Evidence that supports the claim`, 1], [`Evidence that qualifies it`, 1], [`The jotedars' position`, 1], [`A reasoned judgement`, 1]],
}));
Q('sb_collector', source({
  t: [1, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined Collector's letter, and answer the questions that follow. ${IMAG}`,
  passage: `**A Collector's letter to the Board of Revenue (imagined)**\n\nIn the last two years nine of the twenty-four estates in my district have been sold at auction for arrears of revenue, which was fixed for all time some years ago. Five of the nine were bought by men who, I believe, act for the families that held them before. The old families are still seen at the estate offices. The zamindars tell me that rents are hard to collect, as the harvests have been poor and grain sells cheaply, and that the day for payment allows no delay. I have not examined the rent registers of the villages.`,
  parts: [
    child('a', short({ t: [1, 4], d: 1, c: 'recall', marks: 1, stem: `Name the Governor-General who introduced the arrangement under which the revenue was fixed for all time.`, model: `**Lord Cornwallis**, in 1793.`, sol: `He introduced the Permanent Settlement in Bengal.`, scheme: [[`Cornwallis`, 1]] })),
    child('b', short({ t: [1, 4], d: 3, c: 'analysis', marks: 1, stem: `The Collector says that the old families are still seen at the estate offices. What does this suggest about the effect of the auctions?`, model: `The auctions did **not always remove the old holders**: families may have kept control through agents.`, sol: `Read the continued presence of old families as a sign of the limit of the sales.`, scheme: [[`Old families kept control despite the sales`, 1]] })),
    child('c', short({ t: [1, 4], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Work out the share of the district's estates that were sold, and the share of the sold estates that were bought by suspected agents. Then say why the word believe limits the second figure.`, model: `Nine of twenty-four is **37.5 per cent** (a little over a third); five of nine is about **56 per cent**. The Collector only says he **believes** this, so he offers no proof that the buyers acted for the old owners.`, sol: `Two shares computed, with the limit set by the Collector's own wording.`, scheme: [[`Both shares worked out correctly`, 1], [`The limit of a belief without proof`, 1]] }),
    [short({ t: [1, 4], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): The Collector has not examined the rent registers. Name two further records that would help a historian decide whether the auctions came from the high demand or from the zamindars' own neglect.`, model: `(1) **Rent registers** showing what ryots paid and when. (2) **Harvest and price records** for the same years, which would show whether poor crops and low prices made payment hard.`, sol: `Two records that test the two rival explanations.`, scheme: [[`Rent registers`, 1], [`Harvest and price records`, 1]] })]),
  ],
}));
Q('sb_fifth', source({
  t: [1, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of what a famous official report contains, and answer the questions that follow. ${SUM}`,
  passage: `**What the Fifth Report contains (summary)**\n\nThe Fifth Report was printed in 1813 as the fifth in a series of reports on the Company's affairs in India. It runs to about a thousand pages, of which more than eight hundred are appendices holding petitions from zamindars and ryots, reports of district collectors and tables of revenue figures. Those who prepared the series were critical of how the Company had governed.`,
  parts: [
    child('a', short({ t: [1, 4], d: 1, c: 'recall', marks: 1, stem: `Name the body to which the Fifth Report was submitted.`, model: `The **British Parliament**.`, sol: `The series of reports on the Company's affairs went to Parliament.`, scheme: [[`The British Parliament`, 1]] })),
    child('b', short({ t: [1, 4], d: 3, c: 'analysis', marks: 1, stem: `Most of the appendices are petitions and collectors' reports. What does this suggest about whose voices the Report passes on?`, model: `Chiefly those of **people who wrote to the Company**, chosen by the compilers; others may be missing.`, sol: `Link the kinds of document to the groups they represent and the compilers' choice.`, scheme: [[`Voices of writers to the Company, as selected by the compilers`, 1]] })),
    child('c', short({ t: [1, 4], d: 3, c: 'application', marks: 2, stem: `**Either** (i): A historian wants to study how the settlement affected the zamindars of one district. Name two kinds of evidence from outside the Report that she should consult, and what each would check.`, model: `(1) **District rent and revenue registers**, to check how many estates were sold and when. (2) **Family papers or petitions of the zamindars themselves**, to check how they explained their losses.`, sol: `Two outside records with the question each can settle.`, scheme: [[`District registers and what they check`, 1], [`Family papers or petitions and what they check`, 1]] }),
    [short({ t: [1, 4], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): A historian finds a collector's register for one district showing that few estates were auctioned there. Give two ways in which she could reconcile this with a picture of widespread ruin in the Report.`, model: `(1) The Report may have **generalised** from districts where sales were common. (2) The register may **hide benami or women-named holdings**, so the old families still held estates in fact; either way she should test both with further records.`, sol: `Two ways the two pictures could both be right in part.`, scheme: [[`The Report generalised from some districts`, 1], [`Devices hide the real holders in the register`, 1]] })]),
  ],
}));

// ================================================================ t02 The Paharias and the Santhals
Q('m_rajmahal', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Company records of the late eighteenth century describe the Paharias as living around which hills?`,
  opts: [`The Rajmahal hills`, `The Aravalli hills`, `The Nilgiri hills`, `The Vindhya hills`],
  sol: `The Rajmahal hills lie in present-day Jharkhand; the others are far from the region of these records.`,
}));
Q('m_paharia_raid', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Company officials called the Paharias' raids on plains villages plunder. A historian suggests that the raids were also a way of claiming a share of the plains produce and asserting control. Which finding about an imagined Paharia group would most strengthen her suggestion?`,
  opts: [
    `Records that raids on a plains village stopped once its cultivators began to hand over a regular share of their grain to the hill chief`,
    `A list of goods carried off in a raid, with no mention of any earlier arrangement`,
    `A report that the same group also hunted and gathered forest produce`,
    `An officer's report that the raiders were armed with bows`,
  ],
  sol: `Her suggestion is that raids were a claim to a share. A claim is met when the share is paid, so the raids ending after regular payment supports it; the other findings say nothing about a claim.`,
}));
Q('m_cleveland_weaken', mcq({
  t: 2, d: 2, c: 'analysis',
  stem: `In the 1780s the Collector Augustus Cleveland paid annual allowances to Paharia chiefs so that they would keep their men in good conduct. Which finding about the years that followed would most weaken the view that the allowances kept the peace?`,
  opts: [
    `Records showing that groups whose chiefs received allowances raided plains villages as often as before`,
    `Records showing that chiefs received their allowances each year`,
    `Records showing that some groups withdrew deeper into the hills`,
    `Records showing that some chiefs lost standing among their own people`,
  ],
  sol: `The view is that allowances reduced raiding. Raids continuing at the old rate where allowances were paid is the finding that breaks the link; the others leave it standing.`,
}));
Q('m_buchanan_response', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A student writes that Francis Buchanan's journals of 1810–11 prove that Paharia shifting cultivation was wasteful. What is the soundest response?`,
  opts: [
    `The journals show how a physician working for the Company judged the land, as resources to be developed, so the claim must be checked against evidence of how the Paharias used it`,
    `The claim is sound, since Buchanan toured the region himself`,
    `The journals can be ignored, since a physician knew nothing of farming`,
    `The claim is sound, since official journals are neutral`,
  ],
  sol: `A journal is evidence of its writer's view, and this writer's view was shaped by the Company's interest. It is neither proof nor worthless.`,
}));
Q('m_santhal_date', mcq({
  t: 2, d: 2, c: 'application',
  stem: `An imagined, undated letter from a district officer says that Santhal villages have multiplied inside the area marked out for them, that moneylenders are pressing them hard, that two brothers named Sidhu and Kanhu are said to be moving from village to village, and that no uprising has yet begun. Which dating is soundest?`,
  opts: [
    `After 1832 and before the rising of 1855, probably in the years just before it`,
    `Before 1832, since moneylenders troubled Santhals only before their area was marked out`,
    `After 1856, since Sidhu and Kanhu appear in the letter`,
    `In 1856, since that is when the Santhal Pargana was created`,
  ],
  sol: `The marked-out area gives an earliest date, and the absence of an uprising gives a latest one. The two names fit the years just before the hul.`,
}));
Q('m_group_table', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: `An imagined official table gives the percentage of the income of two groups in a hill district. Group X: 60 from forest produce and hunting, 30 from hoe cultivation on burnt patches, 10 from ploughed fields. Group Y: 5, 5 and 90. Which description fits best?`,
  opts: [
    `X is more like the Paharias and Y more like the Santhal settlers, since forest produce and shifting cultivation dominate X and ploughed fields dominate Y`,
    `X is more like the Santhal settlers and Y more like the Paharias`,
    `Both are like the Paharias, since both have some income from forest produce`,
    `Neither can be placed, since a table cannot show a way of life`,
  ],
  sol: `Match each row of figures against the criteria for the two ways of life; the largest share of each group's income decides.`,
}));
Q('m_santhal_pargana', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Which arrangement was made for the Santhals after the rising of 1855–56 was suppressed?`,
  opts: [
    `The Santhal Pargana was created in 1856, with special laws meant to conciliate them`,
    `The Damin-i-Koh was marked out for them`,
    `Annual allowances were paid to their chiefs`,
    `Their land was brought under the ryotwari system`,
  ],
  sol: `The Damin-i-Koh came in 1832 and the allowances belong to the Paharias; the new district followed the rising.`,
}));
Q('ar_pargana', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: `The Santhal rising of 1855–56 was suppressed by the Company.`,
  r: `A new district, the Santhal Pargana, was created in 1856 with special laws meant to conciliate the Santhals.`,
  sol: `Both statements are accurate, but the new district was a later step taken in the aftermath; it does not account for how or why the rising was suppressed.`,
}));
Q('ar_paharia_push', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `As Santhal settlements expanded, the Paharias were pushed deeper into the hills.`,
  r: `The Santhals cleared forest for settled cultivation on land where the Paharias had hunted and sown their burnt patches.`,
  sol: `Clearing took over the very land the Paharias lived from, which is why they retreated.`,
}));
Q('tf_santhal_life', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: `True or false? The Santhals who came into the Rajmahal region from about the 1780s lived mainly by hunting and shifting cultivation, like the Paharias.`,
  sol: `The Santhals came as settled cultivators who cleared forest, with the Company's encouragement, and ploughed fields.`,
}));
Q('fb_damin', fb({
  t: 2, d: 1, c: 'recall',
  stem: `In 1832 a large area was marked out as the ___, declared to be the land of the Santhals.`,
  acc: [[`Damin-i-Koh`, `Damin i Koh`, `Damin-i-koh`, `Damin`]],
  sol: `The area was the Damin-i-Koh.`,
}));
Q('mt_hills', match({
  t: 2, d: 1, c: 'recall',
  stem: `Match each name or term with the correct description.`,
  pairs: [
    [`Augustus Cleveland`, `Collector of Bhagalpur who gave allowances to Paharia chiefs`],
    [`Francis Buchanan`, `Physician who toured the region for the Company in 1810–11 and kept journals`],
    [`Sidhu and Kanhu`, `Leaders of the Santhal rising of 1855–56`],
    [`Dikus`, `Outsiders such as moneylenders, as the Santhals called them`],
  ],
  sol: `Each name belongs to one episode of the history of the Rajmahal region.`,
}));
Q('ord_hills', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: `Arrange these events of the Rajmahal region in chronological order, earliest first.`,
  items: [`Cleveland's policy of paying allowances to Paharia chiefs`, `Buchanan tours the region for the Company`, `The Damin-i-Koh is marked out for the Santhals`, `The Santhal Pargana is created`],
  sol: `They fall in the 1780s, in 1810 and 1811, in 1832 and in 1856.`,
}));
Q('s_paharia_life', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Describe two features of the Paharias' way of life as Company records show it.`,
  model: `The Paharias lived by **hunting and gathering forest produce** such as mahua flowers, silk cocoons and resin, and by **shifting cultivation**: they cleared patches by burning and sowed pulses and millets with a hoe. The forest was central to their identity.`,
  sol: `Forest produce and hunting, and shifting cultivation described.`,
  scheme: [[`Hunting and gathering forest produce`, 1], [`Shifting cultivation described`, 1]],
}));
Q('s_two_views', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `An imagined Company officer writes that shifting cultivation is wasteful because land is left idle after a few seasons. Give one reason the Paharias might have had for the practice and say what evidence could test the officer's claim.`,
  model: `A patch cleared by burning could be sown for a few seasons and then **left while the forest grew back**, and the forest still gave other produce, so it was not simply idle. **Paharia accounts, and records of how soon patches were sown again and what they yielded,** could test the claim.`,
  sol: `A reason from the Paharias' own point of view and evidence that bears on the officer's claim.`,
  scheme: [[`A reason from the Paharias' practice`, 1], [`Evidence that could test the claim`, 1]],
}));
Q('s3_santhal_grievances', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain three grievances that led the Santhals to rise in the hul of 1855–56.`,
  model: `(1) The state taxed the land they had cleared **heavily**. (2) **Moneylenders**, whom the Santhals called dikus, charged high interest and took their land when they could not repay. (3) **Zamindars** claimed control over the Damin area. Sidhu and Kanhu Murmu led the rising, which was suppressed.`,
  sol: `Taxation, moneylenders and zamindars, three pressures on the Santhal settlers.`,
  scheme: [[`Heavy taxation of cleared land`, 1], [`Moneylenders' interest and seizure of land`, 1], [`Zamindars' claims over the Damin area`, 1]],
}));
Q('l_compare', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `The Paharias and the Santhals both lived in the Rajmahal region. Compare them in their way of living and in their dealings with the Company, and say what the contrast suggests about how the Company judged settled and hill peoples.`,
  model: `1. **Livelihood:** the Paharias hunted, gathered forest produce and practised shifting cultivation; the Santhals cleared forest and settled to cultivate.\n2. **Company policy:** the Company tried to crush the Paharias in the 1770s, then Cleveland paid chiefs allowances; the Santhals were encouraged to clear land and given the Damin-i-Koh in 1832.\n3. **Outcomes:** the Paharias withdrew deeper into the hills; the Santhals spread but faced heavy tax, moneylenders and zamindars, and rose in the hul.\n4. **Contrast:** the Company favoured settled revenue-paying cultivators and distrusted forest peoples, but this did not shield the Santhals.\n5. **Caution:** our evidence is largely official.`,
  sol: `Comparison on three criteria, the contrast drawn and the limit of the evidence.`,
  scheme: [[`Livelihoods compared`, 1], [`Company policy compared`, 1], [`Outcomes compared`, 1], [`What the contrast suggests`, 1], [`The official origin of the evidence`, 1]],
}));
Q('sb_journal', source({
  t: [2, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined surveyor's journal, and answer the questions that follow. ${IMAG}`,
  passage: `**A Company surveyor's journal (imagined)**\n\nThird day of the dry season. We climbed to a hill settlement above the river. The people live in small huts and gather honey, resin and silk cocoons from the forest; they burn patches on the slopes, sow millets and pulses with a hoe, and leave the plots after a few seasons. They received us warily and did not wish to show their stores. The slope is steep and the soil thin, but I judge that a plough could bring it into regular revenue if the hill men were settled and the forest cleared. In the valley below I saw rice fields ploughed in straight lines by cultivators who had come from the plains, and these pleased me more.`,
  parts: [
    child('a', short({ t: [2, 4], d: 1, c: 'recall', marks: 1, stem: `Name the physician who toured the Rajmahal region for the Company in 1810–11 and kept journals of what he saw.`, model: `**Francis Buchanan.**`, sol: `His journals are an official source on the region.`, scheme: [[`Francis Buchanan`, 1]] })),
    child('b', short({ t: [2, 4], d: 3, c: 'analysis', marks: 1, stem: `The diarist says the valley fields pleased him more than the hill plots. What does this suggest about the standard by which he judged the land?`, model: `He judged by **what the land could yield in regular revenue** under the plough, not by the needs or customs of the hill people.`, sol: `Read the preference as a sign of the writer's purpose.`, scheme: [[`A standard of revenue and ploughing, not the people's own needs`, 1]] })),
    child('c', short({ t: [2, 4], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Name two kinds of evidence, other than this journal, that a historian could use to understand why the hill people left their plots after a few seasons.`, model: `(1) **Accounts and traditions of the hill people themselves**, which would give their own reasons. (2) **Records of yields and of how soon plots were sown again**, which would show whether the land was really left idle.`, sol: `Two kinds of evidence from outside the diarist's viewpoint.`, scheme: [[`The people's own accounts`, 1], [`Records of yields and re-sowing`, 1]] }),
    [short({ t: [2, 4], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Suppose another Company servant's journal praised the same hill for its forest. Give two reasons why two Company servants might judge the same place differently.`, model: `(1) They may have had **different tasks**: one may have been sent to assess revenue and the other to survey or collect forest produce. (2) They may hold **different assumptions** about improvement, one preferring ploughed fields and the other valuing the forest.`, sol: `Two sources of difference between observers of one place.`, scheme: [[`Different tasks or purposes`, 1], [`Different assumptions about the land`, 1]] })]),
  ],
}));

// ================================================================ t03 The Deccan riots and cotton
Q('m_ryotwari', mcq({
  t: 3, d: 1, c: 'recall',
  stem: `In the ryotwari system of the Bombay Deccan, with whom was the land revenue settled?`,
  opts: [`The ryot, the cultivator himself`, `A zamindar of each district`, `The village moneylender`, `A merchant who exported cotton`],
  sol: `Revenue was settled directly with each cultivator, with no zamindar in between.`,
}));
Q('m_cotton_demand', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Why did the demand for cotton from the Bombay Deccan rise sharply in the early 1860s?`,
  opts: [
    `The American Civil War cut off British mills from raw cotton grown in the United States`,
    `The Limitation Law of 1859 made loans cheaper for ryots`,
    `The ryotwari assessment was lowered in 1861`,
    `The Deccan Riots Commission asked ryots to grow more cotton`,
  ],
  sol: `The war from 1861 to 1865 interrupted the usual supply to Britain. The other options name a law, a tax and a later inquiry that did not raise demand.`,
}));
Q('m_cotton_weaken', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Historians link the Deccan cotton boom of the 1860s to the American Civil War. Which finding about an imagined Deccan district would most weaken that link?`,
  opts: [
    `Records showing that exporters' advances and cotton prices in the district were no higher in 1861–65 than in the years before the war`,
    `Records showing that prices soared in 1862 and fell in 1866`,
    `Records showing that exporters advanced money to sahukars, who lent it to ryots for cotton`,
    `Records showing that the area under cotton grew between 1861 and 1865`,
  ],
  sol: `The link says the war raised demand and prices. If prices and advances did not rise in the war years, the link fails for that district; the other findings fit it.`,
}));
Q('m_bond_rate', mcq({
  t: 3, d: 2, c: 'application',
  stem: `An imagined ryot's first bond was for 50 rupees. After three years with nothing paid he signed a second bond for 80 rupees, the unpaid interest having been added. At what yearly rate of simple interest on the 50 rupees did this happen?`,
  opts: [`20 per cent a year`, `60 per cent a year`, `30 per cent a year`, `10 per cent a year`],
  sol: `The added interest is 30 rupees over three years, which is 10 rupees a year. Ten rupees is 20 per cent of 50. The figure of 60 per cent is the rate for the whole three years.`,
}));
Q('m_limit_why', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Why did Deccan sahukars make ryots sign new bonds every three years?`,
  opts: [
    `The law of 1859 gave a loan bond only three years of validity, so a fresh bond kept the debt enforceable`,
    `The ryotwari assessment was revised every three years`,
    `The Deccan Riots Commission had ordered it`,
    `Cotton prices were fixed for three years at a time`,
  ],
  sol: `A bond that lapsed could not be enforced. Signing a new one before it lapsed kept the claim alive.`,
}));
Q('m_cotton_date', mcq({
  t: 3, d: 2, c: 'application',
  stem: `An imagined, undated page from a sahukar's account book notes that cotton prices are very high, that exporters are pressing him for more cotton and offering advances, and that he fears prices will collapse if peace returns across the ocean. Which dating is soundest?`,
  opts: [
    `Between about 1861 and 1865, while the American war was still going on`,
    `After 1865, since prices are already collapsing`,
    `About 1875, the year of the riots`,
    `Before 1857, since exporters were not yet looking to India for cotton`,
  ],
  sol: `High prices, pressure from exporters and fear of peace overseas all fit the war years. Collapse is feared, not yet reported.`,
}));
Q('m_riot_pattern', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `An imagined police report from May 1875 records that crowds in several villages of Poona and Ahmednagar districts demanded bonds and account books from sahukars and burnt them, but did not attack the government's offices. Which inference is the most careful?`,
  opts: [
    `The crowds blamed the sahukars most directly, but the report alone cannot show that the revenue demand played no part in their distress`,
    `The government's revenue demand had no part in the riots`,
    `The sahukars had broken the law of 1859 in every village`,
    `The riots had been planned by the police`,
  ],
  sol: `The targets show whom the crowds blamed. They do not show what else lay behind the distress, so claims about the revenue demand go beyond the report.`,
}));
Q('m_revenue_data', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined ryot's field was assessed at 12 rupees a year for thirty years. In the first year his crop sold for 40 rupees; in the fifteenth year the same crop sold for 24 rupees. Which statement follows?`,
  opts: [
    `The assessment took 30 per cent of the crop's value at first and 50 per cent after the fall, so an assessment fixed for long periods weighed more heavily when prices fell`,
    `The assessment took 30 per cent at first and 40 per cent later`,
    `The assessment fell with prices, so the burden stayed at 30 per cent`,
    `The ryot's burden was lighter in the fifteenth year, since the sum was the same`,
  ],
  sol: `Twelve of 40 is 30 per cent, and twelve of 24 is 50 per cent. A sum fixed in rupees does not fall when prices fall.`,
}));
Q('ar_cotton', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: `Demand for cotton from the Deccan fell after the American Civil War ended in 1865.`,
  r: `Exporters had advanced money to sahukars, who lent it on to ryots.`,
  sol: `Both statements are accurate, but the credit chain describes how money reached the ryots; it does not explain the fall in demand, which came from American cotton returning to the market.`,
}));
Q('tf_supa', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: `True or false? The Deccan riots began in May 1875 at Supa, a village of Ahmednagar district, and then spread to Poona district.`,
  sol: `Supa lay in Poona district, and the revolt spread from there to villages in Poona and Ahmednagar.`,
}));
Q('ord_cotton', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: `Arrange these links of the Deccan cotton cycle in the order in which each led to the next.`,
  items: [`The American Civil War cuts off Britain's supply of raw cotton`, `Exporters advance money to sahukars, who lend to ryots to grow cotton`, `The war ends in 1865 and demand for Indian cotton falls`, `Credit dries up and ryots are left with debts`],
  sol: `Each step follows from the one before, from the war to the loss of credit.`,
}));
Q('s_bond_trick', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `An imagined ryot repays 40 rupees of a 100-rupee bond in grain but is given no receipt, and the sahukar's book still shows the whole sum unpaid. State two difficulties this creates for the ryot and one way an inquiry could test the book.`,
  model: `The ryot has **no proof of payment**, so he cannot dispute the entry, and the sahukar can charge **interest on the full 100**. An inquiry could compare the book with **statements of villagers** or the sahukar's grain accounts to see whether the grain was received.`,
  sol: `Two difficulties from the missing receipt and one test of the book.`,
  scheme: [[`No proof of payment and interest on the full sum`, 1], [`A way to test the book`, 1]],
}));
Q('s_ryotwari_why', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain two features of the ryotwari system in the Bombay Deccan that left ryots open to debt.`,
  model: `Revenue was assessed on the **expected average income** from each kind of soil and set at a **high level**. It was **revised only every thirty years**, so in bad years, such as the depression of the 1830s, ryots could not pay and many fled or fell into debt.`,
  sol: `A high assessment fixed for long periods and its effect in bad years.`,
  scheme: [[`High assessment on expected income`, 1], [`Revision only every thirty years and effect in bad years`, 1]],
}));
Q('s3_cotton_cycle', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain how the American Civil War first helped and then hurt the cotton-growing ryots of the Bombay Deccan.`,
  model: `(1) The war cut Britain's cotton from the United States, so demand for Indian cotton rose; exporters advanced money to sahukars, who lent to ryots, and **prices soared**. (2) When the war ended in **1865**, American cotton returned and demand for Indian cotton **fell**. (3) Credit dried up and ryots were left with **debts** they could not clear.`,
  sol: `The boom, the end of the war and the debt that followed.`,
  scheme: [[`Rising demand and prices`, 1], [`Fall in demand after 1865`, 1], [`Credit drying up and debts`, 1]],
}));
Q('s3_bond_calc', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined ryot borrows 200 rupees on a bond at 10 per cent a year, simple interest on the bond's principal, and pays nothing for six years. After three years the sahukar has him sign a new bond that adds the unpaid interest to the principal. (a) What does he owe after six years? (b) What would he owe if the 200 rupees had carried simple interest for six years with no new bond? (c) Why do the two sums differ?`,
  model: `(a) After three years the interest is 60, so the new bond is 260; three more years at 10 per cent on 260 add 78, so he owes **338 rupees**. (b) Simple interest on 200 for six years is 120, giving **320 rupees**. (c) The difference of 18 rupees arises because the second bond charged interest on unpaid interest too.`,
  sol: `Two sums computed and the reason for the difference.`,
  scheme: [[`338 rupees with the working`, 1], [`320 rupees`, 1], [`Interest charged on interest`, 1]],
}));
Q('l_deccan_causes', long({
  t: 3, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the causes of the Deccan riots of 1875, with reference to the ryotwari system, the cotton boom and the moneylenders.`,
  model: `1. **Ryotwari:** revenue was settled with each ryot at a high assessment, revised every thirty years, so ryots fell into debt, as in the 1830s.\n2. **Cotton boom:** the American Civil War raised demand and prices; exporters advanced money through sahukars to ryots.\n3. **Bust:** after 1865 demand fell, credit dried up and the debts remained.\n4. **Moneylenders:** under the law of 1859 bonds lasted three years, so sahukars had new bonds signed, adding interest to principal and using other tricks.\n5. **Outbreak:** in May 1875 ryots at Supa attacked sahukars, took their bonds and account books and burnt them; the revolt spread.`,
  sol: `The assessment, the boom and bust, the moneylenders' methods and the outbreak.`,
  scheme: [[`The ryotwari assessment and debt`, 1], [`The cotton boom`, 1], [`The bust after 1865`, 1], [`Moneylenders' bonds and tricks`, 1], [`The outbreak at Supa`, 1]],
}));
Q('l_cotton_assess', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `An imagined historian argues that the Deccan riots were caused by moneylenders' tricks and not by the revenue system of the government. Assess this argument, using the evidence of the bonds, the ryotwari assessment and the Deccan Riots Commission.`,
  model: `1. **For:** crowds burnt bonds and account books and attacked sahukars, and the commission found anger against moneylenders and grain dealers.\n2. **Tricks:** new bonds every three years, unpaid interest added to principal, no receipts and low prices for produce.\n3. **Against:** the assessment was high and revised only every thirty years, so ryots had little to spare and were likely pushed to borrow.\n4. **The commission:** set up by the government, it was reluctant to accept the revenue demand as a cause, so its silence is weak evidence.\n5. **Judgement:** sahukars were the immediate target, but the demand probably deepened dependence on them; the argument is too narrow.`,
  sol: `Evidence for the argument, evidence against, the commission's limits and a reasoned verdict.`,
  scheme: [[`Evidence that supports the argument`, 1], [`The sahukars' methods`, 1], [`The revenue demand as a further cause`, 1], [`The limits of the commission`, 1], [`A reasoned judgement`, 1]],
}));
Q('sb_bonds', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined ryot's statement, and answer the questions that follow. ${IMAG}`,
  passage: `**A ryot's statement to an inquiry (imagined)**\n\nI cultivate six acres of black soil. In the cotton years I borrowed 60 rupees from the sahukar of our village to buy seed and pay the assessment, and I signed a bond. For three years I paid nothing in cash, though I gave him grain at harvest, and he gave me no paper for it. At the end of that time he called me to his shop and had me sign a new bond for 96 rupees, saying that the interest had been added. I cannot read, and I do not know what is written in his book.`,
  parts: [
    child('a', short({ t: [3, 4], d: 1, c: 'recall', marks: 1, stem: `Name the law of 1859 under which loan bonds were valid for only three years.`, model: `The **Limitation Law** of 1859.`, sol: `It explains why fresh bonds were signed every three years.`, scheme: [[`Limitation Law`, 1]] })),
    child('b', short({ t: [3, 4], d: 3, c: 'analysis', marks: 1, stem: `The ryot says he gave grain but received no paper. What does this suggest about how a dispute over the sum due would be settled?`, model: `It would favour the **sahukar**, whose book was the only written record.`, sol: `Link the missing paper to who could prove what.`, scheme: [[`The sahukar's book would be the only record`, 1]] })),
    child('c', short({ t: [3, 4], d: 3, c: 'application', marks: 2, stem: `**Either** (i): Find the yearly rate of simple interest on 60 rupees that turned the first bond into the second, and say what the statement does not tell us about what the sahukar really charged.`, model: `The added sum is 36 rupees over three years, which is 12 a year, or **20 per cent a year** of 60. The ryot's grain was not credited, so the statement **does not show the rate charged on the true balance**.`, sol: `The rate computed and a limit on its meaning.`, scheme: [[`20 per cent a year with the working`, 1], [`The limit from the uncredited grain`, 1]] }),
    [short({ t: [3, 4], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): The sahukar's book shows a first loan of 90 rupees, not 60. Name two kinds of evidence an inquiry could use to decide who is right.`, model: `(1) **Statements of other villagers** who knew of the loan. (2) **Records of the bond itself**, such as a registered copy, and the account books of other sahukars, to compare how they entered similar loans.`, sol: `Two independent checks on the amount lent.`, scheme: [[`Statements of villagers`, 1], [`The bond and comparable books`, 1]] })]),
  ],
}));
Q('sb_commission', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of what an official inquiry's report contains, and answer the questions that follow. ${SUM}`,
  passage: `**What the report of the Deccan Riots Commission contains (summary)**\n\nAfter the disturbances of 1875 in the villages of two districts, the provincial government ordered an inquiry. A commission collected material, and its report was presented some years later. The report includes statements taken from several groups of people, together with tables of figures. It gives its own view of why the disturbances took place.`,
  parts: [
    child('a', short({ t: [3, 4], d: 1, c: 'recall', marks: 1, stem: `In which year was the commission's report presented to the British Parliament?`, model: `**1878.**`, sol: `The riots had begun in 1875.`, scheme: [[`1878`, 1]] })),
    child('b', short({ t: [3, 4], d: 3, c: 'analysis', marks: 1, stem: `The inquiry was ordered by the provincial government. What does this suggest about a point on which its report needs checking?`, model: `Whether it **judged the government's own revenue demand fairly** as a possible cause.`, sol: `Think of who ordered the inquiry and what might be in question.`, scheme: [[`Fairness on the government's own revenue demand`, 1]] })),
    child('c', short({ t: [3, 4], d: 3, c: 'application', marks: 2, stem: `**Either** (i): A historian wants to know whether the revenue demand contributed to the riots. Name two kinds of material in the report she should examine and say what each could show.`, model: `(1) **Statements of ryots**, which could show how they linked the assessment with their borrowing. (2) **Tables of revenue rates and crop prices**, which could show how heavy the demand was when prices fell.`, sol: `Two kinds of material matched to the question.`, scheme: [[`Ryots' statements and what they show`, 1], [`Tables of rates and prices and what they show`, 1]] }),
    [short({ t: [3, 4], d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): A student says that because the commission found anger against moneylenders, the revenue demand played no part. Give two reasons why this does not follow from that finding alone.`, model: `(1) Anger against the **immediate** creditors does not rule out a **deeper cause** that pushed ryots into debt. (2) The commission was set up by the government, so it may have been **reluctant to count the revenue demand** among the causes.`, sol: `Two reasons the conclusion goes beyond the finding.`, scheme: [[`Immediate target and deeper cause`, 1], [`The commission's own position`, 1]] })]),
  ],
}));

// ================================================================ t04 Sources: official reports
Q('m_fifth_what', mcq({
  t: 4, d: 1, c: 'recall',
  stem: `What was the Fifth Report of 1813?`,
  opts: [
    `A report to the British Parliament on the administration and activities of the Company in India, with long appendices`,
    `A set of petitions from Bengal zamindars to the Company's court of directors`,
    `A journal of a physician's tour of the Rajmahal hills`,
    `An inquiry into riots in villages of the Deccan`,
  ],
  sol: `It was the fifth of a series of reports to Parliament on the Company's affairs, and much of it consists of appendices.`,
}));
Q('m_fifth_voices', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `A historian wants to know how sharecroppers of north Bengal felt about jotedars around 1810. Which limit of the Fifth Report matters most for this question?`,
  opts: [
    `Its petitions and collectors' reports came from those who wrote to the Company, so sharecroppers' own voices may be missing`,
    `It was printed in 1813, which is too early to be of use`,
    `It was presented to Parliament, so it cannot concern Bengal`,
    `It contains revenue tables, so it cannot contain petitions`,
  ],
  sol: `Match the source to the question: the issue is whose views it records. The other options are mistaken about its date, its subject or its contents.`,
}));
Q('m_conflict_views', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: `Two imagined accounts describe the same hill village. A surveyor's journal says the burnt patches were abandoned and wasted; a summary of the hill community's own songs says they were left to grow back and sown again. What is the best response for a historian?`,
  opts: [
    `Treat neither as settled: ask who each account was for and what it wished to show, and look for evidence such as how soon patches were sown again`,
    `Prefer the journal, since it was written by an official`,
    `Prefer the songs, since the community knew its land best`,
    `Reject both, since they disagree`,
  ],
  sol: `Conflicting accounts are weighed by their authors' purposes and tested against further evidence. Preferring one by status, or rejecting both, throws evidence away.`,
}));
Q('m_cotton_exagg', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: `A historian reads that the Fifth Report describes the collapse of zamindari power across Bengal, but district registers she consults show many old families still holding estates. What is the soundest reading?`,
  opts: [
    `The Report may have overstated the collapse, given its critical aim, but the registers may hide benami holdings; she should test both against rent receipts`,
    `The registers must be wrong, since the Report went to Parliament`,
    `The Report must be wrong, since registers are always accurate`,
    `Both must be false, since they disagree`,
  ],
  sol: `Each source has a reason to mislead and a way of misleading. A third kind of record is needed to decide between them.`,
}));
Q('m_drc_stat', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A table in an imagined inquiry's appendix lists, for three talukas, the villages where bonds were burnt and the villages in all: P, 18 of 90; Q, 12 of 24; R, 9 of 30. Which statement is correct?`,
  opts: [
    `Q had the highest share of villages affected, but P had the most villages affected, so the choice of count or share changes which taluka looks worst hit`,
    `P was worst hit on both the count and the share`,
    `R had a higher share affected than Q`,
    `The three talukas had the same share of villages affected`,
  ],
  sol: `The shares are 20, 50 and 30 per cent for P, Q and R. P has the largest count, 18, while Q has the largest share, so the two measures point to different talukas.`,
}));
Q('m_official_silent', mcq({
  t: 4, d: 2, c: 'analysis',
  stem: `An imagined official report on a district lists the revenue collected, the Collector's tours and the peaceful condition of the villages, and includes no petitions. A historian who relies on it alone to describe villagers' feelings is most likely to make which mistake?`,
  opts: [
    `Taking the report's silence about discontent as proof that there was none`,
    `Overstating the revenue collected`,
    `Dating the report too late`,
    `Treating the Collector as a villager`,
  ],
  sol: `A report records what its writers were asked to notice or chose to include. What it leaves out may be as important as what it records.`,
}));
Q('m_dating_report', mcq({
  t: 4, d: 2, c: 'application',
  stem: `An imagined, undated letter says that the commission appointed after the Deccan riots has presented its report to the British Parliament, and refers to the riots as having broken out three years earlier. Which dating is soundest?`,
  opts: [
    `About 1878, since riots in 1875 plus three years agrees with the presentation of the report`,
    `About 1872, since the riots came before the report`,
    `About 1865, since cotton prices fell then`,
    `About 1858, since the Limitation Law followed`,
  ],
  sol: `Two clues agree: three years after the riots of 1875 and the presentation of the report in 1878.`,
}));
Q('ar_copy', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `Two reports that give the same figure for estates auctioned in a district do not necessarily confirm it twice.`,
  r: `One of the reports may have copied the figure from the other, or both may have taken it from the same collector's return.`,
  sol: `Agreement counts as confirmation only when the sources are independent, and copying removes that independence.`,
}));
Q('tf_report', tf({
  t: 4, d: 1, c: 'understanding', ans: false,
  stem: `True or false? Historians treat official reports such as the Fifth Report as complete and neutral records of rural conditions.`,
  sol: `Official reports are made for particular purposes and from particular viewpoints, so historians question what they leave out.`,
}));
Q('s_report_questions', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `A collector's report says that the ryots of an estate were prosperous; an imagined petition from the same ryots says that they were in distress. State two things a historian should check before preferring either.`,
  model: `(1) **Who wrote each and why**: a collector may wish to show good management, and ryots may stress distress to win relief. (2) **Other evidence from the same years**, such as rent registers, harvests and prices, to see which account fits the facts.`,
  sol: `The writers' purposes, and independent records to test them.`,
  scheme: [[`The purpose of each writer`, 1], [`Further evidence to test them`, 1]],
}));
Q('s3_archive_plan', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `A student wants to describe how Deccan ryots experienced credit in the cotton years. She has the Deccan Riots Commission report, an imagined ryot's diary and an imagined sahukar's account book. Explain how she should use each and give one risk for each.`,
  model: `(1) The **commission's report** gives statements and statistics for many villages, but officials made it and may play down the revenue demand. (2) The **ryot's diary** shows how one family felt about debt, but it is one person's view and may lack figures. (3) The **sahukar's book** records loans and interest, but it is his own record and may leave out payments in grain.`,
  sol: `Each source matched to what it can show, with its risk.`,
  scheme: [[`The report, with its risk`, 1], [`The diary, with its risk`, 1], [`The account book, with its risk`, 1]],
}));
Q('l_archives', long({
  t: 4, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `An imagined historian wants to write about how the Company's revenue policies affected peasants in Bengal, the Rajmahal hills and the Deccan. She has the Fifth Report, Buchanan's journals and the Deccan Riots Commission report. Evaluate how far each serves her purpose and what else she needs.`,
  model: `1. **Fifth Report (1813):** petitions, collectors' reports and revenue figures on Bengal; its critical aim may have exaggerated the decline of zamindari power.\n2. **Buchanan's journals (1810–11):** a Company physician's observations of the hills; useful, but he judged the land as resources to be developed and criticised forest dwellers' ways.\n3. **Commission report (1878):** statements and statistics on the Deccan, though reluctant to accept the revenue demand as a cause.\n4. **Fit:** each suits one region best, and none gives peasants' own voices fully, so she needs district records, petitions and oral traditions.\n5. **Judgement:** rich but official, so conclusions should be framed as readings of the Company's view.`,
  sol: `Each report assessed for one region, the gaps and a framed conclusion.`,
  scheme: [[`The Fifth Report assessed`, 1], [`Buchanan's journals assessed`, 1], [`The commission report assessed`, 1], [`What else is needed`, 1], [`A framed judgement`, 1]],
}));
