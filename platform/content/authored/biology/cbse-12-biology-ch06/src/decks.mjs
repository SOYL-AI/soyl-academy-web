// ch06 Evolution — three decks: Part 1 (t01), Part 2 (t02–t03), Part 3 (t04).
import { sl, deck, table, flow, svgV, r } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { MILLER, LIMBS_SVG, SELECTION, HWSQ, BRAIN } from './svgs.mjs';
import { hwFromRecessive, hwFromP, alleleFreq, pct } from './calc.mjs';

export const V = {
  miller: svgV(MILLER, 'Miller’s apparatus: boiling water, a flask of gases with electric sparks, a condenser and a trap collecting amino acids', 'Schematic, not to scale.'),
  limbs: svgV(LIMBS_SVG, 'Forelimbs of human, cheetah, whale and bat with the same bone groups in different proportions'),
  selection: svgV(SELECTION, 'Stabilising, directional and disruptive selection shown as changes in a frequency curve'),
  hwsq: svgV(HWSQ, 'Hardy–Weinberg square for p = 0.7 and q = 0.3 with genotype frequencies 0.49, 0.42 and 0.09'),
  brain: svgV(BRAIN, 'Bar chart of approximate brain capacity of Homo habilis, Homo erectus and Neanderthal man'),
};

// ---------------------------------------------------------------- computed numbers
const H1 = hwFromRecessive(0.16);
const P2 = alleleFreq(36, 48, 16);
const H2 = hwFromP(P2);
const B1 = pct(1400 - 900, 900);
const B2 = pct(900 - 800, 800);
const AGE = Math.round(15e6 / 18000);

