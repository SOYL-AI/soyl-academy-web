// Number lines for CBSE 11 Mathematics ch01 (intervals), drawn as allow-listed SVG (kind 'svg').
// Drawing code follows icse-10-mathematics-ch04/src/nl.mjs: filled circle = end point included, open circle = excluded,
// arrowhead = continues for ever; colours come from the diagram palette only (currentColor, var(--diagram-accent), none).
// Every row is drawn FROM interval objects (sets.mjs iv()), and the alt text is generated from the same objects.
import { inIv } from './iv.mjs';

const K = 46; // px per unit along the line
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const f2 = (v) => +v.toFixed(2);
const numWord = (x) => (x < 0 ? `minus ${-x}` : `${x}`);
const lab = (x) => (x < 0 ? '−' + -x : String(x));
export const NL_LOG = [];

/**
 * numberLine({ from, to, rows: [{ ivs: [interval...], tag }], marks }, caption)
 * from/to: integer range of the ticks. Each row is a list of intervals drawn on its own axis.
 */
export function numberLine({ from, to, rows }, caption, { lead = '' } = {}) {
  if (!Number.isInteger(from) || !Number.isInteger(to) || to <= from) throw new Error('bad range');
  const pad = 0.75;
  const Wpx = (to - from + 2 * pad) * K;
  const s = Math.max(1, Wpx / 440);
  const FS = f2(17 * s);
  const rowH = 72 * s, top = 26 * s, axisOff = 34 * s;
  const Hpx = top + rows.length * rowH;
  const X = (x) => f2((x - from + pad) * K);
  const parts = [];
  const ends = { open: 0, closed: 0, arrows: 0 };
  const altRows = [];
  rows.forEach((row, ri) => {
    const y = f2(top + ri * rowH + axisOff);
    const markers = [];
    for (const I of row.ivs) {
      if (I.lo !== null) markers.push({ at: I.lo, inc: I.loIn });
      if (I.hi !== null) markers.push({ at: I.hi, inc: I.hiIn });
    }
    for (const m of markers) if (m.at < from - 0.01 || m.at > to + 0.01) throw new Error(`end point ${m.at} outside the drawn range ${from}..${to}`);
    const rad = 7.8 * s;
    const x0 = X(from - pad + 0.12), x1 = X(to + pad - 0.12);
    const gaps = [...new Set(markers.filter((m) => !m.inc).map((m) => X(m.at)))].sort((a, b) => a - b);
    const axis = (a, b) => b > a && parts.push(`<line x1="${f2(a)}" y1="${y}" x2="${f2(b)}" y2="${y}" stroke="currentColor" stroke-width="${f2(1.6 * s)}"/>`);
    let cur = x0;
    for (const g of gaps) { axis(cur, g - rad); cur = g + rad; }
    axis(cur, x1);
    parts.push(`<polygon points="${f2(x1 + 9 * s)},${y} ${f2(x1 - 3 * s)},${f2(y - 5.5 * s)} ${f2(x1 - 3 * s)},${f2(y + 5.5 * s)}" fill="currentColor" stroke="none"/>`);
    parts.push(`<polygon points="${f2(x0 - 9 * s)},${y} ${f2(x0 + 3 * s)},${f2(y - 5.5 * s)} ${f2(x0 + 3 * s)},${f2(y + 5.5 * s)}" fill="currentColor" stroke="none"/>`);
    for (let t = from; t <= to; t++) {
      const under = markers.some((m) => m.at === t);
      if (!under) parts.push(`<line x1="${X(t)}" y1="${f2(y - 7 * s)}" x2="${X(t)}" y2="${f2(y + 7 * s)}" stroke="currentColor" stroke-width="${f2(1.4 * s)}"/>`);
      parts.push(`<text x="${X(t)}" y="${f2(y + 26 * s)}" fill="currentColor" stroke="none" text-anchor="middle" font-size="${FS}">${lab(t)}</text>`);
    }
    if (row.tag) parts.push(`<text x="${f2(X(from - pad) + 4)}" y="${f2(y - 20 * s)}" fill="currentColor" stroke="none" text-anchor="start" font-size="${FS}" font-style="italic">${esc(row.tag)}</text>`);
    for (const I of row.ivs) {
      const a = I.lo === null ? X(from - pad + 0.3) : X(I.lo) + (I.loIn ? 0 : rad);
      const b = I.hi === null ? X(to + pad - 0.3) : X(I.hi) - (I.hiIn ? 0 : rad);
      if (b > a) parts.push(`<line x1="${f2(a)}" y1="${y}" x2="${f2(b)}" y2="${y}" stroke="var(--diagram-accent)" stroke-width="${f2(5 * s)}" stroke-linecap="butt"/>`);
      if (I.hi === null) { parts.push(`<polygon points="${f2(b + 14 * s)},${y} ${f2(b)},${f2(y - 8 * s)} ${f2(b)},${f2(y + 8 * s)}" fill="var(--diagram-accent)" stroke="none"/>`); ends.arrows++; }
      if (I.lo === null) { parts.push(`<polygon points="${f2(a - 14 * s)},${y} ${f2(a)},${f2(y - 8 * s)} ${f2(a)},${f2(y + 8 * s)}" fill="var(--diagram-accent)" stroke="none"/>`); ends.arrows++; }
    }
    for (const m of markers) {
      const cx = X(m.at);
      parts.push(m.inc
        ? `<circle cx="${cx}" cy="${y}" r="${f2(rad)}" fill="var(--diagram-accent)" stroke="var(--diagram-accent)" stroke-width="${f2(2.5 * s)}"/>`
        : `<circle cx="${cx}" cy="${y}" r="${f2(rad)}" fill="none" stroke="var(--diagram-accent)" stroke-width="${f2(2.5 * s)}"/>`);
      if (m.inc) ends.closed++; else ends.open++;
      if (!Number.isInteger(m.at)) parts.push(`<text x="${cx}" y="${f2(y - 17 * s)}" fill="var(--diagram-accent)" stroke="none" text-anchor="middle" font-size="${FS}" font-weight="bold">${esc(lab(m.at))}</text>`);
    }
    // the drawn end-point kinds must match membership of the interval itself
    for (const I of row.ivs) {
      if (I.lo !== null && inIv(I, I.lo) !== I.loIn) throw new Error('inconsistent lower end point');
      if (I.hi !== null && inIv(I, I.hi) !== I.hiIn) throw new Error('inconsistent upper end point');
    }
    const head = row.altTag ? `${row.altTag}: ` : row.tag ? `${row.tag}: ` : '';
    if (!row.ivs.length) altRows.push(`${head}Nothing is shaded: the set is empty`);
    else {
      const bits = [];
      for (const I of row.ivs) {
        if (I.lo !== null) bits.push(`${I.loIn ? 'a filled circle' : 'an open circle'} at ${numWord(I.lo)}`);
        if (I.hi !== null) bits.push(`${I.hiIn ? 'a filled circle' : 'an open circle'} at ${numWord(I.hi)}`);
        if (I.lo === null) bits.push('an arrow to the left');
        if (I.hi === null) bits.push('an arrow to the right');
      }
      altRows.push(`${head}A thick line with ${bits.join(', ')}`);
    }
  });
  const alt = `${lead ? `${lead} ` : ''}Number line from ${numWord(from)} to ${numWord(to)}${rows.length > 1 ? `, drawn in ${rows.length} rows` : ''}. ${altRows.join('. ')}.`.replace(/\s+/g, ' ');
  const vw = f2(Wpx), vh = f2(Hpx + 6 * s);
  const spec = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" role="img" aria-label="${esc(alt).replace(/"/g, '&quot;')}" font-family="sans-serif" font-size="${FS}" fill="none"><title>${esc(alt)}</title>${parts.join('')}</svg>`;
  if (ends.open && !/open circle/i.test(caption)) throw new Error(`caption must mention the open circle: ${caption}`);
  if (ends.closed && !/filled circle/i.test(caption)) throw new Error(`caption must mention the filled circle: ${caption}`);
  NL_LOG.push({ ends, rows: rows.length });
  return { kind: 'svg', spec, alt, caption };
}
