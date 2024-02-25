import {KillComparisonTableData} from "./KillComparisonTableData";

export class KillComparisonTableModel {
    public data: KillComparisonTableData[];

    constructor(
        data: KillComparisonTableData[],
    ) {
        this.data = data;
    }
}
