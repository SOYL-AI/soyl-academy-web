// ICSE 10 Computer Applications, ch03: topic t03 (Math class methods, random numbers, Java expressions for formulae).
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, mustFail, expect, rangeOf, typeOf } from './q_util.mjs';

// ---------------------------------------------------------------- calling and values
const eNoStatic = mustFail('System.out.println(sqrt(49));', 'sqrt alone');
const eNewMath = mustFail('System.out.println(new Math().sqrt(49));', 'new Math');
mustFail('System.out.println(Math.sqrt[49]);', 'Math.sqrt[49]');
Q('m_static_call', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement correctly displays the square root of 49 using the Math class?',
  opts: distinct([ic('System.out.println(Math.sqrt(49));'), ic('System.out.println(sqrt(49));'), ic('System.out.println(new Math().sqrt(49));'), ic('System.out.println(Math.sqrt[49]);')]),
  sol: `The methods of Math are static: they are called with the class name and the dot operator, and no object is made. Without the class name javac says "${eNoStatic}", and trying to create an object gives "${eNewMath}". The correct statement displays ${ev('Math.sqrt(49)')}.`,
}));
Q('m_pow_val', mcq({
  t: 3, d: 2, c: 'application',
  stem: `A game gives 3 raised to the power of the level number as the score. What does ${ic('System.out.println(Math.pow(3, 4));')} display for level 4?`,
  opts: distinct([ev('Math.pow(3, 4)'), '81', ev('Math.pow(4, 3)'), '12.0']),
  sol: `Math.pow(x, y) returns x raised to the power y as a double, so 3 to the power 4 is shown as ${ev('Math.pow(3, 4)')} and not 81. The option ${ev('Math.pow(4, 3)')} comes from swapping the arguments.`,
}));
Q('m_round_neg', mcq({
  t: 3, d: 3, c: 'application',
  stem: `What does ${ic('System.out.println(Math.round(-7.5));')} display?`,
  opts: distinct([ev('Math.round(-7.5)'), ev('(int) Math.floor(-7.5)'), ev('Math.ceil(-7.5)'), ev('Math.floor(-7.5)')]),
  sol: `A value that lies exactly half way between two integers is rounded towards positive infinity, so -7.5 becomes ${ev('Math.round(-7.5)')} (the larger of -8 and -7). The result of round is a long and is shown without a decimal point; ${ev('Math.ceil(-7.5)')} and ${ev('Math.floor(-7.5)')} are what ceil and floor give.`,
}));
Q('m_ceil_floor_def', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Which statement about Math.ceil() and Math.floor() is correct?',
  opts: distinct(['ceil never returns a value smaller than its argument and floor never returns a value larger than its argument', 'ceil always moves the value away from zero and floor always moves it towards zero', 'ceil returns an int and floor returns a double', 'ceil and floor give the same result for every negative number']),
  sol: `ceil returns the smallest whole number not below the argument and floor the largest whole number not above it, both as doubles. For -2.3 they give ${ev('Math.ceil(-2.3)')} and ${ev('Math.floor(-2.3)')}: ceil moves towards zero and floor away from zero for a negative value, so the statement that ceil always moves away from zero is wrong. Both methods return a double, not an int.`,
}));
const eRound = mustFail('int r = Math.round(4.6);', 'int = round(double)');
const tRound = typeOf('Math.round(4.6)');
expect(tRound, 'long', 'round returns long');
Q('m_return_type', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'What is the data type of the value returned by Math.round() when its argument is a double?',
  opts: distinct(['long', 'int', 'double', 'float']),
  sol: `Math.round(double) returns a long. That is why ${ic('int r = Math.round(4.6);')} is rejected with "${eRound}" and needs a cast, (int) Math.round(4.6), which gives ${ev('(int) Math.round(4.6)')}.`,
}));

