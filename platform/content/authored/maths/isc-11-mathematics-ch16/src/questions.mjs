// ISC 11 Mathematics ch16 Limits - multiple-choice and assertion-reason items.
// Every key is recomputed from the givens (exact rationals for rational functions, two-sided numeric approach at a - h and a + h);
// every distractor comes from its own wrong method and is asserted to differ from the key.
import { Q, mk } from './lib.mjs';
import { F, P, ratLim, ratInf, near, noLimit, nearInf, T, limTex, dec } from './lim.mjs';

const r = String.raw;
const LIM = (a, body) => `$${limTex(a, body)}$`;
const fq = (a, b) => T(F(a, b).tex());
/** MCQ whose options are typed values (numbers or strings); the key is the single option equal to the re-solved target. */
function MQ(id, o, assertFn) {
  const { vals, target, txt, ...rest } = o;
  const eq = (v) => (typeof v === 'string' ? v === target : Math.abs(v - target) < 1e-9);
  const hits = vals.map((v, i) => (eq(v) ? i : -1)).filter((i) => i >= 0);
  if (hits.length !== 1) throw new Error(`${id}: options do not single out the target`);
  Q(id, mk.mcq({ key: 'abcd'[hits[0]], opts: txt ?? vals.map((v) => T(String(v))), ...rest }), (C) => { assertFn(C); C.which(vals, target); });
}

