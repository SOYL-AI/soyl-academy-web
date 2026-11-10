// ICSE 10 Computer Applications, ch06: Class as the Basis of all Computation. Topic t01 (members of a class).
// Every scenario is imagined for SOYL. Every output or error message quoted anywhere is produced by running the Java code.
import { Q, mcq, ar, tf, fb, short, co } from '../../icse-10-computer-applications-ch01/src/lib.mjs';
import { code, F, ic, ev, out, oline, oic, distinct, mustFail, full } from './q_util.mjs';

// ---- shared classes (used by slides, notes and items)
/** A metro smart card: three data members, four member methods, one local variable (bonus), two parameters. */
export const smartCard = code(
  'class SmartCard {',
  '    int cardNo;',
  '    double balance;',
  '    int trips;',
  '',
  '    void setCard(int no) {',
  '        cardNo = no;',
  '    }',
  '',
  '    void recharge(double amount) {',
  '        double bonus = 0;',
  '        if (amount >= 500)',
  '            bonus = 25;',
  '        balance = balance + amount + bonus;',
  '    }',
  '',
  '    boolean travel(double fare) {',
  '        if (balance >= fare) {',
  '            balance = balance - fare;',
  '            trips++;',
  '            return true;',
  '        }',
  '        return false;',
  '    }',
  '',
  '    void show() {',
  '        System.out.println("Card " + cardNo + ": balance " + balance + ", trips " + trips);',
  '    }',
  '}',
);
export const cardDriver = (rech, fare) => full(smartCard, 'SmartCard c = new SmartCard();', 'c.setCard(4501);', `c.recharge(${rech});`, `boolean ok = c.travel(${fare});`, 'c.show();', 'System.out.println(ok);');
/** A turnstile: one local variable that starts again at every call and one data member that keeps counting. */
export const turnstile = code(
  'class Turnstile {',
  '    int entries;',
  '',
  '    void enter() {',
  '        int today = 0;',
  '        today++;',
  '        entries++;',
  '        System.out.println(today + " " + entries);',
  '    }',
  '}',
);
export const turnDriver = (n) => full(turnstile, 'Turnstile t = new Turnstile();', ...Array(n).fill('t.enter();'));
/** A cricket scorer. */
export const scorer = code(
  'class CricketScorer {',
  '    int runs;',
  '    int wickets;',
  '',
  '    void hit(int r) {',
  '        runs = runs + r;',
  '    }',
  '',
  '    void out() {',
  '        wickets++;',
  '    }',
  '',
  '    double average() {',
  '        double avg = 0;',
  '        if (wickets > 0)',
  '            avg = (double) runs / wickets;',
  '        return avg;',
  '    }',
  '',
  '    void show() {',
  '        System.out.println(runs + "/" + wickets);',
  '    }',
  '}',
);
export const scorerDriver = (...body) => full(scorer, ...body);

