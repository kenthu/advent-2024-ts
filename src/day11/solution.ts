import { readLines } from "lib/input";

const processInput = (filename: string): number[] => {
  return readLines(filename)[0]
    .split(" ")
    .map((numString) => Number(numString));
};

const executeBlinks = (filename: string, numBlinks: number): number => {
  let stones = processInput(filename);

  for (let i = 0; i < numBlinks; i++) {
    const newStones = [];

    for (const stone of stones) {
      if (stone === 0) {
        newStones.push(1);
        continue;
      }

      const stoneAsString = stone.toString();
      const stoneDigits = stoneAsString.length;
      if (stoneDigits % 2 === 0) {
        newStones.push(Number(stoneAsString.slice(0, stoneDigits / 2)));
        newStones.push(Number(stoneAsString.slice(stoneDigits / 2)));
        continue;
      }

      newStones.push(stone * 2024);
    }

    stones = newStones;
  }

  return stones.length;
};

// Part 1 test
console.log(executeBlinks("src/day11/test-input.txt", 25));
// 55312

// Part 1
console.log(executeBlinks("src/day11/input.txt", 25));
// 218079
