// ICSE 10 Computer Applications, ch05: topic t03 (digit extraction, prime, perfect, Armstrong, palindrome, Fibonacci, HCF and LCM).
import { Q, mcq, ar, tf, fb, match, ord, short } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, num, coT, distinct, mustFail, oline } from './q_util.mjs';

// ---- shared code used by several items and by the slides
export const cExtract = (n) => code(`int n = ${n};`, 'while (n > 0) {', '    int d = n % 10;', '    System.out.println(d);', '    n = n / 10;', '}');
export const cDigitSum = (n) => code(`int n = ${n}, s = 0;`, 'while (n > 0) {', '    s += n % 10;', '    n /= 10;', '}', 'System.out.println(s);');
export const cRev = (n) => code(`int n = ${n}, rev = 0;`, 'while (n > 0) {', '    int d = n % 10;', '    rev = rev * 10 + d;', '    n = n / 10;', '}', 'System.out.println(rev);');
export const cPalin = (n) => code(`int n = ${n}, t = n, rev = 0;`, 'while (t > 0) {', '    rev = rev * 10 + t % 10;', '    t /= 10;', '}', 'if (rev == n)', '    System.out.println(n + " is a palindrome");', 'else', '    System.out.println(n + " is not a palindrome");');
export const cPrime = (n) => code(`int n = ${n}, f = 0;`, 'for (int i = 1; i <= n; i++) {', '    if (n % i == 0)', '        f++;', '}', 'if (f == 2)', '    System.out.println(n + " is prime");', 'else', '    System.out.println(n + " is not prime");');
export const cPrimeBreak = (n) => code(`int n = ${n};`, 'boolean prime = n > 1;', 'for (int i = 2; i < n; i++) {', '    if (n % i == 0) {', '        prime = false;', '        break;', '    }', '}', 'if (prime)', '    System.out.println(n + " is prime");', 'else', '    System.out.println(n + " is not prime");');
export const cPerfect = (n) => code(`int n = ${n}, s = 0;`, 'for (int i = 1; i < n; i++) {', '    if (n % i == 0)', '        s += i;', '}', 'if (s == n)', '    System.out.println(n + " is perfect");', 'else', '    System.out.println(n + " is not perfect, factors add up to " + s);');
export const cArm = (n) => code(`int n = ${n}, t = n, digits = 0, sum = 0;`, 'while (t > 0) {', '    digits++;', '    t /= 10;', '}', 't = n;', 'while (t > 0) {', '    int d = t % 10;', '    sum += (int) Math.pow(d, digits);', '    t /= 10;', '}', 'if (sum == n)', '    System.out.println(n + " is an Armstrong number");', 'else', '    System.out.println(n + " is not an Armstrong number, sum = " + sum);');
export const cFib = code('int a = 0, b = 1;', 'System.out.print(a + " " + b);', 'for (int i = 3; i <= 8; i++) {', '    int c = a + b;', '    System.out.print(" " + c);', '    a = b;', '    b = c;', '}');
export const cHcf = (a, b) => code(`int a = ${a}, b = ${b}, hcf = 1;`, 'for (int i = 1; i <= a && i <= b; i++) {', '    if (a % i == 0 && b % i == 0)', '        hcf = i;', '}', 'int lcm = a * b / hcf;', 'System.out.println("HCF = " + hcf);', 'System.out.println("LCM = " + lcm);');
export const cEuclid = (a, b) => code(`int a = ${a}, b = ${b};`, 'while (b != 0) {', '    int r = a % b;', '    a = b;', '    b = r;', '}', 'System.out.println(a);');

