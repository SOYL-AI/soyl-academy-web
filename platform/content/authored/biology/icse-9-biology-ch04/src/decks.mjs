// ICSE 9 Biology ch04 Pollination and Fertilisation — Part 1 (t01–t03), Part 2 (t04–t05).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { INSECT_WIND, CARPEL, EMBRYOSAC, WATER } from './svgs.mjs';
import { TWO_N, GAMETE_N, ZYGOTE_N, ENDOSPERM_N, TUBE_RATE_MM_PER_H, STYLE_MM, TUBE_HOURS } from './calc.mjs';

export const V = {
  insectWind: svgV(INSECT_WIND, 'An insect-pollinated flower and a wind-pollinated flower with their features labelled'),
  carpel: svgV(CARPEL, 'A pistil with pollen grains on the stigma and a pollen tube growing through the style to the ovule'),
  embryosac: svgV(EMBRYOSAC, 'An embryo sac at fertilisation with two male gametes arriving'),
  water: svgV(WATER, 'Pollination by water in Vallisneria'),
};

export const deck1 = deck({
  part: 1,
  title: 'Pollination and Fertilisation — Part 1: Pollination, its agents and the devices that favour crossing',
  goals: [
    'Distinguish self-pollination from cross-pollination and list the advantages and disadvantages of each',
    'Compare insect-pollinated and wind-pollinated flowers and describe the adaptations of water-pollinated flowers',
    'Explain how unisexuality, dichogamy and self-sterility favour cross-pollination',
  ],
  slides: [
    sl('title', 'Pollination and Fertilisation', {
      b: 'Part 1 — how pollen reaches the stigma, and how plants make sure it comes from another plant.',
      v: flow('LR', [['a', 'Anther'], ['p', 'Pollen grains'], ['v', 'Agent'], ['s', 'Stigma']], [['a', 'p'], ['p', 'v'], ['v', 's']], 'Flow: anther, pollen grains, agent, stigma'),
      n: 'A flower cannot walk to a partner. Yet millions of seeds form every year. The secret is pollination: pollen travels from the anther to the stigma, carried by an agent such as an insect or the wind.',
    }),
    sl('concept', 'Self-pollination and cross-pollination', {
      b: '**Pollination** is the transfer of pollen grains from an anther to a stigma.',
      v: table(['', 'Self-pollination', 'Cross-pollination'], [['Pollen goes from', 'Anther to stigma of the same flower', 'Anther of one flower to stigma of a flower on another plant of the same kind'], ['Flowers needed', 'One flower is enough', 'Two flowers, on different plants'], ['Agent', 'Often none needed', 'Always needed']], 'Table comparing self-pollination with cross-pollination'),
      n: 'In self-pollination, pollen reaches the stigma of its own flower. In cross-pollination, it travels to a flower on a different plant of the same kind. Cross-pollination always needs an outside agent.',
    }),
    sl('concept', 'Advantages and disadvantages', {
      v: table(['', 'Self-pollination', 'Cross-pollination'], [['Advantages', 'Sure to happen; needs no agent; little pollen wasted; keeps good traits', 'New combinations of traits; healthier seedlings; better chance to adapt'], ['Disadvantages', 'Little variation; weaker offspring over many generations', 'Depends on agents; much pollen wasted; may spread poor traits too']], 'Table of advantages and disadvantages of self-pollination and cross-pollination'),
      n: 'Self-pollination is dependable and thrifty, but the offspring all look alike and may weaken over time. Cross-pollination is less certain and wastes pollen, but it brings fresh combinations of traits and stronger, more varied seedlings.',
    }),
    sl('check', 'Quick check: bagged flowers', {
      b: 'A flower bud is covered with a bag before it opens and still sets seed. The pollination must have been…',
      chk: 'chk-bagged',
      n: 'If no agent can reach the flower, which kind of pollination is left?',
    }),
    sl('concept', 'Agents of pollination', {
      v: flow('TB', [['ag', 'Agents'], ['i', 'Insects: bees, butterflies, moths'], ['w', 'Wind: grasses, pine'], ['wa', 'Water: Vallisneria'], ['o', 'Others: birds, bats, snails']], [['ag', 'i'], ['ag', 'w'], ['ag', 'wa'], ['ag', 'o']], 'Flow from agents of pollination to insects, wind, water and others'),
      n: 'Pollen can be carried by insects such as bees and butterflies, by wind, by water, and sometimes by birds, bats or snails. A flower is shaped by the agent it depends on.',
    }),
    sl('diagram', 'An insect flower and a wind flower', {
      b: 'Look at what each flower **offers** and what it **catches**.',
      v: V.insectWind,
      n: 'The insect flower has bright scented petals and nectar to attract visitors, and sticky pollen that clings to a body. The wind flower has no petals or nectar. Its anthers hang out to the breeze and its stigma is large and feathery to catch drifting pollen.',
    }),
    sl('concept', 'Insect-pollinated and wind-pollinated flowers', {
      v: table(['Feature', 'Insect-pollinated', 'Wind-pollinated'], [['Petals', 'Large, bright, scented', 'Small, dull or absent'], ['Nectar', 'Present', 'Absent'], ['Pollen', 'Sticky or spiny; moderate amount', 'Light, dry, smooth; huge amount'], ['Stigma', 'Small and sticky', 'Large, feathery, often hanging out'], ['Anthers', 'Inside the flower', 'Hanging out on long filaments']], 'Table comparing five features of insect-pollinated and wind-pollinated flowers'),
      n: 'Compare feature by feature. Insect flowers advertise and reward visitors. Wind flowers do not need to, so they put their effort into making a great deal of light pollen and catching it well.',
    }),
    sl('example', 'Worked example 1: which agent?', {
      b: 'A plant has small green flowers in a long drooping spike. Anthers hang out on long filaments. The stigmas are feathery. There is no scent and no nectar.',
      ul: ['Step 1: no bright petals, scent or nectar, so insects are **not** being attracted.', 'Step 2: hanging anthers and a feathery stigma are built to **release and catch** drifting pollen.', 'Step 3: so the agent is **wind**.'],
      v: table(['Clue', 'Points to'], [['No petals, scent or nectar', 'Not insects'], ['Hanging anthers, feathery stigma', 'Wind']], 'Worked table: clues pointing away from insects and towards wind'),
      n: 'Work from the clues. Without bright petals, scent or nectar there is nothing to attract insects. Hanging anthers and feathery stigmas are made for wind. So the plant is wind pollinated.',
    }),
    sl('check', 'Quick check: pollen of a wind flower', {
      b: 'Which description fits the pollen of a wind-pollinated flower?',
      chk: 'chk-windpollen',
      n: 'Is it sticky or light? Is there a little or a lot?',
    }),
    sl('diagram', 'Pollination by water', {
      b: 'In **Vallisneria**, male flowers break off and float; the female flower rises to the surface.',
      v: V.water,
      n: 'In Vallisneria, the male flowers form under water, break off and float up to the surface. The female flower is lifted to the surface on a long coiled stalk. The floating male flowers touch the female flower and pollen is transferred.',
    }),
    sl('concept', 'How nature favours cross-pollination', {
      v: table(['Device', 'What happens', 'Example'], [['Unisexuality', 'Male and female flowers are separate, often on different plants', 'Papaya'], ['Dichogamy', 'Anthers and stigma of a flower ripen at different times', 'Sunflower: anthers first (protandry)'], ['Self-sterility', 'Pollen cannot grow on the stigma of the same flower', 'Passion fruit']], 'Table of three devices that favour cross-pollination with an example of each'),
      n: 'Plants have three common devices. In unisexual flowers the sexes are separate. In dichogamy, pollen and stigma are ready at different times. In self-sterility, the flower\'s own pollen simply fails to grow on its own stigma.',
    }),
    sl('example', 'Worked example 2: a protandrous flower', {
      b: 'In a flower, the anthers shed pollen on days one and two after it opens. The stigma is ready only on days three and four.',
      ul: ['Step 1: pollen is shed **before** the stigma is ready.', 'Step 2: so the flower\'s own pollen cannot fertilise it.', 'Step 3: this is **protandry**, a kind of **dichogamy**; only pollen brought from an older flower can work.'],
      v: table(['Day after opening', '1', '2', '3', '4'], [['Anthers shed pollen', 'Yes', 'Yes', 'No', 'No'], ['Stigma ready', 'No', 'No', 'Yes', 'Yes']], 'Worked timeline: anthers shed pollen on days one and two, the stigma is ready on days three and four'),
      n: 'Read the timeline. The pollen is gone before the stigma is ready. The flower cannot pollinate itself, so it must wait for pollen from another flower. If the stigma ripened first, it would be called protogyny.',
    }),
    sl('check', 'Quick check: separate sexes', {
      b: 'True or false: a female papaya flower can be pollinated by its own pollen.',
      chk: 'chk-unisex-tf',
      n: 'Where must the pollen come from?',
    }),
    sl('summary', 'Summary', {
      ul: ['Pollination: pollen from anther to stigma.', 'Self: same flower. Cross: different plants, always needs an agent.', 'Insect flowers attract; wind flowers make light pollen in huge amounts.', 'Water: Vallisneria. Devices for crossing: unisexuality, dichogamy, self-sterility.'],
      v: table(['Agent', 'Typical feature'], [['Insects', 'Bright petals, nectar, sticky pollen'], ['Wind', 'Feathery stigma, light pollen'], ['Water', 'Floating male flowers']], 'Summary table of agents and a typical feature of each'),
      n: 'To recap. Pollination moves pollen to a stigma. Cross-pollination needs an agent, and flowers show clear adaptations to insects, wind or water. Plants also use separate sexes, different ripening times or self-sterility to favour crossing.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Pollination is **not** fertilisation: one moves pollen, the other fuses gametes.', 'In comparisons, give a **matching point** for each side.', 'Name the **example** whenever the question asks for one.', 'Dichogamy: say **which part ripens first**.'],
      n: 'Exam tips. Never confuse pollination with fertilisation. In comparisons, give a matching point for each side. Quote an example when asked. And for dichogamy, say which part ripens first.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Pollination and Fertilisation — Part 2: From pollen to zygote, double fertilisation, fruit and seed',
  goals: [
    'Describe the events from the germination of a pollen grain to the fusion of gametes in the embryo sac',
    'Explain double fertilisation and triple fusion',
    'State which parts of the flower become the fruit and the seed, and why they matter',
  ],
  slides: [
    sl('title', 'From Pollen to Seed', {
      b: 'Part 2 — what happens after the pollen lands.',
      v: flow('LR', [['p', 'Pollen on stigma'], ['t', 'Pollen tube grows'], ['f', 'Fertilisation'], ['s', 'Fruit and seed']], [['p', 't'], ['t', 'f'], ['f', 's']], 'Flow: pollen on stigma, pollen tube grows, fertilisation, fruit and seed'),
      n: 'Landing on the stigma is only the beginning. The pollen must grow a tube down to the ovule, deliver its male gametes, and fuse with the female cells. Only then can a seed form.',
    }),
    sl('diagram', 'The pollen tube on its way', {
      b: 'A pollen grain on a compatible stigma **germinates**; the **pollen tube** grows down the style to the ovule.',
      v: V.carpel,
      n: 'The sugary fluid on the stigma makes the pollen grain germinate. A pollen tube grows out, down the style, through the ovary and into the ovule through its tiny opening, the micropyle. The tube is guided and fed as it grows.',
    }),
    sl('concept', 'Events from pollination to fertilisation', {
      v: table(['Step', 'What happens'], [['1', 'Pollen grain lands on a suitable stigma and absorbs sugary fluid'], ['2', 'It germinates; the tube nucleus leads the pollen tube into the style'], ['3', 'The generative nucleus divides, forming two male gametes'], ['4', 'The tube enters the ovule through the micropyle and reaches the embryo sac'], ['5', 'It bursts and releases the two male gametes']], 'Table of five steps from pollen germination to release of male gametes'),
      n: 'Follow the steps. The grain germinates, and the tube nucleus leads the way. The generative nucleus divides into two male gametes. The tube enters the ovule through the micropyle, reaches the embryo sac and releases the gametes.',
    }),
    sl('check', 'Quick check: where the tube enters', {
      b: 'The pollen tube enters the ovule through the…',
      chk: 'chk-micropyle',
      n: 'Name the small opening in the ovule.',
    }),
    sl('example', 'Worked example 1: how long will the tube take?', {
      b: `A pollen tube grows at a steady ${TUBE_RATE_MM_PER_H} millimetres each hour. The style is ${STYLE_MM} millimetres long (imagined values).`,
      ul: ['Step 1: time = length of style ÷ rate of growth.', `Step 2: ${STYLE_MM} ÷ ${TUBE_RATE_MM_PER_H} = ${TUBE_HOURS}.`, `Step 3: the tube needs about ${TUBE_HOURS} hours to cross the style.`],
      v: table(['Style length', 'Growth rate', 'Time'], [[`${STYLE_MM} mm`, `${TUBE_RATE_MM_PER_H} mm per hour`, `${TUBE_HOURS} hours`]], 'Worked table: fifteen millimetres at three millimetres an hour takes five hours'),
      n: 'Divide the length by the rate. Fifteen divided by three is five. So the tube needs about five hours to cross the style. Real tubes vary in speed, but the method is the same.',
    }),
    sl('diagram', 'Inside the embryo sac', {
      b: 'Egg cell and two **synergids** at the micropyle end; **polar nuclei** in the centre; three **antipodal cells** at the far end.',
      v: V.embryosac,
      n: 'The embryo sac holds the female cells. The egg cell sits at the micropyle end with two synergids beside it. Two polar nuclei lie in the centre. Three antipodal cells lie at the far end. The pollen tube delivers two male gametes.',
    }),
    sl('concept', 'Double fertilisation and triple fusion', {
      v: flow('LR', [['m1', 'Male gamete one + egg cell'], ['z', 'Zygote (fertilisation)'], ['m2', 'Male gamete two + two polar nuclei'], ['e', 'Primary endosperm nucleus (triple fusion)']], [['m1', 'z'], ['m2', 'e']], 'Flow: one male gamete with the egg cell gives the zygote; the other with two polar nuclei gives the primary endosperm nucleus by triple fusion'),
      n: 'Two fusions happen in one embryo sac, which is why it is called double fertilisation. One male gamete fuses with the egg cell to form the zygote. The other fuses with the two polar nuclei. Three nuclei joining is called triple fusion.',
    }),
    sl('check', 'Quick check: triple fusion', {
      b: 'Triple fusion produces the…',
      chk: 'chk-triple',
      n: 'Which tissue stores food for the embryo?',
    }),
    sl('example', 'Worked example 2: counting chromosomes', {
      b: `A tomato plant has ${TWO_N} chromosomes in its body cells.`,
      ul: [`Step 1: a gamete has half the number: ${TWO_N} ÷ 2 = ${GAMETE_N}.`, `Step 2: zygote = egg + male gamete = ${GAMETE_N} + ${GAMETE_N} = ${ZYGOTE_N}.`, `Step 3: endosperm = two polar nuclei + one male gamete = 3 × ${GAMETE_N} = ${ENDOSPERM_N}.`],
      v: table(['Structure', 'Chromosomes'], [['Gamete', String(GAMETE_N)], ['Zygote and embryo', String(ZYGOTE_N)], ['Endosperm', String(ENDOSPERM_N)]], 'Worked table: gamete twelve, zygote and embryo twenty-four, endosperm thirty-six'),
      n: 'Start with the gamete. A tomato gamete has twelve chromosomes, half of twenty-four. The zygote receives twelve from each gamete, so it has twenty-four. The endosperm has three sets of twelve, which is thirty-six.',
    }),
    sl('concept', 'From flower to fruit and seed', {
      v: table(['Flower part', 'Becomes'], [['Ovary', 'Fruit'], ['Ovary wall', 'Fruit wall (pericarp)'], ['Ovule', 'Seed'], ['Integuments', 'Seed coat'], ['Zygote', 'Embryo'], ['Primary endosperm nucleus', 'Endosperm (food store)'], ['Petals, stamens, style, stigma', 'Wither and fall (usually)']], 'Table of flower parts and what each becomes after fertilisation'),
      n: 'After fertilisation the ovary becomes the fruit and the ovule becomes the seed. The zygote grows into the embryo, the endosperm stores food, and the integuments harden into the seed coat. Petals and stamens usually wither.',
    }),
    sl('check', 'Quick check: ovary or ovule', {
      b: 'Which part of the flower becomes the fruit?',
      chk: 'chk-fruit',
      n: 'The fruit is the swollen part that holds the seeds.',
    }),
    sl('concept', 'Why fruit and seed matter', {
      v: table(['', 'Role'], [['Seed', 'Holds the embryo and its food store; survives dry or cold periods; grows into a new plant'], ['Fruit', 'Protects the seeds; helps spread them by wind, water or animals']], 'Table of the roles of seed and fruit'),
      n: 'A seed protects the embryo and supplies food, and can wait until conditions are right. The fruit protects the seeds and helps scatter them, so new plants do not crowd the parent.',
    }),
    sl('summary', 'Summary', {
      ul: ['Pollen germinates on the stigma; the tube grows to the embryo sac through the micropyle.', 'One male gamete + egg gives the zygote; the other + two polar nuclei gives the primary endosperm nucleus.', 'Ovary becomes the fruit; ovule becomes the seed.'],
      v: table(['Event', 'Product'], [['Fertilisation', 'Zygote'], ['Triple fusion', 'Endosperm'], ['Ovule changes', 'Seed'], ['Ovary changes', 'Fruit']], 'Summary table of events and their products'),
      n: 'To recap. The pollen tube delivers two male gametes. One forms the zygote with the egg. The other joins the polar nuclei for the endosperm. The ovule becomes the seed and the ovary becomes the fruit.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Name the **opening** the tube uses: the **micropyle**.', 'Double fertilisation = **two** fusions; triple fusion is **one of them**.', 'Show **working** in chromosome counts.', 'Fruit comes from the **ovary**, seed from the **ovule**.'],
      n: 'Exam tips. Name the micropyle as the entrance. Remember that triple fusion is one of the two fusions of double fertilisation. Show your working in chromosome counts. And keep ovary and ovule apart.',
    }),
  ],
});

