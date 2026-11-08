// ICSE 10 Computer Applications, ch04: topic t03 (menu-driven programs, System.exit(0)) and the 15-mark programs.
import { Q, mcq, ar, fb, ord, short, long, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, out, distinct, mustFail, mustCompile, prog, S15 } from './q_util.mjs';

// ---- shared code
export const cExit = (n) => code(
  `int choice = ${n};`,
  'System.out.println("Start");',
  'if (choice > 5) {',
  '    System.out.println("Invalid");',
  '    System.exit(0);',
  '}',
  'System.out.println("Continue");',
);
export const cMenuTiny = code(
  'Scanner sc = new Scanner(System.in);',
  'int choice = sc.nextInt();',
  'int x = sc.nextInt();',
  'switch (choice) {',
  '    case 1: System.out.println(x * x); break;',
  '    case 2: System.out.println(x * x * x); break;',
  '    default: System.out.println("Invalid");',
  '}',
);
export const cMenuCalc = code(
  'Scanner sc = new Scanner(System.in);',
  'int ch = sc.nextInt();',
  'int a = sc.nextInt();',
  'int b = sc.nextInt();',
  'switch (ch) {',
  '    case 1: System.out.println("Sum = " + (a + b)); break;',
  '    case 2: System.out.println("Difference = " + (a - b)); break;',
  '    case 3: System.out.println("Product = " + (a * b)); break;',
  '    default: System.out.println("Invalid");',
  '}',
  'System.out.println("Bye");',
);
export const cExitScan = code(
  'Scanner sc = new Scanner(System.in);',
  'int n = sc.nextInt();',
  'System.out.println("Reading");',
  'if (n < 0) {',
  '    System.out.println("Negative");',
  '    System.exit(0);',
  '}',
  'System.out.println("Square: " + n * n);',
);

