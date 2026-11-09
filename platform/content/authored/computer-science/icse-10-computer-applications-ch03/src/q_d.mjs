// ICSE 10 Computer Applications, ch03: the 15-mark programs (each reads its data with Scanner and is run with a sample input).
import { Q, long } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, progAnswer } from './q_util.mjs';

const S15 = (a, b, c, d, e) => [
  ['Class header, main method and braces correct', a],
  ['Scanner imported and used to read the values', b],
  [c, 6],
  ['Output statements with clear messages', d],
  ['Variable description or comments', e],
];
const head = (cls, comment) => ['import java.util.Scanner;', '', `public class ${cls} {`, `    // ${comment}`, '    public static void main(String[] args) {', '        Scanner sc = new Scanner(System.in);'];
const tail = ['    }', '}'];

// ---- student card: four kinds of input (t01)
const srcCard = code(...head('StudentCard', 'Reads and displays the details of one student'),
  '        System.out.println("Enter name, age, percentage and grade:");',
  '        String name = sc.next();',
  '        int age = sc.nextInt();',
  '        double pct = sc.nextDouble();',
  '        char grade = sc.next().charAt(0);',
  '        System.out.println("Name: " + name);',
  '        System.out.println("Age: " + age + " years");',
  '        System.out.println("Percentage: " + pct);',
  '        System.out.println("Grade: " + grade);',
  ...tail);
Q('l_card', long({
  t: 1, d: 2, c: 'application', marks: 15,
  stem: 'Lakeview Public School keeps a record card for each student. Write a program in Java to accept the first name (one word), the age (whole number), the percentage (real number) and the grade letter of a student, using the Scanner class, and display each of them on a separate line with a label. Sample input: Meera 15 88.5 A',
  model: progAnswer({ src: srcCard, stdin: 'Meera 15 88.5 A\n', vars: [['name', 'String', 'first name, read with next()'], ['age', 'int', 'age in years, read with nextInt()'], ['pct', 'double', 'percentage, read with nextDouble()'], ['grade', 'char', 'grade letter, read with next().charAt(0)']] }),
  sol: 'Import java.util.Scanner and create the object. Use next() for the word, nextInt() for the age, nextDouble() for the percentage and next().charAt(0) for the character, each stored in a variable of the matching type.',
  scheme: S15(3, 2, 'Four values read with the correct methods into variables of matching data types', 2, 2),
}));

// ---- quadratic equation (t03)
const srcQuad = code(...head('Quadratic', 'Roots of a quadratic equation whose roots are real'),
  '        System.out.println("Enter the coefficients a, b and c:");',
  '        double a = sc.nextDouble();',
  '        double b = sc.nextDouble();',
  '        double c = sc.nextDouble();',
  '        double d = b * b - 4 * a * c;          // discriminant',
  '        double root1 = (-b + Math.sqrt(d)) / (2 * a);',
  '        double root2 = (-b - Math.sqrt(d)) / (2 * a);',
  '        System.out.println("Discriminant = " + d);',
  '        System.out.println("Root 1 = " + root1);',
  '        System.out.println("Root 2 = " + root2);',
  ...tail);
Q('l_quad', long({
  t: [1, 3], d: 3, c: 'application', marks: 15,
  stem: 'A physics club models the height of a thrown ball with a quadratic equation a x squared + b x + c = 0 whose roots are real. Write a program in Java to accept the coefficients a, b and c, and display the discriminant and the two roots, root 1 = (-b + sqrt(d)) / 2a and root 2 = (-b - sqrt(d)) / 2a, where d = b squared - 4ac. Use Math.sqrt(). Sample input: 2 -7 3',
  model: progAnswer({ src: srcQuad, stdin: '2 -7 3\n', vars: [['a, b, c', 'double', 'coefficients of the equation'], ['d', 'double', 'discriminant b * b - 4 * a * c'], ['root1', 'double', 'root with the plus sign'], ['root2', 'double', 'root with the minus sign']] }),
  sol: 'Read the three coefficients with nextDouble(). Find the discriminant first. In each root the whole numerator and the whole denominator need brackets: (-b + Math.sqrt(d)) / (2 * a).',
  scheme: S15(3, 2, 'Discriminant and both roots correct, with brackets and Math.sqrt()', 2, 2),
}));

// ---- distance and midpoint (t03)
const srcDist = code(...head('Drone', 'Distance and midpoint between two points of a field grid'),
  '        System.out.println("Enter x1, y1, x2 and y2:");',
  '        double x1 = sc.nextDouble();',
  '        double y1 = sc.nextDouble();',
  '        double x2 = sc.nextDouble();',
  '        double y2 = sc.nextDouble();',
  '        double dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));',
  '        double mx = (x1 + x2) / 2;',
  '        double my = (y1 + y2) / 2;',
  '        System.out.println("Distance = " + dist);',
  '        System.out.println("Midpoint = (" + mx + ", " + my + ")");',
  ...tail);
