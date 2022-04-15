import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TauriService {

  constructor(private http: HttpClient) { }

  // getStepanRaidLogs(): Observable<object> {
    // return this.http.post('http://chapi.tauri.hu/apiIndex.php')
  // }
}
