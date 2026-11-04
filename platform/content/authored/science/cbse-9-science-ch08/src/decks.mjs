// ch08 Atoms and Molecules — two decks: Part 1 (t01–t02) laws of chemical combination and Dalton's atomic theory;
// Part 2 (t03–t04) atoms, molecules, ions, writing formulae, molecular and formula unit mass.
import { sl, deck, table, flow, chem, svgV, r, near, dec } from './lib.mjs';
import { CONSERVATION, ATOMICITY, CRISSCROSS, PROPORTION } from './svgs.mjs';
import { mass, crisscross, ION, atoms, natoms } from './data.mjs';

const must = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};

// ---- worked-example numbers (computed once, then interpolated)
const e1 = (() => {
  // CaCO3 + 2HCl -> CaCl2 + H2O + CO2, scaled by 10 g of calcium carbonate
  const k = 10.0 / mass('CaCO3');
  const reac = [10.0, k * 2 * mass('HCl')];
  const prod = [k * mass('CaCl2'), k * mass('H2O'), k * mass('CO2')];
  return { reac, prod, sumR: reac[0] + reac[1], sumP: prod[0] + prod[1] + prod[2] };
})();
must(near(e1.reac[1], 7.3, 1e-9) && near(e1.prod[0], 11.1, 1e-9) && near(e1.prod[1], 1.8, 1e-9) && near(e1.prod[2], 4.4, 1e-9) && near(e1.sumR, 17.3, 1e-9) && near(e1.sumP, 17.3, 1e-9), 'e1 conservation (marble and acid)');
const e2 = (() => {
  const mg = 2.4, oxide = 4.0;
  return { mg, oxide, o: oxide - mg };
})();
must(near(e2.o, 1.6, 1e-9) && near(e2.mg / e2.o, 1.5, 1e-9), 'e2 magnesium burning');
const e3 = (() => {
  // two samples of carbon dioxide from different sources
  const a = { c: 3.3, co2: 12.1 };
  a.o = a.co2 - a.c;
  const b = { c: 6.0, co2: 22.0 };
  b.o = b.co2 - b.c;
  return { a, b, ra: a.c / a.o, rb: b.c / b.o };
})();
must(near(e3.a.o, 8.8, 1e-9) && near(e3.b.o, 16.0, 1e-9) && near(e3.ra, 3 / 8, 1e-9) && near(e3.rb, 3 / 8, 1e-9), 'e3 CO2 ratio');
const f1 = crisscross(ION.K, ION.CO3);
const f2 = crisscross(ION.Mg, ION.OH);
const f3 = crisscross(ION.Al, ION.O);
must(f1.formula === 'K2CO3' && f2.formula === 'Mg(OH)2' && f3.formula === 'Al2O3', 'criss-cross worked formulae');
const m1 = { h2so4: 2 * 1 + 32 + 4 * 16, glucose: 6 * 12 + 12 * 1 + 6 * 16 };
must(m1.h2so4 === mass('H2SO4') && m1.glucose === mass('C6H12O6') && m1.h2so4 === 98 && m1.glucose === 180, 'molecular masses');
const m2 = { k2co3: 2 * 39 + 12 + 3 * 16, mgoh2: 24 + 2 * (16 + 1), al2so43: 2 * 27 + 3 * (32 + 4 * 16) };
must(m2.k2co3 === mass('K2CO3') && m2.mgoh2 === mass('Mg(OH)2') && m2.al2so43 === mass('Al2(SO4)3') && m2.al2so43 === 342, 'formula unit masses');
must(natoms('Al2(SO4)3') === 17 && atoms('Mg(OH)2').O === 2, 'atom counts');

export const V = {
  conservation: svgV(CONSERVATION, 'A closed flask on a balance before and after a reaction between marble and acid: the reading is 61.30 grams both times', 'Closed flask: the total mass stays the same.'),
  proportion: svgV(PROPORTION, 'Two samples of magnesium oxide with masses of magnesium and oxygen of 6.0 and 4.0 grams, and 1.8 and 1.2 grams, both in the ratio 3 to 2', 'The ratio by mass is fixed.'),
  atomicity: svgV(ATOMICITY, 'Drawings of helium (1 atom), oxygen (2 atoms), ozone (3 atoms), white phosphorus (4 atoms) and sulphur (8 atoms) molecules', 'Atomicity is the number of atoms in a molecule.'),
  crisscross: svgV(CRISSCROSS, 'Four steps of the criss-cross method for aluminium sulphate: symbols, valencies, cross over, write the formula Al2(SO4)3', 'The criss-cross method.'),
};

