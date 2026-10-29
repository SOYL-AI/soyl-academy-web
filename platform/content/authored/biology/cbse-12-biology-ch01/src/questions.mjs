// ch01 Sexual Reproduction in Flowering Plants — question bank. AR keys planned: a c a c d b.
import { mk, add, r } from './lib.mjs';
import { ploidy, pollenFromAnther, seedsToMeioses, sacNuclei } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const opt = (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md;

// ---------------------------------------------------------------- t01 flower, gametophytes
add('tetrad-mcq', mcq({
  stem: 'A microspore tetrad is formed when a microspore mother cell divides. Which division forms it, and what is the ploidy of each microspore?',
  right: 'Meiosis; each microspore is haploid.',
  wrong: ['Mitosis; each microspore is diploid.', 'Meiosis; each microspore is diploid.', 'Mitosis; each microspore is haploid.'],
  sol: 'The diploid mother cell undergoes meiosis, so the four microspores of the tetrad are haploid — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('tapetum-mcq', mcq({
  stem: 'In a mutant plant, the innermost wall layer of the microsporangium breaks down very early, before the microspores have formed walls. Which outcome is most likely?',
  right: 'Pollen grains fail to develop properly, because this layer nourishes them.',
  wrong: ['The anther cannot split open, because this layer causes dehiscence.', 'Ovules fail to form, because this layer supplies the ovary.', 'Pollen grains become diploid, because meiosis is skipped.'],
  sol: 'The innermost layer is the tapetum, which nourishes the developing pollen; without it, pollen development fails — option (@K). Dehiscence depends on the outer layers (@1); the tapetum has nothing to do with ovules (@2) or with meiosis (@3).',
  d: 3, c: 'application', t: [1],
}));
add('exine-ar', ar({
  a: 'Pollen grains are well preserved as fossils.',
  r: 'The exine of pollen contains sporopollenin, which withstands high temperatures, strong acids and alkalis, and is not broken down by any known enzyme.',
  key: 'a',
  sol: 'Both are true, and the resistance of sporopollenin is exactly why pollen survives for long periods as fossils — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('sac-count-mcq', mcq({
  stem: 'A typical mature embryo sac of a flowering plant has',
  right: '7 cells and 8 nuclei',
  wrong: ['8 cells and 8 nuclei', '7 cells and 7 nuclei', '8 cells and 7 nuclei'],
  sol: 'Three antipodals + egg + two synergids + one central cell = 7 cells; the central cell has two polar nuclei, so there are 8 nuclei — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
{
  const P = ploidy(20);
  add('synergid-ploidy-mcq', mcq({
    stem: 'A plant has 20 chromosomes in its root tip cells. How many chromosomes are present in a synergid and in a nucellus cell of this plant?',
    right: `${P.haploid} and ${P.diploid}`,
    wrong: [`${P.diploid} and ${P.diploid}`, `${P.haploid} and ${P.haploid}`, `${P.diploid} and ${P.triploid}`],
    sol: `Root cells are diploid, $2n = ${P.diploid}$. A synergid is a cell of the embryo sac, formed by mitosis from the haploid megaspore: ${P.haploid}. The nucellus is sporophyte tissue: ${P.diploid} — option (@K).`,
    d: 2, c: 'application', t: [1],
  }), (q) => opt(q) === `${ploidy(20).haploid} and ${ploidy(20).diploid}` || 'key');
}
add('germpore-mcq', mcq({
  stem: 'Through which part of the pollen wall does the pollen tube emerge?',
  right: 'A germ pore, where sporopollenin is absent',
  wrong: ['The thickest part of the exine', 'The generative cell wall', 'Any point, as the exine dissolves on the stigma'],
  sol: 'Germ pores are the gaps in the exine without sporopollenin; the intine bulges out through one of them as the pollen tube — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('pollen-stage-mcq', mcq({
  stem: 'In more than 60 percent of flowering plants, pollen grains are shed at the',
  right: 'two-celled stage: a vegetative cell and a generative cell',
  wrong: ['three-celled stage: a vegetative cell and two male gametes', 'one-celled stage: a single microspore', 'tetrad stage: four microspores held together'],
  sol: 'Most flowering plants shed two-celled pollen; the generative cell divides later, in the pollen tube — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('nucellus-tf', tf({
  stem: 'The nucellus of an ovule is a haploid tissue, like the embryo sac it encloses.',
  key: 'f',
  sol: 'False. The nucellus is part of the parent plant (sporophyte) and is diploid; only the embryo sac, formed from a meiotic megaspore, is haploid.',
  d: 2, c: 'understanding', t: [1],
}));
add('viability-mcq', mcq({
  stem: 'A breeder wants to pollinate rice plants at one research farm with pollen collected from a rice variety growing at another farm, three hours away by road. What should she do to make the cross succeed?',
  right: 'Store the collected pollen in liquid nitrogen and carry it in that state.',
  wrong: ['Carry the pollen in an open paper envelope so that it stays dry.', 'Soak the pollen in water so that it does not dry out.', 'Nothing special, as rice pollen stays viable for several months.'],
  sol: 'Rice pollen loses viability within about half an hour of release, so it must be kept alive by cryopreservation in liquid nitrogen (about −196 °C) — option (@K). (@3) is true only of some other families; soaking (@2) would ruin the pollen.',
  d: 3, c: 'application', t: [1],
}));
add('polar-ar', ar({
  a: 'Each polar nucleus of the embryo sac is haploid.',
  r: 'The polar nuclei are formed by meiosis of the functional megaspore nucleus inside the embryo sac.',
  key: 'c',
  sol: 'A is true: each polar nucleus is haploid. R is false: meiosis happens once, in the megaspore mother cell; the functional megaspore nucleus then divides only by mitosis, which keeps the haploid number — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
{
  const A = pollenFromAnther({ sporangia: 4, mmcPerSporangium: 30 });
  add('anther-num', num({
    stem: 'Each microsporangium of an anther contains 30 microspore mother cells. If the anther has the usual number of microsporangia and every mother cell completes meiosis, how many pollen grains will it produce?',
    value: A.pollen,
    sol: r`A typical anther has 4 microsporangia. Mother cells $= 4 \times 30 = ${A.totalMmc}$; each gives 4 pollen grains, so pollen $= ${A.totalMmc} \times 4 = ${A.pollen}$.`,
    scheme: [[`${A.pollen} pollen grains`, 1]],
    d: 3, c: 'application', t: [1],
  }), (q) => q.answer.value === 4 * 30 * 4 || 'value');
}
add('mitoses-num', num({
  stem: 'How many successive free-nuclear mitotic divisions of the functional megaspore nucleus are needed to produce the 8 nuclei of a typical embryo sac?',
  value: 3,
  sol: r`Each mitosis doubles the nuclei: $1 \to 2 \to 4 \to 8$. Since $2^k = 8$, the number of divisions is $k = \log_2 8 = 3$.`,
  scheme: [['3 divisions', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => sacNuclei(q.answer.value) === 8 || 'value');
add('ovule-match', match({
  stem: 'Match each part of the ovule (column I) with its description (column II).',
  pairs: [
    ['Funicle', 'Stalk that attaches the ovule to the placenta'],
    ['Micropyle', 'Small opening left by the integuments'],
    ['Chalaza', 'Basal part of the ovule, opposite the micropylar end'],
    ['Nucellus', 'Mass of cells inside the integuments that holds the embryo sac'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Funicle = stalk to the placenta; micropyle = opening between the integuments; chalaza = base opposite the micropyle; nucellus = tissue containing the embryo sac.',
  d: 2, c: 'recall', t: [1],
}));
add('tapetum-fill', fill({
  stem: 'The innermost wall layer of a microsporangium, which nourishes the developing pollen grains, is the ______.',
  acc: [['tapetum']],
  sol: 'Tapetum.',
  d: 1, c: 'recall', t: [1],
}));
add('generative-fill', fill({
  stem: 'The generative cell of a pollen grain divides by ______ to form two male gametes.',
  acc: [['mitosis', 'mitotic division']],
  sol: 'Mitosis: the generative cell is already haploid, so the two male gametes are haploid too.',
  d: 1, c: 'recall', t: [1],
}));
add('micro-mega-short', short({
  marks: 3,
  stem: 'Give three differences between microsporogenesis and megasporogenesis.',
  model: '1. **Site:** microsporogenesis occurs in the microsporangium of the anther; megasporogenesis occurs in the nucellus of the ovule.\n\n2. **Number of mother cells:** many microspore mother cells form in each microsporangium; usually a single megaspore mother cell forms in an ovule.\n\n3. **Fate of the four spores:** all four microspores of a tetrad develop into pollen grains; usually only one megaspore is functional and the other three degenerate.',
  sol: 'Compare the site, the number of mother cells and the fate of the four products of meiosis.',
  scheme: [['Difference in site', 1], ['Difference in number of mother cells', 1], ['Difference in how many spores survive', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('sac-dev-long', long({
  stem: 'Describe the formation of the female gametophyte of a flowering plant, starting from the megaspore mother cell. Draw a labelled diagram of the mature embryo sac.',
  model: '**Megasporogenesis.** A single, large megaspore mother cell with dense cytoplasm differentiates in the micropylar region of the nucellus. It undergoes meiosis to form four haploid megaspores. Usually three degenerate and one remains functional (monosporic development).\n\n**Embryo sac formation.** The nucleus of the functional megaspore divides by mitosis three times without wall formation (free-nuclear), giving 2, 4 and then 8 nuclei, four at each pole. Six nuclei become enclosed in cells; one nucleus from each pole moves to the centre as a polar nucleus.\n\n**Mature embryo sac (diagram).** It is 7-celled and 8-nucleate: at the micropylar end, the egg apparatus of one egg cell and two synergids with a filiform apparatus; at the chalazal end, three antipodal cells; in the centre, a large central cell with two polar nuclei.',
  sol: 'Order: meiosis of the megaspore mother cell → one functional megaspore → three free-nuclear mitoses → wall formation → seven-celled, eight-nucleate embryo sac.',
  scheme: [['Megaspore mother cell, meiosis, four megaspores, one functional', 1], ['Three free-nuclear mitoses giving eight nuclei', 1], ['Wall formation and the movement of polar nuclei', 1], ['Labelled diagram: egg apparatus, antipodals, central cell with polar nuclei, filiform apparatus', 2]],
  wl: [80, 140],
  d: 3, c: 'understanding', t: [1],
}));
add('tapetum-short', short({
  marks: 2,
  stem: 'In a hybrid plant, the anthers look normal but contain only shrunken, empty pollen grains. Microscopy shows that the innermost layer of the anther wall is abnormal. Name this layer and explain how its defect could cause the observation.',
  model: 'The layer is the **tapetum**. It nourishes the developing microspores and pollen grains; if it is defective, the pollen does not receive the food and materials it needs to develop, so the grains remain shrunken and empty (male sterile).',
  sol: 'Identify the innermost wall layer and link its nourishing role to pollen development.',
  scheme: [['Names the tapetum', 1], ['Explains that it nourishes developing pollen, so pollen fails to develop', 1]],
  d: 3, c: 'application', t: [1],
}));
add('sporopollenin-short', short({
  marks: 2,
  stem: 'Pollen grains of plants that lived millions of years ago are still found in rocks and lake sediments. Explain why, and state where the pollen wall is weakest.',
  model: 'The exine is made of **sporopollenin**, which resists high temperature, strong acids and alkalis and is not degraded by any known enzyme, so pollen survives for millions of years as fossils. The wall is weakest at the **germ pores**, where sporopollenin is absent.',
  sol: 'Link the chemical resistance of sporopollenin to fossilisation, and recall germ pores.',
  scheme: [['Sporopollenin in the exine is highly resistant', 1], ['Germ pores lack sporopollenin', 1]],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 pollination
add('geitono-ar', ar({
  a: 'Geitonogamy is functionally cross-pollination but genetically similar to autogamy.',
  r: 'In geitonogamy, an agent carries pollen from one flower to another flower of the same plant.',
  key: 'a',
  sol: 'Both are true. An agent moves pollen between two flowers (functionally cross), but both flowers belong to the same plant, so the pollen is genetically the same (like autogamy). R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('wind-features-mcq', mcq({
  stem: 'Which set of features best fits a wind-pollinated flower?',
  right: 'Light, non-sticky pollen; exposed stamens; large feathery stigma',
  wrong: ['Bright petals; strong scent; plenty of nectar', 'Sticky pollen; hidden stamens; small smooth stigma', 'Pollen with a mucilage coat; flowers on long stalks reaching the water surface'],
  sol: 'Wind flowers need pollen that air can carry and stigmas that can catch it — option (@K). (@1) fits insect pollination, (@3) water pollination, and (@2) would prevent wind pollination.',
  d: 2, c: 'understanding', t: [2],
}));
add('tube-entry-mcq', mcq({
  stem: 'Through which opening does a pollen tube usually enter the ovule?',
  right: 'Micropyle',
  wrong: ['Chalaza', 'Hilum', 'Germ pore'],
  sol: 'The pollen tube enters the ovule through the micropyle and then a synergid — option (@K). A germ pore (@3) is in the pollen wall, not the ovule.',
  d: 1, c: 'recall', t: [2],
}));
add('cleisto-mcq', mcq({
  stem: 'Commelina produces some flowers that never open. Which statement about the seeds formed in these flowers is correct?',
  right: 'Seed set is assured even if no pollinator visits, but the offspring show little variation.',
  wrong: ['They form only if insects carry pollen from other plants.', 'They show more variation than seeds from open flowers.', 'They are formed without fertilisation, by apomixis.'],
  sol: 'Cleistogamous flowers are always autogamous: their own pollen reaches their own stigma inside the closed flower, so seed set is assured but there is little variation — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('papaya-mcq', mcq({
  stem: 'A family plants a single papaya seedling in their garden. Years later it flowers every season but never forms fruit, although bees visit the flowers. What is the most likely reason?',
  right: 'Papaya is dioecious; the plant is female (or male) and there is no plant of the other sex nearby.',
  wrong: ['Papaya is monoecious, so its flowers cannot be pollinated by bees.', 'Papaya flowers are cleistogamous, so bees cannot reach the stigma.', 'Papaya pollen is shed only after the stigma has dried, on every plant.'],
  sol: 'Papaya has male and female flowers on separate plants (dioecy). With only one plant, no pollen of the other sex is available, so no fertilisation or fruit occurs — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('water-mcq', mcq({
  stem: 'Which of these aquatic plants is pollinated by water?',
  right: 'Vallisneria',
  wrong: ['Water hyacinth', 'Water lily', 'Lotus'],
  sol: 'Vallisneria is pollinated by water; water hyacinth and water lily, though aquatic, are pollinated by insects or wind, as is lotus — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('waterlily-tf', tf({
  stem: 'All plants that grow in water are pollinated by water.',
  key: 'f',
  sol: 'False. Most aquatic plants with flowers above the water, such as water hyacinth and water lily, are pollinated by insects or wind; water pollination is limited to about 30 genera, such as Vallisneria and Zostera.',
  d: 2, c: 'understanding', t: [2],
}));
add('yucca-mcq', mcq({
  stem: 'Suppose the only moth species that visits a Yucca species in a region dies out. What would most likely happen to that Yucca?',
  right: 'It would fail to set seed, because this moth is its only pollinator.',
  wrong: ['It would set more seed, because no larvae would eat the seeds.', 'It would switch to wind pollination in the next generation.', 'Nothing, because Yucca is pollinated by water.'],
  sol: 'Yucca and its moth depend on each other: only the moth pollinates the flower. Without it, there is no pollination, so no seeds — option (@K). Plants do not switch pollinators within a generation (@2).',
  d: 3, c: 'application', t: [2],
}));
add('emasc-mcq', mcq({
  stem: 'In which of these crosses can the breeder skip emasculation and only bag the flower?',
  right: 'When the female parent bears unisexual, female flowers',
  wrong: ['When the female parent bears bisexual flowers', 'When the male parent bears unisexual flowers', 'When the flowers of the female parent are cleistogamous'],
  sol: 'Emasculation removes anthers, so it is needed only for bisexual flowers. A female flower has no anthers, so it is just bagged before it opens — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('incompat-ar', ar({
  a: 'In a self-incompatible plant, pollen landing on the stigma of the same flower does not bring about fertilisation.',
  r: 'In a self-incompatible plant, pollen of the same flower can never reach its stigma.',
  key: 'c',
  sol: 'A is true. R is false: self-pollen does land on the stigma; the pistil recognises it and blocks its germination or pollen-tube growth — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('monoecy-ar', ar({
  a: 'Monoecious plants such as maize prevent both autogamy and geitonogamy.',
  r: 'A maize plant bears separate male and female flowers on the same plant.',
  key: 'd',
  sol: 'A is false: unisexual flowers rule out autogamy, but pollen can move from male to female flowers on the same plant, so geitonogamy is possible. R is true — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('agent-match', match({
  stem: 'Match each plant (column I) with how its flowers are pollinated (column II).',
  pairs: [
    ['Vallisneria', 'Water'],
    ['Maize', 'Wind'],
    ['Yucca', 'A particular moth species'],
    ['Closed flowers of Viola', 'Own pollen, no external agent'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Vallisneria — water; maize — wind; Yucca — its moth; cleistogamous flowers of Viola — autogamy without any agent.',
  d: 2, c: 'understanding', t: [2],
}));
add('robber-tf', tf({
  stem: 'Every insect that takes nectar from a flower pollinates it.',
  key: 'f',
  sol: 'False. Some visitors, called nectar or pollen robbers, take the reward without carrying pollen to a stigma.',
  d: 1, c: 'recall', t: [2],
}));
add('cleisto-fill', fill({
  stem: 'Flowers that never open, and are therefore always self-pollinated, are called ______ flowers.',
  acc: [['cleistogamous']],
  sol: 'Cleistogamous.',
  d: 1, c: 'recall', t: [2],
}));
add('bagging-short', short({
  marks: 2,
  stem: 'A breeder emasculates a bisexual flower but forgets to bag it. Explain how this could spoil the cross, and what bagging achieves.',
  model: 'Without a bag, insects or wind may bring **unwanted pollen** from other plants to the receptive stigma, so the seeds may not come from the chosen father. Bagging with butter paper **keeps out contaminating pollen**, so only the pollen dusted by the breeder fertilises the ovules.',
  sol: 'Name the risk (contamination) and the purpose of bagging.',
  scheme: [['Unwanted pollen may reach the stigma', 1], ['Bagging prevents contamination, so only chosen pollen is used', 1]],
  d: 3, c: 'application', t: [2],
}));
add('monoecious-short', short({
  marks: 2,
  stem: 'A gardener has only one plant of a cucumber variety, which bears separate male and female flowers. Can it set seed? Name the kind of pollination involved and give a reason.',
  model: 'Yes. Cucumber is **monoecious**, so male and female flowers are on the same plant. An insect can carry pollen from a male flower to a female flower of the **same plant**: this is **geitonogamy**, so seeds can form even with a single plant.',
  sol: 'Recognise monoecy and identify pollination between two flowers of one plant.',
  scheme: [['Yes, because both kinds of flower are on one plant (monoecious)', 1], ['Geitonogamy, carried by an agent', 1]],
  d: 3, c: 'application', t: [2],
}));
add('chasmo-short', short({
  marks: 2,
  stem: 'Viola produces both open and closed flowers. Suggest one advantage that each kind of flower gives the plant.',
  model: '**Closed (cleistogamous) flowers** are self-pollinated inside the bud, so the plant sets seed even when pollinators are absent. **Open (chasmogamous) flowers** allow cross-pollination, which brings in new gene combinations and maintains variation.',
  sol: 'Assured seed set from closed flowers; variation from open flowers.',
  scheme: [['Closed flowers: assured seed set without pollinators', 1], ['Open flowers: cross-pollination and variation', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('outbreeding-short', short({
  marks: 3,
  stem: 'Continued self-pollination can lead to inbreeding depression. Describe three devices by which flowering plants discourage self-pollination.',
  model: '1. **Timing:** pollen is released when the stigma of the same flower is not receptive (before or after it), so self-pollen cannot fertilise.\n\n2. **Position:** anthers and stigma are placed apart in the flower, so pollen does not reach its own stigma.\n\n3. **Self-incompatibility:** a genetic mechanism lets the pistil recognise pollen from the same flower or plant and stop its germination or pollen-tube growth. (Unisexual flowers are another device.)',
  sol: 'Any three of: timing, position, self-incompatibility, unisexual flowers (monoecy, dioecy).',
  scheme: [['First device with how it works', 1], ['Second device with how it works', 1], ['Third device with how it works', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('wind-short', short({
  marks: 3,
  stem: 'In a maize field, tassels at the top of the plant shed dry, powdery pollen, and long silky threads hang out of the young cobs lower down. Explain how three features of maize suit it to wind pollination.',
  model: '1. **Light, non-sticky pollen** produced in large amounts is easily carried by air currents.\n\n2. **Exposed male flowers** in the tassel at the top of the plant release pollen into the wind.\n\n3. **Long, feathery silks** (the styles and stigmas) hang out of the cob and give a large surface to trap airborne pollen; each ovary has a single ovule, so one pollen grain is enough for each grain of the cob.',
  sol: 'Relate each feature (pollen, stamens, stigma) to release or capture of airborne pollen.',
  scheme: [['Pollen feature linked to wind transport', 1], ['Exposed tassel linked to release', 1], ['Feathery silks linked to trapping pollen', 1]],
  d: 3, c: 'application', t: [2],
}));
add('hybrid-long', long({
  stem: 'A breeder wants to cross a wheat variety A, which has bisexual flowers and high yield, as the female parent, with variety B, which resists a rust disease, as the male parent. (a) Describe, with reasons, the steps she must follow. (b) What would go wrong if she skipped the first step? (c) Why would she not need this first step if variety A bore only unisexual female flowers?',
  model: '(a) **Emasculation:** before the anthers of A dehisce, she removes them from the flower bud with forceps, so A cannot pollinate itself. **Bagging:** she covers the emasculated flower with a butter-paper bag to keep out unwanted pollen. When the stigma becomes **receptive**, she dusts it with pollen collected from B and **rebags** it so the fruit and seeds develop free of contamination.\n\n(b) The anthers of A would shed pollen on its own stigma (autogamy is common in wheat), so many seeds would come from self-pollination and would not carry B’s rust resistance.\n\n(c) A female flower has no anthers, so there is no self-pollen to remove; bagging before the flower opens is enough.',
  sol: 'Emasculation, bagging, dusting at receptivity, rebagging; then the consequence of self-pollen and the case of unisexual flowers.',
  scheme: [['Emasculation before dehiscence, with reason', 1], ['Bagging with reason', 1], ['Dusting chosen pollen at receptivity and rebagging', 1], ['(b) Self-pollination gives seeds without the desired trait', 1], ['(c) Female flowers have no anthers, so only bagging', 1]],
  wl: [80, 150],
  d: 4, c: 'application', t: [2],
}));
add('pollen-pistil-long', long({
  stem: 'Describe the events from the moment a compatible pollen grain lands on the stigma until the male gametes are released in the embryo sac. Why is the pistil’s ability to recognise pollen important?',
  model: '**Recognition.** The pistil identifies whether the pollen is of the right type through chemical components of the pollen and the pistil. Compatible pollen is accepted and promoted; incompatible pollen, of another species or the same plant in self-incompatible species, is inhibited.\n\n**Germination and tube growth.** The compatible pollen grain germinates and a pollen tube grows out through a germ pore. The contents of the pollen grain move into the tube, which grows through the tissues of the stigma and style and reaches the ovary. In two-celled pollen, the generative cell divides in the tube to form two male gametes.\n\n**Entry.** The tube enters the ovule through the micropyle and then enters one of the synergids, guided by the filiform apparatus, where it releases the two male gametes.\n\n**Importance.** Recognition makes sure that only suitable pollen of the same species, often from another plant, fertilises the ovules; this prevents wasted ovules and helps avoid inbreeding.',
  sol: 'Recognition → germination through a germ pore → tube through stigma and style → micropyle → synergid via the filiform apparatus; importance of recognition.',
  scheme: [['Recognition and acceptance or rejection', 1], ['Germination through a germ pore and growth through stigma and style', 1], ['Formation of male gametes (in tube or before shedding)', 1], ['Entry through the micropyle into a synergid guided by the filiform apparatus', 1], ['Importance of recognition', 1]],
  wl: [80, 160],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 double fertilisation, endosperm, embryo, seed
add('triple-mcq', mcq({
  stem: 'What does triple fusion in the embryo sac produce?',
  right: 'A triploid primary endosperm nucleus',
  wrong: ['A diploid zygote', 'A triploid zygote', 'A diploid primary endosperm nucleus'],
  sol: 'Triple fusion is the fusion of a male gamete with the two polar nuclei: three haploid nuclei give a triploid primary endosperm nucleus — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('coleorhiza-mcq', mcq({
  stem: 'In a grass embryo, which structure encloses the radicle and the root cap?',
  right: 'Coleorhiza',
  wrong: ['Coleoptile', 'Scutellum', 'Epiblast'],
  sol: 'The coleorhiza is the sheath around the radicle and root cap; the coleoptile (@1) encloses the shoot apex — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
{
  const P = ploidy(14);
  add('endosperm-num', num({
    stem: 'The leaf cells of a plant contain 14 chromosomes. How many chromosomes will a cell of its endosperm contain?',
    value: P.triploid,
    sol: r`$2n = 14$, so $n = 7$. The endosperm comes from the primary endosperm nucleus formed by triple fusion: $n + n + n = 3 \times 7 = ${P.triploid}$.`,
    scheme: [[`${P.triploid} chromosomes`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === (14 / 2) * 3 || 'value');
}
add('coconut-mcq', mcq({
  stem: 'The water of a tender coconut is',
  right: 'free-nuclear endosperm, with thousands of nuclei',
  wrong: ['cellular endosperm', 'liquid nucellus (perisperm)', 'a fluid made by the embryo after germination'],
  sol: 'Coconut water is free-nuclear endosperm; the white kernel around it is cellular endosperm — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('albuminous-mcq', mcq({
  stem: 'Which pair consists only of non-albuminous seeds?',
  right: 'Pea and groundnut',
  wrong: ['Wheat and maize', 'Castor and coconut', 'Pea and castor'],
  sol: 'In pea and groundnut the endosperm is used up by the embryo and food is stored in the cotyledons — option (@K). Wheat, maize, castor and coconut keep endosperm.',
  d: 2, c: 'recall', t: [3],
}));
add('seedcoat-mcq', mcq({
  stem: 'Pollen from a plant of variety Q is used to pollinate a plant of variety P. In the seeds that form on plant P, which part has exactly the same genetic make-up as plant P itself?',
  right: 'The seed coat',
  wrong: ['The embryo', 'The endosperm', 'The cotyledons'],
  sol: 'The seed coat develops from the integuments, which are tissues of the mother plant P, so its genes are P’s alone — option (@K). The embryo, its cotyledons and the endosperm all carry genes from Q’s male gamete.',
  d: 4, c: 'analysis', t: [3],
}));
add('perisperm-tf', tf({
  stem: 'The perisperm of black pepper seeds is the endosperm that remains after the embryo has grown.',
  key: 'f',
  sol: 'False. Perisperm is the residual, persistent nucellus, not endosperm.',
  d: 2, c: 'understanding', t: [3],
}));
add('epicotyl-mcq', mcq({
  stem: 'In a dicot embryo, the part of the embryonal axis above the level of the cotyledons is the',
  right: 'epicotyl, which ends in the plumule',
  wrong: ['hypocotyl, which ends in the plumule', 'epicotyl, which ends in the radicle', 'hypocotyl, which ends in the radicle'],
  sol: 'Above the cotyledons: epicotyl → plumule. Below them: hypocotyl → radicle — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('double-fert-short', short({
  marks: 3,
  stem: 'What is meant by double fertilisation? Name the two fusions and give the ploidy of each product.',
  model: 'Double fertilisation is the occurrence of **two fusions in the same embryo sac**, using the two male gametes from one pollen tube.\n\n1. **Syngamy:** one male gamete fuses with the egg cell, forming the **diploid zygote**, which develops into the embryo.\n\n2. **Triple fusion:** the other male gamete fuses with the two polar nuclei, forming the **triploid primary endosperm nucleus**; the central cell becomes the primary endosperm cell and develops into the endosperm.',
  sol: 'Define double fertilisation, then give syngamy (2n) and triple fusion (3n).',
  scheme: [['Definition: two fusions in one embryo sac', 1], ['Syngamy → diploid zygote', 1], ['Triple fusion → triploid primary endosperm nucleus', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('endosperm-first-short', short({
  marks: 2,
  stem: 'In most flowering plants, the zygote divides only after some endosperm has formed. Explain why this sequence is useful, using coconut as an example of developing endosperm.',
  model: 'The endosperm stores **food for the developing embryo**, so forming it first ensures nourishment is ready when the embryo grows. In coconut, the primary endosperm nucleus divides many times to give **free-nuclear** endosperm (coconut water), which later becomes **cellular** (the white kernel).',
  sol: 'Food supply first; coconut water (free-nuclear) and kernel (cellular).',
  scheme: [['Endosperm nourishes the embryo, so it must be ready first', 1], ['Coconut: water free-nuclear, kernel cellular', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('embryo-compare-short', short({
  marks: 3,
  stem: 'Give three differences between the embryo of a bean seed (dicot) and that of a maize grain (monocot).',
  model: '1. **Cotyledons:** the bean embryo has two cotyledons; the maize embryo has one, the shield-shaped scutellum, on one side of the axis.\n\n2. **Shoot sheath:** the plumule of the bean has no sheath; in maize the shoot apex and leaf primordia are enclosed in a hollow foliar sheath, the coleoptile.\n\n3. **Root sheath:** the radicle of the bean is covered only by a root cap; in maize the radicle and root cap are enclosed in a sheath, the coleorhiza.',
  sol: 'Compare cotyledon number and position, and the coleoptile and coleorhiza.',
  scheme: [['Two cotyledons vs one scutellum', 1], ['Coleoptile present only in maize', 1], ['Coleorhiza present only in maize', 1]],
  d: 3, c: 'analysis', t: [3],
}));
{
  const P = ploidy(16);
  add('ploidy-short', short({
    marks: 3,
    stem: 'A flowering plant has 16 chromosomes in its leaf cells. State the number of chromosomes in (a) a male gamete, (b) the zygote, (c) an endosperm cell, (d) a cell of the seed coat, (e) an antipodal cell and (f) a cell of the fruit wall. Give a reason for (c) and (d).',
    model: `(a) ${P.haploid}; (b) ${P.diploid}; (c) ${P.triploid}; (d) ${P.diploid}; (e) ${P.haploid}; (f) ${P.diploid}.\n\nReason for (c): the endosperm develops from the primary endosperm nucleus formed by fusion of a male gamete with two polar nuclei, each haploid, so it is triploid.\n\nReason for (d): the seed coat develops from the integuments of the mother plant, which are diploid sporophyte tissue.`,
    sol: `$2n = ${P.diploid}$, $n = ${P.haploid}$; gametes and embryo sac cells n, zygote 2n, endosperm 3n, maternal tissues 2n.`,
    scheme: [['(a), (b), (e) correct', 1], ['(c) and (f) correct, with the reason for (c)', 1], ['(d) correct, with the reason', 1]],
    d: 3, c: 'application', t: [1, 3],
  }), (q) => q.answer.model_answer_md.startsWith(`(a) ${16 / 2}; (b) 16; (c) ${(16 / 2) * 3}; (d) 16; (e) ${16 / 2}; (f) 16.`) || 'ploidy list');
}
add('df-long', long({
  stem: 'Explain double fertilisation in flowering plants with the help of a labelled diagram of the embryo sac after the entry of the pollen tube. Trace what each product develops into.',
  model: '**Entry.** The pollen tube enters the ovule through the micropyle and enters one of the synergids, guided by the filiform apparatus. It releases two male gametes into the cytoplasm of the synergid.\n\n**Syngamy.** One male gamete moves towards the egg cell and fuses with its nucleus, forming a diploid zygote.\n\n**Triple fusion.** The other male gamete moves to the central cell and fuses with the two polar nuclei, forming a triploid primary endosperm nucleus; the central cell becomes the primary endosperm cell.\n\nTwo fusions take place in the same embryo sac, so the process is called double fertilisation.\n\n**Products.** The primary endosperm cell develops into the endosperm, which nourishes the embryo; the zygote develops into the embryo.\n\n**Diagram labels:** pollen tube, synergid, two male gametes, egg, polar nuclei, antipodals, micropyle.',
  sol: 'Tube enters a synergid → two male gametes → syngamy (2n zygote) and triple fusion (3n primary endosperm nucleus) → embryo and endosperm.',
  scheme: [['Pollen tube enters a synergid and releases two male gametes', 1], ['Syngamy forming the diploid zygote', 1], ['Triple fusion forming the triploid primary endosperm nucleus', 1], ['Labelled diagram', 1], ['Fate: zygote → embryo, primary endosperm cell → endosperm', 1]],
  wl: [80, 140],
  d: 3, c: 'understanding', t: [3],
}));
{
  const S = seedsToMeioses(14);
  add('seed-count-num', num({
    stem: 'A bean pod contains 14 seeds. What is the minimum number of meiotic divisions (in anthers and ovules together) needed to produce them?',
    value: S.total,
    sol: r`Each seed needs one ovule, and each ovule needs one meiosis for its functional megaspore: 14. Each seed needs one pollen grain; one meiosis gives 4 pollen grains, so at least $\lceil 14/4 \rceil = ${S.maleMeioses}$. Total $= 14 + ${S.maleMeioses} = ${S.total}$.`,
    scheme: [[`${S.total} meiotic divisions`, 1]],
    d: 4, c: 'application', t: [3],
  }), (q) => q.answer.value === 14 + Math.ceil(14 / 4) || 'value');
}
add('micropyle-seed-mcq', mcq({
  stem: 'A seed soaked in water swells first near a tiny pore beside the scar on its seed coat. This pore is',
  right: 'the micropyle, which lets water and oxygen into the seed',
  wrong: ['the hilum, through which the pollen tube entered', 'a germ pore left by the pollen grain', 'the chalaza, where the integuments ended'],
  sol: 'The micropyle remains as a small pore in the seed coat and admits water and oxygen during germination — option (@K). The scar beside it is the hilum.',
  d: 3, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 fruit, apomixis, parthenocarpy, polyembryony
add('apo-parth-ar', ar({
  a: 'Banana fruits develop without fertilisation.',
  r: 'Apomixis is the development of seeds without fertilisation.',
  key: 'b',
  sol: 'Both statements are true. But banana is an example of parthenocarpy (a fruit without fertilisation), not apomixis (a seed without fertilisation), so R does not explain A — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('polyembryony-mcq', mcq({
  stem: 'A student plants one seed of an orange and finds three seedlings coming out of it. Two of them look exactly like the mother tree. The most likely origin of these two seedlings is',
  right: 'cells of the nucellus that developed into embryos without fertilisation',
  wrong: ['three pollen tubes that entered the same embryo sac', 'the endosperm, which developed into extra embryos', 'cross-pollination with three different trees'],
  sol: 'In Citrus, nucellar cells can grow into the embryo sac and form extra embryos (polyembryony); being from maternal tissue, these seedlings are genetically like the mother — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('hybrid-seed-mcq', mcq({
  stem: 'Why do farmers who grow high-yielding hybrid varieties usually buy fresh hybrid seed every year instead of sowing seed from their own crop?',
  right: 'In the progeny of a hybrid, the characters segregate, so the hybrid qualities are not maintained.',
  wrong: ['Hybrid seeds have no embryo, so they cannot germinate.', 'Hybrid plants are always parthenocarpic and give seedless fruit.', 'Seeds saved from a hybrid lose viability within a day.'],
  sol: 'Seeds from a hybrid crop are the result of sexual reproduction among hybrids, so their characters segregate and yield falls — option (@K). Apomictic hybrids would avoid this.',
  d: 3, c: 'understanding', t: [4],
}));
add('false-fruit-mcq', mcq({
  stem: 'When an apple is cut across, its seeds lie in a papery central core, and the core is surrounded by thick, juicy flesh. What does this show about the apple?',
  right: 'The core is the ovary; most of the flesh comes from the thalamus, so the apple is a false fruit.',
  wrong: ['The flesh is the ovary wall, so the apple is a true fruit.', 'The flesh is endosperm that grew outside the seeds.', 'The core is the thalamus and the flesh is the pericarp, so the apple is parthenocarpic.'],
  sol: 'The seeds develop inside the ovary, which forms the core; the thick flesh outside it is mainly swollen thalamus, so the apple is a false fruit — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('seedless-tf', tf({
  stem: 'Parthenocarpic fruits are seedless because they develop without fertilisation.',
  key: 't',
  sol: 'True. In parthenocarpy the ovary develops into a fruit without fertilisation, so no seeds form; it can be induced with growth hormones.',
  d: 1, c: 'recall', t: [4],
}));
add('parthenocarpy-short', short({
  marks: 2,
  stem: 'A grower sprays growth hormones on the flowers of a crop and obtains seedless fruits. Name the phenomenon and explain why it is not an example of apomixis.',
  model: 'This is **parthenocarpy**: the ovary develops into a fruit without fertilisation. It is not apomixis, because apomixis produces **seeds** without fertilisation, whereas parthenocarpic fruits have **no seeds** at all.',
  sol: 'Parthenocarpy is fruit without fertilisation; apomixis is seed without fertilisation.',
  scheme: [['Parthenocarpy, fruit without fertilisation', 1], ['Apomixis gives seeds; here no seeds form', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('apomixis-short', short({
  marks: 3,
  stem: 'What is apomixis? Describe two ways in which an apomictic embryo can arise, and state one reason why apomixis interests the hybrid seed industry.',
  model: 'Apomixis is the production of **seeds without fertilisation**; it is a form of asexual reproduction that mimics sexual reproduction.\n\n1. A **diploid egg cell** forms without reduction division and develops into an embryo without fertilisation.\n\n2. Cells of the **nucellus** surrounding the embryo sac divide, protrude into the embryo sac and develop into embryos.\n\nIf hybrids were made apomictic, their seeds would **not segregate**, so farmers could save and resow hybrid seed every year.',
  sol: 'Definition; diploid egg route and nucellar route; no segregation in apomictic hybrids.',
  scheme: [['Definition', 1], ['Two routes of embryo formation', 1], ['Importance for hybrid seeds', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('seed-adv-short', short({
  marks: 2,
  stem: 'Give two reasons why the ability of seeds to dry out and become dormant has been important for agriculture.',
  model: 'Dry, dormant seeds can be **stored** safely from one harvest to the next sowing season, providing food and planting material. Dormancy also lets seeds **survive unfavourable seasons** and germinate when moisture and temperature are suitable, so crops can be sown at the right time.',
  sol: 'Storage between seasons; survival through unfavourable conditions.',
  scheme: [['Seeds can be stored for later sowing or food', 1], ['Seeds survive unfavourable conditions and germinate later', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('seed-fruit-long', long({
  stem: 'Describe the changes that take place in the ovule and the ovary after fertilisation. Explain, with one example each, what is meant by a false fruit and a parthenocarpic fruit.',
  model: '**Ovule → seed.** The zygote develops into the embryo, and the primary endosperm cell into the endosperm, which may be used up (pea, groundnut) or persist (wheat, castor). The integuments harden into the seed coat; the micropyle remains as a small pore for water and oxygen during germination. The seed dries to about 10–15 percent moisture, its metabolism slows, and it may become dormant.\n\n**Ovary → fruit.** The ovary enlarges into the fruit, and the ovary wall becomes the pericarp, which may be fleshy (guava, orange) or dry (groundnut, mustard).\n\n**False fruit.** Here the thalamus also contributes to the fruit, as in apple, where the fleshy part is mostly thalamus.\n\n**Parthenocarpic fruit.** This develops without fertilisation and is seedless, as in banana; such fruits can be induced with growth hormones.',
  sol: 'Ovule parts → seed parts; ovary → fruit, wall → pericarp; false fruit (apple), parthenocarpy (banana).',
  scheme: [['Embryo and endosperm development', 1], ['Integuments → seed coat; drying and dormancy', 1], ['Ovary → fruit, wall → pericarp', 1], ['False fruit with example', 1], ['Parthenocarpic fruit with example', 1]],
  wl: [80, 150],
  d: 3, c: 'understanding', t: [3, 4],
}));
add('apomixis-long', long({
  stem: 'A seed company announces that it has produced an apomictic version of its best hybrid rice. Evaluate this claim for farmers: explain how apomixis works, why it would change the way farmers obtain seed, and one possible drawback of growing only apomictic hybrids over a large area.',
  model: '**How it works.** In apomixis, seeds form without fertilisation: either a diploid egg forms without meiosis and develops into an embryo, or cells of the nucellus grow into the embryo sac and form embryos. The embryo therefore has the same genes as the mother plant.\n\n**Effect for farmers.** Seeds from an ordinary hybrid come from sexual reproduction, so characters segregate and the next crop is uneven and lower-yielding; farmers must buy new hybrid seed every season. An apomictic hybrid would breed true, so farmers could save their own seed year after year and still get hybrid yields, lowering their costs.\n\n**Drawback.** Every plant would be genetically identical to the mother, so the crop over a large area would lack variation; a new disease or pest able to attack one plant could damage the whole crop.\n\n**Verdict.** The claim, if true, is very useful, but farmers should keep some varietal diversity.',
  sol: 'Mechanism of apomixis → no segregation → seed saving; drawback: uniformity and lack of variation.',
  scheme: [['Mechanism of apomixis', 1], ['Ordinary hybrid seed segregates', 1], ['Apomictic hybrid breeds true; farmers can reuse seed', 1], ['Drawback: no variation, risk from disease', 1], ['Reasoned conclusion', 1]],
  wl: [80, 160],
  d: 5, c: 'evaluation', t: [4],
}));

// ---------------------------------------------------------------- cases
add('sac-case', mk.case({
  passage: 'A student studied stained sections of ovules of a plant whose leaf cells have 16 chromosomes. She sorted what she saw into four stages:\n\n| Stage | What was seen in the nucellus |\n|---|---|\n| I | One large cell with dense cytoplasm near the micropylar end |\n| II | A row of four cells; three of them shrinking |\n| III | One enlarged cell containing two nuclei, one at each end |\n| IV | A sac with three cells at one end, three at the other, and a large central cell with two nuclei |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which division produced the row of four cells seen in stage II?',
      right: 'Meiosis of the megaspore mother cell',
      wrong: ['Mitosis of the megaspore mother cell', 'Meiosis of the functional megaspore', 'Free-nuclear mitosis in the embryo sac'],
      sol: 'Stage I is the megaspore mother cell; it divides by meiosis into four megaspores (stage II) — option (@K).',
      d: 2, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'How many chromosomes would each nucleus in the stage IV sac contain?',
      value: 8,
      sol: 'Leaf cells have $2n = 16$, so $n = 16 \\div 2 = 8$. The megaspore is haploid, and the sac nuclei come from it by mitosis, so each has 8.',
      scheme: [['8', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'How many mitotic divisions separate the single functional megaspore from stage IV? Explain why the stage IV sac is described as having seven cells but eight nuclei.',
      model: '**Three** free-nuclear mitoses (1 → 2 → 4 → 8 nuclei). Six nuclei are walled off as cells (egg, two synergids, three antipodals), and the remaining **two polar nuclei** share one central cell, so there are 7 cells but 8 nuclei.',
      sol: 'Three doublings give 8 nuclei; the central cell holds two of them.',
      scheme: [['Three divisions', 1], ['Two polar nuclei in one central cell: 7 cells, 8 nuclei', 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Which stage shows that the embryo sac of this plant is monosporic? Explain, and name the three cells at the micropylar end of the stage IV sac.',
        model: '**Stage II**: of the four megaspores, three degenerate and only one develops, so the embryo sac comes from a single megaspore (monosporic). The micropylar end has the **egg cell and two synergids** (the egg apparatus).',
        sol: 'One of four megaspores survives; egg apparatus at the micropylar end.',
        scheme: [['Stage II with the reason', 1], ['Egg cell and two synergids', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === ploidy(16).haploid || 'haploid');

add('pollination-case', mk.case({
  passage: 'A research station tested fruit set in a plant species with bisexual flowers. Each treatment was applied to 100 flowers on different plants, and the flowers that formed fruit were counted.\n\n| Treatment | Flowers that set fruit |\n|---|---|\n| P: left open to visiting insects | 72 |\n| Q: bagged, not emasculated | 5 |\n| R: emasculated and bagged, no pollen added | 0 |\n| S: emasculated, bagged, dusted with pollen from another plant | 81 |\n| T: emasculated, bagged, dusted with pollen from another flower of the same plant | 4 |',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which two treatments together show that pollen from the same plant rarely leads to fruit set?',
      right: 'Q and T',
      wrong: ['P and S', 'R and S', 'P and R'],
      sol: 'In Q only the flower’s own pollen can reach the stigma, and in T the pollen comes from another flower of the same plant; both give very low fruit set — option (@K).',
      d: 3, c: 'analysis', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Which kind of pollination does treatment T imitate?',
      model: '**Geitonogamy** (pollen from another flower of the same plant).',
      sol: 'Another flower, same plant.',
      scheme: [['Geitonogamy', 1]],
      d: 2, c: 'understanding', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Suggest the outbreeding device that explains the results of Q and T, and explain how it works.',
      model: '**Self-incompatibility.** The pistil recognises pollen from the same plant through chemical signals and blocks its germination or pollen-tube growth, so self-pollen (Q, T) rarely fertilises, while pollen from another plant (S) is accepted.',
      sol: 'Low set with self-pollen but high set with other-plant pollen points to self-incompatibility.',
      scheme: [['Self-incompatibility', 1], ['Pistil recognises and blocks self-pollen', 1]],
      d: 4, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Treatment S gave more fruit than P. Evaluate whether hand-pollination would be worthwhile for a farmer growing this crop, giving one reason for and one against.',
        model: '**For:** hand-pollination with pollen from another plant ensures enough compatible pollen reaches every stigma (81 against 72 fruits per 100 flowers), raising yield where insects are scarce. **Against:** it needs a lot of labour and time per flower, so on a large field the extra fruit may not pay for the cost; protecting insect pollinators is cheaper.',
        sol: 'Weigh the 9 percent gain against labour cost.',
        scheme: [['A reason for, using the data', 1], ['A reason against', 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}));

add('seed-case', mk.case({
  passage: 'A class examined three kinds of seed. They split a tender coconut, soaked bean seeds and maize grains overnight, and cut them open.\n\n| Seed | What they saw |\n|---|---|\n| Coconut | Sweet liquid in the centre, a white solid layer lining the shell |\n| Bean | Two large fleshy halves joined to a small axis; no other food tissue |\n| Maize | A large starchy region taking up most of the grain; a small embryo to one side with a shield-shaped part pressed against the starchy region |\n\nThe maize plants they came from have 20 chromosomes in each leaf cell.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The sweet liquid in the tender coconut is',
      right: 'free-nuclear endosperm',
      wrong: ['cellular endosperm', 'perisperm', 'the cotyledon'],
      sol: 'The liquid is free-nuclear endosperm; the white layer is cellular endosperm — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'How many chromosomes are present in a cell of the starchy region of the maize grain?',
      value: 30,
      sol: r`The starchy region is endosperm (triploid). $n = 10$, so $3n = 30$.`,
      scheme: [['30', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Double fertilisation also took place in the bean ovules, yet the mature bean seed has no endosperm. Explain where the endosperm went and where the bean stores its food.',
      model: 'The endosperm did form after triple fusion, but the developing embryo **used it up completely** before the seed matured. The food is now stored in the two **cotyledons** (the fleshy halves), so the bean is a **non-albuminous** seed.',
      sol: 'Endosperm consumed by the embryo; food in cotyledons.',
      scheme: [['Endosperm consumed during embryo development', 1], ['Food stored in cotyledons (non-albuminous)', 1]],
      d: 3, c: 'understanding', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Name the shield-shaped part of the maize embryo, and explain why it lies pressed against the starchy region.',
        model: 'It is the **scutellum**, the single cotyledon of the grass embryo. It lies against the endosperm so that it can **absorb the stored food** from the endosperm and pass it to the growing embryo during germination.',
        sol: 'Scutellum absorbs food from the endosperm.',
        scheme: [['Scutellum (cotyledon)', 1], ['Absorbs food from the endosperm', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === ploidy(20).triploid || 'triploid');

add('apomixis-case', mk.case({
  passage: 'A farmer in Haryana grew a hybrid rice variety. In year 1 she sowed fresh hybrid seed bought from a company. In years 2 and 3 she sowed seed saved from her own crop.\n\n| Year | Seed source | Yield (quintals per hectare) | Field appearance |\n|---|---|---|---|\n| 1 | Purchased hybrid seed | 60 | Plants uniform |\n| 2 | Saved from year 1 | 45 | Plants of uneven height and maturity |\n| 3 | Saved from year 2 | 42 | Very uneven |\n\nAn agricultural officer told her that scientists are trying to develop apomictic hybrids.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What best explains the uneven plants and lower yield in year 2?',
      right: 'The characters of the hybrid segregated in the plants grown from saved seed.',
      wrong: ['The saved seeds were formed by apomixis.', 'The saved seeds had no endosperm.', 'Rice pollen was not viable in year 2.'],
      sol: 'Seeds saved from a hybrid come from sexual reproduction, so characters segregate and the crop becomes uneven — option (@K).',
      d: 3, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'By what percentage did the yield fall from year 1 to year 2?',
      value: 25, unit: '%',
      sol: r`Fall $= \dfrac{60 - 45}{60} \times 100 = 25$ percent.`,
      scheme: [['25%', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain how an apomictic hybrid would solve the farmer’s problem.',
      model: 'In an apomictic hybrid, seeds form **without fertilisation**, so each embryo is genetically like the mother plant and there is **no segregation**. Seed saved from the crop would grow into uniform, high-yielding hybrid plants, so she would not need to buy new seed every year.',
      sol: 'Apomixis → no fertilisation → no segregation → seed can be saved.',
      scheme: [['Seeds without fertilisation, embryo like the mother', 1], ['No segregation, so saved seed keeps hybrid yield', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Orange growers often find that seedlings raised from seed are just like the mother tree. Explain how this happens.',
        model: 'Many Citrus seeds show **polyembryony**: besides the zygotic embryo, cells of the **nucellus** grow into extra embryos without fertilisation. These nucellar embryos have only the mother tree’s genes, so their seedlings are like the mother.',
        sol: 'Nucellar embryos are maternal tissue.',
        scheme: [['Polyembryony from nucellar cells', 1], ['Nucellar embryos have only maternal genes', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}), (q) => Math.abs(q.children[1].answer.value - ((60 - 45) / 60) * 100) < 1e-9 || 'percent');
