import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TauriService {

  constructor(private http: HttpClient) { }

  getStepanRaidLogs(): Observable<Log[]> {
    // 'https://cors.bridged.cc/'
    return this.http.post(environment.apiUrl, {
      "url": "raid-player",
      "params": {
        "r": "[EN] Evermoon",
        "cn": "Stepan",
        "limit": 10
      }
    }, {headers: {'Content-Type': 'application/json'}}).pipe(
      map(response => {
        //@ts-ignore
        return response.response.logs
      }));
  }
}
