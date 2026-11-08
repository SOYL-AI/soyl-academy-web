// ICSE 10 Computer Applications, ch03: topic t01 (ways of input; the Scanner class).
// Every program, scenario and value is written for SOYL (imagined schools, shops and people).
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, out, outIn, distinct, mustCompile, mustFail } from './q_util.mjs';

const SCAN = 'Scanner sc = new Scanner(System.in);';
const fragFail = (line) => mustFail(code(SCAN, line));
const mainOf = (...lines) => code('import java.util.Scanner;', 'public class Entry {', '    public static void main(String[] args) {', ...lines.map((l) => '        ' + l), '    }', '}');

// ---------------------------------------------------------------- ways of input
Q('m_ways_not', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of the following is NOT a way of giving input to a Java program?',
  opts: distinct(['Writing a comment above the statement', 'Initialising a variable inside the program', 'Passing values as parameters to a method', 'Reading values with the Scanner class']),
  sol: 'The three ways are initialisation (values written in the program), parameters (values passed when a method is called) and the Scanner class (values typed while the program runs). A comment is ignored by the compiler and gives no input.',
}));
Q('m_init_drawback', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A canteen program keeps the price of a tea in a variable that is given its value by initialisation, for example double tea = 12.5; . What is the main limitation of this way of giving input?',
  opts: distinct(['To process a different price, the source code must be edited and compiled again', 'The price cannot be of type double', 'The program cannot display the price', 'The price can be used only once in the program']),
  sol: 'With initialisation the value is part of the source code, so new data means a change in the program and a fresh compilation. Parameters and the Scanner class supply new data without editing the source code.',
}));
const cArea = code('public class Disc {', '    double area(double r) {', '        return 3.14 * r * r;', '    }', '}');
Q('m_param_way', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `In BlueJ a student right-clicks an object of the class below, chooses the method area and types 7 in the dialog box that opens.\n\n${F(cArea)}\n\nWhich way of giving input is this?`,
  opts: distinct(['Input by parameters (the value is passed to the formal parameter r)', 'Input by initialisation', 'Input through the Scanner class', 'Input through an import statement']),
  sol: 'The value typed in the BlueJ dialog is the actual parameter of the call; it is copied into the formal parameter r when the method starts. No Scanner object is created and no variable is initialised in the program.',
}));
// Scanner set-up
const progNoImport = code('public class Check {', '    public static void main(String[] args) {', '        ' + SCAN, '    }', '}');
const wrongImport = code('import java.lang.Scanner;', 'public class Check {', '    public static void main(String[] args) {', '        ' + SCAN, '    }', '}');
const rightImport = code('import java.util.Scanner;', 'public class Check {', '    public static void main(String[] args) {', '        ' + SCAN, '    }', '}');
mustCompile(rightImport, 'java.util.Scanner');
mustCompile(code('import java.util.*;', 'public class Check {', '    public static void main(String[] args) {', '        ' + SCAN, '    }', '}'), 'java.util.*');
const eWrongImport = mustFail(wrongImport, 'java.lang.Scanner');
export const eNoImport = mustFail(progNoImport, 'no import');
Q('m_import', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which statement must be written at the top of a program so that the class Scanner can be used?',
  opts: distinct([ic('import java.util.Scanner;'), ic('import java.lang.Scanner;'), ic('import scanner.util;'), ic('include java.util.Scanner;')]),
  sol: `Scanner belongs to the package java.util. With import java.lang.Scanner the compiler cannot find the class and reports "${eWrongImport}", because java.lang has no class of that name.`,
}));
Q('ar_import', ar({
  t: 1, d: 2, c: 'understanding', verdict: 'A-false-R-true',
  a: 'A class that creates a Scanner object compiles even when it has no import statement for Scanner.',
  r: 'The class Scanner belongs to the package java.util, which Java does not import automatically.',
  sol: `A program that creates a Scanner with no import is rejected with "${eNoImport}". Only java.lang is imported by default, so the assertion is false and the reason is true.`,
}));
mustFail(code(SCAN, 'char grade = sc.nextChar();'), 'nextChar');
mustFail(code(SCAN, 'char grade = sc.next();'), 'char = next()');
mustFail(code(SCAN, 'char grade = sc.nextLine();'), 'char = nextLine()');
mustCompile(code(SCAN, 'char grade = sc.next().charAt(0);\nSystem.out.println(grade);'), 'charAt', 'B\n');
Q('m_char_stmt', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A quiz program must read the grade letter that the user types, for example B, into a char variable named grade. Which statement does this correctly?',
  opts: distinct([ic('char grade = sc.next().charAt(0);'), ic('char grade = sc.nextChar();'), ic('char grade = sc.next();'), ic('char grade = sc.nextLine();')]),
  sol: `Scanner has no method to read a char directly. next() reads a word as a String and charAt(0) takes its first character. The other options fail to compile: for example ${ic('char grade = sc.next();')} gives "${fragFail('char grade = sc.next();')}" and ${ic('sc.nextChar()')} gives "${fragFail('char grade = sc.nextChar();')}".`,
}));
Q('m_read_double', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A bakery program must read the price of a cake, such as 349.50, into a variable named price. Which statement is correct?',
  opts: distinct([ic('double price = sc.nextDouble();'), ic('int price = sc.nextDouble();'), ic('double price = sc.next();'), ic('double price = sc.nextLine().charAt(0);')]),
  sol: `nextDouble() returns a double, so it can be stored in a double variable. ${ic('int price = sc.nextDouble();')} fails with "${fragFail('int price = sc.nextDouble();')}" and ${ic('double price = sc.next();')} fails with "${fragFail('double price = sc.next();')}".`,
}));
Q('m_next_word', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The user types ${ic('Asha Rao')} and presses Enter. What does the program display?\n\n${F(SCAN, 'String w = sc.next();', 'System.out.println(w);')}`,
  opts: distinct([outIn('Asha Rao\n', SCAN, 'String w = sc.next();', 'System.out.println(w);'), 'Asha Rao', 'Rao', 'An InputMismatchException']),
  sol: 'next() reads one word: it stops at the first white space (here the blank between the names) and returns the text before it. The rest of the line stays in the input, waiting to be read.',
}));
const cPit = code(SCAN, 'int age = sc.nextInt();', 'String name = sc.nextLine();', 'System.out.println("Name: " + name + ".");');
const pitIn = '40\nRiya Nair\n';
const pitOut = outIn(pitIn, cPit);
Q('m_pitfall_why', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `The user types 40, presses Enter, types ${ic('Riya Nair')} and presses Enter. The program below displays ${ic(pitOut)}, with no name. What is the reason?\n\n${F(cPit)}`,
  opts: distinct(['nextInt() reads only the digits and leaves the new-line character, which nextLine() then reads as an empty line', 'nextLine() cannot read a String that contains a blank', 'The Scanner object was created after the number was typed', 'nextInt() also reads the whole second line and throws away its text']),
  sol: 'The Enter key after 40 is stored as a new-line character. nextInt() stops before it, so the next call, nextLine(), finds the end of the current line at once and returns an empty string. The name Riya Nair is still unread.',
}));
const cFix = code(SCAN, 'int age = sc.nextInt();', 'sc.nextLine();', 'String name = sc.nextLine();', 'System.out.println("Name: " + name + ".");');
const fixOut = outIn(pitIn, cFix);
const nextOut = outIn(pitIn, SCAN, 'int age = sc.nextInt();', 'String name = sc.next();', 'System.out.println("Name: " + name + ".");');
Q('m_pitfall_fix', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'A program reads an age with nextInt() and then a name with nextLine(); the age and the name are typed on separate lines and the name comes out empty. Which change makes the program read the full name?',
  opts: distinct(['Add the statement sc.nextLine(); after the call of nextInt() to use up the rest of the first line', 'Replace nextLine() with next()', 'Call nextInt() a second time before nextLine()', 'Write the Scanner statement twice']),
  sol: `The extra nextLine() throws away the leftover new-line, so the following nextLine() reads the second line; for the typed lines 40 and Riya Nair the output is ${ic(fixOut)}. Using next() would show only ${ic(nextOut)}, because it stops at the blank.`,
}));
Q('tf_nextint_newline', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? After nextInt() reads a number, the new-line character typed with Enter is also removed from the input.',
  sol: `The new-line stays in the input. That is why a nextLine() placed straight after nextInt() returns an empty string; with the typed lines 40 and Riya Nair it gives ${ic(pitOut)}.`,
}));
Q('ar_nextline', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: 'A program that reads an age with nextInt() and then a name with nextLine() shows an empty name when the age and the name are typed on separate lines.',
  r: 'nextInt() leaves the new-line that follows the number unread, and nextLine() returns the text up to that new-line.',
  sol: `For the typed lines 40 and Riya Nair the program displays ${ic(pitOut)}: nextLine() found the leftover end of the first line, which holds no text.`,
}));
Q('fb_next', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The Scanner method ___ reads a single word, while the method ___ reads the whole remaining line, including blanks.',
  acc: [['next', 'next()'], ['nextLine', 'nextLine()']],
  sol: 'next() stops at white space; nextLine() returns everything up to the end of the line. For the input Asha Rao, next() gives Asha and nextLine() gives Asha Rao.',
}));
Q('mt_scanner', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each Scanner method with what it reads from the input.',
  pairs: [
    [ic('nextInt()'), 'one whole number, returned as an int'],
    [ic('nextDouble()'), 'one real number, returned as a double'],
    [ic('next()'), 'one word, up to the next white space'],
    [ic('nextLine()'), 'everything up to the end of the current line'],
  ],
  sol: `For example, with the input 4.5 the statement ${ic('double d = sc.nextDouble();')} stores ${outIn('4.5\n', SCAN, 'double d = sc.nextDouble();', 'System.out.println(d);')}, whereas nextInt() would throw an exception.`,
}));
Q('ord_scanner', ord({
  t: 1, d: 2, c: 'application',
  stem: 'Arrange the steps of a program that reads the length of a rope and then uses it, in the order in which they must appear.',
  items: [ic('import java.util.Scanner;'), ic('Scanner sc = new Scanner(System.in);'), ic('System.out.println("Enter the length:");'), ic('double len = sc.nextDouble();'), ic('System.out.println(len * 2);')],
  sol: 'The import comes first, then the object is created, then a prompt is shown so that the user knows what to type, then the value is read and finally it is used.',
}));
// code-output items with input
Q('co_two_ints', co({
  pre: 'A shop assistant types the two numbers 7 and 15 on one line, separated by a blank, and presses Enter. Write the exact output of the following code.',
  t: 1, d: 2, c: 'application', run: { stdin: '7 15\n' },
  code: code(SCAN, 'int a = sc.nextInt();', 'int b = sc.nextInt();', 'System.out.println(a + b);', 'System.out.println(a + " " + b);'),
  sol: 'nextInt() skips the blank and reads each number in turn. The first println adds the numbers; the second joins them as text with a blank between them.',
}));
Q('co_pitfall', co({
  pre: 'The user types 12, presses Enter, types Green Park and presses Enter. Write the exact output of the following code.',
  t: 1, d: 4, c: 'application', run: { stdin: '12\nGreen Park\n' },
  code: code(SCAN, 'int n = sc.nextInt();', 'String s = sc.nextLine();', 'System.out.println("First: [" + s + "]");', 'String t = sc.nextLine();', 'System.out.println("Second: [" + t + "]");'),
  sol: 'The first nextLine() reads the empty remainder of the line that held 12; the second nextLine() reads the next full line.',
}));
Q('co_mismatch', co({
  pre: 'A quiz program reads the marks with nextInt(). The user types the word eight and presses Enter. Write the exception that is thrown.',
  t: 1, d: 3, c: 'application', error: true, run: { stdin: 'eight\n' },
  code: code(SCAN, 'System.out.println("Enter marks:");', 'int m = sc.nextInt();', 'System.out.println(m + 1);'),
  sol: 'The token eight does not match the pattern of an int, so nextInt() throws an InputMismatchException. The prompt is displayed, but the last statement is never reached.',
}));
Q('co_nothing', co({
  pre: 'A program reads one number with nextInt(), but the user closes the input without typing anything. Write the exception that is thrown.',
  t: 1, d: 4, c: 'application', error: true, run: { stdin: '' },
  code: code(SCAN, 'int n = sc.nextInt();', 'System.out.println(n * n);'),
  sol: 'When there is no token left in the input, the Scanner throws a NoSuchElementException. A token of the wrong kind throws InputMismatchException instead.',
}));
// short answers
Q('s_ways', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: [15, 60],
  stem: 'Name the three ways of giving input to a Java program and state one feature of each.',
  model: `1. **Initialisation**: the variable is given its value inside the program, for example ${ic('int side = 12;')}.\n2. **Parameters**: the caller hands the value over through the method call (the actual parameter).\n3. **Scanner class**: the user types the value at the keyboard during execution.`,
  sol: 'One mark for naming all three ways and one mark for a correct feature of each.',
  scheme: [['Three ways named', 1], ['A feature or example for each', 1]],
}));
const nlIn = 'Asha Rao\n';
Q('s_next_vs_line', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [20, 70],
  stem: 'Distinguish between the Scanner methods next() and nextLine(). Show the result of each when the input is the line Asha Rao.',
  model: `**next()** reads one word and stops at the first white space. **nextLine()** reads all the characters up to the end of the line, including blanks.\n\nFor the input ${ic('Asha Rao')}: next() returns ${ic(outIn(nlIn, SCAN, 'System.out.println(sc.next());'))} and nextLine() returns ${ic(outIn(nlIn, SCAN, 'System.out.println(sc.nextLine());'))}.`,
  sol: 'One mark for each method with its behaviour; the examples must match.',
  scheme: [['next(): one word, stops at white space', 1], ['nextLine(): whole line, with example results', 1]],
}));
const sRead = mainOf(SCAN, 'int roll = sc.nextInt();', 'double avg = sc.nextDouble();', 'System.out.println(roll + " " + avg);');
Q('s_stmt_read', short({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Write Java statements to create a Scanner object named sc and to read the roll number of a student into an int variable and the average marks into a double variable.',
  model: `${F('Scanner sc = new Scanner(System.in);', 'int roll = sc.nextInt();', 'double avg = sc.nextDouble();')}\n\nThe statements need the line ${ic('import java.util.Scanner;')} at the top of the program. With the input ${ic('14 76.5')} the complete program shows ${ic(outIn('14 76.5\n', sRead))}.`,
  sol: 'One mark for the object creation and one mark for the two reading statements with the right methods.',
  scheme: [['Scanner object created with new Scanner(System.in)', 1], ['nextInt() for the roll number and nextDouble() for the average', 1]],
}));
Q('s_scanner_why', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [20, 70],
  stem: 'Explain the purpose of the statements import java.util.Scanner; and Scanner sc = new Scanner(System.in);.',
  model: 'The **import** statement tells the compiler that the class Scanner belongs to the package java.util, so that the class can be used by its short name.\n\n**new Scanner(System.in)** creates a Scanner object attached to the keyboard (System.in); its reference is stored in the variable sc, through which the reading methods are called.',
  sol: 'One mark for each statement explained.',
  scheme: [['Import makes the class of java.util available', 1], ['new creates a Scanner object tied to System.in, referred to by sc', 1]],
}));
