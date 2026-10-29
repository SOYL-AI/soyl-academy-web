// ch06 Evolution — question bank. AR keys planned: c c a a d a.
import { mk, add, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { hwFromRecessive, hwFromP, alleleFreq, pct } from './calc.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 origin of life and evidence
add('miller-mcq', mcq({
  stem: 'What did Miller’s experiment demonstrate?',
  right: 'Amino acids can form from simple gases and water when energy is supplied.',
  wrong: ['Living cells can form from simple gases in a few days.', 'Life arrived on Earth as spores from outer space.', 'Life can arise from decaying matter.'],
  sol: 'Electric sparks in a flask of CH₄, H₂, NH₃ and water vapour produced amino acids, supporting chemical evolution; no cells were formed — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('analogous-mcq', mcq({
  stem: 'Which pair shows analogous organs?',
  right: 'Wings of a butterfly and wings of a bird',
  wrong: ['Forelimbs of a whale and of a bat', 'Thorns of Bougainvillea and tendrils of Cucurbita', 'Hearts of a frog and of a human'],
  sol: 'Butterfly and bird wings do the same job but have different structure and origin (convergent evolution); the others are homologous — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('moth-ar', ar({
  a: 'Dark-winged peppered moths became more common in industrial areas of England after industrialisation.',
  r: 'Industrial pollution caused mutations that turned light-winged moths dark.',
  key: 'c',
  sol: 'A is true. R is false: dark moths already existed; on soot-darkened trunks they were less visible to predatory birds and so survived and reproduced more — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('pasteur-mcq', mcq({
  stem: 'Louis Pasteur’s experiments with pre-sterilised flasks disproved which idea?',
  right: 'Spontaneous generation of life from non-living matter',
  wrong: ['Chemical evolution', 'Natural selection', 'Panspermia'],
  sol: 'No life appeared in pre-sterilised flasks with killed yeast, while it did in flasks open to air, so life comes from pre-existing life — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('homolog-mcq', mcq({
  stem: 'A student compares four pairs of organs from different animals. Which pair shares the same basic bone plan and origin, and so is homologous?',
  right: 'The flipper of a whale and the wing of a bat',
  wrong: ['The wing of a bird and the wing of an insect', 'The eye of an octopus and the eye of a mammal', 'A sweet potato and a potato'],
  sol: 'Whale flippers and bat wings have the same pattern of forelimb bones but different functions (divergent evolution) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('sweetpotato-tf', tf({
  stem: 'A sweet potato and a potato are homologous organs.',
  key: 'f',
  sol: 'False. Sweet potato is a modified root and potato a modified stem; both store food, so they are analogous.',
  d: 2, c: 'understanding', t: [1],
}));
add('fossil-mcq', mcq({
  stem: 'In an undisturbed series of sedimentary rocks, fossil X is found in a deeper layer than fossil Y. What can be concluded?',
  right: 'X is older than Y, because deeper layers were laid down earlier.',
  wrong: ['Y is older than X, because it is nearer the surface.', 'X and Y must be the same age.', 'X must be an ancestor of Y.'],
  sol: 'Sedimentary layers are deposited one on top of another, so deeper layers are older; position alone does not prove ancestry — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('resistance-mcq', mcq({
  stem: 'A farmer sprays the same pesticide on a crop for many years, and the pests become resistant to it. What is the best explanation?',
  right: 'A few pests already had resistance; they survived the spraying and their offspring became common.',
  wrong: ['The pesticide taught each pest to resist it during its life.', 'The pesticide caused all the pests to mutate in the same way.', 'The pests stopped eating the crop.'],
  sol: 'Pesticides select pre-existing resistant variants, which multiply — anthropogenic natural selection — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('rural-mcq', mcq({
  stem: 'In unpolluted rural areas of England, light-winged peppered moths remained common even after industrialisation. Why?',
  right: 'Tree trunks stayed pale with lichens, so light moths remained better camouflaged from birds.',
  wrong: ['Rural moths could not produce dark offspring.', 'Birds in rural areas did not eat moths.', 'Light moths in rural areas changed colour each season.'],
  sol: 'Selection depends on the background: where trunks stayed pale, light moths were harder to spot and survived better — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('miller-fill', fill({
  stem: 'Miller passed electric discharge through a flask containing CH₄, H₂, NH₃ and ______.',
  acc: [['water vapour', 'water vapor', 'steam', 'water']],
  sol: 'Water vapour.',
  d: 1, c: 'recall', t: [1],
}));
add('vonbaer-ar', ar({
  a: 'Embryos of vertebrates, including humans, show a row of vestigial gill slits behind the head.',
  r: 'Embryos pass through the adult stages of their ancestors during development.',
  key: 'c',
  sol: 'A is true. R is false: Karl Ernst von Baer showed that embryos never pass through the adult stages of other animals — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('convergent-short', short({
  marks: 2,
  stem: 'The flippers of a penguin and of a dolphin look similar and both help in swimming. Are they homologous or analogous? Explain what kind of evolution this shows.',
  model: 'They are **analogous**: a penguin is a bird and a dolphin is a mammal, so the flippers have **different origins and structure** but the **same function**. This shows **convergent evolution**: unrelated animals living in similar habitats evolved similar adaptations.',
  sol: 'Same function, different origin: convergent.',
  scheme: [['Analogous, with reason', 1], ['Convergent evolution explained', 1]],
  d: 2, c: 'application', t: [1],
}));
add('origin-short', short({
  marks: 3,
  stem: 'Explain the idea of chemical evolution and describe how Miller’s experiment supported it.',
  model: '**Oparin and Haldane** proposed that the first life arose from **pre-existing non-living organic molecules** (such as RNA and proteins), formed by **chemical evolution** on the early Earth, which had high temperatures, volcanic storms and a reducing atmosphere of CH₄, NH₃ and so on.\n\n**Miller (1953)** created such conditions in the laboratory: an **electric discharge** in a closed flask of **CH₄, H₂, NH₃ and water vapour** at about 800 °C. **Amino acids** formed, showing that organic molecules can arise from inorganic ones without life.',
  sol: 'Hypothesis plus experimental support.',
  scheme: [['Chemical evolution (Oparin and Haldane)', 1], ['Miller’s set-up', 1], ['Result: amino acids', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('moth-short', short({
  marks: 3,
  stem: 'Explain industrial melanism in peppered moths as an example of natural selection.',
  model: 'Before industrialisation (around 1850), tree trunks were covered with **pale lichens**, so **light-winged** moths were camouflaged and dark ones were eaten by birds; light moths were common. Industrial **pollution killed the lichens** and **darkened** the trunks with soot. Now **dark-winged** moths were camouflaged and survived better, so by around 1920 they became common in industrial areas. Both forms **already existed**; the environment changed **which form survived and reproduced** — natural selection.',
  sol: 'Background → camouflage → differential survival.',
  scheme: [['Before: light moths camouflaged on lichens', 1], ['After: dark trunks favoured dark moths', 1], ['Variation pre-existed; selection by predators', 1]],
  d: 3, c: 'application', t: [1],
}));
add('evidence-long', long({
  stem: 'Describe the palaeontological, comparative anatomical and molecular evidence for evolution, with examples.',
  model: '**Palaeontological evidence.** Fossils are remains of hard parts of life forms preserved in rocks. Sedimentary rocks form in layers, each representing a geological period, with deeper layers older. Different-aged layers contain different life forms, many of them extinct, showing that life has changed over time.\n\n**Comparative anatomy.** Homologous organs, such as the forelimbs of whales, bats, cheetahs and humans, have the same basic bones (humerus, radius and ulna, carpals, metacarpals, phalanges) but different functions; they show divergent evolution from a common ancestor. Plant examples are the thorns of Bougainvillea and tendrils of Cucurbita. Analogous organs, such as the wings of butterflies and birds, or the eyes of octopus and mammals, do the same job with different structures; they show convergent evolution.\n\n**Molecular evidence.** Similarities in proteins and genes performing a given function among diverse organisms indicate common ancestry; the closer the relationship, the greater the similarity.',
  sol: 'Fossils; homology and analogy; molecular homology.',
  scheme: [['Fossils and rock layers', 1.5], ['Homologous organs with examples and divergent evolution', 1.5], ['Analogous organs with examples and convergent evolution', 1], ['Molecular evidence', 1]],
  wl: [80, 180],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 Darwin and adaptive radiation
add('radiation-mcq', mcq({
  stem: 'Which is an example of adaptive radiation?',
  right: 'Darwin’s finches of the Galápagos Islands',
  wrong: ['Dark and light peppered moths', 'Wings of birds and butterflies', 'Pesticide-resistant insects'],
  sol: 'From seed-eating ancestors, many finches with different beaks evolved in one area and radiated into different habitats — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('fitness-mcq', mcq({
  stem: 'In Darwin’s theory, the fitness of an organism refers to its',
  right: 'ability to leave more surviving offspring',
  wrong: ['physical strength', 'size compared with others', 'length of life'],
  sol: 'Fitness means reproductive fitness: the better-fit leave more progeny — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('lamarck-mcq', mcq({
  stem: 'A blacksmith develops very strong arm muscles through years of work, but his children are not born with strong arms. Which idea does this observation contradict?',
  right: 'Lamarck’s idea of the inheritance of acquired characters',
  wrong: ['Darwin’s theory of natural selection', 'The Hardy–Weinberg principle', 'De Vries’s mutation theory'],
  sol: 'Changes acquired during life are not passed on through genes, contrary to Lamarck — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('devries-mcq', mcq({
  stem: 'According to Hugo de Vries, evolution is caused by',
  right: 'large, sudden, random mutations (saltation)',
  wrong: ['small, directional variations accumulated slowly', 'use and disuse of organs', 'genetic drift in small populations only'],
  sol: 'From work on the evening primrose, de Vries proposed that large single-step mutations (saltation) cause evolution — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('finches-mcq', mcq({
  stem: 'On one island, a finch species has a short, thick, very strong beak. What is it most likely adapted to eat?',
  right: 'Hard seeds that must be cracked',
  wrong: ['Nectar from deep flowers', 'Insects picked from narrow cracks', 'Fish caught under water'],
  sol: 'A thick, strong beak suits cracking hard seeds; Darwin’s finches show beaks altered for different foods — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('tasmanian-tf', tf({
  stem: 'The placental wolf and the Tasmanian (marsupial) wolf are an example of convergent evolution.',
  key: 't',
  sol: 'True. Similar forms evolved independently in placental mammals and Australian marsupials.',
  d: 2, c: 'understanding', t: [2],
}));
add('fitness-ar', ar({
  a: 'A plain moth that lays many eggs that survive can be fitter than a larger moth that lays few.',
  r: 'In Darwin’s sense, fitness refers to reproductive fitness.',
  key: 'a',
  sol: 'Both are true; because fitness means leaving more surviving offspring, the plain moth is fitter — option (a).',
  d: 3, c: 'application', t: [2],
}));
add('darwin-short', short({
  marks: 3,
  stem: 'State the main points of Darwin’s theory of natural selection.',
  model: '1. Organisms produce **more offspring** than can survive, so there is a **struggle for existence**.\n\n2. Individuals of a population **vary**, and many variations are **heritable**.\n\n3. Individuals with variations better suited to the environment **survive and reproduce more** (they are fitter); over many generations their traits become common and populations change, giving rise to new types (**branching descent**).',
  sol: 'Over-production, variation, selection of the fit, change over time.',
  scheme: [['Over-production and struggle', 1], ['Heritable variation', 1], ['Survival and reproduction of the fit; change over time', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('lamarck-short', short({
  marks: 2,
  stem: 'Explain how Lamarck and Darwin would each account for the long neck of the giraffe.',
  model: '**Lamarck:** ancestors **stretched** their necks to reach leaves; the longer necks **acquired** during life were passed on. **Darwin:** giraffes **varied** in neck length; those with longer necks reached more food, **survived and left more offspring**, so long necks became common over generations.',
  sol: 'Acquired change vs selection of existing variation.',
  scheme: [['Lamarck’s explanation', 1], ['Darwin’s explanation', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('radiation-short', short({
  marks: 2,
  stem: 'What is adaptive radiation? Give one example.',
  model: 'Adaptive radiation is the **evolution of different species in a geographical area**, starting from **one point** and radiating to other habitats. Example: **Darwin’s finches** of the Galápagos, which evolved varied beaks from seed-eating ancestors (also Australian marsupials).',
  sol: 'Definition and example.',
  scheme: [['Definition', 1], ['Example', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('darwin-long', long({
  stem: 'Explain Darwin’s theory of natural selection with the example of Darwin’s finches. How does de Vries’s mutation theory differ from it?',
  model: '**Natural selection.** Organisms produce more offspring than can survive. Individuals vary, and many variations are inherited. Those with variations better suited to their environment survive and reproduce more; Darwin called this fitness, meaning reproductive fitness. Over many generations, favourable variations accumulate and populations change, branching into new types.\n\n**Darwin’s finches.** On the Galápagos Islands Darwin found many kinds of finches. From an original seed-eating ancestor, forms evolved with beaks suited to different foods, such as insects. Each type was favoured where its beak matched the available food, so many species arose in one area: adaptive radiation.\n\n**De Vries’s mutation theory.** Working on the evening primrose, de Vries proposed that evolution is caused by large, sudden mutations, producing new forms in a single step (saltation). Darwin’s variations are small and directional, and evolution is gradual; mutations are random and directionless. Today mutation is seen as a source of variation on which natural selection acts.',
  sol: 'Theory; finches; contrast with mutation theory.',
  scheme: [['Over-production, variation, heritability', 1], ['Survival and reproduction of the fit; gradual change', 1], ['Darwin’s finches as adaptive radiation', 1.5], ['De Vries’s mutation theory and contrast', 1.5]],
  wl: [80, 180],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 Hardy–Weinberg and mechanism
{
  const h = hwFromP(0.7);
  add('hw-mcq', mcq({
    stem: 'In a population in Hardy–Weinberg equilibrium, the frequency of allele A is p = 0.7. What is the frequency of heterozygotes (Aa)?',
    right: String(h.Aa),
    wrong: ['0.21', '0.49', '0.09'],
    sol: `q = 1 − 0.7 = 0.3; 2pq = 2 × 0.7 × 0.3 = ${h.Aa} — option (@K). 0.21 forgets the factor 2.`,
    d: 2, c: 'application', t: [3],
  }), (q) => q.options.find((o) => o.id === q.answer.option_ids[0]).text_md === String(hwFromP(0.7).Aa) || 'key');
}
{
  const h = hwFromRecessive(0.09);
  add('hw-num1', num({
    stem: 'In a population in Hardy–Weinberg equilibrium, 9 percent of individuals show a recessive trait. What percentage of the population are heterozygous carriers?',
    value: Math.round(h.Aa * 100), unit: '%',
    sol: r`$q^2 = 0.09$, so $q = 0.3$ and $p = 0.7$. Carriers $= 2pq = 2 \times 0.7 \times 0.3 = 0.42$, and $0.42 \times 100 = ${Math.round(h.Aa * 100)}$, so ${Math.round(h.Aa * 100)} percent.`,
    scheme: [[`${Math.round(h.Aa * 100)}%`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 42 || 'value');
}
{
  const p = alleleFreq(49, 42, 9);
  add('hw-num2', num({
    stem: 'A sample of 100 plants has 49 AA, 42 Aa and 9 aa. What is the frequency of allele A?',
    value: p,
    sol: r`$p = \dfrac{2 \times 49 + 42}{2 \times 100} = \dfrac{140}{200} = ${p}$.`,
    scheme: [[`${p}`, 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => q.answer.value === 0.7 || 'value');
}
{
  const h = hwFromRecessive(1 / 400);
  const carriers = Math.round(h.Aa * 1000) / 10;
  add('hw-num3', num({
    stem: 'A recessive disorder affects 1 in 400 people in a population in Hardy–Weinberg equilibrium. What percentage of the population are carriers? Give one decimal place.',
    value: carriers, tol: 0.05, unit: '%',
    sol: r`$q^2 = \dfrac{1}{400}$, so $q = \dfrac{1}{20} = 0.05$ and $p = 0.95$. Carriers $= 2pq = 2 \times 0.95 \times 0.05 = 0.095$, and $0.095 \times 100 = ${carriers}$, so ${carriers} percent.`,
    scheme: [[`${carriers}%`, 1]],
    d: 4, c: 'application', t: [3],
  }), (q) => Math.abs(q.answer.value - 9.5) < 1e-9 || 'value');
}
add('drift-ar', ar({
  a: 'A small founder population may have allele frequencies very different from those of the population it came from.',
  r: 'In small populations, chance alone can change allele frequencies a great deal.',
  key: 'a',
  sol: 'Both are true; genetic drift (chance) acts strongly on the few founders, which explains the founder effect — option (a).',
  d: 3, c: 'understanding', t: [3],
}));
add('hw-ar', ar({
  a: 'In a population in Hardy–Weinberg equilibrium, allele frequencies remain the same from one generation to the next.',
  r: 'No gene flow, genetic drift, mutation, recombination or natural selection is changing the gene pool.',
  key: 'a',
  sol: 'Both are true; equilibrium holds precisely because none of the disturbing factors is acting — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('stabilising-mcq', mcq({
  stem: 'Human babies of average birth weight have the highest survival, while very light and very heavy babies are less likely to survive. Which type of selection is this?',
  right: 'Stabilising selection',
  wrong: ['Directional selection', 'Disruptive selection', 'Genetic drift'],
  sol: 'Selection favours the mean and removes both extremes, so the curve narrows — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('directional-mcq', mcq({
  stem: 'Over several years of spraying, the average resistance of a mosquito population to an insecticide rises steadily. Which type of selection is this?',
  right: 'Directional selection',
  wrong: ['Stabilising selection', 'Disruptive selection', 'Adaptive radiation'],
  sol: 'One extreme (high resistance) is favoured, so the whole distribution shifts — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('disruptive-mcq', mcq({
  stem: 'In a bird population on an island, only very small and very large seeds are available after a change in vegetation. Birds with medium-sized beaks become rare. Which type of selection is acting?',
  right: 'Disruptive selection',
  wrong: ['Stabilising selection', 'Directional selection', 'Gene flow'],
  sol: 'Both extremes are favoured over the intermediate, so the middle of the curve falls — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('hw-condition-mcq', mcq({
  stem: 'Which situation would NOT keep a population in Hardy–Weinberg equilibrium?',
  right: 'A very small population in which chance events change allele frequencies',
  wrong: ['A large population with random mating', 'No migration into or out of the population', 'No natural selection acting on the gene'],
  sol: 'Genetic drift in small populations changes allele frequencies, breaking equilibrium — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('flow-fill', fill({
  stem: 'Movement of alleles into or out of a population through migration of individuals is called gene ______.',
  acc: [['flow', 'migration']],
  sol: 'Gene flow (gene migration).',
  d: 1, c: 'recall', t: [3],
}));
add('equation-match', match({
  stem: 'Match each term of the Hardy–Weinberg equations (column I) with what it represents (column II).',
  pairs: [
    ['p²', 'Frequency of AA individuals'],
    ['2pq', 'Frequency of Aa individuals'],
    ['q²', 'Frequency of aa individuals'],
    ['p + q', 'Sum of allele frequencies, equal to 1'],
  ],
  order: [2, 0, 3, 1],
  sol: 'p² → AA; 2pq → Aa; q² → aa; p + q = 1.',
  d: 1, c: 'recall', t: [3],
}));
{
  const h = hwFromRecessive(0.25);
  add('hw-short', short({
    marks: 3,
    stem: 'In a population in Hardy–Weinberg equilibrium, 25 percent of individuals show a recessive trait. Calculate p, q and the frequencies of the three genotypes, showing your working. What would a later change in these values indicate?',
    model: `q² = 0.25, so **q = ${h.q}**; p = 1 − q = **${h.p}**.\n\nAA = p² = **${h.AA}**; Aa = 2pq = **${h.Aa}**; aa = q² = **${h.aa}** (total 1).\n\nIf these frequencies **changed** in later generations, it would show that **evolution** is occurring, because a factor such as gene flow, drift, mutation, recombination or selection is acting.`,
    sol: 'Square root of q², then p, then p², 2pq.',
    scheme: [['q and p', 1], ['Three genotype frequencies', 1], ['A change indicates evolution', 1]],
    d: 3, c: 'application', t: [3],
  }), (q) => hwFromRecessive(0.25).Aa === 0.5 && q.answer.model_answer_md.includes('0.5') || 'hw');
}
add('factors-short', short({
  marks: 3,
  stem: 'Name any three factors that change allele frequencies in a population, and explain how each acts.',
  model: '1. **Gene flow (migration):** individuals entering or leaving a population add or remove alleles.\n\n2. **Genetic drift:** chance changes in allele frequencies, strongest in small populations; a small founder group may differ greatly (founder effect).\n\n3. **Natural selection:** heritable variations that improve survival and reproduction become commoner. (Mutation and recombination also change allele frequencies by creating new alleles and combinations.)',
  sol: 'Any three factors with mechanisms.',
  scheme: [['First factor with mechanism', 1], ['Second factor with mechanism', 1], ['Third factor with mechanism', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('selection-short', short({
  marks: 2,
  stem: 'Distinguish between stabilising and directional selection, giving one example of each.',
  model: '**Stabilising** selection favours **average** individuals and removes extremes, so the population curve becomes narrower, for example human birth weight. **Directional** selection favours **one extreme**, so the whole curve shifts that way, for example increasing pesticide resistance in insects.',
  sol: 'Mean vs one extreme, with examples.',
  scheme: [['Stabilising with example', 1], ['Directional with example', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('founder-short', short({
  marks: 2,
  stem: 'A storm carries five birds of a mainland species to a distant island, where they start a new population. Explain why the island population’s allele frequencies may soon differ greatly from the mainland’s.',
  model: 'The five founders carry only a **small, random sample** of the mainland alleles, so their allele frequencies may already differ (**founder effect**). In such a small population, **chance (genetic drift)** can change allele frequencies further from generation to generation, and the new environment may also **select** different variants.',
  sol: 'Sampling, drift, selection.',
  scheme: [['Founders are a small random sample (founder effect)', 1], ['Genetic drift in a small population', 1]],
  d: 3, c: 'application', t: [3],
}));
add('hw-long', long({
  stem: 'State the Hardy–Weinberg principle and write its equations. Use them to find the percentage of carriers when 4 percent of a population shows a recessive trait. Explain how the principle is used to detect evolution, naming the factors that disturb equilibrium.',
  model: '**Principle.** Allele frequencies in a population are stable and remain constant from generation to generation, a state called genetic equilibrium, as long as nothing disturbs the population. For two alleles A and a with frequencies p and q: p + q = 1, and the genotype frequencies are p² (AA) + 2pq (Aa) + q² (aa) = 1.\n\n**Example.** q² = 0.04, so q = 0.2 and p = 0.8. Carriers = 2pq = 2 × 0.8 × 0.2 = 0.32, that is 32 percent; AA = 0.64 and aa = 0.04.\n\n**Detecting evolution.** If measured frequencies in later generations differ from these expected values, the gene pool is changing, which means evolution is taking place. The extent of the difference indicates the extent of evolution.\n\n**Disturbing factors.** Gene migration (gene flow), genetic drift (including the founder effect), mutation, genetic recombination during gametogenesis, and natural selection.',
  sol: 'Statement; equations; calculation; detection; five factors.',
  scheme: [['Statement of the principle', 1], ['Equations', 1], ['Calculation: 32% carriers', 1], ['Deviation indicates evolution', 1], ['Five disturbing factors', 1]],
  wl: [80, 170],
  d: 3, c: 'application', t: [3],
}), () => Math.round(hwFromRecessive(0.04).Aa * 100) === 32 || 'hw');

// ---------------------------------------------------------------- t04 human evolution
add('habilis-mcq', mcq({
  stem: 'What was the approximate brain capacity of Homo habilis?',
  right: '650–800 cc',
  wrong: ['About 900 cc', 'About 1400 cc', 'About 300 cc'],
  sol: 'Homo habilis had a brain of 650–800 cc; Homo erectus about 900 cc; Neanderthal man about 1400 cc — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('neanderthal-mcq', mcq({
  stem: 'Which feature describes Neanderthal man?',
  right: 'Brain of about 1400 cc; used hides to protect the body and buried the dead',
  wrong: ['Brain of 650–800 cc; did not eat meat', 'Lived about 15 million years ago and was very ape-like', 'First to practise agriculture about 10 000 years ago'],
  sol: 'Neanderthals (about 1 lakh to 40 000 years ago) had about 1400 cc brains, used hides and buried their dead — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('apes-ar', ar({
  a: 'Humans evolved from chimpanzees.',
  r: 'Humans and chimpanzees share common ancestors.',
  key: 'd',
  sol: 'A is false: humans did not evolve from today’s apes. R is true: humans and apes share common ancestors — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('erectus-mcq', mcq({
  stem: 'A fossil form lived about 1.5 million years ago, had a brain of about 900 cc and probably ate meat; a fossil of it was found in Java in 1891. Which form is it?',
  right: 'Homo erectus',
  wrong: ['Homo habilis', 'Neanderthal man', 'Dryopithecus'],
  sol: 'These are the features of Homo erectus — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('order-mcq', mcq({
  stem: 'Which sequence is in the correct order of appearance, from earliest to latest?',
  right: 'Dryopithecus → Australopithecines → Homo habilis → Homo erectus → Neanderthal man',
  wrong: ['Homo habilis → Dryopithecus → Homo erectus → Australopithecines → Neanderthal man', 'Australopithecines → Dryopithecus → Neanderthal man → Homo habilis → Homo erectus', 'Neanderthal man → Homo erectus → Homo habilis → Australopithecines → Dryopithecus'],
  sol: 'About 15 mya Dryopithecus; about 2 mya Australopithecines and Homo habilis; about 1.5 mya Homo erectus; about 1 lakh–40 000 years ago Neanderthals — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
{
  const inc = pct(1400 - 900, 900);
  add('brain-num', num({
    stem: 'Taking the brain capacity of Homo erectus as 900 cc and of Neanderthal man as 1400 cc, find the percentage increase, to one decimal place.',
    value: inc, tol: 0.05, unit: '%',
    sol: r`$\dfrac{1400 - 900}{900} \times 100 = \dfrac{500}{900} \times 100 \approx ${inc}$ percent.`,
    scheme: [[`${inc}%`, 1]],
    d: 3, c: 'application', t: [4],
  }), (q) => q.answer.value === 55.6 || 'value');
}
add('australo-mcq', mcq({
  stem: 'Fossils show a hominin that lived about 2 million years ago in the grasslands of East Africa, probably hunted with stone weapons, but ate mainly fruit. Which group does this describe?',
  right: 'Australopithecines',
  wrong: ['Neanderthal man', 'Dryopithecus', 'Modern Homo sapiens'],
  sol: 'These are the features of the Australopithecines — option (@K).',
  d: 2, c: 'application', t: [4],
}));
{
  const h = hwFromP(0.6);
  add('hw-num4', num({
    stem: 'In a population in Hardy–Weinberg equilibrium, the frequency of the dominant allele is 0.6. What percentage of individuals are expected to show the recessive phenotype?',
    value: Math.round(h.aa * 100), unit: '%',
    sol: r`$q = 1 - 0.6 = 0.4$; recessive phenotype $= q^2 = 0.16$, and $0.16 \times 100 = ${Math.round(h.aa * 100)}$, so ${Math.round(h.aa * 100)} percent.`,
    scheme: [[`${Math.round(h.aa * 100)}%`, 1]],
    d: 2, c: 'application', t: [3],
  }), (q) => q.answer.value === 16 || 'value');
}
add('mole-mcq', mcq({
  stem: 'The Australian marsupial mole and the placental mole of other continents look and burrow alike, although they belong to different groups of mammals. What does this illustrate?',
  right: 'Convergent evolution',
  wrong: ['Divergent evolution from homologous organs', 'Genetic drift', 'Inheritance of acquired characters'],
  sol: 'Unrelated mammals in similar habitats evolved similar forms: convergent evolution, seen between marsupials and placental mammals — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('sapiens-tf', tf({
  stem: 'Homo sapiens arose in Asia and then moved to Africa.',
  key: 'f',
  sol: 'False. Homo sapiens arose in Africa and moved across continents.',
  d: 1, c: 'recall', t: [4],
}));
add('agri-fill', fill({
  stem: 'Agriculture and human settlements began about ______ years ago.',
  acc: [['10000', '10,000', '10 000', 'ten thousand']],
  sol: 'About 10,000 years ago.',
  d: 1, c: 'recall', t: [4],
}));
add('human-short', short({
  marks: 3,
  stem: 'Compare Homo habilis, Homo erectus and Neanderthal man in brain capacity and in one other feature each.',
  model: '**Homo habilis:** brain **650–800 cc**; probably **did not eat meat**.\n\n**Homo erectus:** brain about **900 cc**; probably **ate meat**; lived about 1.5 million years ago (fossil from Java).\n\n**Neanderthal man:** brain about **1400 cc**; used **hides** to protect the body and **buried the dead**; lived in the near east and central Asia.',
  sol: 'Brain sizes and one feature each.',
  scheme: [['Homo habilis', 1], ['Homo erectus', 1], ['Neanderthal man', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('trends-short', short({
  marks: 2,
  stem: 'Using the brain capacities of three fossil forms, identify one clear trend in human evolution and suggest why it mattered.',
  model: 'Brain capacity **increased** from about **650–800 cc** (Homo habilis) to about **900 cc** (Homo erectus) and about **1400 cc** (Neanderthal man). A larger brain allowed **better tool-making, hunting, social behaviour** and later **culture**, such as burial of the dead and art.',
  sol: 'Increasing brain size and its consequences.',
  scheme: [['Trend with data', 1], ['Why it mattered', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('human-long', long({
  stem: 'Outline the main stages in the evolution of modern humans, with approximate times and the important features of each stage.',
  model: '**About 15 million years ago:** Dryopithecus and Ramapithecus, hairy primates that walked like gorillas; Ramapithecus was more man-like and Dryopithecus more ape-like.\n\n**About 2 million years ago:** Australopithecines lived in East African grasslands; they probably hunted with stone weapons but ate mainly fruit. Homo habilis, the first human-like being, had a brain of 650–800 cc and probably did not eat meat.\n\n**About 1.5 million years ago:** Homo erectus, known from a fossil found in Java in 1891, had a brain of about 900 cc and probably ate meat.\n\n**About 1 lakh to 40 000 years ago:** Neanderthal man, with a brain of about 1400 cc, lived in the near east and central Asia, used hides for protection and buried the dead.\n\n**Homo sapiens** arose in Africa and moved across continents; modern Homo sapiens spread during the ice age, between about 75 000 and 10 000 years ago. Prehistoric cave art developed about 18 000 years ago, and agriculture and settlements began about 10 000 years ago.',
  sol: 'Ordered stages with times and features.',
  scheme: [['Dryopithecus and Ramapithecus', 1], ['Australopithecines and Homo habilis', 1], ['Homo erectus', 1], ['Neanderthal man', 1], ['Homo sapiens, spread, art, agriculture', 1]],
  wl: [80, 190],
  d: 3, c: 'understanding', t: [4],
}));
add('theory-long', long({
  stem: 'A student says, “Evolution is just an idea; nobody has ever seen it happen.” Evaluate this claim using evidence from fossils, comparative anatomy, molecules and observed natural selection.',
  model: '**The claim.** In science a theory is a well-tested explanation supported by many independent lines of evidence, not a guess, so the first part of the claim misunderstands the word.\n\n**Fossils.** Sedimentary layers of different ages contain different life forms, many extinct, showing that life has changed over time.\n\n**Anatomy and molecules.** Homologous organs, such as the forelimbs of whales, bats, cheetahs and humans, share one bone plan modified for different uses, which is best explained by common ancestry; similarities in proteins and genes point the same way.\n\n**Observed change.** Natural selection has been seen directly: dark peppered moths became common in industrial England within decades as trunks darkened, and pests, weeds and microbes become resistant to pesticides, herbicides and antibiotics within years.\n\n**Judgement.** The claim is not correct. Evolution is supported by several independent kinds of evidence, and some evolutionary change has been observed within human lifetimes.',
  sol: 'Meaning of theory; three kinds of evidence; observed selection; verdict.',
  scheme: [['Scientific meaning of a theory', 1], ['Fossil evidence', 1], ['Anatomical and molecular evidence', 1], ['Observed natural selection', 1], ['Reasoned verdict', 1]],
  wl: [80, 190],
  d: 5, c: 'evaluation', t: [1, 2],
}));

// ---------------------------------------------------------------- cases
{
  const darkPct = pct(80, 100);
  add('moth-case', mk.case({
    passage: 'A naturalist summarised samples of peppered moths caught in two parts of England.\n\n| Place and year | Light-winged | Dark-winged |\n|---|---|---|\n| Industrial area, about 1850 | 90 | 10 |\n| Industrial area, about 1920 | 20 | 80 |\n| Rural area, about 1920 | 85 | 15 |',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which form was favoured in the industrial area by about 1920?',
        right: 'The dark-winged form',
        wrong: ['The light-winged form', 'Neither; both changed equally', 'Both forms disappeared'],
        sol: 'Dark moths rose from 10 to 80 per 100 in the industrial area — option (@K).',
        d: 1, c: 'understanding', t: [1],
      })),
      part('b', num({
        stem: 'What percentage of the industrial-area sample in about 1920 was dark-winged?',
        value: darkPct, unit: '%',
        sol: r`$\dfrac{80}{20 + 80} \times 100 = ${darkPct}$ percent.`,
        scheme: [[`${darkPct}%`, 1]],
        d: 1, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain the change in the industrial area using the idea of natural selection.',
        model: 'Pollution killed the pale **lichens** and darkened tree trunks with soot. **Dark moths** were now better **camouflaged** from birds and survived and reproduced more, while light moths were eaten more often. So the **already-existing** dark form became commoner.',
        sol: 'Background change → differential predation.',
        scheme: [['Darkened trunks made dark moths camouflaged', 1], ['Differential survival and reproduction of existing variants', 1]],
        d: 3, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Predict how the numbers in the industrial area might change after clean-air laws reduce soot and lichens return. Give a reason.',
          model: 'The **light-winged** form should become **commoner again**. As trunks become pale and lichen-covered, light moths are better camouflaged and dark moths are more visible to birds, so selection now favours the light form.',
          sol: 'Selection reverses with the background.',
          scheme: [['Light form increases', 1], ['Reason: camouflage on pale trunks', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 80 || 'value');
}
{
  const h = hwFromRecessive(40 / 1000);
  const carriers = Math.round(h.Aa * 1000);
  add('hw-case', mk.case({
    passage: 'A health survey of 1000 people in a large village with random marriages found that 40 people show a recessive inherited condition (aa). Assume Hardy–Weinberg equilibrium.',
    d: 4, c: 'application',
    children: [
      part('a', mcq({
        stem: 'What is the frequency of the recessive allele (q)?',
        right: String(h.q),
        wrong: ['0.04', '0.8', '0.32'],
        sol: `q² = 40/1000 = 0.04, so q = √0.04 = ${h.q} — option (@K).`,
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'How many of the 1000 people are expected to be carriers (Aa)?',
        value: carriers,
        sol: r`$p = 0.8$, $q = 0.2$; $2pq = 0.32$; carriers $= 0.32 \times 1000 = ${carriers}$.`,
        scheme: [[`${carriers}`, 1]],
        d: 3, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Why is the number of carriers much larger than the number of affected people, and why does this matter for health planning?',
        model: 'Carriers (2pq = 0.32) are far more common than affected people (q² = 0.04) because the recessive allele is **hidden** in heterozygotes. Most copies of the allele are in **healthy carriers**, so screening and **genetic counselling** must reach them, not just affected families.',
        sol: '2pq much larger than q² when q is small.',
        scheme: [['Most alleles are hidden in carriers (2pq > q²)', 1], ['Implication for screening and counselling', 1]],
        d: 3, c: 'analysis', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Many people from a region where this allele is very rare move into the village. Predict the effect on q and name the process.',
          model: 'q in the village would **fall**, because the newcomers bring mostly the dominant allele and dilute the recessive one. This is **gene flow (gene migration)**, one of the factors that disturb Hardy–Weinberg equilibrium.',
          sol: 'Immigration changes allele frequencies.',
          scheme: [['q falls', 1], ['Gene flow', 1]],
          d: 3, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 320 || 'value');
}
{
  const before = 9.2;
  const after = 9.8;
  const diff = Math.round((after - before) * 10) / 10;
  add('finch-case', mk.case({
    passage: 'On a small island, scientists measured the beak depth of a seed-eating finch species before and after a severe drought. During the drought, small soft seeds ran out, and mainly large, hard seeds were left.\n\n| | Average beak depth (mm) |\n|---|---|\n| Before the drought | 9.2 |\n| Among survivors after the drought | 9.8 |',
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which type of natural selection acted on beak depth during the drought?',
        right: 'Directional selection',
        wrong: ['Stabilising selection', 'Disruptive selection', 'Genetic drift'],
        sol: 'Birds with deeper beaks, at one extreme, survived better, so the average shifted upwards — option (@K).',
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'By how many millimetres did the average beak depth increase?',
        value: diff, tol: 0.05, unit: 'mm',
        sol: r`$9.8 - 9.2 = ${diff}$ mm.`,
        scheme: [[`${diff} mm`, 1]],
        d: 1, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain, in terms of natural selection, why the average beak depth increased.',
        model: 'Beak depth **varied** among the finches. Only birds with **deeper, stronger beaks** could crack the large hard seeds left during the drought, so they **survived and reproduced more**. As beak depth is **heritable**, the average beak depth of the population increased.',
        sol: 'Variation, differential survival, heritability.',
        scheme: [['Variation and differential survival', 1], ['Heritability raises the average', 1]],
        d: 3, c: 'application', t: [2, 3],
      }), [
        short({
          marks: 2,
          stem: 'Predict what might happen to average beak depth if several wet years bring back plenty of small, soft seeds. Explain.',
          model: 'The average beak depth may **decrease** again. With plenty of small seeds, birds with **smaller beaks** can feed efficiently and may survive and reproduce as well as or better than deep-beaked birds, so selection would **no longer favour** deep beaks, or would favour smaller ones.',
          sol: 'Selection changes with food supply.',
          scheme: [['Average may decrease', 1], ['Reason linked to food and selection', 1]],
          d: 3, c: 'analysis', t: [2, 3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 0.6 || 'value');
}
add('fossil-case', mk.case({
  passage: 'A museum displays four skull casts with their approximate brain capacities and ages.\n\n| Skull | Brain capacity (cc) | Approximate age |\n|---|---|---|\n| P | 700 | 2 million years |\n| Q | 900 | 1.5 million years |\n| R | 1400 | 60 000 years |\n| S | 1350 | 20 000 years |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Skull P most probably belongs to',
      right: 'Homo habilis',
      wrong: ['Homo erectus', 'Neanderthal man', 'Modern Homo sapiens'],
      sol: 'About 2 million years old with 650–800 cc fits Homo habilis — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the form to which skull R most probably belongs.',
      model: '**Neanderthal man** (about 1400 cc, about 60 000 years old).',
      sol: 'Size and age match Neanderthals.',
      scheme: [['Neanderthal man', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'What overall trend do the skulls P, Q and R show, and what does it suggest about human evolution?',
      model: 'Brain capacity **increased** from about **700 cc** (2 million years) to **900 cc** (1.5 million years) and **1400 cc** (60 000 years). This suggests that brain size grew during human evolution, linked with **better tools, hunting and more complex behaviour**.',
      sol: 'Increase with time; behavioural link.',
      scheme: [['Trend with values', 1], ['Interpretation', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Skull S is 20 000 years old. Which species is it likely to be, and what cultural activity was beginning around that time?',
        model: 'It is likely **modern Homo sapiens**, who spread during the ice age (about 75 000–10 000 years ago). Around this time **prehistoric cave art** developed (about 18 000 years ago).',
        sol: 'Age matches modern humans; cave art.',
        scheme: [['Modern Homo sapiens', 1], ['Cave art about 18 000 years ago', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}));
