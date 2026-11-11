// ICSE 10 Computer Applications, ch07: User-defined Methods. Programs shared by the question files and the build.
// Every scenario is imagined for SOYL. Every output or message quoted anywhere is produced by running these programs.
import { J } from './q_util.mjs';

// ---------------------------------------------------------------- t01 / t02: header, void, return, parameters
export const pDairy = J`
public class Dairy {
    public static double milkBill(int litres, double rate) {
        return litres * rate;
    }
    public static void main(String[] args) {
        double amount = milkBill(12, 56.5);
        System.out.println("Amount = " + amount);
    }
}`;
export const pNotice = J`
public class Notice {
    static void greet(String name) {
        System.out.println("Welcome, " + name);
    }
    public static void main(String[] args) {
        greet("Meera");
        greet("Imran");
        System.out.println("Done");
    }
}`;
export const pBand = (a) => J`
public class AgeBand {
    static String band(int age) {
        if (age < 13)
            return "Child";
        if (age < 20)
            return "Teen";
        return "Adult";
    }
    public static void main(String[] args) {
        System.out.println(${a});
    }
}`;
export const pKinds = J`
public class Kinds {
    static int cube(int n) {
        return n * n * n;
    }
    static double half(int n) {
        return n / 2.0;
    }
    static boolean isEven(int n) {
        return n % 2 == 0;
    }
    static char initial(String s) {
        return s.charAt(0);
    }
    static String label(int n) {
        return "No. " + n;
    }
    public static void main(String[] args) {
        System.out.println(cube(3));
        System.out.println(half(7));
        System.out.println(isEven(10));
        System.out.println(initial("Kavya"));
        System.out.println(label(5));
    }
}`;
export const pFare = J`
public class FareCalc {
    static int fare(int km, int rate) {
        return km * rate;
    }
    public static void main(String[] args) {
        int distance = 7, perKm = 12;
        int total = fare(distance, perKm);
        System.out.println(total);
        System.out.println(fare(3, 15));
    }
}`;
export const pUnreach = J`
public class Twice {
    static int twice(int n) {
        return n * 2;
        System.out.println("done");
    }
    public static void main(String[] args) {
        System.out.println(twice(4));
    }
}`;
export const pMissing = J`
public class SignTest {
    static int sign(int n) {
        if (n > 0)
            return 1;
        else if (n < 0)
            return -1;
    }
    public static void main(String[] args) {
        System.out.println(sign(-8));
    }
}`;
export const pVoidValue = J`
public class Logger {
    static void note(int n) {
        return n;
    }
    public static void main(String[] args) {
        note(3);
    }
}`;
export const pLossy = J`
public class Halver {
    static double half(int n) {
        return n / 2.0;
    }
    public static void main(String[] args) {
        int h = half(7);
        System.out.println(h);
    }
}`;
export const pArgs = J`
public class FareCalc {
    static int fare(int km, int rate) {
        return km * rate;
    }
    public static void main(String[] args) {
        System.out.println(fare(7));
    }
}`;
export const pUseVoid = J`
public class Notice {
    static void greet(String name) {
        System.out.println("Welcome, " + name);
    }
    public static void main(String[] args) {
        int r = greet("Meera");
    }
}`;
export const pReturnTypeWrong = J`
public class Trim {
    static int wrongKind(int n) {
        return "ten";
    }
    public static void main(String[] args) {
        System.out.println(wrongKind(3));
    }
}`;

// ---------------------------------------------------------------- t03: pass by value
export const pSwap = (x, y) => J`
public class SwapTest {
    static void swap(int a, int b) {
        int t = a;
        a = b;
        b = t;
        System.out.println("In swap: " + a + " " + b);
    }
    public static void main(String[] args) {
        int x = ${x}, y = ${y};
        swap(x, y);
        System.out.println("In main: " + x + " " + y);
    }
}`;
export const pRaise = J`
public class PayRise {
    static void raise(int pay) {
        pay = pay + 500;
        System.out.println("Inside: " + pay);
    }
    public static void main(String[] args) {
        int salary = 8000;
        raise(salary);
        System.out.println("Outside: " + salary);
    }
}`;
export const pRaiseRet = J`
public class PayRise {
    static int raise(int pay) {
        return pay + 500;
    }
    public static void main(String[] args) {
        int salary = 8000;
        salary = raise(salary);
        System.out.println("Outside: " + salary);
    }
}`;
export const pShrink = J`
public class Countdown {
    static void shrink(int n) {
        while (n > 2)
            n = n - 3;
        System.out.println("n inside = " + n);
    }
    public static void main(String[] args) {
        int n = 10;
        shrink(n);
        System.out.println("n in main = " + n);
    }
}`;
export const pParcel = J`
class Parcel {
    int weight;
}
public class Dispatch {
    static void addPacking(Parcel p) {
        p.weight = p.weight + 200;
    }
    public static void main(String[] args) {
        Parcel box = new Parcel();
        box.weight = 1500;
        addPacking(box);
        System.out.println(box.weight);
    }
}`;

