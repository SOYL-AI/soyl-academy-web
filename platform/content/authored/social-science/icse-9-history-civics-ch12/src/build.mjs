// Build ICSE 9 History & Civics ch12 Medieval India: The Delhi Sultanate. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch12', 'social-science');
const { dynastiesFigure, marketFigure, minarFigure, deccanFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Sources: inscriptions and the Qutab Minar', 'The five dynasties in order', 'Alauddin Khalji: markets and the Deccan'], 'Route map of Part 1: the sources, the five dynasties in order, and the market regulations and Deccan expedition of Alauddin Khalji', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Alauddin Khalji: nobles, army, revenue', 'Muhammad bin Tughlaq: capital and tokens', 'The Doab and plans of conquest'], 'Route map of Part 2: the reforms of Alauddin Khalji, the capital and token currency of Muhammad bin Tughlaq, and the Doab and his plans of conquest', 'Part 2 at a glance');
const vSources = table(['Kind of source', 'What it gives', 'Care needed'], [
  ['Inscriptions in Arabic and Persian on monuments', 'Builders, dates and titles', 'Praise may colour the wording'],
  ['Coins', 'Ruler, title, year and metal', 'Tells little about daily life'],
  ['Monuments such as the Qutab Minar', 'Building style, rulers who built and repaired', 'One building cannot show everything'],
  ['Chronicles such as the history by Ziauddin Barani', 'An author\'s account of events', 'An author\'s point of view; check with other evidence'],
], 'Table of four kinds of source for the Delhi Sultanate: inscriptions, coins, monuments such as the Qutab Minar, and chronicles such as the history by Ziauddin Barani, with what each gives and the care needed');
const vInscr = table(['Point', 'Inscriptions'], [
  ['Language and script', 'Arabic and Persian'],
  ['Where', 'On monuments and on coins'],
  ['Records', 'Builders, dates and titles of rulers'],
  ['Use', 'Fix who built what, and when'],
], 'Table about inscriptions: in Arabic and Persian, on monuments and coins, recording builders, dates and titles, used to fix who built what and when');
const vBuilders = table(['Stage', 'Ruler', 'What was done'], [
  ['Begun about 1199', 'Qutbuddin Aibak', 'First work on the tower'],
  ['Upper storeys', 'Iltutmish', 'Completed the tower'],
  ['Later repairs', 'Firuz Shah Tughlaq', 'Repaired and raised it after lightning damage'],
], 'Table of the building of the Qutab Minar: begun by Qutbuddin Aibak about 1199, upper storeys completed by Iltutmish, and repaired and raised by Firuz Shah Tughlaq after lightning damage');
const vMinar = minarFigure('Schematic elevation of the Qutab Minar with five numbered storeys and balconies, bands of inscriptions marked by dashed lines, a height arrow about 72.5 m, a bracket for the lowest storey begun by Qutbuddin Aibak about 1199, a bracket for upper storeys completed by Iltutmish, and a note on later repairs including by Firuz Shah Tughlaq after lightning; not to scale', 'Qutab Minar (schematic, not to scale).');
const vMinarFacts = table(['Feature', 'Qutab Minar'], [
  ['Height', 'About 72.5 m'],
  ['Materials', 'Red and buff sandstone and marble'],
  ['Decoration', 'Bands of carved inscriptions; arches'],
  ['Recognition', 'Part of the UNESCO World Heritage Site Qutb Minar and its Monuments (1993)'],
], 'Table of features of the Qutab Minar: about 72.5 m high, red and buff sandstone and marble, bands of carved inscriptions and arches, part of the UNESCO World Heritage Site Qutb Minar and its Monuments listed in 1993');
const vMinarTells = table(['What we look at', 'What it tells us'], [
  ['Arches and calligraphy', 'The building style of the Sultanate'],
  ['Inscriptions', 'Builders, dates and titles'],
  ['Repairs and additions', 'Later rulers continued the work of earlier ones'],
], 'Table of what the Qutab Minar tells us: arches and calligraphy show the building style, inscriptions give builders, dates and titles, and repairs and additions show later rulers continued earlier work');
const vReading = table(['Step', 'Example: a coin label (imagined)'], [
  ['1. Describe what you see', 'Silver coin with Arabic lettering on the rim'],
  ['2. Read what it records', 'Ruler\'s title and the year of issue'],
  ['3. Say what it helps you place', 'The ruler in time'],
  ['4. Add one care', 'A coin alone does not show daily life'],
], 'Table of four steps for reading a coin label: describe it, read what it records, say what it helps to place, and add one caution');
const vDynasties = dynastiesFigure('Five bars on a time line drawn to scale: Mamluk 1206 to 1290, Khalji 1290 to 1320, Tughlaq 1320 to 1414, Sayyid 1414 to 1451 and Lodi 1451 to 1526, ending at the First Battle of Panipat', 'The five dynasties (to scale).');
const vEarlyDyn = table(['Dynasty', 'Years', 'Commonly taught'], [
  ['Mamluk (Slave or Ilbari)', '1206 to 1290', 'Begins with Qutbuddin Aibak; Iltutmish completes the Minar'],
  ['Khalji', '1290 to 1320', 'Founded by Jalaluddin Khalji; Alauddin Khalji is its best-known ruler'],
], 'Table of the Mamluk dynasty, 1206 to 1290, which begins with Qutbuddin Aibak, and the Khalji dynasty, 1290 to 1320, founded by Jalaluddin Khalji with Alauddin Khalji as its best-known ruler');
const vLateDyn = table(['Dynasty', 'Years', 'Commonly taught'], [
  ['Tughlaq', '1320 to 1414', 'Founded by Ghiyasuddin Tughlaq; Muhammad bin Tughlaq and Firuz Shah Tughlaq'],
  ['Sayyid', '1414 to 1451', 'Founded by Khizr Khan'],
  ['Lodi', '1451 to 1526', 'Founded by Bahlul Lodi; ends at the First Battle of Panipat'],
], 'Table of the Tughlaq dynasty 1320 to 1414, the Sayyid dynasty 1414 to 1451 founded by Khizr Khan, and the Lodi dynasty 1451 to 1526 founded by Bahlul Lodi and ending at the First Battle of Panipat');
const vAlauddin = table(['Point', 'Alauddin Khalji'], [
  ['Reign', 'About 1296 to 1316'],
  ['Challenge', 'Mongol raids and the need for a large army'],
  ['Answer', 'Market regulations, military and revenue reforms'],
  ['Reach', 'Deccan expedition led by Malik Kafur'],
], 'Table about Alauddin Khalji: reign about 1296 to 1316, the challenge of Mongol raids, the answer in market regulations and reforms, and the Deccan expedition led by Malik Kafur');
const vMarket = marketFigure('Flow chart: the aim of keeping a large standing army on modest salaries leads to fixed prices for grain, cloth, horses and other goods, supported by separate markets, a market superintendent, state granaries, registered merchants, spies reporting on traders and strict penalties for cheating on weights, with the result of steady prices in Delhi during his reign and a system that did not continue after him', 'The market regulations (simplified).');
const vMarketCtl = table(['Control', 'How it worked'], [
  ['Superintendent (shahna-i-mandi)', 'Supervised the markets'],
  ['Separate markets', 'Different goods sold in their own markets'],
  ['State granaries', 'Grain stored by the state'],
  ['Registration; spies; penalties', 'Merchants entered in a register; spies reported; cheating on weights penalised'],
  ['Result', 'Steady prices in Delhi in his reign; the system ended after him'],
], 'Table of the controls on markets: a superintendent, separate markets, state granaries, registration of merchants, spies and penalties, and the result of steady prices in his reign with the system ending after him');
const vDeccanMap = deccanFigure('Schematic map of the Deccan campaign: Delhi in the north with dashed arrows in order to Devagiri of the Yadavas, Warangal of the Kakatiyas, Dwarasamudra of the Hoysalas and Madurai of the Pandyas, with dates about 1307 to 1311; not to scale and positions approximate', 'The Deccan expedition (schematic, not to scale).');
const vDeccanTable = table(['Place', 'Dynasty', 'About'], [
  ['Devagiri', 'Yadavas', '1307 to 08'],
  ['Warangal', 'Kakatiyas', '1309 to 10'],
  ['Dwarasamudra', 'Hoysalas', '1311'],
  ['Madurai', 'Pandyas', '1311'],
], 'Table of the four places of the Deccan expedition with their dynasties and approximate dates: Devagiri and the Yadavas, Warangal and the Kakatiyas, Dwarasamudra and the Hoysalas, Madurai and the Pandyas');
const vDeccanAims = table(['Aim', 'Result'], [
  ['Wealth and tribute, rather than direct annexation (mostly)', 'Great wealth reached Delhi'],
  ['Overlordship over the south', 'Southern kingdoms accepted overlordship'],
], 'Table of the aims and results of the Deccan expedition: wealth and tribute rather than direct annexation, and overlordship, with great wealth reaching Delhi and southern kingdoms accepting overlordship');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Aim; goods whose prices were fixed'],
  ['(ii)', '3', 'Superintendent, granaries, registration, spies'],
  ['(iii)', '4', 'Steady prices; large army; ended after him'],
], 'Table planning a ten-mark answer on the market regulations: part (i) the aim and goods for 3 marks, part (ii) supervision for 3 marks, part (iii) results and the end of the system for 4 marks');
const vSummary1 = table(['Topic', 'Key points'], [
  ['Sources', 'Inscriptions; Qutab Minar begun about 1199, completed by Iltutmish'],
  ['Dynasties', 'Mamluk, Khalji, Tughlaq, Sayyid, Lodi (1206 to 1526)'],
  ['Alauddin: markets', 'Fixed prices for a large army on modest salaries'],
  ['Alauddin: Deccan', 'Malik Kafur; Devagiri, Warangal, Dwarasamudra, Madurai'],
], 'Summary table of Part 1: sources, the five dynasties, the market regulations and the Deccan expedition');

