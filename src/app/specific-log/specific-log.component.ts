import {Component, Inject, OnInit} from '@angular/core';
import {TauriService} from "../tauri/tauri.service";
import {RaidDetail} from "../tauri/models/logModels/raidDetail";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Member} from "../tauri/models/characterModels/member";
import {Sort} from "@angular/material/sort";
import copy from "fast-copy";
import {RaidDetailHeader} from "../tauri/models/raidDetailHeader/raidDetailHeader";
import {raceImage, reverseRace} from "../tauri/models/enums/raceEnum";
import {reverseSpec} from "../tauri/models/enums/specEnum";
import {Icon} from "../tauri/models/raidDetailHeader/icon";
import {formatNumber} from "@angular/common";
import {genderImage} from "../tauri/models/enums/genderEnum";
import {classColor} from "../tauri/models/enums/classEnum";
import {LogViewSettingsComponent} from "../log-view-settings/log-view-settings.component";
import {first} from "rxjs/operators";
import {CookieService} from "ngx-cookie-service";
import {MultipleRaidDetailHeaders} from "../tauri/models/raidDetailHeader/multipleRaidDetailHeaders";
import {RaidDetailHeaderCookie} from "../tauri/models/raidDetailHeader/raidDetailHeaderCookie";
import {Guild} from "../tauri/models/guild";
import {environment} from "../../environments/environment";
import {TableDataConvertService} from "./multiple-value-table/table-data-convert.service";
import {Router} from "@angular/router";
import {Cookie} from "../tauri/models/cookie";
import {TableModel} from "./multiple-value-table/models/tableModel";
import {KillComparisonTableModel} from "./kill-comparison-table/models/KillComparisonTableModel";

interface DialogData {
  id: number;
  time: number;
  guild: Guild;
  boss: string;
}

@Component({
  selector: 'app-specific-log',
  templateUrl: './specific-log.component.html',
  styleUrls: ['./specific-log.component.css']
})
export class SpecificLogComponent implements OnInit {

  public rows: string[] = [];
  public headers: RaidDetailHeader[] = [];
  public raidDetail?: RaidDetail;
  public sortedMembers: Member[] = [];
  public logStatisticsTableModel?: TableModel;
  public killComparisonTableModel?: KillComparisonTableModel;
  public compositionTableModel?: TableModel;
  public readonly characterHeader = RaidDetailHeader.text('character', 'Character', true);
  private obtainedResponse: boolean = false;
  private setupHeaders: boolean = false;
  private defaultHeaders: MultipleRaidDetailHeaders = new MultipleRaidDetailHeaders(this.headers);

  private readonly cookieName = 'logHeaders';

