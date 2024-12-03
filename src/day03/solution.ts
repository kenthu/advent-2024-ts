import { readFile } from "lib/input";

const sumOfProducts = (filename: string): number => {
  const code = readFile(filename);
  const regex = /mul\(\d{1,3},\d{1,3}\)/g;
  const innerRegex = /^mul\((\d{1,3}),(\d{1,3})\)$/;

  const matches = code.match(regex);
  if (!matches) return 0;

  let sum = 0;
  for (const match of matches) {
    const innerMatches = match.match(innerRegex);
    if (!innerMatches) continue;

    sum += Number(innerMatches[1]) * Number(innerMatches[2]);
  }

  return sum;
};

// Part 1 test
console.log(sumOfProducts("src/day03/test-input.txt"));
// 161

// Part 1
console.log(sumOfProducts("src/day03/input.txt"));
// 173785482
