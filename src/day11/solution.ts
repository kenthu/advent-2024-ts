import { readLines } from "lib/input";
import { countBy, sum } from "lodash";

const processInput = (filename: string): Record<string, number> => {
  return countBy(readLines(filename)[0].split(" "));
};

const addToCount = (
  stoneCounts: Record<string, number>,
  stone: string,
  count: number
): void => {
  if (!(stone in stoneCounts)) {
    stoneCounts[stone] = 0;
  }
  stoneCounts[stone] += count;
};

const executeBlinks = (filename: string, numBlinks: number): number => {
  let stoneCounts = processInput(filename);

  for (let i = 0; i < numBlinks; i++) {
    const nextStoneCounts: Record<string, number> = {};

    for (const [stone, count] of Object.entries(stoneCounts)) {
      if (stone === "0") {
        addToCount(nextStoneCounts, "1", count);
        continue;
      }

      const stoneDigits = stone.length;
      if (stoneDigits % 2 === 0) {
        const left = stone.slice(0, stoneDigits / 2);
        const right = stone.slice(stoneDigits / 2);

        addToCount(nextStoneCounts, Number(left).toString(), count);
        addToCount(nextStoneCounts, Number(right).toString(), count);
        continue;
      }

      addToCount(nextStoneCounts, (Number(stone) * 2024).toString(), count);
    }

    stoneCounts = nextStoneCounts;
  }

  return sum(Object.values(stoneCounts));
};

// Part 1 test
console.log(executeBlinks("src/day11/test-input.txt", 25));
// 55312

// Part 1
console.log(executeBlinks("src/day11/input.txt", 25));
// 218079

// Part 2
console.log(executeBlinks("src/day11/input.txt", 75));
// 259755538429618
