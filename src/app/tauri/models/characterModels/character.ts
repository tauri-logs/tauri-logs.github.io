import {RealmEnum} from "../enums/realmEnum";
import {BaseCharacter} from "./baseCharacter";

export interface Character extends BaseCharacter {
  level: number;
  realm: RealmEnum;
  guildName: string;
  title: string;
  tname: string; //name with title
  faction_string_class: string; //Horde or Alliance
}
