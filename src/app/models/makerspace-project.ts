import { Viewable } from "./viewable";

export class MakerspaceProject extends Viewable {
  title: string;
  description: string;
  owner: string;
  
  constructor() {
    super();
    this.title = null;
    this.description = null;
  }
}