export const deck1 = deck({
  part: 1,
  title: 'Evolution — Part 1: Origin of life and evidence for evolution',
  goals: [
    'Outline the main ideas about the origin of life, including chemical evolution',
    'Describe Miller’s experiment and what it showed',
    'Explain palaeontological, anatomical, molecular and embryological evidence for evolution',
    'Explain industrial melanism and resistance as evidence of natural selection',
  ],
  slides: [
    sl('title', 'Evolution', {
      b: 'Part 1 — how life may have begun on a young Earth, and the evidence that living things have changed over time.',
      v: flow('LR', [['u', 'Universe forms'], ['e', 'Earth forms'], ['c', 'Chemical evolution'], ['l', 'First life'], ['d', 'Diversity of life']], [['u', 'e'], ['e', 'c'], ['c', 'l'], ['l', 'd']], 'Flow from the formation of the universe and Earth to chemical evolution, the first life and today’s diversity'),
      n: 'Evolutionary biology is the study of the history of life on Earth. In this part we ask two big questions. How might life have begun from non-living matter? And what evidence shows that living things have changed, and are still changing, over very long periods of time?',
    }),
    sl('concept', 'A timeline of beginnings', {
      b: 'The universe is very old — about **20 billion years**, according to the textbook account of the **Big Bang**. The Earth formed about **4.5 billion years** ago; life appeared about **4 billion years** ago.',
      v: table(['Event', 'Approximate time ago'], [['Big Bang: the universe begins', 'About 20 billion years'], ['Earth forms', 'About 4.5 billion years'], ['Life appears', 'About 4 billion years'], ['First non-cellular forms of life', 'About 3 billion years'], ['First cellular forms', 'About 2000 million years']], 'Table of approximate times of the origin of the universe, Earth and life'),
      n: 'The young Earth had no atmosphere at first. Water vapour, methane, carbon dioxide and ammonia released from molten material covered its surface, and ultraviolet rays split water into hydrogen and oxygen. As the Earth cooled, the vapour fell as rain, filling hollows to form oceans. Life appeared about four billion years ago, and the first cells much later.',
    }),
    sl('concept', 'Early ideas about the origin of life', {
      b: 'Several ideas were proposed; experiments ruled some of them out.',
      v: table(['Idea', 'Claim', 'Status'], [['Special creation', 'All living beings were created as they are, a few thousand years ago', 'Not supported by evidence'], ['Spontaneous generation', 'Life arises from decaying and rotting matter, such as straw or mud', 'Disproved by Louis Pasteur'], ['Panspermia', 'Units of life (spores) came from outer space', 'Speculative'], ['Chemical evolution (Oparin and Haldane)', 'Life arose from non-living organic molecules', 'Supported by experiments']], 'Table of four ideas about the origin of life with claims and status'),
      n: 'Louis Pasteur settled one old debate. He showed that in pre-sterilised flasks, killed yeast did not give rise to new life, while life did appear in flasks open to the air. Life comes only from pre-existing life today. But that leaves the question of how the very first life began.',
    }),
    sl('concept', 'Chemical evolution', {
      b: '**Oparin and Haldane** proposed that the first form of life could have come from **pre-existing non-living organic molecules** (such as RNA and protein), formed by **chemical evolution** under the conditions of the early Earth.',
      v: flow('LR', [['g', 'Early Earth: high temperature, volcanic storms, reducing atmosphere (CH₄, NH₃, H₂, water vapour)'], ['o', 'Simple organic molecules (for example amino acids)'], ['p', 'Larger molecules such as RNA and proteins'], ['l', 'First non-cellular forms of life']], [['g', 'o', 'energy from lightning, UV'], ['o', 'p'], ['p', 'l']], 'Flow of chemical evolution from early-Earth conditions to simple organic molecules, larger molecules and the first forms of life'),
      n: 'The idea is that, on the hot young Earth, energy from lightning and ultraviolet light drove chemical reactions among simple gases. These produced small organic molecules, which joined into larger ones like RNA and proteins. Over a very long time, these could have formed the first self-copying systems.',
    }),
    sl('diagram', 'Miller’s experiment (1953)', {
      b: '**S. L. Miller** created conditions like those of the early Earth in the laboratory: **electric discharge** in a closed flask containing **CH₄, H₂, NH₃ and water vapour** at about **800 °C**. He observed the formation of **amino acids**.',
      v: V.miller,
      n: 'Miller boiled water to make vapour and passed it, with methane, ammonia and hydrogen, through a flask where electrodes produced sparks, like lightning. The gases were cooled and collected. After about a week, the liquid contained amino acids. Others later found sugars, nitrogen bases, pigments and fats in similar experiments.',
    }),
    sl('example', 'Worked example 1: interpreting Miller’s results', {
      b: 'A student repeats a Miller-type experiment in two set-ups. A: gases + water vapour + sparks. B: the same, but without sparks. Only A forms amino acids. What do the results show?',
      ul: [
        'Step 1 — The only difference is the **energy source** (sparks).',
        'Step 2 — Amino acids form only **with** energy: simple gases need energy to react.',
        'Step 3 — On the early Earth, **lightning and UV radiation** could have supplied this energy.',
        'Conclusion — organic molecules can form from inorganic gases without life; this supports **chemical evolution**, though it does not show how cells formed.',
      ],
      v: table(['Set-up', 'Gases + water', 'Energy (sparks)', 'Amino acids'], [['A', 'Yes', 'Yes', 'Formed'], ['B', 'Yes', 'No', 'Not formed']], 'Worked table: amino acids form only in the set-up with sparks'),
      n: 'This is a controlled experiment: everything is the same except the sparks. So the sparks, the energy source, must be needed. Miller’s work supports the first step of chemical evolution. Be careful not to overclaim: making amino acids is not the same as making a living cell.',
    }),
    sl('check', 'Quick check: chemical evolution', {
      b: 'What did Miller’s experiment demonstrate?',
      n: 'Quick check. Think about what was in the flask at the start and at the end.',
      chk: 'miller-mcq',
    }),
    sl('concept', 'Fossils: palaeontological evidence', {
      b: '**Fossils** are remains of hard parts of life forms found in rocks. **Sedimentary rocks** form in layers, and each layer indicates a geological period; **deeper layers are older**. Different-aged layers contain different life forms, many of them **extinct**.',
      v: table(['Rock layer', 'Age', 'What fossils show'], [['Upper (recent)', 'Younger', 'Forms closer to living organisms'], ['Middle', 'Intermediate', 'Some forms no longer alive'], ['Lower (deep)', 'Older', 'Simpler, often extinct forms']], 'Table of rock layers with their age and the kind of fossils found'),
      n: 'Fossils are like pages of a history book written in stone. Deeper rock layers were laid down earlier, so their fossils are older. Comparing layers shows that life forms have changed over time; many, like dinosaurs, have disappeared completely. The age of fossils can be found by radioactive dating.',
    }),
    sl('diagram', 'Homologous organs', {
      b: 'The forelimbs of **whales, bats, cheetahs and humans** perform different functions but have the **same pattern of bones**: humerus, radius and ulna, carpals, metacarpals and phalanges. They are **homologous**: same ancestry, different functions. This is **divergent evolution**.',
      v: V.limbs,
      n: 'Look at the four forelimbs. The same set of bones appears in the same order in each, but in different proportions: long finger bones in the bat’s wing, short broad ones in the whale’s flipper. The simplest explanation is that all four descended from a common ancestor, and the limb was modified for different uses.',
    }),
    sl('concept', 'Homology versus analogy', {
      b: '**Analogous** organs perform the **same function** but have **different structure and origin**; they arise by **convergent evolution**, when unrelated organisms adapt to similar habitats.',
      v: table(['', 'Homologous', 'Analogous'], [['Structure and origin', 'Same', 'Different'], ['Function', 'Different (often)', 'Same'], ['Type of evolution', 'Divergent', 'Convergent'], ['Animal examples', 'Forelimbs of whale, bat, cheetah, human; vertebrate hearts and brains', 'Wings of butterfly and bird; eyes of octopus and mammals; flippers of penguin and dolphin'], ['Plant examples', 'Thorns of Bougainvillea and tendrils of Cucurbita', 'Sweet potato (root) and potato (stem)']], 'Table comparing homologous and analogous organs with types of evolution and examples'),
      n: 'Ask two questions: are the organs built the same way, and do they do the same job? Same build but different job means homologous, the result of divergent evolution. Different build but same job means analogous, the result of convergent evolution. A sweet potato is a swollen root, a potato a swollen stem, yet both store food.',
    }),
    sl('example', 'Worked example 2: classify the pairs', {
      b: 'Classify each pair as homologous or analogous, with a reason.',
      ul: [
        'Thorn of Bougainvillea and tendril of Cucurbita → **homologous**: both are modified stems/axillary structures with the same origin, different functions.',
        'Wing of a bird and wing of a butterfly → **analogous**: same function (flight), different structure.',
        'Flipper of a dolphin and flipper of a penguin → **analogous**: a mammal and a bird adapted to swimming.',
        'Heart of a frog and heart of a human → **homologous**: same basic vertebrate plan.',
      ],
      v: table(['Pair', 'Same origin?', 'Same function?', 'Type'], [['Thorn, tendril', 'Yes', 'No', 'Homologous'], ['Bird wing, butterfly wing', 'No', 'Yes', 'Analogous'], ['Dolphin flipper, penguin flipper', 'No', 'Yes', 'Analogous'], ['Frog heart, human heart', 'Yes', 'Yes (similar)', 'Homologous']], 'Worked table classifying four pairs of organs as homologous or analogous'),
      n: 'Use the origin test first. Thorns and tendrils both arise in the same position from the same kind of tissue, so they are homologous even though one protects and the other climbs. Bird and butterfly wings are built from completely different materials, so they are analogous. Dolphin and penguin flippers are analogous too.',
    }),
    sl('check', 'Quick check: analogous organs', {
      b: 'Which pair shows analogous organs?',
      n: 'Quick check. Look for the same job done by different structures.',
      chk: 'analogous-mcq',
    }),
    sl('concept', 'Molecular and embryological evidence', {
      b: 'Similarities in **proteins and genes** of different organisms point to common ancestry (**molecular homology**). Embryos of vertebrates also share features.',
      v: table(['Evidence', 'Observation', 'Caution'], [['Molecular', 'Similar proteins, genes and biochemistry across groups', 'Strong evidence of common ancestry'], ['Embryological (Haeckel)', 'Vertebrate embryos, including human ones, have a row of vestigial gill slits behind the head', 'Von Baer showed that embryos never pass through the adult stages of other animals']], 'Table of molecular and embryological evidence with cautions'),
      n: 'Molecules give some of the strongest evidence: the more closely related two organisms are, the more similar their proteins and genes. Ernst Haeckel pointed to features like gill slits shared by vertebrate embryos. But Karl Ernst von Baer noted that embryos never pass through the adult stages of other animals, so this evidence must be used carefully.',
    }),
    sl('concept', 'Evolution observed: industrial melanism and resistance', {
      b: 'In England, **peppered moths** were mostly **light-winged** before industrialisation (around 1850). By around 1920, in industrial areas, **dark-winged** moths became more common. Pollution killed the pale lichens and darkened tree trunks with soot.',
      v: table(['Situation', 'Background', 'Better camouflaged', 'Result'], [['Before industrialisation', 'Pale, lichen-covered trunks', 'Light moths', 'Light moths common'], ['After industrialisation', 'Dark, soot-covered trunks', 'Dark moths', 'Dark moths common'], ['Rural areas', 'Pale trunks', 'Light moths', 'Light moths remain common']], 'Table of peppered moth frequencies before and after industrialisation and in rural areas'),
      n: 'Birds catch moths they can see easily. On pale trunks, dark moths stood out and were eaten; on sooty trunks, pale moths stood out. So the more camouflaged form survived and reproduced. Similar selection happens today when we overuse herbicides, pesticides, antibiotics or drugs: resistant organisms survive and spread within months or years. This is anthropogenic, human-caused, selection.',
    }),
    sl('check', 'Quick check: peppered moths', {
      b: 'Judge the assertion and the reason about peppered moths.',
      n: 'Quick check. Did the pollution create dark moths, or did it change which ones survived?',
      chk: 'moth-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Universe about 20 billion years old (Big Bang); Earth about 4.5 billion; life about 4 billion years ago.',
        'Pasteur disproved spontaneous generation; Oparin and Haldane proposed chemical evolution; Miller (CH₄, H₂, NH₃, water vapour, sparks) obtained amino acids.',
        'Evidence: fossils in sedimentary layers; homologous organs (divergent evolution) and analogous organs (convergent evolution); molecular homology; embryology (with von Baer’s caution).',
        'Natural selection observed: industrial melanism in peppered moths; resistance to antibiotics, pesticides and herbicides.',
      ],
      v: table(['Evidence', 'Example'], [['Palaeontological', 'Fossils in rock layers'], ['Homology', 'Vertebrate forelimbs'], ['Analogy', 'Wings of bird and butterfly'], ['Natural selection in action', 'Peppered moth']], 'Summary table of kinds of evidence with examples'),
      n: 'To recap: life probably arose through chemical evolution on a young Earth, as Miller’s experiment suggests. Fossils, homologous and analogous organs, molecules and embryos all point to change over time and common ancestry. And we can watch natural selection at work in moths and in resistant microbes.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Write the **gases in Miller’s flask** (CH₄, NH₃, H₂, water vapour) and the **product** (amino acids).',
        'Link **homology → divergent** and **analogy → convergent** evolution, with an example each.',
        'In industrial melanism, say that **variation existed already**; pollution changed **which form survived**.',
        'Name the **plant examples** too: thorns and tendrils (homologous); sweet potato and potato (analogous).',
      ],
      n: 'Exam tips. Learn Miller’s set-up and result. Pair homology with divergent evolution and analogy with convergent evolution. In the peppered moth story, never say pollution made moths dark; it changed which colour survived. And learn the plant examples as well as the animal ones.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Evolution — Part 2: Darwin, adaptive radiation and the mechanism of evolution',
  goals: [
    'Explain Darwin’s theory of natural selection and compare it with Lamarck’s idea',
    'Explain adaptive radiation and convergent evolution with examples',
    'Apply the Hardy–Weinberg principle to calculate allele and genotype frequencies',
    'Describe gene flow, genetic drift, mutation, recombination and three types of natural selection',
  ],
  slides: [
    sl('title', 'How evolution works', {
      b: 'Part 2 — natural selection, adaptive radiation, and how population genetics measures evolution.',
      v: flow('LR', [['v', 'Variation'], ['s', 'Natural selection'], ['p', 'Changed allele frequencies'], ['n', 'New forms and species']], [['v', 's'], ['s', 'p'], ['p', 'n']], 'Flow from variation through natural selection to changed allele frequencies and new forms'),
      n: 'Darwin and Wallace explained how evolution happens: through natural selection acting on variation. Later, genetics showed where variation comes from and how to measure evolution as changes in allele frequencies. This part brings those ideas together.',
    }),
    sl('concept', 'Darwin and Wallace', {
      b: '**Charles Darwin**, on a sea voyage around the world aboard **HMS Beagle**, observed great variation among living forms and their fit to their environments. **Alfred Wallace**, working in the Malay Archipelago, reached similar conclusions.',
      v: table(['Observation', 'Inference'], [['Organisms produce more offspring than can survive', 'There is a struggle for existence'], ['Individuals of a species vary', 'Some variants are better suited to the environment'], ['Many variations are heritable', 'Better-suited variants leave more offspring'], ['Over many generations', 'Populations change; new types arise (branching descent)']], 'Table of Darwin’s observations and inferences'),
      n: 'Darwin noticed that all living things produce more young than can possibly survive, and that individuals differ from one another. Those whose variations suit them better to their surroundings tend to survive and leave more offspring, passing on those variations. Over very many generations, populations change and branch into new forms.',
    }),
    sl('concept', 'Natural selection and fitness', {
      b: 'In Darwin’s sense, **fitness** means **reproductive fitness**: those who are better fit in an environment leave **more progeny**. **Natural selection** is the process by which such individuals increase in a population.',
      v: flow('TB', [['v', 'Heritable variation in a population'], ['o', 'Over-production of offspring'], ['s', 'Struggle for resources'], ['f', 'Better-fit variants survive and reproduce more'], ['c', 'Their traits become commoner over generations']], [['v', 'f'], ['o', 's'], ['s', 'f'], ['f', 'c']], 'Flow of natural selection from heritable variation and over-production to survival of the fit and change over generations'),
      n: 'Fitness does not mean being the strongest or fastest. It means leaving more surviving offspring. A plain-coloured moth that hides well and lays many eggs is fitter than a showy one that is eaten early. Natural selection simply records which variants leave more descendants.',
    }),
    sl('concept', 'Lamarck versus Darwin', {
      b: '**Lamarck** proposed that organs used more become stronger and such **acquired characters are inherited** (the giraffe stretching its neck). This is not accepted today.',
      v: table(['', 'Lamarck', 'Darwin'], [['Source of change', 'Use and disuse of organs during life', 'Pre-existing heritable variation'], ['Giraffe’s long neck', 'Ancestors stretched their necks; longer necks were passed on', 'Longer-necked variants reached more food, survived and left more offspring'], ['Status', 'Rejected: acquired traits are not inherited', 'Accepted, with genetics added']], 'Table comparing Lamarck’s and Darwin’s explanations'),
      n: 'Lamarck thought giraffes got long necks by stretching to reach leaves, and passed the stretched necks to their young. But changes acquired during life, like stronger muscles from exercise, are not passed on through genes. Darwin’s idea is that longer-necked giraffes already existed by variation and simply left more young.',
    }),
    sl('concept', 'Adaptive radiation', {
      b: '**Adaptive radiation** is the evolution of different species in a geographical area, starting from one point and radiating into other habitats.',
      v: table(['Example', 'What happened'], [['Darwin’s finches (Galápagos)', 'From seed-eating ancestors, many finches evolved with beaks altered for insects and other foods'], ['Australian marsupials', 'Many marsupials evolved from an ancestral stock within one island continent'], ['Placental mammals and marsupials', 'Matching forms in the two groups (placental wolf and Tasmanian wolf) show convergent evolution']], 'Table of examples of adaptive radiation and convergent evolution'),
      n: 'On the Galápagos Islands, Darwin found many kinds of small black birds, now called Darwin’s finches. From an original seed-eating type, others evolved beaks suited to insects and other foods. When more than one adaptive radiation happens in isolated areas, such as in Australian marsupials and placental mammals elsewhere, similar forms appear: convergent evolution.',
    }),
    sl('check', 'Quick check: adaptive radiation', {
      b: 'Which is an example of adaptive radiation?',
      n: 'Quick check. Look for many forms evolving from one ancestor in one region.',
      chk: 'radiation-mcq',
    }),
    sl('concept', 'Mutation theory and the modern synthesis', {
      b: '**Hugo de Vries**, working on the evening primrose, proposed that **mutations** — large, sudden variations — cause evolution (**saltation**). The modern view combines natural selection with genetics.',
      v: table(['', 'Darwinian variation', 'Mutation (de Vries)'], [['Size of change', 'Small', 'Large, sudden'], ['Direction', 'Directional', 'Random, directionless'], ['Speed of evolution', 'Gradual', 'Single-step large changes (saltation)']], 'Table comparing Darwinian variation with de Vries’s mutations'),
      n: 'De Vries saw sudden large changes in evening primrose plants and suggested that evolution could happen in jumps. Today we understand that mutations, gene recombination and other processes supply variation, and natural selection, together with chance, shapes it. This combined view is often called the modern synthetic theory.',
    }),
    sl('concept', 'The Hardy–Weinberg principle', {
      b: 'In a population, **allele frequencies remain constant** from generation to generation if nothing disturbs it: **genetic equilibrium**. With two alleles of frequencies **p** and **q**: **p + q = 1** and **p² + 2pq + q² = 1**.',
      v: table(['Symbol', 'Meaning'], [['p', 'Frequency of allele A'], ['q', 'Frequency of allele a'], ['p²', 'Frequency of AA individuals'], ['2pq', 'Frequency of Aa individuals'], ['q²', 'Frequency of aa individuals']], 'Table of the symbols of the Hardy–Weinberg equation and their meanings'),
      n: 'The Hardy–Weinberg principle is a baseline. If a population is large, mates at random, and has no migration, mutation or selection, then allele frequencies stay the same forever. When we measure a change from these expected values, we know that evolution is happening, and we can look for its cause.',
    }),
    sl('diagram', 'Where p² + 2pq + q² comes from', {
      b: 'Random union of gametes: the chance of AA is p × p, of aa is q × q, and of Aa is p × q twice (A from either parent).',
      v: V.hwsq,
      n: 'Imagine the gene pool as a bag of gametes. A fraction p carry A and a fraction q carry a. Picking two at random, the chance of two A gametes is p squared, of two a gametes q squared, and of one of each is two times p times q, because the A could come from either parent. The three add up to one.',
    }),
    sl('example', 'Worked example 1: from a recessive trait', {
      b: 'In a population in equilibrium, 16 percent of individuals show a recessive trait (aa). Find q, p and the percentage of carriers (Aa).',
      ul: [
        r`Step 1 — $q^2 = 0.16$, so $q = \sqrt{0.16} = ${H1.q}$.`,
        r`Step 2 — $p = 1 - q = 1 - ${H1.q} = ${H1.p}$.`,
        r`Step 3 — Carriers $= 2pq = 2 \times ${H1.p} \times ${H1.q} = ${H1.Aa}$, that is ${H1.Aa * 100} percent; AA $= p^2 = ${H1.AA}$.`,
        r`Check — $${H1.AA} + ${H1.Aa} + ${H1.aa} = 1$.`,
      ],
      v: table(['Quantity', 'Value'], [['q', String(H1.q)], ['p', String(H1.p)], ['AA (p²)', String(H1.AA)], ['Aa (2pq)', String(H1.Aa)], ['aa (q²)', String(H1.aa)]], `Worked table: q ${H1.q}, p ${H1.p}, AA ${H1.AA}, Aa ${H1.Aa}, aa ${H1.aa}`),
      n: 'Always start from the recessive class, because only there do we know the genotype from the appearance. The square root of zero point one six is zero point four, so q is zero point four and p is zero point six. Carriers are two times p times q, zero point four eight, so nearly half the population carries the allele without showing it.',
    }),
    sl('example', 'Worked example 2: is the population in equilibrium?', {
      b: 'A sample of 100 people has 36 AA, 48 Aa and 16 aa. Find p, and check whether the genotype frequencies match Hardy–Weinberg expectations.',
      ul: [
        r`Step 1 — $p = \dfrac{2 \times 36 + 48}{2 \times 100} = \dfrac{120}{200} = ${P2}$; $q = ${H2.q}$.`,
        r`Step 2 — Expected: AA $= p^2 = ${H2.AA}$, Aa $= 2pq = ${H2.Aa}$, aa $= q^2 = ${H2.aa}$.`,
        'Step 3 — Observed: 0.36, 0.48, 0.16 — the same.',
        'Conclusion — the population is in Hardy–Weinberg equilibrium for this gene.',
      ],
      v: table(['Genotype', 'Observed', 'Expected'], [['AA', '0.36', String(H2.AA)], ['Aa', '0.48', String(H2.Aa)], ['aa', '0.16', String(H2.aa)]], 'Worked table: observed genotype frequencies equal the expected ones, so the population is in equilibrium'),
      n: 'Count alleles: each AA person has two A alleles and each Aa person has one. One hundred and twenty A alleles out of two hundred gives p equal to zero point six. The expected frequencies from p match the observed ones exactly, so nothing is disturbing this gene at the moment. A mismatch would signal evolution.',
    }),
    sl('check', 'Quick check: Hardy–Weinberg', {
      b: 'If p = 0.7 in a population in equilibrium, what is the frequency of heterozygotes?',
      n: 'Quick check. Find q first, then use two p q.',
      chk: 'hw-mcq',
    }),
    sl('concept', 'What disturbs the equilibrium', {
      b: 'Five factors change allele frequencies: they cause **evolution**.',
      v: table(['Factor', 'How it changes allele frequencies'], [['Gene migration (gene flow)', 'Individuals move between populations and add or remove alleles'], ['Genetic drift', 'Chance changes, strongest in small populations; a founder population may differ greatly (founder effect)'], ['Mutation', 'Creates new alleles'], ['Genetic recombination', 'New combinations of alleles during gametogenesis'], ['Natural selection', 'Heritable variations that enable better survival and reproduction become commoner']], 'Table of five factors that disturb Hardy–Weinberg equilibrium'),
      n: 'Each of these breaks one assumption of the equilibrium. Migration brings in or takes out alleles. Drift is pure chance, and in a small group that starts a new population, called founders, the allele frequencies can be very different from the original. Mutation and recombination create new variation, and natural selection favours some variants.',
    }),
    sl('diagram', 'Three types of natural selection', {
      b: 'Natural selection acts on the **range of a phenotype** in a population.',
      v: V.selection,
      n: 'Look at the curves. In stabilising selection, individuals near the average do best, so the curve becomes narrower. In directional selection, one extreme is favoured and the whole curve shifts. In disruptive selection, both extremes are favoured over the middle, and the curve may split into two peaks.',
    }),
    sl('concept', 'Stabilising, directional and disruptive', {
      b: 'Each type changes the population differently.',
      v: table(['Type', 'Favoured', 'Effect on the curve', 'Example idea'], [['Stabilising', 'Average values', 'Narrower, taller peak at the mean', 'Human birth weight: very low and very high are less likely to survive'], ['Directional', 'One extreme', 'Peak shifts towards that extreme', 'Insects becoming more resistant to a pesticide'], ['Disruptive', 'Both extremes', 'Middle falls; two peaks form', 'Seeds of two sizes favoured, medium sizes rare']], 'Table of the three types of selection with what is favoured, the effect on the curve and examples'),
      n: 'Stabilising selection keeps things as they are by removing extremes. Directional selection pushes the population steadily one way, as when pests become resistant to chemicals. Disruptive selection splits a population, and over time it might lead to two different forms.',
    }),
    sl('check', 'Quick check: genetic drift', {
      b: 'Judge the assertion and the reason about a founder population.',
      n: 'Quick check. Why might a few founders not represent the original population?',
      chk: 'drift-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Darwin (HMS Beagle) and Wallace: natural selection; fitness = reproductive fitness; branching descent.',
        'Lamarck’s inheritance of acquired characters is rejected.',
        'Adaptive radiation: Darwin’s finches, Australian marsupials; convergent evolution between marsupials and placental mammals.',
        'De Vries: mutations, saltation. Hardy–Weinberg: p + q = 1; p² + 2pq + q² = 1.',
        'Disturbing factors: gene flow, genetic drift (founder effect), mutation, recombination, natural selection.',
        'Selection: stabilising, directional, disruptive.',
      ],
      v: table(['Concept', 'Key idea'], [['Fitness', 'More surviving offspring'], ['Hardy–Weinberg', 'Constant allele frequencies without disturbance'], ['Genetic drift', 'Chance changes, strongest in small populations']], 'Summary table of key concepts'),
      n: 'To recap: natural selection acts on heritable variation, and fitness means leaving more offspring. Adaptive radiation produces many forms from one ancestor. The Hardy–Weinberg principle tells us what to expect when nothing is happening, so any change in allele frequencies measures evolution, driven by migration, drift, mutation, recombination or selection.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'In Hardy–Weinberg problems, **start from q²** (the recessive phenotype).',
        'Remember **2pq** for heterozygotes, not pq.',
        'Define fitness as **reproductive** fitness.',
        'Name an **example** for each type of selection and for adaptive radiation.',
      ],
      n: 'Exam tips. In Hardy–Weinberg sums, start from the recessive class and take the square root. Do not forget the two in two p q. Define fitness as reproductive success. And keep one example ready for each type of selection and for adaptive radiation.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'Evolution — Part 3: Origin and evolution of humans',
  goals: [
    'Outline the main stages of human evolution with approximate times',
    'Compare the brain capacity and features of Homo habilis, Homo erectus and Neanderthal man',
    'Describe the origin and spread of Homo sapiens and the development of culture',
  ],
  slides: [
    sl('title', 'Human evolution', {
      b: 'Part 3 — from ape-like ancestors to modern humans, traced through fossils.',
      v: flow('LR', [['d', 'Dryopithecus, Ramapithecus'], ['a', 'Australopithecines'], ['h', 'Homo habilis'], ['e', 'Homo erectus'], ['n', 'Neanderthal man'], ['s', 'Homo sapiens']], [['d', 'a'], ['a', 'h'], ['h', 'e'], ['e', 'n'], ['e', 's']], 'Flow of the main stages of human evolution'),
      n: 'Humans and apes share common ancestors. Fossils let us follow the changes that led to modern humans: walking upright, larger brains, better tools, and finally culture, art and agriculture. The times given are approximate and are revised as new fossils are found.',
    }),
    sl('concept', 'A timeline of human evolution', {
      b: 'Approximate times, from the textbook account:',
      v: table(['Time ago', 'Form'], [['About 15 million years', 'Dryopithecus (more ape-like) and Ramapithecus (more man-like)'], ['About 2 million years', 'Australopithecines in East African grasslands'], ['About 2 million years', 'Homo habilis'], ['About 1.5 million years', 'Homo erectus (fossil found in Java, 1891)'], ['About 1 lakh to 40 000 years', 'Neanderthal man, in east and central Asia'], ['About 75 000 to 10 000 years', 'Modern Homo sapiens spread during the ice age'], ['About 18 000 years', 'Prehistoric cave art'], ['About 10 000 years', 'Agriculture and settlements begin']], 'Table of approximate times of stages of human evolution'),
      n: 'Around fifteen million years ago, ape-like primates such as Dryopithecus and Ramapithecus lived; they were hairy and walked like gorillas. About two million years ago, Australopithecines lived in East African grasslands. Later came Homo habilis, Homo erectus and Neanderthal man. Modern humans spread across the world during the last ice age.',
    }),
    sl('concept', 'Early hominins', {
      b: 'The first forms were still very ape-like.',
      v: table(['Form', 'Features'], [['Dryopithecus', 'More ape-like'], ['Ramapithecus', 'More man-like'], ['Australopithecines', 'Probably hunted with stone weapons; ate mainly fruit'], ['Homo habilis (“handy man”)', 'Brain 650–800 cc; probably did not eat meat']], 'Table of features of early hominin forms'),
      n: 'Australopithecines probably hunted with stone weapons but ate mostly fruit. Homo habilis, the first human-like being, had a brain of six hundred and fifty to eight hundred cubic centimetres and probably did not eat meat. Each step shows a mixture of ape-like and human-like features.',
    }),
    sl('diagram', 'Growth of the brain', {
      b: 'Brain capacity increased markedly during human evolution.',
      v: V.brain,
      n: 'This bar chart shows approximate brain capacities. Homo habilis had six hundred and fifty to eight hundred cubic centimetres, Homo erectus about nine hundred, and Neanderthal man about fourteen hundred. A bigger brain went with better tools, hunting and, eventually, culture.',
    }),
    sl('example', 'Worked example 1: how much did the brain grow?', {
      b: 'Using the approximate values (Homo habilis up to 800 cc, Homo erectus 900 cc, Neanderthal man 1400 cc), find the percentage increase from habilis to erectus, and from erectus to Neanderthal man.',
      ul: [
        r`Step 1 — Habilis to erectus: $\dfrac{900 - 800}{800} \times 100 = ${B2}$ percent.`,
        r`Step 2 — Erectus to Neanderthal: $\dfrac{1400 - 900}{900} \times 100 \approx ${B1}$ percent.`,
        'Conclusion — the later step was a much larger increase.',
      ],
      v: table(['Change', 'Increase (cc)', 'Percentage increase'], [['Habilis (800) to erectus (900)', '100', `${B2}%`], ['Erectus (900) to Neanderthal (1400)', '500', `${B1}%`]], `Worked table: increases of ${B2} percent and ${B1} percent`),
      n: 'Percentage increase is the change divided by the starting value, times one hundred. From eight hundred to nine hundred is a twelve and a half percent increase. From nine hundred to fourteen hundred is about fifty-six percent. The values are approximate, but they show the trend clearly.',
    }),
    sl('check', 'Quick check: Homo habilis', {
      b: 'What was the approximate brain capacity of Homo habilis?',
      n: 'Quick check. Look at the first bar of the chart.',
      chk: 'habilis-mcq',
    }),
    sl('concept', 'Homo erectus and Neanderthal man', {
      b: 'Two later forms with larger brains.',
      v: table(['', 'Homo erectus', 'Neanderthal man'], [['When', 'About 1.5 million years ago', 'About 1 lakh to 40 000 years ago'], ['Brain', 'About 900 cc', 'About 1400 cc'], ['Diet and behaviour', 'Probably ate meat', 'Used hides to protect the body; buried their dead'], ['Where', 'Fossil found in Java (1891)', 'Near east and central Asian countries']], 'Table comparing Homo erectus and Neanderthal man'),
      n: 'Homo erectus had a bigger brain and probably ate meat. Neanderthal man had a brain about as large as ours, protected the body with animal hides and buried the dead, a sign of complex behaviour. Neanderthals lived in the near east and central Asia and later disappeared.',
    }),
    sl('concept', 'Homo sapiens and culture', {
      b: '**Homo sapiens** arose in **Africa** and moved across continents, developing into distinct races. During the **ice age** (about 75 000 to 10 000 years ago) modern humans spread widely. **Cave art** developed about **18 000 years ago**; **agriculture** and settlements began about **10 000 years ago**.',
      v: flow('LR', [['a', 'Homo sapiens arises in Africa'], ['m', 'Migrates across continents'], ['i', 'Ice age: modern humans spread'], ['c', 'Cave art (about 18 000 years ago)'], ['g', 'Agriculture and settlements (about 10 000 years ago)']], [['a', 'm'], ['m', 'i'], ['i', 'c'], ['c', 'g']], 'Flow from the origin of Homo sapiens in Africa to migration, the ice age, cave art and agriculture'),
      n: 'Our own species began in Africa and spread across the world. Prehistoric cave paintings, such as those in the Bhimbetka rock shelters of Madhya Pradesh, show that humans were making art long ago. About ten thousand years ago, people began farming and settling in one place, leading to the rise of human culture as we know it.',
    }),
    sl('example', 'Worked example 2: putting times in perspective', {
      b: 'Dryopithecus lived about 15 million years ago; cave art dates from about 18 000 years ago. How many times older is the Dryopithecus fossil than the cave art?',
      ul: [
        r`Step 1 — Write both in years: $15\,000\,000$ and $18\,000$.`,
        r`Step 2 — Ratio $= \dfrac{15\,000\,000}{18\,000} \approx ${AGE}$.`,
        'Conclusion — human culture is extremely recent compared with the long history of our ancestors.',
      ],
      v: table(['Event', 'Years ago'], [['Dryopithecus', '15 000 000'], ['Cave art', '18 000'], ['Ratio', `about ${AGE}`]], `Worked table: Dryopithecus is about ${AGE} times older than the cave art`),
      n: 'Convert both times to the same unit, years, then divide. Fifteen million divided by eighteen thousand is about eight hundred and thirty-three. In other words, if the time since Dryopithecus were a whole day, cave art would have appeared in less than the last two minutes.',
    }),
    sl('check', 'Quick check: Neanderthals', {
      b: 'Which feature describes Neanderthal man?',
      n: 'Quick check. Recall the brain size and behaviour in the table.',
      chk: 'neanderthal-mcq',
    }),
    sl('concept', 'Trends in human evolution', {
      b: 'Across these stages, several trends stand out.',
      v: table(['Trend', 'Change'], [['Brain size', 'Increased from about 650 cc to about 1400 cc'], ['Posture', 'Towards fully upright walking'], ['Tools', 'From simple stone tools to complex ones'], ['Diet', 'From mainly fruit to including meat'], ['Culture', 'Burial, art, agriculture, settlements']], 'Table of trends in human evolution'),
      n: 'The broad story is of increasing brain size, upright walking, better tools and a richer diet, followed by culture: caring for the dead, art, farming and towns. Remember that human evolution did not follow a single straight line; there were several branches, and only one, ours, survives today.',
    }),
    sl('check', 'Quick check: common ancestry', {
      b: 'Judge the assertion and the reason about humans and apes.',
      n: 'Quick check. Did humans evolve from today’s apes, or share ancestors with them?',
      chk: 'apes-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'About 15 mya: Dryopithecus (ape-like) and Ramapithecus (man-like).',
        'About 2 mya: Australopithecines (East Africa) and Homo habilis (650–800 cc, no meat).',
        'About 1.5 mya: Homo erectus (about 900 cc, probably ate meat; Java fossil, 1891).',
        'About 1 lakh–40 000 years: Neanderthal man (about 1400 cc, hides, burial).',
        'Homo sapiens arose in Africa; spread during the ice age; cave art about 18 000 years ago; agriculture about 10 000 years ago.',
      ],
      v: table(['Form', 'Brain (cc)'], [['Homo habilis', '650–800'], ['Homo erectus', 'About 900'], ['Neanderthal man', 'About 1400']], 'Summary table of brain capacities'),
      n: 'To recap: from ape-like ancestors fifteen million years ago, through Australopithecines and several species of Homo, brain size grew and behaviour became more complex. Homo sapiens arose in Africa, spread across the world, and developed art and agriculture very recently in evolutionary time.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Learn the **order** and approximate **times** of the forms.',
        'Give **brain capacities**: 650–800, about 900, about 1400 cc.',
        'Say humans and apes **share common ancestors**; humans did not evolve from today’s apes.',
        'Link Neanderthals with **burial of the dead** and **use of hides**.',
      ],
      n: 'Exam tips. Learn the sequence of forms with their approximate times and brain sizes. Always say that humans and apes share common ancestors rather than that humans came from apes. And remember the special behaviours of Neanderthal man.',
    }),
  ],
});
