// ch20 question bank, part 3: t05 free-radical and polar mechanisms (SN1, SN2, E1, E2).
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, num, short, long } = mk;

add('sn2-mcq', mcq({
  stem: 'Optically pure (R)-2-bromobutane is treated with aqueous sodium hydroxide under conditions that favour the SN2 path. The main product is:',
  right: '(S)-butan-2-ol, formed with inversion of configuration',
  wrong: ['(R)-butan-2-ol, formed with retention of configuration', 'racemic butan-2-ol', 'but-1-ene'],
  sol: 'In SN2 the nucleophile attacks from the side opposite to bromine, so the configuration at the carbon is inverted. The priorities Br > C₂H₅ > CH₃ > H become OH > C₂H₅ > CH₃ > H, so the descriptor changes from R to S — option (@K). Retention (@1) and racemisation (@2) belong to other paths, and an alkene (@3) arises by elimination.',
  d: 4, c: 'application', t: [5],
}));
add('sn1-mcq', mcq({
  stem: 'A kinetics group follows the hydrolysis of four alkyl bromides in aqueous ethanol. The one that reacts fastest by the SN1 route is:',
  right: '(CH₃)₃CBr',
  wrong: ['CH₃Br', 'CH₃CH₂Br', '(CH₃)₂CHBr'],
  sol: 'The rate-determining step forms a carbocation, and the tertiary cation is the most stable, so (CH₃)₃CBr reacts fastest — option (@K). The order of SN1 reactivity is 3° > 2° > 1° > methyl.',
  d: 2, c: 'understanding', t: [5],
}));
add('e2-mcq', mcq({
  stem: 'A chemist heats 2-bromo-2-methylpropane with a concentrated solution of potassium hydroxide in ethanol. The main product is:',
  right: '2-methylpropene',
  wrong: ['2-methylpropan-2-ol', 'butane', '2-ethoxy-2-methylpropane'],
  sol: 'A strong base in alcoholic solution with heat removes HBr (elimination), giving the alkene 2-methylpropene — option (@K). The alcohol (@1) would be the substitution product with aqueous KOH.',
  d: 2, c: 'application', t: [5],
}));
add('solvent-mcq', mcq({
  stem: 'A student wants to speed up the SN1 hydrolysis of 2-chloro-2-methylpropane by changing only the solvent. The best choice is:',
  right: 'a mixture of water and ethanol, a polar protic solvent',
  wrong: ['hexane, a non-polar solvent', 'carbon tetrachloride, a non-polar solvent', 'benzene, a non-polar solvent'],
  sol: 'The slow step forms ions; a polar protic solvent stabilises both the carbocation and the leaving group by solvation, which lowers the energy of the transition state — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('chainterm-mcq', mcq({
  stem: 'In the free-radical chlorination of methane in sunlight, which of these steps is a chain-termination step?',
  right: 'CH₃· + Cl· → CH₃Cl',
  wrong: ['Cl₂ → 2Cl·', 'Cl· + CH₄ → CH₃· + HCl', 'CH₃· + Cl₂ → CH₃Cl + Cl·'],
  sol: 'Termination removes radicals without making new ones: a methyl radical and a chlorine atom combine — option (@K). Cl₂ → 2Cl· is initiation (@1); the other two are propagation steps (@2, @3), which regenerate a radical.',
  d: 2, c: 'understanding', t: [5],
}));
add('e1-ar', ar({
  a: 'The E2 elimination of an alkyl halide proceeds through a carbocation intermediate.',
  r: 'The rate of an E2 reaction does not depend on the concentration of the base.',
  key: 'd',
  sol: 'Both are false. E2 is a one-step, concerted reaction with no intermediate, and its rate = k[RX][base] depends on both, being second order; the carbocation intermediate belongs to E1 — option (d).',
  d: 3, c: 'analysis', t: [5],
}));
add('sn2-ar', ar({
  a: 'An SN2 reaction at the chiral carbon of an optically active alkyl halide gives a product of inverted configuration.',
  r: 'Sodium chloride is formed when sodium burns in chlorine.',
  key: 'b',
  sol: 'Both statements are true: backside attack inverts the carbon, and sodium burns in chlorine to give NaCl. The reason has no connection with the assertion — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
{
  const k = 4.0e-4;
  const c1 = 0.2;
  const c2 = 0.3;
  const rate = k * c1 * c2;
  add('sn2rate-num', num({
    stem: `The SN2 reaction of bromoethane with hydroxide ions in aqueous ethanol has rate = k[CH₃CH₂Br][OH⁻], with k = 4.0 × 10⁻⁴ L mol⁻¹ s⁻¹ (given). Find the initial rate, in mol L⁻¹ s⁻¹, when [CH₃CH₂Br] = ${c1.toFixed(2)} mol L⁻¹ and [OH⁻] = ${c2.toFixed(2)} mol L⁻¹.`,
    value: 2.4e-5, tol: 1e-7, unit: 'mol L⁻¹ s⁻¹',
    sol: r`Rate $= k[\ce{CH3CH2Br}][\ce{OH-}] = 4.0 \times 10^{-4} \times ${c1.toFixed(2)} \times ${c2.toFixed(2)} = 2.4 \times 10^{-5} = 0.000024\ \text{mol L}^{-1}\,\text{s}^{-1}$.`,
    scheme: [['Substitutes into the second-order rate law', 0.5], ['2.4 × 10⁻⁵ mol L⁻¹ s⁻¹', 0.5]],
    d: 1, c: 'understanding', t: [5],
  }), () => near(rate, 2.4e-5, 0.0001) || 'sn2rate');
}
{
  const fRX = 3;
  const fOH = 0.5;
  const factor = fRX * fOH;
  add('ratefactor-num', num({
    stem: `A kinetics experiment on an SN2 reaction (rate = k[RX][Nu⁻]) is repeated with the concentration of the alkyl halide made ${fRX} times larger and that of the nucleophile made half as large. By what factor does the initial rate change?`,
    value: 1.5, tol: 0.01, unit: null,
    sol: r`New rate $= k(${fRX}[\text{RX}])(\tfrac{1}{2}[\text{Nu}^-]) = ${fRX} \times \tfrac{1}{2} \times \text{old rate} = ${factor}\ \times$ old rate.`,
    scheme: [['Both concentrations appear in the rate law', 0.5], ['Factor 1.5', 0.5]],
    d: 2, c: 'application', t: [5],
  }), () => near(factor, 1.5, 0.0001) || 'ratefactor');
}
{
  const k = 1.2e-3;
  const cRX = 0.05;
  const cNu = 0.4;
  const rate = k * cRX; // SN1: independent of the nucleophile
  add('sn1rate-num', num({
    stem: `The SN1 hydrolysis of 2-bromo-2-methylpropane in aqueous acetone has rate = k[RBr], with k = 1.2 × 10⁻³ s⁻¹ (given). Find the initial rate, in mol L⁻¹ s⁻¹, when [RBr] = ${cRX.toFixed(3)} mol L⁻¹ and the concentration of the nucleophile is ${cNu.toFixed(2)} mol L⁻¹.`,
    value: 6.0e-5, tol: 1e-7, unit: 'mol L⁻¹ s⁻¹',
    sol: r`In SN1 the slow step involves only the alkyl halide, so the nucleophile concentration does not appear in the rate law. Rate $= k[\text{RBr}] = 1.2 \times 10^{-3} \times ${cRX.toFixed(3)} = 6.0 \times 10^{-5} = 0.00006\ \text{mol L}^{-1}\,\text{s}^{-1}$.`,
    scheme: [['Recognises first order in RBr only', 0.5], ['6.0 × 10⁻⁵ mol L⁻¹ s⁻¹', 0.5]],
    d: 2, c: 'application', t: [5],
  }), () => near(rate, 6.0e-5, 0.0001) || 'sn1rate');
}
add('sn2feat-short', short({
  marks: 2,
  stem: 'State two features of the SN2 reaction of bromoethane with hydroxide ion, one about its kinetics and one about its stereochemistry (for a chiral halide).',
  model: 'Kinetics: second order, rate = k[RBr][OH⁻]; the reaction occurs in a single step through one transition state, with no intermediate. Stereochemistry: the nucleophile attacks from the side opposite to the leaving group (backside attack), so the configuration at a chiral carbon is inverted (Walden inversion).',
  sol: 'Second-order rate law; inversion.',
  scheme: [['Second-order kinetics, one step', 1], ['Backside attack, inversion of configuration', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('e2-short', short({
  marks: 2,
  stem: 'Bromoethane is heated with potassium hydroxide in two different ways. Name the product and the type of reaction when (i) aqueous KOH is used and (ii) concentrated alcoholic KOH is used.',
  model: r`(i) Aqueous KOH: ethanol, by nucleophilic substitution, $\ce{C2H5Br + KOH -> C2H5OH + KBr}$. (ii) Concentrated alcoholic KOH and heat: ethene, by elimination (E2), $\ce{C2H5Br + KOH -> C2H4 + KBr + H2O}$.`,
  sol: 'Substitution with aqueous KOH; elimination with alcoholic KOH.',
  scheme: [['(i) ethanol, substitution', 1], ['(ii) ethene, elimination', 1]],
  d: 2, c: 'application', t: [5],
}));
add('chain-short', short({
  marks: 2,
  stem: 'Name the three stages of the free-radical chlorination of methane and write one equation (using a dot for the unpaired electron) for each.',
  model: 'Initiation: Cl₂ → 2Cl· (light splits the Cl–Cl bond homolytically). Propagation: Cl· + CH₄ → CH₃· + HCl, then CH₃· + Cl₂ → CH₃Cl + Cl·. Termination: CH₃· + Cl· → CH₃Cl (or 2Cl· → Cl₂, or 2CH₃· → C₂H₆).',
  sol: 'Initiation, propagation, termination with one equation each.',
  scheme: [['Names of the three stages', 1], ['One correct equation for each stage', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('radical-short3', short({
  marks: 3,
  stem: r`Write the mechanism of the free-radical monochlorination of methane in sunlight, showing initiation and the two propagation steps (use a dot for the unpaired electron), give the overall balanced equation, and explain why dichloromethane and other products are also found.`,
  model: r`Initiation: Cl₂ → 2Cl·. Propagation: Cl· + CH₄ → CH₃· + HCl; CH₃· + Cl₂ → CH₃Cl + Cl·. Overall: $\ce{CH4 + Cl2 -> CH3Cl + HCl}$. The chain continues, and the chloromethane formed can itself react with chlorine atoms (substituting further H atoms), giving CH₂Cl₂, CHCl₃ and CCl₄ unless a large excess of methane is used.`,
  sol: 'Mechanism; overall equation; further substitution.',
  scheme: [['Initiation and two propagation steps', 1], ['Overall balanced equation', 1], ['Further substitution gives a mixture', 1]],
  d: 3, c: 'application', t: [5],
}));
add('sn1-short3', short({
  marks: 3,
  stem: r`Write the three steps of the SN1 hydrolysis of 2-bromo-2-methylpropane, (CH₃)₃CBr, with water, identify the rate-determining step and write the rate law.`,
  model: r`Step 1 (slow): $\ce{(CH3)3CBr -> (CH3)3C+ + Br-}$. Step 2 (fast): $\ce{(CH3)3C+ + H2O -> (CH3)3COH2+}$. Step 3 (fast): $\ce{(CH3)3COH2+ -> (CH3)3COH + H+}$. The slow ionisation of the C–Br bond, forming the carbocation, is rate-determining, so rate $= k[(\ce{CH3})_3\ce{CBr}]$ (first order).`,
  sol: 'Three steps; slow step; first-order rate law.',
  scheme: [['Three steps, balanced', 1.5], ['Step 1 identified as rate-determining', 0.5], ['Rate = k[RBr], first order', 1]],
  d: 3, c: 'application', t: [5],
}));
add('sn2-short3', short({
  marks: 3,
  stem: r`Describe the SN2 mechanism of iodoethane with hydroxide ion in aqueous ethanol: draw or describe the transition state, write the overall equation and give the rate law.`,
  model: r`The hydroxide ion attacks the carbon bonded to iodine from the side opposite to iodine; in the transition state the carbon is partly bonded to both HO and I (HO···CH₂(CH₃)···I with a negative charge shared), the new bond forming as the C–I bond breaks. Overall: $\ce{C2H5I + OH- -> C2H5OH + I-}$. The reaction occurs in one step and is second order: rate $= k[\ce{C2H5I}][\ce{OH-}]$.`,
  sol: 'Backside attack and transition state; equation; second-order rate law.',
  scheme: [['Backside attack with a transition state of partial bonds', 1], ['Overall balanced equation', 1], ['Rate = k[RI][OH⁻]', 1]],
  d: 3, c: 'application', t: [5],
}));
add('comparesn-short3', short({
  marks: 3,
  stem: 'Compare the SN1 and SN2 mechanisms in three respects: the order of the reaction, the stereochemical result for a chiral halide, and the type of alkyl halide that reacts fastest.',
  model: 'Order: SN1 is first order (rate = k[RX]); SN2 is second order (rate = k[RX][Nu]). Stereochemistry: SN1 goes through a planar carbocation attacked from either face, giving racemisation (a mixture of retention and inversion); SN2 gives inversion of configuration by backside attack. Reactivity: SN1 is fastest for tertiary halides (most stable carbocation); SN2 is fastest for methyl and primary halides (least hindered).',
  sol: 'Order; stereochemistry; reactivity.',
  scheme: [['First and second order with rate laws', 1], ['Racemisation and inversion', 1], ['3° for SN1 and methyl/1° for SN2', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('e1e2-short3', short({
  marks: 3,
  stem: 'Distinguish E1 from E2 elimination of an alkyl halide by the rate law, the number of steps with any intermediate, and the base normally needed.',
  model: 'E1: first order, rate = k[RX]; two steps, the slow ionisation to a carbocation intermediate followed by fast loss of a β-hydrogen; a weak base (such as the solvent) is enough; tertiary halides in a polar solvent. E2: second order, rate = k[RX][base]; a single concerted step in which the base removes the β-hydrogen as the leaving group departs, with no intermediate; a strong base (alcoholic KOH) is needed.',
  sol: 'Rate laws; steps and intermediate; base.',
  scheme: [['E1 first order, E2 second order', 1], ['Two steps with carbocation against one concerted step', 1], ['Weak base for E1, strong base for E2', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('sn-long', long({
  stem: '(a) Describe the SN2 mechanism of the reaction of bromoethane with hydroxide ions, showing the movement of electrons with curved arrows (describe them in words) and the transition state. [2]\n\n(b) Describe the SN1 mechanism of the hydrolysis of 2-bromo-2-methylpropane in three steps. [2]\n\n(c) Why does a tertiary halide favour SN1 while methyl bromide favours SN2? [1]',
  model: r`(a) The lone pair of HO⁻ attacks the carbon of CH₃CH₂Br from the side opposite to Br (arrow from the lone pair to carbon); at the same time the C–Br bond pair moves to Br (arrow to Br). The transition state has partial bonds, HO···C···Br, with the negative charge shared; Br⁻ leaves and the configuration is inverted. $\ce{C2H5Br + OH- -> C2H5OH + Br-}$, rate = k[RBr][OH⁻]. (b) Slow: $\ce{(CH3)3CBr -> (CH3)3C+ + Br-}$; fast: $\ce{(CH3)3C+ + H2O -> (CH3)3COH2+}$; fast: $\ce{(CH3)3COH2+ -> (CH3)3COH + H+}$. (c) A tertiary halide gives the most stable carbocation (hyperconjugation and +I effect) and is too crowded for backside attack; methyl bromide has no stabilising alkyl groups, so no stable cation, but it is unhindered for backside attack.`,
  sol: 'SN2 mechanism; SN1 mechanism; reason.',
  scheme: [['(a) backside attack and C–Br breaking with arrows', 1], ['(a) transition state, equation and rate law', 1], ['(b) three steps', 1.5], ['(b) slow step identified', 0.5], ['(c) cation stability against steric hindrance', 1]],
  d: 3, c: 'application', t: [5],
}));
add('elim-long', long({
  stem: '(a) Describe the E2 mechanism for the reaction of bromoethane with ethoxide ion in ethanol, saying what the base removes and what the electron movement is. [2]\n\n(b) Describe the E1 mechanism of 2-bromo-2-methylpropane in a polar solvent. [2]\n\n(c) State how the conditions are changed to favour substitution instead of elimination for bromoethane with KOH. [1]',
  model: r`(a) The ethoxide base takes a β-hydrogen from the CH₃ carbon; the C–H bond pair becomes the new π bond between the carbons and the C–Br bond pair leaves with Br, all in one step: $\ce{CH3CH2Br + C2H5O- -> CH2=CH2 + C2H5OH + Br-}$ (rate = k[RBr][base]). (b) Slow ionisation: $\ce{(CH3)3CBr -> (CH3)3C+ + Br-}$; then a weak base (the solvent) removes a β-hydrogen from a CH₃ group of the cation, and the electrons form the C=C bond: $\ce{(CH3)3C+ -> (CH3)2C=CH2 + H+}$ (rate = k[RBr]). (c) Use aqueous (not alcoholic) KOH at a lower temperature, so that OH⁻ acts as a nucleophile and ethanol is formed.`,
  sol: 'E2; E1; conditions.',
  scheme: [['(a) base removes β-H, bonds move in one step', 1], ['(a) equation and rate law', 1], ['(b) slow ionisation then loss of β-H', 1], ['(b) equation and first-order rate law', 1], ['(c) aqueous KOH favours substitution', 1]],
  d: 3, c: 'application', t: [5],
}));
add('radical-long', long({
  stem: '(a) Write the three stages of the free-radical chlorination of methane with equations (use a dot for the unpaired electron), stating what is formed in each. [3]\n\n(b) Why is the reaction a chain reaction? [1]\n\n(c) Why is a mixture of products obtained when methane is not in large excess? [1]',
  model: r`(a) Initiation: Cl₂ → 2Cl· (homolysis by light), forming chlorine atoms. Propagation: Cl· + CH₄ → CH₃· + HCl, then CH₃· + Cl₂ → CH₃Cl + Cl·, forming the product and regenerating Cl·. Termination: CH₃· + Cl· → CH₃Cl (also 2Cl· → Cl₂ or 2CH₃· → C₂H₆), in which radicals are used up. Overall: $\ce{CH4 + Cl2 -> CH3Cl + HCl}$. (b) Each propagation cycle regenerates a chlorine atom, which starts another cycle, so one photon can cause thousands of reactions. (c) CH₃Cl itself reacts with chlorine atoms, giving CH₂Cl₂, CHCl₃ and CCl₄.`,
  sol: 'Three stages; chain; mixture.',
  scheme: [['(a) initiation with equation', 1], ['(a) two propagation steps', 1], ['(a) termination step', 1], ['(b) radical regenerated in propagation', 1], ['(c) further substitution', 1]],
  d: 3, c: 'application', t: [5],
}));
