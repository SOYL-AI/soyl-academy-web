// ch13 Chemical Equilibrium — SVGs with computed geometry: liquid-vapour equilibrium with rates, approach to equilibrium from both sides,
// response to disturbances, catalyst energy profile, Haber yield against pressure.
import { svgDoc, S } from './lib.mjs';
import { KIN, KC_KIN, eqKin, stepKin, haberY } from './data.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const path = (f, a, b, n, X, Y) => 'M' + Array.from({ length: n + 1 }, (_, i) => { const t = a + ((b - a) * i) / n; return `${X(t).toFixed(1)} ${Y(f(t)).toFixed(1)}`; }).join(' L');

// 1. Sealed flask with liquid and vapour; evaporation and condensation rates.
export const PHYS = (() => {
  const fx = 20, fy = 30, fw = 170, fh = 140, surf = 124;
  let seed = 13;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
  const pts = [];
  let guard = 0;
  while (pts.length < 11 && guard++ < 2000) {
    const x = 78 + rnd() * 64, y = 44 + rnd() * 62;
    if (pts.every(([a, b]) => Math.hypot(a - x, b - y) > 15)) pts.push([x, y]);
  }
  chk(pts.length === 11, 'phys: 11 vapour molecules placed without overlap');
  chk(pts.every(([x, y]) => x > fx + 50 && x < fx + fw - 40 && y > fy + 10 && y < surf - 12), 'phys: molecules lie in the vapour region between the arrows');
  const ox = 262, oy = 150, w = 140, h = 100, re = 1.0, tau = 3, Tm = 12;
  const X = (t) => ox + (t / Tm) * w;
  const Y = (v) => oy - v * h * 0.85;
  const cond = (t) => re * (1 - Math.exp(-t / tau));
  chk(Math.abs(cond(Tm) - re) < 0.02, 'phys: condensation rate has reached the evaporation rate by t = 12');
  chk(cond(0) === 0 && cond(3) < re, 'phys: condensation starts at zero and rises');
  return svgDoc(420, 210, 'Left: a sealed flask holding a liquid and its vapour, with equal arrows for evaporation and condensation at equilibrium. Right: the rate of evaporation stays constant while the rate of condensation rises from zero until the two rates are equal, which is the dynamic equilibrium.', [
    S.rect(fx, fy, fw, fh, { rx: 6, sw: 2 }),
    S.rect(fx + 1, surf, fw - 2, fy + fh - surf - 1, { fill: 'var(--diagram-blue)', fop: 0.3, c: 'var(--diagram-blue)', sw: 1 }),
    ...pts.map(([x, y]) => S.circle(x, y, 4, { fill: 'var(--diagram-blue)', c: 'var(--diagram-blue)', sw: 1 })),
    S.arrow(fx + 28, surf - 4, fx + 28, 62, { c: 'var(--diagram-red)', w: 3, size: 9 }),
    S.arrow(fx + fw - 28, 62, fx + fw - 28, surf - 4, { c: 'var(--diagram-green)', w: 3, size: 9 }),
    lab(fx + 28, fy + fh + 18, 'evaporation', { a: 'middle', c: 'var(--diagram-red)', w: 'bold', size: 10 }),
    lab(fx + fw - 28, fy + fh + 18, 'condensation', { a: 'middle', c: 'var(--diagram-green)', w: 'bold', size: 10 }),
    lab(fx + fw / 2, 148, 'liquid', { a: 'middle', size: 11 }),
    lab(fx + fw / 2, 22, 'closed vessel, constant temperature', { a: 'middle', size: 10 }),
    S.arrow(ox, oy, ox + w + 12, oy, { size: 6 }),
    S.arrow(ox, oy, ox, 36, { size: 6 }),
    lab(ox + w / 2, oy + 30, 'time', { a: 'middle', size: 10 }),
    lab(ox - 6, 30, 'rate', { a: 'end', size: 10 }),
    S.line(ox, Y(re), ox + w, Y(re), { c: 'var(--diagram-red)', w: 2.5 }),
    S.path(path(cond, 0, Tm, 48, X, Y), { c: 'var(--diagram-green)', w: 2.5 }),
    lab(ox + 4, Y(re) - 6, 'evaporation', { c: 'var(--diagram-red)', w: 'bold', size: 10 }),
    lab(X(4.2), Y(0.32), 'condensation', { c: 'var(--diagram-green)', w: 'bold', size: 10 }),
    S.line(X(8), oy, X(8), oy + 5),
    lab(X(8), oy + 17, 'equilibrium', { a: 'middle', size: 10 }),
    S.line(X(8), Y(re), X(8), oy, { c: 'var(--diagram-muted)', w: 1, dash: '2 3' }),
  ].join(''));
})();

