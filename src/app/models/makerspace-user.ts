import { Timestamped } from './timestamped';

export class MakerspaceUser extends Timestamped {
  id: string;
  displayName: string;
  email: string;
  avatar: string;
  bio: string;

  constructor() {
    super();
    this.id = null;
    this.displayName = null;
    this.email = null;
    this.avatar = null;
    this.bio = null;
  }
}
