/** Small, deterministic helpers shared by the SVG visual renderers. */

/** "Nice" tick values covering [min, max] with about `target` steps. */
export function niceTicks(min: number, max: number, target = 5): number[] {
  if (!(Number.isFinite(min) && Number.isFinite(max)) || max <= min) return [];
  const raw = (max - min) / target;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const norm = raw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  const start = Math.ceil(min / step - 1e-9) * step;
  const ticks: number[] = [];
  for (let v = start; v <= max + step * 1e-9 && ticks.length < 50; v += step) ticks.push(roundTo(v, step));
  return ticks;
}

function roundTo(v: number, step: number): number {
  const decimals = Math.max(0, -Math.floor(Math.log10(step)) + 1);
  const r = Number(v.toFixed(Math.min(decimals, 10)));
  return Object.is(r, -0) ? 0 : r;
}

/** Compact number label: 2, 0.5, −3, 1.25 (uses a real minus sign). */
export function fmt(n: number): string {
  const s = Number.isInteger(n) ? String(n) : String(Number(n.toFixed(3)));
  return s.replace('-', '−');
}

/** Deterministic short id from content (no useId: these render in Server Components too). */
export function hashId(prefix: string, value: unknown): string {
  const text = typeof value === 'string' ? value : JSON.stringify(value) ?? '';
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `${prefix}${(h >>> 0).toString(36)}`;
}

/** Greedy word wrap by character count (good enough for diagram labels, incl. Devanagari). */
export function wrapText(text: string, maxChars: number, maxLines = 4): string[] {
  const words = text.trim().split(/\s+/u).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars || !line) line = candidate;
    else {
      lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines);
    kept[maxLines - 1] = kept[maxLines - 1].replace(/.{0,1}$/u, '…');
    return kept;
  }
  return lines;
}

export const round = (n: number) => Math.round(n * 100) / 100;

/** Common <text> styling: a paper-coloured halo keeps labels readable over lines in both themes. */
export const LABEL_PROPS = {
  fill: 'currentColor',
  stroke: 'var(--diagram-paper)',
  strokeWidth: 4,
  strokeLinejoin: 'round' as const,
  paintOrder: 'stroke',
  fontSize: 13,
};
