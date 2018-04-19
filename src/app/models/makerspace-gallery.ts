import { MakerspaceImage } from "./makerspace-image";
import { Timestamped } from "./timestamped";

export class MakerspaceGallery extends Timestamped {
  images: Array<MakerspaceImage>;
  thumbnailUrl: string;
  name: string;


  constructor() {
    super();
    this.images = new Array<MakerspaceImage>();
    this.thumbnailUrl = null;
    this.name = '';
  }

}