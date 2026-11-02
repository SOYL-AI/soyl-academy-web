// ch04 Animal Kingdom — question bank. AR keys: b a c d a d c.
import { mk, add, r, svgV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { N, P, C, PHYLA, CLASSES, ROCKPOOL, ZOO, phylumFrom, classFrom, namesOf } from './calc.mjs';
import { SYMMETRY_L, COELOM_L, SPONGE_L, CHORD_L } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const L = {
  sym: svgV(SYMMETRY_L, 'Three animal outlines marked A, B and C showing different body symmetry'),
  coel: svgV(COELOM_L, 'Three body cross-sections marked A, B and C showing different body cavities'),
  sponge: svgV(SPONGE_L, 'Sponge in longitudinal section with five parts marked A to E'),
  chord: svgV(CHORD_L, 'Simple chordate with five parts marked A to E'),
};

// ---------------------------------------------------------------- t01 basis of classification
add('basis-mcq', mcq({
  stem: 'Which set of features do zoologists use as the main basis for classifying animals into phyla?',
  right: 'Levels of organisation, symmetry, germ layers, body cavity, segmentation and notochord',
  wrong: ['Body size, colour, habitat, diet, speed and lifespan', 'Number of legs, presence of a tail, skin colour and sound produced', 'Place of discovery, date of discovery, common name and local use'],
  sol: 'Phyla are separated by fundamental structural features: the level of organisation, symmetry, germ layers, coelom, segmentation and the notochord — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('sym-mcq', mcq({
  stem: 'A zoologist finds that a marine animal can be cut into two identical halves along any plane that passes through the centre of its body. Its symmetry is',
  right: 'radial',
  wrong: ['bilateral', 'asymmetrical', 'metameric'],
  sol: 'When any plane through the central axis gives equal halves, the symmetry is radial — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('symL-mcq', mcq({
  stem: 'In the figure, which animal outline shows bilateral symmetry?',
  right: 'C',
  wrong: ['A', 'B', 'A and B'],
  sol: 'Only C has a head end and one plane (the dashed midline) that gives two mirror halves; A is radial and B is asymmetrical — option (@K).',
  assets: [L.sym],
  d: 1, c: 'application', t: [1],
}));
add('symL2-mcq', mcq({
  stem: 'In the figure, which outline would match an adult sea anemone, and why?',
  right: 'A, because any plane through its central axis gives equal halves',
  wrong: ['B, because it cannot be cut into equal halves in any plane', 'C, because it has a right side and a left side', 'C, because it has appendages arranged in pairs'],
  sol: 'A sea anemone is radially symmetrical; outline A is the one with tentacles all round and equal halves in any plane through its axis — option (@K).',
  assets: [L.sym],
  d: 2, c: 'application', t: [1],
}));
add('level-mcq', mcq({
  stem: 'In a newly described animal the cells doing the same work are grouped into tissues, but no organs are formed. To which phylum could it belong?',
  right: 'Coelenterata, which shows the cell-tissue level',
  wrong: ['Porifera, which shows the cellular level', 'Platyhelminthes, which shows the organ-system level', 'Aschelminthes, which shows the organ level'],
  sol: 'Coelenterates and ctenophores have a tissue level; sponges are cellular, flatworms have organs and roundworms have organ systems — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('germ-mcq', mcq({
  stem: 'The embryo of an animal develops only an outer ectoderm and an inner endoderm, with a jelly-like undifferentiated layer between them. The animal is',
  right: 'diploblastic, as in a jellyfish',
  wrong: ['triploblastic, as in a jellyfish', 'diploblastic, as in an earthworm', 'triploblastic, as in a flatworm'],
  sol: 'Two germ layers with a mesoglea between them mean a diploblastic animal, such as a coelenterate — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('coelom-mcq', mcq({
  stem: 'In a true coelom, the body cavity is lined by',
  right: 'mesoderm',
  wrong: ['ectoderm', 'endoderm', 'mesoglea'],
  sol: 'A coelom is a body cavity lined by mesoderm — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('coelL-mcq', mcq({
  stem: 'In the figure of body cross-sections, which one shows a pseudocoelomate animal?',
  right: 'C',
  wrong: ['A', 'B', 'A and B'],
  sol: 'C has a cavity in which the red mesoderm lies only as scattered pouches; A has a complete mesodermal lining and B has no cavity — option (@K).',
  assets: [L.coel],
  d: 2, c: 'application', t: [1],
}));
add('coelL2-mcq', mcq({
  stem: 'In the figure of body cross-sections, which one matches the body plan of an earthworm?',
  right: 'A',
  wrong: ['B', 'C', 'B and C'],
  sol: 'An earthworm is a coelomate; A shows a cavity completely lined by mesoderm — option (@K).',
  assets: [L.coel],
  d: 2, c: 'application', t: [1],
}));
add('pseudo-mcq', mcq({
  stem: 'A worm removed from a patient is round in cross-section, has a complete gut and separate sexes, and its mesoderm lies only in scattered pouches. It belongs to',
  right: 'Aschelminthes',
  wrong: ['Platyhelminthes', 'Annelida', 'Hemichordata'],
  sol: 'A pseudocoelom with round body and complete gut marks the roundworms, Aschelminthes — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => phylumFrom({ coelom: 'pseudocoelomate' }).join() === 'Aschelminthes' || 'key');
add('seg-mcq', mcq({
  stem: 'A student cuts an earthworm lengthways and finds that both the outside rings and the inside partitions repeat in series, along with some organs. This arrangement is called',
  right: 'metamerism',
  wrong: ['cephalisation', 'metagenesis', 'bilateral symmetry'],
  sol: 'Division of the body into segments with serial repetition of organs is metamerism — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('noto-mcq', mcq({
  stem: 'A rod-like structure derived from mesoderm forms on the dorsal side of an embryo. Animals that have it are placed in',
  right: 'Chordata',
  wrong: ['Arthropoda', 'Echinodermata', 'Mollusca'],
  sol: 'The notochord is the defining feature of chordates — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('gut-mcq', mcq({
  stem: 'A flatworm takes in food and also expels its undigested wastes through the same opening. Its digestive system is',
  right: 'incomplete',
  wrong: ['complete', 'absent', 'open'],
  sol: 'A gut with only one opening for food and wastes is incomplete; roundworms and higher animals have a complete gut — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('circ-mcq', mcq({
  stem: 'In which pair of animals is blood pumped into open spaces in the body rather than being kept in vessels?',
  right: 'A cockroach and a snail',
  wrong: ['An earthworm and a frog', 'A starfish and a rohu', 'A hydra and a lizard'],
  sol: 'Arthropods (cockroach) and molluscs (snail) have an open circulatory system; annelids and chordates have a closed one — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('phylum-ar', ar({
  a: 'Sponges are called asymmetrical animals.',
  r: 'Sponges have a water canal system with pores, a central cavity and an opening.',
  key: 'b',
  sol: 'Both statements are true, but the canal system does not explain why the body has no symmetry — option (b).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('diplo-ar', ar({
  a: 'Flatworms are acoelomate animals.',
  r: 'In flatworms the mesoderm forms a cavity that is only partly lined, called a pseudocoelom.',
  key: 'c',
  sol: 'A is true; R is false, because flatworms have no body cavity at all, and the pseudocoelom belongs to roundworms — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('radial-tf', tf({
  stem: 'Adult starfish and their free-swimming larvae are both radially symmetrical.',
  key: 'f',
  sol: 'False. Adult echinoderms are radially symmetrical, but their larvae are bilaterally symmetrical.',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('mesoglea-fill', fill({
  stem: 'In diploblastic animals an undifferentiated layer called the ______ lies between the ectoderm and the endoderm.',
  acc: [['mesoglea']],
  sol: 'Mesoglea.',
  d: 1, c: 'recall', t: [1],
}));
add('sym-short', short({
  marks: 2,
  stem: 'Distinguish between radial and bilateral symmetry, giving one example of each.',
  model: 'In **radial symmetry** any plane passing through the **central axis** divides the body into **two equal halves**, as in a **sea anemone**. In **bilateral symmetry** only **one plane** divides the body into **right and left mirror halves**, as in an **earthworm**.',
  sol: 'Planes and halves; examples.',
  scheme: [['Radial: any plane through the axis; example', 1], ['Bilateral: one plane only; example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('diplo-short', short({
  marks: 2,
  stem: 'What is meant by diploblastic and triploblastic organisation? Name one phylum of each.',
  model: '**Diploblastic** animals have **two germ layers**, an outer **ectoderm** and an inner **endoderm**, with an undifferentiated **mesoglea** between them, as in **Coelenterata**. **Triploblastic** animals have a third layer, the **mesoderm**, between them, as in **Annelida**.',
  sol: 'Two layers with mesoglea; three layers with mesoderm; phyla.',
  scheme: [['Diploblastic with phylum', 1], ['Triploblastic with phylum', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('metam-short', short({
  marks: 2,
  stem: 'What is metamerism? Name two phyla in which it occurs and mention one example of an animal that shows it.',
  model: '**Metamerism** is the division of the body, externally and internally, into **segments** with **serial repetition of at least some organs**. It occurs in **Annelida and Arthropoda**; the **earthworm** is an example.',
  sol: 'Segments with repeated organs; Annelida and Arthropoda.',
  scheme: [['Definition', 1], ['Phyla and example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('coelom3-short', short({
  marks: 3,
  stem: 'Distinguish acoelomate, pseudocoelomate and coelomate animals, with one example of each.',
  model: '**Acoelomates** have **no body cavity**, as in a **flatworm**. In **pseudocoelomates** a cavity exists but the **mesoderm** is present only as **scattered pouches** between the ectoderm and endoderm, as in a **roundworm**. **Coelomates** have a true **coelom lined by mesoderm**, as in an **earthworm**.',
  sol: 'Three body plans with examples.',
  scheme: [['Acoelomate with example', 1], ['Pseudocoelomate with example', 1], ['Coelomate with example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('basis-long', long({
  stem: 'Explain the basis of classification of animals under levels of organisation, symmetry, germ layers and body cavity, naming a phylum for each category.',
  model: '**Levels of organisation.** Sponges (Porifera) have a cellular level, with cells loosely arranged; coelenterates have a cell-tissue level; flatworms have an organ level; roundworms and higher phyla have organ systems.\n\n**Symmetry.** Sponges are asymmetrical; coelenterates, ctenophores and adult echinoderms are radially symmetrical, so any plane through the axis gives equal halves; annelids and arthropods are bilaterally symmetrical, with one plane giving mirror halves.\n\n**Germ layers.** Coelenterates are diploblastic, with ectoderm and endoderm and a mesoglea between; flatworms and all higher animals are triploblastic, with a mesoderm as well.\n\n**Body cavity.** Flatworms are acoelomate; roundworms are pseudocoelomate, with scattered mesodermal pouches; annelids, arthropods, molluscs, echinoderms, hemichordates and chordates are coelomate, the cavity being lined by mesoderm.\n\nSegmentation (annelids, arthropods) and the notochord (chordates) also separate groups.',
  sol: 'Four bases with phyla.',
  scheme: [['Levels of organisation', 1], ['Symmetry', 1], ['Germ layers', 1], ['Body cavity', 1], ['Phylum named for each', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 non-chordates
add('sponge-mcq', mcq({
  stem: 'Which cells line the central cavity of a sponge and drive the stream of water through its canals?',
  right: 'Choanocytes (collar cells)',
  wrong: ['Cnidoblasts', 'Flame cells', 'Amoebocytes of the osculum'],
  sol: 'Choanocytes line the spongocoel and canals and keep water moving — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('spongeL-mcq', mcq({
  stem: 'In the figure of a sponge, which marked part is the large opening through which water leaves the body?',
  right: 'A',
  wrong: ['B', 'D', 'E'],
  sol: 'A is the osculum; B is the spongocoel, D the pores (ostia) where water enters and E the spicules — option (@K).',
  assets: [L.sponge],
  d: 1, c: 'application', t: [2],
}));
add('spongeL2-mcq', mcq({
  stem: 'In the figure of a sponge, which marked parts are the small cells that line the central cavity and the pores through which water enters?',
  right: 'C and D',
  wrong: ['A and B', 'B and E', 'C and E'],
  sol: 'C marks the choanocytes lining the spongocoel and D the ostia (inlet pores) — option (@K).',
  assets: [L.sponge],
  d: 2, c: 'application', t: [2],
}));
add('spic-mcq', mcq({
  stem: 'A bath sponge is dried and its soft fibrous skeleton is used for bathing. This skeleton is made of',
  right: 'spongin fibres',
  wrong: ['chitin plates', 'calcareous ossicles', 'cartilage'],
  sol: 'Sponges have a skeleton of spicules or spongin fibres; the bath sponge Euspongia has a soft spongin skeleton — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cnid-mcq', mcq({
  stem: 'Which structures on the tentacles of a coelenterate help in anchorage, defence and the capture of prey?',
  right: 'Cnidoblasts',
  wrong: ['Choanocytes', 'Flame cells', 'Parapodia'],
  sol: 'Cnidoblasts (cnidocytes) with stinging capsules serve these functions — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('med-mcq', mcq({
  stem: 'An animal found floating near the surface has an umbrella-shaped body and trailing tentacles and swims freely. It is the',
  right: 'medusa form of a coelenterate',
  wrong: ['polyp form of a coelenterate', 'larva of a ctenophore', 'adult of a sponge'],
  sol: 'The free-swimming, umbrella-shaped body is the medusa (as in Aurelia); the sessile cylindrical form is the polyp — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('obelia-mcq', mcq({
  stem: 'In Obelia, which statement about its two body forms is correct?',
  right: 'Polyps form medusae asexually and medusae form polyps sexually',
  wrong: ['Polyps form medusae sexually and medusae form polyps asexually', 'Only the polyp reproduces, by budding, and no medusa forms', 'Both forms reproduce only sexually'],
  sol: 'Obelia shows metagenesis: polyps produce medusae asexually and medusae form polyps sexually — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('ctene-mcq', mcq({
  stem: 'A marine diver sees a transparent animal that glows in the dark and swims by beating eight rows of ciliated plates. It belongs to',
  right: 'Ctenophora',
  wrong: ['Coelenterata', 'Porifera', 'Echinodermata'],
  sol: 'Eight rows of ciliated comb plates and bioluminescence mark the ctenophores (comb jellies) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('flat-mcq', mcq({
  stem: 'A flattened parasitic worm from the intestine of a cow has hooks and suckers. In such worms, the flame cells help in',
  right: 'osmoregulation and excretion',
  wrong: ['capture of prey', 'respiratory exchange', 'secretion of the shell'],
  sol: 'Flame cells of flatworms (Platyhelminthes) help in osmoregulation and excretion — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('plana-mcq', mcq({
  stem: 'A planarian cut across its body regrows each piece into a whole worm. This ability, high in flatworms, is called',
  right: 'regeneration',
  wrong: ['metamerism', 'metagenesis', 'bioluminescence'],
  sol: 'Flatworms such as Planaria have a high capacity for regeneration — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('asch-mcq', mcq({
  stem: 'Which statement about a roundworm such as Ascaris is correct?',
  right: 'The sexes are separate and the female is often longer than the male.',
  wrong: ['It is hermaphrodite and has flame cells.', 'It has an incomplete gut with only a mouth.', 'It is segmented and has nephridia.'],
  sol: 'Aschelminthes are dioecious, the females often being longer than the males, with a complete gut — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('annel-mcq', mcq({
  stem: 'A marine sandworm such as Nereis swims with the help of lateral appendages. These are called',
  right: 'parapodia',
  wrong: ['tentacles', 'tube feet', 'radula'],
  sol: 'Aquatic annelids such as Nereis have lateral appendages, parapodia, that help swimming — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('nephr-mcq', mcq({
  stem: 'The organs that carry out osmoregulation and excretion in an earthworm are',
  right: 'nephridia',
  wrong: ['Malpighian tubules', 'flame cells', 'proboscis glands'],
  sol: 'Annelids have nephridia; arthropods use Malpighian tubules, flatworms flame cells and hemichordates the proboscis gland — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('arth-mcq', mcq({
  stem: 'A museum curator notes that two-thirds of the named species in her insect collection share a chitinous exoskeleton and jointed appendages. Excretion in these animals is mainly by',
  right: 'Malpighian tubules',
  wrong: ['nephridia', 'flame cells', 'the water vascular system'],
  sol: 'Arthropods excrete mainly through Malpighian tubules — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('trach-mcq', mcq({
  stem: 'A scorpion, a crab and a grasshopper all breathe differently. Which list names respiratory organs found in arthropods?',
  right: 'Gills, book gills, book lungs and the tracheal system',
  wrong: ['Ctenidia, radula, parapodia and gills', 'Lungs, air sacs, gills and skin', 'Water vascular system, tube feet and gills'],
  sol: 'Arthropods breathe by gills, book gills, book lungs or tracheae — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('vect-mcq', mcq({
  stem: 'A health officer is planning to control Anopheles, Culex and Aedes, which spread diseases. To which phylum do these animals belong, and what is a feature they share with it?',
  right: 'Arthropoda; jointed appendages',
  wrong: ['Mollusca; a muscular foot', 'Annelida; parapodia', 'Aschelminthes; a pseudocoelom'],
  sol: 'Mosquitoes are arthropods, with a chitinous exoskeleton and jointed appendages — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('limulus-mcq', mcq({
  stem: 'The king crab Limulus, called a living fossil, is a member of',
  right: 'Arthropoda',
  wrong: ['Mollusca', 'Echinodermata', 'Annelida'],
  sol: 'Limulus is an arthropod and is a living fossil — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('moll-mcq', mcq({
  stem: 'A garden snail scrapes soft algae from a stone with a file-like organ in its mouth. This organ is the',
  right: 'radula',
  wrong: ['proboscis', 'mantle', 'hypostome'],
  sol: 'Molluscs have a rasping, file-like radula for feeding — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pearl-mcq', mcq({
  stem: 'A pearl oyster (Pinctada), a cuttlefish (Sepia) and an octopus all have',
  right: 'a soft unsegmented body with a mantle covering the visceral hump',
  wrong: ['a body of many identical segments with parapodia', 'a spiny skin with calcareous ossicles', 'a post-anal tail and a notochord'],
  sol: 'These are molluscs: soft, unsegmented body with a head, foot, visceral hump and mantle — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('echino-mcq', mcq({
  stem: 'A starfish creeps over a rock and pulls open a mussel. The system chiefly responsible for its movement and food capture is the',
  right: 'water vascular system',
  wrong: ['tracheal system', 'nephridial system', 'closed blood vascular system'],
  sol: 'Echinoderms have a water vascular system for locomotion, capture and transport of food, and respiration — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('larva-mcq', mcq({
  stem: 'A marine biologist notes that the free-swimming larva of a sea urchin is bilaterally symmetrical, whereas the adult is not. What does this show about adult echinoderms?',
  right: 'They are radially symmetrical, though their larvae are bilateral',
  wrong: ['They are asymmetrical like sponges in all stages', 'They are bilateral in the adult and radial as larvae', 'They are radially symmetrical in all stages of life'],
  sol: 'Adult echinoderms are radially symmetrical but the larvae are bilaterally symmetrical — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('hemi-mcq', mcq({
  stem: 'A worm-like marine animal has a body divided into proboscis, collar and trunk, and breathes through gills. It is a member of',
  right: 'Hemichordata, such as Balanoglossus',
  wrong: ['Aschelminthes, such as Ascaris', 'Annelida, such as Nereis', 'Echinodermata, such as Cucumaria'],
  sol: 'Proboscis, collar and trunk mark the hemichordates (Balanoglossus, Saccoglossus) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('echino-ar', ar({
  a: 'The free-swimming larvae of echinoderms are radially symmetrical.',
  r: 'Adult echinoderms are radially symmetrical.',
  key: 'd',
  sol: 'A is false: the larvae are bilaterally symmetrical. R is true — option (d).',
  d: 3, c: 'understanding', t: [2],
}));
add('cnida-tf', tf({
  stem: 'A coelenterate has a gut with a single opening, the hypostome, which acts as both mouth and anus.',
  key: 't',
  sol: 'True. The gastrovascular cavity opens by a single opening, so the gut is incomplete.',
  d: 1, c: 'understanding', t: [2],
}));
add('radula-fill', fill({
  stem: 'The file-like rasping organ in the mouth of a mollusc, used in feeding, is called the ______.',
  acc: [['radula']],
  sol: 'Radula.',
  d: 1, c: 'recall', t: [2],
}));
add('metagen-fill', fill({
  stem: 'The alternation of the polyp and medusa forms in Obelia is called ______.',
  acc: [['metagenesis']],
  sol: 'Metagenesis.',
  d: 1, c: 'recall', t: [2],
}));
add('phyla-match', match({
  stem: 'Match each animal (column I) with its phylum (column II).',
  pairs: [
    ['Sycon', 'Porifera'],
    ['Pleurobrachia', 'Ctenophora'],
    ['Taenia', 'Platyhelminthes'],
    ['Asterias', 'Echinodermata'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Sycon is a sponge, Pleurobrachia a comb jelly, Taenia a flatworm and Asterias a starfish.',
  d: 1, c: 'recall', t: [2],
}));
add('comb-num', num({
  stem: `A ctenophore has ${N.combRows} rows of comb plates, and each row carries ${N.platesPerRow} plates in an imagined specimen. How many comb plates does the animal have in all?`,
  value: N.combPlates,
  sol: r`$${N.combRows} \times ${N.platesPerRow} = ${N.combPlates}$ comb plates.`,
  scheme: [[`${N.combPlates}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 192 || 'value');
add('museum-num', num({
  stem: `A museum has ${N.museum} named animal species. If exactly two-thirds of them are arthropods, how many species are arthropods?`,
  value: N.museumArthropods,
  sol: r`$${N.museum} \times \dfrac{2}{3} = ${N.museumArthropods}$ species.`,
  scheme: [[`${N.museumArthropods}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 60 || 'value');
add('seg-num', num({
  stem: `An earthworm has ${N.segments} body segments. A student cuts it after segment ${N.cutAfter}, counting from the head end. How many segments are in the posterior piece?`,
  value: N.rest,
  sol: r`$${N.segments} - ${N.cutAfter} = ${N.rest}$ segments.`,
  scheme: [[`${N.rest}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 80 || 'value');
add('sponge-short', short({
  marks: 2,
  stem: 'Describe the path of water through a sponge and state two functions of this flow.',
  model: 'Water enters through the **ostia**, passes into the central cavity, the **spongocoel**, lined by **choanocytes**, and leaves through the **osculum**. The flow brings **food** and **oxygen** (respiratory exchange) and carries away **wastes**.',
  sol: 'Ostia, spongocoel, osculum; two functions.',
  scheme: [['Path through ostia, spongocoel, osculum', 1], ['Two functions', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('cnido-short', short({
  marks: 2,
  stem: 'A swimmer is stung by a jellyfish. Name the cells responsible, where they are found and one use of them to the jellyfish.',
  model: 'The **cnidoblasts** (cnidocytes), which contain **stinging capsules**, are found on the **tentacles and body** of coelenterates. They serve for **defence**, **capture of prey** and **anchorage**.',
  sol: 'Cnidoblasts on tentacles; defence, prey, anchorage.',
  scheme: [['Cnidoblasts with stinging capsules on tentacles and body', 1], ['A use', 1]],
  d: 2, c: 'application', t: [2],
}));
add('flame-short', short({
  marks: 2,
  stem: 'Name the larger group of worms to which a liver fluke belongs and state two features that adapt it to a parasitic life.',
  model: 'A liver fluke is a **flatworm (Platyhelminthes)**. Parasitic forms have **hooks and suckers** for holding on to the host, and some **absorb nutrients directly through the body surface** from the host.',
  sol: 'Platyhelminthes; hooks and suckers; absorption.',
  scheme: [['Platyhelminthes', 0.5], ['Hooks and suckers', 0.5], ['Absorption of nutrients through the body surface', 1]],
  d: 2, c: 'application', t: [2],
}));
add('ctene-short', short({
  marks: 2,
  stem: 'State two features of ctenophores that distinguish them from coelenterates.',
  model: 'Ctenophores have **eight external rows of ciliated comb plates** for locomotion, which coelenterates lack. They are exclusively **marine** and show well-marked **bioluminescence**, and reproduce **only sexually**, whereas coelenterates have cnidoblasts and polyp and medusa forms.',
  sol: 'Comb plates; bioluminescence; only sexual reproduction.',
  scheme: [['Comb plates', 1], ['One more distinguishing feature', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('platyasch-short', short({
  marks: 3,
  stem: 'Give three differences between flatworms and roundworms.',
  model: '**Flatworms** are **dorsoventrally flattened**, **acoelomate** and have an **organ** level with an **incomplete gut**; many are parasites with hooks and suckers and have **flame cells**. **Roundworms** are **circular in cross-section**, **pseudocoelomate**, with an **organ-system** level and a **complete gut**; their **sexes are separate**.',
  sol: 'Shape, body cavity, gut.',
  scheme: [['Shape and level of organisation', 1], ['Body cavity', 1], ['Gut or sexes', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('annel-short', short({
  marks: 3,
  stem: 'List three salient features of phylum Annelida, with two examples.',
  model: 'Annelids are **bilaterally symmetrical, triploblastic and coelomate** animals living in marine, freshwater or terrestrial habitats, with a **metamerically segmented** body at the **organ-system** level. They have **longitudinal and circular muscles** for locomotion, **nephridia** for excretion and osmoregulation, and a **closed circulatory system**. Examples are **Nereis**, with parapodia, and the **earthworm Pheretima**.',
  sol: 'Segmentation, coelom, nephridia, closed circulation; examples.',
  scheme: [['Three features', 2], ['Two examples', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('arth-short', short({
  marks: 3,
  stem: 'Why is Arthropoda called the largest phylum of the animal kingdom? State two features of its members.',
  model: 'Over **two-thirds of all named species** on Earth are arthropods, which makes it the **largest phylum**. Their body is covered by a **chitinous exoskeleton** and divided into **head, thorax and abdomen**, with **jointed appendages**; they have an **open circulatory system** and excrete through **Malpighian tubules**.',
  sol: 'Two-thirds of named species; two features.',
  scheme: [['Over two-thirds of named species', 1], ['Chitinous exoskeleton and jointed appendages', 1], ['One more feature', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('moll3-short', short({
  marks: 3,
  stem: 'A student examines a pond snail. Name its three main body regions and describe the mantle cavity and the radula.',
  model: 'A mollusc has a distinct **head**, a muscular **foot** and a **visceral hump**, covered by a **calcareous shell**. The soft skin forms a **mantle** over the hump, enclosing the **mantle cavity** with feather-like **gills** that serve respiration and excretion. In the mouth the **radula** is a file-like organ for feeding.',
  sol: 'Head, foot, visceral hump; mantle cavity with gills; radula.',
  scheme: [['Head, foot and visceral hump', 1], ['Mantle cavity with gills', 1], ['Radula', 1]],
  d: 2, c: 'application', t: [2],
}));
add('echino-short', short({
  marks: 3,
  stem: 'State three features of echinoderms, and explain what is peculiar about their symmetry.',
  model: 'Echinoderms are marine, have a **spiny skin** with an endoskeleton of **calcareous ossicles**, and a **water vascular system** that helps in locomotion, food capture and respiration; they have no excretory system. **Adults are radially symmetrical but the larvae are bilaterally symmetrical.**',
  sol: 'Spines, ossicles, water vascular system; radial adult, bilateral larva.',
  scheme: [['Three features', 2], ['Radial adult and bilateral larva', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('nonch-a-long', long({
  stem: 'Describe the salient features of Porifera, Coelenterata and Ctenophora, with two examples each.',
  model: '**Porifera.** Mostly marine, asymmetrical, with a cellular level of organisation. Water enters through ostia into the spongocoel, lined by choanocytes, and leaves through the osculum, bringing food and oxygen and removing wastes. The skeleton is of spicules or spongin; they are hermaphrodite. Examples: *Sycon*, *Spongilla*.\n\n**Coelenterata.** Aquatic, mostly marine, radially symmetrical, tissue level, diploblastic. A gastrovascular cavity has one opening, the hypostome. Cnidoblasts on the tentacles serve for anchorage, defence and prey capture. The body forms are polyp and medusa, with metagenesis in *Obelia*. Examples: *Physalia*, *Adamsia*.\n\n**Ctenophora.** Exclusively marine, radial, diploblastic, with eight rows of ciliated comb plates and well-marked bioluminescence; reproduction is only sexual. Examples: *Pleurobrachia*, *Ctenoplana*.',
  sol: 'Salient features and examples of three phyla.',
  scheme: [['Porifera', 1.5], ['Coelenterata', 1.5], ['Ctenophora', 1], ['Examples', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('nonch-b-long', long({
  stem: 'Compare Platyhelminthes, Aschelminthes and Annelida in body cavity, symmetry, level of organisation, special structures and examples.',
  model: '**Platyhelminthes.** Dorsoventrally flattened, bilateral, triploblastic, acoelomate, organ level. Mostly endoparasites with hooks and suckers; flame cells for osmoregulation and excretion; high regeneration. Examples: *Taenia*, *Fasciola*.\n\n**Aschelminthes.** Circular in cross-section, bilateral, triploblastic, pseudocoelomate, organ-system level. The gut is complete with a muscular pharynx; sexes are separate, females often longer. Examples: *Ascaris*, *Wuchereria*, *Ancylostoma*.\n\n**Annelida.** Bilateral, triploblastic, coelomate and metamerically segmented, organ-system level. They have longitudinal and circular muscles, nephridia, a closed circulation and, in *Nereis*, parapodia. Examples: *Nereis*, *Pheretima*, *Hirudinaria*.\n\nSo the body cavity changes from none, to a pseudocoelom, to a true coelom, and segmentation first appears in the annelids.',
  sol: 'Three worm phyla compared.',
  scheme: [['Platyhelminthes', 1.5], ['Aschelminthes', 1.5], ['Annelida', 1.5], ['Trend in body cavity', 0.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1, 2],
}));
add('nonch-c-long', long({
  stem: 'Describe the salient features of Arthropoda, Mollusca, Echinodermata and Hemichordata, with examples.',
  model: '**Arthropoda.** The largest phylum, with over two-thirds of named species. Triploblastic, coelomate, bilateral and segmented, with a chitinous exoskeleton, head, thorax and abdomen, jointed appendages, open circulation and Malpighian tubules. Respiration is by gills, book gills, book lungs or tracheae. Examples: *Apis*, *Bombyx*, *Anopheles*, *Locusta*, *Limulus*.\n\n**Mollusca.** A calcareous shell, an unsegmented soft body with head, muscular foot and visceral hump; a mantle cavity with gills; a radula. Examples: *Pila*, *Pinctada*, *Sepia*, *Octopus*.\n\n**Echinodermata.** Marine, spiny-skinned with calcareous ossicles, radial adults and bilateral larvae, water vascular system, no excretory system. Examples: *Asterias*, *Echinus*, *Cucumaria*.\n\n**Hemichordata.** Worm-like marine animals with proboscis, collar and trunk, open circulation and gills. Examples: *Balanoglossus*, *Saccoglossus*.',
  sol: 'Four phyla with examples.',
  scheme: [['Arthropoda', 1.5], ['Mollusca', 1.5], ['Echinodermata', 1], ['Hemichordata and examples', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [2],
}));
add('place-long', long({
  stem: 'A rock-pool survey records five unknown animals: P is radial and diploblastic with stinging cells; Q has a calcareous shell, a muscular foot and a radula; R is segmented and coelomate with jointed appendages and a chitinous exoskeleton; S has spiny skin and a water vascular system; T is a flat, acoelomate parasite with hooks. Name the phylum of each animal with reasons, and say which two share the coelomate condition but differ in segmentation.',
  model: '**P** is a **coelenterate**: radial symmetry, two germ layers and cnidoblasts. **Q** is a **mollusc**: shell, muscular foot and radula, with an unsegmented soft body. **R** is an **arthropod**: segmented coelomate with jointed appendages and a chitinous exoskeleton. **S** is an **echinoderm**: spiny skin and a water vascular system. **T** is a **platyhelminth** (flatworm): acoelomate, flat, with hooks and suckers.\n\nQ and R are both coelomates, but the mollusc is unsegmented while the arthropod is metamerically segmented. S is also coelomate and unsegmented. Segmentation, body cavity and special structures together fix each phylum.',
  sol: 'Five phyla placed with reasons; coelomate comparison.',
  scheme: [['P and Q placed with reasons', 1.5], ['R, S and T placed with reasons', 2], ['Segmentation contrast between coelomates', 1.5]],
  wl: [80, 240],
  d: 3, c: 'application', t: [1, 2],
}), () => phylumFrom({ layers: 'diploblastic' }).includes('Coelenterata') || 'phylum');

// ---------------------------------------------------------------- t03 chordates
add('chord-mcq', mcq({
  stem: 'A zoologist wants to be certain that an unfamiliar animal is a chordate. Which set of features should she look for at some stage of its life?',
  right: 'A notochord, a dorsal hollow nerve cord, gill slits in the pharynx and a post-anal tail',
  wrong: ['A ventral solid nerve cord, a notochord and a dorsal heart', 'A chitinous exoskeleton, jointed legs and Malpighian tubules', 'A water vascular system, spiny skin and a nerve ring'],
  sol: 'Chordates have a notochord, a dorsal hollow nerve cord, paired pharyngeal gill slits and a post-anal tail — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('chordL-mcq', mcq({
  stem: 'In the figure of a simple chordate, which marked part is the notochord, and which is the dorsal hollow nerve cord?',
  right: 'B is the notochord and A is the nerve cord',
  wrong: ['A is the notochord and B is the nerve cord', 'C is the notochord and D is the nerve cord', 'E is the notochord and A is the nerve cord'],
  sol: 'The hollow tube along the back (A) is the nerve cord; the supporting rod below it (B) is the notochord — option (@K).',
  assets: [L.chord],
  d: 2, c: 'application', t: [3],
}));
add('chordL2-mcq', mcq({
  stem: 'In the figure of a simple chordate, which marked parts are the pharyngeal gill slits and the post-anal tail?',
  right: 'C and E',
  wrong: ['A and D', 'B and D', 'D and E'],
  sol: 'C marks the slits in the pharynx and E the tail that extends beyond the anus; A is the nerve cord, B the notochord and D the ventral heart — option (@K).',
  assets: [L.chord],
  d: 3, c: 'analysis', t: [3],
}));
add('subphyla-mcq', mcq({
  stem: 'In which chordates is the notochord present only in the larval tail?',
  right: 'Urochordata',
  wrong: ['Cephalochordata', 'Vertebrata', 'Cyclostomata'],
  sol: 'In Urochordata (such as Ascidia) the notochord is limited to the larval tail — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('cephalo-mcq', mcq({
  stem: 'A lancelet, Branchiostoma, buries itself in sand but keeps its notochord running from head to tail throughout life. It is placed in',
  right: 'Cephalochordata',
  wrong: ['Urochordata', 'Vertebrata', 'Hemichordata'],
  sol: 'A notochord from head to tail throughout life marks the Cephalochordata — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('vert-mcq', mcq({
  stem: 'What happens to the notochord in an adult vertebrate?',
  right: 'It is replaced by a cartilaginous or bony vertebral column.',
  wrong: ['It stays unchanged from head to tail throughout life.', 'It remains only in the larval tail and disappears from the adult body.', 'It turns into the dorsal hollow nerve cord.'],
  sol: 'In vertebrates the notochord is replaced by a cartilaginous or bony vertebral column in the adult — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cyclo-mcq', mcq({
  stem: 'A jawless fish with a sucking, circular mouth is found attached to a host fish. It has several pairs of gill slits. It most probably belongs to',
  right: 'Cyclostomata, such as a lamprey',
  wrong: ['Chondrichthyes, such as a shark', 'Osteichthyes, such as a rohu', 'Amphibia, such as a toad'],
  sol: 'Jawless, sucking mouth and 6 to 15 pairs of gill slits mark the cyclostomes, ectoparasites on some fishes — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('chondri-mcq', mcq({
  stem: 'An aquarium keeper notices that a dog shark must keep swimming to avoid sinking. Which feature of cartilaginous fishes explains this?',
  right: 'Absence of an air bladder',
  wrong: ['Presence of an operculum', 'A three-chambered heart', 'Cycloid scales'],
  sol: 'Chondrichthyes have no air bladder, so they must swim constantly; they also lack an operculum — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('osteich-mcq', mcq({
  stem: 'A rohu is lifted from a pond. Its gills lie under a bony flap on each side of the head. This flap is the',
  right: 'operculum',
  wrong: ['clasper', 'cloaca', 'tympanum'],
  sol: 'Bony fishes have four pairs of gills covered by an operculum — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('amphi-mcq', mcq({
  stem: 'In a frog the gut, the urinary tract and the reproductive tract all open into a common chamber. This chamber is the',
  right: 'cloaca',
  wrong: ['operculum', 'mantle cavity', 'gizzard'],
  sol: 'In amphibians the alimentary canal, urinary and reproductive tracts open into a common cloaca — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('heart-mcq', mcq({
  stem: 'A frog dissected in the laboratory shows two atria and one ventricle. How many chambers does its heart have?',
  right: 'Three',
  wrong: ['Two', 'Four', 'Five'],
  sol: 'Amphibians have a three-chambered heart: two auricles (atria) and one ventricle — option (@K).',
  d: 1, c: 'application', t: [3],
}), () => C.Amphibia.heart === 3 || 'heart');
add('rept-mcq', mcq({
  stem: 'A zookeeper says: "All reptiles have a three-chambered heart." Which reptile makes this statement incorrect?',
  right: 'Crocodile, which has a four-chambered heart',
  wrong: ['Turtle, which has a two-chambered heart', 'Lizard, which has a four-chambered heart', 'Cobra, which has a two-chambered heart'],
  sol: 'Reptiles usually have a three-chambered heart, but crocodiles have a four-chambered heart — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('aves-mcq', mcq({
  stem: 'A pigeon and a bat both fly. Which feature is found in the pigeon but not in the bat?',
  right: 'Hollow long bones with air cavities',
  wrong: ['A four-chambered heart', 'Warm-blooded body', 'Lungs for respiration'],
  sol: 'Birds have a fully ossified skeleton with pneumatic (hollow) long bones; both are warm-blooded with a four-chambered heart and lungs — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('mamm-mcq', mcq({
  stem: 'Which feature is unique to mammals among all vertebrates?',
  right: 'Mammary glands that nourish the young',
  wrong: ['A four-chambered heart', 'Warm-blooded body temperature', 'Respiration by lungs'],
  sol: 'The most unique feature of mammals is the presence of mammary glands; birds also have a four-chambered heart and are warm-blooded — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('whale-mcq', mcq({
  stem: 'A dolphin and a rohu both live in water and have a streamlined body. A dolphin is classified in a different class because it',
  right: 'has mammary glands, breathes by lungs and has a four-chambered heart',
  wrong: ['lays soft-shelled eggs and has dry scaly skin', 'has gills covered by an operculum and an air bladder', 'has a two-chambered heart and cartilaginous bones'],
  sol: 'Dolphins (Delphinus) are mammals, with mammary glands, lungs and a four-chambered heart — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('platypus-mcq', mcq({
  stem: 'A naturalist finds that a duck-billed Ornithorhynchus lays eggs yet feeds its young with milk. This shows that',
  right: 'mammals are mostly viviparous, but a few, like the platypus, are oviparous',
  wrong: ['all mammals lay eggs and feed their young with milk', 'platypus is a reptile because it lays eggs', 'milk-producing animals are always viviparous without exception'],
  sol: 'Mammals are viviparous with few exceptions; Ornithorhynchus is an oviparous mammal — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('class-ar', ar({
  a: 'A whale is classified as a mammal and not as a fish.',
  r: 'Whales possess mammary glands and breathe by lungs.',
  key: 'a',
  sol: 'Both are true, and the mammary glands and lungs are the reasons for placing a whale in Mammalia — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('croc-ar', ar({
  a: 'All reptiles have a three-chambered heart.',
  r: 'Crocodiles have a four-chambered heart.',
  key: 'd',
  sol: 'A is false: reptiles usually have a three-chambered heart but crocodiles have four chambers. R is true — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('shark-ar', ar({
  a: 'Sharks must swim constantly to avoid sinking.',
  r: 'Cartilaginous fishes have no air bladder.',
  key: 'a',
  sol: 'Both are true, and the absence of an air bladder explains why they must keep swimming — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('aves-ar', ar({
  a: 'Birds have a skeleton well suited to flight.',
  r: 'The long bones of birds are solid, without air cavities.',
  key: 'c',
  sol: 'A is true; R is false, because the long bones of birds are hollow with air cavities (pneumatic) — option (c).',
  d: 2, c: 'understanding', t: [3],
}));
add('flight-tf', tf({
  stem: 'All birds can fly, as their forelimbs are modified into wings.',
  key: 'f',
  sol: 'False. Wings are present in all birds, but flightless birds such as the ostrich cannot fly.',
  d: 1, c: 'understanding', t: [3],
}));
add('hemi-tf', tf({
  stem: 'Hemichordates were once treated as a subphylum of Chordata but are now placed among the non-chordates.',
  key: 't',
  sol: 'True. They are now a separate phylum under non-chordata.',
  d: 1, c: 'recall', t: [3],
}));
add('four-fill', fill({
  stem: 'Birds are warm-blooded and have a ______-chambered heart. (Write the number as a word.)',
  acc: [['four', '4']],
  sol: 'Four.',
  d: 1, c: 'recall', t: [3],
}));
add('class-match', match({
  stem: 'Match each feature (column I) with the class in which it occurs (column II).',
  pairs: [
    ['Placoid scales', 'Chondrichthyes'],
    ['Operculum over four pairs of gills', 'Osteichthyes'],
    ['Cloaca and moist skin', 'Amphibia'],
    ['Pneumatic bones and a crop', 'Aves'],
  ],
  order: [2, 0, 1, 3],
  sol: 'Placoid scales: cartilaginous fishes; operculum: bony fishes; cloaca and moist skin: amphibians; pneumatic bones and crop: birds.',
  d: 1, c: 'recall', t: [3],
}));
add('gill-num', num({
  stem: `A lamprey has ${N.gill12 / 2} pairs of gill slits on its body. How many gill slits does it have in all?`,
  value: N.gill12,
  sol: r`$${N.gill12 / 2} \times 2 = ${N.gill12}$ gill slits.`,
  scheme: [[`${N.gill12}`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 24 || 'value');
add('heart2-num', num({
  stem: `A student lists the hearts of six animals: a catla, a trygon, a toad, a chameleon, a penguin and a camel. Counting the chambers of each heart, what is the total number of chambers?`,
  value: N.hearts2,
  sol: r`Catla $2$, trygon $2$, toad $3$, chameleon $3$, penguin $4$, camel $4$: $2 + 2 + 3 + 3 + 4 + 4 = ${N.hearts2}$.`,
  scheme: [['Chambers per animal', 0.5], [`${N.hearts2}`, 0.5]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 18 || 'value');
add('chordfeat-short', short({
  marks: 2,
  stem: 'State two ways in which the nervous system and the pharynx of chordates differ from those of non-chordates.',
  model: 'In chordates the **central nervous system is dorsal, hollow and single**, whereas in non-chordates it is **ventral, solid and double**. The **pharynx** of a chordate is **perforated by gill slits**, but in non-chordates the pharynx has **no gill slits**.',
  sol: 'Nerve cord and pharynx contrasts.',
  scheme: [['Dorsal hollow single versus ventral solid double', 1], ['Gill slits present versus absent', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('protochord-short', short({
  marks: 2,
  stem: 'Distinguish Urochordata from Cephalochordata with an example of each.',
  model: 'In **Urochordata**, such as **Ascidia**, the **notochord is present only in the larval tail**. In **Cephalochordata**, such as **Branchiostoma** (lancelet), the **notochord extends from head to tail and persists throughout life**.',
  sol: 'Notochord position; examples.',
  scheme: [['Urochordata with example', 1], ['Cephalochordata with example', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('cyclo-short', short({
  marks: 2,
  stem: 'Mention two features of cyclostomes and explain their breeding habit.',
  model: 'Cyclostomes have a **sucking, circular mouth without jaws** and **six to fifteen pairs of gill slits**; they are ectoparasites on some fishes. Though marine, they **migrate to fresh water to spawn**, and **die within a few days**; the larvae then return to the ocean.',
  sol: 'Two features; migration and spawning.',
  scheme: [['Two features', 1], ['Migration to fresh water and death after spawning', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('fish-short', short({
  marks: 3,
  stem: 'Compare cartilaginous fishes and bony fishes on skeleton, gill cover and air bladder.',
  model: 'Cartilaginous fishes (Chondrichthyes) have a **cartilaginous skeleton**, **separate gill slits without an operculum** and **no air bladder**, so they must swim constantly. Bony fishes (Osteichthyes) have a **bony skeleton**, **four pairs of gills covered by an operculum** and an **air bladder** that regulates buoyancy.',
  sol: 'Skeleton, gill cover, air bladder.',
  scheme: [['Skeleton', 1], ['Gill cover', 1], ['Air bladder', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('amphrept-short', short({
  marks: 3,
  stem: 'A child asks how to tell a frog from a lizard by their skin, heart and fertilisation. Answer with three differences.',
  model: 'A **frog** (amphibian) has **moist skin without scales**, a **three-chambered heart** with two atria and one ventricle, and **external fertilisation**. A **lizard** (reptile) has **dry, cornified skin with scales**, a heart that is **usually three-chambered**, and **internal fertilisation** with direct development. Both are cold-blooded, so these three points separate them.',
  sol: 'Skin, heart and fertilisation contrasts.',
  scheme: [['Skin', 1], ['Heart', 1], ['Fertilisation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('aves-short', short({
  marks: 3,
  stem: 'Explain three adaptations of a bird for flight.',
  model: 'The **forelimbs are modified into wings** and the body is covered with **feathers**. The **long bones are hollow with air cavities (pneumatic)**, which lightens the body, and **air sacs connected to the lungs** supplement respiration. A **four-chambered heart** and **warm-blooded** body support the high energy needs of flight.',
  sol: 'Wings and feathers, pneumatic bones, air sacs.',
  scheme: [['Wings and feathers', 1], ['Pneumatic bones', 1], ['Air sacs or heart', 1]],
  d: 2, c: 'application', t: [3],
}));
add('mamm-short', short({
  marks: 3,
  stem: 'State three features that place an animal in class Mammalia, and name one oviparous mammal.',
  model: 'Mammals have **mammary glands** that nourish the young, **hair** on the skin and **external ears (pinnae)**, with different types of teeth, a **four-chambered heart** and a **warm-blooded** body, and they breathe by lungs. Most are **viviparous** with direct development, but the **platypus (Ornithorhynchus)** is oviparous.',
  sol: 'Three features; platypus.',
  scheme: [['Mammary glands', 1], ['Two more features', 1], ['Platypus named', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('chordate-long', long({
  stem: 'Describe the fundamental features of phylum Chordata, contrast it with the non-chordates, and describe its three subphyla.',
  model: '**Features.** Chordates are bilaterally symmetrical, triploblastic and coelomate with organ systems. At some stage they have a notochord, a dorsal hollow nerve cord, paired pharyngeal gill slits and a post-anal tail, and a closed circulatory system with a ventral heart.\n\n**Contrast.** In non-chordates the nerve cord is ventral, solid and double, there is no notochord or gill slits, the heart (if present) is dorsal and there is no post-anal tail.\n\n**Subphyla.** In *Urochordata* (*Ascidia*, *Salpa*) the notochord is present only in the larval tail. In *Cephalochordata* (*Branchiostoma*) it extends from head to tail and persists throughout life. In *Vertebrata* the notochord is replaced by a cartilaginous or bony vertebral column in the adult; there is a muscular ventral heart of two, three or four chambers, kidneys for excretion and osmoregulation, and paired fins or limbs. Urochordates and cephalochordates are called protochordates.',
  sol: 'Chordate features; contrast; three subphyla.',
  scheme: [['Chordate features', 1.5], ['Contrast with non-chordates', 1], ['Urochordata and Cephalochordata', 1.5], ['Vertebrata', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [3],
}));
add('fishes-long', long({
  stem: 'Describe the salient features of the jawless and jawed fishes, comparing cyclostomes, cartilaginous fishes and bony fishes with examples.',
  model: '**Cyclostomata** (jawless): ectoparasites on some fishes, with a sucking circular mouth without jaws and 6–15 pairs of gill slits, a cartilaginous cranium and vertebral column and no limbs; they migrate to fresh water to spawn. *Petromyzon*, *Myxine*.\n\n**Chondrichthyes:** marine, streamlined, with a cartilaginous skeleton and a ventral mouth. Separate gill slits without an operculum; placoid scales; no air bladder, so they must swim constantly; two-chambered heart; cold-blooded; males have claspers; internal fertilisation, mostly viviparous. *Scoliodon*, *Trygon*, *Carcharodon*.\n\n**Osteichthyes:** marine or freshwater, with a bony skeleton; four pairs of gills under an operculum; cycloid or ctenoid scales; an air bladder regulates buoyancy; two-chambered heart; cold-blooded; fertilisation usually external, oviparous. *Labeo*, *Catla*, *Exocoetus*, *Hippocampus*.',
  sol: 'Three fish classes compared.',
  scheme: [['Cyclostomata', 1.5], ['Chondrichthyes', 1.5], ['Osteichthyes', 1.5], ['Examples', 0.5]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [3],
}));
add('tetra-long', long({
  stem: 'Compare the four tetrapod classes, Amphibia, Reptilia, Aves and Mammalia, with respect to body covering, heart, body temperature, fertilisation and examples.',
  model: '**Amphibia:** moist skin without scales, a cloaca, a tympanum, respiration by gills, lungs and skin, a three-chambered heart, cold-blooded, external fertilisation, oviparous. *Rana*, *Bufo*.\n\n**Reptilia:** dry cornified skin with scales or scutes, lungs, a heart that is usually three-chambered but four-chambered in crocodiles, cold-blooded, internal fertilisation, oviparous with direct development. *Calotes*, *Crocodilus*, *Naja*.\n\n**Aves:** feathers, wings, pneumatic bones, crop and gizzard, a four-chambered heart, warm-blooded, lungs with air sacs, internal fertilisation, oviparous. *Columba*, *Struthio*.\n\n**Mammalia:** hair, mammary glands, pinnae, different types of teeth, a four-chambered heart, warm-blooded, lungs, internal fertilisation, mostly viviparous. *Canis*, *Macropus*, *Ornithorhynchus* (oviparous).',
  sol: 'Four tetrapod classes compared.',
  scheme: [['Amphibia', 1.5], ['Reptilia', 1.5], ['Aves', 1], ['Mammalia', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [3],
}));
add('evaluate-long', long({
  stem: 'A student claims: "Whales and sharks are both fishes because they live in water and swim, and all warm-blooded animals are viviparous." Evaluate this claim using the characters of the classes of chordates.',
  model: '**Whales.** The claim is wrong about whales. A whale such as *Balaenoptera* has mammary glands, hair (at least in part), lungs for respiration and a four-chambered heart, and it is warm-blooded; it is a mammal. Living in water does not decide the class.\n\n**Sharks.** A shark is a cartilaginous fish: it has a cartilaginous skeleton, placoid scales, gill slits without an operculum, a two-chambered heart, and it is cold-blooded. So the two animals are in different classes and have nothing in common except their habitat.\n\n**Warm-blooded and viviparous.** Only birds and mammals are warm-blooded. Birds are oviparous, with direct development, so the second part is false. Among mammals most are viviparous, but the platypus *Ornithorhynchus* is oviparous.\n\n**Judgement.** Both parts of the claim fail: whales are mammals, not fishes, and warm-blooded does not mean viviparous.',
  sol: 'Evaluates both parts using class characters.',
  scheme: [['Whale as a mammal with reasons', 1.5], ['Shark as a cartilaginous fish with reasons', 1.5], ['Birds and platypus against the second claim', 1], ['Reasoned judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [3],
}), () => classFrom({ warm: true }).join() === 'Aves,Mammalia' || 'class');

// ---------------------------------------------------------------- cases
{
  const rows = ROCKPOOL.map(([a, p], i) => `| ${i + 1} | ${a} |`).join('\n');
  add('rock-case', mk.case({
    passage: `A school group surveys a rock pool at low tide and records eight animals.\n\n| No. | Animal |\n|---|---|\n${rows}\n\nThe teacher reminds the students to note the symmetry and body cavity of each animal.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which animal in the list scrapes its food with a radula?',
        right: 'The snail',
        wrong: ['The sea anemone', 'The sea cucumber', 'The sponge'],
        sol: 'A radula is a file-like rasping organ of molluscs; the snail is a mollusc — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'How many of the eight animals are coelomates?',
        value: N.rockCoelomate,
        sol: `Sea urchin and sea cucumber (echinoderms), snail and chiton (molluscs), hermit crab (arthropod) and ragworm (annelid) are coelomates; the anemone is diploblastic with no coelom and the sponge has no body cavity: $2 + 2 + 1 + 1 = ${N.rockCoelomate}$.`,
        scheme: [[`${N.rockCoelomate}`, 1]],
        d: 2, c: 'application', t: [1, 2],
      })),
      part('c', short({
        marks: 2,
        stem: 'The students note that the sea anemone is radially symmetrical and diploblastic, while the sea urchin is also radial. Explain how one of these animals differs from the other in germ layers and in the symmetry of its larva.',
        model: 'The **sea anemone**, a coelenterate, is **diploblastic**, with ectoderm and endoderm and a mesoglea between them. The **sea urchin**, an echinoderm, is **triploblastic** and coelomate, and although the adult is radial its **larva is bilaterally symmetrical**.',
        sol: 'Diploblastic versus triploblastic; bilateral larva of echinoderms.',
        scheme: [['Anemone diploblastic; urchin triploblastic', 1], ['Urchin larva bilateral', 1]],
        d: 3, c: 'analysis', t: [1, 2],
      }), [
        short({
          marks: 2,
          stem: 'The ragworm (Nereis) and the hermit crab are both segmented coelomates. State two ways to tell them apart.',
          model: 'The **ragworm** is an **annelid** with a soft body of similar segments, lateral **parapodia** for swimming and a **closed** circulation; its excretory organs are **nephridia**. The **hermit crab** is an **arthropod** with a **chitinous exoskeleton**, **jointed appendages** and **open** circulation.',
          sol: 'Annelid versus arthropod features.',
          scheme: [['Annelid features', 1], ['Arthropod features', 1]],
          d: 2, c: 'application', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 6 || 'value');
}
{
  add('worm-case', mk.case({
    passage: `A parasitology class receives nine worms in a tray and sorts them by body plan.\n\n| Worm | Body shape |\n|---|---|\n| Tapeworm | Flat, ribbon-like |\n| Liver fluke | Flat, leaf-like |\n| Planarian | Flat |\n| Roundworm | Round in cross-section |\n| Hookworm | Round in cross-section |\n| Earthworm | Cylindrical, many rings |\n| Leech | Rings, with a sucker |\n| Sandworm | Rings, with lateral appendages |\n| Filarial worm | Thread-like, round |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Flame cells, used for osmoregulation, would be found in which worms?',
        right: 'The tapeworm, liver fluke and planarian',
        wrong: ['The roundworm, hookworm and filarial worm', 'The earthworm, leech and sandworm', 'All nine worms'],
        sol: 'Flame cells belong to flatworms (Platyhelminthes); roundworms excrete through an excretory tube and annelids use nephridia — option (@K).',
        d: 2, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'How many of the nine worms are metamerically segmented?',
        value: N.wormsSegmented,
        sol: `The earthworm, leech and sandworm are annelids with segmented bodies; flatworms and roundworms are not: $${N.wormsSegmented}$.`,
        scheme: [[`${N.wormsSegmented}`, 1]],
        d: 1, c: 'application', t: [1, 2],
      })),
      part('c', short({
        marks: 2,
        stem: 'The roundworms in the tray have a body cavity, but a student says they are not true coelomates. Justify her statement.',
        model: 'In **roundworms** (Aschelminthes) the **mesoderm** is present only as **scattered pouches** between the ectoderm and endoderm, so the cavity is **not completely lined by mesoderm**. It is therefore a **pseudocoelom**, not a true coelom as in the annelids.',
        sol: 'Mesoderm in scattered pouches: pseudocoelom.',
        scheme: [['Mesoderm only in scattered pouches', 1], ['Not lined by mesoderm: pseudocoelom', 1]],
        d: 3, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Name two features that would help the class tell the earthworm from the roundworm.',
          model: 'The **earthworm** is a **segmented annelid**, with a true **coelom**, **nephridia** and a **closed circulation**. The **roundworm** is **unsegmented**, with a **pseudocoelom**, and the sexes are **separate** with the female often longer.',
          sol: 'Segmentation, coelom type, or sexes.',
          scheme: [['Segmentation or coelom', 1], ['One more difference', 1]],
          d: 2, c: 'application', t: [1, 2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 3 || 'value');
}
{
  add('fish-case', mk.case({
    passage: `An aquarium holds a dog shark, a rohu, a lamprey attached to a rock and a toad on a floating log. The keeper notes that the lamprey has ${N.gill9} gill slits in all, counted along both sides, and that the shark rests only when held in a gentle current.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which of the four animals has its gills covered by an operculum?',
        right: 'The rohu',
        wrong: ['The dog shark', 'The lamprey', 'The toad'],
        sol: 'Bony fishes such as the rohu have four pairs of gills covered by an operculum — option (@K).',
        d: 1, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'How many pairs of gill slits does the lamprey have?',
        value: N.gill9 / 2,
        sol: r`${N.gill9} slits $\div 2 = ${N.gill9 / 2}$ pairs, within the 6 to 15 pairs of cyclostomes.`,
        scheme: [[`${N.gill9 / 2}`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the dog shark must keep moving or be held in a current to avoid sinking.',
        model: 'Cartilaginous fishes such as the shark have **no air bladder**, which in bony fishes **regulates buoyancy**. Without it the shark is **denser than water** and must **swim constantly** (or have water flow over it) to avoid sinking.',
        sol: 'No air bladder, so must swim.',
        scheme: [['No air bladder', 1], ['Must swim constantly to avoid sinking', 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'The toad, unlike the shark, has a heart with a different number of chambers and lives partly on land. State the heart chambers of each and the toad\'s skin.',
          model: 'The **shark** has a **two-chambered** heart (one auricle and one ventricle), but the **toad** has a **three-chambered** heart (two auricles and one ventricle). The toad\'s skin is **moist and without scales**, and it can breathe through it.',
          sol: 'Two versus three chambers; moist skin.',
          scheme: [['Two and three chambers', 1], ['Moist skin without scales', 1]],
          d: 2, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 9 || 'value');
}
{
  const p = Object.entries(ZOO).map(([c, n]) => `${n} ${c === 'Aves' ? 'birds' : c === 'Mammalia' ? 'mammals' : c === 'Reptilia' ? 'reptiles' : 'amphibians'}`).join(', ');
  add('zoo-case', mk.case({
    passage: `A small zoo houses ${p}. Its reptile house includes one crocodile, and the bird section has an ostrich that cannot fly. The zoo's guide board reads: "Warm-blooded animals are kept at constant temperature, and the rest depend on the surroundings."`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'How many chambers does the heart of a typical bird have, and how many does that of the crocodile have?',
        right: 'Four and four',
        wrong: ['Four and three', 'Three and three', 'Two and four'],
        sol: 'Birds have a four-chambered heart, and crocodiles, unlike other reptiles, also have a four-chambered heart — option (@K).',
        d: 2, c: 'application', t: [3],
      })),
      part('b', num({
        stem: 'How many animals in the zoo are warm-blooded?',
        value: N.zooWarm,
        sol: `Only birds and mammals are warm-blooded: $${ZOO.Mammalia} + ${ZOO.Aves} = ${N.zooWarm}$ animals.`,
        scheme: [[`${N.zooWarm}`, 1]],
        d: 2, c: 'application', t: [3],
      })),
      part('c', short({
        marks: 2,
        stem: 'The ostrich cannot fly. Explain why it is still placed in class Aves.',
        model: 'The ostrich has **feathers**, **forelimbs modified into wings**, a **fully ossified skeleton with hollow bones**, a **four-chambered heart** and is **warm-blooded** and oviparous. These characters, not flight, define **Aves**; the ostrich is a **flightless bird**.',
        sol: 'Feathers, wings, four-chambered heart: Aves.',
        scheme: [['Feathers and wings', 1], ['Other bird characters; flightless', 1]],
        d: 2, c: 'application', t: [3],
      }), [
        short({
          marks: 2,
          stem: 'Why does a crocodile differ from a lizard in its heart, although both are reptiles?',
          model: 'Most reptiles, such as a **lizard**, have a **three-chambered** heart, but the **crocodile** is an exception with a **four-chambered** heart. Both have **dry, cornified skin with scales** and are **cold-blooded**, so both remain in the same class.',
          sol: 'Crocodile four chambers; shared reptile characters.',
          scheme: [['Three versus four chambers', 1], ['Shared reptile characters', 1]],
          d: 2, c: 'application', t: [3],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 21 || 'value');
}
