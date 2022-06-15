import {ClassEnum} from "./classEnum";
import {RaceEnum} from "./raceEnum";
import {RealmEnum} from "./realmEnum";

export interface Character {
  name: string;
  level: number;
  realm: RealmEnum;
  class: ClassEnum;
  race: RaceEnum;
  guildName: string;
  title: string;
}
