// ICSE 10 Computer Applications, ch02: topic t05 (precedence, counters, new and dot, print/println) and the 15-mark programs.
import { Q, mcq, fb, ord, short, long, co, javaOut } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, expect } from './q_util.mjs';

// ================================================================ t05 Precedence, counters, new and dot, print and println
Q('m_prec_value', mcq({
  t: 5, d: 3, c: 'application',
  stem: `A student evaluates ${ic('2 + 3 * 4 - 6 / 2')} on paper before running it. Which value does Java give?`,
  opts: distinct([ev('2 + 3 * 4 - 6 / 2'), ev('((2 + 3) * 4 - 6) / 2'), ev('(2 + 3) * (4 - 6 / 2)'), ev('2 + 3 * (4 - 6) / 2')]),
  sol: `The operators * and / have higher precedence than + and -. So 3 * 4 is ${ev('3 * 4')} and 6 / 2 is ${ev('6 / 2')}, and the expression becomes 2 + ${ev('3 * 4')} - ${ev('6 / 2')}, which is ${ev('2 + 3 * 4 - 6 / 2')}. The other options come from evaluating strictly from left to right or from adding brackets.`,
}));
Q('m_assoc', mcq({
  t: 5, d: 3, c: 'application',
  stem: `What does ${ic('System.out.println(100 / 10 / 5);')} display?`,
  opts: distinct([ev('100 / 10 / 5'), ev('100 / (10 / 5)'), '0', '20']),
  sol: `The / operator associates from left to right: 100 / 10 is ${ev('100 / 10')}, and ${ev('100 / 10')} / 5 is ${ev('100 / 10 / 5')}. Evaluating the right pair first would give ${ev('100 / (10 / 5)')}.`,
}));
Q('m_accum', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: `A loop adds the marks of each student with the statement ${ic('total = total + marks;')}. What is the variable total called?`,
  opts: ['An accumulator', 'A counter', 'A constant', 'A keyword'],
  sol: 'A variable that collects a running sum or product of values is an accumulator. A counter, by contrast, goes up or down by a fixed step (usually 1) to count how many times something happens.',
}));
Q('m_new', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: `What is the job of the operator new in the statement ${ic('Scanner sc = new Scanner(System.in);')}?`,
  opts: ['It creates an object of the class in memory and returns its reference', 'It declares a new variable of type int', 'It reads the next value typed by the user', 'It imports the Scanner class into the program'],
  sol: 'The new operator allocates memory for an object of the named class and gives back a reference to it, which is stored in sc. Reading values is done later, by methods such as nextInt() called on that object.',
}));
Q('m_dot', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: `In the expression ${ic('Math.sqrt(81)')}, what is the purpose of the dot operator?`,
  opts: ['It accesses a member (here a method) of a class or an object', 'It multiplies the two names on either side', 'It creates a new object', 'It marks the end of the statement'],
  sol: `The dot operator joins an object or class name to one of its members. Here it selects the method sqrt of the class Math, and the call gives ${ev('Math.sqrt(81)')}.`,
}));
Q('fb_new_dot', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'The ___ operator creates an object and returns its reference, and the ___ operator accesses a member of an object or of a class.',
  acc: [['new'], ['dot', '.', 'member access']],
  sol: 'new creates the object; the dot operator then reaches its methods and variables, for example sc.nextInt().',
}));
const xv = 12;
const ordSteps = [
  [ic('8 % 5'), ev('8 % 5')],
  [ic('3 * 2'), ev('3 * 2')],
  [ic('3 + 6'), ev('3 + 6')],
  [ic('9 > 8'), ev('9 > 8')],
  [ic('x < 20'), ev(`${xv} < 20`)],
  [ic('true && true'), ev('true && true')],
];
expect(ev('3 + 8 % 5 * 2 > 8 && x < 20', `int x = ${xv};`), 'true', 'ordering expression');
Q('ord_eval', ord({
  t: 5, d: 4, c: 'application',
  stem: `The int variable x holds ${xv}. Arrange the steps in the order in which Java evaluates ${ic('3 + 8 % 5 * 2 > 8 && x < 20')}.`,
  items: ordSteps.map(([e, v]) => `${e} gives ${v}`),
  sol: 'Arithmetic is done before comparison, and comparison before &&. Among % and * (same precedence) the left one comes first; the relational operators > and < are also taken from left to right; && is last.',
}));
Q('co_prec', co({
  pre: 'A student checks three expressions that mix + - * / and % on three variables. Write the exact output.',
  t: 5, d: 3, c: 'application',
  code: code('int a = 5, b = 3, c = 2;', 'System.out.println(a + b * c - a % b);', 'System.out.println(a * b % c);', 'System.out.println(a / b * c + a / (b * c));'),
  sol: '* / and % come before + and -, and operators of equal precedence go from left to right. In the third line a / b is an integer division and a / (b * c) is too, so both quotients are whole numbers.',
}));
Q('co_concat_print', co({
  pre: 'A student mixes print, println and the + operator. Write the exact output of the following code.',
  t: 5, d: 4, c: 'application',
  code: code('System.out.print("Roll ");', 'System.out.print(14);', 'System.out.println("!");', 'System.out.println(3 + 4 + "5");', 'System.out.println("3" + 4 + 5);', 'System.out.println("Sum: " + (3 + 4));'),
  sol: 'The first three lines build one output line; only println ends it. + works from left to right: 3 + 4 is added as numbers before the string appears, but once a String is on the left, every later + joins text. The brackets in the last line force the addition first.',
}));
Q('co_counter_accum', co({
  pre: 'A loop uses a counter and an accumulator. Write the exact output of the following code.',
  t: 5, d: 4, c: 'application',
  code: code('int i = 1, sum = 0, count = 0;', 'while (i <= 10) {', '    if (i % 3 == 0) {', '        sum += i;', '        count++;', '    }', '    i++;', '}', 'System.out.println(count + " " + sum);'),
  sol: 'Only the multiples of 3 up to 10 are counted and added: count is the counter and sum is the accumulator. The variable i is the loop control variable.',
}));
const stEval = (s) => ev(s);
expect(stEval('6 + 4 * 3 % 5 - 2'), '6', 'eval steps');
Q('s_eval_steps', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: [15, 70],
  stem: 'Evaluate the expression 6 + 4 * 3 % 5 - 2 step by step, stating the order in which the operators are applied.',
  model: `* and % have the same precedence and are taken from left to right; + and - come after them.\n\n1. 4 * 3 = ${ev('4 * 3')}\n2. ${ev('4 * 3')} % 5 = ${ev('12 % 5')}\n3. 6 + ${ev('12 % 5')} = ${ev('6 + 2')}\n4. ${ev('6 + 2')} - 2 = **${ev('6 + 4 * 3 % 5 - 2')}**`,
  sol: 'Marks for the correct order and for the final value.',
  scheme: [['Order of operators correct (*, %, +, -)', 1], ['Correct final value', 1]],
}));
const cPrint = code('System.out.print("A");', 'System.out.print("B");', 'System.out.println("C");', 'System.out.println("D");');
Q('s_print_println', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: [15, 60],
  stem: 'Distinguish between System.out.print() and System.out.println(), with an example.',
  model: `**print()** displays its argument and leaves the cursor on the same line, so the next output continues there. **println()** displays its argument and then moves the cursor to the start of the next line.\n\n${F(cPrint)}\n\nThe output is:\n\n\`\`\`\n${out(cPrint)}\n\`\`\``,
  sol: 'One mark for each method, with the cursor position after output made clear.',
  scheme: [['print(): cursor stays on the same line', 1], ['println(): cursor moves to the next line, with an example', 1]],
}));

