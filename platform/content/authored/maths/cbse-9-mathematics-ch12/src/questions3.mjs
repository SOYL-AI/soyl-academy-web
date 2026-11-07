// CBSE 9 Mathematics ch12 Area and Perimeter: further recall and understanding items (bank only). The mix was widened here, not
// retagged, so that application or higher stays inside the 45-65% band.
import { Q, mk } from './lib.mjs';
import { r, close, brahma, heron, circleArea, circumference, arcLen, sectorArea, PI7 } from './h.mjs';

const T = (k, o, chk) => Q(k, mk.mcq({ stem: o.stem, opts: o.opts, key: 'a', sol: o.sol, d: o.d, c: o.c, t: o.t, time: o.time ?? 60 }), chk);

T('m23', { stem: 'A round rangoli of radius $r$ is filled with coloured powder. The area it covers is', opts: [r`$\pi r^2$`, r`$2\pi r$`, r`$\pi d$`, r`$2\pi r^2$`], sol: r`The area of a circle of radius $r$ is $\pi r^2$. The formula $2\pi r$ is the circumference, and $\pi d$ is the same circumference written with the diameter.`, d: 1, c: 'recall', t: [3], time: 45 }, (Cx) => {
  const rr = 7, A = circleArea(rr, Math.PI);
  Cx.which([close(A, Math.PI * rr ** 2), close(A, 2 * Math.PI * rr), close(A, Math.PI * 2 * rr), close(A, 2 * Math.PI * rr ** 2)], true);
});
T('m24', { stem: r`The length of an arc of a sector of angle $\theta$ degrees in a circle of radius $r$ is`, opts: [r`$\dfrac{\theta}{360} \times 2\pi r$`, r`$\dfrac{\theta}{360} \times \pi r^2$`, r`$\dfrac{360}{\theta} \times 2\pi r$`, r`$\dfrac{\theta}{180} \times \pi r^2$`], sol: r`The arc is the fraction $\dfrac{\theta}{360}$ of the circumference, so its length is $\dfrac{\theta}{360} \times 2\pi r$. The formula with $\pi r^2$ is for the area of the sector.`, d: 1, c: 'recall', t: [1], time: 60 }, (Cx) => {
  const rr = 7, th = 50, L = arcLen(rr, th, PI7);
  Cx.which([close(L, (th / 360) * 2 * PI7 * rr), close(L, (th / 360) * PI7 * rr * rr), close(L, (360 / th) * 2 * PI7 * rr), close(L, (th / 180) * PI7 * rr * rr)], true);
});
T('m25', { stem: "In Heron's formula the letter $s$ stands for", opts: ['half of the perimeter of the triangle', 'the perimeter of the triangle', 'the longest side', 'the area of the triangle'], sol: r`In Heron's formula $s = \dfrac{a + b + c}{2}$, the semi-perimeter, which is half of the perimeter.`, d: 1, c: 'recall', t: [2], time: 45 }, (Cx) => {
  Cx.assert(close(heron(9, 10, 17), 36) && (9 + 10 + 17) / 2 === 18, 's = 18 for the triangle 9, 10, 17');
  Cx.which(['half', 'whole', 'longest', 'area'], 'half');
});
T('m26', { stem: "Brahmagupta's formula $\\sqrt{(s - a)(s - b)(s - c)(s - d)}$ gives the area of", opts: ['a cyclic quadrilateral', 'every quadrilateral', 'a circle', 'a sector'], sol: "Brahmagupta's formula is for a quadrilateral whose four corners lie on a circle, a cyclic quadrilateral. It does not hold for every quadrilateral.", d: 1, c: 'understanding', t: [4], time: 60 }, (Cx) => {
  Cx.assert(close(brahma(8, 6, 8, 6), 48), 'rectangle, a cyclic quadrilateral');
  Cx.which(['cyclic', 'every', 'circle', 'sector'], 'cyclic');
});
Q('tf5', mk.tf({ stem: r`A sector of angle $180^\circ$ is a semicircle.`, key: 't', sol: r`A sector of angle $180^\circ$ is $\dfrac{180}{360} = \dfrac{1}{2}$ of the circle, which is a semicircle. The statement is true.`, d: 1, c: 'recall', t: [3] }), (Cx) => {
  Cx.assert(close(sectorArea(7, 180, PI7), circleArea(7, PI7) / 2) && close(arcLen(7, 180, PI7), circumference(7, PI7) / 2), 'half of the circle');
  Cx.key('t');
});
Q('tf6', mk.tf({ stem: r`Ravi claims that a circular pond of radius $r$ has a surface area of $2\pi r$.`, key: 'f', sol: r`$2\pi r$ is the circumference, a length. The area is $\pi r^2$. For $r = 7$ cm and $\pi = \dfrac{22}{7}$ the circumference is $44$ cm but the area is $154$ cm$^2$. The statement is false.`, d: 1, c: 'understanding', t: [3] }), (Cx) => {
  Cx.assert(close(circumference(7, PI7), 44) && close(circleArea(7, PI7), 154), '44 and 154');
  Cx.key('f');
});
Q('fb5', mk.fill({ stem: 'The region between two circles with the same centre is called a ____.', acc: [['ring', 'annulus']], sol: 'The region between two concentric circles is called a ring (an annulus). So the blank is ring.', d: 1, c: 'recall', t: [3] }), (Cx) => { Cx.blank('ring'); });
Q('s209', mk.short({ marks: 2, stem: r`Explain the difference between the circumference and the area of a circle of radius $r$. Give the formula for each and the unit of each, for a radius in centimetres.`, model: r`The **circumference** is the length of the boundary, $2\pi r$, measured in cm. The **area** is the space inside the circle, $\pi r^2$, measured in cm$^2$.\n\nFor $r = 7$ cm and $\pi = \dfrac{22}{7}$ they are $44$ cm and $154$ cm$^2$.`, sol: 'Circumference: length, 2 pi r, cm. Area: space inside, pi r squared, cm squared.', scheme: [['Circumference is a length: 2 pi r in cm', 1], ['Area is the space inside: pi r squared in cm squared', 1]], d: 1, c: 'understanding', t: [1, 3], time: 90 }), (Cx) => {
  Cx.assert(close(circumference(7, PI7), 44) && close(circleArea(7, PI7), 154), '44 and 154');
  Cx.model([44, 154]);
});
