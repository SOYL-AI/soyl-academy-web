// ISC 12 Physics ch09 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, fieldPlot, fluxPlot, curiePlot, classTable, choiceTable } from './decks.mjs';

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
      '1. The bar magnet, its equivalent solenoid and its field lines',
      `- Field lines of a bar magnet run from N to S **outside** and from S to N **inside**: every line is a **closed loop**; lines never cross. The magnetic moment $\\vec m$ points from S to N (A m²).
- A current-carrying **solenoid** has the same field pattern: it is the **equivalent solenoid** of the magnet, with $m = NIA$. In a magnet, aligned atomic current loops act like the turns of the solenoid.
- **Electric lines** start on +q and end on −q, and between the charges $\\vec E$ is opposite to $\\vec p$; **magnetic lines** have no ends and inside the magnet $\\vec B$ is along $\\vec m$. No **magnetic monopole** has been found, so the net magnetic flux through any closed surface is zero.`,
      [kt('Magnetic monopole', 'A hypothetical isolated north or south pole; none has been observed, so magnetic field lines have no ends.'), kt('Equivalent solenoid', 'A current-carrying solenoid whose field pattern and moment NIA match those of a given bar magnet.')],
      [fm(r`m = NIA`, 'Moment of a solenoid')],
      V.bar,
      [1],
      [V.sol, V.evb],
    ),
    sec(
      '2. Field of a magnetic dipole; torque on a magnet',
      `- Magnet of magnetic length 2l, moment m, point at distance d from its centre (formulae only; derivations not required):
  - **end-on** (on the axis): $B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{2md}{(d^2 - l^2)^2}$, **along** $\\vec m$;
  - **broadside-on** (on the perpendicular bisector): $B = \\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{(d^2 + l^2)^{3/2}}$, **opposite** to $\\vec m$.
- **Short magnet** ($d \\gg l$): $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{d^3}$ and $\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{d^3}$; both $\\propto 1/d^3$; end-on is twice broadside-on at the same d. $\\mu_0/4\\pi = 10^{-7}$ T m A⁻¹.
- In a **uniform** field: no net force, torque $\\vec\\tau = \\vec m \\times \\vec B$, $\\tau = mB\\sin\\theta$; stable at θ = 0°, unstable at θ = 180°, largest (mB) at 90°.`,
      [kt('End-on position', 'A point on the axis of the magnet, produced; the field there points along m.'), kt('Broadside-on position', 'A point on the perpendicular bisector of the magnet; the field there points opposite to m.')],
      [fm(r`B_\text{end-on} = \dfrac{\mu_0}{4\pi}\dfrac{2md}{(d^2 - l^2)^2},\qquad B_\text{broadside-on} = \dfrac{\mu_0}{4\pi}\dfrac{m}{(d^2 + l^2)^{3/2}}`, 'Field of a bar magnet'), fm(r`\vec\tau = \vec m \times \vec B`, 'Torque on a magnet')],
      V.pos,
      [2],
      [fieldPlot, V.torque],
    ),
    sec(
      '3. Magnetic flux and flux density',
      `- **Magnetic flux** through a flat surface in a uniform field: $\\Phi = \\vec B \\cdot \\vec A = BA\\cos\\theta$, θ between $\\vec B$ and the **normal**. A scalar; unit **weber** (1 Wb = 1 T m²).
- Largest ($BA$) when the surface faces the field; zero when the field lies along the surface; negative when B passes through the other face.
- $B = \\Phi/A$ is the **flux density**: unit **tesla**, 1 T = 1 Wb m⁻². **Gauss**: 1 G = 10⁻⁴ T. Earth’s field is about 0.5 G; a strong laboratory magnet about 1 T.`,
      [kt('Magnetic flux', 'The scalar product of B with the area vector of a surface, BA cos θ; unit weber.'), kt('Gauss', 'A non-SI unit of magnetic field: 1 G = 10⁻⁴ T.')],
      [fm(r`\Phi = BA\cos\theta`, 'Magnetic flux'), fm(r`1\ \text{T} = 1\ \text{Wb m}^{-2} = 10^{4}\ \text{G}`, 'Units')],
      V.flux,
      [3],
      [fluxPlot],
    ),
    sec(
      '4. Magnetic properties of materials',
      `- **Magnetisation** $M = m/V$ (A m⁻¹); **magnetic intensity** $H$ (A m⁻¹), $H = nI$ in a long solenoid; $B = \\mu_0(H + M)$.
- **Susceptibility** $\\chi = M/H$ (no unit); **relative permeability** $\\mu_r = 1 + \\chi$; $B = \\mu_0\\mu_r H$; permeability $\\mu = \\mu_0\\mu_r$.
- **Diamagnetic:** χ small, negative, μr slightly < 1; induced moments oppose the field; pushed towards weaker field; almost independent of temperature (bismuth, copper, water).
- **Paramagnetic:** χ small, positive, μr slightly > 1; permanent moments partly aligned; pulled towards stronger field; **Curie’s law** $\\chi = C/T$ (aluminium, sodium, oxygen).
- **Ferromagnetic:** χ and μr very large; moments aligned in **domains**; above the **Curie temperature** $T_C$ it becomes paramagnetic (iron about 1043 K, nickel about 631 K, gadolinium about 293 K).`,
      [kt('Susceptibility', 'Ratio M/H of the magnetisation of a material to the magnetic intensity; negative for diamagnets.'), kt('Curie temperature', 'The temperature above which a ferromagnet becomes paramagnetic, because thermal agitation destroys the alignment within its domains.'), kt('Domain', 'A small region of a ferromagnet in which the atomic moments are spontaneously aligned.')],
      [fm(r`B = \mu_0(H + M),\qquad M = \chi H,\qquad \mu_r = 1 + \chi`, 'B, H and M'), fm(r`\chi = \dfrac{C}{T}`, 'Curie’s law')],
      V.mats,
      [4],
      [classTable, curiePlot, V.domains],
    ),
    sec(
      '5. Electromagnets, the B–H loop and the choice of materials',
      `- **Electromagnet:** a coil on a soft-iron core, $B \\approx \\mu_0\\mu_r nI$; stronger with more turns per unit length, more current and a core of higher permeability (and a small air gap), until the core **saturates**.
- **B–H loop** (qualitative): B rises to **saturation**; at H = 0 a field B, the **retentivity**, remains; a reverse H, the **coercivity**, is needed to make B zero. B lags behind H (**hysteresis**); the loop area measures the energy lost as heat per cycle.
- **Soft iron:** narrow loop, low coercivity, high permeability, slightly higher retentivity than steel. **Steel:** wide loop, high coercivity.
- **Choice:** permanent magnets — high retentivity and high coercivity (steel, alnico); electromagnet cores — high permeability, low retentivity and coercivity (soft iron); transformer cores — high permeability, narrow loop (laminated soft iron, silicon steel).`,
      [kt('Retentivity', 'The flux density remaining in a ferromagnet when H is reduced to zero after saturation.'), kt('Coercivity', 'The reverse magnetic intensity needed to reduce B in a magnetised ferromagnet to zero.'), kt('Hysteresis', 'The lagging of B behind H when a ferromagnet is taken round a cycle of magnetisation.')],
      [fm(r`B \approx \mu_0\mu_r nI`, 'Electromagnet')],
      V.bh,
      [5],
      [V.emag, V.loops, choiceTable],
    ),
  ],
  exam_tips_md: `- Field of a magnet: name the position and give the direction (end-on along m, broadside-on opposite to m).
- Flux: θ is measured from the normal; 1 T = 1 Wb m⁻² = 10⁴ G.
- Materials: classify by the sign and size of χ; Curie’s law needs kelvin.
- B–H loop: permanent magnets need high coercivity; cores need low coercivity and a narrow loop.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Direction of the field lines inside a bar magnet?', 'From the S pole to the N pole, along m.', 'fact', 1),
    fc(2, 'Why do magnetic field lines form closed loops?', 'No magnetic monopoles exist, so a line has nowhere to start or end.', 'concept', 1),
    fc(3, 'Magnetic moment of a solenoid of N turns, area A, current I?', '$m = NIA$, along the axis by the right-hand rule.', 'formula', 1),
    fc(4, 'Why does a bar magnet behave like a solenoid?', 'Its atoms are tiny current loops, aligned like the turns of a solenoid.', 'concept', 1),
    fc(5, 'Between the charges of an electric dipole, E points…?', 'From +q to −q, opposite to p (whereas B inside a magnet is along m).', 'concept', 1),
    fc(6, 'Net magnetic flux through any closed surface?', 'Zero.', 'fact', 1),
    fc(7, 'End-on field of a magnet of length 2l?', '$\\dfrac{\\mu_0}{4\\pi}\\dfrac{2md}{(d^2 - l^2)^2}$, along m.', 'formula', 2),
    fc(8, 'Broadside-on field of a magnet of length 2l?', '$\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{(d^2 + l^2)^{3/2}}$, opposite to m.', 'formula', 2),
    fc(9, 'Short magnet: end-on and broadside-on fields?', '$\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{d^3}$ and $\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{d^3}$.', 'formula', 2),
    fc(10, 'Value of μ₀/4π?', '$10^{-7}$ T m A⁻¹.', 'fact', 2),
    fc(11, 'Short magnet: distance tripled, field becomes?', '1/27 of its value.', 'example', 2),
    fc(12, 'Torque on a magnet in a uniform field?', '$\\vec\\tau = \\vec m \\times \\vec B$, size $mB\\sin\\theta$.', 'formula', 2),
    fc(13, 'Net force on a magnet in a uniform field?', 'Zero.', 'fact', 2),
    fc(14, 'Stable and unstable positions of a magnet in B?', 'Stable: m along B. Unstable: m opposite to B.', 'concept', 2),
    fc(15, 'Magnetic flux through a flat surface?', '$\\Phi = BA\\cos\\theta$, θ from the normal.', 'formula', 3),
    fc(16, 'SI unit of flux, and of flux density?', 'Weber; tesla (= Wb m⁻²).', 'definition', 3),
    fc(17, 'One gauss in tesla?', '$10^{-4}$ T.', 'fact', 3),
    fc(18, 'Magnetisation M?', 'Magnetic moment per unit volume, in A m⁻¹.', 'definition', 4),
    fc(19, 'Magnetic intensity inside a long solenoid?', '$H = nI$ (A m⁻¹).', 'formula', 4),
    fc(20, 'Relation of B, H and M?', '$B = \\mu_0(H + M)$.', 'formula', 4),
    fc(21, 'Relative permeability in terms of susceptibility?', '$\\mu_r = 1 + \\chi$.', 'formula', 4),
    fc(22, 'Sign and size of χ for a diamagnet?', 'Small and negative (about −10⁻⁵).', 'fact', 4),
    fc(23, 'Curie’s law?', '$\\chi = C/T$ for a paramagnet, T in kelvin.', 'formula', 4),
    fc(24, 'What happens to a ferromagnet above its Curie temperature?', 'Its domains break up and it becomes paramagnetic.', 'concept', 4),
    fc(25, 'Field in an electromagnet core?', '$B \\approx \\mu_0\\mu_r nI$, until the core saturates.', 'formula', 5),
    fc(26, 'Retentivity?', 'The B left in a ferromagnet when H is brought back to zero after saturation.', 'definition', 5),
    fc(27, 'Coercivity?', 'The reverse H needed to bring B back to zero.', 'definition', 5),
    fc(28, 'What does the area of a B–H loop measure?', 'The energy lost as heat per unit volume in each cycle.', 'concept', 5),
    fc(29, 'Material for a permanent magnet, and why?', 'Steel or alnico: high retentivity and high coercivity.', 'exam-tip', 5),
    fc(30, 'Material for a transformer core, and why?', 'Laminated soft iron or silicon steel: high permeability, narrow loop, small loss.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
