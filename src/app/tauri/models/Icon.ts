import {Member} from "./member";
import {raceImage} from "./raceEnum";
import {genderImage} from "./genderEnum";

export class Icon {
  private readonly tooltipObject: object;
  private readonly imgFolder: string;

  constructor(tooltipObject: object, imgFolder: string) {
    this.tooltipObject = tooltipObject;
    this.imgFolder = imgFolder;
  }

  private getImagePath(imgName: string) : string {
    return `/assets/${this.imgFolder}/${imgName}`;
  }

  getTooltip(member: Member, key: string) : string {
    //@ts-ignore
    return this.tooltipObject[member[key]]
  }

  getImage(member: Member, key: string) : string {
    let name : string;
    if (key === 'race') {
      name = `${raceImage[member.race]}-${genderImage[member.gender]}.webp`;
    } else {
      //@ts-ignore
      name = `${member[key]}.png`;
    }
    return this.getImagePath(name);
  }
}
