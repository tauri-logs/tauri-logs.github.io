import {RaidDetailHeader} from "./raidDetailHeader";

export class RaidDetailHeaderCookie {
  key: string;
  active: boolean;

  constructor(header: RaidDetailHeader) {
    this.key = header.key;
    this.active = header.active;
  }

}
