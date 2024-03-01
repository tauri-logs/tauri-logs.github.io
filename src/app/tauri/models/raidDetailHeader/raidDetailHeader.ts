import {Icon} from "./icon";
import {Member} from "../characterModels/member";

export class RaidDetailHeader {
  key: string;
  name: string;
  active: boolean;
  img: Icon | null;
  images: Icon[];
  style: (member: Member) => string;

  private constructor(
    key: string,
    name: string,
    active: boolean = false,
    images: Icon[],
    style: (member: Member) => string = function () {
      return ''
    }) {
    this.key = key;
    this.name = name;
    this.active = active;
    this.images = images;
    this.img = (images.length > 0) ? images[0] : null;
    this.style = style;
  }

  static icon(
    key: string,
    name: string,
    active: boolean,
    img: Icon,
    style: (member: Member) => string = this.defaultStyle
  ): RaidDetailHeader {
    return new RaidDetailHeader(key, name, active, [img], style);
  }

  static multipleIcons(
    key: string,
    name: string,
    active: boolean,
    images: Icon[],
    style: (member: Member) => string = this.defaultStyle
  ): RaidDetailHeader {
    return new RaidDetailHeader(key, name, active, images, style);
  }

  static text(
    key: string,
    text: string,
    active: boolean,
    style: (member: Member) => string = this.defaultStyle
  ): RaidDetailHeader {
    return new RaidDetailHeader(key, text, active, [], style);
  }

  private static defaultStyle = (member: Member) => {
    return ''
  };

}
