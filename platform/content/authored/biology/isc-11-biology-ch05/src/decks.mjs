// ISC 11 Biology ch05 Animal Kingdom — Part 1 (t01 basis of classification, t02 and t03 non-chordates), Part 2 (t04 Chordata, t05 vertebrate classes).
import { sl, deck, table, flow, svgV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { SYMMETRY, COELOM_NAMED, SPONGE, POLYP_MEDUSA, CHORDATE_NAMED, HEARTS } from './svgs.mjs';
import { PHYLA, N_TRIPLO, N_DIPLO, N_SEG, N_PHYLA, POND, POND_TOTAL, POND_COELOM, POND_SEG, POND_ACOEL_PCT, GILL, GILL_LAMPREY, GILL_SHARK, GILL_DIFF, ZOO, ZOO_TOTAL, ZOO_CHAMBERS, ZOO_WARM, VERT, phylumFor } from './calc.mjs';

export const V = {
  symmetry: svgV(SYMMETRY, 'Asymmetrical, radial and bilateral body symmetry'),
  coelom: svgV(COELOM_NAMED, 'Cross-sections of acoelomate, pseudocoelomate and coelomate body plans'),
  sponge: svgV(SPONGE, 'A sponge with ostia, spongocoel, choanocytes, osculum and spicules'),
  polyp: svgV(POLYP_MEDUSA, 'The polyp and medusa forms of a cnidarian'),
  chordate: svgV(CHORDATE_NAMED, 'A simple chordate with its four fundamental features'),
  hearts: svgV(HEARTS, 'Hearts of a fish, an amphibian, a reptile and a bird with their chambers'),
};

const P = (n) => PHYLA.find((p) => p.name === n);
const eg = (n) => P(n).eg.slice(0, 2).join(', ');
const unknown = phylumFor('bilateral', 'triploblastic', 'pseudocoelomate')[0];

export const deck1 = deck({
  part: 1,
  title: 'Animal Kingdom — Part 1: Basis of classification and the non-chordates',
  goals: [
    'Classify an animal by organisation, symmetry, germ layers, coelom and segmentation',
    'List the distinguishing features and two examples of each non-chordate phylum',
    'Assign an invertebrate to its phylum from its features',
  ],
  slides: [
    sl('title', 'Animal Kingdom', {
      b: 'Part 1 — how zoologists sort over a million species, and the ten non-chordate phyla.',
      v: flow('LR', [['c', 'Cellular level'], ['t', 'Tissue level'], ['o', 'Organ level'], ['s', 'Organ system level']], [['c', 't'], ['t', 'o'], ['o', 's']], 'Flow showing the four levels of organisation in animals from cellular to organ system'),
      n: 'Animals are sorted by their basic body plan, not by size or habitat. The first question is how the cells are organised: as loose cells, as tissues, as organs or as organ systems. Further questions are about symmetry, germ layers and the body cavity.',
    }),
    sl('diagram', 'Symmetry of the body', {
      b: 'Animals may be **asymmetrical**, **radially symmetrical** or **bilaterally symmetrical**.',
      v: V.symmetry,
      n: 'A sponge has no plane that cuts it into equal halves. A sea anemone can be halved by any plane through its central axis. A worm can be halved along one plane only, giving a left and a right half, and it also has a head end and a tail end.',
    }),
    sl('concept', 'Levels of organisation and germ layers', {
      b: `The embryo of a **diploblastic** animal has two germ layers, ectoderm and endoderm; a **triploblastic** animal also has mesoderm. Of ${N_PHYLA} non-chordate phyla listed here, ${N_TRIPLO} are triploblastic and ${N_DIPLO} are diploblastic; sponges have no true germ layers.`,
      v: table(['Level', 'Meaning', 'Example phylum'], [['Cellular', 'Cells are loosely arranged; no true tissues', 'Porifera'], ['Tissue', 'Cells doing the same work are grouped; no organs', 'Cnidaria, Ctenophora'], ['Organ', 'Tissues form organs', 'Platyhelminthes'], ['Organ system', 'Organs work together in a system', 'Annelida to Chordata']], 'Table of levels of organisation with example phyla'),
      n: 'In sponges, cells are not grouped into tissues. In cnidarians and ctenophores, cells are grouped into tissues. In flatworms the tissues form organs, and in annelids and higher groups the organs form systems. The number of germ layers is another basis: two layers or three.',
    }),
    sl('diagram', 'Body cavity: acoelomate, pseudocoelomate, coelomate', {
      b: 'A **coelom** is a body cavity lined by **mesoderm**. In an **acoelomate** there is no cavity; in a **pseudocoelomate** the cavity is not fully lined by mesoderm; in a **coelomate** it is. Arthropods have a blood-filled **haemocoel**.',
      v: V.coelom,
      n: 'Look at the position of the mesoderm. If it fills the space, the animal is acoelomate. If a cavity lies between mesoderm and gut with no mesoderm around the gut, it is pseudocoelomate. If mesoderm lines the cavity on both sides, it is a true coelom.',
    }),
    sl('example', 'Worked example 1: classify an animal', {
      b: 'An animal is bilaterally symmetrical, triploblastic and pseudocoelomate. Which phylum is it?',
      ul: [
        'Bilateral and triploblastic: not Porifera, Cnidaria or Ctenophora.',
        'Acoelomate bilateral animals are **Platyhelminthes**, so the pseudocoelom rules them out.',
        `A pseudocoelom with a complete gut and a cuticle fits **${unknown}**.`,
      ],
      v: table(['Features', 'Phylum'], [['Bilateral, triploblastic, acoelomate', phylumFor('bilateral', 'triploblastic', 'acoelomate').join(', ')], ['Bilateral, triploblastic, pseudocoelomate', unknown], ['Bilateral, triploblastic, haemocoelomate', phylumFor('bilateral', 'triploblastic', 'haemocoelomate').join(', ')], ['Radial, diploblastic, acoelomate', phylumFor('radial', 'diploblastic', 'acoelomate').join(' or ')]], 'Worked table assigning phyla from symmetry, germ layers and coelom'),
      n: 'Eliminate step by step. Bilateral and triploblastic removes the first three phyla. The kind of body cavity then separates flatworms, roundworms and arthropods. A pseudocoelom points to the roundworms, the phylum Nematoda.',
    }),
    sl('check', 'Quick check: body cavity', {
      b: 'In a true coelomate animal the body cavity is lined by which tissue?',
      n: 'Quick check. Think of the position of the mesoderm.',
      chk: 'ck-coelom-mcq',
    }),
    sl('concept', 'Segmentation', {
      b: '**Metamerism** is the division of the body into repeated segments, each with a copy of some organs.',
      v: table(['Phylum', 'Segmentation', 'Note'], [['Annelida', 'External and internal', 'Rings; each has nephridia and setae'], ['Arthropoda', 'External segments often fused into head, thorax and abdomen', 'Jointed appendages'], ['Chordata', 'Internal, in the muscles and vertebral column', 'Myotomes and vertebrae'], ['Mollusca, Nematoda, Platyhelminthes', 'Not segmented', 'Body unsegmented']], 'Table of segmentation in annelids, arthropods and chordates'),
      n: `Only two of the ${N_PHYLA} non-chordate phyla listed here are truly segmented, annelids and arthropods. In an earthworm the segments show on the outside as rings and are also repeated inside. Chordates show segmentation in their muscles and backbone.`,
    }),
    sl('diagram', 'Porifera: sponges', {
      b: '**Porifera**: asymmetrical, cellular level, body with **pores** (ostia), a central **spongocoel**, an **osculum**, **choanocytes**, and a skeleton of **spicules or spongin**.',
      v: V.sponge,
      n: 'Water enters through many small pores, passes into the central cavity, and leaves through the osculum. Collar cells with flagella beat to drive the current, and they trap food particles. Sponges are hermaphrodite, and their larvae swim freely.',
    }),
    sl('diagram', 'Cnidaria: polyp and medusa', {
      b: '**Cnidaria**: radial, diploblastic, tissue level, with **cnidoblasts** (stinging cells), a **gastrovascular cavity** with one opening, and two forms, the sessile **polyp** and the free-swimming **medusa**.',
      v: V.polyp,
      n: 'Hydra is a polyp and Aurelia is a medusa. Obelia has both forms in its life cycle. Stinging cells on the tentacles are used for anchorage, defence and capture of prey. The same opening serves as mouth and anus.',
    }),
    sl('check', 'Quick check: Cnidaria', {
      b: 'Which cells on the tentacles of a cnidarian are used for defence and capturing prey?',
      n: 'Quick check. They give the phylum its name.',
      chk: 'ck-cnidaria-mcq',
    }),
    sl('concept', 'Ctenophora, Platyhelminthes and Nematoda', {
      b: 'Three more phyla, with different body plans.',
      v: table(['Phylum', 'Distinguishing features', 'Examples'], [['Ctenophora', 'Radial, diploblastic; eight rows of ciliated comb plates; bioluminescence; no stinging cells', eg('Ctenophora')], ['Platyhelminthes', 'Flat, bilateral, acoelomate; hooks and suckers in parasites; flame cells; no anus', eg('Platyhelminthes')], ['Nematoda (Aschelminthes)', 'Round, pseudocoelomate; complete gut; cuticle; sexes separate', eg('Nematoda')]], 'Table of three phyla: Ctenophora, Platyhelminthes and Nematoda with features and examples'),
      n: 'Ctenophores swim with eight rows of comb plates and many glow in the dark. Flatworms are flat, have flame cells for excretion, and a gut with a single opening. Roundworms are cylindrical, with a complete gut and separate male and female animals.',
    }),
    sl('concept', 'Annelida and Mollusca', {
      b: 'Annelids are **segmented**, with a closed blood system; molluscs have a **soft body in a shell**, a **mantle** and a **radula**.',
      v: table(['Phylum', 'Distinguishing features', 'Examples'], [['Annelida', 'Segmented body, coelomate, setae or parapodia, nephridia, closed circulation', eg('Annelida')], ['Mollusca', 'Soft body, muscular foot, mantle and often a shell, radula, open circulation in most', eg('Mollusca')]], 'Table of Annelida and Mollusca with features and examples'),
      n: 'An earthworm has rings, bristles called setae and nephridia for excretion. A snail has a muscular foot, a shell secreted by the mantle, and a rasping organ called the radula. Molluscs are the second largest phylum.',
    }),
    sl('concept', 'Arthropoda, Echinodermata and Hemichordata', {
      b: 'Arthropods are the **largest phylum**; echinoderms have a **water vascular system**; hemichordates are **worm-like with a proboscis**.',
      v: table(['Phylum', 'Distinguishing features', 'Examples'], [['Arthropoda', 'Jointed appendages, chitinous exoskeleton, haemocoel, open circulation, Malpighian tubules in insects', eg('Arthropoda')], ['Echinodermata', 'Spiny skin, radial adult but bilateral larva, water vascular system, tube feet', eg('Echinodermata')], ['Hemichordata', 'Proboscis, collar and trunk; gill slits; open circulation', eg('Hemichordata')]], 'Table of Arthropoda, Echinodermata and Hemichordata with features and examples'),
      n: 'Arthropods have jointed legs and a hard exoskeleton of chitin, and more than two thirds of all named animals belong to this phylum. Echinoderms use a water vascular system with tube feet to move. Hemichordates are marine worms with a body in three parts.',
    }),
    sl('example', 'Worked example 2: sort a pond sample', {
      b: `A net brings up ${POND_TOTAL} small animals: ${POND.flatworms} flatworms, ${POND.roundworms} roundworms, ${POND.annelids} annelids, ${POND.molluscs} molluscs and ${POND.arthropods} arthropods. How many are coelomate, how many segmented, and what share are flatworms?`,
      ul: [
        `Coelomate: annelids and molluscs, ${POND.annelids} + ${POND.molluscs} = **${POND_COELOM}**.`,
        `Segmented: annelids and arthropods, ${POND.annelids} + ${POND.arthropods} = **${POND_SEG}**.`,
        `Flatworms: ${POND.flatworms} ÷ ${POND_TOTAL} × 100 = **${POND_ACOEL_PCT} percent**.`,
      ],
      v: table(['Group', 'Number', 'Coelom', 'Segmented'], [['Flatworms', String(POND.flatworms), 'Acoelomate', 'No'], ['Roundworms', String(POND.roundworms), 'Pseudocoelomate', 'No'], ['Annelids', String(POND.annelids), 'Coelomate', 'Yes'], ['Molluscs', String(POND.molluscs), 'Coelomate', 'No'], ['Arthropods', String(POND.arthropods), 'Haemocoel', 'Yes']], 'Worked table of the pond sample with coelom and segmentation'),
      n: 'First decide the body cavity of each group. Annelids and molluscs are coelomate. Then decide segmentation: only annelids and arthropods. Finally turn the flatworm count into a share of the whole sample. Notice that arthropods have a haemocoel, not a true coelom.',
    }),
    sl('check', 'Quick check: pond sample', {
      b: 'In the pond sample, how many animals are segmented?',
      n: 'Quick check. Add the two segmented phyla.',
      chk: 'ck-pond-num',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Basis of classification: level of organisation, symmetry, number of germ layers, body cavity and segmentation.',
        'Porifera: asymmetrical, choanocytes, osculum; Cnidaria: cnidoblasts, polyp and medusa; Ctenophora: comb plates.',
        'Platyhelminthes: flat, flame cells; Nematoda: round, pseudocoelom, complete gut.',
        'Annelida: segmented; Mollusca: mantle, radula; Arthropoda: jointed appendages, chitin.',
        'Echinodermata: water vascular system; Hemichordata: proboscis, collar and trunk.',
      ],
      v: table(['Plan', 'Phyla'], [['Radial, diploblastic', 'Cnidaria, Ctenophora'], ['Bilateral, acoelomate', 'Platyhelminthes'], ['Bilateral, pseudocoelomate', 'Nematoda'], ['Bilateral, coelomate, segmented', 'Annelida'], ['Haemocoelomate, segmented', 'Arthropoda']], 'Summary table of body plans and phyla'),
      n: 'To recap: ten non-chordate phyla are sorted by organisation, symmetry, germ layers, body cavity and segmentation. For each phylum remember one defining feature, such as choanocytes in sponges or the radula in molluscs.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **at least five features and two examples** for a phylum when asked.',
        'Say **haemocoel** for arthropods, **pseudocoelom** for roundworms and **true coelom** for annelids.',
        'Do not call echinoderms radial without adding "**the adult**": the larva is bilateral.',
        'Write scientific names in **italics or underlined**, with the genus capitalised.',
      ],
      n: 'Exam tips. Give five features and two examples for each phylum. Use the correct word for the body cavity. Say that only the adult echinoderm is radial. And underline scientific names.',
    }),
  ],
});

