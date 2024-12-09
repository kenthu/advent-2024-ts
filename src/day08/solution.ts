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
  numRows: number;
  numCols: number;
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
    numRows: rows.length,
    numCols: rows[0].length,
  };
};

const isValidLocation = (
  location: Location,
  numRows: number,
  numCols: number
): boolean =>
  location.row >= 0 &&
  location.row < numRows &&
  location.col >= 0 &&
  location.col < numCols;

const part1 = (filename: string): number => {
  const { antennaLocations, numRows, numCols } = processInput(filename);

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
        if (isValidLocation(antinode1, numRows, numCols)) {
          locationsWithAntinodes.add(`${antinode1.row},${antinode1.col}`);
        }
        if (isValidLocation(antinode2, numRows, numCols)) {
          locationsWithAntinodes.add(`${antinode2.row},${antinode2.col}`);
        }
      }
    }
  }

  return locationsWithAntinodes.size;
};

const showLocations = (
  locations: Set<string>,
  numRows: number,
  numCols: number
): void => {
  const grid = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => ".")
  );

  for (const location of locations) {
    const [row, col] = location
      .split(",")
      .map((numString) => Number(numString));
    grid[row][col] = "#";
  }

  for (const row of grid) {
    console.log(row.join(""));
  }
};

const part2 = (filename: string): number => {
  const { antennaLocations, numRows, numCols } = processInput(filename);

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

        // Starting antenna at location i, move towards location j until we're off the chart
        const currentLocation = { ...locations[i] };
        while (isValidLocation(currentLocation, numRows, numCols)) {
          locationsWithAntinodes.add(
            `${currentLocation.row},${currentLocation.col}`
          );
          currentLocation.row += rowOffset;
          currentLocation.col += colOffset;
        }

        // Go back in the other direction
        currentLocation.row = locations[i].row - rowOffset;
        currentLocation.col = locations[i].col - colOffset;
        while (isValidLocation(currentLocation, numRows, numCols)) {
          locationsWithAntinodes.add(
            `${currentLocation.row},${currentLocation.col}`
          );
          currentLocation.row -= rowOffset;
          currentLocation.col -= colOffset;
        }
      }
    }
  }

  return locationsWithAntinodes.size;
};

// Part 1 test
console.log(part1("src/day08/test-input.txt"));
// 14

// Part 1
console.log(part1("src/day08/input.txt"));
// 359

// Part 2 test
console.log(part2("src/day08/test-input.txt"));
// 34

// Part 2
console.log(part2("src/day08/input.txt"));
// 1293
