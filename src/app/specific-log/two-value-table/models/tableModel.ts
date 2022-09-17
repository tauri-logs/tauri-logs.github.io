import {TablePair} from "./tablePair";

export class TableModel {
  public cells: string[];
  public data: TablePair[];
  public styles: string[];

  constructor(cells: string[], data: TablePair[], styles: string[] = ['', '']) {
    this.cells = cells;
    this.data = data;
    this.styles = styles;
  }
}
