// ch06 shared numbers: every worked-example value used by the diagrams, slides, notes and the self-checks is computed here
// from the stated data, so that a printed number can never differ from a computed one.
import { dec, sig } from '../../cbse-11-physics-ch01/src/lib.mjs';

export const g = 9.8; // m s^-2, stated in every item that uses it
export const R6 = (x) => Math.round(x * 1e6) / 1e6;
export const v3 = (x) => Number(dec(x, 3));
export const rad = Math.PI / 180;
export { sig, dec };

// ---------------------------------------------------------------- numbers in words (narration is read by TTS)
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
function intW(n) {
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ` ${ONES[n % 10]}` : '');
  if (n < 1000) return `${ONES[Math.floor(n / 100)]} hundred${n % 100 ? ` and ${intW(n % 100)}` : ''}`;
  return `${intW(Math.floor(n / 1000))} thousand${n % 1000 ? ` ${n % 1000 < 100 ? 'and ' : ''}${intW(n % 1000)}` : ''}`;
}
/** Number to words: 0.6 -> "zero point six", 1650 -> "one thousand six hundred and fifty". */
export function nw(x) {
  const neg = x < 0;
  const s = String(R6(Math.abs(x)));
  const [i, f] = s.split('.');
  let out = intW(Number(i));
  if (f) out += ` point ${[...f].map((d) => ONES[Number(d)]).join(' ')}`;
  return (neg ? 'minus ' : '') + out;
}

// ---------------------------------------------------------------- t01 centre of mass
/** Centre of mass of point masses along a line. */
export const cm1 = (ms, xs) => ms.reduce((s, m, i) => s + m * xs[i], 0) / ms.reduce((s, m) => s + m, 0);

// two masses on a light rod (diagram CM2 and worked example 1)
export const rod = { m1: 2.0, m2: 6.0, L: 0.8 };
rod.M = rod.m1 + rod.m2;
rod.x = (rod.m2 * rod.L) / rod.M; // from the 2.0 kg mass
rod.d1 = rod.x;
rod.d2 = R6(rod.L - rod.x);
rod.w1 = rod.m1 * g;
rod.w2 = rod.m2 * g;
rod.mom1 = rod.w1 * rod.d1;
rod.mom2 = rod.w2 * rod.d2;

// three particles in a plane (worked example 2)
export const tri = { m: [2.0, 3.0, 5.0], x: [0, 4.0, 0], y: [0, 0, 6.0] };
tri.M = tri.m.reduce((a, b) => a + b, 0);
tri.mx = tri.m.map((m, i) => m * tri.x[i]);
tri.my = tri.m.map((m, i) => m * tri.y[i]);
tri.X = tri.mx.reduce((a, b) => a + b, 0) / tri.M;
tri.Y = tri.my.reduce((a, b) => a + b, 0) / tri.M;

// a uniform wire bent into an L (worked example 3, diagram LSHAPE)
export const el = { a: 0.6, b: 0.4 };
el.X = (el.a * (el.a / 2)) / (el.a + el.b); // arm a lies along x from the corner; its midpoint is at a/2
el.Y = (el.b * (el.b / 2)) / (el.a + el.b);

// a shell bursting in flight (worked example 4)
export const sh = { M: 5.0, u: 20, m1: 2.0, v1: 45 };
sh.m2 = sh.M - sh.m1;
sh.p = sh.M * sh.u;
sh.v2 = (sh.p - sh.m1 * sh.v1) / sh.m2;
sh.t = 3.0;
sh.x1 = sh.v1 * sh.t;
sh.x2 = sh.v2 * sh.t;
sh.xc = (sh.m1 * sh.x1 + sh.m2 * sh.x2) / sh.M;

// a child walking along a sledge on smooth ice (worked example 5, diagram SLED)
export const sd = { m: 30, M: 90, L: 2.4 };
sd.s = (sd.m * sd.L) / (sd.m + sd.M); // sledge displacement (backwards)
sd.c = sd.L - sd.s; // child's displacement relative to the ground
sd.cm0 = (sd.m * 0 + sd.M * (sd.L / 2)) / (sd.m + sd.M); // from the left end, child at the left end

