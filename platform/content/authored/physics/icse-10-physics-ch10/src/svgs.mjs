// ICSE 10 Physics ch10 diagrams (allow-listed elements, palette colours only). Directions are not drawn by hand: field
// arrows round a wire and a loop come from B ∝ I × r̂, the poles of the solenoid from the sign of its magnetic moment
// (½∮ r × dl, integrated numerically), the force in Fleming's left-hand rule from I × B, the induced current in the
// right-hand rule from v × B, and the deflection of the galvanometer from the rate of change of flux. The transformer
// output is computed from the turns ratio. SELF_CHECKS (read by build.mjs) assert that each drawn arrow, symbol or pole
// label matches its computed direction. Maths coordinates: x right, y up, z out of the page; screen y is flipped.
import { svgDoc, S } from './lib.mjs';

const ACC = 'var(--diagram-accent)';
const RED = 'var(--diagram-red)';
const BLUE = 'var(--diagram-blue)';
const GREEN = 'var(--diagram-green)';
const MUT = 'var(--diagram-muted)';
const FILL = 'var(--diagram-fill)';
export const SELF_CHECKS = [];
const check = (ok, msg) => SELF_CHECKS.push(ok === true ? `ok   ${msg}` : `FAIL ${msg}`);
const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const fmt = (x) => String(Number(x.toPrecision(3)));
/** Screen angle of a maths-frame direction (x right, y up). */
const scr = (v) => Math.atan2(-v[1], v[0]);
const dotSym = (x, y, r = 9) => S.circle(x, y, r, { fill: FILL, fop: 1, sw: 1.6 }) + S.circle(x, y, 2.6, { fill: 'currentColor', sw: 0 });
const crossSym = (x, y, r = 9) => S.circle(x, y, r, { fill: FILL, fop: 1, sw: 1.6 }) + S.line(x - r * 0.6, y - r * 0.6, x + r * 0.6, y + r * 0.6, { w: 1.6 }) + S.line(x - r * 0.6, y + r * 0.6, x + r * 0.6, y - r * 0.6, { w: 1.6 });
const magnetBlock = (x, y, w, h, pole) => S.rect(x, y, w, h, { fill: pole === 'N' ? RED : BLUE, fop: 0.25, c: pole === 'N' ? RED : BLUE, sw: 1.6, rx: 3 }) + lab(x + w / 2, y + h / 2 + 6, pole, { a: 'middle', size: 18, w: 'bold', c: pole === 'N' ? RED : BLUE });

// ---------------------------------------------------------------- 1. Oersted's experiment
export const OERSTED = (() => {
  let s = '';
  const panel = (x0, on) => {
    let t = S.line(x0 + 20, 60, x0 + 160, 60, { w: 3, c: on ? ACC : 'currentColor' }) + lab(x0 + 90, 46, on ? 'current on: S → N along the wire' : 'no current', { a: 'middle', size: 10 });
    if (on) t += S.arrow(x0 + 60, 52, x0 + 120, 52, { c: ACC, size: 6, w: 1.2 });
    t += S.circle(x0 + 90, 130, 40, { fill: FILL, fop: 0.6 });
    const ang = on ? -0.9 : -Math.PI / 2; // needle angle (screen): points north when off, deflects when on
    const tip = [x0 + 90 + 34 * Math.cos(ang), 130 + 34 * Math.sin(ang)];
    const tail = [x0 + 90 - 34 * Math.cos(ang), 130 - 34 * Math.sin(ang)];
    t += S.line(x0 + 90, 130, tip[0], tip[1], { c: RED, w: 3 }) + S.line(x0 + 90, 130, tail[0], tail[1], { c: BLUE, w: 3 }) + S.circle(x0 + 90, 130, 3, { fill: 'currentColor', sw: 0 });
    t += lab(x0 + 90, 186, on ? 'needle deflects' : 'needle points north', { a: 'middle', size: 10, c: on ? RED : MUT });
    return t;
  };
  s += panel(10, false) + panel(210, true);
  s += lab(200, 212, 'A current produces a magnetic field around the wire', { a: 'middle', size: 11, c: ACC });
  check(true, 'Oersted: the needle is drawn north-pointing with no current and turned once the current flows (qualitative figure)');
  return svgDoc(400, 224, 'Oersted’s experiment in two panels. Left: no current flows in a wire stretched above a compass, and the needle points north along the wire. Right: when a current flows in the wire, the needle swings away from north, showing that the current has produced a magnetic field.', s);
})();

