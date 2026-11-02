// ch03 notes and flashcards.
import { T, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { SAC } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Plant Kingdom — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Algae, bryophytes and pteridophytes',
      `**Classification of plants.** Early **artificial** systems used a few gross characters (habit, colour, number and shape of leaves; structure of the androecium). **Natural** systems use natural affinities, including internal features such as ultrastructure, anatomy, embryology and phytochemistry. **Phylogenetic** systems use evolutionary relationships. Numerical taxonomy (many characters, computers), cytotaxonomy (chromosome number, structure, behaviour) and chemotaxonomy (chemical constituents) are modern aids. The plant kingdom is divided into five groups: algae, bryophytes, pteridophytes, gymnosperms and angiosperms.

**Algae** are chlorophyll-bearing, simple, thalloid, autotrophic and largely aquatic organisms (fresh water, brackish water, sea water, moist stones, soil and wood). The body may be unicellular (*Chlamydomonas*), colonial (*Volvox*), filamentous (*Ulothrix*, *Spirogyra*) or massive (kelps). **Vegetative** reproduction is by fragmentation; **asexual** reproduction by flagellated **zoospores**; **sexual** reproduction by fusion of gametes, which may be isogamous (similar, flagellated or non-flagellated gametes), anisogamous (dissimilar in size) or oogamous (a large non-motile female gamete and a smaller motile male gamete). Algae fix about half of the total carbon dioxide fixed by photosynthesis on Earth and increase the dissolved oxygen of their habitat. Many marine forms (*Porphyra*, *Laminaria*, *Sargassum*) are eaten; **agar** (from *Gelidium* and *Gracilaria*) and **algin** and **carrageen** are used commercially; *Chlorella* and *Spirulina* are protein-rich food supplements.

| Class | Pigments | Stored food | Cell wall | Flagella of motile cells | Examples |
|---|---|---|---|---|---|
| **Chlorophyceae** (green) | chlorophyll a, b | starch (in pyrenoids) | cellulose | 2–8, equal, apical | *Chlamydomonas*, *Volvox*, *Ulothrix*, *Spirogyra*, *Chara* |
| **Phaeophyceae** (brown) | chlorophyll a, c, fucoxanthin | laminarin, mannitol | cellulose with algin | 2, unequal, lateral | *Ectocarpus*, *Dictyota*, *Laminaria*, *Sargassum*, *Fucus* |
| **Rhodophyceae** (red) | chlorophyll a, d, r-phycoerythrin | floridean starch | cellulose, pectin, polysulphate esters | absent | *Polysiphonia*, *Porphyra*, *Gracilaria*, *Gelidium* |

Brown algae show the greatest variety of body form, from filaments to large kelps with a **holdfast**, **stipe** and **frond**. Red algae are mostly marine, found in warmer areas and at great depths where little light penetrates; they reproduce by non-motile spores and sexually by oogamy. (Habitat wording and pigment lists follow the NCERT table; some references add further minor pigments.)

**Bryophytes** are the amphibians of the plant kingdom: they live in soil but depend on **water for sexual reproduction**, in damp, humid, shaded places. The plant body is a thallus-like or leafy **gametophyte** (haploid, dominant), attached by unicellular or multicellular **rhizoids**; there are no true roots, stems or leaves. The sex organs are the **antheridium** (producing biflagellate antherozoids) and the flask-shaped **archegonium** (one egg). The antherozoids swim in water to the archegonium and the zygote grows into a **sporophyte** of **foot, seta and capsule**, which is not free-living but depends on the gametophyte; meiosis in the capsule makes haploid spores. **Liverworts** (*Marchantia*) have a flat, dorsiventral thallus, reproduce vegetatively by fragmentation and by **gemmae** in gemma cups. **Mosses** (*Funaria*, *Polytrichum*, *Sphagnum*) have a creeping green **protonema** stage that develops from a spore and an upright, leafy stage, with multicellular branched rhizoids; vegetative reproduction is by fragmentation and budding in the secondary protonema. *Sphagnum* gives **peat** (fuel) and, because it holds water, packing material for living plants; mosses with lichens colonise rocks and prevent soil erosion.

**Pteridophytes** (ferns, horsetails, club mosses) are the first terrestrial plants with **vascular tissue** (xylem and phloem). They grow in cool, damp, shady places. The main plant body is the **sporophyte** with true root, stem and leaves; leaves are small (**microphylls**, *Selaginella*) or large (**macrophylls**, ferns). Sporangia are borne on **sporophylls**, sometimes in cones (**strobili**: *Selaginella*, *Equisetum*). Meiosis of spore mother cells makes spores, which germinate into a small, multicellular, free-living, mostly photosynthetic **prothallus** (gametophyte) bearing antheridia and archegonia. Water is needed for the antherozoids to reach the egg, which limits their spread. The zygote grows into the dominant sporophyte. Most are **homosporous**; *Selaginella* and *Salvinia* are **heterosporous** (macrospores and microspores), and the female gametophyte is retained on the parent sporophyte, where the zygote begins to develop — a precursor of the **seed habit**. Classes: Psilopsida (*Psilotum*), Lycopsida (*Selaginella*, *Lycopodium*), Sphenopsida (*Equisetum*), Pteropsida (*Dryopteris*, *Pteris*, *Adiantum*).

**Alternation of generations.** Sexual reproduction in plants involves a haploid **gametophyte** that makes gametes and a diploid **sporophyte** that makes spores by meiosis. In the **haplontic** pattern the dominant, free-living body is the haploid gametophyte and the sporophyte is only the one-celled zygote, which divides by meiosis (*Volvox*, *Spirogyra*, some *Chlamydomonas*). In the **diplontic** pattern the diploid sporophyte is dominant and the gametophyte is a few cells (all gymnosperms and angiosperms; the alga *Fucus*). In the **haplo-diplontic** pattern both phases are multicellular and free-living (bryophytes, where the gametophyte dominates; pteridophytes, where the sporophyte dominates; some algae such as *Ectocarpus*, *Polysiphonia* and kelps).

*Counting rule used in questions:* one diploid spore mother cell gives four haploid spores by meiosis.`,
      [kt('Gemmae', 'Green, multicellular asexual buds of liverworts, formed in gemma cups on the thallus.'), kt('Protonema', 'The creeping, green, filamentous first stage of a moss gametophyte that grows from a spore.'), kt('Prothallus', 'The small, free-living gametophyte of a pteridophyte.'), kt('Heterosporous', 'Producing two kinds of spores, large megaspores and small microspores (Selaginella, Salvinia).'), kt('Haplontic', 'Life cycle with a dominant haploid gametophyte; only the zygote is diploid.')],
      V.algae,
      [1],
      [V.brown, V.moss, V.fern, V.cycles],
    ),
    sec(
      '2. Gymnosperms and angiosperms',
      `**Gymnosperms** (*gymnos*, naked; *sperma*, seed) have **ovules that are not enclosed by an ovary wall**, so the seeds are naked after fertilisation. They include medium-sized or tall trees and shrubs; the giant redwood *Sequoia* is among the tallest trees. The roots are **tap roots**; in *Pinus* roots have a fungal association (**mycorrhiza**), and in *Cycas* small **coralloid roots** associate with nitrogen-fixing cyanobacteria. Stems are unbranched (*Cycas*) or branched (*Pinus*, *Cedrus*). Leaves are simple or compound: the pinnate leaves of *Cycas* last for a few years, and in conifers needle-like leaves, a thick cuticle and sunken stomata reduce water loss.

Gymnosperms are **heterosporous**. Microspores and megaspores are produced in sporangia borne on sporophylls arranged spirally on an axis to form **cones (strobili)**. The **male (microsporangiate) cone** bears microsporophylls and microsporangia; the microspores develop into a very reduced male gametophyte, the **pollen grain**. The **female (macrosporangiate) cone** bears megasporophylls with **ovules**; the nucellus is protected by envelopes, and the whole is the ovule. One cell of the nucellus becomes the **megaspore mother cell**, which divides by meiosis into four megaspores; one develops into the multicellular female gametophyte with two or more **archegonia**. Male and female cones may be on the same tree (*Pinus*) or on different trees (*Cycas*). Unlike bryophytes and pteridophytes, the gametophytes of gymnosperms are **not free-living**; they stay within the sporangia on the sporophyte. Pollen is carried by air currents to the ovule opening, and a **pollen tube** carries the male gametes to the archegonia. After fertilisation the zygote becomes an embryo and the ovule a **seed**, which is not covered.

**Angiosperms** are flowering plants. Pollen grains and ovules develop in the **flower**, and seeds are **enclosed in fruits**. They range from the minute *Wolffia* to *Eucalyptus* trees over 100 metres tall, and provide food, fodder, fuel, medicines and many commercial products. There are two classes: **dicotyledons** (two cotyledons in the seed, reticulate venation, tetramerous or pentamerous flowers) and **monocotyledons** (one cotyledon, parallel venation, trimerous flowers). The male organ is the **stamen** (filament and anther, with pollen grains); the female organ is the **pistil** or carpel (stigma, style, ovary with ovules). The female gametophyte is the **embryo sac**: **${SAC.cells} cells and ${SAC.nuclei} nuclei** — an egg apparatus (one egg and two synergids) at the micropylar end, three antipodal cells at the other end, and a large central cell with two polar nuclei. The male gametophyte is the pollen grain, which germinates on the stigma into a pollen tube that carries two male gametes into the embryo sac.

**Double fertilisation.** One male gamete fuses with the egg (**syngamy**) to form the diploid **zygote**; the other fuses with the two polar nuclei (**triple fusion**) to form the triploid **primary endosperm nucleus (PEN)**. Because two fusions occur in one embryo sac, this is called double fertilisation, an event unique to flowering plants. The zygote develops into the embryo and the PEN into the endosperm; the ovules become seeds and the ovary becomes the fruit. Angiosperms are **diplontic**: the sporophyte is dominant.

**Comparison.** Gymnosperms: naked seeds, no flowers or fruits, no embryo sac. Angiosperms: flowers, fruits, embryo sac, double fertilisation and triploid endosperm. Both have a dominant sporophyte, are heterosporous and do not need free water for fertilisation because a pollen tube carries the male gametes.`,
      [kt('Coralloid roots', 'Small, specialised roots of Cycas associated with nitrogen-fixing cyanobacteria.'), kt('Strobilus (cone)', 'A compact or lax axis bearing sporophylls; male cones bear microsporophylls, female cones megasporophylls.'), kt('Embryo sac', 'The female gametophyte of angiosperms: 7 cells, 8 nuclei.'), kt('Double fertilisation', 'Syngamy (male gamete with egg) plus triple fusion (male gamete with two polar nuclei); unique to angiosperms.'), kt('Primary endosperm nucleus', 'Triploid nucleus formed by triple fusion; it grows into the endosperm.')],
      V.flower,
      [2],
      [V.cycas, V.sac, V.groups],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving chlorophyll b to brown or red algae (only green algae have it; brown have fucoxanthin, red have phycoerythrin).
- Calling the moss plant a sporophyte (the green leafy plant is the gametophyte; the sporophyte is the capsule on a seta).
- Saying pteridophytes have seeds, or that bryophytes have xylem and phloem.
- Confusing homosporous with heterosporous, or calling Cycas coralloid roots "nodules of bacteria" (the partners are cyanobacteria).
- Describing the endosperm of angiosperms as diploid (it is triploid).
- Writing that gymnosperms have fruits or flowers.

**How marks are usually awarded**
- 1-mark items: a pigment or stored food; a class of algae; a part of the moss or fern; which generation dominates.
- 2–3-mark answers: three classes of algae; features of bryophytes or pteridophytes; haplontic versus diplontic; gymnosperm features; dicot versus monocot; double fertilisation.
- 5-mark answers: algae classes with examples; life cycle of a bryophyte or pteridophyte; gymnosperms versus angiosperms; embryo sac and double fertilisation.
- Counting items: spores from mother cells, chromosome numbers in zygote and PEN, male gametes needed — show the working.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Name the five groups of the plant kingdom.', 'Algae, bryophytes, pteridophytes, gymnosperms, angiosperms.', 'fact', 1),
    fc(2, 'What basis does a phylogenetic system use?', 'Evolutionary relationships among organisms.', 'definition', 1),
    fc(3, 'Pigments of green algae?', 'Chlorophyll a and b.', 'fact', 1),
    fc(4, 'Pigments of brown algae?', 'Chlorophyll a, c and fucoxanthin.', 'fact', 1),
    fc(5, 'Pigment that makes red algae red?', 'r-phycoerythrin.', 'fact', 1),
    fc(6, 'Stored food of green, brown and red algae?', 'Starch; laminarin and mannitol; floridean starch.', 'fact', 1),
    fc(7, 'Three parts of a large brown alga?', 'Holdfast, stipe and frond.', 'fact', 1),
    fc(8, 'Commercial products from algae?', 'Agar (red algae), algin (brown algae), carrageen; Chlorella and Spirulina as food supplements.', 'fact', 1),
    fc(9, 'Three kinds of sexual reproduction in algae?', 'Isogamous, anisogamous, oogamous.', 'concept', 1),
    fc(10, 'Why are bryophytes called amphibians of the plant kingdom?', 'They live on land but need water for fertilisation.', 'concept', 1),
    fc(11, 'Dominant generation of a bryophyte?', 'The haploid gametophyte.', 'fact', 1),
    fc(12, 'Parts of a bryophyte sporophyte?', 'Foot, seta and capsule.', 'fact', 1),
    fc(13, 'What are gemmae?', 'Green multicellular asexual buds formed in gemma cups of liverworts.', 'definition', 1),
    fc(14, 'Two stages of a moss gametophyte?', 'Protonema stage, then the leafy stage.', 'fact', 1),
    fc(15, 'Uses of Sphagnum?', 'Peat as fuel; packing material for living plants (holds water).', 'fact', 1),
    fc(16, 'Why are pteridophytes the first vascular plants?', 'They are the first terrestrial plants to have xylem and phloem.', 'concept', 1),
    fc(17, 'Gametophyte of a pteridophyte?', 'Prothallus: small, free-living, photosynthetic.', 'definition', 1),
    fc(18, 'Homosporous versus heterosporous?', 'One kind of spore; two kinds (macrospores and microspores), as in Selaginella and Salvinia.', 'concept', 1),
    fc(19, 'Four classes of pteridophytes with an example each?', 'Psilopsida (Psilotum), Lycopsida (Selaginella), Sphenopsida (Equisetum), Pteropsida (Dryopteris).', 'fact', 1),
    fc(20, 'Haplontic life cycle?', 'Dominant haploid gametophyte; the zygote is the only diploid cell; e.g. Spirogyra.', 'concept', 1),
    fc(21, 'Diplontic life cycle?', 'Dominant diploid sporophyte; gametophyte of a few cells; e.g. gymnosperms, angiosperms, Fucus.', 'concept', 1),
    fc(22, 'Haplo-diplontic life cycle?', 'Both phases multicellular and free-living; bryophytes, pteridophytes, kelps.', 'concept', 1),
    fc(23, 'How many spores from one spore mother cell?', 'Four haploid spores by meiosis.', 'formula', 1),
    fc(24, 'What does gymnosperm mean?', 'Naked seed: ovules are not enclosed by an ovary wall.', 'definition', 2),
    fc(25, 'Cycas roots with cyanobacteria?', 'Coralloid roots (nitrogen fixation); Pinus has mycorrhiza.', 'fact', 2),
    fc(26, 'Adaptations of conifer leaves?', 'Needle shape, thick cuticle, sunken stomata: less water loss.', 'concept', 2),
    fc(27, 'Pollen grain of a gymnosperm?', 'The very reduced male gametophyte, formed from a microspore.', 'definition', 2),
    fc(28, 'Dicot versus monocot?', 'Two versus one cotyledon; reticulate versus parallel venation; 4 or 5 versus 3 floral parts.', 'concept', 2),
    fc(29, 'Embryo sac contents?', '7 cells, 8 nuclei: egg and 2 synergids, 3 antipodals, central cell with 2 polar nuclei.', 'fact', 2),
    fc(30, 'Double fertilisation?', 'Syngamy (zygote) plus triple fusion (primary endosperm nucleus, triploid); unique to angiosperms.', 'concept', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
