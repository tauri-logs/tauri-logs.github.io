import {Injectable} from "@angular/core";
import {TablePair} from "./models/tablePair";
import {RaidDetail} from "../../tauri/models/logModels/raidDetail";
import {RAID_DIFFICULTIES} from "../../tauri/models/enums/raidDifficulty";
import {Member} from "../../tauri/models/characterModels/member";
import {TableModel} from "./models/tableModel";
import {Composition} from "../../tauri/models/composition";
import {getLogByDifficultyAndEncounter} from "../../tauri/firstLogs";
import {KillComparisonTableModel} from "../kill-comparison-table/models/KillComparisonTableModel";
import {KillComparisonTableData} from "../kill-comparison-table/models/KillComparisonTableData";

@Injectable({
  providedIn: 'root'
})
export class TableDataConvertService {

  constructor() {
  }

  getLogStatisticsTableModel(raidDetail: RaidDetail): TableModel {
    return new TableModel(
      ['Log Statistics', ''],
      this.getLogStatistics(raidDetail)
    );
  }

  getCompositionTableModel(members: Member[]): TableModel {
    return new TableModel(['Composition', ''], this.getComposition(members));
  }

  getComparisonTableModel(raidDetail: RaidDetail): KillComparisonTableModel {
    return new KillComparisonTableModel(
      this.getAdditionalInfo(raidDetail)
    );
  }

  private getLogStatistics(raidDetail: RaidDetail): TablePair[] {
    return [
      new TablePair('Boss', raidDetail.encounter_data.encounter_name),
      new TablePair('Difficulty', RAID_DIFFICULTIES[raidDetail.difficulty]),
      new TablePair('Wipes', this.formatNumber(raidDetail.wipes, 1)),
      new TablePair('Ressurects/Deaths', `${this.formatNumber(raidDetail.resurrects_fight, 2)}/${this.formatNumber(raidDetail.deaths_fight, 2)}`),
    ];
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
    return number.toLocaleString('en-US', {minimumIntegerDigits: digits});
  }

  private getAdditionalInfo(raidDetail: RaidDetail): KillComparisonTableData[] {
    let avgIlvl = 0; // for loop for performance over reduce
    let dmgDone = 0;
    for (let member of raidDetail.members) {
      avgIlvl += member.ilvl;
      dmgDone += member.dmg_done;
    }
    avgIlvl /= raidDetail.member_count;
    const avgDps = Math.round((dmgDone * 1000) / (raidDetail.member_count * raidDetail.fight_time));
    const firstLog = getLogByDifficultyAndEncounter(raidDetail.difficulty, raidDetail.encounter_data.encounter_index);
    const formattedFirstKillTime = `${Math.floor(firstLog.killTime / 60)}:${Math.floor((firstLog.killTime % 60))}`;
    const formattedKillTIme = `${this.formatNumber(Math.floor(raidDetail.fight_time / 60000), 2)}:${this.formatNumber(Math.floor((raidDetail.fight_time % 60000) / 1000), 2)}`
    return [
      new KillComparisonTableData(
        'Average ilvl',
        avgIlvl.toFixed(2).toString(),
        firstLog.avgIlvl.toFixed(2).toString()
      ),
      new KillComparisonTableData(
        'Kill time',
        formattedKillTIme,
        formattedFirstKillTime
      ),
      new KillComparisonTableData(
        'Average DPS',
        avgDps.toLocaleString(),
        firstLog.avgDps.toLocaleString()
      ),
      new KillComparisonTableData(
        'Total DMG done',
        this.formatToShortNotation(dmgDone, 2),
        this.formatToShortNotation(firstLog.dmgDone, 2)
      ),
    ]
  }

  //ES2020 supports this natively, but I can't use it, since webpack 4 doesn't support it
  private formatToShortNotation(number: number, digits: number): string {
    const lookup = [
      {value: 1, symbol: ""},
      {value: 1e3, symbol: "K"},
      {value: 1e6, symbol: "M"},
      {value: 1e9, symbol: "B"},
      {value: 1e12, symbol: "T"},
      {value: 1e15, symbol: "P"},
      {value: 1e18, symbol: "E"}
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup.slice().reverse().find(function (item) {
      return number >= item.value;
    });
    return item ? (number / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }
}
