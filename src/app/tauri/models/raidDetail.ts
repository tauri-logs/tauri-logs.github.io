import {Map} from "./map";
import {Encounter} from "./encounter";
import {Member} from "./member";

export interface RaidDetail {
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
}

