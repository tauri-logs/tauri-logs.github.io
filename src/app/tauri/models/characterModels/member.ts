import {Trinket} from "../trinket";
import {SpecEnum} from "../enums/specEnum";
import {BaseCharacter} from "./baseCharacter";

export interface Member extends BaseCharacter {
  valid_player: boolean;
  guid: number;
  link: string; //  r=[EN] Evermoon&amp;n=Ivan&amp;gn=Pretty Solid Guild
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
  talents?: string;
  trinket_0?: Trinket;
  trinket_1?: Trinket;
  dps?: number;
  percentage_dmg_done?: number;
  percentage_heal_done?: number;
}
