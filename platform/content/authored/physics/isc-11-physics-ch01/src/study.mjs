// ISC 11 ch01 notes (one section per syllabus topic) and 30 flashcards.
import { T, unit, PROV, r, dec, sci } from './lib.mjs';
import { sf, dimTex, Q, AU, LY, PARSEC, U_KG, YEAR, C_LIGHT } from './calc.mjs';
import { V, TB, EX } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { star, rp, ar, oom, dG, dh, conv } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Units and Measurement — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Physics as measurement; units and systems of units',
      `- Physics is built on **measurement**: a measured value is a **number × unit**. The unit is a **reference standard** of the same kind as the quantity.
- A good unit is **well defined, reproducible, invariable and convenient**. Changing the unit changes the number, not the quantity: $n_1u_1 = n_2u_2$.
- **Fundamental (base) quantities** are chosen independently; **derived quantities** are built from them.
- **Systems of units:** CGS (cm, g, s; force dyne, work erg), FPS (ft, lb, s; poundal), MKS (m, kg, s; newton, joule), **MKSA** (MKS plus the ampere) and the **SI**, which has seven base units and is used worldwide.
- Conversions used often: $1\\ \\text{N} = 10^{5}$ dyne, $1\\ \\text{J} = 10^{7}$ erg.`,
      [kt('Unit', 'A reference standard chosen to measure a quantity of the same kind.'), kt('System of units', 'A set of base units, with the derived units that follow from them.'), kt('MKSA system', 'The MKS system with the ampere added as the base unit of electric current.')],
      [fm(r`n_1 u_1 = n_2 u_2`, 'The physical quantity is the same in any unit')],
      TB.tSystems,
      [1],
      [TB.tGoodUnit],
    ),
    sec(
      '2. SI base, supplementary and derived units; rules and prefixes',
      `- **Seven SI base units:** metre (m), kilogram (kg), second (s), ampere (A), kelvin (K), mole (mol), candela (cd). Since 2019 each is defined by fixing a constant of nature (for example $c = 299\\,792\\,458$ m s$^{-1}$ fixes the metre).
- **Supplementary units** (now dimensionless derived units): **radian** ($\\theta = s/r$) and **steradian** ($\\Omega = A/r^2$). A circle is $2\\pi$ rad; a sphere $4\\pi$ sr; $1\\ \\text{rad} \\approx 57.3^\\circ$.
- **Derived units** such as newton $= \\text{kg m s}^{-2}$, joule $= \\text{kg m}^2\\text{s}^{-2}$, watt $= \\text{kg m}^2\\text{s}^{-3}$, pascal $= \\text{kg m}^{-1}\\text{s}^{-2}$, hertz $= \\text{s}^{-1}$, coulomb $= \\text{A s}$.
- **Rules:** unit names in lower case; a symbol is capital only if the unit is named after a person; no plural symbols, no full stop, a space after the number; do not mix names and symbols; one prefix only, joined to the unit; products with a space, quotients with a negative power or one solidus.
- **Prefixes (atto to tera):** atto $10^{-18}$, femto $10^{-15}$, pico $10^{-12}$, nano $10^{-9}$, micro $10^{-6}$, milli $10^{-3}$, centi $10^{-2}$, deci $10^{-1}$, deca $10^{1}$, hecto $10^{2}$, kilo $10^{3}$, mega $10^{6}$, giga $10^{9}$, tera $10^{12}$. The kilogram is the only base unit with a prefix.`,
      [kt('Base unit', 'The unit of one of the seven base quantities of the SI.'), kt('Derived unit', 'A unit formed by multiplying or dividing base units, such as the newton.'), kt('Prefix', 'A name or symbol placed before a unit to multiply it by a power of ten.')],
      [fm(r`\theta = \dfrac{s}{r}`, 'Plane angle in radian'), fm(r`\Omega = \dfrac{A}{r^2}`, 'Solid angle in steradian')],
      V.radian,
      [2],
      [TB.tRules, TB.tPrefix],
    ),
    sec(
      '3. Practical units; measuring length, mass and time',
      `- **Light year:** distance light travels in a year, $${sf(C_LIGHT, 4)}\\times ${sf(YEAR, 4)} \\approx ${sf(LY, 3)}$ m. **Astronomical unit:** mean Earth–Sun distance, $${sf(AU, 4)}$ m. **Parsec:** $${sf(PARSEC, 3)}$ m $\\approx ${dec(PARSEC / LY, 3)}$ ly.
- **Angstrom** $= 10^{-10}$ m; **fermi** $= 10^{-15}$ m; **unified atomic mass unit** $1\\ \\text{u} = ${sf(U_KG, 3)}$ kg, one twelfth of the mass of a carbon-12 atom.
- **Parallax:** a baseline $b$ subtending a small angle $p$ (radian) at an object gives $D = b/p$. One parsec is the distance at which 1 AU subtends 1 arcsecond ($4.848\\times 10^{-6}$ rad).
- **Methods:** lengths by scales, vernier and screw gauge (everyday), electron or X-ray methods (atoms), parallax and radar echoes (Moon, planets, stars). Masses by balances, mass spectrometers (atoms) and orbits (planets, stars). Times by pendulum and quartz clocks, and atomic clocks for the highest precision.
- Worked: a star of parallax ${star.p} arcsecond is $1/${star.p} = ${dec(star.pc, 3)}$ pc $\\approx ${dec(star.ly, 3)}$ ly away.`,
      [kt('Light year', 'The distance travelled by light in vacuum in one year.'), kt('Parsec', 'The distance at which the Earth–Sun distance subtends an angle of one arcsecond.'), kt('Unified atomic mass unit', 'One twelfth of the mass of a carbon-12 atom, about 1.66 × 10⁻²⁷ kg.')],
      [fm(r`D = \dfrac{b}{p}`, 'Parallax distance (p in radian)')],
      V.parallax,
      [3],
      [TB.tPractical, V.lengths, TB.tMethods],
    ),
    sec(
      '4. Errors, significant figures, rounding off and order of magnitude',
      `- **Accuracy:** closeness to the true value. **Precision:** closeness of repeated readings. **Systematic errors** (zero error, faulty calibration, wrong technique, personal habit) shift readings one way; **random errors** scatter them and are reduced by averaging; the **least count** limits a single reading.
- With readings $a_1 \\dots a_n$: mean $a_\\text{mean}$; absolute error $|\\Delta a_i| = |a_\\text{mean} - a_i|$; **mean absolute error** $= \\sum|\\Delta a_i|/n$; **relative error** $= \\Delta a_\\text{mean}/a_\\text{mean}$; **percentage error** $=$ relative error $\\times 100\\ \\%$. Worked: swing times mean ${dec(rp.mean, 3)} s, mean absolute error ${rp.dm.toFixed(2)} s, ${dec(rp.pct, 2)} %.
- **Significant figures:** the certain digits plus one uncertain digit. Non-zero digits count; zeros between them count; leading zeros do not; trailing zeros count after a decimal point but not in a whole number without one; powers of ten do not count.
- **Rounding off:** drop digit above 5, raise the last kept digit; below 5, leave it; exactly 5 with nothing after, make the last kept digit **even** (7.865 → 7.86, 7.875 → 7.88).
- **Arithmetic:** add or subtract by the least number of **decimal places**; multiply or divide by the least number of **significant figures**. Exact numbers do not limit the answer. Worked: $21.34 + 3.7 + 0.052 = ${dec(ar.sum, 5)} \\to ${dec(ar.sumR, 3)}$; $14.2\\times 6.35 = ${dec(ar.prod, 4)} \\to ${dec(ar.prodR, 3)}$; $135 \\div 4.2 = ${dec(ar.quo, 4)} \\to ${dec(ar.quoR, 2)}$.
- **Order of magnitude:** write $N = a\\times 10^{k}$ with $1 \\le a < 10$; the order is $10^k$ if $a \\le 3.16$ and $10^{k+1}$ if $a > 3.16$. The age of the universe, ${sci(oom.uni.s, 3)} s, is of order $10^{18}$ s.`,
      [kt('Mean absolute error', 'The average of the absolute errors of the individual readings.'), kt('Significant figures', 'The certain digits of a measurement together with the first uncertain digit.'), kt('Order of magnitude', 'The power of ten nearest to a number, found from the square root of ten rule.')],
      [fm(r`\Delta a_\text{mean} = \dfrac{\sum|\Delta a_i|}{n}`, 'Mean absolute error'), fm(r`\text{percentage error} = \dfrac{\Delta a_\text{mean}}{a_\text{mean}}\times 100\ \%`, 'Percentage error')],
      V.ruler,
      [4],
      [V.dots, V.order, TB.tErrKinds, TB.tSf],
    ),
    sec(
      '5. Dimensions and dimensional formulae; principle of homogeneity',
      `- The **dimensions** of a quantity are the powers of the base quantities in it; the **dimensional formula** writes them in square brackets: $[F] = ${dimTex(Q.force)}$, $[E] = ${dimTex(Q.energy)}$, $[P] = ${dimTex(Q.pressure)}$, $[G] = ${dimTex(dG)}$, $[h] = ${dimTex(dh)}$.
- Pure numbers and ratios of like quantities (angle, strain, refractive index) are **dimensionless**.
- A constant takes the dimensions that make its equation balance: from $F = Gm_1m_2/r^2$, $[G] = [F][r^2]/[m^2]$.
- **Principle of homogeneity:** every term on both sides of a correct equation has the same dimensions; only like quantities can be added, subtracted or equated; the argument of sin, log or exp is dimensionless.`,
      [kt('Dimensional formula', 'An expression showing the powers of the base quantities that make up a quantity, such as [M L T⁻²] for force.'), kt('Principle of homogeneity', 'In a correct physical equation every term has the same dimensions.')],
      [fm(r`[F] = [\text{M L T}^{-2}]`, 'Force'), fm(r`[G] = [\text{M}^{-1}\text{L}^{3}\text{T}^{-2}]`, 'Gravitational constant')],
      V.balance,
      [5],
      [TB.tDim, TB.tConst],
    ),
    sec(
      '6. Uses and limitations of dimensional analysis',
      `- **Checking an equation:** find the dimensions of every term; if they differ the equation is wrong. $v^2 = u^2 + 2as$ and $P = \\rho g h$ pass; $K = \\tfrac12 mv$ fails.
- **Dimensions of constants:** in $\\left(P + a/V^2\\right)(V - b) = RT$, $[a] = [P][V^2] = ${dimTex(EX.dA)}$.
- **Converting units:** $n_2 = n_1\\left[\\dfrac{M_1}{M_2}\\right]^{a}\\left[\\dfrac{L_1}{L_2}\\right]^{b}\\left[\\dfrac{T_1}{T_2}\\right]^{c}$. Examples: $1\\ \\text{N} = ${sci(conv.newton, 3)}$ dyne; $1\\ \\text{J} = ${sci(conv.joule, 3)}$ erg; $9.8\\ \\text{m s}^{-2} = ${dec(conv.g, 3)}$ ft s$^{-2}$; $G = ${sci(conv.G, 3)}$ in CGS units.
- **Limitations:** it cannot give pure numbers such as $\\tfrac12$ or $2\\pi$; it cannot handle sin, log or exp of a dimensional quantity or a relation with a sum of terms; a dimensionally correct equation is not necessarily correct; it cannot tell quantities of equal dimensions (work, torque) apart.`,
      [kt('Dimensional consistency', 'Every term of an equation has the same dimensions; a necessary but not sufficient condition for correctness.')],
      [fm(r`n_2 = n_1\left[\dfrac{M_1}{M_2}\right]^{a}\left[\dfrac{L_1}{L_2}\right]^{b}\left[\dfrac{T_1}{T_2}\right]^{c}`, 'Converting a quantity of dimensions [M^a L^b T^c] between systems')],
      TB.tEq,
      [6],
      [TB.tConv, TB.tLimit],
    ),
  ],
  exam_tips_md: `- Write units with every number; convert to one system before calculating; round only at the end.
- Unit names and symbols: lower-case names, no plural symbols, no full stops, a space after the number, one prefix only.
- Error questions: mean, then each absolute error, then mean absolute error, then relative and percentage error.
- Add by decimal places; multiply by significant figures; a dropped exact 5 makes the last kept digit even.
- To check an equation, find the dimensions of **every** term; dimensional analysis never gives numerical constants.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Why must a unit be well defined, reproducible and invariable?', 'So that every observer, anywhere and at any time, gets the same number for the same quantity.', 'concept', 1),
    fc(2, 'Base units of the CGS, FPS and MKS systems?', 'CGS: centimetre, gram, second. FPS: foot, pound, second. MKS: metre, kilogram, second.', 'fact', 1),
    fc(3, 'How does MKSA differ from MKS?', 'It adds the ampere as a fourth base unit, for electric current.', 'concept', 1),
    fc(4, 'Unit of force in CGS, FPS and MKS?', 'Dyne, poundal and newton.', 'fact', 1),
    fc(5, 'How many dyne make one newton?', `$${sci(conv.newton, 3)}$ dyne, because $1\\ \\text{N} = 1000\\ \\text{g} \\times 100\\ \\text{cm s}^{-2}$.`, 'example', 1),
    fc(6, 'Name the seven SI base units.', 'Metre, kilogram, second, ampere, kelvin, mole, candela.', 'fact', 2),
    fc(7, 'The newton in base units?', '$\\text{kg m s}^{-2}$.', 'formula', 2),
    fc(8, 'The pascal in base units?', '$\\text{kg m}^{-1}\\text{s}^{-2}$.', 'formula', 2),
    fc(9, 'Define the radian and the steradian.', 'Radian: angle at the centre subtended by an arc equal to the radius, $\\theta = s/r$. Steradian: solid angle subtended by an area $r^2$ of a sphere, $\\Omega = A/r^2$.', 'concept', 2),
    fc(10, 'Is it correct to write "5 kgs." ?', 'No: symbols are not pluralised and take no full stop. Write 5 kg.', 'fact', 2),
    fc(11, 'Is the unit name "Newton" written correctly?', 'No: names of units are written in lower case, newton; only the symbol N is a capital.', 'fact', 2),
    fc(12, 'Prefixes for $10^{-18}$, $10^{-15}$ and $10^{-12}$?', 'Atto, femto and pico.', 'fact', 2),
    fc(13, 'Prefixes for $10^{9}$ and $10^{12}$?', 'Giga and tera.', 'fact', 2),
    fc(14, 'Which SI base unit has a prefix in its name?', 'The kilogram.', 'fact', 2),
    fc(15, 'Value of a light year?', `About $${sf(LY, 3)}$ m: speed of light × one year.`, 'fact', 3),
    fc(16, 'Value of an astronomical unit and of a parsec?', `$${sf(AU, 4)}$ m and $${sf(PARSEC, 3)}$ m ($${dec(PARSEC / LY, 3)}$ ly).`, 'fact', 3),
    fc(17, 'Values of the angstrom and the fermi?', '$10^{-10}$ m and $10^{-15}$ m.', 'fact', 3),
    fc(18, 'What is the unified atomic mass unit?', `One twelfth of the mass of a carbon-12 atom, $1\\ \\text{u} \\approx ${sf(U_KG, 3)}$ kg.`, 'fact', 3),
    fc(19, 'State the parallax relation for distance.', '$D = b/p$, with the baseline $b$ and the parallax angle $p$ in radian.', 'formula', 3),
    fc(20, 'How is the mass of an atom measured?', 'With a mass spectrometer, in unified atomic mass units.', 'fact', 3),
    fc(21, 'Systematic versus random errors?', 'Systematic errors shift every reading the same way; random errors scatter readings and are reduced by averaging.', 'concept', 4),
    fc(22, 'Define the percentage error.', '$\\dfrac{\\Delta a_\\text{mean}}{a_\\text{mean}} \\times 100\\ \\%$, with the mean absolute error $\\Delta a_\\text{mean} = \\sum|\\Delta a_i|/n$.', 'formula', 4),
    fc(23, 'Rule for adding and subtracting measured values?', 'Keep the least number of decimal places.', 'concept', 4),
    fc(24, 'Rule for multiplying and dividing measured values?', 'Keep the least number of significant figures.', 'concept', 4),
    fc(25, 'Round 7.865 to 3 significant figures.', 'The dropped digit is exactly 5 and the last kept digit 6 is even, so 7.86.', 'example', 4),
    fc(26, 'Find the order of magnitude of a number.', 'Write $a \\times 10^{k}$ with $1 \\le a < 10$: the order is $10^{k}$ if $a \\le 3.16$, otherwise $10^{k+1}$.', 'concept', 4),
    fc(27, 'Dimensional formula of force and of energy?', `$${dimTex(Q.force)}$ and $${dimTex(Q.energy)}$.`, 'formula', 5),
    fc(28, 'State the principle of homogeneity.', 'Every term of a correct physical equation has the same dimensions.', 'concept', 5),
    fc(29, 'Name three uses of dimensional analysis.', 'Checking an equation, finding the dimensions of a constant, converting units from one system to another.', 'concept', 6),
    fc(30, 'Name three limitations of dimensional analysis.', 'It gives no pure numbers like ½ or 2π; it cannot handle sin, log, exp or sums of terms; a dimensionally correct equation need not be correct.', 'concept', 6),
  ],
  status: 'draft',
  provenance: PROV,
};
