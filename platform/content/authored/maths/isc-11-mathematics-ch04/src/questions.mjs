// ISC 11 Mathematics ch04 Compound, Multiple and Sub-multiple Angles: objective items (mcq, assertion-reason,
// true-false, fill-blank, numerical) with independent re-solve checks. Option values are typed independently of the
// option text and compared with the re-solved target; identities are tested at fixed sample angles in all quadrants;
// exact surds are checked in Q(sqrt 2, sqrt 3) where the angle is a multiple of 15 degrees.
import { Q, mk } from './lib.mjs';
import { r, S, C, T, PI, fr, near, rad } from './h4.mjs';
import { el, sinD, cosD, tanD, eq, add, mul } from './trig.mjs';

const R = rad;
const s2 = Math.SQRT2, s3 = Math.sqrt(3), s6 = Math.sqrt(6);
const PTS2 = [[0.7, 0.3], [1.9, 0.6], [2.6, 1.4], [-0.8, 0.5], [4.0, 2.2]];
const PTS1 = [0.3, 0.9, 1.7, 2.4, 3.3, 5.0, -0.6];
/** Which of the option functions agree with g at every sample point (booleans, one per option). */
const same2 = (g, fs) => fs.map((f) => PTS2.every(([x, y]) => near(f(x, y), g(x, y), 1e-9)));
const same1 = (g, fs) => fs.map((f) => PTS1.every((x) => near(f(x), g(x), 1e-9)));

// =============================================================== MCQ
Q('m01', mk.mcq({ stem: r`The expansion of $\sin(P - Q)$ in terms of the sines and cosines of $P$ and $Q$ is`, opts: [r`$\sin P\cos Q - \cos P\sin Q$`, r`$\sin P\cos Q + \cos P\sin Q$`, r`$\cos P\cos Q - \sin P\sin Q$`, r`$\sin P\sin Q - \cos P\cos Q$`], key: 'a', sol: r`The sine formula keeps the sign of the angle: $\sin(P - Q) = \sin P\cos Q - \cos P\sin Q$. Option (b) is $\sin(P + Q)$ and (c) is $\cos(P + Q)$.`, d: 1, c: 'recall', t: [1], time: 30 }),
  (C_) => C_.which(same2((x, y) => S(x - y), [(x, y) => S(x) * C(y) - C(x) * S(y), (x, y) => S(x) * C(y) + C(x) * S(y), (x, y) => C(x) * C(y) - S(x) * S(y), (x, y) => S(x) * S(y) - C(x) * C(y)]), true));
Q('m02', mk.mcq({ stem: r`Which of the following is a correct expansion of $\cos(P + Q)$ for all angles $P$ and $Q$?`, opts: [r`$\cos P\cos Q + \sin P\sin Q$`, r`$\cos P\cos Q - \sin P\sin Q$`, r`$\sin P\cos Q + \cos P\sin Q$`, r`$\cos P\sin Q - \sin P\cos Q$`], key: 'b', sol: r`The cosine of a sum reverses the sign between the two products: $\cos(P + Q) = \cos P\cos Q - \sin P\sin Q$. Option (a) is $\cos(P - Q)$.`, d: 1, c: 'understanding', t: [1], time: 40 }),
  (C_) => C_.which(same2((x, y) => C(x + y), [(x, y) => C(x) * C(y) + S(x) * S(y), (x, y) => C(x) * C(y) - S(x) * S(y), (x, y) => S(x) * C(y) + C(x) * S(y), (x, y) => C(x) * S(y) - S(x) * C(y)]), true));
Q('m03', mk.mcq({ stem: r`The exact value of $\sin 195^\circ$ is`, opts: [r`$\dfrac{\sqrt{6} - \sqrt{2}}{4}$`, r`$\dfrac{\sqrt{2} - \sqrt{6}}{4}$`, r`$\dfrac{\sqrt{6} + \sqrt{2}}{4}$`, r`$-\dfrac{\sqrt{6} + \sqrt{2}}{4}$`], key: 'b', sol: r`$195^\circ = 150^\circ + 45^\circ$, so $\sin 195^\circ = \sin 150^\circ\cos 45^\circ + \cos 150^\circ\sin 45^\circ = \dfrac{1}{2}\cdot\dfrac{\sqrt{2}}{2} - \dfrac{\sqrt{3}}{2}\cdot\dfrac{\sqrt{2}}{2} = \dfrac{\sqrt{2} - \sqrt{6}}{4}$. It is negative, as the third quadrant requires.`, d: 2, c: 'application', t: [1], time: 75 }),
  (C_) => { C_.assert(eq(sinD(195), el(0, fr(1, 4), 0, fr(-1, 4))), 'exact: sin 195 = (sqrt2 - sqrt6)/4'); C_.which([(s6 - s2) / 4, (s2 - s6) / 4, (s6 + s2) / 4, -(s6 + s2) / 4], S(R(195))); });
Q('m04', mk.mcq({ stem: r`The value of $\tan 105^\circ$ is`, opts: [r`$2 + \sqrt{3}$`, r`$-(2 + \sqrt{3})$`, r`$2 - \sqrt{3}$`, r`$\sqrt{3} - 2$`], key: 'b', sol: r`$\tan 105^\circ = \tan(60^\circ + 45^\circ) = \dfrac{\sqrt{3} + 1}{1 - \sqrt{3}} = -\dfrac{(\sqrt{3} + 1)^2}{2} = -(2 + \sqrt{3})$. The angle is in the second quadrant, where tangent is negative.`, d: 2, c: 'application', t: [1], time: 75 }),
  (C_) => { C_.assert(eq(tanD(105), el(-2, 0, -1)), 'exact: tan 105 = -(2 + sqrt3)'); C_.which([2 + s3, -(2 + s3), 2 - s3, s3 - 2], T(R(105))); });
{
  const sA = fr(7, 25), cA = fr(24, 25), cB = fr(3, 5), sB = fr(4, 5);
  const v = sA.mul(cB).add(cA.mul(sB));
  Q('m05', mk.mcq({ stem: r`The acute angles $A$ and $B$ satisfy $\sin A = \dfrac{7}{25}$ and $\cos B = \dfrac{3}{5}$. The value of $\sin(A + B)$ is`, opts: [r`$\dfrac{21}{125}$`, r`$\dfrac{4}{5}$`, r`$\dfrac{117}{125}$`, r`$-\dfrac{3}{5}$`], key: 'c', sol: r`$\cos A = \dfrac{24}{25}$ and $\sin B = \dfrac{4}{5}$, so $\sin(A + B) = \dfrac{7}{25}\cdot\dfrac{3}{5} + \dfrac{24}{25}\cdot\dfrac{4}{5} = \dfrac{21 + 96}{125} = \dfrac{117}{125}$. The value $\dfrac{21}{125}$ is only the first product.`, d: 2, c: 'application', t: [1], time: 90 }),
    (C_) => { const A = Math.asin(7 / 25), B = Math.acos(3 / 5); C_.assert(near(S(A + B), 117 / 125, 1e-12) && v.eq(fr(117, 125)), '117/125'); C_.which([sA.mul(cB).v, cA.mul(cB).add(sA.mul(sB)).v, v.v, sA.mul(cB).sub(cA.mul(sB)).v], 117 / 125); });
}
Q('m06', mk.mcq({ stem: r`The acute angles $x$ and $y$ satisfy $\tan x = 3$ and $\tan y = 2$. Then $x + y$ equals`, opts: [r`$\dfrac{\pi}{4}$`, r`$\dfrac{\pi}{3}$`, r`$\dfrac{3\pi}{4}$`, r`$\dfrac{2\pi}{3}$`], key: 'c', sol: r`$\tan(x + y) = \dfrac{3 + 2}{1 - 6} = -1$. Each angle is acute, so $0 < x + y < \pi$, and the only angle there with tangent $-1$ is $\dfrac{3\pi}{4}$.`, d: 3, c: 'application', t: [1], time: 90 }),
  (C_) => C_.which([PI / 4, PI / 3, 3 * PI / 4, 2 * PI / 3], Math.atan(3) + Math.atan(2)));
