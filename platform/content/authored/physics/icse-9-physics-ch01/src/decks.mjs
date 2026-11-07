// ICSE 9 Physics ch01 Measurements and Experimentation — Part 1 (t01–t02: units and least count),
// Part 2 (t03–t05: Vernier callipers, screw gauge, simple pendulum).
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { CYL, VERN, SCREW, VERNIER_PARTS, SCREW_PARTS, PENDULUM, GRAPH_TRI_A } from './svgs.mjs';
import { SPEED_MS, DENS, FALL_T, FALL_ERR_COARSE, FALL_ERR_FINE, V, vCm, EX2_TRUE, S_, sMm, EXS_ZERO, EXS_TRUE, PEN_T1, GA_SLOPE, GA_G, PI } from './calc.mjs';

const fig = {
  cyl: svgV(CYL, 'A measuring cylinder with the water level at 46 millilitres on a scale marked every 2 millilitres'),
  vParts: svgV(VERNIER_PARTS, 'Vernier callipers with its main scale, vernier scale, jaws and locking screw named'),
  v1: svgV(VERN.ex1, 'Vernier scale reading 2.34 centimetres: the vernier zero is past the 23rd millimetre mark and the 4th vernier line coincides'),
  vClosed: svgV(VERN.exClosed, 'Vernier callipers with the jaws closed: the vernier zero is to the right of the main zero and the 3rd line coincides, a zero error of plus 0.03 centimetre'),
  v2: svgV(VERN.ex2, 'Vernier scale holding a cylinder with the vernier zero just after the 14th millimetre mark'),
  sParts: svgV(SCREW_PARTS, 'A screw gauge with anvil, spindle, sleeve, thimble and ratchet named'),
  s1: svgV(SCREW.ex1, 'Screw gauge reading 5.37 millimetres: linear scale 5 and circular scale division 37 on the datum line'),
  sClosed: svgV(SCREW.exClosed, 'Screw gauge with the jaws closed and division 6 on the datum line, a zero error of plus 0.06 millimetre'),
  pen: svgV(PENDULUM, 'A simple pendulum with its effective length, mean position and two extreme positions'),
  gr: svgV(GRAPH_TRI_A, 'Graph of l against T squared: a straight line through the origin with a slope triangle'),
};

