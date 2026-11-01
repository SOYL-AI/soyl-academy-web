// ICSE 10 Physics ch07 diagrams (allow-listed elements, palette colours only). Geometry is computed and self-checked
// (SELF_CHECKS, read by build.mjs): the echo and SONAR figures are drawn to scale from d = v t / 2; Barton's pendulums have the
// resonating bob at the driver's length, so equal natural frequencies f = (1 / 2 pi) sqrt(g / L); the waveform panels are
// computed sine and composite curves whose periods and peak amplitudes are measured from the plotted points.
import { svgDoc, S } from './lib.mjs';

const ACC = 'var(--diagram-accent)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const BROWN = 'var(--diagram-brown)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const near = (a, b, tol) => Math.abs(a - b) <= tol;
const poly = (pts) => pts.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)} ${y.toFixed(1)}`).join(' ');

// ---------------------------------------------------------------- echo from a cliff, to scale
export const ECHO_DATA = { v: 340, t: 0.5 };
export const ECHO = (() => {
  const { v, t } = ECHO_DATA;
  const d = (v * t) / 2;
  const k = 3.6; // px per m
  const x0 = 50;
  const xc = x0 + d * k;
  const ground = 170;
  let s = S.line(10, ground, 400, ground, { w: 1.5 });
  s += S.path(`M${xc} ${ground} L${xc} 40 L${xc + 30} 30 L${xc + 50} 50 L${xc + 50} ${ground} Z`, { fill: BROWN, fop: 0.35, c: BROWN });
  s += lab(xc + 4, 26, 'cliff', { size: 11 });
  // person
  s += S.circle(x0, ground - 52, 7) + S.line(x0, ground - 45, x0, ground - 20) + S.line(x0, ground - 20, x0 - 8, ground) + S.line(x0, ground - 20, x0 + 8, ground) + S.line(x0, ground - 38, x0 + 12, ground - 30);
  // outgoing and returning sound
  s += S.arrow(x0 + 18, ground - 70, xc - 4, ground - 70, { c: RED, w: 2 }) + lab((x0 + xc) / 2, ground - 78, 'sound goes out', { size: 10, a: 'middle', c: RED });
  s += S.arrow(xc - 4, ground - 45, x0 + 18, ground - 45, { c: BLUE, w: 2 }) + lab((x0 + xc) / 2, ground - 32, 'echo returns', { size: 10, a: 'middle', c: BLUE });
  for (const rr of [8, 14, 20]) s += S.path(`M${x0 + 14 + rr * 0.5} ${ground - 70 - rr} A ${rr} ${rr} 0 0 1 ${x0 + 14 + rr * 0.5} ${ground - 70 + rr}`, { c: RED, w: 1 });
  s += S.line(x0, ground + 14, xc, ground + 14, { c: ACC, w: 1 }) + S.line(x0, ground + 8, x0, ground + 20, { c: ACC, w: 1 }) + S.line(xc, ground + 8, xc, ground + 20, { c: ACC, w: 1 });
  s += lab((x0 + xc) / 2, ground + 30, `d = ${d} m`, { size: 11, a: 'middle', c: ACC });
  s += lab(10, 222, `Echo heard after t = ${t} s; sound travels 2d, so d = v t / 2 = ${v} × ${t} / 2 = ${d} m`, { size: 10 });
  const pathLen = 2 * ((xc - x0) / k);
  check(near(pathLen, v * t, 1e-9) && near(d, 85, 1e-9), `echo: the cliff is drawn ${((xc - x0) / k).toFixed(1)} m away at ${k} px per m; the round trip ${pathLen.toFixed(1)} m equals v t = ${v * t} m`);
  return svgDoc(410, 232, `A person stands ${d} metres from a cliff and shouts. The sound travels to the cliff and is reflected back as an echo, heard ${t} second later. The sound covers twice the distance to the cliff, so the distance is the speed of sound times the time, divided by two.`, s);
})();

// ---------------------------------------------------------------- SONAR: ship, shoal of fish and seabed, to scale
export const SONAR_DATA = { v: 1500, tFish: 0.4, tBed: 1.6 };
export const SONAR = (() => {
  const { v, tFish, tBed } = SONAR_DATA;
  const dFish = (v * tFish) / 2;
  const dBed = (v * tBed) / 2;
  const k = 0.15; // px per m
  const sea = 50;
  const X = 150;
  let s = S.rect(10, sea, 400, dBed * k + 10, { fill: BLUE, fop: 0.12, c: 'none' }) + S.line(10, sea, 410, sea, { c: BLUE, w: 1.5 });
  s += S.path(`M${X - 50} ${sea - 4} L${X + 50} ${sea - 4} L${X + 38} ${sea + 10} L${X - 38} ${sea + 10} Z`, { fill: MUT, fop: 0.6, c: 'currentColor' }) + S.rect(X - 10, sea - 22, 24, 18, { fill: MUT, fop: 0.4 });
  s += lab(X + 56, sea - 10, 'ship with transmitter and receiver', { size: 10 });
  const bed = sea + 10 + dBed * k;
  s += S.path(`M10 ${bed} Q 100 ${bed - 8} 200 ${bed} T 410 ${bed} L410 ${bed + 20} L10 ${bed + 20} Z`, { fill: BROWN, fop: 0.4, c: BROWN });
  s += lab(300, bed + 14, 'seabed', { size: 10 });
  const yFish = sea + 10 + dFish * k;
  for (const [dx, dy] of [[-10, 0], [6, -5], [10, 6], [-2, 8]]) s += S.ellipse(X + 70 + dx, yFish + dy, 6, 3, { fill: GREEN, fop: 0.6, c: GREEN });
  s += lab(X + 90, yFish + 4, 'shoal of fish', { size: 10, c: GREEN });
  s += S.arrow(X - 8, sea + 12, X - 8, bed - 2, { c: RED, w: 1.8 }) + S.arrow(X + 8, bed - 2, X + 8, sea + 12, { c: BLUE, w: 1.8 });
  s += S.arrow(X + 18, sea + 12, X + 62, yFish - 2, { c: RED, w: 1.2 }) + S.arrow(X + 58, yFish + 4, X + 22, sea + 14, { c: BLUE, w: 1.2 });
  s += lab(X - 14, (sea + bed) / 2, 'ultrasonic pulse', { size: 10, a: 'end', c: RED }) + lab(X - 14, (sea + bed) / 2 + 14, 'down; echo up', { size: 10, a: 'end', c: BLUE });
  s += S.line(30, sea + 10, 30, bed, { c: ACC, w: 1 }) + lab(36, bed - 8, `depth ${dBed} m`, { size: 10, c: ACC });
  s += lab(10, bed + 38, `Fish: echo after ${tFish} s, ${dFish} m; seabed: echo after ${tBed} s, ${dBed} m (v = ${v} m/s)`, { size: 10 });
  check(near(bed - sea - 10, dBed * k, 1e-9) && near(yFish - sea - 10, dFish * k, 1e-9) && dFish === 300 && dBed === 1200, `SONAR: seabed drawn at ${dBed} m and shoal at ${dFish} m below the transducer (0.15 px per m), from depth = v t / 2 with v = ${v} m/s`);
  return svgDoc(420, Math.round(bed + 48), `SONAR on a ship. A pulse of ultrasound is sent down into the sea; echoes return from a shoal of fish after ${tFish} second and from the seabed after ${tBed} seconds. With the speed of sound in sea water ${v} metres per second, the fish are ${dFish} metres down and the seabed is ${dBed} metres down.`, s);
})();

// ---------------------------------------------------------------- Barton's pendulums: resonance on a common string
export const BARTON = (() => {
  const top = 40;
  const k = 200; // px per m of pendulum length
  const pends = [
    { name: 'A', L: 0.4, x: 70, c: MUT },
    { name: 'B', L: 0.8, x: 150, c: GREEN, big: true },
    { name: 'D (driver)', L: 0.8, x: 240, c: RED, driver: true },
    { name: 'C', L: 0.6, x: 330, c: MUT },
  ];
  let s = S.line(20, top, 400, top, { w: 2 }) + S.line(20, top, 20, top - 20, { w: 3 }) + S.line(400, top, 400, top - 20, { w: 3 });
  s += lab(210, top - 10, 'common (stretched) string', { size: 10, a: 'middle' });
  const g = 9.8;
  const freq = (L) => Math.sqrt(g / L) / (2 * Math.PI);
  for (const p of pends) {
    const len = p.L * k;
    const amp = p.driver || p.big ? 14 : 4;
    const ang = Math.atan(amp / len);
    const bx = p.x + len * Math.sin(ang);
    const by = top + len * Math.cos(ang);
    s += S.line(p.x, top, bx, by, { c: p.c, w: 1.2 }) + S.circle(bx, by, p.driver ? 10 : 7, { fill: p.c, fop: 0.5, c: p.c });
    if (p.driver || p.big) {
      const bx2 = p.x - len * Math.sin(ang);
      s += S.line(p.x, top, bx2, by, { c: p.c, w: 1, dash: '3 3' }) + S.circle(bx2, by, p.driver ? 10 : 7, { c: p.c, dash: '3 3' });
    }
    s += lab(p.x, by + 24, p.name, { size: 11, a: 'middle', w: 'bold' }) + lab(p.x, by + 38, `L = ${p.L} m`, { size: 10, a: 'middle' }) + lab(p.x, by + 52, `f = ${freq(p.L).toFixed(2)} Hz`, { size: 10, a: 'middle', c: MUT });
  }
  s += lab(150, 276, 'B resonates: large amplitude', { size: 10, a: 'middle', c: GREEN });
  const fD = freq(0.8);
  check(near(freq(pends[1].L), fD, 1e-12) && !near(freq(pends[0].L), fD, 0.05) && !near(freq(pends[3].L), fD, 0.05), `Barton's pendulums: B has the driver's length (${pends[1].L} m), so the same natural frequency ${fD.toFixed(3)} Hz; A and C (${freq(0.4).toFixed(2)} and ${freq(0.6).toFixed(2)} Hz) differ, so only B resonates`);
  return svgDoc(420, 286, 'Four pendulums hang from a common stretched string. The heavy driver pendulum D is set swinging. Pendulum B, which has the same length as D and so the same natural frequency, soon swings with a large amplitude: it is in resonance. Pendulums A and C, of different lengths, only make small forced vibrations.', s);
})();

// ---------------------------------------------------------------- waveforms: loudness and pitch, and quality
function wave(fn, x0, y0, w, hAmp, cycles, n = 240) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = (i / n) * cycles; // in periods of the reference wave
    pts.push([x0 + (i / n) * w, y0 - hAmp * fn(t)]);
  }
  return pts;
}
const sine = (a, f = 1) => (t) => a * Math.sin(2 * Math.PI * f * t);
export const WAVES_LP = (() => {
  const w = 300;
  const H = 30;
  const rows = [
    { y: 50, fn: sine(1), c: BLUE, t: 'loud: large amplitude' },
    { y: 125, fn: sine(0.45), c: BLUE, t: 'soft: small amplitude, same pitch' },
    { y: 200, fn: sine(1, 2), c: RED, t: 'higher pitch: twice the frequency' },
  ];
  let s = '';
  const measured = [];
  for (const row of rows) {
    const pts = wave(row.fn, 30, row.y, w, H, 3);
    s += S.line(30, row.y, 30 + w, row.y, { c: MUT, w: 0.8 }) + S.path(poly(pts), { c: row.c, w: 1.8 });
    s += lab(30 + w + 10, row.y + 4, row.t, { size: 10 });
    const peak = Math.max(...pts.map(([, y]) => row.y - y)) / H;
    let crests = 0; // local maxima of the displacement = completed cycles
    for (let i = 1; i + 1 < pts.length; i++) if (pts[i][1] < pts[i - 1][1] && pts[i][1] <= pts[i + 1][1]) crests++;
    measured.push({ peak, cycles: crests });
  }
  s += S.arrow(30, 240, 330, 240, { c: MUT, w: 1 }) + lab(180, 254, 'time (same time span in each row)', { size: 10, a: 'middle', c: MUT });
  check(near(measured[0].peak, 1, 0.01) && near(measured[1].peak, 0.45, 0.01) && measured[0].cycles === measured[1].cycles && measured[2].cycles === 2 * measured[0].cycles, `waveforms: rows 1 and 2 complete the same number of cycles (${measured[0].cycles}) with peaks ${measured[0].peak.toFixed(2)} and ${measured[1].peak.toFixed(2)}; row 3 completes ${measured[2].cycles}, twice as many (double frequency)`);
  return svgDoc(560, 262, 'Three sound waves drawn over the same time. The first and second have the same frequency, so the same pitch, but the first has a larger amplitude and is louder. The third has twice the frequency of the first, so it has a higher pitch.', s);
})();
export const WAVES_Q = (() => {
  const w = 300;
  const H = 34;
  const tuning = sine(1);
  const parts = [[1, 1], [0.5, 2], [0.3, 3]];
  const rawInst = (t) => parts.reduce((acc, [a, n]) => acc + a * Math.sin(2 * Math.PI * n * t), 0);
  let peakRaw = 0;
  for (let i = 0; i <= 2000; i++) peakRaw = Math.max(peakRaw, Math.abs(rawInst(i / 2000)));
  const inst = (t) => rawInst(t) / peakRaw;
  let s = '';
  const rows = [
    { y: 55, fn: tuning, c: BLUE, t: 'tuning fork: pure sine wave' },
    { y: 150, fn: inst, c: RED, t: 'violin-like note: fundamental + overtones' },
  ];
  for (const row of rows) s += S.line(30, row.y, 30 + w, row.y, { c: MUT, w: 0.8 }) + S.path(poly(wave(row.fn, 30, row.y, w, H, 3)), { c: row.c, w: 1.8 }) + lab(30 + w + 10, row.y + 4, row.t, { size: 10 });
  s += lab(30, 215, 'Same frequency (pitch) and same peak amplitude (loudness); different waveform, so different quality', { size: 10 });
  let periodic = true;
  for (let i = 0; i < 50; i++) if (!near(inst(i / 50), inst(i / 50 + 1), 1e-9)) periodic = false;
  check(periodic && near(Math.max(...wave(inst, 0, 0, 1, 1, 3, 3000).map(([, y]) => -y)), 1, 0.01), `quality: the composite wave (fundamental with overtones of relative amplitude 0.5 and 0.3) repeats with the same period as the pure tone and is scaled to the same peak amplitude`);
  return svgDoc(600, 225, 'Two sound waves of the same frequency and the same peak amplitude. The tuning fork gives a smooth sine wave. The musical instrument gives a more complicated wave because overtones are mixed with the fundamental. The two notes have the same pitch and loudness but sound different: they differ in quality.', s);
})();