Q('m07', mk.mcq({ stem: r`The value of $\sin 80^\circ\cos 20^\circ - \cos 80^\circ\sin 20^\circ$ is`, opts: [r`$\dfrac{1}{2}$`, r`$\dfrac{\sqrt{3}}{2}$`, r`$1$`, r`$\dfrac{\sqrt{2}}{2}$`], key: 'b', sol: r`The expression has the form $\sin P\cos Q - \cos P\sin Q = \sin(P - Q)$ with $P = 80^\circ$, $Q = 20^\circ$, so it equals $\sin 60^\circ = \dfrac{\sqrt{3}}{2}$.`, d: 2, c: 'understanding', t: [1], time: 60 }),
  (C_) => C_.which([0.5, s3 / 2, 1, s2 / 2], S(R(80)) * C(R(20)) - C(R(80)) * S(R(20))));
Q('m08', mk.mcq({ stem: r`The expression $\cos 40^\circ\cos 10^\circ - \sin 40^\circ\sin 10^\circ$ is equal to`, opts: [r`$\cos 30^\circ$`, r`$\cos 50^\circ$`, r`$\sin 50^\circ$`, r`$\sin 30^\circ$`], key: 'b', sol: r`The pattern $\cos P\cos Q - \sin P\sin Q$ is $\cos(P + Q)$, here $\cos 50^\circ$. Option (a) would need a plus sign between the products.`, d: 2, c: 'understanding', t: [1], time: 60 }),
  (C_) => C_.which([C(R(30)), C(R(50)), S(R(50)), S(R(30))], C(R(40)) * C(R(10)) - S(R(40)) * S(R(10))));
Q('m09', mk.mcq({ stem: r`For every real $x$, the double angle $\sin 2x$ equals`, opts: [r`$2\sin x\cos x$`, r`$\sin^2 x + \cos^2 x$`, r`$2\sin x$`, r`$\sin x\cos x$`], key: 'a', sol: r`Put $B = A = x$ in $\sin(A + B) = \sin A\cos B + \cos A\sin B$ to get $2\sin x\cos x$. Option (b) is always $1$.`, d: 1, c: 'recall', t: [2], time: 30 }),
  (C_) => C_.which(same1((x) => S(2 * x), [(x) => 2 * S(x) * C(x), (x) => S(x) ** 2 + C(x) ** 2, (x) => 2 * S(x), (x) => S(x) * C(x)]), true));
Q('m10', mk.mcq({ stem: r`Exactly one of the four expressions below is **not** equal to $\cos 2\theta$ for all $\theta$. Which one?`, opts: [r`$1 - 2\sin^2\theta$`, r`$2\cos^2\theta - 1$`, r`$\cos^2\theta - \sin^2\theta$`, r`$2\sin^2\theta - 1$`], key: 'd', sol: r`The three forms $1 - 2\sin^2\theta$, $2\cos^2\theta - 1$ and $\cos^2\theta - \sin^2\theta$ all equal $\cos 2\theta$. The expression $2\sin^2\theta - 1$ is $-\cos 2\theta$.`, d: 2, c: 'understanding', t: [2], time: 60 }),
  (C_) => C_.which(same1((x) => C(2 * x), [(x) => 1 - 2 * S(x) ** 2, (x) => 2 * C(x) ** 2 - 1, (x) => C(x) ** 2 - S(x) ** 2, (x) => 2 * S(x) ** 2 - 1]).map((b) => !b), true));
{
  const sT = fr(15, 17), cT = fr(8, 17);
  const v = fr(2).mul(sT).mul(cT);
  Q('m11', mk.mcq({ stem: r`If $\sin\theta = \dfrac{15}{17}$ and $\theta$ is acute, the value of $\sin 2\theta$ is`, opts: [r`$\dfrac{120}{289}$`, r`$\dfrac{240}{289}$`, r`$-\dfrac{161}{289}$`, r`$\dfrac{16}{17}$`], key: 'b', sol: r`$\cos\theta = \dfrac{8}{17}$, so $\sin 2\theta = 2\sin\theta\cos\theta = 2\cdot\dfrac{15}{17}\cdot\dfrac{8}{17} = \dfrac{240}{289}$. Option (a) forgets the factor $2$ and (c) is $\cos 2\theta$.`, d: 2, c: 'application', t: [2], time: 75 }),
    (C_) => { const th = Math.asin(15 / 17); C_.assert(near(S(2 * th), 240 / 289, 1e-12) && near(C(2 * th), -161 / 289, 1e-12), '240/289, -161/289'); C_.which([sT.mul(cT).v, v.v, cT.mul(cT).sub(sT.mul(sT)).v, fr(2).mul(cT).v], 240 / 289); });
}
Q('m12', mk.mcq({ stem: r`When $\tan x = \dfrac{3}{8}$, the value of $\tan 2x$ is`, opts: [r`$\dfrac{48}{55}$`, r`$\dfrac{3}{4}$`, r`$\dfrac{48}{73}$`, r`$\dfrac{55}{48}$`], key: 'a', sol: r`$\tan 2x = \dfrac{2\tan x}{1 - \tan^2 x} = \dfrac{3/4}{1 - 9/64} = \dfrac{3/4}{55/64} = \dfrac{48}{55}$. Option (c) uses $1 + \tan^2 x$, which is the formula for $\sin 2x$.`, d: 2, c: 'application', t: [2], time: 75 }),
  (C_) => { const t = 3 / 8; C_.assert(near(T(2 * Math.atan(t)), 48 / 55, 1e-12) && near(S(2 * Math.atan(t)), 48 / 73, 1e-12), '48/55 and 48/73'); C_.which([48 / 55, 3 / 4, 48 / 73, 55 / 48], T(2 * Math.atan(t))); });
