export class RaidDetailHeader {
  key: string;
  text: string;
  img: boolean;
  tooltip: string;

  constructor(key: string, text: string, img = false, tooltip = '') {
    this.key = key;
    this.text = text;
    this.img = img;
    this.tooltip = tooltip;
  }
}
