// ch13 Plant Growth and Development — two decks: Part 1 (t01 growth, differentiation, development), Part 2 (t02 plant growth regulators).
import { sl, deck, table, flow, svgV, r } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { SIGMOID, GROWTHTYPES, EXPT } from './svgs.mjs';
import { N, DAYS, HEIGHT, incr, rate, SEEDS } from './calc.mjs';

export const V = {
  sigmoid: svgV(SIGMOID, 'S-shaped growth curve of a seedling with lag, log and stationary phases'),
  types: svgV(GROWTHTYPES, 'Arithmetic growth as a straight line and geometric growth as an exponential curve, with cell lineage diagrams'),
  expt: svgV(EXPT, 'Five coleoptile experiments showing bending towards light with intact tip and no bending with covered or removed tip, and the agar block experiment'),
  phases: flow('LR', [['m', 'Meristematic phase: cells divide'], ['e', 'Elongation phase: cells enlarge'], ['t', 'Maturation phase: cells differentiate']], [['m', 'e'], ['e', 't']], 'Flow of the three phases of growth: meristematic, elongation and maturation'),
  measure: table(
    ['Parameter', 'Example'],
    [['Increase in cell number', 'Root apical meristem'], ['Increase in length', 'Pollen tube; shoot height'], ['Increase in area', 'Leaf lamina'], ['Increase in volume', 'Fruit growth'], ['Fresh weight or dry weight', 'Whole seedling or plant']],
    'Table of parameters used to measure plant growth with an example of each',
  ),
  conds: table(
    ['Factor', 'Why it matters'],
    [['Water', 'Cells need turgor to enlarge; also a medium for enzymes'], ['Oxygen', 'Needed for aerobic respiration to release energy'], ['Nutrients', 'Macro and micro nutrients for protoplasm and wall synthesis'], ['Temperature', 'Each plant grows best in a certain range'], ['Light and gravity', 'Affect growth and the direction of organs']],
    'Table of conditions needed for plant growth',
  ),
  diff: flow('LR', [['m', 'Meristematic cell'], ['p', 'Permanent cell (differentiation)'], ['d', 'Dedifferentiation: regains division'], ['r', 'Redifferentiation: new function']], [['m', 'p'], ['p', 'd'], ['d', 'r']], 'Flow from a meristematic cell to a permanent cell, then dedifferentiation and redifferentiation'),
  pgrs: table(
    ['Class', 'Regulators', 'Role'],
    [['Promoters', 'Auxins, gibberellins, cytokinins', 'Cell division, enlargement, flowering, fruiting, seed formation'], ['Inhibitors', 'Abscisic acid', 'Dormancy, abscission, stress responses'], ['Both', 'Ethylene', 'Ripening and senescence; can promote or inhibit']],
    'Table classifying plant growth regulators as promoters and inhibitors',
  ),
  auxin: table(
    ['Effect of auxins', 'Example'],
    [['Initiate rooting in stem cuttings', 'Indole butyric acid (IBA), naphthalene acetic acid (NAA)'], ['Apical dominance', 'Terminal bud suppresses lateral buds'], ['Prevent fruit and leaf drop', 'NAA spray on apple orchards'], ['Parthenocarpy', 'Tomato'], ['Weed killer', '2,4-D kills broad-leaved dicot weeds'], ['Xylem differentiation, cell division', 'Tissue culture']],
    'Table of the physiological effects of auxins',
  ),
  gibb: table(
    ['Effect of gibberellins', 'Example'],
    [['Elongate stems', 'Sugarcane yield rises; grape stalks lengthen'], ['Bolting of rosette plants', 'Beet, cabbage: internodes elongate before flowering'], ['Speed malting', 'Brewing industry'], ['Increase fruit size and shape', 'Apples'], ['Delay senescence', 'Fruits stay on the tree longer']],
    'Table of the physiological effects of gibberellins',
  ),
  cyto: table(
    ['Effect of cytokinins', 'Note'],
    [['Promote cell division (cytokinesis)', 'Kinetin from DNA; zeatin from maize and coconut milk'], ['Lateral shoot growth, adventitious shoots', 'Overcome apical dominance'], ['Delay leaf senescence', 'Mobilise nutrients to the leaf'], ['Morphogenesis in tissue culture', 'Shoot formation']],
    'Table of the physiological effects of cytokinins',
  ),
  ethylene: table(
    ['Effect of ethylene', 'Example'],
    [['Fruit ripening', 'Tomato, apple, banana'], ['Hastens senescence and abscission', 'Leaves and flowers'], ['Promotes female flowers', 'Cucumber'], ['Breaks seed and bud dormancy', 'Potato tubers'], ['Rapid internode elongation', 'Deepwater rice'], ['Flowering', 'Pineapple, mango']],
    'Table of the physiological effects of ethylene',
  ),
  aba: table(
    ['Effect of abscisic acid', 'Note'],
    [['Inhibits seed germination; seed dormancy', 'Antagonist of gibberellins'], ['Stimulates closure of stomata', 'Raises tolerance to stress'], ['Promotes abscission and senescence', 'Often called the stress hormone']],
    'Table of the physiological effects of abscisic acid',
  ),
  pair: table(
    ['Pair', 'Interaction'],
    [['Auxin and cytokinin', 'Auxin keeps lateral buds suppressed; cytokinin counters it'], ['Gibberellin and abscisic acid', 'Gibberellin breaks dormancy and promotes germination; ABA maintains it'], ['Auxin and ethylene', 'Auxin can stimulate ethylene release']],
    'Table of interactions between plant growth regulators',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Plant Growth and Development — Part 1: Growth, differentiation and development',
  goals: [
    'Describe the phases and conditions of growth',
    'Distinguish arithmetic and geometric growth and read a sigmoid curve',
    'Explain differentiation, dedifferentiation, redifferentiation and plasticity',
  ],
  slides: [
    sl('title', 'Growth and development', {
      b: 'Part 1 — how plants grow, specialise and change form.',
      v: flow('LR', [['g', 'Growth'], ['d', 'Differentiation'], ['v', 'Development']], [['g', 'd'], ['d', 'v']], 'Flow from growth to differentiation to development'),
      n: 'A seed becomes a seedling, then a flowering plant. Three processes take part: growth, which is an increase in size, differentiation, in which cells take up special roles, and development, which is the sum of all the changes in the life of the plant.',
    }),
    sl('concept', 'What is growth?', {
      b: '**Growth** is a **permanent, irreversible increase in size** of an organ or cell, using energy. Plants show **indeterminate (open) growth** because **meristems** keep dividing at root and shoot tips throughout life.',
      v: V.phases,
      n: 'Growth is irreversible, so a cell that swells with water and then shrinks has not grown. Plants keep adding new organs because their meristems stay active throughout life. At a growing tip there are three phases: cells divide, then enlarge, and finally mature.',
    }),
    sl('concept', 'Measuring growth', {
      b: 'Growth can be measured by several **parameters**: cell number, length, area, volume, fresh weight and dry weight.',
      v: V.measure,
      n: 'Different organs call for different measurements. A pollen tube is measured by its length, a leaf blade by its area, a fruit by its volume, and a root tip by the number of new cells it makes. Fresh weight and dry weight can be used for whole seedlings.',
    }),
    sl('diagram', 'Arithmetic and geometric growth', {
      b: '**Arithmetic:** only one daughter cell keeps dividing, so $L_t = L_0 + rt$, a straight line. **Geometric:** both daughters divide, so $W_t = W_0 e^{rt}$, an exponential curve.',
      m: [r`L_t = L_0 + rt`, r`W_t = W_0 e^{rt}`],
      v: V.types,
      n: 'In arithmetic growth, one daughter cell goes on dividing and the other matures, so length rises by the same amount in each unit of time. This is seen in a root elongating at a constant rate. In geometric growth, both daughter cells divide, so the size grows slowly at first and then very fast.',
    }),
    sl('example', 'Worked example 1: arithmetic growth', {
      b: `A root is 2 cm long and grows by 0.8 cm a day at a constant rate. Find its length after 6 days, and the time it takes to reach 11 cm.`,
      ul: [
        r`$L_t = L_0 + rt = 2 + 0.8 \times 6 = ${N.arithRoot}$ cm.`,
        r`For 11 cm: $t = \dfrac{11 - 2}{0.8} = ${N.arithTime}$ days.`,
        'The length-time graph is a straight line with slope 0.8 cm per day.',
      ],
      v: table(['Day', 'Length (cm)'], [['0', '2'], ['6', String(N.arithRoot)], [String(N.arithTime), '11']], `Worked table: ${N.arithRoot} cm after 6 days`),
      n: 'Use the equation for arithmetic growth. The starting length of two centimetres plus point eight centimetres a day for six days gives six point eight centimetres. To reach eleven centimetres, divide the gain of nine centimetres by the rate, which gives eleven and a quarter days.',
    }),
    sl('check', 'Quick check: arithmetic growth', {
      b: 'Find the rate or length for a shoot growing arithmetically.',
      n: 'Quick check. Use length equals starting length plus rate times time.',
      chk: 'arith-num',
    }),
    sl('example', 'Worked example 2: geometric growth', {
      b: `A cell culture weighs 2 g and grows geometrically with a relative growth rate of 0.2 per day. Find its weight after 5 days. If cells double every 2 hours from a single cell, how many cells are there after 10 hours?`,
      ul: [
        r`$W_t = W_0 e^{rt} = 2 \times e^{0.2 \times 5} = 2e \approx ${N.geo}$ g.`,
        r`Five doublings in 10 hours: $1 \times 2^{5} = ${N.cells10h}$ cells.`,
        'Both results show growth that speeds up as there are more dividing cells.',
      ],
      v: table(['Quantity', 'Result'], [['Weight after 5 days', `${N.geo} g`], ['Cells after 10 hours', String(N.cells10h)]], `Worked table: ${N.geo} g and ${N.cells10h} cells`),
      n: 'Put the numbers into the exponential equation. Two grams times e to the power of one gives about five point four four grams. For the doubling culture, ten hours holds five doublings, and two to the power of five is thirty two cells.',
    }),
    sl('diagram', 'The sigmoid growth curve', {
      b: 'Growth in a limited environment follows an **S-shaped** curve: a **lag phase** (slow), a **log or exponential phase** (fastest, geometric), and a **stationary phase** (growth levels off as resources run short or cells age).',
      v: V.sigmoid,
      n: 'Look at the curve of a seedling over thirty five days. In the lag phase, growth is slow. In the log phase it is fastest, and here the growth is exponential. Finally, in the stationary phase, growth slows and stops, as nutrients run short or as the organ ages.',
    }),
    sl('example', 'Worked example 3: reading the curve', {
      b: `Heights (cm) at days ${DAYS.join(', ')} are ${HEIGHT.join(', ')}. Find the growth in each 5-day interval, the fastest interval and its rate.`,
      ul: [
        `Increments: ${incr.join(', ')} cm, found by subtracting each height from the next.`,
        `The largest is ${N.maxInc} cm between days ${N.maxIntervalStart} and ${N.maxIntervalEnd}.`,
        r`Rate: $\dfrac{${N.maxInc}}{5} = ${N.maxRate}$ cm per day.`,
      ],
      v: table(['Interval (days)', 'Growth (cm)', 'Rate (cm per day)'], incr.map((v, i) => [`${DAYS[i]} to ${DAYS[i + 1]}`, String(v), String(rate[i])]), 'Worked table of growth in each 5-day interval'),
      n: 'Subtract each height from the next to get the growth in every five day interval. The biggest gain is ten centimetres between day fifteen and day twenty, which is two centimetres a day. This lies in the log phase.',
    }),
    sl('check', 'Quick check: the curve', {
      b: 'Name the phase from the growth data.',
      n: 'Quick check. In which phase is growth slowest at the start?',
      chk: 'lag-mcq',
    }),
    sl('concept', 'Conditions for growth', {
      b: 'Growth needs **water**, **oxygen**, **nutrients**, a suitable **temperature**, and is affected by **light** and **gravity**.',
      v: V.conds,
      n: 'Water gives turgor, so cells can enlarge. Oxygen supports respiration, which releases energy for growth. Nutrients supply the raw materials. Each plant has a range of temperature in which it grows best, and light and gravity influence the direction in which organs grow.',
    }),
    sl('check', 'Quick check: conditions', {
      b: 'Decide which factor limits growth.',
      n: 'Quick check. Think about what a waterlogged root lacks.',
      chk: 'cond-mcq',
    }),
    sl('concept', 'Differentiation, dedifferentiation and redifferentiation', {
      b: 'Cells from meristems **differentiate** into permanent cells with special structures. Permanent cells can **dedifferentiate**, regaining the power to divide (**callus**, interfascicular cambium), then **redifferentiate** to take up new roles.',
      v: V.diff,
      n: 'Differentiation is the process by which cells formed from the meristem become specialised, for example into a vessel with a lignified wall. Differentiated cells can revert to the dividing state, which is dedifferentiation, as happens when a wound heals. The new cells may then differentiate again, which is redifferentiation.',
    }),
    sl('concept', 'Plasticity and development', {
      b: '**Plasticity** is the ability of a plant to form different structures in response to environment or phase of life: **heterophylly**, as in cotton, coriander and larkspur. **Development** is the sum of growth and differentiation over the whole life of the plant.',
      v: table(['Plant', 'Heterophylly'], [['Cotton', 'Juvenile leaves differ in shape from mature leaves'], ['Coriander', 'Juvenile leaves differ in shape from mature leaves'], ['Larkspur', 'Juvenile leaves differ in shape from mature leaves'], ['Buttercup', 'Leaves in air differ from leaves in water']], 'Table of heterophylly in cotton, coriander, larkspur and buttercup'),
      n: 'Some plants produce leaves of different shapes at different stages, or in different environments. This is heterophylly, a kind of plasticity, seen in cotton, coriander and larkspur. Development includes all the changes from seed to death: growth, differentiation, and the formation of flowers and fruits.',
    }),
    sl('check', 'Quick check: dedifferentiation', {
      b: 'Name the process in a wounded tissue.',
      n: 'Quick check. Which process lets mature cells divide again?',
      chk: 'dedif-mcq',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Growth: irreversible increase in size; plants have indeterminate growth through meristems.',
        'Phases: meristematic, elongation, maturation.',
        'Arithmetic growth: L equals L0 plus rt (linear). Geometric growth: W equals W0 e to the rt (exponential).',
        'Sigmoid curve: lag, log, stationary phases.',
        'Conditions: water, oxygen, nutrients, temperature, light, gravity.',
        'Differentiation, dedifferentiation, redifferentiation; plasticity (heterophylly); development.',
      ],
      v: V.sigmoid,
      n: 'To recap: growth in plants is open and irreversible, driven by meristems. It can be arithmetic or geometric, and the overall curve is S shaped. It needs water, oxygen, nutrients and a suitable temperature. Cells differentiate, may dedifferentiate and redifferentiate, and plants show plasticity.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'State **irreversible** and **permanent** in a definition of growth.',
        'Label a growth curve with **three phases** and the **fastest growth** in the log phase.',
        'Write the **equation** before substituting in a numerical.',
        'Use **callus formation** as the example of dedifferentiation.',
      ],
      n: 'Exam tips. Use the words permanent and irreversible when defining growth. Label all three phases on a growth curve, and place the fastest growth in the log phase. Write the equation first in a numerical problem. And use callus formation as your example of dedifferentiation.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Plant Growth and Development — Part 2: Plant growth regulators',
  goals: [
    'Classify plant growth regulators and name their discoverers',
    'Describe the effects of auxins, gibberellins, cytokinins, ethylene and abscisic acid',
    'Explain how regulators work together or against each other',
  ],
  slides: [
    sl('title', 'Plant growth regulators', {
      b: 'Part 2 — the chemical messengers that steer growth.',
      v: V.pgrs,
      n: 'Plant growth regulators are small chemical molecules that control growth and development. Some promote growth, such as auxins, gibberellins and cytokinins. Others inhibit it, such as abscisic acid. Ethylene is a gas that can act either way.',
    }),
    sl('diagram', 'Discovery of auxin', {
      b: 'Charles and Francis Darwin found that the **tip** of an oat coleoptile perceives light. **Went** showed that a **chemical from the tips**, collected in an agar block, makes a decapitated coleoptile bend. This is **auxin**.',
      v: V.expt,
      n: 'In the experiments, a coleoptile with its tip intact bends towards light. Covering the tip with an opaque cap, or cutting it off, stops the bending, so the tip perceives the light. Went placed an agar block that had stood under tips on one side of a decapitated coleoptile in the dark, and it bent away from that side. A chemical had moved down.',
    }),
    sl('check', 'Quick check: reading the experiment', {
      b: 'Interpret one of the coleoptile experiments.',
      n: 'Quick check. Which part of the coleoptile perceives light?',
      chk: 'darwin-mcq',
    }),
    sl('concept', 'Auxins', {
      b: '**Auxins** (IAA, IBA, NAA, and synthetic **2,4-D**) are made at the tips of roots and shoots. They help initiate **rooting in cuttings**, maintain **apical dominance**, prevent **fruit and leaf drop**, and the synthetic 2,4-D is used as a **weed killer** for dicots.',
      v: V.auxin,
      n: 'Auxins were the first plant growth regulators to be discovered. Rooting powders contain auxins, which help cuttings produce roots. The growing terminal bud suppresses the lateral buds by apical dominance. Spraying NAA keeps fruits and leaves from falling early, and the auxin 2,4-D kills broad leaved weeds without harming grasses such as wheat.',
    }),
    sl('example', 'Worked example 1: preparing a rooting solution', {
      b: `A nursery needs 500 mL of a rooting solution containing 20 mg of IBA per litre, and wants to spray 2,4-D at 1.5 litres per 100 square metres on a weedy plot of 1200 square metres. Find the mass of IBA and the volume of spray.`,
      ul: [
        r`Mass of IBA: $20 \text{ mg per L} \times 0.5 \text{ L} = ${N.rootMg}$ mg.`,
        r`Spray: $\dfrac{1200}{100} \times 1.5 = ${N.sprayLitres}$ litres.`,
        'Always dissolve the regulator first in a little solvent, then make up the volume.',
      ],
      v: table(['Quantity', 'Value'], [['IBA needed', `${N.rootMg} mg`], ['Spray volume', `${N.sprayLitres} L`]], `Worked table: ${N.rootMg} mg IBA and ${N.sprayLitres} litres spray`),
      n: 'Concentration times volume gives the mass. Twenty milligrams per litre in half a litre needs ten milligrams. For the plot, one thousand two hundred square metres is twelve lots of one hundred, and twelve times one point five litres is eighteen litres.',
    }),
    sl('check', 'Quick check: apical dominance', {
      b: 'Explain a gardener’s pruning.',
      n: 'Quick check. What happens when the terminal bud is removed?',
      chk: 'dominance-mcq',
    }),
    sl('concept', 'Gibberellins', {
      b: '**Gibberellins** (GA3 and others) were found from the fungus *Gibberella fujikuroi*, which causes the **foolish seedling** disease of rice. They **elongate stems**, cause **bolting** and **speed malting**.',
      v: V.gibb,
      n: 'Rice seedlings infected with the fungus grew abnormally tall, which led to the discovery of gibberellins. They make stems longer, as in sugarcane, and make rosette plants such as cabbage bolt before flowering. Brewers use them to speed up malting.',
    }),
    sl('concept', 'Cytokinins', {
      b: '**Cytokinins** promote **cell division**. Kinetin was found in autoclaved herring sperm DNA, and **zeatin** in maize kernels and coconut milk. They help **lateral shoot growth** and **delay senescence**.',
      v: V.cyto,
      n: 'Cytokinins act mainly where there is rapid cell division, such as in root tips and young fruits. They overcome apical dominance, so lateral buds grow. They also delay the ageing of leaves by drawing nutrients to them, so the leaves stay green longer.',
    }),
    sl('check', 'Quick check: cytokinins', {
      b: 'Predict the effect of a regulator on detached leaves.',
      n: 'Quick check. Which regulator keeps cut leaves green?',
      chk: 'cytosen-mcq',
    }),
    sl('concept', 'Ethylene', {
      b: '**Ethylene** is a **gaseous** regulator. It **ripens fruit**, hastens **senescence** and **abscission**, promotes **female flowers** in cucumber, breaks **dormancy** of potato tubers and promotes **flowering** in pineapple and mango.',
      v: V.ethylene,
      n: 'Ethylene is made in large amounts in ripening fruit and in tissues under stress. Because it is a gas, one ripe fruit in a closed space can ripen others. Ethephon, a liquid, releases ethylene and is sprayed to ripen fruit and to hasten flowering in pineapple.',
    }),
    sl('example', 'Worked example 2: a seed germination test', {
      b: `${SEEDS.total} seeds were put in each of three dishes: water only, gibberellin, and abscisic acid. After a week, ${SEEDS.control}, ${SEEDS.ga} and ${SEEDS.aba} had germinated. Find the germination percentage in each dish.`,
      ul: [
        r`Control: $\dfrac{${SEEDS.control}}{${SEEDS.total}} \times 100 = ${N.gControl}$ percent.`,
        r`Gibberellin: $\dfrac{${SEEDS.ga}}{${SEEDS.total}} \times 100 = ${N.gGa}$ percent, twice the control.`,
        r`Abscisic acid: $\dfrac{${SEEDS.aba}}{${SEEDS.total}} \times 100 = ${N.gAba}$ percent, much lower.`,
      ],
      v: table(['Dish', 'Germinated of 50', 'Percent'], [['Water only', String(SEEDS.control), String(N.gControl)], ['Gibberellin', String(SEEDS.ga), String(N.gGa)], ['Abscisic acid', String(SEEDS.aba), String(N.gAba)]], `Worked table: ${N.gControl}, ${N.gGa} and ${N.gAba} percent`),
      n: 'Divide the number germinated by fifty and multiply by one hundred. Water alone gives thirty six percent, gibberellin gives seventy two percent, which is double, and abscisic acid gives only twelve percent. The result shows that gibberellin promotes and abscisic acid inhibits germination.',
    }),
    sl('concept', 'Abscisic acid', {
      b: '**Abscisic acid (ABA)** is the **stress hormone**. It **closes stomata**, induces **seed dormancy**, inhibits **seed germination**, promotes abscission and senescence, and acts as an **antagonist** of gibberellins.',
      v: V.aba,
      n: 'During drought, abscisic acid builds up and makes the stomata close, which saves water. It keeps seeds dormant until conditions improve, working against gibberellins, which promote germination.',
    }),
    sl('check', 'Quick check: abscisic acid', {
      b: 'Match the response to the regulator.',
      n: 'Quick check. Which regulator closes stomata in a drought?',
      chk: 'aba-mcq',
    }),
    sl('concept', 'Working together or against', {
      b: 'Growth regulators seldom act alone. They may be **synergistic** or **antagonistic**.',
      v: V.pair,
      n: 'Regulators often act together. Auxin suppresses lateral buds and cytokinin overcomes this. Gibberellin breaks dormancy and promotes germination, while abscisic acid keeps the seed dormant. A balance between them decides what the plant does.',
    }),
    sl('summary', 'Summary', {
      ul: [
        'Auxins: rooting, apical dominance, preventing drop, parthenocarpy, 2,4-D weed killer.',
        'Gibberellins: stem elongation, bolting, malting.',
        'Cytokinins: cell division, lateral shoots, delay senescence.',
        'Ethylene: gas; ripening, senescence, abscission, female flowers.',
        'Abscisic acid: stress hormone; stomatal closure, dormancy; antagonist of gibberellins.',
      ],
      v: V.pgrs,
      n: 'To recap: auxins, gibberellins and cytokinins are promoters, abscisic acid is an inhibitor, and ethylene is a gas that can act either way. Each regulator has several effects, and they interact to control growth, dormancy and ageing.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: [
        'Give **two effects** and **one practical use** for each regulator.',
        'Name the **discoverer or source** where asked.',
        'Say that **ethylene is a gas** and **ABA is an antagonist of gibberellins**.',
        'In experiments, state the **control** and what each treatment shows.',
      ],
      n: 'Exam tips. For each regulator give two effects and one practical use. Name the source or discoverer when the question asks. Remember that ethylene is a gas and that abscisic acid opposes gibberellins. And in an experiment, always state the control and what each treatment shows.',
    }),
  ],
});
