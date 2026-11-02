// SVG diagrams for ch18 Neural Control and Coordination (allow-listed elements, palette colours only; schematic, not to scale).
import { svgDoc, S } from '../../cbse-11-biology-ch01/src/lib.mjs';
import { REST, PEAK, AP_POINTS, PUMP } from './calc.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const M = 'var(--diagram-muted)';

// 1. Structure of a myelinated neuron
const dendrites = () => {
  const out = [];
  const tips = [[20, 52], [14, 96], [26, 142], [58, 38], [60, 160]];
  for (const [x, y] of tips) out.push(S.path(`M78 100 Q${(x + 78) / 2 + 6} ${(y + 100) / 2 - 4} ${x} ${y}`, { c: 'var(--diagram-green)', w: 2 }));
  out.push(S.path('M20 52 l-8 -6 M20 52 l-2 -10 M14 96 l-9 -4 M14 96 l-8 6 M26 142 l-10 2 M26 142 l-4 9 M58 38 l-6 -8 M58 38 l4 -9 M60 160 l-6 8 M60 160 l5 8', { c: 'var(--diagram-green)', w: 1.2 }));
  return out.join('');
};
const myelin = () => {
  const out = [];
  for (let i = 0; i < 5; i++) out.push(S.rect(150 + i * 52, 92, 44, 16, { rx: 8, fill: 'var(--diagram-yellow)', fop: 0.4, c: 'var(--diagram-brown)', sw: 1 }));
  return out.join('');
};
const terminals = () => {
  const out = [];
  for (const [x, y] of [[440, 70], [452, 100], [440, 130]]) out.push(S.path(`M408 100 Q${x - 18} ${(y + 100) / 2} ${x} ${y}`, { w: 1.5 }), S.circle(x + 4, y, 5, { fill: 'var(--diagram-red)', fop: 0.4, c: 'var(--diagram-red)', sw: 1 }));
  return out.join('');
};
export const NEURON = svgDoc(
  480,
  220,
  'Structure of a myelinated neuron: branched dendrites carry impulses towards the cell body (cyton), which contains the nucleus and granular Nissl’s granules; a long axon leaves the cell body and is wrapped in a myelin sheath formed by Schwann cells, with gaps called nodes of Ranvier; at its far end the axon branches, and each branch ends in a bulb-like synaptic knob containing synaptic vesicles with neurotransmitters',
  [
    dendrites(),
    S.circle(84, 100, 30, { fill: 'var(--diagram-green)', fop: 0.15, c: 'var(--diagram-green)' }),
    S.circle(84, 100, 9, { fill: M, fop: 0.5, sw: 1 }),
    ...[[70, 84], [98, 86], [72, 116], [100, 114], [86, 122]].map(([x, y]) => S.circle(x, y, 2.2, { fill: 'var(--diagram-accent)', sw: 0 })),
    S.line(114, 100, 408, 100, { w: 2 }),
    myelin(),
    terminals(),
    lab(20, 20, 'Dendrites', { c: 'var(--diagram-green)' }), S.lead(48, 24, 54, 44),
    lab(46, 196, 'Cell body (cyton)', { size: 10 }), S.lead(80, 186, 84, 130),
    lab(122, 160, 'Nucleus', { size: 10 }), S.lead(120, 156, 92, 104),
    lab(120, 30, 'Nissl’s granules', { size: 10, c: 'var(--diagram-accent)' }), S.lead(120, 33, 100, 84),
    lab(200, 64, 'Myelin sheath (Schwann cells)', { size: 10, c: 'var(--diagram-brown)' }), S.lead(240, 68, 226, 92),
    lab(250, 148, 'Node of Ranvier', { size: 10 }), S.lead(270, 138, 250, 104),
    lab(330, 180, 'Axon', { size: 11, w: 'bold' }), S.lead(344, 170, 360, 104),
    lab(476, 44, 'Synaptic knobs', { size: 10, a: 'end', c: 'var(--diagram-red)' }), S.lead(450, 48, 446, 64),
    S.arrow(150, 200, 300, 200, { c: M, w: 1.2, size: 6 }), lab(306, 204, 'direction of impulse', { size: 10, c: M }),
  ].join(''),
);

