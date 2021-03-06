import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from 'rxjs/operators';
import {Log} from "./models/log";
import {Week} from "./week";
import {Character} from "./models/character";
import {RealmEnum} from "./models/realmEnum";
import {Member} from "./models/member";
import {allianceRaces, RaceEnum, raceImage, reverseRace} from "./models/raceEnum";
import {genderImage} from "./models/genderEnum";
import {reverseSpec} from "./models/specEnum";
import {classColor} from "./models/classEnum";
import {Trinket} from "./models/trinket";
import {Faction} from "./models/faction";

@Injectable({
  providedIn: 'root'
})
export class TauriService {

  constructor(private http: HttpClient) { }

  getPlayerRaidLogs(name: string, realm: string, limit: number): Observable<Log[]> {
    return this.http.post(environment.apiUrl, {
      "url": "raid-player",
      "params": {
        "r": realm,
        "cn": name,
        "limit": limit
      }
    }, {headers: {'Content-Type': 'application/json'}}).pipe(
      map(response => {
        //@ts-ignore
        return response.response.logs;
      }));
  }

  getCharacter(charName: string, realm: RealmEnum): Observable<Character> {
    return this.http.post(environment.apiUrl, {
      url    : 'character-sheet',
      params : {
        r: realm,
        n: charName
      }
    }, {headers: {'Content-Type': 'application/json'}}).pipe(
      map(response => {
        //@ts-ignore
        return response.response;
      }));
  }

  extractLogsByMapID(logs: Log[], mapID: number) : Log[] {
    return logs.filter(log => log.map_id === mapID);
  }

  extractLogsByDateRangeAndMapID(logs: Log[], startDate: Date, endDate: Date, mapID: number) : Log[] {
    const startStamp = startDate.valueOf() / 1000;
    const endStamp = endDate.valueOf() / 1000;
    return logs.filter(log => log.map_id === mapID && startStamp <= log.killtime && log.killtime <= endStamp);
  }

  sortByLockout(logs: Log[]) : Week[] {
    const weeks : Week[] = [];
    if (logs.length) {
      let week = Week.getWeekByTimestamp(logs[0].killtime);
      let weekStart = week.startDate.valueOf() / 1000;
      weeks.push(week);
      for (let log of logs) {
        if (log.killtime < weekStart) {
          week = Week.getWeekByTimestamp(log.killtime);
          weekStart = week.startDate.valueOf() / 1000;
          weeks.push(week);
        }
        log.killDate = new Date(log.killtime * 1000);
        week.logs.push(log);
      }
    }
    return weeks;
  }

  getLogDetails(id: number) {
    return this.http.post(environment.apiUrl, {
      "url": "raid-log",
      "params": {
        "r": "[EN] Evermoon",
        "id": id
      }
    }, {headers: {'Content-Type': 'application/json'}}).pipe(
      map(response => {
        //@ts-ignore
        return response.response
      }));
  }

  static getTrinketImgUrl(race: RaceEnum, trinket?: Trinket): string {
    let imgUrl: string;
    if (trinket) {
      imgUrl = `${environment.iconUrl}medium/${trinket.icon}.png`;
    } else {
      // doesn't really matter if it's neutral here, since it's used only for img generation
      const faction = allianceRaces.includes(race) ? Faction.ALLIANCE : Faction.HORDE;
      imgUrl = `${environment.baseHref}/assets/factions/${faction}.png`;
    }
    return imgUrl;
  }

  static getTrinketTooltip(trinket?: Trinket): string {
    return trinket ? `${trinket.name}\n${trinket.ilevel} ilvl` : `Trinket data are not available for old logs.`;
  }

}
