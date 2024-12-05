import { readFile } from "lib/input";

type Rule = `${string}|${string}`;
type Rules = Set<Rule>;
type Update = string[];

const processInput = (
  filename: string
): {
  rules: Rules;
  updates: Update[];
} => {
  const [rulesString, updatesString] = readFile(filename).trim().split("\n\n");

  const rules = new Set<Rule>();
  for (const rule of rulesString.split("\n")) {
    rules.add(rule as Rule);
  }

  const updates = updatesString
    .split("\n")
    .map((updateString) => updateString.split(","));

  return { rules, updates };
};

const isUpdateSorted = (update: Update, rules: Rules): boolean => {
  for (const [i, before] of update.entries()) {
    // Check if any of the numbers after this one violates a rule
    const afterNumbers = update.slice(i + 1);
    if (afterNumbers.some((after) => rules.has(`${after}|${before}`))) {
      return false;
    }
  }

  return true;
};

const middlePageNumber = (update: Update): number => {
  if (update.length % 2 === 0) {
    throw new Error("Update should have an odd number of elements");
  }
  return Number(update[(update.length - 1) / 2]);
};

/**
 * Sort update in place
 */
const sortUpdate = (update: Update, rules: Rules): void => {
  update.sort((a, b) => {
    if (rules.has(`${a}|${b}`)) {
      return -1;
    } else if (rules.has(`${b}|${a}`)) {
      return 1;
    } else if (a === b) {
      return 0;
    } else {
      throw new Error(`Unable to compare ${a} to ${b})`);
    }
  });
};

const part1 = (filename: string): number => {
  const { rules, updates } = processInput(filename);

  return updates
    .filter((update) => isUpdateSorted(update, rules))
    .map((update) => middlePageNumber(update))
    .reduce((acc, num) => acc + num, 0);
};

const part2 = (filename: string): number => {
  const { rules, updates } = processInput(filename);

  const incorrectlySortedUpdates = updates.filter(
    (update) => !isUpdateSorted(update, rules)
  );
  for (const update of incorrectlySortedUpdates) {
    sortUpdate(update, rules);
  }

  return incorrectlySortedUpdates
    .map((update) => middlePageNumber(update))
    .reduce((acc, num) => acc + num, 0);
};

// Part 1 test
console.log(part1("src/day05/test-input.txt"));
// 143

// Part 1
console.log(part1("src/day05/input.txt"));
// 7307

// Part 2 test
console.log(part2("src/day05/test-input.txt"));
// 123

// Part 2
console.log(part2("src/day05/input.txt"));
// 4713
