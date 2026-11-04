// ISC 11 Biology ch16 Breathing and Exchange of Gases — every number in a stem, answer, table, slide or diagram is computed here and asserted.
export const round = (x, dp = 0) => Math.round(x * 10 ** dp) / 10 ** dp;
/** Throws when a computed value does not match the expected one. */
export const eq = (v, e, what) => {
  if (!(v === e || (typeof v === 'number' && typeof e === 'number' && Math.abs(v - e) < 1e-9))) throw new Error(`calc: ${what}: got ${v}, expected ${e}`);
  return v;
};

// ---------------------------------------------------------------- pulmonary volumes and capacities (mL)
/** Capacities from the four volumes: IC = TV + IRV, EC = TV + ERV, FRC = ERV + RV, VC = IRV + TV + ERV, TLC = VC + RV. */
export function caps({ tv, irv, erv, rv }) {
  const ic = tv + irv;
  const ec = tv + erv;
  const frc = erv + rv;
  const vc = irv + tv + erv;
  const tlc = vc + rv;
  return { tv, irv, erv, rv, ic, ec, frc, vc, tlc, endExp: frc, endInsp: frc + tv };
}
// A student's spirometer test (volumes chosen for this chapter), and a trained swimmer
export const P1 = caps({ tv: 450, irv: 2400, erv: 900, rv: 1050 });
eq(P1.ic, 2850, 'P1 IC');
eq(P1.ec, 1350, 'P1 EC');
eq(P1.frc, 1950, 'P1 FRC');
eq(P1.vc, 3750, 'P1 VC');
eq(P1.tlc, 4800, 'P1 TLC');
eq(P1.endInsp, 2400, 'P1 end-inspiration level');
export const P2 = caps({ tv: 600, irv: 3300, erv: 1300, rv: 1400 });
eq(P2.ic, 3900, 'P2 IC');
eq(P2.frc, 2700, 'P2 FRC');
eq(P2.vc, 5200, 'P2 VC');
eq(P2.tlc, 6600, 'P2 TLC');
/** Residual volume as a percentage of total lung capacity. */
export const rvPct = (c) => round((c.rv / c.tlc) * 100, 1);
eq(rvPct(P1), 21.9, 'P1 RV percent of TLC');
// A patient with emphysema (air trapped, vital capacity low)
export const EMPH = { vc: 2400, rv: 2300, tlc: 2400 + 2300 };
eq(EMPH.tlc, 4700, 'emphysema TLC');
export const EMPH_RV_PCT = round((EMPH.rv / EMPH.tlc) * 100, 1);
eq(EMPH_RV_PCT, 48.9, 'emphysema RV percent of TLC');

// ---------------------------------------------------------------- ventilation
export const DEAD = 150; // mL, volume of the conducting passages where no exchange occurs
export const minuteVent = (tv, rate) => tv * rate;
export const alveolarVent = (tv, rate, dead = DEAD) => (tv - dead) * rate;
export const SHALLOW = { tv: 450, rate: 14 };
export const DEEP = { tv: 900, rate: 7 };
eq(minuteVent(SHALLOW.tv, SHALLOW.rate), 6300, 'shallow minute ventilation');
eq(minuteVent(DEEP.tv, DEEP.rate), 6300, 'deep minute ventilation');
eq(alveolarVent(SHALLOW.tv, SHALLOW.rate), 4200, 'shallow alveolar ventilation');
eq(alveolarVent(DEEP.tv, DEEP.rate), 5250, 'deep alveolar ventilation');
/** Boyle's law at constant temperature: p1 V1 = p2 V2. */
export const boyle = (p1, v1, v2) => (p1 * v1) / v2;
export const BOYLE = { p1: 760, v1: 2400, v2: 2450 };
export const BOYLE_P2 = round(boyle(BOYLE.p1, BOYLE.v1, BOYLE.v2), 1);
eq(BOYLE_P2, 744.5, 'intrapulmonary pressure after the chest enlarges');
export const BOYLE_DROP = round(BOYLE.p1 - BOYLE_P2, 1);
eq(BOYLE_DROP, 15.5, 'fall of pressure');

