// Figures for ch12 Surface Areas and Volumes: SVG drawings of combined solids in a tilted orthographic
// view (horizontal circles appear as ellipses with axis ratio E; vertical lengths true to scale). The
// sides of a cone are drawn to the exact tangent points of its base ellipse from the apex, so the
// outline is a true silhouette. Hidden edges are dashed. Labels give the real dimensions.
import { Svg } from '../../cbse-10-mathematics-ch10/src/lib.mjs';

const E = 0.3;
const fillOnly = { fill: true, stroke: false };

/** Ellipse outline in two halves: front (nearer, lower half) and back. */
function rim(S, c, a, backDashed) {
  S.halfEllipse(c, a, a * E, 'front', {});
  S.halfEllipse(c, a, a * E, 'back', backDashed ? { dash: true, sw: 1.1 } : {});
}
/** Cone with base centre (cx, y0), radius r and apex at height h above (h > 0) or below (h < 0). */
function cone(S, cx, y0, r, h, { backDashed = true } = {}) {
  const b = r * E, H = Math.abs(h), s = Math.sign(h);
  const yt = (b * b) / H, xt = r * Math.sqrt(1 - (b * b) / (H * H));
  const apex = [cx, y0 + h], L = [cx - xt, y0 + s * yt], R = [cx + xt, y0 + s * yt];
  S.ellipse([cx, y0], r, b, fillOnly).poly([apex, L, R], fillOnly);
  S.line(apex, L, {}).line(apex, R, {});
  if (s > 0) {
    // apex up: the base arc between the tangent points through the front is visible
    S.path([['M', L], ['E', r, b, true, true, R]], {});
    S.path([['M', R], ['E', r, b, false, true, L]], backDashed ? { dash: true, sw: 1.1 } : {});
  } else {
    rim(S, [cx, y0], r, backDashed);
  }
  return { apex };
}
function hemiUp(S, cx, y0, r) {
  S.ellipse([cx, y0], r, r * E, fillOnly).sector([cx, y0], r, 0, 180, fillOnly);
  S.arc([cx, y0], r, 0, 180, {});
  rim(S, [cx, y0], r, true);
}
function hemiDown(S, cx, y0, r, { covered = true } = {}) {
  S.ellipse([cx, y0], r, r * E, fillOnly).sector([cx, y0], r, 180, 360, fillOnly);
  S.arc([cx, y0], r, 180, 360, {});
  rim(S, [cx, y0], r, covered);
}
function cylinder(S, cx, y0, r, h, { topCovered = false, bottomCovered = false } = {}) {
  const b = r * E;
  S.ellipse([cx, y0], r, b, fillOnly).rect(cx - r, y0, 2 * r, h, fillOnly).ellipse([cx, y0 + h], r, b, fillOnly);
  S.line([cx - r, y0], [cx - r, y0 + h], {}).line([cx + r, y0], [cx + r, y0 + h], {});
  if (bottomCovered) rim(S, [cx, y0], r, true); else rim(S, [cx, y0], r, true);
  if (topCovered) rim(S, [cx, y0 + h], r, true); else S.ellipse([cx, y0 + h], r, b, {});
}
/** Box seen from the front and slightly above: front face w × h, top face foreshortened by E. */
function box(S, cx, y0, w, h, d) {
  const x0 = cx - w / 2, t = d * E;
  S.rect(x0, y0, w, h, { fill: true }).rect(x0, y0 + h, w, t, { fill: 'muted', fillOpacity: '0.35' });
}
function dimV(S, x, y1, y2, label, side = 1) {
  S.line([x, y1], [x, y2], { muted: true, sw: 1, dash: true });
  S.text([x + side * 0.25, (y1 + y2) / 2], label, { size: 11, anchor: side > 0 ? 'start' : 'end' });
}
function radius(S, c, r, label) {
  S.line(c, [c[0] + r, c[1]], { sw: 1.1 });
  S.dot(c, 0.05);
  S.text([c[0] + r + 0.1, c[1] + 0.2], label, { size: 11, anchor: 'start' });
}

