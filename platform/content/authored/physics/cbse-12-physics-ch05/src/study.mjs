// ch05 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, curiePlot, ferroPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Magnetism and Matter — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The bar magnet and its field lines',
      `- A freely suspended bar magnet points roughly north–south; its ends are the N and S poles. Like poles repel, unlike attract.
- Poles always occur in pairs: breaking a magnet gives two complete magnets. **No magnetic monopoles** have been found.
- **Field lines** are continuous **closed loops**: outside N → S, inside S → N. They never cross; crowding shows strength; the tangent gives the direction of $\\vec B$.
- Because lines never start or end, the net magnetic flux through any closed surface is zero.
- Electric field lines of a dipole start on + and end on −; magnetic lines have no ends.`,
      [kt('Magnetic field line', 'A closed curve whose tangent gives the direction of the magnetic field.'), kt('Magnetic monopole', 'An isolated N or S pole; none has been observed.')],
      [],
      V.bar,
      [1],
    ),
    sec(
      '2. The bar magnet as an equivalent solenoid',
      `A current-carrying solenoid produces the same field pattern as a bar magnet (qualitative treatment). Its magnetic moment is $m = NIA$, directed along the axis towards the end where the current appears anticlockwise (the N end).

Inside a magnet, the orbital and spin motion of electrons in its atoms act like tiny aligned current loops; their moments add up to the magnet’s moment $\\vec m$ (from S to N, unit A m²).

Cutting a solenoid in half gives two shorter solenoids, each with N and S ends — the same as breaking a magnet.`,
      [kt('Magnetic moment', 'Vector m (A m²) describing the strength and direction of a magnetic dipole; NIA for a coil.')],
      [fm(r`m = NIA`, 'Equivalent solenoid')],
      V.sol,
      [1],
    ),
    sec(
      '3. Magnetic dipole: field and torque (qualitative)',
      `**Field** (far away, by analogy with the electric dipole):
- axial point: along $\\vec m$, $\\propto \\dfrac{2m}{r^3}$;
- equatorial point: opposite to $\\vec m$, $\\propto \\dfrac{m}{r^3}$ — half the axial value at the same $r$.

**In a uniform field:** net force zero; torque $\\vec\\tau = \\vec m \\times \\vec B$ ($\\tau = mB\\sin\\theta$) turns the magnet into line with $\\vec B$. Stable equilibrium when $\\vec m \\parallel \\vec B$ (energy $-mB$), unstable when antiparallel ($+mB$). A slightly displaced magnet oscillates about the field direction — the basis of the compass needle.

| | Electric dipole | Magnetic dipole |
|---|---|---|
| Moment | $\\vec p$ (C m) | $\\vec m$ (A m²) |
| Torque | $\\vec p \\times \\vec E$ | $\\vec m \\times \\vec B$ |
| Far field | $\\propto p/r^3$ | $\\propto m/r^3$ |`,
      [kt('Stable equilibrium (dipole)', 'Moment along the field: a small turn produces a restoring torque.')],
      [fm(r`\vec\tau = \vec m \times \vec B`, 'Torque on a magnet')],
      V.pos,
      [2],
      [V.torque],
    ),
    sec(
      '4. Magnetisation and the magnetic quantities',
      `- **Magnetisation** $M$: net magnetic moment per unit volume, A m$^{-1}$.
- **Magnetic intensity** $H$: set by free currents (e.g. $H = nI$ in a solenoid), A m$^{-1}$.
- $\\vec B = \\mu_0(\\vec H + \\vec M)$; for linear materials $\\vec M = \\chi\\vec H$, so $\\vec B = \\mu_0\\mu_r\\vec H$ with $\\mu_r = 1 + \\chi$ and permeability $\\mu = \\mu_0\\mu_r$.
- $\\chi$ and $\\mu_r$ have no units.

*Worked result:* an iron core with $\\mu_r = 500$ in a solenoid with $H = 2000$ A m$^{-1}$ gives $B \\approx 1.26$ T and $M \\approx 1.0 \\times 10^{6}$ A m$^{-1}$.`,
      [kt('Magnetisation', 'Net magnetic moment per unit volume of a material.'), kt('Susceptibility', 'χ = M/H; measures how readily a material is magnetised.'), kt('Relative permeability', 'μr = 1 + χ = B/(μ₀H).')],
      [fm(r`\vec B = \mu_0(\vec H + \vec M),\qquad \vec M = \chi\vec H,\qquad \mu_r = 1 + \chi`, 'Magnetic quantities')],
      null,
      [3],
    ),
    sec(
      '5. Dia-, para- and ferromagnetism',
      `| | Diamagnetic | Paramagnetic | Ferromagnetic |
|---|---|---|---|
| χ | small, negative (≈ −10⁻⁵) | small, positive (10⁻⁵–10⁻³) | very large (10²–10⁵) |
| μr | slightly < 1 | slightly > 1 | ≫ 1 |
| Atomic moments | none (induced, opposing) | permanent, randomly oriented | permanent, aligned in domains |
| In a non-uniform field | moves to weaker field | moves to stronger field | strongly attracted |
| Rod between poles | sets across the field | sets along the field | sets along the field |
| Examples | Bi, Cu, Pb, water, N₂, NaCl | Al, Na, Ca, O₂, CuCl₂ | Fe, Co, Ni, Gd, alnico |

- Superconductors are perfect diamagnets ($\\chi = -1$, Meissner effect).
- **Domains:** regions in which atomic moments are spontaneously aligned. In a field, favourably aligned domains grow and others rotate.
- **Soft** ferromagnets (soft iron) magnetise and demagnetise easily — electromagnet and transformer cores. **Hard** ferromagnets (steel, alnico) retain magnetisation — permanent magnets.`,
      [kt('Domain', 'A small region of a ferromagnet in which all atomic moments are aligned.'), kt('Meissner effect', 'Complete expulsion of a magnetic field from a superconductor.')],
      [],
      V.materials,
      [3],
      [V.domains],
    ),
    sec(
      '6. Effect of temperature',
      `- **Diamagnetism:** nearly independent of temperature.
- **Paramagnetism:** Curie law $\\chi = \\dfrac{C}{T}$ ($T$ in kelvin): thermal agitation opposes alignment, so χ falls as T rises; $\\chi T$ is constant.
- **Ferromagnetism:** above the **Curie temperature** $T_C$ the domain alignment is destroyed and the material becomes paramagnetic (Fe ≈ 1043 K, Ni ≈ 631 K, Co ≈ 1394 K). A heated magnet loses its magnetism.`,
      [kt('Curie law', 'For a paramagnet, χ = C/T.'), kt('Curie temperature', 'Temperature above which a ferromagnet becomes paramagnetic.')],
      [fm(r`\chi = \dfrac{C}{T}`, 'Curie law')],
      curiePlot,
      [3],
      [ferroPlot],
    ),
  ],
  exam_tips_md: `- Field-line sketches: closed loops with arrows, S → N inside the magnet.
- Ratio questions on dipole fields: $1/r^3$, and axial = 2 × equatorial.
- Classification questions: give the sign and size of χ, the behaviour in a non-uniform field and two examples.
- Curie law in kelvin; $\\chi T$ = constant.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Direction of field lines inside a bar magnet?', 'From S to N.', 'fact', 1),
    fc(2, 'Why are magnetic field lines closed loops?', 'There are no magnetic monopoles where lines could start or end.', 'concept', 1),
    fc(3, 'What happens when a bar magnet is cut in two?', 'Each piece is a complete magnet with N and S poles.', 'fact', 1),
    fc(4, 'Net magnetic flux through any closed surface?', 'Zero.', 'fact', 1),
    fc(5, 'Magnetic moment of a solenoid?', '$m = NIA$, along the axis towards its N end.', 'formula', 1),
    fc(6, 'Which end of a solenoid is its N pole?', 'The end where the current looks anticlockwise when viewed from outside.', 'concept', 1),
    fc(7, 'Why does a bar magnet behave like a solenoid?', 'Electrons in its atoms act like tiny aligned current loops.', 'concept', 1),
    fc(8, 'Far field of a bar magnet on its axis vs equator?', 'Axial = 2 × equatorial at the same distance; both ∝ 1/r³.', 'formula', 2),
    fc(9, 'Direction of the field at an equatorial point?', 'Opposite to the magnetic moment.', 'fact', 2),
    fc(10, 'Torque on a magnet in a uniform field?', '$\\vec\\tau = \\vec m \\times \\vec B$; net force zero.', 'formula', 2),
    fc(11, 'Stable position of a magnet in a field?', 'Moment along the field (lowest energy −mB).', 'concept', 2),
    fc(12, 'Why does a compass needle point along the field?', 'The torque m × B turns it until m is along B.', 'concept', 2),
    fc(13, 'Define magnetisation.', 'Net magnetic moment per unit volume, A m⁻¹.', 'definition', 3),
    fc(14, 'Relation between B, H and M?', '$B = \\mu_0(H + M)$.', 'formula', 3),
    fc(15, 'Susceptibility and relative permeability?', '$\\chi = M/H$; $\\mu_r = 1 + \\chi$.', 'formula', 3),
    fc(16, 'H inside a long solenoid?', '$H = nI$ (independent of the core).', 'formula', 3),
    fc(17, 'Sign of χ for a diamagnet?', 'Negative (small).', 'fact', 3),
    fc(18, 'Two diamagnetic substances?', 'Bismuth, copper (also water, lead, NaCl).', 'example', 3),
    fc(19, 'Two paramagnetic substances?', 'Aluminium, sodium (also oxygen, calcium).', 'example', 3),
    fc(20, 'Three ferromagnetic elements?', 'Iron, cobalt, nickel.', 'example', 3),
    fc(21, 'Where does a paramagnet move in a non-uniform field?', 'Towards the stronger field.', 'concept', 3),
    fc(22, 'Where does a diamagnet move in a non-uniform field?', 'Towards the weaker field.', 'concept', 3),
    fc(23, 'What are domains?', 'Regions of a ferromagnet with all atomic moments aligned.', 'definition', 3),
    fc(24, 'Meissner effect?', 'A superconductor expels magnetic field: perfect diamagnet, χ = −1.', 'definition', 3),
    fc(25, 'Curie law?', 'For paramagnets χ = C/T (T in kelvin).', 'formula', 3),
    fc(26, 'Curie temperature?', 'Above it, a ferromagnet becomes paramagnetic.', 'definition', 3),
    fc(27, 'Material for electromagnet cores?', 'Soft iron: high μr, easily magnetised and demagnetised.', 'example', 3),
    fc(28, 'Material for permanent magnets?', 'Steel or alnico (hard ferromagnets): retain magnetisation.', 'example', 3),
    fc(29, 'Exam tip: classifying a material?', 'State the sign and size of χ, behaviour in a non-uniform field and examples.', 'exam-tip', 3),
    fc(30, 'Exam tip: drawing field lines of a magnet?', 'Closed loops with arrows, continuing inside from S to N.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
