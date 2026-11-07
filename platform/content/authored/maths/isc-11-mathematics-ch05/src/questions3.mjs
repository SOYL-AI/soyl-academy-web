// ISC 11 Mathematics ch05 Complex Numbers: recall and understanding items (definitions, direct rules, true-false and fill-blank).
import { Q, mk } from './lib.mjs';
import { C, I, cadd, cmul, cconj, cinv, cmod2, ceq, cnum, cargDeg, near, wnum, WW, WW2, W1, weq, wadd, wmul } from './cx.mjs';

const r = String.raw;
const cn = cnum;

Q('m26', mk.mcq({ stem: r`For the complex number $z = 4 - 7i$, the real part and the imaginary part are respectively`, opts: [r`$4$ and $-7$`, r`$4$ and $-7i$`, r`$-7$ and $4$`, r`$4$ and $7$`], key: 'a', sol: r`In $z = a + ib$ the real part is $a$ and the imaginary part is the real number $b$, without the factor $i$. Here $a = 4$ and $b = -7$.`, d: 1, c: 'recall', t: [1], time: 30 }),
  (C_) => { const z = C(4, -7); C_.which([[4, -7], [4, -7.5], [-7, 4], [4, 7]].map(([a, b]) => a === Number(z.re.n) && b === Number(z.im.n)), true); });
Q('m27', mk.mcq({ stem: r`For $z = a + ib$ with real $a$ and $b$, the square of the modulus, $|z|^2$, is equal to`, opts: [r`$a^2 + b^2$`, r`$a^2 - b^2$`, r`$(a + b)^2$`, r`$a + b$`], key: 'a', sol: r`The modulus is the distance from the origin to $(a, b)$, so $|z| = \sqrt{a^2 + b^2}$ and $|z|^2 = a^2 + b^2$; this is also $z\bar z$.`, d: 1, c: 'recall', t: [2], time: 30 }),
  (C_) => { const Z = [C(3, 4), C(-5, 2), C(0, 6), C(7, -1)]; const ok = (f) => Z.every((z) => { const a = Number(z.re.n), b = Number(z.im.n); return near(f(a, b), Math.hypot(a, b) ** 2, 1e-9); }); C_.which([ok((a, b) => a * a + b * b), ok((a, b) => a * a - b * b), ok((a, b) => (a + b) ** 2), ok((a, b) => a + b)], true); });
Q('m28', mk.mcq({ stem: r`The point representing the number $4i$ on the Argand plane lies`, opts: [r`on the imaginary axis`, r`on the real axis`, r`in quadrant I but off the axes`, r`at the origin`], key: 'a', sol: r`$4i = 0 + 4i$ has real part $0$ and imaginary part $4$, so it is the point $(0, 4)$ on the vertical axis, which is the imaginary axis.`, d: 1, c: 'recall', t: [3], time: 30 }),
  (C_) => { const z = C(0, 4); C_.which([z.re.n === 0n && z.im.n !== 0n, z.im.n === 0n, z.re.n !== 0n && z.im.n !== 0n && z.re.n > 0n, z.re.n === 0n && z.im.n === 0n], true); });
Q('m29', mk.mcq({ stem: r`The three cube roots of unity are`, opts: [r`$1$, $\dfrac{-1 + i\sqrt{3}}{2}$, $\dfrac{-1 - i\sqrt{3}}{2}$`, r`$1$, $\dfrac{1 + i\sqrt{3}}{2}$, $\dfrac{1 - i\sqrt{3}}{2}$`, r`$1$, $-1$, $i$`, r`$1$, $\dfrac{-1 + i}{2}$, $\dfrac{-1 - i}{2}$`], key: 'a', sol: r`Solving $x^3 - 1 = (x - 1)(x^2 + x + 1) = 0$ gives $x = 1$ and $x = \dfrac{-1 \pm i\sqrt{3}}{2}$. Their sum is $0$, as option (a) shows.`, d: 1, c: 'recall', t: [5], time: 45 }),
  (C_) => { const cube = (p) => { const [a, b] = p; const sq = [a * a - b * b, 2 * a * b]; return [sq[0] * a - sq[1] * b, sq[0] * b + sq[1] * a]; }; const all = (pts) => pts.every((p) => near(cube(p)[0], 1, 1e-9) && near(cube(p)[1], 0, 1e-9)); const s3 = Math.sqrt(3);
    C_.which([all([[1, 0], [-0.5, s3 / 2], [-0.5, -s3 / 2]]), all([[1, 0], [0.5, s3 / 2], [0.5, -s3 / 2]]), all([[1, 0], [-1, 0], [0, 1]]), all([[1, 0], [-0.5, 0.5], [-0.5, -0.5]])], true); });