// 2. Polarised membrane at rest and the sodium–potassium pump
const ions = (y, txt, c, n, x0) => Array.from({ length: n }, (_, i) => S.text(x0 + i * 34, y, txt, { size: 11, c })).join('');
export const RESTING = svgDoc(
  470,
  240,
  `Resting membrane of an axon. The outside (tissue fluid) has a high concentration of sodium ions and a low concentration of potassium ions; the axoplasm inside has a high concentration of potassium ions and negatively charged proteins and a low concentration of sodium ions. The outer surface is positively charged and the inner surface negatively charged: the membrane is polarised. At rest the membrane is more permeable to potassium ions and nearly impermeable to sodium ions. The sodium–potassium pump moves ${PUMP.na} sodium ions out for every ${PUMP.k} potassium ions in, using ATP`,
  [
    lab(14, 18, 'Outside: tissue fluid (high Na⁺, low K⁺)', { w: 'bold', size: 11 }),
    ions(46, 'Na⁺', 'var(--diagram-blue)', 7, 20),
    lab(20, 70, '+   +   +   +   +   +   +   +   +   +', { size: 12, c: 'var(--diagram-red)' }),
    S.rect(10, 80, 300, 26, { fill: 'var(--diagram-yellow)', fop: 0.3, c: 'var(--diagram-brown)', sw: 1.2 }),
    lab(20, 97, 'Axon membrane (polarised)', { size: 10 }),
    lab(20, 126, '−   −   −   −   −   −   −   −   −   −', { size: 12, c: 'var(--diagram-blue)' }),
    ions(156, 'K⁺', 'var(--diagram-green)', 7, 24),
    lab(14, 186, 'Inside: axoplasm (high K⁺, negative proteins,', { w: 'bold', size: 11 }),
    lab(14, 200, 'low Na⁺)', { w: 'bold', size: 11 }),
    S.rect(330, 74, 70, 38, { rx: 8, fill: 'var(--diagram-fill)', c: 'currentColor', sw: 1.5 }),
    lab(365, 90, 'Na⁺–K⁺', { size: 10, a: 'middle' }), lab(365, 103, 'pump', { size: 10, a: 'middle' }),
    S.arrow(350, 74, 350, 34, { c: 'var(--diagram-blue)', size: 6 }), lab(346, 30, `${PUMP.na} Na⁺ out`, { size: 10, a: 'end', c: 'var(--diagram-blue)' }),
    S.arrow(384, 34, 384, 72, { c: 'var(--diagram-green)', size: 6 }), lab(390, 30, `${PUMP.k} K⁺ in`, { size: 10, c: 'var(--diagram-green)' }),
    lab(330, 136, 'uses ATP', { size: 10, c: M }),
    lab(14, 228, 'At rest: more permeable to K⁺, nearly impermeable to Na⁺', { size: 10, c: M }),
  ].join(''),
);

// 3. Action potential trace (computed points, typical values)
const tx = (t) => 60 + t * 110;
const vy = (v) => 150 - (v + 70) * 1.2;
const apPath = () => {
  // smooth the computed points with short curves
  const p = AP_POINTS.map(([t, v]) => [tx(t), vy(v)]);
  let d = `M${p[0][0]} ${p[0][1]} L${p[1][0]} ${p[1][1]}`;
  d += ` C${p[1][0] + 15} ${p[1][1]} ${p[2][0] - 5} ${p[2][1] + 8} ${p[2][0]} ${p[2][1]}`;
  d += ` L${p[3][0] - 6} ${p[3][1] + 8} Q${p[3][0]} ${p[3][1] - 6} ${p[3][0] + 8} ${p[3][1] + 10}`;
  d += ` L${p[4][0] - 12} ${p[4][1] - 6} Q${p[4][0]} ${p[4][1]} ${p[4][0] + 20} ${p[4][1]} L${p[5][0]} ${p[5][1]}`;
  return d.replace(/(\d+\.\d{2,})/g, (m) => String(Math.round(Number(m) * 10) / 10));
};
export const ACTION = svgDoc(
  470,
  230,
  `Action potential at one point of an axon, typical values: the membrane rests at about ${REST} millivolts (polarised, inside negative); a stimulus makes the membrane freely permeable to sodium ions, which rush in, so the potential rises and reverses to about plus ${PEAK} millivolts (depolarisation; inside now positive); the rise in sodium permeability is short-lived and potassium permeability increases, potassium ions diffuse out and the resting potential is restored (repolarisation)`,
  [
    S.arrow(60, 200, 60, 14, { size: 6 }), S.arrow(55, 196, 460, 196, { size: 6 }),
    lab(64, 14, 'Membrane potential (mV)', { size: 10 }), lab(456, 214, 'Time', { size: 10, a: 'end' }),
    S.line(60, vy(0), 440, vy(0), { c: M, w: 1, dash: '3 3' }), lab(54, vy(0) + 4, '0', { size: 10, a: 'end' }),
    lab(54, vy(PEAK) + 4, `+${PEAK}`, { size: 10, a: 'end' }), S.line(56, vy(PEAK), 60, vy(PEAK), { w: 1 }),
    lab(54, vy(REST) + 4, String(REST), { size: 10, a: 'end' }),
    S.path(apPath(), { c: 'var(--diagram-red)', w: 2.5 }),
    lab(tx(0.1), vy(REST) - 8, 'Resting potential', { size: 10 }),
    lab(tx(0.15), vy(REST) + 18, '(polarised)', { size: 10, c: M }),
    lab(tx(1.25) - 18, vy(0) - 6, 'Depolarisation', { size: 10, a: 'end', c: 'var(--diagram-blue)' }),
    lab(tx(1.25) - 18, vy(0) + 8, 'Na⁺ rush in', { size: 10, a: 'end', c: 'var(--diagram-blue)' }),
    lab(tx(2.05) + 4, vy(0) - 6, 'Repolarisation', { size: 10, c: 'var(--diagram-green)' }),
    lab(tx(2.05) + 4, vy(0) + 8, 'K⁺ diffuse out', { size: 10, c: 'var(--diagram-green)' }),
    lab(tx(1.5) + 12, vy(PEAK) + 2, 'Peak: inside positive', { size: 10 }),
    S.arrow(tx(1), 190, tx(1), vy(REST) + 6, { c: M, w: 1, size: 5 }), lab(tx(1) + 4, 188, 'stimulus', { size: 10, c: M }),
    lab(tx(2.4), vy(REST) - 8, 'Resting potential restored', { size: 10 }),
  ].join(''),
);