Q('l_dist', long({
  t: 3, d: 3, c: 'application', marks: 15,
  stem: 'A delivery drone flies in a straight line from the point (x1, y1) to the point (x2, y2) on the grid map of a farm. Write a program in Java to accept the four coordinates and display the distance flown, sqrt((x2 - x1) squared + (y2 - y1) squared), and the coordinates of the midpoint of the flight. Use Math.sqrt() and Math.pow(). Sample input: -2 1 3 13',
  model: progAnswer({ src: srcDist, stdin: '-2 1 3 13\n', vars: [['x1, y1', 'double', 'starting point'], ['x2, y2', 'double', 'end point'], ['dist', 'double', 'distance between the points'], ['mx, my', 'double', 'coordinates of the midpoint']] }),
  sol: 'The distance uses the sum of the squares of the two differences inside Math.sqrt(). The midpoint is the average of the x values and of the y values; the sum needs brackets before it is halved.',
  scheme: S15(3, 2, 'Distance formula with Math.sqrt() and Math.pow(), and correct midpoint', 2, 2),
}));

// ---- simple interest for three years, without loops (t03 expressions, t01 input)
const srcSi = code(...head('SimpleInterest', 'Simple interest for 1, 2 and 3 years'),
  '        System.out.println("Enter the principal and the rate per cent per year:");',
  '        double p = sc.nextDouble();',
  '        double r = sc.nextDouble();',
  '        System.out.println("Years   Interest");',
  '        System.out.println(1 + "       " + p * r * 1 / 100);',
  '        System.out.println(2 + "       " + p * r * 2 / 100);',
  '        System.out.println(3 + "       " + p * r * 3 / 100);',
  ...tail);
Q('l_si_table', long({
  t: [1, 3], d: 2, c: 'application', marks: 15,
  stem: 'A village cooperative society shows its members what a fixed deposit earns. Write a program in Java to accept a principal and a rate of interest per cent per year, and display a table with the simple interest for 1, 2 and 3 years, using the formula p * r * t / 100 (no loop is needed). Sample input: 12000 7.5',
  model: progAnswer({ src: srcSi, stdin: '12000 7.5\n', vars: [['p', 'double', 'principal'], ['r', 'double', 'rate of interest per cent per year']] }),
  sol: 'Read p and r with nextDouble(). The formula is written once for each year with t = 1, 2 and 3; the heading line makes the table readable.',
  scheme: S15(3, 2, 'Three correct calculations of simple interest for 1, 2 and 3 years', 2, 2),
}));

// ---- compound interest with Math.pow and Math.round (t03)
const srcCi = code(...head('CompoundInterest', 'Compound interest, rounded to two decimal places'),
  '        System.out.println("Enter principal, rate per cent and time in years:");',
  '        double p = sc.nextDouble();',
  '        double r = sc.nextDouble();',
  '        int t = sc.nextInt();',
  '        double amount = p * Math.pow(1 + r / 100, t);',
  '        double ci = amount - p;',
  '        double shown = Math.round(ci * 100) / 100.0;   // two decimal places',
  '        System.out.println("Compound interest = " + shown);',
  ...tail);
Q('l_ci', long({
  t: 3, d: 4, c: 'application', marks: 15,
  stem: 'A teacher wants to show how an education deposit grows when the interest is added to the principal every year. Write a program in Java to accept the principal, the rate of interest per cent per year and the time in years, and display the compound interest correct to two decimal places. Use Math.pow() for A = P (1 + R / 100) raised to the power T and Math.round() for the rounding. Sample input: 25000 8 3',
  model: progAnswer({ src: srcCi, stdin: '25000 8 3\n', vars: [['p', 'double', 'principal'], ['r', 'double', 'rate per cent per year'], ['t', 'int', 'time in years'], ['amount', 'double', 'principal plus interest'], ['ci', 'double', 'compound interest before rounding'], ['shown', 'double', 'compound interest rounded to two decimals']] }),
  sol: 'The amount is p * Math.pow(1 + r / 100, t) and the interest is the amount minus the principal. To keep two decimals, multiply by 100, apply Math.round() and divide by 100.0 (a double), so that the division is not an integer division.',
  scheme: S15(3, 2, 'Amount with Math.pow(), interest, and rounding with Math.round(x * 100) / 100.0', 2, 2),
}));

