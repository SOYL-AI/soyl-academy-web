// ch10 notes and flashcards.
import { T, unit, PROV, r, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { CW, CICE, LF, LV, ALPHA } from './phys.mjs';
import { V, EX, plotDensity, plotHeat, plotCoolTea, plotCool2, TABLES } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11 } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Thermal Properties of Matter — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Temperature, heat and thermal expansion',
      r`- **Temperature** shows how hot a body is and fixes the direction of heat flow. **Heat** is energy transferred because of a temperature difference (SI unit joule; 1 cal = 4.186 J). A body has internal energy, not “heat”.
- **Scales:** $\dfrac{t_C}{100} = \dfrac{t_F - 32}{180} = \dfrac{T - 273.15}{100}$. A change of 1 K = 1 °C = 1.8 °F. For example $${ex1.F}\ ^\circ\text{F} = ${ex1.C}\ ^\circ\text{C} = ${dec(ex1.K, 5)}$ K.
- **Linear expansion:** $\Delta L = \alpha L_0 \Delta T$; area $\Delta A = \beta A_0 \Delta T$ with $\beta = 2\alpha$; volume $\Delta V = \gamma V_0 \Delta T$ with $\gamma = 3\alpha$ (small $\alpha\Delta T$). The coefficients are in K⁻¹. A hole expands like a disc of the same material.
- A ${ex2.L0} m steel girder (α = 1.2 × 10⁻⁵ K⁻¹) heated by ${ex2.dT} K lengthens by ${dec(ex2.dLmm, 4)} mm; a ${ex3.d0} cm hole in aluminium heated by ${ex3.dT} K grows to ${dec(ex3.d, 4)} cm (area up by ${dec(ex3.frac * 100, 3)} %).
- **Applications:** bimetallic strip (the metal with the larger α is on the outside of the curve), expansion gaps, shrink fitting, liquid-in-glass thermometers.
- **Anomalous expansion of water:** from 0 °C to about 4 °C, water contracts on heating; its density is greatest at about 4 °C. A pond therefore freezes from the top, and the floating ice insulates the water below at about 4 °C.`,
      [kt('Temperature', 'A measure of hotness; it decides which way heat flows between bodies in contact.'), kt('Coefficient of linear expansion', 'Fractional change in length per kelvin, α = ΔL/(L₀ΔT); unit K⁻¹.'), kt('Anomalous expansion', 'Water contracts on heating between 0 °C and about 4 °C; its density is greatest at 4 °C.')],
      [fm(r`\Delta L = \alpha L_0 \Delta T`, 'Linear expansion'), fm(r`\beta = 2\alpha,\ \gamma = 3\alpha`, 'Area and volume coefficients'), fm(r`T = t_C + 273.15`, 'Kelvin scale')],
      V.scales,
      [1],
      [V.expan, V.bimetal, plotDensity, V.pond, TABLES.T_ALPHA],
    ),
    sec(
      '2. Specific heat, calorimetry and change of state',
      r`- **Specific heat capacity** c: heat per kilogram per kelvin; $Q = mc\Delta T$, unit J kg⁻¹ K⁻¹. **Heat capacity** $C = mc$ (J K⁻¹). Water: ${CW} J kg⁻¹ K⁻¹ (used here). Water’s large c makes it a good coolant and heat store.
- **Calorimetry:** in an insulated vessel, heat lost = heat gained. Include the calorimeter’s own $mc$. Example: a ${ex5.ms} kg sample at ${ex5.Ts} °C placed in water and an aluminium calorimeter that settle at ${ex5.Tf} °C has $c \approx ${dec(ex5.c, 4)}$ J kg⁻¹ K⁻¹.
- **Latent heat:** $Q = mL$ at constant temperature. $L_f = ${LF}$ J kg⁻¹ (ice), $L_v = ${LV}$ J kg⁻¹ (water). Condensation and freezing release the same heat. **Sublimation** is solid → vapour directly (camphor, naphthalene). Boiling point rises with pressure (pressure cooker).
- **Heating curve** of ${ex6.m} kg of ice at ${ex6.T0} °C at ${ex6.P} W: ${dec(ex6.t1, 3)} s warming the ice, ${dec(ex6.t2, 4)} s melting (flat), ${dec(ex6.t3, 4)} s warming the water, ${dec(ex6.t4, 4)} s boiling (flat), ${dec(ex6.t5, 3)} s warming the steam: ${ex6.q} J in all.
- **Mixtures with a change of state:** ${ex7.ms} kg of steam into ${ex7.mw} kg of water at ${ex7.Tw} °C gives about ${dec(ex7.T, 4)} °C. First check whether all the ice melts or all the steam condenses before solving for a final temperature.
- Bucket heater: ${ex4.m} kg of water from ${ex4.T1} to ${ex4.T2} °C needs ${ex4.Q} J, which a ${ex4.P} W heater supplies in ${dec(ex4.t, 3)} s.`,
      [kt('Specific heat capacity', 'Heat needed to raise the temperature of 1 kg of a substance by 1 K, with no change of state.'), kt('Latent heat', 'Heat absorbed or released per kilogram during a change of state at constant temperature.'), kt('Calorimetry', 'The measurement of heat exchanged, based on heat lost = heat gained in an insulated vessel.')],
      [fm(r`Q = mc\Delta T`, 'Heat for a temperature change'), fm(r`Q = mL`, 'Heat for a change of state'), fm(r`\text{heat lost} = \text{heat gained}`, 'Principle of calorimetry')],
      plotHeat,
      [2],
      [TABLES.T_C, TABLES.F_CAL, TABLES.T_L, TABLES.T_EX6, TABLES.T_EX7],
    ),
    sec(
      '3. Heat transfer: conduction, convection and radiation',
      r`- **Conduction:** steady heat current $H = \dfrac{KA(T_1 - T_2)}{L} = \dfrac{T_1 - T_2}{R}$ with $R = L/(KA)$; K in W m⁻¹ K⁻¹ (copper about 385, glass 0.8, foam 0.04). In steady state the temperature falls uniformly along a lagged rod.
- **Series slabs:** the same H flows through each; $H = \dfrac{A(T_1 - T_2)}{L_1/K_1 + L_2/K_2}$ and the interface temperature follows from equal heat currents. For a ${ex9.L1 * 100} cm brick wall and a ${ex9.L2 * 100} cm insulation layer (area ${ex9.A} m²) with ${ex9.Th} °C outside and ${ex9.Tc} °C inside: H = ${dec(ex9.H, 4)} W and the interface is at ${dec(ex9.Ti, 4)} °C.
- A lagged copper rod, ${ex8.L} m long and 4.0 cm² in area, with ends at ${ex8.Th} and ${ex8.Tc} °C conducts ${dec(ex8.H, 4)} W.
- **Convection:** heat carried by the bulk motion of a fluid. Natural: hot, less dense fluid rises (water heating, land and sea breezes, monsoon winds); forced: pump or fan. No convection in solids or vacuum.
- **Radiation:** electromagnetic waves, no medium needed. Dull black surfaces absorb and emit best; shiny surfaces reflect most. A black body absorbs all radiation falling on it.
- **Vacuum flask:** vacuum between double walls (no conduction or convection), silvered surfaces (reflect radiation), cork supports (poor conductors).`,
      [kt('Thermal conductivity', 'The property K of a material in H = KA(T₁ − T₂)/L; unit W m⁻¹ K⁻¹.'), kt('Convection', 'Transfer of heat by the bulk motion of a heated fluid.'), kt('Black body', 'An ideal body that absorbs all the radiation falling on it; it is also the best emitter.')],
      [fm(r`H = \dfrac{KA(T_1 - T_2)}{L}`, 'Steady conduction'), fm(r`R = \dfrac{L}{KA}`, 'Thermal resistance')],
      V.rod,
      [3],
      [V.slab, V.flask, TABLES.T_MODES, TABLES.T_K, TABLES.T_CONV_EX, TABLES.T_SURF],
    ),
    sec(
      '4. Newton’s law of cooling',
      r`- **Law:** for a small excess of temperature, the rate of cooling is proportional to the excess over the surroundings: $\dfrac{dT}{dt} = -k(T - T_0)$. Solution: $T = T_0 + (T_1 - T_0)e^{-kt}$. The excess falls exponentially and never quite reaches zero.
- **Average-temperature form** for a small fall: $\dfrac{T_1 - T_2}{t} = k\left[\dfrac{T_1 + T_2}{2} - T_0\right]$.
- Example: tea at ${ex10.T1} °C that falls to ${ex10.T2} °C in ${ex10.t1} min in a room at ${ex10.T0} °C has $k = ${dec(ex10.k, 3)}$ min⁻¹ and reaches ${ex10.Tt} °C after ${dec(ex10.tt, 3)} min.
- Example (average form): coffee from ${ex11.Ta} to ${ex11.Tb} °C in ${ex11.t1} min in surroundings at ${ex11.T0} °C takes ${dec(ex11.t2, 3)} min to fall from ${ex11.Tb} to ${ex11.Tc} °C (exact value ${dec(ex11.t2Exact, 3)} min).
- k grows with the exposed area and for dull surfaces or a draught; lagging lowers it. The rate of loss of heat is $mck(T - T_0)$.`,
      [kt('Newton’s law of cooling', 'The rate of fall of temperature of a body is proportional to its excess temperature over the surroundings, when the excess is small.'), kt('Cooling constant', 'The constant k in dT/dt = −k(T − T₀); unit s⁻¹ or min⁻¹.')],
      [fm(r`\dfrac{dT}{dt} = -k(T - T_0)`, 'Newton’s law of cooling'), fm(r`T = T_0 + (T_1 - T_0)e^{-kt}`, 'Exponential solution')],
      plotCoolTea,
      [4],
      [plotCool2, TABLES.T_AVG, TABLES.T_EX10, TABLES.T_EX11],
    ),
  ],
  exam_tips_md: `- Convert to one temperature scale and to SI length and area before substituting.
- Expansion formulas need a small temperature rise; α, β and γ are in K⁻¹ with β = 2α and γ = 3α.
- Calorimetry: heat lost = heat gained, every term positive; include the calorimeter; check the final temperature lies between the starting ones.
- A flat part of a heating curve is latent heat, Q = mL.
- Conduction: H = KA(T₁ − T₂)/L in steady state; for slabs in series the same H flows through each.
- Newton's law: small excess only; k from two readings by a natural logarithm.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'How does heat differ from temperature?', 'Heat is energy transferred because of a temperature difference (joule); temperature says how hot a body is and decides the direction of heat flow.', 'concept', 1),
    fc(2, 'Write the relation between Celsius and Fahrenheit readings.', '$t_F = \\tfrac{9}{5}t_C + 32$, that is $t_C/100 = (t_F - 32)/180$.', 'formula', 1),
    fc(3, 'How is the kelvin temperature related to the Celsius temperature?', '$T = t_C + 273.15$.', 'formula', 1),
    fc(4, 'A rise of 1 K equals a rise of how many degrees Celsius and Fahrenheit?', '1 °C and 1.8 °F.', 'fact', 1),
    fc(5, 'Convert 113 °F to °C and K.', '45 °C and 318.15 K.', 'example', 1),
    fc(6, 'Write the linear expansion formula and name each symbol.', '$\\Delta L = \\alpha L_0 \\Delta T$: α is the coefficient of linear expansion (K⁻¹), L₀ the original length, ΔT the rise of temperature.', 'formula', 1),
    fc(7, 'How are α, β and γ related for a solid?', 'β = 2α and γ = 3α (for a small rise of temperature).', 'formula', 1),
    fc(8, 'A steel girder 60 m long is heated by 32 K (α = 1.2 × 10⁻⁵ K⁻¹). How much does it lengthen?', 'About 23 mm (23.04 mm).', 'example', 1),
    fc(9, 'What happens to a hole in a metal plate when the plate is heated?', 'It expands, like a disc of the same material.', 'concept', 1),
    fc(10, 'Why does a bimetallic strip bend when heated?', 'The two metals expand by different amounts; the one with the larger α is longer and lies on the outside of the curve.', 'concept', 1),
    fc(11, 'At what temperature is water densest?', 'About 4 °C.', 'fact', 1),
    fc(12, 'Why does a pond freeze from the top but stay liquid beneath?', 'Water is densest at 4 °C, so cooler (lighter) water stays on top and freezes; floating ice insulates the water below at about 4 °C.', 'concept', 1),
    fc(13, 'Define specific heat capacity and give its SI unit.', 'Heat needed to raise the temperature of 1 kg by 1 K; J kg⁻¹ K⁻¹.', 'concept', 2),
    fc(14, 'Write the formula for heat absorbed in a temperature rise.', '$Q = mc\\Delta T$.', 'formula', 2),
    fc(15, 'What is heat capacity and how is it found?', 'The heat needed for a rise of 1 K of the whole body: C = m c (J K⁻¹).', 'concept', 2),
    fc(16, 'State the principle of calorimetry.', 'In an insulated system, heat lost by the hotter bodies = heat gained by the cooler bodies.', 'concept', 2),
    fc(17, 'What must be checked in the final temperature of a mixture?', 'It lies between the starting temperatures of the hottest and coolest bodies.', 'exam-tip', 2),
    fc(18, 'What is latent heat?', 'Heat absorbed or released per kilogram during a change of state at constant temperature.', 'concept', 2),
    fc(19, 'Give the latent heats of fusion of ice and vaporisation of water used here.', '3.34 × 10⁵ J kg⁻¹ and 2.26 × 10⁶ J kg⁻¹.', 'fact', 2),
    fc(20, 'What is sublimation? Give an example.', 'A solid changing directly to vapour, for example camphor or naphthalene.', 'concept', 2),
    fc(21, 'Why does a pressure cooker cook food faster?', 'The raised pressure raises the boiling point of water, so the food cooks at a higher temperature.', 'concept', 2),
    fc(22, 'Why is a plateau on a heating curve flat?', 'The heat goes into latent heat of the change of state, not into raising the temperature.', 'concept', 2),
    fc(23, 'Name the three modes of heat transfer.', 'Conduction, convection and radiation.', 'fact', 3),
    fc(24, 'Write the heat current through a slab in steady state.', '$H = KA(T_1 - T_2)/L$.', 'formula', 3),
    fc(25, 'What is the SI unit of thermal conductivity?', 'W m⁻¹ K⁻¹.', 'fact', 3),
    fc(26, 'For slabs in series, which quantity is the same in each?', 'The heat current H (in steady state); the thermal resistances L/(KA) add.', 'concept', 3),
    fc(27, 'Which mode of heat transfer needs no medium?', 'Radiation.', 'concept', 3),
    fc(28, 'How does a vacuum flask reduce heat loss?', 'Vacuum stops conduction and convection, silvered walls reflect radiation, cork parts conduct little.', 'concept', 3),
    fc(29, 'State Newton’s law of cooling.', 'For a small excess, the rate of cooling is proportional to the excess of the body’s temperature over the surroundings: $dT/dt = -k(T - T_0)$.', 'concept', 4),
    fc(30, 'Write the solution of Newton’s law of cooling.', '$T = T_0 + (T_1 - T_0)e^{-kt}$: an exponential approach to T₀.', 'formula', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
void CICE;
void ALPHA;
