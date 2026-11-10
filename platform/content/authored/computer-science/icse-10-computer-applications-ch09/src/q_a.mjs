// ICSE 10 Computer Applications, ch09: Library Classes: Wrapper Classes. Topics t01 (composite types, wrapper classes)
// and t02 (autoboxing and unboxing). Every scenario is imagined for SOYL. Every output or error message quoted anywhere
// is produced by running the Java code.
import { Q, mcq, ar, tf, fb, match, short, co, javaErr } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, distinct, mustFail, mustCompile, expect } from './q_util.mjs';

// numbers typed in solutions in digits: stop if Java disagrees
expect(out(code('Integer a = 25;', 'a = a + 10;', 'int paid = a * 2;', 'System.out.println(a + " " + paid);')), '35 70', 'box chain facts');
expect(out(code('Integer a = 8;', 'Double b = 2.5;', 'double r = a * b;', 'System.out.println(r);', 'System.out.println(a / 3);')), '20.0\n2', 'unbox mix facts');

// ---- shared code used by several items and by the slides
/** A user-defined composite type: a Kite has a colour and a length. */
export const srcKite = code(
  'public class Kite {',
  '    String colour;',
  '    int length;',
  '    public static void main(String[] args) {',
  '        Kite k = new Kite();',
  '        k.colour = "red";',
  '        k.length = 30;',
  '        System.out.println(k.colour + " " + k.length);',
  '    }',
  '}',
);
export const cDecl = code(
  'Integer seats = 48;',
  "Character grade = 'K';",
  'Boolean open = true;',
  'Double price = 99.5;',
  'Long distance = 4200000000L;',
  'System.out.println(seats + " " + grade + " " + open + " " + price + " " + distance);',
);
export const cDeref = code('int n = 5;', 'System.out.println(n.toString());');
export const cDerefOk = code('Integer n = 5;', 'System.out.println(n.toString());');
/** Autoboxing then unboxing, as shown on the slides. */
export const cBoxBasic = code(
  'int a = 40;',
  'Integer boxed = a;      // autoboxing',
  'int back = boxed + 2;   // unboxing, then addition',
  'System.out.println(boxed + " " + back);',
);
export const cBoxChain = code(
  'int base = 25;',
  'Integer card = base;',
  'card = card + 10;',
  'int paid = card * 2;',
  'System.out.println(card + " " + paid);',
);
export const cBoxId = code('int seats = 48;', 'Integer booked = seats;', 'int free = booked - 5;');
export const srcLedger = code(
  'public class Ledger {',
  '    Double due;',
  '    void show() {',
  '        double d = due;',
  '        System.out.println(d);',
  '    }',
  '    public static void main(String[] args) {',
  '        new Ledger().show();',
  '    }',
  '}',
);
export const srcTokens = code(
  'public class Tokens {',
  '    Integer waiting;',
  '    void show() {',
  '        int n = waiting;',
  '        System.out.println(n);',
  '    }',
  '    public static void main(String[] args) {',
  '        new Tokens().show();',
  '    }',
  '}',
);
export const cMatchDouble = code('Double fee = 1500;', 'System.out.println(fee);');