// ================================================================ 15-mark programs
/** Model answer of a program item: the program, the sample input, the real output and the variable table. */
function prog({ src, stdin, vars }) {
  const result = javaOut(src, { stdin });
  const table = ['| Variable | Data type | Purpose |', '|---|---|---|', ...vars.map(([n, t, p]) => `| ${n} | ${t} | ${p} |`)].join('\n');
  return `${F(src)}\n\n**Sample input:** ${ic(stdin.trim().replace(/\s+/g, ' '))}\n\n**Output:**\n\n\`\`\`\n${result}\n\`\`\`\n\n**Variable description**\n\n${table}`;
}
const S15 = (a, b, c, d, e) => [
  ['Class header, main method and braces correct', a],
  ['Scanner imported and used to read the values', b],
  [c, 6],
  ['Output statements with clear messages', d],
  ['Variable description or comments', e],
];

// ---- temperature
const srcTemp = code(
  'import java.util.Scanner;',
  '',
  'public class TempConverter {',
  '    // Converts a temperature from Celsius to Fahrenheit and Kelvin',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("Enter the temperature in Celsius:");',
  '        double c = sc.nextDouble();',
  '        double f = c * 9 / 5 + 32;   // Fahrenheit',
  '        double k = c + 273.15;       // Kelvin',
  '        System.out.println("Fahrenheit = " + f);',
  '        System.out.println("Kelvin = " + k);',
  '    }',
  '}',
);
Q('l_temp', long({
  t: 4, d: 2, c: 'application', marks: 15,
  stem: 'A weather station in the hills records the morning temperature in degrees Celsius. Write a program in Java to accept the temperature and display it in degrees Fahrenheit (F = C * 9 / 5 + 32) and in Kelvin (K = C + 273.15). Use the Scanner class. Sample input: 25',
  model: prog({ src: srcTemp, stdin: '25\n', vars: [['c', 'double', 'temperature in Celsius, read from the user'], ['f', 'double', 'temperature in Fahrenheit'], ['k', 'double', 'temperature in Kelvin']] }),
  sol: 'Read a double with nextDouble(). Write the two formulas with the correct precedence (multiplication and division before the addition) and display both results.',
  scheme: S15(3, 2, 'Both formulas correct, with the right precedence', 2, 2),
}));

