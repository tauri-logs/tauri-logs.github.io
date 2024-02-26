import {Component, OnInit} from '@angular/core';
import {TauriService} from "../tauri/tauri.service";
import {Log} from "../tauri/models/logModels/log";
import {Week} from "../tauri/week";
import {MatDialog} from "@angular/material/dialog";
import {SpecificLogComponent} from "../specific-log/specific-log.component";
import {ActivatedRoute, Router} from "@angular/router";
import {Character} from "../tauri/models/characterModels/character";
import {REALM_ARRAY, RealmEnum} from "../tauri/models/enums/realmEnum";
import {Member} from "../tauri/models/characterModels/member";
import {raceImage, reverseRace} from "../tauri/models/enums/raceEnum";
import {genderImage} from "../tauri/models/enums/genderEnum";
import {reverseSpec} from "../tauri/models/enums/specEnum";
import {classColor} from "../tauri/models/enums/classEnum";
import {environment} from '../../environments/environment';
import {RaidMapEnum} from "../tauri/models/enums/raidMapEnum";

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

  playerName: string = '';
  playerRealm: RealmEnum = RealmEnum.EVERMOON;
  realms: RealmEnum[] = REALM_ARRAY;

  goToPlayerView(playerName: string, playerRealm: RealmEnum) {
    //TODO: handle promise rejection
    this.router.navigate(['/player', playerName, playerRealm]);
  }

  constructor(private tauriService: TauriService,
              private dialog: MatDialog,
              private route: ActivatedRoute,
              private router: Router) {
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
