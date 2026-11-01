// ICSE 10 Biology ch06 Chemical Coordination in Plants — Part 1 (t01 growth regulators), Part 2 (t02 tropisms).
import { sl, deck, table, flow, svgV } from '../../icse-10-biology-ch01/src/lib.mjs';
import { PHOTO, COLEOPTILE, GEO, OTHER, HORMONES } from './svgs.mjs';
import { PEA, CUT } from './calc.mjs';

export const V = {
  photo: svgV(PHOTO, 'A seedling in a box bending towards light from one side, with auxin on the shaded side'),
  coleoptile: svgV(COLEOPTILE, 'Four oat coleoptiles showing that the tip senses light'),
  geo: svgV(GEO, 'A seedling laid flat: the shoot curves up and the root curves down'),
  other: svgV(OTHER, 'Hydrotropism, thigmotropism and chemotropism'),
  hormones: svgV(HORMONES, 'Where the five plant growth regulators act in a plant'),
};

export const deck1 = deck({
  part: 1,
  title: 'Chemical Coordination in Plants — Part 1: Plant growth regulators',
  goals: [
    'State one effect of each of auxins, gibberellins, cytokinins, abscisic acid and ethylene',
    'Distinguish growth promoters from growth inhibitors',
    'Interpret simple experiments with plant hormones',
  ],
  slides: [
    sl('title', 'Chemical Coordination in Plants', {
      b: 'Part 1 — how plants use chemical messengers to control growth.',
      v: flow('LR', [['m', 'Hormone made in one part'], ['t', 'Moves to another part'], ['r', 'Growth response']], [['m', 't'], ['t', 'r']], 'Flow: a hormone is made in one part of the plant, moves to another part and causes a growth response'),
      n: 'Plants have no nerves and no brain, yet they grow towards light, make fruits ripen and drop their leaves at the right time. They do all this with chemical messengers. In this part we meet the five main plant growth regulators.',
    }),
    sl('concept', 'Plant growth regulators', {
      b: '**Plant growth regulators** (phytohormones) are chemicals made in small amounts in one part of a plant that control growth and development elsewhere.',
      v: table(['Regulator', 'Type'], [['Auxin', 'Promoter'], ['Gibberellin', 'Promoter'], ['Cytokinin', 'Promoter'], ['Abscisic acid', 'Inhibitor'], ['Ethylene (a gas)', 'Inhibitor']], 'Table: auxin, gibberellin and cytokinin are growth promoters; abscisic acid and ethylene are growth inhibitors'),
      n: 'Three of these chemicals speed up growth. They are the promoters: auxin, gibberellin and cytokinin. Two of them slow growth or bring a stage of life to an end. They are the inhibitors: abscisic acid and ethylene.',
    }),
    sl('diagram', 'Where the regulators act', {
      b: 'Each regulator has typical sites and effects in the plant body.',
      v: V.hormones,
      n: 'Auxin is made at the shoot tip. Gibberellin lengthens the stem between the leaves. Cytokinin is made in the root tips. Abscisic acid acts on leaves in dry weather, and a ripening fruit gives off ethylene.',
    }),
    sl('concept', 'Auxins', {
      v: table(['Effect of auxin', 'Example'], [['Cell elongation behind the tip', 'Shoots bend towards light'], ['Apical dominance', 'Side buds stay dormant while the tip is present'], ['Root formation', 'Rooting powder on stem cuttings'], ['Fruit growth', 'Seedless fruits; less early fruit drop'], ['Weedicide (synthetic)', '2,4-D kills broad-leaved weeds']], 'Table of five effects of auxins with examples'),
      n: 'Auxins are made at the shoot tip and move downwards. They make cells just behind the tip grow longer. They keep the side buds dormant, which we call apical dominance. Gardeners also use them to root cuttings and to grow seedless fruits.',
    }),
    sl('check', 'Quick check: the shoot tip hormone', {
      b: 'Fill in: the hormone made at the shoot tip that stops the lateral buds from growing is ______.',
      chk: 'aux-fill',
      n: 'Think of what happens when a gardener pinches off a shoot tip.',
    }),
    sl('example', 'Worked example 1: rooting cuttings', {
      b: `A nursery plants ${CUT.n} rose cuttings dipped in rooting powder and ${CUT.n} untreated ones.`,
      ul: [`Step 1: rooted cuttings: treated **${CUT.auxin}**, untreated **${CUT.control}**.`, `Step 2: percentage rooted: treated **${CUT.pctAuxin}%**, untreated **${CUT.pctControl}%**.`, 'Step 3: conclusion: the **auxin** in the powder makes many more cuttings form roots.'],
      v: table(['Batch', 'Rooted', 'Percentage'], [['With rooting powder', `${CUT.auxin} of ${CUT.n}`, `${CUT.pctAuxin}%`], ['Untreated (control)', `${CUT.control} of ${CUT.n}`, `${CUT.pctControl}%`]], 'Worked table: thirty-four of forty treated cuttings rooted, eighty-five percent; ten of forty untreated cuttings rooted, twenty-five percent'),
      n: 'Always compare a treated set with a control. Here most treated cuttings rooted, but only a quarter of the untreated ones did. The difference is the effect of the auxin. The few untreated cuttings that rooted used their own natural auxin.',
    }),
    sl('concept', 'Gibberellins and cytokinins', {
      v: table(['Gibberellins', 'Cytokinins'], [['Lengthen internodes; dwarf plants grow tall', 'Promote cell division'], ['Break dormancy of seeds and buds', 'Delay ageing: leaves stay green longer'], ['Bolting of rosette plants such as cabbage', 'Help lateral buds grow'], ['Larger fruits such as grapes', 'Rich in coconut water; made in root tips']], 'Table comparing the effects of gibberellins and cytokinins'),
      n: 'Gibberellins make stems longer, so genetically dwarf plants can reach normal height. They also wake seeds from dormancy. Cytokinins make cells divide and keep leaves green for longer. Coconut water is a natural source of cytokinins.',
    }),
    sl('example', 'Worked example 2: dwarf peas', {
      b: 'Dwarf pea seedlings were sprayed with water or with gibberellin.',
      ul: [`Step 1: mean heights after three weeks: water **${PEA.water} cm**, gibberellin **${PEA.ga} cm**.`, `Step 2: difference: ${PEA.ga} − ${PEA.water} = **${PEA.increase} cm**.`, `Step 3: ratio: ${PEA.ga} ÷ ${PEA.water} = **${PEA.times}** times taller.`],
      v: table(['Set', 'Mean height (cm)'], [['Water (control)', String(PEA.water)], ['Gibberellin', String(PEA.ga)]], 'Worked table: seedlings sprayed with water grew to twelve centimetres; seedlings sprayed with gibberellin grew to thirty centimetres'),
      n: 'Gibberellin made the dwarf seedlings two and a half times taller than the control. The extra growth comes from longer internodes, not from more leaves. This is how gibberellin overcomes genetic dwarfism.',
    }),
    sl('check', 'Quick check: green leaves', {
      b: 'Which hormone promotes cell division and delays the ageing of leaves?',
      chk: 'cytokinin-mcq',
      n: 'This hormone is plentiful in coconut water.',
    }),
    sl('concept', 'Abscisic acid and ethylene', {
      v: table(['Abscisic acid', 'Ethylene'], [['Closes stomata when water is short: the stress hormone', 'A gas that ripens fruits'], ['Keeps seeds and buds dormant', 'Hastens yellowing and ageing of leaves'], ['Promotes the fall of leaves and fruits', 'Promotes the fall of leaves, flowers and fruits']], 'Table comparing the effects of abscisic acid and ethylene'),
      n: 'Abscisic acid helps a plant survive hard times. It shuts the stomata in a drought and keeps seeds dormant until conditions improve. Ethylene is a gas. It ripens fruits, and one ripe fruit can ripen a whole box of raw ones.',
    }),
    sl('check', 'Quick check: a gaseous hormone', {
      b: 'Which plant growth regulator is a gas at ordinary temperatures?',
      chk: 'ethylene-gas-mcq',
      n: 'It is the hormone of fruit ripening.',
    }),
    sl('concept', 'Promoters and inhibitors work together', {
      v: table(['Process', 'Promoted by', 'Opposed by'], [['Seed germination', 'Gibberellin', 'Abscisic acid (dormancy)'], ['Growth of side buds', 'Cytokinin', 'Auxin from the tip'], ['Leaves staying green', 'Cytokinin', 'Ethylene and abscisic acid']], 'Table of three processes, the hormone that promotes each and the hormone that opposes it'),
      n: 'A plant rarely uses one hormone alone. Gibberellin and abscisic acid pull in opposite directions over germination. Auxin and cytokinin balance each other over side buds. The final growth depends on the balance between them.',
    }),
    sl('check', 'Quick check: longer internodes', {
      b: 'True or false: gibberellins cause the internodes of a stem to lengthen.',
      chk: 'gib-tf',
      n: 'Remember the dwarf peas.',
    }),
    sl('summary', 'Summary', {
      ul: ['Auxin: cell elongation, apical dominance, rooting, seedless fruits, weedicides.', 'Gibberellin: longer internodes, breaks dormancy, bolting, larger fruits.', 'Cytokinin: cell division, delays ageing of leaves.', 'Abscisic acid: closes stomata, dormancy, leaf fall.', 'Ethylene: a gas; ripening, ageing and leaf fall.'],
      v: table(['Promoters', 'Inhibitors'], [['Auxin, gibberellin, cytokinin', 'Abscisic acid, ethylene']], 'Summary table: promoters are auxin, gibberellin and cytokinin; inhibitors are abscisic acid and ethylene'),
      n: 'To recap. Auxin, gibberellin and cytokinin are promoters. Abscisic acid and ethylene are inhibitors. Learn one clear effect and one everyday use for each, and you will be ready for most questions.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Give **one precise effect** for each hormone: "auxin causes apical dominance", not "auxin helps growth".', 'Remember **ethylene is a gas** and an **inhibitor**.', 'Abscisic acid is the **stress hormone**: it **closes** stomata.', 'In experiment questions, always name the **control** and say what it shows.'],
      n: 'Exam tips. Be precise about each hormone. Ethylene is a gas and an inhibitor. Abscisic acid closes stomata, it does not open them. And in experiments, say which set is the control and why it is needed.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Chemical Coordination in Plants — Part 2: Tropic movements',
  goals: [
    'Identify the type of tropism from an example and say whether it is positive or negative',
    'Explain phototropism of a shoot in terms of unequal auxin distribution',
    'Describe simple experiments on phototropism, geotropism and hydrotropism',
  ],
  slides: [
    sl('title', 'Tropic Movements', {
      b: 'Part 2 — how plant parts grow towards or away from a stimulus.',
      v: flow('LR', [['s', 'One-sided stimulus'], ['a', 'Unequal auxin'], ['g', 'Unequal growth'], ['b', 'Bending']], [['s', 'a'], ['a', 'g'], ['g', 'b']], 'Flow: a stimulus from one side causes unequal auxin, which causes unequal growth and bending'),
      n: 'A plant cannot walk towards the sun, but its shoot can grow towards it. Its roots grow down into the soil and towards water. These slow, directional growth responses are called tropic movements, or tropisms.',
    }),
    sl('concept', 'Five tropisms', {
      b: 'A **tropism** is the growth of a plant part towards (**positive**) or away from (**negative**) a stimulus coming from one direction.',
      v: table(['Tropism', 'Stimulus', 'Example'], [['Phototropism', 'Light', 'Shoot grows towards light (positive)'], ['Geotropism', 'Gravity', 'Root grows down (positive); shoot grows up (negative)'], ['Hydrotropism', 'Water', 'Root grows towards water (positive)'], ['Thigmotropism', 'Touch', 'Tendril coils round a support'], ['Chemotropism', 'Chemicals', 'Pollen tube grows to the ovule']], 'Table of five tropisms with their stimulus and an example of each'),
      n: 'Name a tropism after its stimulus: photo for light, geo for gravity, hydro for water, thigmo for touch and chemo for chemicals. Then say positive if the part grows towards the stimulus, or negative if it grows away.',
    }),
    sl('diagram', 'Phototropism', {
      b: 'A shoot lit from one side **bends towards the light**: it is **positively phototropic**.',
      v: V.photo,
      n: 'Here a seedling grows in a box with a single opening. Light enters from one side only. Within days the shoot curves towards the opening. Notice the red dots: auxin has gathered on the shaded side of the stem.',
    }),
    sl('concept', 'How auxin makes a shoot bend', {
      v: flow('TB', [['l', 'Light falls on one side of the tip'], ['m', 'Auxin moves to the shaded side'], ['e', 'Shaded-side cells elongate more'], ['c', 'Shoot curves towards the light']], [['l', 'm'], ['m', 'e'], ['e', 'c']], 'Flow: light on one side of the tip, auxin moves to the shaded side, cells there elongate more, the shoot curves towards the light'),
      n: 'The tip senses the light. Auxin then moves to the shaded side and travels down. Cells on the shaded side grow longer than cells on the lit side. A stem that is longer on one side must curve towards the shorter side, which faces the light.',
    }),
    sl('diagram', 'The tip senses light', {
      b: 'Experiments with oat coleoptiles show that the **tip** perceives light and the region **below** it bends.',
      v: V.coleoptile,
      n: 'Compare the four seedlings. Cutting off the tip, or covering it with an opaque cap, stops the bending. Covering the lower part does not. So the tip senses light, and a message travels down to the region that bends.',
    }),
    sl('check', 'Quick check: a stem near a window', {
      b: 'A money plant stem curves towards a window. Name the response.',
      chk: 'window-mcq',
      n: 'Is the stimulus light, gravity or water, and is the stem growing towards it?',
    }),
    sl('example', 'Worked example 1: naming the tropism', {
      b: 'Name the stimulus first, then the direction.',
      ul: ['Step 1: what is the **stimulus**: light, gravity, water, touch or chemicals?', 'Step 2: does the part grow **towards** it (positive) or **away** (negative)?', 'Step 3: join them: for example, positive hydrotropism.'],
      v: table(['Observation', 'Tropism'], [['Root grows down whichever way the seed lies', 'Positive geotropism'], ['Shoot grows up in a dark cupboard', 'Negative geotropism'], ['Root grows away from light', 'Negative phototropism'], ['Neem roots wrap round a leaking pipe', 'Positive hydrotropism']], 'Worked table matching four observations to their tropisms'),
      n: 'Work in two steps. First find the stimulus. Then decide the direction. A shoot that grows up in a dark cupboard is not responding to light at all. It is growing away from gravity, so it shows negative geotropism.',
    }),
    sl('diagram', 'Geotropism', {
      b: 'Laid flat, a seedling\'s **root curves down** (positive) and its **shoot curves up** (negative).',
      v: V.geo,
      n: 'Lay a germinating seedling on its side and wait two days. The root turns downwards and the shoot turns upwards. Gravity is the same stimulus, but the two organs respond in opposite ways.',
    }),
    sl('check', 'Quick check: a root that always grows down', {
      b: 'However a bean seed is placed, its root grows downwards. This shows…',
      chk: 'rootgeo-mcq',
      n: 'Which stimulus pulls downwards, and is the root growing towards it?',
    }),
    sl('diagram', 'Hydrotropism, thigmotropism and chemotropism', {
      b: 'Roots grow towards **water**; tendrils coil round a **support**; pollen tubes grow towards the **ovule**.',
      v: V.other,
      n: 'Three more tropisms. Roots bend towards moist soil. The tendrils of peas, gourds and grapevines coil round a stick they touch. And after pollination, the pollen tube grows down the style, guided by chemicals from the ovule.',
    }),
    sl('example', 'Worked example 2: predicting with a clinostat', {
      b: 'A **clinostat** turns a seedling slowly so that gravity acts on all sides in turn.',
      ul: ['Step 1: seedling laid flat, **not** rotating: root curves down, shoot curves up.', 'Step 2: seedling laid flat **on a rotating clinostat**: both keep growing **horizontally**.', 'Step 3: conclusion: the curving in step 1 was caused by **gravity** acting from one side.'],
      v: table(['Set-up', 'Root', 'Shoot'], [['Flat, still', 'Curves down', 'Curves up'], ['Flat, on a rotating clinostat', 'Grows straight', 'Grows straight']], 'Worked table: a still seedling curves, a seedling on a rotating clinostat grows straight'),
      n: 'The clinostat is the control for gravity. When the seedling turns slowly, every side faces down for the same time, so there is no one-sided pull. Without a one-sided stimulus, there is no tropism.',
    }),
    sl('check', 'Quick check: the rotating instrument', {
      b: 'Fill in: the instrument that slowly rotates a seedling so that gravity acts equally on all sides is a ______.',
      chk: 'clino-fill',
      n: 'Its name begins like the word incline.',
    }),
    sl('check', 'Quick check: roots and water', {
      b: 'True or false: roots show negative hydrotropism.',
      chk: 'hydro-tf',
      n: 'Do roots grow towards water or away from it?',
    }),
    sl('summary', 'Summary', {
      ul: ['A tropism is growth towards (positive) or away from (negative) a one-sided stimulus.', 'Shoots: positively phototropic, negatively geotropic.', 'Roots: positively geotropic and hydrotropic, negatively phototropic.', 'Tendrils: thigmotropism. Pollen tubes: chemotropism.', 'Auxin on the shaded side makes those cells grow longer, so the shoot bends to light.'],
      v: table(['Organ', 'Light', 'Gravity', 'Water'], [['Shoot', 'Towards (+)', 'Away (−)', '—'], ['Root', 'Away (−)', 'Towards (+)', 'Towards (+)']], 'Summary table of how shoots and roots respond to light, gravity and water'),
      n: 'To recap. Shoots grow towards light and away from gravity. Roots grow towards gravity and water and away from light. Tendrils respond to touch and pollen tubes to chemicals. Unequal auxin makes unequal growth, and that is what bends the plant.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Always write **positive** or **negative** with the tropism.', 'Auxin collects on the **shaded** side, not the lit side.', 'The **tip** senses light; the **region below** it bends.', 'For experiments, give **set-up, observation and conclusion**.'],
      n: 'Exam tips. Never write just phototropism: say positive or negative. Put auxin on the shaded side. Remember that the tip senses and the region below bends. And describe every experiment in three parts: set-up, observation and conclusion.',
    }),
  ],
});