Q('m13', mk.mcq({ stem: r`The acute angle $x$ satisfies $\cos 2x = \dfrac{7}{25}$. Then $\tan x$ equals`, opts: [r`$\dfrac{3}{4}$`, r`$\dfrac{4}{3}$`, r`$\dfrac{9}{16}$`, r`$\dfrac{3}{5}$`], key: 'a', sol: r`Since $\tan^2 x = \dfrac{1 - \cos 2x}{1 + \cos 2x} = \dfrac{18/25}{32/25} = \dfrac{9}{16}$ and $x$ is acute, $\tan x = \dfrac{3}{4}$. The value $\dfrac{9}{16}$ is $\tan^2 x$.`, d: 3, c: 'application', t: [2], time: 90 }),
  (C_) => { const x = Math.acos(7 / 25) / 2; C_.assert(x > 0 && x < PI / 2, 'acute'); C_.which([3 / 4, 4 / 3, 9 / 16, 3 / 5], T(x)); });
Q('m14', mk.mcq({ stem: r`For every real $A$, the cosine of the triple angle, $\cos 3A$, is equal to`, opts: [r`$4\cos^3 A - 3\cos A$`, r`$3\cos A - 4\cos^3 A$`, r`$3\cos A - \cos^3 A$`, r`$4\cos A - 3\cos^3 A$`], key: 'a', sol: r`Writing $3A = 2A + A$ and using the double angle formulae gives $\cos 3A = 4\cos^3 A - 3\cos A$. Option (b) is the formula for $\sin 3A$ with $\sin$ replaced by $\cos$ and is wrong.`, d: 2, c: 'understanding', t: [2], time: 45 }),
  (C_) => C_.which(same1((x) => C(3 * x), [(x) => 4 * C(x) ** 3 - 3 * C(x), (x) => 3 * C(x) - 4 * C(x) ** 3, (x) => 3 * C(x) - C(x) ** 3, (x) => 4 * C(x) - 3 * C(x) ** 3]), true));
Q('m15', mk.mcq({ stem: r`If $\sin x = \dfrac{3}{10}$, then $\sin 3x$ equals`, opts: [r`$0.792$`, r`$0.9$`, r`$1.008$`, r`$-0.792$`], key: 'a', sol: r`$\sin 3x = 3\sin x - 4\sin^3 x = 0.9 - 4(0.027) = 0.9 - 0.108 = 0.792$. Option (b) stops after $3\sin x$ and (d) reverses the order of the two terms.`, d: 2, c: 'application', t: [2], time: 75 }),
  (C_) => { const sx = 0.3; C_.which([3 * sx - 4 * sx ** 3, 3 * sx, 3 * sx + 4 * sx ** 3, 4 * sx ** 3 - 3 * sx], 0.792); C_.assert(near(S(3 * Math.asin(sx)), 0.792, 1e-12), 'direct angle'); });
Q('m16', mk.mcq({ stem: r`In terms of $\cos x$, the half-angle square $\sin^2\dfrac{x}{2}$ equals`, opts: [r`$\dfrac{1 - \cos x}{2}$`, r`$\dfrac{1 + \cos x}{2}$`, r`$\dfrac{1 - \cos x}{1 + \cos x}$`, r`$1 - \cos x$`], key: 'a', sol: r`From $\cos x = 1 - 2\sin^2\dfrac{x}{2}$ we get $\sin^2\dfrac{x}{2} = \dfrac{1 - \cos x}{2}$. Option (b) is $\cos^2\dfrac{x}{2}$ and (c) is $\tan^2\dfrac{x}{2}$.`, d: 1, c: 'recall', t: [2], time: 40 }),
  (C_) => C_.which(same1((x) => S(x / 2) ** 2, [(x) => (1 - C(x)) / 2, (x) => (1 + C(x)) / 2, (x) => (1 - C(x)) / (1 + C(x)), (x) => 1 - C(x)]), true));
Q('m17', mk.mcq({ stem: r`The exact value of $\cos 22.5^\circ$ is`, opts: [r`$\dfrac{\sqrt{2 + \sqrt{2}}}{2}$`, r`$\dfrac{\sqrt{2 - \sqrt{2}}}{2}$`, r`$\dfrac{2 + \sqrt{2}}{4}$`, r`$\dfrac{\sqrt{2}}{2}$`], key: 'a', sol: r`$\cos^2 22.5^\circ = \dfrac{1 + \cos 45^\circ}{2} = \dfrac{2 + \sqrt{2}}{4}$, and the angle is acute, so $\cos 22.5^\circ = \dfrac{\sqrt{2 + \sqrt{2}}}{2}$. Option (c) is the square, and (b) is $\sin 22.5^\circ$.`, d: 3, c: 'application', t: [2], time: 90 }),
  (C_) => C_.which([Math.sqrt(2 + s2) / 2, Math.sqrt(2 - s2) / 2, (2 + s2) / 4, s2 / 2], C(R(22.5))));
Q('m18', mk.mcq({ stem: r`The angle $x$ lies between $90^\circ$ and $180^\circ$ and $\cos x = -\dfrac{7}{25}$. The value of $\sin\dfrac{x}{2}$ is`, opts: [r`$\dfrac{4}{5}$`, r`$\dfrac{3}{5}$`, r`$\dfrac{16}{25}$`, r`$-\dfrac{4}{5}$`], key: 'a', sol: r`$\sin^2\dfrac{x}{2} = \dfrac{1 - (-7/25)}{2} = \dfrac{16}{25}$. Now $45^\circ < \dfrac{x}{2} < 90^\circ$ lies in quadrant I, where sine is positive, so $\sin\dfrac{x}{2} = \dfrac{4}{5}$.`, d: 3, c: 'application', t: [2], time: 90 }),
  (C_) => { const x = Math.acos(-7 / 25); C_.assert(x > PI / 2 && x < PI && x / 2 > PI / 4 && x / 2 < PI / 2, 'half-angle in quadrant I'); C_.which([4 / 5, 3 / 5, 16 / 25, -4 / 5], S(x / 2)); });
