// ch10 Reproduction — two decks: Part 1 (t01, t02) modes of reproduction and sexual reproduction in plants;
// Part 2 (t03, t04) human reproductive organs, adolescence and reproductive health.
import { sl, deck, table, svgV, r, near, dec } from './lib.mjs';
import { FISSION, MODES2, VEG, FLOWER, POLLEN, FRUIT, MALE, FEMALE } from './svgs.mjs';
import { addDays, seedsFrom } from './data.mjs';

const must = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};
const ex1 = { ovules: 36, pct: 75 };
ex1.seeds = seedsFrom(ex1.ovules, ex1.pct);
must(ex1.seeds === 27, 'chilli seeds');
const ex2 = { monthIdx: 5, day: 5, cycle: 30 };
ex2.next = addDays(ex2.monthIdx, ex2.day, ex2.cycle);
must(ex2.next.day === 5 && ex2.next.month === 'July', 'cycle date example');

export const V = {
  fission: svgV(FISSION, 'Binary fission in Amoeba, multiple fission in Plasmodium and budding in yeast, drawn in four stages each', 'Fission and budding.'),
  modes2: svgV(MODES2, 'Budding in Hydra, fragmentation in Spirogyra, regeneration in Planaria and spore formation in Rhizopus', 'Four more asexual methods.'),
  veg: svgV(VEG, 'Vegetative propagation: potato eye, Bryophyllum leaf plantlets, rose stem cutting and grafting', 'Vegetative propagation.'),
  flower: svgV(FLOWER, 'Section of a flower showing petal, sepal, stamen with anther and filament, and pistil with stigma, style, ovary and ovules', 'Parts of a flower.'),
  pollen: svgV(POLLEN, 'A pollen grain on the stigma grows a pollen tube through the style to the ovule, where the male gamete fuses with the egg cell', 'Pollen tube and fertilisation.'),
  fruit: svgV(FRUIT, 'An ovary with three ovules becomes a fruit with three seeds after fertilisation', 'Ovule to seed, ovary to fruit.'),
  male: svgV(MALE, 'Schematic of the human male reproductive system with testes, epididymis, vas deferens, seminal vesicles, prostate gland, urethra and penis', 'Male reproductive system.'),
  female: svgV(FEMALE, 'Schematic of the human female reproductive system with ovaries, fallopian tubes, uterus, cervix and vagina', 'Female reproductive system.'),
};

