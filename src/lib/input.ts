import { readFileSync } from "fs";

export const readLines = (filename: string): string[] => {
  return readFileSync(filename, "utf8").trim().split("\n");
};
