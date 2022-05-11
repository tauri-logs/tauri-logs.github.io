import {Trinket} from "./trinket";
import {ClassEnum} from "./classEnum";
import {RaceEnum} from "./raceEnum";
import {GenderEnum} from "./genderEnum";
import {SpecEnum} from "./specEnum";

export interface Member {
  valid_player: boolean;
  guid: number;
  race: RaceEnum;
  class: ClassEnum;
  gender: GenderEnum;
  name: string;
  link: string;
  spec: SpecEnum;
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
  dps?: number;
  percentage_dmg_done?: number;
  percentage_heal_done?: number;
}
