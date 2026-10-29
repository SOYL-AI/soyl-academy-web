// ch04 The d- and f-Block Elements — question bank. MCQ keys are placed by the builder (balanced);
// AR keys planned: a c d b a a c. Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);
const mu = (n) => Math.sqrt(n * (n + 2));

// ---------------------------------------------------------------- t01 position and configuration
add('ion-config-mcq', mcq({
  stem: 'The electronic configuration of Co²⁺ (Co, Z = 27) is:',
  right: r`$[\text{Ar}]3d^7$`,
  wrong: [r`$[\text{Ar}]3d^5 4s^2$`, r`$[\text{Ar}]3d^6 4s^1$`, r`$[\text{Ar}]3d^9$`],
  sol: r`Co is $[\text{Ar}]3d^7 4s^2$. The two 4s electrons are removed first, giving $[\text{Ar}]3d^7$ — option (@K). (@1) removes 3d electrons instead of 4s.`,
  d: 2, c: 'understanding', t: [1],
}));
add('cr-config-mcq', mcq({
  stem: 'Chromium (Z = 24) has the configuration [Ar]3d⁵4s¹ instead of [Ar]3d⁴4s². The best explanation is:',
  right: 'a half-filled 3d subshell is extra stable, and the 3d and 4s energies are very close',
  wrong: ['4s orbitals are higher in energy than 4p orbitals', 'chromium has only one valence electron', 'the 3d subshell can hold only five electrons'],
  sol: 'Exchange energy makes the half-filled d⁵ arrangement especially stable, and since 3d and 4s are close in energy, one electron shifts — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('zn-ar', ar({
  a: 'Zinc is not regarded as a transition element.',
  r: 'Zinc has a completely filled d subshell both in its ground state and in its common oxidation state.',
  key: 'a',
  sol: 'Both are true. A transition element needs an incomplete d subshell in the atom or a common ion; Zn (3d¹⁰4s²) and Zn²⁺ (3d¹⁰) have none, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('cu-tf', tf({
  stem: 'Copper is regarded as a transition element even though the copper atom has a completely filled 3d subshell.',
  key: 't',
  sol: 'True. Its common ion Cu²⁺ is 3d⁹, an incompletely filled d subshell.',
  d: 2, c: 'understanding', t: [1],
}));
add('config-fill', fill({
  stem: 'In the ground state of a copper atom, the 3d subshell contains ___ electrons.',
  acc: [['10']],
  sol: 'Copper is [Ar]3d¹⁰4s¹: the 3d subshell holds **10** electrons, because a filled 3d subshell is extra stable.',
  d: 1, c: 'recall', t: [1],
}));
add('config-short', short({
  marks: 2,
  stem: 'Write the electronic configurations of Mn²⁺ (Z = 25) and Fe³⁺ (Z = 26). Why is Fe³⁺ more stable than Fe²⁺ in air?',
  model: 'Mn²⁺ is [Ar]3d⁵ and Fe³⁺ is [Ar]3d⁵: both have a half-filled 3d subshell. Fe²⁺ (3d⁶) is easily oxidised by air to Fe³⁺, because losing the sixth d electron gives the extra-stable half-filled d⁵ arrangement.',
  sol: 'Remove 4s electrons first; link stability to the half-filled d⁵ configuration.',
  scheme: [['Both configurations correct', 1], ['Fe³⁺ has stable half-filled d⁵', 1]],
  d: 2, c: 'application', t: [1, 2],
}));

