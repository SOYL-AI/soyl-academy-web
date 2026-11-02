// SVG diagrams for ch17 Locomotion and Movement (allow-listed elements, palette colours only; schematic, not to scale
// except where a scale is stated).
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { RELAXED, CONTRACTED, MYOSIN, ACTIN, SKULL_N, VERT_N, RIBS_N, AXIAL_N, APPEND_N, TOTAL_N, FORE_N, HIND_N, GIRDLES, LIMBS_N, GIRDLES_N, VERT, RIB_PAIRS } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const ACT = 'var(--diagram-blue)';
const MYO = 'var(--diagram-red)';

// 1. Sarcomere relaxed and contracted (drawn to scale from calc.mjs: 140 px per micrometre)
const K = 140;
const CX = 240;
function bracket(x1, x2, y, up, c = 'currentColor') {
  const t = up ? 5 : -5;
  return S.path(`M${x1} ${y + t} L${x1} ${y} L${x2} ${y} L${x2} ${y + t}`, { c, w: 1.2 });
}
function sarcRow(cy, b, title) {
  const zl = CX - (b.L * K) / 2;
  const zr = CX + (b.L * K) / 2;
  const ml = CX - (MYOSIN * K) / 2;
  const mr = CX + (MYOSIN * K) / 2;
  const al = zl + ACTIN * K;
  const ar = zr - ACTIN * K;
  const out = [lab(20, cy - 46, title, { w: 'bold' })];
  for (const dy of [-16, 0, 16]) out.push(S.line(zl, cy + dy, al, cy + dy, { c: ACT, w: 1.8 }), S.line(ar, cy + dy, zr, cy + dy, { c: ACT, w: 1.8 }));
  for (const dy of [-8, 8]) {
    out.push(S.line(ml, cy + dy, mr, cy + dy, { c: MYO, w: 4.5 }));
    for (let x = ml + 8; x < mr - 4; x += 12) if (Math.abs(x - CX) > 10) out.push(S.line(x, cy + dy + (dy < 0 ? -3 : 3), x + (x < CX ? -4 : 4), cy + dy + (dy < 0 ? -6 : 6), { c: MYO, w: 1.2 }));
  }
  out.push(S.line(zl, cy - 24, zl, cy + 24, { c: 'var(--diagram-accent)', w: 2.5 }), S.line(zr, cy - 24, zr, cy + 24, { c: 'var(--diagram-accent)', w: 2.5 }));
  out.push(S.line(CX, cy - 14, CX, cy + 14, { c: 'currentColor', w: 1.2, dash: '3 2' }));
  // H zone above, A band and half I bands below
  out.push(bracket(al, ar, cy - 30, true, 'var(--diagram-green)'), lab(ar + 6, cy - 27, `H zone ${b.H} μm`, { size: 10, c: 'var(--diagram-green)' }));
  out.push(bracket(ml, mr, cy + 32, false), lab(CX, cy + 46, `A band ${b.A} μm (constant)`, { size: 10, a: 'middle' }));
  out.push(bracket(zl, ml, cy + 32, false, 'var(--diagram-muted)'), bracket(mr, zr, cy + 32, false, 'var(--diagram-muted)'));
  out.push(lab(zl, cy + 46, `half I`, { size: 10, a: 'middle', c: 'var(--diagram-muted)' }), lab(zr, cy + 46, `half I`, { size: 10, a: 'middle', c: 'var(--diagram-muted)' }));
  out.push(lab(470, cy - 46, `I band ${b.I} μm (two halves)`, { size: 10, a: 'end', c: 'var(--diagram-muted)' }));
  return out.join('');
}
export const SARCOMERE = svgDoc(
  480,
  330,
  `Sliding filaments in one sarcomere, drawn to scale with illustrative lengths. Relaxed: sarcomere ${RELAXED.L} micrometres between two Z lines, A band ${RELAXED.A}, I band ${RELAXED.I} (half on each side), H zone ${RELAXED.H}. Contracted: sarcomere ${CONTRACTED.L}, A band still ${CONTRACTED.A}, I band ${CONTRACTED.I}, H zone ${CONTRACTED.H}. Thin actin filaments from each Z line slide towards the M line over the thick myosin filaments; the A band does not change`,
  [
    sarcRow(80, RELAXED, `Relaxed: sarcomere ${RELAXED.L} μm`),
    sarcRow(220, CONTRACTED, `Contracted: sarcomere ${CONTRACTED.L} μm`),
    lab(CX - (RELAXED.L * K) / 2 - 4, 48, 'Z line', { size: 10, a: 'end', c: 'var(--diagram-accent)' }),
    lab(CX + 6, 145, 'M line (dashed)', { size: 10 }),
    S.lead(CX + 4, 140, CX + 1, 96),
    S.line(20, 300, 50, 300, { c: ACT, w: 1.8 }), lab(56, 304, `Actin (thin), ${ACTIN} μm from each Z line`, { size: 10 }),
    S.line(260, 300, 290, 300, { c: MYO, w: 4.5 }), lab(296, 304, `Myosin (thick), ${MYOSIN} μm`, { size: 10 }),
    lab(20, 322, 'Lengths are typical values used for illustration; they vary between muscles', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 2. Contractile proteins: actin filament and a myosin monomer (schematic)
const beads = () => {
  const out = [];
  for (let i = 0; i < 26; i++) {
    const x = 40 + i * 13;
    out.push(S.circle(x, i % 2 ? 66 : 56, 6.5, { fill: ACT, fop: 0.3, c: ACT, sw: 1 }));
  }
  return out.join('');
};
const tropo = () => {
  let d = 'M34 61';
  for (let x = 34; x < 372; x += 26) d += ` Q${x + 13} ${x % 52 === 34 % 52 ? 48 : 74} ${x + 26} 61`;
  return d;
};
export const PROTEINS = svgDoc(
  460,
  230,
  'Contractile proteins. Top: an actin (thin) filament made of two filamentous F-actins wound helically, each a polymer of globular G-actin monomers; a tropomyosin strand runs along it and troponin complexes sit at regular intervals; in the resting state a subunit of troponin masks the myosin-binding sites on actin. Bottom: one myosin monomer, called meromyosin: a globular head with a short arm, the heavy meromyosin (HMM), and a long tail, the light meromyosin (LMM); the head is an active ATPase and has binding sites for ATP and actin',
  [
    lab(20, 20, 'Actin (thin) filament', { w: 'bold' }),
    beads(),
    S.path(tropo(), { c: 'var(--diagram-green)', w: 2 }),
    ...[60, 164, 268].map((x) => S.rect(x, 40, 12, 9, { fill: 'var(--diagram-yellow)', c: 'var(--diagram-brown)', sw: 1 })),
    lab(380, 44, 'Troponin', { size: 10 }), S.lead(378, 41, 282, 44),
    lab(380, 64, 'Tropomyosin', { size: 10, c: 'var(--diagram-green)' }), S.lead(378, 61, 362, 62),
    lab(40, 96, 'F-actin: two strands of G-actin (globular) monomers', { size: 10, c: ACT }),
    lab(20, 128, 'Myosin monomer (meromyosin)', { w: 'bold' }),
    S.line(60, 180, 290, 180, { c: MYO, w: 7, cap: 'round' }),
    S.line(290, 180, 322, 156, { c: MYO, w: 5, cap: 'round' }),
    S.ellipse(342, 146, 22, 13, { fill: MYO, fop: 0.35, c: MYO, sw: 1.5 }),
    lab(60, 204, 'Tail: light meromyosin (LMM)', { size: 10 }),
    lab(196, 214, 'Head and short arm: heavy meromyosin (HMM)', { size: 10 }),
    S.lead(330, 205, 330, 160),
    lab(372, 132, 'Head: ATPase,', { size: 10 }),
    lab(372, 145, 'binds ATP', { size: 10 }),
    lab(372, 158, 'and actin', { size: 10 }),
  ].join(''),
);

// 3. Synovial joint (section) and the three structural classes of joints
export const JOINTS = svgDoc(
  470,
  270,
  'Joints. Left: section through a synovial joint: the ends of two bones are covered with articular cartilage and separated by a synovial cavity filled with synovial fluid; a fibrous capsule lined by a synovial membrane encloses the joint. Right: the three kinds of joints by structure and movement: fibrous joints allow no movement (sutures between flat skull bones); cartilaginous joints allow limited movement (between adjacent vertebrae, pubic symphysis); synovial joints allow considerable movement (ball and socket, hinge, pivot, gliding, saddle)',
  [
    // upper bone with rounded end
    S.path('M70 20 L70 100 C70 132 150 132 150 100 L150 20', { fill: 'var(--diagram-fill)', w: 1.5 }),
    S.path('M70 100 C70 132 150 132 150 100', { c: ACT, w: 5 }),
    // lower bone with shallow socket
    S.path('M66 250 L66 152 C66 140 154 140 154 152 L154 250', { fill: 'var(--diagram-fill)', w: 1.5 }),
    S.path('M66 152 C66 140 154 140 154 152', { c: ACT, w: 5 }),
    // cavity fluid and capsule
    S.path('M72 120 C90 136 130 136 148 120 C150 132 152 140 152 146 C130 138 90 138 68 146 C68 138 70 128 72 120 Z', { fill: 'var(--diagram-yellow)', fop: 0.35, c: 'none' }),
    S.path('M56 80 C40 110 40 160 56 186', { c: 'var(--diagram-brown)', w: 3 }),
    S.path('M164 80 C180 110 180 160 164 186', { c: 'var(--diagram-brown)', w: 3 }),
    S.path('M62 84 C48 112 48 158 62 182', { c: 'var(--diagram-green)', w: 1.5, dash: '4 2' }),
    S.path('M158 84 C172 112 172 158 158 182', { c: 'var(--diagram-green)', w: 1.5, dash: '4 2' }),
    lab(110, 60, 'Bone', { a: 'middle' }),
    lab(110, 210, 'Bone', { a: 'middle' }),
    lab(186, 96, 'Articular cartilage', { size: 10, c: ACT }), S.lead(184, 93, 146, 112),
    lab(186, 136, 'Synovial cavity', { size: 10 }), lab(186, 148, 'with synovial fluid', { size: 10 }), S.lead(184, 138, 140, 136),
    lab(186, 178, 'Fibrous capsule', { size: 10, c: 'var(--diagram-brown)' }), S.lead(184, 175, 170, 160),
    lab(186, 198, 'Synovial membrane', { size: 10, c: 'var(--diagram-green)' }), S.lead(184, 195, 162, 176),
    S.line(300, 14, 300, 256, { c: 'var(--diagram-muted)', w: 1 }),
    lab(312, 28, 'Kinds of joints', { w: 'bold' }),
    lab(312, 54, 'Fibrous: no movement', { size: 11, w: 'bold' }),
    lab(312, 68, 'sutures of skull bones', { size: 10, c: 'var(--diagram-muted)' }),
    lab(312, 96, 'Cartilaginous: limited', { size: 11, w: 'bold' }),
    lab(312, 110, 'adjacent vertebrae,', { size: 10, c: 'var(--diagram-muted)' }),
    lab(312, 123, 'pubic symphysis', { size: 10, c: 'var(--diagram-muted)' }),
    lab(312, 151, 'Synovial: considerable', { size: 11, w: 'bold' }),
    lab(312, 165, 'ball and socket, hinge,', { size: 10, c: 'var(--diagram-muted)' }),
    lab(312, 178, 'pivot, gliding, saddle', { size: 10, c: 'var(--diagram-muted)' }),
    lab(20, 262, 'Synovial joint, section (schematic)', { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. The 206 bones: axial and appendicular (counts summed in calc.mjs)
const box = (x, y, w, t1, t2, c, size = 11) => S.rect(x, y, w, 36, { rx: 5, fill: c, fop: 0.18, c, sw: 1.2 }) + S.text(x + w / 2, y + 15, t1, { a: 'middle', size, w: 'bold' }) + S.text(x + w / 2, y + 29, t2, { a: 'middle', size: 10 });
const link = (x1, y1, x2, y2) => S.path(`M${x1} ${y1} L${x1} ${(y1 + y2) / 2} L${x2} ${(y1 + y2) / 2} L${x2} ${y2}`, { c: 'var(--diagram-muted)', w: 1.2 });
export const SKELETON = svgDoc(
  480,
  240,
  `The human skeleton has ${TOTAL_N} bones: axial skeleton ${AXIAL_N} (skull ${SKULL_N}, vertebral column ${VERT_N}, sternum 1, ribs ${RIBS_N}) and appendicular skeleton ${APPEND_N} (limbs ${LIMBS_N}: ${FORE_N} in each fore limb and ${HIND_N} in each hind limb; girdles ${GIRDLES_N}: pectoral ${GIRDLES.pectoral}, pelvic ${GIRDLES.pelvic})`,
  [
    box(180, 8, 120, 'Skeleton', `${TOTAL_N} bones`, 'var(--diagram-accent)'),
    link(240, 44, 120, 74), link(240, 44, 360, 74),
    box(60, 74, 120, 'Axial', `${AXIAL_N} bones`, ACT),
    box(300, 74, 120, 'Appendicular', `${APPEND_N} bones`, 'var(--diagram-green)'),
    ...[['Skull', SKULL_N, 2], ['Vertebrae', VERT_N, 62], ['Sternum', 1, 122], ['Ribs', RIBS_N, 182]].map(([n, v, x]) => link(120, 110, x + 29, 150) + box(x, 150, 58, n, String(v), ACT, 10)),
    link(360, 110, 290, 150), link(360, 110, 410, 150),
    box(250, 150, 80, 'Limbs', String(LIMBS_N), 'var(--diagram-green)'),
    box(370, 150, 80, 'Girdles', String(GIRDLES_N), 'var(--diagram-green)'),
    lab(290, 206, `fore ${FORE_N} × 2`, { size: 10, a: 'middle' }), lab(290, 220, `hind ${HIND_N} × 2`, { size: 10, a: 'middle' }),
    lab(410, 206, `pectoral ${GIRDLES.pectoral}`, { size: 10, a: 'middle' }), lab(410, 220, `pelvic ${GIRDLES.pelvic}`, { size: 10, a: 'middle' }),
    lab(120, 206, `${SKULL_N} + ${VERT_N} + 1 + ${RIBS_N} = ${AXIAL_N}`, { size: 10, a: 'middle', c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 5. Vertebral column regions and the three kinds of ribs
const REGIONS = [['Cervical', VERT.cervical, 7, 20, ACT], ['Thoracic', VERT.thoracic, 8, 24, 'var(--diagram-green)'], ['Lumbar', VERT.lumbar, 10, 30, 'var(--diagram-brown)'], ['Sacral (fused)', VERT.sacral, 22, 30, 'var(--diagram-yellow)'], ['Coccygeal (fused)', VERT.coccygeal, 8, 12, 'var(--diagram-muted)']];
const column = () => {
  let y = 26;
  const out = [];
  for (const [name, n, h, w, c] of REGIONS) {
    const y0 = y;
    for (let i = 0; i < n; i++) {
      out.push(S.rect(140 - w / 2, y, w, h, { rx: 2, fill: c, fop: 0.3, c, sw: 1 }));
      y += h + 2;
    }
    out.push(S.path(`M${110} ${y0} L104 ${y0} L104 ${y - 2} L110 ${y - 2}`, { c: 'var(--diagram-muted)', w: 1 }));
    out.push(lab(100, (y0 + y) / 2 + 4, `${name} ${n}`, { size: 10, a: 'end' }));
  }
  return out.join('');
};
export const VERTEBRAL = svgDoc(
  460,
  330,
  `Vertebral column of ${VERT_N} serially arranged vertebrae: cervical ${VERT.cervical}, thoracic ${VERT.thoracic}, lumbar ${VERT.lumbar}, sacral 1 (fused) and coccygeal 1 (fused). The ${RIB_PAIRS.true + RIB_PAIRS.false + RIB_PAIRS.floating} pairs of ribs join the thoracic vertebrae dorsally: the first ${RIB_PAIRS.true} pairs (true ribs) join the sternum ventrally by hyaline cartilage; the 8th, 9th and 10th pairs (false or vertebrochondral ribs) join the cartilage of the 7th rib; the 11th and 12th pairs (floating ribs) are not joined ventrally`,
  [
    lab(20, 16, 'Vertebral column', { w: 'bold' }),
    column(),
    lab(200, 16, 'Ribs (12 pairs, on thoracic vertebrae)', { w: 'bold' }),
    S.rect(200, 34, 12, 14, { fill: 'var(--diagram-green)', fop: 0.3, c: 'var(--diagram-green)', sw: 1 }),
    lab(220, 45, `True ribs: pairs 1 to ${RIB_PAIRS.true}`, { size: 11 }),
    lab(220, 59, 'joined directly to the sternum', { size: 10, c: 'var(--diagram-muted)' }),
    lab(220, 72, 'by hyaline cartilage', { size: 10, c: 'var(--diagram-muted)' }),
    S.rect(200, 92, 12, 14, { fill: 'var(--diagram-yellow)', fop: 0.4, c: 'var(--diagram-brown)', sw: 1 }),
    lab(220, 103, `False ribs: pairs 8 to 10 (${RIB_PAIRS.false})`, { size: 11 }),
    lab(220, 117, 'vertebrochondral: joined to the', { size: 10, c: 'var(--diagram-muted)' }),
    lab(220, 130, 'cartilage of the 7th rib', { size: 10, c: 'var(--diagram-muted)' }),
    S.rect(200, 150, 12, 14, { fill: 'var(--diagram-fill)', c: 'currentColor', sw: 1 }),
    lab(220, 161, `Floating ribs: pairs 11, 12 (${RIB_PAIRS.floating})`, { size: 11 }),
    lab(220, 175, 'not joined ventrally', { size: 10, c: 'var(--diagram-muted)' }),
    lab(200, 214, 'First vertebra: atlas, articulates', { size: 10 }),
    lab(200, 227, 'with the occipital condyles', { size: 10 }),
    lab(200, 254, 'Sternum + ribs + thoracic vertebrae', { size: 10 }),
    lab(200, 267, '= rib cage', { size: 10 }),
    lab(200, 300, `${VERT.cervical} + ${VERT.thoracic} + ${VERT.lumbar} + 1 + 1 = ${VERT_N} vertebrae`, { size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

export const ALL = { SARCOMERE, PROTEINS, JOINTS, SKELETON, VERTEBRAL };
