// Build CBSE 12 History ch01 Bricks, Beads and Bones: The Harappan Civilisation. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-history-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-history-ch01', 'social-science');
const { DISCOVERY } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps: places are named in words only)
const vPhases = (() => {
  const s = new Svg(660, 250);
  s.rect(20, 40, 190, 80, { sw: 1.6, dash: true, color: 'muted' });
  s.text(115, 66, 'Early Harappan', { bold: true });
  s.text(115, 88, 'cultures, before', { size: 13 });
  s.text(115, 106, 'c. 2600 BCE', { size: 13 });
  s.rect(235, 40, 190, 80, { sw: 2.4, color: 'accent', fill: 'fill' });
  s.text(330, 66, 'Mature Harappan', { bold: true });
  s.text(330, 88, 'c. 2600 to', { size: 13 });
  s.text(330, 106, '1900 BCE', { size: 13 });
  s.rect(450, 40, 190, 80, { sw: 1.6, dash: true, color: 'muted' });
  s.text(545, 66, 'Late Harappan', { bold: true });
  s.text(545, 88, 'cultures, after', { size: 13 });
  s.text(545, 106, 'c. 1900 BCE', { size: 13 });
  s.arrow(40, 160, 640, 160, { sw: 1.8 });
  s.text(60, 182, 'earlier', { size: 13, anchor: 'start' });
  s.text(620, 182, 'later', { size: 13, anchor: 'end' });
  s.text(115, 214, 'Farming villages', { size: 13 });
  s.text(330, 214, 'Cities, seals, script, weights', { size: 13 });
  s.text(545, 214, 'No seals or weights; rural life', { size: 13 });
  return s.visual('Diagram of three phases on an arrow from earlier to later: Early Harappan cultures before about 2600 BCE with farming villages; Mature Harappan, about 2600 to 1900 BCE, with cities, seals, script and weights; Late Harappan cultures after about 1900 BCE, with rural life and no seals or standard weights', 'Three phases of the Harappan story');
})();

const vPlan = (() => {
  const s = new Svg(680, 300);
  s.text(340, 16, 'Schematic plan, not to scale and not a map', { size: 13, muted: true });
  s.text(30, 44, 'West', { anchor: 'start', size: 13, bold: true });
  s.text(650, 44, 'East', { anchor: 'end', size: 13, bold: true });
  // Citadel
  s.rect(30, 62, 210, 170, { sw: 2.4, color: 'accent', fill: 'fill' });
  s.text(135, 82, 'Citadel', { bold: true });
  s.text(135, 102, 'smaller, higher', { size: 12 });
  s.rect(46, 124, 84, 42, { sw: 1.4 });
  s.text(88, 145, 'Great Bath', { size: 12 });
  s.rect(140, 124, 88, 42, { sw: 1.4 });
  s.text(184, 145, 'Warehouse', { size: 12 });
  s.text(135, 200, 'on mud-brick platforms', { size: 12 });
  // Lower Town
  s.rect(270, 62, 380, 170, { sw: 2 });
  s.text(460, 82, 'Lower Town', { bold: true });
  s.text(460, 102, 'larger, lower, also walled', { size: 12 });
  s.text(460, 124, 'blocks of courtyard houses', { size: 12 });
  for (const y of [158, 198]) s.line(278, y, 642, y, { sw: 2, dash: true, color: 'accent' });
  for (const x of [330, 400, 520, 590]) s.line(x, 134, x, 226, { sw: 1.2, color: 'muted' });
  s.line(300, 262, 340, 262, { sw: 2, dash: true, color: 'accent' });
  s.text(350, 262, 'covered drains along the lanes', { size: 12, anchor: 'start' });
  s.text(30, 262, 'Platforms were laid first.', { size: 12, anchor: 'start', muted: true });
  s.text(30, 284, 'The Citadel lies to the west of the Lower Town.', { size: 12, anchor: 'start', muted: true });
  return s.visual('Schematic plan of Mohenjodaro, not a map: a smaller, higher Citadel on mud-brick platforms at the west, containing the Great Bath and the warehouse; a larger, lower, walled Lower Town at the east with blocks of courtyard houses and covered drains along the lanes', 'Citadel and Lower Town');
})();

const vHouse = (() => {
  const s = new Svg(560, 310);
  s.rect(160, 30, 300, 220, { sw: 2.4 });
  s.rect(170, 40, 60, 200, { sw: 1.2, color: 'muted' });
  s.text(200, 140, 'Rooms', { size: 12 });
  s.rect(240, 100, 130, 100, { sw: 1.6, color: 'accent', fill: 'fill' });
  s.text(305, 178, 'Courtyard', { bold: true, size: 13 });
  s.dot(268, 126, 9, 'accent');
  s.text(268, 148, 'Well', { size: 12 });
  s.rect(380, 40, 70, 90, { sw: 1.2, color: 'muted' });
  s.text(415, 85, 'Rooms', { size: 12 });
  s.rect(380, 140, 70, 100, { sw: 1.2 });
  s.text(415, 190, 'Bathing', { size: 12 });
  s.text(415, 208, 'room', { size: 12 });
  s.arrow(450, 220, 535, 220, { sw: 1.8, color: 'accent' });
  s.text(500, 240, 'Drain', { size: 12 });
  s.arrow(40, 150, 158, 150, { sw: 1.8 });
  s.text(20, 128, 'Door on a', { size: 12, anchor: 'start' });
  s.text(20, 144, 'side lane', { size: 12, anchor: 'start' });
  s.line(160, 250, 460, 250, { sw: 5, color: 'accent' });
  s.text(310, 278, 'Street side: a blank wall, no ground-floor windows', { size: 13 });
  s.text(310, 14, 'Schematic plan of one house', { size: 13, muted: true });
  return s.visual('Schematic plan of a Harappan house: rooms around a central courtyard with a well; a bathing room whose drain leads out through the wall; a door on a side lane; and a blank wall without ground-floor windows on the street side', 'A courtyard house');
})();

const vStrat = (() => {
  const s = new Svg(640, 310);
  s.polygon([[40, 40], [400, 100], [400, 140], [40, 80]], { sw: 1.4, fill: 'fill' });
  s.polygon([[40, 80], [400, 140], [400, 180], [40, 120]], { sw: 1.4, color: 'accent', fill: 'fill' });
  s.polygon([[40, 120], [400, 180], [400, 220], [40, 160]], { sw: 1.4, fill: 'fill' });
  s.text(220, 88, 'Late layer', { size: 13 });
  s.text(220, 128, 'Mature layer', { size: 13, bold: true });
  s.text(220, 168, 'Early layer', { size: 13 });
  for (const [y, t] of [[100, 'flat unit A'], [150, 'flat unit B']]) {
    s.line(40, y, 400, y, { sw: 2, dash: true, color: 'muted' });
    s.text(408, y, t, { size: 12, anchor: 'start' });
  }
  s.text(440, 44, 'Following layers:', { size: 13, anchor: 'start', bold: true });
  s.text(440, 62, 'trace each slanting band', { size: 12, anchor: 'start' });
  s.text(440, 210, 'Flat units cut across', { size: 13, anchor: 'start', bold: true });
  s.text(440, 228, 'the bands and can mix', { size: 12, anchor: 'start' });
  s.text(440, 244, 'finds of different ages', { size: 12, anchor: 'start' });
  s.text(320, 282, 'Newest layers lie on top; the oldest are usually at the bottom', { size: 13 });
  return s.visual('Cross-section diagram of a mound with three slanting layers, Late on top, Mature in the middle and Early at the bottom; two flat dashed digging units cross the slanting layers and would mix finds, while following each layer keeps finds in order', 'Layers and flat units');
})();

