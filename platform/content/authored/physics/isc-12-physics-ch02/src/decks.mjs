// ISC 12 Physics ch02 Electric Flux and Gauss's Theorem — two decks: Part 1 (t01–t02) electric flux and Gauss's theorem;
// Part 2 (t03–t05) fields of a long line of charge, an infinite plane sheet and a thin spherical shell. Numbers computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec, K, EPS0 } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const deg = (d) => (d * Math.PI) / 180;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { E: 2.0e3, a: 0.1 };
ex1.A = ex1.a ** 2;
ex1.f0 = ex1.E * ex1.A;
ex1.f60 = ex1.E * ex1.A * Math.cos(deg(60));
const ex2 = { qin: 3e-9 - 1e-9 };
ex2.phi = ex2.qin / EPS0;
const ex3 = { q: 6e-6 };
ex3.face = ex3.q / (6 * EPS0);
const ex4 = { lam: 3e-6, r: 0.05 };
ex4.E = (2 * K * ex4.lam) / ex4.r;
const ex5 = { sig: 4e-6 };
ex5.one = ex5.sig / (2 * EPS0);
ex5.two = ex5.sig / EPS0;
const ex6 = { q: 2e-8, R: 0.1 };
ex6.Es = (K * ex6.q) / ex6.R ** 2;
ex6.E20 = (K * ex6.q) / 0.2 ** 2;
ex6.sigma = ex6.q / (4 * Math.PI * ex6.R ** 2);
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6 };

export const V = {
  flux: svgV(G.FLUX, 'Area vector of a flat surface at angle θ to a uniform field'),
  gauss: svgV(G.GAUSS, 'A closed surface with two charges inside and one outside'),
  apps: svgV(G.GAUSS_APPS, 'Gaussian surfaces for a long wire, a plane sheet and a thin spherical shell'),
  cube: svgV(G.CUBE, 'A point charge at the centre of a cube'),
  plates: svgV(G.PLATES, 'Fields of two oppositely charged parallel sheets'),
};
export const shellPlot = plot(
  {
    x: { min: 0, max: 4, label: 'r / R (distance from the centre in shell radii)' },
    y: { min: 0, max: 1.2, label: 'E / E_surface' },
    functions: [
      { expr: '0', label: 'inside (r < R): E = 0', domain: [0, 1] },
      { expr: '1/x^2', label: 'outside (r ≥ R): E = kq/r²', domain: [1, 4] },
    ],
    vlines: [{ x: 1, label: 'surface r = R', dashed: true }],
  },
  'Field of a charged thin spherical shell against distance from its centre: zero everywhere inside, jumping to its largest value at the surface and then falling as one over r squared',
  'Inside E = 0; on the surface E = kq/R² = σ/ε₀; outside the shell acts like a point charge at its centre.',
);
export const linePlot = plot(
  {
    x: { min: 0.5, max: 4, label: 'distance r (in units of r₀)' },
    y: { min: 0, max: 2.2, label: 'E / E₀' },
    functions: [
      { expr: '1/x', label: 'long line: E ∝ 1/r' },
      { expr: '1/x^2', label: 'point charge: E ∝ 1/r²' },
      { expr: '1', label: 'infinite sheet: E constant' },
    ],
  },
  'Fields compared against distance: a point charge falls as one over r squared, a long line of charge as one over r, and an infinite sheet not at all',
  'The more the charge is spread out, the more slowly its field falls with distance.',
);
const appsTable = table(
  ['Charge distribution', 'Gaussian surface', 'Field'],
  [
    ['Long straight line, λ', 'Coaxial cylinder, radius r', 'E = λ/(2πε₀r)'],
    ['Infinite plane sheet, σ', 'Pillbox (cylinder) across the sheet', 'E = σ/(2ε₀)'],
    ['Thin spherical shell, q', 'Concentric sphere, radius r', 'r < R: 0; r ≥ R: q/(4πε₀r²)'],
  ],
  'Table of the three applications of Gauss’s theorem with the Gaussian surface and the resulting field for each',
);

