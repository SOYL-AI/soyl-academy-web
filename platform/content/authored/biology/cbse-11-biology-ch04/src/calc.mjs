// ch04 Animal Kingdom — phylum and class tables (NCERT Class 11, rationalised), a classification key, tallies and counts: all computed and asserted here.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
};

// ---------------------------------------------------------------- the ten non-chordate phyla and Chordata
/** level: organisation; sym: symmetry of the adult; layers: germ layers; coelom: body cavity; seg: metamerically segmented. */
export const PHYLA = [
  { name: 'Porifera', common: 'sponges', level: 'cellular', sym: 'asymmetrical', layers: 'none', coelom: 'none', seg: false, gut: 'none', egs: ['Sycon', 'Spongilla', 'Euspongia'] },
  { name: 'Coelenterata (Cnidaria)', common: 'jellyfish, corals and sea anemones', level: 'tissue', sym: 'radial', layers: 'diploblastic', coelom: 'none', seg: false, gut: 'incomplete', egs: ['Physalia', 'Adamsia', 'Pennatula', 'Gorgonia', 'Meandrina'] },
  { name: 'Ctenophora', common: 'sea walnuts or comb jellies', level: 'tissue', sym: 'radial', layers: 'diploblastic', coelom: 'none', seg: false, gut: 'incomplete', egs: ['Pleurobrachia', 'Ctenoplana'] },
  { name: 'Platyhelminthes', common: 'flatworms', level: 'organ', sym: 'bilateral', layers: 'triploblastic', coelom: 'acoelomate', seg: false, gut: 'incomplete', egs: ['Taenia', 'Fasciola'] },
  { name: 'Aschelminthes', common: 'roundworms', level: 'organ-system', sym: 'bilateral', layers: 'triploblastic', coelom: 'pseudocoelomate', seg: false, gut: 'complete', egs: ['Ascaris', 'Wuchereria', 'Ancylostoma'] },
  { name: 'Annelida', common: 'segmented worms', level: 'organ-system', sym: 'bilateral', layers: 'triploblastic', coelom: 'coelomate', seg: true, gut: 'complete', egs: ['Nereis', 'Pheretima', 'Hirudinaria'] },
  { name: 'Arthropoda', common: 'insects, crabs, spiders', level: 'organ-system', sym: 'bilateral', layers: 'triploblastic', coelom: 'coelomate', seg: true, gut: 'complete', egs: ['Apis', 'Bombyx', 'Laccifer', 'Anopheles', 'Locusta', 'Limulus'] },
  { name: 'Mollusca', common: 'snails, squids, octopus', level: 'organ-system', sym: 'bilateral', layers: 'triploblastic', coelom: 'coelomate', seg: false, gut: 'complete', egs: ['Pila', 'Pinctada', 'Sepia', 'Loligo', 'Octopus', 'Aplysia', 'Dentalium', 'Chaetopleura'] },
  { name: 'Echinodermata', common: 'starfish, sea urchins', level: 'organ-system', sym: 'radial (adult)', layers: 'triploblastic', coelom: 'coelomate', seg: false, gut: 'complete', egs: ['Asterias', 'Echinus', 'Antedon', 'Cucumaria', 'Ophiura'] },
  { name: 'Hemichordata', common: 'acorn worms', level: 'organ-system', sym: 'bilateral', layers: 'triploblastic', coelom: 'coelomate', seg: false, gut: 'complete', egs: ['Balanoglossus', 'Saccoglossus'] },
];
export const P = Object.fromEntries(PHYLA.map((p) => [p.name.split(' ')[0], p]));
export const namesOf = (f) => PHYLA.filter(f).map((p) => p.name.split(' ')[0]);
eq(PHYLA.length, 10, 'ten non-chordate phyla');
eq(namesOf((p) => p.sym.startsWith('radial')), ['Coelenterata', 'Ctenophora', 'Echinodermata'], 'radial phyla');
eq(namesOf((p) => p.sym === 'bilateral').length, 6, 'bilateral phyla');
eq(namesOf((p) => p.layers === 'diploblastic'), ['Coelenterata', 'Ctenophora'], 'diploblastic');
eq(namesOf((p) => p.layers === 'triploblastic').length, 7, 'triploblastic');
eq(namesOf((p) => p.coelom === 'coelomate').length, 5, 'coelomate non-chordate phyla');
eq(namesOf((p) => p.coelom === 'acoelomate'), ['Platyhelminthes'], 'acoelomate');
eq(namesOf((p) => p.coelom === 'pseudocoelomate'), ['Aschelminthes'], 'pseudocoelomate');
eq(namesOf((p) => p.seg), ['Annelida', 'Arthropoda'], 'segmented phyla');
eq(namesOf((p) => p.level === 'organ-system').length, 6, 'organ-system level');
eq(namesOf((p) => p.gut === 'incomplete'), ['Coelenterata', 'Ctenophora', 'Platyhelminthes'], 'incomplete gut');
eq(namesOf((p) => p.layers === 'triploblastic' && p.coelom === 'coelomate').length, 5, 'triploblastic coelomates');

