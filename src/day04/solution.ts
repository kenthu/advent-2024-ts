import { readLines } from "lib/input";

const findXmas = (filename: string): number => {
  const rows = readLines(filename);
  const grid = rows.map((row) => row.split(""));

  // Could do recursion, but since it's always in a straight line, can just hardcode all the searches
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row]?.[col] !== "X") {
        continue;
      }

      // Direction: →
      if (
        grid[row]?.[col + 1] === "M" &&
        grid[row]?.[col + 2] === "A" &&
        grid[row]?.[col + 3] === "S"
      ) {
        count++;
      }

      // Direction: ↘
      if (
        grid[row + 1]?.[col + 1] === "M" &&
        grid[row + 2]?.[col + 2] === "A" &&
        grid[row + 3]?.[col + 3] === "S"
      ) {
        count++;
      }

      // Direction: ↓
      if (
        grid[row + 1]?.[col] === "M" &&
        grid[row + 2]?.[col] === "A" &&
        grid[row + 3]?.[col] === "S"
      ) {
        count++;
      }

      // Direction: ↙
      if (
        grid[row + 1]?.[col - 1] === "M" &&
        grid[row + 2]?.[col - 2] === "A" &&
        grid[row + 3]?.[col - 3] === "S"
      ) {
        count++;
      }

      // Direction: ←
      if (
        grid[row]?.[col - 1] === "M" &&
        grid[row]?.[col - 2] === "A" &&
        grid[row]?.[col - 3] === "S"
      ) {
        count++;
      }

      // Direction: ↖
      if (
        grid[row - 1]?.[col - 1] === "M" &&
        grid[row - 2]?.[col - 2] === "A" &&
        grid[row - 3]?.[col - 3] === "S"
      ) {
        count++;
      }

      // Direction: ↑
      if (
        grid[row - 1]?.[col] === "M" &&
        grid[row - 2]?.[col] === "A" &&
        grid[row - 3]?.[col] === "S"
      ) {
        count++;
      }

      // Direction: ↗
      if (
        grid[row - 1]?.[col + 1] === "M" &&
        grid[row - 2]?.[col + 2] === "A" &&
        grid[row - 3]?.[col + 3] === "S"
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
