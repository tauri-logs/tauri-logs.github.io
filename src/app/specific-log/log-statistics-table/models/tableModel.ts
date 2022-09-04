import {TablePair} from "./tablePair";

export class TableModel {
  public title: string;
  public cells: string[];
  public data: TablePair[];

  constructor(title: string, cells: string[], data: TablePair[]) {
    this.title = title;
    this.cells = cells;
    this.data = data;
  }
}
