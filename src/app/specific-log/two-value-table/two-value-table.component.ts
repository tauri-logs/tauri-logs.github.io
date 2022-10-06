import {Component, Input, OnInit} from '@angular/core';
import {TableModel} from "./models/tableModel";

@Component({
  selector: 'app-two-value-table',
  templateUrl: './two-value-table.component.html',
  styleUrls: ['./two-value-table.css']
})
export class TwoValueTable implements OnInit {

  @Input() tableModel?: TableModel;

  constructor() { }

  ngOnInit(): void {
  }

}
