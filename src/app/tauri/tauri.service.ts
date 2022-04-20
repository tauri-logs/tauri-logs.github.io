import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from 'rxjs/operators';
import {Log} from "./log";
import {Week} from "./week";

@Injectable({
  providedIn: 'root'
})
export class TauriService {

  constructor(private http: HttpClient) { }

  getStepanRaidLogs(limit: number): Observable<Log[]> {
    return this.http.post(environment.apiUrl, {
      "url": "raid-player",
      "params": {
        "r": "[EN] Evermoon",
        "cn": "Stepan",
        "limit": limit
      }
    }, {headers: {'Content-Type': 'application/json'}}).pipe(
      map(response => {
        //@ts-ignore
        return response.response.logs
      }));
  }

  extractLogsByMapID(logs: Log[], mapID: number) : Log[] {
    return logs.filter(log => log.map_id === mapID);
  }

  sortByLockout(logs: Log[]) : Week[] {
    const weeks : Week[] = [];
    if (logs.length) {
      let week = Week.getWeekByTimestamp(logs[0].killtime);
      let weekStart = week.startDate.valueOf() / 1000;
      weeks.push(week);
      for (let log of logs) {
        if (log.killtime <  weekStart) {
          week = Week.getWeekByTimestamp(log.killtime);
          weekStart = week.startDate.valueOf() / 1000;
          weeks.push(week);
        }
        week.logs.push(log);
      }
    }
    return weeks;
  }


}
