// ISC 12 Physics ch05 Electric Current, Ohm's Law and Resistivity — question bank (ISC style). Numbers computed and re-checked.
import { mk, add, r, sci, dec, near, QE, ME } from '../../isc-12-physics-ch01/src/lib.mjs';

const { mcq, ar, tf, fill, num, short, long } = mk;

// ================================================================ t01 drift, mobility, I = neAvd
add('halfarea-mcq', mcq({
  stem: 'The same current flows through a thick part and a thin part of a copper conductor; the thin part has half the cross-sectional area. In the thin part the drift velocity of the electrons is',
  right: 'twice as large',
  wrong: ['half as large', 'the same', 'four times as large'],
  sol: 'I = neAv_d with I and n the same: v_d ∝ 1/A, so halving A doubles v_d — option (@K).',
  d: 2, c: 'application', t: [1],
}));
const vd = { I: 2.0, A: 2.5e-6, n: 8.0e28 };
vd.v = vd.I / (vd.n * QE * vd.A);
add('vd-num', num({
  stem: 'The battery lead of a scooter has a metal core 2.5 mm² in cross-section and carries 2.0 A. The metal has 8.0 × 10²⁸ conduction electrons in every cubic metre. What is their drift speed? Answer in units of 10⁻⁵ m s⁻¹ (3 significant figures).',
  value: Number(dec(vd.v / 1e-5, 3)), tol: 0.03, unit: '× 10⁻⁵ m s⁻¹',
  sol: r`$v_d = \dfrac{I}{n e A} = \dfrac{2.0}{8.0 \times 10^{28} \times 1.6 \times 10^{-19} \times 2.5 \times 10^{-6}} = ${sci(vd.v, 3)}$ m s$^{-1}$, i.e. $\dfrac{${sci(vd.v, 3)}}{10^{-5}} = ${dec(vd.v / 1e-5, 3)}$.`,
  scheme: [['v_d = I/(neA) with A in m²', 1], ['6.25 × 10⁻⁵ m s⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(vd.v, 6.25e-5) || 'vd');
add('conv-mcq', mcq({
  stem: 'In a metal wire carrying a current from end A to end B (conventional current), the free electrons move',
  right: 'from B towards A',
  wrong: ['from A towards B', 'randomly with no net motion', 'from A to B at the speed of light'],
  sol: 'Conventional current is the direction of positive-charge flow; electrons drift the opposite way — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
const ch = { I: 3.0, t: 120 };
ch.Q = ch.I * ch.t;
ch.n = ch.Q / QE;
add('electrons-num', num({
  stem: 'A steady current of 3.0 A flows for 2.0 minutes. How many electrons pass a cross-section of the wire? Give the answer in units of 10²¹.',
  value: Number(dec(ch.n / 1e21, 3)), tol: 0.02, unit: '× 10²¹',
  sol: r`$Q = It = 3.0 \times 120 = 360$ C; $n = \dfrac{Q}{e} = \dfrac{360}{1.6 \times 10^{-19}} = ${sci(ch.n, 3)}$, i.e. $\dfrac{${sci(ch.n, 3)}}{10^{21}} = ${dec(ch.n / 1e21, 3)}$.`,
  scheme: [['Q = It = 360 C', 1], ['n = 2.25 × 10²¹', 1]],
  marks: 2, d: 1, c: 'understanding', t: [1],
}), (q) => near(ch.n, 2.25e21) || 'ch');
const de = { E: 0.5, tau: 2.5e-14 };
de.v = (QE * de.E * de.tau) / ME;
add('driftE-num', num({
  stem: 'In a metal the relaxation time of the free electrons is 2.5 × 10⁻¹⁴ s. Find their drift velocity in a field of 0.50 V m⁻¹, in mm s⁻¹ (3 significant figures).',
  value: Number(dec(de.v * 1e3, 3)), tol: 0.03, unit: 'mm s⁻¹',
  sol: r`$v_d = \dfrac{eE\tau}{m} = \dfrac{1.6 \times 10^{-19} \times 0.50 \times 2.5 \times 10^{-14}}{9.1 \times 10^{-31}} \approx ${sci(de.v, 3)}$ m s$^{-1}$, i.e. $${sci(de.v, 3)} \times 10^{3} = ${dec(de.v * 1e3, 3)}$ mm s$^{-1}$.`,
  scheme: [['v_d = eEτ/m', 1], ['≈ 2.20 mm s⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(de.v * 1e3, q.answer.value) || 'de');
const mb = { vd: 4e-4, E: 0.1 };
mb.mu = mb.vd / mb.E;
add('mobility-num', num({
  stem: 'Electrons in a wire drift at 4.0 × 10⁻⁴ m s⁻¹ when the field in the wire is 0.10 V m⁻¹. Find their mobility, in units of 10⁻³ m² V⁻¹ s⁻¹.',
  value: Number(dec(mb.mu / 1e-3, 2)), tol: 0.02, unit: '× 10⁻³ m² V⁻¹ s⁻¹',
  sol: r`$\mu = \dfrac{v_d}{E} = \dfrac{4.0 \times 10^{-4}}{0.10} = ${sci(mb.mu, 2)}$ m² V$^{-1}$ s$^{-1}$, i.e. $\dfrac{${sci(mb.mu, 2)}}{10^{-3}} = ${dec(mb.mu / 1e-3, 2)}$.`,
  scheme: [['μ = v_d/E = 4.0 × 10⁻³ m² V⁻¹ s⁻¹', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(mb.mu, 4e-3) || 'mb');
add('instant-short', short({
  marks: 2,
  stem: 'A ceiling fan starts turning the moment its wall switch is pressed, although 4 m of cable separate the two and the conduction electrons in the cable drift at roughly 0.1 mm s⁻¹. How is this possible?',
  model: 'The cable and motor winding are **already full of free electrons**. Closing the switch sets up an **electric field** throughout the circuit almost instantly (it spreads at close to the **speed of light**). Electrons **everywhere**, including those in the winding, start drifting **at once**; none has to travel the 4 m.',
  sol: 'The field spreads almost instantly; the electrons already present in the winding start drifting together.',
  scheme: [['Field established along the circuit at nearly c', 1], ['All electrons start drifting together', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('IneA-short3', short({
  marks: 3,
  stem: 'A conductor of uniform cross-section A holds n free electrons per unit volume, each drifting with speed $v_d$. By counting the electrons that cross one section in a time Δt, show that the current is $I = n e A v_d$.',
  model: r`Consider a conductor of cross-section $A$ with $n$ free electrons per unit volume drifting with speed $v_d$. In time $\Delta t$ each electron moves $v_d\Delta t$, so all electrons within a length $v_d\Delta t$ of a cross-section pass through it. Their number is $n \times A v_d\Delta t$, carrying charge $\Delta q = n e A v_d\Delta t$. Hence $I = \dfrac{\Delta q}{\Delta t} = n e A v_d$.`,
  sol: 'Count electrons in a slice v_dΔt long.',
  scheme: [['Electrons within v_dΔt cross in Δt', 1], ['Number nAv_dΔt, charge neAv_dΔt', 1], ['I = neAv_d', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}));
add('speeds-mcq', mcq({
  stem: 'Compared with the average random (thermal) speed of free electrons in a copper wire carrying a current, their drift speed is',
  right: 'smaller by a factor of about 10⁹',
  wrong: ['about the same', 'larger by a factor of about 10⁹', 'smaller by a factor of about 10'],
  sol: 'Random speeds are about 10⁵ m s⁻¹; drift speeds about 10⁻⁴ m s⁻¹ — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('tau-fill', fill({
  stem: 'The average time between two successive collisions of a free electron with the ions of a metal is called the ___ time.',
  acc: [['relaxation']],
  sol: 'The **relaxation** time τ.',
  d: 1, c: 'recall', t: [1],
}));
add('radius-mcq', mcq({
  stem: 'A copper wire is replaced by one of the same material with twice the radius, and the current is kept the same. The drift velocity becomes',
  right: 'one quarter of its earlier value',
  wrong: ['one half of its earlier value', 'twice its earlier value', 'unchanged'],
  sol: 'A ∝ r², so doubling r makes A four times larger; v_d = I/(neA) falls to ¼ — option (@K).',
  d: 3, c: 'application', t: [1],
}));
const sw = { d1: 1e-3, d2: 2e-3 };
sw.ratio = (sw.d2 / sw.d1) ** 2;
add('serieswires-num', num({
  stem: 'Two copper wires of diameters 1.0 mm and 2.0 mm are joined end to end and carry a current. Find the ratio of the drift velocity in the thinner wire to that in the thicker wire.',
  value: sw.ratio, tol: 0.02, unit: '',
  sol: r`Same current and the same n: $v_d \propto \dfrac{1}{A} \propto \dfrac{1}{d^2}$, so $\dfrac{v_1}{v_2} = \left(\dfrac{2.0}{1.0}\right)^2 = ${dec(sw.ratio, 2)}$.`,
  scheme: [['v_d ∝ 1/d² for the same I', 1], ['Ratio 4', 1]],
  marks: 2, d: 4, c: 'analysis', t: [1],
}), (q) => near(sw.ratio, 4) || 'sw');
add('length-tf', tf({
  stem: 'Keeping the same 6 V battery, a student swaps a 1 m nichrome wire for a 2 m nichrome wire of equal thickness. The electrons in the longer wire drift twice as fast.',
  key: 'f',
  sol: 'False. The field in the wire is E = V/l, which halves when l doubles, so v_d = eEτ/m halves: the electrons drift half as fast.',
  d: 3, c: 'understanding', t: [1],
}));
add('mobunit-mcq', mcq({
  stem: 'A data sheet lists the electron mobility in a sample of germanium. Mobility being drift speed per unit field strength, the sheet must quote it in',
  right: 'm² V⁻¹ s⁻¹',
  wrong: ['m s⁻¹', 'V m⁻¹ s⁻¹', 'm V s⁻¹'],
  sol: 'μ = v_d/E: (m s⁻¹)/(V m⁻¹) = m² V⁻¹ s⁻¹ — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('drift-ar', ar({
  a: 'In a wire carrying a few amperes, a free electron takes hours to drift one metre along the wire.',
  r: 'Between collisions, the free electrons of a metal move at speeds well below 1 m s⁻¹.',
  key: 'c',
  sol: 'A is true: drift speeds are of order 10⁻⁴ m s⁻¹, so 1 m takes about 10⁴ s. R is false: between collisions the electrons move very fast (about 10⁵ m s⁻¹) but in random directions; only the small extra drift is directed — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
const dc = { I: 5.0, A: 4e-6, n: 8.5e28 };
dc.v = dc.I / (dc.n * QE * dc.A);
dc.t = 1 / dc.v;
add('driftcalc-short3', short({
  marks: 3,
  stem: 'A copper cable of cross-section 4.0 mm² carries 5.0 A; copper has 8.5 × 10²⁸ free electrons per m³. Find (a) the current density, (b) the drift velocity, (c) the time an electron takes to drift 1.0 m.',
  model: r`(a) $J = \dfrac{I}{A} = \dfrac{5.0}{4.0 \times 10^{-6}} = 1.25 \times 10^{6}$ A m$^{-2}$.
(b) $v_d = \dfrac{J}{n e} = \dfrac{1.25 \times 10^{6}}{8.5 \times 10^{28} \times 1.6 \times 10^{-19}} \approx ${sci(dc.v, 3)}$ m s$^{-1}$.
(c) $t = \dfrac{1.0}{${sci(dc.v, 3)}} \approx ${sci(dc.t, 3)}$ s (about 3 hours).`,
  sol: 'J = I/A; v_d = J/ne; t = l/v_d.',
  scheme: [['J = 1.25 × 10⁶ A m⁻²', 1], ['v_d ≈ 9.19 × 10⁻⁵ m s⁻¹', 1], ['t ≈ 1.09 × 10⁴ s', 1]],
  d: 3, c: 'application', t: [1, 2], wl: null,
}), () => near(dc.v, 9.19e-5) && near(dc.t, 1.088e4) || 'dc');

// ================================================================ t02 microscopic Ohm's law
add('tau-ar', ar({
  a: 'Of two metals with the same number density of free electrons, the one with the longer relaxation time has the lower resistivity.',
  r: 'The resistivity of a metal is ρ = m/(ne²τ).',
  key: 'a',
  sol: 'Both true, and R explains A: with n fixed, ρ ∝ 1/τ — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
const jn = 5.0 / 2e-6;
add('J-num', num({
  stem: 'A current of 5.0 A flows through a wire of cross-section 2.0 mm². Find the current density, in units of 10⁶ A m⁻².',
  value: Number(dec(jn / 1e6, 2)), tol: 0.02, unit: '× 10⁶ A m⁻²',
  sol: r`$J = \dfrac{I}{A} = \dfrac{5.0}{2.0 \times 10^{-6}} = ${sci(jn, 2)}$ A m$^{-2}$, i.e. $\dfrac{${sci(jn, 2)}}{10^{6}} = ${dec(jn / 1e6, 2)}$.`,
  scheme: [['J = I/A = 2.5 × 10⁶ A m⁻²', 1]],
  d: 1, c: 'understanding', t: [2],
}), (q) => near(jn, 2.5e6) || 'jn');
const sj = 5.8e7 * 0.02;
add('sigmaE-num', num({
  stem: 'Copper has a conductivity of 5.8 × 10⁷ S m⁻¹. Find the current density in a copper wire in which the electric field is 0.020 V m⁻¹, in units of 10⁶ A m⁻² (3 significant figures).',
  value: Number(dec(sj / 1e6, 3)), tol: 0.02, unit: '× 10⁶ A m⁻²',
  sol: r`$J = \sigma E = 5.8 \times 10^{7} \times 0.020 = ${sci(sj, 3)}$ A m$^{-2}$, i.e. $\dfrac{${sci(sj, 3)}}{10^{6}} = ${dec(sj / 1e6, 3)}$.`,
  scheme: [['J = σE', 1], ['1.16 × 10⁶ A m⁻²', 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(sj, 1.16e6) || 'sj');
add('rhoderive-short3', short({
  marks: 3,
  stem: 'Starting from the drift of free electrons, derive the expression ρ = m/(ne²τ) for the resistivity of a metal.',
  model: r`In a field E, between collisions each electron accelerates at $a = eE/m$; averaged over collisions it gains a drift velocity $v_d = \dfrac{eE\tau}{m}$. The current density is $J = n e v_d = \dfrac{n e^2\tau}{m}E$. Comparing with Ohm’s law $J = \sigma E$: $\sigma = \dfrac{n e^2\tau}{m}$, so $\rho = \dfrac{1}{\sigma} = \dfrac{m}{n e^2\tau}$.`,
  sol: 'v_d, J = nev_d, compare with J = σE.',
  scheme: [['v_d = eEτ/m', 1], ['J = (ne²τ/m)E', 1], ['ρ = m/(ne²τ)', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}));
const al = { rho: 2.8e-8, n: 1.8e29 };
al.tau = ME / (al.rho * al.n * QE ** 2);
add('taufind-num', num({
  stem: 'Aluminium has a resistivity of 2.8 × 10⁻⁸ Ω m and 1.8 × 10²⁹ free electrons per m³. Find the relaxation time of its electrons, in units of 10⁻¹⁵ s (3 significant figures).',
  value: Number(dec(al.tau / 1e-15, 3)), tol: 0.05, unit: '× 10⁻¹⁵ s',
  sol: r`$\tau = \dfrac{m}{\rho n e^2} = \dfrac{9.1 \times 10^{-31}}{2.8 \times 10^{-8} \times 1.8 \times 10^{29} \times (1.6 \times 10^{-19})^2} \approx ${sci(al.tau, 3)}$ s, i.e. $\dfrac{${sci(al.tau, 3)}}{10^{-15}} = ${dec(al.tau / 1e-15, 3)}$.`,
  scheme: [['τ = m/(ρne²)', 1], ['≈ 7.05 × 10⁻¹⁵ s', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(al.tau / 1e-15, q.answer.value) || 'al');
add('Jdir-mcq', mcq({
  stem: 'In a metallic conductor obeying Ohm’s law, the current density vector J is',
  right: 'in the same direction as the electric field E',
  wrong: ['opposite to the electric field E', 'perpendicular to the electric field E', 'in the direction of the electrons’ drift'],
  sol: 'J = σE with σ > 0: J is along E, opposite to the electron drift — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('ohmlaw-short', short({
  marks: 2,
  stem: 'State Ohm’s law and the condition under which it holds. Write it in terms of current density.',
  model: 'The current through a conductor is **directly proportional** to the potential difference across it, **provided its temperature and other physical conditions remain constant**: $V = IR$. In microscopic form, $\\vec J = \\sigma\\vec E$.',
  sol: 'V ∝ I at constant temperature; J = σE.',
  scheme: [['Statement with constant temperature', 1], ['J = σE', 1]],
  d: 1, c: 'recall', t: [2], wl: null,
}));
add('macro-short', short({
  marks: 2,
  stem: 'Show that the microscopic form J = σE leads to V = IR for a uniform wire of length l and cross-section A, and identify R.',
  model: r`In a uniform wire $J = \dfrac{I}{A}$ and $E = \dfrac{V}{l}$. So $\dfrac{I}{A} = \sigma\dfrac{V}{l}$, i.e. $V = \dfrac{l}{\sigma A}I = \dfrac{\rho l}{A}I$. This is $V = IR$ with $R = \dfrac{\rho l}{A}$.`,
  sol: 'Substitute J = I/A, E = V/l.',
  scheme: [['J = I/A and E = V/l', 1], ['V = (ρl/A)I, R = ρl/A', 1]],
  d: 3, c: 'understanding', t: [2, 3], wl: null,
}));
add('cond-fill', fill({
  stem: 'Electrical conductivity is measured in siemens per ___.',
  acc: [['metre', 'meter', 'm']],
  sol: 'Siemens per **metre** (S m⁻¹ = Ω⁻¹ m⁻¹).',
  d: 1, c: 'recall', t: [2],
}));
add('ndouble-mcq', mcq({
  stem: 'Metal X has twice as many free electrons per unit volume as metal Y, and the same relaxation time. The resistivity of X is',
  right: 'half that of Y',
  wrong: ['twice that of Y', 'equal to that of Y', 'four times that of Y'],
  sol: 'ρ = m/(ne²τ) ∝ 1/n — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('scalar-short', short({
  marks: 2,
  stem: 'Electric current has both magnitude and a direction along a wire. Why is it nevertheless treated as a scalar quantity?',
  model: 'Currents meeting at a junction **add algebraically**, not by the **parallelogram law**: the current leaving equals the sum of those arriving whatever the angles between the wires. A vector would have to add according to directions; current does not, so it is a **scalar** (its “direction” is only a sense along the conductor).',
  sol: 'Algebraic addition at junctions.',
  scheme: [['Currents add algebraically at junctions', 1], ['Do not obey vector (parallelogram) addition', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t03 resistance, resistivity, V–I
add('stretch-mcq', mcq({
  stem: 'A 10 Ω constantan wire is drawn out through a die until it is 50% longer, its volume unchanged. Its resistance becomes',
  right: '22.5 Ω',
  wrong: ['15 Ω', '6.7 Ω', '30 Ω'],
  sol: 'Volume constant: l → 1.5l and A → A/1.5, so R = ρl/A rises by 1.5 × 1.5 = 2.25, to 22.5 Ω — option (@K).',
  d: 2, c: 'application', t: [3],
}));
const rw = (1.7e-8 * 100) / 1.5e-6;
add('Rwire-num', num({
  stem: 'An electrician’s 100 m reel of house wire has a copper core of cross-section 1.5 mm² (resistivity of copper 1.7 × 10⁻⁸ Ω m). What is the resistance of the whole reel, in ohms (3 significant figures)?',
  value: Number(dec(rw, 3)), tol: 0.02, unit: 'Ω',
  sol: r`$R = \dfrac{\rho l}{A} = \dfrac{1.7 \times 10^{-8} \times 100}{1.5 \times 10^{-6}} \approx ${dec(rw, 3)}$ Ω.`,
  scheme: [['R = ρl/A ≈ 1.13 Ω', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(q.answer.value, 1.7e-6 / 1.5e-6) || 'rw');
const rf = { l: 0.5, A: 0.2e-6, R: 2.5 };
rf.rho = (rf.R * rf.A) / rf.l;
add('rhofind-num', num({
  stem: 'A wire 50 cm long with a cross-section of 0.20 mm² has a resistance of 2.5 Ω. Find the resistivity of its material, in units of 10⁻⁶ Ω m.',
  value: Number(dec(rf.rho / 1e-6, 2)), tol: 0.02, unit: '× 10⁻⁶ Ω m',
  sol: r`$\rho = \dfrac{RA}{l} = \dfrac{2.5 \times 0.20 \times 10^{-6}}{0.50} = ${sci(rf.rho, 2)}$ Ω m, i.e. $\dfrac{${sci(rf.rho, 2)}}{10^{-6}} = ${dec(rf.rho / 1e-6, 2)}$.`,
  scheme: [['ρ = RA/l', 1], ['1.0 × 10⁻⁶ Ω m', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(rf.rho, 1e-6) || 'rf');
add('halfdia-mcq', mcq({
  stem: 'Wire Q has the same length and material as wire P but half its diameter. The resistance of Q is',
  right: '4 times that of P',
  wrong: ['2 times that of P', 'half that of P', 'the same as that of P'],
  sol: 'A ∝ d²: halving d makes A a quarter, so R = ρl/A is 4 times larger — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cut-mcq', mcq({
  stem: 'A wire of resistance 16 Ω is cut into four equal pieces, which are then connected in parallel. The resistance of the combination is',
  right: '1 Ω',
  wrong: ['4 Ω', '16 Ω', '64 Ω'],
  sol: 'Each piece has 4 Ω; four 4 Ω resistors in parallel give 4/4 = 1 Ω — option (@K).',
  d: 4, c: 'analysis', t: [3],
}));
add('ohmic-mcq', mcq({
  stem: 'A carbon-film resistor is held at a steady temperature while the p.d. across it is varied and the current is recorded. If it obeys Ohm’s law, the plot of I against V is',
  right: 'a straight line through the origin',
  wrong: ['a curve bending towards the V-axis', 'a straight line meeting the V-axis away from the origin', 'a horizontal line'],
  sol: 'Ohm’s law: I ∝ V, so the graph is a straight line through the origin with slope 1/R — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
const tb = { V1: 1.0, I1: 0.2, V2: 3.0, I2: 0.3 };
tb.R1 = tb.V1 / tb.I1;
tb.R2 = tb.V2 / tb.I2;
add('lamp-short', short({
  marks: 2,
  stem: 'A torch bulb draws 0.20 A at 1.0 V but only 0.30 A at 3.0 V. Use these readings to show that the bulb is non-ohmic, and explain the cause.',
  model: r`$R = V/I$: at 1.0 V, $R = ${dec(tb.R1, 2)}$ Ω; at 3.0 V, $R = ${dec(tb.R2, 2)}$ Ω. The resistance **doubles**, so I is **not proportional** to V: the bulb is **non-ohmic**. The larger current **heats the filament**; in hotter metal the ions vibrate more, the **relaxation time falls** and the resistivity rises.`,
  sol: 'Compare V/I at the two readings; the filament heats up.',
  scheme: [['R = 5.0 Ω and 10 Ω: not constant, so non-ohmic', 1], ['Filament heats; τ falls, resistivity rises', 1]],
  d: 3, c: 'application', t: [3, 4],
}), () => near(tb.R1, 5) && near(tb.R2, 10) || 'tb');
add('lampmp-ar', ar({
  a: 'A filament lamp does not obey Ohm’s law.',
  r: 'Tungsten has a very high melting point.',
  key: 'b',
  sol: 'Both true, but R does not explain A: the lamp is non-ohmic because its resistance rises as the filament heats; the high melting point only lets it get very hot without melting — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('slope-mcq', mcq({
  stem: 'For an ohmic resistor, the slope of the graph of current (y-axis) against potential difference (x-axis) gives',
  right: 'the reciprocal of the resistance (the conductance)',
  wrong: ['the resistance', 'the resistivity', 'the power'],
  sol: 'I = V/R: the slope ΔI/ΔV = 1/R = G — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('rholength-tf', tf({
  stem: 'The resistivity of a wire doubles when its length is doubled.',
  key: 'f',
  sol: 'False. Resistivity is a property of the material (and temperature); doubling the length doubles the resistance, not the resistivity.',
  d: 1, c: 'understanding', t: [3],
}));
add('G-num', num({
  stem: 'Find the conductance of a 25 Ω resistor, in siemens.',
  value: 0.04, tol: 0.001, unit: 'S',
  sol: r`$G = \dfrac{1}{R} = \dfrac{1}{25} = 0.04$ S.`,
  scheme: [['G = 1/R = 0.040 S', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('samemass-num', num({
  stem: 'Two wires are made from equal masses of the same metal; the second is twice as long as the first. Find the ratio of the resistance of the second wire to that of the first.',
  value: 4, tol: 0.02, unit: '',
  sol: r`Same mass and material means the same volume $Al$. With $l_2 = 2l_1$, $A_2 = A_1/2$. $\dfrac{R_2}{R_1} = \dfrac{l_2/A_2}{l_1/A_1} = 2 \times 2 = 4$.`,
  scheme: [['Same volume: A₂ = A₁/2', 1], ['R₂/R₁ = 4', 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near((2 / (1 / 2)) / (1 / 1), q.answer.value) || 'samemass');
const rc = { l1: 1, d1: 0.5e-3, l2: 2, d2: 1e-3 };
rc.ratio = (rc.l1 / rc.d1 ** 2) / (rc.l2 / rc.d2 ** 2);
add('compare-short3', short({
  marks: 3,
  stem: 'Wires A and B are made of the same alloy. A is 1.0 m long with diameter 0.50 mm; B is 2.0 m long with diameter 1.0 mm. Find the ratio of their resistances and state which gets hotter when they carry the same current.',
  model: r`$R = \dfrac{\rho l}{\pi d^2/4} \propto \dfrac{l}{d^2}$. $\dfrac{R_A}{R_B} = \dfrac{1.0/(0.50)^2}{2.0/(1.0)^2} = \dfrac{4.0}{2.0} = ${dec(rc.ratio, 2)}$. With the same current, power $I^2R$ is larger in **A** (twice that in B), so A produces more heat.`,
  sol: 'R ∝ l/d²; I²R.',
  scheme: [['R ∝ l/d²', 1], ['R_A/R_B = 2', 1], ['A dissipates more (I²R)', 1]],
  d: 3, c: 'application', t: [3, 5], wl: null,
}), () => near(rc.ratio, 2) || 'rc');

// ================================================================ t04 temperature dependence
add('semi-ar', ar({
  a: 'A pure silicon chip conducts better on a hot afternoon than on a cold night.',
  r: 'Warming a semiconductor frees many more charge carriers, an effect that outweighs the shorter relaxation time.',
  key: 'a',
  sol: 'Both true, and R explains A: in ρ = m/(ne²τ) the rise in n far outweighs the fall in τ, so the resistivity of the chip is lower when it is warm — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
const af = { R1: 40, R2: 48, dT: 100 };
af.alpha = (af.R2 - af.R1) / (af.R1 * af.dT);
add('alpha-num', num({
  stem: 'A coil has resistance 40 Ω at 20 °C and 48 Ω at 120 °C. Find the temperature coefficient of resistance of its material (taking 20 °C as reference), in units of 10⁻³ °C⁻¹.',
  value: Number(dec(af.alpha / 1e-3, 2)), tol: 0.02, unit: '× 10⁻³ °C⁻¹',
  sol: r`$\alpha = \dfrac{R_2 - R_1}{R_1\Delta T} = \dfrac{48 - 40}{40 \times 100} = ${sci(af.alpha, 2)}$ °C$^{-1}$, i.e. $\dfrac{${sci(af.alpha, 2)}}{10^{-3}} = ${dec(af.alpha / 1e-3, 2)}$.`,
  scheme: [['α = ΔR/(R₁ΔT)', 1], ['2.0 × 10⁻³ °C⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(af.alpha, 2e-3) || 'af');
const fd = { alpha: 4e-3 };
fd.T = 1 / fd.alpha;
add('double-num', num({
  stem: 'A copper wire has temperature coefficient of resistance 4.0 × 10⁻³ °C⁻¹ referred to 0 °C. At what temperature, in °C, is its resistance double its value at 0 °C (assuming the linear relation holds)?',
  value: fd.T, tol: 1, unit: '°C',
  sol: r`$2R_0 = R_0(1 + \alpha T) \Rightarrow \alpha T = 1 \Rightarrow T = \dfrac{1}{4.0 \times 10^{-3}} = ${dec(fd.T, 3)}$ °C.`,
  scheme: [['αT = 1', 1], ['T = 250 °C', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(fd.T, 250) || 'fd');
add('metalheat-mcq', mcq({
  stem: 'When a metal wire is heated, its resistivity increases mainly because',
  right: 'the ions vibrate more, so the relaxation time decreases',
  wrong: ['the number of free electrons decreases', 'the wire expands and becomes longer', 'the free electrons gain mass'],
  sol: 'In ρ = m/(ne²τ), n hardly changes in a metal; τ falls as collisions become more frequent — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('alloy-mcq', mcq({
  stem: 'The coils inside a laboratory resistance box are wound from constantan rather than copper, chiefly because constantan',
  right: 'changes its resistance very little when its temperature changes',
  wrong: ['conducts better than copper', 'has a resistance that falls as it warms', 'cannot melt at any working current'],
  sol: 'Constantan’s temperature coefficient of resistance is tiny, so the marked values stay reliable as the coils warm — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('tempexplain-short3', short({
  marks: 3,
  stem: 'A copper strip and a silicon chip are both warmed from 20 °C to 80 °C. Referring to the carrier density n and the relaxation time τ in ρ = m/(ne²τ), state and explain what happens to the resistivity of each, and describe the shape of each ρ–T graph.',
  model: '**Copper strip:** n is practically **constant**; on warming the ions vibrate with larger amplitude, so collisions are more frequent and **τ falls**: ρ **increases**, almost linearly (a gently rising, nearly straight graph). **Silicon chip:** warming frees many more charge carriers, so **n rises very sharply**; this outweighs the fall in τ, so ρ **decreases** steeply (a falling, roughly exponential graph).',
  sol: 'τ for metals, n for semiconductors.',
  scheme: [['Metal: τ decreases, ρ rises (near-linear graph)', 1], ['Semiconductor: n increases sharply', 1], ['ρ falls steeply (falling graph)', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('thermometer-short', short({
  marks: 2,
  stem: 'Explain the principle of a platinum resistance thermometer.',
  model: 'The resistance of a pure metal such as platinum **increases steadily** (nearly linearly) with temperature: $R_T = R_0(1 + \\alpha\\Delta T)$. By measuring the **resistance** of a platinum coil and knowing $R_0$ and α, the **temperature** can be calculated; platinum is stable and its α is reproducible.',
  sol: 'R varies predictably with T.',
  scheme: [['R increases steadily with T', 1], ['Measure R to find T', 1]],
  d: 2, c: 'application', t: [4],
}));
add('surge-mcq', mcq({
  stem: 'An incandescent lamp draws a much larger current at the instant it is switched on than a moment later. This is because',
  right: 'the cold filament has a much lower resistance than the hot filament',
  wrong: ['the supply voltage is higher at switch-on', 'the filament stores charge when cold', 'the drift velocity is larger when the filament is hot'],
  sol: 'Tungsten’s resistance rises many times as it heats to about 2500 °C, so the initial current I = V/R is large — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('heatdown-ar', ar({
  a: 'A copper wire connected to a fixed battery carries more current after it has been warmed in hot water.',
  r: 'The ions of warmer copper vibrate with a larger amplitude.',
  key: 'd',
  sol: 'R is true. A is false: larger ionic vibrations mean more frequent collisions, a shorter τ and a larger resistivity, so the warmed wire carries less current — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
const tc = { T1: 20, R1: 15.0, T2: 100, R2: 19.8 };
tc.alpha = (tc.R2 - tc.R1) / (tc.R1 * (tc.T2 - tc.T1));
tc.R0 = tc.R1 / (1 + tc.alpha * (0 - tc.T1));
tc.Rx = tc.R1 * (1 + tc.alpha * (60 - tc.T1));
add('coil-short3', short({
  marks: 3,
  stem: 'The sensing coil of an oven thermostat reads 15.0 Ω at 20 °C and 19.8 Ω at 100 °C. Taking 20 °C as the reference temperature, find (a) the temperature coefficient of resistance of its wire, (b) what the coil reads at 60 °C.',
  model: r`(a) $\alpha = \dfrac{19.8 - 15.0}{15.0 \times 80} = \dfrac{4.8}{1200} = ${sci(tc.alpha, 2)}$ °C$^{-1}$.
(b) $R_{60} = 15.0[1 + ${sci(tc.alpha, 2)} \times 40] = 15.0 \times 1.16 = ${dec(tc.Rx, 3)}$ Ω.`,
  sol: 'α = ΔR/(R ΔT); R = R₁(1 + αΔT).',
  scheme: [['α = 4.0 × 10⁻³ °C⁻¹', 1], ['Substitution at 60 °C', 1], ['R = 17.4 Ω', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(tc.alpha, 4e-3) && near(tc.Rx, 17.4) || 'tc');

// ================================================================ t05 power and energy
add('halfV-mcq', mcq({
  stem: 'A heater of fixed resistance is connected first to 220 V and then to 110 V. The power on 110 V is',
  right: 'one quarter of the power on 220 V',
  wrong: ['one half of the power on 220 V', 'the same', 'twice the power on 220 V'],
  sol: 'P = V²/R: halving V divides P by 4 — option (@K).',
  d: 2, c: 'application', t: [5],
}));
const pr = 220 ** 2 / 100;
add('Rrated-num', num({
  stem: 'Find the resistance of a lamp rated 100 W, 220 V when working normally, in ohms.',
  value: pr, tol: 1, unit: 'Ω',
  sol: r`$R = \dfrac{V^2}{P} = \dfrac{220^2}{100} = ${dec(pr, 3)}$ Ω.`,
  scheme: [['R = V²/P = 484 Ω', 1]],
  d: 1, c: 'understanding', t: [5],
}), (q) => near(pr, 484) || 'pr');
const ki = 1500 / 230;
add('kettle-num', num({
  stem: 'A 1.5 kW electric kettle works on a 230 V supply. Find the current it draws, in amperes (3 significant figures).',
  value: Number(dec(ki, 3)), tol: 0.03, unit: 'A',
  sol: r`$I = \dfrac{P}{V} = \dfrac{1500}{230} \approx ${dec(ki, 3)}$ A.`,
  scheme: [['I = P/V ≈ 6.52 A', 1]],
  d: 1, c: 'understanding', t: [5],
}), (q) => near(ki, q.answer.value) || 'ki');
const un = Math.round(1.2 * (45 / 60) * 30 * 100) / 100;
add('units-num', num({
  stem: 'A 1.2 kW borewell pump runs for 45 minutes each morning. What energy, in kW h, does it consume over a 30-day month?',
  value: un, tol: 0.2, unit: 'kW h',
  sol: r`Daily energy $= 1.2 \times \dfrac{45}{60} = 0.90$ kW h; in 30 days $0.90 \times 30 = ${dec(un, 2)}$ kW h.`,
  scheme: [['0.90 kW h per day', 1], ['27 kW h', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near(q.answer.value, 27) || 'un');
add('bulbs-mcq', mcq({
  stem: 'A 40 W lamp and a 100 W lamp, both rated 230 V, are wired in series across the 230 V mains. Which statement is correct?',
  right: 'The 40 W lamp dissipates 2.5 times as much power as the 100 W lamp',
  wrong: ['The 100 W lamp dissipates 2.5 times as much power as the 40 W lamp', 'The two lamps dissipate equal power', 'The 40 W lamp dissipates 1.6 times as much power as the 100 W lamp'],
  sol: 'R = V²/P, so R₄₀/R₁₀₀ = 100/40 = 2.5. In series the current is common and P = I²R ∝ R, so the 40 W lamp takes 2.5 times the power of the 100 W lamp — option (@K).',
  d: 4, c: 'analysis', t: [5],
}));
const jh = 2 ** 2 * 10 * 300;
add('joule-num', num({
  stem: 'A current of 2.0 A flows through a 10 Ω resistor for 5.0 minutes. Find the heat produced, in kJ.',
  value: Number(dec(jh / 1000, 2)), tol: 0.1, unit: 'kJ',
  sol: r`$H = I^2Rt = (2.0)^2 \times 10 \times 300 = ${dec(jh, 3)}$ J, i.e. $\dfrac{${dec(jh, 3)}}{1000} = ${dec(jh / 1000, 2)}$ kJ.`,
  scheme: [['H = I²Rt', 1], ['12 kJ', 1]],
  marks: 2, d: 2, c: 'application', t: [5],
}), (q) => near(jh, 12000) || 'jh');
const tr = { P: 50e3, R: 0.5, V1: 250, V2: 5000 };
tr.I1 = tr.P / tr.V1;
tr.L1 = tr.I1 ** 2 * tr.R;
tr.I2 = tr.P / tr.V2;
tr.L2 = tr.I2 ** 2 * tr.R;
add('transmission-short3', short({
  marks: 3,
  stem: 'A solar farm feeds 50 kW to a cold-storage unit along a cable pair of total resistance 0.50 Ω. Work out the heating loss in the cable when the power is delivered (a) at 250 V, (b) after a transformer raises it to 5000 V. What does the comparison show?',
  model: r`(a) $I = \dfrac{50000}{250} = ${dec(tr.I1, 3)}$ A; loss $= I^2R = ${dec(tr.I1, 3)}^2 \times 0.50 = ${dec(tr.L1, 3)}$ W (20 kW).
(b) $I = \dfrac{50000}{5000} = ${dec(tr.I2, 2)}$ A; loss $= ${dec(tr.I2, 2)}^2 \times 0.50 = ${dec(tr.L2, 2)}$ W.
Raising the voltage 20 times cuts the current 20 times and the $I^2R$ loss **400 times**: power is transmitted at high voltage.`,
  sol: 'I = P/V; loss I²R.',
  scheme: [['Loss 20 kW at 250 V', 1], ['Loss 50 W at 5000 V', 1], ['Comment: high voltage reduces loss', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(tr.L1, 20000) && near(tr.L2, 50) || 'tr');
add('kwh-fill', fill({
  stem: 'One kilowatt hour of electrical energy is equal to ___ megajoules.',
  acc: [['3.6']],
  sol: '1 kW h = 1000 W × 3600 s = 3.6 × 10⁶ J = **3.6** MJ.',
  d: 1, c: 'recall', t: [5],
}));
add('power-short', short({
  marks: 2,
  stem: 'Starting from P = VI, show that the power dissipated in a resistor can also be written as I²R and V²/R. When is each form most useful?',
  model: 'With $V = IR$: $P = VI = (IR)I = I^2R$, and $P = V\\dfrac{V}{R} = \\dfrac{V^2}{R}$. Use $I^2R$ when the **current is common** (resistors in **series**) and $V^2/R$ when the **voltage is common** (in **parallel**, e.g. appliances on the mains).',
  sol: 'Substitute V = IR.',
  scheme: [['Both forms derived', 1], ['I²R for series, V²/R for parallel', 1]],
  d: 1, c: 'understanding', t: [5], wl: null,
}));
const bl = { kettle: 1.5 * 0.5, tv: 0.12 * 5, ac: 1.8 * 6, rate: 6.5, days: 30 };
bl.day = bl.kettle + bl.tv + bl.ac;
bl.month = bl.day * bl.days;
bl.bill = bl.month * bl.rate;
add('billing-short3', short({
  marks: 3,
  stem: 'In a flat in Chennai a 1.5 kW kettle runs for 30 minutes, a 120 W television for 5 hours and a 1.8 kW air conditioner for 6 hours each day. Find (a) the daily energy used, (b) the energy in a 30-day month, (c) the bill at ₹6.50 per unit.',
  model: r`(a) $1.5 \times 0.5 + 0.12 \times 5 + 1.8 \times 6 = 0.75 + 0.60 + 10.8 = ${dec(bl.day, 4)}$ kW h.
(b) $${dec(bl.day, 4)} \times 30 = ${dec(bl.month, 4)}$ kW h.
(c) $${dec(bl.month, 4)} \times 6.50 = $ ₹${bl.bill.toFixed(2)}.`,
  sol: 'kW × h; × days; × rate.',
  scheme: [['12.15 kW h per day', 1], ['364.5 kW h per month', 1], ['₹2369.25', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(bl.month, 364.5) && near(bl.bill, 2369.25) || 'bl');

// ================================================================ 5-mark questions (in parts)
const dl = { A: 1.5e-6, I: 3.0, n: 8.5e28 };
dl.v = dl.I / (dl.n * QE * dl.A);
dl.J = dl.I / dl.A;
add('drift-long', long({
  stem: '(a) Distinguish the random (thermal) motion of free electrons in a metal from their drift, and say what the relaxation time is. [1] (b) Obtain the relation $I = n e A v_d$ for a conductor of cross-section A. [2] (c) A copper wire of cross-section 1.5 mm² carries 3.0 A (n = 8.5 × 10²⁸ m⁻³). Find the current density and the drift velocity, and explain why a lamp in the circuit lights almost instantly. [2]',
  model: r`(a) Random motion: fast (about $10^5$ m s$^{-1}$) in all directions, averaging to zero. Drift: the small average velocity (about $10^{-4}$ m s$^{-1}$) opposite to an applied field that gives the current. Relaxation time: the average time between successive collisions of a free electron with the ions.

(b) Electrons within a length $v_d\Delta t$ of a cross-section A cross it in time $\Delta t$: their number is $nAv_d\Delta t$ and charge $n e A v_d\Delta t$, so $I = n e A v_d$.

(c) $J = \dfrac{3.0}{1.5 \times 10^{-6}} = ${sci(dl.J, 2)}$ A m$^{-2}$; $v_d = \dfrac{J}{n e} = \dfrac{${sci(dl.J, 2)}}{8.5 \times 10^{28} \times 1.6 \times 10^{-19}} \approx ${sci(dl.v, 3)}$ m s$^{-1}$. The field that drives the electrons is established along the whole circuit almost instantly, so electrons everywhere, including in the filament, begin to drift at once.`,
  sol: 'Definitions; slice argument; numbers; field.',
  scheme: [['Definitions', 1], ['Slice argument', 1], ['I = neAv_d', 1], ['J = 2.0 × 10⁶ A m⁻², v_d ≈ 1.47 × 10⁻⁴ m s⁻¹', 1], ['Instant lighting explained', 1]],
  d: 3, c: 'application', t: [1, 2], wl: null,
}), () => near(dl.v, 1.47e-4) || 'dl');
const rl = { rho: 1.6e-8, n: 5.9e28 };
rl.tau = ME / (rl.rho * rl.n * QE ** 2);
add('resistivity-long', long({
  stem: '(a) A field E acts inside a metal that has n free electrons per unit volume with relaxation time τ. Obtain their drift speed, and hence show that the resistivity is ρ = m/(ne²τ). [3] (b) Silver has ρ = 1.6 × 10⁻⁸ Ω m and n = 5.9 × 10²⁸ m⁻³. Find the relaxation time. [1] (c) Using your expression, explain why the resistivity of silver rises when it is heated. [1]',
  model: r`(a) In field E, $a = eE/m$; averaged over collisions, $v_d = eE\tau/m$. $J = n e v_d = \dfrac{n e^2\tau}{m}E$; comparing with $J = \sigma E$, $\sigma = \dfrac{n e^2\tau}{m}$ and $\rho = \dfrac{m}{n e^2\tau}$.

(b) $\tau = \dfrac{m}{\rho n e^2} = \dfrac{9.1 \times 10^{-31}}{1.6 \times 10^{-8} \times 5.9 \times 10^{28} \times (1.6 \times 10^{-19})^2} \approx ${sci(rl.tau, 3)}$ s.

(c) n is practically constant in a metal; heating increases ionic vibration, so collisions are more frequent and τ falls, making ρ larger.`,
  sol: 'Drift → J → σ → ρ; numbers; τ falls.',
  scheme: [['v_d = eEτ/m', 1], ['J = (ne²τ/m)E', 1], ['ρ = m/(ne²τ)', 1], ['τ ≈ 3.77 × 10⁻¹⁴ s', 1], ['τ decreases on heating', 1]],
  d: 3, c: 'understanding', t: [2, 4], wl: null,
}), () => near(rl.tau, 3.77e-14) || `rl ${rl.tau}`);
const wl = { rho: 4.9e-7, l: 3.0, d: 0.5e-3, alpha: 1e-5 };
wl.A = Math.PI * (wl.d / 2) ** 2;
wl.R = (wl.rho * wl.l) / wl.A;
wl.R2 = wl.R * 4;
add('wire-long', long({
  stem: '(a) Write the relation between resistance and resistivity, and state the factors on which resistivity depends. [1] (b) A constantan wire (ρ = 4.9 × 10⁻⁷ Ω m) is 3.0 m long and 0.50 mm in diameter. Find its resistance. [2] (c) The wire is stretched uniformly to twice its length. Find its new resistance. [1] (d) Suggest why standard resistors are wound from constantan and not from copper. [1]',
  model: r`(a) $R = \rho l/A$; ρ depends on the material and its temperature (not on the dimensions).

(b) $A = \pi(0.25 \times 10^{-3})^2 \approx ${sci(wl.A, 3)}$ m²; $R = \dfrac{4.9 \times 10^{-7} \times 3.0}{${sci(wl.A, 3)}} \approx ${dec(wl.R, 3)}$ Ω.

(c) Volume constant: length × 2, area ÷ 2, so $R' = 4R \approx ${dec(wl.R2, 3)}$ Ω.

(d) Constantan has a very small temperature coefficient (and high resistivity), so its resistance hardly changes with temperature.`,
  sol: 'R = ρl/A; stretching; low α.',
  scheme: [['Relation and factors', 1], ['Area 1.96 × 10⁻⁷ m²', 1], ['R ≈ 7.49 Ω', 1], ['Stretched: ≈ 30.0 Ω', 1], ['Small temperature coefficient', 1]],
  d: 3, c: 'application', t: [3, 4], wl: null,
}), () => near(wl.R, 7.487) && near(wl.R2, 29.95) || `wl ${wl.R}`);
const pl = { P: 2000, V: 230, V2: 210, h: 2.5, days: 30, rate: 8 };
pl.R = pl.V ** 2 / pl.P;
pl.I = pl.P / pl.V;
pl.P2 = pl.V2 ** 2 / pl.R;
pl.units = (pl.P / 1000) * pl.h * pl.days;
pl.cost = pl.units * pl.rate;
add('power-long', long({
  stem: 'An immersion heater is rated 2000 W, 230 V. (a) Find its resistance and the current it draws. [2] (b) Find its power if the supply falls to 210 V (resistance unchanged). [1] (c) It is used for 2.5 hours a day. Find the energy used in 30 days and its cost at ₹8.00 per unit. [2]',
  model: r`(a) $R = \dfrac{V^2}{P} = \dfrac{230^2}{2000} = ${dec(pl.R, 4)}$ Ω; $I = \dfrac{P}{V} = \dfrac{2000}{230} \approx ${dec(pl.I, 3)}$ A.

(b) $P' = \dfrac{210^2}{${dec(pl.R, 4)}} \approx ${dec(pl.P2, 3)}$ W.

(c) Energy $= 2.0 \times 2.5 \times 30 = ${dec(pl.units, 3)}$ kW h; cost $= ${dec(pl.units, 3)} \times 8.00 = $ ₹${pl.cost.toFixed(0)}.`,
  sol: 'V²/P; P/V; V′²/R; kW × h.',
  scheme: [['R ≈ 26.45 Ω', 1], ['I ≈ 8.70 A', 1], ['P′ ≈ 1670 W', 1], ['150 kW h', 1], ['₹1200', 1]],
  d: 3, c: 'application', t: [5], wl: null,
}), () => near(pl.R, 26.45) && near(pl.P2, 1667) && near(pl.cost, 1200) || 'pl');
const cb = { rAl: 2.8e-8, dAl: 2700, rCu: 1.7e-8, dCu: 8900 };
cb.areaRatio = cb.rAl / cb.rCu;
cb.massRatio = (cb.rAl * cb.dAl) / (cb.rCu * cb.dCu);
add('cable-long', long({
  stem: 'Overhead power lines are often made of aluminium rather than copper. Aluminium: ρ = 2.8 × 10⁻⁸ Ω m, density 2700 kg m⁻³. Copper: ρ = 1.7 × 10⁻⁸ Ω m, density 8900 kg m⁻³. (a) For cables of the same length and resistance, find the ratio of the cross-sectional area of the aluminium cable to that of the copper cable. [2] (b) Find the ratio of their masses. [2] (c) Use your results to explain the choice of aluminium. [1]',
  model: r`(a) Same $R$ and $l$: $\rho_\text{Al}/A_\text{Al} = \rho_\text{Cu}/A_\text{Cu}$, so $\dfrac{A_\text{Al}}{A_\text{Cu}} = \dfrac{2.8}{1.7} \approx ${dec(cb.areaRatio, 3)}$.

(b) Mass $= $ density × $Al$: $\dfrac{m_\text{Al}}{m_\text{Cu}} = \dfrac{2700 \times 2.8}{8900 \times 1.7} \approx ${dec(cb.massRatio, 3)}$.

(c) Although the aluminium cable needs about 1.65 times the cross-section, it weighs only about half as much as an equally good copper cable, so the pylons can be lighter and further apart; aluminium is also cheaper.`,
  sol: 'A ∝ ρ; mass ∝ ρ × density.',
  scheme: [['A ∝ ρ for equal R and l', 1], ['Area ratio ≈ 1.65', 1], ['Mass ∝ density × A', 1], ['Mass ratio ≈ 0.50', 1], ['Lighter for the same resistance', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => near(cb.massRatio, 0.4997) || `cb ${cb.massRatio}`);
