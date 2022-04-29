import {Icon} from "./Icon";
import {Member} from "./member";
import {classColor} from "./classEnum";

export class RaidDetailHeader {
  key: string;
  text: string;
  img: Icon | undefined;
  private readonly padding: string;

  constructor(key: string, text: string, img?: Icon) {
    this.key = key;
    this.text = text;
    this.img = img;
    if (['ilvl', 'race', 'spec', 'name'].includes(key)) {
      this.padding = '0vw';
    } else {
      this.padding = '1vw';
    }
  }

  getHeaderStyle(): string {
    return `padding: 1vh ${this.padding};`;
  }

  getColStyle(member: Member) {
    let styles : string = '';
    if (this.key === 'name') {
      styles = `color: ${classColor[member.class]};`;
    }
    return `padding: 1vh ${this.padding}; ${styles}`
  }
}
