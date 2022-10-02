import {Encounter} from "../encounter";
import {Guild} from "../guild";
import {Map} from "../map";
import {LogBase} from "./logBase";

export interface Log extends LogBase {
  item_count: number;
  pos: number;
  rid: number;
  killDate?: Date;
  difficultyName?: string;
}
