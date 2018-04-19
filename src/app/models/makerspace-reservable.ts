import { Viewable } from "./viewable";

export class MakerspaceReservable extends Viewable {
  space: string;
  location: string;
  capacity: string;
  date: string;
  time: string;
  duration: string;

  constructor() {
    super();
    this.space = null;
    this.capacity = null;
    this.date = null;
    this.time = null;
    this.location = null;
    this.duration = null;
  }
}
