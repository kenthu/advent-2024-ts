import { readLines } from "lib/input";

interface Robot {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
}

const processInput = (filename: string): Robot[] => {
  const regex = /^p=(\d+),(\d+) v=(-?\d+),(-?\d+)$/;

  return readLines(filename).map((line) => {
    const matches = line.match(regex);
    if (!matches) {
      throw new Error("Regex didn't match");
    }

    return {
      x: Number(matches[1]),
      y: Number(matches[2]),
      velocityX: Number(matches[3]),
      velocityY: Number(matches[4]),
    };
  });
};

const part1 = (filename: string, width: number, height: number): number => {
  const robots = processInput(filename);
  const midX = (width - 1) / 2;
  const midY = (height - 1) / 2;

  const robotCounts = [0, 0, 0, 0];
  for (const robot of robots) {
    robot.x = (((robot.x + robot.velocityX * 100) % width) + width) % width;
    robot.y = (((robot.y + robot.velocityY * 100) % height) + height) % height;

    if (robot.x < midX && robot.y < midY) {
      robotCounts[0]++;
    } else if (robot.x > midX && robot.y < midY) {
      robotCounts[1]++;
    } else if (robot.x < midX && robot.y > midY) {
      robotCounts[2]++;
    } else if (robot.x > midX && robot.y > midY) {
      robotCounts[3]++;
    }
  }

  return robotCounts[0] * robotCounts[1] * robotCounts[2] * robotCounts[3];
};

// Part 1 test
console.log(part1("src/day14/test-input.txt", 11, 7));
// 12

// Part 1
console.log(part1("src/day14/input.txt", 101, 103));
// 218433348
