import { readLines } from "lib/input";

const processInput = (filename: string): string[] => {
  return readLines(filename);
};

const part1 = (filename: string): number => {
  const { _ } = processInput(filename);

  return -1;
};

const part2 = (filename: string): number => {
  const { _ } = processInput(filename);

  return -1;
};

// Part 1 test
console.log(part1("src/day__/test-input.txt"));
//

// Part 1
console.log(part1("src/day__/input.txt"));
//

// Part 2 test
console.log(part2("src/day__/test-input.txt"));
//

// Part 2
console.log(part2("src/day__/input.txt"));
//
