import {Component, Inject, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RaidDetailHeader} from "../tauri/models/raidDetailHeader/raidDetailHeader";

@Component({
  selector: 'app-log-view-settings',
  templateUrl: './log-view-settings.component.html',
  styleUrls: ['./log-view-settings.component.css']
})
export class LogViewSettingsComponent implements OnInit {

  characterHeader?: RaidDetailHeader;

  constructor(@Inject(MAT_DIALOG_DATA) public headers: RaidDetailHeader[]) {
    this.characterHeader = headers.pop();
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.headers, event.previousIndex, event.currentIndex);
  }
}
