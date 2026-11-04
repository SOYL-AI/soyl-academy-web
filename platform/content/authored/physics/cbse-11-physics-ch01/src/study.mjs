// ch01 notes and flashcards.
import { T, unit, PROV, r, dec } from './lib.mjs';
import { sf, pt, dimTex, Q, dmul, ddiv, dpow, L, M, T as TT, AU, LY, PARSEC } from './calc.mjs';
import { V, EX } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { moon, prox, ar, rp, res, pg, dG, dh, pend, strg } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Units and Measurements — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Units: the SI, derived units and practical units',
      `- A measurement is a **number × unit**. **Base quantities** (length, mass, time, electric current, temperature, amount of substance, luminous intensity) are chosen independently; every other quantity is **derived**.
- The **SI** has seven base units: metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd). Earlier systems: CGS (cm, g, s), FPS (ft, lb, s), MKS (m, kg, s).
- Named derived units: newton $= \\text{kg m s}^{-2}$, joule $= \\text{kg m}^2\\text{s}^{-2}$, watt $= \\text{kg m}^2\\text{s}^{-3}$, pascal $= \\text{kg m}^{-1}\\text{s}^{-2}$, hertz $= \\text{s}^{-1}$, coulomb $= \\text{A s}$.
- **Radian** (plane angle, $\\theta = s/r$) and **steradian** (solid angle, $\\Omega = A/r^2$) were called supplementary units; they are dimensionless. A full circle is $2\\pi$ rad, a full sphere $4\\pi$ sr, and $1\\ \\text{rad} \\approx 57.3^\\circ$.
- **Prefixes:** tera $10^{12}$, giga $10^{9}$, mega $10^{6}$, kilo $10^{3}$, milli $10^{-3}$, micro $10^{-6}$, nano $10^{-9}$, pico $10^{-12}$, femto $10^{-15}$.
- **Practical units:** 1 light year $\\approx ${sf(LY, 3)}$ m; 1 AU $\\approx ${sf(AU, 4)}$ m; 1 parsec $\\approx ${sf(PARSEC, 3)}$ m ($\\approx ${dec(PARSEC / LY, 3)}$ ly); 1 angstrom $= 10^{-10}$ m; 1 fermi $= 10^{-15}$ m.`,
      [kt('Base unit', 'The unit of one of the seven base quantities of the SI.'), kt('Derived unit', 'A unit obtained by combining base units, such as the newton.'), kt('Light year', 'The distance travelled by light in vacuum in one year.')],
      [fm(r`\theta = \dfrac{s}{r}`, 'Plane angle in radian'), fm(r`\Omega = \dfrac{A}{r^2}`, 'Solid angle in steradian')],
      V.radian,
      [1],
      [V.lengths],
    ),
    sec(
      '2. Significant figures',
      `- A measured value has all its **certain** digits plus **one uncertain** digit: these are its **significant figures**.
- **Counting:** non-zero digits count; zeros between non-zero digits count; leading zeros do not; trailing zeros count after a decimal point but not in a number without one; powers of ten do not count. Scientific form $a \\times 10^{n}$ removes doubt.
- **Rounding:** drop digit above 5, raise the last kept digit; below 5, leave it; exactly 5 with nothing after, make the last kept digit **even** (2.745 → 2.74, 2.735 → 2.74).
- **Add or subtract:** keep the least number of **decimal places**. **Multiply or divide:** keep the least number of **significant figures**. Exact numbers (counts, defined factors) do not limit the answer.
- Carry one extra digit in intermediate steps and round once at the end. Changing units does not change the number of significant figures.
- Worked: $12.78 + 3.1 + 0.456 = ${dec(ar.sum, 5)} \\to ${dec(ar.sumR, 3)}$; $12.4 \\times 8.25 = ${dec(ar.prod, 4)} \\to ${dec(ar.prodR, 3)}$; $482 \\div 12.5 = ${dec(ar.quo, 4)} \\to ${dec(ar.quoR, 3)}$.`,
      [kt('Significant figures', 'The certain digits of a measurement together with the first uncertain digit.'), kt('Exact number', 'A counted or defined number with unlimited significant figures.')],
      [],
      V.ruler,
      [2],
    ),
    sec(
      '3. Errors in measurement',
      `- **Accuracy:** closeness to the true value. **Precision:** closeness of repeated readings to each other.
- **Systematic errors** (zero error, faulty calibration, wrong technique, personal habit) shift readings one way; **random errors** scatter them and are reduced by averaging; the **least count** limits a single reading.
- With readings $a_1 \\dots a_n$: mean $a_\\text{mean}$; absolute error $|\\Delta a_i| = |a_\\text{mean} - a_i|$; **mean absolute error** $\\Delta a_\\text{mean} = \\sum|\\Delta a_i| / n$; **relative error** $= \\Delta a_\\text{mean}/a_\\text{mean}$; **percentage error** $=$ relative error $\\times 100\\ \\%$.
- **Combining:** sum or difference, $\\Delta Z = \\Delta A + \\Delta B$; product or quotient, $\\Delta Z / Z = \\Delta A/A + \\Delta B/B$; $Z = A^p B^q / C^r$, $\\Delta Z / Z = p\\,\\Delta A/A + q\\,\\Delta B/B + r\\,\\Delta C/C$.
- Report the error to one significant figure and the mean to the same decimal place. Worked: ramp times mean ${dec(rp.mean, 3)} s, mean absolute error ${rp.dm.toFixed(2)} s, ${dec(rp.pct, 2)} %; $R = V/I = ${dec(res.R, 3)}\\ \\Omega$ with relative error ${dec(res.relR * 100, 3)} %; $g = 4\\pi^2 l/T^2 \\approx ${dec(pg.g, 4)}$ m s$^{-2}$ with relative error ${dec(pg.rel * 100, 3)} %.`,
      [kt('Mean absolute error', 'The average of the absolute errors of the individual readings.'), kt('Relative error', 'The mean absolute error divided by the mean value.')],
      [fm(r`\dfrac{\Delta Z}{Z} = \dfrac{\Delta A}{A} + \dfrac{\Delta B}{B}`, 'Product or quotient Z = A B or A / B'), fm(r`\dfrac{\Delta Z}{Z} = p\dfrac{\Delta A}{A} + q\dfrac{\Delta B}{B} + r\dfrac{\Delta C}{C}`, 'Z = A^p B^q / C^r')],
      V.dots,
      [2],
      [V.area],
    ),
    sec(
      '4. Dimensions and dimensional analysis',
      `- The **dimensions** of a quantity are the powers of the base quantities needed to express it: $[\\text{M}]$, $[\\text{L}]$, $[\\text{T}]$ and so on. Velocity $${dimTex(Q.velocity)}$; force $${dimTex(Q.force)}$; energy $${dimTex(Q.energy)}$; pressure $${dimTex(Q.pressure)}$; $G$ $${dimTex(dG)}$; $h$ $${dimTex(dh)}$. Pure numbers and ratios of like quantities are dimensionless.
- **Principle of homogeneity:** every term of a correct equation has the same dimensions; only like quantities can be added, subtracted or equated.
- **Uses:** (1) check whether an equation can be correct; (2) deduce a relation, e.g. $T = k\\,m^{a} l^{b} g^{c}$ gives $a = ${pend[0]}$, $b = ${pend[1]}$, $c = ${pend[2]}$, so $T \\propto \\sqrt{l/g}$; $v = k F^{a}\\mu^{b}$ gives $a = ${strg[0]}$, $b = ${strg[1]}$; (3) convert units, $n_2 = n_1 [M_1/M_2]^{a}[L_1/L_2]^{b}[T_1/T_2]^{c}$.
- **Limitations:** cannot give dimensionless constants (½, 2π), cannot handle sums of terms or sin, log, exp of a dimensional quantity, and a consistent equation is not necessarily correct.`,
      [kt('Dimensional formula', 'An expression showing the powers of the base quantities that make up a quantity, such as [M L T⁻²] for force.'), kt('Principle of homogeneity', 'In a correct physical equation every term has the same dimensions.')],
      [fm(r`n_2 = n_1\left[\dfrac{M_1}{M_2}\right]^{a}\left[\dfrac{L_1}{L_2}\right]^{b}\left[\dfrac{T_1}{T_2}\right]^{c}`, 'Converting a quantity of dimensions [M^a L^b T^c] between systems')],
      V.balance,
      [3],
      [V.pendulum],
    ),
  ],
  exam_tips_md: `- Write units with every number; convert before calculating; round only at the end.
- Add or subtract by decimal places; multiply or divide by significant figures.
- Errors: add the **relative** errors in products and quotients, the **absolute** errors in sums and differences; a power multiplies the relative error.
- To check an equation, find the dimensions of **every** term. Dimensions never give numerical constants.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Name the seven SI base units.', 'Metre, kilogram, second, ampere, kelvin, mole, candela.', 'fact', 1),
    fc(2, 'Difference between a base unit and a derived unit?', 'A base unit belongs to a base quantity; a derived unit is a combination of base units.', 'concept', 1),
    fc(3, 'The newton in base units?', '$\\text{kg m s}^{-2}$.', 'formula', 1),
    fc(4, 'The joule in base units?', '$\\text{kg m}^2\\text{s}^{-2}$.', 'formula', 1),
    fc(5, 'The pascal in base units?', '$\\text{kg m}^{-1}\\text{s}^{-2}$.', 'formula', 1),
    fc(6, 'Define the radian.', 'The angle subtended at the centre by an arc equal in length to the radius: $\\theta = s/r$.', 'concept', 1),
    fc(7, 'Define the steradian.', 'The solid angle subtended at the centre of a sphere by a surface patch of area $r^2$: $\\Omega = A/r^2$.', 'concept', 1),
    fc(8, 'Dimensions of the radian and steradian?', 'None: each is a ratio of like quantities.', 'fact', 1),
    fc(9, '1 radian in degrees?', 'About $57.3^\\circ$.', 'fact', 1),
    fc(10, 'Value of 1 light year?', `About $${sf(LY, 3)}$ m.`, 'fact', 1),
    fc(11, 'Value of 1 astronomical unit?', `About $${sf(AU, 4)}$ m.`, 'fact', 1),
    fc(12, 'Value of 1 parsec?', `About $${sf(PARSEC, 3)}$ m, i.e. ${dec(PARSEC / LY, 3)} light years.`, 'fact', 1),
    fc(13, 'Value of an angstrom and of a fermi?', '$10^{-10}$ m and $10^{-15}$ m.', 'fact', 1),
    fc(14, 'Prefixes for $10^{9}$ and $10^{-9}$?', 'Giga and nano.', 'fact', 1),
    fc(15, 'Prefixes for $10^{12}$ and $10^{-12}$?', 'Tera and pico.', 'fact', 1),
    fc(16, 'What are significant figures?', 'The certain digits of a measurement plus the first uncertain digit.', 'concept', 2),
    fc(17, 'Do leading zeros count as significant?', 'No. 0.0043 has 2 significant figures.', 'fact', 2),
    fc(18, 'Do trailing zeros count?', 'Yes after a decimal point (6.200 has 4); not in a number with no decimal point (4500 has 2).', 'fact', 2),
    fc(19, 'Rule for adding and subtracting measured values?', 'Keep the least number of decimal places.', 'concept', 2),
    fc(20, 'Rule for multiplying and dividing measured values?', 'Keep the least number of significant figures.', 'concept', 2),
    fc(21, 'Round 2.745 to 3 significant figures.', 'The dropped digit is exactly 5 and the last kept digit 4 is even, so 2.74.', 'example', 2),
    fc(22, 'Define the mean absolute error.', 'The average of the absolute errors: $\\sum|\\Delta a_i|/n$.', 'concept', 2),
    fc(23, 'Relative error and percentage error?', 'Relative $= \\Delta a/a_\\text{mean}$; percentage $=$ relative $\\times 100\\ \\%$.', 'formula', 2),
    fc(24, 'Error in $Z = A - B$?', '$\\Delta Z = \\Delta A + \\Delta B$ (absolute errors add).', 'formula', 2),
    fc(25, 'Error in $Z = A B / C$?', '$\\Delta Z/Z = \\Delta A/A + \\Delta B/B + \\Delta C/C$.', 'formula', 2),
    fc(26, 'Percentage error in $x^{3}$ if $x$ has a 2 % error?', '$3 \\times 2\\ \\% = 6\\ \\%$.', 'example', 2),
    fc(27, 'Dimensional formula of force?', `$${dimTex(Q.force)}$.`, 'formula', 3),
    fc(28, 'Principle of homogeneity?', 'Every term of a correct physical equation has the same dimensions.', 'concept', 3),
    fc(29, 'Name two limitations of dimensional analysis.', 'It cannot give numerical constants such as ½ or 2π, and cannot handle sums of terms or sin, log, exp of a dimensional quantity.', 'concept', 3),
    fc(30, 'Exam tip: checking an equation.', 'Find the dimensions of every term and compare them with the left side.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
void [pt, dmul, ddiv, dpow, L, M, TT, moon, prox];