// ---- right triangle (t03)
const srcTri = code(...head('RightTriangle', 'Hypotenuse, perimeter and area of a right-angled triangle'),
  '        System.out.println("Enter the two perpendicular sides:");',
  '        double a = sc.nextDouble();',
  '        double b = sc.nextDouble();',
  '        double h = Math.sqrt(a * a + b * b);',
  '        double perimeter = a + b + h;',
  '        double area = 0.5 * a * b;',
  '        System.out.println("Hypotenuse = " + h);',
  '        System.out.println("Perimeter = " + perimeter);',
  '        System.out.println("Area = " + area);',
  ...tail);
Q('l_tri', long({
  t: 3, d: 2, c: 'application', marks: 15,
  stem: 'A carpenter cuts a triangular shelf with a right angle between two sides. Write a program in Java to accept the lengths of the two perpendicular sides in cm and display the hypotenuse, the perimeter and the area of the shelf. Use Math.sqrt(). Sample input: 9 12',
  model: progAnswer({ src: srcTri, stdin: '9 12\n', vars: [['a, b', 'double', 'the perpendicular sides'], ['h', 'double', 'hypotenuse'], ['perimeter', 'double', 'sum of the three sides'], ['area', 'double', 'half of a times b']] }),
  sol: 'The hypotenuse is Math.sqrt(a * a + b * b). The perimeter adds all three sides and the area is half the product of the perpendicular sides.',
  scheme: S15(3, 2, 'Hypotenuse, perimeter and area all correct', 2, 2),
}));

// ---- mixed rounding (t03)
const srcRound = code(...head('Rounding', 'ceil, floor and round of a number and of its negative'),
  '        System.out.println("Enter a real number:");',
  '        double x = sc.nextDouble();',
  '        double y = -x;',
  '        System.out.println("Number   ceil   floor   round");',
  '        System.out.println(x + "   " + Math.ceil(x) + "   " + Math.floor(x) + "   " + Math.round(x));',
  '        System.out.println(y + "   " + Math.ceil(y) + "   " + Math.floor(y) + "   " + Math.round(y));',
  '        System.out.println("Absolute value of y = " + Math.abs(y));',
  ...tail);
Q('l_round', long({
  t: 3, d: 3, c: 'application', marks: 15,
  stem: 'A maths teacher wants a demonstration for her class. Write a program in Java to accept a real number and display, for the number and for its negative, the values returned by Math.ceil(), Math.floor() and Math.round() in a table with a heading line, followed by the absolute value of the negative number. Sample input: 6.5',
  model: progAnswer({ src: srcRound, stdin: '6.5\n', vars: [['x', 'double', 'the number typed by the user'], ['y', 'double', 'the negative of x']] }),
  sol: 'Read x with nextDouble() and store -x in y. Call the three rounding methods for each; note the halves: Math.round(6.5) goes up to 7 and Math.round(-6.5) goes up to -6. Math.abs() removes the sign.',
  scheme: S15(3, 2, 'ceil, floor and round used correctly for both numbers, and abs', 2, 2),
}));

// ---- cube from its volume (t03)
const srcCube = code(...head('CubeBox', 'Side and surface area of a cube from its volume'),
  '        System.out.println("Enter the volume of the cube in cubic cm:");',
  '        double vol = sc.nextDouble();',
  '        double side = Math.cbrt(vol);',
  '        double face = Math.pow(side, 2);',
  '        double surface = 6 * face;',
  '        System.out.println("Side = " + side);',
  '        System.out.println("Area of one face = " + face);',
  '        System.out.println("Total surface area = " + surface);',
  '        System.out.println("Volume check = " + Math.pow(side, 3));',
  ...tail);
Q('l_cube', long({
  t: 3, d: 3, c: 'application', marks: 15,
  stem: 'A toy factory makes cube-shaped boxes and knows the volume of each box. Write a program in Java to accept the volume in cubic cm and display the length of a side (use Math.cbrt()), the area of one face, the total surface area and, as a check, the side raised to the power 3. Sample input: 343',
  model: progAnswer({ src: srcCube, stdin: '343\n', vars: [['vol', 'double', 'volume of the cube'], ['side', 'double', 'edge length, cube root of the volume'], ['face', 'double', 'area of one face'], ['surface', 'double', 'total surface area, six faces']] }),
  sol: 'The side is the cube root of the volume. One face is side squared (Math.pow(side, 2)) and there are six faces; raising the side to the power 3 must give the volume back.',
  scheme: S15(3, 2, 'Side with Math.cbrt(), face area, surface area and the check', 2, 2),
}));
