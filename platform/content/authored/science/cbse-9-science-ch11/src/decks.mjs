// ch11 Diversity: two decks. Part 1 (t01, plants of t02): classification, five kingdoms, plant divisions.
// Part 2 (animals of t02, t03, t04): animal groups, binomial nomenclature, viruses, ecological roles.
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { KINGDOMS, PLANT_DIVISIONS, ANIMAL_TREE, VIRUS, FOOD_WEB } from './svgs.mjs';

export const V = {
  kingdoms: svgV(KINGDOMS, 'Five cards for Monera, Protista, Fungi, Plantae and Animalia, each listing cell type, body organisation, food and examples, with Monera marked as prokaryotes and the rest as eukaryotes', 'The five kingdoms: schematic.'),
  plants: svgV(PLANT_DIVISIONS, 'Flow chart splitting the plant kingdom into cryptogams and phanerogams, then into thallophytes, bryophytes, pteridophytes, gymnosperms and angiosperms, with angiosperms split into monocots and dicots', 'The plant divisions: schematic.'),
  animals: svgV(ANIMAL_TREE, 'Tree splitting the animal kingdom into invertebrate phyla from Porifera to Echinodermata and the phylum Chordata with its five vertebrate classes', 'The animal groups: schematic.'),
  virus: svgV(VIRUS, 'A virus drawn as a hexagonal protein coat with spikes and a coil of genetic material inside, next to a to-scale comparison of a 100 nanometre virus and a 2000 nanometre bacterium', 'A virus and its size: the left drawing is schematic, the right is to scale.'),
  web: svgV(FOOD_WEB, 'A food web with grass and a mango tree as producers, grasshopper, goat and parrot as herbivores, frog, leopard, snake and eagle as carnivores, and a decomposer bar of bacteria and fungi along the bottom', 'A food web with producers, consumers and decomposers: schematic.'),
  ranks: table(
    ['Rank', 'Tiger', 'Mango tree'],
    [
      ['Kingdom', 'Animalia', 'Plantae'],
      ['Phylum or division', 'Chordata', 'Angiosperms'],
      ['Class', 'Mammalia', 'Dicots'],
      ['Order', 'Carnivora', 'Sapindales'],
      ['Family', 'Felidae', 'Anacardiaceae'],
      ['Genus', 'Panthera', 'Mangifera'],
      ['Species', 'tigris', 'indica'],
    ],
    'Table of the seven ranks of classification for the tiger and the mango tree',
  ),
  cats: table(
    ['Animal', 'Genus', 'Family', 'Order'],
    [
      ['Tiger', 'Panthera', 'Felidae', 'Carnivora'],
      ['Lion', 'Panthera', 'Felidae', 'Carnivora'],
      ['Domestic cat', 'Felis', 'Felidae', 'Carnivora'],
      ['Wolf', 'Canis', 'Canidae', 'Carnivora'],
    ],
    'Table of tiger, lion, domestic cat and wolf with their genus, family and order',
  ),
  basis: table(
    ['Question asked', 'Monera', 'Protista', 'Fungi', 'Plantae', 'Animalia'],
    [
      ['Cell with a nucleus?', 'No', 'Yes', 'Yes', 'Yes', 'Yes'],
      ['Number of cells', 'One', 'One', 'Mostly many', 'Many', 'Many'],
      ['Cell wall', 'Yes', 'Some', 'Chitin', 'Cellulose', 'None'],
      ['Makes own food?', 'Some', 'Some', 'No', 'Yes', 'No'],
    ],
    'Table comparing the five kingdoms on nucleus, number of cells, cell wall and food making',
  ),
  moneraProtista: table(
    ['Feature', 'Monera', 'Protista'],
    [
      ['Cell type', 'Prokaryotic: no nucleus, no organelles with membranes', 'Eukaryotic: true nucleus and organelles'],
      ['Body', 'Single cell', 'Single cell'],
      ['Nutrition', 'Some make food (cyanobacteria); others absorb it', 'Some make food (Euglena); others ingest it (Amoeba)'],
      ['Examples', 'Bacteria, cyanobacteria', 'Amoeba, Paramecium, Euglena'],
    ],
    'Table comparing kingdom Monera and kingdom Protista',
  ),
  threeKingdoms: table(
    ['Feature', 'Fungi', 'Plantae', 'Animalia'],
    [
      ['Cell wall', 'Chitin', 'Cellulose', 'None'],
      ['Body', 'Mostly threads (yeast: one cell)', 'Many cells; root, stem, leaf in most', 'Many cells; tissues and organs'],
      ['Nutrition', 'Absorb ready-made food from dead or living matter', 'Photosynthesis', 'Eat other organisms'],
      ['Examples', 'Mushroom, bread mould, yeast', 'Moss, fern, pine, mango', 'Hydra, fish, bird, human'],
    ],
    'Table comparing the kingdoms Fungi, Plantae and Animalia',
  ),
  kingdomClues: table(
    ['Organism', 'Nucleus', 'Cells', 'Cell wall', 'Food'],
    [
      ['P', 'Yes', 'One', 'None', 'Makes own food and also ingests food'],
      ['Q', 'No', 'One', 'Yes', 'Makes own food using pigment'],
      ['R', 'Yes', 'Many', 'Chitin', 'Absorbs ready-made food'],
    ],
    'Table of three unknown organisms with their nucleus, cell number, cell wall and food',
  ),
  lowerPlants: table(
    ['Feature', 'Thallophyta', 'Bryophyta'],
    [
      ['Body', 'Thallus: no root, stem or leaf', 'Stem-like and leaf-like parts; no true roots'],
      ['Vascular tissue', 'Absent', 'Absent'],
      ['Place', 'Mostly water', 'Damp land'],
      ['Examples', 'Spirogyra, Ulothrix, Chara', 'Funaria (moss), Marchantia (liverwort)'],
    ],
    'Table comparing Thallophyta and Bryophyta',
  ),
  upperPlants: table(
    ['Feature', 'Pteridophyta', 'Gymnosperms'],
    [
      ['Body', 'True root, stem, leaves', 'True root, stem, leaves; often tall trees'],
      ['Vascular tissue', 'Present', 'Present'],
      ['Seeds', 'None; spores', 'Naked seeds in cones'],
      ['Examples', 'Fern, Marsilea, Equisetum', 'Cycas, pine, deodar'],
    ],
    'Table comparing Pteridophyta and gymnosperms',
  ),
  monoDi: table(
    ['Feature', 'Monocot', 'Dicot'],
    [
      ['Seed leaves (cotyledons)', 'One', 'Two'],
      ['Leaf veins', 'Parallel', 'Net-like'],
      ['Roots', 'Fibrous', 'Tap root'],
      ['Flower parts', 'In threes', 'In fours or fives'],
      ['Examples', 'Wheat, maize, rice, banana', 'Gram, pea, mustard, neem'],
    ],
    'Table comparing monocots and dicots',
  ),
  nonChordata: table(
    ['Phylum', 'Key feature', 'Example'],
    [
      ['Porifera', 'Pores over the body; no true tissues; fixed', 'Sponge'],
      ['Cnidaria', 'Two cell layers; stinging cells; mouth with tentacles', 'Hydra, jellyfish'],
      ['Platyhelminthes', 'Flat body; no body cavity', 'Tapeworm, liver fluke'],
      ['Nematoda', 'Round, unsegmented body', 'Ascaris (roundworm)'],
      ['Annelida', 'Body in rings (segments)', 'Earthworm, leech'],
      ['Arthropoda', 'Jointed legs; hard outer covering', 'Cockroach, prawn, scorpion'],
      ['Mollusca', 'Soft body, muscular foot, usually a shell', 'Snail, octopus'],
      ['Echinodermata', 'Spiny skin; radial body', 'Starfish, sea urchin'],
    ],
    'Table of eight invertebrate phyla with a key feature and example for each',
  ),
  vertebrates: table(
    ['Class', 'Skin or cover', 'Breathing', 'Heart chambers', 'Example'],
    [
      ['Pisces', 'Scales', 'Gills', 'Two', 'Rohu, shark'],
      ['Amphibia', 'Moist, no scales', 'Gills, then lungs and skin', 'Three', 'Frog, toad'],
      ['Reptilia', 'Dry scales', 'Lungs', 'Three (four in crocodiles)', 'Lizard, snake'],
      ['Aves', 'Feathers', 'Lungs', 'Four', 'Crow, peacock'],
      ['Mammalia', 'Hair', 'Lungs', 'Four', 'Cow, bat, human'],
    ],
    'Table of five vertebrate classes with skin, breathing, heart chambers and examples',
  ),
  animalClues: table(
    ['Animal', 'Clue 1', 'Clue 2', 'Clue 3'],
    [
      ['X', 'Body in rings', 'Moist skin', 'Lives in soil'],
      ['Y', 'Has a backbone', 'Feathers', 'Lays hard-shelled eggs'],
      ['Z', 'Has a backbone', 'Gills and fins', 'Two-chambered heart'],
    ],
    'Table of three unknown animals with three clues each',
  ),
  rules: table(
    ['Rule', 'Wrong', 'Right'],
    [
      ['Two words: genus then species', 'Indica', 'Mangifera indica'],
      ['Genus begins with a capital letter', 'mangifera indica', 'Mangifera indica'],
      ['Species begins with a small letter', 'Mangifera Indica', 'Mangifera indica'],
      ['Italics in print; underline each word when handwritten', 'Mangifera indica in ordinary type', 'Mangifera indica in italics, or Mangifera indica with each word underlined'],
    ],
    'Table of rules for writing scientific names, with a wrong and a right example for each',
  ),
  names: table(
    ['Common name', 'Scientific name', 'Genus'],
    [
      ['Neem', 'Azadirachta indica', 'Azadirachta'],
      ['Mango', 'Mangifera indica', 'Mangifera'],
      ['Tiger', 'Panthera tigris', 'Panthera'],
      ['Lion', 'Panthera leo', 'Panthera'],
      ['Human', 'Homo sapiens', 'Homo'],
    ],
    'Table of five common names with their scientific names and genus',
  ),
  fixNames: table(
    ['Written', 'Problem', 'Corrected'],
    [
      ['panthera Leo', 'Genus needs a capital; species needs a small letter', 'Panthera leo'],
      ['Homo Sapiens', 'Species name must start with a small letter', 'Homo sapiens'],
      ['Azadirachta', 'Only the genus is given; a species name is missing', 'Azadirachta indica'],
    ],
    'Table of three wrongly written scientific names, the problem in each and the corrected name',
  ),
  virusLife: table(
    ['Feature', 'Bacterium', 'Virus'],
    [
      ['Cell structure', 'Cell with cytoplasm and a membrane', 'None: acellular'],
      ['Genetic material', 'DNA', 'DNA or RNA, never both'],
      ['Makes its own proteins', 'Yes, with ribosomes', 'No: uses the host cell'],
      ['Multiplies', 'On its own', 'Only inside a host cell'],
      ['Outside a host', 'Can grow in suitable food', 'Inactive, like a particle'],
    ],
    'Table comparing a bacterium and a virus',
  ),
  virusSteps: flow(
    'LR',
    [['a', 'Virus attaches to a host cell'], ['b', 'Its genetic material enters the cell'], ['c', 'The cell is made to copy the virus'], ['d', 'New viruses burst out']],
    [['a', 'b'], ['b', 'c'], ['c', 'd']],
    'Flow from a virus attaching to a host cell, to its genetic material entering, the cell copying the virus, and new viruses bursting out',
  ),
  roles: table(
    ['Role', 'How food is obtained', 'Examples'],
    [
      ['Producers', 'Make food by photosynthesis', 'Grass, mango tree, algae, cyanobacteria'],
      ['Consumers', 'Eat other organisms', 'Grasshopper, goat, frog, eagle'],
      ['Decomposers', 'Break down dead remains and wastes and absorb the products', 'Bacteria, fungi such as mushrooms and moulds'],
    ],
    'Table of producers, consumers and decomposers with how they get food and examples',
  ),
  microbes: table(
    ['Organism', 'Useful role', 'Harmful role'],
    [
      ['Bacteria', 'Decompose dead matter; Lactobacillus turns milk into curd; Rhizobium helps pulses', 'Cause diseases such as typhoid and cholera'],
      ['Fungi', 'Decompose litter; yeast makes dough rise', 'Moulds spoil bread; some cause skin infections'],
    ],
    'Table of useful and harmful roles of bacteria and fungi',
  ),
  podRoles: table(
    ['Organism in a pond', 'Role'],
    [
      ['Tiny floating algae', 'Producer'],
      ['Tadpole eating the algae', 'Consumer (herbivore)'],
      ['Fish eating the tadpole', 'Consumer (carnivore)'],
      ['Bacteria in the mud', 'Decomposer'],
    ],
    'Table of four pond organisms and their ecological roles',
  ),
  scaleTable: table(
    ['Particle', 'Size'],
    [
      ['Bacterium', 'About 2000 nm'],
      ['Virus', 'About 100 nm'],
    ],
    'Table of the sizes of a bacterium and a virus',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Diversity, Part 1: classification, five kingdoms and plants',
  goals: [
    'Explain why organisms are classified and name the ranks of the hierarchy',
    'Classify organisms into the five kingdoms using cell type, body organisation and nutrition',
    'Identify the major divisions of plants, including monocots and dicots, with examples',
  ],
  slides: [
    sl('title', 'Diversity: sorting the living world', {
      b: 'Part 1: why we classify, the five kingdoms, and the plant divisions.',
      v: flow('LR', [['a', 'Kingdom'], ['b', 'Phylum'], ['c', 'Class'], ['d', 'Order'], ['e', 'Family'], ['f', 'Genus'], ['g', 'Species']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f'], ['f', 'g']], 'Flow from kingdom through phylum, class, order, family and genus to species'),
      n: 'Millions of kinds of living things share our planet. To study them, scientists sort them into groups, the way a shopkeeper arranges a store. In this part we learn why we classify, how the groups are arranged from big to small, the five kingdoms of life, and the main groups of plants.',
    }),
    sl('concept', 'Why do we classify?', {
      b: 'Classification means **sorting organisms into groups** by their similarities and differences. It makes the study of millions of species easier, shows how organisms are related, and lets us predict features of a new organism once we know its group.',
      v: table(['Everyday sorting', 'Sorting organisms'], [['Shelves of a grocery store: grains, pulses, spices', 'Kingdoms and phyla'], ['A shelf for rice, another for wheat', 'Genera and species'], ['Finding a packet without searching every shelf', 'Naming and finding an organism quickly']], 'Table comparing sorting in a grocery store with classifying organisms'),
      n: 'Think of a grocery store. Grains, pulses and spices each have their own shelf, so you find a packet quickly. Classifying organisms works the same way. It makes the study of millions of kinds of organisms easier, it shows how they are related, and when we meet a new organism we can guess many of its features from its group.',
    }),
    sl('concept', 'The hierarchy of ranks', {
      b: 'Groups are nested, from the biggest to the smallest: **kingdom, phylum (division in plants), class, order, family, genus, species**. A species is a group of organisms that can breed together and produce fertile offspring. Each step down has fewer organisms and more shared features.',
      v: V.ranks,
      n: 'The groups are nested like boxes inside boxes. The largest is the kingdom, then phylum, class, order, family, genus and finally species. Look at the tiger. It is in kingdom Animalia, phylum Chordata and class Mammalia, and it goes on down to its own species. Going down the list, there are fewer organisms in each group, and they share more features.',
    }),
    sl('example', 'Worked example: who is the closest relative?', {
      b: `**Problem.** The table lists four animals. Which two are the closest relatives, and which is the most distant from the tiger?

**Step 1.** Find the lowest rank that the animals share. The lower the shared rank, the closer the relationship.

**Step 2.** Tiger and lion share the genus *Panthera*, so they are closest. The cat shares only the family Felidae with them.

**Step 3.** The wolf shares only the order Carnivora with the tiger, so it is the most distant.`,
      v: V.cats,
      n: 'Let us find the closest relatives. Look for the lowest rank that animals share. The tiger and the lion share the same genus, Panthera, so they are closest. The domestic cat shares only the family with them. The wolf belongs to a different family and shares only the order with the tiger, so it is the most distant relative of the four.',
    }),
    sl('check', 'Quick check: ranks', {
      b: 'Reason with the hierarchy.',
      n: 'Quick check. Remember that animals in the same group share all the ranks above that group.',
      chk: 'chk-hier',
    }),
    sl('concept', 'Five kingdoms of Whittaker', {
      b: 'In 1969 R. H. Whittaker grouped all living things into **five kingdoms**, using three questions: is the **cell prokaryotic or eukaryotic**, is the body **one cell or many cells**, and how does it get **food**?',
      v: V.kingdoms,
      n: 'In nineteen sixty nine, R H Whittaker placed all living things into five kingdoms. He asked three questions. Is the cell prokaryotic or eukaryotic? Is the body a single cell or made of many cells? And how does the organism get its food? The answers sort life into Monera, Protista, Fungi, Plantae and Animalia.',
    }),
    sl('concept', 'The three questions side by side', {
      b: 'Only Monera are **prokaryotic**. Plants make food; animals and fungi cannot. Cell walls differ too: **cellulose** in plants, **chitin** in fungi, none in animals.',
      v: V.basis,
      n: 'This table shows the answers side by side. Only Monera have cells without a nucleus. Monera and Protista are single celled, while plants and animals are many celled. Plants have cellulose cell walls and make their own food. Fungi have walls of chitin and absorb ready made food. Animals have no cell wall and eat other organisms.',
    }),
    sl('concept', 'Monera and Protista', {
      b: 'Both are mostly **single-celled**. Monera cells have **no nucleus**. Protista cells have a **true nucleus** and organelles. *Euglena* has chloroplasts but also takes in food, so it shows both kinds of nutrition.',
      v: V.moneraProtista,
      n: 'Monera and Protista are mostly single celled. Monera, such as bacteria and cyanobacteria, have no nucleus. Protista, such as Amoeba, Paramecium and Euglena, have a true nucleus and membrane bound organelles. Some members of both kingdoms make their own food and others take it in. Euglena is interesting, because it has chloroplasts but can also take in food.',
    }),
    sl('concept', 'Fungi, Plantae and Animalia', {
      b: 'Fungi are not plants: they have **no chlorophyll** and absorb food from dead matter or living hosts. Their cell wall is made of **chitin**.',
      v: V.threeKingdoms,
      n: 'Now the three many celled kingdoms. Fungi, such as mushrooms and bread mould, have walls of chitin, no chlorophyll, and absorb ready made food. Plants have cellulose walls and make food by photosynthesis. Animals have no cell wall and eat other organisms. A mushroom grows from the soil, but it is not a plant, because it cannot make its own food.',
    }),
    sl('example', 'Worked example: which kingdom?', {
      b: `**Problem.** Place organisms P, Q and R in kingdoms.

**Step 1.** Ask the nucleus question first. Only Q has no nucleus, so Q is in **Monera** (a cyanobacterium).

**Step 2.** P has a nucleus and is a single cell, so it is a **Protista** (like *Euglena*).

**Step 3.** R is many-celled with a chitin wall and absorbs food, so it is in **Fungi**.`,
      v: V.kingdomClues,
      n: 'Let us place three organisms. First ask whether there is a nucleus. Organism Q has none, so it is in Monera. Organism P has a nucleus and is a single cell, and it can both make and take in food, so it is a protist like Euglena. Organism R is many celled with a chitin wall and absorbs ready made food, so it belongs to Fungi.',
    }),
    sl('check', 'Quick check: kingdoms', {
      b: 'Place an organism in a kingdom.',
      n: 'Quick check. Use the three questions in order, starting with the nucleus.',
      chk: 'chk-kingdom',
    }),
    sl('concept', 'Classifying plants: divisions', {
      b: 'Kingdom Plantae is divided by body structure and by whether seeds are made. **Cryptogams** have no seeds: Thallophyta, Bryophyta, Pteridophyta. **Phanerogams** make seeds: gymnosperms and angiosperms.',
      v: V.plants,
      n: 'Plants are divided by their body structure and by whether they make seeds. The cryptogams do not make seeds, and they are the thallophytes, bryophytes and pteridophytes. The phanerogams make seeds, and they are the gymnosperms and the angiosperms. Angiosperms are divided again into monocots and dicots. The chart reads from simple bodies on the left to the most complex on the right.',
    }),
    sl('concept', 'Thallophyta and Bryophyta', {
      b: 'Thallophytes are the **algae**, with a body called a **thallus**. Bryophytes are the **amphibians of the plant kingdom**: they live on land but need water to reproduce, and have no vascular tissue.',
      v: V.lowerPlants,
      n: 'Thallophytes are the algae, such as Spirogyra. Their body, called a thallus, has no root, stem or leaf. Bryophytes, such as moss and liverwort, live on damp land. They are called the amphibians of the plant kingdom, because they need water to reproduce. They have no vascular tissue, so they stay small and close to the ground.',
    }),
    sl('concept', 'Pteridophyta and gymnosperms', {
      b: 'Both have **vascular tissue** (xylem and phloem) and true roots, stems and leaves. Pteridophytes reproduce by **spores**. Gymnosperms make **naked seeds**, often in cones, and have no fruit.',
      v: V.upperPlants,
      n: 'Pteridophytes, such as ferns, have a true root, stem and leaves with vascular tissue, but they reproduce by spores and make no seeds. Gymnosperms, such as pine and deodar, also have vascular tissue, but they make seeds. Their seeds are naked, which means they are not enclosed in a fruit. They are carried in cones.',
    }),
    sl('concept', 'Angiosperms: monocots and dicots', {
      b: 'Angiosperms are **flowering plants** whose seeds are **enclosed in fruits**. They are the largest group. A seed has one or two **cotyledons** (seed leaves), which divides angiosperms into monocots and dicots.',
      v: V.monoDi,
      n: 'Angiosperms are the flowering plants, and their seeds are enclosed in fruits. They are the largest group of plants. Their seeds have one or two cotyledons, which are the seed leaves. Monocots, such as wheat and maize, have one cotyledon, parallel veins in the leaf, and fibrous roots. Dicots, such as gram and neem, have two cotyledons, net like veins and a tap root.',
    }),
    sl('check', 'Quick check: plants', {
      b: 'Place a plant in its division.',
      n: 'Quick check. Ask whether the plant has vascular tissue, whether it makes seeds, and whether the seeds are in a fruit.',
      chk: 'chk-plant',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Classification sorts organisms into nested groups: kingdom, phylum, class, order, family, genus, species.',
        'Whittaker used cell type, body organisation and nutrition to make five kingdoms.',
        'Monera are the only prokaryotes. Fungi have chitin walls and absorb food. Plants make food.',
        'Plants: thallophytes, bryophytes, pteridophytes (no seeds); gymnosperms (naked seeds); angiosperms (seeds in fruits).',
        'Angiosperms are monocots (one cotyledon, parallel veins) or dicots (two cotyledons, net veins).',
      ],
      v: table(['Group', 'One-line test'], [['Monera', 'No nucleus'], ['Fungi', 'Chitin wall, absorbs food'], ['Bryophyta', 'Needs water, no vascular tissue'], ['Gymnosperms', 'Naked seeds'], ['Dicots', 'Two seed leaves']], 'Summary table of one-line tests for five groups'),
      n: 'Let us recall. Classification sorts organisms into nested groups from kingdom down to species. Whittaker used cell type, body organisation and nutrition to make five kingdoms. Only Monera are prokaryotes. Plants are divided into thallophytes, bryophytes, pteridophytes, gymnosperms and angiosperms, and angiosperms are monocots or dicots.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the ranks in order, from kingdom to species, and give an example with each rank.',
        'For kingdoms, give the three criteria: cell type, body organisation, nutrition.',
        'Do not say fungi are plants, and do not say that all bacteria are harmful.',
        'For monocot and dicot, give at least three differences: cotyledons, veins, roots.',
        'Give one example for every plant division: Spirogyra, moss, fern, pine, mango.',
      ],
      v: table(['Common slip', 'Correct idea'], [['Fungi make food', 'Fungi absorb ready-made food'], ['Bryophytes have xylem', 'Bryophytes have no vascular tissue'], ['Gymnosperms bear fruits', 'Gymnosperm seeds are naked']], 'Table of common slips and the correct ideas'),
      n: 'Some exam tips. Write the ranks in order and give an example for each. For the kingdoms, name the three criteria. Do not call fungi plants. For monocots and dicots, give at least three differences. And give one example for each plant division. Watch for common slips, such as saying fungi make food, or that bryophytes have xylem.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Diversity, Part 2: animals, naming, viruses and ecological roles',
  goals: [
    'Identify the major animal phyla and vertebrate classes with examples',
    'Write scientific names by the rules of binomial nomenclature',
    'Explain why viruses are not placed in any kingdom',
    'Describe the roles of producers, consumers and decomposers, including fungi and bacteria',
  ],
  slides: [
    sl('title', 'Animals, names, viruses and roles', {
      b: 'Part 2: animal groups, scientific names, viruses, and who does what in nature.',
      v: flow('LR', [['a', 'Animal groups'], ['b', 'Scientific names'], ['c', 'Viruses'], ['d', 'Ecological roles']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from animal groups to scientific names, viruses and ecological roles'),
      n: 'In this part we meet the main groups of animals, from sponges to mammals. Then we learn the rules for writing a scientific name, such as the name of a tiger or a mango. After that we look at viruses and ask why they have no kingdom, and we finish with the jobs that living things do in nature.',
    }),
    sl('concept', 'Animal kingdom: a tree of groups', {
      b: 'Animals are many-celled, have **no cell wall**, and eat other organisms. They are divided into phyla. Animals **without a backbone** are invertebrates. **Chordata** have a notochord, and most are vertebrates.',
      v: V.animals,
      n: 'All animals are many celled, have no cell wall, and eat other organisms. They are divided into phyla. Eight phyla have no backbone, from the sponges to the starfish. The phylum Chordata has a notochord, and its main members, the vertebrates, have a backbone and fall into five classes. The classes are fish, amphibians, reptiles, birds and mammals.',
    }),
    sl('concept', 'Animals without a backbone', {
      b: 'Match each phylum with its key feature and an example. **Arthropoda** is the largest phylum: insects, spiders, prawns and scorpions all have jointed legs.',
      v: V.nonChordata,
      n: 'Here are the eight phyla without a backbone. Sponges have pores over the body. Hydra and jellyfish have stinging cells. Tapeworms are flat and roundworms are round. Earthworms have bodies in rings. Arthropods have jointed legs, and form the largest phylum. Snails have a soft body and a shell, and starfish have spiny skin.',
    }),
    sl('concept', 'Chordata and the five vertebrate classes', {
      b: 'Chordates have a **notochord**, a hollow nerve cord on the back, and gill slits at some stage. **Vertebrates** have a backbone. Fish and amphibians depend on water for eggs; reptiles, birds and mammals have adaptations for land.',
      v: V.vertebrates,
      n: 'Chordates have a notochord, a nerve cord along the back, and gill slits at some stage of life. In vertebrates the notochord is replaced by a backbone. Fish breathe with gills and have scales. Frogs have moist skin and start life in water. Reptiles have dry scales, birds have feathers, and mammals have hair and feed their young with milk.',
    }),
    sl('example', 'Worked example: which group?', {
      b: `**Problem.** Name the group of each animal in the table.

**X.** Body in rings and lives in soil: phylum **Annelida** (an earthworm).

**Y.** Backbone, feathers and hard-shelled eggs: class **Aves** (a bird).

**Z.** Backbone, gills and fins and a two-chambered heart: class **Pisces** (a fish).

Start with the backbone question: if there is none, it is an invertebrate phylum.`,
      v: V.animalClues,
      n: 'Let us name three groups. Animal X has a body in rings and lives in soil, so it is an annelid, like an earthworm. Animal Y has a backbone, feathers and lays hard shelled eggs, so it is a bird. Animal Z has a backbone, gills, fins and a two chambered heart, so it is a fish. Always ask first whether there is a backbone.',
    }),
    sl('check', 'Quick check: animal groups', {
      b: 'Place an animal in a phylum.',
      n: 'Quick check. Look for the single clue that fits one group only, such as jointed legs or a muscular foot.',
      chk: 'chk-animal',
    }),
    sl('concept', 'Binomial nomenclature', {
      b: 'Carolus **Linnaeus** gave every organism a two-part name: **genus** then **species**. The name is in Latin form and is the same all over the world, so a tamarind is *Tamarindus indica* whether you call it imli, chinch or puli.',
      v: V.names,
      n: 'Common names change from place to place. The tamarind is imli in Hindi, chinch in Marathi and puli in Tamil. So Carolus Linnaeus gave every organism a two part scientific name, made of the genus and the species, in Latin form. This system is called binomial nomenclature. The name is the same all over the world, which avoids confusion.',
    }),
    sl('concept', 'Rules for writing a scientific name', {
      b: 'The **genus** starts with a **capital letter**; the **species** starts with a **small letter**. In print the whole name is in *italics*; when handwritten, **underline each word separately**.',
      v: V.rules,
      n: 'Follow these rules. A scientific name has two words, the genus first and the species second. The genus starts with a capital letter, and the species starts with a small letter. In print, the name is set in italics. When you write it by hand, underline the genus and the species separately. In plain text, like narration, we simply say the two words.',
    }),
    sl('example', 'Worked example: correct the names', {
      b: `**Problem.** Correct each written name.

**1.** *panthera Leo*: the genus needs a capital and the species a small letter, so *Panthera leo* (lion).

**2.** *Homo Sapiens*: the species must be small, so *Homo sapiens* (human).

**3.** *Azadirachta*: only the genus is given, so add the species: *Azadirachta indica* (neem).`,
      v: V.fixNames,
      n: 'Let us correct three names. The first has the capital letters in the wrong places, so it becomes Panthera leo, the lion. In the second, the species word should start with a small letter, so it becomes Homo sapiens. The third gives only the genus, so we add the species word to get Azadirachta indica, the neem tree. A full name always needs both words.',
    }),
    sl('check', 'Quick check: writing names', {
      b: 'Choose the correct way to write a name.',
      n: 'Quick check. Recall which word begins with a capital letter and which with a small letter.',
      chk: 'chk-binomial',
    }),
    sl('concept', 'Viruses: acellular entities', {
      b: 'A virus is a particle of **genetic material** (DNA or RNA) inside a **protein coat**. It has **no cytoplasm, no organelles and no cell membrane**, so it is **acellular**. Most are about 20 to 300 nm long, far smaller than bacteria.',
      v: V.virus,
      n: 'A virus is a tiny particle. It has genetic material, either DNA or RNA, packed inside a protein coat called the capsid. A virus has no cytoplasm, no organelles and no cell membrane, so we say it is acellular. It is also very small. A typical virus is about twenty times smaller than a bacterium.',
    }),
    sl('concept', 'Why viruses have no kingdom', {
      b: 'Whittaker\'s kingdoms group **cells**. A virus is **not a cell**, cannot make its own proteins and **multiplies only inside a host cell**. Outside, it is inactive. So it does not fit any of the five kingdoms.',
      v: V.virusLife,
      n: 'The five kingdoms sort cells. A virus is not a cell. It cannot make its own proteins, and it cannot multiply on its own. It can multiply only by entering a living host cell and using the cell to make copies of itself. Outside a host it is inactive. Since it does not behave as a complete living cell, it has no place in any of the five kingdoms.',
    }),
    sl('concept', 'How a virus multiplies', {
      b: 'A virus **attaches** to a host cell, its genetic material **enters**, the host is **forced to copy** it, and new viruses **burst out**. This harms the host cell and can cause disease.',
      v: V.virusSteps,
      n: 'This is how a virus multiplies. It attaches to a host cell. Its genetic material enters the cell. The cell is then forced to make copies of the virus. Finally the new viruses burst out and can infect other cells. This is why viruses are called particles that live only by taking over a host.',
    }),
    sl('concept', 'Ecological roles: producers, consumers, decomposers', {
      b: '**Producers** make food by photosynthesis and start every food chain. **Consumers** eat other organisms. **Decomposers** break down dead remains and wastes and return nutrients to the soil.',
      v: V.web,
      n: 'In any habitat, organisms play three roles. Producers, such as grass and trees, make food using sunlight. Consumers, such as the grasshopper, goat, frog and eagle, eat other organisms. Decomposers, mainly bacteria and fungi, break down dead plants, dead animals and wastes. In the food web, arrows show who eats whom, and the dashed arrows lead to decomposers.',
    }),
    sl('concept', 'Fungi and bacteria at work', {
      b: 'Fungi and bacteria are **nature\'s recyclers**: without them, dead leaves and bodies would pile up and nutrients would stay locked. Many are also useful to people, while some cause disease or spoil food.',
      v: V.microbes,
      n: 'Fungi and bacteria are nature recyclers. They decompose dead leaves and bodies, so nutrients return to the soil for plants to use. Many are useful to us. Bacteria turn milk into curd and help pulse plants, and yeast, a fungus, makes dough rise. But some bacteria cause diseases, and moulds spoil bread. So the same kingdoms can help us or harm us.',
    }),
    sl('example', 'Worked example: roles in a pond', {
      b: `**Problem.** Give the role of each organism in the pond table, and say how many times longer a 2000 nm bacterium is than a 100 nm virus.

**Roles.** Algae make food: **producer**. A tadpole eats algae: **herbivore** consumer. A fish eats the tadpole: **carnivore** consumer. Bacteria in the mud break down dead remains: **decomposer**.

**Size.** $\\dfrac{2000\\ \\text{nm}}{100\\ \\text{nm}} = 20$ times.`,
      v: V.podRoles,
      n: 'Let us assign roles in a pond. The tiny algae make food, so they are producers. The tadpole eats the algae, so it is a herbivore consumer. The fish eats the tadpole, so it is a carnivore consumer. Bacteria in the mud break down dead remains, so they are decomposers. Also, a bacterium of two thousand nanometres is twenty times longer than a virus of one hundred nanometres.',
    }),
    sl('check', 'Quick check: ecological roles', {
      b: 'Decide on the role of an organism.',
      n: 'Quick check. Ask where the organism gets its food, and what happens to the remains when it dies.',
      chk: 'chk-roles',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Animals: Porifera, Cnidaria, Platyhelminthes, Nematoda, Annelida, Arthropoda, Mollusca, Echinodermata, Chordata.',
        'Vertebrate classes: Pisces, Amphibia, Reptilia, Aves, Mammalia.',
        'Scientific name = genus (capital) + species (small letter), in italics in print.',
        'Viruses are acellular, multiply only in a host cell, and have no kingdom.',
        'Producers make food, consumers eat, decomposers (bacteria, fungi) recycle dead matter.',
      ],
      v: table(['Idea', 'One-line answer'], [['Binomial name', 'Genus then species'], ['Virus', 'Genetic material in a protein coat'], ['Decomposer', 'Breaks down dead remains']], 'Summary table of three ideas in Part 2'),
      n: 'To sum up. Animals are classified into phyla, and the vertebrates into five classes. A scientific name has a genus with a capital letter and a species with a small letter. Viruses are acellular and multiply only inside a host cell, so they have no kingdom. Producers make food, consumers eat, and decomposers such as bacteria and fungi recycle the remains of dead organisms.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write a scientific name with the genus capitalised, the species small, and italics or underlining.',
        'Name three features when asked to distinguish mammals from reptiles.',
        'For viruses, give two reasons: not cellular, and multiplies only in a host.',
        'Never write that decomposers are consumers of living organisms; they use dead matter.',
        'Draw the food chain with arrows pointing from the eaten to the eater.',
      ],
      v: table(['Common slip', 'Correct idea'], [['Virus is a cell', 'Virus is acellular'], ['Arrow from eater to food', 'Arrow from food to eater'], ['Bat is a bird', 'Bat is a mammal']], 'Table of common slips and the correct ideas'),
      n: 'Exam tips for this part. Write scientific names with a capital genus, a small species, and italics or underlining. When asked about viruses, give two reasons. Remember that decomposers use dead matter. Draw food chain arrows from the food to the eater. And remember common slips, such as calling a virus a cell, or a bat a bird.',
    }),
  ],
});
