import {Component, Inject, OnInit} from '@angular/core';
import {TauriService} from "../tauri/tauri.service";
import {RaidDetail} from "../tauri/raidDetail";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Member} from "../tauri/member";
import {Sort} from "@angular/material/sort";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-specific-log',
  templateUrl: './specific-log.component.html',
  styleUrls: ['./specific-log.component.css']
})
export class SpecificLogComponent implements OnInit {

  // public raidDetail : RaidDetail | null = null;
  public headers = Member.headers;
  public headerKeys : string[] = Object.keys(Member.headers);
  public sortedMembers: Member[] = [];

  constructor(private tauriService: TauriService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.tauriService.getLogDetails(this.data.id).subscribe(
      response => {
        // this.raidDetail = response;
        this.sortedMembers = response.members;
      }
    )
  }

  sortData(sort: Sort) {
    const data = this.sortedMembers ? this.sortedMembers : [];
    if (!sort.active || sort.direction === '') {
      this.sortedMembers = data;
      return;
    }

    this.sortedMembers = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      //@ts-ignore
      return (a[sort.active] < b[sort.active] ? -1 : 1) * (isAsc ? 1 : -1);
      }
    );
  }

}