// ---------------------------------------------------------------- random numbers
const rLoHi = out('double lo = 1, hi = 0;', 'for (int i = 0; i < 50000; i++) {', '    double v = Math.random();', '    if (v < lo) lo = v;', '    if (v > hi) hi = v;', '}', 'System.out.println((lo >= 0) + " " + (hi < 1));');
expect(rLoHi, 'true true', 'random stays in [0, 1)');
Q('m_random_range', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement describes the value returned by Math.random()?',
  opts: distinct(['A double that is at least 0.0 and less than 1.0', 'A double that is at least 0.0 and at most 1.0', 'An int from 0 to 99', 'A double from 1.0 to 10.0']),
  sol: 'Math.random() returns a double d with 0.0 <= d < 1.0: the lower limit can occur but 1.0 itself never does. To get whole numbers in another range, the value is multiplied and cast.',
}));
const rf = (e) => rangeOf(e).join(' to ');
const f1 = '(int) (Math.random() * 11) + 10';
const f2 = '(int) (Math.random() * 10) + 10';
const f3 = '(int) (Math.random() * 20) + 10';
const f4 = '(int) (Math.random() * 21)';
expect(rf(f1), '10 to 20', 'formula 10..20');
Q('m_random_formula', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A quiz program must choose a random whole number from 10 to 20, both included. Which expression does this?',
  opts: distinct([ic(f1), ic(f2), ic(f3), ic(f4)]),
  sol: `The general form for a number from a to b is (int) (Math.random() * (b - a + 1)) + a, here (20 - 10 + 1) = 11 values starting at 10. Repeating each expression 50000 times, the smallest and largest values seen were: ${ic(f1)} ${rf(f1)}; ${ic(f2)} ${rf(f2)}; ${ic(f3)} ${rf(f3)}; ${ic(f4)} ${rf(f4)}.`,
}));
const fTrap = '(int) Math.random() * 6 + 1';
expect(rf(fTrap), '1 to 1', 'cast-first trap');
Q('m_random_trap', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `A student simulates a die with ${ic('int d = (int) Math.random() * 6 + 1;')} What values can d take?`,
  opts: distinct(['It is always 1', 'Any whole number from 1 to 6', 'Any whole number from 0 to 5', 'Any whole number from 1 to 7']),
  sol: `The cast (int) applies to Math.random() alone, before the multiplication, and a value below 1.0 becomes 0. So d = 0 * 6 + 1 every time; repeated 50000 times the smallest and largest values were ${rf(fTrap)}. The correct form is (int) (Math.random() * 6) + 1.`,
}));

