// ch10 Reproduction — question bank. MCQ keys are placed by the builder (balanced).
// AR keys planned: clone a, seed b, internal c, cross d, wind a, bath c.
// Numericals (ovules to seeds, calendar dates) are computed in data.mjs, interpolated and re-solved.
import { mk, add, r, near, dec } from './lib.mjs';
import { addDays, seedsFrom } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;

// ---------------------------------------------------------------- t01 modes of reproduction
add('chk-mode', mcq({
  stem: 'Under a microscope, a student sees a baker\'s yeast cell with a small round swelling on its side, smaller than the cell itself. This is most likely:',
  right: 'budding, a form of asexual reproduction',
  wrong: ['binary fission, because the two parts are equal', 'fertilisation, because two cells have fused', 'regeneration after the cell was cut'],
  sol: 'A small outgrowth that is smaller than the parent is a bud, so the yeast is reproducing by budding — option (@K). Binary fission gives two equal parts.',
  d: 2, c: 'application', t: [1],
}));
add('m-fission', mcq({
  stem: 'A malaria parasite inside a red blood cell divides its nucleus several times and then breaks into many small cells. This is:',
  right: 'multiple fission, which gives many daughter cells',
  wrong: ['binary fission, which gives two daughter cells', 'budding, which gives a small outgrowth', 'fragmentation, which needs a thread-like body'],
  sol: 'Repeated nuclear division followed by break-up into many cells is multiple fission — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('m-clone', mcq({
  stem: 'A farmer cuts a seed potato into four pieces, each with a bud (eye), and plants all four. The four plants will be:',
  right: 'nearly identical to each other and to the parent plant',
  wrong: ['quite different from one another, like children of two parents', 'weaker, because no gametes were used', 'unable to make tubers of their own'],
  sol: 'This is vegetative propagation from one parent, with no gametes, so the plants are clones of the parent and of each other — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('m-spore', mcq({
  stem: 'Spores of a mould can spread over a wide area and are made in very large numbers. Which feature of spores explains how this helps the mould?',
  right: 'They are tiny and light, so air carries them and some will land on food',
  wrong: ['Each spore is a large cell with stored food', 'Each spore is produced after two parents fuse', 'Spores only form when the mould is cut into pieces'],
  sol: 'Tiny, light spores float in air, and since there are so many, some reach damp food and grow — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('m-veg', mcq({
  stem: 'In a rubber plantation in Kerala, a bud from a high-yielding tree is fixed on a young rooted plant of another tree. This method is called:',
  right: 'grafting, a kind of vegetative propagation',
  wrong: ['budding, as done by yeast', 'fragmentation, as done by Spirogyra', 'regeneration, as done by Planaria'],
  sol: 'Joining a cut part (the scion) to a rooted plant (the stock) is grafting — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('ar-clone', ar({
  a: 'Plants grown from the eyes of one potato are almost identical to the parent.',
  r: 'Vegetative propagation does not involve the fusion of gametes.',
  key: 'a',
  sol: 'A is true. R is true, and it explains A: with no gametes and no mixing of material from two parents, the offspring are copies — option (a).',
  d: 2, c: 'analysis', t: [1],
}));
add('tf-yeast', tf({
  stem: 'Yeast reproduces by binary fission, producing two equal cells.',
  key: 'f',
  sol: 'False. Yeast reproduces by budding: a small bud grows on the parent and separates.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-spore', fill({
  stem: 'In bread mould, the round sporangia release tiny cells called ___ that grow on damp food.',
  acc: [['spores', 'spore']],
  sol: 'Sporangia release **spores**.',
  d: 1, c: 'recall', t: [1],
}));
add('match-method', match({
  stem: 'Match each organism or plant (Column A) with the method by which it reproduces asexually (Column B).',
  pairs: [
    ['A green thread in a pond that breaks into pieces', 'Fragmentation'],
    ['A flatworm cut in two that regrows', 'Regeneration'],
    ['A small outgrowth on the body wall of Hydra', 'Budding'],
    ['A leaf of Bryophyllum with plantlets at its notches', 'Vegetative propagation'],
  ],
  order: [2, 3, 0, 1],
  sol: 'Spirogyra threads fragment, a cut flatworm regenerates, Hydra forms buds, and Bryophyllum leaves make plantlets (vegetative propagation).',
  d: 2, c: 'understanding', t: [1],
}));
add('s2-yeast', short({
  marks: 2,
  stem: 'A spoonful of yeast is added to sugar solution in a warm place, and after a few hours the liquid is cloudy with many more yeast cells. Explain how the number of cells increased.',
  model: 'Yeast reproduces by budding. A small bud forms on a parent cell, grows, receives a nucleus and separates as a new cell. In warm sugar solution this happens quickly in many cells at once, so the number of cells rises fast.',
  sol: 'Budding: bud forms, grows and separates; fast in warm sugar solution.',
  scheme: [['Yeast reproduces by budding: a bud grows and separates', 1], ['Many cells bud quickly in warm, sugary conditions', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s3-modes', short({
  marks: 3,
  stem: 'State three differences between asexual and sexual reproduction.',
  model: 'Asexual reproduction needs only one parent, while sexual reproduction usually involves two. Asexual reproduction forms no gametes, but sexual reproduction depends on the fusion of a male and a female gamete. The offspring of asexual reproduction are identical to the parent, whereas sexual offspring show variation and differ from both parents.',
  sol: 'One parent versus two; no gametes versus gametes; identical versus varied offspring.',
  scheme: [['Number of parents', 1], ['Formation and fusion of gametes', 1], ['Offspring identical versus varied', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('s3-veg', short({
  marks: 3,
  stem: 'Give three advantages of growing new plants by vegetative propagation, with an example of a plant grown in this way.',
  model: 'Vegetative propagation is faster than growing from seed, so a gardener gets flowering or fruiting plants sooner. It keeps all the good qualities of the parent, because the new plants are identical to it. It also works for plants that rarely make seeds, such as the rose, which is grown from stem cuttings, and Bryophyllum, grown from its leaf plantlets.',
  sol: 'Faster; keeps qualities of parent; works for seedless plants; rose cutting.',
  scheme: [['Faster growth', 1], ['Keeps good qualities because plants are identical', 1], ['Works for plants without seeds, with an example', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('l-asex', long({
  stem: '(a) What is asexual reproduction?\n\n(b) Describe, with simple labelled sketches, binary fission in Amoeba and budding in yeast.\n\n(c) Name one organism that reproduces by fragmentation and say how.',
  model: 'Asexual reproduction is reproduction by a single parent without gametes, so offspring are identical to it. In Amoeba the nucleus lengthens and divides, the cell pinches in the middle, and two daughter cells form. In yeast a small bud appears on the parent cell, grows and receives a nucleus, then separates as a new cell. Spirogyra reproduces by fragmentation: its thread-like body breaks into pieces and each piece grows into a new filament.',
  sol: 'Definition; Amoeba fission steps; yeast budding steps; Spirogyra fragmentation.',
  scheme: [['(a) One parent, no gametes, identical offspring', 1], ['(b) Steps of fission and budding with labelled sketches', 3], ['(c) Spirogyra breaks into pieces that grow', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('case-aquarium', (() => {
  const rows = [[0, 1, 0], [3, 1, 1], [6, 1, 2], [9, 3, 0]];
  return mk.case({
    passage: r`A school science club keeps one Hydra in an aquarium and counts it every third day. The counts are given for practice.

| Day | Full-grown Hydra | Buds attached |
|---|---|---|
${rows.map(([d, a, b]) => `| ${d} | ${a} | ${b} |`).join('\n')}`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'The change from day 0 to day 9 shows which mode of reproduction?',
        right: 'Budding',
        wrong: ['Fragmentation', 'Spore formation', 'Fertilisation'],
        sol: 'Buds appear on the parent, grow, and separate as new Hydra by day 9 — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', short({
        marks: 1, wl: null,
        stem: 'How many new Hydra were formed by day 9?',
        model: r`$3 - 1 = 2$ new Hydra.`,
        sol: 'New Hydra = 3 − 1 = 2.',
        scheme: [['2 new Hydra', 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2, wl: null,
        stem: 'Why are the new Hydra almost identical to the parent?',
        model: 'They come from one parent by budding, without the fusion of gametes, so they receive the same material as the parent and are clones of it.',
        sol: 'One parent, no gametes, so identical.',
        scheme: [['Formed from a single parent, with no gametes', 1], ['So they are identical copies (clones)', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2, wl: null,
          stem: 'The club says this reproduction is asexual. Give two reasons from the table.',
          model: 'Only one parent was present in the aquarium at the start, and the new Hydra appeared as buds on its body. No male and female gametes were involved, so it is asexual reproduction.',
          sol: 'Single parent; buds on its body; no gametes.',
          scheme: [['Started with a single parent', 1], ['New individuals grew as buds on its body, with no gametes', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  });
})(), null);

// ---------------------------------------------------------------- t02 sexual reproduction in plants
add('chk-flower', mcq({
  stem: 'In a hibiscus flower, which part produces the pollen grains?',
  right: 'The anther of the stamen',
  wrong: ['The stigma of the pistil', 'The ovule inside the ovary', 'The sepal at the base'],
  sol: 'The anther at the top of the filament makes pollen grains — option (@K). The stigma receives pollen, and the ovule holds the egg cell.',
  d: 1, c: 'recall', t: [2],
}));
add('chk-fruit', mcq({
  stem: 'After fertilisation in a guava flower, the part that grows and ripens into the fruit is the:',
  right: 'ovary',
  wrong: ['ovule', 'stigma', 'anther'],
  sol: 'The ovary becomes the fruit and the ovules in it become seeds — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('m-stigma', mcq({
  stem: 'A bee lands on a mustard flower and pollen sticks to the top of the pistil, which is rough and sticky. This part is the:',
  right: 'stigma',
  wrong: ['style', 'filament', 'ovary'],
  sol: 'The sticky top of the pistil, which receives pollen, is the stigma — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('m-self', mcq({
  stem: 'In a pea flower, pollen from the anther falls on the stigma of the same flower. This is called:',
  right: 'self-pollination',
  wrong: ['cross-pollination', 'fertilisation', 'vegetative propagation'],
  sol: 'Pollen reaching the stigma of the same flower is self-pollination — option (@K). Fertilisation is the later fusion of gametes.',
  d: 1, c: 'application', t: [2],
}));
add('m-wind', mcq({
  stem: 'A grass has tiny green flowers with no scent or nectar, long hanging anthers and feathery stigmas. It is most likely pollinated by:',
  right: 'wind',
  wrong: ['bees', 'butterflies', 'birds'],
  sol: 'Small, scentless flowers with exposed anthers and feathery stigmas suit wind pollination — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('m-tube', mcq({
  stem: 'After pollen lands on a stigma, a thin tube grows towards the ovary. This tube grows through the:',
  right: 'style',
  wrong: ['filament', 'petal', 'sepal'],
  sol: 'The pollen tube grows down through the style to reach the ovule — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('ar-seed', ar({
  a: 'In a flower, each fertilised ovule develops into a seed.',
  r: 'The wall of the ovary becomes the wall of the fruit.',
  key: 'b',
  sol: 'A is true. R is also true, but it describes what the ovary becomes, not why the ovule becomes a seed, so it does not explain A — option (b).',
  d: 4, c: 'analysis', t: [2],
}));
add('ar-cross', ar({
  a: 'Seeds formed by cross-pollination give plants that are all identical to the parent plant.',
  r: 'In cross-pollination, pollen from one plant fertilises a flower of a different plant.',
  key: 'd',
  sol: 'A is false: material from two different plants is combined, so the offspring show variation. R is true — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('ar-wind', ar({
  a: 'Wind-pollinated plants, such as maize, make very large amounts of pollen.',
  r: 'Most of the pollen carried by the wind never reaches a stigma.',
  key: 'a',
  sol: 'A is true. R is true and explains A: since most pollen is lost in the air, many grains are needed for a few to reach stigmas — option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('fill-stigma', fill({
  stem: 'The sticky part of the pistil that receives the pollen grains is the ___.',
  acc: [['stigma']],
  sol: 'The **stigma** receives pollen.',
  d: 1, c: 'recall', t: [2],
}));
add('tf-pollination', tf({
  stem: 'Pollination and fertilisation mean the same thing in a flowering plant.',
  key: 'f',
  sol: 'False. Pollination is the transfer of pollen to a stigma; fertilisation is the later fusion of the male gamete with the egg.',
  d: 2, c: 'understanding', t: [2],
}));
add('n-seeds', (() => {
  const ov = 40, pct = 60;
  const seeds = seedsFrom(ov, pct);
  return num({
    stem: `The ovary of a flower has ${ov} ovules, and ${pct} % of them are fertilised. How many seeds will the fruit have?`,
    value: seeds, tol: 0, unit: 'seeds',
    sol: r`Each fertilised ovule becomes one seed. Seeds $= \dfrac{${pct}}{100} \times ${ov} = ${seeds}$.`,
    scheme: [['Each fertilised ovule becomes a seed', 1], [`${pct}/100 × ${ov} = ${seeds}`, 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => 0.6 * 40 === 24 && q.answer.value === 24 || 'seeds');
add('s2-cross', short({
  marks: 2,
  stem: 'Why do farmers sometimes plant different varieties of a crop in neighbouring rows to encourage cross-pollination?',
  model: 'Cross-pollination brings together pollen and egg cells from two different plants. The seeds that form combine material from both parents, so the offspring show more variation, and some may be stronger or better able to survive disease and changes in climate.',
  sol: 'Material from two plants gives variation; some offspring may be stronger.',
  scheme: [['Cross-pollination joins material from two different plants', 1], ['Greater variation, so some offspring may be hardier', 1]],
  d: 2, c: 'application', t: [2],
}));
add('s2-tube', short({
  marks: 2,
  stem: 'Describe the role of the pollen tube in the fertilisation of a flower.',
  model: 'After a pollen grain lands on the stigma, it grows a pollen tube down through the style to an ovule in the ovary. The male gamete travels along this tube and fuses with the egg cell, which is fertilisation, forming a zygote.',
  sol: 'Grows through style to ovule; carries male gamete to fuse with egg.',
  scheme: [['Grows from the pollen grain through the style to the ovule', 1], ['Carries the male gamete, which fuses with the egg to form a zygote', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s3-pollen', short({
  marks: 3,
  stem: 'Compare an insect-pollinated flower with a wind-pollinated flower on three features.',
  model: 'An insect-pollinated flower has bright petals and a scent, and makes nectar to attract insects. Its pollen is often sticky. A wind-pollinated flower is small and dull, with no scent or nectar. It makes huge quantities of light, dry pollen, and often has feathery stigmas and exposed anthers to catch and release pollen in the air.',
  sol: 'Petals and scent; pollen type; amount and stigma shape.',
  scheme: [['Petals, scent and nectar of the insect flower versus dull flower', 1], ['Sticky versus light dry pollen', 1], ['Amount of pollen and the feathery stigma of wind flowers', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('l-flower', long({
  stem: '(a) Draw a labelled diagram of a flower cut lengthwise.\n\n(b) State the function of the anther, the stigma and the ovule.\n\n(c) Distinguish a bisexual flower from a unisexual flower with one example of each.',
  model: 'The diagram should show the sepal, petal, stamen with anther and filament, and the pistil with stigma, style, ovary and ovules. The anther makes pollen grains, the stigma receives the pollen, and the ovule contains the egg cell and becomes a seed after fertilisation. A bisexual flower has both stamens and a pistil, as in hibiscus, while a unisexual flower has only stamens or only a pistil, as in papaya.',
  sol: 'Labelled flower; functions of anther, stigma and ovule; bisexual versus unisexual with examples.',
  scheme: [['(a) Labelled diagram of at least six parts', 2], ['(b) Functions of anther, stigma and ovule', 1.5], ['(c) Bisexual versus unisexual with examples', 1.5]],
  d: 2, c: 'understanding', t: [2],
}));
add('l-fert', long({
  stem: '(a) What is pollination? Name two agents of pollination.\n\n(b) Describe the steps from the landing of a pollen grain to the formation of the zygote.\n\n(c) State what the ovule and the ovary become after fertilisation.',
  model: 'Pollination is the transfer of pollen from an anther to a stigma, and insects or wind can carry the pollen. On the stigma the pollen grain grows a pollen tube down through the style to an ovule. The male gamete moves along the tube and fuses with the egg cell, and this fertilisation forms the zygote, which divides to form the embryo. After fertilisation the ovule becomes the seed and the ovary becomes the fruit.',
  sol: 'Definition and agents; pollen tube steps to zygote; ovule to seed, ovary to fruit.',
  scheme: [['(a) Definition and two agents', 1.5], ['(b) Pollen tube growth, fusion of gametes, zygote', 2.5], ['(c) Ovule to seed, ovary to fruit', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('case-maize', (() => {
  const A = 482, B = 0, C = 460;
  return mk.case({
    passage: r`Students on a farm in Punjab studied three sets of maize plants. Maize has male flowers (tassels) at the top and female flowers on the cob, whose long silks are the stigmas and styles. The average number of kernels (seeds) per cob is given for practice.

| Set | Treatment | Kernels per cob |
|---|---|---|
| A | cobs left open to wind and insects | ${A} |
| B | silks covered with a paper bag before they appeared | ${B} |
| C | silks bagged, then dusted by hand with maize pollen, then bagged again | ${C} |`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'The result for set B shows that:',
        right: 'seeds do not form unless pollen reaches the silks',
        wrong: ['maize makes seeds without any pollination', 'bags increase the number of kernels', 'silks make pollen'],
        sol: 'With the silks covered, no pollen could reach them and no kernels formed — option (@K).',
        d: 2, c: 'analysis', t: [2],
      })),
      part('b', short({
        marks: 1, wl: null,
        stem: 'Which part of the pistil corresponds to the silks that the students bagged?',
        model: 'The silks are the stigmas and styles of the female flowers.',
        sol: 'Silks are the stigma and style.',
        scheme: [['Stigma (and style)', 1]],
        d: 2, c: 'understanding', t: [2],
      })),
      part('c', short({
        marks: 2, wl: null,
        stem: 'Set C gave almost as many kernels as set A, although no wind or insects reached the cobs. What does this show?',
        model: 'It shows that hand-dusted pollen worked as well as natural pollination. What matters is that pollen reaches the silks, not how it gets there, and then fertilisation produces the kernels.',
        sol: 'Pollen reaching the silks is what matters, not the agent.',
        scheme: [['Hand-dusted pollen gave seeds like natural pollination', 1], ['Seeds need pollen on the stigma, whichever way it arrives', 1]],
        d: 3, c: 'analysis', t: [2],
      }), [
        short({
          marks: 2, wl: null,
          stem: 'Maize is mainly wind pollinated. Name two features of its flowers that suit wind pollination.',
          model: 'The tassels make huge amounts of light, dry pollen that the wind can carry, and the long, feathery silks catch pollen grains from the air.',
          sol: 'Large amounts of light pollen; feathery silks to catch pollen.',
          scheme: [['Large amounts of light, dry pollen', 1], ['Long feathery silks that catch pollen', 1]],
          d: 3, c: 'application', t: [2],
        }),
      ]),
    ],
  });
})(), null);

// ---------------------------------------------------------------- t03 human reproduction
add('chk-testis', mcq({
  stem: 'Which organ in the male reproductive system makes sperms?',
  right: 'The testis',
  wrong: ['The epididymis', 'The prostate gland', 'The urethra'],
  sol: 'Sperms are made in the testes — option (@K). The epididymis stores them, the prostate adds fluid, and the urethra is a passage.',
  d: 1, c: 'recall', t: [3],
}));
add('chk-egg', mcq({
  stem: 'In a woman, fertilisation of the egg by a sperm usually takes place in the:',
  right: 'fallopian tube',
  wrong: ['uterus', 'vagina', 'ovary'],
  sol: 'The egg is picked up by the fallopian tube, and fertilisation usually takes place there — option (@K). The embryo then settles in the uterus.',
  d: 2, c: 'understanding', t: [3],
}));
add('m-gamete', mcq({
  stem: 'A sperm cell is very small and has a tail, whereas an egg cell is large and round. The tail of the sperm helps it to:',
  right: 'swim towards the egg',
  wrong: ['store food for the embryo', 'make the hormone testosterone', 'attach to the wall of the uterus'],
  sol: 'The tail lets the sperm swim to reach the egg — option (@K). The large egg, not the sperm, carries the food.',
  d: 1, c: 'understanding', t: [3],
}));
add('m-vas', mcq({
  stem: 'Sperms are stored in the epididymis and then travel through a tube towards the urethra. This tube is the:',
  right: 'vas deferens',
  wrong: ['fallopian tube', 'ureter', 'seminal vesicle'],
  sol: 'The vas deferens carries sperms from the epididymis towards the urethra — option (@K). The fallopian tube is in females.',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-internal', ar({
  a: 'Fertilisation in human beings is internal.',
  r: 'In humans, the sperm and the egg meet outside the body of the mother.',
  key: 'c',
  sol: 'A is true: the sperm meets the egg inside the female body. R is false because the meeting is inside, not outside — option (c).',
  d: 2, c: 'analysis', t: [3],
}));
add('tf-sperm', tf({
  stem: 'A human sperm is a very small cell that has a tail.',
  key: 't',
  sol: 'True. The tail helps the sperm to swim towards the egg.',
  d: 1, c: 'recall', t: [3],
}));
add('match-organ', match({
  stem: 'Match each organ of the human reproductive system (Column A) with its function (Column B).',
  pairs: [
    ['Testis', 'Makes sperms'],
    ['Ovary', 'Makes eggs'],
    ['Uterus', 'Holds and nourishes the growing embryo'],
    ['Vas deferens', 'Carries sperms towards the urethra'],
  ],
  order: [1, 3, 0, 2],
  sol: 'The testis makes sperms, the ovary makes eggs, the uterus holds the embryo, and the vas deferens carries sperms to the urethra.',
  d: 1, c: 'recall', t: [3],
}));
add('s2-gamete', short({
  marks: 2,
  stem: 'Give two differences between a human sperm and a human egg in size and structure, and say how each helps the cell.',
  model: 'A sperm is very small and has a tail, which lets it swim to the egg. An egg is much larger and round, and it holds food, which nourishes the zygote in its first days after fertilisation.',
  sol: 'Sperm small with tail to swim; egg large with food.',
  scheme: [['Sperm: small with a tail, so it can swim', 1], ['Egg: large and round, holding food for the early embryo', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('l-human', long({
  stem: '(a) Draw a simple labelled outline of the human female reproductive system.\n\n(b) State the function of the ovary, the fallopian tube and the uterus.\n\n(c) Name the organ in which sperms are made and say where they are stored.',
  model: 'The outline should show the ovaries, fallopian tubes, uterus, cervix and vagina. The ovary makes eggs and female hormones, the fallopian tube picks up the egg and is where fertilisation usually happens, and the uterus is where the embryo settles and grows. Sperms are made in the testes of the male and are stored in the epididymis, a coiled tube on each testis, before they pass into the vas deferens.',
  sol: 'Labelled outline; functions of ovary, tube and uterus; sperms made in testis, stored in epididymis.',
  scheme: [['(a) Labelled outline with at least five parts', 2], ['(b) Three functions', 2], ['(c) Testis and epididymis', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 adolescence and reproductive health
add('chk-hygiene', mcq({
  stem: 'During her period, Asha wants to stay clean and comfortable at school. Which habit is best?',
  right: 'Change the pad every 4 to 6 hours, wash her hands, and put the used pad, wrapped, in a dustbin',
  wrong: ['Use the same pad all day so that she does not need to leave the class', 'Skip her daily bath until the period ends', 'Flush the used pad down the toilet'],
  sol: 'Changing the pad regularly, washing hands and wrapping and binning the used pad prevent infection and blocked drains — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('m-puberty', mcq({
  stem: 'Ravi, aged 13, notices that his voice cracks and he is growing quickly. His mother should tell him that:',
  right: 'these are normal changes caused by hormones during puberty',
  wrong: ['he has caught an infection that needs medicine', 'he is growing up in the wrong way', 'the changes will stop if he drinks less water'],
  sol: 'A deepening or cracking voice and a growth spurt are normal changes of puberty, caused by hormones — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('m-period', mcq({
  stem: 'Which statement about a girl\'s monthly period is correct?',
  right: 'It is the natural shedding of the uterine lining, and the girl can continue her normal daily activities',
  wrong: ['It is an illness and she should rest in isolation', 'It makes her food or water impure', 'It means her body is dirty'],
  sol: 'Menstruation is a natural, healthy process in which the lining of the uterus leaves the body. Girls can attend school, bathe and take part in daily life — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('m-iron', mcq({
  stem: 'A health worker advises teenage girls to eat more spinach, jaggery and dal. The main reason is that these foods:',
  right: 'supply iron, which helps to make up for blood lost in monthly periods',
  wrong: ['stop periods from happening', 'make the voice deeper', 'cure pimples completely'],
  sol: 'Spinach, jaggery and dal are rich in iron, which the body needs to make blood — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ar-bath', ar({
  a: 'A girl should continue to bathe daily during her period.',
  r: 'Bathing during a period spreads infection to other people.',
  key: 'c',
  sol: 'A is true: daily bathing keeps the body clean. R is false: bathing does not spread infection — option (c).',
  d: 2, c: 'analysis', t: [4],
}));
add('tf-period', tf({
  stem: 'A monthly period is a sign that a girl is ill.',
  key: 'f',
  sol: 'False. A period is a normal part of growing up and is not an illness.',
  d: 1, c: 'understanding', t: [4],
}));
add('fill-hormone', fill({
  stem: 'The chemical messengers in the blood that bring about the changes of puberty are called ___.',
  acc: [['hormones', 'hormone']],
  sol: 'The changes are caused by **hormones**.',
  d: 1, c: 'recall', t: [4],
}));
add('n-date', (() => {
  const nx = addDays(6, 14, 28);
  return num({
    stem: 'Divya noted 14 July as the first day of her period. If her cycle is 28 days long (given), on which date of the following month is the next period expected to start?',
    value: nx.day, tol: 0, unit: null,
    sol: r`$14 + 28 = 42$. July has 31 days, so $42 - 31 = ${nx.day}$. The next period is expected around ${nx.day} ${nx.month}.`,
    scheme: [['14 + 28 = 42', 1], ['42 − 31 = 11, so about 11 August', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => addDays(6, 14, 28).day === 11 && addDays(6, 14, 28).month === 'August' && q.answer.value === 11 || 'date');
add('s2-hygiene', short({
  marks: 2,
  stem: 'Give two practices of menstrual hygiene and say why each is important.',
  model: 'A pad or cloth should be changed every four to six hours, because a damp pad can cause rashes and infection. Hands should be washed before and after changing it, and the used pad should be wrapped and put in a dustbin, which keeps germs away and keeps drains and the environment clean.',
  sol: 'Change every 4 to 6 hours to prevent infection; wash hands and dispose safely.',
  scheme: [['Change the pad or cloth regularly; prevents rashes and infection', 1], ['Wash hands, and dispose of pads safely; keeps germs and waste away', 1]],
  d: 2, c: 'application', t: [4],
}));
add('s2-myth', short({
  marks: 2,
  stem: 'Rina\'s friend says that a girl must not touch pickles or food during her period because she is impure. How would you kindly correct this, using a scientific fact?',
  model: 'I would say that a period is a normal, healthy process in which the lining of the uterus leaves the body. It is not an illness and a girl is not impure, so she can touch and eat food as usual as long as she keeps her hands clean.',
  sol: 'Period is a natural process; not impure; normal activities are fine.',
  scheme: [['Menstruation is a natural, healthy process', 1], ['A girl is not impure and can do normal activities with clean hands', 1]],
  d: 2, c: 'evaluation', t: [4],
}));
add('s3-menstrual', short({
  marks: 3,
  stem: 'What is menstruation? State its usual duration and explain why a calendar helps a girl in the first few years.',
  model: 'Menstruation is the natural monthly shedding of the thickened lining of the uterus, with a little blood, through the vagina when no egg has been fertilised. It usually lasts about three to seven days. In the first years the cycle may be irregular, so marking dates on a calendar helps a girl to see her own pattern and be prepared.',
  sol: 'Shedding of the uterine lining; 3 to 7 days; calendar shows pattern.',
  scheme: [['Natural monthly shedding of the uterine lining', 1], ['Lasts about 3 to 7 days', 1], ['A calendar shows her pattern when cycles are irregular', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s3-puberty', short({
  marks: 3,
  stem: 'Name two changes at puberty that occur in both boys and girls, one that occurs only in girls and one that occurs only in boys. What causes them?',
  model: 'In both boys and girls there is a growth spurt and hair grows under the arms; skin also becomes oilier and may get pimples. Only girls develop breasts and start their periods, and only boys have a deepening of the voice and facial hair. These changes are caused by hormones released at puberty.',
  sol: 'Common: growth spurt and body hair; girls: breasts and periods; boys: voice and facial hair; hormones.',
  scheme: [['Two changes in both', 1], ['One change in girls and one in boys', 1], ['Hormones cause the changes', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('l-adol', long({
  stem: '(a) What is adolescence? Why do the body and feelings change during these years?\n\n(b) Describe four habits that keep an adolescent healthy.\n\n(c) Name two trusted people or places where a student can get correct information about growing up.',
  model: 'Adolescence is the stage between childhood and adulthood, about ten to nineteen years of age. Hormones cause body changes and also strong feelings. Healthy habits are eating balanced meals with iron and calcium, sleeping eight to nine hours, exercising daily, and keeping clean with a daily bath and clean clothes, while avoiding tobacco. A student can ask a parent, a teacher, a school counsellor or a doctor, or read reliable science books.',
  sol: 'Definition and hormones; four habits; trusted adults and sources.',
  scheme: [['(a) Definition and hormones', 1.5], ['(b) Four healthy habits', 2], ['(c) Two trusted sources', 1.5]],
  d: 2, c: 'understanding', t: [4],
}));
add('case-calendar', (() => {
  const dates = [[0, 4], [1, 1], [2, 1], [2, 30]];
  const names = ['4 January', '1 February', '1 March', '30 March'];
  void dates;
  return mk.case({
    passage: r`Priya, aged 13, has had periods for one year and marks the first day of each one on a calendar. Her dates are given for practice.

| Period | First day |
|---|---|
| 1 | ${names[0]} |
| 2 | ${names[1]} |
| 3 | ${names[2]} |
| 4 | ${names[3]} |

Priya worries because the gaps are not all equal. Her mother tells her that cycles are often irregular in the first few years.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The number of days between the first day of period 2 (1 February) and period 3 (1 March, in a year with 28 days in February) is:',
        right: '28',
        wrong: ['27', '30', '31'],
        sol: 'February has 28 days, so 1 February to 1 March is 28 days — option (@K).',
        d: 2, c: 'application', t: [4],
      })),
      part('b', short({
        marks: 1, wl: null,
        stem: 'Find the number of days from 1 March to 30 March.',
        model: r`$30 - 1 = 29$ days.`,
        sol: '30 − 1 = 29 days.',
        scheme: [['29 days', 1]],
        d: 2, c: 'application', t: [4],
      })),
      part('c', short({
        marks: 2, wl: null,
        stem: 'Is Priya\'s changing gap a cause for alarm? Give one reason, and say when she should see a doctor.',
        model: 'Not by itself, because cycles are often irregular in the first few years after periods begin. She should see a doctor if her periods are very painful or very heavy, or if they stop for several months after she has been having them regularly.',
        sol: 'Irregular cycles are common in teens; see a doctor for severe pain, heavy bleeding or missed periods.',
        scheme: [['Irregular cycles are common in the first years', 1], ['See a doctor for severe pain, heavy bleeding or long gaps', 1]],
        d: 3, c: 'evaluation', t: [4],
      }), [
        short({
          marks: 2, wl: null,
          stem: 'Suggest two things Priya can do to stay clean and comfortable on the days of her period.',
          model: 'She can change her pad or cloth every four to six hours and wash her hands before and after. She should bathe daily and put used pads, wrapped, in a dustbin.',
          sol: 'Change every 4 to 6 hours; bathe; wash hands; dispose safely.',
          scheme: [['Change the pad or cloth every 4 to 6 hours', 1], ['Wash hands, bathe, and dispose of pads safely', 1]],
          d: 2, c: 'application', t: [4],
        }),
      ]),
    ],
  });
})(), null);
add('case-club', mk.case({
  passage: r`In a school in Jaipur, the health club keeps an anonymous question box for Class 9. Teacher Ms Rao sorts the questions into groups and counts them. The counts are given for practice.

| Topic | Questions |
|---|---|
| Voice and height changes | 14 |
| Periods | 11 |
| Pimples and skin | 9 |
| Feeling moody | 6 |`,
  d: 2, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which topic was asked about most often?',
      right: 'Voice and height changes',
      wrong: ['Periods', 'Pimples and skin', 'Feeling moody'],
      sol: 'The highest count is 14, for voice and height changes — option (@K).',
      d: 1, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'How many questions were asked in all?',
      model: r`$14 + 11 + 9 + 6 = 40$ questions.`,
      sol: '14 + 11 + 9 + 6 = 40.',
      scheme: [['40 questions', 1]],
      d: 1, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'A student asks, "Why do I feel angry and sad for no reason?" Give a short, kind answer.',
      model: 'Hormones during adolescence can make feelings change quickly, which is normal. Sleep, play, a balanced diet and talking to a trusted adult or counsellor can help, and she should seek help if the feeling lasts long.',
      sol: 'Hormones cause mood swings; sleep, exercise, talk to a trusted adult.',
      scheme: [['Hormones can cause quick changes in mood, which is normal', 1], ['Rest, play and talking to a trusted adult or counsellor help', 1]],
      d: 2, c: 'application', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Name two ways in which Ms Rao\'s anonymous question box helps students.',
        model: 'Students can ask questions they feel shy about without being identified, and they get correct, scientific answers instead of relying on myths.',
        sol: 'Shy students can ask; correct answers replace myths.',
        scheme: [['Students can ask without being identified', 1], ['They get correct information instead of myths', 1]],
        d: 2, c: 'application', t: [4],
      }),
    ]),
  ],
}), null);