  constructor(private tauriService: TauriService,
              private tableDataConvertService: TableDataConvertService,
              private dialog: MatDialog,
              private router: Router,
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
          member.dps = Math.round(member.dmg_done / (response.fight_time / 1000))
          member.percentage_dmg_done = (member.dmg_done / totalDmg) * 100;
          member.percentage_heal_done = (member.heal_done / totalHealing) * 100;
        });
        this.sortedMembers = response.members;
        this.sortData({active: 'dmg_done', direction: 'desc'});
        this.obtainedResponse = true

        // setup table models
        this.logStatisticsTableModel = this.tableDataConvertService.getLogStatisticsTableModel(this.raidDetail)
        this.killComparisonTableModel = this.tableDataConvertService.getComparisonTableModel(this.raidDetail)
        this.compositionTableModel = this.tableDataConvertService.getCompositionTableModel(this.raidDetail.members)
      }
    )
    this.initDefaultHeaders();
    this.setHeaders();
    this.setupHeaders = true
  }

  initDefaultHeaders() {
    this.defaultHeaders = new MultipleRaidDetailHeaders([
      RaidDetailHeader.text('ilvl', 'Ilvl', false),
      RaidDetailHeader.icon('race', 'Race', false, new Icon(this.getRaceTooltip, this.getRaceImage)),
      RaidDetailHeader.icon('spec', 'Spec', false, new Icon(this.getSpecTooltip, this.getSpecImage)),
      //TODO: Do I want name header to support link to player?
      RaidDetailHeader.text('name', 'Name', false, this.getClassColor),
      RaidDetailHeader.text('dps', 'DPS', true),
      RaidDetailHeader.text('dmg_done', 'Damage', false),
      RaidDetailHeader.text('heal_done', 'Healing', true),
      RaidDetailHeader.text('percentage_dmg_done', '% of DMG', false),
      RaidDetailHeader.text('percentage_heal_done', '% of Healing', false),
      RaidDetailHeader.text('dmg_taken', 'Damage taken', false),
      RaidDetailHeader.text('dmg_absorb', 'Absorbed dmg', false),
      RaidDetailHeader.text('absorb_done', 'Absorbs done', false),
      RaidDetailHeader.text('overheal', 'Overhealing', false),
      RaidDetailHeader.text('heal_taken', 'Healing taken', false),
      RaidDetailHeader.text('interrupts', 'Interrupts', false),
      RaidDetailHeader.text('dispells', 'Dispells', false),
      RaidDetailHeader.multipleIcons('trinkets', 'Trinkets', true,
        [
          new Icon(this.getTrinket0Tooltip, this.getTrinket0Image, 28),
          new Icon(this.getTrinket1Tooltip, this.getTrinket1Image, 28)
        ]
      ),
    ])
  }

  setHeaders() {
    const cookie: Cookie = this.cookieService.check(this.cookieName) ? JSON.parse(this.cookieService.get(this.cookieName)) : null;
    if (cookie && cookie.version && cookie.version === environment.cookieVersion) {
      const cookieHeaders: RaidDetailHeaderCookie[] = cookie.value;
      this.rows = cookieHeaders.filter(value => value.active).map(value => value.key)
      // start at 1 to skip 'character'
      for (let i = 1; i < cookieHeaders.length; i++) {
        //@ts-ignore
        const header = this.defaultHeaders.headersDictionary[cookieHeaders[i].key]
        header.active = cookieHeaders[i].active
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
    const cookie: Cookie = new Cookie(environment.cookieVersion, this.headers.map(value => new RaidDetailHeaderCookie(value)))
    if (this.characterHeader.active) {
      this.rows.unshift(this.characterHeader.key)
    }
    cookie.value.unshift(new RaidDetailHeaderCookie(this.characterHeader))
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

  goToMemberView(member: Member) {
    const realm = member.link.substr(member.link.indexOf('['), member.link.indexOf('&') - 2);
    //TODO: handle promise rejection
    this.router.navigate(['/player', member.name, realm]);
    this.dialog.closeAll();
  }

  getMemberAttribute(member: Member, key: string): string {
    //@ts-ignore
    let attribute = member[key];
    if (typeof attribute === 'number') {
      return formatNumber(attribute, 'en');
    } else {
      return attribute;
    }
  }

  getRaceImage: (member: Member) => string = function (member: Member): string {
    return `${environment.baseHref}/assets/races/${raceImage[member.race]}-${genderImage[member.gender]}.webp`;
  };

  getRaceTooltip: (member: Member) => string = function (member: Member): string {
    return reverseRace[member.race];
  };

  getSpecImage: (member: Member) => string = function (member: Member): string {
    return `${environment.baseHref}/assets/specs/${member.spec}.png`;
  };

  getSpecTooltip: (member: Member) => string = function (member: Member): string {
    return reverseSpec[member.spec];
  };

  getTrinket0Image: (member: Member) => string = function (member: Member): string {
    return TauriService.getTrinketImgUrl(member.race, member.trinket_0);
  };

  getTrinket0Tooltip: (member: Member) => string = function (member: Member): string {
    return TauriService.getTrinketTooltip(member.trinket_0);
  };

  getTrinket1Image: (member: Member) => string = function (member: Member): string {
    return TauriService.getTrinketImgUrl(member.race, member.trinket_1);
  };

  getTrinket1Tooltip: (member: Member) => string = function (member: Member): string {
    return TauriService.getTrinketTooltip(member.trinket_1);
  };

  getClassColor: (member: Member) => string = function (member: Member): string {
    return `color: ${classColor[member.class]};`;
  }

  dataLoaded(): boolean {
    return this.obtainedResponse && this.setupHeaders
  }
}
