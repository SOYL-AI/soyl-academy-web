// ISC 11 Biology ch03 notes (one section per syllabus topic) and 30 flashcards.
import { T, table, unit, PROV } from '../../isc-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { PROTOZOA, CLASSES, YR, STAGE, SIZE } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Protista, Fungi, Lichens and Viruses — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Kingdom Protista',
      `Protista are **unicellular eukaryotes**, mostly aquatic. They form a link between prokaryotes and the other eukaryotic kingdoms.
- **Chrysophytes:** diatoms and golden algae; the cell wall is in two overlapping halves impregnated with **silica**, which survives as **diatomaceous earth**; photosynthetic (examples: diatoms, desmids).
- **Dinoflagellates:** cell wall of stiff **cellulose plates**, **two flagella** (one in a groove, one trailing); some (*Gonyaulax*) multiply rapidly and cause **red tides**.
- **Euglenoids:** no wall but a flexible protein-rich **pellicle**; **two flagella**; **photosynthetic in light and heterotrophic in the dark** (*Euglena*).
- **Slime moulds:** saprophytes that move over decaying matter forming a mass of cytoplasm, the **plasmodium**, which produces spore-bearing fruiting bodies (*Physarum*).
- **Protozoans** (heterotrophic, predators or parasites): **rhizopods** or amoeboid protozoans move by **pseudopodia** (*Amoeba*, *Entamoeba*); **flagellates** by **flagella** (*Trypanosoma*, *Giardia*); **ciliates** by **cilia** (*Paramecium*); **sporozoans** have **no locomotory organ** and an infective spore-like stage (*Plasmodium*).`,
      [
        kt('Pseudopodia', 'Temporary finger-like extensions of the body by which rhizopods creep and engulf food.'),
        kt('Pellicle', 'The flexible protein-rich layer that replaces the cell wall in euglenoids.'),
        kt('Plasmodium (slime mould)', 'The creeping multinucleate mass of cytoplasm of a slime mould.'),
        kt('Red tide', 'A reddening of sea water by rapid multiplication of dinoflagellates.'),
      ],
      table(['Group', 'Locomotion', 'Example'], PROTOZOA.map((x) => [x.g, x.move, x.eg]), 'Table of protozoan groups with locomotion and examples'),
      [1],
      [V.loco],
    ),
    sec(
      '2. Kingdom Fungi: general characteristics, spores and sexual reproduction',
      `Fungi are **heterotrophic eukaryotes** that absorb their food (saprophytes, parasites or symbionts). The body is a network of **hyphae** forming a **mycelium** (yeast is unicellular). Walls are of **chitin**; food is stored as **glycogen and oil**. Hyphae are **aseptate and coenocytic** (no cross walls, many nuclei) or **septate** (cross walls with pores).

Reproduction is vegetative (fragmentation, budding), **asexual** (sporangiospores, conidia) and **sexual** (zygospores, ascospores, basidiospores). Sexual union can be classified by the gametes: **isogamy** (gametes alike), **anisogamy** (gametes unequal in size) and **oogamy** (small motile male gamete and large non-motile egg).

Fusion occurs in stages: **plasmogamy** is the fusion of the cytoplasm of two cells; the nuclei stay separate in the **dikaryophase** (two haploid nuclei in one cell); **karyogamy** is the fusion of the two nuclei to form a diploid nucleus. With a haploid number of ${STAGE(4).plasmogamy.chromosomesEach}, the dikaryotic cell holds ${STAGE(4).dikaryophase.total} chromosomes in two nuclei and the nucleus after karyogamy holds ${STAGE(4).karyogamy.chromosomes}. **Life cycles of fungi are not required**; only these terms are.`,
      [
        kt('Mycelium', 'The network of hyphae that forms the body of a fungus.'),
        kt('Plasmogamy', 'Fusion of the cytoplasm of two cells.'),
        kt('Dikaryophase', 'The stage in which a cell contains two separate haploid nuclei.'),
        kt('Karyogamy', 'Fusion of the two haploid nuclei to form a diploid nucleus.'),
        kt('Isogamy, anisogamy, oogamy', 'Fusion of similar gametes, of unequal gametes, and of a small motile male with a large non-motile female gamete.'),
      ],
      V.hyphae,
      [2],
      [table(['Term', 'Meaning'], [['Plasmogamy', 'Cytoplasm fuses'], ['Dikaryophase', 'Two nuclei in one cell'], ['Karyogamy', 'Nuclei fuse']], 'Table of the three stages of fungal union')],
    ),
    sec(
      '3. Classes of fungi, uses, lichens and mycorrhiza',
      `| Class | Hyphae | Sexual spore | Asexual spore | Examples |
|---|---|---|---|---|
${CLASSES.map((x) => `| ${x.c} | ${x.hyphae} | ${x.sexual} | ${x.asexual} | ${x.eg} |`).join('\n')}

**Uses:** *Penicillium* gives the antibiotic **penicillin** (medicine); **yeast** ferments sugar to carbon dioxide and alcohol, so dough rises and bread is baked (bakery); saprophytic fungi **decompose** dead matter and return minerals to the soil.

**Lichens** are symbiotic associations of a fungus (**mycobiont**) and an alga or cyanobacterium (**phycobiont**): the alga photosynthesises and the fungus gives shelter, water and minerals. They are very slow-growing and sensitive to sulphur dioxide, so they are **pollution indicators**.

**Mycorrhiza** is an association between a fungus and plant roots: the fungus absorbs water and minerals (especially phosphorus) and the plant supplies sugars. In **ectomycorrhiza** (pine) the fungus forms a **sheath outside the root** and its hyphae lie between the cortical cells; in **endomycorrhiza** the hyphae **penetrate into the cortical cells** (vesicular-arbuscular mycorrhiza).`,
      [
        kt('Mycobiont and phycobiont', 'The fungal partner and the algal (or cyanobacterial) partner of a lichen.'),
        kt('Mycorrhiza', 'A symbiotic association of a fungus with the roots of a plant.'),
        kt('Ectomycorrhiza', 'A mycorrhiza in which the fungus forms a sheath around the root and its hyphae stay between cortical cells.'),
        kt('Endomycorrhiza', 'A mycorrhiza in which the fungal hyphae enter the cortical cells of the root.'),
      ],
      table(['Class', 'Sexual spore'], CLASSES.map((x) => [x.c, x.sexual]), 'Table of fungal classes and sexual spores'),
      [3],
      [V.lichen, table(['Type', 'Position of fungus'], [['Ectomycorrhiza', 'Sheath outside the root'], ['Endomycorrhiza', 'Inside the cortical cells']], 'Table of two kinds of mycorrhiza')],
    ),
    sec(
      '4. Viruses, viroids and prions',
      `**Viruses** link the living and the non-living: outside a host they are inert and can be crystallised, yet inside a host cell they multiply and mutate. A virus is a **nucleic acid** (DNA or RNA) in a **protein coat (capsid)** made of **capsomeres**.

**Discovery:** **D. J. Ivanowsky** (${YR.ivanowsky}) found that sap of diseased tobacco plants still infected healthy plants after passing through a filter that stops bacteria. **M. W. Beijerinck** (${YR.beijerinck}) called the agent **contagium vivum fluidum** (infectious living fluid). **W. M. Stanley** (${YR.stanley}) crystallised the virus and showed that it is mainly protein with RNA.

**Tobacco mosaic virus (TMV):** a straight helical rod about ${SIZE.tmvLength} nanometres long and ${SIZE.tmvWidth} nanometres wide, with a helical capsid of capsomeres around a single strand of **RNA**. **Bacteriophage:** a **hexagonal head** with **double-stranded DNA**, a **collar**, a **tail** with a **contractile sheath**, a **base plate** and **tail fibres**.

**Viroids** (T. O. Diener, ${YR.diener}): infectious **free RNA** of low molecular weight, with no protein coat (potato spindle tuber disease). **Prions:** infectious **abnormally folded proteins** with no nucleic acid, causing **BSE** (bovine spongiform encephalopathy) in cattle and **CJD** (Creutzfeldt-Jakob disease) in humans.`,
      [
        kt('Capsid', 'The protein coat of a virus, made of capsomeres.'),
        kt('Bacteriophage', 'A virus that infects bacteria.'),
        kt('Viroid', 'An infectious agent made only of a short free RNA molecule.'),
        kt('Prion', 'An infectious agent made only of an abnormally folded protein.'),
      ],
      V.tmv,
      [4],
      [V.phage, table(['Agent', 'Contains'], [['Virus', 'Nucleic acid in a protein coat'], ['Viroid', 'RNA only'], ['Prion', 'Protein only']], 'Table of viruses, viroids and prions')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving the wrong organ of locomotion for a protozoan group (sporozoans have none).
- Describing fungal life cycles; the syllabus asks only for the terms plasmogamy, karyogamy and dikaryophase.
- Confusing plasmogamy (cytoplasm fuses) with karyogamy (nuclei fuse).
- Placing a fungus in a class without using the hyphae and the sexual spore.
- Saying that mycorrhiza harms the plant; it is a partnership in which both gain.
- Writing that a prion contains DNA or RNA; it is protein only.

**How marks are usually awarded**
- 1-mark subparts: a term, an example, a scientist, a year, a count, an analogy or a give-a-reason.
- 2–3-mark questions: protist groups with locomotion; stages of fungal union; classes of fungi; ecto- against endomycorrhiza; viruses against viroids and prions.
- 5-mark questions in parts: protozoans and protists compared; fungal classes with uses; lichens and mycorrhiza; TMV and bacteriophage with labelled diagrams and the history of viruses.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What are protists?', 'Unicellular eukaryotes, mostly aquatic.', 'definition', 1),
    fc(2, 'Cell wall of diatoms?', 'Two halves impregnated with silica; forms diatomaceous earth.', 'fact', 1),
    fc(3, 'Two features of dinoflagellates?', 'Cellulose plates in the wall; two flagella (some cause red tides).', 'fact', 1),
    fc(4, 'What replaces the cell wall in Euglena?', 'A flexible protein-rich pellicle.', 'fact', 1),
    fc(5, 'Nutrition of Euglena?', 'Photosynthetic in light; heterotrophic in the dark.', 'concept', 1),
    fc(6, 'Slime mould: body and food?', 'Plasmodium; saprophytic.', 'fact', 1),
    fc(7, 'Locomotion of rhizopods?', 'Pseudopodia (Amoeba).', 'fact', 1),
    fc(8, 'Locomotion of flagellates?', 'Flagella (Trypanosoma).', 'fact', 1),
    fc(9, 'Locomotion of ciliates?', 'Cilia (Paramecium).', 'fact', 1),
    fc(10, 'Which protozoans have no locomotory organ?', 'Sporozoans (Plasmodium).', 'fact', 1),
    fc(11, 'Fungal cell wall and storage food?', 'Chitin; glycogen and oil.', 'fact', 2),
    fc(12, 'Fungal body?', 'Hyphae forming a mycelium.', 'definition', 2),
    fc(13, 'Aseptate hypha?', 'Coenocytic: no cross walls, many nuclei.', 'definition', 2),
    fc(14, 'Isogamy, anisogamy, oogamy?', 'Gametes alike; unequal in size; small motile male with large non-motile egg.', 'definition', 2),
    fc(15, 'Plasmogamy?', 'Fusion of the cytoplasm of two cells.', 'definition', 2),
    fc(16, 'Dikaryophase?', 'Two separate haploid nuclei in one cell.', 'definition', 2),
    fc(17, 'Karyogamy?', 'Fusion of the two nuclei to form a diploid nucleus.', 'definition', 2),
    fc(18, 'Zygomycetes: spore and examples?', 'Zygospore; Mucor, Rhizopus.', 'fact', 3),
    fc(19, 'Ascomycetes: spore and examples?', 'Ascospores in asci; Penicillium, Aspergillus, Neurospora, yeast.', 'fact', 3),
    fc(20, 'Basidiomycetes: spore and examples?', 'Basidiospores on a basidium; Agaricus, Ustilago, Puccinia.', 'fact', 3),
    fc(21, 'Deuteromycetes?', 'Sexual stage not known; Alternaria, Colletotrichum, Trichoderma.', 'fact', 3),
    fc(22, 'Fungus for penicillin, and for dough?', 'Penicillium; yeast.', 'fact', 3),
    fc(23, 'A lichen is?', 'Symbiosis of a fungus (mycobiont) and an alga or cyanobacterium (phycobiont).', 'definition', 3),
    fc(24, 'Ectomycorrhiza vs endomycorrhiza?', 'Sheath outside the root; hyphae inside cortical cells.', 'concept', 3),
    fc(25, 'Why are viruses a link between living and non-living?', 'Inert and crystallisable outside a host; multiply and mutate inside a host cell.', 'concept', 4),
    fc(26, 'Ivanowsky, Beijerinck, Stanley?', `${YR.ivanowsky} filterable agent; ${YR.beijerinck} contagium vivum fluidum; ${YR.stanley} crystallised the virus.`, 'fact', 4),
    fc(27, 'Structure of TMV?', 'Helical capsid of capsomeres around a single RNA strand.', 'concept', 4),
    fc(28, 'Parts of a bacteriophage?', 'Head with DNA, collar, tail sheath, base plate, tail fibres.', 'fact', 4),
    fc(29, 'What is a viroid?', `Free RNA with no protein coat (Diener, ${YR.diener}).`, 'definition', 4),
    fc(30, 'What is a prion?', 'An infectious abnormally folded protein; causes BSE and CJD.', 'definition', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
