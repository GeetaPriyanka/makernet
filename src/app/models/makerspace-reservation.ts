import { MakerspaceReservable } from './makerspace-reservable';
import { MakerspaceUser } from './makerspace-user';

export class MakerspaceReservation {
  owner: MakerspaceUser;
  dateTime: String;
  duration: Number;
  reservedList: Array<MakerspaceReservable>;
}
