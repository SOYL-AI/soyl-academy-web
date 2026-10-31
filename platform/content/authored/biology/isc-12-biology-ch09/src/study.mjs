// ISC 12 Biology ch09 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V, AGE_QUARTER } from './decks.mjs';
import { HALF_LIFE } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Evolution: Origin of Life and Evidences — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Theories of the origin of life',
      `**Abiogenesis (spontaneous generation):** living organisms arise from non-living matter (for example, maggots from rotting meat). **Louis Pasteur** disproved it for present-day conditions with **swan-neck flasks**: boiled broth in a flask with a curved neck stayed sterile because dust and microbes were trapped in the bend; when the neck was broken, microbes grew.

**Biogenesis:** life arises only from pre-existing life — true of life today.

**Panspermia (cosmozoic theory):** spores or other units of life reached Earth from outer space (supported by early thinkers such as Arrhenius). It does not explain how life began in the first place.

**Oparin–Haldane theory (chemical evolution).** **A. I. Oparin (1924)** and **J. B. S. Haldane (1929)** proposed that the first life arose from non-living organic molecules by a long series of chemical reactions. The early atmosphere was **reducing**: **methane (CH₄), ammonia (NH₃), hydrogen (H₂) and water vapour**, with **no free oxygen**. Energy from **lightning, UV radiation (no ozone layer)** and **volcanic heat** formed simple organic molecules — sugars, amino acids, nitrogen bases, fatty acids — which collected in the oceans as a **“hot dilute soup”** (Haldane). These combined into larger molecules (proteins, nucleic acids).

**Why a reducing atmosphere was essential:** free oxygen is highly reactive and would **oxidise and break down** organic molecules as soon as they formed; without it, organic molecules could **accumulate**. The lack of ozone also let **UV radiation** reach the surface as an energy source.

**Protobionts** are aggregates of abiotically produced molecules surrounded by a membrane-like boundary, maintaining an internal environment different from the surroundings. They are not living but show some properties of cells (growth, simple division, selective uptake). Two kinds: **coacervates** (Oparin) — colloidal droplets of proteins, polysaccharides and water that absorb substances from the surroundings; and **microspheres** (Sidney Fox) — protein-like droplets formed when amino acids are heated and then cooled in water. The first true cells (heterotrophic, anaerobic prokaryotes) probably arose about 3.5 billion years ago.`,
      [kt('Abiogenesis', 'Origin of living things from non-living matter.'), kt('Biogenesis', 'Origin of life only from pre-existing life.'), kt('Panspermia', 'Idea that life reached Earth from outer space.'), kt('Protobiont', 'Abiotic aggregate of organic molecules with a boundary; a precursor of cells.'), kt('Coacervate', 'Colloidal droplet of proteins and polysaccharides in water (Oparin).')],
      table(['Theory', 'Key idea'], [['Abiogenesis', 'Life from non-living matter'], ['Biogenesis', 'Life from life'], ['Panspermia', 'Life from space'], ['Chemical evolution', 'Life from organic molecules in a reducing atmosphere']], 'Table of theories of the origin of life'),
      [1],
    ),
    sec(
      '2. The Miller–Urey experiment',
      `In **1953**, **Stanley Miller**, working with **Harold Urey**, tested the Oparin–Haldane idea. A closed glass apparatus contained **methane, ammonia, hydrogen and water vapour**. Water was **boiled** in one flask to send vapour round the system; in a larger flask, **electrodes** produced **electric sparks** (representing lightning); a **condenser** cooled the gases (representing rain), and the liquid collected in a **U-shaped trap**. After about **one week**, the liquid contained **amino acids** such as **glycine, alanine and aspartic acid**. Later similar experiments produced sugars, nitrogen bases, pigments and fats.

**Conclusion:** the organic molecules of life can be formed **abiotically** from simple inorganic gases when energy is supplied in a **reducing** atmosphere, supporting **chemical evolution**.`,
      [kt('Miller–Urey experiment', 'Experiment (1953) producing amino acids from reducing gases with electric sparks.')],
      V.miller,
      [2],
    ),
    sec(
      '3. Morphological evidence',
      `**Homologous organs** have the **same basic structure and embryonic origin** but may perform **different functions**. Examples: **forelimbs** of human (grasping), cheetah (running), whale (swimming) and bat (flying), all with humerus, radius and ulna, carpals, metacarpals and phalanges; the **heart and brain** of vertebrates; in plants, the **thorn of Bougainvillea** and the **tendril of Cucurbita** (both modified stems). Homology shows **divergent evolution**: related organisms adapting to different needs.

**Analogous organs** perform the **same function** but differ in **structure and origin**. Examples: **wings of a butterfly and a bird**; **eye of an octopus and of a mammal**; **flippers of a penguin and a dolphin**; **sweet potato (modified root) and potato (modified stem)**. Analogy shows **convergent evolution**: unrelated organisms adapting to similar needs.

**Vestigial organs** are reduced and functionless (or nearly so) in an organism but functional in its ancestors or relatives. In humans: **vermiform appendix**, **nictitating membrane (plica semilunaris)**, **coccyx**, **muscles of the ear pinna**, **wisdom teeth**, body hair. They indicate **common descent**.`,
      [kt('Homologous organs', 'Same origin and plan, different functions; divergent evolution.'), kt('Analogous organs', 'Same function, different origin; convergent evolution.'), kt('Vestigial organs', 'Reduced remnants of organs functional in ancestors.')],
      V.limbs,
      [3],
    ),
    sec(
      '4. Embryological and palaeontological evidence',
      `**Embryology.** Embryos of all vertebrates are alike in early stages, with **gill slits (pharyngeal pouches)**, a **notochord** and a **post-anal tail**. **Ernst Haeckel** proposed the **recapitulation theory (biogenetic law)**: “**ontogeny recapitulates phylogeny**” — the development of an individual repeats the evolutionary history of its group. **Karl Ernst von Baer** showed that embryos resemble the **embryos**, not the **adults**, of other animals, so the theory is not accepted literally; embryonic similarity is still evidence of **common ancestry**.

**Palaeontology.** **Fossils** are remains or impressions of past organisms preserved in **sedimentary rocks**. Deeper strata are older and contain simpler forms; younger strata contain more complex forms. **Connecting links** show features of two groups: **Archaeopteryx** (feathers and wings like birds; teeth, clawed fingers and a long bony tail like reptiles) links **reptiles and birds**.

**Dating fossils.** In living organisms the ratio of radioactive **carbon-14** to carbon-12 stays constant; after death, carbon-14 decays with a **half-life of ${HALF_LIFE} years** and is not replaced. Age = number of half-lives × ${HALF_LIFE} years (for example, one quarter left → 2 half-lives → **${AGE_QUARTER} years**). Radiocarbon dating is useful up to about **50 000 years**; older rocks are dated by **uranium–lead** or **potassium–argon** methods.

**Geological time scale** (approximate, million years ago):
- **Precambrian (before 541):** bacteria, algae, soft-bodied invertebrates.
- **Palaeozoic (541–252):** invertebrates (Cambrian), fishes (Devonian, “age of fishes”), amphibians (Carboniferous); pteridophytes and seed ferns form coal forests.
- **Mesozoic (252–66):** “age of reptiles” (dinosaurs); gymnosperms dominant; first mammals and birds (Jurassic); first flowering plants (Cretaceous).
- **Cenozoic (66–present):** “age of mammals”; angiosperms dominant; humans evolve in the Quaternary.`,
      [kt('Recapitulation theory', 'Haeckel: ontogeny recapitulates phylogeny.'), kt('Connecting link', 'Organism with features of two groups, such as Archaeopteryx.'), kt('Half-life', 'Time for half the radioactive atoms to decay; carbon-14: 5730 years.')],
      V.carbon,
      [4],
    ),
    sec(
      '5. Biogeographical and molecular evidence; adaptive radiation',
      `**Biogeography.** The distribution of species reflects their history. Oceanic islands (such as the **Galapagos**) have **endemic** species, related to but different from mainland species. **Australia**, separated early, has many **marsupials** and few native placental mammals.

**Adaptive radiation** is the evolution of different forms from one ancestral form, radiating into different habitats or niches. Examples:
- **Darwin’s finches** (Galapagos): from a **seed-eating ancestor**, finches evolved with beaks for **seeds, insects, cactus flowers, grubs in bark** and **buds and fruits**.
- **Australian marsupials**: from one ancestral stock, marsupial wolf, mole, sugar glider, numbat, kangaroo, koala and others evolved. Many resemble **placental mammals** on other continents (Tasmanian wolf and wolf; marsupial mole and mole; sugar glider and flying squirrel) — **convergent evolution** between the two groups.

**Molecular evidence.** All organisms use **DNA** (or RNA) as genetic material, a **nearly universal genetic code**, **ATP** as energy currency and similar enzymes and pathways. The degree of similarity in **DNA sequences** and **proteins** (for example **cytochrome c**, haemoglobin) reflects relatedness: human and chimpanzee DNA are about **98–99 percent** similar.`,
      [kt('Adaptive radiation', 'Evolution of many forms from one ancestor into different niches.'), kt('Endemic', 'Found naturally in only one region.'), kt('Convergent evolution', 'Unrelated groups evolving similar features for similar ways of life.')],
      V.finches,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying Pasteur proved life arose from non-living matter (he disproved spontaneous generation).
- Including oxygen in the early atmosphere (it was reducing; free oxygen came later from photosynthesis).
- Calling coacervates living cells (they are non-living protobionts).
- Calling the wings of a bird and a bat analogous (as forelimbs they are homologous; as wings they are analogous — state which).
- Dating a dinosaur with carbon-14 (it is far too old; use uranium–lead).
- Writing that a quarter left means four half-lives (it means two).

**How marks are usually awarded**
- 1-mark subparts: a scientist, a gas, an example of an organ pair, a connecting link, a half-life.
- 2–3-mark questions: reducing atmosphere; protobionts vs coacervates; homologous vs analogous with examples; radiocarbon dating; adaptive radiation.
- 5-mark questions in parts: Miller–Urey with a labelled diagram; evidences of evolution; fossils and the geological time scale.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is abiogenesis?', 'Life arising from non-living matter.', 'definition', 1),
    fc(2, 'Who disproved spontaneous generation, and how?', 'Pasteur, with swan-neck flasks.', 'fact', 1),
    fc(3, 'What is panspermia?', 'Life reached Earth from outer space.', 'definition', 1),
    fc(4, 'Who proposed chemical evolution?', 'Oparin (1924) and Haldane (1929).', 'fact', 1),
    fc(5, 'Gases of the early atmosphere?', 'Methane, ammonia, hydrogen, water vapour; no free oxygen.', 'fact', 1),
    fc(6, 'Why was a reducing atmosphere needed?', 'Oxygen would have broken down organic molecules.', 'concept', 1),
    fc(7, 'Haldane’s name for the early ocean?', 'Hot dilute soup.', 'fact', 1),
    fc(8, 'What are coacervates?', 'Colloidal droplets of proteins and polysaccharides (Oparin).', 'definition', 1),
    fc(9, 'What are microspheres?', 'Protein-like droplets from heated amino acids (Fox).', 'definition', 1),
    fc(10, 'Year and scientists of the spark experiment?', '1953; Miller and Urey.', 'fact', 2),
    fc(11, 'What did the sparks represent?', 'Lightning.', 'concept', 2),
    fc(12, 'Products found in the Miller–Urey trap?', 'Amino acids such as glycine and alanine.', 'fact', 2),
    fc(13, 'Homologous organs?', 'Same origin, different function; divergent evolution.', 'definition', 3),
    fc(14, 'Two plant homologous organs?', 'Bougainvillea thorn and Cucurbita tendril.', 'exam-tip', 3),
    fc(15, 'Analogous organs?', 'Same function, different origin; convergent evolution.', 'definition', 3),
    fc(16, 'A plant analogous pair?', 'Sweet potato (root) and potato (stem).', 'exam-tip', 3),
    fc(17, 'Three human vestigial organs?', 'Appendix, coccyx, nictitating membrane.', 'fact', 3),
    fc(18, 'Haeckel’s theory in four words?', 'Ontogeny recapitulates phylogeny.', 'fact', 4),
    fc(19, 'Who corrected Haeckel?', 'Von Baer: embryos resemble embryos, not adults.', 'fact', 4),
    fc(20, 'Connecting link between reptiles and birds?', 'Archaeopteryx.', 'fact', 4),
    fc(21, 'Half-life of carbon-14?', `${HALF_LIFE} years.`, 'fact', 4),
    fc(22, 'One quarter of carbon-14 left: age?', `Two half-lives: ${AGE_QUARTER} years.`, 'exam-tip', 4),
    fc(23, 'Upper limit of radiocarbon dating?', 'About 50 000 years.', 'fact', 4),
    fc(24, 'Age of reptiles?', 'Mesozoic era.', 'fact', 4),
    fc(25, 'Age of mammals?', 'Cenozoic era.', 'fact', 4),
    fc(26, 'What is adaptive radiation?', 'Many forms evolving from one ancestor into different niches.', 'definition', 5),
    fc(27, 'Ancestor of Darwin’s finches?', 'A seed-eating finch from the mainland.', 'fact', 5),
    fc(28, 'Marsupial counterpart of the flying squirrel?', 'Sugar glider.', 'fact', 5),
    fc(29, 'Molecular evidence of common descent?', 'Universal genetic code, ATP, similar DNA and proteins.', 'concept', 5),
    fc(30, 'Human–chimpanzee DNA similarity?', 'About 98–99 percent.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
