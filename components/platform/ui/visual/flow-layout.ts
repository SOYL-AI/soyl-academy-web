/**
 * Deterministic layered layout for `flow` visuals (no layout library, same output every render).
 * Rank = longest path from a source, ignoring back edges (found by DFS in input order), so cycles
 * such as the water cycle still lay out. Nodes keep input order within a rank.
 */
import { wrapText } from './svg-utils';

export interface FlowSpecLike {
  nodes: Array<{ id: string; label: string }>;
  edges: Array<{ from: string; to: string; label?: string }>;
}

export interface LaidNode {
  id: string;
  lines: string[];
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface LaidEdge {
  from: string;
  to: string;
  label?: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  back: boolean;
}

export interface FlowLayout {
  width: number;
  height: number;
  nodes: LaidNode[];
  edges: LaidEdge[];
  ranks: number;
}

const NODE_W = 132;
const LINE_H = 17;
const PAD_Y = 12;
const MAX_CHARS = 16;
const MARGIN = 10;

export function layoutFlow(spec: FlowSpecLike, direction: 'LR' | 'TB'): FlowLayout {
  const ids = new Set<string>();
  const nodes = spec.nodes.filter((n) => !ids.has(n.id) && ids.add(n.id));
  const edges = spec.edges.filter((e) => ids.has(e.from) && ids.has(e.to) && e.from !== e.to);

  // Back edges via DFS.
  const out = new Map<string, Array<{ to: string; i: number }>>();
  edges.forEach((e, i) => out.set(e.from, [...(out.get(e.from) ?? []), { to: e.to, i }]));
  const state = new Map<string, 0 | 1 | 2>();
  const back = new Set<number>();
  const visit = (id: string) => {
    state.set(id, 1);
    for (const { to, i } of out.get(id) ?? []) {
      const st = state.get(to) ?? 0;
      if (st === 1) back.add(i);
      else if (st === 0) visit(to);
    }
    state.set(id, 2);
  };
  nodes.forEach((n) => (state.get(n.id) ?? 0) === 0 && visit(n.id));

  // Longest-path ranks over the remaining DAG (Bellman-style relaxation, bounded by node count).
  const rank = new Map(nodes.map((n) => [n.id, 0]));
  for (let pass = 0; pass < nodes.length; pass++) {
    let changed = false;
    edges.forEach((e, i) => {
      if (back.has(i)) return;
      const r = rank.get(e.from)! + 1;
      if (r > rank.get(e.to)!) {
        rank.set(e.to, r);
        changed = true;
      }
    });
    if (!changed) break;
  }
  const rankCount = Math.max(0, ...rank.values()) + 1;
  const byRank: string[][] = Array.from({ length: rankCount }, () => []);
  nodes.forEach((n) => byRank[rank.get(n.id)!].push(n.id));

  const label = new Map(nodes.map((n) => [n.id, wrapText(n.label, MAX_CHARS)]));
  const size = (id: string) => ({ w: NODE_W, h: label.get(id)!.length * LINE_H + 2 * PAD_Y });

  const laid = new Map<string, LaidNode>();
  if (direction === 'LR') {
    const gapX = 56;
    const gapY = 18;
    const columnHeights = byRank.map((col) => col.reduce((acc, id) => acc + size(id).h, 0) + gapY * Math.max(0, col.length - 1));
    const tallest = Math.max(...columnHeights);
    byRank.forEach((col, r) => {
      let y = MARGIN + (tallest - columnHeights[r]) / 2;
      col.forEach((id) => {
        const { w, h } = size(id);
        laid.set(id, { id, lines: label.get(id)!, x: MARGIN + r * (NODE_W + gapX), y, w, h });
        y += h + gapY;
      });
    });
  } else {
    const gapX = 14;
    const gapY = 40;
    const rowWidths = byRank.map((row) => row.length * NODE_W + gapX * Math.max(0, row.length - 1));
    const widest = Math.max(...rowWidths);
    let y = MARGIN;
    byRank.forEach((row, r) => {
      let x = MARGIN + (widest - rowWidths[r]) / 2;
      const rowH = Math.max(...row.map((id) => size(id).h));
      row.forEach((id) => {
        const { w, h } = size(id);
        laid.set(id, { id, lines: label.get(id)!, x, y: y + (rowH - h) / 2, w, h });
        x += w + gapX;
      });
      y += rowH + gapY;
    });
  }

  const laidEdges: LaidEdge[] = edges.map((e, i) => {
    const a = laid.get(e.from)!;
    const b = laid.get(e.to)!;
    const [x1, y1] = borderPoint(a, b);
    const [x2, y2] = borderPoint(b, a);
    return { from: e.from, to: e.to, label: e.label, x1, y1, x2, y2, back: back.has(i) };
  });

  const all = [...laid.values()];
  const width = Math.max(...all.map((n) => n.x + n.w)) + MARGIN;
  const height = Math.max(...all.map((n) => n.y + n.h)) + MARGIN;
  return { width, height, nodes: all, edges: laidEdges, ranks: rankCount };
}

/** Where the line from a's centre towards b's centre leaves box a. */
function borderPoint(a: LaidNode, b: LaidNode): [number, number] {
  const cx = a.x + a.w / 2;
  const cy = a.y + a.h / 2;
  const dx = b.x + b.w / 2 - cx;
  const dy = b.y + b.h / 2 - cy;
  if (dx === 0 && dy === 0) return [cx, cy];
  const sx = dx === 0 ? Infinity : a.w / 2 / Math.abs(dx);
  const sy = dy === 0 ? Infinity : a.h / 2 / Math.abs(dy);
  const t = Math.min(sx, sy);
  return [cx + dx * t, cy + dy * t];
}
