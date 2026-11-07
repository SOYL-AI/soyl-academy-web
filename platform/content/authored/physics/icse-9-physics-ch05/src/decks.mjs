// ICSE 9 Physics ch05 Pressure in Fluids. Deck 1: thrust, pressure and the pressure of a liquid column (t01, t02).
// Deck 2: factors, everyday applications and Pascal's law (t02, t03). Numbers come from calc.mjs; narration carries no
// digits, symbols or unit abbreviations.
import { sl, deck, table, flow, plot, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { BRICKS, JETS, VESSELS, PISTONS } from './svgs.mjs';
import { BRICK_FACES, BRICK_W, D1_W, D1_A, D1_P, D1_P1, D1_H, D1_PL, PLOT_PTS, D2_H, D2_A, D2_P, D2_F, D2_F1, D2_A1, D2_A2, D2_PT, D2_F2, VESSEL_P } from './calc.mjs';

export const V = {
  bricks: svgV(BRICKS, 'The same brick on a sponge in three positions, with the base area, the pressure and the depth of the dent'),
  jets: svgV(JETS, 'A tall vessel with three side holes at different depths; the deeper the hole the faster the jet'),
  vessels: svgV(VESSELS, 'Three vessels of different shapes filled to the same height, with the same pressure at the base'),
  pistons: svgV(PISTONS, 'A closed vessel of liquid with a small piston and a large piston'),
};

export const deck1 = deck({
  part: 1,
  title: 'Pressure in Fluids — Part 1: Thrust, pressure and liquid columns',
  goals: [
    'Distinguish thrust from pressure and calculate pressure as thrust per unit area',
    'Explain why sharp knives cut better and why heavy vehicles have broad tyres',
    'Calculate the pressure at a depth in a liquid using p = h rho g',
  ],
  slides: [
    sl('title', 'Why does a pin go in so easily?', {
      b: 'Part 1 — the same push can do very different jobs depending on the area it acts on.',
      v: flow('LR', [['a', 'Force on a surface'], ['b', 'Area of contact'], ['c', 'Pressure']], [['a', 'c'], ['b', 'c']], 'Flow showing that force and area together decide the pressure'),
      n: 'Push a drawing pin with your thumb and the point goes into the board. Push the same pin the other way round and nothing happens. The force is the same. What changed is the area it acts on.',
    }),
    sl('concept', 'Thrust and pressure', {
      b: '**Thrust** is the force acting **perpendicular** to a surface. **Pressure** is the **thrust acting on unit area**: $p = \\dfrac{F}{A}$. The SI unit of pressure is the **pascal (Pa)**, which is one newton per square metre.',
      v: table(['Quantity', 'Symbol', 'SI unit'], [['Thrust', 'F', 'newton (N)'], ['Area', 'A', 'square metre (m²)'], ['Pressure', 'p', 'pascal (Pa), 1 Pa = 1 N m⁻²']], 'Table of thrust, area and pressure with their symbols and SI units'),
      m: [r`p = \dfrac{F}{A}`],
      n: 'Thrust is the force pressing at right angles on a surface. Divide it by the area it presses on and you get pressure. One newton on every square metre is one pascal.',
    }),
    sl('concept', 'A brick on a sponge', {
      b: `A brick weighing ${BRICK_W} N is placed on a sponge in three ways. The **thrust is the same** each time, but the **area** is different, so the pressure and the dent are different.`,
      v: V.bricks,
      n: 'The brick always weighs the same, so the thrust never changes. Lying flat it spreads the weight over a large area and makes a shallow dent. Standing on its end it uses a small area and presses the hardest.',
    }),
    sl('check', 'Quick check: which face presses most?', {
      b: 'Look at the three positions of the brick.',
      v: table(['Position', 'Area of contact', 'Pressure'], BRICK_FACES.map((f) => [f.name, `${f.a} cm²`, `${f.p} Pa`]), 'Table of the area and pressure for each position of the brick'),
      chk: 'chk-brick',
      n: 'A brick can rest on any of its faces. Which face gives the greatest pressure on the sponge?',
    }),
    sl('concept', 'Increasing and reducing pressure', {
      b: 'To get a **large pressure**, make the area **small**. To get a **small pressure**, make the area **large**.',
      v: table(['Everyday example', 'What is done to the area', 'Result'], [['Knife, needle, nail', 'Edge or point has a very small area', 'Large pressure, so it cuts or pierces'], ['Broad tyres of a heavy truck', 'Large area of contact with the road', 'Smaller pressure, so the tyre does not sink'], ['Wide strap of a heavy school bag', 'Large area on the shoulder', 'Smaller pressure, more comfortable']], 'Table of three everyday examples of increasing and reducing pressure by changing the area'),
      n: 'A sharp knife has an edge with almost no area, so even a gentle push gives a huge pressure. A heavy truck has broad tyres to spread its weight, and a wide bag strap spreads the load on your shoulder.',
    }),
    sl('example', 'Worked example 1: a girl standing on the floor', {
      b: r`**Problem.** A girl weighs ${D1_W} N. The soles of both her feet cover ${D1_A} m². Find the pressure on the floor when she stands on both feet and when she lifts one foot.

**Step 1.** Thrust $F = ${D1_W}$ N. On both feet: $p = \dfrac{F}{A} = \dfrac{${D1_W}}{${D1_A}} = ${D1_P}$ Pa.

**Step 2.** On one foot the area is halved, so $p = \dfrac{${D1_W}}{${D1_A / 2}} = ${D1_P1}$ Pa.`,
      v: table(['Case', 'Area', 'Pressure'], [['Both feet', `${D1_A} m²`, `${D1_P} Pa`], ['One foot', `${D1_A / 2} m²`, `${D1_P1} Pa`]], 'Table of the area and pressure when the girl stands on two feet and on one foot'),
      n: 'Her weight is the thrust on the floor. Divide it by the area of both feet to get twenty thousand pascal. Lift one foot, the area halves, and the pressure doubles to forty thousand pascal.',
    }),
    sl('check', 'Quick check: the unit of pressure', {
      b: 'Pressure is thrust divided by area.',
      v: table(['Thrust', 'Area', 'Pressure'], [['N', 'm²', '?']], 'Table showing thrust in newton and area in square metre giving a unit for pressure'),
      chk: 'chk-unit',
      n: 'Thrust is measured in newtons and area in square metres. Which of the options is the same as one pascal?',
    }),
    sl('concept', 'Pressure inside a liquid', {
      b: 'A liquid presses on the **bottom** and on the **walls** of its container, and the pressure acts **in all directions**. At a greater depth the liquid has more weight above it, so the pressure is **greater**. A jet from a lower hole is faster.',
      v: V.jets,
      n: 'In the vessel with three holes, the water from the lowest hole shoots out fastest and lands farthest. The deeper we go, the more water lies above, and the greater is the pressure.',
    }),
    sl('concept', 'Pressure of a liquid column: p = h rho g', {
      b: 'Take a column of liquid of height $h$ and base area $A$ and density $\\rho$. Its weight is the thrust on the base.',
      v: table(['Step', 'Working'], [['Volume of the column', 'A × h'], ['Mass', 'density × volume = ρ A h'], ['Weight (thrust)', 'ρ A h g'], ['Pressure = thrust ÷ area', 'ρ A h g ÷ A = h ρ g']], 'Table of the steps that give the pressure of a liquid column as h rho g'),
      m: [r`p = h \rho g`],
      n: 'The weight of the column is density times area times height times gee. Divide by the area and the area cancels. The pressure is height times density times gee. It does not depend on the width of the column at all.',
    }),
    sl('example', 'Worked example 2: pressure at the bottom of a lake', {
      b: r`**Problem.** Find the pressure due to the water at a depth of ${D1_H} m in a lake. ($\rho = 1000$ kg m⁻³, $g = 10$ m s⁻²)

**Step 1.** $p = h \rho g = ${D1_H} \times 1000 \times 10$.

**Step 2.** $p = ${D1_PL}$ Pa.`,
      v: table(['Quantity', 'Value'], [['Depth h', `${D1_H} m`], ['Density of water', '1000 kg m⁻³'], ['g', '10 m s⁻²'], ['Pressure', `${D1_PL} Pa`]], 'Table of the data and the answer for the pressure at the bottom of a lake'),
      n: 'Multiply the depth, the density and gee. Eight metres times one thousand times ten gives eighty thousand pascal. Always keep the units in kilograms per cubic metre and metres.',
    }),
    sl('check', 'Quick check: doubling the depth', {
      b: 'Use p = h ρ g and think about what stays the same.',
      v: table(['Depth', 'Pressure'], [['h', 'p'], ['2h', '?']], 'Table asking for the pressure at twice the depth'),
      chk: 'chk-depth',
      n: 'A diver goes down from a certain depth to twice that depth in the same lake. What happens to the pressure due to the water?',
    }),
    sl('concept', 'Pressure grows steadily with depth', {
      b: 'In water, the pressure rises by **10 000 Pa for every metre** of depth ($\\rho g = 1000 \\times 10$). The graph of $p$ against $h$ is a **straight line through the origin**.',
      v: plot({ x: { min: 0, max: 10, label: 'depth h (m)' }, y: { min: 0, max: 100000, label: 'pressure p (Pa)' }, functions: [{ expr: '10000x', label: 'p = 10000 h', domain: [0, 10] }], points: PLOT_PTS.map(([x, y]) => ({ at: [x, y], label: `${x} m, ${y} Pa` })) }, 'Straight-line graph of liquid pressure against depth for water, through the origin and reaching eighty thousand pascal at eight metres', 'Pressure is proportional to depth.'),
      n: 'Because density and gee do not change, the pressure grows in step with depth. The graph is a straight line through the origin. Double the depth and the pressure is doubled.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Thrust is the force perpendicular to a surface; pressure is thrust per unit area, p = F / A.',
        'The SI unit of pressure is the pascal: 1 Pa = 1 N m⁻².',
        'A small area gives a large pressure; a large area gives a small pressure.',
        'A liquid column of height h exerts pressure p = h ρ g, and pressure increases with depth.',
      ],
      v: table(['Quantity', 'Formula', 'Unit'], [['Pressure', 'F / A', 'Pa'], ['Pressure of a liquid column', 'h ρ g', 'Pa']], 'Summary table of the two pressure formulae'),
      n: 'To sum up Part one. Thrust is a force at right angles to a surface. Pressure is thrust divided by area, measured in pascals. Liquids press harder at greater depth, and the pressure of a column is height times density times gee.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Convert the area to square metres before you divide: 1 cm² = 0.0001 m².',
        'Use the weight of the body as the thrust when it rests on a surface.',
        'Write density in kg m⁻³ and height in metres in p = h ρ g.',
        'For reasons, always mention the area: small area, large pressure.',
      ],
      v: table(['Slip', 'Fix'], [['Using area in cm² with newton and calling the answer Pa', 'Change to m² first'], ['Using the mass instead of the weight as thrust', 'Multiply the mass by g'], ['Forgetting the unit of pressure', 'Write Pa or N m⁻²']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Change square centimetres to square metres before dividing. When a body rests on a surface, its weight is the thrust, not its mass. And in every explanation, mention the area.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Pressure in Fluids — Part 2: Liquid pressure in use, and Pascal’s law',
  goals: [
    'State the factors on which pressure in a stationary liquid depends and those on which it does not',
    'Explain why a dam is broader at the base and why a diver needs a special suit',
    'State Pascal’s law and solve simple problems on force and pressure transmitted through a liquid',
  ],
  slides: [
    sl('title', 'Why is a dam thicker at the bottom?', {
      b: 'Part 2 — what decides the pressure in a liquid, and how a liquid passes pressure on.',
      v: flow('LR', [['a', 'Depth, density, g'], ['b', 'Pressure at a point'], ['c', 'Passed on equally by the liquid']], [['a', 'b'], ['b', 'c']], 'Flow from depth, density and g to pressure at a point to pressure passed on equally'),
      n: 'Look at a dam from the side. It is thin at the top and very thick at the bottom. The builders were using what we shall learn now about pressure in liquids.',
    }),
    sl('concept', 'What the pressure depends on', {
      b: 'The pressure at a point in a stationary liquid depends on the **depth**, the **density** of the liquid and the **acceleration due to gravity**. It does **not** depend on the shape of the vessel, the area of its base or the total amount of liquid.',
      v: table(['Depends on', 'Does not depend on'], [['Depth h of the point', 'Shape of the vessel'], ['Density ρ of the liquid', 'Area of the base'], ['g at the place', 'Total volume or weight of liquid']], 'Table of the factors that decide liquid pressure and those that do not'),
      n: 'Only three things matter: how deep the point is, how dense the liquid is, and the pull of gravity. A narrow tube and a wide tank of the same depth give exactly the same pressure at the bottom.',
    }),
    sl('concept', 'Three vessels, one pressure', {
      b: `Vessels of different shape are filled to the **same height**. The pressure at the base is the **same** in all of them: here ${VESSEL_P} Pa.`,
      v: V.vessels,
      n: 'The three vessels have different shapes and hold different amounts of water. The depth is the same, so the pressure at the base is the same in each. Shape and quantity have no effect.',
    }),
    sl('check', 'Quick check: shape does not matter', {
      b: 'Think about which factor changes between the vessels.',
      v: table(['Vessel', 'Depth of liquid'], [['Narrow tube', 'same'], ['Wide tank', 'same'], ['Funnel', 'same']], 'Table showing that three different vessels have the same depth of liquid'),
      chk: 'chk-shape',
      n: 'A narrow tube, a wide tank and a funnel are filled with the same liquid to the same height. How do the pressures at their bases compare?',
    }),
    sl('concept', 'Pressure at one depth acts in all directions', {
      b: 'At a given depth, the pressure is the **same in every direction**: up, down and sideways. Points at the **same depth** in the same liquid have the **same pressure**.',
      v: table(['Observation', 'What it shows'], [['A bubble released at the bottom is squeezed equally on all sides', 'Pressure acts equally in all directions'], ['Water in a U-tube stands at the same level in both arms', 'Equal pressure at equal depth'], ['A jet from a hole near the bottom is stronger than from a hole near the top', 'Pressure increases with depth']], 'Table of three observations and what each shows about liquid pressure'),
      n: 'A tiny bubble deep in water is squeezed from every side by the same amount. Water in the two arms of a U-tube settles at the same level. And jets from lower holes are stronger. All three come from the same idea.',
    }),
    sl('concept', 'Dams and divers', {
      b: 'Because pressure grows with depth, the water presses much harder near the **base** of a dam. A deep-sea diver faces a large pressure on her body and needs a **strong special suit**.',
      v: table(['Situation', 'Reason'], [['Dam wall broader at the base', 'The pressure of the water is greatest at the bottom, so the wall must be strongest there'], ['Diver wears a special suit', 'The pressure at depth is very large and can harm the body'], ['Deep-sea fish have strong bodies', 'They live where the pressure is huge']], 'Table of three situations and the reason for each in terms of pressure and depth'),
      n: 'The deeper the water, the greater the pressure, so a dam needs a thick base to withstand the largest push. In the same way a diver needs a strong suit at great depths.',
    }),
    sl('example', 'Worked example 1: force on a window under water', {
      b: r`**Problem.** A flat window of area ${D2_A} m² is fixed in the side of a tank at a depth of ${D2_H} m in water. Find the pressure there and the force on the window. ($\rho = 1000$ kg m⁻³, $g = 10$ m s⁻²)

**Step 1.** $p = h \rho g = ${D2_H} \times 1000 \times 10 = ${D2_P}$ Pa.

**Step 2.** $F = p \times A = ${D2_P} \times ${D2_A} = ${D2_F}$ N.`,
      v: table(['Step', 'Working', 'Result'], [['Pressure', `${D2_H} × 1000 × 10`, `${D2_P} Pa`], ['Force', `${D2_P} × ${D2_A}`, `${D2_F} N`]], 'Table of the working for the pressure and the force on the window'),
      n: 'First find the pressure at that depth, which is two hundred thousand pascal. The force is pressure times area, so it is one hundred thousand newtons, about the weight of ten tonnes.',
    }),
    sl('concept', 'Liquids pass on pressure', {
      b: 'When pressure is applied to a liquid in a **closed** vessel, the liquid passes it on to **every part** of the liquid and to the walls. A sealed bottle with holes sends out equal jets all round when it is squeezed.',
      v: table(['Place the pressure is applied', 'What happens in the liquid'], [['Piston pushing on a sealed syringe of water', 'Pressure rises everywhere inside'], ['Squeezing a sealed plastic bag of milk', 'Milk is forced out of any hole with equal pressure'], ['A hole in a squeezed ball full of water', 'Jets start from every hole']], 'Table of examples in which pressure applied to a liquid is passed on'),
      n: 'Squeeze a sealed bag of milk and the pressure you apply reaches every corner. That is why milk jets out of a hole wherever it is. Liquids hardly compress, so they carry the pressure on.',
    }),
    sl('concept', 'Pascal’s law', {
      b: 'Pressure applied to an **enclosed liquid** is transmitted **equally and undiminished** to every part of the liquid and to the walls of the container. If a force $F_1$ acts on a piston of area $A_1$, the pressure $\\dfrac{F_1}{A_1}$ also acts on a piston of area $A_2$, giving $F_2 = \\dfrac{F_1}{A_1} \\times A_2$.',
      v: V.pistons,
      n: 'Push the small piston and the liquid carries that pressure to the large piston. The pressure is the same on both. A larger area under the same pressure means a larger force.',
    }),
    sl('check', 'Quick check: what Pascal’s law says', {
      b: 'Think about what is passed on and what is the same everywhere.',
      v: table(['Piston', 'Force', 'Area'], [['Small', 'F₁', 'A₁'], ['Large', 'F₂', 'A₂']], 'Table of the force and area of the small and large pistons'),
      chk: 'chk-pascal',
      n: 'Which statement agrees with Pascal’s law?',
    }),
    sl('example', 'Worked example 2: force transmitted through a liquid', {
      b: r`**Problem.** A force of ${D2_F1} N acts on a piston of area ${D2_A1} cm² in a liquid-filled closed vessel. Find the force on a piston of area ${D2_A2} cm² in the same vessel.

**Step 1.** Pressure $p = \dfrac{F_1}{A_1} = \dfrac{${D2_F1}}{${D2_A1 / 10000}} = ${D2_PT}$ Pa.

**Step 2.** $F_2 = p \times A_2 = ${D2_PT} \times ${D2_A2 / 10000} = ${D2_F2}$ N.`,
      v: table(['Step', 'Working', 'Result'], [['Pressure', `${D2_F1} ÷ ${D2_A1 / 10000}`, `${D2_PT} Pa`], ['Force on the large piston', `${D2_PT} × ${D2_A2 / 10000}`, `${D2_F2} N`]], 'Table of the working for the pressure and the force on the larger piston'),
      n: 'Change the areas to square metres first. The pressure is the force divided by the small area. The same pressure acts on the large area, so multiply by it to find the larger force.',
    }),
    sl('check', 'Quick check: force from pressure', {
      b: 'The pressure is the same everywhere in the liquid.',
      v: table(['Piston', 'Area'], [['Small', '1 cm²'], ['Large', '10 cm²']], 'Table of the areas of a small and a large piston'),
      chk: 'chk-force',
      n: 'A force of five newtons acts on a piston of area one square centimetre. What force acts on a piston of area ten square centimetres?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Pressure in a stationary liquid depends on depth, density and g, not on shape, base area or quantity.',
        'Points at the same depth in a liquid have the same pressure, acting in all directions.',
        'Dams are broader at the base and divers wear strong suits because pressure increases with depth.',
        'Pascal’s law: pressure applied to an enclosed liquid is transmitted equally and undiminished everywhere.',
      ],
      v: table(['Idea', 'Result'], [['Same depth, same liquid', 'Same pressure'], ['Pressure on a piston', 'F ÷ A'], ['Transmitted pressure', 'Same on every piston']], 'Summary table of the three main ideas of part two'),
      n: 'To sum up Part two. Depth, density and gee decide liquid pressure. It is the same at the same depth and acts in every direction. Dams and diver suits follow from this. And Pascal’s law says that a liquid carries applied pressure on equally to every part.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Do not mention the shape of the vessel as a factor that changes the pressure.',
        'In Pascal problems, find the pressure first, then use it for the second piston.',
        'Convert cm² to m² before dividing force by area.',
        'Give the reason for a dam or a diver in terms of pressure increasing with depth.',
      ],
      v: table(['Slip', 'Fix'], [['Saying a wider vessel has more pressure at the base', 'Only depth, density and g matter'], ['Using the same force on both pistons', 'The same pressure acts on both, not the same force'], ['Leaving out the reason for a thick dam base', 'Pressure increases with depth']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Shape and quantity of liquid never change the pressure at a given depth. In Pascal sums, find the pressure first. Change the units of area. And explain dams and divers by saying that pressure increases with depth.',
    }),
  ],
});
