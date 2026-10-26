// Hand-drawn SVG schematics for ch06 Control and Coordination (allow-listed elements, palette colours only).
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

// 1. Neuron
export const NEURON = svgDoc(
  340,
  170,
  'A neuron: branched dendrites pick up information, the cell body with its nucleus, a long axon carries the electrical impulse, and branched nerve endings pass it on',
  [
    // dendrites
    S.path('M54 70 L34 50 L20 40 M34 50 L30 32 M50 92 L28 100 L10 96 M28 100 L18 114 M62 63 L58 40 L48 26 M58 40 L70 26 M62 108 L54 130 L42 142 M54 130 L66 146', { w: 2, cap: 'round' }),
    // cell body + nucleus
    S.path('M60 62 C80 56 96 70 95 85 C96 100 82 112 66 108 C50 106 46 92 50 80 C50 70 54 64 60 62 Z', { fill: 'var(--diagram-fill)', w: 1.5 }),
    S.circle(72, 85, 8, { fill: 'var(--diagram-muted)', sw: 1 }),
    // axon
    S.path('M95 85 L282 85', { w: 3, cap: 'round' }),
    // nerve endings
    S.path('M282 85 L304 66 M282 85 L310 85 M282 85 L304 104', { w: 2, cap: 'round' }),
    S.circle(306, 64, 3.5, { fill: 'currentColor', sw: 0 }),
    S.circle(313, 85, 3.5, { fill: 'currentColor', sw: 0 }),
    S.circle(306, 106, 3.5, { fill: 'currentColor', sw: 0 }),
    // impulse arrow
    S.arrow(130, 62, 250, 62, { c: 'var(--diagram-accent)', w: 2 }),
    lab(190, 54, 'Direction of the impulse', { a: 'middle', c: 'var(--diagram-accent)' }),
    // labels
    lab(4, 14, 'Dendrites'),
    S.lead(26, 18, 30, 34),
    lab(100, 34, 'Nucleus'),
    S.lead(104, 38, 76, 80),
    lab(96, 150, 'Cell body'),
    S.lead(104, 140, 86, 104),
    lab(190, 104, 'Axon', { a: 'middle' }),
    lab(330, 140, 'Nerve endings', { a: 'end' }),
    S.lead(300, 130, 305, 111),
  ].join(''),
);

// 2. Synapse
export const SYNAPSE = svgDoc(
  340,
  180,
  'A synapse: the electrical impulse reaches the axon ending of the first neuron, chemicals are released into the small gap, and they start a new electrical impulse in the dendrite of the next neuron',
  [
    // neuron 1 axon ending (bulb)
    S.path('M0 74 H96 C120 52 158 58 158 85 C158 112 120 118 96 96 H0', { fill: 'var(--diagram-fill)', w: 1.5 }),
    S.circle(124, 76, 7, { sw: 1 }),
    S.circle(138, 96, 7, { sw: 1 }),
    S.circle(116, 98, 6, { sw: 1 }),
    ...[[122, 75], [126, 78], [137, 95], [140, 98], [115, 97], [118, 100]].map(([x, y]) => S.circle(x, y, 1.6, { fill: 'var(--diagram-accent)', sw: 0 })),
    // gap chemicals
    ...[[164, 78], [170, 88], [165, 96], [172, 72], [174, 100]].map(([x, y]) => S.circle(x, y, 2, { fill: 'var(--diagram-accent)', sw: 0 })),
    // neuron 2 dendrite
    S.path('M340 66 H214 C192 66 180 72 180 85 C180 98 192 104 214 104 H340', { fill: 'var(--diagram-fill)', w: 1.5 }),
    // arrows
    S.arrow(14, 44, 92, 44, { c: 'var(--diagram-accent)', w: 2 }),
    lab(10, 32, 'Electrical impulse'),
    S.arrow(236, 44, 318, 44, { c: 'var(--diagram-accent)', w: 2 }),
    lab(330, 32, 'New impulse starts', { a: 'end' }),
    // labels
    lab(62, 132, 'Axon ending', { a: 'middle' }),
    lab(62, 145, 'of neuron 1', { a: 'middle' }),
    lab(278, 132, 'Dendrite', { a: 'middle' }),
    lab(278, 145, 'of neuron 2', { a: 'middle' }),
    lab(170, 160, 'Synapse: chemicals', { a: 'middle' }),
    lab(170, 173, 'cross the gap', { a: 'middle' }),
    S.lead(170, 150, 169, 104),
  ].join(''),
);

