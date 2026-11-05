// ch09 notes and flashcards.
import { T, unit, PROV, r, dec, sci } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { PATM, RHO_HG, g } from './phys.mjs';
import { BARO, e1, e3, e4, e5, e6, s1, s2, s3, s4, s5, s6 } from './data.mjs';
import { V, TABLES, plotDepth, plotRange, plotTerm, plotCap } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Mechanical Properties of Fluids — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Pressure, pressure at a depth, and Pascal’s law',
      r`- **Pressure** $P = F/A$ is the normal force per unit area (scalar, unit pascal). In a fluid at rest it acts equally in all directions at a point.
- **Pressure at a depth** $h$ below a free surface: $P = P_0 + \rho g h$. The part $\rho g h$ is the **gauge pressure**; $P$ is the **absolute pressure**. It does not depend on the shape of the vessel, and points at the same level in a connected liquid at rest have the same pressure. For a tap ${e1.h} m below an open tank: gauge ${sci(e1.gauge, 4)} Pa, absolute ${sci(e1.abs, 4)} Pa.
- **Atmospheric pressure** $P_0 = ${sci(PATM, 4)}$ Pa $\approx 760$ mm of mercury. A barometer column has $h = P_0/\rho g$: ${dec(BARO.h, 3)} m for mercury (${RHO_HG} kg m$^{-3}$), ${dec(BARO.hw, 3)} m for water.
- **Pascal’s law:** a pressure change applied to an enclosed fluid is transmitted undiminished to every point of the fluid and to the container walls.
- **Hydraulic lift:** $F_2 = F_1 A_2/A_1$ and $A_1 d_1 = A_2 d_2$: a force multiplier, but work in equals work out. With radii 3.0 cm and 12 cm a force of ${dec(e3.F1, 3)} N supports ${dec(e3.W, 3)} N, and the narrow piston moves ${e3.d1} m for every ${e3.d2} m the load rises. **Hydraulic brakes** send one pedal push to every wheel through the same pressure.`,
      [kt('Gauge pressure', 'Absolute pressure minus atmospheric pressure; what a tyre gauge reads.'), kt('Barometer', 'A closed tube of mercury inverted in a trough; its vertical height gives the atmospheric pressure.'), kt('Pascal’s law', 'A pressure change in an enclosed fluid is transmitted undiminished everywhere in it.')],
      [fm(r`P = P_0 + \rho g h`, 'Pressure at a depth'), fm(r`\dfrac{F_1}{A_1} = \dfrac{F_2}{A_2}`, 'Hydraulic lift'), fm(r`P_0 = \rho g h`, 'Barometer')],
      V.depth,
      [1],
      [V.baro, V.lift, plotDepth, TABLES.T_UNITS, TABLES.T_E3],
    ),
    sec(
      '2. Streamline flow, continuity and Bernoulli’s principle',
      r`- In **streamline (steady) flow** each particle follows the same path (a streamline); streamlines do not cross. For an incompressible fluid the **equation of continuity** holds: $A_1 v_1 = A_2 v_2$. In a hose of radius 3.0 cm ending in a 1.5 cm nozzle, ${dec(e4.v1, 2)} m s$^{-1}$ becomes ${dec(e4.v2, 2)} m s$^{-1}$; the flow rate is ${sci(e4.Q, 3)} m$^3$ s$^{-1}$.
- **Bernoulli’s principle:** along a streamline of steady, non-viscous, incompressible flow, $P + \tfrac{1}{2}\rho v^2 + \rho g h$ is constant. At the same height, faster flow means lower pressure. It does not hold for turbulent or viscous flow.
- **Speed of efflux (Torricelli):** $v = \sqrt{2gh}$ for a hole at depth $h$ below an open surface (${dec(e5.v, 3)} m s$^{-1}$ at 0.50 m). The range on the ground is $R = 2\sqrt{h(H-h)}$, largest for $h = H/2$; here ${dec(e5.R, 3)} m.
- **Venturi meter:** the pressure drop in the throat gives the speed, $v_1 = \sqrt{2\Delta P/[\rho((A_1/A_2)^2 - 1)]}$; for areas in the ratio 4 and $\Delta P = ${dec(e6.dP, 4)}$ Pa the speeds are ${dec(e6.v1, 2)} and ${dec(e6.v2, 2)} m s$^{-1}$.
- **Dynamic lift:** faster air over the upper surface of an aerofoil gives lower pressure there, so the net force is upward; a spinning ball curves because of a similar pressure difference (Magnus effect).`,
      [kt('Streamline', 'The path followed by every particle that passes a given point in steady flow.'), kt('Equation of continuity', 'A v is constant along a tube of flow for an incompressible fluid.'), kt('Bernoulli’s principle', 'P + ½ρv² + ρgh is constant along a streamline in steady, non-viscous, incompressible flow.')],
      [fm(r`A_1 v_1 = A_2 v_2`, 'Continuity'), fm(r`P + \tfrac{1}{2}\rho v^2 + \rho g h = \text{constant}`, 'Bernoulli'), fm(r`v = \sqrt{2gh}`, 'Speed of efflux')],
      V.pipe,
      [2],
      [V.tank, plotRange, V.venturi, V.aero, TABLES.T_BERN, TABLES.T_APPS],
    ),
    sec(
      '3. Viscosity, Stokes’ law and terminal velocity',
      r`- **Viscosity** is the internal friction of a fluid. For a plate of area $A$ moving at speed $v$ over a layer of thickness $d$: $F = \eta A v/d$; $\eta$ has unit Pa s. Example: ${dec(s1.A, 2)} m$^2$, ${dec(s1.v, 2)} m s$^{-1}$, ${dec(s1.d * 1000, 2)} mm of oil with $\eta = ${dec(s1.eta, 2)}$ Pa s needs ${dec(s1.F, 2)} N. Liquids become less viscous when heated; gases more viscous.
- **Stokes’ law:** the drag on a small sphere is $F = 6\pi\eta r v$.
- **Terminal velocity:** a falling sphere reaches the constant speed at which weight = upthrust + drag, $v_t = 2r^2(\rho - \sigma)g/9\eta$. A steel ball of radius 1.0 mm in oil ($\sigma = ${s2.sg}$ kg m$^{-3}$, $\eta = ${dec(s2.eta, 2)}$ Pa s) has $v_t \approx ${dec(s2.vt * 100, 3)}$ cm s$^{-1}$. It varies as $r^2$ and as $1/\eta$.
- **Reynolds number** $Re = \rho v d/\eta$ decides the type of flow in a pipe: laminar below about 1000, turbulent above about 2000. Water in a 1.0 cm pipe at 0.05 m s$^{-1}$ has $Re = ${s3.Re1}$ (laminar); in a 1.5 cm pipe at 1.5 m s$^{-1}$, $Re = ${s3.Re2}$ (turbulent). The speed at which turbulence begins is the critical velocity.`,
      [kt('Coefficient of viscosity', 'The constant η in F = η A v/d; unit pascal second.'), kt('Terminal velocity', 'The constant speed reached when the net force on a falling body is zero.'), kt('Reynolds number', 'ρ v d / η: the ratio that decides whether flow is laminar or turbulent.')],
      [fm(r`F = \eta A \dfrac{v}{d}`, 'Viscous force'), fm(r`F = 6\pi\eta r v`, 'Stokes’ law'), fm(r`v_t = \dfrac{2r^2(\rho - \sigma)g}{9\eta}`, 'Terminal velocity'), fm(r`Re = \dfrac{\rho v d}{\eta}`, 'Reynolds number')],
      V.shear,
      [3],
      [V.stokes, plotTerm, TABLES.T_VISC, TABLES.T_TERM, TABLES.T_RE],
    ),
    sec(
      '4. Surface tension, surface energy, angle of contact and capillarity',
      r`- **Surface tension** $S = F/l$: the force per unit length on a line drawn on the surface (N m$^{-1}$); it is also the **surface energy** per unit area, $S = W/\Delta A$. A soap film with two surfaces pulls on a wire of length $l$ with $F = 2Sl$: for $l = ${dec(s4.l * 100, 2)}$ cm and $S = ${dec(s4.S, 2)}$ N m$^{-1}$, ${sci(s4.F, 3)} N; pulling it ${dec(s4.d * 100, 2)} cm does ${sci(s4.W, 3)} J of work.
- **Angle of contact** $\theta$: between the solid surface and the tangent to the liquid surface, measured inside the liquid. $\theta < 90^\circ$: the liquid wets the solid; $\theta > 90^\circ$: it does not (mercury on glass, about ${s6.th}$^\circ$).
- **Excess pressure:** drop or air bubble in a liquid $2S/R$; soap bubble (two surfaces) $4S/R$. A soap bubble of radius 1.5 cm with $S = 0.030$ N m$^{-1}$: ${s5.dPb} Pa.
- **Capillary rise:** $h = 2S\cos\theta/(\rho g r)$. Water ($\theta \approx 0^\circ$) in a tube of radius 0.50 mm rises ${dec(s6.h * 100, 3)} cm; mercury ($\theta = ${s6.th}^\circ$) in a 1.0 mm tube is depressed by ${dec(-s6.hHg * 1000, 3)} mm. The rise varies as $1/r$.
- Surface tension decreases as the temperature rises and when detergent is added; merging drops lose surface area and release energy.`,
      [kt('Surface tension', 'Force per unit length along a line on a liquid surface, or surface energy per unit area.'), kt('Angle of contact', 'The angle between the solid surface and the tangent to the liquid surface, measured inside the liquid.'), kt('Capillary rise', 'The rise (or fall) of a liquid in a narrow tube because of surface tension.')],
      [fm(r`S = \dfrac{F}{l}`, 'Surface tension'), fm(r`\Delta P = \dfrac{4S}{R}`, 'Soap bubble'), fm(r`h = \dfrac{2S\cos\theta}{\rho g r}`, 'Capillary rise')],
      V.film,
      [4],
      [V.contact, V.bubble, V.cap, plotCap, TABLES.T_S, TABLES.T_CONTACT],
    ),
  ],
  exam_tips_md: `- Say whether a pressure is gauge or absolute; add atmospheric pressure only for absolute.
- In hydraulic problems use the area ratio (radius squared); the distances move in the inverse ratio and work in = work out.
- Bernoulli needs steady, non-viscous, incompressible flow along one streamline; check it before using it.
- Terminal velocity uses the difference of densities, ρ − σ, and varies as the square of the radius.
- A soap film or soap bubble has two surfaces: use 2 S l and 4S/R.
- Convert mm and cm to metres before the capillary formula; a negative h means the liquid is depressed.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define pressure and give its SI unit.', 'Normal force per unit area, $P = F/A$; the pascal (N m⁻²).', 'concept', 1),
    fc(2, 'Write the pressure at depth h in a liquid open to the air.', '$P = P_0 + \\rho g h$; the part $\\rho g h$ is the gauge pressure.', 'formula', 1),
    fc(3, 'Does the pressure at the bottom of a vessel depend on its shape?', 'No: only on the depth, the density and g.', 'concept', 1),
    fc(4, `What is the gauge pressure at a tap ${e1.h} m below the free surface of water?`, `$\\rho g h$ = ${dec(e1.gauge, 4)} Pa (absolute: ${dec(e1.abs, 4)} Pa).`, 'example', 1),
    fc(5, 'Why does a barometer use mercury rather than water?', `Mercury is 13.6 times denser, so the column is only ${dec(BARO.h * 1000, 3)} mm instead of ${dec(BARO.hw, 3)} m.`, 'concept', 1),
    fc(6, 'State Pascal’s law.', 'A pressure change applied to an enclosed fluid is transmitted undiminished to every point of the fluid and to the container walls.', 'concept', 1),
    fc(7, 'In a hydraulic lift, how are the forces on the two pistons related?', '$F_2 = F_1 A_2/A_1$; the narrow piston also moves farther, so work in = work out.', 'formula', 1),
    fc(8, 'Why is the force on every wheel of a hydraulic brake equal for equal pistons?', 'The same pressure is transmitted through the fluid to each slave piston.', 'concept', 1),
    fc(9, 'What does steady (streamline) flow mean?', 'Each particle passing a point follows the same path, and streamlines never cross.', 'concept', 2),
    fc(10, 'Write the equation of continuity.', '$A_1 v_1 = A_2 v_2$ for an incompressible fluid.', 'formula', 2),
    fc(11, 'A hose of radius 3.0 cm ends in a nozzle of radius 1.5 cm. How do the speeds compare?', `The area falls to a quarter, so the speed rises to 4 times: ${dec(e4.v1, 2)} to ${dec(e4.v2, 2)} m s⁻¹.`, 'example', 2),
    fc(12, 'State Bernoulli’s equation.', '$P + \\tfrac{1}{2}\\rho v^2 + \\rho g h$ = constant along a streamline.', 'formula', 2),
    fc(13, 'Name the conditions for Bernoulli’s equation.', 'Steady flow of an incompressible, non-viscous fluid along a streamline.', 'concept', 2),
    fc(14, 'What is the speed of efflux from a hole at depth h in an open tank?', '$v = \\sqrt{2gh}$ (Torricelli), the same as a free fall through h.', 'formula', 2),
    fc(15, 'Where must a hole be in a tank of depth H for the largest range?', 'At h = H/2; the range is then H.', 'fact', 2),
    fc(16, 'Why does an aerofoil get lift?', 'Air above it is faster, so the pressure is lower than below; the pressure difference times the area is an upward force.', 'concept', 2),
    fc(17, 'What is viscosity?', 'The internal friction of a fluid, opposing the relative motion of its layers.', 'concept', 3),
    fc(18, 'Write the viscous force on a plate of area A moving at v over a film of thickness d.', '$F = \\eta A v/d$.', 'formula', 3),
    fc(19, 'How does the viscosity of a liquid change when it is heated? Of a gas?', 'A liquid becomes less viscous; a gas becomes more viscous.', 'fact', 3),
    fc(20, 'State Stokes’ law.', 'The viscous drag on a small sphere of radius r moving at speed v is $6\\pi\\eta r v$.', 'formula', 3),
    fc(21, 'What forces balance when a sphere falls at terminal velocity?', 'Weight downward = upthrust + viscous drag upward.', 'concept', 3),
    fc(22, 'How does the terminal velocity depend on the radius?', '$v_t \\propto r^2$: doubling the radius makes it 4 times larger.', 'concept', 3),
    fc(23, 'Write the Reynolds number and the values that mark laminar and turbulent flow.', '$Re = \\rho v d/\\eta$; laminar below about 1000, turbulent above about 2000.', 'formula', 3),
    fc(24, 'Define surface tension.', 'Force per unit length along a line on the liquid surface (also the surface energy per unit area); unit N m⁻¹.', 'concept', 4),
    fc(25, 'A soap film pulls on a wire of length l. Why is the force 2Sl?', 'The film has two surfaces, each pulling with S per unit length.', 'concept', 4),
    fc(26, 'What is the angle of contact and what does θ > 90° mean?', 'The angle between the solid and the tangent to the liquid surface, measured inside the liquid; the liquid does not wet the solid.', 'concept', 4),
    fc(27, 'Write the excess pressure in a liquid drop and in a soap bubble.', 'Drop: $2S/R$. Soap bubble (two surfaces): $4S/R$.', 'formula', 4),
    fc(28, 'Write the capillary rise formula.', '$h = 2S\\cos\\theta/(\\rho g r)$.', 'formula', 4),
    fc(29, 'Why is mercury depressed in a glass tube?', `Its angle of contact (about ${s6.th}°) is above 90°, so cos θ is negative and the meniscus is convex.`, 'concept', 4),
    fc(30, 'Exam tip: how many surfaces does a soap bubble have, and what follows?', 'Two surfaces, so use 4S/R (not 2S/R) for the excess pressure.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