// ---------------------------------------------------------------- t02 general properties
add('max-ox-mcq', mcq({
  stem: 'Which element of the 3d series shows the highest oxidation state?',
  right: 'Manganese',
  wrong: ['Iron', 'Chromium', 'Zinc'],
  sol: 'Manganese uses all seven 3d and 4s electrons to reach +7 (as in permanganate); after Mn, pairing of d electrons lowers the maximum — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('colourless-mcq', mcq({
  stem: 'Which ion is both colourless in aqueous solution and diamagnetic?',
  right: r`$\ce{Sc^3+}$`,
  wrong: [r`$\ce{Ti^3+}$`, r`$\ce{Cu^2+}$`, r`$\ce{Fe^3+}$`],
  sol: r`$\ce{Sc^3+}$ is $3d^0$: no unpaired electron and no d–d transition — option (@K). $\ce{Ti^3+}$ ($d^1$), $\ce{Cu^2+}$ ($d^9$) and $\ce{Fe^3+}$ ($d^5$) have unpaired electrons and are coloured.`,
  d: 2, c: 'application', t: [2],
}));
add('mp-mcq', mcq({
  stem: 'Enthalpies of atomisation (kJ mol⁻¹): vanadium 515, chromium 397, iron 416, zinc 126. Which statement best explains the very low value for zinc?',
  right: 'Zinc has no unpaired d electrons, so only its 4s electrons take part in metallic bonding.',
  wrong: ['Zinc has the largest number of unpaired d electrons in the series.', 'Zinc atoms are much heavier than vanadium atoms.', 'Zinc has an incompletely filled 3d subshell.'],
  sol: 'Unpaired d electrons strengthen metallic bonding. Zinc is 3d¹⁰4s²: its d electrons are all paired and not used, so bonding, and the enthalpy of atomisation, are lowest — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('radii-mcq', mcq({
  stem: 'Metallic radii (pm): Fe 126, Co 125, Ni 125, Cu 128. A student expected the radius to fall steadily because the nuclear charge rises by one each time. Which statement best explains the data?',
  right: 'Each added electron enters the inner 3d subshell; its weak shielding is balanced by repulsion between d electrons, so the size hardly changes.',
  wrong: ['Each added electron enters the 4s orbital, which increases the size.', 'The nuclear charge of these elements is the same.', 'These metals have different crystal structures, so their radii cannot be compared.'],
  sol: 'The rise in nuclear charge is largely offset by the screening and mutual repulsion of the added 3d electrons, so radii stay nearly constant (and rise slightly at Cu, 3d¹⁰) — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('eo-cu-mcq', mcq({
  stem: r`Pieces of zinc, iron, nickel and copper are dropped into separate test tubes of dilute hydrochloric acid. $E^\circ(\ce{M^2+/M})$: Zn $-0.76$, Fe $-0.44$, Ni $-0.25$, Cu $+0.34\ \text{V}$. Which metal gives no bubbles of hydrogen, and why?`,
  right: 'Copper, because its E° is positive, so it cannot reduce H⁺ ions to hydrogen',
  wrong: ['Zinc, because its E° is the most negative', 'Nickel, because its E° is closest to zero', 'Iron, because it forms a protective oxide layer in acid'],
  sol: 'Only metals with negative E°(M²⁺/M) can reduce H⁺ to H₂. Copper (+0.34 V) cannot: the energy to atomise and ionise copper is not repaid by the hydration of Cu²⁺ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('mn3-mcq', mcq({
  stem: r`$E^\circ(\ce{Mn^3+/Mn^2+}) = +1.57\ \text{V}$ while $E^\circ(\ce{Cr^3+/Cr^2+}) = -0.41\ \text{V}$. Which statement follows?`,
  right: r`$\ce{Mn^3+}$ is a strong oxidising agent and $\ce{Cr^2+}$ is a reducing agent.`,
  wrong: [r`$\ce{Mn^3+}$ is a reducing agent and $\ce{Cr^2+}$ is an oxidising agent.`, r`Both are strong oxidising agents.`, r`Both are stable and unreactive in water.`],
  sol: r`A large positive $E^\circ$ means $\ce{Mn^3+}$ readily gains an electron (forming stable $d^5$ $\ce{Mn^2+}$); a negative $E^\circ$ means $\ce{Cr^2+}$ readily loses one (forming stable $d^3$ $\ce{Cr^3+}$) — option (@K).`,
  d: 3, c: 'application', t: [2],
}));
add('magnetic-mcq', mcq({
  stem: 'Which ion has the highest spin-only magnetic moment? (Z: Mn 25, Fe 26, Ni 28, Cu 29)',
  right: r`$\ce{Mn^2+}$`,
  wrong: [r`$\ce{Fe^2+}$`, r`$\ce{Ni^2+}$`, r`$\ce{Cu^2+}$`],
  sol: r`Unpaired electrons: $\ce{Mn^2+}$ ($d^5$) 5, $\ce{Fe^2+}$ ($d^6$) 4, $\ce{Ni^2+}$ ($d^8$) 2, $\ce{Cu^2+}$ ($d^9$) 1. Most unpaired electrons gives the highest μ (5.92 BM) — option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('catalyst-mcq', mcq({
  stem: 'In the contact process, vanadium pentoxide oxidises sulfur dioxide to sulfur trioxide and is itself reduced to V₂O₄, which is then reoxidised by air back to V₂O₅. Which property of transition metals does this best illustrate?',
  right: 'Their ability to change oxidation state easily, which makes them good catalysts',
  wrong: ['Their high melting points', 'Their ability to form interstitial compounds', 'Their paramagnetism'],
  sol: 'Vanadium cycles between +5 and +4, forming and regenerating an intermediate: variable oxidation states make it a catalyst — option (@K).',
  d: 2, c: 'application', t: [2, 5],
}));
add('interstitial-mcq', mcq({
  stem: 'Dissolving a small amount of carbon in iron gives steel that is much harder than pure iron and still conducts electricity. The best explanation is that:',
  right: 'small carbon atoms occupy holes in the iron lattice, forming an interstitial compound that resists slipping of the layers',
  wrong: ['carbon reacts with iron to form an ionic carbide that does not conduct', 'carbon replaces iron atoms one for one, since they are the same size', 'carbon removes the unpaired d electrons of iron'],
  sol: 'Carbon atoms fit into lattice holes (interstitial compound): the metal stays metallic and conducting but becomes harder and higher melting — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('colour-ar', ar({
  a: 'Salts of zinc are white, and their solutions are colourless.',
  r: 'Zn²⁺ has an incompletely filled 3d subshell.',
  key: 'c',
  sol: 'A is true. R is false: Zn²⁺ is 3d¹⁰, a completely filled subshell, so no d–d transition is possible — which is why its salts are colourless — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('cr2-ar', ar({
  a: 'Cr²⁺ is a strong oxidising agent.',
  r: r`$E^\circ(\ce{Cr^3+/Cr^2+})$ is negative ($-0.41\ \text{V}$).`,
  key: 'd',
  sol: 'A is false: the negative potential means Cr²⁺ readily loses an electron to become Cr³⁺, so it is a reducing agent. R is true — option (d).',
  d: 3, c: 'application', t: [2],
}));
add('alloy-ar', ar({
  a: 'Transition metals form alloys with each other very easily.',
  r: 'Transition metals generally have high densities.',
  key: 'b',
  sol: 'Both are true, but alloys form readily because the atoms have similar radii and can replace one another in the lattice, not because of density — option (b).',
  d: 3, c: 'understanding', t: [2],
}));
add('mu-num', num({
  stem: 'Calculate the spin-only magnetic moment, in BM, of Ni²⁺ (Ni, Z = 28).',
  value: 2.83, tol: 0.01, unit: 'BM',
  sol: r`$\ce{Ni^2+}$ is $3d^8$, so $n = 2$ unpaired electrons. $\mu = \sqrt{2 \times 4} = \sqrt{8} \approx 2.83$, in BM.`,
  scheme: [['n = 2 and μ = √8 ≈ 2.83 BM', 1]],
  d: 2, c: 'understanding', t: [2],
}), () => near(mu(2), 2.83, 0.002) || 'mu');
add('n-from-mu-num', num({
  marks: 2,
  stem: 'A 3d metal ion has a spin-only magnetic moment of 5.92 BM. How many unpaired electrons does it have?',
  value: 5, tol: 0, unit: null,
  sol: r`Step 1 — $\mu = \sqrt{n(n+2)}$, so $n(n+2) = 5.92^2 \approx 35.0$.

Step 2 — Solving $n^2 + 2n - 35 = 0$: $\sqrt{4 + 140} = 12$, so $n = (-2 + 12) \div 2 = 5$ (check: $5 \times 7 = 35$). So the ion has 5 unpaired electrons (for example $\ce{Mn^2+}$ or $\ce{Fe^3+}$).`,
  scheme: [['n(n + 2) ≈ 35', 1], ['n = 5', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(mu(5), 5.92, 0.002) || 'n');
add('ox-state-num', num({
  stem: r`What is the oxidation state of chromium in the dichromate ion, $\ce{Cr2O7^2-}$? (Give the number.)`,
  value: 6, tol: 0, unit: null,
  sol: r`$2x + 7(-2) = -2$, so $2x = 12$ and $x = 6$: chromium is $+6$.`,
  scheme: [['2x − 14 = −2, x = +6', 1]],
  d: 1, c: 'understanding', t: [2, 3],
}), () => near((-2 + 14) / 2, 6) || 'ox');
add('eo-short', short({
  marks: 2,
  stem: r`$E^\circ(\ce{M^2+/M})$ values are: Mn $-1.18\ \text{V}$, Fe $-0.44\ \text{V}$, Zn $-0.76\ \text{V}$, Cu $+0.34\ \text{V}$. Explain why the value for manganese is more negative than expected from the general trend, and why copper’s is positive.`,
  model: 'Mn²⁺ has a half-filled 3d⁵ configuration, which is extra stable, so manganese forms Mn²⁺ more readily and its E° is more negative. For copper, the high enthalpy of atomisation and ionisation needed to make Cu²⁺(aq) is not compensated by its hydration enthalpy, so E° is positive.',
  sol: 'd⁵ stability for Mn; energy balance of atomisation, ionisation and hydration for Cu.',
  scheme: [['Mn: stable half-filled d⁵ of Mn²⁺', 1], ['Cu: atomisation + ionisation not compensated by hydration', 1]],
  d: 3, c: 'application', t: [2],
}));
add('ox-short', short({
  marks: 2,
  stem: 'Why does the number of oxidation states in the 3d series increase up to manganese and then decrease?',
  model: 'Up to manganese, all 3d and 4s electrons can be used in bonding, so the highest oxidation state rises from +3 (Sc) to +7 (Mn). After manganese, the d electrons begin to pair; paired electrons are harder to use, so fewer oxidation states are shown and the maximum falls to +2 at zinc.',
  sol: 'Number of available unpaired d electrons rises to Mn, then pairing reduces it.',
  scheme: [['Up to Mn all (n − 1)d and ns electrons can be used', 1], ['After Mn pairing reduces the number of usable electrons', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('catalyst-short', short({
  marks: 2,
  stem: 'Give two reasons why transition metals and their compounds act as catalysts, with one industrial example for each reason.',
  model: 'First, they show variable oxidation states, so they can form unstable intermediates and then regenerate, as V₂O₅ does in the contact process for sulfuric acid. Second, they provide surfaces that adsorb reactant molecules and weaken their bonds, as iron does in the Haber process and nickel in the hydrogenation of oils.',
  sol: 'Variable oxidation states; surface adsorption.',
  scheme: [['Variable oxidation states with an example', 1], ['Surface adsorption with an example', 1]],
  d: 2, c: 'recall', t: [2, 5],
}));
add('colour-short3', short({
  marks: 3,
  stem: 'Explain why most transition metal ions are coloured in solution. Use your explanation to predict whether Ti⁴⁺, V³⁺ and Cu⁺ ions will be coloured. (Z: Ti 22, V 23, Cu 29)',
  model: 'In a hydrated ion the five d orbitals split into sets of slightly different energy. An electron in a partly filled d subshell absorbs visible light of a particular energy to jump to a higher d orbital (a d–d transition), and the solution shows the complementary colour. Ti⁴⁺ is 3d⁰ and Cu⁺ is 3d¹⁰, so no d–d transition is possible: both are colourless. V³⁺ is 3d², so it is coloured (green).',
  sol: 'Partly filled d subshell gives d–d transitions; d⁰ and d¹⁰ do not.',
  scheme: [['Explanation: d–d transition absorbs visible light, complementary colour seen', 1], ['Ti⁴⁺ d⁰ and Cu⁺ d¹⁰ colourless', 1], ['V³⁺ d² coloured', 1]],
  d: 3, c: 'application', t: [2],
}));
add('mu-short3', short({
  marks: 3, wl: null,
  stem: 'Calculate the spin-only magnetic moments of Ti³⁺, Mn²⁺ and Zn²⁺ (Z: Ti 22, Mn 25, Zn 30). Which of them is diamagnetic, and which is likely to be colourless?',
  model: r`Ti³⁺ is $3d^1$: $n = 1$, $\mu = \sqrt{3} \approx 1.73$ BM. Mn²⁺ is $3d^5$: $n = 5$, $\mu = \sqrt{35} \approx 5.92$ BM. Zn²⁺ is $3d^{10}$: $n = 0$, $\mu = 0$.

Zn²⁺ is diamagnetic, and with a full d subshell it has no d–d transition, so it is colourless.`,
  sol: 'Find n from the d count, then μ = √(n(n + 2)).',
  scheme: [['Ti³⁺ 1.73 BM', 1], ['Mn²⁺ 5.92 BM and Zn²⁺ 0', 1], ['Zn²⁺ diamagnetic and colourless with reason', 1]],
  d: 3, c: 'application', t: [2],
}), () => (near(mu(1), 1.73, 0.002) && near(mu(5), 5.92, 0.002)) || 'mu');

// ---------------------------------------------------------------- t03 K2Cr2O7 and KMnO4
add('chromate-acid-mcq', mcq({
  stem: 'Dilute sulfuric acid is added to a yellow solution of potassium chromate. What is observed, and why?',
  right: 'It turns orange as dichromate forms; chromium stays in the +6 state.',
  wrong: ['It turns green as chromium is reduced to +3.', 'It turns colourless as chromium is oxidised to +7.', 'No change, because chromate does not react with acid.'],
  sol: r`$\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}$: an acid–base change, not redox; Cr is +6 in both ions — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}));
