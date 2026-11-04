// SVG diagrams for ISC 11 Biology ch19 Locomotion and Movement. All lengths and counts come from calc.mjs.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { GEO, REL, CON, B_REL, B_CON, T_SINGLE, T_SUM, T_TET, AXIAL, AXIAL_N, APPEND, APPEND_N, TOTAL, SKULL, SKULL_N, VERT_N, RIB_N, VERT, RIBS } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sm = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });

// ---------------------------------------------------------------- sarcomere drawing (shared by the labelled and lettered figures)
const SC = 70; // pixels per micrometre
function sarc(x0, y0, length, { brackets = true } = {}) {
  const b = length === REL ? B_REL : length === CON ? B_CON : null;
  const w = length * SC;
  const zL = x0;
  const zR = x0 + w;
  const mid = (zL + zR) / 2;
  const aL = mid - (GEO.a * SC) / 2;
  const aR = mid + (GEO.a * SC) / 2;
  const tL = zL + GEO.thin * SC;
  const tR = zR - GEO.thin * SC;
  const thinRows = [y0 + 8, y0 + 28, y0 + 48];
  const thickRows = [y0 + 18, y0 + 38];
  let g = '';
  for (const y of thinRows) g += S.line(zL, y, tL, y, { c: 'var(--diagram-green)', w: 2 }) + S.line(tR, y, zR, y, { c: 'var(--diagram-green)', w: 2 });
  for (const y of thickRows) g += S.line(aL, y, aR, y, { c: 'var(--diagram-blue)', w: 5 });
  g += S.line(zL, y0 - 2, zL, y0 + 58, { w: 3 }) + S.line(zR, y0 - 2, zR, y0 + 58, { w: 3 });
  g += S.line(mid, y0 + 12, mid, y0 + 44, { c: 'var(--diagram-muted)', w: 1, dash: '2 2' });
  if (brackets) {
    const yb = y0 + 70;
    g += S.arrow(zL, yb, aL, yb, { size: 5, w: 1 }) + S.arrow(aL, yb, zL, yb, { size: 5, w: 1 });
    g += S.arrow(aL, yb, aR, yb, { size: 5, w: 1 }) + S.arrow(aR, yb, aL, yb, { size: 5, w: 1 });
    g += S.arrow(aR, yb, zR, yb, { size: 5, w: 1 }) + S.arrow(zR, yb, aR, yb, { size: 5, w: 1 });
    g += sm((zL + aL) / 2, yb + 14, 'I band', { a: 'middle' }) + sm(mid, yb + 14, 'A band', { a: 'middle' }) + sm((aR + zR) / 2, yb + 14, 'I band', { a: 'middle' });
    g += S.arrow(zL, yb + 26, zR, yb + 26, { size: 5, w: 1 }) + S.arrow(zR, yb + 26, zL, yb + 26, { size: 5, w: 1 });
    g += sm(mid, yb + 40, `Sarcomere: ${length} µm`, { a: 'middle' });
    g += S.line(tL, y0 - 8, tR, y0 - 8, { w: 1, c: 'var(--diagram-red)' }) + S.line(tL, y0 - 11, tL, y0 - 5, { w: 1, c: 'var(--diagram-red)' }) + S.line(tR, y0 - 11, tR, y0 - 5, { w: 1, c: 'var(--diagram-red)' });
    g += sm(mid, y0 - 14, b && b.h === 0 ? 'H zone (closed)' : 'H zone', { a: 'middle', c: 'var(--diagram-red)' });
  }
  return { g, zL, zR, mid, aL, aR, tL, tR, rows: { thin: thinRows, thick: thickRows } };
}

