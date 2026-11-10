// CBSE 12 History, ch08 Peasants, Zamindars and the State: Agrarian Society and the Mughal Empire (c. 16th-17th
// centuries), question bank. Every source passage is an imagined document (a village accountant's register, a petition
// summary, a revenue official's note) or a SOYL summary of what a kind of record contains, written in SOYL's own words
// and labelled as such. Nothing from the Ain-i Akbari, Babur's memoirs, Giovanni Careri's account or any other document
// is quoted, translated or closely paraphrased; no NCERT text, source box, table, caption, map or exercise and no board
// or sample-paper item is reused (D-036). All numbers in data items are imagined, except the figures that the notes
// give from the Ain-i Akbari. Caste and gender in villages are described plainly and neutrally; the little-republic
// view is presented as a debate. Places are named in words only: no map work (OA-23).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from '../../cbse-12-history-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// ================================================================ t01 Peasants and agricultural production; the Ain-i Akbari
Q('m_raiyat', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `Which pair of terms was commonly used in Mughal-period sources for a peasant?`,
  opts: [`Raiyat (plural riaya) or muzarian`, `Zamindar or jagirdar`, `Muqaddam or patwari`, `Mansabdar or sawar`],
  sol: `The other pairs name landholders, village officials and ranks in the imperial service, not cultivators.`,
}));
Q('m_khud', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Meera's family lives in village X and cultivates fields in X and also in village Y, where the revenue terms are lighter. Ghulam moved from X to Y two years ago and cultivates only in Y, where he now lives. Which description uses the Mughal-period terms correctly?`,
  opts: [
    `Meera is khud-kashta in X and pahi-kashta in Y; Ghulam is khud-kashta in Y`,
    `Meera is pahi-kashta in both villages; Ghulam is pahi-kashta in Y`,
    `Meera is khud-kashta in both villages; Ghulam is pahi-kashta in Y`,
    `Meera is pahi-kashta in X and khud-kashta in Y; Ghulam is khud-kashta in X`,
  ],
  sol: `Apply the test of residence to each village separately: living in the village where the land lies makes a cultivator khud-kashta there, and cultivating land in a village where one does not live makes him pahi-kashta there.`,
}));
Q('m_mobility_weaken', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `Historians connect the movement of peasants between villages with the fact that land was plentiful and labour scarce. Which finding about an imagined province would most weaken this connection?`,
  opts: [
    `Records showing that land was scarce and labour plentiful there, yet peasants moved between villages as often as elsewhere`,
    `A record of peasants moving to a village that offered easier terms`,
    `Records of new villages founded on uncleared land`,
    `A petition from a village asking that cultivators who had left be called back`,
  ],
  sol: `To weaken a link between a cause and an effect, the effect must appear without the cause. The other findings are the kind of movement that plentiful land and scarce labour would produce.`,
}));
Q('m_crops_america', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `Which of these crops reached India after the opening of the Americas, travelling by way of Africa and Spain?`,
  opts: [`Maize`, `Sugarcane`, `Wheat`, `Lentils`],
  sol: `Maize was among the new crops from the Americas. The other three were already part of farming in the subcontinent.`,
}));
Q('m_chilli_date', mcq({
  t: 1, d: 3, c: 'application',
  stem: `An imagined, undated household account from a village lists chillies and tomatoes among the foods bought at a fair, along with rice and lentils. Which dating judgement is soundest?`,
  opts: [
    `It was written after the Americas were opened to world trade, since chillies and tomatoes came from there, but the list alone does not show how long after`,
    `It was written before 1492, since rice and lentils were already old crops in India`,
    `It cannot be dated at all, since the list names no ruler and no year`,
    `It was written in Akbar's reign, since chillies were brought to India by his officials`,
  ],
  sol: `A single late item in a list sets an earliest possible date for the whole list, while older items such as rice set no limit at all. Nothing in the list ties it to one ruler.`,
}));
Q('m_jins', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `What did the term jins-i kamil, literally perfect crops, refer to?`,
  opts: [`Cash crops such as cotton and sugarcane`, `Crops grown only for the cultivator's own meals`, `Crops that the state did not tax`, `Crops grown only in forest clearings`],
  sol: `The word marks crops grown largely for sale. Oilseeds and lentils could also be counted here.`,
}));
Q('m_cashcrop_infer', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: `An imagined register shows that a village paid its revenue in cash and that most of its fields were under cotton and sugarcane, sold at a weekly market. Which inference is the most careful?`,
  opts: [
    `Its peasants were closely linked to markets, but the register cannot show whether they gained or lost by this`,
    `Its peasants grew nothing for their own food`,
    `The state had forbidden the growing of food crops there`,
    `The village was held by a zamindar who owned all its produce`,
  ],
  sol: `The register supports a claim about market links. Claims about food supply, orders from the state or ownership go beyond what it records, and nothing in it shows who benefited.`,
}));
Q('fb_ain', fb({
  t: [1, 5], d: 1, c: 'recall',
  stem: `The Ain-i Akbari was written by ___, the court historian of Akbar, and was completed in ___.`,
  acc: [[`Abu'l Fazl`, `Abul Fazl`, `Abu'l Fazal`, `Abul Fazal`], [`1598`]],
  sol: `Abu'l Fazl completed the work in 1598.`,
}));
Q('tf_ain_even', tf({
  t: [1, 5], d: 1, c: 'understanding', ans: false,
  stem: `True or false? The Ain-i Akbari gives the same kinds of data, equally complete, for every province of the empire.`,
  sol: `Data were not gathered evenly: some provinces lack information that others have, so comparisons across provinces need care.`,
}));
Q('ar_ain_view', ar({
  t: [1, 5], d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `Historians read the Ain-i Akbari as an official view of the empire and not as a neutral record.`,
  r: `Its author was Akbar's court historian, and his aim was to present the empire as one whose ruling class secured social harmony.`,
  sol: `The author's post and purpose are what make the work an official picture.`,
}));
Q('s_seasons', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Name the two cropping seasons of Mughal agriculture and explain what the term jins-i kamil meant.`,
  model: `The two seasons were **kharif** (autumn) and **rabi** (spring), so many fields could yield two harvests in a year. **Jins-i kamil**, literally perfect crops, meant cash crops such as **cotton** and **sugarcane**, grown for sale; oilseeds and lentils also came under it.`,
  sol: `Two seasons named, and the meaning of the term with examples.`,
  scheme: [[`Kharif and rabi named`, 1], [`Jins-i kamil explained with examples`, 1]],
}));
Q('s_ain_use', short({
  t: [1, 5], d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `A student wants to write about the wages of labourers in a village of Bengal and plans to rely only on the wage tables of the Ain-i Akbari. Is this wise? Give one point in favour and one against.`,
  model: `**For:** the Ain is an extraordinarily rich official record, with prices and wages that historians value. **Against:** its prices and wages come largely from Agra and its surroundings, so they may not fit a Bengal village; she should add local records.`,
  sol: `One strength of the source and the limit set by where its data came from.`,
  scheme: [[`A point in favour`, 1], [`A point against, based on Agra`, 1]],
}));
Q('s3_crop_share', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined register gives, for three villages, the area under jins-i kamil and the total cultivated area (in bighas): Village A, 40 of 200; Village B, 90 of 180; Village C, 10 of 150. Work out each village's share of jins-i kamil, say which village was most tied to the market, and give one limit of this conclusion.`,
  model: `**Shares:** A, 40 of 200 is 20 per cent; B, 90 of 180 is 50 per cent; C, 10 of 150 is about 7 per cent. **Village B** was the most tied to the market, since half its land grew crops meant for sale. **Limit:** area alone does not show how much was sold, at what price, or whether the peasants gained.`,
  sol: `Three shares computed, the village identified and the limit of area figures stated.`,
  scheme: [[`Shares worked out correctly`, 1], [`Village B named with a reason`, 1], [`A limit stated`, 1]],
}));
Q('l_peasants', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the peasants and agricultural production of the Mughal countryside in the sixteenth and seventeenth centuries.`,
  model: `1. **Peasants:** called raiyat or muzarian, or kisan and asami; khud-kashta lived in the village of their land, pahi-kashta cultivated elsewhere, often after moving to better terms.\n2. **Holdings:** in north India an average peasant seldom had more than a pair of bullocks and two ploughs; in Gujarat about six acres meant comfort. Land was plentiful and labour scarce.\n3. **Water:** agriculture depended on the monsoon, helped by wells, tanks and canals, with the Persian wheel in places.\n4. **Crops:** kharif and rabi harvests; cash crops (jins-i kamil) such as cotton and sugarcane.\n5. **New crops:** maize, tomatoes, potatoes, chillies, pineapple and papaya came from the Americas.`,
  sol: `Peasant types, holdings and mobility, water, seasons and cash crops, and the new crops.`,
  scheme: [[`Terms and kinds of peasant`, 1], [`Holdings and mobility`, 1], [`Water and irrigation`, 1], [`Seasons and cash crops`, 1], [`New crops`, 1]],
}));
Q('l_ain_gujarat', long({
  t: [1, 5], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `An imagined historian wants to describe how well off the peasants of a Gujarat village were around 1650. She has the Ain-i Akbari (completed in 1598), revenue records of Gujarat from the seventeenth century, and an imagined petition from the village. Assess how she should use each source and how firm her conclusion can be.`,
  model: `1. **The Ain** gives an official, provincial picture, written for the emperor's court and half a century earlier, so it suits a broad background but not this village.\n2. **Gujarat revenue records** are closer in place and time and show what was demanded, but the state made them for its own purposes.\n3. **The petition** gives the villagers' side and their grievances, yet it is one document and may not be typical.\n4. **Method:** she should set the three side by side, using the benchmark that about six acres was comfortable in Gujarat, and see where they agree.\n5. **Judgement:** her conclusion must be cautious, a likely range, not a firm account of every household.`,
  sol: `The Ain, local records and the petition weighed in turn, then a method and a measured conclusion.`,
  scheme: [[`The Ain assessed`, 1], [`Revenue records assessed`, 1], [`Petition assessed`, 1], [`Method of combining the sources`, 1], [`Cautious judgement`, 1]],
}));
Q('sb_ain', source({
  t: [1, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of what a kind of work contains, and answer the questions that follow. ${SUM}`,
  passage: `**What a great court history of Akbar's reign contains (summary)**\n\nA court historian of Akbar finished a large work near the end of the sixteenth century, as the last part of a longer history of the reign. Its first books describe how the empire was run: the emperor's household, the army and the nobles and servants of the state, and the fiscal side, with the rates of revenue and, for each province, tables on matters such as its revenue, its zamindars and their forces. Its later books turn to the beliefs and traditions of the people and to sayings of the emperor. The tables of prices and wages come mostly from Agra and the lands around it.`,
  parts: [
    child('a', short({ t: [1, 5], d: 1, c: 'recall', marks: 1, stem: `Name the work that the summary describes.`, model: `The **Ain-i Akbari**, the third part of the Akbarnama.`, sol: `It is the part of Abu'l Fazl's history of the reign that describes the empire's arrangements.`, scheme: [[`Ain-i Akbari`, 1]] })),
    child('b', short({ t: [1, 5], d: 3, c: 'analysis', marks: 1, stem: `The summary says that the tables of prices and wages come mostly from Agra and the lands around it. What does this suggest about using them to describe the whole empire?`, model: `They may not represent **other regions**, so conclusions about distant places need other records.`, sol: `Link the place the data came from to how far they can be generalised.`, scheme: [[`Not representative of other regions`, 1]] })),
    child('c', short({ t: [1, 5], d: 3, c: 'application', marks: 2, stem: `**Either** (i): A historian wants to compare revenue demands in a Gujarat district in the seventeenth century with the work's picture. Name one other kind of source she needs and say what it adds.`, model: `**Revenue records of Gujarat** from the seventeenth century, which show the demands actually made on villages, so she can see whether practice matched the official picture.`, sol: `A local record of the right period and what it can check.`, scheme: [[`Local revenue records named`, 1], [`What they add`, 1]] }),
    [short({ t: [1, 5], d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Give two questions a historian should ask about the tables before using them to study the peasants of a province.`, model: `(1) **Were the data collected evenly** for every province, or are some details missing for this one? (2) **Are the totals correct**, since errors in adding figures are known, and who gathered the data for what purpose?`, sol: `Two questions on coverage and on accuracy and purpose.`, scheme: [[`Question on coverage`, 1], [`Question on accuracy or purpose`, 1]] })]),
  ],
}));

// ================================================================ t02 The village community and women
Q('m_village_three', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `Which three constituents are named for the village community in accounts of the Mughal countryside?`,
  opts: [`Cultivators, the panchayat and the village headman`, `Zamindars, mansabdars and the revenue collector`, `Priests, merchants and artisans`, `The patwari, the jagirdar and the emperor`],
  sol: `The village community was made up of those who farmed, the elders' assembly and the headman. The other groups were outside it or are only part of it.`,
}));
Q('m_republic_strengthen', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Some historians question the nineteenth-century British description of Mughal villages as little republics. Which finding about an imagined village would most strengthen their doubt?`,
  opts: [
    `Panchayat records showing that fines and expulsions were decided by heads of dominant families, with lower-caste households having no voice`,
    `Records of a common fund that paid for mending the village well`,
    `A headman chosen after discussion among the cultivators`,
    `Cultivators of several castes living in one village`,
  ],
  sol: `The doubt concerns equality. Only the first finding shows power being held unequally; a shared fund, a chosen headman and mixed castes can all be found in a village with deep divisions.`,
}));
Q('m_bride_price', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `Why was bride-price, rather than dowry, common in peasant and artisan communities?`,
  opts: [
    `Women's labour in fields and workshops was valued, so the bride's family was compensated`,
    `Women were forbidden to work outside the home, so the groom's family paid for their upkeep`,
    `The state fixed the amount that a groom had to pay`,
    `Remarriage was banned, so the first marriage had to be costly`,
  ],
  sol: `The custom is linked with the economic worth of women's work. The other options contradict the evidence on women's work or on remarriage.`,
}));
Q('m_bride_weaken', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `Historians link bride-price with the value of women's work in peasant and artisan households. Which finding about imagined communities would most weaken that link?`,
  opts: [
    `Communities in which women did no field or craft work paid bride-price just as often`,
    `Communities in which women spun, sieved and worked clay paid bride-price`,
    `A woman petitioning a panchayat against a husband who neglected her`,
    `Divorced and widowed women remarrying in a community`,
  ],
  sol: `A causal link is weakened when the effect is found where the supposed cause is absent. The other findings do not separate bride-price from women's work.`,
}));
Q('m_women_inherit', mcq({
  t: 2, d: 1, c: 'recall',
  stem: `In Mughal agrarian society, among which group did women have the right to inherit property?`,
  opts: [`The landed gentry`, `Landless labourers`, `Village artisans`, `Forest-dwelling hunters`],
  sol: `The right is recorded for women of the landed gentry. In the eighteenth century a zamindari in Bengal, Rajshahi, was held by a woman.`,
}));
Q('m_petition_fit', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A historian wants to know what grievances villagers, women among them, took to the panchayat. Which source would serve her best?`,
  opts: [
    `Surviving petitions addressed to panchayats`,
    `The revenue tables for each province in the Ain-i Akbari`,
    `A chronicle of the emperor's campaigns`,
    `A list of mansabdars and their ranks`,
  ],
  sol: `Match the source to the question: only petitions were made by villagers to the panchayat. The others record provinces, wars and ranks.`,
}));
Q('mt_village', match({
  t: 2, d: 1, c: 'recall',
  stem: `Match each term with the correct description.`,
  pairs: [
    [`Muqaddam or mandal`, `The village headman`],
    [`Patwari`, `The village accountant who helped the headman keep accounts`],
    [`Pahi-kashta`, `A cultivator who cultivated land in a village other than his own`],
    [`Miras or watan`, `Land given to a village artisan in parts of Maharashtra`],
  ],
  sol: `Each term is the usual name for the role described.`,
}));
Q('tf_republic', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: `True or false? Because nineteenth-century British officials called Mughal villages little republics, historians today accept that villagers enjoyed social equality.`,
  sol: `Historians question the term, since caste-based inequalities ran deep and the powerful dominated the panchayat.`,
}));
Q('ar_panchayat', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: `Petitions from lower-caste cultivators to panchayats show that panchayats treated every caste alike.`,
  r: `In villages of mixed castes the panchayat had representatives of different castes, though the powerful dominated it.`,
  sol: `The petitions record complaints, which is not the same as fair treatment; the second claim is correct and itself points to domination.`,
}));
Q('ar_women_work', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: `Women of peasant households worked in sowing, weeding, threshing and winnowing.`,
  r: `Men controlled the household in agrarian society.`,
  sol: `Both are accurate, but male control of the household does not account for women's field work, which arose from the needs of cultivation.`,
}));
Q('s_panchayat', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `An imagined panchayat fines a household for crossing a caste boundary. Name the two powers that the panchayat was using, and one question a historian should ask about who made the decision.`,
  model: `The panchayat was using its power to **keep caste boundaries** and to **impose fines**; it could also order expulsion. A historian should ask **who sat on it**, since the powerful dominated panchayats, and whether the fined household had any voice.`,
  sol: `Two powers recognised and a question about who held power in the panchayat.`,
  scheme: [[`Keeping caste boundaries and fining`, 1], [`A question on who decided`, 1]],
}));
Q('s_women_petition', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `An imagined panchayat record says that a woman complained that her husband neglected her and asked the elders to act. State one conclusion about women in village society and one limit of a single record.`,
  model: `**Conclusion:** women were not without a voice, since they could bring complaints about their households before the panchayat and seek a hearing. **Limit:** one record cannot show how the elders decided, how often women did this, or whether women of every caste could.`,
  sol: `A conclusion about women's recourse and a limit set by one record.`,
  scheme: [[`Conclusion about women's recourse`, 1], [`A limit of one record`, 1]],
}));
Q('s3_artisan', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `A historian finds that in an imagined village most artisan families, such as potters and blacksmiths, were paid a share of each harvest, while one carpenter family held a plot of land as well. Suggest three explanations for this difference.`,
  model: `(1) The carpenter's work may have been needed all year, so the village gave a **plot** as a lasting reward. (2) The family may have held the plot under an **earlier arrangement** that custom or a village agreement kept alive. (3) The village may have had **land to spare** when grain was short. One record cannot decide between these.`,
  sol: `Three possible reasons from the nature of the work, custom and resources, with a caution.`,
  scheme: [[`Year-round need for the work`, 1], [`An earlier arrangement`, 1], [`Land available to spare`, 1]],
}));
Q('l_republic', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `An imagined village's records show that its panchayat kept a common fund from household contributions and used it to repair the village well; that the headman was chosen after discussion and approved by the zamindar; and that elders from dominant families fined a lower-caste household for breaking a caste boundary. Using this and what you know, assess the view that Mughal villages were little republics.`,
  model: `1. **For the view:** a common fund paid for a shared need, and the headman was chosen by consensus, so villagers did manage some affairs themselves.\n2. **Against:** the headman needed the zamindar's approval, so the village was not wholly self-governing.\n3. **Inequality:** the elders came from dominant families and fined a lower-caste household, which shows power held unequally.\n4. **Wider evidence:** petitions from lower castes complain of heavy demands and forced labour.\n5. **Judgement:** the description fits the village's self-management but hides caste divisions, which is why historians question it.`,
  sol: `Evidence for self-government, evidence against, inequality, other records and a balanced verdict.`,
  scheme: [[`Evidence for the view`, 1], [`The zamindar's role`, 1], [`Inequality shown by the fine`, 1], [`Other evidence from petitions`, 1], [`Reasoned judgement`, 1]],
}));
Q('sb_petition', source({
  t: [2, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined petition summary, and answer the questions that follow. ${IMAG}`,
  passage: `**A petition to a caste panchayat (imagined summary)**\n\nA group of cultivators of one village, all of a single lower-ranking caste, sent a petition to the caste panchayat of their region. They said that an agent of the revenue collector, helped by two men of a higher caste, had demanded more than the usual share of the crop and had made them work without pay on repairing his storehouse in the sowing season. They asked the elders to hear the matter and to write to the official. A scribe copied the petition and kept it with the panchayat's papers; it does not record what the elders decided.`,
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: `Name the village official who helped the headman by keeping the accounts.`, model: `The **patwari**, or village accountant.`, sol: `The headman kept accounts with the help of this official.`, scheme: [[`Patwari`, 1]] })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: `The cultivators sent their complaint to a caste panchayat. What does this suggest about how they saw it?`, model: `They saw it as a body that could **hear complaints and press an official**, a place to seek justice.`, sol: `Read the choice of audience as a sign of what the petitioners expected.`, scheme: [[`Seen as a place to seek justice`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: `**Either** (i): Give two reasons why a historian should not conclude from this petition that all cultivators of the region suffered such demands.`, model: `(1) It is **one petition** from one group in one village. (2) It gives **only the petitioners' side**, and the record does not say what the elders decided or whether the claims were true.`, sol: `Two limits of a single, one-sided document.`, scheme: [[`One petition from one group`, 1], [`One side only, no outcome recorded`, 1]] }),
    [short({ t: 2, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Suggest two other kinds of evidence that could show whether the complaint was true.`, model: `(1) **Revenue records of the village**, which would show the rate of demand actually entered. (2) **Other petitions or the elders' reply**, which would show whether the same complaint was made elsewhere or was upheld.`, sol: `Two kinds of record that can check the claim.`, scheme: [[`Village revenue records`, 1], [`Other petitions or the elders' reply`, 1]] })]),
  ],
}));

// ================================================================ t03 Forests, tribes and zamindars
Q('m_jangli', mcq({
  t: 3, d: 1, c: 'recall',
  stem: `In Mughal usage, the term jangli was applied to people whose living came mainly from`,
  opts: [`gathering forest produce, hunting and shifting cultivation`, `serving as cavalry in the imperial army`, `trading cloth in distant ports`, `holding the right to collect revenue from villages`],
  sol: `The word described a way of living, not a judgement that such people were savage.`,
}));
Q('m_jangli_class', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `An imagined official's note describes two communities living in the same forest. Community P gathers honey and beeswax, hunts, and clears a patch of forest every few years to sow a crop before moving on. Community Q lives in a clearing, ploughs the same fields every year and sells grain in a nearby town. Which community would a Mughal official have called jangli, and why?`,
  opts: [
    `P, because its living comes from forest produce, hunting and shifting cultivation`,
    `Q, because it lives inside the forest`,
    `Both, because both live among trees`,
    `Neither, because jangli was a word for zamindars`,
  ],
  sol: `The label rested on how a community made its living, not on where it lived. Test each community against that criterion; the one that farms fixed fields and sells grain does not meet it.`,
}));
Q('m_peshkash', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `An imagined record says that a forest chief sent elephants to a Mughal officer every year and was left in control of his forest lands. Which inference is the most careful?`,
  opts: [
    `The tribute was part of a working relationship between the chief and the state, but the record alone cannot show whether he gave it willingly`,
    `The chief was a salaried officer of the empire`,
    `The state had no interest in forest lands`,
    `The chief had been conquered and his lands taken away`,
  ],
  sol: `The record links the gift and the chief's continued control, which supports a claim about a relationship. Rank in the empire, indifference of the state and conquest are not stated, and willingness cannot be read from it.`,
}));
Q('m_hunt_fit', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Court chroniclers described imperial hunts (shikar) as occasions on which the emperor dispensed justice. For which question would such a chronicle be the weakest evidence?`,
  opts: [
    `How the forest peoples themselves experienced the hunts`,
    `How the court wished the hunts to be seen`,
    `Which hunts took place in which years, as the court recorded them`,
    `What ceremony surrounded an imperial hunt`,
  ],
  sol: `A chronicle is written from the court's side. It is useful for the court's own view and ceremonies, and weakest where the people it does not speak for are concerned.`,
}));
Q('m_forest_trade', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Which finding would best support the view that trade in forest produce could change the position of a forest chief?`,
  opts: [
    `Records of a chief who supplied honey and gum lac to a market town and later appears as a revenue-paying zamindar with armed followers`,
    `A record of a chief sending elephants as tribute to a Mughal officer`,
    `A chronicle's account of an emperor's hunt in a forest`,
    `A list of the crops grown by plains peasants`,
  ],
  sol: `The claim needs a chain from trade to a changed position. Tribute and hunting concern the state, and plains crops concern a different group.`,
}));
Q('m_zam_weaken', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: `Historians describe the relation of zamindars and peasants as one of both exploitation and patronage. Which finding would most weaken the claim that zamindars could act as patrons?`,
  opts: [
    `Records of many zamindars showing no gift, loan, tank or well for tenants, only demands for extra payment and labour`,
    `A zamindar who sheltered his tenants in a famine`,
    `A zamindar who had a tank dug for a village`,
    `A revolt led by a zamindar with peasant support`,
  ],
  sol: `The other findings are acts of patronage or support from peasants. Only a pattern of no benefits at all would count against the claim.`,
}));
Q('m_zam_ratio', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `The Ain-i Akbari gives the armed forces of the zamindars as 384,558 cavalry and 4,277,057 infantry, besides elephants, cannon and boats. Roughly how many foot soldiers were there for each horseman, and what does it suggest?`,
  opts: [
    `About 11, so zamindar forces were mainly infantry`,
    `About 3, so cavalry formed the main part`,
    `About 25, so cavalry was a tiny fraction`,
    `About 1, so the two were equal`,
  ],
  sol: `Divide 4,277,057 by 384,558, which gives a little over 11. The other ratios do not match the figures.`,
}));
Q('fb_milkiyat', fb({
  t: 3, d: 1, c: 'recall',
  stem: `Lands that zamindars held as personal property, which they could sell, bequeath or mortgage, were called ___.`,
  acc: [[`milkiyat`]],
  sol: `Such lands were milkiyat.`,
}));
Q('tf_zam_cult', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: `True or false? Zamindars were a landed class who mainly cultivated their fields with their own labour.`,
  sol: `They did not directly cultivate; they enjoyed privileges through caste and services to the state, and others worked their lands.`,
}));
Q('ar_zam_conq', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: `Many zamindars owed their position to conquest or to colonising new land.`,
  r: `Zamindars enjoyed social privileges by virtue of their caste.`,
  sol: `Both are true, but caste privilege does not explain how a family came to hold land through conquest or settlement.`,
}));
Q('ar_forest', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: `Forest produce such as honey, beeswax and gum lac reached distant markets.`,
  r: `The Mughal state placed no demands on forest peoples and had no dealings with them.`,
  sol: `The trade is recorded; the second claim is false, since the state asked for elephants as tribute and dealt with forest chiefs.`,
}));
Q('s_forest_trade', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Name two ways in which the state and trade affected forest peoples in the Mughal period.`,
  model: `The state asked forest peoples for **elephants as peshkash**, a form of tribute. **Trade in forest produce** such as honey, beeswax and gum lac with distant markets also changed their lives, and some chiefs became zamindars or kings.`,
  sol: `One effect from the state and one from trade.`,
  scheme: [[`Elephants as peshkash`, 1], [`Trade in forest produce`, 1]],
}));
Q('s_zamindar', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `An imagined zamindar sells part of his milkiyat land to a merchant. He still collects the revenue of his villages for the state. What two things does this suggest about the nature of a zamindar's rights?`,
  model: `**Milkiyat** was personal property, so it could be sold like any holding. His role in **collecting revenue for the state** was a separate right or service, not the same as owning every field in his villages.`,
  sol: `Property that can be sold, set beside a duty to the state that continues.`,
  scheme: [[`Milkiyat as saleable personal property`, 1], [`Revenue role as a separate right or service`, 1]],
}));
Q('s3_zam_both', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `An imagined note says a zamindar lent seed to his tenants in a bad year but also made them work on his fort without wages. Explain what this shows about zamindars and peasants, and why many peasant revolts could still be led by zamindars.`,
  model: `The note shows **two sides** of the relation: **patronage** (seed in a bad year) and **exploitation** (unpaid labour). Because a zamindar could be both protector and oppressor, peasants might follow him when he defied the state, and many zamindar-led revolts had **peasant support**, even if the same tenants resented his demands in other years.`,
  sol: `The two sides of the relation and the reason a revolt could unite both.`,
  scheme: [[`Patronage shown`, 1], [`Exploitation shown`, 1], [`Why peasants could still support a zamindar-led revolt`, 1]],
}));
Q('l_zam', long({
  t: 3, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the position, powers and role of zamindars in the Mughal countryside.`,
  model: `1. **Position:** a landed class that did not cultivate directly but had social and economic privileges by caste and service to the state.\n2. **Property:** they held milkiyat lands that they could sell, bequeath or mortgage.\n3. **Revenue:** they collected revenue on behalf of the state.\n4. **Force:** they kept forts and armed contingents; the Ain records over four million infantry and about 384,000 cavalry for the zamindars as a whole.\n5. **Rise and peasants:** many rose by conquest or colonising new land; their relation with peasants combined exploitation and patronage, and many revolts were zamindar-led with peasant support.`,
  sol: `Position, property, revenue role, armed strength and the origin and peasant relations.`,
  scheme: [[`Position and privileges`, 1], [`Milkiyat`, 1], [`Revenue collection`, 1], [`Forts and armed forces`, 1], [`Rise and relation with peasants`, 1]],
}));
Q('sb_zamindar', source({
  t: [3, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined revenue official's note, and answer the questions that follow. ${IMAG}`,
  passage: `**An official's note on a zamindar (imagined)**\n\nI have inspected the lands of the zamindar of the river villages. He holds the best fields as his own property and lets them to tenants; he has built a small fort and keeps about two hundred horsemen and many foot soldiers, which he says are for the emperor's service. He collects the revenue of forty villages and sends it to the treasury, but each year the sum he delivers is below the assessment. He says the rains were poor. His tenants say that he has raised the share he takes from them and has had them cut wood for his fort without wages. In the dry months he opened his own grain stores to the villagers, and several headmen speak well of him.`,
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: `What name is given to lands that a zamindar held as personal property?`, model: `**Milkiyat.**`, sol: `Such lands could be sold, bequeathed or mortgaged.`, scheme: [[`Milkiyat`, 1]] })),
    child('b', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: `From the note, give one reason why peasants might have supported this zamindar in a dispute with the state.`, model: `He **opened his grain stores** in the dry months, so villagers saw him as a source of help.`, sol: `Look for an act of help that could win loyalty.`, scheme: [[`Grain stores or similar help`, 1]] })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: `**Either** (i): The official's account and the zamindar's explanation of the shortfall differ. Name two further kinds of evidence a historian could use to decide between them.`, model: `(1) **Records of the rains and harvests** of those years in the villages. (2) **The villages' own accounts or tenants' petitions**, which would show what they paid.`, sol: `Two kinds of evidence from outside the two accounts.`, scheme: [[`Evidence of rains and harvests`, 1], [`Villagers' accounts or petitions`, 1]] }),
    [short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): Explain two ways in which the note itself may be one-sided.`, model: `(1) The writer is a **revenue official**, so he may stress the shortfall in what reached the state. (2) He reports the **tenants' complaints** but not the zamindar's own account of what he spent, so one party's version is missing.`, sol: `Two sources of bias in the official's position and reporting.`, scheme: [[`The writer's official interest`, 1], [`A party's version missing`, 1]] })]),
  ],
}));

// ================================================================ t04 Land revenue system and the flow of silver
Q('m_jama_hasil', mcq({
  t: 4, d: 1, c: 'recall',
  stem: `In the Mughal land revenue system, what was the difference between jama and hasil?`,
  opts: [`Jama was the amount assessed and hasil the amount actually collected`, `Jama was the amount paid in cash and hasil the amount paid in kind`, `Jama was revenue from cultivated land and hasil from forest land`, `Jama was the share of the zamindar and hasil the share of the state`],
  sol: `One word names the assessment and the other the collection, so the two could differ in any year.`,
}));
Q('m_land_data', mcq({
  t: 4, d: 3, c: 'application',
  stem: `An imagined village accountant's register lists the village's land in four classes: polaj, 120 bighas; parauti, 60 bighas; chachar, 45 bighas; and banjar, 75 bighas. Which statement follows from the register?`,
  opts: [
    `Polaj, cultivated every year, was 40 per cent of the whole, and chachar was 15 per cent`,
    `Polaj was 20 per cent of the whole and parauti was 40 per cent`,
    `Banjar was 15 per cent of the whole and chachar was 25 per cent`,
    `Land cultivated every year or left fallow for a time to recover made up only 40 per cent`,
  ],
  sol: `The total is 300 bighas. Polaj is 120 of 300, which is 40 per cent, and chachar is 45 of 300, which is 15 per cent. Polaj and parauti together make 180 of 300, which is 60 per cent.`,
}));
Q('m_shortfall', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `An imagined district's records give jama and hasil in thousands of rupees. Year 1: jama 200, hasil 190. Year 2: jama 200, hasil 120. Year 3: jama 210, hasil 189. Which inference is the most careful?`,
  opts: [
    `Year 2 had the largest gap, 40 per cent of the jama, but the records do not say whether failed rains, flight of peasants or lax collection caused it`,
    `Year 3 had the largest shortfall because its jama was the highest`,
    `Year 2 proves that the peasants of the district were in revolt`,
    `Year 1 shows that the assessment was too low`,
  ],
  sol: `The gaps are 10, 80 and 21, which are 5, 40 and 10 per cent of the jama. The figures show how large the gaps were; they do not show why.`,
}));
Q('m_mansab', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: `Two imagined mansabdars have these ranks. Karan: zat 1,000 and sawar 400. Imran: zat 800 and sawar 600. Which statement is correct?`,
  opts: [
    `Karan has the higher personal rank and salary rank, while Imran must maintain more horsemen`,
    `Imran has the higher personal rank and must also maintain more horsemen`,
    `Karan has the higher personal rank and must also maintain more horsemen`,
    `They have the same personal rank, but Karan must maintain more horsemen`,
  ],
  sol: `Zat is personal rank and salary, and sawar is the number of horsemen to maintain; compare each number with the right meaning.`,
}));
Q('m_silver_weaken', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: `Historians argue that the inflow of silver helped the Mughal state to collect revenue in cash. Which finding about an imagined province would most weaken this view for that province?`,
  opts: [
    `Records showing that in years when much silver reached its ports, its revenue was still paid almost entirely in kind`,
    `Records showing its mints striking more coins in such years`,
    `Records showing that its revenue demands were fixed in cash`,
    `Records of merchants paying silver for textiles at its ports`,
  ],
  sol: `The claim links silver to cash collection. Evidence that silver arrived with no change in how revenue was paid breaks the link; the other findings fit it.`,
}));
Q('m_silver_fit', mcq({
  t: 4, d: 2, c: 'analysis',
  stem: `A historian has a traveller's remark that silver from all over the world came to India, the ledger of a mint, and a revenue register. For which question is the mint ledger the most useful evidence?`,
  opts: [
    `How many coins were struck in particular years, which can be set beside accounts of silver arriving`,
    `How a foreign visitor explained the flow of silver`,
    `How much revenue a village was assessed to pay`,
    `What the emperor thought about foreign trade`,
  ],
  sol: `A mint ledger records production of coin. A visitor's explanation, village assessments and the emperor's views are better found in other documents.`,
}));
Q('m_silver_alt', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: `An imagined province shows a steep rise in the revenue collected in cash between 1580 and 1650. A historian suspects the inflow of silver but knows that more land under cultivation could also explain it. Which further evidence would best help her separate the two explanations?`,
  opts: [
    `Records of the area under cultivation and of coin struck in the province across the same years`,
    `A list of the crops that came from the Americas`,
    `A portrait of the governor of the province`,
    `A chronicle's praise of the emperor's generosity`,
  ],
  sol: `Competing explanations are told apart by data that bear on each: cultivated area for the one, coin supply for the other. The remaining items bear on neither.`,
}));
Q('mt_land', match({
  t: 4, d: 1, c: 'recall',
  stem: `Match each class of land with its description.`,
  pairs: [
    [`Polaj`, `Cultivated every year and never left fallow`],
    [`Parauti`, `Left fallow for a time to recover its strength`],
    [`Chachar`, `Left fallow for three or four years`],
    [`Banjar`, `Left uncultivated for five years or more`],
  ],
  sol: `The classes run from constant use to long rest.`,
}));
Q('ord_chrono', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: `Arrange these events in chronological order, earliest first.`,
  items: [`Voyages of exploration open the Americas to world trade`, `Abu'l Fazl completes the Ain-i Akbari`, `Shah Jahan's officers build the Shah Nahr canal in the Punjab`, `An Italian traveller passes through India`],
  sol: `They fall in the years from 1492, in 1598, in Shah Jahan's reign (1628 to 1658) and about 1690.`,
}));
Q('ord_cause', ord({
  t: 4, d: 3, c: 'understanding', marks: 1,
  stem: `Arrange these links in the order in which each led to the next.`,
  items: [`Voyages of exploration open the Americas and expand world trade`, `Foreign merchants seek Indian textiles and spices`, `Silver bullion flows into India to pay for them`, `The Mughal state finds it easier to collect revenue in cash`],
  sol: `Each step makes the next possible: trade creates demand, demand is paid for in silver, and silver supplies coin.`,
}));
Q('fb_amil', fb({
  t: 4, d: 1, c: 'recall',
  stem: `The official who collected land revenue for the Mughal state was called the ___.`,
  acc: [[`amil-guzar`, `amil guzar`, `amilguzar`, `amil`]],
  sol: `The revenue collector was the amil-guzar.`,
}));
Q('tf_silver', tf({
  t: 4, d: 1, c: 'recall', ans: true,
  stem: `True or false? In the sixteenth and seventeenth centuries silver bullion flowed into India in payment for goods such as textiles and spices.`,
  sol: `Demand for Indian goods abroad was met largely with silver.`,
}));
Q('ar_jama', ar({
  t: 4, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: `The jama recorded for a province shows what the treasury expected, not necessarily what it received.`,
  r: `Jama was the amount assessed, while hasil was the amount actually collected.`,
  sol: `The difference between the two terms is exactly why an assessed figure cannot stand for receipts.`,
}));
Q('ar_silver_port', ar({
  t: 4, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `Large silver imports at a port do not by themselves prove that cash revenue grew in the interior.`,
  r: `Silver that reaches a port may be spent, hoarded or made into ornaments before it reaches the revenue-paying villages or the treasury.`,
  sol: `The missing link between arrival and spread is the reason caution is needed, so R explains A.`,
}));
Q('s_revenue', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain the terms jama and hasil, and say who the amil-guzar was.`,
  model: `**Jama** was the amount of revenue assessed; **hasil** was the amount actually collected. The **amil-guzar** was the revenue collector, the official who carried out the collection for the state.`,
  sol: `The two terms and the collector's office.`,
  scheme: [[`Jama and hasil`, 1], [`The amil-guzar`, 1]],
}));
Q('s_silver', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `How did silver come to flow into India in the sixteenth and seventeenth centuries, and how did this help the Mughal state?`,
  model: `Voyages of exploration and the opening of the Americas widened world trade, and demand for Indian textiles and spices was met with **silver bullion** that came into India. This supplied the coin that helped the Mughal state to collect its revenue in **cash**.`,
  sol: `The trade that brought silver and its use in revenue.`,
  scheme: [[`Trade and silver bullion`, 1], [`Help in collecting revenue in cash`, 1]],
}));
Q('s_land_data', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: `An imagined register shows 60 bighas of polaj and 40 bighas of parauti, of which 10 are under crop this year. The assessment is 4 rupees for each bigha under crop. Find the jama, and the share of the cultivated land that is polaj.`,
  model: `Land under crop is 60 + 10 = 70 bighas. **Jama = 70 × 4 = 280 rupees.** Polaj is 60 of these 70 bighas, about 86 per cent, because polaj is cultivated every year.`,
  sol: `Cropped area and jama, then the polaj share.`,
  scheme: [[`Jama of 280 rupees`, 1], [`Polaj share of about 86 per cent`, 1]],
}));
Q('s3_revenue', short({
  t: 4, d: 2, c: 'application', marks: 3, wl: S3,
  stem: `An imagined revenue official finds that land a village register lists as banjar has been cleared and sown for two years in a row. Explain how its classification and the revenue demand on it should change, and why the state measured cultivable as well as cultivated land. Three points.`,
  model: `(1) It no longer fits **banjar**, land uncultivated for five years or more, and would now count as cultivated land, **polaj** if it went on being sown every year. (2) Cropped land carried a revenue demand, so the **jama would rise**. (3) Measuring **cultivable** land let the state see land that could be brought under the plough and plan to extend cultivation and revenue.`,
  sol: `Reclassification, the effect on the demand and the purpose of measuring cultivable land.`,
  scheme: [[`Reclassified from banjar`, 1], [`Jama rises`, 1], [`Purpose of measuring cultivable land`, 1]],
}));
Q('s3_silver_alt', short({
  t: 4, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: `An imagined province shows a steep rise in cash revenue between 1580 and 1650. Give three possible explanations other than a higher rate of assessment, and say what evidence could separate them.`,
  model: `(1) **More silver** reached the province, so cash was easier to find. (2) **More land** came under cultivation, so there was more to assess. (3) **Prices rose**, so the same crop fetched more coin. Mint records, measurement records of cultivated area and price records for the same years could tell these apart.`,
  sol: `Three rival explanations with the evidence that bears on each.`,
  scheme: [[`More silver`, 1], [`More land or higher prices`, 1], [`Evidence to separate them`, 1]],
}));
Q('l_revenue', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Assess how far the Mughal land revenue system depended on the accurate measurement of land.`,
  model: `1. **Foundation:** zabt under Akbar and Todar Mal fixed revenue on measured land.
2. **Classes:** the four land classes needed knowledge of cultivation over several years.
3. **Gap:** jama and hasil differed in practice because of weather, flight of peasants and local officials.
4. **Intermediaries:** zamindars, headmen and patwaris mediated measurement, so local power could shape the figures.
5. **Judgement:** measurement was the foundation of the system's claims, but collection depended as much on local intermediaries and harvests, so accuracy was only part of the story.`,
  sol: `Measurement, classes, the jama-hasil gap, local intermediaries and a weighed verdict.`,
  scheme: [[`Measurement as foundation`, 1], [`Land classes`, 1], [`Gap between jama and hasil`, 1], [`Role of local intermediaries`, 1], [`Weighed judgement`, 1]],
}));
Q('l_silver', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Assess how far the flow of silver explains the Mughal state's ability to collect land revenue in cash.`,
  model: `1. **The flow:** exploration and the opening of the Americas expanded trade, and silver came into India to pay for textiles and spices.\n2. **The link:** more bullion meant more coin, which made cash payment of revenue easier.\n3. **Evidence:** an Italian traveller who passed through India about 1690 described silver from many lands reaching India, but a visitor's remark is not a count of coin.\n4. **Other factors:** the machinery of measurement and assessment, and markets that let peasants sell crops for cash, also mattered.\n5. **Judgement:** silver was an important condition but not the sole cause; the case is strongest when mint and revenue records agree.`,
  sol: `The flow, the link, the strength of the evidence, other factors and a balanced verdict.`,
  scheme: [[`The flow of silver`, 1], [`The link to cash revenue`, 1], [`Strength of the evidence`, 1], [`Other factors`, 1], [`Balanced judgement`, 1]],
}));
Q('sb_register', source({
  t: [4, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined village accountant's register, and answer the questions that follow. ${IMAG}`,
  passage: `**Entries from a village accountant's register (imagined)**\n\nVillage of the Four Wells. Total land measured: 200 bighas. Polaj: 90 bighas. Parauti: 40 bighas, of which 25 are under crop this year. Chachar: 30 bighas. Banjar: 40 bighas. Assessment for the year: 3 rupees for every bigha under crop. Revenue paid in by the end of the harvest: 190 rupees. Note: the headman and I measured the fields at the start of the year; the rains failed in the autumn season and two households left for another village.`,
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: `What term is used for the revenue assessed, as distinct from the revenue actually collected?`, model: `**Jama.**`, sol: `The amount collected is hasil.`, scheme: [[`Jama`, 1]] })),
    child('b', short({ t: 4, d: 3, c: 'analysis', marks: 1, stem: `The accountant says that he and the headman measured the fields at the start of the year. Why does this matter when a historian judges the jama figure?`, model: `The jama rests on a **local measurement**, so it is more than a guess; but the **headman had an interest in a low figure**, so the measurement could be shaded.`, sol: `Weigh the value of a measured basis against the interest of a local party in it.`, scheme: [[`Measurement gives a basis, but the headman's interest may shade it`, 1]] })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: `**Either** (i): Work out the jama for the year and the amount collected as a percentage of it.`, model: `Land under crop is 90 + 25 = 115 bighas, so **jama = 115 × 3 = 345 rupees**. The amount collected, 190 rupees, is about **55 per cent** of 345.`, sol: `Jama from the cropped area, then the percentage collected.`, scheme: [[`Jama of 345 rupees`, 1], [`About 55 per cent collected`, 1]] }),
    [short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): Give two reasons in the register for the amount collected falling short of the assessment, and one further question a historian should ask.`, model: `(1) The **rains failed** in the autumn season. (2) **Two households left** for another village, so there were fewer payers. A further question: how much of the shortfall was later recovered or written off?`, sol: `Two causes recorded in the note and a question that the register leaves open.`, scheme: [[`Failed rains`, 1], [`Households leaving, and a further question`, 1]] })]),
  ],
}));
Q('sb_careri', source({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a SOYL summary of what a traveller's account reports, and answer the questions that follow. ${SUM}`,
  passage: `**What an Italian traveller reported about silver (summary)**\n\nAn Italian traveller who passed through India around 1690 wrote an account of what he saw. Among his remarks was that silver from many parts of the world came into India and then stayed there. He wrote for readers at home, and he travelled along only some routes and stayed in a few towns.`,
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: `Name the Italian traveller who wrote this account.`, model: `**Giovanni Careri.**`, sol: `He passed through India about 1690.`, scheme: [[`Giovanni Careri`, 1]] })),
    child('b', short({ t: 4, d: 3, c: 'analysis', marks: 1, stem: `What does his remark suggest about the balance of India's trade with other lands at the time?`, model: `India **sold more than it bought**: its exports exceeded its imports, so silver was left in India.`, sol: `Turn the remark about payment into a statement about the balance.`, scheme: [[`Exports exceeded imports`, 1]] })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: `**Either** (i): Give two checks a historian could make on his remark using other evidence.`, model: `(1) **Mint records**, to see whether more coin was struck. (2) **Trading records of merchants and companies**, to see how much silver was paid for Indian goods.`, sol: `Two kinds of record that bear on the claim.`, scheme: [[`Mint records`, 1], [`Trading records`, 1]] }),
    [short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: `**Or** (ii): Explain two ways in which a steady inflow of silver could be linked with the Mughal state's collection of revenue in cash.`, model: `(1) More silver meant more **coin** for the mints to strike, so cash was easier to find. (2) Merchants who paid in silver for goods gave **producers and peasants cash**, which they could use to meet cash demands.`, sol: `Coin supply and cash reaching producers.`, scheme: [[`More coin from the mints`, 1], [`Cash reaching producers`, 1]] })]),
  ],
}));

