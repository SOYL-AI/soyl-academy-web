// SVG diagrams for ICSE 9 Physics ch10 Sound and Wave Motion: transverse and longitudinal waves (geometry computed, plain and lettered),
// a displacement-distance graph, the bell-jar experiment, lightning and thunder, the frequency scale and a speed-of-sound bar chart.
import { svgDoc, S } from '../../icse-9-physics-ch01/src/lib.mjs';
import { WG, V_AIR, V_WATER, V_IRON } from './calc.mjs';

const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const bold = (x, y, s, o) => S.text(x, y, s, { size: 14, w: 'bold', c: RED, ...o });

// ---------------------------------------------------------------- transverse wave (one and a half wavelengths of a sine curve)
function transverse({ lettered }) {
  const W = 520;
  const H = 230;
  const x0 = 100;
  const yc = 115;
  const lam = 200; // px per wavelength
  const amp = 60;
  const pts = [];
  for (let i = 0; i <= 240; i++) {
    const x = (i / 240) * (lam * 1.75);
    pts.push([x0 + x, yc - amp * Math.sin((2 * Math.PI * x) / lam)]);
  }
  const p = [];
  p.push(S.line(x0 - 10, yc, x0 + lam * 1.75 + 14, yc, { c: MUT, w: 1, dash: '5 4' }));
  p.push(S.path(`M${pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(' L')}`, { c: BLUE, w: 2.6, join: 'round' }));
  const cx = (frac) => x0 + lam * frac; // crest at 0.25, 1.25; trough at 0.75, 1.75 (of lam)
  const crest1 = [cx(0.25), yc - amp];
  const trough1 = [cx(0.75), yc + amp];
  const crest2 = [cx(1.25), yc - amp];
  check(Math.abs(crest2[0] - crest1[0] - lam) < 1e-9 && Math.abs(trough1[0] - crest1[0] - lam / 2) < 1e-9, 'transverse wave: consecutive crests are one wavelength apart, crest to trough is half a wavelength');
  const mid = (x) => {
    const px = x - x0;
    return yc - amp * Math.sin((2 * Math.PI * px) / lam);
  };
  check(Math.abs(mid(crest1[0]) - crest1[1]) < 1e-9 && Math.abs(mid(trough1[0]) - trough1[1]) < 1e-9, 'transverse wave: the drawn curve passes through the crest and the trough');
  // wavelength arrow between the two crests, drawn above the wave
  const ya = yc - amp - 22;
  p.push(S.line(crest1[0], yc - amp - 6, crest1[0], ya - 4, { c: MUT, w: 1 }), S.line(crest2[0], yc - amp - 6, crest2[0], ya - 4, { c: MUT, w: 1 }));
  p.push(S.arrow(crest1[0] + 2, ya, crest2[0] - 2, ya, { c: RED, w: 1.6, size: 6 }), S.arrow(crest2[0] - 2, ya, crest1[0] + 2, ya, { c: RED, w: 1.6, size: 6 }));
  // amplitude arrow at the first crest to the equilibrium line
  p.push(S.arrow(cx(0.25), yc, cx(0.25), yc - amp + 2, { c: GREEN, w: 1.6, size: 6 }), S.arrow(cx(0.25), yc - amp + 2, cx(0.25), yc, { c: GREEN, w: 1.6, size: 6 }));
  if (lettered) {
    const pt = (frac, name, dx, dy, y) => {
      const x = cx(frac);
      p.push(S.circle(x, y, 3.6, { fill: RED, c: RED }), bold(x + dx, y + dy, name));
    };
    pt(0, 'A', -4, 22, yc);
    pt(0.25, 'B', 10, -4, yc - amp);
    pt(0.5, 'C', -4, 22, yc);
    pt(0.75, 'D', 10, 14, yc + amp);
    pt(1.0, 'E', -4, 22, yc);
    pt(1.25, 'F', 10, -4, yc - amp);
    p.push(lab((crest1[0] + crest2[0]) / 2, ya - 7, 'one wavelength', { a: 'middle', c: RED }));
    p.push(lab(cx(0.25) - 44, yc - amp / 2 + 3, 'amplitude', { a: 'end', c: GREEN }));
  } else {
    p.push(lab((crest1[0] + crest2[0]) / 2, ya - 7, 'wavelength λ', { a: 'middle', c: RED }));
    p.push(lab(cx(0.25) - 44, yc - amp / 2 + 3, 'amplitude a', { a: 'end', c: GREEN }));
    p.push(lab(cx(0.25) + 8, yc - amp - 4, 'crest', { size: 11 }));
    p.push(lab(cx(0.75), yc + amp + 16, 'trough', { a: 'middle', size: 11 }));
  }
  p.push(S.arrow(x0 + lam * 1.75 - 70, H - 20, x0 + lam * 1.75 + 14, H - 20, { c: MUT, w: 1.4, size: 6 }), lab(x0 + lam * 1.75 - 76, H - 16, 'wave travels this way', { a: 'end', size: 11, c: MUT }));
  p.push(lab(x0 - 14, yc + 4, 'rest line', { size: 10, c: MUT, a: 'end' }));
  return svgDoc(W, H, lettered ? 'A transverse wave on a rope with the points A to F lettered: A, C and E on the rest line, B and F crests, D a trough. A to E is one wavelength' : 'A transverse wave: a sine curve above and below a dashed rest line, with a crest, a trough, the amplitude from the rest line to a crest and the wavelength between two consecutive crests', p.join(''));
}
export const TRANSVERSE = transverse({ lettered: false });
export const TRANSVERSE_LET = transverse({ lettered: true });