// ================================================================ t03 programs on numbers
Q('m_last_digit', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A token machine keeps the token number in the int variable n. Which expression gives the digit in the units place of n?',
  opts: distinct([ic('n % 10'), ic('n / 10'), ic('n % 100'), ic('n / 100')]),
  sol: `The remainder on division by 10 is the last digit. For n = 4825 the expression n % 10 gives ${ev('4825 % 10')}, while n / 10 gives ${ev('4825 / 10')} (the number without its last digit), n % 100 gives ${ev('4825 % 100')} and n / 100 gives ${ev('4825 / 100')}.`,
}));
Q('m_remove_digit', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The int variable n holds 6385 and a program has to remove its last digit so that n holds 638. Which statement does this?',
  opts: distinct([ic('n = n / 10;'), ic('n = n % 10;'), ic('n = n / 100;'), ic('n = n % 100;')]),
  sol: `Integer division by 10 drops the last digit: 6385 / 10 is ${ev('6385 / 10')}. The statement n % 10 would leave ${ev('6385 % 10')}, n / 100 would leave ${ev('6385 / 100')} and n % 100 would leave ${ev('6385 % 100')}.`,
}));
const revVars = [
  cRev(3472),
  code('int n = 3472, rev = 0;', 'while (n > 0) {', '    int d = n % 10;', '    rev = rev + d * 10;', '    n = n / 10;', '}', 'System.out.println(rev);'),
  code('int n = 3472, rev = 0;', 'while (n > 0) {', '    int d = n % 10;', '    rev = d;', '    n = n / 10;', '}', 'System.out.println(rev);'),
  code('int n = 3472, rev = 0;', 'while (n > 0) {', '    int d = n % 10;', '    rev = rev * 10 + d;', '    n = n / 100;', '}', 'System.out.println(rev);'),
].map((c) => out(c));
Q('m_reverse', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A ticket booth reverses the digits of a number with the loop below. What is displayed?\n\n${F(cRev(3472))}`,
  opts: distinct(revVars.map((v) => ic(v))),
  sol: `The digits are taken from the right: 2, 7, 4 and 3, and rev * 10 + d builds ${revVars[0]} step by step. The result ${revVars[1]} comes from rev + d * 10, ${revVars[2]} from keeping only the last digit extracted, and ${revVars[3]} from dividing by 100 instead of 10, which skips every second digit.`,
}));
const primeCount = num(code('int n = 21, f = 0;', 'for (int i = 1; i <= n; i++)', '    if (n % i == 0)', '        f++;', 'System.out.println(f);'));
const primeThirteen = num(code('int n = 13, f = 0;', 'for (int i = 1; i <= n; i++)', '    if (n % i == 0)', '        f++;', 'System.out.println(f);'));
Q('m_prime_count', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A club tests the number 21 by counting its factors with the code below. What is the value of f after the loop?\n\n${F('int n = 21, f = 0;', 'for (int i = 1; i <= n; i++)', '    if (n % i == 0)', '        f++;')}`,
  opts: distinct([ic(String(primeCount)), ic('2'), ic('3'), ic('21')]),
  sol: `The factors of 21 are 1, 3, 7 and 21, so f becomes ${primeCount}. A prime number has exactly two factors, so 21 is not prime. The value ${primeThirteen} is what f would be for a prime such as 13.`,
}));
const perfSums = [28, 18, 20, 30].map((n) => num(code(`int n = ${n}, s = 0;`, 'for (int i = 1; i < n; i++)', '    if (n % i == 0)', '        s += i;', 'System.out.println(s);')));
Q('m_perfect', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A number-quiz club asks which of the following is a perfect number, that is, a number equal to the sum of its factors other than itself. Choose the correct number.',
  opts: distinct(['28', '18', '20', '30'].map((v) => ic(v))),
  sol: `Adding the factors smaller than the number gives ${perfSums[0]} for 28, which equals the number itself. For 18 the sum is ${perfSums[1]}, for 20 it is ${perfSums[2]} and for 30 it is ${perfSums[3]}, so none of these is perfect.`,
}));
const cubeSum1634 = out(code('int n = 1634, t = n, s = 0;', 'while (t > 0) {', '    int d = t % 10;', '    s += d * d * d;', '    t /= 10;', '}', 'System.out.println(s);'));
Q('m_arm_power', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A program tests whether a four-digit number is an Armstrong number by adding the powers of its digits. To which power must each digit be raised?',
  opts: distinct(['The power 4, because the number has four digits', 'The power 3, as for every Armstrong number', 'The power 2, because the digits are added in pairs', 'The power 10, because the number system has base 10']),
  sol: `The power equals the number of digits. The number 1634 is an Armstrong number: with the power 4 the program prints ${ic(out(cArm(1634)))}. With the power 3 the digits would add up to ${cubeSum1634}, which is not 1634.`,
}));
Q('m_prime_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which statement about prime numbers is correct?',
  opts: distinct(['A prime number has exactly two factors: 1 and the number itself', 'Every odd number greater than 1 is a prime number', 'The number 1 is the smallest prime number', 'A prime number is never even']),
  sol: `Exactly two factors is the definition. The odd number 9 is not prime (${ic(out(cPrime(9)))}), the number 1 has only one factor (${ic(out(cPrime(1)))}), and the even number 2 is prime (${ic(out(cPrime(2)))}).`,
}));
const cNoCopy = code('int n = 1221, rev = 0;', 'while (n > 0) {', '    rev = rev * 10 + n % 10;', '    n = n / 10;', '}', 'if (rev == n)', '    System.out.println("Palindrome");', 'else', '    System.out.println("Not a palindrome");');
Q('m_palin_copy', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A palindrome program copies the number n into another variable t and reverses t, instead of reversing n itself. Why is the copy used?',
  opts: distinct(['The loop reduces the variable it works on to 0, so the original value must be kept for the final comparison', 'A loop can work only on a variable named t', 'The Scanner cannot read the same number twice', 'An int variable cannot be changed inside a loop']),
  sol: `If n itself were reduced by the loop, it would be 0 at the end and the comparison rev == n would be false even for 1221: that program prints ${ic(out(cNoCopy))}. The copy leaves n unchanged for the comparison.`,
}));
const armDeckLine = null;
export const cFibTrace = code('int a = 2, b = 3;', 'for (int i = 1; i <= 4; i++) {', '    int c = a + b;', '    a = b;', '    b = c;', '}', 'System.out.println(a + " " + b);');
const fibVars = [
  cFibTrace,
  code('int a = 2, b = 3;', 'for (int i = 1; i <= 4; i++) {', '    a = b;', '    int c = a + b;', '    b = c;', '}', 'System.out.println(a + " " + b);'),
  code('int a = 2, b = 3;', 'for (int i = 1; i <= 4; i++) {', '    int c = a + b;', '    b = c;', '    a = b;', '}', 'System.out.println(a + " " + b);'),
  code('int a = 2, b = 3;', 'for (int i = 1; i <= 4; i++) {', '    a = a + b;', '    b = a + b;', '}', 'System.out.println(a + " " + b);'),
].map((c) => out(c));
Q('m_fib_trace', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `A rabbit-farm chart starts with the terms 2 and 3, and each new term is the sum of the two terms before it. What does this code display?\n\n${F(cFibTrace)}`,
  opts: distinct(fibVars.map((v) => ic(v))),
  sol: `After each pass a holds the old b and b holds the new term: (3, 5), (5, 8), (8, 13) and (13, 21), so the code displays ${fibVars[0]}. Changing the order of the statements breaks this: a = b first gives ${fibVars[1]}, b = c before a = b gives ${fibVars[2]}, and a = a + b followed by b = a + b gives ${fibVars[3]}, because the second statement uses the already changed a.`,
}));

