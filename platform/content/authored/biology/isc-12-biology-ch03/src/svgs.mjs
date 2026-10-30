// SVG schematics for ISC 12 Biology ch03 Human Reproduction (allow-listed elements, palette colours only), copied from
// cbse-12-biology-ch02/src/svgs.mjs (same author). Human systems are neutral, labelled schematics (front views, not to scale).
import { svgDoc, S } from '../../isc-12-biology-ch01/src/lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });
const f1 = (n) => (Math.round(n * 10) / 10).toString();
/** Mirror a path about x = cx (absolute M/L/C commands with x y pairs only). */
const mirror = (d, cx = 160) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${f1(2 * cx - Number(x))} ${y}`);
const nucleus = (x, y, r = 3) => S.circle(x, y, r, { fill: 'var(--diagram-muted)', sw: 0.6 });

// 1. Male reproductive system (front view, schematic)
const vasL = 'M108 214 C94 188 90 136 102 104 C110 82 128 76 140 84 C148 90 150 100 152 112';
const epiL = 'M92 206 C84 220 86 246 98 254';
export const MALE = svgDoc(
  360,
  300,
  'Human male reproductive system, front view, schematic: testes in the scrotum with an epididymis along each; a vas deferens from each running up behind the urinary bladder; seminal vesicles joining the vasa deferentia to form ejaculatory ducts in the prostate; bulbourethral glands below the prostate; the urethra running through the penis to the urethral meatus',
  [
    S.ellipse(160, 56, 36, 28, { fill: 'var(--diagram-yellow)', fop: 0.25 }),
    S.path('M128 104 C114 98 112 78 120 74 C128 80 134 92 138 104 Z', { fill: 'var(--diagram-green)', fop: 0.35, w: 1 }),
    S.path(mirror('M128 104 C114 98 112 78 120 74 C128 80 134 92 138 104 Z'), { fill: 'var(--diagram-green)', fop: 0.35, w: 1 }),
    S.ellipse(160, 112, 18, 12, { fill: 'var(--diagram-muted)', fop: 0.55 }),
    S.circle(146, 134, 4, { fill: 'var(--diagram-brown)', fop: 0.7, sw: 1 }),
    S.circle(174, 134, 4, { fill: 'var(--diagram-brown)', fop: 0.7, sw: 1 }),
    S.ellipse(110, 232, 32, 36, { c: 'var(--diagram-muted)' }),
    S.ellipse(210, 232, 32, 36, { c: 'var(--diagram-muted)' }),
    S.ellipse(110, 234, 15, 21, { fill: 'var(--diagram-fill)' }),
    S.ellipse(210, 234, 15, 21, { fill: 'var(--diagram-fill)' }),
    S.path(epiL, { w: 4, c: 'var(--diagram-blue)', fop: 0.6, cap: 'round' }),
    S.path(mirror(epiL), { w: 4, c: 'var(--diagram-blue)', cap: 'round' }),
    S.path(vasL, { w: 2, c: 'var(--diagram-blue)' }),
    S.path(mirror(vasL), { w: 2, c: 'var(--diagram-blue)' }),
    S.rect(149, 140, 22, 112, { rx: 10, fill: 'var(--diagram-fill)' }),
    S.line(160, 84, 160, 250, { w: 2, c: 'var(--diagram-accent)' }),
    S.circle(160, 252, 2.5, { fill: 'var(--diagram-accent)', sw: 0 }),
    lab(4, 44, 'Urinary bladder'),
    S.lead(86, 48, 126, 54),
    lab(4, 120, 'Vas deferens', { c: 'var(--diagram-blue)' }),
    S.lead(74, 117, 94, 130),
    lab(4, 196, 'Epididymis', { c: 'var(--diagram-blue)' }),
    S.lead(62, 199, 88, 212),
    lab(4, 240, 'Testis'),
    S.lead(40, 237, 96, 234),
    lab(4, 284, 'Scrotum'),
    S.lead(50, 280, 92, 262),
    lab(356, 80, 'Seminal vesicle', { a: 'end' }),
    S.lead(270, 83, 198, 90),
    lab(356, 112, 'Prostate (ejaculatory', { a: 'end' }),
    lab(356, 125, 'ducts pass through it)', { a: 'end' }),
    S.lead(240, 113, 178, 112),
    lab(356, 152, 'Bulbourethral gland', { a: 'end' }),
    S.lead(246, 149, 178, 135),
    lab(356, 190, 'Penis', { a: 'end' }),
    S.lead(320, 187, 172, 190),
    lab(356, 220, 'Urethra', { a: 'end', c: 'var(--diagram-accent)' }),
    S.lead(310, 217, 162, 218),
    lab(356, 272, 'Urethral meatus', { a: 'end' }),
    S.lead(270, 268, 163, 253),
  ].join(''),
);

// 2. Female reproductive system (front view, schematic)
const tubeL = 'M122 74 C104 66 92 60 80 58 C66 56 54 64 52 78';
export const FEMALE = svgDoc(
  380,
  290,
  'Human female reproductive system, front view, schematic: ovaries beside the ends of the oviducts; each oviduct has a funnel-shaped infundibulum with fimbriae, a wider ampulla and a narrow isthmus joining the uterus; the uterine wall has perimetrium, myometrium and endometrium; the cervix opens into the vagina',
  [
    S.path('M118 74 C118 52 242 52 242 74 C242 120 214 156 204 176 L156 176 C146 156 118 120 118 74 Z', { fill: 'var(--diagram-red)', fop: 0.12, w: 2 }),
    S.path('M128 76 C128 62 232 62 232 76 C232 116 208 148 200 166 L160 166 C152 148 128 116 128 76 Z', { fill: 'var(--diagram-red)', fop: 0.25, w: 1 }),
    S.path('M146 80 L214 80 L184 146 L176 146 Z', { fill: 'var(--diagram-fill)', c: 'var(--diagram-red)', w: 1.2 }),
    S.rect(164, 176, 32, 18, { fill: 'var(--diagram-red)', fop: 0.35 }),
    S.path('M166 194 L166 276 M194 194 L194 276', { w: 1.5 }),
    S.path(tubeL, { w: 3, c: 'var(--diagram-red)' }),
    S.path(mirror(tubeL, 180), { w: 3, c: 'var(--diagram-red)' }),
    S.path('M52 78 l-9 5 M52 78 l-4 9 M52 78 l2 10 M52 78 l7 8', { w: 1.2, c: 'var(--diagram-red)' }),
    S.path('M308 78 l9 5 M308 78 l4 9 M308 78 l-2 10 M308 78 l-7 8', { w: 1.2, c: 'var(--diagram-red)' }),
    S.ellipse(72, 112, 18, 11, { fill: 'var(--diagram-fill)' }),
    S.ellipse(288, 112, 18, 11, { fill: 'var(--diagram-fill)' }),
    lab(4, 20, 'Ampulla'),
    S.lead(52, 22, 84, 56),
    lab(4, 40, 'Isthmus'),
    S.lead(48, 42, 108, 66),
    lab(376, 100, 'Infundibulum', { a: 'end' }),
    lab(376, 113, 'with fimbriae', { a: 'end' }),
    S.lead(300, 98, 310, 88),
    lab(4, 150, 'Ovary'),
    S.lead(34, 146, 62, 120),
    lab(376, 30, 'Perimetrium', { a: 'end' }),
    S.lead(316, 33, 232, 58),
    lab(376, 140, 'Myometrium', { a: 'end' }),
    S.lead(310, 137, 226, 116),
    lab(376, 160, 'Endometrium', { a: 'end' }),
    S.lead(310, 157, 204, 124),
    lab(376, 186, 'Cervix', { a: 'end' }),
    S.lead(336, 183, 197, 186),
    lab(376, 240, 'Vagina', { a: 'end' }),
    S.lead(336, 237, 195, 237),
    lab(176, 104, 'Uterine', { a: 'middle', size: 10 }),
    lab(180, 116, 'cavity', { a: 'middle', size: 10 }),
  ].join(''),
);

// 3. Seminiferous tubule (T.S., a sector)
const TX = 150;
const TY = 150;
const ring = (rr, n, size, opts) => Array.from({ length: n }, (_, i) => {
  const a = (i / n) * Math.PI * 2;
  return S.circle(TX + rr * Math.cos(a), TY + rr * Math.sin(a), size, opts);
}).join('');
export const TUBULE = svgDoc(
  440,
  300,
  'Transverse section of a seminiferous tubule: spermatogonia along the wall, primary and secondary spermatocytes and spermatids nearer the lumen, sperms with tails in the lumen, Sertoli cells stretching from the wall towards the lumen, and interstitial (Leydig) cells in the spaces outside the tubule',
  [
    S.circle(TX, TY, 120, { fill: 'var(--diagram-fill)', sw: 2 }),
    S.circle(TX, TY, 34, { fill: 'none', sw: 1, dash: '3 3' }),
    ring(110, 26, 7, { fill: 'var(--diagram-blue)', fop: 0.3, sw: 0.8 }),
    ring(90, 18, 8, { fill: 'var(--diagram-green)', fop: 0.3, sw: 0.8 }),
    ring(70, 16, 6, { fill: 'var(--diagram-yellow)', fop: 0.4, sw: 0.8 }),
    ring(52, 14, 4, { fill: 'var(--diagram-red)', fop: 0.4, sw: 0.8 }),
    ...Array.from({ length: 8 }, (_, i) => {
      const a = (i / 8) * Math.PI * 2 + 0.2;
      const x = TX + 30 * Math.cos(a);
      const y = TY + 30 * Math.sin(a);
      return S.ellipse(x, y, 3, 2, { fill: 'currentColor', sw: 0 }) + S.line(x, y, TX + 14 * Math.cos(a + 0.6), TY + 14 * Math.sin(a + 0.6), { w: 0.8 });
    }),
    S.path(`M${TX} ${TY + 118} C${TX - 10} ${TY + 90} ${TX + 8} ${TY + 66} ${TX} ${TY + 44}`, { w: 7, c: 'var(--diagram-muted)', cap: 'round' }),
    ...[[18, 24], [282, 30], [20, 280], [284, 276]].map(([x, y]) => S.ellipse(x, y, 10, 7, { fill: 'var(--diagram-brown)', fop: 0.4, sw: 1 }) + nucleus(x, y, 2)),
    lab(300, 60, 'Spermatogonia (wall)'),
    S.lead(298, 57, TX + 92, TY - 60),
    lab(300, 96, 'Primary spermatocytes'),
    S.lead(298, 93, TX + 84, TY - 32),
    lab(300, 132, 'Secondary spermatocytes'),
    S.lead(298, 129, TX + 70, TY - 4),
    lab(300, 168, 'Spermatids'),
    S.lead(298, 165, TX + 52, TY + 14),
    lab(300, 204, 'Sperms in the lumen'),
    S.lead(298, 201, TX + 30, TY + 10),
    lab(300, 240, 'Sertoli cell'),
    S.lead(298, 237, TX + 4, TY + 82),
    lab(300, 286, 'Interstitial (Leydig) cells'),
    S.lead(298, 283, 294, 278),
    S.text(TX, 296, 'Sizes not to scale; cell rows simplified', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 4. Sperm
export const SPERM = svgDoc(
  440,
  150,
  'Structure of a human sperm: a head containing the haploid nucleus and capped by the acrosome, a short neck, a middle piece packed with mitochondria, and a long tail',
  [
    S.ellipse(60, 70, 34, 22, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    S.path('M34 56 C40 44 66 42 84 52 C70 50 46 52 34 62 Z', { fill: 'var(--diagram-accent)', fop: 0.5, w: 1 }),
    S.ellipse(62, 74, 22, 14, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 1 }),
    S.rect(94, 64, 10, 12, { fill: 'var(--diagram-fill)', sw: 1 }),
    S.rect(104, 62, 70, 16, { rx: 6, fill: 'var(--diagram-yellow)', fop: 0.3, sw: 1.2 }),
    ...[0, 1, 2, 3, 4, 5].map((i) => S.path(`M${110 + i * 10} 66 C${114 + i * 10} 70 ${110 + i * 10} 72 ${114 + i * 10} 76`, { w: 1, c: 'var(--diagram-brown)' })),
    S.path('M174 70 C200 58 220 82 246 70 C272 58 292 82 318 70 C344 58 364 82 390 70 C404 64 414 68 424 70', { w: 2 }),
    lab(10, 20, 'Acrosome (enzymes)'),
    S.lead(60, 24, 52, 47),
    lab(10, 140, 'Nucleus (haploid)'),
    S.lead(56, 130, 60, 86),
    lab(80, 112, 'Neck'),
    S.lead(96, 104, 99, 78),
    lab(140, 112, 'Middle piece (mitochondria)'),
    S.lead(150, 102, 140, 80),
    lab(300, 112, 'Tail'),
    S.lead(310, 102, 318, 74),
    S.text(4, 104, 'Head', { size: 11, w: 'bold' }),
  ].join(''),
);

// 5. Ovary with follicles at different stages (schematic)
const OCX = 200;
const OCY = 150;
const oocyte = (x, y, r) => S.circle(x, y, r, { fill: 'var(--diagram-red)', fop: 0.3, sw: 1 }) + nucleus(x, y, r / 3);
const granulosa = (x, y, r, n) => Array.from({ length: n }, (_, i) => S.circle(x + r * Math.cos((i / n) * 2 * Math.PI), y + r * Math.sin((i / n) * 2 * Math.PI), 2.5, { fill: 'var(--diagram-yellow)', fop: 0.6, sw: 0.5 })).join('');
export const OVARY = svgDoc(
  460,
  300,
  'Schematic section of an ovary showing follicles at different stages arranged around it: a primary follicle with one layer of granulosa cells, a secondary follicle with more layers, a tertiary follicle with a fluid-filled antrum, a mature Graafian follicle, a secondary oocyte being released at ovulation, and a corpus luteum',
  [
    S.ellipse(OCX, OCY, 150, 110, { fill: 'var(--diagram-fill)', sw: 2 }),
    oocyte(128, 112, 7), granulosa(128, 112, 11, 10),
    oocyte(150, 210, 8), granulosa(150, 210, 13, 14), granulosa(150, 210, 18, 18),
    S.circle(245, 225, 26, { fill: 'var(--diagram-yellow)', fop: 0.15, sw: 1 }),
    S.path('M238 210 C254 204 264 218 258 232 C252 242 240 238 236 228 Z', { fill: 'var(--diagram-blue)', fop: 0.25, w: 0.8 }),
    oocyte(232, 220, 7),
    S.circle(300, 120, 40, { fill: 'var(--diagram-yellow)', fop: 0.15, sw: 1.2 }),
    S.circle(306, 116, 30, { fill: 'var(--diagram-blue)', fop: 0.2, sw: 0.8 }),
    oocyte(282, 138, 8), S.circle(282, 138, 11, { sw: 1.2, c: 'var(--diagram-accent)' }),
    S.path('M342 72 C352 60 366 56 378 60', { w: 1.2, dash: '3 3' }),
    oocyte(386, 56, 7),
    S.circle(160, 70, 24, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 1 }),
    lab(4, 146, 'Primary follicle'),
    S.lead(60, 136, 120, 120),
    lab(4, 262, 'Secondary follicle'),
    S.lead(78, 256, 136, 222),
    lab(250, 292, 'Tertiary follicle (antrum forms)'),
    S.lead(260, 282, 248, 251),
    lab(360, 170, 'Graafian follicle'),
    S.lead(358, 166, 336, 140),
    lab(360, 196, 'Zona pellucida'),
    S.lead(358, 192, 292, 144),
    lab(396, 40, 'Ovulation:', { a: 'middle' }),
    lab(410, 76, 'secondary oocyte', { a: 'middle' }),
    lab(30, 28, 'Corpus luteum (after ovulation)'),
    S.lead(120, 34, 148, 52),
  ].join(''),
);

// 6. Menstrual cycle: hormone levels (qualitative) and phases, 28-day cycle
const GX = 50;
const GW = 360; // width for 28 days
const dx = (d) => GX + (d / 28) * GW;
const curve = (pts, base) => pts.map(([d, h], i) => `${i ? 'L' : 'M'}${f1(dx(d))} ${f1(base - h)}`).join(' ');
export const CYCLE = svgDoc(
  440,
  300,
  'Menstrual cycle of 28 days, qualitative: LH and FSH rise to a sharp peak around day 14, just after estrogen peaks, and cause ovulation; progesterone stays low before ovulation and is high in the second half, falling at the end; below, the phases: menstrual (days 1 to 5), follicular, ovulation at about day 14, luteal; and the endometrium thinning at menstruation, thickening in the follicular phase and staying thick and glandular in the luteal phase',
  [
    S.line(GX, 170, GX + GW, 170, { w: 1 }),
    S.line(GX, 30, GX, 170, { w: 1 }),
    S.text(GX - 6, 34, 'Level', { a: 'end', size: 10 }),
    ...[0, 7, 14, 21, 28].map((d) => S.text(dx(d), 184, `Day ${d}`, { a: 'middle', size: 10 })),
    S.path(curve([[0, 10], [10, 14], [13, 30], [14, 110], [15, 30], [17, 12], [28, 10]], 170), { w: 2, c: 'var(--diagram-accent)' }),
    S.path(curve([[0, 22], [6, 30], [12, 34], [14, 66], [15, 30], [20, 16], [28, 20]], 170), { w: 2, c: 'var(--diagram-green)', dash: '6 3' }),
    S.path(curve([[0, 12], [6, 24], [11, 70], [13, 84], [15, 36], [21, 54], [26, 30], [28, 14]], 170), { w: 2, c: 'var(--diagram-blue)' }),
    S.path(curve([[0, 6], [14, 8], [17, 40], [21, 74], [25, 50], [28, 8]], 170), { w: 2, c: 'var(--diagram-brown)', dash: '2 3' }),
    lab(dx(14) + 6, 56, 'LH', { c: 'var(--diagram-accent)', w: 'bold' }),
    lab(dx(14) + 10, 112, 'FSH', { c: 'var(--diagram-green)', w: 'bold' }),
    lab(dx(8), 98, 'Estrogen', { c: 'var(--diagram-blue)', w: 'bold' }),
    lab(dx(21) + 6, 90, 'Progesterone', { c: 'var(--diagram-brown)', w: 'bold' }),
    S.rect(dx(0), 196, dx(5) - dx(0), 22, { fill: 'var(--diagram-red)', fop: 0.4, sw: 1 }),
    S.rect(dx(5), 196, dx(13.5) - dx(5), 22, { fill: 'var(--diagram-blue)', fop: 0.15, sw: 1 }),
    S.rect(dx(13.5), 196, dx(14.5) - dx(13.5), 22, { fill: 'var(--diagram-accent)', fop: 0.6, sw: 1 }),
    S.rect(dx(14.5), 196, dx(28) - dx(14.5), 22, { fill: 'var(--diagram-brown)', fop: 0.15, sw: 1 }),
    S.text((dx(0) + dx(5)) / 2, 211, 'Menstrual', { a: 'middle', size: 10 }),
    S.text((dx(5) + dx(13.5)) / 2, 211, 'Follicular', { a: 'middle', size: 10 }),
    S.text((dx(14.5) + dx(28)) / 2, 211, 'Luteal', { a: 'middle', size: 10 }),
    S.text(dx(14), 234, 'Ovulation', { a: 'middle', size: 10, c: 'var(--diagram-accent)' }),
    S.path(`M${dx(0)} 280 L${dx(0)} 262 C${dx(3)} 270 ${dx(4)} 274 ${dx(5)} 274 C${dx(9)} 266 ${dx(12)} 254 ${dx(14)} 250 C${dx(18)} 244 ${dx(24)} 242 ${dx(27)} 244 L${dx(28)} 262 L${dx(28)} 280 Z`, { fill: 'var(--diagram-red)', fop: 0.25, w: 1 }),
    S.text(GX - 6, 268, 'Endo-', { a: 'end', size: 10 }),
    S.text(GX - 6, 280, 'metrium', { a: 'end', size: 10 }),
    S.text(dx(14), 296, 'Curves are qualitative, not measured values', { a: 'middle', size: 10, c: 'var(--diagram-muted)' }),
  ].join(''),
);

// 7. From ovulation to implantation (oviduct and uterus)
export const JOURNEY = svgDoc(
  460,
  260,
  'Path from ovulation to implantation: the secondary oocyte released from the ovary enters the oviduct, is fertilised in the ampulla to form a zygote, which divides by cleavage while moving down the oviduct, forming a morula and then a blastocyst, which implants in the endometrium of the uterus',
  [
    S.ellipse(40, 200, 26, 16, { fill: 'var(--diagram-fill)' }),
    S.path('M60 150 C90 90 140 60 200 58 C260 56 300 70 330 90', { w: 22, c: 'var(--diagram-red)', fop: 0.2, cap: 'round' }),
    S.path('M330 90 C370 116 400 150 420 190 L420 250 L320 250 L320 160 Z', { fill: 'var(--diagram-red)', fop: 0.15, w: 1.5 }),
    S.path('M320 250 L320 170 C340 150 380 150 400 180 L410 250', { fill: 'var(--diagram-red)', fop: 0.2, w: 1 }),
    S.circle(52, 176, 5, { fill: 'var(--diagram-red)', fop: 0.4, sw: 1 }),
    S.circle(110, 92, 8, { fill: 'var(--diagram-red)', fop: 0.4, sw: 1 }),
    S.circle(110, 92, 2.5, { fill: 'currentColor', sw: 0 }),
    S.circle(170, 64, 8, { sw: 1 }), S.line(170, 56, 170, 72, { w: 0.8 }),
    S.circle(222, 60, 8, { sw: 1 }), S.line(214, 60, 230, 60, { w: 0.8 }), S.line(222, 52, 222, 68, { w: 0.8 }),
    S.circle(280, 70, 9, { fill: 'var(--diagram-yellow)', fop: 0.4, sw: 1 }),
    ...[[276, 66], [284, 66], [276, 74], [284, 74]].map(([x, y]) => S.circle(x, y, 3, { sw: 0.6 })),
    S.circle(365, 172, 12, { sw: 1.2 }),
    S.path('M357 166 C360 160 370 160 373 166 C370 170 360 170 357 166 Z', { fill: 'var(--diagram-green)', fop: 0.5, w: 0.8 }),
    lab(4, 236, 'Ovary: ovulation'),
    lab(100, 152, 'Fertilisation in', { size: 10 }),
    lab(100, 164, 'the ampulla', { size: 10 }),
    S.lead(112, 142, 110, 102),
    lab(140, 30, 'Cleavage', { size: 10 }),
    S.lead(164, 34, 176, 54),
    lab(250, 30, 'Morula', { size: 10 }),
    S.lead(266, 34, 278, 60),
    lab(220, 210, 'Blastocyst implants', { size: 10 }),
    lab(220, 222, 'in the endometrium', { size: 10 }),
    S.lead(300, 210, 353, 176),
    lab(456, 120, 'Uterus', { a: 'end', size: 10 }),
    S.arrow(130, 74, 152, 64, { c: 'var(--diagram-accent)', size: 6 }),
    S.arrow(238, 58, 262, 62, { c: 'var(--diagram-accent)', size: 6 }),
    S.arrow(296, 80, 340, 140, { c: 'var(--diagram-accent)', size: 6 }),
  ].join(''),
);

// 8. Blastocyst
export const BLASTOCYST = svgDoc(
  380,
  220,
  'A blastocyst: an outer layer of trophoblast cells, a fluid-filled cavity, and an inner cell mass attached to the trophoblast on one side',
  [
    S.circle(130, 110, 90, { fill: 'var(--diagram-fill)', sw: 1 }),
    ...Array.from({ length: 30 }, (_, i) => {
      const a = (i / 30) * Math.PI * 2;
      return S.ellipse(130 + 84 * Math.cos(a), 110 + 84 * Math.sin(a), 9, 5, { fill: 'var(--diagram-yellow)', fop: 0.5, sw: 0.7 });
    }),
    S.path('M70 50 C96 36 164 36 190 50 C172 90 88 90 70 50 Z', { fill: 'var(--diagram-green)', fop: 0.35, w: 1 }),
    ...[[100, 56], [120, 64], [140, 64], [160, 56], [130, 50], [110, 48], [150, 48]].map(([x, y]) => nucleus(x, y, 2.5)),
    lab(240, 40, 'Inner cell mass'),
    lab(240, 53, '(becomes the embryo)'),
    S.lead(238, 44, 182, 56),
    lab(240, 110, 'Blastocoel'),
    lab(240, 123, '(fluid-filled cavity)'),
    S.lead(238, 114, 150, 130),
    lab(240, 180, 'Trophoblast'),
    lab(240, 193, '(attaches to the uterus)'),
    S.lead(238, 184, 196, 164),
  ].join(''),
);


// ---------------------------------------------------------------- new for ISC ch03: lettered sperm for diagram-based questions
const tag = (x, y, t) => S.circle(x, y, 9, { fill: 'var(--diagram-fill)', sw: 1 }) + S.text(x, y + 4, t, { a: 'middle', size: 11, w: 'bold' });
export const SPERM_Q = svgDoc(
  440,
  150,
  'An unlabelled human sperm with four parts marked: A the cap over the front of the head, B the large structure inside the head, C the region packed with spiral organelles behind the neck, and D the long whip-like part',
  [
    S.ellipse(60, 70, 34, 22, { fill: 'var(--diagram-fill)', sw: 1.5 }),
    S.path('M34 56 C40 44 66 42 84 52 C70 50 46 52 34 62 Z', { fill: 'var(--diagram-accent)', fop: 0.5, w: 1 }),
    S.ellipse(62, 74, 22, 14, { fill: 'var(--diagram-muted)', fop: 0.5, sw: 1 }),
    S.rect(94, 64, 10, 12, { fill: 'var(--diagram-fill)', sw: 1 }),
    S.rect(104, 62, 70, 16, { rx: 6, fill: 'var(--diagram-yellow)', fop: 0.3, sw: 1.2 }),
    ...[0, 1, 2, 3, 4, 5].map((i) => S.path(`M${110 + i * 10} 66 C${114 + i * 10} 70 ${110 + i * 10} 72 ${114 + i * 10} 76`, { w: 1, c: 'var(--diagram-brown)' })),
    S.path('M174 70 C200 58 220 82 246 70 C272 58 292 82 318 70 C344 58 364 82 390 70 C404 64 414 68 424 70', { w: 2 }),
    tag(60, 20, 'A'), S.lead(60, 29, 52, 47),
    tag(40, 128, 'B'), S.lead(46, 120, 60, 86),
    tag(140, 120, 'C'), S.lead(140, 111, 140, 80),
    tag(310, 120, 'D'), S.lead(310, 111, 318, 74),
  ].join(''),
);

export const ALL = { MALE, FEMALE, TUBULE, SPERM, OVARY, CYCLE, JOURNEY, BLASTOCYST, SPERM_Q };
