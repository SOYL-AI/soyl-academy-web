// ICSE 10 Computer Applications, ch07: the 15-mark programs. Each is compiled and run with its sample input.
import { Q, long } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { prog, J } from './q_util.mjs';

// ---- number utility class with static methods, called from a menu (t02, t04)
export const srcNumberMenu = J`
import java.util.Scanner;

class NumTools {
    static int digitSum(int n) {
        int s = 0;
        while (n > 0) {
            s = s + n % 10;
            n = n / 10;
        }
        return s;
    }
    static boolean isPalindrome(int n) {
        int rev = 0, t = n;
        while (t > 0) {
            rev = rev * 10 + t % 10;
            t = t / 10;
        }
        return rev == n;
    }
}

public class NumberMenu {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.println("1. Sum of digits");
        System.out.println("2. Palindrome check");
        int choice = sc.nextInt();
        int n = sc.nextInt();
        switch (choice) {
            case 1:
                System.out.println("Digit sum = " + NumTools.digitSum(n));
                break;
            case 2:
                if (NumTools.isPalindrome(n))
                    System.out.println(n + " is a palindrome");
                else
                    System.out.println(n + " is not a palindrome");
                break;
            default:
                System.out.println("Invalid choice");
        }
    }
}`;
Q('l_number_menu', long({
  t: [2, 4], d: 4, c: 'application', marks: 15,
  stem: 'The maths club of an imagined school, Gyan Vihar Public School, wants a menu-driven program on whole numbers. Write a class NumTools with two static methods: int digitSum(int n), which returns the sum of the digits of n, and boolean isPalindrome(int n), which returns true if n reads the same when its digits are reversed. Write a class NumberMenu whose main method displays the menu 1. Sum of digits and 2. Palindrome check, accepts the choice and a positive number, calls the matching method of NumTools with the class name and displays the result. Display an error message for any other choice. Sample input: 2 then 1331 (a palindrome).',
  model: prog({ src: srcNumberMenu, stdin: '2 1331\n', also: ['1 4821\n', '2 1342\n'], vars: [['n (in NumTools)', 'int', 'formal parameter: the number whose digits are processed'], ['s', 'int', 'running sum of the digits'], ['rev, t', 'int', 'reversed number and a working copy of n'], ['sc', 'Scanner', 'reads the choice and the number'], ['choice', 'int', 'menu choice read from the user'], ['n (in main)', 'int', 'actual parameter: the number read from the user']] }),
  sol: 'The two methods are static, so main calls them as NumTools.digitSum(n) and NumTools.isPalindrome(n) without creating an object. digitSum needs the last digit (n % 10) and the rest of the number (n / 10) inside a loop; isPalindrome builds the reversed number in a copy and compares it with the original.',
  scheme: [['Class headers, main method and braces correct; Scanner imported and used', 3], ['digitSum: loop with n % 10 and n / 10, sum returned', 3], ['isPalindrome: reversal logic in a copy, boolean returned', 3], ['switch (or ladder) calling the methods with the class name, with default', 3], ['Output messages and variable description or comments', 3]],
}));