export const deck1 = deck({
  part: 1,
  title: 'Measurements and Experimentation — Part 1: Units and least count',
  goals: [
    'Name the seven fundamental SI quantities with their units and express derived units in them',
    'Convert a quantity between SI, cgs and fps units',
    'Find the least count of a rule, measuring cylinder and stopwatch and explain why a smaller least count means greater accuracy',
  ],
  slides: [
    sl('title', 'Measuring is comparing', {
      b: 'Part 1 — every measurement compares a quantity with an agreed unit, and every instrument can only be read to a certain smallest step.',
      v: flow('LR', [['q', 'Physical quantity'], ['u', 'Unit'], ['i', 'Instrument'], ['r', 'Reading with least count']], [['q', 'u'], ['u', 'i'], ['i', 'r']], 'Flow: quantity, unit, instrument, reading'),
      n: 'To measure anything we need a unit to compare with and an instrument to do the comparing. In this part we meet the international system of units and learn what limits the accuracy of an instrument.',
    }),
    sl('concept', 'The seven fundamental SI quantities', {
      b: 'The **International System of Units (SI)** is built on seven **fundamental quantities**. Each has one **fundamental unit**.',
      v: table(['Quantity', 'SI unit', 'Symbol'], [['Length', 'metre', 'm'], ['Mass', 'kilogram', 'kg'], ['Time', 'second', 's'], ['Electric current', 'ampere', 'A'], ['Temperature', 'kelvin', 'K'], ['Luminous intensity', 'candela', 'cd'], ['Amount of substance', 'mole', 'mol']], 'Table of the seven fundamental SI quantities with their units and symbols'),
      n: 'Length is measured in metres, mass in kilograms and time in seconds. Electric current uses the ampere, temperature the kelvin, luminous intensity the candela and amount of substance the mole. Every other unit is built from these seven.',
    }),
    sl('concept', 'Derived units', {
      b: 'A **derived unit** is made by combining fundamental units. Force, work and pressure have their own names, but each can be written with kilogram, metre and second.',
      v: table(['Derived quantity', 'Formula', 'Unit in fundamental units'], [['Area', 'length × length', 'm²'], ['Density', 'mass ÷ volume', 'kg m⁻³'], ['Speed', 'distance ÷ time', 'm s⁻¹'], ['Momentum', 'mass × velocity', 'kg m s⁻¹'], ['Force', 'mass × acceleration', 'kg m s⁻² (newton)']], 'Table of derived quantities, their formulae and units in fundamental units'),
      n: 'Density is mass divided by volume, so its unit is kilogram per cubic metre. Momentum is mass times velocity, so its unit is kilogram metre per second. Always work out a derived unit by following the formula.',
    }),
    sl('check', 'Quick check: fundamental or derived', {
      b: 'Think about which quantities need a combination of other units.',
      v: table(['Quantity', 'Unit'], [['Length', 'metre'], ['Temperature', 'kelvin'], ['Force', 'newton'], ['Time', 'second']], 'Table of four quantities and their units'),
      chk: 'chk-base',
      n: 'Look at the four quantities in the table. Which unit is not a fundamental SI unit?',
    }),
    sl('concept', 'Three systems of units', {
      b: 'Besides SI there are the **cgs** system (centimetre, gram, second) and the **fps** system (foot, pound, second).',
      v: table(['Quantity', 'SI', 'cgs', 'fps'], [['Length', 'metre', 'centimetre', 'foot'], ['Mass', 'kilogram', 'gram', 'pound'], ['Time', 'second', 'second', 'second']], 'Table comparing the base units of the SI, cgs and fps systems'),
      n: 'All three systems measure time in seconds. They differ in the units of length and mass. Science and the ICSE syllabus use SI, but older books and some machines still use the other two.',
    }),
    sl('example', 'Worked example 1: converting units', {
      b: r`**Problem.** Convert (a) a cycling speed of 54 km per hour to m per second and (b) an oil density of 0.8 g per cm³ to kg per m³.

**Step 1.** $1\ \text{km} = 1000\ \text{m}$ and $1\ \text{h} = 3600\ \text{s}$, so 54 km per hour is $\dfrac{54 \times 1000}{3600} = ${SPEED_MS.a}$ m per second.

**Step 2.** $1\ \text{g} = 10^{-3}\ \text{kg}$ and $1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$, so $1\ \text{g cm}^{-3} = 1000\ \text{kg m}^{-3}$.

**Step 3.** $0.8 \times 1000 = ${DENS.oil}$ kg per m³.`,
      v: table(['Quantity', 'Given', 'Factor', 'Answer'], [['Speed', '54 km h⁻¹', '1000 ÷ 3600', `${SPEED_MS.a} m s⁻¹`], ['Density', '0.8 g cm⁻³', '× 1000', `${DENS.oil} kg m⁻³`]], 'Table showing the conversion of a speed and a density to SI units'),
      n: 'Write the conversion factor first, then multiply. A kilometre is a thousand metres and an hour is three thousand six hundred seconds, so a speed in kilometres per hour is divided by three point six. A density in grams per cubic centimetre is multiplied by one thousand.',
    }),
    sl('check', 'Quick check: a conversion', {
      b: 'Use the factor from the worked example.',
      v: table(['Given', 'Factor to use'], [['A liquid of density 1.2 g cm⁻³', '× 1000']], 'Table showing a density and the factor to convert it'),
      chk: 'chk-conv',
      n: 'A liquid has a density of one point two grams per cubic centimetre. What is its density in kilograms per cubic metre?',
    }),
    sl('concept', 'Least count', {
      b: 'The **least count** of an instrument is the **smallest value it can measure accurately**. For a scale it equals the value of one smallest division.',
      v: table(['Instrument', 'How the least count is found', 'Least count'], [['Metre rule', 'one smallest division', '1 mm (0.1 cm)'], ['Measuring cylinder', 'volume between two marks ÷ divisions between them', 'for example 2 mL'], ['Stopwatch', 'time of one revolution ÷ divisions on the dial', 'for example 0.1 s']], 'Table showing how to find the least count of a rule, a measuring cylinder and a stopwatch'),
      n: 'The least count is the value of one smallest division. A metre rule has millimetre divisions, so its least count is one millimetre. For a measuring cylinder, divide the volume between two numbered marks by the number of divisions between them.',
    }),
    sl('diagram', 'Reading a measuring cylinder', {
      b: 'Between the **40** and **50** mark there are **5** divisions, so each division is $\\dfrac{10}{5} = 2$ mL. The water level is **3 divisions** above 40.',
      v: fig.cyl,
      n: 'First find the least count. Ten millilitres are shared among five divisions, so each is two millilitres. The level is three divisions above forty, so the reading is forty six millilitres. Read with your eye level with the surface.',
    }),
    sl('example', 'Worked example 2: least count of a cylinder and a stopwatch', {
      b: r`**Problem.** (a) A cylinder is marked 0 to 100 mL with 40 divisions. (b) A stopwatch dial has 300 divisions for one turn of 60 s. Find both least counts.

**Step 1.** Cylinder: $\dfrac{100}{40} = 2.5$ mL.

**Step 2.** Stopwatch: $\dfrac{60}{300} = 0.2$ s.

**Step 3.** A reading can be trusted only to these steps.`,
      v: table(['Instrument', 'Range or period', 'Divisions', 'Least count'], [['Measuring cylinder', '100 mL', '40', '2.5 mL'], ['Stopwatch', '60 s', '300', '0.2 s']], 'Table of the least counts of a cylinder and a stopwatch'),
      n: 'Divide the range by the number of divisions. The cylinder gives two point five millilitres. The stopwatch gives zero point two seconds. You cannot read either instrument more finely than this.',
    }),
    sl('check', 'Quick check: finding a least count', {
      b: 'Count the divisions between the two marks.',
      v: table(['Marks', 'Divisions between them'], [['20 mL and 30 mL', '5']], 'Table giving the marks of a measuring cylinder and the divisions between them'),
      chk: 'chk-lc',
      n: 'Between the twenty and thirty millilitre marks there are five divisions. What is the least count?',
    }),
    sl('concept', 'Smaller least count, greater accuracy', {
      b: `A ball dropped from 2.0 m takes about **${FALL_T} s** to land (g = 10 m s⁻²). A stopwatch that reads only to 0.1 s could be wrong by ${FALL_ERR_COARSE}% of this time; one that reads to 0.01 s by only ${FALL_ERR_FINE}%.`,
      v: table(['Stopwatch least count', 'Possible error in 0.63 s', 'As a fraction of the time'], [['0.1 s', '0.1 s', `about ${FALL_ERR_COARSE}%`], ['0.01 s', '0.01 s', `about ${FALL_ERR_FINE}%`]], 'Table comparing the possible error of a coarse and a fine stopwatch'),
      n: 'The smaller the least count, the smaller the possible error compared with the measurement. That is why a stopwatch that reads to a hundredth of a second gives a more accurate time than one that reads to a tenth.',
    }),
    sl('check', 'Quick check: accuracy', {
      b: 'Compare the least counts before you decide.',
      v: table(['Instrument', 'Least count'], [['Rule', '1 mm'], ['Vernier callipers', '0.1 mm'], ['Screw gauge', '0.01 mm']], 'Table of least counts of a rule, a Vernier callipers and a screw gauge'),
      chk: 'chk-acc',
      n: 'Three instruments can measure the thickness of a coin. Which one gives the most accurate value?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Seven fundamental SI quantities: length, mass, time, current, temperature, luminous intensity, amount of substance.',
        'A derived unit is built from fundamental units, for example kg m⁻³ for density.',
        'SI, cgs and fps differ in the units of length and mass; 1 g cm⁻³ = 1000 kg m⁻³.',
        'Least count is the smallest value an instrument reads; a smaller least count means greater accuracy.',
      ],
      v: table(['Idea', 'Remember'], [['Speed conversion', 'km h⁻¹ ÷ 3.6 gives m s⁻¹'], ['Density conversion', 'g cm⁻³ × 1000 gives kg m⁻³'], ['Least count', 'range ÷ number of divisions']], 'Summary table of the key conversions and the least count rule'),
      n: 'To sum up. There are seven fundamental quantities. Derived units are combinations of them. Convert with care, using the factor for each unit. And the smaller the least count, the more accurate the instrument.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the unit with every answer; a number without a unit loses the mark.',
        'Write the conversion factor first, then substitute.',
        'To find a least count, state the range and the number of divisions.',
        'Give the unit of a derived quantity in fundamental units when asked.',
      ],
      v: table(['Slip', 'Fix'], [['Writing the unit of mass as gram in SI', 'The SI unit is the kilogram'], ['Multiplying instead of dividing by 3.6', 'km h⁻¹ becomes smaller in m s⁻¹'], ['Counting marks instead of divisions', 'Count the gaps between marks']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Always write units. Show the conversion factor. When finding a least count, count the gaps between marks and not the marks themselves.',
    }),
  ],
});