const V3 = (c) => VERT.find((x) => x.cls === c);
export const deck2 = deck({
  part: 2,
  title: 'Animal Kingdom — Part 2: Chordata and the vertebrate classes',
  goals: [
    'State the fundamental features of chordates and distinguish the three subphyla',
    'Give three distinguishing features and two examples of each vertebrate class',
    'Compare the vertebrate classes on skin, heart and temperature control',
  ],
  slides: [
    sl('title', 'Chordata', {
      b: 'Part 2 — animals with a notochord, from lancelets to mammals.',
      v: flow('LR', [['c', 'Chordata'], ['u', 'Urochordata'], ['e', 'Cephalochordata'], ['v', 'Vertebrata']], [['c', 'u'], ['c', 'e'], ['c', 'v']], 'Flow from phylum Chordata to its three subphyla'),
      n: 'Phylum Chordata contains three subphyla. Two of them are small marine groups of animals without a backbone. The third, the vertebrates, includes fishes, amphibians, reptiles, birds and mammals, all with a backbone.',
    }),
    sl('diagram', 'Fundamental features of chordates', {
      b: 'Every chordate has, at some stage, a **notochord**, a **dorsal hollow nerve cord**, **pharyngeal gill slits** and a **post-anal tail**; the heart is **ventral**.',
      v: V.chordate,
      n: 'The notochord is a rod of mesoderm on the back side. Above it lies a hollow nerve cord. The pharynx has slits that open to the outside, and the tail extends beyond the anus. Non-chordates have a solid nerve cord on the belly side.',
    }),
    sl('concept', 'Chordates compared with non-chordates', {
      b: 'Five points of difference help to tell a chordate from an invertebrate.',
      v: table(['Feature', 'Chordates', 'Non-chordates'], [['Notochord', 'Present at some stage', 'Absent'], ['Nerve cord', 'Dorsal, hollow, single', 'Ventral, solid, double'], ['Pharyngeal gill slits', 'Present at some stage', 'Absent'], ['Heart', 'Ventral', 'Dorsal, if present'], ['Post-anal tail', 'Present at some stage', 'Absent']], 'Table comparing chordates and non-chordates'),
      n: 'The two groups differ in the position of the nerve cord and the heart as well as in having a notochord. In chordates the nerve cord is hollow and on the back. In annelids and arthropods it is solid and on the belly.',
    }),
    sl('concept', 'Three subphyla', {
      b: 'The notochord decides the subphylum.',
      v: table(['Subphylum', 'Notochord', 'Example'], [['Urochordata', 'Only in the larval tail', 'Ascidia, Salpa'], ['Cephalochordata', 'Whole length of the body, throughout life', 'Branchiostoma (lancelet)'], ['Vertebrata', 'Replaced by a vertebral column in the adult', 'Fishes to mammals']], 'Table of the three subphyla of Chordata with notochord and example'),
      n: 'In sea squirts the notochord is found only in the tail of the tadpole-like larva. In the lancelet it stays from head to tail through life. In vertebrates it is replaced by a backbone made of vertebrae.',
    }),
    sl('check', 'Quick check: subphyla', {
      b: 'In which subphylum is the notochord present only in the larval tail?',
      n: 'Quick check. Think of a sea squirt.',
      chk: 'ck-chordate-mcq',
    }),
    sl('concept', 'Cyclostomata, Chondrichthyes and Osteichthyes', {
      b: 'Fishes are **aquatic**, breathe with **gills** and have a **two-chambered heart**.',
      v: table(['Class', 'Distinguishing features', 'Examples'], [['Cyclostomata', 'Jawless, sucking mouth, no scales, no paired fins, gill slits; marine, migrate to fresh water to breed', V3('Cyclostomata').ex.join(', ')], ['Chondrichthyes', 'Cartilaginous skeleton, placoid scales, gill slits without cover, no air bladder, internal fertilisation', V3('Chondrichthyes').ex.slice(0, 2).join(', ')], ['Osteichthyes', 'Bony skeleton, operculum over the gills, air bladder, scales, external fertilisation', V3('Osteichthyes').ex.slice(0, 2).join(', ')]], 'Table of the three classes of fishes with features and examples'),
      n: 'Lampreys and hagfishes are jawless and have a round sucking mouth. Sharks and rays have a skeleton of cartilage and must keep swimming because they lack an air bladder. Bony fishes have a gill cover, the operculum, and an air bladder that gives buoyancy.',
    }),
    sl('example', 'Worked example 1: counting gill slits', {
      b: `A lamprey has ${GILL.lamprey} pairs of gill slits and a dogfish shark has ${GILL.shark} pairs. How many slits does each animal have, and what is the difference?`,
      ul: [
        `Lamprey: ${GILL.lamprey} × 2 = **${GILL_LAMPREY}**.`,
        `Shark: ${GILL.shark} × 2 = **${GILL_SHARK}**.`,
        `Difference: ${GILL_LAMPREY} − ${GILL_SHARK} = **${GILL_DIFF}** slits.`,
      ],
      v: table(['Animal', 'Pairs', 'Slits'], [['Lamprey (Cyclostomata)', String(GILL.lamprey), String(GILL_LAMPREY)], ['Dogfish shark (Chondrichthyes)', String(GILL.shark), String(GILL_SHARK)]], 'Worked table of gill slits in a lamprey and a shark'),
      n: 'Gill slits occur in pairs, one on each side, so double the number of pairs. A lamprey has seven pairs, which is fourteen slits. A dogfish shark has five pairs, which is ten, so the lamprey has four more.',
    }),
    sl('concept', 'Amphibia and Reptilia', {
      b: 'Amphibians live in water and on land; reptiles are fully terrestrial with a **dry, scaly skin**.',
      v: table(['Class', 'Distinguishing features', 'Examples'], [['Amphibia', 'Moist skin without scales, three-chambered heart, cloaca, external fertilisation, eggs in water, tympanum', V3('Amphibia').ex.slice(0, 2).join(', ')], ['Reptilia', 'Dry cornified skin with scales, usually three-chambered heart (crocodiles have four), internal fertilisation, shelled eggs on land', V3('Reptilia').ex.join(', ')]], 'Table of Amphibia and Reptilia with features and examples'),
      n: 'A frog has a moist skin that helps in breathing and lays its eggs in water. A lizard has dry scaly skin that prevents water loss and lays shelled eggs on land. Both have a three-chambered heart, except crocodiles, which have four chambers.',
    }),
    sl('concept', 'Aves and Mammalia', {
      b: 'Birds and mammals are **warm-blooded**, with a **four-chambered heart**.',
      v: table(['Class', 'Distinguishing features', 'Examples'], [['Aves', 'Feathers, wings, beak, air-filled bones, oviparous, no sweat glands', V3('Aves').ex.join(', ')], ['Mammalia', 'Mammary glands, hair, external ears, diaphragm, mostly viviparous; Ornithorhynchus lays eggs', V3('Mammalia').ex.join(', ')]], 'Table of Aves and Mammalia with features and examples'),
      n: 'Birds have feathers, wings and bones with air spaces, which suit flight. Mammals suckle their young with milk from mammary glands and have hair. The platypus is an egg-laying mammal.',
    }),
    sl('diagram', 'Hearts of vertebrates', {
      b: 'The number of chambers rises from **two** in fishes to **three** in amphibians and most reptiles and **four** in birds and mammals.',
      v: V.hearts,
      n: 'In a fish the heart has one atrium and one ventricle. Amphibians have two atria and one ventricle, so oxygenated and deoxygenated blood mix. Birds and mammals have two atria and two ventricles, which keeps the two kinds of blood apart.',
    }),
    sl('example', 'Worked example 2: heart chambers in a zoo', {
      b: `A zoo list has ${ZOO_TOTAL} animals: ${ZOO.map(([n, , k]) => `${k} ${n}`).join(', ')}. Find the total number of heart chambers and how many are warm-blooded.`,
      ul: [
        'Chambers each: fish 2, amphibian 3, reptile 3, bird 4, mammal 4.',
        `Total chambers: ${ZOO.map(([, c, k]) => `${k} × ${V3(c).heart}`).join(' + ')} = **${ZOO_CHAMBERS}**.`,
        `Warm-blooded animals are birds and mammals: ${ZOO.filter(([, c]) => V3(c).blood === 'warm').map(([, , k]) => k).join(' + ')} = **${ZOO_WARM}**.`,
      ],
      v: table(['Animal', 'Class', 'Number', 'Chambers each'], ZOO.map(([n, c, k]) => [n, c, String(k), String(V3(c).heart)]), 'Worked table of zoo animals with class, number and heart chambers'),
      n: 'Look up the number of chambers for each class, multiply by the number of animals, and add. Then pick out the birds and mammals, the two warm-blooded classes, and add their numbers.',
    }),
    sl('check', 'Quick check: chambers', {
      b: 'How many heart chambers do the 8 pigeons in the zoo list have altogether?',
      n: 'Quick check. A bird has a four-chambered heart.',
      chk: 'ck-heart-num',
    }),
    sl('concept', 'The seven classes compared', {
      b: 'Compare the classes on covering, heart and body temperature.',
      v: table(['Class', 'Covering', 'Heart chambers', 'Body temperature'], VERT.map((v) => [v.cls, v.cover, String(v.heart), v.blood === 'warm' ? 'Warm-blooded' : 'Cold-blooded']), 'Table of the seven vertebrate classes with body covering, heart chambers and body temperature'),
      n: 'Fishes, amphibians and reptiles are cold-blooded; their body temperature changes with the surroundings. Birds and mammals keep a constant body temperature. Body covering also differs: scales, moist skin, feathers or hair.',
    }),
    sl('check', 'Quick check: classes', {
      b: 'Which class has a dry skin with horny scales and usually a three-chambered heart?',
      n: 'Quick check. Think of a lizard.',
      chk: 'ck-class-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Chordates: notochord, dorsal hollow nerve cord, pharyngeal gill slits, post-anal tail, ventral heart.',
        'Urochordata: notochord only in the larval tail; Cephalochordata: notochord throughout life; Vertebrata: backbone.',
        'Fishes: Cyclostomata (jawless), Chondrichthyes (cartilage), Osteichthyes (bone, operculum, air bladder).',
        'Amphibia, Reptilia: three chambers; Aves, Mammalia: four chambers and warm-blooded.',
        'Mammals: mammary glands and hair; birds: feathers.',
      ],
      v: table(['Class', 'Chambers', 'Blood'], VERT.map((v) => [v.cls, String(v.heart), v.blood === 'warm' ? 'Warm' : 'Cold']), 'Summary table of heart chambers and body temperature in the seven vertebrate classes'),
      n: 'To recap: chordates have a notochord, a dorsal hollow nerve cord, pharyngeal gill slits and a post-anal tail. Vertebrates fall into seven classes that differ in jaws, skeleton, covering, heart chambers and temperature control.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'List the **four fundamental features** of chordates and add the **ventral heart**.',
        'In a class comparison use **three features**: covering, heart and fertilisation or breathing.',
        'Mention **crocodiles** (four chambers) whenever you write that reptiles have three.',
        'Name **Ornithorhynchus** as an egg-laying mammal.',
      ],
      n: 'Exam tips. State the four fundamental features of a chordate. When comparing classes, use skin, heart and breathing. Mention that crocodiles have a four-chambered heart. And remember the egg-laying mammal.',
    }),
  ],
});