// ============================================================ MCQ
{
  const g = (x) => (x * x - 2 * x - 15) / (x - 5);
  const listed = [[4.9, 7.9], [4.99, 7.99], [4.999, 7.999], [5.001, 8.001], [5.01, 8.01]];
  MQ('m01', { stem: r`The table lists values of $f(x) = \dfrac{x^2 - 2x - 15}{x - 5}$ near $x = 5$: $f(4.9) = 7.9$, $f(4.99) = 7.99$, $f(4.999) = 7.999$, $f(5.001) = 8.001$ and $f(5.01) = 8.01$. The limit of $f(x)$ as $x \to 5$ is`, vals: [8, 7.9, 5, 'does not exist'], target: 8, txt: ['$8$', '$7.9$', '$5$', 'The limit does not exist'], sol: r`The values from both sides close in on $8$, so $\lim_{x \to 5} f(x) = 8$. The option $7.9$ is only the first value tabulated on the left; $5$ is the point approached, not the limit; and "The limit does not exist" is wrong because $f(5)$ being undefined does not stop the limit from existing.`, d: 1, c: 'understanding', t: [1], time: 60 }, (C) => {
    C.assert(listed.every(([x, v]) => Math.abs(g(x) - v) < 1e-9) && near(g, 5, 8) && ratLim(P(1, -2, -15), P(1, -5), 5).eq(8), 'every tabulated value matches f(x) = x + 3; both sides close in on 8; exact cancellation gives 8');
  });
}
{
  const g = (x) => (x < -1 ? 3 * x * x - 2 : 6 + x);
  MQ('m02', { stem: r`Let $f(x) = 3x^2 - 2$ for $x < -1$ and $f(x) = 6 + x$ for $x \ge -1$. The value of $\displaystyle\lim_{x \to -1^{-}} f(x)$ is`, vals: [1, 5, -5, 7], target: 1, sol: r`For $x < -1$ use $3x^2 - 2$: the limit is $3(-1)^2 - 2 = 1$. The option $5$ is the right-hand limit (and $f(-1)$) from $6 + x$; $-5$ treats the left formula as $3x - 2$; and $7$ squares $3x$ to get $(3x)^2 - 2$.`, d: 2, c: 'understanding', t: [1], time: 60 }, (C) => {
    C.assert(near(g, -1, 1, { side: 'left' }) && near(g, -1, 5, { side: 'right' }) && g(-1) === 5 && 3 * (-1) - 2 === -5 && (3 * -1) ** 2 - 2 === 7, 'left-hand limit 1; right-hand limit and f(-1) equal 5; wrong routes give -5 and 7');
  });
}
{
  const g = (x) => (x * x - 4) / Math.abs(x - 2);
  MQ('m03', { stem: r`The value of $\displaystyle\lim_{x \to 2^{-}}\dfrac{x^2 - 4}{\lvert x - 2 \rvert}$ is`, vals: [-4, 4, 0, 'does not exist'], target: -4, txt: ['$-4$', '$4$', '$0$', 'The limit does not exist'], sol: r`For $x < 2$, $\lvert x - 2 \rvert = 2 - x$, so the quotient is $\dfrac{(x - 2)(x + 2)}{2 - x} = -(x + 2)$, which tends to $-4$. The option $4$ takes $\lvert x - 2 \rvert = x - 2$ (the right-hand case); $0$ substitutes in the numerator only; and "The limit does not exist" describes the two-sided limit, but the question asks for the left-hand limit.`, d: 3, c: 'application', t: [1], time: 90 }, (C) => {
    C.assert(near(g, 2, -4, { side: 'left' }) && near(g, 2, 4, { side: 'right' }) && noLimit(g, 2), 'left-hand limit -4, right-hand limit 4 (two-sided limit does not exist)');
  });
}
{
  const g = (x) => Math.floor(x) + x * x;
  MQ('m04', { stem: r`The value of $\displaystyle\lim_{x \to 3^{-}}\left([x] + x^2\right)$, where $[x]$ is the greatest integer not exceeding $x$, is`, vals: [11, 12, 9, 5], target: 11, sol: r`Just left of $3$, $[x] = 2$ and $x^2 \to 9$, so the limit is $2 + 9 = 11$. The option $12$ uses $[3] = 3$, the value on the right; $9$ drops the integer part; and $5$ adds $x$ instead of $x^2$, giving $2 + 3$.`, d: 3, c: 'application', t: [1], time: 75 }, (C) => {
    C.assert(near(g, 3, 11, { side: 'left' }) && near(g, 3, 12, { side: 'right' }) && 2 + 3 === 5, 'left-hand limit 11, right-hand limit 12');
  });
}
{
  const K = [3, 6, -3, 4];
  const lhl = (k) => 7 - k, rhl = (k) => 1 + k;
  const g = (k) => (x) => (x < -1 ? k * x + 7 : x * x + k);
  MQ('m05', { stem: r`The function $f(x) = kx + 7$ for $x < -1$ and $f(x) = x^2 + k$ for $x \ge -1$ has a limit as $x \to -1$. The value of $k$ is`, vals: K, target: 3, sol: r`Left-hand limit: $-k + 7$. Right-hand limit: $1 + k$. Equating, $7 - k = 1 + k$, so $2k = 6$ and $k = 3$. The option $6$ is $2k$, not $k$; $-3$ comes from the sign slip $7 + k = 1 - k$; and $4$ is the common value of the limit, not the constant.`, d: 4, c: 'application', t: [1], time: 100 }, (C) => {
    C.assert(K.filter((k) => lhl(k) === rhl(k)).join() === '3' && near(g(3), -1, 4) && !near(g(6), -1, 4) && noLimit(g(6), -1) && noLimit(g(-3), -1), 'only k = 3 makes the two one-sided limits equal (both 4)');
  });
}
{
  const A = 5, B = -2;
  const f1 = (x) => x + 4, g1 = (x) => 3 * x - 5, h = (x) => 2 * f1(x) * g1(x) - g1(x) ** 2;
  MQ('m06', { stem: r`If $\displaystyle\lim_{x \to a} f(x) = 5$ and $\displaystyle\lim_{x \to a} g(x) = -2$, then $\displaystyle\lim_{x \to a}\left[2f(x)\,g(x) - \bigl(g(x)\bigr)^2\right]$ equals`, vals: [-24, -16, -14, -18], target: -24, sol: r`By the product and difference rules the limit is $2(5)(-2) - (-2)^2 = -20 - 4 = -24$. The option $-16$ adds $(-2)^2$ instead of subtracting it; $-14$ drops the factor $2$ in the product; and $-18$ subtracts $g$ instead of $g^2$, giving $-20 + 2$.`, d: 2, c: 'understanding', t: [2], time: 75 }, (C) => {
    C.assert(f1(1) === A && g1(1) === B && near(h, 1, -24) && 2 * A * B + B * B === -16 && A * B - B * B === -14 && 2 * A * B - B === -18, 'with f(x) = x + 4 and g(x) = 3x - 5 at a = 1 the limits are 5 and -2 and the combination tends to -24');
  });
}
{
  const forms = ['0/0', 'inf/inf', 'inf-inf', '0/7'];
  MQ('m07', { stem: r`Of the four forms that may appear when a limit is evaluated by direct substitution, the only one that is not indeterminate is`, vals: forms, target: '0/7', txt: [T(r`\dfrac{0}{0}`), T(r`\dfrac{\infty}{\infty}`), T(r`\infty - \infty`), T(r`\dfrac{0}{7}`)], sol: r`A form is indeterminate when different limits can lead to it. $\dfrac{0}{0}$ is indeterminate (both $\dfrac{x}{x}$ and $\dfrac{2x}{x}$ lead to it as $x \to 0$, with values $1$ and $2$), and so are $\dfrac{\infty}{\infty}$ and $\infty - \infty$. The form $\dfrac{0}{7}$ always gives $0$.`, d: 1, c: 'recall', t: [2], time: 45 }, (C) => {
    C.assert(near((x) => x / x, 0, 1) && near((x) => (2 * x) / x, 0, 2) && nearInf((x) => x / x, 1) && nearInf((x) => (3 * x) / x, 3) && nearInf((x) => (x + 1) - x, 1, 1, 1e-6) && nearInf((x) => (x + 3) - x, 3, 1, 1e-6) && near((x) => x / 7, 0, 0) && near((x) => (5 * x) / 7, 0, 0), 'the first three forms give two different values; 0/7 always gives 0');
  });
}
{
  const g = (x) => 2 * x * x - x + 4;
  const v = 2 * 9 + 3 + 4;
  MQ('m08', { stem: r`The value of $\displaystyle\lim_{x \to -3}\left(2x^2 - x + 4\right)$ is`, vals: [25, 19, 43, -11], target: 25, sol: r`A polynomial has a limit equal to its value, so substitute $x = -3$: $2(9) - (-3) + 4 = 18 + 3 + 4 = 25$. The option $19$ treats $-x$ as $-3$; $43$ reads $2x^2$ as $(2x)^2 = 36$; and $-11$ takes $x^2 = -9$.`, d: 1, c: 'understanding', t: [3], time: 45 }, (C) => {
    C.assert(v === 25 && near(g, -3, 25) && 18 - 3 + 4 === 19 && 36 + 3 + 4 === 43 && -18 + 3 + 4 === -11, 'substitution gives 25; the wrong routes give 19, 43 and -11');
  });
}
{
  const g = (x) => (x * x - 5 * x + 6) / (x * x - 9);
  MQ('m09', { stem: r`The value of $\displaystyle\lim_{x \to 3}\dfrac{x^2 - 5x + 6}{x^2 - 9}$ is`, vals: [1 / 6, 0, 1, -1 / 6], target: 1 / 6, txt: [fq(1, 6), '$0$', '$1$', fq(-1, 6)], sol: r`Both parts vanish at $x = 3$, so factorise: $\dfrac{(x - 2)(x - 3)}{(x - 3)(x + 3)} = \dfrac{x - 2}{x + 3} \to \dfrac{1}{6}$. The option $0$ substitutes in the numerator only; $1$ compares the leading coefficients; and $-\dfrac{1}{6}$ has the sign of the factor $x - 2$ reversed.`, d: 2, c: 'application', t: [3], time: 75 }, (C) => {
    C.assert(ratLim(P(1, -5, 6), P(1, 0, -9), 3).eq(F(1, 6)) && near(g, 3, 1 / 6) && P(1, -5, 6).length === 3, 'exact cancellation of x - 3 gives 1/6; numeric approach from both sides agrees');
  });
}
{
  const g = (x) => (Math.sqrt(2 * x + 25) - 5) / x;
  MQ('m10', { stem: r`The value of $\displaystyle\lim_{x \to 0}\dfrac{\sqrt{2x + 25} - 5}{x}$ is`, vals: [1 / 5, 2 / 5, 1 / 10, 0], target: 1 / 5, txt: [fq(1, 5), fq(2, 5), fq(1, 10), '$0$'], sol: r`Multiply by the conjugate: $\dfrac{(2x + 25) - 25}{x\left(\sqrt{2x + 25} + 5\right)} = \dfrac{2}{\sqrt{2x + 25} + 5} \to \dfrac{2}{10} = \dfrac{1}{5}$. The option $\dfrac{2}{5}$ uses $5$ instead of $10$ for the conjugate sum; $\dfrac{1}{10}$ loses the factor $2$ in the numerator; and $0$ substitutes in the numerator only.`, d: 3, c: 'application', t: [3], time: 90 }, (C) => {
    C.assert(near(g, 0, 0.2) && Math.abs(2 / (Math.sqrt(25) + 5) - 0.2) < 1e-15, 'both sides approach 1/5 and the rationalised form 2/(sqrt(2x + 25) + 5) equals 1/5 at x = 0');
  });
}
{
  const g = (x) => (x ** 7 - 128) / (x - 2);
  MQ('m11', { stem: r`The value of $\displaystyle\lim_{x \to 2}\dfrac{x^7 - 128}{x - 2}$ is`, vals: [448, 64, 128, 896], target: 448, sol: r`Since $128 = 2^7$, the limit is $n a^{n-1}$ with $n = 7$ and $a = 2$: $7 \times 2^6 = 7 \times 64 = 448$. The option $64$ is $a^{n-1}$ without the factor $n$; $128$ is $a^n$; and $896$ is $n a^n$.`, d: 2, c: 'understanding', t: [3], time: 60 }, (C) => {
    C.assert(ratLim(P(1, 0, 0, 0, 0, 0, 0, -128), P(1, -2), 2).eq(448) && near(g, 2, 448, { tol: 1e-3, hs: [1e-5, 1e-6, 1e-7] }) && 7 * 2 ** 7 === 896, 'exact cancellation gives 448; the quotient at 2 +- 1e-5, 1e-6, 1e-7 agrees');
  });
}
{
  const g = (x) => (Math.cbrt(x) - 2) / (x - 8);
  MQ('m12', { stem: r`The value of $\displaystyle\lim_{x \to 8}\dfrac{x^{1/3} - 2}{x - 8}$ is`, vals: [1 / 12, 1 / 3, 1 / 4, 1 / 6], target: 1 / 12, txt: [fq(1, 12), fq(1, 3), fq(1, 4), fq(1, 6)], sol: r`Take $n = \dfrac{1}{3}$ and $a = 8$ in the result $n a^{n-1}$: $\dfrac{1}{3} \times 8^{-2/3} = \dfrac{1}{3} \times \dfrac{1}{4} = \dfrac{1}{12}$. The option $\dfrac{1}{3}$ is $n$ alone; $\dfrac{1}{4}$ is $8^{-2/3}$ alone; and $\dfrac{1}{6}$ uses $8^{-1/3}$ instead of $8^{-2/3}$.`, d: 3, c: 'application', t: [3], time: 80 }, (C) => {
    C.assert(F(1, 3).mul(F(1, 4)).eq(F(1, 12)) && ratLim(P(1, -2), P(1, 0, 0, -8), 2).eq(F(1, 12)) && near(g, 8, 1 / 12, { tol: 1e-3 }) && Math.abs(8 ** (-2 / 3) - 0.25) < 1e-12, 'with y = x^(1/3): (y - 2)/(y^3 - 8) = 1/(y^2 + 2y + 4) -> 1/12; numeric approach agrees');
  });
}
{
  const g = (x) => (7 * x ** 3 - 2 * x) / (3 * x ** 3 + x * x + 5);
  MQ('m13', { stem: r`The value of $\displaystyle\lim_{x \to \infty}\dfrac{7x^3 - 2x}{3x^3 + x^2 + 5}$ is`, vals: [7 / 3, 3 / 7, 0, 7], target: 7 / 3, txt: [fq(7, 3), fq(3, 7), '$0$', '$7$'], sol: r`Divide the top and bottom by $x^3$: $\dfrac{7 - \frac{2}{x^2}}{3 + \frac{1}{x} + \frac{5}{x^3}} \to \dfrac{7}{3}$. The option $\dfrac{3}{7}$ inverts the ratio; $0$ would need a lower degree on top; and $7$ forgets to divide by the leading coefficient of the denominator.`, d: 2, c: 'understanding', t: [3], time: 70 }, (C) => {
    C.assert(ratInf(P(7, 0, -2, 0), P(3, 1, 0, 5)).eq(F(7, 3)) && nearInf(g, 7 / 3), 'exact degree comparison gives 7/3; values at x = 1e4, 1e6, 1e8 agree');
  });
}
{
  const g = (x) => Math.sqrt(x * x + 4 * x) - x;
  MQ('m14', { stem: r`The value of $\displaystyle\lim_{x \to \infty}\left(\sqrt{x^2 + 4x} - x\right)$ is`, vals: [2, 4, 0, 1], target: 2, sol: r`Multiply by the conjugate: $\dfrac{4x}{\sqrt{x^2 + 4x} + x} = \dfrac{4}{\sqrt{1 + \frac{4}{x}} + 1} \to \dfrac{4}{2} = 2$. The option $4$ forgets the sum $1 + 1$ in the denominator; $0$ treats $\infty - \infty$ as $0$; and $1$ replaces the denominator by $4$.`, d: 4, c: 'application', t: [3], time: 100 }, (C) => {
    C.assert(nearInf(g, 2) && Math.abs(4 / (Math.sqrt(1) + 1) - 2) < 1e-15, 'values at x = 1e4, 1e6, 1e8 approach 2; the conjugate form 4/(sqrt(1 + 4/x) + 1) tends to 2');
  });
}
{
  const g = (x) => Math.tan(5 * x) / (2 * x);
  MQ('m15', { stem: r`The value of $\displaystyle\lim_{x \to 0}\dfrac{\tan 5x}{2x}$ is`, vals: [5 / 2, 2 / 5, 5, 1], target: 5 / 2, txt: [fq(5, 2), fq(2, 5), '$5$', '$1$'], sol: r`Write $\dfrac{\tan 5x}{2x} = \dfrac{5}{2} \cdot \dfrac{\tan 5x}{5x}$, and $\dfrac{\tan 5x}{5x} \to 1$, so the limit is $\dfrac{5}{2}$. The option $\dfrac{2}{5}$ inverts the factor; $5$ ignores the $2$ in the denominator; and $1$ applies the standard limit without matching the angle.`, d: 1, c: 'understanding', t: [4], time: 55 }, (C) => {
    C.assert(near(g, 0, 2.5), 'both sides approach 5/2');
  });
}
{
  const g = (x) => (1 - Math.cos(x)) / (x * Math.sin(x));
  MQ('m16', { stem: r`The value of $\displaystyle\lim_{x \to 0}\dfrac{1 - \cos x}{x \sin x}$ is`, vals: [1 / 2, 1, 0, 2], target: 1 / 2, txt: [fq(1, 2), '$1$', '$0$', '$2$'], sol: r`Split as $\dfrac{1 - \cos x}{x^2} \cdot \dfrac{x}{\sin x} \to \dfrac{1}{2} \times 1 = \dfrac{1}{2}$. The option $1$ takes $\dfrac{1 - \cos x}{x^2} \to 1$; $0$ substitutes $\cos 0 = 1$ in the numerator only; and $2$ inverts the first factor.`, d: 3, c: 'application', t: [4], time: 85 }, (C) => {
    C.assert(near(g, 0, 0.5), 'both sides approach 1/2 (checked at 1e-4, 1e-5, 1e-6)');
  });
}
{
  const g = (x) => (2 ** x - 1) / x;
  MQ('m17', { stem: r`The value of $\displaystyle\lim_{x \to 0}\dfrac{2^x - 1}{x}$ is`, vals: [Math.LN2, 1, 2, 1 / Math.LN2], target: Math.LN2, txt: [r`$\ln 2$`, '$1$', '$2$', T(r`\dfrac{1}{\ln 2}`)], sol: r`By the standard limit $\lim_{x \to 0}\dfrac{a^x - 1}{x} = \ln a$ with $a = 2$, the value is $\ln 2 \approx 0.693$. The option $1$ applies the limit for $a = e$; $2$ is the base itself; and $\dfrac{1}{\ln 2}$ inverts the result.`, d: 2, c: 'understanding', t: [4], time: 55 }, (C) => {
    C.assert(near(g, 0, Math.LN2) && Math.abs(Math.LN2 - 0.6931471805599453) < 1e-15, 'both sides approach ln 2 = 0.6931');
  });
}
{
  const g = (x) => Math.log(1 - 3 * x) / (6 * x);
  MQ('m18', { stem: r`The value of $\displaystyle\lim_{x \to 0}\dfrac{\ln(1 - 3x)}{6x}$ is`, vals: [-0.5, 0.5, -3, -2], target: -0.5, txt: [fq(-1, 2), fq(1, 2), '$-3$', '$-2$'], sol: r`Write $\dfrac{\ln(1 - 3x)}{6x} = \dfrac{-3}{6} \cdot \dfrac{\ln(1 - 3x)}{-3x} \to -\dfrac{1}{2} \times 1$. The option $\dfrac{1}{2}$ loses the sign of $-3$; $-3$ forgets to divide by $6$; and $-2$ inverts the ratio $-\dfrac{1}{2}$.`, d: 3, c: 'application', t: [4], time: 80 }, (C) => {
    C.assert(near(g, 0, -0.5), 'both sides approach -1/2');
  });
}
{
  const g = (x) => (Math.exp(4 * x) - 1) / Math.sin(2 * x);
  MQ('m19', { stem: r`The value of $\displaystyle\lim_{x \to 0}\dfrac{e^{4x} - 1}{\sin 2x}$ is`, vals: [2, 4, 1 / 2, 8], target: 2, txt: ['$2$', '$4$', fq(1, 2), '$8$'], sol: r`Divide top and bottom by $x$: $\dfrac{(e^{4x} - 1)/x}{(\sin 2x)/x} \to \dfrac{4}{2} = 2$. The option $4$ forgets the $2$ from the sine; $\dfrac{1}{2}$ inverts the ratio; and $8$ multiplies the two constants.`, d: 3, c: 'application', t: [4], time: 80 }, (C) => {
    C.assert(near(g, 0, 2), 'both sides approach 2');
  });
}
{
  const g = (x) => (1 + 4 * x) ** (1 / x);
  const E4 = Math.exp(4);
  MQ('m20', { stem: r`The value of $\displaystyle\lim_{x \to 0}(1 + 4x)^{1/x}$ is`, vals: [E4, Math.E, 4 * Math.E, Math.exp(0.25)], target: E4, txt: ['$e^4$', '$e$', '$4e$', '$e^{1/4}$'], sol: r`Write $(1 + 4x)^{1/x} = \left[(1 + 4x)^{1/(4x)}\right]^4 \to e^4$. The option $e$ forgets the power $4$; $4e$ multiplies instead of raising to the power; and $e^{1/4}$ inverts the power.`, d: 3, c: 'application', t: [4], time: 80 }, (C) => {
    C.assert(Math.abs(g(1e-6) / E4 - 1) < 1e-3 && Math.abs(g(-1e-6) / E4 - 1) < 1e-3, 'at x = +-1e-6 the value is within 0.1% of e^4 = 54.598');
  });
}