// 3. Reflex arc
export const REFLEX = svgDoc(
  340,
  230,
  'Reflex arc: a receptor in the skin sends an impulse along a sensory neuron into the spinal cord, a relay neuron passes it to a motor neuron, and the motor neuron makes the muscle (effector) contract; a branch also carries the message up to the brain',
  [
    // spinal cord cross-section
    S.circle(90, 115, 52, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    S.path('M70 84 C78 80 84 96 90 100 C96 96 102 80 110 84 C116 90 108 104 100 115 C108 126 116 140 110 146 C102 150 96 134 90 130 C84 134 78 150 70 146 C64 140 72 126 80 115 C72 104 64 90 70 84 Z', { fill: 'var(--diagram-muted)', fop: 0.5, w: 1 }),
    // up to brain
    S.arrow(90, 62, 90, 18, { c: 'var(--diagram-accent)', w: 1.5, dash: '4 3' }),
    lab(98, 24, 'Message also goes to the brain', { c: 'var(--diagram-accent)' }),
    // receptor (skin)
    S.path('M268 58 C284 50 304 50 320 58', { w: 2 }),
    S.circle(294, 60, 5, { fill: 'var(--diagram-accent)', sw: 0 }),
    // sensory neuron: receptor -> ganglion -> dorsal horn
    S.path('M294 60 L190 64 L132 74 L106 90', { w: 2, c: 'var(--diagram-blue)' }),
    S.circle(178, 66, 6, { fill: 'var(--diagram-blue)', sw: 0 }),
    S.midHead(294, 60, 190, 64, { c: 'var(--diagram-blue)', size: 8 }),
    S.midHead(178, 66, 132, 74, { c: 'var(--diagram-blue)', size: 8 }),
    // relay neuron
    S.path('M106 90 C96 104 96 124 102 138', { w: 2, c: 'var(--diagram-green)' }),
    S.circle(98, 114, 4, { fill: 'var(--diagram-green)', sw: 0 }),
    // motor neuron
    S.circle(102, 140, 5, { fill: 'var(--diagram-red)', sw: 0 }),
    S.path('M102 140 L136 158 L260 178', { w: 2, c: 'var(--diagram-red)' }),
    S.midHead(136, 158, 260, 178, { c: 'var(--diagram-red)', size: 8 }),
    // muscle (effector)
    S.ellipse(286, 182, 30, 12, { fill: 'var(--diagram-red)', fop: 0.25, sw: 1.5 }),
    S.path('M262 182 H310 M266 177 H306 M266 187 H306', { w: 0.8, c: 'var(--diagram-red)' }),
    // labels
    lab(330, 44, 'Receptor in the skin', { a: 'end' }),
    lab(236, 82, 'Sensory neuron', { a: 'middle', c: 'var(--diagram-blue)' }),
    lab(150, 116, 'Relay neuron', { c: 'var(--diagram-green)' }),
    S.lead(148, 113, 100, 112),
    lab(196, 204, 'Motor neuron', { a: 'middle', c: 'var(--diagram-red)' }),
    lab(330, 214, 'Muscle (effector)', { a: 'end' }),
    lab(90, 186, 'Spinal cord', { a: 'middle' }),
    lab(90, 199, '(cross-section)', { a: 'middle' }),
    lab(4, 222, 'Grey matter (shaded) holds the connections'),
  ].join(''),
);

// 4. Human brain (side view, facing left)
export const BRAIN = svgDoc(
  340,
  240,
  'Side view of the human brain facing left: the large forebrain (cerebrum) on top, the small midbrain in the middle, and the hindbrain made of the cerebellum at the back, the pons and the medulla, which continues as the spinal cord; the pituitary gland hangs below the forebrain',
  [
    // cerebrum
    S.path('M70 130 C48 112 52 62 92 42 C136 18 214 22 254 54 C284 80 282 116 258 132 C240 140 218 132 204 126 C190 120 176 122 168 124 C150 128 120 140 98 140 C86 140 76 136 70 130 Z', { fill: 'var(--diagram-fill)' }),
    S.path('M100 70 C120 60 140 76 160 64 C180 52 200 70 222 62 M90 100 C112 92 130 106 150 96 C172 86 196 100 230 92', { w: 1, c: 'var(--diagram-muted)' }),
    // midbrain
    S.path('M156 124 C164 118 180 118 186 126 C184 136 172 142 160 140 Z', { fill: 'var(--diagram-yellow)', fop: 0.5, w: 1.2 }),
    // pons
    S.path('M160 140 C176 138 190 142 188 156 C186 168 168 170 160 164 Z', { fill: 'var(--diagram-green)', fop: 0.4, w: 1.2 }),
    // medulla + spinal cord
    S.path('M162 164 C170 168 182 166 184 160 L182 196 L178 236 M162 164 L164 196 L166 236', { w: 1.5 }),
    S.path('M164 168 L182 168 L180 196 L164 196 Z', { fill: 'var(--diagram-brown)', fop: 0.35, w: 0 }),
    // cerebellum
    S.ellipse(226, 156, 38, 22, { fill: 'var(--diagram-muted)', fop: 0.35 }),
    S.path('M196 150 C214 144 238 144 258 150 M194 160 C214 154 240 154 262 160 M200 170 C216 166 236 166 254 170', { w: 1, c: 'var(--diagram-muted)' }),
    // pituitary
    S.line(134, 136, 132, 148, { w: 1.2 }),
    S.circle(132, 152, 5, { fill: 'var(--diagram-red)', fop: 0.6, sw: 1 }),
    // labels
    lab(165, 82, 'Forebrain (cerebrum)', { a: 'middle', size: 12, w: 'bold' }),
    lab(6, 118, 'Midbrain'),
    S.lead(52, 115, 158, 128),
    lab(6, 158, 'Pituitary gland'),
    S.lead(84, 155, 126, 152),
    lab(6, 186, 'Pons'),
    S.lead(32, 183, 162, 154),
    lab(6, 206, 'Medulla'),
    S.lead(48, 203, 163, 184),
    lab(6, 232, 'Spinal cord'),
    S.lead(68, 229, 164, 226),
    lab(334, 196, 'Cerebellum', { a: 'end' }),
    S.lead(290, 188, 248, 172),
    lab(334, 222, 'Hindbrain: cerebellum,', { a: 'end', c: 'var(--diagram-accent)' }),
    lab(334, 235, 'pons and medulla', { a: 'end', c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 5. Touch-me-not
const leaflets = (x0, y0, open) => {
  const out = [];
  for (let i = 0; i < 6; i++) {
    const x = x0 + 14 + i * 17;
    if (open) {
      out.push(S.ellipse(x, y0 - 13, 5, 11, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1 }));
      out.push(S.ellipse(x, y0 + 13, 5, 11, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1 }));
    } else {
      out.push(S.ellipse(x + 4, y0 - 3, 10, 3, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1 }));
    }
  }
  return out.join('');
};
export const MIMOSA = svgDoc(
  330,
  170,
  'Touch-me-not leaf before and after touching: before, the leaflets are spread out on both sides of the stalk; within seconds of a touch they fold together and the stalk droops',
  [
    lab(80, 18, 'Before touching', { a: 'middle', w: 'bold' }),
    lab(250, 18, 'A few seconds after', { a: 'middle', w: 'bold' }),
    S.line(10, 120, 20, 70, { w: 2 }),
    S.line(20, 70, 136, 70, { w: 1.5 }),
    leaflets(20, 70, true),
    S.line(180, 150, 192, 70, { w: 2 }),
    S.path('M192 70 C220 80 262 98 300 122', { w: 1.5 }),
    ...[0, 1, 2, 3, 4, 5].map((i) => {
      const t = (i + 0.6) / 6.5;
      const x = 192 + 108 * t;
      const y = 70 + 52 * t * t + 6 * t;
      return S.ellipse(x, y, 9, 3, { fill: 'var(--diagram-green)', fop: 0.5, sw: 1 });
    }),
    lab(80, 112, 'Leaflets open', { a: 'middle' }),
    lab(250, 150, 'Leaflets folded,', { a: 'middle' }),
    lab(250, 163, 'stalk droops', { a: 'middle' }),
    lab(80, 150, 'No growth involved:', { a: 'middle', c: 'var(--diagram-accent)' }),
    lab(80, 163, 'cells lose water', { a: 'middle', c: 'var(--diagram-accent)' }),
  ].join(''),
);

// 6. Phototropism and geotropism
export const TROPISM = svgDoc(
  340,
  210,
  'Two tropisms: a potted seedling lit from the right bends its shoot towards the light; a seedling laid on its side in the dark turns its shoot upwards and its root downwards',
  [
    lab(80, 16, 'Light from one side', { a: 'middle', w: 'bold' }),
    // light source
    S.circle(152, 46, 9, { fill: 'var(--diagram-yellow)', sw: 1 }),
    S.arrow(140, 58, 112, 82, { c: 'var(--diagram-yellow)', w: 1.5 }),
    S.arrow(138, 66, 114, 96, { c: 'var(--diagram-yellow)', w: 1.5 }),
    lab(162, 38, 'Light'),
    // pot
    S.path('M40 150 L120 150 L112 196 L48 196 Z', { fill: 'var(--diagram-brown)', fop: 0.35 }),
    S.line(40, 150, 120, 150, { w: 2 }),
    // shoot bending right
    S.path('M80 150 C80 120 84 96 104 76', { w: 2.5, c: 'var(--diagram-green)' }),
    S.ellipse(106, 72, 9, 4, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 }),
    S.path('M80 152 L78 176 M80 160 L70 172 M80 160 L90 174', { w: 1.2, dash: '3 2' }),
    lab(6, 60, 'Shoot bends'),
    lab(6, 73, 'towards light'),
    S.lead(54, 78, 82, 112),
    // second panel
    S.line(178, 10, 178, 206, { c: 'var(--diagram-muted)', w: 1, dash: '4 4' }),
    lab(262, 16, 'Laid on its side, in the dark', { a: 'middle', w: 'bold' }),
    S.ellipse(258, 112, 10, 7, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1.2 }),
    S.path('M268 112 C292 112 304 104 308 76', { w: 2.5, c: 'var(--diagram-green)' }),
    S.ellipse(308, 70, 4, 8, { fill: 'var(--diagram-green)', fop: 0.6, sw: 1 }),
    S.path('M248 112 C222 112 210 122 206 152', { w: 2, c: 'var(--diagram-brown)' }),
    lab(330, 48, 'Shoot turns up', { a: 'end' }),
    lab(198, 176, 'Root turns down'),
    S.arrow(320, 140, 320, 190, { w: 1.5 }),
    lab(316, 204, 'Gravity', { a: 'end' }),
  ].join(''),
);

