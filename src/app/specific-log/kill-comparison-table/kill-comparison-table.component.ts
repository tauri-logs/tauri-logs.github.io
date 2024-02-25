import {Component, Input, OnInit} from '@angular/core';
import {KillComparisonTableModel} from "./models/KillComparisonTableModel";

@Component({
  selector: 'app-kill-comparison-table',
  templateUrl: './kill-comparison-table.component.html',
  styleUrls: ['./kill-comparison-table.component.css']
})
export class KillComparisonTableComponent implements OnInit {

  @Input() tableModel?: KillComparisonTableModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