export const figs = {};

// kulfi / spinning top: cone apex down with a hemisphere on its base
function coneHemi({ k, r, h, labels, alt, caption, w = 5, H = 6 }) {
  const S = new Svg(w, H), cx = w / 2, y0 = 0.3 + h * k;
  cone(S, cx, y0, r * k, -h * k);
  hemiUp(S, cx, y0, r * k);
  radius(S, [cx, y0], r * k, labels.r);
  dimV(S, cx + r * k + 0.15, y0 - h * k, y0, labels.h);
  if (labels.l) S.text([cx - (r * k) / 2 - 0.45, y0 - (h * k) / 2], labels.l, { size: 11, anchor: 'end' });
  return S.visual(alt, caption);
}
figs.kulfi = coneHemi({ k: 0.3, r: 3.5, h: 12, labels: { r: '3.5 cm', h: '12 cm', l: 'l' }, alt: 'A kulfi shaped as a cone with its point downwards, radius 3.5 centimetres and height 12 centimetres, topped with a hemisphere of the same radius. The joining circle is hidden inside.', caption: 'Cone (apex down) $+$ hemisphere of the same radius.', H: 5.6 });
figs.kulfiCase = coneHemi({ k: 0.42, r: 2.1, h: 7.2, labels: { r: '2.1 cm', h: '7.2 cm', l: 'l' }, alt: 'A kulfi made of a cone of radius 2.1 centimetres and height 7.2 centimetres, point downwards, with a hemisphere of radius 2.1 centimetres on top.', caption: 'Kulfi: cone of radius $2.1$ cm and height $7.2$ cm with a hemispherical top.', H: 5 });
figs.lattu = coneHemi({ k: 0.6, r: 2.1, h: 2.8, labels: { r: '2.1 cm', h: '2.8 cm' }, alt: 'A wooden spinning top: a cone of radius 2.1 centimetres and height 2.8 centimetres with its point downwards, joined to a hemisphere of radius 2.1 centimetres on top.', caption: 'Spinning top: hemisphere on the base of a cone.', H: 4.2 });

figs.coneLabels = (() => {
  const S = new Svg(5, 5.2), cx = 2.5, y0 = 0.8, r = 1.8, h = 3.8;
  cone(S, cx, y0, r, h);
  S.line([cx, y0], [cx, y0 + h], { dash: true, sw: 1.1 });
  S.line([cx, y0], [cx + r, y0], { sw: 1.1 }).rightMark([cx, y0], [cx, y0 + h], [cx + r, y0], 0.2);
  S.text([cx + r / 2, y0 - 0.25], 'r', { size: 13, italic: true }).text([cx - 0.2, y0 + h / 2], 'h', { size: 13, italic: true }).text([cx + r / 2 + 0.45, y0 + h / 2 + 0.1], 'l', { size: 13, italic: true });
  return S.visual('A right circular cone with base radius r, vertical height h from the centre of the base to the apex, and slant height l along the side; r, h and l form a right triangle.', 'Slant height: $l = \\sqrt{r^2 + h^2}$.');
})();

