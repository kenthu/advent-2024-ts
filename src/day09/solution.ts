import { readLines } from "lib/input";
import { sum } from "lodash";

type FileId = number;
type Disk = FileId[];
type InputMode = "FILE" | "FREE_SPACE";
interface File {
  address: number;
  length: number;
}

const FREE_SPACE_FILE_ID = -1;

const processInput = (
  filename: string
): {
  disk: Disk;
  files: File[];
} => {
  const inputDiskMap = readLines(filename)[0];

  let mode: InputMode = "FILE";
  const disk: Disk = [];
  const files = [];

  for (let i = 0; i < inputDiskMap.length; i++) {
    const blockLength = Number(inputDiskMap[i]);
    const fileId: FileId = mode === "FILE" ? i / 2 : FREE_SPACE_FILE_ID;

    const currentAddress = disk.length;
    for (let j = 0; j < blockLength; j++) {
      disk.push(fileId);
    }
    if (mode === "FILE") {
      files.push({
        address: currentAddress,
        length: blockLength,
      });
    }

    mode = mode === "FILE" ? "FREE_SPACE" : "FILE";
  }

  return { disk, files };
};

/**
 * Compact disk in place
 */
const compactDisk = (disk: Disk): void => {
  let leftPointer = 0;
  let rightPointer = disk.length - 1;

  // Move leftPointer to the right and rightPointer to left, until they meet
  while (leftPointer < rightPointer) {
    // If we find a free space block, find the last block with a file, and move
    // it
    if (disk[leftPointer] === FREE_SPACE_FILE_ID) {
      while (leftPointer < rightPointer) {
        if (disk[rightPointer] !== FREE_SPACE_FILE_ID) {
          disk[leftPointer] = disk[rightPointer];
          disk[rightPointer] = FREE_SPACE_FILE_ID;
          break;
        }
        rightPointer--;
      }
    }
    leftPointer++;
  }
};

const isFreeSpace = (
  disk: Disk,
  startAddress: number,
  length: number
): boolean => {
  if (startAddress + length > disk.length) {
    return false;
  }

  for (let i = startAddress; i < startAddress + length; i++) {
    if (disk[i] !== FREE_SPACE_FILE_ID) {
      return false;
    }
  }

  return true;
};

const moveFile = (disk: Disk, file: File, destAddress: number): void => {
  for (let i = 0; i < file.length; i++) {
    disk[destAddress + i] = disk[file.address + i];
    disk[file.address + i] = FREE_SPACE_FILE_ID;
  }
};

/**
 * Defrag disk in place
 */
const defragmentDisk = (disk: Disk, files: File[]): void => {
  for (let fileId = files.length - 1; fileId >= 0; fileId--) {
    // I considered an optimization where we keep track of free space blocks, so
    // it's faster to find the left-most free space block that's big enough,
    // without iterating over whole disk. Let's try that if the current
    // implementation is too slow for our input.
    const file = files[fileId];
    for (let pointer = 0; pointer < file.address; pointer++) {
      if (isFreeSpace(disk, pointer, file.length)) {
        moveFile(disk, file, pointer);
        break;
      }
    }
  }
};

const getChecksum = (disk: Disk): number => {
  return sum(
    disk.map((fileId: FileId, address: number) =>
      fileId === FREE_SPACE_FILE_ID ? 0 : fileId * address
    )
  );
};

const part1 = (filename: string): number => {
  const { disk } = processInput(filename);

  compactDisk(disk);
  return getChecksum(disk);
};

const part2 = (filename: string): number => {
  const { disk, files } = processInput(filename);

  defragmentDisk(disk, files);
  return getChecksum(disk);
};

// Part 1 test
console.log(part1("src/day09/test-input.txt"));
// 1928

// Part 1
console.log(part1("src/day09/input.txt"));
// 6370402949053

// Part 2 test
console.log(part2("src/day09/test-input.txt"));
// 2858

// Part 2
console.log(part2("src/day09/input.txt"));
// 6398096697992
