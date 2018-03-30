import { MakerspaceReservable } from './makerspace-reservable';

export class MakerspaceSpace extends MakerspaceReservable {
  capacity: Number;
  
  constructor() {
    super();
    this.capacity = null;
  }
}