/** Names the phylum from a feature set (a key used in worked examples). */
export const phylumFrom = ({ sym, layers, coelom, seg }) => {
  const m = PHYLA.filter((p) => (!sym || p.sym.startsWith(sym)) && (!layers || p.layers === layers) && (!coelom || p.coelom === coelom) && (seg === undefined || p.seg === seg));
  return m.map((p) => p.name.split(' ')[0]);
};
eq(phylumFrom({ layers: 'triploblastic', coelom: 'pseudocoelomate' }), ['Aschelminthes'], 'key: pseudocoelom → Aschelminthes');
eq(phylumFrom({ coelom: 'coelomate', seg: true }), ['Annelida', 'Arthropoda'], 'key: coelomate segmented');
eq(phylumFrom({ sym: 'bilateral', coelom: 'acoelomate' }), ['Platyhelminthes'], 'key: acoelomate bilateral');
eq(phylumFrom({ layers: 'diploblastic' }), ['Coelenterata', 'Ctenophora'], 'key: diploblastic');

// ---------------------------------------------------------------- chordate classes
/** heart: chambers; warm: homoiothermous; skin: body covering; ferti: fertilisation; skeleton; limbs: paired appendages. */
export const CLASSES = [
  { name: 'Cyclostomata', common: 'lamprey and hagfish', jaws: false, heart: null, warm: false, skeleton: 'cartilaginous', cover: 'smooth skin, no scales', ferti: 'not stated', egs: ['Petromyzon', 'Myxine'], breathe: 'gills (6–15 pairs of gill slits)' },
  { name: 'Chondrichthyes', common: 'cartilaginous fishes', jaws: true, heart: 2, warm: false, skeleton: 'cartilaginous', cover: 'placoid scales', ferti: 'internal', egs: ['Scoliodon', 'Pristis', 'Carcharodon', 'Trygon', 'Torpedo'], breathe: 'gills, separate slits, no operculum' },
  { name: 'Osteichthyes', common: 'bony fishes', jaws: true, heart: 2, warm: false, skeleton: 'bony', cover: 'cycloid or ctenoid scales', ferti: 'usually external', egs: ['Exocoetus', 'Hippocampus', 'Labeo', 'Catla', 'Clarias', 'Betta', 'Pterophyllum'], breathe: 'four pairs of gills under an operculum' },
  { name: 'Amphibia', common: 'frogs, toads, salamanders', jaws: true, heart: 3, warm: false, skeleton: 'bony', cover: 'moist skin without scales', ferti: 'external', egs: ['Bufo', 'Rana', 'Hyla', 'Salamandra', 'Ichthyophis'], breathe: 'gills, lungs and skin' },
  { name: 'Reptilia', common: 'turtles, lizards, snakes, crocodiles', jaws: true, heart: 3, warm: false, skeleton: 'bony', cover: 'dry cornified skin with scales or scutes', ferti: 'internal', egs: ['Chelone', 'Testudo', 'Chameleon', 'Calotes', 'Crocodilus', 'Hemidactylus', 'Naja', 'Bangarus', 'Vipera'], breathe: 'lungs' },
  { name: 'Aves', common: 'birds', jaws: true, heart: 4, warm: true, skeleton: 'bony, hollow (pneumatic) long bones', cover: 'feathers; scales on the legs', ferti: 'internal', egs: ['Corvus', 'Columba', 'Psittacula', 'Struthio', 'Pavo', 'Aptenodytes', 'Neophron'], breathe: 'lungs with air sacs' },
  { name: 'Mammalia', common: 'mammals', jaws: true, heart: 4, warm: true, skeleton: 'bony', cover: 'hair', ferti: 'internal', egs: ['Ornithorhynchus', 'Macropus', 'Pteropus', 'Camelus', 'Macaca', 'Rattus', 'Canis', 'Felis', 'Elephas', 'Equus', 'Delphinus', 'Balaenoptera'], breathe: 'lungs' },
];
export const C = Object.fromEntries(CLASSES.map((c) => [c.name, c]));
export const classesOf = (f) => CLASSES.filter(f).map((c) => c.name);
eq(CLASSES.length, 7, 'seven classes');
eq(classesOf((c) => c.jaws).length, 6, 'six jawed classes');
eq(classesOf((c) => c.warm), ['Aves', 'Mammalia'], 'warm-blooded');
eq(classesOf((c) => c.warm === false).length, 5, 'cold-blooded classes');
eq(classesOf((c) => c.heart === 4), ['Aves', 'Mammalia'], 'four-chambered');
eq(classesOf((c) => c.heart === 3), ['Amphibia', 'Reptilia'], 'three-chambered');
eq(classesOf((c) => c.heart === 2), ['Chondrichthyes', 'Osteichthyes'], 'two-chambered');
eq(classesOf((c) => c.skeleton === 'cartilaginous'), ['Cyclostomata', 'Chondrichthyes'], 'cartilaginous');
eq(classesOf((c) => c.ferti === 'internal'), ['Chondrichthyes', 'Reptilia', 'Aves', 'Mammalia'], 'internal fertilisation');
export const classFrom = ({ heart, warm, cover }) => CLASSES.filter((c) => (heart === undefined || c.heart === heart) && (warm === undefined || c.warm === warm) && (!cover || c.cover.includes(cover))).map((c) => c.name);
eq(classFrom({ heart: 3, cover: 'moist' }), ['Amphibia'], 'key: moist skin and three chambers');
eq(classFrom({ heart: 4, warm: true, cover: 'feather' }), ['Aves'], 'key: feathers');
eq(classFrom({ heart: 4, cover: 'hair' }), ['Mammalia'], 'key: hair');
eq(classFrom({ heart: 2, cover: 'placoid' }), ['Chondrichthyes'], 'key: placoid scales');

