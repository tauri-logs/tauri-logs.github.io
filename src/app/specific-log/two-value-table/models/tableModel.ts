import {TablePair} from "./tablePair";

export class TableModel {
  public cells: string[];
  public data: TablePair[];

  constructor(cells: string[], data: TablePair[]) {
    this.cells = cells;
    this.data = data;
  }
}
