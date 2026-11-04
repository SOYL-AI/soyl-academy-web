// ch07 Redox Reactions — SVGs with computed geometry and oxidation numbers: Mn ladder, carbon ladder, chlorine disproportionation,
// Daniell cell picture, redox titration set-up.
import { svgDoc, S } from './lib.mjs';

const lab = (x, y, s, o) => S.text(x, y, s, { size: 11, ...o });

export const SELF_CHECKS = [];
const chk = (ok, msg) => SELF_CHECKS.push(`${ok ? 'ok' : 'FAIL'} ${msg}`);

/** Oxidation number of the one unknown atom type: known = [[count, ON], …], charge = overall charge, n = number of unknown atoms. */
export const onOf = (known, charge, n = 1) => (charge - known.reduce((s, [c, o]) => s + c * o, 0)) / n;
export const sgn = (v) => (v > 0 ? `+${v}` : v < 0 ? `−${Math.abs(v)}` : '0');

/** Vertical oxidation-number ladder: items are boxes placed at their oxidation number; links are arrows between boxes. */
function ladder({ w = 420, h = 260, label, min, max, items, links = [] }) {
  const top = 40;
  const bot = h - 24;
  const ax = 52;
  const y = (v) => bot - ((v - min) / (max - min)) * (bot - top);
  const body = [S.arrow(ax, bot + 8, ax, top - 14, { size: 6 }), lab(ax - 36, top - 20, 'oxidation number', { size: 10 })];
  for (let v = min; v <= max; v++) {
    body.push(S.line(ax - 4, y(v), ax + 4, y(v), { w: 1 }), lab(ax - 8, y(v) + 4, sgn(v), { a: 'end', size: 10 }));
  }
  for (const it of items) body.push(S.line(ax + 4, y(it.on), it.x - it.w / 2, y(it.on), { c: 'var(--diagram-muted)', w: 1, dash: '2 4' }));
  for (const l of links) {
    const a = items[l.from];
    const b = items[l.to];
    const x1 = l.x1 ?? a.x;
    const x2 = l.x2 ?? b.x;
    const up = b.on > a.on;
    const y1 = y(a.on) + (up ? -11 : 11);
    const y2 = y(b.on) + (up ? 11 : -11);
    body.push(S.arrow(x1, y1, x2, y2, { c: up ? 'var(--diagram-red)' : 'var(--diagram-blue)', w: 2, size: 7 }));
    if (l.text) body.push(lab((x1 + x2) / 2 + (l.dx ?? 8), (y1 + y2) / 2 + 4, l.text, { c: up ? 'var(--diagram-red)' : 'var(--diagram-blue)', size: 10 }));
  }
  for (const it of items) {
    body.push(S.rect(it.x - it.w / 2, y(it.on) - 11, it.w, 22, { fill: 'var(--diagram-fill)', fop: 0.6, rx: 4, c: it.c ?? 'currentColor', sw: 1.2 }), lab(it.x, y(it.on) + 4, it.text, { a: 'middle', size: 11 }));
  }
  return { svg: svgDoc(w, h, label, body.join('')), y };
}