const vNobles = table(['Measure', 'Purpose (as commonly taught)'], [
  ['Feasts and gatherings only with permission', 'Keep a check on nobles meeting freely'],
  ['Marriages between noble families only with permission', 'Stop alliances that could threaten the ruler'],
  ['Ban on liquor', 'Order and discipline'],
  ['A spy system', 'Keep the ruler informed'],
  ['Grants and gifts of land taken back', 'Reduce the wealth of nobles'],
], 'Table of five measures on the nobility: permission for feasts, permission for marriages, a ban on liquor, a spy system, and grants of land taken back, each with its purpose');
const vNobleFlow = flow('LR', ['Nobles may be rich and powerful', 'Rules: permission, spies, ban on liquor, grants taken back', 'Nobles kept under the ruler\'s control'], 'Flow: nobles may be rich and powerful, then rules of permission, spies, a ban on liquor and the taking back of grants, then nobles kept under the ruler\'s control', 'Why the nobility was watched.');
const vArmy = table(['Reform', 'Meaning'], [
  ['Standing army paid in cash', 'A permanent force under the ruler, paid from the treasury'],
  ['Dagh', 'Branding of horses'],
  ['Huliya or chehra', 'A descriptive roll of soldiers'],
  ['Forts', 'Strengthened against Mongol raids'],
], 'Table of military reforms: a standing army paid in cash, dagh as branding of horses, huliya or chehra as a descriptive roll of soldiers, and forts strengthened against Mongol raids');
const vArmyWhy = flow('LR', ['Mongol raids threaten Delhi', 'Large army paid in cash; dagh and huliya prevent false musters', 'Stronger defence of Delhi'], 'Flow: Mongol raids threaten Delhi, then a large army paid in cash with dagh and huliya to prevent false musters, then stronger defence of Delhi', 'The aim of the military reforms.');
const vRevenue = table(['Reform', 'Detail'], [
  ['Measurement of land', 'Revenue based on the area cultivated'],
  ['Tax in the Doab', 'Raised to about half of the produce'],
  ['Collection', 'In cash or kind'],
  ['Local intermediaries', 'Privileges of khuts, muqaddams and chaudharis curbed'],
], 'Table of revenue reforms: measurement of land, the tax in the Doab raised to about half of the produce, collection in cash or kind, and curbs on the privileges of khuts, muqaddams and chaudharis');
const vCalc = table(['Step', 'Worked example (imagined Doab village)'], [
  ['1. Find the produce', '80 quintals of grain'],
  ['2. Find the rate', 'About half'],
  ['3. Calculate', '80 divided by 2 is 40 quintals'],
  ['4. State with about', 'About 40 quintals due to the state'],
], 'Table of a worked example: a village produces 80 quintals, the rate is about half, 80 divided by 2 gives 40, so about 40 quintals were due');
const vMbt = table(['Point', 'Muhammad bin Tughlaq'], [
  ['Reign', 'About 1325 to 1351'],
  ['Dynasty', 'Tughlaq (1320 to 1414)'],
  ['Plans', 'New capital, token currency, Doab tax, conquests'],
  ['Debate', 'Far-sighted but poorly carried out, or impractical?'],
], 'Table about Muhammad bin Tughlaq: reign about 1325 to 1351, Tughlaq dynasty, his plans of a new capital, token currency, Doab tax and conquests, and the debate about him');
const vCapital = flow('LR', ['About 1327: capital moved from Delhi to Devagiri, renamed Daulatabad', 'Long journey and hardship; frontier far away', 'The court returns to Delhi'], 'Flow: about 1327 the capital moved from Delhi to Devagiri, renamed Daulatabad, then a long journey with hardship and a distant frontier, then the court returns to Delhi', 'The transfer of the capital.');
const vCapWhy = table(['Reasons for the move', 'Reasons for the failure'], [
  ['Central location to control the south', 'Hardship of the long journey'],
  ['Safety from Mongol raids', 'Distance from the north-west frontier'],
  ['', 'The court returned to Delhi'],
], 'Table comparing reasons for the move of the capital, a central location to control the south and safety from Mongol raids, with reasons for the failure, hardship of the journey and distance from the north-west frontier');
const vToken = flow('LR', ['About 1329 to 30: bronze or copper coins valued like silver tankas', 'Easy forgery; loss of trust', 'Coins withdrawn and exchanged by the treasury'], 'Flow: about 1329 to 30 bronze or copper coins valued like silver tankas, then easy forgery and loss of trust, then the coins withdrawn and exchanged by the treasury', 'The token currency.');
const vTokenWhy = table(['Question', 'Answer (as commonly taught)'], [
  ['What was the plan?', 'Bronze or copper coins valued like silver tankas'],
  ['Why was it tried?', 'A time of silver shortage'],
  ['Why did it fail?', 'Easy forgery and loss of trust'],
  ['How did it end?', 'Coins withdrawn and exchanged by the treasury'],
], 'Table of questions and answers on the token currency: the plan of bronze or copper coins valued like silver tankas, tried at a time of silver shortage, failed through easy forgery and loss of trust, and ended when the coins were withdrawn and exchanged');
const vDoab = flow('LR', ['Tax raised in the Doab', 'Famine; unrest; peasants flee', 'Loans and wells come late'], 'Flow: tax raised in the Doab, then famine, unrest and the flight of peasants, then relief by loans and wells that came late', 'The Doab tax.');
const vConquest = table(['Plan', 'What happened'], [
  ['Khurasan', 'An army was raised and then disbanded'],
  ['Qarachil (Kumaon hills region)', 'An expedition that suffered heavy losses'],
], 'Table of two plans of conquest: Khurasan, where an army was raised and then disbanded, and Qarachil in the Kumaon hills region, where an expedition suffered heavy losses');
const vViews = table(['View', 'Reason given by its supporters'], [
  ['Some historians: far-sighted, but poorly carried out', 'Ideas had a purpose; timing and preparation were weak'],
  ['Others: impractical', 'The plans did not suit the conditions of the time'],
], 'Table of two views of Muhammad bin Tughlaq: some historians see him as far-sighted but poorly carried out, while others see his plans as impractical');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Tax in a famine; unrest; flight of peasants'],
  ['(ii)', '3', 'Khurasan disbanded; Qarachil losses; late relief'],
  ['(iii)', '4', 'Two views; a balanced conclusion'],
], 'Table planning a ten-mark evaluation: part (i) the Doab tax and its results for 3 marks, part (ii) the plans of conquest for 3 marks, part (iii) two views and a balanced conclusion for 4 marks');
const vSummary2 = table(['Topic', 'Key points'], [
  ['Alauddin: nobles', 'Permission for feasts and marriages; spies; grants taken back'],
  ['Alauddin: army, revenue', 'Cash army, dagh, huliya; land measured, about half in the Doab'],
  ['Capital and tokens', 'Daulatabad about 1327; token coins about 1329 to 30; both failed'],
  ['Doab and conquests', 'Tax in famine; Khurasan disbanded; Qarachil losses; two views'],
], 'Summary table of Part 2: the measures of Alauddin Khalji, the capital and token currency of Muhammad bin Tughlaq, and the Doab tax and plans of conquest');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Delhi Sultanate — Part 1: Sources, Dynasties and Alauddin Khalji\'s Markets',
  goals: [
    'Explain what inscriptions and the Qutab Minar tell us about the Delhi Sultanate',
    'List the five dynasties of the Delhi Sultanate in chronological order',
    'Explain the aims and main features of Alauddin Khalji\'s market regulations',
    'Describe the Deccan expedition and its results',
  ],
  slides: [
    sl('title', 'The Delhi Sultanate: sources, dynasties and markets', {
      b: 'Part 1 — how we know about the Sultanate, who ruled, and how Alauddin Khalji managed prices.',
      v: vRoute1,
      n: 'In this part we learn how historians know about the Delhi Sultanate. We list the five dynasties in order, and then study the market regulations and the Deccan expedition of Alauddin Khalji.',
    }),
    sl('diagram', 'Kinds of source at a glance', {
      v: vSources,
      n: 'Historians use four kinds of source. Inscriptions in Arabic and Persian on monuments and coins record builders, dates and titles. Monuments such as the Qutab Minar show building style. Chronicles, such as the history by Ziauddin Barani, give an author\'s account. Each source needs care, and they are best used together.',
    }),
    sl('concept', 'The Qutab Minar: who built it', {
      bl: [
        '**Begun** by **Qutbuddin Aibak** about **1199**.',
        '**Upper storeys** completed by **Iltutmish**.',
        '**Repaired and raised** later, including by **Firuz Shah Tughlaq** after lightning damage.',
      ],
      v: vBuilders,
      n: 'The Qutab Minar in Delhi was begun by Qutbuddin Aibak about eleven ninety nine. Iltutmish completed the upper storeys. Later, after lightning damage, it was repaired and raised by rulers, including Firuz Shah Tughlaq. So one tower connects rulers of several dynasties.',
    }),
    sl('diagram', 'The Qutab Minar in a sketch', {
      b: 'Schematic sketch: not drawn to scale.',
      v: vMinar,
      n: 'This is a schematic sketch, not drawn to scale. It shows the five storeys with balconies, and bands of carved inscriptions. The tower is about seventy two and a half metres high. The brackets show who began the tower and who completed the upper storeys.',
    }),
    sl('concept', 'Features of the Qutab Minar', {
      bl: [
        'About **72.5 m** high.',
        'Built of **red and buff sandstone and marble**.',
        '**Bands of carved inscriptions** and **arches**.',
        'Part of the **UNESCO World Heritage Site** Qutb Minar and its Monuments (**1993**).',
      ],
      v: vMinarFacts,
      n: 'The Qutab Minar is about seventy two and a half metres high. It is built of red and buff sandstone and marble, with bands of carved inscriptions and arches. It is part of the UNESCO World Heritage Site called Qutb Minar and its Monuments, listed in nineteen ninety three.',
    }),
    sl('diagram', 'What the Minar tells us', {
      b: 'Read the monument as a source, not only as a sight.',
      v: vMinarTells,
      n: 'The arches and the calligraphy show the building style of the Sultanate. The inscriptions name builders and give dates and titles. The repairs and additions show that later rulers continued the work of earlier ones. A single building cannot tell the whole story, so we also use coins and chronicles.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each term with its meaning.',
      chk: 'mt_sources',
      n: 'Look back at the sources. Match each term with its meaning. Remember who began the Qutab Minar, and what the word chronicle means.',
    }),
    sl('example', 'Worked example 1: reading a coin label', {
      b: 'Imagined label: silver coin, Arabic lettering on the rim. Follow the steps.',
      bl: [
        'Step 1 — Describe what you see.',
        'Step 2 — Read what the lettering records.',
        'Step 3 — Say what it helps you place.',
        'Step 4 — Add one care.',
      ],
      v: vReading,
      n: 'Use four steps on an imagined coin label. First describe what you see, a silver coin with Arabic lettering on the rim. Second, read what it records, the ruler\'s title and the year. Third, say what it helps you place, which is the ruler in time. Fourth, add one care. A coin alone does not show daily life.',
    }),
    sl('diagram', 'The five dynasties on a time line', {
      v: vDynasties,
      n: 'The Delhi Sultanate was ruled by five dynasties in turn. They were the Mamluk, also called Slave or Ilbari, the Khalji, the Tughlaq, the Sayyid and the Lodi. The bars are drawn to scale. The Tughlaq dynasty lasted longest and the Khalji dynasty was the shortest. The Lodi line ended at the First Battle of Panipat in fifteen twenty six.',
    }),
    sl('concept', 'The Mamluk and Khalji dynasties', {
      bl: [
        '**Mamluk (Ilbari)**: **1206 to 1290**, begins with **Qutbuddin Aibak**.',
        '**Khalji**: **1290 to 1320**, **Alauddin Khalji** is its best-known ruler.',
      ],
      v: vEarlyDyn,
      n: 'The Mamluk dynasty ruled from twelve oh six to twelve ninety. It began with Qutbuddin Aibak, and Iltutmish completed the Qutab Minar. The Khalji dynasty ruled from twelve ninety to thirteen twenty. It was founded by Jalaluddin Khalji, and Alauddin Khalji is its best known ruler.',
    }),
    sl('concept', 'The Tughlaq, Sayyid and Lodi dynasties', {
      bl: [
        '**Tughlaq**: **1320 to 1414**.',
        '**Sayyid**: **1414 to 1451**.',
        '**Lodi**: **1451 to 1526**, ends at the **First Battle of Panipat**.',
      ],
      v: vLateDyn,
      n: 'The Tughlaq dynasty ruled from thirteen twenty to fourteen fourteen. The Sayyid dynasty, founded by Khizr Khan, followed until fourteen fifty one. The Lodi dynasty, founded by Bahlul Lodi, ruled until fifteen twenty six, when its last ruler was defeated at the First Battle of Panipat.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange the dynasties in chronological order.',
      chk: 'ord_dynasties',
      n: 'Begin with the dynasty that began in twelve oh six, and end with the one that ended at Panipat.',
    }),
    sl('concept', 'Alauddin Khalji and his challenge', {
      bl: [
        'Reign about **1296 to 1316**.',
        '**Mongol raids** made a **large standing army** necessary.',
        'A large army needs money, so **prices** had to be kept low.',
      ],
      v: vAlauddin,
      n: 'Alauddin Khalji ruled from about twelve ninety six to thirteen sixteen. The Mongols raided repeatedly, so he needed a large standing army. A large army needs steady pay, so he tried to keep prices low, so that modest salaries would be enough for soldiers.',
    }),
    sl('diagram', 'The market regulations as a flow', {
      b: 'Aim, then measures, then result.',
      v: vMarket,
      n: 'This chart shows the market regulations. The aim was a large army on modest salaries. Prices were fixed for grain, cloth, horses and other goods. Separate markets, a market superintendent, state granaries, registered merchants, spies and strict penalties for cheating on weights made the system work. Prices stayed steady in Delhi, but the system did not continue after him.',
    }),
    sl('concept', 'Controls and results', {
      bl: [
        '**Shahna-i-mandi**: the market superintendent.',
        '**Separate markets**, **state granaries**, **registered merchants**.',
        '**Spies** reported on traders; cheating on weights was **penalised**.',
        'Result: **steady prices** in Delhi; ended **after him**.',
      ],
      v: vMarketCtl,
      n: 'The market superintendent was called the shahna i mandi. Different goods were sold in separate markets, the state stored grain in granaries, and merchants were registered. Spies reported on traders, and cheating on weights was penalised. The result was steady prices in Delhi during his reign. The system ended after him.',
    }),
    sl('check', 'Quick check: aim and measure', {
      b: 'Decide whether the assertion and the reason are true, and whether one explains the other.',
      chk: 'ar_market',
      n: 'Check each statement on its own first. Then ask whether the reason really explains the assertion.',
    }),
    sl('diagram', 'The Deccan expedition on a map', {
      b: 'Schematic map: positions are approximate.',
      v: vDeccanMap,
      n: 'This is a schematic map, not drawn to scale. Malik Kafur led the army from Delhi to the Deccan. The campaigns were against Devagiri, Warangal, Dwarasamudra and Madurai, between about thirteen oh seven and thirteen eleven. The arrows show the order of the campaigns, not the exact routes.',
    }),
    sl('concept', 'Four kingdoms, aims and results', {
      bl: [
        '**Devagiri** (Yadavas), **Warangal** (Kakatiyas), **Dwarasamudra** (Hoysalas), **Madurai** (Pandyas).',
        'Aim: **wealth and tribute** rather than direct annexation (mostly).',
        'Results: great **wealth** for Delhi; the south accepted **overlordship**.',
      ],
      v: vDeccanTable,
      n: 'The four kingdoms were Devagiri of the Yadavas, Warangal of the Kakatiyas, Dwarasamudra of the Hoysalas, and Madurai of the Pandyas. The aim was mostly wealth and tribute, not direct annexation. The result was great wealth for Delhi, and the southern kingdoms accepted the overlordship of Delhi.',
    }),
    sl('check', 'Quick check: match kingdom and dynasty', {
      b: 'Match each place with the dynasty that ruled it.',
      chk: 'mt_deccan',
      n: 'Recall each place on the map and the dynasty that ruled it.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) Aim and goods. [3] (ii) Supervision. [3] (iii) Results. [4]',
      bl: [
        '(i) Aim; grain, cloth, horses.',
        '(ii) Superintendent, granaries, registration, spies.',
        '(iii) Steady prices; large army; ended after him.',
        'Aim for one point per mark.',
      ],
      v: vPlan1,
      n: 'To plan a ten mark answer in three parts, give three marks to the first part, three to the second and four to the last. Part one is the aim and the goods whose prices were fixed. Part two is how the markets were supervised. Part three covers the results and what happened after his reign.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        '**Inscriptions** and the **Qutab Minar** (begun about **1199**, completed by **Iltutmish**).',
        'Dynasties: **Mamluk, Khalji, Tughlaq, Sayyid, Lodi**.',
        '**Markets**: fixed prices for a large army on modest pay.',
        '**Deccan**: Malik Kafur; wealth and overlordship.',
      ],
      v: vSummary1,
      n: 'To sum up. Inscriptions and the Qutab Minar help us learn about the Sultanate. The dynasties in order are Mamluk, Khalji, Tughlaq, Sayyid and Lodi. Alauddin Khalji fixed prices to keep a large army on modest salaries. His general Malik Kafur led the Deccan expedition, which brought wealth to Delhi.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Learn the **order of the five dynasties** with their years.',
        'Give the **aim** of the market regulations before the measures.',
        'Pair each kingdom with its **dynasty** and say **about** with dates.',
        'For the Minar, name **Aibak**, **Iltutmish** and one later repairer.',
        'State aims and results in **neutral, factual** words.',
      ],
      n: 'Some exam habits. Learn the order of the five dynasties with their years. Give the aim of the market regulations before listing the measures. Pair each kingdom with its dynasty, and say about with the dates. For the Qutab Minar, name Aibak, Iltutmish and one later repairer. Write aims and results in neutral, factual words.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Delhi Sultanate — Part 2: Alauddin\'s Reforms and Muhammad bin Tughlaq',
  goals: [
    'Explain the measures Alauddin Khalji took to control the nobility',
    'Describe his military reforms and revenue reforms',
    'Explain the reasons for, and failure of, the transfer of the capital and the token currency',
    'Explain why the Doab tax led to unrest, and evaluate the plans of conquest',
  ],
  slides: [
    sl('title', 'Reforms and experiments in the Sultanate', {
      b: 'Part 2 — Alauddin Khalji\'s reforms and the experiments of Muhammad bin Tughlaq.',
      v: vRoute2,
      n: 'In this part we study how Alauddin Khalji dealt with the nobles, the army and the revenue. Then we study Muhammad bin Tughlaq: his transfer of the capital, his token currency, his tax in the Doab and his plans of conquest.',
    }),
    sl('concept', 'Keeping a check on the nobility', {
      b: 'Aim: to keep nobles under the ruler\'s control.',
      bl: [
        '**Feasts and gatherings** only with **permission**.',
        '**Marriages** between noble families only with **permission**.',
        '**Ban on liquor**; a **spy system**.',
        '**Grants and gifts of land** taken back.',
      ],
      v: vNobles,
      n: 'Alauddin Khalji wished to keep the nobles under his control. Feasts and gatherings of nobles were allowed only with permission. So were marriages between noble families. He banned liquor, used a spy system, and took back many grants and gifts of land.',
    }),
    sl('diagram', 'Why the nobility was watched', {
      v: vNobleFlow,
      n: 'This flow shows the thinking. Nobles could be rich and powerful. Rules of permission, a spy system, a ban on liquor and the taking back of land grants were meant to keep them under the control of the ruler.',
    }),
    sl('check', 'Quick check: permission', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_nobles',
      n: 'Think about which gatherings and marriages of nobles needed permission.',
    }),
    sl('concept', 'Military reforms', {
      bl: [
        'A **permanent standing army** paid in **cash**.',
        '**Dagh**: branding of horses.',
        '**Huliya** or **chehra**: a descriptive roll of soldiers.',
        '**Forts** strengthened against the Mongols.',
      ],
      v: vArmy,
      n: 'Alauddin Khalji kept a permanent standing army paid in cash. Horses were branded, which was called dagh. A descriptive roll of each soldier, called the huliya or chehra, was kept. Forts were strengthened against the Mongols.',
    }),
    sl('diagram', 'Why the army was reformed', {
      v: vArmyWhy,
      n: 'The Mongol raids threatened Delhi. A large army paid in cash was kept under the ruler. The dagh and the huliya prevented false musters, in which a soldier or horse is shown that does not exist. The result was a stronger defence of Delhi.',
    }),
    sl('concept', 'Revenue reforms', {
      bl: [
        '**Measurement of land**.',
        'Tax in the **Doab** raised to about **half of the produce**.',
        'Collected in **cash or kind**.',
        'Privileges of **khuts, muqaddams and chaudharis** curbed.',
      ],
      v: vRevenue,
      n: 'The land was measured, so that revenue could be based on the area cultivated. In the Doab the tax was raised to about half of the produce. It could be collected in cash or in kind. The privileges of local intermediaries, called khuts, muqaddams and chaudharis, were curbed.',
    }),
    sl('example', 'Worked example 3: a revenue calculation', {
      b: 'Imagined village: 80 quintals of grain, tax about half.',
      bl: [
        'Step 1 — Find the produce.',
        'Step 2 — Find the rate.',
        'Step 3 — Calculate.',
        'Step 4 — State with the word about.',
      ],
      v: vCalc,
      n: 'Take an imagined village that produces eighty quintals of grain. The rate in the Doab was about half. Half of eighty is forty. So about forty quintals were due to the state. Always say about, because the rate is a commonly taught figure.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each term with its meaning.',
      chk: 'mt_terms',
      n: 'Recall each term from the reforms of Alauddin Khalji and match it with its meaning.',
    }),
    sl('concept', 'Muhammad bin Tughlaq in brief', {
      bl: [
        'Reign about **1325 to 1351**.',
        'Plans: a **new capital**, **token currency**, **tax in the Doab**, **conquests**.',
        'Historians **differ** in judging him.',
      ],
      v: vMbt,
      n: 'Muhammad bin Tughlaq ruled from about thirteen twenty five to thirteen fifty one. He made bold plans, a new capital, a token currency, a higher tax in the Doab, and conquests. Historians differ in judging him, and we shall present both views.',
    }),
    sl('concept', 'Transfer of the capital', {
      bl: [
        'About **1327**: capital moved from Delhi to **Devagiri**, renamed **Daulatabad**.',
        'Reasons: **central location** to control the south; **safety** from Mongol raids.',
        'It failed: **hardship**, **distance** from the north-west frontier; the court **returned to Delhi**.',
      ],
      v: vCapital,
      n: 'About thirteen twenty seven the capital was moved from Delhi to Devagiri, which was renamed Daulatabad. Reasons commonly given are its central position to control the south and safety from Mongol raids. The plan failed because of the hardship of the long journey and the distance from the north west frontier. The court returned to Delhi.',
    }),
    sl('diagram', 'Reasons for and against', {
      v: vCapWhy,
      n: 'Compare the two columns. The reasons for the move were a central place from which to control the south and safety from Mongol raids. The reasons for failure were the hardship of the long journey and the distance from the north west frontier. In the end the court returned to Delhi.',
    }),
    sl('concept', 'The token currency', {
      bl: [
        'About **1329 to 30**: **bronze or copper coins** valued like **silver tankas**.',
        'As commonly taught, a time of **silver shortage**.',
        'It failed: **easy forgery**, **loss of trust**; coins **withdrawn** and exchanged by the treasury.',
      ],
      v: vToken,
      n: 'About thirteen twenty nine to thirty, bronze or copper coins were to be valued like silver tankas. As commonly taught, this was a time of silver shortage. The coins were easy to forge and people lost trust in them. In the end the coins were withdrawn and exchanged by the treasury.',
    }),
    sl('diagram', 'The token currency in four questions', {
      v: vTokenWhy,
      n: 'Four questions help you remember the token currency. What was the plan? Copper or bronze coins valued like silver. Why was it tried? A shortage of silver. Why did it fail? Easy forgery and loss of trust. How did it end? The treasury withdrew the coins and exchanged them.',
    }),
    sl('check', 'Quick check: why the tokens?', {
      b: 'Choose the reason commonly taught for the token currency.',
      chk: 'm_token_reason',
      n: 'Think about the metal that was in short supply, and what the new coins were meant to stand in for.',
    }),
    sl('concept', 'Taxation in the Doab', {
      bl: [
        'The **tax was increased** in the **Doab**.',
        'It came at a time of **famine**.',
        'Result: **unrest** and the **flight of peasants**.',
        '**Relief** by loans and wells came **late**.',
      ],
      v: vDoab,
      n: 'Muhammad bin Tughlaq raised the tax in the Doab. This came at a time of famine, so many peasants could not pay. The result was unrest, and many peasants fled from their fields. Relief measures such as loans and wells came late.',
    }),
    sl('concept', 'Plans of conquest', {
      bl: [
        '**Khurasan**: an army was **raised** and then **disbanded**.',
        '**Qarachil** (Kumaon hills region): an expedition with **heavy losses**.',
      ],
      v: vConquest,
      n: 'Muhammad bin Tughlaq also planned conquests. For Khurasan an army was raised and then disbanded. The expedition to Qarachil, in the Kumaon hills region, suffered heavy losses. Neither plan achieved its aim.',
    }),
    sl('check', 'Quick check: name the region', {
      b: 'Fill in the blank.',
      chk: 'fb_doab',
      n: 'Recall the fertile region between the Ganga and the Yamuna where the tax was raised.',
    }),
    sl('diagram', 'Two views of Muhammad bin Tughlaq', {
      b: 'Present both views as the views of historians.',
      v: vViews,
      n: 'Historians hold two views. Some regard him as a far sighted ruler whose plans were poorly carried out. Others regard his schemes as impractical. A balanced answer gives both views and a reason, rather than only praise or blame.',
    }),
    sl('example', 'Worked example 4: planning a 10-mark evaluation', {
      b: 'Question: (i) Doab tax. [3] (ii) Plans of conquest. [3] (iii) Evaluate. [4]',
      bl: [
        '(i) Tax in a famine; unrest; flight of peasants.',
        '(ii) Khurasan disbanded; Qarachil losses; late relief.',
        '(iii) Two views; a balanced conclusion.',
        'Use neutral words: some historians, others.',
      ],
      v: vPlan2,
      n: 'Plan this answer in three parts. Part one covers the Doab tax at a time of famine and its results. Part two covers the plans of conquest, Khurasan and Qarachil. Part three gives the two views of historians and a balanced conclusion. Use neutral words such as some historians and others.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        '**Alauddin**: permission, spies, land grants taken back; standing army, **dagh**, **huliya**; land measured.',
        '**Capital**: Daulatabad, about **1327**; failed.',
        '**Tokens**: about **1329 to 30**; failed.',
        '**Doab tax** and **plans of conquest**; two views.',
      ],
      v: vSummary2,
      n: 'To sum up. Alauddin Khalji kept a check on the nobles, built a standing army and reformed the revenue. Muhammad bin Tughlaq moved the capital to Daulatabad and issued token coins, and both plans failed. His tax in the Doab at a time of famine caused unrest. Historians differ in judging him.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Separate the **reasons** for a plan from the **reasons** for its failure.',
        'Say **about** with dates such as **1327** and **1329 to 30**.',
        'Use the words **some historians** and **others** when you evaluate.',
        'Explain **dagh** and **huliya** with one line each.',
        'Write about rulers\' policies by their **aims and results**.',
      ],
      n: 'Some exam habits. Keep the reasons for a plan apart from the reasons for its failure. Say about with the dates. Use the words some historians and others when you evaluate. Explain dagh and huliya in one line each. Write about a ruler\'s policies by their aims and results.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Delhi Sultanate — notes',
  sections: [
    {
      h: '1. Sources: inscriptions and the Qutab Minar',
      t: 1,
      b: '- **Inscriptions** in **Arabic and Persian** on monuments and coins record **builders, dates and titles**, so they help to fix who built what and when.\n- **Chronicles**, such as the history by **Ziauddin Barani**, give an author\'s account and are checked against other evidence.\n- **Qutab Minar (Qutb Minar), Delhi:** begun by **Qutbuddin Aibak** about **1199**; the upper storeys were completed by **Iltutmish**; it was repaired and raised later, including by **Firuz Shah Tughlaq** after lightning damage. It is about **72.5 m** high, built of **red and buff sandstone and marble**, with **bands of carved inscriptions**. It is part of the UNESCO World Heritage Site **Qutb Minar and its Monuments** (1993).\n- It shows the **building style** (arches, calligraphy) and the rulers who worked on it.',
      terms: [['Inscription', 'Writing carved or stamped on stone, metal or a coin.'], ['Calligraphy', 'The art of beautiful writing.'], ['Chronicle', 'A written account of events by an author of the time.']],
      v: vSources,
      vs: [vInscr, vBuilders, vMinarFacts, vMinarTells],
    },
    {
      h: '2. The Qutab Minar in a sketch',
      t: 1,
      b: '- The sketch shows **five storeys** with balconies and **bands of inscriptions**.\n- Brackets show who **began** the tower and who **completed the upper storeys**; later repairs are noted separately.\n- The sketch is **schematic** and **not to scale**; storey divisions are approximate.',
      terms: [['Storey', 'One level of a tall building.']],
      v: vMinar,
      vs: [],
    },
    {
      h: '3. The dynasties in order',
      t: 2,
      b: '- **Mamluk (Slave or Ilbari):** 1206 to 1290, begins with Qutbuddin Aibak.\n- **Khalji:** 1290 to 1320, founded by Jalaluddin Khalji; Alauddin Khalji is the best-known ruler.\n- **Tughlaq:** 1320 to 1414, founded by Ghiyasuddin Tughlaq.\n- **Sayyid:** 1414 to 1451, founded by Khizr Khan.\n- **Lodi:** 1451 to 1526, founded by Bahlul Lodi; it ends at the **First Battle of Panipat** (1526).\n- Lengths: Tughlaq about 94 years (longest), Khalji about 30 years (shortest).',
      terms: [['Mamluk', 'Slave; the first dynasty, also called Ilbari.'], ['Sultanate', 'A state ruled by a sultan.']],
      v: vDynasties,
      vs: [vEarlyDyn, vLateDyn],
    },
    {
      h: '4. Alauddin Khalji: market regulations and the Deccan expedition',
      t: 3,
      b: '- **Alauddin Khalji** ruled about **1296 to 1316**.\n- **Market regulations. Aim:** to maintain a large standing army on modest salaries, especially against Mongol raids. **Measures:** fixed prices for grain, cloth, horses and other goods; separate markets; a market superintendent (**shahna-i-mandi**); state granaries; registration of merchants; spies reporting on traders; strict penalties for cheating on weights. **Results:** stable prices in Delhi during his reign, but the system ended after him.\n- **Deccan expedition**, led by **Malik Kafur:** **Devagiri** (Yadavas) about 1307 to 08; **Warangal** (Kakatiyas) about 1309 to 10; **Dwarasamudra** (Hoysalas) about 1311; **Madurai** (Pandyas) about 1311. **Aim:** wealth and tribute rather than direct annexation (mostly). **Results:** great wealth for Delhi; the southern kingdoms accepted overlordship.',
      terms: [['Shahna-i-mandi', 'The market superintendent.'], ['Tribute', 'Wealth paid by one ruler to another who is more powerful.'], ['Overlordship', 'Rule over a ruler who keeps his own kingdom.']],
      v: vMarket,
      vs: [vMarketCtl, vDeccanMap, vDeccanTable, vDeccanAims],
    },
    {
      h: '5. Alauddin Khalji: nobility, army and revenue',
      t: 4,
      b: '- **Nobility:** feasts and gatherings of nobles only with **permission**; marriages between noble families only with **permission**; a **ban on liquor**; a **spy system**; **grants and gifts of land taken back**.\n- **Military reforms:** a **permanent standing army paid in cash**; **dagh** (branding of horses); **huliya or chehra** (descriptive roll of soldiers); **forts strengthened** against the Mongols.\n- **Revenue reforms:** **measurement of land**; land tax in the **Doab** raised to about **half of the produce**; collection in **cash or kind**; curbs on the privileges of **khuts, muqaddams and chaudharis**.',
      terms: [['Dagh', 'Branding of horses.'], ['Huliya (chehra)', 'A descriptive roll of soldiers.'], ['Khut, muqaddam, chaudhari', 'Local intermediaries in revenue collection.']],
      v: vNobles,
      vs: [vArmy, vArmyWhy, vRevenue, vCalc],
    },
    {
      h: '6. Muhammad bin Tughlaq: capital and token currency',
      t: 5,
      b: '- **Muhammad bin Tughlaq** ruled about **1325 to 1351**.\n- **Transfer of the capital**, about **1327**, from Delhi to **Devagiri**, renamed **Daulatabad**. Reasons commonly taught: a **central location** to control the south and **safety from Mongol raids**. Failure: the **hardship** of the long journey, the **distance from the north-west frontier**, and the return to Delhi.\n- **Token currency**, about **1329 to 30**: **bronze or copper coins** valued like **silver tankas**, as commonly taught at a time of **silver shortage**. Failure: **easy forgery**, **loss of trust**, and the coins were **withdrawn and exchanged by the treasury**.',
      terms: [['Tanka', 'A silver coin of the time.'], ['Token currency', 'Coins of a cheaper metal valued like a costlier one.'], ['Daulatabad', 'The new name given to Devagiri.']],
      v: vCapital,
      vs: [vCapWhy, vToken, vTokenWhy, vMbt],
    },
    {
      h: '7. Muhammad bin Tughlaq: the Doab and plans of conquest',
      t: 6,
      b: '- **Taxation in the Doab:** the tax increase came at a time of **famine**, which led to **unrest** and the **flight of peasants**. Later **relief measures** (loans, wells) came **late**.\n- **Plans of conquest:** **Khurasan**: an army was raised and then **disbanded**. **Qarachil** (Kumaon hills region): an expedition that suffered **heavy losses**.\n- **Two views:** some historians regard him as a **far-sighted** ruler whose plans were **poorly carried out**; others regard them as **impractical**.',
      terms: [['Doab', 'The fertile land between the Ganga and the Yamuna.'], ['Khurasan', 'A region to the north-west that he planned to conquer.']],
      v: vDoab,
      vs: [vConquest, vViews],
    },
  ],
  tips: '**Common mistakes**\n- Giving a date without the word about, or mixing up the order of the dynasties.\n- Saying that Iltutmish began the Qutab Minar (Aibak began it, Iltutmish completed the upper storeys).\n- Mixing up the Deccan kingdoms and their dynasties.\n- Giving the Alauddin reforms without their aim.\n- Writing that the capital moved to Daulatabad for a single reason; give both reasons and the causes of failure.\n- Giving only praise or only blame of Muhammad bin Tughlaq instead of both views.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or term.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a result, a link or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What do inscriptions on monuments and coins record?', 'The **builder or issuer**, the **date** and the **titles** of a ruler.', 'concept', 1],
  ['In which scripts are Sultanate inscriptions often written?', '**Arabic** and **Persian**.', 'fact', 1],
  ['Who began the Qutab Minar?', '**Qutbuddin Aibak**, about 1199.', 'fact', 1],
  ['Who completed the upper storeys of the Qutab Minar?', '**Iltutmish**.', 'fact', 1],
  ['Who repaired the Minar after lightning damage?', 'Later rulers, including **Firuz Shah Tughlaq**.', 'fact', 1],
  ['Size and materials of the Qutab Minar', 'About **72.5 m**; red and buff sandstone and marble; bands of carved inscriptions.', 'fact', 1],
  ['Qutab Minar and UNESCO', 'Part of the World Heritage Site **Qutb Minar and its Monuments**, listed **1993**.', 'fact', 1],
  ['Name the dynasties in order', 'Mamluk, Khalji, Tughlaq, Sayyid, Lodi.', 'concept', 2],
  ['Mamluk dynasty', '**1206 to 1290**; also called Slave or Ilbari.', 'fact', 2],
  ['Khalji dynasty', '**1290 to 1320**.', 'fact', 2],
  ['Tughlaq dynasty', '**1320 to 1414**; the longest of the five.', 'fact', 2],
  ['Sayyid and Lodi dynasties', 'Sayyid **1414 to 1451**; Lodi **1451 to 1526**.', 'fact', 2],
  ['How did the Sultanate end?', 'The Lodi line ended at the **First Battle of Panipat**, 1526.', 'fact', 2],
  ['Alauddin Khalji', 'Ruled about **1296 to 1316**.', 'fact', 3],
  ['Aim of the market regulations', 'To keep a **large standing army** on **modest salaries**, especially against Mongol raids.', 'concept', 3],
  ['Goods with fixed prices', 'Grain, cloth, horses and other goods.', 'fact', 3],
  ['Shahna-i-mandi', 'The **market superintendent**.', 'definition', 3],
  ['Result of the market regulations', 'Steady prices in Delhi in his reign; the system ended after him.', 'concept', 3],
  ['Who led the Deccan expedition?', '**Malik Kafur**.', 'fact', 3],
  ['Deccan kingdoms and dynasties', 'Devagiri (Yadavas), Warangal (Kakatiyas), Dwarasamudra (Hoysalas), Madurai (Pandyas).', 'fact', 3],
  ['Aim and results of the Deccan expedition', 'Wealth and tribute, not direct annexation (mostly); wealth for Delhi; overlordship accepted.', 'concept', 3],
  ['Measures against the nobles', 'Permission for feasts and marriages; ban on liquor; spies; grants taken back.', 'concept', 4],
  ['Dagh', '**Branding of horses**.', 'definition', 4],
  ['Huliya or chehra', 'A **descriptive roll** of soldiers.', 'definition', 4],
  ['Revenue reforms of Alauddin', 'Land measured; tax about **half** in the Doab; cash or kind; intermediaries curbed.', 'concept', 4],
  ['Muhammad bin Tughlaq', 'Ruled about **1325 to 1351**.', 'fact', 5],
  ['Transfer of the capital', 'About **1327**, Delhi to Devagiri, renamed **Daulatabad**.', 'fact', 5],
  ['Why Daulatabad failed', '**Hardship** of the long journey; **distance** from the north-west frontier; return to Delhi.', 'concept', 5],
  ['The token currency', 'About 1329 to 30; **bronze or copper** coins valued like **silver tankas**; failed through **forgery** and **loss of trust**.', 'concept', 5],
  ['Tax in the Doab', 'Raised in a **famine**: **unrest** and the **flight of peasants**; relief came late.', 'concept', 6],
  ['Khurasan and Qarachil', 'Khurasan army **disbanded**; Qarachil expedition suffered **heavy losses**.', 'fact', 6],
  ['Views on Muhammad bin Tughlaq', 'Some historians: **far-sighted but poorly carried out**; others: **impractical**.', 'concept', 6],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The Delhi Sultanate',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_minar_firuz', 'm_longest', 'm_market_end', 'm_token_fail', 'ar_reforms', 's_conquest', 's3_military'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_market', 'l_capital'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The Delhi Sultanate',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_minar_height', 'm_start1206', 'm_shahna', 'm_diary_goods', 'm_dagh', 'm_capital_reason', 'm_khurasan', 'ar_token', 's_inscr', 's_nobility', 's_cap_fail', 's3_deccan', 's3_debate'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_sources', 'l_nobility', 'l_doab'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t06 of icse-9-history-civics-ch12 only (inscriptions and the Qutab Minar; the five dynasties in order; Alauddin Khalji markets and the Deccan expedition; his nobility, military and revenue measures; Muhammad bin Tughlaq capital and token currency; Doab taxation and plans of conquest)',
    originality: 'every diary, museum label, school scene and coin-room scene is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no inscription or chronicle is quoted',
    data: 'dynasty years asserted contiguous (each dynasty ends where the next begins); rulers\' dates given as about; imagined arithmetic stated in the solutions',
    facts: 'Mamluk 1206-1290, Khalji 1290-1320, Tughlaq 1320-1414, Sayyid 1414-1451, Lodi 1451-1526; Qutab Minar begun about 1199, about 72.5 m, UNESCO 1993; Alauddin Khalji about 1296-1316; Deccan campaigns about 1307-1311; Muhammad bin Tughlaq about 1325-1351; capital about 1327; token currency about 1329-30',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
