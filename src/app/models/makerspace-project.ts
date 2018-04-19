import { Viewable } from "./viewable";
import { MakerspaceGallery } from '../models/makerspace-gallery';
import { Observable } from 'rxjs/Observable'


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
