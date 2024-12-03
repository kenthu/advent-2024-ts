import { readLines } from "lib/input";

const processInput = (filename: string): number[][] => {
  const rows = readLines(filename);

  return rows.map((row) => row.split(" ").map((num) => Number(num)));
};

const isRowSafe = (row: number[]): boolean => {
  const mode = row[1] - row[0] > 0 ? "increasing" : "decreasing";
  for (let i = 0; i < row.length - 1; i++) {
    const diff = row[i + 1] - row[i];
    if (
      !(
        (diff < 0 && mode === "decreasing") ||
        (diff > 0 && mode === "increasing")
      )
    )
      return false;
    if (Math.abs(diff) > 3) return false;
  }
  return true;
};

const sumOfSafeReports = (filename: string): number => {
  const rows = processInput(filename);

  return rows.filter((row) => isRowSafe(row)).length;
};

// Part 1 test
console.log(sumOfSafeReports("src/day02/test-input.txt"));
// 11

// Part 1
console.log(sumOfSafeReports("src/day02/input.txt"));
// 326
