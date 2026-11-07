// Computed values and the field model for ICSE 9 Physics ch12 Magnetism.
// A bar magnet is modelled as two point poles (N: +1, S: -1) a distance 2p apart; the field of a pole falls as 1 / r^2. Field strengths in the
// numericals are given in arbitrary units (the lengths of arrows), so no unit of magnetic field is introduced.
export const eq = (value, expected, what) => {
  if (JSON.stringify(value) !== JSON.stringify(expected)) throw new Error(`calc: ${what}: got ${JSON.stringify(value)}, expected ${JSON.stringify(expected)}`);
  return value;
};
export const round = (n, dp = 2) => Math.round(n * 10 ** dp + 1e-9) / 10 ** dp;

// ---------------------------------------------------------------- the field of point poles plus a uniform field
/** poles: [{ x, y, q }]; uniform: [ux, uy]. Returns the field [bx, by] at (x, y). */
export function fieldAt(x, y, poles, uniform = [0, 0]) {
  let bx = uniform[0];
  let by = uniform[1];
  for (const p of poles) {
    const dx = x - p.x;
    const dy = y - p.y;
    const r2 = dx * dx + dy * dy;
    const r3 = r2 * Math.sqrt(r2);
    bx += (p.q * dx) / r3;
    by += (p.q * dy) / r3;
  }
  return [bx, by];
}
/** Traces a field line from (x0, y0) along the field with a fixed step; stops at an S pole, outside the box, or after n steps. dir = +1 along the field. */
export function trace(x0, y0, poles, uniform, { box, step = 0.02, n = 4000, dir = 1, stopR = 0.07 } = {}) {
  const pts = [[x0, y0]];
  let [x, y] = [x0, y0];
  const unit = (px, py) => {
    const [bx, by] = fieldAt(px, py, poles, uniform);
    const m = Math.hypot(bx, by) || 1;
    return [(dir * bx) / m, (dir * by) / m];
  };
  for (let i = 0; i < n; i++) {
    const [k1x, k1y] = unit(x, y);
    const [k2x, k2y] = unit(x + (step / 2) * k1x, y + (step / 2) * k1y);
    const [k3x, k3y] = unit(x + (step / 2) * k2x, y + (step / 2) * k2y);
    const [k4x, k4y] = unit(x + step * k3x, y + step * k3y);
    x += (step / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
    y += (step / 6) * (k1y + 2 * k2y + 2 * k3y + k4y);
    pts.push([x, y]);
    if (x < box[0] || x > box[2] || y < box[1] || y > box[3]) break;
    if (poles.some((p) => p.q * dir < 0 && Math.hypot(x - p.x, y - p.y) < stopR)) break;
  }
  return pts;
}
/** Finds a zero of the field along a line by bisection of the component of the field along that line. */
export function neutralOnLine(poles, uniform, from, to, comp = [to[0] - from[0], to[1] - from[1]]) {
  const f = (t) => {
    const [bx, by] = fieldAt(from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t, poles, uniform);
    return bx * comp[0] + by * comp[1];
  };
  let lo = 0;
  let hi = 1;
  if (f(lo) * f(hi) > 0) throw new Error('no sign change on the line');
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2;
    if (f(lo) * f(mid) <= 0) hi = mid;
    else lo = mid;
  }
  const t = (lo + hi) / 2;
  return [from[0] + (to[0] - from[0]) * t, from[1] + (to[1] - from[1]) * t];
}

