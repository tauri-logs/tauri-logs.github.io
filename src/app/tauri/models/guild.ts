import {FactionEnum} from "./enums/factionEnum";

export interface Guild {
  faction?: FactionEnum;
  leadername?: string;
  name?: string;
}
