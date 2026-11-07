// CBSE 9 Mathematics ch05 Linear Equations in Two Variables: written items (short 2 and 3 marks, long 5 marks, case-based).
// Solutions are recomputed by substituting into the equation and by solving for the missing value.
import { Q, caseQ, child, mk, plot } from './lib.mjs';
import { r, must, close, range, lin, sat } from './h.mjs';

// =============================================================== short answer, 2 marks
Q('s201', mk.short({ marks: 2, stem: r`Write $3x = 5y + 7$ in the form $ax + by + c = 0$ and state the values of $a$, $b$ and $c$.`, model: r`Move all terms to the left: $3x - 5y - 7 = 0$.\n\nSo $a = 3$, $b = -5$ and $c = -7$.`, sol: 'Bring every term to one side so that the other side is zero.', scheme: [['3x - 5y - 7 = 0', 1], ['a = 3, b = -5, c = -7', 1]], d: 1, c: 'understanding', t: [1], time: 75 }), (Cx) => { Cx.assert(lin(3, -5, -7) === '3x - 5y - 7 = 0' && [[0, 0], [4, 1.0], [-2, -2.6]].every(([x, y]) => close(3 * x - (5 * y + 7), 3 * x - 5 * y - 7)), 'rearrangement'); Cx.model([3, 5, 7]); });
Q('s202', mk.short({ marks: 2, stem: r`A shop in Coimbatore sells rice at ₹$x$ per kg and dal at ₹$y$ per kg. Meena pays ₹690 for $5$ kg of rice and $3$ kg of dal. Write a linear equation in $x$ and $y$, and check that rice at ₹60 and dal at ₹130 fits it.`, model: r`The cost of $5$ kg of rice is $5x$ and of $3$ kg of dal is $3y$, so $5x + 3y = 690$, that is, $5x + 3y - 690 = 0$.\n\nFor $x = 60$ and $y = 130$: $5 \times 60 + 3 \times 130 = 300 + 390 = 690$, so the prices fit.`, sol: 'Total cost is the sum of the two costs.', scheme: [['5x + 3y = 690', 1], ['300 + 390 = 690 for (60, 130)', 1]], d: 2, c: 'application', t: [1], time: 90 }), (Cx) => { Cx.assert(sat(5, 3, -690, 60, 130) && 5 * 60 === 300 && 3 * 130 === 390, '(60, 130)'); Cx.model([5, 3, 690, 60, 130, 300, 390]); });
Q('s203', mk.short({ marks: 2, stem: r`Find any three different solutions of the equation $x + 2y = 9$.`, model: r`Choose a value of $x$ and solve for $y$.\n\nFor $x = 1$: $2y = 8$, so $y = 4$. For $x = 3$: $2y = 6$, so $y = 3$. For $x = 5$: $2y = 4$, so $y = 2$.\n\nThree solutions are $(1, 4)$, $(3, 3)$ and $(5, 2)$.`, sol: 'Choose x, then find y from the equation.', scheme: [['Method: choose x and solve for y', 1], ['Three correct pairs', 1]], d: 1, c: 'understanding', t: [1], time: 90 }), (Cx) => { Cx.assert([[1, 4], [3, 3], [5, 2]].every(([x, y]) => sat(1, 2, -9, x, y)) && new Set([1, 3, 5]).size === 3, 'three solutions'); Cx.model([1, 4, 3, 5, 2]); });
Q('s204', mk.short({ marks: 2, stem: r`The point $(4, k)$ lies on the graph of $3x - 2y = 8$. Find $k$.`, model: r`Put $x = 4$ and $y = k$: $3 \times 4 - 2k = 8$, so $12 - 2k = 8$.\n\nThen $2k = 4$ and $k = 2$.`, sol: 'Substitute the coordinates of the point into the equation.', scheme: [['12 - 2k = 8', 1], ['k = 2', 1]], d: 2, c: 'understanding', t: [1, 2], time: 75 }), (Cx) => { const k = (3 * 4 - 8) / 2; Cx.assert(sat(3, -2, -8, 4, k), 'k = 2'); Cx.model([12, 8, 4, 2]); });
Q('s205', mk.short({ marks: 2, stem: r`Find the points where the graph of $4x + 5y = 20$ meets the $x$-axis and the $y$-axis.`, model: r`On the $x$-axis $y = 0$: $4x = 20$, so $x = 5$. The point is $(5, 0)$.\n\nOn the $y$-axis $x = 0$: $5y = 20$, so $y = 4$. The point is $(0, 4)$.`, sol: 'Put y = 0 for the x-axis and x = 0 for the y-axis.', scheme: [['(5, 0) on the x-axis', 1], ['(0, 4) on the y-axis', 1]], d: 1, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert(sat(4, 5, -20, 5, 0) && sat(4, 5, -20, 0, 4) && 20 / 4 === 5 && 20 / 5 === 4, 'intercepts'); Cx.model([5, 4, 20]); });
Q('s206', mk.short({ marks: 2, stem: r`Write the equation of the line through the point $(-3, 7)$ that is (i) parallel to the $y$-axis and (ii) parallel to the $x$-axis.`, model: r`(i) A line parallel to the $y$-axis has the same $x$-coordinate everywhere, so its equation is $x = -3$.\n\n(ii) A line parallel to the $x$-axis has the same $y$-coordinate everywhere, so its equation is $y = 7$.`, sol: 'Keep the x-coordinate fixed for a vertical line and the y-coordinate fixed for a horizontal line.', scheme: [['x = -3', 1], ['y = 7', 1]], d: 1, c: 'understanding', t: [2], time: 75 }), (Cx) => { Cx.assert([-9, 0, 4].every((t) => [-3, t][0] === -3 && [t, 7][1] === 7), 'fixed coordinates'); Cx.model([3, 7]); });
Q('s207', mk.short({ marks: 2, stem: r`A plumber in Jaipur charges ₹$y$ for a job of $x$ hours, where $y = 180x + 250$. What do the numbers $250$ and $180$ mean on the graph of this equation? Find the charge for a $3$ hour job.`, model: r`The graph meets the $y$-axis at $(0, 250)$, so $250$ is the fixed visiting charge for $0$ hours of work. The number $180$ is the rate: the charge rises by ₹180 for every extra hour.\n\nFor $x = 3$: $y = 180 \times 3 + 250 = 540 + 250 = 790$ rupees.`, sol: 'The y-intercept is the fixed charge and the rise for one unit of x is the rate.', scheme: [['250 is the fixed charge, 180 the rate per hour', 1], ['790 rupees', 1]], d: 2, c: 'application', t: [2], time: 90 }), (Cx) => { const y = (x) => 180 * x + 250; Cx.assert(y(0) === 250 && y(1) - y(0) === 180 && y(3) === 790, 'intercept, rate, 790'); Cx.model([250, 180, 540, 790]); });

// =============================================================== short answer, 3 marks
Q('s301', mk.short({ marks: 3, stem: r`Anil's father is $5$ years older than three times Anil's age. Let Anil's age be $x$ years and his father's age be $y$ years. (i) Write a linear equation in $x$ and $y$. (ii) Find the father's age when Anil is $12$. (iii) The pair $(40, 125)$ satisfies the equation. Does it give a sensible pair of ages? Why?`, model: r`(i) $y = 3x + 5$, that is, $3x - y + 5 = 0$.\n\n(ii) For $x = 12$: $y = 3 \times 12 + 5 = 41$ years.\n\n(iii) $3 \times 40 + 5 = 125$, so $(40, 125)$ satisfies the equation, but a father aged $125$ with a son aged $40$ is not a sensible pair of real ages. A solution of the equation need not suit the situation.`, sol: 'Translate the sentence into an equation, then substitute.', scheme: [['3x - y + 5 = 0', 1], ['41 years', 1], ['(40, 125) satisfies the equation but is not realistic', 1]], d: 2, c: 'application', t: [1], time: 150 }), (Cx) => { Cx.assert(sat(3, -1, 5, 12, 41) && sat(3, -1, 5, 40, 125), 'equation and (40, 125)'); Cx.model([3, 5, 12, 41, 40, 125]); });
Q('s302', mk.short({ marks: 3, stem: r`Which of the pairs $(1, 3)$, $(2, 1)$ and $(-1, 5)$ are solutions of $2x + y = 5$? Show your working for each pair.`, model: r`For $(1, 3)$: $2 \times 1 + 3 = 5$, so it is a solution.\n\nFor $(2, 1)$: $2 \times 2 + 1 = 5$, so it is a solution.\n\nFor $(-1, 5)$: $2 \times (-1) + 5 = 3$, which is not $5$, so it is not a solution.`, sol: 'Substitute each pair in the left side and compare with 5.', scheme: [['(1, 3) is a solution', 1], ['(2, 1) is a solution', 1], ['(-1, 5) is not a solution', 1]], d: 1, c: 'understanding', t: [1], time: 120 }), (Cx) => { Cx.assert(sat(2, 1, -5, 1, 3) && sat(2, 1, -5, 2, 1) && !sat(2, 1, -5, -1, 5) && 2 * -1 + 5 === 3, 'two solutions, one not'); Cx.model([2, 1, 3, 5]); });
Q('s303', mk.short({ marks: 3, stem: r`Find the values of $y$ for $x = 0$, $x = 2$ and $x = 4$ in the equation $3x - 2y = 6$, and explain why this equation has infinitely many solutions.`, model: r`For $x = 0$: $-2y = 6$, so $y = -3$. For $x = 2$: $6 - 2y = 6$, so $y = 0$. For $x = 4$: $12 - 2y = 6$, so $y = 3$.\n\nThe pairs are $(0, -3)$, $(2, 0)$ and $(4, 3)$. For every value we choose for $x$, the equation gives one value $y = \dfrac{3x - 6}{2}$, and we can choose $x$ in infinitely many ways, so there are infinitely many solutions.`, sol: 'Solve for y after choosing each x.', scheme: [['y = -3 at x = 0', 0.5], ['y = 0 at x = 2', 0.5], ['y = 3 at x = 4', 0.5], ['Each chosen x gives a y', 1], ['Infinitely many choices of x', 0.5]], d: 2, c: 'understanding', t: [1], time: 120 }), (Cx) => { const y = (x) => (3 * x - 6) / 2; Cx.assert(y(0) === -3 && y(2) === 0 && y(4) === 3 && sat(3, -2, -6, 0, -3) && sat(3, -2, -6, 2, 0) && sat(3, -2, -6, 4, 3), 'three solutions'); Cx.model([0, 3, 2, 4, 6, 12]); });
Q('s304', mk.short({ marks: 3, stem: r`Make a table of three solutions of $2x - y = 4$, and write the points where its graph meets the $x$-axis and the $y$-axis.`, model: r`Write $y = 2x - 4$.\n\n| $x$ | $0$ | $2$ | $3$ |\n| --- | --- | --- | --- |\n| $y$ | $-4$ | $0$ | $2$ |\n\nThe graph meets the $x$-axis where $y = 0$, that is at $(2, 0)$, and the $y$-axis where $x = 0$, that is at $(0, -4)$.`, sol: 'Make y the subject, tabulate, then use y = 0 and x = 0.', scheme: [['y = 2x - 4', 1], ['Three correct solutions', 1], ['(2, 0) and (0, -4)', 1]], d: 2, c: 'understanding', t: [2], time: 150 }), (Cx) => { const y = (x) => 2 * x - 4; Cx.assert(y(0) === -4 && y(2) === 0 && y(3) === 2 && sat(2, -1, -4, 2, 0) && sat(2, -1, -4, 0, -4), 'table and intercepts'); Cx.model([4, 2, 3, 0]); });
Q('s305', mk.short({ marks: 3, stem: r`A cab operator in Bhopal charges ₹$y$ for $x$ km, where $y = 18x + 55$. Find (i) the charge for $0$ km and say what it means, (ii) the charge for $10$ km, (iii) the increase in charge for each extra kilometre.`, model: r`(i) For $x = 0$: $y = 55$. This is the fixed charge, the point $(0, 55)$ where the graph meets the $y$-axis.\n\n(ii) For $x = 10$: $y = 18 \times 10 + 55 = 180 + 55 = 235$ rupees.\n\n(iii) For every extra kilometre the charge increases by ₹18, which is the number multiplying $x$.`, sol: 'Substitute x = 0 and x = 10; the coefficient of x is the rate.', scheme: [['55 as the fixed charge', 1], ['235 rupees', 1], ['18 rupees per km', 1]], d: 2, c: 'application', t: [2], time: 150 }), (Cx) => { const y = (x) => 18 * x + 55; Cx.assert(y(0) === 55 && y(10) === 235 && range(0, 9).every((x) => y(x + 1) - y(x) === 18), 'cab charges'); Cx.model([55, 235, 180, 18]); });

// =============================================================== long answer, 5 marks
{
  const x1 = 75, y1 = (360 - 2 * x1) / 3, more = [[60, 80], [120, 40], [150, 20]];
  Q('l01', mk.long({ stem: r`A bus ticket from Lucknow costs ₹$x$ for an adult and ₹$y$ for a child. A family buys $2$ adult tickets and $3$ child tickets for ₹360. (a) Write a linear equation in $x$ and $y$. (b) Show that $x = 90$, $y = 60$ is a solution. (c) Find $y$ when $x = 75$. (d) Find three more solutions. (e) Is $(100, 53)$ a solution? Give a reason.`, model: r`**(a)** $2x + 3y = 360$, that is, $2x + 3y - 360 = 0$.\n\n**(b)** For $(90, 60)$: $2 \times 90 + 3 \times 60 = 180 + 180 = 360$, so it is a solution.\n\n**(c)** For $x = 75$: $150 + 3y = 360$, so $3y = 210$ and $y = 70$.\n\n**(d)** For $x = 60$: $3y = 240$, so $y = 80$. For $x = 120$: $3y = 120$, so $y = 40$. For $x = 150$: $3y = 60$, so $y = 20$. Three solutions are $(60, 80)$, $(120, 40)$ and $(150, 20)$.\n\n**(e)** For $(100, 53)$: $2 \times 100 + 3 \times 53 = 200 + 159 = 359$, which is not $360$, so it is not a solution.`, sol: 'Total cost = 2 adult tickets + 3 child tickets; substitute in each part.', scheme: [['(a) 2x + 3y = 360', 1], ['(b) 180 + 180 = 360', 1], ['(c) y = 70', 1], ['(d) three correct solutions', 1], ['(e) 359 is not 360', 1]], d: 3, c: 'application', t: [1], time: 420 }), (Cx) => { Cx.assert(sat(2, 3, -360, 90, 60) && y1 === 70 && more.every(([x, y]) => sat(2, 3, -360, x, y)) && !sat(2, 3, -360, 100, 53) && 200 + 159 === 359, 'all parts'); Cx.model([2, 3, 360, 180, 70, 80, 40, 20, 359]); });
}
{
  const F = (C) => (9 * C) / 5 + 32;
  Q('l02', mk.long({ stem: r`The Celsius reading $C$ and the Fahrenheit reading $F$ of the same temperature are related by $F = \dfrac{9C}{5} + 32$. (a) Write this as an equation of the form $ax + by + c = 0$ in $C$ and $F$. (b) Find $F$ for $C = 0$, $C = 25$ and $C = 35$. (c) Find $C$ when $F = 212$. (d) Show that $(-10, 14)$ is a solution. (e) Explain why the equation has infinitely many solutions.`, model: r`**(a)** Multiply by $5$: $5F = 9C + 160$, so $9C - 5F + 160 = 0$.\n\n**(b)** $C = 0$: $F = 32$. $C = 25$: $F = 45 + 32 = 77$. $C = 35$: $F = 63 + 32 = 95$.\n\n**(c)** $212 = \dfrac{9C}{5} + 32$ gives $\dfrac{9C}{5} = 180$, so $9C = 900$ and $C = 100$.\n\n**(d)** For $C = -10$: $F = -18 + 32 = 14$, so $(-10, 14)$ is a solution.\n\n**(e)** Every value of $C$ that we choose gives one value of $F$, and we can choose $C$ in infinitely many ways.`, sol: 'Use the relation to find one reading from the other.', scheme: [['(a) 9C - 5F + 160 = 0', 1], ['(b) 32, 77 and 95', 1], ['(c) C = 100', 1], ['(d) F = 14 at C = -10', 1], ['(e) each C gives a F', 1]], d: 3, c: 'application', t: [1], time: 420 }), (Cx) => { Cx.assert([0, 25, 35, 100, -10].every((C) => sat(9, -5, 160, C, F(C))) && F(0) === 32 && F(25) === 77 && F(35) === 95 && F(100) === 212 && F(-10) === 14, 'conversions'); Cx.model([9, 5, 160, 32, 77, 95, 100, 14]); });
}
{
  const y = (x) => (12 - 2 * x) / 3;
  Q('l03', mk.long({ stem: r`Consider the equation $2x + 3y = 12$. (a) Complete a table of values of $y$ for $x = -3, 0, 3, 6$. (b) Plot these points on graph paper and draw the line through them. (c) From the graph, read the value of $y$ when $x = 1.5$. (d) From the graph, read the value of $x$ when $y = 1$. (e) Write the points where the line meets the axes.`, model: r`**(a)** $y = \dfrac{12 - 2x}{3}$ gives: $x = -3$, $y = 6$; $x = 0$, $y = 4$; $x = 3$, $y = 2$; $x = 6$, $y = 0$.\n\n**(b)** Plot $(-3, 6)$, $(0, 4)$, $(3, 2)$ and $(6, 0)$. They lie on one straight line, which is drawn through them with a ruler and extended.\n\n**(c)** At $x = 1.5$, the line is at $y = 3$.\n\n**(d)** At $y = 1$, the line is at $x = 4.5$.\n\n**(e)** The line meets the $x$-axis at $(6, 0)$ and the $y$-axis at $(0, 4)$.`, sol: 'Tabulate, plot, draw the line and read from it.', scheme: [['(a) table 6, 4, 2, 0', 1], ['(b) points plotted and line drawn', 1], ['(c) y = 3', 1], ['(d) x = 4.5', 1], ['(e) (6, 0) and (0, 4)', 1]], d: 3, c: 'application', t: [2], time: 420 }), (Cx) => { Cx.assert([-3, 0, 3, 6].map(y).join() === '6,4,2,0' && y(1.5) === 3 && (12 - 3 * 1) / 2 === 4.5 && sat(2, 3, -12, 4.5, 1) && sat(2, 3, -12, 6, 0) && sat(2, 3, -12, 0, 4), 'table and readings'); Cx.model([6, 4, 2, 0, 3, 4.5]); });
}
{
  const y = (x) => 400 * x + 1500;
  Q('l04', mk.long({ stem: r`A coaching centre in Kota charges ₹$y$ in total for $x$ months, where $y = 400x + 1500$. (a) Find $y$ for $x = 0, 2, 5, 8$. (b) Describe the graph and say where it meets the $y$-axis. (c) What do $1500$ and $400$ mean? (d) A student paid ₹5900 in total. For how many months was that? (e) Find the total charge for $14$ months.`, model: r`**(a)** $x = 0$: $1500$. $x = 2$: $800 + 1500 = 2300$. $x = 5$: $2000 + 1500 = 3500$. $x = 8$: $3200 + 1500 = 4700$.\n\n**(b)** The graph is a straight line that rises from left to right. It meets the $y$-axis at $(0, 1500)$.\n\n**(c)** $1500$ is the fixed charge, paid even for $0$ months. $400$ is the charge for each month: the total rises by ₹400 for every extra month.\n\n**(d)** $5900 = 400x + 1500$, so $400x = 4400$ and $x = 11$ months.\n\n**(e)** $y = 400 \times 14 + 1500 = 5600 + 1500 = 7100$ rupees.`, sol: 'Substitute for the table and the totals; read the intercept and the rate.', scheme: [['(a) 1500, 2300, 3500, 4700', 1], ['(b) rising line through (0, 1500)', 1], ['(c) fixed charge and rate', 1], ['(d) 11 months', 1], ['(e) 7100 rupees', 1]], d: 3, c: 'application', t: [2], time: 420 }), (Cx) => { Cx.assert([0, 2, 5, 8].map(y).join() === '1500,2300,3500,4700' && y(11) === 5900 && y(14) === 7100 && y(1) - y(0) === 400, 'table and totals'); Cx.model([1500, 2300, 3500, 4700, 400, 4400, 11, 5600, 7100]); });
}
{
  const k = 6 / -4;
  Q('l05', mk.long({ stem: r`(a) The points $(-4, 1)$, $(-4, 5)$ and $(-4, -3)$ lie on one line. Write its equation. (b) The points $(2, 6)$, $(-5, 6)$ and $(9, 6)$ lie on another line. Write its equation. (c) Find $y$ for $x = -2, 0, 2$ on the line $y = 3x$ and say what is special about this line. (d) Where does the line from (a) meet the $x$-axis, and where does the line from (b) meet the $y$-axis? (e) The line $y = kx$ passes through $(-4, 6)$. Find $k$, and check whether $(2, -3)$ is on this line.`, model: r`**(a)** Every point has $x = -4$, so the line is $x = -4$, parallel to the $y$-axis.\n\n**(b)** Every point has $y = 6$, so the line is $y = 6$, parallel to the $x$-axis.\n\n**(c)** For $x = -2$: $y = -6$. For $x = 0$: $y = 0$. For $x = 2$: $y = 6$. The line passes through the origin $(0, 0)$.\n\n**(d)** The line $x = -4$ meets the $x$-axis at $(-4, 0)$. The line $y = 6$ meets the $y$-axis at $(0, 6)$.\n\n**(e)** Put $x = -4$ and $y = 6$ in $y = kx$: $6 = -4k$, so $k = -\dfrac{3}{2}$. For $(2, -3)$: $-\dfrac{3}{2} \times 2 = -3$, so $(2, -3)$ is on the line.`, sol: 'Look at which coordinate stays fixed; substitute the given point to find k.', scheme: [['(a) x = -4', 1], ['(b) y = 6', 1], ['(c) -6, 0, 6 and the origin', 1], ['(d) (-4, 0) and (0, 6)', 1], ['(e) k = -3/2 and (2, -3) lies on the line', 1]], d: 4, c: 'analysis', t: [2], time: 450 }), (Cx) => { Cx.assert([[-4, 1], [-4, 5], [-4, -3]].every(([x]) => x === -4) && [[2, 6], [-5, 6], [9, 6]].every(([, y]) => y === 6) && [-2, 0, 2].map((x) => 3 * x).join() === '-6,0,6' && close(k, -1.5) && close(k * 2, -3), 'lines and k'); Cx.model([4, 6, 3, 2, 3]); });
}

// =============================================================== case-based
{
  const fare = (x) => 12 * x + 25;
  caseQ('c01', {
    passage: r`A cab operator in Bhubaneswar charges a fixed ₹25 for starting the ride and ₹12 for every kilometre. The fare for $x$ km is ₹$y$, so $y = 12x + 25$.`,
    d: 2, c: 'application',
    model: r`(a) Option (a). (b) $15$. (c) (i) $12x - y + 25 = 0$, and $(10, 145)$ satisfies it. Or (ii) $385$ rupees and ₹12 per km.`,
    sol: r`(a) $12 \times 8 + 25 = 121$. (b) $12x + 25 = 205$ gives $x = 15$. (c) (i) $12 \times 10 - 145 + 25 = 0$. (ii) $12 \times 30 + 25 = 385$.`,
    children: [
      child('a', mk.mcq({ stem: 'The fare for an $8$ km ride, in rupees, is', opts: ['$121$', '$96$', '$108$', '$133$'], key: 'a', sol: r`$y = 12 \times 8 + 25 = 96 + 25 = 121$. The value $96$ forgets the fixed charge, and $108$ is $12 \times 9$.`, d: 1, c: 'understanding', t: [1], time: 60 })),
      child('b', mk.num({ stem: 'A passenger paid ₹205. How many kilometres did the passenger travel?', value: 15, sol: r`$205 = 12x + 25$, so $12x = 180$ and $x = 15$ km.`, scheme: [['12x + 25 = 205', 0.5], ['15 km', 0.5]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Write $y = 12x + 25$ in the form $ax + by + c = 0$, and show that $(10, 145)$ is a solution.`, model: r`$12x - y + 25 = 0$. For $(10, 145)$: $12 \times 10 - 145 + 25 = 120 - 145 + 25 = 0$, so it is a solution.`, sol: 'Bring all terms to one side and substitute.', scheme: [['12x - y + 25 = 0', 1], ['120 - 145 + 25 = 0', 1]], d: 2, c: 'understanding', t: [1], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Find the fare for a $30$ km ride, and say what the number $12$ in the equation tells us.`, model: r`$y = 12 \times 30 + 25 = 360 + 25 = 385$ rupees. The number $12$ is the rate: the fare increases by ₹12 for every extra kilometre.`, sol: 'Substitute x = 30; the multiplier of x is the rate.', scheme: [['385 rupees', 1], ['12 rupees per km', 1]], d: 2, c: 'application', t: [1, 2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([fare(8), 96, 108, 133], 121);
    Cx.child('b').val((205 - 25) / 12);
    Cx.child('c').assert(sat(12, -1, 25, 10, 145) && 120 - 145 + 25 === 0, '(10, 145)');
    Cx.child('c').model([12, 10, 145, 120, 25]);
    Cx.child('cii').assert(fare(30) === 385 && 360 + 25 === 385, '385');
    Cx.child('cii').model([360, 25, 385, 12]);
  });
}
{
  const buys = [];
  for (let x = 0; x <= 10; x++) for (let y = 0; y <= 10; y++) if (15 * x + 20 * y === 140) buys.push([x, y]);
  const opts = [[4, 4], [5, 3], [2, 5], [6, 2]];
  caseQ('c02', {
    passage: r`In a school canteen in Dehradun a samosa costs ₹15 and a glass of juice costs ₹20. Kavya spends exactly ₹140 on $x$ samosas and $y$ glasses of juice, so $15x + 20y = 140$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $1$. (c) (i) $(0, 7)$, $(4, 4)$ and $(8, 1)$. Or (ii) $4$ samosas.`,
    sol: r`(a) $15 \times 4 + 20 \times 4 = 140$. (b) $120 + 20y = 140$ gives $y = 1$. (c) (i) $x$ must be a multiple of $4$: $x = 0, 4, 8$. (ii) $15x + 80 = 140$ gives $x = 4$.`,
    children: [
      child('a', mk.mcq({ stem: r`Which pair $(x, y)$ could be Kavya's purchase?`, opts: opts.map(([x, y]) => `$(${x}, ${y})$`), key: 'a', sol: r`Test each pair in $15x + 20y = 140$. For $(4, 4)$: $60 + 80 = 140$, which is true. For $(5, 3)$: $75 + 60 = 135$; for $(2, 5)$: $30 + 100 = 130$; for $(6, 2)$: $90 + 40 = 130$.`, d: 2, c: 'application', t: [1], time: 75 })),
      child('b', mk.num({ stem: 'Kavya bought $8$ samosas. How many glasses of juice did she buy?', value: 1, sol: r`$15 \times 8 + 20y = 140$, so $120 + 20y = 140$, $20y = 20$ and $y = 1$.`, scheme: [['120 + 20y = 140', 0.5], ['1 glass', 0.5]], d: 2, c: 'application', t: [1], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find all solutions of $15x + 20y = 140$ in which $x$ and $y$ are whole numbers ($0$ is allowed).`, model: r`From $15x = 140 - 20y$, $x$ must be a multiple of $4$ (dividing by $5$ gives $3x = 28 - 4y$). Trying $x = 0, 4, 8$ gives $y = 7, 4, 1$. The solutions are $(0, 7)$, $(4, 4)$ and $(8, 1)$. For $x = 12$, $y$ would be negative.`, sol: 'Divide by 5 and look for whole-number pairs.', scheme: [['Reasons that x is a multiple of 4', 1], ['(0, 7), (4, 4), (8, 1)', 1]], d: 3, c: 'analysis', t: [1], time: 120 }), [
        mk.short({ marks: 2, stem: r`**(ii)** Kavya buys $4$ glasses of juice and spends ₹140 in all. How many samosas does she buy?`, model: r`$15x + 20 \times 4 = 140$, so $15x + 80 = 140$ and $15x = 60$. Hence $x = 4$ samosas.`, sol: 'Substitute y = 4.', scheme: [['15x + 80 = 140', 1], ['4 samosas', 1]], d: 2, c: 'application', t: [1], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which(opts.map(([x, y]) => (sat(15, 20, -140, x, y) ? 1 : 0)), 1);
    Cx.child('b').val((140 - 15 * 8) / 20);
    Cx.child('c').assert(buys.map((p) => p.join(',')).join(';') === '0,7;4,4;8,1', 'whole-number solutions');
    Cx.child('c').model([4, 0, 7, 8, 1]);
    Cx.child('cii').assert((140 - 20 * 4) / 15 === 4, 'x = 4');
    Cx.child('cii').model([80, 140, 60, 4]);
  });
}
{
  const V = (x) => 500 - 20 * x;
  caseQ('c03', {
    passage: r`A water tank on a farm in Karnal holds $500$ litres. A pipe drains it at a steady $20$ litres every minute. The volume left after $x$ minutes is $y$ litres, so $20x + y = 500$.`,
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $25$. (c) (i) $260$ litres. Or (ii) $18$ minutes.`,
    sol: r`(a) At $x = 0$, $y = 500$. (b) $y = 0$: $20x = 500$, so $x = 25$. (c) (i) $y = 500 - 20 \times 12 = 260$. (ii) $500 - 20x = 140$ gives $x = 18$.`,
    children: [
      child('a', mk.mcq({ stem: 'The graph of the equation meets the $y$-axis at $(0, 500)$. This tells us that', opts: ['the tank holds $500$ litres at the start', 'the tank is empty after $500$ minutes', 'the pipe drains $500$ litres each minute', 'the tank holds $20$ litres at the start'], key: 'a', sol: r`The point $(0, 500)$ means that at time $x = 0$ the volume is $500$ litres, the starting volume. The $20$ in the equation is the drain rate, and the tank is empty when $y = 0$, which is at $x = 25$.`, d: 2, c: 'application', t: [2], time: 75 })),
      child('b', mk.num({ stem: 'After how many minutes is the tank empty?', value: 25, sol: r`The tank is empty when $y = 0$: $20x = 500$, so $x = 25$ minutes.`, scheme: [['y = 0 gives 20x = 500', 0.5], ['25 minutes', 0.5]], d: 2, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Find the volume of water left after $12$ minutes.`, model: r`$y = 500 - 20 \times 12 = 500 - 240 = 260$ litres.`, sol: 'Substitute x = 12.', scheme: [['20 x 12 = 240', 1], ['260 litres', 1]], d: 2, c: 'application', t: [2], time: 90 }), [
        mk.short({ marks: 2, stem: r`**(ii)** After how many minutes will $140$ litres be left?`, model: r`$500 - 20x = 140$, so $20x = 360$ and $x = 18$ minutes.`, sol: 'Put y = 140 and solve.', scheme: [['20x = 360', 1], ['18 minutes', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').assert(V(0) === 500 && sat(20, 1, -500, 0, 500), 'start 500');
    Cx.child('a').key('a');
    Cx.child('b').val(500 / 20);
    Cx.child('c').assert(V(12) === 260 && 20 * 12 === 240, '260');
    Cx.child('c').model([240, 260]);
    Cx.child('cii').assert(V(18) === 140 && (500 - 140) / 20 === 18, '18');
    Cx.child('cii').model([360, 18]);
  });
}
{
  const bill = (x) => 6 * x + 250;
  const g = plot({ x: [0, 30], y: [0, 450], xl: 'data used (GB)', yl: 'monthly bill (₹)', fns: ['6*x+250'], pts: [[0, 250, '(0, 250)'], [10, 310, '(10, 310)'], [20, 370, '(20, 370)']] }, 'Graph of the monthly bill y rupees against the data x GB for a broadband plan. It is a rising straight line through the points 0 comma 250, 10 comma 310 and 20 comma 370.', 'Monthly bill against data used.');
  must(bill(0) === 250 && bill(10) === 310 && bill(20) === 370, 'plot points');
  caseQ('c04', {
    passage: r`A broadband provider in Surat charges a monthly bill of ₹$y$ for $x$ GB of data. The graph shows the bill. It is the line $y = 6x + 250$.`,
    assets: [g],
    d: 3, c: 'application',
    model: r`(a) Option (a). (b) $370$. (c) (i) The bill rises by ₹60 for $10$ GB, so ₹6 per GB. Or (ii) $32$ GB.`,
    sol: r`(a) $(0, 250)$. (b) $6 \times 20 + 250 = 370$. (c) (i) $310 - 250 = 60$ for $10$ GB. (ii) $6x + 250 = 442$ gives $x = 32$.`,
    children: [
      child('a', mk.mcq({ stem: 'Read the graph. The bill when no data is used is, in rupees,', opts: ['$250$', '$6$', '$310$', '$0$'], key: 'a', sol: r`When no data is used, $x = 0$, and the graph meets the $y$-axis at $(0, 250)$. So the bill is $250$ rupees, the fixed charge. The value $6$ is the charge per GB.`, d: 1, c: 'understanding', t: [2], time: 60 })),
      child('b', mk.num({ stem: 'Find the bill, in rupees, for $20$ GB of data.', value: 370, sol: r`$y = 6 \times 20 + 250 = 120 + 250 = 370$ rupees. This matches the point $(20, 370)$ on the graph.`, scheme: [['6 x 20 + 250', 0.5], ['370 rupees', 0.5]], d: 2, c: 'application', t: [2], time: 75 })),
      child('c', mk.short({ marks: 2, stem: r`**(i)** Using the points $(0, 250)$ and $(10, 310)$ on the graph, find how much the bill rises for each extra GB.`, model: r`From $0$ GB to $10$ GB the bill rises from $250$ to $310$, that is by $310 - 250 = 60$ rupees for $10$ GB. So it rises by $60 \div 10 = 6$ rupees for each extra GB.`, sol: 'Divide the rise in the bill by the rise in data.', scheme: [['Rise 60 for 10 GB', 1], ['6 rupees per GB', 1]], d: 2, c: 'application', t: [2], time: 105 }), [
        mk.short({ marks: 2, stem: r`**(ii)** One month the bill is ₹442. How much data was used?`, model: r`$6x + 250 = 442$, so $6x = 192$ and $x = 32$ GB.`, sol: 'Put y = 442 and solve.', scheme: [['6x = 192', 1], ['32 GB', 1]], d: 2, c: 'application', t: [2], time: 90 }),
      ]),
    ],
  }, (Cx) => {
    Cx.child('a').which([bill(0), 6, bill(10), 0], 250);
    Cx.child('b').val(bill(20));
    Cx.child('c').assert(bill(10) - bill(0) === 60 && 60 / 10 === 6, '6 per GB');
    Cx.child('c').model([310, 250, 60, 10, 6]);
    Cx.child('cii').assert(bill(32) === 442 && (442 - 250) / 6 === 32, '32');
    Cx.child('cii').model([192, 32]);
  });
}
