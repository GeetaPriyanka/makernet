import { Viewable } from './viewable';

export class MakerspaceUser extends Viewable {
  displayName: string;
  email: string;
  bio: string;

  constructor() {
    super();
    this.displayName = null;
    this.email = null;
    this.bio = null;
  }
}