// =====================================================================================================================
export const deck1 = deck({
  part: 1,
  title: "Atoms and Molecules — Part 1: Laws of chemical combination and Dalton's theory",
  goals: [
    'State and verify the law of conservation of mass',
    'State and verify the law of constant proportions with data',
    "State the postulates of Dalton's atomic theory and see how it explains the two laws",
    "Name the limitations of Dalton's theory",
  ],
  slides: [
    sl('title', 'Atoms and Molecules', {
      b: 'Part 1: why the total mass stays the same in a reaction, why a compound always has the same recipe, and the atomic idea that explains both.',
      v: table(['Law or idea', 'Said by', 'In one line'], [['Conservation of mass', 'Lavoisier', 'total mass of products equals total mass of reactants'], ['Constant proportions', 'Proust', 'a pure compound always has the same elements in the same ratio by mass'], ['Atomic theory', 'Dalton', 'matter is made of atoms that rearrange in reactions']], 'Table of two laws of chemical combination and the atomic theory with who stated them and a one-line summary'),
      n: 'Two simple laws from the eighteenth century changed chemistry. The first says that the total mass does not change in a chemical reaction. The second says that a pure compound always contains the same elements in the same ratio by mass. In this part we check both laws with data, and then meet the atomic idea of John Dalton that explains them.',
    }),
    sl('concept', 'Law of conservation of mass', {
      b: r`**Law of conservation of mass:** in a chemical reaction, mass can neither be created nor destroyed. The total mass of the products **equals** the total mass of the reactants. The law holds when the reaction is carried out in a **closed** vessel, so that no gas escapes. If a gas escapes from an **open** vessel, the mass that is left seems smaller, but the missing mass is in the gas.`,
      v: table(['Set-up', 'What you see on the balance', 'Reason'], [['Closed flask, acid tipped onto marble', 'no change', 'the gas stays in the flask'], ['Open flask, same reaction', 'reading falls', 'carbon dioxide escapes into the air'], ['Magnesium ribbon burnt in open air', 'ash weighs more', 'oxygen from the air joins the metal']], 'Table of three set-ups, what the balance shows and the reason'),
      n: 'The law of conservation of mass says that in a chemical reaction, mass is neither created nor destroyed. The total mass of the products equals the total mass of the reactants. It is easy to be fooled in an open vessel. A gas may escape, so the reading falls. Burning magnesium in the open makes the ash heavier because oxygen from the air joins it. In a closed vessel, the reading stays the same.',
    }),
    sl('diagram', 'Checking the law with a closed flask', {
      b: r`Weigh a flask holding marble chips, with a small tube of acid standing in it and a balloon over the mouth. Then tip the tube over so that the acid meets the marble. Gas forms and fills the balloon, but nothing escapes, and the balance reads **the same** before and after.`,
      v: V.conservation,
      n: 'Here is a way to check the law. A closed flask holds marble chips and a small tube of acid, and a balloon is fixed on top. The balance shows sixty one point three grams. Now the tube is tipped over so that the acid meets the marble. Gas forms and fills the balloon, but it cannot escape. The balance still shows sixty one point three grams.',
    }),
    sl('example', 'Worked example: marble and acid', {
      b: r`**Problem.** In a closed flask, ${dec(e1.reac[0], 3)} g of calcium carbonate reacts with ${dec(e1.reac[1], 2)} g of hydrochloric acid to give ${dec(e1.prod[0], 3)} g of calcium chloride, ${dec(e1.prod[1], 2)} g of water and ${dec(e1.prod[2], 2)} g of carbon dioxide. Is mass conserved?

**Step 1: mass of reactants** $= ${dec(e1.reac[0], 3)} + ${dec(e1.reac[1], 2)} = ${dec(e1.sumR, 3)}$ g.

**Step 2: mass of products** $= ${dec(e1.prod[0], 3)} + ${dec(e1.prod[1], 2)} + ${dec(e1.prod[2], 2)} = ${dec(e1.sumP, 3)}$ g.

**Step 3.** Both are ${dec(e1.sumR, 3)} g, so mass is conserved.`,
      v: chem(r`CaCO3 + 2HCl -> CaCl2 + H2O + CO2`, 'Equation: calcium carbonate and hydrochloric acid give calcium chloride, water and carbon dioxide', 'Marble and acid'),
      n: 'Ten grams of calcium carbonate react with seven point three grams of hydrochloric acid. The products are eleven point one grams of calcium chloride, one point eight grams of water and four point four grams of carbon dioxide. Add the reactants to get seventeen point three grams. Add the products to get seventeen point three grams too. The totals match, so mass is conserved.',
    }),
    sl('check', 'Quick check: open and closed flasks', {
      b: 'Decide what happens to the reading when a gas escapes from an open flask.',
      n: 'Quick check. Think about why a flask in which marble reacts with acid shows a smaller reading if it is left open.',
      chk: 'chk-cons',
    }),
    sl('concept', 'Law of constant proportions', {
      b: r`**Law of constant proportions (definite proportions):** a pure chemical compound always contains the **same elements combined in the same ratio by mass**, whatever its source or the way it is made. In water the ratio of hydrogen to oxygen is always 1 : 8, in carbon dioxide the ratio of carbon to oxygen is always 3 : 8, and in ammonia the ratio of nitrogen to hydrogen is always 14 : 3.`,
      v: table(['Compound', 'Elements', 'Ratio by mass'], [['Water', 'hydrogen : oxygen', '1 : 8'], ['Carbon dioxide', 'carbon : oxygen', '3 : 8'], ['Ammonia', 'nitrogen : hydrogen', '14 : 3'], ['Magnesium oxide', 'magnesium : oxygen', '3 : 2']], 'Table of four compounds with the elements and their fixed ratio by mass'),
      n: 'The law of constant proportions says that a pure compound always has the same elements in the same ratio by mass, whatever its source. Water has hydrogen and oxygen in the ratio one to eight. Carbon dioxide has carbon and oxygen in the ratio three to eight. Ammonia has nitrogen and hydrogen in the ratio fourteen to three. Magnesium oxide has magnesium and oxygen in the ratio three to two.',
    }),
    sl('diagram', 'Two samples, one ratio', {
      b: r`Magnesium oxide made in two different ways is analysed. Sample A has 6.0 g of magnesium and 4.0 g of oxygen. Sample B has 1.8 g of magnesium and 1.2 g of oxygen. The samples differ in size, but both have $\text{Mg} : \text{O} = 3 : 2$. This is why the ratio, not the amount, identifies a compound. The masses here are illustrative.`,
      v: V.proportion,
      n: 'Look at two samples of magnesium oxide. Sample A has six grams of magnesium and four grams of oxygen. Sample B is smaller, with one point eight grams of magnesium and one point two grams of oxygen. In both, the ratio of magnesium to oxygen is three to two. A compound is recognised by this fixed ratio, and not by how much of it we have.',
    }),
    sl('example', 'Worked example: testing the law with data', {
      b: r`**Problem.** Sample 1 of carbon dioxide, made by burning charcoal, has ${e3.a.c} g of carbon in ${e3.a.co2} g of gas. Sample 2, from heating limestone, has ${dec(e3.b.c, 2)} g of carbon in ${dec(e3.b.co2, 3)} g. Do they obey the law?

**Step 1: oxygen** in sample 1 $= ${e3.a.co2} - ${e3.a.c} = ${dec(e3.a.o, 2)}$ g. Ratio $\text{C} : \text{O} = ${e3.a.c} : ${dec(e3.a.o, 2)} = 3 : 8$.

**Step 2: oxygen** in sample 2 $= ${dec(e3.b.co2, 3)} - ${dec(e3.b.c, 2)} = ${dec(e3.b.o, 3)}$ g. Ratio $= ${dec(e3.b.c, 2)} : ${dec(e3.b.o, 3)} = 3 : 8$.

**Step 3.** Both samples have the same ratio, so they obey the law.`,
      v: table(['Sample', 'Carbon (g)', 'Oxygen (g)', 'Carbon : oxygen'], [['1 (charcoal)', `${e3.a.c}`, dec(e3.a.o, 2), '3 : 8'], ['2 (limestone)', dec(e3.b.c, 2), dec(e3.b.o, 3), '3 : 8']], 'Table of two carbon dioxide samples with the mass of carbon, mass of oxygen and the ratio'),
      n: 'Two samples of carbon dioxide come from different sources. The first has three point three grams of carbon in twelve point one grams of gas, so the oxygen is eight point eight grams. The ratio is three to eight. The second has six grams of carbon in twenty two grams of gas, so the oxygen is sixteen grams. The ratio is again three to eight. The law holds.',
    }),
    sl('check', 'Quick check: constant proportions', {
      b: 'Decide which law two samples with the same mass ratio show.',
      n: 'Quick check. Think about which law is shown when two samples of a compound from different places turn out to have the same ratio of elements by mass.',
      chk: 'chk-prop',
    }),
    sl('example', 'Worked example: burning magnesium', {
      b: r`**Problem.** A strip of magnesium of mass ${e2.mg} g is burnt completely in air. The white powder weighs ${e2.oxide.toFixed(1)} g. Find the mass of oxygen that combined and the ratio of magnesium to oxygen.

**Step 1.** By conservation of mass, oxygen $= ${e2.oxide.toFixed(1)} - ${e2.mg} = ${dec(e2.o, 2)}$ g.

**Step 2.** $\text{Mg} : \text{O} = ${e2.mg} : ${dec(e2.o, 2)} = 3 : 2$, the same fixed ratio as before.`,
      v: table(['Quantity', 'Mass (g)'], [['Magnesium burnt', `${e2.mg}`], ['Magnesium oxide formed', e2.oxide.toFixed(1)], ['Oxygen that combined', dec(e2.o, 2)]], 'Table of the mass of magnesium, magnesium oxide and oxygen in the burning experiment'),
      n: 'A strip of magnesium of two point four grams is burnt in air. The white powder weighs four grams. By the law of conservation of mass, the extra one point six grams must be oxygen from the air. The ratio of magnesium to oxygen is two point four to one point six, which is three to two. This is the same fixed ratio we saw in the other samples.',
    }),
    sl('concept', "Dalton's atomic theory", {
      b: r`John Dalton (about 1808) explained the laws with five ideas. (1) All matter is made of very small particles called **atoms**. (2) Atoms of one element are **identical** in mass and properties. (3) Atoms of different elements differ in mass and properties. (4) Atoms **combine in small whole-number ratios** to form compounds. (5) Atoms **cannot be created or destroyed** in a chemical reaction; they are only rearranged.`,
      v: table(['Postulate', 'Meaning'], [['1', 'matter is made of atoms'], ['2', 'atoms of one element are alike'], ['3', 'atoms of different elements differ'], ['4', 'atoms join in small whole-number ratios'], ['5', 'atoms are only rearranged in a reaction']], 'Table of the five postulates of Dalton atomic theory with a short meaning'),
      n: 'John Dalton proposed the atomic theory about the year eighteen hundred and eight. It has five main ideas. All matter is made of atoms. Atoms of one element are alike, and atoms of different elements differ. Atoms combine in small whole number ratios to form compounds. And atoms cannot be created or destroyed in a chemical reaction, they are only rearranged.',
    }),
    sl('concept', 'How the theory explains the two laws', {
      b: r`**Conservation of mass:** atoms are neither created nor destroyed, only regrouped, so the total mass of atoms, and hence of matter, stays the same. **Constant proportions:** every molecule of a compound has the same atoms in the same whole-number ratio, and each kind of atom has a fixed mass, so the ratio by mass is the same in every sample.`,
      v: table(['Law', 'Dalton postulate used', 'Explanation'], [['Conservation of mass', 'atoms cannot be created or destroyed', 'the atoms before and after are the same, so the mass is the same'], ['Constant proportions', 'atoms combine in fixed ratios and have fixed masses', 'the same atoms in the same ratio give the same ratio by mass']], 'Table linking each law to the Dalton postulate that explains it'),
      n: 'Dalton theory explains the two laws very well. Because atoms are not created or destroyed, only rearranged, the total mass stays the same, which is the law of conservation of mass. Because every particle of a compound has the same atoms in the same ratio, and each atom has a fixed mass, the ratio by mass is the same in every sample.',
    }),
    sl('concept', 'Limitations of the theory', {
      b: r`Later work showed that parts of Dalton's theory need correction. (1) **Atoms are divisible:** they contain electrons, protons and neutrons. (2) Atoms of the **same** element can have different masses: **isotopes**. (3) Atoms of **different** elements can have the same mass: **isobars**. (4) The theory does not explain **why** atoms combine, or the forces that hold them together. (5) In nuclear reactions atoms of one element can change into another.`,
      v: table(['Postulate', 'What we now know', 'Term'], [['atoms are indivisible', 'atoms have electrons, protons and neutrons', 'subatomic particles'], ['atoms of one element are identical', 'atoms of one element can differ in mass', 'isotopes'], ['atoms of different elements differ in mass', 'some different elements have equal mass', 'isobars'], ['atoms are never destroyed', 'atoms change in nuclear reactions', 'nuclear reactions']], 'Table of four Dalton postulates, what is now known and the term for it'),
      n: 'Dalton theory needed some corrections later. Atoms are divisible, because they contain electrons, protons and neutrons. Atoms of the same element can have different masses, and these are called isotopes. Atoms of different elements can have the same mass, and these are called isobars. The theory also does not explain why atoms combine, and it fails for nuclear reactions.',
    }),
    sl('check', "Quick check: Dalton's theory", {
      b: 'Decide which Dalton idea is no longer accepted as it stood.',
      n: 'Quick check. Think about which of the ideas in the theory of Dalton was found to be incorrect when electrons, protons and neutrons were discovered.',
      chk: 'chk-dal',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Conservation of mass: total mass of products equals total mass of reactants (closed vessel).',
        'Constant proportions: a pure compound has a fixed ratio of elements by mass (water 1 : 8, carbon dioxide 3 : 8).',
        'Dalton: atoms, identical for one element, combine in small whole-number ratios and are rearranged in reactions.',
        'The theory explains both laws.',
        'Limitations: atoms are divisible, isotopes, isobars, no explanation of bonding, nuclear reactions.',
      ],
      v: table(['Idea', 'Key point'], [['Conservation', 'mass in equals mass out'], ['Constant proportions', 'fixed ratio by mass'], ['Dalton postulates', 'atoms rearranged, never lost'], ['Isotopes', 'same element, different masses']], 'Table summarising four key points of Part 1'),
      n: 'To sum up. In a chemical reaction the total mass of products equals the total mass of reactants. A pure compound always has its elements in a fixed ratio by mass. Dalton explained both laws by saying that atoms are rearranged and never lost, and that they combine in fixed whole number ratios. Later discoveries, such as isotopes, showed some limits of his theory.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Always say that the law of conservation of mass is checked in a closed vessel.',
        'To verify constant proportions, find the mass of each element, then write both ratios in the simplest form.',
        'Write all five postulates briefly; link each law to the postulate that explains it.',
        'For limitations, name isotopes and isobars and say what each means.',
        'Show the subtraction step when you find the mass of oxygen from the compound mass.',
      ],
      n: 'Some exam tips. Say that the law of conservation of mass holds in a closed vessel. To verify constant proportions, find the mass of each element, then write the ratios in the simplest form and compare. Remember the five postulates, and link each law to the postulate that explains it. For limitations, name isotopes and isobars and say what each term means.',
    }),
  ],
});

