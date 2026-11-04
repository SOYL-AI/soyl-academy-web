// Hand-drawn SVG schematics for ch09 Sound (allow-listed elements, palette colours only). Geometry is computed and self-checked.
import { svgDoc, S, near } from './lib.mjs';

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const GREEN = 'var(--diagram-green)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const BROWN = 'var(--diagram-brown)';
const YELLOW = 'var(--diagram-yellow)';
const MUTED = 'var(--diagram-muted)';

// 1. A sound wave in air: particles in bands (compressions and rarefactions) above the matching pressure graph.
const lam = 160; // wavelength in px
const kw = (2 * Math.PI) / lam;
const x0 = 80;
const nP = 65;
const step = 7.5;
const aPx = 0.85 / kw; // displacement amplitude in px so that the compression is strong but lines stay in order
const xs = [...Array(nP)].map((_, i) => {
  const u = i * step;
  return { u, x: x0 + u + aPx * Math.sin(kw * u) };
});
const gaps = xs.slice(1).map((p, i) => ({ mid: (p.x + xs[i].x) / 2, gap: p.x - xs[i].x }));
const ordered = gaps.every((g) => g.gap > 0);
// local minima of the gap are compressions, local maxima are rarefactions
const minima = gaps.filter((g, i) => i > 0 && i < gaps.length - 1 && g.gap < gaps[i - 1].gap && g.gap <= gaps[i + 1].gap).map((g) => g.mid);
const maxima = gaps.filter((g, i) => i > 0 && i < gaps.length - 1 && g.gap > gaps[i - 1].gap && g.gap >= gaps[i + 1].gap).map((g) => g.mid);
chk(ordered, 'wave bands: no two particle lines cross');
chk(minima.length === 3 && minima.every((m, i) => Math.abs(m - (x0 + lam / 2 + i * lam)) < step), `wave bands: three compressions found near x = ${[160, 320, 480].join(', ')} (found ${minima.map((m) => m.toFixed(0)).join(', ')})`);
chk(maxima.length >= 2 && maxima.every((m) => Math.abs(((m - x0) % lam) - 0) < step || Math.abs(((m - x0) % lam) - lam) < step), 'wave bands: rarefactions lie midway between compressions');
chk(near(minima[1] - minima[0], lam, 0.03) && near(minima[2] - minima[1], lam, 0.03), 'wave bands: the distance between successive compressions is one wavelength (160 px)');
const pBase = 235;
const pAmp = 48;
const pPts = [];
for (let x = x0; x <= x0 + 480; x += 4) pPts.push(`${x} ${(pBase - pAmp * -Math.cos(kw * (x - x0))).toFixed(1)}`);
const pAt = (x) => -Math.cos(kw * (x - x0));
chk(near(pAt(160), 1, 1e-6) && near(pAt(80), -1, 1e-6) && near(pAt(240), -1, 1e-6), 'wave bands: the pressure is highest at a compression and lowest at a rarefaction');
export const WAVE_BANDS = svgDoc(
  620,
  330,
  'A sound wave in air drawn in two ways. Top: a row of vertical lines for air particles. They bunch together at compressions, marked C, and spread apart at rarefactions, marked R. Bottom: the matching graph of air pressure against distance, a wave that is highest at each compression and lowest at each rarefaction. The distance between two successive compressions is the wavelength, and the height of the pressure wave above the normal pressure line is its amplitude.',
  [
    ...xs.map((p) => S.line(p.x, 50, p.x, 116, { c: BLUE, w: 1.2 })),
    lab(160, 38, 'C', { a: 'middle', w: 'bold', c: RED }),
    lab(320, 38, 'C', { a: 'middle', w: 'bold', c: RED }),
    lab(480, 38, 'C', { a: 'middle', w: 'bold', c: RED }),
    lab(240, 38, 'R', { a: 'middle', w: 'bold', c: GREEN }),
    lab(400, 38, 'R', { a: 'middle', w: 'bold', c: GREEN }),
    lab(80, 38, 'R', { a: 'middle', w: 'bold', c: GREEN }),
    lab(560, 38, 'R', { a: 'middle', w: 'bold', c: GREEN }),
    lab(20, 84, 'air particles', { size: 10 }),
    S.line(160, 120, 160, 186, { c: MUTED, w: 1, dash: '4 3' }),
    S.line(320, 120, 320, 186, { c: MUTED, w: 1, dash: '4 3' }),
    S.line(160, 150, 320, 150, { w: 1.5 }),
    S.head(160, 150, Math.PI, { size: 7 }),
    S.head(320, 150, 0, { size: 7 }),
    lab(240, 144, 'wavelength λ', { a: 'middle', w: 'bold' }),
    S.arrow(x0, pBase + 62, x0, pBase - 70, { size: 6 }),
    S.arrow(x0, pBase, x0 + 500, pBase, { size: 6, c: MUTED, w: 1, dash: '5 4' }),
    lab(x0 + 4, pBase - 74, 'pressure', { size: 10 }),
    lab(x0 + 500, pBase + 16, 'distance', { a: 'end', size: 10 }),
    lab(240, pBase - 6, 'normal pressure', { a: 'middle', size: 10, c: MUTED }),
    S.path(`M${pPts.join(' L')}`, { c: RED, w: 3 }),
    S.line(x0 - 10, pBase - pAmp, 160, pBase - pAmp, { c: MUTED, w: 1, dash: '3 3' }),
    S.arrow(x0 - 8, pBase - 4, x0 - 8, pBase - pAmp, { size: 6, w: 1.5 }),
    lab(x0 - 14, pBase - pAmp / 2 + 4, 'amplitude', { a: 'end', size: 10 }),
    lab(172, pBase - pAmp - 8, 'high pressure', { size: 10 }),
    lab(240, pBase + pAmp + 16, 'low pressure', { a: 'middle', size: 10 }),
    lab(310, 322, 'C: compression (particles crowded, pressure high)   R: rarefaction (particles spread out, pressure low)', { a: 'middle', size: 10 }),
  ].join(''),
);