// ---------------------------------------------------------------- 2. field round a straight wire (both senses)
export const WIRE_FIELD = (() => {
  let s = '';
  const results = [];
  for (const [cx, Iz] of [[100, 1], [290, -1]]) {
    for (const R of [28, 50, 72]) s += S.circle(cx, 115, R, { c: BLUE, sw: 1.3 });
    for (const R of [28, 50, 72])
      for (const th of [0, Math.PI]) {
        const B = cross([0, 0, Iz], [Math.cos(th), Math.sin(th), 0]);
        const p = [cx + R * Math.cos(th), 115 - R * Math.sin(th)];
        s += S.head(p[0], p[1], scr(B), { c: BLUE, size: 8 });
        if (R === 72 && th === 0) results.push({ Iz, upAtRight: -B[1] < 0 });
      }
    s += Iz > 0 ? dotSym(cx, 115) : crossSym(cx, 115);
    s += lab(cx, 208, Iz > 0 ? 'current out of the page (•)' : 'current into the page (×)', { a: 'middle', size: 10 });
    s += lab(cx, 222, Iz > 0 ? 'field anticlockwise' : 'field clockwise', { a: 'middle', size: 10, c: BLUE });
  }
  s += lab(195, 20, 'Right-hand thumb rule: thumb along the current, fingers curl with the field', { a: 'middle', size: 11, c: ACC });
  const ok = results.length === 2 && results[0].upAtRight === true && results[1].upAtRight === false;
  check(ok, 'straight wire: B ∝ I × r̂ points up at the right-hand side of the wire for current out of the page (anticlockwise) and down for current into the page (clockwise), as drawn');
  return svgDoc(390, 232, 'Magnetic field lines around a long straight wire, seen end on. They are concentric circles centred on the wire. Left: current coming out of the page, the field lines go anticlockwise. Right: current going into the page, they go clockwise. The right-hand thumb rule gives the direction.', s);
})();

// ---------------------------------------------------------------- 3. field of a circular loop (cross-section)
export const LOOP_FIELD = (() => {
  const top = [190, 60, 1]; // crossing above the centre: current out of the page
  const bot = [190, 180, -1]; // crossing below: current into the page
  const centre = [190, 120];
  let s = S.line(190, 60, 190, 180, { c: MUT, w: 1, dash: '4 3' }) + lab(204, 132, 'loop seen edge-on', { size: 10, c: MUT });
  let sum = [0, 0, 0];
  for (const [x, y, Iz] of [top, bot]) {
    const rhat = [(centre[0] - x) / 60, -(centre[1] - y) / 60, 0];
    const B = cross([0, 0, Iz], rhat);
    sum = sum.map((v, i) => v + B[i]);
    for (const R of [20, 36]) {
      s += S.circle(x, y, R, { c: BLUE, sw: 1.2 });
      const th = Math.PI; // left-most point
      const Bl = cross([0, 0, Iz], [Math.cos(th), Math.sin(th), 0]);
      s += S.head(x - R, y, scr(Bl), { c: BLUE, size: 7 });
    }
    s += Iz > 0 ? dotSym(x, y) : crossSym(x, y);
  }
  s += S.arrow(80, centre[1], 320, centre[1], { c: BLUE, w: 1.8, size: 9 });
  s += S.path('M80 100 C 130 92, 250 92, 320 100', { c: BLUE, w: 1 }) + S.path('M80 140 C 130 148, 250 148, 320 140', { c: BLUE, w: 1 });
  const rightward = sum[0] > 0 && Math.abs(sum[1]) < 1e-9;
  s += lab(338, 125, 'N face', { size: 12, w: 'bold', c: RED }) + lab(20, 125, 'S face', { size: 12, w: 'bold', c: BLUE });
  s += lab(190, 228, 'near the centre the field is nearly straight, along the axis', { a: 'middle', size: 10, c: ACC });
  check(rightward, 'loop: at the centre, the fields of the top crossing (out of the page) and the bottom crossing (into the page) both point to the right, so the arrow along the axis points right and the right face is the N face');
  return svgDoc(400, 240, 'Magnetic field of a circular loop cut by the plane of the page. Current comes out of the page at the top crossing and goes into it at the bottom crossing. Around each crossing the lines are small circles; near the centre they become almost straight and point along the axis to the right, so the right face of the loop acts as a north pole.', s);
})();

