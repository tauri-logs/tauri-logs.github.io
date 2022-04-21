import {Expansion} from "./expansion";

export interface Map {
  expansion: Expansion;
  id: number;
  name: string;
  type: number;
}

export enum RaidMapEnum {
  SOO= 1136
}