// 2. Pitch and loudness: waves with different frequency (same amplitude) and different amplitude (same frequency).
const panels = [
  { x: 20, y: 40, cyc: 2, amp: 28, head: 'Low pitch: 2 vibrations in the box', sub: 'low frequency, same amplitude' },
  { x: 300, y: 40, cyc: 4, amp: 28, head: 'High pitch: 4 vibrations in the box', sub: 'higher frequency, same amplitude' },
  { x: 20, y: 190, cyc: 3, amp: 14, head: 'Soft sound: small amplitude', sub: 'same frequency, 3 vibrations' },
  { x: 300, y: 190, cyc: 3, amp: 28, head: 'Loud sound: large amplitude', sub: 'same frequency, 3 vibrations' },
];
const pw = 260;
const ph = 100;
const waveData = panels.map((p) => {
  const pts = [];
  let maxA = 0;
  for (let i = 0; i <= 200; i++) {
    const x = (pw * i) / 200;
    const y = p.amp * Math.sin((2 * Math.PI * p.cyc * x) / pw);
    maxA = Math.max(maxA, Math.abs(y));
    pts.push(`${(p.x + x).toFixed(1)} ${(p.y + ph / 2 - y).toFixed(1)}`);
  }
  return { pts, maxA };
});
chk(waveData[1].maxA > 27 && waveData[0].maxA > 27 && near(waveData[0].maxA, waveData[1].maxA, 0.02), 'pitch waves: the low-pitch and high-pitch waves have the same amplitude');
chk(panels[1].cyc === 2 * panels[0].cyc, 'pitch waves: the high-pitch wave has twice as many vibrations in the same time (twice the frequency)');
chk(panels[2].cyc === panels[3].cyc && near(panels[3].amp / panels[2].amp, 2, 1e-9) && near(waveData[3].maxA / waveData[2].maxA, 2, 0.03), 'loud waves: the loud wave has twice the amplitude and the same frequency as the soft wave');
export const PITCH_LOUD = svgDoc(
  580,
  330,
  'Four sound waves. Top row, pitch: the left wave has 2 vibrations in the box and the right wave has 4 vibrations in the same time, so the right wave has double the frequency and a higher pitch, while the amplitude is the same. Bottom row, loudness: both waves have 3 vibrations in the box, so the frequency and pitch are the same, but the right wave has double the amplitude and sounds louder.',
  panels.flatMap((p, i) => [
    lab(p.x + pw / 2, p.y - 22, p.head, { a: 'middle', w: 'bold' }),
    lab(p.x + pw / 2, p.y - 8, p.sub, { a: 'middle', size: 10 }),
    S.rect(p.x, p.y, pw, ph, { c: MUTED, sw: 1 }),
    S.line(p.x, p.y + ph / 2, p.x + pw, p.y + ph / 2, { c: MUTED, w: 1, dash: '4 3' }),
    S.path(`M${waveData[i].pts.join(' L')}`, { c: i < 2 ? BLUE : RED, w: 2.5 }),
  ]).join('') + lab(290, 322, 'Each box shows the same length of time. More waves in the box means a higher frequency.', { a: 'middle', size: 10 }),
);

