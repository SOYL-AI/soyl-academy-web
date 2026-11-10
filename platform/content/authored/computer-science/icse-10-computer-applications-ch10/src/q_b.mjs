// ICSE 10 Computer Applications, ch10: topic t02 (scope of variables: static, instance, argument and local variables).
import { Q, mcq, ar, tf, fb, match, ord, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, out, oline, distinct, mustFail, mustCompile, two } from './q_util.mjs';
import * as S from './snips.mjs';

const errLoop = mustFail(S.cLoopScope, 'loop variable after loop');
const errIf = mustFail(S.cIfScope, 'block variable after block');
const errStaticVar = mustFail(S.cVisitsErr, 'instance variable in main');
const errStaticMeth = mustFail(S.cVisitsMeth, 'instance method in main');
const errUninit = mustFail(S.cUninit, 'uninitialised local');
const errRedecl = mustFail(S.cRedecl, 'redeclared in nested block');
const errParam = mustFail(S.cParamRedecl, 'local with parameter name');
const tokenClass = ['class TokenDesk {', ...S.TOKEN.map((l) => '    ' + l), '}'].join('\n');

// ================================================================ t02 scope of variables
Q('m_static_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which statement is true of a static (class) variable?',
  opts: distinct(['Only one copy of it exists, and all the objects of the class share it', 'Every object of the class has its own separate copy of it', 'It exists only while one method is being executed', 'It can be used only inside the constructor']),
  sol: `A static variable belongs to the class, not to any object. After three TokenDesk objects are created, the single variable next holds ${ic(out(S.cTokenN(3)))}, whichever object is used to look at it.`,
}));
Q('m_instance_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which kind of variable gets a separate copy each time an object of the class is created?',
  opts: distinct(['An instance variable', 'A static variable', 'A class constant shared by the objects', 'The argument variable of main']),
  sol: 'An instance variable is a data member declared without the keyword static, so each object carries its own copy with its own value. A static variable is shared by all the objects.',
}));
Q('m_local_scope', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What is the scope of a local variable that is declared inside the braces of an if block in a method?',
  opts: distinct(['From the line of its declaration to the closing brace of that block', 'The whole of the method in which the block is written', 'All the methods of the class', 'The whole program']),
  sol: `Outside its block the variable does not exist for the compiler. Using such a variable after the block gives "${errIf}".`,
}));
Q('m_arg_scope', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Where can the argument (formal parameter) variable of a method be used?',
  opts: distinct(['Only inside the body of that method', 'In every method of the class', 'Only in the main method of the program', 'Outside the class, through an object']),
  sol: 'An argument variable is created when the method is called, receives a copy of the value passed, and ceases to exist when the method returns. Its scope is the body of its own method.',
}));
Q('m_tally_trace', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A class Tally has an instance variable inst, a static variable stat and a local variable local inside bump(). What does this program display?\n\n${F(S.cTally)}`,
  opts: distinct([ic(oline(S.cTally)), ic('1 2 3 / 2 1 3'), ic('1 1 1 / 1 1 1'), ic('1 2 3 / 3 3 3')]),
  sol: 'The local variable is created afresh at every call, so every call returns 1. The calls on a raise a.inst to 2, the call on b makes b.inst 1, and the static variable counts all three calls, so it ends at 3.',
}));
Q('m_tally_static', mcq({
  t: 2, d: 3, c: 'application',
  stem: `With the same class Tally, one call of bump() is made on a and two calls on b. What is displayed?\n\n${F(S.cTallyB)}`,
  opts: distinct([ic(out(S.cTallyB)), ic('1 1 1'), ic('1 2 2'), ic('0 0 3')]),
  sol: 'The instance variable inst counts the calls separately for each object (1 for a, 2 for b), while the single static variable stat counts every call, so it is 3.',
}));
Q('m_token_next', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The static variable next of the class TokenDesk starts at 1 and the constructor increases it by 1. Three objects are created. What does this program display?\n\n${F(S.cTokenN(3))}`,
  opts: distinct([ic(out(S.cTokenN(3))), ic('3'), ic('1'), ic('0')]),
  sol: 'The single variable next is increased once for every object: 1 to 2, 2 to 3 and 3 to 4. It is not reset for each object, because there is only one copy.',
}));
Q('m_scope_err', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A programmer prints the loop variable once more after the loop ends. What happens when the code is compiled?\n\n${F(S.cLoopScope)}`,
  opts: distinct([`Compile-time error: ${errLoop}`, 'The program prints 0, 1, 2 and then 3', 'The program prints 0, 1, 2 and then 0', 'The program prints 0, 1, 2 and stops without an error']),
  sol: 'The variable i is declared in the header of the for statement, so its scope is the loop only. After the closing brace the name i is unknown to the compiler, and no program is produced.',
}));
Q('m_static_ctx', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A static method main uses an instance variable of its own class directly, as shown. What happens when the program is compiled?\n\n${F(S.cVisitsErr)}`,
  opts: distinct([`Compile-time error: ${errStaticVar}`, 'The program displays 1', 'The program displays 0', 'The program compiles but stops with a run-time error']),
  sol: 'The method main is static and runs without any object, so it has no instance of Visits whose count it could use. An object has to be created first, and the variable is then reached through it.',
}));
Q('m_uninit', mcq({
  t: 2, d: 3, c: 'application',
  stem: `What happens when this fragment is compiled?\n\n${F(S.cUninit)}`,
  opts: distinct([`Compile-time error: ${errUninit}`, 'The value 0 is displayed', 'The value null is displayed', 'The program compiles but stops with a run-time error']),
  sol: `A local variable gets no default value, so the compiler insists that it is given one before use. This differs from a data member, which is given a default: the program with the three members of Bin displays ${ic(out(S.cInstDefault))}.`,
}));
Q('m_default_vals', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which statement about the default values of variables is correct?',
  opts: distinct(['Data members receive default values such as 0, 0.0 and false, but a local variable receives none', 'Local variables receive the default value 0, but data members receive none', 'Both data members and local variables receive default values', 'Neither data members nor local variables receive default values']),
  sol: `When no value is given, the data members of an object start with defaults: the program with the members of Bin displays ${ic(out(S.cInstDefault))}. A local variable has no default, and using it before a value is given gives "${errUninit}".`,
}));
Q('m_shadow', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `The parameter of raiseBad has the same name as the data member level. What does this program display?\n\n${F(S.cGaugeBad)}`,
  opts: distinct([ic(out(S.cGaugeBad)), ic('25'), ic('15'), 'A compile-time error, because the names clash']),
  sol: 'Inside raiseBad the name level means the parameter, which hides the data member. The parameter is raised to 25 and then discarded, and the data member keeps its value. The names do not clash: the compiler allows a parameter to hide a data member.',
}));
Q('m_pass_value', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A method changes the value of its argument variable. What is the effect on the variable of the calling method whose value was passed?',
  opts: distinct(['None, because the argument variable holds a copy of the value', 'The calling variable is changed in the same way', 'The calling variable becomes zero', 'The compiler reports an error, because an argument variable cannot be changed']),
  sol: `The argument variable is a separate variable that receives a copy. In the program with the method raise, the copy is raised inside and the caller still prints the old value: ${ic(oline(S.cByValue))}. Changing an argument variable is allowed; it just has no effect outside.`,
}));
Q('m_lifetime', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'For how long does a local variable of a method exist in memory?',
  opts: distinct(['From the call of the method until the method returns', 'From the start of the program until it ends', 'For as long as the object of the class exists', 'Until the class is removed from memory']),
  sol: 'A local variable is created every time the method is called and destroyed when the method ends, so its value is not remembered from one call to the next. Instance variables live as long as their object and static variables as long as the program runs.',
}));
Q('m_static_access', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `Two TokenDesk objects are created, so next is 3. The static variable is then assigned through the reference a. What does this program display?\n\n${F(S.cTokenShare)}`,
  opts: distinct([ic(out(S.cTokenShare)), ic('3'), ic('2'), ic('1')]),
  sol: 'There is only one copy of next, so it makes no difference which reference is used to reach it: the assignment through a is seen through b. The usual style is to write the class name, as in TokenDesk.next.',
}));
const frag = {
  ok: 'for (int i = 0; i < 2; i++) { } for (int i = 0; i < 2; i++) { }',
  dup: 'int i = 0; for (int i = 0; i < 2; i++) { }',
  after: 'for (int i = 0; i < 2; i++) { } i = 5;',
  blk: '{ int k = 1; } k = 2;',
};
mustCompile(frag.ok, 'two loops with the same variable name');
Q('m_block_reuse', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: 'Which one of the following fragments, written inside a method, compiles without error?',
  opts: distinct([ic(frag.ok), ic(frag.dup), ic(frag.after), ic(frag.blk)]),
  sol: `The two loops are separate scopes, so each may declare its own i. The others fail: declaring i again inside the scope of an existing i gives "${mustFail(frag.dup)}", and using a variable after its block gives "${mustFail(frag.after)}".`,
}));

