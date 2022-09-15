import {Encounter} from "./encounter";
import {Guild} from "./guild";
import {Map} from "./map";

export interface Log {
  deahts_total: number;
  deaths_fight: number;
  difficulty: number;
  encounter_data: Encounter;
  encounter_id: number;
  fight_time: number;
  guilddata: Guild;
  guildid: number;
  guildrid: number;
  item_count: number;
  killtime: number; //* 1000 to get ms and convert to Date
  log_id: number;
  map_id: number;
  mapentry: Map;
  member_count: number;
  pos: number;
  resurrects_fight: number;
  rid: number;
  wipes: number;
  killDate?: Date;
  difficultyName?: string;
}