// =====================================================================================================================
export const deck1 = deck({
  part: 1,
  title: 'Reproduction — Part 1: Modes of reproduction and flowering plants',
  goals: [
    'Explain why organisms reproduce and distinguish asexual from sexual reproduction',
    'Describe fission, budding, fragmentation, regeneration, spore formation and vegetative propagation with examples',
    'Name the parts of a flower and describe pollination and fertilisation',
    'Explain how the ovule becomes a seed and the ovary becomes a fruit',
  ],
  slides: [
    sl('title', 'Reproduction', {
      b: 'Part 1: how living things make more of their own kind, from a single dividing cell to a flowering tree.',
      v: table(['Mode', 'Parents', 'Offspring', 'Example'], [['Asexual', 'one', 'identical to the parent', 'yeast budding, potato eyes'], ['Sexual', 'two (or two kinds of gamete)', 'a little different from each parent', 'flowering plants, humans']], 'Table comparing asexual and sexual reproduction by parents, offspring and example'),
      n: 'Every kind of living thing makes more of its own kind. This is called reproduction. Some organisms do it alone, by splitting or growing a new part. Others need two parents. In this part we look at both ways, and then follow a flower from pollination to seed and fruit.',
    }),
    sl('concept', 'Why do organisms reproduce?', {
      b: r`**Reproduction** is the making of new individuals of the same kind. It keeps a species going after individuals die. There are two main modes. In **asexual reproduction** a **single parent** makes offspring that are **identical** to it, without gametes. In **sexual reproduction** two special cells, the **male gamete** and the **female gamete**, fuse to make a **zygote** that grows into a new individual. Offspring then show **variation**.`,
      v: table(['Point', 'Asexual', 'Sexual'], [['Parents', 'one', 'usually two'], ['Gametes', 'not formed', 'formed and fused'], ['Offspring', 'identical copies (clones)', 'differ from each other and from parents'], ['Speed', 'usually fast', 'slower']], 'Table comparing asexual and sexual reproduction by parents, gametes, offspring and speed'),
      n: 'Reproduction keeps a species going after individuals die. In asexual reproduction, one parent makes offspring that are identical to it, and no gametes are needed. In sexual reproduction, a male gamete and a female gamete fuse to make a zygote, which grows into a new individual. These offspring show variation, so they are not exactly like their parents.',
    }),
    sl('diagram', 'Fission and budding', {
      b: r`In **binary fission** one cell divides into **two** daughter cells, as in *Amoeba*. In **multiple fission** the nucleus divides many times and the cell breaks into **many** daughter cells, as in *Plasmodium*, the malaria parasite. In **budding** a small outgrowth, the **bud**, forms on the parent, grows and separates; **yeast** reproduces this way, which is why dough and idli batter rise.`,
      v: V.fission,
      n: 'Look at the three rows. In binary fission, an Amoeba divides its nucleus and then its body into two daughter cells. In multiple fission, the nucleus of Plasmodium divides again and again and the cell breaks into many daughter cells. In budding, a yeast cell forms a small bud, which grows and then separates from the parent.',
    }),
    sl('diagram', 'Fragmentation, regeneration and spores', {
      b: r`***Hydra*** also reproduces by **budding**, but its bud grows into a small Hydra. In **fragmentation**, the body of *Spirogyra*, a green alga with a thread-like body, breaks into pieces and each piece grows into a new filament. In **regeneration**, a flatworm such as *Planaria* that is cut into pieces regrows the missing parts, so each piece can become a whole worm. In **spore formation**, *Rhizopus* (bread mould) makes tiny spores in round **sporangia**; spores float in air and grow on damp food.`,
      v: V.modes2,
      n: 'Hydra reproduces by budding, and its bud grows into a small Hydra. Spirogyra breaks into pieces, and each piece grows into a new filament. This is fragmentation. A Planaria that is cut into pieces regrows the missing parts. This is regeneration. And the bread mould Rhizopus makes tiny spores in round sporangia. The spores float in the air and grow on damp food.',
    }),
    sl('check', 'Quick check: name the method', {
      b: 'Decide which mode of asexual reproduction a described organism uses.',
      n: 'Quick check. Think about how you can tell budding from fission when you look at a dividing cell.',
      chk: 'chk-mode',
    }),
    sl('diagram', 'Vegetative propagation', {
      b: r`In **vegetative propagation** a new plant grows from a **vegetative part** of the parent: a root, stem or leaf. A potato tuber sprouts from its **eyes**; a *Bryophyllum* leaf grows **plantlets** at its notches; a **rose cutting** with a node makes roots in soil. In **grafting** a cut shoot, the **scion**, is joined to a rooted plant, the **stock**. Gardeners use these methods to keep a good variety and to grow plants that rarely make seeds.`,
      v: V.veg,
      n: 'In vegetative propagation, a new plant grows from a root, stem or leaf of the parent. A potato sprouts from its eyes. A Bryophyllum leaf grows tiny plantlets at its notches. A rose cutting with a node makes roots when planted. In grafting, a cut shoot, the scion, is joined to a rooted plant, the stock. Gardeners use these methods to keep a good variety.',
    }),
    sl('example', 'Worked example: which method is it?', {
      b: r`**Problem.** Name the mode of reproduction in each case: (a) a dosa batter froths because of cells with small outgrowths; (b) a leaf dropped in damp soil grows tiny plants at its edge; (c) a pond thread breaks in a storm and each piece grows; (d) a cell splits equally into two.

**Step 1.** Look for the clue word in each case: outgrowth, leaf, break, split.

**Step 2.** (a) **budding** in yeast; (b) **vegetative propagation** (leaf of Bryophyllum); (c) **fragmentation** (Spirogyra); (d) **binary fission**.`,
      v: table(['Case', 'Clue', 'Method'], [['dosa batter froths', 'small outgrowths', 'budding (yeast)'], ['leaf grows plantlets', 'a leaf makes new plants', 'vegetative propagation'], ['thread breaks, pieces grow', 'breaks into pieces', 'fragmentation'], ['cell splits equally', 'two equal cells', 'binary fission']], 'Table of four cases with the clue and the mode of reproduction'),
      n: 'To name a method, look for the clue. A dosa batter that froths has yeast cells with small outgrowths, which is budding. A leaf that grows tiny plants at its edge shows vegetative propagation. A pond thread that breaks, with each piece growing, is fragmentation. A cell that splits equally into two is binary fission.',
    }),
    sl('concept', 'Sexual reproduction', {
      b: r`In sexual reproduction two **gametes** fuse in **fertilisation** to form a **zygote**, which develops into an **embryo**. A **male gamete** is small and moves; a **female gamete**, the **egg**, is large and holds food. Because the offspring get material from both parents, they show **variation**, which helps a species when conditions change. Sexual reproduction is slower and needs more energy than asexual reproduction.`,
      v: table(['Term', 'Meaning'], [['Gamete', 'a sex cell, male or female'], ['Fertilisation', 'fusion of a male gamete with an egg'], ['Zygote', 'the cell formed by fertilisation'], ['Embryo', 'the young organism that grows from the zygote']], 'Table of four terms of sexual reproduction with their meaning'),
      n: 'In sexual reproduction, two gametes fuse in fertilisation to make a zygote, which grows into an embryo. The male gamete is small and can move. The female gamete, the egg, is large and holds food. The offspring get material from both parents, so they show variation. This helps a species when its surroundings change.',
    }),
    sl('concept', 'Parts of a flower', {
      b: r`The flower is the **reproductive part** of a flowering plant. **Sepals** protect the bud and **petals** attract insects. The **stamen** is the **male** part: an **anther** that makes **pollen grains** on a **filament**. The **pistil** (carpel) is the **female** part: **stigma** (sticky top), **style** and **ovary**, which holds **ovules**, each with an egg cell. A flower with both stamens and pistil is **bisexual**, as in hibiscus; a flower with only one is **unisexual**, as in papaya.`,
      v: table(['Part', 'Job'], [['Sepal', 'protects the bud'], ['Petal', 'attracts insects and birds'], ['Stamen (anther + filament)', 'makes pollen grains (male)'], ['Pistil (stigma + style + ovary)', 'receives pollen, holds ovules (female)']], 'Table of the main parts of a flower and the job of each'),
      n: 'The flower is the reproductive part of a plant. Sepals protect the bud and petals attract insects. The stamen is the male part, with an anther that makes pollen grains on a filament. The pistil is the female part, with a sticky stigma, a style and an ovary that holds the ovules. A flower with both parts is bisexual, like hibiscus. One with only one kind is unisexual, like papaya.',
    }),
    sl('diagram', 'Section through a flower', {
      b: r`The diagram shows the stamens with their anthers and filaments, and the pistil with stigma, style and ovary. Each **ovule** in the ovary contains an **egg cell**. After fertilisation the ovule will become a seed.`,
      v: V.flower,
      n: 'Here is a flower cut in half. On each side is a stamen, with an anther on a filament. In the centre is the pistil. It has a stigma at the top, a long style, and an ovary at the base. Inside the ovary are the ovules. Each ovule holds an egg cell, and after fertilisation it will become a seed.',
    }),
    sl('check', 'Quick check: parts of a flower', {
      b: 'Decide which part of the flower makes pollen.',
      n: 'Quick check. Think about which part of the flower makes the male cells, and which part receives them.',
      chk: 'chk-flower',
    }),
    sl('concept', 'Pollination', {
      b: r`**Pollination** is the transfer of pollen from an **anther** to a **stigma**. In **self-pollination** the pollen reaches a stigma of the **same flower** (or another flower of the same plant). In **cross-pollination** it reaches a flower of **another plant** of the same kind, which gives more variation. **Agents** carry the pollen: insects, wind, water, birds or bats.`,
      v: table(['Agent', 'Flower features', 'Example'], [['Insects (bees, butterflies)', 'bright petals, scent, nectar, sticky pollen', 'mustard, sunflower'], ['Wind', 'small flowers, light dry pollen, feathery stigma', 'maize, wheat'], ['Water', 'pollen floats on water', 'Vallisneria'], ['Birds and bats', 'large, bright or strong-smelling flowers with nectar', 'silk cotton']], 'Table of pollination agents with flower features and examples'),
      n: 'Pollination is the transfer of pollen from an anther to a stigma. In self pollination, the pollen reaches a stigma of the same flower, or of another flower on the same plant. In cross pollination, it reaches a flower of another plant of the same kind. Insects, wind, water, birds and bats carry the pollen. Bright, scented flowers attract insects, while wind pollinated flowers have light, dry pollen.',
    }),
    sl('diagram', 'Pollen tube and fertilisation', {
      b: r`A pollen grain that lands on a suitable stigma grows a **pollen tube** down through the style to an ovule. The **male gamete** travels along the tube and **fuses with the egg cell**. This is **fertilisation**, and it forms the **zygote**, which divides to form the **embryo**.`,
      v: V.pollen,
      n: 'A pollen grain that lands on the stigma grows a pollen tube down through the style. The tube reaches an ovule in the ovary. The male gamete travels along the tube and fuses with the egg cell. This is fertilisation. It makes a zygote, which divides to form the embryo.',
    }),
    sl('example', 'Worked example: ovules to seeds', {
      b: r`**Problem.** A chilli ovary has ${ex1.ovules} ovules. If ${ex1.pct} % of them are fertilised, how many seeds will the chilli have?

**Step 1.** Each **fertilised ovule** becomes **one seed**.

**Step 2.** Seeds $= \dfrac{${ex1.pct}}{100} \times ${ex1.ovules} = ${ex1.seeds}$.

The remaining ${ex1.ovules - ex1.seeds} ovules are not fertilised and do not form seeds.`,
      v: table(['Quantity', 'Value'], [['Ovules in the ovary', String(ex1.ovules)], ['Fraction fertilised', `${ex1.pct} %`], ['Seeds formed', String(ex1.seeds)], ['Ovules that do not form seeds', String(ex1.ovules - ex1.seeds)]], 'Table of ovules, fraction fertilised, seeds formed and ovules without seeds'),
      n: 'A chilli ovary has thirty six ovules, and seventy five percent are fertilised. Each fertilised ovule becomes one seed. Seventy five hundredths of thirty six is twenty seven. So the chilli has twenty seven seeds, and the other nine ovules do not form seeds.',
    }),
    sl('diagram', 'After fertilisation: seed and fruit', {
      b: r`After fertilisation the **ovule** becomes the **seed**, with the embryo inside. The **ovary** grows and becomes the **fruit**, and the ovary wall becomes the fruit wall. Petals and sepals usually dry up and fall. Fruit protects the seeds and often helps them spread.`,
      v: V.fruit,
      n: 'After fertilisation, the ovule becomes the seed, with the embryo inside it. The ovary grows and becomes the fruit, and the ovary wall becomes the wall of the fruit. The petals and sepals usually dry up and fall. The fruit protects the seeds and often helps them to spread.',
    }),
    sl('check', 'Quick check: seed and fruit', {
      b: 'Decide which flower part becomes the fruit.',
      n: 'Quick check. Think about which part of the flower grows into a fruit, and which part becomes the seed.',
      chk: 'chk-fruit',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Asexual reproduction: one parent, identical offspring; fission, budding, fragmentation, regeneration, spores, vegetative propagation.',
        'Sexual reproduction: fusion of male and female gametes to form a zygote; offspring show variation.',
        'Flower: sepal, petal, stamen (anther, filament), pistil (stigma, style, ovary with ovules).',
        'Pollination moves pollen from anther to stigma; self or cross, by insects, wind, water, birds or bats.',
        'Fertilisation: pollen tube carries the male gamete to the egg; ovule becomes seed, ovary becomes fruit.',
      ],
      v: table(['Before', 'After fertilisation'], [['zygote', 'embryo'], ['ovule', 'seed'], ['ovary', 'fruit'], ['ovary wall', 'fruit wall']], 'Table of flower parts before fertilisation and what they become'),
      n: 'To sum up. Asexual reproduction needs one parent and gives identical offspring. Sexual reproduction joins a male and a female gamete. A flower has sepals, petals, stamens and a pistil. Pollen moves from anther to stigma by pollination. After fertilisation the zygote becomes the embryo, the ovule becomes the seed, and the ovary becomes the fruit.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Name the organism and the method together, for example budding in yeast.',
        'Draw simple labelled diagrams: label stigma, style, ovary and ovule on the pistil.',
        'Define pollination as transfer of pollen from anther to stigma, not as fertilisation.',
        'Write the changes after fertilisation in pairs: ovule to seed, ovary to fruit.',
        'Compare asexual and sexual reproduction in a table with at least three points.',
      ],
      n: 'Some exam tips. Always name the organism and the method together. Draw simple labelled diagrams, and label the stigma, style, ovary and ovule. Do not mix up pollination and fertilisation. Write the changes after fertilisation in pairs, ovule to seed and ovary to fruit. And compare asexual and sexual reproduction in a table.',
    }),
  ],
});

