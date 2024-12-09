import { readLines } from "lib/input";

interface Location {
  row: number;
  col: number;
}
type AntennaLocations = Record<string, Location[]>;

const processInput = (
  filename: string
): {
  antennaLocations: AntennaLocations;
  maxRow: number;
  maxCol: number;
} => {
  const rows = readLines(filename);

  const antennaLocations: AntennaLocations = {};

  for (let row = 0; row < rows.length; row++) {
    for (let col = 0; col < rows[0].length; col++) {
      const frequency = rows[row][col];
      if (frequency !== ".") {
        if (!antennaLocations[frequency]) {
          antennaLocations[frequency] = [];
        }
        antennaLocations[frequency].push({ row, col });
      }
    }
  }

  return {
    antennaLocations,
    maxRow: rows.length - 1,
    maxCol: rows[0].length - 1,
  };
};

const part1 = (filename: string): number => {
  const { antennaLocations, maxRow, maxCol } = processInput(filename);

  const isValidLocation = (location: Location): boolean =>
    location.row >= 0 &&
    location.row <= maxRow &&
    location.col >= 0 &&
    location.col <= maxCol;

  // Locations are stored as "ROW,COL"
  const locationsWithAntinodes = new Set<string>();

  // For each frequency
  //   For each pair of antennae in this frequency
  //     Calculate its antinodes
  //     If they're on the chart, add it to the set of locations with antinodes
  for (const locations of Object.values(antennaLocations)) {
    for (let i = 0; i < locations.length; i++) {
      for (let j = i + 1; j < locations.length; j++) {
        const rowOffset = locations[j].row - locations[i].row;
        const colOffset = locations[j].col - locations[i].col;
        const antinode1 = {
          row: locations[j].row + rowOffset,
          col: locations[j].col + colOffset,
        };
        const antinode2 = {
          row: locations[i].row - rowOffset,
          col: locations[i].col - colOffset,
        };
        if (isValidLocation(antinode1)) {
          locationsWithAntinodes.add(`${antinode1.row},${antinode1.col}`);
        }
        if (isValidLocation(antinode2)) {
          locationsWithAntinodes.add(`${antinode2.row},${antinode2.col}`);
        }
      }
    }
  }

  return locationsWithAntinodes.size;
};

const part2 = (filename: string): number => {
  const { _ } = processInput(filename);

  return -1;
};

// Part 1 test
console.log(part1("src/day08/test-input.txt"));
// 14

// Part 1
console.log(part1("src/day08/input.txt"));
// 359

// // Part 2 test
// console.log(part2("src/day08/test-input.txt"));
// //

// // Part 2
// console.log(part2("src/day08/input.txt"));
// //
