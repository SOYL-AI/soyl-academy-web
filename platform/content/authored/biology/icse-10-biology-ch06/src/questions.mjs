// ICSE 10 Biology ch06 Chemical Coordination in Plants — question bank in ICSE 2027 style.
// Heights, rooting and greening percentages and ripening days are computed by calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-10-biology-ch01/src/lib.mjs';
import { PEA, CUT, LEAF, BANANA } from './calc.mjs';
import { COLEOPTILE, HORMONES_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, match, part } = mk;
const colFig = svgV(COLEOPTILE, 'Four oat coleoptiles lit from the right, numbered 1 to 4');
const plantFig = svgV(HORMONES_LETTERED, 'A potted plant with five parts lettered A to E');

// ---------------------------------------------------------------- t01 plant growth regulators
add('apical-mcq', mcq({
  stem: 'Leela pinches off the growing tip of her tulsi plant. Within two weeks, several side branches appear and the plant becomes bushy. Removing the tip removed the main source of',
  right: 'auxin, which had kept the side buds from growing', wrong: ['ethylene, which had made the side buds ripen', 'abscisic acid, which had made the side buds grow faster', 'cytokinin, which had kept the main stem short'],
  sol: 'The shoot tip makes auxin, which suppresses the lateral buds (apical dominance). Without the tip, the side buds grow — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ga-dwarf-mcq', mcq({
  stem: 'A genetically dwarf variety of pea grows to the height of a normal pea plant when its seedlings are sprayed with',
  right: 'gibberellin', wrong: ['abscisic acid', 'ethylene', 'a weedicide such as 2,4-D'],
  sol: 'Gibberellins lengthen the internodes and overcome genetic dwarfism — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ethylene-gas-mcq', mcq({
  stem: 'Which plant growth regulator is a gas at ordinary temperatures?',
  right: 'Ethylene', wrong: ['Auxin', 'Cytokinin', 'Gibberellin'],
  sol: 'Ethylene is the gaseous plant hormone — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('aba-stomata-mcq', mcq({
  stem: 'During a long dry spell, the stomata of a maize crop stay closed for most of the day. The hormone that brings this about is',
  right: 'abscisic acid', wrong: ['gibberellin', 'cytokinin', 'auxin'],
  sol: 'Abscisic acid, the stress hormone, closes stomata when water is short — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cytokinin-mcq', mcq({
  stem: 'Which hormone promotes cell division and keeps leaves green for longer by delaying their ageing?',
  right: 'Cytokinin', wrong: ['Abscisic acid', 'Ethylene', 'Auxin'],
  sol: 'Cytokinins promote cell division and delay senescence of leaves — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('seedless-mcq', mcq({
  stem: 'A grower sprays unpollinated tomato flowers so that the ovaries develop into fruits without seeds. The hormone sprayed is most likely',
  right: 'an auxin', wrong: ['abscisic acid', 'ethylene', 'a cytokinin'],
  sol: 'Auxins applied to flowers can make the ovary grow into a seedless (parthenocarpic) fruit — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('weedicide-mcq', mcq({
  stem: 'The weedicide 2,4-D, sprayed on wheat fields to kill broad-leaved weeds, is a synthetic',
  right: 'auxin', wrong: ['gibberellin', 'cytokinin', 'abscisic acid'],
  sol: '2,4-D is a synthetic auxin; in high doses it kills broad-leaved (dicot) weeds — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('inhibitor-mcq', mcq({
  stem: 'Which pair consists only of plant growth inhibitors?',
  right: 'Abscisic acid and ethylene', wrong: ['Auxin and gibberellin', 'Cytokinin and abscisic acid', 'Gibberellin and ethylene'],
  sol: 'Abscisic acid and ethylene slow or stop growth processes; the other three hormones are promoters — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('bolting-mcq', mcq({
  stem: 'A cabbage plant that normally stays as a short rosette of leaves quickly forms a tall flowering stalk after one treatment. The hormone used was',
  right: 'gibberellin, which lengthens the internodes', wrong: ['abscisic acid, which induces dormancy', 'ethylene, which ripens fruits', 'cytokinin, which delays ageing'],
  sol: 'Sudden elongation of the stem (bolting) in rosette plants is caused by gibberellins — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('germinate-mcq', mcq({
  stem: 'Barley grains that would not sprout were soaked in a hormone solution, and nearly all of them germinated in two days. The hormone was',
  right: 'gibberellin', wrong: ['abscisic acid', 'ethylene', '2,4-D'],
  sol: 'Gibberellins break seed dormancy and start germination; abscisic acid does the opposite — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ripen-mcq', mcq({
  stem: 'A trader packs a few ripe mangoes into each crate of raw mangoes. The raw ones ripen sooner because the ripe mangoes',
  right: 'give off ethylene gas, which hastens ripening', wrong: ['give off carbon dioxide, which softens the fruit', 'absorb the auxin of the raw mangoes', 'release abscisic acid, which sweetens the fruit'],
  sol: 'Ripe fruits release ethylene, which speeds up the ripening of nearby fruits — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('coconut-mcq', mcq({
  stem: 'Coconut water is added to the medium in which tiny pieces of plant tissue are grown in the laboratory, because it is rich in',
  right: 'cytokinins, which make the cells divide', wrong: ['abscisic acid, which keeps the cells dormant', 'ethylene, which ripens the cells', 'auxin only, which stops all cell division'],
  sol: 'Coconut water (liquid endosperm) is a natural source of cytokinins, which promote cell division — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('leaffall-mcq', mcq({
  stem: 'In autumn, a hormone builds up in the leaves of a deciduous tree, the leaves fall and the buds become dormant. This hormone is',
  right: 'abscisic acid', wrong: ['gibberellin', 'cytokinin', 'auxin'],
  sol: 'Abscisic acid promotes leaf fall (abscission) and dormancy of buds — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('promoter-ar', ar({
  a: 'Auxins, gibberellins and cytokinins are called growth promoters.',
  r: 'They speed up growth processes such as cell elongation and cell division.',
  key: 'c',
  sol: 'Both are true, and their effect of speeding up elongation and division is exactly why they are called promoters — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('aba-ar', ar({
  a: 'Abscisic acid is called the stress hormone of plants.',
  r: 'Abscisic acid makes the stomata open wider in dry weather.',
  key: 'a',
  sol: 'The assertion is true: abscisic acid helps plants survive stress such as drought. The reason is false: it closes stomata to save water — option (a).',
  d: 2, c: 'analysis', t: [1],
}));
add('ethylene-ar', ar({
  a: 'Ethylene is a growth promoter.',
  r: 'Ethylene is a plant hormone that is a gas.',
  key: 'b',
  sol: 'The assertion is false: ethylene hastens ripening, ageing and leaf fall, so it is grouped with the inhibitors. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('gib-tf', tf({
  stem: 'Gibberellins cause the internodes of a stem to lengthen.',
  key: 't',
  sol: 'True. Gibberellins make the internodes elongate, so treated plants grow taller.',
  d: 1, c: 'recall', t: [1],
}));
add('cyt-tf', tf({
  stem: 'Cytokinins speed up the yellowing and fall of leaves.',
  key: 'f',
  sol: 'False. Cytokinins delay the ageing (senescence) of leaves; ethylene and abscisic acid hasten yellowing and leaf fall.',
  d: 2, c: 'understanding', t: [1],
}));
add('aux-fill', fill({
  stem: 'The hormone made at the shoot tip that stops the lateral buds below it from growing is ______.',
  acc: [['auxin', 'auxins', 'IAA']],
  sol: 'Auxin.',
  d: 1, c: 'recall', t: [1],
}));
add('leaf-num', num({
  stem: `Twenty leaves were cut from a plant and kept in the dark for six days with their stalks in a cytokinin solution; ${LEAF.cytokinin} of them stayed green. What percentage of these leaves stayed green?`,
  value: LEAF.pctCytokinin, unit: '%',
  sol: r`$\dfrac{${LEAF.cytokinin}}{${LEAF.n}} \times 100 = ${LEAF.pctCytokinin}$ percent of the leaves stayed green, because cytokinin delays ageing.`,
  scheme: [[`${LEAF.pctCytokinin} percent`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 90 || 'value');
add('apical-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the suppression of the growth of lateral buds by the apical bud of a shoot.',
  model: '**Apical dominance.**',
  sol: 'Apical dominance.', scheme: [['Apical dominance', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('pgr-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: chemical substances made in small amounts in one part of a plant that control its growth and development.',
  model: '**Plant growth regulators** (phytohormones).',
  sol: 'Plant growth regulators.', scheme: [['Plant growth regulators / phytohormones', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('odd-promoter', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Auxin, Gibberellin, Abscisic acid, Cytokinin.',
  model: '**Abscisic acid**; the others are **growth promoters**.',
  sol: 'Abscisic acid is a growth inhibitor.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [1],
}));
add('odd-process', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Fruit ripening, Leaf fall, Seed dormancy, Cell division.',
  model: '**Cell division**; the others are **effects of growth inhibitors** (ethylene and abscisic acid).',
  sol: 'Cell division is promoted by cytokinins.', scheme: [['Odd one and category', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('reason-ripe', short({
  marks: 1, wl: null,
  stem: 'Give reason: one ripe banana placed in a closed bag of green bananas makes them all ripen faster.',
  model: 'The ripe banana gives off **ethylene gas**, which **hastens ripening** of the green bananas.',
  sol: 'Ethylene.', scheme: [['Ethylene hastens ripening', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('reason-weed', short({
  marks: 1, wl: null,
  stem: 'Give reason: a spray of the synthetic auxin 2,4-D can clear weeds from a wheat field without harming the wheat.',
  model: 'In high doses 2,4-D **kills broad-leaved (dicot) weeds**, but **narrow-leaved wheat (a monocot)** is not affected.',
  sol: 'Selective weedicide.', scheme: [['Kills broad-leaved weeds, spares wheat', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('reason-pinch', short({
  marks: 1, wl: null,
  stem: 'Give reason: the tops of tea bushes are plucked regularly to keep the bushes low and dense.',
  model: 'Removing the tips removes the **source of auxin**, ending **apical dominance**, so the **lateral buds grow** into many side shoots.',
  sol: 'Loss of apical dominance.', scheme: [['Apical dominance removed; lateral buds grow', 1]],
  d: 2, c: 'application', t: [1],
}));
add('promote-short', short({
  marks: 2,
  stem: 'Distinguish between growth promoters and growth inhibitors, giving two examples of each.',
  model: '**Growth promoters** speed up growth such as cell division and elongation: **auxins** and **gibberellins** (also cytokinins). **Growth inhibitors** slow growth and bring about dormancy, ripening or leaf fall: **abscisic acid** and **ethylene**.',
  sol: 'Promoters: auxin, gibberellin, cytokinin. Inhibitors: abscisic acid, ethylene.',
  scheme: [['Difference', 1], ['Two examples of each', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('auxuse-short', short({
  marks: 2,
  stem: 'State two ways in which auxins are used in farming or gardening.',
  model: '1. A synthetic auxin in **rooting powder** makes **stem cuttings form roots** quickly.\n2. Sprays of auxin produce **seedless fruits** or prevent the early **drop of fruits**; synthetic auxins such as 2,4-D are used as **weedicides**.',
  sol: 'Rooting of cuttings; seedless fruits / fruit drop / weedicides.',
  scheme: [['First use', 1], ['Second use', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('nursery-short', short({
  marks: 2,
  stem: 'A nursery worker wants (a) dwarf ornamental plants to grow taller and (b) cut leafy vegetables to stay green longer. Name the hormone for each and state its action.',
  model: '(a) **Gibberellin**: it makes the **internodes lengthen**, so the stems grow taller.\n(b) **Cytokinin**: it **delays ageing** (senescence) of leaves, so they keep their chlorophyll and stay green.',
  sol: 'Gibberellin; cytokinin.',
  scheme: [['Gibberellin with action', 1], ['Cytokinin with action', 1]],
  d: 2, c: 'application', t: [1],
}));
add('effects-short', short({
  marks: 3,
  stem: 'Name the three plant hormones that promote growth and state one effect of each.',
  model: '1. **Auxin:** makes cells just behind the shoot tip **elongate** and keeps lateral buds dormant (**apical dominance**).\n2. **Gibberellin:** makes **internodes lengthen** and breaks seed dormancy.\n3. **Cytokinin:** promotes **cell division** and delays the ageing of leaves.',
  sol: 'Auxin, gibberellin, cytokinin, each with one effect.',
  scheme: [['Auxin with effect', 1], ['Gibberellin with effect', 1], ['Cytokinin with effect', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('inhibit-short', short({
  marks: 3,
  stem: 'Explain why abscisic acid and ethylene are grouped together, and state one effect of each that a farmer might notice.',
  model: 'Both are **growth inhibitors**: they slow growth or bring a stage of life to an end. **Abscisic acid** closes the **stomata** in a dry spell and keeps seeds and buds **dormant**. **Ethylene**, a gas, makes fruits **ripen** quickly and leaves turn yellow and fall.',
  sol: 'Both inhibitors; ABA: stomata, dormancy; ethylene: ripening, leaf fall.',
  scheme: [['Both growth inhibitors', 1], ['One effect of abscisic acid', 1], ['One effect of ethylene', 1]],
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 tropic movements
add('tropism-mcq', mcq({
  stem: 'A tropic movement in a plant is best described as',
  right: 'growth of a plant part towards or away from a stimulus that comes from one direction', wrong: ['movement of a whole plant from one place to another', 'any change in the size of a leaf', 'the opening and closing of flowers at fixed times'],
  sol: 'Tropisms are directional growth movements in response to one-sided stimuli — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('rootgeo-mcq', mcq({
  stem: 'However a bean seed is placed in the soil, its root always grows downwards. This shows',
  right: 'positive geotropism', wrong: ['negative geotropism', 'positive phototropism', 'thigmotropism'],
  sol: 'Growth towards gravity is positive geotropism — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('window-mcq', mcq({
  stem: 'The stem of a money plant kept near a window curves towards the window. The response is',
  right: 'positive phototropism', wrong: ['negative phototropism', 'positive geotropism', 'positive hydrotropism'],
  sol: 'Growth towards light is positive phototropism — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('tendril-mcq', mcq({
  stem: 'The tendrils of a bitter gourd vine wind round a bamboo pole that they touch. This is',
  right: 'thigmotropism', wrong: ['chemotropism', 'hydrotropism', 'geotropism'],
  sol: 'Growth in response to contact with a support is thigmotropism — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pollen-mcq', mcq({
  stem: 'The growth of a pollen tube down the style towards the ovule is an example of',
  right: 'chemotropism', wrong: ['thigmotropism', 'phototropism', 'negative geotropism'],
  sol: 'The pollen tube responds to chemicals from the ovule — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('shaded-mcq', mcq({
  stem: 'A seedling lit only from its left side bends to the left because',
  right: 'auxin collects on the right side, so cells there elongate more', wrong: ['auxin collects on the left side, so cells there elongate more', 'light speeds up cell division on the left side', 'gravity pulls the tip towards the light'],
  sol: 'Auxin moves to the shaded (right) side; its cells grow longer, so the shoot curves to the lit left side — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('pipe-mcq', mcq({
  stem: 'The roots of a neem tree grow sideways for several metres and wrap around a leaking underground water pipe. This shows',
  right: 'positive hydrotropism', wrong: ['negative hydrotropism', 'negative geotropism', 'chemotropism towards the metal'],
  sol: 'Roots growing towards water show positive hydrotropism — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('clinostat-mcq', mcq({
  stem: 'A seedling fixed horizontally on a slowly rotating clinostat keeps growing horizontally because',
  right: 'gravity acts on all sides of the shoot and root in turn, so there is no one-sided stimulus', wrong: ['rotation destroys all the auxin in the seedling', 'the seedling cannot sense light while rotating', 'the root stops growing when rotated'],
  sol: 'Slow rotation cancels the one-sided pull of gravity, so neither organ curves — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('cap-mcq', mcq({
  stem: 'In the figure, comparing coleoptile 1 with coleoptile 3 shows that',
  right: 'the tip is the part that senses light', wrong: ['the base is the part that senses light', 'light is not needed for bending', 'an opaque cap makes the coleoptile bend faster'],
  sol: 'Covering only the tip stops bending, so the tip perceives the light — option (@K).',
  d: 3, c: 'application', t: [2],
  assets: [colFig],
}));
add('rootpair-mcq', mcq({
  stem: 'Which pair of responses is shown by the main root of a plant?',
  right: 'Positive geotropism and negative phototropism', wrong: ['Negative geotropism and positive phototropism', 'Positive geotropism and positive phototropism', 'Negative geotropism and negative hydrotropism'],
  sol: 'The main root grows towards gravity and away from light — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('region-mcq', mcq({
  stem: 'When a shoot bends towards light, the bending takes place',
  right: 'a short distance below the tip, where cells are elongating', wrong: ['at the very tip, where auxin is made', 'at the base of the stem near the soil', 'in the leaves only'],
  sol: 'The tip senses light, but the curve forms in the zone of elongation just below it — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('phototropism-ar', ar({
  a: 'A shoot kept in a box lit from one side bends towards the light.',
  r: 'Cells on the lit side of the shoot grow longer than cells on the shaded side.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: auxin gathers on the shaded side, so cells there grow longer — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('geo-ar', ar({
  a: 'The root of a seed planted upside down still grows downwards.',
  r: 'Roots are positively geotropic.',
  key: 'c',
  sol: 'Both are true, and positive geotropism (growth towards gravity) is why the root turns down whatever the seed position — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('tendril-ar', ar({
  a: 'The tendrils of a pea plant coil round a support.',
  r: 'Pollen tubes grow towards the ovule in response to chemicals.',
  key: 'd',
  sol: 'Both are true, but the reason is about chemotropism of pollen tubes and does not explain the coiling of tendrils (thigmotropism) — option (d).',
  d: 2, c: 'analysis', t: [2],
}));
add('hydro-tf', tf({
  stem: 'Roots show negative hydrotropism.',
  key: 'f',
  sol: 'False. Roots grow towards water: they are positively hydrotropic.',
  d: 1, c: 'recall', t: [2],
}));
add('clino-fill', fill({
  stem: 'The instrument that slowly rotates a seedling so that gravity acts equally on all its sides is called a ______.',
  acc: [['clinostat', 'klinostat']],
  sol: 'Clinostat.',
  d: 2, c: 'recall', t: [2],
}));
add('thigmo-term', short({
  marks: 1, wl: null,
  stem: 'Give the biological term: the growth movement of a plant part in response to touch or contact with a solid object.',
  model: '**Thigmotropism.**',
  sol: 'Thigmotropism.', scheme: [['Thigmotropism', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('odd-tropism', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: shoot bending to light, root growing to water, tendril coiling round a stick, Mimosa leaflets folding on touch.',
  model: '**Mimosa leaflets folding on touch**; the others are **tropic (directional growth) movements**.',
  sol: 'Mimosa folding is not a growth movement and does not depend on the direction of the stimulus.', scheme: [['Odd one and category', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('odd-stimulus', short({
  marks: 1, wl: null,
  stem: 'Choose the odd one out and name the category to which the other three belong: Light, Gravity, Water, Auxin.',
  model: '**Auxin**; the others are **stimuli (external factors) for tropic movements**.',
  sol: 'Auxin is a plant hormone, not an external stimulus.', scheme: [['Odd one and category', 1]],
  d: 2, c: 'analysis', t: [2],
}));
add('reason-hydro', short({
  marks: 1, wl: null,
  stem: 'Give reason: in a pot that is dry except for one moist corner, most roots grow towards that corner.',
  model: 'Roots are **positively hydrotropic**: they grow **towards water**.',
  sol: 'Positive hydrotropism.', scheme: [['Positive hydrotropism', 1]],
  d: 2, c: 'application', t: [2],
}));
add('posneg-short', short({
  marks: 2,
  stem: 'Using the shoot and root of one seedling, explain what is meant by positive and negative geotropism.',
  model: 'The **root** grows **towards** gravity (downwards): this is **positive geotropism**. The **shoot** grows **away from** gravity (upwards): this is **negative geotropism**. The same stimulus causes opposite responses in the two organs.',
  sol: 'Root towards gravity; shoot away.',
  scheme: [['Root: positive, towards gravity', 1], ['Shoot: negative, away from gravity', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('photo-explain-short', short({
  marks: 2,
  stem: 'Explain how auxin makes a shoot bend towards light coming from one side.',
  model: 'Auxin made at the tip moves to the **shaded side** of the shoot. There it makes the cells **elongate more** than on the lit side. The shaded side grows **longer**, so the shoot **curves towards the light**.',
  sol: 'Unequal auxin, unequal elongation.',
  scheme: [['Auxin collects on the shaded side', 1], ['Shaded side elongates more, so the shoot curves to light', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('hydro-exp-short', short({
  marks: 3,
  stem: 'Describe an experiment to show that roots grow towards water. State the observation and the conclusion.',
  model: 'Fill a **sieve** with moist sawdust and sow soaked seeds in it; hang it at an **angle** and keep it watered. **Observation:** the roots first grow **down** out of the holes, then **curve back** into the moist sawdust. **Conclusion:** roots are **positively hydrotropic**, and the pull of water here is stronger than that of gravity.',
  sol: 'Sieve with moist sawdust; roots curve back; positive hydrotropism.',
  scheme: [['Set-up', 1], ['Observation', 1], ['Conclusion', 1]],
  d: 3, c: 'application', t: [2],
}));
add('name-short', short({
  marks: 3,
  stem: 'Name the tropism and state whether it is positive or negative: (a) a root grows away from light; (b) a shoot grows upwards in the dark; (c) a pollen tube grows towards the ovule.',
  model: '(a) **Negative phototropism**: the root grows away from light.\n(b) **Negative geotropism**: the shoot grows away from gravity.\n(c) **Positive chemotropism**: the tube grows towards chemicals from the ovule.',
  sol: 'Negative phototropism; negative geotropism; positive chemotropism.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('draw-photo-short', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of a potted seedling in a box with an opening on one side, after a week. Label the light, the shaded side of the stem and the region of bending.',
  model: 'A box with a **slit on one side** and arrows for **light** entering; a seedling in a pot whose shoot **curves towards the slit**; the outer side of the curve labelled **shaded side (more auxin)**; the curve just below the tip labelled **region of bending**.',
  sol: 'Box, light, curved shoot, labels.',
  scheme: [['Box with one-sided light', 1], ['Shoot curving towards the opening', 1], ['Labels: light, shaded side, region of bending', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- 5-mark Question 2 style items
add('passage-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [gibberellins, ethylene, auxins, cytokinins, abscisic acid, stomata, lenticels, roots]\n\nThe shoot tip makes (a) ______, which cause cells to elongate. Dwarf plants grow tall when sprayed with (b) ______. Coconut water is rich in (c) ______, which make cells divide. Ripening fruits release the gas (d) ______. In a drought, abscisic acid closes the (e) ______ of the leaves.',
  acc: [['auxins', 'auxin'], ['gibberellins', 'gibberellin'], ['cytokinins', 'cytokinin'], ['ethylene'], ['stomata']],
  sol: '(a) auxins; (b) gibberellins; (c) cytokinins; (d) ethylene; (e) stomata.',
  d: 2, c: 'understanding', t: [1],
}));
add('passage2-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [positively, negatively, phototropism, chemotropism, thigmotropism, hydrotropism, auxin, light]\n\nA shoot growing towards a window shows (a) ______. A root grows towards the centre of the earth, so it is (b) ______ geotropic, while the shoot is (c) ______ geotropic. A pea tendril winding round a stick shows (d) ______, and a pollen tube growing to the ovule shows (e) ______.',
  acc: [['phototropism'], ['positively'], ['negatively'], ['thigmotropism'], ['chemotropism']],
  sol: '(a) phototropism; (b) positively; (c) negatively; (d) thigmotropism; (e) chemotropism.',
  d: 2, c: 'understanding', t: [2],
}));
add('hormone-match5', match({
  marks: 5,
  stem: 'Study the diagram of a plant and match each lettered part with the action of a growth regulator there.',
  pairs: [
    ['A', 'Makes the hormone that keeps the side buds from growing'],
    ['B', 'Makes a hormone that promotes cell division'],
    ['C', 'Gives off a gas that hastens ripening'],
    ['D', 'Its stomata close under the action of the stress hormone'],
    ['E', 'Lengthens when sprayed with gibberellin'],
  ],
  order: [3, 1, 0, 4, 2],
  sol: 'A shoot tip (auxin, apical dominance); B root tip (cytokinin); C ripening fruit (ethylene); D leaf in dry weather (abscisic acid); E internode (gibberellin).',
  d: 2, c: 'application', t: [1],
  assets: [plantFig],
}));

// ---------------------------------------------------------------- case-based (10 marks, Section B style)
add('pea-case', mk.case({
  passage: `Nisha grew two sets of genetically dwarf pea seedlings. She sprayed set P with plain water and set Q with a dilute solution of a growth regulator first discovered in a fungus that makes rice seedlings grow abnormally tall. After three weeks she measured the mean height of each set.\n\n| Set | Mean height (cm) |\n|---|---|\n| P (water) | ${PEA.water} |\n| Q (regulator) | ${PEA.ga} |`,
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the growth regulator Nisha most likely used.', model: '**Gibberellin** (gibberellic acid).', sol: 'Gibberellin.', scheme: [['Gibberellin', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', num({ marks: 2, stem: 'How many times taller were the set Q seedlings than the set P seedlings?', value: PEA.times, sol: r`$\dfrac{${PEA.ga}}{${PEA.water}} = ${PEA.times}$ times taller.`, scheme: [['Divides the two heights', 1], [`${PEA.times} times`, 1]], d: 2, c: 'application', t: [1] })),
    part('c', short({ marks: 1, wl: null, stem: 'Why did Nisha spray set P with plain water?', model: 'Set P is the **control**: it shows that the extra growth is due to the regulator and not to the spraying or other conditions.', sol: 'Control.', scheme: [['Control for comparison', 1]], d: 2, c: 'understanding', t: [1] })),
    part('d', short({ marks: 3, stem: 'State three other effects of this growth regulator on plants.', model: '1. It **breaks the dormancy** of seeds and buds and starts germination.\n2. It makes rosette plants such as cabbage **bolt** (form a long flowering stalk).\n3. It **enlarges fruits** such as grapes and can produce seedless fruits.', sol: 'Dormancy broken; bolting; larger fruits.', scheme: [['First effect', 1], ['Second effect', 1], ['Third effect', 1]], d: 2, c: 'understanding', t: [1] }), [
      short({ marks: 3, stem: 'Explain how this regulator differs from auxin in where it acts and what it does to a dwarf plant and to lateral buds.', model: 'Gibberellin acts on the **internodes** of the whole stem and makes a dwarf plant **grow tall**; auxin mainly makes cells just **below the shoot tip** elongate and has little effect on dwarfism. Auxin from the tip **suppresses lateral buds** (apical dominance); gibberellin does not.', sol: 'Internodes vs tip; dwarfism; apical dominance.', scheme: [['Site of action', 1], ['Effect on dwarf plants', 1], ['Effect on lateral buds', 1]], d: 3, c: 'analysis', t: [1] }),
    ]),
    part('e', short({ marks: 3, stem: 'Name the hormone that has the opposite effect on seed germination, and state two other effects of it.', model: '**Abscisic acid.** It keeps seeds and buds **dormant**, the opposite of gibberellin. It also **closes the stomata** when water is short, and it promotes the **falling of leaves** and fruits.', sol: 'Abscisic acid: dormancy, stomatal closure, leaf fall.', scheme: [['Abscisic acid', 1], ['First effect', 1], ['Second effect', 1]], d: 3, c: 'analysis', t: [1] })),
  ],
}));
add('cutting-case', mk.case({
  passage: `Rohan runs a rose nursery. He took ${CUT.n * 2} stem cuttings of the same size. He dipped the cut ends of ${CUT.n} of them in a rooting powder and planted the other ${CUT.n} untreated. After four weeks, ${CUT.auxin} of the treated cuttings and ${CUT.control} of the untreated ones had formed roots.`,
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the group of plant hormones present in the rooting powder.', model: '**Auxins** (a synthetic auxin).', sol: 'Auxins.', scheme: [['Auxins', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', num({ marks: 2, stem: 'What percentage of the treated cuttings formed roots?', value: CUT.pctAuxin, unit: '%', sol: r`$\dfrac{${CUT.auxin}}{${CUT.n}} \times 100 = ${CUT.pctAuxin}$ percent.`, scheme: [['Correct fraction of 40', 1], [`${CUT.pctAuxin} percent`, 1]], d: 2, c: 'application', t: [1] })),
    part('c', short({ marks: 2, stem: 'A few untreated cuttings also formed roots. Suggest why.', model: 'The cuttings carry **buds and young leaves** that make their **own auxin**. This natural auxin moves down to the cut end and starts root formation, but more slowly and in fewer cuttings.', sol: 'Natural auxin from buds and leaves.', scheme: [['Cuttings make their own auxin', 1], ['It reaches the cut end, but less', 1]], d: 3, c: 'analysis', t: [1] })),
    part('d', short({ marks: 2, stem: 'State two other uses of auxins in agriculture.', model: '1. Producing **seedless fruits** by spraying flowers.\n2. Preventing the early **drop of fruits** such as apples; synthetic auxins are also used as **weedicides**.', sol: 'Seedless fruits; preventing fruit drop / weedicide.', scheme: [['First use', 1], ['Second use', 1]], d: 2, c: 'understanding', t: [1] })),
    part('e', short({ marks: 3, stem: 'Once the roses had rooted, Rohan pinched off the tip of each shoot. Explain why the plants then became bushy.', model: 'The shoot tip makes **auxin**, which flows down the stem and keeps the **lateral buds dormant**; this is **apical dominance**. Pinching off the tip **removes this source of auxin**, so the **lateral buds start growing** into side branches and the plant becomes bushy.', sol: 'Apical dominance removed.', scheme: [['Tip makes auxin', 1], ['Auxin suppresses lateral buds (apical dominance)', 1], ['Removal lets lateral buds grow', 1]], d: 3, c: 'application', t: [1] })),
  ],
}));
add('ripening-case', mk.case({
  passage: `Farida sells fruit. She found that raw bananas packed in a closed carton with one ripe banana turned yellow in ${BANANA.withRipe} days, while raw bananas kept alone took ${BANANA.alone} days. Her neighbour, who sells leafy vegetables, wants to keep his spinach green for longer.`,
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the gas given off by the ripe banana.', model: '**Ethylene.**', sol: 'Ethylene.', scheme: [['Ethylene', 1]], d: 1, c: 'recall', t: [1] })),
    part('b', num({ stem: 'How many days sooner did the bananas in the carton ripen?', value: BANANA.saved, sol: r`$${BANANA.alone} - ${BANANA.withRipe} = ${BANANA.saved}$ days sooner.`, scheme: [[`${BANANA.saved} days`, 1]], d: 1, c: 'application', t: [1] })),
    part('c', short({ marks: 2, stem: 'Why must the carton be kept closed?', model: 'Ethylene is a **gas**. In a closed carton it is **trapped** and its **concentration builds up** around the raw bananas; in an open carton it would escape into the air.', sol: 'Gas is trapped.', scheme: [['Ethylene is a gas', 1], ['Trapped, concentration builds up', 1]], d: 2, c: 'understanding', t: [1] })),
    part('d', short({ marks: 3, stem: 'Is ethylene a growth promoter or a growth inhibitor? Give a reason and state two other effects of ethylene.', model: 'Ethylene is a **growth inhibitor**, because it brings parts of the plant to the end of their life rather than making them grow. Besides ripening fruits, it hastens the **yellowing (ageing) of leaves** and promotes the **falling of leaves, flowers and fruits**.', sol: 'Inhibitor; ageing; abscission.', scheme: [['Inhibitor with reason', 1], ['First effect', 1], ['Second effect', 1]], d: 2, c: 'understanding', t: [1] }), [
      short({ marks: 3, stem: 'Name the other plant growth inhibitor and state two of its effects.', model: '**Abscisic acid.** It **closes the stomata** when the plant is short of water, so it is called the stress hormone. It keeps **seeds and buds dormant** and promotes the **fall of leaves** in autumn.', sol: 'Abscisic acid: stomata, dormancy.', scheme: [['Abscisic acid', 1], ['First effect', 1], ['Second effect', 1]], d: 2, c: 'understanding', t: [1] }),
    ]),
    part('e', short({ marks: 3, stem: 'Suggest a hormone that could keep the neighbour\'s spinach green for longer and explain how it works.', model: 'A **cytokinin** spray. Cytokinins **delay ageing** (senescence) of leaves: they slow the **breakdown of chlorophyll** and proteins, so the leaves **stay green and fresh** for longer. Ethylene would do the opposite and should be kept away from the spinach.', sol: 'Cytokinin delays senescence.', scheme: [['Cytokinin', 1], ['Delays ageing', 1], ['Chlorophyll kept, leaves stay green', 1]], d: 3, c: 'application', t: [1] })),
  ],
}));
add('window-case', mk.case({
  passage: 'Kavya kept a potted balsam plant on a windowsill. After a week, its stem had curved towards the window. She then turned the pot round so that the stem pointed into the room, and left it for another week.',
  d: 3, c: 'application',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the movement shown by the stem in the first week.', model: '**Positive phototropism.**', sol: 'Positive phototropism.', scheme: [['Positive phototropism', 1]], d: 1, c: 'application', t: [2] })),
    part('b', short({ marks: 2, stem: 'Explain the role of auxin in this movement.', model: 'Auxin from the stem tip moves to the **shaded side**, away from the window. Cells on the shaded side **elongate more** than those facing the light, so the stem **curves towards the window**.', sol: 'Auxin on the shaded side.', scheme: [['Auxin on the shaded side', 1], ['Unequal elongation causes curving', 1]], d: 2, c: 'understanding', t: [2] })),
    part('c', short({ marks: 2, stem: 'Predict what will happen to the stem tip in the second week, and explain.', model: 'The tip will **curve back towards the window**. The side that was lit is now shaded, so **auxin collects there**, those cells elongate more, and the growing part bends **towards the light** again.', sol: 'Bends back to the window.', scheme: [['Tip turns back towards the window', 1], ['Auxin now on the new shaded side', 1]], d: 3, c: 'analysis', t: [2] }), [
      short({ marks: 2, stem: 'Suggest two ways in which Kavya could make the plant grow straight.', model: '1. **Turn the pot** a little every day so that each side gets light in turn.\n2. Keep the plant where light comes **from above**, such as an open courtyard, so that no side is shaded.', sol: 'Rotate the pot; even light.', scheme: [['First way', 1], ['Second way', 1]], d: 3, c: 'application', t: [2] }),
    ]),
    part('d', short({ marks: 2, stem: 'How would the main root of this plant respond to light and to gravity?', model: 'The main root is **negatively phototropic**, growing **away from light**, and **positively geotropic**, growing **down towards gravity**, which takes it deep into the soil.', sol: 'Away from light; towards gravity.', scheme: [['Negative phototropism', 1], ['Positive geotropism', 1]], d: 2, c: 'understanding', t: [2] })),
    part('e', short({ marks: 3, wl: null, stem: 'Draw a neat diagram of the plant at the end of the first week. Show the direction of light and label the shaded side and the region where the stem bends.', model: 'A pot with a stem that is straight below and **curves towards the window** near the top; **arrows for light** coming from the window side; the outer side of the curve labelled **shaded side (more auxin)**; the curve just below the tip labelled **region of bending**.', sol: 'Labelled diagram.', scheme: [['Curved stem towards light', 1], ['Light shown from one side', 1], ['Labels', 1]], d: 3, c: 'application', t: [2] })),
  ],
}));
add('coleoptile-case', mk.case({
  stem: 'Study the diagram and answer the questions.',
  passage: 'A student grew oat seedlings in the dark and then lit them from the right side only. The diagram shows four coleoptiles (young shoots) after a few hours: 1 was left intact, 2 had its tip cut off, 3 had an opaque cap over its tip, and 4 had an opaque collar round its lower part.',
  d: 4, c: 'analysis',
  assets: [colFig],
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Which coleoptiles bent towards the light?', model: 'Coleoptiles **1 and 4**.', sol: '1 and 4.', scheme: [['1 and 4', 1]], d: 1, c: 'application', t: [2] })),
    part('b', short({ marks: 2, stem: 'What do coleoptiles 1 and 2 together show?', model: 'Only the coleoptile **with its tip** bent; without the tip there was **no bending** and little growth. So the **tip** is needed: it produces the growth substance that causes bending.', sol: 'Tip needed.', scheme: [['Tip is needed for bending', 1], ['Tip produces the growth substance', 1]], d: 3, c: 'analysis', t: [2] })),
    part('c', short({ marks: 2, stem: 'What do coleoptiles 3 and 4 together show about where light is sensed and where the bending happens?', model: 'Covering the **tip** stopped bending, but covering the **lower part** did not. So the **tip senses the light**, and an influence passes down to the region **below the tip**, where the bending actually happens.', sol: 'Tip senses; lower region bends.', scheme: [['Tip senses light', 1], ['Bending happens below the tip', 1]], d: 4, c: 'analysis', t: [2] })),
    part('d', short({ marks: 2, stem: 'The cut tip of coleoptile 2 is put back on the stump, over its left half only, and the seedling is kept in the dark. Which way will it bend? Explain.', model: 'It will bend to the **right**. Auxin from the tip flows down only the **left side**, so cells on the left **elongate more**; the longer left side makes the coleoptile curve away from it, even in the dark.', sol: 'Bends right.', scheme: [['Bends to the right', 1], ['Auxin only on the left side, which grows more', 1]], d: 4, c: 'analysis', t: [2] })),
    part('e', short({ marks: 3, stem: 'Name the hormone involved and state two other effects of it in plants.', model: 'The hormone is **auxin**. Apart from causing bending towards light, auxin keeps lateral buds dormant (**apical dominance**) and makes **stem cuttings form roots**; it can also produce seedless fruits.', sol: 'Auxin; apical dominance; rooting.', scheme: [['Auxin', 1], ['First effect', 1], ['Second effect', 1]], d: 2, c: 'understanding', t: [1, 2] })),
  ],
}));
add('sieve-case', mk.case({
  passage: 'Arif sowed soaked gram seeds in a wire sieve filled with moist sawdust and hung the sieve at an angle. He kept the sawdust moist. A week later, the roots had first grown down out of the holes of the sieve and then curved back up into the sawdust.',
  d: 3, c: 'analysis',
  children: [
    part('a', short({ marks: 1, wl: null, stem: 'Name the response shown when the roots first grew down out of the sieve.', model: '**Positive geotropism.**', sol: 'Positive geotropism.', scheme: [['Positive geotropism', 1]], d: 1, c: 'application', t: [2] })),
    part('b', short({ marks: 1, wl: null, stem: 'Name the response shown when the roots curved back into the sawdust.', model: '**Positive hydrotropism.**', sol: 'Positive hydrotropism.', scheme: [['Positive hydrotropism', 1]], d: 1, c: 'application', t: [2] })),
    part('c', short({ marks: 2, stem: 'Which stimulus had the stronger effect on the roots here, and how is this useful to a plant?', model: '**Water** had the stronger effect, because the roots turned **against gravity** to reach the moist sawdust. This helps roots **find water** in the soil, even when it lies sideways or above them.', sol: 'Water stronger.', scheme: [['Water stronger, with evidence', 1], ['Helps roots find water', 1]], d: 3, c: 'analysis', t: [2] })),
    part('d', short({ marks: 3, stem: 'One seedling from the sieve is laid flat on moist cotton in the dark. Describe and explain what its shoot and root will do after two days.', model: 'The **shoot curves upwards**, away from gravity: it is **negatively geotropic**. The **root curves downwards**, towards gravity: it is **positively geotropic**. Auxin collects on the **lower side** of both; it makes shoot cells there grow more, but slows root cells there.', sol: 'Shoot up, root down.', scheme: [['Shoot curves up: negative geotropism', 1], ['Root curves down: positive geotropism', 1], ['Auxin on the lower side, opposite effects', 1]], d: 4, c: 'analysis', t: [2] })),
    part('e', short({ marks: 3, stem: 'Name the tropism shown by (i) the tendrils of a cucumber plant and (ii) a pollen tube. (iii) Why are tropic movements called growth movements?', model: '(i) **Thigmotropism**: tendrils coil round a support they touch.\n(ii) **Chemotropism**: the pollen tube grows towards the ovule.\n(iii) The bending is caused by **unequal growth** (elongation) of cells on two sides of the organ, so it is **slow and permanent**, not a quick reversible movement.', sol: 'Thigmotropism; chemotropism; unequal growth.', scheme: [['(i) thigmotropism', 1], ['(ii) chemotropism', 1], ['(iii) unequal growth on two sides', 1]], d: 2, c: 'understanding', t: [2] })),
  ],
}));
