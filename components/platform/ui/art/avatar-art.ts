/**
 * The 64 student avatars (design-system, 2026-10-29): original, hand-drawn flat animal portraits on a 64 × 64
 * grid, one per id in platform/shared/config/avatars.ts (= PUBLIC_NAME_ANIMALS). Drawn for this platform; no
 * icon set, emoji or illustration was copied or traced.
 *
 * Style: a front-facing head and shoulders (a few sea animals and long-necked birds in profile), flat fills,
 * one ink colour for eyes and noses, no outlines. The coloured circle behind the animal is not part of the
 * drawing: it is the background theme the student picks (CSS token `--p-avatar-<bg>`), so the art keeps fixed
 * colours that read on every background in light and dark mode (kit contrast test).
 *
 * Shared primitives (body, eyes, noses, ears, muzzles, beaks) keep each animal to a few lines. The drawings are
 * pure data: rendered inline by `AvatarArt` (picker, art sheet; lazy chunks) and as static SVG files by the
 * avatar image route (top bar, boards, cards: no JS).
 */
import { circle as C, ellipse as E, group, line as L, pair, path as P, type SvgNode } from './svg-tree';

export const INK = '#23252e';
const W = '#ffffff';
const PINK = '#ef8f9c';
const CREAM = '#f7efe2';

/* Shared primitives ------------------------------------------------------------------------------ */

/** Shoulders filling the bottom of the circle; `bib` adds a lighter chest. */
const body = (fill: string, bib?: string): SvgNode[] => [
  P('M3 66C4 54 16 49 32 49s28 5 29 17Z', fill),
  ...(bib ? [P('M21 66c0-8 4.5-12.5 11-12.5S43 58 43 66Z', bib)] : []),
];

/** Two eyes with a highlight. */
const eyes = (dx = 7, y = 32, r = 2.6, fill = INK): SvgNode[] => pair([C(32 - dx, y, r, fill), C(32 - dx + r * 0.38, y - r * 0.38, r * 0.36, W)]);

/** Eyes inside a coloured ring (birds of prey, owls, toucans). */
const ringEyes = (dx: number, y: number, ring: string, rr: number, r = 2.5): SvgNode[] => pair([C(32 - dx, y, rr, ring), C(32 - dx, y, r, INK), C(32 - dx + r * 0.38, y - r * 0.38, r * 0.36, W)]);

const nose = (y = 38.5, rx = 3.2, ry = 2.2, fill = INK): SvgNode => E(32, y, rx, ry, fill);

/** Small triangular cat nose. */
const catNose = (y = 37.5, fill = PINK): SvgNode => P(`M29.2 ${y}h5.6c-.4 1.8-1.6 3-2.8 3s-2.4-1.2-2.8-3Z`, fill);

/** Mouth under a nose: a short line and a "w". */
const mouth = (y = 41, w = 3, color = INK): SvgNode => L(`M32 ${y - 1.6}v1.6M${32 - w} ${y}q${w / 2} 1.8 ${w} 0q${w / 2} 1.8 ${w} 0`, color, 1.3);

const smile = (y = 42, w = 4, color = INK): SvgNode => L(`M${32 - w} ${y}q${w} 2.6 ${w * 2} 0`, color, 1.4);

const whiskers = (y = 40, color = INK, width = 0.9): SvgNode[] => pair([L(`M23.5 ${y}l-8-1.6M23.5 ${y + 2.4}l-8 .8`, color, width)]);

/** Round ears high on the head. */
const roundEars = (fill: string, inner?: string, dx = 13, y = 20, r = 6): SvgNode[] => pair([C(32 - dx, y, r, fill), ...(inner ? [C(32 - dx, y, r * 0.55, inner)] : [])]);

/** Pointed cat/fox ears. */
const pointEars = (fill: string, inner: string, tip: [number, number] = [17, 13]): SvgNode[] =>
  pair([P(`M16 29L${tip[0]} ${tip[1]}L29 20Z`, fill), P(`M18.6 25.5L${tip[0] + 1.4} ${tip[1] + 4.2}L25.4 21.4Z`, inner)]);

/** Leaf-shaped ears to the side (deer, cattle, giraffe…). */
const sideEars = (fill: string, inner: string, y = 24, angle = -28): SvgNode[] => pair([E(16.5, y, 7, 3.4, fill, angle), E(17, y, 4.4, 1.7, inner, angle)]);

/** Two cheek puffs (otters, cats, seals). */
const muzzle = (fill: string, y = 40, dx = 3.6, rx = 4.6, ry = 3.6): SvgNode[] => pair([E(32 - dx, y, rx, ry, fill)]);

const blush = (fill = '#f4a3a8', y = 38, dx = 11): SvgNode[] => pair([E(32 - dx, y, 2.6, 1.6, fill, 0, { opacity: 0.7 })]);

/** A short bird beak pointing down at the viewer. */
const beak = (fill: string, y = 36, w = 3.2, h = 5, dark?: string): SvgNode[] => [
  P(`M${32 - w} ${y}h${w * 2}l-${w} ${h}Z`, fill),
  ...(dark ? [L(`M${32 - w + 0.6} ${y + 0.4}h${w * 2 - 1.2}`, dark, 1)] : []),
];

/** A hooked beak (birds of prey, parrots): wide top, curled tip. */
const hookBeak = (fill: string, tip: string, y = 35, w = 4.5, h = 9): SvgNode[] => [
  P(`M${32 - w} ${y}c0-1.4 1.2-2 ${w}-2s${w} .6 ${w} 2c0 3.6-1.6 ${h - 3.6}-${w} ${h}c-3.4-2-${w}-${h - 4}-${w}-${h}Z`, fill),
  P(`M${32 - 1.6} ${y + h - 3}c.8 1.6 2.4 2.6 3.2 3l-.2 1.2c-1.6-.6-2.8-2-3-4.2Z`, tip),
];

/** Small white highlight on a dark head. */
const shine = (x: number, y: number, r = 3): SvgNode => E(x, y, r, r * 0.6, W, -30, { opacity: 0.18 });

/** Spots scattered from a list of [x, y, r]. */
const spots = (fill: string, list: readonly (readonly [number, number, number])[]): SvgNode[] => list.map(([x, y, r]) => C(x, y, r, fill));

/** Leopard-style rosettes: a broken ring around a darker centre. */
const rosettes = (ring: string, core: string, list: readonly (readonly [number, number])[], r = 2.4): SvgNode[] =>
  list.flatMap(([x, y]) => [C(x, y, r * 0.55, core), L(`M${x - r} ${y + 0.4}a${r} ${r} 0 0 1 ${r * 1.4}-${r * 0.95}M${x + r} ${y - 0.2}a${r} ${r} 0 0 1-${r * 0.8} ${r * 1.1}`, ring, 1.1)]);

/* A big-cat face shared by tiger, lion, leopard, cheetah, jaguar, panther, lynx ------------------ */

