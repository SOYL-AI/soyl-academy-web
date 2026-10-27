// ch15 Evolution — two decks: Part 1 (t01–t02) acquired and inherited traits, natural selection, genetic drift and speciation;
// Part 2 (t03–t04) evolution and classification, fossils, evolution by stages and human evolution.
import { sl, deck, table, flow, svgV, r } from '../../cbse-10-science-ch06/src/lib.mjs';
import { GRASS, SPECIATION, PHYLOGENY, FORELIMBS, WINGS, STRATA, APES } from './svgs.mjs';

export const V = {
  grass: svgV(GRASS, 'Two panels of grasshoppers on dry brown grass: half green and half brown in the first generation, and mostly brown several generations later', 'An illustrative population; birds are the selecting agent.'),
  speciation: svgV(SPECIATION, 'Four stages of speciation: one population, split by a river, changing separately on each side, until the two parts can no longer interbreed'),
  phylogeny: svgV(PHYLOGENY, 'Branching family tree of fish, frog, lizard, bird, mouse, chimpanzee and human, with a backbone, four limbs, and hair and milk marked where they first appeared'),
  forelimbs: svgV(FORELIMBS, 'Forelimb bones of a human, a cat, a whale and a bird, coloured to show the same upper arm bone, two forearm bones, wrist bones and finger bones in each'),
  wings: svgV(WINGS, 'Wings of an insect, a bird and a bat: a veined sheet without bones, feathers on arm bones, and skin stretched over long finger bones'),
  strata: svgV(STRATA, 'Section through rock layers with a trilobite in the deepest layer, then an ammonite, a fish and a mammal bone near the top; deeper layers are older'),
  apes: svgV(APES, 'Family tree showing chimpanzees and humans branching from a shared ancestor, which in turn shares an older ancestor with gorillas'),
};

export const traitsTable = table(
  ['', 'Acquired trait', 'Inherited trait'],
  [['How it arises', 'During an individual’s life, through use, training, injury or surroundings', 'From the DNA received from the parents'], ['Changes the DNA of germ cells?', 'No', 'It is in the DNA'], ['Passed to offspring?', 'No', 'Yes'], ['Examples', 'Strong muscles from exercise, a scar, a language learnt, a trimmed tail', 'Blood group, natural eye colour, flower colour in peas']],
  'Table comparing acquired and inherited traits: how they arise, whether they change germ-cell DNA, whether they are passed on, and examples',
);
export const selectionTable = table(
  ['Step', 'What happens'],
  [['1. Variation', 'Individuals differ, partly because of differences in their DNA'], ['2. Too many offspring', 'More young are born than can survive'], ['3. Struggle', 'Some variations help individuals survive and reproduce better in that environment'], ['4. Inheritance', 'Survivors pass these variations to their offspring'], ['5. Change', 'Over generations, the useful variations become common in the population']],
  'Table of the five steps of natural selection: variation, too many offspring, struggle, inheritance and change over generations',
);
export const driftTable = table(
  ['', 'Natural selection', 'Genetic drift'],
  [['Cause of change', 'Some variants survive and reproduce better', 'Pure chance (accidents, which individuals happen to breed)'], ['Adaptive?', 'Yes: favours variations that suit the environment', 'No: the change gives no survival advantage'], ['Strongest in', 'Any population', 'Small populations']],
  'Table comparing natural selection and genetic drift by cause of change, whether the change is adaptive, and where it is strongest',
);
export const speciationTable = table(
  ['Factor', 'Effect'],
  [['Geographical isolation (river, mountain, sea)', 'Stops gene flow between the two parts of a population'], ['Genetic drift', 'Chance changes in each isolated part, especially if it is small'], ['Natural selection', 'Different surroundings favour different variations in each part'], ['Changes in DNA or chromosomes', 'Germ cells of the two groups can no longer combine successfully']],
  'Table of four factors in speciation with their effects: isolation stops gene flow, drift and selection make the parts differ, and DNA changes prevent interbreeding',
);
export const organsTable = table(
  ['', 'Homologous organs', 'Analogous organs'],
  [['Basic structure and origin', 'Same', 'Different'], ['Function', 'May differ', 'Similar'], ['What they show', 'A common ancestor', 'Similar ways of life, not close relationship'], ['Example', 'Human arm, whale flipper, bird wing', 'Wings of an insect and a bird']],
  'Table comparing homologous and analogous organs by structure, function, what they show and an example',
);
export const datingTable = table(
  ['Method', 'How it works', 'What it tells'],
  [['By depth (relative dating)', 'In undisturbed layers, deeper rock was laid down earlier', 'Which fossil is older'], ['Radioactive dating', 'Compares the amounts of different isotopes of an element (for example carbon) in the fossil', 'Approximate age in years']],
  'Table of two ways of dating fossils: relative dating by depth and radioactive dating by isotope ratios',
);
export const cabbageFlow = flow(
  'TB',
  [['w', 'Wild cabbage'], ['c', 'Cabbage: short stem, tightly packed leaves'], ['b', 'Broccoli: clusters of flower buds'], ['f', 'Cauliflower: dense head of undeveloped flowers'], ['k', 'Kohlrabi: swollen stem'], ['l', 'Kale: large leaves']],
  [['w', 'c'], ['w', 'b'], ['w', 'f'], ['w', 'k'], ['w', 'l']],
  'Flow showing wild cabbage giving rise, through selection by farmers, to cabbage, broccoli, cauliflower, kohlrabi and kale',
  'All five are still one species; farmers selected different parts of the plant.',
);