// ---------------------------------------------------------------- formulae as Java expressions
const qPre = 'int a = 2, b = -7, c = 3;';
const qCorrect = '(-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)';
const qW1 = '(-b + Math.sqrt(b * b - 4 * a * c)) / 2 * a';
const qW2 = '-b + Math.sqrt(b * b - 4 * a * c) / (2 * a)';
const qW3 = '(-b + Math.sqrt(b ^ 2 - 4 * a * c)) / (2 * a)';
expect(ev(qCorrect, qPre), '3.0', 'quadratic root');
Q('m_expr_quad', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `The larger root of a quadratic equation with coefficients a, b and c is (-b + sqrt(b squared - 4ac)) divided by 2a. For a = 2, b = -7 and c = 3 the root is 3. Which Java expression, with int variables a, b and c, gives it?`,
  opts: distinct([ic(qCorrect), ic(qW1), ic(qW2), ic(qW3)]),
  sol: `The whole numerator and the whole denominator need brackets. With a = 2, b = -7, c = 3 the correct expression gives ${ev(qCorrect, qPre)}. Writing / 2 * a gives ${ev(qW1, qPre)} (it divides by 2 and then multiplies by a), leaving out the brackets of the numerator gives ${ev(qW2, qPre)} (only the square root is divided) and b ^ 2 gives ${ev(qW3, qPre)} (the caret is the bitwise exclusive-or operator, not a power; Math.pow(b, 2) or b * b is needed).`,
}));
const sPre = 'double r = 2;';
const sOk = '4.0 / 3 * 3.14 * Math.pow(r, 3)';
const sW1 = '4 / 3 * 3.14 * Math.pow(r, 3)';
const sW2 = '4.0 / 3 * 3.14 * Math.pow(r, 2)';
const sW3 = '4.0 / 3 * 3.14 * Math.pow(3, r)';
Q('m_expr_sphere', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `The volume of a sphere of radius r is 4/3 times pi times r cubed. Taking pi as 3.14 and r as a double variable, which expression gives the volume?`,
  opts: distinct([ic(sOk), ic(sW1), ic(sW2), ic(sW3)]),
  sol: `For r = 2 the correct expression gives ${ev(sOk, sPre)}. Starting with 4 / 3 gives ${ev(sW1, sPre)}, because 4 / 3 is an integer division and equals ${ev('4 / 3')}. Math.pow(r, 2) squares instead of cubing (${ev(sW2, sPre)}) and Math.pow(3, r) swaps base and exponent (${ev(sW3, sPre)}).`,
}));
Q('ar_round', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Math.round(-2.5) returns -2, whereas Math.round(2.5) returns 3.',
  r: 'Math.round() sends a value that lies exactly half way between two integers towards positive infinity.',
  sol: `The two calls give ${ev('Math.round(-2.5)')} and ${ev('Math.round(2.5)')}. In both cases the larger neighbour is chosen: 3 is above 2.5 and -2 is above -3.`,
}));
Q('ar_pow_type', ar({
  t: 3, d: 2, c: 'understanding', verdict: 'A-true-R-false',
  a: 'The statement System.out.println(Math.pow(2, 3)); displays 8.0 and not 8.',
  r: 'Math.pow() returns an int whenever both of its arguments are ints.',
  sol: `The statement really displays ${ev('Math.pow(2, 3)')}. The reason given is false: pow always returns a double, which is printed with a decimal point; its type is ${typeOf('Math.pow(2, 3)')}.`,
}));
Q('tf_round_half', tf({
  t: 3, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? Math.round(-4.5) returns -5, because round always moves a half away from zero.',
  sol: `Math.round() moves a value that is exactly half way towards positive infinity, not away from zero. Math.round(-4.5) returns ${ev('Math.round(-4.5)')} (the larger of -5 and -4), while Math.round(4.5) returns ${ev('Math.round(4.5)')}.`,
}));
Q('fb_random_range', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Math.random() returns a value of type ___ that is at least ___ and less than ___.',
  acc: [['double'], ['0.0', '0'], ['1.0', '1']],
  sol: 'The value is a double d that satisfies 0.0 <= d < 1.0: the lower limit may occur, the upper limit never does.',
}));
Q('s_static', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: [20, 70],
  stem: 'What is a static method? Why can Math.sqrt(49) be written without creating an object of the class Math?',
  model: `A **static method** belongs to the class itself and not to any object, so it is called with the class name and the dot operator.

All methods of the class Math are static, so ${ic('Math.sqrt(49)')} (value ${ic(ev('Math.sqrt(49)'))}) needs no object; the class is in java.lang and needs no import.`,
  sol: 'One mark for the meaning of a static method and one mark for applying it to Math.',
  scheme: [['Static method: belongs to the class, called through the class name', 1], ['Math methods are static, so no object is needed', 1]],
}));
Q('tf_sqrt_nan', tf({
  t: 3, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? The statement System.out.println(Math.sqrt(-4)); stops the program with an exception.',
  sol: `The program does not stop. The square root of a negative number is not a real number, and Math.sqrt() returns the special double value NaN (not a number); the statement displays ${ev('Math.sqrt(-4)')}.`,
}));
Q('fb_math_ret', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The methods Math.pow() and Math.ceil() return a value of type ___, but Math.round() with a double argument returns a value of type ___.',
  acc: [['double'], ['long']],
  sol: `The types are ${typeOf('Math.pow(2, 3)')}, ${typeOf('Math.ceil(2.1)')} and ${typeOf('Math.round(2.6)')} respectively: pow and ceil give a double, round gives a long.`,
}));
Q('mt_math_vals', match({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Match each Math method call with the value that it returns.',
  pairs: [[ic('Math.ceil(7.2)'), ic(ev('Math.ceil(7.2)'))], [ic('Math.floor(7.8)'), ic(ev('Math.floor(7.8)'))], [ic('Math.round(7.5)'), ic(ev('Math.round(7.5)'))], [ic('Math.abs(-7.5)'), ic(ev('Math.abs(-7.5)'))]],
  sol: 'ceil goes up to the next whole number and floor goes down, both as doubles; round gives the nearest long, with a half going up; abs removes the minus sign and keeps the type.',
}));
const ordItems = [['Math.cbrt(8)', ev('Math.cbrt(8)')], ['Math.sqrt(16)', ev('Math.sqrt(16)')], ['Math.pow(3, 2)', ev('Math.pow(3, 2)')], ['Math.floor(12.9)', ev('Math.floor(12.9)')]];
Q('ord_math', ord({
  t: 3, d: 2, c: 'application',
  stem: 'Arrange these calls in increasing order of the value that each returns.',
  items: ordItems.map(([e]) => ic(e)),
  sol: `The values are ${ordItems.map(([e, v]) => `${e} = ${v}`).join(', ')}.`,
}));

