import { readLines } from "lib/input";

import { sum } from "lodash";

type Cell = "." | "#" | "^" | "X";
type Location = { row: number; col: number };
type Direction = "up" | "down" | "left" | "right";

const processInput = (
  filename: string
): {
  map: Cell[][];
  initialGuardLocation: Location;
} => {
  const map = readLines(filename).map((line) => line.split("")) as Cell[][];

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === "^") {
        return {
          map,
          initialGuardLocation: { row, col },
        };
      }
    }
  }

  throw new Error("Unable to find guard");
};

const printMap = (map: Cell[][]): void => {
  console.log("");
  for (const row of map) {
    console.log(row.join(""));
  }
  console.log("");
};

const runThroughMap = (
  map: Cell[][],
  initialGuardLocation: Location
): { hasLoop: boolean } => {
  let { row, col } = initialGuardLocation;
  let direction: Direction = "up";
  const visitedCells = new Set<string>();

  while (row >= 0 && row < map.length && col >= 0 && col < map[0].length) {
    visitedCells.add(`${row},${col},${direction}`);

    map[row][col] = "X";

    let newRow = row;
    let newCol = col;

    // Determine potential new guard location
    switch (direction) {
      case "up":
        newRow--;
        break;
      case "down":
        newRow++;
        break;
      case "left":
        newCol--;
        break;
      case "right":
        newCol++;
        break;
    }

    // If there is something directly in front of guard, turn right 90 degrees.
    if (map[newRow]?.[newCol] === "#") {
      switch (direction) {
        case "up":
          direction = "right";
          break;
        case "down":
          direction = "left";
          break;
        case "left":
          direction = "up";
          break;
        case "right":
          direction = "down";
          break;
      }
    } else {
      row = newRow;
      col = newCol;
    }

    if (visitedCells.has(`${row},${col},${direction}`)) {
      return { hasLoop: true };
    }
  }

  return { hasLoop: false };
};

const part1 = (filename: string): number => {
  const { map, initialGuardLocation } = processInput(filename);

  runThroughMap(map, initialGuardLocation);

  // Count all X in map
  return sum(map.map((row) => row.filter((cell) => cell === "X").length));
};

const part2 = (filename: string): number => {
  const { map, initialGuardLocation } = processInput(filename);

  let numLoops = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      // Skip if obstruction already exists or on guard's starting position
      if (map[row][col] === "#" || map[row][col] === "^") {
        continue;
      }

      // Add test obstruction to cloned map
      const clonedMap = structuredClone(map);
      clonedMap[row][col] = "#";

      const { hasLoop } = runThroughMap(clonedMap, initialGuardLocation);
      if (hasLoop) {
        numLoops++;
      }
    }
  }

  return numLoops;
};

// Part 1 test
console.log(part1("src/day06/test-input.txt"));
// 41

// Part 1
console.log(part1("src/day06/input.txt"));
// 5318

// Part 2 test
console.log(part2("src/day06/test-input.txt"));
// 6

// Part 2
console.log(part2("src/day06/input.txt"));
// 1831
