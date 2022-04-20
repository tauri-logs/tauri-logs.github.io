import {Trinket} from "./trinket";

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


}