function catFace(o: { fur: string; ear: string; earInner: string; muzzle: string; nose?: string; marks?: SvgNode[]; eye?: string; under?: SvgNode[]; over?: SvgNode[]; ears?: 'round' | 'point' }): SvgNode[] {
  return [
    ...(o.under ?? []),
    ...(o.ears === 'point' ? pointEars(o.ear, o.earInner, [16, 11]) : roundEars(o.ear, o.earInner, 13, 20, 5.6)),
    E(32, 34, 18, 16, o.fur),
    ...(o.marks ?? []),
    ...muzzle(o.muzzle, 40.5, 3.4, 4.8, 3.8),
    ...eyes(7.4, 31.5, 2.7, o.eye ?? INK),
    catNose(36.6, o.nose ?? PINK),
    ...whiskers(40.5, INK, 0.7),
    ...(o.over ?? []),
  ];
}

/* A long-faced grazer shared by deer, zebra, giraffe, camel, llama, gazelle, ibex, moose, bison, yak, tapir */

function longFace(o: { fur: string; snout: string; ears?: SvgNode[]; under?: SvgNode[]; marks?: SvgNode[]; over?: SvgNode[]; nostril?: string; eyesY?: number }): SvgNode[] {
  return [
    ...(o.under ?? []),
    ...(o.ears ?? []),
    E(32, 31, 12.5, 15, o.fur),
    E(32, 43, 9.6, 7.6, o.snout),
    ...(o.marks ?? []),
    ...eyes(6.6, o.eyesY ?? 29, 2.4),
    ...pair([E(28.8, 43, 1.1, 1.6, o.nostril ?? INK, 15)]),
    ...(o.over ?? []),
  ];
}

/* A round bird head shared by small birds */

function birdHead(o: { head: string; body: string; bib?: string; under?: SvgNode[]; marks?: SvgNode[]; beak: SvgNode[]; eye?: SvgNode[]; over?: SvgNode[] }): SvgNode[] {
  return [...(o.under ?? []), ...body(o.body, o.bib), C(32, 31, 16, o.head), ...(o.marks ?? []), ...(o.eye ?? eyes(7, 30.5, 2.6)), ...o.beak, ...(o.over ?? [])];
}

/* A profile sea animal facing left */

function seaProfile(o: { body: string; belly: string; extra?: SvgNode[]; front?: SvgNode[] }): SvgNode[] {
  return [
    ...(o.extra ?? []),
    P('M6 40c2-12 13-20 27-20 13 0 23 7 27 16l5 2v28H6Z', o.body),
    P('M6 41c6 4 14 6 24 6 10 0 19-2 26-5l5 2v22H6Z', o.belly),
    C(20, 34, 2.6, INK),
    C(20.9, 33.1, 0.9, W),
    L('M8 41.5q6 2 12 .5', INK, 1.3),
    ...(o.front ?? []),
  ];
}

/* The animals ------------------------------------------------------------------------------------ */

