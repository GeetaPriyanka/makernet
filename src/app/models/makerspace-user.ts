export class MakerspaceUser {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  bio: string;

  constructor(newName: string, newEmail: string, uid: string) {
    this.id = uid;
    this.name = newName;
    this.email = newEmail;
    this.photoUrl = null;
    this.bio = null;
  }
}