// ---------------------------------------------------------------- longitudinal wave: particles bunched into compressions, spread into rarefactions
function longitudinal({ lettered }) {
  const W = 480;
  const H = 200;
  const x0 = 30;
  const lam = 150;
  const rows = [58, 76, 94];
  const n = 78;
  const gap = (lam * 2.9) / n;
  const k = (2 * Math.PI) / lam;
  const disp = 0.8 / k; // displacement amplitude in px: spacing varies from 0.2 to 1.8 of the rest spacing
  const p = [];
  // particle with rest position a is displaced to a - disp sin(k (a - x0 - lam/2)): compressions at x0 + lam/2 + m lam, rarefactions at x0 + m lam
  const xi = (a) => a - disp * Math.sin(k * (a - x0 - lam / 2));
  const xs = [];
  for (let i = 0; i <= n; i++) xs.push(xi(x0 + i * gap));
  for (const y of rows) for (const x of xs) p.push(S.circle(x, y, 2.3, { fill: BLUE, c: BLUE, sw: 0.5 }));
  const comp = [0, 1].map((m) => x0 + lam / 2 + m * lam);
  const rare = [0, 1, 2].map((m) => x0 + m * lam);
  const localSpacing = (pos) => {
    let best = 0;
    for (let i = 1; i < xs.length; i++) if (Math.abs((xs[i] + xs[i - 1]) / 2 - pos) < Math.abs((xs[best + 1] + xs[best]) / 2 - pos)) best = i - 1;
    return xs[best + 1] - xs[best];
  };
  check(localSpacing(comp[0]) < gap * 0.35 && localSpacing(comp[1]) < gap * 0.35, 'longitudinal wave: the particles are closest together at the drawn compressions');
  check(localSpacing(rare[1]) > gap * 1.65 && Math.abs(comp[1] - comp[0] - lam) < 1e-9 && rare[1] > comp[0] && rare[1] < comp[1], 'longitudinal wave: the particles are furthest apart at the rarefaction between two compressions, and the compressions are one wavelength apart');
  const yl = rows[0] - 20;
  p.push(S.arrow(comp[0], yl, comp[1], yl, { c: RED, w: 1.6, size: 6 }), S.arrow(comp[1], yl, comp[0], yl, { c: RED, w: 1.6, size: 6 }));
  for (const x of [...comp, rare[1]]) p.push(S.line(x, rows[0] - 12, x, rows[2] + 12, { c: MUT, w: 1, dash: '3 3' }));
  if (lettered) {
    // P and R are compressions, Q and S rarefactions (S lies half a wavelength beyond R, past the last compression)
    const spots = [[comp[0], 'P'], [rare[1], 'Q'], [comp[1], 'R'], [rare[2], 'S']];
    for (const [x, name] of spots) p.push(bold(x - 5, rows[2] + 32, name));
    p.push(S.line(rare[2], rows[0] - 12, rare[2], rows[2] + 12, { c: MUT, w: 1, dash: '3 3' }));
    p.push(lab((comp[0] + comp[1]) / 2, yl - 6, 'distance between P and R', { a: 'middle', c: RED }));
  } else {
    p.push(lab((comp[0] + comp[1]) / 2, yl - 6, 'wavelength λ', { a: 'middle', c: RED }));
    for (const x of comp) p.push(lab(x, rows[2] + 32, 'C', { a: 'middle', size: 14, w: 'bold', c: RED }));
    p.push(lab(rare[1], rows[2] + 32, 'R', { a: 'middle', size: 14, w: 'bold', c: RED }));
    p.push(lab(W - 12, rows[2] + 54, 'C compression, R rarefaction', { a: 'end', size: 11, c: MUT }));
  }
  p.push(S.arrow(x0 + 4, rows[2] + 52, x0 + 70, rows[2] + 52, { c: MUT, w: 1.4, size: 6 }), lab(x0 + 76, rows[2] + 56, 'direction of the wave', { size: 11, c: MUT }));
  return svgDoc(W, H, lettered ? 'A longitudinal wave drawn as rows of particles: P and R are the centres of two compressions, Q and S are the centres of rarefactions. The distance from P to R is one wavelength' : 'A longitudinal wave drawn as three rows of particles bunched into compressions C and spread out into rarefactions R. The distance between two consecutive compressions is one wavelength', p.join(''));
}
export const LONGITUDINAL = longitudinal({ lettered: false });
export const LONGITUDINAL_LET = longitudinal({ lettered: true });

