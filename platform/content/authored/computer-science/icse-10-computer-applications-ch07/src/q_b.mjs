// ICSE 10 Computer Applications, ch07: topics t03 (pass by value; pass by reference as definition and example only)
// and t04 (static and non-static methods, invoking methods through objects).
import { Q, mcq, ar, tf, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { F, ic, out, oline, distinct, mustFail, mustCompile, J, one } from './q_util.mjs';
import * as P from './progs.mjs';

// ================================================================ t03 pass by value
Q('m_pbv_def', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'What is meant by call by value (pass by value) when a method has primitive parameters?',
  opts: distinct(['A copy of the value of each actual parameter is given to the formal parameter, so a change made to the formal parameter does not affect the actual parameter', 'The address of the actual parameter is given to the formal parameter, so both names refer to the same variable', 'The value is passed only when the method is void; a method that returns a value shares the variable', 'The formal parameter becomes another name for the actual parameter while the method is running']),
  sol: 'In call by value the formal parameter is a separate variable that starts with a copy of the value of the actual parameter. What the method does to its own copy is lost when the method ends. The caller\'s variable stays as it was.',
}));
Q('m_swap_main', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A student writes a swap method for two integers. What does the program display?\n\n${F(P.pSwap(10, 20))}`,
  opts: distinct([ic(oline(P.pSwap(10, 20))), 'Both lines display 20 10', 'Both lines display 10 20', 'A compile-time error']),
  sol: 'Inside swap the copies a and b really are interchanged, so the first line shows 20 10. The variables x and y of main were only the source of the copies and are untouched, so the second line shows the original 10 20. To pass a result back the method must return it.',
}));
Q('m_raise', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A clerk writes a method to raise a salary. What does this program display?\n\n${F(P.pRaise)}`,
  opts: distinct([ic(oline(P.pRaise)), 'The Outside line also shows 8500', 'The Inside line shows 8000', 'A compile-time error']),
  sol: 'The parameter pay receives a copy of 8000 and the method adds 500 to that copy, so the line printed inside shows 8500. The variable salary in main is separate and is not changed, so the last line still shows 8000.',
}));
Q('m_pbr_def', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement defines pass by reference?',
  opts: distinct(['The reference (address) of the actual parameter is given to the formal parameter, so both refer to the same data and a change made through the formal parameter is seen by the caller', 'A copy of the value of the actual parameter is given to the formal parameter, so the caller never sees any change', 'The method returns the value of its parameter to the caller using the return statement', 'The parameters are written in the method call but are not declared in the method header']),
  sol: 'In pass by reference the method works on the original data, not on a copy. In Java this is what happens when an object is passed: the formal parameter holds the same reference as the actual parameter, so changing a data member through it changes the caller\'s object.',
}));
Q('tf_pbv_primitive', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When a method changes the value of a formal parameter of type int, the actual parameter in the calling method changes too.',
  sol: `A primitive parameter is passed by value. In the PayRise program the method raised its copy, giving "${out(P.pRaise).split('\n')[0]}", while the caller's variable still printed "${out(P.pRaise).split('\n')[1]}".`,
}));
Q('ar_pbv', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The method swap(int a, int b) of the SwapTest program does not interchange the variables x and y of main.',
  r: 'Each formal parameter receives its own copy of the value of the corresponding actual parameter.',
  sol: `Run with x = 10 and y = 20, the program prints "${out(P.pSwap(10, 20)).split('\n')[1]}" for main, so (A) is true. (R) is true and is the reason: the swap acts only on the copies a and b.`,
}));

// ---- code output, t03
Q('co_swap', co({
  pre: 'A student writes a swap method to interchange two marks. Write the exact output.',
  t: 3, d: 3, c: 'application',
  code: P.pSwap(4, 9),
  sol: 'a and b receive copies of 4 and 9 and are interchanged inside the method, so the first line shows 9 4. The variables x and y of main are unchanged, so the second line shows 4 9.',
}));
Q('co_shrink', co({
  pre: 'The variable n of main and the parameter n of shrink have the same name. Write the exact output.',
  t: 3, d: 4, c: 'analysis',
  code: P.pShrink,
  sol: 'The parameter n is a different variable from the n of main. It starts at 10 and the loop makes it 7, then 4, then 1, and stops when it is no longer more than 2. Only the copy changes, so main still shows 10.',
}));