// 7. Auxin and bending
export const AUXIN = svgDoc(
  330,
  210,
  'Light falls on a shoot tip from the left; auxin made at the tip moves to the shaded right side, cells there grow longer, and the shoot bends towards the light',
  [
    // light arrows
    ...[50, 80, 110].map((y) => S.arrow(8, y, 58, y, { c: 'var(--diagram-yellow)', w: 2 })),
    lab(8, 36, 'Light'),
    // shoot band
    S.path('M150 204 C148 150 134 100 96 60 L114 46 C156 90 176 146 184 204 Z', { fill: 'var(--diagram-green)', fop: 0.18, w: 1.5 }),
    // tip
    S.circle(104, 52, 4, { fill: 'var(--diagram-accent)', sw: 0 }),
    // auxin dots on shaded (right) side
    ...[[122, 62], [134, 78], [146, 96], [155, 114], [163, 133], [169, 152], [174, 172], [177, 192]].map(([x, y]) => S.circle(x, y, 2.6, { fill: 'var(--diagram-accent)', sw: 0 })),
    lab(140, 22, 'Auxin is made at the tip', { c: 'var(--diagram-accent)' }),
    S.lead(150, 26, 108, 50),
    lab(196, 96, 'Auxin collects on'),
    lab(196, 109, 'the shaded side', {}),
    S.lead(194, 104, 150, 112),
    lab(196, 158, 'Cells here grow longer,'),
    lab(196, 171, 'so the shoot curves'),
    lab(196, 184, 'towards the light'),
    S.lead(194, 166, 172, 172),
  ].join(''),
);

