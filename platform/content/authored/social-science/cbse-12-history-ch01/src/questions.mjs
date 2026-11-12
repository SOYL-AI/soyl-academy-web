// CBSE 12 History, ch01 Bricks, Beads and Bones: The Harappan Civilisation, question bank. Every source,
// diary, letter, museum note and survey report is imagined or summarised by SOYL in its own words (and
// labelled as such). No NCERT text, source box, caption, map, figure or exercise and no board or
// sample-paper item is reused or closely paraphrased (D-036); no real person is quoted. Real-world facts
// are limited to stable ones from the syllabus (sites, materials, discoveries, scholarly debates), and
// interpretations (rulers, religion, the end of the cities) are presented as debates, never as settled.
// Places are named in words only: no map work (OA-23 pending).
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real, though the evidence and events in the background are.)*';
const SUM = '*(Summary written by SOYL in its own words for practice; it is not a quotation or translation of any source.)*';

// Chronology used by the timeline figure and the ordering item (checked in build.mjs).
export const DISCOVERY = [
  [1861, 'Cunningham | starts ASI work'],
  [1921, 'Sahni digs | at Harappa'],
  [1922, 'Banerji at | Mohenjodaro'],
  [1924, 'Marshall | announces it'],
  [1944, 'Wheeler | Director-General'],
  [1947, 'After 1947: | sites in India'],
];
for (let i = 1; i < DISCOVERY.length; i++) if (DISCOVERY[i][0] <= DISCOVERY[i - 1][0]) throw new Error('DISCOVERY out of order');

// ================================================================ t01 Subsistence; mature Harappan settlements
Q('m_period', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The mature phase of the Harappan civilisation is dated to roughly',
  opts: ['2600 to 1900 BCE', '1500 to 1000 BCE', '600 to 300 BCE', '300 BCE to 200 CE'],
  sol: 'Cultures that came before it are called Early Harappan and those that followed Late Harappan; the dates in the other options belong to much later periods of Indian history.',
}));
Q('m_crops', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Plant remains from Harappan sites show that people grew and ate',
  opts: ['wheat, barley, lentil, chickpea and sesame', 'maize, potato, tomato and chilli', 'tea, coffee and rubber', 'oats, rye and grapes'],
  sol: 'Grains and pulses of the Old World were the staples, with millets at some Gujarat sites and rice only rarely. Maize, potato, tomato and chilli came to India from the Americas many centuries later.',
}));
Q('m_kalibangan', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Archaeologists uncovered a ploughed field of the Harappan period at Kalibangan, with two sets of furrows cutting each other at right angles. Which statement about this evidence is most careful?',
  opts: [
    'It may mean that two crops were sown together, but the furrows alone do not prove it',
    'It proves that the Harappans used iron ploughs',
    'It shows that the field was watered by a canal from a reservoir',
    'It shows that the field belonged to a ruler of the city',
  ],
  sol: 'A pattern in the soil is an observation; the idea of mixed cropping is an inference that needs support, such as preserved seeds. Nothing in the furrows tells us about metals, canals or ownership.',
}));
Q('m_citadel', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Compared with the Lower Town at Mohenjodaro, the Citadel was',
  opts: [
    'smaller, built higher on mud-brick platforms and lying to the west',
    'larger, built at the lowest level and lying to the east',
    'a separate town many kilometres away',
    'made only of wood and reeds',
  ],
  sol: 'The raised western part held the large public structures; the bigger, lower part to its east, also walled, held the houses.',
}));
Q('m_planning', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'At a newly excavated Harappan town, a drain runs straight beneath a lane, and the foundation of the nearest house wall rests on top of the drain\'s side wall. Judged by the practice at Mohenjodaro, what does this suggest?',
  opts: [
    'The drain was planned and laid before the house was built',
    'The house was built first and the drain was cut later',
    'The town had no drains at all',
    'The house was a public warehouse',
  ],
  sol: 'At Mohenjodaro the platforms and drains were set out first and the houses were fitted around them. A wall resting on the drain fits that order of work, although one trench cannot show it for the whole town.',
}));
Q('m_houses', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Many Mohenjodaro houses had no windows in the ground-floor walls facing the street. Which explanation do historians usually offer?',
  opts: [
    'Rooms opened onto an inner courtyard, which gave privacy from the lane',
    'Windows had not yet been invented',
    'Houses were built only for the ruler\'s soldiers',
    'Street walls were too thin to carry a window',
  ],
  sol: 'Houses were arranged around a courtyard, which supplied light and air, so the street wall could stay blank. This is an interpretation of the plan, not something written down by the builders.',
}));
Q('m_warehouse', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A large brick building at Mohenjodaro was once called the granary, and many scholars now prefer the neutral name warehouse. What is the soundest reason for the change?',
  opts: [
    'The older name assumed a particular use that the surviving remains cannot establish by themselves',
    'The building was proved to be a royal palace',
    'Grain was never grown by the Harappans',
    'The building was shown to be a modern construction',
  ],
  sol: 'Naming a building by one function goes beyond what bricks and plan can show. The cautious label describes a large store without claiming what exactly was stored. The Harappans did grow grain, and the building is ancient.',
}));

