// ISC 11 Chemistry ch15: objective items (mcq, assertion-reason, true-false, fill-blank, match, numerical).
// Constants: Kw = 1.0e-14; Ka(ethanoic) = Kb(ammonia) = 1.8e-5; Ka(methanoic) = 1.8e-4; Ka(HCN) = 4.9e-10; Ksp values as in data.mjs.
// Assertion-reason keys: a b c d a b.
import { mk, add, r, near, sci, dec } from './lib.mjs';
import { KA, KB, KSP, Kw, pK, pH, hWeak, hMix, ohMix, ohToPH, pHsawb, pHwasb, pHwawb, Kh, hh, sAB, sAB2, kspAB, kspAB2, Q } from './data.mjs';

const { mcq, ar, tf, fill, match, num } = mk;
const f2 = (x) => x.toFixed(2);
const m = (x, n = 2) => `$${sci(x, n)}$`;
const sc = (x, n = 2) => `${sci(x, n)}`;
/** Plain unicode scientific notation for option texts. */
const u = (x, n = 2) => {
  const e = Math.floor(Math.log10(x));
  return `${(x / 10 ** e).toFixed(n - 1)} × 10${String(e).replace('-', '⁻').replace(/\d/g, (d) => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d])}`;
};

// ---------------------------------------------------------------- t01 common ion effect
add('chk-ci-mcq', (() => {
  const c = 0.1;
  return mcq({
    stem: 'A technician at a dye works adds solid sodium methanoate to a beaker of 0.10 M methanoic acid, HCOOH, and stirs until it dissolves. What happens?',
    right: 'The equilibrium of the acid shifts towards unionised HCOOH, so [H⁺] falls and the pH rises',
    wrong: ['The equilibrium shifts towards ionisation, so [H⁺] rises and the pH falls', 'The ionisation constant of the acid increases, so the pH falls', 'The salt hydrolyses and raises [H⁺], so the pH falls'],
    sol: 'HCOONa is fully ionised and adds HCOO⁻, a common ion. By Le Chatelier\'s principle the equilibrium HCOOH ⇌ HCOO⁻ + H⁺ shifts left, so [H⁺] falls and the pH rises. The constant Ka depends only on temperature — option (@K).',
    d: 2, c: 'application', t: [1],
  });
})());
add('ci-nh-mcq', mcq({
  stem: 'A student dissolves solid ammonium chloride in a flask of aqueous ammonia (ammonium hydroxide). Compared with the ammonia solution alone, the solution then has:',
  right: 'a lower [OH⁻] and a lower pH, because NH₄⁺ suppresses the ionisation of NH₄OH',
  wrong: ['a higher [OH⁻], because the salt is a source of hydroxide ions', 'the same [OH⁻], because NH₄Cl is neutral', 'a lower [OH⁻], because Kb of ammonia decreases'],
  sol: 'NH₄Cl is fully ionised and supplies NH₄⁺, which is common to the equilibrium NH₄OH ⇌ NH₄⁺ + OH⁻. The equilibrium shifts left, so [OH⁻] and the pH fall. Kb is unchanged — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ci-num-mcq', (() => {
  const ca = 0.2;
  const cs = 0.8;
  const h = hMix(KA.formic, ca, cs);
  const p = pH(h);
  const alone = pH(hWeak(KA.formic, ca));
  return mcq({
    stem: `A buffer-making exercise uses ${ca.toFixed(2)} M methanoic acid (Ka = 1.8 × 10⁻⁴) together with ${cs.toFixed(2)} M sodium methanoate. The pH of the mixture is nearest to:`,
    right: f2(p),
    wrong: [f2(alone), f2(p + 0.6), f2(p - 1)],
    sol: String.raw`$[\ce{H+}] = K_a\,c_a/c_s = 1.8\times10^{-4}\times${ca}/${cs} = ${sc(h, 2)}$, so $\text{pH} = -\log(${sc(h, 2)}) \approx ${f2(p)}$ — option (@K). Without the salt, $\sqrt{K_a c} $ would give pH ${f2(alone)}.`,
    d: 3, c: 'application', t: [1],
  });
})(), () => near(pH(1.8e-4 * 0.2 / 0.8), 4.35, 0.003) || 'ci-num');
add('ci-alpha-mcq', mcq({
  stem: 'Four 0.10 M solutions of ammonium hydroxide are prepared: in pure water, in 0.10 M NaCl, in 0.10 M NH₄Cl and in 0.10 M HCl (the last in a limited amount). In which does NH₄OH show the smallest degree of ionisation?',
  right: 'In the solution containing 0.10 M NH₄Cl',
  wrong: ['In pure water', 'In the solution containing 0.10 M NaCl', 'In the solution containing HCl'],
  sol: 'Only NH₄Cl supplies an ion (NH₄⁺) common with the base, so only it pushes the equilibrium back and lowers ionisation. NaCl has no common ion, and HCl removes OH⁻ and so increases ionisation — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('ci-anal-mcq', mcq({
  stem: 'In the analysis of group III cations, solid ammonium chloride is added to the filtrate before ammonium hydroxide. Its purpose is to:',
  right: 'lower [OH⁻] through the common ion effect, so that only the hydroxides of group III precipitate',
  wrong: ['raise [OH⁻] so that all hydroxides precipitate', 'make the solution acidic so that sulphides do not form', 'precipitate group III cations as chlorides'],
  sol: 'NH₄⁺ from NH₄Cl suppresses the ionisation of NH₄OH, so [OH⁻] is low. Then Qsp exceeds Ksp only for the very insoluble hydroxides of group III, not for Mg(OH)₂ and later groups — option (@K).',
  d: 2, c: 'understanding', t: [1, 4],
}));

// ---------------------------------------------------------------- t02 hydrolysis
add('hyd-nature-mcq', mcq({
  stem: 'A fertiliser shop sells ammonium nitrate. A solution of this salt in water is:',
  right: 'acidic, because NH₄⁺ hydrolyses while NO₃⁻ does not',
  wrong: ['basic, because NH₄⁺ gives OH⁻ ions with water', 'neutral, because both ions come from strong electrolytes', 'neutral, because NO₃⁻ hydrolyses to the same extent as NH₄⁺'],
  sol: 'NH₄NO₃ is a salt of the strong acid HNO₃ and the weak base NH₄OH. NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺ makes the solution acidic; NO₃⁻ does not hydrolyse — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('hyd-kh-mcq', (() => {
  const kh = Kh(Kw, KA.formic);
  return mcq({
    stem: `The hydrolysis constant of the methanoate ion in a solution of sodium methanoate (Ka of methanoic acid = 1.8 × 10⁻⁴, Kw = 1.0 × 10⁻¹⁴) is:`,
    right: u(kh),
    wrong: ['1.8 × 10⁻¹⁸', '1.8 × 10⁻¹⁰', '1.8 × 10⁻⁴'],
    sol: String.raw`$K_h = K_w/K_a = 1.0\times10^{-14}/1.8\times10^{-4} \approx ${sc(kh, 2)}$ — option (@K).`,
    d: 2, c: 'understanding', t: [2],
  });
})(), () => near(1e-14 / 1.8e-4, 5.6e-11, 0.01) || 'hyd-kh');
add('hyd-ph-mcq', (() => {
  const c = 0.1;
  const p = pHwasb(c, KA.HCN);
  return mcq({
    stem: `A student prepares ${c.toFixed(2)} M sodium cyanide for an electroplating demonstration (Ka of HCN = 4.9 × 10⁻¹⁰). The pH of the solution is about:`,
    right: f2(p),
    wrong: [f2(pK(KA.HCN)), f2(14 - p), f2(p + 0.5)],
    sol: String.raw`NaCN is the salt of a weak acid and a strong base, so $\text{pH} = 7 + \tfrac12(\text{p}K_a + \log c) = 7 + \tfrac12(${f2(pK(KA.HCN))} - 1) \approx ${f2(p)}$ — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => near(pHwasb(0.1, 4.9e-10), 11.16, 0.003) || 'hyd-ph');
add('hyd-wawb-mcq', mcq({
  stem: 'Two solutions of ammonium methanoate (the salt of HCOOH, Ka = 1.8 × 10⁻⁴, and NH₄OH, Kb = 1.8 × 10⁻⁵) are prepared, one 0.10 M and one 0.0010 M. Which statement is correct?',
  right: 'Both have the same pH, about 6.5, and both are slightly acidic',
  wrong: ['The 0.0010 M solution has the higher pH, because hydrolysis is greater on dilution', 'Both have pH 7, because Ka and Kb are close in value', 'The 0.10 M solution has the lower pH, because it has more ammonium ions'],
  sol: 'For a weak acid–weak base salt, pH = 7 + ½(pKa − pKb) = 7 + ½(3.74 − 4.74) = 6.5, independent of concentration. Since Ka > Kb the solution is slightly acidic — option (@K).',
  d: 4, c: 'analysis', t: [2],
}));
add('hyd-dil-mcq', mcq({
  stem: 'A 0.10 M solution of sodium ethanoate is diluted to ten times its volume. Which pair of changes occurs?',
  right: 'The degree of hydrolysis increases and the pH decreases',
  wrong: ['The degree of hydrolysis decreases and the pH increases', 'The degree of hydrolysis increases and the pH increases', 'Both remain unchanged, because Kh is a constant'],
  sol: 'h = √(Kh/c), so h rises by √10 on dilution. But [OH⁻] = ch falls, so the solution is less basic: the pH decreases (by 0.5 unit from pH = 7 + ½(pKa + log c)) — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 buffers
add('buf-ident-mcq', mcq({
  stem: 'Which of these mixtures can act as an acidic buffer?',
  right: 'Ethanoic acid with a smaller amount of sodium hydroxide, giving ethanoic acid and sodium ethanoate',
  wrong: ['Hydrochloric acid with sodium chloride', 'Sodium hydroxide with sodium chloride', 'Ammonium chloride with hydrochloric acid'],
  sol: 'An acidic buffer needs a weak acid and its conjugate base (its salt with a strong base). Partial neutralisation of ethanoic acid by NaOH leaves CH₃COOH and CH₃COONa — option (@K). The others contain a strong acid or a strong base, or no conjugate pair.',
  d: 2, c: 'understanding', t: [3],
}));
add('chk-buf-mcq', (() => {
  const pKaN = 14 - pK(KB.ammonia);
  return mcq({
    stem: 'A laboratory needs a buffer of pH 9.2. Using the data pKa(CH₃COOH) = 4.74, pKa(HCOOH) = 3.74 and pKb(NH₃) = 4.74, which pair is the best choice?',
    right: 'Ammonium hydroxide with ammonium chloride',
    wrong: ['Ethanoic acid with sodium ethanoate', 'Methanoic acid with sodium methanoate', 'Hydrochloric acid with sodium chloride'],
    sol: `A buffer works best at pH = pKa ± 1. For NH₄⁺/NH₃ the effective pKa is 14 − 4.74 = ${f2(pKaN)}, close to 9.2; the acid–salt pairs have pKa below 5 — option (@K).`,
    d: 3, c: 'application', t: [3],
  });
})());
add('buf-cap-mcq', mcq({
  stem: 'A chemist wants the acidic buffer made from a weak acid HA and its sodium salt to resist added acid and added base equally well. The best choice is to make the ratio [A⁻]/[HA] equal to:',
  right: '1, so that pH = pKa',
  wrong: ['10, so that pH = pKa + 1', '0.01, so that pH = pKa − 2', '100, so that most of the acid is neutralised'],
  sol: 'With equal amounts of salt and acid there is the same reserve to neutralise added H⁺ (by A⁻) and added OH⁻ (by HA); the buffer capacity is a maximum and pH = pKa — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('buf-num-mcq', (() => {
  const salt = 0.3;
  const acid = 0.15;
  const p = hh(pK(KA.acetic), salt, acid);
  return mcq({
    stem: `One litre of a buffer is made by dissolving ${acid.toFixed(2)} mol of ethanoic acid and ${salt.toFixed(2)} mol of sodium ethanoate in water (pKa = ${f2(pK(KA.acetic))}). Its pH is:`,
    right: f2(p),
    wrong: [f2(pK(KA.acetic)), f2(2 * pK(KA.acetic) - p), f2(p + 1)],
    sol: String.raw`$\text{pH} = \text{p}K_a + \log\dfrac{[\text{salt}]}{[\text{acid}]} = ${f2(pK(KA.acetic))} + \log\dfrac{${salt}}{${acid}} = ${f2(pK(KA.acetic))} + 0.30 \approx ${f2(p)}$ — option (@K).`,
    d: 2, c: 'understanding', t: [3],
  });
})(), () => near(hh(4.74, 0.3, 0.15), 5.04, 0.001) || 'buf-num');
add('buf-add-mcq', mcq({
  stem: 'A buffer contains equal moles of CH₃COOH and CH₃COONa. A little dilute hydrochloric acid is added. In the buffer:',
  right: '[CH₃COOH] increases and [CH₃COO⁻] decreases, but their ratio changes only slightly',
  wrong: ['[CH₃COOH] decreases and [CH₃COO⁻] increases, so the pH rises sharply', 'Neither concentration changes, because HCl is a strong acid', '[H⁺] rises in proportion to the HCl added'],
  sol: 'Added H⁺ combines with CH₃COO⁻ to form CH₃COOH. The acid increases and the salt decreases a little, so [salt]/[acid] and hence pH change only slightly — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('buf-partial-mcq', (() => {
  const nA = 0.2 * 0.1;
  const nB = 0.1 * 0.04;
  const p = hh(pK(KA.acetic), nB, nA - nB);
  return mcq({
    stem: `A school laboratory mixes 100 mL of 0.20 M ethanoic acid with 40 mL of 0.10 M sodium hydroxide (pKa of the acid = ${f2(pK(KA.acetic))}). The pH of the resulting solution is:`,
    right: f2(p),
    wrong: [f2(pK(KA.acetic)), f2(pK(KA.acetic) + Math.log10((nA - nB) / nB)), '7.00'],
    sol: String.raw`Moles of acid ${nA.toFixed(3)} mol, moles of NaOH ${nB.toFixed(3)} mol. NaOH converts ${nB.toFixed(3)} mol of acid to salt, leaving acid ${(nA - nB).toFixed(3)} mol. $\text{pH} = ${f2(pK(KA.acetic))} + \log\dfrac{${nB.toFixed(3)}}{${(nA - nB).toFixed(3)}} \approx ${f2(p)}$ — option (@K).`,
    d: 3, c: 'analysis', t: [3],
  });
})(), () => near(hh(4.74, 0.004, 0.016), 4.14, 0.003) || 'buf-partial');
add('buf-basic-mcq', (() => {
  const pOH = hh(pK(KB.ammonia), 0.2, 0.1);
  const p = 14 - pOH;
  return mcq({
    stem: 'A basic buffer contains 0.10 M ammonium hydroxide and 0.20 M ammonium chloride (pKb = 4.74). Its pH is:',
    right: f2(p),
    wrong: [f2(pOH), f2(14 - hh(pK(KB.ammonia), 0.1, 0.2)), f2(14 - pK(KB.ammonia))],
    sol: String.raw`$\text{pOH} = \text{p}K_b + \log\dfrac{[\text{salt}]}{[\text{base}]} = ${f2(pK(KB.ammonia))} + \log 2 \approx ${f2(pOH)}$, so $\text{pH} = 14 - ${f2(pOH)} \approx ${f2(p)}$ — option (@K).`,
    d: 3, c: 'application', t: [3],
  });
})(), () => near(14 - hh(4.74, 0.2, 0.1), 8.96, 0.001) || 'buf-basic');

// ---------------------------------------------------------------- t04 solubility product
add('ksp-expr-mcq', mcq({
  stem: 'Calcium fluoride, CaF₂, is a sparingly soluble salt of molar solubility s mol L⁻¹. Its solubility product is:',
  right: '4s³',
  wrong: ['s²', '2s³', '27s⁴'],
  sol: 'CaF₂(s) ⇌ Ca²⁺ + 2F⁻ gives [Ca²⁺] = s and [F⁻] = 2s. Ksp = s(2s)² = 4s³ — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('ksp-s-mcq', (() => {
  const s = sAB(KSP.BaSO4);
  return mcq({
    stem: 'A hospital radiology unit uses barium sulfate as a contrast medium; it is so insoluble because Ksp(BaSO₄) = 1.1 × 10⁻¹⁰. Its molar solubility is about:',
    right: `${u(s)} mol L⁻¹`,
    wrong: ['1.1 × 10⁻¹⁰ mol L⁻¹', '5.5 × 10⁻¹¹ mol L⁻¹', '2.2 × 10⁻⁴ mol L⁻¹'],
    sol: String.raw`BaSO₄ is of the AB type, so $s = \sqrt{K_{sp}} = \sqrt{1.1\times10^{-10}} \approx ${sc(s, 2)}$ mol L⁻¹ — option (@K).`,
    d: 2, c: 'understanding', t: [4],
  });
})());
add('ksp-ppt-mcq', (() => {
  const mg = 2.0e-3 / 2;
  const oh = 4.0e-3 / 2;
  const q = Q(mg, 1, oh, 2);
  return mcq({
    stem: '100 mL of 2.0 × 10⁻³ M magnesium chloride is mixed with 100 mL of 4.0 × 10⁻³ M sodium hydroxide. Ksp of Mg(OH)₂ is 1.8 × 10⁻¹¹ (given). Which conclusion is correct?',
    right: 'Mg(OH)₂ precipitates, because the ionic product [Mg²⁺][OH⁻]² after mixing is greater than Ksp',
    wrong: ['No precipitate forms, because the ionic product after mixing is smaller than Ksp', 'No precipitate forms, because magnesium hydroxide cannot precipitate from solutions as dilute as these', 'Mg(OH)₂ precipitates, because [Mg²⁺] is greater than [OH⁻] after mixing'],
    sol: String.raw`After mixing the volume is doubled: $[\ce{Mg^2+}] = 1.0\times10^{-3}$ and $[\ce{OH-}] = 2.0\times10^{-3}$. $Q_{sp} = [\ce{Mg^2+}][\ce{OH-}]^2 = 1.0\times10^{-3}\times(2.0\times10^{-3})^2 = ${sc(q, 2)}$, which is greater than $1.8\times10^{-11}$, so Mg(OH)₂ precipitates — option (@K).`,
    d: 3, c: 'analysis', t: [4],
  });
})(), () => near(1e-3 * (2e-3) ** 2, 4.0e-9, 1e-9) || 'ksp-ppt');
add('ksp-common-mcq', (() => {
  const s = KSP.BaSO4 / 0.02;
  return mcq({
    stem: 'The solubility of barium sulfate in 0.020 M sodium sulfate solution (Ksp = 1.1 × 10⁻¹⁰) is, in mol L⁻¹, about:',
    right: u(s),
    wrong: [u(sAB(KSP.BaSO4)), u(KSP.BaSO4 * 0.02), u(KSP.BaSO4 / 0.04)],
    sol: String.raw`The sulfate from Na₂SO₄ is 0.020 M and far exceeds that from BaSO₄, so $s = [\ce{Ba^2+}] = K_{sp}/[\ce{SO4^2-}] = 1.1\times10^{-10}/0.020 \approx ${sc(s, 2)}$ mol L⁻¹ — option (@K).`,
    d: 3, c: 'application', t: [4],
  });
})(), () => near(1.1e-10 / 0.02, 5.5e-9, 0.002) || 'ksp-common');
add('ksp-grp2-mcq', mcq({
  stem: 'In the systematic analysis of cations, hydrogen sulphide is passed through the solution in the presence of dilute hydrochloric acid. This selects group II cations because the acid:',
  right: 'suppresses the ionisation of H₂S, so [S²⁻] is just large enough for only the least soluble sulphides to reach Ksp',
  wrong: ['converts all cations to chlorides that are insoluble', 'increases [S²⁻], so every sulphide precipitates', 'oxidises H₂S to sulphur, which precipitates the cations'],
  sol: 'H⁺ from HCl is a common ion for H₂S ⇌ 2H⁺ + S²⁻, so [S²⁻] is very low. Only CuS, CdS, PbS and similar sulphides with extremely small Ksp have Qsp > Ksp — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('chk-grp-mcq', mcq({
  stem: 'After group III has been removed, group IV cations (Zn²⁺, Mn²⁺, Ni²⁺, Co²⁺) are precipitated by H₂S in the presence of ammonium hydroxide. The ammonium hydroxide is needed because it:',
  right: 'neutralises H⁺, which raises [S²⁻] enough for the more soluble sulphides to reach Ksp',
  wrong: ['lowers [S²⁻] by the common ion effect', 'precipitates these cations as hydroxides', 'removes group II sulphides that remain in solution'],
  sol: 'NH₄OH supplies OH⁻, which removes H⁺ from H₂S. The ionisation shifts right and [S²⁻] increases, so the more soluble group IV sulphides exceed their Ksp — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('ksp-compare-mcq', (() => {
  const kX = 1.0e-10;
  const kY = 3.2e-12;
  const sX = sAB(kX);
  const sY = sAB2(kY);
  return mcq({
    stem: `Salt X is of the AB type with Ksp = ${u(kX)} (given) and salt Y is of the AB₂ type with Ksp = ${u(kY)} (given), both at 298 K. Which is correct?`,
    right: 'Y is more soluble than X, even though its Ksp is smaller',
    wrong: ['X is more soluble than Y, because its Ksp is larger', 'X and Y are equally soluble, because both are sparingly soluble', 'Y is less soluble than X, because its Ksp is smaller'],
    sol: String.raw`X: $s = \sqrt{1.0\times10^{-10}} = ${sc(sX, 2)}$. Y: $s = (3.2\times10^{-12}/4)^{1/3} = ${sc(sY, 2)}$ mol L⁻¹. So Y dissolves about ${(sY / sX).toFixed(0)} times more — option (@K).`,
    d: 3, c: 'analysis', t: [4],
  });
})(), () => near(sAB2(3.2e-12), 9.28e-5, 0.01) && near(sAB(1e-10), 1.0e-5, 0.01) || 'ksp-compare');

// ---------------------------------------------------------------- assertion-reason (a b c d a b)
add('ar-buf', ar({
  a: 'The pH of a mixture of ethanoic acid and sodium ethanoate hardly changes when a few drops of dilute hydrochloric acid are added.',
  r: 'Ethanoate ions in the mixture combine with the added hydrogen ions to form unionised ethanoic acid.',
  key: 'a',
  sol: 'Both statements are true. The ethanoate ion (a base) removes the added H⁺, so [H⁺] and the pH change little; Reason explains Assertion — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-agcl', ar({
  a: 'Silver chloride is less soluble in 0.10 M sodium chloride solution than in pure water.',
  r: 'Silver chloride is a white solid that darkens slowly on exposure to sunlight.',
  key: 'b',
  sol: 'Both statements are true, but the Reason is unrelated to the Assertion: the lower solubility is caused by the extra Cl⁻ (common ion effect) shifting AgCl(s) ⇌ Ag⁺ + Cl⁻ to the left — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('ar-naoac', ar({
  a: 'An aqueous solution of sodium ethanoate is basic.',
  r: 'The ethanoate ion is the conjugate base of a strong acid and therefore does not react with water.',
  key: 'c',
  sol: 'The Assertion is true: CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻. The Reason is false: ethanoic acid is a weak acid, so its conjugate base reacts with water — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-dil', ar({
  a: 'The pH of an acidic buffer changes by one unit when it is diluted to ten times its volume.',
  r: 'The pH of a buffer depends only on pKa and is independent of the ratio [salt]/[acid].',
  key: 'd',
  sol: 'Both statements are false. On dilution both [salt] and [acid] fall equally, so the ratio and the pH are almost unchanged; and pH = pKa + log([salt]/[acid]) does depend on the ratio — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('ar-grp2', ar({
  a: 'In group II analysis, hydrogen sulphide is passed through the solution only after dilute hydrochloric acid has been added.',
  r: 'Hydrochloric acid suppresses the ionisation of hydrogen sulphide through the common ion effect, so only sulphides of very low Ksp precipitate.',
  key: 'a',
  sol: 'Both statements are true. The common H⁺ lowers [S²⁻] so that only group II sulphides reach Ksp; Reason explains Assertion — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('ar-ci-ph', ar({
  a: 'Adding sodium ethanoate to a solution of ethanoic acid raises its pH.',
  r: 'Ethanoic acid is the main acid present in vinegar.',
  key: 'b',
  sol: 'Both statements are true, but Reason is unrelated to Assertion: the rise in pH occurs because the added ethanoate ion is common to the acid and suppresses its ionisation — option (b).',
  d: 2, c: 'understanding', t: [1, 2],
}));

// ---------------------------------------------------------------- true-false, fill-blank, match
add('chk-hyd-tf', tf({
  stem: 'A solution of ammonium nitrate in water is neutral, because both the acid and the base from which the salt is derived are strong.',
  key: 'f',
  sol: 'False. Nitric acid is strong but ammonium hydroxide is a weak base, so NH₄⁺ hydrolyses and the solution is acidic.',
  d: 2, c: 'understanding', t: [2],
}));
add('tf-dilbuf', tf({
  stem: 'Diluting an acidic buffer two-fold leaves its pH almost unchanged, because the salt and the acid are diluted by the same factor.',
  key: 't',
  sol: 'True. [salt]/[acid] is unchanged by dilution, so pH = pKa + log([salt]/[acid]) stays almost the same.',
  d: 2, c: 'understanding', t: [3],
}));
add('tf-kspcommon', tf({
  stem: 'Adding a solution of sodium chloride to a saturated solution of silver chloride at constant temperature changes the value of Ksp of silver chloride.',
  key: 'f',
  sol: 'False. Ksp depends only on temperature; the extra Cl⁻ makes Qsp exceed Ksp and some AgCl precipitates until the product equals the unchanged Ksp again.',
  d: 2, c: 'understanding', t: [4],
}));
add('fill-wawb', fill({
  stem: 'The pH of the solution of a salt of a weak acid and a weak base is independent of its ___.',
  acc: [['concentration', 'Concentration']],
  sol: 'pH = 7 + ½(pKa − pKb); the concentration cancels.',
  d: 2, c: 'recall', t: [2],
}));
add('fill-nh4cl', fill({
  stem: 'In the separation of group III, solid ammonium ___ is added before ammonium hydroxide.',
  acc: [['chloride', 'Chloride']],
  sol: 'Ammonium chloride supplies NH₄⁺, which lowers [OH⁻] by the common ion effect.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-pka', fill({
  stem: 'A buffer resists a change of pH best when its pH is equal to the ___ of the weak acid in it.',
  acc: [['pKa', 'pKa', 'pK_a']],
  sol: 'When [salt] = [acid], pH = pKa, the point of maximum buffer capacity.',
  d: 1, c: 'recall', t: [3],
}));
add('match-salt', match({
  stem: 'Match each salt solution (column I) with its nature at 298 K (column II).',
  pairs: [['Ammonium chloride', 'Acidic'], ['Sodium ethanoate', 'Basic'], ['Potassium nitrate', 'Neutral'], ['Ammonium ethanoate', 'Neutral, because Ka = Kb']],
  order: [0, 1, 2, 3],
  sol: 'NH₄Cl: SA–WB acidic; CH₃COONa: WA–SB basic; KNO₃: SA–SB neutral; CH₃COONH₄: WA–WB with Ka = Kb, neutral.',
  d: 2, c: 'understanding', t: [2],
}));
add('match-ksp', match({
  stem: 'Match each relation or condition for a sparingly soluble salt (column I) with its consequence (column II).',
  pairs: [['Ksp = s² (AB salt)', 's = √Ksp'], ['Ksp = 4s³ (AB₂ salt)', 's = (Ksp/4)^(1/3)'], ['Qsp > Ksp', 'A precipitate forms'], ['Qsp < Ksp', 'The solution is unsaturated']],
  order: [0, 1, 2, 3],
  sol: 'AB salts: s = √Ksp; AB₂ salts: s = (Ksp/4)^(1/3); Qsp > Ksp precipitates; Qsp < Ksp is unsaturated.',
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- numericals
add('chk-hyd-num', (() => {
  const c = 0.3;
  const p = pHsawb(c, KB.ammonia);
  return num({
    stem: `A student prepares ${c.toFixed(2)} M ammonium chloride solution (Kb of ammonia = 1.8 × 10⁻⁵). Calculate its pH.`,
    value: Number(p.toFixed(2)), tol: 0.02, unit: null,
    sol: String.raw`NH₄Cl is the salt of a strong acid and a weak base: $\text{pH} = 7 - \tfrac12(\text{p}K_b + \log c) = 7 - \tfrac12(${f2(pK(KB.ammonia))} - 0.52) \approx ${f2(p)}$.`,
    scheme: [['Selects pH = 7 − ½(pKb + log c)', 1], ['Substitutes pKb = 4.74, log 0.3 = −0.52 and obtains 4.89', 1]],
    marks: 2, d: 3, c: 'application', t: [2],
  });
})(), (q) => near(7 - 0.5 * (-Math.log10(1.8e-5) + Math.log10(0.3)), 4.89, 0.003) && q.answer.value === 4.89 || 'chk-hyd-num');
add('chk-ksp-num', (() => {
  const s = sAB2(KSP.MgOH2);
  const oh = 2 * s;
  const p = 14 + Math.log10(oh);
  return num({
    stem: `Magnesium hydroxide, Mg(OH)₂, has Ksp = 1.8 × 10⁻¹¹ (given). Calculate the pH of its saturated solution in pure water at 298 K.`,
    value: Number(p.toFixed(2)), tol: 0.03, unit: null,
    sol: String.raw`AB₂ type: $s = (K_{sp}/4)^{1/3} \approx ${sc(s, 3)}$ mol L⁻¹, so $[\ce{OH-}] = 2s \approx ${sc(oh, 3)}$ and $\text{pOH} \approx ${f2(14 - p)}$. Then $\text{pH} = 14 - ${f2(14 - p)} \approx ${f2(p)}$.`,
    scheme: [['s = (Ksp/4)^(1/3) = 1.65 × 10⁻⁴ mol L⁻¹', 1], ['[OH⁻] = 2s = 3.3 × 10⁻⁴ and pOH = 3.48', 0.5], ['pH = 14 − 3.48 = 10.52', 0.5]],
    marks: 2, d: 3, c: 'analysis', t: [4],
  });
})(), (q) => near(14 + Math.log10(2 * Math.cbrt(1.8e-11 / 4)), 10.52, 0.003) && q.answer.value === 10.52 || 'chk-ksp-num');
add('num-mass', (() => {
  const V = 0.5;
  const ca = 0.2;
  const target = 4.7;
  const ratio = 10 ** (target - pK(KA.acetic));
  const cs = ratio * ca;
  const mass = cs * V * 82;
  return num({
    stem: `To prepare a buffer of pH ${target} from 500 mL of 0.20 M ethanoic acid (pKa = ${f2(pK(KA.acetic))}), solid sodium ethanoate (M = 82 g mol⁻¹) is added with no change in volume. Calculate the mass of sodium ethanoate required, in grams.`,
    value: Number(mass.toFixed(1)), tol: 0.1, unit: 'g',
    sol: String.raw`$\log\dfrac{[\text{salt}]}{[\text{acid}]} = ${target} - ${pK(KA.acetic).toFixed(2)} = ${(target - pK(KA.acetic)).toFixed(2)}$, so the ratio is $10^{${(target - pK(KA.acetic)).toFixed(2)}} \approx ${ratio.toFixed(2)}$ and $[\text{salt}] = ${ratio.toFixed(2)}\times0.20 \approx ${cs.toFixed(3)}$ mol L⁻¹. Moles $= ${cs.toFixed(3)}\times0.50 \approx ${(cs * V).toFixed(3)}$ and mass $= ${(cs * V).toFixed(3)}\times82 \approx ${mass.toFixed(1)}$ g.`,
    scheme: [['Ratio salt/acid = 10^(pH − pKa) = 0.91 and [salt] = 0.18 M', 1], ['Moles = 0.091 and mass = 0.091 × 82 = 7.5 g', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})());
add('num-ksp', (() => {
  const w = 2.4e-3;
  const M = 233;
  const s = w / M;
  const k = kspAB(s);
  return num({
    stem: `A water-analysis report gives the solubility of barium sulfate (M = 233 g mol⁻¹) as ${w.toFixed(4)} g per litre of saturated solution (given). Calculate its solubility product, in units of 10⁻¹⁰ (so that 1.2 × 10⁻¹⁰ is written as 1.2).`,
    value: Number((k/1e-10).toFixed(2)), tol: 0.02, unit: null,
    sol: String.raw`$s = 2.4\times10^{-3}/233 \approx ${sc(s, 3)}$ mol L⁻¹. AB type: $K_{sp} = s^2 = (${sc(s, 3)})^2 = ${sc(k, 3)}$, so $K_{sp}/10^{-10} = ${(k/1e-10).toFixed(2)}$.`,
    scheme: [['s = w/M = 1.03 × 10⁻⁵ mol L⁻¹', 0.5], ['Ksp = s² = 1.06 × 10⁻¹⁰', 0.5]],
    marks: 1, d: 3, c: 'application', t: [4],
  });
})());
add('num-ci', (() => {
  const ca = 0.1;
  const cs = 0.25;
  const h = hMix(KA.formic, ca, cs);
  const p = pH(h);
  return num({
    stem: `A stock room records a solution that is 0.10 M in methanoic acid and 0.25 M in sodium methanoate (Ka of methanoic acid = 1.8 × 10⁻⁴). Calculate its pH.`,
    value: Number(p.toFixed(2)), tol: 0.02, unit: null,
    sol: String.raw`$[\ce{H+}] = K_a\,c_a/c_s = 1.8\times10^{-4}\times0.10/0.25 = ${sc(h, 2)}$ mol L⁻¹, so $\text{pH} = -\log(${sc(h, 2)}) = ${f2(p)}$.`,
    scheme: [['[H⁺] = Ka × c(acid)/c(salt) = 7.2 × 10⁻⁵', 0.5], ['pH = 4.14', 0.5]],
    marks: 1, d: 3, c: 'understanding', t: [1],
  });
})(), (q) => near(-Math.log10(1.8e-4 * 0.1 / 0.25), 4.14, 0.003) && q.answer.value === 4.14 || 'num-ci');