// ================================================================ t01 members of a class
Q('m_members_count', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Study the class below.\n\n${F(smartCard)}\n\nHow many data members and how many member methods does the class SmartCard have?`,
  opts: distinct(['3 data members and 4 member methods', '5 data members and 4 member methods', '3 data members and 3 member methods', '4 data members and 2 member methods']),
  sol: 'The data members are the variables declared in the class outside every method: cardNo, balance and trips. The member methods are setCard, recharge, travel and show. The variables amount, bonus, no and fare are declared inside methods or in their headings, so they are not data members.',
}));
Q('m_local_var', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Study the class below.\n\n${F(smartCard)}\n\nWhich of the following is a local variable of a member method of this class?`,
  opts: distinct([ic('bonus'), ic('balance'), ic('cardNo'), ic('trips')]),
  sol: 'A local variable is declared inside the body of a method. Only bonus is declared that way (in recharge). balance, cardNo and trips are declared in the class outside the methods, so they are data members.',
}));
Q('m_param_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A member method of a class is declared as `boolean travel(double fare)`. What is `fare`?',
  opts: distinct(['A parameter that receives the value given in the call and exists only while the method runs', 'A data member that every object of the class shares', 'A local variable that is created by the new operator', 'The return type of the method']),
  sol: 'A name written in the brackets of a method heading is a (formal) parameter. It gets its value from the argument of the call, for example travel(35.5), and disappears when the method ends. The return type is the word boolean written before the method name.',
}));
Q('m_instance_def', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What is an instance variable of a class?',
  opts: distinct(['A variable declared in the class outside every method, of which each object has its own copy', 'A variable declared inside a method, which exists only during the call', 'A variable that stores the address of the class', 'A variable whose value can never change']),
  sol: 'Instance variables (data members, attributes) hold the state of an object. Each object created with new gets its own copy, so two objects can hold different values. A variable declared inside a method is a local variable.',
}));
Q('m_behaviour', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which part of a class describes what the objects of the class can do?',
  opts: distinct(['The member methods', 'The data members', 'The name of the class', 'The new operator']),
  sol: 'The behaviour of an object is defined by the member methods of its class. The data members describe its state, and new is only used to create an object.',
}));
Q('m_card_run', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A metro card is used with the program below. What does it display?\n\n${F(cardDriver(500, 35.5))}`,
  opts: distinct([oic(cardDriver(500, 35.5)), oic(cardDriver(450, 35.5)), oic(cardDriver(500, 900)), oic(full(smartCard, 'SmartCard c = new SmartCard();', 'c.setCard(4501);', 'c.recharge(500);', 'boolean ok = c.travel(35.5);', 'ok = c.travel(35.5);', 'c.show();', 'System.out.println(ok);'))]),
  sol: 'The amount 500 earns the bonus of 25, so recharge makes the balance 525.0. travel(35.5) finds enough balance, subtracts the fare, adds one to trips and returns true. Without the bonus the balance would be lower, a fare of 900 would be refused, and a second journey would add one more trip.',
}));
Q('m_scope_life', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'In the class SmartCard, `bonus` is declared inside the method recharge, while `balance` is declared in the class. Which statement is correct?',
  opts: distinct(['bonus is created at each call of recharge and lost when the call ends; balance lasts as long as its object', 'bonus keeps its value between calls; balance is created again at each call', 'Both are created again at each call of recharge', 'Both last as long as the program runs']),
  sol: 'A local variable is created when its method is called and destroyed when the method returns, so it starts afresh at every call. A data member belongs to the object and keeps its value for as long as the object exists.',
}));
const errVoid = mustFail(full(smartCard, 'SmartCard c = new SmartCard();', 'int n = c.show();'), 'void value');
Q('m_void_use', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The class SmartCard is given below. With the declaration \`SmartCard c = new SmartCard();\` in main, which one of the following statements will not compile?\n\n${F(smartCard)}`,
  opts: distinct([ic('int n = c.show();'), ic('boolean ok = c.travel(20);'), ic('c.recharge(100);'), ic('c.travel(20);')]),
  sol: `show is declared void, so it returns no value that could be stored in n; javac reports "${errVoid}". travel returns a boolean, so its value can be stored in ok or ignored, and recharge is a void method that is simply called.`,
}));
Q('m_reads_only', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which member method of the class SmartCard never changes the state of the object?\n\n${F(smartCard)}`,
  opts: distinct([ic('show'), ic('setCard'), ic('recharge'), ic('travel')]),
  sol: 'show only reads the data members and prints them. setCard assigns cardNo, recharge always changes balance, and travel changes balance and trips when the fare can be paid.',
}));

Q('ar_state_each', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Two objects of the class SmartCard can show different balances at the same time.',
  r: 'Every object of a class has its own copy of the instance variables.',
  sol: `Run with two cards, ${ic(oline(full(smartCard, 'SmartCard a = new SmartCard();', 'SmartCard b = new SmartCard();', 'a.recharge(100);', 'b.recharge(40);', 'a.show();', 'b.show();')))} shows two different balances, so (A) is true. (R) is also true and it is the reason: recharging a changes only the balance stored in a.`,
}));
Q('tf_local_keep', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? A local variable declared inside a member method keeps its value from one call of the method to the next.',
  sol: `A local variable is created afresh at every call. In class Turnstile the local variable today and the data member entries are both increased at each call, yet three calls print ${ic(oline(turnDriver(3)))}: today starts again from 0 while entries keeps counting.`,
}));
Q('fb_members', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The variables declared in a class outside its methods are called ___, and the functions defined in the class are called ___.',
  acc: [['data members', 'instance variables', 'member variables', 'attributes'], ['member methods', 'methods', 'member functions']],
  sol: 'Data members (instance variables, attributes) hold the state of an object; member methods define its behaviour.',
}));

// ---- code output, t01
Q('co_card_short', co({
  pre: 'A metro card holds only Rs 40 and the fare is Rs 55. Write the exact output of the program.',
  t: 1, d: 3, c: 'application',
  code: full(smartCard, 'SmartCard c = new SmartCard();', 'c.setCard(77);', 'c.recharge(40);', 'boolean ok = c.travel(55);', 'c.show();', 'System.out.println(ok);'),
  sol: 'The amount 40 is below 500, so no bonus is added and balance becomes 40.0. In travel the test balance >= fare is false, so the if block is skipped, the balance and trips are unchanged and the method returns false.',
}));
Q('co_two_cards', co({
  pre: 'Two metro cards are used as shown. Write the exact output of the program.',
  t: 1, d: 3, c: 'application',
  code: full(smartCard, 'SmartCard a = new SmartCard();', 'SmartCard b = new SmartCard();', 'a.recharge(500);', 'b.recharge(100);', 'a.travel(30);', 'b.travel(30);', 'a.travel(30);', 'a.show();', 'b.show();'),
  sol: 'Each object has its own balance and trips. Object a: 500 plus the bonus 25 is 525, then two fares of 30 leave 465.0 with 2 trips. Object b: 100 less one fare of 30 leaves 70.0 with 1 trip. The calls on a never touch b.',
}));
Q('co_turnstile', co({
  pre: 'The class below counts the visitors who pass a gate. Write the exact output of the program.',
  t: 1, d: 4, c: 'analysis',
  code: turnDriver(3),
  sol: 'today is a local variable of enter: it is created as 0 at every call, so it is always 1 after today++. entries is a data member of the object t: it is not reset, so it grows by one at each call.',
}));
Q('co_err_bonus', co({
  pre: 'A student tries to read the variable bonus of recharge from main, as shown. State the error that the compiler reports.',
  t: 1, d: 3, c: 'analysis', error: true,
  code: full(smartCard, 'SmartCard c = new SmartCard();', 'c.recharge(100);', 'System.out.println(c.bonus);'),
  sol: 'bonus is a local variable of the method recharge. It exists only inside that method, so the object c has no member of that name that main can read.',
  scheme: [['Compile-time error with the correct line', 1], ['Reason: bonus is local to recharge and not a member of the object', 1]],
}));

// ---- short answers, t01
Q('s_members', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: [25, 90],
  stem: 'What are data members and member methods of a class? Name those of the class SmartCard given above (cardNo, balance, trips, setCard, recharge, travel and show).',
  model: 'The **data members** (member variables, attributes) are the variables declared in the class outside its methods; they hold the **state** of each object. The **member methods** are the functions of the class; they describe the **behaviour** of the objects and work on the data members.\n\nIn SmartCard the data members are `cardNo`, `balance` and `trips`; the member methods are `setCard`, `recharge`, `travel` and `show`.',
  sol: 'One mark for the two meanings and one mark for naming the members of the class correctly.',
  scheme: [['Data members: variables of the class that hold the state; member methods: functions that give the behaviour', 1], ['Members of SmartCard named correctly (3 data members, 4 member methods)', 1]],
}));
Q('s_local_instance', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: [25, 90],
  stem: 'Distinguish between an instance variable and a local variable. Give one example of each from the class Turnstile.',
  model: 'An **instance variable** is declared in the class outside the methods; every object has its own copy, which lasts as long as the object and is given a default value (0 for an int). A **local variable** is declared inside a method; it is created at each call, lost when the method ends, and gets no default value.\n\nIn Turnstile, `entries` is an instance variable and `today` is a local variable of `enter`.',
  sol: 'One mark for the difference (place of declaration, life or default value) and one for the two examples.',
  scheme: [['Difference: where declared and how long it lasts (or default value)', 1], ['Correct examples: entries and today', 1]],
}));
Q('s_change_state', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Explain, with the method recharge of the class SmartCard, how a member method changes the state of an object. What is the balance of a new card after recharge(200)?',
  model: `A member method can assign new values to the data members of the object it is called on, and that changes the object's state. The statement ${ic('balance = balance + amount + bonus;')} in recharge adds the amount to the data member balance.

For a new card, c.recharge(200) leaves the balance at **${out(full(smartCard, 'SmartCard c = new SmartCard();', 'c.recharge(200);', 'System.out.println(c.balance);'))}**: 200 is below 500, so no bonus is added to the starting 0.0.`,
  sol: 'One mark for explaining that the method assigns to data members, and one mark for the balance, found by running the call.',
  scheme: [['A method assigns new values to the data members, which changes the state', 1], ['Balance after recharge(200) found correctly (no bonus)', 1]],
}));
Q('s_identify', short({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: `Study the class below.\n\n${F(scorer)}\n\nName (i) its instance variables, (ii) the parameter, (iii) the local variable and (iv) the method that returns a value, with its return type.`,
  model: '(i) Instance variables: `runs` and `wickets`.\n(ii) Parameter: `r` of the method `hit`.\n(iii) Local variable: `avg` in the method `average`.\n(iv) The method `average` returns a value, and its return type is `double`.',
  sol: 'Half a mark for each part: variables declared in the class outside methods are instance variables; the name in a method heading is the parameter; a variable declared inside a method body is local; a non-void method returns a value.',
  scheme: [['(i) and (ii) correct', 1], ['(iii) and (iv) correct, with the return type', 1]],
}));
