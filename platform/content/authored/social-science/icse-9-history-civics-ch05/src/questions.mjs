// ICSE 9 History & Civics, ch05 The Harappan Civilisation — question bank.
// Every museum, excavation diary, letter, newspaper report and site below is imagined by SOYL and labelled as imagined;
// no textbook text, box or exercise and no specimen or board-paper item is reused (D-036); no scholar or person is
// quoted. Dates are approximate and given as "about" (books differ). Debated readings of artefacts (the Pashupati seal,
// the priest-king label, the Lothal dockyard, the Mohenjo-daro great granary, causes of decline) are always presented
// as interpretations: "some scholars ... others ...". Pictures are SOYL's own schematic SVGs; no artefact is reproduced.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- shared figures
/** Dated landmarks as signed years (negative = BCE); the order is asserted. */
export const TIMELINE = [
  [-2600, 'About 2600 BCE', 'Mature cities', 'flourish'],
  [-1900, 'About 1900 BCE', 'Decline', 'begins'],
  [1921, '1921', 'Harappa dug', '(Daya Ram Sahni)'],
  [1922, '1922', 'Mohenjo-daro dug', '(R. D. Banerji)'],
];
assert.deepEqual(TIMELINE.map((e) => e[0]), [...TIMELINE.map((e) => e[0])].sort((a, b) => a - b));
assert.equal(1922 - 1921, 1);
assert.equal(2600 - 1900, 700); // the commonly quoted span of the mature phase, "about 700 years"

