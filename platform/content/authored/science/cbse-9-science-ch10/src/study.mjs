// ch10 Reproduction — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Reproduction — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Reproduction and the two modes',
      r`**Reproduction** makes new individuals of the same kind and keeps a species going. In **asexual reproduction** one parent produces identical offspring (clones) without gametes. In **sexual reproduction** a male and a female gamete fuse to form a zygote, and the offspring show variation.

**Fission:** *Amoeba* divides into two (binary fission); *Plasmodium* divides into many (multiple fission). **Budding:** a bud grows on the parent and separates, as in yeast.`,
      [kt('Asexual reproduction', 'Reproduction from a single parent, with no gametes, giving identical offspring.'), kt('Binary fission', 'Division of one cell into two daughter cells.'), kt('Multiple fission', 'Division of one cell into many daughter cells.'), kt('Budding', 'Formation of a small outgrowth that grows and separates from the parent.')],
      [],
      V.fission,
      [1],
    ),
    sec(
      '2. Fragmentation, regeneration, spores and vegetative propagation',
      r`**Fragmentation:** the body of *Spirogyra* breaks into pieces and each grows into a filament. **Regeneration:** a cut *Planaria* regrows missing parts, so each piece can become a worm. **Spores:** *Rhizopus* makes spores in sporangia that grow on damp food. *Hydra* also reproduces by budding.

**Vegetative propagation:** a new plant grows from a root, stem or leaf: potato eyes, *Bryophyllum* leaf plantlets, rose cuttings. **Grafting** joins a scion to a stock. Advantages: fast, keeps a good variety, works for plants that make few seeds. Limit: little variation.`,
      [kt('Fragmentation', 'Breaking of a body into pieces that each grow into a new organism.'), kt('Regeneration', 'Regrowth of missing body parts from a piece of the organism.'), kt('Spore', 'A tiny cell, produced in large numbers, that can grow into a new organism.'), kt('Vegetative propagation', 'Growth of a new plant from a vegetative part of the parent.'), kt('Graft', 'A cut shoot (scion) joined to a rooted plant (stock).')],
      [],
      V.modes2,
      [1],
      [V.veg],
    ),
    sec(
      '3. Sexual reproduction and the flower',
      r`Two gametes fuse in **fertilisation** to give a **zygote**, which grows into an **embryo**. The flower is the reproductive part of a plant. **Stamen** (male): anther on a filament makes pollen grains. **Pistil** (female): stigma, style, and ovary holding ovules, each with an egg cell. Sepals protect the bud, petals attract insects. A flower with both stamens and pistil is bisexual (hibiscus); with one only it is unisexual (papaya).`,
      [kt('Gamete', 'A male or female sex cell.'), kt('Zygote', 'The cell formed when a male gamete fuses with an egg.'), kt('Anther', 'The part of the stamen that makes pollen grains.'), kt('Stigma', 'The sticky top of the pistil that receives pollen.'), kt('Ovule', 'A structure in the ovary that holds an egg cell.')],
      [],
      V.flower,
      [1, 2],
    ),
    sec(
      '4. Pollination, fertilisation, seed and fruit',
      r`**Pollination** is the transfer of pollen from anther to stigma. **Self-pollination** is within a flower (or between flowers of one plant); **cross-pollination** is between flowers of different plants and gives more variation. Agents: insects, wind, water, birds, bats.

After landing, the pollen grain grows a **pollen tube** through the style to the ovule. The male gamete fuses with the egg: **fertilisation**. Then the zygote becomes the embryo, the **ovule becomes the seed**, the **ovary becomes the fruit**, and petals and sepals usually dry up.`,
      [kt('Pollination', 'Transfer of pollen from an anther to a stigma.'), kt('Cross-pollination', 'Transfer of pollen to a flower of another plant of the same kind.'), kt('Pollen tube', 'A tube grown by a pollen grain that carries the male gamete to the ovule.'), kt('Fruit', 'The ripened ovary, which holds and protects the seeds.')],
      [],
      V.pollen,
      [2],
      [V.fruit],
    ),
    sec(
      '5. Human reproductive systems',
      r`**Male:** testes (make sperms and testosterone) lie in the scrotum; epididymis stores sperms; vas deferens carries them; seminal vesicles and prostate add fluids (semen); urethra and penis pass semen out.

**Female:** ovaries make eggs and female hormones; fallopian tubes carry the egg and are the usual site of fertilisation; the uterus holds the growing embryo; the cervix is its narrow end; the vagina is the passage to the outside. Fertilisation is internal; the embryo grows in the uterus for about nine months.`,
      [kt('Sperm', 'The male gamete: small, with a tail.'), kt('Egg (ovum)', 'The female gamete: large and round.'), kt('Testis', 'The organ that makes sperms and testosterone.'), kt('Ovary', 'The organ that makes eggs and female hormones.'), kt('Uterus', 'The womb, where the embryo grows.')],
      [],
      V.male,
      [3],
      [V.female],
    ),
    sec(
      '6. Adolescence and reproductive health',
      r`**Adolescence** (about 10 to 19 years) includes **puberty**, driven by hormones. Girls: breasts develop, periods begin. Boys: deeper voice, facial hair. Both: growth spurt, body hair, pimples, strong feelings. Timing differs and all of it is normal.

**Menstruation** is the natural monthly shedding of the uterine lining (3 to 7 days; cycle often about 28 days, 21 to 35 normal; irregular at first). **Hygiene:** clean pad or sun-dried cloth, change every 4 to 6 hours, wash hands, dispose safely, bathe daily. **Health:** balanced food with iron, 8 to 9 hours of sleep, exercise, no tobacco or drugs. Ask a trusted adult, teacher or doctor; see a doctor for very painful or heavy periods.`,
      [kt('Adolescence', 'The stage between childhood and adulthood.'), kt('Puberty', 'The time when the body becomes able to reproduce, driven by hormones.'), kt('Hormone', 'A chemical messenger made in one part of the body that acts in another.'), kt('Menstruation', 'The natural monthly shedding of the uterine lining.')],
      [],
      table(['Habit', 'Reason'], [['change pad every 4 to 6 hours', 'prevents infection'], ['balanced meals with iron', 'replaces iron lost in periods'], ['sleep 8 to 9 hours', 'growth and recovery'], ['ask trusted adults or a doctor', 'reliable help and advice']], 'Table of four healthy habits for adolescents with the reason for each'),
      [4],
    ),
  ],
  exam_tips_md: `- Name the organism and the method together: budding in yeast, fragmentation in Spirogyra.
- Compare asexual and sexual reproduction in a table.
- Label stigma, style, ovary and ovule; do not confuse pollination with fertilisation.
- Write ovule to seed, ovary to fruit.
- Give the function next to each reproductive organ.
- Use respectful scientific words and give practical hygiene points.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is reproduction?', 'The making of new individuals of the same kind.', 'definition', 1),
    fc(2, 'What is asexual reproduction?', 'Reproduction from one parent, without gametes, giving identical offspring.', 'definition', 1),
    fc(3, 'Binary fission versus multiple fission?', 'Binary: one cell into two (Amoeba). Multiple: one cell into many (Plasmodium).', 'concept', 1),
    fc(4, 'How does yeast reproduce?', 'By budding: a small bud grows on the parent and separates.', 'fact', 1),
    fc(5, 'Which organism reproduces by fragmentation?', 'Spirogyra, a green alga with a thread-like body.', 'fact', 1),
    fc(6, 'What is regeneration? Give an organism.', 'Regrowth of missing parts from a piece; Planaria.', 'definition', 1),
    fc(7, 'How does Rhizopus reproduce?', 'By spores made in sporangia.', 'fact', 1),
    fc(8, 'How does Hydra reproduce asexually?', 'By budding: the bud grows into a small Hydra.', 'fact', 1),
    fc(9, 'What is vegetative propagation?', 'A new plant grows from a root, stem or leaf of the parent.', 'definition', 1),
    fc(10, 'Name three examples of vegetative propagation.', 'Potato eyes, Bryophyllum leaf plantlets, rose cuttings (and grafting).', 'example', 1),
    fc(11, 'What is grafting?', 'Joining a cut shoot (scion) to a rooted plant (stock).', 'definition', 1),
    fc(12, 'Why does sexual reproduction give variation?', 'The offspring get material from two parents.', 'concept', 1),
    fc(13, 'What is a zygote?', 'The cell formed when a male gamete fuses with an egg.', 'definition', 1),
    fc(14, 'Name the male and female parts of a flower.', 'Stamen (male) and pistil (female).', 'fact', 2),
    fc(15, 'What does the anther make?', 'Pollen grains.', 'fact', 2),
    fc(16, 'Name the three parts of the pistil.', 'Stigma, style and ovary.', 'fact', 2),
    fc(17, 'What do ovules contain?', 'An egg cell each.', 'fact', 2),
    fc(18, 'Define pollination.', 'Transfer of pollen from an anther to a stigma.', 'definition', 2),
    fc(19, 'Self-pollination versus cross-pollination?', 'Within one flower or plant versus between flowers of different plants.', 'concept', 2),
    fc(20, 'Name four agents of pollination.', 'Insects, wind, water, birds or bats.', 'fact', 2),
    fc(21, 'What is a pollen tube for?', 'It carries the male gamete through the style to the ovule.', 'concept', 2),
    fc(22, 'What do the ovule and the ovary become after fertilisation?', 'Seed and fruit.', 'fact', 2),
    fc(23, 'Where are sperms made? Eggs?', 'Sperms in the testes; eggs in the ovaries.', 'fact', 3),
    fc(24, 'Why do the testes lie in the scrotum?', 'It keeps them slightly cooler than the body.', 'concept', 3),
    fc(25, 'Where does fertilisation usually take place in humans?', 'In the fallopian tube.', 'fact', 3),
    fc(26, 'Where does the embryo grow?', 'In the uterus (womb).', 'fact', 3),
    fc(27, 'What is puberty?', 'The time when the body becomes able to reproduce, driven by hormones.', 'definition', 4),
    fc(28, 'What is menstruation?', 'The natural monthly shedding of the uterine lining.', 'definition', 4),
    fc(29, 'How often should a pad be changed?', 'About every 4 to 6 hours.', 'fact', 4),
    fc(30, 'Which minerals and foods help growing adolescents?', 'Iron and calcium: leafy vegetables, jaggery, dal, milk.', 'fact', 4),
    fc(31, 'Whom can you ask about body changes?', 'A parent, elder, teacher, school counsellor or doctor.', 'fact', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
