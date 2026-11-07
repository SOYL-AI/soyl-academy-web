// CBSE 9 Mathematics ch13 Surface Area and Volume: further recall, understanding and hard analysis items (bank only). The mix was
// widened here, and a few unused application items were dropped, so that application or higher stays inside the 45-65% band (nothing was retagged).
import { Q, mk } from './lib.mjs';
import { r, close, cylV, coneV, sphereSA, sphereV, hemiCSA, hemiV, PI7, PI314 } from './h.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 60 }), chk);

T('m22', { stem: 'Which of these is a unit of capacity?', opts: ['litre', 'square metre', 'metre', 'kilogram'], sol: r`Capacity is the amount a container can hold, and it is measured in litres ($1$ L $= 1000$ cm$^3$). The square metre is a unit of area, the metre of length and the kilogram of mass.`, d: 1, c: 'recall', t: [1], time: 45 }, (Cx) => {
  Cx.assert(10 * 10 * 10 === 1000, 'a 10 cm cube holds one litre');
  Cx.which(['litre', 'area', 'length', 'mass'], 'litre');
});
T('m23', { stem: 'The number of faces of a triangular pyramid, counting its base, is', opts: ['$4$', '$3$', '$5$', '$6$'], sol: r`A triangular pyramid has a triangular base and one triangular face on each of the $3$ sides of the base, so $1 + 3 = 4$ faces. The number $3$ leaves out the base.`, d: 1, c: 'recall', t: [3], time: 45 }, (Cx) => {
  Cx.which([1 + 3, 3, 5, 6], 1 + 3);
});
T('m24', { stem: 'Which solid has a curved surface and no flat face at all?', opts: ['A sphere', 'A cone', 'A cylinder', 'A hemisphere'], sol: r`A sphere has one curved surface only. A cone has a flat circular base, a cylinder has two flat circular ends, and a solid hemisphere has one flat circular face.`, d: 1, c: 'understanding', t: [4], time: 45 }, (Cx) => {
  const flat = { sphere: 0, cone: 1, cylinder: 2, hemisphere: 1 };
  Cx.which(Object.keys(flat).map((k) => flat[k] === 0), true);
});
T('m25', { stem: r`The total surface area of a solid hemisphere of radius $r$ is`, opts: [r`$3\pi r^2$`, r`$2\pi r^2$`, r`$4\pi r^2$`, r`$\pi r^2$`], sol: r`The curved surface is $2\pi r^2$ and the flat circular face is $\pi r^2$, so the total is $2\pi r^2 + \pi r^2 = 3\pi r^2$.`, d: 1, c: 'recall', t: [4], time: 45 }, (Cx) => {
  const rr = 2;
  Cx.which([3 * PI314 * rr * rr, 2 * PI314 * rr * rr, 4 * PI314 * rr * rr, PI314 * rr * rr], hemiCSA(rr, PI314) + PI314 * rr * rr);
});
T('m26', { stem: 'The curved surface of a cylinder of radius $r$ and height $h$, cut along its height and opened out flat, is a rectangle of', opts: [r`length $2\pi r$ and width $h$`, r`length $\pi r$ and width $h$`, r`length $2\pi r$ and width $r$`, r`length $h$ and width $r$`], sol: r`The rectangle is as long as the distance round the circular end, which is $2\pi r$, and as wide as the height $h$. Its area is $2\pi r h$, the curved surface area.`, d: 1, c: 'understanding', t: [2], time: 60 }, (Cx) => {
  const rr = 7, h = 10;
  Cx.which([2 * PI7 * rr * h, PI7 * rr * h, 2 * PI7 * rr * rr, h * rr], 2 * PI7 * rr * h);
});
T('m27', { stem: r`The volume of a sphere of radius $r$ is`, opts: [r`$\dfrac{4}{3}\pi r^3$`, r`$4\pi r^2$`, r`$\dfrac{2}{3}\pi r^3$`, r`$\dfrac{1}{3}\pi r^3$`], sol: r`The volume of a sphere is $\dfrac{4}{3}\pi r^3$. The formula $4\pi r^2$ is its surface area, and $\dfrac{2}{3}\pi r^3$ is the volume of a hemisphere.`, d: 1, c: 'recall', t: [4], time: 45 }, (Cx) => {
  const rr = 2;
  Cx.which([(4 / 3) * PI314 * rr ** 3, 4 * PI314 * rr * rr, (2 / 3) * PI314 * rr ** 3, (1 / 3) * PI314 * rr ** 3], 2 * hemiV(rr, PI314));
});
T('m28', { stem: r`A cone and a hemisphere have the same base radius $r$ and the same volume. The height of the cone is`, opts: [r`$2r$`, r`$r$`, r`$\dfrac{3r}{2}$`, r`$4r$`], sol: r`The cone has volume $\dfrac{1}{3}\pi r^2 h$ and the hemisphere has $\dfrac{2}{3}\pi r^3$. Equating, $\dfrac{1}{3}\pi r^2 h = \dfrac{2}{3}\pi r^3$, so $h = 2r$. The cone is twice as tall as the radius.`, d: 4, c: 'analysis', t: [2, 4], time: 120 }, (Cx) => {
  const radii = [3.5, 6, 10.5];
  Cx.assert(radii.every((rr) => close(coneV(rr, 2 * rr, PI7), hemiV(rr, PI7))), 'a cone of height 2r has the volume of the hemisphere');
  const rr = 3.5, h = (3 * hemiV(rr, PI7)) / (PI7 * rr * rr);
  Cx.which([h / rr, 1, 1.5, 4], 2);
});