function timeline(items, alt, caption, y0, y1, step) {
  // Four label lanes (far above, near below, near above, far below) so neighbouring labels never collide.
  const s = new Svg(680, 360);
  const AX = 180;
  const X = (y) => 70 + ((y - y0) / (y1 - y0)) * 540;
  s.arrow(40, AX, 650, AX, { sw: 1.8 });
  for (let yr = y0; yr <= y1; yr += step) s.line(X(yr), AX - 6, X(yr), AX + 6, { sw: 1.2, color: 'muted' });
  const LANES = [20, AX + 30, 92, AX + 102];
  items.forEach(([yr, label], i) => {
    const top = LANES[i % 4];
    const above = top < AX;
    const lines = label.split(' | ');
    s.dot(X(yr), AX, 6, 'accent');
    s.line(X(yr), AX, X(yr), above ? top + 12 + lines.length * 18 : top - 12, { sw: 1.4, color: 'accent' });
    s.text(X(yr), top, String(yr), { bold: true, size: 13 });
    lines.forEach((ln, j) => s.text(X(yr), top + 18 + j * 18, ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}
const vDisc = timeline(
  DISCOVERY,
  `Timeline from 1850 to 1950: ${DISCOVERY.map(([y, t]) => `${y}, ${t.replace(' | ', ' ')}`).join('; ')}`,
  'From Cunningham to the sites of India',
  1850, 1950, 10,
);

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Phases and farming', 'Planning at Mohenjodaro', 'Social differences', 'Craft production', 'Getting materials'], 'Route map of Part 1: phases and farming, planning at Mohenjodaro, social differences, craft production, and the procurement of materials', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Seals', 'Script and weights', 'Who held authority?', 'The end of the cities', 'Discovery and sources'], 'Route map of Part 2: seals, script and weights, the debate on authority, the end of the cities, and discovery with source-based practice', 'Part 2 at a glance');
const vFood = table(
  ['Kind of evidence', 'What it tells us'],
  [
    ['Plant remains', 'Wheat, barley, lentil, chickpea, sesame; millets in Gujarat; rice only rarely'],
    ['Animal bones', 'Cattle, sheep, goat, buffalo and pig; wild animals and fish also eaten'],
    ['Tools and fields', 'Terracotta plough models; a ploughed field at Kalibangan'],
    ['Water works', 'Canal traces, reservoirs and wells'],
  ],
  'Table of the kinds of evidence for Harappan food: plant remains such as wheat, barley, lentil, chickpea and sesame; animal bones of domestic and wild animals and fish; tools and fields; and water works',
  'How we know what they ate',
);
const vWater = table(
  ['Site or region', 'Evidence', 'It suggests'],
  [
    ['Cholistan, Banawali', 'Terracotta models of the plough', 'Ploughing'],
    ['Kalibangan', 'Ploughed field, furrows at right angles', 'Perhaps two crops grown together'],
    ['Shortughai', 'Traces of canals', 'Irrigation'],
    ['Dholavira', 'Reservoirs', 'Storing water'],
  ],
  'Table of farming and water evidence: plough models at Cholistan and Banawali, the ploughed field with furrows at right angles at Kalibangan, canal traces at Shortughai, and reservoirs at Dholavira',
);
const vPlanned = flow('LR', ['Mud-brick platforms laid', 'Drains laid out', 'Standard bricks, ratio 4:2:1', 'Houses built around them'], 'Flow showing planning before building at Mohenjodaro: platforms laid, drains laid out, standard bricks, then houses built around them', 'Planned before it was built');
const vPublic = table(
  ['Structure', 'What we know', 'Caution'],
  [
    ['Great Bath', 'A water tank with steps, made watertight, in a courtyard on the Citadel', 'Ritual use is an interpretation'],
    ['Warehouse', 'A large building on the Citadel, once called the granary', 'What was stored is not certain'],
  ],
  'Table of two public structures on the Citadel: the Great Bath, a watertight tank with steps whose ritual use is an interpretation, and the warehouse, once called the granary, whose contents are not certain',
);
const vAnswer5 = table(
  ['Mark', 'What to write (about 20 words each)'],
  [
    ['1', 'Two parts: Citadel to the west, Lower Town to the east'],
    ['2', 'Platforms laid first, so the plan came before the building'],
    ['3', 'Standard bricks of one ratio, found at distant sites'],
    ['4', 'Covered drains planned before the houses'],
    ['5', 'Courtyard houses; Great Bath and warehouse as public structures'],
  ],
  'Table planning a 5-mark answer on Mohenjodaro: one point each on the two parts of the town, platforms laid first, standard bricks, planned drains, and courtyard houses with public structures',
  'Five headed points earn five marks',
);
const vBurial = table(
  ['What was found', 'A possible reading', 'The caution'],
  [
    ['Pit burials, mostly with pottery', 'Ordinary burial custom', 'Few or no goods in many graves'],
    ['A few with jewellery or a copper mirror', 'Some people had more wealth', 'Goods may reflect belief, not rank'],
    ['No lavish royal tombs', 'Little display of rank in death', 'Absence of finds is not proof'],
  ],
  'Table of burial evidence: pit burials mostly with pottery, a few with jewellery or a copper mirror, and no lavish royal tombs, each with a possible reading and a caution',
);
const vClass = table(
  ['Type', 'Test', 'Examples'],
  [
    ['Utilitarian', 'Serves daily needs; common materials', 'Grinding slab, cooking pot, needle'],
    ['Luxury', 'Rare materials or costly methods; not needed daily', 'Faience vessel, gold ornament'],
  ],
  'Table of two types of artefact: utilitarian objects, which serve daily needs and use common materials, and luxuries, which use rare materials or costly methods; with examples',
);
const vCrafts = table(
  ['Material', 'Objects made'],
  [
    ['Carnelian, jasper, crystal, quartz, steatite', 'Beads, seals'],
    ['Copper, bronze, gold', 'Tools, vessels, ornaments'],
    ['Shell', 'Bangles and inlay'],
    ['Faience and terracotta', 'Small vessels, figurines'],
  ],
  'Table of Harappan craft materials and what was made from them: stones for beads and seals, metals for tools and ornaments, shell for bangles, and faience and terracotta for small vessels and figurines',
);
const vCraftEv = flow('LR', ['Raw material', 'Tools', 'Unfinished objects', 'Waste', 'Likely craft centre'], 'Flow of evidence for a craft centre: raw material, tools, unfinished objects and waste together point to a likely workshop', 'Four traces of work');
const vProcure = table(
  ['Material', 'Where it came from'],
  [
    ['Shell', 'Settlements at Nageshwar and Balakot'],
    ['Lapis lazuli', 'Near Shortughai, in Afghanistan'],
    ['Carnelian', 'Lothal, near the sources around Bharuch'],
    ['Steatite', 'South Rajasthan and north Gujarat'],
    ['Copper', 'Khetri region of Rajasthan; also Oman'],
    ['Gold', 'Probably south India'],
  ],
  'Table of the sources of materials: shell from Nageshwar and Balakot, lapis lazuli near Shortughai, carnelian near Lothal, steatite from south Rajasthan and north Gujarat, copper from the Khetri region and Oman, and gold probably from south India',
  'Where the materials came from',
);
const vDistant = table(
  ['Name in texts or finds', 'Probable meaning'],
  [
    ['Meluhha', 'Probably the Harappan region'],
    ['Dilmun', 'Bahrain'],
    ['Magan', 'Probably Oman'],
    ['Harappan jar found in Oman', 'Contact across the sea'],
  ],
  'Table of distant contacts: Meluhha, probably the Harappan region; Dilmun, Bahrain; Magan, probably Oman; and a Harappan jar found in Oman as evidence of contact across the sea',
);
const vWeigh = table(
  ['Claim: luxuries show social ranks', 'For', 'Against'],
  [
    ['Luxuries are mostly in large settlements', 'Access may have been unequal', 'Digging has been uneven'],
    ['A few graves hold jewellery', 'Some wealth differences', 'Most graves are plain'],
  ],
  'Table weighing the claim that luxuries show social ranks: for, luxuries are mostly in large settlements and a few graves hold jewellery; against, digging has been uneven and most graves are plain',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Phases', 'Early, Mature (c. 2600 to 1900 BCE), Late'],
    ['Food', 'Wheat, barley, pulses; cattle and others; ploughs; canals and reservoirs'],
    ['Mohenjodaro', 'Citadel and Lower Town; platforms first; 4:2:1 bricks; drains; courtyard houses'],
    ['Society', 'Burials and luxuries hint at differences; caution needed'],
    ['Craft', 'Chanhudaro; evidence of workshops; materials from near and far'],
  ],
  'Summary table of Part 1: phases, food, planning at Mohenjodaro, social differences with caution, and craft production with procurement of materials',
);
const vTips1 = table(
  ['Mistake to avoid', 'Better'],
  [
    ['Saying the Citadel was lower', 'It was smaller and higher, to the west'],
    ['Saying rice was the staple', 'Wheat and barley; rice only rarely'],
    ['Saying graves prove kings', 'They hint at differences; no proof of rulers'],
    ['Writing iron among materials', 'Copper, bronze and gold; iron came later'],
  ],
  'Table of exam mistakes and corrections: the Citadel was smaller and higher to the west; wheat and barley, not rice, were staples; graves do not prove kings; and Harappan craftspeople did not use iron',
);
const vSeals = table(
  ['Feature', 'Detail'],
  [
    ['Material', 'Mostly steatite, a soft stone'],
    ['Design', 'Animal motifs and signs'],
    ['Use', 'Marking goods and bundles in long-distance exchange'],
    ['Evidence', 'Clay sealings, sometimes with cord marks'],
  ],
  'Table of seal features: mostly steatite, animal motifs and signs, used to mark goods in long-distance exchange, with clay sealings as evidence',
);
const vSealing = flow('LR', ['Goods tied in a bundle', 'Clay fixed on the cord', 'Seal pressed into the clay', 'Bundle travels', 'Impression marks the sender'], 'Flow showing how a sealed bundle probably worked: goods tied, clay fixed on the cord, seal pressed in, bundle travels, and the impression marks the sender', 'Seal, sealing, bundle');
const vScript = table(
  ['Fact', 'What it means'],
  [
    ['About 375 to 400 signs', 'Too many for one sign per sound'],
    ['Not alphabetic', 'Signs may stand for words or syllables'],
    ['Mostly right to left on seals', 'Direction is known'],
    ['Undeciphered', 'Language and messages are unknown'],
  ],
  'Table of script facts: about 375 to 400 signs, not alphabetic, mostly right to left on seals, and still undeciphered',
);
const vWeights = table(
  ['Feature', 'Detail'],
  [
    ['Stone', 'Chert'],
    ['Shape', 'Usually cubical, with no marks'],
    ['Lower values', 'Doubled: 1, 2, 4, 8, 16, 32 and so on'],
    ['Higher values', 'Decimal'],
  ],
  'Table of weight features: chert, usually cubical and unmarked, with lower values doubling and higher values decimal',
);
const vOrg = flow('LR', ['Standard bricks', 'Planned towns', 'Uniform weights', 'Seals on goods', 'Someone coordinating?'], 'Flow of signs of organisation: standard bricks, planned towns, uniform weights and seals on goods lead to the question of who coordinated them', 'Signs of coordination');
const vViews = table(
  ['View', 'Idea', 'Difficulty'],
  [
    ['No rulers', 'Society had no distinct ruling group', 'Large planned works need direction'],
    ['Several rulers', 'Each centre had its own ruler', 'Uniformity over a wide area'],
    ['One state', 'A single authority over the whole region', 'No palace or royal burial confirmed'],
  ],
  'Table of three views of Harappan rule: no rulers, several rulers and one state, each with its idea and its difficulty',
  'A debate, not a settled fact',
);
const vGrid5 = table(
  ['Mark', 'What to write'],
  [
    ['1', 'Evidence of complex decisions: bricks, planning, weights'],
    ['2', 'View one: no rulers, with its limit'],
    ['3', 'View two: several rulers, with its limit'],
    ['4', 'View three: one state, with its limit'],
    ['5', 'Your judgement: none proven, which is best supported'],
  ],
  'Table planning a 5-mark assessment of views of rule: evidence of complex decisions, then each of the three views with its limit, then a reasoned judgement',
);
const vDecline = table(
  ['Explanation offered', 'Limit'],
  [
    ['Climatic change', 'Dating and local effects uncertain'],
    ['Deforestation, overuse of land', 'Hard to measure its scale'],
    ['Excessive floods', 'Not seen at every site'],
    ['Shifting or drying rivers', 'Some regions kept settlements'],
  ],
  'Table of explanations for the end of the cities: climatic change, deforestation and overuse of land, excessive floods, and shifting or drying rivers, each with a limit',
  'No single cause proven',
);
const vInvasion = table(
  ['Old claim', 'Problem with it'],
  [
    ['Invaders destroyed the cities', 'No layer of destruction across the sites'],
    ['Skeletons at Mohenjodaro show a massacre', 'Dales showed they do not show one event'],
    ['The end was sudden', 'Seals and weights faded; people moved on'],
  ],
  'Table of the invasion claim and its problems: no layer of destruction, the Mohenjodaro skeletons do not show a single event, and change looks gradual',
);
const vLayersEx = table(
  ['Layer', 'Finds', 'Phase'],
  [
    ['Top', 'Coarse local pottery, no seals', 'Late Harappan'],
    ['Middle', 'Seals, cubical weights, drilled beads', 'Mature Harappan'],
    ['Bottom', 'Plain hand-made pottery, no seals', 'Early Harappan'],
  ],
  'Table of three layers in an imagined trench: top with coarse pottery and no seals, Late Harappan; middle with seals, weights and drilled beads, Mature Harappan; bottom with plain pottery and no seals, Early Harappan',
);
const vReport = flow('LR', ['Who wrote it, and when', 'What was found, and where', 'Observation or inference?', 'What cannot be said'], 'Flow of four steps for reading an archaeological report: who wrote it and when, what was found and where, observation or inference, and what cannot be said', 'Four steps for a source question');
const vInterp = table(
  ['Object', 'A reading offered', 'The caution'],
  [
    ['Female figurines', 'Mother goddess', 'Analogy with later practice; context needed'],
    ['Seal of a seated figure', 'An early form of a later god', 'Resemblance is not proof'],
  ],
  'Table of interpretations: female figurines read as a mother goddess and a seal with a seated figure read as an early form of a later god, each with the caution that analogy and resemblance are not proof',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Seals and sealings', 'Steatite; mark goods; script undeciphered'],
    ['Weights', 'Chert cubes; doubled then decimal'],
    ['Authority', 'Three views; no palace or royal burial confirmed'],
    ['The end', 'Abandonment by about 1800 BCE; Late Harappan; no single cause proven'],
    ['Discovery', 'Cunningham, Sahni, Banerji, Marshall, Wheeler; stratigraphy'],
  ],
  'Summary table of Part 2: seals and sealings, weights, the three views of authority, the end of the cities and the discovery',
);
const vTips2 = table(
  ['Mistake to avoid', 'Better'],
  [
    ['Calling the priest-king a proven ruler', 'It is a label; the question is debated'],
    ['Blaming a single cause for the end', 'Present several explanations; none proven'],
    ['Writing that invaders destroyed the cities', 'This idea is not supported'],
    ['Mixing up Marshall and Wheeler', 'Marshall: flat units; Wheeler: layers'],
  ],
  'Table of exam mistakes and corrections: the priest-king is a label, not proof; no single cause is proven for the end; the invasion idea is not supported; and Marshall used flat units while Wheeler followed layers',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Bricks, Beads and Bones — Part 1: Farming, Cities and Craft',
  goals: [
    'Describe Harappan subsistence strategies and the planning of Mohenjodaro',
    'Infer social differences from burials and artefacts, with the right cautions',
    'Explain how craft centres are identified and how materials were procured',
    'Use evidence to answer short and long questions on Harappan life',
  ],
  slides: [
    sl('title', 'Bricks, Beads and Bones', {
      b: 'Part 1: how the **Harappans farmed**, how they planned their towns, and how they made and obtained their goods.',
      v: vRoute1,
      n: 'The Harappan civilisation flourished more than four thousand years ago, yet we know about it only from what archaeologists dig up. In this part we look at what the Harappans ate, how Mohenjodaro was planned, what burials and objects say about society, and how craft workers found their materials.',
    }),
    sl('diagram', 'Three phases', {
      v: vPhases,
      n: 'Historians speak of three phases. Early Harappan cultures came before about twenty six hundred BCE. The mature phase, with its cities, seals, script and weights, lasted from about twenty six hundred to nineteen hundred BCE. Late Harappan cultures followed. The civilisation is named after Harappa, the first site where its remains were identified.',
    }),
    sl('concept', 'What the Harappans ate', {
      b: 'Food is traced through **plant remains**, **animal bones**, **tools and fields** and **water works**.',
      v: vFood,
      n: 'Burnt grains show that people ate wheat, barley, lentil, chickpea and sesame. Millets appear at some Gujarat sites, but rice only rarely. Bones show that cattle, sheep, goat, buffalo and pig were kept, while wild animals and fish were also eaten. Each kind of evidence answers a different question about food.',
    }),
    sl('concept', 'Fields and water', {
      b: 'Models, fields and water works show **how farming was done**.',
      v: vWater,
      n: 'Terracotta models of the plough come from Cholistan and Banawali. At Kalibangan, archaeologists found a ploughed field with two sets of furrows at right angles, which may mean that two crops were grown together. Traces of canals were found at Shortughai, and Dholavira had reservoirs. Each is a clue, and none is a complete picture.',
    }),
    sl('diagram', 'Mohenjodaro: the plan', {
      v: vPlan,
      n: 'Mohenjodaro was divided into two parts. The Citadel was smaller and higher, built on platforms of mud brick, and lay to the west. The Lower Town was larger and lower, also walled, and lay to the east. This drawing is a schematic plan, not a map, and it shows only the main idea of the layout.',
    }),
    sl('concept', 'Planned before it was built', {
      b: 'The platforms and **drains were laid out first**, and the houses were fitted around them.',
      v: vPlanned,
      n: 'Archaeologists conclude that Mohenjodaro was planned before it was built. The mud-brick platforms were laid first, and the drains were laid out before the houses. Bricks followed a standard ratio of four to two to one for length, breadth and height, and the same ratio is found at sites far apart.',
    }),
    sl('check', 'Quick check: the Citadel', {
      b: 'Compared with the Lower Town, the Citadel was…',
      chk: 'm_citadel',
      n: 'Remember its size, its height and its position.',
    }),
    sl('concept', 'A Harappan house', {
      b: 'Houses faced **inwards** onto a courtyard; many had a bathing room, a drain and a well.',
      v: vHouse,
      n: 'Many houses were built around a courtyard, with rooms opening onto it. The wall facing the street often had no windows at ground level, which gave privacy. Bathing rooms had drains that joined the drains of the lane, and many houses had their own wells. The plan shows a settled urban way of life.',
    }),
    sl('concept', 'The Great Bath and the warehouse', {
      b: 'Two public structures stood on the Citadel. Both names carry **interpretations**.',
      v: vPublic,
      n: 'On the Citadel stood the Great Bath, a tank with steps that was made watertight. Many scholars think it was used for special bathing, but that is an interpretation. Another large building was once called the granary and is now often called the warehouse, because what was stored there is not certain.',
    }),
    sl('example', 'Worked example 1: planning a 5-mark answer', {
      b: 'Question: *Describe the planning of the settlement at Mohenjodaro.*',
      bl: [
        'Step 1 — One point on the **two parts** of the town.',
        'Step 2 — One point on **platforms laid first**.',
        'Step 3 — One point each on **bricks** and **drains**.',
        'Step 4 — One point on **houses** and public structures.',
      ],
      v: vAnswer5,
      n: 'Here is how to plan a five mark answer. Give one point for the two parts of the town, one for platforms laid first, one for standard bricks and one for planned drains. Use the last mark for courtyard houses and the public structures. Keep each point to about twenty words and write in headed lines.',
    }),
    sl('check', 'Quick check: the brick ratio', {
      b: 'Bricks were made in the standard ratio of length to breadth to height of ___.',
      chk: 'fb_bricks',
      n: 'Think of the same ratio found at distant sites.',
    }),
    sl('concept', 'Burials and social difference', {
      b: 'Pit burials hint at **some differences**, but the evidence is thin.',
      v: vBurial,
      n: 'Most Harappan dead were buried in pits, some with pottery and ornaments, and a few with jewellery or a copper mirror. Grand tombs of rulers have not been found. Historians therefore see hints of social difference but not clear ranks. Beliefs about death also shaped what was buried, so grave goods alone cannot measure wealth.',
    }),
    sl('two-column', 'Utilitarian objects and luxuries', {
      cols: [
        '**Utilitarian:** serves daily needs and uses common materials, such as grinding slabs and cooking pots.',
        '**Luxury:** rare materials or costly methods, such as faience vessels and gold ornaments, found mostly in large settlements.',
      ],
      v: vClass,
      n: 'Archaeologists sort objects into two groups. Utilitarian objects serve daily needs, like grinding slabs and cooking pots. Luxuries are made of rare materials or by costly methods, like faience vessels and gold. Luxuries are found mostly in large settlements. Notice that the sorting is the historian\'s own choice of test.',
    }),
    sl('concept', 'Craft production', {
      b: 'Craft workers used **stones, metals, shell, faience and terracotta**. Chanhudaro was almost wholly devoted to crafts.',
      v: vCrafts,
      n: 'Craft workers made beads of carnelian, jasper, crystal, quartz and steatite, tools and ornaments of copper, bronze and gold, bangles of shell, and small vessels of faience and terracotta. Chanhudaro was almost entirely given over to crafts such as bead making, shell cutting, metal working, and making seals and weights.',
    }),
    sl('example', 'Worked example 2: spotting a craft centre', {
      b: 'A site shows heaps of chips, stone drills and half-made beads. What do you conclude, and what do you check?',
      bl: [
        'Step 1 — List the **four traces**: raw material, tools, unfinished objects, waste.',
        'Step 2 — Conclude: a **likely workshop**.',
        'Step 3 — Check: are **finished goods** found elsewhere?',
        'Step 4 — State the limit: who bought the goods is not known.',
      ],
      v: vCraftEv,
      n: 'Craft centres are identified from four traces: raw material, tools, unfinished objects and waste. A site with chips, drills and half made beads is very likely a workshop. Then ask where the finished goods were found, since that shows trade. And remember the limit: the traces show who made the goods, not who bought them.',
    }),
    sl('concept', 'Getting the materials', {
      b: 'Settlements near sources, and **expeditions** to far regions.',
      v: vProcure,
      n: 'Some materials lay close to settlements, such as shell near Nageshwar and Balakot and lapis lazuli near Shortughai. Lothal lay near carnelian sources, and steatite came from south Rajasthan and north Gujarat. For copper, parties went to the Khetri region of Rajasthan, and gold probably came from south India.',
    }),
    sl('concept', 'Beyond the subcontinent', {
      b: 'Mesopotamian texts name **Meluhha**, probably the Harappan region. A Harappan jar was found in **Oman**.',
      v: vDistant,
      n: 'Mesopotamian texts name three distant lands. Dilmun is linked with Bahrain and Magan probably with Oman. Meluhha is thought to be the Harappan region, because the goods listed for it, such as carnelian, lapis lazuli, copper and gold, match Harappan products. A Harappan jar found in Oman and seals showing boats suggest voyages by sea.',
    }),
    sl('check', 'Quick check: a source of lapis lazuli', {
      b: 'Which Harappan settlement lay close to a source of lapis lazuli?',
      chk: 'm_shortughai',
      n: 'It lay far to the north-west of the subcontinent.',
    }),
    sl('example', 'Worked example 3: weighing evidence', {
      b: 'Claim: *Luxury objects show that Harappan society had ranks.* Weigh it.',
      bl: [
        'Step 1 — **For:** luxuries cluster in large settlements; a few graves hold jewellery.',
        'Step 2 — **Against:** digging has been uneven; most graves are plain.',
        'Step 3 — Note that **luxury** is the historian\'s label.',
        'Step 4 — Conclude: some difference is **likely**, ranks are **not proven**.',
      ],
      v: vWeigh,
      n: 'To weigh a claim, set out evidence on both sides. For the claim that luxuries show ranks, we can note that luxuries cluster in large settlements and a few graves hold jewellery. Against it, digging has been uneven and most graves are plain. Finish with a balanced conclusion: some difference is likely, but ranks are not proven.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up Part 1. The Harappan world had Early, Mature and Late phases. People ate wheat, barley and pulses, kept cattle and other animals, and used ploughs, canals and reservoirs. Mohenjodaro was planned, with a Citadel, a Lower Town, standard bricks and drains. Burials and luxuries hint at social differences. Craft centres made goods from materials found near and far.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'The Citadel was **smaller and higher**, to the **west**.',
        'Wheat and barley were staples; rice only **rarely**.',
        'Graves **hint** at difference; do not write that they prove kings.',
        'Identify a craft centre by **four traces**.',
        'Harappan craftspeople did **not** use iron.',
      ],
      v: vTips1,
      n: 'A few tips. The Citadel was smaller and higher, to the west. Wheat and barley were staples and rice was rare. Graves hint at difference but do not prove kings. Remember the four traces of a craft centre. And do not write iron among Harappan materials, because it came into use much later.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Bricks, Beads and Bones — Part 2: Seals, Rulers, Decline and Discovery',
  goals: [
    'Explain the use of seals, script and weights',
    'Present the debate on Harappan authority fairly',
    'Evaluate explanations for the end of the cities',
    'Trace the discovery from Cunningham to Wheeler and read a report as a source',
  ],
  slides: [
    sl('title', 'Seals, Rulers, Decline and Discovery', {
      b: 'Part 2: what **seals, script and weights** show, who may have held **authority**, how the cities ended, and how they were **found**.',
      v: vRoute2,
      n: 'In this part we look at seals, script and weights, which show how goods were marked and measured. We ask who may have held authority, which is a real debate. We examine explanations for the end of the cities, and we follow the discovery from Cunningham to Wheeler. At the end, we practise reading an archaeological report.',
    }),
    sl('concept', 'Seals', {
      b: 'Seals were mostly carved from **steatite**, with **animal motifs and signs**.',
      v: vSeals,
      n: 'Seals were mostly made of steatite, a soft stone that is easy to carve. They show animals and a short row of signs. When pressed into clay, a seal left an impression, which archaeologists call a sealing. Sealings found with cord marks suggest that seals were used to mark goods sent over long distances.',
    }),
    sl('diagram', 'How a sealed bundle worked', {
      v: vSealing,
      n: 'This is the probable sequence. Goods were tied in a bundle with a cord. A lump of clay was fixed on the cord and a seal was pressed into it. The bundle then travelled, and the impression marked the sender and showed that the bundle had not been opened. We infer this from finds, because no Harappan writing explains it.',
    }),
    sl('concept', 'The script', {
      b: 'The script has about **375 to 400 signs**, is **not alphabetic**, and is **undeciphered**.',
      v: vScript,
      n: 'The Harappan script has about three hundred seventy five to four hundred signs, which is too many for one sign to stand for one sound. It is not alphabetic. On seals it is mostly written from right to left. Because it is still undeciphered, we do not know the language or what the messages said.',
    }),
    sl('check', 'Quick check: seal stone', {
      b: 'Most Harappan seals were carved from a soft stone called ___.',
      chk: 'fb_steatite',
      n: 'The stone is soft and easy to carve.',
    }),
    sl('concept', 'Weights', {
      b: 'Weights were of **chert**, usually **cubical**, with no marks. Lower values **doubled**; higher ones were **decimal**.',
      v: vWeights,
      n: 'Weights were made of chert and were usually cubical, with no markings. The lower values doubled each time, as in one, two, four, eight, sixteen and thirty two. The higher values followed a decimal pattern. Such a system suggests careful and consistent measuring, probably in trade and in crafts such as jewellery.',
    }),
    sl('diagram', 'Signs of organisation', {
      v: vOrg,
      n: 'Standard bricks, planned towns, uniform weights and seals on goods all point to organisation over a wide area. That raises a question that the evidence cannot settle easily: who coordinated all this? Planning shows that decisions were made. It does not by itself tell us whether the decision makers were kings, councils or others.',
    }),
    sl('concept', 'Who held authority?', {
      b: 'Three views: **no rulers**, **several rulers**, **one state**. A stone statue called the **priest-king** is a label, not proof.',
      v: vViews,
      n: 'Historians have offered three views. Some say there were no distinct rulers. Others say each major centre had its own ruler. A third view says one state ruled the whole region. No palace or royal burial has been confirmed. The name priest-king, given to a stone statue, is only the archaeologists\' label and does not prove who ruled.',
    }),
    sl('check', 'Quick check: a palace?', {
      b: 'True or false? Excavations have confirmed a palace and a royal burial at Mohenjodaro.',
      chk: 'tf_palace',
      n: 'Think about why the question of rulers is still debated.',
    }),
    sl('example', 'Worked example 1: weighing three views', {
      b: 'Question: *Assess which view of Harappan rule the evidence supports best.*',
      bl: [
        'Step 1 — State the **evidence** of coordination.',
        'Step 2 — Give each **view** with its limit.',
        'Step 3 — Weigh them: which explains **uniformity** best?',
        'Step 4 — Conclude, and say what is **not proven**.',
      ],
      v: vGrid5,
      n: 'For an assessment question, start with the evidence that decisions were made: bricks, planning and weights. Then give each of the three views with its limit. Weigh them by asking which best explains the uniformity over a wide area. End with your judgement and say clearly what is not proven, since the debate remains open.',
    }),
    sl('concept', 'The end of the cities', {
      b: 'By about **1800 BCE** most mature sites in Cholistan and nearby areas were abandoned. Explanations vary; **none is proven**.',
      v: vDecline,
      n: 'By about eighteen hundred BCE most mature sites in regions such as Cholistan were abandoned, and people moved to new settlements in Gujarat, Haryana and western Uttar Pradesh. Explanations include climatic change, deforestation, excessive floods, shifting or drying rivers and overuse of the land. Each has limits, and no single cause is proven.',
    }),
    sl('two-column', 'The invasion idea', {
      cols: [
        '**The old claim:** invaders destroyed the cities, as shown by skeletons at Mohenjodaro.',
        '**The problems:** no layer of destruction across sites; George Dales showed that the skeletons do not show one event.',
      ],
      v: vInvasion,
      n: 'An older view said that invaders destroyed the cities. Skeletons found at Mohenjodaro were cited as proof. But there is no layer of destruction across the sites, and George Dales showed that those skeletons do not point to a single violent event. Most historians now see gradual change, not conquest, as better supported.',
    }),
    sl('check', 'Quick check: reading the layers', {
      b: 'A lower layer has seals and cubical weights; the upper layer has only coarse pottery. How are they dated?',
      chk: 'm_late',
      n: 'Think about which phase had seals and weights.',
    }),
    sl('diagram', 'From Cunningham to the sites of India', {
      v: vDisc,
      n: 'Alexander Cunningham began the Archaeological Survey\'s work in eighteen sixty one and became its first Director-General. He was interested in the Early Historic period and in the accounts of Chinese pilgrims, and he did not grasp the importance of a Harappan seal. Sahni dug at Harappa in nineteen twenty one, Banerji at Mohenjodaro in nineteen twenty two, and Marshall announced the discovery in nineteen twenty four.',
    }),
    sl('concept', 'Marshall and Wheeler', {
      b: 'Marshall dug in **uniform horizontal units**. Wheeler, Director-General from **1944**, followed the **layers**.',
      v: vStrat,
      n: 'John Marshall dug in uniform horizontal units, ignoring the layers of the mounds, which could mix finds of different ages. R. E. M. Wheeler, who became Director-General in nineteen forty four, followed the layers. This is called stratigraphy. After nineteen forty seven many sites were found in India, such as Kalibangan, Lothal, Rakhigarhi and Dholavira.',
    }),
    sl('example', 'Worked example 2: dating by layers', {
      b: 'A trench shows three layers. Date each layer and list the order from oldest to newest.',
      bl: [
        'Step 1 — Note the **finds** in each layer.',
        'Step 2 — Match them to **phases**: seals and weights mean Mature.',
        'Step 3 — Remember: **lower** layers are usually **older**.',
        'Step 4 — Write: Early, Mature, Late.',
      ],
      v: vLayersEx,
      n: 'To date layers, first note what each layer contains. Seals, cubical weights and drilled beads mean the Mature phase. Plain pottery without seals below it suggests the Early phase, and coarse pottery without seals above it suggests the Late phase. Lower layers are usually older, so the order from oldest to newest is Early, Mature, Late.',
    }),
    sl('check', 'Quick check: order of discovery', {
      b: 'Arrange these steps in the discovery of the Harappan civilisation in order.',
      chk: 'ord_discovery',
      n: 'Think of Cunningham, Sahni, Marshall and Wheeler.',
    }),
    sl('example', 'Worked example 3: reading an archaeological report', {
      b: 'A report says: *Room 4 held forty bead blanks, and it was the workshop of a bead-makers\' guild.* Analyse it.',
      bl: [
        'Step 1 — Note **who** wrote it and **when**.',
        'Step 2 — Separate **what was found** (forty blanks) and **where**.',
        'Step 3 — Mark the **inference**: a guild.',
        'Step 4 — State what **cannot be said**: who organised the work.',
      ],
      v: vReport,
      n: 'When reading a report, first note who wrote it and when. Then separate what was found and where from what the author concludes. Forty bead blanks in a room is an observation. A bead makers guild is an inference. Finish by saying what cannot be known from the report, such as who organised the work or who bought the beads.',
    }),
    sl('concept', 'Interpreting objects with care', {
      b: 'Readings such as a **mother goddess** rest on **analogy**. They are not proven.',
      v: vInterp,
      n: 'Archaeologists sometimes read religious meaning into objects. Some female figurines are called mother goddesses, and a seal with a seated figure has been compared with a later god. These readings borrow from later practice and rest on resemblance. Without context such as find spots and associated objects, they remain interpretations, not facts.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. Seals marked goods and the script is undeciphered. Weights followed a doubling then decimal system. Three views of authority exist and none is proven. Most mature sites were abandoned by about eighteen hundred BCE, and no single cause is proven. Cunningham, Sahni, Banerji, Marshall and Wheeler shaped the discovery, and stratigraphy made the record reliable.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Present authority and decline as **debates**.',
        'Do not write that invaders destroyed the cities.',
        'The **priest-king** is a label.',
        '**Marshall:** flat units. **Wheeler:** layers.',
        'In source questions, separate **observation** from **inference**.',
      ],
      v: vTips2,
      n: 'Some tips. Present authority and decline as debates, and do not claim a single proven cause. Do not write that invaders destroyed the cities. Remember that the priest-king is a label. Keep Marshall and Wheeler apart: flat units for Marshall, layers for Wheeler. In source questions, separate what was found from what is inferred.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Bricks, Beads and Bones — Notes',
  sections: [
    {
      h: '1. Phases and subsistence',
      t: 1,
      b: 'The **Mature Harappan** phase lasted from about **2600 to 1900 BCE**. **Early Harappan** cultures came before it and **Late Harappan** cultures followed. The civilisation takes its name from **Harappa**, the first site found.\n\n**Food:** wheat, barley, lentil, chickpea and sesame; millets in Gujarat; rice only rarely. Bones show cattle, sheep, goat, buffalo and pig, with wild animals and fish.\n\n**Farming evidence:** terracotta plough models (Cholistan, Banawali), the ploughed field at Kalibangan with furrows at right angles (perhaps two crops together), canal traces at Shortughai, reservoirs at Dholavira, and wells.',
      terms: [
        ['Subsistence strategy', 'The way a community obtains its food, for example by farming, herding and fishing.'],
        ['Mature Harappan', 'The phase of cities, seals and standard weights, c. 2600 to 1900 BCE.'],
      ],
      v: vPhases,
      vs: [vFood, vWater],
    },
    {
      h: '2. Planning at Mohenjodaro',
      t: 1,
      b: '- **Two parts:** a smaller, higher **Citadel** to the west on mud-brick platforms, and a larger, lower, walled **Lower Town** to the east.\n- **Planned first:** platforms were laid before building, and **covered drains** were laid out before houses.\n- **Bricks:** standard ratio **4:2:1** at sites far apart.\n- **Houses:** around courtyards, no ground-floor windows on the street wall, bathing rooms, wells.\n- **Public structures:** the **Great Bath**, a tank made watertight, and the **warehouse**, once called the granary. Both names carry interpretations.',
      terms: [
        ['Citadel', 'The smaller, higher, western part of a Harappan town, built on platforms.'],
        ['Lower Town', 'The larger, lower part of the town, also walled, where houses stood.'],
      ],
      v: vPlan,
      vs: [vHouse, vPlanned],
    },
    {
      h: '3. Social differences',
      t: 2,
      b: 'Historians look for differences in **burials** and **artefacts**. Most burials are pits, some with pottery and ornaments, and a few with jewellery or a copper mirror. Lavish tombs of rulers have not been found.\n\nArtefacts are sorted into **utilitarian** objects (daily needs, common materials) and **luxuries** (rare materials or costly methods). Luxuries are found mostly in large settlements.\n\n**Cautions:** beliefs about death shape graves; luxury is the historian\'s label; the pattern may reflect where digging was done.',
      terms: [
        ['Utilitarian', 'Serving daily needs, using common materials.'],
        ['Luxury', 'An object of rare material or costly making, not needed for daily life.'],
      ],
      v: vBurial,
      vs: [vClass],
    },
    {
      h: '4. Craft production and procurement',
      t: 2,
      b: '**Materials:** carnelian, jasper, crystal, quartz and steatite; copper, bronze and gold; shell; faience; terracotta. **Chanhudaro** was almost wholly devoted to craft: beads, shell objects, metal-working, seals and weights.\n\n**Identifying a centre:** raw material, tools, unfinished objects and waste.\n\n**Procurement:** settlements near sources (Nageshwar and Balakot for shell, Shortughai for lapis lazuli, Lothal near carnelian); steatite from south Rajasthan and north Gujarat; **expeditions** to the Khetri region for copper and to south India for gold. **Distant lands:** copper from Oman; Mesopotamian texts name Dilmun (Bahrain), Magan and **Meluhha**, probably the Harappan region.',
      terms: [
        ['Faience', 'A material made by firing powdered sand or silica with colouring and a binder.'],
        ['Procurement', 'The ways of obtaining raw materials, near and far.'],
      ],
      v: vCraftEv,
      vs: [vCrafts, vProcure],
    },
    {
      h: '5. Seals, script, weights and authority',
      t: 3,
      b: '**Seals** were mostly of steatite, with animal motifs and signs, and were pressed into clay to mark goods. The **script** has about 375 to 400 signs, is not alphabetic, runs mostly right to left on seals and is **undeciphered**. **Weights** were of chert, usually cubical and unmarked, with doubled lower values and decimal higher ones.\n\n**Authority:** planning and uniformity show complex decisions, but no palace or royal burial is confirmed. Three views: **no rulers**, **several rulers**, **one state**. The statue called the **priest-king** is a label by archaeologists.',
      terms: [
        ['Sealing', 'A lump of clay carrying the impression of a seal.'],
        ['Undeciphered', 'Not yet read, so its language and messages are unknown.'],
      ],
      v: vSealing,
      vs: [vScript, vWeights, vViews],
    },
    {
      h: '6. The end of the civilisation',
      t: 4,
      b: 'By about **1800 BCE** most mature sites in regions such as Cholistan were abandoned, and people spread to new settlements in Gujarat, Haryana and western Uttar Pradesh. In the **Late Harappan** phase seals, writing, standard weights and specialised beads faded and life became more rural.\n\n**Explanations:** climatic change, deforestation, excessive floods, shifting or drying rivers, overuse of the land. **No single cause is proven.** The idea of an **invasion** is not supported: there is no layer of destruction, and George Dales showed that the Mohenjodaro skeletons do not show a single massacre.',
      terms: [
        ['Late Harappan', 'The phase after c. 1900 BCE, with no seals, standard weights or script.'],
        ['Stratigraphy', 'Digging and recording layer by layer, so that finds keep their order and context.'],
      ],
      v: vDecline,
      vs: [vInvasion],
    },
    {
      h: '7. Discovery, interpretation and sources',
      t: [4, 5],
      b: '**Alexander Cunningham** began work for the Survey in 1861 and later became its first Director-General; he was interested in the Early Historic period and in Chinese pilgrims\' accounts; a Harappan seal given to him was not understood. **Daya Ram Sahni** found seals at Harappa (1921), **Rakhal Das Banerji** at Mohenjodaro (1922), and **John Marshall** announced a new civilisation in 1924. Marshall dug in uniform horizontal units; **R. E. M. Wheeler** (Director-General from 1944) followed the layers. After 1947 many sites were found in India, such as Kalibangan, Lothal, Rakhigarhi and Dholavira.\n\n**Interpretation:** readings such as a mother goddess rest on analogy and need context.\n\n**Reading a report:** note author and date, separate observation from inference, and say what cannot be concluded.',
      terms: [
        ['Context', 'Where and with what an object was found; it tells how the object was used.'],
        ['Inference', 'A conclusion drawn from evidence, as distinct from what was directly observed.'],
      ],
      v: vDisc,
      vs: [vStrat, vReport, vInterp],
    },
  ],
  tips: '**Common mistakes**\n- Writing that the Citadel was lower, or placing it to the east.\n- Naming rice as the staple or iron among Harappan materials.\n- Treating the **priest-king** or a **mother goddess** as proven.\n- Giving a single cause for the end of the cities, or writing that invaders destroyed them.\n- Mixing up Marshall (flat units) and Wheeler (layers).\n- In source questions, copying a sentence when asked to explain, or stating an inference as a fact.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a point and a reason (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); assessment questions need evidence on both sides and a judgement.\n- Source questions (4 marks): part (a) and (b) one mark each, part (c) two marks with an internal choice.\n\n**Sources in SOYL practice** are imagined documents or SOYL summaries written for practice; the board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Dates of the Mature Harappan phase', '**c. 2600 to 1900 BCE**.', 'fact', 1],
  ['Why is it called the Harappan civilisation?', 'After **Harappa**, the first site discovered.', 'fact', 1],
  ['Main Harappan crops', 'Wheat, barley, lentil, chickpea, sesame; millets in Gujarat; rice rarely.', 'fact', 1],
  ['Animals found as bones', 'Cattle, sheep, goat, buffalo, pig; also wild animals and fish.', 'fact', 1],
  ['Evidence of ploughing', '**Terracotta plough models** (Cholistan, Banawali); ploughed field at **Kalibangan**.', 'fact', 1],
  ['Kalibangan furrows', 'Two sets at **right angles**: perhaps two crops grown together.', 'concept', 1],
  ['Water management evidence', 'Canal traces at **Shortughai**; reservoirs at **Dholavira**; wells.', 'fact', 1],
  ['**Citadel**', 'Smaller, higher, to the **west**, on mud-brick platforms.', 'definition', 1],
  ['**Lower Town**', 'Larger, lower, to the east, also walled; houses.', 'definition', 1],
  ['Sign that Mohenjodaro was planned', '**Platforms laid first** and drains planned before houses.', 'concept', 1],
  ['Brick ratio', 'Length to breadth to height **4:2:1**.', 'fact', 1],
  ['Why no windows on street walls?', 'Houses faced a **courtyard**: privacy (an interpretation).', 'concept', 1],
  ['Great Bath', 'Watertight tank with steps on the Citadel; ritual use is an interpretation.', 'concept', 1],
  ['Warehouse', 'Large Citadel building once called the **granary**; contents uncertain.', 'fact', 1],
  ['Burials: what to say', 'Hint at **some differences**; no royal tombs; goods not proof of rank.', 'exam-tip', 2],
  ['**Utilitarian** vs **luxury**', 'Daily need, common material vs rare material or costly method.', 'definition', 2],
  ['**Faience**', 'Made by firing powdered sand or silica with colour and binder.', 'definition', 2],
  ['Craft centre example', '**Chanhudaro**: beads, shell, metal, seals, weights.', 'fact', 2],
  ['Four traces of a craft centre', 'Raw material, tools, unfinished objects, **waste**.', 'concept', 2],
  ['Shell sources', '**Nageshwar** and **Balakot**.', 'fact', 2],
  ['Lapis lazuli source', 'Near **Shortughai**, in Afghanistan.', 'fact', 2],
  ['Copper and gold', 'Copper: **Khetri** region (and Oman); gold: probably south India.', 'fact', 2],
  ['**Meluhha**', 'Name in Mesopotamian texts, probably the **Harappan region**.', 'definition', 2],
  ['Material not used', '**Iron** (copper, bronze and gold were).', 'exam-tip', 2],
  ['Harappan seals', 'Mostly **steatite**; animal motifs and signs; mark goods.', 'fact', 3],
  ['The script', '**375 to 400 signs**; not alphabetic; right to left; undeciphered.', 'fact', 3],
  ['Weights', '**Chert**, cubical, unmarked; doubled lower values, decimal higher.', 'fact', 3],
  ['Three views of authority', 'No rulers; several rulers; one state.', 'concept', 3],
  ['Priest-king', 'An archaeologists\' **label** for a statue; not proof of who ruled.', 'exam-tip', 3],
  ['Late Harappan features', 'Loss of seals, script, weights, specialised beads; rural life.', 'fact', 4],
  ['Explanations for the end', 'Climate change, deforestation, floods, shifting rivers, overuse of land: **none proven**.', 'concept', 4],
  ['Cunningham and Marshall/Wheeler', 'Cunningham: first Director-General; Marshall: flat units; Wheeler: **layers** (stratigraphy).', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-history-chapter-test-short',
  title: 'Chapter test (short) — Bricks, Beads and Bones',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_planning', 'm_priest_king', 'm_wheeler', 'ar_burial'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_drains', 's_late', 's3_procure'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_craft', 'l_discovery'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_seal'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-history-chapter-test-long',
  title: 'Chapter test (long) — Bricks, Beads and Bones',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_crops', 'm_kalibangan', 'm_materials', 'm_identify', 'm_script_dir', 'm_weights', 'm_cunningham', 'm_mother', 'ar_chanhudaro', 'ar_decline'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_citadel', 's_seals', { attempt: 1, keys: ['s_marshall', 's_luxury'] }, 's3_subsistence', { attempt: 1, keys: ['s3_social', 's3_invasion'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_planning', { attempt: 1, keys: ['l_authority', 'l_decline'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_diary', 'sb_end'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-history-ch01 only (subsistence and mature Harappan settlements; social differences, craft production and procurement; seals, script, weights and authority; the end and the discovery; source-based practice)',
    originality: 'every source is an imagined document or a SOYL summary, labelled as such; no NCERT text, source box, caption, map or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    facts: `Mature Harappan c. 2600–1900 BCE; ${DISCOVERY.map(([y, t]) => `${y} ${t.replace(' | ', ' ')}`).join('; ')}; brick ratio 4:2:1; script about 375–400 signs, right to left, undeciphered; most mature sites abandoned by about 1800 BCE; no single cause stated as proven; no maps (OA-23)`,
    neutrality: 'authority, religious readings and the end of the cities presented as debates; the invasion idea described as unsupported without being asserted as disproved in detail',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