// 1. Sarcomere relaxed and contracted
const P1 = sarc(120, 50, REL);
const P2 = sarc(120, 190, CON);
export const SARCOMERE = svgDoc(
  480,
  340,
  `A sarcomere drawn relaxed (${REL} micrometres) and contracted (${CON} micrometres). Thin actin filaments are attached to the Z lines at each end and thick myosin filaments lie in the middle with a dotted M line. On contraction the Z lines come closer, the I band (${B_REL.i} to ${B_CON.i} micrometres in total) and the H zone (${B_REL.h} to ${B_CON.h} micrometres) become narrower, and the A band stays ${GEO.a} micrometres wide`,
  [
    P1.g, P2.g,
    lab(8, 80, 'Relaxed', { w: 'bold' }), lab(8, 220, 'Contracted', { w: 'bold' }),
    sm(P1.zR + 14, 58, 'Thin filament (actin)', { c: 'var(--diagram-green)' }), S.lead(P1.zR - 20, 58, P1.zR + 12, 55),
    sm(P1.zR + 14, 80, 'Thick filament (myosin)', { c: 'var(--diagram-blue)' }), S.lead(P1.aR - 10, 68, P1.zR + 12, 77),
    sm(P1.zR + 14, 40, 'Z line'), S.lead(P1.zR, 46, P1.zR + 12, 38),
    sm(P1.mid + 10, 112, 'M line', { c: 'var(--diagram-muted)' }), S.lead(P1.mid + 8, 106, P1.mid + 1, 97),
    sm(P2.zR + 14, 198, 'Z lines nearer'), S.lead(P2.zR, 196, P2.zR + 12, 196),
    sm(P2.zR + 14, 212, 'A band unchanged'),
  ].join(''),
);

// 2. Lettered sarcomere for diagram-based questions
const Q = sarc(90, 60, REL, { brackets: false });
export const SARC_Q = svgDoc(
  380,
  190,
  'A relaxed sarcomere with five parts marked by letters: A the dark vertical line at the left end where the thin filaments are anchored, B the region at the left end that contains only thin filaments, C the whole region occupied by the thick filaments, D the central gap between the ends of the thin filaments, and E the dotted line in the middle of the thick filaments',
  [
    Q.g,
    tag(Q.zL, 24, 'A'), S.lead(Q.zL, 33, Q.zL, 56),
    tag(Q.zL + 22, 150, 'B'), S.lead(Q.zL + 22, 141, Q.zL + 22, 112),
    tag(Q.aR - 14, 150, 'C'), S.lead(Q.aR - 14, 141, Q.aR - 14, 100),
    tag(Q.mid - 20, 24, 'D'), S.lead(Q.mid - 20, 33, Q.mid - 20, 64),
    tag(Q.mid, 150, 'E'), S.lead(Q.mid, 141, Q.mid, 106),
  ].join(''),
);

