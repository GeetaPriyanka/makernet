import { MakerspaceReservable } from './makerspace-reservable';
import { MakerspaceUser } from './makerspace-user';

export class MakerspaceReservation {
  space: string;
  location: string;
  capacity: string;
  date: string;
  time: string;
  duration: string;
  owner: string;
  constructor(space: string, location: string, capacity: string, date: string, time: string, duration: string, owner: string) {
    this.space = space;
    this.location = location;
    this.capacity = capacity;
    this.date = date;
    this.time = time;
    this.duration = duration;
    this.owner = owner;
  }
}