Q('ar_static_shared', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'When three objects of the class TokenDesk are created, the static variable next holds 4 afterwards.',
  r: 'A static variable has a single copy that is shared by all the objects of its class.',
  sol: `The program with three new TokenDesk statements displays ${ic(out(S.cTokenN(3)))}, so (A) is true. (R) is a true statement and it is the reason: each constructor call increases the same variable.`,
}));
Q('ar_block_scope', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A variable declared inside an if block can still be used after the closing brace of the block.',
  r: 'The scope of a local variable is the block in which it is declared.',
  sol: `Using the variable after the block gives "${errIf}", so (A) is false. (R) is the correct rule of scope.`,
}));

Q('tf_static_obj', tf({
  t: 2, d: 3, c: 'application', ans: true,
  stem: 'True or false? A static variable can be used through the class name even before any object of the class has been created.',
  sol: `A static variable is created when the class is loaded, not when an object is created. The program that prints TokenDesk.next without creating any object displays ${ic(out(S.cTokenBefore))}.`,
}));
Q('tf_local_default', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A local variable that is declared but not given a value is automatically set to 0.',
  sol: `Only data members get default values. The compiler rejects the use of a local variable that has not been given a value: "${errUninit}".`,
}));
Q('fb_scope', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'A variable that is declared inside a method and can be used only inside that method is called a ___ variable.',
  acc: [['local']],
  sol: 'A variable declared inside a method (or a block) is a local variable.',
}));
Q('mt_kinds', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each kind of variable with the place where it is declared.',
  pairs: [
    ['Instance variable', 'in the class, outside every method, without the keyword static'],
    ['Static (class) variable', 'in the class, outside every method, with the keyword static'],
    ['Argument (formal parameter) variable', 'in the bracket of a method or constructor header'],
    ['Local variable', 'inside the body of a method, constructor or block'],
  ],
  sol: 'The place of the declaration, with the keyword static where it applies, decides the kind of the variable, and therefore its scope and its lifetime.',
}));
Q('ord_lifetime', ord({
  t: 2, d: 3, c: 'understanding',
  stem: 'Arrange the following events of a program that uses the class TokenDesk in the order in which they happen.',
  items: ['The class is loaded and the static variable next is created', 'An object is created with new and its instance variable token is created', 'The method serve is called and its argument variable and local variable are created', 'The method serve returns and its argument variable and local variable are destroyed'],
  sol: 'A static variable comes first, as it belongs to the class. An instance variable needs an object. Argument and local variables live only between the call and the return of the method.',
}));