// 8. Tendril coiling
export const TENDRIL = svgDoc(
  320,
  190,
  'A tendril touching a stick: the side touching the stick grows slowly while the outer side grows faster, so the tendril coils around the support',
  [
    S.rect(150, 10, 12, 176, { fill: 'var(--diagram-brown)', fop: 0.4, sw: 1.2 }),
    S.path('M20 170 C60 160 110 150 146 132 C170 124 172 116 150 110 C128 104 130 96 156 92 C180 88 178 80 152 74 C130 70 132 62 158 58 C178 54 176 46 156 42', { w: 2.2, c: 'var(--diagram-green)' }),
    lab(176, 70, 'Outer side grows faster'),
    S.lead(174, 66, 168, 60),
    lab(176, 120, 'Side touching the stick'),
    lab(176, 133, 'grows more slowly'),
    S.lead(174, 117, 160, 112),
    lab(20, 186, 'Tendril of a climbing plant'),
    lab(176, 22, 'Support (stick)'),
    S.lead(174, 20, 162, 26),
  ].join(''),
);

// 9. Endocrine glands
export const GLANDS = svgDoc(
  340,
  310,
  'Positions of the main endocrine glands in the human body: pineal gland, hypothalamus and pituitary gland in the head; thyroid in the neck; thymus in the chest; pancreas and adrenal glands above the kidneys in the abdomen; ovaries in females and testes in males',
  [
    // body outline
    S.circle(170, 42, 28, { c: 'var(--diagram-muted)' }),
    S.path('M158 70 L158 82 C130 86 116 94 112 112 L106 250 C120 262 220 262 234 250 L228 112 C224 94 210 86 182 82 L182 70', { c: 'var(--diagram-muted)' }),
    // head glands
    S.circle(176, 30, 3.5, { fill: 'var(--diagram-accent)', sw: 0 }),
    S.circle(168, 44, 3.5, { fill: 'var(--diagram-accent)', sw: 0 }),
    S.circle(164, 54, 3.5, { fill: 'var(--diagram-accent)', sw: 0 }),
    // thyroid
    S.path('M160 80 C160 72 168 74 170 78 C172 74 180 72 180 80 C180 88 172 88 170 84 C168 88 160 88 160 80 Z', { fill: 'var(--diagram-red)', fop: 0.5, w: 1 }),
    // thymus
    S.ellipse(170, 118, 10, 14, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }),
    // pancreas
    S.path('M150 168 C160 160 186 162 196 166 C190 174 160 176 150 168 Z', { fill: 'var(--diagram-yellow)', fop: 0.6, w: 1 }),
    // kidneys + adrenals
    S.ellipse(146, 200, 9, 14, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 1 }),
    S.ellipse(194, 200, 9, 14, { fill: 'var(--diagram-brown)', fop: 0.35, sw: 1 }),
    S.path('M138 186 C140 178 152 178 154 186 Z M186 186 C188 178 200 178 202 186 Z', { fill: 'var(--diagram-accent)', fop: 0.8, w: 1 }),
    // ovaries
    S.ellipse(148, 238, 6, 4, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1 }),
    S.ellipse(192, 238, 6, 4, { fill: 'var(--diagram-red)', fop: 0.5, sw: 1 }),
    // testes (male, shown below)
    S.ellipse(162, 282, 6, 8, { fill: 'var(--diagram-blue)', fop: 0.5, sw: 1 }),
    S.ellipse(178, 282, 6, 8, { fill: 'var(--diagram-blue)', fop: 0.5, sw: 1 }),
    // left labels
    lab(4, 20, 'Pineal gland'),
    S.lead(74, 18, 172, 29),
    lab(4, 42, 'Hypothalamus'),
    S.lead(82, 40, 164, 44),
    lab(4, 64, 'Pituitary gland'),
    S.lead(88, 61, 160, 55),
    lab(4, 92, 'Thyroid'),
    S.lead(46, 89, 158, 81),
    lab(4, 122, 'Thymus'),
    S.lead(46, 119, 159, 118),
    lab(4, 234, 'Ovaries (in females)'),
    S.lead(116, 231, 141, 237),
    // right labels
    lab(336, 158, 'Pancreas', { a: 'end' }),
    S.lead(284, 155, 196, 166),
    lab(336, 186, 'Adrenal glands', { a: 'end' }),
    S.lead(250, 183, 202, 183),
    lab(336, 210, 'Kidneys', { a: 'end' }),
    S.lead(290, 207, 204, 204),
    lab(336, 286, 'Testes (in males)', { a: 'end' }),
    S.lead(240, 283, 185, 283),
  ].join(''),
);

export const ALL = { NEURON, SYNAPSE, REFLEX, BRAIN, MIMOSA, TROPISM, AUXIN, TENDRIL, GLANDS };