/** Even-spaced (not to scale) timeline. */
export function timelineFigure(alt, caption) {
  const s = new Svg(720, 200);
  const n = TIMELINE.length;
  const gap = 600 / (n - 1);
  s.arrow(30, 80, 700, 80, { sw: 1.8 });
  TIMELINE.forEach(([, year, a, b], i) => {
    const x = 70 + i * gap;
    s.dot(x, 80, 6, 'accent');
    s.text(x, 52, year, { size: 14, bold: true });
    s.text(x, 108, a, { size: 12 });
    s.text(x, 126, b, { size: 12 });
  });
  s.text(360, 156, 'Some books give about 2500 to 1750 BCE for the same civilisation', { size: 12 });
  s.text(360, 182, 'Schematic, not to scale', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Schematic map: sites placed by approximate longitude and latitude, then drawn schematically (no borders). */
export const SITES = [
  ['Harappa', 72.9, 30.6],
  ['Mohenjo-daro', 68.1, 27.3],
  ['Chanhudaro', 68.3, 26.2],
  ['Ropar', 76.5, 31.0],
  ['Kalibangan', 74.1, 29.5],
  ['Banawali', 75.4, 29.6],
  ['Rakhigarhi', 76.1, 29.3],
  ['Dholavira', 70.2, 23.9],
  ['Lothal', 72.25, 22.5],
];
assert.equal(SITES.length, 9);
export function mapFigure(alt, caption) {
  const s = new Svg(720, 380);
  const X = (lon) => 40 + (lon - 66) * 53.3;
  const Y = (lat) => 20 + (34.5 - lat) * 25.6;
  s.rect(10, 8, 700, 364, { rx: 10, color: 'muted', sw: 1 });
  s.polyline([[73.8, 34.3], [72.0, 32.5], [71.0, 30.0], [69.5, 28.0], [68.3, 27.0], [67.7, 25.0], [67.8, 23.2]].map(([lo, la]) => [X(lo), Y(la)]), { sw: 3, color: 'accent' });
  s.polyline([[77.0, 30.2], [75.5, 29.4], [74.1, 29.3], [72.5, 28.2], [70.8, 26.8], [69.3, 24.8]].map(([lo, la]) => [X(lo), Y(la)]), { sw: 2, color: 'muted', dash: true });
  const place = {
    Harappa: ['start', 12, -4],
    'Mohenjo-daro': ['end', -10, -4],
    Chanhudaro: ['start', 10, 8],
    Ropar: ['middle', 0, -16],
    Kalibangan: ['middle', -4, 18],
    Banawali: ['middle', 0, -18],
    Rakhigarhi: ['middle', 14, 20],
    Dholavira: ['start', 10, 0],
    Lothal: ['start', 10, 0],
  };
  SITES.forEach(([name, lo, la]) => {
    const [anchor, dx, dy] = place[name];
    s.dot(X(lo), Y(la), 5, 'accent');
    s.text(X(lo) + dx, Y(la) + dy, name, { size: 12, anchor });
  });
  s.line(500, 300, 540, 300, { sw: 3, color: 'accent' });
  s.text(548, 300, 'Indus (schematic)', { size: 12, anchor: 'start' });
  s.line(500, 326, 540, 326, { sw: 2, color: 'muted', dash: true });
  s.text(548, 326, 'Old Ghaggar-Hakra bed', { size: 12, anchor: 'start' });
  s.text(160, 354, 'Schematic, not to scale; positions approximate', { size: 11, muted: true, anchor: 'start' });
  return s.visual(alt, caption);
}

/** Citadel on a raised western mound and a gridded lower town to the east (schematic). */
export function townFigure(alt, caption) {
  const s = new Svg(720, 270);
  s.rect(20, 30, 180, 180, { rx: 10, fill: 'accent', fillOpacity: 0.15, color: 'accent', sw: 1.8 });
  s.text(110, 62, 'Citadel', { size: 16, bold: true });
  s.text(110, 92, 'raised mound', { size: 12 });
  s.text(110, 114, 'west side', { size: 12 });
  s.text(110, 150, 'public buildings', { size: 12 });
  s.text(110, 172, 'such as a bath', { size: 12 });
  s.rect(230, 30, 470, 180, { rx: 10, fill: 'muted', fillOpacity: 0.1, color: 'muted', sw: 1.6 });
  [355, 575].forEach((x) => s.line(x, 30, x, 210, { sw: 6, color: 'muted' }));
  s.line(230, 120, 700, 120, { sw: 6, color: 'muted' });
  [[292, 75], [465, 75], [637, 75], [292, 165], [465, 165], [637, 165]].forEach(([x, y]) => s.text(x, y, 'House block', { size: 12 }));
  s.text(465, 20, 'Lower town', { size: 14, bold: true });
  s.text(465, 236, 'Streets cross at right angles', { size: 12 });
  s.text(110, 236, 'Citadel and lower town', { size: 12, muted: true });
  s.text(640, 258, 'Schematic, not to scale', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Plan of the Great Bath (schematic). */
export function bathFigure(alt, caption) {
  const s = new Svg(720, 230);
  s.rect(180, 30, 360, 160, { rx: 6, color: 'muted', sw: 1.6, dash: true });
  s.text(360, 50, 'Corridor and rooms around the tank', { size: 12 });
  s.rect(250, 70, 220, 90, { rx: 4, fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  [258, 266, 274].forEach((x) => s.line(x, 72, x, 158, { sw: 1, color: 'accent' }));
  [446, 454, 462].forEach((x) => s.line(x, 72, x, 158, { sw: 1, color: 'accent' }));
  s.text(360, 108, 'Brick tank', { size: 14, bold: true });
  s.text(360, 132, 'sealed with natural tar', { size: 12 });
  s.text(214, 115, 'Steps', { size: 12 });
  s.text(506, 115, 'Steps', { size: 12 });
  s.text(360, 212, 'Schematic plan, not to scale', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** House blocks, a lane, a main street and the covered drains (schematic). */
export function gridFigure(alt, caption) {
  const s = new Svg(720, 300);
  [[40, 25], [450, 25], [40, 170], [450, 170]].forEach(([x, y], i) => {
    s.rect(x, y, 230, 95, { rx: 4, fill: 'muted', fillOpacity: 0.1, color: 'muted', sw: 1.6 });
    s.rect(x + 70, y + 30, 90, 40, { rx: 3, color: 'accent', sw: 1.4 });
    s.text(x + 115, y + 50, 'Courtyard', { size: 12 });
    s.text(x + 115, y + 14, i === 0 ? 'House' : 'House', { size: 12 });
  });
  s.line(290, 10, 290, 120, { sw: 1.4, color: 'muted' });
  s.line(430, 10, 430, 120, { sw: 1.4, color: 'muted' });
  s.line(290, 175, 290, 290, { sw: 1.4, color: 'muted' });
  s.line(430, 175, 430, 290, { sw: 1.4, color: 'muted' });
  s.text(360, 65, 'Lane', { size: 13 });
  s.text(360, 235, 'Lane', { size: 13 });
  s.line(20, 127, 700, 127, { sw: 2.4, color: 'accent', dash: true });
  s.line(20, 163, 700, 163, { sw: 2.4, color: 'accent', dash: true });
  s.text(150, 145, 'Main street', { size: 13, bold: true });
  s.text(540, 145, 'Covered drains on both edges', { size: 12 });
  s.text(640, 290, 'Schematic, not to scale', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Sources: Great Bath, Citadel, dockyard, granaries
Q('m_md_dig', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Excavation at Mohenjo-daro began in 1922. Which archaeologist is associated with it?',
  opts: ['R. D. Banerji', 'Daya Ram Sahni', 'John Marshall, as the digger on the ground', 'A British engineer building a railway'],
  sol: 'R. D. Banerji began the Mohenjo-daro excavation in 1922. Daya Ram Sahni is linked with Harappa, which was dug from 1921. John Marshall was Director-General of the Archaeological Survey and directed the work as a whole rather than digging at the site, and a railway engineer is not an excavator of the site.',
}));
Q('m_citadel_loc', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'In a large Harappan town such as Mohenjo-daro, where was the Citadel usually found?',
  opts: ['On a raised mound on the western side of the town', 'On low ground on the eastern side', 'Inside the largest house of the lower town', 'Outside the town, across a river'],
  sol: 'The Citadel stood on a raised mound, usually on the western side, with the larger lower town spread to the east. It was not on low ground, not inside one house and not outside the town.',
}));
Q('m_bath_features', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which description fits the Great Bath of Mohenjo-daro?',
  opts: [
    'A large watertight brick tank with steps at both ends',
    'A roofed hall with rows of pillars for storing grain',
    'A brick basin joined to a channel, used to berth boats',
    'A burial ground outside the town',
  ],
  sol: 'The Great Bath was a large brick tank made watertight, with steps leading down at two ends. The hall of pillars describes a granary-like store, the basin for boats describes the Lothal structure, and it was not a burial ground.',
}));
Q('m_bath_infer', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why do many scholars regard the Great Bath as a public structure of special importance?',
  opts: [
    'Its size, careful waterproofing and place on the Citadel suggest community use, possibly ritual bathing',
    'Inscriptions on its walls state that it was a temple',
    'It was the only building made of burnt brick in the town',
    'It was found outside the town and far from the houses',
  ],
  sol: 'Scholars infer its importance from its size, its waterproofing and its position on the Citadel; the idea of ritual bathing is an interpretation. No readable inscription on it says it was a temple because the script cannot be read, burnt bricks were used all over the town, and the tank stood on the Citadel, not outside the town.',
}));
Q('m_dig_tank', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined excavation diary from the mound of Sandhya Kheda records a large rectangular brick tank with steps at both ends, a layer of natural tar between the bricks and the earth, and a corridor around it, all on a raised mound. Which conclusion is best supported?',
  opts: [
    'It resembles the Great Bath, though its exact purpose, perhaps ritual bathing, remains an interpretation',
    'It proves that the site was ruled by one emperor',
    'It was certainly a granary because it is made of brick',
    'It was a dockyard because it can hold water',
  ],
  sol: 'The features match the Great Bath, but a purpose such as ritual bathing is only an interpretation. The diary does not show a ruler, brick alone does not make a granary, and holding water does not make a structure a dockyard.',
}));
Q('m_dock_debate', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Many books call the large brick basin at Lothal a dockyard, but some scholars suggest it may have been a water reservoir. What does this disagreement mainly show?',
  opts: [
    'Remains can be read in more than one way, so historians weigh evidence before concluding',
    'Lothal had no connection with trade at all',
    'The basin was built after the civilisation ended',
    'Every structure at Lothal was a granary',
  ],
  sol: 'When experts differ, it shows that physical remains do not explain themselves and need careful weighing of evidence. The disagreement does not prove that Lothal lacked trade, does not date the basin, and does not make every building a granary.',
}));
Q('m_granary_debate', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'At Mohenjo-daro a large brick platform on the Citadel has long been called the great granary, but some scholars question that name. Which statement reflects a careful historian\'s view?',
  opts: [
    'The name is an interpretation, and storage remains are needed to support it',
    'The name must be correct because it appears in many books',
    'It must have been a palace because it stands on the Citadel',
    'Since it cannot be proved, the platform never existed',
  ],
  sol: 'A label is an interpretation until evidence supports it, so historians look for storage remains. Repetition in books is not proof, a palace is also only a guess, and a doubtful name does not make the physical platform disappear.',
}));
Q('fb_citadel', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The raised mound that held important buildings in Harappan towns is called the ___.',
  acc: [['Citadel', 'citadel']],
  sol: 'It is called the Citadel and was usually on the western side of the town.',
}));
Q('fb_dock', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The large brick basin at Lothal in Gujarat is described by many scholars as a ___.',
  acc: [['dockyard', 'dock', 'a dockyard']],
  sol: 'Many scholars call it a dockyard, although some suggest other uses.',
}));
Q('tf_bath_certain', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Scholars have proved from written records that the Great Bath was used only for religious bathing.',
  sol: 'No written record that we can read explains the Great Bath. Ritual bathing is a view held by many scholars, not a proven fact.',
}));
Q('ar_bath', ar({
  t: 1, d: 2, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Great Bath of Mohenjo-daro is regarded as a public structure.',
  r: 'It stood in the lower town among the ordinary houses.',
  sol: 'A is true: its size and care suggest community use. R is false: it stood on the Citadel, not in the lower town.',
}));
Q('s_citadel', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What was the Citadel of a Harappan town, and where was it usually placed?',
  model: 'The **Citadel** was a **raised mound** that carried important public buildings, such as the Great Bath at Mohenjo-daro. It was usually on the **western side** of the town, above the larger lower town.',
  sol: 'Meaning and position.',
  scheme: [['Raised mound with important buildings', 1], ['Western side, above the lower town', 1]],
}));
Q('s_bath_features', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined museum model labelled the Citadel of Mohenjo-daro shows a large brick tank with a corridor around it. State two more features that would let a visitor identify it as the Great Bath.',
  model: '1. It was a large **brick tank** made **watertight** with a lining of natural tar.\n2. It had **steps** at both ends and a **corridor** around it, and stood on the **Citadel**.',
  sol: 'Any two features.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_dock_caution', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why do historians speak of the Lothal basin as a probable dockyard rather than a certain one?',
  model: 'Some scholars read the brick basin as a **dock** linked to sea trade, but others suggest a **water reservoir**. Since no readable record explains it, the use is an **interpretation** that must be weighed.',
  sol: 'Two readings, therefore an interpretation.',
  scheme: [['Different views: dock and reservoir', 1], ['No readable record, so an interpretation', 1]],
}));
Q('s3_structures', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name three important structures of the Harappan Civilisation and state what each tells us.',
  model: '1. The **Great Bath** suggests skill in brick building and perhaps shared **ritual bathing**.\n2. The **granaries** suggest that **grain** was collected and stored.\n3. The **dockyard at Lothal**, if it was one, suggests **sea trade**; some scholars question this.',
  sol: 'Three structures, each linked to what it shows.',
  scheme: [['Great Bath with inference', 1], ['Granaries with inference', 1], ['Dockyard with inference', 1]],
}));
Q('s3_dock_scen', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'A team digging the imagined mound of Karnai finds a large brick basin beside a dry channel. Give two reasons it may be a dock and one reason for caution.',
  model: '1. Its **size** and brick lining resemble the **Lothal** basin that many call a dockyard.\n2. It lies beside a **channel** that boats may once have used.\n3. **Caution:** it could also be a **reservoir**, and no readable record names its purpose.',
  sol: 'Two supporting reasons and one caution.',
  scheme: [['First reason for a dock', 1], ['Second reason for a dock', 1], ['One reason for caution', 1]],
}));

