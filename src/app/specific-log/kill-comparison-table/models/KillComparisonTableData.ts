export class KillComparisonTableData {
  public rowDefinition: string;
  public thisKill: string;
  public firstKill: string;

  constructor(
    rowDefinition: string,
    thisKill: string,
    firstKill: string
  ) {
    this.rowDefinition = rowDefinition;
    this.thisKill = thisKill;
    this.firstKill = firstKill;
  }
}
