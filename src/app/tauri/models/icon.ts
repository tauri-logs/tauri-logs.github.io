import {Member} from "./member";

export class Icon {
  public tooltip: (member: Member) => string;
  public path: (member: Member) => string;
  public dimension: number;

  constructor(tooltip: (member: Member) => string, img: (member: Member) => string, dimension: number = 24) {
    this.tooltip = tooltip;
    this.path = img;
    this.dimension = dimension;
  }
}
