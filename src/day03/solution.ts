import { readFile } from "lib/input";

const findValidInstructions = (filename: string): string[] => {
  const code = readFile(filename);
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;

  const matches = code.match(regex);
  if (!matches) return [];

  return Array.from(matches);
};

const sumOfProducts = (filename: string): number => {
  const instructions = findValidInstructions(filename);

  const regex = /^mul\((\d{1,3}),(\d{1,3})\)$/;

  let sum = 0;
  for (const instruction of instructions) {
    const matches = instruction.match(regex);
    if (!matches) continue;

    sum += Number(matches[1]) * Number(matches[2]);
  }

  return sum;
};

// Part 1 test
console.log(sumOfProducts("src/day03/test-input.txt"));
// 161

// Part 1
console.log(sumOfProducts("src/day03/input.txt"));
// 173785482
