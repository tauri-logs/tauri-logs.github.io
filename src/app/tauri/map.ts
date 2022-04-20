import {Expansion} from "./expansion";

export class Map {
  expansion: Expansion;
  id: number;
  name: string;
  type: number;

  constructor(expansion: Expansion, id: number, name: string, type: number) {
    this.expansion = expansion;
    this.id = id;
    this.name = name;
    this.type = type;
  }
}

export enum RaidMapEnum {
  SOO= 1136
}
