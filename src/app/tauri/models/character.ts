import {ClassEnum} from "./classEnum";
import {RaceEnum} from "./raceEnum";
import {RealmEnum} from "./realmEnum";
import {GenderEnum} from "./genderEnum";

export interface Character {
  name: string;
  level: number;
  realm: RealmEnum;
  class: ClassEnum;
  race: RaceEnum;
  guildName: string;
  title: string;
  gender: GenderEnum;
  tname: string; //name with title
  faction_string_class: string; //Horde or Alliance
}
