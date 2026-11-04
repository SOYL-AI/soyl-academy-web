// ISC 11 Biology ch15 Plant Growth and Development — Part 1 (t01–t03), Part 2 (t04–t05).
import { sl, deck, table, flow, svgV, plot, r } from '../../isc-11-biology-ch01/src/lib.mjs';
import { GERM, ROOT, SIGMOID, AUXANO, WENT } from './svgs.mjs';
import { ROOT as RT, CELLS, arith, doubling, SEEDLINGS, AGR, RGR, RGR_PCT, LOG, LAG_END, LOG_END, GAIN, MAXRATE, AUX, magnification, actualGrowth, pointerFor, WENT as WN, curvature, concFor, WENT_CONC, WENT_DEG, MEDIA, ratio, outcome, D1, stockVolume, milligrams } from './calc.mjs';

export const V = {
  germ: svgV(GERM, 'Epigeal, hypogeal and viviparous germination'),
  root: svgV(ROOT, 'Zones of a growing root tip'),
  sigmoid: svgV(SIGMOID, 'Sigmoid growth curve with lag, log and stationary phases'),
  auxano: svgV(AUXANO, 'Arc auxanometer'),
  went: svgV(WENT, 'Went’s experiment on oat coleoptiles'),
  wentPlot: plot(
    {
      x: { min: 0, max: 1, label: 'Auxin in the agar block (mg per litre)' },
      y: { min: 0, max: 30, label: 'Curvature (degrees)' },
      series: [{ label: 'Curvature', points: [[0, 0], ...WENT_CONC.map((c, i) => [c, WENT_DEG[i]])], kind: 'line' }],
    },
    'Angle of curvature of the coleoptile rising in a straight line with the auxin concentration of the agar block',
  ),
};

const A1 = { days: 5 };
const growthFor = (a, b, d) => ({ abs: (b - a) / d });
void growthFor;

