// ch11 Diversity: question bank. MCQ keys are placed by the builder (balanced).
// AR keys planned: b (ar-binomial), a (ar-fern), d (ar-sponge), c (ar-virus), a (ar-monera), b (ar-bat).
// Numericals are computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 classification and five kingdoms
add('chk-hier', mcq({
  stem: 'Two animals belong to the same family but to different genera. Which statement must be true for them?',
  right: 'They share the same kingdom, phylum, class and order.',
  wrong: ['They belong to the same species.', 'They belong to the same genus.', 'They belong to different orders.'],
  sol: 'Ranks nest inside one another. Animals in the same family must also be in the same order, class, phylum and kingdom — option (@K). Different genera means they are not in the same genus or species.',
  d: 2, c: 'application', t: [1],
}));
add('basis-mcq', mcq({
  stem: 'A student suggests sorting all living things first by habitat: those that live in water and those that live on land. Why would scientists reject this as a first step?',
  right: 'Organisms with very different fundamental features, such as a whale and a shark, would be placed together.',
  wrong: ['Water and land cannot be told apart in nature.', 'Every organism in water belongs to the same kingdom.', 'Habitat never has any effect on an organism.'],
  sol: 'Classification starts with fundamental features such as cell type, body organisation and nutrition. Habitat would group a whale with a shark although they differ in many basic features — option (@K).',
  d: 3, c: 'evaluation', t: [1],
}));
add('chk-kingdom', mcq({
  stem: 'A one-celled organism from pond water has a clear nucleus and no cell wall, and it moves by pushing out false feet and engulfing bacteria. Which kingdom does it belong to?',
  right: 'Protista',
  wrong: ['Monera', 'Fungi', 'Plantae'],
  sol: 'A nucleus rules out Monera. One cell and no cell wall rule out Fungi and Plantae. A one-celled eukaryote like this Amoeba is a protist — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('stump-mcq', mcq({
  stem: 'A forester finds a shelf-shaped growth on a rotting tree stump. Its cells have walls of chitin, it has no chlorophyll, and it absorbs food from the dead wood. It belongs to kingdom:',
  right: 'Fungi',
  wrong: ['Plantae', 'Monera', 'Animalia'],
  sol: 'A chitin cell wall, no chlorophyll and absorption of ready-made food are the features of Fungi — option (@K). Plants have cellulose walls and make food; animals have no wall.',
  d: 2, c: 'application', t: [1],
}));
add('cyano-mcq', mcq({
  stem: 'Cyanobacteria make food by photosynthesis, like green plants, yet they are placed in Monera and not in Plantae. The best reason is that:',
  right: 'their cells have no nucleus and no membrane-bound organelles',
  wrong: ['they live in water', 'they are too small to be seen with the eye', 'they have no cell wall'],
  sol: 'Cell type is the first criterion. Cyanobacteria are prokaryotes, so they go in Monera even though they photosynthesise — option (@K). Many bacteria do have a cell wall, and living in water does not decide the kingdom.',
  d: 3, c: 'analysis', t: [1],
}));
add('yeast-mcq', mcq({
  stem: 'Baker’s yeast is one-celled and has a nucleus, yet it is placed in kingdom Fungi and not Protista. Which feature is the best reason?',
  right: 'It has a cell wall of chitin and absorbs ready-made food.',
  wrong: ['It is made of a single cell.', 'It has a true nucleus.', 'It is used to make dough rise.'],
  sol: 'Protists also have one cell and a nucleus, so those cannot decide the kingdom. A chitin wall and absorption of food are features of Fungi — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('nutri-mcq', mcq({
  stem: 'Which row correctly matches each kingdom with its usual mode of nutrition?',
  right: 'Plantae: photosynthesis; Fungi: absorbing ready-made food; Animalia: eating other organisms',
  wrong: ['Plantae: eating other organisms; Fungi: photosynthesis; Animalia: absorbing ready-made food', 'Plantae: absorbing ready-made food; Fungi: eating other organisms; Animalia: photosynthesis', 'Plantae: photosynthesis; Fungi: photosynthesis; Animalia: absorbing ready-made food'],
  sol: 'Plants make food by photosynthesis, fungi absorb ready-made food, and animals eat other organisms — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-monera', ar({
  a: 'Bacteria are placed in kingdom Monera.',
  r: 'Bacterial cells have no true nucleus and no membrane-bound organelles.',
  key: 'a',
  sol: 'Monera is the kingdom of prokaryotes, and bacteria are prokaryotes because they have no true nucleus and no membrane-bound organelles. R explains A — option (a).',
  d: 2, c: 'analysis', t: [1],
}));
add('tf-chitin', tf({
  stem: 'The cell wall of a mushroom is made of chitin and not of cellulose.',
  key: 't',
  sol: 'True. Fungal cell walls contain chitin, while plant cell walls are made of cellulose.',
  d: 1, c: 'recall', t: [1],
}));
add('tf-capital', tf({
  stem: 'In the scientific name *Mangifera indica*, only the first word begins with a capital letter.',
  key: 't',
  sol: 'True. The genus name begins with a capital letter and the species name begins with a small letter.',
  d: 1, c: 'understanding', t: [3],
}));
add('fill-species', fill({
  stem: 'A group of organisms that can breed with each other and produce fertile offspring is called a ______.',
  acc: [['species', 'Species']],
  sol: 'The ability to breed and produce fertile offspring defines a species.',
  d: 1, c: 'recall', t: [1],
}));
add('match-kingdom', match({
  pairs: [['Monera', 'A cyanobacterium in a rice field'], ['Protista', 'Paramecium in pond water'], ['Fungi', 'Mould on a stale chapati'], ['Animalia', 'Hydra clinging to a pond weed']],
  order: [2, 0, 3, 1],
  stem: 'Match each kingdom (column I) with an organism in column II.',
  sol: 'A cyanobacterium is prokaryotic (Monera); Paramecium is a one-celled eukaryote (Protista); chapati mould is a fungus; Hydra is an animal.',
  d: 2, c: 'understanding', t: [1],
}));
add('num-percent', (() => {
  const plants = 27 + 9;
  const insects = 15;
  const birds = 6;
  const fungi = 3;
  const total = plants + insects + birds + fungi;
  const animals = insects + birds;
  const pct = (animals / total) * 100;
  return num({
    stem: `A student surveys a hill park and records ${total} different organisms (given): ${27} flowering plants, ${9} ferns and mosses together, ${insects} insects, ${birds} birds and ${fungi} kinds of mushroom. What percentage of the recorded organisms belong to kingdom Animalia?`,
    value: pct, tol: 0, unit: '%',
    sol: r`Animals are the insects and the birds: $${insects} + ${birds} = ${animals}$. The mushrooms are fungi and the other organisms are plants. Percentage $= \dfrac{${animals}}{${total}} \times 100 = ${pct}\%$.`,
    scheme: [['Identifies the animals: 15 insects and 6 birds make 21', 1], ['Divides by 60 and multiplies by 100 to get 35 %', 1]],
    marks: 2, d: 2, c: 'application', t: [1],
  });
})(), (q) => near((15 + 6) / (27 + 9 + 15 + 6 + 3) * 100, 35, 1e-9) && q.answer.value === 35 || 'percent');
add('s2-classify', short({
  marks: 2,
  stem: 'A librarian arranges 5000 books by subject on separate shelves. Give two reasons why biologists, too, arrange organisms into groups.',
  model: 'Grouping makes it easier to study the millions of kinds of organisms, just as subject shelves make books easy to find. It also shows which organisms are related, so we can guess the features of a new organism from its group.',
  sol: 'Easier study; shows relationships.',
  scheme: [['Makes the study of many organisms easier', 1], ['Shows how organisms are related', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('s2-monprot', short({
  marks: 2,
  stem: 'State two differences between the organisms of kingdom Monera and those of kingdom Protista.',
  model: 'Monera cells are prokaryotic, with no true nucleus and no membrane-bound organelles, whereas Protista cells are eukaryotic with a true nucleus and organelles. Monera include bacteria and cyanobacteria, whereas Protista include Amoeba and Paramecium.',
  sol: 'Prokaryotic against eukaryotic; examples.',
  scheme: [['Monera: no true nucleus or membrane-bound organelles; Protista: true nucleus and organelles', 1], ['Correct examples of each kingdom', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-mushroom', short({
  marks: 2,
  stem: 'A mushroom springs up from the soil after the first monsoon rain. Why is it placed in Fungi and not in Plantae?',
  model: 'A mushroom has no chlorophyll, so it cannot make its own food by photosynthesis. It absorbs ready-made food from dead matter, and its cell wall is made of chitin, not cellulose, so it belongs to Fungi.',
  sol: 'No chlorophyll and absorbs food; chitin wall.',
  scheme: [['No chlorophyll, so it absorbs ready-made food', 1], ['Cell wall of chitin, not cellulose', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s3-hier', short({
  marks: 3,
  stem: 'Write the ranks of classification in order from the largest to the smallest. What happens to the number of organisms and to the features they share as we go from kingdom down to species?',
  model: 'The ranks are kingdom, phylum (or division in plants), class, order, family, genus and species. As we go down, each group contains fewer organisms. The organisms in a lower group share more features, so the species is the most specific group and the kingdom the broadest.',
  sol: 'Seven ranks in order; fewer organisms; more shared features.',
  scheme: [['All seven ranks in the right order', 1], ['Fewer organisms in each lower group', 1], ['More shared features in each lower group', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('long-kingdoms', long({
  stem: 'Name the five kingdoms of Whittaker and the three criteria used to form them. For each kingdom, give one feature and one example.',
  model: 'Whittaker used three criteria: cell type, body organisation and mode of nutrition. Monera are prokaryotic single cells with no nucleus, such as bacteria. Protista are single-celled eukaryotes, such as Amoeba. Fungi are mostly many-celled, have chitin walls and absorb ready-made food, such as mushrooms. Plantae are many-celled eukaryotes with cellulose walls that make food by photosynthesis, such as mango. Animalia are many-celled eukaryotes with no cell wall that eat other organisms, such as a fish.',
  sol: 'Three criteria; five kingdoms with a feature and an example each.',
  scheme: [['Three criteria named', 1], ['Five kingdoms named', 1], ['A correct feature for each kingdom', 1.5], ['A correct example for each kingdom', 1.5]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 divisions of plants and animals
add('chk-plant', mcq({
  stem: 'A gardener finds a plant in a shady corner. It has a true root, a stem and feathery leaves, and brown spore cases on the underside of the leaves. It has no flowers or seeds. It belongs to:',
  right: 'Pteridophyta',
  wrong: ['Bryophyta', 'Gymnosperms', 'Angiosperms'],
  sol: 'A plant with true roots, stem and leaves and vascular tissue, but with spores instead of seeds, is a pteridophyte — option (@K). Bryophytes have no true roots, and the other two groups make seeds.',
  d: 2, c: 'application', t: [2],
}));
add('moss-mcq', mcq({
  stem: 'A green carpet of moss grows on a damp wall and never grows tall. Which pair of features explains this?',
  right: 'It has no vascular tissue and needs water for reproduction.',
  wrong: ['It has xylem but no phloem, and makes naked seeds.', 'It has true roots and makes spores in cones.', 'It makes flowers but has no leaves.'],
  sol: 'Bryophytes such as moss have no vascular tissue to carry water upwards and need water to reproduce, so they stay small and near damp places — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('deodar-mcq', mcq({
  stem: 'Cones of a deodar tree release winged seeds that were never enclosed inside a fruit. This tells us that deodar is a:',
  right: 'gymnosperm',
  wrong: ['dicot angiosperm', 'monocot angiosperm', 'pteridophyte'],
  sol: 'Plants whose seeds are naked and borne in cones are gymnosperms — option (@K). Angiosperm seeds are inside fruits and pteridophytes make no seeds.',
  d: 2, c: 'application', t: [2],
}));
add('seedling-mcq', mcq({
  stem: 'A seed is split open and has only one seed leaf. The seedling has leaves with parallel veins and a bunch of thin roots of nearly equal size. The plant is most likely:',
  right: 'wheat',
  wrong: ['gram', 'neem', 'mustard'],
  sol: 'One cotyledon, parallel veins and fibrous roots are features of a monocot such as wheat — option (@K). Gram, neem and mustard are dicots.',
  d: 2, c: 'application', t: [2],
}));
add('thallo-mcq', mcq({
  stem: 'Spirogyra forms green slimy threads in ponds. It is placed in Thallophyta because:',
  right: 'its body is not divided into root, stem and leaf',
  wrong: ['it has xylem and phloem', 'it makes seeds in cones', 'it lives only on dry land'],
  sol: 'Thallophytes have a simple body, a thallus, with no root, stem or leaf — option (@K). They have no vascular tissue and make no seeds.',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-fern', ar({
  a: 'A fern can grow taller and carry water to its fronds better than a moss.',
  r: 'A fern has vascular tissue, whereas a moss has none.',
  key: 'a',
  sol: 'Xylem and phloem carry water and food over long distances, so ferns can grow taller than mosses. R explains A — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('fill-naked', fill({
  stem: 'Plants whose seeds are not enclosed in a fruit are called ______.',
  acc: [['gymnosperms', 'Gymnosperms', 'gymnosperm']],
  sol: 'Gymnosperms have naked seeds, often in cones. Angiosperm seeds are inside fruits.',
  d: 1, c: 'recall', t: [2],
}));
add('s2-brypter', short({
  marks: 2,
  stem: 'Give two differences between a moss and a fern.',
  model: 'A fern has true roots, stem and leaves, whereas a moss has no true roots. A fern has vascular tissue to carry water and food, whereas a moss has none and so stays small and close to the damp ground.',
  sol: 'True roots and vascular tissue in a fern, absent in moss.',
  scheme: [['True roots, stem and leaves in fern; no true roots in moss', 1], ['Vascular tissue in fern; none in moss', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s2-monodi', short({
  marks: 2,
  stem: 'A maize seedling and a gram seedling are placed side by side. Give two features that distinguish them, and name the group of each.',
  model: 'The maize seedling has one cotyledon and leaves with parallel veins, so it is a monocot. The gram seedling has two cotyledons and leaves with net-like veins, so it is a dicot. Roots are fibrous in maize and a tap root in gram.',
  sol: 'Cotyledons and veins; monocot and dicot.',
  scheme: [['Two correct features such as cotyledons and veins', 1], ['Maize monocot and gram dicot', 1]],
  d: 2, c: 'application', t: [2],
}));
add('s3-plantsfeat', short({
  marks: 3,
  stem: 'A plant has true roots, stem and leaves, xylem and phloem, and makes seeds that are not enclosed in a fruit. Name its division, and explain how it differs from a pteridophyte and from an angiosperm.',
  model: 'The plant is a gymnosperm. A pteridophyte also has vascular tissue but makes spores and no seeds at all. An angiosperm also makes seeds, but its seeds are enclosed inside a fruit, whereas the seeds of a gymnosperm are naked and carried in cones.',
  sol: 'Gymnosperm; seeds against spores; naked against enclosed.',
  scheme: [['Division: gymnosperm', 1], ['Differs from pteridophyte: seeds, not spores', 1], ['Differs from angiosperm: naked seeds, no fruit', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('long-plants', long({
  stem: 'Classify the plant kingdom into its major divisions. For each division, give one distinguishing feature and one example.',
  model: 'The plant kingdom is divided into five divisions. Thallophyta are algae with a body that has no root, stem or leaf, such as Spirogyra. Bryophyta have no vascular tissue and need water to reproduce, such as moss. Pteridophyta have vascular tissue but reproduce by spores and make no seeds, such as fern. Gymnosperms make naked seeds in cones, such as pine. Angiosperms are flowering plants with seeds inside fruits, such as mango, and are divided into monocots, such as wheat, and dicots, such as gram.',
  sol: 'Five divisions with a feature and an example each.',
  scheme: [['Five divisions named', 1], ['A correct feature for each division', 2], ['A correct example for each division', 1], ['Angiosperms divided into monocots and dicots', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('chk-animal', mcq({
  stem: 'A slow animal found on a wet garden wall has a soft unsegmented body, a muscular foot and a hard coiled shell. Its phylum is:',
  right: 'Mollusca',
  wrong: ['Annelida', 'Arthropoda', 'Echinodermata'],
  sol: 'A soft body, a muscular foot and a shell describe a snail, a mollusc — option (@K). Annelids have bodies in rings, arthropods have jointed legs and echinoderms have spiny skin.',
  d: 2, c: 'application', t: [2],
}));
add('arthro-mcq', mcq({
  stem: 'A butterfly, a scorpion and a prawn look very different, but they are placed in one phylum. They all have:',
  right: 'jointed legs and a hard outer covering',
  wrong: ['a backbone and a notochord', 'a soft body with a muscular foot', 'stinging cells on their tentacles'],
  sol: 'Jointed legs and a hard outer covering define phylum Arthropoda — option (@K). The other options describe vertebrates, molluscs and cnidarians.',
  d: 2, c: 'application', t: [2],
}));
add('ostrich-mcq', mcq({
  stem: 'An ostrich cannot fly, yet it is placed in class Aves. The best reason is that it:',
  right: 'has feathers, has forelimbs modified as wings and lays hard-shelled eggs',
  wrong: ['can run very fast on land', 'has two legs and a long neck', 'lives on grasslands in warm regions'],
  sol: 'Class Aves is defined by features such as feathers, wings and hard-shelled eggs, not by the ability to fly — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('tadpole-mcq', mcq({
  stem: 'A tadpole breathes with gills in a pond, while the adult frog breathes with lungs and a moist skin and can live on land. A frog is placed in class:',
  right: 'Amphibia',
  wrong: ['Pisces', 'Reptilia', 'Mammalia'],
  sol: 'Animals that spend part of life in water and part on land, with a moist skin and a change in body form, are amphibians — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-sponge', ar({
  a: 'Sponges are plants because they stay fixed in one place.',
  r: 'Sponges have pores all over the body and no true tissues.',
  key: 'd',
  sol: 'Sponges are animals, in phylum Porifera, because they cannot make their own food; being fixed does not make an organism a plant. So A is false. R is a true description of sponges — option (d).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-bat', ar({
  a: 'A bat is placed in class Mammalia, not in class Aves.',
  r: 'A bat has wings and can fly, like a bird.',
  key: 'b',
  sol: 'A bat has hair and milk glands, so it is a mammal, and A is true. R is also true, but flying is not the basis for placing it in Mammalia, so R does not explain A — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('tf-whale', tf({
  stem: 'A whale is placed with the fishes because it lives in the sea and has flippers.',
  key: 'f',
  sol: 'False. A whale has hair, milk glands and a four-chambered heart and breathes with lungs, so it is a mammal.',
  d: 2, c: 'understanding', t: [2],
}));
add('fill-chordata', fill({
  stem: 'Animals that have a notochord at some stage of life belong to the phylum ______.',
  acc: [['Chordata', 'chordata']],
  sol: 'Chordata have a notochord, a nerve cord on the back and gill slits at some stage.',
  d: 1, c: 'recall', t: [2],
}));
add('match-phyla', match({
  pairs: [['Porifera', 'Pores all over the body'], ['Annelida', 'Body divided into rings'], ['Echinodermata', 'Spiny skin'], ['Mollusca', 'Soft body with a muscular foot']],
  order: [1, 3, 0, 2],
  stem: 'Match each phylum (column I) with its key feature (column II).',
  sol: 'Porifera have pores; Annelida have ring-like segments; Echinodermata have spiny skin; Mollusca have a soft body and a muscular foot.',
  d: 2, c: 'understanding', t: [2],
}));
add('s2-vert', short({
  marks: 2,
  stem: 'Name the class to which each belongs: (i) a rohu that breathes with gills and has scales, (ii) a crow that has feathers. State one more feature of each class.',
  model: 'The rohu is a fish, class Pisces, and it has fins and a two-chambered heart. The crow is a bird, class Aves, and it has a four-chambered heart and lays hard-shelled eggs.',
  sol: 'Pisces and Aves with a further feature each.',
  scheme: [['Rohu: Pisces, with one more feature', 1], ['Crow: Aves, with one more feature', 1]],
  d: 2, c: 'application', t: [2],
}));
add('s3-mamrep', short({
  marks: 3,
  stem: 'Give three differences between a mammal and a reptile, with one example of each.',
  model: 'A mammal has hair on its skin, whereas a reptile has dry scales. A mammal has mammary glands to feed its young, but a reptile has none. Most mammals give birth to young, whereas reptiles lay eggs. A cow is a mammal and a lizard is a reptile.',
  sol: 'Hair against scales; milk glands; birth against eggs.',
  scheme: [['Hair against dry scales', 1], ['Milk glands against none; birth against eggs', 1], ['Correct examples', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s3-invert', short({
  marks: 3,
  stem: 'Name the phylum of each animal and state one feature that helped you: a sponge, a tapeworm and a starfish.',
  model: 'The sponge is in phylum Porifera, because its body has many pores and it stays fixed in one place. The tapeworm is in Platyhelminthes, because its body is flat and has no body cavity. The starfish is in Echinodermata, because it has spiny skin and its body is arranged around a centre.',
  sol: 'Porifera, Platyhelminthes, Echinodermata with a feature each.',
  scheme: [['Sponge: Porifera with pores', 1], ['Tapeworm: Platyhelminthes with flat body', 1], ['Starfish: Echinodermata with spiny skin', 1]],
  d: 2, c: 'application', t: [2],
}));
add('long-vert', long({
  stem: 'Name the five classes of vertebrates. For each class, state one distinguishing feature and give one example.',
  model: 'The five classes of vertebrates are Pisces, Amphibia, Reptilia, Aves and Mammalia. Pisces are fish that live in water, have scales and breathe with gills, such as rohu. Amphibia have moist skin and live on land and in water, such as frog. Reptilia have dry scales and lay eggs on land, such as lizard. Aves have feathers, wings and a four-chambered heart, such as crow. Mammalia have hair and mammary glands, and most give birth to young, such as cow.',
  sol: 'Five classes with a feature and an example each.',
  scheme: [['Five classes named correctly', 1], ['A distinguishing feature for each class', 2.5], ['A correct example for each class', 1.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('case-key', mk.case({
  passage: r`A class collects six organisms from a pond and its banks and builds this key. At each step, follow the statement that fits and go where it says. The six organisms are a bacterium, *Paramecium*, *Spirogyra*, a water fern (*Marsilea*), a bread mould and *Hydra*, but the labels P to U do not follow this order.

1a. Body is a single cell: go to 2.
1b. Body has many cells: go to 3.
2a. Cell has no nucleus: **P**.
2b. Cell has a nucleus: **Q**.
3a. Body makes its own food using chlorophyll: go to 4.
3b. Body cannot make its own food: go to 5.
4a. Body is a thread with no root, stem or leaf: **R**.
4b. Body has true roots, a stem and leaves: **S**.
5a. Body is made of threads with a chitin cell wall: **T**.
5b. Body has no cell wall and has tentacles with stinging cells: **U**.`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which sequence of steps leads a student to organism R?',
      right: '1b, 3a, 4a',
      wrong: ['1a, 2a', '1b, 3b, 5a', '1b, 3a, 4b'],
      sol: 'R is many-celled (1b), makes its own food (3a) and is a thread with no root, stem or leaf (4a). That is Spirogyra — option (@K).',
      d: 2, c: 'application', t: [1, 2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the kingdom of organism T, with one reason.',
      model: 'Fungi: it is many-celled, has a chitin cell wall and cannot make its own food.',
      sol: 'Fungi, from chitin wall and no own food.',
      scheme: [['Fungi, with a reason', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'A student finds a pine seedling and the key leads her to S, which is wrong. Say why, and write one extra step that would separate pine from S.',
      model: 'The key stops at true roots, stem and leaves, which a fern and a pine both have. A new step could ask whether the plant makes seeds: pine makes naked seeds and the fern makes spores and no seeds.',
      sol: 'Key does not test for seeds; add a seeds step.',
      scheme: [['Key does not ask about seeds, so pine and fern both fit 4b', 1], ['New step such as seeds or no seeds, with the result', 1]],
      d: 4, c: 'evaluation', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'A sea sponge is many-celled, has no cell wall, cannot make its own food and has no tentacles. Where does the key leave a student who tries it, and what end point must be added?',
        model: 'The sponge passes steps 1b and 3b, but then it fits neither 5a, since it has no chitin wall, nor 5b, since it has no tentacles. The key needs a new end point at step 5, such as a body with many pores and no tentacles, for the sponge.',
        sol: 'Stuck at step 5; add an end point for pores and no tentacles.',
        scheme: [['The sponge fits neither 5a nor 5b', 1], ['A new end point such as many pores and no tentacles', 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), null);
add('case-plants', mk.case({
  passage: r`A student records features of five seedlings from a school garden (observations given).

| Plant | Seed leaves | Leaf veins | Roots |
|---|---|---|---|
| Rice | 1 | Parallel | Fibrous |
| Mustard | 2 | Net-like | Tap root |
| Banana | 1 | Parallel | Fibrous |
| Pea | 2 | Net-like | Tap root |
| Neem | 2 | Net-like | Tap root |`,
  d: 2, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which plants in the table are monocots?',
      right: 'Rice and banana',
      wrong: ['Mustard and pea', 'Pea and neem', 'Rice and neem'],
      sol: 'One seed leaf, parallel veins and fibrous roots mark monocots: rice and banana — option (@K).',
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'How many of the five plants are dicots?',
      model: 'Three: mustard, pea and neem.',
      sol: 'Mustard, pea and neem.',
      scheme: [['Three dicots', 1]],
      d: 1, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'A sixth seedling, plant V, has one seed leaf and fibrous roots. Predict its leaf veins and group, and give the reason.',
      model: 'Plant V is a monocot, and its leaves should have parallel veins. In the table every plant with one seed leaf also has fibrous roots and parallel veins.',
      sol: 'Monocot with parallel veins.',
      scheme: [['Monocot with parallel veins', 1], ['Reason from the pattern in the table', 1]],
      d: 3, c: 'analysis', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Why do botanists use several features, and not only one, to decide whether a plant is a monocot or a dicot?',
        model: 'One feature may be hard to see or may mislead, such as a seed that is not cut open. Using seed leaves, veins and roots together gives a more reliable decision.',
        sol: 'Several features are more reliable.',
        scheme: [['A single feature can mislead or be hard to see', 1], ['Several features together are more reliable', 1]],
        d: 3, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t03 binomial nomenclature
add('chk-binomial', mcq({
  stem: 'In a printed science book, which is the correct way to write the scientific name of the neem tree?',
  right: '*Azadirachta indica*',
  wrong: ['*azadirachta Indica*', '*Azadirachta Indica*', '*azadirachta indica*'],
  sol: 'The genus begins with a capital letter and the species with a small letter, and the whole name is in italics — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('lion-mcq', mcq({
  stem: 'The lion is *Panthera leo* and the tiger is *Panthera tigris*. These names show that the two animals:',
  right: 'belong to the same genus but are different species',
  wrong: ['belong to the same species', 'belong to different genera but the same species', 'belong to different families'],
  sol: 'The first word is the genus, which is the same here, and the second word is the species, which is different — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('mule-mcq', mcq({
  stem: 'A mare and a male donkey can mate, but their offspring, a mule, cannot produce young. This shows that the horse and the donkey are:',
  right: 'different species, because they cannot produce fertile offspring together',
  wrong: ['the same species, because they can mate', 'two varieties of one species', 'members of different kingdoms'],
  sol: 'A species is a group whose members produce fertile offspring. Horse and donkey do not, so they are different species — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('tamarind-mcq', mcq({
  stem: 'Tamarind is imli in Hindi, chinch in Marathi and puli in Tamil, yet botanists everywhere call it *Tamarindus indica*. The main benefit of this scientific name is that:',
  right: 'one name is understood worldwide, whatever the local language',
  wrong: ['it tells the height of the tree', 'it describes the taste of the fruit', 'it lists the uses of the tree'],
  sol: 'A scientific name is the same in every language, so scientists everywhere know which organism is meant — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ar-binomial', ar({
  a: 'The scientific name of the tiger is written *Panthera tigris* with a capital P and a small t.',
  r: 'The scientific name of every organism is written in Latin form.',
  key: 'b',
  sol: 'The genus takes a capital and the species a small letter, so A is true. Scientific names are in Latin form, so R is true. But the capital and small letters are a rule of writing, not a result of Latin form, so R does not explain A — option (b).',
  d: 2, c: 'analysis', t: [3],
}));
add('fill-linn', fill({
  stem: 'The two-word system of scientific naming was introduced by Carolus ______.',
  acc: [['Linnaeus', 'linnaeus']],
  sol: 'Carolus Linnaeus introduced binomial nomenclature.',
  d: 1, c: 'recall', t: [3],
}));
add('s2-peacock', short({
  marks: 2,
  stem: 'The Indian peafowl is written *Pavo cristatus*. Name its genus and species, and state two rules followed in writing the name.',
  model: 'The genus is Pavo and the species is cristatus. The genus begins with a capital letter and the species with a small letter, and the name is in italics when printed, or each word is underlined when handwritten.',
  sol: 'Genus Pavo, species cristatus; capital and small letters; italics or underline.',
  scheme: [['Genus Pavo and species cristatus', 1], ['Two rules stated', 1]],
  d: 2, c: 'application', t: [3],
}));
add('s2-underline', short({
  marks: 2,
  stem: 'A student writes the name of the human as Homo Sapiens in her notebook. Point out the mistake and write it correctly, as you would handwrite it.',
  model: 'The species word must begin with a small letter, so Homo Sapiens is wrong. The correct name is Homo sapiens, and when it is handwritten the genus and the species are underlined separately.',
  sol: 'Species must be small; underline each word.',
  scheme: [['Species name should begin with a small letter', 1], ['Correct form Homo sapiens with separate underlines', 1]],
  d: 2, c: 'application', t: [3],
}));
add('s3-binomial', short({
  marks: 3,
  stem: 'Why is the scientific name of an organism more useful to scientists than its common name? Write the scientific names of mango and neem, and say what they have in common.',
  model: 'A common name changes from place to place, but a scientific name is the same in every language, so it avoids confusion. The mango is Mangifera indica and the neem is Azadirachta indica. They share the same species word, indica, but their genera are different, so the full names are different.',
  sol: 'One universal name; two names; shared species word.',
  scheme: [['Scientific name is universal, common names vary', 1], ['Mangifera indica and Azadirachta indica', 1], ['Same species word but different genera', 1]],
  d: 3, c: 'application', t: [3],
}));
add('long-binomial', long({
  stem: 'Explain binomial nomenclature. State the rules for writing a scientific name, with examples, and give two advantages of the system.',
  model: 'Binomial nomenclature, introduced by Carolus Linnaeus, gives each organism a two-part Latin name, the genus followed by the species. The genus starts with a capital letter and the species with a small letter. In print the name is in italics, and when it is handwritten each word is underlined separately. Examples are Homo sapiens for the human and Panthera tigris for the tiger. The advantages are that the name is the same all over the world and that it avoids confusion between local names.',
  sol: 'Definition; three rules; examples; two advantages.',
  scheme: [['Two-part Latin name, genus and species, by Linnaeus', 1], ['Capital for genus and small letter for species', 1], ['Italics in print; underline separately by hand', 1], ['Two correct examples', 1], ['Advantages such as one world-wide name and no confusion', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 viruses and ecological roles
add('virus-mcq', mcq({
  stem: 'Which statement best explains why viruses are not placed in any of the five kingdoms?',
  right: 'They are acellular and can multiply only inside a host cell.',
  wrong: ['They are too small to be seen with any microscope.', 'They always cause disease.', 'They have a nucleus but no cell wall.'],
  sol: 'The kingdoms group cells. A virus is not a cell and multiplies only inside a host cell — option (@K). Viruses can be seen with an electron microscope and have no nucleus.',
  d: 2, c: 'understanding', t: [4],
}));
add('ar-virus', ar({
  a: 'A virus can multiply only inside a living host cell.',
  r: 'A virus has its own cytoplasm and ribosomes for making proteins.',
  key: 'c',
  sol: 'A virus has no cytoplasm or ribosomes, so it must use those of a host cell. A is true and R is false — option (c).',
  d: 2, c: 'analysis', t: [4],
}));
add('tf-virus', tf({
  stem: 'A virus can be grown on its own in a nutrient jelly in the laboratory, as bacteria are.',
  key: 'f',
  sol: 'False. A virus cannot make its own proteins and multiplies only inside living host cells, so it cannot be grown in a nutrient jelly alone.',
  d: 2, c: 'understanding', t: [4],
}));
add('num-scale', (() => {
  const bactUm = 2.5;
  const virusNm = 100;
  const bactNm = bactUm * 1000;
  const ratio = bactNm / virusNm;
  return num({
    stem: `A bacterium is ${bactUm} micrometres long (given) and a virus that infects it measures ${virusNm} nanometres. How many times longer is the bacterium than the virus? (1 micrometre = 1000 nanometres)`,
    value: ratio, tol: 0, unit: 'times',
    sol: r`Length of bacterium $= ${bactUm} \times 1000 = ${bactNm}\ \text{nm}$. Ratio $= \dfrac{${bactNm}}{${virusNm}} = ${ratio}$ times.`,
    scheme: [['Converts the length of the bacterium to nanometres: 2500 nm', 1], ['Divides by 100 nm to get 25', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near(2.5 * 1000 / 100, 25, 1e-9) && q.answer.value === 25 || 'scale');
add('chk-roles', mcq({
  stem: 'A heap of dry leaves in a compost pit slowly turns into dark, crumbly manure with the help of bacteria and fungi. These organisms are acting as:',
  right: 'decomposers',
  wrong: ['producers', 'herbivores', 'carnivores'],
  sol: 'Bacteria and fungi break down dead remains and return nutrients to the soil, so they are decomposers — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('s2-acellular', short({
  marks: 2,
  stem: 'Why is a virus described as acellular? Name two parts that a virus does have.',
  model: 'A virus is acellular because it is not made of a cell: it has no cytoplasm, no organelles and no cell membrane. It does have genetic material, which is DNA or RNA, and a protein coat called the capsid around it.',
  sol: 'Not a cell; genetic material and capsid.',
  scheme: [['Has no cytoplasm, organelles or membrane', 1], ['Genetic material and protein coat named', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('s2-decomp', short({
  marks: 2,
  stem: 'Fallen leaves in a school garden turn into dark soil in a few months. Name the organisms responsible and say why this is useful to plants.',
  model: 'Decomposers, mainly bacteria and fungi, break down the dead leaves. This returns nutrients to the soil, which growing plants can absorb, so the nutrients are recycled and not lost.',
  sol: 'Bacteria and fungi; nutrients return to soil.',
  scheme: [['Decomposers: bacteria and fungi', 1], ['Nutrients returned to the soil for plants', 1]],
  d: 2, c: 'application', t: [4],
}));
add('s3-viruskingdom', short({
  marks: 3,
  stem: 'Give three reasons why viruses are not classified in any of the five kingdoms.',
  model: 'A virus is acellular, with only genetic material in a protein coat, so it does not fit a kingdom of cells. It has no cytoplasm or ribosomes and cannot make its own proteins. It cannot multiply by itself and does so only inside a host cell.',
  sol: 'Acellular; cannot make proteins; multiplies only in a host.',
  scheme: [['Not a cell, so it does not fit the cell-based kingdoms', 1], ['Cannot make its own proteins', 1], ['Multiplies only inside a host cell', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s3-roles', short({
  marks: 3,
  stem: 'Describe the role of a producer, a consumer and a decomposer in a forest, naming one organism for each.',
  model: 'A teak tree is a producer and makes food by photosynthesis. A deer is a consumer, because it eats plants, and a tiger is a consumer that eats the deer. Fungi are decomposers: they break down dead leaves and animals and return nutrients to the soil.',
  sol: 'Producer makes food; consumer eats; decomposer recycles.',
  scheme: [['Producer with an example and its role', 1], ['Consumer with an example and its role', 1], ['Decomposer with an example and its role', 1]],
  d: 2, c: 'application', t: [4],
}));
add('long-ecology', long({
  stem: 'Explain the ecological roles of fungi and bacteria. Give two useful and two harmful effects, and write a four-organism food chain showing where decomposers act.',
  model: 'Fungi and bacteria are decomposers. They break down dead plants, animals and wastes and return nutrients to the soil, so that producers can use them again. Useful effects are that bacteria turn milk into curd and yeast makes dough rise. Harmful effects are that some bacteria cause diseases such as typhoid and that moulds spoil bread. In the food chain grass, grasshopper, frog, snake, decomposers act on the dead remains and wastes of every organism in the chain.',
  sol: 'Decomposer role; two useful; two harmful; food chain with decomposers.',
  scheme: [['Fungi and bacteria as decomposers returning nutrients', 1], ['Two useful effects', 1], ['Two harmful effects', 1], ['A food chain of four organisms with arrows from food to eater', 1], ['Decomposers shown acting on remains of all', 1]],
  d: 2, c: 'application', t: [4],
}));
add('case-virus', mk.case({
  passage: r`A student compares three kinds of particles using data from a reference book (values rounded, given).

| Feature | Bacterium | Virus | Onion root cell |
|---|---|---|---|
| Size (nm) | 2000 | 100 | 100000 |
| Cytoplasm and ribosomes | Present | Absent | Present |
| Genetic material | DNA | DNA or RNA | DNA |
| Can make its own proteins | Yes | No | Yes |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which entry in the table best supports the statement that a virus cannot be grown alone in a nutrient jelly?',
      right: 'It cannot make its own proteins.',
      wrong: ['Its genetic material may be RNA.', 'It is smaller than a bacterium.', 'Its size is given in nanometres.'],
      sol: 'Without ribosomes a virus cannot make proteins on its own, so it needs a host cell — option (@K). Size and the kind of genetic material do not stop growth in a jelly.',
      d: 3, c: 'analysis', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'How many times longer is the onion root cell than the bacterium?',
      model: '50 times, because 100000 divided by 2000 is 50.',
      sol: '100000 / 2000 = 50.',
      scheme: [['50 times', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Use the table to explain why a virus is not placed in any of the five kingdoms.',
      model: 'The kingdoms group cells, and the table shows that a virus has no cytoplasm or ribosomes, so it is not a cell. It also cannot make its own proteins, so it depends on a host cell to multiply.',
      sol: 'Not a cell; depends on a host.',
      scheme: [['No cytoplasm or ribosomes, so not a cell', 1], ['Cannot make its own proteins; depends on a host', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'A student says: “A virus has DNA or RNA, so it must be a living cell.” Evaluate this claim using the table.',
        model: 'The claim is wrong. Bacteria and onion cells have DNA too, but they also have cytoplasm and ribosomes. A virus lacks both and makes no proteins, so having genetic material alone does not make it a cell.',
        sol: 'Genetic material alone does not make a cell.',
        scheme: [['Claim rejected: genetic material alone is not enough', 1], ['A virus lacks cytoplasm, ribosomes and own protein making', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), null);
add('case-compost', mk.case({
  passage: r`A student fills two identical pits with 200 g of dry neem leaves each. Pit A is covered with ordinary garden soil. Pit B is covered with the same soil, but the soil was heated strongly first to kill all microorganisms. Both pits are kept moist at the same temperature. After six weeks she weighs the leaves that are left (values given):

| Pit | Mass of leaves left (g) |
|---|---|
| A | 60 |
| B | 188 |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The difference between the two pits is most likely due to:',
      right: 'bacteria and fungi in the ordinary soil of pit A',
      wrong: ['producers that grew in the soil of pit A', 'carnivores in the heated soil of pit B', 'a lack of sunlight in pit B'],
      sol: 'The only difference is that the soil of pit A still has its microorganisms. Bacteria and fungi decompose the leaves — option (@K).',
      d: 2, c: 'analysis', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Calculate the percentage of leaf mass lost in pit A.',
      model: '70 percent, because 200 minus 60 is 140, and 140 divided by 200 is 0.7.',
      sol: '(200 - 60) / 200 x 100 = 70 %.',
      scheme: [['70 %', 1]],
      d: 2, c: 'application', t: [4],
    }), []),
    part('c', short({
      marks: 2,
      stem: 'Predict what would happen in pit B if she added a spoonful of fresh garden soil at the end of week six. Explain your answer.',
      model: 'The leaves in pit B would start to decompose faster. Fresh garden soil brings bacteria and fungi, which are decomposers, and they would break down the leaves and release nutrients.',
      sol: 'Decomposition starts with the new microbes.',
      scheme: [['Decomposition would speed up', 1], ['Fresh soil brings bacteria and fungi that decompose the leaves', 1]],
      d: 3, c: 'evaluation', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Suggest what a forest floor would look like if there were no decomposers, and explain.',
        model: 'Dead leaves, branches and animal bodies would pile up and never rot. Nutrients would stay locked in the dead matter, so new plants would get fewer nutrients from the soil.',
        sol: 'Dead matter would pile up and nutrients would not be recycled.',
        scheme: [['Dead matter would pile up', 1], ['Nutrients would not return to the soil for plants', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), null);
