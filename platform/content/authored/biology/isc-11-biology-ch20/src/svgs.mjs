// SVG diagrams for ISC 11 Biology ch20 Neural Control and Coordination. Numbers on the diagrams come from calc.mjs.
import { svgDoc, S } from '../../isc-11-biology-ch01/src/lib.mjs';
import { RESTING, THRESHOLD, PEAK, UNDERSHOOT, AP_TRACE, V_MYELINATED, V_NONMYELINATED } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const sm = (x, y, s, o) => S.text(x, y, s, { size: 10, ...o });
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });

// ---------------------------------------------------------------- neuron drawing (shared by the labelled and lettered figures)
function neuron() {
  let g = '';
  // dendrites
  g += S.path('M70 92 C50 78 40 66 30 60 M44 72 L34 80 M52 78 L52 60', { w: 2, c: 'var(--diagram-blue)' });
  g += S.path('M80 84 C74 66 76 52 70 38 M74 56 L88 46', { w: 2, c: 'var(--diagram-blue)' });
  g += S.path('M70 128 C50 142 40 154 30 160 M46 148 L34 142 M54 142 L54 160', { w: 2, c: 'var(--diagram-blue)' });
  g += S.path('M84 138 C80 152 82 162 76 176', { w: 2, c: 'var(--diagram-blue)' });
  // cell body, nucleus, Nissl granules
  g += S.circle(100, 110, 32, { fill: 'var(--diagram-fill)', sw: 1.5 });
  g += S.circle(100, 110, 11, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 1 });
  for (const [x, y] of [[84, 96], [118, 94], [82, 124], [116, 128], [100, 84], [100, 138]]) g += S.circle(x, y, 2, { fill: 'var(--diagram-brown)', sw: 0 });
  // axon hillock and axon
  g += S.path('M130 98 L150 107 L150 113 L130 122', { fill: 'var(--diagram-fill)', w: 1.2 });
  g += S.line(150, 110, 410, 110, { w: 2, c: 'var(--diagram-blue)' });
  // myelin segments with nodes between
  for (const x of [160, 222, 284, 346]) g += S.rect(x, 101, 54, 18, { rx: 8, fill: 'var(--diagram-yellow)', fop: 0.45, sw: 1.2 });
  // terminals
  g += S.path('M410 110 L430 90 M410 110 L436 110 M410 110 L430 130', { w: 2, c: 'var(--diagram-blue)' });
  for (const [x, y] of [[436, 86], [442, 110], [436, 134]]) g += S.circle(x, y, 6, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1.2 });
  return g;
}

// 1. Labelled myelinated neuron
export const NEURON = svgDoc(
  480,
  230,
  'A multipolar myelinated neuron: branching dendrites and a cell body with a nucleus and Nissl granules on the left; the axon leaves at the axon hillock and is wrapped in segments of myelin sheath, with gaps called nodes of Ranvier between them; the axon ends in branches that carry swollen axon terminals (synaptic knobs)',
  [
    neuron(),
    lab(14, 28, 'Dendrites', { w: 'bold' }), S.lead(50, 34, 60, 60),
    lab(14, 200, 'Cell body (cyton)', { w: 'bold' }), S.lead(70, 186, 90, 138),
    sm(116, 56, 'Nucleus', { c: 'var(--diagram-muted)' }), S.lead(112, 60, 104, 102),
    sm(122, 160, 'Nissl granules', { c: 'var(--diagram-brown)' }), S.lead(150, 152, 118, 129),
    sm(138, 78, 'Axon hillock'), S.lead(154, 82, 144, 102),
    lab(230, 44, 'Axon', { w: 'bold' }), S.lead(236, 50, 236, 105),
    lab(300, 74, 'Myelin sheath'), S.lead(318, 80, 318, 102),
    lab(250, 168, 'Node of Ranvier', { w: 'bold' }), S.lead(260, 160, 278, 114),
    lab(380, 176, 'Axon terminals', { w: 'bold' }), S.lead(440, 164, 440, 118),
  ].join(''),
);

// 2. Lettered neuron for diagram-based questions
export const NEURON_Q = svgDoc(
  480,
  210,
  'An unlabelled myelinated neuron with five parts marked by letters: A the branched fibres at the left that receive impulses, B the rounded part containing the nucleus, C a gap between two segments of the insulating sheath, D one of the segments of the insulating sheath on the axon, and E the swollen ends of the axon branches',
  [
    neuron(),
    tag(40, 24, 'A'), S.lead(44, 33, 56, 66),
    tag(100, 190, 'B'), S.lead(100, 181, 100, 143),
    tag(220, 176, 'C'), S.lead(220, 167, 220, 112),
    tag(300, 62, 'D'), S.lead(300, 71, 300, 102),
    tag(452, 176, 'E'), S.lead(446, 167, 442, 118),
  ].join(''),
);

