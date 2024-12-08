import { readLines } from "lib/input";
import { sum } from "lodash";

interface Equation {
  testValue: number;
  operands: number[];
}

const processInput = (filename: string): Equation[] => {
  const lines = readLines(filename);
  const lineRegex = /^(\d+): ([\d ]+)$/;

  return lines.map((line) => {
    const matches = line.match(lineRegex);
    if (!matches) {
      throw new Error("Line not parseable");
    }

    return {
      testValue: Number(matches[1]),
      operands: matches[2].split(" ").map((numString) => Number(numString)),
    };
  });
};

const isEquationPossible = (
  testValue: number,
  operands: number[],
  acc: number,
  allowConcatOperator: boolean
): boolean => {
  if (operands.length === 0) {
    return acc === testValue;
  }

  // If we can assume that all operands are positive integers, then we know that this path is
  // impossible as soon as `acc` > `testValue`
  if (acc > testValue) {
    return false;
  }

  return (
    // Addition
    isEquationPossible(
      testValue,
      operands.slice(1),
      operands[0] + acc,
      allowConcatOperator
    ) ||
    // Multiplication
    isEquationPossible(
      testValue,
      operands.slice(1),
      operands[0] * acc,
      allowConcatOperator
    ) ||
    // Concatenation
    (allowConcatOperator &&
      isEquationPossible(
        testValue,
        operands.slice(1),
        Number(`${acc}${operands[0]}`),
        true
      ))
  );
};

const sumOfValidEquations = (
  filename: string,
  allowConcatOperator: boolean
): number => {
  const equations = processInput(filename);

  return sum(
    equations
      .filter((equation) =>
        isEquationPossible(
          equation.testValue,
          equation.operands.slice(1),
          equation.operands[0],
          allowConcatOperator
        )
      )
      .map((equation) => equation.testValue)
  );
};

const part1 = (filename: string): number => {
  return sumOfValidEquations(filename, false);
};

const part2 = (filename: string): number => {
  return sumOfValidEquations(filename, true);
};

// Part 1 test
console.log(part1("src/day07/test-input.txt"));
// 3749

// Part 1
console.log(part1("src/day07/input.txt"));
// 20665830408335

// Part 2 test
console.log(part2("src/day07/test-input.txt"));
// 11387

// Part 2
console.log(part2("src/day07/input.txt"));
// 354060705047464
