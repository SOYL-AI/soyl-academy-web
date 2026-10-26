// ch07 How do Organisms Reproduce? — three decks: Part 1 (t01–t02), Part 2 (t03), Part 3 (t04–t05).
import { sl, deck, table, flow, svgV, r } from '../../cbse-10-science-ch06/src/lib.mjs';
import { FISSION, MULTIPLE, BUDDING, REGEN, RHIZOPUS, BRYO, FLOWER, POLLEN_TUBE, SEED, MALE, FEMALE, PLACENTA } from './svgs.mjs';

export const V = {
  fission: svgV(FISSION, 'Binary fission in Amoeba: the nucleus divides, then the cytoplasm, giving two daughter cells'),
  multiple: svgV(MULTIPLE, 'Multiple fission in Plasmodium: a cyst forms, the nucleus divides many times, and many daughter cells are released'),
  budding: svgV(BUDDING, 'Budding in Hydra: a bud grows from the side, develops tentacles and separates as a new Hydra'),
  regen: svgV(REGEN, 'Planaria cut into three pieces, each regrowing into a complete worm'),
  rhizopus: svgV(RHIZOPUS, 'Bread mould with hyphae, sporangia full of spores and a bursting sporangium releasing spores'),
  bryo: svgV(BRYO, 'Bryophyllum leaf with buds bearing tiny leaves and roots in the notches of its margin'),
  flower: svgV(FLOWER, 'Labelled section of a flower: sepal, petal, anther, filament, stigma, style, ovary and ovules', 'Stamen (male part) = anther + filament. Pistil (female part) = stigma + style + ovary.'),
  pollenTube: svgV(POLLEN_TUBE, 'Pollen grains on the stigma, one growing a pollen tube down the style to the ovule, carrying male germ cells to the female germ cell'),
  seed: svgV(SEED, 'A germinating seed with cotyledons, the plumule growing up and the radicle growing down into the soil'),
  male: svgV(MALE, 'Labelled male reproductive system: testes in the scrotum, vas deferens, seminal vesicles, prostate gland, urinary bladder, urethra and penis', 'Schematic front view, not to scale.'),
  female: svgV(FEMALE, 'Labelled female reproductive system: ovaries, oviducts, uterus, cervix and vagina', 'Schematic front view, not to scale.'),
  placenta: svgV(PLACENTA, 'Embryo in the uterus joined by the umbilical cord to the placenta in the uterine wall, surrounded by a fluid-filled sac', 'Food and oxygen pass from the mother’s blood to the embryo through the placenta; wastes pass the other way.'),
};

