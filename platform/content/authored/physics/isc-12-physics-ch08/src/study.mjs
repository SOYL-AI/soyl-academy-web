// ISC 12 Physics ch08 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, torquePlot, scalePlot, loadPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Torque on a Current Loop and the Moving Coil Galvanometer — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Torque on a rectangular coil',
      `- Coil PQRS of N turns, current I, free to turn about an axis perpendicular to a uniform field B. Each side feels $\\vec F = NI\\,\\vec l \\times \\vec B$.
- The two sides parallel to the axis (length l) feel forces NIlB, equal and opposite on different lines: a **couple**. The other two sides feel equal, opposite, **collinear** forces: no torque. **Net force = 0** in a uniform field.
- Arm of the couple $= b\\sin\\theta$ (θ between the **normal** and B): $\\tau = NIlB \\cdot b\\sin\\theta = NIAB\\sin\\theta$, true for a flat coil of any shape.
- Largest ($NIAB$) when the plane of the coil is along B; zero when the plane is perpendicular to B.`,
      [kt('Couple', 'Two equal, opposite, parallel forces on different lines: no net force, but a torque equal to one force times the distance between the lines.')],
      [fm(r`\tau = NIAB\sin\theta`, 'Torque on a coil')],
      V.top,
      [1],
      [V.face],
    ),
    sec(
      '2. Magnetic moment and the vector torque',
      `- **Magnetic moment** $\\vec m = NI\\vec A$ (A m²), along the normal given by the **right-hand rule**: fingers curled along the current, thumb along $\\vec m$. Circular coil: $m = NI\\pi R^2$.
- $\\vec\\tau = \\vec m \\times \\vec B$: the torque turns $\\vec m$ towards $\\vec B$. θ = 0°: zero torque, **stable**; θ = 90°: largest torque; θ = 180°: zero torque, **unstable**.
- If the plane of the coil makes angle α with B, then θ = 90° − α.`,
      [kt('Magnetic moment of a coil', 'NIA, a vector along the right-hand normal to the coil; unit A m².')],
      [fm(r`\vec m = NI\vec A,\qquad \vec\tau = \vec m \times \vec B`, 'Moment and torque')],
      V.rhr,
      [1],
      [torquePlot],
    ),
    sec(
      '3. Current loop as a magnetic dipole; the orbiting electron',
      `- A small current loop behaves as a **magnetic dipole**: field lines like those of a short bar magnet; the face $\\vec m$ points out of is a north face. Far away on the axis $B \\approx \\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{x^3}$ (compare $\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2p}{x^3}$ for an electric dipole). In a uniform field: no net force, torque $\\vec m \\times \\vec B$.
- Electron in a circular orbit (Bohr model): $I = \\dfrac{ev}{2\\pi r}$, $\\mu = I\\pi r^2 = \\dfrac{evr}{2} = \\dfrac{e}{2m_e}L$; $\\vec\\mu$ is **opposite** to $\\vec L$ (negative charge). Gyromagnetic ratio $\\dfrac{e}{2m_e} \\approx 8.8 \\times 10^{10}$ C kg⁻¹.
- Bohr orbit $L = \\dfrac{nh}{2\\pi}$: $\\mu = n\\mu_B$, **Bohr magneton** $\\mu_B = \\dfrac{eh}{4\\pi m_e} \\approx 9.27 \\times 10^{-24}$ A m².`,
      [kt('Bohr magneton', 'Orbital magnetic moment of the electron in the first Bohr orbit, eh/4πmₑ ≈ 9.27 × 10⁻²⁴ A m².'), kt('Gyromagnetic ratio', 'Ratio of orbital magnetic moment to orbital angular momentum, e/2mₑ for an electron.')],
      [fm(r`\mu = \dfrac{evr}{2} = \dfrac{e}{2m_e}L`, 'Orbital magnetic moment'), fm(r`\mu_B = \dfrac{eh}{4\pi m_e}`, 'Bohr magneton')],
      V.orbit,
      [2],
      [V.dipole],
    ),
    sec(
      '4. Moving coil galvanometer',
      `- **Construction:** coil of many turns of fine insulated wire on a light frame; strong magnet with **concave** pole pieces; **soft-iron** cylinder inside the coil; phosphor-bronze suspension (or hairsprings) giving the restoring torque; mirror and lamp-and-scale, or a pointer.
- **Principle:** a current-carrying coil in a magnetic field experiences a torque.
- **Radial field:** the plane of the coil always contains B, so the deflecting torque is $NIAB$ at every deflection. The soft iron also makes B stronger.
- **Working:** $NIAB = c\\theta \\Rightarrow I = \\dfrac{c}{NAB}\\theta = k\\theta$ ($c$ = restoring torque per unit twist, $k$ = galvanometer constant): a **linear scale**.
- **Current sensitivity** $\\dfrac{\\theta}{I} = \\dfrac{NAB}{c}$; **voltage sensitivity** $\\dfrac{\\theta}{V} = \\dfrac{NAB}{cG}$. More turns raise both N and G.`,
      [kt('Radial field', 'Field directed along radii of the soft-iron core, so the plane of the coil always contains B.'), kt('Current sensitivity', 'Deflection per unit current, NAB/c.'), kt('Voltage sensitivity', 'Deflection per unit p.d. across the coil, NAB/cG.')],
      [fm(r`I = \dfrac{c}{NAB}\,\theta = k\theta`, 'Galvanometer'), fm(r`\dfrac{\theta}{I} = \dfrac{NAB}{c},\qquad \dfrac{\theta}{V} = \dfrac{NAB}{cG}`, 'Sensitivities')],
      V.mcgTop,
      [3],
      [V.mcgFront, scalePlot],
    ),
    sec(
      '5. Ammeter and voltmeter from a galvanometer',
      `- **Ammeter** of range I: shunt in **parallel**, $I_gG = (I - I_g)S \\Rightarrow S = \\dfrac{I_gG}{I - I_g}$; for $I = nI_g$, $S = \\dfrac{G}{n - 1}$. Resistance $\\dfrac{GS}{G + S}$ (very small); connected in series.
- **Voltmeter** of range V: resistance in **series**, $V = I_g(G + R) \\Rightarrow R = \\dfrac{V}{I_g} - G$. Resistance $G + R$ (very large); connected in parallel. Taps give several ranges.
- Ideal ammeter: zero resistance; ideal voltmeter: infinite resistance. A real voltmeter across a resistor comparable with its own resistance reads low.`,
      [kt('Shunt', 'Small resistance connected in parallel with a galvanometer to carry most of the current.')],
      [fm(r`S = \dfrac{I_gG}{I - I_g}`, 'Shunt'), fm(r`R = \dfrac{V}{I_g} - G`, 'Series resistance')],
      V.amm,
      [4],
      [V.volt, loadPlot],
    ),
  ],
  exam_tips_md: `- Torque: θ is measured from the normal to the coil; the plane at α means θ = 90° − α.
- Direction of m: right-hand rule only.
- Galvanometer: radial field gives torque NIAB at every angle, so I = kθ.
- Shunt: equal p.d. across coil and shunt. Voltmeter: total resistance V/Ig.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Force on each side of a coil parallel to the rotation axis (N turns, length l)?', '$NIlB$, with the field perpendicular to the side.', 'formula', 1),
    fc(2, 'Why do the forces on the other two sides of a rectangular coil give no torque?', 'They are equal, opposite and act along the same line.', 'concept', 1),
    fc(3, 'Arm of the couple on a rectangular coil of breadth b?', '$b\\sin\\theta$, θ between the normal and B.', 'formula', 1),
    fc(4, 'Torque on a flat coil of area A in a uniform field?', '$NIAB\\sin\\theta$.', 'formula', 1),
    fc(5, 'Plane of a coil makes 25° with B: what is θ in NIAB sin θ?', '65°.', 'example', 1),
    fc(6, 'Magnetic moment of a coil, and its unit?', '$\\vec m = NI\\vec A$, in A m².', 'definition', 1),
    fc(7, 'Right-hand rule for the magnetic moment?', 'Curl the fingers along the current; the thumb gives m.', 'concept', 1),
    fc(8, 'Current anticlockwise as you look at a coil: m points?', 'Towards you.', 'fact', 1),
    fc(9, 'Vector form of the torque on a coil?', '$\\vec\\tau = \\vec m \\times \\vec B$.', 'formula', 1),
    fc(10, 'Orientation of stable equilibrium for a coil in B?', 'm along B (θ = 0°).', 'fact', 1),
    fc(11, 'Orientation of unstable equilibrium for a coil in B?', 'm opposite to B (θ = 180°).', 'fact', 1),
    fc(12, 'Does the torque formula depend on the shape of a flat coil?', 'No; only on its area A.', 'concept', 1),
    fc(13, 'Axial field far from a small loop of moment m?', '$\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{x^3}$.', 'formula', 2),
    fc(14, 'Which face of a current loop acts as a north pole?', 'The face that m points out of.', 'concept', 2),
    fc(15, 'Equivalent current of an electron in a circular orbit?', '$ev/2\\pi r$.', 'formula', 2),
    fc(16, 'Orbital magnetic moment of an electron in terms of v and r?', '$evr/2$.', 'formula', 2),
    fc(17, 'Ratio μ/L for an orbiting electron?', '$e/2m_e \\approx 8.8 \\times 10^{10}$ C kg⁻¹.', 'formula', 2),
    fc(18, 'Why is the electron’s orbital μ opposite to its L?', 'Its charge is negative, so the current flows opposite to its motion.', 'concept', 2),
    fc(19, 'Bohr magneton?', '$eh/4\\pi m_e \\approx 9.27 \\times 10^{-24}$ A m².', 'formula', 2),
    fc(20, 'Orbital moment in the nth Bohr orbit?', '$n\\mu_B$.', 'formula', 2),
    fc(21, 'Principle of the moving coil galvanometer?', 'A current-carrying coil in a magnetic field experiences a torque.', 'concept', 3),
    fc(22, 'Two jobs of the soft-iron core in a galvanometer?', 'It makes the field radial and makes it stronger.', 'concept', 3),
    fc(23, 'Deflecting torque in a radial field?', '$NIAB$ at every deflection.', 'formula', 3),
    fc(24, 'Galvanometer equation and constant?', '$I = k\\theta$, $k = c/NAB$.', 'formula', 3),
    fc(25, 'Why phosphor bronze for the suspension?', 'Small restoring torque per unit twist, and it returns fully to zero.', 'fact', 3),
    fc(26, 'Voltage sensitivity of a galvanometer?', '$NAB/cG$.', 'formula', 3),
    fc(27, 'Shunt for an ammeter of range n times Ig?', '$G/(n - 1)$.', 'formula', 4),
    fc(28, 'Series resistance for a voltmeter of range V?', '$V/I_g - G$.', 'formula', 4),
    fc(29, 'Exam tip: torque at a given orientation?', 'Find θ from the normal, not the plane.', 'exam-tip', 1),
    fc(30, 'Exam tip: shunt calculations?', 'Coil and shunt have the same p.d.: IgG = (I − Ig)S.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
