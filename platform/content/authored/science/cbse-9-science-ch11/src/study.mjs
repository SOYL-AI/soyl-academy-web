// ch11 Diversity: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Diversity: Notes',
  language: 'en',
  sections: [
    sec(
      '1. Why we classify, and the hierarchy',
      r`**Classification** is the sorting of organisms into groups by their similarities and differences. It makes the study of millions of species easier, shows how organisms are related, and lets us predict the features of a new organism from its group.

The groups are nested: **kingdom, phylum (division in plants), class, order, family, genus, species**. Each step down has fewer organisms that share more features. A **species** is a group of organisms that can breed with each other and produce fertile offspring. Animals that share a lower rank are closer relatives: the tiger (*Panthera tigris*) and the lion (*Panthera leo*) share a genus, but the domestic cat (*Felis catus*) shares only the family.`,
      [kt('Classification', 'Sorting organisms into groups by their similarities and differences.'), kt('Species', 'A group of organisms that can breed together and produce fertile offspring.'), kt('Hierarchy', 'Nested groups from kingdom down to species, each smaller than the one above.')],
      [],
      V.ranks,
      [1],
      [V.cats],
    ),
    sec(
      '2. Five-kingdom classification',
      r`In 1969 R. H. Whittaker placed all organisms in **five kingdoms**, using three criteria: **cell type** (prokaryotic or eukaryotic), **body organisation** (one cell or many cells) and **mode of nutrition** (makes food or takes it in).

- **Monera:** prokaryotic, single-celled; bacteria and cyanobacteria.
- **Protista:** eukaryotic, single-celled; *Amoeba*, *Paramecium*, *Euglena*.
- **Fungi:** eukaryotic, mostly many-celled threads, chitin wall, absorb ready-made food; mushroom, bread mould, yeast (one-celled).
- **Plantae:** eukaryotic, many-celled, cellulose wall, photosynthesis.
- **Animalia:** eukaryotic, many-celled, no cell wall, eat other organisms.`,
      [kt('Prokaryotic', 'A cell with no true nucleus and no membrane-bound organelles.'), kt('Chitin', 'The tough material that forms the cell wall of fungi.'), kt('Autotroph', 'An organism that makes its own food, such as a green plant.'), kt('Heterotroph', 'An organism that depends on other organisms for food.')],
      [],
      V.basis,
      [1],
      [V.kingdoms, V.moneraProtista, V.threeKingdoms],
    ),
    sec(
      '3. Major divisions of plants',
      r`Plants are divided by body structure and by whether they make seeds.

**Cryptogams (no seeds):** **Thallophyta** (algae such as *Spirogyra*; body is a thallus with no root, stem or leaf); **Bryophyta** (moss, liverwort; need water to reproduce; no vascular tissue); **Pteridophyta** (ferns; vascular tissue, spores, no seeds).

**Phanerogams (make seeds):** **Gymnosperms** (pine, deodar, *Cycas*; naked seeds in cones) and **Angiosperms** (flowering plants; seeds inside fruits). Angiosperms are **monocots** (one cotyledon, parallel veins, fibrous roots: wheat, maize) or **dicots** (two cotyledons, net-like veins, tap root: gram, neem).`,
      [kt('Thallus', 'A plant body that is not divided into root, stem and leaf.'), kt('Vascular tissue', 'Xylem and phloem, which carry water and food through a plant.'), kt('Cotyledon', 'A seed leaf inside a seed.'), kt('Angiosperm', 'A flowering plant whose seeds are enclosed in a fruit.')],
      [],
      V.plants,
      [2],
      [V.lowerPlants, V.upperPlants, V.monoDi],
    ),
    sec(
      '4. Major groups of animals',
      r`**Invertebrates (no backbone):** **Porifera** (sponges; pores), **Cnidaria** (*Hydra*, jellyfish; stinging cells), **Platyhelminthes** (flatworms), **Nematoda** (roundworms), **Annelida** (earthworm; rings), **Arthropoda** (jointed legs; the largest phylum), **Mollusca** (snail; soft body, foot, shell) and **Echinodermata** (starfish; spiny skin).

**Chordata** have a notochord, a nerve cord on the back and gill slits at some stage. **Vertebrates** have a backbone and fall into five classes: **Pisces** (scales, gills), **Amphibia** (moist skin, water and land), **Reptilia** (dry scales), **Aves** (feathers, four-chambered heart) and **Mammalia** (hair, milk glands, mostly give birth to young).`,
      [kt('Vertebrate', 'An animal with a backbone.'), kt('Notochord', 'A rod-like support along the back that every chordate has at some stage.'), kt('Arthropoda', 'The phylum of animals with jointed legs and a hard outer covering.')],
      [],
      V.nonChordata,
      [2],
      [V.animals, V.vertebrates],
    ),
    sec(
      '5. Binomial nomenclature',
      r`Carolus **Linnaeus** introduced the **two-part scientific name**: the **genus** and then the **species**, in Latin form. It is the same all over the world, so it removes the confusion caused by local names (imli, chinch, puli: all *Tamarindus indica*).

**Rules:**
1. The name has two words, genus first.
2. The genus begins with a **capital letter**; the species begins with a **small letter**.
3. In print the name is in *italics*. When handwritten, **underline the genus and the species separately**.

Examples: *Homo sapiens* (human), *Panthera tigris* (tiger), *Mangifera indica* (mango), *Azadirachta indica* (neem). The same species word (*indica*) can appear in different genera; the **full two-word name** is unique.`,
      [kt('Binomial nomenclature', 'The system of giving each organism a two-part scientific name, genus and species.'), kt('Genus', 'The first part of a scientific name; it begins with a capital letter.'), kt('Scientific name', 'The Latin two-word name of an organism, the same all over the world.')],
      [],
      V.rules,
      [3],
      [V.names, V.fixNames],
    ),
    sec(
      '6. Viruses: acellular entities',
      r`A **virus** is genetic material (DNA or RNA) inside a **protein coat** (capsid), sometimes with spikes. It has **no cytoplasm, no organelles and no cell membrane**, so it is **acellular**. A virus cannot make its own proteins and **multiplies only inside a host cell**; outside a host it is inactive. Typical viruses are about 20 to 300 nm, much smaller than bacteria (about 2000 nm).

**Why no kingdom?** Whittaker's kingdoms group cells. Viruses are not cells and do not carry out life processes on their own, so they are not placed in any of the five kingdoms.`,
      [kt('Virus', 'An acellular particle of genetic material in a protein coat that multiplies only inside a host cell.'), kt('Acellular', 'Not made of cells.'), kt('Host cell', 'A living cell in which a virus multiplies.')],
      [],
      V.virusLife,
      [4],
      [V.virus, V.virusSteps],
    ),
    sec(
      '7. Ecological roles of organisms',
      r`**Producers** (green plants, algae, cyanobacteria) make food by photosynthesis. **Consumers** (herbivores, carnivores, omnivores) eat other organisms. **Decomposers**, mainly **bacteria and fungi**, break down dead remains and wastes and return nutrients to the soil.

**Fungi and bacteria** are useful (decomposition, curd, bread, helping pulse crops) and harmful (diseases, spoiled food). Arrows in a food chain point from the **food to the eater**.`,
      [kt('Producer', 'An organism that makes its own food, usually by photosynthesis.'), kt('Consumer', 'An organism that eats other organisms.'), kt('Decomposer', 'A bacterium or fungus that breaks down dead remains and wastes.')],
      [],
      V.roles,
      [4],
      [V.web, V.microbes],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Calling fungi plants, or writing that fungi make food by photosynthesis.
- Writing the species word with a capital letter, or forgetting to italicise or underline.
- Saying that bryophytes have xylem and phloem.
- Writing that gymnosperms bear fruits, or that a bat is a bird.
- Calling a virus a cell, or placing a virus in Monera.
- Drawing food chain arrows from the eater to the food.

**How marks are usually awarded**
- 1-mark items: a name, a place in a group, or one feature.
- 2-mark items: two points, one mark each.
- 3-mark items: three short correct points with an example.
- 5-mark items: a labelled chart or table and clear points with examples.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Give two reasons why we classify organisms.', 'It makes the study of millions of species easier, and it shows how organisms are related.', 'concept', 1),
    fc(2, 'List the ranks of classification from largest to smallest.', 'Kingdom, phylum (division), class, order, family, genus, species.', 'fact', 1),
    fc(3, 'What is a species?', 'A group of organisms that can breed together and produce fertile offspring.', 'definition', 1),
    fc(4, 'Who proposed the five-kingdom classification, and when?', 'R. H. Whittaker, in 1969.', 'fact', 1),
    fc(5, 'What three criteria did Whittaker use?', 'Cell type, body organisation and mode of nutrition.', 'concept', 1),
    fc(6, 'Which is the only prokaryotic kingdom?', 'Monera.', 'fact', 1),
    fc(7, 'Name two examples of Protista.', 'Amoeba, Paramecium, Euglena (any two).', 'example', 1),
    fc(8, 'What is the cell wall of fungi made of?', 'Chitin.', 'fact', 1),
    fc(9, 'Why are fungi not plants?', 'They have no chlorophyll and absorb ready-made food instead of making it.', 'concept', 1),
    fc(10, 'Which kingdom has many-celled organisms with no cell wall that eat other organisms?', 'Animalia.', 'fact', 1),
    fc(11, 'What are cryptogams? Name their three divisions.', 'Plants without seeds: Thallophyta, Bryophyta, Pteridophyta.', 'concept', 2),
    fc(12, 'What is a thallus?', 'A plant body that is not divided into root, stem and leaf, as in algae.', 'definition', 2),
    fc(13, 'Why are bryophytes called the amphibians of the plant kingdom?', 'They live on land but need water to reproduce.', 'concept', 2),
    fc(14, 'What do pteridophytes have that bryophytes lack?', 'Vascular tissue (xylem and phloem) and true roots, stems and leaves.', 'concept', 2),
    fc(15, 'What are naked seeds? Name two gymnosperms.', 'Seeds not enclosed in a fruit; pine and deodar (or Cycas).', 'example', 2),
    fc(16, 'What is the main feature of angiosperms?', 'Flowers, and seeds enclosed in fruits.', 'fact', 2),
    fc(17, 'Give three differences between monocots and dicots.', 'One or two cotyledons; parallel or net-like veins; fibrous or tap roots.', 'concept', 2),
    fc(18, 'Which animal phylum is the largest, and what is its key feature?', 'Arthropoda; jointed legs and a hard outer covering.', 'fact', 2),
    fc(19, 'Name the phylum of sponges and one feature.', 'Porifera; pores over the body.', 'fact', 2),
    fc(20, 'Which phylum has stinging cells? Give an example.', 'Cnidaria; Hydra or jellyfish.', 'fact', 2),
    fc(21, 'What do mollusca have in common?', 'A soft body, a muscular foot, and usually a shell (snail, octopus).', 'concept', 2),
    fc(22, 'What features define Chordata?', 'A notochord, a nerve cord on the back and gill slits at some stage.', 'concept', 2),
    fc(23, 'Name the five classes of vertebrates.', 'Pisces, Amphibia, Reptilia, Aves, Mammalia.', 'fact', 2),
    fc(24, 'Three features of mammals?', 'Hair, milk glands and a four-chambered heart.', 'concept', 2),
    fc(25, 'Who introduced binomial nomenclature?', 'Carolus Linnaeus.', 'fact', 3),
    fc(26, 'State the rules for writing a scientific name.', 'Genus first with a capital letter, species second with a small letter; italics in print, underline each word by hand.', 'exam-tip', 3),
    fc(27, 'Write the scientific names of human, tiger and mango.', 'Homo sapiens, Panthera tigris, Mangifera indica.', 'example', 3),
    fc(28, 'Why are viruses called acellular?', 'They have no cytoplasm, organelles or cell membrane: only genetic material in a protein coat.', 'concept', 4),
    fc(29, 'Why are viruses not placed in any kingdom?', 'They are not cells and multiply only inside a host cell.', 'concept', 4),
    fc(30, 'Name the three ecological roles and one example of each.', 'Producer (grass), consumer (goat), decomposer (fungus or bacterium).', 'concept', 4),
    fc(31, 'Give one useful and one harmful role of bacteria.', 'Useful: curd or decomposition. Harmful: diseases such as typhoid.', 'example', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
