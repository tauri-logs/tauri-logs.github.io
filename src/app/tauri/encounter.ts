export class Encounter {
  encounter_difficulty: number;
  encounter_id: number;
  encounter_index: number;
  encounter_map: number;
  encounter_name: string;
  encounter_sorting: number;

  constructor(encounter_difficulty: number, encounter_id: number, encounter_index: number, encounter_map: number,
              encounter_name: string, encounter_sorting: number) {
    this.encounter_difficulty = encounter_difficulty;
    this.encounter_id = encounter_id;
    this.encounter_index = encounter_index;
    this.encounter_map = encounter_map;
    this.encounter_name = encounter_name;
    this.encounter_sorting = encounter_sorting;
  }
}