// ================================================================ t02 Sources: seals, bearded man, dancing girl, script
Q('m_seal_material', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Most Harappan seals were carved from which material?',
  opts: ['Steatite, a soft stone', 'Iron', 'Glass', 'Marble'],
  sol: 'Most seals were carved from steatite, a soft stone that is easy to cut and polish. Iron was not used by the Harappans, glass is not the usual material and marble is not typical.',
}));
Q('m_seal_purpose', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In an imagined Harappan town, a trader presses a small square seal into a lump of clay that holds a bundle of goods shut. What would this most likely achieve?',
  opts: [
    'It would mark the bundle as his and show it had not been opened',
    'It would record the price in a script we can read today',
    'It would pay the town\'s tax to a ruler',
    'It would write the date of the journey',
  ],
  sol: 'Seals were pressed into clay to mark ownership and to guard goods, which is why they are linked with trade. The signs cannot be read today, so a readable price is not the reason; taxes and dates are not shown by this use.',
}));
Q('m_seal_mesopotamia', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At the imagined Mesopotamian city of Urnashar, excavators find a small square seal showing an animal and signs in the Indus style. What is the most reasonable conclusion?',
  opts: [
    'There was contact, probably trade, between Mesopotamia and the Indus region',
    'Mesopotamians invented the Harappan script',
    'Harappan armies once ruled Urnashar',
    'The two regions spoke exactly the same language',
  ],
  sol: 'An Indus-style seal found far away points to contact, most probably trade. It does not show who invented the script, any conquest, or a shared language.',
}));
Q('m_pashupati', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'One seal shows a seated figure with a horned headdress, surrounded by animals. Some scholars see an early form of a later god; others disagree. How should a student treat this reading?',
  opts: [
    'As one possible interpretation that cannot be confirmed while the script is unread',
    'As proof that the Harappans worshipped a god known later',
    'As proof that the Harappans had no religion',
    'As a map of the city',
  ],
  sol: 'The reading is an interpretation: since the script cannot be read, no text confirms it. It is not proof of later worship, it does not show an absence of religion, and the picture is not a map.',
}));
Q('m_priest_label', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'A stone sculpture of a bearded man, found at Mohenjo-daro, is often called the priest-king. Why do careful historians say this label is modern?',
  opts: [
    'No readable record says who he was; the name was given by modern scholars as a guess',
    'The sculpture itself was made in modern times',
    'It shows a king of a later dynasty',
    'The script on it names him as a priest',
  ],
  sol: 'Nobody can read a Harappan text that names him, so the title is a modern guess. The sculpture is ancient, it is not from a later dynasty, and the script cannot be read.',
}));
Q('m_dancer_art', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The small bronze figure of a young woman from Mohenjo-daro, popularly called the dancing girl, is valued by historians mainly because it shows',
  opts: [
    'skill in metal casting by the lost-wax method and a lively sense of art',
    'that the Harappans used iron weapons',
    'that every woman danced in temples',
    'the readable name of the artist',
  ],
  sol: 'The figure shows the Harappans could cast bronze by the lost-wax method and could model a graceful figure. It does not show iron, a custom of temple dancing, or a name, because the script cannot be read.',
}));
Q('m_script_dir', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In which direction were most Harappan inscriptions written?',
  opts: ['Mostly from right to left', 'Always from left to right', 'From top to bottom in one column', 'In a spiral from the centre'],
  sol: 'Most inscriptions seem to run from right to left. They are not always left to right, in single downward columns, or in spirals.',
}));
Q('m_script_limit', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which statement explains why the script limits what we know about the Harappans?',
  opts: [
    'It has not been deciphered, so we cannot read what they wrote about rulers, beliefs or laws',
    'It has only five signs and says very little',
    'It was copied from Mesopotamian writing and adds nothing new',
    'It has been fully read, but the records were lost',
  ],
  sol: 'The script, with about four hundred signs, is still undeciphered, so we must depend mainly on archaeology. It does not have only five signs, it was not copied from Mesopotamia, and it has not been fully read.',
}));
Q('m_script_scen', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined Ratnapur Herald reports the discovery of the longest known Harappan inscription, of forty signs, and a student says it will at once reveal the names of Harappan kings. Which reply is most accurate?',
  opts: [
    'A longer text helps study sign patterns, but it cannot be read until the script is deciphered',
    'Correct, because every inscription gives names',
    'Wrong, because the Harappans had no writing at all',
    'Wrong, because inscriptions appear only on pottery',
  ],
  sol: 'More text gives scholars more patterns to study, but without a decipherment, or a bilingual text, it cannot be read. The Harappans did have writing, and inscriptions appear on seals as well as other objects.',
}));
Q('fb_script', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The Harappan script has about 400 signs and is still ___, so we depend largely on archaeology.',
  acc: [['undeciphered', 'not deciphered', 'unread']],
  sol: 'It is undeciphered, so no one can yet read what it says.',
}));
Q('fb_lostwax', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'The bronze figure of the young woman from Mohenjo-daro was made by the ___ method of casting.',
  acc: [['lost-wax', 'lost wax']],
  sol: 'The figure was cast by the lost-wax method.',
}));
Q('tf_bearded', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Written records tell us for certain that the bearded stone figure from Mohenjo-daro was a priest-king.',
  sol: 'No readable record names him. Priest-king is a modern label given by scholars as a guess.',
}));
Q('ar_script', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Scholars have fully understood the messages on Harappan seals.',
  r: 'The Harappan script, with about 400 signs, has not been deciphered.',
  sol: 'A is false: the seals cannot be read. R is true: the script is undeciphered.',
}));
Q('mt_sources', match({
  t: [1, 2], d: 2, c: 'understanding', marks: 2,
  stem: 'Match each Harappan source with what it is thought to show.',
  pairs: [
    ['Great Bath', 'A watertight brick tank, possibly for ritual bathing'],
    ['Basin at Lothal', 'A probable dockyard linked to sea trade'],
    ['Steatite seals', 'Stamps with animals and signs, used in trade'],
    ['Bronze figure of a young woman', 'Metal casting by the lost-wax method'],
  ],
  sol: 'The Great Bath is a tank, the Lothal basin a probable dockyard, seals were stamps used in trade, and the bronze figure shows lost-wax casting.',
}));
Q('s_seal_info', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Excavators at the imagined mound of Dholakot find a clay lump bearing the impression of a square steatite seal with an animal. State two things historians can learn from seals like it.',
  model: '1. Seals pressed on clay show that **trade** was carefully organised, since goods were marked.\n2. Their animal figures and scenes give hints about **religious beliefs**, and seals found in Mesopotamia show **overseas contact**.',
  sol: 'Any two points.',
  scheme: [['First point', 1], ['Second point', 1]],
}));
Q('s_script_limit', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'A notice at the imagined Lokmanya School claims that Class IX has read a Harappan seal and found the name of a king. Give two reasons why a historian would be cautious.',
  model: 'The script, with about **400 signs**, has **not been deciphered**, so no one can read a seal and name a king. Scholars must depend on **archaeological remains**, whose meaning is often **debated**, so such a claim needs strong proof.',
  sol: 'Undeciphered, so claims need proof.',
  scheme: [['Script not deciphered, so nothing can be read', 1], ['Reliance on debated remains; claim needs proof', 1]],
}));
Q('s_bearded_label', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the bearded man sculpture of Mohenjo-daro and say why the name priest-king is only a modern label.',
  model: 'It is a **stone sculpture** of a **bearded man** with a headband and a shawl over one shoulder. The name **priest-king** was given by **modern scholars**; no readable record tells who he was.',
  sol: 'Description and the reason for caution.',
  scheme: [['Description of the sculpture', 1], ['Modern label, no record of identity', 1]],
}));
Q('s3_seals', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the importance of Harappan seals as a source of information on trade and religion.',
  model: '1. Seals were pressed into **clay** on goods, which shows **trade** and the marking of ownership.\n2. Seals found in **Mesopotamia** show **contact** with distant lands.\n3. Animals and a seated figure on some seals hint at **religious ideas**, but such readings are **interpretations** because the script is unread.',
  sol: 'Trade, overseas contact and religion with caution.',
  scheme: [['Trade and marking of goods', 1], ['Overseas contact', 1], ['Religion, with caution', 1]],
}));
Q('s3_art', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe the bearded man and the dancing girl and say what each reveals about Harappan art.',
  model: '1. The **bearded man** is a carved **stone sculpture** with a shawl, showing skill in carving.\n2. The **dancing girl** is a small **bronze** figure of a young woman, showing the **lost-wax** casting method.\n3. Together they show that Harappan artists could model the **human figure** with skill.',
  sol: 'Each figure described, with what it reveals.',
  scheme: [['Bearded man with what it shows', 1], ['Bronze figure with what it shows', 1], ['Conclusion about Harappan art', 1]],
}));