// =====================================================================================================================
export const deck2 = deck({
  part: 2,
  title: 'Reproduction — Part 2: Human reproduction and reproductive health',
  goals: [
    'Name the male and female reproductive organs and state the function of each',
    'Describe fertilisation and the early development of the embryo in simple terms',
    'Explain the body changes of adolescence and the menstrual cycle',
    'Describe good hygiene, nutrition and habits, and know when and whom to ask for help',
  ],
  slides: [
    sl('title', 'Human reproduction and growing up', {
      b: 'Part 2: how the human body makes new life, how it changes during adolescence, and how to look after it.',
      v: table(['Topic', 'Key idea'], [['Reproductive organs', 'male and female organs make gametes'], ['Fertilisation', 'sperm fuses with egg inside the body'], ['Adolescence', 'body, mind and feelings change'], ['Reproductive health', 'hygiene, food, sleep, and asking trusted adults']], 'Table of four topics of Part 2 with the key idea of each'),
      n: 'Humans reproduce sexually. In this part we look at the male and female reproductive organs and what they do. Then we talk about adolescence, the years when the body changes. These changes are natural and happen to everyone. We end with how to keep healthy, and whom to ask when you have questions.',
    }),
    sl('concept', 'Gametes and fertilisation in humans', {
      b: r`The male gamete is the **sperm**, a tiny cell with a tail so it can swim. The female gamete is the **egg** (ovum), a much larger round cell. Humans have **internal fertilisation**: a sperm meets the egg **inside the female body**. The zygote then divides and the embryo settles in the **uterus**, where it grows for about nine months.`,
      v: table(['Gamete', 'Made in', 'Features'], [['Sperm', 'testes', 'very small, has a tail, many are made'], ['Egg', 'ovaries', 'large, round, carries food, about one released each month']], 'Table comparing the sperm and the egg by where they are made and their features'),
      n: 'The male gamete is the sperm. It is tiny and has a tail for swimming. The female gamete is the egg, which is much larger and round. In humans, fertilisation is internal, which means that a sperm meets the egg inside the female body. The zygote divides, and the embryo settles in the uterus, where it grows for about nine months.',
    }),
    sl('diagram', 'The male reproductive system', {
      b: r`This is a simple labelled outline. The **testes** make sperms and the hormone testosterone. They hang in the **scrotum**, which keeps them slightly cooler than the rest of the body. Each testis is joined to an **epididymis** where sperms are stored, and a **vas deferens**, a tube that carries sperms up. The **seminal vesicles** and the **prostate gland** add fluids; together with the sperms they form **semen**. The **urethra** carries semen, and also urine, out through the **penis**.`,
      v: V.male,
      n: 'This is a simple outline of the male reproductive system. The testes make sperms. They lie in a sac called the scrotum. Each testis is joined to an epididymis, where sperms are stored, and a tube called the vas deferens. The seminal vesicles and the prostate gland add fluids to form semen. The urethra carries semen, and also urine, out through the penis.',
    }),
    sl('concept', 'Male organs and their functions', {
      b: r`Each organ has a job in making and carrying sperms.`,
      v: table(['Organ', 'Function'], [['Testis', 'makes sperms and the male hormone testosterone'], ['Scrotum', 'holds the testes outside the body, slightly cooler'], ['Epididymis', 'stores sperms while they mature'], ['Vas deferens', 'carries sperms towards the urethra'], ['Seminal vesicles and prostate', 'add fluids that nourish the sperms (semen)'], ['Urethra and penis', 'pass semen (and urine) out of the body']], 'Table of the male reproductive organs and the function of each'),
      n: 'Each male organ has a job. The testis makes sperms and the hormone testosterone. The scrotum holds the testes slightly cooler than the body. The epididymis stores sperms while they mature. The vas deferens carries sperms towards the urethra. The seminal vesicles and prostate add fluids. The urethra and penis pass semen, and also urine, out of the body.',
    }),
    sl('check', 'Quick check: male organs', {
      b: 'Decide which organ makes the sperms.',
      n: 'Quick check. Think about which male organ makes sperms and which one only stores or carries them.',
      chk: 'chk-testis',
    }),
    sl('diagram', 'The female reproductive system', {
      b: r`This is a simple labelled outline. The two **ovaries** make eggs and the female hormones. A **fallopian tube** (oviduct) leads from each ovary to the **uterus** (womb). The uterus is a muscular organ with a soft lining; it narrows to the **cervix**, which opens into the **vagina**, the passage to the outside.`,
      v: V.female,
      n: 'This is a simple outline of the female reproductive system. The two ovaries make eggs and female hormones. A fallopian tube leads from each ovary to the uterus, or womb. The uterus is a muscular organ with a soft lining. It narrows to the cervix, which opens into the vagina, the passage to the outside of the body.',
    }),
    sl('concept', 'Female organs and their functions', {
      b: r`About **one egg** is released from an ovary each month. **Fertilisation** usually takes place in the fallopian tube, and the zygote moves to the uterus.`,
      v: table(['Organ', 'Function'], [['Ovary', 'makes eggs and the female hormones'], ['Fallopian tube (oviduct)', 'picks up the egg; the usual place of fertilisation'], ['Uterus (womb)', 'where the embryo settles and grows'], ['Cervix', 'the narrow lower end of the uterus'], ['Vagina', 'passage that connects the uterus to the outside']], 'Table of the female reproductive organs and the function of each'),
      n: 'In the female body, the ovary makes eggs and female hormones. About one egg is released each month. The fallopian tube picks up the egg, and fertilisation usually takes place there. The uterus is where the embryo settles and grows. The cervix is the narrow lower end of the uterus, and the vagina is the passage that connects it to the outside.',
    }),
    sl('example', 'Worked example: following an egg', {
      b: r`**Problem.** Trace the path of an egg that is fertilised, and say where each stage happens.

**Step 1.** The egg is released from an **ovary** and enters the **fallopian tube**.

**Step 2.** A sperm fuses with it in the tube: **fertilisation**, forming a **zygote**.

**Step 3.** The zygote divides as it moves to the **uterus**, where the embryo settles in the soft lining and grows.`,
      v: table(['Stage', 'Where it happens'], [['Egg released', 'ovary'], ['Fertilisation', 'fallopian tube'], ['Zygote divides', 'on its way down the tube'], ['Embryo grows', 'uterus']], 'Table of the stages from egg release to embryo growth and where each happens'),
      n: 'Let us follow an egg. It is released from an ovary and enters the fallopian tube. If a sperm meets it there, they fuse, which is fertilisation, and a zygote forms. The zygote divides as it moves towards the uterus. There the embryo settles in the soft lining of the uterus and grows.',
    }),
    sl('check', 'Quick check: fertilisation', {
      b: 'Decide where fertilisation usually takes place.',
      n: 'Quick check. Think about where in the female body the egg and the sperm usually meet.',
      chk: 'chk-egg',
    }),
    sl('concept', 'Adolescence and puberty', {
      b: r`**Adolescence** is the stage between childhood and adulthood, from about age 10 to 19. **Puberty**, when the body becomes able to reproduce, usually starts between about 10 and 14, earlier in some people and later in others, and **both are normal**. Changes are caused by **hormones**, chemical messengers in the blood. They affect the body, and also feelings and thoughts.`,
      v: table(['Changes', 'In girls', 'In boys', 'In both'], [['Body', 'breasts develop, hips widen, periods begin', 'voice deepens, shoulders broaden, facial hair', 'growth spurt, hair under the arms, oilier skin and pimples'], ['Feelings', 'mood swings, new interests', 'mood swings, new interests', 'more independence, strong feelings']], 'Table of body and feeling changes at puberty in girls, in boys and in both'),
      n: 'Adolescence is the stage between childhood and adulthood, from about age ten to nineteen. Puberty usually starts between about ten and fourteen, earlier in some people and later in others, and both are normal. Hormones cause the changes. Girls develop breasts and have periods. Boys get a deeper voice and facial hair. Both have a growth spurt and may get pimples.',
    }),
    sl('concept', 'The menstrual cycle', {
      b: r`In girls, the lining of the uterus thickens each month to prepare for an embryo. If no egg is fertilised, the lining and a little blood leave through the vagina. This is **menstruation**, or a **period**. It is a **natural**, healthy process. It lasts about **3 to 7 days**, and a cycle is often around 28 days (it can be 21 to 35 days). In the first years the cycle may be **irregular**.`,
      v: table(['Phase', 'About when', 'What happens'], [['Menstruation', 'days 1 to 5', 'lining and blood leave the body'], ['Rebuilding', 'days 6 to 13', 'a new lining grows; an egg ripens'], ['Egg release', 'around day 14', 'an egg leaves the ovary'], ['Preparing', 'days 15 to 28', 'lining stays thick; if no egg is fertilised, it will shed']], 'Table of four phases of the menstrual cycle with timing and what happens'),
      n: 'In girls, the lining of the uterus thickens each month. If no egg is fertilised, the lining and a little blood leave through the vagina. This is menstruation, or a period. It is natural and healthy. It lasts about three to seven days, and a cycle is often about twenty eight days, though it can be from twenty one to thirty five. In the first years, cycles may be irregular.',
    }),
    sl('example', 'Worked example: marking the calendar', {
      b: r`**Problem.** Meena notes 5 June as the first day of her period. Her cycle is ${ex2.cycle} days. When should she expect the next period to start?

**Step 1.** Add the cycle length: $5 + ${ex2.cycle} = ${ex2.day + ex2.cycle}$.

**Step 2.** June has 30 days, so subtract 30 and move to July: $${ex2.day + ex2.cycle} - 30 = ${ex2.next.day}$.

The next period is expected around **${ex2.next.day} ${ex2.next.month}**. Because cycles can vary by a few days, this is only an estimate.`,
      v: table(['Step', 'Working'], [['First day of period', '5 June'], ['Cycle length', `${ex2.cycle} days`], ['Add', `5 + ${ex2.cycle} = ${ex2.day + ex2.cycle}`], ['Next expected', `${ex2.next.day} ${ex2.next.month}`]], 'Table of the first day, cycle length, addition and next expected date for a calendar example'),
      n: 'Meena marks the fifth of June as the first day of her period, and her cycle is thirty days long. Add thirty to five to get thirty five. June has thirty days, so subtract thirty. The next period is expected around the fifth of July. Since cycles can vary by a few days, this is only an estimate, and keeping a calendar helps.',
    }),
    sl('concept', 'Menstrual hygiene', {
      b: r`Periods are not dirty or shameful. Good habits prevent infection and discomfort. Use a clean **pad**, **cloth that is washed and dried in sunlight**, or other safe product, and **change it every 4 to 6 hours**. Wash hands before and after changing. Wrap used pads and throw them in a dustbin, never down the toilet. Bathe daily and wear clean undergarments. Have **school and home toilets** with water, privacy and a bin.`,
      v: table(['Do', 'Why'], [['change the pad every 4 to 6 hours', 'prevents rashes and infection'], ['wash hands before and after', 'keeps germs away'], ['dispose of used pads in a dustbin', 'keeps drains and the environment clean'], ['bathe daily with clean water', 'keeps the skin healthy'], ['wash and sun-dry reusable cloth', 'sunlight kills germs']], 'Table of five menstrual hygiene habits and the reason for each'),
      n: 'Periods are not dirty or shameful. Good habits prevent infection. Use a clean pad, or a cloth that is washed and dried in sunlight, and change it every four to six hours. Wash your hands before and after. Wrap used pads and put them in a dustbin. Bathe daily and wear clean clothes. Schools and homes should have toilets with water, privacy and a bin.',
    }),
    sl('check', 'Quick check: hygiene', {
      b: 'Decide the healthiest habit during a period.',
      n: 'Quick check. Think about what the best habit is for staying clean and comfortable during a period.',
      chk: 'chk-hygiene',
    }),
    sl('concept', 'Looking after your body', {
      b: r`Hormones make the body grow fast, so it needs good care. Eat **balanced meals** with dal, milk, eggs or pulses, green leafy vegetables, fruit and whole grains. **Iron-rich foods**, such as spinach, jaggery and dal, are important for girls because of monthly blood loss. Drink clean water, **sleep 8 to 9 hours**, play or exercise every day, and wash your face and body daily because oily skin can cause pimples. Avoid **tobacco and other drugs**.`,
      v: table(['Habit', 'Benefit'], [['balanced meals with iron and calcium', 'healthy growth, strong bones and blood'], ['clean water and daily bath', 'prevents infections and skin problems'], ['8 to 9 hours of sleep', 'body and mind recover and grow'], ['daily play or exercise', 'strong muscles, good mood'], ['staying away from tobacco and drugs', 'protects lungs, brain and body']], 'Table of five healthy habits during adolescence and the benefit of each'),
      n: 'The body grows fast in adolescence, so it needs care. Eat balanced meals with dal, milk, vegetables, fruit and grains. Iron rich foods such as spinach and jaggery are important, especially for girls. Drink clean water, sleep eight to nine hours, and play or exercise every day. Wash your face and body daily. Stay away from tobacco and other drugs.',
    }),
    sl('concept', 'Myths and facts', {
      b: r`Many wrong ideas are passed around. Correct facts help you feel confident.`,
      v: table(['Myth', 'Fact'], [['A period makes a girl impure', 'A period is a normal body process; there is nothing impure about it'], ['Girls should not exercise or bathe during periods', 'Light exercise and daily baths are healthy'], ['A boy whose voice cracks is ill', 'A cracking voice is a normal part of growing up'], ['Pimples come from bad behaviour or one food', 'Pimples come from hormones and oily skin; wash gently and ask a doctor if severe'], ['Everyone should change at the same age', 'Each person grows at their own pace']], 'Table of five myths about adolescence and the correct fact for each'),
      n: 'Let us look at some myths. Some people say a period makes a girl impure. A period is a normal body process, and nothing about it is impure. Some think girls should not bathe or exercise during periods, but light exercise and daily baths are healthy. A cracking voice in a boy is normal. Pimples come from hormones and oily skin. And everyone grows at their own pace.',
    }),
    sl('concept', 'Whom to ask, and staying safe', {
      b: r`It is normal to have questions. Ask a **parent, elder, teacher, school counsellor, doctor** or a trained health worker, and use reliable books. See a doctor if a period is very painful, very heavy, or stops for months after it was regular, or if you feel very low or worried. **Your body belongs to you.** If anyone makes you feel uncomfortable or touches you in a way you do not like, say no, move away and tell a trusted adult at once.`,
      v: table(['If this happens', 'What to do'], [['you have a question about growing up', 'ask a trusted adult, teacher or doctor'], ['period pain is very strong or very heavy', 'tell an adult and see a doctor'], ['you feel worried, very sad or angry for long', 'talk to someone you trust or the school counsellor'], ['someone makes you uncomfortable', 'say no, go away and tell a trusted adult']], 'Table of four situations and what to do in each'),
      n: 'It is normal to have questions. Ask a parent, an elder, a teacher, a school counsellor or a doctor. See a doctor if a period is very painful or very heavy, or if you feel worried for a long time. Your body belongs to you. If anyone makes you feel uncomfortable, say no, move away, and tell a trusted adult at once.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Testes make sperms; ovaries make eggs. Fertilisation is internal, usually in the fallopian tube.',
        'The embryo grows in the uterus for about nine months.',
        'Puberty is driven by hormones; the changes are natural and vary from person to person.',
        'Menstruation is the natural monthly shedding of the uterine lining; hygiene means a clean pad or cloth changed every 4 to 6 hours.',
        'Good food, sleep, exercise and cleanliness keep adolescents healthy; ask trusted adults or doctors when in doubt.',
      ],
      v: table(['Organ', 'Gamete or role'], [['Testis', 'sperm'], ['Ovary', 'egg'], ['Fallopian tube', 'fertilisation'], ['Uterus', 'growth of the embryo']], 'Table of four reproductive organs and their gamete or role'),
      n: 'To sum up. The testes make sperms and the ovaries make eggs. Fertilisation is internal, usually in the fallopian tube, and the embryo grows in the uterus. Puberty is caused by hormones, and the changes are natural. Menstruation is the monthly shedding of the uterine lining. Good food, sleep, exercise and cleanliness keep adolescents healthy. When in doubt, ask a trusted adult or a doctor.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw the reproductive systems as simple labelled outlines; label testis, vas deferens, ovary, fallopian tube and uterus.',
        'Give the function next to each organ name, in a table.',
        'Use correct, respectful scientific words such as menstruation and puberty.',
        'For hygiene answers, give practical points: change every 4 to 6 hours, wash hands, dispose safely.',
        'In myth and fact answers, state the correct fact in one clear sentence.',
      ],
      n: 'Some exam tips. Draw the reproductive systems as simple labelled outlines. Give the function next to each organ in a table. Use correct, respectful words such as menstruation and puberty. For hygiene answers, give practical points, such as changing the pad every four to six hours, washing hands and disposing of it safely. For myths, state the correct fact in one clear sentence.',
    }),
  ],
});
