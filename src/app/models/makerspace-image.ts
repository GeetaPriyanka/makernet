import { Timestamped } from "./timestamped";

export class MakerspaceImage extends Timestamped {
  imageUrl: string;
  galleryIds: Array<string>;

  constructor() {
    super();
    this.imageUrl = null;
    this.galleryIds = new Array<string>();
  }
}