// ---------------------------------------------------------------- displacement-distance graph of a wave on a rope (amplitude 3 cm, wavelength 0.8 m)
export const WAVE_GRAPH = (() => {
  const W = 460;
  const H = 260;
  const L = 56;
  const R = 20;
  const T = 24;
  const B = 44;
  const pw = W - L - R;
  const ph = H - T - B;
  const xMax = 1.6;
  const yMax = 4;
  const x = (v) => L + (v / xMax) * pw;
  const y = (v) => T + ph / 2 - (v / (2 * yMax)) * ph;
  const p = [];
  for (let v = 0; v <= xMax + 1e-9; v += 0.2) p.push(S.line(x(v), T, x(v), T + ph, { c: MUT, w: 0.5, dash: '2 3' }), lab(x(v), T + ph + 16, v.toFixed(1), { a: 'middle' }));
  for (let v = -yMax; v <= yMax; v += 1) p.push(S.line(L, y(v), L + pw, y(v), { c: MUT, w: v === 0 ? 1 : 0.5, dash: v === 0 ? undefined : '2 3' }), lab(L - 6, y(v) + 4, String(v), { a: 'end' }));
  p.push(S.arrow(L, y(-yMax), L, T - 10, { w: 1.6, size: 6 }), S.arrow(L, y(0), L + pw + 8, y(0), { w: 1.6, size: 6 }));
  const pts = [];
  for (let i = 0; i <= 200; i++) {
    const d = (i / 200) * xMax;
    pts.push([x(d), y(WG.amp * Math.sin((2 * Math.PI * d) / WG.lambda))]);
  }
  p.push(S.path(`M${pts.map(([a, b]) => `${a.toFixed(1)} ${b.toFixed(1)}`).join(' L')}`, { c: BLUE, w: 2.4, join: 'round' }));
  check(Math.abs(WG.amp * Math.sin((2 * Math.PI * 0.2) / WG.lambda) - WG.amp) < 1e-9 && Math.abs(WG.amp * Math.sin((2 * Math.PI * 0.6) / WG.lambda) + WG.amp) < 1e-9, 'wave graph: crest at 0.2 m and trough at 0.6 m for a wavelength of 0.8 m');
  p.push(lab(L + pw / 2, H - 4, 'distance along the rope (m)', { a: 'middle', size: 12, w: 'bold' }), lab(L + 4, 12, 'displacement (cm)', { size: 12, w: 'bold' }));
  return svgDoc(W, H, 'Displacement in centimetres against distance in metres along a rope at one instant: a sine curve with crests of 3 cm at 0.2 m and 1.0 m, troughs of minus 3 cm at 0.6 m and 1.4 m, and crossing the axis at 0, 0.4, 0.8, 1.2 and 1.6 m', p.join(''));
})();

