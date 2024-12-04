import { readLines } from "lib/input";

const DIRECTIONS = [
  { rowIncrement: 0, colIncrement: 1 },
  { rowIncrement: 1, colIncrement: 1 },
  { rowIncrement: 1, colIncrement: 0 },
  { rowIncrement: 1, colIncrement: -1 },
  { rowIncrement: 0, colIncrement: -1 },
  { rowIncrement: -1, colIncrement: -1 },
  { rowIncrement: -1, colIncrement: 0 },
  { rowIncrement: -1, colIncrement: 1 },
];

const findXmas = (filename: string): number => {
  const rows = readLines(filename);
  const grid = rows.map((row) => row.split(""));

  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row]?.[col] !== "X") {
        continue;
      }

      for (const { rowIncrement, colIncrement } of DIRECTIONS) {
        if (
          grid[row + rowIncrement * 1]?.[col + colIncrement * 1] === "M" &&
          grid[row + rowIncrement * 2]?.[col + colIncrement * 2] === "A" &&
          grid[row + rowIncrement * 3]?.[col + colIncrement * 3] === "S"
        ) {
          count++;
        }
      }
    }
  }

  return count;
};

const findCrossmas = (filename: string): number => {
  const rows = readLines(filename);
  const grid = rows.map((row) => row.split(""));

  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row]?.[col] !== "A") {
        continue;
      }

      // M.S
      // .A.
      // M.S
      if (
        grid[row - 1]?.[col - 1] === "M" &&
        grid[row + 1]?.[col - 1] === "M" &&
        grid[row - 1]?.[col + 1] === "S" &&
        grid[row + 1]?.[col + 1] === "S"
      ) {
        count++;
      }

      // S.M
      // .A.
      // S.M
      if (
        grid[row - 1]?.[col + 1] === "M" &&
        grid[row + 1]?.[col + 1] === "M" &&
        grid[row - 1]?.[col - 1] === "S" &&
        grid[row + 1]?.[col - 1] === "S"
      ) {
        count++;
      }

      // M.M
      // .A.
      // S.S
      if (
        grid[row - 1]?.[col - 1] === "M" &&
        grid[row - 1]?.[col + 1] === "M" &&
        grid[row + 1]?.[col - 1] === "S" &&
        grid[row + 1]?.[col + 1] === "S"
      ) {
        count++;
      }

      // S.S
      // .A.
      // M.M
      if (
        grid[row + 1]?.[col - 1] === "M" &&
        grid[row + 1]?.[col + 1] === "M" &&
        grid[row - 1]?.[col - 1] === "S" &&
        grid[row - 1]?.[col + 1] === "S"
      ) {
        count++;
      }
    }
  }

  return count;
};

// Part 1 test
console.log(findXmas("src/day04/test-input.txt"));
// 18

// Part 1
console.log(findXmas("src/day04/input.txt"));
// 2551

// Part 2 test
console.log(findCrossmas("src/day04/test-input.txt"));
// 9

// Part 2
console.log(findCrossmas("src/day04/input.txt"));
// 1985
