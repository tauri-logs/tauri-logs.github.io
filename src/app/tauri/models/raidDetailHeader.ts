import {Icon} from "./Icon";
import {Member} from "./member";
import {classColor} from "./classEnum";

export class RaidDetailHeader {
  key: string;
  text: string;
  img: Icon | undefined;

  constructor(key: string, text: string, img?: Icon) {
    this.key = key;
    this.text = text;
    this.img = img;
  }

  static getHeaderStyle(): string {
    return `padding: 1vh 1vw;`;
  }

}
