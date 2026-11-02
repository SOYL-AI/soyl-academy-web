// ch13 Plant Growth and Development — question bank. AR keys: a d c a b d c (in bank order below).
import { mk, add, r, svgV } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { N, DAYS, HEIGHT, DAYS2, HEIGHT2, SEEDS2, arith, geo, cellsAfter, mass, percent, exptLetter, round, rate } from './calc.mjs';
import { EXPT_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const exptAsset = svgV(EXPT_LETTERED, 'Five coleoptile experiments labelled A to E');

// ---------------------------------------------------------------- t01 growth, differentiation and development
add('growth-mcq', mcq({
  stem: 'A dry bean seed, soaked for hours, swells to twice its size, and shrinks again when dried. Why is this swelling not counted as growth?',
  right: 'The increase in size is reversible, whereas growth is permanent and irreversible.',
  wrong: ['The increase takes place without any water being absorbed.', 'Growth occurs only in animals, which have determinate form.', 'Growth is counted only when cells decrease in number.'],
  sol: 'Growth is a permanent, irreversible increase in size; a seed that swells with water and shrinks on drying has not grown — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('indet-mcq', mcq({
  stem: 'A banyan tree that is hundreds of years old still puts out new branches and leaves every year, while a human stops adding new height in adult life. This is because in plants',
  right: 'meristems at the tips keep dividing throughout life, giving open growth',
  wrong: ['all the cells of the plant keep dividing equally at all times', 'meristems are lost after the seedling stage, but cells enlarge for ever', 'growth stops after flowering and later shoots are only repairs'],
  sol: 'Plants have indeterminate (open) growth because meristems at root and shoot tips retain the capacity to divide — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('phases-mcq', mcq({
  stem: 'Under the microscope, cells about 4 mm behind a root tip are much longer than those at the tip, with large vacuoles, and are not dividing. These cells are in the',
  right: 'elongation phase of growth',
  wrong: ['meristematic phase of growth', 'maturation phase of growth', 'stationary phase of the growth curve'],
  sol: 'Cells that have stopped dividing and are enlarging, with large vacuoles, are in the elongation phase — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('arith-mcq', mcq({
  stem: 'A student plots the length of a bamboo shoot against time and gets a straight line. This suggests that',
  right: 'only one daughter cell of each division keeps dividing, giving arithmetic growth',
  wrong: ['both daughter cells keep dividing, giving geometric growth', 'no cell divides, so the growth is reversible', 'the shoot has reached the stationary phase of an S-shaped curve'],
  sol: 'A straight line of length against time is arithmetic growth: one daughter cell keeps dividing and the other differentiates — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('geo-mcq', mcq({
  stem: 'A culture of plant cells shows a graph of cell number that rises slowly for a few days and then climbs very steeply. This pattern is typical of',
  right: 'geometric growth, in which both daughter cells keep dividing',
  wrong: ['arithmetic growth, in which only one daughter cell keeps dividing', 'determinate growth, in which cells never divide again', 'dedifferentiation, in which cells stop dividing for ever'],
  sol: 'Slow growth followed by a rapid exponential rise is geometric growth — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('lag-mcq', mcq({
  stem: 'On the S-shaped growth curve of a seedling, the initial period of slow growth is called the',
  right: 'lag phase',
  wrong: ['log phase', 'stationary phase', 'maturation phase'],
  sol: 'The slow beginning of the sigmoid curve is the lag phase; the steep part is the log phase and the flat end is the stationary phase — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('log-mcq', mcq({
  stem: 'A seedling is measured every five days. Between which part of its sigmoid growth curve does it add the greatest height per day?',
  right: 'The log (exponential) phase',
  wrong: ['The lag phase at the start', 'The stationary phase at the end', 'The phase just after the seed is shed'],
  sol: 'Growth is fastest in the log or exponential phase, the steep middle of the S-curve — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('stat-mcq', mcq({
  stem: 'A seedling in a small pot grows well for weeks, but then its height curve goes flat although it is still alive. The most likely reason is that',
  right: 'nutrients and space have become limiting, so growth enters the stationary phase',
  wrong: ['the meristem has begun a fresh exponential phase', 'dedifferentiation has made the leaves lose all their cells', 'arithmetic growth always stops when a plant is watered'],
  sol: 'In a limited environment growth levels off in the stationary phase as nutrients or space become limiting — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cond-mcq', mcq({
  stem: 'Maize seedlings grown in a pot that has been flooded for days grow very poorly, and their roots look weak. The most likely limiting factor for their growth is',
  right: 'oxygen, needed for respiration to release energy',
  wrong: ['carbon dioxide in the soil water', 'excess of light reaching the roots', 'lack of gravity acting on the pot'],
  sol: 'Waterlogged soil has little oxygen; roots need oxygen for aerobic respiration, which supplies energy for growth — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dedif-mcq', mcq({
  stem: 'When the surface of a potato tuber is cut, mature parenchyma cells near the wound start dividing again and form a mass of cells called a callus. This process is',
  right: 'dedifferentiation',
  wrong: ['redifferentiation', 'differentiation of the meristem', 'senescence'],
  sol: 'Living differentiated cells regaining the capacity to divide is dedifferentiation — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('redif-mcq', mcq({
  stem: 'Some cells of a callus later lose the ability to divide and develop lignified walls to become vessel elements. This step is',
  right: 'redifferentiation',
  wrong: ['dedifferentiation', 'plasticity of the juvenile leaf', 'the lag phase of growth'],
  sol: 'Cells produced by dedifferentiation that lose division again and mature are redifferentiated — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('plastic-mcq', mcq({
  stem: 'A water buttercup produces feathery leaves under water and broad leaves in air. This ability to form different structures in different environments is called',
  right: 'plasticity, shown here as heterophylly',
  wrong: ['dedifferentiation, shown here as callus formation', 'bolting, shown here as internode elongation', 'apical dominance, shown here as bud suppression'],
  sol: 'Different leaf forms in air and water are heterophylly, an example of plasticity — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('rgr-mcq', mcq({
  stem: 'Seedling P grows from 2 cm to 4 cm and seedling Q from 10 cm to 14 cm in the same time. Which statement is correct?',
  right: 'Q gained more in length, but P has the higher relative growth rate.',
  wrong: ['P gained more in length, and also has the higher relative growth rate.', 'Q gained more in length, and also has the higher relative growth rate.', 'Both have the same relative growth rate, because both grew.'],
  sol: `Q gained 4 cm and P only 2 cm, but relative to the starting size P grew by ${N.relP} percent and Q by ${N.relQ} percent — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => N.relP > N.relQ || 'rgr');
add('arith-ar', ar({
  a: 'The length of a root that grows arithmetically increases by the same amount in each hour.',
  r: 'In arithmetic growth only one of the two daughter cells formed at each division keeps dividing.',
  key: 'a',
  sol: 'Both are true, and the fixed number of dividing cells explains the constant increase — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('geo-ar', ar({
  a: 'A geometric growth curve is a straight line.',
  r: 'In geometric growth both daughter cells keep dividing.',
  key: 'd',
  sol: 'A is false: the curve is exponential, not straight. R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('dedif-ar', ar({
  a: 'Mature cells near a wound can form a callus.',
  r: 'Dedifferentiated cells can never again lose the capacity to divide.',
  key: 'c',
  sol: 'A is true; R is false, because cells formed by dedifferentiation may redifferentiate and mature — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('reversible-tf', tf({
  stem: 'A leaf that wilts at noon and recovers by evening has shown growth.',
  key: 'f',
  sol: 'False. Growth is permanent and irreversible; recovery of turgor is a reversible change.',
  d: 1, c: 'understanding', t: [1],
}));
add('redif-tf', tf({
  stem: 'Cells formed by dedifferentiation can mature again into specialised cells.',
  key: 't',
  sol: 'True. This is redifferentiation.',
  d: 1, c: 'recall', t: [1],
}));
add('arith-fill', fill({
  stem: 'In ______ growth only one daughter cell of each division keeps dividing, and length increases linearly with time.',
  acc: [['arithmetic']],
  sol: 'Arithmetic.',
  d: 1, c: 'recall', t: [1],
}));
add('log-fill', fill({
  stem: 'On the S-shaped growth curve, growth is fastest in the ______ phase.',
  acc: [['log', 'exponential', 'log phase', 'exponential phase', 'log (exponential)']],
  sol: 'Log (exponential).',
  d: 1, c: 'recall', t: [1],
}));
add('measure-match', match({
  stem: 'Match each parameter used to measure growth (column I) with a suitable example (column II).',
  pairs: [
    ['Increase in cell number', 'Root apical meristem'],
    ['Increase in length', 'Pollen tube'],
    ['Increase in area', 'Leaf lamina'],
    ['Increase in volume', 'Growing fruit'],
  ],
  order: [3, 0, 2, 1],
  sol: 'Cell number suits a meristem; length suits a pollen tube; area suits a leaf blade; volume suits a fruit.',
  d: 1, c: 'recall', t: [1],
}));
add('arith-num', num({
  stem: 'A shoot is 5 cm long and grows arithmetically at 1.5 cm a day. What is its length after 8 days, in cm?',
  value: N.arith30, unit: 'cm',
  sol: r`$L_t = L_0 + rt = 5 + 1.5 \times 8 = ${N.arith30}$ cm.`,
  scheme: [['Equation with values', 0.5], [`${N.arith30} cm`, 0.5]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === arith(5, 1.5, 8) || 'value');
add('geo-num', num({
  stem: 'A callus weighs 10 g and grows geometrically with a relative growth rate of 0.3 per day. What is its weight after 3 days, in g, to one decimal place? (Use e to the power 0.9 equal to 2.46.)',
  value: N.geoDay3, tol: 0.1, unit: 'g',
  sol: r`$W_t = W_0 e^{rt} = 10 \times e^{0.3 \times 3} = 10 \times 2.46 \approx ${N.geoDay3}$ g.`,
  scheme: [['Equation with values', 0.5], [`About ${N.geoDay3} g`, 0.5]],
  d: 3, c: 'application', t: [1],
}), (q) => Math.abs(q.answer.value - geo(10, 0.3, 3)) < 0.1 || 'value');
add('callus-num', num({
  stem: 'A callus starts from 5 cells, and every cell divides once in each round. How many cells are there after 4 rounds of division?',
  value: N.callus,
  sol: r`$5 \times 2^{4} = 5 \times 16 = ${N.callus}$ cells.`,
  scheme: [[`${N.callus}`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === cellsAfter(5, 4) || 'value');
add('rate-num', num({
  stem: `A seedling's height (cm) was recorded as: day ${DAYS.slice(0, 4).join(', ')} = ${HEIGHT.slice(0, 4).join(', ')}. What was its average growth rate between day 10 and day 15, in cm per day?`,
  value: N.rate2, unit: 'cm per day',
  sol: r`Growth $= ${HEIGHT[3]} - ${HEIGHT[2]} = ${HEIGHT[3] - HEIGHT[2]}$ cm in 5 days, so the rate is $\dfrac{${HEIGHT[3] - HEIGHT[2]}}{5} = ${N.rate2}$ cm per day.`,
  scheme: [['Growth in the interval', 0.5], [`${N.rate2} cm per day`, 0.5]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === rate[2] || 'value');
add('growth-short', short({
  marks: 2,
  stem: 'Define growth. Why is plant growth described as indeterminate?',
  model: '**Growth** is a **permanent, irreversible increase in size** of an organ or even of a cell, accompanied by metabolic processes that use energy. Plant growth is **indeterminate (open)** because **meristems** at the root and shoot tips keep **dividing throughout life**, so new organs are formed continually.',
  sol: 'Definition and open growth.',
  scheme: [['Permanent, irreversible increase in size', 1], ['Meristems keep dividing: indeterminate', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('phases-short', short({
  marks: 2,
  stem: 'Name the three phases of growth in a region of a growing root, and state what happens to the cells in each.',
  model: 'In the **meristematic phase** the cells **divide**. In the **elongation phase** they **enlarge**, taking up water and forming large vacuoles, which lengthens the root. In the **maturation phase** they **differentiate** into the specialised cells of permanent tissues.',
  sol: 'Meristematic, elongation, maturation.',
  scheme: [['Meristematic phase: division', 1], ['Elongation and maturation phases', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('dedif-short', short({
  marks: 2,
  stem: 'Explain dedifferentiation and redifferentiation, with one example.',
  model: '**Dedifferentiation** is the regaining of the capacity to divide by living, differentiated cells, as when mature cells at a wound form a **callus**. The cells produced may again lose the capacity to divide and **mature**: this is **redifferentiation**, for example callus cells becoming xylem vessels.',
  sol: 'Definitions with callus example.',
  scheme: [['Dedifferentiation with example', 1], ['Redifferentiation', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('conds-short', short({
  marks: 2,
  stem: 'Why do seeds sown in dry, compacted and waterlogged soils both grow poorly? Link each case to the conditions needed for growth.',
  model: 'Growth needs **water**, **oxygen** and **nutrients**. In **dry** soil there is too little water for cells to gain **turgor** and enlarge. In **compacted or waterlogged** soil there is too little **oxygen** for aerobic respiration, which supplies energy. Suitable temperature and nutrients are also needed.',
  sol: 'Water for turgor; oxygen for respiration.',
  scheme: [['Dry soil: water and turgor', 1], ['Waterlogged or compacted soil: oxygen and respiration', 1]],
  d: 2, c: 'application', t: [1],
}));
add('arithgeo-short', short({
  marks: 3,
  stem: 'Distinguish arithmetic growth from geometric growth, giving the equation for each.',
  model: 'In **arithmetic growth** only **one daughter cell** keeps dividing while the other matures, so length increases linearly, $L_t = L_0 + rt$, and the graph is a **straight line**. In **geometric growth** **both** daughter cells keep dividing, so size increases exponentially, $W_1 = W_0 e^{rt}$, where $r$ is the relative growth rate, and the graph is a **curve** that is slow at first and then very fast.',
  sol: 'Division pattern, graph, equation.',
  scheme: [['Arithmetic growth with equation', 1], ['Geometric growth with equation', 1], ['Graph shapes', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('curve-short', short({
  marks: 3,
  stem: 'Describe the three phases of the sigmoid growth curve of a plant and say why growth slows in the last phase.',
  model: 'The **lag phase** is the slow start of growth. In the **log (exponential) phase** growth is **fastest**, as in geometric growth. In the **stationary phase** growth **slows** and levels off, because **nutrients or space become limiting**, or because cells **age**. The whole curve is **S-shaped**.',
  sol: 'Lag, log, stationary phases; why growth slows.',
  scheme: [['Lag phase', 0.5], ['Log phase', 1], ['Stationary phase', 0.5], ['Reason for slowing', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('plastic-short', short({
  marks: 3,
  stem: 'What is plasticity in plants? Explain it with heterophylly, giving two examples.',
  model: '**Plasticity** is the ability of plants to follow **different pathways** and form **different structures** in response to the environment or the phase of life. In **heterophylly** the leaves of the **juvenile** plant differ in shape from those of the **mature** plant, as in **cotton, coriander and larkspur**; the leaves of **buttercup** formed in air differ from those formed in water.',
  sol: 'Plasticity defined; heterophylly examples.',
  scheme: [['Plasticity defined', 1], ['Heterophylly: juvenile versus mature leaves', 1], ['Two examples', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('growth-long', long({
  stem: 'Describe the phases and the measurement of growth in plants, compare arithmetic and geometric growth, and name the conditions necessary for growth.',
  model: '**Phases.** Cells at a growing region pass through the **meristematic** phase (division), the **elongation** phase (enlargement) and the **maturation** phase (differentiation). Meristems keep dividing, so growth is open.\n\n**Measurement.** Growth is measured by increase in cell number, length, area, volume, fresh weight or dry weight, as suits the organ.\n\n**Rates.** In **arithmetic** growth one daughter cell keeps dividing and length increases linearly, $L_t = L_0 + rt$. In **geometric** growth both keep dividing and size increases exponentially, $W_1 = W_0 e^{rt}$. In a limited environment the curve is **S-shaped** with lag, log and stationary phases.\n\n**Conditions.** Water, oxygen, nutrients and a suitable temperature, with light and gravity influencing growth.',
  sol: 'Phases, measurement, rates, conditions.',
  scheme: [['Three phases', 1], ['Measurement', 1], ['Arithmetic versus geometric with equations', 1.5], ['S-curve', 0.5], ['Conditions', 1]],
  wl: [80, 240],
  d: 2, c: 'understanding', t: [1],
}));
add('curve-long', long({
  stem: `A seedling's height (cm) was recorded at days ${DAYS.join(', ')} as ${HEIGHT.join(', ')}. Work out the growth in each interval and the fastest growth rate, identify the three phases, and explain what the pattern shows about the way the seedling grows.`,
  model: `**Increments** in the seven five-day intervals: 1, 3, 6, 10, 8, 4 and 1 cm. The **fastest** growth is between days ${N.maxIntervalStart} and ${N.maxIntervalEnd}: ${N.maxInc} cm in 5 days, a rate of ${N.maxRate} cm per day.\n\n**Phases.** Days 0 to 10, with growth rates of only 0.2 and 0.6 cm per day, form the **lag phase**; days 10 to 25 are the **log phase**, with the steepest rise; after day 25 growth falls to 0.8 and then 0.2 cm per day: the **stationary phase**.\n\n**Meaning.** Growth is slow, then exponential, then limited: an **S-shaped (sigmoid) curve**, typical of growth in a limited environment as nutrients or space become limiting.`,
  sol: 'Increments, fastest rate, phases and meaning.',
  scheme: [['Increments', 1], ['Fastest interval and rate', 1], ['Three phases identified', 1.5], ['Sigmoid pattern explained', 1.5]],
  wl: [80, 240],
  d: 3, c: 'analysis', t: [1],
}));
add('diff-long', long({
  stem: 'Explain differentiation, dedifferentiation and redifferentiation with the example of a wounded tissue, and describe plasticity and development.',
  model: '**Differentiation.** Cells from the root and shoot apical meristems and from cambium mature and take up specific functions; a vessel element, for example, develops a lignified wall and loses its protoplasm.\n\n**Dedifferentiation.** Living differentiated cells that have lost the capacity to divide can regain it, as when mature cells at a wound divide to form a **callus**.\n\n**Redifferentiation.** The cells produced may again lose the capacity to divide and mature into specialised cells, for example xylem.\n\n**Plasticity.** Plants can form different structures in response to the environment or phase of life, as in **heterophylly** of cotton, coriander, larkspur and buttercup.\n\n**Development.** It is the sum of growth and differentiation during the whole life of the plant, controlled by intrinsic factors, including growth regulators, and extrinsic factors such as light, temperature, water, oxygen and nutrients.',
  sol: 'Three processes, plasticity and development.',
  scheme: [['Differentiation', 1], ['Dedifferentiation with callus', 1], ['Redifferentiation', 1], ['Plasticity with examples', 1], ['Development and its controls', 1]],
  wl: [80, 260],
  d: 2, c: 'understanding', t: [1],
}));
{
  const inc = HEIGHT2.slice(1).map((h, i) => h - HEIGHT2[i]);
  add('seedling-case', mk.case({
    passage: `A student grows a pea seedling and measures its height at intervals.\n\n| Day | ${DAYS2.join(' | ')} |\n|---|---|---|---|---|---|---|\n| Height (cm) | ${HEIGHT2.join(' | ')} |`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Between which days is growth fastest, and in which phase of the growth curve does this lie?',
        right: `Days ${DAYS2[N.max2Idx]} to ${DAYS2[N.max2Idx + 1]}, the log phase`,
        wrong: [`Days ${DAYS2[0]} to ${DAYS2[1]}, the log phase`, `Days ${DAYS2[4]} to ${DAYS2[5]}, the lag phase`, `Days ${DAYS2[N.max2Idx]} to ${DAYS2[N.max2Idx + 1]}, the stationary phase`],
        sol: `The largest gain, ${N.max2} cm, is between days ${DAYS2[N.max2Idx]} and ${DAYS2[N.max2Idx + 1]}, the steep log phase — option (@K).`,
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'What is the growth rate in the fastest interval, in cm per day?',
        value: N.max2Rate, unit: 'cm per day',
        sol: r`$\dfrac{${N.max2}}{4} = ${N.max2Rate}$ cm per day.`,
        scheme: [[`${N.max2Rate} cm per day`, 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Growth slows after day 16. Name the phase and give two reasons for the slowing.',
        model: 'The seedling has entered the **stationary phase** of the growth curve. Growth slows because **nutrients or space become limiting** in the pot, and because **cells age** and mature, so fewer are dividing.',
        sol: 'Stationary phase; limiting nutrients and ageing.',
        scheme: [['Stationary phase', 1], ['Two reasons', 1]],
        d: 2, c: 'application', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'The graph of height against time is S-shaped, not a straight line. Is the growth purely arithmetic? Explain.',
          model: 'No. A straight line would mean **arithmetic growth** with a constant rate. The S-shape, with slow, then rapid, then slow growth, shows that the rate **changes**: the log phase is **geometric (exponential)**, and the curve flattens as the environment becomes limiting.',
          sol: 'Not purely arithmetic; sigmoid.',
          scheme: [['Straight line would mean arithmetic growth', 1], ['S-curve: exponential then limited', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 1.5 && inc.join() === '1,3,6,3,1' || 'value');
}
add('callus-case', mk.case({
  passage: `A student cuts a thin slice from the middle of a carrot root and places it on a nutrient medium. After some days the cut surface shows a white mass of dividing cells, which started from 5 cells and went through 4 rounds of division, each cell dividing once in every round. A few weeks later, some cells in the mass develop lignified walls and form tubes.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The formation of the white mass of dividing cells from mature cells is',
      right: 'dedifferentiation',
      wrong: ['redifferentiation', 'senescence', 'the stationary phase'],
      sol: 'Mature, living cells regaining the capacity to divide, forming a callus, is dedifferentiation — option (@K).',
      d: 1, c: 'application', t: [1],
    })),
    part('b', num({
      stem: 'How many cells are in the mass after the 4 rounds of division?',
      value: N.callus,
      sol: r`$5 \times 2^{4} = ${N.callus}$ cells.`,
      scheme: [[`${N.callus}`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Name the process by which some cells develop lignified walls and form tubes, and say what this shows about the cells of the mass.',
      model: 'The process is **redifferentiation**: cells formed by dedifferentiation lose the capacity to divide and **mature** into specialised cells, here **xylem vessels**. This shows that the cells of the callus can again take up **specific functions**.',
      sol: 'Redifferentiation to vessels.',
      scheme: [['Redifferentiation', 1], ['Cells mature into specialised xylem', 1]],
      d: 2, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Is the growth of the white mass arithmetic or geometric? Give a reason from the data.',
        model: 'It is **geometric**, because **every cell divides** in each round, so the number doubles each time: 5, 10, 20, 40 and 80 cells. In arithmetic growth only one daughter cell would continue dividing.',
        sol: 'Geometric; doubling.',
        scheme: [['Geometric', 1], ['Reason: all cells divide, doubling', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}), (q) => q.children[1].answer.value === 80 || 'value');

// ---------------------------------------------------------------- t02 plant growth regulators
add('darwin-mcq', mcq({
  stem: 'Oat coleoptiles are lit from one side. One with its tip covered by an opaque cap does not bend; another with the cap fixed over its base, tip left exposed, bends towards the light. What do the two results show together?',
  right: 'The tip perceives the light, and a signal then moves down to the growing region.',
  wrong: ['The base perceives the light and sends a signal up to the tip.', 'Light is not needed for bending, because the cap makes no difference.', 'Only the cap material, and not the plant, decides the bending.'],
  sol: 'Covering the tip stops the bending but covering the base does not, so the tip perceives light and a signal passes down — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('went-mcq', mcq({
  stem: 'An agar block that had stood under coleoptile tips in the dark is placed on one side of the cut top of a decapitated coleoptile. After some hours the coleoptile bends away from the side bearing the block. This showed that',
  right: 'a chemical substance from the tip, later named auxin, makes the cells on that side grow faster',
  wrong: ['agar itself is a growth regulator that stops growth on its side', 'light from the lamp, and not the tip, causes the bending', 'the coleoptile bends only if it still has its own tip'],
  sol: 'The block carried a diffusible growth-promoting substance, auxin, which made the cells below it elongate more, so the coleoptile bent away — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('rooting-mcq', mcq({
  stem: 'A nursery owner dips the cut ends of rose stem cuttings in a powder before planting them, to make them form roots quickly. The powder most probably contains',
  right: 'an auxin such as IBA or NAA',
  wrong: ['abscisic acid, the stress hormone', 'ethylene, a gaseous ripening regulator', 'a cytokinin that stops root growth'],
  sol: 'Auxins such as IBA and NAA help initiate rooting in stem cuttings — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('dominance-mcq', mcq({
  stem: 'A gardener pinches off the tip of a young tea shoot, and soon several side branches grow from the buds below. This is explained by the removal of',
  right: 'auxin from the apical bud, which was suppressing the lateral buds',
  wrong: ['ethylene from the apical bud, which was ripening the lateral buds', 'abscisic acid from the lateral buds, which kept the apical bud dormant', 'gibberellin from the roots, which was stunting the lateral buds'],
  sol: 'In apical dominance the apical bud, through auxin, suppresses lateral buds; removing it frees them to grow — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('weed-mcq', mcq({
  stem: 'A farmer sprays a wheat field with 2,4-D, and the broad-leaved weeds die but the wheat survives. 2,4-D is',
  right: 'a synthetic auxin that kills dicotyledonous weeds',
  wrong: ['a synthetic auxin that kills monocotyledonous crops', 'a natural cytokinin from coconut milk', 'a gaseous regulator that ripens fruit'],
  sol: '2,4-D is a synthetic auxin used as a weed killer for dicot weeds; monocots such as wheat are not harmed — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gibb-mcq', mcq({
  stem: 'Rice seedlings in a nursery bed grew abnormally tall and thin after a fungal infection, and later fell over. The regulators discovered from the fungus responsible are',
  right: 'gibberellins',
  wrong: ['cytokinins', 'abscisic acid', 'ethylene'],
  sol: 'The fungus Gibberella fujikuroi causes the foolish seedling disease of rice; gibberellins were first found from it — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('malt-mcq', mcq({
  stem: 'A brewery wants to speed up the conversion of barley grains into malt. Which regulator would it spray?',
  right: 'Gibberellin',
  wrong: ['Abscisic acid', 'Ethylene', '2,4-D'],
  sol: 'Gibberellins speed up malting in the brewing industry — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cytosen-mcq', mcq({
  stem: 'Detached leaves of a vegetable are kept in two jars: in one the cut stalks stand in plain water, in the other in a dilute solution of a regulator. The leaves in the second jar stay green much longer. The regulator is most likely a',
  right: 'cytokinin, which delays senescence',
  wrong: ['abscisic acid, which delays senescence', 'cytokinin, which hastens senescence', 'ethylene, which delays senescence'],
  sol: 'Cytokinins delay the senescence of leaves by promoting the mobilisation of nutrients to them — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('cytolat-mcq', mcq({
  stem: 'A tissue culture technician adds a cytokinin to a medium and sees many shoots forming from the sides of a stem piece. This is mainly because cytokinins',
  right: 'promote cell division and the growth of lateral shoots',
  wrong: ['close the stomata and raise stress tolerance', 'hasten the ripening of the cut tissue', 'inhibit seed germination'],
  sol: 'Cytokinins promote cell division and lateral and adventitious shoot growth — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ripen-mcq', mcq({
  stem: 'A shopkeeper stores raw bananas in a closed box with one ripe banana, and the raw ones ripen within days. The most likely cause is the gas',
  right: 'ethylene given off by the ripe fruit',
  wrong: ['carbon dioxide given off by the box', 'abscisic acid given off by the box', 'auxin given off by the raw bananas'],
  sol: 'Ethylene is a gaseous regulator that hastens fruit ripening, and a ripe fruit releases it — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gas-mcq', mcq({
  stem: 'Which plant growth regulator is a gas?',
  right: 'Ethylene',
  wrong: ['Auxin', 'Gibberellin', 'Cytokinin'],
  sol: 'Ethylene is the gaseous regulator — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('aba-mcq', mcq({
  stem: 'During a long drought the leaves of a shrub lose water slowly because their stomata close. The hormone mainly responsible is',
  right: 'abscisic acid, the stress hormone',
  wrong: ['gibberellin, the stem-elongation hormone', 'kinetin, the cell-division hormone', 'IBA, the rooting hormone'],
  sol: 'Abscisic acid stimulates stomatal closure and increases tolerance to stress — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('dorm-mcq', mcq({
  stem: 'A seed will not germinate even in warm, moist soil, but starts to when soaked in a regulator solution. The seed was dormant under the influence of one regulator, and the soaking solution probably contained its antagonist. They are respectively',
  right: 'abscisic acid and gibberellin',
  wrong: ['gibberellin and abscisic acid', 'ethylene and auxin', 'cytokinin and abscisic acid'],
  sol: 'Abscisic acid induces dormancy and inhibits germination; gibberellin is its antagonist and breaks dormancy — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('exptlet-mcq', mcq({
  stem: 'In the lettered diagram, which panel shows the experiment in which an agar block that had stood under coleoptile tips is placed on one side of a decapitated coleoptile in the dark?',
  right: `Panel ${exptLetter('agar')}`,
  wrong: [`Panel ${exptLetter('removed')}`, `Panel ${exptLetter('intact')}`, `Panel ${exptLetter('cap')}`],
  sol: `The agar block experiment, showing a chemical from the tips, is panel ${exptLetter('agar')} — option (@K).`,
  assets: [exptAsset],
  d: 2, c: 'application', t: [2],
}));
add('exptlet2-mcq', mcq({
  stem: 'In the lettered diagram, the coleoptile in panel D has an opaque sheath over its base but its tip uncovered. Compared with panel E, in which the tip is capped, what will be observed?',
  right: 'D bends towards the light, whereas E does not bend.',
  wrong: ['D does not bend, whereas E bends towards the light.', 'Both D and E bend towards the light.', 'Neither D nor E bends, because light is needed at the base.'],
  sol: 'In D the tip still perceives the light and sends a signal down, so it bends; in E the capped tip cannot perceive light — option (@K).',
  assets: [exptAsset],
  d: 3, c: 'analysis', t: [2],
}), () => exptLetter('base') === 'D' && exptLetter('cap') === 'E' || 'letters');
add('auxin-ar', ar({
  a: 'Removing the apical bud of a hedge plant makes it bushier.',
  r: 'The apical bud supplies auxin that suppresses the growth of lateral buds.',
  key: 'a',
  sol: 'Both are true, and removing the source of auxin releases the lateral buds, which explains the bushier growth — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('ethylene-ar', ar({
  a: 'Ethylene is useful for ripening fruit in a closed store room.',
  r: 'Ethylene is a gaseous plant growth regulator.',
  key: 'b',
  sol: 'Both are true, but being a gas does not by itself explain why it ripens fruit; ripening is a specific effect of ethylene — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('aba-ar', ar({
  a: 'Abscisic acid promotes the germination of seeds.',
  r: 'Abscisic acid acts as an antagonist of gibberellins.',
  key: 'd',
  sol: 'A is false: abscisic acid inhibits germination and induces dormancy. R is true — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('cyto-ar', ar({
  a: 'Cytokinins promote the growth of lateral shoots.',
  r: 'Cytokinins are formed mainly in the fully mature leaf blades of a plant.',
  key: 'c',
  sol: 'A is true. R is false: cytokinins are formed where rapid cell division occurs, such as root apices, shoot buds and young fruits — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('coleoptile-tf', tf({
  stem: 'Went’s agar block experiment showed that a chemical substance made at the coleoptile tip can cause bending.',
  key: 't',
  sol: 'True. A block that had stood under tips made a decapitated coleoptile bend; the substance was auxin.',
  d: 1, c: 'recall', t: [2],
}));
add('ethylene-tf', tf({
  stem: 'Ethylene delays the ripening of fruits and the senescence of leaves.',
  key: 'f',
  sol: 'False. Ethylene hastens fruit ripening and the senescence and abscission of leaves and flowers.',
  d: 1, c: 'recall', t: [2],
}));
add('weedfill', fill({
  stem: 'The synthetic auxin sprayed to kill dicot weeds in a cereal field is ______.',
  acc: [['2,4-D', '2,4-d', '2, 4-D', '2,4 D']],
  sol: '2,4-D.',
  d: 1, c: 'recall', t: [2],
}));
add('pgr-match', match({
  stem: 'Match each plant growth regulator (column I) with an effect (column II).',
  pairs: [
    ['Auxin', 'Initiates rooting in stem cuttings'],
    ['Gibberellin', 'Elongates the stem of sugarcane'],
    ['Cytokinin', 'Delays leaf senescence'],
    ['Abscisic acid', 'Closes stomata under drought'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Auxin initiates rooting; gibberellin elongates stems; cytokinin delays senescence; abscisic acid closes stomata.',
  d: 1, c: 'recall', t: [2],
}));
add('mass-num', num({
  stem: 'A gardener needs 2.5 litres of a gibberellin solution of 100 mg per litre. How many mg of gibberellin must be dissolved?',
  value: N.ga, unit: 'mg',
  sol: r`Mass = concentration $\times$ volume $= 100 \times 2.5 = ${N.ga}$ mg.`,
  scheme: [[`${N.ga} mg`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === mass(100, 2.5) || 'value');
add('rooted-num', num({
  stem: 'A nursery treats 60 hibiscus cuttings with an auxin powder, and 75 percent of them form roots. How many cuttings root?',
  value: N.rooted,
  sol: r`$60 \times \dfrac{75}{100} = ${N.rooted}$ cuttings.`,
  scheme: [[`${N.rooted}`, 1]],
  d: 1, c: 'application', t: [2],
}), (q) => q.answer.value === round((60 * 75) / 100) || 'value');
add('auxin-short', short({
  marks: 2,
  stem: 'Name two uses of auxins in agriculture and horticulture, with a regulator or example for each.',
  model: 'Auxins such as **IBA and NAA** help **initiate rooting in stem cuttings**, so cuttings are dipped in them before planting. Auxins also **prevent early fruit and leaf drop**, for example **NAA** in orchards, and the synthetic auxin **2,4-D** is used as a **weed killer** for dicot weeds.',
  sol: 'Two uses with examples.',
  scheme: [['Rooting with IBA or NAA', 1], ['A second use with example', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('gibb-short', short({
  marks: 2,
  stem: 'State two effects of gibberellins that make them useful to a sugarcane farmer and to a brewer.',
  model: 'Gibberellins **elongate the stems** of sugarcane, so spraying increases stem length and **yield**. In the brewing industry they **speed up malting** of barley. They also cause bolting in rosette plants and improve the size and shape of fruits such as apple.',
  sol: 'Sugarcane stem elongation; malting.',
  scheme: [['Stem elongation in sugarcane', 1], ['Speeds malting', 1]],
  d: 2, c: 'application', t: [2],
}));
add('cyto-short', short({
  marks: 2,
  stem: 'What are cytokinins? Name one natural source and two physiological effects.',
  model: 'Cytokinins are growth regulators that promote **cell division** (cytokinesis). A natural cytokinin, **zeatin**, was isolated from **maize kernels and coconut milk**; kinetin came from autoclaved herring sperm DNA. They promote **lateral shoot growth** and **delay leaf senescence**.',
  sol: 'Cell division; source; two effects.',
  scheme: [['Definition and source', 1], ['Two effects', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('ethylene-short', short({
  marks: 2,
  stem: 'Why can a ripe fruit kept with unripe ones hasten their ripening? Name two other effects of the regulator concerned.',
  model: 'The ripe fruit gives off **ethylene**, a **gaseous** regulator that **hastens fruit ripening**; the gas reaches the neighbouring fruits. Ethylene also promotes **senescence and abscission** of leaves and flowers, and **female flowers** in cucumber.',
  sol: 'Ethylene is a gas; two other effects.',
  scheme: [['Ethylene gas hastens ripening', 1], ['Two other effects', 1]],
  d: 2, c: 'application', t: [2],
}));
add('aba-short', short({
  marks: 2,
  stem: 'Why is abscisic acid called the stress hormone? State two of its effects.',
  model: 'Abscisic acid builds up under stress such as drought. It stimulates the **closure of stomata**, which saves water, and **increases tolerance** to stress. It also induces **seed dormancy**, inhibits germination and promotes abscission and senescence; it is an **antagonist of gibberellins**.',
  sol: 'Stress; stomatal closure; dormancy.',
  scheme: [['Builds up under stress; stomatal closure', 1], ['A second effect', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('dominance-short', short({
  marks: 3,
  stem: 'A tea planter plucks the tips of shoots regularly. Explain, using apical dominance and the role of cytokinins, why the bush becomes dense.',
  model: 'In **apical dominance** the growing **apical bud** suppresses the **lateral buds** through **auxin**. Plucking the tips removes this source of auxin, so the **lateral buds grow** and the bush becomes dense. **Cytokinins**, which promote cell division and lateral shoot growth, help to **overcome apical dominance**, as when applied to lateral buds.',
  sol: 'Auxin from apical bud suppresses laterals; removal; cytokinin.',
  scheme: [['Apical dominance by auxin', 1], ['Removal frees lateral buds', 1], ['Cytokinins overcome it', 1]],
  d: 2, c: 'application', t: [2],
}));
add('went-short', short({
  marks: 3,
  stem: 'Describe the experiment by which Went showed that a chemical substance, and not light alone, causes the bending of a coleoptile.',
  model: 'Went cut off the **tips** of oat coleoptiles and placed them on **agar blocks**, so that a substance moved into the agar. He then put such a block **on one side of the cut top of a decapitated coleoptile**, in the **dark**. The coleoptile **bent away** from the side with the block, showing that a **chemical substance**, later named **auxin**, made the cells grow faster on that side.',
  sol: 'Agar block experiment and conclusion.',
  scheme: [['Tips on agar blocks', 1], ['Block on one side of the cut coleoptile in the dark', 1], ['Bends away: chemical, auxin', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('interplay-short', short({
  marks: 3,
  stem: 'Explain how gibberellins and abscisic acid act against each other in the life of a seed, and how auxin and cytokinin act against each other in a shoot.',
  model: '**Abscisic acid** induces **seed dormancy** and inhibits germination; **gibberellins** break dormancy and promote germination, so they are **antagonists**, and the balance decides when the seed germinates. In a shoot, **auxin** from the apical bud **suppresses lateral buds**, while **cytokinins** promote lateral shoot growth and so **overcome apical dominance**.',
  sol: 'GA versus ABA; auxin versus cytokinin.',
  scheme: [['ABA versus GA in the seed', 1.5], ['Auxin versus cytokinin in the shoot', 1.5]],
  d: 3, c: 'analysis', t: [2],
}));
add('auxuse-short', short({
  marks: 3,
  stem: 'An orchard owner wants fruits to stay on the trees longer, wants new cuttings to root, and wants to control broad-leaved weeds. Name the type of regulator for each purpose, with an example.',
  model: 'To **prevent early fruit drop** she can spray an **auxin such as NAA**. To make cuttings **root**, she can dip them in an **auxin such as IBA**. For **broad-leaved (dicot) weeds** she can spray the synthetic auxin **2,4-D**, which kills dicots but not grasses. All three purposes use auxins.',
  sol: 'NAA, IBA, 2,4-D.',
  scheme: [['Fruit drop: NAA', 1], ['Rooting: IBA', 1], ['Weeds: 2,4-D', 1]],
  d: 2, c: 'application', t: [2],
}));
add('auxin-long', long({
  stem: 'Describe the discovery of auxin from the experiments on coleoptiles, and list the physiological effects of auxins with examples.',
  model: '**Discovery.** Charles and Francis Darwin observed that a coleoptile lit from one side bends towards the light, but not if its **tip** is covered or cut off, so the **tip perceives light** and a signal moves down. **Went** placed coleoptile tips on **agar blocks** and then put a block on one side of a decapitated coleoptile in the dark; it bent away from that side, showing that a **chemical substance, auxin**, caused the growth.\n\n**Effects.** Auxins (IAA, IBA, NAA, 2,4-D) **initiate rooting** in stem cuttings, promote flowering in pineapple, **prevent fruit and leaf drop**, maintain **apical dominance**, induce **parthenocarpy** in tomato, control xylem differentiation, and 2,4-D is a **weed killer** for dicots.',
  sol: 'Darwin, Went; effects of auxins.',
  scheme: [['Darwin: tip perceives light', 1], ['Went: agar block, auxin', 1.5], ['Rooting, drop prevention', 1], ['Apical dominance, parthenocarpy, 2,4-D', 1.5]],
  wl: [80, 260],
  d: 2, c: 'understanding', t: [2],
}));
add('gibbcyto-long', long({
  stem: 'Describe the discovery and the physiological effects of gibberellins and of cytokinins.',
  model: '**Gibberellins.** They were discovered from the fungus *Gibberella fujikuroi*, which causes the **foolish seedling** disease of rice. They **elongate stems**, increasing the length of grape stalks and sugarcane stems (and the yield), cause **bolting** in beet and cabbage, improve the **shape and size of fruits** such as apple, **delay senescence** so that fruits stay on the trees longer, and **speed up malting**.\n\n**Cytokinins.** Kinetin was isolated from autoclaved herring sperm DNA and **zeatin** from maize kernels and coconut milk. Cytokinins promote **cell division**, help produce new leaves, lateral shoots and adventitious shoots, **overcome apical dominance** and **delay leaf senescence** by mobilising nutrients.',
  sol: 'Gibberellins and cytokinins.',
  scheme: [['Gibberellin discovery', 1], ['Gibberellin effects', 1.5], ['Cytokinin sources', 1], ['Cytokinin effects', 1.5]],
  wl: [80, 260],
  d: 2, c: 'understanding', t: [2],
}));
add('ethabaa-long', long({
  stem: 'Describe the physiological effects of ethylene and of abscisic acid, and explain how each helps a plant, or a farmer, in a situation you name.',
  model: '**Ethylene** is a **gas** formed in ripening fruits and senescing tissues. It **hastens fruit ripening** (tomato, apple), **senescence and abscission** of leaves and flowers, promotes **female flowers** in cucumber, breaks **dormancy** in potato tubers, and promotes **flowering** in pineapple and mango. A farmer uses **ethephon**, which releases ethylene, to ripen fruit evenly.\n\n**Abscisic acid** is the **stress hormone**. It **closes stomata** and raises tolerance to stress, so a plant in drought loses less water; it induces **seed dormancy**, inhibits **germination**, promotes abscission and senescence, and is an **antagonist** of gibberellins.',
  sol: 'Ethylene and ABA effects with applications.',
  scheme: [['Ethylene effects', 1.5], ['Ethephon use', 0.5], ['ABA effects', 1.5], ['Situation and explanation', 1.5]],
  wl: [80, 260],
  d: 2, c: 'understanding', t: [2],
}));
add('expt-long', long({
  stem: 'Four coleoptiles are lit from one side: A has an opaque cap over its tip, B has its tip cut off, C has an opaque sheath over its base with the tip uncovered, and D is intact. Predict which will bend towards the light, explain each result, and say what the set shows.',
  model: '**A** (cap on tip) does **not bend**: the tip cannot perceive the light. **B** (tip cut off) does **not bend**: the source of the signal is gone. **C** (sheath over the base, tip exposed) **bends towards the light**: the tip perceives the light and a signal moves down past the sheath. **D** (intact) **bends** towards the light.\n\n**What it shows.** The **tip perceives light** and produces a substance, later shown by Went to be **auxin**, which moves down and causes the cells on the **shaded side** to elongate more, so the coleoptile bends towards the light.',
  sol: 'Predictions with reasons; conclusion.',
  scheme: [['A and B do not bend, with reasons', 1.5], ['C and D bend, with reasons', 1.5], ['Tip perceives; auxin; shaded side grows more', 2]],
  wl: [80, 240],
  d: 3, c: 'analysis', t: [2],
}));
add('eval-long', long({
  stem: 'A farmer says: “Ethylene is a liquid that stops fruits from ripening, abscisic acid helps seeds to germinate, 2,4-D is good for killing wheat weeds like grasses, and removing the top bud of a tea plant makes it taller.” Evaluate each claim, correct any errors, and say whether any part is right.',
  model: '**Ethylene** is wrong twice: it is a **gas** and it **hastens** ripening. **Abscisic acid** does the opposite of the claim: it **inhibits germination** and induces dormancy; it is the antagonist of gibberellins. **2,4-D** is a synthetic auxin that kills **dicot** weeds, not grasses, which are monocots like wheat, so the claim is wrong. **Removing the top bud** removes apical dominance, so lateral buds grow and the plant becomes **bushier**, not taller.\n\n**Judgement.** Every claim is wrong; the farmer has reversed the effects, so none is correct.',
  sol: 'Evaluates four claims; all wrong.',
  scheme: [['Ethylene: gas, hastens ripening', 1], ['ABA: inhibits germination', 1], ['2,4-D: kills dicots', 1], ['Apical bud removal: bushier', 1], ['Overall judgement', 1]],
  wl: [80, 240],
  d: 4, c: 'evaluation', t: [2],
}));
{
  const L = N.orchardLitres;
  add('orchard-case', mk.case({
    passage: `An apple grower notices that many fruits drop from her trees before they are ripe. A horticulture officer advises spraying a synthetic auxin at 3 litres per 100 square metres on her orchard of 2400 square metres. Later, to ripen the crop evenly in the store, the grower uses a compound that releases ethylene.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The synthetic auxin sprayed on the trees is most probably',
        right: 'NAA, which prevents early fruit drop',
        wrong: ['abscisic acid, which prevents early fruit drop', 'ethylene, which prevents early fruit drop', 'kinetin, which promotes early fruit drop'],
        sol: 'NAA, a synthetic auxin, prevents fruit and leaf drop at early stages — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'How many litres of spray are needed for the whole orchard?',
        value: L, unit: 'litres',
        sol: r`$\dfrac{2400}{100} \times 3 = ${L}$ litres.`,
        scheme: [[`${L} litres`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'Name the compound used in the store and explain why one ripening fruit can hasten the ripening of the others even without it.',
        model: 'The compound is **ethephon**, which releases **ethylene**. Ripe fruits themselves give off **ethylene**, a **gas**, which spreads to the neighbouring fruits and **hastens their ripening**.',
        sol: 'Ethephon; ethylene gas from ripe fruit.',
        scheme: [['Ethephon releases ethylene', 1], ['Ripe fruit gives off the gas', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Why would the grower be wrong to use ethylene to keep fruits on the trees?',
          model: 'Ethylene **hastens ripening, senescence and abscission**, so it would make the fruits **drop earlier**, the opposite of what is wanted. An **auxin** such as NAA is used to prevent early drop.',
          sol: 'Ethylene promotes abscission.',
          scheme: [['Ethylene hastens abscission and ripening', 1], ['Auxin prevents drop', 1]],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 72 || 'value');
}
{
  const S = SEEDS2;
  add('seed-case', mk.case({
    passage: `A student puts ${S.total} lettuce seeds in each of three dishes. Dish 1 has water only, dish 2 has gibberellin solution and dish 3 has abscisic acid solution. After a week, ${S.control} seeds in dish 1, ${S.ga} in dish 2 and ${S.aba} in dish 3 had germinated.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'Which dish shows the inhibition of germination, compared with the control?',
        right: 'Dish 3, with abscisic acid',
        wrong: ['Dish 2, with gibberellin', 'Dish 1, with water only', 'None of the dishes'],
        sol: 'Fewer seeds germinated with abscisic acid than with water alone, so dish 3 shows inhibition — option (@K).',
        d: 1, c: 'application', t: [2],
      })),
      part('b', num({
        stem: 'What percentage of the seeds in dish 2 germinated?',
        value: N.g2Ga, unit: 'percent',
        sol: r`$\dfrac{${S.ga}}{${S.total}} \times 100 = ${N.g2Ga}$ percent.`,
        scheme: [[`${N.g2Ga} percent`, 1]],
        d: 2, c: 'application', t: [2],
      })),
      part('c', short({
        marks: 2,
        stem: 'State what the three dishes together show about gibberellin and abscisic acid.',
        model: `Germination was **${N.g2Control} percent** with water, **${N.g2Ga} percent** with gibberellin and only **${N.g2Aba} percent** with abscisic acid. So **gibberellin promotes** germination and **abscisic acid inhibits** it; they act as **antagonists**.`,
        sol: 'Gibberellin promotes, ABA inhibits; antagonists.',
        scheme: [['Percentages compared', 1], ['Promotes versus inhibits; antagonists', 1]],
        d: 2, c: 'application', t: [2],
      }), [
        short({
          marks: 2,
          stem: 'Suggest why a desert plant might keep its seeds dormant for months, naming the regulator that helps to do so.',
          model: 'A desert plant that dropped seeds into dry soil would lose them if they germinated at once. **Abscisic acid** keeps the seeds **dormant**, inhibiting germination, until conditions improve, so the seedlings are more likely to **survive**.',
          sol: 'ABA dormancy gives survival.',
          scheme: [['Abscisic acid keeps dormancy', 1], ['Benefit: seedlings survive when conditions improve', 1]],
          d: 3, c: 'analysis', t: [2],
        }),
      ]),
    ],
  }), (q) => q.children[1].answer.value === 75 || 'value');
}
void percent;
