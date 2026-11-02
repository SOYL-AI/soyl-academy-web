// Build ICSE 9 History & Civics ch05 The Harappan Civilisation. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch05', 'social-science');
const { timelineFigure, mapFigure, townFigure, bathFigure, gridFigure } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Where and when', 'Great Bath, Citadel, granaries, dockyard', 'Seals, figures and script', 'How historians read the evidence'], 'Route map of Part 1: where and when the civilisation flourished, the great structures, the seals, figures and script, and how historians read the evidence', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Town planning and drains', 'Trade, art and craft', 'Why the cities declined', 'Theories and cautions'], 'Route map of Part 2: town planning and drains, trade, art and craft, why the cities declined, and theories with cautions', 'Part 2 at a glance');
const vTimeline = timelineFigure('Timeline not to scale with four landmarks: about 2600 BCE mature cities flourish; about 1900 BCE decline begins; 1921 Harappa excavation begins under Daya Ram Sahni; 1922 Mohenjo-daro excavation begins under R. D. Banerji. A note says some books give about 2500 to 1750 BCE', 'Landmarks of the Harappan story (schematic, not to scale); dates are approximate and books differ.');
const vMap = mapFigure('Schematic map, not to scale, of nine Harappan sites: Harappa, Mohenjo-daro, Chanhudaro, Ropar, Kalibangan, Banawali, Rakhigarhi, Dholavira and Lothal, with a schematic line for the Indus and a dashed line for the old Ghaggar-Hakra bed', 'Some Harappan sites (schematic, not to scale; positions approximate).');
const vDisc = table(['Site', 'Where today', 'Dug from', 'Linked archaeologist'], [
  ['Harappa', 'Punjab, Pakistan', '1921', 'Daya Ram Sahni'],
  ['Mohenjo-daro', 'Sindh, Pakistan', '1922', 'R. D. Banerji'],
], 'Table of the two first great excavations: Harappa in Punjab, Pakistan, from 1921 under Daya Ram Sahni, and Mohenjo-daro in Sindh, Pakistan, from 1922 under R. D. Banerji; John Marshall directed the Archaeological Survey');
const vSites = table(['Site', 'Region today', 'Known for'], [
  ['Lothal', 'Gujarat', 'Brick basin, often called a dockyard; beads'],
  ['Kalibangan', 'Rajasthan', 'Planned streets; ploughed field traces'],
  ['Dholavira', 'Gujarat', 'Water reservoirs and a planned layout'],
  ['Rakhigarhi', 'Haryana', 'A large Harappan site'],
  ['Chanhudaro', 'Sindh, Pakistan', 'Craft workshops'],
], 'Table of Harappan sites in India and Pakistan with what each is known for: Lothal, Kalibangan, Dholavira, Rakhigarhi and Chanhudaro');
const vEvidence = flow('LR', ['Archaeologists dig and record finds', 'Compare with other sites', 'Propose an interpretation', 'Others test it and debate'], 'Flow of how historians work without a readable script: archaeologists dig and record finds, compare them with other sites, propose an interpretation, and others test it and debate', 'Reading the evidence.');
const vTown = townFigure('Schematic sketch of a Harappan town. A raised Citadel mound lies on the west with public buildings; a larger lower town to the east is divided into house blocks by streets that cross at right angles', 'Citadel and lower town (schematic, not to scale).');
const vBath = bathFigure('Schematic plan of the Great Bath: a brick tank with steps at both ends, sealed with natural tar, inside a corridor and rooms', 'The Great Bath (schematic plan, not to scale).');
const vGranary = table(['Structure', 'What was found', 'What scholars suggest'], [
  ['Granaries at Harappa', 'Brick platforms in rows near the Citadel', 'Grain was gathered and stored'],
  ['Mohenjo-daro platform', 'A large brick platform on the Citadel', 'Often called the great granary; some scholars question the name'],
], 'Table of granaries: the brick platforms in rows at Harappa suggest grain storage; the large platform at Mohenjo-daro is called the great granary, though some scholars question the name');
const vDock = table(['Question', 'One view', 'Another view'], [
  ['What was the Lothal basin?', 'A dockyard for boats', 'A water reservoir'],
  ['What would each view mean?', 'Sea trade was important', 'Water storage mattered'],
], 'Table comparing two views of the large brick basin at Lothal: a dockyard for boats meaning sea trade was important, or a water reservoir meaning water storage mattered');
const vInfer = table(['Imagined find', 'What we see', 'Reasonable inference', 'Caution'], [
  ['Brick tank with steps and tar lining', 'Watertight, on a raised mound', 'A public structure', 'Ritual use is a view, not proof'],
  ['Rows of raised brick platforms', 'Air could pass beneath', 'Possible grain stores', 'Check for storage remains'],
  ['Large brick basin by a channel', 'Could hold water', 'Dock or reservoir', 'Scholars differ'],
], 'Table for reading three imagined finds: a tar-lined brick tank, rows of raised platforms and a basin by a channel, each with what we see, a reasonable inference and a caution');
const vSeals = table(['Feature', 'What historians note'], [
  ['Material', 'Mostly steatite, a soft stone'],
  ['Shape', 'Usually small and square'],
  ['Figures', 'Bull, elephant, a unicorn-like animal; a few seated figures'],
  ['Use', 'Pressed on clay to mark goods; found in Mesopotamia too'],
  ['Religion', 'Some read a horned seated figure as an early god; others disagree'],
], 'Table of seal features: made mostly of steatite, usually small and square, showing animals and a few seated figures, pressed on clay to mark goods and found in Mesopotamia; religious readings are debated');
const vFigures = table(['Figure', 'Material', 'What it shows'], [
  ['Bearded man', 'Stone', 'Skill in carving; the name priest-king is a modern label'],
  ['Young woman, called the dancing girl', 'Bronze', 'Lost-wax casting and a lively sense of art'],
], 'Table of two figures: the stone bearded man shows carving skill and his priest-king name is modern; the bronze young woman called the dancing girl shows lost-wax casting and lively art');
const vScript = flow('LR', ['About 400 signs', 'Written mostly right to left', 'Short texts, mostly on seals', 'Undeciphered, so archaeology must speak'], 'Flow about the Harappan script: about 400 signs, written mostly right to left, short texts mostly on seals, undeciphered so archaeology must speak', 'What we know about the script.');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Great Bath: brick tank, watertight, steps, Citadel'],
  ['(ii)', '3', 'Citadel described; granaries and grain storage'],
  ['(iii)', '4', 'What each shows, and a caution on interpretation'],
], 'Table planning a ten-mark answer on Harappan structures: part (i) the Great Bath for 3 marks, part (ii) Citadel and granaries for 3 marks, part (iii) what each shows with a caution for 4 marks');

