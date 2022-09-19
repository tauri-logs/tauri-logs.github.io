import {Injectable} from "@angular/core";
import {TablePair} from "./models/tablePair";
import {RaidDetail} from "../../tauri/models/raidDetail";
import {SOO_DIFFICULTIES} from "../../tauri/models/raidDifficulty";
import {Member} from "../../tauri/models/member";
import {TableModel} from "./models/tableModel";
import {Composition} from "../../tauri/models/composition";

@Injectable({
  providedIn: 'root'
})
export class TableDataConvertService {

  constructor() {
  }

  getLogStatisticsTableModel(raidDetail: RaidDetail): TableModel {
    return new TableModel(['Log Statistics', ''], this.getLogStatistics(raidDetail));
  }

  private getLogStatistics(raidDetail: RaidDetail): TablePair[] {
    return [
      new TablePair('Boss',
        //@ts-ignore
        `${raidDetail.encounter_data.encounter_name} ${SOO_DIFFICULTIES[raidDetail.difficulty]}`
      ),
      new TablePair('Wipes', this.formatNumber(raidDetail.wipes, 2)),
      new TablePair('Duration',
        `${this.formatNumber(Math.floor(raidDetail.fight_time / 60000), 2)}:${this.formatNumber(Math.floor((raidDetail.fight_time % 60000) / 1000), 2)}`
      ),
      new TablePair('Ressurects/Deaths', `${this.formatNumber(raidDetail.resurrects_fight, 2)}/${this.formatNumber(raidDetail.deaths_fight, 2)}`),
    ];
  }

  getCompositionTableModel(members: Member[]): TableModel {
    return new TableModel(['Composition', ''], this.getComposition(members));
  }

  private getComposition(members: Member[]): TablePair[] {
    const composition = new Composition(members);
    return [
      new TablePair('Tank', this.formatNumber(composition.tanks, 2)),
      new TablePair('Healer', this.formatNumber(composition.healers, 2)),
      new TablePair('DPS', this.formatNumber(composition.mdps + composition.rdps, 2)),
      new TablePair('Total', this.formatNumber(composition.total, 2))
    ]
  }

  private formatNumber(number: number, digits: number): string {
    return number.toLocaleString('en-US', {minimumSignificantDigits: digits});
  }
}
