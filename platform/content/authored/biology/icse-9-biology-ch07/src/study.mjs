// ICSE 9 Biology ch07 notes and flashcards.
import { T, unit, PROV } from '../../icse-9-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Diversity in the Animal Kingdom — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Kingdom Animalia: non-chordates and chordates',
      `Animals are grouped by shared body features. The first split is on the **notochord**, a stiff rod running along the back.

| Feature | Non-chordates | Chordates |
|---|---|---|
| Notochord | Absent | Present at some stage of life |
| Nerve cord | Solid, on the belly side | Hollow, on the back (dorsal) side |
| Pharyngeal gill slits | Absent | Present at some stage (often only in the embryo) |
| Heart | On the back side, when present | On the belly side |

**Non-chordates** in this course form eight phyla: Porifera, Coelenterata, Platyhelminthes, Nemathelminthes, Annelida, Arthropoda, Mollusca and Echinodermata. **Chordates** here are the five classes of **vertebrates** (animals with a backbone): Pisces, Amphibia, Reptilia, Aves and Mammalia.`,
      [kt('Notochord', 'A stiff supporting rod along the back of a chordate; in vertebrates it is replaced by the backbone.'), kt('Phylum', 'A major group of animals sharing a basic body plan.'), kt('Vertebrate', 'A chordate with a backbone.')],
      V.tree,
      [1],
    ),
    sec(
      '2. Porifera and Coelenterata',
      `**Porifera (sponges)** — "pore bearers".
- Mostly **marine**; **fixed** to a rock or shell and do not move about.
- Body is full of **pores**; water enters through the pores and leaves through a large opening, the **osculum**; the central cavity is lined with collar-bearing cells that capture food.
- Supported by **spicules** or fibres. Examples: **Sycon**, **Spongilla** (freshwater), **Euspongia** (bath sponge).

**Coelenterata** — aquatic, mostly marine.
- Body is a **tube with two cell layers** and a central cavity (the coelenteron); a **single opening** serves as mouth and anus.
- **Tentacles** around the mouth carry **stinging cells (cnidoblasts)** used to catch prey and for defence.
- Examples: **Hydra** (freshwater), **jellyfish**, **sea anemone**, **coral**.`,
      [kt('Osculum', 'The large opening at the top of a sponge through which water leaves.'), kt('Spicule', 'A tiny rod-like skeletal piece in the body wall of a sponge.'), kt('Cnidoblast', 'A stinging cell on the tentacles of a coelenterate.')],
      V.spongeHydra,
      [2],
    ),
    sec(
      '3. Platyhelminthes, Nemathelminthes and Annelida',
      `| Phylum | Body | Body cavity | Other features | Examples |
|---|---|---|---|---|
| **Platyhelminthes** | Flat, leaf-like or ribbon-like | **None** (solid tissue) | Many are **parasites** with **hooks and suckers** | Planaria (free-living), liver fluke, tapeworm |
| **Nemathelminthes** | Round, **unsegmented**, pointed at the ends | **False** (pseudocoelom) | Separate sexes; many parasites | Ascaris, hookworm, filarial worm |
| **Annelida** | Long, divided into **rings (segments)** | **True** cavity (coelom) | Bristles; moist skin | Earthworm, leech, Nereis |

A **coelom** is a body cavity completely lined by tissue; a false cavity is not fully lined.`,
      [kt('Coelom', 'A true body cavity, lined all round by tissue.'), kt('Parasite', 'An organism that lives on or in another and takes food from it.'), kt('Segmented', 'Having a body divided into repeated rings or parts.')],
      V.coelom,
      [3],
    ),
    sec(
      '4. Arthropoda, Mollusca and Echinodermata',
      `**Arthropoda** — the largest phylum: a **segmented body**, **jointed legs** and a hard outer skeleton (exoskeleton) that is moulted as the animal grows. Insects have **three body regions** (head, thorax, abdomen) and **three pairs of legs**; spiders have **four pairs** of legs. Examples: cockroach, butterfly, prawn, crab, spider, scorpion, centipede.

**Mollusca** — **soft, unsegmented body**, usually covered by a **mantle** that makes a **shell**, and a **muscular foot** for creeping. Examples: snail, mussel, octopus, cuttlefish (octopus and cuttlefish have no shell on the outside).

**Echinodermata** — **spiny skin**; **tube feet** for moving and catching food; body in five parts in adults; **all marine**. Examples: starfish, sea urchin, sea cucumber.`,
      [kt('Exoskeleton', 'The hard outer covering of an arthropod.'), kt('Mantle', 'A fold of skin of a mollusc that secretes the shell.'), kt('Tube feet', 'Small tube-like feet of an echinoderm used for movement.')],
      V.insect,
      [4],
      [V.starSnail],
    ),
    sec(
      '5. Chordates: Pisces and Amphibia',
      `| Feature | Pisces (fishes) | Amphibia |
|---|---|---|
| Habitat | Water only | Land and water |
| Skin | **Scales** | **Moist, smooth**, no scales |
| Breathing | **Gills** | **Skin and lungs** (gills in the larva) |
| Limbs | **Fins** | Four limbs; webbed feet in many |
| Heart | **Two** chambers | **Three** chambers |
| Eggs | Laid in water | Laid in water; the larva (tadpole) changes by **metamorphosis** |
| Examples | Rohu, shark, seahorse | Frog, toad, salamander |

Both classes are **cold-blooded**: body temperature changes with the surroundings. Frogs lay eggs in water, so amphibians depend on water to breed.`,
      [kt('Metamorphosis', 'A change of body form from the larva to the adult, as from tadpole to frog.'), kt('Cold-blooded', 'Having a body temperature that varies with the surroundings.')],
      V.hearts,
      [5],
    ),
    sec(
      '6. Chordates: Reptilia, Aves and Mammalia',
      `| Feature | Reptilia | Aves | Mammalia |
|---|---|---|---|
| Body covering | Dry **scales** | **Feathers** | **Hair** |
| Limbs | Four short legs (none in snakes) | Forelimbs form **wings** | Legs, wings (bat) or flippers (whale) |
| Heart | **Three** chambers | **Four** chambers | **Four** chambers |
| Body temperature | Cold-blooded | **Warm-blooded** | **Warm-blooded** |
| Young | Shelled eggs on **land** | Hard-shelled eggs | Born alive and fed with **milk** from **mammary glands** (most) |
| Other | Lungs; dry skin | **Beak**; **hollow bones**; lungs | External ear (pinna); **diaphragm** |
| Examples | Lizard, snake, turtle, crocodile | Crow, pigeon, penguin | Human, bat, whale, kangaroo |

To classify a vertebrate, work through the clues: gills and scales mean fish; moist skin and a larva mean amphibian; feathers mean bird; hair and mammary glands mean mammal; dry scales and shelled eggs on land mean reptile.`,
      [kt('Mammary gland', 'A gland of female mammals that makes milk to feed the young.'), kt('Warm-blooded', 'Keeping a constant body temperature whatever the surroundings.')],
      V.hearts,
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Writing the phylum without a **feature** as reason.
- Calling a spider an insect, or an octopus an echinoderm; a spider is an **arthropod** with eight legs, an octopus is a **mollusc**.
- Putting a bat or a whale in the wrong class: both are **mammals**.
- Confusing a **false** body cavity (Nemathelminthes) with **no** cavity (Platyhelminthes) and a **true** cavity (Annelida).
- Writing four chambers for every reptile: most reptiles have **three** (the crocodile has four; books differ on how far it is taught).

**How marks are usually awarded**
- 1 mark: a term, an odd one out **with its category**, a reason.
- 2 marks: two features or two differences matched point for point.
- 3 marks: a table of three differences, or a neat, labelled diagram.
- 10-mark structured question: a short situation or diagram with parts of 3, 3 and 4 marks; one part is usually a labelled diagram.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a notochord?', 'A stiff rod along the back that supports the body of a chordate.', 'definition', 1),
    fc(2, 'Three features of chordates?', 'Notochord, dorsal hollow nerve cord, pharyngeal gill slits.', 'fact', 1),
    fc(3, 'Nerve cord of non-chordates?', 'Solid and on the belly side.', 'fact', 1),
    fc(4, 'How many non-chordate phyla in this course?', 'Eight.', 'fact', 1),
    fc(5, 'Five classes of vertebrates?', 'Pisces, Amphibia, Reptilia, Aves, Mammalia.', 'exam-tip', 1),
    fc(6, 'What does Porifera mean?', 'Pore bearer.', 'definition', 2),
    fc(7, 'Opening through which water leaves a sponge?', 'Osculum.', 'fact', 2),
    fc(8, 'Skeleton of a sponge?', 'Spicules or fibres.', 'fact', 2),
    fc(9, 'Examples of sponges?', 'Sycon, Spongilla, Euspongia (bath sponge).', 'fact', 2),
    fc(10, 'Stinging cells of coelenterates?', 'Cnidoblasts.', 'definition', 2),
    fc(11, 'Body layers of a coelenterate?', 'Two cell layers around a central cavity.', 'fact', 2),
    fc(12, 'Examples of coelenterates?', 'Hydra, jellyfish, sea anemone, coral.', 'fact', 2),
    fc(13, 'Body cavity of a flatworm?', 'None.', 'fact', 3),
    fc(14, 'Body cavity of a roundworm?', 'A false cavity.', 'fact', 3),
    fc(15, 'Body cavity of an earthworm?', 'A true cavity, the coelom.', 'fact', 3),
    fc(16, 'Examples of Platyhelminthes?', 'Planaria, liver fluke, tapeworm.', 'fact', 3),
    fc(17, 'Examples of Nemathelminthes?', 'Ascaris, hookworm, filarial worm.', 'fact', 3),
    fc(18, 'Special feature of Annelida?', 'Body divided into rings (segments).', 'fact', 3),
    fc(19, 'Main feature of Arthropoda?', 'Jointed legs and a hard outer skeleton.', 'fact', 4),
    fc(20, 'Legs of an insect and of a spider?', 'Insect: six legs; spider: eight legs.', 'fact', 4),
    fc(21, 'Body regions of an insect?', 'Head, thorax, abdomen.', 'fact', 4),
    fc(22, 'Main features of Mollusca?', 'Soft unsegmented body, mantle, usually a shell, muscular foot.', 'fact', 4),
    fc(23, 'Main features of Echinodermata?', 'Spiny skin, tube feet, all marine.', 'fact', 4),
    fc(24, 'Heart chambers: fish, amphibian, reptile?', 'Two, three, three.', 'fact', 5),
    fc(25, 'Why do amphibians need water to breed?', 'They lay eggs in water and the larva has gills.', 'concept', 5),
    fc(26, 'Skin of a reptile?', 'Dry and covered with scales.', 'fact', 6),
    fc(27, 'Where do reptiles lay their eggs?', 'On land, in shelled eggs.', 'fact', 6),
    fc(28, 'Two features found only in birds?', 'Feathers and a beak, with forelimbs as wings.', 'fact', 6),
    fc(29, 'Features of mammals?', 'Hair, mammary glands, external ear, diaphragm, four-chambered heart.', 'fact', 6),
    fc(30, 'Which vertebrate classes are warm-blooded?', 'Aves and Mammalia.', 'exam-tip', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
