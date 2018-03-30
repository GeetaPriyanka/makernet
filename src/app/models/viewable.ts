import { Timestamped } from "./timestamped";

export abstract class Viewable extends Timestamped {
  imageUrl: string;

  constructor() {
    super();
    this.imageUrl = null;
  }
}