// ---------------------------------------------------------------- bell jar experiment
export const BELL_JAR = (() => {
  const p = [];
  p.push(S.rect(30, 190, 290, 12, { fill: FILL }), lab(36, 214, 'base plate', { size: 11, c: MUT }));
  p.push(S.path('M90 190 L90 100 Q90 40 160 40 Q230 40 230 100 L230 190', { c: BLUE, w: 2.4 }));
  p.push(lab(240, 62, 'glass bell jar', { c: BLUE }));
  p.push(S.line(160, 40, 160, 80, { c: MUT, w: 1.2 }));
  p.push(S.path('M144 112 Q144 84 160 84 Q176 84 176 112 Z', { c: 'currentColor', w: 1.8, fill: FILL }));
  p.push(S.circle(160, 116, 3.4, { fill: 'currentColor', c: 'currentColor' }));
  p.push(S.lead(176, 100, 240, 100), lab(244, 104, 'electric bell'));
  p.push(S.line(154, 112, 154, 190, { w: 1.4 }), S.line(166, 112, 166, 190, { w: 1.4 }));
  p.push(S.line(154, 202, 154, 236, { w: 1.4 }), S.line(166, 202, 166, 236, { w: 1.4 }));
  p.push(S.rect(120, 236, 80, 24, { fill: FILL }), lab(160, 252, 'cell and key', { a: 'middle', size: 11 }));
  p.push(S.line(230, 176, 330, 176, { w: 3, c: MUT }), S.rect(330, 156, 56, 40, { fill: FILL }), lab(358, 180, 'pump', { a: 'middle', size: 12 }));
  p.push(S.arrow(280, 146, 280, 168, { c: RED, w: 1.6, size: 6 }), lab(286, 144, 'air pumped out', { size: 11, c: RED }));
  p.push(lab(160, 28, 'bell hangs on a thread', { a: 'middle', size: 10, c: MUT }));
  return svgDoc(400, 270, 'Apparatus to show that sound needs a medium: an electric bell hangs inside a sealed glass bell jar standing on a base plate. Wires pass through the plate to a cell and a key, and a pipe joins the jar to a vacuum pump that removes the air', p.join(''));
})();

// ---------------------------------------------------------------- lightning and thunder
export const THUNDER_FIG = (() => {
  const p = [];
  p.push(S.path('M50 62 Q36 62 36 48 Q36 34 52 34 Q56 20 74 22 Q86 12 102 22 Q122 18 124 38 Q140 40 138 54 Q136 64 120 62 Z', { c: 'currentColor', w: 1.8, fill: FILL }));
  p.push(S.path('M92 62 L80 92 L96 92 L82 128 L112 84 L96 84 L106 62', { c: RED, w: 2, fill: RED, fop: 0.5 }));
  p.push(S.line(20, 180, 440, 180, { c: MUT, w: 1.4 }));
  p.push(S.circle(396, 164, 8, { fill: 'currentColor', c: 'currentColor' }), S.line(396, 172, 396, 180, { w: 2 }), lab(408, 168, 'observer', { size: 11 }));
  p.push(S.line(82, 128, 82, 180, { c: MUT, w: 1, dash: '3 3' }));
  p.push(S.arrow(112, 100, 378, 148, { c: GREEN, w: 1.8, size: 7 }), lab(240, 110, 'light: almost at once', { a: 'middle', c: GREEN }));
  p.push(S.arrow(112, 120, 378, 160, { c: BLUE, w: 1.8, size: 7, dash: '6 4' }), lab(260, 160, 'sound: much later', { a: 'middle', c: BLUE }));
  p.push(S.arrow(84, 196, 390, 196, { c: 'currentColor', w: 1.4, size: 6 }), S.arrow(390, 196, 84, 196, { c: 'currentColor', w: 1.4, size: 6 }), lab(237, 214, 'distance d = speed of sound × time gap', { a: 'middle', size: 12 }));
  return svgDoc(460, 230, 'A lightning flash from a cloud: light reaches the observer almost instantly while the sound of the thunder travels slowly and arrives later. The distance from the strike to the observer is the speed of sound times the time gap', p.join(''));
})();

