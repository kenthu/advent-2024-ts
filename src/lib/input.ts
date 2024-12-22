import { readFileSync } from "fs";

export const readFile = (filename: string): string => {
  return readFileSync(filename, "utf8");
};

export const readLines = (filename: string): string[] => {
  return readFile(filename).trim().split("\n");
};

export const readGrid = (filename: string): string[][] => {
  return readLines(filename).map((line) => line.split(""));
};