// ---- short answer, t03 (pass by reference: definition and one example only)
Q('s_pbv_vs_pbr', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: [40, 125],
  stem: 'Define call by value and call by reference. Give one example of a call by reference.',
  model: `**Call by value:** a copy of the value of the actual parameter is passed, so changes to the formal parameter do not affect the actual parameter (all primitive types). **Call by reference:** the reference of the actual parameter is passed, so the formal and the actual parameter refer to the same data and a change made through the formal parameter is seen by the caller.\n\nExample: an object is passed to a method.\n\n${F(P.pParcel)}\n\nThe method changes the data member of the object it receives, and main displays ${ic(out(P.pParcel))}.`,
  sol: 'One mark for the two definitions and one mark for a correct example.',
  scheme: [['Call by value defined (copy of the value) and call by reference defined (same data referred to)', 1], ['One example in which an object is passed and its data member changes', 1]],
}));

// ================================================================ t04 static and non-static methods
Q('m_static_def', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Which statement about a static method is correct?',
  opts: distinct(['It belongs to the class and can be called without creating an object of the class', 'It can be called only through an object of the class', 'It cannot have any parameters', 'It cannot return a value to the caller']),
  sol: 'A static method belongs to the class itself, so it can be called directly from another static method of the same class or with the class name. Static methods can take parameters and can return values like any other method.',
}));
const audMembers = J`
    int seats = 120;
    static String name() {
        return "Town Hall";
    }
    int capacity(int blocks) {
        return seats * blocks;
    }`;
const audProg = (stmts) => `public class Auditorium {\n${audMembers}\n    public static void main(String[] args) {\n        ${stmts}\n    }\n}`;
const audOk = 'Auditorium h = new Auditorium();\n        System.out.println(h.capacity(2));';
const errAudDirect = mustFail(audProg('System.out.println(capacity(2));'));
const errAudClass = mustFail(audProg('System.out.println(Auditorium.capacity(2));'));
mustCompile(audProg(audOk));
Q('m_static_call', mcq({
  t: 4, d: 3, c: 'application',
  stem: `The class below has a static method name and a non-static method capacity; its main method is in the same class.\n\n${F(audMembers)}\n\nWhich statement, written in main, compiles and displays the capacity of two blocks?`,
  opts: distinct([ic('Auditorium h = new Auditorium(); System.out.println(h.capacity(2));'), ic('System.out.println(capacity(2));'), ic('System.out.println(Auditorium.capacity(2));'), ic('System.out.println(name.capacity(2));')]),
  sol: `A non-static method works on an object, so an object must be created first and the method called with the dot operator. Calling it by its bare name from the static main gives "${errAudDirect}", and using the class name gives the same kind of error: "${errAudClass}". The class name is the way to call a static method such as name().`,
}));
const errNonStaticCall = mustFail(P.pTuitionBadCall);
Q('m_nonstatic_err', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: `What happens when the following program is compiled?\n\n${F(P.pTuitionBadCall)}`,
  opts: distinct([`Compile-time error: ${errNonStaticCall}`, 'It displays 2700', 'It displays 0', 'Run-time error: NullPointerException']),
  sol: `main is static, so it runs without any object of Tuition. The method total is non-static and needs an object (to supply fee), so the call by name is rejected: "${errNonStaticCall}". Creating an object and writing t.total(3) removes the error.`,
}));
Q('m_obj_call', mcq({
  t: 4, d: 3, c: 'application',
  stem: `A tuition class has a static method and a non-static method. What does the program display?\n\n${F(P.pTuition)}`,
  opts: distinct([ic(one(out(P.pTuition))), ic('Sunrise Tuition / 900'), ic('2700 / Sunrise Tuition'), 'A compile-time error']),
  sol: 'The static method centre is called by its name and returns the text, which is displayed first. For the second line an object t is created with new, and t.total(3) multiplies the data member fee, 900, by 3.',
}));
const errNoSymbol = mustFail(J`
class NumTools {
    static int digitSum(int n) {
        return n;
    }
}
public class Probe {
    public static void main(String[] args) {
        int s = digitSum(4821);
    }
}`);
Q('m_classname_call', mcq({
  t: 4, d: 3, c: 'application',
  stem: `The class NumTools of the program below has the static method digitSum(int n). From main of another class, which statement correctly stores the digit sum of 4821 in s?\n\n${F(P.pTools)}`,
  opts: distinct([ic('int s = NumTools.digitSum(4821);'), ic('int s = digitSum(4821);'), ic('int s = NumTools.digitSum;'), ic('int s = new NumTools.digitSum(4821);')]),
  sol: `A static method of another class is called with the class name, the dot and the method name, and it needs no object. Writing only the method name inside a different class gives "${errNoSymbol}". NumTools.digitSum without brackets and arguments is not a call at all, and new is used to create objects, not to call methods.`,
}));
Q('ar_static', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A static method cannot use a non-static data member of its class directly.',
  r: 'A static method can run without any object of the class, so there is no object whose data member could be meant.',
  sol: `For the class Tuition, a static method yearly that uses the data member fee fails with "${mustFail(P.pTuitionBadField)}", so (A) is true. (R) is true and gives the reason: a data member belongs to an object.`,
}));
Q('ord_nonstatic', ord({
  t: 4, d: 3, c: 'application',
  stem: 'Arrange the steps of using a non-static member method of a class from main in the correct order.',
  items: ['Write the class with its data members and the non-static member method', 'In main, create an object of the class with the keyword new', 'Call the method with the object name, the dot operator and the method name', 'The method works on the data members of that object and may return a value'],
  sol: 'The class must be defined before an object can be created from it, the object must exist before a method can be called on it, and the call then runs the method on that object.',
}));

