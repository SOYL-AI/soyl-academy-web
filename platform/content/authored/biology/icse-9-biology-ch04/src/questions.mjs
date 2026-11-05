// ICSE 9 Biology ch04 Pollination and Fertilisation — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-biology-ch01/src/lib.mjs';
import { SET_P, SET_Q, SET_R, SET_S, BUDS, SUGAR, GRAINS, BEST, SAGE_POLLEN, GRASS_POLLEN, POLLEN_RATIO, STYLE2_MM, TUBE_RATE_MM_PER_H, TUBE2_HOURS, SEEDS, MALE_GAMETES_USED, PG_STIGMA_DAYS, PG_ANTHER_DAYS, PG_GAP_DAYS, PEA_2N, PEA_GAMETE, PEA_ENDOSPERM, TWO_N, GAMETE_N } from './calc.mjs';
import { CARPEL_LETTERED, EMBRYOSAC_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const carpelFig = svgV(CARPEL_LETTERED, 'A pistil after pollination with parts lettered A to F');
const sacFig = svgV(EMBRYOSAC_LETTERED, 'An embryo sac at fertilisation with parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-bagged', mcq({
  stem: 'A flower bud is covered with a bag before it opens and still sets seed. The pollination must have been',
  right: 'self-pollination', wrong: ['cross-pollination by insects', 'cross-pollination by wind', 'pollination by water'],
  sol: 'The bag keeps out every agent, so only the flower\'s own pollen can reach the stigma — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chk-windpollen', mcq({
  stem: 'Which description fits the pollen of a wind-pollinated flower?',
  right: 'Light, dry and produced in huge amounts', wrong: ['Sticky and produced in small amounts', 'Heavy, spiny and scented', 'Sticky and produced in huge amounts'],
  sol: 'Drifting pollen must be light and plentiful, because most grains never reach a stigma — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-unisex-tf', tf({
  stem: 'A female papaya flower can be pollinated by its own pollen.',
  key: 'f',
  sol: 'False. A female flower has only a pistil and makes no pollen, so its pollen must come from another flower.',
  d: 2, c: 'understanding', t: [3],
}));
add('chk-micropyle', mcq({
  stem: 'The pollen tube enters the ovule through the',
  right: 'micropyle', wrong: ['stigma', 'style', 'filament'],
  sol: 'The tiny opening in the ovule is the micropyle — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chk-triple', mcq({
  stem: 'Triple fusion produces the',
  right: 'primary endosperm nucleus', wrong: ['zygote', 'pollen tube', 'seed coat'],
  sol: 'A male gamete fuses with two polar nuclei to give the primary endosperm nucleus — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('chk-fruit', mcq({
  stem: 'Which part of the flower becomes the fruit?',
  right: 'Ovary', wrong: ['Ovule', 'Stigma', 'Style'],
  sol: 'The ovary becomes the fruit; the ovules inside it become seeds — option (@K).',
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t01 self- and cross-pollination
add('rose-mcq', mcq({
  stem: 'A gardener brushes pollen from the anthers of one rose bush on to the stigmas of a different rose bush. This is',
  right: 'cross-pollination', wrong: ['self-pollination', 'fertilisation', 'germination'],
  sol: 'Pollen moved to a flower on a different plant of the same kind is cross-pollination — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('selfadv-mcq', mcq({
  stem: 'A farmer prefers a crop that is mostly self-pollinated, because every plant in the field then',
  right: 'keeps the same useful traits as its parent', wrong: ['carries new combinations of traits', 'needs insects to visit it', 'wastes large amounts of pollen'],
  sol: 'Self-pollination gives offspring very like the parent, so the useful traits are kept — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('crossdis-mcq', mcq({
  stem: 'Which of these is a disadvantage of cross-pollination?',
  right: 'It depends on an outside agent and wastes much pollen', wrong: ['It always gives weaker seedlings', 'It never needs a stigma', 'It produces no variation'],
  sol: 'Cross-pollination relies on agents and much pollen is lost — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-self', ar({
  a: 'Self-pollination can take place in a flower that has no insect visitors.',
  r: 'Cross-pollination brings new combinations of traits to the seed.',
  key: 'd',
  sol: 'Both are true, but the second statement does not explain the first — option (d).',
  d: 2, c: 'analysis', t: [1],
}));
add('self-tf', tf({
  stem: 'Cross-pollination always needs an agent such as insects or wind.',
  key: 't',
  sol: 'True. The pollen has to travel between two different plants, so an agent is needed.',
  d: 1, c: 'recall', t: [1],
}));
add('term-poll', term({
  stem: 'Give the biological term: the transfer of pollen grains from an anther to a stigma.',
  model: '**Pollination.**', sol: 'Pollination.', sch: 'Pollination',
  d: 1, c: 'recall', t: [1],
}));
add('reason-cross', term({
  stem: 'Give reason: seedlings from cross-pollinated flowers are usually more varied than seedlings from self-pollinated flowers.',
  model: 'Pollen from a **different plant** brings a **new combination of traits** to the seed.', sol: 'Different parents give new combinations.', sch: 'New combinations of traits',
  d: 2, c: 'understanding', t: [1],
}));
add('selfcross-short', short({
  marks: 2,
  stem: 'Distinguish between self-pollination and cross-pollination on the basis of where the pollen goes and whether an agent is needed.',
  model: 'In **self-pollination** pollen reaches the stigma of the **same flower** (or plant) and **often needs no agent**. In **cross-pollination** pollen goes to a flower on a **different plant** of the same kind and an **agent is always needed**.',
  sol: 'Same flower, no agent; different plant, agent.',
  scheme: [['Self-pollination: same flower, often no agent', 1], ['Cross-pollination: different plant, agent needed', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('advantages-short', short({
  marks: 3,
  stem: 'State three advantages of cross-pollination over self-pollination.',
  model: '1. It brings **new combinations of traits**, so seedlings are more varied.\n2. Seedlings are usually **healthier and stronger**.\n3. The species has a **better chance to adapt** when conditions change.',
  sol: 'Variation; vigour; adaptation.',
  scheme: [['First advantage', 1], ['Second advantage', 1], ['Third advantage', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('compare-table', short({
  marks: 3,
  stem: 'Tabulate three differences between self-pollination and cross-pollination.',
  model: '| Self-pollination | Cross-pollination |\n|---|---|\n| Pollen goes to the **same flower** | Pollen goes to a flower on **another plant** |\n| **Often needs no agent** | **Always needs an agent** |\n| **Little pollen wasted** | **Much pollen wasted** |\n| **Little variation** | **More variation** |',
  sol: 'Destination; agent; wastage; variation.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 agents and adaptations
add('windflower-mcq', mcq({
  stem: 'A flower on a drooping spike has no petals, no scent and no nectar. Its anthers swing out on long threads. It is most likely pollinated by',
  right: 'wind', wrong: ['bees', 'butterflies', 'water'],
  sol: 'Anthers that dangle and no means of attracting insects point to wind — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('insectflower-mcq', mcq({
  stem: 'A flower has large pink petals, a sweet scent and sticky pollen. The sticky pollen is useful because it',
  right: 'clings to the body of a visiting insect', wrong: ['floats on water', 'is blown far by wind', 'makes the petals bright'],
  sol: 'Sticky pollen sticks to an insect and is carried to the next flower — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('feathery-mcq', mcq({
  stem: 'A wind-pollinated flower has a large, feathery stigma. This helps the flower to',
  right: 'catch pollen grains drifting in the air', wrong: ['attract bees with its colour', 'store nectar', 'protect the ovule'],
  sol: 'A large feathery surface traps pollen carried by air — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('vallis-mcq', mcq({
  stem: 'In Vallisneria, pollination takes place when',
  right: 'floating male flowers touch the female flower at the water surface', wrong: ['bees carry pollen under the water', 'wind blows pollen into the mud', 'the female flower is pulled under the water'],
  sol: 'Male flowers break off, float up and touch the female flower — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('wind-num', num({
  stem: `A sage flower makes ${SAGE_POLLEN} pollen grains and a grass flower makes ${GRASS_POLLEN} pollen grains. How many times more pollen does the grass flower make?`,
  value: POLLEN_RATIO,
  sol: r`$${GRASS_POLLEN} \div ${SAGE_POLLEN} = ${POLLEN_RATIO}$ times.`,
  scheme: [[`${POLLEN_RATIO}`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 20 || 'value');
add('ar-wind', ar({
  a: 'A wind-pollinated flower makes a very large amount of pollen.',
  r: 'Most of the pollen carried by wind never reaches a stigma.',
  key: 'c',
  sol: 'Both are true, and the loss of most pollen explains why so much is made — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-bright', ar({
  a: 'Wind-pollinated flowers usually have large, brightly coloured petals.',
  r: 'Wind-pollinated flowers have no need to attract insects.',
  key: 'b',
  sol: 'The assertion is false: wind flowers usually have small, dull petals or none. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('wind-tf', tf({
  stem: 'The pollen grains of a wind-pollinated flower are usually heavy and sticky.',
  key: 'f',
  sol: 'False. They are light, dry and smooth so that the wind can carry them.',
  d: 1, c: 'recall', t: [2],
}));
add('term-nectar', term({
  stem: 'Give the biological term: the sweet liquid made by many flowers to reward insect visitors.',
  model: '**Nectar.**', sol: 'Nectar.', sch: 'Nectar',
  d: 1, c: 'recall', t: [2],
}));
add('odd-wind', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Bright petals, Nectar, Scent, Feathery stigma.',
  model: '**Feathery stigma**; the others are **features of insect-pollinated flowers**.', sol: 'The feathery stigma belongs to wind-pollinated flowers.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2],
}));
add('reason-wind', term({
  stem: 'Give reason: a wind-pollinated flower does not make nectar.',
  model: 'It does not need to **attract insects**, because **wind** carries its pollen.', sol: 'Wind, not insects, is the agent.', sch: 'No insects needed',
  d: 2, c: 'understanding', t: [2],
}));
add('wind-short', short({
  marks: 2,
  stem: 'State two features of the anthers and the stigma of a wind-pollinated flower that help in pollination.',
  model: 'The **anthers hang out on long filaments**, so the wind can shake the pollen loose. The **stigma is large and feathery**, so it can catch pollen grains drifting in the air.',
  sol: 'Hanging anthers; feathery stigma.',
  scheme: [['Anthers hang out on long filaments', 1], ['Large, feathery stigma', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('insect-short', short({
  marks: 2,
  stem: 'State two ways in which an insect-pollinated flower attracts visiting insects.',
  model: 'Its **petals are large, bright and scented**, and it makes **nectar** as a reward for the visitor.',
  sol: 'Bright scented petals; nectar.',
  scheme: [['Bright or scented petals', 1], ['Nectar', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('water-short', short({
  marks: 3,
  stem: 'Describe how pollination is brought about in Vallisneria.',
  model: '1. The **male flowers** form **under water**, break off and **float** to the surface.\n2. The **female flower** is carried to the surface by a **long, coiled stalk**.\n3. The floating male flowers **touch the female flower** and pollen is **transferred to the stigma**.',
  sol: 'Male flowers float; female on coiled stalk; contact.',
  scheme: [['Male flowers break off and float', 1], ['Female flower reaches the surface on a coiled stalk', 1], ['Pollen transferred on contact', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('insect-wind-table', short({
  marks: 3,
  stem: 'Tabulate three differences between an insect-pollinated flower and a wind-pollinated flower.',
  model: '| Insect-pollinated | Wind-pollinated |\n|---|---|\n| **Large, bright, scented** petals | Petals **small, dull or absent** |\n| **Nectar** present | **No nectar** |\n| Pollen **sticky**, moderate amount | Pollen **light and dry**, huge amount |\n| Stigma **small and sticky** | Stigma **large and feathery** |',
  sol: 'Petals; nectar; pollen; stigma.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 how nature favours cross-pollination
add('papaya-mcq', mcq({
  stem: 'Some papaya trees in an orchard bear flowers with only stamens; others bear flowers with only a pistil and are the only ones that fruit. Fruit forms only after pollen arrives from the first group because these flowers are',
  right: 'unisexual and on separate plants', wrong: ['bisexual and self-sterile', 'protandrous and bisexual', 'complete and self-pollinated'],
  sol: 'Male and female flowers on different plants force cross-pollination — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('dicho-mcq', mcq({
  stem: 'In a bisexual flower the stigma becomes receptive several days after the anthers have shed their pollen. This condition is',
  right: 'protandry', wrong: ['protogyny', 'self-sterility', 'unisexuality'],
  sol: 'Anthers ripening first is protandry — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('selfster-mcq', mcq({
  stem: 'Pollen from a flower is placed on its own stigma but no pollen tube grows. This device that favours cross-pollination is',
  right: 'self-sterility', wrong: ['protandry', 'unisexuality', 'protogyny'],
  sol: 'Pollen that cannot grow on its own stigma shows self-sterility — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-dicho', ar({
  a: 'Dichogamy helps to prevent self-pollination in a bisexual flower.',
  r: 'In dichogamy the anthers and the stigma of the flower ripen at different times.',
  key: 'c',
  sol: 'Both are true; ripening at different times is how dichogamy prevents self-pollination — option (c).',
  d: 2, c: 'analysis', t: [3],
}));
add('ar-unisex', ar({
  a: 'In papaya, cross-pollination is the only way to set fruit.',
  r: 'Papaya plants have bisexual flowers.',
  key: 'a',
  sol: 'The assertion is true, because the sexes are on different plants. The reason is false: papaya flowers are unisexual — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('term-dicho', term({
  stem: 'Give the biological term: the condition in which the anthers and the stigma of the same flower ripen at different times.',
  model: '**Dichogamy.**', sol: 'Dichogamy.', sch: 'Dichogamy',
  d: 1, c: 'recall', t: [3],
}));
add('odd-device', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Unisexuality, Dichogamy, Self-sterility, Nectar.',
  model: '**Nectar**; the others are **devices that favour cross-pollination**.', sol: 'Nectar attracts insects; it is not a device that prevents self-pollination.', sch: 'Odd one and category',
  d: 3, c: 'analysis', t: [3],
}));
add('gap-num', num({
  stem: `In a flower the stigma is receptive on days ${PG_STIGMA_DAYS[0]} and ${PG_STIGMA_DAYS[1]} after it opens, and the anthers shed pollen on days ${PG_ANTHER_DAYS[0]} and ${PG_ANTHER_DAYS[1]}. How many whole days lie between the last receptive day of the stigma and the first pollen day?`,
  value: PG_GAP_DAYS - 1,
  sol: r`The stigma is last receptive on day ${PG_STIGMA_DAYS[1]} and pollen is first shed on day ${PG_ANTHER_DAYS[0]}, so the empty days are those between them: $${PG_ANTHER_DAYS[0]} - ${PG_STIGMA_DAYS[1]} - 1 = ${PG_GAP_DAYS - 1}$ (day 3).`,
  scheme: [[`${PG_GAP_DAYS - 1}`, 1]],
  d: 3, c: 'application', t: [3],
}), (q) => q.answer.value === 1 || 'value');
add('device-short', short({
  marks: 2,
  stem: 'Name two devices by which nature favours cross-pollination and give an example of one of them.',
  model: '**Unisexuality** (separate male and female flowers, for example **papaya**), **dichogamy** (anthers and stigma ripen at different times) or **self-sterility** (own pollen cannot grow on the stigma). Any two with one example.',
  sol: 'Any two devices with an example.',
  scheme: [['Two devices named', 1], ['One example', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('dicho-short', short({
  marks: 3,
  stem: 'Explain how dichogamy favours cross-pollination. Name the two kinds of dichogamy and state which part ripens first in each.',
  model: 'When the anthers and the stigma of a flower ripen at **different times**, the pollen of the flower is **not ready when its own stigma is receptive**, so pollen must come from **another flower**. In **protandry** the **anthers ripen first**; in **protogyny** the **stigma ripens first**.',
  sol: 'Different times prevent self-pollination; protandry anthers first; protogyny stigma first.',
  scheme: [['Different ripening times prevent self-pollination', 1], ['Protandry: anthers first', 1], ['Protogyny: stigma first', 1]],
  d: 3, c: 'application', t: [3],
}));
add('unisex-short', short({
  marks: 2,
  stem: 'Why does unisexuality favour cross-pollination? Name one plant that shows it with male and female flowers on different plants.',
  model: 'Male and female flowers on **different plants** mean that pollen has to be carried from one plant to another, which is **cross-pollination**. Example: **papaya**.',
  sol: 'Separate plants force crossing; papaya.',
  scheme: [['Pollen must travel between plants', 1], ['Example papaya', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 from pollination to fertilisation
add('germ-mcq', mcq({
  stem: 'A pollen grain placed on a suitable stigma takes up sugary fluid and then produces a thread-like outgrowth. This outgrowth is the',
  right: 'pollen tube', wrong: ['micropyle', 'style', 'filament'],
  sol: 'The germinating pollen grain produces the pollen tube — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('gen-mcq', mcq({
  stem: 'In a growing pollen tube, the generative nucleus divides to form',
  right: 'two male gametes', wrong: ['two egg cells', 'a zygote and an endosperm', 'two polar nuclei'],
  sol: 'The generative nucleus gives two male gametes — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('figE-mcq', mcq({
  stem: 'In the figure of a pistil after pollination, which letter marks the small opening through which the pollen tube enters the ovule?',
  right: 'F', wrong: ['B', 'D', 'E'],
  sol: 'F is the micropyle; A is the stigma, B the pollen tube, C the style, D the ovary wall and E the ovule — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [carpelFig],
}));
add('figB-mcq', mcq({
  stem: 'In the figure of a pistil after pollination, which letter marks the structure that carries the male gametes towards the ovule?',
  right: 'B', wrong: ['A', 'C', 'E'],
  sol: 'B is the pollen tube — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [carpelFig],
}));
add('sac-mcq', mcq({
  stem: 'Which cells lie at the end of the embryo sac that is farthest from the micropyle?',
  right: 'Antipodal cells', wrong: ['Synergids', 'Egg cell', 'Polar nuclei'],
  sol: 'Three antipodal cells lie at the end farthest from the micropyle — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('ar-tube', ar({
  a: 'A pollen tube cannot grow from a pollen grain that has fallen on a dry, bare surface.',
  r: 'A pollen grain germinates after taking up the sugary fluid on a suitable stigma.',
  key: 'c',
  sol: 'Both are true, and the need for the sugary fluid explains why a bare, dry surface does not work — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('tube-tf', tf({
  stem: 'Pollination and fertilisation mean the same thing.',
  key: 'f',
  sol: 'False. Pollination is the transfer of pollen to a stigma; fertilisation is the fusion of a male gamete with an egg cell.',
  d: 1, c: 'understanding', t: [4],
}));
add('term-micro', term({
  stem: 'Give the biological term: the small opening in the ovule through which the pollen tube enters.',
  model: '**Micropyle.**', sol: 'Micropyle.', sch: 'Micropyle',
  d: 1, c: 'recall', t: [4],
}));
add('odd-sac', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Egg cell, Synergid, Antipodal cell, Pollen tube.',
  model: '**Pollen tube**; the others are **parts of the embryo sac**.', sol: 'The pollen tube grows from a pollen grain.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [4],
}));
add('tube-num', num({
  stem: `A pollen tube grows at ${TUBE_RATE_MM_PER_H} millimetres each hour through a style that is ${STYLE2_MM} millimetres long. How many hours does it take to reach the ovary?`,
  value: TUBE2_HOURS,
  sol: r`$${STYLE2_MM} \div ${TUBE_RATE_MM_PER_H} = ${TUBE2_HOURS}$ hours.`,
  scheme: [[`${TUBE2_HOURS}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 7 || 'value');
add('events-short', short({
  marks: 2,
  stem: 'State what happens to the generative nucleus and to the tube nucleus as the pollen tube grows.',
  model: 'The **tube nucleus** leads the pollen tube down the style. The **generative nucleus divides** to form **two male gametes**.',
  sol: 'Tube nucleus leads; generative nucleus gives two gametes.',
  scheme: [['Tube nucleus leads the tube', 1], ['Generative nucleus forms two male gametes', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('journey-short', short({
  marks: 3,
  stem: 'Describe the path of a pollen grain from the stigma until its male gametes reach the embryo sac.',
  model: 'The pollen grain **germinates** on the stigma and the **pollen tube** grows **down the style** and through the ovary. It enters the ovule through the **micropyle**, reaches the **embryo sac**, and **releases two male gametes** there.',
  sol: 'Germinates; tube through style and ovary; micropyle; embryo sac.',
  scheme: [['Germinates and tube grows down the style', 1], ['Enters the ovule through the micropyle', 1], ['Releases two male gametes in the embryo sac', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('carpel-match5', match({
  marks: 5,
  stem: 'Study the diagram of a pistil after pollination and match each lettered part with its description.',
  pairs: [
    ['A', 'Sticky top that receives the pollen grains'],
    ['B', 'Grows down from a pollen grain and carries the male gametes'],
    ['D', 'Outer layer of the swollen base that later forms the fruit wall'],
    ['E', 'Small body that becomes the seed'],
    ['F', 'Opening through which the pollen tube enters'],
  ],
  order: [3, 1, 4, 2, 0],
  sol: 'A stigma; B pollen tube; D ovary wall; E ovule; F micropyle.',
  d: 2, c: 'application', t: [4],
  assets: [carpelFig],
}));

// ---------------------------------------------------------------- t05 double fertilisation, fruit and seed
add('double-mcq', mcq({
  stem: 'In an embryo sac, one male gamete fuses with the egg cell and the other fuses with the two polar nuclei. This whole process is called',
  right: 'double fertilisation', wrong: ['dichogamy', 'self-pollination', 'germination'],
  sol: 'Two fusions in one embryo sac make double fertilisation — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('endo-mcq', mcq({
  stem: 'The primary endosperm nucleus develops into a tissue that',
  right: 'stores food for the growing embryo', wrong: ['carries pollen to the ovule', 'forms the petals of the next flower', 'forms the seed coat'],
  sol: 'The endosperm is a food store — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('seed-mcq', mcq({
  stem: 'After fertilisation in a pea flower, the part that becomes the pod with its seeds inside is the',
  right: 'ovary, with the ovules inside', wrong: ['stigma, with the pollen tube', 'petals, with the sepals', 'style, with the stamens'],
  sol: 'The ovary becomes the fruit (here the pod) and the ovules become the seeds — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ar-fert', ar({
  a: 'Triple fusion produces the zygote.',
  r: 'Two polar nuclei fuse with a male gamete during triple fusion.',
  key: 'b',
  sol: 'The assertion is false: triple fusion produces the primary endosperm nucleus; the zygote comes from the male gamete and the egg. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [5],
}));
add('seedcoat-tf', tf({
  stem: 'The seed coat is formed from the integuments of the ovule.',
  key: 't',
  sol: 'True. The integuments harden into the seed coat.',
  d: 2, c: 'recall', t: [5],
}));
add('term-zygote', term({
  stem: 'Give the biological term: the cell formed by the fusion of a male gamete with the egg cell.',
  model: '**Zygote.**', sol: 'Zygote.', sch: 'Zygote',
  d: 1, c: 'recall', t: [5],
}));
add('reason-fruit', term({
  stem: 'Give reason: the petals and stamens of a flower usually wither after fertilisation.',
  model: 'Their work (attracting insects and making pollen) is **over**; the **ovary** and **ovules** now develop into the **fruit and seeds**.', sol: 'Work is over.', sch: 'Work is over',
  d: 2, c: 'understanding', t: [5],
}));
add('pea-num', num({
  stem: `A pea plant has ${PEA_2N} chromosomes in each body cell. How many chromosomes are there in the primary endosperm nucleus formed by two polar nuclei and one male gamete?`,
  value: PEA_ENDOSPERM,
  sol: r`Each gamete or polar nucleus has $${PEA_2N} \div 2 = ${PEA_GAMETE}$; three nuclei give $3 \times ${PEA_GAMETE} = ${PEA_ENDOSPERM}$.`,
  scheme: [[`${PEA_ENDOSPERM}`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 21 || 'value');
add('fruitseed-short', short({
  marks: 2,
  stem: 'State what each of the following becomes after fertilisation: (i) ovary, (ii) ovule.',
  model: '(i) The **ovary** becomes the **fruit**, which protects the seeds. (ii) The **ovule** becomes the **seed**, which holds the embryo and its stored food.',
  sol: 'Ovary to fruit; ovule to seed.',
  scheme: [['Ovary becomes the fruit', 1], ['Ovule becomes the seed', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('triple-short', short({
  marks: 3,
  stem: 'Explain double fertilisation. State what is formed by each fusion.',
  model: 'Two male gametes are released in the embryo sac and **two fusions** take place. **One male gamete fuses with the egg cell** to form the **zygote**. **The other fuses with the two polar nuclei** (**triple fusion**) to form the **primary endosperm nucleus**.',
  sol: 'Two fusions; zygote; primary endosperm nucleus.',
  scheme: [['Two fusions in one embryo sac', 1], ['Egg plus gamete gives zygote', 1], ['Polar nuclei plus gamete gives primary endosperm nucleus', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('signif-short', short({
  marks: 3,
  stem: 'State the significance of (i) a seed and (ii) a fruit to a plant.',
  model: '(i) The **seed** holds the **embryo with its food store**, can **survive dry or cold periods** and **grows into a new plant**. (ii) The **fruit protects the seeds** and **helps to spread them** by wind, water or animals.',
  sol: 'Seed: embryo, food, survival; fruit: protection, spread.',
  scheme: [['Seed holds embryo and food', 1], ['Seed survives bad periods and grows', 1], ['Fruit protects and spreads seeds', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('bagging-long', long({
  marks: 10, wl: null,
  stem: `A student studies tomato flowers. She uses ${BUDS} buds in each of four sets. Set P: buds bagged with anthers left in place. Set Q: anthers removed, stigmas dusted with pollen from another plant, then bagged. Set R: anthers removed and bagged, no pollen added. Set S: buds left open. The number of buds that formed fruit was P ${SET_P.fruit}, Q ${SET_Q.fruit}, R ${SET_R.fruit}, S ${SET_S.fruit}.\n\n(a) Which set shows self-pollination and which shows cross-pollination? [2]\n\n(b) Calculate the percentage of buds that formed fruit in sets P and S. [2]\n\n(c) Explain why no fruit formed in set R. [2]\n\n(d) Draw a neat, labelled diagram of an insect-pollinated flower, labelling four features that attract insects or catch pollen. [4]`,
  model: `**(a)** **P** shows self-pollination (own pollen, no other pollen can enter the bag). **Q** shows cross-pollination (pollen from another plant).\n\n**(b)** P: ${SET_P.fruit} ÷ ${BUDS} × 100 = **${SET_P.pct}%**. S: ${SET_S.fruit} ÷ ${BUDS} × 100 = **${SET_S.pct}%**.\n\n**(c)** The anthers were removed and the bag kept out every agent, so **no pollen reached the stigma**; without pollination there is **no fertilisation and no fruit**.\n\n**(d)** A flower with **large bright scented petals**, **nectar**, a **sticky stigma** and **sticky pollen on anthers inside**; four labels with ruled lines.`,
  sol: `P self; Q cross; ${SET_P.pct}% and ${SET_S.pct}%; no pollen reached the stigma; labelled insect flower.`,
  scheme: [['P self-pollination', 1], ['Q cross-pollination', 1], [`P ${SET_P.pct}%`, 1], [`S ${SET_S.pct}%`, 1], ['No pollen reached the stigma', 1], ['No pollination, so no fertilisation or fruit', 1], ['Flower drawn with petals, stigma and anthers', 2], ['Four labels', 2]],
  d: 3, c: 'analysis', t: [1, 2],
}), (q) => SET_P.pct === 85 && SET_S.pct === 90 || 'pct');
add('sugar-long', long({
  marks: 10, wl: null,
  stem: `Pollen grains of one plant are placed in sugar solutions of different strength and ${GRAINS} grains are counted on each slide after some hours. Grains that germinated: 0 percent sugar ${SUGAR[0].germ}; 5 percent ${SUGAR[1].germ}; 10 percent ${SUGAR[2].germ}; 15 percent ${SUGAR[3].germ}; 20 percent ${SUGAR[4].germ}.\n\n(a) Calculate the percentage of grains that germinated in the 0 percent and the ${BEST.conc} percent solutions. [2]\n\n(b) Which solution was best for germination? What does this suggest about the fluid on a stigma? [2]\n\n(c) State what is formed when a pollen grain germinates, and why germinated grains are needed for fertilisation. [2]\n\n(d) Draw a neat, labelled diagram of a pistil showing a pollen tube growing from the stigma to the ovule, with four labels. [4]`,
  model: `**(a)** 0 percent: ${SUGAR[0].germ} ÷ ${GRAINS} × 100 = **${SUGAR[0].pct}%**. ${BEST.conc} percent: ${BEST.germ} ÷ ${GRAINS} × 100 = **${BEST.pct}%**.\n\n**(b)** The **${BEST.conc} percent solution**. The result suggests that the **sugary fluid on a stigma** helps pollen grains to germinate.\n\n**(c)** A **pollen tube** is formed. The tube carries the **male gametes** down the style to the ovule, so a grain that does not germinate cannot fertilise.\n\n**(d)** A **stigma** at the top, a **style**, a swollen **ovary** with an **ovule** and the **micropyle**; the **pollen tube** drawn as a line from the stigma through the style into the micropyle. Four labels.`,
  sol: `${SUGAR[0].pct}% and ${BEST.pct}%; ${BEST.conc} percent best, stigma fluid helps; pollen tube carries male gametes; labelled pistil.`,
  scheme: [[`${SUGAR[0].pct}%`, 1], [`${BEST.pct}%`, 1], [`${BEST.conc} percent solution`, 1], ['Stigma fluid helps germination', 1], ['Pollen tube named', 1], ['Carries male gametes to the ovule', 1], ['Pistil with tube from stigma to micropyle', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [4],
}), (q) => SUGAR[0].pct === 7 && BEST.pct === 59 || 'pct');
add('wind-long', long({
  marks: 10, wl: null,
  stem: `A botanist compares two plants. A sage flower makes ${SAGE_POLLEN} pollen grains and and is visited by bees. A grass flower makes ${GRASS_POLLEN} pollen grains; its anthers hang out of the flower and it has a single ovule.\n\n(a) Name the likely pollinating agent of each plant. [2]\n\n(b) Calculate how many times more pollen the grass flower makes, and give one reason for the difference. [3]\n\n(c) State two other features that adapt the grass flower to its agent. [2]\n\n(d) Draw a neat, labelled diagram of a wind-pollinated flower, labelling three features. [3]`,
  model: `**(a)** Sage: **insects (bees)**. Grass: **wind**.\n\n**(b)** ${GRASS_POLLEN} ÷ ${SAGE_POLLEN} = **${POLLEN_RATIO} times**. Wind carries pollen at random, so **most grains are wasted** and a huge amount must be made.\n\n**(c)** A **large feathery stigma** to catch pollen, and **light, dry pollen** that the wind can carry (or no petals or nectar).\n\n**(d)** A **stem** carrying a **feathery stigma**, **anthers hanging out on long filaments** and **small or no petals**; three labels.`,
  sol: `Sage insects, grass wind; ${POLLEN_RATIO} times, much wasted; feathery stigma and light pollen; labelled wind flower.`,
  scheme: [['Sage: insects', 1], ['Grass: wind', 1], [`${POLLEN_RATIO} times`, 1], ['Wind wastes pollen', 1], ['Reason linked to the number of grains', 1], ['Two other features', 2], ['Wind flower drawn', 1], ['Three labels', 2]].map(([a, b]) => [a, b]),
  d: 3, c: 'application', t: [2],
}), (q) => POLLEN_RATIO === 20 || 'ratio');
add('vallis-long', long({
  marks: 10, wl: null,
  stem: 'A student keeps Vallisneria in a glass tank. She sees small flowers floating on the water surface and a few other flowers on long coiled stalks that reach the surface.\n\n(a) Name the agent of pollination in this plant. [1]\n\n(b) State what the floating flowers are and what happens to them before they float. [2]\n\n(c) Explain the use of the long coiled stalk of the other flowers. [2]\n\n(d) State what happens when the floating flowers touch the flowers on the long stalks. [1]\n\n(e) Draw a neat, labelled diagram of pollination in Vallisneria, labelling four parts. [4]',
  model: '**(a)** **Water**.\n\n**(b)** They are the **male flowers**. They **form under water and break off**, then rise and float.\n\n**(c)** The coiled stalk **carries the female flower up to the water surface**, where the floating male flowers can reach it (and it can stretch or coil as the water level changes).\n\n**(d)** **Pollen is transferred from the male flowers to the stigma** of the female flower.\n\n**(e)** The **water surface**, a **male flower floating**, a **female flower on a long coiled stalk**, and the **plant under water**. Four labels.',
  sol: 'Water; floating male flowers; coiled stalk raises the female flower; pollen transferred; labelled diagram.',
  scheme: [['Water', 1], ['Male flowers', 1], ['Break off and float', 1], ['Stalk lifts the female flower to the surface', 1], ['Floating flowers can reach it', 1], ['Pollen transferred to the stigma', 1], ['Surface, male and female flowers drawn', 2], ['Four labels', 2]],
  d: 3, c: 'application', t: [2],
}));
add('figure-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of a pistil after pollination. Parts are lettered A to F.\n\n(a) Name the parts A and B and state one function of each. [3]\n\n(b) Name the part F. State what passes through it and what that does. [2]\n\n(c) Name the parts D and E and state what each becomes after fertilisation. [2]\n\n(d) Draw a neat, labelled diagram of a germinating pollen grain with its tube, labelling three parts. [3]',
  model: '**(a)** A is the **stigma**: it receives pollen and its sugary fluid makes the grain germinate. B is the **pollen tube**: it grows down the style and carries the male gametes to the ovule.\n\n**(b)** F is the **micropyle**. The **pollen tube passes through it** and releases the male gametes in the **embryo sac**.\n\n**(c)** D is the **ovary wall**; it becomes the **fruit wall**. E is the **ovule**; it becomes the **seed**.\n\n**(d)** A **pollen grain** with a **pollen tube** growing out of it; labels for **tube nucleus**, **generative nucleus** (or male gametes) and **pollen tube**.',
  sol: 'Stigma, pollen tube; micropyle; ovary wall to fruit wall, ovule to seed; germinating pollen grain.',
  scheme: [['A stigma', 1], ['B pollen tube', 1], ['One function each', 1], ['F micropyle', 1], ['Tube enters the ovule and delivers male gametes', 1], ['D to fruit wall and E to seed', 2], ['Grain and tube drawn', 1], ['Three labels', 2]],
  d: 4, c: 'analysis', t: [4, 5],
  assets: [carpelFig],
}));
add('seed-long', long({
  marks: 10, wl: null,
  stem: `A fruit of a plant contains ${SEEDS} seeds. In each seed an embryo and its endosperm formed after one pollen tube delivered two male gametes to one embryo sac. The plant has ${TWO_N} chromosomes in each body cell.\n\n(a) How many pollen tubes and how many male gametes were used to form the ${SEEDS} seeds? [2]\n\n(b) Name the two fusions that take place in each embryo sac and state what each produces. [3]\n\n(c) How many chromosomes does the zygote have? [1]\n\n(d) Draw a neat, labelled diagram of an embryo sac, labelling five parts. [4]`,
  model: `**(a)** One tube for each seed: **${SEEDS} pollen tubes**; two male gametes for each: ${SEEDS} × 2 = **${MALE_GAMETES_USED} male gametes**.\n\n**(b)** **Male gamete + egg cell** gives the **zygote** (fertilisation). **Male gamete + two polar nuclei** gives the **primary endosperm nucleus** (triple fusion).\n\n**(c)** Each gamete has ${TWO_N} ÷ 2 = ${GAMETE_N}; the zygote has ${GAMETE_N} + ${GAMETE_N} = **${TWO_N}**.\n\n**(d)** An oval **embryo sac** with **egg cell**, two **synergids** near the micropyle, two **polar nuclei** in the centre and three **antipodal cells** at the far end. Five labels.`,
  sol: `${SEEDS} tubes and ${MALE_GAMETES_USED} gametes; zygote and primary endosperm nucleus; ${TWO_N} chromosomes; labelled embryo sac.`,
  scheme: [[`${SEEDS} pollen tubes`, 1], [`${MALE_GAMETES_USED} male gametes`, 1], ['Egg + gamete gives zygote', 1], ['Polar nuclei + gamete gives primary endosperm nucleus', 1], ['Names the two fusions', 1], [`${TWO_N} chromosomes`, 1], ['Embryo sac outline with cells', 1], ['Five labels', 3]],
  d: 3, c: 'application', t: [5],
}), (q) => MALE_GAMETES_USED === 80 || 'gametes');
add('sac-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of an embryo sac at the time of fertilisation. Parts are lettered A to E.\n\n(a) Name the parts B and C. [2]\n\n(b) State what the part E is and how it reached the embryo sac. [2]\n\n(c) State what happens when E meets B and when E meets C. [3]\n\n(d) Draw a neat, labelled diagram of a flower after fertilisation, showing what the ovary and the ovule become. [3]',
  model: '**(a)** B is the **egg cell**; C is the pair of **polar nuclei**.\n\n**(b)** E is a **male gamete**. It was carried by the **pollen tube**, which entered the ovule through the **micropyle**.\n\n**(c)** E + B: fertilisation, forming the **zygote**. E + C: **triple fusion**, forming the **primary endosperm nucleus**.\n\n**(d)** A fruit in section showing the **fruit wall** (from the ovary), the **seed** (from the ovule) with its **seed coat**, **embryo** and **endosperm**. Labels.',
  sol: 'Egg cell, polar nuclei; male gamete via pollen tube; zygote and primary endosperm nucleus; labelled fruit.',
  scheme: [['B egg cell', 1], ['C polar nuclei', 1], ['Male gamete', 1], ['Delivered by the pollen tube', 1], ['E + B gives zygote', 1], ['E + C is triple fusion', 1], ['Primary endosperm nucleus', 1], ['Fruit and seed drawn', 1], ['Labels', 2]].map(([a, b]) => [a, b]),
  d: 3, c: 'analysis', t: [4, 5],
  assets: [sacFig],
}));