export const deck1 = deck({
  part: 1,
  title: 'How do Organisms Reproduce? — Part 1: DNA copying and asexual reproduction',
  goals: [
    'Explain why DNA copying is essential in reproduction',
    'Explain how variation arises and how it helps a species survive',
    'Describe fission, fragmentation, regeneration and budding with examples',
    'Describe spore formation and vegetative propagation, and their uses',
  ],
  slides: [
    sl('title', 'How do Organisms Reproduce?', {
      b: 'Part 1 — why living things reproduce, why offspring are similar but never identical, and the many ways organisms reproduce from a single parent.',
      v: flow('LR', [['p', 'Parent'], ['d', 'DNA is copied'], ['c', 'Cell divides; each cell gets a copy'], ['o', 'Offspring: similar to the parent'], ['v', 'Small copying changes: variation']], [['p', 'd'], ['d', 'c'], ['c', 'o'], ['d', 'v', 'copying is not perfect']], 'Flow from parent to DNA copying, cell division and similar offspring, with copying changes giving variation'),
      n: 'Namaste! Look around your class. Everyone has two eyes, a nose and ten fingers, yet no two faces are exactly alike. Why are children like their parents, but not exact copies? The answer lies in how living things reproduce. In this part we explore the copying of DNA, why small differences matter, and the clever ways many organisms make new individuals from just one parent.',
    }),
    sl('concept', 'Why reproduce?', {
      b: 'Reproduction is **not needed to keep an individual alive**, but it is essential for the **survival of the species**. Without it, a species would die out as its members die.',
      v: table(['', 'Life processes', 'Reproduction'], [['Needed by', 'Each individual', 'The species'], ['If it stops', 'The individual dies', 'The species slowly disappears'], ['Example', 'Breathing, digestion', 'A mango tree producing seeds']], 'Table contrasting life processes, needed by each individual, with reproduction, needed by the species'),
      n: 'Breathing and digestion keep you alive today. Reproduction is different: you could live a full life without it. But a species needs it. If tigers stopped reproducing, every tiger alive now would eventually die, and tigers would be gone forever. Reproduction keeps populations going, generation after generation, and it uses a lot of the body’s energy and resources.',
    }),
    sl('concept', 'DNA copying: the basic event', {
      b: 'The **DNA** in the nucleus carries the information for making **proteins**, and proteins build the body’s design. Reproduction begins with the cell making a **copy of its DNA**, along with extra cell apparatus, and then dividing so that each new cell gets a copy.',
      v: flow('LR', [['n', 'DNA in the nucleus'], ['p', 'Information for making proteins'], ['b', 'Body design'], ['c', 'Cell copies DNA and makes extra apparatus'], ['s', 'Cell divides into two']], [['n', 'p'], ['p', 'b'], ['n', 'c', 'before reproduction'], ['c', 's']], 'Flow showing DNA holding information for proteins and body design, and DNA being copied before the cell divides'),
      n: 'Think of DNA as a recipe book kept in the nucleus. Each recipe tells the cell how to make a protein, and proteins build and run the body. Before a cell can make a new individual, it must photocopy the whole recipe book. It also makes extra cell machinery, then splits so that each new cell has its own complete copy.',
    }),
    sl('concept', 'No copy is perfect: variation', {
      b: 'DNA copying is very accurate but **not perfect**. Small changes creep in, so offspring are **similar, but not identical**, to their parent. These differences are **variations**. Most small variations are harmless; a few are harmful; a few may turn out to be useful.',
      v: table(['Copying result', 'What happens to the offspring'], [['Accurate copy', 'Same body design as the parent; it fits the same niche'], ['Small change', 'Slightly different; usually still survives'], ['Large change', 'Body design may not work; offspring may not survive']], 'Table of DNA copying outcomes: accurate copy, small change and large change, with the effect on the offspring'),
      n: 'Imagine copying a long recipe by hand, again and again. You will be careful, but now and then a small slip creeps in. DNA copying is like that. Consistent copying keeps the body design working in the place where the species lives, which we call its niche. But the occasional small change produces variation, the raw material for a species to cope with change.',
    }),
    sl('example', 'Worked example 1: how variation saves a population', {
      b: 'A pond contains millions of bacteria of one kind. In a heat wave the water warms by several degrees. Most bacteria die, but a few survive and multiply. Explain.',
      ul: [
        'Step 1 — Copying errors over many generations made the bacteria slightly **different** from one another.',
        'Step 2 — By chance, a few had variations that let them **tolerate heat**.',
        'Step 3 — In the warmer water, only these survived and reproduced, passing on their variation.',
        'Conclusion — without variation, the **whole population** would have been wiped out. Variation helps a species **survive** when its surroundings change.',
      ],
      v: table(['Bacteria in the pond', 'Before the heat wave', 'After the heat wave'], [['Without the heat-tolerant variation', 'Almost all', 'Most die'], ['With the heat-tolerant variation', 'Very few', 'Survive and multiply']], 'Worked table: before the heat wave almost all bacteria lack heat tolerance; afterwards only the few heat-tolerant ones survive and multiply'),
      n: 'Notice what did not happen here. The heat did not change the bacteria’s DNA on purpose. The useful variation was already present in a few bacteria before the heat wave arrived. The heat simply removed the others. In exam answers, always say the variation existed beforehand and was passed on. That is how variation protects a species from sudden changes.',
    }),
    sl('check', 'Quick check: why are copies not identical?', {
      b: 'Why are offspring produced from a single parent similar to it, but not exactly identical?',
      n: 'Quick check. Think about the photocopier that is very good but not perfect. What happens during copying that causes small differences?',
      chk: 'variation-why-mcq',
    }),
    sl('concept', 'Asexual reproduction: one parent', {
      b: 'In **asexual reproduction**, a **single parent** produces offspring, without germ cells. It is quick and needs no partner, and the offspring are almost **identical** to the parent.',
      v: table(['Method', 'Example'], [['Binary fission', 'Amoeba, Leishmania, bacteria'], ['Multiple fission', 'Plasmodium (malaria parasite)'], ['Fragmentation', 'Spirogyra'], ['Regeneration', 'Planaria, Hydra'], ['Budding', 'Hydra'], ['Spore formation', 'Rhizopus (bread mould)'], ['Vegetative propagation', 'Bryophyllum, potato, sugarcane, banana']], 'Table of seven asexual methods with an example organism for each'),
      n: 'Some organisms do not need a partner at all. One parent simply makes new individuals from its own body. This is asexual reproduction. It is fast and can produce huge numbers quickly, which is why bread goes mouldy and pond water turns green so suddenly. Let us meet each method in turn, starting with the simplest single cells.',
    }),
    sl('diagram', 'Binary fission', {
      b: 'In **binary fission**, a single cell divides into **two equal halves**. **Amoeba** can split in any plane. **Leishmania**, which causes kala-azar, has a whip-like structure at one end and splits in a **definite plane** in relation to it.',
      v: V.fission,
      n: 'Binary means two. In Amoeba, first the nucleus divides into two, then the cytoplasm pinches in the middle, and one cell becomes two. Leishmania, a parasite spread by sandflies that causes kala-azar, also splits in two, but always in a particular direction, because of the whip-like structure at one end of its body. Many bacteria reproduce by binary fission too.',
    }),
    sl('diagram', 'Multiple fission', {
      b: 'In **multiple fission**, one cell divides into **many** daughter cells at once. The malaria parasite **Plasmodium** forms a protective **cyst**; inside it the nucleus divides many times, and then the cyst bursts to release many cells.',
      v: V.multiple,
      n: 'Some single-celled organisms make many offspring in one go. Plasmodium, the parasite that causes malaria, can surround itself with a tough wall called a cyst. Inside, its nucleus divides again and again, each new nucleus gets some cytoplasm, and when conditions are right the cyst bursts, releasing many new cells together. That is one reason malaria spreads so fast inside the body.',
    }),
    sl('example', 'Worked example 2: how fast does fission multiply?', {
      b: 'In a culture, one Amoeba divides by binary fission every 8 hours, and every daughter does the same. How many Amoebae will there be after 2 days?',
      ul: [
        r`Step 1 — Number of divisions in 2 days $= \dfrac{48}{8} = 6$.`,
        r`Step 2 — Each division doubles the number: $1 \to 2 \to 4 \to 8 \to \dots$`,
        r`Step 3 — After 6 doublings: $2^6 = 64$ Amoebae.`,
        'Check — the number doubles every 8 hours, so after 3 days (9 doublings) it would already be 512.',
      ],
      v: table(['Time (hours)', '0', '8', '16', '24', '32', '40', '48'], [['Number of Amoebae', '1', '2', '4', '8', '16', '32', '64']], 'Worked table of Amoeba numbers doubling every 8 hours from 1 to 64 in 48 hours'),
      n: 'Doubling is powerful. Count the divisions first: forty-eight hours divided by eight hours gives six divisions. Each division doubles the number, so one becomes two, two becomes four, and so on, until six doublings give sixty-four. Real cultures slow down when food or space runs short, but this shows why single-celled organisms can multiply so quickly.',
    }),
    sl('diagram', 'Fragmentation and regeneration', {
      b: 'In **fragmentation**, a mature organism such as **Spirogyra** simply **breaks into pieces**, and each piece grows into a new individual. In **regeneration**, specialised cells in organisms such as **Planaria** and **Hydra** can rebuild a **whole body** from a cut piece.',
      v: V.regen,
      n: 'Spirogyra, the slimy green alga in ponds, has a simple body of long filaments. When it matures, a filament just breaks into pieces, and each piece keeps growing. Planaria is a flatworm that can do something even more amazing. Cut it into pieces and each piece regrows a complete worm. But most organisms do not wait to be cut up to reproduce, so regeneration is not their usual way of reproducing.',
    }),
    sl('check', 'Quick check: fission or not?', {
      b: 'Judge the assertion and the reason about Plasmodium.',
      n: 'Quick check. Is the assertion true for the malaria parasite? Is the reason true? Decide each one separately before choosing.',
      chk: 'fission-ar',
    }),
    sl('diagram', 'Budding', {
      b: 'In **budding**, a small outgrowth, the **bud**, forms on the parent due to repeated cell division at one spot. The bud grows into a tiny individual and **detaches** when mature. **Hydra** reproduces this way; so does **yeast**.',
      v: V.budding,
      n: 'Hydra is a tiny freshwater animal with tentacles. At one spot on its body, cells keep dividing, and a small bump appears. This bud grows its own tentacles and mouth, and when it is ready it breaks away to live on its own. Yeast, the fungus that makes bread dough rise, also forms buds. Unlike binary fission, the parent and offspring are not equal in size at first.',
    }),
    sl('diagram', 'Spore formation', {
      b: 'Bread mould (**Rhizopus**) has thread-like **hyphae** and tiny blobs on stalks called **sporangia**, which contain **spores**. Spores have **thick walls** that protect them until they land on a **moist** surface, where they germinate.',
      v: V.rhizopus,
      n: 'Leave a slice of bread in a damp kitchen during the monsoon and, in a few days, fuzzy black patches appear. That is bread mould. Its sporangia release tiny spores into the air, each protected by a thick wall. The spores float around unnoticed for a long time. When one lands on something moist and full of food, like bread, it germinates and a new mould grows.',
    }),
    sl('diagram', 'Vegetative propagation', {
      b: 'In **vegetative propagation**, new plants grow from **roots, stems or leaves**, not seeds. A **Bryophyllum** leaf grows buds in the notches of its margin; a **potato** tuber, which is a stem, sprouts from its "eyes".',
      v: V.bryo,
      n: 'Many plants can make new plants from their own body parts. Bryophyllum, sometimes called the miracle leaf, grows tiny plantlets in the notches along its leaf edge. Drop a leaf on moist soil and new plants appear. A potato is actually a swollen underground stem, and each eye is a bud. Gardeners use these abilities every day.',
    }),
    sl('concept', 'Vegetative propagation by people', {
      b: 'Farmers and gardeners use **cuttings** (sugarcane, rose), **layering** (jasmine) and **grafting** (mango, rose, grapes). Plants grown this way **flower and fruit earlier**, are **identical** to a good parent, and include varieties that have **lost the ability to make seeds**, such as banana.',
      v: table(['Method', 'How it works', 'Example'], [['Cutting', 'A piece of stem is planted and grows roots', 'Sugarcane, rose'], ['Layering', 'A branch is bent into the soil, roots, then is cut free', 'Jasmine'], ['Grafting', 'A stem of a good variety is joined to a rooted plant', 'Mango, grapes'], ['Suckers', 'Side shoots from the base are planted', 'Banana']], 'Table of four propagation methods used by farmers, how each works and an example'),
      n: 'Visit a nursery and you will see these methods in action. Sugarcane fields are planted with short pieces of stem. Jasmine branches are bent into the soil to root. Mango saplings are grafted, so every tree gives the same sweet fruit as the parent. Bananas in the market have no proper seeds, so farmers plant side shoots called suckers instead.',
    }),
    sl('example', 'Worked example 3: choosing a way to propagate', {
      b: 'A farmer in Jalgaon wants (a) a new banana orchard, (b) more plants of an excellent mango variety quickly, and (c) many sugarcane plants. Suggest a method for each and give a reason.',
      ul: [
        'Step 1 — Banana: plant **suckers**; cultivated bananas do not produce viable seeds.',
        'Step 2 — Mango: **grafting**; every plant is identical to the excellent parent and fruits years earlier than a seedling.',
        'Step 3 — Sugarcane: **stem cuttings** with buds; fast, cheap and true to type.',
        'Check — each choice uses vegetative propagation because the farmer wants identical, quick, reliable plants.',
      ],
      v: table(['Crop', 'Method', 'Main reason'], [['Banana', 'Suckers', 'No viable seeds'], ['Mango', 'Grafting', 'Same quality as the parent; earlier fruiting'], ['Sugarcane', 'Stem cuttings', 'Quick and true to type']], 'Worked table choosing suckers for banana, grafting for mango and stem cuttings for sugarcane, with reasons'),
      n: 'A good answer here names the method and gives a reason that fits the farmer’s goal. For bananas, the key fact is that they do not produce viable seeds. For mango, it is getting identical fruit quality and earlier harvests. For sugarcane, speed and reliability matter. Notice the common thread: when a farmer wants copies of a good plant, vegetative propagation is the answer.',
    }),
    sl('check', 'Quick check: the seedless banana', {
      b: 'Why do farmers grow bananas from suckers rather than from seeds?',
      n: 'Your turn. Think about what happens when you bite into a banana. Where are the seeds you would plant?',
      chk: 'banana-mcq',
    }),
    sl('two-column', 'Asexual reproduction: strengths and limits', {
      b: 'Asexual reproduction suits stable conditions, but it creates little variety.',
      cols: ['**Strengths**\n\n- Only one parent needed\n- Fast; huge numbers quickly\n- Offspring keep the parent’s good qualities', '**Limits**\n\n- Very little variation (only copying errors)\n- A disease or change that harms one may harm all\n- Crowding near the parent'],
      v: table(['Feature', 'Asexual', 'Sexual'], [['Parents', 'One', 'Two'], ['Germ cells', 'Not involved', 'Male and female germ cells fuse'], ['Variation', 'Very little', 'Much more'], ['Speed', 'Fast', 'Slower']], 'Table comparing asexual and sexual reproduction by parents, germ cells, variation and speed'),
      n: 'Asexual reproduction is like a photocopier: quick and reliable, but every copy looks the same. That is great when conditions stay steady. But if a new disease arrives that can kill one plant, it can kill all its identical copies too. Sexual reproduction, which mixes DNA from two parents, creates much more variety. That is our topic in Part 2.',
    }),
    sl('summary', 'Summary: DNA copying and asexual reproduction', {
      ul: [
        'Reproduction keeps a species alive; it begins with copying DNA.',
        'Copying is not perfect, so offspring show small variations; variation helps a species survive change.',
        'Fission: binary (Amoeba, Leishmania) or multiple (Plasmodium).',
        'Fragmentation (Spirogyra), regeneration (Planaria), budding (Hydra, yeast).',
        'Spores of Rhizopus have thick walls and germinate on moist surfaces.',
        'Vegetative propagation (Bryophyllum, potato, banana, mango grafts) gives identical plants that fruit early.',
      ],
      v: table(['Organism', 'Method'], [['Amoeba', 'Binary fission'], ['Plasmodium', 'Multiple fission'], ['Spirogyra', 'Fragmentation'], ['Planaria', 'Regeneration'], ['Hydra', 'Budding'], ['Rhizopus', 'Spore formation'], ['Bryophyllum', 'Vegetative propagation (leaf)']], 'Summary table of seven organisms and their method of asexual reproduction'),
      n: 'Let us recap. Every act of reproduction starts with copying DNA, and small copying errors create variation, which helps species survive change. Single parents reproduce in many ways: splitting into two or many, breaking into pieces, regrowing, budding, making spores, or growing new plants from roots, stems and leaves. Learn one example for each method; examiners love asking for them.',
    }),
    sl('exam-tips', 'Exam tips: asexual reproduction', {
      ul: [
        'Always pair the method with the right example: Plasmodium is **multiple** fission, not binary.',
        'Variation: say it arises from **copying errors** and existed **before** the change in the environment.',
        'Distinguish fragmentation (breaks on its own) from regeneration (rebuilding from a cut piece using specialised cells).',
        'Diagrams often asked: binary fission in Amoeba, budding in Hydra, spores of Rhizopus — label every stage.',
        'Advantages of vegetative propagation: earlier fruiting, seedless plants, identical good qualities.',
        'Typical 3-mark split: name the method (1) + describe the process (1) + example or diagram (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Plasmodium shows binary fission', 'Plasmodium shows multiple fission'], ['Variation is created when it is needed', 'Variation is already present; conditions select it'], ['Regeneration is the same as reproduction', 'Most organisms do not depend on being cut up to reproduce'], ['Spores need light to grow', 'Spores need moisture (and food) to germinate']], 'Table of common mistakes about asexual reproduction with the correct ideas'),
      n: 'Here is how to secure marks. Match each method to its correct organism without mixing up binary and multiple fission. When you explain variation, make clear it was already there and that the environment only decided who survived. Draw neat labelled stages for fission and budding. And remember the three advantages of vegetative propagation; they come up again and again.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'How do Organisms Reproduce? — Part 2: Sexual reproduction in flowering plants',
  goals: [
    'Explain why germ cells carry half the DNA of body cells',
    'Label the parts of a flower and state their roles',
    'Describe pollination, fertilisation and the formation of seeds and fruits',
    'Identify the parts of a germinating seed',
  ],
  slides: [
    sl('title', 'Sexual reproduction in flowering plants', {
      b: 'Part 2 — why two parents create more variety, and how a flower turns into a fruit full of seeds.',
      v: flow('LR', [['f', 'Flower'], ['p', 'Pollination'], ['z', 'Fertilisation: zygote'], ['s', 'Ovule becomes seed'], ['fr', 'Ovary becomes fruit']], [['f', 'p'], ['p', 'z'], ['z', 's'], ['z', 'fr']], 'Flow from flower to pollination, fertilisation, seed and fruit'),
      n: 'Every mango, every grain of rice and every pea you eat began as a flower. In this part we open up a flower, follow a grain of pollen on its journey, and watch an ovule become a seed and an ovary become a fruit. Along the way we will see why mixing DNA from two parents is such a powerful idea.',
    }),
    sl('concept', 'Why two parents? Germ cells with half the DNA', {
      b: 'Sexual reproduction combines DNA from **two** parents, so offspring get **new combinations** and more **variation**. To keep the amount of DNA constant, **germ cells** (gametes) carry only **half** the chromosomes of a body cell. When a male and a female germ cell fuse, the **zygote** has the full set again.',
      v: flow('LR', [['m', 'Male germ cell: half set'], ['f', 'Female germ cell: half set'], ['z', 'Zygote: full set'], ['o', 'New individual with a new mix of DNA']], [['m', 'z'], ['f', 'z'], ['z', 'o']], 'Flow: male and female germ cells each with half the chromosomes fuse into a zygote with the full set'),
      n: 'If each parent simply passed on its full DNA, the amount would double every generation, and the cell’s design would fall apart. So bodies make special germ cells with exactly half the chromosomes. Two halves join to make a whole. Because each parent contributes a different half, every offspring gets a fresh combination, which is why brothers and sisters look different.',
    }),
    sl('example', 'Worked example 1: counting chromosomes', {
      b: 'Body cells of a potato plant have **48** chromosomes. How many are there in (a) its egg cell, (b) a pollen grain’s male germ cell, (c) the zygote?',
      ul: [
        r`Step 1 — Germ cells carry half the body-cell number: $\dfrac{48}{2} = 24$.`,
        'Step 2 — (a) Egg cell: **24**. (b) Male germ cell: **24**.',
        r`Step 3 — (c) Zygote $=$ male $+$ female germ cell $= 24 + 24 = 48$.`,
        'Check — the zygote has the same number as the parent’s body cells, so the number stays constant across generations.',
      ],
      v: table(['Cell', 'Chromosomes'], [['Body cell of the plant', '48'], ['Egg cell (female germ cell)', '24'], ['Male germ cell', '24'], ['Zygote', '48']], 'Worked table: body cell 48, egg 24, male germ cell 24, zygote 48 chromosomes'),
      n: 'This is a favourite short question. Halve the body-cell number for any germ cell, and add the two germ cells back together for the zygote. Notice the check at the end: the zygote returns to the original number. If you ever get a zygote with double the parent’s number, you know something has gone wrong in your reasoning.',
    }),
    sl('diagram', 'Parts of a flower', {
      b: 'A flower has **sepals**, **petals**, **stamens** and a **pistil**. The **stamen** (male) is an **anther** on a **filament**; the anther makes **pollen grains**. The **pistil** (female) has a sticky **stigma**, a long **style** and a swollen **ovary** containing **ovules**, each with a female germ cell (egg).',
      v: V.flower,
      n: 'Let us dissect a flower from the outside in. Green sepals protected the bud. Bright petals attract insects. Next come the stamens, each with a pollen-filled anther on a thin stalk. At the centre is the pistil: a sticky stigma at the top, a tube-like style, and the ovary at the bottom, holding the ovules. Stamens and pistil are the reproductive parts.',
    }),
    sl('concept', 'Unisexual and bisexual flowers', {
      b: 'A **bisexual** flower has both stamens and a pistil, such as **hibiscus** and **mustard**. A **unisexual** flower has either stamens or a pistil, such as **papaya** and **watermelon**.',
      v: table(['Type', 'Contains', 'Examples'], [['Bisexual', 'Stamens and pistil in the same flower', 'Hibiscus, mustard'], ['Unisexual (male)', 'Stamens only', 'Papaya (male tree), watermelon'], ['Unisexual (female)', 'Pistil only', 'Papaya (female tree), watermelon']], 'Table of bisexual and unisexual flowers with what they contain and examples'),
      n: 'Not every flower has both male and female parts. A hibiscus flower has both, so it is bisexual. Papaya is different: some trees carry only male flowers and others only female flowers, so only the female trees bear fruit. Watermelon and pumpkin vines carry separate male and female flowers on the same plant. This matters for how pollen gets around.',
    }),
    sl('check', 'Quick check: the male part', {
      b: 'Which part of a flower produces pollen grains?',
      n: 'Quick check. Recall the two parts of a stamen. Which one is the pollen factory?',
      chk: 'anther-mcq',
    }),
    sl('concept', 'Pollination', {
      b: '**Pollination** is the transfer of pollen from an **anther** to a **stigma**. In **self-pollination** the pollen reaches the stigma of the same flower (or another flower on the same plant); in **cross-pollination** it reaches a flower on another plant, carried by **wind, water, insects or birds**.',
      v: table(['Agent', 'Typical flower features', 'Example'], [['Insects', 'Bright petals, scent, nectar', 'Mustard, sunflower'], ['Wind', 'Small dull flowers, light pollen in large amounts', 'Maize, grasses'], ['Birds', 'Large, brightly coloured flowers with nectar', 'Silk cotton (semal)'], ['Water', 'Pollen carried on the water surface', 'Some water plants']], 'Table of pollinating agents with typical flower features and examples'),
      n: 'A pollen grain cannot walk, so it needs a carrier. Bees visiting mustard fields in winter carry pollen from flower to flower while they collect nectar. Maize sheds clouds of light pollen into the wind. Birds visit big red silk cotton flowers. Cross-pollination brings in DNA from another plant, adding even more variety to the next generation.',
    }),
    sl('diagram', 'Fertilisation: the pollen tube', {
      b: 'After landing on the stigma, a pollen grain grows a **pollen tube** down through the **style** to the **ovule**. The tube carries the **male germ cell**, which fuses with the **female germ cell** (egg) in the ovule: **fertilisation**. The fused cell is the **zygote**.',
      v: V.pollenTube,
      n: 'The stigma is only the first stop. The male germ cell is still far from the egg, which sits deep inside the ovule in the ovary. So the pollen grain grows a fine tube that tunnels down through the style, guided by chemicals, until it reaches the ovule. The male germ cell travels down the tube and fuses with the egg. That moment is fertilisation.',
    }),
    sl('concept', 'After fertilisation: seed and fruit', {
      b: 'The **zygote** divides many times to form an **embryo** inside the ovule. The **ovule** develops a tough coat and becomes a **seed**. The **ovary** grows and ripens into a **fruit**. Petals, sepals, stamens, style and stigma usually **wither and fall off**.',
      v: flow('LR', [['z', 'Zygote'], ['e', 'Embryo'], ['o', 'Ovule'], ['s', 'Seed (with a tough coat)'], ['ov', 'Ovary'], ['fr', 'Fruit'], ['p', 'Petals, sepals, stamens, style, stigma'], ['w', 'Wither and fall off']], [['z', 'e', 'divides many times'], ['o', 's'], ['ov', 'fr'], ['p', 'w']], 'Flow of changes after fertilisation: zygote to embryo, ovule to seed, ovary to fruit, other parts wither'),
      n: 'Cut open a pea pod and you can see the result. The pod is the ripened ovary, which is the fruit. Each pea inside is a seed that was once an ovule, and each seed holds a tiny embryo, a future plant. The petals and stamens that made the flower beautiful have done their job, so they dry up and drop off.',
    }),
    sl('check', 'Quick check: seed and fruit', {
      b: 'Judge the assertion and the reason about what happens after fertilisation.',
      n: 'Quick check. Both statements are about changes after fertilisation. Are both true? Does one really explain the other?',
      chk: 'fruit-ar',
    }),
    sl('example', 'Worked example 2: counting from a pea pod', {
      b: 'A pea pod contains **7** seeds. What is the minimum number of (a) ovules that were fertilised, (b) pollen grains that reached the stigma, and (c) flowers involved?',
      ul: [
        'Step 1 — Each seed develops from one fertilised ovule: (a) **7** ovules.',
        'Step 2 — Each ovule needs a male germ cell brought by its own pollen tube: (b) at least **7** pollen grains.',
        'Step 3 — A pod is the ripened ovary of **one** flower: (c) **1** flower.',
        'Check — an ovule that was not fertilised would not become a seed, so the ovary may have had more than 7 ovules.',
      ],
      v: table(['Part of the pod', 'Came from', 'Number'], [['Pod (fruit)', 'Ovary of one flower', '1'], ['Peas (seeds)', 'Fertilised ovules', '7'], ['Pollen grains needed', 'One pollen tube per ovule', 'At least 7']], 'Worked table relating the pod to one ovary, seven seeds to seven fertilised ovules and at least seven pollen grains'),
      n: 'Link each structure to its origin, and the counting becomes easy. One pod means one ovary, so one flower. Seven seeds means seven fertilised ovules, and each needed its own pollen tube, so at least seven pollen grains landed and grew. Saying at least is important, because extra pollen grains often land on a stigma without reaching an ovule.',
    }),
    sl('diagram', 'The seed and germination', {
      b: 'A seed holds the **embryo**: the **plumule** grows into the shoot, the **radicle** grows into the root, and the **cotyledons** store food for the young seedling. With water, air and a suitable temperature, the seed **germinates**.',
      v: V.seed,
      n: 'Soak a few chana seeds overnight and split one open. You will see two thick halves, the cotyledons, packed with stored food. Between them is a tiny embryo. Its radicle pushes down to become the root, and its plumule grows up into the shoot. Until the young leaves can make food, the seedling lives on the food stored in the cotyledons.',
    }),
    sl('check', 'Quick check: what becomes the fruit?', {
      b: 'Complete the statement about the change after fertilisation.',
      n: 'Quick check. Think of the pea pod again. Which part of the pistil swelled up to become the pod?',
      chk: 'ovary-fill',
    }),
    sl('summary', 'Summary: reproduction in flowering plants', {
      ul: [
        'Germ cells carry half the chromosomes; fusion restores the full set in the zygote.',
        'Stamen = anther + filament (male); pistil = stigma + style + ovary (female).',
        'Bisexual flowers: hibiscus, mustard. Unisexual: papaya, watermelon.',
        'Pollination: anther to stigma; self or cross; by wind, water, insects, birds.',
        'Pollen tube carries the male germ cell to the egg in the ovule: fertilisation gives a zygote.',
        'Ovule → seed; ovary → fruit; seed: plumule, radicle, cotyledons.',
      ],
      v: table(['Before fertilisation', 'After fertilisation'], [['Zygote', 'Embryo'], ['Ovule', 'Seed'], ['Ovary', 'Fruit'], ['Petals, sepals, stamens', 'Wither and fall']], 'Summary table of flower parts before fertilisation and what they become afterwards'),
      n: 'Let us recap. Two parents each give a germ cell with half the chromosomes, and their fusion makes a zygote with a new mix of DNA. In flowers, pollen travels from anther to stigma, a pollen tube delivers the male germ cell to the egg, and fertilisation follows. Then the ovule becomes a seed and the ovary becomes a fruit, ready to start the cycle again.',
    }),
    sl('exam-tips', 'Exam tips: flowering plants', {
      ul: [
        'Do not confuse **pollination** (pollen reaches the stigma) with **fertilisation** (germ cells fuse in the ovule).',
        'Ovule → **seed** and ovary → **fruit**: a very common one-mark question.',
        'Flower diagram: label sepal, petal, anther, filament, stigma, style, ovary, ovule; draw the ovules inside the ovary.',
        'Pollen tube diagram: show the tube through the style reaching the ovule.',
        'Chromosome sums: germ cell = half; zygote = germ cell + germ cell.',
        'Typical 5-mark split: diagram (2) + pollination (1) + fertilisation (1) + post-fertilisation changes (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Ovary becomes the seed', 'Ovule becomes the seed; ovary becomes the fruit'], ['Pollination is fertilisation', 'Pollination comes first; fertilisation is the fusion of germ cells'], ['Papaya flowers are bisexual', 'Papaya flowers are unisexual'], ['Germ cells have the full set of chromosomes', 'Germ cells have half the set']], 'Table of common mistakes about plant reproduction with the correct ideas'),
      n: 'Here is how to avoid losing marks. Keep pollination and fertilisation as two separate steps, in that order. Learn the two key changes, ovule to seed and ovary to fruit, so well that you never swap them. In diagrams, draw the ovules inside the ovary and the pollen tube reaching an ovule. And always halve, never double, for germ cells.',
    }),
  ],
});

