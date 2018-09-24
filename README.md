# genetic-expressions
## Problem
You're given an array of ordered, increasing integers `[1,2...9]`. You're tasked with finding a way to insert arithmetic operators between each integer to create an expression that evaluates to a 100.
## Approaches
Given a small enough input, a DP based solution is sufficient.
However, I thought this problem seemed similar enough to the knapsack problem that a genetic algorithm approach would work.
## Population Modeling
A member of the population has a gene with chromosomes representing the four arithmetic operators: `+, -, *, /`. For example, `+*+*+++*`.
We evaluate a member of the population based on how close their expression is to the target. In this algorithm, we seek to minimize fitness.
To continue the above example, `+*+*+++*` creates the expression `1+2*3+4*5+6+7+8*9`, which evaluates to 112. This member of the population has a fitness score of 12.
## Solution
We seed an initial, randomly generated population. We discard the least fit members and breed the remaining population to produce a new generation. Repeat this process until a solution is found.
