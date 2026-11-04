// ISC 11 Biology ch05 Animal Kingdom — notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { PHYLA, VERT } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });
const eg = (n) => PHYLA.find((p) => p.name === n).eg.join(', ');

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Animal Kingdom — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Basis of classification',
      `Animals are classified by their **fundamental body plan**, using features that are shared by whole groups.

- **Levels of organisation.** *Cellular* level: cells loosely arranged, as in sponges. *Tissue* level: cells doing the same work are grouped into tissues, as in cnidarians and ctenophores. *Organ* level: tissues form organs, as in flatworms. *Organ-system* level: organs work together in systems, as in annelids, arthropods, molluscs, echinoderms, hemichordates and chordates.
- **Symmetry.** *Asymmetrical* (no plane divides the body into equal halves; most sponges); *radial* (any plane through the central axis gives equal halves; cnidarians, ctenophores, adult echinoderms); *bilateral* (only one plane gives left and right halves, with a head end; flatworms to chordates).
- **Germ layers.** *Diploblastic* animals have an outer **ectoderm** and an inner **endoderm** with an undifferentiated layer, the **mesoglea**, between them (cnidarians, ctenophores). *Triploblastic* animals have a third layer, the **mesoderm**, between them (flatworms onwards).
- **Body cavity (coelom).** A **coelom** is a cavity lined by mesoderm. **Acoelomate:** no cavity (flatworms). **Pseudocoelomate:** a cavity not fully lined by mesoderm (roundworms). **Coelomate:** a true coelom (annelids, molluscs, echinoderms, hemichordates, chordates). **Haemocoelomate:** the coelom is reduced and the body cavity is filled with blood, the **haemocoel** (arthropods).
- **Segmentation (metamerism).** The body is divided into repeated segments with a repeat of some organs: annelids (external and internal), arthropods, and chordates (in muscles and vertebral column).
- **Other features** used at lower levels: the type of digestive tract (complete or incomplete), the circulatory system (open or closed), and the presence of a notochord.

*Where books differ.* Some books call molluscs and arthropods "coelomate" and treat the haemocoel as a reduced coelom; the ISC syllabus lists "haemocoelomate" as a type, so the notes follow that. Whether sponges are "cellular" or "diploblastic" also varies; sponges are treated here as the cellular grade.`,
      [kt('Diploblastic', 'Having two germ layers, ectoderm and endoderm.'), kt('Triploblastic', 'Having three germ layers: ectoderm, mesoderm and endoderm.'), kt('Coelom', 'A body cavity lined by mesoderm.'), kt('Metamerism', 'Division of the body into repeated segments.')],
      V.coelom,
      [1],
      [V.symmetry],
    ),
    sec(
      '2. Non-chordates I: Porifera, Cnidaria, Ctenophora, Platyhelminthes, Nematoda',
      `**Porifera (sponges).** Mostly marine, asymmetrical, **cellular level**. The body wall has many pores (**ostia**) and a central cavity (**spongocoel**) that opens by the **osculum**; the cavity is lined by flagellated **choanocytes** (collar cells), which create a water current. Water brings food and oxygen and carries away wastes. A skeleton of **spicules** or **spongin** supports the body. Sponges are hermaphrodite (eggs and sperm in one animal) with **indirect development** through a free-swimming larva. Examples: ${eg('Porifera')}.

**Cnidaria (coelenterates).** Aquatic, radial, **diploblastic**, tissue level. They bear stinging cells, **cnidoblasts** (cnidocytes), on the tentacles for anchorage, defence and capturing prey. The **gastrovascular cavity** has a single opening, the **hypostome**, which is both mouth and anus. Two body forms: the sessile, cylindrical **polyp** (*Hydra*, *Adamsia*) and the free-swimming umbrella-shaped **medusa** (*Aurelia*). Some show both forms in the life cycle, as in *Obelia* (**metagenesis**). Examples: ${eg('Cnidaria')}.

**Ctenophora (comb jellies).** Marine, radial, diploblastic, tissue level, with **eight external rows of ciliated comb plates** for locomotion. **Bioluminescence** is common. No cnidoblasts; fertilisation is external and development indirect. Examples: ${eg('Ctenophora')}.

**Platyhelminthes (flatworms).** Dorsoventrally flattened, bilaterally symmetrical, **triploblastic, acoelomate**, organ level. Many are endoparasites, with **hooks and suckers**. They excrete and osmoregulate through **flame cells**; there is no anus in most. Some, such as *Planaria*, have great powers of **regeneration**. Examples: ${eg('Platyhelminthes')}.

**Nematoda (Aschelminthes, roundworms).** Circular in cross-section, bilateral, triploblastic, **pseudocoelomate**, organ-system level. The alimentary canal is **complete** with a muscular pharynx, the body is covered by a **cuticle**, sexes are separate (**dioecious**), and females are usually longer than males. Many are parasites. Examples: ${eg('Nematoda')}.`,
      [kt('Choanocyte', 'A flagellated collar cell lining the spongocoel of a sponge.'), kt('Cnidoblast', 'A stinging cell on the tentacles of a cnidarian.'), kt('Metagenesis', 'Alternation of the polyp and medusa forms in a life cycle.'), kt('Flame cell', 'An excretory and osmoregulatory cell of flatworms.')],
      V.polyp,
      [2],
      [V.sponge],
    ),
    sec(
      '3. Non-chordates II: Annelida, Mollusca, Arthropoda, Echinodermata, Hemichordata',
      `**Annelida.** Aquatic or terrestrial, bilateral, triploblastic, **coelomate**, with **metameric segmentation**. Body surface divided into rings; locomotory structures are **setae** (earthworm) or **parapodia** (*Nereis*). A closed circulatory system, **nephridia** for excretion and osmoregulation, a ventral solid nerve cord. *Nereis* is dioecious; earthworms and leeches are monoecious. Examples: ${eg('Annelida')}.

**Mollusca.** The second largest phylum. Soft, unsegmented body with a head, a muscular **foot** and a visceral hump covered by the **mantle**, which usually secretes a calcareous **shell**. Gills (**ctenidia**) lie in the mantle cavity; the mouth has a file-like **radula**; circulation is open in most; excretion is by kidneys. Mostly dioecious. Examples: ${eg('Mollusca')}.

**Arthropoda.** The largest phylum, with over two thirds of named species. Bilateral, triploblastic, **haemocoelomate**, segmented, with **jointed appendages** and a **chitinous exoskeleton**. Respiration by gills, book gills, book lungs or **tracheae**; **open circulation**; excretion by **Malpighian tubules** in insects. Sensory organs include antennae and compound eyes; usually dioecious with internal fertilisation. Examples: ${eg('Arthropoda')}.

**Echinodermata.** Marine; **spiny skin** over a calcareous endoskeleton; **radial symmetry in the adult** but a bilateral larva; coelomate. The **water vascular system** with **tube feet** helps in locomotion, capture of food and respiration; there is no excretory system. Examples: ${eg('Echinodermata')}.

**Hemichordata.** Worm-like marine animals with a body of **proboscis, collar and trunk**; open circulation; respiration by gills; the proboscis gland excretes. Formerly placed in Chordata, they are now a separate non-chordate phylum. Examples: ${eg('Hemichordata')}.`,
      [kt('Setae', 'Bristle-like structures used by earthworms for locomotion.'), kt('Radula', 'A file-like rasping organ in the mouth of most molluscs.'), kt('Exoskeleton', 'A hard outer covering, of chitin in arthropods.'), kt('Water vascular system', 'A system of canals and tube feet in echinoderms.')],
      table(['Phylum', 'Key features', 'Examples'], [['Annelida', 'Metameric, setae or parapodia, nephridia', eg('Annelida')], ['Mollusca', 'Mantle, foot, radula, shell', eg('Mollusca')], ['Arthropoda', 'Jointed appendages, chitin, haemocoel', eg('Arthropoda')], ['Echinodermata', 'Water vascular system, spiny skin', eg('Echinodermata')], ['Hemichordata', 'Proboscis, collar, trunk', eg('Hemichordata')]], 'Table of five non-chordate phyla with key features and examples'),
      [3],
    ),
    sec(
      '4. Chordata: notochord and the three subphyla',
      `Chordates have four **fundamental features** at some stage of life: (1) a **notochord**, a mesodermal rod on the dorsal side; (2) a **dorsal, hollow, single nerve cord**; (3) **paired pharyngeal gill slits**; and (4) a **post-anal tail**. The heart is **ventral**, with a closed circulation. Non-chordates have a ventral, solid, double nerve cord, no notochord and a dorsal heart, if any.

| Subphylum | Notochord | Examples |
|---|---|---|
| **Urochordata** (tunicates) | Present only in the **larval tail** | *Ascidia*, *Salpa*, *Doliolum* |
| **Cephalochordata** | Extends from head to tail and **persists through life** | *Branchiostoma* (amphioxus, lancelet) |
| **Vertebrata** | **Replaced by a vertebral column** in the adult | fishes to mammals |

Vertebrates also have a **ventral muscular heart** with two, three or four chambers, a **paired** excretory kidney system, and paired appendages (fins or limbs). Hemichordata, though once included, are now treated as non-chordates.`,
      [kt('Notochord', 'A mesodermal rod on the dorsal side of the embryo, supporting the body of a chordate.'), kt('Pharyngeal gill slits', 'Paired openings of the pharynx to the outside, present at some stage in all chordates.'), kt('Post-anal tail', 'A tail extending beyond the anus.')],
      V.chordate,
      [4],
    ),
    sec(
      '5. Vertebrate classes',
      `**Cyclostomata.** Jawless; suctorial, circular mouth without jaws; **6–15 pairs of gill slits** for respiration; body without scales and paired fins; cold-blooded. Marine, but migrate to fresh water to spawn; the larvae return to the ocean. Examples: ${VERT[0].ex.join(', ')}.

**Chondrichthyes.** Marine, cartilaginous skeleton, streamlined body, **placoid scales**, **gill slits without an operculum**, no air bladder (so they swim continuously to avoid sinking), **two-chambered heart**, internal fertilisation, mostly viviparous. Examples: ${VERT[1].ex.join(', ')}.

**Osteichthyes.** Marine and fresh water; **bony skeleton**; four pairs of gills covered by an **operculum**; **air bladder** regulates buoyancy; two-chambered heart; cold-blooded; mostly oviparous with external fertilisation. Examples: ${VERT[2].ex.join(', ')}.

**Amphibia.** Live in water and on land; **moist skin without scales**; body of head and trunk (tail in some); a **tympanum** represents the ear; alimentary canal, urinary and reproductive tracts open into a **cloaca**; **three-chambered heart** (two atria, one ventricle); cold-blooded; oviparous, with external fertilisation and indirect development. Examples: ${VERT[3].ex.join(', ')}.

**Reptilia.** Creeping or crawling; **dry cornified skin** with epidermal scales or scutes; no external ear (tympanum for hearing); **three-chambered heart** (four in crocodiles); cold-blooded; oviparous with internal fertilisation and **shelled eggs**. Examples: ${VERT[4].ex.join(', ')}.

**Aves.** **Feathers**; forelimbs modified as **wings**; beak without teeth; hindlimbs with scales for walking, swimming or clasping; **air-filled (pneumatic) bones**; **four-chambered heart**; warm-blooded; oviparous; skin without glands except the oil gland at the base of the tail. Examples: ${VERT[5].ex.join(', ')}.

**Mammalia.** **Mammary glands** that nourish the young; **hair**; external ears (pinnae); **four-chambered heart**; warm-blooded; a **diaphragm**; mostly **viviparous**, with unique exceptions (*Ornithorhynchus* lays eggs); heterodont teeth. Examples: ${VERT[6].ex.join(', ')}.

*Where books differ.* Cyclostome gill-slit numbers are given as 6–15 pairs; individual species have a fixed number (a lamprey has seven pairs). The chapter's arithmetic uses seven pairs for a lamprey and five for a dogfish shark as illustrations.`,
      [kt('Operculum', 'A bony flap covering the gills of a bony fish.'), kt('Placoid scale', 'A tooth-like scale of cartilaginous fishes.'), kt('Cloaca', 'A common chamber into which the gut and the urinary and reproductive tracts open.'), kt('Mammary gland', 'A gland that secretes milk to nourish the young.')],
      V.hearts,
      [5],
      [table(['Class', 'Covering', 'Heart', 'Blood'], VERT.map((v) => [v.cls, v.cover, `${v.heart} chambers`, v.blood === 'warm' ? 'Warm' : 'Cold']), 'Table of the seven vertebrate classes with covering, heart chambers and blood temperature')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing "coelomate" for arthropods; the syllabus term is haemocoelomate (the body cavity is a haemocoel).
- Giving only two features for a phylum when five are asked.
- Calling an adult starfish bilateral; the adult is radial and the larva is bilateral.
- Saying all reptiles have a three-chambered heart; crocodiles have four chambers.
- Placing Hemichordata among the chordates.
- Forgetting the **ventral heart** and the **post-anal tail** in the features of a chordate.
- Writing that bats are birds because they fly; they are mammals.

**How marks are usually awarded**
- 1-mark subparts: a phylum or class name, a term, an example, a give-a-reason.
- 2- and 3-mark questions: differences between two phyla or classes, features of one phylum, three features with two examples.
- 5-mark questions in parts: distinguishing features of several phyla in a table, the fundamental features of chordates with a labelled figure, a comparison of vertebrate classes.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Four levels of organisation in animals?', 'Cellular, tissue, organ and organ-system.', 'fact', 1),
    fc(2, 'Radial vs bilateral symmetry?', 'Any plane through the axis gives equal halves vs only one plane does.', 'concept', 1),
    fc(3, 'Diploblastic vs triploblastic?', 'Two germ layers vs three (with mesoderm).', 'concept', 1),
    fc(4, 'What is a coelom?', 'A body cavity lined by mesoderm.', 'definition', 1),
    fc(5, 'Acoelomate, pseudocoelomate and coelomate examples?', 'Flatworm; roundworm; earthworm.', 'fact', 1),
    fc(6, 'What is the body cavity of arthropods?', 'A haemocoel (blood-filled; haemocoelomate).', 'fact', 1),
    fc(7, 'What is metamerism?', 'Division of the body into repeated segments, as in annelids.', 'definition', 1),
    fc(8, 'Distinguishing cells of sponges?', 'Choanocytes (collar cells) lining the spongocoel.', 'fact', 2),
    fc(9, 'Path of water in a sponge?', 'Ostia, spongocoel, osculum.', 'concept', 2),
    fc(10, 'Stinging cells of Cnidaria?', 'Cnidoblasts (cnidocytes).', 'fact', 2),
    fc(11, 'Two forms of cnidarians?', 'Polyp (sessile) and medusa (free-swimming).', 'fact', 2),
    fc(12, 'What is metagenesis?', 'Alternation of polyp and medusa forms, as in Obelia.', 'definition', 2),
    fc(13, 'Locomotory organs of ctenophores?', 'Eight rows of ciliated comb plates.', 'fact', 2),
    fc(14, 'Excretory cells of flatworms?', 'Flame cells.', 'fact', 2),
    fc(15, 'Body cavity and gut of roundworms?', 'Pseudocoelom; complete gut.', 'fact', 2),
    fc(16, 'Excretory organs of annelids?', 'Nephridia.', 'fact', 3),
    fc(17, 'Locomotory structures of earthworm and Nereis?', 'Setae; parapodia.', 'fact', 3),
    fc(18, 'What is the radula?', 'The file-like rasping organ in the mouth of most molluscs.', 'definition', 3),
    fc(19, 'Which is the largest phylum?', 'Arthropoda.', 'fact', 3),
    fc(20, 'Excretory organs of insects?', 'Malpighian tubules.', 'fact', 3),
    fc(21, 'What is peculiar about echinoderm symmetry?', 'Adult radial; larva bilateral.', 'concept', 3),
    fc(22, 'Body parts of Balanoglossus?', 'Proboscis, collar and trunk.', 'fact', 3),
    fc(23, 'Four features of chordates?', 'Notochord, dorsal hollow nerve cord, pharyngeal gill slits, post-anal tail.', 'fact', 4),
    fc(24, 'Notochord in the three subphyla?', 'Urochordata: larval tail; Cephalochordata: throughout life; Vertebrata: replaced by vertebral column.', 'concept', 4),
    fc(25, 'Heart chambers: fish, amphibian, reptile, bird?', '2, 3, 3 (4 in crocodiles), 4.', 'fact', 5),
    fc(26, 'Jawless vertebrates?', 'Cyclostomata, such as Petromyzon and Myxine.', 'fact', 5),
    fc(27, 'Why must sharks keep swimming?', 'No air bladder, so they sink if they stop.', 'concept', 5),
    fc(28, 'Gill cover of bony fishes?', 'Operculum.', 'fact', 5),
    fc(29, 'Egg-laying mammal?', 'Ornithorhynchus.', 'fact', 5),
    fc(30, 'Warm-blooded vertebrate classes?', 'Aves and Mammalia.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
