// ch20 question bank, part 2: t04 electron displacement effects (inductive, electromeric, mesomeric, hyperconjugation).
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, num, short, long } = mk;
// Standard textbook pKa values at 298 K (given in the stems that use them)
const PKA = { acetic: 4.76, chloro: 2.86, dichloro: 1.29, trichloro: 0.65 };
const Ka = (pka) => 10 ** -pka;

add('indu-mcq', mcq({
  stem: 'A teacher asks which alkyl group attached to a carbon centre exerts the greatest electron-releasing (+I) effect. The answer is:',
  right: '(CH₃)₃C–',
  wrong: ['CH₃–', 'CH₃CH₂–', '(CH₃)₂CH–'],
  sol: 'The +I effect rises with the number of alkyl groups on the carbon bonded to the centre, so tert-butyl, (CH₃)₃C–, is the strongest — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('acid-mcq', mcq({
  stem: 'A pharmacy student compares four 0.1 mol L⁻¹ acids at the same temperature: ethanoic, chloroethanoic, bromoethanoic and fluoroethanoic acid. The strongest acid among them is:',
  right: 'fluoroethanoic acid, FCH₂COOH',
  wrong: ['ethanoic acid, CH₃COOH', 'chloroethanoic acid, ClCH₂COOH', 'bromoethanoic acid, BrCH₂COOH'],
  sol: 'Fluorine, the most electronegative halogen, has the strongest −I effect, which stabilises the carboxylate ion most and makes the acid strongest — option (@K). Ethanoic acid has no electron-withdrawing group and is the weakest (@1).',
  d: 2, c: 'application', t: [4],
}));
add('meso-mcq', mcq({
  stem: 'A student drawing resonance structures lists substituents on a benzene ring. Which of these shows a −M (electron-withdrawing mesomeric) effect?',
  right: '–NO₂',
  wrong: ['–OH', '–NH₂', '–OCH₃'],
  sol: 'The nitro group pulls π electrons out of the ring (−M). –OH, –NH₂ and –OCH₃ have lone pairs that they donate into the ring (+M) — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('hypercount-mcq', mcq({
  stem: 'In an alkene study, the number of α C–H bonds that can take part in hyperconjugation in 2-methylbut-2-ene, (CH₃)₂C=CHCH₃, is:',
  right: '9',
  wrong: ['3', '6', '12'],
  sol: 'The α carbons are the three methyl groups attached to the doubly bonded carbons: two on C-2 (6 C–H bonds) and one on C-3 (3 C–H bonds), giving 9 — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('electromeric-mcq', mcq({
  stem: 'The electromeric effect, seen in a C=O group, operates:',
  right: 'only while an attacking reagent is present, and ends when the reagent is removed',
  wrong: ['permanently, in the ground state of the molecule', 'only in saturated compounds', 'through σ bonds, falling off with distance'],
  sol: 'The complete shift of the π electron pair to one atom is brought about by the attacking reagent and is temporary — option (@K). A permanent effect (@1) belongs to the mesomeric or inductive effect; the inductive effect (@3) acts through σ bonds.',
  d: 2, c: 'understanding', t: [4],
}));
add('inductive-ar', ar({
  a: 'The inductive effect is a permanent effect that operates through σ bonds.',
  r: 'The inductive effect is transmitted equally to all the carbon atoms of a chain, whatever their distance from the substituent.',
  key: 'c',
  sol: 'A is true: the polarisation of σ bonds by an electronegative atom or group is permanent. R is false: the effect falls off rapidly with distance and is felt mainly by the nearest one to three carbons — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
{
  const ratio = Ka(PKA.chloro) / Ka(PKA.acetic);
  add('karatio-num', num({
    stem: `At 298 K, the pKa of ethanoic acid is ${PKA.acetic.toFixed(2)} and that of chloroethanoic acid is ${PKA.chloro.toFixed(2)} (both given). How many times larger is the acid dissociation constant of chloroethanoic acid than that of ethanoic acid?`,
    value: 79, tol: 1, unit: null,
    sol: r`$\dfrac{K_a(\ce{ClCH2COOH})}{K_a(\ce{CH3COOH})} = 10^{\,pK_a(\text{ethanoic}) - pK_a(\text{chloro})} = 10^{\,${PKA.acetic.toFixed(2)} - ${PKA.chloro.toFixed(2)}} = 10^{1.90} = ${ratio.toFixed(1)} \approx 79$. The −I effect of chlorine makes the acid about 79 times stronger.`,
    scheme: [['Uses the difference of pKa values as an exponent of 10', 0.5], ['79', 0.5]],
    d: 3, c: 'application', t: [4],
  }), () => near(ratio, 79.43, 0.001) || 'kaRatio');
}
{
  const ka = Ka(PKA.trichloro);
  add('kapka-num', num({
    stem: `The pKa of trichloroethanoic acid is ${PKA.trichloro.toFixed(2)} at 298 K (given). Calculate its acid dissociation constant Ka, in mol L⁻¹.`,
    value: 0.22, tol: 0.005, unit: 'mol L⁻¹',
    sol: r`$K_a = 10^{-pK_a} = 10^{-${PKA.trichloro.toFixed(2)}} = ${ka.toFixed(3)} \approx 0.22\ \text{mol L}^{-1}$.`,
    scheme: [['Ka = 10 to the power −pKa', 0.5], ['0.22 mol L⁻¹', 0.5]],
    d: 2, c: 'understanding', t: [4],
  }), () => near(ka, 0.2239, 0.001) || 'kapka');
}
add('inductive-short', short({
  marks: 2,
  stem: 'Explain what is meant by the +I and −I effects, naming two groups that show each.',
  model: 'The inductive effect is the permanent polarisation of a σ bond (and of the σ bonds beyond it) caused by the difference in electronegativity between the bonded atoms. A group that pushes electrons towards the carbon chain shows +I (alkyl groups such as –CH₃ and –C₂H₅). A group that pulls electrons away shows −I (–NO₂ and –Cl; also –F, –CN, –COOH).',
  sol: 'Definition; two +I and two −I groups.',
  scheme: [['Definition: permanent polarisation transmitted through σ bonds', 1], ['Two +I and two −I groups', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('hyper-short', short({
  marks: 2,
  stem: 'What is hyperconjugation? Illustrate it with the ethyl cation, CH₃CH₂⁺, and state how many α C–H bonds are available in the isopropyl cation.',
  model: 'Hyperconjugation (no-bond resonance) is the delocalisation of the σ electrons of a C–H bond next to a positive carbon, an unsaturated carbon or a radical centre, into the empty or π orbital. In CH₃CH₂⁺ the three C–H bonds of the CH₃ group overlap the empty p orbital on the CH₂⁺ carbon, giving structures such as H⁺ CH₂=CH₂ and spreading the charge. The isopropyl cation has six α C–H bonds.',
  sol: 'Definition; ethyl cation; six.',
  scheme: [['Definition as σ electron delocalisation', 1], ['Ethyl cation example and six α C–H bonds in (CH₃)₂CH⁺', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('acid-short3', short({
  marks: 3,
  stem: 'The pKa values at 298 K are 4.76 for CH₃COOH, 2.86 for ClCH₂COOH and 0.65 for Cl₃CCOOH (given). Arrange the acids in order of increasing strength, explain the trend using the inductive effect, and say how FCH₂COOH is expected to compare with ClCH₂COOH.',
  model: 'Order of increasing strength: CH₃COOH < ClCH₂COOH < Cl₃CCOOH (a smaller pKa means a stronger acid). Chlorine is electronegative and shows a −I effect, pulling electrons through the σ bonds away from the carboxylate group; this disperses the negative charge on the carboxylate ion and stabilises it, so the acid loses H⁺ more readily, and the more chlorine atoms, the stronger the pull. Fluorine is more electronegative than chlorine, so FCH₂COOH is expected to be a stronger acid than ClCH₂COOH.',
  sol: 'Order; −I effect and charge dispersal; fluorine stronger.',
  scheme: [['Correct order using pKa', 1], ['−I effect stabilises the carboxylate ion; more Cl, stronger', 1], ['FCH₂COOH stronger than ClCH₂COOH', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('meso-short3', short({
  marks: 3,
  stem: 'Explain the mesomeric effect, with the +M effect of –NH₂ on aniline and the −M effect of –NO₂ on nitrobenzene, and say whether the electron density of the ring at the ortho and para positions rises or falls in each.',
  model: 'The mesomeric (resonance) effect is the permanent transfer of π or lone-pair electrons between a substituent and the ring (or a conjugated system), shown by resonance structures. In aniline the lone pair on nitrogen moves into the ring (+M), placing negative charge at the ortho and para positions, so their electron density rises. In nitrobenzene the nitro group pulls π electrons from the ring towards oxygen (−M), placing positive charge at the ortho and para positions, so their electron density falls.',
  sol: 'Definition; +M with aniline; −M with nitrobenzene.',
  scheme: [['Definition of the mesomeric effect', 1], ['+M in aniline: density rises at ortho and para', 1], ['−M in nitrobenzene: density falls at ortho and para', 1]],
  d: 3, c: 'application', t: [4],
}));
add('effects-long', long({
  stem: '(a) Define the inductive effect and arrange CH₃COOH, ClCH₂COOH and Cl₂CHCOOH in order of increasing acid strength, giving the reason. [2]\n\n(b) Write two resonance structures of the ethanoate ion, CH₃COO⁻, and say what they show about the two C–O bonds. [1]\n\n(c) Use hyperconjugation to explain why the tert-butyl cation is more stable than the isopropyl cation. [2]',
  model: '(a) The inductive effect is the permanent polarisation of σ bonds by atoms or groups of different electronegativity. Order of increasing acid strength: CH₃COOH < ClCH₂COOH < Cl₂CHCOOH; each chlorine atom withdraws electrons (−I) and stabilises the carboxylate ion more. (b) CH₃–C(=O)–O⁻ ↔ CH₃–C(–O⁻)=O; the two C–O bonds are identical in length and the negative charge is shared equally between the two oxygens (a resonance hybrid). (c) The tert-butyl cation has nine α C–H bonds and the isopropyl cation six; each C–H σ bond can overlap the empty p orbital on the positive carbon (no-bond resonance), so more hyperconjugative structures spread the charge further in the tert-butyl cation and make it more stable.',
  sol: 'Inductive effect and order; resonance structures; hyperconjugation counts.',
  scheme: [['(a) definition', 1], ['(a) correct order with −I reason', 1], ['(b) two structures and equal C–O bonds', 1], ['(c) nine against six α C–H bonds', 1], ['(c) charge spread by no-bond resonance, so more stable', 1]],
  d: 3, c: 'application', t: [4],
}));