// =====================================================================================================================
export const deck2 = deck({
  part: 2,
  title: 'Atoms and Molecules — Part 2: Molecules, ions, formulae and masses',
  goals: [
    'Distinguish atoms, molecules and ions, and state the atomicity of common molecules',
    'Name common polyatomic ions',
    'Write formulae of ionic compounds with the criss-cross method',
    'Calculate molecular mass and formula unit mass',
  ],
  slides: [
    sl('title', 'Molecules, ions and formulae', {
      b: 'Part 2: how atoms group into molecules and ions, how to write a formula from valencies, and how to find the mass of a molecule.',
      v: table(['Particle', 'What it is', 'Example'], [['Atom', 'smallest unit of an element in a reaction', 'a helium atom'], ['Molecule', 'two or more atoms joined together', 'water, oxygen'], ['Ion', 'an atom or group with an electric charge', 'sodium ion, sulphate ion']], 'Table of atom, molecule and ion with what each is and an example'),
      n: 'Atoms are the building blocks, but most substances we meet are made of groups of atoms. In this part we see how atoms join into molecules, how charged particles called ions form, how to write the formula of an ionic compound with the criss cross method, and how to work out the mass of a molecule or of a formula unit.',
    }),
    sl('concept', 'Atoms and molecules', {
      b: r`An **atom** is the smallest particle of an element that takes part in a chemical reaction. A **molecule** is a group of two or more atoms bonded together that behaves as one particle. A molecule of an **element** has atoms of the **same** kind, such as $\ce{O2}$ or $\ce{O3}$. A molecule of a **compound** has atoms of **different** kinds in a fixed ratio, such as $\ce{H2O}$, $\ce{CO2}$ and $\ce{NH3}$.`,
      v: table(['Molecule', 'Atoms in it', 'Kind'], [['O2', '2 oxygen atoms', 'element'], ['H2O', '2 hydrogen, 1 oxygen', 'compound'], ['CO2', '1 carbon, 2 oxygen', 'compound'], ['NH3', '1 nitrogen, 3 hydrogen', 'compound'], ['CH4', '1 carbon, 4 hydrogen', 'compound']], 'Table of five molecules with the atoms in each and whether it is an element or a compound'),
      n: 'An atom is the smallest particle of an element that takes part in a chemical reaction. A molecule is two or more atoms joined together. A molecule of an element has the same kind of atoms, like oxygen. A molecule of a compound has different kinds of atoms in a fixed ratio. Water has two hydrogen atoms and one oxygen atom. Carbon dioxide, ammonia and methane are other examples.',
    }),
    sl('diagram', 'Atomicity', {
      b: r`The number of atoms in one molecule of an element is its **atomicity**. Helium, neon and argon are **monoatomic**. Hydrogen, oxygen, nitrogen and chlorine are **diatomic**. Ozone, $\ce{O3}$, is **triatomic**, white phosphorus, $\ce{P4}$, is **tetratomic** and sulphur, $\ce{S8}$, has eight atoms in a ring.`,
      v: V.atomicity,
      n: 'The number of atoms in one molecule of an element is called its atomicity. Noble gases such as helium are monoatomic. Hydrogen, oxygen, nitrogen and chlorine are diatomic. Ozone has three atoms and is triatomic. White phosphorus has four atoms and is tetratomic. Sulphur has eight atoms in a ring and is called octa atomic.',
    }),
    sl('check', 'Quick check: atomicity', {
      b: 'Decide the atomicity of a given molecule.',
      n: 'Quick check. Think about how many atoms there are in one molecule of ozone, and what that makes its atomicity.',
      chk: 'chk-atom',
    }),
    sl('concept', 'Ions and ionic compounds', {
      b: r`An **ion** is an atom or a group of atoms with an electric charge. A **cation** is positive, such as $\ce{Na+}$ and $\ce{Mg^2+}$, formed by losing electrons. An **anion** is negative, such as $\ce{Cl-}$ and $\ce{O^2-}$, formed by gaining electrons. Oppositely charged ions attract and form an **ionic compound**, for example sodium chloride. It has no separate molecules but a repeating pattern of ions, so we use a **formula unit**.`,
      v: table(['Ion', 'Charge', 'Kind'], [['Sodium ion Na+', '1+', 'cation'], ['Magnesium ion Mg2+', '2+', 'cation'], ['Chloride ion Cl-', '1−', 'anion'], ['Oxide ion O2-', '2−', 'anion']], 'Table of four simple ions with their charge and whether each is a cation or an anion'),
      n: 'An ion is an atom or group of atoms with an electric charge. A positive ion is a cation, formed when atoms lose electrons. A negative ion is an anion, formed when atoms gain electrons. Opposite charges attract and make ionic compounds such as sodium chloride. These compounds are not made of separate molecules, but of a repeating pattern of ions, so we speak of a formula unit.',
    }),
    sl('concept', 'Polyatomic ions', {
      b: r`A **polyatomic ion** is a group of atoms bonded together that carries a charge as a whole. The group stays together in reactions. Learn the common ones; the number is the **valency**, the size of the charge.`,
      v: table(['Name', 'Formula', 'Charge'], [['Ammonium', 'NH4', '1+'], ['Hydroxide', 'OH', '1−'], ['Nitrate', 'NO3', '1−'], ['Hydrogencarbonate', 'HCO3', '1−'], ['Carbonate', 'CO3', '2−'], ['Sulphate', 'SO4', '2−']], 'Table of six common polyatomic ions with their formula and charge'),
      n: 'A polyatomic ion is a group of atoms that carries a charge as a whole, and the group stays together in reactions. The common ones are ammonium, with one positive charge, and hydroxide, nitrate and hydrogencarbonate, each with one negative charge. Carbonate and sulphate each carry two negative charges. The size of the charge is the valency.',
    }),
    sl('concept', 'Writing a formula: the criss-cross rules', {
      b: r`The compound is **neutral**, so the total positive charge equals the total negative charge. **Rules:** (1) write the cation first, then the anion; (2) write the valency of each; (3) **criss-cross**: the valency of the cation becomes the subscript of the anion, and the valency of the anion becomes the subscript of the cation; (4) divide by any common factor; (5) put a polyatomic ion in **brackets** if its subscript is more than 1; omit a subscript of 1.`,
      v: table(['Compound', 'Cation (valency)', 'Anion (valency)', 'Formula'], [['Sodium chloride', 'Na (1)', 'Cl (1)', 'NaCl'], ['Magnesium oxide', 'Mg (2)', 'O (2)', 'MgO, after dividing Mg2O2 by 2'], ['Calcium chloride', 'Ca (2)', 'Cl (1)', 'CaCl2']], 'Table of three compounds with the valencies and the formula obtained by the criss-cross method'),
      n: 'A compound is neutral, so the total positive charge equals the total negative charge. To write a formula, write the cation first and the anion second, with their valencies. Then criss cross them, so the valency of one becomes the subscript of the other. Divide by any common factor. Use brackets round a polyatomic ion if its subscript is more than one, and leave out a subscript of one.',
    }),
    sl('diagram', 'The criss-cross method in four steps', {
      b: r`For aluminium sulphate, aluminium has valency 3 and the sulphate ion has valency 2. Crossing them over gives $\ce{Al2(SO4)3}$. The charge check: $2 \times 3 = 6$ positive and $3 \times 2 = 6$ negative, so the formula is neutral.`,
      v: V.crisscross,
      n: 'Follow the four steps for aluminium sulphate. First write the symbols. Second write the valencies, three for aluminium and two for sulphate. Third, criss cross them. The three becomes the subscript of sulphate and the two becomes the subscript of aluminium. Fourth, put the sulphate in brackets because its subscript is more than one. The formula has two aluminium and three sulphate groups.',
    }),
    sl('example', 'Worked example: three formulae', {
      b: r`**Problem.** Write the formulae of (a) potassium carbonate, (b) magnesium hydroxide, (c) aluminium oxide.

**(a)** K (1), $\ce{CO3}$ (2). Crossing gives $\ce{K2CO3}$ with no bracket, as the carbonate subscript is 1.

**(b)** Mg (2), $\ce{OH}$ (1). Crossing gives $\ce{Mg(OH)2}$; the bracket is needed since the subscript 2 is for a polyatomic ion.

**(c)** Al (3), O (2). Crossing gives $\ce{Al2O3}$.`,
      v: table(['Compound', 'Valencies', 'After criss-cross', 'Formula'], [['Potassium carbonate', 'K 1, CO3 2', 'K2 (CO3)1', f1.formula], ['Magnesium hydroxide', 'Mg 2, OH 1', 'Mg1 (OH)2', f2.formula], ['Aluminium oxide', 'Al 3, O 2', 'Al2 O3', f3.formula]], 'Table of the valencies, criss-cross result and final formula for three compounds'),
      n: 'Let us write three formulae. Potassium has valency one and carbonate has valency two, so crossing over gives two potassium and one carbonate. No bracket is needed. Magnesium has valency two and hydroxide has valency one, so we get one magnesium and two hydroxide groups, and the hydroxide needs a bracket. Aluminium has valency three and oxygen two, which gives aluminium oxide with two aluminium and three oxygen.',
    }),
    sl('check', 'Quick check: writing a formula', {
      b: 'Decide on the formula obtained by the criss-cross method.',
      n: 'Quick check. Use the valencies, cross them over, and decide on the correct formula, remembering the bracket rule for polyatomic ions.',
      chk: 'chk-form',
    }),
    sl('concept', 'Molecular mass and formula unit mass', {
      b: r`The **molecular mass** of a substance made of molecules is the sum of the atomic masses of all the atoms in one molecule. The **formula unit mass** of an ionic compound is the sum of the atomic masses of all the atoms in one formula unit. Both are in **atomic mass units** (u) and are worked out the same way. Atomic masses used here: H 1, C 12, N 14, O 16, Na 23, Mg 24, Al 27, S 32, Cl 35.5, K 39, Ca 40. (You will meet the mole in Class 11.)`,
      v: table(['Element', 'H', 'C', 'N', 'O', 'Na', 'Mg', 'Al', 'S', 'Cl', 'K', 'Ca'], [['Atomic mass (u)', '1', '12', '14', '16', '23', '24', '27', '32', '35.5', '39', '40']], 'Table of the atomic masses in atomic mass units of eleven elements'),
      n: 'The molecular mass is the sum of the atomic masses of all the atoms in one molecule. For an ionic compound we add the atomic masses of all the atoms in one formula unit, and call it the formula unit mass. Both are measured in atomic mass units. The method is the same for both. In Class eleven you will meet the mole, which links these masses to amounts in grams.',
    }),
    sl('example', 'Worked example: molecular mass', {
      b: r`**Problem.** Find the molecular mass of (a) sulphuric acid, $\ce{H2SO4}$, and (b) glucose, $\ce{C6H12O6}$.

**(a)** $2 \times 1 + 32 + 4 \times 16 = ${m1.h2so4}$ u.

**(b)** $6 \times 12 + 12 \times 1 + 6 \times 16 = ${m1.glucose}$ u.`,
      v: table(['Molecule', 'Atoms', 'Working', 'Molecular mass'], [['Sulphuric acid', '2 H, 1 S, 4 O', '2 + 32 + 64', `${m1.h2so4} u`], ['Glucose', '6 C, 12 H, 6 O', '72 + 12 + 96', `${m1.glucose} u`]], 'Table of the atoms, working and molecular mass for sulphuric acid and glucose'),
      n: 'For sulphuric acid, count two hydrogen atoms, one sulphur atom and four oxygen atoms. Add two times one, thirty two, and four times sixteen. That gives ninety eight atomic mass units. For glucose, count six carbon, twelve hydrogen and six oxygen atoms. Add seventy two, twelve and ninety six. That gives one hundred and eighty atomic mass units.',
    }),
    sl('example', 'Worked example: formula unit mass', {
      b: r`**Problem.** Find the formula unit mass of (a) $\ce{K2CO3}$, (b) $\ce{Mg(OH)2}$, (c) $\ce{Al2(SO4)3}$.

**(a)** $2 \times 39 + 12 + 3 \times 16 = ${m2.k2co3}$ u.

**(b)** $24 + 2 \times (16 + 1) = ${m2.mgoh2}$ u.

**(c)** $2 \times 27 + 3 \times (32 + 4 \times 16) = ${m2.al2so43}$ u. A subscript outside a bracket multiplies **every** atom inside it.`,
      v: table(['Compound', 'Atoms in a formula unit', 'Formula unit mass'], [['K2CO3', '2 K, 1 C, 3 O', `${m2.k2co3} u`], ['Mg(OH)2', '1 Mg, 2 O, 2 H', `${m2.mgoh2} u`], ['Al2(SO4)3', '2 Al, 3 S, 12 O', `${m2.al2so43} u`]], 'Table of the atoms in one formula unit and the formula unit mass for three compounds'),
      n: 'For potassium carbonate, add two times thirty nine, twelve, and three times sixteen, which gives one hundred and thirty eight. For magnesium hydroxide, add twenty four and two times the mass of the hydroxide group, which is seventeen. That gives fifty eight. For aluminium sulphate, a subscript outside a bracket multiplies every atom inside. The total is three hundred and forty two.',
    }),
    sl('concept', 'Reading a formula correctly', {
      b: r`A **subscript** counts atoms of the element before it. A subscript after a **bracket** counts the whole group. A **number in front** of a formula counts whole molecules or formula units: $\ce{3H2O}$ is three molecules of water, with $3 \times 2 = 6$ hydrogen atoms and 3 oxygen atoms. Changing a subscript changes the substance: $\ce{H2O}$ is water but $\ce{H2O2}$ is hydrogen peroxide.`,
      v: table(['Written', 'Means', 'Atoms in all'], [['H2O', 'one water molecule', '3'], ['3H2O', 'three water molecules', '9'], ['Ca(NO3)2', 'one formula unit of calcium nitrate', '9'], ['2Ca(NO3)2', 'two formula units', '18']], 'Table of four ways of writing formulae with what each means and the total number of atoms'),
      n: 'Read a formula with care. A subscript counts the atoms of the element before it. A subscript after a bracket counts the whole group. A number in front counts whole molecules. So three water molecules have six hydrogen atoms and three oxygen atoms, nine atoms in all. Changing a subscript changes the substance, so water and hydrogen peroxide are quite different.',
    }),
    sl('check', 'Quick check: finding a mass', {
      b: 'Decide on the molecular mass of a given compound.',
      n: 'Quick check. Add up the atomic masses of all the atoms in one molecule of the compound, remembering to multiply by each subscript.',
      chk: 'chk-mass',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'A molecule is two or more atoms bonded together; atomicity is the number of atoms in a molecule of an element.',
        'Ions are charged atoms or groups; polyatomic ions such as sulphate and ammonium stay together.',
        'Criss-cross: valency of the cation becomes the subscript of the anion and the reverse; divide by a common factor; use brackets for polyatomic ions.',
        'Molecular mass or formula unit mass is the sum of the atomic masses of all the atoms in the formula.',
        'A subscript after a bracket multiplies every atom inside the bracket.',
      ],
      v: table(['Compound', 'Formula', 'Mass (u)'], [['Water', 'H2O', '18'], ['Sulphuric acid', 'H2SO4', '98'], ['Magnesium hydroxide', 'Mg(OH)2', '58'], ['Aluminium sulphate', 'Al2(SO4)3', '342']], 'Table of four compounds with their formula and molecular or formula unit mass'),
      n: 'To sum up. A molecule is a group of bonded atoms, and atomicity is the number of atoms in a molecule of an element. Ions are charged atoms or groups of atoms. We write ionic formulae by criss crossing the valencies, dividing by any common factor and putting polyatomic ions in brackets when needed. Molecular mass and formula unit mass are sums of atomic masses.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the cation first, show valencies, criss-cross, and reduce by any common factor.',
        'Use brackets for a polyatomic ion with subscript more than 1: Ca(NO3)2, not CaNO32.',
        'Check the formula for neutrality: total positive charge equals total negative charge.',
        'In mass calculations, write each term, for example 2 × 1 + 32 + 4 × 16, and then the sum with the unit u.',
        'For ionic compounds say formula unit mass, not molecular mass.',
      ],
      n: 'Some exam tips. Write the cation first, show the valencies, criss cross them and reduce by any common factor. Use a bracket when a polyatomic ion has a subscript more than one. Check that the total positive charge equals the total negative charge. In mass calculations, write each term and then the sum, with the unit. For ionic compounds, say formula unit mass.',
    }),
  ],
});