// ---- code output, t04
Q('co_tea', co({
  pre: 'A tea stall class keeps the number of cups in a data member. Two stalls are created. Write the exact output.',
  t: 4, d: 4, c: 'application',
  code: P.pTea,
  sol: 'Each object has its own data member cups, starting at 30. Stall a sells 8 and then 5, leaving 17. Stall b sells 10, leaving 20. The call a.sell(8) cannot change b, because the method acts on the object before the dot.',
}));
Q('co_err_nonstatic', co({
  pre: 'A student calls the non-static method total from main as shown below. State the error the compiler reports.',
  t: 4, d: 4, c: 'analysis', error: true,
  code: P.pTuitionBadCall,
  sol: 'main is static and total is not. A non-static method belongs to an object and uses that object\'s data member fee, so it cannot be called by name from a static method. An object has to be created and the call written as object.total(3).',
  scheme: [['Compile-time error with the line of the call', 1], ['Reason: non-static method called from the static main without an object', 1]],
}));

// ---- short answers, t04
Q('s_static_vs_non', short({
  t: 4, d: 3, c: 'understanding', marks: 2, wl: [40, 120],
  stem: 'Distinguish between a static method and a non-static method. Show how each is called.',
  model: `A **static** method belongs to the class and can be called without an object: by its name inside the same class, or as ${ic('ClassName.method()')} from another class. A **non-static** method belongs to the objects of the class; it can use the data members of the object and must be called through an object, as ${ic('object.method()')}.\n\nIn this program centre() is static and total() is not, and the output is ${ic(one(out(P.pTuition)))}.\n\n${F(P.pTuition)}`,
  sol: 'One mark for the difference and one mark for the two ways of calling.',
  scheme: [['Static: belongs to the class, no object needed; non-static: belongs to an object, can use its data members', 1], ['Calls shown: by name or class name for static; object.method() for non-static', 1]],
}));
Q('s_main_static', short({
  t: 4, d: 4, c: 'understanding', marks: 2, wl: [30, 110],
  stem: 'Why is the main method declared static? What must main do to use a non-static method of its own class?',
  model: `The Java system starts a program by calling main before any object of the class exists. A static method can be called without an object, so main is declared static.\n\nA static method cannot call a non-static method by its name; the compiler says ${ic(errNonStaticCall)}. So main must first create an object with new and then call the method through it, for example ${ic('t.total(3)')}.`,
  sol: 'One mark for the reason and one for creating an object.',
  scheme: [['Reason: no object exists when the program starts, so main is static', 1], ['Create an object and call the method through it', 1]],
}));
