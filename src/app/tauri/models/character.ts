import {ClassEnum} from "./classEnum";
import {RaceEnum} from "./raceEnum";

export interface Character {
  name: string;
  level: number;
  realm: string;
  class: ClassEnum;
  race: RaceEnum;
  guildName: string;
  title: string;
}
