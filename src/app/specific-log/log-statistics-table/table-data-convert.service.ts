import {Injectable} from "@angular/core";
import {TablePair} from "./models/tablePair";
import {RaidDetail} from "../../tauri/models/raidDetail";
import {SOO_DIFFICULTIES} from "../../tauri/models/raidDifficulty";
import {Member} from "../../tauri/models/member";
import {TableModel} from "./models/tableModel";

@Injectable({
  providedIn: 'root'
})
export class TableDataConvertService {

  constructor() {}

  getLogStatisticsTableModel(raidDetail: RaidDetail): TableModel {
    return new TableModel('Log Statistics', ['Name', 'Value'], this.getLogStatistics(raidDetail));
  }

  private getLogStatistics(raidDetail: RaidDetail): TablePair[] {
    return [
      new TablePair('Boss',
        //@ts-ignore
        `${raidDetail.encounter_data.encounter_name} ${SOO_DIFFICULTIES[raidDetail.difficulty]}`
      ),
      new TablePair('Wipes', raidDetail.wipes.toString()),
      new TablePair('Duration',
        `${Math.floor(raidDetail.fight_time / 60000)}:${Math.floor((raidDetail.fight_time % 60000) / 1000)}`
      ),
      new TablePair('Ressurects/Deaths', `${raidDetail.resurrects_fight}/${raidDetail.deaths_fight}`),
    ];
  }

  getComposition(members: Member[]) {

  }
}