// ---- class with data members and member methods invoked through an object (t04, t05)
export const srcTea = J`
import java.util.Scanner;

public class TeaStall {
    int cups;
    double rate;

    void accept(int c, double r) {
        cups = c;
        rate = r;
    }
    void restock(int n) {
        cups = cups + n;
    }
    boolean sell(int n) {
        if (n <= cups) {
            cups = cups - n;
            return true;
        }
        return false;
    }
    double worth() {
        return cups * rate;
    }
    void show() {
        System.out.println("Cups left = " + cups + ", worth = " + worth());
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        TeaStall t = new TeaStall();
        t.accept(sc.nextInt(), sc.nextDouble());
        int first = sc.nextInt();
        int fill = sc.nextInt();
        int second = sc.nextInt();
        if (t.sell(first))
            System.out.println(first + " cups sold");
        else
            System.out.println("Not enough cups for " + first);
        t.restock(fill);
        if (t.sell(second))
            System.out.println(second + " cups sold");
        else
            System.out.println("Not enough cups for " + second);
        t.show();
    }
}`;
Q('l_tea_stall', long({
  t: [4, 5], d: 4, c: 'application', marks: 15,
  stem: 'A chai stall of an imagined railway station keeps its stock in a class TeaStall with the data members int cups (cups in stock) and double rate (price of a cup). Write the member methods: void accept(int c, double r) to store the values; void restock(int n) to add n cups; boolean sell(int n), which reduces the stock by n and returns true if the stock is enough and otherwise changes nothing and returns false; double worth(), which returns the value of the stock; and void show(), which displays the cups left and their worth. In main, read the opening stock and rate, then the cups to sell, the cups to restock and a second number of cups to sell. Create an object, call the methods through it and report whether each sale succeeded. Sample input: 40 12.5 15 20 70.',
  model: prog({ src: srcTea, stdin: '40 12.5 15 20 70\n', also: ['30 10.0 5 0 25\n'], vars: [['cups', 'int', 'data member: cups in stock'], ['rate', 'double', 'data member: price of one cup'], ['c, r, n', 'int, double, int', 'formal parameters of the methods'], ['t', 'TeaStall', 'object created in main'], ['first, fill, second', 'int', 'cups to sell, cups to restock, cups to sell again']] }),
  sol: 'cups and rate are data members, so every non-static method can use them directly, and main reaches the methods through the object t. restock and sell change cups, so they are impure; worth only returns a value computed from the data members. sell must check the stock before reducing it and return false without any change when the stock is not enough.',
  scheme: [['Class header, data members and braces correct', 2], ['accept and restock written correctly', 3], ['sell: condition, reduction of the stock and boolean return on both paths', 4], ['worth and show written correctly', 2], ['main: Scanner, object creation and every call made through the object', 3], ['Variable description or comments', 1]],
}));

// ---- overloaded volume methods (t06)
export const srcPacks = J`
import java.util.Scanner;

public class Packs {
    static int volume(int side) {
        return side * side * side;
    }
    static int volume(int l, int b, int h) {
        return l * b * h;
    }
    static double volume(double r, double h) {
        return 3.14 * r * r * h;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int side = sc.nextInt();
        int l = sc.nextInt(), b = sc.nextInt(), h = sc.nextInt();
        double r = sc.nextDouble(), ht = sc.nextDouble();
        System.out.println("Cube volume = " + volume(side));
        System.out.println("Cuboid volume = " + volume(l, b, h));
        System.out.println("Cylinder volume = " + volume(r, ht));
    }
}`;
Q('l_volume', long({
  t: 6, d: 3, c: 'application', marks: 15,
  stem: 'An imagined packaging unit, SwiftPack, makes cubical boxes, cuboid cartons and cylindrical tins. Write a class Packs with three overloaded static methods named volume: volume(int side) for a cube, volume(int l, int b, int h) for a cuboid and volume(double r, double h) for a cylinder (use 3.14 for pi). Each method returns the volume. In main, accept the side of a cube, the three edges of a cuboid and the radius and height of a cylinder, call the three methods and display the three volumes. Sample input: 6, then 8 5 3, then 5.0 4.0.',
  model: prog({ src: srcPacks, stdin: '6\n8 5 3\n5.0 4.0\n', vars: [['side', 'int', 'edge of the cube'], ['l, b, h', 'int', 'length, breadth and height of the cuboid'], ['r, ht', 'double', 'radius and height of the cylinder']] }),
  sol: 'The three methods share the name volume and differ in the number or the types of their parameters, so the compiler picks the version from the arguments: one int, three ints or two doubles. The cube and cuboid versions return an int and the cylinder version returns a double, because of the factor 3.14.',
  scheme: [['Class, main, Scanner imported and used', 3], ['Three methods with the name volume and different parameter lists (valid overloading)', 4], ['Correct formulas and correct return types', 3], ['Three calls with the right arguments and output messages', 3], ['Variable description or comments', 2]],
}));

