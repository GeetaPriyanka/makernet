import { Viewable } from "./viewable";

export class MakerspaceProject extends Viewable {
  title: string;
  description: string;
  
  constructor() {
    super();
    this.title = null;
    this.description = null;
  }
}