// ---------------------------------------------------------------- code output and errors
Q('co_math_a', co({
  pre: 'A surveyor tests the rounding methods on three readings. Write the exact output of the following code.',
  t: 3, d: 3, c: 'application',
  code: code('System.out.println(Math.ceil(-3.2));', 'System.out.println(Math.floor(-3.2));', 'System.out.println(Math.round(-3.2));', 'System.out.println(Math.round(2.5));', 'System.out.println(Math.round(-2.5));'),
  sol: 'ceil and floor return doubles, so they show a decimal point; round returns a whole number. A half is rounded towards positive infinity, so 2.5 gives 3 and -2.5 gives -2.',
}));
Q('co_math_b', co({
  pre: 'A teacher checks power, root, maximum and minimum calls. Write the exact output of the following code.',
  t: 3, d: 3, c: 'application',
  code: code('System.out.println(Math.pow(2, 4));', 'System.out.println((int) Math.pow(2, 4));', 'System.out.println(Math.cbrt(-27));', 'System.out.println(Math.max(-5, -9) + Math.min(3, 8));'),
  sol: 'pow returns a double (16.0) and the cast turns it into an int. The cube root of a negative number is defined. max of -5 and -9 is -5 and min of 3 and 8 is 3; both are ints, so the sum is an int.',
}));
Q('co_round_err', co({
  pre: 'A ticket program rounds a distance with Math.round() and stores it in an int. The code does not compile. Write the error message and the line number that javac reports.',
  t: 3, d: 4, c: 'analysis', error: true,
  code: code('double km = 5.5;', 'int whole = Math.round(km);', 'System.out.println(whole);'),
  sol: 'Math.round() with a double argument returns a long, and a long cannot be stored in an int without a cast. Writing (int) Math.round(km) removes the error.',
}));
Q('co_random_range', co({
  pre: 'A loop draws 50000 random numbers with the expression below and keeps the smallest and the largest value that it sees. Write the exact output.',
  t: 3, d: 4, c: 'application',
  code: code('int lo = 99, hi = 0;', 'for (int i = 0; i < 50000; i++) {', '    int v = (int) (Math.random() * 5) + 3;', '    if (v < lo) lo = v;', '    if (v > hi) hi = v;', '}', 'System.out.println(lo + " " + hi);'),
  sol: 'The expression (int) (Math.random() * 5) gives 0, 1, 2, 3 or 4, and adding 3 gives the whole numbers from 3 to 7. With so many draws both limits are certain to be seen.',
}));