function cylCone({ k, r, h1, h2, labels, alt, caption, w = 5.4, H = 6, base = 0.4 }) {
  const S = new Svg(w, H), cx = w / 2;
  cylinder(S, cx, base, r * k, h1 * k, { topCovered: true });
  cone(S, cx, base + h1 * k, r * k, h2 * k);
  radius(S, [cx, base], r * k, labels.r);
  dimV(S, cx - r * k - 0.15, base, base + h1 * k, labels.h1, -1);
  dimV(S, cx - r * k - 0.15, base + h1 * k, base + (h1 + h2) * k, labels.h2, -1);
  return S.visual(alt, caption);
}
figs.tent = cylCone({ k: 0.42, r: 3.5, h1: 3, h2: 1.2, labels: { r: '3.5 m', h1: '3 m', h2: '1.2 m' }, alt: 'A camp tent made of a cylinder of radius 3.5 metres and height 3 metres with a conical roof 1.2 metres high on top.', caption: 'Tent: cylinder $+$ cone; the canvas has no floor.', w: 6, H: 3.2 });
figs.silo = cylCone({ k: 0.3, r: 3.5, h1: 10, h2: 3, labels: { r: '3.5 m', h1: '10 m', h2: '3 m' }, alt: 'A grain silo made of a cylinder of radius 3.5 metres and height 10 metres with a conical roof 3 metres high.', caption: 'Silo: volume $=$ cylinder $+$ cone.', w: 5, H: 4.9 });
figs.rocket = cylCone({ k: 0.3, r: 3, h1: 12, h2: 4, labels: { r: '3 cm', h1: '12 cm', h2: '4 cm' }, alt: 'A toy rocket made of a cylinder of radius 3 centimetres and height 12 centimetres with a cone 4 centimetres high on top.', caption: 'Rocket: cylinder $+$ cone of the same radius.', w: 4.4, H: 5.5 });
figs.shamiana = cylCone({ k: 0.2, r: 14, h1: 3, h2: 10.5, labels: { r: '14 m', h1: '3 m', h2: '10.5 m' }, alt: 'A large wedding tent made of a cylinder of radius 14 metres and height 3 metres with a conical roof 10.5 metres high.', caption: 'Shamiana: cylindrical wall and conical roof.', w: 8.6, H: 3.9 });

function cylHemi({ k, r, h, top = false, bottom = false, labels, alt, caption, w = 4.6, H = 5.6 }) {
  const S = new Svg(w, H), cx = w / 2, base = 0.3 + (bottom ? r * k : 0);
  if (bottom) hemiDown(S, cx, base, r * k, { covered: true });
  cylinder(S, cx, base, r * k, h * k, { topCovered: top, bottomCovered: bottom });
  if (top) hemiUp(S, cx, base + h * k, r * k);
  radius(S, [cx, base + h * k], r * k, labels.r);
  dimV(S, cx - r * k - 0.15, base, base + h * k, labels.h, -1);
  return S.visual(alt, caption);
}
figs.tank = cylHemi({ k: 0.55, r: 2.1, h: 4, bottom: true, labels: { r: '2.1 m', h: '4 m' }, alt: 'A water tank made of an open cylinder of radius 2.1 metres and height 4 metres standing on a hemispherical bottom of the same radius.', caption: 'Tank: cylinder $+$ hemispherical bottom.', H: 4.1 });
figs.testTube = cylHemi({ k: 0.3, r: 1, h: 14, bottom: true, labels: { r: '1 cm', h: '14 cm' }, alt: 'A test tube: an open cylinder of radius 1 centimetre and height 14 centimetres with a hemispherical bottom of radius 1 centimetre.', caption: 'Test tube: cylinder $+$ hemisphere.', w: 3.6, H: 5.4 });
figs.pillar = cylHemi({ k: 0.85, r: 0.35, h: 4, top: true, labels: { r: '0.35 m', h: '4 m' }, alt: 'A stone pillar made of a cylinder of radius 0.35 metres and height 4 metres with a hemispherical cap of the same radius.', caption: 'Pillar: cylinder $+$ hemisphere on top.', w: 3.6, H: 4.2 });
figs.hemiCyl = cylHemi({ k: 0.3, r: 7, h: 5, top: true, labels: { r: '7 cm', h: '5 cm' }, alt: 'A solid made of a cylinder of radius 7 centimetres and height 5 centimetres with a hemisphere of radius 7 centimetres on top.', caption: 'Cylinder $+$ hemisphere: the joining circle is hidden.', w: 6.2, H: 4.2 });

