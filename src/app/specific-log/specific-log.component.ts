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
import {first} from "rxjs/operators";

interface DialogData {
  id: number;
  time: number;
}

@Component({
  selector: 'app-specific-log',
  templateUrl: './specific-log.component.html',
  styleUrls: ['./specific-log.component.css']
})
export class SpecificLogComponent implements OnInit {

  public rows: string[] = [];
  public headers : RaidDetailHeader[] = [];

  public raidDetail : RaidDetail | undefined;
  public sortedMembers: Member[] = [];

  constructor(private tauriService: TauriService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.tauriService.getLogDetails(this.data.id).subscribe(
      response => {
        this.raidDetail = response;
        this.raidDetail?.members.forEach(member =>
          member.dps = Math.round(member.dmg_done/(this.data.time/1000))
        );
        console.log(this.data.time)
        this.sortedMembers = response.members;
        this.sortData({active: 'dmg_done', direction: 'desc'});
      }
    )
    this.headers = [
      new RaidDetailHeader('dmg_done', 'Damage', true),
      new RaidDetailHeader('heal_done', 'Healing', true),
      new RaidDetailHeader('dps', 'DPS', false),
      new RaidDetailHeader('dmg_taken', 'Damage taken', false),
      new RaidDetailHeader('dmg_absorb', 'Absorbed dmg', false),
      new RaidDetailHeader('absorb_done', 'Absorbs done', false),
      new RaidDetailHeader('overheal', 'Overhealing', false),
      new RaidDetailHeader('heal_taken', 'Healing taken', false),
      new RaidDetailHeader('interrupts', 'Interrupts', false),
      new RaidDetailHeader('dispells', 'Dispells', false),
      // new RaidDetailHeader('trinket_0', 'Trinket 1', false),
      // new RaidDetailHeader('trinket_1', 'Trinket 2', false)
    ]
    this.refreshHeaders();
  }

  refreshHeaders() {
    this.rows = this.headers.filter(header => header.active).map(header => header.key)
    this.rows.unshift('character')
  }

  showSettings() {
    this.dialog.open(LogViewSettingsComponent, {
      data: this.headers,
      minHeight: '90vh'
    }).afterClosed().pipe(first()).subscribe(value => this.refreshHeaders());
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
    return `/assets/specs/${member.spec}.png`;
  }

  getSpecTooltip(member: Member): string {
    return reverseSpec[member.spec];
  }

  getClassColor(member: Member): string {
    return `color: ${classColor[member.class]};`;
  }
}
