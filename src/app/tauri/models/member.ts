import {Trinket} from "./trinket";
import {ClassEnum} from "./classEnum";
import {RaceEnum} from "./raceEnum";

export interface Member {
  valid_player: boolean;
  guid: number;
  race: RaceEnum;
  class: ClassEnum;
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
