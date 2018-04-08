import { MakerspaceReservable } from './makerspace-reservable';
import { MakerspaceUser } from './makerspace-user';

export class MakerspaceReservation {
  owner: MakerspaceUser;
  date: any;
  duration: Number;
  time: Number;
  reservedList: Array<MakerspaceReservable>;
}
