import { Component, OnInit } from '@angular/core';
import {REALM_ARRAY, RealmEnum} from "../tauri/models/enums/realmEnum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-search',
  templateUrl: './home-search.component.html',
  styleUrls: ['./home-search.component.css']
})
export class HomeSearchComponent implements OnInit {

  playerName: string = '';
  playerRealm: RealmEnum = RealmEnum.EVERMOON;
  realms: RealmEnum[] = REALM_ARRAY;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPlayerView(playerName: string, playerRealm: RealmEnum) {
    //TODO: handle promise rejection
    this.router.navigate(['/player', playerName, playerRealm]);
  }
}
