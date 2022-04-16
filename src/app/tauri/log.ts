class Log {
  deahts_total: number;
  deaths_fight: number;
  difficulty: number;
  encounter_data: Encounter;
  encounter_id: number;
  fight_time: number;
  guilddata: object;
  guildid: number;
  guildrid: number;
  item_count: number;
  killtime: number;
  log_id: number;
  map_id: number;
  mapentry: object;
  member_count: number;
  pos: number;
  resurrects_fight: number;
  rid: number;
  wipes: number;

  constructor(deahts_total: number, deaths_fight: number, difficulty: number, encounter_data: Encounter,
              encounter_id: number, fight_time: number, guilddata: object, guildid: number, guildrid: number,
              item_count: number, killtime: number, log_id: number, map_id: number, mapentry: object,
              member_count: number, pos: number, resurrects_fight: number, rid: number, wipes: number) {
    this.deahts_total = deahts_total;
    this.deaths_fight = deaths_fight;
    this.difficulty = difficulty;
    this.encounter_data = encounter_data;
    this.encounter_id = encounter_id;
    this.fight_time = fight_time;
    this.guilddata = guilddata;
    this.guildid = guildid;
    this.guildrid = guildrid;
    this.item_count = item_count;
    this.killtime = killtime;
    this.log_id = log_id;
    this.map_id = map_id;
    this.mapentry = mapentry;
    this.member_count = member_count;
    this.pos = pos;
    this.resurrects_fight = resurrects_fight;
    this.rid = rid;
    this.wipes = wipes;
  }
}
