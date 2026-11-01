// Number lines for ICSE 10 Mathematics ch04, drawn as allow-listed SVG (kind 'svg', shared/content/visual.ts).
// Why SVG and not 'geometry' or 'plot': both renderers draw every point as a solid dot, so an excluded
// end point (open circle) cannot be shown; school convention needs filled vs open circles.
// Every row is drawn FROM a verified solution set (ineq.mjs `solution`): members of N/W/Z as filled dots,
// R sets as a thick line with a filled circle (end point included) or an open circle (end point excluded)
// and an arrowhead where the set continues for ever. The alt text is generated from the same set, and the
// caption must name the end-point kinds that are drawn. Colours come from the diagram palette only
// (currentColor, var(--diagram-accent), none), so dark mode works. Text, strokes and vertical spacing
// scale with the width of the line, so wide lines stay readable at a 360 px phone width.
import { num, txt, describe, isInt } from './ineq.mjs';

const K = 46; // px per unit along the line
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const f2 = (v) => +v.toFixed(2);
const numWord = (x) => (x < 0 ? `minus ${-x}` : `${x}`);

/**
 * numberLine({ from, to, rows: [{ sol, tag }], marks: [{ at, label, row }] }, caption, { lead })
 * from/to: integer range of the ticks. Each row: a verified solution `sol` and an optional tag drawn at
 * the left above the line (e.g. "A"). Returns { kind: 'svg', spec, alt, caption } and logs the drawn
 * end-point kinds in NL_LOG for the build's statistics.
 */
