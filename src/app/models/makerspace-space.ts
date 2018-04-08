
export class MakerspaceSpace {
  capacity: Number;
  space: String;
  location: String;
  time: String;
  date: any;

  constructor(space: string, capacity: Number, location: string, time: string, date: any) {
    this.capacity = capacity;
    this.space = space;
    this.location = location;
    this.time = time;
    this.date = date;

  }
}
