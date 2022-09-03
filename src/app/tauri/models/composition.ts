import {Member} from "./member";
import {healerSpecs, tankSpecs} from "./specEnum";

export class Composition {
  public tanks: number = 0;
  public healers: number = 0;
  public dps: number = 0;
  public total: number = 0;

  constructor(members: Member[]) {
    for (let member of members) {
      if (tankSpecs.includes(member.spec)) {
        this.tanks++;
      } else if (healerSpecs.includes(member.spec)) {
        this.healers++;
      } else {
        this.dps++;
      }
    }
    this.total = this.tanks + this.healers + this.dps;
  }
}
