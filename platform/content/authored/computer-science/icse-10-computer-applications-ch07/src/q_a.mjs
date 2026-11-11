// ICSE 10 Computer Applications, ch07: topics t01 (need, header, prototype, signature, define and call) and
// t02 (actual and formal parameters, return). Every output or message quoted anywhere is produced by running Java.
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, out, oline, distinct, mustFail, mustCompile, prog, J, one } from './q_util.mjs';
import * as P from './progs.mjs';

// ================================================================ t01 need, header, prototype, signature
Q('m_modular', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A school fair program needs to compute stall rents, print receipts and total the collection. Which statement best explains how user-defined methods help in writing it as modular programming?',
  opts: distinct(['The program is divided into small named methods, each doing one task, so that every part can be written, tested and reused separately', 'All the statements are written inside main so that the whole program can be read at one place', 'Each method is saved in a separate file so that the compiler can skip the methods that are not needed', 'A method makes the computer remember every result for ever, so the program runs faster']),
  sol: 'Modular programming means breaking a big problem into small independent parts. A method is such a part: it has a name, does one job and can be called again wherever that job is needed, which avoids repeating code and makes errors easier to find.',
}));
Q('m_header_part', mcq({
  t: 1, d: 1, c: 'recall',
  stem: `In the method header ${ic('public static boolean isLeap(int year)')}, which word gives the return type?`,
  opts: distinct([ic('boolean'), ic('static'), ic('isLeap'), ic('int')]),
  sol: 'The return type is written just before the method name and tells the kind of value the method sends back. Here it is boolean. The word static is a modifier, isLeap is the name and int is the type of the parameter year.',
}));
Q('m_proto', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A bus operator wants a method named fee that accepts the number of days (int) and the daily rate (double) and returns the total charge as a double. Which is the correct prototype of the method?',
  opts: distinct([ic('double fee(int days, double rate)'), ic('void fee(int days, double rate)'), ic('double fee(int days, rate)'), ic('int fee(double days, double rate)')]),
  sol: 'A prototype gives the return type, the method name and the parameter list with the type of every parameter. The return type is double, and the parameters appear in the order days then rate with types int and double. A void method would return nothing, and a parameter written without its type is not valid.',
}));
Q('m_signature', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `What is the signature of the method ${ic('static double average(int a, int b, int c)')}?`,
  opts: distinct([ic('average(int, int, int)'), ic('double average(int, int, int)'), ic('static double average(int a, int b, int c)'), ic('average(a, b, c)')]),
  sol: 'The signature of a method is its name together with the types and the order of its parameters. The return type and modifiers are not part of it, and the names of the parameters do not matter, because they do not tell the compiler which method is meant.',
}));
Q('m_void_value', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A method only displays a welcome message on the screen and gives nothing back to the statement that called it. Which return type should it have?',
  opts: distinct([ic('void'), ic('int'), ic('String'), ic('boolean')]),
  sol: 'A method that sends no value back is declared with the return type void. Its call is a complete statement on its own. A method with any other return type must return a value of that type.',
}));

Q('tf_void_return', tf({
  t: 1, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? A void method may contain the statement return; (with no value) to end the method early.',
  sol: (() => { const early = J`
class Early {
    static void show(int n) {
        if (n < 0)
            return;
        System.out.println(n);
    }
    public static void main(String[] args) {
        show(-2);
        show(5);
    }
}`; mustCompile(early, 'void return'); if (out(early) !== '5') throw new Error('void return: unexpected output ' + out(early)); return 'A return statement without a value is allowed in a void method and leaves the method at once. A void method cannot return a value, but it can stop early. For example, void show(int n) { if (n < 0) return; System.out.println(n); } compiles, and the calls show(-2) and show(5) print only 5.'; })(),
}));
Q('tf_sig_return', tf({
  t: 1, d: 3, c: 'recall', ans: false,
  stem: 'True or false? The return type of a method is a part of its signature.',
  sol: 'The signature consists of the method name and the parameter list (types and order). The return type belongs to the prototype but not to the signature, which is why two methods cannot differ in return type alone.',
}));
Q('fb_void', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A method that does not return any value is declared with the return type ___.',
  acc: [['void']],
  sol: 'The keyword void as the return type shows that the method sends no value back.',
}));
Q('mt_header', match({
  t: 1, d: 2, c: 'recall', marks: 2,
  stem: `Match each part of the method header ${ic('public static double milkBill(int litres, double rate)')} with its name.`,
  pairs: [
    [ic('public'), 'access specifier'],
    [ic('static'), 'modifier'],
    [ic('double'), 'return type'],
    [ic('(int litres, double rate)'), 'parameter list'],
  ],
  sol: 'The access specifier says who may use the method, a modifier such as static says how it belongs to the class, the return type is the kind of value sent back, and the bracketed list gives the type and name of each parameter.',
}));
Q('ar_unreach', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A statement written directly after a return statement in the same block of a method causes a compile-time error.',
  r: 'A method may contain more than one return statement, each in a different branch.',
  sol: `A statement placed directly after return can never run, and javac reports "${mustFail(P.pUnreach)}" for it, so (A) is true. (R) is also true: a method can return "Child", "Teen" or "Adult" from different branches. But (R) does not explain (A); the error arises because the return has already ended the method before the next statement.`,
}));