Q('tf_rice', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Rice was the main staple grain of the Harappan people.',
  sol: 'Rice is found only rarely; wheat and barley were far more common, with millets in parts of Gujarat.',
}));
Q('fb_bricks', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Bricks at Harappan sites were made in a standard ratio of length to breadth to height of ___ (write it with colons).',
  acc: [['4:2:1', '4 : 2 : 1', '4-2-1']],
  sol: 'The ratio 4:2:1 appears at sites far apart, which shows shared practice.',
}));
Q('mt_water', match({
  t: 1, d: 2, c: 'recall',
  stem: 'Match each Harappan site or region with the evidence of farming or water management found there.',
  pairs: [
    ['Kalibangan', 'A ploughed field with furrows in two directions'],
    ['Shortughai', 'Traces of canals'],
    ['Dholavira', 'Reservoirs for storing water'],
    ['Cholistan and Banawali', 'Terracotta models of the plough'],
  ],
  sol: 'Each pairing follows what excavators reported from the site named.',
}));
Q('s_citadel', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the Citadel and the Lower Town of Mohenjodaro in two points.',
  model: '(1) The **Citadel** was smaller, lay to the west and stood higher on platforms of mud brick. (2) The **Lower Town** was larger and lower, lay to its east, was also walled, and held the houses laid out in blocks.',
  sol: 'One point of contrast for each of two features.',
  scheme: [['First contrast (size, height or position)', 1], ['Second contrast', 1]],
}));
Q('s_drains', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A visitor says the covered drains show only that the Harappans liked cleanliness. What else can a historian infer from the drains? Give two inferences.',
  model: '(1) The drains were **laid out before the houses**, so decisions about the layout were taken **before building began**, which shows planning. (2) Channels from many houses joined a **shared system**, so someone must have **coordinated and maintained** it beyond single households.',
  sol: 'Two inferences: advance planning and coordination beyond the household.',
  scheme: [['Inference of planning, from the order of work', 1], ['Inference of coordination, from the shared system', 1]],
}));
Q('s3_subsistence', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'An imagined site yields charred barley and sesame seeds, cattle and fish bones and a terracotta plough model, but no rice. What can a historian conclude about subsistence here, and what is one limit of this evidence?',
  model: '(1) The people **grew grain and oil-seed crops**, barley and sesame, and probably used the **plough**. (2) They **kept cattle and also ate fish**, so food came from herding and fishing as well as farming. (3) **Limit:** the lack of rice at one site does not show that rice was unknown elsewhere, and seeds and bones show only what happened to survive.',
  sol: 'Conclusions about crops and animals, and a limit about survival and sampling.',
  scheme: [['Crops and ploughing', 1], ['Cattle and fish', 1], ['A limit of the evidence', 1]],
}));
Q('l_planning', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the planning of the settlement at Mohenjodaro.',
  model: '1. **Two parts:** a smaller, higher **Citadel** to the west and a larger, lower **Lower Town**, both walled.\n2. **Platforms first:** mud-brick platforms were laid before building began, so the layout was decided beforehand.\n3. **Standard bricks:** bricks followed one ratio of 4:2:1.\n4. **Drains:** covered drains were planned before the houses and ran along the lanes.\n5. **Houses:** built around courtyards, with blank street walls, private bathrooms and often a well.\nThe Great Bath and the large warehouse were public structures on the Citadel.',
  sol: 'Layout, advance planning, bricks, drainage and houses each earn a mark.',
  scheme: [['Citadel and Lower Town', 1], ['Platforms laid first', 1], ['Standard bricks', 1], ['Drains planned before houses', 1], ['Houses with courtyards and other public structures', 1]],
}));
Q('sb_diary', source({
  t: [1, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source from the imagined field diary of an excavation assistant and answer the questions that follow. ${IMAG}`,
  passage: '**Field diary of an excavation assistant (imagined), Lower Town, cool season**\n\nDay 12. We cleared the lane in Trench C down to its old street level. It is straight and wide enough for two bullock carts. Along its edge runs a drain lined with brick and capped with flat bricks, and every few steps a small channel from a house wall joins it. The house on the left has no opening at all on the lane side; its door is on a narrower side lane. Inside, bricks of one size surround a square courtyard, with a small bathing room in one corner. The mason working with us says that the bricks match those of a house two lanes away. Today I found the drain\'s foundation resting on the lane\'s first surface, beneath the lowest course of the house wall.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name one feature of the lane that shows that drainage was organised.', model: 'The lane had a **brick-lined drain, covered with flat bricks**, which small **channels from the houses** joined.', sol: 'Any one feature of the drain from the first part of the passage.', scheme: [['One feature named', 1]] })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'Which sentence of the diary supports the view that the drains were laid before the houses were built? Say in one line why.', model: 'The last sentence, about the drain\'s foundation lying **beneath the lowest course of the house wall**: the wall was raised after the drain was in place.', sol: 'Find the sentence about foundations and use the order of building.', scheme: [['Correct sentence with the reason', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): What can historians infer from this diary about how the settlement was organised? Give two inferences that the diary does not state in so many words.', model: '(1) The **same brick size** in houses two lanes apart suggests **shared standards** and a workforce or authority that enforced them. (2) A drain **capped and joined by house channels** suggests a **common system** that someone maintained, not each family acting alone.', sol: 'Two inferences, each resting on a detail of the diary.', scheme: [['First inference with its evidence', 1], ['Second inference with its evidence', 1]] }),
    [short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): The assistant describes only one house. Why should historians be careful before claiming that all Harappan houses were like it? Give two reasons.', model: '(1) **One house is a small sample**; other houses may differ in size, plan or wealth. (2) The diary comes from one **lane in one trench** of one city, so it cannot show how houses looked in other areas or at other sites.', sol: 'Two reasons about sampling and place.', scheme: [['First reason', 1], ['Second reason', 1]] })]),
  ],
}));

// ================================================================ t02 Social differences; crafts; procurement
Q('m_burial_inf', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In an imagined cemetery, three pit burials hold pottery and a few ornaments, one holds a copper mirror and shell bangles, and two hold nothing. What is the most careful use of this evidence?',
  opts: [
    'The differences may point to social differences, but more evidence would be needed before concluding that',
    'It proves that the buried people ruled the city',
    'It proves that everyone in the community was equal',
    'It cannot be used by historians at all',
  ],
  sol: 'Different goods in graves are a clue to differing status, yet beliefs about death, family choice and chance of survival also matter. Neither a firm claim of rulers nor of equality follows from six graves.',
}));
Q('m_luxury', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'A student says that faience vessels count as luxuries because they are found mostly in big cities. What is wrong with this reasoning?',
  opts: [
    'Whether an object is a luxury depends on its rare material or costly making, not on where it is found; the distribution is a separate observation',
    'Faience vessels were found in small villages in equal numbers',
    'Luxuries are never found in cities',
    'Faience was a common material used for cooking pots',
  ],
  sol: 'The test for a luxury is about the material and the effort of making. Where objects turn up is a different matter, which may or may not point to unequal access.',
}));
Q('m_luxury_dist', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Costly objects such as faience vessels are found mostly in large settlements like Mohenjodaro and Harappa and only rarely in small ones. Which interpretation fits the evidence best?',
  opts: [
    'Access to such objects may have differed between places, though the pattern may also reflect where excavation has been done',
    'Small settlements never traded with large ones',
    'Large settlements were ruled by kings and small ones were not',
    'Faience was banned in villages by law',
  ],
  sol: 'A pattern in finds can show real unevenness, yet it can also come from uneven digging. A claim about kings or laws goes far beyond the distribution itself.',
}));
Q('m_materials', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of these materials was not used by Harappan craftspeople?',
  opts: ['Iron', 'Carnelian', 'Shell', 'Copper'],
  sol: 'Harappan metalwork used copper, bronze and gold; iron came into use in the subcontinent much later.',
}));
Q('m_identify', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A dig yields piles of cut shell, stone saws and many half-cut bangles in a room, but almost no finished bangles. What is the best reading?',
  opts: [
    'The room was probably a workshop, and finished bangles were likely taken elsewhere',
    'The room was a royal treasury',
    'The bangles were never meant to be worn',
    'Shell was unknown to the Harappans',
  ],
  sol: 'Raw material, tools and unfinished pieces mark a place of work. Finished goods are carried away to be used or exchanged, which explains why few remain at the workshop.',
}));
Q('m_shortughai', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which Harappan settlement lay close to a source of lapis lazuli?',
  opts: ['Shortughai', 'Chanhudaro', 'Dholavira', 'Kalibangan'],
  sol: 'Shortughai, in Afghanistan, was positioned near the source of the blue stone, which then travelled to other Harappan towns.',
}));
Q('m_meluhha', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which further finding would most strengthen the view that Meluhha was the Harappan region?',
  opts: [
    'Seals of the Harappan type found at Mesopotamian sites',
    'More Mesopotamian texts that also name Dilmun',
    'Lapis lazuli used in later Indian jewellery',
    'Gold found in Egyptian tombs',
  ],
  sol: 'Harappan-type objects at Mesopotamian sites would show direct contact between the two regions. The other finds say nothing about where Meluhha lay.',
}));
Q('ar_chanhudaro', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'Chanhudaro is regarded by archaeologists as a settlement devoted almost entirely to craft production.',
  r: 'Its excavated area yielded traces of bead-making, shell-cutting, metal-working, seal-making and weight-making.',
  sol: 'The workshop traces are exactly the evidence on which the label rests, so the second statement supports the first.',
}));
Q('ar_burial', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Historians treat grave goods as only partial evidence for social differences among the Harappans.',
  r: 'Most Harappan burials were simple pits with few or no goods, and lavish burials of the kind found in some ancient societies have not been found.',
  sol: 'Because the burials show only modest and uneven contrasts, grave goods alone cannot establish a firm social hierarchy, which is why the second statement explains the first.',
}));
Q('fb_meluhha', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Mesopotamian texts name a distant land called ___ as a source of carnelian and lapis lazuli; it was probably the Harappan region.',
  acc: [['Meluhha']],
  sol: 'The land is Meluhha, while Dilmun and Magan are linked with Bahrain and Oman.',
}));
Q('mt_procure', match({
  t: 2, d: 2, c: 'recall',
  stem: 'Match each place with the material that its location gave access to.',
  pairs: [
    ['Shortughai', 'Lapis lazuli'],
    ['Nageshwar and Balakot', 'Shell'],
    ['Lothal', 'Carnelian'],
    ['Khetri region of Rajasthan', 'Copper'],
  ],
  sol: 'Each setting was close to, or an expedition target for, the material named.',
}));
Q('tf_ships', tf({
  t: 2, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Pictures of ships and boats on Harappan seals are one clue that sea voyages were likely.',
  sol: 'They hint at travel by water; other evidence, such as a Harappan jar in Oman, points the same way.',
}));
Q('s_luxury', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do archaeologists sort artefacts into utilitarian objects and luxuries? Give one example of each.',
  model: '**Utilitarian** objects serve daily needs and are made of common materials, such as a **grinding slab** or a cooking pot. **Luxuries** are made of rare materials or by costly methods and are not needed for daily life, such as a **faience vessel** or gold ornament.',
  sol: 'Criterion and example for each class.',
  scheme: [['Utilitarian: test and example', 1], ['Luxury: test and example', 1]],
}));
Q('s_craft_identify', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'A site yields many finished beads but no drills, unfinished beads or waste. Why would archaeologists hesitate to call it a craft centre?',
  model: 'A craft centre is identified by **raw material, tools, unfinished objects and waste**, which show that work was done on the spot. Finished beads alone could have **arrived by trade**, so without those traces the site may simply have used the beads.',
  sol: 'The reason rests on what marks a workshop and an alternative source of the beads.',
  scheme: [['Evidence that marks a workshop', 1], ['Beads could have been brought in', 1]],
}));
Q('s3_procure', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'An imagined Harappan settlement is found beside a steatite source, with seal-makers\' tools in its houses. Explain three ways in which such a location would help the Harappan economy.',
  model: '(1) **Cheap, easy supply** of steatite, which saved long journeys to fetch raw material. (2) A place where **seals could be made close to the stone**, with less waste from carrying unworked blocks. (3) A **supplier for other towns**, so that finished or half-worked seals could travel to distant cities along existing trade routes.',
  sol: 'Supply, workshop and distribution benefits of a site near the material.',
  scheme: [['Easy supply of the stone', 1], ['Workshop near the material', 1], ['Supply to other towns', 1]],
}));
Q('s3_social', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Why must historians be careful in using burials and luxury objects to infer social differences? Give three reasons.',
  model: '(1) Graves vary only modestly, so **no clear ranks** can be read from them. (2) Luxuries cluster in **large settlements**, but that may reflect **where archaeologists have dug**. (3) What counts as a luxury depends on **historians\' own classification**, which may not match how Harappans valued things.',
  sol: 'Three limits on the evidence, none of them a restatement of the burials themselves.',
  scheme: [['Modest variation in burials', 1], ['Distribution may reflect excavation', 1], ['Classification is the historian\'s', 1]],
}));
Q('l_craft', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'To what extent did Harappan craft production depend on distant regions for its raw materials?',
  model: '1. **Near sources:** Nageshwar and Balakot (shell), Shortughai (lapis lazuli) and Lothal (carnelian) lay close to their materials, and steatite came from south Rajasthan and north Gujarat.\n2. **Expeditions:** parties went to the Khetri region for copper and to south India for gold, so some needs were met by organised journeys.\n3. **Distant lands:** copper also came from Oman.\n4. **Craft centres:** Chanhudaro, given almost wholly to crafts, relied on materials brought to it.\n5. **Judgement:** dependence was real but mostly on regions within or beside the Harappan world; distant lands supplied some metal and markets, so it was partial.',
  sol: 'Near sources, expeditions and distant lands weighed, with a craft-centre example and a conclusion.',
  scheme: [['Near sources', 1], ['Expeditions', 1], ['Distant lands', 1], ['Craft centre and its needs', 1], ['Reasoned judgement', 1]],
}));
Q('sb_craft', source({
  t: [2, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source from an imagined museum guide's notes and answer the questions that follow. ${IMAG}`,
  passage: '**Museum guide\'s notes on a craft town (imagined)**\n\nVisitors often ask why this small town had no grand hall or large store. The answer lies in the workshop lanes. Nearly every house in the excavated area had heaps of waste: chips of shell, broken carnelian and discarded bead blanks. Drills of hard stone, grinding slabs and small furnaces lay beside them. The nearest source of carnelian is far away, so the stone must have arrived in bulk, probably carried by traders or by the workers themselves. Finished beads from this town have turned up in larger cities, but we do not yet know who paid for them or how they were exchanged.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Name one kind of waste found at the site.', model: '**Chips of shell**, broken carnelian or discarded bead blanks (any one).', sol: 'Read the third and fourth sentences of the passage.', scheme: [['One waste named', 1]] })),
        child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'The drills, grinding slabs and furnaces lay beside the waste. What do they tell us about where the beads were made?', model: 'The beads were **made on the spot**: the town was a **workshop**, not just a place that used beads.', sol: 'Tools found beside waste point to work done there.', scheme: [['Made on the spot, a workshop', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): The guide says that we do not know how the beads were exchanged. Suggest two kinds of evidence archaeologists could look for to find out.', model: '(1) **Seals or clay sealings** at the town or in the cities, which would show goods being marked and sent. (2) **Weights** and the **distribution of the same bead types** in other places, which would show standard measures and routes of exchange.', sol: 'Two kinds of evidence of exchange that the passage does not supply.', scheme: [['First kind of evidence', 1], ['Second kind of evidence', 1]] }),
    [short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): The town was far from its carnelian source. Give two things that its craftspeople would have needed to keep working.', model: '(1) A **dependable way to bring the stone in bulk**, such as traders, carriers or organised expeditions. (2) **Links with other settlements** that would buy the finished beads, so that the cost of getting the raw stone was repaid.', sol: 'Two practical requirements for a craft town far from its raw material.', scheme: [['First requirement', 1], ['Second requirement', 1]] })]),
  ],
}));