Q('m19', mk.mcq({ stem: r`The value of $\sin 75^\circ + \sin 15^\circ$ is`, opts: [r`$\dfrac{\sqrt{6}}{2}$`, r`$\dfrac{\sqrt{3}}{2}$`, r`$\dfrac{\sqrt{2}}{2}$`, r`$1$`], key: 'a', sol: r`$\sin 75^\circ + \sin 15^\circ = 2\sin 45^\circ\cos 30^\circ = 2\cdot\dfrac{\sqrt{2}}{2}\cdot\dfrac{\sqrt{3}}{2} = \dfrac{\sqrt{6}}{2}$.`, d: 3, c: 'application', t: [3], time: 75 }),
  (C_) => { C_.assert(eq(add(sinD(75), sinD(15)), el(0, 0, 0, fr(1, 2))), 'exact: sin 75 + sin 15 = sqrt6/2'); C_.which([s6 / 2, s3 / 2, s2 / 2, 1], S(R(75)) + S(R(15))); });
Q('m20', mk.mcq({ stem: r`The product $2\sin 5\theta\cos 3\theta$ can be written as the sum`, opts: [r`$\sin 8\theta + \sin 2\theta$`, r`$\sin 8\theta - \sin 2\theta$`, r`$\cos 8\theta + \cos 2\theta$`, r`$\dfrac{\sin 8\theta + \sin 2\theta}{2}$`], key: 'a', sol: r`$2\sin A\cos B = \sin(A + B) + \sin(A - B)$ with $A = 5\theta$ and $B = 3\theta$ gives $\sin 8\theta + \sin 2\theta$. The factor $2$ is already inside the formula, so (d) is wrong.`, d: 2, c: 'understanding', t: [4], time: 60 }),
  (C_) => C_.which(same1((x) => 2 * S(5 * x) * C(3 * x), [(x) => S(8 * x) + S(2 * x), (x) => S(8 * x) - S(2 * x), (x) => C(8 * x) + C(2 * x), (x) => (S(8 * x) + S(2 * x)) / 2]), true));
Q('m21', mk.mcq({ stem: r`For every real $x$, the difference $\cos 7x - \cos 3x$ can be written as`, opts: [r`$-2\sin 5x\sin 2x$`, r`$2\sin 5x\sin 2x$`, r`$-2\cos 5x\cos 2x$`, r`$2\cos 5x\cos 2x$`], key: 'a', sol: r`$\cos C - \cos D = -2\sin\dfrac{C + D}{2}\sin\dfrac{C - D}{2}$ with $C = 7x$, $D = 3x$ gives $-2\sin 5x\sin 2x$. Option (b) drops the minus sign.`, d: 2, c: 'understanding', t: [3], time: 60 }),
  (C_) => C_.which(same1((x) => C(7 * x) - C(3 * x), [(x) => -2 * S(5 * x) * S(2 * x), (x) => 2 * S(5 * x) * S(2 * x), (x) => -2 * C(5 * x) * C(2 * x), (x) => 2 * C(5 * x) * C(2 * x)]), true));
Q('m22', mk.mcq({ stem: r`The product $\cos 75^\circ\cos 15^\circ$ has the value`, opts: [r`$\dfrac{1}{4}$`, r`$\dfrac{1}{2}$`, r`$\dfrac{\sqrt{3}}{4}$`, r`$\dfrac{\sqrt{2}}{4}$`], key: 'a', sol: r`$\cos 75^\circ\cos 15^\circ = \dfrac{1}{2}\left[\cos 90^\circ + \cos 60^\circ\right] = \dfrac{1}{2}\cdot\dfrac{1}{2} = \dfrac{1}{4}$. Option (b) forgets the half in the formula.`, d: 3, c: 'application', t: [4], time: 75 }),
  (C_) => { C_.assert(eq(mul(cosD(75), cosD(15)), el(fr(1, 4))), 'exact: cos 75 cos 15 = 1/4'); C_.which([0.25, 0.5, s3 / 4, s2 / 4], C(R(75)) * C(R(15))); });
{
  const tc = -(2 + 3) / (1 - 2 * 3);
  Q('m23', mk.mcq({ stem: r`The angles $A$, $B$, $C$ of a triangle satisfy $\tan A = 2$ and $\tan B = 3$. The value of $\tan C$ is`, opts: [r`$1$`, r`$-1$`, r`$5$`, r`$-5$`], key: 'a', sol: r`$C = 180^\circ - (A + B)$, so $\tan C = -\tan(A + B) = -\dfrac{2 + 3}{1 - 6} = 1$. As a check, $\tan A + \tan B + \tan C = 6 = \tan A\tan B\tan C$.`, d: 3, c: 'analysis', t: [1], time: 90 }),
    (C_) => { const A = Math.atan(2), B = Math.atan(3), Cc = PI - A - B; C_.assert(Cc > 0 && near(T(Cc), 1, 1e-12) && near(2 + 3 + 1, 2 * 3 * 1), 'tan C = 1 and sum = product'); C_.which([1, -1, 5, -5], tc); });
}
{
  const t = 2;
  const s = (2 * t) / (1 + t * t), c = (1 - t * t) / (1 + t * t);
  Q('m24', mk.mcq({ stem: r`If $\tan x = 2$, then $\sin 2x + \cos 2x$ is equal to`, opts: [r`$\dfrac{1}{5}$`, r`$\dfrac{7}{5}$`, r`$-\dfrac{7}{5}$`, r`$-\dfrac{1}{5}$`], key: 'a', sol: r`$\sin 2x = \dfrac{2\tan x}{1 + \tan^2 x} = \dfrac{4}{5}$ and $\cos 2x = \dfrac{1 - \tan^2 x}{1 + \tan^2 x} = -\dfrac{3}{5}$, so the sum is $\dfrac{4}{5} - \dfrac{3}{5} = \dfrac{1}{5}$.`, d: 3, c: 'application', t: [2], time: 75 }),
    (C_) => { const x = Math.atan(2); C_.assert(near(S(2 * x) + C(2 * x), 0.2, 1e-12), 'direct'); C_.which([s + c, s - c, -(s - c), -(s + c)], 1 / 5); });
}
{
  const f = (x) => 6 * S(x) * C(x) + 4 * C(2 * x);
  const xs = Array.from({ length: 20001 }, (_, k) => (k * PI) / 10000);
  const mx = Math.max(...xs.map(f));
  const xStar = Math.atan2(3, 4) / 2;
  Q('m25', mk.mcq({ stem: r`As $x$ takes all real values, the greatest value of $6\sin x\cos x + 4\cos 2x$ is`, opts: [r`$5$`, r`$10$`, r`$7$`, r`$2.5$`], key: 'a', sol: r`$6\sin x\cos x = 3\sin 2x$, so the expression is $3\sin 2x + 4\cos 2x$. For $a\sin\theta + b\cos\theta$ the greatest value is $\sqrt{a^2 + b^2} = \sqrt{9 + 16} = 5$.`, d: 4, c: 'analysis', t: [2], time: 120 }),
    (C_) => { C_.assert(near(f(xStar), 5, 1e-12) && mx <= 5 + 1e-9 && mx > 5 - 1e-6, 'max 5 at tan 2x = 3/4'); C_.which([5, 6 + 4, 7, 2.5], f(xStar)); });
}

