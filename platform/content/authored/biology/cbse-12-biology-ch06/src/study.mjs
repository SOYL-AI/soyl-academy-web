// ch06 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-12-biology-ch01/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Evolution — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Origin of life',
      `Universe about **20 billion years** old (**Big Bang**, in the textbook account); Earth about **4.5 billion years**; life about **4 billion years** ago. Early Earth: no atmosphere at first; water vapour, methane, carbon dioxide and ammonia released from molten material; UV split water into hydrogen and oxygen; cooling formed oceans.

**Ideas:** special creation; **spontaneous generation** (life from decaying matter) — disproved by **Louis Pasteur** (no life in pre-sterilised flasks with killed yeast; life in flasks open to air); **panspermia** (spores from outer space); **chemical evolution** (**Oparin and Haldane**): the first life arose from pre-existing non-living organic molecules (such as RNA and protein).

**Miller (1953):** electric discharge in a closed flask with **CH₄, H₂, NH₃ and water vapour** at about **800 °C** produced **amino acids**; similar experiments gave sugars, nitrogen bases, pigments and fats. The first non-cellular forms of life may have arisen about 3 billion years ago; cellular forms about 2000 million years ago.`,
      [kt('Chemical evolution', 'Formation of complex organic molecules from simple inorganic ones, before the origin of life.'), kt('Spontaneous generation', 'The disproved idea that life arises from non-living matter such as decaying material.')],
      V.miller,
      [1],
    ),
    sec(
      '2. Evidence for evolution',
      `**Palaeontological:** fossils in **sedimentary rock layers**; each layer a geological period; deeper layers older; different-aged rocks hold different (often extinct) life forms. Ages found by radioactive dating.

**Comparative anatomy:**
| | Homologous organs | Analogous organs |
|---|---|---|
| Origin and structure | Same | Different |
| Function | Often different | Same |
| Evolution | **Divergent** | **Convergent** |
| Examples | Forelimbs of whale, bat, cheetah, human; vertebrate hearts and brains; thorns of Bougainvillea and tendrils of Cucurbita | Wings of butterfly and bird; eyes of octopus and mammals; flippers of penguin and dolphin; sweet potato (root) and potato (stem) |

**Molecular homology:** similarities in proteins and genes indicate common ancestry. **Embryology:** Haeckel noted features such as vestigial gill slits in vertebrate embryos; **Karl Ernst von Baer** showed that embryos never pass through the adult stages of other animals.

**Natural selection observed:** **industrial melanism** in peppered moths (England): light-winged moths commoner before industrialisation (about 1850); dark-winged commoner in industrial areas by about 1920, after pollution killed lichens and darkened trunks; light moths remained common in rural areas. Resistance to **herbicides, pesticides, antibiotics and drugs** develops quickly: **anthropogenic** selection.`,
      [kt('Homologous organs', 'Organs with the same basic structure and origin but often different functions; evidence of divergent evolution.'), kt('Analogous organs', 'Organs with the same function but different structure and origin; evidence of convergent evolution.'), kt('Industrial melanism', 'Increase in dark forms of an organism in polluted industrial areas, as in peppered moths.')],
      V.limbs,
      [1],
    ),
    sec(
      '3. Darwin’s theory, adaptive radiation and mutation',
      `**Darwin** (voyage of HMS Beagle) and **Wallace** (Malay Archipelago): populations vary; more offspring are produced than survive; better-fit heritable variants leave more progeny; over generations, populations change and branch (**branching descent**). **Fitness** = **reproductive fitness**. **Natural selection** increases the better-fit types.

**Lamarck:** use and disuse of organs; inheritance of acquired characters (giraffe’s neck) — not accepted.

**Adaptive radiation:** evolution of different species in a geographical area from one point, radiating to other habitats — **Darwin’s finches** (Galápagos; beaks altered from seed-eating to insect-eating and other forms); **Australian marsupials**. When more than one adaptive radiation occurs in isolated areas, similar forms evolve: **convergent evolution** (placental wolf and Tasmanian wolf).

**Hugo de Vries** (evening primrose): **mutations** — large, sudden, random, directionless variations — cause evolution (**saltation**), unlike Darwin’s small, directional variations. The modern view combines variation from mutation and recombination with natural selection.`,
      [kt('Fitness', 'Reproductive fitness: the ability to leave more surviving offspring.'), kt('Adaptive radiation', 'Evolution of many species from one ancestor in an area, radiating into different habitats.'), kt('Saltation', 'Single-step large mutation, according to de Vries.')],
      table(['Example', 'Adaptive radiation of'], [['Galápagos', 'Darwin’s finches'], ['Australia', 'Marsupials']], 'Table of two examples of adaptive radiation'),
      [2],
    ),
    sec(
      '4. Hardy–Weinberg principle and the mechanism of evolution',
      `**Hardy–Weinberg principle:** allele frequencies in a population are **stable** and constant from generation to generation (**genetic equilibrium**) if nothing disturbs them. With alleles A (frequency **p**) and a (**q**): **p + q = 1**; genotype frequencies **p² (AA) + 2pq (Aa) + q² (aa) = 1**. A difference between measured and expected values indicates evolution.

**Five factors** that disturb equilibrium: **gene migration (gene flow)**; **genetic drift** (chance changes; in a small founder population, allele frequencies may differ greatly — **founder effect**); **mutation**; **genetic recombination**; **natural selection**.

**Types of natural selection:**
- **Stabilising:** more individuals acquire the mean value; the curve narrows.
- **Directional:** one extreme is favoured; the curve shifts.
- **Disruptive:** both extremes are favoured; the middle falls, two peaks may form.

**Worked rules:** from the recessive class, q = √(q²), p = 1 − q, carriers = 2pq; from counts, p = (2 × AA + Aa) ÷ (2 × total).`,
      [kt('Genetic equilibrium', 'State in which allele frequencies stay constant from generation to generation.'), kt('Genetic drift', 'Change in allele frequencies by chance, strongest in small populations.'), kt('Founder effect', 'Difference in allele frequencies when a few individuals start a new population.')],
      V.hwsq,
      [3],
      [V.selection],
    ),
    sec(
      '5. Origin and evolution of humans',
      `| Time ago (approx.) | Form | Notes |
|---|---|---|
| 15 million years | Dryopithecus, Ramapithecus | Hairy, walked like gorillas; Ramapithecus more man-like, Dryopithecus more ape-like |
| 2 million years | Australopithecines | East African grasslands; probably hunted with stone weapons; ate mainly fruit |
| 2 million years | Homo habilis | First human-like being; brain 650–800 cc; probably did not eat meat |
| 1.5 million years | Homo erectus | Fossil in Java (1891); brain about 900 cc; probably ate meat |
| 1 lakh – 40 000 years | Neanderthal man | Brain about 1400 cc; near east and central Asia; used hides; buried the dead |
| 75 000 – 10 000 years | Modern Homo sapiens | Arose in Africa; spread across continents during the ice age |

**Culture:** prehistoric cave art about 18,000 years ago (for example, the Bhimbetka rock shelters, Madhya Pradesh); agriculture and settlements about 10,000 years ago. Trends: larger brain, upright posture, better tools, meat in the diet, culture. Humans and apes share **common ancestors**; humans did not evolve from today’s apes.`,
      [kt('Hominin', 'A member of the human lineage, such as Australopithecines and species of Homo.')],
      V.brain,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying Miller made living cells (he obtained amino acids).
- Swapping homology/divergent and analogy/convergent.
- Saying pollution turned peppered moths dark (it changed which form survived).
- Writing pq instead of 2pq for heterozygotes, or forgetting to take the square root of q².
- Calling fitness physical strength rather than reproductive success.
- Saying humans evolved from chimpanzees.

**How marks are usually awarded**
- 1-mark items: term, example, value of p, q or 2pq, brain size or time.
- 2–3-mark answers: concept (1) + explanation (1) + example or calculation (1).
- 5-mark answers: a full explanation (Darwin’s theory, Hardy–Weinberg with factors, or evidence of evolution) with examples and a diagram or calculation.
- Case-based items: interpreting moth counts, allele frequencies or fossil data, with a 2-mark part with an internal choice.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Age of the Earth and of life (approx.)?', 'Earth about 4.5 billion years; life about 4 billion years ago.', 'fact', 1),
    fc(2, 'Who disproved spontaneous generation?', 'Louis Pasteur.', 'fact', 1),
    fc(3, 'Who proposed chemical evolution?', 'Oparin and Haldane.', 'fact', 1),
    fc(4, 'Miller’s gases and product?', 'CH₄, H₂, NH₃, water vapour with sparks → amino acids.', 'fact', 1),
    fc(5, 'What do deeper rock layers contain?', 'Older fossils, often of extinct forms.', 'concept', 1),
    fc(6, 'Homologous organs: example and evolution type?', 'Forelimbs of whale, bat, cheetah, human; divergent evolution.', 'example', 1),
    fc(7, 'Analogous organs: example and evolution type?', 'Wings of butterfly and bird; convergent evolution.', 'example', 1),
    fc(8, 'Plant homologous and analogous examples?', 'Thorns of Bougainvillea and tendrils of Cucurbita; sweet potato and potato.', 'example', 1),
    fc(9, 'Industrial melanism: what changed?', 'Dark peppered moths became commoner on soot-darkened trunks.', 'concept', 1),
    fc(10, 'What is anthropogenic selection?', 'Selection caused by human action, such as resistance to antibiotics and pesticides.', 'definition', 1),
    fc(11, 'Darwin’s meaning of fitness?', 'Reproductive fitness: leaving more surviving offspring.', 'definition', 2),
    fc(12, 'Why is Lamarck’s idea rejected?', 'Acquired characters are not inherited.', 'concept', 2),
    fc(13, 'Adaptive radiation: two examples?', 'Darwin’s finches; Australian marsupials.', 'example', 2),
    fc(14, 'Convergent evolution example in mammals?', 'Placental wolf and Tasmanian wolf (marsupial).', 'example', 2),
    fc(15, 'De Vries’s mutations differ from Darwin’s variations how?', 'Large, sudden, random (saltation) vs small, directional.', 'concept', 2),
    fc(16, 'Hardy–Weinberg equation?', 'p² + 2pq + q² = 1, with p + q = 1.', 'formula', 3),
    fc(17, 'If q² = 0.25, what are q and 2pq?', 'q = 0.5; 2pq = 0.5.', 'exam-tip', 3),
    fc(18, 'Five factors that disturb HW equilibrium?', 'Gene flow, genetic drift, mutation, recombination, natural selection.', 'concept', 3),
    fc(19, 'What is the founder effect?', 'A small founding group has allele frequencies different from the original population.', 'definition', 3),
    fc(20, 'Stabilising selection?', 'Favours the mean; the curve narrows.', 'definition', 3),
    fc(21, 'Directional selection?', 'Favours one extreme; the curve shifts.', 'definition', 3),
    fc(22, 'Disruptive selection?', 'Favours both extremes; two peaks form.', 'definition', 3),
    fc(23, 'Dryopithecus vs Ramapithecus?', 'More ape-like vs more man-like (about 15 mya).', 'fact', 4),
    fc(24, 'Homo habilis brain size and diet?', '650–800 cc; probably did not eat meat.', 'fact', 4),
    fc(25, 'Homo erectus brain size and time?', 'About 900 cc; about 1.5 million years ago.', 'fact', 4),
    fc(26, 'Neanderthal man: brain and behaviour?', 'About 1400 cc; used hides, buried the dead.', 'fact', 4),
    fc(27, 'Where did Homo sapiens arise?', 'Africa.', 'fact', 4),
    fc(28, 'When did cave art and agriculture begin?', 'About 18,000 and about 10,000 years ago.', 'fact', 4),
    fc(29, 'Did humans evolve from today’s apes?', 'No; humans and apes share common ancestors.', 'exam-tip', 4),
    fc(30, 'Allele frequency from counts?', 'p = (2 × AA + Aa) ÷ (2 × total).', 'formula', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