const oneFactors = num(code('int n = 1, f = 0;', 'for (int i = 1; i <= n; i++)', '    if (n % i == 0)', '        f++;', 'System.out.println(f);'));
Q('tf_prime_one', tf({
  t: 3, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? A program that counts the factors of a number with a loop and checks whether the count is 2 will report the number 1 as a prime number.',
  sol: `The number 1 has only ${oneFactors} factor, so the count is ${oneFactors} and not 2: the program reports ${ic(out(cPrime(1)))}. By definition a prime number has exactly two factors, 1 and itself.`,
}));
Q('fb_digit', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'To extract the last digit of an int n, the operator ___ is used with 10, and to drop that digit the operator ___ is used with 10.',
  acc: [['%', 'modulus', 'remainder', 'mod'], ['/', 'division', 'divide']],
  sol: 'The remainder operator % gives the last digit (n % 10), and integer division / drops it (n / 10).',
}));
const nt = { p: out(cPrime(29)), f: out(cPerfect(28)), a: out(cArm(153)), l: out(cPalin(1221)) };
Q('mt_numtype', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Match each number with the property that it satisfies.',
  pairs: [[ic('28'), 'perfect number'], [ic('153'), 'Armstrong number'], [ic('1221'), 'palindrome'], [ic('29'), 'prime number']],
  sol: `The programs print: ${ic(nt.f)}; ${ic(nt.a)}; ${ic(nt.l)}; ${ic(nt.p)}.`,
}));
Q('ord_fib', ord({
  t: 3, d: 3, c: 'application',
  stem: 'A program generates the next term of a Fibonacci series with the variables a, b and c. Arrange the three statements of the loop body in the correct order.',
  items: [ic('c = a + b;'), ic('a = b;'), ic('b = c;')],
  sol: `The new term c is calculated first, from the old a and b. Then a takes the old b, and b takes the new term. If b = c came before a = b, a would receive the new term as well and the series would be wrong: in a series that starts with 2 and 3, four passes with that wrong order end with ${ic(fibVars[2])} instead of ${ic(fibVars[0])}.`,
}));
Q('ar_digits', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'For the int variable n = 4825, the expression n % 10 gives 5.',
  r: 'For the int variable n = 4825, the expression n / 10 gives 482 because division of two ints discards the fractional part.',
  sol: `Java gives ${ev('4825 % 10')} for n % 10 and ${ev('4825 / 10')} for n / 10, so both statements are true. But (R) is about n / 10, which removes the last digit; it does not explain why n % 10 is the last digit.`,
}));

