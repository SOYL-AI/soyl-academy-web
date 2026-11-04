// ch08 Atoms and Molecules — question bank. MCQ keys are placed by the builder (balanced).
// AR keys planned: cons-ar c, prop-ar a, iso-ar b, form-ar d, atom-ar a, mass-ar c.
// Every numerical and every formula item is computed here (data.mjs), interpolated into stem and solution, and re-solved.
import { mk, add, r, near, dec } from './lib.mjs';
import { mass, crisscross, ION, natoms } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const ce = (f) => `$\\ce{${f}}$`;
const cc = (a, b) => crisscross(ION[a], ION[b]).formula;

// ---------------------------------------------------------------- t01 laws of chemical combination
add('chk-cons', mcq({
  stem: 'Marble chips are dropped into acid in an open conical flask kept on a balance, and the reading slowly falls. The best explanation is that:',
  right: 'carbon dioxide gas escapes into the air, so the mass has left the flask and not vanished',
  wrong: ['mass is destroyed in every chemical reaction', 'the marble changes into energy during the reaction', 'the acid evaporates completely into the air'],
  sol: 'Mass is conserved, but in an open flask the gas formed escapes, so the balance shows less. The missing mass is in the carbon dioxide — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cons-mcq', (() => {
  const fe = 5.6, s = 3.2;
  const fes = fe + s;
  return mcq({
    stem: `${fe} g of iron powder reacts completely with ${s} g of sulphur in a closed tube to form iron sulphide. The mass of iron sulphide formed is:`,
    right: `${dec(fes, 2)} g`,
    wrong: [`${dec(fe - s, 2)} g`, `${dec(fe, 2)} g`, `${dec(fes * 2, 3)} g`],
    sol: r`By the law of conservation of mass, mass of product $= ${fe} + ${s} = ${dec(fes, 2)}$ g — option (@K).`,
    d: 1, c: 'application', t: [1],
  });
})(), () => near(5.6 + 3.2, 8.8, 1e-9) || 'cons');
add('prop-mcq', (() => {
  const s1 = { tot: 8.5, n: 7.0 };
  const s2 = { tot: 3.4, n: 2.8 };
  const h1 = s1.tot - s1.n;
  const h2 = s2.tot - s2.n;
  return mcq({
    stem: `Two samples of ammonia are analysed. Sample 1 (${s1.tot} g) contains ${s1.n} g of nitrogen, and sample 2 (${s2.tot} g) contains ${s2.n} g of nitrogen. The data support:`,
    right: 'the law of constant proportions, because nitrogen and hydrogen are in the same ratio in both',
    wrong: ['the law of conservation of mass, because the total masses are equal', 'Dalton\'s postulate that atoms are indivisible', 'the law of constant proportions, because both samples are 14 g of nitrogen'],
    sol: r`Hydrogen in sample 1 $= ${s1.tot} - ${s1.n} = ${dec(h1, 2)}$ g, so $\text{N} : \text{H} = ${s1.n} : ${dec(h1, 2)} = 14 : 3$. In sample 2, hydrogen $= ${s2.tot} - ${s2.n} = ${dec(h2, 2)}$ g, so $\text{N} : \text{H} = ${s2.n} : ${dec(h2, 2)} = 14 : 3$. The ratios agree — option (@K).`,
    d: 3, c: 'analysis', t: [1],
  });
})(), () => near(7.0 / 1.5, 2.8 / 0.6, 1e-9) || 'prop');
add('chk-prop', mcq({
  stem: 'A chemist finds that pure samples of one compound from three different mines all contain the same elements in exactly the same ratio by mass. This is an example of the law of:',
  right: 'constant proportions',
  wrong: ['conservation of mass', 'conservation of energy', 'indivisibility of atoms'],
  sol: 'A fixed ratio of elements by mass in every pure sample of a compound is the law of constant proportions — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('rust-mcq', mcq({
  stem: 'An iron gate in a coastal town is weighed before the monsoon and again after it has rusted, and it is found to be heavier. This:',
  right: 'does not break the law of conservation of mass, because oxygen and water from the surroundings joined the iron',
  wrong: ['breaks the law of conservation of mass, because mass has been created', 'shows that iron atoms are created during rusting', 'shows that the gate was not weighed accurately'],
  sol: 'The gate gained the mass of the oxygen and water that combined with it. Counting these, the total mass is conserved — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('cons-ar', ar({
  a: 'When a strip of magnesium ribbon is burnt in an open dish, the white ash weighs more than the ribbon.',
  r: 'The law of conservation of mass is not obeyed when a metal burns in air.',
  key: 'c',
  sol: 'A is true: oxygen from the air combines with the metal, so the ash is heavier. R is false: the law is obeyed once the mass of oxygen is counted — option (c).',
  d: 3, c: 'analysis', t: [1],
}));
add('prop-ar', ar({
  a: 'Ammonia made in a laboratory and ammonia made in a factory both have nitrogen and hydrogen in the mass ratio 14 : 3.',
  r: 'A pure compound has its elements in a fixed ratio by mass, however it is prepared.',
  key: 'a',
  sol: 'A is true and R states the law of constant proportions, which explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('loss-tf', tf({
  stem: 'In a reaction carried out in a closed vessel, the total mass of the products is less than that of the reactants if a gas is formed.',
  key: 'f',
  sol: 'False. In a closed vessel the gas stays inside, and the total mass of the products equals the total mass of the reactants.',
  d: 2, c: 'understanding', t: [1],
}));
add('candle-short', short({
  marks: 2,
  stem: 'A candle burns down and seems to lose mass. How is this consistent with the law of conservation of mass?',
  model: 'The wax burns with oxygen from the air and forms carbon dioxide and water vapour, which escape into the air. The mass of the wax and oxygen used equals the mass of these gases, so the total mass is conserved even though the candle gets lighter.',
  sol: 'Products are gases that escape; wax plus oxygen equals products.',
  scheme: [['Products are gases (carbon dioxide and water vapour) that escape', 1], ['Mass of wax plus oxygen used equals mass of products', 1]],
  d: 2, c: 'application', t: [1],
}));
add('prop-short', (() => {
  const a = { w: 18, h: 2 };
  const b = { w: 9, h: 1 };
  return short({
    marks: 2,
    stem: `Priya says that ${a.w} g of river water and ${b.w} g of well water must have hydrogen and oxygen in the same ratio by mass. If the river sample has ${a.h} g of hydrogen, find the mass of hydrogen in the well sample and state the law used.`,
    model: 'River water has 18 − 2 = 16 g of oxygen, a ratio of 1 : 8. Water is a pure compound, so by the law of constant proportions the well sample also has hydrogen and oxygen in the ratio 1 : 8, which gives 1 g of hydrogen and 8 g of oxygen in 9 g.',
    sol: 'Ratio 1 : 8; well water has 1 g of hydrogen; law of constant proportions.',
    scheme: [['River water ratio H : O = 2 : 16 = 1 : 8', 1], ['Same ratio by the law of constant proportions, so 1 g of hydrogen in 9 g', 1]],
    d: 3, c: 'application', t: [1],
  });
})());
add('verify-short', short({
  marks: 3,
  stem: 'Describe an activity that verifies the law of conservation of mass, and say why the vessel is closed.',
  model: 'Place a small tube of acid and marble chips in a flask, close it with a balloon and weigh it. Tip the acid onto the marble so that gas forms and fills the balloon, then weigh again. The two readings are equal. The vessel is closed so that no gas can escape or enter, which would change the reading.',
  sol: 'Closed flask, weigh before and after, equal readings, no gas escapes.',
  scheme: [['Reactants weighed in a closed flask before the reaction', 1], ['Weighed again after: the readings are equal', 1], ['Closed so that no gas can escape or enter', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('laws-long', (() => {
  const x = { cao: 5.6, ca: 4.0 };
  const y = { cao: 2.8, ca: 2.0 };
  const ox = x.cao - x.ca;
  const oy = y.cao - y.ca;
  return long({
    stem: `(a) State the law of conservation of mass and say why it is verified in a closed vessel.\n\n(b) Calcium oxide made by heating limestone has ${x.ca} g of calcium in a ${x.cao} g sample. Calcium oxide made by burning calcium in air has ${y.ca} g of calcium in a ${y.cao} g sample. Show that the data obey the law of constant proportions.\n\n(c) State what the law tells us about any third sample of calcium oxide.`,
    model: `The law of conservation of mass says that the total mass of the products equals that of the reactants in a chemical reaction. A closed vessel is used so that no gas can escape or enter. In (b), the first sample has 5.6 − 4.0 = 1.6 g of oxygen, so Ca : O = 4.0 : 1.6 = 5 : 2. The second has 2.8 − 2.0 = 0.8 g of oxygen, so Ca : O = 2.0 : 0.8 = 5 : 2. The ratios are equal, so the law is obeyed. In (c), any other sample of calcium oxide must also have calcium and oxygen in the ratio 5 : 2.`,
    sol: 'Total mass of products equals reactants; closed vessel; Ca : O = 5 : 2 in both samples; a third sample also 5 : 2.',
    scheme: [['(a) Statement and reason for a closed vessel', 1.5], ['(b) Oxygen found by subtraction and both ratios 5 : 2', 2.5], ['(c) A third sample also has Ca : O = 5 : 2', 1]],
    d: 3, c: 'application', t: [1],
  });
})(), () => near(4.0 / (5.6 - 4.0), 2.0 / (2.8 - 2.0), 1e-9) && near(4.0 / 1.6, 2.5, 1e-9) || 'laws');
add('water-case', mk.case({
  passage: r`A teacher gives three groups water from different sources. Each group decomposes a sample and weighs the hydrogen obtained. The masses are given for practice.

| Source | Mass of water decomposed (g) | Mass of hydrogen (g) |
|---|---|---|
| River | 36.0 | 4.0 |
| Well | 9.0 | 1.0 |
| Rain | 13.5 | 1.5 |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The mass of oxygen in the river-water sample is:',
      right: '32.0 g',
      wrong: ['4.0 g', '36.0 g', '8.0 g'],
      sol: 'By conservation of mass, oxygen $= 36.0 - 4.0 = 32.0$ g — option (@K).',
      d: 1, c: 'application', t: [1],
    })),
    part('b', short({
      marks: 1,
      stem: 'Find the ratio of hydrogen to oxygen by mass in the well-water sample.',
      model: r`Oxygen $= 9.0 - 1.0 = 8.0$ g, so H : O $= 1.0 : 8.0 = 1 : 8$.`,
      sol: 'Oxygen = 8.0 g; ratio 1 : 8.',
      scheme: [['H : O = 1 : 8', 1]],
      wl: null,
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Name the law that the three results illustrate and state it.',
      model: 'They illustrate the law of constant proportions: a pure compound always has the same elements in the same ratio by mass, whatever its source.',
      sol: 'Law of constant proportions.',
      scheme: [['Law of constant proportions', 1], ['Statement of the law', 1]],
      d: 2, c: 'understanding', t: [1],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Using the same ratio, find the mass of oxygen in 54 g of water from a fourth source.',
        model: r`Hydrogen is 1/9 and oxygen 8/9 of the mass of water. Oxygen $= 8/9 \times 54 = 48$ g.`,
        sol: 'Oxygen fraction 8/9; 8/9 × 54 = 48 g.',
        scheme: [['Oxygen is 8/9 of the water by mass', 1], ['8/9 × 54 = 48 g', 1]],
        d: 3, c: 'application', t: [1],
      }),
    ]),
  ],
}), null);
add('flask-case', mk.case({
  passage: r`A student carries out the same reaction between marble chips and acid in two flasks and weighs each flask with its contents. The values are given for practice.

| Flask | Mass before (g) | Mass after (g) |
|---|---|---|
| Closed with a stopper | 101.50 | 101.50 |
| Open to the air | 101.50 | 100.40 |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which statement about the two flasks is correct?',
      right: 'Both obey the law of conservation of mass; the open flask lost a gas to the air',
      wrong: ['Only the closed flask obeys the law of conservation of mass', 'Only the open flask obeys the law of conservation of mass', 'Neither obeys it, because the readings differ'],
      sol: 'The law holds for both. In the open flask a gas escaped, so the balance reading fell, but the mass was not destroyed — option (@K).',
      d: 2, c: 'analysis', t: [1],
    })),
    part('b', short({
      marks: 1,
      stem: 'What mass of gas escaped from the open flask?',
      model: r`$101.50 - 100.40 = 1.10$ g.`,
      sol: 'Mass lost = 101.50 − 100.40 = 1.10 g.',
      scheme: [['1.10 g', 1]],
      wl: null,
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Why did the closed flask show no change in mass?',
      model: 'The gas formed could not escape from the closed flask, so the total mass of the contents stayed the same, as the law of conservation of mass requires.',
      sol: 'No gas escaped from the closed flask.',
      scheme: [['The gas stayed inside the closed flask', 1], ['So the total mass was unchanged, as the law states', 1]],
      d: 2, c: 'understanding', t: [1],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Name the gas that escaped from the open flask and suggest how to prevent the loss.',
        model: 'The gas was carbon dioxide. The loss can be prevented by closing the flask with a stopper or fitting a balloon over the mouth.',
        sol: 'Carbon dioxide; close the flask or use a balloon.',
        scheme: [['Carbon dioxide', 1], ['Close the flask, or use a balloon', 1]],
        d: 2, c: 'application', t: [1],
      }),
    ]),
  ],
}), null);

// ---------------------------------------------------------------- t02 Dalton's atomic theory
add('chk-dal', mcq({
  stem: 'Which statement of Dalton\'s atomic theory had to be modified after electrons, protons and neutrons were discovered?',
  right: 'Atoms are indivisible',
  wrong: ['Atoms combine in small whole-number ratios to form simple compounds', 'Atoms are rearranged in a chemical reaction', 'Matter is made of atoms'],
  sol: 'The discovery of subatomic particles showed that atoms can be divided into smaller particles, so the idea that atoms are indivisible needed to be changed — option (@K). The other statements are still accepted for ordinary chemical changes.',
  d: 2, c: 'understanding', t: [2],
}));
add('dal-mcq', mcq({
  stem: 'Chlorine atoms of masses 35 u and 37 u both occur in nature. This does not agree with the Dalton postulate that:',
  right: 'all atoms of an element are identical in mass',
  wrong: ['atoms are neither created nor destroyed in a reaction', 'atoms combine in small whole-number ratios', 'atoms of different elements differ in mass'],
  sol: 'Atoms of the same element with different masses are isotopes. They contradict the postulate that all atoms of an element are identical in mass — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('lim-mcq', mcq({
  stem: 'Argon and calcium atoms can both have a mass number of 40. This is a limitation of Dalton\'s theory because it said that:',
  right: 'atoms of different elements have different masses, but here they can be equal',
  wrong: ['atoms of the same element have different masses', 'atoms can be created in reactions', 'atoms are divisible into smaller particles'],
  sol: 'Atoms of different elements with the same mass are called isobars. They go against the postulate that atoms of different elements differ in mass — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('dalton-explain-mcq', mcq({
  stem: 'Which postulate of Dalton\'s theory gives the simplest explanation of the law of conservation of mass?',
  right: 'Atoms cannot be created or destroyed in a chemical reaction; they are only rearranged',
  wrong: ['Atoms of different elements have different masses', 'Matter is made of very small particles', 'Atoms of an element are identical in all their properties'],
  sol: 'If atoms are only rearranged, the atoms and hence the total mass before and after are the same — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('iso-ar', ar({
  a: 'Atoms of the same element can have different masses.',
  r: 'Atoms are made of electrons, protons and neutrons.',
  key: 'b',
  sol: 'A is true (isotopes). R is true, but it does not explain A: isotopes differ in the number of neutrons, a point that R does not state — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('dalton-fill', fill({
  stem: 'According to Dalton\'s theory, atoms can neither be created nor ___ in a chemical reaction.',
  acc: [['destroyed']],
  sol: 'The postulate says atoms cannot be created or **destroyed**.',
  d: 1, c: 'recall', t: [2],
}));
add('dalton-short', short({
  marks: 2,
  stem: 'How does Dalton\'s atomic theory explain the law of conservation of mass?',
  model: 'According to the theory, atoms are neither created nor destroyed in a chemical reaction, but only rearranged. The number and the mass of the atoms are the same before and after, so the total mass of the products equals that of the reactants.',
  sol: 'Atoms are only rearranged, so mass is unchanged.',
  scheme: [['Atoms are only rearranged, not created or destroyed', 1], ['So the same atoms and the same total mass before and after', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('lim-short', short({
  marks: 2,
  stem: 'State two limitations of Dalton\'s atomic theory.',
  model: 'Atoms are not indivisible, since they contain electrons, protons and neutrons. Atoms of the same element can have different masses, which are called isotopes, and atoms of different elements can have the same mass, which are called isobars, so two of Dalton\'s postulates need correction.',
  sol: 'Atoms are divisible; isotopes and isobars.',
  scheme: [['Atoms are divisible into subatomic particles', 1], ['Isotopes or isobars contradict the postulates on mass', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('post-short', short({
  marks: 3,
  stem: 'State any three postulates of Dalton\'s atomic theory.',
  model: 'All matter is made of very small particles called atoms. Atoms of one element are identical in mass and properties, while atoms of different elements differ. Atoms combine in small whole-number ratios to form compounds, and in a chemical reaction they are neither created nor destroyed but only rearranged.',
  sol: 'Any three of the five postulates.',
  scheme: [['One correct postulate', 1], ['A second correct postulate', 1], ['A third correct postulate', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('dalton-long', long({
  stem: '(a) State the five postulates of Dalton\'s atomic theory.\n\n(b) Explain how the theory accounts for the law of constant proportions.\n\n(c) Give two reasons why the theory had to be modified.',
  model: 'Dalton said that matter is made of atoms, that atoms of one element are identical, that atoms of different elements differ, that atoms combine in small whole-number ratios to form compounds, and that atoms are not created or destroyed in a reaction. In (b), every particle of a compound has the same atoms in the same ratio, and each atom has a fixed mass, so the ratio by mass is the same in every sample. In (c), atoms are divisible, and isotopes show that atoms of one element can differ in mass.',
  sol: 'Five postulates; fixed atom ratio and fixed atomic mass give a fixed mass ratio; atoms divisible and isotopes.',
  scheme: [['(a) Five postulates, 0.5 mark each, to a maximum of 2.5', 2.5], ['(b) Fixed ratio of atoms and fixed atomic masses', 1.5], ['(c) Two reasons for modification', 1]],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 molecules, ions and formulae
add('chk-atom', mcq({
  stem: 'How many atoms are there in one molecule of ozone, and what is its atomicity?',
  right: 'Three atoms; triatomic',
  wrong: ['Two atoms; diatomic', 'One atom; monoatomic', 'Four atoms; tetratomic'],
  sol: 'Ozone is $\\ce{O3}$, with three oxygen atoms per molecule, so it is triatomic — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-form', (() => {
  const f = cc('Ca', 'NO3');
  return mcq({
    stem: 'Calcium has valency 2 and the nitrate ion has valency 1. The formula of calcium nitrate is:',
    right: ce(f),
    wrong: [ce('CaNO3'), ce('Ca2NO3'), ce('Ca(NO3)')],
    sol: r`Criss-crossing the valencies gives Ca with subscript 1 and $\ce{NO3}$ with subscript 2. The group is put in a bracket: $\ce{${f}}$ — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})(), () => cc('Ca', 'NO3') === 'Ca(NO3)2' || 'cano3');
add('atomicity-mcq', mcq({
  stem: 'The atomicity of white phosphorus, $\\ce{P4}$, and of argon are respectively:',
  right: '4 and 1',
  wrong: ['1 and 4', '4 and 2', '2 and 1'],
  sol: 'A molecule of white phosphorus has four atoms. Argon is a noble gas whose molecule is a single atom, so its atomicity is 1 — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ion-mcq', mcq({
  stem: 'A magnesium atom loses two electrons to form an ion. The ion is:',
  right: 'a cation with a charge of 2+',
  wrong: ['a cation with a charge of 1+', 'an anion with a charge of 2−', 'a neutral atom of smaller mass'],
  sol: 'Losing two negatively charged electrons leaves a particle with a charge of 2+. A positive ion is a cation — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('formula-mcq', (() => {
  const f = cc('NH4', 'SO4');
  return mcq({
    stem: 'The ammonium ion has valency 1 and the sulphate ion has valency 2. The formula of ammonium sulphate is:',
    right: ce(f),
    wrong: [ce('NH4SO4'), ce('NH4(SO4)2'), ce('NH42SO4')],
    sol: r`Crossing over gives two ammonium ions and one sulphate ion; the polyatomic ammonium is bracketed: $\ce{${f}}$ — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})(), () => cc('NH4', 'SO4') === '(NH4)2SO4' || 'amm');
add('count-mcq', (() => {
  const n = natoms('Ca(NO3)2');
  return mcq({
    stem: `The total number of atoms in one formula unit of calcium nitrate, ${ce('Ca(NO3)2')}, is:`,
    right: String(n),
    wrong: ['6', '5', '12'],
    sol: r`One Ca, plus two nitrate groups of 1 N and 3 O each: $1 + 2 \times (1 + 3) = 1 + 8 = ${n}$ — option (@K).`,
    d: 3, c: 'application', t: [3],
  });
})(), () => natoms('Ca(NO3)2') === 9 || 'count');
add('form-ar', ar({
  a: 'The formula of aluminium sulphate is $\\ce{Al3(SO4)2}$.',
  r: 'Aluminium has a valency of 3 and the sulphate ion has a valency of 2.',
  key: 'd',
  sol: 'A is false: crossing the valencies gives $\\ce{Al2(SO4)3}$. R is true, and it is the data from which the correct formula is found — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('atom-ar', ar({
  a: 'A molecule of ozone is triatomic.',
  r: 'Each molecule of ozone contains three oxygen atoms.',
  key: 'a',
  sol: 'A is true and R is the reason: atomicity is the number of atoms in a molecule, and ozone has three — option (a).',
  d: 1, c: 'understanding', t: [3],
}));
add('ammonium-tf', tf({
  stem: 'The ammonium ion, $\\ce{NH4+}$, is a polyatomic cation.',
  key: 't',
  sol: 'True. It is a group of five atoms carrying a 1+ charge as a whole.',
  d: 2, c: 'understanding', t: [3],
}));
add('tri-fill', fill({
  stem: 'A molecule that contains three atoms is called a ___ molecule.',
  acc: [['triatomic']],
  sol: 'A molecule with three atoms is **triatomic**.',
  d: 1, c: 'recall', t: [3],
}));
add('atomicity-match', match({
  stem: 'Match each substance (Column A) with its atomicity (Column B).',
  pairs: [
    ['Helium gas in a party balloon', 'Monoatomic'],
    ['Chlorine gas used to disinfect water', 'Diatomic'],
    ['Ozone in the upper atmosphere', 'Triatomic'],
    ['White phosphorus kept under water', 'Tetratomic'],
  ],
  order: [1, 0, 3, 2],
  sol: 'Helium has single atoms, chlorine is $\\ce{Cl2}$, ozone is $\\ce{O3}$ and white phosphorus is $\\ce{P4}$.',
  d: 2, c: 'understanding', t: [3],
}));
add('ion-match', match({
  stem: 'A school laboratory shelf carries four reagents. Match the ion named in Column A with its formula in Column B.',
  pairs: [
    ['Ammonium ion', ce('NH4+')],
    ['Nitrate ion', ce('NO3-')],
    ['Carbonate ion', ce('CO3^2-')],
    ['Aluminium ion', ce('Al^3+')],
  ],
  order: [3, 0, 2, 1],
  sol: 'Ammonium is $\\ce{NH4+}$, nitrate is $\\ce{NO3-}$, carbonate is $\\ce{CO3^2-}$ and aluminium is $\\ce{Al^3+}$.',
  d: 2, c: 'recall', t: [3],
}));
add('atomicity-short', short({
  marks: 2,
  stem: 'Define atomicity and state the atomicity of hydrogen gas, ozone and sulphur ($\\ce{S8}$).',
  model: 'Atomicity is the number of atoms present in one molecule of an element. Hydrogen is diatomic, with two atoms in a molecule. Ozone is triatomic, with three atoms, and sulphur is octa-atomic, with eight atoms in its molecule.',
  sol: 'Definition; 2, 3 and 8.',
  scheme: [['Definition of atomicity', 1], ['Atomicity 2, 3 and 8 for the three substances', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('poly-short', short({
  marks: 2,
  stem: 'What is a polyatomic ion? Give two examples with their formulae and charges.',
  model: 'A polyatomic ion is a group of atoms bonded together that carries an electric charge as a whole and stays together in reactions. Examples are the sulphate ion, SO4 with a 2− charge, and the ammonium ion, NH4 with a 1+ charge.',
  sol: 'Charged group of atoms; sulphate 2−; ammonium 1+.',
  scheme: [['Definition of a polyatomic ion', 1], ['Two examples with formula and charge', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('criss-short', (() => {
  const x = crisscross(ION.Mg, ION.NO3);
  return short({
    marks: 3,
    stem: 'Write the formula of magnesium nitrate by the criss-cross method, showing each step, and check that it is neutral.',
    model: r`Mg has valency 2 and the nitrate ion $\ce{NO3}$ has valency 1. Crossing over gives Mg with subscript 1 and $\ce{NO3}$ with subscript 2. Since nitrate is a polyatomic ion with subscript 2, it is bracketed, giving $\ce{${x.formula}}$. Check: positive charge $1 \times 2 = 2$, negative charge $2 \times 1 = 2$, so the formula is neutral.`,
    sol: 'Valencies 2 and 1; criss-cross; bracket the nitrate; neutrality check.',
    scheme: [['Valencies: Mg 2, nitrate 1', 1], ['Criss-cross and the bracket give Mg(NO3)2', 1], ['Neutrality check: 2 positive and 2 negative', 1]],
    d: 2, c: 'application', t: [3],
  });
})(), () => crisscross(ION.Mg, ION.NO3).formula === 'Mg(NO3)2' || 'mgno3');
add('crossB-short', (() => {
  const a = cc('Al', 'OH');
  const b = cc('NH4', 'SO4');
  const c2 = crisscross(ION.Mg, ION.O);
  return short({
    marks: 3,
    stem: 'Using valencies, write the formulae of (i) aluminium hydroxide, (ii) ammonium sulphate and (iii) magnesium oxide. State the extra step needed in (iii).',
    model: r`(i) Aluminium has valency 3 and hydroxide has valency 1, so crossing over gives $\ce{${a}}$, with the hydroxide group bracketed. (ii) Ammonium has valency 1 and sulphate has valency 2, so the formula is $\ce{${b}}$. (iii) Magnesium and oxygen both have valency 2 and first give $\ce{Mg2O2}$. The extra step is to divide both subscripts by their common factor 2, which gives $\ce{${c2.formula}}$.`,
    sol: 'Al(OH)3, (NH4)2SO4, MgO after dividing by 2.',
    scheme: [['(i) Al(OH)3', 1], ['(ii) (NH4)2SO4', 1], ['(iii) MgO, after dividing by the common factor', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => cc('Al', 'OH') === 'Al(OH)3' && cc('NH4', 'SO4') === '(NH4)2SO4' && cc('Mg', 'O') === 'MgO' || 'crossB');
add('ions-long', long({
  stem: '(a) Define atom, molecule and ion. Name one example of each.\n\n(b) What is atomicity? Give the atomicity of helium, oxygen, ozone and white phosphorus.\n\n(c) Why do we speak of a formula unit and not a molecule of sodium chloride?',
  model: 'An atom is the smallest particle of an element that takes part in a chemical reaction, such as an atom of helium. A molecule is a group of two or more bonded atoms, such as water, and an ion is a charged atom or group of atoms, such as the chloride ion. In (b), atomicity is the number of atoms in a molecule of an element; the values are 1, 2, 3 and 4. In (c), sodium chloride has no separate molecules, only a repeating pattern of sodium and chloride ions, so we give the simplest ratio of ions as a formula unit.',
  sol: 'Definitions with examples; atomicity 1, 2, 3, 4; ionic compounds have a repeating pattern, not molecules.',
  scheme: [['(a) Three definitions with examples', 2], ['(b) Definition of atomicity and the four values', 1.5], ['(c) Repeating pattern of ions, no separate molecules', 1.5]],
  d: 2, c: 'understanding', t: [3],
}));
add('cross-long', (() => {
  const f = [cc('Al', 'Cl'), cc('Na', 'SO4'), cc('Ca', 'OH'), cc('K', 'HCO3')];
  return long({
    stem: '(a) List the steps of the criss-cross method of writing a formula.\n\n(b) Use it to write the formulae of (i) aluminium chloride, (ii) sodium sulphate, (iii) calcium hydroxide and (iv) potassium hydrogencarbonate.',
    model: r`In (a), write the cation first and then the anion, write the valency of each, cross them over so that the valency of one becomes the subscript of the other, divide by any common factor, and put a polyatomic ion in a bracket if its subscript is more than 1. In (b), (i) Al (3) and Cl (1) give $\ce{${f[0]}}$; (ii) Na (1) and sulphate (2) give $\ce{${f[1]}}$; (iii) Ca (2) and hydroxide (1) give $\ce{${f[2]}}$ with a bracket; (iv) K (1) and hydrogencarbonate (1) give $\ce{${f[3]}}$.`,
    sol: 'Steps: cation first, valencies, cross, reduce, bracket; AlCl3, Na2SO4, Ca(OH)2, KHCO3.',
    scheme: [['(a) Steps of the method', 1.5], ['(b) Two formulae correct, 0.75 mark each', 1.5], ['(b) Other two formulae correct, 1 mark each', 2]],
    d: 3, c: 'application', t: [3],
  });
})(), () => ['AlCl3', 'Na2SO4', 'Ca(OH)2', 'KHCO3'].every((x, i) => [cc('Al', 'Cl'), cc('Na', 'SO4'), cc('Ca', 'OH'), cc('K', 'HCO3')][i] === x) || 'cross-long');
add('formula-case', mk.case({
  passage: r`A student writes the formulae of four compounds in her notebook.

| Compound | Her formula |
|---|---|
| Calcium chloride | $\ce{CaCl}$ |
| Aluminium oxide | $\ce{Al3O2}$ |
| Sodium sulphate | $\ce{Na2SO4}$ |
| Magnesium hydroxide | $\ce{MgOH2}$ |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which of her formulae is correct?',
      right: ce('Na2SO4'),
      wrong: [ce('CaCl'), ce('Al3O2'), ce('MgOH2')],
      sol: 'Na (1) and sulphate (2) cross over to give $\\ce{Na2SO4}$, so it is correct — option (@K). The others have wrong subscripts.',
      d: 2, c: 'application', t: [3],
    })),
    part('b', short({
      marks: 1,
      stem: 'Write the correct formula of aluminium oxide.',
      model: r`Al (3) and O (2) cross over to give $\ce{Al2O3}$.`,
      sol: 'Al2O3.',
      scheme: [['Al2O3', 1]],
      wl: null,
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Explain what is wrong with $\\ce{MgOH2}$ and write the correct formula.',
      model: r`The hydroxide group is polyatomic and has the subscript 2, so it must be in a bracket. Otherwise the 2 refers to hydrogen alone. The correct formula is $\ce{Mg(OH)2}$.`,
      sol: 'Bracket needed round OH; Mg(OH)2.',
      scheme: [['The polyatomic hydroxide group needs a bracket', 1], ['Correct formula Mg(OH)2', 1]],
      d: 3, c: 'analysis', t: [3],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Using valencies, show that $\\ce{CaCl}$ is wrong and give the correct formula.',
        model: r`Ca has valency 2 and Cl has valency 1. In $\ce{CaCl}$ the charges are $+2$ and $-1$, which do not cancel. Crossing over gives $\ce{CaCl2}$, where $+2$ and $2 \times (-1)$ cancel.`,
        sol: 'Charges do not balance; CaCl2.',
        scheme: [['Charges +2 and −1 do not cancel', 1], ['Correct formula CaCl2', 1]],
        d: 3, c: 'analysis', t: [3],
      }),
    ]),
  ],
}), null);
add('natoms-num', (() => {
  const n = natoms('Al2(SO4)3');
  return num({
    stem: `Aluminium sulphate is ${ce('Al2(SO4)3')}. How many atoms are present in one formula unit?`,
    value: n, tol: 0, unit: 'atoms',
    sol: r`2 Al atoms; each sulphate has 1 S and 4 O, so 3 sulphate groups have $3 \times 5 = 15$ atoms. Total $= 2 + 15 = ${n}$ atoms.`,
    scheme: [['Atoms in the three sulphate groups 3 × 5 = 15', 1], ['2 + 15 = 17 atoms', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => natoms('Al2(SO4)3') === 17 && q.answer.value === 17 || 'natoms');

// ---------------------------------------------------------------- numericals on t01 and t04
add('mgo-num', (() => {
  const mg = 3.6, oxide = 6.0;
  const o = oxide - mg;
  return num({
    stem: `A strip of magnesium of mass ${mg} g is burnt completely in air and forms ${oxide.toFixed(1)} g of magnesium oxide. Find the mass of oxygen that combined with the magnesium.`,
    value: o, tol: 0.05, unit: 'g',
    sol: r`By conservation of mass, oxygen $= ${oxide.toFixed(1)} - ${mg} = ${dec(o, 2)}$ g.`,
    scheme: [['Mass of oxide = mass of magnesium + mass of oxygen', 1], ['6.0 − 3.6 = 2.4 g', 1]],
    marks: 2, d: 2, c: 'application', t: [1],
  });
})(), (q) => near(6.0 - 3.6, 2.4, 1e-9) && near(q.answer.value, 2.4, 1e-9) || 'mgo');
add('nh3-num', (() => {
  const h = 4.5;
  const n = (h * 14) / 3;
  return num({
    stem: `In ammonia, nitrogen and hydrogen are always in the mass ratio 14 : 3. How many grams of nitrogen combine with ${h} g of hydrogen to form ammonia?`,
    value: n, tol: 0.1, unit: 'g',
    sol: r`$\text{N} : \text{H} = 14 : 3$, so nitrogen $= ${h} \times 14 / 3 = ${dec(n, 3)}$ g.`,
    scheme: [['Using the fixed ratio N : H = 14 : 3', 1], ['4.5 × 14 / 3 = 21 g', 1]],
    marks: 2, d: 3, c: 'application', t: [1],
  });
})(), (q) => near(4.5 * 14 / 3, 21, 1e-9) && q.answer.value === 21 || 'nh3');
add('co2-num', (() => {
  const c = 9.0;
  const o = (c * 8) / 3;
  const tot = c + o;
  return num({
    stem: `In carbon dioxide the mass ratio of carbon to oxygen is always 3 : 8. A student burns ${c.toFixed(1)} g of carbon completely. What mass of carbon dioxide is formed?`,
    value: tot, tol: 0.1, unit: 'g',
    sol: r`Oxygen needed $= ${c.toFixed(1)} \times 8/3 = ${dec(o, 3)}$ g. Carbon dioxide $= ${c.toFixed(1)} + ${dec(o, 3)} = ${dec(tot, 3)}$ g.`,
    scheme: [['Oxygen from the ratio 3 : 8: 9.0 × 8/3 = 24 g', 1], ['Carbon dioxide = 9.0 + 24 = 33 g', 1]],
    marks: 2, d: 3, c: 'application', t: [1],
  });
})(), (q) => near(9 + 9 * 8 / 3, 33, 1e-9) && q.answer.value === 33 || 'co2');
add('open-num', (() => {
  const b = 248.6, a = 246.4;
  const lost = b - a;
  return num({
    stem: `A flask with marble chips and acid is placed open on a balance. It reads ${b.toFixed(2)} g at the start and ${a.toFixed(2)} g when the reaction is over. Find the mass of gas that has escaped.`,
    value: lost, tol: 0.02, unit: 'g',
    sol: r`Mass of gas $= ${b.toFixed(2)} - ${a.toFixed(2)} = ${dec(lost, 3)}$ g.`,
    scheme: [['The loss in reading is the mass of gas that escaped', 1], ['248.60 − 246.40 = 2.20 g', 1]],
    marks: 2, d: 2, c: 'application', t: [1],
  });
})(), (q) => near(248.6 - 246.4, 2.2, 1e-6) && near(q.answer.value, 2.2, 1e-9) || 'open');
add('ch3cooh-num', (() => {
  const f = 'CH3COOH';
  const m = mass(f);
  return num({
    stem: `Ethanoic (acetic) acid, ${ce(f)}, is the acid in vinegar. Find its molecular mass in u. (C = 12, H = 1, O = 16)`,
    value: m, tol: 0, unit: 'u',
    sol: r`${ce(f)} has 2 C, 4 H and 2 O: $2 \times 12 + 4 \times 1 + 2 \times 16 = ${m}$ u.`,
    scheme: [['Atoms: 2 C, 4 H, 2 O', 1], ['24 + 4 + 32 = 60 u', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => mass('CH3COOH') === 24 + 4 + 32 && q.answer.value === 60 || 'ch3cooh');
add('amsulph-num', (() => {
  const f = '(NH4)2SO4';
  const m = mass(f);
  return num({
    stem: `A farmer in Haryana uses ammonium sulphate, ${ce(f)}, as a fertiliser. Find its formula unit mass in u. (N = 14, H = 1, S = 32, O = 16)`,
    value: m, tol: 0, unit: 'u',
    sol: r`$2 \times (14 + 4 \times 1) + 32 + 4 \times 16 = 2 \times 18 + 32 + 64 = ${m}$ u.`,
    scheme: [['Two NH4 groups: 2 × 18 = 36', 1], ['36 + 32 + 64 = 132 u', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => mass('(NH4)2SO4') === 36 + 32 + 64 && q.answer.value === 132 || 'amsulph');
add('cano3-num', (() => {
  const f = 'Ca(NO3)2';
  const m = mass(f);
  return num({
    stem: `Calculate the formula unit mass of calcium nitrate, ${ce(f)}, in u. (Ca = 40, N = 14, O = 16)`,
    value: m, tol: 0, unit: 'u',
    sol: r`$40 + 2 \times (14 + 3 \times 16) = 40 + 2 \times 62 = ${m}$ u.`,
    scheme: [['Each nitrate group has mass 14 + 48 = 62', 1], ['40 + 2 × 62 = 164 u', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => mass('Ca(NO3)2') === 40 + 124 && q.answer.value === 164 || 'cano3');
add('ozone-num', (() => {
  const d = mass('O3') - mass('O2');
  return num({
    stem: 'By how many u is the mass of one molecule of ozone greater than that of one molecule of oxygen gas? (O = 16)',
    value: d, tol: 0, unit: 'u',
    sol: r`Ozone $\ce{O3}$: $3 \times 16 = 48$ u. Oxygen $\ce{O2}$: $2 \times 16 = 32$ u. Difference $= 48 - 32 = ${d}$ u.`,
    scheme: [['Masses 48 u and 32 u', 1], ['Difference 48 − 32 = 16 u', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => mass('O3') === 48 && mass('O2') === 32 && q.answer.value === 16 || 'ozone');

// ---------------------------------------------------------------- t04 molecular mass and formula unit mass
add('chk-mass', (() => {
  const m = mass('HNO3');
  return mcq({
    stem: `What is the molecular mass of nitric acid, ${ce('HNO3')}? (H = 1, N = 14, O = 16)`,
    right: `${m} u`,
    wrong: ['31 u', '47 u', '79 u'],
    sol: r`$1 + 14 + 3 \times 16 = 1 + 14 + 48 = ${m}$ u — option (@K).`,
    d: 2, c: 'application', t: [4],
  });
})(), () => mass('HNO3') === 63 || 'hno3');
add('mm-mcq', mcq({
  stem: 'Which of these has the greatest molecular mass? (C = 12, H = 1, N = 14, O = 16)',
  right: ce('CO2'),
  wrong: [ce('NH3'), ce('CH4'), ce('H2O')],
  sol: r`$\ce{CO2}$: 44 u; $\ce{NH3}$: 17 u; $\ce{CH4}$: 16 u; $\ce{H2O}$: 18 u. The greatest is $\ce{CO2}$ — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => mass('CO2') === 44 && mass('NH3') === 17 && mass('CH4') === 16 && mass('H2O') === 18 || 'mm');
add('order-mcq', mcq({
  stem: 'Arranged in increasing order of molecular mass (C = 12, H = 1, N = 14, O = 16), methane, ammonia and water are:',
  right: 'methane, ammonia, water',
  wrong: ['water, ammonia, methane', 'ammonia, methane, water', 'methane, water, ammonia'],
  sol: r`$\ce{CH4}$ is 16 u, $\ce{NH3}$ is 17 u and $\ce{H2O}$ is 18 u, so the order is methane, ammonia, water — option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('diff-mcq', (() => {
  const cl = 2 * 35.5;
  return mcq({
    stem: `In one formula unit of calcium chloride, ${ce('CaCl2')}, the total mass contributed by chlorine is: (Cl = 35.5, Ca = 40)`,
    right: `${cl} u`,
    wrong: ['35.5 u', '40 u', '111 u'],
    sol: r`There are two chlorine atoms: $2 \times 35.5 = ${cl}$ u — option (@K). The full formula unit mass is $40 + 71 = 111$ u.`,
    d: 2, c: 'application', t: [4],
  });
})(), () => 2 * 35.5 === 71 || 'cl');
add('fu-mcq', mcq({
  stem: 'We write the formula unit mass of sodium chloride and not its molecular mass because:',
  right: 'it is a repeating pattern of ions and has no separate molecules',
  wrong: ['it is a molecule of two atoms', 'it has a mass that cannot be calculated', 'it is a gas'],
  sol: 'Sodium chloride is an ionic compound made of a continuous pattern of $\\ce{Na+}$ and $\\ce{Cl-}$ ions, so we use the simplest ratio of ions, the formula unit — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('mass-ar', ar({
  a: 'The term formula unit mass is used for sodium chloride.',
  r: 'Sodium chloride is made of separate NaCl molecules.',
  key: 'c',
  sol: 'A is true. R is false: sodium chloride is a repeating pattern of ions with no separate molecules — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('co2mass-tf', tf({
  stem: 'Using C = 12 and O = 16, the molecular mass of carbon dioxide is 28 u.',
  key: 'f',
  sol: 'False. $\\ce{CO2}$ has one carbon and two oxygen atoms: $12 + 2 \\times 16 = 44$ u.',
  d: 2, c: 'application', t: [4],
}));
add('fu-fill', fill({
  stem: 'The sum of the atomic masses of all the atoms in one formula unit of an ionic compound is its ___ mass.',
  acc: [['formula unit']],
  sol: 'It is the **formula unit** mass.',
  d: 1, c: 'recall', t: [4],
}));
add('fu-short', (() => {
  const m = mass('NaCl');
  return short({
    marks: 2,
    stem: 'Find the formula unit mass of sodium chloride (Na = 23, Cl = 35.5) and explain why we say "formula unit" and not "molecule".',
    model: r`Formula unit mass $= 23 + 35.5 = ${m}$ u. Sodium chloride is a crystal of sodium and chloride ions in a repeating pattern, so there are no separate molecules, and the formula unit is the simplest ratio of its ions.`,
    sol: 'Mass 58.5 u; repeating pattern of ions.',
    scheme: [['23 + 35.5 = 58.5 u', 1], ['A repeating pattern of ions, no separate molecules', 1]],
    d: 2, c: 'application', t: [4],
  });
})());
add('mass3-short', (() => {
  const a = mass('MgSO4');
  const b = mass('CaCl2');
  return short({
    marks: 3,
    stem: 'Calculate the formula unit masses of magnesium sulphate, $\\ce{MgSO4}$, and calcium chloride, $\\ce{CaCl2}$. Which is heavier and by how much? (Mg = 24, S = 32, O = 16, Ca = 40, Cl = 35.5)',
    model: r`To find a formula unit mass, add the atomic masses of all the atoms in the formula. For magnesium sulphate, $\ce{MgSO4}$: $24 + 32 + 4 \times 16 = ${a}$ u. For calcium chloride, $\ce{CaCl2}$: $40 + 2 \times 35.5 = ${b}$ u. Magnesium sulphate is the heavier of the two, and the difference is $${a} - ${b} = ${a - b}$ u.`,
    sol: 'MgSO4 120 u; CaCl2 111 u; MgSO4 heavier by 9 u.',
    scheme: [['MgSO4 = 120 u', 1], ['CaCl2 = 111 u', 1], ['MgSO4 is heavier by 9 u', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => mass('MgSO4') === 120 && mass('CaCl2') === 111 || 'mass3');
add('mass-long', long({
  stem: '(a) Distinguish molecular mass from formula unit mass.\n\n(b) Calculate the molecular mass of ethanol, $\\ce{C2H5OH}$, and the formula unit mass of sodium carbonate, $\\ce{Na2CO3}$. (C = 12, H = 1, O = 16, Na = 23)\n\n(c) A student says, "The molecular mass of sodium carbonate is 106 u". Comment on this statement.',
  model: r`Molecular mass is for substances made of molecules, while formula unit mass is for ionic compounds with a repeating pattern of ions. Both are sums of atomic masses. In (b), ethanol has 2 C, 6 H and 1 O: $24 + 6 + 16 = 46$ u. Sodium carbonate: $2 \times 23 + 12 + 3 \times 16 = 106$ u. In (c), the number 106 is right, but sodium carbonate is ionic and has no molecules, so the correct term is formula unit mass.`,
  sol: 'Molecular against formula unit; ethanol 46 u; sodium carbonate 106 u; correct term is formula unit mass.',
  scheme: [['(a) Distinction with the reason', 1.5], ['(b) Ethanol 46 u and sodium carbonate 106 u, 1 mark each', 2], ['(c) Number right, term wrong because there are no molecules', 1.5]],
  d: 4, c: 'evaluation', t: [4],
}), () => mass('C2H5OH') === 46 && mass('Na2CO3') === 106 || 'mass-long');
add('shelf-case', mk.case({
  passage: r`The laboratory shelf in a school has four labelled bottles. (Atomic masses: H = 1, C = 12, N = 14, O = 16, Na = 23, Ca = 40.)

| Reagent | Formula |
|---|---|
| Washing soda | $\ce{Na2CO3}$ |
| Caustic soda | $\ce{NaOH}$ |
| Ammonia solution | $\ce{NH3}$ |
| Chalk powder | $\ce{CaCO3}$ |`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The formula unit mass of washing soda is:',
      right: '106 u',
      wrong: ['83 u', '62 u', '138 u'],
      sol: '$2 \\times 23 + 12 + 3 \\times 16 = 46 + 12 + 48 = 106$ u — option (@K).',
      d: 2, c: 'application', t: [4],
    })),
    part('b', short({
      marks: 1,
      stem: 'Find the formula unit mass of caustic soda.',
      model: r`$23 + 16 + 1 = 40$ u.`,
      sol: 'NaOH: 23 + 16 + 1 = 40 u.',
      scheme: [['40 u', 1]],
      wl: null,
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Which has the greater formula unit mass, washing soda or chalk powder, and by how much?',
      model: r`Chalk powder: $40 + 12 + 3 \times 16 = 100$ u. Washing soda is 106 u, so washing soda is heavier by $106 - 100 = 6$ u.`,
      sol: 'CaCO3 100 u; washing soda heavier by 6 u.',
      scheme: [['CaCO3 = 100 u', 1], ['Washing soda is heavier by 6 u', 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Find the total mass of 2 formula units of caustic soda and the molecular mass of ammonia.',
        model: r`Two formula units of $\ce{NaOH}$: $2 \times 40 = 80$ u. Ammonia $\ce{NH3}$: $14 + 3 \times 1 = 17$ u.`,
        sol: '2 × 40 = 80 u; NH3 = 17 u.',
        scheme: [['2 × 40 = 80 u', 1], ['NH3 = 17 u', 1]],
        d: 3, c: 'application', t: [4],
      }),
    ]),
  ],
}), null);
