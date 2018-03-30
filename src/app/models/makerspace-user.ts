import { Viewable } from './viewable';

export class MakerspaceUser extends Viewable {
  displayName: string;
  email: string;
  avatar: string;
  bio: string;

  constructor() {
    super();
    this.displayName = null;
    this.email = null;
    this.avatar = null;
    this.bio = null;
  }
}
