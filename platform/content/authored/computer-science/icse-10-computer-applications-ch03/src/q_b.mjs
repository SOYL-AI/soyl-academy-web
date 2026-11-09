// ICSE 10 Computer Applications, ch03: topic t02 (packages, types of errors, comments).
import { Q, mcq, ar, tf, fb, match, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, out, outIn, errIn, distinct, mustCompile, mustFail } from './q_util.mjs';

const wrap = (...lines) => code('public class Test {', '    public static void main(String[] args) {', ...lines.map((l) => '        ' + l), '    }', '}');

// ---------------------------------------------------------------- packages
mustCompile(wrap('String s = "tea";', 'System.out.println(s.length() + " " + Math.max(3, 9));'), 'java.lang classes need no import');
Q('m_default_pkg', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which package of Java is imported automatically into every program?',
  opts: distinct(['java.lang', 'java.util', 'java.io', 'java.awt']),
  sol: 'java.lang holds the basic classes such as String, Math and System, so they can be used without an import statement. Scanner is in java.util, which must be imported.',
}));
const useScanner = (imp) => code(...(imp ? [imp] : []), 'public class Lunch {', '    public static void main(String[] args) {', '        Scanner sc = new Scanner(System.in);', '        int plates = sc.nextInt();', '        System.out.println(plates * 40);', '    }', '}');
mustCompile(useScanner('import java.util.*;'), 'java.util.* with Scanner', '3\n');
const eStar = mustFail(useScanner('import java.*;'), 'java.* does not reach Scanner');
Q('tf_import_star', tf({
  t: 2, d: 3, c: 'analysis', ans: false,
  stem: 'True or false? The statement import java.*; makes the class Scanner available, because Scanner is a class inside the java package.',
  sol: `The asterisk imports the classes of the named package only, not the packages inside it. Scanner is in java.util, so a program that imports java.* is rejected with "${eStar}", while import java.util.*; works.`,
}));
mustCompile(wrap('String s = "tea";', 'System.out.println(Math.sqrt(16) + s);'), 'String and Math');
mustFail(useScanner(''), 'Scanner without import');
Q('m_pkg_use', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A program has no import statement at all. Which pair of classes can it still use?',
  opts: distinct(['String and Math', 'Scanner and Math', 'Scanner and String', 'Scanner and Random']),
  sol: 'String and Math belong to java.lang, which is imported automatically. Scanner and Random belong to java.util and need an import statement.',
}));
const progNoImp = useScanner('');
Q('co_noimport', co({
  pre: 'A student types the program below for a lunch counter but forgets the import statement. The program does not compile. Write the error message that javac reports first and the line on which it is reported.',
  t: 2, d: 3, c: 'analysis', error: true, code: progNoImp,
  sol: 'The class Scanner is not in java.lang, so without an import statement the compiler cannot find a class of that name. The first place where the name is used is line 3.',
}));

