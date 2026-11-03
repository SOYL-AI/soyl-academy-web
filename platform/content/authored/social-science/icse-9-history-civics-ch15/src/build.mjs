// Build ICSE 9 History & Civics ch15 The Modern Age in Europe: Renaissance. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch15/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch15', 'social-science');
const { causesFigure, timelineFigure, modelsFigure, printingFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Meaning and where it began', 'Constantinople, feudalism, trade', 'Enquiry and the printing press'], 'Route map of Part 1: the meaning of the Renaissance and where it began, then the capture of Constantinople, feudalism and trade, then the spirit of enquiry and the printing press', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Leonardo da Vinci', 'Shakespeare and Copernicus', 'Consequences of the Renaissance'], 'Route map of Part 2: Leonardo da Vinci, then Shakespeare and Copernicus, then the consequences of the Renaissance', 'Part 2 at a glance');
const vCauses = causesFigure('Web of six causes feeding the Renaissance: the capture of Constantinople, the decline of feudalism, new trade routes, wealthy patrons such as the Medici, the spirit of enquiry and the printing press; schematic and not a ranking', 'Six causes of the Renaissance (schematic).');
const vTimeline = timelineFigure('Time line from 1347 to 1616 with one row per event: Black Death about 1347 to 1351, Gutenberg about 1450, Leonardo 1452 to 1519, Constantinople 1453, Caxton from 1476, Columbus 1492, Vasco da Gama 1498, Copernicus 1543 and Shakespeare 1564 to 1616; roughly to scale', 'The Renaissance on a time line (roughly to scale).');
const vModels = modelsFigure('Two schematic diagrams side by side: on the left an earth-centred model with the Moon, Sun, a planet and the fixed stars on rings round the Earth; on the right a sun-centred model with a planet, the Earth, another planet and the fixed stars on rings round the Sun; not to scale', 'Geocentric and heliocentric models (schematic, not to scale).');
const vPrintFig = printingFigure('Flow in two rows: Mainz about 1450 where Gutenberg uses movable type, then the Gutenberg Bible about 1455, then Caxton printing in England from 1476; then books become cheaper and more numerous, literacy spreads and ideas travel faster across Europe', 'How printing spread new ideas (schematic).');

const vMeaning = table(['Point', 'The Renaissance'], [
  ['The word', 'French, meaning rebirth'],
  ['What was reborn', 'Interest in classical Greek and Roman learning'],
  ['What was new', 'New ideas in art, literature and science'],
  ['When', 'About the 14th to the 16th century'],
], 'Table about the Renaissance: a French word meaning rebirth, a revival of interest in classical Greek and Roman learning together with new ideas in art, literature and science, lasting about the 14th to 16th century');
const vWhere = flow('LR', ['Begins in Italy, in Florence', 'Spreads to France, Germany, England and more', 'Lasts about the 14th to 16th century'], 'Flow: the Renaissance begins in Italy in the city of Florence, spreads across Europe, and lasts about the 14th to the 16th century', 'Where and when.');
const vConst = table(['Point', 'The capture of Constantinople'], [
  ['Who', 'The Ottoman Turks'],
  ['When', '1453'],
  ['City', 'Capital of the Eastern Roman (Byzantine) Empire'],
  ['Why it matters', 'Two results, one for learning and one for trade'],
], 'Table about the capture of Constantinople: taken by the Ottoman Turks in 1453, the capital of the Eastern Roman or Byzantine Empire, with two results one for learning and one for trade');
const vConstFlow = flow('LR', ['Ottoman Turks take Constantinople, 1453', 'Greek scholars carry manuscripts to Italy', 'Study of classical texts grows'], 'Flow: the Ottoman Turks take Constantinople in 1453, Greek scholars carry manuscripts to Italy, and the study of classical texts grows', 'Effect on learning.');
const vConstTrade = flow('LR', ['Routes to the East are disrupted', 'Europeans want other ways to Asia', 'Search for new sea routes'], 'Flow: routes to the East are disrupted, Europeans want other ways to Asia, and a search for new sea routes begins', 'Effect on trade.');
const vFeudal = table(['Development', 'Effect on feudalism'], [
  ['The Crusades', 'Weakened many feudal lords'],
  ['The Black Death, about 1347 to 1351', 'Labour shortage; peasants could demand wages'],
  ['Growth of towns, trade and a money economy', 'A rich middle class emerged'],
  ['Gunpowder and cannon', 'Castles and knights became less important'],
  ['Result', 'Kings grew stronger'],
], 'Table of developments and their effect on feudalism: the Crusades weakened lords, the Black Death caused labour shortages and wage demands, towns and trade created a rich middle class, cannon made castles less important, and kings grew stronger');
const vFeudalFlow = flow('LR', ['Lords weakened; peasants gain bargaining power', 'Towns, trade and a middle class grow', 'Kings grow stronger'], 'Flow: lords weakened and peasants gain bargaining power, towns trade and a middle class grow, and kings grow stronger', 'The decline of feudalism.');
const vSort = table(['Imagined clue', 'Cause it points to'], [
  ['A plague empties a manor; workers ask for wages', 'Black Death'],
  ['An iron gun breaks a castle wall', 'Gunpowder and cannon'],
  ['A cloth trader in a port buys paintings', 'Growth of trade; middle class'],
  ['A Greek teacher arrives in Italy with old books', 'Capture of Constantinople'],
], 'Table sorting four imagined clues into causes: a plague and wages point to the Black Death, an iron gun breaking a wall points to cannon, a cloth trader buying paintings points to trade and the middle class, and a Greek teacher with old books points to the capture of Constantinople');
const vTrade = table(['Point', 'Trade and wealth'], [
  ['Venice and Genoa', 'Italian city-states made rich by trade with the East'],
  ['Result', 'Towns, banks and a rich middle class'],
  ['Voyages as linked consequences', 'Columbus 1492; Vasco da Gama reached Calicut 1498'],
], 'Table about trade and wealth: Venice and Genoa were Italian city-states made rich by trade with the East, with towns, banks and a middle class as a result, and voyages as linked consequences, Columbus in 1492 and Vasco da Gama at Calicut in 1498');
const vPatron = table(['Patron or voyager', 'Role'], [
  ['The Medici of Florence', 'Wealthy patrons who supported artists and scholars'],
  ['Columbus, 1492', 'Crossed the Atlantic'],
  ['Vasco da Gama, 1498', 'Reached Calicut in India by sea'],
], 'Table: the Medici of Florence were wealthy patrons who supported artists and scholars, Columbus crossed the Atlantic in 1492, and Vasco da Gama reached Calicut in 1498');
const vEnq = table(['Idea', 'Meaning'], [
  ['Spirit of enquiry', 'Questioning tradition and authority'],
  ['Method', 'Reason, observation and experiment'],
  ['Humanism', 'Interest in human life and abilities'],
  ['Petrarch', 'Often called the father of humanism'],
], 'Table: the spirit of enquiry is questioning tradition and authority, its method is reason observation and experiment, humanism is interest in human life and abilities, and Petrarch is often called the father of humanism');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Meaning (rebirth); classical learning; Italy, Florence'],
  ['(ii)', '3', 'Constantinople 1453; scholars and manuscripts; trade routes'],
  ['(iii)', '4', 'Black Death; wages; towns and trade; kings stronger'],
], 'Table planning a ten-mark answer on the beginnings of the Renaissance: part (i) meaning and place for 3 marks, part (ii) Constantinople for 3 marks, part (iii) decline of feudalism for 4 marks');
const vSummary1 = table(['Topic', 'Key points'], [
  ['Meaning', 'Rebirth; classical learning; Italy, Florence; about the 14th to 16th century'],
  ['Causes', '1453; decline of feudalism; trade and patrons; enquiry; printing'],
  ['Printing', 'Gutenberg, Mainz, about 1450; Bible about 1455; Caxton from 1476'],
], 'Summary table of Part 1: the meaning of the Renaissance, its causes, and printing with Gutenberg about 1450, the Gutenberg Bible about 1455 and Caxton from 1476');