// ================================================================ t03 Urban planning
Q('m_grid', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A model-maker at the imagined Rajtilak Museum must build a Harappan town in miniature, and wants the streets to match the real pattern. Which layout should she choose?',
  opts: [
    'Streets that cross at right angles and divide the town into blocks',
    'Winding lanes with no plan',
    'One circular road around the town',
    'Scattered houses without any roads',
  ],
  sol: 'Harappan streets crossed one another at right angles to form a grid of blocks. The other layouts are unplanned or circular and do not match the evidence.',
}));
Q('m_brick_ratio', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A model-maker at the imagined Rajtilak Museum casts miniature bricks that are 5 cm thick and wants them to keep the usual Harappan proportion of thickness, width and length. How long should each brick be?',
  opts: ['20 cm', '10 cm', '15 cm', '45 cm'],
  sol: 'The usual proportion is about 1 : 2 : 4, so a thickness of 5 cm gives a width of about 10 cm and a length of about 20 cm. A length of 10 cm would be the width, 15 cm fits no ratio and 45 cm follows a 1 : 3 : 9 pattern.',
}));
Q('m_drain_inspect', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined excavator at Kothari Mound uncovers a street drain roofed with brick slabs, with openings at intervals. What was the most likely purpose of the openings?',
  opts: [
    'To allow the drain to be inspected and cleaned',
    'To let boats enter the town',
    'To store grain safely',
    'To pour religious offerings',
  ],
  sol: 'Openings in a covered drain allow workers to inspect and clear blockages, as in other Harappan drains. Boats, grain storage and offerings have no link with a roofed drain.',
}));
Q('m_planning_infer', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'Some historians argue that a regular grid and standard bricks suggest planning by an organised authority. Which caution should a student add?',
  opts: [
    'We cannot read Harappan records, so the nature of that authority remains uncertain',
    'Only foreign architects could have planned such towns',
    'Grids are found only in modern cities',
    'A planned town never needs any authority',
  ],
  sol: 'With the script unread, nothing tells us who planned the towns or how, so the claim stays an inference. The other options contradict the evidence or are simply untrue.',
}));
Q('ord_drain', ord({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Arrange the path of used water in a Harappan town in the correct order.',
  items: [
    'Used in the bathroom of a house',
    'Flows through a small channel in the house wall',
    'Enters the covered drain running along the street',
    'Is carried along the drain away from the houses',
  ],
  sol: 'Water was used in the bathroom, passed through a small channel, entered the covered street drain and was carried away from the houses.',
}));
Q('ar_weights_drains', ar({
  t: [3, 4], d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Harappan towns used standard cubical weights.',
  r: 'Harappan houses were joined to covered drains in the streets.',
  sol: 'Both are true. The drains do not explain why standard weights were used, so R is not the explanation of A.',
}));
Q('s_grid_street', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'A town planner in the imagined town of Meghpur wants to copy Harappan street planning. Describe the layout she should draw.',
  model: 'The streets were laid out in a **grid**: main roads ran **north to south and east to west** and crossed at **right angles**. They divided the town into **blocks** of houses, and narrower lanes ran between the houses.',
  sol: 'Grid, right angles, blocks and lanes.',
  scheme: [['Grid with roads crossing at right angles', 1], ['Blocks of houses with lanes', 1]],
}));
Q('s_drain_work', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined engineer at Mound Seven finds channels from bathrooms joining a roofed street drain with openings. Explain how this system worked.',
  model: 'Waste water from the **bathrooms** of houses flowed through small channels into **covered drains** along the streets. The drains had **openings** for cleaning and carried the water away from the town.',
  sol: 'House channels, covered street drains, openings.',
  scheme: [['House channels joined street drains', 1], ['Covered, with openings for cleaning', 1]],
}));
Q('s_diary_inference', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined excavator writes that the bricks at Mound Zero in three villages have the same proportion. State what this suggests and one caution.',
  model: 'It suggests a **common standard** of brick-making, which fits the idea of **planned building** across the region. **Caution:** it does not tell us who set the standard, since the script cannot be read.',
  sol: 'A standard, with a caution.',
  scheme: [['Common standard of building', 1], ['Caution: cause unknown', 1]],
}));
Q('s3_planning', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Describe any three features of Harappan town planning.',
  model: '1. A **grid** of streets crossing at **right angles**.\n2. **Burnt bricks** of a standard proportion, about 1 : 2 : 4, and houses with **courtyards**, wells and bathrooms.\n3. A **covered drainage system** with openings for cleaning, and bins or soak pits for waste.',
  sol: 'Any three features.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));

// ================================================================ t04 Trade, art and craft
Q('m_weights', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'The weights found at many Harappan sites were mostly',
  opts: ['small cubes of stone such as chert', 'round discs of iron', 'thin sheets of gold', 'rods of wood'],
  sol: 'Many weights were cubes of stone such as chert, made in regular ratios. Iron was not used, gold sheets are not weights, and wood rods are not the usual form.',
}));
Q('m_weights_infer', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Cubical stone weights in regular ratios are found at Harappa, Lothal and Kalibangan. What does this most suggest?',
  opts: [
    'Trade and exchange followed common standards across distant towns',
    'All the towns paid tax to Mesopotamia',
    'The weights were only toys',
    'Each town used its own unrelated system',
  ],
  sol: 'The same system in distant towns suggests shared standards in trade. The finds do not show payment of tax abroad, they were not toys, and unrelated systems would not produce regular ratios everywhere.',
}));
Q('m_meluhha', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Mesopotamian records speak of trade with a distant land called Meluhha. With which region is it generally identified?',
  opts: ['The Indus region', 'Egypt', 'China', 'Greece'],
  sol: 'Meluhha is generally identified with the Indus region. Egypt, China and Greece do not fit the Mesopotamian references.',
}));
Q('m_trade_scen', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'In the imagined Mesopotamian city of Urnashar, excavators find carnelian beads of a kind made in the Indus region. Which idea do these finds best support?',
  opts: [
    'Harappan craftspeople made goods that were valued abroad, so the regions traded',
    'Mesopotamians conquered the Indus region',
    'The Harappans spoke the Mesopotamian language',
    'The two regions had no contact',
  ],
  sol: 'Beads found abroad suggest that Harappan goods were valued and traded. They do not prove conquest or a shared language, and they contradict the claim of no contact.',
}));
Q('m_pottery', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A tray in the imagined Sindhu Gallery holds broken pieces of red pots with bands painted in black. Which civilisation\'s pottery style do they fit best?',
  opts: ['The Harappan Civilisation', 'A later iron-using society', 'A people who used only unbaked pots', 'A society that made only blue glazed ware'],
  sol: 'Red pots with black painted designs are typical of Harappan pottery. A later society using iron, a people with only unbaked pots, or one with only blue glazed ware would not produce this style.',
}));
Q('m_metal', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A label in an imagined museum says that Harappan farmers ploughed their fields with iron-tipped tools. What should a historian say about this label?',
  opts: [
    'It is doubtful, because the Harappans worked copper and bronze and no iron has been found in their cities',
    'It is correct, because iron was their main metal',
    'It is correct, because they had steel swords',
    'It cannot be judged, because they used only gold',
  ],
  sol: 'The Harappans used copper and bronze, and iron is not found in their cities, so the label is doubtful. Iron was not their main metal, steel was unknown to them, and gold was not their only metal.',
}));
Q('m_craft_sort', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined museum tray is labelled metalwork: it holds a bronze bowl and a string of carnelian beads. Which object has been wrongly placed?',
  opts: [
    'The carnelian beads, which belong under bead-making',
    'The bronze bowl',
    'Neither, both are metal',
    'Both, since no Harappan metalwork survives',
  ],
  sol: 'Carnelian is a stone, so beads of it belong to bead-making, while a bronze bowl is genuine metalwork. Metal objects of bronze and copper do survive.',
}));
Q('fb_meluhha', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'Mesopotamian records mention trade with Meluhha, which is generally identified with the ___ region.',
  acc: [['Indus', 'Harappan', 'Indus Valley']],
  sol: 'Meluhha is generally identified with the Indus region.',
}));
Q('tf_iron', tf({
  t: 4, d: 1, c: 'recall', ans: false,
  stem: 'True or false? The Harappans made their main tools and weapons of iron.',
  sol: 'They used copper and bronze. Iron was not in use in the Harappan cities.',
}));
Q('mt_crafts', match({
  t: 4, d: 2, c: 'recall', marks: 2,
  stem: 'Match each Harappan craft with its material or feature.',
  pairs: [
    ['Pottery', 'Red pots with black painted designs'],
    ['Bead-making', 'Carnelian and other stones'],
    ['Metalwork', 'Copper and bronze'],
    ['Terracotta figurines', 'Baked clay animals and toys'],
  ],
  sol: 'Pottery is red with black designs, beads were made of stones such as carnelian, metalwork used copper and bronze, and terracotta means baked clay.',
}));
Q('ar_meluhha', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Mesopotamian records help historians study the overseas trade of the Harappans.',
  r: 'Meluhha, mentioned in those records, is generally identified with the Indus region.',
  sol: 'Both are true. Because Meluhha is generally identified with the Indus region, the records refer to the Harappans\' overseas trade.',
}));
Q('s_internal_trade', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Excavators find identical cube weights in two imagined towns far apart, and beads made in one of them lying in the other. What does this show about Harappan internal trade?',
  model: 'Identical **cubical weights** point to common **standards of measure**, and beads found away from where they were made show that **goods moved** between towns. Together they show organised **internal trade**.',
  sol: 'Weights and the spread of goods.',
  scheme: [['Standard weights', 1], ['Goods found away from where they were made', 1]],
}));
Q('s_crafts_two', short({
  t: 4, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any two Harappan crafts and mention a material used in each.',
  model: '1. **Bead-making**, using stones such as **carnelian**.\n2. **Metalwork**, using **copper** and **bronze**. (Also: pottery in red clay with black designs; terracotta figurines of baked clay.)',
  sol: 'Any two crafts with a material.',
  scheme: [['First craft with material', 1], ['Second craft with material', 1]],
}));
Q('s3_mesopotamia', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain what evidence shows that the Harappans traded with Mesopotamia.',
  model: '1. **Indus-style seals and beads** have been found in Mesopotamian cities.\n2. Mesopotamian records speak of **Meluhha**, generally identified with the **Indus region**.\n3. Harappan towns such as **Lothal** had workshops and, possibly, a dock that supported **overseas trade**.',
  sol: 'Finds, written records and trading centres.',
  scheme: [['Seals and beads found abroad', 1], ['Meluhha in Mesopotamian records', 1], ['Trading centres such as Lothal', 1]],
}));