// ================================================================ t01 composite types and wrapper classes
Q('m_wrap_integer', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which wrapper class stores a value of the primitive type int?',
  opts: distinct(['Integer', 'Int', 'Digit', 'Whole']),
  sol: 'Each primitive type has a wrapper class in the package java.lang, and its name is the type name written in full with a capital letter: int is wrapped by Integer. There is no class called Int, Digit or Whole in Java.',
}));
Q('m_wrap_char', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A program must keep a single letter as an object of a wrapper class. Which class is meant for the primitive type char?',
  opts: distinct(['Character', 'Char', 'String', 'Letter']),
  sol: 'Character is the wrapper class of char. String is a different class that holds a sequence of characters, and Char and Letter do not exist.',
}));
Q('m_wrap_pkg', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'The wrapper classes such as Integer, Double and Boolean are part of which package?',
  opts: distinct(['java.lang', 'java.util', 'java.io', 'java.wrapper']),
  sol: `The wrapper classes belong to java.lang; the full name of the class is shown by the program ${ic("System.out.println(Integer.valueOf(5).getClass().getName());")}, which prints ${ic(ev('Integer.valueOf(5).getClass().getName()'))}. The package java.lang is imported automatically, so no import statement is needed. java.util holds classes such as Scanner and java.io the input-output classes; there is no package java.wrapper.`,
}));
Q('m_prim_not_wrap', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is not a wrapper class of a primitive data type?',
  opts: distinct(['String', 'Double', 'Boolean', 'Long']),
  sol: 'A wrapper class wraps one primitive value. Double wraps double, Boolean wraps boolean and Long wraps long. String is a class too, but it holds a sequence of characters and is not the wrapper of any primitive type.',
}));
Q('m_wrap_match', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Which of the following pairs gives a primitive data type and its correct wrapper class?',
  opts: distinct([ic('boolean and Boolean'), ic('char and Char'), ic('int and Int'), ic('float and Floating')]),
  sol: 'The wrapper names are Byte, Short, Integer, Long, Float, Double, Character and Boolean. Only two of them are not the type name with a capital letter: int is wrapped by Integer and char by Character.',
}));
Q('m_prim_vs_comp', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement correctly distinguishes a primitive data type from a composite data type?',
  opts: distinct(['A primitive variable holds a single simple value, while a composite type (a class) can bundle several values and methods together', 'A primitive variable can hold many values at the same time, while a composite type holds exactly one', 'Primitive types are designed by the programmer, while composite types are built into the language', 'A composite type can only hold numbers, while a primitive type can hold text']),
  sol: `An int, a char or a double stores one value and has no methods. A class is a composite type: for example a class Kite with the data members String colour and int length bundles a String and an int, and one Kite object prints ${ic(out(srcKite))}. Programmers can design their own classes, but the eight primitive types are fixed by Java.`,
}));
Q('m_wrap_count', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'How many primitive data types of Java have a wrapper class?',
  opts: distinct(['All eight of them', 'Only the numeric types', 'Only int, double and char', 'None; wrapper classes exist only for String']),
  sol: 'Every one of the eight primitive types has a wrapper: Byte, Short, Integer, Long, Float, Double, Character and Boolean. The wrapper of boolean and of char is not numeric, so the numeric types are not the only ones.',
}));
const errWrapFloat = mustFail(code('Float price = 99.5;'), 'Float from double');
const errWrapInt = mustFail(code('Integer price = 99.5;'), 'Integer from double');
mustCompile(code('Double price = 99.5;', 'double plain = 99.5;'), 'Double and double');
Q('m_wrap_which_type', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A tea-stall billing app must keep the price 99.5 as an object of a wrapper class. Which declaration does this without a compile-time error?',
  opts: distinct([ic('Double price = 99.5;'), ic('double price = 99.5;'), ic('Float price = 99.5;'), ic('Integer price = 99.5;')]),
  sol: `The literal 99.5 is a double, so Double is its wrapper. The lower-case double compiles but is a primitive, not an object. Float price = 99.5; fails with "${errWrapFloat}" and Integer price = 99.5; with "${errWrapInt}".`,
}));

