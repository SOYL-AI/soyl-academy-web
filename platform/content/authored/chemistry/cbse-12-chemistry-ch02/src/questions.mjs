// ch02 Electrochemistry — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c c d a.
// Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
const F = 96500;
const E0 = { Li: -3.05, Mg: -2.37, Al: -1.66, Zn: -0.76, Fe: -0.44, Ni: -0.25, Sn: -0.14, Pb: -0.13, H: 0, Cu: 0.34, Ag: 0.8 };
const lam = { H: 349.6, OH: 199.1, Na: 50.1, K: 73.5, NH4: 73.5, Cl: 76.3, HCOO: 54.6, Ac: 40.9, Ca: 119.0, SO4: 160.0 };

// ---------------------------------------------------------------- t01 galvanic cells and electrode potentials
add('notation-anode-mcq', mcq({
  stem: r`In the cell $\ce{Mg(s) | Mg^2+(aq) || Ag+(aq) | Ag(s)}$, which statement is correct?`,
  right: 'Magnesium is oxidised at the anode.',
  wrong: ['Magnesium is reduced at the cathode.', 'Silver is oxidised at the anode.', 'Silver ions are oxidised at the cathode.'],
  sol: 'By convention the anode is written on the left, and oxidation always occurs at the anode, so magnesium is oxidised — option (@K). Silver ions are reduced at the cathode on the right.',
  d: 1, c: 'understanding', t: [1],
}));
add('reducing-agent-mcq', mcq({
  stem: r`Standard reduction potentials: $\ce{Ag+/Ag} = +0.80\ \text{V}$, $\ce{Cu^2+/Cu} = +0.34\ \text{V}$, $\ce{Zn^2+/Zn} = -0.76\ \text{V}$, $\ce{Mg^2+/Mg} = -2.37\ \text{V}$. The strongest reducing agent among the metals is:`,
  right: 'Magnesium',
  wrong: ['Silver', 'Copper', 'Zinc'],
  sol: 'A reducing agent gives electrons; the metal with the most negative reduction potential loses electrons most readily. Magnesium (−2.37 V) — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('emf-calc-mcq', mcq({
  stem: r`$E^\circ(\ce{Ag+/Ag}) = +0.80\ \text{V}$ and $E^\circ(\ce{Zn^2+/Zn}) = -0.76\ \text{V}$. The standard EMF of $\ce{Zn | Zn^2+ || Ag+ | Ag}$ is:`,
  right: r`$1.56\ \text{V}$`,
  wrong: [r`$0.04\ \text{V}$`, r`$2.36\ \text{V}$`, r`$-1.56\ \text{V}$`],
  sol: r`$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode} = 0.80 - (-0.76) = 1.56$, in volts — option (@K). (@1) ignores the sign of zinc’s potential, (@2) doubles silver’s potential (potentials are never multiplied), and (@3) subtracts the wrong way round.`,
  d: 2, c: 'understanding', t: [1],
}), () => near(E0.Ag - E0.Zn, 1.56) || 'emf');
add('displacement-mcq', mcq({
  stem: r`$E^\circ$ values: $\ce{Ni^2+/Ni} = -0.25$, $\ce{Zn^2+/Zn} = -0.76$, $\ce{Pb^2+/Pb} = -0.13$, $\ce{Cu^2+/Cu} = +0.34$, $\ce{Ag+/Ag} = +0.80\ \text{V}$. Which metal will displace nickel from nickel sulfate solution?`,
  right: 'Zinc',
  wrong: ['Lead', 'Copper', 'Silver'],
  sol: r`A metal displaces nickel if it is a stronger reducing agent, i.e. has a lower $E^\circ$ than $-0.25\ \text{V}$. Only zinc ($-0.76\ \text{V}$) does: $E^\circ_\text{cell} = -0.25 - (-0.76) = 0.51\ \text{V} > 0$ — option (@K). Lead (@1) is just above nickel, so its cell EMF would be negative.`,
  d: 2, c: 'application', t: [1],
}));
add('salt-bridge-mcq', mcq({
  stem: 'If the salt bridge of a working Daniell cell is removed, the voltmeter reading:',
  right: 'drops to zero, because the internal circuit is broken and charge builds up in the solutions',
  wrong: ['stays the same, because electrons still flow through the wire', 'doubles, because the solutions can no longer mix', 'reverses, because copper becomes the anode'],
  sol: 'Without the salt bridge, ions cannot move between the half-cells; positive charge collects around the zinc and negative around the copper, and the current stops at once — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('emf-intensive-ar', ar({
  a: r`The standard potential of $\ce{Ag+ + e- -> Ag}$ is $+0.80\ \text{V}$; for $\ce{2Ag+ + 2e- -> 2Ag}$ it is still $+0.80\ \text{V}$.`,
  r: 'Electrode potential is an intensive property and does not depend on the amount of substance.',
  key: 'a',
  sol: 'Both are true. Doubling the equation doubles ΔG° but also doubles n, so E° = −ΔG°/(nF) is unchanged; R explains A — option (a).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('emf-num', num({
  stem: r`Calculate the standard EMF, in volts, of the cell $\ce{Fe | Fe^2+ (1 M) || Ag+ (1 M) | Ag}$. ($E^\circ$: $\ce{Fe^2+/Fe} = -0.44\ \text{V}$, $\ce{Ag+/Ag} = +0.80\ \text{V}$)`,
  value: 1.24, tol: 0.005, unit: 'V',
  sol: r`$E^\circ_\text{cell} = E^\circ_\text{cathode} - E^\circ_\text{anode} = 0.80 - (-0.44) = 1.24$, so $1.24\ \text{V}$.`,
  scheme: [['Cathode minus anode with signs, 1.24 V', 1]],
  d: 1, c: 'understanding', t: [1],
}), () => near(E0.Ag - E0.Fe, 1.24) || 'emf');
add('anode-sign-tf', tf({
  stem: 'In an electrolytic cell, the anode is the negative electrode.',
  key: 'f',
  sol: 'False. In an electrolytic cell the anode is joined to the positive terminal of the supply, so it is positive; oxidation still occurs there.',
  d: 2, c: 'understanding', t: [1, 4],
}));
add('salt-bridge-short', short({
  marks: 2,
  stem: 'State two functions of a salt bridge in a galvanic cell. Why is potassium chloride in agar a suitable filling?',
  model: 'A salt bridge completes the internal circuit by letting ions move between the half-cells, and it keeps each solution electrically neutral so that current continues to flow. Potassium chloride is suitable because its ions move at similar speeds and do not react with the electrode solutions; agar keeps it as a gel.',
  sol: 'Two functions, then a reason for the choice of electrolyte.',
  scheme: [['Completes the circuit; maintains electrical neutrality', 1], ['Ions of similar mobility that do not react (agar as gel)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('she-short', short({
  marks: 2,
  stem: 'A zinc electrode in 1 M zinc sulfate is connected to a standard hydrogen electrode at 298 K. The voltmeter reads 0.76 V, and electrons flow from the zinc to the hydrogen electrode. What is the standard electrode potential of zinc, and why is the hydrogen electrode used for such measurements?',
  model: 'Electrons leave the zinc, so zinc is the anode and has the lower potential. Since the hydrogen electrode is 0 V, E°(Zn²⁺/Zn) = 0 − 0.76 = −0.76 V. Only differences in potential can be measured, so the hydrogen electrode serves as an agreed reference, assigned exactly zero.',
  sol: 'Use the direction of electron flow to decide the sign; the SHE is the zero reference.',
  scheme: [['E°(Zn²⁺/Zn) = −0.76 V with reasoning from electron flow', 1], ['SHE is the zero reference because only differences are measurable', 1]],
  d: 3, c: 'application', t: [1],
}));
add('predict-short', short({
  marks: 2,
  stem: r`Can iron(II) sulfate solution be stored safely in a copper vessel? Justify using $E^\circ(\ce{Fe^2+/Fe}) = -0.44\ \text{V}$ and $E^\circ(\ce{Cu^2+/Cu}) = +0.34\ \text{V}$.`,
  model: r`For copper to react, $\ce{Cu + Fe^2+ -> Cu^2+ + Fe}$ would need copper as anode: $E^\circ_\text{cell} = -0.44 - 0.34 = -0.78\ \text{V}$. The EMF is negative, so the reaction is not spontaneous. Yes, the solution can be stored in copper.`,
  sol: 'Assume the reaction happens and find the sign of the cell EMF.',
  scheme: [['E°cell = −0.78 V for the assumed reaction', 1], ['Negative, so no reaction: safe to store', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(E0.Fe - E0.Cu, -0.78) || 'emf');
add('cell-design-short3', short({
  marks: 3, wl: null,
  stem: r`A galvanic cell is built from an aluminium electrode in $1\ \text{M}$ aluminium ions and a nickel electrode in $1\ \text{M}$ nickel ions. ($E^\circ$: $\ce{Al^3+/Al} = -1.66\ \text{V}$, $\ce{Ni^2+/Ni} = -0.25\ \text{V}$) (a) Which electrode is the anode? (b) Write the cell in notation and the balanced cell reaction. (c) Calculate $E^\circ_\text{cell}$.`,
  model: r`(a) Aluminium has the more negative potential, so it is oxidised: **aluminium is the anode**.

(b) $\ce{Al(s) | Al^3+(aq, 1 M) || Ni^2+(aq, 1 M) | Ni(s)}$. Electrons balanced (6): $\ce{2Al + 3Ni^2+ -> 2Al^3+ + 3Ni}$.

(c) $E^\circ_\text{cell} = -0.25 - (-1.66) = 1.41\ \text{V}$.`,
  sol: 'Lower E° is the anode; balance electrons (2 × 3 = 3 × 2); cathode minus anode.',
  scheme: [['(a) Aluminium is the anode', 1], ['(b) Correct notation and balanced equation', 1], ['(c) E°cell = 1.41 V', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(E0.Ni - E0.Al, 1.41) || 'emf');

// ---------------------------------------------------------------- t02 Nernst equation, ΔG and K
add('negative-emf-mcq', mcq({
  stem: 'A cell reaction has a negative standard EMF at 298 K. Which is correct for this reaction?',
  right: 'ΔG° is positive and K is less than 1.',
  wrong: ['ΔG° is negative and K is greater than 1.', 'ΔG° is positive and K is greater than 1.', 'ΔG° is zero and K equals 1.'],
  sol: r`$\Delta_\text{r}G^\circ = -nFE^\circ_\text{cell}$: a negative $E^\circ$ gives a positive $\Delta G^\circ$, and $\log K = \dfrac{nE^\circ}{0.059}$ is negative, so $K < 1$ — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}));
add('nernst-direction-mcq', mcq({
  stem: 'For a Daniell cell, which change increases the EMF?',
  right: 'Increasing the concentration of copper(II) ions',
  wrong: ['Increasing the concentration of zinc ions', 'Making the zinc rod larger', 'Diluting the copper sulfate solution'],
  sol: r`$E = 1.10 - \dfrac{0.059}{2}\log\dfrac{[\ce{Zn^2+}]}{[\ce{Cu^2+}]}$. Raising $[\ce{Cu^2+}]$ lowers $Q$ and raises $E$ — option (@K). More zinc ions (@1) or dilute copper sulfate (@3) raise $Q$; the size of a solid electrode (@2) does not appear in $Q$.`,
  d: 3, c: 'application', t: [2],
}));
add('k-calc-mcq', mcq({
  stem: r`A one-electron cell reaction has $E^\circ_\text{cell} = 0.118\ \text{V}$ at $298\ \text{K}$. Its equilibrium constant is:`,
  right: r`$100$`,
  wrong: [r`$2$`, r`$10$`, r`$0.01$`],
  sol: r`$\log K = \dfrac{nE^\circ}{0.059} = \dfrac{1 \times 0.118}{0.059} = 2$, so $K = 10^{2} = 100$ — option (@K). (@1) stops at $\log K$; (@3) uses the wrong sign.`,
  d: 2, c: 'application', t: [2],
}), () => near(Math.pow(10, 0.118 / 0.059), 100) || 'K');
add('dg-mcq', mcq({
  stem: r`For a two-electron cell reaction, $E^\circ_\text{cell} = 0.50\ \text{V}$. $\Delta_\text{r}G^\circ$ is ($F = 96500\ \text{C mol}^{-1}$):`,
  right: r`$-96.5\ \text{kJ mol}^{-1}$`,
  wrong: [r`$-48.25\ \text{kJ mol}^{-1}$`, r`$+96.5\ \text{kJ mol}^{-1}$`, r`$-193\ \text{kJ mol}^{-1}$`],
  sol: r`$\Delta_\text{r}G^\circ = -nFE^\circ = -2 \times 96500 \times 0.50 = -96500$ J, that is $-96.5\ \text{kJ mol}^{-1}$ — option (@K). (@1) uses $n = 1$, (@2) drops the minus sign, and (@3) uses $n = 4$.`,
  d: 2, c: 'understanding', t: [2],
}), () => near(-2 * F * 0.5 / 1000, -96.5) || 'dG');
add('equil-tf', tf({
  stem: 'When a galvanic cell reaction reaches equilibrium, the EMF of the cell becomes zero.',
  key: 't',
  sol: r`True. At equilibrium $\Delta_\text{r}G = 0$, so $E_\text{cell} = -\Delta_\text{r}G/(nF) = 0$: the cell can do no more work.`,
  d: 1, c: 'recall', t: [2],
}));
add('nernst-num', num({
  marks: 2,
  stem: r`Calculate the EMF at $298\ \text{K}$ of the cell $\ce{Ni(s) | Ni^2+ (0.01 M) || Ag+ (0.001 M) | Ag(s)}$. ($E^\circ_\text{cell} = 1.05\ \text{V}$)`,
  value: 0.932, tol: 0.002, unit: 'V',
  sol: r`Step 1 — Reaction $\ce{Ni + 2Ag+ -> Ni^2+ + 2Ag}$, $n = 2$; $Q = \dfrac{[\ce{Ni^2+}]}{[\ce{Ag+}]^2} = \dfrac{0.01}{(0.001)^2} = 10000$, so $\log Q = 4$.

Step 2 — $E = 1.05 - \dfrac{0.059}{2} \times 4 = 1.05 - 0.118 = 0.932$, so $0.932\ \text{V}$.`,
  scheme: [['Balanced reaction with n = 2 and Q = 10⁴ (squares [Ag⁺])', 1], ['E = 0.932 V', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(1.05 - (0.059 / 2) * Math.log10(0.01 / 1e-6), 0.932, 0.001) || 'E');
add('dg-num', num({
  marks: 2,
  stem: r`Calculate $\Delta_\text{r}G^\circ$, in $\text{kJ mol}^{-1}$, for $\ce{Fe(s) + 2Ag+(aq) -> Fe^2+(aq) + 2Ag(s)}$, given $E^\circ_\text{cell} = 1.24\ \text{V}$ and $F = 96500\ \text{C mol}^{-1}$.`,
  value: -239.3, tol: 0.2, unit: 'kJ mol⁻¹',
  sol: r`Step 1 — Two electrons are transferred, so $n = 2$.

Step 2 — $\Delta_\text{r}G^\circ = -2 \times 96500 \times 1.24 = -239320$ J $\text{mol}^{-1}$.

Step 3 — In kilojoules: $-239320 \div 1000 = -239.3$, so about $-239.3\ \text{kJ mol}^{-1}$.`,
  scheme: [['n = 2 and ΔG° = −nFE°', 1], ['−239.3 kJ/mol with sign and unit', 1]],
  d: 2, c: 'understanding', t: [2],
}), () => near((-2 * F * 1.24) / 1000, -239.32, 0.0005) || 'dG');
add('logk-num', num({
  marks: 2,
  stem: r`Calculate $\log K$ at $298\ \text{K}$ for $\ce{Cu(s) + 2Ag+(aq) -> Cu^2+(aq) + 2Ag(s)}$. ($E^\circ$: $\ce{Ag+/Ag} = +0.80\ \text{V}$, $\ce{Cu^2+/Cu} = +0.34\ \text{V}$)`,
  value: 15.59, tol: 0.05, unit: null,
  sol: r`Step 1 — $E^\circ_\text{cell} = 0.80 - 0.34 = 0.46$, in volts; $n = 2$.

Step 2 — $\log K = \dfrac{nE^\circ}{0.059} = \dfrac{2 \times 0.46}{0.059} \approx 15.59$.`,
  scheme: [['E°cell = 0.46 V, n = 2', 1], ['log K ≈ 15.6', 1]],
  d: 3, c: 'application', t: [2],
}), () => near((2 * 0.46) / 0.059, 15.59, 0.001) || 'logK');
add('ph-num', num({
  stem: r`A hydrogen electrode ($p_{\ce{H2}} = 1\ \text{bar}$) dips into a solution of pH 10 at $298\ \text{K}$. Find its electrode potential in volts.`,
  value: -0.59, tol: 0.005, unit: 'V',
  sol: r`$E = -0.059 \times \text{pH} = -0.059 \times 10 = -0.59$, so $-0.59\ \text{V}$.`,
  scheme: [['E = −0.059 × pH = −0.59 V', 1]],
  d: 2, c: 'understanding', t: [2],
}), () => near(-0.059 * 10, -0.59) || 'E');
add('nernst-explain-short', short({
  marks: 2,
  stem: 'Use the Nernst equation to explain why the voltage of a Daniell cell slowly falls as it is used, and what its voltage is when it is completely "flat".',
  model: 'As the cell works, zinc ions are produced and copper ions are used up, so Q = [Zn²⁺]/[Cu²⁺] keeps increasing and the term (0.059/2) log Q grows, lowering E. When the reaction reaches equilibrium, Q equals K and the EMF becomes zero: the cell is flat.',
  sol: 'Relate the changing concentrations to Q in the Nernst equation; at equilibrium E = 0.',
  scheme: [['Q increases as Zn²⁺ forms and Cu²⁺ is used, so E falls', 1], ['At equilibrium E = 0', 1]],
  d: 3, c: 'application', t: [2],
}));
add('nernst-short3', short({
  marks: 3, wl: null,
  stem: r`For the cell $\ce{Zn(s) | Zn^2+ (0.1 M) || Ag+ (0.01 M) | Ag(s)}$ at $298\ \text{K}$: (a) write the cell reaction, (b) write the Nernst equation for the cell, and (c) calculate its EMF. ($E^\circ_\text{cell} = 1.56\ \text{V}$)`,
  model: r`(a) $\ce{Zn(s) + 2Ag+(aq) -> Zn^2+(aq) + 2Ag(s)}$, $n = 2$.

(b) $E_\text{cell} = E^\circ_\text{cell} - \dfrac{0.059}{2}\log\dfrac{[\ce{Zn^2+}]}{[\ce{Ag+}]^2}$.

(c) $Q = \dfrac{0.1}{(0.01)^2} = 1000$, $\log Q = 3$; $E = 1.56 - 0.0295 \times 3 = 1.4715$, about $1.47\ \text{V}$.`,
  sol: 'Square the silver ion concentration in Q because two silver ions appear in the balanced equation.',
  scheme: [['(a) Balanced reaction, n = 2', 1], ['(b) Nernst equation with [Ag⁺]²', 1], ['(c) E ≈ 1.47 V', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(1.56 - (0.059 / 2) * Math.log10(0.1 / 1e-4), 1.4715, 0.001) || 'E');

// ---------------------------------------------------------------- t03 conductance
add('dilution-trend-mcq', mcq({
  stem: 'When a solution of a strong electrolyte is diluted, what happens to its conductivity (κ) and its molar conductivity (Λm)?',
  right: 'κ decreases and Λm increases.',
  wrong: ['Both increase.', 'Both decrease.', 'κ increases and Λm decreases.'],
  sol: 'Dilution lowers the number of ions per unit volume, so κ falls; but the ions from one mole move more freely, so Λm rises — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('units-lambda-mcq', mcq({
  stem: r`A student finds $\kappa = 2.5 \times 10^{-4}\ \text{S cm}^{-1}$ for a $0.020\ \text{mol L}^{-1}$ solution and reports $\Lambda_\text{m} = \dfrac{\kappa}{c} = 0.0125\ \text{S cm}^2\ \text{mol}^{-1}$. Which is the correct value and the reason for the error?`,
  right: r`$12.5\ \text{S cm}^2\ \text{mol}^{-1}$; c must be converted to $\text{mol cm}^{-3}$, which brings in a factor of 1000`,
  wrong: [r`$0.0125\ \text{S cm}^2\ \text{mol}^{-1}$; the student is correct`, r`$1.25 \times 10^{-5}\ \text{S cm}^2\ \text{mol}^{-1}$; the student should have divided by 1000`, r`$125\ \text{S cm}^2\ \text{mol}^{-1}$; the factor should be 10000`],
  sol: r`$\Lambda_\text{m} = \dfrac{\kappa \times 1000}{c} = \dfrac{2.5 \times 10^{-4} \times 1000}{0.020} = 12.5$, in $\text{S cm}^2\ \text{mol}^{-1}$ — option (@K). With κ per cm and c per litre, the 1000 converts litres to cm³.`,
  d: 3, c: 'analysis', t: [3],
}), () => near((2.5e-4 * 1000) / 0.02, 12.5) || 'Lm');
add('kohl-mcq', mcq({
  stem: r`$\lambda^\circ(\ce{Ca^2+}) = 119.0$ and $\lambda^\circ(\ce{Cl-}) = 76.3\ \text{S cm}^2\ \text{mol}^{-1}$. $\Lambda^\circ_\text{m}$ of calcium chloride is:`,
  right: r`$271.6\ \text{S cm}^2\ \text{mol}^{-1}$`,
  wrong: [r`$195.3\ \text{S cm}^2\ \text{mol}^{-1}$`, r`$314.3\ \text{S cm}^2\ \text{mol}^{-1}$`, r`$42.7\ \text{S cm}^2\ \text{mol}^{-1}$`],
  sol: r`$\Lambda^\circ(\ce{CaCl2}) = \lambda^\circ(\ce{Ca^2+}) + 2\lambda^\circ(\ce{Cl-}) = 119.0 + 2 \times 76.3 = 271.6$ — option (@K). (@1) forgets the 2 chloride ions, (@2) doubles calcium instead, and (@3) subtracts.`,
  d: 2, c: 'understanding', t: [3],
}), () => near(lam.Ca + 2 * lam.Cl, 271.6) || 'kohl');
add('highest-ion-mcq', mcq({
  stem: r`Using $\lambda^\circ$ values (S cm² mol⁻¹): $\ce{H+}$ 349.6, $\ce{Na+}$ 50.1, $\ce{K+}$ 73.5, $\ce{OH-}$ 199.1, $\ce{Cl-}$ 76.3, which electrolyte has the highest limiting molar conductivity?`,
  right: 'Hydrochloric acid',
  wrong: ['Sodium hydroxide', 'Potassium chloride', 'Sodium chloride'],
  sol: r`By Kohlrausch’s law: HCl $= 349.6 + 76.3 = 425.9$; NaOH $= 50.1 + 199.1 = 249.2$; KCl $= 73.5 + 76.3 = 149.8$; NaCl $= 50.1 + 76.3 = 126.4$. Hydrochloric acid is highest — option (@K), thanks to the very mobile hydrogen ion.`,
  d: 2, c: 'application', t: [3],
}), () => near(lam.H + lam.Cl, 425.9) || 'HCl');
add('kappa-dilution-ar', ar({
  a: 'The conductivity of a potassium chloride solution decreases when it is diluted.',
  r: 'The molar conductivity of a potassium chloride solution increases when it is diluted.',
  key: 'b',
  sol: 'Both are true. But A is explained by the fall in the number of ions per unit volume, not by the rise in molar conductivity; R is a separate fact — option (b).',
  d: 3, c: 'understanding', t: [3],
}));
add('weak-extrap-ar', ar({
  a: r`$\Lambda^\circ_\text{m}$ of ethanoic acid cannot be found by extrapolating its graph of $\Lambda_\text{m}$ against $\sqrt{c}$ to zero concentration.`,
  r: 'Ethanoic acid becomes a strong electrolyte at high dilution.',
  key: 'c',
  sol: 'A is true: the curve rises steeply near zero concentration and cannot be extended reliably. R is false: ethanoic acid stays a weak electrolyte; its degree of dissociation only increases on dilution — option (c).',
  d: 3, c: 'understanding', t: [3],
}));
add('kohl-tf', tf({
  stem: 'According to Kohlrausch’s law, at infinite dilution each ion makes a definite contribution to the molar conductivity, whatever the other ion in the electrolyte.',
  key: 't',
  sol: 'True. This is the law of independent migration of ions: Λ°m = ν₊λ°₊ + ν₋λ°₋.',
  d: 1, c: 'recall', t: [3],
}));
add('cellconst-fill', fill({
  stem: 'For a conductivity cell, the ratio of the distance between the electrodes to their area, l/A, is called the ___.',
  acc: [['cell constant']],
  sol: 'l/A is the **cell constant**, G*.',
  d: 1, c: 'recall', t: [3],
}));
add('units-match', match({
  stem: 'Match each quantity with its usual unit.',
  pairs: [
    ['Conductance', 'S'],
    ['Conductivity', r`$\text{S cm}^{-1}$`],
    ['Molar conductivity', r`$\text{S cm}^2\ \text{mol}^{-1}$`],
    ['Cell constant', r`$\text{cm}^{-1}$`],
  ],
  order: [3, 0, 2, 1],
  sol: 'G is in siemens; κ = G × l/A is in S cm⁻¹; Λm = κ/c is in S cm² mol⁻¹; G* = l/A is in cm⁻¹.',
  d: 2, c: 'recall', t: [3],
}));
add('kappa-num', num({
  marks: 2,
  stem: r`A conductivity cell of cell constant $0.92\ \text{cm}^{-1}$ has a resistance of $400\ \Omega$ when filled with a $0.020\ \text{M}$ solution of an electrolyte. Find the molar conductivity in $\text{S cm}^2\ \text{mol}^{-1}$.`,
  value: 115, tol: 0.5, unit: 'S cm² mol⁻¹',
  sol: r`Step 1 — $\kappa = \dfrac{G^*}{R} = \dfrac{0.92}{400} = 0.0023$, in $\text{S cm}^{-1}$.

Step 2 — $\Lambda_\text{m} = \dfrac{0.0023 \times 1000}{0.020} = 115$, so $115\ \text{S cm}^2\ \text{mol}^{-1}$.`,
  scheme: [['κ = 2.3 × 10⁻³ S/cm', 1], ['Λm = 115 S cm² mol⁻¹', 1]],
  d: 2, c: 'understanding', t: [3],
}), () => near(((0.92 / 400) * 1000) / 0.02, 115) || 'Lm');
add('kohl-num', num({
  stem: r`Using $\lambda^\circ(\ce{Na+}) = 50.1$ and $\lambda^\circ(\ce{SO4^2-}) = 160.0\ \text{S cm}^2\ \text{mol}^{-1}$, find $\Lambda^\circ_\text{m}$ of sodium sulfate in $\text{S cm}^2\ \text{mol}^{-1}$.`,
  value: 260.2, tol: 0.1, unit: 'S cm² mol⁻¹',
  sol: r`$\Lambda^\circ(\ce{Na2SO4}) = 2 \times 50.1 + 160.0 = 260.2$, so $260.2\ \text{S cm}^2\ \text{mol}^{-1}$.`,
  scheme: [['2λ°(Na⁺) + λ°(SO₄²⁻) = 260.2', 1]],
  d: 2, c: 'understanding', t: [3],
}), () => near(2 * lam.Na + lam.SO4, 260.2) || 'kohl');
add('kohl-short', short({
  marks: 2,
  stem: 'State Kohlrausch’s law of independent migration of ions and give one use of it.',
  model: 'At infinite dilution, the limiting molar conductivity of an electrolyte is the sum of the limiting molar conductivities of its cation and anion, each multiplied by its number in the formula. It is used to find Λ°m of weak electrolytes such as ethanoic acid from values for strong electrolytes, and hence their degree of dissociation.',
  sol: 'State the law; one use: Λ°m of weak electrolytes, α or Ka.',
  scheme: [['Statement of the law', 1], ['One valid use', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('kappa-lambda-short', short({
  marks: 2,
  stem: 'Explain why, on dilution, the conductivity of a solution decreases while its molar conductivity increases.',
  model: 'Conductivity is the conductance of a fixed unit volume of solution; on dilution there are fewer ions in that volume, so κ falls. Molar conductivity counts all the ions from one mole; on dilution these ions are farther apart and move more freely (and weak electrolytes dissociate more), so Λm rises.',
  sol: 'Contrast ions per unit volume with ions from one mole.',
  scheme: [['κ: fewer ions per unit volume', 1], ['Λm: ions from one mole move more freely or dissociate more', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('kakohl-short3', short({
  marks: 3, wl: null,
  stem: r`The conductivity of $0.010\ \text{M}$ methanoic acid is $5.00 \times 10^{-4}\ \text{S cm}^{-1}$. Using $\lambda^\circ(\ce{H+}) = 349.6$ and $\lambda^\circ(\ce{HCOO-}) = 54.6\ \text{S cm}^2\ \text{mol}^{-1}$, calculate (a) $\Lambda_\text{m}$, (b) the degree of dissociation and (c) the dissociation constant.`,
  model: r`(a) $\Lambda_\text{m} = \dfrac{5.00 \times 10^{-4} \times 1000}{0.010} = 50.0\ \text{S cm}^2\ \text{mol}^{-1}$.

(b) $\Lambda^\circ_\text{m} = 349.6 + 54.6 = 404.2$; $\alpha = \dfrac{50.0}{404.2} \approx 0.124$.

(c) $K_\text{a} = \dfrac{c\alpha^2}{1 - \alpha} \approx \dfrac{0.010 \times 0.124^2}{0.876} \approx 1.75 \times 10^{-4}$.`,
  sol: 'Λm from κ, Λ°m by Kohlrausch, α as their ratio, then Ka = cα²/(1 − α).',
  scheme: [['(a) Λm = 50.0 S cm² mol⁻¹', 1], ['(b) Λ°m = 404.2 and α ≈ 0.124', 1], ['(c) Ka ≈ 1.75 × 10⁻⁴', 1]],
  d: 4, c: 'application', t: [3],
}), () => {
  const a = 50 / (lam.H + lam.HCOO);
  return (near(a, 0.1237, 0.002) && near((0.01 * a * a) / (1 - a), 1.746e-4, 0.005)) || 'Ka';
});

// ---------------------------------------------------------------- t04 electrolysis
add('brine-cathode-mcq', mcq({
  stem: 'Concentrated aqueous sodium chloride is electrolysed with inert electrodes. The product at the cathode is:',
  right: 'hydrogen gas',
  wrong: ['sodium metal', 'chlorine gas', 'oxygen gas'],
  sol: r`At the cathode, water ($E^\circ = -0.83\ \text{V}$) is reduced far more easily than sodium ions ($E^\circ = -2.71\ \text{V}$), so hydrogen forms and hydroxide ions stay in solution — option (@K). Chlorine (@2) forms at the anode; sodium (@1) forms only from molten sodium chloride.`,
  d: 2, c: 'understanding', t: [4],
}));
add('faraday-charge-mcq', mcq({
  stem: r`The charge needed to deposit one mole of aluminium from $\ce{Al^3+}$ ions is ($F = 96500\ \text{C mol}^{-1}$):`,
  right: r`$289500\ \text{C}$`,
  wrong: [r`$96500\ \text{C}$`, r`$32167\ \text{C}$`, r`$193000\ \text{C}$`],
  sol: r`$\ce{Al^3+ + 3e- -> Al}$ needs 3 mol of electrons: $3 \times 96500 = 289500$ C — option (@K). (@1) uses one electron, (@2) divides by 3, and (@3) uses two electrons.`,
  d: 2, c: 'understanding', t: [4],
}), () => near(3 * F, 289500) || 'Q');
add('products-cuso4-mcq', mcq({
  stem: 'Aqueous copper(II) sulfate is electrolysed using platinum electrodes. The products at the cathode and the anode are:',
  right: 'copper at the cathode and oxygen at the anode',
  wrong: ['hydrogen at the cathode and oxygen at the anode', 'copper at the cathode and sulfur dioxide at the anode', 'copper at the cathode, and the anode dissolves'],
  sol: 'Copper(II) ions are reduced more easily than water, so copper deposits. Sulfate ions are very hard to oxidise, so water is oxidised to oxygen at the inert platinum anode — option (@K). A dissolving anode (@3) happens only with a copper anode.',
  d: 3, c: 'application', t: [4],
}));
add('same-charge-mcq', mcq({
  stem: r`Two cells containing silver nitrate and copper(II) sulfate are connected in series. If $1.08\ \text{g}$ of silver is deposited, the mass of copper deposited is (Ag = 108, Cu = 63.5):`,
  right: r`$0.3175\ \text{g}$`,
  wrong: [r`$0.635\ \text{g}$`, r`$1.08\ \text{g}$`, r`$0.159\ \text{g}$`],
  sol: r`Moles of electrons $= \dfrac{1.08}{108} = 0.01$; copper needs 2 per atom, so $0.005$ mol Cu $= 0.005 \times 63.5 = 0.3175$ g — option (@K). (@1) forgets the factor 2.`,
  d: 3, c: 'application', t: [4],
}), () => near((1.08 / 108 / 2) * 63.5, 0.3175) || 'Cu');
add('faraday-fill', fill({
  stem: 'The charge carried by one mole of electrons, about 96500 C, is called one ___.',
  acc: [['faraday', 'Faraday']],
  sol: 'It is one **faraday** (F).',
  d: 1, c: 'recall', t: [4],
}));
add('faraday-num', num({
  marks: 2,
  stem: r`A current of $2.0\ \text{A}$ is passed through copper(II) sulfate solution for $30\ \text{min}$. Find the mass of copper deposited, in grams. (Cu = 63.5, $F = 96500\ \text{C mol}^{-1}$)`,
  value: 1.18, tol: 0.01, unit: 'g',
  sol: r`Step 1 — $Q = It = 2.0 \times 30 \times 60 = 3600$, in coulombs.

Step 2 — Moles of electrons $= \dfrac{3600}{96500} \approx 0.0373$; moles of Cu $= \dfrac{0.0373}{2} \approx 0.01865$.

Step 3 — Mass $= 0.01865 \times 63.5 \approx 1.18$, so about $1.18\ \text{g}$.`,
  scheme: [['Q = 3600 C (time in seconds)', 0.5], ['Moles of Cu = Q ÷ 2F ≈ 0.0187', 1], ['Mass ≈ 1.18 g', 0.5]],
  d: 2, c: 'application', t: [4],
}), () => near(((2 * 1800) / F / 2) * 63.5, 1.18, 0.005) || 'Cu');
add('time-num', num({
  marks: 2,
  stem: r`How long, in seconds, must a current of $5.0\ \text{A}$ flow through molten aluminium oxide (dissolved in cryolite) to produce $2.7\ \text{g}$ of aluminium? (Al = 27, $F = 96500\ \text{C mol}^{-1}$)`,
  value: 5790, tol: 5, unit: 's',
  sol: r`Step 1 — Moles of Al $= \dfrac{2.7}{27} = 0.1$; each needs 3 electrons, so $0.3$ mol of electrons.

Step 2 — $Q = 0.3 \times 96500 = 28950$, in coulombs.

Step 3 — $t = \dfrac{Q}{I} = \dfrac{28950}{5.0} = 5790$, so $5790\ \text{s}$ (about 96.5 min).`,
  scheme: [['0.3 mol of electrons', 0.5], ['Q = 28950 C', 0.5], ['t = 5790 s', 1]],
  d: 3, c: 'application', t: [4],
}), () => near((((2.7 / 27) * 3 * F) / 5), 5790) || 't');
add('brine-short', short({
  marks: 2,
  stem: 'In a school demonstration, concentrated brine with a few drops of phenolphthalein is electrolysed with graphite electrodes. The liquid near the cathode turns pink and a pale green gas collects at the anode. Explain both observations.',
  model: 'At the cathode water is reduced instead of sodium ions, giving hydrogen gas and hydroxide ions; the hydroxide makes the solution alkaline, so phenolphthalein turns pink. At the anode the green gas is chlorine: oxygen evolution needs a large overpotential, so chloride ions are oxidised instead.',
  sol: 'Cathode: water reduced, OH⁻ formed. Anode: chlorine because of the overpotential for oxygen.',
  scheme: [['Cathode: water reduced to H₂ and OH⁻, so pink', 1], ['Anode: chlorine, because oxygen has a high overpotential', 1]],
  d: 3, c: 'application', t: [4],
}));
add('faraday-short3', short({
  marks: 3, wl: null,
  stem: r`Two electrolytic cells containing silver nitrate solution and copper(II) sulfate solution are connected in series. A steady current deposits $2.16\ \text{g}$ of silver. (a) How much charge passed? (b) What mass of copper was deposited? (c) If the current was $0.25\ \text{A}$, for how long did it flow? (Ag = 108, Cu = 63.5, $F = 96500\ \text{C mol}^{-1}$)`,
  model: r`(a) Moles of Ag $= \dfrac{2.16}{108} = 0.02$, so $0.02$ mol of electrons: $Q = 0.02 \times 96500 = 1930$ C.

(b) The same charge deposits $\dfrac{0.02}{2} = 0.01$ mol Cu $= 0.01 \times 63.5 = 0.635$ g.

(c) $t = \dfrac{1930}{0.25} = 7720$ s (about 2.1 h).`,
  sol: 'Cells in series pass the same charge; use moles of electrons, then n for each metal.',
  scheme: [['(a) Q = 1930 C', 1], ['(b) Cu = 0.635 g', 1], ['(c) t = 7720 s', 1]],
  d: 3, c: 'application', t: [4],
}), () => (near((2.16 / 108) * F, 1930) && near((2.16 / 108 / 2) * 63.5, 0.635) && near(1930 / 0.25, 7720)) || 'faraday');

// ---------------------------------------------------------------- t05 batteries and fuel cells
add('mercury-mcq', mcq({
  stem: 'Why does a mercury cell keep an almost constant voltage of about 1.35 V throughout its life?',
  right: 'Its overall reaction involves no ion in solution whose concentration changes.',
  wrong: ['Its electrodes are made of mercury, which does not react.', 'It is recharged automatically while in use.', 'Its electrolyte is acidic, so the voltage cannot fall.'],
  sol: 'In the overall reaction zinc amalgam and mercury(II) oxide give zinc oxide and mercury: no dissolved ion changes concentration, so Q, and hence E, stays constant — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('lead-discharge-mcq', mcq({
  stem: r`A car has not started for some days. The density of its battery acid has fallen from $1.28$ to $1.15\ \text{g mL}^{-1}$. What does this show?`,
  right: 'The battery has discharged: sulfuric acid has been used up to form lead sulfate and water.',
  wrong: ['The battery is overcharged: extra sulfuric acid has formed.', 'Water has evaporated from the battery.', 'Lead dioxide has formed on both plates.'],
  sol: r`Discharge: $\ce{Pb + PbO2 + 2H2SO4 -> 2PbSO4 + 2H2O}$. Acid is consumed and water forms, so the density falls — option (@K). Evaporation (@2) would raise the density; charging (@1) would also raise it.`,
  d: 3, c: 'application', t: [5],
}));
add('fuelcell-mcq', mcq({
  stem: 'A crewed spacecraft on a two-week mission needs a steady electricity supply and also drinking water, with as little extra mass as possible. Which power source suits it best?',
  right: 'A hydrogen–oxygen fuel cell, which produces electricity continuously and gives water as its only product',
  wrong: ['Lead storage batteries, which are recharged by the crew each night', 'Dry cells, because they give a constant 1.5 V', 'A small diesel generator, which burns fuel to drive a dynamo'],
  sol: 'The fuel cell runs as long as hydrogen and oxygen are supplied, is about 70% efficient, and its product, water, can be drunk — option (@K). Lead batteries (@1) are heavy and need a power source to recharge; dry cells (@2) run down; a generator (@3) needs air and makes exhaust.',
  d: 2, c: 'application', t: [5],
}));
add('mercury-ar', ar({
  a: 'A mercury cell is suitable for hearing aids and watches.',
  r: 'The voltage of a mercury cell remains nearly constant during its life because no ion concentration changes in the overall reaction.',
  key: 'a',
  sol: 'Both are true, and the steady voltage in a small cell is exactly why it suits hearing aids and watches — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('fuel-ar', ar({
  a: 'In a hydrogen–oxygen fuel cell, oxygen is reduced at the anode.',
  r: 'A fuel cell converts the chemical energy of a fuel directly into electrical energy.',
  key: 'd',
  sol: 'A is false: oxygen is reduced at the **cathode**; hydrogen is oxidised at the anode. R is true — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('battery-match', match({
  stem: 'Match each cell with the correct feature.',
  pairs: [
    ['Dry (Leclanché) cell', 'Zinc container as anode, manganese dioxide at the carbon cathode'],
    ['Mercury cell', 'Mercury(II) oxide at the cathode; constant voltage'],
    ['Lead storage battery', 'Lead dioxide cathode in sulfuric acid; rechargeable'],
    ['Hydrogen–oxygen fuel cell', 'Reactants supplied continuously; water is the product'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Dry cell: zinc can and MnO₂; mercury cell: HgO, steady voltage; lead storage: PbO₂ in H₂SO₄, secondary; fuel cell: continuous feed, water.',
  d: 2, c: 'recall', t: [5],
}));
add('fuel-short', short({
  marks: 2, wl: null,
  stem: 'Write the electrode reactions of the hydrogen–oxygen fuel cell with an alkaline electrolyte, and give one advantage of fuel cells over thermal power plants.',
  model: r`Anode: $\ce{2H2 + 4OH- -> 4H2O + 4e-}$. Cathode: $\ce{O2 + 2H2O + 4e- -> 4OH-}$. Advantage: much higher efficiency (about 70% against about 40%), because chemical energy becomes electricity directly; also no polluting products.`,
  sol: 'Two half-reactions and one advantage.',
  scheme: [['Both electrode reactions', 1], ['One advantage (efficiency or no pollution)', 1]],
  d: 2, c: 'recall', t: [5],
}));
add('lead-short3', short({
  marks: 3,
  stem: 'For a lead storage battery, write the reactions at the anode and the cathode during discharge, and explain how a mechanic can tell whether it needs recharging.',
  model: r`Anode: $\ce{Pb + SO4^2- -> PbSO4 + 2e-}$. Cathode: $\ce{PbO2 + SO4^2- + 4H+ + 2e- -> PbSO4 + 2H2O}$. During discharge sulfuric acid is consumed and water forms, so the density of the electrolyte falls. The mechanic measures the density with a hydrometer; a low reading shows the battery is discharged and needs charging, which reverses the reactions.`,
  sol: 'Write both half-reactions; link acid consumption to the fall in density.',
  scheme: [['Anode reaction', 1], ['Cathode reaction', 1], ['Density of acid falls; hydrometer test', 1]],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t06 corrosion
add('sacrificial-mcq', mcq({
  stem: r`$E^\circ$ values: $\ce{Mg^2+/Mg} = -2.37$, $\ce{Fe^2+/Fe} = -0.44$, $\ce{Sn^2+/Sn} = -0.14$, $\ce{Cu^2+/Cu} = +0.34\ \text{V}$. Which metal can act as a sacrificial anode to protect an iron pipeline?`,
  right: 'Magnesium',
  wrong: ['Tin', 'Copper', 'None of these metals'],
  sol: 'A sacrificial anode must be oxidised more easily than iron, so its E° must be more negative than −0.44 V. Only magnesium qualifies — option (@K). Tin and copper would make the iron the anode and speed up its corrosion.',
  d: 2, c: 'application', t: [6],
}));
add('rust-cathode-mcq', mcq({
  stem: 'During the rusting of iron in moist, slightly acidic air, the reaction at the cathodic region is:',
  right: r`$\ce{O2 + 4H+ + 4e- -> 2H2O}$`,
  wrong: [r`$\ce{Fe -> Fe^2+ + 2e-}$`, r`$\ce{Fe^2+ + 2e- -> Fe}$`, r`$\ce{2H2O -> O2 + 4H+ + 4e-}$`],
  sol: 'At the cathode oxygen is reduced, using electrons that come through the metal from the anodic region — option (@K). Oxidation of iron (@1) occurs at the anode.',
  d: 2, c: 'understanding', t: [6],
}));
add('salt-water-mcq', mcq({
  stem: 'Iron railings near the sea rust faster than railings in a dry inland town mainly because:',
  right: 'salt spray makes the water film a better electrolyte, speeding up the electrochemical cell',
  wrong: ['salt reacts directly with iron to form rust', 'sea air contains no oxygen, so iron is attacked by water instead', 'salt raises the standard potential of iron'],
  sol: 'Dissolved salts increase the conductivity of the moisture film, so the tiny corrosion cells on the surface run faster — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('galv-ar', ar({
  a: 'Galvanised iron does not rust even when the zinc coating is scratched.',
  r: 'Zinc has a more positive standard reduction potential than iron.',
  key: 'c',
  sol: 'A is true. R is false: zinc (−0.76 V) is **more negative** than iron (−0.44 V), so zinc is oxidised in preference and protects the exposed iron — option (c).',
  d: 3, c: 'understanding', t: [6],
}));
add('rust-fill', fill({
  stem: 'Rust is hydrated iron(___) oxide.',
  acc: [['III', '3', 'iii']],
  sol: r`Rust is hydrated iron(**III**) oxide, $\ce{Fe2O3.xH2O}$.`,
  d: 1, c: 'recall', t: [6],
}));
add('galvanise-short', short({
  marks: 2,
  stem: 'Paint protects iron only while the paint film is unbroken, but a zinc coating protects iron even after a scratch. Explain the difference.',
  model: 'Paint is only a barrier; once scratched, air and water reach the iron, and it rusts. Zinc has a more negative reduction potential than iron, so where both are exposed zinc acts as the anode and is oxidised, while iron becomes the cathode and is protected.',
  sol: 'Barrier protection versus sacrificial protection.',
  scheme: [['Paint is only a barrier', 1], ['Zinc is more reactive and is oxidised instead of iron', 1]],
  d: 3, c: 'application', t: [6],
}));
add('rust-short3', short({
  marks: 3,
  stem: 'Explain, with equations, why rusting of iron is called an electrochemical process.',
  model: r`On moist iron, one region acts as an anode where iron is oxidised: $\ce{2Fe -> 2Fe^2+ + 4e-}$. The electrons flow through the metal to another region, the cathode, where oxygen is reduced in the presence of hydrogen ions from dissolved carbon dioxide: $\ce{O2 + 4H+ + 4e- -> 2H2O}$. Overall $\ce{2Fe + O2 + 4H+ -> 2Fe^2+ + 2H2O}$. The water film acts as the electrolyte, so the surface behaves like a tiny galvanic cell; the iron(II) ions are then oxidised further to rust.`,
  sol: 'Anode reaction, cathode reaction and the idea of a cell with the water film as electrolyte.',
  scheme: [['Anodic oxidation of iron', 1], ['Cathodic reduction of oxygen', 1], ['Overall reaction; water film as electrolyte; further oxidation to rust', 1]],
  d: 3, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- long answers
add('daniell-long', long({
  wl: null,
  stem: r`(a) Draw a labelled diagram of the Daniell cell and write the reactions at each electrode.

(b) What is the function of the salt bridge?

(c) Calculate the EMF of the cell at $298\ \text{K}$ when $[\ce{Zn^2+}] = 0.1\ \text{M}$ and $[\ce{Cu^2+}] = 0.001\ \text{M}$ ($E^\circ_\text{cell} = 1.10\ \text{V}$), and explain why it is lower than $1.10\ \text{V}$.`,
  model: r`(a) Diagram: zinc rod in zinc sulfate solution (anode, −), copper rod in copper sulfate solution (cathode, +), salt bridge joining the solutions, wire with voltmeter; electrons flow from zinc to copper. Anode: $\ce{Zn -> Zn^2+ + 2e-}$; cathode: $\ce{Cu^2+ + 2e- -> Cu}$.

(b) It completes the circuit by allowing ions to move, and keeps both solutions electrically neutral.

(c) $E = 1.10 - \dfrac{0.059}{2}\log\dfrac{0.1}{0.001} = 1.10 - 0.0295 \times 2 = 1.041\ \text{V}$. It is lower because the product ion ($\ce{Zn^2+}$) is more concentrated and the reactant ion ($\ce{Cu^2+}$) less concentrated than standard, so $Q > 1$.`,
  sol: 'Labelled cell, half-reactions, salt bridge role, Nernst equation with Q = [Zn²⁺]/[Cu²⁺].',
  scheme: [['(a) Labelled diagram', 1], ['(a) Both electrode reactions', 1], ['(b) Two functions of the salt bridge', 1], ['(c) E = 1.041 V', 1.5], ['(c) Reason: Q > 1', 0.5]],
  d: 3, c: 'application', t: [1, 2],
}), () => near(1.1 - (0.059 / 2) * Math.log10(0.1 / 0.001), 1.041) || 'E');
add('nernst-k-long', long({
  wl: null,
  stem: r`(a) Derive the relation between the standard EMF of a cell and its equilibrium constant at $298\ \text{K}$, starting from $\Delta_\text{r}G^\circ = -nFE^\circ_\text{cell}$ and $\Delta_\text{r}G^\circ = -2.303RT\log K$.

(b) For $\ce{Sn(s) + Pb^2+(aq) -> Sn^2+(aq) + Pb(s)}$, $E^\circ(\ce{Sn^2+/Sn}) = -0.14\ \text{V}$ and $E^\circ(\ce{Pb^2+/Pb}) = -0.13\ \text{V}$. Calculate $E^\circ_\text{cell}$, $\Delta_\text{r}G^\circ$ and $K$.

(c) Compare your $K$ with that of the Daniell cell ($K \approx 10^{37}$) and comment.`,
  model: r`(a) $-nFE^\circ = -2.303RT\log K$, so $E^\circ = \dfrac{2.303RT}{nF}\log K$. At 298 K, $\dfrac{2.303RT}{F} = 0.059\ \text{V}$, giving $E^\circ_\text{cell} = \dfrac{0.059}{n}\log K$.

(b) $E^\circ_\text{cell} = -0.13 - (-0.14) = 0.01\ \text{V}$; $n = 2$. $\Delta_\text{r}G^\circ = -2 \times 96500 \times 0.01 = -1930$ J $\text{mol}^{-1}$ (about $-1.93\ \text{kJ mol}^{-1}$). $\log K = \dfrac{2 \times 0.01}{0.059} \approx 0.339$, so $K \approx 2.2$.

(c) A very small EMF gives K close to 1: at equilibrium tin and lead ions are present in comparable amounts, so the reaction does not go to completion, unlike the Daniell reaction with its huge K.`,
  sol: 'Equate the two expressions for ΔG°; then substitute; compare the sizes of K.',
  scheme: [['(a) Derivation to E° = (0.059/n) log K', 1.5], ['(b) E°cell = 0.01 V', 0.5], ['(b) ΔG° ≈ −1.93 kJ/mol', 1], ['(b) K ≈ 2.2', 1], ['(c) Comment: small E° means K near 1, incomplete reaction', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => (near(E0.Pb - E0.Sn, 0.01) && near(-2 * F * 0.01, -1930) && near(Math.pow(10, 0.02 / 0.059), 2.18, 0.01)) || 'SnPb');
add('conductance-long', long({
  wl: null,
  stem: r`(a) Define conductivity and molar conductivity, and give the relation between them with units.

(b) Sketch and explain how $\Lambda_\text{m}$ varies with $\sqrt{c}$ for a strong and a weak electrolyte.

(c) The molar conductivity of $0.050\ \text{M}$ ethanoic acid is $7.36\ \text{S cm}^2\ \text{mol}^{-1}$. Using $\lambda^\circ(\ce{H+}) = 349.6$ and $\lambda^\circ(\ce{CH3COO-}) = 40.9\ \text{S cm}^2\ \text{mol}^{-1}$, find its degree of dissociation and dissociation constant.`,
  model: r`(a) Conductivity κ is the conductance of a solution between electrodes of 1 cm² area placed 1 cm apart (S cm⁻¹). Molar conductivity Λm is the conductance of all the ions from one mole of electrolyte: $\Lambda_\text{m} = \dfrac{\kappa \times 1000}{c}$ in S cm² mol⁻¹ with c in mol L⁻¹.

(b) Strong electrolyte: Λm rises slowly and linearly as c falls, $\Lambda_\text{m} = \Lambda^\circ_\text{m} - A\sqrt{c}$, because interionic attraction decreases; extrapolation gives Λ°m. Weak electrolyte: Λm is low and rises steeply at very low c, because the degree of dissociation increases; Λ°m cannot be found by extrapolation.

(c) $\Lambda^\circ_\text{m} = 349.6 + 40.9 = 390.5$. $\alpha = \dfrac{7.36}{390.5} \approx 0.0188$. $K_\text{a} = \dfrac{c\alpha^2}{1 - \alpha} \approx \dfrac{0.050 \times 0.0188^2}{0.981} \approx 1.8 \times 10^{-5}$.`,
  sol: 'Definitions with units; two curves with reasons; Kohlrausch, α and Ka.',
  scheme: [['(a) Both definitions and the relation with units', 1], ['(b) Sketch with both curves', 1], ['(b) Reasons for each trend', 1], ['(c) Λ°m = 390.5 and α ≈ 0.019', 1], ['(c) Ka ≈ 1.8 × 10⁻⁵', 1]],
  d: 4, c: 'application', t: [3],
}), () => {
  const a = 7.36 / (lam.H + lam.Ac);
  return (near(a, 0.01885, 0.003) && near((0.05 * a * a) / (1 - a), 1.81e-5, 0.01)) || 'Ka';
});
add('electrolysis-long', long({
  wl: null,
  stem: r`(a) State Faraday’s first and second laws of electrolysis.

(b) Predict the products at each electrode when (i) molten sodium chloride and (ii) concentrated aqueous sodium chloride are electrolysed with inert electrodes. Explain the difference.

(c) A steel spoon is nickel-plated from nickel(II) sulfate solution using a current of $1.5\ \text{A}$ for $20\ \text{min}$. What mass of nickel is deposited? (Ni = 58.7, $F = 96500\ \text{C mol}^{-1}$)`,
  model: r`(a) First law: the mass of a substance deposited or liberated at an electrode is directly proportional to the quantity of electricity passed ($m = ZIt$). Second law: when the same quantity of electricity passes through different electrolytes, the masses of substances liberated are proportional to their molar masses divided by the number of electrons per ion.

(b) (i) Molten NaCl: sodium at the cathode, chlorine at the anode. (ii) Aqueous NaCl: hydrogen at the cathode, because water is reduced more easily than sodium ions; chlorine at the anode, because oxygen evolution has a high overpotential. Sodium hydroxide remains in solution.

(c) $Q = 1.5 \times 1200 = 1800$ C; moles of electrons $= \dfrac{1800}{96500} \approx 0.01865$; moles of Ni $\approx 0.00933$; mass $\approx 0.00933 \times 58.7 \approx 0.548$ g.`,
  sol: 'State both laws; compare molten and aqueous electrolysis; Q = It, then divide by 2F.',
  scheme: [['(a) Both laws', 1.5], ['(b) Products in both cases', 1], ['(b) Reason: water reduced; overpotential for oxygen', 0.5], ['(c) Q = 1800 C', 1], ['(c) Mass ≈ 0.548 g', 1]],
  d: 3, c: 'application', t: [4],
}), () => near((1.5 * 1200) / F / 2 * 58.7, 0.548, 0.003) || 'Ni');
add('battery-long', long({
  stem: '(a) Distinguish between primary and secondary batteries with one example of each.\n\n(b) Describe the construction of a dry (Leclanché) cell and explain why it cannot be recharged.\n\n(c) What is a fuel cell? Write the overall reaction of the hydrogen–oxygen fuel cell and give two advantages of fuel cells.',
  model: 'A primary battery cannot be recharged once its reaction is over (dry cell, mercury cell); a secondary battery can be recharged by passing current in the reverse direction (lead storage battery, nickel–cadmium cell). The dry cell has a zinc container as the anode and a carbon rod surrounded by powdered manganese dioxide and carbon as the cathode, in a moist paste of ammonium chloride and zinc chloride; it gives about 1.5 V. Its reaction cannot be reversed because the products move away or react further. A fuel cell converts the energy of a continuously supplied fuel directly into electricity. In the hydrogen–oxygen cell, 2H₂ + O₂ → 2H₂O. Advantages: high efficiency (about 70%) and no polluting products.',
  sol: 'Contrast rechargeability; dry-cell parts; definition, equation and two advantages of fuel cells.',
  scheme: [['(a) Difference with examples', 1], ['(b) Construction of the dry cell', 1.5], ['(b) Why it cannot be recharged', 0.5], ['(c) Definition and overall reaction', 1], ['(c) Two advantages', 1]],
  d: 3, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- case-based
add('electroplating-case', mk.case({
  passage: r`A jewellery workshop in Jaipur silver-plates brass bangles. Each bangle is hung from a wire in a bath containing a silver salt, opposite a plate of pure silver, and a steady current of $0.40\ \text{A}$ is passed for $50\ \text{min}$. The owner notices that the silver plate slowly becomes thinner while the bath’s silver content stays nearly the same. (Ag = 108, $F = 96500\ \text{C mol}^{-1}$)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'In this plating bath, the bangle must be connected as the:',
      right: 'cathode, so that silver ions are reduced on it',
      wrong: ['anode, so that silver ions are oxidised on it', 'anode, so that the bangle dissolves', 'cathode, so that oxygen is released on it'],
      sol: r`Plating needs $\ce{Ag+ + e- -> Ag}$ on the bangle: reduction, which happens at the cathode — option (@K).`,
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Calculate the mass of silver deposited on one bangle in grams.',
      value: 1.34, tol: 0.01, unit: 'g',
      sol: r`$Q = 0.40 \times 50 \times 60 = 1200$ C; moles of Ag $= \dfrac{1200}{96500} \approx 0.01244$; mass $= 0.01244 \times 108 \approx 1.34$, so about $1.34\ \text{g}$.`,
      scheme: [['Q = 1200 C, mass ≈ 1.34 g', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the silver plate becomes thinner while the silver content of the bath stays nearly the same.',
      model: 'The silver plate is the anode: silver atoms are oxidised to silver ions and dissolve into the bath. For every silver ion deposited on the bangle at the cathode, one is released from the anode, so the concentration of silver ions in the bath stays nearly constant.',
      sol: 'Silver anode dissolves at the same rate as silver deposits at the cathode.',
      scheme: [['The silver plate is the anode and dissolves', 1], ['Ions released balance ions deposited', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'For how many minutes must the same current flow to deposit 2.00 g of silver on a heavier bangle?',
        model: r`Moles of Ag $= \dfrac{2.00}{108} \approx 0.01852$; $Q = 0.01852 \times 96500 \approx 1787$ C; $t = \dfrac{1787}{0.40} \approx 4468$ s, about $74.5$ min.`,
        sol: 'Reverse the calculation: mass → moles → charge → time.',
        scheme: [['Q ≈ 1787 C', 1], ['t ≈ 4468 s ≈ 74.5 min', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}), () => (near(((0.4 * 3000) / F) * 108, 1.343, 0.002) && near(((2 / 108) * F) / 0.4 / 60, 74.5, 0.003)) || 'plating');
add('solar-battery-case', mk.case({
  passage: r`A village in Odisha lights its main street with solar lamps. Each lamp has a $12\ \text{V}$ lead storage battery made of six cells. During the day a solar panel charges the battery; at night the lamp draws a steady $1.5\ \text{A}$ for $10$ hours. The technician checks the electrolyte with a hydrometer: about $1.28\ \text{g mL}^{-1}$ in the evening and about $1.20\ \text{g mL}^{-1}$ at dawn.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'During the night (discharge), the reaction at the cathode of each cell is:',
      right: r`$\ce{PbO2 + SO4^2- + 4H+ + 2e- -> PbSO4 + 2H2O}$`,
      wrong: [r`$\ce{Pb + SO4^2- -> PbSO4 + 2e-}$`, r`$\ce{PbSO4 + 2e- -> Pb + SO4^2-}$`, r`$\ce{2H+ + 2e- -> H2}$`],
      sol: 'On discharge, lead dioxide at the cathode is reduced to lead sulfate — option (@K). (@1) is the anode reaction; (@2) happens on charging.',
      d: 2, c: 'understanding', t: [5],
    })),
    part('b', num({
      stem: 'What mass of lead, in grams, is converted to lead sulfate at the anodes of one cell during one night? (Pb = 207, F = 96500 C/mol)',
      value: 57.9, tol: 0.3, unit: 'g',
      sol: r`$Q = 1.5 \times 10 \times 3600 = 54000$ C; moles of electrons $= \dfrac{54000}{96500} \approx 0.5596$; moles of Pb $\approx 0.2798$; mass $= 0.2798 \times 207 \approx 57.9$, so about $57.9\ \text{g}$.`,
      scheme: [['Q = 54000 C and mass ≈ 57.9 g (two electrons per Pb)', 1]],
      d: 4, c: 'application', t: [4, 5],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the hydrometer reading is lower at dawn than in the evening.',
      model: 'During the night the battery discharges: sulfuric acid is used up at both electrodes to form lead sulfate, and water is formed. The electrolyte becomes more dilute, so its density falls from about 1.28 to about 1.20 g/mL.',
      sol: 'Acid consumed, water formed, density falls.',
      scheme: [['Sulfuric acid consumed, water formed during discharge', 1], ['So the density of the electrolyte decreases', 1]],
      d: 2, c: 'understanding', t: [5],
    }), [
      short({
        marks: 2,
        stem: 'Why can this battery be used night after night, while a torch’s dry cell cannot? What does the solar panel do during the day?',
        model: 'The lead storage battery is a secondary cell: its reaction can be reversed. During the day the solar panel pushes current into the battery in the opposite direction, turning lead sulfate back into lead and lead dioxide and regenerating the sulfuric acid. A dry cell is a primary cell whose reaction cannot be reversed.',
        sol: 'Secondary versus primary; charging reverses the reaction.',
        scheme: [['Secondary cell, reaction reversible', 1], ['Solar panel recharges it by reversing the reaction', 1]],
        d: 3, c: 'application', t: [5],
      }),
    ]),
  ],
}), () => near(((1.5 * 36000) / F / 2) * 207, 57.9, 0.003) || 'Pb');
add('conductance-lab-case', mk.case({
  passage: r`A student calibrates a conductivity cell and finds its cell constant to be $1.00\ \text{cm}^{-1}$. She then measures the resistance of three solutions, each $0.010\ \text{M}$, at $298\ \text{K}$:

| Solution (0.010 M) | Resistance ($\Omega$) |
|---|---|
| Potassium chloride | 709 |
| Hydrochloric acid | 243 |
| Ethanoic acid | 6060 |

She is surprised that the two acids, at the same concentration, conduct so differently.`,
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which solution contains a weak electrolyte?',
      right: 'Ethanoic acid',
      wrong: ['Potassium chloride', 'Hydrochloric acid', 'All three'],
      sol: 'Its resistance is far higher, so it has far fewer ions at the same concentration: it is only slightly dissociated — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: r`Calculate the molar conductivity of the hydrochloric acid solution in $\text{S cm}^2\ \text{mol}^{-1}$.`,
      value: 411.5, tol: 1, unit: 'S cm² mol⁻¹',
      sol: r`$\kappa = \dfrac{1.00}{243} \approx 4.115 \times 10^{-3}$ S cm⁻¹; $\Lambda_\text{m} = \dfrac{\kappa \times 1000}{c} = \dfrac{4.115}{0.010} = 411.5$, in $\text{S cm}^2\ \text{mol}^{-1}$.`,
      scheme: [['κ from G*/R, then Λm ≈ 412 S cm² mol⁻¹', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why hydrochloric acid conducts better than potassium chloride at the same concentration, although both are strong electrolytes.',
      model: 'Both are almost fully dissociated, so the number of ions is about the same. But the hydrogen ion has a much larger limiting molar conductivity (about 350) than the potassium ion (about 74), because it moves by hopping from one water molecule to the next; so the acid has a lower resistance.',
      sol: 'Same number of ions; much higher mobility of H⁺.',
      scheme: [['Both fully dissociated, similar number of ions', 1], ['H⁺ much more mobile than K⁺ (proton hopping)', 1]],
      d: 4, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: r`Using $\Lambda^\circ_\text{m}(\ce{CH3COOH}) = 390.5\ \text{S cm}^2\ \text{mol}^{-1}$, find the degree of dissociation of the ethanoic acid solution.`,
        model: r`$\kappa = \dfrac{1.00}{6060} \approx 1.65 \times 10^{-4}$ S cm⁻¹; $\Lambda_\text{m} = \dfrac{1.65 \times 10^{-4} \times 1000}{0.010} \approx 16.5$; $\alpha = \dfrac{16.5}{390.5} \approx 0.042$, so only about 4% is dissociated.`,
        sol: 'κ, then Λm, then α = Λm/Λ°m.',
        scheme: [['Λm ≈ 16.5 S cm² mol⁻¹', 1], ['α ≈ 0.042', 1]],
        d: 3, c: 'application', t: [3],
      }),
    ]),
  ],
}), () => (near((1 / 243) * 1000 / 0.01, 411.5, 0.001) && near((1 / 6060) * 1000 / 0.01 / 390.5, 0.0423, 0.005) && near((1 / 709) * 1000 / 0.01, 141.0, 0.002)) || 'conductance');
add('bridge-rust-case', mk.case({
  passage: 'Engineers inspecting a steel bridge on the Mumbai coast find rust spreading from the joints, where rainwater and sea spray collect, while sheltered beams painted last year are still sound. They propose two measures: repainting the beams and bolting blocks of a reactive metal to the steel piers that stand in sea water.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why does rust start at the joints where water collects?',
      right: 'Water containing dissolved salts and oxygen acts as the electrolyte for tiny corrosion cells on the steel.',
      wrong: ['Water reacts with iron to give rust without needing oxygen.', 'Joints are made of a different metal that does not rust.', 'Sea spray contains rust, which settles on the joints.'],
      sol: 'Rusting needs both oxygen and an electrolyte film; salty water at the joints provides it, so local anodes and cathodes form — option (@K).',
      d: 2, c: 'understanding', t: [6],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name a suitable metal for the blocks on the piers and state the property that makes it suitable.',
      model: 'Magnesium (or zinc): its standard reduction potential is more negative than that of iron, so it is oxidised instead of the steel.',
      sol: 'A metal more reactive than iron.',
      scheme: [['Mg or Zn with the reason (more negative E° than Fe)', 1]],
      d: 2, c: 'application', t: [6],
    })),
    part('c', short({
      marks: 2,
      stem: 'The blocks must be replaced every few years. Explain why, using the idea of an electrochemical cell.',
      model: 'The block and the steel form a cell in the sea water. The block, being more reactive, is the anode and is steadily oxidised and dissolves, while the steel acts as the cathode where oxygen is reduced. Once the block has corroded away, the steel would become the anode again, so the block must be replaced.',
      sol: 'The sacrificial anode is consumed while protecting the cathodic steel.',
      scheme: [['Block is the anode and is oxidised (consumed)', 1], ['Steel is the cathode and protected only while the block remains', 1]],
      d: 3, c: 'application', t: [6],
    }), [
      short({
        marks: 2,
        stem: 'An engineer suggests painting the piers instead of using the blocks. Evaluate this suggestion for steel standing in sea water.',
        model: 'Paint only works as a barrier. In sea water, waves and debris soon scratch it, and at each scratch the steel is exposed to salty water and oxygen and rusts quickly. Sacrificial blocks protect the steel even where it is exposed, so they are more reliable for the submerged piers; paint is fine for the sheltered beams.',
        sol: 'Barrier versus sacrificial protection in harsh conditions.',
        scheme: [['Paint is only a barrier and is easily damaged under water', 1], ['Sacrificial blocks protect exposed steel, so they are better here', 1]],
        d: 4, c: 'evaluation', t: [6],
      }),
    ]),
  ],
}));
