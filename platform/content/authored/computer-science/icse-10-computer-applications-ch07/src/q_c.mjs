// ICSE 10 Computer Applications, ch07: topics t05 (pure and impure methods) and t06 (method overloading).
import { Q, mcq, ar, fb, match, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { F, ic, out, oline, distinct, mustFail, mustCompile, J, one } from './q_util.mjs';
import * as P from './progs.mjs';

// ================================================================ t05 pure and impure methods
export const pKiosk = J`
public class Kiosk {
    int price = 25;
    int cost(int n) {
        return price * n;
    }
    void revise(int newPrice) {
        price = newPrice;
    }
    public static void main(String[] args) {
        Kiosk k = new Kiosk();
        int first = k.cost(4);
        k.revise(30);
        int second = k.cost(4);
        System.out.println(first + " " + second);
    }
}`;
export const pNotebook = J`
public class Notebook {
    int pages = 100;
    int pagesFor(int days, int perDay) {
        return days * perDay;
    }
    int tear(int n) {
        pages = pages - n;
        return pages;
    }
    public static void main(String[] args) {
        Notebook nb = new Notebook();
        System.out.println(nb.pagesFor(3, 20) + " " + nb.pagesFor(3, 20));
        System.out.println(nb.tear(10) + " " + nb.tear(10));
    }
}`;
Q('m_pure_def', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Which statement describes a pure method?',
  opts: distinct(['A method that returns a result without changing the state of the object or of its arguments', 'A method that has no parameters', 'A method whose return type is void', 'A method that is declared static']),
  sol: 'A pure method only works out and returns a result. It does not change the data members of the object or anything passed to it, so calling it any number of times leaves everything as it was. Having no parameters, being void or being static says nothing about this.',
}));
Q('m_classify', mcq({
  t: 5, d: 3, c: 'application',
  stem: `A class has these three methods.\n\n${F(J`
// A
static double area(double r) {
    return 3.14 * r * r;
}
// B
void deposit(int amt) {
    balance = balance + amt;
}
// C
static boolean isEven(int n) {
    return n % 2 == 0;
}`)}\n\nHere balance is a data member of the class. Which classification is correct?`,
  opts: distinct(['A is pure, B is impure, C is pure', 'A is impure, B is pure, C is pure', 'A is pure, B is pure, C is impure', 'All three methods are impure']),
  sol: 'A and C only compute a value from their parameters and change nothing, so they are pure. B adds to the data member balance, which changes the state of the object, so it is impure. Being void is not the test; the change of state is.',
}));
Q('m_impure_ex', mcq({
  t: 5, d: 3, c: 'application',
  stem: `The class below has two non-static methods. Which method is impure, and why?\n\n${F(pNotebook)}`,
  opts: distinct([`tear, because it changes the data member pages`, 'pagesFor, because it has two parameters', 'pagesFor, because it returns an int', 'tear, because it has a return type']),
  sol: `The call pagesFor(3, 20) gives the same result every time and leaves the object alone, so it is pure. The method tear reduces pages, so repeated calls give different results: the program prints "${out(pNotebook).split('\n').join(' / ')}". Having parameters or a return type does not decide purity.`,
}));
Q('m_pure_why', mcq({
  t: 5, d: 4, c: 'understanding',
  stem: 'A method power(int base, int exp) only returns base raised to the power exp and touches no data member. Which property follows?',
  opts: distinct(['Every call with the same arguments returns the same value and the object stays unchanged', 'It must be declared static', 'Its return type must be void', 'It cannot be called more than once for the same object']),
  sol: 'A pure method depends only on its arguments and changes nothing, so its result is repeatable and the object is left as it was. It need not be static (it works as a non-static method too), it returns the power so it is not void, and it may be called any number of times.',
}));
Q('ar_pure_same', ar({
  t: 5, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'A method that only returns n * n for its int parameter n is a pure method.',
  r: 'A pure method may not have any parameters.',
  sol: `The call square(6) of the Rates program gave "${out(P.pRates).split('\n')[0]}": the same result both times and no state changed, so (A) is true. (R) is false: a pure method usually has parameters, because the result is worked out from them.`,
}));
Q('co_pure_twice', co({
  pre: 'The class Rates has a pure method and an impure method. Write the exact output of the program.',
  t: 5, d: 4, c: 'analysis',
  code: P.pRates,
  sol: 'square(6) depends only on its argument, so both calls give 36. issue(10) lowers the data member stock, which starts at 50: the first call leaves 40 and the second leaves 30. The expression is evaluated left to right.',
}));
Q('co_kiosk', co({
  pre: 'A kiosk revises its price between two calls of the same method. Write the exact output.',
  t: 5, d: 3, c: 'application',
  code: pKiosk,
  sol: 'cost(4) multiplies the data member price by 4. At first price is 25, giving 100. The method revise changes the data member to 30, so the same call cost(4) now gives 120. The method revise is impure.',
}));
Q('s_pure_impure', short({
  t: 5, d: 3, c: 'understanding', marks: 2, wl: [30, 100],
  stem: 'Distinguish between a pure method and an impure method. Give one example of each.',
  model: `A **pure method** gives back a result and leaves the object and its arguments as they were; equal arguments give equal results. An **impure method** alters the state of the object, for example a data member.\n\nExample from a notebook class: ${ic('int pagesFor(int days, int perDay) { return days * perDay; }')} is pure. ${ic('int tear(int n) { pages = pages - n; return pages; }')} is impure, because it changes the data member pages. Two calls of the first give the same value; two calls ${ic('tear(10)')} give ${ic(out(pNotebook).split('\n')[1].split(' ').join(' and '))}.`,
  sol: 'One mark for the two definitions and one mark for an example of each.',
  scheme: [['Pure: no change of state, same result for same arguments; impure: changes state', 1], ['One correct example of each kind', 1]],
}));
Q('s_classify', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: [20, 80],
  stem: 'Classify each method as pure or impure and give a reason.\n\n(a) ' + ic('int perimeter(int a, int b) { return 2 * (a + b); }') + '\n\n(b) ' + ic('void restock(int n) { stock = stock + n; }') + '\n\nHere stock is a data member of the class.',
  model: '(a) **Pure.** It only works out and returns a value from its parameters; it changes no data member and gives the same result for the same a and b.\n\n(b) **Impure.** It changes the data member stock, so the state of the object is different after the call.',
  sol: 'One mark for each method with its reason.',
  scheme: [['(a) pure with a reason', 1], ['(b) impure with a reason (changes a data member)', 1]],
}));

