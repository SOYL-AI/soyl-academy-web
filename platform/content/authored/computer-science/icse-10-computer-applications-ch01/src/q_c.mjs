// ICSE 10 Computer Applications, ch01 — question bank, part C: 15-mark programs. Each model answer is a complete
// BlueJ-style program that is compiled and run with its sample input; the output shown is the real output.
import { Q, long, javaOut } from './lib.mjs';
import { J, T, expect } from './h.mjs';
import { P_STUDENT, P_FAN, P_PARKING, P_CARD, P_BULB, P_CARTON, P_TEACHER } from './programs.mjs';

/** Model answer: program, sample input, real output, variable description table, optional remark. */
function model(P, inputNote, remark = '') {
  const output = javaOut(P.code, { stdin: P.stdin });
  const rows = P.vars.map(([v, t, p]) => `| ${v} | ${t} | ${p} |`).join('\n');
  return `${J(P.code)}\n\n**Sample input** (${inputNote}): \`${P.input}\`\n\n**Output**\n\n${T(output)}\n\n**Variable description**\n\n| Variable | Type | Purpose |\n|---|---|---|\n${rows}${remark ? `\n\n${remark}` : ''}`;
}

Q('l_student', long({
  t: [3, 4], d: 3, c: 'application', marks: 15, time: 1200,
  stem: 'Lakeview School keeps the result of each Class 10 student on a computer. Write a Java program with a class **Student** that has the data members name (String), m1, m2 and m3 (int marks in three subjects) and average (double). The class has the methods accept() to read the name and the three marks, compute() to find the average of the three marks, and display() to print the name, the total marks and the average. In main, create an object, then call the three methods in this order. The input is the name followed by the three marks. Show the output for the sample input given in your answer.',
  model: model(P_STUDENT, 'name, then the three marks'),
  sol: 'A class with data members and three methods; the average is found with 3.0 so that the division is not an integer division; main creates one object and sends it three messages in order.',
  scheme: [['Class header and data members declared correctly', 3], ['accept() reads the name and three marks with Scanner', 2], ['compute() finds the average without integer division', 3], ['display() prints name, total and average', 3], ['main creates the object and calls the methods in order', 2], ['Variable description or comments', 2]],
}));
Q('l_fan', long({
  t: [3, 4], d: 4, c: 'application', marks: 15, time: 1200,
  stem: 'A fan in an imagined school hall has speeds from 0 (off) to 5. Write a Java program with a class **Fan** that has the data members speed and max (the highest speed, 5). The class has the methods setSpeed(int s), which sets the speed only if s is from 0 to max, faster(), which raises the speed by one but never above max, slower(), which lowers it by one but never below 0, and display(), which prints the present speed. In main, read the starting speed, the number of times the faster button is pressed and the number of times the slower button is pressed; create the object, set the starting speed and display the speed; then press the buttons as many times as read, displaying the speed after each group of presses.',
  model: model(P_FAN, 'starting speed, faster presses, slower presses', 'The state of the object, speed, is changed only through its methods, and the checks inside the methods keep it between 0 and max.'),
  sol: 'Each method guards the state with a condition; main repeats faster() and slower() with loops and displays the state after each phase.',
  scheme: [['Class header, data members and max declared', 2], ['setSpeed() accepts only a speed from 0 to max', 3], ['faster() and slower() with the limits', 4], ['display() and input of the three numbers', 2], ['main: object, loops and the order of calls', 2], ['Variable description or comments', 2]],
}));
Q('l_parking', long({
  t: [3, 4], d: 4, c: 'application', marks: 15, time: 1200,
  stem: 'The imagined Riverside bus stand charges for parking as follows: Rs. 20 for the first hour, Rs. 15 for every later hour, and never more than Rs. 100 for one ticket. Write a Java program with a class **ParkingTicket** that has the data members vehicle (String), hours (int) and fee (int). The methods are accept() to read the vehicle number and the hours parked, calculate() to find the fee, and display() to print the vehicle, the hours and the fee. In main, create an object and call the methods in order. The input is the vehicle number followed by the hours.',
  model: model(P_PARKING, 'vehicle number, then hours'),
  sol: 'The first hour is charged separately, later hours are added with (hours - 1) * 15, and the fee is limited to 100 with a second if statement.',
  scheme: [['Class header and data members', 2], ['accept() reads the vehicle number and hours', 2], ['calculate(): first hour and later hours', 3], ['calculate(): upper limit of 100', 2], ['display() with correct format', 2], ['main creates the object and calls the methods', 2], ['Variable description or comments', 2]],
}));
Q('l_card', long({
  t: [3, 4], d: 4, c: 'application', marks: 15, time: 1200,
  stem: 'The imagined Greenfield Library lets a member hold at most 3 books at a time. Write a Java program with a class **LibraryCard** that has the data members cardNo (int), holder (String), issued (int, books held at present) and limit (int, 3). The methods are accept() to read the card number and the holder\'s name, issue(int n), which issues n books and prints how many were issued only if the member would still hold at most limit books, and otherwise prints a message that the limit is exceeded, giveBack(int n), which reduces issued by n when n is not more than issued, and display() to print the card number, the holder and the books held. In main, create an object, read the card details, ask the object to issue 2 books, then 2 books again, give back 1 book and display the card. The input is the card number followed by the holder\'s name.',
  model: model(P_CARD, 'card number, then holder'),
  sol: 'The condition issued + n <= limit protects the limit; the second issue(2) is refused because 2 + 2 is more than 3, so only the first issue and the giveBack change the state.',
  scheme: [['Class header and data members including limit', 2], ['accept() reads cardNo and holder', 2], ['issue(): condition and both messages', 4], ['giveBack() with its check', 2], ['display() and the calls in main in the stated order', 3], ['Variable description or comments', 2]],
}));
Q('l_bulb', long({
  t: [3, 4], d: 3, c: 'application', marks: 15, time: 1200,
  stem: 'An imagined hostel pays Rs. 7.5 per unit of electricity, where one unit is 1000 watt-hours. Write a Java program with a class **Bulb** that has the data members watts (int), hoursPerDay (double) and rate (double, 7.5). The methods are accept() to read the watts and the hours the bulb is on each day, units(int days), which returns the units used in the given number of days, bill(int days), which returns the amount payable using units(), and display(int days), which prints the units and the bill. In main, create an object, read the details and display the results for 30 days. The input is the watts followed by the hours per day.',
  model: model(P_BULB, 'watts, then hours per day'),
  sol: 'units() returns watts * hoursPerDay * days / 1000; bill() calls units() and multiplies by rate; display() prints both. One method calling another is message passing inside the same object.',
  scheme: [['Class header and data members with the rate', 2], ['accept() reads watts and hours', 2], ['units() returns the correct value', 3], ['bill() uses units() and the rate', 3], ['display() and main with 30 days', 3], ['Variable description or comments', 2]],
}));
Q('l_carton', long({
  t: [3, 4], d: 3, c: 'application', marks: 15, time: 1200,
  stem: 'A packing unit in an imagined spice factory makes cuboid cartons. Write a Java program with a class **Carton** that has the data members length, breadth and height (all int, in centimetres), volume (int) and area (int, total outer surface area). The methods are accept() to read the three sizes, compute() to find the volume and the total surface area, and display() to print both with their units. In main, create an object and call the methods in order. The input is the length, breadth and height.',
  model: model(P_CARTON, 'length, breadth, height'),
  sol: 'Volume is length * breadth * height; the total surface area is 2 * (lb + bh + lh), written with the three products added inside brackets before doubling.',
  scheme: [['Class header and data members', 2], ['accept() reads the three sizes', 2], ['compute(): volume', 2], ['compute(): surface area with correct brackets', 3], ['display() with units', 2], ['main creates the object and calls the methods', 2], ['Variable description or comments', 2]],
}));
Q('l_teacher', long({
  t: [3, 4], d: 3, c: 'application', marks: 15, time: 1200,
  stem: 'The imagined Hillcrest School works out each teacher\'s monthly pay from the basic pay: dearness allowance is 35% of basic, house rent allowance is 20% of basic, and provident fund of 10% of basic is deducted. Write a Java program with a class **Teacher** that has the data members name (String) and basic, da, hra, pf and net (all double). The methods are accept() to read the name and the basic pay, compute() to find the allowances, the deduction and the net salary, and display() to print the name, the total of the two allowances, the deduction and the net salary. In main, create an object and call the methods in order. The input is the name followed by the basic pay.',
  model: model(P_TEACHER, 'name, then basic pay'),
  sol: 'da, hra and pf are percentages of basic; net salary is basic plus the two allowances minus the deduction. Multiplying before dividing by 100 keeps the values exact here.',
  scheme: [['Class header and data members', 2], ['accept() reads the name and basic pay', 2], ['compute(): da, hra and pf', 3], ['compute(): net salary', 2], ['display() prints the four items', 2], ['main creates the object and calls the methods', 2], ['Variable description or comments', 2]],
}));

// The numbers quoted in the model answers' explanations above.
expect(javaOut(P_STUDENT.code, { stdin: P_STUDENT.stdin }).split('\n')[2], 'Average : 85.0', 'student average');
expect(javaOut(P_CARTON.code, { stdin: P_CARTON.stdin }).split('\n')[0], 'Volume       : 60000 cubic cm', 'carton volume');