// ---------------------------------------------------------------- types of errors
const cAvgWrong = code('int a = 30, b = 60, c = 90;', 'double avg = a + b + c / 3;', 'System.out.println(avg);');
const cAvgRight = code('int a = 30, b = 60, c = 90;', 'double avg = (a + b + c) / 3;', 'System.out.println(avg);');
const avgWrong = out(cAvgWrong);
const avgRight = out(cAvgRight);
Q('m_logical', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: `A teacher's program must show the average of three marks. For the marks 30, 60 and 90 it compiles, runs without any message and displays ${ic(avgWrong)}.\n\n${F(cAvgWrong)}\n\nWhat kind of error does the program contain?`,
  opts: distinct(['A logical error', 'A syntax error', 'A run-time error', 'No error; the average of 30, 60 and 90 is really that value']),
  sol: `Division comes before addition, so only c is divided by 3. The program is grammatically correct and nothing goes wrong while it runs, but the result is wrong: with brackets, (a + b + c) / 3 gives ${avgRight}.`,
}));
const eUndecl = mustFail(wrap('int total = 5;', 'System.out.println(totl);'), 'undeclared name');
const rMismatch = errIn('ten\n', 'runtime', 'Scanner sc = new Scanner(System.in);', 'int n = sc.nextInt();').err;
const rZero = errIn('', 'runtime', 'int n = 0;', 'System.out.println(100 / n);').err;
Q('m_javac_detects', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Which of the following mistakes is found by the compiler, before the program starts to run?',
  opts: distinct(['Using the name totl in a statement when only total has been declared', 'Typing the letters ten when nextInt() is waiting for a number', 'Dividing an int by a variable that holds 0', 'Writing a + b / 2 for the average of a and b']),
  sol: `An undeclared name is a syntax (compile-time) error: javac reports "${eUndecl}". Typing ten for nextInt() and dividing by 0 are run-time errors (${rMismatch} and ${rZero}), and writing a + b / 2 for the average is a logical error that gives a wrong result without any message.`,
}));
const cSyn = code('int bags = 12', 'int extra = 3;', 'System.out.println(bags + extra);');
Q('co_syntax', co({
  pre: 'A delivery program has one typing mistake and does not compile. Write the error message and the line number that javac reports.',
  t: 2, d: 2, c: 'analysis', error: true, code: cSyn,
  sol: 'Every statement must end with a semicolon. The first statement does not, so the compiler reports the missing semicolon on line 1 and nothing is run.',
}));
const cZero = code('int total = 120;', 'int people = 0;', 'System.out.println("Share:");', 'System.out.println(total / people);');
Q('co_div_zero', co({
  pre: 'A program divides a bill among a number of people, but the variable people is 0. The program compiles. Write the exception that is thrown while it runs.',
  t: 2, d: 3, c: 'application', error: true, code: cZero,
  sol: 'Division of an int by zero is not defined, so Java throws an ArithmeticException at run time. The first println has already displayed its text before the exception stops the program.',
}));
Q('co_logical', co({
  pre: 'A student compares two ways of writing an average in one program. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: code('int a = 30, b = 60, c = 90;', 'System.out.println(a + b + c / 3);', 'System.out.println((a + b + c) / 3);'),
  sol: 'In the first line the division is done first, so only c is divided by 3; the second line uses brackets. Both lines are valid Java, but only one is the average.',
}));
Q('ar_error_kind', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'A syntax error is reported by the compiler before the program is run.',
  r: 'A run-time error stops the running program by throwing an exception.',
  sol: `For example ${ic('int bags = 12')} without a semicolon is rejected with "${mustFail('int bags = 12\nSystem.out.println(bags);', 'missing semicolon')}" and no bytecode is produced. Both statements are true, but the exception of a run-time error is thrown only after the program has started, so it does not explain why a syntax error is reported earlier.`,
}));
Q('mt_errors', match({
  t: 2, d: 2, c: 'understanding', marks: 3,
  stem: 'Match each type of error with the way in which it shows itself.',
  pairs: [
    ['Syntax error', 'javac rejects the program and no bytecode is produced'],
    ['Run-time error', 'the program starts but stops with an exception'],
    ['Logical error', 'the program finishes normally but the result is wrong'],
  ],
  sol: `A missing semicolon is a syntax error, dividing by zero gives "${rZero}" at run time, and the formula a + b + c / 3 for an average is a logical error that displays ${avgWrong} instead of ${avgRight}.`,
}));
Q('s_err_types', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [25, 80],
  stem: 'Distinguish between a syntax error and a run-time error, with one example of each.',
  model: `A **syntax error** breaks a rule of the Java language; the compiler reports it and the program does not run. Example: ${ic('int n = 7')} (missing semicolon) gives "${mustFail('int n = 7\nSystem.out.println(n);')}".\n\nA **run-time error** occurs while the program is running and stops it with an exception. Example: ${ic('100 / 0')} with int operands gives ${ic(rZero)}.`,
  sol: 'One mark for each error type with its example.',
  scheme: [['Syntax error: broken rule of the language, found by the compiler, with example', 1], ['Run-time error: found during execution as an exception, with example', 1]],
}));
Q('s_logical', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: [25, 80],
  stem: `What is a logical error? A program must find the average of the marks 30, 60 and 90 but contains the statement ${ic('avg = a + b + c / 3;')} Show the error and correct it.`,
  model: `A **logical error** is a mistake in the design of the program: the program compiles and runs, but the result is not what was intended.\n\nThe statement ${ic('a + b + c / 3')} displays ${ic(avgWrong)} because the division is done first. The corrected statement ${ic('(a + b + c) / 3')} displays ${ic(avgRight)}.`,
  sol: 'One mark for the meaning and one mark for the example with its correction.',
  scheme: [['Meaning: program runs but the result is wrong', 1], ['Wrong and corrected statements with the results', 1]],
}));

// ---------------------------------------------------------------- comments
mustFail('** Show the fare **\nint fare = 5;', 'stars are not a comment');
Q('m_comment_types', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of the following is a documentation comment in Java?',
  opts: distinct([ic('/** Calculates the fare. */'), ic('// Calculates the fare.'), ic('/* Calculates the fare. */'), ic('** Calculates the fare. **')]),
  sol: 'A documentation comment begins with /** and ends with */. // starts a single-line comment and /* ... */ is an ordinary multi-line comment. The last form is not a comment at all, and the compiler rejects it.',
}));
Q('tf_comment_run', tf({
  t: 2, d: 1, c: 'recall', ans: false,
  stem: 'True or false? The compiler translates the text inside a // comment, so the statement written there is executed.',
  sol: `Comments are ignored by the compiler. For the two lines ${ic('System.out.println("on");')} and ${ic('// System.out.println("off");')} the only output is ${ic(out('System.out.println("on");', '// System.out.println("off");'))}, because the second line is a comment.`,
}));
Q('fb_comments', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'A single-line comment begins with ___, and a multi-line comment starts with ___ and ends with ___.',
  acc: [['//'], ['/*'], ['*/']],
  sol: 'The two slashes // comment out the rest of one line. A multi-line comment is enclosed between /* and */.',
}));
Q('co_comment', co({
  pre: 'A student has commented out some statements while testing. Write the exact output of the following code.',
  t: 2, d: 3, c: 'application',
  code: code('System.out.println("A"); // System.out.println("B");', '/* System.out.println("C");', '   System.out.println("D"); */', 'System.out.println("E");'),
  sol: 'The part of line 1 after // is a comment, and everything between /* and */ is a comment too, so only the first statement of line 1 and the last line are executed.',
}));
Q('co_unclosed', co({
  pre: 'A programmer starts a multi-line comment but never closes it. The code does not compile. Write the error message and the line number that javac reports.',
  t: 2, d: 3, c: 'analysis', error: true,
  code: code('int base = 4;', '/* area of the square', 'System.out.println(base * base);'),
  sol: 'A comment that begins with /* must end with */. Without it the rest of the source file is treated as comment, and the compiler reports the place where the comment began.',
}));
Q('s_comments', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: [20, 70],
  stem: 'What is a comment in a Java program? Name its three kinds and show how each is written.',
  model: `A **comment** is explanatory text in the source code that the compiler ignores.\n\n1. Single-line: ${ic('// text')}\n2. Multi-line: ${ic('/* text */')}\n3. Documentation: ${ic('/** text */')}`,
  sol: 'One mark for the meaning and one mark for the three kinds with their symbols.',
  scheme: [['Meaning: text ignored by the compiler, written to explain the code', 1], ['Three kinds with syntax', 1]],
}));
