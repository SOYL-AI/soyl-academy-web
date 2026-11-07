// Figures of CBSE 9 Mathematics ch13 Surface Area and Volume, shared by the deck builder and the question banks. Solids are drawn in an
// oblique view from computed 3D points (front face true, depth drawn at half length); they are marked not to scale. Every number quoted
// beside a figure is asserted from the formulas and, where the solid has plane faces, from the 3D coordinates.
import { fig, P, proj, ellipseSegs, cuboidFig, cylFig, coneFig, sqPyrFig, sphereFig, hemiFig, must, close, dist, dist3, rd, PI7, PI314, slant, sqSlant, KDEPTH, HID, arcSegs, polar, sphereSA, sphereV } from './h.mjs';


// ---- projection facts: the front face is drawn true, the depth at half length
must(close(dist(proj([0, 0, 0]), proj([6, 0, 0])), 6) && close(dist(proj([0, 0, 0]), proj([0, 6, 0])), 6 * KDEPTH) && close(dist(proj([0, 0, 0]), proj([0, 0, 6])), 6), 'oblique projection');

// ---- generic solids with letters
export const fCuboid = cuboidFig(8, 5, 4, { l: 'l', b: 'b', h: 'h' }, 'A cuboid drawn in an oblique view with length l along the front bottom edge, breadth b going back along the right side, and height h on the front left edge. It has six rectangular faces: front and back, left and right, top and bottom. The hidden edges are dashed.', 'A cuboid of length $l$, breadth $b$ and height $h$ (not to scale).');
export const fCube = cuboidFig(6, 6, 6, { l: 'a', b: 'a', h: 'a' }, 'A cube of edge a drawn in an oblique view. All twelve edges are equal and all six faces are equal squares. The hidden edges are dashed.', 'A cube of edge $a$ (not to scale): six equal square faces.');
export const fCyl = cylFig(3, 5, { r: 'r', h: 'h' }, 'A right circular cylinder with a circular top and a circular bottom of radius r and a height h. The dashed line is the height from the centre of the bottom to the centre of the top, and the segment on the top is a radius. The back half of the bottom circle is dashed.', 'A cylinder of radius $r$ and height $h$ (not to scale).');
export const fCone = coneFig(3, 4, { r: 'r', h: 'h', l: 'l' }, 'A right circular cone with the apex above the centre of a circular base of radius r. The dashed vertical line is the height h and the dashed line along the base is the radius r. The sloping edge from the apex to the rim of the base is the slant height l.', 'A cone of radius $r$, height $h$ and slant height $l$ (not to scale).');
export const fSqPyr = sqPyrFig(6, 4, { a: 'a', h: 'h', l: 'l', pts: true }, 'A square pyramid with a square base of side a and the apex V above the centre O of the base. The dashed line VO is the height h. The line VM from the apex to the mid-point M of a base edge is the slant height l of that triangular face. The hidden edges are dashed.', 'A square pyramid: base side $a$, height $h$ and slant height $l$ (not to scale).');
export const fSphere = sphereFig(3, 'r', 'A sphere drawn as a circle with its centre O. A dashed ellipse shows the equator with its back half dashed. The segment from the centre O to a point on the equator is the radius r.', 'A sphere of radius $r$ (not to scale).');
export const fHemi = hemiFig(3, 'r', 'A solid hemisphere resting on its flat circular face. The curved dome is half of a sphere of radius r, and the dashed segment from the centre of the flat face to its rim is the radius r.', 'A solid hemisphere of radius $r$: a curved surface and one flat circular face (not to scale).');

// ---- WE: an open water tank 4 m by 2.5 m by 1.8 m
must(close(4 * 2.5 * 1.8, 18) && close(4 * 2.5 + 2 * 1.8 * (4 + 2.5), 33.4), 'tank numbers');
export const fTank = cuboidFig(4, 2.5, 1.8, { l: '4 m', b: '2.5 m', h: '1.8 m' }, 'A cuboid-shaped water tank 4 metres long, 2.5 metres broad and 1.8 metres high, drawn in an oblique view and not to scale. The hidden edges are dashed.', 'A tank $4$ m long, $2.5$ m broad and $1.8$ m deep (not to scale).', 0.8);

// ---- WE: an oil drum, radius 35 cm, height 90 cm
must(close(2 * PI7 * 35 * 90, 19800) && close(2 * PI7 * 35 * 125, 27500) && close(PI7 * 35 * 35 * 90, 346500), 'drum numbers');
export const fDrum = cylFig(35, 90, { r: '35 cm', h: '90 cm' }, 'A closed cylindrical oil drum of radius 35 centimetres and height 90 centimetres, drawn in an oblique view and not to scale. The dashed line is the height and the short segment on the top is the radius.', 'An oil drum: $r = 35$ cm, $h = 90$ cm (not to scale).', 0.3);

