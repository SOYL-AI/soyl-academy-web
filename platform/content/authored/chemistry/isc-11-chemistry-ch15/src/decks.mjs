// ISC 11 Chemistry ch15 Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product: two decks.
// Part 1 (t01-t02): common ion effect, hydrolysis of salts and the pH of their solutions. Part 2 (t03-t04): buffers, Henderson equation,
// solubility product, precipitation and qualitative analysis of groups II, III and IV.
import { sl, deck, table, flow, svgV, r, sci, dec } from './lib.mjs';
import { CI_PH, PH_SCALE, BUFFER_CURVE, KSP_BARS, AGCL_COMMON, QSP_LINE } from './svgs.mjs';
import { KA, KB, KSP, KH2S, Kw, pK, pH, hWeak, alphaWeak, hMix, ohMix, ohToPH, pHsawb, pHwasb, pHwawb, Kh, hDeg, hh, sAB, sAB2, kspAB2, Q, sH2S } from './data.mjs';

export const V = {
  ci: svgV(CI_PH, 'Bar chart of the pH of 0.10 molar ethanoic acid alone and with 0.10 and 0.50 molar sodium ethanoate added', 'The common ion raises the pH.'),
  scale: svgV(PH_SCALE, 'pH scale with ammonium chloride, sodium chloride, ammonium ethanoate, sodium ethanoate and ammonium cyanide marked', 'Salt solutions can be acidic, neutral or basic.'),
  curve: svgV(BUFFER_CURVE, 'Henderson curve of pH against the fraction of acid present as salt for an ethanoic acid buffer', 'Flattest near pH = pKa.'),
  kspb: svgV(KSP_BARS, 'Log scale bars of molar solubility of five salts with their Ksp', 'AB and AB2 salts cannot be ranked by Ksp alone.'),
  agcl: svgV(AGCL_COMMON, 'Log scale bars of the solubility of silver chloride in pure water and in sodium chloride solutions', 'More Cl⁻ means less AgCl dissolves.'),
  qsp: svgV(QSP_LINE, 'Number line of ionic product against solubility product with three regions', 'Precipitation needs Qsp > Ksp.'),
};

const f2 = (x) => x.toFixed(2);
const f1 = (x) => x.toFixed(1);
const ux = (x, n = 2) => {
  const e = Math.floor(Math.log10(x));
  const mm = x / 10 ** e;
  return `${mm.toFixed(n - 1)} × 10${String(e).replace('-', '⁻').replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}`;
};
const m = (x, n = 2) => `$${sci(x, n)}$`; // inline scientific number

// ---- worked-example numbers (all computed)
const ex1 = { ca: 0.05, cs: 0.2 };
ex1.h0 = hWeak(KA.acetic, ex1.ca);
ex1.pH0 = pH(ex1.h0);
ex1.a0 = alphaWeak(KA.acetic, ex1.ca) * 100;
ex1.h1 = hMix(KA.acetic, ex1.ca, ex1.cs);
ex1.pH1 = pH(ex1.h1);
ex1.a1 = (ex1.h1 / ex1.ca) * 100;
const nh = { cb: 0.1, cs: 0.25 };
nh.oh0 = Math.sqrt(KB.ammonia * nh.cb);
nh.pH0 = ohToPH(nh.oh0);
nh.oh1 = ohMix(KB.ammonia, nh.cb, nh.cs);
nh.pH1 = ohToPH(nh.oh1);
const h1 = { c: 0.2 };
h1.pH = pHwasb(h1.c, KA.acetic);
h1.Kh = Kh(Kw, KA.acetic);
h1.h = hDeg(h1.Kh, h1.c);
const h2 = { c: 0.05 };
h2.pH = pHsawb(h2.c, KB.ammonia);
h2.Kh = Kh(Kw, KB.ammonia);
h2.h = hDeg(h2.Kh, h2.c);
const wawb = { cn: pHwawb(KA.HCN, KB.ammonia), fo: pHwawb(KA.formic, KB.ammonia) };
const b1 = { pKa: pK(KA.acetic), acid: 0.3, salt: 0.12 };
b1.pH = hh(b1.pKa, b1.salt, b1.acid);
const b2 = { pKb: pK(KB.ammonia), base: 0.3, salt: 0.2 };
b2.pOH = hh(b2.pKb, b2.salt, b2.base);
b2.pH = 14 - b2.pOH;
const k1 = { s1: sAB(KSP.AgCl), s2: sAB2(KSP.CaF2) };
const gram = { w: 0.0161, M: 78 };
gram.s = gram.w / gram.M;
gram.ksp = kspAB2(gram.s);
const mixPb = { pb: 0.01, i: 5.0e-4 };
mixPb.q = Q(mixPb.pb, 1, mixPb.i, 2);
mixPb.q2 = Q(mixPb.pb, 1, 1.0e-3, 2);
const sel = { cl: 0.01, cro: 0.01 };
sel.agCl = KSP.AgCl / sel.cl;
sel.agCro = Math.sqrt(KSP.Ag2CrO4 / sel.cro);
sel.left = KSP.AgCl / sel.agCro;
const g2 = { H: 0.3 };
g2.S = sH2S(g2.H);
g2.cu = Q(0.01, 1, g2.S, 1);
g2.mn = Q(0.01, 1, g2.S, 1);
const g3 = { oh: ohMix(KB.ammonia, 0.1, 0.2), oh0: Math.sqrt(KB.ammonia * 0.1) };
g3.mg = Q(0.01, 1, g3.oh, 2);
g3.mg0 = Q(0.01, 1, g3.oh0, 2);
g3.fe = Q(0.01, 1, g3.oh, 3);

