// ch04 notes and flashcards.
import { T, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T), });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Animal Kingdom — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Basis of classification',
      `Animals are multicellular, eukaryotic and heterotrophic. Biologists group them using fundamental features that are shared within a group.

**Levels of organisation.** In **sponges** the cells are loosely arranged and show a **cellular** level of organisation, with little division of labour. In **coelenterates** and **ctenophores** cells doing the same function are arranged into tissues: the **cell-tissue (tissue) level**. In **flatworms** tissues are grouped into **organs**. In **aschelminthes** and all higher phyla the organs work together as **organ systems**.

**Symmetry.** Sponges are **asymmetrical**. **Radial symmetry**, in which any plane passing through the central axis divides the body into two equal halves, is found in coelenterates, ctenophores and adult echinoderms. **Bilateral symmetry**, with right and left halves along one plane only, is found in annelids, arthropods and other higher animals.

**Germ layers.** **Diploblastic** animals have two embryonic layers: an external **ectoderm** and an internal **endoderm**, with an undifferentiated layer, the **mesoglea**, between them (coelenterates, ctenophores). **Triploblastic** animals have a third layer, the **mesoderm**, between ectoderm and endoderm (platyhelminthes to chordates).

**Coelom.** The body cavity **lined by mesoderm** is the **coelom**. Animals with a true coelom are **coelomates** (annelids, molluscs, arthropods, echinoderms, hemichordates, chordates). In **pseudocoelomates** (aschelminthes) the mesoderm is present only as scattered pouches between the ectoderm and the endoderm, so the cavity is not fully lined. Animals with no cavity, such as flatworms, are **acoelomates**.

**Segmentation.** In **metamerism**, the body is externally and internally divided into segments with serial repetition of at least some organs, as in earthworms (annelids and arthropods).

**Notochord.** A mesodermally derived rod-like structure formed on the dorsal side during embryonic development in some animals. Animals with a notochord are **chordates**; those without are **non-chordates**.

**Other features.** The digestive system may be **incomplete** (a single opening serves as mouth and anus) or **complete** (a separate mouth and anus). Circulation may be **open** (blood pumped into open body cavities, as in arthropods and molluscs) or **closed** (blood always in vessels, as in annelids and chordates).`,
      [kt('Mesoglea', 'Undifferentiated layer between the ectoderm and endoderm of diploblastic animals.'), kt('Coelom', 'Body cavity lined by mesoderm.'), kt('Pseudocoelom', 'Cavity in which the mesoderm is present only as scattered pouches between ectoderm and endoderm.'), kt('Metamerism', 'Division of the body into segments with serial repetition of some organs.'), kt('Notochord', 'Mesodermal rod on the dorsal side of the embryo of chordates.')],
      V.levels,
      [1],
      [V.sym, V.coel, V.layers],
    ),
    sec(
      '2. Non-chordates up to phyla',
      `**Porifera (sponges).** Mostly marine, a few freshwater; asymmetrical; cellular level. Pores called **ostia**, a central cavity (**spongocoel**) and an opening, the **osculum**, form a **water canal system** that carries water for food gathering, respiratory exchange and removal of wastes; the spongocoel and canals are lined by **choanocytes** (collar cells). The skeleton is made of **spicules** or **spongin** fibres. Sponges are **hermaphrodite** (eggs and sperms are formed by the same individual); fertilisation is internal and development is indirect, through a larva. They also reproduce asexually by fragmentation. Examples: *Sycon*, *Spongilla*, *Euspongia*.

**Coelenterata (Cnidaria).** Aquatic, mostly marine; radial symmetry; tissue level; diploblastic. A central **gastrovascular cavity** has a single opening, the **hypostome**. **Cnidoblasts** (cnidocytes), with stinging capsules (nematocysts) on the tentacles and body, serve for anchorage, defence and capture of prey. Two body forms: the sessile, cylindrical **polyp** (*Hydra*, *Adamsia*) and the free-swimming, umbrella-shaped **medusa** (*Aurelia*). Those with both forms show **metagenesis** (alternation of generations): in *Obelia* polyps produce medusae asexually and medusae form polyps sexually. Corals have a calcium carbonate skeleton. Examples: *Physalia*, *Adamsia*, *Pennatula*, *Gorgonia*, *Meandrina*.

**Ctenophora (sea walnuts or comb jellies).** Exclusively marine, radial, diploblastic, tissue level. Eight external rows of ciliated **comb plates** help locomotion; digestion is both extracellular and intracellular; **bioluminescence** is well marked. Sexes are not separate; reproduction is only sexual with external fertilisation and indirect development. Examples: *Pleurobrachia*, *Ctenoplana*.

**Platyhelminthes (flatworms).** Dorsoventrally flattened; bilateral; triploblastic; **acoelomate**; organ level. Mostly endoparasites with **hooks and suckers**; some absorb nutrients through the body surface. **Flame cells** help in osmoregulation and excretion. Sexes are not separate; fertilisation is internal; development goes through many larval stages; high regeneration capacity (*Planaria*). Examples: *Taenia* (tapeworm), *Fasciola* (liver fluke).

**Aschelminthes (roundworms).** Circular in cross-section; bilateral; triploblastic; **pseudocoelomate**; organ-system level; free-living or parasitic. The alimentary canal is complete with a muscular pharynx; an excretory tube removes wastes through the excretory pore. Sexes are separate (dioecious), females often longer than males; fertilisation is internal; development is direct or indirect. Examples: *Ascaris*, *Wuchereria* (filarial worm), *Ancylostoma* (hookworm).

**Annelida.** Marine, freshwater or terrestrial; bilateral; triploblastic; **metamerically segmented**; **coelomate**; organ-system level. Longitudinal and circular muscles help locomotion; *Nereis* has lateral appendages, **parapodia**, for swimming. **Nephridia** serve for osmoregulation and excretion; circulation is **closed**; the nervous system has paired ganglia joined to a double ventral nerve cord. *Nereis* is dioecious; earthworms and leeches are monoecious. Examples: *Nereis*, *Pheretima* (earthworm), *Hirudinaria* (leech).

**Arthropoda.** The **largest phylum**: over two-thirds of all named species are arthropods. Organ-system level; bilateral; triploblastic; segmented; coelomate. A **chitinous exoskeleton** covers a body of head, thorax and abdomen with **jointed appendages**. Respiratory organs: gills, book gills, book lungs or the tracheal system. Circulation is **open**. Sense organs: antennae, compound and simple eyes, statocysts. Excretion by **Malpighian tubules**. Mostly dioecious, internal fertilisation, mostly oviparous, direct or indirect development. Examples: *Apis*, *Bombyx*, *Laccifer* (economically important); *Anopheles*, *Culex*, *Aedes* (vectors); *Locusta* (gregarious pest); *Limulus* (king crab, a living fossil).

**Mollusca.** The second largest phylum. A **calcareous shell** covers an unsegmented body with a distinct head, a muscular **foot** and a visceral hump; the skin forms a **mantle** enclosing the **mantle cavity** with feather-like **gills** (respiratory and excretory); the mouth has a rasping **radula**. Usually dioecious and oviparous with indirect development. Examples: *Pila*, *Pinctada* (pearl oyster), *Sepia*, *Loligo*, *Octopus*, *Aplysia*, *Dentalium*, *Chaetopleura*.

**Echinodermata.** Marine; **spiny-skinned**, with an endoskeleton of **calcareous ossicles**. Adults are **radially symmetrical**, larvae bilateral; triploblastic; coelomate; the digestive system is complete. The distinctive **water vascular system** helps in locomotion, capture and transport of food, and respiration; an excretory system is absent. Sexes separate; fertilisation usually external; indirect development with a free-swimming larva. Examples: *Asterias*, *Echinus*, *Antedon*, *Cucumaria*, *Ophiura*.

**Hemichordata.** Once a subphylum of Chordata, now a separate non-chordate phylum. Worm-like marine animals with a body of **proboscis, collar and trunk**; open circulation; respiration by gills; excretion by the proboscis gland; sexes separate; external fertilisation; indirect development. Examples: *Balanoglossus*, *Saccoglossus*.`,
      [kt('Choanocyte', 'Collar cell lining the canals and spongocoel of a sponge; it drives the water current.'), kt('Cnidoblast', 'Stinging cell of coelenterates used for anchorage, defence and prey capture.'), kt('Flame cell', 'Cell of flatworms that helps in osmoregulation and excretion.'), kt('Water vascular system', 'System of canals in echinoderms for locomotion, food capture and respiration.'), kt('Radula', 'File-like rasping organ in the mouth of molluscs.')],
      V.sponge,
      [2],
      [V.cnid, V.nonch1, V.nonch2, V.nonch3],
    ),
    sec(
      '3. Chordates up to classes',
      `**Phylum Chordata.** Chordates are bilaterally symmetrical, triploblastic and coelomate with organ-system level of organisation. They have a **notochord**, a **dorsal hollow nerve cord**, **paired pharyngeal gill slits**, a **post-anal tail** and a **closed circulatory system** with a ventral heart (present at some stage of life). In non-chordates the central nervous system is ventral, solid and double, there is no notochord or gill slits, the heart (if any) is dorsal, and the post-anal tail is absent.

**Subphyla.** **Urochordata** (notochord only in the larval tail: *Ascidia*, *Salpa*, *Doliolum*) and **Cephalochordata** (notochord from head to tail throughout life: *Branchiostoma*, the lancelet) are the **protochordates**. In **Vertebrata** the notochord is replaced by a **cartilaginous or bony vertebral column** in the adult; there is a muscular ventral heart with two, three or four chambers, kidneys for excretion and osmoregulation, and paired appendages (fins or limbs). Vertebrates are divided into **Agnatha** (jawless) and **Gnathostomata** (jawed; **Pisces** and **Tetrapoda**).

**Cyclostomata.** Ectoparasites on some fishes; elongated body with **6–15 pairs of gill slits**; sucking, circular mouth without jaws; cartilaginous cranium and vertebral column; limbless. Marine, but they migrate to fresh water to spawn and die soon after; the larvae return to the ocean. Examples: *Petromyzon* (lamprey), *Myxine* (hagfish).

**Chondrichthyes.** Marine, streamlined, **cartilaginous endoskeleton**; mouth ventral; notochord persists throughout life; **separate gill slits without an operculum**; skin tough with **placoid scales**; teeth are modified placoid scales; powerful jaws; predaceous. **No air bladder**, so they must swim constantly to avoid sinking. **Two-chambered heart**; cold-blooded. Some have electric organs (*Torpedo*) or a poison sting (*Trygon*). Sexes separate; males have **claspers** on the pelvic fins; **internal fertilisation**; mostly viviparous. Examples: *Scoliodon*, *Pristis*, *Carcharodon*, *Trygon*.

**Osteichthyes.** Marine and freshwater; **bony endoskeleton**; streamlined; mouth mostly terminal; **four pairs of gills covered by an operculum**; skin with **cycloid or ctenoid scales**; an **air bladder** regulates buoyancy; **two-chambered heart**; cold-blooded; sexes separate; fertilisation usually external; oviparous; direct development. Examples: *Exocoetus* (flying fish), *Hippocampus* (sea horse), *Labeo* (rohu), *Catla*, *Clarias* (magur), *Betta*, *Pterophyllum*.

**Amphibia.** Live in water and on land; two pairs of limbs; **moist skin without scales**; eyes with eyelids; **tympanum** as the ear; the alimentary canal, urinary and reproductive tracts open into a **cloaca**; respiration by gills, lungs and skin; **three-chambered heart** (two atria, one ventricle); cold-blooded; fertilisation external; oviparous; direct or indirect development. Examples: *Bufo*, *Rana*, *Hyla*, *Salamandra*, *Ichthyophis* (limbless).

**Reptilia.** Creeping or crawling; **dry, cornified skin with epidermal scales or scutes**; tympanum as the ear; two pairs of limbs when present; heart usually **three-chambered, four-chambered in crocodiles**; cold-blooded; snakes and lizards shed their scales as skin cast; fertilisation internal; oviparous; direct development. Examples: *Chelone* (turtle), *Testudo*, *Chameleon*, *Calotes*, *Crocodilus*, *Alligator*, *Hemidactylus*, *Naja* (cobra), *Bangarus* (krait), *Vipera*.

**Aves.** **Feathers**; forelimbs modified into **wings** (flightless: ostrich); hind limbs with scales for walking, swimming or perching; dry skin with an oil gland at the base of the tail; **fully ossified endoskeleton with hollow (pneumatic) long bones**; **crop and gizzard** in the digestive tract; **four-chambered heart**; **warm-blooded**; lungs with air sacs; internal fertilisation; oviparous; direct development. Examples: *Corvus*, *Columba*, *Psittacula*, *Struthio*, *Pavo*, *Aptenodytes* (penguin), *Neophron*.

**Mammalia.** Found in many habitats; the most unique feature is the **mammary glands** that nourish the young; **hair** on the skin; **external ears (pinnae)**; different types of teeth; **four-chambered heart**; **warm-blooded**; lungs; internal fertilisation; mostly viviparous with direct development. Examples: *Ornithorhynchus* (platypus, oviparous), *Macropus*, *Pteropus*, *Camelus*, *Macaca*, *Rattus*, *Canis*, *Felis*, *Elephas*, *Equus*, *Delphinus*, *Balaenoptera*, *Panthera*.

*Counting rule used in questions:* the chambers of the heart are two in fishes, three in amphibians and most reptiles, and four in crocodiles, birds and mammals.`,
      [kt('Protochordates', 'Urochordata and Cephalochordata, which keep a notochord but have no vertebral column.'), kt('Operculum', 'Gill cover of bony fishes.'), kt('Placoid scale', 'Tooth-like scale of cartilaginous fishes; teeth are modified placoid scales.'), kt('Cloaca', 'Common chamber into which the gut, urinary and reproductive tracts open in amphibians.'), kt('Pneumatic bones', 'Hollow long bones with air cavities in birds.')],
      V.chord,
      [3],
      [V.chordVs, V.subphyla, V.classes],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling flatworms pseudocoelomate (they are acoelomate; roundworms are pseudocoelomate).
- Writing that all echinoderms are radial (adults are radial, larvae bilateral).
- Saying coelenterates have a mouth and an anus (the gut has a single opening).
- Putting the heart of a crocodile with the three-chambered reptiles (it is four-chambered).
- Placing whales or dolphins with fishes (they are mammals).
- Forgetting that cartilaginous fishes have no air bladder and no operculum.

**How marks are usually awarded**
- 1-mark items: a distinguishing feature of a phylum or class; an example; the heart chambers; a term such as metamerism.
- 2–3-mark answers: radial versus bilateral symmetry; diploblastic versus triploblastic; types of coelom with examples; salient features of one phylum; cartilaginous versus bony fishes.
- 5-mark answers: classification basis; non-chordate phyla compared; chordate features and subphyla; classes of vertebrates compared.
- Counting items: tallies from a table of animals, gill slits from pairs, total chambers — show the working.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Four levels of organisation in animals?', 'Cellular, cell-tissue, organ, organ-system.', 'fact', 1),
    fc(2, 'Which animals show radial symmetry?', 'Coelenterates, ctenophores and adult echinoderms.', 'fact', 1),
    fc(3, 'Radial versus bilateral symmetry?', 'Radial: any plane through the axis gives equal halves. Bilateral: one plane only.', 'concept', 1),
    fc(4, 'Diploblastic versus triploblastic?', 'Two germ layers (with mesoglea) versus three, with mesoderm.', 'concept', 1),
    fc(5, 'What is a coelom?', 'A body cavity lined by mesoderm.', 'definition', 1),
    fc(6, 'Acoelomate, pseudocoelomate, coelomate examples?', 'Flatworm; roundworm; earthworm.', 'concept', 1),
    fc(7, 'What is metamerism?', 'Division of the body into segments with serial repetition of organs (annelids, arthropods).', 'definition', 1),
    fc(8, 'What is a notochord?', 'A mesodermal rod on the dorsal side of the embryo of chordates.', 'definition', 1),
    fc(9, 'Incomplete versus complete gut?', 'One opening for food and wastes versus separate mouth and anus.', 'concept', 1),
    fc(10, 'Water canal system of sponges?', 'Ostia, spongocoel (lined by choanocytes), osculum.', 'fact', 2),
    fc(11, 'Skeleton of sponges?', 'Spicules or spongin fibres.', 'fact', 2),
    fc(12, 'Function of cnidoblasts?', 'Anchorage, defence and capture of prey.', 'fact', 2),
    fc(13, 'Two body forms of coelenterates?', 'Polyp (sessile) and medusa (free-swimming).', 'fact', 2),
    fc(14, 'What is metagenesis in Obelia?', 'Polyps make medusae asexually; medusae make polyps sexually.', 'concept', 2),
    fc(15, 'Comb jelly features?', 'Eight rows of ciliated comb plates; bioluminescence; exclusively marine.', 'fact', 2),
    fc(16, 'Excretory cells of flatworms?', 'Flame cells (also osmoregulation).', 'fact', 2),
    fc(17, 'Body cavity of Ascaris?', 'Pseudocoelom; the gut is complete.', 'fact', 2),
    fc(18, 'Annelid excretion and circulation?', 'Nephridia; closed circulation.', 'fact', 2),
    fc(19, 'Largest animal phylum?', 'Arthropoda (over two-thirds of named species).', 'fact', 2),
    fc(20, 'Arthropod excretory organs and circulation?', 'Malpighian tubules; open circulation.', 'fact', 2),
    fc(21, 'Rasping organ of molluscs?', 'Radula.', 'fact', 2),
    fc(22, 'Distinctive feature of echinoderms?', 'Water vascular system; calcareous ossicles; spiny skin.', 'fact', 2),
    fc(23, 'Hemichordate body parts?', 'Proboscis, collar and trunk.', 'fact', 2),
    fc(24, 'Four features of chordates?', 'Notochord, dorsal hollow nerve cord, pharyngeal gill slits, post-anal tail (heart ventral).', 'fact', 3),
    fc(25, 'Notochord in Urochordata and Cephalochordata?', 'Larval tail only; head to tail throughout life.', 'fact', 3),
    fc(26, 'Gill slits of cyclostomes?', 'Six to fifteen pairs; jawless sucking mouth.', 'fact', 3),
    fc(27, 'Cartilaginous versus bony fishes: gills and air bladder?', 'No operculum and no air bladder versus operculum and an air bladder.', 'concept', 3),
    fc(28, 'Heart chambers: fishes, amphibians, reptiles, birds, mammals?', '2; 3; 3 (4 in crocodiles); 4; 4.', 'fact', 3),
    fc(29, 'Unique features of birds?', 'Feathers, wings, pneumatic bones, crop and gizzard, warm-blooded.', 'fact', 3),
    fc(30, 'Most unique feature of mammals?', 'Mammary glands; also hair and pinnae.', 'fact', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