// ---------------------------------------------------------------- partial pressures
export const O2_FRAC = 0.209; // fraction of oxygen in dry air
export const pO2At = (baro) => round(baro * O2_FRAC, 1);
export const ALT = [
  { site: 'Sea level', baro: 760, po2: pO2At(760) },
  { site: 'Hill town at about 2500 metres', baro: 560, po2: pO2At(560) },
  { site: 'Base camp at about 5500 metres', baro: 380, po2: pO2At(380) },
  { site: 'Summit at about 8800 metres', baro: 253, po2: pO2At(253) },
];
eq(ALT[0].po2, 158.8, 'sea-level pO2');
eq(ALT[1].po2, 117, 'hill-town pO2');
eq(ALT[2].po2, 79.4, 'base-camp pO2');
eq(ALT[3].po2, 52.9, 'summit pO2');
// Textbook partial pressures (mm Hg)
export const PP = {
  atmosphere: { o2: 159, co2: 0.3 },
  alveolar: { o2: 104, co2: 40 },
  deoxy: { o2: 40, co2: 45 },
  oxy: { o2: 95, co2: 40 },
  tissue: { o2: 40, co2: 45 },
};
export const GRAD = {
  alveolusO2: PP.alveolar.o2 - PP.deoxy.o2,
  alveolusCO2: PP.deoxy.co2 - PP.alveolar.co2,
  tissueO2: PP.oxy.o2 - PP.tissue.o2,
  tissueCO2: PP.tissue.co2 - PP.oxy.co2,
};
eq(GRAD.alveolusO2, 64, 'alveolar O2 gradient');
eq(GRAD.alveolusCO2, 5, 'alveolar CO2 gradient');
eq(GRAD.tissueO2, 55, 'tissue O2 gradient');
eq(GRAD.tissueCO2, 5, 'tissue CO2 gradient');

// ---------------------------------------------------------------- oxyhaemoglobin dissociation curve (Hill form, illustrative)
export const HILL_N = 2.7;
export const P50 = { normal: 26.8, right: 33, left: 20 };
/** Percentage saturation of haemoglobin at a given pO2 (mm Hg). */
export const sat = (p, p50 = P50.normal) => (100 * p ** HILL_N) / (p ** HILL_N + p50 ** HILL_N);
export const satR = (p, p50) => round(sat(p, p50));
eq(satR(100), 97, 'saturation at 100');
eq(satR(40), 75, 'saturation at 40');
eq(satR(60), 90, 'saturation at 60');
eq(satR(40, P50.right), 63, 'right-shifted saturation at 40');
eq(satR(40, P50.left), 87, 'left-shifted saturation at 40');
export const SAT_DROP = satR(100) - satR(40);
eq(SAT_DROP, 22, 'saturation lost between lungs and resting tissue');
export const SAT_DROP_RIGHT = satR(100, P50.right) - satR(40, P50.right);
// oxygen content: 1 g of haemoglobin binds 1.34 mL of oxygen
export const O2_PER_G = 1.34;
export const o2Content = (hbG, satPct) => (hbG * O2_PER_G * satPct) / 100;
export const HB = 15; // g per 100 mL of blood
export const ART_O2 = round(o2Content(HB, 97), 1);
export const VEN_O2 = round(o2Content(HB, 75), 1);
export const DELIVERED = round(ART_O2 - VEN_O2, 1);
eq(ART_O2, 19.5, 'oxygen in 100 mL of arterial blood');
eq(VEN_O2, 15.1, 'oxygen in 100 mL of venous blood');
eq(DELIVERED, 4.4, 'oxygen given up by 100 mL of blood');
export const FLOW = 5000; // mL of blood per minute
export const O2_MIN = round((FLOW / 100) * DELIVERED);
eq(O2_MIN, 220, 'oxygen delivered per minute');