// ---------------------------------------------------------------- t02 torque and angular momentum
export const tq = { r: 0.5, F: 40, th: 30 }; // diagram TORQUE
tq.d = tq.r * Math.sin(tq.th * rad);
tq.tau = tq.F * tq.d;
// bicycle pedal (worked example 6)
export const pd = { r: 0.17, F: 300, angles: [0, 30, 60, 90] };
pd.tau = (a) => pd.F * pd.r * Math.sin(a * rad);
// straight-line motion about a point (worked example 7, diagram LINEL)
export const ln = { m: 0.5, v: 8.0, d: 3.0 };
ln.L = ln.m * ln.v * ln.d;
// rotating stool with two weights (worked example 8, diagram SPIN)
export const st = { I0: 0.6, m: 1.5, r1: 0.8, r2: 0.2, w1: 3.0 };
st.I1 = st.I0 + 2 * st.m * st.r1 ** 2;
st.I2 = st.I0 + 2 * st.m * st.r2 ** 2;
st.L = st.I1 * st.w1;
st.w2 = st.L / st.I2;
st.K1 = 0.5 * st.I1 * st.w1 ** 2;
st.K2 = 0.5 * st.I2 * st.w2 ** 2;

// ---------------------------------------------------------------- t03 equilibrium
// carrying pole (diagram POLE, worked example 9)
export const po = { m1: 12, m2: 18, L: 1.5 };
po.x = (po.m1 * po.L) / (po.m1 + po.m2); // from the heavier load to the shoulder
po.N = (po.m1 + po.m2) * g;
// plank over a drain (diagram BEAM, worked example 10)
export const pl = { L: 4.0, Mp: 30, Mm: 50, xm: 1.0 };
pl.Wp = pl.Mp * g;
pl.Wm = pl.Mm * g;
pl.RR = (pl.Wp * (pl.L / 2) + pl.Wm * pl.xm) / pl.L;
pl.RL = pl.Wp + pl.Wm - pl.RR;
// bar hinged to a wall and held by a cable (diagram BRACKET, worked example 11)
export const br = { L: 1.2, M: 4.0, m: 2.0, th: 30 };
br.Wb = br.M * g;
br.Wl = br.m * g;
br.T = (br.Wb * (br.L / 2) + br.Wl * br.L) / (br.L * Math.sin(br.th * rad));
br.Hx = br.T * Math.cos(br.th * rad);
br.Hy = br.Wb + br.Wl - br.T * Math.sin(br.th * rad);
// almirah that tilts (diagram TOPPLE)
export const tp = { b: 0.6, h: 1.8, a1: 12, a2: 25 };
tp.crit = Math.atan(tp.b / tp.h) / rad;

// ---------------------------------------------------------------- t04 moment of inertia and rotational energy
// four masses at the corners of a light square frame (worked example 12)
export const sq = { m: 0.5, a: 0.6 };
sq.r2 = sq.a ** 2 / 2;
sq.I = 4 * sq.m * sq.r2;
sq.M = 4 * sq.m;
sq.k = Math.sqrt(sq.I / sq.M);
// disc and ring of the same mass and radius (worked example 13)
export const dr = { M: 8.0, R: 0.25 };
dr.Id = 0.5 * dr.M * dr.R ** 2;
dr.Ir = dr.M * dr.R ** 2;
dr.kd = Math.sqrt(dr.Id / dr.M);
dr.kr = Math.sqrt(dr.Ir / dr.M);
// grinding wheel (worked example 14)
export const gw = { M: 12, R: 0.2, rpm: 600 };
gw.I = 0.5 * gw.M * gw.R ** 2;
gw.w = (2 * Math.PI * gw.rpm) / 60;
gw.K = 0.5 * gw.I * gw.w ** 2;
// constant torque on a flywheel (worked example 15)
export const ft = { tau: 6.0, I: 2.0, t: 5.0 };
ft.L = ft.tau * ft.t;
ft.w = ft.L / ft.I;
ft.K = 0.5 * ft.I * ft.w ** 2;
ft.alpha = ft.tau / ft.I;
// coefficients of I = c M R^2 for the standard bodies, axis through the centre (stated, not derived)
export const MOI = [
  { name: 'thin ring or hollow cylinder', c: 1, f: 'M R^2', fr: String.raw`MR^2` },
  { name: 'hollow sphere', c: 2 / 3, f: '(2/3) M R^2', fr: String.raw`\tfrac{2}{3}MR^2` },
  { name: 'disc or solid cylinder', c: 1 / 2, f: '(1/2) M R^2', fr: String.raw`\tfrac{1}{2}MR^2` },
  { name: 'solid sphere', c: 2 / 5, f: '(2/5) M R^2', fr: String.raw`\tfrac{2}{5}MR^2` },
];
