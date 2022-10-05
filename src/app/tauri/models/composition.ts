import {Member} from "./characterModels/member";
import {healerSpecs, rangedSpecs, tankSpecs} from "./enums/specEnum";

export class Composition {
  public tanks: number = 0;
  public healers: number = 0;
  public mdps: number = 0;
  public rdps: number = 0;
  public total: number = 0;

  constructor(members: Member[]) {
    for (let member of members) {
      if (tankSpecs.includes(member.spec)) {
        this.tanks++;
      } else if (healerSpecs.includes(member.spec)) {
        this.healers++;
      } else if (rangedSpecs.includes(member.spec)) {
        this.rdps++;
      } else {
        this.mdps++;
      }
    }
    this.total = this.tanks + this.healers + this.rdps + this.mdps;
  }
}