export const deck3 = deck({
  part: 3,
  title: 'How do Organisms Reproduce? — Part 3: Human reproduction and reproductive health',
  goals: [
    'Describe the changes of puberty in boys and girls',
    'Describe the male and female reproductive systems and the functions of their parts',
    'Explain fertilisation, implantation, nourishment of the embryo and menstruation',
    'Compare methods of contraception and explain how sexually transmitted diseases spread and are prevented',
    'Explain why sex-selective abortion and female foeticide are harmful and illegal',
  ],
  slides: [
    sl('title', 'Reproduction in human beings', {
      b: 'Part 3 — the changes of growing up, how the human reproductive systems work, how a baby develops, and how to stay healthy.',
      v: flow('LR', [['p', 'Puberty: body becomes ready'], ['g', 'Germ cells: sperms and eggs'], ['f', 'Fertilisation in the oviduct'], ['i', 'Implantation in the uterus'], ['d', 'Development for about nine months'], ['b', 'Birth']], [['p', 'g'], ['g', 'f'], ['f', 'i'], ['i', 'd'], ['d', 'b']], 'Flow from puberty to germ cells, fertilisation, implantation, development and birth'),
      n: 'Our bodies change a lot in the teenage years, and these changes are normal and healthy. In this part we learn, in plain scientific language, how the human reproductive system works and how a baby grows inside the mother. We also look at reproductive health: how people can plan families, protect themselves from infections, and why every girl child must be valued.',
    }),
    sl('concept', 'Puberty: the body gets ready', {
      b: '**Puberty** is the period when the reproductive organs mature and **germ cells** begin to be made. It usually begins somewhere between about nine and fourteen years of age, at different times for different people.',
      v: table(['Common to boys and girls', 'In girls', 'In boys'], [['Thick hair grows in the armpits and genital area', 'Breasts begin to develop; the skin of the nipples darkens', 'Hair grows on the face'], ['Thinner hair appears on the legs, arms and face', 'Menstruation begins', 'The voice begins to crack and deepen'], ['Skin becomes oilier; pimples may appear', 'Hips broaden', 'Shoulders broaden']], 'Table of puberty changes common to boys and girls, and those specific to each'),
      n: 'Puberty is like the body switching on a new system. Some changes happen in everyone: new hair growth, oilier skin and sometimes pimples. Girls begin to menstruate, and boys find their voices cracking. These changes start at different ages for different people, and that is completely normal. Hormones from the testes and ovaries drive them, as you learnt in the previous chapter.',
    }),
    sl('diagram', 'The male reproductive system', {
      b: 'The **testes** make **sperms** and the hormone **testosterone**. They lie outside the abdomen in the **scrotum**, because sperm formation needs a temperature **lower** than body temperature. Sperms travel through the **vas deferens**, which joins the **urethra** coming from the **urinary bladder**.',
      v: V.male,
      n: 'Here is the male system. The two testes are the sperm factories. Interestingly, they hang outside the body in a pouch called the scrotum, because sperms form best a little below normal body temperature. From each testis, a tube called the vas deferens carries sperms upwards to join the urethra, which leads out through the penis. The urethra also carries urine, but never at the same time.',
    }),
    sl('concept', 'Sperms and semen', {
      b: '**Sperms** are tiny cells made mostly of **genetic material**, with a long **tail** to swim towards the egg. The **seminal vesicles** and **prostate gland** add fluids, so sperms travel in a liquid called **semen**, which also nourishes them.',
      v: flow('LR', [['t', 'Testes make sperms'], ['v', 'Vas deferens carries them'], ['g', 'Seminal vesicles and prostate add fluid: semen'], ['u', 'Urethra'], ['o', 'Out through the penis']], [['t', 'v'], ['v', 'g'], ['g', 'u'], ['u', 'o']], 'Flow of sperms from the testes through the vas deferens, joined by fluid from the glands, into the urethra and out'),
      n: 'A sperm is one of the smallest cells in the body. It carries hardly anything except its genetic material, and it has a long tail for swimming. Millions are made every day. On their way out, glands add a nourishing fluid, so the sperms travel in semen. This fluid helps them move and gives them energy for their long journey towards an egg.',
    }),
    sl('check', 'Quick check: why outside the body?', {
      b: 'Why are the testes located outside the abdominal cavity, in the scrotum?',
      n: 'Quick check. Think about temperature. What do sperms need that the inside of the abdomen cannot give them?',
      chk: 'testes-scrotum-mcq',
    }),
    sl('diagram', 'The female reproductive system', {
      b: 'The two **ovaries** make **eggs** and the hormone **oestrogen**. Each egg is carried by an **oviduct** (fallopian tube) towards the **uterus**, a muscular, bag-like organ. The uterus opens into the **vagina** through the **cervix**.',
      v: V.female,
      n: 'Now the female system. The two ovaries sit on either side of the uterus. A girl is born with thousands of immature eggs in her ovaries. After puberty, usually one egg matures and is released each month by one of the ovaries. The oviduct catches the egg and carries it towards the uterus, a strong, stretchy organ where a baby can grow. The cervix leads from the uterus into the vagina.',
    }),
    sl('concept', 'Eggs and ovaries', {
      b: 'At birth the ovaries already contain **thousands of immature eggs**. From puberty, **one egg** is usually released **each month** by one of the two ovaries. An egg that is not fertilised lives for only about **one day**.',
      v: table(['Feature', 'Male', 'Female'], [['Main organ', 'Testes', 'Ovaries'], ['Germ cell', 'Sperm (tiny, with a tail)', 'Egg (large, cannot swim)'], ['Number made', 'Millions, continuously', 'Usually one a month'], ['Hormone', 'Testosterone', 'Oestrogen']], 'Table comparing male and female organs, germ cells, numbers made and hormones'),
      n: 'Compare the two germ cells. Sperms are tiny swimmers, made in millions. The egg is much larger, because it carries food for the first divisions of the embryo, and it cannot move by itself. Usually only one egg is released each month. If it does not meet a sperm within about a day, it does not survive.',
    }),
    sl('concept', 'Fertilisation and implantation', {
      b: 'Sperms swim up through the uterus into the oviduct. **Fertilisation** usually happens in the **oviduct**, giving a **zygote**. The zygote divides as it moves to the uterus and **implants** in the thick, blood-rich **lining of the uterus**, where it grows into an **embryo**.',
      v: flow('LR', [['s', 'Sperms enter through the vagina'], ['u', 'Swim through the uterus'], ['o', 'Meet the egg in the oviduct'], ['z', 'Zygote forms'], ['i', 'Embryo implants in the uterus lining']], [['s', 'u'], ['u', 'o'], ['o', 'z', 'fertilisation'], ['z', 'i', 'divides on the way']], 'Flow of sperms through the uterus to the oviduct, fertilisation, zygote formation and implantation in the uterus'),
      n: 'Of the millions of sperms released, only a few reach the oviduct, and only one fertilises the egg. The zygote starts dividing right away and drifts down to the uterus over several days. There, the ball of cells settles into the soft, thick lining, rich in blood vessels. This settling is called implantation, and it marks the start of pregnancy.',
    }),
    sl('diagram', 'The placenta: lifeline of the embryo', {
      b: 'The embryo is nourished through the **placenta**, a disc embedded in the uterine wall. Its **villi** on the embryo’s side are surrounded by spaces filled with the mother’s blood, giving a **large surface area** for **glucose and oxygen** to pass to the embryo and **wastes** to pass back. The baby is born after about **nine months**, by rhythmic contractions of the uterus muscles.',
      v: V.placenta,
      n: 'The growing embryo cannot eat or breathe. Everything it needs comes through the placenta. Finger-like villi on the embryo’s side dip into pools of the mother’s blood, creating a huge surface for exchange. Glucose and oxygen pass in; carbon dioxide and other wastes pass out. The two bloods do not mix. This is why a mother’s diet and health matter so much during pregnancy.',
    }),
    sl('example', 'Worked example 1: tracing the journey', {
      b: 'Trace the path of a sperm from the testis to the place of fertilisation, and the path of the egg from the ovary to the same place.',
      ul: [
        'Step 1 — Sperm: **testis → vas deferens → urethra** (with fluid from the seminal vesicles and prostate) → out through the penis.',
        'Step 2 — In the female body: **vagina → cervix → uterus → oviduct**.',
        'Step 3 — Egg: **ovary → oviduct**.',
        'Conclusion — they meet in the **oviduct**: fertilisation; the zygote then moves to the **uterus** to implant.',
      ],
      v: table(['Germ cell', 'Path', 'Meeting place'], [['Sperm', 'Testis, vas deferens, urethra, vagina, cervix, uterus, oviduct', 'Oviduct'], ['Egg', 'Ovary, oviduct', 'Oviduct']], 'Worked table tracing the sperm and egg pathways to the oviduct, where fertilisation happens'),
      n: 'Tracing pathways is a common exam task, so practise it in order. Start the sperm in the testis and follow every tube: vas deferens, urethra, then into the female body through the vagina, cervix and uterus, up to the oviduct. The egg has a much shorter trip, from the ovary into the oviduct. Their meeting point, the oviduct, is the answer examiners look for.',
    }),
    sl('concept', 'If the egg is not fertilised: menstruation', {
      b: 'Every month the uterus lining becomes **thick and spongy** to receive an embryo. If the egg is **not fertilised**, this lining is not needed: it slowly breaks down and leaves through the vagina as **blood and mucus**. This is **menstruation**; it happens roughly every month and usually lasts **two to eight days**.',
      v: flow('LR', [['t', 'Uterus lining thickens'], ['e', 'Egg released'], ['n', 'Egg not fertilised'], ['b', 'Lining breaks down'], ['m', 'Menstruation: blood and mucus pass out'], ['r', 'New lining builds up']], [['t', 'e'], ['e', 'n'], ['n', 'b'], ['b', 'm'], ['m', 'r'], ['r', 't', 'next month']], 'Monthly cycle: lining thickens, egg released, if not fertilised the lining breaks down and passes out, then rebuilds'),
      n: 'Each month, the body prepares a soft, cushioned bed in the uterus, just in case an embryo arrives. When no fertilised egg comes, the bed is taken apart and leaves the body as menstrual flow. Then the cycle starts again. Menstruation is a normal, healthy process, and good hygiene, rest and a nourishing diet help girls stay comfortable during it.',
    }),
    sl('check', 'Quick check: the monthly lining', {
      b: 'Judge the assertion and the reason about the lining of the uterus.',
      n: 'Quick check. Why does the uterus prepare a thick lining every single month? Decide whether the reason truly explains the assertion.',
      chk: 'lining-ar',
    }),
    sl('concept', 'Reproductive health and infections', {
      b: '**Sexually transmitted diseases** (STDs) spread through sexual contact. **Bacterial**: gonorrhoea, syphilis. **Viral**: warts, **HIV-AIDS**. Using a **condom** reduces the spread of many of these infections. HIV can also spread through infected blood and from an infected mother to her baby.',
      v: table(['Disease', 'Caused by', 'Prevention'], [['Gonorrhoea', 'Bacteria', 'Condom; early treatment with medicines'], ['Syphilis', 'Bacteria', 'Condom; early treatment with medicines'], ['Warts', 'Virus', 'Condom; avoiding contact'], ['HIV-AIDS', 'Virus (HIV)', 'Condom; screened blood; unused needles']], 'Table of four sexually transmitted diseases with their cause and prevention'),
      n: 'Reproductive health means being physically, mentally and socially healthy in matters of reproduction. Some infections spread through sexual contact. Bacterial ones, like gonorrhoea and syphilis, can be treated with medicines if caught early. Viral ones, like HIV, are harder to treat. Condoms, screened blood and never sharing needles greatly reduce the risk. Talking to a doctor without shame is always the right step.',
    }),
    sl('concept', 'Contraception: choosing when to have children', {
      b: '**Contraception** prevents pregnancy. Methods differ in how they work and in their side effects.',
      v: table(['Method', 'How it works', 'Points to note'], [['Barrier (condom)', 'Stops sperms reaching the egg', 'Also reduces spread of STDs'], ['Hormonal (oral pills)', 'Changes hormone balance so eggs are not released', 'Can have side effects'], ['Copper-T or loop', 'Placed in the uterus to prevent pregnancy', 'Can irritate the uterus'], ['Surgical', 'Vas deferens (male) or oviducts (female) are blocked', 'Permanent; needs a safe, proper operation']], 'Table of four contraceptive methods, how each works and points to note'),
      n: 'Planning when to have children helps the health of mothers and families, and helps families care well for each child. There are several methods. Condoms block sperms and also reduce infections. Pills change hormone levels so no egg is released. A copper-T is placed in the uterus. Surgery blocks the tubes that carry sperms or eggs. A doctor helps people choose what suits them.',
    }),
    sl('example', 'Worked example 2: which method fits?', {
      b: 'For each need, choose a suitable method from the table and give a reason: (a) preventing pregnancy and also lowering the risk of infection, (b) a couple who have decided to have no more children, (c) a method that works by stopping the release of eggs.',
      ul: [
        'Step 1 — (a) **Condom**: it is a barrier, so it stops sperms and also reduces the spread of STDs.',
        'Step 2 — (b) **Surgical method** (vasectomy or tubectomy): it is permanent.',
        'Step 3 — (c) **Oral pills**: they change the hormone balance so that eggs are not released.',
        'Check — only barrier methods protect against infections; pills, copper-T and surgery do not.',
      ],
      v: table(['Need', 'Method', 'Reason'], [['Prevent pregnancy and reduce infection', 'Condom', 'Physical barrier'], ['No more children', 'Surgical', 'Permanent'], ['Stop egg release', 'Oral pills', 'Hormonal']], 'Worked table matching three needs to condom, surgery and pills with reasons'),
      n: 'This kind of question tests whether you understand how each method works, not just its name. Read the need carefully. If infection is mentioned, only a barrier method fits. If the decision is permanent, surgery fits. If the question talks about eggs not being released, it is describing hormonal pills. Always add the reason, because that is where the second mark lies.',
    }),
    sl('check', 'Quick check: protection from infection', {
      b: 'Which contraceptive method also reduces the risk of passing on sexually transmitted diseases?',
      n: 'Quick check. Which method works as a physical barrier between partners?',
      chk: 'condom-mcq',
    }),
    sl('concept', 'Every girl child counts', {
      b: 'Surgery that ends a pregnancy can be misused to abort female foetuses after illegal **prenatal sex determination**. This **female foeticide** is a crime in India and has **lowered the child sex ratio** in some regions, harming society for generations.',
      v: table(['Fact', 'Why it matters'], [['Sex determination of a foetus is banned by law', 'Prevents sex-selective abortion'], ['Female foeticide lowers the number of girls per thousand boys', 'Creates an unequal society'], ['Girls and boys have equal rights', 'Every child deserves to be born and valued']], 'Table of facts about female foeticide and why each matters'),
      n: 'Science gives us powerful tools, and they must be used responsibly. In some places, people have misused medical tests to find out whether a foetus is a girl and then ended the pregnancy. This is female foeticide. It is illegal in India, and it has left some regions with far fewer girls than boys. A healthy society values every child equally.',
    }),
    sl('summary', 'Summary: human reproduction and health', {
      ul: [
        'Puberty brings changes that prepare the body for reproduction.',
        'Testes in the scrotum make sperms (and testosterone); vas deferens and urethra carry them; glands add fluid.',
        'Ovaries release an egg about once a month; the oviduct carries it; fertilisation happens in the oviduct.',
        'The embryo implants in the uterus and is nourished through the placenta; birth after about nine months.',
        'No fertilisation: the uterus lining is shed as menstruation.',
        'Condoms, pills, copper-T and surgery prevent pregnancy; condoms also reduce STDs; female foeticide is illegal.',
      ],
      v: table(['Structure', 'Function'], [['Testis', 'Makes sperms and testosterone'], ['Ovary', 'Releases eggs; makes oestrogen'], ['Oviduct', 'Site of fertilisation'], ['Uterus', 'Implantation and development'], ['Placenta', 'Exchange between mother and embryo']], 'Summary table of five reproductive structures and their functions'),
      n: 'Let us recap. At puberty, the body becomes able to make germ cells. Sperms from the testes and an egg from an ovary meet in the oviduct. The embryo implants in the uterus and is fed through the placenta until birth. If there is no fertilisation, the uterine lining is shed each month. Good reproductive health means informed choices, protection from infection and respect for every child.',
    }),
    sl('exam-tips', 'Exam tips: human reproduction', {
      ul: [
        'Fertilisation happens in the **oviduct**, not in the uterus; implantation happens in the uterus.',
        'Give the reason for the scrotum: sperm formation needs a **lower temperature**.',
        'Placenta answers: villi, **large surface area**, glucose and oxygen in, wastes out.',
        'Only **barrier** methods reduce the spread of STDs; name gonorrhoea and syphilis as bacterial, warts and HIV-AIDS as viral.',
        'Diagrams: label testis, scrotum, vas deferens, seminal vesicle, prostate, urethra; ovary, oviduct, uterus, cervix, vagina.',
        'Typical 3-mark split: structure (1) + function (1) + reason or example (1).',
      ],
      v: table(['Common mistake', 'Correct idea'], [['Fertilisation takes place in the uterus', 'It takes place in the oviduct'], ['Pills protect against STDs', 'Only barrier methods reduce STD spread'], ['Mother’s and baby’s blood mix in the placenta', 'Substances pass across; the bloods do not mix'], ['Menstruation means illness', 'It is a normal monthly process']], 'Table of common mistakes about human reproduction with the correct ideas'),
      n: 'Here is how to score well. Keep the places straight: eggs are made in the ovary, fertilised in the oviduct, and grow in the uterus. Explain the placenta with the words villi and surface area. In questions about contraception, remember that only barrier methods protect against infections. Use correct scientific terms calmly and clearly; that is exactly what examiners want.',
    }),
  ],
});
