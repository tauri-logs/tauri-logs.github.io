import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  playerName: string = '';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPlayerView(playerName: string) {
    this.router.navigate(['/player', playerName]);
  }

}