const vGrid = gridFigure('Schematic sketch of four house blocks with courtyards, a main street with covered drains dashed along both edges, and lanes between the blocks', 'Blocks, lanes, main street and drains (schematic, not to scale).');
const vBricks = table(['Feature', 'What archaeologists found'], [
  ['Bricks', 'Burnt bricks in about the proportion 1 : 2 : 4'],
  ['Houses', 'A central courtyard, a bathroom, often a well'],
  ['Roads', 'Streets crossing at right angles'],
  ['Waste', 'Bins or soak pits for rubbish'],
], 'Table of town planning features: burnt bricks in about the proportion 1 : 2 : 4, houses with a courtyard bathroom and often a well, streets crossing at right angles, and bins or soak pits for rubbish');
const vDrain = flow('LR', ['Bathroom of a house', 'Small channel in the wall', 'Covered drain along the street', 'Carried away from the houses'], 'Flow of used water: from the bathroom of a house, through a small channel in the wall, into the covered drain along the street, and carried away from the houses', 'How the drains worked.');
const vWhyPlan = table(['Observation', 'Possible meaning', 'Caution'], [
  ['Grid streets in many towns', 'Planning', 'Who planned is unknown'],
  ['Same brick proportion far apart', 'A common standard', 'Cause not recorded'],
  ['Covered drains with openings', 'Care for cleanliness', 'Rules are unknown'],
], 'Table of three observations with their possible meaning and a caution: grid streets suggest planning, same brick proportion suggests a common standard, covered drains suggest care for cleanliness');
const vRead = table(['Entry in an imagined diary', 'Feature', 'Topic'], [
  ['Streets meet at right angles', 'Grid layout', 'Town planning'],
  ['Slab-covered drain with openings', 'Drainage', 'Town planning'],
  ['Heap of unfinished carnelian beads', 'Bead-making workshop', 'Craft'],
  ['Cubical stone weights', 'Standard weights', 'Trade'],
], 'Table sorting four imagined diary entries: streets at right angles show grid layout and town planning, slab-covered drain shows drainage and town planning, unfinished carnelian beads show a bead workshop and craft, and cubical weights show standard weights and trade');
const vTradeInt = table(['Evidence', 'What it suggests'], [
  ['Cubical stone weights in regular ratios', 'Common measures in trade'],
  ['Beads, pottery and metals at distant towns', 'Goods moved between towns'],
  ['Seals pressed on clay', 'Goods marked and guarded'],
], 'Table of evidence for internal trade: cubical stone weights in regular ratios suggest common measures, goods at distant towns suggest movement of goods, and seals pressed on clay suggest goods were marked and guarded');
const vTradeExt = flow('LR', ['Harappan beads and goods', 'Overseas routes', 'Mesopotamian cities', 'Records mention Meluhha'], 'Flow of overseas trade: Harappan beads and goods travel by overseas routes to Mesopotamian cities, whose records mention Meluhha, generally identified with the Indus region', 'Trade with Mesopotamia.');
const vCrafts = table(['Craft', 'Material or feature'], [
  ['Pottery', 'Red clay pots with black painted designs'],
  ['Bead-making', 'Carnelian and other stones'],
  ['Metalwork', 'Copper and bronze; no iron'],
  ['Terracotta figurines', 'Baked clay animals, toys and figures'],
  ['Weaving', 'Cotton cloth'],
], 'Table of Harappan crafts: pottery in red clay with black designs, bead-making with carnelian and other stones, metalwork in copper and bronze with no iron, terracotta figurines of baked clay, and cotton weaving');
const vSort = table(['Imagined find', 'Category'], [
  ['A mould-made toy cart of baked clay', 'Terracotta craft'],
  ['A string of orange carnelian beads', 'Bead-making'],
  ['A bronze bowl', 'Metalwork'],
  ['A red pot with black bands', 'Pottery'],
], 'Table sorting four imagined finds: a baked clay toy cart is terracotta craft, carnelian beads are bead-making, a bronze bowl is metalwork, and a red pot with black bands is pottery');
const vDecline = flow('LR', ['Cities flourish', 'Signs of strain from about 1900 BCE', 'Cities shrink and are given up', 'Several causes suggested'], 'Flow of decline: cities flourish, signs of strain appear from about 1900 BCE, cities shrink and are given up, and several causes are suggested', 'The story of decline.');
const vTheories = table(['Theory', 'Idea', 'Evidence suggested'], [
  ['Floods', 'Rivers overflowed and damaged towns', 'Silt layers over buildings at some sites'],
  ['Changing rivers', 'Water supply shifted away', 'Drying of the Ghaggar-Hakra bed'],
  ['Climate change', 'Less rain hurt farming', 'Studies of ancient climate'],
  ['Ecological strain', 'Overuse of land and trees', 'Pressure on resources near towns'],
  ['Weaker trade', 'Wealth from trade shrank', 'Fewer overseas links'],
], 'Table of five theories of decline: floods, changing rivers, climate change, ecological strain and weaker trade, each with the idea and the evidence suggested');
const vMap2 = mapFigure('Schematic map, not to scale, of Harappan sites with the Indus drawn as a solid line and the old Ghaggar-Hakra bed as a dashed line, showing sites that lay along river courses', 'Sites, the Indus and the old Ghaggar-Hakra bed (schematic, not to scale; positions approximate).');
const vInvasion = flow('LR', ['Older theory blamed invaders', 'Excavations: no clear sign of widespread violence', 'Decline looks gradual in many places', 'Rejected by most scholars'], 'Flow: an older theory blamed invaders, but excavations show no clear sign of widespread violence, the decline looks gradual in many places, so most scholars reject it', 'Why the older theory is set aside.');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Three theories: floods, rivers, climate'],
  ['(ii)', '3', 'Dependence on rivers and rain; effect of change'],
  ['(iii)', '4', 'Why the invasion theory is rejected; why no single cause'],
], 'Table planning a ten-mark answer on decline: part (i) three theories for 3 marks, part (ii) how rivers and climate mattered for 3 marks, part (iii) the invasion theory and why no single cause for 4 marks');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Harappan Civilisation — Part 1: Sources, Structures and Seals',
  goals: [
    'Place the Harappan Civilisation in time and space and name the main sites',
    'Describe the Great Bath, the Citadel, the dockyard at Lothal and the granaries, and what they tell us',
    'Explain the importance of seals, the bearded man and the bronze figure of a young woman',
    'Explain why the undeciphered script limits our knowledge and why interpretations must be weighed',
  ],
  slides: [
    sl('title', 'The Harappan Civilisation', {
      b: 'Part 1 — a **city civilisation** known mainly from what its people left in the ground.',
      v: vRoute1,
      n: 'More than four thousand years ago, cities with straight streets and covered drains flourished in the Indus region. We cannot read their writing, so we learn about them from the ruins and objects they left behind. In this part we study the great structures, the seals and statues, and how historians read such evidence carefully.',
    }),
    sl('diagram', 'When did it flourish?', {
      b: 'Dates are approximate and books differ.',
      v: vTimeline,
      n: 'The mature phase of the Harappan Civilisation is dated to about twenty six hundred to nineteen hundred before the Common Era. Some books give about twenty five hundred to seventeen fifty. Scholars differ, so we say about. The cities were dug up only in the nineteen twenties, first at Harappa in nineteen twenty one and then at Mohenjo-daro in nineteen twenty two.',
    }),
    sl('diagram', 'Where were the cities?', {
      b: 'The civilisation spread across today\'s Pakistan and north-western India.',
      v: vMap,
      n: 'This sketch shows some Harappan sites. Harappa and Mohenjo-daro are in present-day Pakistan. Lothal and Dholavira are in Gujarat, Kalibangan is in Rajasthan, and Rakhigarhi and Banawali are in Haryana. Ropar is in Punjab. Remember that the map is a schematic sketch, not drawn to scale, and the positions are only approximate.',
    }),
    sl('concept', 'Discovery and names', {
      bl: [
        '**Harappa** dug from **1921** (Daya Ram Sahni); **Mohenjo-daro** from **1922** (R. D. Banerji).',
        'John Marshall directed the **Archaeological Survey**.',
        'Called the **Harappan** or **Indus** civilisation; some books say Indus-Saraswati.',
      ],
      v: vDisc,
      n: 'Excavations at Harappa began in nineteen twenty one under Daya Ram Sahni, and at Mohenjo-daro in nineteen twenty two under R. D. Banerji. John Marshall directed the Archaeological Survey at the time. The civilisation is called Harappan after the first site found, or Indus after the river region. Some books also call it the Indus-Saraswati civilisation.',
    }),
    sl('diagram', 'Other important sites', {
      v: vSites,
      n: 'Besides the two first cities, many other sites matter. Lothal in Gujarat has a brick basin and bead workshops. Kalibangan in Rajasthan shows planned streets. Dholavira in Gujarat is known for water reservoirs. Rakhigarhi in Haryana is a large site, and Chanhudaro in Sindh was a centre of crafts.',
    }),
    sl('concept', 'Sources without a readable script', {
      bl: [
        'Historians depend on **archaeology**: ruins, tools, seals and sculptures.',
        'A reading is an **interpretation** that others may test.',
        'Say **scholars think**, not **it is certain**.',
      ],
      v: vEvidence,
      n: 'Because the script cannot be read, historians depend on archaeology. They dig, record the finds, compare them with other sites, and propose an interpretation. Other scholars then test it and often debate it. That is why good answers use phrases such as scholars think or some historians suggest, instead of claiming certainty.',
    }),
    sl('diagram', 'The Citadel and the lower town', {
      b: 'A raised mound in the west, a larger gridded town in the east.',
      v: vTown,
      n: 'Many Harappan towns had two parts. The Citadel was a raised mound, usually on the western side, with important public buildings. The larger lower town to the east held the houses and workshops, laid out in blocks. The raised ground made the Citadel stand out, and some scholars think it also gave protection from floods.',
    }),
    sl('check', 'Quick check: the Great Bath', {
      b: 'Choose the description that fits the Great Bath.',
      chk: 'm_bath_features',
      n: 'Think of a large brick tank with steps at both ends. Which option describes it?',
    }),
    sl('diagram', 'The Great Bath', {
      b: 'A watertight brick tank on the Citadel at Mohenjo-daro.',
      v: vBath,
      n: 'The Great Bath was a large brick tank with steps leading down at both ends. A layer of natural tar helped make it watertight, and a corridor with rooms surrounded it. It stood on the Citadel. Many scholars think it was used for ritual bathing by the community, but that is a view, not a proven fact.',
    }),
    sl('check', 'Quick check: fact or view?', {
      b: 'Decide whether the claim about ritual bathing is proven.',
      chk: 'tf_bath_certain',
      n: 'Remember that no readable record explains the structure. Is the claim proven, or is it a view?',
    }),
    sl('diagram', 'The granaries', {
      v: vGranary,
      n: 'At Harappa, rows of raised brick platforms near the Citadel are thought to be granaries where grain was stored. At Mohenjo-daro a large brick platform on the Citadel is called the great granary, though some scholars question that name. Whatever the label, such buildings suggest that farming produced a surplus that was collected and stored.',
    }),
    sl('diagram', 'The dockyard at Lothal', {
      v: vDock,
      n: 'At Lothal in Gujarat there is a large brick basin beside an old channel. Many books call it a dockyard, which would point to sea trade. Some scholars suggest it was a water reservoir instead. This difference of opinion shows why we say probable dockyard and do not state it as a certain fact.',
    }),
    sl('check', 'Quick check: Lothal', {
      b: 'Complete the sentence about the basin at Lothal.',
      chk: 'fb_dock',
      n: 'Many scholars describe the brick basin at Lothal in one word. Which word is it?',
    }),
    sl('example', 'Worked example 1: reading a find', {
      b: 'Name what we see, then an inference, then a caution.',
      bl: [
        'Step 1 — Describe what is visible.',
        'Step 2 — State a reasonable inference.',
        'Step 3 — Add a caution: who disagrees, or what is missing.',
        'Step 4 — Use scholars think in the answer.',
      ],
      v: vInfer,
      n: 'Here is a method for any imagined find. First describe what is visible. Then state a reasonable inference. Then add a caution. For a tar lined brick tank on a mound, we infer a public structure, and add that ritual bathing is only a view. This habit keeps answers accurate and earns full marks.',
    }),
    sl('diagram', 'Seals', {
      v: vSeals,
      n: 'Seals were small, mostly square, and carved from steatite, a soft stone. They show animals such as the bull and the elephant, and a unicorn-like animal. Pressed into clay, they marked goods as belonging to a trader. Seals found in Mesopotamia show contact. One seal with a seated horned figure is read by some scholars as an early god, but others disagree.',
    }),
    sl('diagram', 'The bearded man and the young woman in bronze', {
      v: vFigures,
      n: 'The bearded man is a stone sculpture from Mohenjo-daro with a headband and a shawl. The name priest-king is a modern label, because no record says who he was. The bronze figure of a young woman, called the dancing girl, was made by the lost-wax method. Both show that Harappan artists were highly skilled.',
    }),
    sl('check', 'Quick check: the bronze figure', {
      b: 'Why do historians value the bronze figure?',
      chk: 'm_dancer_art',
      n: 'Think about what the figure shows about the skills of the Harappans.',
    }),
    sl('diagram', 'The undeciphered script', {
      b: 'Short texts, a few hundred signs, and no key to read them.',
      v: vScript,
      n: 'The Harappan script has about four hundred signs and is written mostly from right to left. Most texts are short and appear on seals. Nobody has yet deciphered it, and no text in two languages has been found to help. So we cannot read about their rulers, laws or beliefs, and must depend on archaeology.',
    }),
    sl('check', 'Quick check: the script', {
      b: 'Fill in the missing word about the script.',
      chk: 'fb_script',
      n: 'Think about what we can do with the script today. What word describes its state?',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) Describe the Great Bath. [3] (ii) What was the Citadel, and what do granaries suggest? [3] (iii) What do the structures tell us? Add a caution. [4]',
      bl: [
        '(i) Brick tank + watertight + steps + Citadel.',
        '(ii) Raised mound + public buildings; grain stored.',
        '(iii) What each shows + a caution that uses are interpretations.',
        'Aim for one point per mark.',
      ],
      v: vPlan1,
      n: 'To plan this ten mark answer, give three points to the Great Bath, three to the Citadel and the granaries, and four to what the structures tell us. In the last part, include a caution that the uses are interpretations. One clear point for each mark is the safest way to score well.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'Harappa dug from **1921**, Mohenjo-daro from **1922**; mature phase **about 2600 to 1900 BCE**.',
        '**Citadel** in the west; **Great Bath**, **granaries** and **Lothal basin** are key structures.',
        '**Seals**, the bearded man and the bronze figure show trade, belief and art.',
        'The **script is undeciphered**, so readings are **interpretations**.',
      ],
      v: vTown,
      n: 'To sum up. The Harappan sites were first dug in nineteen twenty one and nineteen twenty two. The Citadel, the Great Bath, the granaries and the basin at Lothal tell us about public life, storage and trade. Seals and statues show trade, belief and art. Because the script cannot be read, every reading remains an interpretation.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Write dates with **about**: scholars differ on the exact range.',
        'Say **scholars think** for the Great Bath, the dockyard and the granaries.',
        'Describe each structure first, then say what it tells us.',
        'Do not call the bearded man a king as a fact: it is a modern label.',
        'Link the **undeciphered script** to why interpretations differ.',
      ],
      n: 'A few exam habits. Give dates with the word about. For the Great Bath, the dockyard and the granaries, write that scholars think, because their uses are interpretations. Describe first, then explain. Never state priest-king as a fact. And link the undeciphered script to why different scholars read the evidence in different ways.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Harappan Civilisation — Part 2: Planning, Trade, Craft and Decline',
  goals: [
    'Describe Harappan town planning: grid, bricks, houses and the covered drainage system',
    'Describe internal trade, overseas trade with Mesopotamia and the main crafts',
    'Present the theories of decline as theories, with their evidence and limits',
    'Explain why an older invasion theory is now rejected by most scholars',
  ],
  slides: [
    sl('title', 'Planning, trade, craft and decline', {
      b: 'Part 2 — how the cities were built, how people earned a living, and why the cities faded.',
      v: vRoute2,
      n: 'In this part we look at how Harappan towns were planned, how trade and crafts supported them, and why the cities declined. We will see that the planning is clear from the remains, but the reasons for the decline are still debated, so we will treat each explanation as a theory.',
    }),
    sl('diagram', 'A planned layout', {
      b: 'Streets crossed at right angles and divided the town into blocks.',
      v: vGrid,
      n: 'In this sketch you can see house blocks, narrow lanes and a main street. In Harappan towns the roads ran north to south and east to west and crossed at right angles. Each block held several houses with courtyards. Covered drains ran along the streets. This regular layout is called a grid pattern.',
    }),
    sl('diagram', 'Bricks and houses', {
      v: vBricks,
      n: 'Builders used burnt bricks in a standard proportion, about one to two to four for thickness, width and length. A house usually had a central courtyard with rooms around it, a bathroom, and often a well. Bins or soak pits held rubbish. Standard bricks across many towns suggest a shared way of building.',
    }),
    sl('check', 'Quick check: the layout', {
      b: 'Choose the layout for a model of a Harappan town.',
      chk: 'm_grid',
      n: 'Think about how the streets met one another. Which option fits the grid pattern?',
    }),
    sl('diagram', 'The covered drainage system', {
      b: 'Waste water left each house and was carried away.',
      v: vDrain,
      n: 'Water used in a bathroom flowed through a small channel in the house wall into a covered drain along the street. The drains were roofed with bricks or stone slabs and had openings so that workers could inspect and clean them. Such a system, in a city of that age, shows high skill and care for cleanliness.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange the path of used water in order.',
      chk: 'ord_drain',
      n: 'Start in the bathroom of a house and follow the water until it leaves the houses.',
    }),
    sl('diagram', 'What does planning suggest?', {
      v: vWhyPlan,
      n: 'Scholars draw some inferences from the planning. Grid streets suggest that the towns were planned. The same brick proportion at distant sites suggests a common standard, and covered drains suggest care for cleanliness. But there is a caution. We cannot read any record, so we do not know who planned the towns or what rules they followed.',
    }),
    sl('example', 'Worked example 3: reading an imagined diary', {
      b: 'Sort each diary entry into a feature and a topic.',
      bl: [
        'Step 1 — Read the entry.',
        'Step 2 — Name the feature it shows.',
        'Step 3 — Place it under planning, craft or trade.',
        'Step 4 — Add a caution if a reading is uncertain.',
      ],
      v: vRead,
      n: 'Use this four step method on any diary or excavation report. Read the entry, name the feature, place it under planning, craft or trade, and add a caution if the reading is uncertain. Streets at right angles and a covered drain show planning. Unfinished beads show a craft. Cubical weights show trade.',
    }),
    sl('diagram', 'Internal trade', {
      v: vTradeInt,
      n: 'Harappans traded within their own lands. Cubical stone weights in regular ratios turn up at many sites, which suggests common measures. Beads, pottery and metals made in one place are found in other towns. Seals pressed on clay marked goods as owned and guarded them. Farmers, craftspeople and traders all depended on one another.',
    }),
    sl('diagram', 'Trade with Mesopotamia', {
      b: 'Meluhha in Mesopotamian records is generally identified with the Indus region.',
      v: vTradeExt,
      n: 'The Harappans also traded overseas. Seals and beads in the Indus style have turned up in the cities of Mesopotamia. Mesopotamian records speak of a land called Meluhha, which is generally identified with the Indus region. Lothal, with its workshops and probable dock, may have helped this trade. Sea and land routes both seem to have been used.',
    }),
    sl('diagram', 'Crafts', {
      v: vCrafts,
      n: 'Harappan crafts were varied. Potters made red pots with black designs. Bead makers worked carnelian and other stones. Metalworkers used copper and bronze, but no iron has been found. Terracotta figurines of animals, toys and people were made of baked clay, and cotton was woven into cloth. Craft workshops show skilled specialist work.',
    }),
    sl('check', 'Quick check: match the crafts', {
      b: 'Match each craft with its material or feature.',
      chk: 'mt_crafts',
      n: 'Think about the material in each craft. Match pottery, beads, metalwork and terracotta.',
    }),
    sl('example', 'Worked example 4: sorting imagined finds', {
      b: 'Sort each find into its craft, then say what it shows.',
      bl: [
        'Step 1 — Identify the material.',
        'Step 2 — Name the craft.',
        'Step 3 — Say what the find suggests, for example trade or skill.',
      ],
      v: vSort,
      n: 'To sort a find, first identify the material, then name the craft, and then say what the find suggests. A baked clay toy cart is a terracotta craft. Carnelian beads are bead making and may point to trade. A bronze bowl is metalwork. A red pot with black bands is pottery.',
    }),
    sl('diagram', 'The decline begins', {
      b: 'From about 1900 BCE the cities shrank and were given up.',
      v: vDecline,
      n: 'From about nineteen hundred before the Common Era the great cities began to shrink, and many were given up. Why did this happen? Scholars offer several theories. None is fully proved, so each must be presented as a theory with its evidence and its limits.',
    }),
    sl('diagram', 'Theories of decline', {
      v: vTheories,
      n: 'Here are the main theories. Floods may have damaged towns, shown by silt layers at some sites. Changing river courses, such as the drying of the Ghaggar-Hakra, may have cut off water. Climate change may have reduced rainfall. Overuse of land may have strained resources, and weaker trade may have shrunk wealth. Probably several causes worked together.',
    }),
    sl('check', 'Quick check: what most scholars think', {
      b: 'Choose the best statement about the decline.',
      chk: 'm_decline_multi',
      n: 'Remember that scholars do not agree on a single cause. Which option reflects the common view?',
    }),
    sl('diagram', 'Rivers and the sites', {
      b: 'Towns lived by rivers; when rivers changed, towns suffered.',
      v: vMap2,
      n: 'Look again at the sketch. Most Harappan sites lay along rivers or old river beds. The Indus is shown as a solid line and the old Ghaggar-Hakra bed as a dashed line. If a river shifted or dried, farms and trade routes lost their water, and people moved away. The map is schematic and the positions are approximate.',
    }),
    sl('concept', 'The older invasion theory', {
      bl: [
        'An older theory **blamed invaders** for ending the cities.',
        'Excavations show **no clear sign** of widespread violent destruction.',
        'The decline looks **gradual** in many places; most scholars now reject the theory.',
      ],
      v: vInvasion,
      n: 'An older theory blamed invaders for the end of the cities. Most scholars now reject it. Excavations do not show clear evidence of widespread violent destruction, and in many places the decline looks gradual. Good answers state the older theory neutrally, give the reason it is set aside, and then discuss the other explanations.',
    }),
    sl('example', 'Worked example 5: planning a 10-mark answer', {
      b: 'Question: (i) Three theories. [3] (ii) How could rivers and climate weaken the cities? [3] (iii) Why is the invasion theory rejected, and why is no single cause accepted? [4]',
      bl: [
        '(i) Floods, changing rivers, climate change.',
        '(ii) Dependence on rivers and rain + effect of drying.',
        '(iii) No evidence of violence + vast area + unread script.',
        'Present each cause as a theory.',
      ],
      v: vPlan2,
      n: 'To plan this answer, give three points to the three theories, three points to how rivers and rainfall mattered, and four points to part three. In part three, say that excavations show no clear evidence of violent destruction, and that no single cause explains cities spread over a vast area. Always call each explanation a theory.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        '**Grid** streets, **burnt bricks** about 1 : 2 : 4, courtyard houses and **covered drains**.',
        '**Internal trade** with standard weights; trade with **Mesopotamia** (Meluhha).',
        'Crafts: pottery, beads, copper and bronze, terracotta, cotton; **no iron**.',
        'Decline: **floods, rivers, climate, strain, weaker trade**; invasion theory rejected.',
      ],
      v: vTheories,
      n: 'To sum up. Harappan towns had grid streets, standard bricks, courtyard houses and covered drains. Trade ran within the lands and overseas to Mesopotamia. Crafts included pottery, beads, metalwork, terracotta and cotton, but no iron. The decline is explained by several theories, and the older invasion theory is rejected by most scholars.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Name **three or four** town-planning features, not just the grid.',
        'Give the **Meluhha** link when writing about Mesopotamia.',
        'Present every cause of decline as a **theory**, with evidence.',
        'Use **about** with dates and brick proportions.',
        'In 3 + 3 + 4 questions, use the last part for reasons or a caution.',
      ],
      n: 'Some exam habits. Give three or four features of town planning, not only the grid. Mention Meluhha when you write about Mesopotamia. Present every cause of decline as a theory with its evidence. Use the word about with dates. And use the last four marks of a structured question for reasons or a caution.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Harappan Civilisation — notes',
  sections: [
    {
      h: '1. Time, place and discovery',
      t: 1,
      b: '- The **Harappan** (or **Indus**) civilisation; some books add **Indus-Saraswati**. Mature phase **about 2600 to 1900 BCE**; many books teach **about 2500 to 1750 BCE**, so say **about**.\n- **Harappa** (Punjab, Pakistan) dug from **1921** under **Daya Ram Sahni**; **Mohenjo-daro** (Sindh, Pakistan) from **1922** under **R. D. Banerji**; **John Marshall** was Director-General of the Archaeological Survey.\n- Other sites: **Lothal** and **Dholavira** (Gujarat), **Kalibangan** (Rajasthan), **Rakhigarhi** and **Banawali** (Haryana), **Ropar** (Punjab), **Chanhudaro** (Sindh).\n- Without a readable script, **archaeology** is our main source and every reading is an **interpretation**.',
      terms: [['Harappan Civilisation', 'The first city civilisation of South Asia, named after Harappa; also called the Indus civilisation.'], ['Archaeology', 'The study of the past through ruins, tools, seals and other remains.']],
      v: vTimeline,
      vs: [vMap, vDisc],
    },
    {
      h: '2. The great structures',
      t: 1,
      b: '- **Citadel:** a raised mound, usually on the **western** side, with public buildings; the larger **lower town** lay to the east.\n- **Great Bath** (Mohenjo-daro): a **watertight brick tank**, sealed with natural tar, with **steps** at both ends and a corridor around it. Many scholars think it was for **ritual bathing**, which is a view.\n- **Granaries:** brick platforms at **Harappa**; the **great granary** of Mohenjo-daro, a name some scholars question.\n- **Lothal basin** (Gujarat): often called a **dockyard**; some scholars suggest a **reservoir**.\n- Each structure suggests an **organised community**, but each use is an **interpretation**.',
      terms: [['Citadel', 'The raised western mound of a Harappan town, with important public buildings.'], ['Interpretation', 'A reading of the evidence that other scholars may test or reject.']],
      v: vTown,
      vs: [vBath, vGranary, vDock, vInfer],
    },
    {
      h: '3. Seals, figures and script',
      t: 2,
      b: '- **Seals:** mostly **steatite**, usually **square**, with animals (bull, elephant, a **unicorn-like** animal) and signs; pressed on clay to **mark goods**; found in **Mesopotamia**. A seated horned figure is read by **some scholars** as an early form of a later god; others disagree.\n- **Bearded man:** a stone sculpture from Mohenjo-daro; **priest-king** is a **modern label**.\n- **Young woman in bronze** (dancing girl): made by **lost-wax casting**.\n- **Script:** about **400 signs**, mostly **right to left**, short texts, **undeciphered**. So we cannot read of rulers, laws or beliefs.',
      terms: [['Steatite', 'A soft stone used to carve most Harappan seals.'], ['Lost-wax casting', 'Making a metal figure by melting away a wax model from inside a mould.'], ['Undeciphered', 'Not yet read; the Harappan script has no known key.']],
      v: vSeals,
      vs: [vFigures, vScript],
    },
    {
      h: '4. Town planning',
      t: 3,
      b: '- **Grid layout:** streets ran north to south and east to west and crossed at **right angles**, dividing the town into **blocks**.\n- **Burnt bricks** in about the proportion **1 : 2 : 4**; houses with a **courtyard**, a **bathroom** and often a **well**.\n- **Covered drains** along the streets, roofed with bricks or slabs, with **openings** for cleaning; household channels joined them; **bins or soak pits** held rubbish.\n- Scholars infer **planning** and care for cleanliness, but **who planned** is unknown.',
      terms: [['Grid pattern', 'A layout in which streets cross at right angles to form blocks.'], ['Soak pit', 'A pit that lets waste water soak into the ground.']],
      v: vGrid,
      vs: [vBricks, vDrain, vWhyPlan],
    },
    {
      h: '5. Trade, art and craft',
      t: 4,
      b: '- **Internal trade:** goods moved between towns; **cubical stone weights** (chert) in regular ratios; **seals** marked goods.\n- **External trade:** with **Mesopotamia**; Indus-style seals and beads found there; Mesopotamian records mention **Meluhha**, **generally identified** with the Indus region.\n- **Crafts:** **pottery** (red with black designs), **beads** (carnelian), **metalwork** (copper and **bronze**, no **iron**), **terracotta figurines**, **cotton weaving**.\n- Farmers grew crops such as wheat, barley and cotton.',
      terms: [['Meluhha', 'A land named in Mesopotamian records, generally identified with the Indus region.'], ['Terracotta', 'Baked clay used for figurines, toys and pots.']],
      v: vTradeInt,
      vs: [vTradeExt, vCrafts, vSort],
    },
    {
      h: '6. Decline',
      t: 5,
      b: '- Cities shrank from **about 1900 BCE**; many were given up.\n- **Theories:** **floods** (silt layers), **changing rivers** (drying of the **Ghaggar-Hakra**), **climate change** (falling rainfall), **ecological strain**, **weaker trade**.\n- The **older invasion theory** blamed invaders; **most scholars now reject** it because excavations show **no clear evidence** of widespread violent destruction.\n- Probably **several causes** acted together, and the effect differed from **site to site**; the unread script gives no direct record.',
      terms: [['Theory', 'An explanation offered for something and tested against evidence, not yet proved.'], ['Ecological strain', 'Damage to the land and its resources from overuse.']],
      v: vDecline,
      vs: [vTheories, vMap2, vInvasion],
    },
  ],
  tips: '**Common mistakes**\n- Stating dates without **about**, or giving one range as if every book agreed.\n- Writing that the Great Bath was **certainly** for religion, or that the Lothal basin was **certainly** a dock.\n- Calling the bearded man a king as a fact.\n- Presenting one cause of decline as proved.\n- Listing only the grid under town planning.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, term or place.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, an inference or a caution.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Which two sites were dug first, and when?', '**Harappa** from **1921**; **Mohenjo-daro** from **1922**.', 'fact', 1],
  ['Who is linked with the Harappa excavation?', '**Daya Ram Sahni** (from 1921).', 'fact', 1],
  ['Who is linked with the Mohenjo-daro excavation?', '**R. D. Banerji** (from 1922).', 'fact', 1],
  ['Who directed the Archaeological Survey then?', '**John Marshall**, as Director-General.', 'fact', 1],
  ['Dates of the mature phase', '**About 2600 to 1900 BCE**; many books say about 2500 to 1750 BCE.', 'fact', 1],
  ['Other name of the Harappan Civilisation', 'The **Indus** civilisation (some books: Indus-Saraswati).', 'fact', 1],
  ['Citadel', 'The **raised mound**, usually on the **western** side, with public buildings.', 'definition', 1],
  ['Great Bath: three features', '**Watertight brick tank**, **steps** at both ends, corridor around it; on the Citadel.', 'fact', 1],
  ['Why is ritual bathing called a view?', 'No readable record explains the Great Bath, so it is an **interpretation**.', 'exam-tip', 1],
  ['Granaries', 'Brick platforms for storing grain; **Harappa** and the **great granary** of Mohenjo-daro (name questioned by some scholars).', 'fact', 1],
  ['Lothal basin', 'A large brick basin in **Gujarat**; many say **dockyard**, some say **reservoir**.', 'fact', 1],
  ['Harappan seals: material and shape', '**Steatite**, usually **square**.', 'fact', 2],
  ['Use of seals', 'Pressed on **clay** to **mark goods**; also found in **Mesopotamia**.', 'concept', 2],
  ['Animals on seals', 'Bull, elephant and a **unicorn-like** animal.', 'example', 2],
  ['Bearded man', 'A **stone sculpture** from Mohenjo-daro; **priest-king** is a **modern label**.', 'fact', 2],
  ['Dancing girl', 'A small **bronze** figure of a young woman, made by **lost-wax** casting.', 'fact', 2],
  ['Why does the script limit our knowledge?', '**About 400 signs**, mostly right to left, **undeciphered**; we cannot read their records.', 'concept', 2],
  ['Grid pattern', 'Streets crossing at **right angles**, dividing the town into **blocks**.', 'definition', 3],
  ['Proportion of Harappan bricks', 'About **1 : 2 : 4** (thickness, width, length).', 'fact', 3],
  ['A typical Harappan house', 'Central **courtyard**, **bathroom**, often a **well**.', 'fact', 3],
  ['Drainage system', 'House channels led into **covered street drains** with **openings** for cleaning.', 'concept', 3],
  ['What does the planning suggest?', 'Organised planning and care for cleanliness; who planned is **unknown**.', 'concept', 3],
  ['Harappan weights', '**Cubical** stone (chert) weights in **regular ratios**.', 'fact', 4],
  ['Meluhha', 'Land in Mesopotamian records, **generally identified** with the **Indus region**.', 'definition', 4],
  ['Evidence of trade with Mesopotamia', 'Indus-style **seals and beads** found there; **Meluhha** in the records.', 'concept', 4],
  ['Harappan crafts', 'Pottery, **bead-making**, metalwork, **terracotta** figurines, cotton weaving.', 'example', 4],
  ['Metals used', '**Copper** and **bronze**; **no iron**.', 'fact', 4],
  ['Five theories of decline', 'Floods, changing rivers, climate change, ecological strain, weaker trade.', 'concept', 5],
  ['River linked with decline', 'The drying of the **Ghaggar-Hakra**.', 'fact', 5],
  ['The older invasion theory', 'Blamed invaders; **now rejected by most scholars** (no clear evidence of widespread violence).', 'concept', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — The Harappan Civilisation',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_citadel_loc', 'm_script_limit', 'm_drain_inspect', 'm_meluhha', 'ar_invasion', 's_seal_info', 's3_planning'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_structures', 'l_planning'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — The Harappan Civilisation',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_bath_infer', 'm_granary_debate', 'm_pashupati', 'm_planning_infer', 'm_weights_infer', 'm_river', 'm_invasion', 'ar_script', 's_citadel', 's_internal_trade', 's_river_theory', 's3_structures', 's3_decline'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_seals_arts', 'l_decline', 'l_museum'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of icse-9-history-civics-ch05 only (Great Bath, Citadel, dockyard, granaries; seals, bearded man, dancing girl, script; urban planning; trade, art and craft; decline); no removed topics',
    originality: 'every museum, diary, letter and newspaper report is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no person or inscription quoted; pictures are SOYL schematic SVGs only, no artefact reproduced',
    data: 'timeline years asserted in increasing order; dates given as about because books differ; map positions approximate and captioned schematic, not to scale',
    facts: 'Harappa dug from 1921 (Daya Ram Sahni), Mohenjo-daro from 1922 (R. D. Banerji), John Marshall Director-General of the Archaeological Survey; mature phase about 2600 to 1900 BCE (some books about 2500 to 1750 BCE); steatite seals, undeciphered script of about 400 signs mostly right to left; bricks about 1:2:4; Meluhha generally identified with the Indus region; copper and bronze, no iron; decline theories presented as theories; older invasion theory rejected by most scholars',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