// ---- simple and compound interest
const srcInterest = code(
  'import java.util.Scanner;',
  '',
  'public class Interest {',
  '    // Simple and compound interest for a deposit',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("Enter principal, rate (% per year) and time (years):");',
  '        double p = sc.nextDouble();',
  '        double r = sc.nextDouble();',
  '        int t = sc.nextInt();',
  '        double si = p * r * t / 100;',
  '        double ci = p * Math.pow(1 + r / 100, t) - p;',
  '        System.out.println("Simple interest = " + si);',
  '        System.out.println("Compound interest = " + ci);',
  '        System.out.println("Difference = " + (ci - si));',
  '    }',
  '}',
);
Q('l_interest', long({
  t: 4, d: 3, c: 'application', marks: 15,
  stem: 'A cooperative bank offers a deposit scheme. Write a program in Java to accept the principal, the rate of interest per year and the time in years, and display the simple interest, the compound interest (compounded yearly) and their difference. Use Math.pow() for the compound interest. Sample input: 20000 5 2',
  model: prog({ src: srcInterest, stdin: '20000 5 2\n', vars: [['p', 'double', 'principal amount'], ['r', 'double', 'rate of interest per year'], ['t', 'int', 'time in years'], ['si', 'double', 'simple interest'], ['ci', 'double', 'compound interest']] }),
  sol: 'Simple interest is p * r * t / 100. Compound interest is p * (1 + r / 100) raised to t, minus p; Math.pow() raises to a power.',
  scheme: S15(3, 2, 'Simple interest and compound interest formulas correct (Math.pow used)', 2, 2),
}));

// ---- bill with tax
const srcBill = code(
  'import java.util.Scanner;',
  '',
  'public class StationeryBill {',
  '    // Bill for notebooks with 8% sales tax',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        final double TAX_RATE = 8;',
  '        System.out.println("Enter price of one notebook and quantity:");',
  '        double price = sc.nextDouble();',
  '        int qty = sc.nextInt();',
  '        double amount = price * qty;',
  '        double tax = amount * TAX_RATE / 100;',
  '        double total = amount + tax;',
  '        System.out.println("Amount = " + amount);',
  '        System.out.println("Tax = " + tax);',
  '        System.out.println("Total bill = " + total);',
  '    }',
  '}',
);
Q('l_bill', long({
  t: 4, d: 3, c: 'application', marks: 15,
  stem: 'Kaveri Stationers charges a sales tax of 8% on the price of the goods. Write a program in Java to accept the price of one notebook and the number of notebooks bought, and display the amount before tax, the tax and the total bill. Keep the tax rate as a constant. Sample input: 45.5 12',
  model: prog({ src: srcBill, stdin: '45.5 12\n', vars: [['TAX_RATE', 'double (final)', 'sales tax rate in per cent'], ['price', 'double', 'price of one notebook'], ['qty', 'int', 'number of notebooks'], ['amount', 'double', 'price before tax'], ['tax', 'double', 'tax on the amount'], ['total', 'double', 'bill to be paid']] }),
  sol: 'Multiply price and quantity for the amount, find the tax as a percentage of it, add the two, and declare the tax rate with final.',
  scheme: S15(3, 2, 'Amount, tax and total calculated correctly; tax rate declared with final', 2, 2),
}));