const lcFig = r`$\text{LC} = \dfrac{1\ \text{MSD}}{\text{number of vernier divisions}}$`;
export const deck2 = deck({
  part: 2,
  title: 'Measurements and Experimentation — Part 2: Vernier callipers, screw gauge and the simple pendulum',
  goals: [
    'Find the least count of a Vernier callipers and a screw gauge and read a pictorial scale, correcting for zero error',
    'Define time period and frequency and use T = 2π√(l/g) in simple numericals',
    'Interpret the slope of an l against T² graph and use it to find g',
  ],
  slides: [
    sl('title', 'Instruments for small lengths', {
      b: 'Part 2 — a rule cannot measure the thickness of a wire. Two precise instruments, then the simple pendulum, a famous experiment.',
      v: flow('LR', [['v', 'Vernier callipers'], ['s', 'Screw gauge'], ['p', 'Simple pendulum']], [['v', 's'], ['s', 'p']], 'Flow: Vernier callipers, screw gauge, simple pendulum'),
      n: 'A metre rule reads to one millimetre. For smaller lengths we use two special instruments. After them we study the simple pendulum and use it to find the value of g.',
    }),
    sl('diagram', 'Vernier callipers and its least count', {
      b: 'A **Vernier callipers** has a **main scale** and a sliding **vernier scale**. Ten vernier divisions are equal to nine main scale divisions (1 MSD = 1 mm), so one vernier division is 0.9 mm and the **least count is 0.1 mm = 0.01 cm**.',
      v: fig.vParts,
      n: 'The object is held between the two jaws. The main scale gives the whole millimetres. The vernier scale gives the tenths. Because ten vernier divisions equal nine main divisions, the difference of one vernier and one main division is one tenth of a millimetre.',
    }),
    sl('check', 'Quick check: least count of a Vernier callipers', {
      b: 'Use least count equals one main scale division divided by the number of vernier divisions.',
      v: table(['One main scale division', 'Vernier divisions'], [['1 mm', '10 (equal to 9 main divisions)']], 'Table giving the main scale division and the number of vernier divisions'),
      chk: 'chk-vlc',
      n: 'On a Vernier callipers ten vernier divisions equal nine main scale divisions. One main division is one millimetre. What is the least count?',
    }),
    sl('example', 'Worked example 1: reading a Vernier callipers', {
      b: r`**Problem.** Read the diameter of the cylinder from the figure.

**Step 1.** Main scale reading (just before the vernier zero): 23 mm.

**Step 2.** Vernier line that coincides with a main scale line: the **4th**.

**Step 3.** Vernier reading $= 4 \times 0.1 = 0.4$ mm.

**Step 4.** Reading $= 23 + 0.4 = 23.4$ mm $= ${vCm(V.ex1)}$ cm.`,
      v: fig.v1,
      n: 'Read the main scale at the mark just before the vernier zero. That is twenty three millimetres. Then find the vernier line that lines up with a main scale line. It is the fourth. Four times one tenth is zero point four millimetre. The total is twenty three point four millimetres.',
    }),
    sl('concept', 'Zero error of a Vernier callipers', {
      b: `With the jaws **closed** the zero of the vernier should meet the zero of the main scale. If it does not, the instrument has a **zero error**. Here the vernier zero is to the right and the 3rd line coincides: zero error = **+0.03 cm**. For a positive error, **subtract** it. If the vernier zero is to the left, the error is negative and is **added**.`,
      v: fig.vClosed,
      n: 'Always close the jaws and look at the zero first. If the vernier zero is to the right of the main zero, the error is positive and every reading is too large, so subtract it. If it is to the left, the error is negative and must be added.',
    }),
    sl('example', 'Worked example 2: correcting a reading', {
      b: r`**Problem.** The jaws of this Vernier callipers show a zero error of $+0.03$ cm. The figure shows the reading for a cylinder. Find its true diameter.

**Step 1.** Main scale reading 14 mm and the 8th vernier line coincides, so the observed reading is $14 + 8 \times 0.1 = 14.8$ mm $= ${vCm(V.ex2)}$ cm.

**Step 2.** True reading = observed reading − zero error $= ${vCm(V.ex2)} - 0.03 = ${EX2_TRUE}$ cm.`,
      v: fig.v2,
      n: 'First find the observed reading. It is fourteen millimetres on the main scale and eight tenths from the vernier, which is one point four eight centimetres. The zero error is positive, so subtract it. The true reading is one point four five centimetres.',
    }),
    sl('diagram', 'Screw gauge: pitch and least count', {
      b: 'In a **screw gauge** the **pitch** is the distance the spindle moves in one full turn: here **1 mm**. The circular scale has **100 divisions**, so **least count = pitch ÷ number of divisions = 1 ÷ 100 = 0.01 mm**.',
      v: fig.sParts,
      n: 'The screw gauge measures very thin objects such as a wire. One turn of the thimble moves the spindle by one millimetre. The thimble has one hundred divisions, so each division stands for one hundredth of a millimetre.',
    }),
    sl('check', 'Quick check: pitch and least count', {
      b: 'First find the pitch, then divide by the number of divisions.',
      v: table(['Spindle moves', 'Turns', 'Circular divisions'], [['3 mm', '6', '50']], 'Table giving the movement, the number of turns and the circular scale divisions of a screw gauge'),
      chk: 'chk-slc',
      n: 'The spindle of a screw gauge moves three millimetres in six full turns, and the circular scale has fifty divisions. What is the least count?',
    }),
    sl('example', 'Worked example 3: reading a screw gauge', {
      b: r`**Problem.** Read the diameter of the wire. (Pitch 1 mm, 100 divisions.)

**Step 1.** Linear scale reading: 5 mm.

**Step 2.** Circular scale division on the datum line: 37, so $37 \times 0.01 = 0.37$ mm.

**Step 3.** Reading $= 5 + 0.37 = ${sMm(S_.ex1)}$ mm.`,
      v: fig.s1,
      n: 'The linear scale gives the whole millimetres, which is five. The circular scale division on the datum line is thirty seven. Each division is one hundredth of a millimetre, so that is thirty seven hundredths. The reading is five point three seven millimetres.',
    }),
    sl('concept', 'Zero error of a screw gauge', {
      b: `With the jaws closed, division **6** is on the datum line, so the zero error is **+${EXS_ZERO} mm** and is **subtracted**. If division **94** were on the datum line, the error would be −(100 − 94) × 0.01 = **−0.06 mm** and would be **added**. For the wire of the last example reading ${sMm(S_.ex2)} mm with this error, the true diameter is ${sMm(S_.ex2)} − ${EXS_ZERO} = **${EXS_TRUE} mm**.`,
      v: fig.sClosed,
      n: 'Close the jaws gently with the ratchet and note the division on the datum line. If it is a small number, the error is positive and is subtracted. If it is a number close to one hundred, the error is negative and is added to the reading.',
    }),
    sl('diagram', 'The simple pendulum', {
      b: 'A **simple pendulum** is a small heavy bob on a light thread. The **time period T** is the time for **one complete oscillation** (A to B to A to C to A) and the **frequency f** is the number of oscillations per second, so **f = 1/T**. The unit of T is the second and of f is the hertz.',
      v: fig.pen,
      n: 'One complete oscillation is a trip from the mean position to one extreme, back through the mean position to the other extreme and back again. The time for this is the period. The frequency is the number of oscillations in one second, which is the reciprocal of the period.',
    }),
    sl('example', 'Worked example 4: the time period formula', {
      b: r`The time period of a simple pendulum of effective length $l$ is $T = 2\pi\sqrt{\dfrac{l}{g}}$ (given without derivation). It does not depend on the mass of the bob.

**Problem.** Find T for $l = 2.5$ m. (Take $\pi = ${PI}$ and $g = 10$ m s⁻².)

**Step 1.** $T = 2 \times 3.14 \times \sqrt{\dfrac{2.5}{10}} = 6.28 \times 0.5 = ${PEN_T1}$ s.`,
      v: table(['Change', 'Effect on T'], [['Length × 4', 'T × 2'], ['Length ÷ 9', 'T ÷ 3'], ['Mass of bob changed', 'no change'], ['Taken to a place with smaller g', 'T larger']], 'Table showing how the time period changes with length, mass and g'),
      n: 'Put the length and g into the formula. Two point five divided by ten is one quarter, whose square root is one half. The period is two times pi times one half, which is about three point one four seconds. The mass of the bob has no effect.',
    }),
    sl('check', 'Quick check: effect of length', {
      b: 'T is proportional to the square root of the length.',
      v: table(['Length', 'Time period'], [['l', 'T'], ['9 l', '?']], 'Table of a pendulum length and the unknown time period'),
      chk: 'chk-pen',
      n: 'The length of a pendulum is made nine times as large. By what factor does the time period change?',
    }),
    sl('concept', 'The l against T² graph', {
      b: `Squaring gives $T^2 = \\dfrac{4\\pi^2}{g}\\,l$, so a graph of **l (y-axis) against T² (x-axis)** is a **straight line through the origin**. Its slope $= \\dfrac{\\Delta l}{\\Delta T^2} = \\dfrac{g}{4\\pi^2}$, so **g = 4π² × slope**. Here the slope is ${GA_SLOPE} m s⁻², so g = 4 × 3.14² × ${GA_SLOPE} = ${GA_G} m s⁻².`,
      v: fig.gr,
      n: 'Plot the length on the vertical axis and the square of the period on the horizontal axis. The points fall on a straight line through the origin. Take a large triangle on the line, divide the rise by the run to get the slope, then multiply by four pi squared to get g.',
    }),
    sl('check', 'Quick check: the slope', {
      b: 'The slope of the l against T² line equals g divided by four pi squared.',
      v: table(['Quantity', 'Value'], [['Slope of l against T²', '0.25 m s⁻²'], ['π', '3.14']], 'Table giving the slope of an l against T squared graph and the value of pi'),
      chk: 'chk-slope',
      n: 'The slope of an l against T squared graph is zero point two five. Which expression gives g?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Vernier callipers: LC = 1 MSD ÷ number of vernier divisions = 0.1 mm; reading = MSR + coinciding line × LC.',
        'Screw gauge: LC = pitch ÷ divisions = 0.01 mm; reading = linear scale + circular scale × LC.',
        'Positive zero error is subtracted; negative zero error is added.',
        'T = 2π√(l/g); f = 1/T; slope of the l against T² line = g/4π².',
      ],
      v: table(['Instrument', 'Least count', 'Reading'], [['Vernier callipers', '0.1 mm', 'MSR + n × 0.1 mm'], ['Screw gauge', '0.01 mm', 'LSR + CSR × 0.01 mm']], 'Summary table of the two instruments, their least counts and readings'),
      n: 'To sum up Part 2. Read the main scale first and then the vernier or circular scale. Always check the zero error and correct it. For the pendulum, the period depends on length and g only, and the l against T squared graph gives g.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write the least count first, then the scale readings, then the total.',
        'State the sign of the zero error and apply the correction.',
        'Measure the effective length to the centre of the bob.',
        'Time at least twenty oscillations and divide to get T.',
      ],
      v: table(['Slip', 'Fix'], [['Adding a positive zero error', 'Positive error is subtracted'], ['Timing one oscillation only', 'Time 20 and divide by 20'], ['Plotting T against l and quoting g = slope', 'For l against T², g = 4π² × slope']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. Show the least count, both readings and the total. Mention the sign of the zero error. In the pendulum experiment, time twenty oscillations, and measure the length to the centre of the bob.',
    }),
  ],
});