// ================================================================ t03 Seals, script, weights; ancient authority
Q('m_seal_use', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Why does a sealing found in a distant storeroom tell historians more about exchange than a seal found in a house?',
  opts: [
    'A sealing shows that the seal was actually pressed on goods that moved, whereas a seal shows only that someone held it',
    'A sealing is made of a harder stone than a seal',
    'A sealing carries a message that has been deciphered',
    'A sealing proves that the storeroom belonged to a ruler',
  ],
  sol: 'The impression is a trace of use on goods, and its place of discovery shows where they ended up. A seal alone gives no sign of movement. Nothing here is deciphered or tied to a ruler.',
}));
Q('m_script_dir', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Inscriptions on most Harappan seals are read from',
  opts: ['right to left', 'left to right', 'top to bottom', 'the centre outwards in a spiral'],
  sol: 'Scholars have worked out the direction even though the script itself is still unread.',
}));
Q('m_weights', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'An imagined set of Harappan weights has the values 1, 2, 4, 8, 16, 32 and 64, and then 640, 6,400 and 64,000. Which statement matches the pattern of Harappan weights?',
  opts: [
    'The smaller values double each time, and the larger values follow a decimal pattern',
    'All values follow a decimal pattern',
    'All values double each time without any change',
    'The values follow no pattern at all',
  ],
  sol: 'Check the two stretches separately: the first seven values double each time, and each of the last three is ten times the one before. Doubling first and decimal later is how Harappan weights are described.',
}));
Q('m_seal_new', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Archaeologists find a seal with an animal and four signs at one site, and a clay sealing made by an identical seal at a site about 500 km away. What can and cannot be concluded?',
  opts: [
    'Goods marked with this seal probably travelled between the two places, but the meaning of the signs stays unknown',
    'The signs name the ruler of both places',
    'The language of the signs is now confirmed',
    'The second site was governed from the first',
  ],
  sol: 'The matching impression is evidence of movement or contact. Reading the signs or naming rulers would need evidence that the find does not supply, since the script is undeciphered.',
}));
Q('m_authority_view', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which discovery, if it were made, would most weaken the view that the Harappan world formed one state?',
  opts: [
    'Mohenjodaro and Harappa being found to use clearly different standards of bricks and weights',
    'Bricks of the 4:2:1 ratio at distant sites',
    'Seals of one type in many cities',
    'A large warehouse at Mohenjodaro',
  ],
  sol: 'The one-state view leans on uniformity, so evidence of separate standards at the two great centres would cut against it. The other findings fit uniformity or say nothing about it.',
}));
Q('m_priest_king', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A student writes: The stone statue called the priest-king proves that Harappan cities were ruled by priests. What is the main flaw in this claim?',
  opts: [
    'The label is the archaeologists\' own guess about a single figure, which cannot show who held power',
    'The statue was made in Mauryan times',
    'The statue is made of iron',
    'Harappan cities had no religion',
  ],
  sol: 'A name given to an object records an interpretation. One statue with no inscription is not enough to say who governed. The other options state facts that are wrong or unsupported.',
}));
Q('ar_standard', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Standard weights suggest that exchange in the Harappan world was regulated.',
  r: 'Harappan weights were usually cubical, made of chert, and carried no markings.',
  sol: 'Both statements hold, but the shape, stone and lack of marks only describe the weights; the sign of regulation lies in their consistent system of values, so the second does not explain the first.',
}));
Q('ar_authority', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'Planned cities and standard bricks do not by themselves prove that a single king ruled the Harappan world.',
  r: 'Such uniformity could also have arisen from shared customs or from coordination among several centres.',
  sol: 'The alternative sources of uniformity are exactly why the evidence cannot decide between one ruler and other arrangements, so the reason supports the assertion.',
}));
Q('tf_palace', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Excavations have confirmed a palace and a royal burial at Mohenjodaro.',
  sol: 'No palace or king\'s burial has been confirmed, which is one reason the question of rulers remains debated.',
}));
Q('fb_steatite', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Most Harappan seals were carved from a soft stone called ___.',
  acc: [['steatite']],
  sol: 'Steatite is easy to carve, and seals of it bear animal motifs and signs.',
}));
Q('s_seals', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A clay lump with a seal impression and the mark of a cord is found in a storeroom, far from where seals of that design were made. State two reasonable conclusions.',
  model: '(1) Goods tied with a cord were **sealed in one place and sent** to another, so the storeroom was probably receiving goods. (2) The **design** identified the sender or owner, though the **script cannot be read**, so we cannot say who the sender was.',
  sol: 'One conclusion about movement of goods and one about the limits of identification.',
  scheme: [['Goods sealed and sent', 1], ['Design identifies the owner but the script is unread', 1]],
}));
Q('s_script', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State two features of the Harappan script.',
  model: '(1) It is **not alphabetic** and has about **375 to 400 signs**, so one sign did not stand for one sound. (2) It is written mostly **from right to left** on seals and has **not been deciphered**, so its language is unknown.',
  sol: 'Any two features from the set of facts known about the script.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_weights', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Sets of weights from two Harappan sites about 600 km apart follow the same doubling pattern. State two conclusions historians can reasonably draw, and note one thing the weights cannot show.',
  model: 'The sites **shared a system of measurement**, which suggests contact or common standards in exchange, and some form of **coordination**. The weights **cannot show who set the standard**, since they carry no marks or writing.',
  sol: 'Two conclusions from the matching pattern and one limit.',
  scheme: [['Two conclusions', 1], ['One limit', 1]],
}));
Q('s3_authority', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Why is it difficult to prove that the Harappan world was ruled by kings? Give three reasons.',
  model: '(1) No **palace** or **king\'s burial** has been clearly identified. (2) **Planning and uniform artefacts** show coordination, but that could come from one state, several rulers or shared custom. (3) The **script is unread**, so no inscription tells us who held power; names such as priest-king are guesses made by archaeologists.',
  sol: 'Three reasons: missing physical evidence, ambiguous evidence of order, and silent writing.',
  scheme: [['No palace or royal burial', 1], ['Uniformity has several explanations', 1], ['Script unread; labels are guesses', 1]],
}));
Q('l_authority', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Historians have offered three views of Harappan rule: no rulers, several rulers, or one state. Assess which view the evidence supports best.',
  model: '1. **Evidence to explain:** planned cities, standard bricks, weights and seals show complex decisions and coordination.\n2. **No rulers:** the lack of a confirmed palace or royal burial supports it, but organised work on this scale makes it hard to believe that nobody directed it.\n3. **Several rulers:** separate centres such as Mohenjodaro and Harappa may each have had a ruler, as their different layouts hint.\n4. **One state:** uniform artefacts and planning over a wide area fit a single authority, yet uniformity may come from shared custom.\n5. **Judgement:** none is proven; the one-state view explains uniformity best, while the missing palace and unread script keep the debate open.',
  sol: 'Evidence, each of the three views weighed, and a reasoned conclusion.',
  scheme: [['Evidence of coordination', 1], ['No-rulers view weighed', 1], ['Several-rulers view weighed', 1], ['One-state view weighed', 1], ['Reasoned judgement', 1]],
}));
Q('sb_seal', source({
  t: [3, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, a summary of what an excavation report records about one storeroom, and answer the questions that follow. ${SUM}`,
  passage: '**What the report records about Storeroom 3 (summary)**\n\nThe room held a lump of clay carrying the impression of a seal, which shows an animal and a short row of signs. Pressed into the clay are traces of a cord. Cubical stone weights of several sizes lay on the floor, and none carried any writing. The report adds that the signs have not been read and warns against guessing the language. It also notes that the doorway had been blocked at some later stage.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'What name do archaeologists give to a clay lump bearing a seal impression?', model: 'A **sealing**.', sol: 'The term for pressed clay, as distinct from the seal itself.', scheme: [['Sealing', 1]] })),
        child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: 'The report notes that the doorway was blocked at a later stage. What does this suggest about the room\'s use over time?', model: 'Its use **changed or ended later**; the **storeroom phase** was probably **earlier** than the blocking of the door.', sol: 'A later blocking implies that the room served another purpose or none afterwards.', scheme: [['Use changed or ended; storeroom phase earlier', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): The weights are cubical and unmarked, and of several sizes. Give one inference that historians can draw from this and one thing it cannot show.', model: '(1) The **range of sizes** suggests a system of weighing, probably for measuring goods in trade or craft. (2) It **cannot show who set the standards** or how traders were checked, since the weights bear no writing or names.', sol: 'One inference supported by the weights and one limit.', scheme: [['One inference', 1], ['One limit of the evidence', 1]] }),
    [short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain how a sealing with a cord mark and a storeroom setting together suggest how goods were handled. Give two points.', model: '(1) The **cord mark** suggests that the clay once **secured a bundle or container**, which the seal marked. (2) Finding it in a **storeroom** suggests that such goods were **received or kept there**, so seals were part of controlling goods.', sol: 'Two inferences from the combination of clay, cord and place.', scheme: [['Clay and cord: securing goods', 1], ['Storeroom: receiving or keeping goods', 1]] })]),
  ],
}));

// ================================================================ t04 The end of the civilisation; discovery
Q('m_late', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In an imagined trench the lower layer holds seals, cubical weights and drilled carnelian beads, and the upper layer holds only coarse local pottery. How should the two layers be dated?',
  opts: [
    'The lower layer is Mature Harappan and the upper layer is Late Harappan',
    'The lower layer is Late Harappan and the upper layer is Mature Harappan',
    'Both layers are Early Harappan',
    'Both layers belong to the Mauryan period',
  ],
  sol: 'Seals, standard weights and specialised beads belong to the mature phase, whose features fade later; layers also run from older at the bottom to newer at the top.',
}));
Q('m_dales', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Skeletons are found lying together in one layer at a Harappan site. For historians to read them as victims of a single massacre by invaders, which evidence would be most essential?',
  opts: [
    'That all the bodies date from the same moment, show signs of violent death and lie with a layer of destruction',
    'That most of the bodies are those of adults',
    'That pottery lying near them is finely painted',
    'That the site lies close to a river',
  ],
  sol: 'A massacre must be shown by simultaneous death, violence and damage to the settlement. This is the standard on which critics such as George Dales found the Mohenjodaro skeletons wanting.',
}));
Q('m_cunningham', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Who was the first Director-General of the Archaeological Survey of India?',
  opts: ['Alexander Cunningham', 'John Marshall', 'R. E. M. Wheeler', 'Daya Ram Sahni'],
  sol: 'Cunningham began the Survey\'s work in 1861; Marshall and Wheeler held the post later.',
}));
Q('m_cunningham_interest', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Cunningham was shown a Harappan seal but did not grasp its importance. What does this episode best illustrate about archaeological work?',
  opts: [
    'What scholars recognise in a find depends partly on the periods and questions already in their minds',
    'Seals are never important for history',
    'A find loses value when it is handed over by someone else',
    'Early archaeologists deliberately hid evidence',
  ],
  sol: 'His attention was on the Early Historic period and the accounts of Chinese pilgrims, so an older kind of object did not fit his framework. This is a limit of perspective, not of honesty.',
}));
Q('m_method', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An old report says a seal and a bead were found at the same depth in a sloping mound dug in flat units. Why can a historian not assume they are of the same age?',
  opts: [
    'On a slope the same depth can cut across different layers, so the two may belong to different periods',
    'Seals and beads are always made at different times',
    'Depth records are never kept in reports',
    'A bead cannot be dated at all',
  ],
  sol: 'Layers dip along a sloping mound, so a flat unit takes in deposits of different ages at the same depth. Equal depth is therefore weak evidence of equal age.',
}));
Q('m_wheeler', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Two seals come from one trench in a mound, one from a high layer and one from a deep layer. Which practice would let the archaeologist record that the deeper seal is probably older?',
  opts: [
    'Following and recording each layer separately as the digging proceeds',
    'Digging in equal-depth units across the whole mound',
    'Putting all finds from the trench in one bag',
    'Leaving out the depth at which each find lay',
  ],
  sol: 'Recording layers keeps the order in which deposits built up, which is the point of stratigraphy, the method followed by R. E. M. Wheeler.',
}));
Q('m_mother', mcq({
  t: 4, d: 4, c: 'understanding',
  stem: 'Some archaeologists read certain terracotta female figurines as images of a mother goddess. Which is the best evaluation of this reading?',
  opts: [
    'It is plausible by analogy with later practice but unproven, and needs supporting context such as where the figurines were found',
    'It is proven, since the figurines are female',
    'It is false, since the Harappans had no religion',
    'It is irrelevant to history',
  ],
  sol: 'A religious reading of an object borrows from later or other societies, so it needs find-spots and associated objects to be more than a guess. The other options claim certainty either way.',
}));
Q('m_regions', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A survey records 120 mature Harappan sites in one region and only 20 of the later phase there, but 150 later sites in a neighbouring region with far fewer before. Which conclusion is best supported?',
  opts: [
    'Many people probably moved to new areas, though the survey alone does not say why',
    'The whole population died out',
    'Invaders must have destroyed the first region',
    'Rivers must have dried up in both regions',
  ],
  sol: 'A fall in one place matched by a rise in another points to movement. The cause of the movement, whether climate, rivers or something else, needs separate evidence.',
}));
Q('m_report_limit', mcq({
  t: [4, 5], d: 3, c: 'application',
  stem: 'An excavation report lists beads, seals and pots but does not say in which layer or room each was found. Which conclusion would be least safe to draw from it?',
  opts: [
    'That a seal and a bead listed together were used together in one building',
    'That beads, seals and pots were all found at the site',
    'That the site was occupied for some time',
    'That the report\'s authors thought the finds worth recording',
  ],
  sol: 'Without find-spots the link between objects is lost, so only the general presence of types at the site can be stated safely.',
}));
Q('m_report_infer', mcq({
  t: [1, 5], d: 2, c: 'application',
  stem: 'Which sentence in an excavation report is an inference rather than a direct observation?',
  opts: [
    'The family in this house were wealthy merchants.',
    'The house had six rooms arranged round a courtyard.',
    'A copper mirror lay in one of the graves nearby.',
    'Ash lay on the floor of Room 2.',
  ],
  sol: 'Counting rooms, noting an object and describing ash are observations. The wealth and trade of a family go beyond what such finds can show by themselves.',
}));
Q('ar_decline', ar({
  t: 4, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'Historians do not treat any single cause as proven for the end of the mature Harappan cities.',
  r: 'Surveys show different patterns in different regions, with some places abandoned while new settlements grew elsewhere.',
  sol: 'Uneven patterns across regions are hard to fit to one cause, so the second statement is a reason for the caution stated in the first.',
}));
Q('ar_marshall', ar({
  t: 4, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: 'John Marshall\'s teams dug Harappan sites by following the natural layers of the mounds.',
  r: 'R. E. M. Wheeler later insisted that excavation must follow the layers of a mound.',
  sol: 'Marshall worked in uniform horizontal units, so the first statement is false; the second is true and was a response to that practice.',
}));
Q('ar_invasion', ar({
  t: 4, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Skeletons found at Mohenjodaro were once used to argue that the city ended in a massacre, but this reading is now doubted.',
  r: 'George Dales showed that all those skeletons lay together in one layer along with signs of conquest and fire.',
  sol: 'The first statement is accurate. The second reverses what Dales argued, which was that the remains did not add up to evidence of a single violent event.',
}));
Q('tf_late', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? In the Late Harappan phase, seals and standard weights continued to be widely used.',
  sol: 'They faded away, together with the script and specialised bead-making, as life became more rural.',
}));
Q('ord_discovery', ord({
  t: 4, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these steps in the discovery of the Harappan civilisation in chronological order.',
  items: [
    'Cunningham begins work in the Archaeological Survey',
    'Sahni digs at Harappa and finds seals',
    'Marshall announces a new civilisation',
    'Wheeler becomes Director-General',
  ],
  sol: 'Cunningham started in 1861, Sahni dug at Harappa in 1921, Marshall made his announcement in 1924 and Wheeler took charge in 1944.',
}));
Q('ord_layers', ord({
  t: 4, d: 3, c: 'application', marks: 1,
  stem: 'An imagined trench shows four layers. Arrange them from the deepest (oldest) to the top (newest). Layer P: hand-made pottery and no seals. Layer Q: seals, standard weights and specialised beads. Layer R: coarse local pottery and no seals. Layer S: iron objects and punch-marked coins.',
  items: [
    'Layer P',
    'Layer Q',
    'Layer R',
    'Layer S',
  ],
  sol: 'Early Harappan comes first, then the mature phase with its seals and weights, then the Late Harappan loss of those features, and finally the Early Historic period of iron and coins.',
}));
Q('s_late', short({
  t: 4, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A student writes: The Harappan people vanished around 1800 BCE. What is partly right and what is wrong in this claim?',
  model: '**Partly right:** the big cities were abandoned and **seals, script and standard weights** disappeared. **Wrong:** the people did not vanish; they **moved to new settlements** in Gujarat, Haryana and western Uttar Pradesh and lived on in a **changed, more rural** way.',
  sol: 'What the claim gets right about the cities and what it gets wrong about the people.',
  scheme: [['What is partly right', 1], ['What is wrong, with the evidence', 1]],
}));
Q('s_marshall', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why was Wheeler\'s way of excavating better than Marshall\'s for working out the sequence of a site?',
  model: 'Marshall dug in **uniform horizontal units**, so finds from different layers could be **mixed**. Wheeler **followed the layers**, so each object stayed tied to its **own layer and period**, and the order of events at the site could be reconstructed.',
  sol: 'Contrast of the two methods and the effect on the sequence.',
  scheme: [['Marshall: flat units mix layers', 1], ['Wheeler: layers keep order and context', 1]],
}));
Q('s_interpret', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'An archaeologist calls a figurine a mother goddess. Give two reasons why such a reading should be treated with caution.',
  model: '(1) The reading often rests on **analogy with later religion**, which may not apply to the Harappans. (2) A figurine alone, without **its context** such as where it was found and what lay with it, cannot show that it was **worshipped** rather than used as a toy or decoration.',
  sol: 'A limit of analogy and a limit of context.',
  scheme: [['Analogy with later practice', 1], ['Context missing', 1]],
}));
Q('s3_cunningham', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Harappa was known and a seal reached Cunningham decades before 1924. Explain three reasons why the civilisation was recognised only in the 1920s.',
  model: '(1) Cunningham\'s **framework** centred on the **Early Historic period** and the accounts of Chinese pilgrims, so he did not look for anything older. (2) The seal fitted **no known period**, and its **script was unread**, so its importance was missed. (3) **Systematic digging** at Harappa (1921) and Mohenjodaro (1922) gave **similar finds at two distant sites**, which let Marshall see **one civilisation**.',
  sol: 'His framework, the puzzling seal, and the later paired excavations.',
  scheme: [['Cunningham\'s framework', 1], ['Seal fitted no known period; script unread', 1], ['Two similar excavations seen as one civilisation', 1]],
}));
Q('s3_invasion', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Why do historians no longer treat a violent invasion as the explanation for the end of the Harappan cities? Give three points.',
  model: '(1) There is **no layer of destruction** or single massacre across the sites. (2) The **skeletons at Mohenjodaro** were questioned by George Dales and do not show one violent event. (3) The pattern of **people moving to new settlements**, and the slow loss of seals and weights, suggests a **gradual change**, not sudden conquest.',
  sol: 'Missing destruction evidence, the critique of the skeletons and the pattern of change.',
  scheme: [['No destruction layer', 1], ['Skeletons doubted by Dales', 1], ['Gradual change and movement', 1]],
}));
Q('l_discovery', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Compare the approaches of Cunningham, Marshall and Wheeler and assess how each shaped what we know about the Harappan civilisation.',
  model: '1. **Cunningham:** he began work for the Survey in 1861 and became its first Director-General; he looked for the Early Historic period and the places in pilgrims\' accounts, and a Harappan seal he was given was not understood.\n2. **Marshall:** after Sahni at Harappa (1921) and Banerji at Mohenjodaro (1922), he announced a new civilisation in 1924.\n3. **Method:** Marshall dug in uniform horizontal units, which mixed layers.\n4. **Wheeler:** Director-General from 1944; he followed the layers.\n5. **Assessment:** Cunningham\'s focus delayed the discovery, Marshall made it but lost context, and Wheeler\'s method made the sequence more reliable.',
  sol: 'Each scholar, the contrast in method, and a judgement of their effect.',
  scheme: [['Cunningham', 1], ['Marshall and the discovery', 1], ['Marshall\'s method', 1], ['Wheeler\'s method', 1], ['Assessment', 1]],
}));
Q('l_decline', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'To what extent can climatic and river changes explain the end of the mature Harappan cities?',
  model: '1. **Explanations offered:** climatic change, deforestation, excessive floods, shifting or drying rivers and overuse of the land.\n2. **In favour:** by about 1800 BCE most mature sites in regions such as Cholistan were abandoned, which fits environmental stress.\n3. **Against a single cause:** people moved to Gujarat, Haryana and western Uttar Pradesh, so some regions kept settlement.\n4. **Invasion:** no destruction layer supports it.\n5. **Judgement:** environmental change may have contributed, but the loss of seals, weights and writing suggests that trade and city life broke down more widely, so no single cause is proven.',
  sol: 'Explanations, evidence for and against, the rejected invasion and a reasoned conclusion.',
  scheme: [['Explanations listed', 1], ['Evidence in favour', 1], ['Evidence against a single cause', 1], ['Invasion dismissed with reason', 1], ['Reasoned judgement', 1]],
}));
Q('l_social', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Do burials and artefacts show that Harappan society was divided into social ranks? Examine the evidence on both sides.',
  model: '1. **For:** a few pit burials held jewellery or copper mirrors, while others held little.\n2. **For:** luxuries such as faience vessels cluster in large settlements.\n3. **For:** craft specialists at places such as Chanhudaro suggest different kinds of work.\n4. **Against:** most burials were plain, and no lavish tombs of rulers have been found; the pattern of finds may reflect where archaeologists dug; calling an object a luxury is the historian\'s choice.\n5. **Judgement:** some social difference is likely, but its form and depth cannot be settled from this evidence.',
  sol: 'Evidence for, evidence against, and a measured conclusion.',
  scheme: [['Burials as evidence', 1], ['Luxuries and their distribution', 1], ['Craft specialisation', 1], ['Limits of the evidence', 1], ['Reasoned conclusion', 1]],
}));
Q('sb_end', source({
  t: [4, 5], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the source, an imagined survey report, and answer the questions that follow. ${IMAG}`,
  passage: '**Report of a field survey along a dried riverbed (imagined)**\n\nThe survey team walked two districts beside the old channel. In the mature period we recorded many large and small settlements close to the channel. In the next period their number falls sharply and the biggest towns appear abandoned, while small new villages appear on the plains to the east and south. The pottery of these villages is plain and local, and no seals, standard weights or fine beads were found. No ash layers, burnt timbers or heaps of weapons that might point to a violent end turned up at any large site. Soil samples suggest that the river\'s flow weakened, but the dating is uncertain.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'What happened to the number of settlements close to the old channel in the next period?', model: 'It **fell sharply**, and the biggest towns appear **abandoned**.', sol: 'The third and fourth sentences give the answer.', scheme: [['Fell sharply', 1]] })),
        child('b', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'To which phase of Harappan history do the new villages most likely belong? Give one clue from the report.', model: 'The **Late Harappan** phase: the villages have **plain local pottery** and no **seals, standard weights or fine beads**.', sol: 'Match the missing features to the phase that lost them.', scheme: [['Late Harappan with one clue', 1]] })),
    child('c', short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Does this report prove that the weakening of the river ended the cities? Give two reasons for your view.', model: '(1) **No**: the report calls the **dating uncertain**, so it cannot show that the river weakened before the towns were left. (2) New villages appeared in **other regions**, so people may have left for several reasons, and the report cannot single one out.', sol: 'Two reasons why a link is possible but unproven.', scheme: [['Dating uncertain', 1], ['Other regions and reasons', 1]] }),
    [short({ t: 4, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Using the report, give two points for and one against the claim that the Harappan people vanished.', model: '**For:** the **big towns were abandoned** and the **seals and weights were lost**. **Against:** **new villages** appeared on the plains, which shows that people lived on in other places, only in a changed way of life.', sol: 'Two points for, one against, all drawn from the passage.', scheme: [['Points for (two)', 1], ['Point against', 1]] })]),
  ],
}));
Q('sb_dig', source({
  t: [4, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the source from an imagined letter by a trench supervisor and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a trench supervisor to a friend (imagined)**\n\nDear Kamala, the old way on this mound was to dig a flat unit a hand deep across the whole area, bag everything from that unit, and move down. On our new method, we follow the layers: a dark layer of ash is one layer, and a pale clay floor is another. Yesterday a bead came out of the clay floor at one corner, and a broken seal from the ash layer, which lies beneath the floor at that spot. Both lay about one hand deep from the surface, and the mound slopes steeply here.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'What name is given to the method of digging layer by layer, as used in this letter?', model: '**Stratigraphy.**', sol: 'The method that records the layers of a mound in order.', scheme: [['Stratigraphy', 1]] })),
        child('b', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'Why would the old method have put the two finds into one bag even though they lie in different layers?', model: 'The old method cut **flat units by depth**, and both finds lay at **about the same depth**; on a **sloping mound** a flat unit crosses different layers, so the layers were ignored.', sol: 'Combine the slope with the rule of digging by depth.', scheme: [['Flat units by depth plus the slope', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Which find, the bead or the seal, is likely to be older at that corner? Give two reasons.', model: 'The **seal** is likely to be older. (1) It came from the **ash layer**, which lies **beneath** the clay floor, and lower layers were normally laid down earlier. (2) The bead came from the floor above, so it was deposited **after** the ash layer.', sol: 'The seal, with two reasons from the order of layers.', scheme: [['Seal identified with the first reason', 1], ['Second reason', 1]] }),
    [short({ t: 4, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Suggest two things that the supervisor should record about each find to protect its context.', model: '(1) The **layer** from which it came, with its position in the trench. (2) The **spot and depth** at which it lay, and what lay beside it, so that later historians can tell how it was used and with what.', sol: 'Two kinds of record that preserve the context of a find.', scheme: [['Layer and position', 1], ['Depth, spot and neighbouring finds', 1]] })]),
  ],
}));