// ================================================================ t05 Sources: chronicles (Ain-i Akbari)
Q('m_date_register', mcq({
  t: 5, d: 3, c: 'application',
  stem: `An imagined, undated village register says that the fields were measured in the manner described in the Ain-i Akbari and refers to the Ain as a finished work. The Ain was completed in 1598. Which judgement about the register's date is soundest?`,
  opts: [
    `It was written after 1598, though the register alone does not show how long after`,
    `It was written in 1598, the year the Ain was completed`,
    `It was written before 1598, since the Ain describes methods that were already in use`,
    `It cannot be dated, since it names no year`,
  ],
  sol: `Referring to a finished work sets an earliest date. Nothing in the register sets a latest date, and nothing ties it to the year of completion.`,
}));
Q('m_dependent', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: `Two imagined accounts of the land classes of a province give the same figures and the same odd error in adding them up. A historian finds that the second writer, a clerk, copied from the Ain-i Akbari. How should she treat the second account?`,
  opts: [
    `As adding nothing independent, since it repeats the Ain and its error; she should look for records made from village measurement`,
    `As a second confirmation of the figures`,
    `As proof that the Ain's figures were checked against the villages`,
    `As proof that both writers invented the figures`,
  ],
  sol: `Agreement confirms only when sources do not depend on each other. Copying removes that independence without showing the figures to be false.`,
}));
Q('m_ain_conflict', mcq({
  t: 5, d: 4, c: 'analysis',
  stem: `The Ain-i Akbari's count of the kinds of crops grown in a province is larger than the number of crops entered in an imagined contemporary register of one village of that province. What is the best response?`,
  opts: [
    `Compare scale and purpose: the Ain sums up a whole province over both seasons, while one register covers a single village, so they need not conflict; check whether the village was typical`,
    `Reject the Ain, since a village register is always more accurate`,
    `Reject the register, since the Ain was written by the emperor's historian`,
    `Conclude that the village was not in the province`,
  ],
  sol: `The two records measure different things, a province and a village. A conflict is real only if like is compared with like.`,
}));
Q('s_source_plan', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `A student wants to study how peasants of a village in Rajasthan used the panchayat in the seventeenth century. Name two kinds of source she should use besides the Ain-i Akbari and say what each could show.`,
  model: `(1) **Revenue records from Rajasthan** of the seventeenth and eighteenth centuries, which show the demands made on villages. (2) **Petitions to the panchayat**, which show what complaints were brought to it and against whom.`,
  sol: `Two local kinds of source, matched to the question.`,
  scheme: [[`Revenue records and what they show`, 1], [`Petitions and what they show`, 1]],
}));
Q('s3_ain_limits', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `An imagined historian wishes to answer three questions: how many kinds of crops a province grew, the caste composition of zamindars in every province, and wages in a Bengal village. Say which question the Ain-i Akbari can best answer, and give two cautions.`,
  model: `It can best answer the **first**, since the Ain records the number of crops grown in provinces over the two seasons. **Cautions:** (1) its data were **not collected evenly**, so the caste of zamindars is missing for some provinces; (2) its prices and wages come largely from **Agra** and its surroundings, so a Bengal village needs other records.`,
  sol: `The best-fitting question and two limits of the source.`,
  scheme: [[`First question named with a reason`, 1], [`Uneven coverage`, 1], [`Wages from Agra`, 1]],
}));