function toy({ k, r, h, labels, alt, caption, w = 5, H = 5.6 }) {
  const S = new Svg(w, H), cx = w / 2, y0 = 0.3 + r * k;
  hemiDown(S, cx, y0, r * k, { covered: true });
  cone(S, cx, y0, r * k, h * k);
  radius(S, [cx, y0], r * k, labels.r);
  dimV(S, cx + r * k + 0.15, y0, y0 + h * k, labels.h);
  return S.visual(alt, caption);
}
figs.toy = toy({ k: 0.12, r: 7, h: 24, labels: { r: '7 cm', h: '24 cm' }, alt: 'A wooden toy made of a cone of radius 7 centimetres and height 24 centimetres standing on a hemisphere of the same radius.', caption: 'Toy: cone on a hemisphere; only the two curved surfaces are painted.', H: 4.1 });

figs.capsule = (() => {
  const S = new Svg(7, 2.6), k = 0.6, r = 1.4 * k, len = 7 * k, cy = 1.3, x1 = (7 - len) / 2, x2 = x1 + len;
  S.rect(x1, cy - r, len, 2 * r, fillOnly).sector([x1, cy], r, 90, 270, fillOnly).sector([x2, cy], r, -90, 90, fillOnly);
  S.line([x1, cy + r], [x2, cy + r], {}).line([x1, cy - r], [x2, cy - r], {});
  S.arc([x1, cy], r, 90, 270, {}).arc([x2, cy], r, -90, 90, {});
  S.ellipse([x1, cy], r * E, r, { dash: true, sw: 1 }).ellipse([x2, cy], r * E, r, { dash: true, sw: 1 });
  S.text([(x1 + x2) / 2, cy + r + 0.25], '7 m', { size: 11 }).line([x2, cy], [x2 + r, cy], { sw: 1.1 }).text([x2 + r / 2, cy + 0.2], '1.4 m', { size: 10 });
  return S.visual('An oil tanker body lying on its side: a cylinder 7 metres long and radius 1.4 metres with a hemisphere of the same radius at each end; the two joining circles are hidden.', 'Cylinder $+$ two hemispheres: surface $= 2\\pi rh + 4\\pi r^2$.');
})();