// ---- code output, t02
Q('co_token', co({
  pre: 'A clinic issues tokens with the class TokenDesk. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: S.cTokenServe,
  sol: 'The constructor copies next into token and then increases next, so the first object gets token 1 and the second gets token 2. The local variable wait is twice the token. After the two constructions the static variable is 3.',
}));
const cTallyC = two('Tally', S.TALLY, 'Run', ['Tally a = new Tally();', 'Tally b = new Tally();', 'a.bump();', 'a.bump();', 'a.bump();', 'b.bump();', 'System.out.println(a.inst + " " + b.inst + " " + Tally.stat);']);
Q('co_tally', co({
  pre: 'Three calls of bump() are made on a and one call on b. Write the exact output of the program.',
  t: 2, d: 3, c: 'application',
  code: cTallyC,
  sol: 'The instance variable inst is counted for each object (3 calls on a, 1 call on b). The static variable stat counts all four calls.',
}));
Q('co_token_own', co({
  pre: 'The program changes the instance variable token of one TokenDesk object. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: S.cTokenOwn,
  sol: 'The two objects have separate copies of token. Assigning 70 to a.token does not touch b.token, which was set to 2 by the constructor.',
}));
Q('co_loops', co({
  pre: 'Write the exact output of the following fragment.',
  t: 2, d: 3, c: 'application',
  code: S.cTwoLoops,
  sol: 'Each for statement has its own variable i. The first loop adds 1 + 2 + 3 and the second adds 10 + 20 + 30 + 40 to the same variable sum, which is declared outside both.',
}));
Q('co_shadow', co({
  pre: 'The method show declares a local variable with the same name as the data member. Write the exact output.',
  t: 2, d: 4, c: 'analysis',
  code: S.cGaugeShow,
  sol: 'Inside show the plain name level means the local variable, 99, which hides the data member. The expression this.level refers to the data member of the object, which still holds 10.',
}));
const cFees = code('public class Fees {', '    static void waive(int fee) {', '        fee = 0;', '        System.out.println("waived " + fee);', '    }', '    public static void main(String[] args) {', '        int fee = 500;', '        waive(fee);', '        System.out.println("fee " + fee);', '    }', '}');
Q('co_byvalue', co({
  pre: 'A fee of an imagined school office is waived in a method. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: cFees,
  sol: 'The argument variable fee of waive is a copy of the variable fee of main. Setting the copy to 0 leaves the original at 500.',
}));
Q('co_cafe', co({
  pre: 'A canteen program has a static variable, an instance variable, an argument variable and local variables. Write the exact output.',
  t: 2, d: 3, c: 'application',
  code: S.cCafe.replace('new Cafe(15)', 'new Cafe(25)').replace('c.order(4)', 'c.order(3)'),
  sol: 'The price is 25 and the quantity 3, so the local variable bill is 75 and the method returns it. The static variable served is increased by 3 and is read directly in the static method main.',
}));
Q('co_err_scope', co({
  pre: 'A variable is declared inside an if block and used after it. State the error reported by the compiler.',
  t: 2, d: 3, c: 'analysis', error: true,
  code: S.cIfScope,
  sol: 'The variable bonus exists only inside the braces of the if block. The last statement is outside the block, so the name is not known there.',
  scheme: [['Kind of error (compile-time) and its line', 1], ['Reason: the scope of bonus is the if block only', 1]],
}));
Q('co_err_static', co({
  pre: 'The main method of the program calls show. State the error reported by the compiler.',
  t: 2, d: 4, c: 'analysis', error: true,
  code: S.cVisitsMeth,
  sol: 'The method show is not static, so it belongs to an object. The static method main has no object, so the call needs one, for example new Visits().show().',
  scheme: [['Kind of error (compile-time) and its line', 1], ['Reason: a non-static method needs an object, main is static', 1]],
}));