// 4. Chemical synapse
const vesicles = () => [[200, 52], [222, 62], [244, 50], [262, 66], [212, 82], [240, 86], [268, 92]].map(([x, y]) => S.circle(x, y, 7, { c: 'var(--diagram-red)', sw: 1.2 }) + S.circle(x - 2, y - 1, 1.5, { fill: 'var(--diagram-red)', sw: 0 }) + S.circle(x + 2, y + 2, 1.5, { fill: 'var(--diagram-red)', sw: 0 })).join('');
export const SYNAPSE = svgDoc(
  470,
  250,
  'Chemical synapse. An impulse arriving at the axon terminal of the pre-synaptic neuron makes synaptic vesicles move to and fuse with the plasma membrane, releasing their neurotransmitters into the fluid-filled synaptic cleft by exocytosis. The neurotransmitters bind to specific receptors on the post-synaptic membrane; the binding opens ion channels, allowing ions to enter, which can generate a new potential in the post-synaptic neuron, either excitatory or inhibitory',
  [
    S.path('M170 6 L170 60 C170 118 330 118 330 60 L330 6', { fill: 'var(--diagram-green)', fop: 0.12, c: 'var(--diagram-green)', w: 2 }),
    vesicles(),
    ...[[226, 116], [250, 118], [274, 114]].map(([x, y]) => S.circle(x, y + 10, 1.8, { fill: 'var(--diagram-red)', sw: 0 })),
    S.path('M150 150 C200 140 300 140 350 150 L350 240 L150 240 Z', { fill: 'var(--diagram-blue)', fop: 0.1, c: 'var(--diagram-blue)', w: 2 }),
    ...[200, 226, 252, 278, 304].map((x) => S.rect(x - 5, 140, 10, 9, { fill: 'var(--diagram-blue)', fop: 0.6, c: 'var(--diagram-blue)', sw: 1 })),
    S.arrow(250, 176, 250, 220, { c: 'var(--diagram-blue)', w: 1.5, size: 6 }),
    S.arrow(116, 20, 160, 60, { c: M, w: 1.2, size: 6 }), lab(16, 18, 'Impulse arrives', { size: 10, c: M }),
    lab(16, 44, 'Axon terminal', { size: 10, c: 'var(--diagram-green)' }), lab(16, 57, '(pre-synaptic)', { size: 10, c: 'var(--diagram-green)' }),
    lab(350, 40, 'Synaptic vesicle with', { size: 10, c: 'var(--diagram-red)' }), lab(350, 53, 'neurotransmitter', { size: 10, c: 'var(--diagram-red)' }), S.lead(348, 46, 276, 66),
    lab(360, 128, 'Synaptic cleft', { size: 10 }), S.lead(358, 124, 300, 128),
    lab(360, 162, 'Receptors on the', { size: 10, c: 'var(--diagram-blue)' }), lab(360, 175, 'post-synaptic membrane', { size: 10, c: 'var(--diagram-blue)' }), S.lead(358, 160, 310, 146),
    lab(16, 132, 'Neurotransmitter', { size: 10, c: 'var(--diagram-red)' }), lab(16, 145, 'released by exocytosis', { size: 10, c: 'var(--diagram-red)' }), S.lead(130, 132, 222, 126),
    lab(262, 206, 'ions enter: new potential', { size: 10, c: 'var(--diagram-blue)' }),
    lab(16, 228, 'Post-synaptic neuron', { size: 10, c: 'var(--diagram-blue)' }),
  ].join(''),
);

