import { groupBy, sum } from "lodash";

import { createGrid } from "lib/grid";
import { readGrid } from "lib/input";

import type { Plot } from "./types";
import { PlotQueue } from "./PlotQueue";

export interface Region {
  plant: string;
  plots: Plot[];
}

type RegionGrid = (Region | undefined)[][];

const neighborPlots = (plot: Plot): Plot[] => {
  const { row, col } = plot;
  return [
    {
      row: row + 1,
      col,
    },
    {
      row: row - 1,
      col,
    },
    {
      row,
      col: col + 1,
    },
    {
      row,
      col: col - 1,
    },
  ];
};

const processInput = (
  filename: string
): { regionGrid: RegionGrid; regions: Region[] } => {
  /** Grid that maps each coordinate to the plant at that coordinate */
  const plantGrid = readGrid(filename);

  /** Grid that maps each coordinate to the region at that coordinate */
  const regionGrid = createGrid<Region | undefined>(
    plantGrid.length,
    plantGrid[0].length,
    undefined
  );

  const buildRegion = (initialPlot: Plot): Region => {
    const plant = plantGrid[initialPlot.row][initialPlot.col];
    const region: Region = {
      plant,
      plots: [],
    };
    const plotQueue = new PlotQueue();
    plotQueue.pushPlot({ row: initialPlot.row, col: initialPlot.col });

    while (plotQueue.size() > 0) {
      const currentPlot = plotQueue.popPlot();
      if (!currentPlot) break;

      // Mark this plot as having been visited
      regionGrid[currentPlot.row][currentPlot.col] = region;

      // Add this plot to list of plots for this regiion
      region.plots.push(currentPlot);

      for (const neighbor of neighborPlots(currentPlot)) {
        // If neighbor is the same plant and hasn't been visited yet, then queue a visit to this neighbor
        if (
          plantGrid[neighbor.row]?.[neighbor.col] === plant &&
          !regionGrid[neighbor.row]?.[neighbor.col]
        ) {
          plotQueue.pushPlot(neighbor);
        }
      }
    }

    return region;
  };

  const regions = [];

  for (let row = 0; row < plantGrid.length; row++) {
    for (let col = 0; col < plantGrid[0].length; col++) {
      if (regionGrid[row][col]) {
        // Already visited this plot, so skip
        continue;
      }

      regions.push(buildRegion({ row, col }));
    }
  }

  return { regionGrid, regions };
};

const part1 = (filename: string): number => {
  const { regionGrid, regions } = processInput(filename);

  let price = 0;

  for (const region of regions) {
    const area = region.plots.length;

    let perimeter = 0;
    for (const plot of region.plots) {
      for (const neighborPlot of neighborPlots(plot)) {
        // Increment perimeter for any side where neighboring plot is not in
        // this region.
        if (regionGrid[neighborPlot.row]?.[neighborPlot.col] !== region) {
          perimeter++;
        }
      }
    }

    price += area * perimeter;
  }

  return price;
};

const countRegionSides = (region: Region, regionGrid: RegionGrid): number => {
  const plotsWithTopBorder: Plot[] = [];
  const plotsWithBottomBorder: Plot[] = [];
  const plotsWithLeftBorder: Plot[] = [];
  const plotsWithRightBorder: Plot[] = [];

  for (const plot of region.plots) {
    const topNeighbor = { row: plot.row - 1, col: plot.col };
    if (regionGrid[topNeighbor.row]?.[topNeighbor.col] !== region) {
      plotsWithTopBorder.push(plot);
    }

    const bottomNeighbor = { row: plot.row + 1, col: plot.col };
    if (regionGrid[bottomNeighbor.row]?.[bottomNeighbor.col] !== region) {
      plotsWithBottomBorder.push(plot);
    }

    const leftNeighbor = { row: plot.row, col: plot.col - 1 };
    if (regionGrid[leftNeighbor.row]?.[leftNeighbor.col] !== region) {
      plotsWithLeftBorder.push(plot);
    }

    const rightNeighbor = { row: plot.row, col: plot.col + 1 };
    if (regionGrid[rightNeighbor.row]?.[rightNeighbor.col] !== region) {
      plotsWithRightBorder.push(plot);
    }
  }

  let numSides = 0;

  // First, group all plots with a top border by row. For each row, count the
  // sides by finding the first column for each side
  for (const plots of Object.values(groupBy(plotsWithTopBorder, "row"))) {
    const cols = plots.map((plot) => plot.col);
    const colsSet = new Set(cols);
    numSides += cols.filter((col) => !colsSet.has(col - 1)).length;
  }

  for (const plots of Object.values(groupBy(plotsWithBottomBorder, "row"))) {
    const cols = plots.map((plot) => plot.col);
    const colsSet = new Set(cols);
    numSides += cols.filter((col) => !colsSet.has(col - 1)).length;
  }

  for (const plots of Object.values(groupBy(plotsWithLeftBorder, "col"))) {
    const rows = plots.map((plot) => plot.row);
    const rowsSet = new Set(rows);
    numSides += rows.filter((row) => !rowsSet.has(row - 1)).length;
  }

  for (const plots of Object.values(groupBy(plotsWithRightBorder, "col"))) {
    const rows = plots.map((plot) => plot.row);
    const rowsSet = new Set(rows);
    numSides += rows.filter((row) => !rowsSet.has(row - 1)).length;
  }

  return numSides;
};

const part2 = (filename: string): number => {
  const { regionGrid, regions } = processInput(filename);

  return sum(
    regions.map((region) => {
      const area = region.plots.length;
      const numSides = countRegionSides(region, regionGrid);
      return area * numSides;
    })
  );
};

// Part 1 test
console.log(part1("src/day12/test-input.txt"));
// 1930

// Part 1
console.log(part1("src/day12/input.txt"));
// 1518548

// Part 2 test
console.log(part2("src/day12/test-input.txt"));
// 1206

// Part 2
console.log(part2("src/day12/input.txt"));
// 909564
