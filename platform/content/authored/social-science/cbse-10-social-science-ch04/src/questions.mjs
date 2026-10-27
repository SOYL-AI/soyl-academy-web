// CBSE 10 Social Science, ch04 The Age of Industrialisation — question bank. The chapter is assessed
// only in school periodic assessment (board_assessed: false), so the bank is lighter than a board
// chapter's and pitched at periodic-test style. Every source and scenario is written by SOYL;
// no NCERT boxed source, exercise or board-paper item is reused.
import { Q, mcq, ar, tf, fb, match, ord, mapQ, short, long, source, caseQ, child } from './lib.mjs';

const S2 = [25, 40];
const S3 = [40, 60];
const L5 = [100, 120];

// ================================================================ t01 Proto-industrialisation
Q('m_proto_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The phase of large-scale production for an international market that took place **before factories**, mostly in rural homes, is known as',
  opts: ['proto-industrialisation', 'liberalisation', 'globalisation', 'the industrial revolution'],
  sol: 'Historians call this early phase proto-industrialisation ("proto" = first, earliest form). The industrial revolution came later, with factories; liberalisation and globalisation are modern economic terms.',
}));
Q('m_guilds', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why did merchants in seventeenth- and eighteenth-century England and Europe find it hard to expand production **in towns**?',
  opts: [
    'Powerful urban crafts and trade guilds restricted who could produce and controlled competition and prices',
    'Towns had no workers at all',
    'Factories in towns had already captured the whole market',
    'Governments had banned all trade in towns',
  ],
  sol: 'Guilds of producers, often holding monopoly rights from rulers, controlled training, production, prices and entry of newcomers, so merchants turned to the countryside. Towns did have workers, factories had not yet appeared, and trade was not banned.',
}));
Q('m_peasants', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why were many poor peasants in the English countryside willing to work for town merchants?',
  opts: [
    'Common lands were being enclosed and their small plots could not support the family, so they needed extra income',
    'They were forced by law to leave farming completely',
    'Merchants offered them permanent jobs in city factories',
    'They had become rich and wanted to invest in trade',
  ],
  sol: 'Enclosure of the commons removed a source of livelihood, and small plots were not enough, so rural families welcomed paid work they could do at home while still farming. They were not forced out of farming, there were no factory jobs yet, and they were poor, not rich.',
}));
Q('m_family', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'In an imagined English village in 1720, a merchant leaves wool with the Taylor family. The mother and daughters spin, the father weaves in winter, and the family still farms its strip of land. This arrangement is an example of',
  opts: ['proto-industrial production', 'factory production', 'a trade guild', 'a managing agency'],
  sol: 'Production for a merchant, inside a farm household, using family labour, alongside farming, is the proto-industrial system. There is no factory, it is not a guild of town producers, and managing agencies belong to colonial India.',
}));
Q('m_control', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Who controlled the network of production and trade in the proto-industrial system?',
  opts: [
    'Merchants based in towns, who supplied raw material and sold the finished goods',
    'The rural families who did the spinning and weaving',
    'Factory owners in big industrial cities',
    'Trade guilds in the villages',
  ],
  sol: 'Production was spread over many rural households, but merchants controlled it: they gave advances and raw materials, moved goods between stages and sold the finished product. Factories came later, and guilds were urban.',
}));
Q('ar_countryside', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'Merchants in the seventeenth century moved production to the countryside.',
  r: 'In towns, urban crafts and trade guilds restricted the entry of new producers.',
  sol: 'Both are true, and R explains A: because guilds blocked expansion in towns, merchants turned to rural producers.',
}));
Q('tf_guild', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Trade guilds were associations of producers that trained craftspeople and controlled production, prices and competition.',
  sol: 'That is what guilds did; rulers often gave them monopoly rights over particular products.',
}));
Q('fb_proto', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Before factories, merchants gave money and raw materials to rural families to produce for an international market. Historians call this phase ___-industrialisation.',
  acc: [['proto']],
  sol: 'This phase is proto-industrialisation.',
}));
Q('ord_proto', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the stages of an imagined proto-industrial chain for woollen cloth in the correct order.',
  items: [
    'A town merchant buys raw wool',
    'He leaves it with rural families, who spin it into yarn',
    'Other rural households weave the yarn into cloth',
    'The cloth is finished and dyed in a town workshop',
    'The merchant sells the cloth in an overseas market',
  ],
  sol: 'Raw material first, then spinning, then weaving, then finishing in town, and finally sale abroad by the merchant who controlled the chain.',
}));
Q('s_proto', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by proto-industrialisation?',
  model: '1. It was the phase of **large-scale production for an international market** that came **before factories**.\n2. Merchants gave **advances and raw material** to **rural households**, who produced at home, often alongside farming.',
  sol: 'Define the phase and describe how production was organised.',
  scheme: [['Production for international market before factories', 1], ['Merchants and rural households', 1]],
}));
Q('s_guild', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What were trade guilds? Why did they push merchants towards the countryside?',
  model: '1. **Guilds** were associations of producers that **trained craftspeople** and controlled **production, prices and competition**.\n2. They **restricted new producers** in towns, so merchants could not expand there and turned to **rural families**.',
  sol: 'Meaning of guilds, then their effect on merchants.',
  scheme: [['Meaning of guilds', 1], ['How they pushed merchants to villages', 1]],
}));
Q('s3_proto_benefit', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How did the proto-industrial system benefit both the merchants and the rural families?',
  model: '1. **Merchants** escaped guild controls in towns and could tap a large, **cheap rural workforce** to meet growing world demand.\n2. **Rural families** whose small plots were not enough earned **extra income** while staying on the land.\n3. Families used the labour of **all members**, and could keep farming their plots alongside the work.',
  sol: 'One benefit to merchants, two to rural families (extra income; staying on the land with family labour).',
  scheme: [['Benefit to merchants', 1], ['Extra income for families', 1], ['Staying on the land with family labour', 1]],
}));
Q('l_proto', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain how and why production for international markets moved to the countryside in seventeenth- and eighteenth-century Europe.',
  model: '1. **Rising demand:** expansion of **world trade and colonies** increased demand for goods, especially cloth.\n2. **Guild barriers:** in towns, **crafts and trade guilds** restricted production and new producers, often with **monopoly rights** from rulers.\n3. **Rural need:** with **commons enclosed** and small plots, poor peasants needed **extra income**.\n4. **The system:** town **merchants gave advances and raw material** to rural households, who spun and wove at home using **family labour**.\n5. **Control:** merchants linked the stages and sold the goods abroad, so a **town-controlled network** relied on **countryside labour**.',
  sol: 'Two causes on the merchants\' side (demand, guilds), one on the peasants\' side, then how the system worked and who controlled it.',
  scheme: [['Rising demand', 1], ['Guild barriers in towns', 1], ['Peasants\' need for income', 1], ['How the system worked', 1], ['Merchant control of the network', 1]],
}));