// =============================================================== assertion-reason
Q('ar1', mk.ar({ a: r`The cosine of a double angle can be written with the sine alone, namely $\cos 2x = 1 - 2\sin^2 x$ for every real $x$.`, r: r`The identity $\cos 2x = \cos^2 x - \sin^2 x$ holds for every $x$, and $\cos^2 x$ may be replaced by $1 - \sin^2 x$.`, key: 'a', sol: r`R is true, and substituting $\cos^2 x = 1 - \sin^2 x$ into $\cos^2 x - \sin^2 x$ gives $1 - 2\sin^2 x$. So A is true and R explains it.`, d: 2, c: 'understanding', t: [2] }),
  (C_) => { C_.assert(PTS1.every((x) => near(C(2 * x), 1 - 2 * S(x) ** 2) && near(C(2 * x), C(x) ** 2 - S(x) ** 2) && near(C(x) ** 2, 1 - S(x) ** 2)), 'A and R hold'); C_.key('a'); });
Q('ar2', mk.ar({ a: r`$\tan 15^\circ = 2 - \sqrt{3}$.`, r: r`$\tan 15^\circ\tan 75^\circ = 1$.`, key: 'b', sol: r`Both statements are true: $\tan 15^\circ = \tan(60^\circ - 45^\circ) = 2 - \sqrt{3}$, and $\tan 75^\circ = \dfrac{1}{\tan 15^\circ}$. But R does not give the value in A: it only relates $\tan 15^\circ$ to $\tan 75^\circ$, and A needs the subtraction formula.`, d: 3, c: 'analysis', t: [1] }),
  (C_) => { C_.assert(eq(tanD(15), el(2, 0, -1)) && near(T(R(15)) * T(R(75)), 1, 1e-12), 'both true'); C_.key('b'); });
Q('ar3', mk.ar({ a: r`Subtracting the cosine of an angle from one gives twice the square of the sine of half that angle: $1 - \cos x = 2\sin^2\dfrac{x}{2}$.`, r: r`The half-angle square of the sine satisfies $\sin^2\dfrac{x}{2} = \dfrac{1 + \cos x}{2}$ for every real $x$.`, key: 'c', sol: r`A is true: it is the formula $\cos x = 1 - 2\sin^2\dfrac{x}{2}$ rearranged. R is false, because $\dfrac{1 + \cos x}{2}$ equals $\cos^2\dfrac{x}{2}$; at $x = 0$ the right side is $1$ but $\sin^2 0 = 0$.`, d: 2, c: 'understanding', t: [2] }),
  (C_) => { C_.assert(PTS1.every((x) => near(1 - C(x), 2 * S(x / 2) ** 2)) && !near(S(0) ** 2, (1 + C(0)) / 2), 'A true, R false at 0'); C_.key('c'); });
Q('ar4', mk.ar({ a: r`The formula $\tan(A + B) = \dfrac{\tan A + \tan B}{1 - \tan A\tan B}$ can be used to evaluate $\tan 90^\circ$ as $\tan(45^\circ + 45^\circ)$.`, r: r`The tangent addition formula holds only when $1 - \tan A\tan B \ne 0$ and the angles involved are not odd multiples of $90^\circ$.`, key: 'd', sol: r`R is true. For $A = B = 45^\circ$ we have $1 - \tan A\tan B = 1 - 1 = 0$, so the formula gives $\dfrac{2}{0}$, which is not a value; $\tan 90^\circ$ is undefined. So A is false.`, d: 3, c: 'analysis', t: [1] }),
  (C_) => { C_.assert(near(1 - T(R(45)) * T(R(45)), 0, 1e-12) && Math.abs(C(R(90))) < 1e-15, 'denominator zero, cos 90 = 0'); C_.key('d'); });
Q('ar5', mk.ar({ a: r`$\cos 100^\circ + \cos 20^\circ = \cos 40^\circ$.`, r: r`$\cos C + \cos D = 2\cos\dfrac{C + D}{2}\cos\dfrac{C - D}{2}$.`, key: 'a', sol: r`With $C = 100^\circ$, $D = 20^\circ$: $\cos 100^\circ + \cos 20^\circ = 2\cos 60^\circ\cos 40^\circ = \cos 40^\circ$. So A is true and R is the formula that proves it.`, d: 3, c: 'application', t: [3] }),
  (C_) => { C_.assert(near(C(R(100)) + C(R(20)), C(R(40)), 1e-12) && PTS2.every(([x, y]) => near(C(x) + C(y), 2 * C((x + y) / 2) * C((x - y) / 2))), 'A and R hold'); C_.key('a'); });
Q('ar6', mk.ar({ a: r`For all angles $A$ and $B$, $\cos(A - B) - \cos(A + B) = 2\sin A\sin B$.`, r: r`For all angles $A$ and $B$, $\cos(A - B) - \cos(A + B) = -2\sin A\sin B$.`, key: 'c', sol: r`Expanding, $\cos(A - B) - \cos(A + B) = (\cos A\cos B + \sin A\sin B) - (\cos A\cos B - \sin A\sin B) = 2\sin A\sin B$. So A is true and R, with the extra minus sign, is false (try $A = B = 90^\circ$).`, d: 3, c: 'analysis', t: [4] }),
  (C_) => { C_.assert(PTS2.every(([x, y]) => near(C(x - y) - C(x + y), 2 * S(x) * S(y))) && !near(C(0) - C(PI), -2 * S(PI / 2) * S(PI / 2)), 'A true, R false at 90 degrees'); C_.key('c'); });