// 3. Contractile filaments: thin filament and a myosin molecule
const beadsPath = (x, y, n, phase) => Array.from({ length: n }, (_, i) => S.circle(x + i * 11, y + Math.sin(i * 0.9 + phase) * 7, 4.5, { fill: 'var(--diagram-green)', fop: 0.35, sw: 1 })).join('');
export const FILAMENTS = svgDoc(
  480,
  280,
  'Top: a thin filament made of two strands of globular actin beads twisted together, with a thread of tropomyosin lying in the groove and a troponin complex at intervals. Bottom: one myosin molecule with a long tail (light meromyosin) and a double head (heavy meromyosin), whose head carries the ATP-splitting site and the actin-binding site',
  [
    beadsPath(40, 60, 31, 0), beadsPath(40, 60, 31, Math.PI),
    S.path('M40 60 ' + Array.from({ length: 31 }, (_, i) => `L${40 + i * 11} ${60 + Math.sin(i * 0.9 + 1.57) * 3}`).join(' '), { c: 'var(--diagram-red)', w: 1.5 }),
    ...[90, 200, 310].map((x) => S.rect(x - 6, 52, 14, 16, { rx: 3, fill: 'var(--diagram-yellow)', fop: 0.6, sw: 1 })),
    lab(40, 22, 'Thin filament', { w: 'bold' }),
    sm(40, 106, 'Actin beads (two strands)', { c: 'var(--diagram-green)' }),
    sm(190, 106, 'Tropomyosin thread', { c: 'var(--diagram-red)' }), S.lead(215, 98, 230, 63),
    sm(330, 106, 'Troponin complex', { c: 'var(--diagram-brown)' }), S.lead(345, 98, 316, 68),
    lab(40, 150, 'Myosin molecule', { w: 'bold' }),
    S.path('M60 215 L330 215', { w: 3, c: 'var(--diagram-blue)' }),
    S.path('M330 215 C350 200 370 190 392 188', { w: 3, c: 'var(--diagram-blue)' }), S.path('M330 215 C352 222 372 224 394 220', { w: 3, c: 'var(--diagram-blue)' }),
    S.ellipse(405, 187, 16, 9, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.5 }), S.ellipse(407, 221, 16, 9, { fill: 'var(--diagram-blue)', fop: 0.35, sw: 1.5 }),
    sm(60, 245, 'Tail: light meromyosin (rod)', { c: 'var(--diagram-blue)' }),
    sm(330, 166, 'Head: heavy meromyosin', { c: 'var(--diagram-blue)' }), S.lead(395, 172, 400, 180),
    sm(300, 262, 'Head has the ATPase site and', { c: 'var(--diagram-muted)' }), sm(300, 274, 'the actin-binding site', { c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. Twitch, summation and tetanus (computed superposition model)
const TX = (t) => 60 + t * 0.6;
const panel = (y0, pts, stim, title) => {
  const yb = y0 + 80;
  const toPath = 'M' + pts.map(([t, v]) => `${TX(t).toFixed(1)} ${(yb - v * 17).toFixed(1)}`).join(' L');
  return (
    S.line(60, yb, 430, yb, { w: 1.2 }) + S.line(60, y0, 60, yb, { w: 1.2 }) +
    S.path(toPath, { w: 2.2, c: 'var(--diagram-green)' }) +
    stim.map((t) => S.arrow(TX(t), yb + 14, TX(t), yb + 2, { size: 4, w: 1.2, c: 'var(--diagram-red)' })).join('') +
    lab(66, y0 + 10, title, { w: 'bold' })
  );
};
const stimTimes = (iv, n) => Array.from({ length: n }, (_, k) => k * iv);
export const TETANUS = svgDoc(
  460,
  330,
  'Three tension recordings from the same model muscle. Top: one stimulus gives one twitch. Middle: stimuli 80 milliseconds apart arrive before relaxation is complete, so each twitch adds to the last, which is summation, and the tension rises above that of a single twitch. Bottom: stimuli 20 milliseconds apart give a smooth, sustained and much higher tension, which is tetanus. Red arrows mark the stimuli',
  [
    panel(10, T_SINGLE, stimTimes(1000, 1), 'Single twitch'),
    panel(110, T_SUM, stimTimes(80, 6), 'Summation (stimuli 80 ms apart)'),
    panel(210, T_TET, stimTimes(20, 20), 'Tetanus (stimuli 20 ms apart)'),
    lab(245, 320, 'Time (ms)', { a: 'middle' }), sm(14, 120, 'Tension', { c: 'var(--diagram-muted)' }), sm(14, 132, '(model)', { c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 5. The human skeleton as a tree of counts
const box = (cx, y, w, h, lines, c = 'var(--diagram-fill)') => S.rect(cx - w / 2, y, w, h, { rx: 5, fill: c, fop: 0.5, sw: 1.2 }) + lines.map((s, i) => S.text(cx, y + 15 + i * 12, s, { a: 'middle', size: 10, w: i === lines.length - 1 ? 'bold' : undefined })).join('');
const leaves = [
  ['Skull', AXIAL.skull], ['Vertebral', 'column', AXIAL.vertebral], ['Sternum', AXIAL.sternum], ['Ribs', AXIAL.ribs],
  ['Pectoral', 'girdle', APPEND.pectoral], ['Upper', 'limbs', APPEND.upper], ['Pelvic', 'girdle', APPEND.pelvic], ['Lower', 'limbs', APPEND.lower],
].map((l) => [...l.slice(0, -1), String(l[l.length - 1])]);
const LX = (i) => 40 + i * 57.5;
export const SKELETON = svgDoc(
  480,
  250,
  `Classification of the ${TOTAL} bones of the adult human skeleton. Axial skeleton ${AXIAL_N}: skull ${AXIAL.skull}, vertebral column ${AXIAL.vertebral}, sternum ${AXIAL.sternum}, ribs ${AXIAL.ribs}. Appendicular skeleton ${APPEND_N}: pectoral girdle ${APPEND.pectoral}, upper limbs ${APPEND.upper}, pelvic girdle ${APPEND.pelvic}, lower limbs ${APPEND.lower}. The skull count of ${SKULL_N} is the cranium ${SKULL.cranium}, face ${SKULL.face}, hyoid ${SKULL.hyoid} and ear ossicles ${SKULL.ossicles}`,
  [
    box(240, 8, 130, 34, ['Human skeleton', String(TOTAL)], 'var(--diagram-yellow)'),
    S.line(240, 42, 240, 56), S.line(98, 56, 382, 56), S.line(98, 56, 98, 70), S.line(382, 56, 382, 70),
    box(98, 70, 150, 34, ['Axial skeleton', String(AXIAL_N)], 'var(--diagram-blue)'),
    box(382, 70, 150, 34, ['Appendicular skeleton', String(APPEND_N)], 'var(--diagram-green)'),
    S.line(98, 104, 98, 118), S.line(LX(0), 118, LX(3), 118), S.line(382, 104, 382, 118), S.line(LX(4), 118, LX(7), 118),
    ...leaves.map((l, i) => S.line(LX(i), 118, LX(i), 128) + box(LX(i), 128, 54, 50, l)),
    sm(240, 205, `Skull ${SKULL_N} = cranium ${SKULL.cranium} + face ${SKULL.face} + hyoid ${SKULL.hyoid} + ear ossicles ${SKULL.ossicles}`, { a: 'middle' }),
    sm(240, 221, `Vertebral column ${VERT_N}: ${VERT.cervical} cervical, ${VERT.thoracic} thoracic, ${VERT.lumbar} lumbar, sacrum ${VERT.sacrum}, coccyx ${VERT.coccyx} (fused)`, { a: 'middle' }),
    sm(240, 237, `Ribs ${RIB_N} = ${RIBS.true + RIBS.false + RIBS.floating} pairs: ${RIBS.true} true, ${RIBS.false} false, ${RIBS.floating} floating`, { a: 'middle' }),
  ].join(''),
);

// 6. Types of synovial joint
const JT = (cx) => cx;
const jp = (cx, name, ex) => lab(cx, 138, name, { a: 'middle', w: 'bold' }) + sm(cx, 152, ex, { a: 'middle', c: 'var(--diagram-muted)' });
const ball = (cx) => S.path(`M${cx - 24} 58 A24 24 0 1 1 ${cx + 24} 58`, { w: 3, c: 'var(--diagram-blue)' }) + S.circle(cx, 44, 15, { fill: 'var(--diagram-yellow)', fop: 0.5 }) + S.rect(cx - 6, 58, 12, 50, { fill: 'var(--diagram-fill)', sw: 1.2 }) + S.path(`M${cx - 38} 40 q-6 14 4 26`, { w: 1.2, c: 'var(--diagram-red)' }) + S.head(cx - 30, 67, 1.2, { size: 5, c: 'var(--diagram-red)' });
const hinge = (cx) => S.rect(cx - 6, 12, 12, 50, { fill: 'var(--diagram-fill)', sw: 1.2 }) + S.circle(cx, 66, 8, { fill: 'var(--diagram-yellow)', fop: 0.5 }) + S.line(cx, 66, cx + 32, 106, { w: 9, c: 'var(--diagram-muted)', cap: 'round' }) + S.rect(cx - 5, 70, 10, 42, { fill: 'var(--diagram-fill)', sw: 1, dash: '3 2' }) + S.path(`M${cx + 14} 100 q12 -14 0 -26`, { w: 1.2, c: 'var(--diagram-red)' });
const pivot = (cx) => S.circle(cx, 42, 17, { w: 1, sw: 3, c: 'var(--diagram-blue)' }) + S.circle(cx, 42, 9, { fill: 'var(--diagram-yellow)', fop: 0.5 }) + S.rect(cx - 7, 58, 14, 50, { fill: 'var(--diagram-fill)', sw: 1.2 }) + S.path(`M${cx - 26} 30 A28 28 0 0 1 ${cx + 26} 30`, { w: 1.2, c: 'var(--diagram-red)' }) + S.head(cx + 26, 30, 1.9, { size: 5, c: 'var(--diagram-red)' });
const glide = (cx) => S.rect(cx - 30, 52, 60, 14, { fill: 'var(--diagram-fill)', sw: 1.2 }) + S.rect(cx - 22, 70, 60, 14, { fill: 'var(--diagram-fill)', sw: 1.2 }) + S.arrow(cx - 30, 40, cx + 30, 40, { size: 5, w: 1.2, c: 'var(--diagram-red)' }) + S.arrow(cx + 30, 94, cx - 30, 94, { size: 5, w: 1.2, c: 'var(--diagram-red)' });
const saddle = (cx) => S.path(`M${cx - 28} 22 L${cx - 28} 48 Q${cx} 74 ${cx + 28} 48 L${cx + 28} 22 Z`, { fill: 'var(--diagram-fill)', w: 1.5 }) + S.path(`M${cx - 12} 112 L${cx - 12} 78 Q${cx} 56 ${cx + 12} 78 L${cx + 12} 112 Z`, { fill: 'var(--diagram-yellow)', fop: 0.4, w: 1.5 }) + S.arrow(cx - 22, 14, cx + 22, 14, { size: 5, w: 1.2, c: 'var(--diagram-red)' }) + S.arrow(cx + 40, 62, cx + 40, 92, { size: 5, w: 1.2, c: 'var(--diagram-red)' });
export const JOINTS = svgDoc(
  480,
  165,
  'Five types of synovial joint. Ball and socket: a rounded head in a cup, moving in all directions, as at the shoulder and hip. Hinge: movement in one plane like a door, as at the elbow and knee. Pivot: a peg turning in a ring, as between the atlas and axis. Gliding: flat surfaces sliding over each other, as between the carpals. Saddle: two saddle-shaped surfaces at right angles, as at the base of the thumb',
  [
    ball(50), hinge(145), pivot(240), glide(335), saddle(430),
    jp(50, 'Ball and socket', 'shoulder, hip'), jp(145, 'Hinge', 'elbow, knee'), jp(240, 'Pivot', 'atlas and axis'), jp(335, 'Gliding', 'between carpals'), jp(430, 'Saddle', 'thumb base'),
  ].join(''),
);

// 7. Structure of a synovial joint
export const SYNOVIAL = svgDoc(
  480,
  250,
  'A synovial joint in section: the ends of two bones are covered with smooth articular cartilage and separated by a joint cavity filled with synovial fluid. The cavity is lined by the synovial membrane, which makes the fluid, and the whole joint is enclosed in a fibrous capsule strengthened by ligaments that join bone to bone',
  [
    S.path('M120 10 L120 90 Q160 108 200 90 L200 10 Z', { fill: 'var(--diagram-fill)', w: 1.5 }),
    S.path('M120 240 L120 160 Q160 142 200 160 L200 240 Z', { fill: 'var(--diagram-fill)', w: 1.5 }),
    S.path('M120 90 Q160 108 200 90 L200 160 Q160 142 120 160 Z', { fill: 'var(--diagram-blue)', fop: 0.15, w: 0 }),
    S.path('M120 90 Q160 108 200 90', { w: 5, c: 'var(--diagram-accent)', op: 0.7 }), S.path('M120 160 Q160 142 200 160', { w: 5, c: 'var(--diagram-accent)', op: 0.7 }),
    S.path('M112 70 L112 180', { w: 2, c: 'var(--diagram-blue)' }), S.path('M208 70 L208 180', { w: 2, c: 'var(--diagram-blue)' }),
    S.path('M98 40 L98 210', { w: 4, c: 'var(--diagram-muted)', op: 0.7 }), S.path('M222 40 L222 210', { w: 4, c: 'var(--diagram-muted)', op: 0.7 }),
    S.path('M84 60 L84 190', { w: 5, c: 'var(--diagram-brown)', op: 0.8 }),
    lab(250, 40, 'Bone', { w: 'bold' }), S.lead(246, 36, 200, 36),
    lab(250, 85, 'Articular cartilage'), S.lead(246, 81, 190, 96),
    lab(250, 128, 'Joint cavity with synovial fluid'), S.lead(246, 124, 190, 126),
    lab(250, 168, 'Synovial membrane'), S.lead(246, 164, 210, 158),
    lab(250, 206, 'Fibrous capsule'), S.lead(246, 202, 224, 196),
    lab(8, 128, 'Ligament', { w: 'bold', a: 'start' }), S.lead(14, 134, 80, 150),
  ].join(''),
);

export const ALL = { SARCOMERE, SARC_Q, FILAMENTS, TETANUS, SKELETON, JOINTS, SYNOVIAL };
