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
import {CookieService} from "ngx-cookie-service";
import {MultipleRaidDetailHeaders} from "../tauri/models/multipleRaidDetailHeaders";
import {RaidDetailHeaderCookie} from "../tauri/models/raidDetailHeaderCookie";

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

  private obtainedResponse: boolean = false;
  private setupHeaders: boolean = false;

  public rows: string[] = [];
  public headers: RaidDetailHeader[] = [];

  public raidDetail?: RaidDetail;
  public sortedMembers: Member[] = [];

  public readonly characterHeader = new RaidDetailHeader('character', 'Character', true);
  private defaultHeaders: MultipleRaidDetailHeaders = new MultipleRaidDetailHeaders(this.headers);

  private readonly cookieName = 'logHeaders';

  constructor(private tauriService: TauriService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.tauriService.getLogDetails(this.data.id).subscribe(
      response => {
        this.raidDetail = response;
        let totalDmg: number = 0;
        let totalHealing: number = 0;
        this.raidDetail?.members.forEach(member => {
          totalDmg += member.dmg_done;
          totalHealing += member.heal_done;
        });
        this.raidDetail?.members.forEach(member => {
          member.dps = Math.round(member.dmg_done / (this.data.time))
          member.percentage_dmg_done = (member.dmg_done / totalDmg) * 100;
          member.percentage_heal_done = (member.heal_done / totalHealing) * 100;
        });
        this.sortedMembers = response.members;
        this.sortData({active: 'dmg_done', direction: 'desc'});
        this.obtainedResponse = true
      }
    )
    this.initDefaultHeaders();
    this.setHeaders();
    this.setupHeaders = true
  }

  initDefaultHeaders() {
    this.defaultHeaders = new MultipleRaidDetailHeaders([
      new RaidDetailHeader('ilvl', 'Ilvl', false),
      new RaidDetailHeader('race', 'Race', false, new Icon(this.getRaceTooltip, this.getRaceImage)),
      new RaidDetailHeader('spec', 'Spec', false, new Icon(this.getSpecTooltip, this.getSpecImage)),
      new RaidDetailHeader('name', 'Name', false, undefined, this.getClassColor),
      new RaidDetailHeader('dmg_done', 'Damage', true),
      new RaidDetailHeader('heal_done', 'Healing', true),
      new RaidDetailHeader('dps', 'DPS', false),
      new RaidDetailHeader('percentage_dmg_done', '% of DMG', false),
      new RaidDetailHeader('percentage_heal_done', '% of Healing', false),
      new RaidDetailHeader('dmg_taken', 'Damage taken', false),
      new RaidDetailHeader('dmg_absorb', 'Absorbed dmg', false),
      new RaidDetailHeader('absorb_done', 'Absorbs done', false),
      new RaidDetailHeader('overheal', 'Overhealing', false),
      new RaidDetailHeader('heal_taken', 'Healing taken', false),
      new RaidDetailHeader('interrupts', 'Interrupts', false),
      new RaidDetailHeader('dispells', 'Dispells', false),
      new RaidDetailHeader('trinket_0', 'Trinket 1', true, new Icon(this.getTrinket0Tooltip, this.getTrinket0Image, 28)),
      new RaidDetailHeader('trinket_1', 'Trinket 2', true, new Icon(this.getTrinket1Tooltip, this.getTrinket1Image, 28)),
    ])
  }

  setHeaders() {
    if (this.cookieService.check(this.cookieName)) {
      const cookie: RaidDetailHeaderCookie[] = JSON.parse(this.cookieService.get(this.cookieName))
      this.rows = cookie.filter(value => value.active).map(value => value.key)
      // start at 1 to skip 'character'
      for (let i = 1; i < cookie.length; i++) {
        //@ts-ignore
        const header = this.defaultHeaders.headersDictionary[cookie[i].key]
        header.active = cookie[i].active
        this.headers.push(header)
      }
    } else {
      this.headers = this.defaultHeaders.headers
      this.refreshHeaders()
    }
  }

  refreshHeaders() {
    this.rows = this.headers.filter(header => header.active)
      .map(header => header.key)
    const cookie: RaidDetailHeaderCookie[] = this.headers.map(value => new RaidDetailHeaderCookie(value))
    if (this.characterHeader.active) {
      this.rows.unshift(this.characterHeader.key)
    }
    cookie.unshift(new RaidDetailHeaderCookie(this.characterHeader))
    this.cookieService.set(this.cookieName, JSON.stringify(cookie));
  }

  showSettings() {
    this.headers.push(this.characterHeader)
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

  getMemberAttribute(member: Member, key: string): string {
    //@ts-ignore
    let attribute = member[key];
    if (typeof attribute === 'number') {
      return formatNumber(attribute, 'en-US');
    } else {
      return attribute;
    }
  }

  getRaceImage: (member: Member) => string = function (member: Member): string {
    return `/assets/races/${raceImage[member.race]}-${genderImage[member.gender]}.webp`;
  };

  getRaceTooltip: (member: Member) => string = function (member: Member): string {
    return reverseRace[member.race];
  };

  getSpecImage: (member: Member) => string = function (member: Member): string {
    return `/assets/specs/${member.spec}.png`;
  };

  getSpecTooltip: (member: Member) => string = function (member: Member): string {
    return reverseSpec[member.spec];
  };

  getTrinket0Image: (member: Member) => string = function (member: Member): string {
    return `http://mop-static.tauri.hu/images/icons/medium/${member.trinket_0.icon}.png`;
  };

  getTrinket0Tooltip: (member: Member) => string = function (member: Member): string {
    return `${member.trinket_0.name}\n${member.trinket_0.ilevel} ilvl`;
  };

  getTrinket1Image: (member: Member) => string = function (member: Member): string {
    return `http://mop-static.tauri.hu/images/icons/medium/${member.trinket_1.icon}.png`;
  };

  getTrinket1Tooltip: (member: Member) => string = function (member: Member): string {
    return `${member.trinket_0.name}\n${member.trinket_1.ilevel} ilvl`;
  };

  getClassColor: (member: Member) => string = function (member: Member): string {
    return `color: ${classColor[member.class]};`;
  }

  dataLoaded(): boolean {
    return this.obtainedResponse && this.setupHeaders
  }
}
