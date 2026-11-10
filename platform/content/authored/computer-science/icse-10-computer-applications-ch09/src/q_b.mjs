// ICSE 10 Computer Applications, ch09: topic t03 (parseInt, parseLong, parseFloat, parseDouble; valueOf and toString).
// Every scenario is imagined for SOYL. Every output or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, ord, short, co, javaErr } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, mustFail, mustCompile, expect } from './q_util.mjs';

/** Message of a run-time failure of a fragment, e.g. java.lang.NumberFormatException: For input string: "12.5". */
export const rtErr = (src) => javaErr(src, { kind: 'runtime' }).err;
/** Message of parseInt for one bad text. */
export const nfeInt = (txt) => rtErr(`int n = Integer.parseInt("${txt}");`);

// ---- shared code used by several items and by the slides
export const cSumText = code('String x = "250";', 'String y = "75";', 'System.out.println(x + y);', 'System.out.println(Integer.parseInt(x) + Integer.parseInt(y));', 'System.out.println(Double.parseDouble(x) / 4);');
export const cSign = code('int a = Integer.parseInt("+18");', 'int b = Integer.parseInt("-30");', 'System.out.println(a + b);', 'System.out.println(a * b);');
export const cValueOf = code('Integer v = Integer.valueOf("64");', 'int w = Integer.parseInt("64");', 'System.out.println(v + w);', 'System.out.println(Integer.toString(v) + w);');
export const cLongFloat = code('long pop = Long.parseLong("4200000000");', 'float f = Float.parseFloat("7.5");', 'System.out.println(pop / 1000);', 'System.out.println(f * 2);');
export const cScanSum = code('Scanner sc = new Scanner(System.in);', 'String p = sc.next();', 'String q = sc.next();', 'int total = Integer.parseInt(p) + Integer.parseInt(q) * 2;', 'System.out.println(p + q);', 'System.out.println(total);');
export const cCommaPrice = code('String price = "1,250";', 'int p = Integer.parseInt(price);', 'System.out.println(p);');
export const cLossy = code('int rate = Double.parseDouble("7.5");', 'System.out.println(rate);');
export const cParseKinds = code(
  'System.out.println(Integer.parseInt("205"));',
  'System.out.println(Long.parseLong("205"));',
  'System.out.println(Float.parseFloat("205"));',
  'System.out.println(Double.parseDouble("205"));',
);

