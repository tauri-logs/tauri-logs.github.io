import {Component, OnInit} from '@angular/core';
import {REALM_ARRAY, RealmEnum} from "../tauri/models/enums/realmEnum";
import {Router} from "@angular/router";
import {FavouritePlayer} from "./models/FavouritePlayer";
import {TauriService} from "../tauri/tauri.service";
import {Log} from "../tauri/models/logModels/log";
import {classColor} from "../tauri/models/enums/classEnum";
import {concatAll} from "rxjs/operators";

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements OnInit {

  playerName: string = '';
  playerRealm: RealmEnum = RealmEnum.EVERMOON;
  realms: RealmEnum[] = REALM_ARRAY;

  favoritePlayers = [
    new FavouritePlayer("Stepan", RealmEnum.EVERMOON),
    new FavouritePlayer("Matoo", RealmEnum.EVERMOON),
    new FavouritePlayer("Mid", RealmEnum.EVERMOON),
    new FavouritePlayer("Peston", RealmEnum.EVERMOON),
    new FavouritePlayer("Zeworra", RealmEnum.EVERMOON),
    new FavouritePlayer("Nonexistentplayer", RealmEnum.EVERMOON),
  ]

  favoritePlayerLogs: Map<FavouritePlayer, Log | null> = new Map<FavouritePlayer, Log | null>();

  constructor(
    private router: Router,
    private tauriService: TauriService) {
  }

  ngOnInit(): void {
    this.getFavouritePlayersLogs();
  }

  goToPlayerView(playerName: string, playerRealm: RealmEnum) {
    //TODO: handle promise rejection
    this.router.navigate(['/player', playerName, playerRealm]);
  }


  getFavouritePlayersLogs() {
    for (let player of this.favoritePlayers) {
      this.getFavouritePlayerLogs(player);
    }
  }

  private getFavouritePlayerLogs(player: FavouritePlayer) {
    this.tauriService.getPlayerRaidLogs(player.name, player.realm, 1).subscribe((logs: Log[]) => {
      if (logs.length > 0) {
        this.favoritePlayerLogs.set(player, logs[0]);
      } else {
        this.favoritePlayerLogs.set(player, null);
      }
    });
  }
}