// =============================================================== true-false
Q('tf1', mk.tf({ stem: r`For all angles $A$ and $B$, $\sin(A + B) = \sin A + \sin B$.`, key: 'f', sol: r`One counter-example is enough: $A = B = 45^\circ$ gives $\sin 90^\circ = 1$, but $\sin 45^\circ + \sin 45^\circ = \sqrt{2} \approx 1.414$.`, d: 1, c: 'understanding', t: [1] }),
  (C_) => { C_.assert(near(S(PI / 2), 1) && near(2 * S(PI / 4), s2) && !near(S(PI / 2), 2 * S(PI / 4)), 'counter-example'); C_.key('f'); });
Q('tf2', mk.tf({ stem: r`In every triangle $ABC$ with no right angle, $\tan A + \tan B + \tan C = \tan A\tan B\tan C$.`, key: 't', sol: r`Since $A + B + C = 180^\circ$, $\tan(A + B) = -\tan C$. Using the addition formula and clearing the denominator gives $\tan A + \tan B = -\tan C + \tan A\tan B\tan C$, which is the stated relation.`, d: 3, c: 'understanding', t: [1] }),
  (C_) => { const tri = [[0.5, 0.9], [1.0, 1.3], [0.3, 2.0], [0.7, 0.6], [1.2, 0.4]]; C_.assert(tri.every(([a, b]) => { const c = PI - a - b; return Math.abs(C(a)) > 1e-3 && Math.abs(C(b)) > 1e-3 && Math.abs(C(c)) > 1e-3 && near(T(a) + T(b) + T(c), T(a) * T(b) * T(c), 1e-9); }), 'five triangles'); C_.key('t'); });
Q('tf3', mk.tf({ stem: r`At $x = 30^\circ$ the expression $3\sin x - 4\sin^3 x$ has the value $1$.`, key: 't', sol: r`$3\sin 30^\circ - 4\sin^3 30^\circ = \dfrac{3}{2} - \dfrac{4}{8} = 1$, which is $\sin 90^\circ$, as the triple angle formula says.`, d: 2, c: 'application', t: [2] }),
  (C_) => { C_.assert(near(3 * S(R(30)) - 4 * S(R(30)) ** 3, 1, 1e-12) && near(S(R(90)), 1), 'value 1'); C_.key('t'); });
Q('tf4', mk.tf({ stem: r`The three roots of $8c^3 - 6c - 1 = 0$ add up to zero.`, key: 't', sol: r`The cubic has no $c^2$ term, so the sum of its roots is $-\dfrac{0}{8} = 0$. Numerically the roots are $\cos 20^\circ \approx 0.9397$, $\cos 140^\circ \approx -0.7660$ and $\cos 260^\circ \approx -0.1736$, with sum $0$.`, d: 3, c: 'analysis', t: [2] }),
  (C_) => { const rs = [20, 140, 260].map((d) => C(R(d))); C_.assert(rs.every((c) => Math.abs(8 * c ** 3 - 6 * c - 1) < 1e-12) && near(rs[0] + rs[1] + rs[2], 0, 1e-12), 'roots sum to 0'); C_.key('t'); });
Q('tf5', mk.tf({ stem: r`For every angle $x$ between $90^\circ$ and $180^\circ$, the value of $\cos\dfrac{x}{2}$ is negative.`, key: 'f', sol: r`If $90^\circ < x < 180^\circ$, then $45^\circ < \dfrac{x}{2} < 90^\circ$, which is in quadrant I, where cosine is positive. For instance $\cos 60^\circ = \dfrac{1}{2} > 0$ for $x = 120^\circ$.`, d: 2, c: 'understanding', t: [2] }),
  (C_) => { C_.assert([95, 120, 150, 179].every((d) => C(R(d / 2)) > 0) && near(C(R(60)), 0.5, 1e-12), 'cosine of the half angle positive'); C_.key('f'); });
Q('tf6', mk.tf({ stem: r`For all angles $C$ and $D$, $\cos C - \cos D = 2\sin\dfrac{C + D}{2}\sin\dfrac{C - D}{2}$.`, key: 'f', sol: r`The correct result has a minus sign: $\cos C - \cos D = -2\sin\dfrac{C + D}{2}\sin\dfrac{C - D}{2}$. Test $C = 90^\circ$ and $D = 0^\circ$: the left side is $0 - 1 = -1$, while the stated right side is $2\sin 45^\circ\sin 45^\circ = +1$.`, d: 2, c: 'understanding', t: [3] }),
  (C_) => { C_.assert(near(C(PI / 2) - C(0), -1) && near(2 * S(PI / 4) * S(PI / 4), 1) && PTS2.every(([x, y]) => near(C(x) - C(y), -2 * S((x + y) / 2) * S((x - y) / 2))), 'sign is minus'); C_.key('f'); });
Q('tf7', mk.tf({ stem: r`For all angles $A$ and $B$, $2\sin A\cos B = \sin(A + B) + \sin(A - B)$.`, key: 't', sol: r`Adding $\sin(A + B) = \sin A\cos B + \cos A\sin B$ and $\sin(A - B) = \sin A\cos B - \cos A\sin B$ leaves $2\sin A\cos B$.`, d: 1, c: 'understanding', t: [4] }),
  (C_) => { C_.assert(PTS2.every(([x, y]) => near(2 * S(x) * C(y), S(x + y) + S(x - y))), 'identity'); C_.key('t'); });

// =============================================================== fill in the blank
Q('fb1', mk.fill({ stem: r`The value of $\sin 75^\circ\cos 15^\circ + \cos 75^\circ\sin 15^\circ$ is ____.`, acc: [['1']], sol: r`The expression is $\sin(75^\circ + 15^\circ) = \sin 90^\circ = 1$.`, d: 1, c: 'understanding', t: [1] }),
  (C_) => C_.blank(S(R(75)) * C(R(15)) + C(R(75)) * S(R(15))));
Q('fb2', mk.fill({ stem: r`If $\cos x = 0.8$, then $\cos 2x =$ ____.`, acc: [['0.28']], sol: r`$\cos 2x = 2\cos^2 x - 1 = 2(0.64) - 1 = 0.28$.`, d: 2, c: 'application', t: [2] }),
  (C_) => C_.blank(Math.round((2 * 0.8 * 0.8 - 1) * 1e6) / 1e6));
Q('fb3', mk.fill({ stem: r`If $\cos x = 0.46$, then $\cos^2\dfrac{x}{2} =$ ____.`, acc: [['0.73']], sol: r`$\cos^2\dfrac{x}{2} = \dfrac{1 + \cos x}{2} = \dfrac{1.46}{2} = 0.73$.`, d: 2, c: 'application', t: [2] }),
  (C_) => C_.blank(Math.round(((1 + 0.46) / 2) * 1e6) / 1e6));