// 1. Manganese ladder: Mn, Mn²⁺ (MnSO₄), MnO₂, MnO₄²⁻, MnO₄⁻.
export const MN = (() => {
  const sp = [
    ['Mn (metal)', 0, null],
    ['Mn²⁺ in MnSO₄', onOf([], 2), null],
    ['MnO₂', onOf([[2, -2]], 0), null],
    ['MnO₄²⁻ (manganate)', onOf([[4, -2]], -2), null],
    ['MnO₄⁻ (permanganate)', onOf([[4, -2]], -1), null],
  ];
  const want = [0, 2, 4, 6, 7];
  chk(sp.every((s, i) => s[1] === want[i]), `Mn ladder: oxidation numbers computed from the formulae are ${sp.map((s) => s[1]).join(', ')}`);
  const items = sp.map(([text, on]) => ({ text, on, x: 215, w: 170 }));
  const { svg, y } = ladder({
    label:
      'Oxidation numbers of manganese from zero for the metal, plus two for manganese two ion, plus four in manganese dioxide, plus six in manganate and plus seven in permanganate. Moving up the ladder is oxidation and moving down is reduction.',
    min: 0,
    max: 7,
    items,
  });
  chk(items.every((it, i) => i === 0 || y(it.on) < y(items[i - 1].on) - 22), 'Mn ladder: boxes do not overlap');
  // add side labels by wrapping: append text before </svg>
  const side = S.arrow(330, y(1), 330, y(6), { c: 'var(--diagram-red)', w: 2, size: 7 }) + lab(338, y(3.5) - 6, 'ON', { size: 10, c: 'var(--diagram-red)' }) + lab(338, y(3.5) + 8, 'rises', { size: 10, c: 'var(--diagram-red)' }) + lab(338, y(3.5) + 22, '(oxidation)', { size: 10, c: 'var(--diagram-red)' });
  return svg.replace('</svg>', `${side}</svg>`);
})();

// 2. Carbon ladder: CH₄ → CH₃OH → HCHO → HCOOH → CO₂.
export const CARBON = (() => {
  const sp = [
    ['CH₄ (methane)', onOf([[4, 1]], 0)],
    ['CH₃OH (methanol)', onOf([[4, 1], [1, -2]], 0)],
    ['HCHO (methanal)', onOf([[2, 1], [1, -2]], 0)],
    ['HCOOH (methanoic acid)', onOf([[2, 1], [2, -2]], 0)],
    ['CO₂', onOf([[2, -2]], 0)],
  ];
  const want = [-4, -2, 0, 2, 4];
  chk(sp.every((s, i) => s[1] === want[i]), `carbon ladder: oxidation numbers computed from the formulae are ${sp.map((s) => s[1]).join(', ')}`);
  const items = sp.map(([text, on]) => ({ text, on, x: 215, w: 190 }));
  const links = [0, 1, 2, 3].map((i) => ({ from: i, to: i + 1, x1: 150, x2: 150, text: i === 0 ? '−2e⁻' : '−2e⁻', dx: -40 }));
  const { svg, y } = ladder({
    h: 280,
    label:
      'Oxidation number of carbon in the series methane minus four, methanol minus two, methanal zero, methanoic acid plus two and carbon dioxide plus four. Each step up loses two electrons per carbon atom.',
    min: -4,
    max: 4,
    items,
    links,
  });
  chk(items.every((it, i) => i === 0 || y(it.on) < y(items[i - 1].on) - 22), 'carbon ladder: boxes do not overlap');
  chk(links.length === 4 && sp.slice(1).every((s, i) => s[1] - sp[i][1] === 2), 'carbon ladder: every step raises the oxidation number by two');
  return svg;
})();

// 3. Chlorine disproportionation in cold dilute alkali (→ Cl⁻ + ClO⁻) and hot concentrated alkali (→ Cl⁻ + ClO₃⁻).
export const CLDISP = (() => {
  const cl = { cl2: 0, chloride: onOf([], -1), hypo: onOf([[1, -2]], -1), chlorate: onOf([[3, -2]], -1) };
  chk(cl.cl2 === 0 && cl.chloride === -1 && cl.hypo === 1 && cl.chlorate === 5, `Cl ladder: ON values computed are ${cl.chloride}, ${cl.cl2}, ${cl.hypo}, ${cl.chlorate}`);
  const items = [
    { text: 'Cl₂', on: cl.cl2, x: 205, w: 70 },
    { text: 'Cl⁻', on: cl.chloride, x: 110, w: 70 },
    { text: 'ClO⁻ (cold)', on: cl.hypo, x: 330, w: 100 },
    { text: 'ClO₃⁻ (hot)', on: cl.chlorate, x: 330, w: 100 },
  ];
  const { svg, y } = ladder({
    h: 270,
    label:
      'Chlorine at oxidation number zero splits in alkali. It is reduced to chloride at minus one and oxidised either to hypochlorite at plus one in cold dilute alkali or to chlorate at plus five in hot concentrated alkali.',
    min: -1,
    max: 5,
    items,
    links: [
      { from: 0, to: 1, x1: 185, x2: 125, text: 'reduction', dx: -62 },
      { from: 0, to: 2, x1: 235, x2: 305, text: 'oxidation', dx: 34 },
      { from: 0, to: 3, x1: 240, x2: 305, text: 'oxidation', dx: -66 },
    ],
  });
  chk(y(cl.chlorate) < y(cl.hypo) - 22, 'Cl ladder: hypochlorite and chlorate boxes do not overlap');
  return svg;
})();