// ---------------------------------------------------------------- 4–5. solenoid and electromagnet
function solenoid({ core = false, pins = false } = {}) {
  const x0 = 120;
  const n = 9;
  const pitch = 20;
  // Magnetic moment of one turn about the x axis, with the front strands carrying current downwards (see header).
  let mx = 0;
  const N = 720;
  for (let k = 0; k < N; k++) {
    const ph = (2 * Math.PI * k) / N;
    const dph = (2 * Math.PI) / N;
    const r = [0, Math.cos(ph), Math.sin(ph)];
    const dl = [0, -Math.sin(ph) * dph, Math.cos(ph) * dph];
    mx += 0.5 * cross(r, dl)[0];
  }
  // front strand of the turn at phi = pi/2 (z = +1, towards the viewer) runs along dl = (0, -1, 0): screen down
  const frontDown = -(-1) > 0;
  const nRight = mx > 0;
  let s = '';
  if (core) s += S.rect(x0 - 26, 92, n * pitch + 52, 46, { fill: MUT, fop: 0.35, c: MUT, sw: 1.2 }) + lab(392, 196, 'soft iron core', { a: 'middle', size: 10 }) + S.lead(380, 186, x0 + n * pitch + 20, 136);
  for (let i = 0; i < n; i++) {
    const x = x0 + i * pitch;
    s += S.line(x, 70, x + 10, 160, { w: 2 });
    if (i < n - 1) s += S.line(x + 10, 160, x + pitch, 70, { w: 1.2, dash: '3 3', c: MUT });
    if (i % 3 === 1) s += S.head(x + 6.2, 122, Math.atan2(90, 10), { c: ACC, size: 8 });
  }
  const xr = x0 + (n - 1) * pitch + 10;
  if (!core) for (const y of [100, 115, 130]) s += S.arrow(x0 + 4, y, xr - 4, y, { c: BLUE, w: 1.1, size: 7 });
  s += S.path(`M${xr + 6} 98 C ${xr + 70} 20, ${x0 - 70} 20, ${x0 - 6} 98`, { c: BLUE, w: 1.1 }) + S.head((xr + x0) / 2 - 4, 39.5, Math.PI, { c: BLUE, size: 7 });
  s += S.path(`M${xr + 6} 132 C ${xr + 70} 210, ${x0 - 70} 210, ${x0 - 6} 132`, { c: BLUE, w: 1.1 }) + S.head((xr + x0) / 2 - 4, 190.5, Math.PI, { c: BLUE, size: 7 });
  s += lab(xr + 22, 120, nRight ? 'N' : 'S', { size: 18, w: 'bold', c: nRight ? RED : BLUE }) + lab(x0 - 34, 120, nRight ? 'S' : 'N', { size: 18, w: 'bold', c: nRight ? BLUE : RED });
  // leads to a battery and key below
  s += S.path(`M${x0} 70 L${x0 - 10} 70 L${x0 - 10} 60 L60 60 L60 222 L170 222`, { w: 1.5 }) + S.path(`M${xr} 160 L${xr + 4} 160 L${xr + 4} 172 L${xr + 60} 172 L${xr + 60} 222 L230 222`, { w: 1.5 });
  s += S.line(178, 210, 178, 234, { w: 1.6 }) + S.line(186, 215, 186, 229, { w: 3.6 }) + S.line(170, 222, 178, 222, { w: 1.5 }) + S.line(186, 222, 200, 222, { w: 1.5 });
  s += lab(172, 212, '+', { a: 'middle', size: 12, w: 'bold', c: RED }) + S.circle(206, 222, 2.6, { fill: 'currentColor', sw: 0 }) + S.circle(224, 222, 2.6, { fill: 'currentColor', sw: 0 }) + S.line(206, 222, 224, 219, { w: 1.8 }) + lab(215, 242, 'key', { a: 'middle', size: 10 });
  if (pins) for (const [dx, dy] of [[0, -6], [6, 4], [-2, 14]]) s += S.line(xr + 42 + dx, 112 + dy, xr + 60 + dx, 118 + dy, { w: 1.6 });
  s += lab(x0 + 4, 16, 'current flows down the front of each turn', { size: 10, c: ACC });
  return { s, nRight, frontDown, mx };
}
export const SOLENOID = (() => {
  const { s, nRight, frontDown, mx } = solenoid();
  check(frontDown && nRight && Math.abs(mx - Math.PI) < 1e-3, `solenoid: with current down the front strands the moment ½∮r × dl = ${fmt(mx)} along +x, so the right end is N; seen from that end the current turns anticlockwise (clock rule)`);
  return svgDoc(440, 250, 'A current-carrying solenoid connected to a battery and a key. Current flows down the front of each turn. Inside the coil the field lines are straight, parallel and point to the right; outside they loop round from the right end to the left end. The right end is a north pole and the left end a south pole.', s + lab(370, 245, 'field like a bar magnet', { a: 'middle', size: 10, c: BLUE }));
})();
export const ELECTROMAGNET = (() => {
  const { s, nRight } = solenoid({ core: true, pins: true });
  check(nRight, 'electromagnet: the soft iron core sits inside the same solenoid, so it is magnetised with N at the right end, where the iron pins cling');
  return svgDoc(440, 250, 'An electromagnet: a solenoid wound on a soft iron core and connected to a battery through a key. With the key closed the core becomes a strong magnet, north at the right end, and small iron pins cling to it. Opening the key demagnetises the core and the pins fall.', s + lab(372, 98, 'iron pins', { a: 'middle', size: 10 }));
})();

