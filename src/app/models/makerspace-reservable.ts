import { Viewable } from "./viewable";

export abstract class MakerspaceReservable extends Viewable {
  name: string;
  roomNumber: string;
  building: string;
  campus: string;
  address: string;
  description: string;

  constructor() {
    super();
    this.name = null;
    this.roomNumber = null;
    this.building = null;
    this.campus = null;
    this.address = null;
    this.description = null;
  }
}
