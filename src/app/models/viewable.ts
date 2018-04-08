import { Timestamped } from "./timestamped";

export abstract class Viewable extends Timestamped {
  imageUrl: string;
  galleryIds: Array<string>;

  constructor() {
    super();
    this.imageUrl = null;
    this.galleryIds = new Array<string>();
  }
}
