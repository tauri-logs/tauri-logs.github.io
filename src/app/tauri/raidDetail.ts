import {Map} from "./map";
import {Encounter} from "./encounter";
import {Member} from "./member";

export class RaidDetail {
  log_id: number;
  map_id: number;
  mapentry: Map;
  difficulty: number;
  rid: number;
  guildid: number;
  guildrid: number;
  guilddata: any;
  killtime: number;
  wipes: number;
  deahts_total: number;
  fight_time: number;
  deaths_fight: number;
  resurrects_fight: number;
  encounter_id: number;
  encounter_data: Encounter;
  member_count: number;
  members: Member[];

  constructor(log_id: number, map_id: number, mapentry: Map, difficulty: number, rid: number, guildid: number, guildrid: number, guilddata: any, killtime: number, wipes: number, deahts_total: number, fight_time: number, deaths_fight: number, resurrects_fight: number, encounter_id: number, encounter_data: Encounter, member_count: number, members: Member[]) {
    this.log_id = log_id;
    this.map_id = map_id;
    this.mapentry = mapentry;
    this.difficulty = difficulty;
    this.rid = rid;
    this.guildid = guildid;
    this.guildrid = guildrid;
    this.guilddata = guilddata;
    this.killtime = killtime;
    this.wipes = wipes;
    this.deahts_total = deahts_total;
    this.fight_time = fight_time;
    this.deaths_fight = deaths_fight;
    this.resurrects_fight = resurrects_fight;
    this.encounter_id = encounter_id;
    this.encounter_data = encounter_data;
    this.member_count = member_count;
    this.members = members;
  }
}