Q('tf6', mk.tf({ stem: 'The slant height of a triangular face of a square pyramid is equal to the height of the pyramid.', key: 'f', sol: r`The height goes straight down from the apex to the centre of the base, but the slant height goes down the face to the mid-point of a base edge. It is longer: for a base of $16$ cm and a height of $15$ cm, the slant height is $17$ cm. The statement is false.`, d: 1, c: 'understanding', t: [3] }), (Cx) => {
  Cx.assert(Math.hypot(15, 8) === 17 && Math.hypot(15, 8) !== 15, 'slant height 17, not 15');
  Cx.key('f');
});
Q('tf7', mk.tf({ stem: 'The curved surface of a cone, cut along its slant height and opened out flat, is a sector of a circle.', key: 't', sol: r`The opened-out surface is a sector of a circle whose radius is the slant height $l$ and whose arc is the circumference of the base. For $r = 6$ and $l = 10$ it is $\dfrac{216}{360}$ of the circle of radius $10$, with area $188.4$ cm$^2$ for $\pi = 3.14$. The statement is true.`, d: 1, c: 'understanding', t: [2] }), (Cx) => {
  const th = (360 * 6) / 10;
  Cx.assert(close(th, 216) && close((th / 360) * PI314 * 100, 188.4) && close(PI314 * 6 * 10, 188.4), 'sector of angle 216 degrees has area pi r l');
  Cx.key('t');
});
Q('fb4', mk.fill({ stem: 'The surface area of a sphere is ____ times the area of its great circle.', acc: [['4', 'four']], sol: r`The great circle has area $\pi r^2$ and the sphere has surface area $4\pi r^2$, so the sphere has $4$ times the area of its great circle. So the blank is $4$.`, d: 1, c: 'understanding', t: [4] }), (Cx) => {
  Cx.assert(close(sphereSA(5, PI314) / (PI314 * 25), 4), 'four');
  Cx.blank(4);
});

Q('s209', mk.short({ marks: 2, stem: 'A cone and a cylinder have the same base radius and the same height. Compare their volumes, and write the formula for each.', model: r`The cylinder has volume $\pi r^2 h$ and the cone has volume $\dfrac{1}{3}\pi r^2 h$.\n\nSo the volume of the cone is one third of the volume of the cylinder: the cylinder holds the contents of three such cones.`, sol: 'Cylinder pi r squared h; cone one third of it.', scheme: [['Both formulas', 1], ['The cone is one third of the cylinder', 1]], d: 1, c: 'understanding', t: [2], time: 90 }), null, 'comparison of two formulas: marked by the scheme');
Q('s210', mk.short({ marks: 2, stem: 'Explain the difference between the lateral surface area and the total surface area of a cuboid. Write the formula for each.', model: r`The **lateral surface area** is the area of the four side walls only: $2h(l + b)$.\n\nThe **total surface area** is the area of all six faces, the walls plus the top and the bottom: $2(lb + bh + hl)$.`, sol: 'Walls only versus all six faces, with the formulas.', scheme: [['Lateral surface: four walls, 2h(l + b)', 1], ['Total surface: all six faces, 2(lb + bh + hl)', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), null, 'definition and comparison: marked by the scheme');
{
  const rr = 3.5, h = 2 * rr, cyl = 2 * PI7 * rr * h, sph = sphereSA(rr, PI7), vc = cylV(rr, h, PI7), vs = sphereV(rr, PI7);
  Q('s306', mk.short({ marks: 3, stem: r`A solid ball of radius $3.5$ cm fits exactly inside a cylindrical tin: it touches the top, the bottom and the curved side. Show that the curved surface area of the tin equals the surface area of the ball, and find the ratio of the volume of the ball to the volume of the tin. Use $\pi = \dfrac{22}{7}$.`, model: r`The tin has radius $3.5$ cm and height equal to the diameter, $h = 7$ cm.\n\nCurved surface of the tin $= 2\pi r h = 2 \times \dfrac{22}{7} \times 3.5 \times 7 = 154$ cm$^2$. Surface of the ball $= 4\pi r^2 = 4 \times \dfrac{22}{7} \times 3.5^2 = 154$ cm$^2$. They are equal.\n\nVolume of the ball $= \dfrac{4}{3}\pi r^3$ and of the tin $= \pi r^2 \times 2r = 2\pi r^3$, so the ratio is $\dfrac{4}{3} : 2 = 2 : 3$.`, sol: 'Height of the tin is 2r; compare 2 pi r (2r) with 4 pi r squared, and the two volumes.', scheme: [['Tin height 7 cm = 2r', 0.5], ['Both areas are 154 cm squared', 1.5], ['Ratio of volumes 2 : 3', 1]], d: 4, c: 'analysis', t: [2, 4], time: 180 }), (Cx) => {
    Cx.assert(h === 7 && close(cyl, 154) && close(sph, 154) && close(vs / vc, 2 / 3), 'areas equal 154; volumes in the ratio 2 : 3');
    Cx.model([7, 154, 2, 3]);
  });
}
