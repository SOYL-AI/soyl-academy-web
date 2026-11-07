// ICSE 9 Physics ch06 Upthrust and Archimedes' Principle: question bank in ICSE school-examination style (short stems,
// "state", "define", numericals with formula, substitution and unit, 10-mark structured questions in parts). Numbers come
// from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains,
// d = both true and R does not explain.
import { mk, add, svgV, r, near, sig } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { SPRING_WATER_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const springFig = svgV(SPRING_WATER_LETTERED, 'The same body on a spring balance in air and in water, with parts lettered A to E on the right and the scales left to be read');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-lighter', mcq({
  stem: 'A body hangs from a spring balance. When it is lowered fully into water, the reading of the balance falls because',
  right: 'the water exerts an upward force (upthrust) on the body', wrong: ['the weight of the body decreases', 'the mass of the body decreases', 'the water pulls the spring upwards'],
  sol: 'The upthrust acts against the weight, so the apparent weight is smaller, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-calc', mcq({
  stem: 'A body of volume 250 cm³ is fully immersed in water. The upthrust on it is (density of water 1000 kg m⁻³; g = 10 m s⁻²)',
  right: `${K.D1_CALC} N`, wrong: ['250 N', '25 N', '0.25 N'],
  sol: r`$U = V \rho g = 250 \times 10^{-6} \times 1000 \times 10 = ${K.D1_CALC}$ N, option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => K.D1_CALC === 2.5 || 'U');
add('chk-rd', mcq({
  stem: 'A solid weighs 6 N in air and 4 N in water. Its relative density is',
  right: `${K.CHK_RD}`, wrong: ['1.5', '2', '10'],
  sol: r`$\text{RD} = \dfrac{6}{6 - 4} = ${K.CHK_RD}$, option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => K.CHK_RD === 3 || 'RD');
add('chk-sink', mcq({
  stem: 'A steel bolt of density 7800 kg m⁻³ is placed in water. It',
  right: 'sinks, because its density is greater than that of water', wrong: ['floats, because steel is a metal', 'floats fully immersed, because the upthrust equals its weight', 'rises to the surface, because water pushes up on it'],
  sol: 'A body denser than the liquid has a weight greater than the upthrust, so it sinks, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('chk-fraction', mcq({
  stem: 'A block of density 800 kg m⁻³ floats in water of density 1000 kg m⁻³. The percentage of its volume below the surface is',
  right: `${K.CHK_FRAC}%`, wrong: ['20%', '100%', '125%'],
  sol: r`$\dfrac{V_{\text{in}}}{V} = \dfrac{800}{1000} = 0.8$, that is ${K.CHK_FRAC}%, option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => K.CHK_FRAC === 80 || 'frac');
add('chk-sub', mcq({
  stem: 'A submarine makes itself dive by',
  right: 'filling its ballast tanks with water', wrong: ['filling its ballast tanks with air', 'increasing its volume', 'reducing its weight'],
  sol: 'Water in the ballast tanks increases the weight and average density, so it sinks, option (@K).',
  d: 1, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t01 buoyancy and upthrust
add('up-mcq1', mcq({
  stem: 'The upthrust on a body immersed in a liquid acts',
  right: 'vertically upwards', wrong: ['vertically downwards', 'horizontally', 'along the surface of the liquid'],
  sol: 'The liquid pushes up on the body, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('up-mcq2', mcq({
  stem: 'The upthrust on a body fully immersed in a liquid does NOT depend on',
  right: 'the density of the material of the body', wrong: ['the volume of the body', 'the density of the liquid', 'the acceleration due to gravity'],
  sol: 'Upthrust = V ρ g, with ρ the density of the liquid, so the material of the body does not matter, option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('up-mcq3', mcq({
  stem: 'A block is lowered slowly into a liquid until it is fully immersed, and then lowered further. The upthrust on it',
  right: 'increases until the block is fully immersed and then stays constant', wrong: ['decreases steadily as it goes deeper', 'stays constant all the time', 'increases all the way down'],
  sol: 'The upthrust grows with the volume immersed; after that the volume displaced no longer changes, option (@K).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('up-mcq4', mcq({
  stem: 'A ball of iron and a ball of aluminium have the same volume and are fully immersed in water. The upthrust on the iron ball is',
  right: 'equal to that on the aluminium ball', wrong: ['greater, because iron is denser', 'smaller, because iron is heavier', 'zero, because iron sinks'],
  sol: 'Upthrust depends on the volume immersed and the liquid, not the material, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ar-up', ar({
  a: 'A stone appears lighter when it is held under water.',
  r: 'Water exerts an upward force on a body immersed in it.',
  key: 'c',
  sol: 'Both are true; the upward force of the water reduces the apparent weight, so (R) explains (A), option (c).',
  d: 1, c: 'understanding', t: [1],
}));
add('up-tf', tf({
  stem: 'The upthrust on a body that is fully immersed increases as the body is taken deeper into the liquid.',
  key: 'f',
  sol: 'False. Once the body is fully immersed the upthrust stays the same at any depth.',
  d: 2, c: 'understanding', t: [1],
}));
add('up-term', term({
  stem: 'Define upthrust.',
  model: 'The **upward force** that a liquid exerts on a body immersed in it.', sol: 'The upward force of a liquid on a body in it.', sch: 'Upward force by a liquid',
  d: 1, c: 'recall', t: [1],
}));
add('up-short2a', short({
  marks: 2, wl: null,
  stem: 'Define upthrust and state its direction.',
  model: 'Upthrust is the **force with which a liquid pushes a body placed in it**; it acts **vertically upwards**.',
  sol: 'Upward force of a liquid on a body; vertically up.',
  scheme: [['Force exerted by the liquid on the body', 1], ['Vertically upwards', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('up-short2b', short({
  marks: 2, wl: null,
  stem: 'Two balls of the same size, one of steel and one of aluminium, are fully immersed in water. Compare the upthrusts on them and give a reason.',
  model: 'The upthrusts are **equal**, because the balls displace the **same volume of water** and upthrust depends on the volume immersed and the liquid, not on the material.',
  sol: 'Equal; same volume of water displaced.',
  scheme: [['Equal upthrusts', 1], ['Same volume of water displaced', 1]],
  d: 2, c: 'application', t: [1],
}));

add('up-short3', short({
  marks: 3, wl: null,
  stem: 'A block hangs from a spring balance and is lowered slowly into water until it is completely under the surface, and then a little deeper. Describe how the reading of the balance changes, and explain it.',
  model: 'The reading **falls steadily** while the block is entering the water. Once the block is **completely under**, the reading **stays constant**, even at a greater depth. This is because the **upthrust grows with the volume immersed**; when the block is fully immersed the volume displaced no longer changes.',
  sol: 'Falls while entering; constant once fully immersed; upthrust depends on volume immersed.',
  scheme: [['Reading falls as the block enters', 1], ['Constant once fully immersed', 1], ['Upthrust depends on the volume immersed', 1]],
  d: 3, c: 'analysis', t: [1, 2],
}));

// ---------------------------------------------------------------- t02 Archimedes' principle
add('ar-mcq1', mcq({
  stem: 'Archimedes’ principle states that the upthrust on a body immersed in a fluid is equal to',
  right: 'the weight of the fluid displaced by the body', wrong: ['the weight of the body', 'the volume of the fluid displaced', 'the density of the fluid displaced'],
  sol: 'This is the statement of Archimedes’ principle, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ar-mcq2', mcq({
  stem: 'A body weighs 20 N in air and experiences an upthrust of 6 N when fully immersed in a liquid. Its apparent weight in the liquid is',
  right: `${K.A2[0]} N`, wrong: [`${K.A2[1]} N`, '6 N', `${K.A2[2]} N`],
  sol: r`Apparent weight $= 20 - 6 = ${K.A2[0]}$ N, option (@K).`,
  d: 1, c: 'application', t: [2],
}), () => K.A2[0] === 14 || 'W');
add('ar-mcq3', mcq({
  stem: 'The apparent weight of a body that is sinking in a liquid is',
  right: 'its weight in air minus the upthrust', wrong: ['its weight in air plus the upthrust', 'equal to the upthrust', 'its mass in air'],
  sol: 'The upthrust acts against the weight, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ar-short2', short({
  marks: 2, wl: null,
  stem: 'State Archimedes’ principle and write the expression for the upthrust on a body of volume V immersed in a liquid of density ρ.',
  model: 'A body wholly or partly immersed in a fluid feels an upthrust equal to the **weight of the fluid it displaces**. ' + r`Upthrust $= V \rho g$.`,
  sol: 'Upthrust equals the weight of fluid displaced; V ρ g.',
  scheme: [['Statement', 1], ['Expression V ρ g', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('ar-short3', short({
  marks: 3, wl: null,
  stem: `A body weighs ${K.S3.air} N in air and ${K.S3.water} N when fully immersed in water. Find (a) the upthrust, (b) the volume of the body and (c) its relative density. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)`,
  model: r`**(a)** $U = 8 - 5.4 = ${K.S3_U}$ N.` + '\n\n' + r`**(b)** $V = \dfrac{U}{\rho g} = \dfrac{2.6}{1000 \times 10} = 0.00026$ m³, that is **${K.S3_V} cm³**.` + '\n\n' + r`**(c)** $\text{RD} = \dfrac{8}{2.6} = ${K.S3_RD}$.`,
  sol: '2.6 N; 260 cm³; 3.08.',
  scheme: [['2.6 N', 1], ['260 cm³', 1], ['RD 3.08', 1]],
  d: 3, c: 'application', t: [2, 3],
}), () => K.S3_U === 2.6 && K.S3_V === 260 && K.S3_RD === 3.08 || 'ar-s3');
add('num-up', num({
  stem: 'A stone of volume 400 cm³ is fully immersed in water. Find the upthrust on it. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)',
  value: K.N_UP, tol: 0, unit: 'N',
  sol: r`$U = V \rho g = 400 \times 10^{-6} \times 1000 \times 10 = ${K.N_UP}$ N.`,
  scheme: [['U = V ρ g with volume in m³', 0.5], [`${K.N_UP} N`, 0.5]],
  d: 1, c: 'application', t: [2],
}), () => K.N_UP === 4 || 'U');
add('num-app', num({
  stem: 'A body of volume 450 cm³ weighs 12 N in air. Find its apparent weight when it is fully immersed in water. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)',
  value: K.N_APP, tol: 0, unit: 'N',
  sol: r`$U = V \rho g = 450 \times 10^{-6} \times 1000 \times 10 = 4.5$ N, so apparent weight $= 12 - 4.5 = ${K.N_APP}$ N.`,
  scheme: [['Upthrust 4.5 N', 0.5], [`${K.N_APP} N`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => K.N_APP === 7.5 || 'W');
add('num-iron', num({
  stem: 'An iron block of mass 1.95 kg and density 7800 kg m⁻³ is fully immersed in water. Find its apparent weight. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)',
  value: sig(K.IRON_APP, 3), tol: 0.01, unit: 'N',
  sol: r`$V = \dfrac{m}{\rho} = \dfrac{1.95}{7800} = 0.00025$ m³; $U = 0.00025 \times 1000 \times 10 = 2.5$ N; $W = m g = 1.95 \times 10 = 19.5$ N; apparent weight $= 19.5 - 2.5 = ${sig(K.IRON_APP, 3)}$ N.`,
  scheme: [['Volume and upthrust 2.5 N', 0.5], [`Apparent weight ${sig(K.IRON_APP, 3)} N`, 0.5]],
  d: 3, c: 'application', t: [2],
}), () => sig(K.IRON_APP, 3) === 17 || 'W');
add('num-oil', num({
  stem: 'A stone of volume 150 cm³ weighs 4 N in air. Find its apparent weight when it is fully immersed in oil of density 800 kg m⁻³. (g = 10 m s⁻²)',
  value: sig(K.N_OIL, 3), tol: 0.01, unit: 'N',
  sol: r`$U = V \rho g = 150 \times 10^{-6} \times 800 \times 10 = 1.2$ N, so apparent weight $= 4 - 1.2 = ${sig(K.N_OIL, 3)}$ N.`,
  scheme: [['Upthrust 1.2 N', 0.5], [`${sig(K.N_OIL, 3)} N`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => sig(K.N_OIL, 3) === 2.8 || 'W');

// ---------------------------------------------------------------- t03 relative density
add('rd-mcq1', mcq({
  stem: 'The relative density of a substance has',
  right: 'no unit', wrong: ['the unit kg m⁻³', 'the unit N', 'the unit kg'],
  sol: 'It is the ratio of two densities, so the units cancel, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('rd-mcq2', mcq({
  stem: 'The density of aluminium is 2700 kg m⁻³. Its relative density is',
  right: `${K.R2[0]}`, wrong: [`${K.R2[1]}`, `${K.R2[2]}`, `${K.R2[3]}`],
  sol: r`$\text{RD} = \dfrac{2700}{1000} = ${K.R2[0]}$, option (@K).`,
  d: 1, c: 'application', t: [3],
}), () => K.R2[0] === 2.7 || 'RD');
add('rd-mcq3', mcq({
  stem: 'A solid denser than water weighs W₁ in air and W₂ when fully immersed in water. Its relative density is',
  right: r`$\dfrac{W_1}{W_1 - W_2}$`, wrong: [r`$\dfrac{W_1 - W_2}{W_1}$`, r`$\dfrac{W_2}{W_1 - W_2}$`, r`$\dfrac{W_1}{W_1 + W_2}$`],
  sol: 'The loss of weight W₁ − W₂ is the weight of an equal volume of water, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('rd-mcq4', mcq({
  stem: 'A solid weighs 10 N in air, 6 N in water and 6.8 N in a liquid. The relative density of the liquid is',
  right: `${sig(K.R4[0], 3)}`, wrong: [`${sig(K.R4[1], 3)}`, `${sig(K.R4[2], 3)}`, `${sig(K.R4[3], 3)}`],
  sol: r`$\text{RD} = \dfrac{10 - 6.8}{10 - 6} = \dfrac{3.2}{4} = ${sig(K.R4[0], 3)}$, option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => sig(K.R4[0], 3) === 0.8 || 'RD');
add('rd-tf', tf({
  stem: 'Relative density is measured in kg m⁻³.',
  key: 'f',
  sol: 'False. It is a ratio and has no unit; density is measured in kg m⁻³.',
  d: 1, c: 'recall', t: [3],
}));
add('rd-fill', fill({
  stem: 'Relative density = density of the substance ÷ density of ___.',
  acc: [['water']],
  sol: 'Density of **water**.',
  d: 1, c: 'recall', t: [3],
}));
add('rd-term', term({
  stem: 'Define relative density.',
  model: 'The **ratio of the density of a substance to the density of water**.', sol: 'Density of substance divided by density of water.', sch: 'Ratio to the density of water',
  d: 1, c: 'recall', t: [3],
}));
add('rd-short2', short({
  marks: 2, wl: null,
  stem: 'State two differences between density and relative density.',
  model: 'Density is **mass per unit volume** and is measured in **kg m⁻³**; relative density is a **ratio** of two densities and has **no unit**.',
  sol: 'Mass per volume with unit against a ratio without unit.',
  scheme: [['Definition difference', 1], ['Unit difference', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('rd-short3', short({
  marks: 3, wl: null,
  stem: 'Describe how you would find the relative density of a solid that is denser than water, using a spring balance and a beaker of water. State the readings and the formula.',
  model: 'Hang the solid from a spring balance and note its weight in air, **W₁**. Lower it fully into the water, without touching the beaker, and note the reading **W₂**. The loss of weight, W₁ − W₂, is the weight of an equal volume of water. ' + r`Then $\text{RD} = \dfrac{W_1}{W_1 - W_2}$.`,
  sol: 'W₁ in air, W₂ in water; RD = W₁ / (W₁ − W₂).',
  scheme: [['Weight in air', 1], ['Weight fully in water', 1], ['Formula', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('num-rd', num({
  stem: 'A metal piece weighs 5 N in air and 3 N in water. Find its relative density.',
  value: K.N_RD, tol: 0.01, unit: null,
  sol: r`$\text{RD} = \dfrac{W_1}{W_1 - W_2} = \dfrac{5}{5 - 3} = ${K.N_RD}$.`,
  scheme: [['Formula with substitution', 0.5], [`${K.N_RD}`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => K.N_RD === 2.5 || 'RD');
add('num-rdliq', num({
  stem: 'A solid weighs 6 N in air, 4 N in water and 4.5 N in a liquid. Find the relative density of the liquid.',
  value: K.N_RDL, tol: 0.005, unit: null,
  sol: r`$\text{RD} = \dfrac{6 - 4.5}{6 - 4} = ${K.N_RDL}$.`,
  scheme: [['Formula with substitution', 0.5], [`${K.N_RDL}`, 0.5]],
  d: 3, c: 'application', t: [3],
}), () => K.N_RDL === 0.75 || 'RD');
add('num-dens', num({
  stem: 'The relative density of a metal is 8.9. Find its density in kg m⁻³.',
  value: K.N_DENS, tol: 0, unit: 'kg m⁻³',
  sol: r`$\rho = \text{RD} \times 1000 = 8.9 \times 1000 = ${K.N_DENS}$ kg m⁻³.`,
  scheme: [['RD × 1000', 0.5], [`${K.N_DENS} kg m⁻³`, 0.5]],
  d: 1, c: 'application', t: [3],
}), () => K.N_DENS === 8900 || 'rho');

// ---------------------------------------------------------------- t04 floatation
add('fl-mcq1', mcq({
  stem: 'A body sinks in a liquid when',
  right: 'its density is greater than that of the liquid', wrong: ['its density is less than that of the liquid', 'its density equals that of the liquid', 'the upthrust on it exceeds its weight'],
  sol: 'A denser body has a weight greater than the upthrust, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('fl-mcq2', mcq({
  stem: 'A body floats fully immersed, at any depth, in a liquid when',
  right: 'its density equals the density of the liquid', wrong: ['its density is twice that of the liquid', 'its mass is very small', 'it is hollow'],
  sol: 'With equal densities the upthrust equals the weight at any depth, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('fl-mcq3', mcq({
  stem: 'A block of density 640 kg m⁻³ floats in water. The percentage of its volume below the surface is',
  right: `${K.F3[0]}%`, wrong: [`${K.F3[1]}%`, `${K.F3[2]}%`, `${K.F3[3]}%`],
  sol: r`$\dfrac{V_{\text{in}}}{V} = \dfrac{640}{1000} = 0.64$, that is ${K.F3[0]}%, option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => K.F3[0] === 64 || 'frac');
add('fl-mcq4', mcq({
  stem: 'The law of floatation says that, for a floating body,',
  right: 'the weight of the body equals the weight of the liquid it displaces', wrong: ['the weight of the body equals the volume of the liquid it displaces', 'the density of the body equals the weight of the liquid it displaces', 'the volume of the body equals the volume of the liquid it displaces'],
  sol: 'A floating body displaces its own weight of liquid, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('fl-mcq5', mcq({
  stem: 'A wooden block floats in water and is then placed in brine, which is denser than water. In the brine the block',
  right: 'floats with a smaller fraction of its volume immersed', wrong: ['floats with a larger fraction of its volume immersed', 'sinks to the bottom', 'floats with the same fraction of its volume immersed'],
  sol: 'The fraction immersed is ρ(body) ÷ ρ(liquid), which falls when ρ(liquid) rises, option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('ar-fl', ar({
  a: 'A solid iron ball floats in water if it is made large enough.',
  r: 'The upthrust on a body increases with the volume immersed.',
  key: 'b',
  sol: '(A) is false because a solid iron ball is always denser than water; (R) is true, option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('ar-sink', ar({
  a: 'A body that is denser than a liquid sinks in it.',
  r: 'The upthrust on a fully immersed body depends on the volume of the body.',
  key: 'd',
  sol: 'Both statements are true, but (R) does not explain why the body sinks; the reason is that its weight exceeds the upthrust, option (d).',
  d: 3, c: 'analysis', t: [2, 4],
}));
add('fl-tf', tf({
  stem: 'A floating body displaces a weight of liquid equal to its own weight.',
  key: 't',
  sol: 'True. This is the law of floatation.',
  d: 1, c: 'recall', t: [4],
}));
add('fl-fill', fill({
  marks: 3,
  stem: 'A body sinks if its density is ___ than that of the liquid, floats fully immersed if its density is ___ to it, and floats partly immersed if its density is ___ than that of the liquid.',
  acc: [['greater', 'more', 'higher'], ['equal', 'the same', 'equal to'], ['less', 'smaller', 'lower']],
  sol: 'Greater; equal; less.',
  d: 1, c: 'recall', t: [4],
}));
add('fl-short2a', short({
  marks: 2, wl: null,
  stem: 'State the conditions, in terms of densities, for a body (i) to sink in a liquid and (ii) to float fully immersed in it.',
  model: '**(i)** The density of the body is **greater** than that of the liquid. **(ii)** The density of the body is **equal** to that of the liquid.',
  sol: 'Sinks if denser; floats fully immersed if equally dense.',
  scheme: [['Sinks: denser', 1], ['Floats fully immersed: equal density', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('fl-short2b', short({
  marks: 2, wl: null,
  stem: 'Why does a steel needle sink in water but a large steel ship floats?',
  model: 'The needle is **solid steel**, much denser than water, so it sinks. The ship is **hollow**; its large volume displaces a very large weight of water and its **average density is less than that of water**.',
  sol: 'Solid steel is denser than water; the hollow ship has a lower average density.',
  scheme: [['Needle denser than water', 1], ['Ship: hollow shape, lower average density', 1]],
  d: 2, c: 'application', t: [4, 5],
}));
add('fl-short3', short({
  marks: 3, wl: null,
  stem: `A wooden block of mass ${K.BLOCK.m} kg and volume ${K.BLOCK.v} cm³ is placed in water. (a) Show that it floats. (b) Find the volume of the block below the surface. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)`,
  model: r`**(a)** Density $= \dfrac{0.6}{0.001} = ${sig(K.BLOCK_RHO, 3)}$ kg m⁻³, which is **less than 1000 kg m⁻³**, so the block floats.` + '\n\n' + r`**(b)** For floating, upthrust $=$ weight $= 0.6 \times 10 = ${K.BLOCK_W}$ N. $V_{\text{in}} = \dfrac{6}{1000 \times 10} = 0.0006$ m³, that is **${K.BLOCK_VIN} cm³**.`,
  sol: 'Density 600 kg m⁻³ is below 1000; volume below the surface 600 cm³.',
  scheme: [['Density 600 kg m⁻³ compared with water', 1], ['Upthrust equals weight 6 N', 1], ['600 cm³', 1]],
  d: 3, c: 'application', t: [4],
}), () => sig(K.BLOCK_RHO, 3) === 600 && K.BLOCK_VIN === 600 || 'block');
add('num-wood', num({
  stem: 'A block of wood of density 600 kg m⁻³ and volume 500 cm³ floats in water. Find the volume of the block above the surface of the water. (Density of water 1000 kg m⁻³)',
  value: K.WOOD_ABOVE, tol: 0.5, unit: 'cm³',
  sol: r`$\dfrac{V_{\text{in}}}{V} = \dfrac{600}{1000} = 0.6$, so $V_{\text{in}} = 0.6 \times 500 = 300$ cm³ and the volume above is $500 - 300 = ${K.WOOD_ABOVE}$ cm³.`,
  scheme: [['Fraction immersed 0.6', 0.5], [`${K.WOOD_ABOVE} cm³`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => K.WOOD_ABOVE === 200 || 'V');
add('num-brine', num({
  stem: 'A small object of volume 200 cm³ floats fully immersed in brine of density 1200 kg m⁻³. Find its mass. (g = 10 m s⁻²)',
  value: K.BRINE_M, tol: 0.005, unit: 'kg',
  sol: r`For floating, weight $=$ upthrust $= V \rho g = 200 \times 10^{-6} \times 1200 \times 10 = ${K.BRINE.u}$ N, so $m = \dfrac{W}{g} = \dfrac{2.4}{10} = ${K.BRINE_M}$ kg.`,
  scheme: [['Upthrust = weight = 2.4 N', 0.5], [`${K.BRINE_M} kg`, 0.5]],
  d: 3, c: 'application', t: [4],
}), () => K.BRINE_M === 0.24 || 'm');
add('num-ice', num({
  stem: 'Ice of density 920 kg m⁻³ floats in sea water of density 1030 kg m⁻³. Find the percentage of the volume of the ice that is below the surface.',
  value: K.N_ICE, tol: 0.1, unit: '%',
  sol: r`$\dfrac{V_{\text{in}}}{V} \times 100 = \dfrac{920}{1030} \times 100 = ${K.N_ICE}$ %.`,
  scheme: [['Ratio of densities', 0.5], [`${K.N_ICE}%`, 0.5]],
  d: 2, c: 'application', t: [4, 5],
}), () => K.N_ICE === 89.3 || 'ice');
add('num-boat', num({
  stem: 'A boat of mass 800 kg floats in river water of density 1000 kg m⁻³. Find the volume of water the boat displaces.',
  value: K.BOAT_V, tol: 0, unit: 'm³',
  sol: r`A floating body displaces its own weight of water, so the mass of water displaced is 800 kg and $V = \dfrac{m}{\rho} = \dfrac{800}{1000} = ${K.BOAT_V}$ m³.`,
  scheme: [['Mass of water displaced = 800 kg', 0.5], [`${K.BOAT_V} m³`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => K.BOAT_V === 0.8 || 'V');
add('num-cork', num({
  stem: 'A piece of cork of density 240 kg m⁻³ floats in water. Find the percentage of its volume that is above the surface. (Density of water 1000 kg m⁻³)',
  value: K.CORK_ABOVE, tol: 0.1, unit: '%',
  sol: r`Below the surface: $\dfrac{240}{1000} \times 100 = 24$ %, so above the surface: $100 - 24 = ${K.CORK_ABOVE}$ %.`,
  scheme: [['24% below', 0.5], [`${K.CORK_ABOVE}%`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => K.CORK_ABOVE === 76 || 'pct');

// ---------------------------------------------------------------- t05 applications
add('sh-mcq1', mcq({
  stem: 'An iron ship floats on water because',
  right: 'its hollow shape makes its average density less than that of water', wrong: ['iron is lighter than water', 'water cannot push upwards on iron', 'the ship weighs less than the water around it'],
  sol: 'The large volume displaced gives an upthrust equal to the weight, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('sh-mcq2', mcq({
  stem: 'A submarine rises to the surface when',
  right: 'compressed air forces the water out of its ballast tanks', wrong: ['more water is let into its ballast tanks', 'its volume is reduced', 'its engines are stopped'],
  sol: 'Removing water makes it lighter, so its average density falls, option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('sh-mcq3', mcq({
  stem: 'Only a small part of an iceberg is seen above the sea because',
  right: 'the density of ice is only slightly less than that of sea water', wrong: ['ice is much lighter than sea water', 'most of the ice melts above the surface', 'the upthrust is greater than the weight of the iceberg'],
  sol: 'The fraction immersed is ρ(ice) ÷ ρ(sea water), which is close to one, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('sh-mcq4', mcq({
  stem: 'A balloon filled with a gas lighter than air rises until',
  right: 'the upthrust on it equals its total weight', wrong: ['the gas inside is used up', 'the density of the gas equals that of the balloon', 'the surrounding air becomes denser'],
  sol: 'At that height the upthrust and the weight balance, and it stops rising, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('ar-ice', ar({
  a: 'About nine-tenths of the volume of an iceberg lies below the surface of the sea.',
  r: 'The density of ice is greater than the density of sea water.',
  key: 'a',
  sol: '(A) is true; (R) is false because ice is a little less dense than sea water, option (a).',
  d: 3, c: 'analysis', t: [4, 5],
}));
add('ice-term', term({
  stem: 'Which has the greater density, ice or sea water?',
  model: '**Sea water.**', sol: 'Sea water.', sch: 'Sea water',
  d: 1, c: 'recall', t: [5],
}));
add('sh-match', match({
  marks: 5,
  stem: 'Match each item in Column A with the correct description in Column B.',
  pairs: [
    ['Iron ship', 'hollow hull displaces a large volume of water'],
    ['Submarine', 'ballast tanks filled with water to dive'],
    ['Iceberg', 'most of its volume lies below the surface'],
    ['Hot-air balloon', 'hot air inside is less dense than the air outside'],
    ['Spring balance in water', 'reads the apparent weight'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'Ship: hollow hull; submarine: ballast tanks; iceberg: most below the surface; balloon: hot air less dense; spring balance: apparent weight.',
  d: 2, c: 'understanding', t: [2, 5],
}));
add('sh-short2', short({
  marks: 2, wl: null,
  stem: 'Explain how a submarine dives and how it returns to the surface.',
  model: 'To **dive**, water is let into its **ballast tanks**, which increases its weight and average density. To **surface**, **compressed air** pushes the water out, making it lighter than the water it displaces.',
  sol: 'Ballast tanks filled with water to dive; emptied with compressed air to rise.',
  scheme: [['Dives: ballast tanks filled with water', 1], ['Rises: water forced out by compressed air', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('sh-short3', short({
  marks: 3, wl: null,
  stem: 'Explain why a balloon filled with hot air rises, and why it stops rising at a certain height.',
  model: 'Hot air is **less dense** than the cooler air outside, so the **upthrust**, which equals the weight of the air displaced, is **greater than the total weight** of the balloon and it rises. Higher up the air is thinner, so the upthrust falls. At the height where the **upthrust equals the weight**, the balloon stops rising.',
  sol: 'Hot air is less dense so upthrust exceeds weight; upthrust falls with height; it stops where they are equal.',
  scheme: [['Less dense gas, upthrust greater than weight', 1], ['Upthrust falls as the air thins', 1], ['Stops where upthrust equals weight', 1]],
  d: 3, c: 'analysis', t: [5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('long-spring', long({
  marks: 10, wl: null,
  stem: 'The figure shows the same body hanging from a spring balance, first in air (left) and then fully immersed in water (right). The parts on the right are lettered A to E, and the scales are marked in newton. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)\n\n(a) Name the parts A, B, C, D and E. [3]\n\n(b) Read from the scales the weight of the body in air and its apparent weight in water. [2]\n\n(c) Find the upthrust on the body and the volume of the body. [3]\n\n(d) State Archimedes’ principle. [2]',
  model: '**(a)** **A** is the spring balance; **B** is the body; **C** is the water; **D** is the upthrust (upward arrow); **E** is the weight of the body (downward arrow).\n\n' + `**(b)** Weight in air = **${K.LS.w} N**; apparent weight in water = **${K.LS.app} N**.\n\n` + r`**(c)** Upthrust $= ${K.LS.w} - ${K.LS.app} = ${K.LS.u}$ N. Volume $V = \dfrac{U}{\rho g} = \dfrac{${K.LS.u}}{1000 \times 10} = 0.0006$ m³, that is **${K.LS.v} cm³**.` + '\n\n**(d)** When a body is wholly or partly immersed in a fluid, the **upthrust** on it is **equal to the weight of the fluid displaced** by it.',
  sol: 'Balance, body, water, upthrust, weight; 15 N and 9 N; 6 N and 600 cm³; Archimedes’ principle.',
  scheme: [['A and B named', 1], ['C named', 1], ['D and E named', 1], ['15 N read from the scale', 1], ['9 N read from the scale', 1], ['Upthrust = 15 − 9 = 6 N', 1], ['V = U / ρ g', 1], ['600 cm³', 1], ['Body wholly or partly immersed', 1], ['Upthrust equals the weight of fluid displaced', 1]],
  d: 3, c: 'application', t: [1, 2],
  assets: [springFig],
}), () => K.LS.u === 6 && K.LS.app === 9 && K.LS.v === 600 || 'spring');
add('long-rd', long({
  marks: 10, wl: null,
  stem: `A student weighs a metal piece with a spring balance. It weighs ${K.LR.air} N in air, ${K.LR.water} N when fully immersed in water, and ${K.LR.liq} N when fully immersed in a liquid X. (Density of water 1000 kg m⁻³)\n\n(a) Define relative density. [2]\n\n(b) Find the loss of weight in water and state what it equals. [2]\n\n(c) Find the relative density of the metal and its density. [3]\n\n(d) Find the relative density of liquid X. [2]\n\n(e) State one precaution to be taken while the piece is in the water. [1]`,
  model: '**(a)** The **ratio of the density of a substance to the density of water**; it has no unit.\n\n' + r`**(b)** Loss of weight $= ${K.LR.air} - ${K.LR.water} = ${K.LR_U}$ N, which equals the **weight of an equal volume of water** (the upthrust).` + '\n\n' + r`**(c)** $\text{RD} = \dfrac{${K.LR.air}}{${K.LR_U}} = ${K.LR_RDS}$, so the density is $${K.LR_RDS} \times 1000 = 6000$ kg m⁻³.` + '\n\n' + r`**(d)** $\text{RD of X} = \dfrac{${K.LR.air} - ${K.LR.liq}}{${K.LR.air} - ${K.LR.water}} = \dfrac{0.6}{${K.LR_U}} = ${K.LR_RDL}$.` + '\n\n**(e)** The piece must be **completely under water without touching the sides or bottom** of the beaker (and free of air bubbles).',
  sol: 'Ratio of densities; 0.8 N, weight of equal volume of water; RD 6 and 6000 kg m⁻³; 0.75; keep the piece fully immersed and clear of the beaker.',
  scheme: [['Ratio to the density of water', 1], ['No unit', 1], ['Loss 0.8 N', 1], ['Equals the weight of an equal volume of water', 1], ['RD = W₁ / loss', 1], ['RD 6', 1], ['Density 6000 kg m⁻³', 1], ['RD of X working', 1], ['0.75', 1], ['A correct precaution', 1]],
  d: 3, c: 'application', t: [3],
}), () => K.LR_RDS === 6 && K.LR_RDL === 0.75 || 'rd');
add('long-float', long({
  marks: 10, wl: null,
  stem: `Three blocks A, B and C, each of volume ${K.LF.v} cm³, have densities ${K.LF.rhoA} kg m⁻³, ${K.LF.rhoB} kg m⁻³ and ${K.LF.rhoC} kg m⁻³. Each is released gently in water. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)\n\n(a) State what each block does (sinks, floats fully immersed or floats partly immersed), with a reason. [3]\n\n(b) Find the weight of each block. [3]\n\n(c) Find the apparent weight of the block that sinks. [2]\n\n(d) Find the volume of the floating block C that is below the surface. [2]`,
  model: '**(a)** **A** sinks, because its density is greater than that of water. **B** floats fully immersed, because its density equals that of water. **C** floats partly immersed, because its density is less than that of water.\n\n' + r`**(b)** $W = V \rho g$: A $= 0.0005 \times 2500 \times 10 = ${K.LF_WA}$ N; B $= 0.0005 \times 1000 \times 10 = ${K.LF_WB}$ N; C $= 0.0005 \times 400 \times 10 = ${K.LF_WC}$ N.` + '\n\n' + r`**(c)** Upthrust on A (fully immersed) $= 0.0005 \times 1000 \times 10 = ${K.LF_U}$ N, so the apparent weight $= ${K.LF_WA} - ${K.LF_U} = ${K.LF_AAPP}$ N.` + '\n\n' + r`**(d)** C floats, so upthrust $=$ weight $= ${K.LF_WC}$ N, and $V_{\text{in}} = \dfrac{${K.LF_WC}}{1000 \times 10} = 0.0002$ m³, that is **${K.LF_VIN} cm³**.`,
  sol: 'A sinks, B floats fully immersed, C floats partly; 12.5 N, 5 N, 2 N; 7.5 N; 200 cm³.',
  scheme: [['A sinks with reason', 1], ['B floats fully immersed with reason', 1], ['C floats partly immersed with reason', 1], ['12.5 N', 1], ['5 N', 1], ['2 N', 1], ['Upthrust on A is 5 N', 1], ['7.5 N', 1], ['Upthrust equals weight for C', 1], ['200 cm³', 1]],
  d: 3, c: 'application', t: [4],
}), () => K.LF_AAPP === 7.5 && K.LF_VIN === 200 || 'float');
add('long-ice', long({
  marks: 10, wl: null,
  stem: 'An iceberg floats in the sea. (Density of ice 900 kg m⁻³; of sea water 1030 kg m⁻³; of fresh water 1000 kg m⁻³)\n\n(a) Explain why only a small part of the iceberg is seen above the surface. [2]\n\n(b) Find the percentage of the volume of the iceberg that is below the surface and the percentage that is above it. [3]\n\n(c) The iceberg has a total volume of 20 000 m³. Find the volume above the surface. [2]\n\n(d) Find the percentage of the volume of the same ice below the surface when it floats in fresh water. [2]\n\n(e) Name the law of floatation used to answer (b). [1]',
  model: '**(a)** Ice is **only slightly less dense** than sea water, so it floats with almost all of its volume **immersed**; the part above the surface is small.\n\n' + r`**(b)** $\dfrac{V_{\text{in}}}{V} = \dfrac{900}{1030} = 0.874$, so **${K.LI.below}%** is below the surface and $100 - ${K.LI.below} = $ **${K.LI.above}%** is above it.` + '\n\n' + r`**(c)** Volume above $= 20000 \times 0.126 = ${K.LI_VOUT}$ m³ (about).` + '\n\n' + r`**(d)** $\dfrac{900}{1000} \times 100 = ${K.LI_FRESH}$ %.` + '\n\n**(e)** The **law of floatation**: a floating body displaces its own weight of liquid.',
  sol: 'Ice is slightly less dense; 87.4% below and 12.6% above; about 2520 m³; 90%; law of floatation.',
  scheme: [['Ice slightly less dense than sea water', 1], ['Most of the volume is immersed', 1], ['Ratio of densities', 1], ['87.4% below', 1], ['12.6% above', 1], ['20 000 × 0.126 working', 1], ['About 2520 m³', 1], ['900 ÷ 1000', 1], ['90%', 1], ['Law of floatation', 1]],
  d: 3, c: 'application', t: [4, 5],
}), () => K.LI.below === 87.4 && K.LI_VOUT === 2520 && K.LI_FRESH === 90 || 'ice');
add('long-sub', long({
  marks: 10, wl: null,
  stem: 'A submarine has a volume of 3000 m³. When floating on the surface of the sea its weight is 2.4 × 10⁷ N. (Density of sea water 1030 kg m⁻³; g = 10 m s⁻²)\n\n(a) Find the volume of the submarine below the surface when it floats, and this as a percentage of its total volume. [3]\n\n(b) Find the upthrust on it when it is fully submerged. [2]\n\n(c) Find the weight of water that must be taken into the ballast tanks for it to be just fully submerged and to float at one depth. [2]\n\n(d) Describe how it returns to the surface. [2]\n\n(e) State whether the upthrust changes as it dives deeper, with a reason. [1]',
  model: r`**(a)** Floating: upthrust $=$ weight, so $V_{\text{in}} = \dfrac{24000000}{1030 \times 10} = ${K.SUB_VIN}$ m³ (about), that is $\dfrac{${K.SUB_VIN}}{3000} \times 100 = ${K.SUB_PCT}$ %.` + '\n\n' + r`**(b)** $U = V \rho g = 3000 \times 1030 \times 10 = ${K.SUB_U}$ N.` + '\n\n' + r`**(c)** Extra weight $= ${K.SUB_U} - 24000000 = ${K.SUB_BALLAST_W}$ N, which is the weight of **${K.SUB_BALLAST_M} kg** of sea water (about).` + '\n\n**(d)** **Compressed air** is used to force water out of the ballast tanks, so the weight and average density fall and the upthrust exceeds the weight.\n\n**(e)** The upthrust **does not change**, because the volume displaced and the density of the water stay the same (once fully submerged).',
  sol: '2330 m³, 77.7%; 3.09 × 10⁷ N; 6.9 × 10⁶ N; compressed air empties the ballast tanks; upthrust unchanged.',
  scheme: [['Upthrust equals weight when floating', 1], ['2330 m³', 1], ['77.7%', 1], ['U = V ρ g with substitution', 1], ['30 900 000 N', 1], ['Subtraction', 1], ['6 900 000 N', 1], ['Compressed air forces water out', 1], ['Weight falls, upthrust exceeds weight', 1], ['Upthrust unchanged with reason', 1]],
  d: 3, c: 'application', t: [5],
}), () => K.SUB_U === 30900000 && K.SUB_BALLAST_W === 6900000 && K.SUB_PCT === 77.7 || 'sub');
add('long-balloon', long({
  marks: 10, wl: null,
  stem: 'A balloon of volume 600 m³ is filled with helium of density 0.18 kg m⁻³. The air around it has density 1.2 kg m⁻³. The envelope, basket and load together weigh 3000 N. (g = 10 m s⁻²)\n\n(a) Find the upthrust on the balloon. [2]\n\n(b) Find the weight of the helium in it. [2]\n\n(c) Find the net upward force on the balloon when it is released, and the extra mass it could carry and still just rise. [3]\n\n(d) Explain why the balloon stops rising at a great height. [2]\n\n(e) State the condition for the balloon to hover. [1]',
  model: r`**(a)** $U = V \rho_{\text{air}} g = 600 \times 1.2 \times 10 = ${K.BAL_U}$ N.` + '\n\n' + r`**(b)** $W_{\text{He}} = 600 \times 0.18 \times 10 = ${K.BAL_WHE}$ N.` + '\n\n' + r`**(c)** Net force $= ${K.BAL_U} - ${K.BAL_WHE} - 3000 = ${sig(K.BAL_NET, 4)}$ N upwards. A load of weight ${sig(K.BAL_NET, 4)} N has a mass of $\dfrac{${sig(K.BAL_NET, 4)}}{10} = ${sig(K.BAL_M, 3)}$ kg.` + '\n\n**(d)** The air gets **thinner (less dense)** at greater heights, so the upthrust, which is the weight of the air displaced, **falls** until it equals the total weight.\n\n**(e)** The upthrust equals the total weight of the balloon, its gas and its load.',
  sol: '7200 N; 1080 N; 3120 N and 312 kg; upthrust falls as the air thins; upthrust equals total weight.',
  scheme: [['U = V ρ g with substitution', 1], ['7200 N', 1], ['Substitution', 1], ['1080 N', 1], ['Net force working', 1], ['3120 N', 1], ['312 kg', 1], ['Air is less dense at height', 1], ['Upthrust falls until equal to the weight', 1], ['Upthrust equals the total weight', 1]],
  d: 4, c: 'analysis', t: [5],
}), () => K.BAL_U === 7200 && sig(K.BAL_NET, 4) === 3120 || 'balloon');
