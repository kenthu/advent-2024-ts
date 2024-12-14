import { readLines } from "lib/input";

type Grid = number[][];
type Row = number;
type Column = number;
type PositionString = `(${Row},${Column})`;

const processInput = (filename: string): Grid => {
  return readLines(filename).map((line) =>
    line.split("").map((numString) => Number(numString))
  );
};

/**
 * Return set of 9-height positions reachable from this location
 */
const findPeakPositions = (
  grid: Grid,
  row: Row,
  col: Column
): Set<PositionString> => {
  const currentHeight = grid[row][col];
  if (currentHeight === 9) {
    return new Set<PositionString>([`(${row},${col})`]);
  }

  let peakPositions = new Set<PositionString>();
  if (grid[row][col + 1] === currentHeight + 1) {
    peakPositions = peakPositions.union(findPeakPositions(grid, row, col + 1));
  }
  if (grid[row][col - 1] === currentHeight + 1) {
    peakPositions = peakPositions.union(findPeakPositions(grid, row, col - 1));
  }
  if (grid[row + 1]?.[col] === currentHeight + 1) {
    peakPositions = peakPositions.union(findPeakPositions(grid, row + 1, col));
  }
  if (grid[row - 1]?.[col] === currentHeight + 1) {
    peakPositions = peakPositions.union(findPeakPositions(grid, row - 1, col));
  }

  return peakPositions;
};

/**
 * Return set of trails reachable from this location
 *
 * Trails are specified as a list of positions. Example:
 * "(5,3)(5,4)...(0,0)"
 */
const findTrails = (
  grid: Grid,
  row: Row,
  col: Column,
  prevTrail: string
): Set<string> => {
  const currentTrail = prevTrail + `(${row},${col})`;

  const currentHeight = grid[row][col];
  if (currentHeight === 9) {
    return new Set<string>([currentTrail]);
  }

  let trails = new Set<string>();
  if (grid[row][col + 1] === currentHeight + 1) {
    trails = trails.union(findTrails(grid, row, col + 1, currentTrail));
  }
  if (grid[row][col - 1] === currentHeight + 1) {
    trails = trails.union(findTrails(grid, row, col - 1, currentTrail));
  }
  if (grid[row + 1]?.[col] === currentHeight + 1) {
    trails = trails.union(findTrails(grid, row + 1, col, currentTrail));
  }
  if (grid[row - 1]?.[col] === currentHeight + 1) {
    trails = trails.union(findTrails(grid, row - 1, col, currentTrail));
  }

  return trails;
};

const part1 = (filename: string): number => {
  const grid = processInput(filename);

  // For each trailhead, count how many 9-height positions are reachable
  let totalScore = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 0) {
        totalScore += findPeakPositions(grid, row, col).size;
      }
    }
  }

  return totalScore;
};

const part2 = (filename: string): number => {
  const grid = processInput(filename);

  // For each trailhead, count distinct trails
  let totalRating = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (grid[row][col] === 0) {
        totalRating += findTrails(grid, row, col, "").size;
      }
    }
  }

  return totalRating;
};

// Part 1 test
console.log(part1("src/day10/test-input.txt"));
// 36

// Part 1
console.log(part1("src/day10/input.txt"));
// 754

// Part 2 test
console.log(part2("src/day10/test-input.txt"));
// 81

// Part 2
console.log(part2("src/day10/input.txt"));
// 1609
