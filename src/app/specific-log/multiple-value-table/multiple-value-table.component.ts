import {Component, Input, OnInit} from '@angular/core';
import {TableModel} from "./models/tableModel";

@Component({
  selector: 'app-multiple-value-table',
  templateUrl: './multiple-value-table.component.html',
  styleUrls: ['./multiple-value-table.css']
})
export class TwoValueTable implements OnInit {

  @Input() tableModel?: TableModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