export function numberLine({ from, to, rows, marks = [], step = 1 }, caption, { lead = '' } = {}) {
  if (!Number.isInteger(from) || !Number.isInteger(to) || to <= from) throw new Error('bad range');
  const pad = 0.75;
  const Wpx = ((to - from) + 2 * pad) * K;
  const s = Math.max(1, Wpx / 440); // scale for text, strokes and vertical metrics
  const FS = f2(17 * s);
  const rowH = 72 * s, top = 26 * s, axisOff = 34 * s;
  const Hpx = top + rows.length * rowH;
  const X = (x) => f2((x - from + pad) * K);
  const parts = [];
  const ends = { open: 0, closed: 0, dots: 0, arrows: 0 };
  const altRows = [];
  rows.forEach((row, ri) => {
    const y = f2(top + ri * rowH + axisOff); // screen y of the axis
    const sol = row.sol;
    const R = sol.U === 'R';
    // markers at finite end points (R) — the axis is broken inside open circles
    const markers = [];
    if (R) for (const I of sol.intervals) {
      if (I.lo !== null) markers.push({ at: I.lo, inc: I.loIn });
      if (I.hi !== null) markers.push({ at: I.hi, inc: I.hiIn });
    }
    for (const m of markers) if (num(m.at) < from - 0.01 || num(m.at) > to + 0.01) throw new Error(`end point ${txt(m.at)} outside the drawn range ${from}..${to}`);
    const rad = 7.8 * s;
    // axis with arrowheads at both ends, broken at open circles
    const x0 = X(from - pad + 0.12), x1 = X(to + pad - 0.12);
    const gaps = markers.filter((m) => !m.inc).map((m) => X(num(m.at))).sort((a, b) => a - b);
    const axis = (a, b) => parts.push(`<line x1="${f2(a)}" y1="${y}" x2="${f2(b)}" y2="${y}" stroke="currentColor" stroke-width="${f2(1.6 * s)}"/>`);
    let cur = x0;
    for (const g of gaps) { axis(cur, g - rad); cur = g + rad; }
    axis(cur, x1);
    parts.push(`<polygon points="${f2(x1 + 9 * s)},${y} ${f2(x1 - 3 * s)},${f2(y - 5.5 * s)} ${f2(x1 - 3 * s)},${f2(y + 5.5 * s)}" fill="currentColor" stroke="none"/>`);
    parts.push(`<polygon points="${f2(x0 - 9 * s)},${y} ${f2(x0 + 3 * s)},${f2(y - 5.5 * s)} ${f2(x0 + 3 * s)},${f2(y + 5.5 * s)}" fill="currentColor" stroke="none"/>`);
    // ticks and labels (skip the tick under a marker; the label stays)
    for (let t = from; t <= to; t += step) {
      const under = markers.some((m) => isInt(m.at) && num(m.at) === t);
      if (!under) parts.push(`<line x1="${X(t)}" y1="${f2(y - 7 * s)}" x2="${X(t)}" y2="${f2(y + 7 * s)}" stroke="currentColor" stroke-width="${f2(1.4 * s)}"/>`);
      parts.push(`<text x="${X(t)}" y="${f2(y + 26 * s)}" fill="currentColor" stroke="none" text-anchor="middle" font-size="${FS}">${t < 0 ? '−' + -t : t}</text>`);
    }
    if (row.tag) parts.push(`<text x="${f2(X(from - pad) + 4)}" y="${f2(y - 20 * s)}" fill="currentColor" stroke="none" text-anchor="start" font-size="${FS}" font-style="italic">${esc(row.tag)}</text>`);
    if (R) {
      for (const I of sol.intervals) {
        const lo = I.lo === null ? null : num(I.lo), hi = I.hi === null ? null : num(I.hi);
        const a = lo === null ? X(from - pad + 0.3) : X(lo) + (I.loIn ? 0 : rad);
        const b = hi === null ? X(to + pad - 0.3) : X(hi) - (I.hiIn ? 0 : rad);
        if (b > a) parts.push(`<line x1="${f2(a)}" y1="${y}" x2="${f2(b)}" y2="${y}" stroke="var(--diagram-accent)" stroke-width="${f2(5 * s)}" stroke-linecap="butt"/>`);
        if (hi === null) { parts.push(`<polygon points="${f2(b + 14 * s)},${y} ${f2(b)},${f2(y - 8 * s)} ${f2(b)},${f2(y + 8 * s)}" fill="var(--diagram-accent)" stroke="none"/>`); ends.arrows++; }
        if (lo === null) { parts.push(`<polygon points="${f2(a - 14 * s)},${y} ${f2(a)},${f2(y - 8 * s)} ${f2(a)},${f2(y + 8 * s)}" fill="var(--diagram-accent)" stroke="none"/>`); ends.arrows++; }
      }
      for (const m of markers) {
        const cx = X(num(m.at));
        parts.push(m.inc
          ? `<circle cx="${cx}" cy="${y}" r="${f2(rad)}" fill="var(--diagram-accent)" stroke="var(--diagram-accent)" stroke-width="${f2(2.5 * s)}"/>`
          : `<circle cx="${cx}" cy="${y}" r="${f2(rad)}" fill="none" stroke="var(--diagram-accent)" stroke-width="${f2(2.5 * s)}"/>`);
        if (m.inc) ends.closed++; else ends.open++;
        if (!isInt(m.at)) parts.push(`<text x="${cx}" y="${f2(y - 17 * s)}" fill="var(--diagram-accent)" stroke="none" text-anchor="middle" font-size="${FS}" font-weight="bold">${esc(txt(m.at))}</text>`);
      }
    } else {
      const shown = sol.members.filter((x) => x >= from && x <= to);
      if (sol.members.length && !shown.length) throw new Error('no member in range');
      const hidden = sol.members.filter((x) => (x < from && !sol.left) || (x > to && !sol.right));
      if (hidden.length) throw new Error(`members ${hidden} outside the drawn range`);
      for (const x of shown) parts.push(`<circle cx="${X(x)}" cy="${y}" r="${f2(6.4 * s)}" fill="var(--diagram-accent)" stroke="none"/>`);
      ends.dots += shown.length;
      // continuation: the set goes on beyond the drawn range
      const more = (x) => parts.push(`<text x="${f2(x)}" y="${f2(y - 12 * s)}" fill="var(--diagram-accent)" stroke="none" text-anchor="middle" font-size="${f2(FS + 3 * s)}" font-weight="bold">…</text>`);
      if (sol.right) { if (shown[shown.length - 1] !== to) throw new Error('right-infinite set must reach the right end'); more(X(to) + 0.45 * K); }
      if (sol.left) { if (shown[0] !== from) throw new Error('left-infinite set must reach the left end'); more(X(from) - 0.45 * K); }
    }
    for (const mk of marks.filter((m) => (m.row ?? 0) === ri)) parts.push(`<text x="${X(mk.at)}" y="${f2(y - 17 * s)}" fill="currentColor" stroke="none" text-anchor="middle" font-size="${f2(FS - 2 * s)}">${esc(mk.label)}</text>`);
    // alt text for the row, from the set
    const head = row.tag ? `${row.tag}: ` : '';
    if (R) {
      const bits = [];
      for (const I of sol.intervals) {
        if (I.lo !== null) bits.push(`${I.loIn ? 'a filled circle' : 'an open circle'} at ${txt(I.lo, { minus: 'minus ' })}`);
        if (I.hi !== null) bits.push(`${I.hiIn ? 'a filled circle' : 'an open circle'} at ${txt(I.hi, { minus: 'minus ' })}`);
        if (I.lo === null) bits.push('an arrow to the left');
        if (I.hi === null) bits.push('an arrow to the right');
      }
      altRows.push(`${head}${sol.intervals.length ? `A thick line with ${bits.join(', ')}, showing ${describe(sol)}` : 'Nothing is shaded: the solution set is empty'}`);
    } else {
      const shown = sol.members.filter((x) => x >= from && x <= to);
      altRows.push(`${head}${shown.length ? `Filled dots at ${shown.length === 1 ? numWord(shown[0]) : `${shown.slice(0, -1).map(numWord).join(', ')} and ${numWord(shown[shown.length - 1])}`}${sol.right ? ', continuing to the right' : ''}${sol.left ? ', continuing to the left' : ''}` : 'No dots: the solution set is empty'}`);
    }
  });
  const alt = `${lead ? `${lead} ` : ''}Number line from ${numWord(from)} to ${numWord(to)}${rows.length > 1 ? ', drawn in ' + rows.length + ' rows' : ''}. ${altRows.join('. ')}.`.replace(/\s+/g, ' ');
  const vw = f2(Wpx), vh = f2(Hpx + 6 * s);
  const spec = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${vw} ${vh}" role="img" aria-label="${esc(alt).replace(/"/g, '&quot;')}" font-family="sans-serif" font-size="${FS}" fill="none"><title>${esc(alt)}</title>${parts.join('')}</svg>`;
  // caption must name what is drawn
  if (ends.open && !/open circle/i.test(caption)) throw new Error(`caption must mention the open circle: ${caption}`);
  if (ends.closed && !/filled circle/i.test(caption)) throw new Error(`caption must mention the filled circle: ${caption}`);
  if (ends.dots && !/dot/i.test(caption)) throw new Error(`caption must mention the dots: ${caption}`);
  NL_LOG.push({ ends, rows: rows.length, alt });
  return { kind: 'svg', spec, alt, caption };
}
/** One entry per number line drawn (for the build's statistics). */
export const NL_LOG = [];

/** Compact description of an R set's ends, e.g. "[-1,4)" or "(-inf,3]", for checks. */
export function endsOf(sol) {
  return sol.intervals.flatMap((I) => [I.lo !== null ? `${I.loIn ? '[' : '('}${txt(I.lo, { minus: '-' })}` : '(-inf', I.hi !== null ? `${txt(I.hi, { minus: '-' })}${I.hiIn ? ']' : ')'}` : 'inf)']).join(',');
}