// 5. Brain, sagittal section (schematic)
export const BRAIN = svgDoc(
  480,
  300,
  'Human brain, sagittal section, schematic. Forebrain: the large cerebrum of two hemispheres joined by the corpus callosum, with the convoluted cerebral cortex outside; the thalamus deep in the centre, wrapped by the cerebrum; the hypothalamus at the base of the thalamus, with the pituitary below. Midbrain between the thalamus and the pons. Hindbrain: the pons, the convoluted cerebellum at the back, and the medulla oblongata continuing into the spinal cord. The midbrain, pons and medulla form the brain stem',
  [
    S.path('M70 170 C40 120 70 40 170 30 C260 20 340 40 360 100 C372 140 350 172 320 176 C280 180 250 170 220 176 C180 184 140 196 110 194 C90 192 78 184 70 170 Z', { fill: 'var(--diagram-blue)', fop: 0.12, c: 'var(--diagram-blue)', w: 2 }),
    S.path('M110 90 C130 60 170 52 210 54 C250 56 280 66 300 92', { c: 'var(--diagram-blue)', w: 1 }),
    S.path('M140 110 C170 92 230 90 270 108 C250 104 170 104 140 110 Z', { fill: 'var(--diagram-brown)', fop: 0.5, c: 'var(--diagram-brown)', w: 1.5 }),
    S.ellipse(212, 132, 28, 16, { fill: 'var(--diagram-green)', fop: 0.35, c: 'var(--diagram-green)', sw: 1.5 }),
    S.ellipse(196, 160, 16, 9, { fill: 'var(--diagram-yellow)', fop: 0.5, c: 'var(--diagram-brown)', sw: 1.2 }),
    S.path('M186 168 L184 186 C184 194 192 196 194 186 L194 168', { fill: 'var(--diagram-yellow)', fop: 0.4, c: 'var(--diagram-brown)', w: 1 }),
    S.path('M228 150 L250 150 L256 190 L232 190 Z', { fill: 'var(--diagram-red)', fop: 0.3, c: 'var(--diagram-red)', w: 1.5 }),
    S.ellipse(250, 206, 22, 16, { fill: 'var(--diagram-accent)', fop: 0.3, c: 'var(--diagram-accent)', sw: 1.5 }),
    S.path('M238 220 L240 262 L258 262 L262 220', { fill: 'var(--diagram-accent)', fop: 0.2, c: 'var(--diagram-accent)', w: 1.5 }),
    S.path('M244 262 L244 296 M256 262 L256 296', { w: 1.5 }),
    S.path('M280 186 C300 176 350 176 368 196 C380 212 366 236 340 238 C312 240 286 230 278 212 Z', { fill: 'var(--diagram-accent)', fop: 0.18, c: 'var(--diagram-accent)', w: 1.5 }),
    S.path('M290 200 C310 192 340 192 360 204 M288 214 C310 208 340 210 356 222', { c: 'var(--diagram-accent)', w: 1 }),
    lab(6, 20, 'Cerebrum (cerebral cortex outside)', { c: 'var(--diagram-blue)' }), S.lead(80, 24, 110, 46),
    lab(330, 24, 'Corpus callosum', { size: 10, c: 'var(--diagram-brown)' }), S.lead(328, 28, 250, 100),
    lab(386, 132, 'Thalamus', { size: 10, c: 'var(--diagram-green)' }), S.lead(384, 129, 240, 132),
    lab(6, 154, 'Hypothalamus', { size: 10, c: 'var(--diagram-brown)' }), S.lead(80, 151, 180, 160),
    lab(6, 200, 'Pituitary', { size: 10 }), S.lead(56, 197, 184, 188),
    lab(386, 166, 'Midbrain', { size: 10, c: 'var(--diagram-red)' }), S.lead(384, 163, 254, 166),
    lab(6, 260, 'Pons', { size: 10, c: 'var(--diagram-accent)' }), S.lead(34, 257, 230, 208),
    lab(386, 214, 'Cerebellum', { size: 10, c: 'var(--diagram-accent)' }), S.lead(384, 211, 366, 210),
    lab(290, 262, 'Medulla oblongata', { size: 10, c: 'var(--diagram-accent)' }), S.lead(288, 259, 260, 244),
    lab(266, 290, 'Spinal cord', { size: 10 }),
    lab(386, 260, 'Brain stem =', { size: 10, c: M }), lab(386, 273, 'midbrain + pons', { size: 10, c: M }), lab(386, 286, '+ medulla', { size: 10, c: M }),
  ].join(''),
);

