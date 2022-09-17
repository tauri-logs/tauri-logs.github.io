import {Injectable} from "@angular/core";
import {TablePair} from "./models/tablePair";
import {RaidDetail} from "../../tauri/models/raidDetail";
import {SOO_DIFFICULTIES} from "../../tauri/models/raidDifficulty";
import {Member} from "../../tauri/models/member";
import {TableModel} from "./models/tableModel";
import {Composition} from "../../tauri/models/composition";
import {getLogByDifficultyAndEncounter} from "../../tauri/firstLogs";

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
      new TablePair('Wipes', raidDetail.wipes.toString()),
      new TablePair('Duration',
        `${Math.floor(raidDetail.fight_time / 60000)}:${Math.floor((raidDetail.fight_time % 60000) / 1000)}`
      ),
      new TablePair('Ressurects/Deaths', `${raidDetail.resurrects_fight}/${raidDetail.deaths_fight}`),
    ];
  }

  getCompositionTableModel(members: Member[]): TableModel {
    return new TableModel(['Composition', ''], this.getComposition(members));
  }

  private getComposition(members: Member[]): TablePair[] {
    const composition = new Composition(members);
    return [
      new TablePair('Tank', composition.tanks.toString()),
      new TablePair('Healer', composition.healers.toString()),
      new TablePair('DPS', (composition.mdps + composition.rdps).toString()),
      new TablePair('Total', composition.total.toString())
    ]
  }

  getAdditionalInfoModel(raidDetail: RaidDetail): TableModel {
    return new TableModel(['Additional info', ''], this.getAdditionalInfo(raidDetail), ['', 'padding-left: 10px;']);
  }

  private getAdditionalInfo(raidDetail: RaidDetail): TablePair[] {
    let avgIlvl = 0; // for loop for performance over reduce
    for (let member of raidDetail.members) {
      avgIlvl += member.ilvl;
    }
    avgIlvl /= raidDetail.member_count;
    const firstLog = getLogByDifficultyAndEncounter(raidDetail.difficulty, raidDetail.encounter_data.encounter_index);
    const formattedKillTime = `${Math.floor(firstLog.killTime / 60)}:${Math.floor((firstLog.killTime % 60))}`;
    return [
      new TablePair('Average ilvl', avgIlvl.toString()),
      new TablePair('1. HC kill ilvl', firstLog.avgIlvl.toString()),
      new TablePair('1. HC kill time', formattedKillTime),
      new TablePair('Kill with trash?', false.toString()), //TODO: implement
    ]
  }
}