// 4. Daniell cell (qualitative): Zn | Zn²⁺ ‖ Cu²⁺ | Cu.
export const DANIELL = (() => {
  const g = { lx: 40, rx: 250, bw: 130, top: 110, bot: 215 };
  const cx = (b) => b + g.bw / 2;
  const zE = { x: cx(g.lx) - 6, w: 12 };
  const cE = { x: cx(g.rx) - 6, w: 12 };
  const wireY = 38;
  const bridgeY = 92;
  chk(g.lx + g.bw < g.rx, 'Daniell: the beakers do not overlap');
  chk(cx(g.lx) < cx(g.rx), 'Daniell: zinc half-cell on the left, copper half-cell on the right (electron flow left to right)');
  const body = [
    // beakers
    S.path(`M${g.lx} ${g.top} V${g.bot} H${g.lx + g.bw} V${g.top}`, { w: 2 }),
    S.path(`M${g.rx} ${g.top} V${g.bot} H${g.rx + g.bw} V${g.top}`, { w: 2 }),
    // solutions
    S.rect(g.lx + 1, g.top + 22, g.bw - 2, g.bot - g.top - 23, { fill: 'var(--diagram-muted)', fop: 0.12, c: 'none', sw: 0 }),
    S.rect(g.rx + 1, g.top + 22, g.bw - 2, g.bot - g.top - 23, { fill: 'var(--diagram-blue)', fop: 0.25, c: 'none', sw: 0 }),
    // electrodes
    S.rect(zE.x, wireY, zE.w, g.bot - 14 - wireY, { fill: 'var(--diagram-muted)', fop: 0.7, c: 'currentColor', sw: 1.2 }),
    S.rect(cE.x, wireY, cE.w, g.bot - 14 - wireY, { fill: 'var(--diagram-brown)', fop: 0.7, c: 'currentColor', sw: 1.2 }),
    // external wire with electron arrow
    S.line(zE.x + zE.w / 2, wireY, cE.x + cE.w / 2, wireY, { w: 2 }),
    S.arrow(cx(g.lx) + 40, wireY - 8, cx(g.rx) - 40, wireY - 8, { c: 'var(--diagram-red)', w: 2, size: 7 }),
    lab((cx(g.lx) + cx(g.rx)) / 2, wireY - 14, 'electrons flow Zn to Cu in the wire', { a: 'middle', size: 10, c: 'var(--diagram-red)' }),
    // salt bridge
    S.path(`M${cx(g.lx) + 30} ${g.top + 40} V${bridgeY} H${cx(g.rx) - 30} V${g.top + 40}`, { w: 8, c: 'var(--diagram-accent)', op: 0.55, join: 'round' }),
    lab((cx(g.lx) + cx(g.rx)) / 2, bridgeY - 8, 'salt bridge: ions move, circuit completed', { a: 'middle', size: 10 }),
    // labels
    lab(cx(g.lx), g.bot + 16, 'Zn in ZnSO₄(aq)', { a: 'middle', size: 11 }),
    lab(cx(g.rx), g.bot + 16, 'Cu in CuSO₄(aq)', { a: 'middle', size: 11 }),
    lab(cx(g.lx), g.bot + 32, 'anode (−): oxidation', { a: 'middle', size: 11, w: 'bold' }),
    lab(cx(g.rx), g.bot + 32, 'cathode (+): reduction', { a: 'middle', size: 11, w: 'bold' }),
    lab(cx(g.lx), g.bot + 48, 'Zn → Zn²⁺ + 2e⁻', { a: 'middle', size: 11 }),
    lab(cx(g.rx), g.bot + 48, 'Cu²⁺ + 2e⁻ → Cu', { a: 'middle', size: 11 }),
  ];
  return svgDoc(
    420,
    280,
    'A Daniell cell. A zinc rod in zinc sulfate solution on the left is the anode where zinc is oxidised to zinc ions. A copper rod in copper sulfate solution on the right is the cathode where copper ions are reduced to copper. Electrons flow from zinc to copper through the wire, and a salt bridge joins the two solutions.',
    body.join(''),
  );
})();