// ---- gcd with call by value (t02, t03)
export const srcGcd = J`
import java.util.Scanner;

public class GroupSize {
    static int gcd(int a, int b) {
        while (b != 0) {
            int r = a % b;
            a = b;
            b = r;
        }
        return a;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int x = sc.nextInt();
        int y = sc.nextInt();
        int g = gcd(x, y);
        System.out.println("Numbers = " + x + " and " + y);
        System.out.println("GCD = " + g);
        System.out.println("LCM = " + (x * y / g));
    }
}`;
Q('l_gcd', long({
  t: [2, 3], d: 4, c: 'application', marks: 15,
  stem: 'A teacher has two bundles of notebooks and wants to make equal groups from each bundle with no notebook left over. Write a class GroupSize with a static method int gcd(int a, int b) that finds the greatest common divisor by Euclid\'s method (repeat r = a % b, a = b, b = r until b becomes 0, then a is the answer). In main, accept the two numbers x and y, call gcd(x, y), and display the two numbers, their GCD and their LCM (x * y / GCD). The display of the two numbers after the call must show that the method has not changed the variables of main. Sample input: 84 36.',
  model: prog({ src: srcGcd, stdin: '84 36\n', also: ['17 5\n'], vars: [['a, b', 'int', 'formal parameters of gcd: copies of x and y, changed by the loop'], ['r', 'int', 'remainder of a divided by b'], ['x, y', 'int', 'actual parameters: the numbers read in main'], ['g', 'int', 'value returned by gcd']] }),
  sol: 'gcd works on its own copies a and b, which the loop changes until b becomes 0, so it returns the last value of a. Because the parameters are passed by value, x and y of main are not changed, which the first output line shows. The LCM follows from x * y divided by the GCD.',
  scheme: [['Class, main, Scanner imported and used', 3], ['gcd header: static, int return type, two int parameters', 2], ['Euclid loop correct', 4], ['Return of the result and call from main; LCM computed from the returned value', 3], ['Original numbers displayed after the call; output messages', 2], ['Variable description or comments', 1]],
}));

// ---- calendar utility: pure methods (t02, t05)
export const srcCalendar = J`
import java.util.Scanner;

public class CalendarCheck {
    // pure: the result depends only on y
    static boolean isLeap(int y) {
        return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
    }
    // pure: the result depends only on m and y
    static int daysIn(int m, int y) {
        switch (m) {
            case 2:
                if (isLeap(y))
                    return 29;
                return 28;
            case 4: case 6: case 9: case 11:
                return 30;
            default:
                return 31;
        }
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        int y = sc.nextInt();
        if (m < 1 || m > 12)
            System.out.println("Invalid month");
        else {
            System.out.println("Days in month " + m + " of " + y + " = " + daysIn(m, y));
            System.out.println(y + " leap year: " + isLeap(y));
        }
    }
}`;
Q('l_calendar', long({
  t: [2, 5], d: 4, c: 'application', marks: 15,
  stem: 'An imagined school diary printer needs two pure methods in a class CalendarCheck: static boolean isLeap(int y), which returns true for a leap year (divisible by 4 but not by 100, or divisible by 400), and static int daysIn(int m, int y), which returns the number of days of month m of year y (28 or 29 for month 2, 30 for months 4, 6, 9 and 11, otherwise 31) and calls isLeap. Both methods must return a value on every path. In main, accept the month and the year, display an error message if the month is not between 1 and 12, and otherwise display the number of days and whether the year is a leap year. Write a comment above each method saying that it is pure. Sample input: 2 2028.',
  model: prog({ src: srcCalendar, stdin: '2 2028\n', also: ['2 2100\n', '9 2027\n', '13 2025\n'], vars: [['y', 'int', 'year (formal parameter of isLeap and daysIn, actual parameter in main)'], ['m', 'int', 'month number']] }),
  sol: 'isLeap is one boolean expression joining the divisibility tests with && and ||. daysIn uses a switch whose every branch, including default, returns, so there is no missing return. Both methods change no data and depend only on their parameters, so they are pure.',
  scheme: [['Class, main, Scanner imported and used', 3], ['isLeap: correct header and condition', 3], ['daysIn: correct header; a value returned on every path; call to isLeap', 4], ['Validation of the month and calls from main with output', 3], ['Comments on purity or variable description', 2]],
}));

