import {Component, Input, OnInit} from '@angular/core';
import {TableModel} from "./models/tableModel";

@Component({
  selector: 'app-log-statistics-table',
  templateUrl: './log-statistics-table.component.html',
  styleUrls: ['./log-statistics-table.component.css']
})
export class LogStatisticsTableComponent implements OnInit {

  @Input() tableModel?: TableModel;

  constructor() { }

  ngOnInit(): void {
  }

}
