export class RaidDetailHeader {
  key: string;
  text: string;
  img: boolean;
  tooltip: string;
  private readonly imgFolder: string;

  constructor(key: string, text: string, img = false, tooltip = '', imgFolder = '') {
    this.key = key;
    this.text = text;
    this.img = img;
    this.tooltip = tooltip;
    this.imgFolder = imgFolder;
  }

  getImagePath(imgName: string) {
    return `/assets/${this.imgFolder}/${imgName}`;
  }
}
