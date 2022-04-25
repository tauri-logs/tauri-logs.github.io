import {Icon} from "./Icon";
import {Member} from "./member";
import {classColor} from "./classEnum";

export class RaidDetailHeader {
  key: string;
  text: string;
  padding: string;
  img: Icon | undefined;

  constructor(key: string, text: string, padding: string, img?: Icon) {
    this.key = key;
    this.text = text;
    this.padding = padding;
    this.img = img;
  }

  getHeaderStyle(): string {
    return `padding: 10px ${this.padding} 10px ${this.padding};`;
  }

  getColStyle(member: Member) {
    let styles : string = '';
    if (this.key === 'name') {
      styles = `color: ${classColor[member.class]};`;
    }
    return `padding: 10px ${this.padding} 10px ${this.padding}; ${styles}`
  }
}
