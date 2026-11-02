// Build ICSE 9 History & Civics ch11 Medieval India: The Cholas. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch11', 'social-science');
const { kingsFigure, adminFigure, templeFigure, waxFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Sources: inscriptions and the Brihadishwara Temple', 'The Chola kings in order'], 'Route map of Part 1: the sources, which are inscriptions and the Brihadishwara Temple, and then the Chola kings in order', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Administration and village assemblies', 'Temple architecture and bronze sculpture'], 'Route map of Part 2: administration and village assemblies, then temple architecture and bronze sculpture', 'Part 2 at a glance');
const vKinds = table(['Source', 'What it is', 'What it helps us learn'], [
  ['Stone inscriptions', 'Writing cut into temple walls and stones', 'Gifts, rules, rulers and places'],
  ['Copper-plate grants', 'Land gifts written on metal sheets', 'Royal gifts and the family and deeds of a king'],
  ['Brihadishwara Temple', 'A great temple of Shiva at Thanjavur', 'Royal power, building skill, art and belief'],
], 'Table of three Chola sources: stone inscriptions, copper-plate grants and the Brihadishwara Temple, with what each helps us learn');
const vInscr = table(['Point', 'Chola inscriptions'], [
  ['Where', 'On temple walls and on stones'],
  ['What they record', 'Gifts of land and lamps, orders, rules and names'],
  ['Value', 'Made at the time, so direct evidence'],
  ['Care', 'Royal praise may exaggerate; compare with other sources'],
], 'Table about Chola inscriptions: found on temple walls and stones, recording gifts, orders, rules and names, valuable as direct evidence, with the care that royal praise may exaggerate');
const vGrants = table(['Grant', 'Note'], [
  ['Anbil plates', 'Copper-plate grants of the Chola kings'],
  ['Thiruvalangadu plates', 'Another well-known set of grants'],
  ['Larger Leiden plates', 'A set kept in the Netherlands, named after its present home'],
  ['How to use them', 'Names, gifts and dates are useful; praise needs care'],
], 'Table of three named sets of Chola copper-plate grants, the Anbil, Thiruvalangadu and Larger Leiden plates, and how to use them');
const vUttar = table(['Point', 'Uttaramerur inscriptions'], [
  ['Where', 'Present-day Kanchipuram district'],
  ['When', 'Reign of Parantaka I; about 919 and 921 CE'],
  ['About', 'How a village sabha chose its members and ran committees'],
  ['Why important', 'Show organised local self-government'],
], 'Table about the Uttaramerur inscriptions: in Kanchipuram district, from the reign of Parantaka I about 919 and 921 CE, about how a village sabha chose members and ran committees, important as evidence of local self-government');
const vLot = flow('LR', ['The village is divided into wards', 'Names of eligible persons go on palm leaves', 'Leaves are put in a pot', 'One leaf is drawn by lot for each ward'], 'Flow of the kudavolai method: the village is divided into wards, names of eligible persons are written on palm leaves, the leaves are put in a pot, and one is drawn by lot for each ward', 'Choosing sabha members by lot (kudavolai).');
const vQual = table(['Rule', 'As commonly taught'], [
  ['Qualifications', 'Owning some land and a house; an age within a set range; knowledge of the Vedas or of administration'],
  ['Disqualifications', 'For example, failing to give accounts of an earlier post, or serious wrongdoing'],
  ['Committees (variyams)', 'For tanks, gardens, justice and other village work'],
], 'Table of the Uttaramerur rules as commonly taught: qualifications such as land, a house, age and learning; disqualifications such as failing to give accounts; and committees called variyams for tanks, gardens and justice');
const vReadSrc = table(['Step', 'Example: the Uttaramerur inscriptions'], [
  ['1. Name the source', 'Inscriptions of the reign of Parantaka I'],
  ['2. Say what it records', 'Rules for choosing a village sabha'],
  ['3. Say what it shows', 'Organised local self-government'],
  ['4. Add one care', 'It shows one village, so not every village was alike'],
], 'Table of four steps for using an inscription as a source, applied to the Uttaramerur inscriptions: name the source, say what it records, say what it shows and add one care');
const vBrihad = table(['Point', 'Brihadishwara Temple, Thanjavur'], [
  ['Builder', 'Rajaraja I'],
  ['Completed', 'About 1010 CE'],
  ['Dedicated to', 'Shiva'],
  ['Features', 'Vimana of about 66 metres, a massive Nandi, a large linga, painted murals, inscriptions'],
], 'Table about the Brihadishwara Temple at Thanjavur: built by Rajaraja I, completed about 1010 CE, dedicated to Shiva, with a vimana of about 66 metres, a massive Nandi, a large linga, painted murals and inscriptions');
const vTempleSrc = table(['Feature', 'What a historian can learn'], [
  ['Inscriptions on the walls', 'Gifts to the temple, events and names'],
  ['Size and planning', 'The power and resources of the king'],
  ['Murals and sculpture', 'Art, dress and belief of the age'],
  ['World Heritage status', 'Listed in 1987 as part of the Great Living Chola Temples; extended in 2004'],
], 'Table of what a historian can learn from the Brihadishwara Temple: inscriptions show gifts, its size shows royal power, murals show art and belief, and it is part of the World Heritage Site Great Living Chola Temples, listed 1987 and extended 2004');
const vHeritage = table(['Temple', 'Place', 'Note'], [
  ['Brihadishwara Temple', 'Thanjavur', 'Built by Rajaraja I'],
  ['Temple at Gangaikondacholapuram', 'Gangaikondacholapuram', 'Linked with Rajendra I'],
  ['Airavatesvara temple', 'Darasuram', 'Added to the site in 2004'],
], 'Table of the three temples of the World Heritage Site Great Living Chola Temples: the Brihadishwara Temple at Thanjavur, the temple at Gangaikondacholapuram and the Airavatesvara temple at Darasuram, added in 2004');
const vKings = kingsFigure('Time line from about 850 to 1120 CE drawn roughly to scale: Vijayalaya about 850, Aditya I ending about 907, Parantaka I 907 to 955, Rajaraja I 985 to 1014, Rajendra I 1014 to 1044 and Kulottunga I 1070 to 1120; all dates approximate', 'The Chola kings (approximate dates).');
const vEarly = table(['King', 'Approximate time', 'Commonly taught'], [
  ['Vijayalaya', 'About 850 CE', 'Took Thanjavur and founded the later (imperial) Chola line'],
  ['Aditya I', 'Before 907 CE', 'Successor of Vijayalaya; strengthened the young kingdom'],
  ['Parantaka I', 'About 907 to 955 CE', 'Uttaramerur inscriptions of his reign, about 919 and 921 CE'],
], 'Table of three early kings: Vijayalaya about 850 CE who took Thanjavur, Aditya I before 907 CE, and Parantaka I about 907 to 955 CE in whose reign the Uttaramerur inscriptions were made');
const vRajaraja = table(['Point', 'Rajaraja I (about 985 to 1014 CE)'], [
  ['In the south', 'Extended Chola power in the south'],
  ['Overseas', 'Sri Lanka and the Maldives; a strong navy'],
  ['Building', 'The Brihadishwara Temple, completed about 1010 CE'],
], 'Table about Rajaraja I, about 985 to 1014 CE: extended Chola power in the south, reached Sri Lanka and the Maldives with a strong navy, and built the Brihadishwara Temple');
const vRajendra = table(['Point', 'Rajendra I (about 1014 to 1044 CE)'], [
  ['Ganga expedition', 'Took the title Gangaikondachola'],
  ['New capital', 'Gangaikondacholapuram'],
  ['By sea', 'Naval expedition to Srivijaya in South-East Asia, about 1025 CE'],
], 'Table about Rajendra I, about 1014 to 1044 CE: the expedition to the Ganga and the title Gangaikondachola, the new capital Gangaikondacholapuram, and a naval expedition to Srivijaya about 1025 CE');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Five kings in order with approximate dates'],
  ['(ii)', '3', 'Rajaraja I: conquests, navy, temple'],
  ['(iii)', '4', 'Rajendra I: Ganga, title, capital, Srivijaya'],
], 'Table planning a ten-mark answer on the Chola kings: part (i) the kings in order for 3 marks, part (ii) Rajaraja I for 3 marks, part (iii) Rajendra I for 4 marks');
const vSum1 = table(['Topic', 'Key points'], [
  ['Sources', 'Inscriptions, grants and the Brihadishwara Temple; read with care'],
  ['Uttaramerur', 'Parantaka I; lot system; qualifications; committees'],
  ['Kings', 'Vijayalaya, Aditya I, Parantaka I, Rajaraja I, Rajendra I'],
], 'Summary table of Part 1: sources, the Uttaramerur inscriptions, and the Chola kings in order');

