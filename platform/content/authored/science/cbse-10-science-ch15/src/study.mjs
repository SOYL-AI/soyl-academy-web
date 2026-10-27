// ch15 notes and flashcards.
import { T, unit, PROV } from '../../cbse-10-science-ch06/src/lib.mjs';
import { V, traitsTable, selectionTable, driftTable, speciationTable, organsTable, datingTable, cabbageFlow } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Evolution — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Acquired and inherited traits',
      `*This chapter is assessed through internal (school-based) assessment, not the board theory paper.*

**Evolution** is the change in the **inherited characteristics of a population** over many generations. Individuals develop; populations evolve.

- **Acquired traits** develop during an individual’s life through use, training, injury or surroundings (muscles built by exercise, a scar, a language learnt). They do **not** change the DNA of the **germ cells**, so they are **not inherited**.
- **Inherited traits** come from the DNA received from the parents (blood group, natural eye colour) and can be passed on.
- Experiments in which the tails of mice were cut for several generations still produced young with normal tails: body changes are not inherited.

Only variations in **germ-cell DNA** can be the raw material for evolution.`,
      [kt('Acquired trait', 'A trait that develops during an individual’s lifetime and is not passed on through DNA.'), kt('Inherited trait', 'A trait coded in DNA and passed from parents to offspring through germ cells.')],
      traitsTable,
      [1],
    ),
    sec(
      '2. Natural selection and genetic drift',
      `**Natural selection:** individuals vary; more are born than can survive; those with variations that suit their surroundings survive and reproduce more; they pass these variations on; over generations, the useful variations become common.

- Example: on dry brown grass, birds catch green grasshoppers more easily, so brown ones become common.
- The variations **already exist**; animals do not change because they "need" to.

**Genetic drift:** a **random** change in how common a variation is, caused by chance events (which individuals happen to survive or breed). It gives no survival advantage and has the greatest effect in **small populations**.`,
      [kt('Natural selection', 'The process by which variations that help survival and reproduction become more common over generations.'), kt('Genetic drift', 'Random change in the frequency of a variation in a population, strongest in small populations.')],
      V.grass,
      [2],
      [selectionTable, driftTable],
    ),
    sec(
      '3. Speciation',
      `A **species** is a group whose members can **interbreed** and produce **fertile offspring**. **Speciation** is the formation of new species.

How it happens:
1. A barrier (river, mountain range, sea) **splits a population**; **gene flow** between the parts **stops** (geographical isolation).
2. Each part changes separately by **genetic drift** and by **natural selection** in its own surroundings.
3. Over many generations, changes in **DNA** (sometimes even in chromosome number) or in **behaviour** (mating calls, breeding seasons) make the two groups unable to interbreed: **reproductive isolation**.
4. The two groups are now separate species.`,
      [kt('Species', 'A group of organisms whose members can interbreed and produce fertile offspring.'), kt('Gene flow', 'Movement of genes between groups through interbreeding.'), kt('Speciation', 'The formation of a new species from an existing one.')],
      V.speciation,
      [2],
      [speciationTable],
    ),
    sec(
      '4. Evolution and classification: homologous and analogous organs',
      `The **more characteristics** two organisms share, the **more recently** they had a **common ancestor**. So classification also traces evolutionary relationships, shown as a **family tree**.

- **Homologous organs:** same basic structure and origin, possibly different functions. Forelimbs of a human (grasping), cat (walking), whale (swimming) and bird (flying) all have one upper arm bone, two forearm bones, wrist bones and finger bones. They show **common ancestry**.
- **Analogous organs:** different structure and origin, similar function. Wings of an insect and a bird; a potato (stem) and a sweet potato (root) both storing food. They show that similar ways of life can lead to similar solutions, **not** close relationship.`,
      [kt('Homologous organs', 'Organs with the same basic structure and origin but possibly different functions.'), kt('Analogous organs', 'Organs with different structure and origin but a similar function.')],
      V.forelimbs,
      [3],
      [V.phylogeny, V.wings, organsTable],
    ),
    sec(
      '5. Fossils',
      `**Fossils** are the preserved remains or traces of organisms that lived long ago (bones, shells, leaf impressions, footprints, insects in amber). Most form when remains are buried in sediment that slowly turns to rock.

**Finding the age of a fossil**
- **Relative dating (depth):** in undisturbed layers of sedimentary rock, deeper layers are older, so deeper fossils are older.
- **Radioactive dating:** comparing the amounts of different **isotopes** of an element (such as carbon) in the fossil gives its approximate age in years. Carbon-14 halves about every 5730 years.

**Archaeopteryx** had feathers (like birds) but also teeth, clawed fingers and a long bony tail (like reptiles): a link between reptiles (dinosaurs) and birds. Feathers probably first evolved for **warmth** and were later used for **flight**.`,
      [kt('Fossil', 'Preserved remains or traces of an organism that lived long ago.'), kt('Half-life', 'The time in which half of a radioactive isotope in a sample decays.')],
      V.strata,
      [3],
      [datingTable],
    ),
    sec(
      '6. Evolution by stages',
      `**Complex organs evolve in stages**, each stage being useful. The eye: light-sensitive patches (eyespots of planaria) → a cup that shows the direction of light → a narrow opening that gives a rough image → a lens eye with a sharp image. Eyes evolved **separately** in several groups (octopuses, insects, vertebrates).

**Artificial selection** shows how powerful selection is. From **wild cabbage**, farmers selected different features over many generations to produce **cabbage** (short stem, packed leaves), **broccoli** (flower-bud clusters), **cauliflower** (dense head of undeveloped flowers), **kohlrabi** (swollen stem) and **kale** (large leaves) — all still one species.

**Molecular phylogeny:** comparing **DNA** shows relationships directly: the more similar the DNA, the closer the relationship.`,
      [kt('Artificial selection', 'Selection by humans of plants or animals with desired features for breeding, over many generations.'), kt('Molecular phylogeny', 'Tracing evolutionary relationships by comparing DNA (or proteins).')],
      cabbageFlow,
      [4],
    ),
    sec(
      '7. Human evolution',
      `- **Humans did not evolve from chimpanzees.** Humans and chimpanzees evolved from a **common ancestor** that lived several million years ago; their DNA is close to 99% alike.
- Modern humans, **Homo sapiens**, arose in **Africa** a few hundred thousand years ago. Groups later spread out of Africa to Asia, Europe, Australia and the Americas.
- **All humans today are one species.** Differences in skin colour, height or hair are small variations, not separate species or "races" in the biological sense.
- **Evolution is not progress** towards a goal: it produces diversity suited to surroundings. Bacteria and humans are both products of the same long history.`,
      [kt('Homo sapiens', 'The scientific name of modern humans, a single species.'), kt('Common ancestor', 'An ancestral population from which two or more later species descended.')],
      V.apes,
      [4],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying an animal changed "because it needed to"; variations already existed and were selected.
- Saying acquired traits are inherited, or not mentioning germ cells when explaining why they are not.
- Calling organs homologous because they do the same job (that makes them analogous).
- Saying shallower fossils are older.
- Writing "humans evolved from chimpanzees" or "evolution means progress".

**How marks are usually awarded**
- 1-mark items: correct option, term or example.
- 2–3-mark answers: definition or principle (1) + example (1) + reason or link to evolution (1).
- 5-mark answers: definitions (1–2) + mechanism with an example (2) + evidence or conclusion (1–2).
- Activity and project items: correct observation, then an explanation in terms of selection, isolation or common ancestry.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define evolution.', 'Change in the inherited characteristics of a population over many generations.', 'definition', 1),
    fc(2, 'Acquired trait?', 'A trait developed during life (training, injury, surroundings); not inherited.', 'definition', 1),
    fc(3, 'Inherited trait?', 'A trait coded in DNA and passed on through germ cells.', 'definition', 1),
    fc(4, 'Why are acquired traits not inherited?', 'They change body tissues, not the DNA of germ cells.', 'concept', 1),
    fc(5, 'Example: acquired vs inherited?', 'Muscles from exercise (acquired); blood group (inherited).', 'example', 1),
    fc(6, 'What did cutting the tails of mice for generations show?', 'Young were still born with tails: body changes are not inherited.', 'example', 1),
    fc(7, 'Natural selection in one line?', 'Variations that help survival and reproduction become more common over generations.', 'definition', 2),
    fc(8, 'Do animals change because they need to?', 'No. Variations arise by chance; selection keeps the useful ones.', 'concept', 2),
    fc(9, 'Genetic drift?', 'Random change in the frequency of a variation, strongest in small populations.', 'definition', 2),
    fc(10, 'Selection vs drift?', 'Selection: change gives an advantage. Drift: change by chance, no advantage.', 'concept', 2),
    fc(11, 'Define a species.', 'Members can interbreed and produce fertile offspring.', 'definition', 2),
    fc(12, 'Gene flow?', 'Mixing of genes between groups through interbreeding.', 'definition', 2),
    fc(13, 'Four factors in speciation?', 'Geographical isolation, genetic drift, natural selection, DNA or chromosome changes (reproductive isolation).', 'concept', 2),
    fc(14, 'Why does isolation matter for speciation?', 'It stops gene flow, so the separated groups change independently.', 'concept', 2),
    fc(15, 'Reproductive isolation?', 'Two groups can no longer interbreed successfully, even if they meet.', 'definition', 2),
    fc(16, 'More shared characteristics mean…?', 'A more recent common ancestor (closer relationship).', 'concept', 3),
    fc(17, 'Homologous organs?', 'Same basic structure and origin, different functions; e.g. human arm and whale flipper.', 'definition', 3),
    fc(18, 'Analogous organs?', 'Different structure and origin, similar function; e.g. insect and bird wings.', 'definition', 3),
    fc(19, 'What do homologous organs show?', 'A common ancestor.', 'concept', 3),
    fc(20, 'What are fossils?', 'Preserved remains or traces of organisms from the distant past.', 'definition', 3),
    fc(21, 'Two ways to date fossils?', 'Depth in rock layers (deeper is older); radioactive dating using isotope ratios.', 'concept', 3),
    fc(22, 'Fraction of carbon-14 left after two half-lives?', 'One quarter.', 'formula', 3),
    fc(23, 'Why is Archaeopteryx important?', 'It has bird features (feathers) and reptile features (teeth, claws, bony tail).', 'example', 3),
    fc(24, 'Feathers first evolved for…?', 'Probably warmth; later used for flight.', 'fact', 3),
    fc(25, 'Can complex organs evolve gradually?', 'Yes: each stage is useful (eyespot → cup → lens eye).', 'concept', 4),
    fc(26, 'Vegetables from wild cabbage?', 'Cabbage, broccoli, cauliflower, kohlrabi, kale.', 'example', 4),
    fc(27, 'Molecular phylogeny?', 'Tracing relationships by comparing DNA: more similar DNA, closer relatives.', 'definition', 4),
    fc(28, 'Did humans evolve from chimpanzees?', 'No: both evolved from a common ancestor.', 'concept', 4),
    fc(29, 'Where did Homo sapiens arise?', 'In Africa.', 'fact', 4),
    fc(30, 'Are all humans one species?', 'Yes: differences such as skin colour are small variations.', 'fact', 4),
    fc(31, 'Exam tip: homologous or analogous?', 'Judge by origin and structure, never by function alone.', 'exam-tip', 3),
    fc(32, 'Exam tip: natural selection answers?', 'Say the variation already existed and was selected; never "they needed to change".', 'exam-tip', 2),
  ],
  status: 'draft',
  provenance: PROV,
};
