// ICSE 10 Computer Applications, ch02: topics t03 (data types, conversion) and t04 (operators).
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, mustCompile, mustFail, SIZES } from './q_util.mjs';

// ================================================================ t03 Data types and type conversion
Q('m_not_prim', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which of the following is NOT a primitive data type of Java?',
  opts: distinct(['String', 'char', 'boolean', 'long']),
  sol: 'String is a class, so it is a non-primitive (reference) type. char, boolean and long are primitive types.',
}));
const cWhole = code('double kg = 7.9;', 'int whole = (int) kg;', 'System.out.println(whole);');
Q('m_cast_trunc', mcq({
  t: 3, d: 2, c: 'application',
  stem: `A canteen helper stores a weight of 7.9 kg as a whole number. What does the code display?\n\n${F(cWhole)}`,
  opts: distinct([out(cWhole), ev('Math.round(7.9)'), '7.9', 'A compile-time error']),
  sol: 'A cast from double to int drops the fractional part; it never rounds. The value 7.9 becomes 7.',
}));
Q('m_mixed', mcq({
  t: 3, d: 3, c: 'application',
  stem: `What is the value of the expression ${ic('5 / 2 * 2.0')}?`,
  opts: distinct([ev('5 / 2 * 2.0'), ev('5.0 / 2 * 2'), ev('5 / (2 * 2.0)'), ev('5 / 2 * 2')]),
  sol: `The operators / and * are evaluated from left to right. 5 / 2 has two int operands, so it is integer division and gives ${ev('5 / 2')}. Then ${ev('5 / 2')} * 2.0 is an int multiplied by a double, which gives the double ${ev('5 / 2 * 2.0')}.`,
}));
const cAvg = code('double avg = 17 / 4;', 'System.out.println(avg);');
Q('m_int_div_double', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `A teacher expects 4.25 but the program below displays something else. What does it display?\n\n${F(cAvg)}`,
  opts: distinct([out(cAvg), '4.25', '4', 'A compile-time error']),
  sol: 'The division 17 / 4 is completed first, and both operands are int, so the quotient is the int 4. Only then is it widened to double for storage in avg, which is why the result is 4.0 and not 4.25. Writing 17.0 / 4 would give 4.25.',
}));
mustCompile('double rate = 12;', 'double rate');
mustFail('int units = 12.0;', 'int units');
mustFail('float tax = 7.5;', 'float tax');
mustFail('char sym = 70000;', 'char sym');
Q('m_no_cast', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'Which one of the following declarations compiles without any explicit cast?',
  opts: distinct([ic('double rate = 12;'), ic('int units = 12.0;'), ic('float tax = 7.5;'), ic('char sym = 70000;')]),
  sol: 'An int can be widened to double automatically. A double literal cannot go into an int or a float, and 70000 is too large for a 16-bit char, so each of those needs a cast (or, for float, the suffix f).',
}));
mustCompile('float f = 3.5f;\nSystem.out.println(f);', 'float 3.5f');
const eFloat = mustFail('float f = 3.5;', 'float 3.5');
Q('m_float_literal', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `A student writes ${ic('float f = 3.5;')} and the compiler reports an error. What is the reason?`,
  opts: ['3.5 is a double literal, and a double cannot be stored in a float without a cast or the suffix f', 'float is a non-primitive type that cannot hold numbers', 'The name f is a keyword of Java', 'A decimal literal must be written inside quotation marks'],
  sol: `javac says: "${eFloat}". Writing 3.5f makes the literal a float, and (float) 3.5 casts it.`,
}));
Q('ar_mixed', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: `The statement ${ic('int p = 3 + 4.5;')} does not compile.`,
  r: 'Java never converts an int value to a double by itself, so an int and a double cannot be added without a cast.',
  sol: `(A) is true: javac reports "${mustFail('int p = 3 + 4.5;')}". (R) is false: in 3 + 4.5 the int 3 is widened to double automatically and the sum is the double ${ev('3 + 4.5')}; the error comes only from storing that double in an int. With a cast, int p = (int) (3 + 4.5); stores ${ev('(int) (3 + 4.5)')}.`,
}));
Q('tf_string_prim', tf({
  t: 3, d: 1, c: 'recall', ans: false,
  stem: 'True or false? String is a primitive data type of Java.',
  sol: 'String is a class provided by Java, so it is a non-primitive (reference) type. Classes, arrays and interfaces are the non-primitive types.',
}));
Q('fb_sizes', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'A long occupies ___ bits of memory and a float occupies ___ bits.',
  acc: [[String(SIZES.long)], [String(SIZES.float)]],
  sol: `Long.SIZE gives ${SIZES.long} and Float.SIZE gives ${SIZES.float}; a byte is ${SIZES.byte} bits, a short and a char ${SIZES.short}, an int ${SIZES.int} and a double ${SIZES.double}.`,
}));
const cDefaults = code(
  'public class Locker {',
  '    int number;',
  '    double rent;',
  '    boolean booked;',
  '    String owner;',
  '',
  '    public static void main(String[] args) {',
  '        Locker obj = new Locker();',
  '        System.out.println(obj.number + " " + obj.rent + " " + obj.booked + " " + obj.owner);',
  '    }',
  '}',
);
Q('mt_defaults', match({
  t: 3, d: 2, c: 'recall', marks: 2,
  stem: 'Match each data type with the default value of a member variable of that type.',
  pairs: [[ic('int'), ic('0')], [ic('double'), ic('0.0')], [ic('boolean'), ic('false')], [ic('String'), ic('null')]],
  sol: `A class with members int, double, boolean and String, none of them initialised, displays ${ic(out(cDefaults))} for a new object, in that order.`,
}));
Q('ord_sizes', ord({
  t: 3, d: 2, c: 'recall',
  stem: 'Arrange these primitive data types in increasing order of the memory they occupy.',
  items: [ic('byte'), ic('char'), ic('float'), ic('double')],
  sol: `byte is ${SIZES.byte} bits, char ${SIZES.char}, float ${SIZES.float} and double ${SIZES.double}.`,
}));
Q('co_defaults', co({
  pre: 'A locker object is created and its member variables are displayed without being assigned. Write the exact output.',
  t: 3, d: 3, c: 'application', code: cDefaults,
  sol: 'Member variables get default values when an object is created: 0 for int, 0.0 for double, false for boolean and null for a String or any other object.',
}));
Q('co_err_lossy', co({
  pre: 'The code below does not compile. Write the error message that javac reports and the line number.',
  t: 3, d: 3, c: 'analysis', error: true, code: code('int n = 12.5;', 'System.out.println(n);'),
  sol: 'The literal 12.5 is a double. Storing it in an int would lose the fractional part, so Java demands an explicit cast: int n = (int) 12.5;.',
}));
Q('co_err_byte', co({
  pre: 'A student adds two byte variables and stores the sum in a third byte variable. Write the error message and the line number.',
  t: 3, d: 4, c: 'analysis', error: true, code: code('byte a = 10, b = 20;', 'byte c = a + b;', 'System.out.println(c);'),
  sol: 'In an arithmetic expression byte, short and char operands are promoted to int, so a + b is an int. Storing an int in a byte needs a cast: byte c = (byte) (a + b);.',
}));
Q('co_cast_trio', co({
  pre: 'A quiz program divides 17 marks among 5 teams in three different ways. Write the exact output.',
  t: 3, d: 3, c: 'application',
  code: code('int a = 17, b = 5;', 'System.out.println(a / b);', 'System.out.println((double) a / b);', 'System.out.println((double) (a / b));'),
  sol: 'a / b is integer division. In the second line the cast applies to a alone, so the division is done in double. In the third line the integer quotient is computed first and only then converted to double.',
}));
Q('co_char_arith', co({
  pre: 'A student mixes a char, a short and an int in one program. Write the exact output.',
  t: 3, d: 4, c: 'application',
  code: code("char c = 'A';", 'c += 2;', 'int n = c;', 'short s = 5;', 'System.out.println(c + " " + n + " " + (s + c));'),
  sol: 'The shorthand += converts the result back to char, so c becomes the letter two places after A. Assigning a char to an int gives its code. In s + c the short and the char are both promoted to int and added as numbers.',
}));
Q('s_prim_nonprim', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: [15, 60],
  stem: 'Differentiate between primitive and non-primitive data types, with two examples of each.',
  model: '**Primitive** data types are the basic types built into Java that store a single value directly, for example `int` and `char`.\n\n**Non-primitive** (reference) data types are created from classes and refer to objects, for example `String` and arrays.',
  sol: 'One mark for each kind with two correct examples.',
  scheme: [['Primitive types explained with two examples', 1], ['Non-primitive types explained with two examples', 1]],
}));
const cWholeModel = code('double avg = 78.65;', 'int whole = (int) avg;', 'System.out.println(whole);');
Q('s_whole', short({
  t: 3, d: 3, c: 'application', marks: 2, wl: [5, 40],
  stem: 'The double variable avg holds 78.65. Write a Java statement that stores only its integer part in an int variable named whole.',
  model: `${F('int whole = (int) avg;')}\n\nWith avg holding 78.65, displaying whole gives ${ic(out(cWholeModel))}.`,
  sol: 'An explicit cast to int is required and it discards the fraction.',
  scheme: [['Declaration of an int variable named whole', 1], ['Explicit cast (int) applied to avg', 1]],
}));

