// ISC 12 Biology ch09 Evolution: Origin of Life and Evidences — Part 1 (t01–t03), Part 2 (t04–t05).
import { sl, deck, table, flow, svgV, r } from '../../isc-12-biology-ch01/src/lib.mjs';
import { MILLER, LIMBS_SVG, RADIOCARBON, RADIATION } from './svgs.mjs';
import { remaining, ageFromFraction, halves, HALF_LIFE } from './calc.mjs';

export const V = {
  miller: svgV(MILLER, 'Miller–Urey apparatus with boiling water, gas flask, electrodes, condenser and trap'),
  limbs: svgV(LIMBS_SVG, 'Homologous forelimbs of a human, cheetah, whale and bat with the same bone groups'),
  carbon: svgV(RADIOCARBON, 'Decay curve of carbon-14 halving every 5730 years'),
  finches: svgV(RADIATION, 'Adaptive radiation of Darwin’s finches from one seed-eating ancestor'),
};

// ---------------------------------------------------------------- computed numbers
export const AGE_QUARTER = ageFromFraction(0.25);
export const AGE_SIXTEENTH = ageFromFraction(1 / 16);
const AFTER_3 = remaining(halves(3));

export const deck1 = deck({
  part: 1,
  title: 'Evolution: Origin of Life and Evidences — Part 1: Origin of life and morphological evidence',
  goals: [
    'Compare abiogenesis, biogenesis and panspermia',
    'Explain the Oparin–Haldane theory and why a reducing atmosphere was needed',
    'Distinguish protobionts and coacervates, and describe the Miller–Urey experiment',
    'Distinguish homologous, analogous and vestigial organs with examples',
  ],
  slides: [
    sl('title', 'Origin of life and evidences of evolution', {
      b: 'Part 1 — how life may have begun on Earth, and what the bodies of living organisms tell us about their common ancestry.',
      v: flow('LR', [['g', 'Simple gases'], ['o', 'Organic molecules'], ['p', 'Protobionts'], ['c', 'First cells']], [['g', 'o', 'energy'], ['o', 'p'], ['p', 'c']], 'Flow of chemical evolution from simple gases to organic molecules to protobionts to the first cells'),
      n: 'The Earth formed about four and a half billion years ago. Life probably appeared within a billion years, first as simple molecules built from the gases of the early atmosphere, then as droplets that could hold them together, and finally as the first cells.',
    }),
    sl('concept', 'Three old ideas about the origin of life', {
      b: 'Early explanations differed on whether life can arise from non-living matter.',
      v: table(['Idea', 'Claim', 'Status'], [['Abiogenesis (spontaneous generation)', 'Life arises from non-living matter, such as maggots from rotting meat', 'Disproved for present conditions by Louis Pasteur’s swan-neck flask experiment'], ['Biogenesis', 'Life arises only from pre-existing life', 'True for life today'], ['Panspermia (cosmozoic theory)', 'Spores or units of life came to Earth from outer space', 'Does not explain how life began in the first place']], 'Table comparing abiogenesis, biogenesis and panspermia'),
      n: 'Pasteur boiled broth in flasks with long curved necks. Dust and microbes were trapped in the bend, and no life appeared, while broth in a broken flask soon teemed with microbes. So life today comes only from life. Yet the very first life must have arisen from non-living matter.',
    }),
    sl('concept', 'The Oparin–Haldane theory', {
      b: '**A. I. Oparin (1924)** and **J. B. S. Haldane (1929)** proposed that life arose by **chemical evolution** in the early Earth’s **reducing atmosphere** of **methane, ammonia, hydrogen and water vapour**, with **no free oxygen**. Energy from **lightning, UV radiation and volcanic heat** formed simple organic molecules, which collected in the sea as a **“hot dilute soup”**.',
      v: table(['Condition', 'Why it mattered'], [['Reducing atmosphere, no free oxygen', 'Organic molecules formed were not oxidised or broken down'], ['No ozone layer', 'Strong UV radiation reached the surface as an energy source'], ['Lightning and volcanic heat', 'Energy to join simple molecules'], ['Warm seas', 'Molecules accumulated and reacted further']], 'Table of the conditions of the early Earth and why they mattered'),
      n: 'Free oxygen is very reactive and would have destroyed the first organic molecules as fast as they formed. In an atmosphere without oxygen, sugars, amino acids and bases could build up in the oceans and react to form larger molecules.',
    }),
    sl('concept', 'Protobionts and coacervates', {
      b: '**Protobionts** are aggregates of abiotically produced organic molecules, surrounded by a membrane-like layer, that keep an internal environment different from their surroundings. **Coacervates** (Oparin) are one kind: colloidal droplets of proteins and polysaccharides in water. **Microspheres** (Sidney Fox) are protein-like droplets formed by heating amino acids and cooling them in water.',
      v: table(['Feature', 'Protobionts (general)', 'Coacervates'], [['Meaning', 'Any precursor of cells made abiotically', 'A particular kind of protobiont'], ['Made of', 'Organic molecules with a boundary', 'Colloidal droplets of proteins, polysaccharides and water'], ['Proposed by', 'General term', 'Oparin'], ['Can they reproduce?', 'Not truly; some grow and divide', 'No; they can absorb substances and divide']], 'Table distinguishing protobionts from coacervates'),
      n: 'Neither coacervates nor microspheres are alive, but they show how a boundary could form around chemicals, keep them together, and allow simple reactions inside. That is an important step towards a cell.',
    }),
    sl('diagram', 'The Miller–Urey experiment', {
      b: 'In **1953**, **Stanley Miller** and **Harold Urey** sealed **methane, ammonia, hydrogen and water vapour** in a glass apparatus, passed **electric sparks** through the gases and boiled and condensed the water for about a **week**. The liquid in the trap contained **amino acids** such as glycine and alanine.',
      v: V.miller,
      n: 'The sparks stood for lightning and the boiling water for the warm ocean. In about a week, simple amino acids formed from the gases alone. Later experiments also produced sugars, nitrogen bases, pigments and fats in similar conditions.',
    }),
    sl('check', 'Quick check: coacervates', {
      b: 'Which statement about coacervates is correct?',
      n: 'Quick check. Are coacervates living cells, or droplets of colloids?',
      chk: 'coacervate-mcq',
    }),
    sl('example', 'Worked example 1: reasoning about the Miller–Urey set-up', {
      b: 'For each part of the apparatus, say what early-Earth condition it represented and what would happen if it were changed.',
      v: table(['Part', 'Represented', 'If changed'], [['Methane, ammonia, hydrogen', 'Reducing atmosphere', 'With oxygen added, few organic molecules survive'], ['Electric sparks', 'Lightning', 'Without energy, no amino acids form'], ['Boiling water', 'Warm oceans and evaporation', 'Gases and products would not circulate'], ['Condenser and trap', 'Rain and collection in seas', 'Products would not accumulate']], 'Worked table relating each part of the Miller–Urey apparatus to early-Earth conditions'),
      ul: ['Conclusion: **organic molecules of life can form abiotically** from simple gases with an energy source.'],
      n: 'Each part of the apparatus matches a feature of the early Earth. Taking away the energy source, or adding oxygen, would stop amino acids from building up. That is why the result supports the Oparin and Haldane idea of chemical evolution.',
    }),
    sl('check', 'Quick check: reducing atmosphere', {
      b: 'Judge the assertion and the reason about the early atmosphere.',
      n: 'Quick check. What would free oxygen do to organic molecules?',
      chk: 'reducing-ar',
    }),
    sl('diagram', 'Homologous organs and divergent evolution', {
      b: '**Homologous organs** have the **same basic structure and origin** but may do **different jobs**. The forelimbs of a **human, cheetah, whale and bat** all have the humerus, radius and ulna, carpals, metacarpals and phalanges. In plants, the **thorn of Bougainvillea** and the **tendril of Cucurbita** are both modified stems. They show **divergent evolution** from a common ancestor.',
      v: V.limbs,
      n: 'The same set of bones has been stretched, shortened or fused to suit grasping, running, swimming or flying. Such a shared plan is best explained by descent from a common ancestor, followed by adaptation to different ways of life.',
    }),
    sl('concept', 'Analogous organs and convergent evolution', {
      b: '**Analogous organs** do the **same job** but have **different structure and origin**. They arise by **convergent evolution**, when unrelated organisms adapt to similar needs.',
      v: table(['Pair', 'Shared function', 'Different origin'], [['Wings of a butterfly and a bird', 'Flight', 'Cuticle folds vs modified forelimb'], ['Eye of an octopus and a mammal', 'Vision', 'Retina develops differently'], ['Flippers of a penguin and a dolphin', 'Swimming', 'Bird wing vs mammal forelimb'], ['Sweet potato and potato', 'Food storage', 'Root vs stem tuber']], 'Table of analogous organ pairs'),
      n: 'Similar problems, such as flying through air or storing food underground, often produce similar solutions in unrelated organisms. Analogous organs show that the environment shapes form, but they do not show close common ancestry.',
    }),
    sl('concept', 'Vestigial organs', {
      b: '**Vestigial organs** are reduced, functionless (or nearly so) remnants of organs that were useful in ancestors.',
      v: table(['Vestigial organ in humans', 'Functional in'], [['Vermiform appendix', 'Herbivores, for digesting cellulose'], ['Nictitating membrane (plica semilunaris)', 'Birds and reptiles, as a third eyelid'], ['Coccyx (tail bone)', 'Tailed mammals'], ['Muscles of the ear pinna', 'Many mammals, to move the ears'], ['Wisdom teeth', 'Ancestors with larger jaws']], 'Table of vestigial organs in humans'),
      n: 'Why would a body keep parts that do nothing useful? Because they are inherited from ancestors in which they worked. Vestigial organs are therefore strong evidence of common descent.',
    }),
    sl('example', 'Worked example 2: homologous or analogous?', {
      b: 'Classify each pair and name the kind of evolution it shows.',
      v: table(['Pair', 'Type', 'Evolution'], [['Forelimb of a whale and wing of a bat', 'Homologous', 'Divergent'], ['Wing of an insect and wing of a bird', 'Analogous', 'Convergent'], ['Thorn of Bougainvillea and tendril of Cucurbita', 'Homologous', 'Divergent'], ['Sweet potato and potato', 'Analogous', 'Convergent']], 'Worked table classifying organ pairs as homologous or analogous'),
      ul: ['Ask: **same origin?** → homologous; **same function only?** → analogous.'],
      n: 'Always ask about origin first. If two organs are built on the same plan and develop from the same part, they are homologous, whatever they now do. If they only share a function, they are analogous.',
    }),
    sl('check', 'Quick check: analogous organs', {
      b: 'Which pair are analogous organs?',
      n: 'Quick check. Look for the same job but a different origin.',
      chk: 'analogous-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Abiogenesis (disproved for today by Pasteur), biogenesis, panspermia.',
        'Oparin–Haldane: chemical evolution in a reducing atmosphere (methane, ammonia, hydrogen, water vapour; no free oxygen).',
        'Protobionts: coacervates (Oparin), microspheres (Fox).',
        'Miller–Urey (1953): sparks in reducing gases gave amino acids.',
        'Homologous (same origin, divergent), analogous (same function, convergent), vestigial (reduced remnants).',
      ],
      v: table(['Evidence', 'Shows'], [['Homologous organs', 'Common ancestry, divergent evolution'], ['Analogous organs', 'Convergent evolution'], ['Vestigial organs', 'Descent from ancestors where they worked']], 'Summary table of morphological evidences'),
      n: 'To recap: life most likely began by chemical evolution in an atmosphere without oxygen, as the Miller and Urey experiment supports. The structure of living organisms, with homologous, analogous and vestigial organs, records how they have evolved.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Explain **why** a reducing atmosphere was needed.',
        'Distinguish **protobionts** and **coacervates** precisely.',
        'Give **two plant and two animal examples** each of homologous and analogous organs.',
        'Label the **Miller–Urey** apparatus: gases, electrodes, condenser, trap.',
      ],
      n: 'Exam tips. Give the reason a reducing atmosphere mattered. Keep protobionts and coacervates apart. Learn two plant and two animal examples for each kind of organ. And be ready to label the Miller and Urey apparatus.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Evolution: Origin of Life and Evidences — Part 2: Embryology, fossils, biogeography and molecules',
  goals: [
    'Explain the embryological evidence and the idea of recapitulation',
    'Explain how fossils are dated by radiocarbon dating and relate eras to their dominant life',
    'Use biogeographical and molecular evidence, and explain adaptive radiation',
  ],
  slides: [
    sl('title', 'More lines of evidence', {
      b: 'Part 2 — evidence from embryos, fossils, the distribution of organisms and their molecules.',
      v: flow('LR', [['e', 'Embryos'], ['f', 'Fossils'], ['b', 'Distribution'], ['m', 'Molecules']], [['e', 'f'], ['f', 'b'], ['b', 'm']], 'Flow of four further lines of evidence for evolution'),
      n: 'Several independent kinds of evidence all point to the same conclusion: living organisms share common ancestors and have changed over time. We look at embryos, fossils, where organisms live, and the molecules inside them.',
    }),
    sl('concept', 'Embryological evidence', {
      b: 'Embryos of fish, amphibians, reptiles, birds and mammals look alike in early stages: all have **gill slits (pharyngeal pouches)**, a **notochord** and a **tail**. **Ernst Haeckel** proposed the **recapitulation theory**: **ontogeny recapitulates phylogeny** — development of an individual repeats the evolutionary history of its group.',
      v: table(['Observation', 'Interpretation'], [['Gill slits in a human embryo', 'Inherited from fish-like ancestors'], ['Tail in early mammal embryos', 'Shared ancestry with tailed vertebrates'], ['Embryos resemble embryos, not adults, of other groups (von Baer)', 'Recapitulation is not literal; it shows common descent']], 'Table of embryological observations and interpretations'),
      n: 'A human embryo never breathes through gills, but for a short time it has the same pouches that become gills in a fish. Karl Ernst von Baer showed that embryos resemble the embryos of other animals, not their adults, so the theory is not taken literally today.',
    }),
    sl('concept', 'Fossils and how they form', {
      b: '**Fossils** are remains or traces of organisms preserved in rocks. Older rock layers (**strata**) lie deeper and hold simpler forms. **Archaeopteryx**, with feathers and wings like a bird but teeth, claws and a long bony tail like a reptile, is a **connecting link** between reptiles and birds.',
      v: table(['Kind of fossil', 'Example'], [['Petrified remains', 'Bones and wood replaced by minerals'], ['Moulds and casts', 'Shells leaving impressions'], ['Preserved whole', 'Insects in amber, mammoths in ice'], ['Trace fossils', 'Footprints, burrows']], 'Table of kinds of fossils'),
      n: 'The fossil record shows a sequence: simple life in the oldest rocks, then fish, amphibians, reptiles, birds and mammals in younger layers. Connecting links like Archaeopteryx show features of two groups, just as evolution predicts.',
    }),
    sl('diagram', 'Radiocarbon dating', {
      b: `Living organisms take in carbon, including a constant small fraction of radioactive **carbon-14**. After death, no new carbon enters and carbon-14 decays with a **half-life of ${HALF_LIFE} years**. Comparing the carbon-14 left with that in living tissue gives the **age**; the method works for remains up to about **50 000 years** old. Older rocks are dated with other isotopes, such as **uranium–lead**.`,
      v: V.carbon,
      n: 'Each half-life, half of the remaining carbon fourteen decays. After one half-life a half is left, after two a quarter, after three an eighth. Measuring how much remains therefore tells us how long ago the organism died.',
    }),
    sl('example', 'Worked example 1: dating a bone', {
      b: 'A bone contains one quarter of the carbon-14 found in living bone. How old is it? What fraction would be left after three half-lives?',
      ul: [
        r`$\dfrac{1}{4} = \left(\dfrac{1}{2}\right)^{2}$, so 2 half-lives have passed.`,
        r`Age $= 2 \times ${HALF_LIFE} = ${AGE_QUARTER}$ years.`,
        r`After 3 half-lives: $\left(\dfrac{1}{2}\right)^{3} = ${AFTER_3}$ of the original.`,
      ],
      v: table(['Half-lives', 'Fraction left', 'Age (years)'], [1, 2, 3, 4].map((n) => [String(n), String(remaining(halves(n))), String(halves(n))]), `Worked table: one quarter left means ${AGE_QUARTER} years`),
      n: 'One quarter is one half of one half, so two half-lives have passed. Two times five thousand seven hundred and thirty years is eleven thousand four hundred and sixty years. After a third half-life only an eighth would remain.',
    }),
    sl('concept', 'The geological time scale', {
      b: 'Earth’s history is divided into **eras**, each with its typical life (dates approximate, in million years ago).',
      v: table(['Era', 'Time', 'Dominant life'], [['Cenozoic', '66 – present', 'Age of mammals; flowering plants dominant; humans in the latest period'], ['Mesozoic', '252 – 66', 'Age of reptiles (dinosaurs); gymnosperms dominant; first birds, mammals and flowering plants'], ['Palaeozoic', '541 – 252', 'Invertebrates, then fishes and amphibians; ferns and seed ferns form coal forests'], ['Precambrian (Proterozoic and earlier)', 'before 541', 'Bacteria, algae and soft-bodied invertebrates']], 'Table of geological eras and their dominant flora and fauna'),
      n: 'Each era is named for its life. The Palaeozoic, meaning ancient life, saw fishes and amphibians and great fern forests. The Mesozoic, middle life, was the age of reptiles. The Cenozoic, recent life, is the age of mammals and flowering plants.',
    }),
    sl('check', 'Quick check: half-life', {
      b: 'What is the half-life of carbon-14?',
      n: 'Quick check. It is a little under six thousand years.',
      chk: 'halflife-mcq',
    }),
    sl('check', 'Quick check: connecting link', {
      b: 'Archaeopteryx links which two groups?',
      n: 'Quick check. It had feathers and also teeth.',
      chk: 'archaeopteryx-mcq',
    }),
    sl('concept', 'Biogeographical evidence', {
      b: 'The **distribution** of organisms reflects their history. Islands such as the **Galapagos** have **endemic** species found nowhere else. **Australia**, isolated early, has many **marsupials**, which radiated to fill niches that **placental mammals** fill on other continents.',
      v: table(['Australian marsupial', 'Placental counterpart', 'Shared way of life'], [['Tasmanian wolf', 'Wolf', 'Predator'], ['Marsupial mole', 'Mole', 'Burrowing'], ['Sugar glider', 'Flying squirrel', 'Gliding'], ['Numbat (banded anteater)', 'Anteater', 'Eating ants']], 'Table of Australian marsupials and their placental counterparts'),
      n: 'Marsupials in Australia look remarkably like placental mammals elsewhere, because they adapted to similar ways of life. This is convergent evolution between the two groups, while within Australia the marsupials diverged from one ancestor.',
    }),
    sl('diagram', 'Adaptive radiation: Darwin’s finches', {
      b: '**Adaptive radiation** is the evolution of many different forms from one ancestor, spreading into different habitats or niches. On the **Galapagos Islands**, **Charles Darwin** saw finches with beaks suited to **seeds, insects, cactus flowers, grubs and buds**, all descended from a **seed-eating ancestor**.',
      v: V.finches,
      n: 'Darwin noticed that each island’s finches differed mainly in their beaks, and each beak matched the food available. One ancestral finch had spread across the islands and given rise to many species, each adapted to a different niche.',
    }),
    sl('example', 'Worked example 2: dating an older sample', {
      b: 'A piece of charcoal from an ancient hearth has one sixteenth of the carbon-14 of fresh wood. Estimate its age, and say whether radiocarbon dating could date a dinosaur bone.',
      ul: [
        r`$\dfrac{1}{16} = \left(\dfrac{1}{2}\right)^{4}$, so 4 half-lives.`,
        r`Age $= 4 \times ${HALF_LIFE} = ${AGE_SIXTEENTH}$ years.`,
        'Dinosaurs died out about **66 million** years ago: almost no carbon-14 would remain, so **uranium–lead** or similar dating of rocks is used.',
      ],
      v: table(['Sample', 'Fraction left', 'Age'], [['Charcoal', '1/16', `${AGE_SIXTEENTH} years`], ['Dinosaur bone', 'None measurable', 'Use other isotopes']], `Worked table: one sixteenth left means ${AGE_SIXTEENTH} years`),
      n: 'One sixteenth is four halvings, so about twenty three thousand years have passed. A dinosaur bone is thousands of times older than that, far beyond the range of carbon fourteen, so other radioactive clocks are used.',
    }),
    sl('concept', 'Molecular evidence', {
      b: 'All living organisms share the same basic chemistry: **DNA** as genetic material, the **nearly universal genetic code**, **ATP** as energy currency, and similar proteins. The **more closely related** two species are, the **more similar** their DNA and proteins.',
      v: table(['Molecule compared', 'Finding'], [['Genetic code', 'Same codons in bacteria, plants and animals'], ['Cytochrome c', 'Human and chimpanzee identical; human and yeast differ more'], ['Genome', 'Human and chimpanzee DNA about 98–99 percent similar']], 'Table of molecular evidence for evolution'),
      n: 'If all life shares one genetic code and the same energy molecule, it most likely descended from a common ancestor. Differences in DNA and proteins build up with time, so they act as a molecular record of how closely species are related.',
    }),
    sl('check', 'Quick check: marsupials', {
      b: 'Judge the assertion and the reason about Australian marsupials.',
      n: 'Quick check. Did the marsupials come from one ancestor or many?',
      chk: 'marsupial-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Embryology: gill slits, notochord, tail in vertebrate embryos; Haeckel’s recapitulation, corrected by von Baer.',
        `Fossils in strata; Archaeopteryx links reptiles and birds; carbon-14 half-life ${HALF_LIFE} years.`,
        'Eras: Precambrian, Palaeozoic (fishes, amphibians, ferns), Mesozoic (reptiles, gymnosperms), Cenozoic (mammals, flowering plants).',
        'Biogeography: Galapagos endemics; Australian marsupials and placental counterparts.',
        'Adaptive radiation: Darwin’s finches, Australian marsupials; molecules: universal code, similar DNA and proteins.',
      ],
      v: table(['Evidence', 'Key example'], [['Embryological', 'Gill slits in embryos'], ['Palaeontological', 'Archaeopteryx'], ['Biogeographical', 'Australian marsupials'], ['Molecular', 'Universal genetic code']], 'Summary table of evidences and examples'),
      n: 'To recap: embryos, fossils, the distribution of species and their molecules all show descent with modification. Adaptive radiation, seen in Darwin’s finches and Australian marsupials, shows one ancestor giving rise to many forms.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'In dating problems, **count the halvings** and multiply by the half-life.',
        'Give **era, time and dominant flora and fauna** together.',
        'Use **Darwin’s finches** and **Australian marsupials** for adaptive radiation.',
        'Name **Archaeopteryx** as a connecting link with features of both groups.',
      ],
      n: 'Exam tips. In dating problems, count how many times the amount has halved. Learn each era with its time and dominant life. Use Darwin’s finches and Australian marsupials for adaptive radiation. And give features of both groups for a connecting link.',
    }),
  ],
});