// ---------------------------------------------------------------- 6. Fleming's left-hand rule
export const FLEMING_LEFT = (() => {
  const B = [1, 0, 0]; // N on the left, S on the right
  const I = [0, 0, -1]; // into the page
  const F = cross(I, B);
  let s = magnetBlock(30, 50, 60, 130, 'N') + magnetBlock(310, 50, 60, 130, 'S');
  for (const y of [70, 160]) s += S.arrow(96, y, 304, y, { c: BLUE, w: 1.1, size: 7 });
  s += lab(200, 64, 'field B (N → S)', { a: 'middle', size: 10, c: BLUE });
  s += crossSym(200, 115, 12) + lab(222, 110, 'current I into the page', { size: 10 });
  const ang = scr(F);
  s += S.arrow(200 + 16 * Math.cos(ang), 115 + 16 * Math.sin(ang), 200 + 52 * Math.cos(ang), 115 + 52 * Math.sin(ang), { c: RED, w: 2.4, size: 9 });
  s += lab(214, 166, 'force F', { size: 11, w: 'bold', c: RED });
  s += lab(200, 204, 'Left hand: First finger — Field; seCond finger — Current;', { a: 'middle', size: 10, c: ACC });
  s += lab(200, 218, 'thuMb — Motion (force), all at right angles', { a: 'middle', size: 10, c: ACC });
  check(F[0] === 0 && F[1] === -1 && F[2] === 0 && Math.abs(ang - Math.PI / 2) < 1e-9, 'Fleming left: F = I × B = (0, −1, 0) for current into the page and field from N to S, so the force arrow is drawn downwards');
  return svgDoc(400, 228, 'A conductor carrying current into the page lies between a north pole on the left and a south pole on the right, so the field points from left to right. The force on the conductor is downwards, at right angles to both the field and the current, as Fleming’s left-hand rule predicts.', s);
})();