// ---- the net of a cylinder: a rectangle 44 cm by 10 cm and two circles of radius 7 cm (drawn to one scale, 1 unit = 1 cm)
must(close(2 * PI7 * 7, 44), 'net width 44');
export const fCylNet = (() => {
  const points = { A: P([0, 0], 'sw', false), B: P([44, 0], 'se', false), C: P([44, 10], 'ne', false), D: P([0, 10], 'nw', false), O1: P([22, 17], false, false), E1: P([29, 17], 'e', false), O2: P([22, -7], false, false), E2: P([29, -7], 'e', false) };
  return fig({
    points,
    segments: [{ from: 'A', to: 'B', label: '44 cm' }, { from: 'B', to: 'C', label: '10 cm' }, { from: 'C', to: 'D' }, { from: 'D', to: 'A' }, { from: 'O1', to: 'E1', label: '7 cm' }, { from: 'O2', to: 'E2', label: '7 cm' }],
    circles: [{ center: 'O1', radius: 7 }, { center: 'O2', radius: 7 }],
  }, 'The net of a cylinder of radius 7 centimetres and height 10 centimetres. The curved surface opens out into a rectangle 44 centimetres long and 10 centimetres high; 44 is the circumference of the circular ends. Two circles of radius 7 centimetres, the top and the bottom, are drawn above and below the rectangle.', 'Net of a cylinder: a rectangle $2\\pi r \\times h = 44 \\times 10$ and two circles of radius $7$ cm ($\\pi = \\tfrac{22}{7}$).', 0.8);
})();

// ---- the net of a cone: a sector of radius l = 10 cm; the arc is the circumference of the base, r = 6 cm (3.14)
must(close(2 * PI314 * 6, 37.68) && close(37.68 / (2 * PI314 * 10) * 360, 216) && close((216 / 360) * PI314 * 100, 188.4) && close(PI314 * 6 * 10, 188.4), 'cone net');
export const fConeNet = (() => {
  const O = [0, 0], th = 216, lr = 10;
  const points = { O: P(O, 's', false), A: P([lr, 0], 'e', false), B: P(polar(O, lr, th), 'w', false) };
  const arc = arcSegs(points, 'k', O, lr, 0, th, 54);
  return fig({ points, segments: [{ from: 'O', to: 'A', label: '10 cm' }, { from: 'O', to: 'B', label: '10 cm' }, ...arc] },
    'The net of a cone with slant height 10 centimetres and base radius 6 centimetres: a sector of a circle of radius 10 centimetres whose arc, 37.68 centimetres long, is the circumference of the base. The sector is 216 degrees out of 360, that is 3 fifths of the circle of radius 10 centimetres.', 'Net of a cone: a sector of radius $l = 10$ cm and arc $2\\pi r = 37.68$ cm ($\\pi = 3.14$). It is $\\tfrac{216}{360} = \\tfrac{3}{5}$ of the circle of radius $l$.', 0.8);
})();

// ---- WE: a conical tent r = 9 m, h = 12 m, l = 15 m
must(slant(9, 12) === 15 && close(PI314 * 9 * 15, 423.9) && close(coneV9(), 1017.36), 'tent numbers');
function coneV9() { return (PI314 * 81 * 12) / 3; }
export const fTent = coneFig(9, 12, { r: '9 m', h: '12 m', l: '15 m' }, 'A conical tent of base radius 9 metres, height 12 metres and slant height 15 metres, drawn not to scale. The dashed lines are the height and the radius.', 'A conical tent: $r = 9$ m, $h = 12$ m, $l = 15$ m (not to scale).', 0.5);

// ---- WE: a model temple shikhara, a square pyramid with base 30 cm, height 8 cm, slant height 17 cm
must(sqSlant(30, 8) === 17 && 2 * 30 * 17 === 1020 && 900 + 1020 === 1920 && (900 * 8) / 3 === 2400, 'shikhara numbers');
export const fShikhara = sqPyrFig(30, 8, { a: '30 cm', h: '8 cm', l: '17 cm', pts: true }, 'A model of a temple shikhara in the shape of a square pyramid with a square base of side 30 centimetres, height 8 centimetres and slant height 17 centimetres, drawn not to scale. The dashed line VO is the height and VM is the slant height.', 'A square pyramid: base $30$ cm, height $8$ cm, slant height $17$ cm (not to scale).', 0.3);