// 3. The range of hearing on a logarithmic frequency scale from 1 Hz to 10 MHz.
const fx = (f) => 40 + Math.log10(f) * 70;
const ticks = [[1, '1 Hz'], [10, '10'], [100, '100'], [1e3, '1 kHz'], [1e4, '10 kHz'], [1e5, '100 kHz'], [1e6, '1 MHz'], [1e7, '10 MHz']];
chk(near(fx(20000) - fx(20), 3 * 70, 1e-9) && fx(20) < fx(20000), 'audible bar: 20 Hz to 20 000 Hz spans exactly three tenfold steps (decades) on the log scale');
chk(fx(15) < fx(20) && fx(25000) > fx(20000) && fx(50000) > fx(20000), 'audible bar: 15 Hz is in the infrasound part and 25 kHz and 50 kHz are in the ultrasound part');
export const AUDIBLE = svgDoc(
  600,
  300,
  'A bar showing the range of sound frequencies on a scale that goes up by a factor of ten at each tick. Infrasound is below 20 hertz. The audible range for humans is about 20 hertz to 20 000 hertz. Ultrasound is above 20 000 hertz. Examples marked: an elephant rumble at about 15 hertz in the infrasound region, a dog whistle at about 25 kilohertz and a bat call at about 50 kilohertz in the ultrasound region, and medical ultrasound scans at around a million hertz and above.',
  [
    lab(300, 22, 'Frequency scale: each step to the right is ten times larger', { a: 'middle', w: 'bold' }),
    S.rect(fx(1), 90, fx(20) - fx(1), 46, { fill: BLUE, fop: 0.3, c: BLUE }),
    S.rect(fx(20), 90, fx(20000) - fx(20), 46, { fill: GREEN, fop: 0.3, c: GREEN }),
    S.rect(fx(20000), 90, fx(1e7) - fx(20000), 46, { fill: RED, fop: 0.3, c: RED }),
    lab((fx(1) + fx(20)) / 2, 118, 'infrasound', { a: 'middle', w: 'bold', size: 10 }),
    lab((fx(20) + fx(20000)) / 2, 112, 'audible range', { a: 'middle', w: 'bold' }),
    lab((fx(20) + fx(20000)) / 2, 128, 'about 20 Hz to 20 kHz', { a: 'middle', size: 10 }),
    lab((fx(20000) + fx(1e7)) / 2, 118, 'ultrasound (above 20 kHz)', { a: 'middle', w: 'bold' }),
    S.line(fx(1), 140, fx(1e7), 140, { w: 1.5 }),
    ...ticks.flatMap(([f, t]) => [S.line(fx(f), 140, fx(f), 148, { w: 1.5 }), lab(fx(f), 162, t, { a: 'middle', size: 10 })]),
    S.arrow(fx(15), 70, fx(15), 90, { c: BLUE, w: 1.5, size: 6 }),
    lab(fx(15) + 4, 62, 'elephant rumble, about 15 Hz', { size: 10 }),
    S.arrow(fx(25000), 214, fx(25000), 136, { c: RED, w: 1.5, size: 6 }),
    lab(fx(25000) - 4, 228, 'dog whistle, about 25 kHz', { a: 'end', size: 10 }),
    S.arrow(fx(50000), 256, fx(50000), 136, { c: RED, w: 1.5, size: 6 }),
    lab(fx(50000) + 4, 270, 'bat call, about 50 kHz', { size: 10 }),
    S.arrow(fx(2e6), 70, fx(2e6), 90, { c: RED, w: 1.5, size: 6 }),
    lab(fx(2e6) + 10, 62, 'medical scan, about a million Hz', { a: 'end', size: 10 }),
    lab(40, 292, 'Hz = hertz (vibrations per second), kHz = 1000 Hz, MHz = 1 000 000 Hz. Values for animals are approximate.', { size: 10 }),
  ].join(''),
);