Q('tf9', mk.tf({ stem: r`On the Argand plane, the sum $z_1 + z_2$ is the fourth vertex of the parallelogram whose other three vertices are $O$, $z_1$ and $z_2$.`, key: 't', sol: r`Adding complex numbers adds their real parts and imaginary parts, which is exactly vector addition and the parallelogram rule, as long as $O$, $z_1$ and $z_2$ are not collinear.`, d: 1, c: 'understanding', t: [3] }),
  (C_) => { const z1 = C(-2, 3), z2 = C(5, 1), s = cadd(z1, z2); const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; C_.assert(near(mid([0, 0], cn(s))[0], mid(cn(z1), cn(z2))[0]) && near(mid([0, 0], cn(s))[1], mid(cn(z1), cn(z2))[1]), 'diagonals bisect each other'); C_.key('t'); });
Q('tf10', mk.tf({ stem: r`The reciprocal of a non-zero purely imaginary number is again purely imaginary.`, key: 't', sol: r`For $z = bi$ with $b \ne 0$, $\dfrac{1}{bi} = \dfrac{-i}{b}$, whose real part is $0$.`, d: 2, c: 'understanding', t: [1] }),
  (C_) => { C_.assert([-5, -2, 1, 3, 8].every((b) => { const q = cinv(C(0, b)); return q.re.n === 0n && q.im.n !== 0n; }), 'purely imaginary'); C_.key('t'); });
Q('tf11', mk.tf({ stem: r`The reciprocal $\dfrac{1}{i}$ is equal to $i$.`, key: 'f', sol: r`$\dfrac{1}{i} = \dfrac{i}{i^2} = -i$. If it were $i$ we would have $i^2 = 1$, but $i^2 = -1$.`, d: 1, c: 'understanding', t: [1] }),
  (C_) => { C_.assert(ceq(cinv(I), C(0, -1)) && !ceq(cinv(I), I), '1/i = -i'); C_.key('f'); });
Q('tf12', mk.tf({ stem: r`For all complex numbers $z_1$ and $z_2$, the equation $|z_1 + z_2| = |z_1| + |z_2|$ holds.`, key: 'f', sol: r`Take $z_1 = 3$ and $z_2 = -3$: the left side is $0$ and the right side is $6$. In general $|z_1 + z_2| \le |z_1| + |z_2|$, with equality only when the two numbers point the same way.`, d: 1, c: 'understanding', t: [2] }),
  (C_) => { C_.assert(Math.abs(3 + -3) === 0 && Math.abs(3) + Math.abs(-3) === 6, 'counter-example'); C_.key('f'); });

Q('fb7', mk.fill({ stem: r`In the complex number $9 - 4i$, the imaginary part, which is a real number, equals ____.`, acc: [['-4']], sol: r`Writing $9 - 4i = 9 + (-4)i$, the imaginary part is the coefficient of $i$, namely $-4$.`, d: 1, c: 'recall', t: [1] }),
  (C_) => C_.blank(Number(C(9, -4).im.n)));
Q('fb8', mk.fill({ stem: r`For $z = -2 + 5i$, the sum $z + \bar z$ equals ____.`, acc: [['-4']], sol: r`$z + \bar z = (-2 + 5i) + (-2 - 5i) = -4$, which is twice the real part.`, d: 1, c: 'understanding', t: [2] }),
  (C_) => { const z = C(-2, 5), s = cadd(z, cconj(z)); C_.assert(s.im.n === 0n, 'real'); C_.blank(Number(s.re.n)); });
Q('fb9', mk.fill({ stem: r`The point $6i$ lies on the positive imaginary axis, so its principal argument is ____ degrees.`, acc: [['90']], sol: r`The positive imaginary axis is a quarter turn anticlockwise from the positive real axis, so the principal argument is $90^\circ$.`, d: 1, c: 'recall', t: [3] }),
  (C_) => C_.blank(cargDeg(C(0, 6))));