export const deck1 = deck({
  part: 1,
  title: 'Plant Growth and Development — Part 1: Germination, growth and differentiation',
  goals: [
    'Distinguish hypogeal, epigeal and viviparous germination with two examples each',
    'Describe the phases of growth, the sigmoid curve and how an auxanometer measures growth',
    'Distinguish differentiation, dedifferentiation and redifferentiation with examples',
  ],
  slides: [
    sl('title', 'From seed to plant', {
      b: 'Part 1 — how a seed germinates, how growth is measured, and how cells become specialised.',
      v: flow('LR', [['s', 'Seed'], ['g', 'Germination'], ['w', 'Growth'], ['d', 'Differentiation'], ['m', 'Mature plant']], [['s', 'g'], ['g', 'w'], ['w', 'd'], ['d', 'm']], 'Seed to germination to growth to differentiation to mature plant'),
      n: 'A plant begins as a seed. It germinates, grows by cell division and enlargement, and its cells then specialise. Plants keep growing throughout life, because meristems stay active.',
    }),
    sl('diagram', 'Three kinds of germination', {
      b: 'The difference lies in **which part of the seedling elongates** and what happens to the **cotyledons**. In **viviparous** germination the seed germinates **inside the fruit on the parent plant**.',
      v: V.germ,
      n: 'In epigeal germination the stem below the cotyledons grows and lifts them above the soil. In hypogeal germination the stem above the cotyledons grows and they stay underground. In viviparous germination the seed sprouts while still on the parent.',
    }),
    sl('concept', 'Hypogeal, epigeal and viviparous germination compared', {
      b: 'Learn **two examples** of each type.',
      v: table(['Feature', 'Epigeal', 'Hypogeal', 'Viviparous'], [['Part that elongates', 'Hypocotyl', 'Epicotyl', 'Radicle (inside the fruit)'], ['Cotyledons', 'Raised above the soil', 'Remain in the soil', 'Inside the fruit on the plant'], ['Examples', 'Castor, bean, cotton, sunflower', 'Pea, gram, maize, mango', 'Rhizophora, Sonneratia'], ['Where', 'Land plants', 'Land plants', 'Mangroves (marshy habitats)']], 'Table comparing epigeal, hypogeal and viviparous germination'),
      n: 'In epigeal germination the hypocotyl lifts the seed leaves into the light, as in castor and bean. In hypogeal germination the epicotyl lengthens and the seed leaves stay in the soil, as in pea and maize. Mangroves such as Rhizophora germinate on the tree.',
    }),
    sl('check', 'Quick check: germination', {
      b: 'Which part elongates in hypogeal germination?',
      n: 'Quick check. Do the seed leaves stay in the soil?',
      chk: 'germ-check',
    }),
    sl('diagram', 'Growth in a root tip: zones and phases', {
      b: 'Growth in a meristem has **three phases**: **cell division** (meristematic), **elongation** (cells enlarge by taking in water and forming a vacuole) and **maturation** (differentiation). They are seen in order up a root tip.',
      v: V.root,
      n: 'At the very tip is the root cap. Above it, cells divide. Higher up, the new cells take in water and become long. Higher still, they mature into specialised cells, and root hairs form.',
    }),
    sl('concept', 'Arithmetic and geometric growth', {
      b: 'In **arithmetic growth** only one daughter cell keeps dividing, so length rises by a constant amount: $L_t = L_0 + rt$. In **geometric growth** both daughters divide, so size rises faster and faster: $W_t = W_0 e^{rt}$.',
      v: table(['Feature', 'Arithmetic', 'Geometric'], [['Daughter cells', 'One keeps dividing', 'Both keep dividing'], ['Growth curve', 'Straight line', 'Exponential curve'], ['Example', 'Root or shoot elongating at a steady rate', 'Early growth of a seedling or a culture of cells'], ['Growth rate', 'Constant', 'Increases with size']], 'Table comparing arithmetic and geometric growth'),
      n: 'In arithmetic growth the root lengthens by the same amount each day. In geometric growth the number of cells doubles again and again, so growth speeds up as the organism gets larger.',
    }),
    sl('example', 'Worked example 1: arithmetic and geometric growth', {
      b: `A root is ${RT.l0} cm long and grows at ${RT.r} cm a day. A single cell divides every ${CELLS.T} hours, and both daughters keep dividing. Find the root length after 5 and 10 days, and the number of cells after 72 hours.`,
      ul: [
        r`$L_5 = ${RT.l0} + ${RT.r} \times 5 = ${arith(RT.l0, RT.r, 5)}$ cm; $L_{10} = ${RT.l0} + ${RT.r} \times 10 = ${arith(RT.l0, RT.r, 10)}$ cm.`,
        r`Doublings in 72 hours $= 72 \div ${CELLS.T} = ${72 / CELLS.T}$.`,
        r`Cells $= 2^{${72 / CELLS.T}} = ${doubling(CELLS.n0, 72, CELLS.T)}$.`,
      ],
      v: table(['Quantity', 'Value'], [['Root length after 5 days (cm)', String(arith(RT.l0, RT.r, 5))], ['Root length after 10 days (cm)', String(arith(RT.l0, RT.r, 10))], ['Cells after 72 hours', String(doubling(CELLS.n0, 72, CELLS.T))]], 'Worked table: arithmetic and geometric growth'),
      n: 'The root gains a fixed amount each day, so its length is a straight line. The cells double six times in three days, which gives sixty-four cells from one.',
    }),
    sl('diagram', 'The sigmoid growth curve', {
      b: 'Growth of a plant organ or a whole plant plotted against time gives an **S-shaped (sigmoid) curve** with a **lag phase**, a **log (exponential) phase** of fastest growth and a **stationary phase** as growth slows.',
      v: V.sigmoid,
      n: 'At first the growth is slow, as the cells prepare to divide. Then comes a rapid phase, in which growth is fastest. Finally growth slows and stops, as nutrients and space become limiting, and the curve levels off.',
    }),
    sl('example', 'Worked example 2: absolute and relative growth rate', {
      b: `Seedling A grows from ${SEEDLINGS.A[0]} cm to ${SEEDLINGS.A[1]} cm and seedling B from ${SEEDLINGS.B[0]} cm to ${SEEDLINGS.B[1]} cm, each in ${SEEDLINGS.days} days. Compare their absolute and relative growth rates.`,
      ul: [
        r`Absolute rate: A $= \dfrac{${SEEDLINGS.A[1] - SEEDLINGS.A[0]}}{${SEEDLINGS.days}} = ${AGR.A}$ cm a day; B $= ${AGR.B}$ cm a day.`,
        r`Relative rate $=$ growth $\div$ initial size $\div$ time: A $= \dfrac{${SEEDLINGS.A[1] - SEEDLINGS.A[0]}}{${SEEDLINGS.A[0]} \times ${SEEDLINGS.days}} = ${RGR.A}$, or ${RGR_PCT.A} percent a day.`,
        r`B $= \dfrac{${SEEDLINGS.B[1] - SEEDLINGS.B[0]}}{${SEEDLINGS.B[0]} \times ${SEEDLINGS.days}} \approx ${RGR.B}$, or about ${RGR_PCT.B} percent a day.`,
      ],
      v: table(['Seedling', 'Absolute rate (cm/day)', 'Relative rate (percent/day)'], [['A', String(AGR.A), String(RGR_PCT.A)], ['B', String(AGR.B), String(RGR_PCT.B)]], `Worked table: equal absolute rates, relative rates ${RGR_PCT.A} and ${RGR_PCT.B} percent`),
      n: 'Both seedlings gain the same length each day, so their absolute rates are equal. But the first was smaller to start with, so it has grown much more in proportion to its size. Its relative growth rate is three times higher.',
    }),
    sl('check', 'Quick check: relative growth rate', {
      b: 'Calculate a relative growth rate.',
      n: 'Quick check. Divide the growth by the starting size and by the time.',
      chk: 'rgr-check',
    }),
    sl('diagram', 'The arc auxanometer', {
      b: 'An **auxanometer** measures growth indirectly. In the **arc auxanometer** a thread from the shoot tip turns a small pulley carrying a **long pointer** that moves over an **arc scale**: the pointer exaggerates the growth.',
      v: V.auxano,
      n: 'As the shoot grows, the thread turns the pulley and the long pointer swings over the scale. The movement of the pointer end is many times the real growth, so tiny increases can be read.',
    }),
    sl('example', 'Worked example 3: reading the auxanometer', {
      b: `The pointer of an arc auxanometer is ${AUX.R} cm long and the pulley radius is ${AUX.r} cm. The pointer moves 18 mm in a day. Find the actual growth of the shoot, and the pointer movement for a growth of 3 mm.`,
      ul: [
        r`Magnification $= ${AUX.R} \div ${AUX.r} = ${magnification}$.`,
        r`Growth $= 18 \div ${magnification} = ${actualGrowth(18)}$ mm.`,
        r`Pointer movement for 3 mm of growth $= 3 \times ${magnification} = ${pointerFor(3)}$ mm.`,
      ],
      v: table(['Quantity', 'Value (mm)'], [['Pointer movement', '18'], ['Actual growth', String(actualGrowth(18))], ['Pointer movement for 3 mm growth', String(pointerFor(3))]], `Worked table: ${actualGrowth(18)} mm of growth`),
      n: 'The pointer is twelve times longer than the pulley is wide, so it magnifies growth twelve times. To find the real growth, divide the pointer movement by twelve.',
    }),
    sl('concept', 'Measuring growth and the factors that affect it', {
      b: 'Growth can be measured **directly** (by a scale, or by counting leaves) and in many other ways. Several **external factors** control it.',
      v: table(['Measure of growth', 'Examples'], [['Direct', 'Length with a scale or thread; leaf area; number of leaves'], ['Other measures', 'Fresh weight, dry weight, volume, cell number'], ['Factors affecting growth', 'Water, oxygen, nutrients, temperature, light']], 'Table of ways of measuring growth and factors affecting it'),
      n: 'Growth can be followed by length, number of leaves, area, fresh weight or dry weight. Plants need water for cell enlargement, oxygen for respiration, nutrients to build new material, a suitable temperature and light.',
    }),
    sl('concept', 'Differentiation, dedifferentiation and redifferentiation', {
      b: 'Cells made by **meristems** become specialised, and some can regain the power to divide.',
      v: table(['Process', 'Meaning', 'Example'], [['Differentiation', 'Meristematic cells become specialised in structure and function', 'Cells become xylem vessels, with lignified walls and loss of protoplasm'], ['Dedifferentiation', 'Mature cells regain the power to divide', 'Interfascicular cambium and cork cambium form from permanent cells; callus in tissue culture'], ['Redifferentiation', 'Dedifferentiated cells lose the power to divide again and mature', 'Secondary xylem and cork formed from the cambia']], 'Table of differentiation, dedifferentiation and redifferentiation with examples'),
      n: 'Differentiation makes specialised cells. Dedifferentiation is when specialised cells begin to divide again, as in the formation of cork cambium. Redifferentiation is when the new cells mature and specialise once more.',
    }),
    sl('check', 'Quick check: differentiation', {
      b: 'Name the process in which a mature cell regains the power to divide.',
      n: 'Quick check. Think of cork cambium forming in an old stem.',
      chk: 'diff-check',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Germination: epigeal (hypocotyl elongates), hypogeal (epicotyl elongates), viviparous (mangrove, on the plant).',
        'Phases of growth: division, elongation, maturation; arithmetic and geometric growth; sigmoid curve with lag, log and stationary phases.',
        `Growth rates: absolute (${AGR.A} cm a day for both seedlings) and relative (${RGR_PCT.A} against ${RGR_PCT.B} percent a day); auxanometer magnifies growth ${magnification} times.`,
        'Differentiation, dedifferentiation and redifferentiation; plants keep open growth and plasticity.',
      ],
      v: table(['Germination', 'Elongating part'], [['Epigeal', 'Hypocotyl'], ['Hypogeal', 'Epicotyl']], 'Summary table of germination types'),
      n: 'To recap: seeds germinate in three ways. Growth has division, elongation and maturation phases and follows an S-shaped curve. An auxanometer magnifies growth. Cells differentiate, and may dedifferentiate and redifferentiate.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Name **the part that elongates** and give **two examples** for each type of germination.',
        'Draw the **sigmoid curve** with three labelled phases and axes.',
        'Show **working** for growth rates and auxanometer readings, with units.',
        'Define the **three differentiation terms** with an example each.',
      ],
      n: 'Exam tips. Give the elongating part and two examples for each type of germination. Draw the sigmoid curve and label its phases. Show your working for rates. And define the three differentiation terms with examples.',
    }),
  ],
});

