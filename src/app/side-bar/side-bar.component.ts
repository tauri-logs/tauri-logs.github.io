import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {REALM_ARRAY, RealmEnum} from "../tauri/models/enums/realmEnum";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  playerName: string = '';
  playerRealm: RealmEnum = RealmEnum.EVERMOON;
  realms: RealmEnum[] = REALM_ARRAY;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  goToPlayerView(playerName: string, playerRealm: RealmEnum) {
    //TODO: handle promise rejection
    this.router.navigate(['/player', playerName, playerRealm]);
  }

}