// ---------------------------------------------------------------- counts used in slides and questions
export const N = {};
N.gillPairs = 7; // a lamprey with seven pairs of gill slits (the textbook range is 6 to 15 pairs)
N.gillSlits = N.gillPairs * 2;
eq(N.gillSlits, 14, 'seven pairs = 14 slits');
N.combRows = 8; // rows of comb plates in a ctenophore
N.platesPerRow = 24; // illustrative
N.combPlates = N.combRows * N.platesPerRow;
eq(N.combPlates, 192, '8 rows of 24 plates');
N.museum = 90; // named animal species in an imagined collection
N.museumArthropods = (N.museum * 2) / 3; // 'over two-thirds' of named species are arthropods: at least this many
eq(N.museumArthropods, 60, 'two-thirds of 90');
// total heart chambers in a basket of seven animals (imagined set): rohu, shark, frog, lizard, pigeon, dog, snake
export const HEARTS = [['Rohu', 'Osteichthyes'], ['Dog shark', 'Chondrichthyes'], ['Frog', 'Amphibia'], ['Garden lizard', 'Reptilia'], ['Pigeon', 'Aves'], ['Dog', 'Mammalia'], ['Cobra', 'Reptilia']];
N.heartChambers = HEARTS.reduce((s, [, c]) => s + C[c].heart, 0);
eq(N.heartChambers, 2 + 2 + 3 + 3 + 4 + 4 + 3, 'chambers in seven hearts');
eq(N.heartChambers, 21, '21 chambers');
N.heartAnimals = HEARTS.length;
N.warmOfSeven = HEARTS.filter(([, c]) => C[c].warm).length;
eq(N.warmOfSeven, 2, 'two warm-blooded of seven');
// a reef transect of eleven animals (imagined): [animal, phylum]
export const REEF = [['Sea anemone', 'Coelenterata'], ['Brain coral', 'Coelenterata'], ['Comb jelly', 'Ctenophora'], ['Bath sponge', 'Porifera'], ['Starfish', 'Echinodermata'], ['Sea urchin', 'Echinodermata'], ['Squid', 'Mollusca'], ['Pearl oyster', 'Mollusca'], ['Crab', 'Arthropoda'], ['Sea-pen', 'Coelenterata'], ['Brittle star', 'Echinodermata']];
N.reef = REEF.length;
N.reefRadial = REEF.filter(([, p]) => P[p].sym.startsWith('radial')).length;
N.reefDiplo = REEF.filter(([, p]) => P[p].layers === 'diploblastic').length;
N.reefTriploCoelo = REEF.filter(([, p]) => P[p].layers === 'triploblastic' && P[p].coelom === 'coelomate').length;
eq([N.reef, N.reefRadial, N.reefDiplo, N.reefTriploCoelo], [11, 7, 4, 6], 'reef counts');
// a pond sample of nine worms (imagined): [animal, phylum]
export const WORMS = [['Tapeworm', 'Platyhelminthes'], ['Liver fluke', 'Platyhelminthes'], ['Planarian', 'Platyhelminthes'], ['Roundworm', 'Aschelminthes'], ['Hookworm', 'Aschelminthes'], ['Earthworm', 'Annelida'], ['Leech', 'Annelida'], ['Sandworm', 'Annelida'], ['Filarial worm', 'Aschelminthes']];
N.worms = WORMS.length;
N.wormsSegmented = WORMS.filter(([, p]) => P[p].seg).length;
N.wormsFlat = WORMS.filter(([, p]) => p === 'Platyhelminthes').length;
N.wormsPseudo = WORMS.filter(([, p]) => P[p].coelom === 'pseudocoelomate').length;
eq([N.worms, N.wormsSegmented, N.wormsFlat, N.wormsPseudo], [9, 3, 3, 3], 'worm counts');
// phyla that are bilateral and triploblastic with organ-system level
N.organSysBilat = PHYLA.filter((p) => p.level === 'organ-system' && p.sym === 'bilateral').length;
eq(N.organSysBilat, 5, 'bilateral organ-system phyla');
// number of vertebrate classes grouped: fishes (3), tetrapods (4)
N.fishClasses = classesOf((c) => /ichthyes|Cyclostomata/.test(c.name)).length;
N.tetrapods = CLASSES.length - N.fishClasses;
eq([N.fishClasses, N.tetrapods], [3, 4], 'fish and tetrapod classes');
// body segments: an earthworm with 120 segments: a cut after segment 40 leaves 80 behind (illustrative metamerism count)
N.segments = 120;
N.cutAfter = 40;
N.rest = N.segments - N.cutAfter;
eq(N.rest, 80, 'segments remaining');
// ctenophore light show: 8 rows, each with 24 plates — already counted. Tube feet are not taught.
// bird: 4 chambers; flight: pneumatic bones, air sacs. Sums for a zoo (imagined): 12 mammals, 9 birds, 6 reptiles, 4 amphibians
export const ZOO = { Mammalia: 12, Aves: 9, Reptilia: 6, Amphibia: 4 };
N.zoo = Object.values(ZOO).reduce((a, b) => a + b, 0);
N.zooWarm = Object.entries(ZOO).filter(([c]) => C[c].warm).reduce((s, [, n]) => s + n, 0);
N.zooFour = Object.entries(ZOO).filter(([c]) => C[c].heart === 4).reduce((s, [, n]) => s + n, 0);
N.zooThree = Object.entries(ZOO).filter(([c]) => C[c].heart === 3).reduce((s, [, n]) => s + n, 0);
eq([N.zoo, N.zooWarm, N.zooFour, N.zooThree], [31, 21, 21, 10], 'zoo counts');