// 2. N2O4 <=> 2NO2 approached from pure N2O4 and from pure NO2 (same total nitrogen), kinetic model.
export const BOTH = (() => {
  const a = 1.0;
  const eq = eqKin(a);
  chk(Math.abs(eq.y * eq.y / eq.A - KC_KIN) < 1e-9, `both: [NO2]²/[N2O4] = ${KC_KIN} at ${eq.y.toFixed(3)} and ${eq.A.toFixed(3)}`);
  const T = 10;
  const run = (s0) => (t) => stepKin(s0, t, 0.02);
  const fromA = run([a, 0]);
  const fromY = run([0, 2 * a]);
  const endA = fromA(T), endY = fromY(T);
  chk(Math.abs(endA[0] - eq.A) < 0.01 && Math.abs(endY[0] - eq.A) < 0.01, 'both: both starts level off at the same [N2O4]');
  chk(Math.abs(endA[1] - eq.y) < 0.01 && Math.abs(endY[1] - eq.y) < 0.01, 'both: both starts level off at the same [NO2]');
  const ox = 48, oy = 190, w = 330, h = 150, ymax = 2.0;
  const X = (t) => ox + (t / T) * w;
  const Y = (c) => oy - (c / ymax) * h;
  const cache = (f) => { const m = new Map(); return (t) => { const k = Math.round(t * 1000); if (!m.has(k)) m.set(k, f(t)); return m.get(k); }; };
  const cA = cache(fromA), cY = cache(fromY);
  return svgDoc(420, 250, 'Concentration against time for N2O4 and NO2. Starting from pure N2O4 (solid curves) or from pure NO2 with the same total nitrogen (dashed curves), the concentrations change in opposite directions and level off at the same equilibrium values, 0.70 for N2O4 and 0.59 for NO2.', [
    S.arrow(ox, oy, ox + w + 14, oy, { size: 6 }),
    S.arrow(ox, oy, ox, 22, { size: 6 }),
    lab(ox + w / 2, oy + 34, 'time (arbitrary units)', { a: 'middle', size: 10 }),
    lab(8, 16, 'concentration / mol L⁻¹', { size: 10 }),
    ...[0, 0.5, 1, 1.5, 2].map((v) => lab(ox - 6, Y(v) + 4, String(v), { a: 'end', size: 10 })),
    S.line(ox, Y(eq.A), ox + w, Y(eq.A), { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    S.line(ox, Y(eq.y), ox + w, Y(eq.y), { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
    S.path(path((t) => cA(t)[0], 0, T, 50, X, Y), { c: 'var(--diagram-red)', w: 2.5 }),
    S.path(path((t) => cA(t)[1], 0, T, 50, X, Y), { c: 'var(--diagram-blue)', w: 2.5 }),
    S.path(path((t) => cY(t)[0], 0, T, 50, X, Y), { c: 'var(--diagram-red)', w: 2.5, dash: '6 4' }),
    S.path(path((t) => cY(t)[1], 0, T, 50, X, Y), { c: 'var(--diagram-blue)', w: 2.5, dash: '6 4' }),
    lab(ox + w + 2, Y(eq.A) - 4, 'N₂O₄', { a: 'end', c: 'var(--diagram-red)', w: 'bold', size: 11 }),
    lab(ox + w + 2, Y(eq.y) + 14, 'NO₂', { a: 'end', c: 'var(--diagram-blue)', w: 'bold', size: 11 }),
    lab(X(3.2), Y(0.2), 'solid: start with N₂O₄ only', { size: 10 }),
    lab(X(2.2), Y(1.95), 'dashed: start with NO₂ only', { size: 10 }),
    S.line(X(7.5), oy, X(7.5), oy + 5),
    lab(X(7.5), oy + 17, 'equilibrium', { a: 'middle', size: 10 }),
  ].join(''));
})();

// 3. Response of N2O4 <=> 2NO2 to added N2O4 and to compression.
export const STRESS = (() => {
  const eq = eqKin(1.0);
  const t1 = 4, t2 = 12, T = 20;
  const s1 = [eq.A + 0.5, eq.y];
  const mid = (t) => stepKin(s1, t - t1, 0.02);
  const atT2 = mid(t2);
  const s2 = [atT2[0] * 2, atT2[1] * 2];
  const end = (t) => stepKin(s2, t - t2, 0.02);
  const fin = end(T);
  const Q = (s) => (s[1] * s[1]) / s[0];
  chk(Math.abs(Q(atT2) - KC_KIN) / KC_KIN < 0.01 && Math.abs(Q(fin) - KC_KIN) / KC_KIN < 0.01, 'stress: Q returns to Kc after each disturbance');
  chk(Q(s1) < KC_KIN && Q(s2) > KC_KIN, 'stress: Q < K after adding N2O4 and Q > K after compression');
  chk(atT2[1] > eq.y, 'stress: adding N2O4 raises the NO2 at the new equilibrium');
  chk(fin[0] > 2 * atT2[0] && fin[1] < 2 * atT2[1], 'stress: compression shifts towards N2O4 (fewer gas moles)');
  const fn = (t) => (t < t1 ? [eq.A, eq.y] : t < t2 ? mid(t) : end(t));
  const ox = 48, oy = 200, w = 340, h = 160, ymax = 2.5;
  const X = (t) => ox + (t / T) * w;
  const Y = (c) => oy - (c / ymax) * h;
  const pts = [];
  for (let i = 0; i <= 200; i++) { const t = (T * i) / 200; pts.push([t, fn(t)]);}
  const pl = (k) => 'M' + pts.map(([t, s]) => `${X(t).toFixed(1)} ${Y(s[k]).toFixed(1)}`).join(' L');
  // vertical jumps at t1 (A only) and t2 (both): insert them explicitly
  const A1 = 'M' + [[0, eq.A], [t1, eq.A], [t1, s1[0]], ...pts.filter(([t]) => t > t1 && t < t2).map(([t, s]) => [t, s[0]]), [t2, atT2[0]], [t2, s2[0]], ...pts.filter(([t]) => t > t2).map(([t, s]) => [t, s[0]])].map(([t, c]) => `${X(t).toFixed(1)} ${Y(c).toFixed(1)}`).join(' L');
  const Y1 = 'M' + [[0, eq.y], [t1, eq.y], ...pts.filter(([t]) => t > t1 && t < t2).map(([t, s]) => [t, s[1]]), [t2, atT2[1]], [t2, s2[1]], ...pts.filter(([t]) => t > t2).map(([t, s]) => [t, s[1]])].map(([t, c]) => `${X(t).toFixed(1)} ${Y(c).toFixed(1)}`).join(' L');
  void pl;
  return svgDoc(420, 262, 'Concentrations of N2O4 and NO2 against time for an equilibrium that is disturbed twice. At the first dashed line extra N2O4 is added: its concentration jumps up and then falls as NO2 rises to a new equilibrium. At the second dashed line the volume is halved: both concentrations double at once, then N2O4 rises and NO2 falls as the system shifts towards fewer moles of gas.', [
    S.arrow(ox, oy, ox + w + 14, oy, { size: 6 }),
    S.arrow(ox, oy, ox, 24, { size: 6 }),
    lab(ox + w / 2, oy + 34, 'time (arbitrary units)', { a: 'middle', size: 10 }),
    lab(8, 16, 'concentration / mol L⁻¹', { size: 10 }),
    ...[0, 0.5, 1, 1.5, 2, 2.5].map((v) => lab(ox - 6, Y(v) + 4, String(v), { a: 'end', size: 10 })),
    S.line(X(t1), 40, X(t1), oy, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.line(X(t2), 40, X(t2), oy, { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    lab(X(t1), 34, 'add N₂O₄', { a: 'middle', size: 10, w: 'bold' }),
    lab(X(t2) - 4, 34, 'halve the volume', { a: 'end', size: 10, w: 'bold' }),
    S.path(A1, { c: 'var(--diagram-red)', w: 2.5 }),
    S.path(Y1, { c: 'var(--diagram-blue)', w: 2.5 }),
    lab(X(1.2), Y(eq.A) - 8, 'N₂O₄', { c: 'var(--diagram-red)', w: 'bold', size: 11 }),
    lab(X(1.2), Y(eq.y) + 16, 'NO₂', { c: 'var(--diagram-blue)', w: 'bold', size: 11 }),
    lab(X(t1 + 0.4), Y(0.1) + 4, 'shifts forward', { size: 10 }),
    lab(X(t2 + 0.4), Y(0.1) + 4, 'shifts backward', { size: 10 }),
  ].join(''));
})();

// 4. Energy profile with and without a catalyst.
export const CATALYST = (() => {
  const pts = [[0, 40], [1, 40], [2, 22]];
  void pts;
  const Er = 40, Ep = 22, Eu = 100, Ec = 68;
  const ox = 40, oy = 190, w = 320, h = 150, top = 110;
  const X = (u) => ox + u * w;
  const Y = (e) => oy - (e / top) * h;
  const bump = (Et) => (u) => {
    if (u <= 0.25) return Er;
    if (u <= 0.55) return Er + ((Et - Er) * (1 - Math.cos((Math.PI * (u - 0.25)) / 0.3))) / 2;
    if (u <= 0.9) return Ep + ((Et - Ep) * (1 + Math.cos((Math.PI * (u - 0.55)) / 0.35))) / 2;
    return Ep;
  };
  const cu = bump(Eu), cc = bump(Ec);
  chk(Math.abs(cu(0.55) - Eu) < 1e-6 && Math.abs(cc(0.55) - Ec) < 1e-6, 'catalyst: peaks at 100 and 68');
  chk(Math.abs(cu(0) - Er) < 1e-9 && Math.abs(cu(1) - Ep) < 1e-9 && Math.abs(cc(1) - Ep) < 1e-9, 'catalyst: same reactant and product levels with and without the catalyst');
  chk(Eu - Er === 60 && Ec - Er === 28 && Eu - Ep === 78 && Ec - Ep === 46, 'catalyst: both activation energies fall (60 to 28 forward, 78 to 46 reverse)');
  const ux = 0.2;
  return svgDoc(420, 250, 'Potential energy against progress of reaction. The uncatalysed path has a high peak and the catalysed path a lower peak. The reactants sit at the same energy and the products at the same lower energy on both paths, so the enthalpy change and the equilibrium constant do not change; both the forward and the reverse activation energies fall by the same amount.', [
    S.arrow(ox, oy, ox + w + 14, oy, { size: 6 }),
    S.arrow(ox, oy, ox, 26, { size: 6 }),
    lab(ox + w / 2, oy + 30, 'progress of reaction', { a: 'middle', size: 10 }),
    lab(8, 18, 'potential energy', { size: 10 }),
    S.path(path(cu, 0, 1, 80, X, Y), { c: 'var(--diagram-red)', w: 2.5 }),
    S.path(path(cc, 0, 1, 80, X, Y), { c: 'var(--diagram-green)', w: 2.5, dash: '6 4' }),
    S.line(X(0.08), Y(Eu), X(0.55), Y(Eu), { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.line(X(0.17), Y(Ec), X(0.55), Y(Ec), { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.arrow(X(0.08), Y(Er), X(0.08), Y(Eu), { c: 'var(--diagram-red)', size: 6 }),
    S.arrow(X(0.17), Y(Er), X(0.17), Y(Ec), { c: 'var(--diagram-green)', size: 6 }),
    lab(X(0.08) - 5, Y(70), 'Ea', { a: 'end', c: 'var(--diagram-red)', w: 'bold', size: 11 }),
    lab(X(0.17) + 5, Y(54), "Ea'", { c: 'var(--diagram-green)', w: 'bold', size: 11 }),
    lab(X(0.55), Y(Eu) - 8, 'uncatalysed', { a: 'middle', c: 'var(--diagram-red)', w: 'bold', size: 10 }),
    lab(X(0.55), Y(Ec) - 8, 'catalysed', { a: 'middle', c: 'var(--diagram-green)', w: 'bold', size: 10 }),
    lab(X(0.02), Y(Er) + 16, 'reactants', { size: 10 }),
    lab(X(0.98), Y(Ep) + 16, 'products', { a: 'end', size: 10 }),
    S.arrow(X(0.97), Y(Er), X(0.97), Y(Ep), { c: 'var(--diagram-muted)', size: 6 }),
    lab(X(0.95), Y(31), 'ΔH', { a: 'end', size: 10 }),
    lab(X(0.5), oy + 46, "Ea' = activation energy with the catalyst; ΔH is the same on both paths", { a: 'middle', size: 10 }),
  ].join(''));
})();

// 5. Haber model: equilibrium mole fraction of NH3 against pressure at three temperatures.
export const HABER_Y = (() => {
  const temps = [[573, 'var(--diagram-blue)', '300 °C (573 K)'], [673, 'var(--diagram-green)', '400 °C (673 K)'], [773, 'var(--diagram-red)', '500 °C (773 K)']];
  const Pmax = 400;
  const ox = 50, oy = 200, w = 320, h = 160;
  const X = (P) => ox + (P / Pmax) * w;
  const Y = (y) => oy - y * h;
  const f = (T) => (P) => haberY(Math.max(P, 0.001), T);
  chk(haberY(200, 573) > haberY(200, 673) && haberY(200, 673) > haberY(200, 773), 'haber: yield falls as T rises (exothermic)');
  chk([573, 673, 773].every((T) => haberY(400, T) > haberY(200, T) && haberY(200, T) > haberY(50, T)), 'haber: yield rises with pressure at every T');
  chk(Math.abs(haberY(200, 673) - 0.451) < 0.01, `haber: model yield at 200 atm and 673 K is ${(haberY(200, 673) * 100).toFixed(1)} per cent`);
  return svgDoc(420, 262, 'Model yield of ammonia, as mole fraction in the equilibrium mixture, against total pressure from zero to 400 atmospheres for a 1 to 3 nitrogen and hydrogen feed. Three curves for 300, 400 and 500 degrees Celsius show that the yield rises with pressure and falls as the temperature rises.', [
    S.arrow(ox, oy, ox + w + 14, oy, { size: 6 }),
    S.arrow(ox, oy, ox, 24, { size: 6 }),
    lab(ox + w / 2, oy + 34, 'total pressure / atm', { a: 'middle', size: 10 }),
    lab(8, 16, 'mole fraction of NH₃ at equilibrium (ideal-gas model)', { size: 10 }),
    ...[0, 100, 200, 300, 400].map((P) => S.line(X(P), oy, X(P), oy + 5) + lab(X(P), oy + 18, String(P), { a: 'middle', size: 10 })),
    ...[0, 0.25, 0.5, 0.75, 1].map((v) => lab(ox - 6, Y(v) + 4, String(v), { a: 'end', size: 10 })),
    ...temps.map(([T, c]) => S.path(path(f(T), 0, Pmax, 80, X, Y), { c, w: 2.5 })),
    ...temps.map(([T, c, name], i) => lab(ox + w - 4, Y(haberY(Pmax, T)) - 7, name, { a: 'end', c, w: 'bold', size: 10 })),
    S.line(X(200), Y(0), X(200), Y(haberY(200, 673)), { c: 'var(--diagram-muted)', w: 1, dash: '3 3' }),
    S.circle(X(200), Y(haberY(200, 673)), 4, { fill: 'currentColor', c: 'currentColor' }),
    lab(X(200) + 8, Y(0.08), 'about 200 atm, 400 °C', { size: 10 }),
  ].join(''));
})();

void KIN;
