// ISC 12 Physics ch02 Electric Flux and Gauss's Theorem — question bank (ISC style). Numbers computed here and re-checked.
import { mk, add, r, sci, dec, near, K, EPS0, QE, ME } from '../../isc-12-physics-ch01/src/lib.mjs';

const { mcq, ar, tf, fill, num, short, long } = mk;
const deg = (d) => (d * Math.PI) / 180;

// ================================================================ t01 electric flux
add('fluxunit-mcq', mcq({
  stem: 'The SI unit of electric flux is',
  right: 'N m² C⁻¹',
  wrong: ['N C⁻¹', 'N m C⁻¹', 'C m²'],
  sol: 'Φ = E × area: (N C⁻¹)(m²) = N m² C⁻¹, equivalent to V m — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('scalar-tf', tf({
  stem: 'Electric flux through a surface is a vector quantity directed along the area vector.',
  key: 'f',
  sol: 'False. Flux is the scalar (dot) product E · S; it has a sign but no direction.',
  d: 1, c: 'understanding', t: [1],
}));
const tl = { E: 500, A: 0.2 * 0.1, plane: 30 };
tl.phi = tl.E * tl.A * Math.cos(deg(90 - tl.plane));
add('tilt-num', num({
  stem: 'A flat rectangle 20 cm × 10 cm lies in a uniform field of 500 N C⁻¹ with the field making an angle of 30° with the PLANE of the rectangle. Find the flux through the rectangle, in N m² C⁻¹.',
  value: Number(dec(tl.phi, 2)), tol: 0.05, unit: 'N m² C⁻¹',
  sol: r`The angle between E and the area vector (normal) is $90° - 30° = 60°$. $\Phi = EA\cos 60° = 500 \times 0.020 \times 0.5 = ${dec(tl.phi, 2)}$ N m² C$^{-1}$.`,
  scheme: [['θ with the normal = 60°', 1], ['Φ = 5.0 N m² C⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(tl.phi, 5) && near(q.answer.value, 5) || 'tl');
add('edge-mcq', mcq({
  stem: 'The flux of a uniform electric field through a flat surface is zero when',
  right: 'the field is parallel to the surface',
  wrong: ['the field is perpendicular to the surface', 'the field makes 45° with the surface', 'the surface is very small'],
  sol: 'Φ = EA cos θ with θ measured from the normal; a field parallel to the surface has θ = 90° — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
const dk = { r: 0.05, E: 1.2e3 };
dk.phi = dk.E * Math.PI * dk.r ** 2;
add('disc-num', num({
  stem: 'A circular disc of radius 5.0 cm faces a uniform field of 1.2 × 10³ N C⁻¹ squarely (field along its normal). Find the flux through it, in N m² C⁻¹ (3 significant figures).',
  value: Number(dec(dk.phi, 3)), tol: 0.05, unit: 'N m² C⁻¹',
  sol: r`$\Phi = E\pi r^2 = 1.2 \times 10^{3} \times \pi \times (0.050)^2 \approx ${dec(dk.phi, 3)}$ N m² C$^{-1}$.`,
  scheme: [['Φ = EA ≈ 9.42 N m² C⁻¹', 1]],
  d: 1, c: 'understanding', t: [1],
}), (q) => near(dk.phi, q.answer.value) || 'dk');
add('negflux-mcq', mcq({
  stem: 'Over a part of a closed surface where the electric field points into the surface, the flux is',
  right: 'negative, because E makes an angle greater than 90° with the outward normal',
  wrong: ['positive, because flux is always positive', 'zero, because the field enters the surface', 'positive, because the field points towards the enclosed volume'],
  sol: 'For closed surfaces the area vector points outward; an inward field gives cos θ < 0 — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('closedcyl-mcq', mcq({
  stem: 'A closed cylinder of radius R is placed in a uniform field E parallel to its axis. The net flux through the cylinder, and the flux through the end face where the field enters, are',
  right: 'zero, and −EπR²',
  wrong: ['2EπR², and +EπR²', 'zero, and zero', 'EπR², and −EπR²'],
  sol: 'The entering face gives −EπR², the leaving face +EπR², the curved surface zero (E parallel to it): net zero, as Gauss’s theorem requires with no charge inside — option (@K).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('nonuni-short', short({
  marks: 2,
  stem: 'How is the electric flux through a curved surface in a non-uniform field calculated? Write the expression.',
  model: 'Divide the surface into very small elements $d\\vec S$, each small enough to be **flat** and in which **E is uniform**. The flux through each is $\\vec E\\cdot d\\vec S$; the total is the **surface integral** $\\Phi = \\int \\vec E\\cdot d\\vec S$ (written $\\oint$ for a closed surface).',
  sol: 'Sum of E · dS over small elements.',
  scheme: [['Small elements with uniform E', 1], ['Φ = ∫E · dS', 1]],
  d: 2, c: 'understanding', t: [1], wl: null,
}));
add('areavector-fill', fill({
  stem: 'For a closed surface, the area vector of each small element is taken to point ___ (inward or outward).',
  acc: [['outward', 'outwards', 'out']],
  sol: '**Outward**, so that field lines leaving the surface give positive flux.',
  d: 1, c: 'recall', t: [1],
}));
const hm = { R: 0.1, E: 2e3 };
hm.phi = hm.E * Math.PI * hm.R ** 2;
add('hemi-short3', short({
  marks: 3,
  stem: 'A hemispherical bowl of radius 10 cm is placed with its flat rim facing a uniform field of 2.0 × 10³ N C⁻¹, the field along its axis and entering through the open circular face. Using Gauss’s theorem for the closed surface formed by the bowl and its flat face, find the flux through the curved surface.',
  model: r`The closed surface (bowl + flat face) encloses **no charge**, so its total flux is **zero**. Flux through the flat face (field entering): $-E\pi R^2$. Therefore flux through the curved surface $= +E\pi R^2 = 2.0 \times 10^{3} \times \pi \times (0.10)^2 \approx ${dec(hm.phi, 3)}$ N m² C$^{-1}$.`,
  sol: 'Net flux zero; curved = −flat.',
  scheme: [['No enclosed charge: net flux zero', 1], ['Flat face −EπR²', 1], ['Curved +EπR² ≈ 62.8 N m² C⁻¹', 1]],
  d: 4, c: 'analysis', t: [1, 2], wl: null,
}), () => near(hm.phi, 62.83) || 'hm');

// ================================================================ t02 Gauss's theorem
add('outside-mcq', mcq({
  stem: 'A closed surface encloses charges of +4.0 nC and −1.0 nC, and a charge of +2.0 nC sits just outside it. The net flux through the surface is determined by',
  right: '+3.0 nC only',
  wrong: ['+5.0 nC, all three charges', '+6.0 nC, the positive charges only', '+1.0 nC, the outside charge minus the inside ones'],
  sol: 'Only the enclosed charge, 4.0 − 1.0 = 3.0 nC, appears in Gauss’s theorem — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const cf = { q: 5.31e-9 };
cf.face = cf.q / (6 * EPS0);
add('cubeface-num', num({
  stem: 'A point charge of 5.31 nC sits at the centre of a cubical box. Find the electric flux through one face of the box, in N m² C⁻¹.',
  value: Number(dec(cf.face, 3)), tol: 1, unit: 'N m² C⁻¹',
  sol: r`Total flux $= \dfrac{q}{\varepsilon_0}$; by symmetry each of the 6 faces gets $\dfrac{q}{6\varepsilon_0} = \dfrac{5.31 \times 10^{-9}}{6 \times 8.85 \times 10^{-12}} = ${dec(cf.face, 3)}$ N m² C$^{-1}$.`,
  scheme: [['Total q/ε₀ shared equally by 6 faces', 1], ['100 N m² C⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(cf.face, 100) && near(q.answer.value, 100) || 'cf');
add('zeroflux-ar', ar({
  a: 'If the net electric flux through a closed surface is zero, the electric field must be zero at every point of the surface.',
  r: 'The net flux through a closed surface depends only on the charge enclosed by it.',
  key: 'd',
  sol: 'R is true. A is false: zero flux means zero enclosed charge; charges outside can still produce a field on the surface (entering in one place and leaving in another) — option (d).',
  d: 3, c: 'understanding', t: [2],
}));
const gn = { q: (5 - 2 + 1) * 1e-6 };
gn.phi = gn.q / EPS0;
add('gaussnum-num', num({
  stem: 'A closed balloon-shaped surface contains charges of +5.0 μC, −2.0 μC and +1.0 μC. Find the net flux through it, in units of 10⁵ N m² C⁻¹ (3 significant figures).',
  value: Number(dec(gn.phi / 1e5, 3)), tol: 0.03, unit: '× 10⁵ N m² C⁻¹',
  sol: r`$q_\text{enc} = 5.0 - 2.0 + 1.0 = 4.0\ \mu$C; $\Phi = \dfrac{4.0 \times 10^{-6}}{8.85 \times 10^{-12}} \approx ${sci(gn.phi, 3)}$ N m² C$^{-1}$, i.e. $\dfrac{${sci(gn.phi, 3)}}{10^{5}} = ${dec(gn.phi / 1e5, 3)}$.`,
  scheme: [['q_enc = 4.0 μC', 1], ['Φ ≈ 4.52 × 10⁵ N m² C⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(gn.phi / 1e5, q.answer.value) || 'gn');
const fq = { phi: 2.0e3 };
fq.q = fq.phi * EPS0;
add('findq-num', num({
  stem: 'Measurements show a net outward flux of 2.0 × 10³ N m² C⁻¹ through a closed surface surrounding a charged object. Find the net charge of the object, in nC (3 significant figures).',
  value: Number(dec(fq.q * 1e9, 3)), tol: 0.1, unit: 'nC',
  sol: r`$q = \varepsilon_0\Phi = 8.85 \times 10^{-12} \times 2.0 \times 10^{3} = ${sci(fq.q, 3)}$ C, i.e. $${sci(fq.q, 3)} \times 10^{9} = ${dec(fq.q * 1e9, 3)}$ nC.`,
  scheme: [['q = ε₀Φ', 1], ['17.7 nC', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(fq.q * 1e9, q.answer.value) || 'fq');
const cc = { q: 7.08e-9 };
cc.phi = cc.q / (8 * EPS0);
add('corner-num', num({
  stem: 'A point charge of 7.08 nC is placed exactly at one corner of a cube. Find the flux through the cube, in N m² C⁻¹ (3 significant figures).',
  value: Number(dec(cc.phi, 3)), tol: 1, unit: 'N m² C⁻¹',
  sol: r`Eight such cubes meeting at the corner would enclose the charge completely, sharing $q/\varepsilon_0$ equally, so one cube receives $\dfrac{q}{8\varepsilon_0} = \dfrac{7.08 \times 10^{-9}}{8 \times 8.85 \times 10^{-12}} = ${dec(cc.phi, 3)}$ N m² C$^{-1}$.`,
  scheme: [['Eight cubes surround the corner: q/(8ε₀)', 1], ['100 N m² C⁻¹', 1]],
  marks: 2, d: 5, c: 'analysis', t: [2],
}), (q) => near(cc.phi, 100) && near(q.answer.value, 100) || 'cc');
add('shapes-mcq', mcq({
  stem: 'A charge q is enclosed first by a sphere and then by a cube of very different size. The net fluxes through the two surfaces are',
  right: 'equal, each q/ε₀',
  wrong: ['larger for the larger surface', 'larger for the sphere, which is smoother', 'equal, but only if the charge is at the centre'],
  sol: 'Gauss’s theorem: the net flux depends only on the enclosed charge, not on the shape, size or position of the charge inside — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('doubleradius-mcq', mcq({
  stem: 'A point charge is at the centre of a spherical Gaussian surface. If the radius of the sphere is doubled, the flux through it',
  right: 'stays the same',
  wrong: ['doubles', 'becomes four times as large', 'becomes one quarter'],
  sol: 'E at the surface falls to ¼ but the area rises 4 times: the flux q/ε₀ is unchanged — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('chargedouble-mcq', mcq({
  stem: 'The charge enclosed by a spherical Gaussian surface is doubled and, at the same time, the radius of the surface is halved. The flux through the surface',
  right: 'doubles',
  wrong: ['stays the same', 'becomes four times as large', 'becomes eight times as large'],
  sol: 'Φ = q_enc/ε₀ depends only on the enclosed charge, which doubles; the radius does not matter — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gaussstate-short', short({
  marks: 2,
  stem: 'State Gauss’s theorem in electrostatics and write it in mathematical form, explaining each symbol.',
  model: 'The total electric flux through any **closed surface** is equal to $1/\\varepsilon_0$ times the **net charge enclosed** by it: $\\oint \\vec E\\cdot d\\vec S = q/\\varepsilon_0$. Here $\\vec E$ is the field at the surface element $d\\vec S$ (outward area vector), $q$ the net enclosed charge and $\\varepsilon_0$ the permittivity of free space.',
  sol: 'Statement and symbols.',
  scheme: [['Statement', 1], ['Equation with symbols explained', 1]],
  d: 1, c: 'recall', t: [2], wl: null,
}));
add('coulomb-short3', short({
  marks: 3,
  stem: 'Use Gauss’s theorem to derive Coulomb’s law for the force between two point charges.',
  model: r`Draw a spherical Gaussian surface of radius $r$ centred on a point charge $q$. By symmetry $\vec E$ is radial and has the same magnitude everywhere on it, parallel to $d\vec S$. So $\oint \vec E\cdot d\vec S = E \times 4\pi r^2 = \dfrac{q}{\varepsilon_0}$, giving $E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2}$. A second charge $q_0$ at distance $r$ feels $F = q_0E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{qq_0}{r^2}$: Coulomb’s law.`,
  sol: 'Sphere round q; E·4πr² = q/ε₀; F = q₀E.',
  scheme: [['Spherical Gaussian surface, E radial and constant', 1], ['E × 4πr² = q/ε₀', 1], ['F = q₀E = kqq₀/r²', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
add('dipolezero-mcq', mcq({
  stem: 'A closed surface completely encloses an electric dipole (charges +q and −q). The net flux through the surface is',
  right: 'zero',
  wrong: ['q/ε₀', '2q/ε₀', '−q/ε₀'],
  sol: 'The net enclosed charge is +q − q = 0, so the net flux is zero even though the field on the surface is not — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('gaussprop-short', short({
  marks: 2,
  stem: 'State two conditions that a well-chosen Gaussian surface should satisfy when Gauss’s theorem is used to find an electric field.',
  model: 'Any two: it is a **closed** surface that passes through the point where E is wanted; over each part of it E is either **perpendicular** to the surface and **constant** in magnitude, or **parallel** to the surface (zero flux); it must **not pass through** a point charge (where E is undefined).',
  sol: 'Closed, symmetric, avoiding point charges.',
  scheme: [['First condition', 1], ['Second condition', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('inout-ar', ar({
  a: 'A charge placed outside a closed surface changes the electric field at points on that surface.',
  r: 'The net electric flux through a closed surface depends only on the charge inside it.',
  key: 'b',
  sol: 'Both true, but R does not explain A: A is about the field at each point (affected by all charges), R about the total flux (affected only by enclosed charge) — option (b).',
  d: 3, c: 'understanding', t: [2],
}));
add('inversesq-ar', ar({
  a: 'The flux of a point charge through a concentric spherical surface does not depend on the radius of the sphere.',
  r: 'The field of a point charge falls as 1/r² while the area of the sphere grows as r².',
  key: 'a',
  sol: 'Both true, and R explains A: E × 4πr² = (kq/r²)(4πr²) = q/ε₀, independent of r — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
const nu = { b: 200, a1: 0.1, a2: 0.3, s: 0.2 };
nu.phi = nu.b * (nu.a2 - nu.a1) * nu.s ** 2;
nu.q = nu.phi * EPS0;
add('nonuniformcube-short3', short({
  marks: 3,
  stem: 'The electric field in a region is along +x and has magnitude E = (200 N C⁻¹ m⁻¹) × x. A cube of side 0.20 m has faces at x = 0.10 m and x = 0.30 m and its other faces parallel to the x-axis. Find the net flux through the cube and the charge inside it.',
  model: r`Only the two faces normal to x carry flux (E is parallel to the other four). At $x = 0.30$ m: $E = 60$ N C$^{-1}$, flux out $= 60 \times 0.04 = 2.4$. At $x = 0.10$ m: $E = 20$ N C$^{-1}$, flux in $= -20 \times 0.04 = -0.8$. Net $\Phi = ${dec(nu.phi, 2)}$ N m² C$^{-1}$; $q = \varepsilon_0\Phi = 8.85 \times 10^{-12} \times ${dec(nu.phi, 2)} \approx ${sci(nu.q, 3)}$ C.`,
  sol: 'Flux through the two x-faces only.',
  scheme: [['Only x-faces contribute', 1], ['Net Φ = 2.4 − 0.8 = 1.6 N m² C⁻¹', 1], ['q ≈ 1.42 × 10⁻¹¹ C', 1]],
  d: 4, c: 'analysis', t: [1, 2], wl: null,
}), () => near(nu.phi, 1.6) && near(nu.q, 1.416e-11) || 'nu');
add('fluxsign-short', short({
  marks: 2,
  stem: 'Explain why the net flux through a closed surface that encloses only a negative charge is negative.',
  model: 'Field lines of a negative charge point **inwards**, towards it. Over the closed surface E is therefore directed **into** the surface, opposite to the **outward** area vector, so $\\vec E\\cdot d\\vec S < 0$ everywhere. Equivalently, $\\Phi = q/\\varepsilon_0$ with $q < 0$.',
  sol: 'Inward field against outward normal.',
  scheme: [['Field points inward', 1], ['E · dS < 0, Φ = q/ε₀ < 0', 1]],
  d: 2, c: 'understanding', t: [1, 2],
}));

// ================================================================ t03 line of charge
const le = (2 * K * 2e-6) / 0.1;
add('lineE-num', num({
  stem: 'A very long straight wire carries a uniform charge of 2.0 μC per metre. Find the electric field 10 cm from it, in units of 10⁵ N C⁻¹.',
  value: Number(dec(le / 1e5, 2)), tol: 0.03, unit: '× 10⁵ N C⁻¹',
  sol: r`$E = \dfrac{\lambda}{2\pi\varepsilon_0 r} = \dfrac{2k\lambda}{r} = \dfrac{2 \times 9 \times 10^{9} \times 2.0 \times 10^{-6}}{0.10} = ${sci(le, 2)}$ N C$^{-1}$, i.e. $\dfrac{${sci(le, 2)}}{10^{5}} = ${dec(le / 1e5, 2)}$.`,
  scheme: [['E = 2kλ/r = 3.6 × 10⁵ N C⁻¹', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(le / 1e5, q.answer.value) || 'le');
const ll = { E: 9e4, r: 0.2 };
ll.lam = (ll.E * ll.r) / (2 * K);
add('linelambda-num', num({
  stem: 'The electric field 20 cm from a long, uniformly charged thread is 9.0 × 10⁴ N C⁻¹. Find the linear charge density of the thread, in μC m⁻¹.',
  value: Number(dec(ll.lam * 1e6, 2)), tol: 0.02, unit: 'μC m⁻¹',
  sol: r`$\lambda = \dfrac{Er}{2k} = \dfrac{9.0 \times 10^{4} \times 0.20}{2 \times 9 \times 10^{9}} = ${sci(ll.lam, 2)}$ C m$^{-1}$, i.e. $${sci(ll.lam, 2)} \times 10^{6} = ${dec(ll.lam * 1e6, 2)}\ \mu$C m$^{-1}$.`,
  scheme: [['λ = Er/2k', 1], ['1.0 μC m⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(ll.lam, 1e-6) && near(q.answer.value, 1) || 'll');
add('lineratio-mcq', mcq({
  stem: 'The electric field 3 cm from a long charged wire is E. At 9 cm from the wire, the field is',
  right: 'E/3',
  wrong: ['E/9', 'E/27', 'E'],
  sol: 'For a long line E ∝ 1/r: tripling r divides E by 3 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('gaussline-mcq', mcq({
  stem: 'To find the field of an infinitely long straight line of charge using Gauss’s theorem, the most suitable Gaussian surface is',
  right: 'a cylinder coaxial with the line',
  wrong: ['a sphere centred on the line', 'a cube with the line along one edge', 'a flat disc perpendicular to the line'],
  sol: 'The field is radial and the same at all points a distance r from the line, so a coaxial cylinder makes E normal and constant over its curved face — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('line-short3', short({
  marks: 3,
  stem: 'Using Gauss’s theorem, derive an expression for the electric field at a distance r from an infinitely long straight wire carrying a uniform linear charge density λ.',
  model: r`Take a closed cylinder of radius $r$ and length $l$, coaxial with the wire. By symmetry $\vec E$ is radial and has the same magnitude on the curved surface. Flux through the two flat ends is **zero** ($\vec E$ parallel to them). Flux through the curved surface $= E \times 2\pi rl$. Charge enclosed $= \lambda l$. Gauss: $E \cdot 2\pi rl = \dfrac{\lambda l}{\varepsilon_0}$, so $E = \dfrac{\lambda}{2\pi\varepsilon_0 r}$, directed radially outward for $\lambda > 0$.`,
  sol: 'Coaxial cylinder.',
  scheme: [['Cylindrical Gaussian surface; ends give no flux', 1], ['E·2πrl = λl/ε₀', 1], ['E = λ/(2πε₀r), radial', 1]],
  d: 3, c: 'understanding', t: [3], wl: null,
}));
const el = { lam: 4e-9, r: 0.02 };
el.E = (2 * K * el.lam) / el.r;
el.F = QE * el.E;
add('electronline-num', num({
  stem: 'An electron is 2.0 cm from a long straight wire carrying 4.0 nC per metre. Find the force on the electron, in units of 10⁻¹⁶ N (3 significant figures).',
  value: Number(dec(el.F / 1e-16, 3)), tol: 0.03, unit: '× 10⁻¹⁶ N',
  sol: r`$E = \dfrac{2k\lambda}{r} = \dfrac{2 \times 9 \times 10^{9} \times 4.0 \times 10^{-9}}{0.020} = ${dec(el.E, 2)}$ N C$^{-1}$; $F = eE = 1.6 \times 10^{-19} \times ${dec(el.E, 2)} = ${sci(el.F, 3)}$ N, i.e. $\dfrac{${sci(el.F, 3)}}{10^{-16}} = ${dec(el.F / 1e-16, 3)}$, towards the wire.`,
  scheme: [['E = 3600 N C⁻¹', 1], ['F ≈ 5.76 × 10⁻¹⁶ N towards the wire', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(el.F / 1e-16, q.answer.value) || 'el');
add('endfaces-short', short({
  marks: 2,
  stem: 'In finding the field of a long charged wire with a cylindrical Gaussian surface, why is no flux counted through the two flat ends of the cylinder?',
  model: 'By symmetry the field of an infinitely long line is **radial**, perpendicular to the wire. On the flat ends, the area vectors point **along** the wire, so $\\vec E$ is **perpendicular** to $d\\vec S$ (parallel to the faces) and $\\vec E\\cdot d\\vec S = 0$.',
  sol: 'E parallel to the end faces.',
  scheme: [['Field radial (perpendicular to the wire)', 1], ['E ⟂ dS on the ends: zero flux', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('linevsshell-mcq', mcq({
  stem: 'For which charge distribution does the electric field fall off as 1/r with distance r?',
  right: 'An infinitely long uniformly charged straight wire',
  wrong: ['A point charge', 'An infinite uniformly charged plane sheet', 'A point outside a uniformly charged thin spherical shell'],
  sol: 'Line: E = λ/(2πε₀r) ∝ 1/r; point and shell (outside): ∝ 1/r²; sheet: independent of r — option (@K).',
  d: 2, c: 'understanding', t: [3, 4, 5],
}));

// ================================================================ t04 plane sheet
add('sheetdist-mcq', mcq({
  stem: 'Moving from 1 cm to 10 cm away from a very large, uniformly charged flat sheet, the electric field',
  right: 'stays the same',
  wrong: ['falls to one tenth', 'falls to one hundredth', 'rises ten times'],
  sol: 'E = σ/(2ε₀) for an infinite sheet, independent of distance — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
const se = 8.85e-7 / (2 * EPS0);
add('sheetE-num', num({
  stem: 'A large plane sheet carries a uniform surface charge density of 8.85 × 10⁻⁷ C m⁻². Find its electric field, in units of 10⁴ N C⁻¹.',
  value: Number(dec(se / 1e4, 2)), tol: 0.03, unit: '× 10⁴ N C⁻¹',
  sol: r`$E = \dfrac{\sigma}{2\varepsilon_0} = \dfrac{8.85 \times 10^{-7}}{2 \times 8.85 \times 10^{-12}} = ${sci(se, 2)}$ N C$^{-1}$, i.e. $\dfrac{${sci(se, 2)}}{10^{4}} = ${dec(se / 1e4, 2)}$.`,
  scheme: [['E = σ/2ε₀ = 5.0 × 10⁴ N C⁻¹', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(se / 1e4, q.answer.value) || 'se');
const pp = 1.77e-6 / EPS0;
add('plates-num', num({
  stem: 'Two large parallel metal plates carry surface charge densities of +1.77 μC m⁻² and −1.77 μC m⁻². Find the field between them, in units of 10⁵ N C⁻¹.',
  value: Number(dec(pp / 1e5, 2)), tol: 0.03, unit: '× 10⁵ N C⁻¹',
  sol: r`Between the plates the two fields add: $E = \dfrac{\sigma}{\varepsilon_0} = \dfrac{1.77 \times 10^{-6}}{8.85 \times 10^{-12}} = ${sci(pp, 2)}$ N C$^{-1}$, i.e. $\dfrac{${sci(pp, 2)}}{10^{5}} = ${dec(pp / 1e5, 2)}$, from + to −.`,
  scheme: [['Fields add: σ/ε₀', 1], ['2.0 × 10⁵ N C⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(pp / 1e5, q.answer.value) || 'pp');
add('samesign-mcq', mcq({
  stem: 'Two large parallel sheets both carry the same positive surface charge density σ. The field between them and the field outside them are',
  right: 'zero between, and σ/ε₀ outside',
  wrong: ['σ/ε₀ between, and zero outside', 'σ/(2ε₀) everywhere', 'σ/ε₀ everywhere'],
  sol: 'Between like sheets the two σ/2ε₀ fields point in opposite directions and cancel; outside they point the same way and add — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
add('sheet-short3', short({
  marks: 3,
  stem: 'Using Gauss’s theorem, derive the electric field due to an infinite plane sheet carrying a uniform surface charge density σ. Show that it is independent of the distance from the sheet.',
  model: r`Take a cylinder (pillbox) of cross-section $A$ passing through the sheet, its ends parallel to the sheet and equidistant from it. By symmetry $\vec E$ is perpendicular to the sheet, pointing away on both sides. The curved surface gives **no flux** ($\vec E$ parallel to it); each end gives $EA$. Charge enclosed $= \sigma A$. Gauss: $2EA = \dfrac{\sigma A}{\varepsilon_0}$, so $E = \dfrac{\sigma}{2\varepsilon_0}$. The distance of the ends from the sheet does not appear, so E is **independent of distance**.`,
  sol: 'Pillbox through the sheet.',
  scheme: [['Pillbox; curved surface no flux', 1], ['2EA = σA/ε₀', 1], ['E = σ/2ε₀, independent of distance', 1]],
  d: 3, c: 'understanding', t: [4], wl: null,
}));
const ba = { m: 1e-3, g: 9.8, q: 1e-6 };
ba.E = (ba.m * ba.g) / ba.q;
ba.sig = 2 * EPS0 * ba.E;
add('ball-num', num({
  stem: 'A small ball of mass 1.0 g carrying +1.0 μC hangs from a silk thread near a large vertical sheet of positive charge. The thread settles at 45° to the vertical. Find the surface charge density of the sheet, in units of 10⁻⁷ C m⁻² (3 significant figures). (g = 9.8 m s⁻².)',
  value: Number(dec(ba.sig / 1e-7, 3)), tol: 0.02, unit: '× 10⁻⁷ C m⁻²',
  sol: r`At 45°, the electric force equals the weight: $qE = mg$, so $E = \dfrac{1.0 \times 10^{-3} \times 9.8}{1.0 \times 10^{-6}} = ${dec(ba.E, 2)}$ N C$^{-1}$. $\sigma = 2\varepsilon_0E = 2 \times 8.85 \times 10^{-12} \times ${dec(ba.E, 2)} \approx ${sci(ba.sig, 3)}$ C m$^{-2}$, i.e. $\dfrac{${sci(ba.sig, 3)}}{10^{-7}} = ${dec(ba.sig / 1e-7, 3)}$.`,
  scheme: [['tan 45° = qE/mg ⇒ E = 9.8 × 10³ N C⁻¹', 1], ['σ = 2ε₀E ≈ 1.73 × 10⁻⁷ C m⁻²', 1]],
  marks: 2, d: 4, c: 'analysis', t: [4],
}), (q) => near(ba.sig / 1e-7, q.answer.value) || 'ba');
add('pillbox-short', short({
  marks: 2,
  stem: 'In deriving the field of an infinite charged sheet with a pillbox, why are BOTH flat ends counted, and why is the curved surface ignored?',
  model: 'The field points **away from the sheet on both sides**, perpendicular to it, so it passes **out through each flat end** (flux $EA$ each, $2EA$ in all). On the curved surface the field is **parallel** to the surface, so $\\vec E\\cdot d\\vec S = 0$ there.',
  sol: 'Field out of both ends; parallel to the side.',
  scheme: [['Field leaves through both ends: 2EA', 1], ['Curved surface parallel to E: zero flux', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('capfield-ar', ar({
  a: 'The electric field between two large, oppositely charged parallel plates is uniform away from their edges.',
  r: 'The field of an infinite charged sheet does not depend on the distance from the sheet.',
  key: 'a',
  sol: 'Both true, and R explains A: each plate gives a distance-independent field σ/2ε₀, and between the plates these add to a constant σ/ε₀ — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
const pf = { sig: 1.77e-6 };
pf.E = pf.sig / EPS0;
pf.F = QE * pf.E;
pf.a = pf.F / ME;
add('platesforce-short3', short({
  marks: 3,
  stem: 'Two large parallel plates carry ±1.77 μC m⁻². An electron is released from rest between them. Find (a) the field between the plates, (b) the force on the electron, (c) its acceleration and direction of motion. (mₑ = 9.1 × 10⁻³¹ kg.)',
  model: r`(a) $E = \dfrac{\sigma}{\varepsilon_0} = \dfrac{1.77 \times 10^{-6}}{8.85 \times 10^{-12}} = ${sci(pf.E, 2)}$ N C$^{-1}$, from the + plate to the − plate.
(b) $F = eE = 1.6 \times 10^{-19} \times ${sci(pf.E, 2)} = ${sci(pf.F, 2)}$ N.
(c) $a = \dfrac{F}{m} = \dfrac{${sci(pf.F, 2)}}{9.1 \times 10^{-31}} \approx ${sci(pf.a, 3)}$ m s$^{-2}$, towards the **positive** plate (opposite to E).`,
  sol: 'σ/ε₀; eE; F/m.',
  scheme: [['E = 2.0 × 10⁵ N C⁻¹', 1], ['F = 3.2 × 10⁻¹⁴ N', 1], ['a ≈ 3.52 × 10¹⁶ m s⁻² towards + plate', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(pf.a, 3.516e16) || 'pf');

// ================================================================ t05 spherical shell
add('inside-tf', tf({
  stem: 'The electric field at every point inside a uniformly charged thin spherical shell is zero.',
  key: 't',
  sol: 'True. A concentric Gaussian sphere inside the shell encloses no charge, so by symmetry E = 0 there.',
  d: 1, c: 'understanding', t: [5],
}));
const so = (K * 4e-9) / 0.5 ** 2;
add('shellout-num', num({
  stem: 'A thin spherical shell of radius 20 cm carries a charge of 4.0 nC. Find the field 50 cm from its centre, in N C⁻¹.',
  value: Number(dec(so, 3)), tol: 1, unit: 'N C⁻¹',
  sol: r`Outside, the shell acts like a point charge at its centre: $E = \dfrac{kq}{r^2} = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-9}}{(0.50)^2} = ${dec(so, 3)}$ N C$^{-1}$.`,
  scheme: [['E = kq/r² = 144 N C⁻¹', 1]],
  d: 1, c: 'understanding', t: [5],
}), (q) => near(so, 144) || 'so');
const ss = { sig: 2e-6, R: 0.1, r: 0.2 };
ss.Es = ss.sig / EPS0;
ss.E = (ss.Es * ss.R ** 2) / ss.r ** 2;
add('shellsig-num', num({
  stem: 'A thin spherical shell of radius 10 cm has a uniform surface charge density of 2.0 μC m⁻². Find the field 20 cm from its centre, in units of 10⁴ N C⁻¹ (3 significant figures).',
  value: Number(dec(ss.E / 1e4, 3)), tol: 0.05, unit: '× 10⁴ N C⁻¹',
  sol: r`At the surface $E_R = \dfrac{\sigma}{\varepsilon_0} = \dfrac{2.0 \times 10^{-6}}{8.85 \times 10^{-12}} \approx ${sci(ss.Es, 3)}$ N C$^{-1}$; outside $E \propto 1/r^2$, so at 20 cm $E = E_R\left(\dfrac{0.10}{0.20}\right)^2 \approx ${sci(ss.E, 3)}$ N C$^{-1}$, i.e. $\dfrac{${sci(ss.E, 3)}}{10^{4}} = ${dec(ss.E / 1e4, 3)}$.`,
  scheme: [['Surface field σ/ε₀ ≈ 2.26 × 10⁵ N C⁻¹', 1], ['× (R/r)² ≈ 5.65 × 10⁴ N C⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(ss.E / 1e4, q.answer.value) || 'ss');
add('shellgraph-mcq', mcq({
  stem: 'Which description fits the graph of electric field E against distance r from the centre of a charged thin spherical shell of radius R?',
  right: 'E = 0 for r < R, a maximum at r = R, then falling as 1/r²',
  wrong: ['E rising linearly from the centre to R, then falling as 1/r²', 'E constant inside and falling as 1/r outside', 'E falling as 1/r² everywhere from the centre outwards'],
  sol: 'Inside: no enclosed charge, E = 0. Outside: kq/r², largest just outside the surface — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('shield-mcq', mcq({
  stem: 'A sensitive electronic instrument is kept inside a closed metal box to protect it from external electric fields. This works because',
  right: 'the field inside a closed charged conducting shell is zero',
  wrong: ['metals absorb electric fields like sponges', 'the box is earthed and so has infinite capacitance', 'the field inside the box is doubled and cancels itself'],
  sol: 'Charges on a closed conductor arrange themselves so that the field inside is zero (electrostatic shielding) — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('shell-short3', short({
  marks: 3,
  stem: 'Using Gauss’s theorem, find the electric field due to a uniformly charged thin spherical shell of radius R and charge q at a point (a) outside, (b) inside the shell.',
  model: r`(a) For $r > R$, take a concentric sphere of radius $r$. By symmetry $\vec E$ is radial and constant on it: $E \times 4\pi r^2 = \dfrac{q}{\varepsilon_0}$, so $E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2}$: as if all the charge were at the centre. (b) For $r < R$, a concentric sphere of radius $r$ encloses **no charge**: $E \times 4\pi r^2 = 0$, so $E = 0$.`,
  sol: 'Concentric spheres outside and inside.',
  scheme: [['Concentric Gaussian sphere; E radial, constant', 1], ['Outside E = q/(4πε₀r²)', 1], ['Inside q_enc = 0 ⇒ E = 0', 1]],
  d: 3, c: 'understanding', t: [5], wl: null,
}));
const qf = { E: 9e3, r: 0.3 };
qf.q = (qf.E * qf.r ** 2) / K;
add('shellq-num', num({
  stem: 'The electric field 30 cm from the centre of a charged thin spherical shell of radius 10 cm is 9.0 × 10³ N C⁻¹, directed outward. Find the charge on the shell, in nC.',
  value: Number(dec(qf.q * 1e9, 2)), tol: 0.5, unit: 'nC',
  sol: r`$E = \dfrac{kq}{r^2} \Rightarrow q = \dfrac{Er^2}{k} = \dfrac{9.0 \times 10^{3} \times (0.30)^2}{9 \times 10^{9}} = ${sci(qf.q, 2)}$ C, i.e. $${sci(qf.q, 2)} \times 10^{9} = ${dec(qf.q * 1e9, 2)}$ nC (positive).`,
  scheme: [['Shell acts as a point charge: q = Er²/k', 1], ['q = 90 nC', 1]],
  marks: 2, d: 3, c: 'application', t: [5],
}), (q) => near(qf.q, 9e-8) && near(q.answer.value, 90) || 'qf');
const cs = { q1: 4e-9, R1: 0.1, q2: -2e-9, R2: 0.2 };
cs.E15 = (K * cs.q1) / 0.15 ** 2;
cs.E25 = (K * Math.abs(cs.q1 + cs.q2)) / 0.25 ** 2;
add('concentric-short3', short({
  marks: 3,
  stem: 'Two concentric thin spherical shells have radii 10 cm and 20 cm and carry +4.0 nC and −2.0 nC respectively. Find the electric field at distances of 5 cm, 15 cm and 25 cm from the common centre.',
  model: r`At 5 cm: no charge enclosed, $E = 0$. At 15 cm: only the inner shell is enclosed, $E = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-9}}{(0.15)^2} = ${dec(cs.E15, 3)}$ N C$^{-1}$, outward. At 25 cm: enclosed charge $= 4.0 - 2.0 = 2.0$ nC, $E = \dfrac{9 \times 10^{9} \times 2.0 \times 10^{-9}}{(0.25)^2} = ${dec(cs.E25, 3)}$ N C$^{-1}$, outward.`,
  sol: 'Gaussian spheres; count enclosed charge.',
  scheme: [['5 cm: E = 0', 1], ['15 cm: 1600 N C⁻¹', 1], ['25 cm: 288 N C⁻¹', 1]],
  d: 4, c: 'application', t: [5], wl: null,
}), () => near(cs.E15, 1600) && near(cs.E25, 288) || 'cs');
add('car-short', short({
  marks: 2,
  stem: 'Why is a person sitting inside a closed car with a metal body relatively safe during a lightning storm?',
  model: 'The metal body acts as a closed **conducting shell**. Charge from a strike stays on its **outer surface** and flows to the ground; by Gauss’s theorem the **field inside** a closed charged conducting shell is **zero**, so the occupants are shielded (electrostatic shielding).',
  sol: 'Electrostatic shielding.',
  scheme: [['Car body acts as a closed conducting shell; charge stays outside', 1], ['Field inside zero: shielding', 1]],
  d: 2, c: 'application', t: [5],
}));
add('pointshell-ar', ar({
  a: 'At points outside a uniformly charged thin spherical shell, the field is the same as that of a point charge placed at its centre.',
  r: 'All the charge of a uniformly charged thin shell is located at its centre.',
  key: 'c',
  sol: 'A is true (Gauss’s theorem with a concentric sphere). R is false: the charge is spread over the surface; it only behaves, for outside points, as if it were at the centre — option (c).',
  d: 2, c: 'understanding', t: [5],
}));

// ================================================================ 5-mark questions (in parts)
const lf = { a: 0.1, E: 3e3, q: 8.85e-9 };
lf.f = lf.E * lf.a ** 2 * Math.cos(deg(60));
lf.face = lf.q / (6 * EPS0);
add('flux-long', long({
  stem: '(a) Define electric flux and state its SI unit. [1] (b) A square of side 10 cm is in a uniform field of 3.0 × 10³ N C⁻¹ whose direction makes 60° with the normal to the square. Find the flux through it. [1] (c) State Gauss’s theorem. [1] (d) A charge of 8.85 nC is at the centre of a cube. Find the flux through the whole cube and through one face. [2]',
  model: r`(a) Electric flux through a surface is $\Phi = \int \vec E\cdot d\vec S$ (for a plane area in a uniform field, $EA\cos\theta$); unit N m² C$^{-1}$.

(b) $\Phi = EA\cos 60° = 3.0 \times 10^{3} \times 0.010 \times 0.5 = ${dec(lf.f, 2)}$ N m² C$^{-1}$.

(c) The total flux through a closed surface equals $1/\varepsilon_0$ times the net charge enclosed: $\oint \vec E\cdot d\vec S = q/\varepsilon_0$.

(d) $\Phi = \dfrac{q}{\varepsilon_0} = \dfrac{8.85 \times 10^{-9}}{8.85 \times 10^{-12}} = 1.0 \times 10^{3}$ N m² C$^{-1}$; one face: $\dfrac{1.0 \times 10^{3}}{6} \approx ${dec(lf.face, 3)}$ N m² C$^{-1}$.`,
  sol: 'Definition; EA cos θ; Gauss; symmetry.',
  scheme: [['Definition and unit', 1], ['Φ = 15 N m² C⁻¹', 1], ['Statement of Gauss’s theorem', 1], ['Whole cube 1.0 × 10³', 1], ['One face ≈ 167 N m² C⁻¹', 1]],
  d: 3, c: 'application', t: [1, 2], wl: null,
}), () => near(lf.f, 15) && near(lf.face, 166.7) || 'lf');
const lw = { lam: 5e-6, r1: 0.1, r2: 0.25 };
lw.E1 = (2 * K * lw.lam) / lw.r1;
lw.E2 = (2 * K * lw.lam) / lw.r2;
add('line-long', long({
  stem: '(a) Derive, using Gauss’s theorem, the field of an infinitely long straight line of charge of linear density λ at a distance r. [3] (b) A long wire carries 5.0 μC m⁻¹. Find the field at 10 cm and at 25 cm from it, and state how the result differs from the field of a point charge. [2]',
  model: r`(a) Coaxial cylindrical Gaussian surface of radius $r$, length $l$: the field is radial and uniform over the curved surface; the flat ends give no flux. $E \cdot 2\pi rl = \lambda l/\varepsilon_0$, so $E = \dfrac{\lambda}{2\pi\varepsilon_0 r}$, radially outward.

(b) At 10 cm: $E = \dfrac{2 \times 9 \times 10^{9} \times 5.0 \times 10^{-6}}{0.10} = ${sci(lw.E1, 2)}$ N C$^{-1}$. At 25 cm: $${sci(lw.E2, 2)}$ N C$^{-1}$. The field falls as $1/r$ (here by 2.5 times), more slowly than the $1/r^2$ of a point charge (which would fall 6.25 times).`,
  sol: 'Cylinder; 2kλ/r.',
  scheme: [['Gaussian cylinder and zero flux through ends', 1], ['Flux = E·2πrl, charge λl', 1], ['E = λ/(2πε₀r)', 1], ['9.0 × 10⁵ and 3.6 × 10⁵ N C⁻¹', 1], ['1/r versus 1/r²', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(lw.E1, 9e5) && near(lw.E2, 3.6e5) || 'lw');
const sl = { sig: 4.425e-6 };
sl.one = sl.sig / (2 * EPS0);
sl.two = sl.sig / EPS0;
add('sheet-long', long({
  stem: '(a) Derive, using Gauss’s theorem, the electric field due to an infinite plane sheet of charge of surface density σ. [2] (b) Two large parallel plates carry +4.425 μC m⁻² and −4.425 μC m⁻². Find the field (i) between the plates, (ii) outside them, and (iii) due to either plate alone. [3]',
  model: r`(a) Pillbox of cross-section $A$ through the sheet; E perpendicular to the sheet on both sides; no flux through the curved surface. $2EA = \sigma A/\varepsilon_0$, so $E = \dfrac{\sigma}{2\varepsilon_0}$, independent of distance.

(b)(iii) Each plate alone: $E = \dfrac{\sigma}{2\varepsilon_0} = \dfrac{4.425 \times 10^{-6}}{2 \times 8.85 \times 10^{-12}} = ${sci(sl.one, 2)}$ N C$^{-1}$. (i) Between, the fields add: $\dfrac{\sigma}{\varepsilon_0} = ${sci(sl.two, 2)}$ N C$^{-1}$, from + to −. (ii) Outside, the two fields are opposite and cancel: $E = 0$.`,
  sol: 'Pillbox; superposition of two sheets.',
  scheme: [['Pillbox and 2EA = σA/ε₀', 1], ['E = σ/2ε₀', 1], ['Single plate 2.5 × 10⁵ N C⁻¹', 1], ['Between 5.0 × 10⁵ N C⁻¹', 1], ['Outside zero', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(sl.one, 2.5e5) && near(sl.two, 5e5) || 'sl');
const sh = { q: 1.0e-8, R: 0.15 };
sh.Es = (K * sh.q) / sh.R ** 2;
sh.E30 = (K * sh.q) / 0.3 ** 2;
add('shell-long', long({
  stem: '(a) Using Gauss’s theorem, derive the field of a uniformly charged thin spherical shell (i) outside it, (ii) inside it. [2] (b) Draw (describe) the graph of E against r. [1] (c) A shell of radius 15 cm carries 10 nC. Find the field at 10 cm, at 15 cm and at 30 cm from its centre. [2]',
  model: r`(a)(i) Concentric Gaussian sphere of radius $r > R$: $E \cdot 4\pi r^2 = q/\varepsilon_0$, $E = \dfrac{q}{4\pi\varepsilon_0 r^2}$. (ii) For $r < R$ the sphere encloses no charge, so $E = 0$.

(b) E = 0 from the centre up to R; at R it jumps to its maximum $q/(4\pi\varepsilon_0R^2)$; beyond R it falls as $1/r^2$.

(c) At 10 cm (inside): 0. At 15 cm: $E = \dfrac{9 \times 10^{9} \times 1.0 \times 10^{-8}}{(0.15)^2} = ${dec(sh.Es, 2)}$ N C$^{-1}$. At 30 cm: $${dec(sh.E30, 2)}$ N C$^{-1}$ (a quarter).`,
  sol: 'Concentric spheres; graph; numbers.',
  scheme: [['Outside field derived', 1], ['Inside E = 0', 1], ['Graph described', 1], ['0 and 4000 N C⁻¹', 1], ['1000 N C⁻¹ at 30 cm', 1]],
  d: 3, c: 'understanding', t: [5], wl: null,
}), () => near(sh.Es, 4000) && near(sh.E30, 1000) || 'sh');
const cb = { lam: 6e-9, sig: 1e-8 };
cb.x = cb.lam / (Math.PI * cb.sig);
cb.Esheet = cb.sig / (2 * EPS0);
add('combo-long', long({
  stem: 'A very long straight wire carrying +6.0 nC m⁻¹ runs parallel to a very large plane sheet carrying +10 nC m⁻², 50 cm from it. (a) Find the field of the sheet alone at any point between them. [1] (b) Show that, between the wire and the sheet, the two fields point in opposite directions. [1] (c) Find the distance from the wire, on the perpendicular towards the sheet, at which the resultant field is zero. [2] (d) Is there such a point on the far side of the wire? Explain. [1]',
  model: r`(a) $E_s = \dfrac{\sigma}{2\varepsilon_0} = \dfrac{1.0 \times 10^{-8}}{2 \times 8.85 \times 10^{-12}} \approx ${dec(cb.Esheet, 3)}$ N C$^{-1}$, pointing away from the sheet (towards the wire).

(b) Between them, the positive wire’s field points away from the wire (towards the sheet) and the positive sheet’s field points away from the sheet (towards the wire): opposite directions.

(c) $\dfrac{\lambda}{2\pi\varepsilon_0 x} = \dfrac{\sigma}{2\varepsilon_0} \Rightarrow x = \dfrac{\lambda}{\pi\sigma} = \dfrac{6.0 \times 10^{-9}}{\pi \times 1.0 \times 10^{-8}} \approx ${dec(cb.x, 3)}$ m from the wire (less than 0.50 m, so between them).

(d) No: beyond the wire both fields point away from the sheet, in the same direction, so they add.`,
  sol: 'σ/2ε₀; directions; equate.',
  scheme: [['E_s ≈ 565 N C⁻¹', 1], ['Opposite directions between', 1], ['Equation λ/(2πε₀x) = σ/(2ε₀)', 1], ['x ≈ 0.191 m', 1], ['No null point beyond the wire', 1]],
  d: 4, c: 'analysis', t: [3, 4], wl: null,
}), () => near(cb.x, 0.191) && near(cb.Esheet, 565) || `cb ${cb.x}`);

// ================================================================ further application items (bank size)
const tw = { lam: 2e-6, r1: 0.1, r2: 0.3 };
tw.E = 2 * K * tw.lam * (1 / tw.r1 + 1 / tw.r2);
add('twowires-num', num({
  stem: 'Two long parallel wires 20 cm apart each carry +2.0 μC m⁻¹. Find the electric field at a point in their plane that is 10 cm from one wire and 30 cm from the other (outside the pair), in units of 10⁵ N C⁻¹.',
  value: Number(dec(tw.E / 1e5, 2)), tol: 0.03, unit: '× 10⁵ N C⁻¹',
  sol: r`Outside the pair both fields point the same way (away from the wires): $E = 2k\lambda\left(\dfrac{1}{0.10} + \dfrac{1}{0.30}\right) = 3.6 \times 10^{4} \times 13.33 \approx ${sci(tw.E, 2)}$ N C$^{-1}$, i.e. $\dfrac{${sci(tw.E, 2)}}{10^{5}} = ${dec(tw.E / 1e5, 2)}$.`,
  scheme: [['Fields in the same direction outside the pair', 1], ['E ≈ 4.8 × 10⁵ N C⁻¹', 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near(tw.E, 4.8e5) && near(q.answer.value, 4.8) || 'tw');
const sq = { E: 3.6e4, R: 0.05 };
sq.q = (sq.E * sq.R ** 2) / K;
add('surfq-num', num({
  stem: 'The electric field just outside a charged thin spherical shell of radius 5.0 cm is 3.6 × 10⁴ N C⁻¹. Find the charge on the shell, in nC.',
  value: Number(dec(sq.q * 1e9, 2)), tol: 0.1, unit: 'nC',
  sol: r`$E = \dfrac{kq}{R^2} \Rightarrow q = \dfrac{ER^2}{k} = \dfrac{3.6 \times 10^{4} \times (0.050)^2}{9 \times 10^{9}} = ${sci(sq.q, 2)}$ C, i.e. $${sci(sq.q, 2)} \times 10^{9} = ${dec(sq.q * 1e9, 2)}$ nC.`,
  scheme: [['q = ER²/k', 1], ['10 nC', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near(sq.q, 1e-8) && near(q.answer.value, 10) || 'sq');
const fc = { lam: 8.85e-9, l: 0.5 };
fc.phi = (fc.lam * fc.l) / EPS0;
add('cylflux-num', num({
  stem: 'A long wire carries 8.85 nC per metre. Find the total electric flux through a closed cylindrical surface 50 cm long, coaxial with the wire, in N m² C⁻¹.',
  value: Number(dec(fc.phi, 3)), tol: 2, unit: 'N m² C⁻¹',
  sol: r`$q_\text{enc} = \lambda l = 8.85 \times 10^{-9} \times 0.50 = 4.425 \times 10^{-9}$ C; $\Phi = \dfrac{q_\text{enc}}{\varepsilon_0} = \dfrac{4.425 \times 10^{-9}}{8.85 \times 10^{-12}} = ${dec(fc.phi, 3)}$ N m² C$^{-1}$ (independent of the cylinder’s radius).`,
  scheme: [['q_enc = λl', 1], ['Φ = 500 N m² C⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [2, 3],
}), (q) => near(fc.phi, 500) && near(q.answer.value, 500) || 'fc');
