import {RaidDetailHeader} from "./raidDetailHeader";

export class MultipleRaidDetailHeaders {
  headers: RaidDetailHeader[];
  headersDictionary: object = {};

  constructor(headers: RaidDetailHeader[]) {
    this.headers = headers;
    for (let header of headers) {
      //@ts-ignore
      this.headersDictionary[header.key] = header;
    }
  }
}