// ---- WE: a triangular pyramid on a right-angled triangle 12, 16, 20 with the apex 3 above the in-centre; every slant height is 5
export const TP = { A: [0, 0, 0], B: [12, 0, 0], C: [0, 16, 0], V: [4, 4, 3], M: [4, 0, 0], O: [4, 4, 0] };
{
  const d2 = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
  const inr = (12 + 16 - 20) / 2;
  const footOnBC = [4 + (inr * 16) / 20, 4 + (inr * 12) / 20]; // the foot of the perpendicular from the in-centre to BC
  const onBC = Math.abs((footOnBC[0] - 12) * 16 + footOnBC[1] * 12) < 1e-9; // the foot lies on the line 16x + 12y = 192
  must(close(d2(TP.O, TP.M), 4) && close(d2(TP.O, [0, 4]), 4) && inr === 4 && close(Math.abs(16 * 4 + 12 * 4 - 192) / 20, 4) && onBC, 'in-centre at (4, 4), distance 4 from the three sides');
  must(close(dist3(TP.V, TP.M), 5) && close(dist3(TP.V, [0, 4, 0]), 5) && close(dist3(TP.V, [footOnBC[0], footOnBC[1], 0]), 5), 'all three slant heights are 5');
  must(close(0.5 * 12 * 16, 96) && close(0.5 * (12 + 16 + 20) * 5, 120) && 96 + 120 === 216 && close((96 * 3) / 3, 96), 'triangular pyramid numbers');
}
export const fTriPyr = (() => {
  const pos = { A: 'sw', B: 'se', C: 'ne', V: 'n', M: 's' };
  const points = {};
  for (const k of ['A', 'B', 'C', 'V', 'M']) points[k] = P(proj(TP[k]), pos[k]);
  points.O = P(proj(TP.O), false, false);
  return fig({
    points,
    segments: [{ from: 'A', to: 'B', label: '12 cm' }, { from: 'B', to: 'C', label: '20 cm' }, { from: 'C', to: 'A', dashed: true, label: '16 cm' }, { from: 'V', to: 'A' }, { from: 'V', to: 'B' }, { from: 'V', to: 'C' }, { from: 'V', to: 'O', dashed: true, label: '3 cm' }, { from: 'V', to: 'M', label: '5 cm' }],
    not_to_scale: true,
  }, 'A triangular pyramid VABC. The base ABC is a right-angled triangle with sides 12, 16 and 20 centimetres. The apex V is 3 centimetres above the point O inside the base that is 4 centimetres from each side, so each of the three triangular faces has slant height 5 centimetres. The segment VM, 5 centimetres, is the slant height of the face VAB. The hidden edge AC is dashed. Not to scale.', 'A triangular pyramid: base $12$, $16$, $20$ cm; height $3$ cm; each slant height $5$ cm (not to scale).', 0.6);
})();

// ---- a cube of edge 6 cut into three pyramids: one pyramid with base ABFE (bottom face) and apex D (the top front left corner)
must(close((6 * 6 * 6) / 3, 72) && close((36 * 6) / 3, 72) && 3 * 72 === 216, 'pyramid in a cube');
export const fPyrCube = (() => {
  const a = 6;
  const V = { A: [0, 0, 0], B: [a, 0, 0], C: [a, 0, a], D: [0, 0, a], E: [0, a, 0], F: [a, a, 0], G: [a, a, a], H: [0, a, a] };
  const pos = { A: 'sw', B: 'se', C: 'e', D: 'nw', E: 'w', F: 'e', G: 'ne', H: 'nw' };
  const points = {};
  for (const [k, v] of Object.entries(V)) points[k] = P(proj(v), pos[k]);
  const edge = (from, to, extra = {}) => ({ from, to, ...extra });
  return fig({
    points,
    segments: [edge('A', 'B'), edge('B', 'C'), edge('C', 'D'), edge('D', 'A'), edge('D', 'H'), edge('C', 'G'), edge('H', 'G'), edge('B', 'F'), edge('F', 'G'), edge('A', 'E', { dashed: true }), edge('E', 'F', { dashed: true }), edge('E', 'H', { dashed: true }),
      edge('D', 'B', { dashed: true }), edge('D', 'F', { dashed: true }), edge('D', 'E', { dashed: true })],
    polygons: [{ vertices: ['A', 'B', 'F', 'E'], highlight: 'shade' }],
    not_to_scale: true,
  }, 'A cube ABCDEFGH of edge 6 centimetres with a pyramid drawn inside it. The pyramid has the bottom face ABFE as its base, shaded, and the top corner D as its apex; its edges DB, DF and DE are dashed. The pyramid has the same base and the same height as the cube.', 'A pyramid with the same base and the same height as a cube: three such pyramids fill the cube (not to scale).');
})();

// ---- a sphere: the ladoo of radius 2.1 cm
must(close(sphereSA(2.1, PI7), 55.44) && close(sphereV(2.1, PI7), 38.808), 'ladoo numbers');
export const fLadoo = sphereFig(2.1, '2.1 cm', 'A ladoo in the shape of a sphere of radius 2.1 centimetres, with its radius drawn from the centre. Not to scale.', 'A ladoo: a sphere of radius $2.1$ cm.');

// ---- a hemisphere: a planetarium dome of radius 10.5 m
must(close(hemiCSA10(), 693) && close(hemiVol(), 2425.5), 'dome numbers');
function hemiCSA10() { return 2 * PI7 * 10.5 * 10.5; }
function hemiVol() { return (2 * PI7 * 10.5 ** 3) / 3; }
export const fDome = hemiFig(10.5, '10.5 m', 'The hemispherical dome of a planetarium of radius 10.5 metres, drawn with its dashed radius. Not to scale.', 'A hemispherical dome: $r = 10.5$ m.');

// ---- a hemispherical katori of radius 4.2 cm
export const fKatori = hemiFig(4.2, '4.2 cm', 'A hemispherical katori (bowl) of inner radius 4.2 centimetres, with its dashed radius. Not to scale.', 'A hemispherical katori: $r = 4.2$ cm.');

export { rd, ellipseSegs, HID, dist };