// 3. Types of neurons
const body = (cx, cy) => S.circle(cx, cy, 14, { fill: 'var(--diagram-fill)', sw: 1.5 }) + S.circle(cx, cy, 5, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 0 });
const tp = (cx, name, where) => lab(cx, 138, name, { a: 'middle', w: 'bold' }) + sm(cx, 152, where, { a: 'middle', c: 'var(--diagram-muted)' });
export const NEURON_TYPES = svgDoc(
  480,
  184,
  'Four types of neuron by the number of processes: unipolar with a single process from the cell body; bipolar with one axon and one dendrite from opposite ends; pseudounipolar with a single process that divides into two branches near the cell body; multipolar with one axon and several dendrites',
  [
    body(60, 60), S.line(60, 74, 60, 120, { w: 2, c: 'var(--diagram-blue)' }),
    body(170, 70), S.line(170, 56, 170, 20, { w: 2, c: 'var(--diagram-green)' }), S.line(170, 84, 170, 120, { w: 2, c: 'var(--diagram-blue)' }),
    body(285, 40), S.line(285, 54, 285, 80, { w: 2, c: 'var(--diagram-blue)' }), S.line(285, 80, 262, 120, { w: 2, c: 'var(--diagram-green)' }), S.line(285, 80, 308, 120, { w: 2, c: 'var(--diagram-blue)' }),
    body(400, 60), S.line(400, 74, 400, 120, { w: 2, c: 'var(--diagram-blue)' }),
    S.path('M388 50 L368 30 M388 56 L360 56 M388 66 L366 86 M400 46 L392 22', { w: 2, c: 'var(--diagram-green)' }),
    tp(60, 'Unipolar', 'one process'), tp(170, 'Bipolar', 'retina, nose lining'), tp(285, 'Pseudounipolar', 'dorsal root ganglion'), tp(400, 'Multipolar', 'cerebral cortex'),
    sm(14, 176, 'Green: dendrite or receptor end; blue: axon', { c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. Human brain in sagittal section
export const BRAIN = svgDoc(
  480,
  300,
  'The human brain in vertical section. The large cerebrum forms the forebrain and encloses the thalamus and hypothalamus; a corpus callosum joins the two cerebral hemispheres. The midbrain with the corpora quadrigemina lies below, then the pons and the medulla oblongata, which continues as the spinal cord. The cerebellum lies behind the pons. The pituitary gland hangs below the hypothalamus. Pons, medulla and cerebellum form the hindbrain',
  [
    S.path('M150 150 C130 60 200 22 270 26 C340 30 390 70 384 130 C382 160 350 176 320 176 L190 176 C168 176 154 166 150 150 Z', { fill: 'var(--diagram-fill)', w: 1.8 }),
    S.path('M170 120 C220 90 300 88 350 120', { w: 3, c: 'var(--diagram-brown)' }),
    S.path('M196 52 C200 90 190 120 200 160 M250 34 C260 70 252 100 262 130 M312 44 C322 80 316 110 326 140', { w: 1, c: 'var(--diagram-muted)', dash: '3 3' }),
    S.ellipse(262, 140, 22, 12, { fill: 'var(--diagram-yellow)', fop: 0.45, sw: 1.2 }),
    S.ellipse(262, 164, 14, 8, { fill: 'var(--diagram-red)', fop: 0.4, sw: 1.2 }),
    S.path('M254 174 L240 192', { w: 2, c: 'var(--diagram-accent)' }),
    S.circle(238, 198, 7, { fill: 'var(--diagram-accent)', fop: 0.6, sw: 1 }),
    S.path('M252 178 L284 178 L288 212 L256 212 Z', { fill: 'var(--diagram-green)', fop: 0.35, w: 1.2 }),
    S.ellipse(272, 228, 28, 14, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 1.2 }),
    S.path('M256 240 L288 240 L282 292 L262 292 Z', { fill: 'var(--diagram-brown)', fop: 0.3, w: 1.2 }),
    S.path('M310 196 C370 190 416 214 408 248 C400 278 340 280 312 262 C296 246 296 212 310 196 Z', { fill: 'var(--diagram-green)', fop: 0.25, w: 1.5 }),
    S.path('M324 210 C366 204 394 222 396 242 M320 228 C356 226 384 240 388 256', { w: 1, c: 'var(--diagram-green)' }),
    lab(14, 40, 'Cerebrum (cortex)', { w: 'bold' }), S.lead(100, 46, 190, 56),
    lab(14, 96, 'Corpus callosum', { w: 'bold' }), S.lead(100, 102, 186, 112),
    lab(14, 158, 'Thalamus'), S.lead(64, 154, 240, 142),
    lab(14, 186, 'Hypothalamus'), S.lead(86, 182, 250, 166),
    lab(14, 214, 'Pituitary gland'), S.lead(88, 210, 230, 200),
    lab(14, 242, 'Midbrain'), S.lead(62, 238, 258, 200),
    lab(14, 270, 'Pons'), S.lead(40, 266, 248, 230),
    lab(306, 292, 'Medulla oblongata', { w: 'bold' }), S.lead(318, 286, 284, 272),
    lab(380, 186, 'Cerebellum', { w: 'bold' }), S.lead(420, 192, 394, 214),
    sm(170, 14, 'Forebrain: cerebrum, thalamus, hypothalamus', { c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 5. Transverse section of the spinal cord (labelled and lettered)
function cord() {
  const horns = [['M190 126 L142 68', 12], ['M190 126 L238 68', 12], ['M190 132 L130 170', 26], ['M190 132 L250 170', 26]];
  let g = S.ellipse(190, 130, 112, 96, { fill: 'var(--diagram-yellow)', fop: 0.18, sw: 2 });
  g += horns.map(([d, w]) => S.path(d, { w: w + 3, c: 'currentColor', cap: 'round' })).join('') + S.ellipse(190, 129, 29, 23, { fill: 'currentColor', sw: 0 });
  g += horns.map(([d, w]) => S.path(d, { w, c: 'var(--diagram-fill)', cap: 'round' })).join('') + S.ellipse(190, 129, 27, 21, { fill: 'var(--diagram-fill)', sw: 0 });
  g += S.circle(190, 129, 5, { fill: 'var(--diagram-blue)', fop: 0.6, sw: 1 });
  g += S.path('M238 68 L282 42', { w: 3, c: 'var(--diagram-green)' });
  g += S.ellipse(304, 34, 18, 10, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1.2 });
  g += S.path('M322 36 C350 42 366 78 372 112', { w: 3, c: 'var(--diagram-green)' });
  g += S.path('M250 170 L296 196 C340 204 368 160 372 118', { w: 3, c: 'var(--diagram-red)' });
  g += S.path('M372 115 L440 115', { w: 4, c: 'var(--diagram-brown)' });
  return g;
}
export const SPINAL_CORD = svgDoc(
  480,
  260,
  'Transverse section of the spinal cord: a butterfly-shaped inner grey matter with two slender dorsal horns and two broad ventral horns around a central canal, surrounded by white matter and by the meninges. A dorsal root with a swollen dorsal root ganglion carries sensory fibres in; a ventral root carries motor fibres out; the two roots join to form a spinal nerve',
  [
    cord(),
    S.ellipse(190, 130, 119, 103, { w: 1, c: 'var(--diagram-muted)', dash: '3 3' }),
    lab(8, 24, 'White matter', { w: 'bold' }), S.lead(70, 30, 104, 78),
    lab(8, 120, 'Grey matter', { w: 'bold' }), S.lead(70, 124, 168, 128),
    sm(196, 16, 'Dorsal horn', {}), S.lead(212, 22, 232, 62),
    lab(8, 220, 'Ventral horn', { w: 'bold' }), S.lead(70, 216, 128, 172),
    lab(130, 254, 'Central canal'), S.lead(190, 244, 190, 136),
    lab(300, 14, 'Dorsal root ganglion', { w: 'bold' }), S.lead(330, 20, 312, 30),
    ...S.lines(392, 62, ['Dorsal root', '(sensory)'], { size: 10, dy: 12 }).split('</text>').slice(0, 2).map((t) => t + '</text>'),
    S.lead(390, 66, 362, 70),
    ...S.lines(392, 196, ['Ventral root', '(motor)'], { size: 10, dy: 12 }).split('</text>').slice(0, 2).map((t) => t + '</text>'),
    S.lead(390, 198, 346, 190),
    lab(396, 134, 'Spinal nerve', { w: 'bold' }), S.lead(420, 126, 420, 118),
    sm(8, 246, 'Dashed ring: meninges', { c: 'var(--diagram-muted)' }),
  ].join(''),
);
export const SPINAL_Q = svgDoc(
  480,
  260,
  'An unlabelled transverse section of the spinal cord with five parts marked by letters: A the small channel in the centre of the grey matter, B the swelling on the root that enters the back of the cord, C the broad front arm of the butterfly-shaped grey matter, D the root that enters at the back of the cord between the swelling and the cord, and E the outer region that is not grey',
  [
    cord(),
    tag(190, 18, 'A'), S.lead(190, 27, 190, 124),
    tag(330, 16, 'B'), S.lead(326, 24, 312, 30),
    tag(262, 28, 'D'), S.lead(266, 36, 266, 50),
    tag(100, 236, 'C'), S.lead(106, 228, 134, 176),
    tag(50, 130, 'E'), S.lead(59, 130, 84, 130),
  ].join(''),
);

// 6. The action potential (model trace from calc.mjs)
const AX = (t) => 70 + t * 62;
const AY = (v) => 200 - (v + 90) * 1.5;
export const ACTION = svgDoc(
  480,
  260,
  `Model action potential recorded from an axon: the potential rests at ${RESTING} millivolts, a stimulus brings it to the threshold of ${THRESHOLD} millivolts, sodium channels open and it rises to about +${PEAK} millivolts (depolarisation), then potassium channels open and it falls back (repolarisation), overshooting slightly to about ${UNDERSHOOT} millivolts (hyperpolarisation) before returning to rest`,
  [
    S.line(70, 200, 450, 200, { w: 1.2 }), S.line(70, 20, 70, 200, { w: 1.2 }),
    ...[-80, -40, 0, 40].map((v) => S.line(70, AY(v), 450, AY(v), { w: 0.5, c: 'var(--diagram-muted)', dash: '2 4' }) + sm(64, AY(v) + 3, String(v), { a: 'end' })),
    ...[0, 1, 2, 3, 4, 5, 6].map((t) => sm(AX(t), 214, String(t), { a: 'middle' })),
    S.path('M' + AP_TRACE.map(([t, v]) => `${AX(t).toFixed(1)} ${AY(v).toFixed(1)}`).join(' L'), { w: 2.5, c: 'var(--diagram-green)' }),
    S.line(70, AY(THRESHOLD), 450, AY(THRESHOLD), { w: 1, c: 'var(--diagram-red)', dash: '5 3' }),
    sm(380, AY(THRESHOLD) - 4, `Threshold ${THRESHOLD}`, { c: 'var(--diagram-red)' }),
    sm(80, AY(RESTING) + 14, `Resting potential ${RESTING} mV`, { c: 'var(--diagram-muted)' }),
    lab(AX(1.6) - 108, AY(10), 'Depolarisation', { c: 'var(--diagram-green)' }), S.lead(AX(1.6) - 28, AY(10) - 4, AX(1.55), AY(0)),
    lab(AX(2.2) + 14, AY(0), 'Repolarisation', { c: 'var(--diagram-green)' }), S.lead(AX(2.2) + 10, AY(0) - 4, AX(2.2), AY(-10)),
    sm(AX(3.8) - 42, AY(-62), 'Hyperpolarisation', { c: 'var(--diagram-green)' }), S.lead(AX(3.8), AY(-62) + 4, AX(3.8), AY(UNDERSHOOT) - 3),
    lab(AX(1.8) + 8, AY(PEAK) + 2, `Peak +${PEAK} mV`, { w: 'bold' }),
    lab(260, 238, 'Time (ms)', { a: 'middle' }), sm(10, 18, 'Membrane potential (mV)', { c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 7. A chemical synapse
export const SYNAPSE = svgDoc(
  480,
  250,
  'A chemical synapse: the axon terminal of the pre-synaptic neuron contains mitochondria and synaptic vesicles filled with neurotransmitter. When the impulse arrives, calcium ions enter and the vesicles fuse with the membrane and release the transmitter into the synaptic cleft. It diffuses across and binds receptors on the post-synaptic membrane, which opens ion channels and starts a new impulse; the transmitter is then broken down or taken back',
  [
    S.path('M20 70 L150 70 C210 60 220 100 220 120 C220 140 210 180 150 170 L20 170 Z', { fill: 'var(--diagram-fill)', w: 1.5 }),
    S.path('M280 70 L460 70 L460 170 L280 170 C270 150 270 90 280 70 Z', { fill: 'var(--diagram-fill)', w: 1.5 }),
    ...[[150, 96], [170, 120], [152, 140], [190, 100], [186, 142]].map(([x, y]) => S.circle(x, y, 9, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.2 }) + S.circle(x - 2, y - 2, 1.5, { fill: 'var(--diagram-red)', sw: 0 }) + S.circle(x + 2, y + 2, 1.5, { fill: 'var(--diagram-red)', sw: 0 })),
    S.ellipse(80, 120, 26, 14, { fill: 'var(--diagram-brown)', fop: 0.3, sw: 1.2 }),
    ...[[240, 108], [246, 124], [242, 140], [250, 116], [250, 134]].map(([x, y]) => S.circle(x, y, 2.2, { fill: 'var(--diagram-red)', sw: 0 })),
    ...[96, 120, 144].map((y) => S.path(`M278 ${y - 8} q-8 8 0 16`, { w: 2.5, c: 'var(--diagram-blue)' })),
    S.arrow(222, 120, 270, 120, { size: 6, w: 1.5 }),
    lab(30, 40, 'Pre-synaptic neuron (axon terminal)', { w: 'bold' }),
    lab(290, 40, 'Post-synaptic neuron', { w: 'bold' }),
    sm(46, 148, 'Mitochondrion', { c: 'var(--diagram-brown)' }), S.lead(80, 134, 80, 138),
    lab(130, 200, 'Synaptic vesicles with transmitter', { c: 'var(--diagram-yellow)' }), S.lead(168, 194, 170, 132),
    lab(196, 60, 'Synaptic cleft', { w: 'bold' }), S.lead(240, 66, 246, 104),
    sm(300, 196, 'Receptors on the', { c: 'var(--diagram-blue)' }), sm(300, 208, 'post-synaptic membrane', { c: 'var(--diagram-blue)' }), S.lead(330, 190, 284, 144),
    sm(300, 228, 'Impulse arrives: calcium enters,', { c: 'var(--diagram-muted)' }), sm(300, 240, 'vesicles release transmitter', { c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 8. Conduction in non-myelinated and myelinated fibres
const arc = (x1, x2, y) => S.path(`M${x1} ${y} Q${(x1 + x2) / 2} ${y - 34} ${x2} ${y}`, { w: 1.8, c: 'var(--diagram-red)' }) + S.head(x2, y, 2.1, { size: 6, c: 'var(--diagram-red)' });
export const CONDUCTION = svgDoc(
  480,
  240,
  `Conduction of the nerve impulse. Top: in a non-myelinated fibre the impulse passes continuously along the membrane, with local currents at every point, so it is slow (about ${V_NONMYELINATED} metre per second in this model). Bottom: in a myelinated fibre the myelin sheath insulates the axon, and the impulse jumps from one node of Ranvier to the next (saltatory conduction), so it is much faster (about ${V_MYELINATED} metres per second)`,
  [
    lab(14, 22, 'Non-myelinated fibre: continuous conduction', { w: 'bold' }),
    S.rect(30, 44, 420, 22, { rx: 11, fill: 'var(--diagram-fill)', sw: 1.5 }),
    ...[60, 110, 160, 210, 260, 310, 360, 410].map((x) => S.arrow(x, 62, x + 34, 62, { size: 5, w: 1.5, c: 'var(--diagram-red)' })),
    sm(30, 86, `Local current at every point: about ${V_NONMYELINATED} m per s`, { c: 'var(--diagram-muted)' }),
    lab(14, 130, 'Myelinated fibre: saltatory conduction', { w: 'bold' }),
    S.line(30, 166, 450, 166, { w: 3, c: 'var(--diagram-blue)' }),
    ...[40, 140, 240, 340].map((x) => S.rect(x, 156, 80, 20, { rx: 9, fill: 'var(--diagram-yellow)', fop: 0.45, sw: 1.2 })),
    arc(100, 160, 156), arc(200, 260, 156), arc(300, 360, 156),
    sm(120, 200, 'Node', { a: 'middle' }), sm(220, 200, 'Node', { a: 'middle' }), sm(320, 200, 'Node', { a: 'middle' }),
    S.lead(120, 190, 120, 178), S.lead(220, 190, 220, 178), S.lead(320, 190, 320, 178),
    sm(30, 226, `Impulse jumps from node to node: about ${V_MYELINATED} m per s`, { c: 'var(--diagram-muted)' }),
  ].join(''),
);

export const ALL = { NEURON, NEURON_Q, NEURON_TYPES, BRAIN, SPINAL_CORD, SPINAL_Q, ACTION, SYNAPSE, CONDUCTION };
