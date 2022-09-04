import {Component, Input, OnInit} from '@angular/core';
import {Composition} from "../../tauri/models/composition";
import {Member} from "../../tauri/models/member";

@Component({
  selector: 'app-composition-table',
  templateUrl: './composition-table.component.html',
  styleUrls: ['./composition-table.component.css']
})
export class CompositionTableComponent implements OnInit {

  @Input() members?: Member[];
  // retarded tableModel structure for material angular table
  public composition?: {role: string, count: number}[];

  constructor() { }

  ngOnInit(): void {
  }

  setComposition() {
    if (!this.composition && this.members) {
      const composition = new Composition(this.members);
      const values = Object.values(composition);
      this.composition = Object.keys(composition).map((key, index) => {
        return {role: key, count: values[index]}
      });
    }
  }
}