// ---------------------------------------------------------------- carbon dioxide transport
export const CO2_FORMS = { bicarbonate: 70, carbamino: 23, dissolved: 7 };
eq(CO2_FORMS.bicarbonate + CO2_FORMS.carbamino + CO2_FORMS.dissolved, 100, 'CO2 forms add to 100 percent');
export const CO2_MIN = 230; // mL of carbon dioxide added to the blood each minute at rest
export const co2Part = (k) => round((CO2_MIN * CO2_FORMS[k]) / 100, 1);
eq(co2Part('bicarbonate'), 161, 'CO2 as bicarbonate');
eq(co2Part('carbamino'), 52.9, 'CO2 as carbamino compounds');
eq(co2Part('dissolved'), 16.1, 'CO2 dissolved');
export const O2_FORMS = { haemoglobin: 97, dissolved: 3 };
eq(O2_FORMS.haemoglobin + O2_FORMS.dissolved, 100, 'O2 forms add to 100 percent');

// ---------------------------------------------------------------- curve points for the diagram
export const curvePoints = (p50, step = 4) => {
  const pts = [];
  for (let p = 0; p <= 100; p += step) pts.push([p, sat(p, p50)]);
  return pts;
};

// ---------------------------------------------------------------- numbers for the question bank (different from the worked examples)
export const P3 = caps({ tv: 520, irv: 2650, erv: 1150, rv: 1250 });
eq(P3.vc, 4320, 'P3 VC');
eq(P3.tlc, 5570, 'P3 TLC');
export const CHK_ALV = { tv: 600, rate: 12 };
eq(alveolarVent(CHK_ALV.tv, CHK_ALV.rate), 5400, 'check: alveolar ventilation');
export const BOYLE2 = { p1: 760, v1: 2500, v2: 2560 };
export const BOYLE2_P2 = round(boyle(BOYLE2.p1, BOYLE2.v1, BOYLE2.v2), 1);
eq(BOYLE2_P2, 742.2, 'second Boyle example');
export const IC_Q = { ic: 3100, erv: 1050 };
export const VC_FROM_IC = IC_Q.ic + IC_Q.erv;
eq(VC_FROM_IC, 4150, 'VC from IC and ERV');
export const HB2 = { hb: 13, art: 98, ven: 70, flow: 4800 };
export const ART2 = round(o2Content(HB2.hb, HB2.art), 1);
export const VEN2 = round(o2Content(HB2.hb, HB2.ven), 1);
export const DEL2 = round(ART2 - VEN2, 1);
export const DEL2_MIN = round((HB2.flow / 100) * DEL2, 1);
eq(ART2, 17.1, 'oxygen in 100 mL of the second blood sample');
eq(VEN2, 12.2, 'oxygen in 100 mL of the second venous sample');
eq(DEL2, 4.9, 'oxygen given up per 100 mL, second sample');
eq(DEL2_MIN, 235.2, 'oxygen delivered per minute, second sample');
export const PASS = { baro: 480, po2: pO2At(480) };
eq(PASS.po2, 100.3, 'pO2 at the pass');
export const CO2_MIN2 = 250;
export const CO2_2 = { bicarbonate: round((CO2_MIN2 * CO2_FORMS.bicarbonate) / 100, 1), carbamino: round((CO2_MIN2 * CO2_FORMS.carbamino) / 100, 1), dissolved: round((CO2_MIN2 * CO2_FORMS.dissolved) / 100, 1) };
eq(CO2_2.bicarbonate, 175, 'CO2 as bicarbonate, second example');
eq(CO2_2.carbamino, 57.5, 'CO2 as carbamino compounds, second example');
eq(CO2_2.dissolved, 17.5, 'CO2 dissolved, second example');
export const REL_RELEASE = round(((satR(100) - satR(40)) / satR(100)) * 100, 1);
eq(REL_RELEASE, 22.7, 'fraction of the load released at rest');
export const HEALTHY = { vc: 4000, rv: 1200, tlc: 5200 };
eq(HEALTHY.vc + HEALTHY.rv, HEALTHY.tlc, 'healthy TLC');
export const HEALTHY_RV_PCT = round((HEALTHY.rv / HEALTHY.tlc) * 100, 1);
eq(HEALTHY_RV_PCT, 23.1, 'healthy RV percent of TLC');
