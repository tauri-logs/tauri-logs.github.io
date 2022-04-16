import { Component, OnInit } from '@angular/core';
import {TauriService} from "../tauri/tauri.service";

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent implements OnInit {

  constructor(private tauriService: TauriService) { }

  ngOnInit(): void {
    this.tauriService.getStepanRaidLogs().subscribe(
      response => {console.log(response)}
    )
  }

}
