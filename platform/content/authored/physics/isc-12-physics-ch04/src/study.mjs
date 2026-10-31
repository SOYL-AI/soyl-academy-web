// ISC 12 Physics ch04 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, energyPlot, slabPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Capacitance and Dielectrics — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Conductors and capacitance',
      `- In electrostatic equilibrium: **E = 0 inside** a conductor; excess charge resides on the **outer surface**; the conductor is an **equipotential**; just outside, E is **normal** to the surface. **Free charges** move through conductors; **bound charges** in insulators only shift within molecules.
- **Capacitance** $C = Q/V$; unit farad (C V⁻¹); μF, nF, pF in practice. Depends on geometry and medium, not on Q.
- Isolated sphere: $C = 4\\pi\\varepsilon_0R$ (R = 9 cm gives 10 pF; the Earth about 711 μF).`,
      [kt('Capacitance', 'Ratio of the charge on a conductor to its potential (or on a capacitor’s plates to their potential difference).'), kt('Farad', 'Capacitance that holds one coulomb per volt.')],
      [fm(r`C = \dfrac{Q}{V}`, 'Capacitance')],
      V.cond,
      [1],
    ),
    sec(
      '2. Parallel-plate capacitor',
      `Plates of area A, separation d, charges ±Q: uniform field $E = \\sigma/\\varepsilon_0 = Q/(\\varepsilon_0A)$; $V = Ed = Qd/(\\varepsilon_0A)$; so $C = \\dfrac{\\varepsilon_0A}{d}$ (edge effects neglected).`,
      [],
      [fm(r`C = \dfrac{\varepsilon_0A}{d}`, 'Parallel-plate capacitor')],
      V.plates,
      [2],
    ),
    sec(
      '3. Combinations',
      `- **Series:** same Q on each; $V = \\sum V_i$; $\\dfrac{1}{C_s} = \\sum \\dfrac{1}{C_i}$; smaller than the smallest; the smallest C takes the largest V.
- **Parallel:** same V; $Q = \\sum Q_i$; $C_p = \\sum C_i$; larger than the largest.
- Mixed networks: reduce step by step; find Q on series branches and V across parallel ones.`,
      [],
      [fm(r`\dfrac{1}{C_s} = \sum\dfrac{1}{C_i},\qquad C_p = \sum C_i`, 'Series and parallel')],
      V.comb,
      [3],
    ),
    sec(
      '4. Energy stored',
      `- $U = \\dfrac12CV^2 = \\dfrac12QV = \\dfrac{Q^2}{2C}$ (area under the V–Q line; formulae used, not derived, in the ISC scope).
- **Energy density** of the field: $u = \\dfrac12\\varepsilon_0E^2$ (J m⁻³).
- Connecting a charged $C_1$ (at $V_1$) to an uncharged $C_2$: charge conserved, common $V = C_1V_1/(C_1 + C_2)$; energy is **lost** as heat.`,
      [kt('Energy density', 'Energy stored per unit volume of the electric field, ½ε₀E².')],
      [fm(r`U = \dfrac12CV^2 = \dfrac{Q^2}{2C}`, 'Energy stored'), fm(r`u = \dfrac12\varepsilon_0E^2`, 'Energy density')],
      energyPlot,
      [4],
    ),
    sec(
      '5. Dielectrics',
      `- In a field a dielectric **polarises** (polar molecules align; non-polar molecules become induced dipoles); bound surface charges appear (− facing the + plate) and reduce the field inside to $E_0/K$.
- **Dielectric constant** $K = C'/C_0 = \\varepsilon/\\varepsilon_0 = \\varepsilon_r$; filled capacitor $C' = K\\varepsilon_0A/d$.
- Battery **disconnected** (Q fixed): C × K; V, E, U ÷ K. Battery **connected** (V fixed): C, Q, U × K; E unchanged.`,
      [kt('Polarisation', 'Alignment or induction of molecular dipoles in a dielectric placed in a field.'), kt('Dielectric constant', 'K = C with dielectric ÷ C in vacuum = ε/ε₀.')],
      [fm(r`C' = KC_0`, 'Filled capacitor')],
      V.diel,
      [5],
    ),
    sec(
      '6. Capacitor partly filled with a slab',
      `Slab of thickness t (t < d), constant K: $V = E_0(d - t) + \\dfrac{E_0}{K}t$, so $C = \\dfrac{\\varepsilon_0A}{d - t + t/K}$. t = 0 gives $C_0$; t = d gives $KC_0$; a metal slab (K → ∞) gives $\\varepsilon_0A/(d - t)$.`,
      [],
      [fm(r`C = \dfrac{\varepsilon_0A}{d - t + t/K}`, 'Partial slab')],
      V.slab,
      [6],
      [slabPlot],
    ),
  ],
  exam_tips_md: `- Derive C = ε₀A/d from E = σ/ε₀ and V = Ed.
- Series: common Q; parallel: common V.
- Battery on or off decides whether V or Q is fixed.
- Charge sharing: conserve Q; energy is lost.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Field inside a charged conductor at equilibrium?', 'Zero.', 'fact', 1),
    fc(2, 'Where does excess charge on a conductor reside?', 'On its outer surface.', 'fact', 1),
    fc(3, 'Direction of E just outside a conductor?', 'Normal to the surface.', 'fact', 1),
    fc(4, 'Definition of capacitance?', '$C = Q/V$.', 'formula', 1),
    fc(5, 'One farad?', 'One coulomb per volt.', 'fact', 1),
    fc(6, 'Capacitance of an isolated sphere?', '$4\\pi\\varepsilon_0R$.', 'formula', 1),
    fc(7, 'Capacitance of a parallel-plate capacitor?', '$\\varepsilon_0A/d$.', 'formula', 2),
    fc(8, 'Effect of halving the plate separation?', 'C doubles.', 'concept', 2),
    fc(9, 'Series combination rule?', '$1/C = \\sum 1/C_i$.', 'formula', 3),
    fc(10, 'What is common to capacitors in series?', 'The charge.', 'fact', 3),
    fc(11, 'Parallel combination rule?', '$C = \\sum C_i$.', 'formula', 3),
    fc(12, 'What is common to capacitors in parallel?', 'The potential difference.', 'fact', 3),
    fc(13, 'Two equal capacitors C in series?', 'C/2.', 'example', 3),
    fc(14, 'Energy stored in a capacitor?', '$\\tfrac12CV^2 = \\tfrac12QV = Q^2/2C$.', 'formula', 4),
    fc(15, 'Energy density of an electric field?', '$\\tfrac12\\varepsilon_0E^2$.', 'formula', 4),
    fc(16, 'Effect on energy of doubling V (C fixed)?', '× 4.', 'concept', 4),
    fc(17, 'Charged C₁ joined to uncharged C₂: common V?', '$C_1V_1/(C_1 + C_2)$.', 'formula', 4),
    fc(18, 'Is energy conserved when capacitors share charge?', 'No; some is lost as heat.', 'concept', 4),
    fc(19, 'What is polarisation of a dielectric?', 'Alignment or induction of molecular dipoles in a field.', 'concept', 5),
    fc(20, 'Field inside a dielectric filling a capacitor?', '$E_0/K$.', 'formula', 5),
    fc(21, 'Dielectric constant?', '$K = C\'/C_0 = \\varepsilon/\\varepsilon_0$.', 'formula', 5),
    fc(22, 'Battery disconnected, dielectric inserted: Q?', 'Unchanged.', 'fact', 5),
    fc(23, 'Battery disconnected, dielectric inserted: U?', 'Divided by K.', 'fact', 5),
    fc(24, 'Battery connected, dielectric inserted: Q?', 'Multiplied by K.', 'fact', 5),
    fc(25, 'Battery connected, dielectric inserted: V?', 'Unchanged.', 'fact', 5),
    fc(26, 'Capacitance with a slab of thickness t?', '$\\varepsilon_0A/(d - t + t/K)$.', 'formula', 6),
    fc(27, 'Capacitance with a metal slab of thickness t?', '$\\varepsilon_0A/(d - t)$.', 'formula', 6),
    fc(28, 'Polar and non-polar molecules?', 'Polar have permanent dipoles; non-polar acquire induced dipoles.', 'concept', 5),
    fc(29, 'Exam tip: dielectric questions?', 'Decide first whether Q or V is fixed.', 'exam-tip', 5),
    fc(30, 'Exam tip: series network?', 'Find the common charge first.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