// ================================================================ t03 conversion methods
const errParseName = mustFail(code('int n = Integer.parse("245");'), 'Integer.parse');
const errToStr = mustFail(code('String s = Integer.toString("245");'), 'toString(String)');
Q('m_parse_int_ret', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Which expression converts the String "245" into the int value 245?',
  opts: distinct([ic('Integer.parseInt("245")'), ic('Integer.toString("245")'), ic('Integer.parse("245")'), ic('Double.parseDouble("245")')]),
  sol: `The static method parseInt of the class Integer returns an int. Double.parseDouble("245") also accepts the text, but it returns the double ${ev('Double.parseDouble("245")')}. Integer.parse does not exist: javac says "${errParseName}". Integer.toString works in the other direction, from a number to a String, and with a String argument javac says "${errToStr}".`,
}));
Q('m_parse_double_in', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'What is displayed by the following statement?\n\n```java\nSystem.out.println(Double.parseDouble("3"));\n```',
  opts: distinct([ic(ev('Double.parseDouble("3")')), ic('3'), ic('3.00'), ic('A NumberFormatException is thrown')]),
  sol: 'parseDouble accepts text without a decimal point and returns a double. A double is displayed with at least one digit after the point, so the value 3 appears as 3.0.',
}));
Q('m_parse_exc', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A program calls Integer.parseInt("12.5"). Which exception is thrown when it runs?',
  opts: distinct(['NumberFormatException', 'ArithmeticException', 'ArrayIndexOutOfBoundsException', 'NullPointerException']),
  sol: `The text 12.5 is not a valid whole number, so parseInt fails with a NumberFormatException. The real message is "${nfeInt('12.5')}". It is not an arithmetic problem, there is no array, and the text is not null.`,
}));
Q('m_parse_which_fails', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A canteen app converts typed prices with the calls below. Which call makes the program stop with an exception when it is executed?',
  opts: distinct([ic('Integer.parseInt("12.5")'), ic('Integer.parseInt("+40")'), ic('Integer.parseInt("-40")'), ic('Double.parseDouble("40")')]),
  sol: `A whole-number parser rejects a decimal point. A leading plus or minus sign is accepted: parseInt("+40") gives ${ev('Integer.parseInt("+40")')} and parseInt("-40") gives ${ev('Integer.parseInt("-40")')}. Double.parseDouble("40") gives ${ev('Double.parseDouble("40")')}.`,
}));
Q('m_parse_space', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A form returns the quantity as the text below, with a space in front. What happens when this code runs?\n\n${F(code('String qty = " 42";', 'int n = Integer.parseInt(qty);', 'System.out.println(n + 1);'))}`,
  opts: distinct([`The program stops with ${nfeInt(' 42')}`, ic(ev('42 + 1')), ic('42'), ic(ev('"42" + 1'))]),
  sol: 'The space is not a digit, and parseInt does not remove spaces, so the conversion fails before the println is reached. If the text had been 42 without the space, the value displayed would be 43.',
}));
const pre1230 = 'String a = "12"; String b = "30";';
Q('m_parse_concat', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Two amounts typed as text are added as in the code below. What does it display?\n\n${F(code('String a = "12";', 'String b = "30";', 'System.out.println(Integer.parseInt(a) + Integer.parseInt(b));'))}`,
  opts: distinct([ic(out(code('String a = "12";', 'String b = "30";', 'System.out.println(Integer.parseInt(a) + Integer.parseInt(b));'))), ic(ev('a + b', pre1230)), ic(ev('Integer.parseInt(a) * Integer.parseInt(b)', pre1230)), ic(ev('a + "+" + b', pre1230))]),
  sol: `Both Strings are converted to int values and the + operator adds them. Without the conversion, a + b would join the two texts and give ${ev('a + b', pre1230)}.`,
}));
Q('m_valueof_vs_parse', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'How does Integer.valueOf("50") differ from Integer.parseInt("50")?',
  opts: distinct(['valueOf returns an Integer object, while parseInt returns a primitive int', 'valueOf returns a primitive int, while parseInt returns an Integer object', 'valueOf accepts only numbers, while parseInt accepts only Strings', 'valueOf gives 50.0, while parseInt gives 50']),
  sol: `Both read the text and convert it to the number ${ev('Integer.parseInt("50")')}; they differ in the type returned. Integer v = Integer.valueOf("50"); stores an object, and int n = Integer.parseInt("50"); stores a primitive. Printed, both look the same.`,
}));
const errLong3 = rtErr('int n = Integer.parseInt("5432109876");');
Q('m_parse_long', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A village survey stores the number 5432109876 as text. Why does Integer.parseInt fail for this text, while Long.parseLong works?',
  opts: distinct(['The value is larger than the largest int, so it does not fit in an int, but a long can hold it', 'The text contains a decimal point, which only parseLong accepts', 'parseInt cannot convert any text that has more than five digits', 'parseLong is the only method that accepts a String as its argument']),
  sol: `The largest int is ${ev('Integer.MAX_VALUE')}, and the survey number is bigger than that, so parseInt stops at run time with "${errLong3}". A long can hold much larger values, so long n = Long.parseLong(text); works. The text has no decimal point, and parseInt does accept texts of ten digits when the value fits.`,
}));
Q('m_tostring', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A ticket number is changed into text before printing. What does this code display?\n\n${F(code('String s = Integer.toString(250);', 'System.out.println(s + 5);'))}`,
  opts: distinct([ic(out(code('String s = Integer.toString(250);', 'System.out.println(s + 5);'))), ic(ev('250 + 5')), ic('250 5'), ic('255.0')]),
  sol: 'Integer.toString converts the int 250 into the String "250". A String followed by + and an int joins the texts, so 5 is attached after 250 instead of being added to it.',
}));

Q('tf_parse_dec', tf({
  t: 3, d: 3, c: 'application', ans: false,
  stem: 'True or false? The statement int n = Integer.parseInt("3.0"); stores 3 in n.',
  sol: `The text 3.0 contains a decimal point, which parseInt does not accept; the program stops with "${nfeInt('3.0')}". To read such text, Double.parseDouble is used, and the result is a double.`,
}));
Q('ar_parse_dot', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The call Integer.parseInt("12.5") throws a NumberFormatException.',
  r: 'parseInt rounds the text to the nearest whole number when it contains a decimal point.',
  sol: `The real run stops with "${nfeInt('12.5')}", so (A) is true. (R) is false: parseInt never rounds; a decimal point makes the text invalid for a whole-number conversion.`,
}));
Q('ar_parse_plus', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Double.parseDouble("3") gives the value 3.0.',
  r: 'Integer.parseInt("+7") gives the value 7.',
  sol: `Java prints ${ev('Double.parseDouble("3")')} for the first call and ${ev('Integer.parseInt("+7")')} for the second, so both statements are true. They are separate facts: the value 3.0 appears because parseDouble returns a double, which has nothing to do with the plus sign of parseInt.`,
}));
Q('fb_parsedouble', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The method ___ of the class Double converts a numeric String into a double value.',
  acc: [['parseDouble', 'Double.parseDouble']],
  sol: 'parseDouble is the conversion method of Double. The matching methods of the other classes are parseInt, parseLong and parseFloat.',
}));
Q('mt_parse', match({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Match each call with the value it gives.',
  pairs: [
    ['Integer.parseInt("+25")', ev('Integer.parseInt("+25")')],
    ['Double.parseDouble("25")', ev('Double.parseDouble("25")')],
    ['Long.parseLong("2500000000")', ev('Long.parseLong("2500000000")')],
    ['Float.parseFloat("2.5")', ev('Float.parseFloat("2.5")')],
  ],
  sol: 'parseInt accepts a leading plus sign and returns the int 25; parseDouble returns a double, so 25.0; parseLong returns a long (2500000000 is too big for an int); parseFloat returns a float, 2.5.',
}));
Q('ord_parse_steps', ord({
  t: 3, d: 3, c: 'application',
  stem: 'A program must add two amounts that the user types as words. Arrange the steps in the order in which they are carried out.',
  items: ['Read the two words with the next() method of Scanner', 'Convert each word to a number with a parse method', 'Add the two numbers and store the sum in a variable', 'Display the sum'],
  sol: 'The words must be read before they can be converted, and they must be numbers before they are added. Adding the two words directly would only join them as text.',
}));

// ---- code output, t03
expect(out(cSumText), '25075\n325\n62.5', 'sum text facts');
expect(out(cSign), '-12\n-540', 'sign facts');
expect(out(cValueOf), '128\n6464', 'valueOf facts');
expect(out(cLongFloat), '4200000\n15.0', 'long float facts');
expect(out(cScanSum, '15 4\n'), '154\n23', 'scan sum facts');
Q('co_parse_sum', co({
  pre: 'A shop owner keeps two amounts as text. Write the exact output of the code below.',
  t: 3, d: 3, c: 'application',
  code: cSumText,
  sol: 'x + y joins two Strings, giving 25075. After conversion the numbers are added, 250 + 75 is 325. In the last line parseDouble gives 250.0, and dividing a double by 4 gives 62.5.',
}));
Q('co_parse_sign', co({
  pre: 'Two text values carry a sign. Write the exact output of the code.',
  t: 3, d: 3, c: 'application',
  code: cSign,
  sol: 'parseInt accepts both signs: +18 becomes 18 and -30 becomes -30. The sum is -12 and the product is -540.',
}));
Q('co_valueof', co({
  pre: 'A librarian converts the same text in three ways. Write the exact output.',
  t: 3, d: 4, c: 'application',
  code: cValueOf,
  sol: 'valueOf gives an Integer and parseInt gives an int; in v + w the object is unboxed and the numbers are added: 128. In the last line Integer.toString(v) is the text 64, and joining the text with w gives 6464.',
}));
Q('co_parse_long_float', co({
  pre: 'A census clerk converts a population and a rate from text. Write the exact output.',
  t: 3, d: 3, c: 'application',
  code: cLongFloat,
  sol: 'pop is the long 4200000000, and long division by 1000 gives 4200000. f is the float 7.5, and f * 2 is the float 15.0.',
}));
Q('co_stdin_parse', co({
  pre: 'The program reads two words from the keyboard. The input given is 15 4. Write the exact output.',
  t: 3, d: 4, c: 'application', run: { stdin: '15 4\n' },
  code: cScanSum,
  sol: 'p and q are Strings, so p + q joins them: 154. After conversion, total is 15 + 4 * 2, and multiplication comes first, so the result is 23.',
}));
Q('co_err_parse_dot', co({
  pre: 'A shopkeeper types the price as in the code below. State the error that occurs when the program is run.',
  t: 3, d: 3, c: 'analysis', error: true,
  code: cCommaPrice,
  sol: 'The text contains a comma, which is not a digit, so parseInt cannot convert it and throws a NumberFormatException. The message shows the text that could not be converted. The program compiles without any error.',
  scheme: [['Run-time error named: NumberFormatException', 1], ['Reason: the comma makes the text an invalid number', 1]],
}));
Q('co_err_parse_type', co({
  pre: 'A student stores the result of a conversion as below. State the error reported by the compiler.',
  t: 3, d: 4, c: 'analysis', error: true,
  code: cLossy,
  sol: 'Double.parseDouble returns a double, and a double cannot be stored in an int variable without a cast, because the decimal part could be lost. Declaring rate as double fixes the error.',
  scheme: [['Compile-time error with the correct line', 1], ['Reason: parseDouble returns a double, not an int', 1]],
}));

// ---- short answers, t03
Q('s_parse_vs_valueof', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between the methods parseInt() and valueOf() of the class Integer.',
  model: `Both convert a String such as "50" into a number. **parseInt()** returns a primitive **int**, while **valueOf()** returns an **Integer** object.\n\n${F(code('int a = Integer.parseInt("50");', 'Integer b = Integer.valueOf("50");', 'System.out.println(a + " " + b);'))}\n\nOutput: ${ic(out(code('int a = Integer.parseInt("50");', 'Integer b = Integer.valueOf("50");', 'System.out.println(a + " " + b);')))}. The two values print alike.`,
  sol: 'One mark for the return type of each method.',
  scheme: [['parseInt returns an int (primitive)', 1], ['valueOf returns an Integer (wrapper object)', 1]],
}));
Q('s_parse_why', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'A program reads two numbers with the next() method of Scanner, as Strings. Why must they be converted before they are added? Show what the + operator does without conversion.',
  model: `The + operator **joins** two Strings instead of adding them. With the Strings "20" and "5" the result is the text ${ic(ev('"20" + "5"'))}. After conversion with a parse method, the same operator adds the numbers.\n\n${F(code('String s = "20";', 'String t = "5";', 'System.out.println(s + t);', 'System.out.println(Integer.parseInt(s) + Integer.parseInt(t));'))}\n\nOutput: ${ic(out(code('String s = "20";', 'String t = "5";', 'System.out.println(s + t);', 'System.out.println(Integer.parseInt(s) + Integer.parseInt(t));')).split('\n').join(' / '))}.`,
  sol: 'One mark for the reason (concatenation) and one for the example with its output.',
  scheme: [['Reason: + joins Strings; arithmetic needs numbers', 1], ['Example showing joining and then adding after the parse method', 1]],
}));
const bad = ['12.5', ' 42', '1,250', 'abc'];
Q('s_nfe', short({
  t: 3, d: 4, c: 'analysis', marks: 2, wl: [30, 110],
  stem: 'When does a parse method throw a NumberFormatException? Give two different texts for which Integer.parseInt() fails, with the reason in each case.',
  model: `A parse method throws **NumberFormatException** when the text cannot be read as a number of the required type. Texts that make **parseInt** fail:\n\n- ${ic('"12.5"')}: a decimal point is not allowed in a whole number; message ${ic(nfeInt('12.5'))}\n- ${ic('"1,250"')}: the comma is not a digit; message ${ic(nfeInt('1,250'))}\n\nEmpty text, letters and a leading space also fail, for example ${ic(nfeInt(' 42'))}.`,
  sol: 'One mark for the condition and one for the two texts with their reasons.',
  scheme: [['Exception thrown when the text is not a valid number of that type', 1], ['Two failing texts with the reason for each', 1]],
}));
Q('s_write_parse', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'The String variable amount holds the text 125.75. Write Java statements to convert it into a double value stored in a variable named fare, and to display twice the fare.',
  model: `${F(code('String amount = "125.75";', 'double fare = Double.parseDouble(amount);', 'System.out.println(fare * 2);'))}\n\nOutput: ${ic(out(code('String amount = "125.75";', 'double fare = Double.parseDouble(amount);', 'System.out.println(fare * 2);')))}.`,
  sol: 'parseDouble returns a double, so the variable fare must be of type double.',
  scheme: [['Double.parseDouble(amount) stored in a double variable', 1], ['Twice the fare displayed', 1]],
}));
