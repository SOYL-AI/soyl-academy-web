// ch10 s- and p-Block Elements — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Numbers are computed here, interpolated into stems and solutions, and re-solved by the checks passed to add().
import { mk, add, r, dec, near } from './lib.mjs';
import { DATA } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const D = DATA;
const rn = (x, p = 100) => Math.round(x * p) / p;

// ---------------------------------------------------------------- check-slide MCQs (not used in either test)
add('chk-ie', mcq({
  stem: 'Among lithium, sodium, potassium and caesium, the metal with the lowest first ionisation enthalpy is:',
  right: 'Caesium',
  wrong: ['Lithium', 'Sodium', 'Potassium'],
  sol: 'Caesium has the largest atom and the most shielded outer electron, so IE₁ (376 kJ mol⁻¹) is lowest — option (@K).',
  d: 1, c: 'recall', t: [1],
}), () => D.g1.ie1.indexOf(Math.min(...D.g1.ie1)) === 4 || 'min ie');
add('chk-hyd', mcq({
  stem: 'Which of these ions is hydrated most strongly in water?',
  right: r`$\ce{Li+}$`,
  wrong: [r`$\ce{Na+}$`, r`$\ce{K+}$`, r`$\ce{Cs+}$`],
  sol: 'Li⁺ is the smallest, so its charge density is highest and it releases the most energy on hydration (−506 kJ mol⁻¹) — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-diag', mcq({
  stem: 'A property that lithium shares with magnesium but not with the other alkali metals is that it:',
  right: 'forms a nitride directly with nitrogen',
  wrong: ['forms a superoxide on burning in air', 'gives a golden yellow flame', 'has a very large second ionisation enthalpy'],
  sol: r`Li and Mg both react with $\ce{N2}$ to give $\ce{Li3N}$ and $\ce{Mg3N2}$; this is the diagonal relationship — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}));
add('chk-ga', mcq({
  stem: 'Gallium has a smaller atomic radius than aluminium mainly because:',
  right: 'the ten 3d electrons shield the nuclear charge poorly',
  wrong: ['gallium has fewer electron shells', 'gallium has a lower nuclear charge', 'gallium has a larger ionisation enthalpy than boron'],
  sol: 'After the 3d series the nuclear charge increases by ten units but the 3d electrons screen it badly, so the outer electrons are drawn in — option (@K).',
  d: 2, c: 'understanding', t: [1],
}), () => D.g13.rAtom[2] < D.g13.rAtom[1] || 'Ga<Al');
add('chk-cat', mcq({
  stem: 'Carbon shows far more catenation than silicon because:',
  right: 'the C–C bond is much stronger than the Si–Si bond',
  wrong: ['carbon has vacant d orbitals', 'carbon is a metal', 'silicon is more electronegative than carbon'],
  sol: 'C–C is 348 kJ mol⁻¹ against 297 for Si–Si, and C–H and C–O bonds are also strong, so carbon chains are stable — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-allo', mcq({
  stem: 'The allotrope of carbon in which every atom is sp² hybridised and lies in flat hexagonal layers is:',
  right: 'graphite',
  wrong: ['diamond', 'fullerene, C₆₀', 'carbon monoxide'],
  sol: 'Graphite has sp² carbons in layers (fullerene is a cage, diamond is sp³, and CO is a compound, not an allotrope) — option (@K).',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- MCQs
add('m-ie2', mcq({
  stem: 'A chemist lists the first three ionisation enthalpies (kJ mol⁻¹) of two s-block elements: X 738, 1451, 7733 and Y 496, 4562, 6910. The most probable oxidation states of X and Y in their compounds are, respectively:',
  right: '+2 and +1',
  wrong: ['+1 and +2', '+3 and +1', '+2 and +2'],
  sol: 'For X the large jump comes after the second value (1451 to 7733), so two electrons are removed: +2. For Y the jump comes after the first (496 to 4562): +1 — option (@K).',
  d: 3, c: 'analysis', t: [1],
}), () => 7733 / 1451 > 5 && 4562 / 496 > 5 && 1451 / 738 < 3 || 'ie jump');
add('m-flame', mcq({
  stem: 'A chloride salt gives an apple-green flame. Dilute sulfuric acid added to its solution gives a white precipitate that does not dissolve in dilute hydrochloric acid. The cation present is:',
  right: r`$\ce{Ba^2+}$`,
  wrong: [r`$\ce{Ca^2+}$`, r`$\ce{Sr^2+}$`, r`$\ce{K+}$`],
  sol: 'Apple green is the flame colour of barium; calcium is brick red, strontium crimson and potassium violet. Barium sulfate is insoluble in acid — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('m-linitrate', mcq({
  stem: 'Samples of lithium nitrate and sodium nitrate are heated strongly in two separate dry tubes. A brown gas is seen:',
  right: 'only in the tube containing lithium nitrate',
  wrong: ['only in the tube containing sodium nitrate', 'in both tubes', 'in neither tube'],
  sol: r`$\ce{4LiNO3 -> 2Li2O + 4NO2 + O2}$ liberates brown $\ce{NO2}$; $\ce{2NaNO3 -> 2NaNO2 + O2}$ gives only colourless oxygen — option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('m-mobility', mcq({
  stem: 'Which arrangement correctly shows the alkali metal ions in order of increasing ionic mobility in aqueous solution?',
  right: r`$\ce{Li+} < \ce{Na+} < \ce{K+} < \ce{Rb+} < \ce{Cs+}$`,
  wrong: [r`$\ce{Cs+} < \ce{Rb+} < \ce{K+} < \ce{Na+} < \ce{Li+}$`, r`$\ce{Na+} < \ce{Li+} < \ce{K+} < \ce{Cs+} < \ce{Rb+}$`, r`$\ce{K+} < \ce{Na+} < \ce{Li+} < \ce{Rb+} < \ce{Cs+}$`],
  sol: 'The smallest ion, Li⁺, is the most heavily hydrated, so the hydrated ion is largest and moves most slowly; the hydration shell shrinks steadily to Cs⁺ — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('m-be-oh', mcq({
  stem: 'Beryllium hydroxide dissolves in dilute hydrochloric acid and also in aqueous sodium hydroxide, whereas magnesium hydroxide dissolves only in the acid. This shows that beryllium hydroxide is:',
  right: 'amphoteric',
  wrong: ['strongly basic', 'strongly acidic', 'neutral'],
  sol: r`It reacts with acid and with alkali, $\ce{Be(OH)2 + 2OH- -> Be(OH)4^2-}$, which is amphoteric behaviour; magnesium hydroxide is basic — option (@K).`,
  d: 1, c: 'understanding', t: [1],
}));
add('m-tl', mcq({
  stem: 'Thallium(III) chloride is unstable and changes readily to thallium(I) chloride. The most appropriate explanation is the:',
  right: 'inert pair effect',
  wrong: ['diagonal relationship with lead', 'catenation tendency of thallium', 'small size of the thallium atom'],
  sol: 'The 6s² pair of thallium is held tightly and is reluctant to bond, so Tl(I) is the stable state — the inert pair effect — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('m-bf4', mcq({
  stem: 'Boron forms the tetrahedral ion BF₄⁻ but not BF₆³⁻, whereas aluminium readily forms AlF₆³⁻. The reason is that boron:',
  right: 'has no d orbitals, so its covalency cannot exceed 4',
  wrong: ['is much larger than aluminium', 'is more electropositive than aluminium', 'has a lower first ionisation enthalpy than aluminium'],
  sol: 'Boron has only 2s and 2p orbitals in its valence shell (four orbitals); aluminium can use 3d orbitals and reach covalency six — option (@K). Boron is smaller and has the higher IE₁, so (@1), (@2) and (@3) are wrong.',
  d: 2, c: 'application', t: [1],
}));
add('m-pbo2', mcq({
  stem: 'Lead(IV) oxide is warmed with concentrated hydrochloric acid. The gas evolved is:',
  right: 'chlorine',
  wrong: ['hydrogen', 'oxygen', 'hydrogen chloride only'],
  sol: r`Pb(IV) is reduced to the stable Pb(II) while chloride is oxidised: $\ce{PbO2 + 4HCl -> PbCl2 + Cl2 + 2H2O}$ — option (@K).`,
  d: 2, c: 'application', t: [1],
}));
add('m-sncl2', mcq({
  stem: 'Tin(II) chloride solution is added to mercury(II) chloride solution. A white silky precipitate forms and then turns grey with excess tin(II) chloride. This demonstrates that Sn(II) acts as:',
  right: 'a reducing agent',
  wrong: ['an oxidising agent', 'a dehydrating agent', 'a precipitating agent only, without electron transfer'],
  sol: r`$\ce{SnCl2 + 2HgCl2 -> SnCl4 + Hg2Cl2}$ (white); with excess Sn(II) the Hg(I) chloride is reduced further to grey mercury. Sn(II) is oxidised to Sn(IV), so it is a reducing agent — option (@K).`,
  d: 3, c: 'application', t: [1],
}));
add('m-graphite', mcq({
  stem: 'A bulb glows when a graphite rod is connected in a circuit but not when a diamond is used. In graphite, the electrical conduction arises because:',
  right: 'one electron per carbon atom is delocalised over the sp² layer',
  wrong: ['every carbon atom is sp³ hybridised', 'the layers are held together by ionic bonds', 'carbon atoms in graphite carry positive charge'],
  sol: 'Each carbon of graphite uses three electrons for σ bonds and one for a delocalised π system that is free to move along the layers. Diamond has all four electrons localised in σ bonds — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('m-anom-c', mcq({
  stem: 'Which of the following is NOT a reason for the anomalous behaviour of carbon in group 14?',
  right: 'Its large atomic size compared with silicon',
  wrong: ['Its small atomic size', 'The absence of d orbitals in its valence shell', 'Its ability to form pπ–pπ multiple bonds'],
  sol: 'Carbon is the smallest atom of the group; its anomalies come from small size, no d orbitals (covalency 4) and pπ–pπ bonding. A large size would be false — option (@K).',
  d: 2, c: 'evaluation', t: [1],
}));
add('m-diag-id', mcq({
  stem: 'A silvery metal dissolves in aqueous sodium hydroxide with evolution of hydrogen, forms a covalent chloride, has an oxide that dissolves in both acids and bases, and is made passive by concentrated nitric acid. The pair of elements that shows all of these properties is:',
  right: 'beryllium and aluminium',
  wrong: ['lithium and magnesium', 'magnesium and calcium', 'sodium and potassium'],
  sol: 'These are the shared properties of the Be–Al diagonal pair — option (@K). Li, Mg, Ca, Na and K have basic oxides and are not attacked by alkali.',
  d: 3, c: 'analysis', t: [1],
}));
add('m-ered', mcq({
  stem: 'The standard electrode potentials of three alkali metals are Li⁺/Li −3.05 V, Na⁺/Na −2.71 V and K⁺/K −2.93 V. Their reducing power in aqueous solution decreases in the order:',
  right: 'Li > K > Na',
  wrong: ['K > Na > Li', 'Li > Na > K', 'Na > K > Li'],
  sol: 'The more negative the electrode potential, the stronger the reducing agent: −3.05 (Li) < −2.93 (K) < −2.71 (Na) — option (@K). Lithium leads because of its very high hydration enthalpy.',
  d: 2, c: 'application', t: [1],
}), () => -3.05 < -2.93 && -2.93 < -2.71 || 'order');
add('m-6s6p', mcq({
  stem: 'An element has the outer configuration 6s² 6p¹. Which statement about it is correct?',
  right: 'Its +1 oxidation state is more stable than +3',
  wrong: ['Its +3 state is more stable than +1', 'It forms only covalent compounds, as boron does', 'Its maximum covalency is 4 because it lacks d orbitals'],
  sol: 'The element is thallium (group 13, period 6). The inert pair effect makes Tl(I) more stable than Tl(III) — option (@K). It has many orbitals (not limited to covalency 4) and its compounds can be ionic.',
  d: 2, c: 'application', t: [1],
}));
add('m-sio2', mcq({
  stem: 'Silicon dioxide is a hard, high-melting solid but carbon dioxide is a gas. The best explanation is that:',
  right: 'carbon forms C=O double bonds in small molecules, whereas silicon forms only Si–O single bonds in a giant network',
  wrong: ['silicon dioxide is an ionic compound', 'silicon is more electronegative than carbon', 'carbon dioxide molecules attract each other more strongly than silicon dioxide units'],
  sol: 'Efficient pπ–pπ overlap lets C form discrete O=C=O molecules, but the larger Si cannot, so each Si bonds to four O atoms by single bonds in a three-dimensional network — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
{
  const q = (c, rad) => c / rad;
  const cands = { 'Mg²⁺ (72 pm)': q(2, 72), 'Li⁺ (76 pm)': q(1, 76), 'Na⁺ (102 pm)': q(1, 102), 'Al³⁺ (53.5 pm)': q(3, 53.5) };
  const be = q(2, 31);
  const best = Object.entries(cands).sort((a, b) => Math.abs(a[1] - be) - Math.abs(b[1] - be))[0][0];
  add('m-chargeradius', mcq({
    stem: 'The charge-to-radius ratio of Be²⁺ (radius 31 pm) is closest to that of which of the following ions?',
    right: 'Al³⁺ (53.5 pm)',
    wrong: ['Mg²⁺ (72 pm)', 'Li⁺ (76 pm)', 'Na⁺ (102 pm)'],
    sol: `Charge per radius (e per pm): Be²⁺ 2/31 = ${dec(be, 3)}; Al³⁺ 3/53.5 = ${dec(cands['Al³⁺ (53.5 pm)'], 3)}; Mg²⁺ 2/72 = ${dec(cands['Mg²⁺ (72 pm)'], 3)}; Li⁺ 1/76 = ${dec(cands['Li⁺ (76 pm)'], 3)}; Na⁺ 1/102 = ${dec(cands['Na⁺ (102 pm)'], 3)}. Al³⁺ is the nearest — option (@K).`,
    d: 4, c: 'analysis', t: [1],
  }), () => best === 'Al³⁺ (53.5 pm)' || best);
}
add('m-c60', mcq({
  stem: 'A C₆₀ fullerene molecule is a closed cage built of:',
  right: '20 six-membered rings and 12 five-membered rings',
  wrong: ['12 six-membered rings and 20 five-membered rings', '30 six-membered rings and 12 five-membered rings', '20 six-membered rings and 20 five-membered rings'],
  sol: 'Buckminsterfullerene has 32 faces: 20 hexagons and 12 pentagons (60 vertices) — option (@K).',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- assertion-reason
add('ar-li-eo', ar({
  a: 'Lithium has the most negative standard electrode potential of the alkali metals.',
  r: 'The hydration enthalpy of the Li⁺ ion is the most negative in the group.',
  key: 'a',
  sol: 'Both are true. The very small Li⁺ ion is hydrated so strongly that the energy released outweighs the high IE₁ and sublimation enthalpy of lithium, giving E° = −3.05 V; R explains A — option (a).',
  d: 3, c: 'understanding', t: [1],
}));
add('ar-flame', ar({
  a: 'The first ionisation enthalpy falls from lithium to caesium.',
  r: 'Salts of the alkali metals give characteristic colours in a flame.',
  key: 'b',
  sol: 'Both statements are true, but R does not explain A: the fall in IE₁ is due to increasing size and shielding, whereas flame colours come from the emission of light by excited electrons — option (b).',
  d: 2, c: 'analysis', t: [1],
}));
add('ar-bcl3', ar({
  a: 'Boron trichloride behaves as a Lewis acid.',
  r: 'In BCl₃ the boron atom is surrounded by a complete octet of electrons.',
  key: 'c',
  sol: 'A is true, R is false: boron has only six electrons around it in BCl₃ (an incomplete octet), which is why it accepts a lone pair — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-ccl4', ar({
  a: 'Carbon tetrachloride is hydrolysed by water in the same way as silicon tetrachloride.',
  r: 'Silicon has vacant 3d orbitals that can accept a lone pair from water, but carbon has none.',
  key: 'd',
  sol: 'A is false: CCl₄ is not hydrolysed. R is true and explains why SiCl₄ alone reacts with water — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('ar-cat', ar({
  a: 'Silicon forms much shorter chains than carbon.',
  r: 'The Si–Si single bond is weaker than the C–C single bond.',
  key: 'a',
  sol: 'Both are true; the weaker Si–Si bond (297 against 348 kJ mol⁻¹) and the weaker bonds to H and O make long silicon chains unstable, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-ga', ar({
  a: 'The first ionisation enthalpy of gallium is slightly higher than that of aluminium.',
  r: 'The atomic radius of gallium is larger than that of aluminium.',
  key: 'c',
  sol: 'A is true (579 and 577 kJ mol⁻¹). R is false: Ga (135 pm) is smaller than Al (143 pm) because of the poor shielding by the 3d electrons — option (c).',
  d: 4, c: 'analysis', t: [1],
}), () => D.g13.ie1[2] > D.g13.ie1[1] && D.g13.rAtom[2] < D.g13.rAtom[1] || 'ga al');

// ---------------------------------------------------------------- true-false
add('tf-be-flame', tf({
  stem: 'Beryllium, like calcium, imparts a characteristic colour to a Bunsen flame.',
  key: 'f',
  sol: 'False. The small Be atom holds its valence electrons too tightly for them to be excited in a Bunsen flame, so beryllium gives no colour (calcium gives brick red).',
  d: 1, c: 'recall', t: [1],
}));
add('tf-pb', tf({
  stem: 'Because of the inert pair effect, lead forms more stable compounds in the +2 state than in the +4 state.',
  key: 't',
  sol: 'True. The 6s² pair is reluctant to bond, so Pb(II) is the stable state and Pb(IV) compounds such as PbO₂ are strong oxidising agents.',
  d: 1, c: 'understanding', t: [1],
}));
add('tf-graphite', tf({
  stem: 'Graphite is a poor conductor of electricity because it has no mobile electrons.',
  key: 'f',
  sol: 'False. Graphite conducts along its layers because one electron per carbon atom is delocalised over the sp² layer.',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- fill in the blank
add('fill-li', fill({
  stem: 'Among the alkali metal ions, the one with the most negative hydration enthalpy is ___.',
  acc: [['Li⁺', 'Li+', 'lithium', 'lithium ion']],
  sol: 'The **lithium** ion, Li⁺, because it is the smallest and has the highest charge density.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-b', fill({
  stem: 'The maximum covalency of boron is ___.',
  acc: [['4', 'four']],
  sol: 'Boron has no d orbitals, so its maximum covalency is **four** (4), as in BF₄⁻.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-pent', fill({
  stem: 'A C₆₀ fullerene molecule contains ___ five-membered rings.',
  acc: [['12', 'twelve']],
  sol: 'There are **12** pentagons (and 20 hexagons).',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- match
add('match-flame', match({
  stem: 'Match each chloride in Column I with the colour it gives to a flame in Column II.',
  pairs: [
    ['Barium chloride', 'Apple green'],
    ['Potassium chloride', 'Violet'],
    ['Calcium chloride', 'Brick red'],
    ['Caesium chloride', 'Blue'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Barium gives apple green, potassium violet, calcium brick red and caesium blue.',
  d: 1, c: 'recall', t: [1],
}));
add('match-first', match({
  stem: 'Match each first member of a group in Column I with its unusual behaviour in Column II.',
  pairs: [
    ['Lithium', 'Forms the only alkali metal nitride, Li₃N'],
    ['Beryllium', 'Has a covalent chloride and a hydroxide that dissolves in excess alkali'],
    ['Boron', 'Trichloride has only six electrons around the central atom (Lewis acid)'],
    ['Carbon', 'Forms stable pπ–pπ multiple bonds and unlimited chains'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Li reacts with nitrogen; Be(OH)₂ is amphoteric and BeCl₂ covalent; BCl₃ is electron-deficient; carbon forms multiple bonds and long chains.',
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- numericals
{
  const ie = D.g13.ie1[1] + D.g13.ie2[1] + D.g13.ie3[1];
  const n = 2.7 / 27;
  const E = n * ie;
  add('num-al', num({
    stem: 'The first three ionisation enthalpies of aluminium are 577, 1816 and 2744 kJ mol⁻¹. How much energy, in kJ, is needed to convert 2.7 g of aluminium vapour (gaseous atoms) completely into gaseous Al³⁺ ions? (Al = 27 g mol⁻¹)',
    value: rn(E, 10), tol: 0.5, unit: 'kJ',
    sol: String.raw`$577 + 1816 + 2744 = ${ie}$ kJ per mole of Al³⁺. Moles of Al: $2.7 \div 27 = ${dec(n, 2)}$ mol. Energy $= ${dec(n, 2)} \times ${ie} = ${dec(E, 4)}$ kJ.`,
    scheme: [['Sum of three ionisation enthalpies = 5137 kJ mol⁻¹', 0.5], ['Moles 0.10 and energy 513.7 kJ', 0.5]],
    d: 2, c: 'application', t: [1],
  }), () => near(E, 513.7) && ie === 5137 || 'al energy');
}
{
  const d2 = 0.5 * (Math.abs(D.g1.hyd[0]) - Math.abs(D.g1.hyd[4]));
  add('num-hyd', num({
    stem: 'In a thought experiment, 0.50 mol of gaseous Li⁺ ions and 0.50 mol of gaseous Cs⁺ ions are dissolved separately in large volumes of water. The hydration enthalpies are −506 kJ mol⁻¹ for Li⁺ and −276 kJ mol⁻¹ for Cs⁺. How many kilojoules more heat is released by the lithium ions?',
    value: d2, tol: 0.5, unit: 'kJ',
    sol: String.raw`Heat from Li⁺: $0.50 \times 506 = 253$ kJ. Heat from Cs⁺: $0.50 \times 276 = 138$ kJ. Difference $= 253 - 138 = 115$ kJ more for lithium.`,
    scheme: [['253 kJ and 138 kJ', 0.5], ['Difference 115 kJ', 0.5]],
    d: 2, c: 'application', t: [1],
  }), () => near(0.5 * 506 - 0.5 * 276, 115) || 'hyd diff');
}
{
  const cr = 2 / 0.072;
  add('num-cr', num({
    stem: 'The ionic radius of Mg²⁺ is 72 pm. Calculate its charge-to-radius ratio, in units of electronic charge per nanometre (e nm⁻¹). (1 nm = 1000 pm)',
    value: rn(cr, 10), tol: 0.2, unit: 'e nm⁻¹',
    sol: String.raw`The radius is 0.072 nm (72 pm ÷ 1000). Ratio $= 2 \div 0.072 = ${dec(cr, 3)}$ e per nm.`,
    scheme: [['Converts 72 pm to 0.072 nm', 0.5], ['Ratio = 27.8 e nm⁻¹', 0.5]],
    d: 1, c: 'application', t: [1],
  }), () => near(cr, 27.78, 0.005) || 'cr');
}
{
  const pct = ((186 - 102) / 186) * 100;
  add('num-pct', num({
    stem: 'The metallic radius of the sodium atom is 186 pm and the radius of the Na⁺ ion is 102 pm. By what percentage is the radius reduced when the atom forms the ion?',
    value: rn(pct, 10), tol: 0.2, unit: '%',
    sol: String.raw`Reduction $= 186 - 102 = 84$ pm. Percentage $= 84 \div 186 \times 100 = ${dec(pct, 3)}$ %.`,
    scheme: [['Reduction 84 pm', 0.5], ['45.2 %', 0.5]],
    d: 2, c: 'application', t: [1],
  }), () => near(pct, 45.16, 0.005) || 'pct');
}

// ---------------------------------------------------------------- short answer, 2 marks
add('s2-flame', short({
  marks: 2,
  stem: 'A student holds magnesium chloride and then strontium chloride on a clean platinum wire in a Bunsen flame. Predict what is seen in each case and give a reason for the difference.',
  model: 'Magnesium chloride gives no characteristic colour, whereas strontium chloride gives a crimson flame. Strontium is a large atom with a low ionisation enthalpy, so the flame excites its outer electron, which emits visible light on returning. The small magnesium atom holds its electrons too tightly for excitation.',
  sol: 'No colour for Mg; crimson for Sr; excitation depends on ionisation enthalpy and size.',
  scheme: [['Mg none, Sr crimson', 1], ['Excitation easier for the large, low-IE atom', 1]],
  d: 3, c: 'application', t: [1],
}));
add('s2-oxide', short({
  marks: 2,
  stem: 'Name the oxide formed when lithium, sodium and potassium each burn in excess air, and say why lithium is different from the other two.',
  model: 'Lithium forms the normal oxide Li₂O, sodium the peroxide Na₂O₂ and potassium the superoxide KO₂. The very small Li⁺ ion is stabilised only by the small oxide ion in the lattice and cannot stabilise the large peroxide or superoxide ions.',
  sol: 'Li₂O, Na₂O₂, KO₂; size match of cation and anion.',
  scheme: [['Three products named', 1], ['Small Li⁺ stabilises only the small O²⁻', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-ie2', short({
  marks: 2,
  stem: 'Sodium has a lower first ionisation enthalpy than magnesium, yet magnesium readily forms a +2 ion while sodium never forms a +2 ion. Explain using the second ionisation enthalpies, 4562 and 1450 kJ mol⁻¹ respectively.',
  model: 'Once sodium loses one electron it has the stable neon core, so a second electron has to be pulled from this filled inner shell, which costs 4562 kJ per mole. In magnesium the second electron is simply the other 3s electron and costs only 1450 kJ per mole.',
  sol: 'IE₂ of Na is from the core; for Mg it is the second valence electron.',
  scheme: [['Na: second electron from the noble-gas core, very high IE₂', 1], ['Mg: second electron is a valence electron, moderate IE₂', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('s2-be-alk', short({
  marks: 2,
  stem: 'Write the balanced equation for the action of aqueous sodium hydroxide on beryllium metal and name the property of beryllium that this reaction shows.',
  model: r`$\ce{Be + 2OH- + 2H2O -> Be(OH)4^2- + H2}$. The metal dissolves to give the beryllate ion and hydrogen. Because beryllium and its hydroxide react with acids as well as with alkali, they are amphoteric, a property shared with aluminium.`,
  sol: 'Beryllate and hydrogen formed; amphoteric.',
  scheme: [['Balanced equation', 1], ['Amphoteric, like aluminium', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s2-inert', short({
  marks: 2,
  stem: 'Define the inert pair effect. Give one example each from group 13 and group 14.',
  model: 'It is the reluctance of the ns² electrons of the heavier p-block elements to take part in bonding, because they are poorly shielded and held tightly by the nucleus. Hence Tl(I) is more stable than Tl(III) in group 13, and Pb(II) is more stable than Pb(IV) in group 14.',
  sol: 'Definition and two examples.',
  scheme: [['Definition', 1], ['Tl(I) and Pb(II) examples', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('s2-bcl3', short({
  marks: 2,
  stem: 'Boron trichloride combines readily with ammonia. Explain this in terms of the electronic structure of boron and name the type of compound BCl₃ is.',
  model: 'Boron in BCl₃ has only six electrons in its valence shell, so one orbital is vacant. Ammonia donates its lone pair into this orbital and a coordinate bond forms. BCl₃ is therefore an electron-deficient compound and acts as a Lewis acid.',
  sol: 'Incomplete octet, coordinate bond, Lewis acid.',
  scheme: [['Six electrons, vacant orbital', 1], ['Lone pair donated; Lewis acid', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-dg', short({
  marks: 2,
  stem: 'Using hybridisation, explain why graphite conducts electricity but diamond does not.',
  model: 'In diamond each carbon is sp³ hybridised and all four electrons are used in σ bonds of a rigid three-dimensional network, so none is free. In graphite each carbon is sp² hybridised and the fourth electron of every atom is delocalised over the hexagonal layer, so current flows along the layers.',
  sol: 'sp³ localised; sp² delocalised.',
  scheme: [['Diamond: sp³, all electrons localised', 1], ['Graphite: sp², delocalised π electrons', 1]],
  d: 2, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- short answer, 3 marks
add('s3-hyd', short({
  marks: 3,
  stem: 'Explain why the hydration enthalpy of the alkali metal ions falls from Li⁺ to Cs⁺, and why lithium nevertheless has the most negative standard electrode potential of the group.',
  model: 'A smaller ion has a higher charge density and attracts water molecules more strongly, so the energy released on hydration falls from −506 kJ per mole for Li⁺ to −276 for Cs⁺ as the ion becomes larger. Lithium has the highest first ionisation enthalpy, but its large hydration enthalpy outweighs this, so its E° (−3.05 V) is the most negative.',
  sol: 'Charge density; trend; hydration outweighs ionisation.',
  scheme: [['Smaller ion, higher charge density, stronger hydration', 1], ['Values fall from −506 to −276', 1], ['Hydration outweighs the high IE₁ of Li', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('s3-li', short({
  marks: 3,
  stem: 'State three ways in which lithium differs from sodium and potassium, giving one equation.',
  model: r`Lithium forms the normal oxide Li₂O in air, not a peroxide. It reacts with nitrogen to form Li₃N: $\ce{6Li + N2 -> 2Li3N}$. Its carbonate and nitrate decompose on heating to the oxide, and it forms no solid hydrogencarbonate. These differences arise from the small size and high polarising power of Li⁺.`,
  sol: 'Any three differences with an equation.',
  scheme: [['Oxide, not peroxide', 1], ['Nitride with an equation', 1], ['Carbonate or nitrate decomposes, or no solid hydrogencarbonate', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s3-ga', short({
  marks: 3,
  stem: 'Explain (i) why gallium has a smaller atomic radius than aluminium, and (ii) why thallium shows the +1 state more readily than the +3 state.',
  model: 'The ten 3d electrons that intervene before gallium shield the extra nuclear charge poorly, so the outer electrons of gallium are drawn in and its radius (135 pm) is smaller than that of aluminium (143 pm). In thallium the 6s² pair is poorly shielded and held strongly, so it is reluctant to bond, and Tl(I) is therefore more stable than Tl(III).',
  sol: 'Poor d shielding; inert pair effect.',
  scheme: [['3d electrons shield poorly', 1], ['Ga 135 pm against Al 143 pm', 1], ['Inert 6s² pair, so Tl(I) is stable', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('s3-sicl', short({
  marks: 3,
  stem: 'Explain why carbon tetrachloride is not hydrolysed by water whereas silicon tetrachloride is, and why silicon dioxide is a solid but carbon dioxide is a gas.',
  model: r`Silicon has vacant 3d orbitals that accept a lone pair from water, so $\ce{SiCl4 + 4H2O -> Si(OH)4 + 4HCl}$, but carbon has no d orbitals and cannot do so. Carbon forms pπ–pπ double bonds and so exists as small O=C=O molecules, whereas silicon forms only Si–O single bonds, giving a giant network solid.`,
  sol: 'd orbitals and pπ–pπ bonding.',
  scheme: [['Vacant d orbitals on Si allow hydrolysis; none on C', 1], ['Equation for SiCl₄', 1], ['pπ–pπ in CO₂ against giant network in SiO₂', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('s3-cat', short({
  marks: 3,
  stem: 'Define catenation and use bond enthalpy data to explain why carbon shows it much more than silicon or germanium.',
  model: 'Catenation is the property of atoms of an element linking with one another to form chains and rings. The C–C bond enthalpy (348 kJ per mole) is greater than Si–Si (297) and Ge–Ge (260), and carbon also forms strong bonds to hydrogen (414) and oxygen (358), so its chains resist attack and are stable.',
  sol: 'Definition, bond enthalpies, strong C–H and C–O bonds.',
  scheme: [['Definition', 1], ['C–C 348 against Si–Si 297 and Ge–Ge 260', 1], ['Strong C–H and C–O bonds keep chains stable', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- long answer, 5 marks
add('l-g1', long({
  stem: 'Describe how (i) atomic radius, (ii) first ionisation enthalpy, (iii) hydration enthalpy of the ion and (iv) reducing character vary in the alkali metals from lithium to caesium, giving reasons. Name the flame colours of sodium and potassium.',
  model: 'Radius increases (152 pm for Li to 265 for Cs) because a shell is added each period. IE₁ decreases (520 to 376 kJ per mole) as the outer electron is farther away and better shielded. Hydration enthalpy of M⁺ becomes less negative (−506 to −276), since larger ions have lower charge density. All are strong reducing agents; Li has the most negative E° (−3.05 V) because its hydration enthalpy is so high, while the others follow the ionisation trend. Sodium gives a golden yellow flame and potassium violet.',
  sol: 'Four trends with reasons and two colours.',
  scheme: [['Radius trend with reason', 1], ['IE₁ trend with reason', 1], ['Hydration enthalpy trend with reason', 1], ['Reducing character, Li highest', 1], ['Flame colours of Na and K', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('l-anom', long({
  stem: 'Account for the anomalous behaviour of lithium and beryllium, and show with two points each that lithium resembles magnesium and beryllium resembles aluminium.',
  model: 'Both atoms are very small, so their cations have high charge density and polarising power, and their compounds have covalent character; beryllium also has no d orbitals, so its covalency cannot exceed four. Li and Mg both form nitrides with nitrogen and decompose their carbonates on heating. Be and Al both have amphoteric oxides and hydroxides and are made passive by concentrated nitric acid. This diagonal relationship arises because the effect of increasing charge across the period roughly cancels the effect of increasing size down the group.',
  sol: 'Reasons for anomaly, two points each for the pairs, and the explanation.',
  scheme: [['Small size, high polarising power, covalent character', 1], ['No d orbitals in Be', 1], ['Two Li–Mg similarities', 1], ['Two Be–Al similarities', 1], ['Cancelling effects of charge and size', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('l-g13', long({
  stem: 'Describe the trends in atomic radius and first ionisation enthalpy in group 13, explain the irregularities, explain the inert pair effect with an example, and state two ways in which boron differs from aluminium.',
  model: 'Radius rises from B (85 pm) to Al (143) but Ga (135) is smaller than Al, and IE₁ falls from B to Al then rises at Ga and Tl, because 3d and 4f electrons shield the nuclear charge poorly. The inert pair effect is the reluctance of the ns² electrons of heavier elements to bond, so the +1 state becomes more stable: Tl⁺ is more stable than Tl³⁺. Boron is a non-metal with an acidic oxide and a maximum covalency of four, whereas aluminium is a metal with an amphoteric oxide and covalency up to six.',
  sol: 'Trends, reason for irregularity, inert pair effect and two B/Al differences.',
  scheme: [['Radius and IE₁ trends', 1], ['Irregularity due to poor shielding by d and f electrons', 1], ['Inert pair effect defined', 1], ['Tl(I) example', 0.5], ['Two differences between B and Al', 1.5]],
  d: 3, c: 'understanding', t: [1],
}));
add('l-g14', long({
  stem: 'State the common oxidation states of the group 14 elements and explain how their relative stability changes down the group, with examples. Give three reasons for the anomalous behaviour of carbon.',
  model: r`Group 14 elements show +4 and +2. Down the group the inert pair effect makes +2 more stable: Ge, Si and C prefer +4, Sn(II) is a reducing agent ($\ce{SnCl2 + 2HgCl2 -> SnCl4 + Hg2Cl2}$) and Pb(II) is the stable state, with PbO₂ a strong oxidising agent. Carbon is anomalous because of its small size, the absence of d orbitals (covalency limited to four) and its ability to form pπ–pπ multiple bonds, together with its unmatched catenation.`,
  sol: 'Oxidation states, trend with examples, three reasons for anomaly.',
  scheme: [['+4 and +2 states', 1], ['Inert pair effect trend', 1], ['Sn(II) and Pb(IV) examples', 1], ['Small size and no d orbitals', 1], ['pπ–pπ bonding and catenation', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('l-allo', long({
  stem: 'Describe the structures of diamond, graphite and fullerene (C₆₀) and relate their hardness and electrical conductivity to the hybridisation of carbon in each.',
  model: 'In diamond each carbon is sp³ hybridised and bonded tetrahedrally to four others in a rigid three-dimensional network; it is the hardest natural substance and an insulator. In graphite each carbon is sp² hybridised in flat hexagonal layers held by weak forces, so the layers slide (soft, lubricant), and the delocalised fourth electron makes it conduct along the layers. Fullerene C₆₀ is a hollow cage of sp² carbons with 20 hexagons and 12 pentagons; it is a soft molecular solid.',
  sol: 'Structure, hybridisation and properties of each allotrope.',
  scheme: [['Diamond: sp³ network, hard, insulator', 1.5], ['Graphite: sp² layers, soft, conducts', 1.5], ['Fullerene cage, 20 hexagons and 12 pentagons', 1], ['Link between hybridisation and properties', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- case-based
{
  const cr = D.g1.hyd[0] / D.g1.hyd[2];
  add('c-hyd', mk.case({
    passage: String.raw`A student studying the alkali metals collects the following data for three of them.

| Ion | Ionic radius / pm | Hydration enthalpy / kJ mol⁻¹ | E° (M⁺/M) / V |
|---|---|---|---|
| Li⁺ | 76 | −506 | −3.05 |
| Na⁺ | 102 | −406 | −2.71 |
| K⁺ | 138 | −330 | −2.93 |

The student notes that the first ionisation enthalpies of the three metals fall in the order Li > Na > K.`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'Which ion in the table has the highest charge-to-radius ratio?',
        right: 'Li⁺',
        wrong: ['Na⁺', 'K⁺', 'All three are equal'],
        sol: 'All have charge +1, so the ratio is greatest for the smallest radius, Li⁺ (76 pm) — option (@K).',
        d: 1, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'How many times larger (in magnitude) is the hydration enthalpy of Li⁺ than that of K⁺? Give your answer to two decimal places.',
        value: rn(cr, 100), tol: 0.01, unit: null,
        sol: String.raw`Ratio $= 506 \div 330 = ${dec(cr, 3)}$, that is ${dec(cr, 3)} times.`,
        scheme: [['506 ÷ 330 = 1.53', 1]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why lithium has the most negative E° although its first ionisation enthalpy is the highest of the three.',
        model: 'The hydration enthalpy of the very small Li⁺ ion is much more negative than that of Na⁺ or K⁺. This large release of energy on hydration more than compensates for the high ionisation enthalpy of lithium, so lithium loses electrons most easily in water.',
        sol: 'Hydration enthalpy outweighs ionisation enthalpy.',
        scheme: [['Li⁺ has the highest hydration enthalpy', 1], ['This outweighs its high IE₁', 1]],
        d: 3, c: 'analysis', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Explain why a hydrated Li⁺ ion moves more slowly than a hydrated K⁺ ion in an electric field, although the bare Li⁺ ion is smaller.',
          model: 'The small Li⁺ ion has a high charge density and binds many water molecules firmly, so the hydrated ion is much larger than the hydrated K⁺ ion. The larger hydrated radius means greater friction in water, so the hydrated Li⁺ ion moves more slowly.',
          sol: 'Larger hydrated radius.',
          scheme: [['Li⁺ is hydrated by more water, hydrated radius larger', 1], ['Greater friction, lower mobility', 1]],
          d: 3, c: 'analysis', t: [1],
        }),
      ]),
    ],
  }), () => near(cr, 1.5333, 0.01) && near(rn(cr, 100), 1.53, 0.01) || 'hyd ratio');
}
{
  const ie12 = D.g2.ie1[0] + D.g2.ie2[0];
  const E = 0.1 * ie12;
  add('c-be', mk.case({
    passage: String.raw`Anhydrous beryllium chloride is a low-melting solid made of long chains in which chlorine atoms bridge two beryllium atoms. It dissolves in water to give an acidic solution and dissolves in ethanol and ether. The Be²⁺ ion has a radius of only 31 pm. For beryllium, IE₁ = 899 kJ mol⁻¹, IE₂ = 1757 kJ mol⁻¹ and the electronegativity is 1.5, compared with 1.2 for magnesium.`,
    d: 3, c: 'application',
    children: [
      part('a', mcq({
        stem: 'The covalent character of beryllium chloride arises mainly because Be²⁺ has:',
        right: 'a very small radius and high polarising power',
        wrong: ['a very large radius', 'a complete d subshell', 'a very low ionisation enthalpy'],
        sol: 'A small, doubly charged ion distorts the electron cloud of the chloride ion strongly (Fajans-type argument), giving covalent bonding — option (@K).',
        d: 2, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'Calculate the energy, in kJ, needed to convert 0.10 mol of gaseous beryllium atoms into gaseous Be²⁺ ions.',
        value: rn(E, 10), tol: 0.5, unit: 'kJ',
        sol: String.raw`$899 + 1757 = ${ie12}$ kJ mol⁻¹. Energy $= 0.10 \times ${ie12} = ${dec(E, 4)}$ kJ.`,
        scheme: [['IE₁ + IE₂ = 2656 kJ mol⁻¹', 0.5], ['265.6 kJ for 0.10 mol', 0.5]],
        d: 2, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why the maximum covalency of beryllium is four, whereas magnesium can form complexes with higher coordination numbers.',
        model: 'Beryllium has only the 2s and three 2p orbitals in its valence shell, four orbitals in all, and no d orbitals, so it can form at most four bonds. Magnesium has vacant 3d orbitals and a larger size, so it can accommodate six groups around it.',
        sol: 'Orbital availability.',
        scheme: [['Be has four valence orbitals and no d orbitals', 1], ['Mg has 3d orbitals and is larger', 1]],
        d: 3, c: 'analysis', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'State two properties in which beryllium resembles aluminium rather than magnesium.',
          model: 'Both beryllium and aluminium form amphoteric oxides and hydroxides that dissolve in alkali, and both are made passive by concentrated nitric acid. Their chlorides are also largely covalent, whereas magnesium chloride is ionic.',
          sol: 'Amphoteric oxides; passivity or covalent chlorides.',
          scheme: [['First similarity', 1], ['Second similarity', 1]],
          d: 2, c: 'understanding', t: [1],
        }),
      ]),
    ],
  }), () => ie12 === 2656 && near(E, 265.6) || 'be case');
}
{
  const inSum = D.g13.ie1[3] + D.g13.ie2[3] + D.g13.ie3[3];
  add('c-tl', mk.case({
    passage: String.raw`Thallium forms a white, sparingly soluble chloride TlCl and a soluble hydroxide TlOH that is strongly basic, like potassium hydroxide. Compounds of thallium(III) are rare and act as oxidising agents. Some ionisation enthalpies (kJ mol⁻¹) are given below.

| Element | IE₁ | IE₂ | IE₃ |
|---|---|---|---|
| Al | 577 | 1816 | 2744 |
| In | 558 | 1820 | 2704 |
| Tl | 589 | 1971 | 2878 |`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'The most stable oxidation state of thallium is:',
        right: '+1',
        wrong: ['+2', '+3', '+4'],
        sol: 'Thallium prefers +1 because of the inert pair effect; Tl(III) compounds are oxidising — option (@K).',
        d: 1, c: 'understanding', t: [1],
      })),
      part('b', num({
        stem: 'Using the table, calculate the total energy, in kJ mol⁻¹, needed to convert gaseous indium atoms into gaseous In³⁺ ions.',
        value: inSum, tol: 1, unit: 'kJ mol⁻¹',
        sol: String.raw`$558 + 1820 + 2704 = ${inSum}$ kJ mol⁻¹.`,
        scheme: [['558 + 1820 + 2704 = 5082', 1]],
        d: 1, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain why thallium(III) compounds are good oxidising agents.',
        model: 'In thallium the 6s² pair is held tightly because it is poorly shielded, so it resists being used for bonding. Tl(III) therefore tends to gain two electrons to return to the stable Tl(I) state, which makes it an oxidising agent.',
        sol: 'Inert pair effect, reduction to Tl(I).',
        scheme: [['Inert 6s² pair; Tl(I) more stable', 1], ['Tl(III) is reduced to Tl(I)', 1]],
        d: 3, c: 'analysis', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Explain why TlOH resembles KOH in basic strength even though thallium is a p-block element.',
          model: 'In TlOH thallium is in the +1 state, in which it loses only its single 6p electron, and Tl⁺ is a large ion with low charge density, like K⁺. A large, singly charged cation holds the hydroxide ion weakly, so the hydroxide is strongly basic and soluble.',
          sol: 'Tl⁺ is large and singly charged like K⁺.',
          scheme: [['Tl⁺ large, charge +1 like K⁺', 1], ['Weak hold on OH⁻, strong base', 1]],
          d: 3, c: 'evaluation', t: [1],
        }),
      ]),
    ],
  }), () => inSum === 5082 || 'in sum');
}
{
  const ratio = D.g14.mmH[0] / D.g14.mmH[3];
  add('c-pb', mk.case({
    passage: String.raw`A student carries out two tests. (1) Tin(II) chloride solution is added to mercury(II) chloride solution and a white precipitate of mercury(I) chloride forms. (2) Lead(IV) oxide is warmed with concentrated hydrochloric acid and a greenish-yellow gas is evolved, leaving lead(II) chloride. The student also looks up the E–E single-bond enthalpies in group 14 (kJ mol⁻¹): C–C 348, Si–Si 297, Ge–Ge 260, Sn–Sn 240.`,
    d: 3, c: 'analysis',
    children: [
      part('a', mcq({
        stem: 'The substance acting as an oxidising agent in test (2) is:',
        right: 'lead(IV) oxide',
        wrong: ['hydrochloric acid', 'lead(II) chloride', 'chlorine'],
        sol: 'PbO₂ gains electrons (Pb(IV) to Pb(II)) while chloride is oxidised to chlorine — option (@K).',
        d: 2, c: 'application', t: [1],
      })),
      part('b', num({
        stem: 'Calculate the ratio of the C–C bond enthalpy to the Sn–Sn bond enthalpy, to two decimal places.',
        value: rn(ratio, 100), tol: 0.01, unit: null,
        sol: String.raw`Ratio $= 348 \div 240 = ${dec(ratio, 3)}$.`,
        scheme: [['348 ÷ 240 = 1.45', 1]],
        d: 1, c: 'application', t: [1],
      })),
      part('c', short({
        marks: 2,
        stem: 'Explain, using the inert pair effect, why tin(II) acts as a reducing agent in test (1) while lead(IV) acts as an oxidising agent in test (2).',
        model: 'Down group 14 the +2 state becomes more stable because the ns² pair is reluctant to bond. Sn(II) is therefore readily oxidised to the more common Sn(IV), a reducing action, whereas Pb(IV) readily gains two electrons to become the stable Pb(II), an oxidising action.',
        sol: 'Direction of change is towards the more stable state.',
        scheme: [['Inert pair effect makes +2 more stable for heavier members', 1], ['Sn(II) to Sn(IV) reduces; Pb(IV) to Pb(II) oxidises', 1]],
        d: 3, c: 'analysis', t: [1],
      }), [
        short({
          marks: 2,
          stem: 'Explain why the E–E bond enthalpy falls from carbon to tin and what this implies for chain formation.',
          model: 'Down the group the atoms become larger, so the overlap between orbitals on adjacent atoms is poorer and the E–E bond becomes weaker, 348 kJ per mole for C–C against 240 for Sn–Sn. Weaker bonds mean longer chains are less stable, so catenation decreases from carbon to tin.',
          sol: 'Poorer overlap, weaker bond, less catenation.',
          scheme: [['Larger atoms, poorer overlap, weaker bond', 1], ['Less catenation down the group', 1]],
          d: 2, c: 'understanding', t: [1],
        }),
      ]),
    ],
  }), () => near(ratio, 1.45, 0.005) || 'ratio');
}
