import { Component, OnInit } from '@angular/core';
import {TauriService} from "../tauri/tauri.service";
import {Log} from "../tauri/models/log";
import {RaidMapEnum} from "../tauri/models/map";
import {Week} from "../tauri/week";
import {MatDialog} from "@angular/material/dialog";
import {SpecificLogComponent} from "../specific-log/specific-log.component";

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent implements OnInit {

  public playerLogs: Week[] = [];
  public startFilter: Date = new Date();
  public endFilter: Date = new Date();
  public amountOfLogsFilter: number = 0;

  constructor(private tauriService: TauriService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.tauriService.getStepanRaidLogs(50).subscribe(
      response => {
        // console.log(response)
        const mapLogs : Log[] = this.tauriService.extractLogsByMapID(response, RaidMapEnum.SOO);
        this.playerLogs = this.tauriService.sortByLockout(mapLogs);
      }
    )
  }

  showSpecificLog(log: Log) {
    this.dialog.open(SpecificLogComponent, {
      data: {id: log.log_id, time: log.fight_time},
      minHeight: '90vh'
    });
  }

  debug(): void {
    // console.log(this.s);
  }

}
