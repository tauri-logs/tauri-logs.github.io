import {Encounter} from "../encounter";
import {Guild} from "../guild";
import {Map} from "../map";

export interface LogBase {
  deahts_total: number;
  deaths_fight: number;
  difficulty: number;
  encounter_data: Encounter;
  encounter_id: number;
  fight_time: number;
  guilddata: Guild;
  guildid: number;
  guildrid: number;
  killtime: number; //* 1000 to get ms and convert to Date
  log_id: number;
  map_id: number;
  mapentry: Map;
  wipes: number;
  resurrects_fight: number;
  member_count: number;

}
