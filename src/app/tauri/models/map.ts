import {ExpansionEnum} from "./enums/expansionEnum";

export interface Map {
  expansion: ExpansionEnum;
  id: number;
  name: string;
  type: number;
}
