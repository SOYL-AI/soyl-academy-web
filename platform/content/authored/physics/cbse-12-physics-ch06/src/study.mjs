// ch06 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, fluxPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electromagnetic Induction — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Magnetic flux and Faraday’s law',
      `**Faraday’s experiments:** a current is induced in a closed coil only while the magnetic flux through it **changes** — by moving a magnet or the coil, or by changing the current in a nearby coil. Faster change gives a larger current.

**Magnetic flux:** $\\Phi_B = \\vec B\\cdot\\vec A = BA\\cos\\theta$ (θ between $\\vec B$ and the normal), unit weber (Wb = T m²). For a non-uniform field $\\Phi_B = \\int \\vec B\\cdot d\\vec A$. Flux linkage of $N$ turns: $N\\Phi_B$.

**Faraday’s law:** $\\varepsilon = -N\\dfrac{d\\Phi_B}{dt}$; induced current $I = \\varepsilon/R$. Flux can be changed by changing $B$, $A$ or θ. A steady flux induces nothing.`,
      [kt('Magnetic flux', 'Φ = BA cos θ; the amount of magnetic field passing through an area, in webers.'), kt('Electromagnetic induction', 'Production of an emf in a circuit by a changing magnetic flux.')],
      [fm(r`\Phi_B = BA\cos\theta`, 'Magnetic flux'), fm(r`\varepsilon = -N\dfrac{d\Phi_B}{dt}`, 'Faraday’s law')],
      fluxPlot,
      [1],
    ),
    sec(
      '2. Lenz’s law',
      `The induced current flows in such a direction that its magnetic field **opposes the change in flux** producing it (the minus sign in Faraday’s law).

**Method:** (1) direction of the flux; (2) increasing or decreasing; (3) induced field opposite to the change; (4) right-hand rule for the current.

- N pole approaching a coil → near face of the coil becomes N (repels); N pole receding → near face S (attracts).
- **Energy conservation:** because the induced current opposes the motion, work must be done to keep the flux changing; this work becomes electrical energy and heat. If it helped the change, energy would appear from nothing.`,
      [kt('Lenz’s law', 'The induced current opposes the change in magnetic flux that produces it.')],
      [],
      V.lenz,
      [2],
      [V.magnet],
    ),
    sec(
      '3. Motional emf',
      `**Sliding rod** (length $l$, speed $v$, perpendicular to uniform $B$): flux $\\Phi = Blx$, so $\\varepsilon = \\dfrac{d\\Phi}{dt} = Blv$. Equivalently each free charge feels $q\\vec v \\times \\vec B$ along the rod.

With circuit resistance $R$: $I = \\dfrac{Blv}{R}$; magnetic force on the rod $F = IlB = \\dfrac{B^2l^2v}{R}$, opposing the motion; power needed $Fv = \\dfrac{B^2l^2v^2}{R} = I^2R$.

**Rotating rod** (length $l$, angular speed ω, about one end, perpendicular to $B$): $\\varepsilon = \\dfrac{1}{2}B\\omega l^2$.`,
      [kt('Motional emf', 'Emf induced in a conductor moving through a magnetic field, Blv for a straight rod.')],
      [fm(r`\varepsilon = Blv`, 'Sliding rod'), fm(r`\varepsilon = \tfrac{1}{2}B\omega l^2`, 'Rotating rod')],
      V.rod,
      [3],
    ),
    sec(
      '4. Self-inductance',
      `A changing current in a coil changes its own flux and induces a **back emf** opposing the change: $N\\Phi = LI$, $\\varepsilon = -L\\dfrac{dI}{dt}$. Unit: henry (H = V s A⁻¹ = Wb A⁻¹).

**Long solenoid:** $L = \\dfrac{\\mu_0 N^2A}{l} = \\mu_0 n^2 A l$; with a core $\\mu_r\\mu_0 n^2 A l$.

**Factors:** number of turns (∝ N² at fixed length), area, length, and the core’s permeability — not the current. Inductance plays the role of inertia for current. (Energy stored: $\\tfrac12 LI^2$.)`,
      [kt('Self-inductance', 'Flux linkage per unit current in a coil, L = NΦ/I; also the back emf per unit rate of change of current.'), kt('Henry', 'Inductance in which a change of 1 A s⁻¹ induces 1 V.')],
      [fm(r`\varepsilon = -L\dfrac{dI}{dt},\qquad L = \mu_0 n^2 A l`, 'Self-inductance')],
      V.self,
      [4],
    ),
    sec(
      '5. Mutual inductance',
      `A changing current in coil 1 induces an emf in coil 2: $N_2\\Phi_2 = MI_1$, $\\varepsilon_2 = -M\\dfrac{dI_1}{dt}$; $M_{12} = M_{21}$.

**Coaxial solenoids** (inner radius $r_1$, turns per metre $n_1$, $n_2$, common length $l$): $M = \\mu_0 n_1 n_2 \\pi r_1^2 l$.

**Factors:** numbers of turns, areas, separation, relative orientation (coaxial: large; axes perpendicular: very small), and a common core ($\\times\\mu_r$). Used in transformers and induction chargers.`,
      [kt('Mutual inductance', 'Flux linked with one coil per unit current in the other, M = N₂Φ₂/I₁.')],
      [fm(r`\varepsilon_2 = -M\dfrac{dI_1}{dt},\qquad M = \mu_0 n_1 n_2 \pi r_1^2 l`, 'Mutual inductance')],
      V.mutual,
      [4],
    ),
  ],
  exam_tips_md: `- Flux first: $BA\\cos\\theta$ with θ from the normal; then $\\varepsilon = N\\Delta\\Phi/\\Delta t$.
- Lenz direction in three steps; say “opposes the change”.
- Derivations: motional emf from $\\Phi = Blx$; rotating rod by integration; L of a solenoid; M of coaxial solenoids.
- L and M depend on geometry and core, not on current.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Magnetic flux through an area?', '$\\Phi = BA\\cos\\theta$, θ from the normal; unit weber.', 'formula', 1),
    fc(2, '1 weber = ?', '1 T m².', 'fact', 1),
    fc(3, 'Faraday’s law?', 'Induced emf = rate of change of flux linkage: $\\varepsilon = -N\\,d\\Phi/dt$.', 'formula', 1),
    fc(4, 'Three ways to change flux?', 'Change B, change the area, or change the angle.', 'concept', 1),
    fc(5, 'Emf with a large but steady flux?', 'Zero.', 'fact', 1),
    fc(6, 'Emf units from flux: 1 mWb s⁻¹ = ?', '1 mV.', 'fact', 1),
    fc(7, 'Lenz’s law?', 'The induced current opposes the change in flux causing it.', 'definition', 2),
    fc(8, 'N pole pushed into a coil: near face?', 'Becomes N (repels the magnet).', 'example', 2),
    fc(9, 'N pole pulled out of a coil: near face?', 'Becomes S (attracts the magnet).', 'example', 2),
    fc(10, 'Lenz’s law follows from which principle?', 'Conservation of energy.', 'concept', 2),
    fc(11, 'Inward flux increasing in a loop: current seen from the front?', 'Anticlockwise (makes an outward field).', 'example', 2),
    fc(12, 'Emf of a sliding rod?', '$\\varepsilon = Blv$.', 'formula', 3),
    fc(13, 'Force on the sliding rod due to the induced current?', '$IlB = B^2l^2v/R$, opposing the motion.', 'formula', 3),
    fc(14, 'Emf of a rod rotating about one end?', '$\\tfrac12 B\\omega l^2$.', 'formula', 3),
    fc(15, 'Power to keep a rod moving at constant speed?', '$Fv = B^2l^2v^2/R = I^2R$.', 'formula', 3),
    fc(16, 'Define self-inductance.', '$L = N\\Phi/I$; back emf $-L\\,dI/dt$.', 'definition', 4),
    fc(17, 'SI unit of inductance?', 'Henry (V s A⁻¹).', 'fact', 4),
    fc(18, 'Self-inductance of a long solenoid?', '$\\mu_0 N^2A/l$ (× μr with a core).', 'formula', 4),
    fc(19, 'Does L depend on the current?', 'No: only on turns, area, length and core.', 'concept', 4),
    fc(20, 'Turns of a solenoid doubled (same length): L?', 'Four times.', 'example', 4),
    fc(21, 'Why is inductance like inertia?', 'It opposes changes in current, as mass opposes changes in velocity.', 'concept', 4),
    fc(22, 'Define mutual inductance.', '$M = N_2\\Phi_2/I_1$; $\\varepsilon_2 = -M\\,dI_1/dt$.', 'definition', 4),
    fc(23, 'M of coaxial solenoids?', '$\\mu_0 n_1 n_2 \\pi r_1^2 l$.', 'formula', 4),
    fc(24, 'Factors affecting M?', 'Turns, areas, separation, orientation, core.', 'concept', 4),
    fc(25, 'Two coils with perpendicular axes: M?', 'Very small (little flux linkage).', 'example', 4),
    fc(26, 'Emf in coil 2 when I₁ is steady?', 'Zero.', 'fact', 4),
    fc(27, 'Energy stored in an inductor?', '$\\tfrac12 LI^2$.', 'formula', 4),
    fc(28, 'Exam tip: direction of induced current?', 'Flux direction → increasing/decreasing → opposing field → right-hand rule.', 'exam-tip', 2),
    fc(29, 'Exam tip: motional emf derivation?', 'Φ = Blx, differentiate to Blv; mention the opposing force IlB.', 'exam-tip', 3),
    fc(30, 'Exam tip: θ in Φ = BA cos θ?', 'Angle between B and the normal to the coil, not the plane.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
