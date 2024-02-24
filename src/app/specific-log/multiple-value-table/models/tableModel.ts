import {TablePair} from "./tablePair";
import {MultipleValueTableStyles} from "./MultipleValueTableStyles";

export class TableModel {
  public cells: string[];
  public data: TablePair[];
  public styles: MultipleValueTableStyles;

  constructor(
    cells: string[],
    data: TablePair[],
    styles: MultipleValueTableStyles = new MultipleValueTableStyles('', '')
  ) {
    this.cells = cells;
    this.data = data;
    this.styles = styles;
  }
}
