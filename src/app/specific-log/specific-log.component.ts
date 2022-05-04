import {Component, Inject, OnInit} from '@angular/core';
import {TauriService} from "../tauri/tauri.service";
import {RaidDetail} from "../tauri/models/raidDetail";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Member} from "../tauri/models/member";
import {Sort} from "@angular/material/sort";
import copy from "fast-copy";
import {RaidDetailHeader} from "../tauri/models/raidDetailHeader";
import {raceImage, reverseRace} from "../tauri/models/raceEnum";
import {reverseSpec} from "../tauri/models/specEnum";
import {Icon} from "../tauri/models/Icon";
import {formatNumber} from "@angular/common";
import {genderImage} from "../tauri/models/genderEnum";
import {classColor} from "../tauri/models/classEnum";
import {LogViewSettingsComponent} from "../log-view-settings/log-view-settings.component";

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-specific-log',
  templateUrl: './specific-log.component.html',
  styleUrls: ['./specific-log.component.css']
})
export class SpecificLogComponent implements OnInit {

  get headers(): RaidDetailHeader[] {
    return this._headers;
  }
  set headers(value: RaidDetailHeader[]) {
    this._headers = value;
    this.rows = value.map(function (header) {
      return header.key
    })
    this.rows.unshift('character')
  }

  public rows: string[] = [];
  private _headers : RaidDetailHeader[] = [];

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
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.tauriService.getLogDetails(this.data.id).subscribe(
      response => {
        this.raidDetail = response;
        this.sortedMembers = response.members;
        this.sortData({active: 'dmg_done', direction: 'desc'})
      }
    )
    this.headers = [
      new RaidDetailHeader('dmg_done', 'Damage'),
      new RaidDetailHeader('heal_done', 'Healing')
    ]
  }

  showSettings() {
    this.dialog.open(LogViewSettingsComponent, {
      minHeight: '90vh'
    });
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

  getMemberAttribute(member : Member, key: string): string {
    //@ts-ignore
    let attribute = member[key];
    if (typeof attribute === 'number') {
      return formatNumber(attribute, 'en-US');
    } else {
      return attribute;
    }
  }

  getTooltip(member: Member, key: string) : string {
    //@ts-ignore
    return this.tooltipObject[member[key]]
  }

  getRaceImage(member: Member): string {
    return `/assets/races/${raceImage[member.race]}-${genderImage[member.gender]}.webp`;
  }

  getRaceTooltip(member: Member): string {
    return reverseRace[member.race];
  }

  getSpecImage(member: Member): string {
    return `/assets/specs/${member.spec}.png`;;
  }

  getSpecTooltip(member: Member): string {
    return reverseSpec[member.spec];
  }

  getClassColor(member: Member): string {
    return `color: ${classColor[member.class]};`;
  }
}
