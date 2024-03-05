import {RealmEnum} from "../../tauri/models/enums/realmEnum";

export class FavouritePlayer {
  name: string;
  realm: RealmEnum;

  constructor(name: string, realm: RealmEnum) {
    this.name = name;
    this.realm = realm;
  }
}
