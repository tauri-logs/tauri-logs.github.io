import {Icon} from "./Icon";

export class RaidDetailHeader {
  key: string;
  text: string;
  active: boolean;
  img: Icon | undefined;

  constructor(key: string, text: string, active: boolean = false, img?: Icon) {
    this.key = key;
    this.text = text;
    this.active = active;
    this.img = img;
  }

  static getHeaderStyle(): string {
    return `padding: 1vh 1vw;`;
  }

}