// ---- code output, t01
Q('co_notice', co({
  pre: 'A school notice-board program calls a void method twice. Write the exact output.',
  t: 1, d: 2, c: 'application',
  code: P.pNotice,
  sol: 'Each call runs the body of greet once with the name given in the call. The method returns nothing, so the calls are plain statements. The last println in main runs after both calls have finished.',
}));
Q('co_err_unreach', co({
  pre: 'The method below was written to double a number and then confirm. State the error the compiler reports.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: P.pUnreach,
  sol: 'The return statement ends the method, so the println after it can never execute. Java treats an unreachable statement as an error. The line to remove or move is the one after the return.',
  scheme: [['Compile-time error and the line of the unreachable statement', 1], ['Reason: the statement follows a return, which has already ended the method', 1]],
}));
Q('co_err_missing', co({
  pre: 'A student wrote the method below to find the sign of a number. State the error the compiler reports.',
  t: 1, d: 4, c: 'analysis', error: true,
  code: P.pMissing,
  sol: 'If n is 0, neither condition is true, so the method would reach its closing brace without returning an int. The compiler checks every path and reports the missing return at the end of the method. A final else or a return after the ladder repairs it.',
  scheme: [['Compile-time error and the line of the closing brace of the method', 1], ['Reason: one path (n equal to 0) ends without a return statement', 1]],
}));

// ---- short answers, t01
Q('s_modular', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'What is modular programming? State two advantages of dividing a program into user-defined methods.',
  model: 'In **modular programming** a large program is divided into small parts called modules; in Java a module is usually a method that performs one well-defined task.\n\nAdvantages:\n- A method written once can be **reused** by calling it many times, so code is not repeated.\n- Each method can be **tested and corrected separately**, so errors are easier to find and the program is easier to read and maintain.',
  sol: 'One mark for the meaning of modular programming and one for two advantages.',
  scheme: [['Meaning: program divided into small tasks, each written as a method', 1], ['Two advantages: reuse, easier testing or maintenance', 1]],
}));
Q('s_proto', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: [25, 90],
  stem: 'Write the prototype of a method named discount that accepts the bill amount (double) and the percentage rate (int) and returns the discount as a double. Also write its signature and say which part of the prototype is left out of the signature.',
  model: 'Prototype: ' + ic('double discount(double bill, int rate)') + '\n\nSignature: ' + ic('discount(double, int)') + '\n\nThe **return type** (double) is not a part of the signature; the signature has only the method name and the types and order of the parameters.',
  sol: 'One mark for a correct prototype and one mark for the signature with the omitted part.',
  scheme: [['Prototype: return type double, name, parameter list with both types', 1], ['Signature discount(double, int) and return type named as the part left out', 1]],
}));

