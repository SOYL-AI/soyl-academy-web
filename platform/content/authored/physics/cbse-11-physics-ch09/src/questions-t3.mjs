// ch09 question bank, part 2: t03 (viscosity, Stokes' law, terminal velocity, Reynolds number). g = 9.8 m s⁻² where used.
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, RHO, root, settleSpeed } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));

add('visc-mcq', mcq({
  stem: 'Which statement about how the coefficient of viscosity η changes with temperature is correct?',
  right: 'η of a liquid decreases and η of a gas increases as the temperature rises',
  wrong: ['η decreases with temperature for both liquids and gases', 'η increases with temperature for both liquids and gases', 'η of a liquid increases and η of a gas decreases as the temperature rises'],
  sol: 'A hot liquid flows more easily (honey when warm) because its molecules escape each other’s attraction more readily; a hot gas has faster molecules that carry more momentum between layers, so its viscosity rises — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('stokes-mcq', mcq({
  stem: 'Two steel balls, of radii r and 3r, are released in a tall jar of the same oil and each reaches its terminal speed. Neglecting the density of the oil compared with steel, the ratio of the terminal speed of the larger ball to that of the smaller one is',
  right: '9 : 1',
  wrong: ['3 : 1', '27 : 1', '1 : 3'],
  sol: 'v_t = 2r²(ρ − σ)g/9η is proportional to r² for the same materials, so the ratio is 3² : 1 = 9 : 1 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('rey-mcq', mcq({
  stem: 'Oil flows through a narrow pipe in a hydraulic system and the Reynolds number for the flow is worked out to be about 400. The flow is most likely to be',
  right: 'laminar (streamline)',
  wrong: ['turbulent', 'unstable, switching between laminar and turbulent', 'neither, since the Reynolds number applies only to gases'],
  sol: 'Flow in a pipe is laminar for Reynolds numbers below about 1000 and turbulent above about 2000; 400 is well below 1000 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('term-mcq', mcq({
  stem: 'A steel ball falls through a tall jar of oil and has reached its terminal speed. Which statement is correct?',
  right: 'The net force on the ball is zero',
  wrong: ['The viscous drag is equal to the weight alone', 'The speed of the ball is still increasing slowly', 'The upthrust of the oil on the ball is zero'],
  sol: 'At terminal speed the acceleration is zero, so weight = upthrust + drag. The drag alone is smaller than the weight because the upthrust also acts — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('term-ar', ar({
  a: 'A steel ball dropped into a tall jar of glycerine falls with a constant speed after a short time.',
  r: 'At that speed the upward viscous drag and upthrust together balance the weight of the ball.',
  key: 'a',
  sol: 'Both true, and R explains A: with the net force zero, the velocity cannot change — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('stokes-tf', tf({
  stem: 'Stokes’ law, F = 6πηrv, can be applied without any correction to a large, heavy iron ball falling quickly through water.',
  key: 'f',
  sol: 'False. Stokes’ law holds for small spheres at low speed, where the flow is smooth (low Reynolds number); for a large ball falling quickly the flow becomes turbulent and the drag is not 6πηrv.',
  d: 2, c: 'understanding', t: [3],
}));
add('eta-fill', fill({
  stem: 'The SI unit of the coefficient of viscosity, obtained from F = ηA v/d, is the ___ (symbol Pa s).',
  acc: [['pascal second', 'pascal-second', 'pascal second (Pa s)']],
  sol: 'η = F d/(A v) has units N m⁻² s = **pascal second**.',
  d: 1, c: 'recall', t: [3],
}));
const sh = { d: 0.5e-3, A: 0.020, v: 0.30, eta: 0.50 };
sh.F = (sh.eta * sh.A * sh.v) / sh.d;
add('shear-num', num({
  stem: 'A thin film of oil, 0.50 mm thick, lies between a fixed bench top and a metal block of base area 0.020 m² in a workshop. The block is pulled along at a steady 0.30 m s⁻¹. The oil has η = 0.50 Pa s. Find the force needed to move the block, in N.',
  value: sh.F, tol: 0.05, unit: 'N',
  sol: r`Velocity gradient $= \dfrac{v}{d} = \dfrac{0.30}{0.50 \times 10^{-3}} = ${sh.v / sh.d}$ s$^{-1}$. $F = \eta A \dfrac{v}{d} = 0.50 \times 0.020 \times ${sh.v / sh.d} = ${sh.F}$ N.`,
  scheme: [[`v/d = 0.30/(0.50 × 10⁻³) = ${sh.v / sh.d} s⁻¹`, 1], [`F = ηA(v/d) = ${sh.F} N`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(0.5 * 0.02 * 0.3 / 0.0005, q.answer.value, 1e-9) || 'sh');
const bd = { r: 0.5e-4, rs: 2500, sg: RHO, eta: 1.0e-3 };
bd.vt = (2 * bd.r ** 2 * (bd.rs - bd.sg) * g) / (9 * bd.eta);
bd.Re = (bd.sg * bd.vt * 2 * bd.r) / bd.eta;
add('bead-num', num({
  stem: 'A fine glass bead of radius 0.050 mm and density 2500 kg m⁻³ sinks through still water in a beaker (water: density 1000 kg m⁻³, viscosity 1.0 × 10⁻³ Pa s). Take g = 9.8 m s⁻². Find its terminal speed, in mm s⁻¹ (3 significant figures).',
  value: v3(bd.vt * 1000), tol: 0.05, unit: 'mm s⁻¹',
  sol: r`$v_t = \dfrac{2r^2(\rho - \sigma)g}{9\eta} = \dfrac{2 \times (5.0 \times 10^{-5})^2 \times 1500 \times 9.8}{9 \times 1.0 \times 10^{-3}} = ${dec(bd.vt * 1000, 3)} \times 10^{-3}$ m s$^{-1}$ $= ${dec(bd.vt * 1000, 3)}$ mm s$^{-1}$. (Reynolds number $\approx ${dec(bd.Re, 2)} < 1$, so Stokes’ law is valid.)`,
  scheme: [['v_t = 2r²(ρ − σ)g/(9η) with ρ − σ = 1500 kg m⁻³', 1], [`v_t = ${dec(bd.vt * 1000, 3)} mm s⁻¹`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(settleSpeed(bd.r, bd.rs, bd.sg, bd.eta) * 1000, q.answer.value, 3e-3) || 'bd');
const rd = { r: 1.0e-4, rs: 1000, sg: 1.2, eta: 1.8e-5 };
rd.vt = (2 * rd.r ** 2 * (rd.rs - rd.sg) * g) / (9 * rd.eta);
add('rain-num', num({
  stem: 'A drizzle drop of radius 0.10 mm (density 1000 kg m⁻³) falls through still air over a Shillong hill station at its terminal speed. For air take density 1.2 kg m⁻³ and viscosity 1.8 × 10⁻⁵ Pa s; g = 9.8 m s⁻². Find the terminal speed, in m s⁻¹ (3 significant figures).',
  value: v3(rd.vt), tol: 0.01, unit: 'm s⁻¹',
  sol: r`$v_t = \dfrac{2r^2(\rho - \sigma)g}{9\eta} = \dfrac{2 \times (1.0 \times 10^{-4})^2 \times (1000 - 1.2) \times 9.8}{9 \times 1.8 \times 10^{-5}} = ${dec(rd.vt, 3)}$ m s$^{-1}$.`,
  scheme: [['ρ − σ = 1000 − 1.2 = 998.8 kg m⁻³', 1], [`v_t = 2r²(ρ − σ)g/(9η) = ${dec(rd.vt, 3)} m s⁻¹`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(settleSpeed(rd.r, rd.rs, rd.sg, rd.eta), q.answer.value, 3e-3) || 'rd');
const ev = { r: 2.0e-3, rs: 7800, sg: 1260, v: 0.041 };
ev.eta = (2 * ev.r ** 2 * (ev.rs - ev.sg) * g) / (9 * ev.v);
add('etav-num', num({
  stem: 'To find the viscosity of a sample of glycerine at a laboratory in Roorkee, a steel ball of radius 2.0 mm (density 7800 kg m⁻³) is dropped into a tall jar of it (density 1260 kg m⁻³). It settles at a terminal speed of 4.1 cm s⁻¹. Take g = 9.8 m s⁻². Find the viscosity of the glycerine, in Pa s.',
  value: v3(ev.eta), tol: 0.02, unit: 'Pa s',
  sol: r`From $v_t = \dfrac{2r^2(\rho - \sigma)g}{9\eta}$: $\eta = \dfrac{2r^2(\rho - \sigma)g}{9 v_t} = \dfrac{2 \times (2.0 \times 10^{-3})^2 \times ${ev.rs - ev.sg} \times 9.8}{9 \times 0.041} = ${dec(ev.eta, 3)}$ Pa s.`,
  scheme: [['η = 2r²(ρ − σ)g/(9v_t)', 1], [`η = ${dec(ev.eta, 3)} Pa s`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(root((eta) => settleSpeed(ev.r, ev.rs, ev.sg, eta) - ev.v, 0.1, 10), q.answer.value, 3e-3) || 'ev');
const dg = { r: 2.0e-3, v: 0.10, eta: 1.4 };
dg.F = 6 * Math.PI * dg.eta * dg.r * dg.v;
add('drag-num', num({
  stem: 'A small sphere of radius 2.0 mm moves at 0.10 m s⁻¹ through glycerine of viscosity 1.4 Pa s. Using Stokes’ law, find the viscous drag on it, in mN (3 significant figures).',
  value: v3(dg.F * 1000), tol: 0.02, unit: 'mN',
  sol: r`$F = 6\pi\eta r v = 6\pi \times 1.4 \times 2.0 \times 10^{-3} \times 0.10 = ${dec(dg.F * 1000, 3)} \times 10^{-3}$ N $= ${dec(dg.F * 1000, 3)}$ mN.`,
  scheme: [[`F = 6πηrv = ${dec(dg.F * 1000, 3)} mN`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => near(6 * Math.PI * 1.4 * 0.002 * 0.1 * 1000, q.answer.value, 3e-3) || 'dg');
add('visc-short', short({
  marks: 2,
  stem: 'What is meant by the viscosity of a fluid? How does the viscosity of water change when it is heated?',
  model: 'Viscosity is the **internal friction** of a fluid: when layers of the fluid move with different speeds, they exert drag forces on each other, opposing the relative motion. The viscosity of water (a liquid) **decreases** when it is heated, so hot water flows more easily.',
  sol: 'Internal friction between layers; liquids thin when heated.',
  scheme: [['Internal friction opposing relative motion of layers', 1], ['Viscosity of a liquid decreases with temperature', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('terminal-short', short({
  marks: 2,
  stem: 'Why does a raindrop falling through the air reach a constant speed instead of speeding up all the way down?',
  model: 'The viscous drag on the drop increases as its speed increases. After a short time the drag (with the small upthrust) equals the weight, so the **net force is zero** and the drop falls with a constant **terminal velocity**.',
  sol: 'Drag grows with speed until it balances the weight.',
  scheme: [['Drag increases with speed', 1], ['Drag + upthrust = weight, net force zero, constant terminal speed', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('stokes-short', short({
  marks: 3,
  stem: 'State Stokes’ law. By balancing the forces on a sphere falling through a fluid, show that its terminal speed is proportional to the square of its radius.',
  model: r`**Stokes’ law:** the viscous drag on a small sphere of radius $r$ moving at speed $v$ in a fluid of viscosity $\eta$ is $F = 6\pi\eta r v$. A sphere falling through the fluid is acted on by its weight downward and by the upthrust and the drag upward. At terminal speed these balance: weight = upthrust + drag, so $\tfrac{4}{3}\pi r^3(\rho - \sigma)g = 6\pi\eta r v_t$, giving $v_t = \dfrac{2r^2(\rho - \sigma)g}{9\eta}$. For the same materials, $v_t \propto r^2$.`,
  sol: 'Statement; force balance; v_t ∝ r².',
  scheme: [['F = 6πηrv', 1], ['(4/3)πr³(ρ − σ)g = 6πηrv_t', 1], ['v_t = 2r²(ρ − σ)g/9η ∝ r²', 1]],
  d: 3, c: 'application', t: [3],
}));
add('re-short', short({
  marks: 3,
  stem: 'Define the Reynolds number for flow in a pipe. What do values of about 500 and about 5000 tell you about the flow, and why is Bernoulli’s equation unreliable for the second?',
  model: r`The Reynolds number is $Re = \dfrac{\rho v d}{\eta}$, where $d$ is the pipe diameter. At about 500 (below roughly 1000) the flow is **laminar**: smooth layers. At about 5000 (above roughly 2000) it is **turbulent**: irregular and swirling. In turbulent flow energy is lost to viscous dissipation, so $P + \tfrac{1}{2}\rho v^2 + \rho g h$ does not stay constant.`,
  sol: 'Definition; 500 laminar, 5000 turbulent; energy loss.',
  scheme: [['Re = ρ v d / η', 1], ['About 500 laminar; about 5000 turbulent', 1], ['Turbulence dissipates energy, so Bernoulli’s equation fails', 1]],
  d: 3, c: 'understanding', t: [3],
}));
void sci;
