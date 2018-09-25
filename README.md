# genetic-expressions
To run, enter in console `node population.js` and follow console prompt.
## Problem
You're given an array of ordered, increasing integers `[1,2...9]`. You're tasked with finding a sequence of arithmetic operators such that when the operators are inserted between each integer, the result is an expression that evaluates to a 100.

An example solution is `+-*+*++*`, since `1+2-3*4+5*6+7+8*9` evaluates to 100. 
## Approaches
Given a small enough input, a DP based solution is sufficient.
However, I thought this problem seemed similar enough to the knapsack problem that a genetic algorithm approach would work.
## Population Modeling
A member of the population has a gene with chromosomes representing the four arithmetic operators: `+, -, *, /`. 
We evaluate a member of the population based on how close their expression is to the target. In this algorithm, we seek to minimize fitness.
Consider `+*+*+++*`, which creates the expression `1+2*3+4*5+6+7+8*9`, which evaluates to 112. This member of the population has a fitness score of 12.
## Solution
We seed an initial, randomly generated population. We discard the least fit members and breed the remaining population to produce a new generation. Repeat this process until a solution is found.

## Ideas
How does this solution scale? The next step is to build a proper DP solution to compare, and see how both solutions scale. 
