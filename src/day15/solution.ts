import { readFile } from "lib/input";
import { printGrid } from "lib/grid";

type Map = ("#" | "." | "O" | "@")[][];
type Command = "<" | ">" | "^" | "v";

interface Position {
  row: number;
  col: number;
}

const processInput = (
  filename: string
): {
  map: Map;
  commands: Command[];
} => {
  const [mapLines, commandLines] = readFile(filename).split("\n\n");

  return {
    map: mapLines.split("\n").map((mapLine) => mapLine.split("")) as Map,
    commands: commandLines.replaceAll("\n", "").split("") as Command[],
  };
};

const findRobot = (map: Map): Position => {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === "@") {
        return { row, col };
      }
    }
  }

  throw new Error("Unable to find robot");
};

const sumGpsCoordinates = (map: Map): number => {
  let sum = 0;
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === "O") {
        sum += row * 100 + col;
      }
    }
  }

  return sum;
};

const getDirectionIncrement = (
  command: Command
): {
  row: -1 | 0 | 1;
  col: -1 | 0 | 1;
} => {
  if (command === "^") {
    return { row: -1, col: 0 };
  }

  if (command === "v") {
    return { row: 1, col: 0 };
  }

  if (command === "<") {
    return { row: 0, col: -1 };
  }

  if (command === ">") {
    return { row: 0, col: 1 };
  }

  throw new Error(`Unexpected command "${command}"`);
};

const part1 = (filename: string): number => {
  const { map, commands } = processInput(filename);
  let robotPos = findRobot(map);

  const executeCommand = (command: Command): void => {
    const incr = getDirectionIncrement(command);
    const nextPos = {
      row: robotPos.row + incr.row,
      col: robotPos.col + incr.col,
    };
    const contentsOfNextPos = map[nextPos.row][nextPos.col];

    // Open space => move robot
    if (contentsOfNextPos === ".") {
      map[nextPos.row][nextPos.col] = "@";
      map[robotPos.row][robotPos.col] = ".";
      robotPos = nextPos;
      return;
    }

    // Hit a wall => end command
    if (contentsOfNextPos === "#") {
      return;
    }

    // Next space is a box => try to shove all boxes over
    if (contentsOfNextPos === "O") {
      const checkPos = {
        row: nextPos.row + incr.row,
        col: nextPos.col + incr.col,
      };
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (map[checkPos.row][checkPos.col] === ".") {
          // Found an empty space => shift all boxes to the left
          // .OOOO@
          // becomes ...
          // OOOO@.
          map[checkPos.row][checkPos.col] = "O";
          map[nextPos.row][nextPos.col] = "@";
          map[robotPos.row][robotPos.col] = ".";
          robotPos = nextPos;
          return;
        }

        if (map[checkPos.row][checkPos.col] === "#") {
          // Hit a wall => end command
          return;
        }

        if (map[checkPos.row][checkPos.col] === "O") {
          // Yet another box => keep looking for an empty space
          checkPos.row += incr.row;
          checkPos.col += incr.col;
        }
      }
    }
  };

  for (const command of commands) {
    executeCommand(command);
  }

  printGrid(map);

  return sumGpsCoordinates(map);
};

// Part 1 (smaller example)
console.log(part1("src/day15/test-input-small.txt"));
// 2028

// Part 1 (larger example)
console.log(part1("src/day15/test-input-large.txt"));
// 10092

// Part 1
console.log(part1("src/day15/input.txt"));
// 1448589
