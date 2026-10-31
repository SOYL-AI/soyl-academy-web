// ISC 12 Biology ch10 notes and flashcards.
import { T, table, unit, PROV } from '../../isc-12-biology-ch01/src/lib.mjs';
import { V, HW1, M1, M2 } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Mechanism of Evolution and Human Evolution — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Darwinism and natural selection',
      `**Charles Darwin** and **Alfred Russel Wallace** proposed the theory of **natural selection**; Darwin set it out in *On the Origin of Species* (1859). **Thomas Malthus** (*Essay on Population*) argued that populations increase **geometrically** while food supply increases **arithmetically**; Darwin applied this to all organisms.

**Postulates:** (1) **Overproduction (prodigality)** — organisms produce many more offspring than can survive. (2) **Limited resources** and **struggle for existence** — intraspecific, interspecific and environmental. (3) **Variation** — no two individuals are alike, and many variations are heritable. (4) **Natural selection / survival of the fittest** (Herbert Spencer’s phrase) — individuals with favourable variations survive and **reproduce more**; **fitness** is **reproductive fitness**. (5) **Origin of species** — favourable variations accumulate over generations, forming new species.

**Examples of natural selection:**
- **Industrial melanism** in the peppered moth *Biston betularia*: before industrialisation in England, light moths were camouflaged on lichen-covered trees; after soot darkened the trunks, light moths were picked off by birds and **dark (melanic) moths** increased (for example from ${M1} to ${M2} percent). In unpolluted areas light moths remained common.
- **Giraffe’s neck:** Lamarck explained it by **use and stretching** (inheritance of acquired characters); Darwin by **selection** of giraffes that **already had** longer necks.
- **DDT resistance** in mosquitoes and **antibiotic resistance** in bacteria: resistant variants were present before exposure and were selected.

**Lederberg’s replica plating (1952):** Joshua and Esther Lederberg transferred colonies from a master plate (no penicillin) using sterile **velvet** to plates with and without penicillin. Resistant colonies grew on the penicillin plate at the **same positions** as colonies on the master plate, so **resistance mutations arose before exposure**; penicillin only **selected** them — **pre-adaptation**.

**Criticism of Darwinism:** it did not explain the **origin** or **inheritance** of variations; it did not distinguish heritable from non-heritable variations; it explained the **survival** but not the **arrival** of the fittest; it could not explain vestigial and over-specialised organs well.`,
      [kt('Natural selection', 'Differential survival and reproduction of individuals with favourable heritable variations.'), kt('Fitness', 'Reproductive success: number of surviving offspring.'), kt('Industrial melanism', 'Increase of dark forms in polluted, sooty environments by selection.'), kt('Replica plating', 'Lederbergs’ method showing that resistant mutants exist before exposure.')],
      V.replica,
      [1],
    ),
    sec(
      '2. Mutation theory and the modern synthetic theory',
      `**Hugo de Vries**, studying the evening primrose ***Oenothera lamarckiana***, observed **sudden, large, heritable** changes — **mutations**. He proposed that new species arise by **saltation** (single large steps), and that mutations are **random and directionless**, unlike Darwin’s small, continuous variations.

**Modern synthetic theory (neo-Darwinism)** — developed by **Dobzhansky, Fisher, Haldane, Huxley, Mayr and Stebbins** — combines Darwin’s natural selection with genetics. Evolution is a change in **allele frequencies** in a **population**. Factors:
1. **Gene mutation** and **chromosomal mutation** — new alleles and gene arrangements.
2. **Genetic recombination** — crossing over, independent assortment and random fertilisation give new combinations.
3. **Gene flow (gene migration)** — movement of alleles between populations.
4. **Genetic drift** — random changes in allele frequencies, strongest in **small** populations:
   - **Founder effect:** a few individuals colonise a new area; the new population carries the founders’ (possibly unusual) allele frequencies (for example, high frequency of some inherited disorders in isolated communities).
   - **Bottleneck effect:** a disaster drastically reduces a population; survivors’ frequencies, not the original ones, are passed on (for example, **northern elephant seals**, **cheetahs** with very low genetic variation).
5. **Natural selection** — favours alleles that increase reproductive success.
6. **Reproductive isolation** — prevents interbreeding, so diverging populations become new species.`,
      [kt('Mutation theory', 'De Vries: new species arise by sudden large mutations (saltation).'), kt('Genetic drift', 'Random change in allele frequencies, important in small populations.'), kt('Founder effect', 'Drift when a few individuals start a new population.'), kt('Bottleneck effect', 'Drift after a sharp reduction in population size.'), kt('Gene flow', 'Transfer of alleles between populations by migration.')],
      V.bottleneck,
      [2],
    ),
    sec(
      '3. Variation and types of natural selection',
      `**Variation** is the raw material of evolution. **Heritable (genetic) variations** arise from **mutation**, **recombination** (crossing over and independent assortment in meiosis), **random fertilisation** and **gene flow**. **Non-heritable (environmental) variations** — such as muscles developed by exercise — are not inherited and play no part in evolution. Variations may be **continuous** (height, skin colour) or **discontinuous** (blood groups).

**Types of natural selection** (for a trait with a bell-shaped distribution):
- **Stabilising selection** favours the **average** phenotype and removes both extremes; the curve becomes **narrower** (for example, human **birth weight**: very light and very heavy babies survive less well).
- **Directional selection** favours **one extreme**; the curve **shifts** in that direction (for example, dark peppered moths, antibiotic resistance, longer necks in giraffes).
- **Disruptive selection** favours **both extremes** over the average; the curve develops **two peaks**, which may lead to **two new species** (for example, birds with small and large beaks where only small and large seeds are available).`,
      [kt('Stabilising selection', 'Selection favouring the average phenotype.'), kt('Directional selection', 'Selection favouring one extreme phenotype.'), kt('Disruptive selection', 'Selection favouring both extremes; may split a population.')],
      V.selection,
      [3],
    ),
    sec(
      '4. The Hardy–Weinberg principle',
      `The **Hardy–Weinberg principle** (G. H. Hardy and W. Weinberg, 1908): in a **large**, **randomly mating** population with **no mutation, migration, genetic drift or natural selection**, allele and genotype frequencies remain **constant** from generation to generation — **genetic equilibrium**. The total **gene pool** stays the same.

For a gene with alleles A (frequency **p**) and a (frequency **q**):
- **p + q = 1**
- **p² + 2pq + q² = 1**, where p² = frequency of AA, 2pq = Aa and q² = aa.

**Solving problems:** start from the **recessive phenotype** (q²), take the square root to get q, then p = 1 − q. Example: 36 percent recessive → q² = 0.36, q = **${HW1.q}**, p = **${HW1.p}**, carriers 2pq = **${HW1.Aa}**. From genotype counts, **p = (2 × number of AA + number of Aa) ÷ (2 × total)**.

**Factors that disturb the equilibrium** (and so cause evolution): **gene migration (gene flow)**, **genetic drift**, **mutation**, **genetic recombination** and **natural selection**. A change in frequencies from one generation to the next is a measure of **evolution**.`,
      [kt('Gene pool', 'All the alleles of all genes in a population.'), kt('Genetic equilibrium', 'Constant allele and genotype frequencies over generations.'), kt('p + q = 1', 'Sum of the frequencies of two alleles.')],
      V.hw,
      [4],
    ),
    sec(
      '5. Human evolution',
      `Human evolution is traced through fossils from the Miocene onward (dates and brain sizes approximate):
- **Dryopithecus** (about 15 million years ago; Africa, Europe): ape-like, hairy, walked like gorillas and chimpanzees; ate soft fruits and leaves; a common ancestor of apes and humans.
- **Ramapithecus** (about 14 million years ago; Shivalik hills of India, Africa): more man-like; **small canines** and **thick enamel**; possibly semi-erect.
- **Australopithecus** (about 2 million years ago; East African grasslands): **upright, bipedal**; brain about **450–600 cc**; hunted with stone weapons; mainly ate fruit.
- **Homo habilis** (about 2 million years ago): the **“handy man”**, first human-like being; brain **650–800 cc**; made **stone tools**; probably did not eat meat.
- **Homo erectus** (about 1.5 million years ago): brain about **900 cc**; probably **ate meat**; used **fire**; Java man and Peking man.
- **Neanderthal man** (Homo neanderthalensis; 100 000–40 000 years ago; east and central Asia): brain about **1400 cc**; used **hides** to protect the body; **buried their dead**.
- **Cro-Magnon man** (about 30 000 years ago): brain about **1650 cc**; fully erect; made **cave paintings** and fine tools.
- **Homo sapiens (modern man)**: arose in **Africa** and spread across continents; during the ice age between **75 000 and 10 000 years ago** modern humans spread widely; brain about **1350–1450 cc**; **agriculture** began about **10 000 years ago** with settlements; pre-historic cave art (such as at Bhimbetka) about 18 000 years ago.

**Trends:** increase in brain size, upright posture and bipedal gait, reduction of jaws and canines, use of tools, fire, language and culture.`,
      [kt('Homo habilis', 'Handy man; first stone tools; brain 650–800 cc.'), kt('Homo erectus', 'Used fire; ate meat; brain about 900 cc.'), kt('Neanderthal man', 'Buried the dead; brain about 1400 cc.')],
      V.hominin,
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying moths turned dark “to hide” (the dark form already existed; birds selected against light moths).
- Confusing Lamarck’s use and disuse with Darwin’s selection in the giraffe example.
- Using p² for the recessive phenotype (it is q²).
- Forgetting that heterozygotes carry one of each allele when counting.
- Mixing up founder effect (a few start a new population) and bottleneck (a population is cut down).
- Giving Homo erectus the largest brain (Neanderthal and Cro-Magnon had larger ones).

**How marks are usually awarded**
- 1-mark subparts: a scientist, an example, a brain capacity, a factor disturbing equilibrium.
- 2–3-mark questions: postulates of Darwinism; replica plating; founder vs bottleneck; three types of selection; Hardy–Weinberg calculations.
- 5-mark questions in parts: natural selection with examples; modern synthetic theory; Hardy–Weinberg with numericals; human evolution in sequence.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Malthus’s idea used by Darwin?', 'Populations grow geometrically, food arithmetically.', 'fact', 1),
    fc(2, 'Five postulates of Darwinism?', 'Overproduction, struggle, variation, natural selection, origin of species.', 'concept', 1),
    fc(3, 'What is fitness in Darwinism?', 'Reproductive success.', 'definition', 1),
    fc(4, 'Moth in industrial melanism?', 'Biston betularia (peppered moth).', 'fact', 1),
    fc(5, 'Lamarck vs Darwin on the giraffe?', 'Stretching (acquired) vs selection of long necks.', 'exam-tip', 1),
    fc(6, 'Who did replica plating, and when?', 'Joshua and Esther Lederberg, 1952.', 'fact', 1),
    fc(7, 'Conclusion of replica plating?', 'Resistant mutants exist before exposure; antibiotic only selects.', 'concept', 1),
    fc(8, 'Main gap in Darwinism?', 'Could not explain origin and inheritance of variations.', 'concept', 1),
    fc(9, 'De Vries’ plant?', 'Evening primrose, Oenothera lamarckiana.', 'fact', 2),
    fc(10, 'What is saltation?', 'Speciation in a single large step.', 'definition', 2),
    fc(11, 'Modern synthesis defines evolution as?', 'Change in allele frequencies of a population.', 'definition', 2),
    fc(12, 'Name four factors of the modern synthesis.', 'Mutation, recombination, gene flow, genetic drift (plus selection, isolation).', 'fact', 2),
    fc(13, 'Founder effect?', 'Drift when a few individuals found a new population.', 'definition', 2),
    fc(14, 'Bottleneck effect?', 'Drift after a population is sharply reduced.', 'definition', 2),
    fc(15, 'Example of a bottleneck?', 'Northern elephant seals or cheetahs.', 'fact', 2),
    fc(16, 'Which variations are inherited?', 'Genetic ones: mutation, recombination, gene flow.', 'concept', 3),
    fc(17, 'Stabilising selection example?', 'Human birth weight.', 'exam-tip', 3),
    fc(18, 'Directional selection example?', 'Dark peppered moths; antibiotic resistance.', 'exam-tip', 3),
    fc(19, 'Disruptive selection?', 'Both extremes favoured; two peaks.', 'definition', 3),
    fc(20, 'Hardy–Weinberg equations?', 'p + q = 1; p² + 2pq + q² = 1.', 'fact', 4),
    fc(21, 'What does 2pq represent?', 'Frequency of heterozygotes (carriers).', 'concept', 4),
    fc(22, '36 percent recessive: q and carriers?', `q = ${HW1.q}; carriers ${HW1.Aa}.`, 'exam-tip', 4),
    fc(23, 'Five factors disturbing equilibrium?', 'Gene flow, drift, mutation, recombination, natural selection.', 'fact', 4),
    fc(24, 'Ramapithecus: where and what?', 'Shivalik hills; man-like teeth.', 'fact', 5),
    fc(25, 'Australopithecus brain and posture?', '450–600 cc; upright, bipedal.', 'fact', 5),
    fc(26, 'Homo habilis known for?', 'First stone tools; 650–800 cc.', 'fact', 5),
    fc(27, 'Homo erectus known for?', 'Fire, meat-eating; about 900 cc.', 'fact', 5),
    fc(28, 'Neanderthal features?', 'About 1400 cc; buried the dead; used hides.', 'fact', 5),
    fc(29, 'Cro-Magnon features?', 'About 1650 cc; cave paintings.', 'fact', 5),
    fc(30, 'When did agriculture begin?', 'About 10 000 years ago.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
