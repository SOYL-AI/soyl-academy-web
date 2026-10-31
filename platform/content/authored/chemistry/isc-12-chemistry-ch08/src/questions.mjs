// ISC 12 Chemistry ch08 Inner Transition (f-Block) Elements — question bank (ISC style). Stems name their own
// element, ion or compound. MCQ keys are placed by the builder; AR keys planned: a d a b c. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 lanthanoids: configuration, states, colour, complexes, alloys
add('ln3-mcq', mcq({
  stem: 'Erbium salts, used to tint glass pink, contain the Er³⁺ ion. Erbium (Z = 68) is [Xe]4f¹²6s². The configuration of Er³⁺ is:',
  right: '[Xe]4f¹¹',
  wrong: ['[Xe]4f¹²', '[Xe]4f¹⁰6s¹', '[Xe]4f⁹6s²'],
  sol: 'Remove the two 6s electrons and then one 4f electron: [Xe]4f¹¹ — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ce4-mcq', mcq({
  stem: 'Ammonium cerium(IV) nitrate is used as a titrant in analytical chemistry. In these titrations the Ce⁴⁺ ion acts as:',
  right: 'an oxidising agent, being reduced to Ce³⁺',
  wrong: ['a reducing agent, being oxidised to Ce⁵⁺', 'a catalyst that is not itself changed', 'a precipitating agent for the analyte'],
  sol: 'For cerium, +3 is the most stable state, so Ce⁴⁺ readily gains an electron (E° about +1.74 V) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('gd-mcq', mcq({
  stem: 'Gadolinium (Z = 64) has the configuration [Xe]4f⁷5d¹6s² rather than [Xe]4f⁸6s². The best reason is:',
  right: 'the half-filled 4f⁷ subshell is especially stable',
  wrong: ['the 5d subshell is lower in energy than 6s', 'gadolinium has no electrons in its 4f subshell', 'a 4f⁸ arrangement would break the 6s² pair'],
  sol: 'Keeping 4f exactly half-filled gives extra exchange stability; the eighth electron goes into 5d — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('lu3-colour-mcq', mcq({
  stem: 'Of the aqueous ions Pr³⁺, Nd³⁺, Lu³⁺ and Er³⁺, which gives a colourless solution?',
  right: 'Lu³⁺',
  wrong: ['Pr³⁺', 'Nd³⁺', 'Er³⁺'],
  sol: 'Lu³⁺ is 4f¹⁴: no f–f transition is possible — option (@K). Pr³⁺ is green, Nd³⁺ lilac, Er³⁺ pink.',
  d: 2, c: 'application', t: [1],
}));
add('eu2-mcq', mcq({
  stem: 'Which pair contains one oxidising and one reducing lanthanoid ion?',
  right: 'Tb⁴⁺ and Yb²⁺',
  wrong: ['Eu²⁺ and Sm²⁺', 'Ce⁴⁺ and Tb⁴⁺', 'La³⁺ and Lu³⁺'],
  sol: 'Tb⁴⁺ gains an electron to give Tb³⁺ (oxidising); Yb²⁺ loses one to give Yb³⁺ (reducing) — option (@K). Eu²⁺/Sm²⁺ are both reducing, Ce⁴⁺/Tb⁴⁺ both oxidising.',
  d: 3, c: 'application', t: [1],
}));
add('complex-ln-mcq', mcq({
  stem: 'Compared with Fe³⁺, the Gd³⁺ ion forms far fewer complexes. The main reason is that Gd³⁺:',
  right: 'is much larger, so its charge density is low, and its 4f orbitals are buried and not available for bonding',
  wrong: ['has no unpaired electrons', 'has a smaller charge than Fe³⁺', 'has a completely filled 4f subshell'],
  sol: 'Large size, low charge density and shielded 4f orbitals limit complex formation — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('mischmetall-mcq', mcq({
  stem: 'The flint of a gas lighter is usually made of mischmetall. Mischmetall is mainly:',
  right: 'an alloy of lanthanoid metals with about 5% iron',
  wrong: ['an alloy of iron with chromium and nickel', 'a mixture of actinoid oxides', 'an alloy of copper and tin'],
  sol: 'About 95% lanthanoid metals and 5% iron with traces of S, C, Ca and Al — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ln-plus3-ar', ar({
  a: 'Every lanthanoid, from cerium to lutetium, forms compounds in the +3 oxidation state.',
  r: 'The high lattice and hydration enthalpies of the small Ln³⁺ ion compensate for the energy needed to remove three electrons.',
  key: 'a',
  sol: 'Both are true, and the energy balance in R explains why +3 is so common — option (a).',
  d: 3, c: 'understanding', t: [1],
}));
add('lu-colour-ar', ar({
  a: 'Aqueous solutions of lutetium(III) salts are coloured.',
  r: 'The Lu³⁺ ion has a completely filled 4f subshell.',
  key: 'd',
  sol: 'A is false: with 4f¹⁴ there is no f–f transition, so Lu³⁺ is colourless. R is true — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('tb4-tf', tf({
  stem: 'Terbium can form the Tb⁴⁺ ion because this ion has a half-filled 4f⁷ subshell.',
  key: 't',
  sol: 'True. Tb (4f⁹6s²) losing four electrons gives 4f⁷.',
  d: 2, c: 'understanding', t: [1],
}));
add('ce-fill', fill({
  stem: 'Cerium(IV) oxide, CeO₂, is used to polish glass. In the Ce⁴⁺ ion of this oxide, the 4f subshell contains ___ electrons.',
  acc: [['0', 'zero', 'no']],
  sol: 'Ce [Xe]4f¹5d¹6s² loses four electrons: Ce⁴⁺ is [Xe]4f⁰, **zero** f electrons.',
  d: 2, c: 'application', t: [1],
}));
add('ion-match', match({
  stem: 'Match each lanthanoid ion with its 4f configuration.',
  pairs: [
    ['Ce⁴⁺', '4f⁰'],
    ['Eu²⁺', '4f⁷'],
    ['Yb²⁺', '4f¹⁴'],
    ['Nd³⁺', '4f³'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Ce⁴⁺ 4f⁰; Eu²⁺ 4f⁷; Yb²⁺ 4f¹⁴; Nd³⁺ 4f³.',
  d: 2, c: 'application', t: [1],
}));
add('gd-mu-num', num({
  marks: 2,
  stem: r`Gadolinium(III) compounds are used as MRI contrast agents because Gd³⁺ (4f⁷) is strongly paramagnetic. Calculate the spin-only magnetic moment of Gd³⁺, in BM.`,
  value: 7.94, tol: 0.02, unit: 'BM',
  sol: r`4f⁷: seven unpaired electrons, $n = 7$. $\mu = \sqrt{7 \times 9} = \sqrt{63} \approx 7.94\ \text{BM}$.`,
  scheme: [['n = 7', 1], ['μ ≈ 7.94 BM', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(Math.sqrt(63), 7.94, 0.002) || 'mu');
add('config-short', short({
  marks: 2,
  stem: 'Write the electronic configurations of cerium (Z = 58), Ce³⁺ and Ce⁴⁺. Which of the two ions has a noble-gas configuration?',
  model: 'Ce: [Xe]4f¹5d¹6s². Ce³⁺: [Xe]4f¹. Ce⁴⁺: [Xe]4f⁰, i.e. the configuration of xenon. Ce⁴⁺ has the noble-gas configuration.',
  sol: 'Ce 4f¹5d¹6s²; Ce³⁺ 4f¹; Ce⁴⁺ [Xe].',
  scheme: [['Three configurations', 1.5], ['Ce⁴⁺ noble-gas', 0.5]],
  d: 2, c: 'application', t: [1],
}));
add('plus3-short', short({
  marks: 2,
  stem: 'Some lanthanoids, such as europium and cerium, also form +2 or +4 ions. Explain why +3 is nevertheless the characteristic oxidation state of the lanthanoids.',
  model: 'Removing the two 6s electrons and one 4f (or 5d) electron needs energy, but the small, highly charged Ln³⁺ ion has large lattice and hydration enthalpies that more than repay it. Further ionisation would remove a deeper 4f electron, which is not repaid. Hence +3 is the most stable state; +2 and +4 ions tend to return to +3.',
  sol: 'Energy balance favours Ln³⁺.',
  scheme: [['Lattice/hydration enthalpy repays three ionisations', 1], ['+2 and +4 revert to +3', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('colour-short', short({
  marks: 2,
  stem: 'Aqueous neodymium(III) nitrate is lilac, but lanthanum(III) nitrate solution is colourless. Explain.',
  model: 'Nd³⁺ is 4f³: its f electrons can absorb certain wavelengths of visible light and move between 4f levels (f–f transitions), so the complementary lilac colour is seen. La³⁺ is 4f⁰: with no f electrons there is no f–f transition, so no visible light is absorbed.',
  sol: 'Nd³⁺ 4f³ f–f transitions; La³⁺ 4f⁰.',
  scheme: [['Nd³⁺ 4f³: f–f transition', 1], ['La³⁺ 4f⁰: none', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('unusual-short3', short({
  marks: 3,
  stem: 'Samarium, europium and ytterbium form Ln²⁺ ions, while cerium and terbium form Ln⁴⁺ ions. Using configurations, explain these states and say whether each kind of ion is oxidising or reducing. (Z: Ce 58, Sm 62, Eu 63, Tb 65, Yb 70)',
  model: 'Eu²⁺ is 4f⁷ (half-filled) and Yb²⁺ is 4f¹⁴ (full); Sm²⁺ is 4f⁶, close to half-filled. These configurations stabilise +2, but +3 is still more stable, so the Ln²⁺ ions lose an electron easily: they are reducing agents. Ce⁴⁺ is 4f⁰ (empty) and Tb⁴⁺ is 4f⁷ (half-filled); these configurations allow +4, but as +3 is more stable the Ln⁴⁺ ions gain an electron: they are oxidising agents.',
  sol: 'Ln²⁺ (f⁷, f¹⁴, near f⁷) reducing; Ln⁴⁺ (f⁰, f⁷) oxidising.',
  scheme: [['Configurations of the +2 ions', 1], ['Configurations of the +4 ions', 1], ['Ln²⁺ reducing, Ln⁴⁺ oxidising', 1]],
  d: 4, c: 'analysis', t: [1],
}));
add('mischmetall-short3', short({
  marks: 3,
  stem: 'What is mischmetall? Give its approximate composition and two uses, and suggest why lanthanoid metals form such alloys readily.',
  model: 'Mischmetall is an alloy of lanthanoid metals (about 95%, mainly Ce and La) with about 5% iron and traces of sulphur, carbon, calcium and aluminium. Uses: flints for lighters and toys; in magnesium-based alloys for bullets, shells and light parts. The lanthanoid atoms are of very similar size and metallic character, so they mix freely in the metallic lattice.',
  sol: '95% Ln + 5% Fe; flints; Mg alloys; similar atomic size.',
  scheme: [['Composition', 1], ['Two uses', 1], ['Similar atomic sizes', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 lanthanoid contraction
add('basicity-mcq', mcq({
  stem: 'In the series La(OH)₃, Nd(OH)₃, Gd(OH)₃ and Yb(OH)₃, the basic strength:',
  right: 'decreases from La(OH)₃ to Yb(OH)₃ because the Ln³⁺ ion becomes smaller',
  wrong: ['increases from La(OH)₃ to Yb(OH)₃ because the nuclear charge increases', 'is the same for all four because all are +3 hydroxides', 'is highest for Gd(OH)₃ because Gd³⁺ is 4f⁷'],
  sol: 'Smaller Ln³⁺ polarises OH⁻ more, giving a more covalent Ln–OH bond and a weaker base — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('cause-mcq', mcq({
  stem: 'The radius of the Ln³⁺ ion falls from 103 pm for La³⁺ to 86 pm for Lu³⁺. This happens because:',
  right: '4f electrons shield the outer electrons poorly from the increasing nuclear charge',
  wrong: ['a new electron shell is added at each step', 'the 6s electrons are progressively removed', 'the number of neutrons decreases across the series'],
  sol: 'Poor shielding by the diffuse 4f orbitals lets effective nuclear charge rise steadily — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('nb-ta-mcq', mcq({
  stem: 'Niobium (Z = 41) and tantalum (Z = 73) have almost identical atomic radii, about 146 pm. This is because:',
  right: 'the lanthanoid contraction cancels the increase in size expected for tantalum',
  wrong: ['niobium and tantalum have the same number of electrons', 'tantalum has fewer electron shells than niobium', 'both elements are actinoids'],
  sol: 'Tantalum follows the lanthanoids; their contraction offsets the extra shell — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('density-hf-mcq', mcq({
  stem: 'Hafnium (13.3 g cm⁻³) is about twice as dense as zirconium (6.5 g cm⁻³). The best explanation is:',
  right: 'the two atoms are almost the same size, but hafnium is nearly twice as heavy',
  wrong: ['hafnium atoms are much smaller than zirconium atoms', 'hafnium has a much larger atomic radius', 'zirconium has more neutrons than hafnium'],
  sol: 'Same volume (lanthanoid contraction), atomic mass 178.5 vs 91.2 — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('separation-mcq', mcq({
  stem: 'Separating the individual lanthanoids present in monazite sand is difficult mainly because:',
  right: 'their ions have the same +3 charge and very similar sizes, so their properties are nearly identical',
  wrong: ['they are all radioactive', 'they all form insoluble chlorides', 'they react explosively with water'],
  sol: 'The lanthanoid contraction is gradual, so neighbouring Ln³⁺ ions are almost the same size — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('osmium-ar', ar({
  a: 'The 5d metals osmium and iridium are among the densest elements known.',
  r: 'The lanthanoid contraction makes 5d atoms about the same size as the 4d atoms above them, while their masses are much larger.',
  key: 'a',
  sol: 'Both are true; similar volume with much greater mass gives the very high density — option (a).',
  d: 3, c: 'analysis', t: [2],
}));
add('contraction-tf', tf({
  stem: 'The lanthanoid contraction occurs because each additional electron across the series enters the 6s subshell.',
  key: 'f',
  sol: 'False. The electrons enter the 4f subshell, which shields poorly.',
  d: 1, c: 'understanding', t: [2],
}));
add('ionexch-fill', fill({
  stem: 'Individual lanthanoids are separated on an industrial scale by the ___ exchange method.',
  acc: [['ion']],
  sol: 'The **ion** exchange method (or repeated fractional crystallisation).',
  d: 1, c: 'recall', t: [2],
}));
add('pct-num', num({
  marks: 1,
  stem: r`The ionic radius of La³⁺ is $103\ \text{pm}$ and that of Lu³⁺ is $86\ \text{pm}$. Calculate the percentage decrease in radius from La³⁺ to Lu³⁺.`,
  value: 16.5, tol: 0.1, unit: '%',
  sol: r`Decrease $= 103 - 86 = 17\ \text{pm}$. Percentage $= 17 \div 103 \times 100 \approx 16.5\%$.`,
  scheme: [['16.5%', 1]],
  d: 2, c: 'application', t: [2],
}), () => near((17 / 103) * 100, 16.5, 0.003) || 'pct');
add('hf-density-num', num({
  marks: 2,
  stem: r`Assume zirconium and hafnium atoms have the same volume and the same crystal structure. The density of zirconium is $6.51\ \text{g cm}^{-3}$; atomic masses: Zr $91.2$, Hf $178.5$. Estimate the density of hafnium.`,
  value: 12.74, tol: 0.05, unit: 'g cm⁻³',
  sol: r`Same volume, so density is proportional to atomic mass: $\rho_\text{Hf} = 6.51 \times 178.5 \div 91.2 \approx 12.74\ \text{g cm}^{-3}$ (the measured value, 13.3, is close).`,
  scheme: [['Density ∝ atomic mass', 1], ['≈ 12.74 g cm⁻³', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => near((6.51 * 178.5) / 91.2, 12.74, 0.002) || 'rho');
add('zrhf-short', short({
  marks: 2,
  stem: 'Zirconium and hafnium occur together in the mineral zircon and are very hard to separate. Explain.',
  model: 'Hafnium follows the lanthanoids. The lanthanoid contraction cancels the increase in size expected from the extra shell, so Hf (159 pm) and Zr (160 pm) have almost the same radius and the same valence configuration. Their chemical properties are therefore almost identical, so they occur together and are hard to separate.',
  sol: 'Lanthanoid contraction: same size, same chemistry.',
  scheme: [['Lanthanoid contraction gives equal size', 1], ['Hence identical chemistry', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('basic-short', short({
  marks: 2,
  stem: 'Lutetium(III) hydroxide is a weaker base than lanthanum(III) hydroxide. Explain.',
  model: 'Because of the lanthanoid contraction, Lu³⁺ (86 pm) is smaller than La³⁺ (103 pm). The smaller ion has a higher charge density and polarises the hydroxide ion more, so the Lu–OH bond is more covalent and releases OH⁻ less readily. Hence Lu(OH)₃ is less basic.',
  sol: 'Smaller Lu³⁺; more covalent bond.',
  scheme: [['Lu³⁺ smaller (contraction)', 1], ['More covalent, less OH⁻ released', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('contraction-short3', short({
  marks: 3,
  stem: 'The ionic radii of La³⁺, Gd³⁺ and Lu³⁺ are 103, 94 and 86 pm. (a) Calculate the average decrease in radius per unit increase in atomic number from La³⁺ (Z = 57) to Lu³⁺ (Z = 71). (b) Explain why the decrease per step is so small. (c) State one consequence of this decrease for the third transition series.',
  model: r`(a) Average decrease $= (103 - 86) \div (71 - 57) = 17 \div 14 \approx 1.2$ pm per element. (b) Each step adds one proton and one 4f electron. The 4f electron shields the outer electrons only partly (poorly), so the effective nuclear charge rises a little each time and the size falls slowly but steadily. (c) 5d elements are almost the same size as the 4d elements above them (Zr ≈ Hf), so their chemistry is very similar.`,
  sol: 'About 1.2 pm per element; partial 4f shielding; Zr ≈ Hf.',
  scheme: [['(a) ≈ 1.2 pm', 1], ['(b) Poor 4f shielding', 1], ['(c) Consequence', 1]],
  d: 3, c: 'application', t: [2],
}));
add('mo-w-short3', short({
  marks: 3,
  stem: 'Molybdenum (atomic mass 95.9) and tungsten (atomic mass 183.8) have almost the same atomic radius. Using the lanthanoid contraction, explain (a) their similar radii, (b) the much higher density of tungsten, and (c) their similar chemistry.',
  model: '(a) Tungsten comes after the fourteen lanthanoids; the poor shielding by 4f electrons increases the effective nuclear charge enough to cancel the extra shell, so W is no larger than Mo. (b) With nearly the same atomic volume but almost twice the mass, tungsten is much denser (about 19.3 vs 10.2 g cm⁻³). (c) Same size and same valence configuration give very similar chemical properties.',
  sol: 'Contraction; same volume, more mass; similar chemistry.',
  scheme: [['(a) Contraction cancels extra shell', 1], ['(b) Same volume, greater mass', 1], ['(c) Same size and configuration', 1]],
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 reactivity of lanthanoids
add('react-mcq', mcq({
  stem: 'When neodymium metal is heated in nitrogen, the product formed is:',
  right: 'NdN',
  wrong: ['Nd₃N₂', 'Nd(N₃)₃', 'NdN₂'],
  sol: 'Lanthanoids combine with nitrogen on heating to give LnN, with Ln in the +3 state — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('water-mcq', mcq({
  stem: 'Lanthanum metal is added to hot water. The products are:',
  right: 'La(OH)₃ and H₂',
  wrong: ['La₂O₃ and H₂O₂', 'LaH₃ and O₂', 'La(OH)₂ and H₂'],
  sol: '2La + 6H₂O → 2La(OH)₃ + 3H₂ — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('carbide-mcq', mcq({
  stem: 'Heating a lanthanoid metal with carbon at about 2773 K gives:',
  right: 'carbides such as LnC₂, Ln₂C₃ and Ln₃C',
  wrong: ['carbonates of formula Ln₂(CO₃)₃', 'carbonyls of formula Ln(CO)₆', 'no reaction, as carbon is inert'],
  sol: 'Lanthanoids form carbides at high temperature — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('oxide-mcq', mcq({
  stem: 'Most lanthanoids burn in oxygen to give oxides of formula Ln₂O₃. Cerium, however, burns to give:',
  right: 'CeO₂',
  wrong: ['CeO', 'Ce₃O₄', 'CeO₃'],
  sol: 'Cerium forms the +4 oxide CeO₂ (4f⁰) — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('reactivity-mcq', mcq({
  stem: 'In their reactions with water, acids and non-metals, the early lanthanoids such as lanthanum and cerium behave most like:',
  right: 'calcium',
  wrong: ['gold', 'copper', 'argon'],
  sol: 'They are highly electropositive (E° about −2.3 V), like calcium — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('sulphide-mcq', mcq({
  stem: 'Samarium metal is heated with sulphur. The formula of the sulphide formed is:',
  right: 'Sm₂S₃',
  wrong: ['SmS₂', 'Sm₃S₂', 'SmS₃'],
  sol: 'Sm³⁺ and S²⁻ combine in the ratio 2 : 3 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('hydride-ar', ar({
  a: 'Lanthanoid metals liberate hydrogen from dilute hydrochloric acid.',
  r: 'Lanthanoids form hydrides of formula LnH₂ and LnH₃ when heated with hydrogen.',
  key: 'b',
  sol: 'Both are true, but the formation of hydrides does not explain the reaction with acid (which is due to the metals being strongly electropositive) — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('ce-acid-tf', tf({
  stem: 'Cerium metal dissolves in dilute hydrochloric acid with the evolution of hydrogen.',
  key: 't',
  sol: 'True. 2Ce + 6HCl → 2CeCl₃ + 3H₂.',
  d: 1, c: 'understanding', t: [3],
}));
add('ho-fill', fill({
  stem: 'Heating holmium with sulphur gives the sulphide Ho₂S₃, in which holmium is in the +___ oxidation state.',
  acc: [['3', 'three']],
  sol: 'Ho₂S₃: 2x = 6, so holmium is **+3**.',
  d: 1, c: 'application', t: [3],
}));
add('react-match', match({
  stem: 'Match each reaction of dysprosium metal with its product.',
  pairs: [
    ['Burning in oxygen', 'Dy₂O₃'],
    ['Heating in chlorine', 'DyCl₃'],
    ['Heating in nitrogen', 'DyN'],
    ['Reaction with hot water', 'Dy(OH)₃ and H₂'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Oxygen → Dy₂O₃; chlorine → DyCl₃; nitrogen → DyN; water → Dy(OH)₃ + H₂.',
  d: 2, c: 'application', t: [3],
}));
add('la2o3-num', num({
  marks: 2,
  stem: r`$2.778\ \text{g}$ of lanthanum is burnt completely in oxygen: $\ce{4La + 3O2 -> 2La2O3}$. Calculate the mass of lanthanum oxide formed. (La = 138.9, O = 16.0)`,
  value: 3.258, tol: 0.01, unit: 'g',
  sol: r`$n(\text{La}) = 2.778 \div 138.9 = 0.0200\ \text{mol}$; $n(\text{La}_2\text{O}_3) = 0.0100\ \text{mol}$. $M = 2 \times 138.9 + 3 \times 16.0 = 325.8$. Mass $= 0.0100 \times 325.8 = 3.258\ \text{g}$.`,
  scheme: [['Moles of La and of oxide', 1], ['3.258 g', 1]],
  d: 3, c: 'application', t: [3],
}), () => near((2.778 / 138.9 / 2) * (2 * 138.9 + 48), 3.258, 0.002) || 'mass');
add('h2-vol-num', num({
  marks: 2,
  stem: r`$0.020\ \text{mol}$ of cerium reacts with excess dilute hydrochloric acid: $\ce{2Ce + 6HCl -> 2CeCl3 + 3H2}$. Calculate the volume of hydrogen formed at STP, in litres. (Molar volume $22.4\ \text{L}$)`,
  value: 0.672, tol: 0.003, unit: 'L',
  sol: r`$n(\text{H}_2) = 0.020 \times 3 \div 2 = 0.030\ \text{mol}$; $V = 0.030 \times 22.4 = 0.672\ \text{L}$.`,
  scheme: [['0.030 mol H₂', 1], ['0.672 L', 1]],
  d: 2, c: 'application', t: [3],
}), () => near(0.02 * 1.5 * 22.4, 0.672) || 'vol');
add('eq-short', short({
  marks: 2,
  stem: 'Write balanced equations for the reaction of (a) lanthanum with water and (b) gadolinium with nitrogen on heating.',
  model: r`(a) $\ce{2La + 6H2O -> 2La(OH)3 + 3H2}$. (b) $\ce{2Gd + N2 -> 2GdN}$.`,
  sol: 'Two balanced equations.',
  scheme: [['(a) Balanced', 1], ['(b) Balanced', 1]],
  d: 2, c: 'application', t: [3],
}));
add('carbon-short', short({
  marks: 2,
  stem: 'What is formed when a lanthanoid metal such as cerium is heated (a) with carbon at about 2773 K, and (b) with hydrogen?',
  model: '(a) Carbides of formula Ln₃C, Ln₂C₃ and LnC₂ (e.g. CeC₂). (b) Hydrides LnH₂ and LnH₃ (e.g. CeH₃).',
  sol: 'Carbides; hydrides.',
  scheme: [['(a) Carbides', 1], ['(b) Hydrides', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('reactions-short3', short({
  marks: 3,
  stem: 'Write balanced equations for: (a) europium burning in oxygen to give the +3 oxide; (b) terbium heated with bromine; (c) lutetium dissolving in dilute sulphuric acid.',
  model: r`(a) $\ce{4Eu + 3O2 -> 2Eu2O3}$. (b) $\ce{2Tb + 3Br2 -> 2TbBr3}$. (c) $\ce{2Lu + 3H2SO4 -> Lu2(SO4)3 + 3H2}$.`,
  sol: 'Three balanced equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3],
}));
add('calcium-short3', short({
  marks: 3,
  stem: 'Compare the reactivity of the lanthanoids with that of calcium. In your answer, (a) give the reason for their high reactivity, (b) state how reactivity changes from lanthanum to lutetium, and (c) give one equation showing a calcium-like reaction.',
  model: r`(a) They are strongly electropositive metals with $E^\circ_{\ce{Ln^3+/Ln}}$ about −2.3 V, close to that of calcium, so they lose electrons readily. (b) Reactivity decreases slightly from La to Lu as the atoms become smaller (lanthanoid contraction) and hold their electrons more firmly. (c) $\ce{2La + 6H2O -> 2La(OH)3 + 3H2}$, like $\ce{Ca + 2H2O -> Ca(OH)2 + H2}$.`,
  sol: 'Electropositive; decreases slightly; reaction with water.',
  scheme: [['(a) Electropositive, E° about −2.3 V', 1], ['(b) Decreases La → Lu', 1], ['(c) Balanced equation', 1]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 actinoids
add('actinoid-mcq', mcq({
  stem: 'Plutonium forms compounds in every oxidation state from +3 to +7. Which feature of its electronic structure makes this possible?',
  right: 'Its 5f, 6d and 7s orbitals are close in energy, so varying numbers of electrons can be used in bonding',
  wrong: ['Its 5f subshell is completely filled', 'It has no electrons in its 5f subshell', 'Its 7s electrons cannot be removed'],
  sol: 'Close 5f/6d/7s energies and less buried 5f orbitals allow many electrons to be used — option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('compare-mcq', mcq({
  stem: 'Which property is shown by every actinoid but by only one lanthanoid?',
  right: 'Radioactivity',
  wrong: ['Metallic character', 'Filling of an f subshell', 'Formation of compounds in the +3 state'],
  sol: 'All actinoids are radioactive; among lanthanoids only promethium is — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('tho2-mcq', mcq({
  stem: 'Thorium dioxide, ThO₂, was once used in gas lamp mantles. The oxidation state of thorium in ThO₂ is:',
  right: '+4',
  wrong: ['+2', '+3', '+6'],
  sol: 'x + 2(−2) = 0, so x = +4 — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('transuranium-mcq', mcq({
  stem: 'Americium, used in household smoke detectors, is called a transuranium element because:',
  right: 'its atomic number is greater than that of uranium and it is made artificially',
  wrong: ['it is extracted from uranium ores', 'it is lighter than uranium', 'it has the same atomic number as uranium'],
  sol: 'Elements with Z > 92 are transuranium elements, all synthetic — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('an-contraction-mcq', mcq({
  stem: 'The contraction in size across the actinoid series is greater than that across the lanthanoids. This is because:',
  right: '5f electrons shield the outer electrons even more poorly than 4f electrons',
  wrong: ['actinoids have fewer electrons than lanthanoids', '5f electrons are closer to the nucleus than 4f electrons', 'actinoids are not radioactive'],
  sol: 'Poorer shielding by 5f electrons gives a larger increase in effective nuclear charge — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('config-an-mcq', mcq({
  stem: 'The ground-state electronic configuration of thorium (Z = 90), the first actinoid, is:',
  right: '[Rn]6d²7s²',
  wrong: ['[Rn]5f²7s²', '[Rn]5f³7s¹', '[Rn]5f¹⁴7s²'],
  sol: 'Thorium has no 5f electrons in its ground state: [Rn]6d²7s² — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('study-mcq', mcq({
  stem: 'The chemistry of elements such as einsteinium and fermium is far less known than that of the lanthanoids mainly because:',
  right: 'they are radioactive, have short half-lives and are available only in tiny amounts',
  wrong: ['they are gases at room temperature', 'they do not form any compounds', 'they are too unreactive to study'],
  sol: 'Short half-lives and tiny quantities make heavy actinoids hard to study — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('complex-an-ar', ar({
  a: 'Actinoids form complexes more readily than lanthanoids.',
  r: 'All actinoid ions have a completely filled 5f subshell.',
  key: 'c',
  sol: 'A is true (higher charge density, 5f orbitals available). R is false: actinoid ions have partly filled 5f subshells — option (c).',
  d: 3, c: 'understanding', t: [4],
}));
add('am-tf', tf({
  stem: 'All the actinoids beyond uranium occur naturally in large amounts in uranium ores.',
  key: 'f',
  sol: 'False. Transuranium elements are made artificially (only traces of Np and Pu occur naturally).',
  d: 1, c: 'recall', t: [4],
}));
add('np-fill', fill({
  stem: 'The highest oxidation state shown by neptunium and plutonium is +___.',
  acc: [['7', 'seven']],
  sol: '**+7**.',
  d: 1, c: 'recall', t: [4],
}));
add('diuranate-num', num({
  marks: 1,
  stem: r`Calculate the oxidation state of uranium in sodium diuranate, Na₂U₂O₇ (a form of "yellowcake").`,
  value: 6, tol: 0, unit: null,
  sol: r`$2(+1) + 2x + 7(-2) = 0$, so $2x = 14 - 2 = 12$ and $x = 12 \div 2 = 6$. Uranium is +6.`,
  scheme: [['+6', 1]],
  d: 2, c: 'application', t: [4],
}), () => near((14 - 2) / 2, 6) || 'ox');
add('actinoid-short', short({
  marks: 2,
  stem: 'Why are the transuranium elements made artificially? Name one such element and give one of its uses.',
  model: 'Their isotopes are radioactive with half-lives short compared with the age of the Earth, so any formed originally have decayed; they are made in nuclear reactors or accelerators by bombarding heavier nuclei. Example: plutonium, used as nuclear fuel (or americium in smoke detectors).',
  sol: 'Short half-lives; plutonium fuel.',
  scheme: [['Reason', 1], ['Example and use', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('range-short', short({
  marks: 2,
  stem: 'Uranium shows oxidation states +3, +4, +5 and +6, whereas lanthanoids rarely go beyond +3. Explain.',
  model: 'In uranium the 5f, 6d and 7s orbitals are very close in energy, and 5f orbitals extend further from the nucleus than 4f orbitals, so different numbers of these electrons can be used in bonding (up to all six). In lanthanoids the 4f electrons are buried and much lower in energy, so only three electrons are usually lost.',
  sol: 'Close 5f/6d/7s energies; 4f buried.',
  scheme: [['5f, 6d, 7s close; 5f less buried', 1], ['4f buried in lanthanoids', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Compare lanthanoids and actinoids with respect to (a) the size of the contraction across each series, (b) their occurrence in nature, and (c) the basic character of their oxides.',
  model: '(a) Both contract, but the actinoid contraction is greater because 5f electrons shield more poorly than 4f. (b) Lanthanoids occur naturally (e.g. in monazite), except promethium; among actinoids only thorium and uranium occur in significant amounts — the rest are made artificially. (c) Lanthanoid oxides are basic; actinoid oxides are less basic (and some actinoids in high states form amphoteric or acidic oxides).',
  sol: 'Contraction; occurrence; basicity.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('uranium-short3', short({
  marks: 3,
  stem: 'Calculate the oxidation state of uranium in (a) uranium tetrafluoride, UF₄, (b) uranium trioxide, UO₃, and (c) the uranyl ion, UO₂²⁺. What does the result show about actinoids compared with lanthanoids?',
  model: '(a) x + 4(−1) = 0: +4. (b) x + 3(−2) = 0: +6. (c) x + 2(−2) = +2: +6. Uranium readily shows +4 and +6, whereas lanthanoids are mainly +3 and never exceed +4; actinoids show a wider range of oxidation states.',
  sol: '+4; +6; +6; wider range.',
  scheme: [['(a) +4', 1], ['(b) and (c) +6', 1], ['Wider range than lanthanoids', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- long answers
add('ln-long', long({
  stem: '(a) Write the electronic configurations of gadolinium (Z = 64) and of the Gd³⁺ ion. [1½]\n\n(b) Explain why +3 is the most stable oxidation state of the lanthanoids, and why Ce⁴⁺ is an oxidising agent while Yb²⁺ is a reducing agent. [2]\n\n(c) Explain why Nd³⁺ salts are coloured but Lu³⁺ salts are colourless. [1½]',
  model: '(a) Gd: [Xe]4f⁷5d¹6s². Gd³⁺: [Xe]4f⁷.\n\n(b) The energy needed to remove three electrons is repaid by the large lattice and hydration enthalpies of the small Ln³⁺ ion, so +3 is the most stable state. Ce⁴⁺ (4f⁰) gains an electron to return to +3, so it is oxidising. Yb²⁺ (4f¹⁴) loses an electron to reach +3, so it is reducing.\n\n(c) Nd³⁺ (4f³) has partly filled f orbitals; f–f transitions absorb visible light and the complementary colour is seen. Lu³⁺ (4f¹⁴) has a full subshell, so no f–f transition is possible.',
  sol: 'Gd 4f⁷5d¹6s²; +3 stability; Ce⁴⁺ oxidising, Yb²⁺ reducing; f–f transitions.',
  scheme: [['(a) Both configurations', 1.5], ['(b) +3 stability', 1], ['(b) Ce⁴⁺ and Yb²⁺', 1], ['(c) f–f transition and f¹⁴', 1.5]],
  d: 3, c: 'application', t: [1],
}));
add('contraction-long', long({
  stem: '(a) The Ln³⁺ radius falls from 103 pm (La³⁺) to 86 pm (Lu³⁺). Name this effect and explain its cause. [2]\n\n(b) Use it to explain (i) the very similar chemistry of niobium and tantalum, and (ii) the decrease in basic strength from La(OH)₃ to Lu(OH)₃. [2]\n\n(c) Why are individual lanthanoids difficult to separate, and which method is used? [1]',
  model: '(a) The lanthanoid contraction. Across the series each added electron enters the 4f subshell; 4f orbitals are diffuse and shield the outer electrons poorly, so the effective nuclear charge increases steadily and the atoms and ions shrink.\n\n(b) (i) Tantalum comes after the lanthanoids; the contraction cancels the expected increase in size, so Nb and Ta have almost the same radius and very similar chemistry. (ii) The Ln³⁺ ion becomes smaller from La to Lu, polarises OH⁻ more and forms a more covalent Ln–OH bond, so the hydroxide becomes less basic.\n\n(c) Neighbouring lanthanoids have the same +3 charge and almost the same size, so their properties are nearly identical; they are separated by ion exchange (or fractional crystallisation).',
  sol: 'Lanthanoid contraction; Nb ≈ Ta; basicity; ion exchange.',
  scheme: [['(a) Name and poor 4f shielding', 2], ['(b)(i) Nb ≈ Ta', 1], ['(b)(ii) Basicity falls', 1], ['(c) Similar size; ion exchange', 1]],
  d: 4, c: 'analysis', t: [2],
}));
add('react-long', long({
  stem: '(a) Write balanced equations for the reactions of holmium with (i) oxygen, (ii) chlorine, (iii) nitrogen and (iv) water. [2]\n\n(b) Calculate the mass of holmium(III) oxide formed when 3.298 g of holmium burns completely in oxygen. (Ho = 164.9, O = 16.0) [2]\n\n(c) Why does reactivity decrease slightly from lanthanum to lutetium? [1]',
  model: r`(a) (i) $\ce{4Ho + 3O2 -> 2Ho2O3}$; (ii) $\ce{2Ho + 3Cl2 -> 2HoCl3}$; (iii) $\ce{2Ho + N2 -> 2HoN}$; (iv) $\ce{2Ho + 6H2O -> 2Ho(OH)3 + 3H2}$.

(b) $n(\text{Ho}) = 3.298 \div 164.9 = 0.0200\ \text{mol}$, so $n(\text{Ho}_2\text{O}_3) = 0.0100\ \text{mol}$. $M = 2 \times 164.9 + 48.0 = 377.8$. Mass $= 0.0100 \times 377.8 \approx 3.78\ \text{g}$.

(c) The atoms become smaller (lanthanoid contraction) and the effective nuclear charge increases, so the outer electrons are held more firmly and lost less readily.`,
  sol: 'Four equations; about 3.78 g; contraction.',
  scheme: [['(a) Four balanced equations', 2], ['(b) Moles', 1], ['(b) 3.78 g', 1], ['(c) Smaller atoms hold electrons more firmly', 1]],
  d: 3, c: 'application', t: [3],
}));
add('actinoid-long', long({
  stem: '(a) Write the electronic configurations of thorium (Z = 90) and uranium (Z = 92). Why are the actinoids called 5f elements? [1½]\n\n(b) Give the oxidation state of uranium in UF₆, UO₂²⁺ and U⁴⁺, and explain why actinoids show a wider range of oxidation states than lanthanoids. [2]\n\n(c) Give two reasons why the chemistry of the actinoids is harder to study than that of the lanthanoids. [1½]',
  model: '(a) Th: [Rn]6d²7s²; U: [Rn]5f³6d¹7s². Across the series the differentiating electrons enter the 5f subshell, so they are called 5f elements (even though thorium itself has no 5f electron in its ground state).\n\n(b) UF₆: +6; UO₂²⁺: +6; U⁴⁺: +4. The 5f, 6d and 7s levels are close in energy and 5f orbitals are less deeply buried than 4f, so a variable number of electrons can take part in bonding.\n\n(c) All actinoids are radioactive (hazardous, need special handling); many have short half-lives and are available only in tiny amounts; their wide range of oxidation states makes their chemistry complicated.',
  sol: 'Configurations; +6, +6, +4; close energies; radioactivity and scarcity.',
  scheme: [['(a) Configurations and 5f', 1.5], ['(b) Three oxidation states', 1], ['(b) Reason for range', 1], ['(c) Two reasons', 1.5]],
  d: 3, c: 'understanding', t: [4],
}));
add('compare-long', long({
  stem: '(a) Give four differences between the lanthanoids and the actinoids in a table. [2]\n\n(b) Explain why the actinoid contraction is greater than the lanthanoid contraction. [1½]\n\n(c) Give one important use each of mischmetall, neodymium and uranium. [1½]',
  model: '(a) Lanthanoids: 4f filled; mainly +3, at most +4; only Pm radioactive; fewer complexes; basic oxides. Actinoids: 5f filled; +3 to +7; all radioactive; more complexes; less basic oxides.\n\n(b) 5f orbitals are more diffuse than 4f orbitals and shield the outer electrons even more poorly, so the effective nuclear charge increases more sharply from one element to the next.\n\n(c) Mischmetall: lighter flints (or Mg alloys for shells). Neodymium: powerful permanent magnets (Nd₂Fe₁₄B) in motors. Uranium: nuclear fuel.',
  sol: 'Four differences; poorer 5f shielding; uses.',
  scheme: [['(a) Four differences', 2], ['(b) Poorer 5f shielding', 1.5], ['(c) Three uses', 1.5]],
  d: 2, c: 'understanding', t: [4],
}));
