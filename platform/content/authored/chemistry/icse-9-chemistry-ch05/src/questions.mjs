// ICSE 9 Chemistry ch05 Water of Crystallisation, Efflorescence, Deliquescence and Drying Agents: question bank in ICSE school-examination style.
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { HEAT_LETTERED, HEAT, DRYGAS } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const heatFig = svgV(HEAT_LETTERED, 'A heated test tube with parts lettered A to E');
const gasFig = svgV(DRYGAS, 'A wash bottle of concentrated sulphuric acid and a quicklime drying tower');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const masses = `Fe = ${K.A.Fe}, S = ${K.A.S}, O = ${K.A.O}, H = ${K.A.H}`;

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-hydrate', mcq({
  stem: 'Which of these salts has water of crystallisation?',
  right: 'Sodium sulphate decahydrate', wrong: ['Sodium nitrate', 'Lead chloride', 'Potassium sulphate'],
  sol: 'Only the decahydrate carries ten water molecules in its crystals — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-heat-obs', mcq({
  stem: 'When blue crystals of hydrated copper sulphate are gently heated in a dry test tube, the residue is',
  right: 'a white powder', wrong: ['a black solid', 'a green powder', 'a colourless liquid'],
  sol: 'The blue colour belongs to the hydrate, so the residue is white anhydrous copper sulphate — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-pct-num', num({
  stem: `Atomic masses: Na = ${K.A.Na}, C = ${K.A.C}, O = ${K.A.O}, H = ${K.A.H}. Find the percentage of water of crystallisation in Na₂CO₃·10H₂O, correct to one decimal place.`,
  value: K.P_NA2CO3, tol: 0.05, unit: '%',
  sol: `Mr of the hydrate = ${K.NA2CO3} + ${K.W_NA2CO3} = ${K.NA2CO3_10}; water = ${K.W_NA2CO3} ÷ ${K.NA2CO3_10} × 100 = ${K.P_NA2CO3}%.`,
  scheme: [[`${K.P_NA2CO3}%`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 62.9 || 'value');
add('chk-anhyd-tf', tf({
  stem: 'Crystals of anhydrous potassium chloride contain water of crystallisation.',
  key: 'f',
  sol: 'False. Anhydrous means without water of crystallisation.',
  d: 1, c: 'recall', t: [1],
}));
add('chk-eff', mcq({
  stem: 'Colourless crystals left in an open dish crumble to a white powder with no gain in mass. This change is called',
  right: 'efflorescence', wrong: ['deliquescence', 'dehydration', 'crystallisation'],
  sol: 'Crumbling with loss of water of crystallisation is efflorescence — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('chk-delq', mcq({
  stem: 'A solid left in the open air gains mass and finally forms a solution. This behaviour is called',
  right: 'deliquescence', wrong: ['efflorescence', 'sublimation', 'crystallisation'],
  sol: 'Absorbing moisture until it dissolves in it is deliquescence — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-dry-nh3', mcq({
  stem: 'Which substance is used to dry ammonia gas?',
  right: 'Quicklime', wrong: ['Concentrated sulphuric acid', 'Dilute sulphuric acid', 'Common salt'],
  sol: 'Quicklime is a base and does not react with ammonia — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-dehyd-tf', tf({
  stem: 'Quicklime is a dehydrating agent because it chars sugar.',
  key: 'f',
  sol: 'False. Concentrated sulphuric acid chars sugar; quicklime is a drying agent.',
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t01 hydrates and anhydrous salts
add('vitriol-mcq', mcq({
  stem: 'Green vitriol crystals have the formula',
  right: 'FeSO₄·7H₂O', wrong: ['CuSO₄·5H₂O', 'Na₂CO₃·10H₂O', 'FeSO₄'],
  sol: 'Green vitriol is ferrous sulphate with seven molecules of water of crystallisation — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('mouth-mcq', mcq({
  stem: 'A student heats hydrated crystals in a hard glass test tube. The tube is clamped with its mouth slightly downwards so that',
  right: 'water formed on the cooler wall cannot run back onto the hot glass', wrong: ['the crystals fall out of the tube', 'the gas formed is collected over water', 'the flame cannot touch the tube'],
  sol: 'Water running back could crack the hot glass — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('noheat-mcq', mcq({
  stem: 'A white crystalline salt is heated gently in a dry test tube. No drops of water appear on the cooler part of the tube. The salt is most likely',
  right: 'anhydrous potassium chloride', wrong: ['copper sulphate pentahydrate', 'Glauber\'s salt', 'ferrous sulphate heptahydrate'],
  sol: 'Without water of crystallisation no water is released — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('test-mcq', mcq({
  stem: 'A few drops of water are added to a white powder. The powder turns blue and the tube becomes warm. The white powder was',
  right: 'anhydrous copper sulphate', wrong: ['anhydrous sodium carbonate', 'anhydrous potassium sulphate', 'lead chloride'],
  sol: 'White anhydrous copper sulphate combines with water to form the blue hydrate — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('pct-mcq', mcq({
  stem: `Among CuSO₄·5H₂O (${K.P_CU}% water), FeSO₄·7H₂O (${K.P_FE}% water), Na₂SO₄·10H₂O (${K.P_NA2SO4}% water) and Na₂CO₃·10H₂O (${K.P_NA2CO3}% water), the hydrate with the highest percentage of water is`,
  right: 'Na₂CO₃·10H₂O', wrong: ['CuSO₄·5H₂O', 'FeSO₄·7H₂O', 'Na₂SO₄·10H₂O'],
  sol: 'Compare the four percentages; the highest is for washing soda — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('water-mcq', mcq({
  stem: 'The number of molecules of water of crystallisation in one formula unit of Glauber\'s salt is',
  right: 'ten', wrong: ['five', 'seven', 'two'],
  sol: 'Glauber\'s salt is Na₂SO₄·10H₂O — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ar-hydrate', ar({
  a: 'Crystals of potassium chloride give drops of water when heated in a dry test tube.',
  r: 'Potassium chloride is an anhydrous salt.',
  key: 'b',
  sol: 'The assertion is false because the salt is anhydrous, which is what the reason says — option (b).',
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 efflorescence, deliquescence, hygroscopy
add('wsoda-mcq', mcq({
  stem: 'A jar of washing soda crystals left unstoppered in dry weather has a white powdery crust. The mass of the crystals has',
  right: 'decreased, because water of crystallisation was lost', wrong: ['increased, because water vapour was absorbed', 'stayed the same, because only the colour changed', 'increased, because the crystals dissolved'],
  sol: 'Crumbling means loss of water of crystallisation, so the mass falls — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ferric-mcq', mcq({
  stem: 'Solid ferric chloride left in an open dish for a day turns into a brown liquid. The solid is',
  right: 'deliquescent', wrong: ['efflorescent', 'anhydrous only', 'a drying agent that does not absorb water'],
  sol: 'It takes moisture from the air and dissolves in it — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('conc-acid-mcq', mcq({
  stem: 'Concentrated sulphuric acid left in an open beaker slowly increases in volume because it',
  right: 'absorbs water vapour from the air', wrong: ['loses water to the air', 'reacts with oxygen to form a gas', 'dissolves the glass'],
  sol: 'It is hygroscopic, so it takes in moisture — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('mass-mcq', mcq({
  stem: 'A student leaves four solids in open dishes and weighs them each day. Which dish will lose mass?',
  right: 'Washing soda crystals in dry air', wrong: ['Sodium hydroxide pellets', 'Quicklime lumps', 'Ferric chloride'],
  sol: 'Only the efflorescent hydrate gives up water — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('naoh-mcq', mcq({
  stem: 'Sodium hydroxide pellets left in an open dish become wet and finally form a solution. This is',
  right: 'deliquescence', wrong: ['efflorescence', 'dehydration', 'sublimation'],
  sol: 'The solid dissolves in moisture it absorbed — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('quick-mcq', mcq({
  stem: 'Lumps of quicklime kept in an open jar gain mass without forming a solution. Quicklime is',
  right: 'hygroscopic', wrong: ['deliquescent', 'efflorescent', 'anhydrous only'],
  sol: 'It absorbs water without dissolving — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-eff', ar({
  a: 'Washing soda crystals are efflorescent.',
  r: 'Washing soda crystals lose some of their water of crystallisation to dry air.',
  key: 'c',
  sol: 'Both are true, and the loss of water of crystallisation is the definition of the behaviour — option (c).',
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 drying and dehydrating agents
add('drying-mcq', mcq({
  stem: 'Moist hydrogen chloride gas can be dried by passing it through',
  right: 'concentrated sulphuric acid', wrong: ['quicklime', 'dilute hydrochloric acid', 'water'],
  sol: 'Concentrated sulphuric acid absorbs the water without reacting with the gas, while quicklime would react with the acidic gas — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('sugar-mcq', mcq({
  stem: 'When a few drops of concentrated sulphuric acid fall on sugar, the sugar turns black. This shows the acid acting as',
  right: 'a dehydrating agent', wrong: ['a drying agent only', 'an oxidising gas', 'a deliquescent solid'],
  sol: 'It removes hydrogen and oxygen as water from the sugar — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('distinct-mcq', mcq({
  stem: 'A drying agent differs from a dehydrating agent in that a drying agent',
  right: 'removes moisture without changing the substance dried', wrong: ['always chars organic compounds', 'removes combined water from compounds', 'is always a liquid'],
  sol: 'A drying agent only takes up moisture — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('tower-mcq', mcq({
  stem: 'Concentrated sulphuric acid cannot be used to dry ammonia because it',
  right: 'reacts with ammonia to form a salt', wrong: ['does not absorb water', 'is not hygroscopic', 'turns ammonia into hydrogen'],
  sol: 'Ammonia is a base and forms ammonium sulphate with the acid — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('cuso4-dehyd-mcq', mcq({
  stem: 'Blue copper sulphate crystals are placed in concentrated sulphuric acid and turn white. This shows that the acid',
  right: 'removed the water of crystallisation', wrong: ['added water to the crystals', 'reduced the copper', 'dissolved all the crystals'],
  sol: 'Loss of combined water changes the blue hydrate to the white anhydrous salt — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('ar-quick', ar({
  a: 'Quicklime is used to dry ammonia gas.',
  r: 'Quicklime reacts with ammonia to form a salt.',
  key: 'a',
  sol: 'The assertion is true, but the reason is false: quicklime does not react with ammonia, which is why it is suitable — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-acid', ar({
  a: 'Concentrated sulphuric acid chars sugar.',
  r: 'Concentrated sulphuric acid absorbs water vapour from moist air.',
  key: 'd',
  sol: 'Both are true, but absorbing vapour from air is not why sugar is charred, which is removal of combined water — option (d).',
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- one-mark items
add('term-woc', term({
  stem: 'Name the term for the fixed number of water molecules chemically combined with each formula unit of a salt in its crystals.',
  model: '**Water of crystallisation.**', sol: 'Water of crystallisation.', sch: 'Water of crystallisation',
  d: 1, c: 'recall', t: [1],
}));
add('formula-gv', term({
  stem: 'Write the formula of sodium sulphate decahydrate.',
  model: '**$\\ce{Na2SO4.10H2O}$**', sol: 'Na₂SO₄·10H₂O', sch: 'Na₂SO₄·10H₂O',
  d: 1, c: 'recall', t: [1],
}));
add('eq-ws', term({
  stem: 'Write a balanced equation for the action of heat on washing soda crystals.',
  model: r`$\ce{Na2CO3.10H2O ->[\Delta] Na2CO3 + 10H2O}$`, sol: r`Na₂CO₃·10H₂O gives Na₂CO₃ and ten H₂O on heating.`, sch: 'Balanced equation',
  d: 2, c: 'application', t: [1],
}));
add('obs-water', term({
  stem: 'State one observation when a few drops of water are added to white anhydrous copper sulphate.',
  model: 'The white powder **turns blue** (and the tube becomes warm).', sol: 'White to blue.', sch: 'Turns blue',
  d: 1, c: 'recall', t: [1],
}));
add('odd-hyd', term({
  stem: 'Choose the odd one out and name the category to which the other three belong: CuSO₄·5H₂O, K₂SO₄, FeSO₄·7H₂O, Na₂CO₃·10H₂O.',
  model: '**K₂SO₄** is the odd one out; the other three are **hydrated salts** (with water of crystallisation).', sol: 'Potassium sulphate; the rest are hydrates.', sch: 'Odd one and category',
  d: 2, c: 'analysis', t: [1],
}));
add('reason-closed', term({
  stem: 'Give a reason: a bottle of anhydrous calcium chloride is kept tightly stoppered.',
  model: 'It **absorbs moisture from the air**, and it can become a solution.', sol: 'It takes in moisture.', sch: 'Absorbs moisture from air',
  d: 2, c: 'understanding', t: [2],
}));
add('term-sugar', term({
  stem: 'Name the substance used in the laboratory that chars sugar by removing the elements of water.',
  model: '**Concentrated sulphuric acid.**', sol: 'Concentrated sulphuric acid.', sch: 'Concentrated sulphuric acid',
  d: 1, c: 'recall', t: [3],
}));
add('eq-quick', term({
  stem: 'Write a balanced equation for the reaction of quicklime with water.',
  model: r`$\ce{CaO + H2O -> Ca(OH)2}$`, sol: r`CaO and H₂O give Ca(OH)₂.`, sch: 'Balanced equation',
  d: 2, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- true-false
add('tf-hygro', tf({
  stem: 'Every hygroscopic substance dissolves in the water that it absorbs from the air.',
  key: 'f',
  sol: 'False. Quicklime stays a solid as it takes in moisture, so a hygroscopic substance need not form a solution.',
  d: 3, c: 'analysis', t: [2],
}));
add('tf-ws', tf({
  stem: 'Washing soda crystals gain mass when they effloresce.',
  key: 'f',
  sol: 'False. They lose water of crystallisation, so their mass falls.',
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- numericals
add('num-cu', num({
  stem: `Find the percentage of water of crystallisation in CuSO₄·5H₂O, correct to one decimal place. (Cu = ${K.A.Cu}, S = ${K.A.S}, O = ${K.A.O}, H = ${K.A.H})`,
  value: K.P_CU, tol: 0.05, unit: '%',
  sol: `Mr of the hydrate = ${K.CUSO4} + ${K.W_CU} = ${K.CUSO4_5}; ${K.W_CU} ÷ ${K.CUSO4_5} × 100 = ${K.P_CU}%.`,
  scheme: [[`${K.P_CU}%`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 36.1 || 'value');
add('num-glauber', num({
  stem: `Find the percentage of water of crystallisation in Na₂SO₄·10H₂O, correct to one decimal place. (Na = ${K.A.Na}, S = ${K.A.S}, O = ${K.A.O}, H = ${K.A.H})`,
  value: K.P_NA2SO4, tol: 0.05, unit: '%',
  sol: `Mr of the hydrate = ${K.NA2SO4} + ${K.W_NA2SO4} = ${K.NA2SO4_10}; ${K.W_NA2SO4} ÷ ${K.NA2SO4_10} × 100 = ${K.P_NA2SO4}%.`,
  scheme: [[`${K.P_NA2SO4}%`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 55.9 || 'value');
add('num-fe-res', num({
  stem: `${K.FE_MASS} g of FeSO₄·7H₂O is heated until all the water of crystallisation is lost. Find the mass of anhydrous FeSO₄ left. (${masses})`,
  value: K.FE_ANH, tol: 0.005, unit: 'g',
  sol: `${K.FE_MASS} × ${K.FESO4} ÷ ${K.FESO4_7} = ${K.FE_ANH} g.`,
  scheme: [[`${K.FE_ANH} g`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 3.04 || 'value');
add('num-glauber-res', num({
  stem: `${K.NS_MASS} g of Na₂SO₄·10H₂O crystals are heated until they lose all their water of crystallisation. Find the mass of anhydrous Na₂SO₄ left. (Na = ${K.A.Na}, S = ${K.A.S}, O = ${K.A.O}, H = ${K.A.H})`,
  value: K.NS_ANH, tol: 0.05, unit: 'g',
  sol: `${K.NS_MASS} × ${K.NA2SO4} ÷ ${K.NA2SO4_10} = ${K.NS_ANH} g.`,
  scheme: [[`${K.NS_ANH} g`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 7.1 || 'value');
add('num-cu-loss', num({
  stem: `${K.CU_MASS} g of blue CuSO₄·5H₂O crystals are heated until white. Find the mass of water lost. (Cu = ${K.A.Cu}, S = ${K.A.S}, O = ${K.A.O}, H = ${K.A.H})`,
  value: K.CU_LOSS, tol: 0.005, unit: 'g',
  sol: `${K.CU_MASS} × ${K.W_CU} ÷ ${K.CUSO4_5} = ${K.CU_LOSS} g.`,
  scheme: [[`${K.CU_LOSS} g`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 1.8 || 'value');
add('num-fe-need', num({
  stem: `What mass of FeSO₄·7H₂O crystals must be heated to obtain ${K.FE_NEED_ANH} g of anhydrous FeSO₄? (${masses})`,
  value: K.FE_NEED, tol: 0.05, unit: 'g',
  sol: `${K.FE_NEED_ANH} × ${K.FESO4_7} ÷ ${K.FESO4} = ${K.FE_NEED} g.`,
  scheme: [[`${K.FE_NEED} g`, 1]],
  d: 4, c: 'analysis', t: [1],
}), (q) => q.answer.value === 13.9 || 'value');
add('num-ws-water', num({
  stem: `How many grams of water of crystallisation are present in ${K.WS_MASS} g of washing soda crystals, Na₂CO₃·10H₂O? (Na = ${K.A.Na}, C = ${K.A.C}, O = ${K.A.O}, H = ${K.A.H})`,
  value: K.WS_WATER, tol: 0.05, unit: 'g',
  sol: `${K.WS_MASS} × ${K.W_NA2CO3} ÷ ${K.NA2CO3_10} = ${K.WS_WATER} g.`,
  scheme: [[`${K.WS_WATER} g`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => q.answer.value === 9 || 'value');
add('num-dq', num({
  stem: `A watch glass holds ${K.DQ_START} g of a solid. After a day in damp air the solid has become a liquid and the contents weigh ${K.DQ_END} g. Find the percentage increase in mass.`,
  value: K.DQ_PCT, unit: '%',
  sol: `Gain = ${K.DQ_END} − ${K.DQ_START} = ${K.DQ_GAIN} g; ${K.DQ_GAIN} ÷ ${K.DQ_START} × 100 = ${K.DQ_PCT}%.`,
  scheme: [[`${K.DQ_PCT}%`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 60 || 'value');

// ---------------------------------------------------------------- fill and match
add('fill-5', fill({
  marks: 5,
  stem: 'Complete the paragraph with suitable terms. The salt CuSO₄·5H₂O is called a (1) ____ salt, while KCl, which has no water of crystallisation, is (2) ____. Crystals of washing soda that crumble in dry air show (3) ____. A solid such as ferric chloride that absorbs moisture until it dissolves is (4) ____. A substance such as quicklime that takes in moisture from the air is described as (5) ____.',
  acc: [['hydrated'], ['anhydrous'], ['efflorescence'], ['deliquescent'], ['hygroscopic']],
  sol: 'Hydrated; anhydrous; efflorescence; deliquescent; hygroscopic.',
  d: 2, c: 'understanding', t: [1, 2, 3],
}));
add('behaviour-match5', match({
  marks: 5,
  stem: 'Match each substance with the change or use that describes it.',
  pairs: [
    ['Washing soda crystals in dry air', 'Crumble to a powder'],
    ['Ferric chloride in damp air', 'Absorbs moisture and forms a solution'],
    ['Quicklime', 'Dries ammonia gas'],
    ['Anhydrous copper sulphate', 'Turns blue on adding water'],
    ['Concentrated sulphuric acid with sugar', 'Black carbon forms'],
  ],
  order: [3, 0, 4, 2, 1],
  sol: 'Washing soda crumbles; ferric chloride forms solution; quicklime dries ammonia; copper sulphate turns blue; acid blackens sugar.',
  d: 2, c: 'application', t: [2, 3],
}));
add('apparatus-match5', match({
  marks: 5,
  stem: 'Study the diagram of the apparatus used to heat hydrated crystals and match each lettered part with its description.',
  pairs: [
    ['A', 'Solid that loses its water on heating'],
    ['B', 'Container made of glass that does not crack easily on heating'],
    ['C', 'Holds the tube firmly in position'],
    ['D', 'Gives out the heat needed'],
    ['E', 'Liquid that collects on the cooler part of the tube'],
  ],
  order: [1, 3, 0, 4, 2],
  sol: 'A crystals; B hard glass test tube; C clamp; D flame; E water drops.',
  d: 2, c: 'application', t: [1],
  assets: [heatFig],
}));

// ---------------------------------------------------------------- 2-mark short answers
add('s2-eff-delq', short({
  marks: 2,
  stem: 'Distinguish between efflorescence and deliquescence, giving one example of each.',
  model: '**Efflorescence:** a hydrate **loses** water of crystallisation to dry air and crumbles to powder (washing soda). **Deliquescence:** a solid **absorbs moisture** from the air and **dissolves** in it (ferric chloride).',
  sol: 'Loses water, powder; absorbs water, solution; with examples.',
  scheme: [['Efflorescence with example', 1], ['Deliquescence with example', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s2-dry-dehyd', short({
  marks: 2,
  stem: 'Distinguish between a drying agent and a dehydrating agent, giving one example of each.',
  model: 'A **drying agent** removes moisture **without reacting** with the substance dried (**quicklime** for ammonia). A **dehydrating agent** removes **combined water** or the elements of water from a compound (**concentrated sulphuric acid** with sugar).',
  sol: 'Moisture only; combined water; examples.',
  scheme: [['Drying agent with example', 1], ['Dehydrating agent with example', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s2-heat', short({
  marks: 2, wl: null,
  stem: 'Pale green crystals of ferrous sulphate are heated gently in a dry test tube. State the observation and write the balanced equation.',
  model: r`The crystals **crumble to a whitish powder** and **drops of water** collect on the cooler part. $\ce{FeSO4.7H2O ->[\Delta] FeSO4 + 7H2O}$`,
  sol: 'Whitish powder with drops of water; equation.',
  scheme: [['Observation', 1], ['Balanced equation', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s2-tilt', short({
  marks: 2,
  stem: 'Why is a hard glass test tube used, and why is its mouth kept slightly lower than its closed end, when hydrated crystals are heated?',
  model: '**Hard glass** withstands the heat without cracking. The mouth is tilted down so that the **water that condenses** on the cooler part **does not run back** onto the hot glass.',
  sol: 'Withstands heat; no water running back.',
  scheme: [['Reason for hard glass', 1], ['Reason for the tilt', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s2-hygro', short({
  marks: 2,
  stem: 'Why must bottles of anhydrous calcium chloride and of sodium hydroxide pellets be kept tightly stoppered? Name the property.',
  model: 'Both **absorb moisture from the air** and can **dissolve in it**, which makes them deliquescent; a stopper keeps the moisture out.',
  sol: 'They absorb moisture; deliquescence.',
  scheme: [['They absorb moisture from the air', 1], ['Named as deliquescent', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s2-ammonia', short({
  marks: 2, wl: null,
  stem: 'Name the drying agent used for ammonia and give the reason why concentrated sulphuric acid is not used.',
  model: r`**Quicklime** is used. Concentrated sulphuric acid **reacts with ammonia** to form ammonium sulphate: $\ce{2NH3 + H2SO4 -> (NH4)2SO4}$.`,
  sol: 'Quicklime; the acid reacts with ammonia.',
  scheme: [['Quicklime named', 1], ['Reason with the reaction', 1]],
  d: 2, c: 'application', t: [3],
}));
add('s2-eq-ws', short({
  marks: 2, wl: null,
  stem: 'Washing soda crystals are left open in dry air and slowly lose nine of their ten molecules of water of crystallisation. Write the equation and state what you will see.',
  model: r`$\ce{Na2CO3.10H2O -> Na2CO3.H2O + 9H2O}$ The colourless crystals **crumble to a white powder**.`,
  sol: 'Equation; crumbling to powder.',
  scheme: [['Balanced equation', 1], ['Crumble to powder', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- 3-mark short answers
add('s3-compare', short({
  marks: 3, wl: null,
  stem: 'Tabulate three differences between efflorescent and deliquescent substances.',
  model: '| Efflorescent | Deliquescent |\n|---|---|\n| **Loses** water of crystallisation | **Absorbs** moisture from the air |\n| Crystals **crumble to powder** | Solid **dissolves** to form a solution |\n| Mass **decreases** | Mass **increases** |\n| Example: washing soda | Example: ferric chloride |',
  sol: 'Water lost or gained; powder or solution; mass.',
  scheme: [['First difference', 1], ['Second difference', 1], ['Third difference', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s3-hyd-names', short({
  marks: 3, wl: null,
  stem: 'Write the formulae of (i) copper sulphate pentahydrate, (ii) ferrous sulphate heptahydrate and (iii) sodium carbonate decahydrate.',
  model: r`(i) $\ce{CuSO4.5H2O}$ (ii) $\ce{FeSO4.7H2O}$ (iii) $\ce{Na2CO3.10H2O}$`,
  sol: 'Three hydrate formulae.',
  scheme: [['CuSO₄·5H₂O', 1], ['FeSO₄·7H₂O', 1], ['Na₂CO₃·10H₂O', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('s3-pct', short({
  marks: 3, wl: null,
  stem: `Calculate the percentage of water of crystallisation in Na₂SO₄·10H₂O. (Na = ${K.A.Na}, S = ${K.A.S}, O = ${K.A.O}, H = ${K.A.H})`,
  model: `Mr of Na₂SO₄ = 2 × ${K.A.Na} + ${K.A.S} + 4 × ${K.A.O} = **${K.NA2SO4}**; water = 10 × ${K.H2O} = **${K.W_NA2SO4}**; hydrate = **${K.NA2SO4_10}**. Percentage = ${K.W_NA2SO4} ÷ ${K.NA2SO4_10} × 100 = **${K.P_NA2SO4}%**.`,
  sol: `${K.NA2SO4}; ${K.W_NA2SO4}; ${K.NA2SO4_10}; ${K.P_NA2SO4}%.`,
  scheme: [['Mr of the anhydrous salt and of the water', 1], ['Mr of the hydrate', 1], [`${K.P_NA2SO4}%`, 1]],
  d: 3, c: 'application', t: [1],
}), (q) => K.P_NA2SO4 === 55.9 || 'pct');
add('s3-dehyd', short({
  marks: 3, wl: null,
  stem: 'Describe two actions of concentrated sulphuric acid that show it is a dehydrating agent, giving the observation in each case.',
  model: r`(1) On **blue copper sulphate crystals** it removes the water of crystallisation, so they turn **white**. (2) On **sugar** it removes hydrogen and oxygen as water, leaving **black carbon**: $\ce{C12H22O11 ->[\text{conc. H2SO4}] 12C + 11H2O}$.`,
  sol: 'Blue to white; sugar to carbon.',
  scheme: [['Copper sulphate crystals turn white', 1], ['Sugar turns black', 1], ['Reason: removes combined water', 1]],
  d: 3, c: 'application', t: [3],
}));
add('s3-testwater', short({
  marks: 3,
  stem: 'Describe how white anhydrous copper sulphate is used to test for the presence of water, and how the white form can be recovered.',
  model: 'Add the liquid to the **white powder**: if water is present it **turns blue** (and may become warm). Heating the blue solid **drives off the water** and the **white powder returns**.',
  sol: 'White to blue; heat restores white.',
  scheme: [['Adds liquid to the white powder', 1], ['Turns blue if water is present', 1], ['Heating restores the white powder', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s3-gas', short({
  marks: 3, wl: [14, 70],
  stem: 'Name a suitable drying agent for each of (i) hydrogen, (ii) chlorine and (iii) ammonia, and give a reason for the choice of (iii).',
  model: '(i) **Concentrated sulphuric acid.** (ii) **Concentrated sulphuric acid.** (iii) **Quicklime**, because the acid would **react with ammonia**.',
  sol: 'Conc. acid, conc. acid; quicklime because the acid reacts with ammonia.',
  scheme: [['Hydrogen and chlorine: concentrated sulphuric acid', 1], ['Ammonia: quicklime', 1], ['Reason for ammonia', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('fe-long', long({
  marks: 10, wl: null,
  stem: `A student heats ${K.FE_MASS} g of pale green crystals of FeSO₄·7H₂O in a dry hard glass test tube until the mass stops changing. (${masses})\n\n(a) State two observations during the heating. [2]\n\n(b) Write a balanced equation for the change. [2]\n\n(c) Calculate the mass of anhydrous FeSO₄ left and the mass of water lost. [3]\n\n(d) Draw a neat, labelled diagram of the apparatus used, labelling four parts. [3]`,
  model: `**(a)** The crystals **crumble to a whitish powder**, and **drops of water** collect on the cooler part of the tube.\n\n**(b)** $\\ce{FeSO4.7H2O ->[\\Delta] FeSO4 + 7H2O}$\n\n**(c)** Mr of the hydrate = ${K.FESO4} + ${K.W_FE} = ${K.FESO4_7}. Residue = ${K.FE_MASS} × ${K.FESO4} ÷ ${K.FESO4_7} = **${K.FE_ANH} g**; water lost = ${K.FE_MASS} − ${K.FE_ANH} = **${K.FE_LOSS} g**.\n\n**(d)** A **hard glass test tube** clamped with its **mouth slightly downwards**, **crystals** at the closed end, a **burner flame** below and **drops of water** near the mouth; four labels.`,
  sol: `Whitish powder and water drops; equation; ${K.FE_ANH} g and ${K.FE_LOSS} g; labelled apparatus.`,
  scheme: [['Powder observation', 1], ['Drops of water', 1], ['Correct formulae', 1], ['Balanced with seven waters', 1], ['Working for the residue', 1], [`${K.FE_ANH} g`, 1], [`${K.FE_LOSS} g`, 1], ['Tube drawn with tilt', 2], ['Four labels', 1]],
  d: 3, c: 'application', t: [1],
}), (q) => K.FE_LOSS === 2.52 || 'loss');
add('heatfig-long', long({
  marks: 10, wl: null,
  stem: 'Study the diagram of an experiment in which blue crystals of copper sulphate are heated. Parts are lettered A to E.\n\n(a) Name the parts A, B and C. [3]\n\n(b) Name the substance E and state why it collects near the mouth of the tube. [2]\n\n(c) State the colour change in A on heating, and write a balanced equation for the change. [3]\n\n(d) How would you show that the product E is water? [2]',
  model: '**(a)** A: **hydrated copper sulphate crystals**; B: **hard glass test tube**; C: **clamp**.\n\n**(b)** E is **water**. It forms as steam and **condenses on the cooler part** of the tube.\n\n**(c)** **Blue to white.** $\\ce{CuSO4.5H2O ->[\\Delta] CuSO4 + 5H2O}$\n\n**(d)** Add the liquid to **white anhydrous copper sulphate**; it **turns blue**.',
  sol: 'Crystals, tube, clamp; water condensing; blue to white and equation; blue colour with anhydrous copper sulphate.',
  scheme: [['A crystals', 1], ['B test tube', 1], ['C clamp', 1], ['E water', 1], ['Condenses on the cooler wall', 1], ['Blue to white', 1], ['Correct formulae', 1], ['Balanced', 1], ['Anhydrous copper sulphate used', 1], ['Turns blue', 1]],
  d: 3, c: 'application', t: [1],
  assets: [heatFig],
}));
add('wsoda-long', long({
  marks: 10, wl: null,
  stem: `A jar holds ${K.EF_MASS} g of colourless washing soda crystals, Na₂CO₃·10H₂O. It is left unstoppered in dry weather until the crystals have changed completely to white powder, Na₂CO₃·H₂O. (Na = ${K.A.Na}, C = ${K.A.C}, O = ${K.A.O}, H = ${K.A.H})\n\n(a) Name this behaviour. [1]\n\n(b) Write a balanced equation for the change. [2]\n\n(c) Calculate the mass of powder left. [3]\n\n(d) Calculate the percentage of the original mass that is lost. [2]\n\n(e) Name one substance that is deliquescent and state how its mass would change in damp air. [2]`,
  model: `**(a)** **Efflorescence.**\n\n**(b)** $\\ce{Na2CO3.10H2O -> Na2CO3.H2O + 9H2O}$\n\n**(c)** Mr of crystals = ${K.NA2CO3_10}; powder = ${K.NA2CO3_1}. Mass left = ${K.EF_MASS} × ${K.NA2CO3_1} ÷ ${K.NA2CO3_10} = **${K.EF_LEFT} g**.\n\n**(d)** Lost = ${K.EF_MASS} − ${K.EF_LEFT} = ${K.EF_LOST} g; ${K.EF_LOST} ÷ ${K.EF_MASS} × 100 = **${K.EF_PCT}%**.\n\n**(e)** **Ferric chloride** (or sodium hydroxide); its mass **increases** as it absorbs moisture and dissolves.`,
  sol: `Efflorescence; equation; ${K.EF_LEFT} g; ${K.EF_PCT}%; ferric chloride gains mass.`,
  scheme: [['Efflorescence', 1], ['Correct formulae', 1], ['Balanced with nine waters', 1], ['Mr values', 1], ['Working for the powder', 1], [`${K.EF_LEFT} g`, 1], ['Mass lost found', 1], [`${K.EF_PCT}%`, 1], ['Deliquescent substance named', 1], ['Mass increases', 1]],
  d: 4, c: 'analysis', t: [2],
}), (q) => K.EF_PCT === 56.6 || 'pct');
add('dishes-long', long({
  marks: 10, wl: null,
  stem: `Three substances are left in the open air. Dish X holds washing soda crystals, dish Y holds ${K.DQ_START} g of solid ferric chloride and beaker Z holds ${K.ACID_START} g of concentrated sulphuric acid.\n\n(a) Name the behaviour of X, Y and Z. [3]\n\n(b) Which one loses mass? [1]\n\n(c) The ferric chloride becomes a liquid weighing ${K.DQ_END} g. Calculate the mass of water absorbed and the percentage increase in mass. [2]\n\n(d) The acid is weighed again and weighs ${K.ACID_END} g. Calculate the percentage gain in its mass. [2]\n\n(e) Explain why a bottle of concentrated sulphuric acid should be kept closed. [2]`,
  model: `**(a)** X: **efflorescent**; Y: **deliquescent**; Z: **hygroscopic**.\n\n**(b)** **X**.\n\n**(c)** Water absorbed = ${K.DQ_END} − ${K.DQ_START} = **${K.DQ_GAIN} g**; increase = ${K.DQ_GAIN} ÷ ${K.DQ_START} × 100 = **${K.DQ_PCT}%**.\n\n**(d)** Gain = ${K.ACID_END} − ${K.ACID_START} = ${K.ACID_GAIN} g; ${K.ACID_GAIN} ÷ ${K.ACID_START} × 100 = **${K.ACID_PCT}%**.\n\n**(e)** The acid **absorbs water vapour from the air** and becomes **dilute**, so it loses its drying and dehydrating power.`,
  sol: `Efflorescent, deliquescent, hygroscopic; X; ${K.DQ_GAIN} g and ${K.DQ_PCT}%; ${K.ACID_PCT}%; the acid absorbs vapour.`,
  scheme: [['X efflorescent', 1], ['Y deliquescent', 1], ['Z hygroscopic', 1], ['X loses mass', 1], [`${K.DQ_GAIN} g`, 1], [`${K.DQ_PCT}%`, 1], [`${K.ACID_GAIN} g gained`, 1], [`${K.ACID_PCT}%`, 1], ['Absorbs water vapour', 1], ['Becomes dilute and less effective', 1]],
  d: 3, c: 'application', t: [2],
}), (q) => K.ACID_PCT === 9 || 'pct');
add('gas-long', long({
  marks: 10, wl: null,
  stem: 'A student has to dry moist hydrogen and moist ammonia.\n\n(a) Name a drying agent for each gas. [2]\n\n(b) Explain why concentrated sulphuric acid is unsuitable for ammonia and write the equation for the reaction. [3]\n\n(c) Draw a neat, labelled diagram of the arrangement used to dry hydrogen with concentrated sulphuric acid, labelling the inlet, the outlet and the acid. [3]\n\n(d) Name the agent that also removes combined water from copper sulphate crystals and state one observation. [2]',
  model: '**(a)** Hydrogen: **concentrated sulphuric acid**. Ammonia: **quicklime**.\n\n**(b)** Ammonia is a **base**, so it **reacts with the acid** to form a salt: $\\ce{2NH3 + H2SO4 -> (NH4)2SO4}$.\n\n**(c)** A **wash bottle** containing **concentrated sulphuric acid**; a **long inlet tube** dipping into the acid (gas bubbles through) and a **short outlet tube** above the acid; labels for inlet, outlet and acid.\n\n**(d)** **Concentrated sulphuric acid**; the **blue crystals turn white**.',
  sol: 'Conc. acid and quicklime; acid reacts with ammonia, equation; labelled wash bottle; conc. acid, blue to white.',
  scheme: [['Hydrogen: concentrated sulphuric acid', 1], ['Ammonia: quicklime', 1], ['Ammonia is a base and reacts', 1], ['Correct formulae', 1], ['Balanced equation', 1], ['Wash bottle with long inlet and short outlet', 1], ['Acid shown', 1], ['Labels', 1], ['Concentrated sulphuric acid', 1], ['Blue to white', 1]],
  d: 3, c: 'application', t: [3],
  assets: [gasFig],
}), (q) => true);
add('sugar-long', long({
  marks: 10, wl: null,
  stem: 'A few drops of concentrated sulphuric acid are added to a spoonful of sugar in a beaker, and a second dry beaker contains lumps of quicklime.\n\n(a) State two observations in the beaker with sugar. [2]\n\n(b) Write the equation for the change that takes place in sugar. [2]\n\n(c) Name the property of the acid that is shown. [1]\n\n(d) State the observation when blue copper sulphate crystals are placed in the acid. [2]\n\n(e) Explain why quicklime is a drying agent but not a dehydrating agent. [3]',
  model: '**(a)** The sugar **turns black** (and a hot, steaming mass swells).\n\n**(b)** $\\ce{C12H22O11 ->[\\text{conc. H2SO4}] 12C + 11H2O}$\n\n**(c)** **Dehydrating** action (removal of the elements of water).\n\n**(d)** The **blue crystals turn white**.\n\n**(e)** Quicklime only **absorbs moisture** from gases or liquids without reacting with them; it **does not remove combined water** or the elements of water from compounds like sugar.',
  sol: 'Sugar black; equation; dehydrating; blue to white; quicklime only absorbs moisture.',
  scheme: [['Turns black', 1], ['A second valid observation', 1], ['Correct formulae', 1], ['Balanced', 1], ['Dehydrating', 1], ['Blue crystals', 1], ['Turn white', 1], ['Quicklime absorbs moisture only', 1], ['No removal of combined water', 1], ['Contrast made', 1]],
  d: 3, c: 'analysis', t: [3],
}), (q) => true);
add('pct-long', long({
  marks: 10, wl: null,
  stem: `A student heats ${K.NS_MASS} g of Glauber's salt, Na₂SO₄·10H₂O, until the mass is constant. (Na = ${K.A.Na}, S = ${K.A.S}, O = ${K.A.O}, H = ${K.A.H})\n\n(a) Calculate the relative molecular mass of the hydrate. [2]\n\n(b) Calculate the percentage of water of crystallisation. [2]\n\n(c) Calculate the mass of anhydrous sodium sulphate left. [3]\n\n(d) Write the balanced equation for the heating. [1]\n\n(e) State one observation in the test tube during the heating. [2]`,
  model: `**(a)** Na₂SO₄ = ${K.NA2SO4}; 10H₂O = ${K.W_NA2SO4}; hydrate = **${K.NA2SO4_10}**.\n\n**(b)** ${K.W_NA2SO4} ÷ ${K.NA2SO4_10} × 100 = **${K.P_NA2SO4}%**.\n\n**(c)** Residue = ${K.NS_MASS} × ${K.NA2SO4} ÷ ${K.NA2SO4_10} = **${K.NS_ANH} g**.\n\n**(d)** $\\ce{Na2SO4.10H2O ->[\\Delta] Na2SO4 + 10H2O}$\n\n**(e)** The **colourless crystals crumble to a white powder** and **drops of water** collect on the cooler part of the tube.`,
  sol: `${K.NA2SO4_10}; ${K.P_NA2SO4}%; ${K.NS_ANH} g; equation; powder and drops of water.`,
  scheme: [['Mr of the anhydrous salt', 1], [`${K.NA2SO4_10}`, 1], ['Working for the percentage', 1], [`${K.P_NA2SO4}%`, 1], ['Working for the residue', 1], [`${K.NS_ANH} g`, 2], ['Balanced equation', 1], ['Powder', 1], ['Water drops', 1]],
  d: 3, c: 'application', t: [1],
}), (q) => K.NS_ANH === 7.1 || 'res');
