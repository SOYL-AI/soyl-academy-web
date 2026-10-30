// ISC 12 Biology ch02 Fertilisation, Seed and Fruit — two decks: Part 1 (t01–t02), Part 2 (t03–t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { DOUBLE_FERT, DICOT_EMBRYO, MONOCOT_EMBRYO, BEAN, MAIZE, MANGO, COCONUT } from './svgs.mjs';
import { seedTissues, seedsToMeioses } from './calc.mjs';

export const V = {
  df: svgV(DOUBLE_FERT, 'Double fertilisation: one male gamete fuses with the egg and the other with the two polar nuclei'),
  dicot: svgV(DICOT_EMBRYO, 'A mature dicot embryo with two cotyledons, plumule, epicotyl, hypocotyl, radicle and root cap'),
  monocot: svgV(MONOCOT_EMBRYO, 'A grass embryo with scutellum, coleoptile, shoot apex, epiblast, coleorhiza and radicle'),
  bean: svgV(BEAN, 'Bean seed with seed coat, cotyledon, plumule, radicle, hilum and micropyle'),
  maize: svgV(MAIZE, 'L.S. of a maize grain with pericarp, aleurone layer, endosperm, scutellum, coleoptile and coleorhiza'),
  mango: svgV(MANGO, 'L.S. of a mango showing epicarp, fleshy mesocarp, stony endocarp and seed'),
  coconut: svgV(COCONUT, 'L.S. of a coconut showing epicarp, fibrous mesocarp, hard endocarp, solid and liquid endosperm and embryo'),
};

// ---------------------------------------------------------------- computed numbers
const TI = seedTissues(14);
const SM = seedsToMeioses(40);