// ============================================================ assertion-reason
{
  const g = Math.floor;
  Q('ar1', mk.ar({ a: r`For $f(x) = [x]$, the limit $\displaystyle\lim_{x \to 2} f(x)$ does not exist.`, r: r`The left-hand limit of $[x]$ at $x = 2$ is $1$ and its right-hand limit is $2$.`, key: 'a', sol: r`Reason: just left of $2$, $[x] = 1$; just right, $[x] = 2$. Both statements are true and the unequal one-sided limits are exactly why the limit fails to exist, so R explains A.`, d: 2, c: 'understanding', t: [1], time: 60 }), (C) => {
    C.assert(near(g, 2, 1, { side: 'left' }) && near(g, 2, 2, { side: 'right' }) && noLimit(g, 2), 'left-hand limit 1, right-hand limit 2, no two-sided limit'); C.key('a');
  });
}
{
  const g = (x) => (x * x - 9) / (x - 3);
  Q('ar2', mk.ar({ a: r`$\displaystyle\lim_{x \to 3}\dfrac{x^2 - 9}{x - 3} = 6$.`, r: r`The function $\dfrac{x^2 - 9}{x - 3}$ is not defined at $x = 3$.`, key: 'b', sol: r`For $x \ne 3$ the quotient equals $x + 3$, which tends to $6$, so A is true. R is also true, but it does not explain A: the value $6$ comes from cancelling the factor $x - 3$, and a limit can exist whether or not the function is defined at the point.`, d: 2, c: 'analysis', t: [3], time: 70 }), (C) => {
    C.assert(near(g, 3, 6) && Number.isNaN(g(3)) && ratLim(P(1, 0, -9), P(1, -3), 3).eq(6), 'the limit is 6 and f(3) is undefined (0/0)'); C.key('b');
  });
}
{
  const g = (x) => (3 * x + 1) / (x * x + 4);
  Q('ar3', mk.ar({ a: r`$\displaystyle\lim_{x \to \infty}\dfrac{3x + 1}{x^2 + 4} = 0$.`, r: r`The limit of a rational function as $x \to \infty$ is always the ratio of the leading coefficients of the numerator and the denominator.`, key: 'c', sol: r`Dividing by $x^2$ gives $\dfrac{\frac{3}{x} + \frac{1}{x^2}}{1 + \frac{4}{x^2}} \to 0$, so A is true. R is false: the ratio of leading coefficients is the limit only when the two degrees are equal. Here the degrees are $1$ and $2$, the ratio would be $\dfrac{3}{1}$, but the limit is $0$.`, d: 3, c: 'analysis', t: [3], time: 75 }), (C) => {
    C.assert(nearInf(g, 0) && ratInf(P(3, 1), P(1, 0, 4)).eq(0) && !ratInf(P(3, 1), P(1, 0, 4)).eq(3), 'the limit is 0, not the leading-coefficient ratio 3'); C.key('c');
  });
}
{
  const g = (x) => (1 + 2 * x) ** (1 / x);
  Q('ar4', mk.ar({ a: r`$\displaystyle\lim_{x \to 0}(1 + 2x)^{1/x} = 1$.`, r: r`The form $1^{\infty}$ is an indeterminate form.`, key: 'd', sol: r`R is true: powers of numbers close to $1$ can tend to many different values. A is false: $(1 + 2x)^{1/x} = \left[(1 + 2x)^{1/(2x)}\right]^2 \to e^2 \approx 7.39$, not $1$.`, d: 3, c: 'analysis', t: [4], time: 70 }), (C) => {
    const E2 = Math.exp(2);
    C.assert(Math.abs(g(1e-6) / E2 - 1) < 1e-3 && Math.abs(g(-1e-6) / E2 - 1) < 1e-3 && Math.abs(g(1e-6) - 1) > 6, 'the values at x = +-1e-6 are near e^2 = 7.389, not 1'); C.key('d');
  });
}
{
  const g = (x) => (1 - Math.cos(x)) / (x * x);
  Q('ar5', mk.ar({ a: r`$\displaystyle\lim_{x \to 0}\dfrac{1 - \cos x}{x^2} = \dfrac{1}{2}$.`, r: r`$\cos 0 = 1$.`, key: 'b', sol: r`A is true: $1 - \cos x = 2\sin^2\dfrac{x}{2}$ gives $\dfrac{1}{2}\left(\dfrac{\sin(x/2)}{x/2}\right)^2 \to \dfrac{1}{2}$. R is also true, but $\cos 0 = 1$ only shows that the numerator tends to $0$; it says nothing about the value $\dfrac{1}{2}$ of the quotient.`, d: 2, c: 'analysis', t: [4], time: 70 }), (C) => {
    C.assert(near(g, 0, 0.5) && Math.cos(0) === 1, 'the quotient tends to 1/2 and cos 0 = 1'); C.key('b');
  });
}
{
  const g = (x) => (x ** 3 - 1) / (x - 1);
  Q('ar6', mk.ar({ a: r`$\displaystyle\lim_{x \to 1}\dfrac{x^3 - 1}{x - 1} = 3$.`, r: r`Substituting $x = 1$ directly in $\dfrac{x^3 - 1}{x - 1}$ gives the value $3$.`, key: 'c', sol: r`A is true: $\dfrac{x^3 - 1}{x - 1} = x^2 + x + 1 \to 3$. R is false: direct substitution gives $\dfrac{0}{0}$, which is undefined, and the value $3$ is found only after cancelling the factor $x - 1$.`, d: 2, c: 'analysis', t: [3], time: 65 }), (C) => {
    C.assert(ratLim(P(1, 0, 0, -1), P(1, -1), 1).eq(3) && 1 - 1 === 0 && Number.isNaN(g(1)) && near(g, 1, 3), 'the limit is 3 but substitution gives 0/0'); C.key('c');
  });
}
