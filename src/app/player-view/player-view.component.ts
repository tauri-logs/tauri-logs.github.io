import { Component, OnInit } from '@angular/core';
import {TauriService} from "../tauri/tauri.service";
import {Log} from "../tauri/models/log";
import {RaidMapEnum} from "../tauri/models/map";
import {Week} from "../tauri/week";
import {MatDialog} from "@angular/material/dialog";
import {SpecificLogComponent} from "../specific-log/specific-log.component";
import {ActivatedRoute} from "@angular/router";
import {Character} from "../tauri/models/character";

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
  public character?: Character;

  constructor(private tauriService: TauriService,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let playerName = params['name'];
      this.tauriService.getCharacter(playerName, "[EN] Evermoon").subscribe(
        response => {
          this.character = response;
        }
      );
      this.tauriService.getPlayerRaidLogs(playerName,"[EN] Evermoon", 50).subscribe(
        response => {
          const mapLogs : Log[] = this.tauriService.extractLogsByMapID(response, RaidMapEnum.SOO);
          this.playerLogs = this.tauriService.sortByLockout(mapLogs);
        }
      );
    })
  }

  showSpecificLog(log: Log) {
    this.dialog.open(SpecificLogComponent, {
      data: {id: log.log_id, time: log.fight_time/1000, guild: log.guilddata},
      minHeight: '90vh'
    });
  }

  debug(): void {
    // console.log(this.s);
  }

}