const ART: Record<string, () => SvgNode[]> = {
  otter: () => [
    ...body('#6f4630', '#e3c9a4'),
    ...roundEars('#7c4f35', '#5a3824', 14, 22, 4.4),
    E(32, 33.5, 17, 15.5, '#8a5a3b'),
    E(32, 40.5, 11, 7.6, '#ead4b4'),
    ...eyes(7, 31, 2.6),
    nose(37.6, 3.4, 2.4),
    mouth(42, 2.8),
    ...whiskers(40.5, '#5a3824'),
  ],
  falcon: () => [
    ...body('#4b5563', '#efe9dd'),
    C(32, 31, 16, '#56616f'),
    P('M17.5 33c1.6 9 7.6 14.5 14.5 14.5S44.9 42 46.5 33c-3.4 3-8 4-14.5 4s-11.1-1-14.5-4Z', '#f1ece2'),
    ...pair([P('M21.5 29.5c-2 4-2.2 8.6-.4 12.6l4-1.6c-1.2-3-1.2-6.6 0-9.6Z', '#2c333c')]),
    ...ringEyes(7, 31, '#f2c94c', 4.1, 2.6),
    ...hookBeak('#f2c94c', INK, 35.5, 4, 8),
  ],
  panda: () => [
    ...body(INK, '#f6f5f1'),
    ...roundEars(INK, undefined, 13.5, 19.5, 6.2),
    C(32, 33, 17, '#f6f5f1'),
    ...pair([E(24.6, 32, 4.4, 5.8, INK, 30)]),
    ...pair([C(25.4, 31.4, 1.7, W)]),
    nose(38.6, 3, 2.1),
    mouth(42.4, 2.4),
  ],
  tiger: () =>
    catFace({
      fur: '#f08a24',
      ear: '#e07a1f',
      earInner: '#fbe9d0',
      muzzle: '#fbf3e6',
      under: body('#d9741c', '#fbf3e6'),
      marks: [
        ...pair([P('M17 36.5c3.6-.4 7.4 1.6 9 5.6-5.2 1.2-9.2-1.2-10.8-3.6Z', '#fbf3e6')]),
        L('M32 18.6v5.4M28.4 19.6l1 4.2M35.6 19.6l-1 4.2', INK, 1.8),
        ...pair([L('M14.6 31l5.2 1.4M15.2 35.4l4.6.4', INK, 1.8)]),
      ],
    }),
  dolphin: () =>
    seaProfile({
      body: '#5f93c9',
      belly: '#cfe2f3',
      extra: [P('M36 21l8-9 3 11Z', '#4f7fb3')],
      front: [P('M2 42.5c1.5-2.6 4-3.6 6.5-3.4l.5 4.4C6.5 44.4 4 44 2 42.5Z', '#5f93c9'), E(52, 28, 1.6, 1, '#3f6f9f')],
    }),
  eagle: () => [
    ...body('#5b3d24'),
    C(32, 31, 16.5, '#f8f6f0'),
    ...pair([P('M18.5 27.5c3-1.6 7.4-1.8 11 .4l-.6 1.8c-3.4-1-6.8-.8-10 .4Z', '#c9c2b4')]),
    ...ringEyes(7, 31, '#f2c94c', 3.2, 2.4),
    ...hookBeak('#f4b63a', '#c47f12', 34.5, 5.2, 10),
  ],
  koala: () => [
    ...body('#8f99a4', '#e8ebef'),
    ...roundEars('#9aa3ad', '#eef0f2', 15, 22, 7.6),
    C(32, 34, 16, '#a7b0ba'),
    ...eyes(7, 31.5, 2.4),
    E(32, 38.5, 4.2, 5.6, INK),
    shine(30.6, 36, 1.6),
    smile(45.4, 2.6),
  ],
  lynx: () =>
    catFace({
      fur: '#c99a62',
      ear: '#b4844f',
      earInner: '#f3e2c6',
      muzzle: '#f6ecdc',
      ears: 'point',
      under: [...body('#b4844f', '#f6ecdc'), ...pair([L('M16 13.5l-1.5-6', INK, 1.6)]), ...pair([P('M14.5 34l-5 4 6 2-4 4 7 1Z', '#d8b689')])],
      marks: spots('#7a5634', [
        [23, 22, 1.1],
        [41, 22, 1.1],
        [32, 20, 1],
        [19, 37, 0.9],
        [45, 37, 0.9],
      ]),
    }),
  peacock: () => [
    ...[-60, -36, -12, 12, 36, 60].flatMap((a) => {
      const r = (a * Math.PI) / 180;
      const x = 32 + Math.sin(r) * 24;
      const y = 40 - Math.cos(r) * 24;
      return [L(`M32 40L${x.toFixed(1)} ${y.toFixed(1)}`, '#2f8f5b', 2), C(x, y, 5, '#2f9e6b'), C(x, y, 3.2, '#f2c94c'), C(x, y, 1.8, '#1d4fa8')];
    }),
    ...body('#1f5fbf'),
    ...[-4, 0, 4].flatMap((dx) => [L(`M32 17l${dx} -7`, '#1f5fbf', 1.2), C(32 + dx, 9.6, 1.6, '#1f5fbf')]),
    E(32, 33, 13, 15, '#2a6fd6'),
    ...pair([P('M22 29.5c2-1.2 4.4-1.4 6.4-.4-1.6 2.4-4.4 3-6.4.4Z', W)]),
    ...eyes(5.6, 30.4, 2.1),
    ...beak('#b9a58c', 35, 2.4, 4.4),
  ],
  parrot: () =>
    birdHead({
      head: '#3fae49',
      body: '#2f9a3d',
      marks: [P('M17.5 39c3 7 8.4 10 14.5 10s11.5-3 14.5-10c-2 1.6-3.6 2-4.2 2.4-2.6 2.6-6.2 3.8-10.3 3.8s-7.7-1.2-10.3-3.8c-.6-.4-2.2-.8-4.2-2.4Z', INK), P('M18.6 41.4c3 5 7.6 7.6 13.4 7.6s10.4-2.6 13.4-7.6l-1.6 1c-3 3.4-7.2 5-11.8 5s-8.8-1.6-11.8-5Z', '#f08aa8')],
      beak: hookBeak('#d93a2b', '#8f1f15', 33.5, 5, 10),
    }),
  penguin: () => [
    ...body('#262935', '#f6f5f1'),
    C(32, 31, 16.5, '#262935'),
    P('M32 26c4-5 12-4 12 4 0 8-6 13-12 15-6-2-12-7-12-15 0-8 8-9 12-4Z', '#f6f5f1'),
    ...eyes(6, 31, 2.4),
    P('M28.4 35.5h7.2l-3.6 4.6Z', '#f39a2b'),
    ...blush('#f4a3a8', 37.5, 8.5),
  ],
  rabbit: () => [
    ...body('#c99a72', CREAM),
    ...pair([E(25, 13, 4.6, 12, '#d9b38c', -8), E(25, 13.6, 2.4, 9.2, '#f4b6bd', -8)]),
    C(32, 35, 16, '#d9b38c'),
    E(32, 41, 8.6, 6.4, CREAM),
    ...eyes(6.8, 32.5, 2.5),
    P('M30 38h4l-2 2.2Z', PINK),
    L('M32 40.2v1.6', INK, 1.2),
    P('M30.4 42h3.2v3.4a1.6 1.6 0 0 1-3.2 0Z', W),
    L('M32 42v4.6', '#d9cfc4', 0.6),
  ],
  robin: () =>
    birdHead({
      head: '#7f6249',
      body: '#6e5440',
      bib: '#e8673a',
      marks: [P('M17.4 34c.6 8.6 6.8 13.6 14.6 13.6S46 42.6 46.6 34c-4 2.6-8.6 4-14.6 4s-10.6-1.4-14.6-4Z', '#e8673a')],
      eye: [...eyes(7, 30, 2.6), ...pair([C(25, 30, 3.8, W, { opacity: 0.35 })])],
      beak: beak(INK, 34.5, 2.4, 4.6),
    }),
  sparrow: () =>
    birdHead({
      head: '#a5774c',
      body: '#8a6440',
      bib: '#d9cfc0',
      marks: [P('M16 31c0-9 7-16 16-16s16 7 16 16c-3-5-9-7-16-7s-13 2-16 7Z', '#8e8f93'), ...pair([E(21.5, 37, 5.6, 4, '#ece6db')]), P('M27.5 38h9c0 4-2 7-4.5 7s-4.5-3-4.5-7Z', INK)],
      beak: beak('#5a4a3c', 34, 2.6, 4.2),
    }),
  squirrel: () => [
    P('M44 62c10-4 16-14 13-26-2-8-9-12-14-9 6 2 8 8 6 14-2 8-7 12-5 21Z', '#b9652e'),
    P('M47 56c6-4 9-10 8-17-.6-4-3-6-5.5-6.4 2.4 2.6 3 6 2.2 9.6-1 5-3.4 9-4.7 13.8Z', '#d9894a'),
    ...body('#b9652e', CREAM),
    ...pair([P('M17 27l2-15 9 9Z', '#c8743a'), P('M19 23l1.4-7.6 4.8 4.8Z', '#f3c79e'), L('M19 12.4l-1-3.4', '#8f4c22', 1.6)]),
    C(32, 34, 15.5, '#c8743a'),
    E(32, 41, 8.4, 6.2, CREAM),
    ...eyes(6.6, 31.5, 2.6),
    nose(37.6, 2.2, 1.6),
    P('M30.4 41h3.2v3a1.6 1.6 0 0 1-3.2 0Z', W),
  ],
  turtle: () => [
    P('M2 66c0-16 13-26 30-26s30 10 30 26Z', '#6b7f2f'),
    ...[
      [18, 54],
      [32, 50],
      [46, 54],
    ].map(([x, y]) => P(`M${x - 6} ${y}l3-5h6l3 5-3 5h-6Z`, '#8fa443')),
    E(32, 31, 14, 13.5, '#7cbd5f'),
    E(32, 37, 9, 5.6, '#9bd27f'),
    ...eyes(6.4, 29.5, 2.7),
    smile(38.4, 3.6),
    ...spots('#5f9c46', [
      [24, 23, 1.4],
      [38, 22, 1.2],
      [32, 19.5, 1],
    ]),
  ],
  whale: () =>
    seaProfile({
      body: '#3f6fb5',
      belly: '#b8cfe9',
      extra: [L('M40 16v-6M40 12c-2-3-5-4-7-3M40 12c2-3 5-4 7-3', '#7fb2e5', 1.8)],
      front: [L('M10 46h8M12 49h8M14 52h7', '#8fb0d6', 1.2)],
    }),
  zebra: () =>
    longFace({
      fur: '#f6f5f1',
      snout: INK,
      nostril: '#5d606b',
      under: [...body('#f6f5f1'), P('M24 49h16v17H24Z', INK, { opacity: 0.06 }), ...[-6, 0, 6].map((dx) => P(`M${32 + dx - 2} 15l2-6 2 6Z`, INK))],
      ears: pair([E(20, 18, 3.4, 7, '#f6f5f1', -24), E(20, 18.4, 1.7, 4.6, INK, -24)]),
      marks: [L('M32 16.5v6M27 17.5l1.6 6M37 17.5l-1.6 6', INK, 2), ...pair([L('M20 28c2 .6 3.6 1.6 4.6 3M20.4 33.4c2 0 3.8.6 5 1.6M22 37.8c1.6-.2 3 0 4.2.8', INK, 1.9)])],
    }),
  badger: () => [
    ...body('#6f7277'),
    ...roundEars('#43464d', W, 14.5, 23, 4),
    E(32, 34, 17.5, 15.5, '#8e9196'),
    ...pair([P('M18 25c3-2 7-2 10.5 0l2 18.5c-3 1-6 0-8-2-3-4-4.6-10-4.5-16.5Z', '#2a2c33')]),
    P('M28 19.5c2.4-1 5.6-1 8 0l-1.6 23h-4.8Z', W),
    ...eyes(6.8, 32, 2.2, '#0d0e12'),
    ...pair([C(25.2, 32, 2.6, '#3a3d45')]),
    ...eyes(6.8, 32, 2.1),
    nose(41.5, 3, 2.1),
  ],
  beaver: () => [
    ...body('#7a4b2f', '#c49a72'),
    ...roundEars('#7a4b2f', '#5a361f', 14.5, 21, 4),
    C(32, 34, 16.5, '#8d5a39'),
    E(32, 40.5, 9.4, 6.6, '#c49a72'),
    ...eyes(7, 31, 2.5),
    nose(36.8, 3.4, 2.2),
    P('M28.8 41.2h6.4v4.8a1.4 1.4 0 0 1-1.4 1.4h-3.6a1.4 1.4 0 0 1-1.4-1.4Z', '#f2a33a'),
    L('M32 41.2v6.2', '#c47f12', 0.8),
  ],
  bison: () =>
    longFace({
      fur: '#6a4a33',
      snout: '#3a2a20',
      nostril: '#14100c',
      under: [...body('#4a3324'), P('M12 30c0-12 9-19 20-19s20 7 20 19c-4-4-10-6-20-6s-16 2-20 6Z', '#3d2a1d'), P('M24 50c2 8 14 8 16 0Z', '#3d2a1d')],
      ears: [...pair([P('M17 26c-5-1-7-5-6-9 2 3 4 4 7 4Z', '#cfc6b8')]), ...sideEars('#5a3f2b', '#3d2a1d', 30, -10)],
      marks: [P('M20 22c3-5 8-8 12-8s9 3 12 8c-4-2-8-3-12-3s-8 1-12 3Z', '#3d2a1d')],
    }),
  camel: () =>
    longFace({
      fur: '#d2a86a',
      snout: '#e2c08f',
      under: [P('M38 54c2-9 8-14 14-12 6 2 9 9 10 24H38Z', '#c2955a'), ...body('#c2955a')],
      ears: roundEars('#c2955a', '#9c7442', 9.5, 18.5, 3.2),
      marks: [...pair([L('M22.6 26.6q2.8-1.4 5.6 0', INK, 1.3)]), L('M32 45v3M28.6 48.4q3.4 1.8 6.8 0', '#8c6a40', 1.2), P('M24 17c2-3 5-4 8-4s6 1 8 4c-3-1-5-1-8-1s-5 0-8 1Z', '#b38548')],
    }),
  cheetah: () =>
    catFace({
      fur: '#e8b04e',
      ear: '#d79c3c',
      earInner: '#fbefd6',
      muzzle: '#fbf1dd',
      under: body('#d79c3c', '#fbf1dd'),
      marks: [
        ...spots(INK, [
          [24, 21, 1.1],
          [40, 21, 1.1],
          [32, 19.6, 1],
          [28, 23.5, 0.8],
          [36, 23.5, 0.8],
          [17.5, 31, 1],
          [46.5, 31, 1],
          [19, 26.5, 0.8],
          [45, 26.5, 0.8],
        ]),
        ...pair([L('M24.4 34c-.6 3-1.4 5.6-2.4 8', INK, 1.7)]),
      ],
    }),
  crane: () => [
    ...body('#9aa4b1'),
    P('M26 66V44c0-6 2-9 6-9s6 3 6 9v22Z', '#b8c0cb'),
    C(32, 28, 13, '#b8c0cb'),
    P('M20 26c0-7 5-12 12-12s12 5 12 12c-3-3-7-4-12-4s-9 1-12 4Z', '#d33b2f'),
    ...pair([E(24, 31.5, 4, 3, '#d33b2f')]),
    ...eyes(6, 28.5, 2.3),
    P('M29.8 32h4.4l-1.4 16-.8 1.4-.8-1.4Z', '#6b7380'),
  ],
  deer: () =>
    longFace({
      fur: '#b9733f',
      snout: '#f2e6d6',
      under: [
        ...body('#a8652f'),
        ...spots(W, [
          [14, 58, 1.6],
          [21, 54, 1.4],
          [44, 55, 1.5],
          [50, 59, 1.6],
          [12, 64, 1.3],
        ]),
        ...pair([L('M25 18c-2-4-4-7-8-9M21.6 12.6l-4.4 1M20 10.4l1.4-4.4M23.4 15.6l-2.6-4.6', '#8a5a2f', 2.2)]),
      ],
      ears: sideEars('#b9733f', '#f2d4bd', 23.5, -30),
      marks: [L('M32 18v8', '#9c5f32', 1.6)],
      nostril: INK,
      over: [nose(41.2, 3.2, 2)],
    }),
  elephant: () => [
    ...body('#7b8592'),
    ...pair([P('M20 22C10 15 2 22 4 34s9 16 16 12Z', '#97a1ae'), P('M18 26c-6-4-11 0-10 7s5 9 9 7Z', '#e2b8bf')]),
    E(32, 30, 14, 14, '#8d97a4'),
    ...eyes(6.8, 29, 2.3),
    P('M27.5 34h9c0 6 0 12 1.5 16 1 3 4 4 5.5 2l1.8 2c-3 4-9 3-11.6-1-2.2-3.6-3.2-10-6.2-19Z', '#8d97a4'),
    ...pair([P('M25.6 38c-1.4 3-1.2 6 .6 8l1.6-1c-1-2-1-4.4 0-6.6Z', W)]),
    L('M30.5 40h4M30.8 43.4h4.4M31.4 46.8h4.6', '#77818e', 1),
  ],
  finch: () =>
    birdHead({
      head: '#f2c230',
      body: '#2b2d35',
      bib: '#f2c230',
      marks: [P('M19 22.5c2.6-5 7.4-7.5 13-7.5s10.4 2.5 13 7.5c-3.6-1.6-8-2.4-13-2.4s-9.4.8-13 2.4Z', INK), P('M27 34c1-1 9-1 10 0l-1 6c-2 1-6 1-8 0Z', INK), ...pair([P('M17 27c3 0 6 2 7 5-3 1-6 0-7.6-2Z', W)])],
      beak: beak('#f6a46b', 33.5, 3.4, 5.4, '#c97a45'),
    }),
  fox: () => [
    ...body('#d9661f', '#fbf3e6'),
    ...pair([P('M15 28L14 9l15 11Z', '#ef7a2a'), P('M17.4 24.6l-.6-11 8.4 6.4Z', '#fbe1c6'), P('M14 9l1.2 7.4 4-4.4Z', INK)]),
    P('M14 30c0-10 8-16 18-16s18 6 18 16c0 4-2 7-5 9l-13 8-13-8c-3-2-5-5-5-9Z', '#ef7a2a'),
    P('M14.5 33c3 0 9 2 12 6l5.5 8.4L37.5 39c3-4 9-6 12-6-.6 2.6-2 4.6-4.5 6.2L32 47.6l-13-8.4c-2.5-1.6-3.9-3.6-4.5-6.2Z', '#fbf3e6'),
    ...eyes(7.4, 30.5, 2.5),
    nose(45, 2.6, 1.9),
  ],
  gazelle: () =>
    longFace({
      fur: '#d6a25e',
      snout: '#f3e4cd',
      under: [...body('#c48f4c', '#f3e4cd'), ...pair([P('M27.5 18c-1.6-6-1-12 1.6-16l1.4.6c-1.8 4-2 9.6-.6 15.6Z', INK), L('M27.6 6.5l1.8.4M27.2 9.5l1.8.4M27.2 12.5l1.8.3', '#5d4a30', 0.9)])],
      ears: sideEars('#d6a25e', '#f3e4cd', 21.5, -36),
      marks: [...pair([L('M23 25.5c1 4 2.4 8 4.6 11.4', W, 1.8), L('M22 28c.6 4 1.6 7.6 3.4 10.4', '#6d4a24', 1.4)])],
    }),
  gecko: () => [
    ...body('#5f9e3a'),
    E(32, 35, 20, 14, '#7cc04b'),
    ...pair([C(17.5, 28, 7, '#7cc04b'), C(17.5, 28, 5, '#f4d35e'), E(17.5, 28, 1.2, 3.6, INK), C(18.6, 26.2, 0.9, W)]),
    ...spots('#f39a2b', [
      [32, 25, 2],
      [25, 22.5, 1.4],
      [39, 22.5, 1.4],
      [21, 41, 1.4],
      [43, 41, 1.4],
    ]),
    ...pair([C(28.5, 36, 0.9, '#3f6f24')]),
    L('M21 42q11 6 22 0', '#3f6f24', 1.4),
  ],
  giraffe: () =>
    longFace({
      fur: '#f1c25b',
      snout: '#f6dfa8',
      under: [
        ...body('#e9b44c'),
        ...spots('#b8732e', [
          [16, 57, 3],
          [25, 53, 2.4],
          [40, 53, 2.4],
          [48, 57, 3],
        ]),
        ...pair([P('M27.6 18l-1.2-8h3l.2 8Z', '#c98d3c'), C(27.9, 9.4, 2.2, '#7a4a20')]),
      ],
      ears: sideEars('#f1c25b', '#f6dfa8', 22.5, -24),
      marks: spots('#c98d3c', [
        [32, 20, 2.4],
        [25.4, 24, 1.6],
        [38.6, 24, 1.6],
        [24, 36, 1.4],
        [40, 36, 1.4],
      ]),
      nostril: '#9c6a2c',
    }),
  heron: () => [
    P('M40 21c6-3 12-3 18 0-6 1-11 2-15 4Z', INK),
    ...body('#8b97a6'),
    P('M27 66V44c0-6 2-9 5-9s5 3 5 9v22Z', '#eef0f2'),
    C(32, 28, 12.5, '#a3adb9'),
    P('M21 24c2-6 6-9 11-9s9 3 11 9c-3-2-7-3-11-3s-8 1-11 3Z', INK),
    P('M24 31c2 6 5 9 8 9s6-3 8-9c-2 2-5 3-8 3s-6-1-8-3Z', W),
    ...ringEyes(5.8, 28, '#f4d35e', 3.2, 2.1),
    P('M30 31.5h4l-1.2 18-.8 1.6-.8-1.6Z', '#e9b23c'),
  ],
  hornbill: () => [
    ...body('#26272d', W),
    C(32, 31, 15.5, '#26272d'),
    P('M22 21c3-6 8-8 13-7 5 1 8 4 9 8l-4 2c-2-3-5-4-9-4s-6 1-9 3Z', '#f2c230'),
    ...pair([E(24.4, 31.2, 4, 3.4, '#eef0f2')]),
    ...eyes(7.6, 31.2, 2.3, '#b3261e'),
    P('M27 33c1-3 9-3 10 0 0 7-2 13-5 18-3-5-5-11-5-18Z', '#f2c230'),
    P('M27.4 36c2 1 7.2 1 9.2 0', 'none', { stroke: '#d98c1f', strokeWidth: 1.2 }),
    P('M30 46c1 2 3 2 4 0l-2 5Z', '#d98c1f'),
  ],
  ibex: () =>
    longFace({
      fur: '#8a7b6a',
      snout: '#b5a690',
      under: [
        ...body('#77695a'),
        ...pair([P('M27 19C22 8 10 7 6 18c-2 6 0 12 4 15l1.6-1.4c-3-3-4-7.6-2.6-12 3-8 12-8 15.6 1Z', '#cdbfa9')]),
        ...pair([L('M10.2 23.4l3.2.6M12 18.6l3 1.4M15.6 15l2.4 2.2M20 13.6l1.2 2.8', '#9a8b74', 1.4)]),
      ],
      ears: sideEars('#8a7b6a', '#5d5246', 25, -18),
      over: [P('M28 49c1 6 3 9 4 9s3-3 4-9Z', '#5d5246')],
    }),
  jaguar: () =>
    catFace({
      fur: '#e2a24b',
      ear: '#cc8c38',
      earInner: '#f9e6c6',
      muzzle: '#fbf1dd',
      under: [...body('#cc8c38', '#fbf1dd'), ...rosettes(INK, '#b06f22', [
        [12, 58],
        [22, 54],
        [42, 54],
        [52, 58],
      ], 3)],
      marks: rosettes(INK, '#c17a2a', [
        [24, 22],
        [40, 22],
        [32, 19.4],
        [18.4, 30],
        [45.6, 30],
      ], 2.6),
    }),
  kingfisher: () =>
    birdHead({
      head: '#1f7fd1',
      body: '#1c6fb8',
      bib: '#f08a2c',
      marks: [...pair([P('M17 32c1 4 4 7 8 8l-2-6Z', '#f08a2c'), P('M22 40c2 3 5 5 10 5s8-2 10-5c-4 1-7 1-10 1s-6 0-10-1Z', W)]), P('M17 24c3-6 8-9 15-9s12 3 15 9c-4-3-9-4-15-4s-11 1-15 4Z', '#1561a8')],
      beak: [P('M29 33h6l3 16-1 1Z', INK), P('M29 33h6l-4 13Z', '#3a3d45')],
    }),
  kiwi: () => [
    E(34, 50, 22, 13, '#8a6a48'),
    C(32, 33, 15, '#9a7752'),
    ...spots('#7d5e3e', [
      [20, 24, 1.2],
      [44, 24, 1.2],
      [26, 19, 1],
      [38, 19, 1],
      [17, 32, 1],
      [47, 32, 1],
      [14, 52, 1.4],
      [50, 52, 1.4],
    ]),
    ...eyes(6.4, 30, 2.1),
    P('M30 34.5c1.2-1 3-.8 3.6.6-2.6 7-8.4 14-17.6 19.4l-.8-1.2c8.2-5.4 12.8-11.6 14.8-18.8Z', '#e9d2a0'),
    L('M27 58v6M37 58v6M25 64h4M35 64h4', '#c9a46a', 1.6),
  ],
  lemur: () => [
    P('M50 66c8-6 12-16 9-26', 'none', { stroke: W, strokeWidth: 6, strokeLinecap: 'round' }),
    P('M50 66c8-6 12-16 9-26', 'none', { stroke: INK, strokeWidth: 6, strokeDasharray: '4 4' }),
    ...body('#8d9097', '#eceae6'),
    ...pair([P('M16 29l1-12 10 7Z', '#8d9097'), P('M18.4 25.4l.6-5.6 4.6 3.2Z', '#eceae6')]),
    C(32, 33, 15.5, '#eceae6'),
    P('M22 20c3-3 6-4 10-4s7 1 10 4c-3 0-6 1-10 1s-7-1-10-1Z', '#8d9097'),
    ...pair([P('M20.6 28c2-2 6-2.6 8.6-.6l-1 8.4c-2 1.2-4.4 1-6-.6-1.4-2-2-4.6-1.6-7.2Z', INK)]),
    ...pair([C(25, 31, 3, '#f39a2b'), C(25, 31, 1.7, INK), C(25.6, 30.4, 0.6, W)]),
    P('M29 36h6l-3 9Z', INK),
  ],
  leopard: () =>
    catFace({
      fur: '#e9b44c',
      ear: '#d9a03a',
      earInner: '#fbefd6',
      muzzle: '#fbf3e6',
      under: [...body('#d9a03a', '#fbf3e6'), ...rosettes(INK, '#c88f2c', [
        [11, 59],
        [20, 54],
        [44, 54],
        [53, 59],
      ], 2.4)],
      marks: [
        ...spots(INK, [
          [32, 20, 1.2],
          [27, 22.4, 1],
          [37, 22.4, 1],
          [22, 22.8, 1],
          [42, 22.8, 1],
          [17, 30, 1],
          [47, 30, 1],
          [18, 35, 0.8],
          [46, 35, 0.8],
        ]),
      ],
    }),
  lion: () => [
    ...body('#c98a3c', '#f4e3c3'),
    ...Array.from({ length: 14 }, (_, i) => {
      const a = (i / 14) * Math.PI * 2;
      return E(32 + Math.cos(a) * 18, 34 + Math.sin(a) * 18, 8, 6, i % 2 ? '#a9561f' : '#bf6a28', (a * 180) / Math.PI);
    }),
    C(32, 34, 20, '#b5652b'),
    ...catFace({ fur: '#e6b064', ear: '#d79a4c', earInner: '#f4e3c3', muzzle: '#f8ecd6', nose: '#7a4a2c' }),
  ],
  llama: () =>
    longFace({
      fur: '#f2ebe0',
      snout: '#fbf8f2',
      under: [
        ...body('#e8dfcf'),
        ...pair([P('M24 21c-3-6-3-12 0-16 3 3 4 9 3 16Z', '#e8dfcf'), P('M24.6 18c-1.6-4-1.6-8 .2-10.6 1.4 2 2 6 1.4 10.6Z', '#d9b3a8')]),
        ...[
          [26, 15, 4],
          [32, 13, 4.6],
          [38, 15, 4],
        ].map(([x, y, r]) => C(x!, y!, r!, '#e8dfcf')),
      ],
      marks: [L('M32 46v2M29.4 48.6q2.6 1.4 5.2 0', '#9a8e7c', 1.1), ...pair([L('M22.4 26q2.6-1.2 5.4 0', '#b5a894', 1.1)])],
      nostril: '#6d6253',
    }),
  macaw: () =>
    birdHead({
      head: '#d6332e',
      body: '#1f6fd1',
      bib: '#f2c230',
      marks: [...pair([P('M18 27c3-2 8-2 10.5.6l.6 9.4c-3 1-7 0-9.6-2.6-1.4-2-1.8-4.6-1.5-7.4Z', '#f6f2ec'), L('M19.6 30.4q3.4-.8 6.4.6M19.4 33.4q3.6-.4 6.6 1', '#b8b0a6', 0.7)])],
      eye: eyes(7.4, 31, 2.3),
      beak: [P('M26 33c0-3 3-4 6-4s7 1.6 7 5.6c0 5-3 9.4-6 11.4-1-2.6-1-4.4-.2-6.4-3.4 0-6.8-2-6.8-6.6Z', '#f2ede4'), P('M27 40c1 4 3 6 5 6l1-6Z', INK)],
    }),
  mongoose: () => [
    ...body('#8f7a60'),
    ...roundEars('#8f7a60', '#6d5a44', 12.6, 23.5, 3.6),
    P('M15 32c0-9 8-14 17-14s17 5 17 14c0 5-4 8-9 11l-8 5-8-5c-5-3-9-6-9-11Z', '#a08a6e'),
    ...spots('#7d6a52', [
      [22, 24, 0.8],
      [27, 21.6, 0.8],
      [37, 21.6, 0.8],
      [42, 24, 0.8],
      [32, 20.4, 0.8],
      [19, 30, 0.7],
      [45, 30, 0.7],
    ]),
    P('M26 38c2 3 4 4 6 4s4-1 6-4l-6 8.6Z', '#c3b095'),
    ...eyes(7, 31, 2.4, '#4a2f12'),
    nose(44.6, 2.4, 1.8),
  ],
  moose: () =>
    longFace({
      fur: '#6a4a32',
      snout: '#57402e',
      nostril: '#1e1610',
      under: [
        ...body('#5a3e2a'),
        ...pair([P('M24 21C16 21 8 18 5 10l3-1 2 4 1-6 3 1-1 6 3-5 3 2-2 5 4-3 2 2-3 4c2 1 4 1 6 1Z', '#c8ad8a')]),
        P('M28 49c0 6 2 9 4 9s4-3 4-9Z', '#4a3322'),
      ],
      ears: sideEars('#6a4a32', '#9a7a5c', 25, -12),
      over: [E(32, 44.6, 8, 6, '#6e5038')],
    }),
  myna: () =>
    birdHead({
      head: '#2f2826',
      body: '#6b4a34',
      bib: '#7a5641',
      marks: [...pair([P('M20.5 30c1-2 3-3.4 5.4-3.4 2.6 0 4 2 3.6 4.4-.6 2.6-3 3.6-5.4 3.2-2.4-.4-4.2-2.2-3.6-4.2Z', '#f2c230')]), shine(26, 21, 4)],
      eye: eyes(6.6, 30.6, 2.3, '#5a2a12'),
      beak: beak('#f2c230', 34, 3, 6),
    }),
  narwhal: () =>
    seaProfile({
      body: '#8ea6bf',
      belly: '#dce6f0',
      extra: spots('#6f88a3', [
        [38, 28, 1.6],
        [46, 30, 1.4],
        [52, 35, 1.6],
        [42, 24, 1.2],
        [33, 25, 1.2],
      ]),
      front: [P('M8 36L-2 22l1.6-.8L11 34.6Z', '#f2ede1'), L('M2 27l2-1M4 30l2-1M6 33l2-1', '#cbbf9f', 0.9)],
    }),
  owl: () => [
    ...body('#7d5434', '#d9bf98'),
    ...pair([P('M17 22l-2-10 10 6Z', '#8a5c38')]),
    E(32, 33, 18, 16.5, '#9a6a43'),
    ...pair([C(24.6, 31.6, 7.2, '#ecd8b6')]),
    ...pair([C(24.6, 31.6, 4.4, '#f4c430'), C(24.6, 31.6, 2.6, INK), C(25.6, 30.6, 0.9, W)]),
    P('M29.4 36h5.2L32 42.6Z', '#5a3a20'),
    ...[...[-6, 0, 6].map((dx) => L(`M${32 + dx - 1.4} 47q1.4 1.4 2.8 0`, '#5a3a20', 1)), ...[-3, 3].map((dx) => L(`M${32 + dx - 1.4} 51q1.4 1.4 2.8 0`, '#5a3a20', 1))],
  ],
  panther: () =>
    catFace({
      fur: '#2f3038',
      ear: '#26272d',
      earInner: '#4a4c56',
      muzzle: '#43454f',
      nose: '#1a1b20',
      eye: '#c8e04a',
      under: body('#26272d'),
      marks: [shine(25, 22, 4), ...rosettes('#3c3e48', '#34363f', [
        [20, 27],
        [44, 27],
      ], 2.4)],
      over: [...pair([C(24.6, 31.5, 1.2, INK)])],
    }),
  pelican: () => [
    ...body('#eceae4'),
    C(32, 28, 13.5, '#f6f4ef'),
    P('M27 16c1-4 4-6 6-5-1 2-1 3 0 5Z', '#d9d4ca'),
    ...eyes(6, 27, 2.2),
    ...pair([C(26, 27, 3.4, '#f4b6a0', { opacity: 0.6 })]),
    P('M28 31h8l-1 20c-.4 4-2 6-3 6s-2.6-2-3-6Z', '#f3a95b'),
    P('M28.4 36c-1 8 0 15 3.6 18 3.6-3 4.6-10 3.6-18-1 2-2.4 3-3.6 3s-2.6-1-3.6-3Z', '#f6c27e'),
    L('M32 31v20', '#d98c3c', 0.9),
  ],
  puffin: () =>
    birdHead({
      head: '#262935',
      body: '#262935',
      bib: '#f6f5f1',
      marks: [P('M16.5 33c0-7 6-12 15.5-12S47.5 26 47.5 33c0 8-7 14-15.5 14S16.5 41 16.5 33Z', '#f3f1ec')],
      eye: [...eyes(7.4, 30.6, 2.2), ...pair([P('M22 28.4l2.6-1.6 .4 1Z', '#e2552f')])],
      beak: [P('M27 32c0-1.4 2-2.6 5-2.6s5 1.2 5 2.6c0 5-2 9-5 11-3-2-5-6-5-11Z', '#e2552f'), P('M27.4 33.6h9.2', 'none', { stroke: '#f2c230', strokeWidth: 1.6 }), P('M27.2 30.4c1.4-.8 3-1.2 4.8-1.2s3.4.4 4.8 1.2l-.2 1.6h-9.2Z', '#8e9aa8')],
    }),
  quail: () => [
    P('M33 16c-1-5 1-9 5-10 2 0 3 2 1 3-3 1-4 4-3 7Z', INK),
    ...birdHead({
      head: '#8a6a4a',
      body: '#7a5c3e',
      bib: '#a68660',
      marks: [P('M25 38c2 5 4.4 7 7 7s5-2 7-7c-2 1-4.4 1.6-7 1.6s-5-.6-7-1.6Z', INK), L('M25 39.4q7 6 14 0', W, 1.3), L('M18 27.5c4-1.4 8-1.6 10.6-.2M46 27.5c-4-1.4-8-1.6-10.6-.2', W, 1.4), ...spots(W, [
        [14, 56, 1],
        [22, 54, 1],
        [42, 54, 1],
        [50, 56, 1],
        [32, 58, 1],
      ])],
      beak: beak('#3a3d45', 34, 2.4, 4),
    }),
  ],
  raven: () => [
    ...body('#1f2029'),
    ...[-8, -3, 2, 7].map((dx) => P(`M${32 + dx - 3} 44l3 9 3-9Z`, '#2a2c38')),
    C(32, 31, 16, '#2b2d3a'),
    shine(25, 22, 4.4),
    ...eyes(7, 29.6, 2.3, '#0b0b10'),
    ...pair([C(25, 29.6, 3.2, '#3b3f52')]),
    ...eyes(7, 29.6, 2.2),
    P('M26.6 33.5c0-2 2.4-3 5.4-3s5.4 1 5.4 3c0 4-2 8-5.4 11-3.4-3-5.4-7-5.4-11Z', '#14151c'),
    L('M28 35h8', '#3b3f52', 0.9),
  ],
  rhino: () => [
    ...body('#7d8187'),
    ...pair([E(19, 20, 3, 6, '#8f9399', -20), E(19, 20.6, 1.5, 3.6, '#c6b0b3', -20)]),
    E(32, 34, 17, 16, '#8f9399'),
    E(32, 43, 11, 8, '#a2a6ab'),
    P('M28.6 37c0-9 1-17 3.4-23 2.4 6 3.4 14 3.4 23Z', '#e3ddd0'),
    P('M30 25c0-3 .8-6 2-8 1.2 2 2 5 2 8Z', '#cfc8b8'),
    ...eyes(9, 33, 2),
    ...pair([E(28.4, 44.6, 1, 1.6, INK, 15)]),
    L('M20 29q2 1.6 3.4 4M44 29q-2 1.6-3.4 4', '#74787e', 1.1),
  ],
  seal: () => [
    ...body('#8796a1', '#c3ced6'),
    C(32, 33, 17, '#9aa7b1'),
    ...spots('#83909b', [
      [22, 22, 1.2],
      [40, 21, 1.4],
      [45, 27, 1],
      [19, 28, 1],
    ]),
    ...pair([C(25, 31, 3.4, INK), C(26, 29.8, 1.2, W)]),
    ...muzzle('#c3ced6', 40, 3.4, 4.6, 3.6),
    nose(37.2, 2.8, 2),
    ...whiskers(40, '#5f6b75', 0.8),
    ...spots('#5f6b75', [
      [27, 40, 0.5],
      [26, 42, 0.5],
      [37, 40, 0.5],
      [38, 42, 0.5],
    ]),
  ],
  starling: () =>
    birdHead({
      head: '#3a3550',
      body: '#33304a',
      marks: [
        shine(25, 22, 4),
        ...spots('#8fd6a4', [
          [22, 38, 0.9],
          [42, 38, 0.9],
          [32, 44, 0.9],
          [17, 56, 1],
          [26, 54, 1],
          [38, 54, 1],
          [47, 56, 1],
        ]),
        ...spots('#c9a7ff', [
          [27, 41.6, 0.8],
          [37, 41.6, 0.8],
          [20, 60, 0.9],
          [44, 60, 0.9],
        ]),
      ],
      beak: [P('M29.4 33.4h5.2l-2.6 8.6Z', '#f2c230')],
    }),
  swan: () => [
    ...body('#e9e8e4'),
    P('M23 66c0-14 3-24 9-30 3-3 1-8-3-8-3 0-5 2-5 5l-4-1c0-6 4-9 9-9 8 0 12 9 6 16-5 6-6 16-6 27Z', '#f7f7f5'),
    C(28.8, 25, 9.4, '#fafafa'),
    C(26.4, 23.6, 1.9, INK),
    C(27, 23, 0.6, W),
    P('M20 26c-2 0-6 1-9 4l2 1.6c2-1.6 5-2.2 7.4-2Z', '#f39a2b'),
    P('M21 22.4c-1.6 0-2.6 1.4-2.2 3l2.6.4Z', INK),
  ],
  tapir: () =>
    longFace({
      fur: '#3d3f46',
      snout: '#4a4c55',
      nostril: '#1a1b20',
      under: [P('M3 66C4 54 16 49 32 49s28 5 29 17Z', '#eeece6'), P('M3 66c1-8 5-12 10-14l2 14ZM61 66c-1-8-5-12-10-14l-2 14Z', '#3d3f46')],
      ears: [...pair([C(20.6, 18.4, 4.4, '#3d3f46'), C(20.6, 18.4, 4.4, 'none', { stroke: W, strokeWidth: 1.2 })])],
      over: [P('M26.4 38c2-1.4 9.2-1.4 11.2 0 .4 6-.6 12-2.4 16.4-.6 1.6-2 2.2-3.2 2.2s-2.6-.6-3.2-2.2c-1.8-4.4-2.8-10.4-2.4-16.4Z', '#4a4c55'), L('M29 44.6q3 1 6 0M29.4 48.6q2.6 1 5.2 0', '#2d2f35', 0.9), shine(27, 22, 3)],
      eyesY: 28,
    }),
  toucan: () =>
    birdHead({
      head: '#26272d',
      body: '#26272d',
      bib: '#f6f2e0',
      marks: [P('M18 37c2 6 7 10 14 10s12-4 14-10c-4 2-9 3-14 3s-10-1-14-3Z', '#f6f2e0')],
      eye: ringEyes(7.6, 29.6, '#5cc6e8', 3.6, 2.1),
      beak: [P('M24 33c0-4 4-6 8-6 6 0 10 3 12 8 1 4 0 9-3 11-2-6-6-9-11-9-3 0-6-1-6-4Z', '#f39a2b'), P('M24 33c0-4 4-6 8-6 4 0 7 1 9 3-5 0-11 1-17 3Z', '#7bc043'), P('M41 46c3-2 4-7 3-11l-2 1c1 3 .4 6-1 10Z', '#d6332e')],
    }),
  walrus: () => [
    ...body('#8a5a3c'),
    C(32, 31, 16.5, '#a0704f'),
    ...eyes(7.4, 27, 2.1),
    ...muzzle('#c69a76', 37.6, 5, 7, 5.6),
    ...spots('#7a4f33', [
      [24, 37, 0.6],
      [26, 39.6, 0.6],
      [22, 40, 0.6],
      [40, 37, 0.6],
      [38, 39.6, 0.6],
      [42, 40, 0.6],
    ]),
    nose(33.6, 2.6, 1.6),
    ...pair([P('M27.4 41.6h3.2l-.6 15.4c-.2 1.4-1.8 1.4-2 0Z', '#f4efe2')]),
  ],
  wombat: () => [
    ...body('#7a5c45', '#9f8068'),
    ...pair([P('M16.6 24l1-8.4 7.4 4.4Z', '#8b6b52')]),
    E(32, 34, 18, 15.5, '#8b6b52'),
    E(32, 40.4, 10, 6.6, '#a4876d'),
    ...eyes(8.4, 30.6, 2.2),
    P('M27 34.6h10c.6 0 1 .6 1 1.2-.4 3-2.6 4.6-6 4.6s-5.6-1.6-6-4.6c0-.6.4-1.2 1-1.2Z', INK),
    shine(30, 36, 1.5),
    smile(43.4, 2.6),
  ],
  yak: () =>
    longFace({
      fur: '#3f3129',
      snout: '#5a4a40',
      nostril: '#14100c',
      under: [
        P('M4 66c0-16 10-25 28-25s28 9 28 25Z', '#33271f'),
        ...pair([P('M22 20C14 20 9 15 9 6l2.6.4c.6 6 4.6 10 10.6 10.6Z', '#e9e1d2')]),
        ...[-14, -8, 8, 14].map((dx) => P(`M${32 + dx - 3} 42l3 12 3-12Z`, '#2a1f19')),
      ],
      marks: [P('M20 20c3-4 7-6 12-6s9 2 12 6l-2 9c-3-2-6-3-10-3s-7 1-10 3Z', '#2a1f19')],
      eyesY: 30,
    }),
  bulbul: () => [
    ...birdHead({
      head: '#2b2d35',
      body: '#8a7258',
      bib: '#efe8dc',
      under: [P('M24 22c-1-9 3-17 11-20l2 20Z', '#2b2d35')],
      marks: [P('M22 42c3 4 6 5.4 10 5.4s7-1.4 10-5.4c-3 1-6.4 1.6-10 1.6s-7-.6-10-1.6Z', '#efe8dc'), ...pair([E(21.2, 37.4, 3, 2.2, W), E(21.6, 32.6, 2, 1.7, '#d6332e')])],
      eye: eyes(7.8, 29.6, 2.2),
      beak: beak('#14151c', 33.5, 2.4, 4.4),
    }),
  ],
  hoopoe: () => [
    ...[-14, -8, -2, 4, 10].map((dx, i) =>
      group([P(`M32 22l${dx - 3} -14 6 0Z`, '#e39a52'), P(`M${32 + dx - 3} 8l6 0-1 4-4 0Z`, INK)], { transform: `rotate(${(i - 2) * 4} 32 22)` }),
    ),
    ...body('#c97f3c'),
    C(32, 31, 15.5, '#e39a52'),
    ...eyes(6.6, 30, 2.3),
    P('M30.4 34h3.2c0 4-1 9-4 14-1.2 2-3 2.6-3.8 2.2l.4-1c2.4-1.2 3.8-7 4.2-15.2Z', '#3a2c22'),
  ],
  langur: () => [
    ...body('#bdb8ae', '#d8d4cb'),
    ...pair([C(15.5, 32, 3.6, INK)]),
    C(32, 31, 17, '#d8d5cf'),
    P('M18 22c4-5 9-7 14-7s10 2 14 7c-4-2-9-3-14-3s-10 1-14 3Z', '#c7c2b8'),
    P('M21 28c0-4 5-6 11-6s11 2 11 6c0 9-4 17-11 17S21 37 21 28Z', '#2b2b30'),
    L('M22.6 26.4q4.4-2.4 9.4 0q5-2.4 9.4 0', '#4a4a52', 1.4),
    ...eyes(5, 29.8, 2.1, '#d9a04a'),
    ...pair([C(27, 29.8, 1, INK)]),
    ...pair([E(30.4, 36, 0.9, 1.1, '#5a5a62')]),
    L('M28.6 40q3.4 1.6 6.8 0', '#5a5a62', 1.2),
  ],
};

export const AVATAR_ART_IDS: readonly string[] = Object.keys(ART);

/** The drawing for an avatar id, or null for an unknown id. */
export function avatarArt(id: string): SvgNode[] | null {
  const draw = Object.hasOwn(ART, id) ? ART[id] : undefined;
  return draw ? draw() : null;
}

