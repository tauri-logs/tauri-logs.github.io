export class Trinket {
  entry: number;
  guid: number;
  originalicon: string;
  icon: string;
  rarity: number;
  stackcount: number;
  ilevel: number;
  originalname: string;
  name: string;
  transmogid: number;
  transmogitemname: string;
  transmogitemicon: string;
  gems: any[];
  ench: object;

  constructor(entry: number, guid: number, originalicon: string, icon: string, rarity: number, stackcount: number, ilevel: number, originalname: string, name: string, transmogid: number, transmogitemname: string, transmogitemicon: string, gems: any[], ench: object) {
    this.entry = entry;
    this.guid = guid;
    this.originalicon = originalicon;
    this.icon = icon;
    this.rarity = rarity;
    this.stackcount = stackcount;
    this.ilevel = ilevel;
    this.originalname = originalname;
    this.name = name;
    this.transmogid = transmogid;
    this.transmogitemname = transmogitemname;
    this.transmogitemicon = transmogitemicon;
    this.gems = gems;
    this.ench = ench;
  }
}