export const deck1 = deck({
  part: 1,
  title: 'Fertilisation, Seed and Fruit — Part 1: Double fertilisation and post-fertilisation events',
  goals: [
    'Explain double fertilisation and triple fusion and their significance',
    'Distinguish cellular, nuclear and helobial endosperm and define perisperm',
    'Describe embryo development in dicots and monocots',
  ],
  slides: [
    sl('title', 'Fertilisation, Seed and Fruit', {
      b: 'Part 1 — what happens after the pollen tube reaches the embryo sac.',
      v: flow('LR', [['p', 'Pollen tube enters a synergid'], ['d', 'Double fertilisation'], ['e', 'Endosperm and embryo develop'], ['s', 'Ovule becomes seed; ovary becomes fruit']], [['p', 'd'], ['d', 'e'], ['e', 's']], 'Flow from pollen tube entry to seed and fruit'),
      n: 'Fertilisation is followed by a remarkable set of changes. The zygote grows into an embryo, a food tissue forms around it, the ovule matures into a seed, and the ovary ripens into a fruit. Together these are called post-fertilisation events.',
    }),
    sl('diagram', 'Double fertilisation', {
      b: 'The pollen tube releases **two male gametes** into a synergid. One fuses with the **egg** (**syngamy**) to form the **diploid zygote**. The other fuses with the **two polar nuclei** (**triple fusion**) to form the **triploid primary endosperm nucleus (PEN)**. Two fusions in one embryo sac make **double fertilisation**, unique to flowering plants.',
      v: V.df,
      n: 'Because two separate fusion events happen in the same embryo sac, the process is called double fertilisation. The central cell, now holding the primary endosperm nucleus, becomes the primary endosperm cell, which grows into the endosperm. The zygote grows into the embryo.',
    }),
    sl('concept', 'Significance of double fertilisation', {
      b: 'Double fertilisation links the formation of food tissue to successful fertilisation.',
      v: table(['Event', 'Significance'], [['Syngamy', 'Restores the diploid number in the zygote; combines characters of two parents'], ['Triple fusion', 'Forms the triploid endosperm, a nutritive tissue for the developing embryo'], ['Both together', 'Food tissue is made only when an egg is fertilised, so the plant does not waste food on ovules that fail']], 'Table of the significance of syngamy and triple fusion'),
      n: 'Endosperm forms only when fertilisation has happened. The plant therefore invests food reserves only in ovules that will become seeds, an efficient strategy found in flowering plants.',
    }),
    sl('example', 'Worked example 1: ploidy in the seed', {
      b: `A plant has 2n = ${TI.zygote}. Give the number of chromosomes in the zygote, the primary endosperm nucleus, the perisperm and the seed coat.`,
      ul: [
        r`Zygote: $n + n = ${TI.zygote / 2} + ${TI.zygote / 2} = ${TI.zygote}$.`,
        r`Primary endosperm nucleus: $n + n + n = ${TI.pen}$.`,
        r`Perisperm (persistent nucellus) and seed coat (integuments) are maternal tissues: $2n = ${TI.perisperm}$.`,
      ],
      v: table(['Tissue', 'Origin', 'Chromosomes'], [['Zygote, embryo', 'Egg + male gamete', String(TI.zygote)], ['Endosperm', 'Two polar nuclei + male gamete', String(TI.pen)], ['Perisperm', 'Nucellus', String(TI.perisperm)], ['Seed coat', 'Integuments', String(TI.seedCoat)]], `Worked table: zygote ${TI.zygote}, endosperm ${TI.pen}, perisperm and seed coat ${TI.perisperm}`),
      n: 'Ask where each tissue comes from. The zygote joins two haploid nuclei, so it has fourteen chromosomes. The endosperm joins three, so it has twenty-one. The perisperm and seed coat are just maternal tissue, so they keep the diploid number, fourteen.',
    }),
    sl('check', 'Quick check: triple fusion', {
      b: 'Which nuclei take part in triple fusion?',
      n: 'Quick check. Count the nuclei that meet the second male gamete.',
      chk: 'triple-mcq',
    }),
    sl('concept', 'Endosperm: three types', {
      b: 'Endosperm development **precedes** embryo development. The primary endosperm cell divides repeatedly to form a **triploid endosperm** storing food.',
      v: table(['Type', 'How it forms', 'Example'], [['Nuclear', 'PEN divides repeatedly by free-nuclear division; walls may form later from the periphery', 'Coconut: the water is free-nuclear endosperm, the white kernel is cellular'], ['Cellular', 'Every division of the PEN is followed by wall formation', 'Petunia, Datura'], ['Helobial', 'First division forms two unequal cells; the larger divides free-nuclearly, the smaller cellularly or not at all', 'Many monocots, e.g. Asphodelus']], 'Table of nuclear, cellular and helobial endosperm with examples'),
      n: 'Nuclear endosperm is the commonest type. Tender coconut water is a free-nuclear endosperm made up of thousands of nuclei, and the surrounding white kernel is the cellular part. The endosperm may be used up before the seed matures, as in pea and bean, or may persist, as in cereals and castor.',
    }),
    sl('concept', 'Perisperm and seed coverings', {
      b: 'In some seeds, remnants of the **nucellus** persist. This **residual, persistent nucellus** is the **perisperm**, e.g. **black pepper** and **beet**. It is **diploid** and maternal, unlike the triploid endosperm.',
      v: table(['Tissue', 'Origin', 'Ploidy'], [['Endosperm', 'Primary endosperm cell after triple fusion', '3n'], ['Perisperm', 'Persistent nucellus', '2n'], ['Seed coat', 'Integuments', '2n'], ['Pericarp', 'Ovary wall', '2n']], 'Table comparing endosperm, perisperm, seed coat and pericarp'),
      n: 'Not every food tissue in a seed is endosperm. In black pepper and beet, part of the nucellus survives as perisperm. Remember that the perisperm, the seed coat and the fruit wall are all maternal and diploid.',
    }),
    sl('diagram', 'Embryo development in dicots', {
      b: 'The embryo develops at the **micropylar end** of the embryo sac. The zygote divides to form the **proembryo**, then **globular**, **heart-shaped** and mature stages. A dicot embryo has an **embryonal axis** with **two cotyledons**: above them the **epicotyl** ends in the **plumule**; below, the **hypocotyl** ends in the **radicle** with a **root cap**.',
      v: V.dicot,
      n: 'Most zygotes divide only after some endosperm has formed, an adaptation that assures nutrition for the young embryo. The stages from proembryo to globular to heart-shaped are common to dicots, and the mature embryo has two cotyledons on its axis.',
    }),
    sl('diagram', 'Embryo development in monocots', {
      b: 'A monocot (grass) embryo has **one cotyledon**, the **scutellum**, on one side of the axis. The shoot apex and leaf primordia are enclosed in a hollow sheath, the **coleoptile**; the radicle and root cap are enclosed in the **coleorhiza**. A small **epiblast** may be present.',
      v: V.monocot,
      n: 'In grasses the single cotyledon is shield-shaped and called the scutellum. The shoot and root tips are protected by sheaths, the coleoptile above and the coleorhiza below, which they push through during germination.',
    }),
    sl('example', 'Worked example 2: counting for a pod', {
      b: `A pea pod contains ${SM.seeds} seeds. What is the minimum number of ovules, pollen grains, male gametes and meiotic divisions needed? (Each embryo sac is monosporic; each pollen mother cell gives 4 pollen grains.)`,
      ul: [
        r`Ovules $=$ seeds $= ${SM.ovules}$; pollen grains $= ${SM.pollen}$ (one tube per ovule); male gametes $= 2 \times ${SM.seeds} = ${SM.gametes}$.`,
        r`Female meioses $= ${SM.femaleMeioses}$ (one MMC per ovule); male meioses $= \dfrac{${SM.pollen}}{4} = ${SM.maleMeioses}$.`,
        r`Total meioses $= ${SM.femaleMeioses} + ${SM.maleMeioses} = ${SM.total}$.`,
      ],
      v: table(['Quantity', 'Minimum number'], [['Ovules', String(SM.ovules)], ['Pollen grains', String(SM.pollen)], ['Male gametes', String(SM.gametes)], ['Meioses (female + male)', `${SM.femaleMeioses} + ${SM.maleMeioses} = ${SM.total}`]], `Worked table: ${SM.total} meioses for ${SM.seeds} seeds`),
      n: 'Each seed needs one ovule and one pollen grain, and each pollen grain supplies two male gametes. One meiosis makes one embryo sac, but one meiosis on the male side makes four pollen grains. So forty seeds need forty plus ten, fifty meioses.',
    }),
    sl('check', 'Quick check: perisperm', {
      b: 'Judge the assertion and the reason about perisperm.',
      n: 'Quick check. Where does perisperm come from?',
      chk: 'perisperm-ar',
    }),
    sl('check', 'Quick check: monocot embryo', {
      b: 'What is the sheath that encloses the radicle of a grass embryo called?',
      n: 'Quick check. Remember the two sheaths.',
      chk: 'coleorhiza-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Double fertilisation: syngamy (egg + male gamete → 2n zygote) and triple fusion (2 polar nuclei + male gamete → 3n PEN).',
        'Endosperm forms before the embryo: nuclear (coconut water), cellular (Petunia, Datura), helobial (many monocots).',
        'Perisperm: persistent nucellus (black pepper, beet), 2n.',
        'Dicot embryo: proembryo → globular → heart-shaped → mature; two cotyledons, plumule, radicle.',
        'Monocot embryo: scutellum, coleoptile, coleorhiza.',
      ],
      v: table(['Product', 'Ploidy'], [['Zygote', '2n'], ['Endosperm', '3n'], ['Perisperm', '2n']], 'Summary table of ploidy of three products'),
      n: 'To recap: two male gametes give two fusions, a diploid zygote and a triploid endosperm. Endosperm forms first, in nuclear, cellular or helobial fashion. Then the embryo develops, with two cotyledons in dicots and a scutellum in grasses.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Define **double fertilisation** and **triple fusion** separately; give the **ploidy** of each product.',
        'Name an **example** for each endosperm type.',
        'Distinguish **endosperm** and **perisperm** by origin and ploidy.',
        'Draw and label the **dicot embryo** and the **grass embryo**.',
      ],
      n: 'Exam tips. Define both fusions and give the ploidy of each product. Learn an example for each endosperm type. Separate endosperm from perisperm. And practise both embryo diagrams.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Fertilisation, Seed and Fruit — Part 2: Seeds, fruits and special modes',
  goals: [
    'Describe the internal structure of a bean seed and a maize grain',
    'Distinguish albuminous and non-albuminous seeds, true and false fruits',
    'Describe the L.S. of mango and coconut and the significance of seeds, fruits and dispersal',
    'Explain apomixis, polyembryony and parthenocarpy',
  ],
  slides: [
    sl('title', 'Seeds and fruits', {
      b: 'Part 2 — the products of fertilisation, and the exceptions to the usual route.',
      v: flow('LR', [['o', 'Ovule'], ['s', 'Seed'], ['v', 'Ovary'], ['f', 'Fruit']], [['o', 's', 'matures into'], ['v', 'f', 'ripens into']], 'Flow showing ovule becoming seed and ovary becoming fruit'),
      n: 'The seed is the final product of sexual reproduction in angiosperms, often described as the fertilised ovule. The ovary wall becomes the fruit wall, or pericarp, and protects and helps disperse the seeds.',
    }),
    sl('diagram', 'A dicot seed: bean', {
      b: 'A bean seed has a **seed coat** of two layers, the outer **testa** and inner **tegmen**. The **hilum** is the scar where the seed was attached to its stalk; the **micropyle** lies beside it. The embryo has two large **cotyledons** storing food and an embryonal axis with **plumule** and **radicle**. The endosperm is used up: the seed is **non-albuminous (exalbuminous)**.',
      v: V.bean,
      n: 'In bean, pea and groundnut, the cotyledons absorb the endosperm during development, so the mature seed has no endosperm and stores its food in fat, fleshy cotyledons.',
    }),
    sl('diagram', 'A monocot grain: maize', {
      b: 'In a maize grain the **pericarp is fused with the seed coat**. Below it lies the **aleurone layer**, a protein-rich layer around the starchy **endosperm**. The embryo has a **scutellum**, a **coleoptile** over the plumule and a **coleorhiza** over the radicle. The endosperm persists: the seed is **albuminous**.',
      v: V.maize,
      n: 'A maize grain is really a fruit, because the fruit wall and seed coat are fused. Most of it is endosperm, which persists in the mature seed and feeds the seedling through the scutellum during germination.',
    }),
    sl('concept', 'Albuminous and non-albuminous seeds', {
      b: 'Seeds differ in whether the endosperm survives to maturity.',
      v: table(['Type', 'Endosperm in mature seed', 'Examples'], [['Albuminous (endospermic)', 'Persists', 'Wheat, maize, barley, castor, coconut'], ['Non-albuminous (exalbuminous)', 'Used up during development; food stored in cotyledons', 'Pea, bean, groundnut, gram']], 'Table comparing albuminous and non-albuminous seeds'),
      n: 'Cereals and castor keep their endosperm, so their seeds are albuminous. Pea, bean and groundnut use it up, so their seeds are non-albuminous. As seeds mature, their water content falls to about ten to fifteen percent and many enter dormancy.',
    }),
    sl('check', 'Quick check: seeds', {
      b: 'Which of these seeds is non-albuminous?',
      n: 'Quick check. Which seed stores food in its cotyledons?',
      chk: 'albumin-mcq',
    }),
    sl('example', 'Worked example 1: classifying seeds and tissues', {
      b: 'A student opens four seeds. Classify each as albuminous or non-albuminous and name the main food-storing tissue.',
      ul: [
        'Castor: endosperm present → **albuminous**; food in **endosperm**.',
        'Groundnut: two thick cotyledons, no endosperm → **non-albuminous**; food in **cotyledons**.',
        'Wheat grain: large starchy endosperm under the aleurone layer → **albuminous**.',
        'Black pepper: food in persistent nucellus → stored in the **perisperm**.',
      ],
      v: table(['Seed', 'Type', 'Food store'], [['Castor', 'Albuminous', 'Endosperm'], ['Groundnut', 'Non-albuminous', 'Cotyledons'], ['Wheat', 'Albuminous', 'Endosperm'], ['Black pepper', 'With perisperm', 'Perisperm']], 'Worked table classifying four seeds'),
      n: 'Look for where the food is stored. If it is in a separate tissue around the embryo, the seed is albuminous, unless that tissue is the nucellus, which is perisperm. If the cotyledons are fat and fleshy and there is no other tissue, the seed is non-albuminous.',
    }),
    sl('concept', 'True and false fruits', {
      b: 'A **true fruit** develops only from the **ovary**. In a **false fruit**, other floral parts also contribute — most often the **thalamus**. Fruits formed without fertilisation are **parthenocarpic**.',
      v: table(['Fruit', 'Develops from', 'Examples'], [['True fruit', 'Ovary only', 'Mango, coconut, pea, tomato'], ['False fruit', 'Ovary plus thalamus (or other parts)', 'Apple, strawberry, cashew'], ['Parthenocarpic fruit', 'Ovary without fertilisation; seedless', 'Banana']], 'Table of true, false and parthenocarpic fruits with examples'),
      n: 'In most plants, by the time the fruit develops from the ovary the other floral parts have withered. In apple and strawberry, however, the fleshy part you eat is mostly the thalamus, so these are false fruits.',
    }),
    sl('diagram', 'L.S. of mango: a drupe', {
      b: 'Mango is a **drupe**: a fleshy, one-seeded fruit from a monocarpellary superior ovary. Its **pericarp** has three layers: a thin **epicarp** (skin), a thick fleshy edible **mesocarp**, and a hard, stony **endocarp** enclosing the **seed**.',
      v: V.mango,
      n: 'In mango we eat the mesocarp. The stony endocarp around the seed is why mango and coconut are called stone fruits, or drupes.',
    }),
    sl('diagram', 'L.S. of coconut: a drupe', {
      b: 'Coconut is also a drupe, but its **mesocarp is fibrous** (coir) and its **endocarp** is the hard shell. Inside, the seed has a **white solid endosperm** (kernel) and **liquid endosperm** (coconut water), with a small **embryo** at one end.',
      v: V.coconut,
      n: 'In coconut we eat the endosperm, both the white kernel and the water, not the mesocarp. The fibrous mesocarp lets the fruit float, which helps it to be dispersed by sea water.',
    }),
    sl('example', 'Worked example 2: which part do we eat?', {
      b: 'Name the edible part of each fruit and the tissue it comes from.',
      ul: [
        'Mango → **mesocarp** (part of the pericarp, from the ovary wall).',
        'Coconut → **endosperm**, both solid (kernel) and liquid (water).',
        'Apple → mainly the **thalamus**, so apple is a false fruit.',
        'Wheat → **endosperm** of the grain.',
      ],
      v: table(['Fruit', 'Edible part', 'Origin'], [['Mango', 'Mesocarp', 'Ovary wall'], ['Coconut', 'Endosperm', 'Triple fusion'], ['Apple', 'Fleshy thalamus', 'Thalamus'], ['Wheat', 'Endosperm', 'Triple fusion']], 'Worked table of edible parts and their origins'),
      n: 'Trace each edible part to its origin. The flesh of a mango is fruit wall. Coconut and wheat give us endosperm from triple fusion. And the crisp flesh of an apple is mostly swollen thalamus.',
    }),
    sl('check', 'Quick check: fruits', {
      b: 'Judge the assertion and the reason about the apple.',
      n: 'Quick check. Which floral part forms most of the apple?',
      chk: 'apple-ar',
    }),
    sl('concept', 'Significance of seeds, fruits and dispersal', {
      b: 'Seeds and fruits gave angiosperms great advantages.',
      v: table(['Feature', 'Significance'], [['Seeds', 'Do not depend on water for pollination and fertilisation; carry food reserves; can stay dormant and viable for long (a lupine seed about 10,000 years old germinated; a date palm seed about 2,000 years old was viable)'], ['Seed variation', 'Products of sexual reproduction generate new genetic combinations'], ['Fruits', 'Protect seeds and aid dispersal'], ['Dispersal', 'Colonises new habitats and reduces crowding and competition near the parent']], 'Table of the significance of seeds, fruits and dispersal'),
      n: 'Seeds are the basis of agriculture: their dormancy and long life let us store them as food and planting material. Fruits protect the seeds and help disperse them by wind, water or animals to new places.',
    }),
    sl('concept', 'Apomixis, polyembryony and parthenocarpy', {
      b: 'Some plants form seeds or fruits outside the usual route.',
      v: table(['Mode', 'What happens', 'Examples and use'], [['Apomixis', 'Seeds form without fertilisation (asexual reproduction that mimics sexual reproduction), e.g. from a diploid egg or from nucellar cells', 'Some Asteraceae and grasses; hybrid seed made apomictic would not segregate, so farmers could reuse it'], ['Polyembryony', 'More than one embryo in a seed, often from nucellar cells that grow into the embryo sac', 'Citrus, mango'], ['Parthenocarpy', 'Fruit develops without fertilisation; seedless', 'Banana; can be induced by growth hormones']], 'Table of apomixis, polyembryony and parthenocarpy with examples'),
      n: 'Apomixis gives seeds that are genetically identical to the parent. That is why breeders are interested in it: hybrid varieties lose their combination of characters when farmers sow their own seed, but apomictic hybrids would breed true year after year.',
    }),
    sl('check', 'Quick check: special modes', {
      b: 'Seedless banana fruits develop without fertilisation. This is called',
      n: 'Quick check. The fruit forms but no seed.',
      chk: 'parthenocarpy-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Bean: testa, tegmen, hilum, micropyle, two cotyledons, plumule, radicle; non-albuminous.',
        'Maize: pericarp fused with seed coat, aleurone layer, endosperm, scutellum, coleoptile, coleorhiza; albuminous.',
        'True fruit from ovary only; false fruit with thalamus (apple, strawberry, cashew); parthenocarpic (banana).',
        'Mango: epicarp, fleshy mesocarp, stony endocarp; coconut: fibrous mesocarp, shell, solid and liquid endosperm.',
        'Apomixis (Asteraceae, grasses), polyembryony (citrus, mango), parthenocarpy (banana).',
      ],
      v: table(['Fruit', 'Edible part'], [['Mango', 'Mesocarp'], ['Coconut', 'Endosperm'], ['Apple', 'Thalamus']], 'Summary table of edible parts'),
      n: 'To recap: seeds may keep or use up their endosperm. Fruits may come from the ovary alone or include the thalamus. Mango and coconut are both drupes with different edible parts. And apomixis, polyembryony and parthenocarpy bypass the usual route.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Draw the **L.S. of maize grain** and the **L.S. of mango and coconut** with the three pericarp layers.',
        'Give **two examples** each of albuminous and non-albuminous seeds.',
        'Explain why apple is a **false fruit**.',
        'Explain the **importance of apomixis** for hybrid seed.',
      ],
      n: 'Exam tips. Practise the maize, mango and coconut diagrams. Learn two examples of each kind of seed. Explain why apple is a false fruit. And explain why apomixis matters to farmers who use hybrid seed.',
    }),
  ],
});