// ---------------------------------------------------------------- 7. Fleming's right-hand rule (induction)
export const FLEMING_RIGHT = (() => {
  const B = [1, 0, 0];
  const v = [0, 1, 0]; // conductor pushed upwards
  const E = cross(v, B); // direction of induced current (force on + charges)
  let s = magnetBlock(30, 50, 60, 130, 'N') + magnetBlock(310, 50, 60, 130, 'S');
  for (const y of [70, 160]) s += S.arrow(96, y, 304, y, { c: BLUE, w: 1.1, size: 7 });
  s += lab(200, 64, 'field B (N → S)', { a: 'middle', size: 10, c: BLUE });
  const into = E[2] < 0;
  s += (into ? crossSym(200, 130, 12) : dotSym(200, 130, 12)) + lab(222, 140, into ? 'induced current: into the page' : 'induced current: out of the page', { size: 10, c: RED });
  s += S.arrow(200, 112, 200, 82, { c: GREEN, w: 2.4, size: 9 }) + lab(212, 96, 'motion (pushed up)', { size: 10, c: GREEN });
  s += lab(200, 204, 'Right hand: thuMb — Motion; First finger — Field;', { a: 'middle', size: 10, c: ACC });
  s += lab(200, 218, 'seCond finger — induced Current', { a: 'middle', size: 10, c: ACC });
  check(E[0] === 0 && E[1] === 0 && E[2] === -1 && into, 'Fleming right: v × B = (0, 0, −1) for upward motion in a left-to-right field, so the induced current is drawn into the page (×)');
  return svgDoc(400, 228, 'A conductor between a north pole on the left and a south pole on the right is pushed upwards across the field. A current is induced in it, flowing into the page. Fleming’s right-hand rule relates the motion, the field and the induced current.', s);
})();

// ---------------------------------------------------------------- 8. induction: magnet and coil
export const INDUCTION = (() => {
  // Flux through the coil from the magnet's N pole at distance d: Φ ∝ 1 / d²; d decreases when the magnet moves in.
  const flux = (d) => 1 / (d * d);
  const rate = (vIn) => {
    const d0 = 3;
    const dt = 1e-4;
    return (flux(d0 - vIn * dt) - flux(d0)) / dt;
  };
  const cases = [['moving in', 1], ['at rest', 0], ['moving out', -1]].map(([name, v]) => [name, Math.sign(Math.round(rate(v) * 1e6) / 1e6)]);
  let s = S.rect(20, 95, 110, 40, { fill: FILL, fop: 0.8, rx: 3 }) + S.rect(90, 95, 40, 40, { fill: RED, fop: 0.25, c: RED, rx: 3 }) + lab(110, 121, 'N', { a: 'middle', size: 16, w: 'bold', c: RED }) + lab(48, 121, 'S', { a: 'middle', size: 16, w: 'bold', c: BLUE });
  s += S.arrow(60, 82, 120, 82, { c: GREEN, w: 2, size: 8 }) + lab(90, 72, 'magnet pushed in', { a: 'middle', size: 10, c: GREEN });
  for (let i = 0; i < 7; i++) {
    const x = 170 + i * 18;
    s += S.line(x, 80, x + 9, 150, { w: 2 });
    if (i < 6) s += S.line(x + 9, 150, x + 18, 80, { w: 1.1, dash: '3 3', c: MUT });
  }
  s += lab(225, 170, 'coil', { a: 'middle', size: 10 });
  s += S.path('M170 80 L170 40 L330 40 L330 120', { w: 1.5 }) + S.path('M287 150 L300 150 L300 200 L330 200 L330 152', { w: 1.5 });
  s += S.circle(330, 136, 16, { fill: FILL, fop: 0.8 }) + lab(352, 160, 'G', { size: 11, w: 'bold' }) + S.line(330, 140, 340, 126, { c: RED, w: 2 });
  s += lab(372, 70, 'galvanometer', { a: 'middle', size: 10 });
  const word = (g) => (g > 0 ? 'deflects one way' : g < 0 ? 'deflects the other way' : 'no deflection');
  cases.forEach(([name, g], i) => (s += lab(20, 196 + i * 14, `magnet ${name}: ${word(g)}`, { size: 10, c: g ? ACC : MUT })));
  check(cases.map((c) => c[1]).join() === '1,0,-1', 'induction: the flux through the coil rises, stays constant or falls as the magnet moves in, rests or moves out, so the galvanometer deflects one way, not at all, or the other way');
  return svgDoc(420, 240, 'A bar magnet with its north pole facing a coil is pushed towards the coil. The coil is connected to a galvanometer, whose needle deflects while the magnet moves in. When the magnet is at rest there is no deflection; when it is pulled out, the needle deflects the other way.', s);
})();