// ---------------------------------------------------------------- t04: static and non-static
export const pTuition = J`
public class Tuition {
    int fee = 900;
    static String centre() {
        return "Sunrise Tuition";
    }
    int total(int months) {
        return fee * months;
    }
    public static void main(String[] args) {
        System.out.println(centre());
        Tuition t = new Tuition();
        System.out.println(t.total(3));
    }
}`;
export const pTuitionBadCall = J`
public class Tuition {
    int fee = 900;
    int total(int months) {
        return fee * months;
    }
    public static void main(String[] args) {
        System.out.println(total(3));
    }
}`;
export const pTuitionBadField = J`
public class Tuition {
    int fee = 900;
    static int yearly() {
        return fee * 12;
    }
    public static void main(String[] args) {
        System.out.println(yearly());
    }
}`;
export const pTools = J`
class NumTools {
    static int digitSum(int n) {
        int s = 0;
        while (n > 0) {
            s = s + n % 10;
            n = n / 10;
        }
        return s;
    }
}
public class UseTools {
    public static void main(String[] args) {
        System.out.println(NumTools.digitSum(4821));
        System.out.println(NumTools.digitSum(90));
    }
}`;
export const pTea = J`
public class TeaStall {
    int cups = 30;
    void sell(int n) {
        cups = cups - n;
    }
    int left() {
        return cups;
    }
    public static void main(String[] args) {
        TeaStall a = new TeaStall();
        TeaStall b = new TeaStall();
        a.sell(8);
        a.sell(5);
        b.sell(10);
        System.out.println(a.left() + " " + b.left());
    }
}`;

// ---------------------------------------------------------------- t05: pure and impure
export const pRates = J`
public class Rates {
    int stock = 50;
    int square(int n) {
        return n * n;
    }
    int issue(int n) {
        stock = stock - n;
        return stock;
    }
    public static void main(String[] args) {
        Rates r = new Rates();
        System.out.println(r.square(6) + " " + r.square(6));
        System.out.println(r.issue(10) + " " + r.issue(10));
    }
}`;

// ---------------------------------------------------------------- t06: overloading
export const pSolids = J`
public class Solids {
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
        System.out.println(volume(4));
        System.out.println(volume(5, 3, 2));
        System.out.println(volume(10.0, 2.0));
    }
}`;
export const pShow = (calls) => J`
public class ShowDemo {
    static void show(int n) {
        System.out.println("int version: " + n);
    }
    static void show(double d) {
        System.out.println("double version: " + d);
    }
    public static void main(String[] args) {
        ${calls}
    }
}`;
export const pAmbig = J`
public class Mixer {
    static void mix(int a, double b) {
        System.out.println("int, double");
    }
    static void mix(double a, int b) {
        System.out.println("double, int");
    }
    public static void main(String[] args) {
        mix(2, 3);
    }
}`;
export const pRetOnly = J`
public class Plots {
    static int area(int s) {
        return s * s;
    }
    static double area(int s) {
        return s * s * 1.0;
    }
    public static void main(String[] args) {
        System.out.println(area(4));
    }
}`;
export const pGreet = J`
public class Greeter {
    static String greet(String name) {
        return "Namaste, " + name;
    }
    static String greet(String name, int times) {
        String s = "";
        for (int i = 1; i <= times; i++)
            s = s + greet(name) + ". ";
        return s.trim();
    }
    static String greet(int times, String name) {
        return times + " greetings for " + name;
    }
    public static void main(String[] args) {
        System.out.println(greet("Asha"));
        System.out.println(greet("Asha", 2));
        System.out.println(greet(3, "Asha"));
    }
}`;