// ---- short answers, t02
Q('s_static_inst', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [30, 100],
  stem: 'Distinguish between a static (class) variable and an instance variable.',
  model: `| Static (class) variable | Instance variable |\n|---|---|\n| Declared with the keyword static | Declared without static |\n| One copy shared by all the objects of the class | A separate copy for every object |\n| Created when the class is loaded and exists until the program ends | Created with the object and exists as long as the object does |\n\nExample: after three TokenDesk objects, the static variable next is ${ic(out(S.cTokenN(3)))}, while the instance variables token of the three objects are ${ic(out(S.cTokenIds))}.`,
  sol: 'Two points of difference, each stated for both variables, earn the marks; an example is welcome.',
  scheme: [['First point of difference stated for both', 1], ['Second point of difference stated for both', 1]],
}));
Q('s_scope_def', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'What is meant by the scope of a variable? State the scope of a local variable and of an argument variable.',
  model: `The **scope** of a variable is the part of the program in which the variable can be used.\n\nA **local variable** can be used from its declaration to the end of the block in which it is declared. An **argument variable** can be used only inside the body of its method or constructor. Outside its scope a name is unknown: ${ic('i')} used after its for loop gives "${errLoop}".`,
  sol: 'One mark for the meaning of scope and one for the scopes of the two kinds of variables.',
  scheme: [['Scope: the part of the program where the variable is available', 1], ['Scope of a local variable and of an argument variable', 1]],
}));
Q('s_identify', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `Identify the type (static, instance, argument or local) and the scope of each of the variables served, price, qty, bill, c and amount in the program below.\n\n${F(S.cCafe)}`,
  model: `| Variable | Type | Scope |\n|---|---|---|\n| served | static (class) variable | the whole class, for all objects |\n| price | instance variable | the whole class, for each object |\n| qty | argument variable of order | the method order |\n| bill | local variable of order | the method order |\n| c | local variable of main | the method main |\n| amount | local variable of main | the method main |\n\nThe program displays ${ic(out(S.cCafe))}.`,
  sol: 'A half mark for each pair of type and scope that is correct, up to a total of 2 marks.',
  scheme: [['served and price: type and scope correct', 1], ['qty, bill, c and amount: type and scope correct', 1]],
}));
Q('s_static_ctx', short({
  t: 2, d: 3, c: 'analysis', marks: 2, wl: [30, 100],
  stem: 'The statement count++; is written in the static method main of a class that declares the instance variable count. Why does the compiler reject it? How can the error be removed?',
  model: `The compiler reports "${errStaticVar}". An instance variable belongs to an object, but the static method main runs without any object, so it does not know whose count is meant.\n\nThe error is removed by creating an object and using its variable, as in ${ic('Visits v = new Visits(); v.count++;')} (the program then displays ${ic(out(S.cVisitsFix))}), or by declaring count static.`,
  sol: 'One mark for the reason and one for a correct remedy.',
  scheme: [['Reason: a static method cannot use an instance variable directly; no object exists', 1], ['Remedy: use an object, or make the variable static', 1]],
}));
Q('s_shadow', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: [30, 100],
  stem: 'A method has a parameter named level, and the class has a data member also named level. What happens to the data member when the statement level = level + 5; is executed in the method? How can the data member be reached?',
  model: `The parameter hides the data member, so level means the parameter; the statement changes only the parameter and the data member keeps its value (the program with this error displays ${ic(out(S.cGaugeBad))}, the initial value).\n\nThe data member is reached with the keyword **this**: ${ic('this.level = level + 5;')} stores the new value in the data member (the output is then ${ic(out(S.cGaugeOk))}).`,
  sol: 'One mark for the hiding of the data member by the parameter and one mark for this.level.',
  scheme: [['Parameter hides the data member; the data member is unchanged', 1], ['this.level used to reach the data member', 1]],
}));
Q('s_lifetime', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: [30, 100],
  stem: 'State the lifetime of a local variable, an instance variable and a static variable.',
  model: `A **local variable** (and an argument variable) is created when its method is called and destroyed when the method returns, so every call starts afresh: in the Tally program the three calls of bump() return ${ic(oline(S.cTally).split(' / ')[0])}, because the local variable starts at 0 each time.\n\nAn **instance variable** lives as long as its object. A **static variable** is created when the class is loaded and lives until the program ends.`,
  sol: 'One mark for the lifetime of the local variable, one for the lifetimes of the instance and static variables.',
  scheme: [['Local variable: from the call to the return of the method', 1], ['Instance variable: life of the object; static variable: life of the program', 1]],
}));