// 6. Reflex arc (knee jerk)
export const REFLEX = svgDoc(
  480,
  260,
  'Reflex arc of the knee jerk, schematic. A tap below the knee cap stretches the thigh muscle; a receptor in the muscle sends an impulse along the afferent (sensory) neuron, which enters the spinal cord through the dorsal nerve root; in the grey matter of the spinal cord it passes the impulse across a synapse to an efferent (motor) neuron, which leaves through the ventral root and carries the impulse to the effector, the thigh muscle, which contracts and the leg kicks forward',
  [
    S.circle(360, 120, 70, { fill: 'var(--diagram-fill)', c: 'currentColor', sw: 1.5 }),
    S.path('M330 80 C346 98 352 108 360 112 C368 108 374 98 390 80 C384 104 372 118 372 120 C372 122 384 136 392 160 C374 142 368 132 360 128 C352 132 346 142 328 160 C336 136 348 122 348 120 C348 118 336 104 330 80 Z', { fill: M, fop: 0.35, c: M, w: 1 }),
    lab(360, 206, 'Spinal cord (section)', { size: 10, a: 'middle' }),
    lab(402, 124, 'Grey', { size: 10 }), lab(402, 136, 'matter', { size: 10 }),
    S.ellipse(286, 70, 12, 8, { fill: 'var(--diagram-blue)', fop: 0.3, c: 'var(--diagram-blue)', sw: 1 }),
    S.path('M60 120 C120 60 220 60 286 70 C320 74 340 84 354 100', { c: 'var(--diagram-blue)', w: 2 }),
    S.midHead(150, 74, 220, 66, { c: 'var(--diagram-blue)' }),
    S.circle(357, 104, 3, { fill: 'var(--diagram-blue)', sw: 0 }),
    S.path('M352 136 C330 170 300 186 220 190 C160 194 110 180 80 156', { c: 'var(--diagram-red)', w: 2 }),
    S.circle(352, 136, 4, { fill: 'var(--diagram-red)', sw: 0 }),
    S.midHead(220, 190, 150, 188, { c: 'var(--diagram-red)' }),
    S.ellipse(70, 140, 30, 46, { fill: 'var(--diagram-red)', fop: 0.15, c: 'var(--diagram-red)', sw: 1.5 }),
    S.circle(60, 120, 4, { fill: 'var(--diagram-blue)', sw: 0 }),
    lab(6, 18, 'Thigh muscle', { size: 10 }), lab(6, 31, '(receptor and effector)', { size: 10, c: M }), S.lead(40, 36, 60, 96),
    lab(110, 50, 'Afferent (sensory) neuron', { size: 10, c: 'var(--diagram-blue)' }),
    lab(250, 46, 'Dorsal root', { size: 10, c: 'var(--diagram-blue)' }), S.lead(270, 50, 282, 62),
    lab(380, 30, 'Synapse in', { size: 10 }), lab(380, 43, 'grey matter', { size: 10 }), S.lead(378, 40, 358, 110),
    lab(120, 214, 'Efferent (motor) neuron', { size: 10, c: 'var(--diagram-red)' }),
    lab(310, 238, 'leaves by the ventral root', { size: 10, c: 'var(--diagram-red)' }), S.lead(330, 228, 330, 162),
    lab(6, 248, 'Tap on the tendon below the knee cap: stimulus', { size: 10, c: M }),
  ].join(''),
);

export const ALL = { NEURON, RESTING, ACTION, SYNAPSE, BRAIN, REFLEX };
