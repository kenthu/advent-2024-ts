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

const isRowSafeEnough = (row: number[]): boolean => {
  if (isRowSafe(row)) {
    return true;
  }

  // Try removing each level
  for (let i = 0; i < row.length; i++) {
    const testRow = [...row];
    testRow.splice(i, 1);
    if (isRowSafe(testRow)) {
      return true;
    }
  }

  return false;
};

const numOfSafeReports = (
  filename: string,
  checkFn: (row: number[]) => boolean
): number => {
  const rows = processInput(filename);

  return rows.filter((row) => checkFn(row)).length;
};

// Part 1 test
console.log(numOfSafeReports("src/day02/test-input.txt", isRowSafe));
// 11

// Part 1
console.log(numOfSafeReports("src/day02/input.txt", isRowSafe));
// 326

// Part 2 test
console.log(numOfSafeReports("src/day02/test-input.txt", isRowSafeEnough));
// 4

// Part 2
console.log(numOfSafeReports("src/day02/input.txt", isRowSafeEnough));
// 381
