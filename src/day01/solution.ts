import { readLines } from "lib/input";

const processInputIntoSortedArrays = (
  filename: string
): {
  left: Array<number>;
  right: Array<number>;
} => {
  const rows = readLines(filename);

  const left: Array<number> = [];
  const right: Array<number> = [];
  const regex = /^(\d+)   (\d+)$/;

  for (const row of rows) {
    const matches = row.match(regex);
    if (!matches) {
      throw new Error(`Regex doesn't match on: ${row}`);
    }
    left.push(Number(matches[1]));
    right.push(Number(matches[2]));
  }
  left.sort();
  right.sort();

  return { left, right };
};

const processInputForPart2 = (
  filename: string
): {
  leftNumbers: Array<number>;
  rightCounts: Record<number, number>;
} => {
  const rows = readLines(filename);

  const leftNumbers: Array<number> = [];
  const rightCounts: Record<number, number> = {};
  const regex = /^(\d+)   (\d+)$/;

  for (const row of rows) {
    const matches = row.match(regex);
    if (!matches) {
      throw new Error(`Regex doesn't match on: ${row}`);
    }
    const left = Number(matches[1]);
    const right = Number(matches[2]);

    leftNumbers.push(left);
    if (right in rightCounts) {
      rightCounts[right]++;
    } else {
      rightCounts[right] = 1;
    }
  }

  return { leftNumbers, rightCounts };
};

const sumOfDistances = (filename: string): number => {
  const { left, right } = processInputIntoSortedArrays(filename);
  let sum = 0;
  for (let i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
  }

  return sum;
};

const similarityScore = (filename: string): number => {
  const { leftNumbers, rightCounts } = processInputForPart2(filename);
  return leftNumbers.reduce((acc, current) => {
    const rightCount = rightCounts[current] ?? 0;

    return acc + current * rightCount;
  }, 0);
};

// Part 1 test
console.log(sumOfDistances("src/day01/test-input.txt"));
// 11

// Part 1
console.log(sumOfDistances("src/day01/input.txt"));
// 2756096

// Part 2 test
console.log(similarityScore("src/day01/test-input.txt"));
// 31

// Part 2
console.log(similarityScore("src/day01/input.txt"));
// 23117829