Q('fb4', mk.fill({ stem: r`Written as a product, $\sin 9x + \sin 5x = 2\sin kx\cos 2x$. The value of $k$ is ____.`, acc: [['7']], sol: r`The half-sum is $\dfrac{9x + 5x}{2} = 7x$ and the half-difference is $\dfrac{9x - 5x}{2} = 2x$, so the number is $7$.`, d: 2, c: 'application', t: [3] }),
  (C_) => { C_.assert(PTS1.every((x) => near(S(9 * x) + S(5 * x), 2 * S(7 * x) * C(2 * x))), 'sin 9x + sin 5x = 2 sin 7x cos 2x'); C_.blank((9 + 5) / 2); });
Q('fb5', mk.fill({ stem: r`The product $2\sin 7x\sin 3x$ equals $\cos 4x - \cos kx$. The value of $k$ is ____.`, acc: [['10']], sol: r`$2\sin A\sin B = \cos(A - B) - \cos(A + B)$ with $A = 7x$, $B = 3x$ gives $\cos 4x - \cos 10x$, so $k = 10$.`, d: 2, c: 'application', t: [4] }),
  (C_) => { C_.assert(PTS1.every((x) => near(2 * S(7 * x) * S(3 * x), C(4 * x) - C(10 * x))), 'identity'); C_.blank(7 + 3); });
Q('fb6', mk.fill({ stem: r`The difference $\sin 80^\circ - \sin 20^\circ$ equals $\cos\theta$ for the acute angle $\theta = $ ____ degrees.`, acc: [['50']], sol: r`$\sin 80^\circ - \sin 20^\circ = 2\cos 50^\circ\sin 30^\circ = \cos 50^\circ$, so $\theta = 50$.`, d: 3, c: 'application', t: [3] }),
  (C_) => { C_.assert(near(S(R(80)) - S(R(20)), C(R(50)), 1e-12), 'value'); C_.blank((80 + 20) / 2); });
Q('fb7', mk.fill({ stem: r`The angles of a triangle have $\tan A + \tan B + \tan C = 12$, and none is a right angle. Then $\tan A\tan B\tan C =$ ____.`, acc: [['12']], sol: r`For $A + B + C = 180^\circ$ the sum of the tangents equals their product, so the product is $12$.`, d: 2, c: 'understanding', t: [1] }),
  (C_) => C_.blank(12));

// =============================================================== numerical
{
  const t = 1 / 3, v = (2 * t) / (1 - t * t);
  Q('n01', mk.num({ stem: r`If $\tan x = \dfrac{1}{3}$, find $\tan 2x$ as a decimal.`, value: 0.75, sol: r`$\tan 2x = \dfrac{2\tan x}{1 - \tan^2 x} = \dfrac{2/3}{1 - 1/9} = \dfrac{2/3}{8/9} = \dfrac{3}{4} = 0.75$.`, scheme: [['Formula with $\\tan x = \\dfrac{1}{3}$', 0.5], ['0.75', 0.5]], d: 2, c: 'application', t: [2], time: 60 }),
    (C_) => { C_.assert(near(T(2 * Math.atan(t)), 0.75, 1e-12), 'direct'); C_.val(Math.round(v * 1e6) / 1e6); });
}
{
  const v = 8 * S(R(10)) * C(R(10)) * C(R(20)) * C(R(40));
  Q('n02', mk.num({ stem: r`Find the value of $8\sin 10^\circ\cos 10^\circ\cos 20^\circ\cos 40^\circ$, correct to four decimal places.`, value: 0.9848, tol: 0.00006, sol: r`$8\sin 10^\circ\cos 10^\circ\cos 20^\circ\cos 40^\circ = 4\sin 20^\circ\cos 20^\circ\cos 40^\circ = 2\sin 40^\circ\cos 40^\circ = \sin 80^\circ \approx 0.9848$.`, scheme: [['Repeated use of $2\\sin x\\cos x = \\sin 2x$', 0.5], ['0.9848', 0.5]], d: 3, c: 'application', t: [2], time: 90 }),
    (C_) => { C_.assert(near(v, S(R(80)), 1e-12), 'equals sin 80'); C_.val(v, 0.00006); });
}
Q('n03', mk.num({ stem: r`Find the value of $36\sin 15^\circ\cos 15^\circ$.`, value: 9, sol: r`$36\sin 15^\circ\cos 15^\circ = 18\sin 30^\circ = 18 \times \dfrac{1}{2} = 9$.`, scheme: [['Double angle formula used', 0.5], ['9', 0.5]], d: 2, c: 'application', t: [2], time: 60 }),
  (C_) => C_.val(Math.round(36 * S(R(15)) * C(R(15)) * 1e9) / 1e9));
{
  const v = 4 * 0.6 ** 3 - 3 * 0.6;
  Q('n04', mk.num({ stem: r`If $\cos x = 0.6$, find the value of $\cos 3x$.`, value: -0.936, sol: r`$\cos 3x = 4\cos^3 x - 3\cos x = 4(0.216) - 1.8 = 0.864 - 1.8 = -0.936$.`, scheme: [['Triple angle formula', 0.5], ['-0.936', 0.5]], d: 2, c: 'application', t: [2], time: 75 }),
    (C_) => { C_.assert(near(C(3 * Math.acos(0.6)), -0.936, 1e-12), 'direct'); C_.val(Math.round(v * 1e6) / 1e6); });
}
{
  const v = (1 - 0.3) / 2;
  Q('n05', mk.num({ stem: r`Given $\cos x = 0.3$, find $\sin^2\dfrac{x}{2}$.`, value: 0.35, sol: r`$\sin^2\dfrac{x}{2} = \dfrac{1 - \cos x}{2} = \dfrac{1 - 0.3}{2} = 0.35$.`, scheme: [['Half-angle formula', 0.5], ['0.35', 0.5]], d: 1, c: 'understanding', t: [2], time: 45 }),
    (C_) => { C_.assert(near(S(Math.acos(0.3) / 2) ** 2, 0.35, 1e-12), 'direct'); C_.val(Math.round(v * 1e6) / 1e6); });
}
{
  const a = 1 / 4, b = 2 / 3, v = (a + b) / (1 - a * b);
  Q('n06', mk.num({ stem: r`The angles $A$ and $B$ have $\tan A = \dfrac{1}{4}$ and $\tan B = \dfrac{2}{3}$. Find $\tan(A + B)$ as a decimal.`, value: 1.1, sol: r`$\tan(A + B) = \dfrac{\frac{1}{4} + \frac{2}{3}}{1 - \frac{1}{4}\cdot\frac{2}{3}} = \dfrac{11/12}{5/6} = \dfrac{11}{10} = 1.1$.`, scheme: [['Tangent formula substituted', 0.5], ['1.1', 0.5]], d: 2, c: 'application', t: [1], time: 75 }),
    (C_) => { C_.assert(near(T(Math.atan(a) + Math.atan(b)), 1.1, 1e-12), 'direct'); C_.val(Math.round(v * 1e6) / 1e6); });
}
{
  const v = 2 * S(R(75)) * C(R(15));
  Q('n07', mk.num({ stem: r`Evaluate $2\sin 75^\circ\cos 15^\circ$, correct to three decimal places.`, value: 1.866, tol: 0.0006, sol: r`$2\sin 75^\circ\cos 15^\circ = \sin 90^\circ + \sin 60^\circ = 1 + \dfrac{\sqrt{3}}{2} \approx 1.866$.`, scheme: [['Product to sum', 0.5], ['1.866', 0.5]], d: 2, c: 'application', t: [4], time: 75 }),
    (C_) => { C_.assert(near(v, 1 + s3 / 2, 1e-12), 'exact value'); C_.val(v, 0.0006); });
}

