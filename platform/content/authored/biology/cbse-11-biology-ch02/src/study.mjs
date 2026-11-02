// ch02 notes and flashcards.
import { T, table, unit, PROV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';
import { KINGDOMS, YEAR } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Biological Classification — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The five-kingdom classification',
      `Early classification placed every organism in one of two kingdoms, **Plantae** or **Animalia** (Linnaeus). That scheme did not distinguish between **eukaryotes and prokaryotes**, **unicellular and multicellular** organisms, or **photosynthetic (green) and non-photosynthetic (non-green)** organisms; bacteria and fungi were counted with plants, and organisms such as *Euglena* did not fit either kingdom.

In **${YEAR.whittaker}** **R. H. Whittaker** proposed a **five-kingdom classification**: **Monera, Protista, Fungi, Plantae and Animalia**. The criteria were **cell structure, body organisation, mode of nutrition, reproduction and phylogenetic relationships**.

| Kingdom | Cell type | Cell wall | Body organisation | Nutrition |
|---|---|---|---|---|
${KINGDOMS.map((k) => `| ${k.name} | ${k.cell} | ${k.wall} | ${k.body} | ${k.nutrition} |`).join('\n')}

Only **Monera** are prokaryotic, so only they lack a nuclear membrane. **Protista** are unicellular eukaryotes. **Fungi**, **Plantae** and **Animalia** are multicellular (Fungi with loose tissue), and differ in how they obtain food: fungi absorb it, plants make it by photosynthesis, and animals ingest it. **Plantae** have cellulose cell walls, chloroplasts and autotrophic nutrition (a few are insectivorous or parasitic, such as *Cuscuta*) and show alternation of generations. **Animalia** are heterotrophic (holozoic), lack cell walls and usually show sexual reproduction with embryonic development. (Plant and animal kingdoms are studied in detail in later chapters; the five-kingdom scheme shown here keeps viruses and viroids outside it.)`,
      [kt('Kingdom', 'The highest category in the five-kingdom scheme.'), kt('Whittaker', 'R. H. Whittaker, who proposed the five-kingdom classification in 1969.'), kt('Prokaryote', 'An organism whose cells have no nuclear membrane and no membrane-bound organelles.'), kt('Autotroph', 'An organism that makes its own food.'), kt('Heterotroph', 'An organism that depends on other organisms for food.')],
      V.fivek,
      [1],
    ),
    sec(
      '2. Monera, Protista and Fungi',
      `**Kingdom Monera.** Bacteria are the sole members of Monera. They are the most abundant micro-organisms and occur in almost every habitat. **Shapes:** spherical **coccus**, rod-shaped **bacillus**, comma-shaped **vibrio** and spiral **spirillum**. Nutrition may be **autotrophic** (photosynthetic or chemosynthetic) or **heterotrophic** (saprophytic or parasitic). Bacteria reproduce mainly by **fission**; under unfavourable conditions some form spores, and a primitive form of sexual reproduction transfers DNA from one bacterium to another.
- **Archaebacteria** have a different cell-wall structure and live in harsh habitats: **halophiles** (very salty areas), **thermoacidophiles** (hot springs) and **methanogens** (marshy areas and the guts of ruminants such as cows, where they produce methane, the basis of biogas from dung).
- **Eubacteria** (true bacteria) have a rigid cell wall and a flagellum if motile. **Cyanobacteria** (blue-green algae) are photosynthetic autotrophs, unicellular, colonial or filamentous; *Nostoc* and *Anabaena* fix atmospheric nitrogen in specialised cells called **heterocysts**. **Chemosynthetic autotrophs** oxidise inorganic substances (nitrates, nitrites, ammonia) for energy and recycle nitrogen, phosphorus, iron and sulphur. **Heterotrophic bacteria** are the most abundant and mostly decomposers; they make curd, provide antibiotics and fix nitrogen in legume roots, but some cause **cholera, typhoid, tetanus** and **citrus canker**.
- **Mycoplasma** completely lack a cell wall, are the smallest living cells known, can live without oxygen and are pathogenic in animals and plants.

**Kingdom Protista.** All single-celled eukaryotes are protists; the boundary with other kingdoms is not well defined, and they form a link between monera, plants, animals and fungi.
- **Chrysophytes:** diatoms and golden algae; diatom cell walls of **silica** are in two overlapping halves and indestructible, leaving **diatomaceous earth**; chief producers in the oceans.
- **Dinoflagellates:** mostly marine and photosynthetic, with two flagella; rapid multiplication of species such as *Gonyaulax* causes **red tides** that can kill fish.
- **Euglenoids:** mostly freshwater; no cell wall but a protein-rich **pellicle**; photosynthetic in light and heterotrophic when deprived of light.
- **Slime moulds:** saprophytic; form a **plasmodium** and fruiting bodies with resistant spores dispersed by air.
- **Protozoans:** heterotrophs (predators or parasites): **amoeboid** (*Amoeba*, pseudopodia; *Entamoeba* parasitic), **flagellated** (*Trypanosoma*, sleeping sickness), **ciliated** (*Paramecium*) and **sporozoans** (*Plasmodium*, malaria).

**Kingdom Fungi.** Fungi are **heterotrophic**: **saprophytes** (dead matter), **parasites** (living hosts) or **symbionts** (lichens and mycorrhiza). The body is made of **hyphae**, whose network is the **mycelium**; hyphae may be **coenocytic** (aseptate, many nuclei) or **septate**. Cell walls are **chitin** and polysaccharides. **Reproduction:** vegetative (fragmentation, fission, budding); asexual (conidia, sporangiospores, zoospores); sexual (oospores, ascospores, basidiospores) through **plasmogamy**, an optional **dikaryon** stage (n + n) in Ascomycetes and Basidiomycetes, **karyogamy** and **meiosis**.
- **Phycomycetes:** aseptate coenocytic mycelium; zoospores or aplanospores; zygospore; *Mucor*, *Rhizopus*, *Albugo*.
- **Ascomycetes (sac fungi):** septate; conidia; ascospores in **asci**; *Penicillium*, *Aspergillus*, *Claviceps*, *Neurospora*; yeast is unicellular; morels and truffles are edible.
- **Basidiomycetes:** mushrooms, bracket fungi, puffballs, rusts and smuts; septate; no asexual spores; four **basidiospores** on a **basidium**; *Agaricus*, *Ustilago*, *Puccinia*.
- **Deuteromycetes (imperfect fungi):** only the asexual (conidial) phase is known; *Alternaria*, *Colletotrichum*, *Trichoderma*.`,
      [kt('Archaebacteria', 'Bacteria of harsh habitats with a different cell-wall structure: halophiles, thermoacidophiles and methanogens.'), kt('Heterocyst', 'A specialised cell of some cyanobacteria in which nitrogen is fixed.'), kt('Mycoplasma', 'Bacteria with no cell wall; the smallest living cells known.'), kt('Hypha', 'A thread-like structure of which the body of a fungus is made.'), kt('Mycelium', 'The network of hyphae of a fungus.'), kt('Dikaryon', 'A cell with two genetically different haploid nuclei, formed after plasmogamy.')],
      V.bact,
      [2],
      [V.protist, V.hyphae],
    ),
    sec(
      '3. Lichens, viruses and viroids',
      `**Lichens** are **symbiotic associations** between an **alga** (the **phycobiont**) and a **fungus** (the **mycobiont**). The alga prepares food by photosynthesis; the fungus provides shelter, absorbs water and minerals and protects the alga. Lichens are very sensitive to **air pollution** and do not grow in polluted areas, so they are used as **pollution indicators**.

**Viruses** were not included in the Whittaker scheme because they are not truly cellular. The name means venom or poisonous fluid. Milestones: **D. J. Ivanowsky (${YEAR.ivanowsky})** found that the sap of diseased tobacco plants could still infect healthy plants after passing through a filter that stops bacteria; **M. W. Beijerinck (${YEAR.beijerinck})** showed that the infectious fluid could multiply in the host and called it *contagium vivum fluidum* (living infectious fluid); **W. M. Stanley (${YEAR.stanley})** crystallised the virus and found the crystals largely protein. Viruses are **nucleoproteins**: a **protein coat (capsid)** made of subunits (**capsomeres**) surrounds the genetic material, which is **RNA or DNA** (never both). They are inert outside the host and **replicate only inside a living host cell**, taking over its machinery. Most plant viruses have single-stranded RNA; animal viruses may have single- or double-stranded RNA or DNA; **bacteriophages** (viruses that attack bacteria) have double-stranded DNA. Diseases: mumps, smallpox, herpes, influenza and AIDS in humans; mosaic formation, leaf rolling and curling, yellowing and vein clearing, dwarfing and stunted growth in plants.

**Viroids** were discovered by **T. O. Diener (${YEAR.diener})** as the cause of **potato spindle tuber disease**. A viroid is **free RNA of low molecular weight** and has **no protein coat**; it is smaller than a virus. (Whether viruses are living is debated: they have genetic material and evolve, but show life only inside a host.)`,
      [kt('Lichen', 'A symbiotic association of an alga and a fungus.'), kt('Phycobiont', 'The algal partner of a lichen.'), kt('Mycobiont', 'The fungal partner of a lichen.'), kt('Capsid', 'The protein coat of a virus, made of capsomeres.'), kt('Bacteriophage', 'A virus that infects bacteria; it has double-stranded DNA.'), kt('Viroid', 'An infectious agent made only of free low-molecular-weight RNA, with no protein coat.')],
      V.lichen,
      [3],
      [V.virus],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Giving the year of the five-kingdom scheme wrongly or crediting it to Linnaeus (Whittaker proposed it in 1969).
- Placing bacteria in the plant kingdom; Monera are prokaryotes.
- Mixing up archaebacteria (halophiles, thermoacidophiles, methanogens) and eubacteria (cyanobacteria and others).
- Saying that cyanobacteria fix nitrogen everywhere; only in heterocysts (as in Nostoc and Anabaena).
- Confusing coenocytic hyphae (no septa) with septate hyphae, or plasmogamy with karyogamy.
- Writing that the dikaryon is diploid; each nucleus is still haploid (n + n).
- Giving the wrong number of basidiospores (four per basidium) or placing yeast outside the Ascomycetes.
- Saying viruses have both DNA and RNA, or that viroids have a protein coat.

**How marks are usually awarded**
- 1-mark items: kingdom of an organism, an example, a scientist and year, a spore type, a heterocyst, a viroid fact; assertion-reason on classification.
- 2–3-mark answers: why the two-kingdom system failed; archaebacteria with examples; features of a protist group; plasmogamy, dikaryon and karyogamy; lichens; viruses versus viroids.
- 5-mark answers: the five kingdoms compared; Monera with groups and importance; the four classes of fungi; viruses and viroids with discovery.
- Case-based items: surveys with percentages, bacterial growth, spore counts, lichen cover, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Who proposed the five-kingdom classification, and when?', `R. H. Whittaker, in ${YEAR.whittaker}.`, 'fact', 1),
    fc(2, 'Name the five kingdoms.', 'Monera, Protista, Fungi, Plantae, Animalia.', 'fact', 1),
    fc(3, 'Why did the two-kingdom system fail?', 'It did not separate prokaryotes from eukaryotes, unicellular from multicellular, or photosynthetic from non-photosynthetic organisms.', 'concept', 1),
    fc(4, 'Criteria used by Whittaker?', 'Cell structure, body organisation, mode of nutrition, reproduction, phylogenetic relationships.', 'fact', 1),
    fc(5, 'Which kingdom is prokaryotic?', 'Monera.', 'fact', 1),
    fc(6, 'Cell wall of fungi, plants and animals?', 'Fungi chitin; plants cellulose; animals none.', 'fact', 1),
    fc(7, 'Four shapes of bacteria?', 'Coccus, bacillus, vibrio, spirillum.', 'fact', 2),
    fc(8, 'Three groups of archaebacteria?', 'Halophiles, thermoacidophiles, methanogens.', 'fact', 2),
    fc(9, 'Where do methanogens live?', 'Marshy areas and the guts of ruminants; they produce methane (biogas).', 'fact', 2),
    fc(10, 'What are heterocysts?', 'Specialised cells of Nostoc and Anabaena in which nitrogen is fixed.', 'concept', 2),
    fc(11, 'Chemosynthetic autotrophic bacteria?', 'Oxidise inorganic substances such as nitrites and ammonia for energy.', 'concept', 2),
    fc(12, 'Name two diseases caused by bacteria in humans.', 'Cholera, typhoid, tetanus (any two).', 'fact', 2),
    fc(13, 'What is special about mycoplasma?', 'No cell wall; smallest living cells; live without oxygen.', 'fact', 2),
    fc(14, 'How do bacteria reproduce?', 'Mainly by fission.', 'fact', 2),
    fc(15, 'What are diatoms?', 'Chrysophytes with silica walls of two halves; leave diatomaceous earth.', 'concept', 2),
    fc(16, 'What causes red tides?', 'Rapid multiplication of dinoflagellates such as Gonyaulax.', 'concept', 2),
    fc(17, 'Why is Euglena special?', 'Photosynthetic in light, heterotrophic without light; no cell wall, protein-rich pellicle.', 'concept', 2),
    fc(18, 'Four kinds of protozoans with examples?', 'Amoeboid Amoeba; flagellated Trypanosoma; ciliated Paramecium; sporozoan Plasmodium.', 'fact', 2),
    fc(19, 'What is the mycelium?', 'The network of hyphae.', 'definition', 2),
    fc(20, 'Coenocytic versus septate hyphae?', 'Coenocytic: no cross walls, many nuclei; septate: cross walls.', 'concept', 2),
    fc(21, 'Plasmogamy and karyogamy?', 'Fusion of cytoplasm; fusion of two nuclei.', 'definition', 2),
    fc(22, 'What is a dikaryon?', 'A cell with two haploid nuclei (n + n) between plasmogamy and karyogamy.', 'concept', 2),
    fc(23, 'Four classes of fungi?', 'Phycomycetes, Ascomycetes, Basidiomycetes, Deuteromycetes.', 'fact', 2),
    fc(24, 'Spores of Ascomycetes and Basidiomycetes?', 'Ascospores in asci; basidiospores (four) on a basidium.', 'fact', 2),
    fc(25, 'Why are Deuteromycetes called imperfect fungi?', 'Only their asexual phase is known.', 'concept', 2),
    fc(26, 'What is a lichen?', 'A symbiotic association of an alga (phycobiont) and a fungus (mycobiont).', 'definition', 3),
    fc(27, 'Why are lichens pollution indicators?', 'They do not grow in polluted air.', 'concept', 3),
    fc(28, 'Who discovered viruses and when?', `D. J. Ivanowsky, ${YEAR.ivanowsky}; Beijerinck ${YEAR.beijerinck}; Stanley crystallised one in ${YEAR.stanley}.`, 'fact', 3),
    fc(29, 'Genetic material of viruses?', 'RNA or DNA, never both; bacteriophages have double-stranded DNA.', 'fact', 3),
    fc(30, 'What is a viroid?', `Free low-molecular-weight RNA with no protein coat (T. O. Diener, ${YEAR.diener}; potato spindle tuber disease).`, 'definition', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
