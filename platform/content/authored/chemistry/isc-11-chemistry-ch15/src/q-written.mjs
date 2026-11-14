// ISC 11 Chemistry ch15: written items (2-mark, 3-mark and 5-mark long items set in parts). Numbers computed from data.mjs and re-solved.
// Extra data (standard): Ksp(AgI) = 8.5e-17 at 298 K; Ksp(CdS) = 8e-27 (given); M(CH3COONa) = 82 g/mol.
import { mk, add, r, near, sci } from './lib.mjs';
import { KA, KB, KSP, KH2S, Kw, pK, pH, hWeak, alphaWeak, hMix, ohMix, ohToPH, pHsawb, pHwasb, pHwawb, hh, sAB, sAB2, Q, sH2S } from './data.mjs';

const { short, long } = mk;
const f2 = (x) => x.toFixed(2);
const sc = (x, n = 2) => sci(x, n);
const scm = (x, n = 2) => `$${sci(x, n)}$`; // inline math for the short plain-text solution lines
const KSP_AGI = 8.5e-17;
const KSP_CDS = 8e-27;

// ---------------------------------------------------------------- 2-mark
add('s2-ci', short({
  marks: 2,
  stem: 'A pharmacist notes that a 0.10 M solution of ethanoic acid becomes less acidic when a little sodium ethanoate is dissolved in it. Name this effect, write the equilibrium involved and explain the observation.',
  model: String.raw`This is the common ion effect. The equilibrium is $\ce{CH3COOH <=> CH3COO- + H+}$. Sodium ethanoate is fully ionised and adds $\ce{CH3COO-}$, so by Le Chatelier's principle the equilibrium shifts to the left: the ionisation of the acid is suppressed, $[\ce{H+}]$ falls and the solution becomes less acidic (pH rises).`,
  sol: 'Common ion effect; added CH₃COO⁻ shifts the equilibrium left; [H⁺] falls.',
  scheme: [['Names the common ion effect and writes CH₃COOH ⇌ CH₃COO⁻ + H⁺', 1], ['Added ethanoate shifts the equilibrium left, [H⁺] falls and the pH rises', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-nh4', short({
  marks: 2,
  stem: 'Explain, using the equilibrium of ammonium hydroxide, why ammonia solution behaves as a weaker base when solid ammonium chloride is dissolved in it. State the change in pH.',
  model: String.raw`$\ce{NH4OH <=> NH4+ + OH-}$. Ammonium chloride is fully ionised and adds $\ce{NH4+}$, a common ion, so the equilibrium shifts to the left and $[\ce{OH-}]$ falls: the base is less ionised, and the pH decreases.`,
  sol: 'NH₄⁺ shifts NH₄OH ⇌ NH₄⁺ + OH⁻ left; [OH⁻] and pH fall.',
  scheme: [['NH₄OH ⇌ NH₄⁺ + OH⁻ with NH₄⁺ added by the salt as common ion', 1], ['Equilibrium shifts left, [OH⁻] falls and the pH decreases', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-hydr', short({
  marks: 2,
  stem: 'What is meant by the hydrolysis of a salt? Why does a solution of sodium chloride in water remain neutral?',
  model: 'Hydrolysis is the reaction of the cation or anion (or both) of a salt with water that changes the pH of the solution. Sodium chloride is the salt of a strong acid and a strong base; neither Na⁺ nor Cl⁻ reacts with water, so [H⁺] = [OH⁻] and the solution is neutral.',
  sol: 'Hydrolysis changes pH; NaCl ions are of strong acid and base and do not hydrolyse.',
  scheme: [['Definition: reaction of salt ions with water that alters the pH', 1], ['NaCl ions come from a strong acid and a strong base and do not hydrolyse, so the solution is neutral', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s2-kh', short({
  marks: 2,
  stem: 'For a solution of sodium ethanoate, write the hydrolysis equation of the ethanoate ion and show that its hydrolysis constant is Kh = Kw/Ka.',
  model: String.raw`$\ce{CH3COO- + H2O <=> CH3COOH + OH-}$, so $K_h = \dfrac{[\ce{CH3COOH}][\ce{OH-}]}{[\ce{CH3COO-}]}$. Multiplying the numerator and denominator by $[\ce{H+}]$: $K_h = \dfrac{[\ce{CH3COOH}]}{[\ce{CH3COO-}][\ce{H+}]}\times[\ce{H+}][\ce{OH-}] = \dfrac{1}{K_a}\times K_w = \dfrac{K_w}{K_a}$.`,
  sol: 'Kh = [CH₃COOH][OH⁻]/[CH₃COO⁻] = Kw/Ka.',
  scheme: [['Equation and expression for Kh', 1], ['Multiplies by [H⁺]/[H⁺] to obtain Kw/Ka', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('s2-bufdef', short({
  marks: 2,
  stem: 'Define a buffer solution. Give the composition of one acidic buffer and one basic buffer used in the laboratory.',
  model: 'A buffer solution is one whose pH changes very little when small amounts of acid or base are added, or when it is diluted. An acidic buffer is a weak acid with its salt of a strong base, for example CH₃COOH with CH₃COONa. A basic buffer is a weak base with its salt of a strong acid, for example NH₄OH with NH₄Cl.',
  sol: 'Resists pH change; CH₃COOH + CH₃COONa; NH₄OH + NH₄Cl.',
  scheme: [['Definition of a buffer', 1], ['One acidic and one basic buffer with composition', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('s2-bufdil', short({
  marks: 2,
  stem: 'A student dilutes a buffer of ethanoic acid and sodium ethanoate ten-fold with water. Explain, using the Henderson equation, why its pH is almost unchanged.',
  model: String.raw`$\text{pH} = \text{p}K_a + \log\dfrac{[\text{salt}]}{[\text{acid}]}$. On dilution both concentrations fall by the same factor, so the ratio, and hence the pH, remain nearly constant. (A very large dilution lets the ionisation of water and of the acid matter and the pH eventually drifts.)`,
  sol: 'Ratio salt/acid is unchanged by dilution, so pH ≈ pKa + log(ratio) is unchanged.',
  scheme: [['Henderson equation pH = pKa + log([salt]/[acid])', 1], ['Both concentrations fall by the same factor, so the ratio and pH are almost unchanged', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('s2-ksp', short({
  marks: 2,
  stem: 'Write the expression for the solubility product of (a) calcium fluoride and (b) magnesium hydroxide, and give each in terms of the molar solubility s.',
  model: String.raw`(a) $\ce{CaF2(s) <=> Ca^2+ + 2F-}$: $K_{sp} = [\ce{Ca^2+}][\ce{F-}]^2 = s(2s)^2 = 4s^3$. (b) $\ce{Mg(OH)2(s) <=> Mg^2+ + 2OH-}$: $K_{sp} = [\ce{Mg^2+}][\ce{OH-}]^2 = s(2s)^2 = 4s^3$.`,
  sol: 'Both are AB₂ salts: Ksp = [cation][anion]² = 4s³.',
  scheme: [['(a) Ksp = [Ca²⁺][F⁻]² = 4s³', 1], ['(b) Ksp = [Mg²⁺][OH⁻]² = 4s³', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s2-ppt', short({
  marks: 2,
  stem: 'State the condition for a sparingly soluble salt to precipitate when two solutions are mixed. Why might no precipitate appear even though both original solutions contain the ions?',
  model: 'A precipitate forms only if the ionic product Qsp, calculated from the concentrations after mixing, exceeds the solubility product Ksp. On mixing, the volume increases and each ion is diluted, so Qsp may fall below Ksp even if the original solutions were more concentrated; then the solution is unsaturated and nothing precipitates.',
  sol: 'Qsp > Ksp needed; dilution on mixing can keep Qsp below Ksp.',
  scheme: [['Condition: Qsp > Ksp using concentrations after mixing', 1], ['Dilution on mixing may keep Qsp < Ksp, so there is no precipitate', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s2-grp3', short({
  marks: 2,
  stem: 'In the group III separation, magnesium ions stay in solution although aqueous ammonia is added. Give two reasons connected with the use of ammonium chloride.',
  model: String.raw`Ammonium chloride supplies $\ce{NH4+}$, the common ion of $\ce{NH4OH <=> NH4+ + OH-}$, so $[\ce{OH-}]$ is kept low. With this low $[\ce{OH-}]$ the ionic product of $\ce{Mg(OH)2}$ remains below its (relatively large) $K_{sp}$, so it does not precipitate, while the hydroxides of Fe³⁺, Al³⁺ and Cr³⁺, with very small Ksp, do.`,
  sol: 'NH₄⁺ lowers [OH⁻]; Qsp of Mg(OH)₂ stays below Ksp.',
  scheme: [['NH₄Cl gives common NH₄⁺ which lowers [OH⁻]', 1], ['Qsp of Mg(OH)₂ < its Ksp, while group III hydroxides have much smaller Ksp', 1]],
  d: 3, c: 'application', t: [1, 4],
}));

// ---------------------------------------------------------------- 3-mark
add('s3-ci-calc', (() => {
  const c = 0.15;
  const cs = 0.3;
  const h0 = hWeak(KA.formic, c);
  const a0 = (h0 / c) * 100;
  const h1 = hMix(KA.formic, c, cs);
  const a1 = (h1 / c) * 100;
  return short({
    marks: 3,
    stem: `A solution is 0.15 M in methanoic acid (Ka = 1.8 × 10⁻⁴). Calculate the degree of ionisation of the acid (a) alone and (b) after sodium methanoate has been dissolved in it to make the salt concentration 0.30 M. Comment on the result.`,
    model: String.raw`(a) $[\ce{H+}] = \sqrt{K_a c} = \sqrt{1.8\times10^{-4}\times0.15} \approx ${sc(h0, 2)}$, so $\alpha = [\ce{H+}]/c \approx ${a0.toFixed(1)}\%$.

(b) $[\ce{H+}] = K_a\,c_a/c_s = 1.8\times10^{-4}\times0.15/0.30 = ${sc(h1, 2)}$, so $\alpha \approx ${a1.toFixed(2)}\%$.

The common ion HCOO⁻ suppresses the ionisation of the acid by a factor of about ${(a0 / a1).toFixed(0)}.`,
    sol: `α alone ${a0.toFixed(1)} %; with salt ${a1.toFixed(2)} %: ionisation suppressed.`,
    scheme: [['(a) [H⁺] = √(Ka c) = 5.2 × 10⁻³ and α = 3.5 %', 1], ['(b) [H⁺] = Ka c_a/c_s = 9.0 × 10⁻⁵ and α = 0.06 %', 1], ['Comment: common ion suppresses ionisation', 1]],
    d: 3, c: 'application', t: [1],
  });
})(), (q) => near(Math.sqrt(1.8e-4 * 0.15) / 0.15 * 100, 3.5, 0.02) && near(1.8e-4 * 0.15 / 0.3 / 0.15 * 100, 0.06, 0.01) || 's3-ci-calc');
add('s3-buf-explain', short({
  marks: 3,
  stem: 'A basic buffer contains aqueous ammonia and ammonium chloride. Explain, with equations, how it resists a change in pH when (a) a little hydrochloric acid and (b) a little sodium hydroxide are added.',
  model: String.raw`The buffer contains $\ce{NH4OH <=> NH4+ + OH-}$ with plenty of unionised base and plenty of $\ce{NH4+}$ (from the salt).

(a) Added $\ce{H+}$ reacts with $\ce{OH-}$: $\ce{H+ + OH- -> H2O}$; the equilibrium shifts right (NH₄OH ionises) to replace the $\ce{OH-}$, so the pH falls very little.

(b) Added $\ce{OH-}$ is removed by $\ce{NH4+}$: $\ce{NH4+ + OH- -> NH3 + H2O}$; the equilibrium shifts left, so the pH rises very little. In both cases the ratio [salt]/[base] changes only slightly.`,
  sol: 'Base neutralises H⁺; NH₄⁺ neutralises OH⁻; ratio changes slightly.',
  scheme: [['Buffer components and the equilibrium', 1], ['(a) added H⁺ removed by OH⁻ from NH₄OH, which ionises further', 1], ['(b) added OH⁻ removed by NH₄⁺ and the ratio changes only slightly', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('s3-hyd-eq', short({
  marks: 3,
  stem: 'Write the hydrolysis equation of the ion that reacts in (a) ammonium chloride and (b) sodium ethanoate solution. State, with a reason, whether each solution is acidic or basic, and write the formula for the pH of one of them.',
  model: String.raw`(a) $\ce{NH4+ + H2O <=> NH3 + H3O+}$: $\ce{H3O+}$ is formed, so the solution is acidic (salt of a strong acid and a weak base). (b) $\ce{CH3COO- + H2O <=> CH3COOH + OH-}$: $\ce{OH-}$ is formed, so the solution is basic (salt of a weak acid and a strong base). For (b): $\text{pH} = 7 + \tfrac12(\text{p}K_a + \log c)$.`,
  sol: 'NH₄⁺ hydrolysis acidic; CH₃COO⁻ hydrolysis basic; pH formula.',
  scheme: [['(a) Equation for NH₄⁺ and acidic, with reason', 1], ['(b) Equation for CH₃COO⁻ and basic, with reason', 1], ['pH formula for one salt', 1]],
  d: 3, c: 'application', t: [2],
}));
add('s3-wawb', (() => {
  const p = pHwawb(KA.HCN, KB.ammonia);
  return short({
    marks: 3,
    stem: 'Ammonium ethanoate solution is neutral, yet ammonium cyanide solution is basic. Explain using pKa and pKb, and calculate the pH of the cyanide salt (pKa of HCN = 9.31, pKb of NH₃ = 4.74).',
    model: String.raw`For the salt of a weak acid and a weak base, $\text{pH} = 7 + \tfrac12(\text{p}K_a - \text{p}K_b)$. For ammonium ethanoate, $\text{p}K_a = \text{p}K_b = 4.74$, so pH $= 7$ (neutral). For HCN, $\text{p}K_a = 9.31$ is much larger than $\text{p}K_b$ of ammonia, so CN⁻ is a much stronger base than NH₄⁺ is an acid and the solution is basic: $\text{pH} = 7 + \tfrac12(9.31 - 4.74) \approx ${f2(p)}$.`,
    sol: `Equal pK values: pH 7; pKa(HCN) > pKb(NH₃): pH ≈ ${f2(p)}.`,
    scheme: [['Uses pH = 7 + ½(pKa − pKb)', 1], ['Ethanoate salt: pKa = pKb so neutral', 1], ['Cyanide salt: pH ≈ 9.29, basic since pKa > pKb', 1]],
    d: 3, c: 'analysis', t: [2],
  });
})(), () => near(7 + 0.5 * (9.31 - 4.74), 9.285, 0.001) || 's3-wawb');
add('s3-buf-calc', (() => {
  const n = 0.2;
  const add_ = 0.02;
  const p0 = pK(KA.acetic);
  const p1 = hh(p0, n - add_, n + add_);
  const pw = -Math.log10(add_);
  return short({
    marks: 3,
    stem: `One litre of a buffer holds ${n} mol of ethanoic acid and ${n} mol of sodium ethanoate (pKa = ${f2(p0)}). A technician adds ${add_} mol of hydrogen chloride gas without any change in volume. Calculate the new pH, and compare the change with that produced by the same addition to 1 L of pure water.`,
    model: String.raw`Initially pH $= \text{p}K_a = ${f2(p0)}$. HCl converts ${add_} mol of ethanoate to acid: acid $= ${(n + add_).toFixed(2)}$, salt $= ${(n - add_).toFixed(2)}$ mol. $\text{pH} = ${f2(p0)} + \log\dfrac{${(n - add_).toFixed(2)}}{${(n + add_).toFixed(2)}} \approx ${f2(p1)}$, a fall of only ${(p0 - p1).toFixed(2)}. In pure water $[\ce{H+}] = ${add_}$ so $\text{pH} \approx ${f2(pw)}$, a fall of ${(7 - pw).toFixed(1)} units.`,
    sol: `New pH ${f2(p1)}; fall ${(p0 - p1).toFixed(2)} compared with ${(7 - pw).toFixed(1)} in water.`,
    scheme: [['Acid 0.22 mol and salt 0.18 mol after the reaction with H⁺', 1], ['pH = 4.74 + log(0.18/0.22) ≈ 4.65, a fall of 0.09', 1], ['Pure water pH 1.70 (fall 5.3 units): buffer resists the change', 1]],
    d: 3, c: 'analysis', t: [3],
  });
})(), () => near(hh(4.74, 0.18, 0.22), 4.65, 0.001) || 's3-buf-calc');
add('s3-buf-design', (() => {
  const target = 4.0;
  const rAc = 10 ** (target - pK(KA.acetic));
  const rFo = 10 ** (target - pK(KA.formic));
  return short({
    marks: 3,
    stem: 'A buffer of pH 4.0 is wanted. Two acids are available, ethanoic acid (pKa = 4.74) and methanoic acid (pKa = 3.74). Find the ratio [salt]/[acid] needed with each and say which acid makes the better buffer.',
    model: String.raw`$\log\dfrac{[\text{salt}]}{[\text{acid}]} = \text{pH} - \text{p}K_a$. Ethanoic acid: $4.0 - 4.74 = -0.74$, ratio $\approx ${rAc.toFixed(2)}$. Methanoic acid: $4.0 - 3.74 = +0.26$, ratio $\approx ${rFo.toFixed(2)}$. Methanoic acid is better: its pKa lies within 1 unit of 4.0 and the ratio is near 1, so the buffer has high capacity against both acid and base; the ethanoate ratio of ${rAc.toFixed(2)} is much further from 1, so that buffer would have little reserve against added acid.`,
    sol: `Ratios ${rAc.toFixed(2)} (ethanoic) and ${rFo.toFixed(2)} (methanoic): methanoic acid is better.`,
    scheme: [['Uses log ratio = pH − pKa', 1], ['Ratios 0.18 and 1.82', 1], ['Chooses methanoic acid, ratio near 1 so greater buffer capacity', 1]],
    d: 3, c: 'analysis', t: [3],
  });
})(), () => near(10 ** (4 - 4.74), 0.18, 0.02) && near(10 ** (4 - 3.74), 1.82, 0.005) || 's3-buf-design');
add('s3-ksp-calc', (() => {
  const cF = 0.01;
  const s0 = sAB2(KSP.CaF2);
  const s1 = KSP.CaF2 / cF ** 2;
  return short({
    marks: 3,
    stem: `Ksp of calcium fluoride is 3.4 × 10⁻¹¹ at 298 K. A dental-research student compares its molar solubility in pure water and in 0.010 M sodium fluoride solution. Calculate both, and state the factor by which the solubility falls.`,
    model: String.raw`In water: $s = (K_{sp}/4)^{1/3} = (8.5\times10^{-12})^{1/3} \approx ${sc(s0, 2)}$ mol L⁻¹. In NaF: $[\ce{F-}] \approx 0.010$, so $s = [\ce{Ca^2+}] = K_{sp}/[\ce{F-}]^2 = 3.4\times10^{-11}/(0.010)^2 \approx ${sc(s1, 2)}$ mol L⁻¹. The solubility falls by a factor of about ${(s0 / s1).toFixed(0)}.`,
    sol: `s in water ${scm(s0, 2)}; in NaF ${scm(s1, 2)}; factor about ${(s0 / s1).toFixed(0)}.`,
    scheme: [['s in water = (Ksp/4)^(1/3) = 2.0 × 10⁻⁴ mol L⁻¹', 1], ['s in NaF = Ksp/[F⁻]² = 3.4 × 10⁻⁷ mol L⁻¹', 1], ['Factor of about 600', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(Math.cbrt(3.4e-11 / 4), 2.04e-4, 0.01) && near(3.4e-11 / 1e-4, 3.4e-7, 0.001) || 's3-ksp-calc');
add('s3-ppt', (() => {
  const ag = (5.0e-5 * 40) / 100;
  const cl = (4.0e-5 * 60) / 100;
  const q = ag * cl;
  return short({
    marks: 3,
    stem: `In a water-quality test, 40 mL of 5.0 × 10⁻⁵ M silver nitrate is mixed with 60 mL of 4.0 × 10⁻⁵ M sodium chloride. Ksp of AgCl is 1.8 × 10⁻¹⁰. Will a precipitate form? Show the calculation.`,
    model: String.raw`Total volume 100 mL. $[\ce{Ag+}] = 5.0\times10^{-5}\times40/100 = ${sc(ag, 2)}$ and $[\ce{Cl-}] = 4.0\times10^{-5}\times60/100 = ${sc(cl, 2)}$ M. $Q_{sp} = [\ce{Ag+}][\ce{Cl-}] \approx ${sc(q, 2)}$, which is greater than $K_{sp} = 1.8\times10^{-10}$, so AgCl precipitates.`,
    sol: `Qsp ≈ ${scm(q, 2)} > Ksp: a precipitate forms.`,
    scheme: [['Diluted concentrations 2.0 × 10⁻⁵ M and 2.4 × 10⁻⁵ M', 1], ['Qsp = 4.8 × 10⁻¹⁰', 1], ['Qsp > Ksp so a precipitate forms', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(2.0e-5 * 2.4e-5, 4.8e-10, 0.001) || 's3-ppt');
add('s3-sel', (() => {
  const need1 = KSP_AGI / 0.01;
  const need2 = KSP.AgCl / 0.01;
  const left = KSP_AGI / need2;
  return short({
    marks: 3,
    stem: `Silver nitrate solution is added drop by drop to a solution that is 0.010 M in both iodide and chloride ions (Ksp of AgI = 8.5 × 10⁻¹⁷, Ksp of AgCl = 1.8 × 10⁻¹⁰). Which salt precipitates first, and what [I⁻] remains when AgCl just starts to precipitate?`,
    model: String.raw`$[\ce{Ag+}]$ needed for AgI $= 8.5\times10^{-17}/0.010 = ${sc(need1, 2)}$; for AgCl $= 1.8\times10^{-10}/0.010 = ${sc(need2, 2)}$. AgI needs far less, so AgI precipitates first. When AgCl starts, $[\ce{Ag+}] = ${sc(need2, 2)}$, so $[\ce{I-}] = K_{sp}(\text{AgI})/[\ce{Ag+}] = 8.5\times10^{-17}/${sc(need2, 2)} \approx ${sc(left, 2)}$ M: iodide is essentially removed.`,
    sol: `AgI first; [I⁻] left ≈ ${scm(left, 2)} M.`,
    scheme: [['[Ag⁺] needed: 8.5 × 10⁻¹⁵ (AgI) and 1.8 × 10⁻⁸ (AgCl)', 1], ['AgI precipitates first', 1], ['[I⁻] when AgCl starts ≈ 4.7 × 10⁻⁹ M', 1]],
    d: 4, c: 'analysis', t: [4],
  });
})(), () => near(8.5e-17 / (1.8e-10 / 0.01), 4.7e-9, 0.01) || 's3-sel');
add('s3-grp2', (() => {
  const H = 0.2;
  const S = sH2S(H);
  const qCd = Q(0.01, 1, S, 1);
  const qMn = Q(0.01, 1, S, 1);
  return short({
    marks: 3,
    stem: `Hydrogen sulphide (saturated, 0.10 M; Ka1 × Ka2 = 1.2 × 10⁻²⁰, given) is passed into a solution that is 0.20 M in HCl and 0.010 M in each of Cd²⁺ and Mn²⁺. Ksp of CdS is 8 × 10⁻²⁷ and of MnS 2.5 × 10⁻¹⁰ (given). Which sulphide precipitates?`,
    model: String.raw`$[\ce{S^2-}] = \dfrac{K_{a1}K_{a2}[\ce{H2S}]}{[\ce{H+}]^2} = \dfrac{1.2\times10^{-20}\times0.10}{(0.20)^2} = ${sc(S, 2)}$ M. For both cations $Q_{sp} = 0.010\times${sc(S, 2)} \approx ${sc(qCd, 2)}$. This exceeds $K_{sp}(\text{CdS}) = 8\times10^{-27}$, so CdS precipitates; it is far below $K_{sp}(\text{MnS}) = 2.5\times10^{-10}$, so MnS stays in solution.`,
    sol: `[S²⁻] = ${scm(S, 2)} M; Qsp = ${scm(qCd, 2)}: CdS precipitates, MnS does not.`,
    scheme: [['[S²⁻] = Ka1Ka2[H₂S]/[H⁺]² = 3.0 × 10⁻²⁰ M', 1], ['Qsp = 3.0 × 10⁻²² for each cation', 1], ['CdS precipitates (Qsp > Ksp); MnS does not', 1]],
    d: 3, c: 'analysis', t: [4],
  });
})(), () => near(1.2e-21 / 0.04, 3.0e-20, 0.001) || 's3-grp2');

// ---------------------------------------------------------------- long (5 marks, set in parts)
add('long-buf', (() => {
  const pKa = pK(KA.formic);
  const ca = 0.25;
  const cs = 0.5;
  const p0 = hh(pKa, cs, ca);
  const n = 0.01;
  const p1 = hh(pKa, cs - n, ca + n);
  return long({
    stem: `A dyeing laboratory keeps a buffer made from 0.25 mol of methanoic acid and 0.50 mol of sodium methanoate in 1.0 L of solution (Ka of methanoic acid = 1.8 × 10⁻⁴, pKa = ${f2(pKa)}).

(a) What is a buffer solution? Write the Henderson equation for an acidic buffer. [2]

(b) Calculate the pH of this buffer. [1]

(c) Calculate its pH after 0.010 mol of hydrogen chloride is added (no change in volume) and state how the pH change compares with the change in 1 L of pure water. [2]`,
    model: String.raw`(a) A buffer resists a change in pH when small amounts of acid or base are added. $\text{pH} = \text{p}K_a + \log\dfrac{[\text{salt}]}{[\text{acid}]}$.

(b) $\text{pH} = ${f2(pKa)} + \log\dfrac{0.50}{0.25} = ${f2(pKa)} + 0.30 \approx ${f2(p0)}$.

(c) HCl converts 0.010 mol of methanoate to the acid: salt $= 0.49$, acid $= 0.26$ mol. $\text{pH} = ${f2(pKa)} + \log\dfrac{0.49}{0.26} \approx ${f2(p1)}$, a fall of about ${(p0 - p1).toFixed(2)}. In pure water 0.010 M HCl gives pH 2.00, a fall of 5 units, so the buffer resists the change.`,
    sol: `pH ${f2(p0)}; after HCl ${f2(p1)}.`,
    scheme: [['(a) Definition of a buffer', 1], ['(a) Henderson equation', 1], ['(b) pH = 3.74 + log 2 ≈ 4.04', 1], ['(c) New ratio 0.49/0.26 and pH ≈ 4.02', 1], ['(c) Comparison: 0.03 unit against 5 units in water', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(hh(3.74, 0.5, 0.25), 4.04, 0.001) && near(hh(3.74, 0.49, 0.26), 4.02, 0.003) || 'long-buf');
add('long-hyd', (() => {
  const c = 0.15;
  const p = pHwasb(c, KA.formic);
  return long({
    stem: `(a) For a salt of a weak acid HA and a strong base, derive the relations Kh = Kw/Ka, the degree of hydrolysis h = √(Kh/c) and pH = 7 + ½(pKa + log c). [3]

(b) Sodium methanoate is the salt of a weak acid (Ka = 1.8 × 10⁻⁴). Calculate the pH of a ${c} M solution of this salt and state whether it is acidic or basic. [2]`,
    model: String.raw`(a) $\ce{A- + H2O <=> HA + OH-}$, $K_h = \dfrac{[\text{HA}][\ce{OH-}]}{[\ce{A-}]} = \dfrac{K_w}{K_a}$. With degree of hydrolysis $h$: $[\ce{A-}] = c(1-h) \approx c$, $[\text{HA}] = [\ce{OH-}] = ch$, so $K_h = ch^2$ and $h = \sqrt{K_h/c}$. Then $[\ce{OH-}] = ch = \sqrt{K_w c/K_a}$, $[\ce{H+}] = K_w/[\ce{OH-}] = \sqrt{K_wK_a/c}$, and $\text{pH} = \tfrac12\text{p}K_w + \tfrac12\text{p}K_a + \tfrac12\log c = 7 + \tfrac12(\text{p}K_a + \log c)$.

(b) $\text{p}K_a = ${f2(pKaF())}$, $\log ${c} = ${Math.log10(c).toFixed(2)}$, so $\text{pH} = 7 + \tfrac12(${f2(pKaF())} - ${Math.abs(Math.log10(c)).toFixed(2)}) \approx ${f2(p)}$. The solution is basic.`,
    sol: `pH ≈ ${f2(p)}, basic.`,
    scheme: [['(a) Equation and Kh = Kw/Ka', 1], ['(a) Kh = c h² so h = √(Kh/c) and [OH⁻] = ch', 1], ['(a) Conversion to pH = 7 + ½(pKa + log c)', 1], ['(b) Substitution pKa = 3.74 and log c = −0.82', 1], ['(b) pH = 8.46 and basic', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(7 + 0.5 * (3.74 - 0.824), 8.46, 0.003) || 'long-hyd');
add('long-ksp', (() => {
  const s = sAB2(KSP.PbI2);
  const sI = 2 * s;
  const c = 0.1;
  const sK = KSP.PbI2 / c ** 2;
  return long({
    stem: `(a) For a salt of the type AB₂ show that Ksp = 4s³, where s is its molar solubility. [2]

(b) Lead iodide, PbI₂, has Ksp = 7.1 × 10⁻⁹ at 298 K. Calculate its molar solubility and the concentration of iodide ions in the saturated solution. [2]

(c) Calculate its solubility in 0.10 M potassium iodide. [1]`,
    model: String.raw`(a) $\ce{AB2(s) <=> A^2+ + 2B-}$. If $s$ mol dissolve per litre, $[\text{A}] = s$ and $[\text{B}] = 2s$, so $K_{sp} = s(2s)^2 = 4s^3$.

(b) $s = (K_{sp}/4)^{1/3} = (1.78\times10^{-9})^{1/3} \approx ${sc(s, 2)}$ mol L⁻¹ and $[\ce{I-}] = 2s \approx ${sc(sI, 2)}$ mol L⁻¹.

(c) The iodide from KI (0.10 M) is far greater than that from PbI₂, so $s = [\ce{Pb^2+}] = K_{sp}/[\ce{I-}]^2 = 7.1\times10^{-9}/(0.10)^2 \approx ${sc(sK, 2)}$ mol L⁻¹ — lower, by the common ion effect.`,
    sol: `s ≈ ${scm(s, 2)}; [I⁻] ≈ ${scm(sI, 2)}; s in KI ≈ ${scm(sK, 2)}.`,
    scheme: [['(a) A²⁺ = s and B⁻ = 2s from the dissolution equilibrium', 1], ['(a) Ksp = s(2s)² = 4s³', 1], ['(b) s = (Ksp/4)^(1/3) = 1.21 × 10⁻³ mol L⁻¹', 1], ['(b) [I⁻] = 2s = 2.4 × 10⁻³ mol L⁻¹', 1], ['(c) s = Ksp/[I⁻]² = 7.1 × 10⁻⁷ mol L⁻¹', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(Math.cbrt(7.1e-9 / 4), 1.21e-3, 0.01) && near(7.1e-9 / 0.01, 7.1e-7, 0.001) || 'long-ksp');
add('long-group', (() => {
  const oh = ohMix(KB.ammonia, 0.1, 0.5);
  const oh0 = Math.sqrt(KB.ammonia * 0.1);
  const qMg = Q(0.02, 1, oh, 2);
  const qFe = Q(0.02, 1, oh, 3);
  const qMg0 = Q(0.02, 1, oh0, 2);
  return long({
    stem: `A filtrate containing 0.020 M Mg²⁺ and 0.020 M Fe³⁺ is treated with 0.10 M aqueous ammonia (Kb = 1.8 × 10⁻⁵). Ksp of Mg(OH)₂ = 1.8 × 10⁻¹¹ and of Fe(OH)₃ = 4.0 × 10⁻³⁸ (given). Take 0.50 M NH₄Cl to be present in a second run.

(a) What is the purpose of adding ammonium chloride before ammonia in group III analysis? [2]

(b) Calculate [OH⁻] in the ammonia solution with and without the NH₄Cl, and decide in each run whether Mg(OH)₂ precipitates. Show that Fe(OH)₃ precipitates in the run with NH₄Cl. [3]`,
    model: String.raw`(a) NH₄Cl supplies NH₄⁺, the common ion of NH₄OH ⇌ NH₄⁺ + OH⁻. It suppresses the ionisation of ammonia so $[\ce{OH-}]$ is low; only hydroxides of very small Ksp (Fe, Al, Cr) are precipitated and Mg(OH)₂ is not.

(b) Without NH₄Cl: $[\ce{OH-}] = \sqrt{K_bc} = ${sc(oh0, 2)}$, $Q_{sp}(\ce{Mg(OH)2}) = 0.020\times(${sc(oh0, 2)})^2 \approx ${sc(qMg0, 2)} > 1.8\times10^{-11}$: Mg(OH)₂ would precipitate. With NH₄Cl: $[\ce{OH-}] = K_bc_b/c_s = 1.8\times10^{-5}\times0.10/0.50 = ${sc(oh, 2)}$. $Q_{sp}(\ce{Mg(OH)2}) = 0.020\times(${sc(oh, 2)})^2 \approx ${sc(qMg, 2)} < 1.8\times10^{-11}$: no precipitate. $Q_{sp}(\ce{Fe(OH)3}) = 0.020\times(${sc(oh, 2)})^3 \approx ${sc(qFe, 2)} \gg 4.0\times10^{-38}$: Fe(OH)₃ precipitates.`,
    sol: `[OH⁻] ${scm(oh0, 2)} without and ${scm(oh, 2)} with NH₄Cl; Mg(OH)₂ stays dissolved only with the salt; Fe(OH)₃ precipitates.`,
    scheme: [['(a) NH₄⁺ is a common ion that suppresses ionisation of NH₄OH', 1], ['(a) Low [OH⁻] precipitates only hydroxides of very small Ksp', 1], ['(b) [OH⁻] = 1.3 × 10⁻³ without and 3.6 × 10⁻⁶ with NH₄Cl', 1], ['(b) Mg(OH)₂: Qsp = 3.6 × 10⁻⁸ (precipitates) against 2.6 × 10⁻¹³ (does not)', 1], ['(b) Fe(OH)₃: Qsp = 9.3 × 10⁻¹⁹ ≫ Ksp, so it precipitates', 1]],
    d: 4, c: 'analysis', t: [1, 4],
  });
})(), () => near(1.8e-5 * 0.1 / 0.5, 3.6e-6, 0.001) && near(0.02 * (3.6e-6) ** 2, 2.59e-13, 0.01) || 'long-group');
add('long-bufderive', (() => {
  const pKb = pK(KB.ammonia);
  const ratio = 10 ** (9.0 - (14 - pKb));
  return long({
    stem: `(a) Derive the Henderson equation pH = pKa + log([A⁻]/[HA]) for a buffer of a weak acid HA and its salt NaA. [2]

(b) Ammonium ion has pKa = ${f2(14 - pKb)} (from pKb of ammonia = ${f2(pKb)}). In what ratio [NH₃]/[NH₄⁺] must the two be mixed to give a buffer of pH 9.00? [2]

(c) Is this ratio within the effective range of the buffer? Give a reason. [1]`,
    model: String.raw`(a) $K_a = \dfrac{[\ce{H+}][\ce{A-}]}{[\text{HA}]}$ so $[\ce{H+}] = K_a\dfrac{[\text{HA}]}{[\ce{A-}]}$. Taking $-\log$ of both sides: $\text{pH} = \text{p}K_a + \log\dfrac{[\ce{A-}]}{[\text{HA}]}$. Since NaA is fully ionised, $[\ce{A-}] \approx [\text{salt}]$ and $[\text{HA}] \approx [\text{acid}]$.

(b) $\log\dfrac{[\ce{NH3}]}{[\ce{NH4+}]} = 9.00 - ${f2(14 - pKb)} = ${(9 - (14 - pKb)).toFixed(2)}$, so the ratio $\approx ${ratio.toFixed(2)}$.

(c) Yes: the ratio lies between 0.1 and 10 (pH within pKa ± 1), so the buffer has good capacity.`,
    sol: `Ratio [NH₃]/[NH₄⁺] ≈ ${ratio.toFixed(2)}; inside 0.1–10.`,
    scheme: [['(a) Starts from Ka and rearranges for [H⁺]', 1], ['(a) Takes negative logs to get the Henderson equation', 1], ['(b) log ratio = 9.00 − 9.26 = −0.26', 1], ['(b) ratio = 0.55', 1], ['(c) Inside 0.1 to 10, within pKa ± 1', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(10 ** (9 - (14 - 4.74)), 0.55, 0.005) || 'long-bufderive');
add('long-ci', (() => {
  const cb = 0.4;
  const cs = 0.1;
  const oh0 = Math.sqrt(KB.ammonia * cb);
  const oh1 = ohMix(KB.ammonia, cb, cs);
  const p0 = ohToPH(oh0);
  const p1 = ohToPH(oh1);
  return long({
    stem: `(a) Explain the common ion effect, taking aqueous ammonia and ammonium chloride as the example. [2]

(b) A 0.40 M solution of ammonium hydroxide (Kb = 1.8 × 10⁻⁵) has solid ammonium chloride dissolved in it until the salt is 0.10 M. Calculate the pH before and after. [2]

(c) State one use of this effect in qualitative analysis. [1]`,
    model: String.raw`(a) A strong electrolyte with an ion common to a weak electrolyte suppresses its ionisation. NH₄Cl adds NH₄⁺ to $\ce{NH4OH <=> NH4+ + OH-}$, shifting the equilibrium left so $[\ce{OH-}]$ falls.

(b) Before: $[\ce{OH-}] = \sqrt{K_bc} = \sqrt{1.8\times10^{-5}\times0.40} = ${sc(oh0, 2)}$, pOH $\approx ${f2(14 - p0)}$, pH $\approx ${f2(p0)}$. After: $[\ce{OH-}] = K_bc_b/c_s = 1.8\times10^{-5}\times0.40/0.10 = ${sc(oh1, 2)}$, pOH $\approx ${f2(14 - p1)}$, pH $\approx ${f2(p1)}$.

(c) NH₄Cl is added before NH₄OH in group III to keep $[\ce{OH-}]$ low so that only group III hydroxides precipitate.`,
    sol: `pH ${f2(p0)} before; ${f2(p1)} after.`,
    scheme: [['(a) Statement of the effect', 1], ['(a) NH₄⁺ shifts NH₄OH ⇌ NH₄⁺ + OH⁻ to the left, lowering [OH⁻]', 1], ['(b) pH before = 11.43', 1], ['(b) pH after = 9.86', 1], ['(c) Group III precipitation with NH₄Cl then NH₄OH', 1]],
    d: 3, c: 'application', t: [1],
  });
})(), () => near(14 + Math.log10(Math.sqrt(1.8e-5 * 0.4)), 11.43, 0.003) && near(14 + Math.log10(1.8e-5 * 4), 9.86, 0.003) || 'long-ci');

// helper used by long-hyd's model answer
function pKaF() {
  return pK(KA.formic);
}