const vAdmin = adminFigure('Chart: the king at the top, ministers and officials below him, then three boxes in a row for the mandalam or province, the valanadu or nadu which is a district, and the village, and under the village three assemblies, the ur, the sabha and the nagaram, with committees called variyams for tanks, gardens, temples and justice', 'Chola administration (simplified).');
const vCentre = table(['Level', 'Who or what'], [
  ['King', 'Head of the state'],
  ['Ministers and officials', 'Helped the king and carried out his orders'],
  ['Mandalam', 'Province, often under a prince or viceroy'],
], 'Table of the top levels of Chola administration: the king, ministers and officials, and the mandalam or province often under a prince or viceroy');
const vLevels = flow('LR', ['Mandalam (province)', 'Valanadu or nadu (district)', 'Village'], 'Flow of the divisions of the kingdom: the mandalam or province, then the valanadu or nadu which is a district, then the village', 'Divisions of the kingdom.');
const vAssem = table(['Assembly', 'For whom', 'Where'], [
  ['Ur', 'Landholders', 'Ordinary villages'],
  ['Sabha', 'Brahmanas', 'Brahmadeya villages, granted to Brahmanas'],
  ['Nagaram', 'Merchants', 'Trade centres'],
], 'Table of the three assemblies: the ur for landholders of ordinary villages, the sabha for Brahmanas in brahmadeya villages, and the nagaram for merchants in trade centres');
const vCommit = table(['Committee (variyam)', 'Looked after'], [
  ['Tank committee', 'Tanks, sluices and water'],
  ['Garden committee', 'Gardens and groves'],
  ['Justice committee', 'Settling disputes'],
  ['Temple committee', 'Temple affairs'],
], 'Table of committees called variyams: tank, garden, justice and temple committees, with what each looked after');
const vRevenue = table(['Point', 'Land revenue'], [
  ['Main income', 'Land revenue was the chief income of the state'],
  ['Survey', 'Land was surveyed to fix what was due'],
  ['Why it matters', 'Paid for officials, armies and temples'],
], 'Table about land revenue: the main income of the state, land was surveyed to fix what was due, and it paid for officials, armies and temples');
const vCases = table(['Imagined case', 'Body that handles it'], [
  ['Landholders of ordinary Pallikudi discuss a boundary', 'Ur'],
  ['Brahmanas of Chaturvedimangalam pick a garden committee', 'Sabha'],
  ['Traders of Vennaiyur fix the market days', 'Nagaram'],
  ['A prince is posted to a large region', 'Mandalam'],
], 'Table sorting four imagined cases to the right body: a boundary matter to the ur, a garden committee to the sabha, market days to the nagaram, and a prince posted to a region to the mandalam');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'King, ministers, officials'],
  ['(ii)', '3', 'Mandalam, valanadu, village'],
  ['(iii)', '4', 'Ur, sabha, nagaram; land revenue'],
], 'Table planning a ten-mark answer on Chola administration: part (i) king and officials for 3 marks, part (ii) divisions for 3 marks, part (iii) assemblies and revenue for 4 marks');
const vTemple = templeFigure('Schematic plan and side view of a Chola temple: an enclosure wall, a gopuram at the entrance, a mandapa and a vimana over the sanctum, and a side view where the vimana is the tallest part; not to scale', 'A Chola temple (schematic, not to scale).');
const vParts = table(['Part', 'What it is'], [
  ['Vimana', 'Pyramidal tower over the sanctum; very tall at Thanjavur'],
  ['Gopuram', 'Gateway tower; larger in later temples'],
  ['Mandapa', 'Pillared hall'],
  ['Enclosure wall', 'Wall around the temple'],
], 'Table of the parts of a Chola temple: the vimana over the sanctum, the gopuram at the gateway, the mandapa and the enclosure wall');
const vGopuram = table(['Temple stage', 'Tower that stands out'], [
  ['Early Chola temples', 'The vimana'],
  ['Later Chola temples', 'Gopurams grew larger and more striking'],
], 'Table of the change over time: in early Chola temples the vimana stands out, while in later temples the gopurams grew larger');
const vBronze = table(['Point', 'Chola bronzes'], [
  ['What', 'Images cast in bronze, often for temples'],
  ['How', 'The lost-wax (cire perdue) method'],
  ['Known for', 'Balance, grace and fine detail'],
], 'Table about Chola bronzes: images cast in bronze for temples, by the lost-wax method, known for balance, grace and fine detail');
const vWax = waxFigure('Six boxes showing the lost-wax steps: a wax model, a clay coating, heating so the wax melts out, pouring molten metal, breaking the mould, and finishing', 'The lost-wax method.');
const vPlan3 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Wax model, clay, heating, pouring, breaking, finishing'],
  ['(ii)', '3', 'Shiva as Lord of Dance; ring of flames; cosmic cycle'],
  ['(iii)', '4', 'Balance, grace, fine detail; why the method suits detail'],
], 'Table planning a ten-mark answer on Chola bronzes: part (i) the lost-wax steps for 3 marks, part (ii) the Nataraja for 3 marks, part (iii) why the bronzes are admired for 4 marks');
const vNataraja = table(['Point', 'The Nataraja'], [
  ['Shows', 'Shiva as Lord of Dance'],
  ['Setting', 'Within a ring of flames'],
  ['Symbol', 'The cosmic cycle of creation and destruction'],
], 'Table about the Nataraja bronze: it shows Shiva as Lord of Dance within a ring of flames, a symbol of the cosmic cycle of creation and destruction');
const vAdmired = table(['Quality', 'What it means'], [
  ['Balance', 'The figure stands or moves with a sense of poise'],
  ['Grace', 'Flowing movement and a calm expression'],
  ['Fine detail', 'Ornaments and features shown with care'],
], 'Table of why Chola bronzes are admired: balance, grace and fine detail');
const vSum2 = table(['Topic', 'Key points'], [
  ['Administration', 'King and officials; mandalam, valanadu, village; ur, sabha, nagaram'],
  ['Revenue', 'Land revenue; land surveyed'],
  ['Temples and bronzes', 'Vimana, gopuram, mandapa; lost-wax; Nataraja'],
], 'Summary table of Part 2: administration, revenue, and temples and bronzes');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Cholas — Part 1: Sources and Kings',
  goals: [
    'Explain the value of Chola inscriptions, including those on village administration, as sources',
    'Describe the Brihadishwara Temple at Thanjavur as a source for Chola history',
    'List the major Chola kings in chronological order, including Vijayalaya, Rajaraja I and Rajendra I',
  ],
  slides: [
    sl('title', 'The Cholas: sources and kings', {
      b: 'Part 1 — how we know about the Cholas, and who ruled.',
      v: vRoute1,
      n: 'In this part we learn how historians know about the Cholas. We study inscriptions, including those about village government, and the great temple at Thanjavur. Then we meet the Chola kings in order, from Vijayalaya to Rajendra the First.',
    }),
    sl('diagram', 'Three kinds of source', {
      v: vKinds,
      n: 'Three kinds of source help us. Stone inscriptions are cut into temple walls. Copper plate grants are land gifts written on metal sheets. The Brihadishwara Temple at Thanjavur is itself a source. Each tells us something different about the Cholas, and each needs to be read with care.',
    }),
    sl('concept', 'Chola inscriptions', {
      bl: [
        'Cut on **temple walls** and **stones**.',
        'Record **gifts of land and lamps**, orders, rules and names.',
        'Made at the time, so they are **direct evidence**.',
        'Royal praise may **exaggerate**; compare with other sources.',
      ],
      v: vInscr,
      n: 'Chola kings and their officials had many inscriptions cut on temple walls and on stones. They record gifts of land and lamps, orders, rules and names. Because they were made at the time, they are direct evidence. But where they praise a king, a historian is careful and compares them with other sources.',
    }),
    sl('concept', 'Copper-plate grants', {
      bl: [
        'Land gifts written on **copper plates**.',
        'Examples: the **Anbil**, **Thiruvalangadu** and **Larger Leiden** plates.',
        'Useful for **names, gifts and dates**.',
      ],
      v: vGrants,
      n: 'Chola kings also issued copper plate grants. Three well known sets are the Anbil plates, the Thiruvalangadu plates and the Larger Leiden plates. They are useful for names, gifts and dates. Remember that a grant often praises the king, so read that part with care.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each term with what it is.',
      chk: 'mt_sources',
      n: 'Look back at the sources. Match each name or term with what it is. Think about which one is a set of copper plate grants, and which one is a way of choosing members.',
    }),
    sl('concept', 'The Uttaramerur inscriptions', {
      bl: [
        'Found in present-day **Kanchipuram** district.',
        'From the reign of **Parantaka I**, about **919 and 921 CE**.',
        'Describe how a village **sabha** chose members and ran committees.',
      ],
      v: vUttar,
      n: 'The Uttaramerur inscriptions are found in present day Kanchipuram district. They date from the reign of Parantaka the First, about nine hundred nineteen and nine hundred twenty one of the common era. They describe how a village sabha chose its members and ran its committees, which makes them very important.',
    }),
    sl('diagram', 'Choosing members by lot', {
      b: 'The method is called **kudavolai**.',
      v: vLot,
      n: 'The village was divided into wards. The names of eligible persons were written on palm leaves and put in a pot. One leaf was then drawn by lot for each ward. This method is called kudavolai. It gave every eligible person a fair chance.',
    }),
    sl('concept', 'Qualifications, disqualifications, committees', {
      bl: [
        '**Qualifications**: some land and a house, a suitable age, learning.',
        '**Disqualifications**: for example, no accounts of an earlier post.',
        '**Committees (variyams)**: tanks, gardens, justice.',
      ],
      v: vQual,
      n: 'As commonly taught, a candidate needed some land and a house, an age within a range, and knowledge of the Vedas or of administration. Some people were disqualified, for example those who had not given accounts of an earlier post. The sabha also had committees, called variyams, for tanks, gardens and justice.',
    }),
    sl('check', 'Quick check: the lot system', {
      b: 'Decide whether the statement is true or false.',
      chk: 'tf_lot',
      n: 'Think about how names were chosen in the village sabha at Uttaramerur, and what was used to hold the names.',
    }),
    sl('example', 'Worked example 1: using an inscription as a source', {
      b: 'Name it, say what it records, say what it shows, add a care.',
      bl: [
        'Step 1 — Name the source.',
        'Step 2 — Say what it records.',
        'Step 3 — Say what it shows.',
        'Step 4 — Add one care.',
      ],
      v: vReadSrc,
      n: 'Here is a method for any source question. First name the source. Second say what it records. Third say what it shows. Fourth add one care. For the Uttaramerur inscriptions, they record rules for a village sabha, they show organised local self government, and the care is that they show one village, so not every village was alike.',
    }),
    sl('concept', 'The Brihadishwara Temple', {
      bl: [
        'Built by **Rajaraja I**; completed about **1010 CE**.',
        'Dedicated to **Shiva**, at **Thanjavur**.',
        'A towering **vimana** of about **66 metres**.',
        'A massive **Nandi**, a large **linga**, **murals** and **inscriptions**.',
      ],
      v: vBrihad,
      n: 'Rajaraja the First built the Brihadishwara Temple at Thanjavur, and it was completed about one thousand ten of the common era. It is dedicated to Shiva. Its towering vimana is about sixty six metres high. It also has a massive Nandi, a large linga, painted murals and inscriptions on its walls.',
    }),
    sl('diagram', 'The temple as a source', {
      v: vTempleSrc,
      n: 'The temple tells us a great deal. Its inscriptions record gifts. Its size and planning show the power and resources of the king. Its murals and sculpture show art and belief. It is part of the World Heritage Site called the Great Living Chola Temples, listed in nineteen eighty seven and extended in two thousand four.',
    }),
    sl('diagram', 'Great Living Chola Temples', {
      v: vHeritage,
      n: 'The World Heritage Site has three temples. The Brihadishwara Temple is at Thanjavur. A second temple is at Gangaikondacholapuram, linked with Rajendra the First. The third is the Airavatesvara temple at Darasuram. The last two were added when the site was extended in two thousand four.',
    }),
    sl('diagram', 'The Chola kings on a time line', {
      b: 'Dates are approximate; books differ.',
      v: vKings,
      n: 'This time line is drawn roughly to scale. Vijayalaya took Thanjavur about eight hundred fifty. Aditya the First followed him. Parantaka the First ruled from about nine hundred seven to nine hundred fifty five. Rajaraja the First ruled to about one thousand fourteen, and Rajendra the First to about one thousand forty four. Always say about with these dates.',
    }),
    sl('concept', 'Vijayalaya, Aditya I and Parantaka I', {
      bl: [
        '**Vijayalaya**, about **850 CE**: took **Thanjavur**, founded the later Chola line.',
        '**Aditya I**: his successor, before 907 CE.',
        '**Parantaka I**, about **907 to 955 CE**: the Uttaramerur inscriptions come from his reign.',
      ],
      v: vEarly,
      n: 'Vijayalaya took Thanjavur about eight hundred fifty and founded the later, or imperial, Chola line. Aditya the First succeeded him. Parantaka the First ruled from about nine hundred seven to nine hundred fifty five, and the Uttaramerur inscriptions on village government belong to his reign.',
    }),
    sl('concept', 'Rajaraja I', {
      bl: [
        'About **985 to 1014 CE**.',
        'Extended Chola power in the **south**.',
        'Reached **Sri Lanka** and the **Maldives**; strong **navy**.',
        'Built the **Brihadishwara Temple**.',
      ],
      v: vRajaraja,
      n: 'Rajaraja the First ruled from about nine hundred eighty five to one thousand fourteen. He extended Chola power in the south, reached Sri Lanka and the Maldives, and had a strong navy. He also built the Brihadishwara Temple at Thanjavur.',
    }),
    sl('concept', 'Rajendra I', {
      bl: [
        'About **1014 to 1044 CE**.',
        'Expedition to the **Ganga**; title **Gangaikondachola**.',
        'New capital **Gangaikondacholapuram**.',
        'Naval expedition to **Srivijaya**, about **1025 CE**.',
      ],
      v: vRajendra,
      n: 'Rajendra the First ruled from about one thousand fourteen to one thousand forty four. He led an expedition to the Ganga and took the title Gangaikondachola. He founded a new capital, Gangaikondacholapuram. About one thousand twenty five he sent a naval expedition to Srivijaya in South East Asia.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange the Chola kings in chronological order.',
      chk: 'ord_kings',
      n: 'Begin with the ruler who took Thanjavur, and end with the king who founded Gangaikondacholapuram.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) The kings in order. [3] (ii) Rajaraja I. [3] (iii) Rajendra I. [4]',
      bl: [
        '(i) Five kings in order, with dates.',
        '(ii) Conquests, navy, temple.',
        '(iii) Ganga, title, capital, Srivijaya.',
        'Aim for one point per mark.',
      ],
      v: vPlan1,
      n: 'To plan a ten mark answer in three parts, give three points to the first part, three to the second and four to the last. Part one lists the five kings in order. Part two covers Rajaraja the First. Part three covers Rajendra the First, with four points, one for each achievement.',
    }),
    sl('check', 'Quick check: the title', {
      b: 'Fill in the blank.',
      chk: 'fb_ganga',
      n: 'Recall the title that Rajendra the First took after his expedition to the Ganga.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Sources: **inscriptions**, **grants** and the **Brihadishwara Temple**.',
        '**Uttaramerur**: Parantaka I; lot system; committees.',
        'Kings: **Vijayalaya**, **Aditya I**, **Parantaka I**, **Rajaraja I**, **Rajendra I**.',
      ],
      v: vSum1,
      n: 'To sum up. Our sources are inscriptions, copper plate grants and the Brihadishwara Temple, all read with care. The Uttaramerur inscriptions describe a village sabha in the reign of Parantaka the First. The kings in order are Vijayalaya, Aditya the First, Parantaka the First, Rajaraja the First and Rajendra the First.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Say **about** with every date; books differ.',
        'For a source, give **what it records**, **what it shows** and **one care**.',
        'Write the Uttaramerur rules **in your own words**.',
        'Spell **Gangaikondachola**, **Gangaikondacholapuram** and **Brihadishwara** carefully.',
        'Keep the **order** of the kings clear.',
      ],
      n: 'Some exam habits. Add the word about to every date. For a source, say what it records, what it shows and one care. Write the Uttaramerur rules in your own words. Spell the long names carefully. Keep the order of the kings clear, from Vijayalaya to Rajendra the First.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Cholas — Part 2: Administration and Art',
  goals: [
    'Describe the divisions of the Chola kingdom and the role of village assemblies (ur and sabha)',
    'Describe the features of Chola temple architecture such as the vimana and gopuram',
    'Explain why Chola bronzes such as the Nataraja are admired',
  ],
  slides: [
    sl('title', 'The Cholas: administration and art', {
      b: 'Part 2 — how the Cholas governed, and what they built and cast.',
      v: vRoute2,
      n: 'In this part we study how the Cholas governed, from the king down to the village assemblies. Then we study their art, the great temples with their towers and the bronze images made by the lost wax method.',
    }),
    sl('diagram', 'Chart of the administration', {
      b: 'The king stood at the top; officials and local bodies shared the work.',
      v: vAdmin,
      n: 'This chart shows the administration in simple form. The king stood at the top, helped by ministers and officials. Below him were provinces, districts and villages. Villages ran their affairs through assemblies, and committees looked after tanks, gardens, temples and justice. Names and powers varied by place and time.',
    }),
    sl('concept', 'The king, ministers and officials', {
      bl: [
        'The **king** headed the state.',
        '**Ministers and officials** helped him and carried out his orders.',
        'Princes or viceroys sometimes ran a **mandalam**.',
      ],
      v: vCentre,
      n: 'The king stood at the head of the state. He was assisted by ministers and officials who carried out his orders. A large province, called a mandalam, was often placed under a prince or a viceroy. This gave the king a way to rule a wide kingdom.',
    }),
    sl('concept', 'Mandalam, valanadu and village', {
      bl: [
        '**Mandalam**: a province.',
        '**Valanadu** or **nadu**: a district.',
        '**Village**: the lowest unit.',
      ],
      v: vLevels,
      n: 'The kingdom was divided into mandalams, which were provinces. Each mandalam had districts, called valanadus or nadus. A district was made up of villages. These divisions helped the king and his officials to reach every part of the kingdom.',
    }),
    sl('check', 'Quick check: match the terms', {
      b: 'Match each Chola term with its meaning.',
      chk: 'mt_admin',
      n: 'Match each term with its meaning. Remember which are divisions of the kingdom, and which are assemblies.',
    }),
    sl('concept', 'The ur, the sabha and the nagaram', {
      bl: [
        '**Ur**: assembly of **ordinary villages**, for landholders.',
        '**Sabha**: assembly of **brahmadeya villages**, granted to Brahmanas.',
        '**Nagaram**: assembly of **merchants** in trade centres.',
      ],
      v: vAssem,
      n: 'There were three kinds of local assembly. The ur was the assembly of ordinary villages, for landholders. The sabha was the assembly of brahmadeya villages, which were granted to Brahmanas. The nagaram was the assembly of merchants in trade centres. Together they gave local people a share in government.',
    }),
    sl('diagram', 'Committees of the assembly', {
      b: 'Committees were called **variyams**.',
      v: vCommit,
      n: 'The assemblies worked through committees called variyams. There were committees for tanks, for gardens, for justice and for temples. A tank committee, for example, looked after the water on which farming depended. Members were chosen under the rules we saw at Uttaramerur.',
    }),
    sl('concept', 'Land revenue and the survey', {
      bl: [
        '**Land revenue** was the chief income.',
        'Land was **surveyed** to fix what was due.',
        'It paid for **officials**, **armies** and **temples**.',
      ],
      v: vRevenue,
      n: 'Land revenue was the main income of the Chola state. The land was surveyed so that the amount due from each holding could be fixed. The revenue paid for officials, armies and the building of temples.',
    }),
    sl('example', 'Worked example 1: sorting cases', {
      b: 'Read each imagined case and name the body that fits.',
      bl: [
        'Step 1 — Who is meeting: landholders, Brahmanas or merchants?',
        'Step 2 — Where: ordinary village, brahmadeya village or trade centre?',
        'Step 3 — Name the body.',
      ],
      v: vCases,
      n: 'To sort a case, ask who is meeting and where. Landholders of an ordinary village form the ur. Brahmanas of a granted village form the sabha. Traders of a market town form the nagaram. A prince posted to a large region is a matter for the mandalam.',
    }),
    sl('check', 'Quick check: Uttaramerur', {
      b: 'Decide whether the assertion and the reason are true, and whether one explains the other.',
      chk: 'ar_sabha',
      n: 'Check each statement on its own first. Then ask whether the reason really explains the assertion.',
    }),
    sl('concept', 'Chola temples in the Dravida style', {
      bl: [
        'A **vimana** over the sanctum.',
        'A **gopuram** at the gateway.',
        '**Mandapas**, pillared halls.',
        'An **enclosure wall**.',
      ],
      v: vTemple,
      n: 'Chola temples were built in the Dravida style. This is a simple sketch, not drawn to scale. A vimana rises over the sanctum. A gopuram stands at the gateway. Pillared halls, called mandapas, lie between them, and an enclosure wall surrounds the whole temple.',
    }),
    sl('diagram', 'The parts of the temple', {
      v: vParts,
      n: 'The vimana is a pyramidal tower over the sanctum, and at Thanjavur it is very tall. The gopuram is the gateway tower. A mandapa is a pillared hall. The enclosure wall goes around the temple. Do not mix up the vimana and the gopuram.',
    }),
    sl('diagram', 'How the gopuram changed', {
      v: vGopuram,
      n: 'In early Chola temples the vimana is the part that stands out. In later temples the gopurams grew larger and became very striking. This change is a favourite point in questions, so remember it.',
    }),
    sl('check', 'Quick check: later gopurams', {
      b: 'Choose the best observation.',
      chk: 'm_gopuram_check',
      n: 'Think about what changed about the gateway towers in later temples, and remember which tower stands over the sanctum.',
    }),
    sl('concept', 'Chola bronze sculpture', {
      bl: [
        'Images cast in **bronze**, often for temples.',
        'Made by the **lost-wax** (cire perdue) method.',
        'Known for **balance**, **grace** and **fine detail**.',
      ],
      v: vBronze,
      n: 'The Cholas are famous for their bronze sculpture. Images were cast in bronze, often for temples. They were made by the lost wax method, also called cire perdue. They are admired for their balance, their grace and their fine detail.',
    }),
    sl('diagram', 'The lost-wax method', {
      b: 'Learn the order of the six steps.',
      v: vWax,
      n: 'First a model is made in wax. Second it is coated with clay. Third the mould is heated and the wax melts out. Fourth molten metal is poured into the space. Fifth, when the metal has set, the mould is broken. Sixth the image is cleaned and finished with fine detail.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) Lost-wax steps. [3] (ii) The Nataraja. [3] (iii) Why admired. [4]',
      bl: [
        '(i) Wax, clay, heating, pouring, breaking, finishing.',
        '(ii) Lord of Dance; ring of flames; cosmic cycle.',
        '(iii) Balance, grace, fine detail; the method.',
        'Aim for one point per mark.',
      ],
      v: vPlan3,
      n: 'To plan this answer, give three points to the lost wax steps, three to the Nataraja and four to why the bronzes are admired. Name the steps in order. Then describe the Nataraja and its meaning. Last, give balance, grace and fine detail, and say why the method suits fine detail.',
    }),
    sl('concept', 'The Nataraja', {
      bl: [
        'Shows **Shiva as Lord of Dance**.',
        'Within a **ring of flames**.',
        'A symbol of the **cosmic cycle** of creation and destruction.',
      ],
      v: vNataraja,
      n: 'The Nataraja shows Shiva as Lord of Dance within a ring of flames. The image is commonly read as a symbol of the cosmic cycle of creation and destruction. In an answer, describe it plainly and respectfully, as a work of art with a meaning.',
    }),
    sl('check', 'Quick check: the order of the steps', {
      b: 'Arrange the steps of the lost-wax method.',
      chk: 'ord_wax',
      n: 'Begin with the model, and end with the finished image. Remember that the wax melts out before the metal goes in.',
    }),
    sl('diagram', 'Why Chola bronzes are admired', {
      v: vAdmired,
      n: 'Chola bronzes are admired for three qualities. Balance means the figure has poise. Grace means flowing movement and a calm look. Fine detail means ornaments and features are shown with care. The lost wax method helped the makers to capture such detail.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        '**King**, ministers; **mandalam**, **valanadu**, village.',
        '**Ur**, **sabha**, **nagaram**; **variyams**; land revenue.',
        '**Vimana**, **gopuram**, **mandapa**, wall.',
        '**Lost-wax** bronzes; the **Nataraja**.',
      ],
      v: vSum2,
      n: 'To sum up. The king ruled with ministers and officials, through mandalams, valanadus and villages. Villages and merchants had the ur, the sabha and the nagaram, with committees. Land revenue was the main income. Chola temples had a vimana, a gopuram, mandapas and a wall, and the bronzes were made by the lost wax method.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Do not mix up the **vimana** and the **gopuram**.',
        'Say **who** each assembly was for: **ur**, **sabha**, **nagaram**.',
        'Give the **lost-wax steps in order**.',
        'Describe the **Nataraja** plainly and respectfully.',
        'In a 3 + 3 + 4 answer, give **one point per mark**.',
      ],
      n: 'Some exam habits. Do not mix up the vimana and the gopuram. Say who each assembly was for. Give the lost wax steps in order. Describe the Nataraja plainly and respectfully. In a ten mark answer set in three parts, give one clear point for every mark.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Medieval India: The Cholas — notes',
  sections: [
    {
      h: '1. Sources: inscriptions and grants',
      t: 1,
      b: '- **Stone inscriptions** were cut on temple walls and stones. They record gifts of land and lamps, orders, rules and names, and being made at the time they are direct evidence.\n- **Copper-plate grants** record land gifts. Well-known sets are the **Anbil**, **Thiruvalangadu** and **Larger Leiden** plates.\n- Royal praise in a grant may exaggerate, so historians compare it with other sources.',
      terms: [['Inscription', 'Writing cut into stone or metal, often on a temple wall.'], ['Copper-plate grant', 'A record of a gift, such as land, engraved on copper sheets.']],
      v: vKinds,
      vs: [vInscr, vGrants],
    },
    {
      h: '2. The Uttaramerur inscriptions',
      t: [1, 3],
      b: '- **Where and when:** present-day Kanchipuram district; reign of **Parantaka I**, about **919 and 921 CE**.\n- **Choosing members:** the village was divided into wards. Names of eligible persons were written on palm leaves, put in a pot and drawn by lot, a method called **kudavolai**.\n- **Qualifications** (as commonly taught): owning some land and a house, an age within a set range, and knowledge of the Vedas or of administration.\n- **Disqualifications:** for example, failing to give accounts of an earlier post, or serious wrongdoing.\n- **Committees (variyams)** looked after tanks, gardens, justice and other work.',
      terms: [['Kudavolai', 'Choosing members by drawing names on palm leaves from a pot.'], ['Variyam', 'A committee of a village assembly.'], ['Ward', 'A part of a village or town for which a member was chosen.']],
      v: vUttar,
      vs: [vLot, vQual],
    },
    {
      h: '3. The Brihadishwara Temple as a source',
      t: 1,
      b: '- Built by **Rajaraja I** at **Thanjavur** and completed about **1010 CE**; dedicated to **Shiva**.\n- Features: a towering **vimana** of about **66 metres**, a massive **Nandi**, a large **linga**, painted **murals** and **inscriptions** on its walls.\n- It shows the power and resources of the king, and records gifts.\n- Part of the World Heritage Site **Great Living Chola Temples** (listed **1987**, extended **2004** to add Gangaikondacholapuram and the Airavatesvara temple at Darasuram).',
      terms: [['Vimana', 'The pyramidal tower over the sanctum of a temple.'], ['Linga', 'The sacred form of Shiva worshipped in the sanctum.'], ['Mural', 'A painting made on a wall.']],
      v: vBrihad,
      vs: [vTempleSrc, vHeritage],
    },
    {
      h: '4. Chola kings in order',
      t: 2,
      b: '- **Vijayalaya** (about 850 CE): took Thanjavur and founded the later (imperial) Chola line.\n- **Aditya I:** his successor, before 907 CE.\n- **Parantaka I** (about 907 to 955): the Uttaramerur inscriptions belong to his reign.\n- **Rajaraja I** (about 985 to 1014): power in the south, Sri Lanka and the Maldives, a strong navy, the Brihadishwara Temple.\n- **Rajendra I** (about 1014 to 1044): expedition to the Ganga, the title **Gangaikondachola**, the new capital **Gangaikondacholapuram**, and a naval expedition to **Srivijaya** (South-East Asia) about 1025.\n- **Kulottunga I** (about 1070 to 1120) is sometimes added.\n- Dates are approximate and books vary; say **about**.',
      terms: [['Gangaikondachola', 'A title meaning the Chola who took the Ganga.'], ['Srivijaya', 'A maritime kingdom of South-East Asia.']],
      v: vKings,
      vs: [vEarly, vRajaraja, vRajendra],
    },
    {
      h: '5. Administration and village self-government',
      t: 3,
      b: '- The **king** was helped by ministers and officials.\n- The kingdom was divided into **mandalams** (provinces, often under princes or viceroys), then **valanadus or nadus** (districts), then **villages**.\n- Local assemblies: the **ur** (ordinary villages, landholders), the **sabha** (brahmadeya villages) and the **nagaram** (merchants in trade centres).\n- **Committees** managed tanks, gardens, temples and justice.\n- **Land revenue** was the main income; land was surveyed.',
      terms: [['Mandalam', 'A province.'], ['Valanadu', 'A district; also called a nadu.'], ['Brahmadeya', 'A village granted to Brahmanas.'], ['Nagaram', 'An assembly of merchants in a trade centre.']],
      v: vAdmin,
      vs: [vCentre, vLevels, vAssem, vCommit, vRevenue],
    },
    {
      h: '6. Temple architecture',
      t: 4,
      b: '- Chola temples follow the **Dravida** style.\n- Parts: a **vimana** (pyramidal tower over the sanctum, very tall at Thanjavur), a **gopuram** (gateway tower, larger in later temples), **mandapas** (pillared halls) and an **enclosure wall**.\n- Do not mix up the vimana and the gopuram.',
      terms: [['Gopuram', 'A tower over the gateway of a temple.'], ['Mandapa', 'A pillared hall in a temple.'], ['Sanctum', 'The inner chamber of a temple.']],
      v: vTemple,
      vs: [vParts, vGopuram],
    },
    {
      h: '7. Bronze sculpture',
      t: 4,
      b: '- Bronze images were cast by the **lost-wax (cire perdue)** method: wax model, clay coating, heating so the wax melts out, pouring molten metal, breaking the mould, finishing.\n- The **Nataraja** shows Shiva as Lord of Dance in a ring of flames, a symbol of the cosmic cycle of creation and destruction.\n- Chola bronzes are admired for **balance, grace and fine detail**.',
      terms: [['Lost-wax method', 'A casting method in which a wax model is melted out of a clay mould.'], ['Nataraja', 'Shiva as Lord of Dance.']],
      v: vWax,
      vs: [vBronze, vNataraja, vAdmired],
    },
  ],
  tips: '**Common mistakes**\n- Giving a date without the word about.\n- Mixing up the vimana (over the sanctum) and the gopuram (gateway).\n- Mixing up the ur, the sabha and the nagaram.\n- Putting Rajendra I before Rajaraja I.\n- Listing the lost-wax steps in the wrong order.\n- Treating royal praise in a grant as proved fact.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or term.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a link or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Chola copper-plate grants', 'Land gifts on metal sheets: the **Anbil**, **Thiruvalangadu** and **Larger Leiden** plates.', 'fact', 1],
  ['What do Chola inscriptions record?', 'Gifts of land and lamps, orders, rules and names.', 'concept', 1],
  ['Why read royal praise with care?', 'It may **exaggerate**; compare with other sources.', 'concept', 1],
  ['Uttaramerur inscriptions: when?', 'Reign of **Parantaka I**, about **919 and 921 CE**.', 'fact', 1],
  ['Uttaramerur: where?', 'Present-day **Kanchipuram** district.', 'fact', 1],
  ['Kudavolai', 'Names on **palm leaves** put in a pot and **drawn by lot**.', 'definition', 1],
  ['Variyam', 'A **committee** of a village assembly (tanks, gardens, justice).', 'definition', 1],
  ['Qualifications for the sabha', 'Some land and a house, a suitable age, knowledge of the Vedas or administration (as commonly taught).', 'concept', 1],
  ['Who built the Brihadishwara Temple?', '**Rajaraja I**, completed about **1010 CE**.', 'fact', 1],
  ['Brihadishwara Temple: dedicated to', '**Shiva**, at **Thanjavur**.', 'fact', 1],
  ['Height of the vimana at Thanjavur', 'About **66 metres**.', 'fact', 1],
  ['Great Living Chola Temples', 'World Heritage Site: Thanjavur, Gangaikondacholapuram, Darasuram. Listed **1987**, extended **2004**.', 'fact', 1],
  ['Vijayalaya', 'About **850 CE**: took **Thanjavur**; founded the later Chola line.', 'fact', 2],
  ['Aditya I', 'Successor of Vijayalaya; before **907 CE**.', 'fact', 2],
  ['Parantaka I', 'About **907 to 955 CE**; Uttaramerur inscriptions.', 'fact', 2],
  ['Rajaraja I', 'About **985 to 1014 CE**; south, Sri Lanka, Maldives; navy; temple.', 'fact', 2],
  ['Rajendra I', 'About **1014 to 1044 CE**; Ganga; Gangaikondachola; Srivijaya.', 'fact', 2],
  ['Gangaikondacholapuram', 'The **new capital** founded by Rajendra I.', 'definition', 2],
  ['Srivijaya expedition', 'A **naval** expedition by Rajendra I, about **1025 CE**.', 'fact', 2],
  ['Order of the five kings', 'Vijayalaya, Aditya I, Parantaka I, Rajaraja I, Rajendra I.', 'concept', 2],
  ['Mandalam', 'A **province**, often under a prince or viceroy.', 'definition', 3],
  ['Valanadu or nadu', 'A **district**.', 'definition', 3],
  ['Ur', 'Assembly of **ordinary villages**, for landholders.', 'definition', 3],
  ['Sabha', 'Assembly of **brahmadeya** villages.', 'definition', 3],
  ['Nagaram', 'Assembly of **merchants** in trade centres.', 'definition', 3],
  ['Chief income of the state', '**Land revenue**; land was surveyed.', 'fact', 3],
  ['Dravida style: four parts', 'Vimana, gopuram, mandapa, enclosure wall.', 'concept', 4],
  ['Vimana or gopuram?', 'Vimana is over the sanctum; **gopuram** is the gateway tower.', 'concept', 4],
  ['Gopurams in later temples', 'They became **larger**.', 'fact', 4],
  ['Lost-wax method', 'Wax model, clay, heat, pour metal, break mould, finish.', 'definition', 4],
  ['Nataraja', '**Shiva as Lord of Dance** in a ring of flames; cosmic cycle.', 'fact', 4],
  ['Why Chola bronzes are admired', '**Balance**, **grace** and **fine detail**.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The Cholas',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_brihad_source', 'm_ganga', 'm_ur', 'm_nataraja', 'ar_vimana', 's_divisions', 's3_uttar'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_kings', 'l_temple'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The Cholas',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_grant_praise', 'm_whs', 'm_order', 'm_sabha', 'm_waxstep', 'm_bronze_why', 'm_naval', 'ar_wax', 's_inscr_value', 's_rajaraja', 's_nataraja', 's3_brihad', 's3_levels'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_inscr', 'l_admin', 'l_bronze'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-9-history-civics-ch11 only (inscriptions and the Brihadishwara Temple; Chola kings in order; administration and village self-government; temple architecture and bronze sculpture)',
    originality: 'every temple-guide booklet, record keeper note and set of school notes is imagined and labelled; no textbook text or exercise and no specimen or board-paper item reused (D-036); no inscription is quoted',
    data: 'reigns of Rajaraja I and Rajendra I asserted contiguous; all dates given as about except the fixed ones (1987, 2004)',
    facts: 'Vijayalaya about 850 CE; Parantaka I about 907-955; Rajaraja I about 985-1014; Rajendra I about 1014-1044; Kulottunga I about 1070-1120; Uttaramerur about 919 and 921 CE; Brihadishwara completed about 1010 CE, vimana about 66 m; Srivijaya about 1025 CE; Great Living Chola Temples 1987, extended 2004',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