// the model used by the figures: half pole distance p = 0.4, the earth's horizontal field H chosen so that the equatorial neutral points lie 1.0 from the centre
export const P = 0.4;
export const H = Number((2 * P / (1 + P * P) ** 1.5).toFixed(4));
eq(H, 0.6403, 'earth field in model units');
// magnet with N pole pointing north (up the page): N pole at +P, earth's field points up (north)
export const POLES_NN = [{ x: 0, y: P, q: 1 }, { x: 0, y: -P, q: -1 }];
// magnet with N pole pointing south: N pole at -P
export const POLES_NS = [{ x: 0, y: -P, q: 1 }, { x: 0, y: P, q: -1 }];
export const EARTH = [0, H];
export const NEUTRAL_NN = [neutralOnLine(POLES_NN, EARTH, [0.3, 0], [2, 0], [0, 1]), neutralOnLine(POLES_NN, EARTH, [-0.3, 0], [-2, 0], [0, 1])];
export const NEUTRAL_NS = [neutralOnLine(POLES_NS, EARTH, [0, 0.9], [0, 2.2]), neutralOnLine(POLES_NS, EARTH, [0, -0.9], [0, -2.2])];
const mag = (p, poles) => Math.hypot(...fieldAt(p[0], p[1], poles, EARTH));
for (const p of NEUTRAL_NN) eq(mag(p, POLES_NN) < 1e-6, true, 'field is zero at an equatorial neutral point');
for (const p of NEUTRAL_NS) eq(mag(p, POLES_NS) < 1e-6, true, 'field is zero at an axial neutral point');
eq(Math.abs(Math.abs(NEUTRAL_NN[0][0]) - 1) < 1e-3, true, 'equatorial neutral points are 1.0 from the centre');
eq(Math.abs(NEUTRAL_NN[0][1]) < 1e-9 && Math.abs(NEUTRAL_NN[1][0] + NEUTRAL_NN[0][0]) < 1e-6, true, 'the two equatorial neutral points are symmetric about the axis');
eq(NEUTRAL_NS[0][1] > P && NEUTRAL_NS[1][1] < -P && Math.abs(NEUTRAL_NS[0][1] + NEUTRAL_NS[1][1]) < 1e-6, true, 'axial neutral points lie beyond the poles on both sides');

// ---------------------------------------------------------------- numericals (lengths in cm)
export const EQ1 = { len: 12, d: 8 };
export const EQ1_HALF = eq(EQ1.len / 2, 6, 'half length of the 12 cm magnet (cm)');
export const EQ1_POLE = eq(Math.hypot(EQ1.d, EQ1_HALF), 10, 'distance of the neutral point from each pole (cm)');
export const AX2 = { len: 10, d: 15 };
export const AX2_NEAR = eq(AX2.d - AX2.len / 2, 10, 'distance from the nearer pole (cm)');
export const AX2_FAR = eq(AX2.d + AX2.len / 2, 20, 'distance from the farther pole (cm)');
export const AX3 = { gap: 40, len: 12 };
export const AX3_C = eq(AX3.gap / 2, 20, 'each neutral point from the centre (cm)');
export const AX3_NEAR = eq(AX3_C - AX3.len / 2, 14, 'neutral point to the nearer pole (cm)');
export const S3D = { len: 14, d: 24 };
export const S3D_POLE = eq(Math.hypot(S3D.d, S3D.len / 2), 25, 'distance of the neutral point from each pole (cm)');
export const S3D_GAP = eq(2 * S3D.d, 48, 'distance between the two neutral points (cm)');
export const RES = { earth: 3, magnet: 4 };
export const RES_MAG = eq(Math.hypot(RES.earth, RES.magnet), 5, 'resultant field (units)');
export const RES_ANG = eq(Math.round((Math.atan2(RES.magnet, RES.earth) * 180) / Math.PI), 53, 'needle direction east of north (degrees)');
export const EQUAL = eq(Math.round((Math.atan2(4, 4) * 180) / Math.PI), 45, 'equal perpendicular fields give 45 degrees');
export const OPP = { magnet: 5, earth: 3 };
export const OPP_NET = eq(OPP.magnet - OPP.earth, 2, 'net field where the magnet field opposes the earth field (units)');
export const RES2 = { earth: 8, magnet: 6 };
export const RES2_MAG = eq(Math.hypot(RES2.earth, RES2.magnet), 10, 'second resultant field (units)');
export const RES2_ANG = eq(Math.round((Math.atan2(RES2.magnet, RES2.earth) * 180) / Math.PI), 37, 'second needle direction east of north (degrees)');
export const NEUTRAL_FIELD = eq(3 - 3, 0, 'resultant at a neutral point');