Q('tf_every_prim', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Every primitive data type of Java has a wrapper class in the package java.lang.',
  sol: `There are eight primitive types and eight wrapper classes. The declarations Integer, Character, Boolean, Double and Long in one program run and print ${ic(out(cDecl))}.`,
}));
const errDeref = mustFail(cDeref, 'int cannot be dereferenced');
Q('ar_wrap_methods', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'For Integer n = 5; the call n.toString() works, but for int n = 5; the call n.toString() does not compile.',
  r: 'A wrapper class is a class and its objects can call methods, whereas a primitive variable is not an object.',
  sol: `With Integer n = 5; the statement System.out.println(n.toString()); prints ${ic(out(cDerefOk))}, so the call on the Integer object works; with int n = 5; the same statement is rejected by javac with "${errDeref}", so (A) is true. (R) is true and gives the reason: only an object can call a method.`,
}));
Q('fb_char_wrapper', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The wrapper class of the primitive type char is ___ and it belongs to the package ___.',
  acc: [['Character'], ['java.lang', 'java lang']],
  sol: 'Character is the wrapper of char, and it is stored in the package java.lang, which Java imports automatically.',
}));
Q('mt_wrappers', match({
  t: 1, d: 1, c: 'recall', marks: 2,
  stem: 'Match each primitive data type with its wrapper class.',
  pairs: [[ic('int'), 'Integer'], [ic('char'), 'Character'], [ic('boolean'), 'Boolean'], [ic('long'), 'Long']],
  sol: 'The wrapper of int is Integer and the wrapper of char is Character; boolean and long are wrapped by Boolean and Long.',
}));

Q('s_wrap_def', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: [20, 80],
  stem: 'What is a wrapper class? Write the wrapper class of each of the primitive types byte, short, float and boolean.',
  model: 'A **wrapper class** is a class that wraps (holds) a value of a primitive data type inside an object, so that the value can be used as an object and can use the methods of the class.\n\nThe wrappers are **Byte** for byte, **Short** for short, **Float** for float and **Boolean** for boolean.',
  sol: 'One mark for the meaning and one mark for the four class names.',
  scheme: [['Wrapper class: wraps a primitive value into an object', 1], ['Byte, Short, Float and Boolean named correctly', 1]],
}));
Q('s_prim_comp', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between a primitive data type and a composite data type. Give one example of each from a Java program.',
  model: `A **primitive** data type is built into Java and holds a single simple value, such as the int variable ${ic('int age = 14;')}; it has no methods. A **composite** data type is a class: it can hold several values (data members) and has methods, and the programmer can create new ones. For example, the class Kite holds a String colour and an int length; one Kite object prints ${ic(out(srcKite))}.`,
  sol: 'One mark for each kind of type with its example.',
  scheme: [['Primitive: single simple value, built in, no methods; example int', 1], ['Composite: a class that bundles data and methods, user-defined; example', 1]],
}));
Q('s_declare', short({
  t: [1, 2], d: 2, c: 'application', marks: 2,
  stem: 'Write Java statements to store the whole number 45 in a variable of the wrapper class of int, and the letter K in a variable of the wrapper class of char, and to display both.',
  model: `${F(code('Integer marks = 45;', "Character initial = 'K';", 'System.out.println(marks + " " + initial);'))}\n\nOutput: ${ic(out(code('Integer marks = 45;', "Character initial = 'K';", 'System.out.println(marks + " " + initial);')))}. The primitive values are converted to wrapper objects automatically (autoboxing).`,
  sol: 'Integer for the whole number and Character for the letter; the literals need no new keyword because of autoboxing.',
  scheme: [['Integer variable initialised with 45', 1], ["Character variable initialised with 'K' and both displayed", 1]],
}));

