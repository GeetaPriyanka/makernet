import { MakerspaceReservable } from './makerspace-reservable';

export class MakerspaceEquipment extends MakerspaceReservable {
  manufacturer: string;
  model: string;

  constructor() {
    super();
    this.manufacturer = null;
    this.model = null;
  }
}
