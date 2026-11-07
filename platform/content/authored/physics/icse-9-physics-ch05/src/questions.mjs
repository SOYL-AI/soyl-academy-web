// ICSE 9 Physics ch05 Pressure in Fluids: question bank in ICSE school-examination style (short stems, "state", "define",
// numericals with formula, substitution and unit, 10-mark structured questions in parts). Numbers come from calc.mjs.
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r, near, sig } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { PISTONS_LETTERED, JETS } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const pistonFig = svgV(PISTONS_LETTERED, 'A closed vessel of liquid with two pistons and parts lettered A to E');
const jetFig = svgV(JETS, 'A tall vessel of water with three numbered side holes at depths of 10, 20 and 30 centimetres and the jets from them');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-brick', mcq({
  stem: 'A brick is placed on a sponge, resting on each of its three different faces in turn. The pressure on the sponge is greatest when the brick rests on',
  right: 'its smallest face', wrong: ['its largest face', 'its middle-sized face', 'any face, because the pressure depends only on the weight'],
  sol: 'The thrust (the weight) is the same each time, so the smallest area gives the largest pressure, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-unit', mcq({
  stem: 'One pascal is equal to',
  right: r`$1\ \text{N m}^{-2}$`, wrong: [r`$1\ \text{N m}$`, r`$1\ \text{N}$`, r`$1\ \text{kg m}^{-2}$`],
  sol: 'Pressure is thrust in newton divided by area in square metre, so the pascal is one newton per square metre, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-depth', mcq({
  stem: 'A diver in a lake goes from a depth h to a depth 2h. The pressure due to the water',
  right: 'is doubled', wrong: ['stays the same', 'is halved', 'becomes four times as great'],
  sol: 'Since p = h ρ g, the pressure is proportional to the depth, so it doubles, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-shape', mcq({
  stem: 'A narrow tube, a wide tank and a funnel are filled with the same liquid to the same height. The pressures at their bases are',
  right: 'equal in all three', wrong: ['greatest in the narrow tube, as the liquid is concentrated there', 'greatest in the wide tank, as it holds the most liquid', 'least in the funnel, as its sides slope'],
  sol: 'The depth, the density and g are the same, so the pressure at the base is the same, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('chk-pascal', mcq({
  stem: 'Which statement agrees with Pascal’s law?',
  right: 'Pressure applied to an enclosed liquid is passed on equally to every part of the liquid', wrong: ['The force on every piston in a closed liquid is the same', 'Pressure in a liquid is greatest at its free surface', 'Pressure applied to a liquid is passed on only in the direction of the force'],
  sol: 'Pascal’s law concerns the transmission of the applied pressure, equally to all parts, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-force', mcq({
  stem: 'A force of 5 N acts on a piston of area 1 cm² in a closed vessel of liquid. The force on a piston of area 10 cm² in the same vessel is',
  right: `${K.CF} N`, wrong: ['0.5 N', '5 N', '500 N'],
  sol: r`$F_2 = F_1 \times \dfrac{A_2}{A_1} = 5 \times \dfrac{10}{1} = ${K.CF}$ N, option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => K.CF === 50 || 'F2');

// ---------------------------------------------------------------- t01 thrust and pressure
add('th-mcq1', mcq({
  stem: 'Thrust is',
  right: 'the force acting perpendicular to a surface', wrong: ['the force acting on a unit area of a surface', 'the area over which a force acts', 'a force that acts only inside liquids'],
  sol: 'Thrust is the perpendicular force on a surface; pressure is the thrust per unit area, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('th-mcq2', mcq({
  stem: 'The SI unit of pressure is the',
  right: 'pascal', wrong: ['newton', 'joule', 'kilogram'],
  sol: 'Pressure is measured in pascal, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('th-mcq3', mcq({
  stem: 'The tip of a drawing pin is made pointed so that',
  right: 'a small area gives a large pressure when the pin is pushed', wrong: ['a small area gives a small pressure when the pin is pushed', 'the thrust on the pin becomes larger', 'the weight of the pin is increased'],
  sol: 'The same thrust acting on a tiny area gives a large pressure, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('th-mcq4', mcq({
  stem: 'A camel walks on soft sand without sinking in much because its broad feet',
  right: 'have a large area, which reduces the pressure on the sand', wrong: ['have a small area, which reduces the pressure on the sand', 'reduce the weight of the camel', 'increase the thrust on the sand'],
  sol: 'For the same weight, a larger area means a smaller pressure, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('th-mcq5', mcq({
  stem: 'A thrust of 500 N acts on an area of 0.25 m². The pressure is',
  right: `${K.M5[0]} Pa`, wrong: [`${K.M5[1]} Pa`, `${K.M5[2]} Pa`, '500 Pa'],
  sol: r`$p = \dfrac{F}{A} = \dfrac{500}{0.25} = ${K.M5[0]}$ Pa, option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => K.M5[0] === 2000 || 'p');
add('th-mcq6', mcq({
  stem: 'A rectangular block rests on a table, first on its largest face and then on its smallest face. Which statement is correct?',
  right: 'The thrust is the same in both positions, but the pressure is greater on the smallest face', wrong: ['The thrust and the pressure are the same in both positions', 'The thrust is greater on the smallest face', 'The pressure is greater on the largest face'],
  sol: 'The thrust is the weight of the block, which does not change; the pressure is thrust divided by area, option (@K).',
  d: 2, c: 'analysis', t: [1],
}));
add('th-mcq7', mcq({
  stem: 'A thrust of 20 N acts at right angles on an area of 4 m². The pressure is',
  right: `${K.M7[0]} Pa`, wrong: [`${K.M7[1]} Pa`, `${K.M7[2]} Pa`, '16 Pa'],
  sol: r`$p = \dfrac{F}{A} = \dfrac{20}{4} = ${K.M7[0]}$ Pa, option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => K.M7[0] === 5 || 'p');
add('ar-th', ar({
  a: 'A sharp knife cuts a vegetable more easily than a blunt knife when both are pressed with the same force.',
  r: 'The sharp edge has a smaller area of contact, so it exerts a larger pressure.',
  key: 'c',
  sol: 'Both are true, and the smaller area explains the larger pressure, option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('th-tf', tf({
  stem: 'Thrust is a scalar quantity.',
  key: 'f',
  sol: 'False. Thrust is a force and has a direction, perpendicular to the surface.',
  d: 1, c: 'understanding', t: [1],
}));
add('th-fill', fill({
  stem: 'One pascal is one ___ per square metre.',
  acc: [['newton']],
  sol: 'One **newton** per square metre.',
  d: 1, c: 'recall', t: [1],
}));
add('th-term', term({
  stem: 'Define thrust.',
  model: 'The **force acting perpendicular to a surface**.', sol: 'The perpendicular force on a surface.', sch: 'Perpendicular force on a surface',
  d: 1, c: 'recall', t: [1],
}));
add('th-short2a', short({
  marks: 2, wl: null,
  stem: 'Define thrust and pressure, and state the SI unit of each.',
  model: '**Thrust** is the force acting perpendicular to a surface; its unit is the **newton**. **Pressure** is the thrust on each unit of area; its unit is the **pascal** (newton per square metre).',
  sol: 'Thrust is a perpendicular force (N); pressure is thrust per unit area (Pa).',
  scheme: [['Thrust with its unit', 1], ['Pressure with its unit', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('th-short2b', short({
  marks: 2, wl: null,
  stem: 'Explain why a sharp knife cuts a vegetable more easily than a blunt knife, using the same force.',
  model: 'The sharp edge has a **much smaller area** in contact with the vegetable. The same force acting on a small area gives a **larger pressure**, so the knife cuts in.',
  sol: 'Small area gives large pressure.',
  scheme: [['Smaller area of the edge', 1], ['Larger pressure for the same force', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('th-short2c', short({
  marks: 2, wl: null,
  stem: 'A girl in high-heeled shoes sinks into soft ground, but the same girl in flat sandals does not. Explain.',
  model: 'Her weight, which is the thrust, is the same in both cases. The heels have a **very small area**, so they exert a **large pressure** and sink; the flat sandals spread the weight over a **large area**, giving a small pressure.',
  sol: 'Same thrust; small heel area gives large pressure, flat sole gives small pressure.',
  scheme: [['Same thrust (weight)', 1], ['Small area, large pressure, against large area, small pressure', 1]],
  d: 2, c: 'application', t: [1],
}));
add('th-short3', short({
  marks: 3, wl: null,
  stem: `A block of weight ${K.BLOCK.w} N measures 24 cm × 10 cm × 5 cm. Find the greatest and the least pressure it can exert on a table.`,
  model: r`The thrust is the weight, ${K.BLOCK.w} N. The greatest pressure is on the smallest face, $10 \times 5 = 50\ \text{cm}^2 = 0.005\ \text{m}^2$: $p = \dfrac{36}{0.005} = ${K.BLOCK_P[2]}$ Pa.` + '\n\n' + r`The least pressure is on the largest face, $24 \times 10 = 240\ \text{cm}^2 = 0.024\ \text{m}^2$: $p = \dfrac{36}{0.024} = ${K.BLOCK_P[0]}$ Pa.`,
  sol: '7200 Pa on the smallest face; 1500 Pa on the largest face.',
  scheme: [['Faces chosen and areas in m²', 1], ['7200 Pa', 1], ['1500 Pa', 1]],
  d: 2, c: 'application', t: [1],
}), () => K.BLOCK_P[2] === 7200 && K.BLOCK_P[0] === 1500 || 'block');
add('num-thrust', num({
  stem: 'A thrust of 600 N acts on a surface of area 0.15 m². Find the pressure on the surface in pascal.',
  value: K.N_THRUST, tol: 0, unit: 'Pa',
  sol: r`$p = \dfrac{F}{A} = \dfrac{600}{0.15} = ${K.N_THRUST}$ Pa.`,
  scheme: [['p = F / A with substitution', 0.5], [`${K.N_THRUST} Pa`, 0.5]],
  d: 1, c: 'application', t: [1],
}), () => K.N_THRUST === 4000 || 'p');
add('num-man', num({
  stem: 'A boy of mass 45 kg stands on one foot, whose sole has an area of 150 cm². Find the pressure on the ground in pascal. (g = 10 m s⁻²)',
  value: K.N_MAN, tol: 0, unit: 'Pa',
  sol: r`$F = m g = 45 \times 10 = 450$ N and $A = 150 \times 10^{-4} = 0.015$ m², so $p = \dfrac{450}{0.015} = ${K.N_MAN}$ Pa.`,
  scheme: [['Thrust 450 N and area in m²', 0.5], [`${K.N_MAN} Pa`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => K.N_MAN === 30000 || 'p');
add('num-knife', num({
  stem: 'The edge of a knife has an area of 4 × 10⁻⁵ m². Find the pressure on a fruit when the knife is pressed with a force of 24 N.',
  value: K.N_KNIFE, tol: 0, unit: 'Pa',
  sol: r`$p = \dfrac{F}{A} = \dfrac{24}{0.00004} = ${K.N_KNIFE}$ Pa.`,
  scheme: [['p = F / A with substitution', 0.5], [`${K.N_KNIFE} Pa`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => K.N_KNIFE === 600000 || 'p');

// ---------------------------------------------------------------- t02 pressure of a liquid column
add('lq-mcq1', mcq({
  stem: 'The pressure due to a liquid at a depth h, where the density of the liquid is ρ and the acceleration due to gravity is g, is',
  right: r`$h \rho g$`, wrong: [r`$\dfrac{h \rho}{g}$`, r`$\dfrac{h g}{\rho}$`, r`$\dfrac{\rho g}{h}$`],
  sol: 'The weight of the column divided by its base area gives h ρ g, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('lq-mcq2', mcq({
  stem: 'A dam is made broader at the base than at the top because',
  right: 'the pressure of the water increases with depth', wrong: ['the pressure of the water decreases with depth', 'the water at the bottom of the lake is colder', 'a broad base makes the dam look stronger'],
  sol: 'The greatest push of the water is near the bottom, so the wall must be strongest there, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('lq-mcq3', mcq({
  stem: 'The pressure due to a liquid of density 1100 kg m⁻³ at a depth of 5 m is (g = 10 m s⁻²)',
  right: `${K.L3[0]} Pa`, wrong: [`${K.L3[1]} Pa`, `${K.L3[2]} Pa`, `${K.L3[3]} Pa`],
  sol: r`$p = h \rho g = 5 \times 1100 \times 10 = ${K.L3[0]}$ Pa, option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => K.L3[0] === 55000 || 'p');
add('lq-mcq4', mcq({
  stem: 'Which of the following does NOT affect the pressure at a point inside a liquid at rest?',
  right: 'the area of the base of the vessel', wrong: ['the depth of the point below the surface', 'the density of the liquid', 'the acceleration due to gravity'],
  sol: 'Pressure depends on h, ρ and g, but not on the base area or the shape, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('lq-mcq5', mcq({
  stem: 'At a point inside a liquid at rest, the pressure acts',
  right: 'equally in all directions', wrong: ['only downwards', 'only upwards', 'only sideways'],
  sol: 'A liquid presses equally in every direction at a given point, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('lq-mcq6', mcq({
  stem: 'Both the depth and the density of a liquid are doubled. The pressure at that depth becomes',
  right: 'four times as great', wrong: ['twice as great', 'eight times as great', 'unchanged'],
  sol: 'p = h ρ g, so the factor is 2 × 2 = 4, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('lq-mcq7', mcq({
  stem: 'A deep-sea diver wears a strong special suit because',
  right: 'the pressure of the water at great depth is very large', wrong: ['the water at great depth is very hot', 'the density of the diver increases at depth', 'the suit reduces the weight of the diver'],
  sol: 'Pressure grows with depth and the suit protects the body, option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('ar-lq', ar({
  a: 'The pressure at the bottom of a lake would increase if the lake were made wider, its depth remaining the same.',
  r: 'The pressure at a point in a liquid depends only on the depth, the density of the liquid and g.',
  key: 'b',
  sol: '(A) is false because width does not matter; (R) is true, option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('lq-tf', tf({
  stem: 'At the same depth, the pressure in sea water is greater than in fresh water.',
  key: 't',
  sol: 'True. Sea water has a greater density, so h ρ g is larger.',
  d: 2, c: 'understanding', t: [2],
}));
add('lq-fill', fill({
  marks: 3,
  stem: 'The pressure at a point in a liquid depends on its ___ below the surface, the ___ of the liquid and the acceleration due to ___.',
  acc: [['depth', 'height'], ['density'], ['gravity']],
  sol: 'Depth; density; gravity.',
  d: 1, c: 'recall', t: [2],
}));
add('lq-term', term({
  stem: 'Write the formula for the pressure at depth h in a liquid of density ρ.',
  model: r`$p = h \rho g$`, sol: 'p = h ρ g.', sch: 'Formula',
  d: 1, c: 'recall', t: [2],
}));
add('lq-short2a', short({
  marks: 2, wl: null,
  stem: 'State two factors on which the pressure at a point in a stationary liquid depends.',
  model: 'The **depth** of the point below the surface and the **density** of the liquid. (The acceleration due to gravity is also acceptable.)',
  sol: 'Any two of depth, density, g.',
  scheme: [['First factor', 1], ['Second factor', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('lq-short2b', short({
  marks: 2, wl: null,
  stem: 'Why is the wall of a dam made thicker at the bottom than at the top?',
  model: 'The pressure of the water **increases with depth**, so the push on the wall is greatest at the bottom. A **thicker base** is needed there to withstand it.',
  sol: 'Pressure increases with depth, so the base needs more strength.',
  scheme: [['Pressure increases with depth', 1], ['Thicker base to withstand the larger push', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('lq-short2c', short({
  marks: 2, wl: null,
  stem: 'Why must a deep-sea diver wear a special suit?',
  model: 'At great depths the **pressure of the water is very large**, because it grows with depth. The **strong suit** protects the diver’s body from this pressure.',
  sol: 'The pressure at depth is very large; the suit protects the body.',
  scheme: [['Large pressure at great depth', 1], ['Suit protects the body', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('lq-short3a', short({
  marks: 3, wl: null,
  stem: 'Show that the pressure at a depth h in a liquid of density ρ is h ρ g.',
  model: r`Take a column of the liquid of height $h$ and base area $A$. Its volume is $A h$ and its mass is $\rho A h$, so its weight, which is the thrust on the base, is $\rho A h g$.` + '\n\n' + r`Pressure $= \dfrac{\text{thrust}}{\text{area}} = \dfrac{\rho A h g}{A} = h \rho g$.`,
  sol: 'Volume A h; mass ρ A h; weight ρ A h g; divide by A.',
  scheme: [['Volume and mass of the column', 1], ['Weight as the thrust', 1], ['Division by A to give h ρ g', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('lq-short3b', short({
  marks: 3, wl: null,
  stem: 'A vessel holds water to a depth of 0.5 m and another vessel holds mercury to a depth of 0.04 m. Find the pressure due to each liquid at the bottom and say which is greater. (Density of water 1000 kg m⁻³, of mercury 13 600 kg m⁻³; g = 10 m s⁻²)',
  model: r`Water: $p = 0.5 \times 1000 \times 10 = ${K.WATER_P}$ Pa.` + '\n\n' + r`Mercury: $p = 0.04 \times 13600 \times 10 = ${K.HG_P}$ Pa.` + '\n\nThe **mercury** exerts the greater pressure, although its column is much shorter.',
  sol: '5000 Pa; 5440 Pa; mercury is greater.',
  scheme: [['5000 Pa', 1], ['5440 Pa', 1], ['Mercury greater', 1]],
  d: 3, c: 'application', t: [2],
}), () => K.WATER_P === 5000 && K.HG_P === 5440 || 'p');
add('lq-short3c', short({
  marks: 3, wl: null,
  stem: 'A tall vessel full of water has three small holes in its side, at different depths. Describe what is seen when the holes are opened, and explain it.',
  model: 'The water spurts out of all three holes, but the **jet from the lowest hole is the fastest and goes farthest**; the top jet is the weakest. This is because the **pressure of the liquid increases with depth** (p = h ρ g), so the water at the lowest hole is pushed out with the greatest force.',
  sol: 'Lowest jet fastest; pressure increases with depth.',
  scheme: [['Jets from all holes', 1], ['Lowest jet strongest', 1], ['Pressure increases with depth', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('num-sea', num({
  stem: 'Find the pressure due to the water at a depth of 12 m in the sea. (Density of sea water 1030 kg m⁻³; g = 10 m s⁻²)',
  value: K.N_SEA, tol: 0, unit: 'Pa',
  sol: r`$p = h \rho g = 12 \times 1030 \times 10 = ${K.N_SEA}$ Pa.`,
  scheme: [['p = h ρ g with substitution', 0.5], [`${K.N_SEA} Pa`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => K.N_SEA === 123600 || 'p');
add('num-kero', num({
  stem: 'Find the pressure due to kerosene at the bottom of a tank in which it is 0.35 m deep. (Density of kerosene 800 kg m⁻³; g = 10 m s⁻²)',
  value: K.N_KERO, tol: 0, unit: 'Pa',
  sol: r`$p = h \rho g = 0.35 \times 800 \times 10 = ${K.N_KERO}$ Pa.`,
  scheme: [['p = h ρ g with substitution', 0.5], [`${K.N_KERO} Pa`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => K.N_KERO === 2800 || 'p');
add('num-hg', num({
  stem: 'A column of mercury 0.30 m high stands in a vessel. Find the pressure due to the mercury at the bottom. (Density of mercury 13 600 kg m⁻³; g = 10 m s⁻²)',
  value: K.N_HG, tol: 0, unit: 'Pa',
  sol: r`$p = h \rho g = 0.30 \times 13600 \times 10 = ${K.N_HG}$ Pa.`,
  scheme: [['p = h ρ g with substitution', 0.5], [`${K.N_HG} Pa`, 0.5]],
  d: 2, c: 'application', t: [2],
}), () => K.N_HG === 40800 || 'p');
add('num-depth', num({
  stem: 'At what depth in a lake is the pressure due to the water 50 000 Pa? (Density of water 1000 kg m⁻³; g = 10 m s⁻²)',
  value: K.N_DEPTH, tol: 0, unit: 'm',
  sol: r`$h = \dfrac{p}{\rho g} = \dfrac{50000}{1000 \times 10} = ${K.N_DEPTH}$ m.`,
  scheme: [['h = p / (ρ g) with substitution', 0.5], [`${K.N_DEPTH} m`, 0.5]],
  d: 3, c: 'application', t: [2],
}), () => K.N_DEPTH === 5 || 'h');
add('num-density', num({
  stem: 'The pressure at a depth of 0.6 m in a liquid is 5400 Pa. Find the density of the liquid. (g = 10 m s⁻²)',
  value: K.N_RHO, tol: 0, unit: 'kg m⁻³',
  sol: r`$\rho = \dfrac{p}{h g} = \dfrac{5400}{0.6 \times 10} = ${K.N_RHO}$ kg m⁻³.`,
  scheme: [['ρ = p / (h g) with substitution', 0.5], [`${K.N_RHO} kg m⁻³`, 0.5]],
  d: 3, c: 'application', t: [2],
}), () => K.N_RHO === 900 || 'rho');
add('num-tank', num({
  stem: 'A tank has a rectangular base 3.0 m by 2.0 m and holds water to a depth of 0.8 m. Find the force of the water on the base. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)',
  value: K.N_TANK_F, tol: 0, unit: 'N',
  sol: r`$p = h \rho g = 0.8 \times 1000 \times 10 = ${K.N_TANK_P}$ Pa and $A = 3.0 \times 2.0 = 6$ m², so $F = p A = ${K.N_TANK_P} \times 6 = ${K.N_TANK_F}$ N.`,
  scheme: [['Pressure at the base', 0.5], [`F = p A = ${K.N_TANK_F} N`, 0.5]],
  d: 3, c: 'application', t: [1, 2],
}), () => K.N_TANK_F === 48000 || 'F');

// ---------------------------------------------------------------- t03 Pascal's law
add('pl-mcq1', mcq({
  stem: 'Pascal’s law states that pressure applied to an enclosed liquid is',
  right: 'transmitted equally and undiminished to every part of the liquid', wrong: ['transmitted only in the direction of the applied force', 'greatest at the point where it is applied', 'divided among the parts in proportion to their areas'],
  sol: 'This is the statement of Pascal’s law, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('pl-mcq2', mcq({
  stem: 'Which of the following is an example of the transmission of pressure in a liquid?',
  right: 'Squeezing a sealed bag of milk makes milk spurt from a pinhole anywhere in the bag', wrong: ['A knife cutting a fruit', 'A heavy truck running on broad tyres', 'A dam with a broad base'],
  sol: 'The pressure applied by the hand is passed on to every part of the milk, option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('pl-mcq3', mcq({
  stem: 'A force of 10 N acts on a piston of area 2 cm² in a closed vessel of liquid. The force on a second piston of area 40 cm² in the same vessel is',
  right: `${K.P3[0]} N`, wrong: [`${K.P3[1]} N`, `${K.P3[2]} N`, `${K.P3_X} N`],
  sol: r`$F_2 = F_1 \times \dfrac{A_2}{A_1} = 10 \times \dfrac{40}{2} = ${K.P3[0]}$ N, option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => K.P3[0] === 200 || 'F2');
add('pl-mcq4', mcq({
  stem: 'Liquids are used to transmit pressure because they are',
  right: 'almost incompressible', wrong: ['easily compressed', 'very light', 'always very hot'],
  sol: 'A liquid hardly changes its volume, so the pressure is passed on undiminished, option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('pl-mcq5', mcq({
  stem: 'A spherical rubber ball full of water has small holes all over it. When it is squeezed, water spurts out',
  right: 'from every hole, because the pressure is passed on to all parts of the water', wrong: ['only from the holes nearest the fingers', 'only from the holes at the top', 'only from the holes at the bottom'],
  sol: 'The pressure applied by the hand is transmitted equally in all directions, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));

add('th-mcq8', mcq({
  stem: 'A box of weight 90 N rests on a table, its base covering an area of 0.03 m². The pressure on the table is',
  right: `${K.TH8[0]} Pa`, wrong: [`${K.TH8[1]} Pa`, `${K.TH8[2]} Pa`, `${K.TH8[3]} Pa`],
  sol: r`$p = \dfrac{F}{A} = \dfrac{90}{0.03} = ${K.TH8[0]}$ Pa, option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => K.TH8[0] === 3000 || 'p');
add('lq-mcq8', mcq({
  stem: 'A jar holds oil of density 900 kg m⁻³ to a depth of 0.4 m. The pressure due to the oil at the bottom of the jar is (g = 10 m s⁻²)',
  right: `${sig(K.LQ8[0], 4)} Pa`, wrong: [`${sig(K.LQ8[1], 4)} Pa`, `${sig(K.LQ8[2], 4)} Pa`, `${sig(K.LQ8[3], 4)} Pa`],
  sol: r`$p = h \rho g = 0.4 \times 900 \times 10 = ${sig(K.LQ8[0], 4)}$ Pa, option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => sig(K.LQ8[0], 4) === 3600 || 'p');
add('lq-mcq9', mcq({
  stem: 'Two identical open jars hold the same liquid to depths of h and 2h. The pressures at the bottoms of the two jars are in the ratio',
  right: '1 : 2', wrong: ['2 : 1', '1 : 4', '1 : 1'],
  sol: 'The pressure is proportional to the depth, so the ratio is h : 2h = 1 : 2, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('pl-mcq6', mcq({
  stem: 'A force of 8 N acts on a piston of area 4 cm² in a closed vessel of liquid. The pressure transmitted through the liquid is',
  right: `${sig(K.PL6[0], 4)} Pa`, wrong: [`${sig(K.PL6[1], 4)} Pa`, `${sig(K.PL6[2], 3)} Pa`, `${sig(K.PL6[3], 4)} Pa`],
  sol: r`$p = \dfrac{F}{A} = \dfrac{8}{0.0004} = ${sig(K.PL6[0], 4)}$ Pa, option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => sig(K.PL6[0], 4) === 20000 || 'p');
add('pl-mcq7', mcq({
  stem: 'The two pistons of a closed liquid-filled vessel have areas A and 5A. A force F acts on the smaller piston. The force on the larger piston is',
  right: '5F', wrong: ['F', 'F/5', '25F'],
  sol: r`$F_2 = F \times \dfrac{5A}{A} = 5F$, option (@K).`,
  d: 2, c: 'application', t: [3],
}));
add('ar-pl', ar({
  a: 'At a given depth in a liquid, the pressure is the same in all directions.',
  r: 'Pressure is a vector quantity.',
  key: 'a',
  sol: '(A) is true; (R) is false because pressure is a scalar, option (a).',
  d: 2, c: 'analysis', t: [2, 3],
}));
add('pl-tf', tf({
  stem: 'In a closed vessel of liquid, the pressure on a large piston is greater than the pressure on a small piston.',
  key: 'f',
  sol: 'False. The pressure is the same on both; only the force is greater on the large piston.',
  d: 2, c: 'understanding', t: [3],
}));
add('pl-fill', fill({
  marks: 2,
  stem: 'Pressure applied to an enclosed liquid is transmitted ___ and ___ to every part of the liquid.',
  acc: [['equally'], ['undiminished']],
  sol: 'Equally; undiminished.',
  d: 1, c: 'recall', t: [3],
}));
add('pl-term', term({
  stem: 'Name the law which states that pressure applied to an enclosed liquid is transmitted equally to every part of it.',
  model: '**Pascal’s law**.', sol: 'Pascal’s law.', sch: 'Pascal’s law',
  d: 1, c: 'recall', t: [3],
}));
add('pl-short2', short({
  marks: 2, wl: null,
  stem: 'State Pascal’s law and give one example of the transmission of pressure by a liquid.',
  model: 'Pressure applied to an **enclosed liquid** is transmitted **equally and undiminished** to every part of the liquid and to the walls of the vessel. For example, pressing the plunger of a **syringe** raises the pressure throughout the liquid.',
  sol: 'Statement of the law; one example.',
  scheme: [['Statement of the law', 1], ['One example', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('pl-short3', short({
  marks: 3, wl: null,
  stem: 'A closed vessel of liquid has two pistons, of areas 5 cm² and 100 cm². A force of 20 N pushes the smaller piston. Find (a) the pressure transmitted through the liquid and (b) the force on the larger piston.',
  model: r`**(a)** $p = \dfrac{F_1}{A_1} = \dfrac{20}{0.0005} = ${K.S3_PT}$ Pa.` + '\n\n' + r`**(b)** $F_2 = p \times A_2 = ${K.S3_PT} \times 0.01 = ${K.S3_F2}$ N.` + '\n\nThe pressure is the same on both pistons; the force is larger on the larger area.',
  sol: '40 000 Pa; 400 N.',
  scheme: [['Areas in m²', 1], ['40 000 Pa', 1], ['400 N', 1]],
  d: 2, c: 'application', t: [3],
}), () => K.S3_PT === 40000 && K.S3_F2 === 400 || 'pistons');
add('num-pascal', num({
  stem: 'A force of 30 N acts on a piston of area 2 cm² in a closed vessel of liquid. Find the force on a piston of area 50 cm² in the same vessel.',
  value: K.N_PASC, tol: 0, unit: 'N',
  sol: r`$F_2 = F_1 \times \dfrac{A_2}{A_1} = 30 \times \dfrac{50}{2} = ${K.N_PASC}$ N.`,
  scheme: [['F₂ = F₁ A₂ / A₁ with substitution', 0.5], [`${K.N_PASC} N`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => K.N_PASC === 750 || 'F2');
add('num-pascal2', num({
  stem: 'A force of 40 N pushes a piston of area 8 cm² against a liquid in a closed vessel. Find the pressure transmitted to every part of the liquid, in pascal.',
  value: K.N_PASC2, tol: 0, unit: 'Pa',
  sol: r`$p = \dfrac{F}{A} = \dfrac{40}{0.0008} = ${K.N_PASC2}$ Pa.`,
  scheme: [['Area in m² and p = F / A', 0.5], [`${K.N_PASC2} Pa`, 0.5]],
  d: 2, c: 'application', t: [3],
}), () => K.N_PASC2 === 50000 || 'p');
add('units-match', match({
  marks: 5,
  stem: 'Match each item in Column A with the correct item in Column B.',
  pairs: [
    ['Thrust', 'newton'],
    ['Pressure', 'N m⁻²'],
    ['Pointed nail', 'small area, large pressure'],
    ['Dam thicker at the base', 'pressure increases with depth'],
    ['Broad strap of a heavy bag', 'large area, small pressure'],
  ],
  order: [1, 0, 4, 3, 2],
  sol: 'Thrust: newton; pressure: N m⁻²; nail: small area; dam: pressure increases with depth; strap: large area.',
  d: 2, c: 'understanding', t: [1, 2],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('long-block', long({
  marks: 10, wl: null,
  stem: `A student places a block of weight ${K.LB.w} N on soft sand in three ways. Its faces measure 30 cm × 15 cm, 30 cm × 6 cm and 15 cm × 6 cm.\n\n(a) Define thrust and pressure, and state the SI unit of pressure. [3]\n\n(b) Calculate the pressure on the sand when the block rests on each of the three faces. [4]\n\n(c) State, with a reason, the position in which the block sinks deepest into the sand. [2]\n\n(d) State the thrust on the sand in each position. [1]`,
  model: '**(a)** **Thrust** is the force acting perpendicular to a surface; **pressure** is the thrust on each unit of area; the SI unit of pressure is the **pascal** (N m⁻²).\n\n' + r`**(b)** Thrust $= ${K.LB.w}$ N. Areas: $450\ \text{cm}^2 = 0.045\ \text{m}^2$, $180\ \text{cm}^2 = 0.018\ \text{m}^2$, $90\ \text{cm}^2 = 0.009\ \text{m}^2$. $p = \dfrac{${K.LB.w}}{0.045} = ${K.LB_P[0]}$ Pa; $\dfrac{${K.LB.w}}{0.018} = ${K.LB_P[1]}$ Pa; $\dfrac{${K.LB.w}}{0.009} = ${K.LB_P[2]}$ Pa.` + '\n\n**(c)** On the **smallest face** (15 cm × 6 cm), because the same thrust acts on the smallest area and so gives the greatest pressure.\n\n' + `**(d)** **${K.LB.w} N** in every position, the weight of the block.`,
  sol: 'Definitions and Pa; 1200 Pa, 3000 Pa, 6000 Pa; smallest face; 54 N each.',
  scheme: [['Thrust defined', 1], ['Pressure defined', 1], ['Unit pascal', 1], ['Areas in m²', 1], ['1200 Pa', 1], ['3000 Pa', 1], ['6000 Pa', 1], ['Smallest face', 1], ['Smallest area, greatest pressure', 1], ['54 N in each position', 1]],
  d: 2, c: 'application', t: [1],
}), () => K.LB_P.join() === '1200,3000,6000' || 'block');
add('long-pascal', long({
  marks: 10, wl: null,
  stem: `The figure shows a closed vessel filled with a liquid and fitted with two pistons. Its parts are lettered A to E.\n\n(a) Name the parts A, B, C, D and E. [3]\n\n(b) State Pascal’s law. [2]\n\n(c) The areas of the pistons are ${K.LP.a1} cm² and ${K.LP.a2} cm², and the force D is ${K.LP.f1} N. Find the pressure in the liquid and the force E. [3]\n\n(d) Compare the pressure on the two pistons and the forces on them, and give one reason for using a liquid rather than a gas. [2]`,
  model: '**(a)** **A** is the small piston; **B** is the large piston; **C** is the liquid; **D** is the force pushing down on the small piston; **E** is the force on the large piston (upwards).\n\n**(b)** Pressure applied to an **enclosed liquid** is transmitted **equally and undiminished** to every part of the liquid and to the walls of the container.\n\n' + r`**(c)** $p = \dfrac{F}{A} = \dfrac{${K.LP.f1}}{0.0004} = ${K.LP_P}$ Pa. $E = p \times A_2 = ${K.LP_P} \times 0.008 = ${K.LP_F2}$ N.` + '\n\n**(d)** The **pressure is the same** on both pistons, but the **force on the large piston is greater** because its area is larger. A liquid is used because it is **almost incompressible**, so it transmits the pressure undiminished.',
  sol: 'A, B pistons; C liquid; D, E forces; Pascal’s law; 37 500 Pa and 300 N; equal pressure, larger force; incompressible.',
  scheme: [['A and B named', 1], ['C named', 1], ['D and E named', 1], ['Transmitted equally to every part', 1], ['Enclosed liquid, undiminished', 1], ['Areas in m² and p = F / A', 1], ['37 500 Pa', 1], ['300 N', 1], ['Same pressure, larger force', 1], ['Liquid is almost incompressible', 1]],
  d: 3, c: 'application', t: [3],
  assets: [pistonFig],
}), () => K.LP_P === 37500 && K.LP_F2 === 300 || 'pascal');
add('long-dam', long({
  marks: 10, wl: null,
  stem: 'A dam holds back a reservoir of water 40 m deep. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)\n\n(a) Explain why the wall of the dam is made broader at the base. [2]\n\n(b) Find the pressure due to the water at depths of 10 m and 30 m. [3]\n\n(c) Find the force of the water on a flat gate of area 2 m² fixed at a depth of 30 m. [2]\n\n(d) Another reservoir behind a different dam is much wider but also 40 m deep and holds the same kind of water. Compare the pressure at the base in the two reservoirs and give the reason. [3]',
  model: '**(a)** The pressure of the water **increases with depth**, so the push on the wall is greatest near the bottom. A **broad, strong base** is needed to withstand it.\n\n' + r`**(b)** $p = h \rho g$: at 10 m, $p = 10 \times 1000 \times 10 = ${K.DAM.p10}$ Pa; at 30 m, $p = 30 \times 1000 \times 10 = ${K.DAM.p30}$ Pa.` + '\n\n' + r`**(c)** $F = p A = ${K.DAM.p30} \times 2 = ${K.DAM.gateF}$ N.` + '\n\n**(d)** The pressures at the base are **equal**. The pressure depends only on the **depth, the density of the liquid and g**, not on the width of the reservoir or the amount of water.',
  sol: 'Pressure increases with depth; 100 000 Pa and 300 000 Pa; 600 000 N; equal pressure as depth is the same.',
  scheme: [['Pressure increases with depth', 1], ['Strong, broad base for the largest push', 1], ['p = h ρ g with substitution', 1], ['100 000 Pa', 1], ['300 000 Pa', 1], ['F = p A', 1], ['600 000 N', 1], ['Pressures equal', 1], ['Depends on depth, density and g only', 1], ['Width and quantity do not matter', 1]],
  d: 3, c: 'application', t: [2],
}), () => K.DAM.p10 === 100000 && K.DAM.p30 === 300000 && K.DAM.gateF === 600000 || 'dam');
add('long-jets', long({
  marks: 10, wl: null,
  stem: 'The figure shows a tall vessel of water with three small holes in its side, numbered 1, 2 and 3 from the top, at depths of 0.10 m, 0.20 m and 0.30 m below the water surface. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)\n\n(a) State which jet is the fastest, and what this shows about the pressure of a liquid. [2]\n\n(b) Calculate the pressure due to the water at hole 1 and at hole 3. [3]\n\n' + `(c) The water is replaced by brine of density 1200 kg m⁻³. Find the pressure at hole 3. [2]\n\n(d) Name one structure or person that has to allow for this effect, and say how. [2]\n\n(e) How does the pressure at hole 3 compare in the downward and sideways directions? [1]`,
  model: '**(a)** The jet from **hole 3** (the deepest) is the fastest. This shows that the **pressure of a liquid increases with depth**.\n\n' + r`**(b)** $p = h \rho g$: hole 1, $p = 0.10 \times 1000 \times 10 = ${K.SPURT[0]}$ Pa; hole 3, $p = 0.30 \times 1000 \times 10 = ${K.SPURT[2]}$ Pa.` + '\n\n' + r`**(c)** $p = 0.30 \times 1200 \times 10 = ${K.SPURT_BRINE}$ Pa.` + '\n\n**(d)** A **dam** is built with a broad base, or a **diver** wears a strong suit, because the pressure is greatest at the bottom or at depth.\n\n**(e)** The pressure is **equal in all directions** at a point, so it is the same downwards and sideways.',
  sol: 'Hole 3, pressure increases with depth; 1000 Pa and 3000 Pa; 3600 Pa; dam or diver; equal in all directions.',
  scheme: [['Hole 3 fastest', 1], ['Pressure increases with depth', 1], ['Substitution', 1], ['1000 Pa', 1], ['3000 Pa', 1], ['Substitution for brine', 1], ['3600 Pa', 1], ['Structure or person named', 1], ['How it allows for the pressure', 1], ['Equal in all directions', 1]],
  d: 3, c: 'application', t: [2],
  assets: [jetFig],
}), () => K.SPURT[0] === 1000 && K.SPURT[2] === 3000 && K.SPURT_BRINE === 3600 || 'jets');
add('long-tank', long({
  marks: 10, wl: null,
  stem: 'A rectangular tank with a base 2.0 m by 1.5 m is filled with water to a depth of 1.2 m. (Density of water 1000 kg m⁻³; g = 10 m s⁻²)\n\n(a) Find the pressure of the water at the base. [2]\n\n(b) Find the force of the water on the base. [2]\n\n(c) Find the weight of the water in the tank and compare it with your answer to (b). [3]\n\n(d) A second vessel has the same base area but its walls lean outwards, so it is wider at the top. It is filled with water to the same depth of 1.2 m. State, with reasons, how the pressure at its base and the force on its base compare with those in the tank, and whether the force on the base equals the weight of the water in it. [3]',
  model: r`**(a)** $p = h \rho g = 1.2 \times 1000 \times 10 = ${K.TANK_P}$ Pa.` + '\n\n' + r`**(b)** Area $= 2.0 \times 1.5 = 3.0$ m², so $F = p A = ${K.TANK_P} \times 3.0 = ${K.TANK_F}$ N.` + '\n\n' + r`**(c)** Volume $= 3.0 \times 1.2 = ${K.TANK_V}$ m³; mass $= 1000 \times ${K.TANK_V} = 3600$ kg; weight $= 3600 \times 10 = ${K.TANK_W}$ N. This **equals the force on the base**, as the walls are vertical.` + '\n\n**(d)** The **pressure is the same**, because it depends only on depth, density and g. The **force on the base is also the same**, since pressure and base area are unchanged. But the vessel holds **more water**, so its weight is **greater than the force on the base**: the sloping walls carry the weight of the extra water.',
  sol: '12 000 Pa; 36 000 N; 3.6 m³, 3600 kg, 36 000 N equal to (b); same pressure and force, weight greater.',
  scheme: [['p = h ρ g with substitution', 1], ['12 000 Pa', 1], ['F = p A', 1], ['36 000 N', 1], ['Volume and mass', 1], ['Weight 36 000 N', 1], ['Equal to the force on the base', 1], ['Pressure the same, with reason', 1], ['Force on the base the same', 1], ['Weight greater; sloping walls carry the extra', 1]],
  d: 4, c: 'analysis', t: [1, 2],
}), () => K.TANK_P === 12000 && K.TANK_F === 36000 && K.TANK_W === 36000 || 'tank');
add('long-diver', long({
  marks: 10, wl: null,
  stem: 'A diver works at a depth of 25 m in the sea. (Density of sea water 1030 kg m⁻³; g = 10 m s⁻²)\n\n(a) Find the pressure due to the water at this depth. [2]\n\n(b) Find the force of the water on a flat window of area 0.02 m² on her helmet. [2]\n\n(c) She descends to 50 m. Find the pressure there and say how it compares with that at 25 m. [3]\n\n(d) Explain why a diver needs a special suit. [2]\n\n(e) State the direction in which the water presses on her body. [1]',
  model: r`**(a)** $p = h \rho g = 25 \times 1030 \times 10 = ${K.DIVER.p25}$ Pa.` + '\n\n' + r`**(b)** $F = p A = ${K.DIVER.p25} \times 0.02 = ${K.DIVER.f}$ N.` + '\n\n' + r`**(c)** $p = 50 \times 1030 \times 10 = ${K.DIVER.p50}$ Pa, which is **twice** the pressure at 25 m, as the pressure is proportional to the depth.` + '\n\n**(d)** The pressure of the water at depth is **very large** and would harm the body; the **strong suit** protects it.\n\n**(e)** The water presses **equally from all directions**.',
  sol: '257 500 Pa; 5150 N; 515 000 Pa, double; pressure is large at depth; all directions.',
  scheme: [['Substitution', 1], ['257 500 Pa', 1], ['F = p A', 1], ['5150 N', 1], ['515 000 Pa', 1], ['Working', 1], ['Twice, proportional to depth', 1], ['Large pressure at depth', 1], ['Suit protects the body', 1], ['All directions', 1]],
  d: 3, c: 'application', t: [2],
}), () => K.DIVER.p25 === 257500 && K.DIVER.p50 === 515000 || 'diver');
