// ISC 11 Biology ch04 Plant Kingdom — notes and flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { ALGAE } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });
const A = ALGAE;
const row = (f) => ['Chlorophyceae', 'Phaeophyceae', 'Rhodophyceae'].map(f);

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Plant Kingdom — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Algae: Chlorophyceae, Phaeophyceae and Rhodophyceae',
      `**Algae** are simple, chlorophyll-bearing, autotrophic organisms with a **thallus**: no root, stem or leaf and no vascular tissue. They may be unicellular (*Chlamydomonas*), colonial (*Volvox*), filamentous (*Ulothrix*, *Spirogyra*) or large and leaf-like (kelps). They live in fresh water, sea water, on moist soil and on rocks. Their sex organs are mostly single-celled and have no sterile jacket.

**The three classes** are separated by pigments, stored food, cell wall, flagella and habitat (see the table). In **brown algae** the body is differentiated into a **holdfast**, a **stipe** and a **frond**; in *Sargassum* and similar algae air bladders keep the frond afloat. **Red algae** have the pigment **phycoerythrin** and no flagellated cell at any stage, so their spores and male gametes are carried passively by water.

**Reproduction** is **vegetative** (fragmentation of the thallus), **asexual** (by flagellated **zoospores** in green and brown algae, non-motile spores in red algae) and **sexual** (fusion of gametes). The gametes may be similar (**isogamous**, as in *Ulothrix*), dissimilar in size (**anisogamous**, as in *Eudorina*) or an egg and a small motile male gamete (**oogamous**, as in *Volvox* and *Fucus*).

**Economic importance.** Algae carry out about half of the total carbon dioxide fixation on Earth and release oxygen; they are the primary producers of aquatic food chains. *Porphyra*, *Laminaria* and *Sargassum* are eaten as seaweed. **Agar**, used in laboratories and in food, comes from *Gelidium* and *Gracilaria* (red algae); **algin** from brown algae and **carrageen** from red algae are thickening agents; *Chlorella* and *Spirulina* are rich in protein and are grown as **single-cell protein**; and *Chlorella* is a possible food supplement for space travel.

*Where books differ.* Some books list five or more uses; the five above are the ones usually asked. The "about half of the carbon dioxide fixation" figure is the one given in standard textbooks and is approximate.`,
      [kt('Thallus', 'A plant body not differentiated into root, stem and leaf.'), kt('Holdfast', 'The root-like part of a brown alga that anchors it to a rock.'), kt('Zoospore', 'A flagellated asexual spore of algae.'), kt('Agar', 'A gel obtained from red algae such as Gelidium and Gracilaria.'), kt('Algin', 'A gel in the cell wall of brown algae, used as a thickener.')],
      table(['Feature', 'Chlorophyceae (green)', 'Phaeophyceae (brown)', 'Rhodophyceae (red)'], [
        ['Pigments', ...row((k) => A[k].pigments.join(', '))],
        ['Stored food', ...row((k) => A[k].food)],
        ['Cell wall', ...row((k) => A[k].wall)],
        ['Flagella', ...row((k) => A[k].flagella)],
        ['Habitat', ...row((k) => A[k].habitat)],
        ['Examples', ...row((k) => A[k].examples.join(', '))],
      ], 'Table comparing green, brown and red algae'),
      [1],
      [V.alga],
    ),
    sec(
      '2. Bryophytes: liverworts and mosses; the life cycle of Funaria',
      `**Bryophytes** are small, mostly terrestrial plants of damp, shaded places, called the **amphibians of the plant kingdom** because they live on land but need water for fertilisation. The plant body is thalloid or leafy, attached by **rhizoids**, and has **no xylem or phloem**. The main plant body is the haploid **gametophyte**.

**Liverworts** (*Marchantia*, *Riccia*) have a flat, dorsiventral thallus; *Marchantia* reproduces asexually by **gemmae** formed in **gemma cups**. **Mosses** (*Funaria*, *Polytrichum*, *Sphagnum*) have two stages: a creeping, green, branched **protonema** that grows directly from the spore, and the upright **leafy gametophyte** that develops from it, with spirally arranged leaves and rhizoids.

**Life cycle of Funaria (graphic outline).** Haploid **spore** → **protonema** → **leafy gametophyte** (dominant) bearing **antheridia** (making **antherozoids**) and **archegonia** (each with an egg) at the shoot tips → antherozoids swim in a film of water to the egg → **zygote** (diploid) → **sporophyte** with **foot, seta and capsule**, which stays attached to the gametophyte and depends on it for water and food → in the capsule **spore mother cells divide by meiosis** to give haploid **spores**, released when the lid (operculum) opens and the peristome teeth bend.

**Alternation of generations.** A haploid gametophyte (gamete-forming) alternates with a diploid sporophyte (spore-forming). In bryophytes the **gametophyte is dominant** and the sporophyte is short-lived and dependent; in pteridophytes and gymnosperms the sporophyte is dominant.

**Economic importance.** *Sphagnum* gives **peat**, used as fuel, and its great water-holding capacity makes it a packing material for transporting live plants and a soil conditioner in horticulture. Mosses grow on bare rock and soil, form mats that bind the soil and reduce erosion, and are pioneers of **ecological succession**.

*Where books differ.* Some books describe the *Funaria* sex organs as on separate branches of one plant (monoecious); others mention only the apex of the main shoot and its branch. Either wording earns the marks provided that antheridia and archegonia are both named.`,
      [kt('Rhizoid', 'A unicellular or multicellular, root-like structure that anchors a bryophyte but does not conduct water.'), kt('Protonema', 'The creeping, filamentous stage of a moss that grows from a spore.'), kt('Gemma', 'A small green vegetative bud of a liverwort, formed in a gemma cup.'), kt('Alternation of generations', 'The alternation of a haploid gamete-forming generation with a diploid spore-forming generation.')],
      V.funaria,
      [2],
      [V.moss],
    ),
    sec(
      '3. Pteridophytes: classes, fern life cycle, homospory and heterospory',
      `**Pteridophytes** are the first land plants with **true roots, stems, leaves and vascular tissue (xylem and phloem)**, but they do not form seeds. They are found in cool, damp, shaded places. The main plant body is the **sporophyte**, which bears **sporangia** on leaf-like **sporophylls**; in ferns the sporangia are grouped in **sori** on the underside of the leaves (fronds).

**Four classes with examples**
- **Psilopsida:** *Psilotum* (and the fossil *Rhynia*).
- **Lycopsida:** *Lycopodium*, *Selaginella*.
- **Sphenopsida:** *Equisetum*.
- **Pteropsida:** *Dryopteris*, *Pteris*, *Adiantum* (ferns); *Marsilea*, *Salvinia* (water ferns).

**Fern life cycle (graphic outline).** Sporophyte (2n) → spore mother cells in sporangia → **meiosis** → haploid **spores** → spore germinates into a small, green, heart-shaped, free-living **prothallus** (the gametophyte, n) with **antheridia** and **archegonia** on its lower surface → antherozoids swim in water to the egg → **zygote** (2n) → young sporophyte. Fertilisation needs water. In a typical leptosporangiate fern each sporangium has 16 spore mother cells and gives 64 spores.

**Homospory and heterospory.** Most pteridophytes are **homosporous**, producing one kind of spore (*Dryopteris*, *Lycopodium*, *Equisetum*). *Selaginella*, *Salvinia* and *Marsilea* are **heterosporous**, producing small **microspores** and large **megaspores**; they give male and female gametophytes respectively. In *Selaginella* the female gametophyte develops inside the megasporangium and the young embryo is nourished by it: the beginning of the **seed habit**.

**Economic importance.** Ferns such as *Adiantum* and *Nephrolepis* are ornamental; *Azolla* shelters the nitrogen-fixing cyanobacterium *Anabaena* and is a biofertiliser in paddy fields; *Equisetum* helps to bind loose soil; and giant fern-like plants of the Carboniferous period formed coal deposits.`,
      [kt('Sorus', 'A group of sporangia on the underside of a fern frond.'), kt('Prothallus', 'The small, heart-shaped, free-living gametophyte of a fern.'), kt('Homospory', 'Formation of one kind of spore.'), kt('Heterospory', 'Formation of two kinds of spore, microspores and megaspores.')],
      V.fern,
      [3],
      [table(['Class', 'Examples'], [['Psilopsida', 'Psilotum'], ['Lycopsida', 'Lycopodium, Selaginella'], ['Sphenopsida', 'Equisetum'], ['Pteropsida', 'Dryopteris, Pteris, Adiantum']], 'Table of the four classes of pteridophytes')],
    ),
    sec(
      '4. Gymnosperms: characteristics and the life cycle of Pinus',
      `**Gymnosperms** are plants whose **ovules are not enclosed in an ovary**, so the seeds are **naked**; they form no flowers or fruits. They include tall trees (*Pinus*, *Cedrus*, redwood), shrubs and cycads (*Cycas*). Roots are tap roots; those of *Pinus* have **mycorrhiza** and those of *Cycas* have **coralloid roots** with cyanobacteria. The stem is unbranched in *Cycas* and branched in *Pinus* and *Cedrus*. Leaves are needle-like in conifers, with a thick cuticle and sunken stomata that reduce water loss, and pinnate in *Cycas*. All are **heterosporous**: **microspores** form pollen grains in **microsporangia** on microsporophylls and **megaspores** form in **ovules** on megasporophylls, arranged in **cones**. The male and female gametophytes are reduced and do not live independently.

**Life cycle of Pinus (graphic outline).** The tree is the dominant **sporophyte**. In the male cone, **pollen mother cells** divide by **meiosis** to give **microspores**, which develop into winged **pollen grains** (the male gametophyte). In the female cone each ovule has a **megaspore mother cell** that divides by meiosis into **four megaspores**; **one is functional** and develops into the **female gametophyte** with **archegonia**, the other three degenerate. Wind carries pollen to the ovule (**pollination**); a **pollen tube** carries the male gametes to the egg, so **water is not needed**. Fertilisation takes place long after pollination (many months in *Pinus*); the **zygote** forms the **embryo**, the ovule becomes a **seed**, and the seed germinates into a new tree.

**Gymnosperms and pteridophytes compared.** Gymnosperms form **seeds**, are always **heterosporous**, retain a **reduced gametophyte** within the sporophyte, and do not need water for fertilisation because of the pollen tube; pteridophytes have no seeds, are mostly homosporous, have a free-living prothallus and need water.

**Economic importance.** Softwood **timber** (*Pinus*, *Cedrus*); **resin** from which turpentine and rosin are obtained (*Pinus*); **sago** starch from the stem of *Cycas*; **ephedrine** from *Ephedra*; **taxol** from *Taxus*; paper pulp; and ornamental trees such as *Thuja* and *Araucaria*.

*Where books differ.* The interval between pollination and fertilisation in *Pinus* is given as about a year in many books; "many months to over a year" is safe wording. Taxol is obtained from the bark of the yew (*Taxus*).`,
      [kt('Naked seed', 'A seed that is not enclosed in a fruit because the ovule has no ovary wall.'), kt('Cone', 'A compact axis bearing microsporophylls or megasporophylls.'), kt('Pollen tube', 'A tube that carries the male gametes to the egg, so that water is not needed for fertilisation.'), kt('Mycorrhiza', 'A partnership between a fungus and the roots of a plant, as in Pinus.')],
      V.pinus,
      [4],
      [table(['Feature', 'Pteridophytes', 'Gymnosperms'], [['Seeds', 'None', 'Naked'], ['Spores', 'Mostly homosporous', 'Heterosporous'], ['Gametophyte', 'Free-living', 'Reduced and dependent'], ['Water for fertilisation', 'Needed', 'Not needed']], 'Table comparing pteridophytes and gymnosperms')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving only the colour of an alga class; the marks are for pigments, stored food, cell wall and flagella.
- Forgetting to mark **n** and **2n** (and meiosis) on a graphic outline of a life cycle.
- Saying that the moss sporophyte is independent; it is attached to and dependent on the gametophyte.
- Writing that all pteridophytes are heterosporous (most are homosporous).
- Saying that gymnosperms have fruits; they have naked seeds.
- Treating a prothallus as a sporophyte; it is the haploid gametophyte.

**How marks are usually awarded**
- 1-mark subparts: a term, an example, a stored food, a pigment, ploidy of a stage, a give-a-reason.
- 2- and 3-mark questions: tables of differences, three examples with uses, short life-cycle descriptions.
- 5-mark questions in parts: a graphic outline of the Funaria, fern or Pinus life cycle with labels, then a comparison and a reason.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a thallus?', 'A plant body without root, stem and leaf differentiation.', 'definition', 1),
    fc(2, 'Pigments of green, brown and red algae?', 'Chlorophyll a and b; chlorophyll a and c with fucoxanthin; chlorophyll a and d with phycoerythrin.', 'fact', 1),
    fc(3, 'Stored food in green, brown and red algae?', 'Starch; mannitol and laminarin; floridean starch.', 'fact', 1),
    fc(4, 'Which algae never form flagellate cells?', 'Red algae (Rhodophyceae).', 'fact', 1),
    fc(5, 'Parts of a large brown alga?', 'Holdfast, stipe and frond.', 'fact', 1),
    fc(6, 'Name the three kinds of sexual reproduction in algae.', 'Isogamous, anisogamous and oogamous.', 'concept', 1),
    fc(7, 'Source of agar?', 'Gelidium and Gracilaria (red algae).', 'fact', 1),
    fc(8, 'Algae used as single-cell protein?', 'Chlorella and Spirulina.', 'fact', 1),
    fc(9, 'Why are bryophytes called amphibians of the plant kingdom?', 'They live on land but need water for fertilisation.', 'concept', 2),
    fc(10, 'Two examples each of liverworts and mosses?', 'Marchantia, Riccia; Funaria, Polytrichum, Sphagnum.', 'fact', 2),
    fc(11, 'What are gemmae?', 'Green vegetative buds of liverworts formed in gemma cups.', 'definition', 2),
    fc(12, 'Dominant generation in bryophytes?', 'The haploid gametophyte.', 'fact', 2),
    fc(13, 'What is a protonema?', 'The creeping green stage of a moss that grows from a spore.', 'definition', 2),
    fc(14, 'Parts of the Funaria sporophyte?', 'Foot, seta and capsule.', 'fact', 2),
    fc(15, 'Where does meiosis occur in Funaria?', 'In the spore mother cells of the capsule.', 'concept', 2),
    fc(16, 'Economic importance of Sphagnum?', 'Peat as fuel; water-holding packing material and soil conditioner.', 'fact', 2),
    fc(17, 'Four classes of pteridophytes?', 'Psilopsida, Lycopsida, Sphenopsida, Pteropsida.', 'fact', 3),
    fc(18, 'Example of each pteridophyte class?', 'Psilotum; Selaginella; Equisetum; Dryopteris.', 'fact', 3),
    fc(19, 'What is a sorus?', 'A group of sporangia on the underside of a fern frond.', 'definition', 3),
    fc(20, 'What is a prothallus?', 'The small, heart-shaped, free-living haploid gametophyte of a fern.', 'definition', 3),
    fc(21, 'Homosporous vs heterosporous?', 'One kind of spore (Dryopteris) vs microspores and megaspores (Selaginella).', 'concept', 3),
    fc(22, 'Why is heterospory important?', 'It is a step towards the seed habit.', 'concept', 3),
    fc(23, 'Spores from one fern sporangium of 16 mother cells?', '64 (each mother cell gives four).', 'formula', 3),
    fc(24, 'Biofertiliser pteridophyte?', 'Azolla, with Anabaena, in paddy fields.', 'fact', 3),
    fc(25, 'What does gymnosperm mean?', 'Naked seed: ovules are not enclosed in an ovary.', 'definition', 4),
    fc(26, 'Roots of Pinus and Cycas?', 'Mycorrhiza in Pinus; coralloid roots with cyanobacteria in Cycas.', 'fact', 4),
    fc(27, 'How many megaspores of a Pinus ovule survive?', 'One of the four.', 'fact', 4),
    fc(28, 'Why is water not needed in gymnosperm fertilisation?', 'A pollen tube carries the male gametes to the egg.', 'concept', 4),
    fc(29, 'Gymnosperm vs pteridophyte: seeds and gametophyte?', 'Seeds present and gametophyte reduced vs no seeds and free-living gametophyte.', 'concept', 4),
    fc(30, 'Products from gymnosperms?', 'Timber, resin, sago, ephedrine and taxol.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
