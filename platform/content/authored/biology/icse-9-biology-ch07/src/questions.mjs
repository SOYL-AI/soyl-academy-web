// ICSE 9 Biology ch07 Diversity in the Animal Kingdom — question bank in ICSE school-examination style (10-mark structured questions).
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-biology-ch01/src/lib.mjs';
import { SURVEY, TRAY, WINDOW, SHELF, HEART } from './calc.mjs';
import { INSECT_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const insectFig = svgV(INSECT_LETTERED, 'An insect with parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct term', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('notochord-chk', mcq({
  stem: 'Which feature is found only in chordates?',
  right: 'A notochord at some stage of life', wrong: ['A segmented body', 'A body cavity', 'A mouth at the front'],
  sol: 'Only chordates have a notochord at some stage — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('cnido-chk', mcq({
  stem: 'What are the stinging cells of a Hydra called?',
  right: 'Cnidoblasts', wrong: ['Spicules', 'Tube feet', 'Setae'],
  sol: 'The stinging cells on the tentacles are cnidoblasts — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('worm-chk', mcq({
  stem: 'Which phylum has round, unsegmented worms with a false body cavity?',
  right: 'Nemathelminthes', wrong: ['Platyhelminthes', 'Annelida', 'Porifera'],
  sol: 'Roundworms belong to Nemathelminthes and have a false cavity — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('arthro-chk', mcq({
  stem: 'Which phylum has jointed legs and a hard outer skeleton?',
  right: 'Arthropoda', wrong: ['Mollusca', 'Annelida', 'Echinodermata'],
  sol: 'Jointed legs and an exoskeleton are the marks of Arthropoda — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('fish-chk', mcq({
  stem: 'Which class has a moist skin without scales and a larva that has gills?',
  right: 'Amphibia', wrong: ['Pisces', 'Reptilia', 'Aves'],
  sol: 'Amphibians have moist skin and a gilled larva — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('heart-chk', mcq({
  stem: 'Which pair of classes has a four-chambered heart?',
  right: 'Aves and Mammalia', wrong: ['Pisces and Amphibia', 'Amphibia and Reptilia', 'Pisces and Reptilia'],
  sol: 'Birds and mammals have two atria and two ventricles — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('bat-chk', mcq({
  stem: 'Why is a bat placed in the class Mammalia although it flies?',
  right: 'It has hair and mammary glands', wrong: ['It has feathers', 'It lays shelled eggs', 'It has gills in its young'],
  sol: 'Hair and mammary glands are mammalian features — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));
add('reptile-chk', mcq({
  stem: 'Which class lays shelled eggs on land and has dry, scaly skin?',
  right: 'Reptilia', wrong: ['Amphibia', 'Pisces', 'Mammalia'],
  sol: 'Reptiles have dry scales and lay shelled eggs on land — option (@K).',
  d: 1, c: 'recall', t: [6],
}));

// ---------------------------------------------------------------- t01 chordates and non-chordates
add('ventral-mcq', mcq({
  stem: 'A student dissects an animal and finds a solid nerve cord running along its belly side, and no notochord. The animal is a',
  right: 'non-chordate', wrong: ['chordate', 'vertebrate', 'mammal'],
  sol: 'A solid ventral nerve cord and no notochord are non-chordate features — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dorsal-mcq', mcq({
  stem: 'A larva has a rod along its back, a hollow nerve cord above the rod and slits in its throat. It should be placed among the',
  right: 'chordates', wrong: ['sponges', 'annelids', 'echinoderms'],
  sol: 'A notochord, a dorsal hollow nerve cord and gill slits are the features of chordates — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-notochord', ar({
  a: 'Vertebrates are chordates.',
  r: 'The notochord of a chordate is replaced by the backbone in vertebrates.',
  key: 'c',
  sol: 'Both are true, and the replacement of the notochord by a backbone is why vertebrates are chordates with a backbone — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('notochord-tf', tf({
  stem: 'The nerve cord of a chordate is solid and lies on the belly side.',
  key: 'f',
  sol: 'False. In chordates the nerve cord is hollow and lies on the back (dorsal) side.',
  d: 1, c: 'recall', t: [1],
}));
add('term-nonchord', term({
  stem: 'Give the biological term: the stiff supporting rod along the back of a chordate.',
  model: '**Notochord.**', sol: 'Notochord.', sch: 'Notochord',
  d: 1, c: 'recall', t: [1],
}));
add('chordate-short', short({
  marks: 2,
  stem: 'State two differences between chordates and non-chordates.',
  model: 'Chordates have a **notochord** at some stage; non-chordates **have none**. The nerve cord of a chordate is **hollow and dorsal** (on the back); in a non-chordate it is **solid and ventral** (on the belly side).',
  sol: 'Notochord; nerve cord.',
  scheme: [['Notochord present or absent', 1], ['Nerve cord: hollow dorsal or solid ventral', 1]],
  d: 1, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 Porifera and Coelenterata
add('sponge-mcq', mcq({
  stem: 'A beachcomber finds a dry, light, many-holed object that was once fixed to a rock and had a large opening at the top. The animal it came from belonged to',
  right: 'Porifera', wrong: ['Coelenterata', 'Mollusca', 'Echinodermata'],
  sol: 'A body full of pores with an osculum at the top is a sponge, a member of Porifera — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('sting-mcq', mcq({
  stem: 'A swimmer brushes against the tentacles of a jellyfish and feels a sting. The stinging is caused by',
  right: 'cnidoblasts on the tentacles', wrong: ['spicules in the body wall', 'tube feet on the arms', 'bristles on the rings'],
  sol: 'Coelenterates have stinging cells (cnidoblasts) on their tentacles — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-sponge', ar({
  a: 'Sponges are placed in the phylum Porifera.',
  r: 'The body of a sponge is full of pores.',
  key: 'c',
  sol: 'Both are true; Porifera means pore bearers, so the second statement explains the first — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('tf-hydra', tf({
  stem: 'In Hydra the mouth and the anus are two separate openings.',
  key: 'f',
  sol: 'False. A Hydra has a single opening that serves as both mouth and anus.',
  d: 2, c: 'understanding', t: [2],
}));
add('fill-pore', fill({
  stem: 'Water enters the body of a sponge through small ______ and leaves through the large osculum.',
  acc: [['pores', 'pore']],
  sol: 'Pores.',
  d: 1, c: 'recall', t: [2],
}));
add('odd-coel', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Hydra, Sea anemone, Jellyfish, Starfish.',
  model: '**Starfish**; the others are **coelenterates**.', sol: 'Starfish is an echinoderm.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [2, 4],
}));
add('reason-sponge', term({
  stem: 'Give reason: the phylum of sponges is named Porifera.',
  model: 'The name means **pore bearers**: the body of a sponge is full of **pores**.', sol: 'Pore bearers.', sch: 'Pores',
  d: 1, c: 'understanding', t: [2],
}));
add('sponge-short', short({
  marks: 2,
  stem: 'Name the large opening and the small openings of a sponge, and state what passes through each.',
  model: 'The **pores** are the small openings; **water carrying food and oxygen** enters through them. The **osculum** is the large opening at the top; **water** leaves through it.',
  sol: 'Pores in; osculum out.',
  scheme: [['Pores named, water enters', 1], ['Osculum named, water leaves', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('hydra-short', short({
  marks: 2,
  stem: 'Name the stinging cells of Hydra and state one use of them. Give one other example of a coelenterate.',
  model: 'The stinging cells are **cnidoblasts**; they are used to **catch prey** (and for defence). Another coelenterate: **jellyfish** (or sea anemone, coral).',
  sol: 'Cnidoblasts; catch prey; jellyfish.',
  scheme: [['Cnidoblasts and use', 1], ['Example', 1]],
  d: 1, c: 'recall', t: [2],
}));

// ---------------------------------------------------------------- t03 worms
add('flat-mcq', mcq({
  stem: 'A leaf-shaped worm, found in the liver of a sheep, has hooks and suckers and no body cavity. It belongs to',
  right: 'Platyhelminthes', wrong: ['Nemathelminthes', 'Annelida', 'Coelenterata'],
  sol: 'A flat parasitic worm with no body cavity is a flatworm — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('round-mcq', mcq({
  stem: 'A thin, round worm with pointed ends and no rings is found in the intestine of a child. It has a false body cavity. The worm belongs to',
  right: 'Nemathelminthes', wrong: ['Platyhelminthes', 'Annelida', 'Mollusca'],
  sol: 'An unsegmented round worm with a false cavity is a roundworm (Nemathelminthes) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ring-mcq', mcq({
  stem: 'After rain, a worm with a body made of many rings and a true body cavity crawls out of the soil. It is a member of',
  right: 'Annelida', wrong: ['Nemathelminthes', 'Platyhelminthes', 'Echinodermata'],
  sol: 'Body divided into rings with a true cavity is the mark of Annelida — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('term-coelom', term({
  stem: 'Give the biological term: a body cavity that is lined all round by tissue.',
  model: '**Coelom** (true body cavity).', sol: 'Coelom.', sch: 'Coelom',
  d: 1, c: 'recall', t: [3],
}));
add('worm-table', short({
  marks: 3,
  stem: 'Tabulate three differences between Platyhelminthes and Nemathelminthes.',
  model: '| Platyhelminthes | Nemathelminthes |\n|---|---|\n| Body **flat** | Body **round** |\n| **No body cavity** | **False body cavity** |\n| Examples: **tapeworm**, liver fluke | Examples: **Ascaris**, hookworm |\n| Often have **hooks and suckers** | Gut has a mouth and an anus, with no hooks or suckers |',
  sol: 'Shape; body cavity; examples or organs of attachment.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('odd-worm', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Earthworm, Leech, Nereis, Tapeworm.',
  model: '**Tapeworm**; the others are **segmented worms (annelids)**.', sol: 'Tapeworm is a flatworm.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [3],
}));
add('ar-annelid', ar({
  a: 'An earthworm belongs to Annelida.',
  r: 'The body of an earthworm is flat and has no cavity.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: the earthworm has a body divided into rings and a true cavity — option (a).',
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 Arthropoda, Mollusca, Echinodermata
add('spider-mcq', mcq({
  stem: 'A student counts eight jointed legs and two body regions on a small animal in a garden. It is an arthropod, and it is',
  right: 'a spider, not an insect', wrong: ['an insect, with six legs', 'a mollusc, with a foot', 'an echinoderm, with tube feet'],
  sol: 'Eight legs and two body regions belong to a spider; an insect has six legs and three body regions — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('mollusc-mcq', mcq({
  stem: 'A fisherman holds an animal with a soft, unsegmented body, a mantle and a muscular foot, but no shell outside. It is most likely a',
  right: 'cuttlefish', wrong: ['starfish', 'prawn', 'leech'],
  sol: 'Cuttlefish and octopus are molluscs with a mantle and foot, even without an external shell — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('echino-mcq', mcq({
  stem: 'A diver finds a spiny, five-armed animal on a coral reef, moving slowly on rows of small tube-like feet. It belongs to',
  right: 'Echinodermata', wrong: ['Mollusca', 'Arthropoda', 'Annelida'],
  sol: 'Spiny skin and tube feet are features of Echinodermata — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('figC-mcq', mcq({
  stem: 'In the figure of an insect, which letter marks the region that bears the legs and the wing?',
  right: 'C', wrong: ['A', 'D', 'B'],
  sol: 'C is the thorax, which bears three pairs of legs and the wing; A is the head, B an antenna, D the abdomen and E the wing — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [insectFig],
}));
add('figB-mcq', mcq({
  stem: 'In the figure of an insect, which letter marks the structure that senses touch and smell?',
  right: 'B', wrong: ['E', 'C', 'D'],
  sol: 'B is the antenna, a feeler on the head — option (@K).',
  d: 2, c: 'application', t: [4],
  assets: [insectFig],
}));
add('ar-octopus', ar({
  a: 'An octopus belongs to the phylum Mollusca.',
  r: 'An octopus has a hard shell on the outside of its body.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: an octopus has a soft body and no outer shell — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('tf-spider', tf({
  stem: 'A spider is an insect because it has jointed legs.',
  key: 'f',
  sol: 'False. A spider is an arthropod, not an insect: it has eight legs and two body regions.',
  d: 2, c: 'analysis', t: [4],
}));
add('term-exo', term({
  stem: 'Give the biological term: the hard outer covering of the body of an arthropod.',
  model: '**Exoskeleton.**', sol: 'Exoskeleton.', sch: 'Exoskeleton',
  d: 1, c: 'recall', t: [4],
}));
add('legs-num', num({
  stem: `Five houseflies and two spiders rest on a window sill. A fly has 6 legs and a spider has 8 legs. How many legs are there in all?`,
  value: WINDOW.total,
  sol: r`Flies: $${WINDOW.flies} \times 6 = ${WINDOW.flies * 6}$; spiders: $${WINDOW.spiders} \times 8 = ${WINDOW.spiders * 8}$; total $= ${WINDOW.total}$.`,
  scheme: [[`${WINDOW.total}`, 1]],
  d: 2, c: 'application', t: [4],
}), (q) => q.answer.value === 46 || 'value');
add('echino-short', short({
  marks: 2,
  stem: 'State two features of echinoderms. Give one example.',
  model: 'Echinoderms have **spiny skin** and **tube feet** for movement (and are all **marine**, with a body in five parts in the adult). Example: **starfish** (sea urchin, sea cucumber).',
  sol: 'Spiny skin; tube feet; starfish.',
  scheme: [['Two features', 1], ['Example', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('arthro-short', short({
  marks: 2,
  stem: 'State two features of arthropods. Name two animals that are arthropods.',
  model: 'Arthropods have **jointed legs** and a hard outer skeleton (**exoskeleton**) with a segmented body. Examples: **cockroach** and **prawn** (also crab, spider, centipede).',
  sol: 'Jointed legs; exoskeleton; two examples.',
  scheme: [['Two features', 1], ['Two examples', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('coel-short', short({
  marks: 3,
  stem: 'State three features of coelenterates. Name two examples.',
  model: '1. They live in water and the body is a **tube with two cell layers** around a central cavity.\n2. A **single opening** is both mouth and anus, ringed by **tentacles**.\n3. The tentacles carry **stinging cells (cnidoblasts)**.\n\nExamples: **Hydra** and **jellyfish** (sea anemone, coral).',
  sol: 'Two cell layers; tentacles and one opening; cnidoblasts; two examples.',
  scheme: [['Two cell layers or tube body', 1], ['Tentacles and single opening, or cnidoblasts', 1], ['Two examples', 1]],
  d: 2, c: 'recall', t: [2],
}));
add('insect-draw', short({
  marks: 3, wl: null,
  stem: 'Draw a neat, labelled diagram of an insect. Label the head, antenna, thorax, abdomen and wing.',
  model: 'A body in **three regions**: a small **head** carrying a pair of **antennae**; a middle **thorax** bearing three pairs of jointed legs and a **wing**; and a longer segmented **abdomen**. Five labels with ruled lines.',
  sol: 'Insect with three regions; five labels.',
  scheme: [['Three body regions in the right order', 1], ['Legs and wing drawn', 1], ['Five correct labels', 1]],
  d: 2, c: 'application', t: [4],
}));
add('classify3-short', short({
  marks: 3,
  stem: 'Name the phylum of each of these animals and give one reason: (i) octopus, (ii) earthworm, (iii) sea urchin.',
  model: '(i) Octopus: **Mollusca**: soft, unsegmented body with a mantle and muscular foot. (ii) Earthworm: **Annelida**: body divided into rings with a true cavity. (iii) Sea urchin: **Echinodermata**: spiny skin and tube feet.',
  sol: 'Mollusca; Annelida; Echinodermata, each with a reason.',
  scheme: [['Octopus: phylum and reason', 1], ['Earthworm: phylum and reason', 1], ['Sea urchin: phylum and reason', 1]],
  d: 2, c: 'application', t: [3, 4],
}));
add('passage-fill5', fill({
  marks: 5,
  stem: 'Select the correct terms to fill in the blanks: [notochord, coelom, osculum, cnidoblasts, mantle, exoskeleton, metamorphosis, tube feet]\n\nChordates have a (a) ______ at some stage of life. Water leaves a sponge through the (b) ______. The tentacles of Hydra carry stinging (c) ______. An insect has a hard (d) ______ outside its body, and a tadpole becomes a frog by (e) ______.',
  acc: [['notochord'], ['osculum'], ['cnidoblasts', 'cnidoblast'], ['exoskeleton'], ['metamorphosis']],
  sol: '(a) notochord; (b) osculum; (c) cnidoblasts; (d) exoskeleton; (e) metamorphosis.',
  d: 2, c: 'understanding', t: [1, 2, 4, 5],
}));
add('insect-match5', match({
  marks: 5,
  stem: 'Study the diagram of an insect and match each lettered part with its function.',
  pairs: [
    ['A', 'Bears the eyes and the mouthparts'],
    ['B', 'Senses touch and smell'],
    ['C', 'Carries the legs and the wing'],
    ['D', 'Holds the digestive and reproductive organs'],
    ['E', 'Helps the insect to fly'],
  ],
  order: [3, 1, 4, 0, 2],
  sol: 'A head; B antenna; C thorax; D abdomen; E wing.',
  d: 2, c: 'application', t: [4],
  assets: [insectFig],
}));

// ---------------------------------------------------------------- t05 Pisces and Amphibia
add('fish-mcq', mcq({
  stem: 'An animal lives only in water, breathes with gills, has fins and a body covered with scales. Its heart has',
  right: 'two chambers', wrong: ['three chambers', 'four chambers', 'five chambers'],
  sol: 'This is a fish; the heart of a fish has one atrium and one ventricle — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('frog-mcq', mcq({
  stem: 'Pond water contains a swimming larva that has gills and a tail. After some weeks it grows legs, loses its tail and starts to breathe with lungs. This change of body form is',
  right: 'metamorphosis', wrong: ['pollination', 'moulting', 'segmentation'],
  sol: 'The change from a gilled tadpole to an adult frog is metamorphosis — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ar-frog', ar({
  a: 'Frogs are classified as reptiles.',
  r: 'Frogs have moist skin and lay their eggs in water.',
  key: 'b',
  sol: 'The assertion is false: frogs are amphibians. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [5],
}));
add('odd-fish', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: Rohu, Shark, Seahorse, Toad.',
  model: '**Toad**; the others are **fishes (Pisces)**.', sol: 'Toad is an amphibian.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [5],
}));
add('term-meta', term({
  stem: 'Give the biological term: the change of a larva into an adult of a different body form, as in a tadpole.',
  model: '**Metamorphosis.**', sol: 'Metamorphosis.', sch: 'Metamorphosis',
  d: 1, c: 'recall', t: [5],
}));
add('frog-short', short({
  marks: 2,
  stem: 'Why must a frog return to water to breed? Name the process by which a tadpole becomes a frog.',
  model: 'A frog **lays its eggs in water**, and the tadpole is a **water-living larva with gills**, so it needs water to breed. The tadpole becomes a frog by **metamorphosis**.',
  sol: 'Eggs and larva in water; metamorphosis.',
  scheme: [['Eggs and gilled larva need water', 1], ['Metamorphosis', 1]],
  d: 2, c: 'application', t: [5],
}));
add('fish-amph-table', short({
  marks: 3,
  stem: 'Tabulate three differences between Pisces and Amphibia.',
  model: '| Pisces | Amphibia |\n|---|---|\n| Live in **water only** | Live on **land and in water** |\n| Skin has **scales** | Skin is **moist and smooth**, without scales |\n| Breathe by **gills** | Breathe by **skin and lungs** |\n| Heart has **two** chambers | Heart has **three** chambers |',
  sol: 'Habitat; skin; breathing; heart.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 Reptilia, Aves, Mammalia
add('reptile-mcq', mcq({
  stem: 'A gardener finds a leathery-shelled egg buried in warm soil. The adult that laid it has dry scales and a three-chambered heart. It belongs to',
  right: 'Reptilia', wrong: ['Amphibia', 'Aves', 'Pisces'],
  sol: 'Dry scales, a three-chambered heart and shelled eggs laid on land point to Reptilia — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('penguin-mcq', mcq({
  stem: 'A penguin cannot fly and swims in the sea, yet it is placed in the class Aves. The feature that places it there is that it',
  right: 'has feathers and lays hard-shelled eggs', wrong: ['has hair and mammary glands', 'has dry scales and a three-chambered heart', 'has gills and fins'],
  sol: 'Feathers and hard-shelled eggs are features of birds — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('whale-mcq', mcq({
  stem: 'A whale lives in the sea and has flippers, but it breathes with lungs, has a four-chambered heart and feeds its young on milk. It is a',
  right: 'mammal', wrong: ['fish', 'reptile', 'amphibian'],
  sol: 'Lungs, a four-chambered heart and milk for the young mark a mammal — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('warm-mcq', mcq({
  stem: 'On a cold morning, a lizard is sluggish while a crow is active. The reason is that',
  right: 'the body temperature of the crow stays constant, but that of the lizard changes with the surroundings', wrong: ['the crow has a three-chambered heart and the lizard a four-chambered heart', 'the lizard has feathers and the crow has scales', 'the crow breathes by gills and the lizard by lungs'],
  sol: 'Birds are warm-blooded, and reptiles are cold-blooded — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('ar-bat', ar({
  a: 'A bat is classified as a mammal.',
  r: 'A bat uses its wings to fly.',
  key: 'd',
  sol: 'Both are true, but flying does not make an animal a mammal; hair and mammary glands do — option (d).',
  d: 3, c: 'analysis', t: [6],
}));
add('tf-whale', tf({
  stem: 'A whale feeds its young on milk made in mammary glands.',
  key: 't',
  sol: 'True. A whale is a mammal.',
  d: 1, c: 'recall', t: [6],
}));
add('reason-whale', term({
  stem: 'Give reason: a whale is not a fish although it lives in water.',
  model: 'A whale has **lungs**, **hair** (a few bristles), a **four-chambered heart** and **mammary glands**: it is a **mammal**.', sol: 'It has mammalian features.', sch: 'A mammalian feature',
  d: 2, c: 'understanding', t: [6],
}));
add('shelf-num', num({
  stem: `A shelf holds ${SHELF.total} vertebrate specimens: ${SHELF.Pisces} fishes, ${SHELF.Amphibia} amphibians, ${SHELF.Reptilia} reptiles, ${SHELF.Aves} birds and ${SHELF.Mammalia} mammals. How many are warm-blooded?`,
  value: SHELF.warmBlooded,
  sol: r`Warm-blooded classes are Aves and Mammalia: $${SHELF.Aves} + ${SHELF.Mammalia} = ${SHELF.warmBlooded}$.`,
  scheme: [[`${SHELF.warmBlooded}`, 1]],
  d: 2, c: 'application', t: [6],
}), (q) => q.answer.value === 8 || 'value');
add('bat-short', short({
  marks: 2,
  stem: 'A bat flies, yet it is classified as a mammal. State two features that support this.',
  model: 'A bat has **hair** on its body and **mammary glands** that feed its young on **milk**. (It also has a four-chambered heart, an external ear and a diaphragm.)',
  sol: 'Hair; mammary glands.',
  scheme: [['First mammalian feature', 1], ['Second mammalian feature', 1]],
  d: 2, c: 'application', t: [6],
}));
add('bird-short', short({
  marks: 3,
  stem: 'State three features of birds that help them to fly.',
  model: '1. The **forelimbs are modified into wings**.\n2. The body is covered with **light feathers**.\n3. The bones are **hollow**, which makes the body light (and the **beak** is light too).',
  sol: 'Wings; feathers; hollow bones.',
  scheme: [['Wings', 1], ['Feathers', 1], ['Hollow bones', 1]],
  d: 2, c: 'application', t: [6],
}));
add('bird-mammal-table', short({
  marks: 3,
  stem: 'Tabulate three differences between Aves and Mammalia.',
  model: '| Aves | Mammalia |\n|---|---|\n| Body covered with **feathers** | Body covered with **hair** |\n| Forelimbs are **wings** | Limbs for walking, swimming or flying (bat) |\n| Lay **hard-shelled eggs** | Most give **birth to young** |\n| Have a **beak**, no mammary glands | Have **mammary glands** and an external ear |',
  sol: 'Covering; limbs; young; beak or glands.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('pond-long', long({
  marks: 10, wl: null,
  stem: `During a pond-and-shore visit, a class collected ${SURVEY.total} animals: ${SURVEY.Arthropoda} arthropods, ${SURVEY.Mollusca} molluscs, ${SURVEY.Echinodermata} echinoderms, ${SURVEY.Annelida} annelids and ${SURVEY.Coelenterata} coelenterates. One animal, P, had a tube-shaped body with tentacles around its mouth. Animal Q had a soft body with a coiled shell. Animal R had a long body divided into many rings.\n\n(a) Name the phylum of P, Q and R. [3]\n\n(b) Calculate the percentage of arthropods among the animals collected, and the number of molluscs and annelids together. [2]\n\n(c) State two features that the arthropods collected must have shown. [2]\n\n(d) Draw a neat, labelled diagram of animal P, naming four parts. [3]`,
  model: `**(a)** P: **Coelenterata**; Q: **Mollusca**; R: **Annelida**.\n\n**(b)** Arthropods = ${SURVEY.Arthropoda} ÷ ${SURVEY.total} × 100 = **${SURVEY.pctArthropoda} percent**. Molluscs and annelids = ${SURVEY.Mollusca} + ${SURVEY.Annelida} = **${SURVEY.softBodied}**.\n\n**(c)** **Jointed legs** and a hard outer skeleton (**exoskeleton**); a segmented body.\n\n**(d)** A tube-shaped body with a **mouth** at the top surrounded by **tentacles**, a **basal disc** at the bottom, and a body wall with two layers (a **bud** may be shown). Four labels with ruled lines.`,
  sol: `Coelenterata, Mollusca, Annelida; ${SURVEY.pctArthropoda} percent and ${SURVEY.softBodied}; jointed legs and exoskeleton; labelled Hydra.`,
  scheme: [['P: Coelenterata', 1], ['Q: Mollusca', 1], ['R: Annelida', 1], [`${SURVEY.pctArthropoda} percent`, 1], [`${SURVEY.softBodied} animals`, 1], ['Jointed legs', 1], ['Hard outer skeleton or segmented body', 1], ['Tube body with tentacles and mouth drawn', 1], ['Four labels', 2]],
  d: 3, c: 'application', t: [2, 3, 4],
}), (q) => SURVEY.pctArthropoda === 40 || 'pct');
add('jar-long', long({
  marks: 10, wl: null,
  stem: `A student keeps a tray of specimens that holds ${TRAY.beetles} beetles and ${TRAY.scorpions} scorpions. A beetle has 6 legs and a scorpion has 8 legs.\n\n(a) Calculate the total number of legs on the animals in the tray. [2]\n\n(b) Name the phylum to which both animals belong and state two features that show this. [3]\n\n(c) State two ways in which a beetle differs from a scorpion in its body. [2]\n\n(d) Draw a neat, labelled diagram of an insect, naming five parts. [3]`,
  model: `**(a)** Beetle legs = ${TRAY.beetles} × 6 = ${TRAY.beetleLegs}; scorpion legs = ${TRAY.scorpions} × 8 = ${TRAY.scorpionLegs}; total = **${TRAY.total}**.\n\n**(b)** **Arthropoda**: **jointed legs** and a hard outer skeleton (**exoskeleton**), with a segmented body.\n\n**(c)** A beetle has **six legs** and **three body regions** (and antennae and wings); a scorpion has **eight legs** and **two body regions**, with no antennae or wings.\n\n**(d)** A body in three regions: **head** with **antenna**, **thorax** with three pairs of legs and a **wing**, and a segmented **abdomen**. Five labels.`,
  sol: `${TRAY.total} legs; Arthropoda with two features; legs and body regions differ; labelled insect.`,
  scheme: [['Legs of beetles and scorpions', 1], [`${TRAY.total}`, 1], ['Arthropoda', 1], ['Jointed legs', 1], ['Exoskeleton or segmented body', 1], ['First difference', 1], ['Second difference', 1], ['Insect outline in three regions', 1], ['Five labels', 2]],
  d: 3, c: 'application', t: [4],
}), (q) => TRAY.total === 86 || 'total');
add('worm-long', long({
  marks: 10, wl: null,
  stem: 'Three worms are cut across and studied under a lens. Worm X has solid tissue between its body wall and its gut. Worm Y has a cavity between its body wall and its gut, but the cavity is not lined all round. Worm Z has a cavity lined all round, and its body is made of many rings.\n\n(a) State the kind of body cavity of X, Y and Z. [3]\n\n(b) Name the phylum of each worm. [3]\n\n(c) Give one example each of worm X and worm Y. [2]\n\n(d) Draw a neat, labelled diagram of the cross-section of worm Z, showing the body wall, the cavity and the gut. [2]',
  model: '**(a)** X: **no body cavity**; Y: **false body cavity**; Z: **true body cavity (coelom)**.\n\n**(b)** X: **Platyhelminthes**; Y: **Nemathelminthes**; Z: **Annelida**.\n\n**(c)** X: **tapeworm** (liver fluke, Planaria); Y: **Ascaris** (hookworm, filarial worm).\n\n**(d)** A circle for the **body wall**; inside it a **coelom** lined all round; at the centre the **gut**. Three labels.',
  sol: 'None, false, true cavity; Platyhelminthes, Nemathelminthes, Annelida; tapeworm and Ascaris; labelled cross-section.',
  scheme: [['X cavity', 1], ['Y cavity', 1], ['Z cavity', 1], ['X phylum', 1], ['Y phylum', 1], ['Z phylum', 1], ['Example of X', 1], ['Example of Y', 1], ['Cross-section with body wall, cavity and gut drawn and labelled', 2]],
  d: 3, c: 'application', t: [3],
}));
add('heart-long', long({
  marks: 10, wl: null,
  stem: 'The hearts of four vertebrates are studied. P has one atrium and one ventricle. Q has two atria and one ventricle. R has two atria and two ventricles, and the animal lays hard-shelled eggs. S has two atria and two ventricles, and the young are fed on milk.\n\n(a) State the number of chambers in the heart of P and Q, and of R and S. [2]\n\n(b) Name the class of R and the class of S. [2]\n\n(c) Name the two classes that could have the heart of Q and state one feature that separates them. [3]\n\n(d) Draw neat, labelled block diagrams of the hearts of P and S, naming the atrium and ventricle. [3]',
  model: '**(a)** P has **two** chambers and Q has **three**; R and S each have **four**.\n\n**(b)** R: **Aves**; S: **Mammalia**.\n\n**(c)** **Amphibia** and **Reptilia**. Amphibians have **moist skin and a gilled larva**; reptiles have **dry scales** and lay shelled eggs on land.\n\n**(d)** P: one **atrium** block above one **ventricle** block. S: two **atria** blocks above two **ventricle** blocks. All blocks labelled.',
  sol: 'Two, three, four, four; Aves and Mammalia; Amphibia and Reptilia with a separating feature; block diagrams.',
  scheme: [['P and Q chambers', 1], ['R and S chambers', 1], ['R: Aves', 1], ['S: Mammalia', 1], ['Amphibia and Reptilia named', 1], ['A separating feature', 2], ['Block diagram of P', 1], ['Block diagram of S with labels', 2]],
  d: 3, c: 'application', t: [5, 6],
}));
add('mystery-long', long({
  marks: 10, wl: null,
  stem: 'A museum label card was lost for four animals. W lives in the sea, has spiny skin and five arms. X flies at night, is warm-blooded and has hair and mammary glands. Y lives only in water and has scales, fins, gills and a two-chambered heart. Z has no legs, dry scaly skin and lays leathery-shelled eggs on land.\n\n(a) Name the phylum or class of W, X, Y and Z. [4]\n\n(b) A student says that X is a bird because it flies. State two reasons to show that the student is wrong. [2]\n\n(c) Z has no legs. Give two features that show that Z is a chordate and not a worm. [2]\n\n(d) Draw a neat outline of Y and label the fins, the tail, the gill region and the scales. [2]',
  model: '**(a)** W: **Echinodermata**; X: **Mammalia**; Y: **Pisces**; Z: **Reptilia**.\n\n**(b)** X has **hair** and **mammary glands** (it feeds its young on milk); birds have **feathers** and lay **hard-shelled eggs**.\n\n**(c)** Any two: Z has a **notochord (backbone)**, a **dorsal hollow nerve cord**, **gill slits at some stage** (embryo), a heart on the belly side.\n\n**(d)** A streamlined fish body with **fins**, a **tail**, a **gill cover** and **scales**. Four labels.',
  sol: 'Echinodermata, Mammalia, Pisces, Reptilia; hair and mammary glands; notochord and dorsal nerve cord; labelled fish.',
  scheme: [['W', 1], ['X', 1], ['Y', 1], ['Z', 1], ['First reason', 1], ['Second reason', 1], ['First chordate feature', 1], ['Second chordate feature', 1], ['Fish outline with four labels', 2]].map(([a, b]) => [a, b]),
  d: 4, c: 'analysis', t: [1, 4, 5, 6],
}));
add('shelf-long', long({
  marks: 10, wl: null,
  stem: `A shelf holds ${SHELF.total} vertebrate specimens: ${SHELF.Pisces} fishes, ${SHELF.Amphibia} amphibians, ${SHELF.Reptilia} reptiles, ${SHELF.Aves} birds and ${SHELF.Mammalia} mammals.\n\n(a) Calculate the number of cold-blooded specimens and their percentage of all the specimens, correct to one decimal place. [3]\n\n(b) Name the warm-blooded classes and state the number of heart chambers in them. [2]\n\n(c) State two differences between amphibians and reptiles. [2]\n\n(d) Draw a neat, labelled diagram of a frog, naming four parts. [3]`,
  model: `**(a)** Cold-blooded = ${SHELF.Pisces} + ${SHELF.Amphibia} + ${SHELF.Reptilia} = **${SHELF.coldBlooded}**; percentage = ${SHELF.coldBlooded} ÷ ${SHELF.total} × 100 = **${SHELF.pctCold} percent**.\n\n**(b)** **Aves** and **Mammalia**; each has **four** chambers.\n\n**(c)** Amphibians have **moist skin** and lay eggs **in water** (larva with gills); reptiles have **dry scales** and lay **shelled eggs on land**. (Amphibians have a larval stage and metamorphosis.)\n\n**(d)** A frog with a broad **head**, **eyes**, **nostrils**, short **forelimbs** and long **hind limbs** with **webbed feet**. Four labels.`,
  sol: `${SHELF.coldBlooded} cold-blooded, ${SHELF.pctCold} percent; Aves and Mammalia with four chambers; skin and eggs differ; labelled frog.`,
  scheme: [['Cold-blooded classes added', 1], [`${SHELF.coldBlooded}`, 1], [`${SHELF.pctCold} percent`, 1], ['Aves and Mammalia', 1], ['Four chambers', 1], ['First difference', 1], ['Second difference', 1], ['Frog outline drawn', 1], ['Four labels', 2]],
  d: 3, c: 'application', t: [5, 6],
}), (q) => SHELF.pctCold === 73.3 || 'pct');
add('star-long', long({
  marks: 10, wl: null,
  stem: 'On a rocky shore a boy finds a starfish, a snail and an octopus in a rock pool.\n\n(a) Name the phylum of each of the three animals. [2]\n\n(b) The octopus has no shell. State two features that show that it is closely related to the snail. [2]\n\n(c) Tabulate three differences between the starfish and the snail. [3]\n\n(d) Draw a neat, labelled diagram of the starfish, seen from above, naming three parts. [3]',
  model: '**(a)** Starfish: **Echinodermata**; snail and octopus: **Mollusca**.\n\n**(b)** Both have a **soft, unsegmented body** with a **mantle**, and a **muscular foot** (modified into arms in the octopus).\n\n**(c)**\n\n| Starfish | Snail |\n|---|---|\n| **Spiny** skin | **Soft** body with a mantle |\n| Moves on **tube feet** | Moves on a **muscular foot** |\n| Body in **five parts**, no shell | Usually a **coiled shell** |\n\n**(d)** A star with **five arms** and a central **disc**; **tube feet** along the arms and the **mouth** on the underside. Three labels.',
  sol: 'Echinodermata and Mollusca; soft body with mantle and foot; three differences; labelled starfish.',
  scheme: [['Starfish phylum', 1], ['Snail and octopus phylum', 1], ['First shared feature', 1], ['Second shared feature', 1], ['First difference', 1], ['Second difference', 1], ['Third difference', 1], ['Starfish outline with five arms', 1], ['Three labels', 2]],
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- extra items that keep the two chapter tests free of answer give-aways
add('vert-mcq', mcq({
  stem: 'A student has pictures of a leech, a sea urchin, a toad and Hydra. Which one is a vertebrate?',
  right: 'Toad', wrong: ['Leech', 'Sea urchin', 'Hydra'],
  sol: 'The toad is an amphibian, a chordate with a backbone; the other three are non-chordates — option (@K).',
  d: 2, c: 'application', t: [1, 5],
}));
add('noto-short', short({
  marks: 2,
  stem: 'What is a notochord? State what replaces it in a vertebrate.',
  model: 'A **notochord** is a **stiff supporting rod along the back** of a chordate. In a vertebrate it is **replaced by the backbone** (vertebral column) as the animal grows.',
  sol: 'Rod along the back; replaced by the backbone.',
  scheme: [['Rod along the back', 1], ['Replaced by the backbone', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('gill-short', short({
  marks: 2,
  stem: 'State two features of a fish that help it to live in water.',
  model: 'A fish has **gills** to take oxygen from the water, and **fins** and a **streamlined body** (with a slimy, scaly skin) for swimming.',
  sol: 'Gills; fins and streamlined body.',
  scheme: [['Gills for breathing', 1], ['Fins or streamlined body for swimming', 1]],
  d: 2, c: 'application', t: [5],
}));
