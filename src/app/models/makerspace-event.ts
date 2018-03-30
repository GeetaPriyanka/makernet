import { Viewable } from './viewable';

export class MakerspaceEvent extends Viewable {
  owner: string;
  description: string;
  start: string;
  end: string;
  location: string;

  constructor() {
    super();
    this.owner = null;
    this.description = null;
    this.start = null;
    this.end = null;
    this.location = null;
  }
}