// ================================================================ t02 Factories, hand labour and steam power, workers; industrialisation in the colonies
Q('m_factory_first', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which industry is often seen as the first symbol of the new factory age in Britain?',
  opts: ['Cotton', 'Silk weaving by hand', 'Pottery', 'Shipbuilding'],
  sol: 'Cotton textiles led the first phase of factory production in late eighteenth-century Britain; the cotton mill became the symbol of the new era.',
}));
Q('m_arkwright', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Richard Arkwright\'s cotton mill changed production mainly because',
  opts: [
    'costly new machines and all the stages of production were brought under one roof and one management',
    'it allowed each worker to spin at home',
    'it used only hand-operated tools',
    'it was owned by a trade guild',
  ],
  sol: 'Bringing machines and processes into the mill allowed close supervision, quality control and regulation of labour, which had been hard in scattered rural homes.',
}));
Q('m_watt', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Who improved the steam engine invented by Newcomen and patented the new engine in 1781?',
  opts: ['James Watt', 'Richard Arkwright', 'James Hargreaves', 'Matthew Boulton'],
  sol: 'James Watt improved Newcomen\'s engine; his industrialist friend Matthew Boulton manufactured it. Arkwright built the cotton mill; Hargreaves devised the spinning jenny.',
}));
Q('m_slow_tech', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why did new technology spread **slowly** in nineteenth-century British industry?',
  opts: [
    'Machines were expensive, often broke down and were costly to repair, so industrialists were cautious',
    'Inventors refused to sell their machines',
    'The government banned steam engines',
    'There was a shortage of workers, so nobody needed machines',
  ],
  sol: 'High cost, breakdowns and doubts about the promised gains made industrialists slow to buy machines. Inventors did sell them, there was no ban, and Britain had plenty of workers.',
}));
Q('m_handmade', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why did the upper classes in Victorian Britain prefer handmade goods?',
  opts: [
    'They were seen as a sign of refinement and class, being better finished and individually designed',
    'Handmade goods were always cheaper than machine-made goods',
    'Machine-made goods were banned in Britain',
    'Handmade goods were made only in factories',
  ],
  sol: 'Aristocrats and the wealthy valued individually crafted goods as symbols of status; machine-made goods were for the mass market and for export to colonies.',
}));
Q('m_seasonal', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined London bookbinder in the 1840s has heavy work only before Christmas and little for the rest of the year. Why would he prefer hand labour to buying machines?',
  opts: [
    'He could hire workers just for the busy season instead of tying up money in machines used only part of the year',
    'Machines worked only in winter',
    'There were no workers available in London',
    'The law required bookbinders to use machines',
  ],
  sol: 'In seasonal trades, hiring extra hands for the peak was cheaper than buying costly machines that would stand idle. Labour was plentiful, machines were not seasonal, and no law required them.',
}));
Q('m_jenny', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why did some women who lived by hand-spinning attack the spinning jenny when it was introduced in the woollen industry?',
  opts: [
    'They feared the machine would take away their work and income',
    'The machine was too slow',
    'It produced cloth of poor colour',
    'It was owned by the government',
  ],
  sol: 'The spinning jenny let one worker run several spindles, so it reduced the demand for hand spinners. Fear of unemployment made workers hostile to the new technology.',
}));
Q('m_america', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Industrialists in nineteenth-century America were keener on mechanisation than many in Britain. The best explanation is that',
  opts: [
    'labour was scarce in America, whereas Britain had plenty of cheap labour',
    'America had no raw materials',
    'British law banned machines',
    'American workers refused to use their hands',
  ],
  sol: 'Where labour is scarce and costly, machines save money; where it is plentiful and cheap, as in Victorian Britain, hand labour stays attractive.',
}));
Q('m_ports', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which pre-colonial port on the Gujarat coast linked India to the Gulf and Red Sea ports?',
  opts: ['Surat', 'Masulipatnam', 'Hooghly', 'Calcutta'],
  sol: 'Surat served the western sea trade. Masulipatnam (Coromandel coast) and Hooghly (Bengal) traded with Southeast Asia; Calcutta grew later under colonial rule.',
}));
Q('m_gomastha', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Gomasthas were',
  opts: [
    'paid servants of the East India Company who supervised weavers, collected supplies and checked the quality of cloth',
    'Indian bankers who lent money to European companies',
    'guild leaders in English towns',
    'jobbers who recruited workers for Bombay mills',
  ],
  sol: 'The Company appointed gomasthas to control weavers directly. Jobbers belong to later Indian factories; guilds were European.',
}));
Q('m_advances', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'How did the East India Company\'s system of advances affect weavers?',
  opts: [
    'Weavers who took loans had to hand over their cloth to the Company\'s agent and lost the freedom to sell to other buyers',
    'It let weavers sell to any buyer at the highest price',
    'It made weavers the owners of Company factories',
    'It ended all trade in Indian cloth',
  ],
  sol: 'The loan tied the weaver to the Company: cloth went to the gomastha at a low price, and the bargaining power weavers once had with many buyers disappeared.',
}));
Q('m_civil_war', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'How did the American Civil War of the 1860s hurt Indian weavers?',
  opts: [
    'Britain bought more raw cotton from India, so its price rose and weavers could not get enough at a fair price',
    'It stopped all imports of Manchester cloth into India',
    'It created a large demand for Indian fine cloth in America',
    'It ended the East India Company\'s rule',
  ],
  sol: 'With American cotton cut off, Britain turned to India; exports of raw cotton rose, its price shot up, and weavers were starved of supplies.',
}));
Q('m_manchester', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the early nineteenth century, which **two** problems did Indian cotton weavers face as Manchester goods spread?',
  opts: [
    'Their export market collapsed, and the local market was flooded with cheaper machine-made imports',
    'They had too many buyers abroad and too much raw cotton',
    'The Company paid them very high prices and stopped advances',
    'Factories in India bought all their cloth',
  ],
  sol: 'Duties in Britain shut out Indian cloth, and cheap Manchester cloth undersold weavers at home. Indian factories came later and competed with them too.',
}));
Q('ar_handlabour', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'Many industrialists in Victorian Britain preferred hand labour to machines.',
  r: 'There was no shortage of labour, and workers could be hired cheaply.',
  sol: 'Both are true, and R explains A: plentiful, cheap labour made costly machines less attractive.',
}));
Q('ar_ports', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Surat and Hooghly declined in the second half of the eighteenth century.',
  r: 'Bombay and Calcutta were port cities on the Indian coast.',
  sol: 'Both are true, but R does not explain A. The old ports declined because European companies gained control of trade and credit dried up; trade shifted to the new colonial ports of Bombay and Calcutta.',
}));
Q('ar_weavers', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Weavers in many parts of Bengal and the Carnatic deserted their villages under Company rule.',
  r: 'The Company paid weavers higher prices than other buyers did.',
  sol: 'A is true. R is false: Company prices were low, and weavers were tied by advances and harassed by gomasthas, which is why many left.',
}));
Q('ar_steam', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'Steam engines were adopted quickly by almost all British industries soon after 1781.',
  r: 'New machines were expensive and industrialists were cautious about buying them.',
  sol: 'A is false: the steam engine spread slowly. R is true, and it is the reason for the slow spread.',
}));
Q('tf_handmade', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? In Victorian Britain, the upper classes preferred machine-made goods to handmade ones.',
  sol: 'They preferred handmade goods as a sign of refinement and class; machine-made goods were for the mass market and export.',
}));
Q('tf_export', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Before machine industries, Indian silk and cotton goods dominated the international market in textiles.',
  sol: 'Indian textiles, especially the finer varieties, were in great demand across Asia and Europe before the rise of factory production.',
}));
Q('fb_jenny', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The spinning ___, devised by James Hargreaves in 1764, let one worker turn several spindles at once.',
  acc: [['jenny']],
  sol: 'It was the spinning jenny.',
}));
Q('fb_gomastha', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Paid servants of the East India Company who supervised weavers and checked the quality of cloth were called ___.',
  acc: [['gomasthas', 'gomastha']],
  sol: 'They were gomasthas.',
}));
Q('mt_people', match({
  t: [2, 3], d: 2, c: 'understanding',
  stem: 'Match each person with what they are remembered for in this chapter.',
  pairs: [
    ['Richard Arkwright', 'Created the cotton mill, bringing machines and processes under one roof'],
    ['James Watt', 'Improved the steam engine and patented it in 1781'],
    ['James Hargreaves', 'Devised the spinning jenny in 1764'],
    ['Dwarkanath Tagore', 'Made a fortune in the China trade and invested in industry in Bengal'],
  ],
  sol: 'Arkwright, the mill; Watt, the steam engine; Hargreaves, the jenny; Dwarkanath Tagore, an early Bengali industrial investor.',
}));
Q('ord_weavers', ord({
  t: 2, d: 3, c: 'analysis', marks: 1,
  stem: 'Arrange these developments affecting Indian weavers in chronological order.',
  items: [
    'The East India Company gains political power in Bengal',
    'Gomasthas and advances tie weavers to the Company',
    'Manchester cloth floods the Indian market',
    'The American Civil War pushes up the price of raw cotton',
    'Cotton mills in India begin to produce machine-made cloth on a large scale',
  ],
  sol: 'Political power (1760s) came first, then direct control of weavers; cheap Manchester imports in the early nineteenth century; the American Civil War in the 1860s; and Indian mill production in the late nineteenth century.',
}));
Q('map_ports', mapQ({
  t: 2, d: 2, c: 'application',
  stem: 'Map practice (school periodic test). On an outline political map of India, locate and label these pre-colonial ports of the textile trade:\n\n**A.** the port on the Gujarat coast that traded with the Gulf and Red Sea ports.\n\n**B.** the port on the Coromandel coast that traded with Southeast Asia.\n\n**C.** the port in Bengal that traded with Southeast Asia.',
  places: [['A', 'Surat', 'port'], ['B', 'Masulipatnam', 'port', ['Machilipatnam']], ['C', 'Hooghly', 'port', ['Hugli', 'Hoogly']]],
  sol: 'Step 1: Surat is on the coast of south Gujarat, near the mouth of the Tapi.\nStep 2: Masulipatnam (Machilipatnam) is on the Andhra coast, near the Krishna delta.\nStep 3: Hooghly is on the Hooghly river, north of Kolkata.',
}));
Q('s_hand', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why hand labour remained important in Victorian Britain.',
  model: '1. Labour was **plentiful and cheap**, so industrialists saw little need for **costly machines**.\n2. **Seasonal** trades and goods needing **special designs and shapes** were better made by hand.',
  sol: 'Two reasons: cheap labour; seasonal demand or variety that machines could not handle.',
  scheme: [['Cheap, plentiful labour', 1], ['Seasonal demand or variety of products', 1]],
}));
Q('s_workers', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe two hardships faced by workers who came to British cities in search of work in the early nineteenth century.',
  model: '1. Jobs depended on **friends and relatives** in the factory; newcomers often **waited weeks**, sleeping under bridges or in night shelters.\n2. Much work was **seasonal**, so workers spent long periods **without work** and income.',
  sol: 'Two hardships: finding work; seasonal unemployment (or low real wages).',
  scheme: [['Difficulty of finding work', 1], ['Seasonal unemployment / poverty', 1]],
}));
Q('s_gomastha', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why did weavers often clash with the gomasthas?',
  model: '1. Gomasthas were **outsiders** with no ties to the village; they acted **arrogantly**, came with sepoys and **punished weavers** for delays.\n2. They paid **low prices** for cloth and stopped weavers from selling to other buyers.',
  sol: 'Two causes: harsh behaviour of outsiders; low prices and loss of choice of buyer.',
  scheme: [['Harsh behaviour of outsiders', 1], ['Low prices / no other buyers', 1]],
}));
Q('s3_weavers_decline', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three reasons for the decline of Indian cotton weaving in the nineteenth century.',
  model: '1. **Duties in Britain** on Indian cloth closed the **export market**.\n2. Cheap **machine-made Manchester cloth** flooded the Indian market, and weavers could not match its price.\n3. In the 1860s, rising **raw cotton exports** after the American Civil War made cotton **scarce and costly** for weavers.',
  sol: 'Loss of exports, cheap imports at home, and costly raw cotton.',
  scheme: [['Loss of export market', 1], ['Cheap imports at home', 1], ['Costly raw cotton', 1]],
}));
Q('s3_slow_change', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: '"The pace of industrial change in Britain was slower than the word revolution suggests." Explain.',
  model: '1. **Cotton and metals** grew fast, but most workers stayed in **traditional industries** such as food processing, building and pottery.\n2. Traditional industries changed through **small innovations**, not new machines.\n3. New machines like the **steam engine** were **costly and unreliable**, so they spread slowly.',
  sol: 'Contrast the dynamic sectors with traditional ones, and explain the slow spread of machines.',
  scheme: [['Only some sectors changed fast', 1], ['Traditional industries changed slowly', 1], ['Costly, unreliable machines spread slowly', 1]],
}));
Q('l_weavers', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'How did the East India Company establish control over Indian weavers, and how did the weavers respond?',
  model: '1. **Eliminating traders:** after gaining political power from the 1760s, the Company pushed out the **traders and brokers** linked to cloth trade.\n2. **Gomasthas:** it appointed paid servants to **supervise weavers**, collect supplies and check quality.\n3. **Advances:** weavers who took **loans** for raw material had to sell their cloth only to the gomastha, at **low prices**.\n4. **Responses:** weavers in many villages of the **Carnatic and Bengal** **deserted** their villages and set up looms elsewhere; some, with village traders, **revolted**.\n5. **Later:** many weavers **refused loans**, closed workshops and became **agricultural labourers**.',
  sol: 'Three methods of control, then two kinds of response.',
  scheme: [['Removing traders and brokers', 1], ['Gomasthas', 1], ['System of advances', 1], ['Desertion and revolt', 1], ['Refusing loans; leaving weaving', 1]],
}));
Q('l_handlabour', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"In Victorian Britain, hand labour made better business sense than machines." Evaluate this statement.',
  model: '1. **Agree — cheap labour:** migrants from the countryside made labour **plentiful and cheap**, so machines that needed large capital looked unnecessary.\n2. **Agree — seasons:** in **seasonal** trades (gasworks, bookbinding, Christmas goods), hiring hands for the peak was cheaper than idle machines.\n3. **Agree — variety:** buyers wanted **many designs and shapes**; machines made standard goods, and the rich preferred **handmade** goods.\n4. **But:** in **cotton and metals**, machines raised output and cut costs, and in labour-scarce **America** mechanisation paid off.\n5. **Judgement:** for **most British businesses** of the time the statement holds, because of cheap labour and varied demand, though not for every industry.',
  sol: 'Three supporting reasons, one counter-point, and a judgement.',
  scheme: [['Cheap labour', 1], ['Seasonal demand', 1], ['Variety and taste for handmade goods', 1], ['Counter-point', 1], ['Judgement', 1]],
}));
Q('sb_weaver', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**Petition of the weavers of an imagined village near Santipur, Bengal, to the district officer, 1790s**\n\nWe have woven fine cloth for many generations, and merchants of many places came to buy it. Now the Company\'s gomastha came with his peons and told us to take the Company\'s money. Those who took it must give all their cloth to him alone, at the price he fixes, which is less than the cost of our cotton and our labour. When Ramdas could not finish his piece in time, he was beaten in front of the whole village. Seven families have already left with their looms for the villages of their relatives across the river.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Who was the gomastha?', model: 'A **paid servant of the East India Company** who supervised weavers and collected cloth.', sol: 'Identify the role of the Company\'s agent.', scheme: [['Company\'s paid supervisor of weavers', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'What did taking the Company\'s money force the weavers to do?', model: 'Give **all their cloth to the gomastha alone**, at the **price he fixed**.', sol: 'Find the condition attached to the advance in the petition.', scheme: [['Sell only to the gomastha at his price', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the petition show the weavers\' loss of bargaining power?', model: 'Earlier, **many merchants** came to buy, so weavers could **choose buyers** and bargain. Now advances tie them to **one buyer** who fixes a price **below their costs**.', sol: 'Compare the earlier choice of buyers with the present tie to one buyer and low prices.', scheme: [['Earlier choice of buyers', 1], ['Now one buyer and a low fixed price', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain how the weavers in the source responded to Company control.', model: '**Seven families left** with their looms for relatives\' villages, a common form of **protest by desertion**. By **petitioning** the officer, the others tried to **complain openly** about low prices and violence.', sol: 'Two responses visible in the source: desertion and petitioning.', scheme: [['Desertion', 1], ['Petition / open complaint', 1]] }),
    ]),
  ],
}));
Q('sb_london', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**Letter from Mary Hollis, wife of a London bookbinder, to her sister in Kent (imagined), 1846**\n\nTom had work every day from October to Christmas, binding books for the gift season. Since January the shop has needed only two of its eight men, and Tom walks the city looking for a day\'s work. Last week he found three days digging for the new railway line near the river, and the master there says hundreds more will be needed for the station. Bread costs more than it did when we married, and Tom\'s wages buy less.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'application', marks: 1, stem: 'What kind of unemployment does Tom face in the source?', model: '**Seasonal** unemployment.', sol: 'Work only in the busy season, little after it.', scheme: [['Seasonal unemployment', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which new activity gave Tom some work?', model: 'Work on the **new railway line** (railway and station building).', sol: 'Find the building activity in the letter.', scheme: [['Railway building', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why might Tom\'s employer prefer hand labour to buying machines?', model: 'The shop is busy **only before Christmas**, so it pays to **hire extra hands** for the season instead of buying **costly machines** that would stand **idle** most of the year.', sol: 'Link seasonal demand to the cost of machines.', scheme: [['Seasonal demand', 1], ['Machines costly and idle for much of the year', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What does Mary mean when she says that Tom\'s wages "buy less", and why did this matter to workers?', model: 'Prices such as that of **bread rose**, so the **real value** of wages fell. Even if money wages rose a little, workers\' **standard of living** could fall, especially with long spells **without work**.', sol: 'Explain real wages and their effect on workers\' lives.', scheme: [['Rising prices reduce the value of wages', 1], ['Effect on workers\' living standards', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Factories in India and the market for goods
Q('m_first_mill', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Where did the first cotton mill in India come up, in 1854?',
  opts: ['Bombay', 'Kanpur', 'Madras', 'Ahmedabad'],
  sol: 'The first cotton mill came up in Bombay in 1854. Mills in Kanpur and Ahmedabad followed in the 1860s, and the first spinning and weaving mill of Madras began production in 1874.',
}));
Q('m_jute', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'The first jute mills in India came up in',
  opts: ['Bengal', 'Punjab', 'Gujarat', 'Kerala'],
  sol: 'Jute mills grew around Calcutta in Bengal, where jute was grown; the first was set up in 1855.',
}));
Q('m_china_trade', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'How did many early Indian industrialists, such as Dwarkanath Tagore and some Parsi merchants of Bombay, first accumulate their capital?',
  opts: ['Through trade with China', 'Through land revenue collection', 'Through loans from the WTO', 'By selling machines to Britain'],
  sol: 'Many made fortunes in the China trade before investing in industry. Land revenue and the other options do not describe their route; the WTO did not exist.',
}));
Q('m_agencies', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Until the First World War, European managing agencies in India were mainly interested in',
  opts: [
    'tea and coffee plantations, mining, indigo and jute, mostly for export',
    'cotton cloth for the Indian market only',
    'handloom weaving in villages',
    'printing newspapers in Indian languages',
  ],
  sol: 'Agencies such as Andrew Yule and Bird Heiglers mobilised capital for plantations, mining, indigo and jute, mainly for export trade.',
}));
Q('m_jobber', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In an imagined Bombay mill in 1910, an old and trusted worker brings men from his village, finds them jobs and lends them money in hard times, but also demands gifts for his favours. He is a',
  opts: ['jobber', 'gomastha', 'guild master', 'managing agent'],
  sol: 'Industrialists recruited through jobbers, who gained power over workers. Gomasthas served the Company in the eighteenth century, guilds were European, and managing agents ran companies.',
}));
Q('m_yarn', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why did many Indian cotton mills shift from producing yarn to producing cloth in the early twentieth century?',
  opts: [
    'Yarn exports to China fell as Chinese and Japanese mills supplied that market, and the swadeshi movement boosted demand for Indian cloth',
    'The British government banned yarn production in India',
    'Handloom weavers stopped using mill yarn completely',
    'Cloth needed no raw cotton',
  ],
  sol: 'Losing the China yarn market and gaining a swadeshi-minded home market made cloth the better business. There was no ban, handlooms still used yarn, and cloth needs cotton.',
}));
Q('m_ww1', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'How did the First World War help Indian industry?',
  opts: [
    'Manchester imports declined while British mills served the war, and Indian factories supplied both the home market and army needs',
    'Britain sent many new machines to India for free',
    'All Indian factories were closed during the war',
    'Indian goods could no longer be sold in India',
  ],
  sol: 'With British mills busy with war production, imports fell; Indian mills had a large home market and war orders (jute bags, uniform cloth, tents, boots). After the war, Manchester never recovered its old position.',
}));
Q('m_flyshuttle', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'How did the **fly shuttle** help handloom weavers in the twentieth century?',
  opts: [
    'It raised output per worker and let weavers work larger looms to weave wide cloth',
    'It replaced the need for any yarn',
    'It was a steam engine that ran whole factories',
    'It allowed weavers to export cloth without merchants',
  ],
  sol: 'The fly shuttle, worked by ropes and pulleys, passes the weft through the warp quickly, so weavers produced more and could weave wider pieces.',
}));
Q('m_labels', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A bundle of Manchester cloth sold in India in the 1890s carries the words "MADE IN MANCHESTER" and a picture of the goddess Lakshmi. Why?',
  opts: [
    'To make buyers trust its quality and make the product seem familiar and blessed',
    'Because the law required pictures of goddesses on all goods',
    'To show that the cloth was handmade in India',
    'To discourage Indians from buying it',
  ],
  sol: 'The place of manufacture signalled quality, and a familiar divine image gave the foreign product a sense of approval and closeness to Indian buyers.',
}));
Q('m_swadeshi_ad', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'What new message did many Indian manufacturers put in their advertisements in the early twentieth century?',
  opts: [
    'Buying goods made by Indians is a way of serving the nation',
    'Foreign goods are always better than Indian goods',
    'Only royal families should buy cloth',
    'Advertisements are unnecessary for selling goods',
  ],
  sol: 'Advertisements became a vehicle for the swadeshi message: patriotism meant choosing Indian-made goods.',
}));
Q('ar_ww1', ar({
  t: 3, d: 2, c: 'understanding', key: 'a',
  a: 'During the First World War, Indian factories increased production.',
  r: 'Manchester imports into India fell and the army needed jute bags, cloth, tents and boots.',
  sol: 'Both are true, and R explains A: lower imports and war orders created a big demand for Indian factories.',
}));
Q('ar_smallscale', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'Small-scale and household units continued to make up most of Indian industrial production in the twentieth century.',
  r: 'Large factories had completely replaced handloom weaving by 1900.',
  sol: 'A is true. R is false: handloom production expanded in the twentieth century, helped by new technology such as the fly shuttle.',
}));
Q('tf_calendars', tf({
  t: 3, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Manufacturers printed calendars with their products\' advertisements, which were hung even in homes and shops where people could not read.',
  sol: 'Calendars were used every day and seen by everyone, so the images reached even people who could not read.',
}));
Q('fb_jobber', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'An old and trusted worker whom mill owners used to recruit new workers from the villages was called a ___.',
  acc: [['jobber']],
  sol: 'He was the jobber.',
}));
Q('fb_tata', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'Jamsetji Tata\'s plans led to the Tata Iron and Steel Company, which began producing steel at ___ in 1912.',
  acc: [['Jamshedpur']],
  sol: 'The steel plant was at Jamshedpur.',
}));
Q('mt_market', match({
  t: 3, d: 2, c: 'analysis',
  stem: 'Match each feature of advertisements in colonial India with the message it carried.',
  pairs: [
    ['"Made in Manchester" in bold letters', 'The product is of trusted quality'],
    ['Pictures of gods and goddesses', 'The product is blessed and familiar'],
    ['Images of emperors and nawabs', 'A product fit for royalty deserves respect'],
    ['"Buy Indian" slogans of Indian mills', 'Buying Indian goods serves the nation'],
  ],
  sol: 'Place of origin signalled quality; divine images gave approval; royal images borrowed respect; swadeshi slogans linked buying to patriotism.',
}));
Q('ord_factories', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events in Indian industrial history in chronological order.',
  items: [
    'The first cotton mill comes up in Bombay',
    'The first spinning and weaving mill of Madras begins production',
    'Tata Iron and Steel Company begins producing steel at Jamshedpur',
    'The First World War cuts Manchester imports into India',
  ],
  sol: 'Bombay mill, 1854; Madras mill, 1874; steel at Jamshedpur, 1912; First World War, from 1914.',
}));
Q('map_mills', mapQ({
  t: 3, d: 2, c: 'application',
  stem: 'Map practice (school periodic test). On an outline political map of India, locate and label these early centres of the cotton mill industry:\n\n**A.** the city where the first cotton mill came up in 1854.\n\n**B.** the city in Gujarat whose first cotton mill came up in the 1860s.\n\n**C.** the city in Uttar Pradesh where the Elgin Mill was started in the 1860s.',
  places: [['A', 'Bombay', 'city', ['Mumbai']], ['B', 'Ahmedabad', 'city'], ['C', 'Kanpur', 'city', ['Cawnpore']]],
  sol: 'Step 1: Bombay (Mumbai) is on the west coast in Maharashtra.\nStep 2: Ahmedabad is in north-central Gujarat, on the Sabarmati.\nStep 3: Kanpur is in Uttar Pradesh, on the Ganga.',
}));
Q('s_entrepreneurs', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name two early Indian industrialists and state how they accumulated capital.',
  model: '1. **Dwarkanath Tagore** of Bengal made a fortune in the **China trade** before investing in industry.\n2. **Jamsetji Nusserwanji Tata** of Bombay built his wealth partly through **exports to China and raw cotton shipments to England**.',
  sol: 'Any two named entrepreneurs with their source of capital (China trade, raw cotton exports, other trade networks).',
  scheme: [['First industrialist with source of capital', 1], ['Second industrialist with source of capital', 1]],
}));
Q('s_jobber', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who was a jobber? Why did he become powerful?',
  model: '1. A **jobber** was an old, trusted worker whom mill owners used to **recruit new workers**, usually from his own village.\n2. He controlled **access to jobs**, helped workers settle and lent money, so he gained authority and began **demanding gifts**.',
  sol: 'Meaning, then the sources of his power.',
  scheme: [['Meaning', 1], ['Why he became powerful', 1]],
}));
Q('s_ads', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give two ways in which manufacturers in colonial India used images to sell their goods.',
  model: '1. Labels showed **gods and goddesses**, so the product seemed **blessed** and familiar.\n2. Calendars and labels showed **emperors and nawabs**, so the product borrowed **royal respect**.',
  sol: 'Two kinds of image with the message each carried.',
  scheme: [['First image and its message', 1], ['Second image and its message', 1]],
}));
Q('s3_peculiarities', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three peculiar features of industrial growth in colonial India.',
  model: '1. **European managing agencies** controlled much industry and chose products for **export** (tea, jute, indigo, mining).\n2. Early Indian cotton mills made **coarse yarn**, not cloth, for handloom weavers and for **China**.\n3. **Small-scale and household units** remained most of production, and **handlooms expanded** in the twentieth century.',
  sol: 'Three features: export-oriented European agencies, yarn rather than cloth at first, and the persistence of small-scale production.',
  scheme: [['Managing agencies and export products', 1], ['Yarn rather than cloth', 1], ['Small-scale and handloom production', 1]],
}));
Q('s3_ww1', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How did the First World War change the position of Indian industry?',
  model: '1. British mills were busy with **war production**, so **Manchester imports** into India fell and Indian mills got a large **home market**.\n2. Indian factories received **war orders** for jute bags, uniform cloth, tents and boots; new factories came up.\n3. After the war, **Manchester never regained** its old place, and Indian industrialists **captured the home market**.',
  sol: 'Fall in imports, war orders, and the lasting change after the war.',
  scheme: [['Fall in Manchester imports', 1], ['War orders and new factories', 1], ['Lasting gain after the war', 1]],
}));
Q('l_factories', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the growth of factory industry in India up to the First World War.',
  model: '1. **First mills:** the first **cotton mill** came up in **Bombay in 1854**; **jute mills** followed in **Bengal from 1855**, and mills in Kanpur, Ahmedabad and **Madras (1874)**.\n2. **Capital:** many Indian industrialists, such as **Dwarkanath Tagore** and Parsi merchants of Bombay, had made money in the **China trade**.\n3. **Limits:** colonial rule **restricted Indian merchants** to exporting raw materials, and **European managing agencies** controlled large sectors.\n4. **Workers:** mills recruited peasants and artisans from nearby districts through **jobbers**.\n5. **Products:** early mills made **coarse yarn**; from the swadeshi years they shifted to **cloth**, and **Tata steel** began at **Jamshedpur in 1912**.',
  sol: 'Early mills with dates, capital, colonial limits, labour, and the products up to 1914.',
  scheme: [['First mills', 1], ['Sources of capital', 1], ['Colonial limits and managing agencies', 1], ['Workers and jobbers', 1], ['Products and later growth', 1]],
}));
Q('l_market', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'How did producers in colonial India use advertisements to create a market for their goods?',
  model: '1. **Purpose:** advertisements make products seem **desirable and necessary**, shaping tastes and creating **new needs**.\n2. **Labels of origin:** "Made in Manchester" told buyers to **trust the quality**.\n3. **Gods and goddesses:** images of deities on labels made foreign goods seem **blessed and familiar**.\n4. **Calendars and royalty:** calendars reached homes and shops, even of people who **could not read**; images of **emperors and nawabs** lent prestige.\n5. **Swadeshi:** Indian manufacturers turned ads into a **nationalist message**: buying Indian goods meant **serving the nation**.',
  sol: 'The purpose of advertising, then four methods with the message each carried.',
  scheme: [['Purpose of advertising', 1], ['Labels of origin', 1], ['Images of deities', 1], ['Calendars and royal images', 1], ['Nationalist (swadeshi) message', 1]],
}));
Q('l_compare', long({
  t: [2, 3], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Compare the effects of industrialisation on hand-producers in Britain and in India in the nineteenth century. Which group do you think faced the harder situation? Give reasons.',
  model: '1. **Britain:** hand-spinners feared and sometimes **attacked machines** like the jenny; many workers faced **seasonal unemployment** and rising prices.\n2. **Britain (2):** but hand labour stayed **useful** in many trades, and **building and railways** created new jobs after the 1840s.\n3. **India:** weavers lost **export markets** to British duties and their **home market** to cheap Manchester cloth.\n4. **India (2):** they were also tied by **Company advances**, faced **costly raw cotton** in the 1860s and later competition from **Indian mills**.\n5. **Judgement:** Indian weavers faced the **harder** situation, because **colonial policy** worked against them while British workers at least gained **new kinds of work**.',
  sol: 'Two points on Britain, two on India, and a reasoned judgement.',
  scheme: [['Britain: fears and seasonal work', 1], ['Britain: hand labour still useful, new jobs', 1], ['India: lost markets', 1], ['India: advances, costly cotton, mills', 1], ['Reasoned judgement', 1]],
}));
Q('sb_mill', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**From the notebook of Vithal, a mill worker in Bombay who came from a village in Ratnagiri district (imagined), 1912**\n\nI came to Bombay because our rice field could not feed all of us. For two weeks I stood at the mill gate with a hundred others. Then Bhau, the jobber from the next village, took me inside and spoke to the head clerk; I had to give him five rupees from my first wages. Now I mind the spinning frames for twelve hours a day. When the paddy is ready at home, I will go back for the harvest, as most of the men from our taluka do, and Bhau has promised to keep my place.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Who helped Vithal get a job in the mill?', model: 'The **jobber**, Bhau.', sol: 'The person who recruited and placed him.', scheme: [['The jobber', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Why did Vithal leave his village?', model: 'The family\'s **rice field could not feed everyone**, so he needed work elsewhere.', sol: 'Find the reason stated at the start of the notebook.', scheme: [['Land could not support the family', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does the source show the power of the jobber over workers?', model: 'Getting a job depended on him, since **many waited at the gate**. He took **money from Vithal\'s wages** and controls whether his **place is kept** when he goes home.', sol: 'Use the source: control of entry, payment demanded, control over keeping a job.', scheme: [['Control over entry to jobs', 1], ['Money demanded / control over the job', 1]] }), [
      short({ t: 3, d: 2, c: 'analysis', marks: 2, stem: '**Or** (ii): What links between village and city does the source reveal?', model: 'Workers came from **nearby districts** like Ratnagiri, recruited through **village networks**. They kept their **land**, and went **home for harvests**, moving between village and mill.', sol: 'Recruitment through village ties and seasonal return home.', scheme: [['Recruitment through village networks', 1], ['Return home for the harvest', 1]] }),
    ]),
  ],
}));
Q('cb_ads', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Study the descriptions of two imagined advertisements and answer the questions that follow. *(Descriptions written by SOYL for practice; the advertisements are imagined.)*',
  passage: '| | Advertisement X (about 1895) | Advertisement Y (about 1925) |\n|---|---|---|\n| Seller | A Manchester cloth company | A cotton mill in Ahmedabad |\n| Picture | The goddess Saraswati seated on a lotus, holding a roll of cloth | A spinning wheel and a map of India |\n| Words | "MADE IN MANCHESTER" in large letters | "Wear the cloth of your own land" |\n| Where shown | Printed on cloth bundles and on a calendar | Newspapers and posters |',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: 'Why does Advertisement X print "MADE IN MANCHESTER" in large letters?', opts: ['To make buyers confident about the quality of the cloth', 'To show that the cloth was handmade in India', 'Because the law required every product to name a goddess', 'To discourage people from buying it'], sol: 'The place of manufacture was presented as a mark of quality that buyers could trust.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Why might Advertisement X be printed on a calendar?', model: 'A calendar is **hung and seen every day**, even by people who **cannot read**, so the image keeps reaching buyers.', sol: 'Daily visibility and reach beyond literate buyers.', scheme: [['Daily visibility / reaches people who cannot read', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How does Advertisement Y differ from X in the message it gives?', model: 'X wins trust through **foreign origin** and a **divine image**. Y uses **swadeshi symbols** (the spinning wheel, a map of India) to say that buying Indian cloth is a **patriotic duty**.', sol: 'Contrast quality-and-blessing appeals with the nationalist appeal.', scheme: [['Message of X', 1], ['Nationalist message of Y', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why would an Ahmedabad mill in the 1920s choose a nationalist message?', model: 'The **swadeshi movement** had made many Indians **boycott foreign cloth**, so linking the product to the nation could win **buyers away from Manchester** and build a home market.', sol: 'Link the political mood of the time to the mill\'s business interest.', scheme: [['Swadeshi mood / boycott of foreign cloth', 1], ['Business gain from a nationalist appeal', 1]] }),
    ]),
  ],
}));
Q('sb_war', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the source and answer the questions that follow. *(Illustrative source written by SOYL for practice; the people and places in it are imagined.)*',
  passage: '**From the report of the manager of an imagined jute mill on the Hooghly, near Calcutta, December 1916**\n\nOrders from the army have arrived faster than we can fill them: sandbags, gunny for grain, and canvas for tents. We have started a night shift and taken on four hundred more hands, mostly men from Bihar. The cotton mill owners of the city tell me that Manchester cloth has almost vanished from the bazaar, and they are selling every yard they can weave. My only worry is what will happen when the war ends.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Name one item the army ordered from the mill.', model: '**Sandbags** / gunny for grain / **canvas for tents**.', sol: 'Any one item named in the report.', scheme: [['One item', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Why were cotton mills in the city "selling every yard they can weave"?', model: '**Manchester cloth had almost vanished** from the market during the war.', sol: 'Find the change in imports mentioned in the report.', scheme: [['Fall in Manchester imports', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Was the manager right to worry about the end of the war? Give your view with reasons.', model: 'Partly. **Army orders** would end, so jute mills might cut shifts. But **Manchester never regained** its old place after the war, so Indian mills **kept the home market** they had captured.', sol: 'Weigh the loss of war orders against the lasting fall of Manchester\'s position.', scheme: [['Loss of war orders', 1], ['Lasting gains for Indian industry', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): What does the source show about where Indian factory workers came from?', model: 'New hands were **men from Bihar**, far from Calcutta. Mills drew **peasants and artisans** from other regions who could not find work at home, moving **long distances** for jobs.', sol: 'Use the detail on recruitment and link it to rural migration.', scheme: [['Workers from distant regions', 1], ['Rural people seeking work', 1]] }),
    ]),
  ],
}));
