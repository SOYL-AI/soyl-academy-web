// ch04 Exploring Mixtures and their Separation — question bank. MCQ keys are placed by the builder (balanced).
// AR keys planned: tyndall-ar a, brass-ar c, nacl-ar d, pencil-ar b, frac-ar a, iodine-ar b.
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
// Solubility values are APPROXIMATE, textbook-like and used for practice; "substance X" values are given (illustrative).
import { mk, add, r, near, dec } from './lib.mjs';
import { KNO3, interp } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const p3 = (x) => Number(x.toPrecision(3));

// ---------------------------------------------------------------- t01 pure substances and mixtures
add('chk-mix', mcq({
  stem: 'Brass is made by melting copper and zinc together and letting the melt cool. Under a microscope it looks the same everywhere, and its copper to zinc ratio can be changed by the maker. Brass is:',
  right: 'a homogeneous mixture (a solid solution), because its composition is uniform but not fixed',
  wrong: ['a compound, because it looks uniform throughout', 'a heterogeneous mixture, because it contains two different metals', 'an element, because it is a metal'],
  sol: 'The ratio of the metals can be varied, so brass is a mixture, not a compound. It is uniform throughout, so it is homogeneous (a solid solution) — option (@K). Looking uniform does not make a substance a compound, so (@1) is wrong.',
  d: 2, c: 'application', t: [1],
}));
add('mix-list-mcq', mcq({
  stem: 'Which pair contains only homogeneous mixtures?',
  right: 'Sugar syrup and air that is free of dust',
  wrong: ['Muddy water and a vegetable salad', 'Granite and sugar syrup', 'Sand stirred in water and air free of dust'],
  sol: 'Sugar syrup and dust-free air are uniform throughout — option (@K). Each other pair has at least one heterogeneous member: muddy water, salad, granite, or sand stirred in water.',
  d: 2, c: 'understanding', t: [1],
}));
add('boil-mcq', mcq({
  stem: 'Liquid L1 boils steadily at 78 °C throughout. Liquid L2 starts to boil at 82 °C, and the thermometer keeps rising to 96 °C as it boils away. The most likely conclusion is that:',
  right: 'L1 is a pure liquid and L2 is a mixture',
  wrong: ['L1 is a mixture and L2 is a pure liquid', 'both are pure liquids with different boiling points', 'both are mixtures of the same liquids'],
  sol: 'A pure liquid has a fixed boiling point, so L1 stays at one temperature. A mixture boils over a range as its composition changes, as L2 does — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('notmix-mcq', mcq({
  stem: 'Which statement is NOT true of a mixture?',
  right: 'It has a fixed melting point, like a pure substance',
  wrong: ['Its components can be present in any proportion', 'Its components keep their own properties', 'Its components can be separated by physical methods'],
  sol: 'A mixture has no fixed melting point because its composition can vary, so the statement in (@K) is false. The other statements are true of mixtures.',
  d: 2, c: 'understanding', t: [1],
}));
add('mud-tf', tf({
  stem: 'Because muddy water settles when left to stand, it is a homogeneous mixture.',
  key: 'f',
  sol: 'False. Muddy water has visible mud particles that settle, so its composition is not uniform: it is a heterogeneous mixture (a suspension).',
  d: 1, c: 'understanding', t: [1, 2],
}));
add('brass-ar', ar({
  a: 'Brass is classified as a homogeneous mixture.',
  r: 'Copper and zinc are always present in brass in one fixed ratio by mass.',
  key: 'c',
  sol: 'A is true: brass is a solid solution, uniform throughout. R is false: the ratio can be varied (for example 70 : 30 or 60 : 40), which is why brass is a mixture — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('pure-short', short({
  marks: 2,
  stem: 'Distilled water and sea water both look clear. Name the one that is a pure substance and give one test, using boiling, that tells them apart.',
  model: 'Distilled water is the pure substance. It boils at a fixed 100 °C at sea level, and the temperature stays steady while it boils. Sea water is a mixture, so it begins to boil at a slightly higher temperature, which keeps rising as water leaves and the salt gets more concentrated.',
  sol: 'Distilled water is pure: fixed boiling point; sea water boils over a range.',
  scheme: [['Distilled water is pure', 0.5], ['Fixed, steady boiling point of pure water', 1], ['Sea water boils over a changing range', 0.5]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 solutions, suspensions and colloids
add('chk-tyn', mcq({
  stem: 'A torch beam is passed in a dark room through a tumbler of clear sugar solution and then through a tumbler of water with a little starch dispersed in it. In which will the path of the beam be seen, and why?',
  right: 'Only in the starch tumbler, because the starch particles are large enough to scatter light',
  wrong: ['Only in the sugar tumbler, because dissolved sugar particles are the largest', 'In both tumblers equally, because both are mixtures', 'In neither, because light cannot travel through a liquid'],
  sol: 'Colloidal starch particles scatter light, so the beam path shows up (the Tyndall effect). Sugar in solution has particles too small to scatter light — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('size-mcq', mcq({
  stem: 'A liquid mixture has particles about 200 nm across. It does not settle when left overnight, passes through ordinary filter paper and makes a torch beam visible. It is:',
  right: 'a colloid',
  wrong: ['a true solution', 'a suspension', 'a pure liquid'],
  sol: 'Particles of 1 to 1000 nm that do not settle, pass through filter paper and scatter light make a colloid — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('forest-mcq', mcq({
  stem: 'On a misty morning, beams of sunlight can be seen slanting through the trees of a forest. This is because:',
  right: 'droplets and dust in the misty air scatter the sunlight, as in the Tyndall effect',
  wrong: ['the air molecules are large enough to settle and reflect light', 'light itself is visible as a solid rod when it passes through trees', 'the leaves of the trees emit light of their own'],
  sol: 'Mist is a colloid of tiny water droplets in air. Its particles scatter the sunlight so that the beam path shows — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('foam-mcq', mcq({
  stem: 'A bottle of shaving cream, when pressed, gives a soft mass of gas bubbles spread through a liquid. This colloid is called:',
  right: 'a foam',
  wrong: ['an emulsion', 'a gel', 'an aerosol'],
  sol: 'Gas dispersed in a liquid is a foam — option (@K). An emulsion is liquid in liquid, a gel is liquid in solid and an aerosol is liquid or solid in gas.',
  d: 1, c: 'recall', t: [2],
}));
add('susp-filter-tf', tf({
  stem: 'A suspension of chalk powder in water passes through ordinary filter paper without leaving any residue.',
  key: 'f',
  sol: 'False. The chalk particles are larger than the pores of the paper, so they are held back as a residue.',
  d: 1, c: 'understanding', t: [2],
}));
add('tyndall-fill', fill({
  stem: 'The scattering of light by the particles of a colloid, which makes the path of a beam visible, is called the ___ effect.',
  acc: [['Tyndall']],
  sol: 'This is the **Tyndall** effect.',
  d: 1, c: 'recall', t: [2],
}));
add('tyndall-ar', ar({
  a: 'The path of a torch beam is clearly visible in water to which a few drops of milk have been added.',
  r: 'The particles in the milk and water mixture are large enough to scatter light.',
  key: 'a',
  sol: 'A is true: the diluted milk is a colloid. R is true and it explains A, since particles of colloidal size scatter light — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('colloid-match', match({
  stem: 'A student lists four colloids seen on a rainy day in the kitchen and market. Match each (Column A) with its type (Column B).',
  pairs: [
    ['Thick fog over a highway', 'Aerosol'],
    ['Foam on top of a cup of lassi', 'Foam'],
    ['Fresh milk in a steel can', 'Emulsion'],
    ['Wobbling fruit jelly in a bowl', 'Gel'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Fog is liquid droplets in air (aerosol), the lassi foam is gas in liquid (foam), milk is liquid in liquid (emulsion) and jelly is liquid in solid (gel).',
  d: 2, c: 'understanding', t: [2],
}));
add('torch-short', short({
  marks: 2,
  stem: 'A torch beam shows its path in a tumbler of dilute milk but not in a tumbler of salt solution. Explain the difference.',
  model: 'Dilute milk is a colloid, whose particles are large enough to scatter light, so the path of the beam is visible. The particles of a salt solution are far smaller, less than a nanometre, so they cannot scatter the light and the beam passes through without being seen.',
  sol: 'Colloid particles scatter light; solution particles are too small.',
  scheme: [['Colloid particles are large enough to scatter light', 1], ['Dissolved salt particles are too small to scatter light', 1]],
  d: 2, c: 'application', t: [2],
}));
add('filter-short', short({
  marks: 2,
  stem: 'A farmer filters muddy pond water and also filters a little milk through the same cloth. Which one leaves a residue, and why does the other pass through?',
  model: 'The muddy water leaves a residue, because it is a suspension whose particles are larger than the pores of the cloth. Milk is a colloid, whose particles are far smaller, so they pass through the pores of the cloth along with the liquid.',
  sol: 'Suspension particles are retained; colloid particles pass through.',
  scheme: [['Muddy water leaves a residue; its particles are bigger than the pores', 1], ['Milk particles are colloidal and small enough to pass through', 1]],
  d: 2, c: 'application', t: [2],
}));
add('compare3-short', short({
  marks: 3,
  stem: 'State three differences between a true solution and a suspension.',
  model: 'In a true solution the particles are smaller than a nanometre, while in a suspension they are bigger than a thousand nanometres. A solution is clear and does not settle, whereas a suspension is cloudy and its particles settle on standing. A solution passes through filter paper without leaving a residue, but a suspension leaves a residue on the paper.',
  sol: 'Particle size, settling, filtration.',
  scheme: [['Particle size: below 1 nm against above 1000 nm', 1], ['Settling on standing: no against yes', 1], ['Filter paper: no residue against residue', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('tyndall-case', mk.case({
  passage: r`A student tests four liquids P, Q, R and S in a dark room with a torch. She also leaves each liquid for 30 minutes and then pours it through filter paper.

| Liquid | Appearance | Settles in 30 min? | Residue on filter paper? | Path of the beam |
|---|---|---|---|---|
| P | clear | no | no | not seen |
| Q | milky | no | no | clearly seen |
| R | cloudy brown | yes | yes | seen, but the liquid is cloudy |
| S | clear | no | no | not seen |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Liquid Q is best described as:',
      right: 'a colloid, since it does not settle or leave a residue but scatters light',
      wrong: ['a suspension, since it looks milky', 'a true solution, since it does not settle', 'a pure compound, since it looks uniform'],
      sol: 'Q does not settle and passes through the paper, so it is not a suspension. It scatters light, so it is not a true solution. It is a colloid — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', short({
      marks: 1,
      stem: 'Which two liquids could be true solutions?',
      model: 'P and S, because they are clear, do not settle, leave no residue and show no beam.',
      sol: 'P and S show none of the three signs.',
      scheme: [['P and S', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Liquid R is left undisturbed overnight. Describe what you would see and name the type of mixture.',
      model: 'The brown particles would settle at the bottom as a layer, leaving a clearer liquid above. R is a suspension, because its particles are large and settle under gravity.',
      sol: 'Particles settle; suspension.',
      scheme: [['Particles settle to the bottom, clearer liquid above', 1], ['It is a suspension', 1]],
      d: 2, c: 'application', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Liquid Q is poured through fine filter paper. Say what passes through, and name the test that shows it is not a solution.',
        model: 'Q passes through the filter paper with no residue, because its particles are small. The Tyndall effect shows that Q is not a solution, since the beam path is visible in it.',
        sol: 'It passes through; the Tyndall effect.',
        scheme: [['Q passes through, leaving no residue', 1], ['Tyndall effect: beam path seen, so not a solution', 1]],
        d: 2, c: 'application', t: [2],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t03 concentration and solubility
add('chk-conc', mcq({
  stem: 'A bottle of antiseptic solution is labelled "5 % mass by mass". This means that it contains:',
  right: '5 g of solute in every 100 g of the solution',
  wrong: ['5 g of solute in every 100 g of the solvent', '5 g of solute in every 100 mL of the solvent', '5 mL of solute in every 100 g of the solution'],
  sol: 'Mass percentage is the mass of solute in 100 g of the whole solution — option (@K). The solvent alone is not 100 g.',
  d: 1, c: 'understanding', t: [3],
}));
add('unsat-mcq', mcq({
  stem: 'At a certain temperature 38 g of a salt dissolves at most in 100 g of water. Ravi dissolves 30 g of it in 100 g of water at that temperature. The solution is:',
  right: 'unsaturated, since it can dissolve 8 g more',
  wrong: ['saturated, since the salt has dissolved completely', 'saturated, since 30 g is less than 38 g', 'unsaturated, since it can dissolve 38 g more'],
  sol: 'The solubility is 38 g per 100 g of water. Since 30 g is less than 38 g, the solution can still take $38 - 30 = 8$ g more, so it is unsaturated — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => 38 - 30 === 8 || 'diff');
add('kno3-vs-nacl-mcq', mcq({
  stem: 'Hot saturated solutions of potassium nitrate and of sodium chloride, each made with 100 g of water at 80 °C, are cooled to 20 °C. Using the approximate curves, why does the potassium nitrate solution give far more crystals?',
  right: 'Its solubility falls steeply as the temperature falls, while that of sodium chloride changes very little',
  wrong: ['Potassium nitrate is lighter and floats out of the solution', 'Sodium chloride is more soluble at 20 °C than at 80 °C', 'Both change by the same amount, but potassium nitrate is heavier'],
  sol: 'The potassium nitrate curve is steep, so a lot of it leaves the solution when cooled. The sodium chloride curve is almost flat, so very little crystallises — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('gas-mcq', mcq({
  stem: 'Small bubbles form on the inside wall of a glass of cold tap water left in a warm kitchen. These are bubbles of dissolved air coming out because:',
  right: 'the solubility of a gas in water decreases when the temperature rises',
  wrong: ['the solubility of a gas in water increases when the temperature rises', 'the water is evaporating very rapidly', 'cold water cannot hold any gas at all'],
  sol: 'Gases become less soluble in water as it warms, so dissolved air is released as bubbles — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('same-conc-mcq', (() => {
  const P = { s: 10, w: 90 };
  const Q = { s: 15, w: 135 };
  const pp = (P.s / (P.s + P.w)) * 100;
  const pq = (Q.s / (Q.s + Q.w)) * 100;
  return mcq({
    stem: `Two sugar solutions are made. Solution P has ${P.s} g of sugar in ${P.w} g of water. Solution Q has ${Q.s} g of sugar in ${Q.w} g of water. Which statement is correct?`,
    right: 'Both have the same mass percentage of sugar',
    wrong: ['Q is more concentrated, because it has more sugar', 'P is more concentrated, because it has less water', 'P is more concentrated, because it has more sugar per gram of water'],
    sol: r`P: $10 / (10 + 90) \times 100 = ${dec(pp, 2)}\ \%$. Q: $15 / (15 + 135) \times 100 = ${dec(pq, 2)}\ \%$. The two are equal — option (@K), although Q has more sugar.`,
    d: 3, c: 'analysis', t: [3],
  });
})(), () => near(10 / 100, 15 / 150, 1e-9) || 'same');
add('heat-tf', tf({
  stem: 'A solution of potassium nitrate that is exactly saturated at 40 °C becomes unsaturated if it is warmed to 60 °C with no water lost.',
  key: 't',
  sol: 'True. The solubility of potassium nitrate is higher at 60 °C, so the warmer solution can dissolve more and is no longer saturated.',
  d: 2, c: 'understanding', t: [3],
}));
add('sat-fill', fill({
  stem: 'A solution that cannot dissolve any more solute at a given temperature is called a ___ solution.',
  acc: [['saturated']],
  sol: 'It is a **saturated** solution.',
  d: 1, c: 'recall', t: [3],
}));
add('nacl-ar', ar({
  a: 'Cooling a hot saturated solution of sodium chloride from 80 °C to 20 °C gives a large crop of crystals.',
  r: 'The solubility of sodium chloride in water changes very little with temperature.',
  key: 'd',
  sol: 'A is false: because the solubility of sodium chloride hardly changes, only a few crystals appear. R is true and is the reason A is false — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('syrup-num', (() => {
  const s = 120, w = 480;
  const sol = s + w;
  const pct = (s / sol) * 100;
  return num({
    stem: `For a batch of jalebi syrup, a halwai dissolves ${s} g of sugar in ${w} g of water. Find the mass percentage of sugar in the syrup.`,
    value: pct, tol: 0.1, unit: '%',
    sol: r`Mass of solution $= ${s} + ${w} = ${sol}$ g. Mass percentage $= ${s} / ${sol} \times 100 = ${dec(pct, 3)}\ \%$.`,
    scheme: [['Mass of solution 120 + 480 = 600 g', 1], ['120 / 600 × 100 = 20 %', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(120 / 600 * 100, 20, 1e-9) && q.answer.value === 20 || 'syrup');
add('salt-mass-num', (() => {
  const total = 750, pct = 6;
  const solute = (pct / 100) * total;
  const water = total - solute;
  return num({
    stem: `A laboratory assistant must prepare ${total} g of a ${pct} % (mass by mass) solution of sodium carbonate. How many grams of water are needed?`,
    value: water, tol: 0.5, unit: 'g',
    sol: r`Mass of solute $= ${pct}/100 \times ${total} = ${dec(solute, 3)}$ g. Mass of water $= ${total} - ${dec(solute, 3)} = ${dec(water, 4)}$ g.`,
    scheme: [['Mass of solute = 6/100 × 750 = 45 g', 1], ['Mass of water = 750 − 45 = 705 g', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(750 - 0.06 * 750, 705, 1e-9) && q.answer.value === 705 || 'salt-mass');
add('mouthwash-vol-num', (() => {
  const a = 88, v = 400;
  const pct = (a / v) * 100;
  return num({
    stem: `A cleaning liquid is made by adding water to ${a} mL of isopropyl alcohol until the total volume is ${v} mL. Find the volume percentage of alcohol.`,
    value: pct, tol: 0.1, unit: '%',
    sol: r`Volume percentage $= ${a} / ${v} \times 100 = ${dec(pct, 3)}\ \%$.`,
    scheme: [['Volume of solution is 400 mL, not the volume of water', 1], ['88 / 400 × 100 = 22 %', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(88 / 400 * 100, 22, 1e-9) && q.answer.value === 22 || 'vol');
add('drip-num', (() => {
  const g = 25, v = 500;
  const mv = (g / v) * 100;
  return num({
    stem: `A glucose drip bag contains ${g} g of glucose dissolved in water to make ${v} mL of solution. Find the concentration as mass by volume percentage.`,
    value: mv, tol: 0.05, unit: '%',
    sol: r`Mass by volume percentage $= ${g} / ${v} \times 100 = ${dec(mv, 3)}\ \%$.`,
    scheme: [['Solute in grams and solution in millilitres', 1], ['25 / 500 × 100 = 5 %', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(25 / 500 * 100, 5, 1e-9) && q.answer.value === 5 || 'drip');
add('kno3-250-num', (() => {
  const w = 250;
  const s = interp(KNO3, 40);
  const m = (s * w) / 100;
  return num({
    stem: `Using the approximate solubility of potassium nitrate, ${s} g per 100 g of water at 40 °C, find how many grams dissolve in ${w} g of water to make a saturated solution at 40 °C.`,
    value: m, tol: 0.5, unit: 'g',
    sol: r`${w} g of water is $${w}/100 = 2.5$ times 100 g, so mass dissolved $= ${s} \times 2.5 = ${dec(m, 3)}$ g.`,
    scheme: [['250 g of water is 2.5 times 100 g', 1], ['64 × 2.5 = 160 g', 1]],
    marks: 2, d: 2, c: 'application', t: [3],
  });
})(), (q) => near(64 * 2.5, 160, 1e-9) && q.answer.value === 160 || 'kno3-250');
add('crystal-num', (() => {
  const w = 300;
  const hot = interp(KNO3, 60);
  const cold = interp(KNO3, 20);
  const cr = ((hot - cold) * w) / 100;
  return num({
    stem: `A saturated solution of potassium nitrate is made with ${w} g of water at 60 °C. Using the approximate values ${hot} g per 100 g of water at 60 °C and ${cold} g per 100 g at 20 °C, find the mass of crystals that appear on cooling to 20 °C.`,
    value: cr, tol: 1, unit: 'g',
    sol: r`In ${w} g of water: at 60 °C, $${hot} \times 3 = ${hot * 3}$ g; at 20 °C, $${cold} \times 3 = ${cold * 3}$ g. Crystals $= ${hot * 3} - ${cold * 3} = ${dec(cr, 3)}$ g.`,
    scheme: [['Dissolved at 60 °C and at 20 °C in 300 g of water: 330 g and 96 g', 1], ['Crystals = 330 − 96 = 234 g', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near((110 - 32) * 3, 234, 1e-9) && q.answer.value === 234 || 'crystal');
add('sat-pct-num', (() => {
  const s = interp([[0, 36], [20, 36], [40, 37], [60, 37], [80, 38]], 40);
  const pct = (s / (100 + s)) * 100;
  return num({
    stem: `The approximate solubility of sodium chloride at 40 °C is ${s} g per 100 g of water. Find the mass percentage of sodium chloride in a saturated solution at that temperature.`,
    value: 27, tol: 0.5, unit: '%',
    sol: r`Mass of solution $= 100 + ${s} = ${100 + s}$ g. Mass percentage $= ${s} / ${100 + s} \times 100 = 27\ \%$.`,
    scheme: [['Mass of saturated solution = 100 + 37 = 137 g', 1], ['37 / 137 × 100 = 27 %', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(37 / 137 * 100, 27, 0.005) && q.answer.value === 27 || 'sat-pct');
add('cool-short', short({
  marks: 2,
  stem: 'To obtain crystals from a solution, a student heats it until it is nearly saturated and then lets it cool slowly instead of boiling it dry. Give two reasons for this.',
  model: 'On slow cooling, the solubility falls and well-shaped pure crystals form while the impurities stay in the liquid. Boiling to dryness would leave the impurities mixed with the solid, and a heat-sensitive solid such as sugar could char.',
  sol: 'Purer crystals; no charring.',
  scheme: [['Cooling a saturated solution gives pure crystals, impurities stay dissolved', 1], ['Boiling to dryness leaves impurities or may char the solid', 1]],
  d: 2, c: 'understanding', t: [3, 4],
}));
add('curve3-short', short({
  marks: 3,
  stem: 'A saturated solution of potassium nitrate at 60 °C is cooled to 20 °C. Using the shape of its solubility curve, explain what you will see and why. Say what happens if the solution had been unsaturated at 60 °C.',
  model: 'The solubility of potassium nitrate is much lower at 20 °C than at 60 °C, so the cooled solution can no longer hold all the solute, and the extra comes out as crystals. If the solution had been unsaturated at 60 °C, it may still hold everything at 20 °C, so crystals would form only if the cooling went far enough to reach saturation.',
  sol: 'Lower solubility on cooling gives crystals; an unsaturated solution may give none.',
  scheme: [['Solubility is lower at 20 °C', 1], ['Excess solute crystallises out', 1], ['An unsaturated solution may stay clear until saturation is reached', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('sol-long', long({
  stem: '(a) Define solubility and distinguish between saturated and unsaturated solutions.\n\n(b) A saturated solution of a salt is made with 100 g of water at 80 °C, where the solubility is 100 g, and is cooled to 20 °C, where it is 25 g. Find the mass of crystals.\n\n(c) State how the solubility of a gas changes when the temperature rises, with one everyday observation.',
  model: 'Solubility is the maximum mass of solute that dissolves in 100 g of solvent at a given temperature. A saturated solution holds this maximum, so extra solute stays undissolved, while an unsaturated solution can dissolve more. In (b), the solution holds 100 g at 80 °C but only 25 g can stay dissolved at 20 °C, so 100 − 25 = 75 g of crystals form. In (c), the solubility of a gas falls as the temperature rises, so bubbles escape from a warm fizzy drink.',
  sol: 'Definition and saturated against unsaturated; 100 − 25 = 75 g; gases less soluble on heating.',
  scheme: [['(a) Definition of solubility and of saturated against unsaturated', 2], ['(b) 100 − 25 = 75 g of crystals', 1.5], ['(c) Gas solubility falls with a rise in temperature; example', 1.5]],
  d: 3, c: 'application', t: [3],
}));
add('solub-case', mk.case({
  passage: r`A student measures how much of a salt X (a made-up salt for practice, so the values are given, not real) dissolves in 100 g of water at four temperatures.

| Temperature (°C) | 20 | 40 | 60 | 80 |
|---|---|---|---|---|
| Solubility of X (g per 100 g water) | 25 | 40 | 60 | 100 |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'At 60 °C the student stirs 50 g of X into 100 g of water. The solution is:',
      right: 'unsaturated, because up to 10 g more can still dissolve',
      wrong: ['saturated, because 50 g has dissolved', 'unsaturated, because 60 g more can dissolve', 'saturated, because the temperature is 60 °C'],
      sol: 'The solubility at 60 °C is 60 g per 100 g of water. The solution holds 50 g, so $60 - 50 = 10$ g more can dissolve: it is unsaturated — option (@K).',
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'How many grams of X dissolve in 250 g of water at 40 °C to make a saturated solution?',
      model: r`$40 \times 2.5 = 100$ g.`,
      sol: 'Solubility 40 g per 100 g; 250 g is 2.5 times 100 g.',
      scheme: [['100 g', 1]],
      wl: null,
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'A saturated solution of X made with 100 g of water at 80 °C is cooled to 20 °C. Find the mass of crystals formed.',
      model: r`At 80 °C, 100 g dissolve; at 20 °C only 25 g can stay dissolved. Crystals $= 100 - 25 = 75$ g.`,
      sol: 'Crystals = 100 − 25 = 75 g.',
      scheme: [['100 g at 80 °C and 25 g at 20 °C', 1], ['75 g of crystals', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Find the mass percentage of X in the saturated solution at 80 °C.',
        model: r`Mass of solution $= 100 + 100 = 200$ g, so the mass percentage $= 100 / 200 \times 100 = 50\ \%$.`,
        sol: 'Mass of solution 200 g; 100/200 × 100 = 50 %.',
        scheme: [['Mass of solution = 200 g', 1], ['Mass percentage = 50 %', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t04 separation techniques
add('chk-evap', mcq({
  stem: 'Sea water is let into wide, shallow pans along the Gujarat coast. After some days a crust of common salt is raked up. Salt is obtained mainly by:',
  right: 'evaporation of the water by sun and wind',
  wrong: ['filtration of the sea water through sand', 'distillation using a condenser', 'sublimation of the salt'],
  sol: 'The sun and wind evaporate the water, leaving the dissolved salt behind — option (@K). Sea water is not filtered to make salt, no condenser is used, and salt does not sublime.',
  d: 1, c: 'understanding', t: [4],
}));
add('chk-distil', mcq({
  stem: 'Two liquids that mix completely boil at 78 °C and 82 °C. To separate them in a laboratory, the best method is:',
  right: 'fractional distillation, because their boiling points are close',
  wrong: ['simple distillation, because both are liquids', 'a separating funnel, because they form layers', 'centrifugation, because they have different densities'],
  sol: 'Close boiling points need a fractionating column — option (@K). A separating funnel is only for liquids that do not mix, and centrifugation is for tiny suspended particles.',
  d: 2, c: 'application', t: [4],
}));
add('chk-sep', mcq({
  stem: 'A Punjab farmer tosses threshed wheat into the air on a breezy day. The husk is blown aside and the grains fall in a heap. This works because:',
  right: 'the husk is lighter than the grains',
  wrong: ['the husk is heavier than the grains', 'the grains dissolve in moving air', 'the husk is attracted by a magnet'],
  sol: 'Winnowing depends on a difference in weight, so the breeze carries the lighter husk farther than the heavier grains — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('pencil-mcq', mcq({
  stem: 'A student draws the starting line on chromatography paper with a pencil and not with an ink pen because:',
  right: 'graphite does not dissolve in the solvent and so does not move up the paper',
  wrong: ['graphite is heavier than the dyes being tested', 'ink spots are always larger than pencil spots', 'a pencil line is the only line the solvent can cross'],
  sol: 'Ink contains dyes that would dissolve and move with the solvent, confusing the result. Graphite stays put — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('rf-mcq', mcq({
  stem: 'Four students report the Rf value of a spot in paper chromatography. Which report must be wrong?',
  right: '1.3, because a spot cannot travel farther than the solvent front',
  wrong: ['0.35, a spot that moved a little over a third of the way', '0.80, a spot that moved most of the way', '0.05, a spot that barely left the base line'],
  sol: 'Rf is the distance moved by the substance divided by that moved by the solvent front. The substance cannot go beyond the front, so Rf cannot exceed 1 — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('blood-mcq', mcq({
  stem: 'A blood sample is spun in a centrifuge in a pathology laboratory. The blood cells end up at the bottom of the tube because:',
  right: 'the denser cells are thrown outward to the bottom, leaving the lighter plasma above',
  wrong: ['the lighter cells are thrown outward and sink to the bottom', 'the plasma evaporates quickly during the spinning', 'the spinning dissolves the cells in the plasma'],
  sol: 'The spinning makes denser particles move to the outer end of the tube, which is the bottom — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('funnel-mcq', mcq({
  stem: 'A mixture of mustard oil and water forms two layers. Which technique separates the two liquids most simply?',
  right: 'A separating funnel, run off the lower layer through the tap',
  wrong: ['Simple distillation of the whole mixture', 'Filtration through filter paper', 'Sublimation by gentle heating'],
  sol: 'Immiscible liquids form layers; a separating funnel lets the denser lower layer be run off, leaving the upper layer — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('decant-tf', tf({
  stem: 'In decantation, the clear liquid is poured off gently after the solid has settled at the bottom.',
  key: 't',
  sol: 'True. Decantation separates a settled solid from the liquid above it by pouring the clear liquid off.',
  d: 1, c: 'recall', t: [4],
}));
add('subl-fill', fill({
  stem: 'The change of a solid directly into vapour on heating, as camphor or ammonium chloride does, is called ___.',
  acc: [['sublimation']],
  sol: 'This change is **sublimation**.',
  d: 1, c: 'recall', t: [4],
}));
add('pencil-ar', ar({
  a: 'The base line on a chromatography paper is drawn with a pencil.',
  r: 'The solvent rises through the paper and carries the dyes with it.',
  key: 'b',
  sol: 'A is true because pencil graphite does not dissolve. R is also true, but it does not explain why a pencil is used — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('frac-ar', ar({
  a: 'A fractionating column is used to separate two liquids whose boiling points are close.',
  r: 'Vapour condenses and evaporates repeatedly in the column, getting richer in the more volatile liquid at each stage.',
  key: 'a',
  sol: 'A is true and R is the working principle of the column, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('iodine-ar', ar({
  a: 'A mixture of iodine and sand can be separated by sublimation.',
  r: 'Sand is insoluble in water.',
  key: 'b',
  sol: 'A is true: iodine turns directly into vapour on heating, and sand does not. R is also true, but it is not why sublimation works — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('method-match', match({
  stem: 'A school science club has four separation tasks. Match each task (Column A) with the best method (Column B).',
  pairs: [
    ['Separating the dyes in a black marker ink', 'Paper chromatography'],
    ['Separating cream from fresh whole milk on a dairy farm', 'Centrifugation'],
    ['Separating kerosene from water', 'Separating funnel'],
    ['Recovering naphthalene balls mixed with sand', 'Sublimation'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Dyes separate by speed on paper (chromatography); cream is lighter and is spun out (centrifugation); kerosene and water form layers (separating funnel); naphthalene vaporises on heating (sublimation).',
  d: 2, c: 'understanding', t: [4],
}));
add('rf-num', (() => {
  const d = 4.2, f = 7.0;
  const rf = d / f;
  return num({
    stem: `In a paper chromatography experiment the solvent front rose ${f} cm above the base line. A green spot was found ${d} cm above the base line. Find its Rf value.`,
    value: rf, tol: 0.01, unit: null,
    sol: r`$R_f = ${d} / ${f} = ${dec(rf, 2)}$ (no unit).`,
    scheme: [['Rf = distance moved by spot / distance moved by solvent front', 1], ['4.2 / 7.0 = 0.60', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near(4.2 / 7.0, 0.6, 1e-9) && near(q.answer.value, 0.6, 1e-9) || 'rf');
add('thermo-short', short({
  marks: 2,
  stem: 'In a simple distillation set-up, the bulb of the thermometer is placed level with the side arm of the flask and not dipped in the boiling liquid. Why?',
  model: 'The thermometer must show the temperature of the vapour that is about to enter the condenser, which is the boiling point of the substance distilling over. A bulb dipped in the boiling mixture would read the temperature of the liquid, which can be higher.',
  sol: 'It reads the temperature of the vapour entering the condenser.',
  scheme: [['Thermometer should read the vapour temperature', 1], ['The liquid can be hotter than the vapour distilling over', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('winnow-short', short({
  marks: 2,
  stem: 'Explain how a farmer separates husk from threshed grain by winnowing. State the property on which the method depends.',
  model: 'The farmer tosses the mixture into the air on a breezy day. The wind blows the lighter husk away while the heavier grains fall nearly straight down into a heap. The method depends on the difference in weight between husk and grain.',
  sol: 'Wind carries the lighter husk away; difference in weight.',
  scheme: [['Mixture tossed in a breeze; husk blown away, grain falls', 1], ['Depends on the difference in weight', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('rfunit-short', short({
  marks: 2,
  stem: 'A student states that the Rf value of a dye is 4.2 cm. Point out two errors in this statement.',
  model: 'Rf is a ratio of two distances, so it has no unit and cannot be given in centimetres. Also, an Rf value always lies between 0 and 1, so 4.2 is impossible: the spot cannot move farther than the solvent front.',
  sol: 'Rf has no unit; it must be less than or equal to 1.',
  scheme: [['Rf has no unit', 1], ['Rf cannot exceed 1', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('salt3-short', short({
  marks: 3,
  stem: 'Describe how common salt is obtained from sea water in the salt pans of the Gujarat coast. Why is this method suitable for the place?',
  model: 'Sea water is let into wide, shallow pans. The sun and wind slowly evaporate the water, so the brine gets stronger until the salt separates as a crust, which is raked up, washed and dried. The method is suitable because the coast has plenty of sunshine and wind, so no fuel is needed.',
  sol: 'Sea water in shallow pans; evaporation; crust raked; sun and wind.',
  scheme: [['Sea water let into shallow pans', 0.5], ['Sun and wind evaporate the water, salt crust forms', 1.5], ['Salt raked up, washed and dried; uses sunshine, no fuel', 1]],
  d: 2, c: 'application', t: [4],
}));
add('attar3-short', short({
  marks: 3,
  stem: 'In the traditional attar-making of Kannauj, flowers and water are heated in a copper deg and the vapour passes through a pipe to a bhapka in cool water. Name the separation method and match the two vessels to the parts of a laboratory set-up.',
  model: 'The method is distillation. The copper deg that holds the flowers and water is heated, so it acts as the distillation flask. The bhapka, standing in cool water, receives the vapour and condenses it, so it acts as the condenser and receiver, while the bamboo pipe is the delivery tube.',
  sol: 'Distillation; deg as flask; bhapka as condenser and receiver.',
  scheme: [['Distillation', 1], ['Deg is the heated distillation flask', 1], ['Bhapka in cool water acts as condenser and receiver', 1]],
  d: 3, c: 'application', t: [4],
}));
add('cream3-short', short({
  marks: 3,
  stem: 'Explain how a cream separator separates cream from milk. How is the churning of curd into butter like it, and how is it different?',
  model: 'A cream separator spins the milk very fast, so the denser skim milk is flung outward and the lighter fat-rich cream collects near the axis. Churning curd also whirls the liquid and the lighter fat comes out as butter. It differs because churning mainly makes the fat droplets join together into lumps of butter, while the separator sorts the milk by density.',
  sol: 'Spinning; lighter cream near axis; churning joins droplets.',
  scheme: [['Fast spinning throws denser skim milk outward, cream collects near the axis', 1.5], ['Churning also whirls the mixture and fat floats as butter', 0.5], ['Difference: churning joins the fat droplets', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('distil-long', long({
  stem: '(a) Name the property that simple distillation depends on, and describe the apparatus in order from the flask to the receiver.\n\n(b) Explain why cold water enters the condenser at its lower end.\n\n(c) When is fractional distillation used instead? Give two examples.',
  model: 'Simple distillation depends on a difference in boiling points. The mixture is heated in a flask with a thermometer at the side arm, the vapour passes into a sloping condenser, and the condensed liquid drips into the receiver. In (b), cold water enters at the lower end so that the jacket is always full and the vapour is cooled all along its length, with warm water leaving at the top. In (c), fractional distillation, with a fractionating column, is used when boiling points are close, as for ethanol and water or for the gases of liquefied air.',
  sol: 'Boiling point; flask, side arm, condenser, receiver; cold water at the lower end fills the jacket; fractionating column for close boiling points.',
  scheme: [['(a) Boiling point; flask, thermometer, condenser, receiver in order', 2], ['(b) Cold water enters at the lower end and fills the jacket; warm water leaves at the top', 1.5], ['(c) Close boiling points; two examples', 1.5]],
  d: 3, c: 'understanding', t: [4],
}));
add('chrom-long', long({
  stem: '(a) Describe how you would separate the dyes in a black ink by paper chromatography.\n\n(b) Define Rf. A dye spot moved 3.0 cm while the solvent front moved 7.5 cm. Find its Rf.\n\n(c) How would you decide if the ink contains a known dye?',
  model: 'In (a), a pencil base line is drawn near the bottom of the paper and a spot of the ink is placed on it. The paper is hung in a solvent with the base line above the solvent, and the solvent rises, carrying the dyes at different speeds until they form separate spots. In (b), Rf is the distance moved by the substance divided by the distance moved by the solvent front. Here Rf = 3.0 / 7.5 = 0.40. In (c), spot the known dye beside the ink and compare: the same Rf means the same dye.',
  sol: 'Pencil base line; solvent rises; Rf = 3.0 / 7.5 = 0.40; compare with a known dye run alongside.',
  scheme: [['(a) Pencil base line, spot, paper in solvent, dyes separate', 2], ['(b) Definition and Rf = 3.0 / 7.5 = 0.40', 2], ['(c) Compare with a known dye run alongside; same Rf', 1]],
  d: 3, c: 'application', t: [4],
}), (q) => near(3.0 / 7.5, 0.4, 1e-9) || 'rf-long');
add('choose-long', long({
  stem: 'A science teacher gives three mixtures: (i) iron filings and sand, (ii) camphor and fine sand, (iii) oil floating on water. For each, name a method, the property it uses and one step of the procedure. Then say why simple filtration would fail for (i) and (ii) in this case.',
  model: 'For (i), a magnet separates the iron filings, because iron is magnetic and sand is not; the magnet is moved over the mixture. For (ii), sublimation is used, since camphor turns directly into vapour on heating while sand does not; the vapour is collected as solid on a cool surface above. For (iii), a separating funnel is used, because the two liquids form layers; the lower water layer is run off through the tap. Filtration fails for (i) and (ii) because there is no liquid, and both parts are solids.',
  sol: 'Magnet, sublimation, separating funnel, each with property and step; no liquid for filtration.',
  scheme: [['(i) Magnet, because iron is magnetic', 1.5], ['(ii) Sublimation, because camphor turns to vapour directly', 1.5], ['(iii) Separating funnel, layers run off through the tap', 1.5], ['Filtration needs a liquid; (i) and (ii) are solid mixtures', 0.5]],
  d: 4, c: 'evaluation', t: [4],
}));
add('class-long', long({
  stem: '(a) Distinguish a homogeneous mixture from a heterogeneous mixture, with one example each.\n\n(b) A liquid does not settle, passes through filter paper and shows a bright beam in a dark room. Name its type and the effect you observed.\n\n(c) Name two other differences between this liquid and a true solution.',
  model: 'A homogeneous mixture has uniform composition, as in sugar syrup, while a heterogeneous mixture has visibly different parts, as in muddy water. In (b), the liquid is a colloid, and the bright beam is the Tyndall effect, caused by the particles scattering light. In (c), a colloid has particles of 1 to 1000 nm, which are larger than those of a true solution, and it scatters light, which a true solution does not, and it can be filtered only by very fine membranes like parchment.',
  sol: 'Uniform against visible parts; colloid, Tyndall effect; particle size and light scattering.',
  scheme: [['(a) Definitions with one example each', 2], ['(b) Colloid; Tyndall effect', 1.5], ['(c) Two differences from a solution', 1.5]],
  d: 3, c: 'understanding', t: [1, 2],
}));
add('chrom-case', mk.case({
  passage: r`A student runs a black marker ink and four known dyes on one strip of chromatography paper. The solvent front rises 8.0 cm above the base line. The ink makes three spots, at 1.6 cm, 4.0 cm and 6.4 cm. The known dyes B, Y, G and R rise 1.6 cm, 4.0 cm, 5.2 cm and 6.4 cm respectively.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which known dye is NOT present in the black ink?',
      right: 'G, because no ink spot is at 5.2 cm',
      wrong: ['B, because it is the nearest to the base line', 'Y, because it is in the middle', 'R, because it moved the farthest'],
      sol: 'The ink spots at 1.6, 4.0 and 6.4 cm match B, Y and R. None matches the 5.2 cm of G — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Calculate the Rf of dye Y.',
      model: r`$R_f = 4.0 / 8.0 = 0.50$.`,
      sol: 'Rf = 4.0 / 8.0 = 0.50.',
      scheme: [['0.50', 1]],
      wl: null,
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'The experiment is repeated until the solvent front rises 10.0 cm. At what height above the base line will dye Y be found?',
      model: r`The Rf of Y stays 0.50, so its distance is $0.50 \times 10.0 = 5.0$ cm.`,
      sol: 'Rf unchanged = 0.50; distance = 0.50 × 10.0 = 5.0 cm.',
      scheme: [['Rf stays the same, 0.50', 1], ['Distance = 5.0 cm', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Why is the base line drawn in pencil, and why must it be above the level of the solvent?',
        model: 'Pencil graphite does not dissolve, so it does not move up and interfere with the spots. The base line must be above the solvent, otherwise the spots would dissolve into the solvent in the container and be washed away.',
        sol: 'Graphite does not dissolve; spots would dissolve if the base line were under the solvent.',
        scheme: [['Graphite does not dissolve in the solvent', 1], ['Spots would wash into the solvent if the line were below its level', 1]],
        d: 3, c: 'analysis', t: [4],
      }),
    ]),
  ],
}), null);
add('pan-case', mk.case({
  passage: r`A salt works on the Gujarat coast fills a wide, shallow pan with 2000 kg of sea water. For this question, take the dissolved salts as 3.5 % of the mass of the sea water (an approximate value). The pan is left in the sun for several days, and a crust of salt forms as the water evaporates.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The process that leaves the salt behind in the pan is:',
      right: 'evaporation',
      wrong: ['sublimation', 'centrifugation', 'fractional distillation'],
      sol: 'The water is lost as vapour and the dissolved salts remain — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Give one reason why the pans are wide and shallow.',
      model: 'A wide, shallow pan gives a large surface area, so the water evaporates faster.',
      sol: 'Large surface area speeds evaporation.',
      scheme: [['Large surface area for faster evaporation', 1]],
      wl: null,
      d: 2, c: 'understanding', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the mass of dissolved salts in the 2000 kg of sea water.',
      model: r`Mass of salts $= 3.5/100 \times 2000 = 70$ kg.`,
      sol: 'Mass = 3.5/100 × 2000 = 70 kg.',
      scheme: [['3.5 % of 2000 kg', 1], ['= 70 kg', 1]],
      d: 3, c: 'application', t: [3, 4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Name a laboratory method to get pure water from sea water, and say why it is not used to make salt in the pans.',
        model: 'Distillation gives pure water from sea water. It needs fuel to boil the water and a condenser, which is costly for the huge amounts of salt made, while the sun and wind do the same job in a pan for nothing.',
        sol: 'Distillation; needs fuel and equipment.',
        scheme: [['Distillation', 1], ['Needs fuel and a condenser, so costly at that scale', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), null);