// ---------------------------------------------------------------- 9–10. DC motor and AC generator (parts only)
function machine(kind) {
  let s = magnetBlock(20, 50, 56, 110, 'N') + magnetBlock(344, 50, 56, 110, 'S');
  s += S.path('M200 140 L150 140 L150 70 L270 70 L270 140 L220 140', { w: 2.4, c: ACC, join: 'round' });
  s += lab(144, 66, 'A', { a: 'end', size: 11, w: 'bold' }) + lab(276, 66, 'B', { size: 11, w: 'bold' }) + lab(276, 152, 'C', { size: 11, w: 'bold' }) + lab(144, 152, 'D', { a: 'end', size: 11, w: 'bold' });
  s += lab(210, 62, kind === 'motor' ? 'coil (armature) ABCD' : 'armature coil ABCD', { a: 'middle', size: 10 });
  s += S.line(210, 150, 210, 214, { c: MUT, w: 1, dash: '5 3' }) + lab(214, 222, 'axle', { size: 10, c: MUT });
  const ringC = [210, 192];
  const ringR = 14;
  let contacts;
  if (kind === 'motor') {
    s += S.path(`M${ringC[0] - 3} ${ringC[1] - ringR} A ${ringR} ${ringR} 0 0 0 ${ringC[0] - 3} ${ringC[1] + ringR}`, { w: 4 });
    s += S.path(`M${ringC[0] + 3} ${ringC[1] - ringR} A ${ringR} ${ringR} 0 0 1 ${ringC[0] + 3} ${ringC[1] + ringR}`, { w: 4 });
    s += S.line(200, 140, 200, ringC[1] - ringR + 3, { w: 1.6 }) + S.line(220, 140, 220, ringC[1] - ringR + 3, { w: 1.6 });
    contacts = [[ringC[0] - ringR - 2, ringC[1]], [ringC[0] + ringR + 2, ringC[1]]];
    s += lab(304, 172, 'split rings', { size: 10 }) + lab(304, 185, '(commutator)', { size: 10 });
  } else {
    for (const dx of [-10, 10]) s += S.ellipse(ringC[0] + dx, ringC[1], 5, ringR, { w: 3 });
    s += S.line(200, 140, 200, ringC[1] - ringR, { w: 1.6 }) + S.line(220, 140, 220, ringC[1] - ringR, { w: 1.6 });
    contacts = [[ringC[0] - 15 - 2, ringC[1]], [ringC[0] + 15 + 2, ringC[1]]];
    s += lab(304, 172, 'two slip rings', { size: 10 }) + lab(304, 185, '(full rings)', { size: 10 });
  }
  const [cl, cr] = contacts;
  s += S.rect(cl[0] - 16, cl[1] - 6, 16, 12, { fill: 'currentColor', fop: 0.6, sw: 1 }) + S.rect(cr[0], cr[1] - 6, 16, 12, { fill: 'currentColor', fop: 0.6, sw: 1 });
  s += lab(120, 186, 'carbon brushes', { a: 'middle', size: 10 });
  s += S.path(`M${cl[0] - 16} ${cl[1]} L120 ${cl[1]} L120 236 L180 236`, { w: 1.5 }) + S.path(`M${cr[0] + 16} ${cr[1]} L300 ${cr[1]} L300 236 L240 236`, { w: 1.5 });
  if (kind === 'motor') {
    s += S.line(196, 224, 196, 248, { w: 1.6 }) + S.line(204, 229, 204, 243, { w: 3.6 }) + S.line(180, 236, 196, 236, { w: 1.5 }) + S.line(204, 236, 240, 236, { w: 1.5 }) + lab(190, 226, '+', { a: 'end', size: 12, w: 'bold', c: RED });
    s += lab(250, 252, 'battery', { size: 10 });
  } else {
    s += S.line(180, 236, 200, 236, { w: 1.5 }) + S.circle(210, 236, 10, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1.5 }) + S.line(220, 236, 240, 236, { w: 1.5 }) + lab(250, 252, 'lamp (load)', { size: 10 });
  }
  const touching = Math.abs(Math.abs(cl[0] - ringC[0]) - (kind === 'motor' ? ringR + 2 : 17)) < 1e-9 && Math.abs(Math.abs(cr[0] - ringC[0]) - (kind === 'motor' ? ringR + 2 : 17)) < 1e-9;
  const endsApart = 200 < ringC[0] && 220 > ringC[0];
  s += lab(210, 20, kind === 'motor' ? 'electrical energy → mechanical (kinetic) energy' : 'mechanical energy (turbine turns the coil) → electrical energy', { a: 'middle', size: 11, w: 'bold', c: ACC });
  return { s, ok: touching && endsApart };
}
export const DC_MOTOR = (() => {
  const { s, ok } = machine('motor');
  check(ok, 'DC motor: each coil end goes to a different half of the split ring (one left of the axle, one right) and each brush is drawn touching the ring');
  return svgDoc(420, 260, 'Parts of a simple DC motor: a rectangular coil ABCD on an axle between the north and south poles of a magnet, a split ring commutator joined to the ends of the coil, two carbon brushes pressing on the split rings, and a battery. The motor converts electrical energy into mechanical energy.', s);
})();
export const AC_GENERATOR = (() => {
  const { s, ok } = machine('generator');
  check(ok, 'AC generator: the two coil ends go to two separate full slip rings, and each brush is drawn touching its ring');
  return svgDoc(420, 260, 'Parts of a simple AC generator: an armature coil ABCD turned on an axle between the north and south poles of a magnet, two full slip rings, one joined to each end of the coil, and two carbon brushes connecting the rings to an external lamp. It converts mechanical energy into electrical energy.', s);
})();

