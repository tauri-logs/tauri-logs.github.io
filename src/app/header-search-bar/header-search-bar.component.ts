import {Component, Input, OnInit} from '@angular/core';
import {REALM_ARRAY, RealmEnum} from "../tauri/models/enums/realmEnum";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header-search-bar',
  templateUrl: './header-search-bar.component.html',
  styleUrls: ['./header-search-bar.component.css']
})
export class HeaderSearchBarComponent implements OnInit {

  realms: RealmEnum[] = REALM_ARRAY;
  @Input() playerName: string = '';
  @Input() playerRealm: RealmEnum = RealmEnum.EVERMOON;

  goToPlayerView(playerName: string, playerRealm: RealmEnum) {
    //TODO: handle promise rejection
    this.router.navigate(['/player', playerName, playerRealm]);
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
}
