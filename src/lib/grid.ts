export function createGrid<T>(
  numRows: number,
  numCols: number,
  initialValue: T
): T[][] {
  return Array.from({ length: numRows }, () =>
    Array(numCols).fill(initialValue)
  );
}