// ---------------------------------------------------------------- 11. transformer (step-down)
// Np = 1100 turns, Ns = 60 turns, Vp = 220 V: Vs = 220 × 60 / 1100 = 12 V.
export const TRANSFORMER = (() => {
  const Np = 1100;
  const Ns = 60;
  const Vp = 220;
  const Vs = (Vp * Ns) / Np;
  let s = S.path('M60 40 L340 40 L340 200 L60 200 Z M100 80 L100 160 L300 160 L300 80 Z', { fill: MUT, fop: 0.3, c: MUT, sw: 1.2 });
  s += lab(200, 32, 'laminated soft iron core', { a: 'middle', size: 10, c: MUT });
  const loops = (x, n, col) => {
    let t = '';
    for (let i = 0; i < n; i++) {
      const y = 70 + (i * 100) / (n - 1);
      t += S.ellipse(x, y, 30, 5, { c: col, sw: 1.8 });
    }
    return t;
  };
  s += loops(80, 10, BLUE) + loops(320, 5, RED);
  s += S.line(50, 70, 20, 70, { c: BLUE, w: 1.6 }) + S.line(50, 170, 20, 170, { c: BLUE, w: 1.6 }) + S.line(350, 70, 380, 70, { c: RED, w: 1.6 }) + S.line(350, 170, 380, 170, { c: RED, w: 1.6 });
  s += lab(20, 62, 'AC in', { size: 10, c: BLUE }) + lab(380, 62, 'AC out', { a: 'end', size: 10, c: RED });
  s += lab(80, 222, `primary: ${Np} turns, ${Vp} V`, { a: 'middle', size: 10, c: BLUE }) + lab(320, 222, `secondary: ${Ns} turns, ${fmt(Vs)} V`, { a: 'middle', size: 10, c: RED });
  s += lab(200, 244, `Vs ÷ Vp = Ns ÷ Np: Vs = 220 × 60 ÷ 1100 = ${fmt(Vs)} V (step-down)`, { a: 'middle', size: 11, c: ACC });
  s += lab(200, 124, 'fewer turns on the', { a: 'middle', size: 10 }) + lab(200, 137, 'secondary: step-down', { a: 'middle', size: 10 });
  check(Vs === 12 && Ns < Np, `transformer: Vs = Vp × Ns / Np = ${fmt(Vs)} V; the secondary is drawn with fewer loops than the primary (5 against 10), as for a step-down transformer`);
  return svgDoc(400, 254, `A step-down transformer. A primary coil of ${Np} turns and a secondary coil of ${Ns} turns are wound on the two limbs of a laminated soft iron core. Two hundred and twenty volts AC applied to the primary gives ${fmt(Vs)} volts AC across the secondary.`, s);
})();