function cubeHemi({ a, k, r, mode, labels, alt, caption, w = 5, H = 5 }) {
  const S = new Svg(w, H), cx = w / 2, y0 = 0.4, A = a * k, R = r * k;
  box(S, cx, y0, A, A, A);
  const top = [cx, y0 + A + (A * E) / 2];
  if (mode === 'on') hemiUp(S, cx, top[1], R);
  else { S.ellipse(top, R, R * E, { fill: 'none' }); S.path([['M', [cx - R, top[1]]], ['E', R, R * 0.9, false, true, [cx + R, top[1]]]], { dash: true, sw: 1.1 }); }
  S.text([cx, y0 - 0.22], labels.a, { size: 11 });
  S.line(top, [cx + R, top[1]], { sw: 1 }).text([cx + R / 2, top[1] + (mode === 'on' ? 0.18 : -0.18)], labels.r, { size: 10 });
  return S.visual(alt, caption);
}
figs.cubeScoop = cubeHemi({ a: 10, k: 0.33, r: 3, mode: 'scoop', labels: { a: '10 cm', r: '3 cm' }, alt: 'A wooden cube of edge 10 centimetres seen from the front and slightly above. A hemispherical hollow of radius 3 centimetres is scooped out of the middle of its top face; the hidden bowl is dashed.', caption: 'Scooping removes a circle $\\pi r^2$ from the top but adds the bowl $2\\pi r^2$.', H: 4.8 });
figs.wellBlock = (() => {
  const S = new Svg(7.4, 4), k = 0.3, cx = 3.7, y0 = 0.4, W = 20 * k, Hh = 5 * k, D = 14 * k, R = 3.5 * k;
  box(S, cx, y0, W, Hh, D);
  const top = [cx, y0 + Hh + (D * E) / 2];
  S.ellipse(top, R, R * E, {}).path([['M', [cx - R, top[1]]], ['E', R, R * 0.9, false, true, [cx + R, top[1]]]], { dash: true, sw: 1.1 });
  S.text([cx, y0 - 0.22], '20 cm', { size: 11 }).text([cx + W / 2 + 0.15, y0 + Hh / 2], '5 cm', { size: 11, anchor: 'start' }).text([cx + W / 2 - 0.1, y0 + Hh + D * E + 0.2], '14 cm deep', { size: 10, anchor: 'end' });
  return S.visual('A wooden block 20 centimetres long, 14 centimetres deep and 5 centimetres high, with a hemispherical well of radius 3.5 centimetres scooped out of its top face.', 'Wood $=$ cuboid $-$ hemisphere.');
})();
figs.cylCavity = (() => {
  const S = new Svg(4.4, 4.2), k = 0.3, cx = 2.2, y0 = 0.5, r = 6 * k, h = 8 * k;
  cylinder(S, cx, y0, r, h);
  S.line([cx - r, y0 + h], [cx, y0], { dash: true, sw: 1.2 }).line([cx + r, y0 + h], [cx, y0], { dash: true, sw: 1.2 });
  S.ellipse([cx, y0 + h], r, r * E, { fill: 'muted', fillOpacity: '0.5' });
  radius(S, [cx, y0 + h], r, '6 cm');
  dimV(S, cx + r + 0.15, y0, y0 + h, '8 cm');
  return S.visual('A solid cylinder of radius 6 centimetres and height 8 centimetres with a cone of the same radius and height hollowed out from its top face; the hidden cone is dashed, with its apex at the centre of the bottom.', 'Cylinder minus a cone with the same base and height.');
})();
figs.cuboidCube = (() => {
  const S = new Svg(5.6, 5.6), k = 0.4, cx = 2.8, y0 = 0.4;
  box(S, cx, y0, 10 * k, 6 * k, 8 * k);
  box(S, cx, y0 + 6 * k + (8 * k * E) / 2 - (4 * k * E) / 2, 4 * k, 4 * k, 4 * k);
  S.text([cx, y0 - 0.22], '10 cm', { size: 11 }).text([cx + 5 * k + 0.12, y0 + 3 * k], '6 cm', { size: 11, anchor: 'start' }).text([cx + 2 * k + 0.12, y0 + 6 * k + 2 * k + 0.3], '4 cm', { size: 11, anchor: 'start' });
  return S.visual('A cuboid 10 centimetres long, 8 centimetres deep and 6 centimetres high, with a cube of edge 4 centimetres placed at the centre of its top face.', 'Cuboid with a cube on top: the cube hides a $4 \\times 4$ square of the cuboid but shows the same area on its own top.');
})();
figs.gallery = (() => {
  const S = new Svg(9.6, 3.2), y = 0.5;
  box(S, 0.95, y, 1.3, 1.3, 1.3);
  cylinder(S, 2.9, y, 0.6, 1.6);
  cone(S, 4.7, y, 0.65, 1.8);
  S.circle([6.4, y + 0.8], 0.8, { fill: true }); S.halfEllipse([6.4, y + 0.8], 0.8, 0.24, 'front', { sw: 1 }); S.halfEllipse([6.4, y + 0.8], 0.8, 0.24, 'back', { dash: true, sw: 1 });
  hemiUp(S, 8.4, y + 0.2, 0.8);
  ['cube / cuboid', 'cylinder', 'cone', 'sphere', 'hemisphere'].forEach((t, i) => S.text([[0.95, 2.9, 4.7, 6.4, 8.4][i], 0.2], t, { size: 11 }));
  return S.visual('The five basic solids side by side: a cube, a cylinder, a cone, a sphere and a hemisphere.', 'The building blocks of every combined solid in this chapter.');
})();