// 4. Sonar: a pulse goes down to the sea bed and the echo comes back.
const vW = 1500;
const tS = 1.2;
const dS = (vW * tS) / 2;
chk(near(dS, 900, 1e-9) && near(2 * dS, vW * tS, 1e-9), 'sonar: 1500 m/s and 1.2 s give a round trip of 1800 m and a depth of 900 m');
export const SONAR = svgDoc(
  560,
  300,
  'Sonar on a boat. The boat sends a pulse of ultrasound down through the water to the sea bed. The echo travels back to the boat. The echo returns after 1.2 seconds. The sound travels down and up, a distance of twice the depth. With a speed of 1500 metres per second in sea water, twice the depth is 1500 times 1.2, which is 1800 metres, so the depth is 900 metres.',
  [
    S.rect(10, 62, 540, 180, { fill: BLUE, fop: 0.12, c: BLUE, sw: 1 }),
    S.line(10, 62, 550, 62, { c: BLUE, w: 2 }),
    S.path('M150 62 L160 48 L230 48 L240 62 Z', { fill: YELLOW, fop: 0.5, c: BROWN }),
    S.line(195, 48, 195, 28, { w: 2 }),
    lab(195, 20, 'boat with sonar', { a: 'middle', size: 10 }),
    S.path('M10 242 L550 242 L550 262 L10 262 Z', { fill: BROWN, fop: 0.4, c: BROWN }),
    lab(30, 280, 'sea bed', { size: 10 }),
    S.arrow(180, 68, 180, 236, { c: RED, w: 3, size: 9, dash: '6 4' }),
    S.arrow(210, 236, 210, 68, { c: GREEN, w: 3, size: 9, dash: '6 4' }),
    lab(174, 132, 'pulse sent', { a: 'end', size: 10, c: RED, w: 'bold' }),
    lab(216, 132, 'echo returns', { size: 10, c: GREEN, w: 'bold' }),
    S.arrow(100, 62, 100, 242, { size: 6, w: 1.5 }),
    S.arrow(100, 242, 100, 62, { size: 6, w: 1.5 }),
    lab(94, 156, 'depth d', { a: 'end', w: 'bold' }),
    lab(300, 100, 'Echo returns after t = 1.2 s', { w: 'bold' }),
    lab(300, 124, 'The sound goes down and back up:'),
    lab(300, 142, 'distance = 2d = v × t'),
    lab(300, 160, `2d = ${vW} × ${tS} = ${vW * tS} m`),
    lab(300, 184, `d = ${vW * tS} ÷ 2 = ${dS} m`, { w: 'bold' }),
    lab(300, 212, 'Speed of sound in sea water: about 1500 m/s.', { size: 10 }),
  ].join(''),
);
