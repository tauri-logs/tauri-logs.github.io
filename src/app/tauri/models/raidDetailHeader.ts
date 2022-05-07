import {Icon} from "./Icon";
import {Member} from "./member";

export class RaidDetailHeader {
  key: string;
  text: string;
  active: boolean;
  img?: Icon;
  style: (member: Member) => string;

  constructor(key: string, text: string, active: boolean = false, img?: Icon,
              style: (member: Member) => string = function () {return ''}) {
    this.key = key;
    this.text = text;
    this.active = active;
    this.img = img;
    this.style = style;
  }

}
