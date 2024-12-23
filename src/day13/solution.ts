import { chunk } from "lodash";

import { readLines } from "lib/input";

interface Machine {
  buttonAX: number;
  buttonAY: number;
  buttonBX: number;
  buttonBY: number;
  prizeX: number;
  prizeY: number;
}

const processInput = (filename: string, prizeShift: number): Machine[] => {
  const buttonRegex = /^Button (?:A|B): X\+(\d+), Y\+(\d+)$/;
  const prizeRegex = /^Prize: X=(\d+), Y=(\d+)$/;

  return chunk(readLines(filename), 4).map((machineLines) => {
    const buttonAMatches = machineLines[0].match(buttonRegex);
    const buttonBMatches = machineLines[1].match(buttonRegex);
    const prizeMatches = machineLines[2].match(prizeRegex);
    if (!buttonAMatches || !buttonBMatches || !prizeMatches) {
      throw new Error("Unexpected non-match when reading input");
    }

    return {
      buttonAX: Number(buttonAMatches[1]),
      buttonAY: Number(buttonAMatches[2]),
      buttonBX: Number(buttonBMatches[1]),
      buttonBY: Number(buttonBMatches[2]),
      prizeX: Number(prizeMatches[1]) + prizeShift,
      prizeY: Number(prizeMatches[2]) + prizeShift,
    };
  });
};

const minTokensAllPrizes = (machines: Machine[]): number => {
  let totalTokens = 0;

  for (const machine of machines) {
    const { buttonAX, buttonAY, buttonBX, buttonBY, prizeX, prizeY } = machine;
    let minTokens = Infinity;

    const pressesA =
      (prizeX * buttonBY - buttonBX * prizeY) /
      (buttonAX * buttonBY - buttonBX * buttonAY);
    const pressesB = (prizeX - buttonAX * pressesA) / buttonBX;

    if (
      Math.floor(pressesA) === pressesA &&
      Math.floor(pressesB) === pressesB
    ) {
      minTokens = Math.min(minTokens, 3 * pressesA + pressesB);
    }

    if (minTokens !== Infinity) {
      totalTokens += minTokens;
    }
  }

  return totalTokens;
};

const part1 = (filename: string): number => {
  const machines = processInput(filename, 0);

  return minTokensAllPrizes(machines);
};

const part2 = (filename: string): number => {
  const machines = processInput(filename, 10000000000000);

  return minTokensAllPrizes(machines);
};

// Part 1 test
console.log(part1("src/day13/test-input.txt"));
// 480

// Part 1
console.log(part1("src/day13/input.txt"));
// 29877

// Part 2
console.log(part2("src/day13/input.txt"));
// 99423413811305