// ---------------------------------------------------------------- short answers
const typesTxt = [['Math.pow(2, 3)', typeOf('Math.pow(2, 3)')], ['Math.round(2.6)', typeOf('Math.round(2.6)')], ['Math.abs(-5)', typeOf('Math.abs(-5)')], ['Math.max(3, 4.5)', typeOf('Math.max(3, 4.5)')]];
Q('s_math_return', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: [15, 70],
  stem: 'State the data type of the value returned by each call: Math.pow(2, 3), Math.round(2.6), Math.abs(-5) and Math.max(3, 4.5).',
  model: typesTxt.map(([e, t], i) => `${i + 1}. ${ic(e)} returns ${/^[aeiou]/.test(t) ? 'an' : 'a'} **${t}** (value ${ic(ev(e))}).`).join('\n'),
  sol: 'Half a mark for each correct type, with a reason where needed: max returns the type of the wider argument.',
  scheme: [['Two types correct', 1], ['All four types correct', 1]],
}));
const hypPre = 'double a = 6, b = 8;';
Q('s_expr_hypot', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Write a Java statement to find the hypotenuse h of a right-angled triangle whose perpendicular sides are the double variables a and b.',
  model: `${F('double h = Math.sqrt(a * a + b * b);')}\n\nFor a = 6 and b = 8 the statement stores ${ic(ev('Math.sqrt(a * a + b * b)', hypPre))} in h. Math.pow(a, 2) + Math.pow(b, 2) may be used instead of a * a + b * b.`,
  sol: 'One mark for the sum of the squares and one mark for the square root of the whole sum.',
  scheme: [['Sum of the squares of a and b', 1], ['Math.sqrt() applied to the whole sum and stored in h', 1]],
}));
const ciPre = 'double p = 1600, r = 25;\nint t = 2;';
Q('s_expr_ci', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Write a Java statement to find the amount A = P (1 + R / 100) raised to the power T, where p and r are double variables and t is an int variable.',
  model: `${F('double amount = p * Math.pow(1 + r / 100, t);')}\n\nFor p = 1600, r = 25 and t = 2 the statement gives ${ic(ev('p * Math.pow(1 + r / 100, t)', ciPre))}.`,
  sol: 'One mark for Math.pow with the correct base and exponent and one mark for multiplying by p.',
  scheme: [['Math.pow(1 + r / 100, t) with the base in brackets', 1], ['Multiplied by p and stored in a double variable', 1]],
}));
const rand50 = '(int) (Math.random() * 50) + 1';
expect(rf(rand50), '1 to 50', 'random 1 to 50');
Q('s_random_expr', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Write a Java expression that generates a random whole number from 1 to 50, both included, and explain how it works.',
  model: `${F('int n = (int) (Math.random() * 50) + 1;')}\n\nMath.random() is at least 0.0 and below 1.0, so multiplying by 50 gives a value from 0.0 up to below 50.0. The cast to int keeps 0 to 49 and adding 1 shifts the range to 1 to 50 (smallest and largest values seen in 50000 trials: ${ic(rf(rand50))}).`,
  sol: 'One mark for the expression with the correct multiplier and one mark for the explanation.',
  scheme: [['Expression (int) (Math.random() * 50) + 1', 1], ['Explanation of multiplier, cast and shift', 1]],
}));
Q('s_ceil_floor', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: [20, 80],
  stem: 'Distinguish between Math.ceil() and Math.floor() using the values -3.2 and 3.2.',
  model: `**Math.ceil(x)** returns the smallest whole number that is not less than x, as a double. **Math.floor(x)** returns the largest whole number that is not greater than x, as a double.\n\n${ic('Math.ceil(3.2)')} = ${ev('Math.ceil(3.2)')}, ${ic('Math.floor(3.2)')} = ${ev('Math.floor(3.2)')}, ${ic('Math.ceil(-3.2)')} = ${ev('Math.ceil(-3.2)')}, ${ic('Math.floor(-3.2)')} = ${ev('Math.floor(-3.2)')}.`,
  sol: 'One mark for the two meanings and one mark for the four correct values.',
  scheme: [['Meaning of ceil and of floor', 1], ['Four values correct', 1]],
}));
