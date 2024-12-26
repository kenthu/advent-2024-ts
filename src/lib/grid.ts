export function createGrid<T>(
  numRows: number,
  numCols: number,
  initialValue: T
): T[][] {
  return Array.from({ length: numRows }, () =>
    Array(numCols).fill(initialValue)
  );
}

export const printGrid = (grid: string[][]): void => {
  for (const row of grid) {
    console.log(row.join(""));
  }
};
