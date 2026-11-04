// ch06 Equilibrium — SVGs with computed geometry: approach to equilibrium (concentration and rate against time), pH scale, Q against K.
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);

// 1. A ⇌ B with first-order forward and reverse steps (illustrative model): kf = 0.20, kr = 0.05 (arbitrary time units), [A]0 = 1.00, [B]0 = 0.
export const APPROACH = (() => {
  const kf = 0.2;
  const kr = 0.05;
  const A0 = 1.0;
  const K = kf / kr;
  const Aeq = (A0 * kr) / (kf + kr);
  const Beq = A0 - Aeq;
  const A = (t) => Aeq + (A0 - Aeq) * Math.exp(-(kf + kr) * t);
  const B = (t) => A0 - A(t);
  const Tmax = 30;
  chk(Math.abs(Beq / Aeq - K) < 1e-9, `approach: [B]eq/[A]eq = ${(Beq / Aeq).toFixed(2)} equals kf/kr = ${K}`);
  chk(Math.abs(kf * Aeq - kr * Beq) < 1e-12, `approach: equal forward and reverse rates at equilibrium (${(kf * Aeq).toFixed(3)})`);
  chk(Math.abs(A(Tmax) - Aeq) < 0.002, 'approach: curve has levelled off by t = 30');
  chk([0, 5, 10, 20].every((t) => Math.abs(A(t) + B(t) - A0) < 1e-12), 'approach: [A] + [B] stays 1.00');
  // left panel: concentrations
  const ox = 44;
  const oy = 170;
  const w = 150;
  const h = 130;
  const X = (t) => ox + (t / Tmax) * w;
  const Y = (c) => oy - c * h;
  const curve = (f) => 'M' + Array.from({ length: 61 }, (_, i) => `${X((i * Tmax) / 60).toFixed(1)} ${Y(f((i * Tmax) / 60)).toFixed(1)}`).join(' L');
  // right panel: rates
  const ox2 = 254;
  const rmax = 0.2;
  const Y2 = (v) => oy - (v / rmax) * h;
  const X2 = (t) => ox2 + (t / Tmax) * w;
  const curve2 = (f) => 'M' + Array.from({ length: 61 }, (_, i) => `${X2((i * Tmax) / 60).toFixed(1)} ${Y2(f((i * Tmax) / 60)).toFixed(1)}`).join(' L');
  return svgDoc(
    420,
    232,
    'Approach to equilibrium for A converting to B and back. Left: the concentration of A falls from 1.00 and the concentration of B rises from zero until they level off at 0.20 and 0.80, then stay constant. Right: the forward rate falls and the reverse rate rises until they meet at the same value, 0.04, which is the dynamic equilibrium.',
    [
      S.arrow(ox, oy, ox + w + 14, oy, { size: 6 }),
      S.arrow(ox, oy, ox, 24, { size: 6 }),
      lab(ox + w / 2, oy + 30, 'time (arbitrary units)', { a: 'middle', size: 10 }),
      lab(8, 18, 'concentration / mol L⁻¹', { size: 10 }),
      lab(ox - 6, Y(1) + 4, '1.0', { a: 'end', size: 10 }),
      lab(ox - 6, Y(0.5) + 4, '0.5', { a: 'end', size: 10 }),
      lab(ox - 6, Y(0) + 4, '0', { a: 'end', size: 10 }),
      S.line(ox, Y(Aeq), ox + w, Y(Aeq), { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
      S.line(ox, Y(Beq), ox + w, Y(Beq), { c: 'var(--diagram-muted)', w: 1, dash: '4 3' }),
      S.path(curve(A), { c: 'var(--diagram-red)', w: 2.5 }),
      S.path(curve(B), { c: 'var(--diagram-blue)', w: 2.5 }),
      lab(X(2), Y(0.86), 'A', { c: 'var(--diagram-red)', w: 'bold', size: 12 }),
      lab(X(2), Y(0.12), 'B', { c: 'var(--diagram-blue)', w: 'bold', size: 12 }),
      S.line(X(18), oy, X(18), oy + 5),
      lab(X(18), oy + 17, 'equilibrium', { a: 'middle', size: 10 }),
      S.line(X(18), Y(0.5), X(18), Y(0.9), { c: 'var(--diagram-muted)', w: 1, dash: '2 3' }),
      // rates
      S.arrow(ox2, oy, ox2 + w + 14, oy, { size: 6 }),
      S.arrow(ox2, oy, ox2, 24, { size: 6 }),
      lab(ox2 + w / 2, oy + 30, 'time (arbitrary units)', { a: 'middle', size: 10 }),
      lab(224, 18, 'rate / mol L⁻¹ per unit time', { size: 10 }),
      S.path(curve2((t) => kf * A(t)), { c: 'var(--diagram-red)', w: 2.5 }),
      S.path(curve2((t) => kr * B(t)), { c: 'var(--diagram-blue)', w: 2.5 }),
      lab(X2(1), Y2(0.19) + 2, 'forward', { c: 'var(--diagram-red)', w: 'bold', size: 10 }),
      lab(X2(1), Y2(0.012) - 4, 'reverse', { c: 'var(--diagram-blue)', w: 'bold', size: 10 }),
      lab(X2(Tmax), Y2(kf * Aeq) - 8, 'rates equal', { a: 'end', size: 10 }),
      lab(ox2 - 6, Y2(0.2) + 4, '0.20', { a: 'end', size: 10 }),
      lab(ox2 - 6, Y2(0) + 4, '0', { a: 'end', size: 10 }),
    ].join(''),
  );
})();

// 2. pH scale with typical values.
export const PHSCALE = (() => {
  const x0 = 14;
  const u = 28; // px per pH unit
  const barY = 78;
  const barH = 26;
  const X = (p) => x0 + p * u;
  const hues = ['var(--diagram-red)', 'var(--diagram-red)', 'var(--diagram-red)', 'var(--diagram-yellow)', 'var(--diagram-yellow)', 'var(--diagram-yellow)', 'var(--diagram-green)', 'var(--diagram-green)', 'var(--diagram-green)', 'var(--diagram-blue)', 'var(--diagram-blue)', 'var(--diagram-blue)', 'var(--diagram-accent)', 'var(--diagram-accent)'];
  const items = [
    ['Gastric juice', 1.5, 'up'],
    ['Lemon juice', 2.3, 'down'],
    ['Tomato juice', 4.2, 'up'],
    ['Rainwater', 5.6, 'down'],
    ['Pure water', 7.0, 'up'],
    ['Sea water', 8.1, 'down'],
    ['Antacid', 10.5, 'up'],
    ['Household ammonia', 11.5, 'down'],
    ['0.1 M NaOH', 13.0, 'up'],
  ];
  const ups = items.filter((i) => i[2] === 'up').map((i) => i[1]);
  const downs = items.filter((i) => i[2] === 'down').map((i) => i[1]);
  const gap = (a) => a.slice(1).every((v, i) => (v - a[i]) * u >= 66);
  chk(gap(ups) && gap(downs), 'pH scale: labels on the same side are at least 66 px apart');
  chk(items.every(([, p]) => p > 0 && p < 14), 'pH scale: all marked values lie between 0 and 14');
  const body = [];
  for (let p = 0; p < 14; p++) body.push(S.rect(X(p), barY, u, barH, { fill: hues[p], fop: 0.5, c: 'var(--diagram-muted)', sw: 1 }));
  for (let p = 0; p <= 14; p++) body.push(lab(X(p), barY + barH + 14, String(p), { a: 'middle', size: 10 }));
  body.push(lab(X(2), 20, 'ACIDIC', { a: 'middle', w: 'bold', size: 12 }), lab(X(7), 20, 'NEUTRAL (298 K)', { a: 'middle', w: 'bold', size: 12 }), lab(X(12), 20, 'BASIC', { a: 'middle', w: 'bold', size: 12 }));
  body.push(S.arrow(X(5.2), 34, X(0.2), 34, { size: 6 }), S.arrow(X(8.8), 34, X(13.8), 34, { size: 6 }));
  body.push(lab(X(2.8), 48, '[H⁺] increases', { a: 'middle', size: 10 }), lab(X(11.2), 48, '[OH⁻] increases', { a: 'middle', size: 10 }));
  for (const [name, p, side] of items) {
    if (side === 'up') {
      body.push(S.line(X(p), barY - 2, X(p), barY - 12, { c: 'var(--diagram-muted)', w: 1 }), lab(X(p), barY - 16, `${name}`, { a: 'middle', size: 10 }), S.circle(X(p), barY + barH / 2, 4, { fill: 'currentColor', c: 'currentColor', sw: 1 }));
    } else {
      body.push(S.line(X(p), barY + barH + 18, X(p), barY + barH + 30, { c: 'var(--diagram-muted)', w: 1 }), lab(X(p), barY + barH + 44, `${name}`, { a: 'middle', size: 10 }), S.circle(X(p), barY + barH / 2, 4, { fill: 'currentColor', c: 'currentColor', sw: 1 }));
    }
  }
  return svgDoc(
    420,
    170,
    'The pH scale from 0 to 14 as a coloured bar: red for strongly acidic, yellow, green near neutral at 7, blue and purple for basic. Typical values are marked: gastric juice about 1.5, lemon juice 2.3, tomato juice 4.2, rainwater 5.6, pure water 7.0, sea water 8.1, milk of magnesia 10.5, household ammonia 11.5 and 0.1 molar sodium hydroxide 13.',
    body.join(''),
  );
})();

// 3. Q against K on a logarithmic axis (K = 54, H2 + I2 <=> 2HI at 700 K, given).
export const QK = (() => {
  const K = 54;
  const x0 = 30;
  const u = 80; // px per decade
  const X = (q) => x0 + (Math.log10(q) + 1) * u; // log Q from −1 to 3
  const y = 100;
  const Qs = [
    ['Q = 2.25', 2.25],
    ['Q = 54', K],
    ['Q = 300', 300],
  ];
  chk(Qs[0][1] < K && Qs[2][1] > K, 'Q–K: left example has Q < K, right example has Q > K');
  chk(X(K) > X(2.25) && X(300) > X(K), 'Q–K: x positions follow log Q');
  const arrowFor = (q) => {
    const dir = q < K ? 1 : -1;
    return S.arrow(X(q) + dir * 6, y - 38, X(K) - dir * 6, y - 38, { c: q < K ? 'var(--diagram-green)' : 'var(--diagram-red)', w: 3, size: 9 });
  };
  chk(X(K) - X(2.25) > 40 && X(300) - X(K) > 30, 'Q–K: arrows are long enough to read');
  return svgDoc(
    420,
    200,
    'Reaction quotient Q compared with the equilibrium constant K = 54 on a logarithmic axis. When Q is smaller than K, for example 2.25, the net reaction proceeds forward, producing more products, and Q rises towards K. When Q equals K the system is at equilibrium. When Q is larger than K, for example 300, the net reaction proceeds in reverse, and Q falls towards K.',
    [
      S.line(x0, y, 400, y, { w: 2 }),
      ...[-1, 0, 1, 2, 3].map((d) => S.line(X(10 ** d), y - 5, X(10 ** d), y + 5) + lab(X(10 ** d), y + 22, d === -1 ? '0.1' : String(10 ** d), { a: 'middle', size: 10 })),
      lab(210, y + 62, 'Q (logarithmic scale)', { a: 'middle', size: 11 }),
      S.line(X(K), 30, X(K), y + 8, { c: 'var(--diagram-accent)', w: 3 }),
      lab(X(K), 24, 'Q = K: equilibrium', { a: 'middle', size: 11, w: 'bold', c: 'var(--diagram-accent)' }),
      S.circle(X(2.25), y, 6, { fill: 'var(--diagram-green)', c: 'var(--diagram-green)' }),
      S.circle(X(300), y, 6, { fill: 'var(--diagram-red)', c: 'var(--diagram-red)' }),
      arrowFor(2.25),
      arrowFor(300),
      lab(X(2.25) - 14, y - 52, 'Q < K', { size: 11, w: 'bold', c: 'var(--diagram-green)' }),
      lab(X(2.25) - 14, y - 66, 'net forward →', { size: 10 }),
      lab(X(300) + 12, y - 52, 'Q > K', { a: 'end', size: 11, w: 'bold', c: 'var(--diagram-red)' }),
      lab(X(300) + 20, y - 66, '← net reverse', { a: 'end', size: 10 }),
      lab(X(2.25), y + 38, '2.25', { a: 'middle', size: 10, c: 'var(--diagram-green)' }),
      lab(X(300), y + 38, '300', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
      lab(X(K), y + 38, '54', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    ].join(''),
  );
})();
