// ch07 How do Organisms Reproduce? — question bank. AR keys planned: a d c b a a c b d.
import { mk, add, r } from '../../cbse-10-science-ch06/src/lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, tol = 1e-9) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 DNA copying and variation
add('dna-copy-mcq', mcq({
  stem: 'What is the basic event in reproduction?',
  right: 'Making a copy of the DNA',
  wrong: ['Growth of the body to its full size', 'Making food by photosynthesis', 'Division of the cytoplasm without the nucleus'],
  sol: 'Reproduction begins with the cell making a copy of its DNA (with extra cell apparatus) and then dividing, so each new cell gets a copy — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('variation-why-mcq', mcq({
  stem: 'Why are offspring produced from a single parent similar to it, but not exactly identical?',
  right: 'DNA copying is not perfectly accurate, so small changes creep in.',
  wrong: ['They receive DNA from two different parents.', 'The environment rewrites their DNA every day.', 'Cells divide without copying their DNA.'],
  sol: 'With a single parent there is no mixing of DNA; the small differences come from slight inaccuracies each time DNA is copied — option (@K). (@1) describes sexual reproduction; (@2) and (@3) are not true.',
  d: 2, c: 'understanding', t: [1],
}));
add('bacteria-heat-mcq', mcq({
  stem: 'During a heat wave, the water of a village pond becomes several degrees warmer. Most of the bacteria in it die, but a few survive and soon multiply. What is the best explanation?',
  right: 'A few bacteria already had variations that let them tolerate heat, and they passed these on.',
  wrong: ['The heat made all the bacteria produce heat-resistant DNA on purpose.', 'Only the largest bacteria survived, because size protects against heat.', 'The survivors stopped reproducing so that they could save energy.'],
  sol: 'Step 1 — Copying errors over many generations had already produced slightly different bacteria.\n\nStep 2 — Those that happened to tolerate heat survived and reproduced, passing on the variation — option (@K).\n\nStep 3 — Variations are not made to order by the environment (@1); size (@2) and stopping reproduction (@3) do not explain survival and multiplication.',
  d: 3, c: 'application', t: [1],
}));
add('variation-ar', ar({
  a: 'Variation helps a species survive when its surroundings change drastically.',
  r: 'Some individuals in a varied population may have features that suit the new conditions.',
  key: 'a',
  sol: 'Both are true. Because some varied individuals may suit the new conditions, they survive and keep the species going, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('dna-exact-tf', tf({
  stem: 'DNA copying during reproduction always produces exact copies.',
  key: 'f',
  sol: 'False. DNA copying is very accurate but not perfect; the small changes produce variation.',
  d: 1, c: 'recall', t: [1],
}));
add('dna-fill', fill({
  stem: 'The information for making proteins is stored in the ___ in the nucleus of a cell.',
  acc: [['DNA', 'deoxyribonucleic acid']],
  sol: 'It is stored in the **DNA**, which is copied during reproduction.',
  d: 1, c: 'recall', t: [1],
}));
add('consistency-short', short({
  marks: 2,
  stem: 'Explain why (a) consistency in DNA copying is important for a species, and (b) a small amount of variation is also useful.',
  model: '(a) Consistent copying keeps the **body design** that suits the organism to its **niche**, so offspring can live where their parents live.\n\n(b) If the niche changes drastically, a few individuals with **suitable variations** may survive, so the species is not wiped out.',
  sol: 'Step 1 — Consistency maintains a working body design for the niche.\n\nStep 2 — Variation allows survival when the niche changes.',
  scheme: [['(a) Consistency keeps the body design suited to the niche', 1], ['(b) Variation lets some survive a changed niche', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('grass-variation-short', short({
  marks: 3,
  stem: 'A farmer has two fields of the same fodder grass. Field A was planted only from runners (stem pieces) of a single plant; field B was grown from seeds collected from many plants. A new fungal disease reaches the area.\n\n(a) In which field is the grass more likely to survive the disease? \n\n(b) Explain your answer in terms of variation.\n\n(c) Give one advantage that field A still has.',
  model: '(a) **Field B**.\n\n(b) Plants grown from runners of one plant are genetically almost identical, so if the disease can attack one, it can attack all. Seeds come from sexual reproduction among many plants, so field B has much more **variation**; some plants are likely to resist the disease and survive.\n\n(c) Field A’s plants keep all the good qualities of the parent plant and grow quickly (vegetative propagation).',
  sol: 'Step 1 — Identify the method of reproduction in each field.\n\nStep 2 — Link variation to the chance that some plants resist the disease.\n\nStep 3 — Recall an advantage of vegetative propagation.',
  scheme: [['(a) Field B', 1], ['(b) Field B has more variation; some plants may resist', 1], ['(c) One valid advantage of field A', 1]],
  d: 4, c: 'analysis', t: [1, 2],
}));

// ---------------------------------------------------------------- t02 asexual reproduction
add('amoeba-mcq', mcq({
  stem: 'Amoeba reproduces asexually by:',
  right: 'binary fission',
  wrong: ['budding', 'multiple fission', 'spore formation'],
  sol: 'Amoeba splits into two equal daughter cells: binary fission — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('plasmodium-mcq', mcq({
  stem: 'The malaria parasite Plasmodium reproduces by:',
  right: 'multiple fission',
  wrong: ['binary fission', 'fragmentation', 'budding'],
  sol: 'Plasmodium divides into many daughter cells at once: multiple fission — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('leishmania-mcq', mcq({
  stem: 'Binary fission in Leishmania happens in a definite plane, unlike in Amoeba. Why?',
  right: 'It has a whip-like structure at one end, and division happens in a fixed direction relative to it.',
  wrong: ['It always forms a cyst before dividing.', 'It divides only after being cut into pieces.', 'It has no nucleus, so the cytoplasm decides the plane.'],
  sol: 'Leishmania has a whip-like structure at one end of its cell, and fission occurs in a definite orientation relative to it — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('spirogyra-mcq', mcq({
  stem: 'A student notices that a mature filament of Spirogyra in a pond has broken into several pieces, and each piece is growing into a new filament. This is:',
  right: 'fragmentation',
  wrong: ['regeneration', 'budding', 'spore formation'],
  sol: 'A simple multicellular organism that breaks into pieces on maturing, each growing into a new individual, shows fragmentation — option (@K). Regeneration (@1) is the rebuilding of a whole body from a cut piece by specialised cells.',
  d: 2, c: 'understanding', t: [2],
}));
add('hydra-mcq', mcq({
  stem: 'A small outgrowth appears on the side of a Hydra, develops tentacles and later separates as a new Hydra. This is:',
  right: 'budding',
  wrong: ['binary fission', 'fragmentation', 'multiple fission'],
  sol: 'An outgrowth formed by repeated cell division at one site that grows and detaches is a bud — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('bread-mould-mcq', mcq({
  stem: 'In July, a slice of bread left in a damp kitchen develops fuzzy black patches within three days, but a slice of the same bread kept dry in a sealed box stays clean. What best explains this?',
  right: 'Spores of bread mould from the air germinate only on moist surfaces.',
  wrong: ['Bread itself turns into mould when it becomes warm.', 'Mould needs light, and the box was dark.', 'Dry bread contains no food that mould can use.'],
  sol: 'Step 1 — Mould spores are present in the air; they germinate when they land on a moist surface with food.\n\nStep 2 — The damp slice was moist, the dry slice was not — option (@K).\n\nStep 3 — Bread does not turn into mould (@1); light is not the deciding factor (@2); dry bread still contains food (@3).',
  d: 3, c: 'application', t: [2],
}));
add('banana-mcq', mcq({
  stem: 'Why do farmers grow bananas from suckers (side shoots) rather than from seeds?',
  right: 'Cultivated bananas do not produce viable seeds.',
  wrong: ['Banana seeds are poisonous to the soil.', 'Plants grown from seeds give more fruit each year.', 'Suckers produce plants with more variation.'],
  sol: 'Cultivated bananas have lost the capacity to produce seeds, so they are propagated vegetatively — option (@K). Vegetative propagation gives less variation, not more (@3).',
  d: 2, c: 'understanding', t: [2],
}));
add('vegprop-not-mcq', mcq({
  stem: 'Which of the following is **not** an advantage of vegetative propagation?',
  right: 'It produces a lot of variation among the offspring.',
  wrong: ['Plants flower and fruit earlier than plants grown from seeds.', 'Plants that do not produce seeds can be multiplied.', 'The offspring keep the good qualities of the parent.'],
  sol: 'Vegetative propagation gives offspring that are genetically similar to the parent, so it produces very little variation — option (@K). The other three are real advantages.',
  d: 2, c: 'understanding', t: [2],
}));
add('regen-not-repro-mcq', mcq({
  stem: 'Planaria can regrow a whole body from a small piece. Why is regeneration still not counted as the normal way of reproducing for most organisms?',
  right: 'Most organisms do not depend on being cut into pieces in order to reproduce.',
  wrong: ['Regenerated worms are not alive.', 'Regenerated worms can never reproduce again.', 'Regeneration happens only in plants.'],
  sol: 'Regeneration rebuilds a body from a piece, but organisms do not normally rely on being cut up to make offspring — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('mango-graft-mcq', mcq({
  stem: 'A nursery owner in Ratnagiri wants hundreds of Alphonso mango saplings that will all give fruit of exactly the same taste as his best tree, and bear fruit years sooner than seedlings. Which method should he use?',
  right: 'Grafting shoots of the best tree onto young rooted plants',
  wrong: ['Sowing seeds from the best tree’s fruits', 'Cross-pollinating the best tree with other varieties', 'Planting leaves of the best tree in moist soil'],
  sol: 'Step 1 — Identical quality and early fruiting point to vegetative propagation.\n\nStep 2 — Mango is propagated by grafting — option (@K).\n\nStep 3 — Seeds (@1) and cross-pollination (@2) involve sexual reproduction and give variation; mango leaves (@3) do not grow into new plants.',
  d: 3, c: 'application', t: [2],
}));
add('fission-ar', ar({
  a: 'Plasmodium reproduces by binary fission.',
  r: 'In multiple fission, one cell divides into many daughter cells at the same time.',
  key: 'd',
  sol: 'A is false: Plasmodium reproduces by multiple fission. R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('budding-ar', ar({
  a: 'Hydra can reproduce by budding.',
  r: 'In budding, the parent splits into two equal halves.',
  key: 'c',
  sol: 'A is true. R is false: in budding a small outgrowth forms and detaches; splitting into two equal halves is binary fission — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('regen-tf', tf({
  stem: 'If a Planaria is cut into three pieces, each piece can grow into a complete worm.',
  key: 't',
  sol: 'True. Specialised cells in each piece multiply and form the missing parts, so each piece becomes a complete worm.',
  d: 1, c: 'recall', t: [2],
}));
add('sporangia-fill', fill({
  stem: 'In bread mould, spores are formed inside round structures on stalks called ___.',
  acc: [['sporangia', 'sporangium']],
  sol: 'The spores are formed in **sporangia**.',
  d: 1, c: 'recall', t: [2],
}));
add('bacteria-num', num({
  stem: 'A bacterium divides by binary fission every 20 minutes, and each daughter does the same. Starting with one bacterium, how many bacteria will there be after 2 hours (if none die)?',
  value: 64, tol: 0, unit: null,
  sol: r`Step 1 — Number of divisions $= \dfrac{120}{20} = 6$.

Step 2 — Each division doubles the number, so after 6 divisions there are $2^6 = 64$ bacteria.`,
  scheme: [['Finds 6 divisions and 2 to the power 6 = 64', 1]],
  d: 3, c: 'application', t: [2],
}), (q) => near(2 ** (120 / 20), q.answer.value) || 'count');
add('asexual-match', match({
  stem: 'Match each organism in Column A with its method of asexual reproduction in Column B.',
  pairs: [['Amoeba', 'Binary fission'], ['Plasmodium', 'Multiple fission'], ['Spirogyra', 'Fragmentation'], ['Rhizopus', 'Spore formation']],
  order: [2, 0, 3, 1],
  sol: 'Amoeba → binary fission (1 → r); Plasmodium → multiple fission (2 → p); Spirogyra → fragmentation (3 → s); Rhizopus → spore formation (4 → q).',
  d: 2, c: 'recall', t: [2],
}));
add('budding-short', short({
  marks: 2,
  stem: 'Describe budding in Hydra. How is it different from binary fission in Amoeba?',
  model: 'In Hydra, cells divide repeatedly at one spot to form a small outgrowth, the **bud**. It grows tentacles and, when mature, **detaches** as a new Hydra. In **binary fission**, the whole parent cell splits into **two equal** daughter cells, so the parent no longer exists as such; in budding the parent remains and the bud is smaller at first.',
  sol: 'Describe the bud forming and detaching, then contrast it with equal splitting.',
  scheme: [['Budding described', 1], ['Difference from binary fission', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('potato-short', short({
  marks: 2,
  stem: 'A farmer in Agra cuts a large potato into pieces, each with an "eye", and plants them. (a) Why does each piece grow into a new plant? (b) Why will all the new plants give potatoes of the same quality as the parent?',
  model: '(a) A potato is a swollen underground **stem**, and each eye is a **bud** that can sprout into a shoot and roots: this is vegetative propagation.\n\n(b) The new plants come from the parent’s own body without germ cells, so they are **genetically similar** to the parent and keep its qualities.',
  sol: 'Step 1 — The eye is a bud on a stem tuber.\n\nStep 2 — Vegetative propagation gives offspring genetically similar to the parent.',
  scheme: [['(a) Eye is a bud on a stem, so it sprouts', 1], ['(b) Genetically similar offspring', 1]],
  d: 3, c: 'application', t: [2],
}));
add('fission-compare-short', short({
  marks: 3,
  stem: 'Compare binary fission in Amoeba, binary fission in Leishmania and multiple fission in Plasmodium, giving one feature of each.',
  model: '**Amoeba:** one cell splits into two equal halves, and the split can happen in **any plane**.\n\n**Leishmania:** one cell splits into two, but in a **definite plane**, related to the whip-like structure at one end.\n\n**Plasmodium:** one cell divides into **many** daughter cells at the same time, often inside a protective cyst.',
  sol: 'State the number of daughter cells and the plane of division for each organism.',
  scheme: [['Amoeba: two cells, any plane', 1], ['Leishmania: two cells, definite plane', 1], ['Plasmodium: many cells at once', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('rose-cutting-short', short({
  marks: 3,
  stem: 'Ritika wants more plants of her grandmother’s fragrant rose bush, which rarely sets seed. A gardener suggests planting stem cuttings.\n\n(a) What kind of reproduction is this?\n\n(b) Give two reasons why it suits Ritika’s aim.\n\n(c) Suggest one disadvantage if all her rose plants come from this one bush.',
  model: '(a) **Vegetative propagation** — asexual reproduction from a stem.\n\n(b) The new plants will have the **same fragrance and qualities** as the grandmother’s bush, and they will **flower sooner** than plants grown from seed; it also works even though the bush rarely sets seed.\n\n(c) All the plants will be almost identical, so a **disease or pest** that attacks one is likely to attack all of them.',
  sol: 'Step 1 — Name the method.\n\nStep 2 — Match its advantages to her aim.\n\nStep 3 — Lack of variation is the main disadvantage.',
  scheme: [['(a) Vegetative propagation', 1], ['(b) Two reasons (0.5 each)', 1], ['(c) Lack of variation, so disease can affect all', 1]],
  d: 3, c: 'application', t: [1, 2],
}));
add('asexual-long', long({
  stem: '(a) What is asexual reproduction?\n\n(b) With labelled diagrams, describe (i) binary fission in Amoeba and (ii) spore formation in Rhizopus.\n\n(c) Why are plants such as banana and jasmine grown by vegetative propagation?',
  model: '(a) Asexual reproduction is the production of new individuals from a **single parent**, without germ cells; the offspring are nearly identical to the parent.\n\n(b) (i) Diagram stages: parent cell with nucleus → nucleus divides → cytoplasm divides → two daughter cells. The Amoeba copies its DNA, the nucleus divides and then the cytoplasm splits into two equal halves. (ii) Diagram labels: hyphae, sporangium, spores. Rhizopus forms sporangia on upright stalks; they contain many spores with thick walls. When released, spores that reach a moist surface with food germinate into new moulds.\n\n(c) These plants have **lost the capacity to produce seeds**, so vegetative propagation is the only practical way to grow them; it also keeps the parent’s qualities and gives earlier flowering.',
  sol: 'Step 1 — Define asexual reproduction.\n\nStep 2 — Draw and describe the two processes stage by stage.\n\nStep 3 — Link seedlessness to vegetative propagation.',
  scheme: [['(a) Definition', 1], ['(b)(i) Binary fission diagram and description', 1.5], ['(b)(ii) Spore formation diagram and description', 1.5], ['(c) No viable seeds (plus one other advantage)', 1]],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 flowering plants
add('anther-mcq', mcq({
  stem: 'Which part of a flower produces pollen grains?',
  right: 'Anther',
  wrong: ['Stigma', 'Ovary', 'Filament'],
  sol: 'The anther, at the top of the stamen, produces pollen grains — option (@K). The filament (@3) only holds up the anther.',
  d: 1, c: 'recall', t: [3],
}));
add('unisexual-mcq', mcq({
  stem: 'Which of these plants has unisexual flowers?',
  right: 'Papaya',
  wrong: ['Hibiscus', 'Mustard', 'Pea'],
  sol: 'Papaya flowers have either stamens or a pistil, not both — option (@K). Hibiscus, mustard and pea have bisexual flowers.',
  d: 2, c: 'understanding', t: [3],
}));
add('fruit-mcq', mcq({
  stem: 'After fertilisation, the ovary of a flower develops into the:',
  right: 'fruit',
  wrong: ['seed', 'embryo', 'seed coat'],
  sol: 'The ovary grows and ripens into the fruit — option (@K); the ovules become seeds.',
  d: 1, c: 'recall', t: [3],
}));
add('papaya-glasshouse-mcq', mcq({
  stem: 'A farmer grows only female papaya trees inside a sealed glasshouse that keeps out insects and wind. The trees flower well but bear no fruit, while female trees in an open field near male trees fruit normally. Why?',
  right: 'No pollen could reach the stigmas of the female flowers, so no fertilisation took place.',
  wrong: ['The glasshouse was too warm for the ovaries to form.', 'Papaya flowers pollinate themselves, so the glasshouse should not matter.', 'Female papaya flowers do not have ovaries.'],
  sol: 'Step 1 — Papaya flowers are unisexual: female flowers need pollen from male flowers.\n\nStep 2 — With no male trees, insects or wind inside, no pollen reached the stigmas; without pollination and fertilisation the ovaries do not become fruits — option (@K).\n\nStep 3 — Unisexual flowers cannot self-pollinate (@2), and female flowers do have ovaries (@3).',
  d: 3, c: 'application', t: [3],
}));
add('germ-half-mcq', mcq({
  stem: 'Why do germ cells contain only half the number of chromosomes present in body cells?',
  right: 'So that the zygote formed by fusing two germ cells has the normal number of chromosomes',
  wrong: ['So that germ cells can divide faster than body cells', 'So that each parent passes on only its useful chromosomes', 'So that germ cells can make their own food'],
  sol: 'Two germ cells fuse to form the zygote; if each has half the set, the zygote has the full set, and the number stays constant over generations — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cross-poll-mcq', mcq({
  stem: 'A bee carries pollen from a mustard flower in Harpreet’s field to a mustard flower in her neighbour’s field. This is:',
  right: 'cross-pollination',
  wrong: ['self-pollination', 'fertilisation', 'vegetative propagation'],
  sol: 'Pollen reaching the stigma of a flower on a different plant is cross-pollination — option (@K). Fertilisation (@2) happens later, when germ cells fuse in the ovule.',
  d: 2, c: 'application', t: [3],
}));
add('pollen-tube-mcq', mcq({
  stem: 'The pollen tube grows from the pollen grain to:',
  right: 'carry the male germ cell to the female germ cell in the ovule',
  wrong: ['carry food from the stigma to the anther', 'carry the egg from the ovary to the stigma', 'carry water to the developing fruit'],
  sol: 'The pollen tube grows through the style and delivers the male germ cell to the egg in the ovule — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cotyledon-shrink-mcq', mcq({
  stem: 'Sameer grows a bean seedling on wet cotton. After ten days, the two thick cotyledons have become thin and shrivelled while the seedling has grown taller. The best explanation is that:',
  right: 'the food stored in the cotyledons was used by the growing seedling',
  wrong: ['the cotyledons were attacked by bread mould', 'the cotyledons lost their food to the wet cotton', 'cotyledons always shrivel because they are dead tissue'],
  sol: 'Cotyledons store food for the young seedling until its leaves can make food; as the stored food is used up, they shrink — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('fruit-ar', ar({
  a: 'After fertilisation, the ovary of a flower ripens into a fruit.',
  r: 'After fertilisation, the ovules develop into seeds.',
  key: 'b',
  sol: 'Both are true, but they are two separate changes: the ovule becoming a seed does not explain why the ovary becomes a fruit — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('germ-ar', ar({
  a: 'Germ cells contain half the number of chromosomes found in body cells.',
  r: 'This keeps the number of chromosomes constant from one generation to the next when two germ cells fuse.',
  key: 'a',
  sol: 'Both are true, and R gives the reason for A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('stigma-tf', tf({
  stem: 'The stigma is the sticky top of the pistil that receives pollen grains.',
  key: 't',
  sol: 'True. Pollen grains stick to the stigma and germinate there.',
  d: 1, c: 'recall', t: [3],
}));
add('zygote-fill', fill({
  stem: 'The cell formed by the fusion of a male germ cell and a female germ cell is called a ___.',
  acc: [['zygote']],
  sol: 'It is the **zygote**, which divides to form the embryo.',
  d: 1, c: 'recall', t: [3],
}));
add('ovary-fill', fill({
  stem: 'After fertilisation, the ___ of the flower grows and ripens to form the fruit.',
  acc: [['ovary']],
  sol: 'The **ovary** becomes the fruit; the ovules inside become seeds.',
  d: 1, c: 'recall', t: [3],
}));
add('potato-chromo-num', num({
  stem: 'The body cells of a potato plant contain 48 chromosomes. How many chromosomes are present in an egg cell in one of its ovules?',
  value: 24, tol: 0, unit: null,
  sol: r`A germ cell has half the chromosomes of a body cell: $\dfrac{48}{2} = 24$.`,
  scheme: [['Halves 48 to get 24', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(48 / 2, q.answer.value) || 'half');
add('pea-pod-num', num({
  stem: 'A pea pod contains 9 seeds. What is the minimum number of pollen grains that must have germinated on the stigma to produce these seeds?',
  value: 9, tol: 0, unit: null,
  sol: 'Step 1 — Each seed develops from one fertilised ovule.\n\nStep 2 — Each ovule needs its own male germ cell, delivered by the pollen tube of one pollen grain, so at least 9 pollen grains are needed.',
  scheme: [['One pollen grain per fertilised ovule, so 9', 1]],
  d: 3, c: 'application', t: [3],
}), (q) => near(9, q.answer.value) || 'seeds');
add('flower-match', match({
  stem: 'Match each part of a flower in Column A with what it does or becomes in Column B.',
  pairs: [['Anther', 'Produces pollen grains'], ['Stigma', 'Receives pollen grains'], ['Ovule', 'Develops into a seed'], ['Ovary', 'Develops into a fruit']],
  order: [3, 0, 2, 1],
  sol: 'Anther → produces pollen (1 → s); stigma → receives pollen (2 → p); ovule → seed (3 → r); ovary → fruit (4 → q).',
  d: 2, c: 'understanding', t: [3],
}));
add('poll-types-short', short({
  marks: 2,
  stem: 'Distinguish between self-pollination and cross-pollination. Name two agents of cross-pollination.',
  model: 'In **self-pollination**, pollen reaches the stigma of the **same flower** or another flower of the same plant. In **cross-pollination**, pollen is carried to the stigma of a flower on a **different plant** of the same kind. Agents of cross-pollination include **insects** (bees), **wind**, **birds** and **water**.',
  sol: 'Contrast where the pollen comes from and goes to, then name two agents.',
  scheme: [['Difference between self- and cross-pollination', 1], ['Two agents (0.5 each)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('seed-parts-short', short({
  marks: 2,
  stem: 'Shruti splits open a gram seed that was soaked overnight. Name the parts she would find that will form (a) the shoot and (b) the root, and state the job of (c) the two thick halves.',
  model: '(a) The **plumule** will form the shoot.\n\n(b) The **radicle** will form the root.\n\n(c) The two thick halves are the **cotyledons**; they store food for the seedling until its leaves can make food.',
  sol: 'Identify the plumule, radicle and cotyledons and their roles.',
  scheme: [['(a) Plumule and (b) radicle (0.5 each)', 1], ['(c) Cotyledons store food for the seedling', 1]],
  d: 2, c: 'understanding', t: [3],
  wl: null,
}));
add('post-fert-short', short({
  marks: 3,
  stem: 'State what happens after fertilisation to (a) the zygote, (b) the ovule, (c) the ovary and (d) the petals and stamens.',
  model: '(a) The zygote divides many times to form the **embryo**.\n\n(b) The ovule develops a tough coat and becomes the **seed**.\n\n(c) The ovary grows and ripens into the **fruit**.\n\n(d) The petals and stamens (with the sepals, style and stigma) usually **wither and fall off**.',
  sol: 'Give the fate of each part in turn.',
  scheme: [['(a) Embryo', 0.5], ['(b) Seed', 1], ['(c) Fruit', 1], ['(d) Wither and fall', 0.5]],
  d: 2, c: 'understanding', t: [3],
  wl: null,
}));
add('sexual-variation-short', short({
  marks: 3,
  stem: 'A rice breeder at a research station crosses a high-yielding variety with a flood-tolerant variety, hoping to get plants that have both qualities.\n\n(a) Why can this be done only through sexual reproduction?\n\n(b) Why do the offspring plants differ from one another?\n\n(c) Why must the germ cells of each parent carry half the chromosomes?',
  model: '(a) Sexual reproduction **combines DNA from two parents**, so features of both varieties can come together in one plant; asexual methods only copy one parent.\n\n(b) Each germ cell carries a **different mix** of the parent’s DNA, and they combine in new ways at fertilisation, so the offspring show **variation**.\n\n(c) So that when the two germ cells fuse, the zygote has the **normal number** of chromosomes, the same as each parent.',
  sol: 'Step 1 — Combining DNA needs two parents.\n\nStep 2 — New combinations give variation.\n\nStep 3 — Halving keeps the chromosome number constant.',
  scheme: [['(a) DNA from two parents combines', 1], ['(b) New combinations in each offspring', 1], ['(c) Zygote keeps the normal number', 1]],
  d: 4, c: 'application', t: [1, 3],
}));
add('flower-long', long({
  stem: '(a) Draw a labelled diagram of the longitudinal section of a flower.\n\n(b) What is pollination? How does the male germ cell reach the female germ cell after pollination?\n\n(c) Describe the changes that take place in a flower after fertilisation.',
  model: '(a) Diagram labels: **sepal, petal, stamen (anther and filament), pistil (stigma, style, ovary), ovule**.\n\n(b) Pollination is the transfer of pollen grains from an anther to a stigma. On the stigma, a pollen grain grows a **pollen tube** that passes down through the style to the ovule. The male germ cell travels down the tube and fuses with the female germ cell (egg) in the ovule: this is fertilisation, giving a **zygote**.\n\n(c) The zygote divides to form an **embryo**; the ovule develops a tough coat and becomes the **seed**; the ovary grows and ripens into the **fruit**; the petals, sepals, stamens, style and stigma shrivel and fall off.',
  sol: 'Step 1 — Draw and label all the parts.\n\nStep 2 — Define pollination, then describe the pollen tube.\n\nStep 3 — Give the fate of each part.',
  scheme: [['(a) Labelled diagram', 2], ['(b) Pollination defined', 0.5], ['(b) Pollen tube carries the male germ cell to the egg', 1], ['(c) Embryo, seed, fruit and withering', 1.5]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 human reproduction
add('testes-scrotum-mcq', mcq({
  stem: 'Why are the testes located outside the abdominal cavity, in the scrotum?',
  right: 'Sperm formation needs a temperature lower than normal body temperature.',
  wrong: ['There is no space for them inside the abdomen.', 'They need more light to produce sperms.', 'They must stay close to the kidneys.'],
  sol: 'Sperms are formed best at a temperature slightly below body temperature, which the scrotum provides — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('fert-site-mcq', mcq({
  stem: 'In human beings, fertilisation usually takes place in the:',
  right: 'oviduct (fallopian tube)',
  wrong: ['uterus', 'ovary', 'vagina'],
  sol: 'The sperm meets the egg in the oviduct — option (@K). The embryo then implants in the uterus.',
  d: 1, c: 'recall', t: [4],
}));
add('glands-mcq', mcq({
  stem: 'Which glands add fluid to sperms to form semen?',
  right: 'Seminal vesicles and the prostate gland',
  wrong: ['Thyroid and adrenal glands', 'Salivary glands and the pancreas', 'Pituitary gland and the hypothalamus'],
  sol: 'The seminal vesicles and prostate gland add secretions so that sperms travel in a fluid — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('puberty-common-mcq', mcq({
  stem: 'Which change at puberty happens in both boys and girls?',
  right: 'Thick hair grows in the armpits.',
  wrong: ['The voice cracks and deepens.', 'Breasts begin to develop.', 'Hair grows on the face and chin.'],
  sol: 'Hair growth in the armpits and genital area happens in both — option (@K). The others are specific to boys (@1, @3) or girls (@2).',
  d: 1, c: 'understanding', t: [4],
}));
add('blocked-oviduct-mcq', mcq({
  stem: 'Both oviducts of a woman are blocked by an infection. Which statement is correct?',
  right: 'Her ovaries still release eggs, but sperms cannot reach them, so fertilisation cannot take place.',
  wrong: ['Her ovaries stop releasing eggs altogether.', 'Her menstrual periods stop immediately.', 'Fertilisation now takes place in the uterus instead.'],
  sol: 'Step 1 — Blocking the oviducts does not affect the ovaries, which keep releasing eggs and making hormones.\n\nStep 2 — Sperms cannot pass the block to meet the egg, so fertilisation cannot happen — option (@K).\n\nStep 3 — The uterine lining is still built and shed each month, so menstruation continues (@2); fertilisation does not shift to the uterus (@3).',
  d: 4, c: 'analysis', t: [4],
}));
add('villi-mcq', mcq({
  stem: 'Why does the placenta have many finger-like villi on the embryo’s side?',
  right: 'They give a large surface area for glucose and oxygen to pass from the mother’s blood to the embryo.',
  wrong: ['They hold the embryo firmly so that it cannot move.', 'They produce eggs for the next pregnancy.', 'They mix the mother’s and the embryo’s blood.'],
  sol: 'Villi increase the surface area for exchange: food and oxygen in, wastes out — option (@K). The two bloods do not mix (@3).',
  d: 2, c: 'understanding', t: [4],
}));
add('menstruation-mcq', mcq({
  stem: 'Menstruation occurs because:',
  right: 'the egg is not fertilised, so the thickened lining of the uterus breaks down and is shed',
  wrong: ['the egg is fertilised and the embryo is shed', 'the ovaries break down every month', 'sperms damage the lining of the uterus'],
  sol: 'When the egg is not fertilised, the thick lining prepared for an embryo is not needed and passes out as blood and mucus — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('lining-ar', ar({
  a: 'The lining of the uterus becomes thick and spongy every month.',
  r: 'The uterus must be ready to receive and nourish an embryo if the egg is fertilised.',
  key: 'a',
  sol: 'Both are true, and the need to receive and nourish an embryo is why the lining thickens — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('urethra-ar', ar({
  a: 'In males, the urethra is a common passage for urine and sperms.',
  r: 'The vas deferens opens directly to the outside of the body.',
  key: 'c',
  sol: 'A is true. R is false: the vas deferens joins the urethra, which opens to the outside — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('egg-life-tf', tf({
  stem: 'An egg that is not fertilised lives for about one day.',
  key: 't',
  sol: 'True. If it does not meet a sperm within about a day, the egg dies.',
  d: 2, c: 'recall', t: [4],
}));
add('placenta-fill', fill({
  stem: 'The embryo receives food and oxygen from the mother’s blood through a disc-like tissue in the uterine wall called the ___.',
  acc: [['placenta']],
  sol: 'It is the **placenta**.',
  d: 1, c: 'recall', t: [4],
}));
add('sperm-chromo-num', num({
  stem: 'Human body cells contain 46 chromosomes. How many chromosomes does a human sperm contain?',
  value: 23, tol: 0, unit: null,
  sol: r`A sperm is a germ cell, so it has half the number: $\dfrac{46}{2} = 23$.`,
  scheme: [['Halves 46 to get 23', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(46 / 2, q.answer.value) || 'half');
add('sperm-path-short', short({
  marks: 2,
  stem: 'Trace the path of sperms from the testes to the outside of the body, and state the role of the seminal vesicles and prostate gland.',
  model: 'Testes → **vas deferens** → **urethra** (which also carries urine) → out through the penis. The **seminal vesicles** and **prostate gland** add fluid, so the sperms travel in semen, which makes their transport easier and nourishes them.',
  sol: 'List the tubes in order, then give the role of the glands.',
  scheme: [['Correct path in order', 1], ['Role of the glands', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('placenta-short', short({
  marks: 3,
  stem: 'What is the placenta? Describe how its structure helps it do its job.',
  model: 'The placenta is a **disc-like tissue embedded in the wall of the uterus**, joined to the embryo by the umbilical cord. On the embryo’s side it has many **villi**, which are surrounded on the mother’s side by **blood spaces**. The villi give a **large surface area**, so **glucose and oxygen** pass easily from the mother’s blood to the embryo, and **wastes** such as carbon dioxide pass from the embryo into the mother’s blood to be removed.',
  sol: 'Define the placenta, describe the villi and blood spaces, then explain the exchange in both directions.',
  scheme: [['Definition and position', 1], ['Villi give a large surface area', 1], ['Food and oxygen in; wastes out', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('female-long', long({
  stem: '(a) Draw a labelled diagram of the human female reproductive system.\n\n(b) Where does fertilisation take place, and what happens to the zygote after that?\n\n(c) What happens in the uterus if the egg is not fertilised?',
  model: '(a) Diagram labels: **ovary, oviduct (fallopian tube), uterus, cervix, vagina**.\n\n(b) Fertilisation takes place in the **oviduct**. The zygote divides as it moves to the **uterus**, where it **implants** in the thick lining. It grows into an embryo and is nourished through the **placenta** by the mother’s blood; development takes about nine months.\n\n(c) The uterus lining, which had become thick and spongy to receive an embryo, is not needed. It breaks down and passes out through the vagina as **blood and mucus**: this is **menstruation**, which recurs roughly every month and lasts about two to eight days.',
  sol: 'Step 1 — Draw and label the five parts.\n\nStep 2 — Oviduct, implantation, placenta.\n\nStep 3 — Breakdown of the lining: menstruation.',
  scheme: [['(a) Labelled diagram', 2], ['(b) Oviduct; implantation in the uterus; nourishment via placenta', 1.5], ['(c) Lining breaks down and is shed as menstruation', 1.5]],
  d: 3, c: 'understanding', t: [4],
}));
add('male-long', long({
  stem: '(a) Draw a labelled diagram of the human male reproductive system.\n\n(b) State two functions of the testes, and explain why they are located in the scrotum.\n\n(c) How is a sperm suited to its job?',
  model: '(a) Diagram labels: **testis, scrotum, vas deferens, seminal vesicle, prostate gland, urinary bladder, urethra, penis**.\n\n(b) The testes **make sperms** and secrete the hormone **testosterone**, which brings about the changes of puberty in boys. They lie in the scrotum, outside the abdomen, because sperm formation needs a **lower temperature** than normal body temperature.\n\n(c) A sperm is a tiny cell made mostly of **genetic material**, which it delivers to the egg, and it has a **long tail** that lets it swim towards the egg; it is carried in a nourishing fluid, semen.',
  sol: 'Step 1 — Draw and label the parts.\n\nStep 2 — Two functions plus the temperature reason.\n\nStep 3 — Genetic material and tail.',
  scheme: [['(a) Labelled diagram', 2], ['(b) Two functions (0.5 each)', 1], ['(b) Lower temperature reason', 1], ['(c) Genetic material and tail', 1]],
  d: 3, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 reproductive health
add('std-bacterial-mcq', mcq({
  stem: 'Which pair consists only of sexually transmitted diseases caused by bacteria?',
  right: 'Gonorrhoea and syphilis',
  wrong: ['Warts and HIV-AIDS', 'Syphilis and warts', 'Gonorrhoea and HIV-AIDS'],
  sol: 'Gonorrhoea and syphilis are bacterial — option (@K). Warts and HIV-AIDS are viral.',
  d: 1, c: 'recall', t: [5],
}));
add('condom-mcq', mcq({
  stem: 'Which contraceptive method also reduces the risk of passing on sexually transmitted diseases?',
  right: 'Condom',
  wrong: ['Oral contraceptive pills', 'Copper-T', 'Vasectomy'],
  sol: 'A condom is a physical barrier, so it reduces the spread of infections as well as preventing pregnancy — option (@K). Pills, copper-T and surgery give no protection against infections.',
  d: 2, c: 'understanding', t: [5],
}));
add('copper-t-mcq', mcq({
  stem: 'A copper-T is placed in the:',
  right: 'uterus',
  wrong: ['oviduct', 'vagina', 'ovary'],
  sol: 'The copper-T (a loop) is placed in the uterus to prevent pregnancy — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('vasectomy-mcq', mcq({
  stem: 'After a vasectomy, a man still produces semen, but it contains no sperms. Why?',
  right: 'The vas deferens is blocked, so sperms cannot reach the urethra.',
  wrong: ['The testes stop making testosterone.', 'The urethra is blocked, so no fluid can leave.', 'The prostate gland is removed.'],
  sol: 'In a vasectomy the vas deferens is cut and blocked; the glands still add fluid, but sperms cannot travel past the block — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('pill-mcq', mcq({
  stem: 'Oral contraceptive pills prevent pregnancy mainly by:',
  right: 'changing the hormone balance so that eggs are not released',
  wrong: ['killing sperms in the vagina', 'blocking the oviducts permanently', 'forming a barrier over the cervix'],
  sol: 'Pills act on the hormonal balance of the body so that eggs are not released — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('method-choice-mcq', mcq({
  stem: 'A couple with two children have decided, after discussion with their doctor, that they want a permanent method of contraception. Which method fits best?',
  right: 'Surgical blocking of the vas deferens or the oviducts',
  wrong: ['Condoms', 'Oral contraceptive pills', 'Copper-T'],
  sol: 'Vasectomy or tubectomy is a permanent method — option (@K). Condoms, pills and the copper-T are temporary methods.',
  d: 2, c: 'application', t: [5],
}));
add('foeticide-ar', ar({
  a: 'Prenatal sex determination is allowed by law in India.',
  r: 'Female foeticide lowers the child sex ratio.',
  key: 'd',
  sol: 'A is false: prenatal sex determination is banned by law in India to prevent sex-selective abortion. R is true — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('condom-ar', ar({
  a: 'Condoms help to prevent pregnancy.',
  r: 'Condoms reduce the spread of sexually transmitted diseases such as gonorrhoea.',
  key: 'b',
  sol: 'Both are true. Condoms prevent pregnancy because they stop sperms reaching the egg; their protection against infections is a separate benefit, so R does not explain A — option (b).',
  d: 3, c: 'analysis', t: [5],
}));
add('surgery-tf', tf({
  stem: 'Surgical methods of contraception, such as blocking the oviducts, can be easily reversed with medicines.',
  key: 'f',
  sol: 'False. Surgical methods are meant to be permanent; they cannot be reversed with medicines.',
  d: 2, c: 'understanding', t: [5],
}));
add('hiv-fill', fill({
  stem: 'HIV-AIDS is a sexually transmitted disease caused by a ___.',
  acc: [['virus', 'HIV', 'human immunodeficiency virus']],
  sol: 'It is caused by a **virus** (HIV).',
  d: 1, c: 'recall', t: [5],
}));
add('contra-compare-short', short({
  marks: 2,
  stem: 'Compare barrier methods and hormonal methods of contraception, giving one advantage of each.',
  model: '**Barrier methods** (condoms) physically stop sperms from reaching the egg; their advantage is that they also **reduce the spread of STDs**. **Hormonal methods** (oral pills) change the hormone balance so that **eggs are not released**; their advantage is that they are effective when taken regularly and are used privately, though they can have side effects.',
  sol: 'State how each works and one advantage of each.',
  scheme: [['Barrier method and an advantage', 1], ['Hormonal method and an advantage', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('foeticide-short', short({
  marks: 3,
  stem: 'A newspaper reports that a clinic was sealed for telling families the sex of unborn babies.\n\n(a) Why is this practice banned?\n\n(b) Give two harmful effects of female foeticide on society.\n\n(c) Suggest one way, other than the law, to prevent it.',
  model: '(a) Knowing the sex of the foetus can lead to the **abortion of female foetuses** (female foeticide), which is a crime; banning the test removes this possibility.\n\n(b) It **lowers the child sex ratio**, so there are fewer girls than boys; this creates an unequal society and can lead to problems such as fewer women to marry and the mistreatment of girls and women.\n\n(c) Awareness campaigns and support schemes that show that **daughters are as valuable as sons**, for example by encouraging girls’ education.',
  sol: 'Step 1 — Link sex determination to female foeticide.\n\nStep 2 — Effects on the sex ratio and society.\n\nStep 3 — A social measure.',
  scheme: [['(a) Leads to female foeticide, a crime', 1], ['(b) Two harmful effects (0.5 each)', 1], ['(c) One sensible measure', 1]],
  d: 3, c: 'evaluation', t: [5],
}));
add('contra-long', long({
  stem: 'A health worker in a village in Odisha explains family planning to a group of newly married couples.\n\n(a) Why is it important for the health of the mother to have a gap between pregnancies?\n\n(b) Describe four methods of contraception, stating how each works.\n\n(c) Which of these methods would she also recommend for protection against sexually transmitted diseases, and why?',
  model: '(a) Each pregnancy and birth takes a lot from the mother’s body; a gap lets her **regain her health and strength**, and it also helps the family care for each child properly.\n\n(b) **Condom (barrier):** stops sperms from reaching the egg. **Oral pills (hormonal):** change the hormone balance so that eggs are not released. **Copper-T (loop):** placed in the uterus to prevent pregnancy. **Surgical method:** the vas deferens (vasectomy) or the oviducts (tubectomy) are blocked, so sperms or eggs cannot pass; this is permanent.\n\n(c) The **condom**, because it is a physical barrier that also reduces the passing of infections such as gonorrhoea, syphilis and HIV between partners.',
  sol: 'Step 1 — Health of the mother and family.\n\nStep 2 — Four methods, each with how it works.\n\nStep 3 — Only the barrier method protects against infections.',
  scheme: [['(a) Mother’s health and the family', 1], ['(b) Four methods with how they work (0.5 each)', 2], ['(c) Condom, with reason', 2]],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- case-based
add('bacteria-case', mk.case({
  passage: 'A student spread equal drops of pond water on four plates of nutrient jelly and kept each plate at a different temperature for a day. Each visible spot (colony) grew from a single bacterium. She then picked bacteria from the 45 °C plate, grew them for many generations, and tested them again at 45 °C.\n\n| Plate | Temperature (°C) | Colonies after one day |\n|---|---|---|\n| P | 30 | 210 |\n| Q | 40 | 182 |\n| R | 45 | 24 |\n| S | 50 | 0 |\n| T (offspring of R’s bacteria) | 45 | 196 |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which observation best shows that bacteria in the pond water differed in their tolerance of heat?',
      right: 'At 45 °C only a few of the bacteria formed colonies.',
      wrong: ['At 30 °C there were 210 colonies.', 'At 50 °C no colonies formed.', 'Plates P and Q had similar numbers.'],
      sol: 'At 45 °C most bacteria failed but a few grew, so the bacteria were not all alike — option (@K).',
      d: 3, c: 'analysis', t: [1],
    })),
    part('b', num({
      stem: 'What percentage of the colonies seen at 30 °C were able to grow at 45 °C? Give your answer to the nearest whole number.',
      value: 11, tol: 0.5, unit: '%',
      sol: r`Percentage $= \dfrac{24}{210} \times 100 \approx 11.4$, so about 11%.`,
      scheme: [['About 11%', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why plate T, grown from the survivors on plate R, had almost as many colonies at 45 °C as plate P had at 30 °C.',
      model: 'The few bacteria that survived on plate R had a **variation** that let them tolerate 45 °C. When they reproduced, their DNA was **copied and passed on**, so nearly all their offspring also tolerated 45 °C. The heat had removed the bacteria without this variation.',
      sol: 'Link the survivors’ variation to its inheritance through DNA copying.',
      scheme: [['Survivors had a heat-tolerance variation', 1], ['It was passed on to their offspring by DNA copying', 1]],
      d: 4, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Use the data to explain how variation helps a species survive a change in its environment, such as a pond warming up.',
        model: 'The population was varied: most bacteria died at 45 °C, but about one in ten survived (24 of 210). If the pond warmed up, these survivors would reproduce and pass on their heat tolerance (plate T: 196 colonies), so the species would **continue** instead of being wiped out.',
        sol: 'Use the 24-out-of-210 survivors and plate T to show that varied individuals keep the species going.',
        scheme: [['Uses the data to show only some survive', 1], ['Survivors keep the species going by passing on the variation', 1]],
        d: 4, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(Math.round((24 / 210) * 100), q.children[1].answer.value) || 'percent');
add('nursery-case', mk.case({
  passage: 'Mrs D’Souza runs a plant nursery near Pune. She sells mango saplings made by grafting shoots of a prize-winning tree onto young rooted plants, rose plants grown from stem cuttings, and sugarcane setts (short stem pieces with buds) for farmers. On a shelf by the window, a single Bryophyllum leaf lying on moist soil has tiny plants growing from its edges. She tells visitors that her banana plants come from side shoots called suckers, “because bananas do not give us seeds to sow”.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'From which part does Bryophyllum produce the new plants seen on the shelf?',
      right: 'Buds in the notches of the leaf margin',
      wrong: ['Seeds inside the leaf', 'Spores on the underside of the leaf', 'Roots growing from the stem tip'],
      sol: 'Bryophyllum forms buds in the notches along its leaf margin, which grow into new plants — option (@K).',
      d: 1, c: 'recall', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the method of reproduction common to all the plants she sells, and say why it suits a nursery.',
      model: '**Vegetative propagation**; it gives plants identical to a good parent, quickly.',
      sol: 'All grow from stems, leaves or shoots, not seeds.',
      scheme: [['Vegetative propagation with a reason', 1]],
      d: 2, c: 'understanding', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Give two reasons why customers who buy her grafted mango saplings get better results than if they planted mango seeds.',
      model: 'The grafted saplings are **genetically similar to the prize-winning tree**, so the fruit has the same taste and quality; seedlings would vary. Grafted plants also **bear fruit years earlier** than plants grown from seed.',
      sol: 'Identical qualities and earlier fruiting.',
      scheme: [['Same quality as the parent tree', 1], ['Earlier fruiting', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A farmer plans to plant his whole village’s fields with sugarcane setts from just one plant. Evaluate this plan.',
        model: 'The plan gives fast, uniform crops with the parent’s good qualities. But all the plants would be **almost identical**, with little variation, so a single disease or pest that attacks one could **destroy the whole crop**. It would be safer to use setts from several good plants or varieties.',
        sol: 'Weigh the advantage (uniform, quick) against the risk of no variation.',
        scheme: [['One advantage of the plan', 1], ['Risk from lack of variation', 1]],
        d: 4, c: 'evaluation', t: [1, 2],
      }),
    ]),
  ],
}));
add('mould-case', mk.case({
  passage: 'Students in Guwahati placed three slices of the same bread in clean, closed boxes and checked them every day for a week.\n\n| Slice | Treatment | Observation |\n|---|---|---|\n| A | Moist, kept at room temperature (about 30 °C) | Black, fuzzy patches by day 3 |\n| B | Toasted dry, kept at room temperature | No mould after 7 days |\n| C | Moist, kept in a refrigerator (about 5 °C) | One small patch on day 7 |\n\nUnder a hand lens, the patches on slice A showed fine threads and tiny black round heads on stalks.',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The tiny black round heads seen under the hand lens are:',
      right: 'sporangia containing spores',
      wrong: ['buds that will detach', 'seeds of the mould', 'fragments of the bread'],
      sol: 'Bread mould carries sporangia full of spores on upright stalks — option (@K).',
      d: 1, c: 'recall', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'The boxes were closed and the bread came from a fresh packet. Where did the mould most likely come from?',
      model: '**Spores** already present in the air (or on the bread), which germinated on the moist slices.',
      sol: 'Spores are everywhere in the air and need moisture to germinate.',
      scheme: [['Spores from the air or on the bread', 1]],
      d: 3, c: 'analysis', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Using the results for slices A, B and C, explain how moisture and temperature affect the growth of bread mould.',
      model: '**Moisture:** A (moist) grew mould by day 3, but B (dry) grew none in 7 days, so spores need moisture to germinate. **Temperature:** A (30 °C) and C (5 °C) were both moist, but C had only one small patch by day 7, so warmth speeds up mould growth and cold slows it.',
      sol: 'Compare A with B for moisture and A with C for temperature.',
      scheme: [['Moisture effect from A and B', 1], ['Temperature effect from A and C', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A bakery owner wants his bread to stay mould-free for longer during the monsoon. Suggest two measures and justify each using the results.',
        model: '(1) Store the bread in a **cool place**, such as a refrigerator, because slice C at 5 °C grew far less mould than slice A at 30 °C. (2) Keep the bread **dry** and well sealed, because the dry slice B grew no mould, while spores germinated on the moist slice A.',
        sol: 'Base each measure on a comparison in the table.',
        scheme: [['Cool storage justified by A and C', 1], ['Dry, sealed storage justified by A and B', 1]],
        d: 3, c: 'application', t: [2],
      }),
    ]),
  ],
}));
add('pumpkin-case', mk.case({
  passage: 'Pumpkin vines carry separate male and female flowers. At an agricultural college in Karnataka, students chose 60 female flowers on the morning they opened and treated them in three ways.\n\n| Group | Treatment of female flowers | Flowers | Flowers that formed pumpkins |\n|---|---|---|---|\n| X | Left open to visiting bees | 20 | 15 |\n| Y | Covered with a fine net bag | 20 | 0 |\n| Z | Covered with a bag, but pollen from male flowers was brushed onto the stigma by hand, and the bag replaced | 20 | 17 |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Why did none of the flowers in group Y form pumpkins?',
      right: 'No pollen reached their stigmas, so fertilisation could not happen.',
      wrong: ['The bags blocked the sunlight needed to form fruit.', 'Female pumpkin flowers produce their own pollen.', 'The ovules were removed by the bags.'],
      sol: 'Pumpkin flowers are unisexual, so female flowers need pollen from male flowers; the bags kept bees and pollen out — option (@K). Group Z, also bagged, did form fruit, so the bags themselves were not the problem (@1).',
      d: 3, c: 'analysis', t: [3],
    })),
    part('b', num({
      stem: 'What percentage of the hand-pollinated flowers in group Z formed pumpkins?',
      value: 85, tol: 0, unit: '%',
      sol: r`$\dfrac{17}{20} \times 100 = 85$%.`,
      scheme: [['85%', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Groups Y and Z were both covered with bags. What does comparing them show? Explain.',
      model: 'The only difference was that group Z received pollen by hand. Z formed 17 pumpkins and Y formed none, so **pollination is needed for fruit formation**: pollen leads to fertilisation, and only then does the ovary develop into a fruit.',
      sol: 'Identify the single difference between Y and Z and link it to fertilisation and fruit formation.',
      scheme: [['Identifies hand pollination as the only difference', 1], ['Concludes pollination (and fertilisation) is needed for fruit', 1]],
      d: 4, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A farmer sprays a strong insecticide on his pumpkin field while the vines are flowering. Predict the effect on his harvest and explain using the data.',
        model: 'His harvest is likely to **fall sharply**. Bees carry pollen from male to female flowers (group X: 15 of 20 formed pumpkins); if the insecticide kills or drives away the bees, the female flowers will be like group Y, which received no pollen and formed no pumpkins.',
        sol: 'Link the loss of pollinators to the result for group Y.',
        scheme: [['Predicts fewer pumpkins', 1], ['Explains using pollinators and groups X and Y', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near((17 / 20) * 100, q.children[1].answer.value) || 'percent');
add('clinic-case', mk.case({
  passage: 'At an antenatal clinic in Kolkata, Nurse Ruma explains to expectant mothers that the baby gets everything it needs through the placenta, which is joined to the baby by the umbilical cord. Food and oxygen pass from the mother’s blood into the baby’s blood, and wastes pass the other way, although the two bloods never mix. She advises the mothers to eat a balanced diet with iron-rich foods, to take the tablets given at the clinic, and to avoid smoking and alcohol completely, because harmful substances in the mother’s blood can also cross the placenta.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Where in the mother’s body is the placenta found?',
      right: 'Embedded in the wall of the uterus',
      wrong: ['In the oviduct', 'In the ovary', 'In the cervix'],
      sol: 'The placenta is a disc embedded in the uterine wall — option (@K).',
      d: 1, c: 'recall', t: [4],
    })),
    part('b', fill({
      stem: 'The baby is joined to the placenta by the ___ cord.',
      acc: [['umbilical']],
      sol: 'It is the **umbilical** cord.',
      d: 1, c: 'recall', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the mother’s diet affects the growth of the baby.',
      model: 'The baby cannot eat; all its **food and oxygen come from the mother’s blood** through the placenta. If the mother eats a balanced, iron-rich diet, her blood carries enough nutrients for the baby to grow well; a poor diet means less food reaches the baby.',
      sol: 'Trace nutrients from the mother’s diet to her blood, across the placenta, to the baby.',
      scheme: [['Nutrients reach the baby from the mother’s blood via the placenta', 1], ['So a good diet supports growth (poor diet harms it)', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'The nurse says the two bloods never mix, yet she warns against smoking. Explain why smoking can still harm the baby.',
        model: 'Although the bloods do not mix, substances **pass across** the thin barrier between them in the placenta. Harmful substances from smoking that enter the mother’s blood can cross to the baby along with food and oxygen, and can harm its growth.',
        sol: 'Distinguish mixing of blood from exchange of dissolved substances.',
        scheme: [['Substances cross the placenta even without mixing', 1], ['Harmful substances reach and harm the baby', 1]],
        d: 4, c: 'analysis', t: [4],
      }),
    ]),
  ],
}));
add('sexratio-case', mk.case({
  passage: 'A district health report gives the number of girls for every 1000 boys in the 0–6 years age group (the child sex ratio). Officials found that some clinics had been illegally telling parents the sex of unborn babies. After the clinics were sealed and a "Save the girl child" campaign was run in schools and villages, a new survey was done.\n\n| Year | Girls per 1000 boys (0–6 years) |\n|---|---|\n| 2001 | 942 |\n| 2011 | 905 |\n| 2021 (survey) | 931 |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What is the most likely cause of the fall between 2001 and 2011?',
      right: 'Female foetuses were identified through illegal sex determination and aborted.',
      wrong: ['More boys than girls died in the district.', 'Girls moved to other districts for school.', 'The survey counted only boys’ schools.'],
      sol: 'The report found illegal sex determination; sex-selective abortion of female foetuses lowers the number of girls born — option (@K).',
      d: 3, c: 'analysis', t: [5],
    })),
    part('b', num({
      stem: 'In 2011, how many fewer girls than boys were there for every 1000 boys aged 0–6 years?',
      value: 95, tol: 0, unit: null,
      sol: r`$1000 - 905 = 95$ fewer girls per 1000 boys.`,
      scheme: [['95', 1]],
      d: 2, c: 'application', t: [5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Give two reasons why a falling child sex ratio is harmful to society.',
      model: 'It makes society **unequal**, with fewer girls and women than boys and men, and it reflects a belief that girls are less valuable. In the future there may be fewer women to marry and more pressure on, and mistreatment of, girls and women.',
      sol: 'Give two social consequences of having fewer girls than boys.',
      scheme: [['Reason 1', 1], ['Reason 2', 1]],
      d: 3, c: 'understanding', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Use the data to evaluate whether sealing the clinics and running the campaign helped.',
        model: 'The ratio rose from 905 in 2011 to 931 in 2021, so the measures **appear to have helped**. However, it is still below the 2001 value of 942 and below 1000, so the problem is not fully solved and the effort needs to continue.',
        sol: 'Compare 2011 with 2021, then with 2001, before concluding.',
        scheme: [['Uses the rise from 905 to 931 as evidence', 1], ['Notes it is still below 942 or 1000, so more is needed', 1]],
        d: 4, c: 'evaluation', t: [5],
      }),
    ]),
  ],
}), (q) => near(1000 - 905, q.children[1].answer.value) || 'difference');