// ---- overloaded fare methods with different counts and types (t06)
export const srcFare = J`
import java.util.Scanner;

public class FareDesk {
    static int fare(int km) {
        return km * 2;
    }
    static int fare(int km, int seats) {
        return km * 2 * seats;
    }
    static double fare(int km, char coach) {
        if (coach == 'A')
            return km * 2 * 1.5;
        return km * 2;
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int km = sc.nextInt();
        int seats = sc.nextInt();
        char coach = sc.next().charAt(0);
        System.out.println("One seat = " + fare(km));
        System.out.println("Group of " + seats + " = " + fare(km, seats));
        System.out.println("Coach " + coach + " = " + fare(km, coach));
    }
}`;
Q('l_fare', long({
  t: 6, d: 4, c: 'application', marks: 15,
  stem: 'A bus depot of an imagined hill town charges Rs 2 per km for one seat. Write a class FareDesk with three overloaded static methods named fare: fare(int km) returns the fare of one seat; fare(int km, int seats) returns the fare for that number of seats; fare(int km, char coach) returns a double, which is 1.5 times the one-seat fare for coach A (air-conditioned) and the ordinary one-seat fare for any other coach. In main, accept the distance, the number of seats and the coach letter, and display the three fares. Sample input: 40 3 A.',
  model: prog({ src: srcFare, stdin: '40 3 A\n', also: ['25 4 B\n'], vars: [['km', 'int', 'distance in kilometres'], ['seats', 'int', 'number of seats'], ['coach', 'char', 'letter of the coach, read with next().charAt(0)']] }),
  sol: 'The three methods have the same name and different parameter lists: one int, two ints, and an int with a char. The call is matched by the number and types of its arguments. The coach letter is read with next().charAt(0), because Scanner has no method for a char.',
  scheme: [['Class, main, Scanner imported and used; char read correctly', 3], ['Three methods named fare with different parameter lists', 4], ['Correct calculations, including the coach condition, and return types', 3], ['Three calls and output messages', 3], ['Variable description or comments', 2]],
}));

// ---- methods calling methods: combinations (t02)
export const srcWays = J`
import java.util.Scanner;

public class TeamPicker {
    static long fact(int n) {
        long f = 1;
        for (int i = 2; i <= n; i++)
            f = f * i;
        return f;
    }
    static long ways(int n, int r) {
        return fact(n) / (fact(r) * fact(n - r));
    }
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int r = sc.nextInt();
        if (r < 0 || r > n)
            System.out.println("Not possible");
        else
            System.out.println("Ways to choose " + r + " out of " + n + " = " + ways(n, r));
    }
}`;
Q('l_ways', long({
  t: 2, d: 4, c: 'application', marks: 15,
  stem: 'A class teacher must choose a quiz team of r students out of n students. The number of ways is n! / (r! * (n - r)!). Write a class TeamPicker with a static method long fact(int n), which returns the factorial of n, and a static method long ways(int n, int r), which calls fact to return the number of ways. In main, accept n and r, display the message Not possible if r is negative or greater than n, and otherwise display the number of ways. Sample input: 8 3.',
  model: prog({ src: srcWays, stdin: '8 3\n', also: ['5 6\n', '20 10\n'], vars: [['n', 'int', 'number of students (formal parameter of fact and ways)'], ['r', 'int', 'size of the team'], ['f', 'long', 'running product in fact'], ['i', 'int', 'loop counter of fact']] }),
  sol: 'fact multiplies the numbers from 2 to n in a loop and returns the product; a long is used because factorials grow fast. ways calls fact three times, as the expression of the formula, and returns the quotient. main validates r before calling ways.',
  scheme: [['Class, main, Scanner imported and used', 3], ['fact: header with long return type, loop and return', 3], ['ways: calls to fact in the formula, correct return', 4], ['Validation of r and the call from main; output messages', 3], ['Variable description or comments', 2]],
}));
