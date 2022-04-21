import {Component, Inject, OnInit} from '@angular/core';
import {TauriService} from "../tauri/tauri.service";
import {RaidDetail} from "../tauri/models/raidDetail";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Member} from "../tauri/models/member";
import {Sort} from "@angular/material/sort";
import copy from "fast-copy";
import {RaidDetailHeader} from "../tauri/models/raidDetailHeader";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-specific-log',
  templateUrl: './specific-log.component.html',
  styleUrls: ['./specific-log.component.css']
})
export class SpecificLogComponent implements OnInit {

  public headers = [
    new RaidDetailHeader('race', '', true),
    new RaidDetailHeader('spec', '', true),
    new RaidDetailHeader('ilvl', ''),
    new RaidDetailHeader('name', 'Name'),
    new RaidDetailHeader('dmg_done', 'Damage'),
    new RaidDetailHeader('heal_done', 'Healing'),
  ]

  // public readonly headers = {
  //   race : "",
  //   spec : "",
  //   name : "Name",
  //   dmg_done : "Damage done",
  //   dmg_taken : "Damage taken",
  //   dmg_absorb : "Damage absorbed",
  //   heal_done : "Healing done",
  //   absorb_done : "Absorbs",
  //   overheal : "Overhealing",
  //   heal_taken : "Healing taken",
  //   interrupts : "Interrupts",
  //   dispells : "Dispells",
  //   ilvl : "",
  //   trinket_0 : "Trinket 1",
  //   trinket_1 : "Trinket 2"
  // }

  public raidDetail : RaidDetail | undefined;
  public sortedMembers: Member[] = [];

  constructor(private tauriService: TauriService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.tauriService.getLogDetails(this.data.id).subscribe(
      response => {
        this.raidDetail = response;
        this.sortedMembers = response.members;
      }
    )
  }

  sortData(sort: Sort) {
    const data = this.raidDetail ? copy(this.raidDetail.members) : [];
    if (!sort.active || sort.direction === '') {
      this.sortedMembers = data;
      return;
    }
    const isAsc = sort.direction === 'asc';
    this.sortedMembers = data.sort((a, b) => {
      //@ts-ignore
      return (a[sort.active] < b[sort.active] ? -1 : 1) * (isAsc ? 1 : -1);
      }
    );
  }

  getData(member: Member, header: string): string {
    //@ts-ignore
    return member[header]
  }

}
