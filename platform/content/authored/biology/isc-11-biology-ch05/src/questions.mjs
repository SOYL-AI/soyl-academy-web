// ISC 11 Biology ch05 Animal Kingdom — question bank in ISC school-examination style. Numbers come from calc.mjs.
// AR keys (ISC options): a b c d.
import { mk, add, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { PHYLA, phylumFor, N_TRIPLO, N_SEG, POND, POND_TOTAL, POND_COELOM, POND_SEG, POND_ACOEL_PCT, CTENO, CTENO_PLATES, STAR, STAR_FEET, NEREIS, NEREIS_PARAPODIA, ZOO, ZOO_TOTAL, ZOO_CHAMBERS, ZOO_WARM, ZOO_FOUR, GILL, GILL_LAMPREY, GILL_SHARK, GILL_DIFF, heartOf, VERT } from './calc.mjs';
import { COELOM_LETTERED, CHORDATE_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, part } = mk;
const coelFig = svgV(COELOM_LETTERED, 'Cross-sections of three body plans marked A, B and C with parts D and E marked in C');
const chordFig = svgV(CHORDATE_LETTERED, 'A simple chordate with parts marked A to E');
const P = (n) => PHYLA.find((p) => p.name === n);

// ---------------------------------------------------------------- t01 basis of classification
add('ck-coelom-mcq', mcq({
  stem: 'The body cavity of a true coelomate animal is lined by',
  right: 'mesoderm on both sides, the body wall and the gut',
  wrong: ['ectoderm only', 'endoderm only', 'a jelly-like undifferentiated layer'],
  sol: 'A true coelom is a mesoderm-lined cavity — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('coel-fig-mcq', mcq({
  stem: 'In the figure, which section is most likely to represent a roundworm?',
  right: 'B, because the cavity is not lined by mesoderm on the gut side',
  wrong: ['A, because the space between body wall and gut is solid', 'C, because the cavity is lined by mesoderm all round', 'None, because a roundworm has no cavity'],
  sol: 'A roundworm is pseudocoelomate: the cavity lies between the body-wall mesoderm and the gut, as in B — option (@K).',
  d: 2, c: 'application', t: [1],
  assets: [coelFig],
}));
add('coel-fig2-mcq', mcq({
  stem: 'In the figure, the ring marked D around the gut in section C is derived from',
  right: 'mesoderm',
  wrong: ['ectoderm', 'endoderm', 'mesoglea'],
  sol: 'Mesoderm lies both under the body wall and around the gut in a true coelomate; D is the visceral mesoderm — option (@K).',
  d: 3, c: 'analysis', t: [1],
  assets: [coelFig],
}));
add('coel-fig3-mcq', mcq({
  stem: 'Which statement about the three sections in the figure is correct?',
  right: 'A could be a flatworm and C an earthworm',
  wrong: ['A could be an earthworm and B a flatworm', 'B could be an insect and C a roundworm', 'All three show a true coelom'],
  sol: 'A is acoelomate (flatworm), B pseudocoelomate (roundworm) and C coelomate (annelid) — option (@K).',
  d: 3, c: 'analysis', t: [1],
  assets: [coelFig],
}));
add('sym-mcq', mcq({
  stem: 'A diver finds a marine animal with five identical arms around a central disc. It can be cut into two equal halves by several different vertical planes through the centre. The animal is',
  right: 'radially symmetrical',
  wrong: ['bilaterally symmetrical', 'asymmetrical', 'biradial only, with a single plane'],
  sol: 'More than one plane through the central axis gives equal halves: radial symmetry — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('diplo-mcq', mcq({
  stem: 'An embryologist finds that an embryo has only an outer and an inner layer of cells with a jelly-like layer between them. The adult will be',
  right: 'diploblastic, as in Cnidaria',
  wrong: ['triploblastic, as in Annelida', 'a coelomate, as in Mollusca', 'cellular, as in Porifera only'],
  sol: 'Two germ layers with mesoglea between them mean a diploblastic animal such as a cnidarian — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('metam-mcq', mcq({
  stem: 'A student cuts the body of an animal and finds that both the outer rings and the internal organs, such as nephridia, repeat in each segment. This condition is',
  right: 'metamerism, as in Annelida',
  wrong: ['metagenesis, as in Cnidaria', 'cephalisation, as in Mollusca', 'radial symmetry, as in Echinodermata'],
  sol: 'Repetition of segments and internal organs is metamerism, typical of annelids — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('levels-mcq', mcq({
  stem: 'In which pair of phyla do cells do the same work grouped as tissues, but there are no organs?',
  right: 'Cnidaria and Ctenophora',
  wrong: ['Porifera and Cnidaria', 'Platyhelminthes and Nematoda', 'Annelida and Mollusca'],
  sol: 'Cnidaria and Ctenophora are at the tissue level; sponges are cellular and flatworms have organs — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('n-triplo-num', num({
  stem: `From the list Porifera, Cnidaria, Ctenophora, Platyhelminthes, Nematoda, Annelida, Mollusca, Arthropoda, Echinodermata and Hemichordata, how many phyla are triploblastic?`,
  value: N_TRIPLO,
  sol: `Porifera has no true germ layers and Cnidaria and Ctenophora are diploblastic; the other 7 (${N_TRIPLO}) are triploblastic.`,
  scheme: [[`${N_TRIPLO}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 7 || 'value');
add('seg-num', num({
  stem: 'Among the same ten phyla, how many are segmented (show metamerism)?',
  value: N_SEG,
  sol: 'Only Annelida and Arthropoda are segmented, so the answer is 2; Mollusca, Nematoda and the rest are not.',
  scheme: [[`${N_SEG}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 2 || 'value');
add('cavity-ar', ar({
  a: 'The body cavity of an arthropod is not a true coelom.',
  r: 'The cavity of an arthropod is filled with blood and is called a haemocoel.',
  key: 'a',
  sol: 'Both are true and R explains A, since a blood-filled haemocoel is a reduced coelom — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('triplo-reason-short', short({
  marks: 1,
  stem: 'Give a reason: Cnidarians are called diploblastic animals.',
  model: 'Their body wall has only **two germ layers**, the **ectoderm and endoderm**, with a jelly-like mesoglea between them.',
  sol: 'Two germ layers.',
  scheme: [['Ectoderm and endoderm only', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('sym-short', short({
  marks: 2,
  stem: 'A sponge is called asymmetrical but a sea anemone is radially symmetrical. Explain the difference in terms of planes that divide the body.',
  model: 'In a **sponge** no plane through the body can divide it into **equal halves**, so it is **asymmetrical**. In a **sea anemone** any plane passing through the **central axis** gives **two equal halves**, so it is **radially symmetrical**.',
  sol: 'Planes through the axis.',
  scheme: [['No plane gives equal halves: sponge', 1], ['Any plane through the axis: radial', 1]],
  d: 2, c: 'application', t: [1],
}));
add('pseudo-short', short({
  marks: 2,
  stem: 'Distinguish a pseudocoelom from a true coelom, naming one phylum that has each.',
  model: 'In a **pseudocoelom** (Nematoda) the cavity lies between the body-wall mesoderm and the endoderm, so it is **not fully lined by mesoderm**. In a **true coelom** (Annelida) the cavity is **lined by mesoderm on both sides**, the body wall and the gut.',
  sol: 'Mesoderm lining.',
  scheme: [['Pseudocoelom described with a phylum', 1], ['True coelom described with a phylum', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('germ-short3', short({
  marks: 3,
  stem: 'An animal has bilateral symmetry and three germ layers, its body cavity is a haemocoel, and its body is segmented. Name its phylum and justify each feature in one line each.',
  model: 'It is a member of **Arthropoda**. **Bilateral symmetry** gives left and right halves; **three germ layers** make it triploblastic; its cavity is a **haemocoel filled with blood**, not a true coelom; and its body shows **segmentation**, usually fused into head, thorax and abdomen.',
  sol: 'Arthropoda with the four features.',
  scheme: [['Arthropoda', 1], ['Symmetry and germ layers', 1], ['Haemocoel and segmentation', 1]],
  wl: [30, 90],
  d: 3, c: 'application', t: [1, 3],
}));

// ---------------------------------------------------------------- t02 non-chordates I
add('spongo-mcq', mcq({
  stem: 'Which cells of a sponge are responsible for creating the current of water through its body?',
  right: 'Choanocytes with their beating flagella',
  wrong: ['Cnidoblasts on the tentacles', 'Flame cells with cilia', 'Amoeboid cells of the mesoglea'],
  sol: 'Flagellated collar cells (choanocytes) lining the spongocoel drive the water current — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('obelia-mcq', mcq({
  stem: 'A colony of Obelia contains sessile, branching polyps that bud off tiny free-swimming medusae, and the medusae shed gametes. This alternation of two body forms is called',
  right: 'metagenesis',
  wrong: ['metamerism', 'regeneration', 'metamorphosis'],
  sol: 'Alternation of the polyp and medusa forms is metagenesis — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ck-cnidaria-mcq', mcq({
  stem: 'Which cells on the tentacles of a cnidarian are used for defence and for the capture of prey?',
  right: 'Cnidoblasts',
  wrong: ['Choanocytes', 'Flame cells', 'Comb plates'],
  sol: 'Cnidoblasts (stinging cells) give the phylum its name — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('platy-mcq', mcq({
  stem: 'A flat, ribbon-like worm from the intestine of a person has a head with hooks and suckers and excretes through flame cells. It belongs to the phylum',
  right: 'Platyhelminthes',
  wrong: ['Nematoda', 'Annelida', 'Cnidaria'],
  sol: 'Hooks, suckers and flame cells in a flat parasite point to Platyhelminthes — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('nema-mcq', mcq({
  stem: 'A cylindrical worm has a cuticle, a complete alimentary canal with mouth and anus, and separate male and female individuals. Its body cavity is',
  right: 'a pseudocoelom',
  wrong: ['a true coelom', 'a haemocoel', 'absent'],
  sol: 'Such a worm belongs to Nematoda, which is pseudocoelomate — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cteno-mcq', mcq({
  stem: 'A transparent marine animal glows faintly in the dark and swims by the beating of eight external rows of ciliated plates. It lacks stinging cells. It belongs to',
  right: 'Ctenophora',
  wrong: ['Cnidaria', 'Porifera', 'Echinodermata'],
  sol: 'Eight rows of comb plates and bioluminescence identify Ctenophora — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cteno-num', num({
  stem: `An imagined comb jelly has ${CTENO.rows} rows of comb plates, and each row has ${CTENO.platesPerRow} plates. How many comb plates does it have in all?`,
  value: CTENO_PLATES,
  sol: `${CTENO.rows} × ${CTENO.platesPerRow} = ${CTENO_PLATES}.`,
  scheme: [[`${CTENO_PLATES}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === 280 || 'value');
add('ck-pond-num', num({
  stem: `A pond net collects ${POND_TOTAL} animals: ${POND.flatworms} flatworms, ${POND.roundworms} roundworms, ${POND.annelids} annelids, ${POND.molluscs} molluscs and ${POND.arthropods} arthropods. How many of them are segmented?`,
  value: POND_SEG,
  sol: `Only annelids and arthropods are segmented: ${POND.annelids} + ${POND.arthropods} = ${POND_SEG}.`,
  scheme: [[`${POND_SEG}`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 24 || 'value');
add('pond-pct-num', num({
  stem: `In the same pond sample of ${POND_TOTAL} animals, what percentage are acoelomate flatworms?`,
  value: POND_ACOEL_PCT, unit: '%',
  sol: `${POND.flatworms} ÷ ${POND_TOTAL} × 100 = ${POND_ACOEL_PCT} percent.`,
  scheme: [[`${POND_ACOEL_PCT}`, 1]],
  d: 2, c: 'application', t: [1, 2],
}), (q) => q.answer.value === 12.5 || 'value');
add('sponge-ar', ar({
  a: 'Sponges are placed at the cellular level of organisation.',
  r: 'The cells of a sponge are grouped into well-defined organs and organ systems.',
  key: 'c',
  sol: 'A is true: sponge cells are not grouped into true tissues. R is false because there are no organs — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('cnid-short2', short({
  marks: 2,
  stem: 'Obelia has a polyp stage and a medusa stage. State one difference between the two forms and name the phenomenon.',
  model: 'The **polyp** is **sessile and cylindrical**, whereas the **medusa** is **free-swimming and umbrella-shaped**. Their regular alternation in one life cycle is called **metagenesis**, and the medusa makes the gametes while the polyp reproduces by budding.',
  sol: 'Difference and metagenesis.',
  scheme: [['Sessile polyp vs free-swimming medusa', 1], ['Metagenesis', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('flat-short2', short({
  marks: 2,
  stem: 'A parasite found in the liver of a sheep is flat and has no anus. State two features that place it in Platyhelminthes.',
  model: 'It is **dorsoventrally flattened** and **acoelomate** with **bilateral symmetry**. Parasitic forms have **hooks or suckers** and excrete through **flame cells**, and the gut has a single opening.',
  sol: 'Any two features.',
  scheme: [['First feature', 1], ['Second feature', 1]],
  d: 2, c: 'application', t: [2],
}));
add('nema-short2', short({
  marks: 2,
  stem: 'Write two ways in which a roundworm differs from a flatworm in its digestive system and body cavity.',
  model: 'A roundworm has a **complete alimentary canal** with mouth and anus, whereas a flatworm has a gut with **one opening** or none. A roundworm has a **pseudocoelom**, whereas a flatworm is **acoelomate**.',
  sol: 'Gut and cavity.',
  scheme: [['Complete vs incomplete gut', 1], ['Pseudocoelom vs acoelomate', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('cnid-short3', short({
  marks: 3,
  stem: 'State three distinguishing features of phylum Cnidaria and give two examples.',
  model: '1. **Radial symmetry**, **diploblastic** body at the **tissue level**.\n2. **Cnidoblasts** on the tentacles for defence, anchorage and capture of prey.\n3. A **gastrovascular cavity** with one opening, and two forms, **polyp and medusa**.\nExamples: ***Hydra*** and ***Aurelia***.',
  sol: 'Three features and examples.',
  scheme: [['Radial, diploblastic', 1], ['Cnidoblasts', 1], ['Gastrovascular cavity, polyp and medusa, with examples', 1]],
  wl: [30, 90],
  d: 1, c: 'recall', t: [2],
}));
add('sponge-short3', short({
  marks: 3,
  stem: 'Describe how water moves through a vase-shaped sponge and name the structures involved at each stage.',
  model: 'Water enters through the many **ostia** in the body wall, passes into the central **spongocoel**, and leaves through the **osculum**. The current is driven by the beating flagella of the **choanocytes** lining the cavity, which also trap food particles; the water brings **oxygen** and carries away **wastes**.',
  sol: 'Path with structures.',
  scheme: [['Ostia, spongocoel, osculum in order', 1], ['Choanocytes drive the current', 1], ['Food and oxygen in, wastes out', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('platy-short3', short({
  marks: 3,
  stem: 'Describe three features of a flatworm such as a tapeworm that are adaptations to a parasitic life.',
  model: 'A tapeworm has **hooks and suckers** to hold on to the host\'s intestine, a **flat body** with a large surface for absorbing digested food, and **very high reproductive capacity**, with many eggs, so that some reach new hosts. It needs no complex gut of its own.',
  sol: 'Three adaptations.',
  scheme: [['Hooks and suckers', 1], ['Flat body or absorption of food', 1], ['High reproductive output', 1]],
  d: 3, c: 'application', t: [2],
}));
add('plan-long', long({
  stem: '(a) Define diploblastic and triploblastic organisation and name one phylum for each. [2]\n(b) Distinguish acoelomate, pseudocoelomate and coelomate animals, with one phylum for each. [3]',
  model: '(a) A **diploblastic** animal has two germ layers, **ectoderm and endoderm** (Cnidaria); a **triploblastic** animal has a third layer, the **mesoderm**, between them (Annelida).\n\n(b) **Acoelomate:** no body cavity, mesoderm fills the space (Platyhelminthes). **Pseudocoelomate:** a cavity not fully lined by mesoderm (Nematoda). **Coelomate:** a true coelom lined by mesoderm on both sides (Annelida).',
  sol: 'Definitions with phyla.',
  scheme: [['(a) Diploblastic with phylum', 1], ['(a) Triploblastic with phylum', 1], ['(b) Three kinds with phyla (one mark each)', 3]],
  wl: [60, 170],
  d: 2, c: 'understanding', t: [1],
}));
add('inverts1-long', long({
  stem: '(a) Tabulate the symmetry, the level of organisation and one special cell type of Porifera, Cnidaria and Platyhelminthes. [3]\n(b) Name two examples of each of the three phyla. [2]',
  model: '(a) | Phylum | Symmetry | Level | Special cells |\n|---|---|---|---|\n| Porifera | Asymmetrical | Cellular | Choanocytes |\n| Cnidaria | Radial | Tissue | Cnidoblasts |\n| Platyhelminthes | Bilateral | Organ | Flame cells |\n\n(b) Porifera: *Sycon*, *Spongilla*. Cnidaria: *Hydra*, *Aurelia*. Platyhelminthes: *Taenia*, *Planaria* (or *Fasciola*).',
  sol: 'Table and examples.',
  scheme: [['(a) Porifera row', 1], ['(a) Cnidaria row', 1], ['(a) Platyhelminthes row', 1], ['(b) Two examples of each (one mark for each pair, two marks if all six correct)', 2]],
  wl: [30, 160],
  d: 2, c: 'application', t: [2],
}));
add('sponge-long', long({
  stem: '(a) Draw a labelled diagram of a vase-shaped sponge in vertical section, naming the osculum, spongocoel, ostia, choanocytes and spicules. [3]\n(b) State the function of the choanocytes. [1]\n(c) Why is a sponge placed at the cellular level of organisation? [1]',
  model: '(a) A vase-shaped body with an **osculum** at the top, a central **spongocoel**, many **ostia** (pores) in the wall, **choanocytes** lining the cavity and **spicules** in the wall; arrows show water entering through the ostia and leaving through the osculum.\n\n(b) **Choanocytes** beat their flagella to create the **water current** and **trap food**.\n\n(c) The cells are **not organised into true tissues or organs**, though they are specialised for different tasks.',
  sol: 'Diagram, function, cellular level.',
  scheme: [['(a) Body shape and flow arrows', 1], ['(a) Five parts labelled', 2], ['(b) Function of choanocytes', 1], ['(c) No true tissues', 1]],
  wl: [60, 170],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 non-chordates II
add('annel-mcq', mcq({
  stem: 'During a dissection a student sees tiny coiled tubes repeated in every segment of a long worm, opening to the outside. These are probably',
  right: 'nephridia that remove wastes',
  wrong: ['Malpighian tubules that remove wastes', 'flame cells that regulate water', 'gills for respiration'],
  sol: 'Segmentally repeated excretory tubes are nephridia, found in annelids — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('mollusc-mcq', mcq({
  stem: 'A garden snail has an unsegmented soft body, a muscular foot and a hard shell that the mantle makes. In which phylum is it placed?',
  right: 'Mollusca',
  wrong: ['Annelida', 'Arthropoda', 'Echinodermata'],
  sol: 'A soft unsegmented body with a foot, mantle and shell is Molluscan — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('arthro-mcq', mcq({
  stem: 'A cockroach has jointed legs, a chitinous exoskeleton, tracheae for breathing and Malpighian tubules for excretion. Its blood flows',
  right: 'in open spaces called the haemocoel',
  wrong: ['only through closed vessels', 'in a water vascular system', 'through flame cells'],
  sol: 'Arthropods have an open circulation with a blood-filled haemocoel — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('echino-mcq', mcq({
  stem: 'The tube feet of a starfish are part of a system of canals filled with fluid that helps in',
  right: 'locomotion, capture of food and respiration',
  wrong: ['excretion only', 'circulation of blood only', 'reproduction only'],
  sol: 'The water vascular system of echinoderms works in movement, feeding and respiration — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('hemi-mcq', mcq({
  stem: 'Balanoglossus is a worm-like marine animal with a body of proboscis, collar and trunk and with gill slits. It is not placed in Chordata because it',
  right: 'lacks a notochord and a dorsal hollow nerve cord',
  wrong: ['lacks a coelom', 'has no gill slits', 'is not marine'],
  sol: 'Hemichordates are treated as non-chordates since they lack a true notochord and dorsal nerve cord — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('star-num', num({
  stem: `A starfish has ${STAR.arms} arms, and each arm bears ${STAR.feetPerArm} tube feet. How many tube feet does the animal have in all?`,
  value: STAR_FEET,
  sol: `${STAR.arms} × ${STAR.feetPerArm} = ${STAR_FEET}.`,
  scheme: [[`${STAR_FEET}`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 600 || 'value');
add('nereis-num', num({
  stem: `A Nereis has ${NEREIS.segments} segments and each segment carries ${NEREIS.parapodiaPerSegment} parapodia. How many parapodia are present?`,
  value: NEREIS_PARAPODIA,
  sol: `${NEREIS.segments} × ${NEREIS.parapodiaPerSegment} = ${NEREIS_PARAPODIA}.`,
  scheme: [[`${NEREIS_PARAPODIA}`, 1]],
  d: 1, c: 'application', t: [3],
}), (q) => q.answer.value === 180 || 'value');
add('coelomate-num', num({
  stem: `The pond sample (${POND.flatworms} flatworms, ${POND.roundworms} roundworms, ${POND.annelids} annelids, ${POND.molluscs} molluscs, ${POND.arthropods} arthropods) is sorted into true coelomates. How many animals are true coelomates?`,
  value: POND_COELOM,
  sol: `Annelids and molluscs have a true coelom; arthropods have a haemocoel: ${POND.annelids} + ${POND.molluscs} = ${POND_COELOM}.`,
  scheme: [[`${POND_COELOM}`, 1]],
  d: 3, c: 'analysis', t: [1, 3],
}), (q) => q.answer.value === 24 || 'value');
add('echin-short2', short({
  marks: 2,
  stem: 'State two functions of the water vascular system of a starfish.',
  model: 'The water vascular system with its **tube feet** helps in **locomotion** and in the **capture and handling of food**. It also assists in **respiration**.',
  sol: 'Any two functions.',
  scheme: [['First function', 1], ['Second function', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('annel-short2', short({
  marks: 2,
  stem: 'Name the locomotory structures of an earthworm and of Nereis, and state the type of excretory organ that both have.',
  model: 'An earthworm moves with **setae**, whereas *Nereis* moves with lateral **parapodia**. Both excrete through **nephridia**, which are coiled tubes repeated in the segments of the body and open to the outside.',
  sol: 'Setae, parapodia, nephridia.',
  scheme: [['Setae and parapodia', 1], ['Nephridia', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('bat-short1', short({
  marks: 1,
  stem: 'Give a reason: A bat is classified as a mammal although it flies.',
  model: 'It has **mammary glands and hair** and gives birth to young, which it suckles; flight does not decide its class.',
  sol: 'Mammary glands and hair.',
  scheme: [['Mammary glands and hair', 1]],
  d: 2, c: 'application', t: [5],
}));
add('mollusc-short3', short({
  marks: 3,
  stem: 'Describe the body of a mollusc with reference to its foot, mantle and radula.',
  model: 'A mollusc has a **soft, unsegmented body** with a head, a muscular **foot** for movement and a visceral hump. The **mantle** covers the hump and usually secretes a calcareous **shell**; the **mantle cavity** holds the gills. The mouth has a file-like **radula** that scrapes food.',
  sol: 'Foot, mantle, radula.',
  scheme: [['Foot', 1], ['Mantle and shell', 1], ['Radula', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('arthro-short3', short({
  marks: 3,
  stem: 'Name three features of arthropods that help them to live successfully on land.',
  model: 'The **chitinous exoskeleton** protects the body and reduces loss of water. **Tracheae or book lungs** let them breathe air, and **jointed appendages** allow them to walk, fly and feed in many ways. **Malpighian tubules** also save water in insects. Together these features reduce the loss of water in dry air and make a great variety of habits possible.',
  sol: 'Three adaptations.',
  scheme: [['Exoskeleton', 1], ['Tracheae or book lungs', 1], ['Jointed appendages or Malpighian tubules', 1]],
  d: 3, c: 'application', t: [3],
}));
add('echin-short3', short({
  marks: 3,
  stem: 'State three features of echinoderms and explain what is unusual about their symmetry.',
  model: 'Echinoderms are **marine** animals with a **spiny skin** over a **calcareous endoskeleton**; they have a **water vascular system** with tube feet and **no excretory system**. Their **adults are radially symmetrical** but their **larvae are bilaterally symmetrical**, which suggests that they arose from bilateral ancestors.',
  sol: 'Features and the symmetry.',
  scheme: [['Spiny skin and endoskeleton', 1], ['Water vascular system', 1], ['Adult radial, larva bilateral', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('seg-short3', short({
  marks: 3,
  stem: 'Explain metamerism and name the phyla in which it occurs, with one example of each.',
  model: '**Metamerism** is the division of the body into **repeated segments**, each repeating some organs. It occurs in **Annelida** (earthworm: externally as rings and internally), in **Arthropoda** (cockroach, with segments often fused into regions) and, internally, in **Chordata** (in the muscles and the vertebral column). Not every phylum shows it: molluscs and roundworms are unsegmented.',
  sol: 'Definition and phyla.',
  scheme: [['Definition', 1], ['Annelida with example', 1], ['Arthropoda or Chordata with example', 1]],
  d: 2, c: 'understanding', t: [1, 3],
}));
add('arthro-ar', ar({
  a: 'Arthropoda is the largest phylum of the animal kingdom.',
  r: 'Arthropods have jointed appendages and a chitinous exoskeleton that help them to live in almost every habitat.',
  key: 'a',
  sol: 'Both are true and R explains the success of the phylum — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('phyla-long', long({
  stem: '(a) Name the phylum to which each of these belongs: a leech, a pearl oyster, a prawn and a sea urchin. [2]\n(b) State one feature of each phylum that you named. [2]\n(c) Which of the four has a water vascular system? [1]',
  model: '(a) Leech: **Annelida**; pearl oyster: **Mollusca**; prawn: **Arthropoda**; sea urchin: **Echinodermata**.\n\n(b) Annelida: **metameric segmentation** (or nephridia). Mollusca: **mantle and radula** (or shell). Arthropoda: **jointed appendages and chitinous exoskeleton**. Echinodermata: **spiny skin** (or tube feet).\n\n(c) The **sea urchin** (Echinodermata).',
  sol: 'Four phyla and features.',
  scheme: [['(a) Four phyla (two marks for four, one for two or three)', 2], ['(b) Four features (two marks for four, one for two or three)', 2], ['(c) Sea urchin', 1]],
  wl: [40, 140],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 Chordata
add('chord-fig-mcq', mcq({
  stem: 'In the figure, which letter marks the notochord?',
  right: 'B',
  wrong: ['A', 'C', 'D'],
  sol: 'B is the rod-like notochord, lying just below the dorsal hollow nerve cord A — option (@K).',
  d: 1, c: 'application', t: [4],
  assets: [chordFig],
}));
add('chord-fig2-mcq', mcq({
  stem: 'In the same figure, which marked structure is absent in non-chordates, which have a solid nerve cord on the belly side?',
  right: 'A, the dorsal hollow nerve cord',
  wrong: ['E, the heart on the lower side, which they lack altogether', 'C, as no non-chordate has any openings in its pharynx', 'D, because they never have a tail'],
  sol: 'A dorsal, hollow nerve cord is the chordate feature; non-chordates have ventral, solid cords — option (@K).',
  d: 3, c: 'analysis', t: [4],
  assets: [chordFig],
}));
add('chord-fig3-mcq', mcq({
  stem: 'In the same figure, the structure C is lost or modified in most adult land vertebrates. It is',
  right: 'the set of pharyngeal gill slits',
  wrong: ['the dorsal hollow nerve cord', 'the heart', 'the notochord, which is lost in all chordates'],
  sol: 'C marks the pharyngeal gill slits, which disappear or change in land vertebrates — option (@K).',
  d: 3, c: 'analysis', t: [4],
  assets: [chordFig],
}));
add('ck-chordate-mcq', mcq({
  stem: 'In which subphylum of Chordata is the notochord present only in the larval tail?',
  right: 'Urochordata',
  wrong: ['Cephalochordata', 'Vertebrata', 'Hemichordata'],
  sol: 'In tunicates the notochord is lost in the adult — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('cephalo-mcq', mcq({
  stem: 'A small, fish-like marine animal burrows in sand. Its notochord runs from head to tail and stays through its life, but it has no vertebral column. It is',
  right: 'Branchiostoma, a cephalochordate',
  wrong: ['Ascidia, a urochordate', 'Balanoglossus, a hemichordate', 'Petromyzon, a vertebrate'],
  sol: 'A persistent notochord and no backbone identify the lancelet Branchiostoma — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('notochord-mcq', mcq({
  stem: 'What replaces the notochord in the adult of most vertebrates?',
  right: 'The vertebral column',
  wrong: ['The nerve cord', 'The gill slits', 'The post-anal tail'],
  sol: 'The vertebral column (backbone) replaces the notochord — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chordate-fill', fill({
  stem: 'Branchiostoma, the lancelet, belongs to the subphylum ______.',
  acc: [['Cephalochordata', 'cephalochordata']],
  sol: 'Cephalochordata: its notochord extends from head to tail.',
  d: 1, c: 'recall', t: [4],
}));
add('tail-tf', tf({
  stem: 'A post-anal tail is found only in adult vertebrates and never in any larva.',
  key: 'f',
  sol: 'False. The post-anal tail is a feature of all chordates at some stage, for example in the tadpole-like larva of a tunicate.',
  d: 2, c: 'understanding', t: [4],
}));
add('chord-short2', short({
  marks: 2,
  stem: 'State two differences between the position of the nerve cord and the heart in a chordate and in an annelid.',
  model: 'A chordate has a **dorsal, hollow** nerve cord and a **ventral** heart, whereas an annelid has a **ventral, solid** nerve cord and a **dorsal** blood vessel acting as a heart.',
  sol: 'Nerve cord and heart.',
  scheme: [['Nerve cord: dorsal hollow vs ventral solid', 1], ['Heart: ventral vs dorsal', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('subphyla-short2', short({
  marks: 2,
  stem: 'Where is the notochord found in an adult tunicate and in an adult lancelet?',
  model: 'In an adult **tunicate** (Urochordata) the notochord is **absent**; it is found only in the **larval tail**. In an adult **lancelet** (Cephalochordata) it **persists** from head to tail.',
  sol: 'Larval tail only vs throughout life.',
  scheme: [['Tunicate: only in the larval tail', 1], ['Lancelet: persists in the adult', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('chord-short3', short({
  marks: 3,
  stem: 'A student finds an animal with a notochord, a dorsal nerve cord and gill slits only at the larval stage, and an adult that is a sac-like animal fixed to a rock. Name its subphylum and explain the evidence.',
  model: 'It belongs to **Urochordata**. The larva is a **tadpole-like** animal with all the chordate features, including the **notochord in its tail**. In the adult the notochord and nerve cord are **lost** and the body becomes a sac-like, sessile animal, so it is a **chordate only by its larva**.',
  sol: 'Urochordata and reasoning.',
  scheme: [['Urochordata', 1], ['Larva has chordate features', 1], ['Adult loses notochord', 1]],
  d: 3, c: 'application', t: [4],
}));
add('chordate-long', long({
  stem: '(a) Draw a labelled diagram of a simple chordate showing the four fundamental features of the phylum. [3]\n(b) What happens to the notochord in an adult vertebrate? [1]\n(c) Why is Balanoglossus not placed in Chordata? [1]',
  model: '(a) A side view with the **dorsal hollow nerve cord** on the back, the **notochord** just below it, **pharyngeal gill slits** in the pharynx and a **post-anal tail**; the **ventral heart** may also be shown.\n\n(b) It is **replaced by the vertebral column**.\n\n(c) It has a **proboscis, collar and trunk** and lacks a true **notochord and dorsal hollow nerve cord**, so it is a **hemichordate**.',
  sol: 'Diagram; backbone; hemichordate.',
  scheme: [['(a) Four features drawn', 2], ['(a) Four labels correct', 1], ['(b) Replaced by the vertebral column', 1], ['(c) No notochord, so non-chordate', 1]],
  wl: [50, 170],
  d: 2, c: 'application', t: [4, 3],
}));

// ---------------------------------------------------------------- t05 vertebrate classes
add('ck-class-mcq', mcq({
  stem: 'Which class has a dry skin with horny scales and usually a three-chambered heart?',
  right: 'Reptilia',
  wrong: ['Amphibia', 'Aves', 'Mammalia'],
  sol: 'A dry scaly skin with a three-chambered heart is reptilian — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('ck-heart-num', num({
  stem: `A zoo list has ${ZOO.find((z) => z[0] === 'Columba')[2]} pigeons. How many heart chambers do they have altogether?`,
  value: heartOf('Aves') * ZOO.find((z) => z[0] === 'Columba')[2],
  sol: `A bird has four chambers: 4 × 8 = ${heartOf('Aves') * 8}.`,
  scheme: [[`${heartOf('Aves') * 8}`, 1]],
  d: 1, c: 'application', t: [5],
}), (q) => q.answer.value === 32 || 'value');
add('cyclo-mcq', mcq({
  stem: 'A slender fish with a round, sucking mouth is found clinging to a host fish. It has no jaws, scales or paired fins and shows several pairs of gill slits. It is',
  right: 'a cyclostome such as Petromyzon',
  wrong: ['a cartilaginous fish such as Scoliodon', 'a bony fish such as Labeo', 'an amphibian such as Ichthyophis'],
  sol: 'Jawlessness and a sucking mouth are cyclostome features — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('chondr-mcq', mcq({
  stem: 'An aquarium has a fish with a skeleton of cartilage, tooth-like placoid scales and gill slits uncovered by any flap. It is a member of',
  right: 'Chondrichthyes',
  wrong: ['Osteichthyes', 'Cyclostomata', 'Amphibia'],
  sol: 'Cartilage, placoid scales and exposed gill slits are cartilaginous fish features — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('osteich-mcq', mcq({
  stem: 'A freshwater fish rises and sinks in water by changing the amount of gas in a sac inside the body. This organ and the class are',
  right: 'air bladder; Osteichthyes',
  wrong: ['air bladder; Chondrichthyes', 'swim bladder with no gas; Cyclostomata', 'lung; Amphibia'],
  sol: 'An air bladder regulating buoyancy belongs to bony fishes — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('amph-mcq2', mcq({
  stem: 'An animal has moist skin without scales, a cloaca, a tympanum and a three-chambered heart, and its eggs are laid in water. It is a member of',
  right: 'Amphibia',
  wrong: ['Reptilia', 'Osteichthyes', 'Aves'],
  sol: 'Moist scaleless skin, cloaca and aquatic eggs are amphibian features — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('croc-mcq', mcq({
  stem: 'Reptiles usually have a three-chambered heart. Which reptile is the exception?',
  right: 'Crocodile, with a four-chambered heart',
  wrong: ['Tortoise, with a two-chambered heart', 'Lizard, with a four-chambered heart', 'Snake, with a two-chambered heart'],
  sol: 'Crocodiles have a four-chambered heart — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('aves-mcq', mcq({
  stem: 'Which of these is a feature of birds that is NOT found in bats?',
  right: 'Feathers',
  wrong: ['A four-chambered heart', 'Warm blood', 'Forelimbs modified for flight'],
  sol: 'Bats share the other three but have hair, not feathers — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('mamm-mcq', mcq({
  stem: 'Which feature is found in all mammals but in no other vertebrates?',
  right: 'Mammary glands that nourish the young',
  wrong: ['A four-chambered heart', 'Warm blood', 'Internal fertilisation'],
  sol: 'Mammary glands are unique to mammals; birds also have a four-chambered heart and warm blood — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('zoo-num', num({
  stem: `A zoo keeps ${ZOO.map(([n, , k]) => `${k} ${n}`).join(', ')}. Counting every chamber of every heart, how many heart chambers are there in all?`,
  value: ZOO_CHAMBERS,
  sol: `${ZOO.map(([, c, k]) => `${k} × ${heartOf(c)}`).join(' + ')} = ${ZOO_CHAMBERS}.`,
  scheme: [[`${ZOO_CHAMBERS}`, 1]],
  d: 4, c: 'analysis', t: [5],
}), (q) => q.answer.value === 86 || 'value');
add('zoo-warm-num', num({
  stem: `Of the ${ZOO_TOTAL} animals in the same zoo list, how many are warm-blooded?`,
  value: ZOO_WARM,
  sol: `Birds and mammals are warm-blooded: 8 + 2 = ${ZOO_WARM}.`,
  scheme: [[`${ZOO_WARM}`, 1]],
  d: 2, c: 'application', t: [5],
}), (q) => q.answer.value === 10 || 'value');
add('gill-num', num({
  stem: `A lamprey has ${GILL.lamprey} pairs of gill slits, and a dogfish shark has ${GILL.shark} pairs. By how many does the number of gill slits of the lamprey exceed that of the shark?`,
  value: GILL_DIFF,
  sol: `Lamprey: ${GILL.lamprey} × 2 = ${GILL_LAMPREY}; shark: ${GILL.shark} × 2 = ${GILL_SHARK}; difference ${GILL_DIFF}.`,
  scheme: [[`${GILL_DIFF}`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 4 || 'value');
add('frog-ar', ar({
  a: 'The heart of a frog has three chambers.',
  r: 'A frog can breathe through its lungs and through its moist skin.',
  key: 'b',
  sol: 'Both are true, but breathing does not explain why the heart has three chambers — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('cyclo-ar', ar({
  a: 'Cyclostomes have a bony skeleton and strong jaws.',
  r: 'They are the most advanced of the fishes.',
  key: 'd',
  sol: 'Both are false: cyclostomes are jawless with a cartilaginous skeleton and are the most primitive fishes — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('amph-short1', short({
  marks: 1,
  stem: 'Give a reason: Amphibians are mostly restricted to moist habitats.',
  model: 'They have a **moist, scaleless skin** that loses water quickly and **lay their eggs in water**.',
  sol: 'Moist skin and aquatic eggs.',
  scheme: [['Skin loses water or eggs need water', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('flight-short1', short({
  marks: 1,
  stem: 'Give a reason: The bones of a pigeon are light.',
  model: 'They are **pneumatic (air-filled)**, which reduces body weight for flight.',
  sol: 'Air-filled bones.',
  scheme: [['Air-filled bones reduce weight', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('oper-short2', short({
  marks: 2,
  stem: 'State the function of (i) the operculum and (ii) the air bladder in a bony fish.',
  model: '(i) The **operculum** is a bony flap that **covers and protects the gills** and helps to pass water over them. (ii) The **air bladder** is a gas-filled sac that regulates the fish\'s **buoyancy**, so that it can rise or sink.',
  sol: 'Two functions.',
  scheme: [['Operculum', 1], ['Air bladder', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('croc-short2', short({
  marks: 2,
  stem: 'A zookeeper states that all reptiles have a three-chambered heart. Correct this statement and say why the heart of a crocodile is more efficient.',
  model: 'Most reptiles have **three chambers**, but **crocodiles have four**. In a four-chambered heart the **oxygenated and deoxygenated blood do not mix**, so the body receives **more oxygen**.',
  sol: 'Crocodile exception and efficiency.',
  scheme: [['Crocodile has four chambers', 1], ['Blood does not mix', 1]],
  d: 3, c: 'application', t: [5],
}));
add('fish-short3', short({
  marks: 3,
  stem: 'Distinguish a lamprey from a dogfish shark in three ways.',
  model: 'A **lamprey** (Cyclostomata) is **jawless** with a **sucking mouth**, whereas a **shark** (Chondrichthyes) has **jaws**. A lamprey has **no scales and no paired fins**, whereas a shark has **placoid scales and paired fins**. A lamprey has **seven pairs of gill slits** whereas a dogfish shark has five pairs.',
  sol: 'Three contrasts.',
  scheme: [['Jaws', 1], ['Scales and paired fins', 1], ['Gill slits', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('identify-short3', short({
  marks: 3,
  stem: 'A vertebrate has dry skin with scales, lays shelled eggs on land and has a three-chambered heart. Name its class and explain why it can breed away from water.',
  model: 'It is a member of **Reptilia**. Its **shelled eggs** resist drying, so they can be laid on land, and **fertilisation is internal**, so no water is needed to bring the gametes together. The **dry scaly skin** also prevents loss of water from the body.',
  sol: 'Reptilia with reasons.',
  scheme: [['Reptilia', 1], ['Shelled eggs on land', 1], ['Internal fertilisation or dry skin', 1]],
  d: 2, c: 'application', t: [5],
}));
add('aves-mamm-short3', short({
  marks: 3,
  stem: 'Give three differences between birds and mammals on body covering, reproduction and the structure of the mouth or skin.',
  model: 'Birds have **feathers**, mammals have **hair**. Birds are **oviparous** (shelled eggs), but most mammals are **viviparous** and **suckle** the young through **mammary glands**. Birds have a **toothless beak**, whereas mammals have **teeth** of different kinds (heterodont) and external ears. Birds also have air-filled bones and wings, which mammals lack, apart from bats.',
  sol: 'Three differences.',
  scheme: [['Feathers vs hair', 1], ['Oviparous vs viviparous and mammary glands', 1], ['Beak vs teeth', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('platypus-short3', short({
  marks: 3,
  stem: 'Ornithorhynchus lays eggs, yet it is placed in Mammalia. Give three reasons.',
  model: 'Although it is **oviparous**, it has **mammary glands** that supply milk to the young, **hair** on its body and a **diaphragm**. Because these are the defining mammalian characters, it is a mammal and not a reptile or bird. Egg-laying is an unusual primitive feature that it retains.',
  sol: 'Three mammalian features.',
  scheme: [['Mammary glands', 1], ['Hair', 1], ['Diaphragm or other mammalian feature', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('vert-long', long({
  stem: '(a) Tabulate the body covering, the heart and the type of fertilisation in Amphibia, Reptilia and Aves. [3]\n(b) Which of these three classes is warm-blooded? [1]\n(c) State one reason why reptiles are better adapted to dry land than amphibians. [1]',
  model: '(a) | Class | Covering | Heart | Fertilisation |\n|---|---|---|---|\n| Amphibia | Moist skin, no scales | Three chambers | External |\n| Reptilia | Dry skin with horny scales | Three chambers (four in crocodiles) | Internal |\n| Aves | Feathers | Four chambers | Internal |\n\n(b) **Aves**.\n\n(c) Reptiles have a **dry cornified skin** and **shelled eggs**, so they lose little water and do not need water for breeding.',
  sol: 'Table; warm-blooded class; reptile advantage.',
  scheme: [['(a) Amphibia row', 1], ['(a) Reptilia row', 1], ['(a) Aves row', 1], ['(b) Aves', 1], ['(c) One reason', 1]],
  wl: [40, 160],
  d: 2, c: 'application', t: [5],
}));
add('fish-long', long({
  stem: '(a) State two features that are common to all fishes. [1]\n(b) Compare Chondrichthyes and Osteichthyes in their skeleton, covering of the gills and fertilisation. [3]\n(c) Give one example of a jawless fish. [1]',
  model: '(a) Fishes are **aquatic**, breathe through **gills** and have a **two-chambered heart**.\n\n(b) **Skeleton:** cartilage in Chondrichthyes, bone in Osteichthyes. **Gills:** uncovered slits in Chondrichthyes, an **operculum** in Osteichthyes. **Fertilisation:** internal in Chondrichthyes, usually external in Osteichthyes.\n\n(c) *Petromyzon* (or *Myxine*).',
  sol: 'Common features; comparison; jawless fish.',
  scheme: [['(a) Two common features', 1], ['(b) Skeleton', 1], ['(b) Gill cover', 1], ['(b) Fertilisation', 1], ['(c) A jawless fish', 1]],
  wl: [40, 150],
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- case-based
add('rock-case', mk.case({
  passage: 'A marine biology class compared five specimens from a rocky shore.\n\n| Specimen | Observations |\n|---|---|\n| P | Cylindrical, tentacles with stinging cells, one body opening |\n| Q | Soft body with a muscular foot and a coiled shell; has a radula |\n| R | Jointed legs, hard exoskeleton, blood in open spaces |\n| S | Five arms, spiny skin, tube feet |\n| T | Many small pores, central cavity, no organs |',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which specimen is radially symmetrical as an adult and has a water vascular system?',
      right: 'S',
      wrong: ['P', 'T', 'R'],
      sol: 'Spiny skin, five arms and tube feet mean an echinoderm — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', mcq({
      stem: 'Which specimens are at the cellular and tissue levels of organisation, in that order?',
      right: 'T then P',
      wrong: ['P then T', 'Q then R', 'R then S'],
      sol: 'T is a sponge (cellular) and P a cnidarian (tissue) — option (@K).',
      d: 3, c: 'analysis', t: [1, 2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Name the phylum of R and state the name of its body cavity.',
      model: 'R belongs to **Arthropoda**. Its body cavity is a **haemocoel**, filled with blood, since the circulation is open.',
      sol: 'Arthropoda; haemocoel.',
      wl: [10, 40],
      scheme: [['Arthropoda', 1], ['Haemocoel', 1]],
      d: 2, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'Name the feeding organ of Q and the part that secretes its shell.',
        model: 'Q is a mollusc. It feeds with a file-like **radula**, and its shell is secreted by the **mantle**.',
        sol: 'Radula; mantle.',
        wl: [10, 40],
        scheme: [['Radula', 1], ['Mantle', 1]],
        d: 2, c: 'recall', t: [3],
      }),
    ]),
  ],
}));
void VERT;
void N_SEG;
void ZOO_FOUR;
void phylumFor;
void P;
