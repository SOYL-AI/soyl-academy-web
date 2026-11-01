// ISC 12 Physics ch12 Electromagnetic Waves — question bank (ISC style).
// Numbers computed and re-checked. Qualitative treatment of the waves (ISC removed topic: their mathematical treatment):
// numericals use only c = fλ, E₀ = cB₀, c = 1/√(μ₀ε₀), radar ranging and i_d = ε₀ dΦE/dt = C dV/dt.
import { mk, add, r, sci, dec, near, EPS0 } from '../../isc-12-physics-ch01/src/lib.mjs';
import { MU0, C0 } from './decks.mjs';
import { bandOf } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const same = (a, b) => a.every((x, i) => Math.abs(x - b[i]) < 1e-12);

// ================================================================ t01 displacement current
add('dispsurface-mcq', mcq({
  stem: 'A circular loop is drawn round one lead of a capacitor while it charges with current i. A flat disc bounded by the loop is pierced by the lead. A second surface, bounded by the same loop, bulges out like a bag and passes between the plates. The conduction current crossing the bag-shaped surface is',
  right: 'zero, so Ampère’s original law gives a different answer for each surface',
  wrong: ['i, exactly as for the flat disc', '2i, since the current both enters and leaves the bag', 'i/2, since the bag has twice the area of the disc'],
  sol: 'No charge crosses the gap between the plates, so the bag-shaped surface encloses no conduction current, while the flat disc encloses i. The same loop would have two different values of ∮B · dl, which is why Maxwell added the displacement current ε₀ dΦE/dt through the gap — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const ir = { C: 50e-9, V: 12, t: 3e-3 };
ir.id = (ir.C * ir.V) / ir.t;
add('idrule-mcq', mcq({
  stem: 'The p.d. across a 50 nF capacitor in a timing circuit rises steadily from 0 to 12 V in 3.0 ms. While it rises, the displacement current between the plates is',
  right: '0.20 mA',
  wrong: ['0.60 μA', '0.20 μA', '2.0 mA'],
  sol: r`$i_d = C\dfrac{dV}{dt} = 50 \times 10^{-9} \times \dfrac{12}{3.0 \times 10^{-3}} = ${sci(ir.id, 2)}$ A, i.e. 0.20 mA. 0.60 μC is the final charge (forgetting to divide by the time) — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(ir.id, 2e-4) || 'ir');
add('Bloop-mcq', mcq({
  stem: 'Viewed along the axis of a pair of circular plates while the capacitor they form is being charged, the magnetic field lines in and around the gap',
  right: 'are circles centred on the axis, as round a wire carrying the charging current',
  wrong: ['are straight lines parallel to the electric field between the plates', 'point radially outwards from the axis', 'do not exist, because no charge crosses the gap'],
  sol: 'The displacement current through the gap produces a magnetic field exactly like a conduction current: closed circles round the axis, whose sense follows the right-hand rule — option (@K).',
  d: 2, c: 'understanding', t: [1],
}), () => {
  const b = cross([0, 0, 1], [1, 0, 0]);
  return (Math.abs(b[2]) < 1e-12 && Math.abs(b[0]) < 1e-12) || 'bl'; // tangential, not radial or axial
});
add('discharging-tf', tf({
  stem: 'While a camera-flash capacitor discharges through the flash tube, a displacement current exists in the gap between its plates.',
  key: 't',
  sol: 'True. As the plates lose charge the electric field in the gap falls, so the electric flux is changing and ε₀ dΦE/dt is not zero; it equals the discharge current, in the opposite sense to the charging case.',
  d: 2, c: 'understanding', t: [1],
}));
add('idunit-fill', fill({
  stem: 'In Maxwell’s term ε₀ dΦE/dt the electric flux ΦE is in volt metres and ε₀ in C² N⁻¹ m⁻², so the product works out in ___, the unit of current.',
  acc: [['amperes', 'ampere', 'A']],
  sol: 'C² N⁻¹ m⁻² × V m s⁻¹ = C² N⁻¹ m⁻¹ s⁻¹ × (N m C⁻¹) = C s⁻¹, i.e. **amperes**: the displacement current is a genuine current in its units and in its magnetic effect.',
  d: 1, c: 'recall', t: [1],
}));
const fv = { C: 400e-6, rate: 250 };
fv.id = fv.C * fv.rate;
add('IdV-num', num({
  stem: 'The 400 μF capacitor of a photographic flash unit charges with its p.d. rising at an average 250 V s⁻¹. Find the average displacement current between its plates, in amperes.',
  value: Number(dec(fv.id, 2)), tol: 0.005, unit: 'A',
  sol: r`$i_d = C\dfrac{dV}{dt} = 400 \times 10^{-6} \times 250 = ${dec(fv.id, 2)}$ A, the same as the charging current in the leads.`,
  scheme: [['i_d = C dV/dt = 0.10 A', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(fv.id, 0.1) && q.answer.value === 0.1 || 'fv');
const ie = { side: 0.12, rate: 1.5e11 };
ie.A = ie.side ** 2;
ie.id = EPS0 * ie.A * ie.rate;
add('IdE-num', num({
  stem: 'A capacitor has square plates of side 12 cm. While it charges, the electric field in the gap grows by 1.5 × 10¹¹ V m⁻¹ every second. How large is the displacement current through the gap? Give your answer in mA to 3 significant figures.',
  value: Number(dec(ie.id * 1e3, 3)), tol: 0.1, unit: 'mA',
  sol: r`$\dfrac{d\Phi_E}{dt} = A\dfrac{dE}{dt} = (0.12)^2 \times 1.5 \times 10^{11} = ${sci(ie.A * ie.rate, 3)}$ V m s$^{-1}$; $i_d = \varepsilon_0\dfrac{d\Phi_E}{dt} = 8.85 \times 10^{-12} \times ${sci(ie.A * ie.rate, 3)} = ${sci(ie.id, 3)}$ A, i.e. $${sci(ie.id, 3)} \times 10^{3} = ${dec(ie.id * 1e3, 3)}$ mA.`,
  scheme: [['dΦE/dt = A dE/dt = 2.16 × 10⁹ V m s⁻¹', 1], ['i_d = 19.1 mA', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(ie.id, 0.019116, 0.001) && near(q.answer.value, 19.1) || `ie ${ie.id}`);
const dv = { C: 2.5e-9, id: 5e-3 };
dv.rate = dv.id / dv.C;
add('dvdt-num', num({
  stem: 'A displacement current of 5.0 mA is to be set up between the plates of a 2.5 nF capacitor. At what rate must the p.d. across it change? Answer in megavolts per second (MV s⁻¹).',
  value: Number(dec(dv.rate / 1e6, 2)), tol: 0.05, unit: 'MV s⁻¹',
  sol: r`$i_d = C\dfrac{dV}{dt}$, so $\dfrac{dV}{dt} = \dfrac{5.0 \times 10^{-3}}{2.5 \times 10^{-9}} = ${sci(dv.rate, 2)}$ V s$^{-1}$, i.e. $\dfrac{${sci(dv.rate, 2)}}{10^{6}} = ${dec(dv.rate / 1e6, 2)}$ MV s$^{-1}$.`,
  scheme: [['dV/dt = i_d/C', 1], ['2.0 × 10⁶ V s⁻¹ = 2.0 MV s⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(dv.rate, 2e6) && q.answer.value === 2 || 'dv');
const fr = { id: 1 };
fr.rate = fr.id / EPS0;
add('fluxrate-num', num({
  stem: 'At what rate must the electric flux through a surface change for a displacement current of 1.0 A to cross it? Give the answer in units of 10¹¹ V m s⁻¹ (3 significant figures).',
  value: Number(dec(fr.rate / 1e11, 3)), tol: 0.01, unit: '10¹¹ V m s⁻¹',
  sol: r`$\dfrac{d\Phi_E}{dt} = \dfrac{i_d}{\varepsilon_0} = \dfrac{1.0}{8.85 \times 10^{-12}} = ${sci(fr.rate, 3)}$ V m s$^{-1}$, i.e. $\dfrac{${sci(fr.rate, 3)}}{10^{11}} = ${dec(fr.rate / 1e11, 3)}$ in units of $10^{11}$ V m s$^{-1}$: a very fast change for a modest current.`,
  scheme: [['dΦE/dt = i_d/ε₀ = 1.13 × 10¹¹ V m s⁻¹', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(fr.rate, 1.12994e11, 0.001) && near(q.answer.value, 1.13) || 'fr');
add('idsign-ar', ar({
  a: 'When a capacitor is switched on to a battery through a resistor, the displacement current between its plates is largest at the very first instant.',
  r: 'The displacement current is proportional to the rate of change of the electric flux between the plates.',
  key: 'a',
  sol: 'Both true, and R explains A: i_d = ε₀ dΦE/dt equals the charging current, which is largest at switch-on when the uncharged capacitor offers no opposing p.d.; the field then grows fastest, and its growth slows as the plates fill — option (a).',
  d: 3, c: 'analysis', t: [1],
}));
add('steadyDC-ar', ar({
  a: 'A steady direct current can keep flowing indefinitely round a circuit that contains a capacitor in series.',
  r: 'A displacement current exists in the gap of a capacitor only while the electric field there is changing.',
  key: 'd',
  sol: 'R is true. A is false: once the capacitor is fully charged the field in the gap stops changing, the displacement current falls to zero, and with no current across the gap the current in the rest of the series circuit stops too — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('continuity-short2', short({
  marks: 2,
  stem: 'A capacitor is being charged from a battery. Charge flows in the wires but never across the gap between the plates. Explain how the idea of displacement current makes the current continuous round this circuit.',
  model: 'In the gap no charge moves, but the electric field, and so the electric flux, is **changing** as charge builds up. This acts as a **displacement current** ε₀ dΦE/dt, which equals the conduction current i in the wires. So conduction current in the leads and displacement current in the gap form one **continuous** current, with the same magnetic effect everywhere.',
  sol: 'Changing flux in the gap gives i_d = i.',
  scheme: [['Changing electric flux in the gap acts as a displacement current', 1], ['It equals the conduction current, so the current is continuous', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('cdvsd-short2', short({
  marks: 2,
  stem: 'Give two differences between the conduction current in the copper leads of a charging capacitor and the displacement current in its gap, and one way in which they are alike.',
  model: 'Differences: (i) conduction current is the drift of **charges** through a conductor, while displacement current is a **changing electric field** with no charge moving; (ii) conduction current needs a conductor, while displacement current can exist in an insulator or even **vacuum**. Alike: both produce a **magnetic field** in exactly the same way.',
  sol: 'Moving charge versus changing E; conductor versus anywhere; both make B.',
  scheme: [['Two differences', 1], ['Both produce magnetic fields', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('idequal-short3', short({
  marks: 3,
  stem: 'A parallel-plate capacitor with plates of area A is being charged; at some instant the charge on its positive plate is q. Starting from E = q/(ε₀A) for the field in the gap, prove that ε₀ dΦE/dt across the gap equals the current in the connecting wires, and state what this result means for Ampère’s circuital law.',
  model: r`The field between the plates is uniform: $E = \dfrac{q}{\varepsilon_0A}$, so the electric flux through the gap is $\Phi_E = EA = \dfrac{q}{\varepsilon_0}$.
Then $i_d = \varepsilon_0\dfrac{d\Phi_E}{dt} = \varepsilon_0 \cdot \dfrac{1}{\varepsilon_0}\dfrac{dq}{dt} = \dfrac{dq}{dt} = i$, the current in the wires.
Meaning: if the displacement current is added to the conduction current, $\oint \vec B \cdot d\vec l = \mu_0(i + i_d)$, every surface bounded by a loop round the lead gives the same total current $i$, so the Ampère–Maxwell law is consistent.`,
  sol: 'ΦE = q/ε₀, so ε₀ dΦE/dt = dq/dt.',
  scheme: [['ΦE = EA = q/ε₀', 1], ['ε₀ dΦE/dt = dq/dt = i', 1], ['Ampère–Maxwell law gives the same answer for every surface', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}));
const cp = { q: 10e-6, t1: 2.5e-3, t2: 1e-3 };
cp.i1 = cp.q / cp.t1;
cp.i3 = cp.q / cp.t2;
add('chargeplot-short3', short({
  marks: 3,
  stem: 'The charge on the positive plate of a capacitor rises steadily from zero to 10 μC between t = 0 and t = 2.5 ms, stays at 10 μC until t = 6.0 ms, and then falls steadily to zero by t = 7.0 ms. Find the displacement current between the plates in each of the three intervals, and compare its direction in the first and last.',
  model: r`For a parallel-plate capacitor $i_d = \varepsilon_0\dfrac{d\Phi_E}{dt} = \dfrac{dq}{dt}$, the slope of the $q$–$t$ graph.
0 to 2.5 ms: $i_d = \dfrac{10 \times 10^{-6}}{2.5 \times 10^{-3}} = ${sci(cp.i1, 2)}$ A (4.0 mA).
2.5 ms to 6.0 ms: the charge, and so the field, is constant: $i_d = 0$.
6.0 ms to 7.0 ms: $|i_d| = \dfrac{10 \times 10^{-6}}{1.0 \times 10^{-3}} = ${sci(cp.i3, 2)}$ A (10 mA), two and a half times as large and in the **opposite** direction, since the field is now falling.`,
  sol: 'i_d = slope of q against t.',
  scheme: [['4.0 mA in the first interval', 1], ['Zero while the charge is steady', 1], ['10 mA, reversed, in the last', 1]],
  d: 3, c: 'analysis', t: [1], wl: null,
}), () => near(cp.i1, 4e-3) && near(cp.i3, 0.01) || 'cp');
const ic = { A: 0.25, d: 2e-3, rate: 5e4 };
ic.C = (EPS0 * ic.A) / ic.d;
ic.dEdt = ic.rate / ic.d;
ic.id = EPS0 * ic.A * ic.dEdt;
ic.i = ic.C * ic.rate;
add('idcalc-short3', short({
  marks: 3,
  stem: 'The plates of an air-filled capacitor each have an area of 0.25 m² and are 2.0 mm apart. The p.d. between them is increasing at 5.0 × 10⁴ V s⁻¹. Find (a) the capacitance, (b) the rate at which the electric field in the gap grows, (c) the displacement current, and compare it with the current in the leads.',
  model: r`(a) $C = \dfrac{\varepsilon_0A}{d} = \dfrac{8.85 \times 10^{-12} \times 0.25}{2.0 \times 10^{-3}} = ${sci(ic.C, 3)}$ F (about 1.1 nF).
(b) $E = \dfrac{V}{d}$, so $\dfrac{dE}{dt} = \dfrac{5.0 \times 10^{4}}{2.0 \times 10^{-3}} = ${sci(ic.dEdt, 2)}$ V m$^{-1}$ s$^{-1}$.
(c) $i_d = \varepsilon_0A\dfrac{dE}{dt} = 8.85 \times 10^{-12} \times 0.25 \times ${sci(ic.dEdt, 2)} = ${sci(ic.id, 3)}$ A (55.3 μA). The lead current is $C\dfrac{dV}{dt} = ${sci(ic.C, 3)} \times 5.0 \times 10^{4} = ${sci(ic.i, 3)}$ A: the same.`,
  sol: 'C = ε₀A/d; dE/dt = (dV/dt)/d; i_d = ε₀A dE/dt = C dV/dt.',
  scheme: [['C ≈ 1.11 × 10⁻⁹ F', 1], ['dE/dt = 2.5 × 10⁷ V m⁻¹ s⁻¹', 1], ['i_d ≈ 5.53 × 10⁻⁵ A, equal to the lead current', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(ic.C, 1.10625e-9) && near(ic.id, 5.53125e-5) && near(ic.i, ic.id) || 'ic');

// ================================================================ t02 nature, speed and properties of EM waves
add('transverse-mcq', mcq({
  stem: 'A weather balloon carries a receiver straight above a ground transmitter, so the radio waves reaching it travel vertically upwards. At the balloon, the electric and magnetic fields of the wave oscillate',
  right: 'both in horizontal directions, at right angles to each other',
  wrong: ['both vertically, along the direction of travel', 'E vertically and B horizontally', 'both horizontally, parallel to each other'],
  sol: 'EM waves are transverse: E and B are both perpendicular to the direction of travel (here vertical), so both lie in the horizontal plane, and they are also perpendicular to each other — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => {
  const E = [1, 0, 0];
  const B = [0, 1, 0];
  return same(cross(E, B), [0, 0, 1]) || 'tv';
});
add('EBdir-mcq', mcq({
  stem: 'A radio wave travels due north over flat ground. At one instant, at a certain point, its electric field points due east. At that point and instant its magnetic field points',
  right: 'vertically downwards',
  wrong: ['vertically upwards', 'due west', 'due south'],
  sol: r`The direction of travel is that of $\vec E \times \vec B$. With x east, y north, z up: $\hat x \times (-\hat z) = +\hat y$ (north), so $\vec B$ points vertically **downwards**. Upwards would send the wave south; B cannot be along E (west is antiparallel to E) or along the direction of travel — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => same(cross([1, 0, 0], [0, 0, -1]), [0, 1, 0]) || 'eb');
add('ratio-mcq', mcq({
  stem: 'For any electromagnetic wave travelling in vacuum, the peak electric field divided by the peak magnetic field, E₀/B₀, equals',
  right: 'the speed of light, 3.0 × 10⁸ m s⁻¹',
  wrong: ['1, since the electric and magnetic parts carry equal energy', 'μ₀ε₀', 'the frequency of the wave'],
  sol: 'E₀ = cB₀ for every EM wave in vacuum, so E₀/B₀ = c = 1/√(μ₀ε₀) ≈ 3.0 × 10⁸ m s⁻¹ (V m⁻¹ divided by T gives m s⁻¹) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('samespeed-mcq', mcq({
  stem: 'A lightning stroke 3 km away produces a flash of light, a crackle of radio interference on an AM radio, and thunder. Which arrive at the same moment?',
  right: 'The flash and the radio crackle, both electromagnetic waves travelling at c',
  wrong: ['The radio crackle and the thunder, both of low frequency', 'All three, since they start together', 'None: the radio crackle arrives last because its wavelength is longest'],
  sol: 'Light and radio waves are both EM waves and travel at the same speed c in air (very nearly), taking about 10 μs for 3 km; sound takes about 9 s — option (@K).',
  d: 2, c: 'understanding', t: [2],
}), () => near(3000 / C0, 1e-5) || 'ss');
add('cdepends-mcq', mcq({
  stem: 'Imagine a universe in which the permittivity of free space ε₀ were four times its actual value, with μ₀ unchanged. Light in vacuum would travel',
  right: 'at half its actual speed',
  wrong: ['at twice its actual speed', 'at a quarter of its actual speed', 'at the same speed, since c is a universal constant'],
  sol: r`$c = \dfrac{1}{\sqrt{\mu_0\varepsilon_0}} \propto \dfrac{1}{\sqrt{\varepsilon_0}}$, so four times $\varepsilon_0$ gives $\dfrac{1}{\sqrt 4} = \dfrac{1}{2}$ of the speed — option (@K).`,
  d: 3, c: 'analysis', t: [2],
}), () => near(1 / Math.sqrt(MU0 * 4 * EPS0) / (1 / Math.sqrt(MU0 * EPS0)), 0.5) || 'cd');
const cv = { c: 1 / Math.sqrt(MU0 * EPS0) };
add('cvalue-num', num({
  stem: 'Using μ₀ = 4π × 10⁻⁷ T m A⁻¹ and ε₀ = 8.85 × 10⁻¹² C² N⁻¹ m⁻², calculate the speed 1/√(μ₀ε₀) that Maxwell’s theory predicts for electromagnetic waves, in units of 10⁸ m s⁻¹ (3 significant figures).',
  value: Number(dec(cv.c / 1e8, 3)), tol: 0.01, unit: '10⁸ m s⁻¹',
  sol: r`$\mu_0\varepsilon_0 = 4\pi \times 10^{-7} \times 8.85 \times 10^{-12} = ${sci(MU0 * EPS0, 3)}$ s$^2$ m$^{-2}$; $\sqrt{\mu_0\varepsilon_0} = ${sci(Math.sqrt(MU0 * EPS0), 3)}$ s m$^{-1}$; $c = ${sci(cv.c, 3)}$ m s$^{-1}$, i.e. $\dfrac{${sci(cv.c, 3)}}{10^{8}} = ${dec(cv.c / 1e8, 3)}$ in units of $10^{8}$ m s$^{-1}$.`,
  scheme: [['c = 1/√(μ₀ε₀) = 3.00 × 10⁸ m s⁻¹', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(cv.c, 2.9986e8, 0.001) && q.answer.value === 3 || `cv ${cv.c}`);
const bw = { E0: 0.6 };
bw.B0 = bw.E0 / C0;
add('B0wifi-num', num({
  stem: 'A few metres from a home Wi-Fi router, the peak electric field of its signal is 0.60 V m⁻¹. Find the peak magnetic field of the signal there, in nanotesla.',
  value: Number(dec(bw.B0 * 1e9, 2)), tol: 0.05, unit: 'nT',
  sol: r`$B_0 = \dfrac{E_0}{c} = \dfrac{0.60}{3.0 \times 10^{8}} = ${sci(bw.B0, 2)}$ T, i.e. $${sci(bw.B0, 2)} \times 10^{9} = ${dec(bw.B0 * 1e9, 2)}$ nT, about ten thousand times weaker than the Earth’s field.`,
  scheme: [['B₀ = E₀/c = 2.0 nT', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(bw.B0, 2e-9) && q.answer.value === 2 || 'bw');
const er = { B0: 4.5e-6 };
er.E0 = er.B0 * C0;
add('E0radar-num', num({
  stem: 'Close to the dish of a ship’s radar, the peak magnetic field of the microwave beam is 4.5 μT. Find the peak electric field of the beam, in kV m⁻¹.',
  value: Number(dec(er.E0 / 1e3, 3)), tol: 0.01, unit: 'kV m⁻¹',
  sol: r`$E_0 = cB_0 = 3.0 \times 10^{8} \times 4.5 \times 10^{-6} = ${dec(er.E0, 4)}$ V m$^{-1}$, i.e. $\dfrac{${dec(er.E0, 4)}}{10^{3}} = ${dec(er.E0 / 1e3, 3)}$ kV m$^{-1}$.`,
  scheme: [['E₀ = cB₀ = 1.35 kV m⁻¹', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(er.E0, 1350) && q.answer.value === 1.35 || 'er');
const mo = { d: 3.84e8 };
mo.t = mo.d / C0;
add('moon-num', num({
  stem: 'A ground station in Karnataka sends a radio command to a spacecraft orbiting near the Moon, 3.84 × 10⁸ m away. How long does the command take to arrive, in seconds (3 significant figures)?',
  value: Number(dec(mo.t, 3)), tol: 0.01, unit: 's',
  sol: r`Radio waves travel at $c$ through the near-vacuum of space: $t = \dfrac{d}{c} = \dfrac{3.84 \times 10^{8}}{3.0 \times 10^{8}} = ${dec(mo.t, 3)}$ s.`,
  scheme: [['t = d/c = 1.28 s', 1]],
  d: 2, c: 'understanding', t: [2],
}), (q) => near(mo.t, 1.28) && q.answer.value === 1.28 || 'mo');
add('nomedium-tf', tf({
  stem: 'Sunlight reaches the Earth across about 150 million km of almost empty space because electromagnetic waves, unlike sound, need no material medium to travel through.',
  key: 't',
  sol: 'True. An EM wave consists of electric and magnetic fields that regenerate each other; they need no particles to vibrate, so the wave crosses vacuum at c.',
  d: 1, c: 'understanding', t: [2],
}));
add('hertz-fill', fill({
  stem: 'Maxwell predicted that changing fields would travel at 1/√(μ₀ε₀); the German physicist ___ confirmed it in 1887–88 by producing radio waves with a spark gap and detecting them across his laboratory.',
  acc: [['Hertz', 'Heinrich Hertz']],
  sol: '**Heinrich Hertz** generated radio waves with an oscillating spark circuit, detected them with a loop and gap, and showed that they could be reflected, refracted and polarised like light.',
  d: 1, c: 'recall', t: [2],
}));
add('inphase-ar', ar({
  a: 'At a point where the electric field of a travelling electromagnetic wave in vacuum is momentarily zero, its magnetic field is also zero.',
  r: 'In a travelling EM wave in vacuum, the electric and magnetic fields oscillate in phase, with E = cB at every instant.',
  key: 'a',
  sol: 'Both true, and R explains A: since E = cB at every point and instant, E and B pass through zero together and reach their peaks together — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('circling-ar', ar({
  a: 'An electron moving in a circle at constant speed in a uniform magnetic field radiates electromagnetic waves.',
  r: 'A charge radiates only when the magnitude of its velocity changes.',
  key: 'c',
  sol: 'A is true: the electron’s velocity keeps changing direction, so it has a centripetal acceleration, and any accelerated charge radiates. R is false: a change of direction alone is an acceleration and is enough — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('chars-short2', short({
  marks: 2,
  stem: 'Radio waves from a cricket commentary and gamma rays from a hospital’s cobalt unit seem to have nothing in common. Name four properties that they nevertheless share as electromagnetic waves.',
  model: 'Both (i) are **transverse**, with E and B perpendicular to each other and to the direction of travel; (ii) travel at the same speed **c = 3.0 × 10⁸ m s⁻¹** in vacuum; (iii) need **no medium**; (iv) carry **energy and momentum**, and are not deflected by electric or magnetic fields. They differ only in frequency.',
  sol: 'Transverse; speed c; no medium; energy and momentum.',
  scheme: [['Any two properties', 1], ['Two more properties', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('maxwell-short2', short({
  marks: 2,
  stem: 'Show that 1/√(μ₀ε₀) works out to about 3 × 10⁸ m s⁻¹, and state the conclusion Maxwell drew from this value.',
  model: r`Multiplying the two constants, $\mu_0\varepsilon_0 = 4\pi \times 10^{-7} \times 8.85 \times 10^{-12} \approx 1.11 \times 10^{-17}$ s² m⁻², whose square root is about $3.34 \times 10^{-9}$ s m⁻¹, so $\dfrac{1}{\sqrt{\mu_0\varepsilon_0}} \approx 3.0 \times 10^{8}$ m s⁻¹. This equals the measured **speed of light**, although both constants come from experiments on charges and currents, so Maxwell concluded that **light is an electromagnetic wave**.`,
  sol: 'c ≈ 3.0 × 10⁸ m s⁻¹, the speed of light.',
  scheme: [['Calculation giving 3.0 × 10⁸ m s⁻¹', 1], ['Light is an electromagnetic wave', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(1 / Math.sqrt(MU0 * EPS0), 3e8, 0.002) || 'mx');
const sk = { E0: 15 };
sk.B0 = sk.E0 / C0;
add('sketch-short3', short({
  marks: 3,
  stem: 'A plane electromagnetic wave travels along the +z axis, and its electric field oscillates along the x axis. Sketch (describe in words) the wave over one wavelength, labelling E, B and the direction of travel; state the axis along which B oscillates; and find the peak magnetic field if the peak electric field is 15 V m⁻¹.',
  model: r`Sketch: along the z axis, a sine curve of $\vec E$ drawn in the x–z plane and a sine curve of $\vec B$ drawn in the y–z plane, with the same wavelength λ marked, both crossing zero and peaking at the same points (in phase); an arrow along +z labelled “direction of travel”.
$\vec B$ oscillates along the **y axis**, since the direction of travel is that of $\vec E \times \vec B$ and $\hat x \times \hat y = \hat z$.
$B_0 = \dfrac{E_0}{c} = \dfrac{15}{3.0 \times 10^{8}} = ${sci(sk.B0, 2)}$ T.`,
  sol: 'E along x, travel along z, so B along y; B₀ = E₀/c.',
  scheme: [['Sketch: E and B perpendicular sine curves, in phase, on the axis of travel', 1], ['B along y (from E × B along +z)', 1], ['B₀ = 5.0 × 10⁻⁸ T', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => same(cross([1, 0, 0], [0, 1, 0]), [0, 0, 1]) && near(sk.B0, 5e-8) || 'sk');
add('sustain-short3', short({
  marks: 3,
  stem: 'Explain how the laws of Faraday and Maxwell together allow an electromagnetic disturbance to travel through empty space, and why charges oscillating in a transmitting aerial send out such waves while a steady current in the same aerial does not.',
  model: 'By **Faraday’s law** a changing magnetic field produces an electric field; by **Maxwell’s** displacement-current idea a changing electric field produces a magnetic field. So once the fields start changing, each change regenerates the other and the linked pattern moves outward at c, needing no medium. Charges oscillating in an aerial are **accelerated**, so the fields round them keep changing and radiate as waves of the oscillation frequency. A steady current has unchanging fields, and charges in uniform motion do not radiate.',
  sol: 'Changing B makes E; changing E makes B; accelerated charges start it.',
  scheme: [['Changing B produces E (Faraday)', 1], ['Changing E produces B (Maxwell): mutual regeneration travels at c', 1], ['Accelerated charges radiate; steady current gives no changing fields', 1]],
  d: 3, c: 'understanding', t: [2], wl: [50, 90],
}));

// ================================================================ t03 the electromagnetic spectrum
add('order-mcq', mcq({
  stem: 'A hospital uses radio waves in its MRI scanner, infrared in a physiotherapy heat lamp, ultraviolet in an operating-theatre steriliser and X-rays in its radiography room. Arranged in order of increasing wavelength, these are',
  right: 'X-rays, ultraviolet, infrared, radio waves',
  wrong: ['radio waves, infrared, ultraviolet, X-rays', 'X-rays, infrared, ultraviolet, radio waves', 'ultraviolet, X-rays, radio waves, infrared'],
  sol: 'Wavelength increases from X-rays (about 1 pm to 1 nm) through ultraviolet (1–400 nm) and infrared (700 nm to 1 mm) to radio waves (longer than 30 cm) — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
const fob = { f: 433e6 };
fob.lam = C0 / fob.f;
add('fob-mcq', mcq({
  stem: 'The remote key of a car sends its unlock code at 433 MHz. The wavelength of this signal, and its band, are',
  right: 'about 69 cm, radio waves (UHF)',
  wrong: ['about 6.9 cm, microwaves', 'about 6.9 m, radio waves (short wave)', 'about 0.69 mm, infrared'],
  sol: r`$\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{433 \times 10^{6}} = ${dec(fob.lam, 2)}$ m, about 69 cm: longer than 30 cm, so radio waves in the UHF range — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(fob.lam, 0.6928, 0.001) && bandOf(fob.lam) === 'Radio' || 'fob');
add('baggage-mcq', mcq({
  stem: 'Airport security scanners pass X-rays through suitcases to form an image of their contents. X-rays suit this job because they',
  right: 'pass through cloth, leather and plastic but are absorbed much more by dense metal objects',
  wrong: ['are reflected strongly by cloth and plastic', 'make metal objects give out visible light of their own', 'bend round metal objects and so outline them'],
  sol: 'X-rays penetrate light, low-density materials easily but are strongly absorbed by dense materials such as metal, which therefore cast clear shadows on the detector — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('gammasource-mcq', mcq({
  stem: 'Sealed packs of surgical gloves are sterilised by gamma rays. These rays are emitted by',
  right: 'radioactive nuclei, such as those of cobalt-60',
  wrong: ['fast electrons striking a tungsten target', 'a magnetron', 'a mercury-vapour lamp'],
  sol: 'Gamma rays come from changes inside the nucleus, as when a radioactive cobalt-60 nucleus settles to a lower-energy state. Electrons hitting a target give X-rays, a magnetron gives microwaves, and a mercury lamp gives ultraviolet — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('uvnote-mcq', mcq({
  stem: 'A shopkeeper slides a ₹500 note under a small lamp in a dark box; hidden fibres and marks on a genuine note glow brightly. The lamp mainly emits',
  right: 'ultraviolet radiation',
  wrong: ['infrared radiation', 'microwaves', 'gamma rays'],
  sol: 'Security inks and fibres fluoresce: they absorb ultraviolet and give out visible light, so they glow under a UV lamp while forged paper usually does not — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('crystal-mcq', mcq({
  stem: 'Scientists use X-rays, rather than visible light, to work out how atoms are arranged inside a crystal of common salt. The main reason is that X-ray wavelengths are',
  right: 'comparable to the spacing of atoms (about 0.1 nm), so the atomic layers diffract them',
  wrong: ['far longer than the spacing of atoms, so they pass through without scattering', 'the same as those of gamma rays, which nuclei emit', 'able to travel faster than light inside the crystal'],
  sol: 'Diffraction is strong when the wavelength is similar to the spacing of the obstacles. Atoms in a crystal are about 0.1–0.3 nm apart, like X-ray wavelengths, while visible light (400–700 nm) is thousands of times too long — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('irthermo-mcq', mcq({
  stem: 'A nurse checks a child’s temperature with a thermometer gun held a few centimetres from the forehead, without touching it. The gun works by',
  right: 'detecting the infrared radiation given out by the warm skin',
  wrong: ['sending out ultraviolet and measuring the reflection', 'detecting microwaves given out by the blood', 'measuring the visible light reflected by the skin'],
  sol: 'Every warm body emits infrared; the gun focuses the skin’s infrared onto a thermopile or similar sensor, and more radiation means a higher temperature — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('fastgamma-tf', tf({
  stem: 'Gamma rays from a cobalt-60 source travel faster through a vacuum than the visible light from a candle flame, because gamma rays have a much higher frequency.',
  key: 'f',
  sol: 'False. Every electromagnetic wave travels at the same speed c = 3.0 × 10⁸ m s⁻¹ in vacuum; a higher frequency means a shorter wavelength, not a higher speed.',
  d: 2, c: 'understanding', t: [3],
}));
add('magnetron-fill', fill({
  stem: 'The vacuum valve that generates the 2.45 GHz waves inside a kitchen microwave oven is called a ___.',
  acc: [['magnetron']],
  sol: 'A **magnetron**: electrons circling in a magnetic field past resonant cavities produce intense microwaves.',
  d: 1, c: 'recall', t: [3],
}));
add('detector-match', match({
  stem: 'Match each radiation in Column A with a device in Column B that is used to detect it.',
  pairs: [
    ['Radio waves', 'An aerial joined to a tuned LC circuit'],
    ['Infrared', 'A thermopile or bolometer that warms up when the radiation falls on it'],
    ['Ultraviolet', 'A screen coated with a fluorescent material that glows'],
    ['Gamma rays', 'A Geiger–Müller counter'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Radio → aerial and tuned circuit (1 → r); infrared → thermopile or bolometer (2 → p); ultraviolet → fluorescent screen (3 → s); gamma rays → Geiger–Müller counter (4 → q).',
  d: 2, c: 'understanding', t: [3],
}));
add('jobs-match', match({
  stem: 'Match each job in Column A, seen in an Indian city, with the radiation in Column B that does it.',
  pairs: [
    ['A traffic police radar gun measures a car’s speed', 'Microwaves'],
    ['A municipal plant disinfects drinking water', 'Ultraviolet'],
    ['A dental clinic photographs a hidden tooth root', 'X-rays'],
    ['An internet provider carries data along glass fibres', 'Infrared'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Speed gun → microwaves (radar) (1 → s); water disinfection → ultraviolet (2 → q); dental image → X-rays (3 → p); fibre link → infrared, near 1550 nm (4 → r).',
  d: 2, c: 'understanding', t: [3],
}));
const th = { lam: 9.5e-6 };
th.f = C0 / th.lam;
add('thermal-num', num({
  stem: 'A thermal camera at an airport arrival hall picks up radiation from travellers’ skin, which is strongest near a wavelength of 9.5 μm. Find the frequency of this radiation, in terahertz (1 THz = 10¹² Hz), to 3 significant figures.',
  value: Number(dec(th.f / 1e12, 3)), tol: 0.2, unit: 'THz',
  sol: r`$f = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{9.5 \times 10^{-6}} = ${sci(th.f, 3)}$ Hz, i.e. $\dfrac{${sci(th.f, 3)}}{10^{12}} = ${dec(th.f / 1e12, 3)}$ THz, in the infrared.`,
  scheme: [['f = c/λ = 31.6 THz', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(th.f, 3.1579e13, 0.001) && bandOf(th.lam) === 'Infrared' && near(q.answer.value, 31.6) || 'th');
const uf = { lam: 365e-9 };
uf.f = C0 / uf.lam;
add('uvf-num', num({
  stem: 'A “black light” tube used to inspect banknotes emits ultraviolet of wavelength 365 nm. Find its frequency, in units of 10¹⁴ Hz (3 significant figures).',
  value: Number(dec(uf.f / 1e14, 3)), tol: 0.02, unit: '10¹⁴ Hz',
  sol: r`$f = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{365 \times 10^{-9}} = ${sci(uf.f, 3)}$ Hz, i.e. $\dfrac{${sci(uf.f, 3)}}{10^{14}} = ${dec(uf.f / 1e14, 3)}$ in units of $10^{14}$ Hz, just above the violet end of the visible band.`,
  scheme: [['f = c/λ = 8.22 × 10¹⁴ Hz', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(uf.f, 8.2192e14, 0.001) && bandOf(uf.lam) === 'Ultraviolet' && near(q.answer.value, 8.22) || 'uf');
const xr = { f: 6e18 };
xr.lam = C0 / xr.f;
add('xray-num', num({
  stem: 'A dental X-ray unit produces radiation of frequency 6.0 × 10¹⁸ Hz. Find its wavelength, in picometres (1 pm = 10⁻¹² m).',
  value: Number(dec(xr.lam * 1e12, 2)), tol: 0.5, unit: 'pm',
  sol: r`$\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{6.0 \times 10^{18}} = ${sci(xr.lam, 2)}$ m, i.e. $${sci(xr.lam, 2)} \times 10^{12} = ${dec(xr.lam * 1e12, 2)}$ pm (0.050 nm).`,
  scheme: [['λ = c/f = 50 pm', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(xr.lam, 5e-11) && bandOf(xr.lam) === 'X-rays' && q.answer.value === 50 || 'xr');
const gm = { f: 610e6 };
gm.lam = C0 / gm.f;
add('gmrt-num', num({
  stem: 'One of the observing bands of the Giant Metrewave Radio Telescope near Pune is centred on 610 MHz. Find the wavelength at this frequency, in metres (3 significant figures).',
  value: Number(dec(gm.lam, 3)), tol: 0.002, unit: 'm',
  sol: r`$\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{610 \times 10^{6}} = ${dec(gm.lam, 3)}$ m, about half a metre: radio waves, as the telescope’s name suggests.`,
  scheme: [['λ = c/f = 0.492 m', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(gm.lam, 0.4918, 0.001) && bandOf(gm.lam) === 'Radio' && q.answer.value === 0.492 || 'gm');
const dt = { f: 12e9 };
dt.lam = C0 / dt.f;
add('dth-num', num({
  stem: 'A rooftop DTH dish receives television signals from a satellite at 12 GHz. Find their wavelength, in centimetres.',
  value: Number(dec(dt.lam * 100, 2)), tol: 0.05, unit: 'cm',
  sol: r`$\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{12 \times 10^{9}} = ${dec(dt.lam, 2)}$ m, i.e. $${dec(dt.lam, 2)} \times 100 = ${dec(dt.lam * 100, 2)}$ cm: microwaves, which pass through the ionosphere to and from the satellite.`,
  scheme: [['λ = c/f = 2.5 cm', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(dt.lam, 0.025) && bandOf(dt.lam) === 'Microwave' && q.answer.value === 2.5 || 'dt');
const fb = { lam: 1550e-9 };
fb.f = C0 / fb.lam;
add('fibre-num', num({
  stem: 'Long-distance optical fibres carry internet data on infrared of wavelength 1550 nm. Find the frequency of this radiation, in terahertz (3 significant figures).',
  value: Number(dec(fb.f / 1e12, 3)), tol: 0.5, unit: 'THz',
  sol: r`$f = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{1550 \times 10^{-9}} = ${sci(fb.f, 3)}$ Hz, i.e. $\dfrac{${sci(fb.f, 3)}}{10^{12}} = ${dec(fb.f / 1e12, 3)}$ THz.`,
  scheme: [['f = c/λ ≈ 194 THz', 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(fb.f, 1.9355e14, 0.001) && bandOf(fb.lam) === 'Infrared' && q.answer.value === 194 || 'fb');
const rd = { t: 0.4e-3 };
rd.d = (C0 * rd.t) / 2;
add('radar-num', num({
  stem: 'A weather radar near Chennai sends out a microwave pulse, and the echo from a rain cloud returns 0.40 ms after the pulse leaves. How far away is the cloud, in kilometres?',
  value: Number(dec(rd.d / 1e3, 2)), tol: 0.5, unit: 'km',
  sol: r`The pulse goes out and back, so $d = \dfrac{ct}{2} = \dfrac{3.0 \times 10^{8} \times 0.40 \times 10^{-3}}{2} = ${sci(rd.d, 2)}$ m, i.e. $\dfrac{${sci(rd.d, 2)}}{10^{3}} = ${dec(rd.d / 1e3, 2)}$ km.`,
  scheme: [['Distance = ct/2 (round trip)', 1], ['d = 60 km', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(rd.d, 6e4) && q.answer.value === 60 || 'rd');
const hm = { lam1: 40, f2: 2.4e9 };
hm.f1 = C0 / hm.lam1;
hm.ratio = hm.f2 / hm.f1;
add('hamratio-num', num({
  stem: 'A radio amateur talks to distant stations on the 40 m short-wave band, and links two buildings with a 2.4 GHz microwave link. Find the frequency of the 40 m band, and hence how many times higher the link frequency is.',
  value: Number(dec(hm.ratio, 3)), tol: 1,
  sol: r`$f_1 = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{40} = ${sci(hm.f1, 2)}$ Hz (7.5 MHz). $\dfrac{f_2}{f_1} = \dfrac{2.4 \times 10^{9}}{${sci(hm.f1, 2)}} = ${dec(hm.ratio, 3)}$ times higher.`,
  scheme: [['f₁ = 7.5 MHz', 1], ['Ratio = 320', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(hm.ratio, 320) && q.answer.value === 320 || 'hm');
const dp = { f: 750e6 };
dp.lam = C0 / dp.f;
dp.half = dp.lam / 2;
add('dipole-num', num({
  stem: 'A simple TV aerial is a half-wave dipole: two rods whose total length is half a wavelength. How long should it be for a UHF channel at 750 MHz? Answer in centimetres.',
  value: Number(dec(dp.half * 100, 2)), tol: 0.5, unit: 'cm',
  sol: r`$\lambda = \dfrac{c}{f} = \dfrac{3.0 \times 10^{8}}{750 \times 10^{6}} = ${dec(dp.lam, 2)}$ m, so the dipole is $\dfrac{\lambda}{2} = ${dec(dp.half, 2)}$ m, i.e. $${dec(dp.half, 2)} \times 100 = ${dec(dp.half * 100, 2)}$ cm.`,
  scheme: [['λ = 0.40 m', 1], ['Length λ/2 = 20 cm', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(dp.half, 0.2) && q.answer.value === 20 || 'dp');
add('ozone-ar', ar({
  a: 'Almost none of the Sun’s short-wave ultraviolet (UV-C) reaches the ground.',
  r: 'UV-C has a shorter wavelength than visible light.',
  key: 'b',
  sol: 'Both are true, but R does not explain A: wavelength alone does not decide whether the atmosphere absorbs a radiation (it lets through visible light and also many far longer radio waves). UV-C is stopped because ozone and oxygen molecules high in the atmosphere absorb it strongly — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('bandorder-ar', ar({
  a: 'Microwaves have shorter wavelengths than infrared radiation.',
  r: 'Microwaves have lower frequencies than infrared radiation.',
  key: 'd',
  sol: 'R is true: microwaves (up to about 300 GHz) lie below infrared in frequency. A is false: since c = fλ is the same for both, the lower-frequency microwaves have the longer wavelengths (1 mm to 30 cm against 700 nm to 1 mm) — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('camcam-short2', short({
  marks: 2,
  stem: 'When a button on a TV remote is pressed, the LED at its tip looks dark to the eye, but on a phone camera’s screen it is seen flashing. Explain both observations.',
  model: 'The LED emits **infrared**, of wavelength just beyond 700 nm, to which the retina is **not sensitive**, so the eye sees nothing. The silicon sensor in the phone camera **is** sensitive to near infrared, so it records the flashes and the screen shows them as visible light.',
  sol: 'IR: invisible to the eye, detected by the camera sensor.',
  scheme: [['Remote emits infrared, beyond the eye’s range', 1], ['Camera sensor detects near infrared and displays it', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('xgnames-short2', short({
  marks: 2,
  stem: 'A radiation of wavelength 0.010 nm can be called an X-ray or a gamma ray. Evaluate whether the two names describe different radiations, and say on what basis the name is given.',
  model: 'At the same wavelength they are **identical** EM waves with the same frequency and properties; the X-ray and gamma-ray bands **overlap**. The name depends on the **origin**: X-rays come from fast electrons striking a target (electron processes), gamma rays from changes inside atomic **nuclei**.',
  sol: 'Same radiation; named by origin.',
  scheme: [['Same wavelength means physically identical radiation; the bands overlap', 1], ['Named by origin: electrons for X-rays, nuclei for gamma rays', 1]],
  d: 3, c: 'evaluation', t: [3],
}));
add('ovenplate-short2', short({
  marks: 2,
  stem: 'In a microwave oven, a bowl of dal becomes hot while the dry ceramic plate under it stays fairly cool at first. Explain this, naming the band of radiation used.',
  model: 'The oven uses **microwaves** (2.45 GHz). They are absorbed strongly by **water** molecules in the dal, whose energy rises, so the food heats up. Dry ceramic contains little water and absorbs little microwave energy, so the plate warms mainly by **conduction** from the hot food.',
  sol: 'Microwaves absorbed by water; dry ceramic absorbs little.',
  scheme: [['Microwaves absorbed by water in the food', 1], ['Dry ceramic absorbs little; warms only by conduction', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('thermalscreen-short2', short({
  marks: 2,
  stem: 'During an epidemic, airports screened passengers with thermal cameras. Explain how such a camera forms its picture without any lamp, and why a passenger with a fever shows up differently.',
  model: 'All warm bodies **emit infrared**; the camera focuses this onto an array of infrared sensors and shows the intensity as colours, so no lamp is needed. A hotter body emits **more infrared**, so a feverish face appears brighter (a different colour) than those of other passengers.',
  sol: 'Emitted IR; hotter emits more.',
  scheme: [['Camera detects infrared emitted by the body itself', 1], ['Hotter skin emits more infrared, so it appears brighter', 1]],
  d: 3, c: 'analysis', t: [3],
}));
const cl = { la: 3e-3, fb: 1.5e15, fc: 6e13 };
cl.fa = C0 / cl.la;
cl.lb = C0 / cl.fb;
cl.lc = C0 / cl.fc;
add('classify-short3', short({
  marks: 3,
  stem: 'Using c = fλ, name the band of each of these radiations, showing your working: (a) a wave of wavelength 3.0 mm from a car’s collision-warning radar, (b) radiation of frequency 1.5 × 10¹⁵ Hz from a sterilising lamp, (c) radiation of frequency 6.0 × 10¹³ Hz from a warm engine.',
  model: r`(a) $f = \dfrac{3.0 \times 10^{8}}{3.0 \times 10^{-3}} = ${sci(cl.fa, 2)}$ Hz (100 GHz); 3.0 mm lies between 1 mm and 30 cm: **microwaves**.
(b) $\lambda = \dfrac{3.0 \times 10^{8}}{1.5 \times 10^{15}} = ${sci(cl.lb, 2)}$ m (200 nm), shorter than 400 nm: **ultraviolet**.
(c) $\lambda = \dfrac{3.0 \times 10^{8}}{6.0 \times 10^{13}} = ${sci(cl.lc, 2)}$ m (5.0 μm), between 700 nm and 1 mm: **infrared**.`,
  sol: 'Convert with c = fλ and compare with the band ranges.',
  scheme: [['(a) 1.0 × 10¹¹ Hz, microwaves', 1], ['(b) 200 nm, ultraviolet', 1], ['(c) 5.0 μm, infrared', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => bandOf(cl.la) === 'Microwave' && bandOf(cl.lb) === 'Ultraviolet' && bandOf(cl.lc) === 'Infrared' && near(cl.lb, 2e-7) || 'cl');
add('ranges-short3', short({
  marks: 3,
  stem: 'For each of (i) microwaves, (ii) infrared and (iii) ultraviolet, give the approximate wavelength range, one way of producing the radiation and one way of detecting it.',
  model: '(i) **Microwaves:** about 1 mm to 30 cm; produced by a magnetron or klystron (or a Gunn diode); detected by a dish or horn with a crystal diode. (ii) **Infrared:** about 700 nm to 1 mm; produced by hot bodies or infrared LEDs; detected by a thermopile, bolometer or infrared photodiode. (iii) **Ultraviolet:** about 1 nm to 400 nm; produced by the Sun, mercury-vapour lamps or electric arcs; detected by photocells or fluorescent screens.',
  sol: 'Range, source and detector for each.',
  scheme: [['Microwaves: range, source, detector', 1], ['Infrared: range, source, detector', 1], ['Ultraviolet: range, source, detector', 1]],
  d: 2, c: 'understanding', t: [3], wl: [50, 90],
}));
add('xrayuse-short3', short({
  marks: 3,
  stem: 'Describe briefly how X-rays are produced in an X-ray tube. Explain why X-rays can show (i) a fractured bone in an arm, and (ii) the regular arrangement of atoms in a crystal, and why the radiographer stays behind a lead-lined wall.',
  model: 'In an evacuated tube, electrons from a hot filament are accelerated through tens of kilovolts and **strike a metal target** (such as tungsten); their sudden stopping produces X-rays. (i) X-rays pass easily through soft tissue but are **absorbed strongly by bone**, so the bone and its crack show as a shadow on the detector. (ii) Their wavelengths (about 0.1 nm) are **similar to the spacing of atoms**, so the atomic layers diffract them in a regular pattern. X-rays are **ionising**, so repeated exposure would harm the radiographer; lead absorbs them.',
  sol: 'Fast electrons hit a target; absorption by bone; diffraction by atoms; ionising.',
  scheme: [['Production: fast electrons striking a metal target', 1], ['Bone absorbs more than tissue; wavelength near atomic spacing', 1], ['Ionising, so shielding with lead', 1]],
  d: 3, c: 'analysis', t: [3], wl: [60, 100],
}));
add('uvlamp-short3', short({
  marks: 3,
  stem: 'A shop advertises a hand-held UV-C lamp “to disinfect your hands and face in seconds”. Evaluate this advertisement, explaining how ultraviolet kills germs and why sunlight at ground level contains almost no UV-C.',
  model: 'UV-C does **kill germs**: it is absorbed by their genetic material and damages it, which is why UV-C lamps sterilise water, air and empty rooms. But the same damage happens to **human skin and eyes**: UV-C can burn skin and cause painful eye injury, so shining it on hands and faces is **unsafe**, and the advertisement is misleading. It is suitable only for surfaces and water with people shielded. Sunlight at ground level has almost no UV-C because the **ozone layer** and oxygen high in the atmosphere absorb it.',
  sol: 'Kills germs, but harms skin and eyes; ozone absorbs solar UV-C.',
  scheme: [['UV-C damages the genetic material of germs', 1], ['Also harms skin and eyes: unsafe on people, so the claim is misleading', 1], ['Ozone absorbs solar UV-C', 1]],
  d: 3, c: 'evaluation', t: [3], wl: [60, 100],
}));

// ================================================================ 5-mark questions (in parts)
const dl = { r: 0.04, d: 1.5e-3, i: 0.15 };
dl.A = Math.PI * dl.r ** 2;
dl.C = (EPS0 * dl.A) / dl.d;
dl.dEdt = dl.i / (EPS0 * dl.A);
dl.dVdt = dl.dEdt * dl.d;
dl.id = EPS0 * dl.A * dl.dEdt;
add('disp-long', long({
  stem: '(a) A loop is drawn round one lead of a capacitor that is being charged. Using two surfaces bounded by this loop, explain why Ampère’s circuital law, ∮B · dl = μ₀i, needed to be modified. [2] (b) Write the expression for the displacement current and the modified (Ampère–Maxwell) law. [1] (c) A capacitor with circular plates of radius 4.0 cm, 1.5 mm apart in air, is charged by a constant current of 0.15 A. Find (i) the rate at which the electric field between the plates increases, (ii) the rate at which the p.d. across the plates increases, (iii) the displacement current in the gap. [2]',
  model: r`(a) For a flat surface bounded by the loop, the lead pierces it and the enclosed current is $i$. For a bag-shaped surface on the same loop that passes between the plates, no charge crosses it, so the enclosed current is zero. Ampère’s law would give two different values of $\oint \vec B \cdot d\vec l$ for one loop, so it was incomplete for changing currents.

(b) $i_d = \varepsilon_0\dfrac{d\Phi_E}{dt}$; $\oint \vec B \cdot d\vec l = \mu_0(i + i_d)$.

(c) $A = \pi(0.040)^2 = ${sci(dl.A, 3)}$ m².
(i) $i = \varepsilon_0A\dfrac{dE}{dt}$, so $\dfrac{dE}{dt} = \dfrac{0.15}{8.85 \times 10^{-12} \times ${sci(dl.A, 3)}} = ${sci(dl.dEdt, 3)}$ V m$^{-1}$ s$^{-1}$.
(ii) $\dfrac{dV}{dt} = d\,\dfrac{dE}{dt} = 1.5 \times 10^{-3} \times ${sci(dl.dEdt, 3)} = ${sci(dl.dVdt, 3)}$ V s$^{-1}$ (check: $C = \varepsilon_0A/d = ${sci(dl.C, 3)}$ F and $i/C$ gives the same).
(iii) $i_d = \varepsilon_0A\dfrac{dE}{dt} = 0.15$ A, equal to the charging current.`,
  sol: 'Two surfaces, two answers; i_d = ε₀ dΦE/dt; dE/dt = i/(ε₀A).',
  scheme: [['Flat surface encloses i', 1], ['Surface through the gap encloses none: inconsistency', 1], ['i_d = ε₀ dΦE/dt and the Ampère–Maxwell law', 1], ['dE/dt ≈ 3.37 × 10¹² V m⁻¹ s⁻¹; dV/dt ≈ 5.06 × 10⁹ V s⁻¹', 1], ['i_d = 0.15 A', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(dl.dEdt, 3.3719e12, 0.001) && near(dl.dVdt, 5.0578e9, 0.001) && near(dl.i / dl.C, dl.dVdt) && near(dl.id, 0.15) || `dl ${dl.dEdt}`);
const wl5 = { lam: 532e-9, E0: 600 };
wl5.f = C0 / wl5.lam;
wl5.T = 1 / wl5.f;
wl5.B0 = wl5.E0 / C0;
add('wave-long', long({
  stem: '(a) An electromagnetic wave travels along the +y axis; at a certain point and instant its electric field points along +z. Draw (describe in words) a labelled sketch of the wave and state the direction of its magnetic field at that point and instant. [2] (b) Write the expression for the speed of EM waves in vacuum in terms of μ₀ and ε₀, and the relation between the peak fields. [1] (c) A green laser pointer emits light of wavelength 532 nm with a peak electric field of 600 V m⁻¹. Find the frequency, the period of oscillation and the peak magnetic field. [2]',
  model: r`(a) Sketch: along the y axis, a sine curve for $\vec E$ in the y–z plane and one for $\vec B$ in the x–y plane, with the same wavelength, peaking and crossing zero together (in phase); E, B, λ and the direction of travel (+y) labelled. Since the direction of travel is that of $\vec E \times \vec B$ and $\hat z \times \hat x = \hat y$, the magnetic field points along **+x**.

(b) $c = \dfrac{1}{\sqrt{\mu_0\varepsilon_0}} = 3.0 \times 10^{8}$ m s⁻¹; $\dfrac{E_0}{B_0} = c$.

(c) $f = \dfrac{c}{\lambda} = \dfrac{3.0 \times 10^{8}}{532 \times 10^{-9}} = ${sci(wl5.f, 3)}$ Hz; $T = \dfrac{1}{f} = ${sci(wl5.T, 3)}$ s; $B_0 = \dfrac{E_0}{c} = \dfrac{600}{3.0 \times 10^{8}} = ${sci(wl5.B0, 2)}$ T.`,
  sol: 'E × B along the travel; c = 1/√(μ₀ε₀); f = c/λ; B₀ = E₀/c.',
  scheme: [['Sketch: perpendicular E and B curves, in phase, on the axis of travel', 1], ['B along +x', 1], ['c = 1/√(μ₀ε₀); E₀ = cB₀', 1], ['f ≈ 5.64 × 10¹⁴ Hz; T ≈ 1.77 × 10⁻¹⁵ s', 1], ['B₀ = 2.0 × 10⁻⁶ T', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => same(cross([0, 0, 1], [1, 0, 0]), [0, 1, 0]) && near(wl5.f, 5.6391e14, 0.001) && near(wl5.T, 1.7733e-15, 0.001) && near(wl5.B0, 2e-6) || 'wl5');
const ph = { fm: 98.3e6, wifi: 5e9, ir: 850e-9 };
ph.lfm = C0 / ph.fm;
ph.lwifi = C0 / ph.wifi;
ph.fir = C0 / ph.ir;
add('phone-long', long({
  stem: 'A smartphone handles several kinds of electromagnetic wave: an FM radio station at 98.3 MHz, a Wi-Fi network at 5.0 GHz, an infrared proximity sensor working at 850 nm, and visible light through its camera. (a) Find the wavelengths of the FM and Wi-Fi signals and the frequency of the infrared. [2] (b) Name the band of each of the four and arrange them in order of increasing frequency. [1] (c) Name a detector used for infrared and one for visible light. [1] (d) Why does the phone’s camera show the infrared sensor glowing when the eye sees nothing? [1]',
  model: r`(a) FM: $\lambda = \dfrac{3.0 \times 10^{8}}{98.3 \times 10^{6}} = ${dec(ph.lfm, 3)}$ m. Wi-Fi: $\lambda = \dfrac{3.0 \times 10^{8}}{5.0 \times 10^{9}} = ${dec(ph.lwifi, 2)}$ m (6.0 cm). Infrared: $f = \dfrac{3.0 \times 10^{8}}{850 \times 10^{-9}} = ${sci(ph.fir, 3)}$ Hz.

(b) FM: radio waves; Wi-Fi: microwaves; 850 nm: infrared; camera: visible. Increasing frequency: FM radio, Wi-Fi microwaves, infrared, visible light.

(c) Infrared: a photodiode (or thermopile); visible light: the camera’s image sensor (or the eye, a photocell).

(d) The silicon camera sensor responds to near infrared just beyond 700 nm, but the retina does not, so the sensor records the 850 nm light and the screen displays it as visible light.`,
  sol: 'c = fλ for each; order radio, microwave, IR, visible.',
  scheme: [['FM λ ≈ 3.05 m; Wi-Fi λ = 0.060 m', 1], ['IR f ≈ 3.53 × 10¹⁴ Hz', 1], ['Bands named and ordered', 1], ['Detectors for IR and visible', 1], ['Camera sensor responds to near IR; eye does not', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(ph.lfm, 3.0519, 0.001) && near(ph.fir, 3.5294e14, 0.001) && bandOf(ph.lfm) === 'Radio' && bandOf(ph.lwifi) === 'Microwave' && bandOf(ph.ir) === 'Infrared' || 'ph');
const rl = { f: 5.6e9, t1: 120e-6, t2: 100e-6, gap: 10, E0: 1.5 };
rl.lam = C0 / rl.f;
rl.d1 = (C0 * rl.t1) / 2;
rl.d2 = (C0 * rl.t2) / 2;
rl.v = (rl.d1 - rl.d2) / rl.gap;
rl.B0 = rl.E0 / C0;
add('radar-long', long({
  stem: 'An airport surveillance radar works at 5.6 GHz. (a) Give two reasons why microwaves, rather than medium-wave radio, are used for radar. [1] (b) Find the wavelength of the radar waves. [1] (c) The echo from an approaching aircraft returns 120 μs after a pulse is sent; 10 s later the echo time is 100 μs. Find the two distances and the average speed of the aircraft towards the radar. [2] (d) At the aircraft, the peak electric field of the radar wave is 1.5 V m⁻¹. Find the peak magnetic field there. [1]',
  model: r`(a) Microwaves have short wavelengths, so a dish of modest size forms a **narrow beam** that can locate targets precisely, and small objects reflect them well; they also pass through cloud and through the ionosphere rather than being reflected by it.

(b) $\lambda = \dfrac{3.0 \times 10^{8}}{5.6 \times 10^{9}} = ${dec(rl.lam, 3)}$ m (about 5.4 cm).

(c) $d = \dfrac{ct}{2}$: $d_1 = \dfrac{3.0 \times 10^{8} \times 120 \times 10^{-6}}{2} = ${sci(rl.d1, 2)}$ m (18 km); $d_2 = \dfrac{3.0 \times 10^{8} \times 100 \times 10^{-6}}{2} = ${sci(rl.d2, 2)}$ m (15 km). Speed $= \dfrac{18\,000 - 15\,000}{10} = ${dec(rl.v, 3)}$ m s$^{-1}$.

(d) $B_0 = \dfrac{E_0}{c} = \dfrac{1.5}{3.0 \times 10^{8}} = ${sci(rl.B0, 2)}$ T.`,
  sol: 'Narrow beams; λ = c/f; d = ct/2; B₀ = E₀/c.',
  scheme: [['Short wavelength: narrow beam, good reflection (and passes cloud)', 1], ['λ ≈ 0.0536 m', 1], ['18 km and 15 km from d = ct/2', 1], ['Speed 300 m s⁻¹', 1], ['B₀ = 5.0 × 10⁻⁹ T', 1]],
  d: 4, c: 'application', t: [2, 3], wl: null,
}), () => near(rl.lam, 0.053571, 0.001) && near(rl.d1, 18000) && near(rl.d2, 15000) && near(rl.v, 300) && near(rl.B0, 5e-9) && bandOf(rl.lam) === 'Microwave' || 'rl');
const iu = { uv: 380e-9, ir: 10e-6 };
iu.fuv = C0 / iu.uv;
iu.fir = C0 / iu.ir;
iu.ratio = iu.fuv / iu.fir;
add('irUV-long', long({
  stem: 'Infrared and ultraviolet lie on either side of the visible band. (a) Give one source and one detector of each. [2] (b) A non-contact thermometer gun is pointed at a patient’s forehead. Which of the two radiations does it use, and why does its reading depend on skin temperature? [1] (c) Hidden marks on a banknote glow under a “black light”. Name the radiation and explain the glow. [1] (d) Find the frequencies of ultraviolet of wavelength 380 nm and infrared of wavelength 10 μm, and the ratio of the first to the second. [1]',
  model: r`(a) Infrared: source, any hot or warm body (heater, the Sun, an IR LED); detector, a thermopile, bolometer or IR photodiode. Ultraviolet: source, the Sun, a mercury-vapour lamp or a welding arc; detector, a photocell or a fluorescent screen.

(b) Infrared: every warm body emits infrared, and a hotter body emits more of it, so the sensor’s signal rises with skin temperature.

(c) Ultraviolet: the security ink is fluorescent, absorbing the invisible ultraviolet and re-emitting visible light, so the marks glow.

(d) $f_{UV} = \dfrac{3.0 \times 10^{8}}{380 \times 10^{-9}} = ${sci(iu.fuv, 3)}$ Hz; $f_{IR} = \dfrac{3.0 \times 10^{8}}{10 \times 10^{-6}} = ${sci(iu.fir, 2)}$ Hz; ratio $= \dfrac{${sci(iu.fuv, 3)}}{${sci(iu.fir, 2)}} \approx ${dec(iu.ratio, 3)}$.`,
  sol: 'Sources and detectors; IR thermometry; UV fluorescence; f = c/λ.',
  scheme: [['IR source and detector', 1], ['UV source and detector', 1], ['Thermometer: infrared, more emitted when hotter', 1], ['Banknote: UV absorbed, visible light emitted (fluorescence)', 1], ['7.89 × 10¹⁴ Hz, 3.0 × 10¹³ Hz, ratio ≈ 26.3', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(iu.fuv, 7.8947e14, 0.001) && near(iu.fir, 3e13) && near(iu.ratio, 26.3, 0.002) && bandOf(iu.uv) === 'Ultraviolet' && bandOf(iu.ir) === 'Infrared' || 'iu');