// ---------------------------------------------------------------- extra data for the question bank
N.gill12 = 12 * 2;
N.gill9 = 9 * 2;
eq([N.gill12, N.gill9], [24, 18], 'gill slits');
export const HEARTS2 = [['Catla', 'Osteichthyes'], ['Trygon', 'Chondrichthyes'], ['Toad', 'Amphibia'], ['Chameleon', 'Reptilia'], ['Penguin', 'Aves'], ['Camel', 'Mammalia']];
N.hearts2 = HEARTS2.reduce((s, [, c]) => s + C[c].heart, 0);
eq(N.hearts2, 18, 'chambers in six hearts');
/** Animals found in a rock pool (imagined): [animal, phylum]. */
export const ROCKPOOL = [['Sea anemone', 'Coelenterata'], ['Sea urchin', 'Echinodermata'], ['Snail', 'Mollusca'], ['Hermit crab', 'Arthropoda'], ['Sea cucumber', 'Echinodermata'], ['Chiton', 'Mollusca'], ['Ragworm (Nereis)', 'Annelida'], ['Sponge', 'Porifera']];
N.rock = ROCKPOOL.length;
N.rockCoelomate = ROCKPOOL.filter(([, p]) => P[p].coelom === 'coelomate').length;
N.rockRadial = ROCKPOOL.filter(([, p]) => P[p].sym.startsWith('radial')).length;
N.rockSegmented = ROCKPOOL.filter(([, p]) => P[p].seg).length;
eq([N.rock, N.rockCoelomate, N.rockRadial, N.rockSegmented], [8, 6, 3, 2], 'rock pool counts');