// 5. Redox titration: KMnO₄ from a burette into Fe²⁺ in dilute H₂SO₄.
export const TITRATION = (() => {
  const eMn = 5; // MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O
  const eFe = 1; // Fe²⁺ → Fe³⁺ + e⁻
  const ratio = eMn / eFe;
  chk(ratio === 5, 'titration: one MnO₄⁻ accepts 5 e⁻ and one Fe²⁺ gives 1 e⁻, so the mole ratio is 1 : 5');
  const bx = 120;
  const body = [
    // burette
    S.rect(bx - 8, 30, 16, 100, { fill: 'var(--diagram-accent)', fop: 0.35, sw: 1.5 }),
    S.line(bx - 8, 30, bx - 8, 130),
    S.path(`M${bx - 8} 130 L${bx - 3} 148 H${bx + 3} L${bx + 8} 130`, { w: 1.5 }),
    S.line(bx - 14, 138, bx + 14, 138, { w: 3 }),
    S.circle(bx, 156, 2.5, { fill: 'var(--diagram-accent)', c: 'var(--diagram-accent)', sw: 1 }),
    // flask
    S.path(`M${bx - 12} 176 V196 L${bx - 50} 246 H${bx + 50} L${bx + 12} 196 V176`, { w: 2 }),
    S.path(`M${bx - 36} 226 H${bx + 36} L${bx + 50} 246 H${bx - 50} Z`, { fill: 'var(--diagram-yellow)', fop: 0.35, c: 'none', sw: 0 }),
    // labels
    lab(bx + 26, 52, 'burette: KMnO₄(aq),', { size: 11 }),
    lab(bx + 26, 66, '0.0200 mol L⁻¹, purple', { size: 11 }),
    lab(bx + 62, 220, 'flask: Fe²⁺(aq) in dilute H₂SO₄', { size: 11 }),
    lab(bx + 62, 236, 'swirl, add drop by drop', { size: 11 }),
    S.lead(bx + 26, 59, bx + 8, 62),
    S.rect(250, 90, 160, 76, { rx: 6, fill: 'var(--diagram-fill)', fop: 0.5, c: 'var(--diagram-muted)', sw: 1 }),
    lab(330, 108, 'End point', { a: 'middle', size: 11, w: 'bold' }),
    lab(330, 124, 'first faint pink that', { a: 'middle', size: 11 }),
    lab(330, 138, 'stays for 30 seconds', { a: 'middle', size: 11 }),
    lab(330, 156, '1 MnO₄⁻ : 5 Fe²⁺', { a: 'middle', size: 11, c: 'var(--diagram-red)', w: 'bold' }),
  ];
  return svgDoc(
    420,
    262,
    'Titration set-up. A burette holds purple potassium permanganate solution above a conical flask of iron two solution in dilute sulfuric acid. The end point is the first faint pink colour that persists. One permanganate ion reacts with five iron two ions.',
    body.join(''),
  );
})();
