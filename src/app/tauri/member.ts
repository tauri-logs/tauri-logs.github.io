import {Trinket} from "./trinket";
import {error} from "@angular/compiler/src/util";

export class Member {
  valid_player: boolean;
  guid: number;
  race: number;
  class: number;
  gender: number;
  name: string;
  link: string;
  spec: number;
  dmg_done: number;
  dmg_taken: number;
  dmg_absorb: number;
  heal_done: number;
  absorb_done: number;
  overheal: number;
  heal_taken: number;
  interrupts: number;
  dispells: number;
  ilvl: number;
  talents: string;
  trinket_0: Trinket;
  trinket_1: Trinket;

  constructor(guid: number, race: number, gender: number, name: string, link: string, spec: number, dmg_done: number, dmg_taken: number, dmg_absorb: number, heal_done: number, absorb_done: number, overheal: number, heal_taken: number, interrupts: number, dispells: number, ilvl: number, trinket_0: Trinket, trinket_1: Trinket, talents: string, validPlayer: boolean, cls: number) {
    this.guid = guid;
    this.race = race;
    this.gender = gender;
    this.name = name;
    this.link = link;
    this.spec = spec;
    this.dmg_done = dmg_done;
    this.dmg_taken = dmg_taken;
    this.dmg_absorb = dmg_absorb;
    this.heal_done = heal_done;
    this.absorb_done = absorb_done;
    this.overheal = overheal;
    this.heal_taken = heal_taken;
    this.interrupts = interrupts;
    this.dispells = dispells;
    this.ilvl = ilvl;
    this.trinket_0 = trinket_0;
    this.trinket_1 = trinket_1;
    this.class = cls;
    this.talents = talents;
    this.valid_player = validPlayer;
  }

  public static readonly headers = {
    race : "",
    spec : "",
    name : "Name",
    dmg_done : "Damage done",
    dmg_taken : "Damage taken",
    dmg_absorb : "Damage absorbed",
    heal_done : "Healing done",
    absorb_done : "Absorbs",
    overheal : "Overhealing",
    heal_taken : "Healing taken",
    interrupts : "Interrupts",
    dispells : "Dispells",
    ilvl : "",
    trinket_0 : "Trinket 1",
    trinket_1 : "Trinket 2",
  }

}
