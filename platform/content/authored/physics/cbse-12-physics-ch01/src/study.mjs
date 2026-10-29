// ch01 notes and flashcards.
import { T, unit, table, PROV, r } from './lib.mjs';
import { V, shellPlot, wirePlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Electric Charges and Fields — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Electric charge and its properties',
      `**Electric charge** is a basic property of matter that makes it exert and feel electric forces. SI unit: **coulomb (C)**.

- **Two kinds:** positive and negative. Like charges repel; unlike charges attract. (Glass rubbed with silk becomes positive; the silk negative.)
- **Additivity:** the total charge of a system is the algebraic sum of its charges.
- **Conservation:** the net charge of an isolated system never changes. Charging by rubbing only **transfers electrons**.
- **Quantisation:** $q = n e$, where $n$ is an integer and $e = 1.6 \\times 10^{-19}$ C. Everyday charges contain so many $e$ that charge looks continuous.

**Conductors** (metals, the human body, tap water) have free charge carriers; **insulators** (glass, plastic, dry wood) hold charge where it is placed.

**Charging by induction:** bring a charged rod near an insulated conductor; charges separate. Earth the far side, remove the earth connection, then remove the rod. The conductor keeps a charge **opposite** to the rod's. A charged body attracts a neutral light object (a paper bit) because it induces opposite charge on the near side.`,
      [kt('Quantisation', 'Charge exists only in whole-number multiples of $e = 1.6 \\times 10^{-19}$ C.'), kt('Conservation of charge', 'The total charge of an isolated system stays constant.'), kt('Induction', 'Separating charges in a conductor by bringing a charged body near it, without contact.')],
      [fm(r`q = n e,\quad e = 1.6 \times 10^{-19}\ \text{C}`, 'Quantisation')],
      null,
      [1],
    ),
    sec(
      '2. Coulomb’s law and superposition',
      `For two point charges a distance $r$ apart in vacuum:

$$F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{|q_1 q_2|}{r^2},\\qquad \\dfrac{1}{4\\pi\\varepsilon_0} = k = 9 \\times 10^{9}\\ \\text{N m}^2\\,\\text{C}^{-2},\\qquad \\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2\\,\\text{N}^{-1}\\,\\text{m}^{-2}$$

**Vector form:** $\\vec F_{21} = k\\dfrac{q_1 q_2}{r^2}\\hat r_{12}$ (force on $q_2$; $\\hat r_{12}$ points from $q_1$ to $q_2$), and $\\vec F_{12} = -\\vec F_{21}$.

**In a medium** of dielectric constant $\\varepsilon_r$: $F = \\dfrac{F_\\text{vacuum}}{\\varepsilon_r}$.

**Superposition:** the force on a charge due to many charges is the **vector sum** of the individual Coulomb forces, each calculated as if the others were absent.

**Method for multi-charge problems:** (1) draw each force with its direction from the signs; (2) find magnitudes; (3) add by components or, for perpendicular forces, by Pythagoras; (4) state magnitude and direction.

*Worked result (deck example 2):* forces of 0.40 N and 0.30 N at right angles give 0.50 N.`,
      [kt('Coulomb’s law', 'The force between two point charges is proportional to the product of the charges and inversely proportional to the square of their separation.'), kt('Dielectric constant', 'The factor $\\varepsilon_r = \\varepsilon/\\varepsilon_0$ by which a medium reduces the force between charges.')],
      [fm(r`F = k\,\dfrac{|q_1 q_2|}{r^2}`, 'Coulomb’s law'), fm(r`\vec F_0 = \sum_i \vec F_{0i}`, 'Superposition')],
      V.forces,
      [1],
      [V.super],
    ),
    sec(
      '3. Electric field and field lines',
      `The **electric field** at a point is the force per unit small positive test charge: $\\vec E = \\vec F / q_0$ (unit N C$^{-1}$). A charge $q$ placed there feels $\\vec F = q\\vec E$ (opposite to $\\vec E$ if $q < 0$).

**Point charge:** $E = k\\dfrac{|q|}{r^2}$, radially away from a positive charge and towards a negative one.

**System of charges:** $\\vec E = \\sum \\vec E_i$ (superposition).

**Field lines** — properties:
- tangent gives the direction of $\\vec E$; start on $+$ charges, end on $-$ charges (or at infinity);
- never cross; never form closed loops in electrostatics;
- crowding shows strength; parallel equally spaced lines show a **uniform** field;
- meet a conductor's surface at right angles.

**Neutral point:** where the resultant field is zero. Between two **like** charges it lies between them (nearer the smaller charge); for **unlike** charges it lies outside, on the side of the smaller charge.`,
      [kt('Electric field', 'Force per unit positive test charge at a point.'), kt('Field line', 'A curve whose tangent at every point is along the electric field there.'), kt('Neutral point', 'A point where the net electric field is zero.')],
      [fm(r`\vec E = \dfrac{\vec F}{q_0},\qquad E = k\,\dfrac{|q|}{r^2}`, 'Electric field')],
      V.dipoleLines,
      [2],
      [V.pos, V.likeLines],
    ),
    sec(
      '4. Electric dipole',
      `**Dipole:** charges $+q$ and $-q$ separated by $2a$. **Dipole moment** $\\vec p = q(2a)$, from $-q$ to $+q$, unit C m.

| Point at distance $r$ from the centre | Exact | Short dipole ($r \\gg a$) | Direction |
|---|---|---|---|
| Axis | $\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{2pr}{(r^2-a^2)^2}$ | $\\dfrac{2kp}{r^3}$ | along $\\vec p$ |
| Equatorial line | $\\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{p}{(r^2+a^2)^{3/2}}$ | $\\dfrac{kp}{r^3}$ | opposite to $\\vec p$ |

At the same large distance, $E_\\text{axis} = 2E_\\text{eq}$. A dipole field falls as $1/r^3$.

**Dipole in a uniform field:** net force zero; torque $\\vec\\tau = \\vec p \\times \\vec E$, $\\tau = pE\\sin\\theta$. Stable equilibrium at $\\theta = 0^\\circ$, unstable at $180^\\circ$, maximum torque $pE$ at $90^\\circ$. In a **non-uniform** field there is also a net force (towards stronger field when $\\vec p$ is along $\\vec E$).`,
      [kt('Dipole moment', 'Product of either charge and the separation, directed from the negative to the positive charge.'), kt('Polar molecule', 'A molecule with a permanent dipole moment, such as water.')],
      [fm(r`p = q \times 2a`, 'Dipole moment'), fm(r`E_\text{axis} \approx \dfrac{2kp}{r^3},\quad E_\text{eq} \approx \dfrac{kp}{r^3}`, 'Short dipole'), fm(r`\vec\tau = \vec p \times \vec E`, 'Torque')],
      V.dipoleGeom,
      [3],
      [V.torque],
    ),
    sec(
      '5. Continuous charge distributions',
      `Charge spread over an object is described by a density:

- **linear** $\\lambda = dq/dl$ (C m$^{-1}$), e.g. a charged wire or ring;
- **surface** $\\sigma = dq/dS$ (C m$^{-2}$), e.g. a charged plate or shell;
- **volume** $\\rho = dq/dV$ (C m$^{-3}$), e.g. a charged cloud.

**Set-up:** split into elements $dq$, use $d\\vec E = k\\dfrac{dq}{r^2}\\hat r$ for each, and add vectors: $\\vec E = k\\int \\dfrac{dq}{r^2}\\hat r$. Use symmetry to see which components cancel.`,
      [kt('Linear charge density', 'Charge per unit length, $\\lambda$.'), kt('Surface charge density', 'Charge per unit area, $\\sigma$.')],
      [fm(r`\vec E = \dfrac{1}{4\pi\varepsilon_0}\int \dfrac{dq}{r^2}\,\hat r`, 'Continuous distribution')],
      V.continuous,
      [4],
    ),
    sec(
      '6. Electric flux and Gauss’s law',
      `**Flux** through a small area: $\\Delta\\phi = \\vec E\\cdot\\Delta\\vec S = E\\,\\Delta S\\cos\\theta$, where $\\Delta\\vec S$ is normal to the area (outward for a closed surface). Unit N m² C$^{-1}$; a scalar.

**Gauss’s law:** $\\displaystyle\\oint_S \\vec E\\cdot d\\vec S = \\dfrac{q_\\text{enc}}{\\varepsilon_0}$.

- True for any closed surface of any shape.
- $\\vec E$ in the integral is the total field (from charges inside and outside), but only enclosed charge contributes net flux.
- Charge outside: net flux zero. Charge inside: flux independent of the surface's size and shape and of where the charge sits inside.
- A charge $q$ at the centre of a cube sends $q/6\\varepsilon_0$ through each face.`,
      [kt('Electric flux', 'The surface integral of the field, $\\oint \\vec E\\cdot d\\vec S$; a measure of field lines crossing a surface.'), kt('Gaussian surface', 'A closed surface chosen to apply Gauss’s law.')],
      [fm(r`\phi = \oint_S \vec E\cdot d\vec S = \dfrac{q_\text{enc}}{\varepsilon_0}`, 'Gauss’s law')],
      V.flux,
      [5],
      [V.gauss],
    ),
    sec(
      '7. Applications of Gauss’s law',
      `| Charged object | Gaussian surface | Result |
|---|---|---|
| Infinitely long straight wire, $\\lambda$ | Coaxial cylinder; flux only through curved side | $E = \\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}$, radial |
| Infinite plane sheet, $\\sigma$ | Pillbox; flux only through the two ends | $E = \\dfrac{\\sigma}{2\\varepsilon_0}$, normal, independent of distance |
| Thin spherical shell, $q$, radius $R$, outside ($r > R$) | Concentric sphere | $E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q}{r^2}$ |
| Same shell, inside ($r < R$) | Concentric sphere, $q_\\text{enc} = 0$ | $E = 0$ |

**Steps for a derivation:** draw the Gaussian surface; state why $\\vec E$ is constant and normal on part of it and why other parts carry no flux; write flux $=$ charge enclosed $/\\varepsilon_0$; solve for $E$; give the direction.`,
      [kt('Shielding', 'The field inside a charged conducting or thin shell is zero, so the inside is screened from charges on the shell.')],
      [fm(r`E_\text{wire} = \dfrac{\lambda}{2\pi\varepsilon_0 r}`, 'Long wire'), fm(r`E_\text{sheet} = \dfrac{\sigma}{2\varepsilon_0}`, 'Plane sheet'), fm(r`E_\text{shell} = \dfrac{q}{4\pi\varepsilon_0 r^2}\ (r > R),\quad 0\ (r < R)`, 'Thin shell')],
      V.gaussApps,
      [6],
      [shellPlot, wirePlot],
    ),
  ],
  exam_tips_md: `- **Units first:** $\\mu$C $= 10^{-6}$ C, nC $= 10^{-9}$ C, cm $= 10^{-2}$ m.
- **Direction always:** a force or field answer without a direction loses a mark.
- **Derivations** (dipole axial or equatorial field, wire, sheet, shell): figure, directions, the key step, the final result, the approximation used.
- **Gauss's law:** name the surface and justify where the flux is zero.
- **Field lines:** arrows on every line, no crossings, density shows strength.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Charge on an electron?', '$-1.6 \\times 10^{-19}$ C (magnitude $e$).', 'fact', 1),
    fc(2, 'Quantisation of charge?', 'Any charge is $q = n e$ with $n$ an integer.', 'definition', 1),
    fc(3, 'Conservation of charge?', 'The net charge of an isolated system stays constant; charge is only transferred.', 'definition', 1),
    fc(4, 'A rod becomes positive on rubbing. What moved?', 'Electrons moved **off** the rod; protons do not move.', 'concept', 1),
    fc(5, 'Why does a charged comb pick up paper bits?', 'It induces opposite charge on the near side of the paper; attraction to the nearer charge wins.', 'concept', 1),
    fc(6, 'Charging by induction: sign of charge left on the conductor?', 'Opposite to the charge on the inducing rod.', 'fact', 1),
    fc(7, 'Coulomb’s law?', '$F = k\\dfrac{|q_1q_2|}{r^2}$, along the line joining the charges.', 'formula', 1),
    fc(8, 'Value of $k = 1/4\\pi\\varepsilon_0$?', '$9 \\times 10^{9}$ N m² C$^{-2}$.', 'fact', 1),
    fc(9, 'Value of $\\varepsilon_0$?', '$8.85 \\times 10^{-12}$ C² N$^{-1}$ m$^{-2}$.', 'fact', 1),
    fc(10, 'Force between charges in a medium of dielectric constant $\\varepsilon_r$?', 'Vacuum force divided by $\\varepsilon_r$.', 'formula', 1),
    fc(11, 'Principle of superposition?', 'The net force (or field) is the vector sum of the forces (fields) due to each charge alone.', 'definition', 1),
    fc(12, 'Define electric field.', 'Force per unit small positive test charge: $\\vec E = \\vec F/q_0$, unit N C$^{-1}$.', 'definition', 2),
    fc(13, 'Field of a point charge?', '$E = kq/r^2$, radial (outward for $+q$).', 'formula', 2),
    fc(14, 'Why can field lines never cross?', 'The field would have two directions at the crossing point.', 'concept', 2),
    fc(15, 'Why are electrostatic field lines never closed loops?', 'They start on $+$ and end on $-$ charges; the electrostatic field is conservative.', 'concept', 2),
    fc(16, 'Neutral point between two equal like charges?', 'Midway between them.', 'example', 2),
    fc(17, 'Dipole moment: definition and direction?', '$p = q \\times 2a$, from $-q$ to $+q$; unit C m.', 'definition', 3),
    fc(18, 'Short-dipole field on the axis?', '$2kp/r^3$, along $\\vec p$.', 'formula', 3),
    fc(19, 'Short-dipole field on the equatorial line?', '$kp/r^3$, opposite to $\\vec p$.', 'formula', 3),
    fc(20, 'Torque on a dipole in a uniform field?', '$\\vec\\tau = \\vec p \\times \\vec E$, $\\tau = pE\\sin\\theta$; net force zero.', 'formula', 3),
    fc(21, 'Stable and unstable positions of a dipole?', 'Stable: $\\vec p$ along $\\vec E$ ($0^\\circ$). Unstable: opposite ($180^\\circ$).', 'concept', 3),
    fc(22, 'How does a dipole field fall with distance?', 'As $1/r^3$.', 'fact', 3),
    fc(23, 'Linear, surface, volume charge densities?', '$\\lambda$ (C m$^{-1}$), $\\sigma$ (C m$^{-2}$), $\\rho$ (C m$^{-3}$).', 'definition', 4),
    fc(24, 'Electric flux through an area?', '$\\phi = \\vec E\\cdot\\vec S = ES\\cos\\theta$; unit N m² C$^{-1}$.', 'formula', 5),
    fc(25, 'Gauss’s law?', 'Total flux through a closed surface $= q_\\text{enc}/\\varepsilon_0$.', 'formula', 5),
    fc(26, 'Flux through a closed surface with a charge outside it?', 'Zero.', 'fact', 5),
    fc(27, 'Charge $q$ at the centre of a cube: flux through one face?', '$q/6\\varepsilon_0$.', 'example', 5),
    fc(28, 'Field of an infinitely long wire?', '$\\lambda/2\\pi\\varepsilon_0 r$, radial.', 'formula', 6),
    fc(29, 'Field of an infinite plane sheet?', '$\\sigma/2\\varepsilon_0$, independent of distance.', 'formula', 6),
    fc(30, 'Field inside and outside a thin charged shell?', 'Inside 0; outside $kq/r^2$ as if the charge were at the centre.', 'formula', 6),
    fc(31, 'Gaussian surface for a long wire?', 'A coaxial cylinder; flux only through its curved surface.', 'diagram', 6),
    fc(32, 'Exam tip: Gauss’s law derivations?', 'Name the surface, explain zero-flux parts, write flux $= q_\\text{enc}/\\varepsilon_0$, solve, give direction.', 'exam-tip', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
