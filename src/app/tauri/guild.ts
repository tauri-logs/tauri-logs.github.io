import {Faction} from "./faction";

export class Guild {
  faction: Faction;
  leadername: string;
  name: string;

  constructor(faction: Faction, leadername: string, name: string) {
    this.faction = faction;
    this.leadername = leadername;
    this.name = name;
  }
}