// ================================================================ t05 Decline
Q('m_decline_multi', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which statement best reflects what most scholars think about the decline of the Harappan cities?',
  opts: [
    'Several factors, such as river change, climate and weaker trade, probably worked together',
    'One battle ended the civilisation in a single year',
    'The cities were never abandoned',
    'It is fully proved that a flood caused it',
  ],
  sol: 'Most scholars suggest that several causes worked together over time. No single battle is known, many cities were given up, and no single cause is fully proved.',
}));
Q('m_river', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'The imagined town of Neelpur prospered beside a seasonal river whose water slowly dried as the river shifted its course. Which theory of Harappan decline does this resemble?',
  opts: [
    'Changes in river courses, such as the drying of the Ghaggar-Hakra',
    'Attack by invaders',
    'The loss of the script',
    'The arrival of iron tools',
  ],
  sol: 'A town losing its water as a river changes course matches the theory of shifting rivers. It does not match invasion, the loss of a script, or iron tools.',
}));
Q('m_invasion', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'An older theory blamed invaders for the end of the Harappan cities. Why do most scholars now reject it?',
  opts: [
    'Excavations show no clear sign of widespread violent destruction, and the decline looks gradual in many places',
    'The theory says that the cities never existed',
    'The script has been deciphered and says so',
    'The Harappan cities were too small to be attacked',
  ],
  sol: 'Archaeology has not revealed clear evidence of a widespread violent end, and the decline seems gradual in many places. The theory does not deny the cities, the script is unread, and the cities were large.',
}));
Q('fb_decline', fb({
  t: 5, d: 2, c: 'recall',
  stem: 'The drying of the Ghaggar-___ is one of the changes in river courses that scholars link with the decline.',
  acc: [['Hakra', 'hakra']],
  sol: 'The Ghaggar-Hakra is the river bed whose drying is suggested as a cause.',
}));
Q('tf_decline', tf({
  t: 5, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Scholars agree that one single cause, a great flood, ended the Harappan Civilisation.',
  sol: 'Scholars do not agree on one cause. Floods are one theory among several, along with river changes, climate change and weaker trade.',
}));
Q('ar_invasion', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The older theory that invaders destroyed the Harappan cities is rejected by most scholars.',
  r: 'Excavations have not shown clear evidence of a widespread violent destruction of the cities.',
  sol: 'Both are true. The lack of clear evidence of widespread violence is the main reason why the older theory is rejected.',
}));
Q('mt_theories', match({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each theory of decline with the evidence or idea behind it.',
  pairs: [
    ['Floods', 'Layers of silt over buildings in some towns'],
    ['Changing rivers', 'The drying of the Ghaggar-Hakra bed'],
    ['Climate change', 'A fall in rainfall that hurt farming'],
    ['Weaker trade', 'Fewer links with distant markets'],
  ],
  sol: 'Silt layers suggest floods, a dry river bed suggests changing rivers, less rain suggests climate change, and fewer links suggest weaker trade.',
}));
Q('s_river_theory', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How could the shifting of a river have caused a Harappan town to decline?',
  model: 'Towns depended on the river for **water, farming and transport**. If the river **shifted or dried**, as the Ghaggar-Hakra may have done, farms failed, trade routes closed and people **moved away**.',
  sol: 'Dependence on the river, then the effects of its change.',
  scheme: [['Towns depended on the river', 1], ['Drying or shifting caused loss of farms and people', 1]],
}));
Q('s_invasion', short({
  t: 5, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'State the older invasion theory about the decline and why most scholars now reject it.',
  model: 'An older theory said that **invaders** destroyed the cities. Most scholars reject it because **excavations** show no clear evidence of **widespread violent destruction** and the decline looks **gradual**.',
  sol: 'Theory and reason for rejection.',
  scheme: [['Older theory blamed invaders', 1], ['No clear evidence; gradual decline', 1]],
}));
Q('s3_decline', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three theories put forward for the decline of the Harappan Civilisation.',
  model: '1. **Floods**, shown by silt layers at some sites, may have damaged towns.\n2. **Changes in river courses**, such as the drying of the **Ghaggar-Hakra**, cut off water.\n3. **Climate change**, with falling rainfall, and **weaker trade** may also have played a part.',
  sol: 'Any three theories.',
  scheme: [['First theory', 1], ['Second theory', 1], ['Third theory', 1]],
}));
Q('s3_single_cause', short({
  t: 5, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Why is it difficult to accept any one cause as the sole reason for the decline of the Harappan cities?',
  model: '1. The cities were spread over a **vast area**, and a flood or river change would not have affected all of them.\n2. Evidence differs from **site to site**, so scholars see **several causes** at work.\n3. The script is **unread**, so no record names a cause, and theories remain **uncertain**.',
  sol: 'Large area, site-wise evidence, unread script.',
  scheme: [['Vast area, uneven effects', 1], ['Evidence differs from site to site', 1], ['No readable record', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_structures', long({
  t: 1, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Harappan cities have left behind remarkable buildings.\n\n(i) Describe the Great Bath of Mohenjo-daro. **[3]**\n(ii) What was the Citadel, and what do the granaries of the cities suggest? **[3]**\n(iii) What does each of these structures tell us about Harappan life, and why should historians be careful about their uses? **[4]**',
  model: '(i) The **Great Bath** was a large **brick tank** made **watertight** with a lining of natural tar. It had **steps** at both ends and a corridor around it, and stood on the **Citadel**.\n\n(ii) The **Citadel** was a **raised mound**, usually on the western side, carrying important public buildings. The **granaries**, such as those at Harappa, suggest that **grain** was collected and stored by an organised community.\n\n(iii) The Great Bath suggests skill in building and possibly **ritual bathing**; the Citadel suggests a **planned centre**; granaries suggest **farming surplus** and storage. Historians must be careful: the script is **unread**, so uses such as bathing or the name **great granary** are **interpretations**, and some scholars question them.',
  sol: 'Great Bath; Citadel and granaries; inferences with caution.',
  scheme: [['(i) Brick tank, watertight', 1.5], ['(i) Steps, corridor, Citadel', 1.5], ['(ii) Citadel described', 1.5], ['(ii) Granaries and grain storage', 1.5], ['(iii) What the structures suggest', 2], ['(iii) Caution: interpretations, unread script', 2]],
}));
Q('l_seals_arts', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Seals and sculptures help us to imagine the Harappans.\n\n(i) Describe Harappan seals: their material, shape and common figures. **[3]**\n(ii) Describe the bearded man and the dancing girl. **[3]**\n(iii) Explain why the undeciphered script limits our knowledge of the Harappans. **[4]**',
  model: '(i) Most seals were carved from **steatite**, a soft stone, and were usually **square**. They show animals such as the **bull**, the elephant and a **unicorn-like** animal, along with a few signs.\n\n(ii) The **bearded man** is a stone sculpture with a headband and shawl; the name **priest-king** is a modern label. The **dancing girl** is a small **bronze** figure of a young woman, made by **lost-wax** casting.\n\n(iii) The script has about **400 signs**, is written mostly **right to left**, and is **undeciphered**. So we cannot read about **rulers, laws, beliefs or history**. We must depend on **archaeology**, whose finds, like the seal of a seated figure, can be read in **more than one way**.',
  sol: 'Seals; the two figures; limits of the script.',
  scheme: [['(i) Steatite and square shape', 1.5], ['(i) Animals and signs', 1.5], ['(ii) Bearded man', 1.5], ['(ii) Bronze figure and lost-wax', 1.5], ['(iii) Script undeciphered, cannot read records', 2], ['(iii) Dependence on debated archaeology', 2]],
}));
Q('l_planning', long({
  t: 3, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Harappan towns are famous for their planning.\n\n(i) Describe the grid layout of the streets. **[3]**\n(ii) Describe the bricks and houses of the towns. **[3]**\n(iii) Describe the drainage system and say what it suggests about the people. **[4]**',
  model: '(i) Streets ran **north to south and east to west** and crossed at **right angles**, dividing the town into **blocks**. The main streets were wide, and narrow lanes ran between the houses.\n\n(ii) Houses were built of **burnt bricks** of a standard proportion, about **1 : 2 : 4**. Many had a central **courtyard**, a **bathroom** and a **well**, and rooms opened on the courtyard.\n\n(iii) Waste water ran from house bathrooms into **covered drains** along the streets, with **openings** for cleaning, and **bins or soak pits** held waste. This suggests **care for cleanliness**, **skilled engineering** and an **organised authority**, although what kind of authority is unknown.',
  sol: 'Grid; bricks and houses; drainage and what it suggests.',
  scheme: [['(i) Grid and right angles', 1.5], ['(i) Blocks, wide streets and lanes', 1.5], ['(ii) Standard burnt bricks', 1.5], ['(ii) Courtyard, bathroom, well', 1.5], ['(iii) Covered drains and openings', 2], ['(iii) Inference about the people', 2]],
}));
Q('l_trade', long({
  t: 4, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Harappans were skilled traders and craftspeople.\n\n(i) Describe their internal trade and weights. **[3]**\n(ii) Describe their external trade, especially with Mesopotamia. **[3]**\n(iii) Name four Harappan crafts and mention the materials used. **[4]**',
  model: '(i) Goods such as **grain, beads, pottery and metals** moved between towns and villages, and **seals** pressed on clay marked goods as owned. **Cubical weights**, made of stone such as chert, were found in regular ratios at many sites, which suggests **common measures** in exchange.\n\n(ii) The Harappans traded overseas, above all with **Mesopotamia**. **Indus-style seals and beads** have been found there, and Mesopotamian records speak of **Meluhha**, generally identified with the **Indus region**.\n\n(iii) **Pottery**: red pots with black painted designs. **Bead-making**: carnelian and other stones. **Metalwork**: copper and bronze, but no iron has been found. **Terracotta figurines**: baked clay animals, toys and figures. (Also **cotton weaving**, using cotton grown locally.)',
  sol: 'Internal trade; Mesopotamia; four crafts.',
  scheme: [['(i) Goods exchanged', 1.5], ['(i) Standard weights', 1.5], ['(ii) Finds in Mesopotamia', 1.5], ['(ii) Meluhha in records', 1.5], ['(iii) Four crafts named', 2], ['(iii) Materials for them', 2]],
}));
Q('l_decline', long({
  t: 5, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'The Harappan cities declined after about 1900 BCE.\n\n(i) State three theories that have been put forward for the decline. **[3]**\n(ii) Explain how changing rivers and climate change could have weakened the cities. **[3]**\n(iii) Why do most scholars today reject the older invasion theory, and why is no single explanation accepted by all? **[4]**',
  model: '(i) **Floods**, **changes in river courses** such as the drying of the Ghaggar-Hakra, and **climate change** with falling rainfall. (Also **ecological strain** and **weaker trade**.)\n\n(ii) Farming and towns depended on **rivers and rain**. If a river **shifted or dried**, or rainfall **fell**, harvests shrank, towns lost their **water and food**, and people **moved away**.\n\n(iii) An older theory blamed **invaders**, but excavations show **no clear evidence** of widespread violent destruction, and decline looks **gradual**. No single cause is accepted because the **area was vast**, evidence **differs between sites** and the script is **unread**, so scholars see **several causes** working together.',
  sol: 'Three theories; mechanism; rejection of invasion and no single cause.',
  scheme: [['(i) Three theories', 3], ['(ii) Dependence on rivers and rain', 1.5], ['(ii) Effect of drying or less rain', 1.5], ['(iii) Why the invasion theory is rejected', 2], ['(iii) Why no single cause is accepted', 2]],
}));
Q('l_museum', long({
  t: [1, 2, 3, 4], d: 4, c: 'application', marks: 10, wl: L10,
  stem: 'The Sindhu Gallery of the imagined Rajtilak Museum displays four exhibits: (a) a small square steatite seal with an animal and signs, (b) a set of cubical stone weights, (c) a model of a street with a covered drain, (d) a bronze figure of a young woman.\n\n(i) State what each of three of the exhibits tells us about the Harappans. **[3]**\n(ii) Which exhibit best supports the idea of well-organised trade, and why? **[3]**\n(iii) Give two cautions that a guide should mention when explaining these exhibits to students. **[4]**',
  model: '(i) The **seal** shows trade and marked goods; the **weights** show standard measures; the **drain model** shows town planning and care for cleanliness. (The **bronze figure** shows lost-wax casting skill.)\n\n(ii) The **weights** best support organised trade, because **cubical weights in regular ratios** at many distant sites suggest **common standards** for exchange. The seal also supports trade, but it shows marking more than measuring.\n\n(iii) First, the **script is unread**, so what signs on seals say is unknown. Second, many readings, such as a **ritual use** or the name **priest-king**, are **interpretations** that scholars debate. The exhibits are also **a small part** of what survives, so conclusions should be tentative.',
  sol: 'Three exhibits; best evidence for trade; two cautions.',
  scheme: [['(i) Three exhibits linked to what they show', 3], ['(ii) Weights chosen', 1.5], ['(ii) Reason: common standards', 1.5], ['(iii) First caution', 2], ['(iii) Second caution', 2]],
}));
Q('l_dig_diary', long({
  t: [3, 4, 5], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'An imagined excavation diary from the mound of Kothari Mound lists: streets that cross at right angles; brick drains with slab covers; a workshop floor strewn with half-finished carnelian beads; cubical stone weights; and silt layers lying over one level of houses.\n\n(i) What does the diary suggest about the planning of the town? **[3]**\n(ii) What does it suggest about craft and trade? **[3]**\n(iii) The diarist wants to say that a flood ended the town. Evaluate this claim and suggest what else should be checked. **[4]**',
  model: '(i) The **grid of streets** and **covered brick drains** suggest a **planned town** with care for cleanliness and an **organised authority**, though what that authority was is unknown.\n\n(ii) The **bead workshop** shows a **craft** at work, using carnelian that was valued in distant lands, and the **cubical weights** suggest **trade** carried on by standard measures.\n\n(iii) Silt layers may point to a **flood**, but they show only that **one level** was hit. Other causes, such as a **shifting river**, **climate change** or **weaker trade**, must also be checked, and other sites compared. The claim is therefore only **possible**, not proved.',
  sol: 'Planning; craft and trade; evaluation of the flood claim.',
  scheme: [['(i) Grid and drains', 1.5], ['(i) Organised authority, with caution', 1.5], ['(ii) Craft evidence', 1.5], ['(ii) Trade evidence', 1.5], ['(iii) Silt layers: possible flood only', 2], ['(iii) Other causes and other sites to check', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_diary', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined excavation diary and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a trench supervisor at the mound of Dev Kheda (imagined)**\n\nDay 12. The streets in the northern trench meet at right angles, and the bricks lie in the same proportion in every wall. A covered drain runs along the lane, with a stone slab missing at one point.\n\nDay 19. In a room behind a courtyard we found a heap of unfinished carnelian beads and a small set of cubical stone weights. Beside them lay a clay lump pressed with a seal.\n\nDay 24. No iron has turned up anywhere. We still cannot read the signs on the seal.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which entry shows that the town was planned?', model: '**Day 12**: streets meeting at **right angles**, standard bricks and a **covered drain**.', sol: 'Day 12 describes the grid, standard bricks and the drain.', scheme: [['Day 12 with a reason', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'What do the unfinished beads suggest?', model: 'That **bead-making** was carried on at the site as a **craft**.', sol: 'Unfinished beads show a workshop.', scheme: [['A bead-making craft', 1]] })),
    child('c', short({ t: [3, 4], d: 4, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the weights, the seal and the beads together point to trade.', model: '**Cubical weights** suggest goods were measured by a standard; the **sealed clay** suggests goods were **marked and guarded**; the **beads** are a craft product made for **exchange**. Together they point to organised **trade**.', sol: 'Weights, sealing and beads.', scheme: [['Weights and sealing linked to trade', 1], ['Beads as a craft product for exchange', 1]] }), [
      short({ t: 4, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Why does Day 24 matter for the study of metals and the script?', model: 'The lack of **iron** fits the evidence that the Harappans used **copper and bronze**. The unread **signs** remind us that the **script is undeciphered**, so we rely on **archaeology**.', sol: 'No iron; script unread.', scheme: [['No iron, so copper and bronze', 1], ['Script unread, so we depend on archaeology', 1]] }),
    ]),
  ],
}));
Q('sb_letter', source({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined letter of a museum guide and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a museum guide to Class IX students (imagined)**\n\nDear students, when you visit the Sindhu Gallery you will see a model of a town with a raised mound on the west and a larger grid of houses to the east. On the mound stands a brick tank with steps at both ends. Our label calls it the bath, but remember that many scholars think it may have been used for ritual bathing, which is a view, not a proven fact. You will also see a bearded sculpture. The label priest-king was given by modern scholars, so please treat it as a guess.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'What is the raised mound on the west of the model town called?', model: 'The **Citadel**.', sol: 'The raised western mound is the Citadel.', scheme: [['Citadel', 1]] })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why does the guide say priest-king is a guess?', model: 'Because **no readable record** names him; the label is **modern**.', sol: 'No record, modern label.', scheme: [['No record, modern label', 1]] })),
    child('c', short({ t: [1, 2], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain why the guide separates a view from a proven fact.', model: 'A **proven fact** rests on evidence we can check, such as the brick tank itself. A **view**, such as ritual bathing, depends on **interpretation**. With the **script unread**, such views cannot be confirmed, so the guide asks students to stay careful.', sol: 'Fact versus interpretation.', scheme: [['Difference between fact and interpretation', 1], ['Script unread, so views stay uncertain', 1]] }), [
      short({ t: 1, d: 2, c: 'application', marks: 2, stem: '**Or** (ii): State two features of the brick tank that the guide describes or that the Great Bath had.', model: 'It was a **brick tank** with **steps at both ends**. The Great Bath was also **watertight**, with a **corridor** around it, and stood on the **Citadel**.', sol: 'Any two features.', scheme: [['First feature', 1], ['Second feature', 1]] }),
    ]),
  ],
}));
Q('sb_report', source({
  t: 5, d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined newspaper report and answer the questions that follow. ${IMAG}`,
  passage: '**The Sindhu Tribune, science page (imagined)**\n\nA survey team studying the dry bed of a seasonal river near the imagined mound of Tarangpur reports that the river once carried far more water. Nearby, the team noted a layer of silt over an old street. A member said the decline of the local town may have had several causes, including a drying river and a fall in rainfall. Another stressed that other towns declined at different times, and that more digging is needed before any firm statement can be made.',
  parts: [
    child('a', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Which theory of decline does the dry river bed support?', model: '**Changes in river courses**, as with the Ghaggar-Hakra.', sol: 'Shifting or drying rivers.', scheme: [['River change', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'analysis', marks: 1, stem: 'What may the layer of silt point to?', model: 'A **flood**.', sol: 'A flood, as a possibility.', scheme: [['Flood', 1]] })),
    child('c', short({ t: 5, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Explain why the second team member is cautious.', model: 'Towns declined at **different times**, so one cause cannot be applied to all of them. More **evidence** from other sites is needed before **firm conclusions** can be drawn.', sol: 'Different timing; more evidence needed.', scheme: [['Towns declined at different times', 1], ['More evidence is needed', 1]] }), [
      short({ t: 5, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): State two other theories of decline that the report does not name.', model: 'An **older theory blamed invaders**, which most scholars now reject. Others suggest **ecological strain** from overusing land, or **weaker trade** with distant lands.', sol: 'Any two other theories.', scheme: [['First other theory', 1], ['Second other theory', 1]] }),
    ]),
  ],
}));