export const deck1 = deck({
  part: 1,
  title: 'Electric Flux and Gauss’s Theorem — Part 1: Flux and Gauss’s theorem',
  goals: [
    'Calculate electric flux through a plane surface in a uniform field',
    'State Gauss’s theorem and use it to find the flux through closed surfaces',
    'Choose a suitable Gaussian surface for a symmetric charge distribution',
  ],
  slides: [
    sl('title', 'Electric Flux and Gauss’s Theorem', {
      b: 'Part 1 — how much field passes through a surface, and a theorem that links it to the charge inside.',
      v: V.gauss,
      n: 'In the last chapter we added up fields charge by charge. For a charged wire, plate or sphere that becomes hard work. Gauss found a short cut: count how much field passes out through a closed surface, and you know how much charge is inside. In this part we define that quantity, the electric flux, and state Gauss’s theorem.',
    }),
    sl('concept', 'Flux of a vector field', {
      b: 'Think of water flowing through a wire loop: the amount passing through depends on the flow speed, the loop’s area and how it is tilted. The **area vector** $\\Delta\\vec S$ has magnitude equal to the area and direction **normal** to it (outward for a closed surface).',
      ul: ['Flux is largest when the loop faces the flow and zero when it lies edge-on.', 'Electric flux applies the same idea to the electric field.'],
      v: V.flux,
      n: 'Hold a ring in a stream. Facing the flow, a lot of water passes through it; turned edge-on, none does. To describe the tilt we give every flat area a direction, the area vector, perpendicular to the surface. For a closed surface we always choose it pointing outwards. Electric flux uses exactly this picture, with the electric field in place of the flowing water.',
    }),
    sl('diagram', 'Electric flux', {
      b: r`For a plane area $\Delta S$ in a uniform field:
$$\Delta\Phi = \vec E\cdot\Delta\vec S = E\,\Delta S\cos\theta$$
For a non-uniform field or a curved surface, add up small pieces: $\Phi = \oint \vec E\cdot d\vec S$. Unit: N m² C⁻¹ (= V m). Flux is a **scalar**.`,
      ul: ['θ = 0°: $\\Phi = E\\Delta S$ (maximum).', 'θ = 90°: $\\Phi = 0$ (field parallel to the surface).', 'θ = 180°: $\\Phi = -E\\Delta S$ (field entering against the outward normal).'],
      v: V.flux,
      n: 'The electric flux through a small flat area is E times the area times the cosine of the angle between the field and the area vector. Face-on, the cosine is one and the flux is greatest. Edge-on, the cosine is zero and no flux passes. If the field goes in against the outward normal, the flux is negative. For a curved surface, we split it into tiny pieces and add.',
    }),
    sl('example', 'Worked example 1: flux through a square', {
      b: r`A square of side 10 cm is placed in a uniform field of $2.0 \times 10^{3}$ N C$^{-1}$. Find the flux through it when its area vector makes (a) 0°, (b) 60°, (c) 90° with the field.`,
      ul: [
        r`Area $= (0.10)^2 = ${dec(ex1.A, 2)}$ m².`,
        r`(a) $\Phi = EA = 2.0 \times 10^{3} \times 0.010 = ${dec(ex1.f0, 2)}$ N m² C$^{-1}$. (b) $\Phi = EA\cos 60° = ${dec(ex1.f60, 2)}$ N m² C$^{-1}$. (c) $\Phi = 0$.`,
      ],
      v: V.flux,
      n: 'The square has an area of one hundredth of a square metre. Facing the field, the flux is two thousand times that, twenty newton metres squared per coulomb. Tilted to sixty degrees, the cosine halves it to ten. Turned so that the field runs along its face, no field lines pass through, and the flux is zero.',
    }),
    sl('concept', 'Gauss’s theorem', {
      b: r`The total electric flux through any **closed** surface equals $1/\varepsilon_0$ times the **net charge enclosed**:
$$\oint \vec E\cdot d\vec S = \dfrac{q_\text{enclosed}}{\varepsilon_0}$$`,
      ul: ['Charges **outside** the surface contribute **no net flux** (every line that enters also leaves), although they change E at points on the surface.', 'The flux does not depend on the shape or size of the surface, only on the enclosed charge.', 'A surface enclosing no net charge (or equal + and −) has zero net flux.'],
      v: V.gauss,
      n: 'Gauss’s theorem says that the total flux out of any closed surface is the charge inside divided by epsilon nought. Charges outside do not count: their field lines go in on one side and come out on the other, so their net flux is zero. Squash or stretch the surface as much as you like; as long as the same charge is inside, the total flux is the same.',
    }),
    sl('example', 'Worked example 2: flux through a closed surface', {
      b: r`A closed surface encloses charges of $+3.0$ nC and $-1.0$ nC; a charge of $+5.0$ nC lies outside it. Find the net flux through the surface.`,
      ul: [
        r`Step 1 — only enclosed charges count: $q_\text{in} = 3.0 - 1.0 = 2.0$ nC.`,
        r`Step 2 — $\Phi = \dfrac{q_\text{in}}{\varepsilon_0} = \dfrac{2.0 \times 10^{-9}}{8.85 \times 10^{-12}} \approx ${dec(ex2.phi, 3)}$ N m² C$^{-1}$.`,
      ],
      v: V.gauss,
      n: 'Ignore the charge outside: whatever field it sends through the surface comes in and goes out again. Inside, the charges add to two nanocoulombs. Dividing by epsilon nought gives about two hundred and twenty six newton metres squared per coulomb. The outside charge does change the field at each point of the surface, but not the total flux.',
    }),
    sl('example', 'Worked example 3: a charge at the centre of a cube', {
      b: r`A charge of $6.0\ \mu$C is at the centre of a cube. Find the flux through (a) the whole cube, (b) one face.`,
      ul: [
        r`(a) $\Phi = \dfrac{q}{\varepsilon_0} = \dfrac{6.0 \times 10^{-6}}{8.85 \times 10^{-12}} \approx ${sci(ex3.face * 6, 3)}$ N m² C$^{-1}$.`,
        r`(b) By symmetry the six faces share it equally: $\Phi_\text{face} = \dfrac{q}{6\varepsilon_0} \approx ${sci(ex3.face, 3)}$ N m² C$^{-1}$.`,
      ],
      v: V.cube,
      n: 'Gauss’s theorem gives the total flux through the cube at once: six microcoulombs divided by epsilon nought, about six point eight times ten to the five. The charge sits at the centre, so no face is special: each gets exactly a sixth, about one point one three times ten to the five. Notice we never needed the field on the faces, which varies from point to point.',
    }),
    sl('check', 'Quick check: enclosed charge', {
      b: 'Choose the correct option.',
      v: V.gauss,
      chk: 'outside-mcq',
      n: 'Which charges contribute to the net flux through a closed surface?',
    }),
    sl('concept', 'Choosing a Gaussian surface', {
      b: 'Gauss’s theorem is true for any closed surface, but it gives E easily only when we choose a **Gaussian surface** that matches the symmetry:',
      ul: ['On each part, $\\vec E$ is either **perpendicular** to the surface with the **same size**, or **parallel** to it (zero flux).', 'The surface passes through the point where E is wanted.', 'It must not pass through a point charge (E is undefined there).'],
      v: V.apps,
      n: 'To use Gauss’s theorem to find a field, we choose an imaginary closed surface cleverly. Over each of its parts the field should either be the same size and straight out through the surface, or run along the surface so no flux passes. Then the flux is just E times an area, and we can solve for E. Cylinders suit lines and sheets; spheres suit spherical charges.',
    }),
    sl('two-column', 'Gauss’s theorem and Coulomb’s law', {
      b: 'The two are equivalent for static charges:',
      cols: [
        '**From Coulomb to Gauss**\n- Field of q: kq/r²\n- Sphere area 4πr²\n- Flux = E × 4πr² = q/ε₀\n- Independent of r',
        '**From Gauss to Coulomb**\n- Sphere round q, E radial\n- E × 4πr² = q/ε₀\n- E = q/(4πε₀r²)\n- F = q₀E gives Coulomb’s law',
      ],
      v: V.gauss,
      n: 'Gauss’s theorem is not new physics: it follows from Coulomb’s law. Put a sphere of radius r round a point charge. The field is k q over r squared everywhere on it, and the area is four pi r squared, so the flux is q over epsilon nought, whatever the radius. Run the argument backwards and Gauss’s theorem gives Coulomb’s law. The inverse-square law is what makes the radius cancel.',
    }),
    sl('check', 'Quick check: flux through a face', {
      b: 'Calculate the flux.',
      v: V.cube,
      chk: 'cubeface-num',
      n: 'Divide the total flux equally among the six faces.',
    }),
    sl('check', 'Quick check: zero flux', {
      b: 'Judge the assertion and the reason.',
      v: V.gauss,
      chk: 'zeroflux-ar',
      n: 'Does zero net flux through a surface mean the field on the surface is zero?',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Area vector', 'Normal to the surface; outward for closed surfaces'],
          ['Flux (uniform E)', '$\\Phi = \\vec E\\cdot\\Delta\\vec S = E\\Delta S\\cos\\theta$'],
          ['Flux (general)', '$\\Phi = \\oint \\vec E\\cdot d\\vec S$; unit N m² C⁻¹'],
          ['Gauss’s theorem', '$\\oint \\vec E\\cdot d\\vec S = q_\\text{enc}/\\varepsilon_0$'],
          ['Outside charges', 'No net flux'],
          ['Gaussian surface', 'Match the symmetry: E ⟂ and constant, or E ∥'],
        ],
        'Summary table of area vector, flux, Gauss’s theorem, the effect of outside charges and how to choose a Gaussian surface',
      ),
      n: 'To sum up: flux measures how much field passes through a surface, E dot the area vector. Gauss’s theorem says that the total flux out of a closed surface is the enclosed charge over epsilon nought, regardless of the surface’s shape or of charges outside. To find fields with it, choose a Gaussian surface that fits the symmetry of the charge.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'State Gauss’s theorem in words and as $\\oint \\vec E\\cdot d\\vec S = q/\\varepsilon_0$.',
        'In flux problems, check whether θ is measured from the surface or from its normal.',
        'Only enclosed charge counts; give the sign of the flux.',
        'Symmetry problems (cube, hemisphere): total flux first, then divide.',
      ],
      v: table(['Asked', 'Key point'], [['Unit of flux?', 'N m² C⁻¹ (V m)'], ['Is flux a vector?', 'No, a scalar'], ['Charge outside a surface?', 'Zero net flux']], 'Table of common questions and the key point for each'),
      n: 'Write Gauss’s theorem in words as well as symbols. In flux questions, read carefully whether the angle is to the surface or to its normal, since that swaps sine and cosine. Remember that only enclosed charge matters, and that flux has a sign. For charges at the centre of cubes or other symmetric shapes, find the total flux first and then share it out.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electric Flux and Gauss’s Theorem — Part 2: Applications',
  goals: [
    'Derive the field of an infinitely long straight line of charge',
    'Derive the field of an infinite plane sheet of charge',
    'Derive and graph the field inside, on and outside a charged thin spherical shell',
  ],
  slides: [
    sl('title', 'Applications of Gauss’s theorem', {
      b: 'Part 2 — three symmetric charge distributions whose fields Gauss’s theorem gives in a few lines.',
      v: V.apps,
      n: 'Now we put Gauss’s theorem to work. For a long charged wire, a large charged sheet and a thin charged spherical shell, adding up Coulomb fields piece by piece would take careful integration. With the right Gaussian surface, each field takes only a few lines, and the results show how the shape of a charge changes how its field depends on distance.',
    }),
    sl('diagram', 'Infinitely long straight line of charge', {
      b: r`Take a coaxial cylinder of radius $r$ and length $l$. By symmetry $\vec E$ is radial and of the same size on the curved surface; the flat ends get **no flux** ($\vec E \parallel$ the faces).
$$E \times 2\pi rl = \dfrac{\lambda l}{\varepsilon_0}\ \Rightarrow\ E = \dfrac{\lambda}{2\pi\varepsilon_0 r} = \dfrac{2k\lambda}{r}$$`,
      ul: ['E ∝ 1/r, directed radially outward for λ > 0.'],
      v: V.apps,
      n: 'Surround the wire with an imaginary cylinder of radius r and length l. The field points straight out from the wire and is the same all round, so only the curved side carries flux: E times two pi r l. The charge inside is lambda l. Setting the flux equal to lambda l over epsilon nought, the length cancels and the field is lambda over two pi epsilon nought r, falling as one over r.',
    }),
    sl('example', 'Worked example 4: field near a charged wire', {
      b: r`A long straight wire carries $3.0\ \mu$C per metre. Find the field 5.0 cm from it.`,
      ul: [
        r`$E = \dfrac{2k\lambda}{r} = \dfrac{2 \times 9 \times 10^{9} \times 3.0 \times 10^{-6}}{0.050} = ${sci(ex4.E, 3)}$ N C$^{-1}$, radially outward.`,
      ],
      v: linePlot,
      n: 'Use two k lambda over r, which is the same as lambda over two pi epsilon nought r. Nine times ten to the nine, times two, times three microcoulombs per metre, divided by five centimetres, gives about one point one times ten to the six newtons per coulomb. Doubling the distance would halve this, not quarter it as for a point charge.',
    }),
    sl('check', 'Quick check: field of a wire', {
      b: 'Calculate the field.',
      v: linePlot,
      chk: 'lineE-num',
      n: 'Use two k lambda over r with the distance in metres.',
    }),
    sl('diagram', 'Infinite plane sheet of charge', {
      b: r`Take a cylinder (pillbox) of cross-section $A$ through the sheet. $\vec E$ is perpendicular to the sheet on both sides; flux passes only through the two flat ends:
$$2EA = \dfrac{\sigma A}{\varepsilon_0}\ \Rightarrow\ E = \dfrac{\sigma}{2\varepsilon_0}$$`,
      ul: ['**Independent of distance** from the sheet (a uniform field on each side).', 'Two parallel sheets $\\pm\\sigma$: $E = \\sigma/\\varepsilon_0$ between them, zero outside.'],
      v: V.plates,
      n: 'For a large flat sheet, the field must point straight away from it on both sides. A small cylinder pushed through the sheet has flux only through its two ends, two E A in total, while the charge inside is sigma A. So E is sigma over two epsilon nought, with no dependence on distance at all. Two oppositely charged sheets give double this between them and nothing outside.',
    }),
    sl('example', 'Worked example 5: one sheet and two plates', {
      b: r`A large sheet carries $4.0\ \mu$C m$^{-2}$. Find (a) its field, (b) the field between two such sheets with $+\sigma$ and $-\sigma$, (c) the field outside the pair.`,
      ul: [
        r`(a) $E = \dfrac{\sigma}{2\varepsilon_0} = \dfrac{4.0 \times 10^{-6}}{2 \times 8.85 \times 10^{-12}} \approx ${sci(ex5.one, 3)}$ N C$^{-1}$.`,
        r`(b) The fields add: $E = \dfrac{\sigma}{\varepsilon_0} \approx ${sci(ex5.two, 3)}$ N C$^{-1}$, from $+\sigma$ to $-\sigma$. (c) They cancel: $E = 0$.`,
      ],
      v: V.plates,
      n: 'One sheet gives sigma over two epsilon nought, about two point two six times ten to the five newtons per coulomb, on either side. Between a positive and a negative sheet, both fields point the same way, from plus to minus, so they add to twice that. Outside the pair they point in opposite directions and cancel. This is the uniform field inside a parallel-plate capacitor.',
    }),
    sl('check', 'Quick check: field of a sheet', {
      b: 'Choose the correct option.',
      v: linePlot,
      chk: 'sheetdist-mcq',
      n: 'Does the field of an infinite sheet depend on distance?',
    }),
    sl('diagram', 'Thin spherical shell: outside and on the surface', {
      b: r`For a point outside ($r > R$), take a concentric sphere of radius $r$: $E \times 4\pi r^2 = \dfrac{q}{\varepsilon_0}$, so
$$E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2}\quad(r \ge R)$$
The shell acts like a point charge at its centre. On the surface, $E = \dfrac{q}{4\pi\varepsilon_0R^2} = \dfrac{\sigma}{\varepsilon_0}$.`,
      v: V.apps,
      n: 'Draw a sphere of radius r round the shell, centred on it. By symmetry the field is radial and the same all over this sphere, so the flux is E times four pi r squared, and the enclosed charge is all of q. That gives exactly the field of a point charge at the centre. On the surface itself, with r equal to R, the field is sigma over epsilon nought.',
    }),
    sl('diagram', 'Thin spherical shell: inside', {
      b: r`For a point inside ($r < R$), a concentric sphere of radius $r$ encloses **no charge**: $E \times 4\pi r^2 = 0$, so
$$E = 0\quad(r < R)$$`,
      ul: ['The field jumps from 0 just inside to σ/ε₀ just outside.', 'This is why a charged hollow conductor shields its inside (electrostatic shielding).'],
      v: shellPlot,
      n: 'Inside the shell, a Gaussian sphere contains no charge at all, so the flux through it is zero, and by symmetry the field must be zero everywhere inside. The graph shows the result: nothing inside, a jump to the largest value at the surface, then a fall as one over r squared. A car’s metal body protects passengers in much the same way.',
    }),
    sl('example', 'Worked example 6: a charged shell', {
      b: r`A thin spherical shell of radius 10 cm carries 20 nC. Find the field at 5.0 cm, 10 cm and 20 cm from its centre, and its surface charge density.`,
      ul: [
        r`At 5.0 cm (inside): $E = 0$.`,
        r`At 10 cm (surface): $E = \dfrac{9 \times 10^{9} \times 20 \times 10^{-9}}{(0.10)^2} = ${dec(ex6.Es, 3)}$ N C$^{-1}$; at 20 cm: $E = ${dec(ex6.E20, 3)}$ N C$^{-1}$ (a quarter).`,
        r`$\sigma = \dfrac{q}{4\pi R^2} = \dfrac{20 \times 10^{-9}}{4\pi(0.10)^2} \approx ${sci(ex6.sigma, 3)}$ C m$^{-2}$.`,
      ],
      v: shellPlot,
      n: 'Inside the shell, at five centimetres, the field is zero. At the surface it is k q over R squared, eighteen thousand newtons per coulomb. Twice as far from the centre it is a quarter of that, four and a half thousand. The surface charge density is the charge divided by the area of the sphere, about one point six times ten to the minus seven coulomb per square metre.',
    }),
    sl('two-column', 'How the fields depend on distance', {
      b: 'Compare:',
      cols: ['**Point charge / outside a shell**\n- E ∝ 1/r²\n\n**Long line**\n- E ∝ 1/r', '**Infinite sheet**\n- E independent of r\n\n**Inside a shell**\n- E = 0'],
      v: linePlot,
      n: 'The three results show a pattern. Charge concentrated at a point gives a field falling as one over r squared. Spread along a line, the field falls more slowly, as one over r. Spread over an infinite plane, it does not fall at all. And inside a closed charged shell there is no field. The more the charge is spread out, the more slowly its field weakens with distance.',
    }),
    sl('check', 'Quick check: inside a shell', {
      b: 'Decide whether the statement is true or false.',
      v: shellPlot,
      chk: 'inside-tf',
      n: 'How much charge does a Gaussian sphere inside the shell enclose?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: appsTable,
      n: 'To sum up: a coaxial cylinder gives the field of a long line of charge, lambda over two pi epsilon nought r. A pillbox gives the field of an infinite sheet, sigma over two epsilon nought, the same at every distance, and two opposite sheets give sigma over epsilon nought between them. Concentric spheres show that a thin shell has no field inside and acts like a point charge outside.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'In each derivation: draw the Gaussian surface, say where the flux is zero, write flux = E × area, then equate to $q_\\text{enc}/\\varepsilon_0$.',
        'Line: λl inside; sheet: σA inside and flux through **two** ends; shell: q inside only for r ≥ R.',
        'Sketch E against r for the shell with the jump at r = R.',
        'For two plates: add fields between, cancel outside.',
      ],
      v: table(['Asked', 'Key point'], [['Field of a sheet at 1 m and 2 m?', 'Same'], ['Field inside a charged shell?', 'Zero'], ['Wire: double r?', 'E halves']], 'Table of common questions and the key point for each'),
      n: 'Every Gauss derivation has the same shape: draw the surface, show where flux is zero, write the flux as E times the useful area, and set it equal to the enclosed charge over epsilon nought. For the sheet, remember both end faces. For the shell, the enclosed charge is zero inside. And for parallel plates, think about which way each sheet’s field points.',
    }),
  ],
});
