// ICSE 9 Physics ch06 Upthrust and Archimedes' Principle. Deck 1: buoyancy, Archimedes' principle, apparent weight and
// relative density (t01, t02, t03). Deck 2: floatation, the law of floatation and applications (t04, t05). Numbers come
// from calc.mjs; narration carries no digits, symbols or unit abbreviations.
import { sl, deck, table, flow, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { SPRING_WATER, OVERFLOW, FLOAT3, ICEBERG } from './svgs.mjs';
import { SW, SW_APP, D1_RD, LIQ_DECK, RD_TABLE, D2_LOG, ICE, ICE_BELOW, ICE_ABOVE, ICE_V, ICE_V_IN, ICE_V_OUT } from './calc.mjs';

export const V = {
  spring: svgV(SPRING_WATER, 'A body hanging from a spring balance in air and then fully in water, where the reading falls because of the upthrust'),
  overflow: svgV(OVERFLOW, 'An overflow can with a body immersed and the displaced water collected in a beaker'),
  float3: svgV(FLOAT3, 'Three beakers showing a body that sinks, a body that floats fully immersed and a body that floats partly immersed, with the arrows for weight and upthrust'),
  iceberg: svgV(ICEBERG, 'An iceberg floating with about thirteen percent of its volume above the sea surface'),
};

export const deck1 = deck({
  part: 1,
  title: 'Upthrust and Archimedes’ Principle — Part 1: Upthrust, apparent weight and relative density',
  goals: [
    'Explain why a body seems lighter in a liquid and state the factors on which upthrust depends',
    'State Archimedes’ principle and calculate upthrust and apparent weight',
    'Calculate relative density from weights in air and in water, and describe how it is measured',
  ],
  slides: [
    sl('title', 'Why do we feel lighter in water?', {
      b: 'Part 1 — a liquid pushes upwards on everything placed in it.',
      v: flow('LR', [['a', 'Body placed in a liquid'], ['b', 'Liquid pushes up: upthrust'], ['c', 'Body seems lighter']], [['a', 'b'], ['b', 'c']], 'Flow from a body placed in a liquid to the liquid pushing up to the body seeming lighter'),
      n: 'A bucket of water is heavy in the air, yet a large stone is easy to lift under water. The water is helping you. That upward help from a liquid is the subject of this chapter.',
    }),
    sl('concept', 'Buoyancy and upthrust', {
      b: 'A liquid exerts an **upward force** on a body placed in it. This force is called **upthrust** (or **buoyant force**), and the property of a liquid to exert it is **buoyancy**. It acts **vertically upwards**, against the weight of the body.',
      v: table(['Property of upthrust', 'Statement'], [['Direction', 'Vertically upwards'], ['Cause', 'The pressure of the liquid is greater on the lower face than on the upper face'], ['SI unit', 'newton'], ['Effect', 'The body seems to weigh less in the liquid']], 'Table of four properties of upthrust'),
      n: 'Upthrust always acts straight up. It arises because pressure in a liquid grows with depth, so the push from below is bigger than the push from above. The result is that the body seems lighter.',
    }),
    sl('concept', 'A body in air and in water', {
      b: `A spring balance shows ${SW.w} N when the body hangs in air. With the body **fully in water** it shows only ${SW_APP} N. The weight has not changed; the **upthrust of ${SW.u} N** acts upwards.`,
      v: V.spring,
      n: 'The same body hangs from a spring balance in air and then in water. In water the pointer rises, so the reading falls. The difference is the upthrust. The weight is unchanged, but the body appears lighter.',
    }),
    sl('check', 'Quick check: why does the reading fall?', {
      b: 'Compare the readings of the spring balance in air and in water.',
      v: table(['Position', 'Reading'], [['In air', `${SW.w} N`], ['In water', `${SW_APP} N`]], 'Table of the readings of the spring balance in air and in water'),
      chk: 'chk-lighter',
      n: 'The reading of the balance falls when the body is lowered into water. What is the reason?',
    }),
    sl('concept', 'Archimedes’ principle', {
      b: 'When a body is **fully or partly immersed** in a fluid, it experiences an upthrust **equal to the weight of the fluid displaced** by it. Upthrust $= V \\rho g$, where $V$ is the volume immersed and $\\rho$ is the density of the liquid.',
      v: V.overflow,
      m: [r`\text{Upthrust} = V \rho g`],
      n: 'Archimedes found that the upthrust equals the weight of the liquid pushed aside. In the overflow can, the water that spills into the beaker is exactly the water the body displaced, and its weight equals the upthrust.',
    }),
    sl('concept', 'Apparent weight', {
      b: 'The weight of a body in a liquid is called its **apparent weight**. If the upthrust is **less than the weight**, the body sinks and its apparent weight is positive: **apparent weight = weight in air − upthrust**.',
      v: table(['Quantity', 'Symbol', 'Relation'], [['Weight in air', 'W', 'Reading in air'], ['Upthrust', 'U', 'Weight of liquid displaced'], ['Apparent weight', 'W − U', 'Reading in the liquid']], 'Table of weight in air, upthrust and apparent weight'),
      n: 'Apparent weight is what a spring balance reads when the body is in the liquid. It equals the weight in air minus the upthrust, so it is always smaller than the true weight.',
    }),
    sl('example', 'Worked example 1: upthrust and apparent weight', {
      b: r`**Problem.** A body of volume ${SW.v} cm³ weighs ${SW.w} N in air. It is fully immersed in water. Find the upthrust and the apparent weight. ($\rho = 1000$ kg m⁻³, $g = 10$ m s⁻²)

**Step 1.** $V = ${SW.v} \times 10^{-6} = 0.0006$ m³. Upthrust $= V \rho g = 0.0006 \times 1000 \times 10 = ${SW.u}$ N.

**Step 2.** Apparent weight $= ${SW.w} - ${SW.u} = ${SW_APP}$ N.`,
      v: table(['Quantity', 'Working', 'Value'], [['Volume', '600 × 10⁻⁶ m³', '0.0006 m³'], ['Upthrust', '0.0006 × 1000 × 10', `${SW.u} N`], ['Apparent weight', `${SW.w} − ${SW.u}`, `${SW_APP} N`]], 'Table of the working for the upthrust and the apparent weight'),
      n: 'Change the volume to cubic metres. Multiply volume, density and gee to get the upthrust, six newtons. Subtract it from the weight in air, fifteen newtons, to get the apparent weight, nine newtons.',
    }),
    sl('check', 'Quick check: finding the upthrust', {
      b: 'Use upthrust = V ρ g with the volume in cubic metres.',
      v: table(['Volume', 'Liquid'], [['250 cm³', 'water']], 'Table of the volume and the liquid in the check question'),
      chk: 'chk-calc',
      n: 'A body of volume two hundred and fifty cubic centimetres is fully immersed in water. What is the upthrust on it?',
    }),
    sl('concept', 'What upthrust depends on', {
      b: 'Upthrust depends on the **volume of the body immersed**, the **density of the liquid** and $g$. It does **not** depend on the weight, density or material of the body, nor on the depth once the body is fully immersed.',
      v: table(['Depends on', 'Does not depend on'], [['Volume of the body immersed', 'Weight of the body'], ['Density of the liquid', 'Density or material of the body'], ['g at the place', 'Depth, once fully immersed']], 'Table of the factors that upthrust does and does not depend on'),
      n: 'Two bodies of equal volume, one of iron and one of wood, feel the same upthrust when fully under water. Only the volume pushed aside and the density of the liquid matter. Going deeper does not change it.',
    }),
    sl('concept', 'Density and relative density', {
      b: '**Relative density (RD)** of a substance is the ratio of its **density** to the density of **water**. It is a pure ratio with **no unit**. The density in kg m⁻³ is RD × 1000.',
      v: table(['Substance', 'Relative density', 'Density (kg m⁻³)'], RD_TABLE.map(([n, rd]) => [n, `${rd}`, `${rd * 1000}`]), 'Table of relative densities and densities of five substances'),
      m: [r`\text{RD} = \dfrac{\text{density of substance}}{\text{density of water}}`],
      n: 'Relative density compares a substance with water. Iron is seven point eight times as dense as water, mercury thirteen point six times. Because it is a ratio, it has no unit. Multiply by one thousand to get the density.',
    }),
    sl('concept', 'Finding the RD of a solid denser than water', {
      b: 'Weigh the solid in air and then fully in water with a spring balance. Upthrust $=$ weight of an equal volume of water $= W_{\\text{air}} - W_{\\text{water}}$. So $\\text{RD} = \\dfrac{W_{\\text{air}}}{W_{\\text{air}} - W_{\\text{water}}}$.',
      v: table(['Reading', 'Meaning'], [['Weight in air', 'Weight of the solid'], ['Weight in water', 'Apparent weight'], ['Air minus water', 'Weight of an equal volume of water']], 'Table of the three readings used to find the relative density of a solid'),
      n: 'The loss of weight in water equals the weight of the same volume of water. Divide the weight of the solid by that loss and you have its relative density. Only a spring balance and a beaker of water are needed.',
    }),
    sl('example', 'Worked example 2: relative density of a metal piece', {
      b: r`**Problem.** A metal piece weighs ${D1_RD.air} N in air and ${D1_RD.water} N in water. Find its relative density and its density.

**Step 1.** Loss of weight $= ${D1_RD.air} - ${D1_RD.water} = 3$ N.

**Step 2.** $\text{RD} = \dfrac{${D1_RD.air}}{3} = ${D1_RD.rd}$, so the density is $${D1_RD.rd} \times 1000 = ${D1_RD.density}$ kg m⁻³.`,
      v: table(['Step', 'Working', 'Result'], [['Loss of weight', `${D1_RD.air} − ${D1_RD.water}`, '3 N'], ['Relative density', `${D1_RD.air} ÷ 3`, `${D1_RD.rd}`], ['Density', `${D1_RD.rd} × 1000`, `${D1_RD.density} kg m⁻³`]], 'Table of the working for the relative density and density of the metal piece'),
      n: 'Subtract the two readings to get the loss of weight, three newtons. Divide the weight in air by this loss to find the relative density, about two point six seven. Multiply by one thousand for the density.',
    }),
    sl('check', 'Quick check: relative density', {
      b: 'A solid weighs 6 N in air and 4 N in water.',
      v: table(['Weight in air', 'Weight in water'], [['6 N', '4 N']], 'Table of the weights of a solid in air and in water'),
      chk: 'chk-rd',
      n: 'A solid weighs six newtons in air and four newtons in water. What is its relative density?',
    }),
    sl('concept', 'Finding the RD of a liquid', {
      b: `Use one solid that sinks in both liquids. Weigh it in air, in water and in the liquid. $\\text{RD of liquid} = \\dfrac{W_{\\text{air}} - W_{\\text{liquid}}}{W_{\\text{air}} - W_{\\text{water}}}$. Example: ${LIQ_DECK.air} N, ${LIQ_DECK.water} N and ${LIQ_DECK.liq} N give ${LIQ_DECK.rd}.`,
      v: table(['Reading', 'Value'], [['In air', `${LIQ_DECK.air} N`], ['In water', `${LIQ_DECK.water} N`], ['In the liquid', `${LIQ_DECK.liq} N`], ['RD of the liquid', `${LIQ_DECK.rd}`]], 'Table of the readings and the relative density of the liquid'),
      n: 'For a liquid, compare the loss of weight in that liquid with the loss in water. Both are upthrusts on the same solid, so their ratio is the ratio of the densities, the relative density of the liquid.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Upthrust is the upward force of a liquid on a body; it acts vertically upwards.',
        'Archimedes’ principle: upthrust = weight of the liquid displaced = V ρ g.',
        'Apparent weight = weight in air − upthrust.',
        'RD of a solid = W(air) ÷ [W(air) − W(water)]; RD of a liquid = [W(air) − W(liquid)] ÷ [W(air) − W(water)].',
      ],
      v: table(['Quantity', 'Formula'], [['Upthrust', 'V ρ g'], ['Apparent weight', 'W − U'], ['Relative density', 'ρ ÷ ρ of water']], 'Summary table of upthrust, apparent weight and relative density'),
      n: 'To sum up Part one. Upthrust is the upward push of a liquid. It equals the weight of liquid displaced. The apparent weight is the weight in air minus the upthrust, and relative density is found from weights in air and in water.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Convert cm³ to m³ before using V ρ g: 1 cm³ = 10⁻⁶ m³.',
        'Say "weight of liquid displaced" when stating Archimedes’ principle.',
        'Relative density has no unit; density has kg m⁻³.',
        'In RD problems, subtract first to find the loss of weight.',
      ],
      v: table(['Slip', 'Fix'], [['Using the weight of the body as the upthrust', 'Upthrust is the weight of liquid displaced'], ['Giving RD a unit', 'It is a ratio'], ['Using volume in cm³ with ρ in kg m⁻³', 'Change to m³']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Quote Archimedes’ principle with the words weight of liquid displaced. Change cubic centimetres to cubic metres. Relative density has no unit. And in every relative density sum, find the loss of weight first.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Upthrust and Archimedes’ Principle — Part 2: Floatation and its applications',
  goals: [
    'State the conditions for a body to sink, float or rise in a liquid by comparing densities',
    'Use the fraction of volume immersed = density of body ÷ density of liquid in numerical problems',
    'Explain how a submarine dives and surfaces, why an iron ship floats and why only a small part of an iceberg is seen',
  ],
  slides: [
    sl('title', 'Why does a steel ship float?', {
      b: 'Part 2 — sinking, floating and the law that decides between them.',
      v: flow('LR', [['a', 'Weight of the body'], ['b', 'Compared with upthrust'], ['c', 'Sinks or floats']], [['a', 'b'], ['b', 'c']], 'Flow from the weight of the body compared with the upthrust to sinking or floating'),
      n: 'A steel nail sinks at once, yet a ship made of tonnes of steel floats. The same liquid and the same metal give two different results. The answer lies in comparing weight and upthrust.',
    }),
    sl('concept', 'Sink, float or rise?', {
      b: 'Compare the **weight** $W$ with the **upthrust** $U$ of a fully immersed body. A denser body sinks, a body of equal density stays where it is placed, and a less dense body rises and floats.',
      v: table(['Condition', 'Density of body compared with the liquid', 'Result'], [['U < W', 'Greater', 'Sinks'], ['U = W when fully immersed', 'Equal', 'Floats fully immersed, anywhere'], ['U > W when fully immersed', 'Smaller', 'Rises and floats partly immersed']], 'Table of the three cases of sinking, floating fully immersed and rising to float'),
      n: 'If the upthrust is smaller than the weight, the body sinks. If they are equal, it floats fully under the surface. If the upthrust would be larger, the body rises until part of it is out of the liquid.',
    }),
    sl('concept', 'Three cases in pictures', {
      b: 'In the **third case** the body floats with part above the surface, so it displaces less liquid than its full volume, until the upthrust **equals its weight**.',
      v: V.float3,
      n: 'The first body sinks because the arrow for weight is longer than the arrow for upthrust. In the second, the arrows are equal and the body floats under the surface. In the third, it floats with part above the water.',
    }),
    sl('check', 'Quick check: will it sink?', {
      b: 'Compare the density of the body with the density of the liquid.',
      v: table(['Body', 'Liquid'], [['Steel bolt, 7800 kg m⁻³', 'Water, 1000 kg m⁻³']], 'Table of the densities of a steel bolt and water'),
      chk: 'chk-sink',
      n: 'A steel bolt is denser than water. What happens when it is placed in water?',
    }),
    sl('concept', 'The law of floatation', {
      b: 'A floating body displaces its own **weight** of liquid: **weight of the floating body = weight of the liquid displaced** (the upthrust). A heavier floating body therefore sinks lower.',
      v: table(['Statement', 'Meaning'], [['Weight of body = upthrust', 'The forces balance, so the body floats'], ['Upthrust = weight of liquid displaced', 'Archimedes’ principle'], ['So: weight of body = weight of liquid displaced', 'Law of floatation']], 'Table linking the law of floatation to Archimedes’ principle'),
      n: 'A floating body is in balance, so the upthrust equals its weight. The upthrust is the weight of the liquid displaced. Put the two together and a floating body always displaces liquid weighing as much as itself.',
    }),
    sl('concept', 'The fraction of the volume immersed', {
      b: 'For a floating body of volume $V$ and density $\\rho_b$ in a liquid of density $\\rho_l$: weight $= V \\rho_b g$ and upthrust $= V_{\\text{in}} \\rho_l g$. Equating them: $\\dfrac{V_{\\text{in}}}{V} = \\dfrac{\\rho_b}{\\rho_l}$.',
      v: table(['Body', 'Density of body', 'Fraction immersed in water'], [['Pine log', `${D2_LOG.rho} kg m⁻³`, `${D2_LOG.frac}`], ['Ice', '900 kg m⁻³', '0.9'], ['Cork', '240 kg m⁻³', '0.24']], 'Table of the fraction of the volume immersed in water for three floating bodies'),
      m: [r`\dfrac{V_{\text{in}}}{V} = \dfrac{\rho_{\text{body}}}{\rho_{\text{liquid}}}`],
      n: 'Weight equals upthrust, and the common factors cancel. The fraction immersed is the density of the body divided by the density of the liquid. A body half as dense as the liquid floats half under.',
    }),
    sl('example', 'Worked example 1: a floating log', {
      b: r`**Problem.** A pine log of density ${D2_LOG.rho} kg m⁻³ floats in water. What percentage of its volume is below the surface, and what percentage is above?

**Step 1.** $\dfrac{V_{\text{in}}}{V} = \dfrac{${D2_LOG.rho}}{1000} = ${D2_LOG.frac}$, that is ${D2_LOG.pct}% below.

**Step 2.** Above the surface: $100 - ${D2_LOG.pct} = ${D2_LOG.above}$%.`,
      v: table(['Step', 'Working', 'Result'], [['Fraction below', `${D2_LOG.rho} ÷ 1000`, `${D2_LOG.frac}`], ['Percentage below', `${D2_LOG.frac} × 100`, `${D2_LOG.pct}%`], ['Percentage above', `100 − ${D2_LOG.pct}`, `${D2_LOG.above}%`]], 'Table of the working for the percentage of the log below and above the surface'),
      n: 'Divide the density of the log by the density of water to get the fraction below, sixty five hundredths. That is sixty five percent below the surface, and the remaining thirty five percent is above.',
    }),
    sl('check', 'Quick check: how much is immersed?', {
      b: 'Use V(in) ÷ V = density of body ÷ density of liquid.',
      v: table(['Body', 'Liquid'], [['800 kg m⁻³', '1000 kg m⁻³']], 'Table of the densities of a body and a liquid'),
      chk: 'chk-fraction',
      n: 'A block of density eight hundred kilograms per cubic metre floats in water. What percentage of its volume is below the surface?',
    }),
    sl('concept', 'Floating fully immersed', {
      b: 'If the density of the body **equals** the density of the liquid, the body floats **fully immersed** at any depth. Fish adjust their density this way, and so does a submarine when it holds a steady depth.',
      v: table(['Case', 'Density comparison', 'Weight and upthrust'], [['Sinking', 'Body denser', 'Upthrust less than weight'], ['Floating fully immersed', 'Equal densities', 'Upthrust equals weight'], ['Floating partly immersed', 'Body less dense', 'Upthrust equals weight at less than full volume']], 'Table comparing the three cases in terms of density, weight and upthrust'),
      n: 'When the two densities match, the weight and the full-volume upthrust match too, and the body hangs in the liquid wherever you leave it. Less dense bodies float partly out, denser bodies sink.',
    }),
    sl('concept', 'Ships', {
      b: 'An iron nail sinks, but an iron **ship** is built **hollow**. Its large volume displaces a very large weight of water, and its **average density** is less than that of water, so the upthrust can equal the weight.',
      v: table(['Object', 'Average density', 'Result in water'], [['Solid iron block', 'About 7800 kg m⁻³', 'Sinks'], ['Iron ship with air inside', 'Less than 1000 kg m⁻³', 'Floats']], 'Table comparing a solid iron block with a hollow iron ship in water'),
      n: 'A ship is mostly air. Its steel is spread into a huge hollow shape, so it pushes aside a very large weight of water. The average density of steel plus air is less than that of water, and the ship floats.',
    }),
    sl('concept', 'Icebergs', {
      b: `Ice has density 900 kg m⁻³ and sea water 1030 kg m⁻³. So the fraction immersed is $\\dfrac{900}{1030}$: **about ${ICE_BELOW}%** of an iceberg is **below** the surface and only **about ${ICE_ABOVE}%** above it.`,
      v: V.iceberg,
      n: 'Ice is only a little less dense than sea water, so an iceberg floats very low. Roughly seven eighths of it lies below the surface. What we see is only the tip, and that is why icebergs are dangerous to ships.',
    }),
    sl('concept', 'Submarines and balloons', {
      b: 'A **submarine** has **ballast tanks**. Filling them with sea water makes it denser than the water, so it **dives**; forcing the water out with compressed air makes it lighter, so it **rises**. A **balloon** is filled with a gas **less dense than air** and rises until its upthrust equals its weight.',
      v: table(['Object', 'What changes', 'Result'], [['Submarine', 'Ballast tanks filled with water', 'Average density rises, it dives'], ['Submarine', 'Water blown out of the tanks', 'Average density falls, it rises'], ['Balloon', 'Filled with a gas less dense than air', 'Upthrust exceeds weight, it rises']], 'Table of how a submarine dives and surfaces and how a balloon rises'),
      n: 'A submarine changes its own density. Water in the ballast tanks makes it sink. Compressed air pushes the water out and it rises. A balloon holds a light gas, so the air around it pushes up harder than gravity pulls down.',
    }),
    sl('check', 'Quick check: the submarine', {
      b: 'Think about what the ballast tanks do to the weight of the submarine.',
      v: table(['Action', 'Ballast tanks'], [['Dive', 'Filled with water'], ['Surface', 'Emptied with compressed air']], 'Table of the actions of a submarine and the state of its ballast tanks'),
      chk: 'chk-sub',
      n: 'How does a submarine make itself dive?',
    }),
    sl('example', 'Worked example 2: an iceberg', {
      b: r`**Problem.** An iceberg has a total volume of ${ICE_V} m³. Find the volume below and the volume above the surface of the sea. (Density of ice 900 kg m⁻³; of sea water 1030 kg m⁻³)

**Step 1.** Fraction below $= \dfrac{900}{1030} = ${sigFrac(ICE.frac)}$, so volume below $= ${ICE_V} \times ${sigFrac(ICE.frac)} = ${ICE_V_IN}$ m³.

**Step 2.** Volume above $= ${ICE_V} - ${ICE_V_IN} = ${ICE_V_OUT}$ m³ (about).`,
      v: table(['Part', 'Volume (m³)'], [['Below the surface', `${ICE_V_IN}`], ['Above the surface', `${ICE_V_OUT}`], ['Total', `${ICE_V}`]], 'Table of the volumes of the iceberg below and above the surface'),
      n: 'Find the fraction below by dividing the density of ice by that of sea water. Multiply it by the total volume to get the part under water. The rest, about one thousand cubic metres, is the visible part.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'A body sinks if it is denser than the liquid, floats fully immersed if equally dense, and floats partly immersed if less dense.',
        'Law of floatation: weight of a floating body = weight of the liquid displaced.',
        'Fraction of volume immersed = density of body ÷ density of liquid.',
        'Ships float because of their hollow shape; submarines use ballast tanks; an iceberg shows only about 13% of its volume; balloons contain a gas less dense than air.',
      ],
      v: table(['Case', 'Condition'], [['Sinks', 'ρ body > ρ liquid'], ['Floats fully immersed', 'ρ body = ρ liquid'], ['Floats partly immersed', 'ρ body < ρ liquid']], 'Summary table of sinking and floating conditions'),
      n: 'To sum up Part two. Compare densities to decide sinking or floating. A floating body displaces its own weight of liquid, and the fraction immersed is the ratio of the densities. Ships, submarines, icebergs and balloons all follow from this.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'State the law of floatation in terms of weight of liquid displaced.',
        'For a floating body, use weight = upthrust; for a sinking body, use apparent weight = W − U.',
        'Write the fraction immersed as density of body ÷ density of liquid.',
        'For ships and submarines, talk about average density and the weight of water displaced.',
      ],
      v: table(['Slip', 'Fix'], [['Using the full volume for a floating body', 'Use the volume immersed'], ['Saying iron ships float because iron is light', 'The hollow shape makes the average density less than water'], ['Forgetting that a floating body has U = W', 'Apply the law of floatation']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. A floating body has upthrust equal to weight. A sinking body has apparent weight equal to weight minus upthrust. Give the fraction immersed as a ratio of densities. And explain ships by their average density.',
    }),
  ],
});

/** Plain decimal of a fraction to four significant figures. */
function sigFrac(x) {
  return Number(x.toPrecision(4));
}