export const deck1 = deck({
  part: 1,
  title: 'Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product — Part 1: Common ion effect and hydrolysis of salts',
  goals: [
    'Explain the common ion effect on the ionisation of ethanoic acid and ammonium hydroxide, and its use in salt analysis',
    'Predict whether a salt solution is acidic, basic or neutral from the strengths of its parent acid and base',
    'Calculate the pH of salt solutions with the formulae for strong acid-weak base, weak acid-strong base and weak acid-weak base salts',
  ],
  slides: [
    sl('title', 'Shifting an ionic equilibrium', {
      b: 'Part 1: a weak electrolyte is in **equilibrium** with its ions. Adding an ion it shares, or letting a salt react with water, **moves that equilibrium**. We follow the effect on pH.',
      v: V.ci,
      n: 'In the last chapter you saw that a weak acid is only slightly ionised. Here we disturb that equilibrium. Adding a salt that supplies one of the same ions pushes the equilibrium back, and the acidity changes in a way we can predict and calculate.',
    }),
    sl('concept', 'The common ion effect', {
      b: r`The **common ion effect** is the suppression of the ionisation of a weak electrolyte by adding a strong electrolyte that supplies an ion **common** to it. For ethanoic acid with sodium ethanoate: $$\ce{CH3COOH <=> CH3COO- + H+}$$ Sodium ethanoate is fully ionised, so $[\ce{CH3COO-}]$ rises, the equilibrium shifts to the left (Le Chatelier) and $[\ce{H+}]$ falls.`,
      v: table(['Before adding salt', 'After adding sodium ethanoate'], [['Few CH3COO⁻ ions, from the acid only', 'Many CH3COO⁻ ions, from the salt'], ['Ionisation of the acid is small', 'Ionisation is pushed back further'], ['[H⁺] = √(Ka c)', '[H⁺] = Ka [acid] / [salt]'], ['pH moderate', 'pH higher']], 'Table comparing ethanoic acid alone and with sodium ethanoate added'),
      n: 'The common ion effect is Le Chatelier at work. Sodium ethanoate is fully ionised and floods the solution with ethanoate ions. The weak acid equilibrium shifts back toward the unionised acid, so the hydrogen ion concentration falls and the pH rises.',
    }),
    sl('concept', 'Quantitative picture: acid with its salt', {
      b: r`Let the acid be $c_a$ and the salt $c_s$ (mol L⁻¹). The salt supplies nearly all the anion, and the acid ionises so little that $[\text{acid}] \approx c_a$. Then $K_a = \dfrac{[\ce{H+}][\ce{A-}]}{[\text{HA}]} \approx \dfrac{[\ce{H+}]\,c_s}{c_a}$, so $$[\ce{H+}] = K_a\,\frac{c_a}{c_s}$$ The degree of ionisation of the acid falls sharply.`,
      v: table(['System', '[H⁺] formula', 'Effect'], [['Acid alone', '√(Ka c)', 'Degree of ionisation α = √(Ka / c)'], ['Acid + common-ion salt', 'Ka × c(acid) / c(salt)', 'α becomes tiny'], ['Doubling the salt', '[H⁺] halves', 'pH rises by 0.30']], 'Table of the hydrogen ion formulae for an acid alone and with a common ion salt'),
      n: 'Because the acid ionises so little, its concentration at equilibrium is almost its starting value. The salt supplies almost all the anion. Putting these into the equilibrium constant gives the hydrogen ion concentration as the acid dissociation constant times the ratio of acid to salt.',
    }),
    sl('example', 'Worked example: ethanoic acid with sodium ethanoate', {
      b: r`**Problem.** Find the pH of $0.050\ \text{M}$ ethanoic acid before and after dissolving enough sodium ethanoate to make it $0.20\ \text{M}$ in the salt ($K_a = 1.8 \times 10^{-5}$).

Alone: $[\ce{H+}] = \sqrt{K_a c} = \sqrt{1.8\times10^{-5}\times0.050} \approx ${sci(ex1.h0, 2)}$, so $\text{pH} \approx ${f2(ex1.pH0)}$ and $\alpha \approx ${f1(ex1.a0)}\%$.

With the salt: $[\ce{H+}] = K_a\,c_a/c_s = 1.8\times10^{-5}\times0.050/0.20 \approx ${sci(ex1.h1, 2)}$, so $\text{pH} \approx ${f2(ex1.pH1)}$ and $\alpha \approx ${ex1.a1.toFixed(3)}\%$.`,
      v: table(['Case', '[H⁺] / mol L⁻¹', 'pH', 'α'], [['Acid alone', dec(ex1.h0, 3), f2(ex1.pH0), `${f1(ex1.a0)} %`], ['With 0.20 M salt', dec(ex1.h1, 3), f2(ex1.pH1), `${ex1.a1.toFixed(3)} %`]], 'Table of hydrogen ion concentration, pH and degree of ionisation before and after adding the salt'),
      n: 'Alone, the acid gives a hydrogen ion concentration of about one in a thousand and a pH near three. With the salt added, the ratio of acid to salt is one to four, so the hydrogen ion concentration drops by a large factor and the pH jumps by more than two units. The degree of ionisation almost vanishes.',
    }),
    sl('check', 'Quick check: effect of a common ion', {
      b: 'Decide which way the equilibrium shifts and what happens to the pH.',
      n: 'Quick check. Read the situation in the question carefully and work out which ion is common to the weak electrolyte and the added salt. Then decide which way the equilibrium shifts, and use that to say how the hydrogen ion concentration and the pH change. Pick one option and compare it with the solution.',
      chk: 'chk-ci-mcq',
    }),
    sl('concept', 'Ammonium hydroxide with ammonium chloride', {
      b: r`$$\ce{NH4OH <=> NH4+ + OH-}$$ Ammonium chloride is fully ionised and adds $\ce{NH4+}$, so the equilibrium shifts left and $[\ce{OH-}]$ falls: $$[\ce{OH-}] = K_b\,\frac{c_b}{c_s}$$ Example: $0.10\ \text{M}$ NH₄OH ($K_b = 1.8 \times 10^{-5}$) has $\text{pH} \approx ${f2(nh.pH0)}$ alone but $\text{pH} \approx ${f2(nh.pH1)}$ with $0.25\ \text{M}$ NH₄Cl.`,
      v: table(['Solution', '[OH⁻] / mol L⁻¹', 'pOH', 'pH'], [['0.10 M NH₄OH alone', dec(nh.oh0, 3), f2(14 - nh.pH0), f2(nh.pH0)], ['+ 0.25 M NH₄Cl', dec(nh.oh1, 3), f2(14 - nh.pH1), f2(nh.pH1)]], 'Table showing hydroxide ion concentration and pH of ammonium hydroxide alone and with ammonium chloride'),
      n: 'The same idea works for a weak base. Ammonium chloride supplies ammonium ions, so the ionisation of ammonium hydroxide is pushed back. The hydroxide ion concentration falls and the solution becomes less basic. For a base we find the hydroxide concentration first, then the pOH, then the pH.',
    }),
    sl('concept', 'Use in salt analysis', {
      b: r`In qualitative analysis, cations are separated by **selective precipitation**. The common ion effect controls $[\ce{OH-}]$ and $[\ce{S^2-}]$ so that only the intended group precipitates:

- **Group III** ($\ce{Fe^3+}$, $\ce{Al^3+}$, $\ce{Cr^3+}$): NH₄Cl is added **before** NH₄OH. The common $\ce{NH4+}$ keeps $[\ce{OH-}]$ low, enough to precipitate the hydroxides of group III but not those of later groups.
- **Group II**: HCl suppresses ionisation of H₂S (common $\ce{H+}$), so only very insoluble sulphides precipitate.`,
      v: flow('LR', [['a', 'Add dilute HCl to the solution'], ['b', 'Group I chlorides precipitate'], ['c', 'H2S in acidic medium: group II sulphides'], ['d', 'Boil, add NH4Cl then NH4OH: group III hydroxides'], ['e', 'H2S in ammoniacal medium: group IV sulphides']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the order of precipitation of cation groups I to IV in qualitative analysis'),
      n: 'In qualitative analysis the cations are separated group by group. The common ion effect is the tool. Ammonium chloride keeps the hydroxide concentration low, so only the group three hydroxides come down. Hydrochloric acid keeps the sulphide concentration low, so only the group two sulphides come down.',
    }),
    sl('concept', 'Hydrolysis of salts', {
      b: r`**Hydrolysis** is the reaction of the **ions of a salt with water** that changes the $[\ce{H+}]$ or $[\ce{OH-}]$ of the solution. Only ions of a **weak** acid or a **weak** base react; ions of strong acids and bases (Na⁺, Cl⁻) do not. The solution is acidic, basic or neutral according to which parent is weak.`,
      v: table(['Salt type', 'Example', 'Ion that hydrolyses', 'Solution'], [['Strong acid + weak base', 'NH₄Cl', 'NH₄⁺', 'Acidic'], ['Weak acid + strong base', 'CH₃COONa', 'CH₃COO⁻', 'Basic'], ['Weak acid + weak base', 'CH₃COONH₄, NH₄CN', 'Both ions', 'Depends on Ka and Kb'], ['Strong acid + strong base', 'NaCl', 'None', 'Neutral']], 'Table of four types of salt with the ion that hydrolyses and the nature of the solution'),
      n: 'A salt is made from an acid and a base. If both are strong, nothing reacts with water and the solution is neutral. If one parent is weak, its ion takes a proton from water or gives one to water. That changes the pH. If both are weak, both ions react and the result depends on which parent is stronger.',
    }),
    sl('diagram', 'Where salt solutions fall on the pH scale', {
      b: 'Ammonium chloride is acidic; sodium ethanoate is basic; ammonium ethanoate is neutral because its parent acid and base are equally weak. Ammonium cyanide is basic: HCN is a **weaker acid** than NH₃ is a base.',
      v: V.scale,
      n: 'On the scale, ammonium chloride lies on the acidic side. Sodium ethanoate lies on the basic side. Ammonium ethanoate sits exactly at neutral because ethanoic acid and ammonia are equally weak. Ammonium cyanide is basic, because cyanide is a much stronger base than ammonium is an acid.',
    }),
    sl('concept', 'Strong acid and weak base: NH₄Cl', {
      b: r`$$\ce{NH4+ + H2O <=> NH3 + H3O+}$$ $K_h = \dfrac{K_w}{K_b}$, the degree of hydrolysis $h = \sqrt{K_h/c}$, $[\ce{H+}] = ch$ and $$\text{pH} = 7 - \tfrac12\left(\text{p}K_b + \log c\right)$$ The solution is **acidic**; dilution increases $h$.`,
      v: table(['Quantity', 'Formula', 'For 0.050 M NH₄Cl'], [['Kh', 'Kw / Kb', ux(h2.Kh)], ['h', '√(Kh / c)', dec(h2.h, 3)], ['pH', '7 − ½(pKb + log c)', f2(h2.pH)]], 'Table of hydrolysis constant, degree of hydrolysis and pH for ammonium chloride solution'),
      n: 'The ammonium ion acts as a weak acid and gives protons to water. The hydrolysis constant equals the ionic product of water divided by the base dissociation constant of ammonia. From it we get the degree of hydrolysis and the pH. The solution is acidic, and the pH falls as the solution is made more concentrated.',
    }),
    sl('concept', 'Weak acid and strong base: sodium ethanoate', {
      b: r`$$\ce{CH3COO- + H2O <=> CH3COOH + OH-}$$ $K_h = \dfrac{K_w}{K_a}$, $h = \sqrt{K_h/c}$, $[\ce{OH-}] = ch$ and $$\text{pH} = 7 + \tfrac12\left(\text{p}K_a + \log c\right)$$ The solution is **basic**.`,
      v: table(['Quantity', 'Formula', 'For 0.20 M CH₃COONa'], [['h', '√(Kw / (Ka c))', dec(h1.h, 3)], ['[OH⁻]', 'c h', dec(h1.c * h1.h, 3)], ['pH', '7 + ½(pKa + log c)', f2(h1.pH)]], 'Table of degree of hydrolysis, hydroxide ion concentration and pH for sodium ethanoate solution'),
      n: 'Now the ethanoate ion takes a proton from water and leaves hydroxide ions behind. The hydrolysis constant is the ionic product of water divided by the acid dissociation constant of ethanoic acid. The pH is above seven, and the formula has a plus sign in front of the half.',
    }),
    sl('example', 'Worked example: pH of two salt solutions', {
      b: r`**Problem.** Find the pH of (a) $0.20\ \text{M}$ sodium ethanoate and (b) $0.050\ \text{M}$ ammonium chloride. $K_a = K_b = 1.8\times10^{-5}$, so $\text{p}K = ${f2(pK(KA.acetic))}$.

(a) Weak acid, strong base: $\text{pH} = 7 + \tfrac12(${f2(pK(KA.acetic))} + \log 0.20) = 7 + \tfrac12(${f2(pK(KA.acetic))} - 0.70) \approx ${f2(h1.pH)}$.

(b) Strong acid, weak base: $\text{pH} = 7 - \tfrac12(${f2(pK(KB.ammonia))} + \log 0.050) = 7 - \tfrac12(${f2(pK(KB.ammonia))} - 1.30) \approx ${f2(h2.pH)}$.`,
      v: table(['Salt', 'Type', 'pH', 'Nature'], [['0.20 M CH₃COONa', 'WA-SB', f2(h1.pH), 'Basic'], ['0.050 M NH₄Cl', 'SA-WB', f2(h2.pH), 'Acidic']], 'Table of the pH and nature of sodium ethanoate and ammonium chloride solutions'),
      n: 'For sodium ethanoate, the parent acid is weak and the base is strong, so use the plus formula. The logarithm of the concentration is negative, which lowers the bracket, and the pH comes out near nine. For ammonium chloride we use the minus formula, and the pH comes out a little above five.',
    }),
    sl('check', 'Quick check: acidic, basic or neutral?', {
      b: 'Identify the weak parent and use the matching formula.',
      n: 'Quick check. Look at the salt named in the question and work out the acid and the base it comes from. Decide whether each parent is strong or weak, and use that to judge whether the solution is acidic, basic or neutral. Then say whether the statement is true or false and why.',
      chk: 'chk-hyd-tf',
    }),
    sl('concept', 'Weak acid and weak base', {
      b: r`Both ions hydrolyse, and the pH is **independent of the concentration**: $$\text{pH} = 7 + \tfrac12\left(\text{p}K_a - \text{p}K_b\right)$$ If $K_a = K_b$ the solution is neutral; if $K_a > K_b$ acidic; if $K_a < K_b$ basic. Ammonium cyanide: $\text{p}K_a(\text{HCN}) = ${f2(pK(KA.HCN))}$, $\text{p}K_b(\text{NH}_3) = ${f2(pK(KB.ammonia))}$, so $\text{pH} \approx ${f2(wawb.cn)}$.`,
      v: table(['Salt', 'pKa', 'pKb', 'pH', 'Nature'], [['CH₃COONH₄', f2(pK(KA.acetic)), f2(pK(KB.ammonia)), '7.00', 'Neutral'], ['NH₄CN', f2(pK(KA.HCN)), f2(pK(KB.ammonia)), f2(wawb.cn), 'Basic'], ['HCOONH₄', f2(pK(KA.formic)), f2(pK(KB.ammonia)), f2(wawb.fo), 'Slightly acidic']], 'Table of three weak acid weak base salts with pKa, pKb, pH and nature'),
      n: 'When both parents are weak, both ions react. Strangely, the concentration drops out of the pH formula. The pH depends only on the difference between the two pK values. Equal strengths give neutral. A stronger acid gives an acidic solution, and a stronger base gives a basic one.',
    }),
    sl('check', 'Quick check: pH of a salt solution', {
      b: 'Choose the correct formula, then calculate.',
      n: 'Quick check. First decide which type of salt is in the question, by looking at the strength of its parent acid and parent base. Then write down the pH formula that fits that type, put in the values of the dissociation constant and the concentration, and work out the answer step by step.',
      chk: 'chk-hyd-num',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Common ion effect: a strong electrolyte with a common ion suppresses ionisation of a weak one; [H⁺] = Ka × c(acid) / c(salt) and [OH⁻] = Kb × c(base) / c(salt).',
        'In analysis, NH₄Cl before NH₄OH keeps [OH⁻] low (group III) and HCl keeps [S²⁻] low (group II).',
        'Hydrolysis: only ions of weak acids or weak bases react; Kh = Kw / K of the weak parent.',
        'SA-WB: pH = 7 − ½(pKb + log c). WA-SB: pH = 7 + ½(pKa + log c). WA-WB: pH = 7 + ½(pKa − pKb).',
      ],
      v: table(['Salt of', 'pH formula', 'Nature'], [['SA + WB', '7 − ½(pKb + log c)', 'Acidic'], ['WA + SB', '7 + ½(pKa + log c)', 'Basic'], ['WA + WB', '7 + ½(pKa − pKb)', 'Depends'], ['SA + SB', '7', 'Neutral']], 'Summary table of pH formulae for four types of salt'),
      n: 'Let us sum up Part One. A common ion suppresses the ionisation of a weak acid or base. In salt analysis this controls which group precipitates. Salts of weak acids or bases hydrolyse. We have three formulae for the pH, one for each type of salt, and the weak acid weak base case does not depend on concentration.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Name the common ion and say which way the equilibrium shifts (Le Chatelier) before giving any numbers.',
        'For a base work out [OH⁻] first, then pOH, then pH = 14 − pOH.',
        'Write the hydrolysis equation of the ion that reacts, with H₂O, before stating acidic or basic.',
        'Match the formula to the salt type: a minus sign for the weak-base salt, a plus sign for the weak-acid salt.',
        'State the constants used (Ka, Kb, Kw) and the assumption that α is small.',
      ],
      v: table(['Slip', 'Fix'], [['Calling NaCl solution acidic because HCl is an acid', 'Both parents are strong: neutral'], ['Using [H⁺] = √(Ka c) when salt is present', 'Use Ka × c(acid) / c(salt)'], ['Swapping the signs of the two hydrolysis formulae', 'Weak base salt acidic: minus; weak acid salt basic: plus']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips for Part One. Always name the common ion and the direction of the shift. For a base, find the hydroxide concentration first. Write the hydrolysis equation of the ion that reacts. Match the sign in the formula to the type of salt, and state your constants and assumptions.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product — Part 2: Buffers and solubility product',
  goals: [
    'Explain buffer action by Le Chatelier\'s principle and calculate buffer pH with the Henderson equation',
    'Calculate solubility from Ksp and Ksp from solubility, and decide on precipitation from the ionic product',
    'Explain the use of common ion effect and Ksp in the separation of group II, III and IV cations',
  ],
  slides: [
    sl('title', 'Buffers and sparingly soluble salts', {
      b: 'Part 2: solutions that **resist a change of pH**, and salts that dissolve only slightly, where an equilibrium constant, **Ksp**, decides whether a solid forms.',
      v: table(['Topic', 'Key idea'], [['Buffer', 'Weak acid + its salt, or weak base + its salt'], ['Henderson equation', 'pH = pKa + log([salt]/[acid])'], ['Solubility product', 'Ksp = product of ion concentrations at saturation'], ['Precipitation', 'Qsp > Ksp']], 'Table of the four key ideas of Part 2'),
      n: 'In this part we use equilibrium for two practical ends. First, buffers: solutions that hold their pH steady. Second, sparingly soluble salts, where the solubility product tells us how much dissolves and whether a precipitate will form.',
    }),
    sl('concept', 'What is a buffer?', {
      b: 'A **buffer solution** resists a change in pH when small amounts of acid or base are added, or on dilution. It contains a weak acid and its conjugate base, or a weak base and its conjugate acid, in comparable amounts.',
      v: table(['Type', 'Made from', 'Example', 'pH range'], [['Acidic buffer', 'Weak acid + its salt with a strong base', 'CH₃COOH + CH₃COONa', 'Below 7'], ['Basic buffer', 'Weak base + its salt with a strong acid', 'NH₄OH + NH₄Cl', 'Above 7']], 'Table of acidic and basic buffers with composition, example and pH range'),
      n: 'A buffer needs two partners. One partner can neutralise added acid, and the other can neutralise added base. An acidic buffer is a weak acid with its salt. A basic buffer is a weak base with its salt. Plain water or a strong acid solution has no such ability.',
    }),
    sl('concept', 'How a buffer works: Le Chatelier\'s principle', {
      b: r`In $\ce{CH3COOH <=> CH3COO- + H+}$ with plenty of $\ce{CH3COO-}$ (from the salt) and plenty of unionised acid:

- **Add H⁺ (acid):** the equilibrium shifts left; $\ce{CH3COO-}$ takes up the $\ce{H+}$ to form $\ce{CH3COOH}$.
- **Add OH⁻ (base):** $\ce{OH-}$ removes $\ce{H+}$; the equilibrium shifts right, as CH₃COOH ionises to replace it.

The ratio $[\text{salt}]/[\text{acid}]$ changes only slightly, so the pH barely moves.`,
      v: flow('LR', [['a', 'Add H+'], ['b', 'Reacts with CH3COO- (salt)'], ['c', 'Forms CH3COOH'], ['d', 'Ratio salt/acid changes slightly'], ['e', 'pH nearly constant']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the action of an acidic buffer on adding a small amount of acid'),
      n: 'Think of the salt as a store of base and the acid as a store of acid. Added acid is mopped up by the ethanoate ions. Added base is neutralised by the acid, which ionises to replace what was lost. Either way the ratio of salt to acid shifts only a little, so the pH hardly moves.',
    }),
    sl('diagram', 'The Henderson equation', {
      b: r`From $K_a = \dfrac{[\ce{H+}][\ce{A-}]}{[\text{HA}]}$, taking logs: $$\text{pH} = \text{p}K_a + \log\frac{[\text{salt}]}{[\text{acid}]} \qquad \text{pOH} = \text{p}K_b + \log\frac{[\text{salt}]}{[\text{base}]}$$ pH $=$ p$K_a$ when the two are equal; a buffer works best for a ratio between $0.1$ and $10$, that is pH $=$ p$K_a \pm 1$.`,
      v: V.curve,
      n: 'Take logarithms of the acid dissociation constant expression and you get the Henderson equation. The pH equals the pK of the acid plus the logarithm of the ratio of salt to acid. The curve is flattest near the middle, where equal amounts are present, and a buffer is effective within one unit either side.',
    }),
    sl('example', 'Worked example: buffer pH', {
      b: r`**Problem.** Find the pH of (a) a buffer with $0.30\ \text{M}$ ethanoic acid and $0.12\ \text{M}$ sodium ethanoate; (b) a buffer with $0.30\ \text{M}$ NH₄OH and $0.20\ \text{M}$ NH₄Cl. ($\text{p}K_a = \text{p}K_b = ${f2(b1.pKa)}$)

(a) $\text{pH} = ${f2(b1.pKa)} + \log\dfrac{0.12}{0.30} = ${f2(b1.pKa)} - 0.40 \approx ${f2(b1.pH)}$.

(b) $\text{pOH} = ${f2(b2.pKb)} + \log\dfrac{0.20}{0.30} = ${f2(b2.pKb)} - 0.18 \approx ${f2(b2.pOH)}$, so $\text{pH} = 14 - ${f2(b2.pOH)} \approx ${f2(b2.pH)}$.`,
      v: table(['Buffer', 'Ratio salt : weak', 'pH'], [['CH₃COOH 0.30 M + CH₃COONa 0.12 M', '0.40', f2(b1.pH)], ['NH₄OH 0.30 M + NH₄Cl 0.20 M', '0.67', f2(b2.pH)]], 'Table of the ratio and pH of an acidic and a basic buffer'),
      n: 'For the acidic buffer the ratio of salt to acid is below one, so the logarithm is negative and the pH falls a little below the pK. For the basic buffer we first get the pOH the same way, then subtract from fourteen to find the pH. Always check that the answer is on the correct side of seven.',
    }),
    sl('check', 'Quick check: choosing a buffer', {
      b: 'Match the target pH to the pKa and the ratio.',
      n: 'Quick check. A buffer works best when its pH is within one unit of the pK of the weak acid it contains. Compare the pH required in the question with the pK values you are given, and decide which pair of substances would make the most suitable buffer for that pH.',
      chk: 'chk-buf-mcq',
    }),
    sl('concept', 'Solubility and solubility product', {
      b: r`In a saturated solution of a sparingly soluble salt, solid and ions are in equilibrium, e.g. $\ce{AgCl(s) <=> Ag+ + Cl-}$. The **solubility product** is $K_{sp} = [\ce{Ag+}][\ce{Cl-}]$ (the solid is left out). **Solubility** $s$ is the amount dissolved in mol L⁻¹.`,
      v: table(['Salt type', 'Example', 'Ksp in terms of s', 's from Ksp'], [['AB', 'AgCl, BaSO₄', 's²', '√Ksp'], ['AB₂', 'PbI₂, CaF₂, Mg(OH)₂', '4s³', '(Ksp / 4)^(1/3)'], ['A₂B', 'Ag₂CrO₄', '4s³', '(Ksp / 4)^(1/3)']], 'Table of salt types, Ksp in terms of molar solubility and solubility from Ksp'),
      n: 'For a saturated solution, the product of the ion concentrations, each raised to its coefficient, is the solubility product. A salt of the form A B gives Ksp equal to s squared. Salts of the form A B two or A two B give Ksp equal to four s cubed, because one ion has twice the concentration.',
    }),
    sl('diagram', 'Comparing solubilities', {
      b: 'Compare salts of the **same type** by Ksp. Between types you must convert to **s**: CaF₂ has a smaller Ksp than AgCl but dissolves more, because it is an AB₂ salt.',
      v: V.kspb,
      n: 'This chart puts five salts on one scale. Calcium fluoride has a smaller solubility product than silver chloride, yet more of it dissolves. That is because the cube root is taken for a salt that gives three ions. So rank by Ksp only within the same type, otherwise convert to molar solubility.',
    }),
    sl('example', 'Worked example: s from Ksp and Ksp from s', {
      b: r`**(a)** $K_{sp}(\ce{PbI2}) = 7.1\times10^{-9}$. AB₂ type: $s = \left(\dfrac{K_{sp}}{4}\right)^{1/3} \approx ${sci(sAB2(KSP.PbI2), 2)}$ mol L⁻¹.

**(b)** Solubility of $\ce{CaF2}$ is $0.0161\ \text{g L}^{-1}$ (given), $M = 78\ \text{g mol}^{-1}$: $s = 0.0161/78 \approx ${sci(gram.s, 2)}$ mol L⁻¹. Then $K_{sp} = 4s^3 \approx ${sci(gram.ksp, 2)}$.`,
      v: table(['Step', 'PbI₂ (a)', 'CaF₂ (b)'], [['Type', 'AB₂', 'AB₂'], ['Given', 'Ksp = 7.1 × 10⁻⁹', 's = 0.0161 g/L'], ['Convert', '—', 's = 2.06 × 10⁻⁴ mol/L'], ['Result', 's = 1.21 × 10⁻³ mol/L', 'Ksp = 3.5 × 10⁻¹¹']], 'Table of the steps for finding solubility from Ksp and Ksp from solubility'),
      n: 'In part a, lead iodide is of the A B two type, so divide the solubility product by four and take the cube root. In part b we are given the solubility in grams per litre. Convert it to moles per litre by dividing by the molar mass, then put it into four s cubed to get the solubility product.',
    }),
    sl('diagram', 'Will a precipitate form?', {
      b: r`The **ionic product** $Q_{sp}$ has the same form as $K_{sp}$ but uses the **actual** concentrations after mixing (remember dilution). $Q_{sp} < K_{sp}$: no precipitate. $Q_{sp} > K_{sp}$: precipitate forms.`,
      v: V.qsp,
      n: 'The ionic product is calculated from the concentrations actually present. If it is below the solubility product, the solution is unsaturated and nothing precipitates. If it exceeds the solubility product, the solution is supersaturated and the salt precipitates until the ionic product falls back to equilibrium.',
    }),
    sl('example', 'Worked example: mixing two solutions', {
      b: r`$50\ \text{mL}$ of $0.020\ \text{M}$ $\ce{Pb(NO3)2}$ is mixed with $50\ \text{mL}$ of $1.0\times10^{-3}\ \text{M}$ KI. After mixing the volume doubles: $[\ce{Pb^2+}] = 0.010$, $[\ce{I-}] = 5.0\times10^{-4}$. $$Q_{sp} = [\ce{Pb^2+}][\ce{I-}]^2 \approx ${sci(mixPb.q, 2)}$$ Since $Q_{sp} < K_{sp} = 7.1\times10^{-9}$, **no precipitate** forms. With $2.0\times10^{-3}\ \text{M}$ KI, $Q_{sp} \approx ${sci(mixPb.q2, 2)} > K_{sp}$: PbI₂ precipitates.`,
      v: table(['KI used', '[I⁻] after mixing', 'Qsp', 'Result'], [['1.0 × 10⁻³ M', '5.0 × 10⁻⁴ M', ux(mixPb.q), 'No precipitate'], ['2.0 × 10⁻³ M', '1.0 × 10⁻³ M', ux(mixPb.q2), 'Precipitate']], 'Table of ionic products and results for two mixtures of lead nitrate and potassium iodide'),
      n: 'First halve each concentration, because the volume doubles on mixing. Then square the iodide concentration, multiply by the lead concentration, and compare with the solubility product. The first mixture falls just short, so nothing forms. Doubling the iodide pushes the product over the limit and lead iodide precipitates.',
    }),
    sl('check', 'Quick check: solubility product', {
      b: 'Decide the salt type, then apply the right relation.',
      n: 'Quick check. Work out which type of salt is in the question, remembering that a salt giving two ions behaves differently from one giving three. Choose the matching relation between solubility and solubility product, put in the data carefully, and calculate the answer in the units the question asks for.',
      chk: 'chk-ksp-num',
    }),
    sl('diagram', 'Common ion lowers solubility', {
      b: r`In a solution already containing $\ce{Cl-}$ at concentration $c$, $s \approx K_{sp}/c$ for AgCl. In $0.10\ \text{M}$ NaCl: $s = 1.8\times10^{-10}/0.10 = ${sci(KSP.AgCl / 0.1, 2)}$ mol L⁻¹, against $${sci(sAB(KSP.AgCl), 2)}$ in water.`,
      v: V.agcl,
      n: 'A common ion lowers solubility. In water, silver chloride dissolves to about one point three times ten to the minus five mole per litre. In a solution that already contains chloride ions, the silver ion concentration must be very small to keep the ionic product at the solubility product, so far less dissolves.',
    }),
    sl('concept', 'Selective precipitation', {
      b: r`When two ions can both precipitate with the same reagent, the salt needing the **smaller** ion concentration of the reagent precipitates first. For $0.010\ \text{M}$ Cl⁻ and $0.010\ \text{M}$ CrO₄²⁻ with Ag⁺ added: AgCl needs $[\ce{Ag+}] = ${sci(sel.agCl, 2)}$; Ag₂CrO₄ needs $${sci(sel.agCro, 2)}$. AgCl goes first, and when chromate begins to precipitate only $[\ce{Cl-}] \approx ${sci(sel.left, 2)}$ M remains.`,
      v: table(['Salt', 'Ksp', 'Ag⁺ needed (0.010 M anion)', 'Order'], [['AgCl', '1.8 × 10⁻¹⁰', ux(sel.agCl), 'First'], ['Ag₂CrO₄', '1.1 × 10⁻¹²', ux(sel.agCro), 'Second']], 'Table showing the silver ion concentration needed to precipitate silver chloride and silver chromate'),
      n: 'Selective precipitation is the idea behind group separation. Add silver ions slowly to chloride and chromate. Silver chloride needs only a tiny silver ion concentration, so it forms first. By the time silver chromate starts, almost all the chloride has already been removed from solution.',
    }),
    sl('concept', 'Group II: sulphides in acidic medium', {
      b: r`$\ce{H2S}$ ionises in two steps; $[\ce{S^2-}] = \dfrac{K_{a1}K_{a2}[\ce{H2S}]}{[\ce{H+}]^2}$ (saturated H₂S $= 0.10$ M; $K_{a1}K_{a2} = 1.2\times10^{-20}$, given). In $0.30\ \text{M}$ HCl: $[\ce{S^2-}] \approx ${sci(g2.S, 2)}$ M. With $0.010\ \text{M}$ cations, $Q_{sp} \approx ${sci(g2.cu, 2)}$ exceeds $K_{sp}$ of CuS ($6\times10^{-36}$, given) but is far below $K_{sp}$ of MnS ($2.5\times10^{-10}$, given): **CuS precipitates, MnS does not**.`,
      v: table(['Medium', '[H⁺]', '[S²⁻]', 'Result'], [['Dilute HCl', '0.30 M', ux(g2.S), 'Group II (CuS, CdS, PbS) precipitate'], ['Ammoniacal', '10⁻⁹ M (pH 9)', ux(sH2S(1e-9)), 'Group IV (ZnS, MnS, NiS, CoS) precipitate']], 'Table of sulphide ion concentration in acidic and ammoniacal media and the groups that precipitate'),
      n: 'Hydrogen sulphide is a weak acid. Adding hydrochloric acid supplies hydrogen ions, which is a common ion effect that holds the sulphide concentration extremely low. Only the sulphides with very tiny solubility products, the group two sulphides, can exceed their limit. The others stay dissolved.',
    }),
    sl('concept', 'Groups III and IV with NH₄Cl and NH₄OH', {
      b: r`Group III: with $0.10\ \text{M}$ NH₄OH and $0.20\ \text{M}$ NH₄Cl, $[\ce{OH-}] = ${sci(g3.oh, 2)}$. For $0.010\ \text{M}$ cations: $Q_{sp}(\ce{Mg(OH)2}) \approx ${sci(g3.mg, 2)} < 1.8\times10^{-11}$ (no precipitate), but $Q_{sp}(\ce{Fe(OH)3}) \approx ${sci(g3.fe, 2)} \gg 4\times10^{-38}$ (precipitates). Without NH₄Cl, $[\ce{OH-}] \approx ${sci(g3.oh0, 2)}$ and $Q_{sp}(\ce{Mg(OH)2}) \approx ${sci(g3.mg0, 2)}$ would exceed Ksp. Group IV: after removing group III, H₂S in **ammoniacal** medium raises $[\ce{S^2-}]$ (NH₄OH removes H⁺).`,
      v: table(['Group', 'Reagent', 'Why the medium matters'], [['III (Fe³⁺, Al³⁺, Cr³⁺)', 'NH₄Cl, then NH₄OH', 'NH₄⁺ keeps [OH⁻] low, so only the very insoluble hydroxides precipitate'], ['IV (Zn²⁺, Mn²⁺, Ni²⁺, Co²⁺)', 'H₂S + NH₄OH', 'OH⁻ removes H⁺: [S²⁻] rises so the more soluble sulphides precipitate']], 'Table of groups III and IV with reagents and the reason for the medium'),
      n: 'For group three, ammonium chloride keeps the hydroxide concentration so low that magnesium hydroxide stays in solution but iron three hydroxide, with a minute solubility product, still precipitates. For group four, ammonium hydroxide removes hydrogen ions, which raises the sulphide concentration enough for the more soluble sulphides to come down.',
    }),
    sl('check', 'Quick check: group separation', {
      b: 'Think about which ion the added reagent has in common.',
      n: 'Quick check. Think about the reagent added in the question and which ion it has in common with the equilibrium that makes the precipitating ion. Decide how that common ion changes the concentration of the sulphide or hydroxide ion, and then pick the reason that explains the choice of medium.',
      chk: 'chk-grp-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Buffer: weak acid + its salt (or weak base + its salt); resists pH change by Le Chatelier shifts; best when salt : acid is 0.1 to 10.',
        'Henderson: pH = pKa + log([salt]/[acid]); pOH = pKb + log([salt]/[base]).',
        'Ksp = s² for AB; 4s³ for AB₂ and A₂B. Precipitation occurs when Qsp > Ksp (use concentrations after mixing).',
        'A common ion lowers solubility; the salt needing the smaller reagent concentration precipitates first.',
        'Analysis: group II in acidic medium (low [S²⁻]), group III with NH₄Cl + NH₄OH (low [OH⁻]), group IV in ammoniacal medium (higher [S²⁻]).',
      ],
      v: table(['Idea', 'Key fact'], [['Buffer pH', 'pKa + log(salt/acid)'], ['AB salt', 's = √Ksp'], ['AB₂ salt', 's = (Ksp/4)^(1/3)'], ['Precipitate', 'Qsp > Ksp']], 'Summary table of the key results of Part 2'),
      n: 'Let us sum up Part Two. A buffer holds its pH by shifting an equilibrium, and the Henderson equation gives its pH. The solubility product gives the solubility, with a different relation for each salt type. A precipitate forms when the ionic product exceeds the solubility product. Common ions let us separate the cation groups.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Show the Henderson equation, the ratio, then the log; check that pH is near pKa.',
        'Write Ksp for the actual salt, with powers equal to the coefficients, before substituting s.',
        'After mixing, halve the concentrations if equal volumes are mixed, then compare Qsp with Ksp.',
        'In a common-ion solution, use the common ion concentration from the added salt, not from the solid.',
        'Give the reason for each medium in group analysis: the common ion that controls [OH⁻] or [S²⁻].',
      ],
      v: table(['Slip', 'Fix'], [['Using s² for Ca(OH)₂-type salts', 'AB₂: Ksp = 4s³'], ['Forgetting dilution on mixing', 'Concentration after mixing = c × V / (V₁ + V₂)'], ['Saying "acid is added to precipitate group II"', 'HCl lowers [S²⁻] by the common-ion effect on H₂S']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips for Part Two. Write the Henderson equation first and check that the answer is close to the pK. Write the solubility product expression for the real salt. After mixing, allow for dilution. In a common ion solution, take the ion concentration from the added salt, and always give the reason for the medium in group analysis.',
    }),
  ],
});