add('mno4-electrons-mcq', mcq({
  stem: 'How many electrons does one permanganate ion gain when it acts as an oxidising agent in acidic solution?',
  right: '5',
  wrong: ['3', '1', '7'],
  sol: r`$\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$: Mn goes from +7 to +2, a gain of 5 electrons — option (@K). (@1) is the neutral-solution value.`,
  d: 1, c: 'understanding', t: [3],
}));
add('dichromate-colour-mcq', mcq({
  stem: 'A few drops of an unknown colourless liquid are warmed with acidified potassium dichromate solution, and the orange colour turns green. What can you conclude?',
  right: 'The liquid is a reducing agent; it has reduced chromium from +6 to +3.',
  wrong: ['The liquid is an oxidising agent; it has oxidised chromium from +3 to +6.', 'The liquid is an alkali; it has turned dichromate into chromate.', 'No reaction occurred; the colour change is due to warming.'],
  sol: 'Green Cr³⁺ forms only when Cr₂O₇²⁻ (Cr +6) is reduced, so the liquid gave electrons — option (@K). Alkali (@2) would give yellow chromate, not green.',
  d: 2, c: 'application', t: [3],
}));
add('permanganate-neutral-mcq', mcq({
  stem: 'In neutral or faintly alkaline solution, potassium permanganate oxidises iodide ions. The manganese-containing product is:',
  right: r`manganese dioxide, $\ce{MnO2}$`,
  wrong: [r`manganese(II) ions, $\ce{Mn^2+}$`, r`manganate ions, $\ce{MnO4^2-}$`, r`manganese metal`],
  sol: r`In neutral solution $\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}$; brown $\ce{MnO2}$ forms and iodide is oxidised to iodate — option (@K). $\ce{Mn^2+}$ (@1) forms in acid.`,
  d: 2, c: 'understanding', t: [3],
}));
add('self-indicator-mcq', mcq({
  stem: 'No separate indicator is added in titrations of iron(II) with potassium permanganate because:',
  right: 'the first excess drop of permanganate gives a permanent pink colour, since Mn²⁺ is almost colourless',
  wrong: ['iron(III) ions are deep purple', 'permanganate turns colourless only at the end point', 'the reaction gives off a gas at the end point'],
  sol: 'Before the end point, purple MnO₄⁻ is reduced to nearly colourless Mn²⁺ at once; one extra drop stays pink — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('disprop-mcq', mcq({
  stem: r`In $\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}$, the oxidation state of manganese changes:`,
  right: 'from +6 to +7 and +4',
  wrong: ['from +7 to +6 and +4', 'from +6 to +7 only', 'from +4 to +6 and +7'],
  sol: 'Manganate (+6) is both oxidised to permanganate (+7) and reduced to MnO₂ (+4): a disproportionation — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('kmno4-hcl-ar', ar({
  a: 'Permanganate titrations are not carried out in the presence of hydrochloric acid.',
  r: 'Permanganate oxidises chloride ions to chlorine.',
  key: 'a',
  sol: 'Both are true. Some permanganate would be used up oxidising chloride, giving a wrong (too large) titre, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('cr-ox-fill', fill({
  stem: 'In both the chromate and the dichromate ion, chromium is in the +___ oxidation state.',
  acc: [['6', 'six']],
  sol: 'Chromium is **+6** in both, so their interconversion is not a redox reaction.',
  d: 1, c: 'recall', t: [3],
}));
add('titr-num', num({
  marks: 2,
  stem: r`What volume, in mL, of $0.0200\ \text{M}$ $\ce{KMnO4}$ is needed to oxidise $20.0\ \text{mL}$ of $0.0500\ \text{M}$ oxalic acid in acid solution? ($\ce{2MnO4- + 5C2O4^2- + 16H+ -> 2Mn^2+ + 10CO2 + 8H2O}$)`,
  value: 20.0, tol: 0.1, unit: 'mL',
  sol: r`Step 1 — Moles of oxalate $= 0.0500 \times 0.0200 = 1.0 \times 10^{-3}$.

Step 2 — Moles of $\ce{MnO4-} = \dfrac{2}{5} \times 1.0 \times 10^{-3} = 4.0 \times 10^{-4}$.

Step 3 — Volume $= \dfrac{0.0004}{0.0200} = 0.0200$ L, and $0.0200 \times 1000 = 20.0$ mL.`,
  scheme: [['Moles of oxalate and the 2 : 5 ratio', 1], ['Volume 20.0 mL', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(((0.05 * 0.02 * 2) / 5 / 0.02) * 1000, 20) || 'V');
add('dichrom-num', num({
  marks: 2,
  stem: r`$15.0\ \text{mL}$ of $0.0200\ \text{M}$ potassium dichromate exactly oxidises the iron(II) in a sample of iron ore dissolved in acid. Calculate the mass of iron, in grams, in the sample. (Fe = 56)`,
  value: 0.101, tol: 0.001, unit: 'g',
  sol: r`Step 1 — Moles of $\ce{Cr2O7^2-} = 0.0200 \times 0.0150 = 3.0 \times 10^{-4}$.

Step 2 — $1\ \ce{Cr2O7^2-} : 6\ \ce{Fe^2+}$, so moles of Fe $= 6 \times 3.0 \times 10^{-4} = 1.8 \times 10^{-3}$.

Step 3 — Mass $= 0.0018 \times 56 = 0.1008$, about $0.101\ \text{g}$.`,
  scheme: [['Moles of dichromate and 1 : 6 ratio', 1], ['Mass ≈ 0.101 g', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(0.02 * 0.015 * 6 * 56, 0.1008) || 'Fe');
add('equation-match', match({
  stem: 'Match each oxidising system with the main product formed from the oxidising agent.',
  pairs: [
    ['Permanganate in acid', r`$\ce{Mn^2+}$`],
    ['Permanganate in neutral solution', r`$\ce{MnO2}$`],
    ['Dichromate in acid', r`$\ce{Cr^3+}$`],
    ['Manganate in acid', r`$\ce{MnO4-}$ and $\ce{MnO2}$`],
  ],
  order: [3, 1, 0, 2],
  sol: 'MnO₄⁻ (acid) → Mn²⁺; MnO₄⁻ (neutral) → MnO₂; Cr₂O₇²⁻ (acid) → Cr³⁺; MnO₄²⁻ (acid) disproportionates to MnO₄⁻ and MnO₂.',
  d: 2, c: 'understanding', t: [3],
}));
add('dichromate-short', short({
  marks: 2,
  stem: 'A student adds sodium hydroxide solution drop by drop to orange potassium dichromate solution, then adds dilute sulfuric acid. Describe and explain the colour changes with an equation.',
  model: r`With alkali the orange solution turns yellow, because dichromate is converted to chromate; with acid it turns orange again. The equilibrium $\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}$ shifts left when $\ce{H+}$ is removed by alkali, and right when acid is added.`,
  sol: 'Equilibrium shifts with H⁺ concentration; no change of oxidation state.',
  scheme: [['Orange → yellow with alkali, back to orange with acid', 1], ['Equilibrium equation and direction of shift', 1]],
  d: 3, c: 'application', t: [3],
}));
add('prep-short3', short({
  marks: 3,
  stem: 'Describe, with balanced equations, how potassium permanganate is prepared from pyrolusite.',
  model: r`Pyrolusite is fused with potassium hydroxide in the presence of air (or potassium nitrate), giving dark green potassium manganate: $\ce{2MnO2 + 4KOH + O2 -> 2K2MnO4 + 2H2O}$. The manganate is then oxidised to permanganate: in neutral or acid solution it disproportionates, $\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}$, and industrially it is oxidised electrolytically in alkaline solution. Purple potassium permanganate crystallises from the solution.`,
  sol: 'Fusion to manganate, then disproportionation or electrolytic oxidation.',
  scheme: [['Fusion with KOH and an oxidant; equation', 1], ['Conversion of manganate to permanganate', 1], ['Disproportionation equation or electrolytic oxidation stated', 1]],
  d: 3, c: 'recall', t: [3],
}));
add('oxidation-equation-short3', short({
  marks: 3, wl: null,
  stem: 'Write balanced ionic equations for the reaction of potassium permanganate with (a) iron(II) ions in acid, (b) oxalate ions in acid, and (c) iodide ions in neutral solution.',
  model: r`(a) $\ce{MnO4- + 5Fe^2+ + 8H+ -> Mn^2+ + 5Fe^3+ + 4H2O}$

(b) $\ce{2MnO4- + 5C2O4^2- + 16H+ -> 2Mn^2+ + 10CO2 + 8H2O}$

(c) $\ce{2MnO4- + I- + H2O -> 2MnO2 + IO3- + 2OH-}$`,
  sol: 'Balance electrons (5 per MnO₄⁻ in acid, 3 in neutral), then atoms and charge.',
  scheme: [['(a) balanced', 1], ['(b) balanced', 1], ['(c) balanced, iodate and MnO₂ in neutral solution', 1]],
  d: 4, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 lanthanoids and actinoids
add('contraction-mcq', mcq({
  stem: 'Which of these is a consequence of the lanthanoid contraction?',
  right: 'Zirconium and hafnium have almost the same atomic radius and very similar chemistry.',
  wrong: ['Lanthanoids are all strongly radioactive.', 'Basicity of lanthanoid hydroxides increases from La to Lu.', 'The 5d elements are much larger than the 4d elements of the same group.'],
  sol: 'The contraction cancels the expected size increase from 4d to 5d, so Zr (160 pm) and Hf (159 pm) are almost equal — option (@K). Basicity decreases, not increases (@2).',
  d: 2, c: 'understanding', t: [4],
}));
add('ce4-mcq', mcq({
  stem: 'A chemist needs a lanthanoid ion to act as an oxidising agent in a titration. Which ion is the best choice?',
  right: 'Ce⁴⁺, because it readily gains an electron to reach the common +3 state',
  wrong: ['Eu²⁺, because it has a half-filled 4f subshell', 'La³⁺, because it has an empty 4f subshell', 'Lu³⁺, because it is the smallest lanthanoid ion'],
  sol: 'Ce⁴⁺ tends to return to +3, so it accepts electrons: an oxidant (cerium(IV) salts are used in titrations) — option (@K). Eu²⁺ (@1) tends to lose an electron (a reductant); La³⁺ and Lu³⁺ are stable +3 ions.',
  d: 3, c: 'application', t: [4],
}));
add('ln-ox-mcq', mcq({
  stem: 'The most common oxidation state shown by the lanthanoids is:',
  right: '+3',
  wrong: ['+2', '+4', '+7'],
  sol: 'Lanthanoids typically lose the two 6s and one 5d (or 4f) electron, giving +3 — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('basicity-mcq', mcq({
  stem: 'Which lanthanoid hydroxide is the most basic?',
  right: r`$\ce{La(OH)3}$`,
  wrong: [r`$\ce{Lu(OH)3}$`, r`$\ce{Gd(OH)3}$`, r`$\ce{Yb(OH)3}$`],
  sol: r`Ln³⁺ size decreases from La to Lu (lanthanoid contraction), so the M–OH bond becomes more covalent and basicity falls. The largest ion, $\ce{La^3+}$, gives the most basic hydroxide — option (@K).`,
  d: 3, c: 'application', t: [4],
}));
add('actinoid-mcq', mcq({
  stem: 'Actinoids show a greater range of oxidation states than lanthanoids mainly because:',
  right: 'the 5f, 6d and 7s orbitals are close in energy, so more electrons can take part in bonding',
  wrong: ['actinoids have fewer electrons than lanthanoids', 'the 4f orbitals extend further than 5f orbitals', 'actinoids are not radioactive'],
  sol: 'The 5f orbitals are less deeply buried and close in energy to 6d and 7s, so varying numbers of electrons can be lost — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('lanth-ar', ar({
  a: 'Zirconium and hafnium are very difficult to separate from each other.',
  r: 'Because of the lanthanoid contraction, zirconium and hafnium have almost identical atomic and ionic radii.',
  key: 'a',
  sol: 'Both are true; nearly identical sizes give nearly identical chemistry, which is why they are hard to separate. R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('actinoid-ar', ar({
  a: 'Actinoids show a wider range of oxidation states than lanthanoids.',
  r: 'The 4f orbitals are less deeply buried than the 5f orbitals.',
  key: 'c',
  sol: 'A is true. R is false: it is the 5f orbitals that are less deeply buried (more exposed), which allows more electrons to be used in bonding — option (c).',
  d: 3, c: 'understanding', t: [4],
}));
add('lanth-tf', tf({
  stem: 'All the lanthanoids are radioactive elements.',
  key: 'f',
  sol: 'False. Among the lanthanoids only promethium is radioactive; all actinoids are radioactive.',
  d: 1, c: 'recall', t: [4],
}));
add('lanth-fill', fill({
  stem: 'The steady decrease in the size of lanthanoid atoms and ions from lanthanum to lutetium is called the lanthanoid ___.',
  acc: [['contraction']],
  sol: 'It is the lanthanoid **contraction**.',
  d: 1, c: 'recall', t: [4],
}));
add('compare-short', short({
  marks: 2,
  stem: 'Give two differences between lanthanoids and actinoids.',
  model: 'Lanthanoids mainly show the +3 oxidation state, while actinoids show a wider range, up to +7. Only promethium among the lanthanoids is radioactive, whereas all actinoids are radioactive. (Also: actinoids form complexes more readily and show a larger contraction.)',
  sol: 'Any two: oxidation states, radioactivity, complex formation, size of contraction.',
  scheme: [['Difference 1', 1], ['Difference 2', 1]],
  d: 2, c: 'recall', t: [4],
}));
add('contraction-short3', short({
  marks: 3,
  stem: 'What is the lanthanoid contraction? State its cause and two of its consequences.',
  model: 'The lanthanoid contraction is the steady decrease in atomic and ionic radii from lanthanum to lutetium. It is caused by the imperfect shielding of one 4f electron by another, so the effective nuclear charge felt by the outer electrons rises along the series. Consequences: the 4d and 5d elements of a group, such as zirconium and hafnium, have almost the same radii and very similar properties; and the basicity of the lanthanoid hydroxides decreases from La(OH)₃ to Lu(OH)₃.',
  sol: 'Definition, cause (poor 4f shielding), two consequences.',
  scheme: [['Definition', 1], ['Cause: poor shielding by 4f electrons', 1], ['Two consequences', 1]],
  d: 3, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 applications
add('uses-match', match({
  stem: 'Match each substance with its use.',
  pairs: [
    ['Vanadium pentoxide', 'Catalyst in the manufacture of sulfuric acid'],
    ['Mischmetall', 'Flints for gas lighters'],
    ['Titanium alloys', 'Light, strong aircraft parts and implants'],
    ['Uranium', 'Nuclear fuel'],
  ],
  order: [2, 3, 0, 1],
  sol: 'V₂O₅: contact process; mischmetall: lighter flints; titanium: aircraft and implants; uranium: nuclear fuel.',
  d: 1, c: 'recall', t: [5],
}));
add('uses-mcq', mcq({
  stem: 'A kitchen sink must resist rusting by water, salt and food acids for many years. Which material is the best choice?',
  right: 'Stainless steel, an alloy of iron with chromium and nickel',
  wrong: ['Brass, an alloy of copper and zinc', 'Mild steel coated with oil', 'Bronze, an alloy of copper and tin'],
  sol: 'Chromium forms a thin, self-repairing oxide film, and nickel improves toughness: stainless steel resists corrosion — option (@K). An oil film (@2) washes off; brass and bronze tarnish and are costly for a sink.',
  d: 2, c: 'application', t: [5],
}));
add('catalyst-use-mcq', mcq({
  stem: 'A factory hardens vegetable oil into vanaspati by passing hydrogen through the hot oil. Which catalyst is most suitable?',
  right: 'Finely divided nickel',
  wrong: ['Vanadium pentoxide', 'Mischmetall', 'Silver bromide'],
  sol: 'Nickel adsorbs hydrogen on its surface and catalyses hydrogenation of C=C bonds — option (@K). V₂O₅ (@1) is used for oxidising SO₂ in the contact process.',
  d: 2, c: 'application', t: [5],
}));
add('uses-short', short({
  marks: 2,
  stem: 'Suggest a suitable d- or f-block element or compound for each need, giving one reason: (a) a hip-joint implant; (b) a catalyst for making vanaspati from oil; (c) the flint of a gas lighter; (d) fuel for a nuclear power station.',
  model: '(a) Titanium alloy: light, strong and does not corrode in the body. (b) Finely divided nickel: adsorbs hydrogen and catalyses hydrogenation. (c) Mischmetall (lanthanoids with some iron): gives sparks when struck. (d) Uranium: its nuclei undergo fission and release energy.',
  sol: 'One suitable choice with a property-based reason for each.',
  scheme: [['(a) and (b) with reasons', 1], ['(c) and (d) with reasons', 1]],
  d: 2, c: 'application', t: [5],
}));
// ---------------------------------------------------------------- long answers
add('property-long', long({
  stem: 'Explain the following properties of the 3d transition elements, giving reasons: (a) their high melting points and the maximum near the middle of the series; (b) the small change in atomic radius across the series; (c) variable oxidation states with a maximum at manganese; (d) the formation of coloured ions; (e) their paramagnetism.',
  model: '(a) Besides the outer s electrons, unpaired d electrons take part in metallic bonding; the number of unpaired electrons is greatest mid-series, so bonding, melting points and enthalpies of atomisation peak there. (b) Added electrons enter the inner 3d subshell; poor shielding increases the effective nuclear charge, but repulsion between d electrons balances it, so radii change little after chromium. (c) The 3d and 4s energies are close, so different numbers of electrons can be used; up to Mn all are available (maximum +7), after Mn pairing reduces them. (d) Partly filled d orbitals allow d–d transitions that absorb visible light; the complementary colour is seen. (e) Unpaired d electrons make them paramagnetic; μ = √(n(n+2)) BM.',
  sol: 'One clear reason for each property.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 3, c: 'understanding', t: [2],
}));
add('anomaly-long', long({
  wl: null,
  stem: '(a) Write the electronic configurations of Cr and Cu and explain why they differ from the expected pattern.\n\n(b) Cr²⁺ and Mn³⁺ both have the d⁴ configuration. Explain why Cr²⁺ is reducing while Mn³⁺ is oxidising.\n\n(c) Calculate the spin-only magnetic moment of Fe³⁺ and of Co²⁺ (Z: Fe 26, Co 27), and say which is more strongly attracted by a magnet.',
  model: r`(a) Cr $[\text{Ar}]3d^5 4s^1$ (not $3d^4 4s^2$) and Cu $[\text{Ar}]3d^{10}4s^1$ (not $3d^9 4s^2$): half-filled and completely filled d subshells have extra stability (exchange energy), and 3d and 4s are close in energy, so one 4s electron moves into 3d.

(b) $\ce{Cr^2+}$ loses an electron to become $\ce{Cr^3+}$ ($d^3$, stable half-filled $t_{2g}$ set), so it is a reducing agent ($E^\circ(\ce{Cr^3+/Cr^2+}) = -0.41$ V). $\ce{Mn^3+}$ gains an electron to become $\ce{Mn^2+}$ ($d^5$, extra stable), so it is an oxidising agent ($E^\circ = +1.57$ V).

(c) $\ce{Fe^3+}$ $3d^5$: $n = 5$, $\mu = \sqrt{35} \approx 5.92$ BM. $\ce{Co^2+}$ $3d^7$: $n = 3$, $\mu = \sqrt{15} \approx 3.87$ BM. $\ce{Fe^3+}$, with more unpaired electrons, is more strongly attracted.`,
  sol: 'Stability of d⁵ and d¹⁰; direction of the stable configuration; count unpaired electrons.',
  scheme: [['(a) Both configurations with reason', 1.5], ['(b) Cr²⁺ reducing with reason', 1], ['(b) Mn³⁺ oxidising with reason', 0.5], ['(c) Fe³⁺ 5.92 BM and Co²⁺ 3.87 BM', 1.5], ['(c) Fe³⁺ more strongly attracted', 0.5]],
  d: 4, c: 'analysis', t: [1, 2],
}), () => (near(mu(5), 5.92, 0.002) && near(mu(3), 3.87, 0.002)) || 'mu');
add('kmno4-long', long({
  stem: '(a) How is potassium permanganate prepared from pyrolusite? Give equations.\n\n(b) Describe the structures and magnetic behaviour of the manganate and permanganate ions.\n\n(c) Write ionic equations for the oxidation of iron(II) ions and of oxalate ions by permanganate in acid, and explain why permanganate needs no indicator in these titrations.',
  model: 'Pyrolusite (MnO₂) is fused with KOH and an oxidant such as air: 2MnO₂ + 4KOH + O₂ → 2K₂MnO₄ + 2H₂O. Green manganate is converted to permanganate by electrolytic oxidation, or by disproportionation in acid: 3MnO₄²⁻ + 4H⁺ → 2MnO₄⁻ + MnO₂ + 2H₂O. Both ions are tetrahedral. Manganate (Mn +6, d¹) is green and paramagnetic; permanganate (Mn +7, d⁰) is purple and diamagnetic. In acid: MnO₄⁻ + 5Fe²⁺ + 8H⁺ → Mn²⁺ + 5Fe³⁺ + 4H₂O, and 2MnO₄⁻ + 5C₂O₄²⁻ + 16H⁺ → 2Mn²⁺ + 10CO₂ + 8H₂O. Mn²⁺ is almost colourless, so the first excess drop of purple permanganate gives a permanent pink end point.',
  sol: 'Preparation, structure and magnetism, two equations and the self-indicator idea.',
  scheme: [['(a) Fusion equation', 1], ['(a) Conversion to permanganate', 0.5], ['(b) Tetrahedral structures and magnetism of both ions', 1.5], ['(c) Two balanced ionic equations', 1.5], ['(c) Self-indicator explanation', 0.5]],
  d: 3, c: 'understanding', t: [3],
}));
add('dichromate-long', long({
  stem: '(a) Describe the preparation of potassium dichromate from chromite ore, with equations.\n\n(b) Draw the structures of the chromate and dichromate ions and explain the effect of pH on them.\n\n(c) Write the ionic equations for the oxidation of iron(II) and of iodide ions by acidified dichromate.',
  model: 'Chromite is fused with sodium carbonate in air: 4FeCr₂O₄ + 8Na₂CO₃ + 7O₂ → 8Na₂CrO₄ + 2Fe₂O₃ + 8CO₂. The yellow sodium chromate is filtered and acidified: 2Na₂CrO₄ + 2H⁺ → Na₂Cr₂O₇ + 2Na⁺ + H₂O. Potassium chloride is added: Na₂Cr₂O₇ + 2KCl → K₂Cr₂O₇ + 2NaCl, and the less soluble orange crystals separate. Chromate is tetrahedral; dichromate is two tetrahedra sharing one oxygen (Cr–O–Cr about 126°). In acid, chromate changes to dichromate; in alkali, the reverse: 2CrO₄²⁻ + 2H⁺ ⇌ Cr₂O₇²⁻ + H₂O. Cr₂O₇²⁻ + 14H⁺ + 6Fe²⁺ → 2Cr³⁺ + 6Fe³⁺ + 7H₂O; Cr₂O₇²⁻ + 14H⁺ + 6I⁻ → 2Cr³⁺ + 3I₂ + 7H₂O.',
  sol: 'Three preparation steps; structures and pH equilibrium; two equations.',
  scheme: [['(a) Three steps with equations', 2], ['(b) Structures', 1], ['(b) Effect of pH with equation', 0.5], ['(c) Two balanced equations', 1.5]],
  d: 3, c: 'understanding', t: [3],
}));
add('f-block-long', long({
  stem: '(a) Write the general electronic configuration of the lanthanoids and state their common oxidation state. Why do Ce⁴⁺ and Eu²⁺ exist?\n\n(b) Explain the lanthanoid contraction and its consequences.\n\n(c) Compare the lanthanoids and actinoids with respect to oxidation states, radioactivity and complex formation.',
  model: 'Lanthanoids are [Xe]4f¹⁻¹⁴5d⁰⁻¹6s², with +3 the common oxidation state. Ce⁴⁺ (4f⁰) and Eu²⁺ (4f⁷) exist because empty and half-filled f subshells are stable, but Ce⁴⁺ is an oxidant and Eu²⁺ a reductant since both tend to return to +3. The lanthanoid contraction is the steady decrease in atomic and ionic radii from La to Lu, caused by poor shielding by 4f electrons. As a result, Zr and Hf have almost equal radii and similar chemistry, basicity of Ln(OH)₃ decreases from La to Lu, and the lanthanoids are hard to separate. Actinoids show more oxidation states (up to +7) than lanthanoids (mainly +3), because 5f, 6d and 7s are close in energy; all actinoids are radioactive, but among lanthanoids only promethium is; actinoids form complexes more readily.',
  sol: 'Configuration and states; contraction with cause and consequences; three-way comparison.',
  scheme: [['(a) Configuration, +3, Ce⁴⁺ and Eu²⁺ explained', 1.5], ['(b) Contraction and cause', 1], ['(b) Consequences', 1], ['(c) Three comparisons', 1.5]],
  d: 3, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- case-based
add('titration-case', mk.case({
  passage: r`In a school laboratory, a student titrates $25.0\ \text{mL}$ portions of an acidified solution of Mohr’s salt (an iron(II) salt) with $0.0200\ \text{M}$ potassium permanganate. The burette readings for three titrations are $18.6$, $18.5$ and $18.5\ \text{mL}$. Dilute sulfuric acid is used to acidify the solution; the teacher warns that hydrochloric acid must not be used.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'How is the end point detected in this titration?',
      right: 'The first permanent pale pink colour from a slight excess of permanganate',
      wrong: ['A colour change of added phenolphthalein from colourless to pink', 'The solution turning green as Cr³⁺ forms', 'The solution turning brown as MnO₂ precipitates'],
      sol: 'Permanganate is its own indicator: Mn²⁺ is almost colourless, so the first excess drop stays pink — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: r`Using the concordant titre, calculate the concentration of iron(II) ions in $\text{mol L}^{-1}$.`,
      value: 0.074, tol: 0.0005, unit: 'mol L⁻¹',
      sol: r`Concordant titre $= 18.5$ mL. Moles of $\ce{MnO4-} = 0.0200 \times 0.0185 = 3.7 \times 10^{-4}$; moles of $\ce{Fe^2+} = 5 \times 3.7 \times 10^{-4} = 1.85 \times 10^{-3}$; concentration $= \dfrac{0.00185}{0.0250} = 0.074$, in $\text{mol L}^{-1}$.`,
      scheme: [['Uses 18.5 mL, 1 : 5 ratio; 0.074 mol/L', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why hydrochloric acid must not be used to acidify the solution.',
      model: 'Permanganate is strong enough to oxidise chloride ions to chlorine. Some permanganate would be used up in this side reaction, so the titre would be too large and the calculated iron(II) concentration too high.',
      sol: 'Chloride is oxidised, so extra permanganate is consumed.',
      scheme: [['Permanganate oxidises Cl⁻ to Cl₂', 1], ['Titre too large, result too high', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'The student forgets to add any acid. Predict what would be seen in the flask, and why the titre would be wrong.',
        model: 'Without enough acid, permanganate is reduced only to manganese dioxide, so a brown precipitate appears. Each permanganate ion then takes only three electrons instead of five, so more permanganate is needed and the 1 : 5 ratio no longer applies; the titre and the result would be wrong.',
        sol: 'In neutral solution MnO₄⁻ gives MnO₂ (3 electrons).',
        scheme: [['Brown MnO₂ forms', 1], ['Only 3 electrons per MnO₄⁻, so the 1 : 5 ratio fails', 1]],
        d: 4, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), () => near((0.02 * 0.0185 * 5) / 0.025, 0.074) || 'Fe2+');
add('magnet-case', mk.case({
  passage: 'A research student measures the magnetic moments of three solid salts, X, Y and Z, each known to contain one of the ions Zn²⁺, Cu²⁺ and Mn²⁺ (Z: Mn 25, Cu 29, Zn 30). The results are: X 0 BM; Y 1.73 BM; Z 5.92 BM. She also notes that two of the salts dissolve to give coloured solutions.',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which salt contains Zn²⁺?',
      right: 'X',
      wrong: ['Y', 'Z', 'It cannot be decided from magnetic data'],
      key: 'a',
      sol: 'Zn²⁺ is 3d¹⁰ with no unpaired electrons, so μ = 0: salt X — option (@K).',
      d: 1, c: 'application', t: [2],
    })),
    part('b', num({
      stem: 'How many unpaired electrons are there in the ion in salt Z?',
      value: 5, tol: 0, unit: null,
      sol: r`$n(n+2) = \mu^2 \approx 35$, so $\sqrt{4 + 140} = 12$, so $n = (-2 + 12) \div 2 = 5$: this is $\ce{Mn^2+}$ ($3d^5$).`,
      scheme: [['n = 5', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Which two salts give coloured solutions? Explain.',
      model: 'Y (Cu²⁺, 3d⁹) and Z (Mn²⁺, 3d⁵) have partly filled d subshells, so d–d transitions can absorb visible light and their solutions are coloured (blue and very pale pink). X (Zn²⁺, 3d¹⁰) has a full d subshell and is colourless.',
      sol: 'Partly filled d subshells allow d–d transitions.',
      scheme: [['Y and Z identified', 1], ['Reason: partly filled d subshell allows d–d transition; Zn²⁺ d¹⁰ cannot', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A fourth sample also gives 5.92 BM but contains iron. Identify the iron ion and explain why it has the same moment as Z.',
        model: 'It is Fe³⁺. Fe (Z = 26) is [Ar]3d⁶4s²; Fe³⁺ is [Ar]3d⁵, with five unpaired electrons, exactly like Mn²⁺ (3d⁵). The spin-only moment depends only on the number of unpaired electrons, so both give √35 ≈ 5.92 BM.',
        sol: 'Fe³⁺ is isoelectronic in d count with Mn²⁺.',
        scheme: [['Fe³⁺ identified with 3d⁵', 1], ['Same number of unpaired electrons gives the same μ', 1]],
        d: 4, c: 'analysis', t: [2],
      }),
    ]),
  ],
}), () => near(mu(5), 5.92, 0.002) && near(mu(1), 1.73, 0.002) || 'mu');
add('zr-hf-case', mk.case({
  passage: 'Tubes that hold uranium fuel in nuclear reactors are made from zirconium alloys, because zirconium absorbs very few neutrons. Natural zirconium ores always contain 1–3% hafnium, which absorbs neutrons strongly and must be removed. Engineers describe the separation of zirconium from hafnium as one of the hardest in metallurgy, because the two elements behave almost identically in chemical reactions. (Radii: Zr 160 pm, Hf 159 pm.)',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why do zirconium and hafnium behave almost identically?',
      right: 'They are in the same group and have almost the same atomic and ionic radii.',
      wrong: ['They have the same number of protons.', 'They are both lanthanoids.', 'They both have completely filled d subshells.'],
      sol: 'Same group (same valence configuration) and nearly equal size give nearly identical chemistry — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Name the effect responsible for hafnium being no larger than zirconium.',
      model: 'The lanthanoid contraction.',
      wl: null,
      sol: 'The fourteen lanthanoids come between La and Hf.',
      scheme: [['Lanthanoid contraction', 1]],
      d: 1, c: 'recall', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why hafnium, which has 32 more electrons than zirconium, is not larger.',
      model: 'Between lanthanum and hafnium come the fourteen lanthanoids, in which electrons enter the 4f subshell. 4f electrons shield the outer electrons very poorly, so the effective nuclear charge rises and the atoms contract steadily. This contraction cancels the increase in size expected on moving from period 5 to period 6.',
      sol: 'Poor 4f shielding across the lanthanoids cancels the expected increase.',
      scheme: [['Fourteen 4f electrons added before Hf', 1], ['Poor 4f shielding raises effective nuclear charge, cancelling the expected increase', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'State one other consequence of the same effect, and explain it.',
        model: 'The basicity of the lanthanoid hydroxides decreases from La(OH)₃ to Lu(OH)₃. As the Ln³⁺ ions become smaller, they attract the hydroxide ion more strongly and the M–OH bond becomes more covalent, so hydroxide is released less readily.',
        sol: 'Decreasing basicity of Ln(OH)₃ (or similar 4d/5d properties).',
        scheme: [['A valid consequence', 1], ['Explanation in terms of decreasing ionic size', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}));
add('breath-case', mk.case({
  passage: r`An early roadside breath tester contained crystals of potassium dichromate mixed with sulfuric acid on silica gel. Ethanol in a driver’s breath reduced orange dichromate to green chromium(III):

$\ce{3CH3CH2OH + Cr2O7^2- + 8H+ -> 3CH3CHO + 2Cr^3+ + 7H2O}$

The length of the green band showed how much ethanol had been breathed out. (C = 12, H = 1, O = 16)`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the change in oxidation state of chromium in the tester?',
      right: '+6 to +3',
      wrong: ['+3 to +6', '+7 to +2', '+6 to +2'],
      sol: 'Cr is +6 in dichromate and +3 in Cr³⁺: it is reduced, while ethanol is oxidised — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: r`What mass of ethanol, in **milligrams**, reacts with $1.0 \times 10^{-5}\ \text{mol}$ of dichromate?`,
      value: 1.38, tol: 0.01, unit: 'mg',
      sol: r`Ratio 3 ethanol : 1 dichromate, so ethanol $= 3 \times 1.0 \times 10^{-5} = 3.0 \times 10^{-5}$ mol. Molar mass of ethanol $= 46$. Mass $= 3.0 \times 10^{-5} \times 46 = 0.00138$ g, that is $0.00138 \times 1000 = 1.38$ mg.`,
      scheme: [['3 : 1 ratio and mass ≈ 1.38 mg', 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Why is sulfuric acid included in the tester? Use the equation in your answer.',
      model: 'The equation needs eight hydrogen ions for each dichromate ion: in acid, dichromate is a strong oxidising agent and is reduced to Cr³⁺. Without acid it could not oxidise the ethanol, and the colour change would not occur.',
      sol: 'H⁺ is a reactant; dichromate oxidises strongly only in acid.',
      scheme: [['H⁺ is a reactant in the equation', 1], ['Dichromate is a strong oxidant only in acid solution', 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A newer tester uses permanganate instead. What colour change would show alcohol, assuming acid conditions? Write the reduction half-equation.',
        wl: null,
        model: r`Purple permanganate would be reduced to almost colourless manganese(II), so the purple colour would fade. $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$.`,
        sol: 'Permanganate in acid: purple to colourless.',
        scheme: [['Purple → colourless', 1], ['Correct half-equation', 1]],
        d: 2, c: 'application', t: [3],
      }),
    ]),
  ],
}), () => near(3 * 1e-5 * 46 * 1000, 1.38) || 'ethanol');
