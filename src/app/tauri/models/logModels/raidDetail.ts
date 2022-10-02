import {Member} from "../characterModels/member";
import {LogBase} from "./logBase";

export interface RaidDetail extends LogBase {
  rid: number;
  members: Member[];
}