// ================================================================ t02 actual and formal parameters, return
Q('m_formal_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'What are formal parameters of a method?',
  opts: distinct(['The variables declared in the method header, which receive the values sent by the caller', 'The values or variables written inside the brackets of the method call', 'The variables declared inside the body of the method', 'The data members of the class that holds the method']),
  sol: 'Formal parameters are the names, with their types, in the header of the definition. They are created when the method is called and hold copies of the values given by the caller. The values written in the call are the actual parameters.',
}));
Q('m_actual_formal_id', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Study the program and choose the correct statement.\n\n${F(P.pFare)}`,
  opts: distinct(['km and rate are formal parameters, while distance and perKm are actual parameters', 'distance and perKm are formal parameters, while km and rate are actual parameters', 'km and distance are both formal parameters of fare', 'rate and perKm are data members of the class FareCalc']),
  sol: 'The names km and rate are written in the header of fare, so they are formal parameters. In the call fare(distance, perKm) the variables distance and perKm supply the values, so they are actual parameters. The other call, fare(3, 15), has the literal values 3 and 15 as actual parameters. None of them is a data member, because they are declared inside methods.',
}));
Q('m_return_early', mcq({
  t: 2, d: 2, c: 'application',
  stem: `A ticket counter uses the method below to name an age band. What does the program display?\n\n${F(P.pBand('band(15)'))}`,
  opts: distinct([ic(out(P.pBand('band(15)'))), ic(out(P.pBand('band(9)'))), ic(out(P.pBand('band(41)'))), 'Teen and Adult on two lines']),
  sol: 'For age 15 the first test is false, so that return is skipped. The second test is true and return "Teen" sends the value back and ends the method; the last return is never reached. The word Child belongs to an age below 13 and Adult to the last return.',
}));
Q('m_fare', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A milk vendor uses the program below. What does it display?\n\n${F(P.pDairy)}`,
  opts: distinct([ic(out(P.pDairy)), ic('Amount = 678'), ic('Amount = 12'), 'A compile-time error']),
  sol: 'The call passes 12 for litres and 56.5 for rate. The product of an int and a double is a double, 678.0, so the method returns it and main joins it to the text with the plus sign. The result keeps its decimal point because it is a double.',
}));
const errLossy = mustFail(P.pLossy);
Q('m_return_mismatch', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `A student stores the result of a double-returning method in an int variable, as in the code below. What happens when it is compiled?\n\n${F(P.pLossy)}`,
  opts: distinct([`Compile-time error: ${errLossy}`, 'It displays 3', 'It displays 3.5', 'Run-time error: ArithmeticException']),
  sol: `The method half is declared to return a double, so the call half(7) has the type double. A double cannot be stored in an int without a cast, and javac says "${errLossy}". The value 3.5 would be displayed only if h were declared double.`,
}));
Q('tf_void_assign', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? If greet is a void method, the statement int r = greet("Meera"); compiles.',
  sol: `A void method gives no value, so it cannot be assigned: javac reports "${mustFail(P.pUseVoid)}". A void method is called as a statement on its own.`,
}));
Q('fb_formal', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The variables written in the method header are called ___ parameters, and the values written in the method call are called ___ parameters.',
  acc: [['formal'], ['actual']],
  sol: 'The formal parameters belong to the definition and the actual parameters belong to the call.',
}));
Q('mt_terms', match({
  t: 2, d: 2, c: 'recall', marks: 2,
  stem: 'Match each term used with method calls to its meaning.',
  pairs: [
    ['Formal parameter', 'a variable in the method header that receives a value'],
    ['Actual parameter', 'a value or variable written in the method call'],
    [ic('return'), 'sends a value back to the caller and ends the method'],
    [ic('void'), 'return type of a method that sends nothing back'],
  ],
  sol: 'Formal parameters are in the definition, actual parameters in the call; return hands the result back and ends the method; void is the return type of a method that gives nothing back.',
}));
Q('ord_call_flow', ord({
  t: 2, d: 3, c: 'application',
  stem: 'Arrange the events of a call to a value-returning method in the order in which they happen.',
  items: ['The statement that calls the method is reached in main', 'The values of the actual parameters are copied into the formal parameters', 'The statements of the method body are executed', 'The return statement sends the result back to the caller', 'The caller uses the returned value and continues with the next statement'],
  sol: 'The call is reached first, then the values are handed over to the formal parameters, the body runs, return carries the result back, and only then does the calling statement finish.',
}));

// ---- code output, t02
Q('co_band', co({
  pre: 'A museum uses the method below for ticket classes. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: P.pBand('band(12) + "," + band(19) + "," + band(20)'),
  sol: 'Each call returns one String, and the plus signs join the three results with commas. 12 is below 13, 19 is below 20 but not below 13, and 20 fails both tests so the last return is used.',
}));
Q('co_fare', co({
  pre: 'An auto-rickshaw fare program is given below. Write the exact output.',
  t: 2, d: 2, c: 'application',
  code: P.pFare,
  sol: 'In the first call the values of distance and perKm, 7 and 12, are copied into km and rate, so the method returns 84. The second call passes the literals 3 and 15 and returns 45.',
}));

// ---- short answers, t02
Q('s_actual_vs_formal', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'Distinguish between actual parameters and formal parameters. Illustrate with the method fare of a rickshaw program.',
  model: `**Formal parameters** are the variables declared in the method header; they receive the values when the method is called. **Actual parameters** are the values or variables written in the call; their values are copied into the formal parameters.\n\nIn ${ic('static int fare(int km, int rate)')} the names km and rate are formal parameters. In the call ${ic('fare(distance, perKm)')} the variables distance and perKm are actual parameters.`,
  sol: 'One mark for each kind of parameter, with the example.',
  scheme: [['Formal parameters: in the header, receive values', 1], ['Actual parameters: in the call, supply values; example identified', 1]],
}));
const srcEven = J`
public class EvenCheck {
    static boolean isEven(int n) {
        return n % 2 == 0;
    }
    public static void main(String[] args) {
        System.out.println(isEven(10));
        System.out.println(isEven(7));
    }
}`;
Q('s_even_method', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Write a Java method isEven that accepts an int and returns true if it is even and false otherwise. Show one call that displays the result.',
  model: `${F(srcEven)}\n\nThe two calls display ${ic(oline(srcEven))}.`,
  sol: 'The return type is boolean, the parameter is an int, and the relational expression n % 2 == 0 is itself the value returned.',
  scheme: [['Correct header: boolean return type, int parameter', 1], ['Correct return expression and a call that displays the result', 1]],
}));
