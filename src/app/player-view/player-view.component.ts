import {Component, OnInit} from '@angular/core';
import {TauriService} from "../tauri/tauri.service";
import {Log} from "../tauri/models/log";
import {RaidMapEnum} from "../tauri/models/map";
import {Week} from "../tauri/week";
import {MatDialog} from "@angular/material/dialog";
import {SpecificLogComponent} from "../specific-log/specific-log.component";
import {ActivatedRoute} from "@angular/router";
import {Character} from "../tauri/models/character";
import {REALM_ARRAY, RealmEnum} from "../tauri/models/realmEnum";
import {Member} from "../tauri/models/member";
import {raceImage, reverseRace} from "../tauri/models/raceEnum";
import {genderImage} from "../tauri/models/genderEnum";
import {reverseSpec} from "../tauri/models/specEnum";
import {classColor} from "../tauri/models/classEnum";
import {environment} from '../../environments/environment';

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
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.character = undefined;
      const playerName = params['name'];
      const playerRealm: RealmEnum = params['realm'];
      if (playerName.length && REALM_ARRAY.includes(playerRealm)) {
        this.tauriService.getCharacter(playerName, playerRealm).subscribe(
          response => {
            this.character = response;
            this.amountOfLogsFilter = 50;
            this.filter();
          },
          error => {
            //TODO: implement popup service
            if (error.status === 502) {
              console.log("Tauri api is down");
            } else {
              console.log(error.error.errorstring);
            }
          }
        );
      }
    })
  }

  filter() {
    if (this.character) {
      this.tauriService.getPlayerRaidLogs(this.character.name, this.character.realm, this.amountOfLogsFilter).subscribe(
        response => {
          const filterDiff = this.startFilter.valueOf() - this.endFilter.valueOf();
          const mapLogs: Log[] = filterDiff ?
            this.tauriService.extractLogsByDateRangeAndMapID(response, this.startFilter, this.endFilter, RaidMapEnum.SOO)
            : this.tauriService.extractLogsByMapID(response, RaidMapEnum.SOO);
          this.playerLogs = this.tauriService.sortByLockout(mapLogs);
        }
      );
    }
  }

  showSpecificLog(log: Log) {
    this.dialog.open(SpecificLogComponent, {
      data: {
        id: log.log_id,
        guild: log.guilddata,
        boss: `${log.encounter_data.encounter_name} ${log.difficultyName}`
      },
      minHeight: '90vh'
    });
  }

  getRaceImage: (character: Character) => string = function (character: Character): string {
    return `${environment.baseHref}/assets/races/${raceImage[character.race]}-${genderImage[character.gender]}.webp`;
  };

  getRaceTooltip: (character: Character) => string = function (character: Character): string {
    return reverseRace[character.race];
  };

  getClassColor: (character: Character) => string = function (character: Character): string {
    return `color: ${classColor[character.class]};`;
  }
}
