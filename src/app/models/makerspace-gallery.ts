import { MakerspaceImage } from "./makerspace-image";
import { Timestamped } from "./timestamped";

export class MakerspaceGallery extends Timestamped {
  images: Array<MakerspaceImage>;
  thumbnail: MakerspaceImage;


  constructor() {
    super();
    this.images = new Array<MakerspaceImage>();
    this.thumbnail = null;
  }

}