// ---- area and perimeter
const srcArea = code(
  'import java.util.Scanner;',
  '',
  'public class Shapes {',
  '    // Rectangular lawn and circular pond',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        final double PI = 3.14;',
  '        System.out.println("Enter length and breadth of the lawn, radius of the pond:");',
  '        double l = sc.nextDouble();',
  '        double b = sc.nextDouble();',
  '        double r = sc.nextDouble();',
  '        double lawnArea = l * b;',
  '        double lawnPerimeter = 2 * (l + b);',
  '        double pondArea = PI * r * r;',
  '        double pondCircumference = 2 * PI * r;',
  '        System.out.println("Lawn: area = " + lawnArea + ", perimeter = " + lawnPerimeter);',
  '        System.out.println("Pond: area = " + pondArea + ", circumference = " + pondCircumference);',
  '    }',
  '}',
);
Q('l_area', long({
  t: 4, d: 3, c: 'application', marks: 15,
  stem: 'A park has a rectangular lawn and a circular pond. Write a program in Java to accept the length and breadth of the lawn and the radius of the pond, and display the area and perimeter of the lawn and the area and circumference of the pond. Take the value of pi as 3.14, declared as a constant. Sample input: 12.5 8 7',
  model: prog({ src: srcArea, stdin: '12.5 8 7\n', vars: [['PI', 'double (final)', 'value of pi'], ['l, b', 'double', 'length and breadth of the lawn'], ['r', 'double', 'radius of the pond'], ['lawnArea, lawnPerimeter', 'double', 'results for the lawn'], ['pondArea, pondCircumference', 'double', 'results for the pond']] }),
  sol: 'Rectangle: area l * b and perimeter 2 * (l + b). Circle: area pi * r * r and circumference 2 * pi * r. The brackets in the perimeter are essential.',
  scheme: S15(3, 2, 'All four formulas correct, with brackets in the perimeter and PI as a constant', 2, 2),
}));

// ---- swap without a third variable
const srcSwap = code(
  'import java.util.Scanner;',
  '',
  'public class Swap {',
  '    // Interchanges two numbers without using a third variable',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("Enter two integers:");',
  '        int a = sc.nextInt();',
  '        int b = sc.nextInt();',
  '        System.out.println("Before: a = " + a + ", b = " + b);',
  '        a = a + b;',
  '        b = a - b;',
  '        a = a - b;',
  '        System.out.println("After: a = " + a + ", b = " + b);',
  '    }',
  '}',
);
Q('l_swap', long({
  t: 4, d: 3, c: 'application', marks: 15,
  stem: 'Write a program in Java to accept two integers and interchange their values without using a third variable. Display the values before and after the interchange. Sample input: 47 19',
  model: `${prog({ src: srcSwap, stdin: '47 19\n', vars: [['a', 'int', 'first number, receives the second after the swap'], ['b', 'int', 'second number, receives the first after the swap']] })}\n\nDry run for 47 and 19: a becomes ${ev('47 + 19')}; b becomes ${ev('66 - 19')}; a becomes ${ev('66 - 47')}.`,
  sol: 'Store the sum in a, subtract the new a minus b to recover the old a in b, then subtract b from a to recover the old b in a. The three statements must be in this order.',
  scheme: S15(3, 2, 'Three swap statements in the correct order', 2, 2),
}));

// ---- digits with / and %
const srcDigits = code(
  'import java.util.Scanner;',
  '',
  'public class Digits {',
  '    // Digit sum and reverse of a four-digit number',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("Enter a four-digit number:");',
  '        int n = sc.nextInt();',
  '        int d1 = n / 1000;          // thousands digit',
  '        int d2 = n / 100 % 10;      // hundreds digit',
  '        int d3 = n / 10 % 10;       // tens digit',
  '        int d4 = n % 10;            // units digit',
  '        int sum = d1 + d2 + d3 + d4;',
  '        int rev = d4 * 1000 + d3 * 100 + d2 * 10 + d1;',
  '        System.out.println("Digit sum = " + sum);',
  '        System.out.println("Reverse = " + rev);',
  '    }',
  '}',
);
Q('l_digits', long({
  t: 4, d: 4, c: 'application', marks: 15,
  stem: 'A school gives each locker a four-digit code. Write a program in Java to accept a four-digit number, separate its digits using only the operators / and %, and display the sum of the digits and the number formed by reversing the digits. Sample input: 6829',
  model: prog({ src: srcDigits, stdin: '6829\n', vars: [['n', 'int', 'the four-digit number'], ['d1, d2, d3, d4', 'int', 'thousands, hundreds, tens and units digits'], ['sum', 'int', 'sum of the digits'], ['rev', 'int', 'number with the digits reversed']] }),
  sol: 'n / 1000 is the leading digit and n % 10 the last digit; the middle digits come from n / 100 % 10 and n / 10 % 10. The reverse is built by giving each digit the place value of its mirror position.',
  scheme: S15(3, 2, 'All four digits extracted correctly; sum and reverse correct', 2, 2),
}));
