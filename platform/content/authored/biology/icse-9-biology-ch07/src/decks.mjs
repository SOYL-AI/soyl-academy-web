// ICSE 9 Biology ch07 Diversity in the Animal Kingdom — Part 1 (non-chordates: t01 basis, t02, t03, t04), Part 2 (chordates: t01, t05, t06).
import { sl, deck, table, flow, svgV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { TREE, COELOM, SPONGE_HYDRA, INSECT, HEARTS, STAR_SNAIL } from './svgs.mjs';
import { SURVEY, LEGS, SHELF, HEART } from './calc.mjs';

export const V = {
  tree: svgV(TREE, 'The animal kingdom divided into non-chordates and chordates, with the phyla and classes named'),
  coelom: svgV(COELOM, 'Three kinds of body cavity in cross-section: none, a false cavity and a true cavity'),
  spongeHydra: svgV(SPONGE_HYDRA, 'A sponge and a Hydra with their parts labelled'),
  insect: svgV(INSECT, 'An insect with head, thorax, abdomen, antenna, wing and jointed legs labelled'),
  hearts: svgV(HEARTS, 'The number of heart chambers in fish, amphibians, reptiles, birds and mammals'),
  starSnail: svgV(STAR_SNAIL, 'A starfish and a snail with their parts labelled'),
};

export const deck1 = deck({
  part: 1,
  title: 'Diversity in the Animal Kingdom — Part 1: Non-chordates',
  goals: [
    'State how chordates differ from non-chordates',
    'Describe the main features and examples of the eight non-chordate phyla',
    'Classify a given non-chordate into its phylum with reasons',
  ],
  slides: [
    sl('title', 'Sorting the Animal Kingdom', {
      b: 'Part 1 — the first big split: animals without a notochord.',
      v: flow('LR', [['k', 'Kingdom Animalia'], ['n', 'Non-chordates: eight phyla'], ['c', 'Chordates: five classes']], [['k', 'n'], ['k', 'c']], 'Flow from the animal kingdom to the non-chordates and the chordates'),
      n: 'Millions of kinds of animals share our planet. To study them, biologists sort them into groups by their body features. The first big split is between animals with a notochord and animals without one.',
    }),
    sl('diagram', 'Two big groups', {
      b: 'The kingdom **Animalia** is divided into **non-chordates** (eight phyla in this course) and **chordates**.',
      v: V.tree,
      n: 'Here is the whole plan. Non-chordates are split into eight phyla, from sponges to starfish. Chordates, which include all vertebrates, are split into five classes, from fishes to mammals.',
    }),
    sl('concept', 'Chordates and non-chordates', {
      v: table(['Feature', 'Non-chordates', 'Chordates'], [['Notochord', 'Absent', 'Present at some stage of life'], ['Nerve cord', 'Solid and on the belly side', 'Hollow and on the back side'], ['Gill slits', 'Absent', 'Present at some stage'], ['Heart', 'On the back side, when present', 'On the belly side']], 'Table comparing non-chordates and chordates by notochord, nerve cord, gill slits and heart'),
      n: 'A notochord is a stiff rod along the back that supports the body. Chordates have it, at least when young, along with a hollow nerve cord on the back and gill slits. Non-chordates have none of these.',
    }),
    sl('check', 'Quick check: the notochord', {
      b: 'Which feature is found only in chordates?',
      chk: 'notochord-chk',
      n: 'Think of the rod along the back.',
    }),
    sl('diagram', 'Sponges and Hydra', {
      b: 'A sponge is full of **pores**; a Hydra has **tentacles** with **stinging cells**.',
      v: V.spongeHydra,
      n: 'On the left is a sponge, fixed to a rock. Water enters through tiny pores and leaves through the large opening at the top. On the right is Hydra, with a ring of tentacles that carry stinging cells.',
    }),
    sl('concept', 'Porifera and Coelenterata', {
      v: table(['Feature', 'Porifera', 'Coelenterata'], [['Body', 'Many pores and one large opening, the osculum', 'Tube-shaped, with tentacles around the mouth'], ['Special cells', 'Collar-bearing cells line the cavity', 'Stinging cells called cnidoblasts'], ['Support', 'Spicules or fibres', 'Soft body, no skeleton in Hydra'], ['Examples', 'Sycon, Spongilla, bath sponge', 'Hydra, jellyfish, sea anemone, coral']], 'Table comparing sponges and coelenterates by body, special cells, support and examples'),
      n: 'Sponges are pore bearers, which is what the name Porifera means. Coelenterates catch their prey with stinging cells on the tentacles, and a single opening serves as both mouth and anus.',
    }),
    sl('check', 'Quick check: stinging cells', {
      b: 'What are the stinging cells of a Hydra called?',
      chk: 'cnido-chk',
      n: 'The tentacles carry them.',
    }),
    sl('diagram', 'Three kinds of body cavity', {
      b: 'Worm-like animals differ in their **body cavity**: **none**, a **false cavity** or a **true cavity (coelom)**.',
      v: V.coelom,
      n: 'Cut across a worm and look at the space around its gut. A flatworm has solid tissue and no cavity. A roundworm has a cavity that is not fully lined. A segmented worm has a true cavity, lined all round.',
    }),
    sl('concept', 'The three worm phyla', {
      v: table(['Phylum', 'Body shape', 'Body cavity', 'Examples'], [['Platyhelminthes', 'Flat, leaf-like or ribbon-like', 'None', 'Planaria, liver fluke, tapeworm'], ['Nemathelminthes', 'Round, unsegmented, pointed ends', 'False cavity', 'Ascaris, hookworm, filarial worm'], ['Annelida', 'Long, divided into many rings', 'True cavity', 'Earthworm, leech, Nereis']], 'Table comparing flatworms, roundworms and segmented worms by shape, body cavity and examples'),
      n: 'Flatworms are flat and have no body cavity. Roundworms are round, with a false cavity. Annelids have a body divided into rings and a true cavity. Many flatworms and roundworms are parasites.',
    }),
    sl('check', 'Quick check: a false cavity', {
      b: 'Which phylum has a false body cavity?',
      chk: 'worm-chk',
      n: 'Think of the round, unsegmented worms.',
    }),
    sl('diagram', 'Arthropoda: jointed legs', {
      b: 'Arthropods have **jointed legs**, a **hard outer covering** and a **segmented body**. An insect has **three** pairs of legs.',
      v: V.insect,
      n: 'The arthropods are the biggest phylum. Their name means jointed feet. This insect has a head, a thorax carrying three pairs of legs and a wing, and a segmented abdomen, all covered by a hard outer skeleton.',
    }),
    sl('diagram', 'Molluscs and echinoderms', {
      b: 'A **mollusc** has a **soft body**, often with a **shell** and a **muscular foot**. An **echinoderm** has **spiny skin** and **tube feet**.',
      v: V.starSnail,
      n: 'A snail is a mollusc. Its soft body is protected by a shell, and it creeps on a muscular foot. A starfish is an echinoderm. Its skin is spiny, and it moves on tube feet along its five arms.',
    }),
    sl('concept', 'Arthropoda, Mollusca, Echinodermata', {
      v: table(['Phylum', 'Key features', 'Examples'], [['Arthropoda', 'Jointed legs; hard outer skeleton; body in segments', 'Cockroach, prawn, spider, centipede'], ['Mollusca', 'Soft unsegmented body; mantle; usually a shell; muscular foot', 'Snail, mussel, octopus, cuttlefish'], ['Echinodermata', 'Spiny skin; tube feet; five-part body in adults; all marine', 'Starfish, sea urchin, sea cucumber']], 'Table of the key features and examples of Arthropoda, Mollusca and Echinodermata'),
      n: 'Remember one clue for each phylum. Jointed legs mean arthropod. A soft body with a foot and often a shell means mollusc. Spiny skin with tube feet means echinoderm. Octopus and cuttlefish are molluscs even though they have no outer shell.',
    }),
    sl('example', 'Worked example 1: counting legs', {
      b: `A jar holds ${LEGS.insects} insects and ${LEGS.spiders} spiders. Insects have ${LEGS.perInsect} legs and spiders have ${LEGS.perSpider} legs. How many legs are there in all?`,
      ul: [`Step 1: insect legs = ${LEGS.insects} × ${LEGS.perInsect} = **${LEGS.insectLegs}**.`, `Step 2: spider legs = ${LEGS.spiders} × ${LEGS.perSpider} = **${LEGS.spiderLegs}**.`, `Step 3: total = ${LEGS.insectLegs} + ${LEGS.spiderLegs} = **${LEGS.total}**. Both animals have jointed legs, so both belong to **Arthropoda**.`],
      v: table(['Animal', 'Number', 'Legs each', 'Legs in all'], [['Insect', String(LEGS.insects), String(LEGS.perInsect), String(LEGS.insectLegs)], ['Spider', String(LEGS.spiders), String(LEGS.perSpider), String(LEGS.spiderLegs)], ['Whole jar', String(LEGS.insects + LEGS.spiders), '—', String(LEGS.total)]], 'Worked table of legs counted in a jar of insects and spiders'),
      n: 'Work out the legs for each animal first, then add them. Seven insects with six legs each give forty two legs. Three spiders with eight legs each give twenty four. That makes sixty six legs, and all of these animals are arthropods.',
    }),
    sl('check', 'Quick check: jointed legs', {
      b: 'Which phylum has jointed legs and a hard outer skeleton?',
      chk: 'arthro-chk',
      n: 'The name means jointed feet.',
    }),
    sl('example', 'Worked example 2: a survey tally', {
      b: `A class collected ${SURVEY.total} animals on a shore and a pond: ${SURVEY.Arthropoda} arthropods, ${SURVEY.Mollusca} molluscs, ${SURVEY.Echinodermata} echinoderms, ${SURVEY.Annelida} annelids and ${SURVEY.Coelenterata} coelenterates. What percentage were arthropods, and how many were molluscs or annelids?`,
      ul: [`Step 1: percentage of arthropods = ${SURVEY.Arthropoda} ÷ ${SURVEY.total} × 100 = **${SURVEY.pctArthropoda} percent**.`, `Step 2: molluscs and annelids together = ${SURVEY.Mollusca} + ${SURVEY.Annelida} = **${SURVEY.softBodied}**.`],
      v: table(['Phylum', 'Animals', 'Share'], [['Arthropoda', String(SURVEY.Arthropoda), `${SURVEY.pctArthropoda} percent`], ['Mollusca', String(SURVEY.Mollusca), `${SURVEY.pctMollusca} percent`], ['Echinodermata', String(SURVEY.Echinodermata), '15 percent'], ['Annelida', String(SURVEY.Annelida), '10 percent'], ['Coelenterata', String(SURVEY.Coelenterata), '10 percent']], 'Worked table of a survey of forty animals by phylum with the percentage in each'),
      n: 'Divide the number in one group by the total and multiply by one hundred. Sixteen out of forty is forty percent. For molluscs and annelids together, simply add the two counts, which gives fourteen.',
    }),
    sl('summary', 'Summary', {
      ul: ['Chordates have a notochord, a hollow nerve cord on the back and gill slits; non-chordates have none of these.', 'Porifera: pores. Coelenterata: tentacles and stinging cells.', 'Worms: flat (no cavity), round (false cavity), ringed (true cavity).', 'Arthropoda: jointed legs. Mollusca: soft body and foot. Echinodermata: spiny skin and tube feet.'],
      v: table(['Phylum', 'One clue'], [['Porifera', 'Pores'], ['Coelenterata', 'Stinging cells'], ['Platyhelminthes', 'Flat body'], ['Nemathelminthes', 'Round, false cavity'], ['Annelida', 'Rings'], ['Arthropoda', 'Jointed legs'], ['Mollusca', 'Soft body, foot'], ['Echinodermata', 'Spiny skin']], 'Summary table of one clue for each of the eight non-chordate phyla'),
      n: 'To recap. Learn one clue for each phylum: pores, stinging cells, flat body, round body, rings, jointed legs, soft body with a foot, and spiny skin with tube feet.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Always give the **phylum name** and at least **one feature** as the reason.', 'Spell the phyla correctly: **Nemathelminthes**, **Platyhelminthes**, **Coelenterata**.', 'Octopus and cuttlefish are **molluscs**; a spider is an **arthropod**, not an insect.', 'In a labelled diagram, draw **ruled lines** that touch the part.'],
      n: 'Exam tips. Name the phylum and give one feature as your reason. Spell the phylum names carefully. Remember that an octopus is a mollusc and that a spider is an arthropod but not an insect. Label diagrams with ruled lines.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Diversity in the Animal Kingdom — Part 2: Chordates',
  goals: [
    'State the distinguishing features of the five classes of vertebrates',
    'Give examples of each class',
    'Classify a given vertebrate into its class with reasons',
  ],
  slides: [
    sl('title', 'The Chordates', {
      b: 'Part 2 — animals with a notochord, and their five classes.',
      v: flow('LR', [['c', 'Chordates'], ['p', 'Pisces'], ['a', 'Amphibia'], ['r', 'Reptilia'], ['b', 'Aves'], ['m', 'Mammalia']], [['c', 'p'], ['p', 'a'], ['a', 'r'], ['r', 'b'], ['b', 'm']], 'Flow listing the five classes of chordates in order: Pisces, Amphibia, Reptilia, Aves and Mammalia'),
      n: 'The chordates in this course are all vertebrates, animals with a backbone. They are divided into five classes: fishes, amphibians, reptiles, birds and mammals.',
    }),
    sl('concept', 'What makes a chordate', {
      v: table(['Feature', 'What it is'], [['Notochord', 'A stiff supporting rod along the back, replaced by the backbone in vertebrates'], ['Dorsal hollow nerve cord', 'The spinal cord, lying along the back'], ['Pharyngeal gill slits', 'Slits in the throat, at least in the embryo'], ['Other signs', 'Heart on the belly side; a tail behind the anus at some stage']], 'Table of the features of chordates'),
      n: 'Chordates share three key features. A notochord along the back, a hollow nerve cord above it, and gill slits in the throat. In vertebrates the notochord is replaced by the backbone as the animal grows.',
    }),
    sl('concept', 'Pisces and Amphibia', {
      v: table(['Feature', 'Pisces (fishes)', 'Amphibia'], [['Habitat', 'Water only', 'Land and water'], ['Skin', 'Covered with scales', 'Moist, smooth, without scales'], ['Breathing', 'Gills', 'Skin and lungs; gills in the young'], ['Heart', 'Two chambers', 'Three chambers'], ['Examples', 'Rohu, shark, seahorse', 'Frog, toad, salamander']], 'Table comparing fishes and amphibians by habitat, skin, breathing, heart and examples'),
      n: 'Fishes live in water, breathe with gills, have scales and fins, and a two chambered heart. Amphibians live both on land and in water, with moist skin and a three chambered heart. The young breathe with gills and change into adults by metamorphosis.',
    }),
    sl('check', 'Quick check: moist skin', {
      b: 'Which class has a moist skin without scales and a larva that has gills?',
      chk: 'fish-chk',
      n: 'The young change shape as they grow.',
    }),
    sl('concept', 'Reptilia, Aves and Mammalia', {
      v: table(['Feature', 'Reptilia', 'Aves', 'Mammalia'], [['Body covering', 'Dry scales', 'Feathers', 'Hair'], ['Limbs', 'Four short legs, or none in snakes', 'Forelimbs are wings', 'Limbs for walking, flying or swimming'], ['Heart', 'Three chambers', 'Four chambers', 'Four chambers'], ['Body temperature', 'Varies with surroundings', 'Constant', 'Constant'], ['Young', 'Shelled eggs on land', 'Hard-shelled eggs', 'Born alive, fed on milk (most)'], ['Examples', 'Lizard, snake, turtle', 'Crow, pigeon, penguin', 'Human, bat, whale']], 'Table comparing reptiles, birds and mammals by body covering, limbs, heart, body temperature, young and examples'),
      n: 'Reptiles have dry scales and lay shelled eggs on land. Birds have feathers, wings and a beak. Mammals have hair and feed their young on milk from mammary glands. Birds and mammals are warm blooded.',
    }),
    sl('diagram', 'Heart chambers', {
      b: 'The number of **heart chambers** rises from **two** in fishes to **four** in birds and mammals.',
      v: V.hearts,
      n: 'Look at how the heart changes. Fishes have one atrium and one ventricle. Amphibians and reptiles have two atria and one ventricle. Birds and mammals have two atria and two ventricles, which keeps oxygen rich blood separate.',
    }),
    sl('check', 'Quick check: four chambers', {
      b: 'Which pair of classes has a four-chambered heart?',
      chk: 'heart-chk',
      n: 'Both are warm blooded.',
    }),
    sl('example', 'Worked example 1: which class?', {
      b: 'An animal has dry scaly skin, four short legs, lungs, a three-chambered heart and lays leathery-shelled eggs on land. Which class is it?',
      ul: ['Step 1: list the clues: **dry scales**, **three-chambered heart**, **eggs with a shell on land**.', 'Step 2: scales rule out amphibians (moist skin) and mammals (hair); the heart rules out birds and mammals.', 'Step 3: only **Reptilia** fits all the clues. A lizard is an example.'],
      v: table(['Clue', 'Points to', 'Rules out'], [['Dry scaly skin', 'Reptilia', 'Amphibia, Aves, Mammalia'], ['Three-chambered heart', 'Amphibia or Reptilia', 'Aves, Mammalia, Pisces'], ['Shelled eggs on land', 'Reptilia, Aves', 'Pisces, Amphibia']], 'Worked table showing how three clues are used to decide that an animal is a reptile'),
      n: 'Use each clue to cross out classes. Dry scaly skin removes amphibians. A three chambered heart removes birds and mammals. Shelled eggs laid on land remove fishes. Only reptiles fit all the clues.',
    }),
    sl('concept', 'Comparing the five classes', {
      v: table(['Class', 'Heart chambers', 'Body temperature', 'Breathing organ'], [['Pisces', String(HEART.Pisces), 'Cold-blooded', 'Gills'], ['Amphibia', String(HEART.Amphibia), 'Cold-blooded', 'Skin and lungs'], ['Reptilia', String(HEART.Reptilia), 'Cold-blooded', 'Lungs'], ['Aves', String(HEART.Aves), 'Warm-blooded', 'Lungs'], ['Mammalia', String(HEART.Mammalia), 'Warm-blooded', 'Lungs']], 'Table of heart chambers, body temperature and breathing organ in the five vertebrate classes'),
      n: 'Compare the five classes side by side. Only birds and mammals are warm blooded, and only they have four heart chambers. Fishes breathe with gills, while reptiles, birds and mammals all breathe with lungs.',
    }),
    sl('check', 'Quick check: a flying mammal', {
      b: 'Why is a bat placed in the class Mammalia although it flies?',
      chk: 'bat-chk',
      n: 'Think of hair and milk.',
    }),
    sl('example', 'Worked example 2: a museum shelf', {
      b: `A shelf holds ${SHELF.total} vertebrate specimens: ${SHELF.Pisces} fishes, ${SHELF.Amphibia} amphibians, ${SHELF.Reptilia} reptiles, ${SHELF.Aves} birds and ${SHELF.Mammalia} mammals. How many are warm-blooded, and what percentage are cold-blooded?`,
      ul: [`Step 1: warm-blooded = birds + mammals = ${SHELF.Aves} + ${SHELF.Mammalia} = **${SHELF.warmBlooded}**.`, `Step 2: cold-blooded = ${SHELF.Pisces} + ${SHELF.Amphibia} + ${SHELF.Reptilia} = **${SHELF.coldBlooded}**.`, `Step 3: percentage cold-blooded = ${SHELF.coldBlooded} ÷ ${SHELF.total} × 100 = **${SHELF.pctCold} percent**.`],
      v: table(['Group', 'Classes', 'Specimens'], [['Cold-blooded', 'Pisces, Amphibia, Reptilia', String(SHELF.coldBlooded)], ['Warm-blooded', 'Aves, Mammalia', String(SHELF.warmBlooded)], ['Shelf', 'All five', String(SHELF.total)]], 'Worked table of cold-blooded and warm-blooded specimens on a shelf of thirty'),
      n: 'Sort the classes into warm blooded and cold blooded first. Birds and mammals are the warm blooded ones, so five plus three gives eight. The other twenty two are cold blooded, which is seventy three point three percent of thirty.',
    }),
    sl('diagram', 'A key to the classes', {
      b: 'Ask questions in order to reach the class.',
      v: flow('TB', [['q1', 'Gills and fins, scales?'], ['p', 'Pisces'], ['q2', 'Moist skin, larva with gills?'], ['am', 'Amphibia'], ['q3', 'Feathers?'], ['av', 'Aves'], ['q4', 'Hair and milk glands?'], ['ma', 'Mammalia'], ['re', 'Reptilia']], [['q1', 'p', 'yes'], ['q1', 'q2', 'no'], ['q2', 'am', 'yes'], ['q2', 'q3', 'no'], ['q3', 'av', 'yes'], ['q3', 'q4', 'no'], ['q4', 'ma', 'yes'], ['q4', 're', 'no']], 'Flow chart of questions that leads to one of the five vertebrate classes'),
      n: 'A key works by asking one question at a time. Gills and fins mean fish. Moist skin with a gilled young stage means amphibian. Feathers mean bird. Hair and milk glands mean mammal. Dry scales without these other signs mean reptile.',
    }),
    sl('check', 'Quick check: dry scaly skin', {
      b: 'Which class lays shelled eggs on land and has dry, scaly skin?',
      chk: 'reptile-chk',
      n: 'Think of a lizard.',
    }),
    sl('summary', 'Summary', {
      ul: ['Chordates: notochord, hollow nerve cord on the back, gill slits.', 'Pisces: gills, scales, two chambers. Amphibia: moist skin, metamorphosis, three chambers.', 'Reptilia: dry scales, shelled eggs on land. Aves: feathers, wings, four chambers. Mammalia: hair, milk glands, four chambers.', 'Only birds and mammals are warm-blooded.'],
      v: table(['Class', 'Example', 'One clue'], [['Pisces', 'Rohu', 'Gills and scales'], ['Amphibia', 'Frog', 'Moist skin, metamorphosis'], ['Reptilia', 'Lizard', 'Dry scales'], ['Aves', 'Crow', 'Feathers'], ['Mammalia', 'Human', 'Hair and milk glands']], 'Summary table of the five classes with an example and one clue each'),
      n: 'To recap. Fishes have gills and scales. Amphibians have moist skin and metamorphosis. Reptiles have dry scales. Birds have feathers, and mammals have hair and milk glands. Birds and mammals are warm blooded.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Support every class with **two or more features** and an **example**.', 'A **bat** is a mammal, a **whale** is a mammal, a **penguin** is a bird.', 'Write **metamorphosis** for amphibians; **warm-blooded** for birds and mammals.', 'Compare in a **table** when the question says differences.'],
      n: 'Exam tips. Give two or more features and an example for each class. Remember that bats and whales are mammals and penguins are birds. Use the word metamorphosis for amphibians. Write differences in a table, point by point.',
    }),
  ],
});
