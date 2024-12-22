import type { Plot } from "./types";

type Row = number;
type Col = number;
type PlotAsString = `${Row},${Col}`;

/**
 * Queue of plots to visit. Backed by a Set, to handle duplicates automatically
 */
export class PlotQueue {
  private plotsToVisit: Set<PlotAsString>;

  constructor() {
    this.plotsToVisit = new Set<PlotAsString>();
  }

  public pushPlot(plot: Plot): void {
    this.plotsToVisit.add(`${plot.row},${plot.col}`);
  }

  public popPlot(): Plot | null {
    const plotString = this.plotsToVisit.values().next().value;
    if (!plotString) return null;

    this.plotsToVisit.delete(plotString);
    const [row, col] = plotString
      .split(",")
      .map((numString) => Number(numString));

    return { row, col };
  }

  public size(): number {
    return this.plotsToVisit.size;
  }
}