// ================================================================ t03 Menu-driven programs; System.exit(0)
Q('m_exit_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'What does the statement System.exit(0); do when it is executed?',
  opts: distinct(['It terminates the running program immediately, the value 0 meaning normal termination', 'It leaves only the switch statement in which it is written', 'It returns from the current method to the method that called it', 'It restarts the program from the first statement of main']),
  sol: 'System.exit() ends the whole program (the Java Virtual Machine) at once; it is not limited to the current switch, loop or method. The argument 0 is the conventional status for a normal end.',
}));
Q('m_exit_effect', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A program checks a menu choice and quits on a bad one. What does this code display when choice is 9?\n\n${F(cExit(9))}`,
  opts: distinct([ic(out(cExit(9)).split('\n').join(' / ')), ic(out(cExit(2)).split('\n').join(' / ')), ic('Invalid / Continue'), ic('Invalid')]),
  sol: 'The first println runs. Because 9 is more than 5, the if block prints Invalid and calls System.exit(0), which ends the program on the spot, so the line after the if is never executed. With a choice such as 2 the program would instead print Start and Continue.',
}));
Q('m_menu_default', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In a menu-driven program that uses switch on the choice, what is the best use of the default label?',
  opts: distinct(['To tell the user that the choice is invalid', 'To run the first menu option automatically', 'To repeat the menu for ever', 'To read the next value with Scanner']),
  sol: 'A choice outside the menu matches no case, so default is the place for a message such as Invalid choice (and, if wished, System.exit(0)). It does not repeat anything by itself.',
}));
mustCompile(code('Scanner sc = new Scanner(System.in);', 'char ch = sc.next().charAt(0);', 'System.out.println(ch);'), 'char read', 'y');
const errNextChar = mustFail(code('Scanner sc = new Scanner(System.in);', 'char ch = sc.nextChar();'), 'nextChar');
const errNextLine = mustFail(code('Scanner sc = new Scanner(System.in);', 'char ch = sc.nextLine();'), 'nextLine to char');
const errNextInt = mustFail(code('Scanner sc = new Scanner(System.in);', 'char ch = sc.nextInt();'), 'nextInt to char');
Q('m_char_read', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A menu uses the letters a, b and c as choices. Which statement correctly reads the choice typed by the user into a char variable ch, with the Scanner object sc?',
  opts: distinct([ic('char ch = sc.next().charAt(0);'), ic('char ch = sc.nextChar();'), ic('char ch = sc.nextLine();'), ic('char ch = sc.nextInt();')]),
  sol: `The Scanner class has no method to read a char directly, so a word is read with next() and its first character is taken with charAt(0). The other lines fail: nextChar gives "${errNextChar}", nextLine gives "${errNextLine}" and nextInt gives "${errNextInt}".`,
}));
Q('m_menu_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'What is a menu-driven program?',
  opts: distinct(['A program that displays a list of options, accepts the choice of the user and performs the task for that choice', 'A program that has methods but no main method', 'A program that prints a table of contents of its own code', 'A program that can be run only from the menu bar of BlueJ']),
  sol: 'A menu-driven program lets the user choose the task to perform. It displays the options, reads the choice with a Scanner method, and a switch statement (or an if-else-if ladder) runs the matching task. The other options describe things that have nothing to do with the choice of the user.',
}));
Q('ar_exit', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'The statements written after a System.exit(0); call are not executed.',
  r: 'The argument 0 given to System.exit() is conventionally used as the status of a normal termination.',
  sol: `Run with the statement before and after the call, the program prints only ${ic(out(code('System.out.println("before");', 'System.exit(0);', 'System.out.println("after");')))}, so (A) is true. (R) is true as well, but it only describes the meaning of the value 0; the statements are skipped because the program ends, not because of that value.`,
}));
Q('fb_exit', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'The statement System.exit(___); terminates a program with the status value that stands for normal termination.',
  acc: [['0', 'zero']],
  sol: 'The value 0 is the conventional status for a normal termination.',
}));
Q('ord_menu', ord({
  t: 3, d: 3, c: 'application',
  stem: 'Arrange the steps of a menu-driven program, as it is written and executed, in the correct order.',
  items: ['Display the numbered menu with println statements', 'Read the choice of the user with a Scanner method', 'Start a switch statement on the choice', 'In the matching case read the data needed and show the result', 'End the case with break so that the next case does not run'],
  sol: 'The menu must be seen before a choice is read, the switch needs the choice, each case does its own work and ends with a break; the default case handles a choice that is not on the menu.',
}));

// ---- code output, t03
Q('co_exit', co({
  pre: 'The program reads one integer from the input, and the input given is -4. Write the exact output.',
  t: 3, d: 3, c: 'application', run: { stdin: '-4\n' },
  code: cExitScan,
  sol: 'The value -4 is read. Reading is printed, then n < 0 is true, so Negative is printed and System.exit(0) ends the program. The Square line is never reached.',
}));
Q('co_menu_run', co({
  pre: 'A pocket calculator program reads a choice and two numbers. The input given is 3 12 5. Write the exact output.',
  t: 3, d: 3, c: 'application', run: { stdin: '3 12 5\n' },
  code: cMenuCalc,
  sol: 'The choice 3 selects the third case, which prints the product of 12 and 5. The break leaves the switch, and the last statement, which is outside it, prints Bye.',
}));

// ---- short answers, t03
Q('s_exit', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'What is the purpose of the statement System.exit(0)? Mention one situation in a menu-driven program where it is useful.',
  model: `System.exit(0) **terminates the running program at once**; the 0 shows a normal termination, and no statement after it is executed. In a menu-driven program it is useful in the default case, when the user types a choice that is not on the menu: the program shows an error message and ends.\n\n${F(cExit(9))}\n\nFor choice 9 the lines printed are ${ic(out(cExit(9)).split('\n').join(' / '))}; the last line is skipped.`,
  sol: 'One mark for the purpose and one for the situation.',
  scheme: [['Purpose: terminates the program, status 0 means normal', 1], ['A suitable use, such as an invalid choice or an Exit option', 1]],
}));
const cBreakDemo = code('int n = 1;', 'switch (n) {', '    case 1: System.out.println("one"); break;', '    case 2: System.out.println("two");', '}', 'System.out.println("after switch");');
const cExitDemo = code('int n = 1;', 'switch (n) {', '    case 1: System.out.println("one"); System.exit(0);', '    case 2: System.out.println("two");', '}', 'System.out.println("after switch");');
Q('s_break_vs_exit', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between break and System.exit(0) when they are used in a switch statement.',
  model: `**break** leaves only the switch statement; the program goes on with the statement after the switch. **System.exit(0)** terminates the whole program, so no later statement runs.\n\nWith n = 1, the version that uses break prints ${ic(out(cBreakDemo).split('\n').join(' / '))}, but the version that uses System.exit(0) prints only ${ic(out(cExitDemo))}.`,
  sol: 'One mark for each statement, with its effect on the statements that follow.',
  scheme: [['break: leaves the switch, the program continues', 1], ['System.exit(0): ends the program, later statements do not run', 1]],
}));

// ================================================================ 15-mark programs

// ---- electricity bill (if-else-if ladder with slab rates)
const srcPower = code(
  'import java.util.Scanner;',
  '',
  'public class PowerBill {',
  '    // Bill of the imagined Sundarpur Power Board, with three slabs',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("Enter the units consumed:");',
  '        int units = sc.nextInt();',
  '        double energy;',
  '        if (units <= 100)',
  '            energy = units * 2.50;',
  '        else if (units <= 250)',
  '            energy = 100 * 2.50 + (units - 100) * 4.00;',
  '        else',
  '            energy = 100 * 2.50 + 150 * 4.00 + (units - 250) * 6.50;',
  '        double bill = energy + 60;   // fixed charge',
  '        System.out.println("Units = " + units);',
  '        System.out.println("Energy charge = " + energy);',
  '        System.out.println("Bill = " + bill);',
  '    }',
  '}',
);
Q('l_electric', long({
  t: 1, d: 4, c: 'application', marks: 15,
  stem: 'The imagined Sundarpur Power Board charges for electricity in three slabs: Rs 2.50 per unit for the first 100 units, Rs 4.00 per unit for the next 150 units (units 101 to 250) and Rs 6.50 per unit for every unit above 250. A fixed charge of Rs 60 is added to every bill. Write a program in Java to accept the number of units consumed and display the energy charge and the bill amount. Use an if-else-if ladder. Sample input: 320 (this exercises the third slab).',
  model: prog({ src: srcPower, stdin: '320\n', also: ['80\n'], vars: [['units', 'int', 'units consumed, read from the user'], ['energy', 'double', 'energy charge as per the slabs'], ['bill', 'double', 'energy charge plus the fixed charge of 60']] }),
  sol: 'Test the slabs from the lowest: units up to 100, then up to 250, else the top slab. In the second and third slabs only the units above the lower limit are charged at the higher rate, and the full charges of the lower slabs are added.',
  scheme: S15(3, 2, 'Slab conditions in the correct order; charge of each slab calculated correctly; fixed charge added', 2, 2),
}));

// ---- grade from marks (ladder with validation)
const srcGrade = code(
  'import java.util.Scanner;',
  '',
  'public class GradeCard {',
  '    // Grade of a student of an imagined school from marks out of 100',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("Enter the marks out of 100:");',
  '        int marks = sc.nextInt();',
  '        if (marks < 0 || marks > 100)',
  '            System.out.println("Invalid marks");',
  '        else if (marks >= 90)',
  '            System.out.println("Grade A: Outstanding");',
  '        else if (marks >= 75)',
  '            System.out.println("Grade B: Very good");',
  '        else if (marks >= 60)',
  '            System.out.println("Grade C: Good");',
  '        else if (marks >= 40)',
  '            System.out.println("Grade D: Satisfactory");',
  '        else',
  '            System.out.println("Grade E: Needs improvement");',
  '    }',
  '}',
);
Q('l_grade', long({
  t: 1, d: 3, c: 'application', marks: 15,
  stem: 'Lakeview Public School, an imagined school, gives a grade from the marks of a test out of 100: 90 and above grade A (Outstanding), 75 to 89 grade B (Very good), 60 to 74 grade C (Good), 40 to 59 grade D (Satisfactory) and below 40 grade E (Needs improvement). Marks below 0 or above 100 are invalid. Write a program in Java to accept the marks and display the grade with its remark, or an error message for invalid marks. Use an if-else-if ladder. Sample input: 68 (this exercises grade C).',
  model: prog({ src: srcGrade, stdin: '68\n', also: ['104\n'], vars: [['marks', 'int', 'marks of the student, read from the user']] }),
  sol: 'First reject the invalid marks with a condition joined by ||, then test the lower limits from the highest (90) to the lowest (40) so that the first true condition gives the correct grade; the last else is grade E.',
  scheme: S15(3, 2, 'Validation of the range; ladder with limits in the correct order; each grade and remark correct', 2, 2),
}));

// ---- largest of three (nested if)
const srcLargest = code(
  'import java.util.Scanner;',
  '',
  'public class Largest {',
  '    // Finds the largest of three readings using nested if',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("Enter three whole numbers:");',
  '        int a = sc.nextInt();',
  '        int b = sc.nextInt();',
  '        int c = sc.nextInt();',
  '        int largest;',
  '        if (a >= b) {',
  '            if (a >= c)',
  '                largest = a;',
  '            else',
  '                largest = c;',
  '        } else {',
  '            if (b >= c)',
  '                largest = b;',
  '            else',
  '                largest = c;',
  '        }',
  '        System.out.println("Largest = " + largest);',
  '    }',
  '}',
);
Q('l_largest', long({
  t: 1, d: 3, c: 'application', marks: 15,
  stem: 'A fruit seller records the weights in kilograms of three crates as whole numbers. Write a program in Java to accept the three weights and display the heaviest one. Use nested if statements and do not use the methods of the Math class. Sample input: 41 87 63 (the second crate is the heaviest).',
  model: prog({ src: srcLargest, stdin: '41 87 63\n', also: ['90 12 90\n'], vars: [['a, b, c', 'int', 'weights of the three crates'], ['largest', 'int', 'the greatest of the three weights']] }),
  sol: 'Compare the first two numbers; the winner of that comparison is then compared with the third number inside the matching branch. Using >= keeps the program correct when two numbers are equal.',
  scheme: S15(3, 2, 'Outer comparison and inner comparisons correct in both branches (nested if)', 2, 2),
}));

// ---- triangle type
const srcTriangle = code(
  'import java.util.Scanner;',
  '',
  'public class TriangleType {',
  '    // Classifies a triangle from the lengths of its sides',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("Enter the three sides:");',
  '        int a = sc.nextInt();',
  '        int b = sc.nextInt();',
  '        int c = sc.nextInt();',
  '        if (a + b <= c || b + c <= a || a + c <= b)',
  '            System.out.println("Not a triangle");',
  '        else if (a == b && b == c)',
  '            System.out.println("Equilateral triangle");',
  '        else if (a == b || b == c || a == c)',
  '            System.out.println("Isosceles triangle");',
  '        else',
  '            System.out.println("Scalene triangle");',
  '    }',
  '}',
);
Q('l_triangle', long({
  t: 1, d: 4, c: 'application', marks: 15,
  stem: 'A craft class cuts three sticks and wants to know what triangle they make. Write a program in Java to accept the lengths of three sides as whole numbers. First check that they can form a triangle (the sum of any two sides must be greater than the third side); if so, display whether it is equilateral (all sides equal), isosceles (exactly two sides equal) or scalene (no sides equal). Sample input: 7 7 10 (this exercises the isosceles branch).',
  model: prog({ src: srcTriangle, stdin: '7 7 10\n', also: ['3 4 9\n', '5 5 5\n'], vars: [['a, b, c', 'int', 'lengths of the three sides']] }),
  sol: 'The validity test comes first in the ladder, with the three sums joined by ||. After it, test the equilateral case before the isosceles case, because an equilateral triangle also has two equal sides.',
  scheme: S15(3, 2, 'Validity condition correct; equilateral tested before isosceles; all three types correct', 2, 2),
}));

// ---- menu: area and perimeter (switch)
const srcShape = code(
  'import java.util.Scanner;',
  '',
  'public class ShapeMenu {',
  '    // Menu-driven program for a rectangle and a circle',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("1. Area of a rectangle");',
  '        System.out.println("2. Perimeter of a rectangle");',
  '        System.out.println("3. Area of a circle");',
  '        System.out.println("Enter your choice:");',
  '        int choice = sc.nextInt();',
  '        switch (choice) {',
  '            case 1:',
  '                System.out.println("Enter length and breadth:");',
  '                double l = sc.nextDouble();',
  '                double b = sc.nextDouble();',
  '                System.out.println("Area = " + l * b);',
  '                break;',
  '            case 2:',
  '                System.out.println("Enter length and breadth:");',
  '                double length = sc.nextDouble();',
  '                double breadth = sc.nextDouble();',
  '                System.out.println("Perimeter = " + 2 * (length + breadth));',
  '                break;',
  '            case 3:',
  '                System.out.println("Enter the radius:");',
  '                double r = sc.nextDouble();',
  '                System.out.println("Area = " + 3.14 * r * r);',
  '                break;',
  '            default:',
  '                System.out.println("Invalid choice");',
  '        }',
  '    }',
  '}',
);
Q('l_shape_menu', long({
  t: 3, d: 4, c: 'application', marks: 15,
  stem: 'A tile shop wants a menu-driven program with three options: 1. area of a rectangle, 2. perimeter of a rectangle, 3. area of a circle (take pi as 3.14). Write a program in Java that displays the menu, accepts the choice and then the values needed, and displays the result; an invalid choice must display an error message. Use switch-case. Sample input: 2 9.5 4 (choice 2 with length 9.5 and breadth 4).',
  model: prog({ src: srcShape, stdin: '2 9.5 4\n', also: ['5\n'], vars: [['choice', 'int', 'option chosen from the menu'], ['l, b, length, breadth', 'double', 'length and breadth of the rectangle'], ['r', 'double', 'radius of the circle']] }),
  sol: 'Display the menu, read the choice, and use a switch with a case and a break for each option and a default case for an invalid choice. Each case reads only the values it needs. The perimeter formula needs brackets.',
  scheme: S15(3, 2, 'Switch on choice with three cases, break statements and default; formulas correct for each option', 2, 2),
}));

// ---- menu: unit converter with System.exit(0)
const srcConvert = code(
  'import java.util.Scanner;',
  '',
  'public class Converter {',
  '    // Menu-driven unit converter that ends on an invalid choice',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("1. Litres to millilitres");',
  '        System.out.println("2. Kilometres to metres");',
  '        System.out.println("3. Hours to minutes");',
  '        System.out.println("Enter your choice:");',
  '        int choice = sc.nextInt();',
  '        if (choice < 1 || choice > 3) {',
  '            System.out.println("Invalid choice. Program ends.");',
  '            System.exit(0);',
  '        }',
  '        System.out.println("Enter the value:");',
  '        double v = sc.nextDouble();',
  '        switch (choice) {',
  '            case 1:',
  '                System.out.println(v + " litres = " + v * 1000 + " millilitres");',
  '                break;',
  '            case 2:',
  '                System.out.println(v + " kilometres = " + v * 1000 + " metres");',
  '                break;',
  '            case 3:',
  '                System.out.println(v + " hours = " + v * 60 + " minutes");',
  '                break;',
  '        }',
  '    }',
  '}',
);
Q('l_unit_menu', long({
  t: 3, d: 4, c: 'application', marks: 15,
  stem: 'A school science club needs a unit converter with this menu: 1. litres to millilitres (1 litre = 1000 millilitres), 2. kilometres to metres (1 kilometre = 1000 metres), 3. hours to minutes (1 hour = 60 minutes). Write a menu-driven program in Java that accepts the choice and then the value, and displays the converted value. If the choice is not 1, 2 or 3, the program must display an error message and terminate with System.exit(0) without asking for a value. Sample input: 2 3.5 (choice 2 with the value 3.5).',
  model: prog({ src: srcConvert, stdin: '2 3.5\n', also: ['9\n'], vars: [['choice', 'int', 'option chosen from the menu'], ['v', 'double', 'value to be converted']] }),
  sol: 'Check the range of the choice first; for a bad choice print the message and call System.exit(0), so the later statements are not executed. A valid choice is handled by a switch with a case and a break for each conversion.',
  scheme: S15(3, 2, 'Invalid choice handled with a message and System.exit(0); switch with three cases and break; conversions correct', 2, 2),
}));

// ---- day planner (switch with grouped cases) - bank only
const srcDay = code(
  'import java.util.Scanner;',
  '',
  'public class DayPlanner {',
  '    // Type of school day from the day number (1 = Monday ... 7 = Sunday)',
  '    public static void main(String[] args) {',
  '        Scanner sc = new Scanner(System.in);',
  '        System.out.println("Enter the day number (1 to 7):");',
  '        int day = sc.nextInt();',
  '        switch (day) {',
  '            case 1:',
  '            case 2:',
  '            case 3:',
  '            case 4:',
  '            case 5:',
  '                System.out.println("Full working day");',
  '                break;',
  '            case 6:',
  '                System.out.println("Half working day");',
  '                break;',
  '            case 7:',
  '                System.out.println("Holiday");',
  '                break;',
  '            default:',
  '                System.out.println("Invalid day number");',
  '        }',
  '    }',
  '}',
);
Q('l_day', long({
  t: 2, d: 3, c: 'application', marks: 15,
  stem: 'The timetable office of an imagined school marks day numbers 1 to 5 (Monday to Friday) as a full working day, day 6 as a half working day and day 7 as a holiday. Write a program in Java to accept a day number and display the type of day; any other number must display Invalid day number. Use switch-case and group the cases that share a message. Sample input: 4 (this exercises the grouped cases).',
  model: prog({ src: srcDay, stdin: '4\n', also: ['6\n', '9\n'], vars: [['day', 'int', 'day number entered by the user']] }),
  sol: 'Write the labels 1 to 5 one below the other with the statement only under the last of them, so that control falls through from each to the shared message; then break. Cases 6 and 7 and default follow.',
  scheme: S15(3, 2, 'Grouped labels 1 to 5 share one statement with a break; cases 6 and 7; default for other numbers', 2, 2),
}));