const vLeo = table(['Point', 'Leonardo da Vinci (1452 to 1519)'], [
  ['Roles', 'Painter, scientist and engineer'],
  ['Works', 'The Last Supper; the Mona Lisa'],
  ['Notebooks', 'Studies of anatomy; designs for flying machines'],
  ['Label', 'A universal man (Renaissance man)'],
], 'Table about Leonardo da Vinci, 1452 to 1519: painter, scientist and engineer, works The Last Supper and the Mona Lisa, notebooks with studies of anatomy and designs for flying machines, and called a universal man');
const vUniv = flow('LR', ['Art: painting', 'Science: anatomy and nature', 'Engineering: flying machines and devices'], 'Flow of the three fields of Leonardo da Vinci: art through painting, science through anatomy and nature, and engineering through flying machines and other devices', 'Why "universal man"?');
const vShk = table(['Point', 'William Shakespeare (1564 to 1616)'], [
  ['Who', 'English playwright and poet'],
  ['Output', 'About 37 to 39 plays, as counts vary, plus sonnets'],
  ['Subject', 'Human nature'],
  ['Language', 'Enriched the English language'],
], 'Table about William Shakespeare, 1564 to 1616: English playwright and poet who wrote about 37 to 39 plays, as counts vary, plus sonnets, wrote about human nature and enriched the English language');
const vPlays = table(['Play'], [
  ['Hamlet'],
  ['Macbeth'],
  ['Romeo and Juliet'],
  ['Julius Caesar'],
  ['The Merchant of Venice'],
], 'Table naming five plays of Shakespeare: Hamlet, Macbeth, Romeo and Juliet, Julius Caesar and The Merchant of Venice');
const vCop = table(['Point', 'Nicolaus Copernicus (1473 to 1543)'], [
  ['Who', 'Polish astronomer'],
  ['Theory', 'The earth and planets move around the sun (heliocentric)'],
  ['Challenged', 'The older earth-centred (geocentric, Ptolemaic) view'],
  ['Book', 'Published in 1543'],
  ['Later', 'Foundation for astronomers such as Galileo and Kepler'],
], 'Table about Nicolaus Copernicus, 1473 to 1543: a Polish astronomer who proposed that the earth and planets move around the sun, challenging the geocentric Ptolemaic view, with his book published in 1543 and laying the foundation for Galileo and Kepler');
const vCompare = table(['Question', 'Geocentric view', 'Heliocentric view'], [
  ['What is at the centre?', 'The earth', 'The sun'],
  ['What moves?', 'The sun and planets move round the earth', 'The earth and planets move round the sun'],
  ['Who is linked?', 'Ptolemy (older view)', 'Copernicus (1543)'],
], 'Table comparing the geocentric view with the heliocentric view: the earth or the sun at the centre, which bodies move, and who is linked, Ptolemy or Copernicus');
const vConsTable = table(['Consequence', 'In brief'], [
  ['Humanism', 'Interest in human life and abilities'],
  ['Realism in art', 'Perspective, anatomy and nature'],
  ['Growth of science', 'The experimental method'],
  ['Vernacular literature', 'Dante in Italian; Chaucer in English'],
  ['Nation-states', 'Stronger kings and growing national feeling'],
], 'Table of consequences of the Renaissance: humanism, realism in art with perspective and anatomy, the growth of science and the experimental method, vernacular literature with Dante and Chaucer, and strong nation-states');
const vHum = table(['Consequence', 'Details'], [
  ['Humanism', 'Interest in human life and abilities; Petrarch'],
  ['Realism in art', 'Perspective; a study of anatomy; a close look at nature'],
  ['Example', 'Leonardo\'s studies of the human body'],
], 'Table: humanism is interest in human life and abilities with Petrarch, realism in art uses perspective and a study of anatomy and nature, with Leonardo\'s studies of the human body as an example');
const vSci = table(['Consequence', 'Details'], [
  ['Growth of science', 'Reason, observation and experiment; Copernicus, then Galileo and Kepler'],
  ['Vernacular literature', 'Dante in Italian; Chaucer in English; the printing press helped'],
], 'Table: growth of science with reason observation and experiment from Copernicus to Galileo and Kepler, and vernacular literature with Dante in Italian and Chaucer in English helped by the printing press');
const vNation = flow('LR', ['Lords weaker; middle class richer', 'Kings stronger; nation-states grow', 'Enquiry encourages discoveries and, later, the Reformation'], 'Flow: lords grow weaker and the middle class richer, kings grow stronger and nation-states grow, and the spirit of enquiry encourages discoveries and later the Reformation', 'Politics and the spirit of enquiry.');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Humanism; Petrarch; realism in art'],
  ['(ii)', '3', 'Experimental science; Copernicus; Dante and Chaucer'],
  ['(iii)', '4', 'Weaker lords; stronger kings; discoveries; a spirit of enquiry'],
], 'Table planning a ten-mark answer on the consequences of the Renaissance: part (i) humanism and realism for 3 marks, part (ii) science and vernacular literature for 3 marks, part (iii) nation-states and discoveries for 4 marks');
const vSummary2 = table(['Topic', 'Key points'], [
  ['Leonardo', 'Painter, scientist, engineer; universal man; notebooks'],
  ['Shakespeare, Copernicus', 'Plays on human nature; heliocentric theory, 1543'],
  ['Consequences', 'Humanism, realism, science, vernacular literature, nation-states'],
], 'Summary table of Part 2: Leonardo as painter scientist and engineer, Shakespeare and Copernicus, and the consequences of the Renaissance');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Renaissance — Part 1: Meaning and Causes',
  goals: [
    'Define the Renaissance and say where and when it began',
    'Explain how the capture of Constantinople in 1453 and the decline of feudalism helped it',
    'Explain how trade, patrons, the spirit of enquiry and the printing press spread new ideas',
    'Place the main events on a time line',
  ],
  slides: [
    sl('title', 'The Renaissance: meaning and causes', {
      b: 'Part 1 — what the Renaissance was, and why it began.',
      v: vRoute1,
      n: 'In this part we learn what the word Renaissance means and where it began. Then we study the causes. These are the capture of Constantinople, the decline of feudalism, new trade routes and wealth, the spirit of enquiry, and the printing press.',
    }),
    sl('concept', 'What is the Renaissance?', {
      bl: [
        'A **French word** meaning **rebirth**.',
        'A revival of interest in **classical Greek and Roman learning**.',
        'Together with **new ideas** in art, literature and science.',
        'Lasted about the **14th to the 16th century**.',
      ],
      v: vMeaning,
      n: 'Renaissance is a French word that means rebirth. It was a revival of interest in the learning of ancient Greece and Rome. It also brought new ideas in art, literature and science. The age lasted from about the fourteenth to the sixteenth century.',
    }),
    sl('diagram', 'Six causes at a glance', {
      b: 'The causes strengthened one another.',
      v: vCauses,
      n: 'This web shows six causes. The capture of Constantinople, the decline of feudalism, new trade routes, wealthy patrons, the spirit of enquiry and the printing press all fed the Renaissance. They are not in order of importance. They worked together and strengthened one another.',
    }),
    sl('concept', 'Where and when it began', {
      bl: [
        'It began in **Italy**, in the city of **Florence**.',
        'It then **spread across Europe**.',
        'It lasted about the **14th to 16th century**.',
      ],
      v: vWhere,
      n: 'The Renaissance began in Italy, in the city of Florence. From there it spread across Europe. It lasted from about the fourteenth to the sixteenth century, so we use the word about with these dates.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each term with its meaning.',
      chk: 'mt_meaning',
      n: 'Match each term with what it means. Think about the French word, the system of lords and peasants, the plague, and the learning of Greece and Rome.',
    }),
    sl('concept', 'The capture of Constantinople, 1453', {
      bl: [
        'The **Ottoman Turks** took the city in **1453**.',
        'It was the capital of the **Eastern Roman (Byzantine) Empire**.',
        'Two results: one for **learning**, one for **trade**.',
      ],
      v: vConst,
      n: 'In fourteen fifty three the Ottoman Turks took Constantinople. It was the capital of the Eastern Roman empire, also called the Byzantine empire. The event had two important results, one for learning and one for trade.',
    }),
    sl('diagram', 'Two results of 1453', {
      v: vConstFlow,
      n: 'First, Greek scholars moved to Italy and carried manuscripts with them. This encouraged the study of classical texts. Second, trade routes to the East were disrupted, which encouraged Europeans to search for new sea routes. The next slide shows the second result.',
    }),
    sl('diagram', 'The search for new sea routes', {
      v: vConstTrade,
      n: 'When the old routes to the East became hard to use, Europeans wanted other ways to reach Asia. This pushed them to search for new sea routes, and so it is a link between the Renaissance and the voyages of discovery.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about Constantinople is true or false.',
      chk: 'tf_constantinople',
      n: 'Recall the year when the Ottoman Turks took Constantinople, and compare it with the year of the voyage of Columbus.',
    }),
    sl('concept', 'The decline of feudalism', {
      bl: [
        'The **Crusades** weakened many feudal lords.',
        'The **Black Death** (about 1347 to 1351) caused **labour shortages**; peasants could demand **wages**.',
        '**Towns, trade and a money economy** grew; a **rich middle class** emerged.',
        '**Gunpowder and cannon** made castles and knights less important.',
        '**Kings grew stronger.**',
      ],
      v: vFeudal,
      n: 'Feudalism declined slowly, for many reasons. The Crusades weakened many lords. The Black Death, about thirteen forty seven to thirteen fifty one, left few workers, so peasants could demand wages. Towns, trade and money grew, and a rich middle class appeared. Cannon made castles less useful, and kings grew stronger.',
    }),
    sl('diagram', 'From weak lords to strong kings', {
      v: vFeudalFlow,
      n: 'Follow the chain. As lords grew weaker, peasants gained bargaining power. Towns and trade grew, and a middle class became richer. At the same time kings grew stronger. This changed society and made room for new ideas.',
    }),
    sl('example', 'Worked example 1: sorting clues into causes', {
      b: 'Read each imagined clue, then name the cause it points to.',
      bl: [
        'Step 1 — Read the clue closely.',
        'Step 2 — Find the key word: plague, gun, trader or scholar.',
        'Step 3 — Match it to a cause.',
        'Step 4 — Add one fact or date.',
      ],
      v: vSort,
      n: 'Here is a method. Read the clue closely. Find the key word, such as plague, gun, trader or scholar. Match it to a cause. Then add one fact or date. A plague and wages point to the Black Death. An iron gun points to cannon. A cloth trader points to trade and the middle class. A Greek teacher points to Constantinople.',
    }),
    sl('check', 'Quick check: which development?', {
      b: 'Choose the development described by the guide.',
      chk: 'm_cannon',
      n: 'Think about what changed when iron guns broke castle walls, and which group gained power as a result.',
    }),
    sl('concept', 'Trade and wealth', {
      bl: [
        '**Venice and Genoa**: Italian city-states made rich by trade.',
        'Towns, banks and a **rich middle class** grew.',
        'Voyages were **linked consequences**: **Columbus, 1492**; **Vasco da Gama, Calicut, 1498**.',
      ],
      v: vTrade,
      n: 'Italian city-states such as Venice and Genoa became rich from trade. Towns, banks and a rich middle class grew. The voyages of Columbus in fourteen ninety two and of Vasco da Gama to Calicut in fourteen ninety eight were linked consequences of the search for new routes.',
    }),
    sl('concept', 'Patrons and voyagers', {
      bl: [
        'The **Medici of Florence** were wealthy **patrons**.',
        'They supported **artists and scholars**.',
        '**Columbus** crossed the Atlantic; **Vasco da Gama** reached **Calicut**.',
      ],
      v: vPatron,
      n: 'Wealthy patrons paid for art and learning. The best known are the Medici of Florence, who supported artists and scholars. Columbus crossed the Atlantic, and Vasco da Gama reached Calicut in India by sea.',
    }),
    sl('concept', 'The spirit of enquiry and humanism', {
      bl: [
        '**Questioning** of tradition and authority.',
        'Reliance on **reason, observation and experiment**.',
        '**Humanism**: interest in human life and abilities.',
        '**Petrarch** is often called the **father of humanism**.',
      ],
      v: vEnq,
      n: 'People began to question tradition and authority. They relied on reason, observation and experiment. Humanism was an interest in human life and abilities. The Italian writer Petrarch is often called the father of humanism.',
    }),
    sl('diagram', 'The printing press', {
      b: 'Schematic flow: dates are approximate.',
      v: vPrintFig,
      n: 'Johannes Gutenberg of Mainz developed printing with movable metal type about fourteen fifty. The Gutenberg Bible dates to about fourteen fifty five. William Caxton printed in England from fourteen seventy six. Books became cheaper and more numerous, literacy spread, and ideas travelled faster.',
    }),
    sl('diagram', 'The Renaissance on a time line', {
      b: 'Roughly to scale; use about with approximate dates.',
      v: vTimeline,
      n: 'This time line runs from the Black Death to the death of Shakespeare. Notice that the Gutenberg press, the fall of Constantinople and Leonardo all come within a few years of one another. Use this picture to fix the order of events.',
    }),
    sl('check', 'Quick check: reason and assertion', {
      b: 'Decide whether the assertion and the reason are true, and whether one explains the other.',
      chk: 'ar_black',
      n: 'Check each statement on its own first. Then ask whether the reason really explains the assertion.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) Meaning and place. [3] (ii) Constantinople. [3] (iii) Decline of feudalism. [4]',
      bl: [
        '(i) Rebirth; classical learning; Florence, Italy.',
        '(ii) 1453; scholars and manuscripts; trade routes.',
        '(iii) Black Death and wages; towns and trade; stronger kings.',
        'Aim for one point per mark.',
      ],
      v: vPlan1,
      n: 'To plan a ten mark answer in three parts, give three points to the first part, three to the second, and four to the last. Part one gives the meaning and the place. Part two gives the year, the scholars, the manuscripts and the trade routes. Part three explains the Black Death, wages, towns, trade and stronger kings.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Renaissance means **rebirth**; it began in **Florence, Italy**.',
        'Causes: **Constantinople 1453**, **decline of feudalism**, **trade and patrons**, **enquiry**.',
        'Printing: **Gutenberg**, about **1450**; **Caxton** from **1476**.',
      ],
      v: vSummary1,
      n: 'To sum up. Renaissance means rebirth, and it began in Florence in Italy. The main causes were the fall of Constantinople, the decline of feudalism, trade and wealthy patrons, the spirit of enquiry and the printing press. Gutenberg printed about fourteen fifty, and Caxton in England from fourteen seventy six.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Write **about** with every approximate date.',
        'Give the **year 1453** and **both results** of it.',
        'For feudalism, give **cause then effect**, for example Black Death then wages.',
        'Do not confuse **Gutenberg** (Mainz, about 1450) with **Caxton** (England, 1476).',
        'Name **Venice, Genoa** and the **Medici** correctly.',
      ],
      n: 'Some exam habits. Write the word about with every approximate date. Give the year of the fall of Constantinople and both of its results. For feudalism, give a cause and then its effect. Do not confuse Gutenberg with Caxton. Name Venice, Genoa and the Medici correctly.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Renaissance — Part 2: Leonardo, Shakespeare, Copernicus and Consequences',
  goals: [
    'Describe the contribution of Leonardo da Vinci to art and science',
    'Describe the contribution of William Shakespeare to literature',
    'Explain the heliocentric theory of Copernicus and compare it with the older view',
    'Explain the consequences of the Renaissance',
  ],
  slides: [
    sl('title', 'Art, literature, science and consequences', {
      b: 'Part 2 — three great figures, and what changed in Europe.',
      v: vRoute2,
      n: 'In this part we study three great figures of the Renaissance. They are Leonardo da Vinci in art and science, William Shakespeare in literature, and Nicolaus Copernicus in astronomy. Then we study the consequences of the Renaissance.',
    }),
    sl('concept', 'Leonardo da Vinci, 1452 to 1519', {
      bl: [
        'A **painter, scientist and engineer**.',
        'Works include **The Last Supper** and the **Mona Lisa**.',
        '**Notebooks**: studies of **anatomy**, designs for **flying machines**.',
        'Called a **universal man** (Renaissance man).',
      ],
      v: vLeo,
      n: 'Leonardo da Vinci lived from fourteen fifty two to fifteen nineteen. He was a painter, a scientist and an engineer. His works include The Last Supper and the Mona Lisa. His notebooks hold studies of anatomy and designs for flying machines. He is called a universal man.',
    }),
    sl('diagram', 'Why a universal man?', {
      b: 'He excelled in more than one field.',
      v: vUniv,
      n: 'A universal man excels in many fields. Leonardo painted in art, studied the body and nature in science, and designed flying machines and other devices in engineering. That wide range is why he is also called a Renaissance man.',
    }),
    sl('check', 'Quick check: why universal?', {
      b: 'Choose the correct reason for the label.',
      chk: 'm_universal',
      n: 'Think about what skills Leonardo had, and what the label means. Remember that a label like this is about many skills, not about ruling or travel.',
    }),
    sl('concept', 'William Shakespeare, 1564 to 1616', {
      bl: [
        'An **English playwright and poet**.',
        'About **37 to 39 plays**, as counts vary, plus **sonnets**.',
        'Wrote about **human nature**.',
        '**Enriched the English language**.',
      ],
      v: vShk,
      n: 'William Shakespeare lived from fifteen sixty four to sixteen sixteen. He was an English playwright and poet. He wrote about thirty seven to thirty nine plays, as counts vary, and also sonnets. He wrote about human nature and enriched the English language.',
    }),
    sl('diagram', 'Some famous plays', {
      b: 'Learn the titles; never copy lines.',
      v: vPlays,
      n: 'Some of his plays are Hamlet, Macbeth, Romeo and Juliet, Julius Caesar and The Merchant of Venice. In an answer, name the plays and say what they explore. Do not copy lines from them.',
    }),
    sl('concept', 'Nicolaus Copernicus, 1473 to 1543', {
      bl: [
        'A **Polish astronomer**.',
        'The **earth and planets move around the sun**: the **heliocentric theory**.',
        'It **challenged** the older **earth-centred (geocentric, Ptolemaic) view**.',
        'His **book** was published in **1543**.',
        'It laid the foundation for **Galileo** and **Kepler**.',
      ],
      v: vCop,
      n: 'Copernicus was a Polish astronomer. He proposed that the earth and the planets move around the sun. This is called the heliocentric theory. It challenged the older earth centred view of Ptolemy. His book was published in fifteen forty three. It laid the foundation for later astronomers such as Galileo and Kepler.',
    }),
    sl('diagram', 'Two models of the sky', {
      b: 'Schematic, not to scale.',
      v: vModels,
      n: 'On the left is the older earth centred model, with the earth still at the centre. On the right is the model of Copernicus, with the sun at the centre and the earth moving around it. The picture is a simple sketch and is not drawn to scale.',
    }),
    sl('example', 'Worked example 1: comparing the two views', {
      b: 'Ask what is at the centre, what moves, and who is linked.',
      bl: [
        'Step 1 — What is at the centre?',
        'Step 2 — What moves round it?',
        'Step 3 — Who is linked with the view?',
        'Step 4 — Say which view Copernicus challenged.',
      ],
      v: vCompare,
      n: 'Use four questions. What is at the centre? In the older view it is the earth, and in the new view it is the sun. What moves? In the older view the sun and planets move around the earth. In the new view the earth and planets move around the sun. Ptolemy is linked with the older view and Copernicus with the new.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Decide whether the statement about Copernicus is true or false.',
      chk: 'tf_cop',
      n: 'Think about which body Copernicus placed at the centre.',
    }),
    sl('concept', 'Consequences of the Renaissance', {
      bl: [
        '**Humanism**.',
        '**Realism in art**.',
        'Growth of **science** and the experimental method.',
        '**Vernacular** languages and literature.',
        'Strong **nation-states**.',
      ],
      v: vConsTable,
      n: 'The Renaissance had many consequences. These include humanism, realism in art, the growth of science and the experimental method, the rise of vernacular languages and literature, and the growth of strong nation-states.',
    }),
    sl('concept', 'Humanism and realism in art', {
      bl: [
        '**Humanism**: interest in human life and abilities.',
        '**Realism**: **perspective**, **anatomy** and nature.',
        'Leonardo studied the **human body** closely.',
      ],
      v: vHum,
      n: 'Humanism was an interest in human life and abilities. In art this led to realism. Painters used perspective, studied anatomy and looked closely at nature. Leonardo, who studied the human body closely, is a good example.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Complete the sentence about Petrarch.',
      chk: 'fb_petrarch',
      n: 'Recall the idea for which Petrarch is often called the father.',
    }),
    sl('concept', 'Science and vernacular literature', {
      bl: [
        '**Science** grew through reason, observation and **experiment**.',
        '**Copernicus**, then **Galileo** and **Kepler**.',
        '**Dante** wrote in **Italian**; **Chaucer** in **English**.',
        'The **printing press** helped such books to spread.',
      ],
      v: vSci,
      n: 'Science grew through reason, observation and experiment, from Copernicus to Galileo and Kepler. Vernacular literature also grew. Dante wrote in Italian and Chaucer in English, and the printing press helped such books to reach many readers.',
    }),
    sl('concept', 'Nation-states and the spirit of enquiry', {
      bl: [
        'Weaker lords and richer middle class; **kings grew stronger**.',
        'Growth of strong **nation-states**.',
        'The **spirit of enquiry** encouraged geographical discoveries and, later, the **Reformation** (the next chapter).',
      ],
      v: vNation,
      n: 'As lords weakened and the middle class grew richer, kings grew stronger and nation states developed. The spirit of enquiry also encouraged geographical discoveries, and later the Reformation, which is the subject of the next chapter.',
    }),
    sl('check', 'Quick check: reason and assertion', {
      b: 'Decide whether the assertion and the reason are true, and whether one explains the other.',
      chk: 'ar_vernacular',
      n: 'Check each statement on its own first. Then ask whether the reason really explains the assertion.',
    }),
    sl('diagram', 'The whole age on a time line', {
      b: 'Roughly to scale.',
      v: vTimeline,
      n: 'Here is the time line again. See how the printing press, the voyages and the work of Leonardo overlap. Copernicus and Shakespeare come later, so the Renaissance covers a long span of years.',
    }),
    sl('check', 'Quick check: put the chain in order', {
      b: 'Arrange the stages in the correct order.',
      chk: 'ord_consequence',
      n: 'Start with the invention, and end with what happened to ideas in the whole of Europe.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) Humanism and realism. [3] (ii) Science and vernacular literature. [3] (iii) Nation-states and discoveries. [4]',
      bl: [
        '(i) Humanism and Petrarch; perspective and anatomy.',
        '(ii) Experiment and Copernicus; Dante and Chaucer.',
        '(iii) Weaker lords; stronger kings; discoveries.',
        'Aim for one point per mark.',
      ],
      v: vPlan2,
      n: 'Plan this ten mark answer in three parts. Part one gives humanism with Petrarch, and realism with perspective and anatomy. Part two gives science with Copernicus and experiment, and vernacular literature with Dante and Chaucer. Part three gives weaker lords, stronger kings and discoveries.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        '**Leonardo**: painter, scientist, engineer; a **universal man**.',
        '**Shakespeare**: plays and sonnets; human nature; enriched English.',
        '**Copernicus**: the **heliocentric** theory, 1543.',
        'Consequences: **humanism**, **realism**, **science**, **vernacular literature**, **nation-states**.',
      ],
      v: vSummary2,
      n: 'To sum up. Leonardo was a painter, scientist and engineer and a universal man. Shakespeare wrote plays and sonnets about human nature. Copernicus proposed the heliocentric theory, in his book of fifteen forty three. The consequences were humanism, realism in art, the growth of science, vernacular literature and nation states.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Match each **person** with a **field** and **one work or idea**.',
        'Give **Copernicus\'s book** as **1543**, and say **earth and planets move round the sun**.',
        'Write **about 37 to 39 plays**, since counts vary.',
        'Name **titles** correctly; **never copy** lines from any author.',
        'Mention the **Reformation** in one line only, as a later result.',
      ],
      n: 'Some exam habits. Match each person with a field and one work or idea. Give the year of the book of Copernicus and say that the earth and planets move around the sun. Write about thirty seven to thirty nine plays for Shakespeare, since counts vary. Never copy lines. Mention the Reformation in one line only.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Modern Age in Europe: Renaissance — notes',
  sections: [
    {
      h: '1. Meaning of the Renaissance',
      t: 1,
      b: '- **Renaissance** is a French word meaning **rebirth**. It was a revival of interest in **classical Greek and Roman learning**, together with new ideas in art, literature and science.\n- It lasted about the **14th to the 16th century**. It began in **Italy**, in the city of **Florence**, and spread across Europe.\n- It was not a sudden change: several causes worked together over many years.',
      terms: [['Renaissance', 'A French word meaning rebirth; the revival of classical learning with new ideas.'], ['Classical learning', 'The ideas and writings of ancient Greece and Rome.']],
      v: vMeaning,
      vs: [vWhere],
    },
    {
      h: '2. Causes: Constantinople and the decline of feudalism',
      t: 1,
      b: '- **Capture of Constantinople (1453):** the **Ottoman Turks** took the city, the capital of the Eastern Roman (Byzantine) Empire. Greek scholars moved to **Italy** with manuscripts, which encouraged the study of classical texts. Trade routes to the East were disrupted, which encouraged the search for new sea routes.\n- **Decline of feudalism:** the **Crusades** weakened many lords. The **Black Death** (about 1347 to 1351) caused labour shortages, so peasants could demand wages. **Towns, trade and a money economy** grew and a **rich middle class** emerged. **Gunpowder and cannon** made castles and knights less important. **Kings grew stronger.**',
      terms: [['Feudalism', 'A system in which lords held land and peasants worked it.'], ['Black Death', 'A deadly plague that struck Europe about 1347 to 1351.'], ['Middle class', 'Townspeople, such as traders, who were neither lords nor peasants.']],
      v: vCauses,
      vs: [vConst, vConstFlow, vConstTrade, vFeudal, vFeudalFlow],
    },
    {
      h: '3. Causes: trade, patrons and the spirit of enquiry',
      t: 2,
      b: '- **Trade:** Italian city-states such as **Venice and Genoa** grew rich from trade with the East. **Patrons** such as the **Medici of Florence** used their wealth to support artists and scholars.\n- **Voyages** were linked consequences: **Columbus** crossed the Atlantic in **1492**, and **Vasco da Gama** reached **Calicut** in **1498**.\n- **Spirit of enquiry:** people questioned tradition and authority and relied on **reason, observation and experiment**.\n- **Humanism** is an interest in human life and abilities. **Petrarch** is often called the **father of humanism**.',
      terms: [['Patron', 'A wealthy person who pays for art or learning.'], ['City-state', 'A city that governs itself with its nearby lands.'], ['Humanism', 'Interest in human life and abilities.']],
      v: vTrade,
      vs: [vPatron, vEnq],
    },
    {
      h: '4. Causes: the printing press',
      t: 2,
      b: '- **Johannes Gutenberg** of **Mainz** developed printing with **movable metal type** about **1450**. The **Gutenberg Bible** dates to about **1455**.\n- **William Caxton** printed in **England** from **1476**.\n- **Effects:** books became cheaper and more numerous, literacy spread, and ideas travelled faster across Europe.',
      terms: [['Movable type', 'Separate metal letters that can be arranged, inked and reused.'], ['Literacy', 'The ability to read and write.']],
      v: vPrintFig,
      vs: [vTimeline],
    },
    {
      h: '5. Impact: Leonardo, Shakespeare and Copernicus',
      t: 3,
      b: '- **Leonardo da Vinci (1452 to 1519):** painter, scientist and engineer. Works include **The Last Supper** and the **Mona Lisa**. His notebooks hold studies of **anatomy** and designs for **flying machines** and other devices. He is called a **universal man** (Renaissance man).\n- **William Shakespeare (1564 to 1616):** English playwright and poet. Plays include **Hamlet, Macbeth, Romeo and Juliet, Julius Caesar** and **The Merchant of Venice**. He wrote **about 37 to 39 plays**, as counts vary, and sonnets. He wrote about **human nature** and enriched the English language.\n- **Nicolaus Copernicus (1473 to 1543):** a Polish astronomer who proposed that the **earth and planets move around the sun** (**heliocentric** theory). This challenged the older **earth-centred (geocentric, Ptolemaic)** view. His book was published in **1543** and laid the foundation for later astronomers such as **Galileo** and **Kepler**.',
      terms: [['Universal man', 'A person skilled in many fields; also called a Renaissance man.'], ['Heliocentric', 'Sun-centred.'], ['Geocentric', 'Earth-centred.'], ['Anatomy', 'The study of the structure of the body.']],
      v: vLeo,
      vs: [vUniv, vShk, vPlays, vCop, vModels, vCompare],
    },
    {
      h: '6. Consequences of the Renaissance',
      t: 4,
      b: '- **Humanism:** interest in human life and abilities.\n- **Realism in art:** perspective, a study of anatomy and a close look at nature.\n- **Growth of science** and the experimental method.\n- **Vernacular languages and literature:** Dante wrote in Italian and Chaucer in English, and the printing press helped such books to spread.\n- **Strong nation-states:** lords grew weaker and kings stronger.\n- A **spirit of enquiry** that encouraged geographical discoveries and, later, the Reformation (the next chapter).',
      terms: [['Vernacular', 'The everyday language of a people, as against Latin.'], ['Perspective', 'A way of drawing that shows depth and distance.'], ['Nation-state', 'A country whose people share a government and, often, a language.']],
      v: vConsTable,
      vs: [vHum, vSci, vNation, vTimeline],
    },
  ],
  tips: '**Common mistakes**\n- Writing a date without the word about when it is approximate.\n- Giving only one result of the fall of Constantinople; there are two, one for learning and one for trade.\n- Confusing Gutenberg (Mainz, about 1450) with Caxton (England, from 1476).\n- Saying that Copernicus put the earth at the centre; he put the sun there.\n- Listing a painting as a play, or a play as a painting.\n- Treating the Renaissance as only about art.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or term.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a link or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What does Renaissance mean?', 'A **French word** meaning **rebirth**.', 'definition', 1],
  ['What was reborn in the Renaissance?', 'Interest in **classical Greek and Roman learning**, with new ideas in art, literature and science.', 'concept', 1],
  ['When and where did the Renaissance begin?', 'About the **14th century**, in **Italy** (Florence); it lasted to about the 16th century.', 'fact', 1],
  ['Capture of Constantinople', '**1453**, by the **Ottoman Turks**.', 'fact', 1],
  ['Result of 1453 for learning', '**Greek scholars** moved to Italy with **manuscripts**; classical study grew.', 'concept', 1],
  ['Result of 1453 for trade', 'Trade routes to the East were **disrupted**; search for **new sea routes**.', 'concept', 1],
  ['Black Death', 'About **1347 to 1351**; labour shortages, so peasants could **demand wages**.', 'fact', 1],
  ['How did the Crusades affect feudalism?', 'They **weakened many feudal lords**.', 'concept', 1],
  ['Gunpowder and cannon', 'Made **castles and knights** less important; **kings grew stronger**.', 'concept', 1],
  ['Who emerged as towns and trade grew?', 'A **rich middle class**.', 'fact', 1],
  ['Venice and Genoa', 'Italian **city-states** made rich by **trade**.', 'fact', 2],
  ['The Medici', 'Wealthy **patrons of Florence** who supported artists and scholars.', 'fact', 2],
  ['Columbus', 'Crossed the Atlantic in **1492**.', 'fact', 2],
  ['Vasco da Gama', 'Reached **Calicut** in **1498**.', 'fact', 2],
  ['Spirit of enquiry', '**Questioning** of tradition; reliance on **reason, observation and experiment**.', 'definition', 2],
  ['Humanism', 'Interest in **human life and abilities**.', 'definition', 2],
  ['Father of humanism', '**Petrarch** (often called).', 'fact', 2],
  ['Who developed movable metal type?', '**Johannes Gutenberg** of **Mainz**, about **1450**.', 'fact', 2],
  ['Gutenberg Bible', 'About **1455**.', 'fact', 2],
  ['William Caxton', 'Printed in **England** from **1476**.', 'fact', 2],
  ['Effects of printing', '**Cheaper, more numerous** books; **literacy** spread; ideas travelled **faster**.', 'concept', 2],
  ['Leonardo da Vinci', '**1452 to 1519**; painter, scientist and engineer.', 'fact', 3],
  ['Works of Leonardo', '**The Last Supper** and the **Mona Lisa**; notebooks on **anatomy** and **flying machines**.', 'fact', 3],
  ['Universal man', 'A person skilled in **many fields**; Leonardo is the example.', 'definition', 3],
  ['William Shakespeare', '**1564 to 1616**; English playwright and poet.', 'fact', 3],
  ['Plays of Shakespeare', '**Hamlet, Macbeth, Romeo and Juliet, Julius Caesar, The Merchant of Venice**; about **37 to 39** plays.', 'fact', 3],
  ['Shakespeare\'s contribution', 'Wrote about **human nature**; **enriched the English language**.', 'concept', 3],
  ['Heliocentric theory', '**Copernicus**: the **earth and planets move around the sun**.', 'definition', 3],
  ['Geocentric view', 'The older **earth-centred (Ptolemaic)** view.', 'definition', 3],
  ['Book of Copernicus', 'Published in **1543**; foundation for **Galileo** and **Kepler**.', 'fact', 3],
  ['Consequences of the Renaissance', '**Humanism**, **realism in art**, **science**, **vernacular literature**, **nation-states**.', 'concept', 4],
  ['Realism in art', '**Perspective**, a study of **anatomy** and **nature**.', 'concept', 4],
  ['Vernacular literature', 'Writing in local languages: **Dante** in Italian, **Chaucer** in English.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The Renaissance',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_route_search', 'm_medici', 'm_leo_notebook', 'm_perspective', 'ar_trade_route', 's_constantinople', 's3_three'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_origin', 'l_conseq'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The Renaissance',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_black_death', 'm_venice', 'm_experiment', 'm_caxton', 'm_geocentric', 'm_nation', 'm_shk_plays', 'ar_print', 's_trade', 's_cop', 's_conseq', 's3_feudal', 's3_print'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_trade', 'l_printing', 'l_arts'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-9-history-civics-ch15 only (meaning, Constantinople and feudalism; trade routes, enquiry and printing; Leonardo, Shakespeare and Copernicus; consequences); the Reformation appears in one line only',
    originality: 'every art-club card, apprentice diary, school notebook and museum label is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no line of Shakespeare, Dante, Chaucer, Petrarch or Copernicus is quoted; no artwork or portrait is reproduced',
    data: 'all dates are the commonly taught ones; approximate dates carry about; time line figure is drawn roughly to scale from 1347 to 1616',
    facts: 'Black Death about 1347-1351; Gutenberg movable type about 1450, Bible about 1455; Constantinople 1453; Caxton from 1476; Columbus 1492; Vasco da Gama at Calicut 1498; Leonardo 1452-1519; Copernicus 1473-1543, book 1543; Shakespeare 1564-1616, about 37-39 plays',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