// ---------------------------------------------------------------- the frequency scale (logarithmic): infrasonic, audible, ultrasonic
export const FREQ_SCALE = (() => {
  const W = 520;
  const L = 30;
  const R = 20;
  const lo = 0; // 10^0 = 1 Hz
  const hi = 6; // 10^6 = 1 MHz
  const px = (f) => L + ((Math.log10(f) - lo) / (hi - lo)) * (W - L - R);
  const p = [];
  const y = 70;
  const bands = [
    ['infrasonic', 1, 20, GREEN],
    ['audible', 20, 20000, BLUE],
    ['ultrasonic', 20000, 1e6, RED],
  ];
  for (const [name, a, b, c] of bands) {
    p.push(S.rect(px(a), y, px(b) - px(a), 34, { c, fill: c, fop: 0.22, sw: 1.6 }));
    p.push(lab((px(a) + px(b)) / 2, y + 21, name, { a: 'middle', size: name === 'infrasonic' ? 10 : 13, w: 'bold', c }));
  }
  check(px(20) > px(1) && px(20000) > px(20) && px(1e6) > px(20000) && Math.abs(px(20) - L - (W - L - R) * (Math.log10(20) / 6)) < 1e-9, 'frequency scale: the band edges at 20 Hz and 20 000 Hz sit on the logarithmic axis');
  for (const [f, name] of [[1, '1'], [10, '10'], [100, '100'], [1000, '1 kHz'], [10000, '10 kHz'], [100000, '100 kHz'], [1000000, '1 MHz']]) {
    p.push(S.line(px(f), y + 34, px(f), y + 42, { w: 1.2, c: MUT }), lab(px(f), y + 56, name, { a: 'middle', size: 10, c: MUT }));
  }
  p.push(lab(L, y + 76, 'frequency (Hz), each step is ten times the one before', { size: 11, c: MUT }));
  p.push(S.line(px(20), y - 8, px(20), y + 34, { w: 1.4 }), lab(px(20), y - 14, '20 Hz', { a: 'middle', size: 11, w: 'bold' }));
  p.push(S.line(px(20000), y - 8, px(20000), y + 34, { w: 1.4 }), lab(px(20000), y - 14, '20 000 Hz', { a: 'middle', size: 11, w: 'bold' }));
  return svgDoc(W, 175, 'A logarithmic frequency scale from 1 hertz to 1 megahertz: below 20 hertz is infrasonic, from 20 hertz to 20 000 hertz is audible and above 20 000 hertz is ultrasonic', p.join(''));
})();

// ---------------------------------------------------------------- bar chart of the speed of sound in air, water and iron (computed lengths)
export const SPEED_BARS = (() => {
  const rows = [['air (about 20 °C)', V_AIR, GREEN], ['water', V_WATER, BLUE], ['iron', V_IRON, RED]];
  const scale = 300 / V_IRON;
  const p = [];
  rows.forEach(([name, v, c], i) => {
    const y = 20 + i * 48;
    p.push(lab(10, y + 20, name, { size: 12 }), S.rect(140, y, v * scale, 28, { c, fill: c, fop: 0.3 }), lab(146 + v * scale, y + 19, `${v} m/s`, { size: 12, w: 'bold' }));
  });
  check(Math.abs(V_IRON * scale - 300) < 1e-9 && V_AIR < V_WATER && V_WATER < V_IRON, 'speed bars: iron is the longest bar and air the shortest');
  p.push(S.line(140, 14, 140, 160, { w: 1.4 }));
  return svgDoc(520, 170, 'Bar chart of the speed of sound: 340 metres per second in air, 1500 in water and 5100 in iron', p.join(''));
})();