// ---- code output, t03
Q('co_digit_sum', coT({
  pre: 'A shop adds the digits of a bill number to make a check digit. Write the exact output of the code.',
  t: 3, d: 3, c: 'application',
  code: cDigitSum(5029),
  sol: 'The loop takes the last digit with n % 10 and then removes it with n /= 10: the digits 9, 2, 0 and 5 are added to give 16. The loop ends when n becomes 0.',
}));
mustFail(code('int d = 3, digits = 4;', 'int p = Math.pow(d, digits);', 'System.out.println(p);'), 'Math.pow into int');
Q('co_err_lossy', coT({
  pre: 'A student calculates the fourth power of a digit with the statements below. State the error that the compiler reports.',
  t: 3, d: 4, c: 'analysis', error: true,
  code: code('int d = 3, digits = 4;', 'int p = Math.pow(d, digits);', 'System.out.println(p);'),
  sol: 'Math.pow returns a double, and a double cannot be stored in an int without a cast. The corrected statement is int p = (int) Math.pow(d, digits);',
  scheme: [['Compile-time error with the correct line', 1], ['Cause: Math.pow returns double; an explicit cast to int is needed', 1]],
}));

// ---- short answers, t03
const cArmSimple = code('int n = 153, t = n, sum = 0;', 'while (t > 0) {', '    int d = t % 10;', '    sum += d * d * d;', '    t = t / 10;', '}', 'if (sum == n)', '    System.out.println("Armstrong number");', 'else', '    System.out.println("Not an Armstrong number");');
Q('s_armstrong', short({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'What is an Armstrong number? Write the Java statements that test the three-digit number 153 and display whether it is an Armstrong number.',
  model: `An **Armstrong number** is a number that is equal to the sum of its digits, each raised to the power of the number of digits. For a three-digit number the cubes of the digits are added.

${F(cArmSimple)}

Output: ${ic(out(cArmSimple))}.`,
  sol: 'One mark for the definition and one for a correct digit loop with the comparison.',
  scheme: [['Definition: sum of the digits raised to the power of the number of digits equals the number', 1], ['Digit loop with the cubes added and the comparison with the original number', 1]],
}));
const cFactorsOf = code('int n = 18, s = 0;', 'for (int i = 1; i < n; i++) {', '    if (n % i == 0)', '        s += i;', '}', 'System.out.println(s);');
const cPrimeShow = code('int n = 7, f = 0;', 'for (int i = 1; i <= n; i++) {', '    if (n % i == 0)', '        f++;', '}', 'System.out.println(f);');
Q('s_prime_perfect', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between a prime number and a perfect number. Give one example of each.',
  model: `A **prime number** has exactly two factors, 1 and the number itself; for example 7, whose factor count by a loop is ${ic(out(cPrimeShow))}. A **perfect number** is equal to the sum of its factors other than itself; for example 28, because ${ic(out(cPerfect(28)))}. A number such as 18 is not perfect, because its factors other than 18 add up to ${out(cFactorsOf)}.`,
  sol: 'One mark for each kind of number with a correct example.',
  scheme: [['Prime: exactly two factors, with an example', 1], ['Perfect: equals the sum of its factors other than itself, with an example', 1]],
}));
const cHcfShow = cHcf(84, 120);
Q('s_hcf_lcm', short({
  t: 3, d: 4, c: 'application', marks: 2,
  stem: 'Write the Java statements that find the HCF and the LCM of the int variables a and b by testing every number up to the smaller of the two, taking a as 84 and b as 120.',
  model: `${F(cHcfShow)}\n\nOutput: ${ic(oline(cHcfShow))}. The loop keeps the largest number that divides both, which is the HCF; the LCM is found from the relation HCF x LCM = a x b, that is, ${ic('a * b / hcf')}.`,
  sol: 'The loop tests every i up to the smaller number and remembers the last common factor; the LCM then follows from the product divided by the HCF.',
  scheme: [['Loop with i <= a && i <= b and the test of both remainders to find the HCF', 1], ['LCM calculated as a * b / hcf and both results displayed', 1]],
}));
