// ch09 worked-example numbers and figure data, all computed from stated data (used by the diagrams, decks, notes and items).
import { g, RHO, RHO_HG, PATM, S_W, R6, area } from './phys.mjs';

// ---------------- Part 1 (t01–t02)
export const DEPTH = { depths: [0, 10, 20] };
DEPTH.P = DEPTH.depths.map((h) => PATM + RHO * g * h);

export const BARO = { h: PATM / (RHO_HG * g) }; // m of mercury
BARO.hw = PATM / (RHO * g); // m of water

export const e1 = { h: 18 }; // tap 18 m below the water level of an overhead tank
e1.gauge = RHO * g * e1.h;
e1.abs = PATM + e1.gauge;

export const e3 = { r1: 0.03, r2: 0.12, m: 1500, d2: 0.15 }; // hydraulic lift
e3.W = R6(e3.m * g);
e3.ratio = (e3.r2 / e3.r1) ** 2;
e3.F1 = R6(e3.W / e3.ratio);
e3.d1 = e3.ratio * e3.d2;
e3.work = R6(e3.W * e3.d2);
e3.p = e3.F1 / area(e3.r1);

export const e4 = { r1: 0.03, r2: 0.015, v1: 2.0 }; // continuity in a hose
e4.ratio = (e4.r1 / e4.r2) ** 2;
e4.v2 = e4.v1 * e4.ratio;
e4.Q = area(e4.r1) * e4.v1;

export const e5 = { H: 2.0, h: 0.5 }; // Torricelli
e5.v = Math.sqrt(2 * g * e5.h);
e5.fall = e5.H - e5.h;
e5.t = Math.sqrt((2 * e5.fall) / g);
e5.R = e5.v * e5.t;

export const e6 = { d1: 0.08, d2: 0.04, dP: 7500 }; // Venturi
e6.A1 = area(e6.d1 / 2);
e6.A2 = area(e6.d2 / 2);
e6.k = (e6.A1 / e6.A2) ** 2;
e6.v1 = Math.sqrt((2 * e6.dP) / (RHO * (e6.k - 1)));
e6.v2 = e6.v1 * (e6.A1 / e6.A2);
e6.Q = e6.A1 * e6.v1;
e6.dh = e6.dP / (RHO * g);

// ---------------- Part 2 (t03–t04)
export const s1 = { A: 0.04, d: 0.002, v: 0.5, eta: 0.8 }; // viscous drag between plates
s1.F = (s1.eta * s1.A * s1.v) / s1.d;

export const s2 = { r: 1.0e-3, rs: 7800, sg: 900, eta: 0.4 }; // steel ball in oil
s2.vt = (2 * s2.r ** 2 * (s2.rs - s2.sg) * g) / (9 * s2.eta);
s2.V = (4 / 3) * Math.PI * s2.r ** 3;
s2.W = s2.V * s2.rs * g;
s2.B = s2.V * s2.sg * g;
s2.D = 6 * Math.PI * s2.eta * s2.r * s2.vt;
s2.Re = (s2.sg * s2.vt * 2 * s2.r) / s2.eta;
s2.tau = (2 * s2.rs * s2.r ** 2) / (9 * s2.eta);

export const s3 = { d1: 0.01, v1: 0.05, d2: 0.015, v2: 1.5 }; // Reynolds numbers, water
s3.Re1 = (RHO * s3.v1 * s3.d1) / 1.0e-3;
s3.Re2 = (RHO * s3.v2 * s3.d2) / 1.0e-3;

export const s4 = { l: 0.08, d: 0.05, S: 0.03 }; // soap film on a wire frame
s4.F = 2 * s4.S * s4.l;
s4.dA = 2 * s4.l * s4.d;
s4.W = R6(s4.F * s4.d * 1e6) / 1e6;

export const s5 = { Rb: 0.015, S: 0.03, Rd: 0.5e-3 }; // bubble and drop
s5.dPb = (4 * s5.S) / s5.Rb;
s5.dPd = (2 * S_W) / s5.Rd;

export const s6 = { r: 0.5e-3, Sh: 0.465, th: 140, rh: 1.0e-3 }; // capillary rise of water, depression of mercury
s6.h = (2 * S_W) / (RHO * g * s6.r);
s6.hHg = (2 * s6.Sh * Math.cos((s6.th * Math.PI) / 180)) / (RHO_HG * g * s6.rh);

export { R6 };