// ================================================================ t06 method overloading
Q('m_overload_def', mcq({
  t: 6, d: 1, c: 'recall',
  stem: 'What is method overloading?',
  opts: distinct(['Writing two or more methods with the same name in one class but with different parameter lists', 'Writing two methods with the same name and the same parameters but different return types', 'Calling a method from inside its own body', 'Giving one method more parameters than the program needs']),
  sol: 'Overloaded methods share a name but differ in the number, the types or the order of their parameters, so the compiler can tell which one a call means. Two methods that differ only in return type are not overloaded; that is an error.',
}));
Q('m_overload_cond', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'Which pair of methods, written in the same class, is a valid example of method overloading?',
  opts: distinct([ic('void show(int a)') + ' and ' + ic('void show(int a, int b)'), ic('int total(int a)') + ' and ' + ic('double total(int b)'), ic('void show(int a)') + ' and ' + ic('int show(int a)'), ic('void show(int a)') + ' and ' + ic('void display(int a)')]),
  sol: 'show(int a) and show(int a, int b) have the same name and a different number of parameters. The two total methods have the same parameter list (one int); only the return type and the parameter name differ. void show(int a) and int show(int a) differ only in return type. show and display have different names, so they are not overloading at all.',
}));
Q('m_which_version', mcq({
  t: 6, d: 3, c: 'application',
  stem: `The class ShowDemo has the two methods shown below.\n\n${F(J`
static void show(int n) {
    System.out.println("int version: " + n);
}
static void show(double d) {
    System.out.println("double version: " + d);
}`)}\n\nWhich version is executed by the call ${ic("show('B');")}?`,
  opts: distinct(['The int version, because the char is promoted to int', 'The double version, because a char is a number with a decimal part', 'Neither: a compile-time error occurs because there is no char version', 'Both versions run, one after the other']),
  sol: `A char is promoted to the nearest wider type that has a matching version. The nearest is int, so the call runs the int version and the code of B, 66, is used: the real output is "${out(P.pShow("show('B');"))}". The double version would be chosen only if no int version existed.`,
}));
const errRetOnly = mustFail(P.pRetOnly);
Q('m_overload_ret', mcq({
  t: 6, d: 4, c: 'analysis',
  stem: 'A class already contains the method ' + ic('int area(int s)') + '. Which declaration, added to the same class, causes a compile-time error?',
  opts: distinct([ic('double area(int side)'), ic('double area(double s)'), ic('int area(int a, int b)'), ic('int area(char c)')]),
  sol: `The method area(int side) has the same name and parameter types as area(int s); the names of parameters do not count and the return type is not a part of the signature, so the compiler reports it as a duplicate: "${errRetOnly}". The other three declarations differ in the type or the number of parameters, so they are valid overloads.`,
}));
const errAmbig = mustFail(P.pAmbig);
Q('m_ambiguous', mcq({
  t: 6, d: 5, c: 'analysis',
  stem: `A class has the two methods mix(int, double) and mix(double, int). What happens when the call mix(2, 3) is compiled?\n\n${F(P.pAmbig)}`,
  opts: distinct([`Compile-time error: ${errAmbig}`, 'The first method runs, because it is written first', 'The second method runs, because it is written last', 'Both methods run, one after the other']),
  sol: `The arguments 2 and 3 are both int. The first method needs the second one widened to double and the second method needs the first one widened, so neither is a better match and javac stops: "${errAmbig}". A call such as mix(2, 3.0) is exact for the first method and compiles.`,
}));
Q('m_poly_type', mcq({
  t: 6, d: 1, c: 'recall',
  stem: 'Method overloading is an example of which kind of polymorphism?',
  opts: distinct(['Compile-time (static) polymorphism', 'Run-time (dynamic) polymorphism', 'Encapsulation', 'Abstraction']),
  sol: 'In overloading the compiler decides which version to execute from the arguments of the call, before the program runs, so it is compile-time polymorphism. The same method name takes many forms.',
}));
Q('fb_poly', fb({
  t: 6, d: 1, c: 'recall',
  stem: 'Method overloading is also called ___ polymorphism, because the method to be executed is decided when the program is compiled.',
  acc: [['compile-time', 'compile time', 'static']],
  sol: 'It is compile-time (static) polymorphism: the choice of the version is made by the compiler.',
}));
Q('ar_overload_ret', ar({
  t: 6, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Two methods of one class that differ only in their return types are overloaded methods.',
  r: 'The return type is not a part of the signature of a method.',
  sol: `The Plots program that declares int area(int s) and double area(int s) is rejected: "${errRetOnly}". So (A) is false. (R) is true, and it is the reason for that error: the two methods have the same signature.`,
}));
Q('mt_overload_call', match({
  t: 6, d: 3, c: 'application', marks: 3,
  stem: 'The class Solids has three overloaded methods named volume. Match each call with the version of the method that is executed.',
  pairs: [
    [ic('volume(4)'), ic('int volume(int side)')],
    [ic('volume(5, 3, 2)'), ic('int volume(int l, int b, int h)')],
    [ic('volume(10.0, 2.0)'), ic('double volume(double r, double h)')],
  ],
  sol: `The compiler compares the number and types of the arguments with each parameter list: one int, three ints, or two doubles. The three calls print ${ic(out(P.pSolids).split('\n').join(' / '))}.`,
}));
Q('co_volume', co({
  pre: 'The class Solids has three overloaded methods named volume. Write the exact output.',
  t: 6, d: 3, c: 'application',
  code: P.pSolids,
  sol: 'volume(4) has one int argument, so the cube version gives 64. volume(5, 3, 2) has three ints, so the cuboid version gives 30. volume(10.0, 2.0) has two doubles, so the cylinder version multiplies 3.14, r squared and h, and the result is a double.',
}));
const promoCalls = "show(7);\n        show(7.0);\n        show('A');\n        show(7L);";
Q('co_promo', co({
  pre: 'The class ShowDemo has an int version and a double version of show. Write the exact output.',
  t: 6, d: 4, c: 'analysis',
  code: P.pShow(promoCalls),
  sol: 'show(7) matches the int version exactly. show(7.0) is a double. The char A is promoted to int, 65, so the int version runs. The long value 7L has no version of its own; it is widened to double, the only version that accepts it, so the double version prints 7.0.',
}));
Q('co_greet', co({
  pre: 'The class Greeter has three overloaded methods named greet. Write the exact output.',
  t: 6, d: 4, c: 'application',
  code: P.pGreet,
  sol: 'greet("Asha") has one String and uses the first version. greet("Asha", 2) has a String and an int, so the second version builds the first greeting twice. greet(3, "Asha") has an int and then a String, which is a different order, so the third version runs.',
}));
Q('co_err_retonly', co({
  pre: 'A student overloads area by changing only the return type, as shown. State the error the compiler reports.',
  t: 6, d: 4, c: 'analysis', error: true,
  code: P.pRetOnly,
  sol: 'Both methods have the signature area(int), because the return type is not part of the signature. The compiler therefore treats the second as a repeat of the first and reports it on the line of the second declaration.',
  scheme: [['Compile-time error and the line of the second area method', 1], ['Reason: same name and parameter types; return type is not part of the signature', 1]],
}));
Q('s_overload_def', short({
  t: 6, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Define method overloading. Write the prototypes of two overloaded versions of a method named area, one for a square and one for a rectangle (whole-number sides).',
  model: `**Method overloading** means defining two or more methods with the same name in a class, with different parameter lists (a different number, type or order of parameters). The compiler chooses the version from the arguments of the call.\n\n${ic('int area(int side)')} (square)\n\n${ic('int area(int length, int breadth)')} (rectangle)\n\nThe two versions differ in the number of parameters.`,
  sol: 'One mark for the definition and one mark for two valid overloaded prototypes.',
  scheme: [['Definition: same name, different parameter lists', 1], ['Two valid prototypes that differ in the parameter list', 1]],
}));
const srcPair = J`
public class Pairs {
    static int sum(int a, int b) {
        return a + b;
    }
    static double sum(int x, int y) {
        return x + y;
    }
    public static void main(String[] args) {
        System.out.println(sum(2, 3));
    }
}`;
const errPair = mustFail(srcPair);
mustCompile(J`
public class Pairs {
    static void print(int a) {
        System.out.println(a);
    }
    static void print(double a) {
        System.out.println(a);
    }
    public static void main(String[] args) {
        print(2);
    }
}`);
Q('s_overload_valid', short({
  t: 6, d: 4, c: 'analysis', marks: 2, wl: [30, 100],
  stem: 'State, with a reason, whether each pair of methods written in one class is valid overloading.\n\n(a) ' + ic('void print(int a)') + ' and ' + ic('void print(double a)') + '\n\n(b) ' + ic('int sum(int a, int b)') + ' and ' + ic('double sum(int x, int y)'),
  model: `(a) **Valid.** The name is the same and the type of the parameter differs (int and double), so the signatures print(int) and print(double) are different.\n\n(b) **Not valid.** Both have the signature sum(int, int); the names of the parameters do not count and the return type is not part of the signature. The compiler says ${ic(errPair)}.`,
  sol: 'One mark for each pair with its reason.',
  scheme: [['(a) valid: different parameter type', 1], ['(b) not valid: same signature, only return type differs', 1]],
}));
Q('s_sig_vs_proto', short({
  t: [1, 6], d: 3, c: 'understanding', marks: 2, wl: [30, 100],
  stem: 'Distinguish between the prototype and the signature of a method, using ' + ic('static double area(double r)') + ' as the example. Why does the difference matter in overloading?',
  model: `The **prototype** of a method gives its return type, name and parameter list: ${ic('double area(double r)')}. The **signature** has only the name and the parameter types in order: ${ic('area(double)')}.\n\nThe difference matters because the compiler tells overloaded methods apart by their signatures; two methods with the same signature cannot be in one class, even if their return types differ.`,
  sol: 'One mark for the prototype and the signature of the example, and one mark for the reason.',
  scheme: [['Prototype with return type; signature without it, both for area', 1], ['Overloading depends on signatures, so return type alone cannot distinguish methods', 1]],
}));
