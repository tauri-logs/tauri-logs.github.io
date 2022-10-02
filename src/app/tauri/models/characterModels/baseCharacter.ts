import {ClassEnum} from "../enums/classEnum";
import {GenderEnum} from "../enums/genderEnum";
import {RaceEnum} from "../enums/raceEnum";

export interface BaseCharacter {
  name: string;
  class: ClassEnum;
  gender: GenderEnum;
  race: RaceEnum;

}
