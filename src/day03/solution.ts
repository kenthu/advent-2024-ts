import { readFile } from "lib/input";

const findValidInstructions = (
  filename: string,
  allowEnableDisable: boolean
): string[] => {
  const code = readFile(filename);
  const regex = allowEnableDisable
    ? /(mul\(\d{1,3},\d{1,3}\))|(do\(\))|(don\'t\(\))/g
    : /mul\(\d{1,3},\d{1,3}\)/g;

  const matches = code.match(regex);
  if (!matches) return [];

  return Array.from(matches);
};

const sumOfProducts = (
  filename: string,
  allowEnableDisable: boolean
): number => {
  const instructions = findValidInstructions(filename, allowEnableDisable);

  const multiplicationRegex = /^mul\((\d{1,3}),(\d{1,3})\)$/;

  let isEnabled = true;
  let sum = 0;
  for (const instruction of instructions) {
    if (instruction === "do()") {
      isEnabled = true;
    } else if (instruction === "don't()") {
      isEnabled = false;
    } else if (isEnabled) {
      const matches = instruction.match(multiplicationRegex);
      if (!matches) continue;

      sum += Number(matches[1]) * Number(matches[2]);
    }
  }

  return sum;
};

// Part 1 test
console.log(sumOfProducts("src/day03/test-input.txt", false));
// 161

// Part 1
console.log(sumOfProducts("src/day03/input.txt", false));
// 173785482

// Part 2 test
console.log(sumOfProducts("src/day03/test-input-2.txt", true));
// 48

// Part 2
console.log(sumOfProducts("src/day03/input.txt", true));
// 83158140
