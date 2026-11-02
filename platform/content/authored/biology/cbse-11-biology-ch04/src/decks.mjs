// ch04 Animal Kingdom — two decks: Part 1 (t01 basis of classification, t02 non-chordate phyla), Part 2 (t03 chordates up to classes).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { SYMMETRY, COELOM, SPONGE, CNID, CHORD } from './svgs.mjs';
import { PHYLA, CLASSES, N, REEF, ZOO, HEARTS, P, C, phylumFrom, classFrom } from './calc.mjs';

const short = (p) => p.name.split(' ')[0];
const phylaRows = (names) => PHYLA.filter((p) => names.includes(short(p)));
export const V = {
  sym: svgV(SYMMETRY, 'Three kinds of body symmetry: asymmetrical sponge, radial sea anemone and bilateral earthworm'),
  coel: svgV(COELOM, 'Cross-sections of an acoelomate, a pseudocoelomate and a coelomate body'),
  sponge: svgV(SPONGE, 'Labelled sponge in longitudinal section with osculum, spongocoel, choanocytes, ostia and spicules'),
  cnid: svgV(CNID, 'Polyp and medusa forms of a coelenterate with tentacles, mouth and body wall labelled'),
  chord: svgV(CHORD, 'Simple chordate showing dorsal hollow nerve cord, notochord, pharyngeal gill slits, ventral heart and post-anal tail'),
  levels: table(
    ['Level of organisation', 'Meaning', 'Phylum'],
    [['Cellular', 'Cells loosely arranged; little division of labour', 'Porifera'], ['Cell-tissue (tissue)', 'Cells of one function arranged in tissues', 'Coelenterata, Ctenophora'], ['Organ', 'Tissues grouped into organs', 'Platyhelminthes'], ['Organ-system', 'Organs work together as systems', 'Aschelminthes and all higher phyla']],
    'Table of levels of organisation with the phyla that show each',
  ),
  layers: table(
    ['Germ layers', 'Layers present', 'Phyla'],
    [['None (cellular grade)', 'Body not built from germ layers', 'Porifera'], ['Diploblastic', 'Ectoderm and endoderm, with an undifferentiated mesoglea between', 'Coelenterata, Ctenophora'], ['Triploblastic', 'Ectoderm, mesoderm and endoderm', 'Platyhelminthes to Chordata']],
    'Table of germ layers in sponges, diploblastic and triploblastic animals',
  ),
  nonch1: table(
    ['Feature', 'Porifera', 'Coelenterata', 'Ctenophora'],
    [
      ['Level, symmetry', 'Cellular; asymmetrical', 'Tissue; radial', 'Tissue; radial'],
      ['Special structures', 'Ostia, spongocoel, osculum, choanocytes; spicules or spongin', 'Cnidoblasts; polyp and medusa; hypostome', 'Eight rows of ciliated comb plates; bioluminescence'],
      ['Habitat', 'Mostly marine', 'Mostly marine', 'Exclusively marine'],
      ['Examples', P.Porifera.egs.join(', '), 'Physalia, Adamsia, Pennatula, Gorgonia, Meandrina', P.Ctenophora.egs.join(', ')],
    ],
    'Table comparing Porifera, Coelenterata and Ctenophora',
  ),
  nonch2: table(
    ['Feature', 'Platyhelminthes', 'Aschelminthes', 'Annelida'],
    [
      ['Body', 'Dorsoventrally flattened; acoelomate; organ level', 'Round in cross-section; pseudocoelomate', 'Metamerically segmented; coelomate'],
      ['Notable features', 'Hooks and suckers; flame cells; high regeneration', 'Complete gut with muscular pharynx; sexes separate', 'Closed circulation; nephridia; parapodia in Nereis'],
      ['Examples', P.Platyhelminthes.egs.join(', '), P.Aschelminthes.egs.join(', '), 'Nereis, Pheretima, Hirudinaria'],
    ],
    'Table comparing Platyhelminthes, Aschelminthes and Annelida',
  ),
  nonch3: table(
    ['Phylum', 'Key features', 'Examples'],
    [
      ['Arthropoda', 'Largest phylum; chitinous exoskeleton; jointed appendages; head, thorax, abdomen; open circulation; Malpighian tubules', 'Apis, Bombyx, Anopheles, Locusta, Limulus'],
      ['Mollusca', 'Calcareous shell; soft unsegmented body with head, muscular foot and visceral hump; mantle cavity with gills; radula', 'Pila, Pinctada, Sepia, Loligo, Octopus'],
      ['Echinodermata', 'Spiny skin; calcareous ossicles; water vascular system; radial adult, bilateral larva; no excretory system', 'Asterias, Echinus, Antedon, Cucumaria, Ophiura'],
      ['Hemichordata', 'Worm-like; proboscis, collar and trunk; open circulation; gills; formerly a chordate subphylum', 'Balanoglossus, Saccoglossus'],
    ],
    'Table of Arthropoda, Mollusca, Echinodermata and Hemichordata with key features and examples',
  ),
  chordVs: table(
    ['Feature', 'Non-chordates', 'Chordates'],
    [['Notochord', 'Absent', 'Present'], ['Central nervous system', 'Ventral, solid and double', 'Dorsal, hollow and single'], ['Pharynx', 'Without gill slits', 'Perforated by gill slits'], ['Heart (if present)', 'Dorsal', 'Ventral'], ['Post-anal tail', 'Absent', 'Present']],
    'Table comparing non-chordates and chordates on notochord, nervous system, pharynx, heart and tail',
  ),
  subphyla: table(
    ['Subphylum', 'Notochord', 'Example'],
    [['Urochordata', 'Only in the larval tail', 'Ascidia, Salpa, Doliolum'], ['Cephalochordata', 'Head to tail, throughout life', 'Branchiostoma (amphioxus)'], ['Vertebrata', 'Replaced by a cartilaginous or bony vertebral column in the adult', 'Fishes to mammals']],
    'Table of the three subphyla of Chordata with notochord position and examples',
  ),
  classes: table(
    ['Class', 'Heart', 'Body covering', 'Temperature', 'Fertilisation'],
    CLASSES.map((c) => [c.name, c.heart ? `${c.heart} chambers` : 'not stated', c.cover, c.warm ? 'Warm-blooded' : 'Cold-blooded', c.ferti]),
    'Table comparing the seven chordate classes on heart, body covering, body temperature and fertilisation',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Animal Kingdom — Part 1: Basis of classification and the non-chordate phyla',
  goals: [
    'Classify animals by levels of organisation, symmetry, germ layers, coelom, segmentation and notochord',
    'Describe the salient features of the ten non-chordate phyla with examples',
    'Place an animal in its phylum from a set of features',
  ],
  slides: [
    sl('title', 'Animal Kingdom', {
      b: 'Part 1 — how animals are sorted, then the ten phyla without a notochord.',
      v: flow('LR', [['a', 'Animalia'], ['n', 'Non-chordates (ten phyla)'], ['c', 'Chordates']], [['a', 'n'], ['a', 'c']], 'Flow of the animal kingdom into non-chordates and chordates'),
      n: 'More than a million kinds of animals have been described. To study them, biologists look for fundamental features shared by groups: how the body is organised, its symmetry, its layers and body cavity, and whether it has a notochord. These features sort animals into phyla.',
    }),
    sl('concept', 'Levels of organisation', {
      b: 'All animals are multicellular eukaryotes, but their cells are organised differently: **cellular, cell-tissue, organ and organ-system** levels.',
      v: V.levels,
      n: 'In sponges the cells are loosely arranged and do separate jobs without forming tissues. In coelenterates, cells doing the same job form tissues. Flatworms have organs made of tissues. Roundworms and all higher animals have organs working together in organ systems, such as digestive and circulatory systems.',
    }),
    sl('diagram', 'Symmetry', {
      b: '**Asymmetrical** (sponges), **radial** (coelenterates, ctenophores, adult echinoderms) and **bilateral** (annelids, arthropods and most others).',
      v: V.sym,
      n: 'A sponge cannot be cut into equal halves in any plane. A radially symmetrical animal, such as a sea anemone, can be cut into equal halves by any plane through its central axis. A bilaterally symmetrical animal, such as an earthworm, has right and left halves that mirror each other along one plane only.',
    }),
    sl('concept', 'Diploblastic and triploblastic animals', {
      b: 'In the embryo, **diploblastic** animals have two germ layers, ectoderm and endoderm, with an undifferentiated **mesoglea** between. **Triploblastic** animals have a third layer, the **mesoderm**, between them.',
      v: V.layers,
      n: 'Ectoderm forms the outside of the body and endoderm lines the gut. Coelenterates and ctenophores have only these two layers with a jelly-like mesoglea between them. All animals from flatworms upwards also have mesoderm, which gives rise to muscles and many organs.',
    }),
    sl('diagram', 'Body cavity: coelom', {
      b: 'A **coelom** is a body cavity **lined by mesoderm**. **Coelomates** have one, **pseudocoelomates** have mesoderm only as scattered pouches between ectoderm and endoderm, and **acoelomates** have none.',
      v: V.coel,
      n: 'In flatworms, mesoderm fills the space and there is no cavity. In roundworms there is a cavity, but mesoderm lies only in scattered pouches, so it is a pseudocoelom. In annelids, arthropods, molluscs, echinoderms, hemichordates and chordates, the cavity is lined by mesoderm all round: a true coelom.',
    }),
    sl('check', 'Quick check: body cavity', {
      b: 'Identify the body plan from the position of the mesoderm.',
      n: 'Quick check. What lines a true coelom?',
      chk: 'coelom-mcq',
    }),
    sl('concept', 'Segmentation, notochord and gut', {
      b: '**Metamerism:** body divided into segments with serial repetition of some organs (earthworm). **Notochord:** a mesodermal rod on the dorsal side in the embryo of **chordates**. **Gut:** **incomplete** (one opening) or **complete** (mouth and anus).',
      v: table(['Feature', 'Examples'], [['Metamerism', 'Annelida, Arthropoda'], ['Notochord present', 'All chordates'], ['Incomplete gut (one opening)', 'Coelenterata, Ctenophora, Platyhelminthes'], ['Complete gut (mouth and anus)', 'Aschelminthes and all higher phyla'], ['Open circulation', 'Arthropods, molluscs'], ['Closed circulation', 'Annelids, chordates']], 'Table of segmentation, notochord, gut and circulation in animal groups'),
      n: 'An earthworm is divided into segments, each repeating some organs. Chordates have a rod, the notochord, along the back at some stage. A flatworm has a gut with one opening, while a roundworm has a complete gut with a mouth and an anus. Blood circulation may be open or closed.',
    }),
    sl('example', 'Worked example 1: naming the phylum from features', {
      b: 'Name the phylum of each animal. P: coelomate, segmented body with jointed appendages. Q: radial, two germ layers, stinging cells on tentacles. R: bilateral, round in cross-section, mesoderm only in scattered pouches.',
      ul: [
        `**P:** coelomate and segmented gives ${phylumFrom({ coelom: 'coelomate', seg: true }).join(' or ')}; jointed appendages point to **Arthropoda**.`,
        `**Q:** diploblastic gives ${phylumFrom({ layers: 'diploblastic' }).join(' or ')}; stinging cells (cnidoblasts) point to **Coelenterata**.`,
        `**R:** a pseudocoelom gives **${phylumFrom({ coelom: 'pseudocoelomate' }).join('')}**.`,
      ],
      v: table(['Animal', 'Key features', 'Phylum'], [['P', 'Coelomate, segmented, jointed appendages', 'Arthropoda'], ['Q', 'Radial, diploblastic, cnidoblasts', 'Coelenterata'], ['R', 'Pseudocoelomate, round body', 'Aschelminthes']], 'Worked table placing three animals in Arthropoda, Coelenterata and Aschelminthes'),
      n: 'Narrow the list step by step. Coelomate and segmented leaves annelids and arthropods, and jointed appendages choose arthropods. Two germ layers leaves coelenterates and ctenophores, and stinging cells choose coelenterates. A pseudocoelom belongs only to roundworms.',
    }),
    sl('diagram', 'Porifera: the sponges', {
      b: 'Mostly marine, **asymmetrical**, cellular level. **Water canal system:** water enters through **ostia** into the **spongocoel**, lined by **choanocytes**, and leaves through the **osculum**. Skeleton of **spicules** or **spongin** fibres. Hermaphrodite.',
      v: V.sponge,
      n: 'The flow of water brings food and oxygen, and carries away wastes. Collar cells, the choanocytes, line the central cavity and drive the current. Sponges are hermaphrodites, with eggs and sperms from one individual, and they also reproduce by fragmentation. Examples are Sycon, Spongilla and the bath sponge Euspongia.',
    }),
    sl('diagram', 'Coelenterata and Ctenophora', {
      b: '**Coelenterates** have **cnidoblasts** and two body forms: sessile **polyp** and free-swimming **medusa**; some show **metagenesis** (*Obelia*). **Ctenophores** have **eight rows of ciliated comb plates** and bioluminescence.',
      v: V.cnid,
      n: 'Hydra is a polyp and Aurelia, the jellyfish, is a medusa. Stinging cells on the tentacles help in anchorage, defence and catching prey. In Obelia, polyps make medusae asexually and medusae make polyps sexually. Ctenophores, or comb jellies, use eight rows of ciliated plates to swim and can glow in the dark.',
    }),
    sl('check', 'Quick check: coelenterates', {
      b: 'Which structure do coelenterates use for defence and for catching prey?',
      n: 'Quick check. What do the tentacles of a coelenterate carry?',
      chk: 'cnid-mcq',
    }),
    sl('concept', 'Porifera to Annelida at a glance', {
      b: 'Compare the first group of phyla.',
      v: V.nonch1,
      n: 'Sponges, coelenterates and ctenophores are the simplest animals. Sponges are cellular and asymmetrical, while coelenterates and ctenophores have tissues and radial symmetry. Ctenophores are exclusively marine. Their examples help you recall them: Sycon, Physalia and Pleurobrachia.',
    }),
    sl('concept', 'Flatworms, roundworms and annelids', {
      b: 'Compare the worm phyla.',
      v: V.nonch2,
      n: 'Flatworms are flat, with no body cavity. Many are parasites with hooks and suckers, and flame cells for excretion. Roundworms have a pseudocoelom and a complete gut, and sexes are separate. Annelids are segmented coelomates with a closed circulation, nephridia and, in Nereis, parapodia for swimming.',
    }),
    sl('concept', 'Arthropods, molluscs, echinoderms and hemichordates', {
      b: 'Compare the last four non-chordate phyla.',
      v: V.nonch3,
      n: 'Arthropoda is the largest phylum, with over two thirds of all named species. Molluscs have a shell, a muscular foot and a mantle cavity with gills. Echinoderms have spiny skin and a water vascular system. Hemichordates are worm-like, with a proboscis, collar and trunk.',
    }),
    sl('check', 'Quick check: phyla', {
      b: 'Judge the assertion and the reason about a phylum.',
      n: 'Quick check. Which phylum has the water vascular system?',
      chk: 'phylum-ar',
    }),
    sl('example', 'Worked example 2: tallying a reef survey', {
      b: `A diver records ${N.reef} animals on a reef: sea anemone, brain coral, comb jelly, bath sponge, starfish, sea urchin, squid, pearl oyster, crab, sea-pen and brittle star. How many are radially symmetrical, how many are diploblastic, and how many are triploblastic coelomates?`,
      ul: [
        `Radial: anemone, coral, comb jelly, starfish, urchin, sea-pen, brittle star: **${N.reefRadial}**.`,
        `Diploblastic: anemone, coral, comb jelly, sea-pen: **${N.reefDiplo}**.`,
        `Triploblastic coelomates: starfish, urchin, squid, oyster, crab, brittle star: **${N.reefTriploCoelo}**.`,
      ],
      v: table(['Group', 'Number out of ' + N.reef], [['Radial', String(N.reefRadial)], ['Diploblastic', String(N.reefDiplo)], ['Triploblastic coelomates', String(N.reefTriploCoelo)]], `Worked table: ${N.reefRadial} radial, ${N.reefDiplo} diploblastic, ${N.reefTriploCoelo} triploblastic coelomates`),
      n: 'Place each animal in its phylum first, then read its features from the table. Seven of the eleven are radial, since adult echinoderms are radial too. Four are diploblastic. Six are triploblastic coelomates.',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Basis of classification: levels of organisation, symmetry, germ layers, coelom, segmentation, notochord.',
        'Porifera: cellular, asymmetrical, choanocytes. Coelenterata and Ctenophora: radial, diploblastic.',
        'Platyhelminthes: acoelomate. Aschelminthes: pseudocoelomate. Annelida onwards: coelomate.',
        'Annelida and Arthropoda: segmented. Arthropoda: largest phylum.',
        'Mollusca: shell, mantle, radula. Echinodermata: water vascular system. Hemichordata: proboscis, collar, trunk.',
      ],
      v: V.layers,
      n: 'To recap: animals are classified by level of organisation, symmetry, germ layers, body cavity, segmentation and notochord. Ten non-chordate phyla range from sponges to hemichordates, with the coelom first appearing in the annelids.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Learn **one distinguishing feature** and **two examples** for each phylum.',
        'Keep **acoelomate, pseudocoelomate and coelomate** straight with the flatworm, roundworm and earthworm.',
        'Remember that **adult echinoderms are radial** but their larvae are bilateral.',
        'Write **diploblastic** only for coelenterates and ctenophores.',
      ],
      n: 'Exam tips. Learn one distinguishing feature and two examples for each phylum. Link the three kinds of body cavity to flatworm, roundworm and earthworm. Remember that adult echinoderms are radial but their larvae are bilateral. And only coelenterates and ctenophores are diploblastic.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Animal Kingdom — Part 2: Phylum Chordata up to classes',
  goals: [
    'State the four fundamental features of chordates and the three subphyla',
    'Describe the salient features of the seven classes of chordates',
    'Place a vertebrate in its class from a set of features',
  ],
  slides: [
    sl('title', 'Phylum Chordata', {
      b: 'Part 2 — animals with a notochord, from lampreys to mammals.',
      v: flow('LR', [['c', 'Chordata'], ['u', 'Urochordata'], ['ce', 'Cephalochordata'], ['v', 'Vertebrata']], [['c', 'u'], ['c', 'ce'], ['c', 'v']], 'Flow of phylum Chordata into three subphyla'),
      n: 'Chordates are bilaterally symmetrical, triploblastic, coelomate animals with organ systems. They share four features at some stage of life. Most chordates are vertebrates, with a backbone, and they include fishes, amphibians, reptiles, birds and mammals.',
    }),
    sl('diagram', 'Features of chordates', {
      b: 'Chordates have a **notochord**, a **dorsal hollow nerve cord**, **paired pharyngeal gill slits**, a **post-anal tail** and a **ventral heart** in a closed circulatory system.',
      v: V.chord,
      n: 'The notochord is a supporting rod along the back. Above it lies a single hollow nerve cord. The pharynx is perforated by gill slits, the heart is on the underside, and a tail extends beyond the anus. Non-chordates have a solid, double, ventral nerve cord and no gill slits.',
    }),
    sl('concept', 'Chordates compared with non-chordates', {
      b: 'Five contrasts decide whether an animal is a chordate.',
      v: V.chordVs,
      n: 'Chordates have a notochord, a dorsal hollow nerve cord, gill slits in the pharynx, a ventral heart and a post-anal tail. Non-chordates lack the notochord and gill slits, have a ventral solid double nerve cord, a dorsal heart if one is present, and no post-anal tail.',
    }),
    sl('concept', 'Three subphyla', {
      b: '**Urochordata** and **Cephalochordata** are called **protochordates**. In vertebrates the notochord is replaced by a **vertebral column** and the heart is two-, three- or four-chambered.',
      v: V.subphyla,
      n: 'In tunicates such as Ascidia, the notochord is present only in the larval tail. In Branchiostoma, the lancelet, the notochord runs from head to tail throughout life. In vertebrates the notochord is replaced by a cartilaginous or bony backbone in the adult, and paired fins or limbs appear.',
    }),
    sl('check', 'Quick check: subphyla', {
      b: 'In which subphylum is the notochord restricted to the larval tail?',
      n: 'Quick check. Which chordates keep a notochord only in the larval tail?',
      chk: 'subphyla-mcq',
    }),
    sl('concept', 'Vertebrata: the classes', {
      b: '**Agnatha** (jawless): class **Cyclostomata**. **Gnathostomata** (jawed): **Pisces** (Chondrichthyes, Osteichthyes) and **Tetrapoda** (Amphibia, Reptilia, Aves, Mammalia).',
      v: flow('TB', [['v', 'Vertebrata'], ['ag', 'Agnatha: Cyclostomata'], ['gn', 'Gnathostomata'], ['p', 'Pisces: Chondrichthyes, Osteichthyes'], ['t', 'Tetrapoda: Amphibia, Reptilia, Aves, Mammalia']], [['v', 'ag'], ['v', 'gn'], ['gn', 'p'], ['gn', 't']], 'Flow of the vertebrate classes from Agnatha and Gnathostomata to Pisces and Tetrapoda'),
      n: 'Cyclostomes have a sucking circular mouth with no jaws, and between six and fifteen pairs of gill slits. The jawed vertebrates divide into fishes and four-limbed animals. Lampreys and hagfishes are ectoparasites on some fishes, and lampreys migrate to fresh water to spawn.',
    }),
    sl('concept', 'Chondrichthyes and Osteichthyes', {
      b: 'Compare cartilaginous and bony fishes.',
      v: table(
        ['Feature', 'Chondrichthyes', 'Osteichthyes'],
        [
          ['Skeleton', 'Cartilaginous', 'Bony'],
          ['Gills', 'Separate slits, no operculum', 'Four pairs covered by an operculum'],
          ['Skin', 'Placoid scales; teeth are modified scales', 'Cycloid or ctenoid scales'],
          ['Air bladder', 'Absent: must keep swimming to avoid sinking', 'Present: regulates buoyancy'],
          ['Heart', 'Two chambers', 'Two chambers'],
          ['Fertilisation and young', 'Internal; mostly viviparous; claspers in males', 'Usually external; oviparous; direct development'],
          ['Examples', 'Scoliodon, Pristis, Carcharodon, Trygon', 'Exocoetus, Hippocampus, Labeo, Catla, Clarias'],
        ],
        'Table comparing cartilaginous and bony fishes',
      ),
      n: 'Sharks and rays have a cartilaginous skeleton and no gill cover. With no air bladder they have to swim constantly. Bony fishes have a bony skeleton, an operculum covering four pairs of gills, and an air bladder that adjusts buoyancy. Both groups are cold-blooded with a two chambered heart.',
    }),
    sl('example', 'Worked example 1: gill slits and heart chambers', {
      b: `A lamprey has ${N.gillPairs} pairs of gill slits. A student also lists the hearts of seven animals: rohu, dog shark, frog, garden lizard, pigeon, dog and cobra. Find the total gill slits and the total heart chambers in the list.`,
      ul: [
        `Gill slits: $${N.gillPairs} \\times 2 = ${N.gillSlits}$.`,
        `Chambers: fishes $2 + 2$, frog $3$, lizard $3$, pigeon $4$, dog $4$, cobra $3$.`,
        `Total: $2 + 2 + 3 + 3 + 4 + 4 + 3 = ${N.heartChambers}$ chambers.`,
      ],
      v: table(['Quantity', 'Value'], [['Gill slits of the lamprey', String(N.gillSlits)], ['Chambers in the seven hearts', String(N.heartChambers)]], `Worked table: ${N.gillSlits} gill slits and ${N.heartChambers} heart chambers`),
      n: 'Each pair has two slits, so seven pairs give fourteen. For the hearts, fishes have two chambers, amphibians and most reptiles three, and birds and mammals four. Adding the chambers for the seven animals gives twenty one.',
    }),
    sl('concept', 'Amphibia and Reptilia', {
      b: '**Amphibians** live on land and in water, with **moist skin without scales**, a **tympanum**, a **cloaca**, and a **three-chambered heart**. **Reptiles** have **dry cornified skin with scales or scutes**, lungs, and a heart that is usually three-chambered but **four-chambered in crocodiles**.',
      v: table(
        ['Feature', 'Amphibia', 'Reptilia'],
        [['Skin', 'Moist, no scales', 'Dry, cornified; scales or scutes'], ['Respiration', 'Gills, lungs and skin', 'Lungs'], ['Heart', 'Three chambers', 'Usually three; four in crocodiles'], ['Fertilisation', 'External; oviparous; direct or indirect development', 'Internal; oviparous; direct development'], ['Examples', 'Bufo, Rana, Hyla, Salamandra, Ichthyophis', 'Chelone, Testudo, Calotes, Crocodilus, Naja']],
        'Table comparing amphibians and reptiles',
      ),
      n: 'Frogs and toads breathe through gills as larvae, then through lungs and skin as adults, and fertilisation is external. Reptiles creep or crawl, have dry scaly skin, internal fertilisation and direct development, and snakes and lizards shed their skin. Both groups are cold-blooded.',
    }),
    sl('check', 'Quick check: heart chambers', {
      b: 'Which class has a three-chambered heart?',
      n: 'Quick check. How many chambers does the heart of a frog have?',
      chk: 'heart-mcq',
    }),
    sl('concept', 'Aves and Mammalia', {
      b: '**Birds:** feathers, wings, **pneumatic bones**, crop and gizzard, **four-chambered heart**, warm-blooded. **Mammals:** **mammary glands**, **hair**, external ears (pinnae), different types of teeth, four-chambered heart, warm-blooded, mostly viviparous.',
      v: table(
        ['Feature', 'Aves', 'Mammalia'],
        [['Covering', 'Feathers; scales on the legs', 'Hair'], ['Skeleton', 'Fully ossified; hollow long bones with air cavities', 'Bony'], ['Respiration', 'Lungs and air sacs', 'Lungs'], ['Heart', 'Four chambers', 'Four chambers'], ['Young', 'Oviparous; direct development', 'Viviparous, mostly; platypus lays eggs'], ['Examples', 'Corvus, Columba, Struthio, Pavo, Aptenodytes', 'Ornithorhynchus, Macropus, Pteropus, Canis, Delphinus, Balaenoptera']],
        'Table comparing birds and mammals',
      ),
      n: 'Birds have forelimbs modified into wings, and most can fly; the ostrich cannot. Their hollow bones and air sacs suit flight. Mammals are found from polar ice to deserts, and some fly or live in water. Their most unique feature is the mammary gland, which feeds the young.',
    }),
    sl('example', 'Worked example 2: naming the class', {
      b: 'Name the class of each animal. P: cold-blooded, moist skin, three-chambered heart. Q: four-chambered heart, hair. R: two-chambered heart, placoid scales, no gill cover.',
      ul: [
        `**P:** ${classFrom({ heart: 3, cover: 'moist' }).join('')}.`,
        `**Q:** ${classFrom({ heart: 4, cover: 'hair' }).join('')}.`,
        `**R:** ${classFrom({ heart: 2, cover: 'placoid' }).join('')}.`,
      ],
      v: table(['Animal', 'Clues', 'Class'], [['P', 'Moist skin, three chambers', 'Amphibia'], ['Q', 'Hair, four chambers', 'Mammalia'], ['R', 'Placoid scales, two chambers', 'Chondrichthyes']], 'Worked table naming Amphibia, Mammalia and Chondrichthyes from clues'),
      n: 'Pick the clue that is unique to one class. Moist skin points to amphibians, hair to mammals, and placoid scales to cartilaginous fishes. Heart chambers then confirm the choice.',
    }),
    sl('concept', 'Comparing the seven classes', {
      b: 'Compare the classes on heart, covering, temperature and fertilisation.',
      v: V.classes,
      n: 'Only birds and mammals are warm-blooded and have a four chambered heart. Fishes have two chambers, and amphibians and most reptiles three. Fertilisation is external in bony fishes and amphibians and internal in sharks, reptiles, birds and mammals.',
    }),
    sl('check', 'Quick check: classes', {
      b: 'Judge the assertion and the reason about warm-blooded animals.',
      n: 'Quick check. Which classes are warm-blooded?',
      chk: 'class-ar',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Chordates: notochord, dorsal hollow nerve cord, pharyngeal gill slits, post-anal tail, ventral heart.',
        'Subphyla: Urochordata (notochord in larval tail), Cephalochordata (head to tail), Vertebrata (vertebral column).',
        'Cyclostomata (jawless), Chondrichthyes (cartilaginous), Osteichthyes (bony): two-chambered heart.',
        'Amphibia and Reptilia: three-chambered heart (crocodiles four); cold-blooded.',
        'Aves and Mammalia: four-chambered heart; warm-blooded.',
      ],
      v: V.classes,
      n: 'To recap: chordates have a notochord and related features, and vertebrates replace the notochord with a backbone. Fishes have two chambered hearts, amphibians and reptiles three, birds and mammals four. Only birds and mammals are warm-blooded.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Learn the **five chordate features** and the **five contrasts** with non-chordates.',
        'Write the **heart chambers** and **body covering** for each class.',
        'Do not call a whale a fish: it is a **mammal** with hair and mammary glands.',
        'Remember **crocodiles** have a four-chambered heart.',
      ],
      n: 'Exam tips. Learn the chordate features and how they contrast with non-chordates. For each class know the heart chambers and the body covering. A whale is a mammal, not a fish. And remember that crocodiles are reptiles with a four chambered heart.',
    }),
  ],
});
