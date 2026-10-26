// ch07 notes and flashcards.
import { T, table, flow, unit, PROV } from '../../cbse-10-science-ch06/src/lib.mjs';
import { V } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas: [], visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'How do Organisms Reproduce? — Notes',
  language: 'en',
  sections: [
    sec(
      '1. DNA copying and variation',
      `Reproduction is not needed for an individual to stay alive, but it is essential for the **survival of the species**.

The **DNA** in the nucleus carries the information for making proteins, which build the body design. The basic event in reproduction is the **creation of a DNA copy**, together with additional cellular apparatus; the cell then divides so that each new cell has a copy.

DNA copying is very accurate but **not perfect**, so offspring are similar but not identical: this produces **variation**. **Consistency** in DNA copying keeps the body design suited to the organism's **niche**. Variation is useful for the species: if the niche changes drastically (for example, water temperature rises), a few individuals with a suitable variation may survive and reproduce, so the species is not wiped out.`,
      [kt('DNA', 'The material in the nucleus that carries the information for making proteins; it is copied during reproduction.'), kt('Variation', 'Differences among individuals of the same kind, arising from imperfect DNA copying and from sexual reproduction.'), kt('Niche', 'The place and way of life of an organism in its ecosystem.')],
      flow('LR', [['d', 'DNA copied'], ['s', 'Small copying changes'], ['v', 'Variation in a population'], ['c', 'Environment changes'], ['u', 'Some variants survive: species continues']], [['d', 's'], ['s', 'v'], ['v', 'u'], ['c', 'u']], 'Flow from DNA copying with small changes to variation, which lets some individuals survive a change in the environment'),
      [1],
    ),
    sec(
      '2. Fission, fragmentation, regeneration and budding',
      `**Asexual reproduction** needs a single parent and no germ cells; the offspring are nearly identical to the parent.

- **Binary fission:** one cell splits into two equal halves. **Amoeba** can divide in any plane; **Leishmania** (kala-azar) divides in a definite plane related to the whip-like structure at one end.
- **Multiple fission:** one cell divides into many daughter cells at once, often inside a protective cyst — **Plasmodium** (malaria parasite).
- **Fragmentation:** a simple multicellular organism such as **Spirogyra** breaks into pieces on maturing; each piece grows into a new individual.
- **Regeneration:** specialised cells of **Planaria** and **Hydra** can rebuild a whole organism from a cut piece. It is not the usual way of reproducing, because most organisms do not depend on being cut up.
- **Budding:** an outgrowth (bud) forms at one site by repeated cell division, grows into a small individual and detaches — **Hydra**, yeast.`,
      [kt('Binary fission', 'Division of one cell into two equal daughter cells.'), kt('Multiple fission', 'Division of one cell into many daughter cells at the same time.'), kt('Budding', 'Formation of a new individual from an outgrowth (bud) on the parent.')],
      V.fission,
      [2],
      [V.multiple, V.budding, V.regen],
    ),
    sec(
      '3. Spore formation and vegetative propagation',
      `**Spore formation:** bread mould (**Rhizopus**) has thread-like **hyphae** and round **sporangia** on stalks. Sporangia contain **spores** with **thick protective walls**; when a spore lands on a moist surface with food, it germinates into a new mould.

**Vegetative propagation:** new plants develop from **roots, stems or leaves**. **Bryophyllum** produces buds in the notches of its leaf margin; a **potato** tuber (a stem) sprouts from its eyes. People use **cuttings** (sugarcane, rose), **layering** (jasmine) and **grafting** (mango, grapes).

Advantages: plants **flower and fruit earlier** than plants grown from seed; plants that have **lost the capacity to produce seeds**, such as banana, rose and jasmine, can be multiplied; all the new plants are **genetically similar** to the parent, so good qualities are kept.`,
      [kt('Sporangium', 'A round structure on a stalk in which spores are formed.'), kt('Vegetative propagation', 'Growth of new plants from roots, stems or leaves rather than seeds.'), kt('Grafting', 'Joining a shoot of a desired variety to a rooted plant so that they grow as one.')],
      V.rhizopus,
      [2],
      [V.bryo, table(['Crop', 'Method'], [['Sugarcane', 'Stem cuttings'], ['Jasmine', 'Layering'], ['Mango', 'Grafting'], ['Banana', 'Suckers']], 'Table of crops and the vegetative methods used to grow them')],
    ),
    sec(
      '4. Sexual reproduction and the flower',
      `Sexual reproduction combines DNA from **two** individuals, so it produces **more variation** than asexual reproduction. **Germ cells** (gametes) carry **half the number of chromosomes** and half the DNA of body cells, so that when a male and a female germ cell fuse, the **zygote** has the normal amount and the number stays constant from generation to generation.

The **flower** is the reproductive part of a flowering plant: **sepals**, **petals**, **stamens** and a **pistil**.
- **Stamen** (male): **anther** on a **filament**; the anther makes **pollen grains**.
- **Pistil** (female): **stigma** (sticky top), **style** (long middle) and **ovary** (swollen base) containing **ovules**; each ovule has an **egg cell**.
- **Bisexual** flowers have both stamens and pistil (hibiscus, mustard); **unisexual** flowers have only one of them (papaya, watermelon).`,
      [kt('Germ cell (gamete)', 'A reproductive cell with half the chromosomes of a body cell.'), kt('Zygote', 'The cell formed when a male and a female germ cell fuse.'), kt('Unisexual flower', 'A flower with either stamens or a pistil, not both.')],
      V.flower,
      [3],
    ),
    sec(
      '5. Pollination, fertilisation, seeds and fruits',
      `**Pollination** is the transfer of pollen from an anther to a stigma: **self-pollination** (same flower or plant) or **cross-pollination** (another plant), by wind, water, insects or birds.

**Fertilisation:** a pollen grain on the stigma grows a **pollen tube** through the style to the ovule; the **male germ cell** passes down it and fuses with the **female germ cell** (egg), forming a **zygote**.

**After fertilisation:** the zygote divides many times to form an **embryo** within the ovule; the **ovule** develops a tough coat and becomes the **seed**; the **ovary** grows and ripens into the **fruit**; petals, sepals, stamens, style and stigma usually shrivel and fall off.

**Germination:** under suitable conditions the embryo grows into a seedling: the **plumule** forms the shoot, the **radicle** forms the root, and the **cotyledons** supply stored food.`,
      [kt('Pollination', 'Transfer of pollen grains from an anther to a stigma.'), kt('Fertilisation', 'Fusion of a male germ cell with a female germ cell.'), kt('Cotyledon', 'Seed leaf that stores food for the young seedling.')],
      V.pollenTube,
      [3],
      [V.seed],
    ),
    sec(
      '6. Puberty and the human reproductive systems',
      `**Puberty**: the reproductive organs mature and germ cells begin to be made. Changes in both sexes include thick hair in the armpits and genital area, thinner hair on the face, arms and legs, and oilier skin. Girls: breasts develop, the skin of the nipples darkens and menstruation begins. Boys: facial hair grows and the voice cracks and deepens.

**Male system:** the **testes** make **sperms** and **testosterone**; they lie in the **scrotum**, outside the abdomen, because sperm formation needs a lower temperature than body temperature. Sperms pass along the **vas deferens**, which joins the **urethra** from the urinary bladder; the urethra is a common passage for urine and sperms. The **seminal vesicles** and **prostate gland** add fluid, so sperms travel in **semen**. A sperm is mostly genetic material with a long tail.

**Female system:** the **ovaries** contain thousands of immature eggs from birth; after puberty one egg is usually released each month by one ovary. They also make **oestrogen**. The **oviduct** (fallopian tube) carries the egg towards the **uterus**, an elastic, bag-like organ, which opens into the **vagina** through the **cervix**.`,
      [kt('Scrotum', 'The pouch outside the abdomen that holds the testes.'), kt('Vas deferens', 'The tube that carries sperms from a testis towards the urethra.'), kt('Oviduct', 'The tube that carries the egg from near the ovary to the uterus; site of fertilisation.')],
      V.male,
      [4],
      [V.female],
    ),
    sec(
      '7. Fertilisation, placenta and menstruation',
      `Sperms deposited in the vagina travel through the cervix and uterus into the **oviduct**, where **fertilisation** usually happens. The zygote divides as it moves to the uterus and **implants** in the thick, blood-rich lining.

The **placenta** is a disc embedded in the uterine wall. On the embryo’s side it has **villi**; on the mother’s side are blood spaces around the villi. This gives a **large surface area** for **glucose and oxygen** to pass from mother to embryo and for **wastes** to pass from embryo to mother. The embryo is joined to the placenta by the **umbilical cord**. Development takes about **nine months**; the baby is born through rhythmic contractions of the uterus muscles.

If the egg is **not fertilised** (it lives about one day), the thickened lining is not needed; it breaks down and passes out through the vagina as blood and mucus: **menstruation**, roughly every month, lasting about two to eight days.`,
      [kt('Implantation', 'Attachment of the embryo to the lining of the uterus.'), kt('Placenta', 'Disc-like tissue in the uterine wall through which the embryo gets food and oxygen and gives up wastes.'), kt('Menstruation', 'Monthly shedding of the uterine lining as blood and mucus when the egg is not fertilised.')],
      V.placenta,
      [4],
    ),
    sec(
      '8. Reproductive health',
      `**Sexually transmitted diseases (STDs):** bacterial — **gonorrhoea**, **syphilis**; viral — **warts**, **HIV-AIDS**. Condoms reduce their spread; HIV also spreads through infected blood, shared needles and from mother to baby.

**Contraception:**
| Method | How it works | Note |
|---|---|---|
| Condom (barrier) | Prevents sperms reaching the egg | Also reduces STD spread |
| Oral pills (hormonal) | Change the hormone balance so eggs are not released | May have side effects |
| Copper-T / loop | Placed in the uterus | May irritate the uterus |
| Surgery | Vas deferens (vasectomy) or oviducts (tubectomy) blocked | Permanent; must be done safely |

Surgery can also end a pregnancy; misusing it after illegal **prenatal sex determination** leads to **female foeticide**, which is a crime in India and lowers the **child sex ratio**. Spacing and limiting births protects the health of the mother and helps families care for their children.`,
      [kt('Contraception', 'Methods used to prevent pregnancy.'), kt('Female foeticide', 'Killing of a female foetus, usually after illegal sex determination; a crime.')],
      table(['Disease', 'Cause'], [['Gonorrhoea', 'Bacteria'], ['Syphilis', 'Bacteria'], ['Warts', 'Virus'], ['HIV-AIDS', 'Virus']], 'Table of four sexually transmitted diseases and whether each is caused by bacteria or a virus'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Saying Plasmodium reproduces by binary fission (it is multiple fission).
- Saying variation is "created when needed"; it is already present and the environment decides who survives.
- Swapping ovule and ovary: ovule → seed, ovary → fruit.
- Treating pollination and fertilisation as the same event.
- Writing that fertilisation in humans happens in the uterus (it happens in the oviduct).
- Claiming pills or copper-T protect against STDs (only barrier methods reduce the spread).

**How marks are usually awarded**
- 1-mark items: correct option, term or example.
- 2–3-mark answers: name or term (1) + process or function (1) + example, reason or labelled diagram (1).
- 5-mark answers: labelled diagram (flower section, pollen tube, male or female system) (2) + process in the correct order (2) + one extra point such as significance (1).
- Case-based items: two 1-mark parts from the passage and a 2-mark part with an internal choice, often interpreting data.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Basic event in reproduction?', 'Making a copy of the DNA (with extra cell apparatus), followed by cell division.', 'concept', 1),
    fc(2, 'Why are offspring similar but not identical?', 'DNA copying is not perfectly accurate, so small variations arise.', 'concept', 1),
    fc(3, 'How does variation help a species?', 'If the environment changes drastically, a few individuals with suitable variations may survive and reproduce.', 'concept', 1),
    fc(4, 'Binary fission: two examples?', 'Amoeba (any plane) and Leishmania (definite plane).', 'example', 2),
    fc(5, 'Which organism shows multiple fission?', 'Plasmodium, the malaria parasite.', 'example', 2),
    fc(6, 'Fragmentation: example?', 'Spirogyra — the filament breaks into pieces that grow into new individuals.', 'example', 2),
    fc(7, 'Regeneration: example and limit?', 'Planaria and Hydra; not the usual way to reproduce, as most organisms do not depend on being cut.', 'concept', 2),
    fc(8, 'What is budding?', 'A bud grows from the parent by repeated cell division at one site and detaches when mature (Hydra, yeast).', 'definition', 2),
    fc(9, 'Why can Rhizopus spores survive dry air?', 'They have thick protective walls; they germinate when they reach a moist surface.', 'concept', 2),
    fc(10, 'Bryophyllum reproduces vegetatively using…?', 'Buds in the notches of its leaf margin.', 'fact', 2),
    fc(11, 'Three advantages of vegetative propagation?', 'Earlier flowering and fruiting; seedless plants can be grown; offspring keep the parent’s good qualities.', 'concept', 2),
    fc(12, 'Why are bananas grown from suckers?', 'Cultivated bananas do not produce viable seeds.', 'example', 2),
    fc(13, 'Why do germ cells have half the chromosomes?', 'So that the zygote formed by fusion has the normal number, keeping it constant across generations.', 'concept', 3),
    fc(14, 'Parts of a stamen?', 'Anther (makes pollen) and filament.', 'diagram', 3),
    fc(15, 'Parts of a pistil?', 'Stigma, style and ovary (with ovules).', 'diagram', 3),
    fc(16, 'Unisexual flower examples?', 'Papaya, watermelon.', 'example', 3),
    fc(17, 'Define pollination.', 'Transfer of pollen from an anther to a stigma.', 'definition', 3),
    fc(18, 'Role of the pollen tube?', 'Carries the male germ cell through the style to the female germ cell in the ovule.', 'concept', 3),
    fc(19, 'After fertilisation: ovule → ? ovary → ?', 'Ovule → seed; ovary → fruit.', 'fact', 3),
    fc(20, 'Plumule, radicle, cotyledon?', 'Plumule → shoot; radicle → root; cotyledons store food.', 'diagram', 3),
    fc(21, 'Why are testes in the scrotum?', 'Sperm formation needs a temperature lower than body temperature.', 'concept', 4),
    fc(22, 'What do seminal vesicles and prostate do?', 'Add fluid, so sperms travel in semen, which nourishes them and eases transport.', 'fact', 4),
    fc(23, 'Where does fertilisation occur in humans?', 'In the oviduct (fallopian tube).', 'fact', 4),
    fc(24, 'Function of the placenta?', 'Glucose and oxygen pass from mother to embryo; wastes pass from embryo to mother; villi give a large surface area.', 'concept', 4),
    fc(25, 'What is menstruation?', 'Monthly shedding of the thickened uterine lining as blood and mucus when the egg is not fertilised.', 'definition', 4),
    fc(26, 'One change common to boys and girls at puberty?', 'Thick hair grows in the armpits and genital area (also oilier skin and pimples).', 'fact', 4),
    fc(27, 'Bacterial and viral STDs?', 'Bacterial: gonorrhoea, syphilis. Viral: warts, HIV-AIDS.', 'fact', 5),
    fc(28, 'Which contraceptive also reduces STD spread?', 'The condom (a barrier method).', 'fact', 5),
    fc(29, 'How do oral contraceptive pills work?', 'They change the hormone balance so that eggs are not released.', 'concept', 5),
    fc(30, 'Vasectomy and tubectomy?', 'Surgical blocking of the vas deferens (male) or oviducts (female).', 'definition', 5),
    fc(31, 'Why is female foeticide harmful?', 'It is illegal, lowers the child sex ratio and harms the balance of society.', 'concept', 5),
    fc(32, 'Exam tip: pollination vs fertilisation?', 'Pollination = pollen reaches the stigma; fertilisation = germ cells fuse in the ovule. Pollination comes first.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
