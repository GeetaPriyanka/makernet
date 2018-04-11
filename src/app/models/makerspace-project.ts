import { Viewable } from "./viewable";

export class MakerspaceProject extends Viewable {
  title: string;
  description: string;
  owner: string;
  galleryID: string;
  
  constructor() {
    super();
    this.title = null;
    this.description = null;
    this.galleryID = null;
  }
}