// ================================================================ t02 autoboxing and unboxing
Q('m_autobox_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What is autoboxing in Java?',
  opts: distinct(['The automatic conversion of a primitive value into an object of its wrapper class', 'The automatic conversion of a wrapper class object into a primitive value', 'The conversion of a String into a number with a parse method', 'The conversion of an int into a double when it is divided']),
  sol: 'Autoboxing puts a primitive value into a wrapper object without any method call, as in Integer n = 5;. The reverse process is unboxing, a parse method works on a String, and int to double is ordinary type conversion.',
}));
Q('m_unbox_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which term describes the automatic conversion of a wrapper class object into the primitive value it holds?',
  opts: distinct(['Unboxing', 'Autoboxing', 'Parsing', 'Casting']),
  sol: 'Unboxing takes the primitive value out of a wrapper object, for example when an Integer is used in an arithmetic expression or assigned to an int variable. Autoboxing is the opposite direction.',
}));
mustCompile(code(cBoxId, 'System.out.println(free);'), 'box id');
Q('m_identify_box', mcq({
  t: 2, d: 2, c: 'application',
  stem: `A theatre program keeps the seat counts as shown. Which statement performs autoboxing?\n\n${F(cBoxId)}`,
  opts: distinct([ic('Integer booked = seats;'), ic('int seats = 48;'), ic('int free = booked - 5;'), 'None of the statements; the code has no boxing at all']),
  sol: `The statement Integer booked = seats; stores an int in an Integer variable, which is autoboxing. The statement int free = booked - 5; is unboxing, because the Integer is used as an int in the subtraction, and the declaration int seats = 48; deals only with primitives. The value of free is ${ev('free', cBoxId)}.`,
}));
const pre75 = 'Integer p = 7; Integer q = 5;';
Q('m_unbox_arith', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A school store keeps counts in wrapper objects. What does the following code display?\n\n${F(code('Integer p = 7;', 'Integer q = 5;', 'int r = p * q;', 'System.out.println(r + 1);'))}`,
  opts: distinct([ic(out(code('Integer p = 7;', 'Integer q = 5;', 'int r = p * q;', 'System.out.println(r + 1);'))), ic(ev('p * q', pre75)), ic(ev('p + q + 1', pre75)), ic(ev('"" + p + q', pre75))]),
  sol: `The Integer objects p and q are unboxed for the multiplication, so p * q is the int ${ev('p * q', pre75)} and it is stored in r. The println then adds 1 to r. Without the + 1 the value would be ${ev('p * q', pre75)}; adding the numbers instead gives ${ev('p + q + 1', pre75)}, and joining them as text gives ${ev('"" + p + q', pre75)}.`,
}));
const errBoxD = mustFail(code('Double rate = 5;'), 'Double from int');
mustCompile(code('Double rate = 5.0;', 'Long total = 5L;', 'Integer count = 5;'), 'matching boxes');
Q('m_box_error', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Autoboxing converts a primitive value only into the wrapper class of its own type. Which one of the following declarations is therefore rejected by the compiler?',
  opts: distinct([ic('Double rate = 5;'), ic('Double rate = 5.0;'), ic('Long total = 5L;'), ic('Integer count = 5;')]),
  sol: `The literal 5 is an int, so it can be boxed only into an Integer; asking for a Double gives "${errBoxD}". The literals 5.0 (double), 5L (long) and 5 (int) match Double, Long and Integer, so those three lines compile.`,
}));
const errNull = javaErr(srcLedger, { kind: 'runtime' }).err;
Q('m_unbox_null', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'A program unboxes an Integer variable that has never been given a value, so it holds null. What happens when that statement runs?',
  opts: distinct(['A NullPointerException is thrown at run time', 'The variable is treated as 0', 'A compile-time error is reported', 'A NumberFormatException is thrown']),
  sol: `There is no primitive value inside a null reference to take out, so the program stops. For a Double data member that was never assigned, the real run reports "${errNull}". The code compiles without error, so this is a run-time problem.`,
}));
Q('tf_unbox_dir', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Unboxing converts an int value into an object of the class Integer.',
  sol: 'That direction is autoboxing. Unboxing is the opposite: it converts a wrapper object such as an Integer into the primitive int value it holds.',
}));
Q('ar_double_box', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The statement Double fee = 20; is accepted by the compiler because the int 20 is autoboxed into a Double.',
  r: 'Autoboxing converts a primitive value only into the wrapper class of its own type.',
  sol: `The compiler rejects the statement with "${mustFail(code('Double fee = 20;'))}", so (A) is false. (R) is true and is exactly the rule that makes the statement an error: an int can be boxed into an Integer only.`,
}));
Q('fb_unbox', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The automatic conversion of a wrapper class object into the primitive value stored in it is called ___.',
  acc: [['unboxing', 'auto-unboxing', 'auto unboxing', 'autounboxing']],
  sol: 'This process is unboxing; the reverse process, from a primitive value to a wrapper object, is autoboxing.',
}));

// ---- code output, t02
Q('co_box_chain', co({
  pre: 'A metro smart card is modelled with wrapper objects, as below. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: cBoxChain,
  sol: 'The int 25 is boxed into card. In card + 10 the object is unboxed, 10 is added and the result 35 is boxed into card again. Then card * 2 unboxes it once more, and paid receives the int 70.',
}));
Q('co_unbox_mix', co({
  pre: 'Wrapper objects take part in the arithmetic below. Write the exact output.',
  t: 2, d: 4, c: 'application',
  code: code('Integer a = 8;', 'Double b = 2.5;', 'double r = a * b;', 'System.out.println(r);', 'System.out.println(a / 3);'),
  sol: 'Both objects are unboxed: 8 * 2.5 is a double, 20.0. In a / 3 the Integer is unboxed to the int 8, and int division of 8 by 3 gives 2 without a decimal part.',
}));
Q('co_err_dbl', co({
  pre: 'A clerk stores a fee of 1500 in a Double object as below. State the error reported by the compiler.',
  t: 2, d: 4, c: 'analysis', error: true,
  code: cMatchDouble,
  sol: 'The literal 1500 is an int. Autoboxing can put it only into an Integer, so it cannot be assigned to a Double variable. Writing 1500.0 (or 1500d) makes it a double and fixes the error.',
  scheme: [['Compile-time error with the correct line', 1], ['Reason: an int is boxed only into an Integer, not into a Double', 1]],
}));
Q('co_err_npe', co({
  pre: 'The program below creates a Tokens object and asks it to display the waiting number. State the error that occurs when it is run.',
  t: 2, d: 5, c: 'analysis', error: true,
  code: srcTokens,
  sol: 'The data member waiting is a wrapper object and has the default value null, because it was never assigned. Unboxing it in int n = waiting; fails at run time with a NullPointerException; the program compiles without any error.',
  scheme: [['Run-time error named: NullPointerException', 1], ['Reason: unboxing a null wrapper reference', 1]],
}));

// ---- short answers, t02
const cBoxEx = code('int m = 30;', 'Integer w = m;', 'int z = w * 2;', 'System.out.println(w + " " + z);');
Q('s_box_unbox', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Define autoboxing and unboxing. Give one Java statement as an example of each.',
  model: `In **autoboxing** Java itself wraps a primitive value in an object of the matching wrapper class. In **unboxing** it takes the primitive value out of a wrapper object, again without any method call.\n\n${F(cBoxEx)}\n\n${ic('Integer w = m;')} is autoboxing and the use of w in ${ic('int z = w * 2;')} is unboxing. Output: ${ic(out(cBoxEx))}.`,
  sol: 'One mark for each definition, with a statement as example.',
  scheme: [['Autoboxing defined, with an example statement', 1], ['Unboxing defined, with an example statement', 1]],
}));
Q('s_identify', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `Identify the statement that performs autoboxing and the statement that performs unboxing in the code below. Also state the value displayed.\n\n${F(code('int q = 6;', 'Integer w = q;', 'int e = w + 1;', 'System.out.println(e);'))}`,
  model: `Line 2, ${ic('Integer w = q;')}, is **autoboxing**: the int q is stored in an Integer object. Line 3, ${ic('int e = w + 1;')}, is **unboxing**: the Integer w is converted to an int for the addition. The program displays ${ic(out(code('int q = 6;', 'Integer w = q;', 'int e = w + 1;', 'System.out.println(e);')))}.`,
  sol: 'The assignment of a primitive to a wrapper variable is autoboxing; the use of a wrapper object where an int is needed is unboxing.',
  scheme: [['Autoboxing statement identified (line 2)', 1], ['Unboxing statement identified (line 3) and the value displayed', 1]],
}));
