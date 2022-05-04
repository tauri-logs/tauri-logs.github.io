import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-log-view-settings',
  templateUrl: './log-view-settings.component.html',
  styleUrls: ['./log-view-settings.component.css']
})
export class LogViewSettingsComponent implements OnInit {

  movies = ['santa', 'maria', 'mia']

  constructor() { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  }
}
