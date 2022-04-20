import { Component, OnInit } from '@angular/core';
import {TauriService} from "../tauri/tauri.service";
import {Log} from "../tauri/log";
import {RaidMapEnum} from "../tauri/map";
import {Week} from "../tauri/week";

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent implements OnInit {

  public playerLogs: Week[] = [];

  constructor(private tauriService: TauriService) { }

  ngOnInit(): void {
    this.tauriService.getStepanRaidLogs(50).subscribe(
      response => {
        // console.log(response)
        const mapLogs : Log[] = this.tauriService.extractLogsByMapID(response, RaidMapEnum.SOO);
        this.playerLogs = this.tauriService.sortByLockout(mapLogs);
        console.log(this.playerLogs)
      }
    )
  }

}