// ---------------------------------------------------------------- Part 2
export const deck2 = deck({
  part: 2,
  title: 'Plant Growth and Development — Part 2: Plant growth regulators and their uses',
  goals: [
    'Describe how auxin was discovered (Went’s experiments)',
    'State four physiological effects of auxins, gibberellins, cytokinins, ethylene and abscisic acid',
    'Suggest a growth regulator for uses such as rooting cuttings, ripening fruit or weed control',
  ],
  slides: [
    sl('title', 'Chemical messengers of plants', {
      b: 'Part 2 — the five groups of plant growth regulators, how auxin was found, and how they are used in farming and gardening.',
      v: flow('LR', [['a', 'Auxins'], ['g', 'Gibberellins'], ['c', 'Cytokinins'], ['e', 'Ethylene'], ['b', 'Abscisic acid']], [['a', 'g'], ['g', 'c'], ['c', 'e'], ['e', 'b']], 'The five groups of plant growth regulators'),
      n: 'Plant growth regulators are small chemicals made in tiny amounts that control growth. Auxins, gibberellins and cytokinins mostly promote growth, while abscisic acid inhibits it. Ethylene is a gas with several roles.',
    }),
    sl('diagram', 'Went’s experiment: the discovery of auxin', {
      b: '**F. W. Went (1928)** cut the tips of **oat coleoptiles**, placed them on **agar blocks**, and put the blocks on one side of decapitated coleoptiles. The coleoptiles **curved away from the block**: a chemical from the tip, **auxin**, had passed into the agar.',
      v: V.went,
      n: 'Went collected the growth substance from coleoptile tips in agar blocks. When he placed a block off centre on a headless coleoptile, the coleoptile bent. The substance, named auxin, speeds up elongation on the side where it is.',
    }),
    sl('concept', 'Steps in the discovery of the growth regulators', {
      b: 'Each regulator was found through an experiment or an observation.',
      v: table(['Regulator', 'Discovery'], [['Auxin', 'Darwin (1880): coleoptile tip senses light; Boysen-Jensen: a chemical passes through gelatin; Went (1928): isolated in agar'], ['Gibberellin', 'Kurosawa: rice seedlings with bakanae (foolish seedling) disease, caused by the fungus Gibberella'], ['Cytokinin', 'Skoog and Miller (1955): kinetin from old DNA promoted cell division in tissue culture'], ['Ethylene', 'Cousins: gas from ripe oranges ripened bananas'], ['Abscisic acid', 'Isolated as a growth inhibitor from dormant buds and abscising organs']], 'Table of the discovery of the five plant growth regulators'),
      n: 'Darwin showed that the tip detects light. Went isolated auxin in agar. Kurosawa traced the foolish seedling disease of rice to a fungal chemical, now called gibberellin. Skoog and Miller found kinetin, and Cousins found that ripe oranges give off ethylene.',
    }),
    sl('example', 'Worked example 1: the Avena curvature test', {
      b: `In a curvature test, an agar block with ${WENT_CONC[2]} mg of auxin per litre gave a curvature of ${curvature(WENT_CONC[2])} degrees, and curvature is proportional to concentration in this range. Find the curvature for ${WENT_CONC[4]} mg per litre, and the concentration that gives ${21} degrees.`,
      ul: [
        r`Curvature per mg per litre $= ${curvature(WENT_CONC[2])} \div ${WENT_CONC[2]} = ${WN.degPerUnit}$ degrees.`,
        r`At ${WENT_CONC[4]} mg per litre: $${WN.degPerUnit} \times ${WENT_CONC[4]} = ${curvature(WENT_CONC[4])}$ degrees.`,
        r`For 21 degrees: $21 \div ${WN.degPerUnit} = ${concFor(21)}$ mg per litre.`,
      ],
      v: V.wentPlot,
      n: 'Because curvature is proportional to concentration, find the angle for one unit and scale up or down. Twice the auxin gives twice the bending. This made the coleoptile a way to measure auxin.',
    }),
    sl('check', 'Quick check: curvature test', {
      b: 'Work out an unknown concentration from the curvature.',
      n: 'Quick check. Curvature is proportional to concentration.',
      chk: 'went-check',
    }),
    sl('concept', 'Auxins: four effects', {
      b: '**Auxins** (IAA, IBA, NAA, 2,4-D) are made in shoot tips and root tips and move **down the plant**.',
      v: table(['Effect', 'Explanation'], [['Apical dominance', 'The shoot tip stops the growth of lateral buds; removing the tip releases them'], ['Rooting', 'Promote roots on stem cuttings'], ['Parthenocarpy', 'Cause fruits to form without fertilisation (seedless tomato)'], ['Prevent abscission', 'Stop early fall of young leaves and fruits'], ['Also', 'Cell elongation; 2,4-D is a weedicide for broadleaf weeds']], 'Table of effects of auxins'),
      n: 'Auxins make cells in stems elongate. They keep side buds dormant, which is apical dominance. They make cuttings root, can produce seedless fruit, and delay the falling of young fruits and leaves.',
    }),
    sl('concept', 'Gibberellins and cytokinins: four effects each', {
      b: 'Gibberellins mainly affect **elongation and dormancy**; cytokinins mainly affect **cell division and ageing**.',
      v: table(['Gibberellins (GA₃)', 'Cytokinins (kinetin, zeatin)'], [['Increase the length of stems (bolting; sugarcane)', 'Promote cell division'], ['Break seed and bud dormancy; make barley seeds produce amylase in malting', 'Promote growth of lateral buds, overcoming apical dominance'], ['Increase the size and stalk length of fruits such as grapes; parthenocarpy', 'Delay leaf senescence by keeping chlorophyll and protein'], ['Promote bolting and flowering in some plants', 'Help shoot formation in tissue culture']], 'Table of four effects each of gibberellins and cytokinins'),
      n: 'Gibberellins lengthen stems, break dormancy and enlarge fruits. Cytokinins make cells divide, wake lateral buds, delay the yellowing of leaves and help shoots form in tissue culture.',
    }),
    sl('concept', 'Ethylene and abscisic acid: four effects each', {
      b: '**Ethylene** is a **gas**; **abscisic acid (ABA)** is the **stress hormone** and growth inhibitor.',
      v: table(['Ethylene', 'Abscisic acid'], [['Ripens fruits (tomato, banana, apple)', 'Closes stomata under water stress'], ['Promotes abscission of leaves and fruits and senescence', 'Maintains seed dormancy and inhibits germination'], ['Promotes flowering in pineapple and mango, and female flowers in cucumber', 'Inhibits growth and stem elongation'], ['Breaks seed and bud dormancy; promotes root hairs', 'Promotes leaf senescence and abscission']], 'Table of four effects each of ethylene and abscisic acid'),
      n: 'Ethylene ripens fruit, loosens leaves and fruits so that they fall, and promotes flowering in some plants. Abscisic acid closes the stomata in a drought, keeps seeds dormant, and slows growth.',
    }),
    sl('check', 'Quick check: ethylene and abscisic acid', {
      b: 'Match an effect to its regulator.',
      n: 'Quick check. Which regulator closes stomata?',
      chk: 'abaeth-check',
    }),
    sl('concept', 'Regulators working together', {
      b: 'The **ratio of auxin to cytokinin** controls development. In tissue culture a high auxin to cytokinin ratio gives **roots**, a low ratio gives **shoots**, and a balance gives **callus**. In the plant, **auxin from the shoot tip** and **cytokinin from the roots** pull in opposite directions on lateral buds.',
      v: table(['Medium', 'Auxin (mg/L)', 'Cytokinin (mg/L)', 'Ratio'], MEDIA.map((m) => [m.id, String(m.auxin), String(m.cytokinin), String(ratio(m))]), 'Table of auxin and cytokinin levels in three culture media'),
      n: 'No regulator acts alone. A rich auxin medium makes roots, a rich cytokinin medium makes shoots, and equal amounts keep the tissue as a lump called callus. Apical dominance is a balance between auxin and cytokinin.',
    }),
    sl('example', 'Worked example 2: predicting the organ', {
      b: `Three media have these auxin and cytokinin amounts (mg/L): M1 ${MEDIA[0].auxin} and ${MEDIA[0].cytokinin}; M2 ${MEDIA[1].auxin} and ${MEDIA[1].cytokinin}; M3 ${MEDIA[2].auxin} and ${MEDIA[2].cytokinin}. Predict what a callus forms on each.`,
      ul: MEDIA.map((m) => `**${m.id}**: ratio ${m.auxin} ÷ ${m.cytokinin} = ${ratio(m)}, so **${outcome(m)}**.`),
      v: table(['Medium', 'Ratio', 'Prediction'], MEDIA.map((m) => [m.id, String(ratio(m)), outcome(m)]), 'Worked table of ratios and predicted organs'),
      n: 'Divide auxin by cytokinin. A ratio far above one favours roots, far below one favours shoots, and a ratio of one leaves the callus undifferentiated.',
    }),
    sl('concept', 'Choosing a growth regulator', {
      b: 'Match the **job** to the **regulator**.',
      v: table(['Use', 'Regulator'], [['Rooting of stem cuttings', 'Auxin (IBA, NAA)'], ['Ripening of fruits', 'Ethylene (from ethephon)'], ['Killing broadleaf weeds', '2,4-D (auxin)'], ['Seedless and larger grapes; longer sugarcane stems; malting barley', 'Gibberellin'], ['Keeping cut flowers and vegetables fresh', 'Cytokinin'], ['Preventing premature fruit drop', 'Auxin (NAA)'], ['Synchronised flowering of pineapple', 'Ethylene or NAA']], 'Table of agricultural and horticultural uses of growth regulators'),
      n: 'Auxin roots cuttings and stops fruit fall, and the strong auxin 2,4-D kills broadleaf weeds. Ethylene ripens fruit. Gibberellins make seedless grapes and longer sugarcane. Cytokinins keep cut flowers fresh.',
    }),
    sl('example', 'Worked example 3: preparing a spray', {
      b: `A farmer needs ${D1.ml} mL of a ${D1.want} ppm (mg per litre) spray of a regulator from a ${D1.stock} ppm stock. How much stock and water, and how many mg of regulator are in the spray?`,
      ul: [
        r`$C_1V_1 = C_2V_2$: $V_1 = \dfrac{${D1.want} \times ${D1.ml}}{${D1.stock}} = ${stockVolume(D1.stock, D1.want, D1.ml)}$ mL of stock.`,
        r`Water $= ${D1.ml} - ${stockVolume(D1.stock, D1.want, D1.ml)} = ${D1.ml - stockVolume(D1.stock, D1.want, D1.ml)}$ mL.`,
        r`Regulator $= ${D1.want} \times ${D1.ml / 1000} = ${milligrams(D1.want, D1.ml)}$ mg.`,
      ],
      v: table(['Item', 'Amount'], [['Stock (mL)', String(stockVolume(D1.stock, D1.want, D1.ml))], ['Water (mL)', String(D1.ml - stockVolume(D1.stock, D1.want, D1.ml))], ['Regulator in the spray (mg)', String(milligrams(D1.want, D1.ml))]], 'Worked table: dilution of a regulator stock'),
      n: 'Use the dilution rule: stock volume equals the wanted strength times the wanted volume, divided by the stock strength. Here one tenth of a litre of stock is made up to two litres with water.',
    }),
    sl('check', 'Quick check: uses', {
      b: 'Choose a regulator for a given use.',
      n: 'Quick check. Which regulator would a fruit trader use?',
      chk: 'apps-check',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Went (1928) isolated auxin from oat coleoptile tips in agar; curvature is proportional to auxin.',
        'Auxins: apical dominance, rooting, parthenocarpy, prevent abscission. Gibberellins: stem elongation, dormancy breaking, larger fruit, bolting.',
        'Cytokinins: cell division, lateral buds, delay senescence, shoot formation. Ethylene: ripening, abscission, flowering. ABA: stomatal closure, dormancy, inhibition.',
        'Uses: rooting (auxin), ripening (ethylene), weed control (2,4-D), seedless grapes (gibberellin), freshness (cytokinin).',
      ],
      v: table(['Regulator', 'A key effect'], [['Auxin', 'Apical dominance'], ['Gibberellin', 'Stem elongation'], ['Cytokinin', 'Cell division'], ['Ethylene', 'Fruit ripening'], ['ABA', 'Stomatal closure']], 'Summary table of one key effect of each regulator'),
      n: 'To recap: Went showed that a chemical from the tip, auxin, bends coleoptiles. Each of the five regulators has four main effects, and each has an agricultural or horticultural use.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Describe **Went’s experiment** with agar blocks, the off-centre placement and the curvature.',
        'Give **four effects** for each regulator, using the key words.',
        'Name the **regulator** for each use: rooting, ripening, weeds, seedless fruit.',
        'Keep **promoters** (auxin, gibberellin, cytokinin) apart from **inhibitors** (ABA).',
      ],
      n: 'Exam tips. Describe Went’s experiment step by step. Give four effects of each regulator. Name the right regulator for each farming use. And keep the promoters apart from the inhibitor, abscisic acid.',
    }),
  ],
});
void A1;
void GAIN;
void MAXRATE;
void LOG;
void LAG_END;
void LOG_END;