// ================================================================ t04 Operators
Q('m_ternary_count', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Which one of these Java operators needs three operands?',
  opts: distinct([ic('?:'), ic('&&'), ic('++'), ic('%')]),
  sol: 'The conditional operator takes a condition, a value for true and a value for false. && and % are binary operators, and ++ is a unary operator.',
}));
Q('m_rem', mcq({
  t: 4, d: 3, c: 'application',
  stem: `What is the value of ${ic('-17 % 5')} in Java?`,
  opts: distinct([ev('-17 % 5'), ev('17 % 5'), ev('-17 / 5'), ev('17 / 5')]),
  sol: `The remainder takes the sign of the dividend. 17 % 5 is ${ev('17 % 5')}, so with a negative dividend the result is ${ev('-17 % 5')}. The values ${ev('-17 / 5')} and ${ev('17 / 5')} are quotients, not remainders.`,
}));
const cPP = code('int p = 3;', 'p = p++;', 'System.out.println(p);');
Q('m_pp', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: `Predict the output of the code.\n\n${F(cPP)}`,
  opts: distinct([out(cPP), '4', '5', 'A compile-time error']),
  sol: 'The postfix expression p++ gives the old value 3 and also increments p to 4, but then the assignment stores the old value 3 back into p. The increment is lost.',
}));
const cSC = code('int x = 0;', 'if (x != 0 && 10 / x > 1)', '    System.out.println("big");', 'else', '    System.out.println("small");');
Q('m_shortcircuit', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: `What happens when this code runs?\n\n${F(cSC)}`,
  opts: distinct([`It displays ${ic(out(cSC))}`, `It displays ${ic('big')}`, 'It stops with an ArithmeticException', 'It does not compile']),
  sol: 'The && operator is short-circuit: when its left operand x != 0 is false, the right operand is never evaluated, so 10 / x (a division by zero) is not attempted.',
}));
const xe = (s) => out('int x = 5;', s, 'System.out.println(x);');
Q('m_equiv', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'With the int variable x holding 5, which one of these statements does NOT increase the value of x by 1?',
  opts: distinct([ic('x =+ 1;'), ic('x++;'), ic('++x;'), ic('x += 1;')]),
  sol: `x =+ 1 is read as x = +1, an assignment of the value plus one, so x becomes ${xe('x =+ 1;')}. The other three statements make x ${xe('x++;')}.`,
}));
Q('ar_neg_rem', ar({
  t: 4, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: `The expression ${ic('-9 % 4')} evaluates to 1 in Java.`,
  r: 'In Java the result of the % operator has the same sign as its left operand, the dividend.',
  sol: `The expression gives ${ev('-9 % 4')}, not 1, so (A) is false. (R) is a correct statement of the rule, and it is the reason for the minus sign.`,
}));
Q('tf_prepost', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? The statements `b = a++;` and `b = ++a;` always store the same value in b.',
  sol: `With a holding 5, the postfix form stores ${out('int a = 5;', 'int b = a++;', 'System.out.println(b);')} while the prefix form stores ${out('int a = 5;', 'int b = ++a;', 'System.out.println(b);')}.`,
}));
Q('co_rem_neg', co({
  pre: 'A student explores the remainder operator with positive and negative numbers. Write the exact output.',
  t: 4, d: 3, c: 'application',
  code: 'System.out.println(-17 % 5 + " " + 17 % -5 + " " + -17 % -5 + " " + 17.5 % 5);',
  sol: 'The sign of the result follows the dividend: negative only when the left operand is negative, whatever the sign of the divisor. The % operator also works on doubles.',
}));
Q('co_incdec', co({
  pre: 'A quiz asks for the final values after prefix and postfix operators are used inside two expressions. Write the exact output.',
  t: 4, d: 4, c: 'application',
  code: code('int a = 5;', 'int b = a++ + ++a;', 'int c = --a - a--;', 'System.out.println(a + " " + b + " " + c);'),
  sol: '`a++` gives 5 and then a becomes 6; `++a` makes a 7 and gives 7, so b is the sum of these two. In the next line `--a` makes a 6 and gives 6; `a--` gives 6 and then a becomes 5. Their difference is c.',
}));
Q('co_shortcircuit', co({
  pre: 'A student tests short-circuit evaluation with a counter. Write the exact output.',
  t: 4, d: 4, c: 'application',
  code: code('int n = 0, hits = 0;', 'boolean r1 = (n != 0) && (++hits > 0);', 'boolean r2 = (n == 0) || (++hits > 0);', 'boolean r3 = (n != 0) || (++hits > 0);', 'System.out.println(r1 + " " + r2 + " " + r3 + " " + hits);'),
  sol: 'In r1 the left operand is false, so `&&` skips `++hits`. In r2 the left operand is true, so `||` skips it as well. In r3 the left operand is false, so `||` must evaluate the right operand and hits becomes 1.',
}));
Q('co_err_divzero', co({
  pre: 'The code below compiles. Write the error that appears when it runs.',
  t: 4, d: 3, c: 'analysis', error: true,
  code: code('int total = 240;', 'int people = 0;', 'int share = total / people;', 'System.out.println(share);'),
  sol: 'Dividing an integer by zero throws an ArithmeticException at run time. (Dividing a double by zero would instead give Infinity.)',
}));
const nTern = (n) => out(`int n = ${n};`, 'String r = (n % 2 == 0) ? "Even" : "Odd";', 'System.out.println(r);');
Q('s_ternary_rewrite', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: [5, 40],
  stem: 'Rewrite the following using the ternary operator: if (n % 2 == 0) r = "Even"; else r = "Odd";  (r is a String and n is an int).',
  model: `${F('String r = (n % 2 == 0) ? "Even" : "Odd";')}\n\nFor n = 7 it stores ${ic(nTern(7))} and for n = 8 it stores ${ic(nTern(8))}.`,
  sol: 'The condition comes first, then ? and the value for true, then : and the value for false.',
  scheme: [['Condition followed by ? and the value for true', 1], ['Colon and the value for false, stored in r', 1]],
}));
const nBetween = (n) => out(`int n = ${n};`, 'System.out.println(n >= 10 && n <= 99);');
Q('s_between', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: [5, 40],
  stem: 'Write a Java expression that is true when the int variable n holds a two-digit number, from 10 to 99 with both ends included.',
  model: `${F('n >= 10 && n <= 99')}\n\nFor n = 57 it is ${ic(nBetween(57))}; for n = 100 it is ${ic(nBetween(100))}.`,
  sol: 'Two relational comparisons joined by the logical AND operator.',
  scheme: [['Both relational conditions correct', 1], ['Joined with && (not ||)', 1]],
}));
const cPP2 = code('int a = 5;', 'int b = a++;', 'int c = ++a;', 'System.out.println(a + " " + b + " " + c);');
Q('s_prefix_postfix', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: [20, 70],
  stem: 'Distinguish between the prefix and postfix forms of the increment operator, with an example.',
  model: `In the **prefix** form (++a) the variable is incremented first and the new value is used in the expression. In the **postfix** form (a++) the current value is used first and the variable is incremented afterwards.\n\n${F(cPP2)}\n\nDisplayed: ${ic(out(cPP2))} (a, b, c).`,
  sol: 'One mark for each form, with the order of increment and use made clear.',
  scheme: [['Prefix: increment, then use', 1], ['Postfix: use, then increment, with an example', 1]],
}));
