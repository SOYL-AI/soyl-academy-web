// Build CBSE 12 History ch08 Peasants, Zamindars and the State: Agrarian Society and the Mughal Empire (c. 16th-17th centuries).
// Run from platform/:  npx tsx content/authored/social-science/cbse-12-history-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-12-history-ch01/src/lib.mjs';

setUnit('cbse-12-history-ch08', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Helpers: a table or a flow with an alt text built from its own content.
const tb = (headers, rows, caption) => table(headers, rows, `Table, ${caption}. ${rows.map((r) => r.join(': ')).join('; ')}`, caption);
const fl = (labels, caption) => flow('LR', labels, `Flow chart, ${caption}: ${labels.join(', then ')}`, caption);

// ---------------------------------------------------------------- SVG figures (no maps: places are named in words only)
const vTimeline = (() => {
  const s = new Svg(680, 230);
  const X = (y) => 230 + ((y - 1480) / 220) * 420;
  const AX = 186;
  for (let yr = 1480; yr <= 1700; yr += 20) s.line(X(yr), 10, X(yr), AX, { sw: 0.6, dash: true, color: 'muted' });
  s.arrow(222, AX, 668, AX, { sw: 1.8 });
  for (let yr = 1480; yr <= 1700; yr += 20) {
    s.line(X(yr), AX - 5, X(yr), AX + 5, { sw: 1.2 });
    s.text(X(yr), AX + 20, String(yr), { size: 11, muted: true });
  }
  const lane = (i, name) => {
    const y = 26 + i * 30;
    s.text(8, y, name, { anchor: 'start', size: 12 });
    return y;
  };
  const bar = (i, name, a, b) => { const y = lane(i, name); s.rect(X(a), y - 7, X(b) - X(a), 14, { rx: 3, fill: 'fill', color: 'accent', sw: 1.6 }); return y; };
  const dot = (i, name, yr) => { const y = lane(i, name); s.dot(X(yr), y, 5, 'accent'); return y; };
  let y = dot(0, 'Americas open to world trade', 1492);
  s.text(X(1492) + 12, y, '1492 and after', { anchor: 'start', size: 12 });
  y = bar(1, 'Akbar reigns', 1556, 1605);
  s.text(X(1605) + 8, y, '1556 to 1605', { anchor: 'start', size: 12 });
  y = dot(2, 'Ain-i Akbari completed', 1598);
  s.text(X(1598) - 12, y, '1598', { anchor: 'end', size: 12 });
  y = bar(3, 'Shah Jahan reigns', 1628, 1658);
  s.text(X(1658) + 8, y, '1628 to 1658', { anchor: 'start', size: 12 });
  y = dot(4, 'Giovanni Careri in India', 1690);
  s.text(X(1690) - 12, y, 'about 1690', { anchor: 'end', size: 12 });
  s.text(340, 222, 'Years CE. Bars show reigns and dots show single events.', { size: 12, muted: true });
  return s.visual('Timeline from 1480 to 1700 CE in five rows: the Americas open to world trade from 1492; Akbar reigns from 1556 to 1605; the Ain-i Akbari is completed in 1598; Shah Jahan reigns from 1628 to 1658; and the traveller Giovanni Careri is in India about 1690', 'The chapter in time');
})();

const vVillage = (() => {
  const s = new Svg(700, 300);
  const box = (x, y, w, h, lines) => {
    s.rect(x, y, w, h, { sw: 2, color: 'accent', fill: 'fill' });
    s.text(x + w / 2, y + 24, lines[0], { bold: true, size: 14 });
    lines.slice(1).forEach((t, i) => s.text(x + w / 2, y + 52 + i * 22, t, { size: 12 }));
  };
  box(20, 20, 200, 130, ['Cultivators', 'khud-kashta and', 'pahi-kashta; many castes', 'with deep inequalities']);
  box(250, 20, 200, 130, ['Panchayat', 'assembly of elders', 'a common fund', 'fines and expulsion']);
  box(480, 20, 200, 130, ['Headman', 'muqaddam or mandal', 'chosen by consensus', 'approved by the zamindar']);
  s.rect(480, 196, 200, 50, { sw: 1.6 });
  s.text(580, 221, 'Patwari (accountant)', { size: 13 });
  s.arrow(580, 196, 580, 154, { sw: 1.8 });
  s.text(570, 175, 'helps keep accounts', { anchor: 'end', size: 12 });
  s.text(350, 278, 'The three constituents of the village community', { size: 13, muted: true });
  return s.visual('Diagram of the village community in three boxes: cultivators, who were khud-kashta or pahi-kashta from many castes with deep inequalities; the panchayat, an assembly of elders with a common fund that could impose fines and expulsion; and the headman, called muqaddam or mandal, chosen by consensus and approved by the zamindar; beneath the headman a box for the patwari, the accountant, with an arrow to the headman marked helps keep accounts', 'The village community and its officials');
})();

const vClasses = (() => {
  const s = new Svg(700, 210);
  const data = [
    ['Polaj', ['cultivated', 'every year,', 'never fallow']],
    ['Parauti', ['left fallow', 'for a time to', 'recover strength']],
    ['Chachar', ['fallow for', 'three or four', 'years']],
    ['Banjar', ['uncultivated for', 'five years', 'or more']],
  ];
  data.forEach(([name, lines], i) => {
    const x = 15 + i * 172;
    s.rect(x, 14, 156, 120, { sw: 2, color: 'accent', fill: 'fill' });
    s.text(x + 78, 38, name, { bold: true, size: 15 });
    lines.forEach((t, j) => s.text(x + 78, 68 + j * 22, t, { size: 12 }));
  });
  s.arrow(15, 160, 675, 160, { sw: 2 });
  s.text(345, 184, 'longer out of cultivation', { size: 13, muted: true });
  return s.visual('Four boxes in a row joined by a long arrow beneath marked longer out of cultivation: polaj, cultivated every year and never fallow; parauti, left fallow for a time to recover its strength; chachar, fallow for three or four years; banjar, uncultivated for five years or more', 'The four classes of land');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vRoute1 = fl(['Peasants and farming', 'The Ain-i Akbari', 'The village community', 'Caste, artisans and women'], 'Part 1 at a glance');
const vTerms = tb(['Term', 'Meaning'], [['Raiyat (riaya) or muzarian', 'A peasant'], ['Kisan or asami', 'Other words for a cultivator'], ['Khud-kashta', 'Cultivator living in the village where he held land'], ['Pahi-kashta', 'Non-resident cultivator who cultivated land elsewhere']], 'Terms for peasants');
const vMobility = fl(['Land was plentiful', 'Labour was scarce', 'Peasants moved to better terms'], 'Why peasants moved');
const vHold = tb(['Place', 'Typical holding'], [['North India', 'Seldom more than a pair of bullocks and two ploughs'], ['Gujarat', 'About six acres counted as well off']], 'Peasant holdings');
const vWater = tb(['Need', 'How it was met'], [['Rain', 'Agriculture depended on the monsoon'], ['Wells', 'Raised water; the Persian wheel was used in some regions'], ['Tanks and canals', 'Built or repaired, sometimes by the state, as the Shah Nahr in the Punjab under Shah Jahan']], 'Water for the fields');
const vCrops = tb(['Group', 'Examples'], [['Two seasons', 'Kharif (autumn) and rabi (spring)'], ['Variety in the Ain', 'Agra 39 kinds of crop and Delhi 43 over the two seasons; Bengal 50 varieties of rice'], ['Jins-i kamil', 'Cash crops such as cotton and sugarcane; also oilseeds and lentils'], ['From the Americas', 'Maize; tomatoes, potatoes and chillies; pineapple and papaya']], 'Seasons and crops');
const vEx1 = tb(['Step', 'Imagined village of 150 bighas'], [['Cash crops', '30 bighas of cotton and 24 of sugarcane make 54 bighas'], ['Share', '54 of 150 is 36 per cent'], ['Reading', 'About a third of the land was grown for sale'], ['Missing', 'How much was sold, to whom and at what price']], 'Reading crop data');
const vAinFacts = tb(['Fact', 'Detail'], [['Author', "Abu'l Fazl, Akbar's court historian"], ['Completed', '1598, after five revisions'], ['Place', 'Third part of the Akbarnama'], ['Aim', 'To present an empire whose ruling class ensured social harmony']], 'The Ain-i Akbari');
const vAinBooks = tb(['Book (daftar)', 'Contents'], [['1. Manzil-abadi', 'The imperial household'], ['2. Sipah-abadi', 'Military and civil administration, nobles and servants'], ['3. Mulk-abadi', 'The fiscal side: revenue rates and the Account of the Twelve Provinces'], ['4 and 5', "Religious, literary and cultural traditions; Akbar's auspicious sayings"]], 'The five books of the Ain');
const vAinLimits = tb(['Strength', 'Limit'], [['An extraordinary range of statistics', 'Errors in totalling'], ['Detailed account of provinces', 'Data not collected evenly: caste of zamindars missing for some provinces, fiscal data for others'], ['Prices and wages', 'Largely from Agra and its surroundings']], 'Strengths and limits of the Ain');
const vOther = tb(['Source', 'What it adds'], [['Revenue records of Gujarat, Maharashtra and Rajasthan (17th and 18th centuries)', 'The demands made on villages'], ['East India Company records', 'Records made for other purposes'], ['Petitions', 'Complaints brought by villagers']], 'Other sources for agrarian history');
const vPlan5 = tb(['Mark', 'Point to write'], [['1', 'Who the peasants were, with terms'], ['2', 'Holdings and mobility'], ['3', 'Water and seasons'], ['4', 'Cash crops and new crops'], ['5', 'A caution on the sources']], 'Planning a 5-mark answer on peasants');
const vRoles = tb(['Role', 'Detail'], [['Headman', 'Chosen by consensus, approved by the zamindar; kept accounts with the patwari'], ['Panchayat', 'Assembly of elders, usually heads of families; a common fund; fines and expulsion'], ['Cultivators', 'Khud-kashta and pahi-kashta']], 'Village roles');
const vCaste = tb(['Group', 'Position'], [['Menial labourers', 'On the margins; among Muslim communities the halalkhoran were housed outside the village'], ['Mallahzadas in Bihar', 'Recorded as comparable to slaves'], ['Artisans', 'Paid with a share of the harvest, a plot, or both; the plot was miras or watan in Maharashtra']], 'Caste and artisans');
const vWomen = tb(['Area', 'Detail'], [['Work', 'Sowing, weeding, threshing and winnowing; spinning, sieving, clay, embroidery'], ['Marriage', 'Bride-price common; remarriage of divorced and widowed women legitimate'], ['Household', 'Men controlled it'], ['Redress', 'Women petitioned panchayats'], ['Property', 'Women of the landed gentry could inherit; a woman held the Rajshahi zamindari in the 18th century']], 'Women in agrarian society');
const vEx3 = tb(['Step', 'Imagined petition by a potter family'], [['Who', 'A potter family in a mixed-caste village'], ['Claim', 'Their customary share of the harvest had not been paid'], ['Shows', 'Artisans depended on shares and went to the panchayat for redress'], ['Missing', "The elders' reply and the other side"]], 'Reading a petition');
const vSum1 = tb(['Idea', 'Remember'], [['Peasants', 'Raiyat, muzarian; khud-kashta and pahi-kashta; land plentiful, labour scarce'], ['Farming', 'Monsoon, wells, tanks, canals; kharif and rabi; jins-i kamil; new crops'], ['The Ain', 'Abu\'l Fazl, 1598; five books; limits'], ['Village', 'Cultivators, panchayat, headman; caste inequality; little republic debated'], ['Women', 'Work, bride-price, remarriage, petitions, inheritance']], 'Summary of Part 1');
const vTips1 = tb(['Mistake to avoid', 'Better'], [['Calling the Ain a neutral record', 'Say it presents an official view, with uneven data'], ['Writing that villages were equal', 'Say historians question the little republic view'], ['Treating peasants as one kind', 'Name khud-kashta and pahi-kashta'], ['Giving a number without a reading', 'Compute, then say what it does not show']], 'Common mistakes in Part 1');

// ---------------------------------------------------------------- tables and flows: Part 2
const vRoute2 = fl(['Forests and tribes', 'Zamindars', 'Land revenue', 'The flow of silver'], 'Part 2 at a glance');
const vJangli = tb(['Feature', 'Detail'], [['Livelihood', 'Forest produce, hunting and shifting cultivation'], ['The word jangli', 'Described a way of living, not savagery'], ['State demand', 'Elephants, supplied as peshkash'], ['Hunts', 'Shikar was described by the court as an occasion to dispense justice']], 'Forest dwellers');
const vForestTrade = fl(['Honey, beeswax, gum lac', 'Carried to distant markets', 'Chiefs gain wealth and power', 'Some become zamindars or kings'], 'How trade changed forest societies');
const vZam = tb(['Feature', 'Detail'], [['Who', 'A landed class that did not cultivate directly'], ['Privileges', 'By caste and by services to the state'], ['Milkiyat', 'Personal property: could sell, bequeath or mortgage'], ['Duty', 'Collected revenue for the state'], ['Rise', 'By conquest or by colonising new land']], 'Zamindars');
const vZamForce = tb(['Force recorded in the Ain', 'Number'], [['Cavalry', '384,558'], ['Infantry', '4,277,057'], ['Elephants', '1,863'], ['Cannon', '4,260'], ['Boats', '4,500']], 'Armed forces of the zamindars');
const vEx1b = tb(['Patronage', 'Exploitation'], [['Digs a well for the village', 'Demands extra labour at harvest'], ['Lends grain in a lean year', 'Raises his share from tenants'], ['Hosts village feasts', 'Keeps back part of the revenue']], 'Sorting evidence on an imagined zamindar of the lake villages');
const vRevTerms = tb(['Term', 'Meaning'], [['Jama', 'The amount assessed'], ['Hasil', 'The amount actually collected'], ['Amil-guzar', 'The revenue collector'], ['Zabt', 'Measurement of land under Akbar'], ['Todar Mal', "Akbar's revenue minister"]], 'Revenue terms');
const vSteps = fl(['Measure the land (zabt)', 'Class the land', 'Fix a share of the crop', 'Collect in cash or kind'], 'Steps of assessment');
const vMansab = tb(['Term', 'Meaning'], [['Mansab', 'A rank held in imperial service'], ['Zat', 'Personal rank and salary'], ['Sawar', 'Number of horsemen to maintain'], ['Jagir', 'A revenue assignment given in payment']], 'Mansabdars');
const vEx2 = tb(['Step', 'Imagined village'], [['Land', 'Polaj 50 bighas; parauti 30 bighas, of which 12 under crop'], ['Cropped land', '50 and 12 make 62 bighas'], ['Jama at 5 rupees', '62 times 5 is 310 rupees'], ['If hasil is 217 rupees', '217 of 310 is 70 per cent']], 'Computing jama from a register');
const vSilver = fl(['Voyages open the Americas', 'World trade expands', 'Indian textiles and spices in demand', 'Silver bullion flows in', 'Revenue collected in cash'], 'The flow of silver');
const vCareri = tb(['What a traveller says', 'What a historian asks'], [['Silver from many lands came to India', 'Can mint and trade records confirm it?'], ['Written for readers at home', 'What did he wish them to think?'], ['Saw only some routes and towns', 'Is it true of the whole empire?']], 'Reading a traveller on silver');
const vEx3b = tb(['Step', 'Imagined case: a rate table and a village register'], [['One source', 'Gives the assessed amount for the village'], ['Other source', 'Shows less collected than assessed'], ['Reading', 'Both can be right: jama is assessed and hasil is collected'], ['Missing', 'Why the gap arose']], 'Weighing two records');
const vSum2 = tb(['Idea', 'Remember'], [['Forests', 'Jangli; elephants as peshkash; trade in forest produce'], ['Zamindars', 'Milkiyat; revenue; forts; Ain forces; patronage and exploitation'], ['Revenue', 'Jama and hasil; zabt; four land classes; share of crop; mansab, zat, sawar, jagir'], ['Silver', 'Americas, trade, bullion, cash revenue']], 'Summary of Part 2');
const vTips2 = tb(['Mistake to avoid', 'Better'], [['Mixing up jama and hasil', 'Jama is assessed; hasil is collected'], ['Treating silver as the only cause', 'Weigh other factors and the evidence'], ['Writing jangli as savage', 'Say a way of living'], ['Calling zamindars cultivators', 'They collected revenue and held land as milkiyat']], 'Common mistakes in Part 2');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Peasants, Zamindars and the State — Part 1: Peasants, the Ain and the Village',
  goals: [
    'Describe peasants, their holdings, farming, seasons and crops in the Mughal countryside',
    'Explain what the Ain-i Akbari is, and judge its strengths and limits as a source',
    'Describe the village community, caste, artisans and the position of women',
    'Plan a 5-mark answer, read crop figures and read a petition',
  ],
  slides: [
    sl('title', 'Peasants, Zamindars and the State', {
      b: 'Part 1: **peasants**, the **Ain-i Akbari** and the **village community**.',
      v: vRoute1,
      n: 'In the sixteenth and seventeenth centuries, most people of the Mughal empire lived by farming. In this part we meet the peasants, learn how historians use the Ain of Akbar as a source, and then look inside the village, at its elders, its castes, its artisans and its women.',
    }),
    sl('concept', 'Who were the peasants?', {
      b: 'Several words described those who farmed: **raiyat** and **muzarian**, and **kisan** or **asami**.',
      v: vTerms,
      n: 'Sources of the time call a peasant a raiyat, or muzarian, and also a kisan or asami. Some peasants were khud kashta, living in the village where they held land. Others were pahi kashta, non resident cultivators who farmed land elsewhere, often because the terms were better or because they had moved.',
    }),
    sl('concept', 'Land plentiful, labour scarce', {
      b: 'When land is plentiful and hands are few, peasants can **move** to better terms.',
      v: vMobility,
      n: 'Land was abundant and labour was scarce. That is why peasants could move, and why the pahi kashta existed. Holdings were modest. In north India an average peasant seldom had more than a pair of bullocks and two ploughs, while in Gujarat a peasant with about six acres was counted as well off.',
    }),
    sl('check', 'Quick check: a term', {
      b: 'Which pair of terms was commonly used for a peasant?',
      chk: 'm_raiyat',
      n: 'Recall the terms for a peasant.',
    }),
    sl('concept', 'Water for the fields', {
      b: 'Farming rested on the **monsoon**, helped by wells, tanks and canals.',
      v: vWater,
      n: 'Agriculture depended on the monsoon, but farmers also drew water from wells and tanks, and used canals. In some regions the Persian wheel raised water. The state sometimes built or repaired canals, for example the Shah Nahr in the Punjab under Shah Jahan, which shows that irrigation was not only a village matter.',
    }),
    sl('concept', 'Seasons and crops', {
      b: 'Two harvests, many crops, **cash crops** and **new arrivals** from the Americas.',
      v: vCrops,
      n: 'There were two seasons, kharif in autumn and rabi in spring. The Ain says that Agra grew thirty nine kinds of crop and Delhi forty three over the two seasons, and Bengal had fifty varieties of rice alone. Cash crops such as cotton and sugarcane were called jins i kamil. Maize, tomatoes, chillies and pineapple came from the Americas.',
    }),
    sl('example', 'Worked example 1: reading crop figures', {
      b: 'Imagined village: *150 bighas in all; 30 under cotton and 24 under sugarcane.*',
      bl: [
        'Step 1 — **Add** the cash-crop land.',
        'Step 2 — Find the **share** of the total.',
        'Step 3 — Say what it **shows**.',
        'Step 4 — Say what it **cannot show**.',
      ],
      v: vEx1,
      n: 'Take an imagined village of one hundred and fifty bighas. Thirty bighas of cotton and twenty four of sugarcane make fifty four, which is thirty six per cent of the land. So about a third was grown for sale. But the figures do not show how much was sold, to whom, or at what price, so we must not claim that the peasants gained.',
    }),
    sl('diagram', 'The chapter in time', {
      v: vTimeline,
      n: 'This timeline sets the chapter in time. The Americas opened to world trade from fourteen ninety two. Akbar ruled from fifteen fifty six to sixteen oh five, and his historian completed the Ain in fifteen ninety eight. Shah Jahan ruled from sixteen twenty eight to sixteen fifty eight, and the traveller Giovanni Careri passed through India about sixteen ninety.',
    }),
    sl('concept', 'The Ain-i Akbari', {
      b: 'Written by **Abu\'l Fazl** and completed in **1598**, after five revisions.',
      v: vAinFacts,
      n: 'The Ain i Akbari was written by Abu l Fazl, the court historian of Akbar, and completed in fifteen ninety eight after five revisions. It is the third part of the Akbarnama. Its aim was to present an empire with a ruling class that ensured social harmony, so it is a source with a point of view.',
    }),
    sl('check', 'Quick check: author and date', {
      b: 'The Ain-i Akbari was written by ___, the court historian of Akbar, and was completed in ___.',
      chk: 'fb_ain',
      n: 'Recall the author and the year.',
    }),
    sl('diagram', 'What the Ain contains', {
      v: vAinBooks,
      n: 'The Ain has five books. The first three describe the administration: the imperial household, the military and civil administration, and the fiscal side, which includes revenue rates and the Account of the Twelve Provinces. The fourth and fifth books deal with the religious, literary and cultural traditions of the people and with a collection of Akbar auspicious sayings.',
    }),
    sl('concept', 'Strengths and limits of the Ain', {
      b: 'Extraordinarily valuable, yet with **errors** and **uneven data**.',
      v: vAinLimits,
      n: 'The Ain is extraordinarily valuable for its range of statistics. But it has errors in totalling, and its data were not collected evenly from every province. For some provinces the caste of zamindars is missing, for others fiscal data. Prices and wages come largely from Agra and its surroundings. So a careful historian checks the Ain against other records.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer', {
      b: 'Question: *Describe the peasants and farming of the Mughal countryside.*',
      bl: [
        'Step 1 — **Who** the peasants were.',
        'Step 2 — **Holdings** and mobility.',
        'Step 3 — **Water** and seasons.',
        'Step 4 — **Cash crops** and new crops, then a caution on sources.',
      ],
      v: vPlan5,
      n: 'To plan a five mark answer, give one point to who the peasants were, with the terms. Give a second to holdings and mobility, a third to water and seasons, and a fourth to cash crops and the new crops. End with a line of caution about the sources. Headed lines of about twenty words each fill the space well.',
    }),
    sl('diagram', 'The village community', {
      v: vVillage,
      n: 'The village community had three constituents: the cultivators, the panchayat and the headman. The headman, called muqaddam or mandal, was chosen by consensus and approved by the zamindar. He kept the accounts with the help of the patwari. The panchayat was an assembly of elders. Cultivators came from many castes, with deep inequalities among them.',
    }),
    sl('concept', 'What the panchayat did', {
      b: 'A **common fund**, **fines** and **expulsion**; it kept caste boundaries.',
      v: vRoles,
      n: 'The panchayat was usually made up of heads of families, with representatives of different castes in mixed villages, though the powerful dominated it. It had a common fund from contributions. It ensured that caste boundaries were kept, and it could impose fines and order expulsion. In Rajasthan, caste panchayats also arbitrated disputes.',
    }),
    sl('check', 'Quick check: village terms', {
      b: 'Match each term with the correct description.',
      chk: 'mt_village',
      n: 'Link each village term with its meaning.',
    }),
    sl('concept', 'Caste, artisans and the little republic', {
      b: 'Inequality was deep; artisans were paid in **shares** or **plots**.',
      v: vCaste,
      n: 'Caste inequalities were deep. Menial labourers lived on the margins, and among Muslim communities the halalkhoran were housed outside the village. In Bihar, the mallahzadas are recorded as comparable to slaves. Artisans such as potters and blacksmiths were paid with a share of the harvest or a plot. British officials called villages little republics, but historians question the term.',
    }),
    sl('concept', 'Women in agrarian society', {
      b: 'Women **worked** in the fields and crafts, and could **petition** the panchayat.',
      v: vWomen,
      n: 'Women worked alongside men in sowing, weeding, threshing and winnowing, and also in spinning, sieving, clay work and embroidery. Because their labour was valued, bride price rather than dowry was common, and remarriage of divorced and widowed women was legitimate. Men controlled the household, yet women petitioned panchayats. Women of the landed gentry could inherit property.',
    }),
    sl('example', 'Worked example 3: reading a petition', {
      b: 'Imagined petition: *A potter family says its customary share of the harvest was not paid.*',
      bl: [
        'Step 1 — **Who** wrote it?',
        'Step 2 — What is the **claim**?',
        'Step 3 — What does it **show**?',
        'Step 4 — What is **missing**?',
      ],
      v: vEx3,
      n: 'Read an imagined petition in four steps. A potter family in a mixed caste village says its customary share of the harvest was not paid. It shows that artisans depended on shares and could go to the panchayat for redress. What is missing is the reply of the elders and the other side of the story.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. Peasants were raiyat or muzarian, khud kashta or pahi kashta, and land was plentiful while labour was scarce. Farming rested on the monsoon and two seasons, with cash crops and new crops. The Ain is a valuable but official source. The village had cultivators, a panchayat and a headman, with deep caste inequality, and women worked and petitioned.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Treat the Ain as an **official view** with **uneven data**.',
        'Name **khud-kashta** and **pahi-kashta**.',
        'Present the little republic idea as a **debate**.',
        'In data questions, **compute**, then say what the figure **cannot show**.',
        'Describe caste and gender **plainly and neutrally**.',
      ],
      v: vTips1,
      n: 'Some tips. Treat the Ain as an official view with uneven data. Name both kinds of resident and non resident cultivator. Present the little republic idea as a debate. In data questions, compute first and then say what the figure cannot show. Describe caste and gender plainly and neutrally, without loaded words.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Peasants, Zamindars and the State — Part 2: Forests, Zamindars, Revenue and Silver',
  goals: [
    'Explain how forest dwellers, the state and trade affected one another',
    'Describe zamindars: their land, revenue role, forces and relation with peasants',
    'Explain the land revenue system, its terms, land classes and the mansabdari link',
    'Explain the flow of silver and weigh how far it explains cash revenue',
  ],
  slides: [
    sl('title', 'Forests, Zamindars, Revenue and Silver', {
      b: 'Part 2: **forests and tribes**, **zamindars**, **land revenue** and the **flow of silver**.',
      v: vRoute2,
      n: 'In this part we leave the village for the forest and the fort. We meet forest peoples and the state, then the zamindars, who held land and collected revenue. Then we study how the empire raised its revenue, and how silver from the wider world helped it to do so in cash.',
    }),
    sl('concept', 'Forest peoples and the state', {
      b: '**Jangli** described a way of living; the state wanted **elephants**.',
      v: vJangli,
      n: 'In Mughal usage, jangli meant people whose livelihood came from forest produce, hunting and shifting cultivation. It described a way of living, not savagery. The state needed elephants and asked forest peoples to supply them as peshkash, a form of tribute. Court writers described imperial hunts as occasions to dispense justice.',
    }),
    sl('concept', 'Trade changes forest societies', {
      b: 'Trade in **honey**, **beeswax** and **gum lac** helped some chiefs to rise.',
      v: vForestTrade,
      n: 'Forest produce such as honey, beeswax and gum lac was carried to distant markets. Changes in forest societies came through trade, through the demands of the state, and through social factors. Some forest chiefs became zamindars, and in Assam the Koch kings and the Ahoms are examples of rulers who rose from such backgrounds.',
    }),
    sl('concept', 'Who were the zamindars?', {
      b: 'A **landed class** that did not cultivate, but held **milkiyat** and collected revenue.',
      v: vZam,
      n: 'Zamindars were a landed class who did not cultivate directly but enjoyed social and economic privileges by virtue of their caste and their services to the state. They held milkiyat lands as personal property, which they could sell, bequeath or mortgage, and they collected revenue on behalf of the state. Many rose by conquest or by colonising new land.',
    }),
    sl('check', 'Quick check: milkiyat', {
      b: 'Lands that zamindars held as personal property, which they could sell, bequeath or mortgage, were called ___.',
      chk: 'fb_milkiyat',
      n: 'Recall the term for personal property.',
    }),
    sl('diagram', 'The armed strength of the zamindars', {
      v: vZamForce,
      n: 'Zamindars had fortresses called qilachas and armed contingents of cavalry, artillery and infantry. The Ain gives their forces as three hundred eighty four thousand cavalry, over four million infantry, eighteen hundred sixty three elephants, four thousand two hundred sixty cannon and four thousand five hundred boats. These figures show how important they were to the empire.',
    }),
    sl('example', 'Worked example 1: patronage and exploitation', {
      b: 'Imagined zamindar of the lake villages: *digs a well, lends grain, demands extra labour at harvest.*',
      bl: [
        'Step 1 — List acts of **patronage**.',
        'Step 2 — List acts of **exploitation**.',
        'Step 3 — Say what the **mixture** explains.',
        'Step 4 — Note whose **account** it is.',
      ],
      v: vEx1b,
      n: 'Take an imagined zamindar of the lake villages. He digs a well and lends grain, which is patronage. He also demands extra labour and raises his share, which is exploitation. The mixture explains why peasants could both resent a zamindar and follow him in a revolt. Always ask whose account tells us this.',
    }),
    sl('concept', 'Land revenue: the terms', {
      b: '**Jama** is assessed, **hasil** is collected; the **amil-guzar** collects.',
      v: vRevTerms,
      n: 'Land revenue was the economic mainstay of the empire, with revenue offices at different levels. Jama was the amount assessed, and hasil was the amount actually collected. The amil guzar was the revenue collector. Under Akbar, whose revenue minister was Todar Mal, the state tried to assess both cultivable and cultivated land by measurement, called zabt.',
    }),
    sl('diagram', 'Four classes of land', {
      v: vClasses,
      n: 'Land was classified by how often it was cultivated. Polaj was cultivated every year and never left fallow. Parauti was left fallow for a time to recover its strength. Chachar was fallow for three or four years, and banjar had been uncultivated for five years or more. The classes run from constant use to long rest.',
    }),
    sl('check', 'Quick check: land classes', {
      b: 'Match each class of land with its description.',
      chk: 'mt_land',
      n: 'Link each class with its description.',
    }),
    sl('concept', 'From measurement to payment', {
      b: 'Revenue was a **share of the crop**, paid in **cash or kind**.',
      v: vSteps,
      n: 'The steps were these. First the land was measured, then it was classed, then a share of the crop was fixed as revenue, and finally the revenue was collected, in cash or in kind. This was the system of assessment that the state tried to apply across the empire, though results differed from year to year and place to place.',
    }),
    sl('concept', 'Mansabdars and jagirs', {
      b: 'A **mansab** was a rank with **zat** and **sawar**; many were paid by **jagirs**.',
      v: vMansab,
      n: 'The mansabdari system linked rank with revenue. A mansabdar held a mansab, a rank. His zat was his personal rank and salary, and his sawar was the number of horsemen he had to maintain. Many mansabdars were paid not in cash from the treasury but by revenue assignments called jagirs.',
    }),
    sl('example', 'Worked example 2: computing a jama', {
      b: 'Imagined village: *50 bighas polaj; 30 bighas parauti, 12 under crop; rate 5 rupees per bigha under crop.*',
      bl: [
        'Step 1 — Find the land **under crop**.',
        'Step 2 — **Multiply** by the rate.',
        'Step 3 — Compare with the **hasil**.',
        'Step 4 — Say what the gap **cannot** explain.',
      ],
      v: vEx2,
      n: 'Take an imagined village with fifty bighas of polaj and thirty of parauti, twelve of which are under crop. Cropped land is sixty two bighas. At five rupees a bigha the jama is three hundred ten rupees. If the hasil is two hundred seventeen, that is seventy per cent. The gap alone does not say why.',
    }),
    sl('concept', 'The flow of silver', {
      b: 'Trade with the Americas and Europe brought **silver bullion** into India.',
      v: vSilver,
      n: 'In the sixteenth and seventeenth centuries, voyages of exploration and the opening of the Americas expanded world trade. India goods, such as textiles and spices, were in demand, and silver bullion flowed into India to pay for them. This helped the Mughal state to collect its revenue in cash.',
    }),
    sl('check', 'Quick check: silver', {
      b: 'True or false? In the sixteenth and seventeenth centuries silver bullion flowed into India in payment for goods such as textiles and spices.',
      chk: 'tf_silver',
      n: 'Recall the direction of the silver flow.',
    }),
    sl('concept', 'Reading a traveller on silver', {
      b: 'An Italian traveller, **Giovanni Careri**, passed through India about **1690**.',
      v: vCareri,
      n: 'Giovanni Careri was an Italian traveller who passed through India about sixteen ninety. Writing for readers at home, he described how silver from all over the world came to India. His remark is useful, but a historian asks whether mint and trade records agree, and whether he saw the whole empire or only a few places.',
    }),
    sl('check', 'Quick check: chronology', {
      b: 'Arrange these events in chronological order, earliest first.',
      chk: 'ord_chrono',
      n: 'Place the events in order.',
    }),
    sl('example', 'Worked example 3: weighing two records', {
      b: 'Imagined case: *a table gives the assessed amount; a village register shows less collected.*',
      bl: [
        'Step 1 — Name the **two** records.',
        'Step 2 — Check whether they measure the **same thing**.',
        'Step 3 — Say whether they **conflict**.',
        'Step 4 — Say what is **missing**.',
      ],
      v: vEx3b,
      n: 'Take an imagined table that gives the assessed amount and a village register that shows less collected. Do they conflict? Not necessarily. Jama is assessed and hasil is collected, so both can be right. What is missing is the reason for the gap, such as poor rains, flight of peasants or slack collection.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Forest peoples supplied elephants as peshkash and traded forest produce, and some chiefs rose to power. Zamindars held milkiyat, collected revenue, kept forts and forces, and were both patrons and exploiters. Revenue rested on measurement, four land classes and a share of the crop, with mansabdars paid by jagirs. Silver helped the state collect cash.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        '**Jama** is assessed; **hasil** is collected.',
        'Say that **jangli** described a way of living.',
        'Show **both sides** of the zamindar and peasant relation.',
        'Treat silver as **one important factor**, and say what other evidence is needed.',
        'In source questions ask who wrote it, for whom, and what is missing.',
      ],
      v: vTips2,
      n: 'Some tips. Remember that jama is assessed and hasil is collected. Say that jangli described a way of living. Show both sides of the zamindar and peasant relation. Treat silver as one important factor and say what other evidence is needed. In source questions, ask who wrote it, for whom, and what is missing.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Peasants, Zamindars and the State — Notes',
  sections: [
    {
      h: '1. Peasants and their holdings',
      t: 1,
      b: 'In the Mughal countryside most people farmed. A peasant was a **raiyat** (plural riaya) or **muzarian**, or a **kisan** or **asami**. **Khud-kashta** cultivators lived in the village where they held land; **pahi-kashta** cultivators farmed in a village where they did not live, often for better terms or after moving.\n\n**Land was plentiful and labour scarce**, which made movement common. An average peasant of north India seldom had more than a pair of bullocks and two ploughs; in Gujarat, a peasant with about six acres was counted as well off.',
      terms: [
        ['Khud-kashta', 'A cultivator who lived in the village where he held land.'],
        ['Pahi-kashta', 'A non-resident cultivator who farmed land elsewhere.'],
      ],
      v: vTerms,
      vs: [vMobility, vHold],
    },
    {
      h: '2. Water, seasons and crops',
      t: 1,
      b: 'Farming depended on the **monsoon**, with irrigation from **wells, tanks and canals**; the **Persian wheel** was used in some regions. The state sometimes built or repaired canals, such as the **Shah Nahr** in the Punjab under Shah Jahan.\n\nThere were two seasons, **kharif** (autumn) and **rabi** (spring). The Ain says that Agra produced 39 kinds of crop and Delhi 43 over the two seasons, and Bengal had 50 varieties of rice alone. **Jins-i kamil**, literally perfect crops, were cash crops such as **cotton** and **sugarcane**, and also oilseeds and lentils. Crops from the Americas, by way of Africa and Spain, included **maize**, tomatoes, potatoes and chillies, pineapple and papaya.',
      terms: [
        ['Jins-i kamil', 'Literally perfect crops: cash crops such as cotton and sugarcane.'],
        ['Kharif and rabi', 'The autumn and the spring harvests.'],
      ],
      v: vWater,
      vs: [vCrops, vTimeline],
    },
    {
      h: '3. Sources: the Ain-i Akbari',
      t: 5,
      b: 'The **Ain-i Akbari** was written by **Abu\'l Fazl**, Akbar\'s court historian, and completed in **1598** after five revisions. It is the third part of the Akbarnama. Its aim was to present Akbar\'s empire as having a ruling class that ensured social harmony. It records arrangements for the imperial household, the army and revenue, and statistics of provinces.\n\nIt has **five books**: the first three describe the administration (**manzil-abadi**, the imperial household; **sipah-abadi**, military and civil administration; **mulk-abadi**, the fiscal side, with revenue rates and the **Account of the Twelve Provinces**); the fourth and fifth deal with religious, literary and cultural traditions and a collection of Akbar\'s auspicious sayings.\n\n**Limits:** errors in totalling; data not collected evenly (the caste of zamindars is missing for some provinces, fiscal data for others); prices and wages largely from Agra and its surroundings. Even so it is extraordinarily valuable. Other sources: revenue records of Gujarat, Maharashtra and Rajasthan (17th and 18th centuries), East India Company records and petitions.',
      terms: [
        ['Ain-i Akbari', 'The third part of the Akbarnama, on the arrangements and statistics of Akbar\'s empire.'],
        ['Mulk-abadi', 'The book of the Ain on the fiscal side of the empire.'],
      ],
      v: vAinFacts,
      vs: [vAinBooks, vAinLimits, vOther],
    },
    {
      h: '4. The village community and women',
      t: 2,
      b: 'The village had three constituents: **cultivators, the panchayat and the headman** (**muqaddam** or **mandal**). The headman was chosen by consensus, approved by the zamindar, and kept accounts with the **patwari**. The **panchayat**, an assembly of elders and usually heads of families, had representatives of different castes in mixed villages but was dominated by the powerful. It had a common fund, kept caste boundaries and could impose fines and expulsion. Caste (jati) panchayats in Rajasthan arbitrated disputes, and petitions show lower castes complaining of heavy tax demands or forced labour by upper castes and officials.\n\n**Caste inequality** was deep: menial labourers lived on the margins, among Muslim communities the halalkhoran were housed outside the village, and in Bihar the mallahzadas are recorded as comparable to slaves. **Artisans** (potters, blacksmiths, carpenters, barbers, goldsmiths) were paid with a share of the harvest, a plot, or both; in Maharashtra such land was **miras** or **watan**. British officials called villages **little republics**, but there was no social equality and historians question the term.\n\n**Women** worked alongside men in sowing, weeding, threshing and winnowing, and in spinning, sieving, clay work and embroidery. As their labour was valued, **bride-price** was common among peasants and artisans, and remarriage of divorced and widowed women was legitimate. Men controlled the household; women petitioned panchayats; women of the landed gentry could inherit property, and the Rajshahi zamindari in eighteenth-century Bengal was held by a woman.',
      terms: [
        ['Panchayat', 'The village assembly of elders, with a common fund and powers of fine and expulsion.'],
        ['Little republic', 'A nineteenth-century British description of villages that historians question.'],
      ],
      v: vVillage,
      vs: [vRoles, vCaste, vWomen],
    },
    {
      h: '5. Forests and tribes; zamindars',
      t: 3,
      b: 'Forest dwellers were called **jangli**, which in Mughal usage meant people whose livelihood came from forest produce, hunting and shifting cultivation, not "savage". The state needed elephants and asked forest peoples to supply them as **peshkash**, a form of tribute. Court writers described hunts (**shikar**) as occasions to dispense justice. Honey, beeswax and gum lac went to distant markets; the Koch kings and the Ahoms of Assam, and forest chiefs who became zamindars or kings, show change through trade, state demands and social factors.\n\n**Zamindars** were a landed class that did not directly cultivate but had social and economic privileges by caste and services to the state. They held **milkiyat** lands as personal property, collected revenue for the state, and kept **qilachas** (fortresses) and armed contingents. The Ain gives their forces as 384,558 cavalry, 4,277,057 infantry, 1,863 elephants, 4,260 cannon and 4,500 boats. Many had come to their position by conquest or by colonising new land. Their relation with peasants combined **exploitation and patronage**, and many peasant revolts were led by zamindars with peasant support.',
      terms: [
        ['Jangli', 'In Mughal usage, a person living by forest produce, hunting and shifting cultivation.'],
        ['Milkiyat', 'Lands held as personal property that a zamindar could sell, bequeath or mortgage.'],
      ],
      v: vJangli,
      vs: [vForestTrade, vZam, vZamForce],
    },
    {
      h: '6. Land revenue and the mansabdars',
      t: 4,
      b: 'Land revenue was the **economic mainstay** of the empire, with offices at different levels. **Jama** was the amount assessed and **hasil** the amount actually collected; the **amil-guzar** was the collector. Under Akbar, with **Todar Mal** as revenue minister, the state tried to assess cultivable and cultivated land through measurement (**zabt**). Land was classed as **polaj** (cultivated every year), **parauti** (fallow for a time to recover), **chachar** (fallow three or four years) and **banjar** (uncultivated five years or more). Revenue was fixed as a share of the crop and paid in cash or kind.\n\nIn the **mansabdari system**, a mansabdar held a rank (**mansab**) with **zat** (personal rank and salary) and **sawar** (the number of horsemen to maintain). Many were paid by revenue assignments called **jagirs**.',
      terms: [
        ['Jama and hasil', 'The revenue assessed, and the revenue actually collected.'],
        ['Mansab', 'A rank in imperial service, with zat and sawar.'],
      ],
      v: vClasses,
      vs: [vRevTerms, vSteps, vMansab],
    },
    {
      h: '7. The flow of silver',
      t: 4,
      b: 'In the sixteenth and seventeenth centuries, voyages of exploration and the opening of the Americas expanded world trade. India\'s goods, especially textiles and spices, were in demand abroad, and **silver bullion** flowed into India to pay for them. This helped the Mughal state to **collect revenue in cash**.\n\nThe Italian traveller **Giovanni Careri**, who passed through India about 1690, described silver from all over the world coming to India. A traveller\'s remark is useful evidence of how a visitor saw the trade, but it is not a count of coin: historians check it against mint and trade records, and weigh other causes of cash revenue such as more land under cultivation and higher prices.',
      terms: [
        ['Bullion', 'Silver (or gold) in bars or coin valued by its weight.'],
        ['Peshkash', 'A form of tribute, such as elephants from forest peoples.'],
      ],
      v: vSilver,
      vs: [vCareri],
    },
  ],
  tips: '**Common mistakes**\n- Calling the Ain-i Akbari a neutral record; it presents an official view and its data are uneven.\n- Treating all peasants alike; name khud-kashta and pahi-kashta.\n- Writing that Mughal villages were equal; historians question the little republic view.\n- Mixing up jama (assessed) and hasil (collected).\n- Writing jangli as savage; it described a way of living.\n- Calling zamindars cultivators; they held milkiyat and collected revenue.\n- Giving silver as the only cause of cash revenue.\n- Quoting a figure without saying what it cannot show.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); assess questions need more than one side and a judgement.\n- Source questions (4 marks): parts (a) and (b) one mark each, part (c) two marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Peasant: Mughal-period terms', 'Raiyat (plural riaya) or muzarian; also kisan or asami.', 'fact', 1],
  ['**Khud-kashta**', 'A cultivator who lived in the village where he held land.', 'definition', 1],
  ['**Pahi-kashta**', 'A non-resident cultivator who farmed land elsewhere, often for better terms or after migration.', 'definition', 1],
  ['Why did peasants move between villages?', 'Land was plentiful and labour scarce, so cultivators could seek better terms.', 'concept', 1],
  ['Holdings of an average peasant', 'North India: seldom more than a pair of bullocks and two ploughs. Gujarat: about six acres meant well off.', 'fact', 1],
  ['Water for farming', 'The monsoon, with wells, tanks and canals; the Persian wheel in some regions; the state built the Shah Nahr in the Punjab under Shah Jahan.', 'fact', 1],
  ['Kharif and rabi', 'The autumn and spring seasons; the Ain says Agra grew 39 crops and Delhi 43 over both.', 'fact', 1],
  ['**Jins-i kamil**', 'Literally perfect crops: cash crops such as cotton and sugarcane, also oilseeds and lentils.', 'definition', 1],
  ['New crops from the Americas', 'Maize; tomatoes, potatoes, chillies; pineapple and papaya; they came via Africa and Spain.', 'fact', 1],
  ['A data tip for crop figures', 'Compute the share, then say what the figure cannot show, such as price or who gained.', 'exam-tip', 1],
  ['Who wrote the Ain-i Akbari, and when was it completed?', 'Abu\'l Fazl, Akbar\'s court historian; 1598, after five revisions; third part of the Akbarnama.', 'fact', 5],
  ['The five books of the Ain', 'Manzil-abadi (household), sipah-abadi (military and civil), mulk-abadi (fiscal); then religious and cultural traditions and Akbar\'s sayings.', 'fact', 5],
  ['Limits of the Ain', 'Errors in totalling; uneven data; prices and wages largely from Agra and its surroundings.', 'concept', 5],
  ['What was the aim of the Ain?', 'To present an empire whose ruling class ensured social harmony.', 'concept', 5],
  ['The three constituents of a village', 'Cultivators, the panchayat and the headman (muqaddam or mandal).', 'fact', 2],
  ['The headman and the patwari', 'The headman was chosen by consensus and approved by the zamindar; the patwari helped him keep accounts.', 'fact', 2],
  ['What could a panchayat do?', 'Keep a common fund, ensure caste boundaries were kept, and impose fines and expulsion.', 'fact', 2],
  ['Caste inequality in villages', 'Menial labourers lived on the margins; the halalkhoran were housed outside the village; mallahzadas in Bihar are recorded as comparable to slaves.', 'concept', 2],
  ['Payment of village artisans', 'A share of the harvest, a plot (miras or watan in Maharashtra), or both.', 'fact', 2],
  ['**Little republic**', 'A British description of villages; historians question it, since there was no social equality.', 'definition', 2],
  ['Women\'s work and marriage', 'They sowed, weeded, threshed, spun and sieved; bride-price was common and remarriage legitimate.', 'fact', 2],
  ['Women and property', 'Women of the landed gentry could inherit; a woman held the Rajshahi zamindari in the eighteenth century.', 'fact', 2],
  ['**Jangli**', 'In Mughal usage, a person living by forest produce, hunting and shifting cultivation.', 'definition', 3],
  ['Elephants and forest peoples', 'The state asked for elephants as peshkash, a form of tribute.', 'fact', 3],
  ['Forest trade', 'Honey, beeswax and gum lac reached distant markets; some chiefs became zamindars or kings.', 'concept', 3],
  ['**Zamindar**', 'A landed class that did not cultivate directly; privileged by caste and services to the state; held milkiyat; collected revenue.', 'definition', 3],
  ['Zamindar forces in the Ain', '384,558 cavalry; 4,277,057 infantry; 1,863 elephants; 4,260 cannon; 4,500 boats.', 'fact', 3],
  ['Zamindars and peasants', 'A relation of both exploitation and patronage; many revolts were zamindar-led with peasant support.', 'concept', 3],
  ['**Jama and hasil**', 'Jama is the amount assessed; hasil is the amount actually collected.', 'definition', 4],
  ['The four land classes', 'Polaj (every year), parauti (fallow for a time), chachar (three or four years), banjar (five years or more).', 'fact', 4],
  ['Mansab, zat, sawar, jagir', 'A rank; personal rank and salary; number of horsemen; a revenue assignment as payment.', 'definition', 4],
  ['The flow of silver', 'Silver bullion came into India to pay for textiles and spices, helping the state to collect revenue in cash.', 'concept', 4],
  ['Reading a traveller on silver', 'Giovanni Careri (about 1690) is useful evidence of how a visitor saw it; check against mint and trade records.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Peasants, Zamindars and the State',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_chilli_date', 'm_republic_strengthen', 'm_hunt_fit', 'ar_silver_port'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_women_petition', 's_land_data', 's3_crop_share'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_republic', 'l_silver'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_register'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Peasants, Zamindars and the State',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_khud', 'm_village_three', 'm_bride_weaken', 'm_jangli', 'm_zam_ratio', 'm_land_data', 'm_silver_alt', 'm_dependent', 'ar_ain_view', 'ar_zam_conq'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_seasons', 's_panchayat', { attempt: 1, keys: ['s_forest_trade', 's_silver'] }, 's3_revenue', { attempt: 1, keys: ['s3_zam_both', 's3_ain_limits'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_peasants', { attempt: 1, keys: ['l_zam', 'l_ain_gujarat'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_ain', 'sb_zamindar'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch08 only (peasants and agricultural production; the village community and women; forests, tribes and zamindars; land revenue and the flow of silver; sources: the Ain-i Akbari)',
    originality: 'every source is an imagined document or a SOYL summary, labelled as such; nothing from the Ain-i Akbari, Babur, Careri or any document is quoted, translated or closely paraphrased; no NCERT text, source box, table, caption, map or exercise and no board or sample-paper item reused (D-036)',
    facts: 'Ain completed 1598 after five revisions by Abu\'l Fazl, five books; kharif and rabi; Agra 39 and Delhi 43 crops, Bengal 50 varieties of rice; khud-kashta and pahi-kashta; zamindar forces in the Ain (384,558 cavalry, 4,277,057 infantry, 1,863 elephants, 4,260 cannon, 4,500 boats); jama and hasil; polaj, parauti, chachar, banjar; zat and sawar; Careri about 1690; no maps (OA-23)',
    neutrality: 'caste and gender in villages described plainly and neutrally; the little-republic view presented as a debate; jangli described as a way of living',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