export const deck1 = deck({
  part: 1,
  title: 'Evolution — Part 1: Traits, natural selection and the origin of species',
  goals: [
    'Distinguish acquired traits from inherited traits with examples',
    'Explain how natural selection changes a population over generations',
    'Explain genetic drift and how it differs from natural selection',
    'Explain how geographical isolation, genetic drift and natural selection lead to new species',
  ],
  slides: [
    sl('title', 'Evolution', {
      b: 'Part 1 — which traits can be passed on, and how populations change until new species arise. (This chapter is assessed through school-based activities and projects, not the board theory paper.)',
      v: flow('LR', [['v', 'Variation among individuals'], ['i', 'Inherited through DNA'], ['s', 'Some variants survive and reproduce more'], ['c', 'Population changes over generations']], [['v', 'i'], ['i', 's'], ['s', 'c']], 'Flow from variation to inheritance to selection to change in a population'),
      n: 'Namaste! Why are there tigers and sparrows, mango trees and mushrooms, and not just one kind of living thing? Life on Earth has been changing for billions of years. This slow change in the inherited features of populations, over many generations, is called evolution. In this lesson we see which features can be passed on, and how new species arise.',
    }),
    sl('concept', 'What evolution is, and what it is not', {
      b: '**Evolution** is the change in the **inherited characteristics of a population** over **many generations**. Individuals grow and change during their lives, but only **populations** evolve.',
      v: table(['Situation', 'Is it evolution?', 'Why'], [['A child grows taller every year', 'No', 'Change in one individual’s lifetime'], ['A cricketer’s arms become strong with practice', 'No', 'Not passed on through DNA'], ['Over 40 years, most mosquitoes in a town survive an insecticide', 'Yes', 'Inherited change in a population over generations']], 'Table of three situations, only one of which, an inherited change in a mosquito population over generations, is evolution'),
      n: 'Be careful with the word evolution. When you grow taller, you are developing, not evolving. Evolution happens to populations, not to individuals, and it needs many generations. If, over forty years, most mosquitoes in a town become able to survive an insecticide, the population has evolved, because the change is inherited.',
    }),
    sl('concept', 'Acquired and inherited traits', {
      b: 'An **acquired trait** develops during an individual’s **lifetime**, through use, training, injury or surroundings. An **inherited trait** comes from the **DNA** received from the parents. Only inherited traits are passed on.',
      v: traitsTable,
      n: 'Think of a weightlifter. Years of training build big muscles. That is an acquired trait: it was earned, not inherited, and the weightlifter’s children will not be born with those muscles. But blood group or natural eye colour come from the DNA you received from your parents. Those inherited traits can pass on to your children.',
    }),
    sl('example', 'Worked example 1: sorting traits', {
      b: 'Sort these traits of a girl named Asha: (1) blood group B, (2) fluency in Tamil and English, (3) a scar on her knee from a fall, (4) naturally curly hair, (5) strong lungs from swimming practice.',
      ul: [
        'Step 1 — Ask: did it come from DNA received at fertilisation, or did it develop during life?',
        'Step 2 — Blood group and naturally curly hair come from DNA: **inherited**.',
        'Step 3 — Languages, the scar and swimming-trained lungs developed during life: **acquired**.',
        'Conclusion — only blood group and curly hair can be passed to Asha’s children through her genes.',
      ],
      v: table(['Trait', 'Acquired or inherited?', 'Can pass to children through genes?'], [['Blood group B', 'Inherited', 'Yes'], ['Speaking Tamil and English', 'Acquired (learnt)', 'No'], ['Scar on knee', 'Acquired (injury)', 'No'], ['Naturally curly hair', 'Inherited', 'Yes'], ['Strong lungs from swimming', 'Acquired (training)', 'No']], 'Worked table sorting five of Asha’s traits into inherited and acquired, and whether each can be passed on'),
      n: 'Use one simple test: did this trait come from the DNA Asha got from her parents, or did it develop because of something that happened during her life? Languages are learnt, scars come from accidents, and swimming builds the lungs. None of these change the DNA in her egg cells. Children may learn Tamil from Asha, but not through genes.',
    }),
    sl('concept', 'Why acquired traits are not inherited', {
      b: 'Offspring develop from **germ cells** (egg and sperm). Changes in **body tissues**, such as muscles or skin, do **not** change the **DNA in germ cells**, so they cannot be passed on.',
      v: flow('LR', [['b', 'Change in body tissue (muscle, skin, tail)'], ['g', 'DNA in germ cells unchanged'], ['o', 'Offspring develop from germ cells'], ['n', 'Offspring do not show the change']], [['b', 'g'], ['g', 'o'], ['o', 'n']], 'Flow: a change in body tissue leaves germ-cell DNA unchanged, so offspring, which develop from germ cells, do not show the change'),
      n: 'In the eighteen eighties, a scientist cut off the tails of mice, generation after generation. Every new litter was still born with full tails. The cutting changed the bodies of the parents, but not the DNA in their sperm and eggs. Only changes in the DNA of germ cells can be inherited. That is the key to the whole of evolution.',
    }),
    sl('check', 'Quick check: can a skill be inherited?', {
      b: 'Decide whether the statement about a trained rat is true or false.',
      n: 'Quick check. Was the skill written into the DNA of the rat’s germ cells, or learnt during its life?',
      chk: 'acquired-tf',
    }),
    sl('diagram', 'Natural selection in action', {
      b: 'Imagine grasshoppers on grassland that has turned **dry and brown**. Some are **green** and some **brown**, because of differences in their DNA. Birds spot the green ones easily. More brown grasshoppers **survive and breed**, so over generations **brown becomes common**.',
      v: V.grass,
      n: 'No grasshopper chose its colour, and none changed colour to hide. The variation was already there. Birds simply ate more of the easy-to-see green ones. The brown survivors laid more eggs, and their young inherited brown colour. Generation after generation, the population shifted. This is natural selection: nature, here the birds, selects which variations survive.',
    }),
    sl('concept', 'Natural selection step by step', {
      b: 'Natural selection explains how populations become **better suited** to their surroundings. It works only on **inherited variations**.',
      v: selectionTable,
      n: 'Here is the logic in five steps. Individuals vary. More young are born than can survive. Those whose variations suit the surroundings survive and breed more. They pass on those variations. Over many generations, the useful variations spread. Notice that nothing in these steps needs an animal to want or try to change.',
    }),
    sl('example', 'Worked example 2: tracking a population', {
      b: 'A population has 100 green and 100 brown grasshoppers on brown grass. Birds eat half of the green ones and one tenth of the brown ones. What percentage of the survivors are brown?',
      ul: [
        r`Step 1 — Green survivors $= 100 - 50 = 50$; brown survivors $= 100 - 10 = 90$.`,
        r`Step 2 — Total survivors $= 50 + 90 = 140$.`,
        r`Step 3 — Brown share $= \dfrac{90}{140} \times 100 \approx 64\%$.`,
        'Conclusion — brown rose from 50% to about 64% in one generation; if survivors breed equally, the next generation starts at about 64% brown.',
      ],
      v: table(['', 'Green', 'Brown', 'Brown share'], [['Before birds', '100', '100', '50%'], ['Eaten', '50', '10', '—'], ['Survivors', '50', '90', 'About 64%']], 'Worked table: of 100 green and 100 brown grasshoppers, 50 green and 90 brown survive, so the brown share rises from 50 to about 64 per cent'),
      n: 'Numbers make selection visible. Before the birds came, the population was half and half. After one season, ninety brown and fifty green survive, so about sixty-four per cent are brown. If those survivors breed equally, the next generation is mostly brown too. Repeat this for a few more seasons, and green becomes rare.',
    }),
    sl('concept', 'Genetic drift: change by chance', {
      b: '**Genetic drift** is a **random change** in how common a variation is, caused by **chance** events such as which individuals happen to survive or breed. It gives **no survival advantage** and is strongest in **small populations**.',
      v: driftTable,
      n: 'Picture a tiny population of twenty beetles on a rock. A boulder rolls down and crushes twelve of them by sheer bad luck. If most of the eight survivors happen to be red, the next generation will be mostly red, not because red is better, but by chance. In a large population, such accidents average out. In a small one, chance can change the population a lot.',
    }),
    sl('concept', 'What is a species?', {
      b: 'A **species** is a group of organisms whose members can **interbreed** and produce **fertile offspring**. **Speciation** is the formation of a new species from an existing one. It needs the flow of genes between parts of a population to **stop**.',
      v: table(['Term', 'Meaning'], [['Species', 'Members can interbreed and have fertile young'], ['Gene flow', 'Mixing of genes when members of different groups interbreed'], ['Speciation', 'Formation of a new species'], ['Reproductive isolation', 'Two groups can no longer interbreed successfully']], 'Table of four terms: species, gene flow, speciation and reproductive isolation, with their meanings'),
      n: 'Dogs of every breed, from tiny to huge, belong to one species, because they can interbreed and have fertile puppies. Horses and donkeys can produce mules, but mules are usually sterile, so horses and donkeys are separate species. As long as genes keep flowing between groups, they stay one species.',
    }),
    sl('diagram', 'How a new species arises', {
      b: 'When a barrier such as a river or mountain **splits** a population, **gene flow stops**. Each part then changes separately through **genetic drift** and **natural selection**. After many generations, they may become so different that they **cannot interbreed**: two species.',
      v: V.speciation,
      n: 'Follow the four stages. One population of, say, snails lives on a plain. A river changes course and splits it. Snails cannot cross water, so the two parts stop mixing genes. On each bank, chance and different surroundings change the populations in different ways. Given enough time, even if the river dries up, they can no longer interbreed.',
    }),
    sl('concept', 'Factors that lead to speciation', {
      b: 'Several factors work together to produce new species.',
      v: speciationTable,
      n: 'Isolation is usually the first step, because it stops genes from mixing. Then drift and selection push the two groups apart. Finally, changes build up in the DNA, sometimes even in the number of chromosomes, so that the germ cells of the two groups can no longer combine to make healthy, fertile young. At that point, speciation is complete.',
    }),
    sl('example', 'Worked example 3: one species or two?', {
      b: 'Two groups of tree frogs live in neighbouring forests. Over thousands of years their mating calls became different, and females now respond only to their own group’s call. When kept together, they never mate. Are they still one species?',
      ul: [
        'Step 1 — The test for a species is whether members can interbreed and produce fertile young.',
        'Step 2 — Here the two groups never mate, even when they meet, so no genes flow between them.',
        'Step 3 — Different calls are a form of **reproductive isolation**.',
        'Conclusion — they now behave as **two separate species**; each will go on changing in its own way.',
      ],
      v: table(['Evidence', 'What it shows'], [['Different mating calls', 'Behaviour has changed in each group'], ['Females respond only to own call', 'No mating between the groups'], ['No mating even when together', 'Reproductive isolation: no gene flow']], 'Worked table linking the frogs’ different calls and lack of mating to reproductive isolation'),
      n: 'Here is a subtle point. A river or mountain is not the only barrier. Once the frogs’ calls differ, a female simply ignores males of the other group. No genes cross over, even though the two groups can meet. A barrier in behaviour works just like a barrier of water. So the frogs now behave as two species.',
    }),
    sl('check', 'Quick check: what stops gene flow?', {
      b: 'Which event is most likely to stop gene flow between two parts of a population of land snails?',
      n: 'Your turn. Think about what physically stops snails from meeting and mating.',
      chk: 'gene-flow-mcq',
    }),
    sl('concept', 'Common misunderstandings', {
      b: 'Evolution is often described wrongly. Here are the scientific ideas.',
      v: table(['Misunderstanding', 'Scientific idea'], [['Animals change because they need to', 'Variations arise by chance; selection keeps the useful ones'], ['Individuals evolve during their lives', 'Populations evolve over generations'], ['Acquired traits are passed on', 'Only changes in germ-cell DNA are inherited'], ['Evolution always means progress', 'Evolution produces diversity, suited to surroundings']], 'Table of four common misunderstandings about evolution with the correct scientific ideas'),
      n: 'Watch out for these traps. Grasshoppers did not turn brown because they needed to hide. Giraffes did not stretch their necks and pass the stretch on. Need and effort do not change DNA. Variations arise by chance, and the surroundings decide which ones last. And evolution is not a ladder towards perfection; bacteria are as evolved as we are.',
    }),
    sl('check', 'Quick check: drift and population size', {
      b: 'Judge the assertion and the reason about genetic drift.',
      n: 'Quick check. Are both statements true? Does the second explain the first?',
      chk: 'drift-ar',
    }),
    sl('summary', 'Summary: traits, selection and speciation', {
      ul: [
        'Evolution: change in the inherited traits of a population over many generations.',
        'Acquired traits develop during life and are not inherited; inherited traits come from DNA.',
        'Only changes in germ-cell DNA pass to offspring.',
        'Natural selection: variants that survive and reproduce better become common.',
        'Genetic drift: chance changes, strongest in small populations.',
        'Speciation: isolation stops gene flow; drift, selection and DNA changes make groups unable to interbreed.',
      ],
      v: table(['Idea', 'Key point'], [['Acquired trait', 'Not in germ-cell DNA, not inherited'], ['Natural selection', 'Useful variations spread'], ['Genetic drift', 'Random change, no advantage'], ['Speciation', 'Gene flow stops, groups diverge']], 'Summary table of acquired traits, natural selection, genetic drift and speciation'),
      n: 'Let us recap. Only inherited traits, written in the DNA of germ cells, can be passed on. Natural selection spreads useful variations, while genetic drift changes small populations by chance. When gene flow stops, the separated groups change in different ways, and given enough time, they become new species that can no longer interbreed.',
    }),
    sl('exam-tips', 'Exam tips: traits and speciation', {
      ul: [
        'When classifying a trait, ask: **does it come from DNA, or did it develop during life?**',
        'Explain why acquired traits are not inherited using **germ cells**: body changes do not alter germ-cell DNA.',
        'In natural selection answers, say the variation **already existed**; avoid "they needed to change".',
        'Define a species by **interbreeding and fertile offspring**.',
        'For speciation, mention **isolation → no gene flow → drift and selection → reproductive isolation**.',
      ],
      v: table(['Weak answer', 'Strong answer'], [['Grasshoppers turned brown to hide', 'Brown variants already existed and survived better'], ['Acquired traits are not inherited because they are new', 'They do not change the DNA of germ cells'], ['A river makes new species', 'A river stops gene flow, so the parts change separately']], 'Table contrasting weak and strong exam answers about evolution'),
      n: 'Examiners look for precise language. Never write that an animal changed because it needed to. Write that a variation already existed and was selected. Link inheritance to the DNA of germ cells. And for speciation, tell the whole chain: isolation stops gene flow, then drift and selection make the groups different, until they can no longer interbreed.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Evolution — Part 2: Tracing relationships, fossils and human evolution',
  goals: [
    'Explain how shared characteristics show evolutionary relationships',
    'Distinguish homologous and analogous organs with examples',
    'Explain what fossils are and how their age is found',
    'Explain how complex organs evolve in stages, and outline the common origin of humans',
  ],
  slides: [
    sl('title', 'Tracing evolution', {
      b: 'Part 2 — how body structures, fossils and DNA reveal family relationships among living things, and where humans fit in.',
      v: flow('LR', [['s', 'Shared characteristics'], ['a', 'Shared ancestors'], ['c', 'Classification'], ['t', 'Family tree of life']], [['s', 'a'], ['a', 'c'], ['c', 't']], 'Flow from shared characteristics to shared ancestors to classification and a family tree of life'),
      n: 'Detectives solve cases with clues. Biologists tracing evolution use three kinds of clues: the structure of living bodies, the remains of ancient life preserved in rocks, and the DNA inside cells. In this lesson we read these clues to build a family tree of life, and to place ourselves on it correctly.',
    }),
    sl('concept', 'Classification follows evolution', {
      b: 'The **more characteristics** two kinds of organism share, the **more recently** they shared a **common ancestor**, and the more closely related they are. So classifying organisms by shared features also traces their **evolution**.',
      v: table(['Organisms compared', 'Shared features', 'Relationship'], [['Human and mouse', 'Backbone, four limbs, hair, milk for young', 'Close (both mammals)'], ['Human and frog', 'Backbone, four limbs', 'More distant'], ['Human and fish', 'Backbone', 'Most distant of the three']], 'Table comparing humans with a mouse, a frog and a fish by shared features, showing that more shared features mean a closer relationship'),
      n: 'Compare yourself with a mouse, a frog and a fish. All four have a backbone. You, the mouse and the frog also have four limbs. But only you and the mouse have hair and feed your young with milk. The more features you share, the more recently your ancestors were the same. That is why classification and evolution tell the same story.',
    }),
    sl('diagram', 'A family tree of vertebrates', {
      b: 'A **family tree** (phylogenetic tree) shows relationships as **branches**. Each branch point stands for a **common ancestor**. Features such as a backbone, four limbs, and hair and milk appear at the branch where they **first arose** and are shared by everything above that branch.',
      v: V.phylogeny,
      n: 'Read the tree from left to right, like time running forward. Every vertebrate shares a backbone, so it sits at the root. After the fish branch splits off, four limbs appear. Hair and milk appear on the mammal branch. Chimpanzees and humans share the most recent branch point of all, so of these animals they are each other’s closest relatives.',
    }),
    sl('diagram', 'Homologous organs', {
      b: '**Homologous organs** have the **same basic structure** and **origin** but may do **different jobs**. The forelimbs of a human, a cat, a whale and a bird all have one upper arm bone, two forearm bones, wrist bones and finger bones, because they were **inherited from a common ancestor**.',
      v: V.forelimbs,
      n: 'Look at the colours. Blue for the upper arm bone, green for the two forearm bones, yellow for the wrist, brown for the fingers. A human uses this plan to grasp, a cat to walk, a whale to swim and a bird to fly. Why would such different jobs use the same set of bones? Because all four inherited the plan from a shared ancestor.',
    }),
    sl('diagram', 'Analogous organs', {
      b: '**Analogous organs** do a **similar job** but have a **different basic structure** and **origin**. The wings of an insect, a bird and a bat all help in flight, but they are built very differently. Flight evolved **separately** in these groups.',
      v: V.wings,
      n: 'An insect’s wing is a thin sheet with veins and no bones at all. A bird’s wing is feathers on arm and hand bones. A bat’s wing is skin stretched between very long fingers. Similar jobs, different designs. Note one subtlety: the bones inside bird and bat wings are homologous as forelimbs, but the wings themselves evolved separately.',
    }),
    sl('example', 'Worked example 1: homologous or analogous?', {
      b: 'Classify each pair: (1) flipper of a dolphin and arm of a human; (2) wing of a butterfly and wing of a sparrow; (3) potato (a stem) and sweet potato (a root), both storing food; (4) thorn of bougainvillea and tendril of a cucumber plant (both modified stems).',
      ul: [
        'Step 1 — Ask: same basic structure and origin? If yes, **homologous**, whatever the job.',
        'Step 2 — If the job is similar but the structure and origin differ, **analogous**.',
        'Step 3 — (1) same forelimb bones: homologous. (2) different structures, both for flight: analogous.',
        'Step 4 — (3) stem and root, both storing food: analogous. (4) both stems, different jobs: homologous.',
      ],
      v: table(['Pair', 'Same origin?', 'Same job?', 'Type'], [['Dolphin flipper, human arm', 'Yes (forelimb)', 'No', 'Homologous'], ['Butterfly wing, sparrow wing', 'No', 'Yes (flight)', 'Analogous'], ['Potato, sweet potato', 'No (stem, root)', 'Yes (storage)', 'Analogous'], ['Bougainvillea thorn, cucumber tendril', 'Yes (stem)', 'No', 'Homologous']], 'Worked table classifying four pairs of organs as homologous or analogous by origin and job'),
      n: 'Always judge by origin, not by job or looks. A dolphin’s flipper looks nothing like your arm, yet it hides the same bones, so it is homologous. A potato and a sweet potato both store food, but one is a swollen stem and the other a swollen root, so they are analogous. The job can mislead you; the origin decides.',
    }),
    sl('check', 'Quick check: spot the homologous pair', {
      b: 'Which pair of organs is homologous?',
      n: 'Quick check. Look for the same basic structure, even if the job is different.',
      chk: 'homologous-pick-mcq',
    }),
    sl('concept', 'Fossils: life’s past in stone', {
      b: '**Fossils** are the **preserved remains or traces** of organisms that lived long ago: bones, teeth, shells, impressions of leaves, footprints, even insects trapped in amber. Most form when remains are **buried in sediment** before they decay, and the sediment slowly turns to rock.',
      v: table(['Kind of fossil', 'Example'], [['Hard parts turned to stone', 'Dinosaur bones, shells of ammonites'], ['Impressions', 'Leaf prints in rock, feather imprints'], ['Traces', 'Footprints, burrows'], ['Whole bodies', 'Insects in amber, mammoths in frozen ground']], 'Table of four kinds of fossil with examples: petrified hard parts, impressions, traces and whole bodies'),
      n: 'When an animal dies, its body usually rots away. But if it is buried quickly, say in mud at the bottom of a lake, the hard parts may be replaced by minerals and turn to stone. Millions of years later, erosion or digging brings them to light. In India, fossil dinosaur eggs have been found in Gujarat and Madhya Pradesh.',
    }),
    sl('diagram', 'Reading the rock layers', {
      b: 'Sedimentary rock forms in **layers**, one on top of another. In **undisturbed** rock, **deeper layers are older**, so fossils found deeper are generally older than those near the surface.',
      v: V.strata,
      n: 'Think of a pile of newspapers that grows every day. The paper at the bottom is the oldest. Rock layers build up in the same way. So a trilobite fossil found deep below an ammonite tells us the trilobite lived earlier. This gives relative age, older or younger, but not yet a number of years.',
    }),
    sl('concept', 'Dating fossils', {
      b: 'There are two main ways of dating fossils.',
      v: datingTable,
      n: 'Depth tells us which fossil is older. For an actual age, scientists use radioactive dating. Some isotopes, such as carbon fourteen, slowly change into other atoms at a steady rate. By comparing the amounts of different isotopes in a fossil, scientists work out roughly how long ago the organism died. Carbon dating works only for remains up to some tens of thousands of years old.',
    }),
    sl('example', 'Worked example 2: dating with half-lives', {
      b: 'Half of the carbon-14 in dead material decays in about **5730 years** (its half-life). A piece of fossil wood has **one-eighth** of the carbon-14 that living wood has. Roughly how old is it?',
      ul: [
        r`Step 1 — After one half-life, $\dfrac{1}{2}$ remains; after two, $\dfrac{1}{4}$; after three, $\dfrac{1}{8}$.`,
        'Step 2 — So three half-lives have passed.',
        r`Step 3 — Age $\approx 3 \times 5730 = 17190$ years.`,
        'Answer — the wood is about **17 000 years** old.',
      ],
      v: table(['Half-lives passed', 'Fraction of carbon-14 left', 'Approximate age (years)'], [['0', '1', '0'], ['1', '1/2', '5730'], ['2', '1/4', '11 460'], ['3', '1/8', '17 190']], 'Worked table: after one, two and three half-lives of 5730 years, a half, a quarter and an eighth of the carbon-14 remain'),
      n: 'Halving is the key idea. Each half-life cuts what is left in half: a half, then a quarter, then an eighth. One-eighth means three halvings, so three times five thousand seven hundred and thirty years, about seventeen thousand years. Real dating is more careful, but this simple halving shows how the method works.',
    }),
    sl('concept', 'Archaeopteryx and the story of feathers', {
      b: 'Fossils of **Archaeopteryx** show **feathers** like a bird, but also **teeth**, **clawed fingers** on the wings and a **long bony tail** like a reptile. Fossils like this link **reptiles (dinosaurs) and birds**. Feathers were also found in some dinosaurs that could not fly; they probably first helped keep the body **warm**, and only later were used for **flight**.',
      v: table(['Feature of Archaeopteryx', 'Like birds', 'Like reptiles'], [['Feathers', 'Yes', '—'], ['Teeth in the jaws', '—', 'Yes'], ['Clawed fingers on the wings', '—', 'Yes'], ['Long bony tail', '—', 'Yes']], 'Table of Archaeopteryx features, showing feathers like birds and teeth, clawed fingers and a long bony tail like reptiles'),
      n: 'Archaeopteryx is a famous in-between fossil. It had feathered wings, yet its jaws had teeth and its wings had claws. Birds, it turns out, are a branch of the dinosaur family. And feathers did not appear for flying. Many dinosaurs had feathers, probably for warmth or display. Much later, feathers were put to a new use: flight.',
    }),
    sl('check', 'Quick check: which fossil is older?', {
      b: 'Fossils are found at two depths in undisturbed rock. Which is older?',
      n: 'Your turn. Remember the pile of newspapers: which ones went down first?',
      chk: 'fossil-age-mcq',
    }),
    sl('concept', 'Complex organs evolve in stages', {
      b: 'A complex organ such as the **eye** did not appear in one step. **Each stage was useful**: a light-sensitive patch, then a cup that shows the direction of light, then a lens that forms images. Eyes have evolved **separately** in many groups, such as octopuses, insects and vertebrates.',
      v: flow('LR', [['p', 'Light-sensitive patch (flatworm eyespots)'], ['c', 'Cup-shaped eye: direction of light'], ['h', 'Narrow opening: rough image'], ['l', 'Lens eye: sharp image']], [['p', 'c'], ['c', 'h'], ['h', 'l']], 'Flow of eye evolution in stages: a light-sensitive patch, a cup-shaped eye, a narrow opening and finally a lens eye'),
      n: 'People sometimes ask: what use is half an eye? Quite a lot! A flatworm called planaria has simple eyespots that only tell light from dark, and that already helps it escape bright, exposed places. A cup shape tells the direction of light. A lens forms images. Every small improvement helped its owners survive, so selection built the eye step by step.',
    }),
    sl('example', 'Worked example 3: wild cabbage to five vegetables', {
      b: 'Cabbage, broccoli, cauliflower, kohlrabi and kale all came from **wild cabbage** through **artificial selection**. Explain how farmers could produce kohlrabi.',
      ul: [
        'Step 1 — Wild cabbage plants vary; some happen to have slightly thicker stems.',
        'Step 2 — Farmers saved seeds only from plants with the thickest stems.',
        'Step 3 — Repeating this for many generations made the stem more and more swollen.',
        'Conclusion — the result is **kohlrabi**. Choosing different parts (leaves, buds, flowers) gave the other vegetables.',
      ],
      v: cabbageFlow,
      n: 'This is selection with humans in charge. Farmers did not create new features; they picked plants that already varied a little and bred from them, generation after generation. Select for big leaves and you get kale. Select for a short stem with tightly packed leaves, and you get cabbage. Select for flower buds, and you get broccoli. It shows how much selection can change a species.',
    }),
    sl('concept', 'DNA as evidence: molecular phylogeny', {
      b: 'Today, scientists compare **DNA** directly. Changes build up in DNA over time, so **closely related** organisms have **more similar DNA**, and distant ones less similar. This **molecular phylogeny** confirms the family trees built from body structures and fossils.',
      v: table(['Compared with human DNA', 'Similarity', 'Relationship'], [['Chimpanzee', 'Very high (close to 99%)', 'Closest living relative'], ['Mouse', 'Lower', 'Fellow mammal, more distant'], ['Banana plant', 'Much lower', 'Very distant, yet some genes are still shared']], 'Table showing that human DNA is most similar to chimpanzee DNA, less to mouse DNA and much less to banana DNA'),
      n: 'DNA is like a family record written inside every cell. Two species that split recently have had little time to build up differences, so their DNA is very similar. Human and chimpanzee DNA are close to ninety-nine per cent alike. Even a banana plant shares some genes with us, because all life on Earth shares very ancient ancestors.',
    }),
    sl('diagram', 'Humans and chimpanzees: cousins, not ancestors', {
      b: '**Humans did not evolve from chimpanzees.** Humans and chimpanzees evolved from a **common ancestor** that lived **several million years ago**. Since then, each line has evolved separately; today’s chimpanzees are our **cousins**, not our ancestors.',
      v: V.apes,
      n: 'This is the most common mistake about human evolution. Chimpanzees living today are not our grandparents; they are our cousins. Millions of years ago, one ancestral population split. One branch led to chimpanzees, the other to humans. Both have kept evolving ever since. In the same way, you and your cousin share grandparents, but neither of you descends from the other.',
    }),
    sl('concept', 'The origin of modern humans', {
      b: 'Fossil and DNA evidence shows that modern humans, **Homo sapiens**, arose in **Africa** a few hundred thousand years ago. Groups later **spread out of Africa** and across the world. All humans living today belong to **one species**: differences in skin colour, height or hair are **small variations**, not separate kinds of people.',
      v: flow('LR', [['a', 'Homo sapiens arises in Africa'], ['o', 'Some groups leave Africa (tens of thousands of years ago)'], ['s', 'Spread to Asia, Europe, Australia and the Americas'], ['u', 'One species everywhere today']], [['a', 'o'], ['o', 's'], ['s', 'u']], 'Flow of human origins: Homo sapiens arises in Africa, groups leave Africa, spread across the continents, and remain one species'),
      n: 'Every person on Earth, from Kashmir to Kanyakumari and from Peru to Japan, belongs to one species, Homo sapiens. Our species arose in Africa. Over tens of thousands of years, groups spread across Asia, Europe and Australia, and later the Americas. As they settled in different climates, small variations appeared, but we can all interbreed. We are one human family.',
    }),
    sl('check', 'Quick check: humans and chimpanzees', {
      b: 'Judge the assertion and the reason about humans and chimpanzees.',
      n: 'Quick check. Is the assertion true? Is the reason true?',
      chk: 'chimp-ar',
    }),
    sl('summary', 'Summary: tracing evolution', {
      ul: [
        'More shared characteristics mean a more recent common ancestor.',
        'Homologous organs: same origin, different jobs (common ancestry).',
        'Analogous organs: different origin, similar job (separate evolution).',
        'Fossils: deeper is older; radioactive dating gives age in years.',
        'Complex organs evolve in useful stages; artificial selection shows the power of selection.',
        'Humans and chimpanzees share an ancestor; all humans are one species that arose in Africa.',
      ],
      v: table(['Evidence', 'What it shows'], [['Homologous organs', 'Common ancestry'], ['Fossils', 'Organisms of the past and their age'], ['DNA comparison', 'How closely species are related'], ['Artificial selection', 'Selection can greatly change a species']], 'Summary table of four kinds of evidence for evolution and what each shows'),
      n: 'Let us recap. Shared features, homologous organs, fossils and DNA all point to one conclusion: living things are related through common ancestors. Analogous organs show that similar problems, like flying, can be solved separately. Complex organs evolve in useful stages. And humans are one species, cousins of chimpanzees, with roots in Africa.',
    }),
    sl('exam-tips', 'Exam tips: evidence for evolution', {
      ul: [
        'Classify organs by **origin and structure**, not by function.',
        'Give one example of each: homologous (forelimbs), analogous (insect and bird wings).',
        'For fossil age, mention **both** depth and radioactive (isotope) dating.',
        'Write "humans and chimpanzees **share a common ancestor**", never "humans evolved from chimpanzees".',
        'Evolution is **not progress** towards perfection; it produces organisms suited to their surroundings.',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Bird and bat wings are homologous because both fly', 'As wings they are analogous; similar job alone never shows homology'], ['Fossils near the surface are older', 'Deeper fossils are older in undisturbed rock'], ['Humans evolved from chimpanzees', 'Both evolved from a shared ancestor'], ['Some human groups are a separate species', 'All humans are one species']], 'Table of common mistakes about evidence for evolution with the correct ideas'),
      n: 'Here is how to make your answers strong. When asked about organs, look past the job to the origin. When asked about fossils, give both the depth idea and isotope dating. And use exact words about human evolution: shared ancestor, one species, origin in Africa. These phrases show real understanding.',
    }),
  ],
});