// =============================================================== extra recall / understanding items
Q('m26', mk.mcq({ stem: r`Which formula gives the cotangent of a sum of two angles?`, opts: [r`$\cot(A + B) = \dfrac{\cot A\cot B - 1}{\cot B + \cot A}$`, r`$\cot(A + B) = \dfrac{\cot A\cot B + 1}{\cot B - \cot A}$`, r`$\cot(A + B) = \dfrac{\cot A + \cot B}{1 - \cot A\cot B}$`, r`$\cot(A + B) = \cot A + \cot B$`], key: 'a', sol: r`Invert $\tan(A + B)$ and divide top and bottom by $\sin A\sin B$ to get $\dfrac{\cot A\cot B - 1}{\cot B + \cot A}$. Option (b) is the formula for $\cot(A - B)$.`, d: 1, c: 'recall', t: [1], time: 45 }),
  (C_) => C_.which(same2((x, y) => C(x + y) / S(x + y), [(x, y) => ((C(x) / S(x)) * (C(y) / S(y)) - 1) / (C(y) / S(y) + C(x) / S(x)), (x, y) => ((C(x) / S(x)) * (C(y) / S(y)) + 1) / (C(y) / S(y) - C(x) / S(x)), (x, y) => (C(x) / S(x) + C(y) / S(y)) / (1 - (C(x) / S(x)) * (C(y) / S(y))), (x, y) => C(x) / S(x) + C(y) / S(y)]), true));
Q('m27', mk.mcq({ stem: r`The product $2\cos A\cos B$ is equal to`, opts: [r`$\cos(A + B) + \cos(A - B)$`, r`$\cos(A + B) - \cos(A - B)$`, r`$\sin(A + B) + \sin(A - B)$`, r`$\cos(A - B) - \cos(A + B)$`], key: 'a', sol: r`Adding $\cos(A + B) = \cos A\cos B - \sin A\sin B$ and $\cos(A - B) = \cos A\cos B + \sin A\sin B$ leaves $2\cos A\cos B$. Option (d) equals $2\sin A\sin B$.`, d: 1, c: 'recall', t: [4], time: 40 }),
  (C_) => C_.which(same2((x, y) => 2 * C(x) * C(y), [(x, y) => C(x + y) + C(x - y), (x, y) => C(x + y) - C(x - y), (x, y) => S(x + y) + S(x - y), (x, y) => C(x - y) - C(x + y)]), true));
Q('m28', mk.mcq({ stem: r`The tangent of a triple angle, $\tan 3x$, is given by`, opts: [r`$\dfrac{3\tan x - \tan^3 x}{1 - 3\tan^2 x}$`, r`$\dfrac{3\tan x + \tan^3 x}{1 + 3\tan^2 x}$`, r`$\dfrac{3\tan x - \tan^3 x}{1 + 3\tan^2 x}$`, r`$3\tan x - 4\tan^3 x$`], key: 'a', sol: r`Writing $3x = 2x + x$ and using $\tan 2x = \dfrac{2\tan x}{1 - \tan^2 x}$ gives $\dfrac{3\tan x - \tan^3 x}{1 - 3\tan^2 x}$. The others change a sign or copy the sine formula.`, d: 1, c: 'recall', t: [2], time: 45 }),
  (C_) => C_.which(same1((x) => T(3 * x), [(x) => (3 * T(x) - T(x) ** 3) / (1 - 3 * T(x) ** 2), (x) => (3 * T(x) + T(x) ** 3) / (1 + 3 * T(x) ** 2), (x) => (3 * T(x) - T(x) ** 3) / (1 + 3 * T(x) ** 2), (x) => 3 * T(x) - 4 * T(x) ** 3]), true));
Q('m29', mk.mcq({ stem: r`A formula for $\tan\dfrac{x}{2}$ that needs no square root is`, opts: [r`$\dfrac{\sin x}{1 + \cos x}$`, r`$\dfrac{\sin x}{1 - \cos x}$`, r`$\dfrac{1 + \cos x}{\sin x}$`, r`$\dfrac{\cos x}{1 + \sin x}$`], key: 'a', sol: r`$\tan\dfrac{x}{2} = \dfrac{\sin x}{1 + \cos x} = \dfrac{1 - \cos x}{\sin x}$. Options (b) and (c) are the reciprocal, $\cot\dfrac{x}{2}$.`, d: 1, c: 'recall', t: [2], time: 45 }),
  (C_) => C_.which(same1((x) => T(x / 2), [(x) => S(x) / (1 + C(x)), (x) => S(x) / (1 - C(x)), (x) => (1 + C(x)) / S(x), (x) => C(x) / (1 + S(x))]), true));
Q('tf8', mk.tf({ stem: r`The identity $\cos 2x = 2\cos x$ holds for every real $x$.`, key: 'f', sol: r`At $x = 0$ the left side is $\cos 0 = 1$ but the right side is $2\cos 0 = 2$. Doubling the angle does not double the cosine; the correct forms are $2\cos^2 x - 1$ and its relatives.`, d: 1, c: 'understanding', t: [2] }),
  (C_) => { C_.assert(near(C(0), 1) && near(2 * C(0), 2), 'counter-example at 0'); C_.key('f'); });
