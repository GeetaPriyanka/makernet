import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { MakerspaceUser } from './models/makerspace-user';

import * as firebase from 'firebase/app';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class DataService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  addUser(user: MakerspaceUser) {
    let uid = user.id;

    var newUserData = {};
    newUserData[uid] = this.timestamp({
      id: this.afAuth.auth.currentUser.uid,
      avatar: user.photoUrl || '',
      displayName: user.name || '',
      bio: user.bio || '',
    });
    
    this.db.object('/users').update(newUserData);

  }

  timestamp(data) {
    data.updated_at = firebase.database.ServerValue.TIMESTAMP;

    if (!data.hasOwnProperty('created_at')) {
      data.created_at = firebase.database.ServerValue.TIMESTAMP;
    }

    return data;
  }
}
